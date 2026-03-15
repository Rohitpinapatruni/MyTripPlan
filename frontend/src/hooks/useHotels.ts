import { useQuery } from '@tanstack/react-query'
import { fetchHotels, fetchHotelById } from '../api/hotelApi'

interface HotelFilters {
  search?: string
  minPrice?: number
  maxPrice?: number
  rating?: number
  page?: number
  limit?: number
}

// Hook for fetching all hotels
export const useHotels = (filters?: HotelFilters) => {
  return useQuery({
    queryKey: ['hotels', filters],   // refetch when filters change
    queryFn: () => fetchHotels(filters),
  })
}

// Hook for fetching single hotel
export const useHotel = (id: string) => {
  return useQuery({
    queryKey: ['hotel', id],
    queryFn: () => fetchHotelById(id),
    enabled: !!id,                   // only fetch if id exists
  })
}