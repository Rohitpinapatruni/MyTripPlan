import type { IBooking } from '../../types'
import {
  MapPin, Calendar, BedDouble,
  Users, CheckCircle, XCircle, Clock
} from 'lucide-react'

interface TripTimelineProps {
  bookings: IBooking[]
}

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('en-IN', {
    day:   'numeric',
    month: 'short',
    year:  'numeric',
  })

const statusIcon: Record<string, React.ReactNode> = {
  confirmed: <CheckCircle size={16} className="text-green-500" />,
  pending:   <Clock       size={16} className="text-amber-500" />,
  cancelled: <XCircle     size={16} className="text-red-400"   />,
}

const statusStyle: Record<string, string> = {
  confirmed: 'border-green-200 bg-green-50',
  pending:   'border-amber-200 bg-amber-50',
  cancelled: 'border-red-200  bg-red-50 opacity-60',
}

const TripTimeline = ({ bookings }: TripTimelineProps) => {
  // Sort bookings by check-in date
  const sorted = [...bookings].sort(
    (a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime()
  )

  return (
    <div className="relative flex flex-col gap-0">
      {sorted.map((booking, index) => {
        const hotel  = booking.hotelId
        const nights = Math.ceil(
          (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime())
          / (1000 * 60 * 60 * 24)
        )

        return (
          <div key={booking._id} className="flex gap-4 md:gap-6">

            {/* ── Timeline Line & Dot ── */}
            <div className="flex flex-col items-center shrink-0">
              {/* Dot */}
              <div className={`w-4 h-4 rounded-full border-2 shrink-0 mt-5
                ${booking.status === 'confirmed' ? 'bg-blue-600 border-blue-600'
                  : booking.status === 'pending' ? 'bg-amber-400 border-amber-400'
                  : 'bg-gray-300 border-gray-300'
                }`}
              />
              {/* Line — hide on last item */}
              {index < sorted.length - 1 && (
                <div className="w-0.5 bg-gray-200 flex-1 my-1 min-h-[20px]" />
              )}
            </div>

            {/* ── Booking Card ── */}
            <div className={`flex-1 mb-4 rounded-2xl border overflow-hidden shadow-sm
              ${statusStyle[booking.status]}`}
            >
              <div className="flex flex-col sm:flex-row">

                {/* Hotel Image */}
                <div className="sm:w-36 md:w-44 shrink-0">
                  <img
                    src={hotel.images?.[0] || 'https://placehold.co/180x130?text=Hotel'}
                    alt={hotel.name}
                    className="w-full h-36 sm:h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 p-4 flex flex-col gap-2">

                  {/* Hotel Name + Status */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-gray-800 text-base leading-tight">
                      {hotel.name}
                    </h3>
                    <div className="flex items-center gap-1 shrink-0">
                      {statusIcon[booking.status]}
                      <span className="text-xs font-medium capitalize text-gray-600">
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                    <MapPin size={13} className="text-blue-500 shrink-0" />
                    {hotel.location}
                  </div>

                  {/* Date Range */}
                  <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                    <Calendar size={13} className="text-blue-500 shrink-0" />
                    {formatDate(booking.checkIn)} → {formatDate(booking.checkOut)}
                    <span className="text-gray-400 text-xs">
                      ({nights} night{nights > 1 ? 's' : ''})
                    </span>
                  </div>

                  {/* Rooms & Guests */}
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <BedDouble size={13} className="text-blue-400" />
                      {booking.rooms} room{booking.rooms > 1 ? 's' : ''}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={13} className="text-blue-400" />
                      {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-auto pt-2 border-t border-current/10 flex justify-between items-center">
                    <span className="text-xs text-gray-400">Total Paid</span>
                    <span className="font-bold text-blue-600">
                      ₹{booking.totalPrice.toLocaleString()}
                    </span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        )
      })}
    </div>
  )
}

export default TripTimeline