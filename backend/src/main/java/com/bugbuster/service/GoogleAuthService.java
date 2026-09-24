package com.bugbuster.service;

import com.bugbuster.config.JwtUtil;
import com.bugbuster.model.User;
import com.bugbuster.repository.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.Signature;
import java.security.spec.RSAPublicKeySpec;
import java.time.Duration;
import java.util.Base64;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.UUID;

@Service
public class GoogleAuthService {
    private static final String GOOGLE_CERTS_URL = "https://www.googleapis.com/oauth2/v3/certs";
    private static final long KEY_CACHE_MILLIS = 60 * 60 * 1000L;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient;

    @Value("${google.client-id:}")
    private String googleClientId;

    private volatile Map<String, PublicKey> cachedKeys = Map.of();
    private volatile long keysLoadedAt = 0L;

    public GoogleAuthService(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder,
        JwtUtil jwtUtil,
        ObjectMapper objectMapper
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.objectMapper = objectMapper;
        this.httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(5))
            .build();
    }

    public String loginWithGoogle(String credential) {
        if (credential == null || credential.isBlank()) {
            throw new IllegalArgumentException("No se recibió la credencial de Google.");
        }

        if (googleClientId == null || googleClientId.isBlank()) {
            throw new IllegalStateException("Google Login no está configurado en el backend. Define GOOGLE_CLIENT_ID en Render.");
        }

        try {
            String[] parts = credential.split("\\.");
            if (parts.length != 3) {
                throw new IllegalArgumentException("La credencial de Google no tiene un formato válido.");
            }

            JsonNode header = parsePart(parts[0]);
            JsonNode payload = parsePart(parts[1]);

            String algorithm = header.path("alg").asText("");
            String keyId = header.path("kid").asText("");
            if (!"RS256".equals(algorithm) || keyId.isBlank()) {
                throw new IllegalArgumentException("La firma de Google no es válida.");
            }

            validateClaims(payload);

            PublicKey publicKey = getPublicKey(keyId);
            Signature verifier = Signature.getInstance("SHA256withRSA");
            verifier.initVerify(publicKey);
            verifier.update((parts[0] + "." + parts[1]).getBytes(StandardCharsets.UTF_8));

            byte[] signature = Base64.getUrlDecoder().decode(parts[2]);
            if (!verifier.verify(signature)) {
                throw new IllegalArgumentException("No se pudo verificar la firma del token de Google.");
            }

            String email = payload.path("email").asText("");
            String name = payload.path("name").asText("");
            String sub = payload.path("sub").asText("");

            User user = findByEmail(email);
            if (user == null) {
                user = createGoogleUser(email, name, sub);
            }

            return jwtUtil.generateToken(user.getUsername());
        } catch (IllegalArgumentException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new IllegalArgumentException("No se pudo verificar la cuenta de Google.", ex);
        }
    }

    private JsonNode parsePart(String part) throws Exception {
        byte[] decoded = Base64.getUrlDecoder().decode(part);
        return objectMapper.readTree(new String(decoded, StandardCharsets.UTF_8));
    }

    private void validateClaims(JsonNode payload) {
        String issuer = payload.path("iss").asText("");
        if (!"accounts.google.com".equals(issuer) && !"https://accounts.google.com".equals(issuer)) {
            throw new IllegalArgumentException("Emisor de Google no válido.");
        }

        String audience = payload.path("aud").asText("");
        if (!googleClientId.equals(audience)) {
            throw new IllegalArgumentException("El token de Google no corresponde a esta aplicación.");
        }

        long expiration = payload.path("exp").asLong(0L);
        long nowSeconds = System.currentTimeMillis() / 1000L;
        if (expiration <= nowSeconds) {
            throw new IllegalArgumentException("La credencial de Google ha expirado.");
        }

        long notBefore = payload.path("nbf").asLong(0L);
        if (notBefore > 0 && notBefore > nowSeconds + 30) {
            throw new IllegalArgumentException("La credencial de Google todavía no es válida.");
        }

        String subject = payload.path("sub").asText("");
        String email = payload.path("email").asText("");
        boolean emailVerified = payload.path("email_verified").asBoolean(false);
        if (subject.isBlank() || email.isBlank() || !emailVerified) {
            throw new IllegalArgumentException("Google no pudo verificar el correo de esta cuenta.");
        }
    }

    private PublicKey getPublicKey(String keyId) throws Exception {
        Map<String, PublicKey> keys = cachedKeys;
        long now = System.currentTimeMillis();

        if (keys.isEmpty() || now - keysLoadedAt > KEY_CACHE_MILLIS) {
            keys = loadGoogleKeys(false);
        }

        PublicKey publicKey = keys.get(keyId);
        if (publicKey == null) {
            keys = loadGoogleKeys(true);
            publicKey = keys.get(keyId);
        }

        if (publicKey == null) {
            throw new IllegalArgumentException("La clave de firma de Google ya no está disponible.");
        }

        return publicKey;
    }

    private synchronized Map<String, PublicKey> loadGoogleKeys(boolean forceRefresh) throws Exception {
        long now = System.currentTimeMillis();
        if (!forceRefresh && !cachedKeys.isEmpty() && now - keysLoadedAt <= KEY_CACHE_MILLIS) {
            return cachedKeys;
        }

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(GOOGLE_CERTS_URL))
            .timeout(Duration.ofSeconds(5))
            .GET()
            .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() != 200) {
            throw new IllegalStateException("Google no respondió sus claves públicas.");
        }

        JsonNode root = objectMapper.readTree(response.body());
        Map<String, PublicKey> newKeys = new HashMap<>();
        JsonNode keys = root.path("keys");
        Iterator<JsonNode> iterator = keys.elements();

        while (iterator.hasNext()) {
            JsonNode jwk = iterator.next();
            if (!"RSA".equals(jwk.path("kty").asText())) {
                continue;
            }

            String kid = jwk.path("kid").asText("");
            String modulus = jwk.path("n").asText("");
            String exponent = jwk.path("e").asText("");

            if (kid.isBlank() || modulus.isBlank() || exponent.isBlank()) {
                continue;
            }

            byte[] modulusBytes = Base64.getUrlDecoder().decode(modulus);
            byte[] exponentBytes = Base64.getUrlDecoder().decode(exponent);
            RSAPublicKeySpec spec = new RSAPublicKeySpec(
                new BigInteger(1, modulusBytes),
                new BigInteger(1, exponentBytes)
            );

            PublicKey publicKey = KeyFactory.getInstance("RSA").generatePublic(spec);
            newKeys.put(kid, publicKey);
        }

        if (newKeys.isEmpty()) {
            throw new IllegalStateException("No se encontraron claves RSA válidas de Google.");
        }

        cachedKeys = Map.copyOf(newKeys);
        keysLoadedAt = now;
        return cachedKeys;
    }

    private User findByEmail(String email) {
        return userRepository.findAll().stream()
            .filter(user -> user.getEmail() != null && user.getEmail().equalsIgnoreCase(email))
            .findFirst()
            .orElse(null);
    }

    private User createGoogleUser(String email, String googleName, String googleSub) {
        String username = uniqueUsername(googleName, googleSub);

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
        user.setRole("USER");
        user.setPoints(0);
        user.setCurrentLevel(1);
        return userRepository.save(user);
    }

    private String uniqueUsername(String googleName, String googleSub) {
        String base = googleName == null ? "" : googleName.trim().toLowerCase();
        base = base.replaceAll("[^a-z0-9]+", "_").replaceAll("(^_+|_+$)", "");

        if (base.isBlank()) {
            base = "google_user";
        }

        if (base.length() > 25) {
            base = base.substring(0, 25);
        }

        String candidate = base;
        int suffix = 2;
        while (userRepository.existsByUsername(candidate)) {
            String safeSub = googleSub.length() > 6 ? googleSub.substring(googleSub.length() - 6) : googleSub;
            candidate = base + "_" + safeSub;
            if (userRepository.existsByUsername(candidate)) {
                candidate = base + "_" + suffix++;
            }
        }

        return candidate;
    }
}
