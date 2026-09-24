package com.bugbuster.controller;

import com.bugbuster.dto.GoogleAuthRequest;
import com.bugbuster.service.GoogleAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class GoogleAuthController {
    private final GoogleAuthService googleAuthService;

    public GoogleAuthController(GoogleAuthService googleAuthService) {
        this.googleAuthService = googleAuthService;
    }

    @PostMapping("/google")
    public ResponseEntity<String> loginWithGoogle(@RequestBody GoogleAuthRequest request) {
        try {
            return ResponseEntity.ok(googleAuthService.loginWithGoogle(request.getCredential()));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (IllegalStateException ex) {
            return ResponseEntity.status(503).body(ex.getMessage());
        }
    }
}
