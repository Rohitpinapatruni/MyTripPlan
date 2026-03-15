import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Users, BedDouble, Calculator, LogIn } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import type { IHotel } from '../../types'

interface BookingFormProps {
  hotel: IHotel
}

const BookingForm = ({ hotel }: BookingFormProps) => {
  const { isAuthenticated } = useAuth()
  const navigate            = useNavigate()

  const today     = new Date().toISOString().split('T')[0]
  const tomorrow  = new Date(Date.now() + 86400000).toISOString().split('T')[0]

  const [checkIn,  setCheckIn]  = useState(today)
  const [checkOut, setCheckOut] = useState(tomorrow)
  const [rooms,    setRooms]    = useState(1)
  const [guests,   setGuests]   = useState(1)
  const [nights,   setNights]   = useState(1)
  const [total,    setTotal]    = useState(hotel.pricePerNight)
  const [error,    setError]    = useState('')

  // Recalculate nights & total whenever dates/rooms change
  useEffect(() => {
    const checkInDate  = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    const diff = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (diff <= 0) {
      setError('Check-out must be after check-in')
      setNights(0)
      setTotal(0)
    } else {
      setError('')
      setNights(diff)
      setTotal(diff * rooms * hotel.pricePerNight)
    }
  }, [checkIn, checkOut, rooms, hotel.pricePerNight])

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    if (error || nights <= 0) return

    // Pass booking details via navigation state
    navigate('/booking/confirm', {
      state: {
        hotel,
        checkIn,
        checkOut,
        rooms,
        guests,
        nights,
        totalPrice: total,
      },
    })
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">

      {/* ── Price Header ── */}
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-3xl font-bold text-blue-600">
          ₹{hotel.pricePerNight.toLocaleString()}
        </span>
        <span className="text-gray-400 text-sm">/night</span>
      </div>

      <div className="flex flex-col gap-4">

        {/* Check-in */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar size={13} />
            Check-in
          </label>
          <input
            type="date"
            value={checkIn}
            min={today}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Check-out */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar size={13} />
            Check-out
          </label>
          <input
            type="date"
            value={checkOut}
            min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Rooms & Guests */}
        <div className="flex gap-3">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <BedDouble size={13} />
              Rooms
            </label>
            <input
              type="number"
              value={rooms}
              min={1}
              max={hotel.totalRooms}
              onChange={(e) => setRooms(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <Users size={13} />
              Guests
            </label>
            <input
              type="number"
              value={guests}
              min={1}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* Date Error */}
        {error && (
          <p className="text-red-500 text-xs bg-red-50 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        {/* Price Breakdown */}
        {!error && nights > 0 && (
          <div className="bg-blue-50 rounded-xl p-4 flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span className="flex items-center gap-1.5">
                <Calculator size={13} />
                ₹{hotel.pricePerNight.toLocaleString()} × {nights} night{nights > 1 ? 's' : ''} × {rooms} room{rooms > 1 ? 's' : ''}
              </span>
            </div>
            <div className="border-t border-blue-100 pt-2 flex justify-between font-bold text-gray-800">
              <span>Total</span>
              <span className="text-blue-600 text-lg">
                ₹{total.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Book Now Button */}
        <button
          onClick={handleBookNow}
          disabled={!!error || nights <= 0}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 mt-1"
        >
          {!isAuthenticated ? (
            <>
              <LogIn size={18} />
              Login to Book
            </>
          ) : (
            'Book Now'
          )}
        </button>

        {/* Note */}
        <p className="text-center text-xs text-gray-400">
          Free cancellation before check-in
        </p>

      </div>
    </div>
  )
}

export default BookingForm