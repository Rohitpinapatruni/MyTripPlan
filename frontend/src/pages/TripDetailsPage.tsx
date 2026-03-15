import { useNavigate } from 'react-router-dom'
import {
  Map, BookOpen, Hotel, ArrowLeft,
  PlusCircle, AlertCircle
} from 'lucide-react'
import Navbar     from '../components/common/Navbar'
import Footer     from '../components/common/Footer'
import Loader     from '../components/common/Loader'
import TripCard   from '../components/trip/TripCard'
import TripTimeline from '../components/trip/TripTimeline'
import { useMyTrip } from '../hooks/useTrip'

const TripDetailsPage = () => {
  const navigate                     = useNavigate()
  const { data, isLoading, isError } = useMyTrip()
  const trip = data?.data?.trip

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* ── Page Header ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-2.5 rounded-xl">
                <Map size={22} />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                  My Trip
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">
                  Your full travel itinerary
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/my-bookings')}
                className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2.5 rounded-xl transition-colors"
              >
                <BookOpen size={15} />
                My Bookings
              </button>
              <button
                onClick={() => navigate('/hotels')}
                className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-xl transition-colors"
              >
                <PlusCircle size={15} />
                Add Hotel
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 w-full">

        {/* ── Loading ── */}
        {isLoading && <Loader text="Loading your trip..." />}

        {/* ── Error ── */}
        {isError && !isLoading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="bg-red-50 p-5 rounded-full">
              <AlertCircle size={40} className="text-red-300" />
            </div>
            <h3 className="text-gray-700 font-semibold text-lg">
              Failed to load trip
            </h3>
            <p className="text-gray-400 text-sm text-center max-w-xs">
              Something went wrong. Please try again later.
            </p>
          </div>
        )}

        {/* ── No Trip Yet ── */}
        {!isLoading && !isError && !trip && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="bg-blue-50 p-6 rounded-full">
              <Hotel size={48} className="text-blue-300" />
            </div>
            <h3 className="text-gray-700 font-semibold text-xl">
              No trip yet
            </h3>
            <p className="text-gray-400 text-sm text-center max-w-xs">
              Start booking hotels to build your trip itinerary.
            </p>
            <button
              onClick={() => navigate('/hotels')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-colors mt-2 flex items-center gap-2"
            >
              <PlusCircle size={18} />
              Browse Hotels
            </button>
          </div>
        )}

        {/* ── Trip Content ── */}
        {!isLoading && !isError && trip && (
          <div className="flex flex-col gap-6">

            {/* ── Trip Summary Card ── */}
            <TripCard trip={trip} />

            {/* ── Empty Bookings ── */}
            {trip.bookings.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                No bookings in this trip yet.
              </div>
            )}

            {/* ── Timeline ── */}
            {trip.bookings.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

                {/* Section Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-800">
                    Trip Timeline
                  </h2>
                  <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                    {trip.bookings.length} stop{trip.bookings.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <TripTimeline bookings={trip.bookings} />

              </div>
            )}

            {/* ── Notes Section ── */}
            {trip.notes && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-3">
                  Trip Notes
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {trip.notes}
                </p>
              </div>
            )}

            {/* ── Bottom Actions ── */}
            <div className="flex flex-col sm:flex-row gap-3 pb-4">
              <button
                onClick={() => navigate('/hotels')}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <PlusCircle size={18} />
                Add Another Hotel
              </button>
              <button
                onClick={() => navigate('/my-bookings')}
                className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <BookOpen size={18} />
                Manage Bookings
              </button>
            </div>

          </div>
        )}

      </div>

      <Footer />
    </div>
  )
}

export default TripDetailsPage