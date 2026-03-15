import type { ITrip } from '../../types'
import { Receipt, Hotel, Calendar } from 'lucide-react'

interface TripCardProps {
  trip: ITrip
}

const TripCard = ({ trip }: TripCardProps) => {
  const confirmedCount = trip.bookings.filter(
    (b) => b.status === 'confirmed'
  ).length

  const cancelledCount = trip.bookings.filter(
    (b) => b.status === 'cancelled'
  ).length

  // Earliest check-in and latest check-out
  const sortedDates = [...trip.bookings]
    .filter((b) => b.status !== 'cancelled')
    .sort((a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime())

  const tripStart = sortedDates[0]?.checkIn
  const tripEnd   = sortedDates[sortedDates.length - 1]?.checkOut

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-2xl p-6 shadow-md">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        {/* Left */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold">My Trip Overview</h2>

          {/* Date Range */}
          {tripStart && tripEnd && (
            <div className="flex items-center gap-2 text-blue-100 text-sm">
              <Calendar size={15} />
              {new Date(tripStart).toLocaleDateString('en-IN', {
                day: 'numeric', month: 'short', year: 'numeric'
              })}
              {' → '}
              {new Date(tripEnd).toLocaleDateString('en-IN', {
                day: 'numeric', month: 'short', year: 'numeric'
              })}
            </div>
          )}

          {/* Stats Row */}
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full">
              <Hotel size={13} />
              {trip.bookings.length} Hotel{trip.bookings.length !== 1 ? 's' : ''}
            </div>
            <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full">
              ✅ {confirmedCount} Confirmed
            </div>
            {cancelledCount > 0 && (
              <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full">
                ❌ {cancelledCount} Cancelled
              </div>
            )}
          </div>
        </div>

        {/* Right — Total Cost */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 text-center shrink-0">
          <div className="flex items-center gap-2 text-blue-100 text-xs mb-1 justify-center">
            <Receipt size={12} />
            Total Trip Cost
          </div>
          <div className="text-3xl font-bold">
            ₹{trip.totalCost.toLocaleString()}
          </div>
        </div>

      </div>

    </div>
  )
}

export default TripCard