import { useNavigate } from 'react-router-dom'
import { Hotel, ArrowLeft } from 'lucide-react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">

          {/* 404 Visual */}
          <div className="relative mb-8">
            <div className="text-[130px] md:text-[160px] font-black text-gray-100 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-blue-600 text-white p-5 rounded-2xl shadow-xl">
                <Hotel size={42} />
              </div>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Page Not Found
          </h1>
          <p className="text-gray-500 text-sm md:text-base mb-8 leading-relaxed">
            Oops! The page you're looking for doesn't exist
            or may have been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium px-6 py-3 rounded-xl transition-colors"
            >
              <ArrowLeft size={17} />
              Go Back
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-colors"
            >
              <Hotel size={17} />
              Back to Home
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default NotFoundPage;
/*
```

---

### Trip Timeline Visual
```
● Grand Hyatt Mumbai          ← confirmed (blue dot)
│  Mar 10 → Mar 13 · 3 nights
│  2 rooms · 3 guests · ₹12,000
│
● Taj Hotel Goa               ← confirmed (blue dot)
│  Mar 15 → Mar 18 · 3 nights
│  1 room  · 2 guests · ₹9,000
│
● The Oberoi Delhi            ← cancelled (grey dot)
   Apr 1 → Apr 3 · 2 nights
   1 room · 1 guest · ₹8,000
```

---

### Responsive Breakdown

| Element | Mobile | Desktop |
|---------|--------|---------|
| Header | stacked | side by side |
| TripCard stats | stacked | side by side |
| TripCard cost | full width | right side panel |
| Timeline | full width | full width |
| Booking cards | image top | image left |
| Bottom buttons | stacked | side by side |

---

## 🎉 Frontend Complete!
```
✅ main.tsx
✅ App.tsx
✅ AppRoutes.tsx
✅ AuthContext + useAuth
✅ Types
✅ API Layer (auth, hotel, booking, trip)
✅ Hooks (useHotels, useBooking, useTrip)
✅ Navbar + Footer + Loader + Pagination
✅ HotelCard + HotelFilter + HotelGallery
✅ BookingForm + BookingCard
✅ TripCard + TripTimeline
✅ LoginPage + RegisterPage
✅ HomePage
✅ HotelsPage
✅ HotelDetailPage
✅ BookingConfirmPage
✅ MyBookingsPage
✅ TripDetailsPage
✅ NotFoundPage */