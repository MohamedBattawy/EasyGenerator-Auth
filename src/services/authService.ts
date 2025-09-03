import type { CurrentUserResponse, LogoutResponse, SignInData, SignInResponse, SignUpData, SignUpResponse } from '../types/auth.ts';
import { request } from '../utils/api';

class AuthService {

  async signUp(data: SignUpData): Promise<SignUpResponse> {
    return request<SignUpResponse>('/users/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async signIn(data: SignInData): Promise<SignInResponse> {
    return request<SignInResponse>('/users/signin', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout(): Promise<LogoutResponse> {
    return request<LogoutResponse>('/users/logout', {
      method: 'POST',
    });
  }

  async getCurrentUser(): Promise<CurrentUserResponse> {
    return request<CurrentUserResponse>('/users/me');
  }
}

export const authService = new AuthService();
