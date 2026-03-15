import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen, CheckCircle, Clock,
  XCircle, Hotel, Map
} from 'lucide-react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import Loader from '../components/common/Loader'
import BookingCard from '../components/booking/BookingCard'
import { useMyBookings } from '../hooks/useBooking'
import type { IBooking } from '../types'

// Filter tabs
type FilterTab = 'all' | 'confirmed' | 'pending' | 'cancelled'

const tabs: { label: string; value: FilterTab; icon: React.ReactNode }[] = [
  { label: 'All',       value: 'all',       icon: <BookOpen  size={15} /> },
  { label: 'Confirmed', value: 'confirmed', icon: <CheckCircle size={15} /> },
  { label: 'Pending',   value: 'pending',   icon: <Clock      size={15} /> },
  { label: 'Cancelled', value: 'cancelled', icon: <XCircle    size={15} /> },
]

const MyBookingsPage = () => {
  const navigate                    = useNavigate()
  const [activeTab, setActiveTab]   = useState<FilterTab>('all')
  const { data, isLoading, isError } = useMyBookings()

  const allBookings: IBooking[] = data?.data?.bookings || []

  // Filter by tab
  const filtered = activeTab === 'all'
    ? allBookings
    : allBookings.filter((b) => b.status === activeTab)

  // Count per status
  const counts = {
    all:       allBookings.length,
    confirmed: allBookings.filter((b) => b.status === 'confirmed').length,
    pending:   allBookings.filter((b) => b.status === 'pending').length,
    cancelled: allBookings.filter((b) => b.status === 'cancelled').length,
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* ── Page Header ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-2.5 rounded-xl">
                <BookOpen size={22} />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                  My Bookings
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">
                  {allBookings.length} total booking{allBookings.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {/* Trip Button */}
            <button
              onClick={() => navigate('/trips/me')}
              className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              <Map size={16} />
              View My Trip
            </button>

          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 w-full">

        {/* ── Filter Tabs ── */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-6 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors
                ${activeTab === tab.value
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
            >
              {tab.icon}
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold
                ${activeTab === tab.value
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-500'
                }`}
              >
                {counts[tab.value]}
              </span>
            </button>
          ))}
        </div>

        {/* ── Loading ── */}
        {isLoading && <Loader text="Loading your bookings..." />}

        {/* ── Error ── */}
        {isError && !isLoading && (
          <div className="text-center py-20">
            <p className="text-gray-500">Failed to load bookings. Please try again.</p>
          </div>
        )}

        {/* ── Empty State ── */}
        {!isLoading && !isError && allBookings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="bg-blue-50 p-6 rounded-full">
              <Hotel size={48} className="text-blue-300" />
            </div>
            <h3 className="text-gray-700 font-semibold text-lg">
              No bookings yet
            </h3>
            <p className="text-gray-400 text-sm text-center max-w-xs">
              You haven't made any bookings yet. Start by browsing our hotels.
            </p>
            <button
              onClick={() => navigate('/hotels')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-xl transition-colors mt-2"
            >
              Browse Hotels
            </button>
          </div>
        )}

        {/* ── No Results for Tab ── */}
        {!isLoading && !isError && allBookings.length > 0 && filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 font-medium">
              No {activeTab} bookings found.
            </p>
          </div>
        )}

        {/* ── Bookings List ── */}
        {!isLoading && !isError && filtered.length > 0 && (
          <div className="flex flex-col gap-4">
            {filtered.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        )}

      </div>

      <Footer />
    </div>
  )
}

export default MyBookingsPage
/*
```

---

### How Tabs + Filter Work
```
allBookings = [ confirmed, confirmed, cancelled, pending ]

activeTab = 'confirmed'
        ↓
filtered = allBookings.filter(b => b.status === 'confirmed')
        ↓
Shows only confirmed bookings

counts = {
  all: 4, confirmed: 2, pending: 1, cancelled: 1
}
        ↓
Shown as badge on each tab
```

---

### Responsive Breakdown

| Element | Mobile | Desktop |
|---------|--------|---------|
| Header | stacked | side by side |
| Tabs | scrollable horizontal | full row |
| BookingCard | stacked image top | image left, details right |
| Stay info grid | 2 columns | 4 columns |
| Cancel dialog | stacked | side by side |

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
✅ BookingCard
✅ Pagination
✅ LoginPage
✅ RegisterPage
✅ HomePage
✅ HotelsPage
✅ HotelDetailPage
✅ BookingConfirmPage
✅ MyBookingsPage
⬜ TripDetailsPage   → next
⬜ NotFoundPage
*/