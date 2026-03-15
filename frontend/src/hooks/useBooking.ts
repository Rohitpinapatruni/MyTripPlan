import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createBookingApi,
  getMyBookingsApi,
  cancelBookingApi,
} from '../api/bookingApi'

// Fetch my bookings
export const useMyBookings = () => {
  return useQuery({
    queryKey: ['myBookings'],
    queryFn: getMyBookingsApi,
  })
}

// Create booking mutation
export const useCreateBooking = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createBookingApi,
    onSuccess: () => {
      // Invalidate bookings & trip cache after new booking
      queryClient.invalidateQueries({ queryKey: ['myBookings'] })
      queryClient.invalidateQueries({ queryKey: ['myTrip'] })
    },
  })
}

// Cancel booking mutation
export const useCancelBooking = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cancelBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myBookings'] })
      queryClient.invalidateQueries({ queryKey: ['myTrip'] })
    },
  })
}