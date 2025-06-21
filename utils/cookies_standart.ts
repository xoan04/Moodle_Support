/**
 * Standard Cookie Management Utility
 * Provides secure token storage and retrieval using cookies
 */

interface CookieOptions {
  expires?: Date;
  maxAge?: number;
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

class CookieManager {
  private static readonly DEFAULT_OPTIONS: CookieOptions = {
    path: '/',
    secure: typeof window !== 'undefined' && window.location.protocol === 'https:', // Only secure in HTTPS
    sameSite: 'lax', // Changed from 'strict' to 'lax' for better compatibility
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days default
  };

  /**
   * Set a cookie with the given name, value, and options
   */
  static set(name: string, value: string, options: CookieOptions = {}): void {
    const opts = { ...this.DEFAULT_OPTIONS, ...options };
    
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    
    if (opts.expires) {
      cookieString += `; expires=${opts.expires.toUTCString()}`;
    }
    
    if (opts.maxAge) {
      cookieString += `; max-age=${opts.maxAge}`;
    }
    
    if (opts.domain) {
      cookieString += `; domain=${opts.domain}`;
    }
    
    if (opts.path) {
      cookieString += `; path=${opts.path}`;
    }
    
    if (opts.secure) {
      cookieString += '; secure';
    }
    
    if (opts.httpOnly) {
      cookieString += '; httpOnly';
    }
    
    if (opts.sameSite) {
      cookieString += `; samesite=${opts.sameSite}`;
    }
    
    document.cookie = cookieString;
  }

  /**
   * Get a cookie value by name
   */
  static get(name: string): string | null {
    const nameEQ = `${encodeURIComponent(name)}=`;
    const cookies = document.cookie.split(';');
    
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }
    
    return null;
  }

  /**
   * Remove a cookie by setting its expiration to the past
   */
  static remove(name: string, options: CookieOptions = {}): void {
    const opts = { ...this.DEFAULT_OPTIONS, ...options };
    opts.expires = new Date(0);
    this.set(name, '', opts);
  }

  /**
   * Check if a cookie exists
   */
  static exists(name: string): boolean {
    return this.get(name) !== null;
  }

  /**
   * Get all cookies as an object
   */
  static getAll(): Record<string, string> {
    const cookies: Record<string, string> = {};
    const cookieList = document.cookie.split(';');
    
    for (let cookie of cookieList) {
      cookie = cookie.trim();
      const [name, value] = cookie.split('=');
      if (name && value) {
        cookies[decodeURIComponent(name)] = decodeURIComponent(value);
      }
    }
    
    return cookies;
  }

  /**
   * Clear all cookies
   */
  static clearAll(): void {
    const cookies = this.getAll();
    Object.keys(cookies).forEach(name => {
      this.remove(name);
    });
  }
}

// Token-specific methods
export class TokenManager {
  private static readonly TOKEN_KEY = 'auth_token';
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private static readonly USER_DATA_KEY = 'user_data';

  /**
   * Store authentication token
   */
  static setToken(token: string, options: CookieOptions = {}): void {
    CookieManager.set(this.TOKEN_KEY, token, {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      ...options
    });
  }

  /**
   * Get authentication token
   */
  static getToken(): string | null {
    return CookieManager.get(this.TOKEN_KEY);
  }

  /**
   * Remove authentication token
   */
  static removeToken(): void {
    CookieManager.remove(this.TOKEN_KEY);
  }

  /**
   * Store refresh token
   */
  static setRefreshToken(token: string, options: CookieOptions = {}): void {
    CookieManager.set(this.REFRESH_TOKEN_KEY, token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      ...options
    });
  }

  /**
   * Get refresh token
   */
  static getRefreshToken(): string | null {
    return CookieManager.get(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Remove refresh token
   */
  static removeRefreshToken(): void {
    CookieManager.remove(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Store user data
   */
  static setUserData(userData: any, options: CookieOptions = {}): void {
    const userDataString = JSON.stringify(userData);
    CookieManager.set(this.USER_DATA_KEY, userDataString, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      ...options
    });
  }

  /**
   * Get user data
   */
  static getUserData(): any | null {
    const userDataString = CookieManager.get(this.USER_DATA_KEY);
    if (userDataString) {
      try {
        return JSON.parse(userDataString);
      } catch (error) {
        console.error('Error parsing user data from cookie:', error);
        return null;
      }
    }
    return null;
  }

  /**
   * Remove user data
   */
  static removeUserData(): void {
    CookieManager.remove(this.USER_DATA_KEY);
  }

  /**
   * Clear all authentication data
   */
  static clearAuth(): void {
    this.removeToken();
    this.removeRefreshToken();
    this.removeUserData();
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Get token expiration time (if available)
   */
  static getTokenExpiration(): Date | null {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      // Assuming JWT token format
      const payload = JSON.parse(atob(token.split('.')[1]));
      return new Date(payload.exp * 1000);
    } catch (error) {
      console.error('Error parsing token expiration:', error);
      return null;
    }
  }

  /**
   * Check if token is expired
   */
  static isTokenExpired(): boolean {
    const expiration = this.getTokenExpiration();
    if (!expiration) return true;
    return expiration < new Date();
  }

  /**
   * Debug method to check token status
   */
  static debugToken(): void {
    const token = this.getToken();
    const isExpired = this.isTokenExpired();
    const expiration = this.getTokenExpiration();
    
    console.log('=== Token Debug Info ===');
    console.log('Token exists:', !!token);
    console.log('Token value:', token ? token.substring(0, 50) + '...' : 'null');
    console.log('Token expired:', isExpired);
    console.log('Token expiration:', expiration);
    console.log('Current time:', new Date());
    console.log('All cookies:', CookieManager.getAll());
    console.log('========================');
  }
}

// Export both classes for flexibility
export { CookieManager };
export default TokenManager;
