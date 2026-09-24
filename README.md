# BugBuster - Code Duel

Juego educativo Full Stack para aprender Java resolviendo retos de código mientras el jugador avanza por 50 misiones y combate bugs.

## Stack

### Backend
- Java 17
- Spring Boot 3.1.5
- Spring Security 6
- JWT
- JPA / Hibernate
- PostgreSQL
- Maven

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Monaco Editor
- Axios
- React Router DOM
- React Hot Toast
- Context API

### Deploy
- Backend: Render
- Frontend: Cloudflare Pages

## Ejecución local

### Backend
```bash
cd backend
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Variables de entorno

### Backend
Configura en Render o en el entorno local:

- `DB_URL`
- `DB_USER`
- `DB_PASSWORD`
- `JWT_SECRET`
- `JWT_EXPIRATION` (opcional; por defecto 86400000 ms)
- `GOOGLE_CLIENT_ID`

`GOOGLE_CLIENT_ID` debe ser el Client ID del cliente OAuth web creado en Google Cloud.

### Frontend
Configura en Cloudflare Pages:

- `VITE_API_URL=https://bugbuster-codeduel.onrender.com/api`
- `VITE_GOOGLE_CLIENT_ID=<tu-client-id-de-google>`

Para desarrollo local puedes usar `frontend/.env.example` como referencia.

## Google Sign-In

BugBuster conserva el login normal con usuario y contraseña y añade un botón de acceso con Google.

El frontend recibe el ID token emitido por Google y lo envía a `POST /api/auth/google`. El backend verifica la firma RS256 y las claims principales del token antes de crear o reutilizar el usuario y emitir el JWT propio de BugBuster.

En Google Cloud Console debes configurar el origen JavaScript de producción:

```text
https://bugbuster-codeduel.pages.dev
```

Durante desarrollo agrega también el origen local que utilices, por ejemplo:

```text
http://localhost:5173
```

## Niveles

El backend sincroniza los 50 niveles por `orderNumber` al iniciar. Si la base ya contiene niveles, los actualiza por número de misión en lugar de borrar usuarios o progreso.

El frontend mantiene el progreso local por nivel y avanza automáticamente al siguiente reto después de una solución correcta.
