// ─────────────────────────────
// 👤 User
// ─────────────────────────────
export interface IUser {
  _id: string
  name: string
  email: string
  role: 'user' | 'admin'
}

// ─────────────────────────────
// 🏨 Hotel
// ─────────────────────────────
export interface IHotel {
  _id: string
  name: string
  location: string
  description: string
  images: string[]
  amenities: string[]
  pricePerNight: number
  totalRooms: number
  rating: number
  createdAt: string
}

// ─────────────────────────────
// 📅 Booking
// ─────────────────────────────
export interface IBooking {
  _id: string
  userId: string
  hotelId: IHotel
  checkIn: string
  checkOut: string
  rooms: number
  guests: number
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: string
}

// ─────────────────────────────
// 🗺️ Trip
// ─────────────────────────────
export interface ITrip {
  _id: string
  userId: string
  bookings: IBooking[]
  totalCost: number
  notes?: string
  createdAt: string
}

// ─────────────────────────────
// 🔐 Auth
// ─────────────────────────────
export interface RegisterInput {
  name: string
  email: string
  password: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: IUser
}

// ─────────────────────────────
// 📦 API Response
// ─────────────────────────────
export interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
}