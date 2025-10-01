import type { User } from '../entities/user';

// Login
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: true;
  message: string;
  user: User;
  token: string;
}

// Register
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role?: 'ATHLETE' | 'TRAINER';
}

export interface RegisterResponse {
  success: true;
  message: string;
  user: User;
  token: string;
}

// Get Profile
export interface GetProfileResponse {
  success: true;
  user: User;
}

// Update Profile
export interface UpdateProfileRequest {
  name?: string;
  email?: string;
}

export interface UpdateProfileResponse {
  success: true;
  message: string;
  user: User;
}

// Change Password
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: true;
  message: string;
}
