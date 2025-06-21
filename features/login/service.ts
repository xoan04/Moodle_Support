import { ApiService } from '../../utils/service_standart';
import { LOGIN_API_ENDPOINT } from './api';
import { LoginDto } from './dto/dto_send_login';
import { LoginResponseDto } from './dto/dto_receive_login';

/**
 * Login Service
 * Handles user authentication operations
 */
export class LoginService {
  /**
   * Authenticate user with email and password
   * @param credentials - User login credentials
   * @returns Promise with login response containing token and role
   */
  static async login(credentials: LoginDto): Promise<LoginResponseDto> {
    try {
      const response = await ApiService.post<LoginResponseDto>(
        LOGIN_API_ENDPOINT,
        credentials,
        { includeToken: false } // Don't include token for login requests
      );
      
      return response.data;
    } catch (error) {
      // Let the calling code handle the error
      throw error;
    }
  }
}

export default LoginService;
