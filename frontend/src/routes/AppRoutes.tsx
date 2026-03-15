import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// Pages
import HomePage           from '../pages/HomePage'
import LoginPage          from '../pages/LoginPage'
import RegisterPage       from '../pages/RegisterPage'
import HotelsPage         from '../pages/HotelsPage'
import HotelDetailPage    from '../pages/HotelDetailPage'
import BookingConfirmPage from '../pages/BookingConfirmPage'
import MyBookingsPage     from '../pages/MyBookingsPage'
import TripDetailsPage    from '../pages/TripDetailsPage'
import NotFoundPage       from '../pages/NotFoundPage'

// ─────────────────────────────
// Protected Route Component
// ─────────────────────────────
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  return user ? <>{children}</> : <Navigate to="/login" replace />
}

// ─────────────────────────────
// Guest Only Route Component
// (redirect if already logged in)
// ─────────────────────────────
const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  return !user ? <>{children}</> : <Navigate to="/" replace />
}

// ─────────────────────────────
// All Routes
// ─────────────────────────────
const AppRoutes = () => {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/"          element={<HomePage />} />
      <Route path="/hotels"    element={<HotelsPage />} />
      <Route path="/hotels/:id" element={<HotelDetailPage />} />

      {/* Guest Only Routes */}
      <Route path="/login" element={
        <GuestRoute>
          <LoginPage />
        </GuestRoute>
      } />
      <Route path="/register" element={
        <GuestRoute>
          <RegisterPage />
        </GuestRoute>
      } />

      {/* Protected Routes */}
      <Route path="/booking/confirm" element={
        <ProtectedRoute>
          <BookingConfirmPage />
        </ProtectedRoute>
      } />
      <Route path="/my-bookings" element={
        <ProtectedRoute>
          <MyBookingsPage />
        </ProtectedRoute>
      } />
      <Route path="/trips/me" element={
        <ProtectedRoute>
          <TripDetailsPage />
        </ProtectedRoute>
      } />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  )
}

export default AppRoutes;