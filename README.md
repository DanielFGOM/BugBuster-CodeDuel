# BugBuster - Code Duel

Juego de aprender Java resolviendo retos de código mientras tu personaje lucha contra bugs.

## Configuración local
1. Backend: `cd backend && mvn spring-boot:run`
2. Frontend: `cd frontend && npm install && npm run dev`

## Variables de entorno (backend)
- DB_URL, DB_USER, DB_PASSWORD (para PostgreSQL)
- JWT_SECRET, JWT_EXPIRATION

## Despliegue
- Backend en Render: conectar repositorio y usar Dockerfile o Maven.
- Frontend en Cloudflare Pages: build command `npm run build`, output `dist`.

## Datos iniciales (niveles)
Puedes insertar niveles en la base de datos H2 o con un data.sql.