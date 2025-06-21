import { NextRequest, NextResponse } from 'next/server';

// Protected routes that require authentication
const PROTECTED_ROUTES = [
  '/users',
  '/sports-reports', 
  '/pqrs',
  '/dashboard',
  '/course'
];

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/api/login'
];

/**
 * Get token from cookies in middleware context
 */
function getTokenFromCookies(request: NextRequest): string | null {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) {
      acc[name] = decodeURIComponent(value);
    }
    return acc;
  }, {} as Record<string, string>);

  return cookies['auth_token'] || null;
}

/**
 * Check if the current path matches any protected route
 */
function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(route => 
    pathname.startsWith(route) || pathname === route
  );
}

/**
 * Check if the current path is a public route
 */
function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(route => 
    pathname.startsWith(route) || pathname === route
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for API routes (except login)
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/login')) {
    return NextResponse.next();
  }

  // Skip middleware for static files
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if user is trying to access a protected route
  if (isProtectedRoute(pathname)) {
    const token = getTokenFromCookies(request);
    
    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL('/', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If user has token and tries to access login page, redirect to dashboard
  if (pathname === '/' || pathname === '/login') {
    const token = getTokenFromCookies(request);
    if (token) {
      // Check if token is not expired (basic check)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiration = new Date(payload.exp * 1000);
        if (expiration > new Date()) {
          return NextResponse.redirect(new URL('/dashboard', request.url));
        }
      } catch (error) {
        // If token parsing fails, continue to login page
        console.error('Error parsing token in middleware:', error);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 