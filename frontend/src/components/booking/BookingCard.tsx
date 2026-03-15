import { useState } from 'react'
import { MapPin, Calendar, BedDouble, Users, Receipt, X, Loader } from 'lucide-react'
import type { IBooking } from '../../types'
import { useCancelBooking } from '../../hooks/useBooking'

interface BookingCardProps {
  booking: IBooking
}

const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day:   'numeric',
    month: 'short',
    year:  'numeric',
  })
}

// Status styles map
const statusStyles: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-700 border-green-200',
  pending:   'bg-amber-100 text-amber-700 border-amber-200',
  cancelled: 'bg-red-100  text-red-600   border-red-200',
}

const statusDot: Record<string, string> = {
  confirmed: 'bg-green-500',
  pending:   'bg-amber-500',
  cancelled: 'bg-red-500',
}

const BookingCard = ({ booking }: BookingCardProps) => {
  const { mutateAsync: cancelBooking, isPending } = useCancelBooking()
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError]             = useState('')

  const hotel  = booking.hotelId
  const nights = Math.ceil(
    (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime())
    / (1000 * 60 * 60 * 24)
  )

  const handleCancel = async () => {
    try {
      setError('')
      await cancelBooking(booking._id)
      setShowConfirm(false)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Cancellation failed.')
    }
  }

  return (
    <div className={`bg-white rounded-2xl shadow-sm border overflow-hidden transition-all
      ${booking.status === 'cancelled' ? 'border-red-100 opacity-75' : 'border-gray-100 hover:shadow-md'}`}
    >
      <div className="flex flex-col sm:flex-row">

        {/* ── Hotel Image ── */}
        <div className="relative sm:w-44 md:w-52 shrink-0">
          <img
            src={hotel.images?.[0] || 'https://placehold.co/200x150?text=Hotel'}
            alt={hotel.name}
            className="w-full h-44 sm:h-full object-cover"
          />
          {/* Status Badge over image */}
          <div className={`absolute top-3 left-3 flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm ${statusStyles[booking.status]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusDot[booking.status]}`} />
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </div>
        </div>

        {/* ── Booking Details ── */}
        <div className="flex-1 p-5 flex flex-col gap-3">

          {/* Hotel Name & Location */}
          <div>
            <h3 className="font-bold text-gray-800 text-lg leading-tight">
              {hotel.name}
            </h3>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-1">
              <MapPin size={13} className="text-blue-500 shrink-0" />
              {hotel.location}
            </div>
          </div>

          {/* Dates & Stay Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar size={11} />
                Check-in
              </span>
              <span className="text-sm font-semibold text-gray-700">
                {formatDate(booking.checkIn)}
              </span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar size={11} />
                Check-out
              </span>
              <span className="text-sm font-semibold text-gray-700">
                {formatDate(booking.checkOut)}
              </span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <BedDouble size={11} />
                Rooms
              </span>
              <span className="text-sm font-semibold text-gray-700">
                {booking.rooms} × {nights} night{nights > 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Users size={11} />
                Guests
              </span>
              <span className="text-sm font-semibold text-gray-700">
                {booking.guests} Guest{booking.guests > 1 ? 's' : ''}
              </span>
            </div>

          </div>

          {/* Price & Cancel Row */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">

            <div className="flex items-center gap-1.5">
              <Receipt size={15} className="text-blue-500" />
              <span className="text-xl font-bold text-blue-600">
                ₹{booking.totalPrice.toLocaleString()}
              </span>
            </div>

            {/* Cancel Button */}
            {booking.status === 'confirmed' && (
              <button
                onClick={() => setShowConfirm(true)}
                className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 border border-red-200 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors"
              >
                <X size={14} />
                Cancel
              </button>
            )}

          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-xs bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

        </div>
      </div>

      {/* ── Cancel Confirmation Dialog ── */}
      {showConfirm && (
        <div className="border-t border-red-100 bg-red-50 px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm text-red-700 font-medium">
            Are you sure you want to cancel this booking?
          </p>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 text-sm border border-gray-200 bg-white rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Keep Booking
            </button>
            <button
              onClick={handleCancel}
              disabled={isPending}
              className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white rounded-lg font-medium transition-colors flex items-center gap-1.5"
            >
              {isPending ? (
                <>
                  <Loader size={14} className="animate-spin" />
                  Cancelling...
                </>
              ) : (
                'Yes, Cancel'
              )}
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default BookingCard