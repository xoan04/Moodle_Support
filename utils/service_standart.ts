import TokenManager from './cookies_standart';

/**
 * Standard HTTP Service Utility
 * Provides standardized API calls with token authentication and error handling
 */

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  includeToken?: boolean;
  timeout?: number;
}

interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  ok: boolean;
}

class HttpError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: any
  ) {
    super(`HTTP ${status}: ${statusText}`);
    this.name = 'HttpError';
  }
}

class ApiService {
  private static readonly BASE_URL =  'https://apitasqui.makerstech.co';
  private static readonly DEFAULT_TIMEOUT = 100000; // 10 seconds

  /**
   * Get default headers with token if available
   */
  private static getDefaultHeaders(includeToken: boolean = true): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (includeToken) {
      const token = TokenManager.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log('Token found and added to headers:', token.substring(0, 20) + '...');
      } else {
        console.warn('No token found in cookies');
      }
    }

    return headers;
  }

  /**
   * Create timeout promise
   */
  private static createTimeout(timeout: number): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Request timeout after ${timeout}ms`));
      }, timeout);
    });
  }

  /**
   * Handle HTTP response and throw appropriate errors
   */
  private static async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    let data: T;
    
    try {
      // Try to parse JSON, fallback to text if not JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text() as T;
      }
    } catch (error) {
      data = null as T;
    }

    if (!response.ok) {
      console.error('HTTP Error Response:', {
        status: response.status,
        statusText: response.statusText,
        data: data,
        url: response.url,
        headers: Object.fromEntries(response.headers.entries())
      });
      throw new HttpError(response.status, response.statusText, data);
    }

    return {
      data,
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
    };
  }

  /**
   * Make HTTP request with standardized error handling
   */
  static async request<T = any>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      includeToken = true,
      timeout = this.DEFAULT_TIMEOUT,
    } = options;

    const url = endpoint.startsWith('http') ? endpoint : `${this.BASE_URL}${endpoint}`;
    const requestHeaders = { ...this.getDefaultHeaders(includeToken), ...headers };

    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
    };

    if (body && method !== 'GET') {
      requestOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    try {
      const response = await Promise.race([
        fetch(url, requestOptions),
        this.createTimeout(timeout),
      ]);

      return await this.handleResponse<T>(response as Response);
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }
      
      // Handle network errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new HttpError(0, 'Network Error', { message: 'No internet connection' });
      }
      
      // Handle timeout errors
      if (error instanceof Error && error.message.includes('timeout')) {
        throw new HttpError(408, 'Request Timeout', { message: error.message });
      }

      throw new HttpError(500, 'Internal Error', { message: (error as Error).message });
    }
  }

  /**
   * GET request
   */
  static async get<T = any>(
    endpoint: string,
    options: Omit<RequestOptions, 'method' | 'body'> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  /**
   * POST request
   */
  static async post<T = any>(
    endpoint: string,
    body?: any,
    options: Omit<RequestOptions, 'method'> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  }

  /**
   * PUT request
   */
  static async put<T = any>(
    endpoint: string,
    body?: any,
    options: Omit<RequestOptions, 'method'> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  }

  /**
   * DELETE request
   */
  static async delete<T = any>(
    endpoint: string,
    options: Omit<RequestOptions, 'method' | 'body'> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  /**
   * PATCH request
   */
  static async patch<T = any>(
    endpoint: string,
    body?: any,
    options: Omit<RequestOptions, 'method'> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
  }

  /**
   * Upload file with FormData
   */
  static async upload<T = any>(
    endpoint: string,
    file: File,
    options: Omit<RequestOptions, 'method' | 'body'> = {}
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    const headers = { ...this.getDefaultHeaders(options.includeToken) };
    delete headers['Content-Type']; // Let browser set content-type for FormData

    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: formData,
      headers,
    });
  }

  /**
   * Handle common error scenarios
   */
  static handleError(error: HttpError): void {
    switch (error.status) {
      case 401:
        // Unauthorized - clear auth and redirect to login
        TokenManager.clearAuth();
        window.location.href = '/login';
        break;
      
      case 403:
        // Forbidden - show access denied message
        console.error('Access denied:', error.data);
        break;
      
      case 404:
        // Not found - show not found message
        console.error('Resource not found:', error.data);
        break;
      
      case 422:
        // Validation error - show validation messages
        console.error('Validation error:', error.data);
        break;
      
      case 500:
        // Server error - show generic error
        console.error('Server error:', error.data);
        break;
      
      default:
        console.error(`HTTP ${error.status}:`, error.data);
    }
  }
}

// Convenience functions for common operations
export const api = {
  get: ApiService.get,
  post: ApiService.post,
  put: ApiService.put,
  delete: ApiService.delete,
  patch: ApiService.patch,
  upload: ApiService.upload,
  handleError: ApiService.handleError,
};

export { ApiService, HttpError };
export default ApiService;
