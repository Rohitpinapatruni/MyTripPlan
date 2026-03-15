import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  Hotel, MapPin, Calendar, BedDouble,
  Users, Receipt, CheckCircle, ArrowLeft,
  Loader, AlertCircle
} from 'lucide-react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { useCreateBooking } from '../hooks/useBooking'
import type { IHotel } from '../types'

// Shape of state passed from BookingForm
interface BookingState {
  hotel:      IHotel
  checkIn:    string
  checkOut:   string
  rooms:      number
  guests:     number
  nights:     number
  totalPrice: number
}

// Helper — format date nicely
const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    weekday: 'short',
    day:     'numeric',
    month:   'long',
    year:    'numeric',
  })
}

const BookingConfirmPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const state    = location.state as BookingState | null

  const { mutateAsync: createBooking, isPending } = useCreateBooking()
  const [serverError, setServerError] = useState('')
  const [isConfirmed, setIsConfirmed] = useState(false)

  // ── Guard — no state means user navigated here directly ──
  if (!state) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20 px-4">
          <AlertCircle size={48} className="text-gray-300" />
          <p className="text-gray-600 font-medium text-lg">
            No booking details found.
          </p>
          <button
            onClick={() => navigate('/hotels')}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            Browse Hotels
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  const { hotel, checkIn, checkOut, rooms, guests, nights, totalPrice } = state

  // ── Handle Confirm ──
  const handleConfirm = async () => {
    try {
      setServerError('')
      await createBooking({
        hotelId:  hotel._id,
        checkIn,
        checkOut,
        rooms,
        guests,
      })
      setIsConfirmed(true)
    } catch (error: any) {
      setServerError(
        error?.response?.data?.message || 'Booking failed. Please try again.'
      )
    }
  }

  // ── Success Screen ──
  if (isConfirmed) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">

            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={42} className="text-green-500" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Booking Confirmed!
            </h2>
            <p className="text-gray-500 text-sm mb-2">
              Your stay at
              <span className="font-semibold text-gray-700"> {hotel.name} </span>
              is confirmed.
            </p>
            <p className="text-gray-400 text-xs mb-8">
              A confirmation has been added to your bookings.
            </p>

            {/* Quick Summary */}
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-left mb-8 flex flex-col gap-2">
              <div className="flex justify-between text-gray-600">
                <span>Check-in</span>
                <span className="font-medium text-gray-800">{formatDate(checkIn)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Check-out</span>
                <span className="font-medium text-gray-800">{formatDate(checkOut)}</span>
              </div>
              <div className="flex justify-between text-gray-600 border-t pt-2 mt-1">
                <span className="font-semibold">Total Paid</span>
                <span className="font-bold text-blue-600 text-base">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate('/my-bookings')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                View My Bookings
              </button>
              <button
                onClick={() => navigate('/trips/me')}
                className="w-full border border-blue-200 text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-xl transition-colors"
              >
                View My Trip
              </button>
              <button
                onClick={() => navigate('/hotels')}
                className="w-full text-gray-500 hover:text-gray-700 text-sm py-2 transition-colors"
              >
                Continue Browsing
              </button>
            </div>

          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // ── Confirm Page ──
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-10 w-full">

        {/* ── Back Button ── */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 text-sm font-medium mb-6 transition-colors group"
        >
          <ArrowLeft size={17} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        {/* ── Page Title ── */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 text-white p-2.5 rounded-xl">
            <Receipt size={22} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              Confirm Your Booking
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">
              Review your details before confirming
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5">

          {/* ── Hotel Info Card ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Hotel
            </h2>
            <div className="flex gap-4">

              {/* Hotel Image */}
              <img
                src={hotel.images[0] || 'https://placehold.co/120x90?text=Hotel'}
                alt={hotel.name}
                className="w-24 h-20 md:w-32 md:h-24 rounded-xl object-cover shrink-0"
              />

              {/* Hotel Details */}
              <div className="flex flex-col gap-1.5">
                <h3 className="font-bold text-gray-800 text-base md:text-lg leading-tight">
                  {hotel.name}
                </h3>
                <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                  <MapPin size={13} className="text-blue-500 shrink-0" />
                  {hotel.location}
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                  <Hotel size={13} className="text-blue-500" />
                  ₹{hotel.pricePerNight.toLocaleString()} per night
                </div>
              </div>

            </div>
          </div>

          {/* ── Stay Details Card ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Stay Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Calendar size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Check-in</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {formatDate(checkIn)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Calendar size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Check-out</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {formatDate(checkOut)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <BedDouble size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Rooms</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {rooms} Room{rooms > 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Users size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Guests</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {guests} Guest{guests > 1 ? 's' : ''}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ── Price Breakdown Card ── */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Price Breakdown
            </h2>
            <div className="flex flex-col gap-3 text-sm">

              <div className="flex justify-between text-gray-600">
                <span>Price per night</span>
                <span>₹{hotel.pricePerNight.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Nights</span>
                <span>{nights}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Rooms</span>
                <span>{rooms}</span>
              </div>
              <div className="flex justify-between text-gray-500 text-xs">
                <span>
                  ₹{hotel.pricePerNight.toLocaleString()} × {nights} night{nights > 1 ? 's' : ''} × {rooms} room{rooms > 1 ? 's' : ''}
                </span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-gray-800 text-base">
                <span>Total Amount</span>
                <span className="text-blue-600 text-xl">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>

            </div>
          </div>

          {/* ── Server Error ── */}
          {serverError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <AlertCircle size={16} />
              {serverError}
            </div>
          )}

          {/* ── Action Buttons ── */}
          <div className="flex flex-col sm:flex-row gap-3 pb-4">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold py-3.5 rounded-xl transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={handleConfirm}
              disabled={isPending}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Confirming...
                </>
              ) : (
                <>
                  <CheckCircle size={18} />
                  Confirm Booking
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default BookingConfirmPage;
/*
```

---

### Full Booking Flow
```
HotelDetailPage
      ↓
User fills BookingForm
      ↓
Clicks "Book Now"
      ↓
navigate('/booking/confirm', { state: { hotel, dates, rooms... } })
      ↓
BookingConfirmPage loads state via useLocation()
      ↓
User reviews details
      ↓
Clicks "Confirm Booking"
      ↓
createBookingApi() → POST /api/bookings
      ↓
Success? → isConfirmed = true → Success Screen
      ↓
Navigate to /my-bookings or /trips/me
```

---

### Responsive Breakdown

| Element | Mobile | Desktop |
|---------|--------|---------|
| Stay details grid | 1 column | 2 columns |
| Action buttons | stacked `flex-col` | side by side `flex-row` |
| Hotel image | `w-24` | `w-32` |
| Page width | full | `max-w-3xl` centered |

---

### What's Built So Far
```
✅ Navbar
✅ Footer
✅ Loader
✅ HotelCard
✅ HotelFilter
✅ HotelGallery
✅ BookingForm
✅ Pagination
✅ LoginPage
✅ RegisterPage
✅ HomePage
✅ HotelsPage
✅ HotelDetailPage
✅ BookingConfirmPage
⬜ MyBookingsPage     → next
⬜ TripDetailsPage
⬜ NotFoundPage
*/