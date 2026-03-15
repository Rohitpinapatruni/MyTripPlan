import axiosClient from './axiosClient'
import type { RegisterInput, LoginInput, AuthResponse, ApiResponse } from '../types/index'

// Register
export const registerApi = async (
  data: RegisterInput
): Promise<ApiResponse<AuthResponse>> => {
  const response = await axiosClient.post('/auth/register', data)
  return response.data
}

// Login
export const loginApi = async (
  data: LoginInput
): Promise<ApiResponse<AuthResponse>> => {
  const response = await axiosClient.post('/auth/login', data)
  return response.data
}

// Get Me
export const getMeApi = async (): Promise<ApiResponse<{ user: AuthResponse['user'] }>> => {
  const response = await axiosClient.get('/auth/me')
  return response.data
}