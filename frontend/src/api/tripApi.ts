import axiosClient from './axiosClient'
import type { ITrip, ApiResponse } from '../types'

// Get my trip
export const getMyTripApi = async (): Promise<ApiResponse<{ trip: ITrip }>> => {
  const response = await axiosClient.get('/trips/me')
  return response.data
}

// Get trip by ID
export const getTripByIdApi = async (
  id: string
): Promise<ApiResponse<{ trip: ITrip }>> => {
  const response = await axiosClient.get(`/trips/${id}`)
  return response.data
}