import { api } from '@/lib/api';
import { AuthResponse, User, LoginData, RegisterData } from '@/types';

class AuthService {
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  async getProfile(): Promise<User> {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error: any) {
      throw new Error('Failed to fetch user profile');
    }
  }

  // Store tokens in localStorage
  storeTokens(tokens: AuthResponse) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', tokens.access_token);
      localStorage.setItem('refresh_token', tokens.refresh_token || '');
    }
  }

  // Remove tokens from localStorage
  clearTokens() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('access_token');
    }
    return false;
  }

  // Get stored token
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }
}

// Export a single instance
export const authService = new AuthService();