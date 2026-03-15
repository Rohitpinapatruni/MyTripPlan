import axiosClient from './axiosClient'
import type { IHotel, ApiResponse } from '../types'

interface HotelsResponse {
  total: number
  count: number
  hotels: IHotel[]
}

// Get all hotels with optional filters
export const fetchHotels = async (params?: {
  search?: string
  minPrice?: number
  maxPrice?: number
  rating?: number
  page?: number
  limit?: number
}): Promise<ApiResponse<HotelsResponse>> => {
  const response = await axiosClient.get('/hotels', { params })
  return response.data
}

// Get single hotel by ID
export const fetchHotelById = async (
  id: string
): Promise<ApiResponse<{ hotel: IHotel }>> => {
  const response = await axiosClient.get(`/hotels/${id}`)
  return response.data
}