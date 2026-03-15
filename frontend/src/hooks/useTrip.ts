import { useQuery } from '@tanstack/react-query'
import { getMyTripApi, getTripByIdApi } from '../api/tripApi'

// Fetch my trip
export const useMyTrip = () => {
  return useQuery({
    queryKey: ['myTrip'],
    queryFn:  getMyTripApi,
    retry:    false,       // don't retry if no trip found (404)
  })
}

// Fetch trip by ID
export const useTripById = (id: string) => {
  return useQuery({
    queryKey: ['trip', id],
    queryFn:  () => getTripByIdApi(id),
    enabled:  !!id,
  })
}