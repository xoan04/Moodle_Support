import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginService from './service';
import { LoginDto } from './dto/dto_send_login';
import { LoginResponseDto } from './dto/dto_receive_login';
import { ApiService } from '../../utils/service_standart';
import TokenManager from '../../utils/cookies_standart';

/**
 * Login Controller State Interface
 */
interface LoginState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  data: LoginResponseDto | null;
}

/**
 * Login Controller Hook
 * Manages login state and operations
 */
export const useLoginController = () => {
  const router = useRouter();
  const [state, setState] = useState<LoginState>({
    isLoading: false,
    isSuccess: false,
    error: null,
    data: null,
  });

  /**
   * Reset state to initial values
   */
  const resetState = () => {
    setState({
      isLoading: false,
      isSuccess: false,
      error: null,
      data: null,
    });
  };

  /**
   * Set loading state
   */
  const setLoading = (loading: boolean) => {
    setState(prev => ({
      ...prev,
      isLoading: loading,
      error: loading ? null : prev.error, // Clear error when starting to load
    }));
  };

  /**
   * Set error state
   */
  const setError = (error: string | null) => {
    setState(prev => ({
      ...prev,
      error,
      isLoading: false,
    }));
  };

  /**
   * Set success state with data
   */
  const setSuccess = (data: LoginResponseDto) => {
    setState({
      isLoading: false,
      isSuccess: true,
      error: null,
      data,
    });
  };

  /**
   * Perform login operation
   * @param credentials - User login credentials
   */
  const login = async (credentials: LoginDto): Promise<boolean> => {
    try {
      setLoading(true);
      
      const response = await LoginService.login(credentials);
      
      // Debug: Log the complete response
      console.log('Login response:', response);
      console.log('Response data:', response.data);
      console.log('Token in response:', response.data?.token);
      
      // Store the token in cookies
      if (response.data?.token) {
        TokenManager.setToken(response.data.token);
        // Also store user data if needed
        TokenManager.setUserData({
          role: response.data.role,
          // Add any other user data you want to store
        });
        
        // Debug: Verify token was saved
        console.log('Token saved successfully');
        TokenManager.debugToken();
      } else {
        console.error('No token received in login response');
      }
      
      setSuccess(response);
      
      // Redirect to dashboard on successful login
      router.push('/dashboard');
      
      return true;
    } catch (error: any) {
      // Handle different types of errors
      let errorMessage = 'An unexpected error occurred';
      
      if (error?.status === 401) {
        errorMessage = 'Invalid email or password';
      } else if (error?.status === 422) {
        errorMessage = 'Please check your input and try again';
      } else if (error?.status === 0) {
        errorMessage = 'No internet connection. Please check your network.';
      } else if (error?.status === 408) {
        errorMessage = 'Request timeout. Please try again.';
      } else if (error?.status >= 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      return false;
    }
  };

  /**
   * Logout function (clears auth data)
   */
  const logout = () => {
    // Clear authentication data from cookies
    TokenManager.clearAuth();
    
    // Clear any stored authentication data from localStorage (if any)
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    
    // Reset state
    resetState();
    
    // Redirect to login page
    router.push('/');
  };

  return {
    // State
    isLoading: state.isLoading,
    isSuccess: state.isSuccess,
    error: state.error,
    data: state.data,
    
    // Actions
    login,
    logout,
    resetState,
    setError,
  };
};

export default useLoginController;
