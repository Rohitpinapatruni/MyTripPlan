import axiosClient from './axiosClient'
import type { IBooking, ApiResponse } from '../types'

interface CreateBookingInput {
  hotelId: string
  checkIn: string
  checkOut: string
  rooms: number
  guests: number
}

interface BookingsResponse {
  count: number
  bookings: IBooking[]
}

// Create a new booking
export const createBookingApi = async (
  data: CreateBookingInput
): Promise<ApiResponse<{ booking: IBooking; nights: number; totalPrice: number }>> => {
  const response = await axiosClient.post('/bookings', data)
  return response.data
}

// Get my bookings
export const getMyBookingsApi = async (): Promise<ApiResponse<BookingsResponse>> => {
  const response = await axiosClient.get('/bookings/me')
  return response.data
}

// Cancel a booking
export const cancelBookingApi = async (
  id: string
): Promise<ApiResponse<{ booking: IBooking }>> => {
  const response = await axiosClient.delete(`/bookings/${id}`)
  return response.data
}