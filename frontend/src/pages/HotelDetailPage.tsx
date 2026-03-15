import { useParams, useNavigate } from 'react-router-dom'
import {
  MapPin, Star, BedDouble, Wifi, Car,
  Waves, Dumbbell, Coffee, ArrowLeft, CheckCircle
} from 'lucide-react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import Loader from '../components/common/Loader'
import HotelGallery from '../components/hotel/HotelGallery'
import BookingForm from '../components/booking/BookingForm'
import { useHotel } from '../hooks/useHotels'

// Map amenity to icon
const amenityIconMap: Record<string, React.ReactNode> = {
  WiFi:       <Wifi size={16} />,
  Parking:    <Car size={16} />,
  Pool:       <Waves size={16} />,
  Gym:        <Dumbbell size={16} />,
  Breakfast:  <Coffee size={16} />,
  Restaurant: <Coffee size={16} />,
}

const HotelDetailPage = () => {
  const { id }   = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data, isLoading, isError } = useHotel(id!)
  const hotel = data?.data?.hotel

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <Loader text="Loading hotel details..." />
        <Footer />
      </div>
    )
  }

  // ── Error / Not Found ──
  if (isError || !hotel) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
          <p className="text-gray-500 text-lg">Hotel not found.</p>
          <button
            onClick={() => navigate('/hotels')}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            Back to Hotels
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-8 w-full">

        {/* ── Back Button ── */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 text-sm font-medium mb-6 transition-colors group"
        >
          <ArrowLeft size={17} className="group-hover:-translate-x-1 transition-transform" />
          Back to Hotels
        </button>

        {/* ── Gallery ── */}
        <HotelGallery images={hotel.images} hotelName={hotel.name} />

        {/* ── Main Content Grid ── */}
        <div className="flex flex-col lg:flex-row gap-8 mt-8">

          {/* ────────────────────────
              LEFT — Hotel Info
          ──────────────────────── */}
          <div className="flex-1 flex flex-col gap-6">

            {/* Name, Location, Rating */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                    {hotel.name}
                  </h1>
                  <div className="flex items-center gap-1.5 text-gray-500 mt-2">
                    <MapPin size={15} className="text-blue-500 shrink-0" />
                    <span className="text-sm md:text-base">{hotel.location}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex flex-col items-center bg-amber-50 border border-amber-200 px-5 py-3 rounded-2xl shrink-0">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={18} fill="currentColor" />
                    <span className="text-2xl font-bold text-gray-800">
                      {hotel.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 mt-0.5">Rating</span>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-5 border-t border-gray-100">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">
                    Price / Night
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    ₹{hotel.pricePerNight.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">
                    Total Rooms
                  </span>
                  <div className="flex items-center gap-1.5 text-gray-700 font-semibold">
                    <BedDouble size={16} className="text-blue-500" />
                    {hotel.totalRooms} Rooms
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">
                    Status
                  </span>
                  <div className="flex items-center gap-1.5 text-green-600 font-semibold">
                    <CheckCircle size={16} />
                    Available
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-3">
                About This Hotel
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {hotel.description}
              </p>
            </div>

            {/* Amenities */}
            {hotel.amenities.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {hotel.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2.5 bg-blue-50 text-blue-700 px-4 py-3 rounded-xl text-sm font-medium"
                    >
                      {amenityIconMap[amenity] || <CheckCircle size={16} />}
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-3">
                Location
              </h2>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={17} className="text-blue-500 shrink-0" />
                <span className="text-sm md:text-base">{hotel.location}</span>
              </div>
              {/* Map Placeholder */}
              <div className="mt-4 bg-gray-100 rounded-xl h-40 flex items-center justify-center text-gray-400 text-sm">
                🗺️ Map view coming soon
              </div>
            </div>

          </div>

          {/* ────────────────────────
              RIGHT — Booking Form
          ──────────────────────── */}
          <div className="w-full lg:w-80 xl:w-96 shrink-0">
            <BookingForm hotel={hotel} />
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default HotelDetailPage;
/*
```

---

### Responsive Breakdown

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Gallery | full width, dots nav | full width | main + thumbnails |
| Layout | stacked `flex-col` | stacked | side by side `flex-row` |
| Booking form | full width bottom | full width bottom | sticky `w-96` right |
| Stats row | 2 columns | 3 columns | 3 columns |
| Amenities | 2 columns | 3 columns | 3 columns |
| Lightbox | full screen | full screen | full screen |

---

### How Booking Form Navigates to Confirm Page
```
User fills dates, rooms, guests
        ↓
Clicks "Book Now"
        ↓
isAuthenticated?
  ❌ NO  → navigate('/login')
  ✅ YES → navigate('/booking/confirm', {
              state: {
                hotel,
                checkIn,
                checkOut,
                rooms,
                guests,
                nights,
                totalPrice
              }
            })
        ↓
BookingConfirmPage reads
state via useLocation()
```

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
⬜ BookingConfirmPage  → next
⬜ MyBookingsPage
⬜ TripDetailsPage
⬜ NotFoundPage
*/