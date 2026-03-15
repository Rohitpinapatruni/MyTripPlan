import { useState, useEffect } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'

interface FilterState {
  search: string
  minPrice: string
  maxPrice: string
  rating: string
}

interface HotelFilterProps {
  onFilterChange: (filters: FilterState) => void
  initialSearch?: string
}

const HotelFilter = ({ onFilterChange, initialSearch = '' }: HotelFilterProps) => {
  const [isOpen, setIsOpen]   = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    search:   initialSearch,
    minPrice: '',
    maxPrice: '',
    rating:   '',
  })

  // Notify parent whenever filters change
  useEffect(() => {
    onFilterChange(filters)
  }, [filters])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const clearFilters = () => {
    setFilters({ search: '', minPrice: '', maxPrice: '', rating: '' })
  }

  const hasActiveFilters =
    filters.minPrice || filters.maxPrice || filters.rating

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">

      {/* ── Search Bar ── */}
      <div className="relative mb-4">
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search hotels or cities..."
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition pr-10"
        />
        {filters.search && (
          <button
            onClick={() => setFilters((p) => ({ ...p, search: '' }))}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* ── Toggle Filters Button (mobile) ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-full flex items-center justify-between text-sm font-medium text-gray-700 bg-gray-50 px-4 py-2.5 rounded-xl mb-3"
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} />
          Filters
          {hasActiveFilters && (
            <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
              Active
            </span>
          )}
        </div>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>

      {/* ── Filter Controls ── */}
      <div className={`flex flex-col gap-4 ${isOpen ? 'block' : 'hidden'} md:flex`}>

        {/* Price Range */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
            Price Per Night (₹)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              placeholder="Min"
              min={0}
              className="w-1/2 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              placeholder="Max"
              min={0}
              className="w-1/2 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
            Minimum Rating
          </label>
          <select
            name="rating"
            value={filters.rating}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
          >
            <option value="">Any Rating</option>
            <option value="3">3★ & above</option>
            <option value="3.5">3.5★ & above</option>
            <option value="4">4★ & above</option>
            <option value="4.5">4.5★ & above</option>
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="w-full text-sm text-red-500 hover:text-red-600 border border-red-200 hover:bg-red-50 py-2 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <X size={14} />
            Clear Filters
          </button>
        )}

      </div>
    </div>
  )
}

export default HotelFilter