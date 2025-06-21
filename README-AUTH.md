# Sistema de Autenticación - Moodle Support

Este documento explica cómo funciona el sistema de autenticación implementado en el proyecto.

## Archivos del Sistema

### 1. Middleware (`middleware.ts`)
El middleware de Next.js se ejecuta en cada request y protege las rutas especificadas.

**Rutas Protegidas:**
- `/users`
- `/sports-reports`
- `/pqrs`
- `/dashboard`
- `/course`

**Funcionalidad:**
- Verifica la existencia del token `auth_token` en las cookies
- Redirige a `/` si no hay token válido
- Permite acceso a rutas públicas sin autenticación
- Redirige usuarios autenticados desde `/` hacia `/dashboard`

### 2. TokenManager (`utils/cookies_standart.ts`)
Gestiona el almacenamiento y recuperación de tokens de autenticación.

**Métodos Principales:**
```typescript
// Almacenar token
TokenManager.setToken(token: string)

// Obtener token
TokenManager.getToken(): string | null

// Verificar si está autenticado
TokenManager.isAuthenticated(): boolean

// Verificar si el token expiró
TokenManager.isTokenExpired(): boolean

// Limpiar datos de autenticación
TokenManager.clearAuth()
```

### 3. AuthGuard (`components/AuthGuard.tsx`)
Componente de React para proteger páginas del lado del cliente.

## Cómo Usar

### En Páginas Protegidas (Client Components)

```typescript
"use client"

import AuthGuard from '@/components/AuthGuard';

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div>
        {/* Contenido de la página */}
        <h1>Dashboard</h1>
      </div>
    </AuthGuard>
  );
}
```

### En Páginas Protegidas (Server Components)

```typescript
import { requireAuth } from '@/utils/auth-guard';

export default function UsersPage() {
  requireAuth(); // Esto redirigirá automáticamente si no hay token
  
  return (
    <div>
      {/* Contenido de la página */}
      <h1>Usuarios</h1>
    </div>
  );
}
```

### Verificar Autenticación en Componentes

```typescript
"use client"

import { useAuthGuard, getCurrentUser, logout } from '@/utils/auth-guard';

export default function MyComponent() {
  const isAuthenticated = useAuthGuard();
  const user = getCurrentUser();

  if (!isAuthenticated) {
    return <div>No autenticado</div>;
  }

  return (
    <div>
      <p>Bienvenido, {user?.name}</p>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
}
```

## Flujo de Autenticación

1. **Usuario no autenticado intenta acceder a ruta protegida**
   - Middleware detecta falta de token
   - Redirige a `/` (página de login)

2. **Usuario se autentica exitosamente**
   - Token se almacena en cookies usando `TokenManager.setToken()`
   - Usuario es redirigido a la página original o `/dashboard`

3. **Usuario autenticado accede a ruta protegida**
   - Middleware verifica token
   - Permite acceso a la página

4. **Token expira**
   - Middleware detecta token expirado
   - Redirige a `/` para re-autenticación

## Configuración

### Agregar Nuevas Rutas Protegidas

Edita `middleware.ts` y agrega las rutas al array `PROTECTED_ROUTES`:

```typescript
const PROTECTED_ROUTES = [
  '/users',
  '/sports-reports', 
  '/pqrs',
  '/dashboard',
  '/course',
  '/nueva-ruta' // Agregar aquí
];
```

### Personalizar Comportamiento

Puedes modificar el middleware para:
- Cambiar la página de redirección
- Agregar validaciones adicionales
- Implementar refresh tokens
- Agregar roles y permisos

## Seguridad

- Los tokens se almacenan en cookies con opciones seguras
- Se verifica la expiración del token
- El middleware se ejecuta en cada request
- Las rutas API están excluidas del middleware (excepto login)

## Debugging

Para debuggear problemas de autenticación:

```typescript
// En el navegador
TokenManager.debugToken();
```

Esto mostrará información detallada sobre el estado del token en la consola. 