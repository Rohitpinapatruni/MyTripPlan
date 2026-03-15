import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Star, Shield, Clock } from 'lucide-react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import HotelCard from '../components/hotel/HotelCard'
import Loader from '../components/common/Loader'
import { useHotels } from '../hooks/useHotels'

// ── Features Data ──
const features = [
  {
    icon: <Search size={28} className="text-blue-600" />,
    title: 'Easy Search',
    desc: 'Find hotels by location, price, and amenities instantly.',
  },
  {
    icon: <Shield size={28} className="text-blue-600" />,
    title: 'Secure Booking',
    desc: 'Your bookings and payments are fully protected.',
  },
  {
    icon: <Clock size={28} className="text-blue-600" />,
    title: 'Instant Confirmation',
    desc: 'Get your booking confirmed in seconds.',
  },
  {
    icon: <Star size={28} className="text-blue-600" />,
    title: 'Top Rated Hotels',
    desc: 'Only the best hotels verified by real travellers.',
  },
]

const HomePage = () => {
  const navigate             = useNavigate()
  const [search, setSearch]  = useState('')

  // Fetch featured hotels (limit 4)
  const { data, isLoading } = useHotels({ limit: 4 })
  const featuredHotels = data?.data?.hotels || []

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/hotels?search=${encodeURIComponent(search.trim())}`)
    } else {
      navigate('/hotels')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* ════════════════════════════════
          HERO SECTION
      ════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white">

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-20 md:py-32">
          <div className="max-w-2xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star size={14} fill="currentColor" className="text-amber-300" />
              Trusted by 10,000+ travellers
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Find Your
              <span className="block text-amber-300">Perfect Stay</span>
            </h1>

            <p className="text-blue-100 text-lg md:text-xl mb-10 leading-relaxed">
              Discover and book top-rated hotels across India.
              Best prices, instant confirmation, no hidden fees.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 bg-white rounded-2xl p-2 shadow-2xl">
              <div className="flex items-center gap-3 flex-1 px-3">
                <MapPin size={20} className="text-blue-400 shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search by city or hotel name..."
                  className="w-full py-2 text-gray-700 outline-none text-sm md:text-base placeholder-gray-400"
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shrink-0"
              >
                <Search size={18} />
                <span>Search</span>
              </button>
            </div>

            {/* Quick Tags */}
            <div className="flex flex-wrap gap-2 mt-5">
              {['Mumbai', 'Delhi', 'Goa', 'Bangalore', 'Jaipur'].map((city) => (
                <button
                  key={city}
                  onClick={() => navigate(`/hotels?search=${city}`)}
                  className="text-xs bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1.5 rounded-full transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          STATS BAR
      ════════════════════════════════ */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '500+', label: 'Hotels' },
              { value: '50+', label: 'Cities' },
              { value: '10K+', label: 'Happy Guests' },
              { value: '4.8★', label: 'Avg Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-bold text-blue-600">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          FEATURED HOTELS
      ════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Featured Hotels
            </h2>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              Hand-picked top-rated stays for your next trip
            </p>
          </div>
          <button
            onClick={() => navigate('/hotels')}
            className="text-blue-600 hover:underline font-medium text-sm shrink-0"
          >
            View all hotels →
          </button>
        </div>

        {/* Hotel Grid */}
        {isLoading ? (
          <Loader text="Loading featured hotels..." />
        ) : featuredHotels.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredHotels.map((hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-16">
            No hotels available yet.
          </div>
        )}

      </section>

      {/* ════════════════════════════════
          WHY CHOOSE US
      ════════════════════════════════ */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">

          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Why Choose StayEasy?
            </h2>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Everything you need for a perfect trip
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3"
              >
                <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════
          CTA SECTION
      ════════════════════════════════ */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Ready to Plan Your Trip?
          </h2>
          <p className="text-blue-100 text-base md:text-lg mb-8 max-w-xl mx-auto">
            Browse hundreds of hotels and book your perfect stay in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/hotels')}
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Browse Hotels
            </button>
            <button
              onClick={() => navigate('/register')}
              className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Create Account
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default HomePage
