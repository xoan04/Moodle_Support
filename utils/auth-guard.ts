import { redirect } from 'next/navigation';
import TokenManager from './cookies_standart';

/**
 * Authentication guard for server components
 * Redirects to login if user is not authenticated
 */
export function requireAuth() {
  if (typeof window === 'undefined') {
    // Server-side check
    const token = TokenManager.getToken();
    if (!token || TokenManager.isTokenExpired()) {
      redirect('/');
    }
  }
}

/**
 * Authentication guard for client components
 * Returns true if user is authenticated, false otherwise
 */
export function useAuthGuard(): boolean {
  if (typeof window === 'undefined') {
    return false; // Server-side, assume not authenticated
  }
  
  return TokenManager.isAuthenticated() && !TokenManager.isTokenExpired();
}

/**
 * Get current user data if authenticated
 */
export function getCurrentUser() {
  if (typeof window === 'undefined') {
    return null; // Server-side, return null
  }
  
  if (!TokenManager.isAuthenticated() || TokenManager.isTokenExpired()) {
    return null;
  }
  
  return TokenManager.getUserData();
}

/**
 * Logout function that clears all auth data and redirects
 */
export function logout() {
  if (typeof window === 'undefined') {
    return; // Server-side, do nothing
  }
  
  TokenManager.clearAuth();
  window.location.href = '/';
}

/**
 * Check if user has specific role/permission
 * You can extend this based on your user data structure
 */
export function hasPermission(permission: string): boolean {
  const user = getCurrentUser();
  if (!user) return false;
  
  // Example permission check - adjust based on your user data structure
  return user.permissions?.includes(permission) || user.role === 'admin';
} 