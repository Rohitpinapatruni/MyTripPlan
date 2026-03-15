import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Hotel, SearchX } from 'lucide-react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import HotelCard from '../components/hotel/HotelCard'
import HotelFilter from '../components/hotel/HotelFilter'
import Pagination from '../components/common/Pagination'
import Loader from '../components/common/Loader'
import { useHotels } from '../hooks/useHotels'

const ITEMS_PER_PAGE = 8

interface FilterState {
  search: string
  minPrice: string
  maxPrice: string
  rating: string
}

const HotelsPage = () => {
  const [searchParams]        = useSearchParams()
  const initialSearch         = searchParams.get('search') || ''
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<FilterState>({
    search:   initialSearch,
    minPrice: '',
    maxPrice: '',
    rating:   '',
  })

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  // Build query params
  const queryParams = {
    ...(filters.search   && { search:   filters.search }),
    ...(filters.minPrice && { minPrice: Number(filters.minPrice) }),
    ...(filters.maxPrice && { maxPrice: Number(filters.maxPrice) }),
    ...(filters.rating   && { rating:   Number(filters.rating) }),
    page:  currentPage,
    limit: ITEMS_PER_PAGE,
  }

  const { data, isLoading, isError } = useHotels(queryParams)
  const hotels   = data?.data?.hotels || []
  const total    = data?.data?.total  || 0

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* ── Page Header ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-6 md:py-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2.5 rounded-xl">
              <Hotel size={22} />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                All Hotels
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">
                {isLoading
                  ? 'Searching...'
                  : `${total} hotel${total !== 1 ? 's' : ''} found`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-8 w-full">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ────────────────────────
              LEFT — Filters Sidebar
          ──────────────────────── */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-24">
              <HotelFilter
                onFilterChange={handleFilterChange}
                initialSearch={initialSearch}
              />
            </div>
          </aside>

          {/* ────────────────────────
              RIGHT — Hotel Results
          ──────────────────────── */}
          <main className="flex-1">

            {/* Loading */}
            {isLoading && <Loader text="Searching hotels..." />}

            {/* Error */}
            {isError && !isLoading && (
              <div className="text-center py-20">
                <div className="text-red-400 mb-3">
                  <SearchX size={48} className="mx-auto" />
                </div>
                <p className="text-gray-600 font-medium">
                  Something went wrong.
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Please try again later.
                </p>
              </div>
            )}

            {/* No Results */}
            {!isLoading && !isError && hotels.length === 0 && (
              <div className="text-center py-20">
                <SearchX size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600 font-semibold text-lg">
                  No hotels found
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Try adjusting your filters or search term.
                </p>
              </div>
            )}

            {/* Hotel Grid */}
            {!isLoading && !isError && hotels.length > 0 && (
              <>
                {/* Active Filter Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {filters.search && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-medium">
                      🔍 "{filters.search}"
                    </span>
                  )}
                  {filters.minPrice && (
                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-medium">
                      Min ₹{filters.minPrice}
                    </span>
                  )}
                  {filters.maxPrice && (
                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-medium">
                      Max ₹{filters.maxPrice}
                    </span>
                  )}
                  {filters.rating && (
                    <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full font-medium">
                      ⭐ {filters.rating}+
                    </span>
                  )}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {hotels.map((hotel) => (
                    <HotelCard key={hotel._id} hotel={hotel} />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalItems={total}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onPageChange={setCurrentPage}
                />
              </>
            )}

          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default HotelsPage

/*
```

---

### Responsive Breakdown

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Layout | stacked `flex-col` | stacked | sidebar + grid `flex-row` |
| Filter panel | collapsible toggle | collapsible | always visible sticky sidebar |
| Hotel grid | 1 column | 2 columns | 3 columns |
| Sidebar | full width top | full width top | `w-72` fixed left |
| Pagination | centered | centered | centered |

---

### How Filters + Search Work Together
```
User types "Mumbai" in search
        ↓
HotelFilter calls onFilterChange()
        ↓
HotelsPage updates filters state
        ↓
useEffect resets page to 1
        ↓
useHotels() called with new params
        ↓
GET /api/hotels?search=Mumbai&page=1&limit=8
        ↓
React Query refetches automatically
        ↓
New results displayed in grid
```

---

### What's Built So Far
```
✅ Navbar
✅ Footer
✅ Loader
✅ HotelCard
✅ HotelFilter
✅ Pagination
✅ LoginPage
✅ RegisterPage
✅ HomePage
✅ HotelsPage
⬜ HotelDetailPage    → next
⬜ BookingConfirmPage
⬜ MyBookingsPage
⬜ TripDetailsPage

*/