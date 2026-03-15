import { Link } from 'react-router-dom'
import { MapPin, Star, Wifi, Car, Waves } from 'lucide-react'
import type { IHotel } from '../../types'

interface HotelCardProps {
  hotel: IHotel
}

// Map amenity names to icons
const amenityIcons: Record<string, React.ReactNode> = {
  WiFi:    <Wifi size={13} />,
  Parking: <Car size={13} />,
  Pool:    <Waves size={13} />,
}

const HotelCard = ({ hotel }: HotelCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">

      {/* ── Image ── */}
      <div className="relative overflow-hidden h-48 md:h-52">
        <img
          src={hotel.images[0] || 'https://placehold.co/400x300?text=No+Image'}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm flex items-center gap-1 px-2 py-1 rounded-full text-sm font-semibold text-amber-500 shadow">
          <Star size={13} fill="currentColor" />
          {hotel.rating.toFixed(1)}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-4 flex flex-col gap-3">

        {/* Name & Location */}
        <div>
          <h3 className="font-bold text-gray-800 text-lg leading-tight line-clamp-1">
            {hotel.name}
          </h3>
          <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
            <MapPin size={13} />
            <span className="line-clamp-1">{hotel.location}</span>
          </div>
        </div>

        {/* Amenities */}
        {hotel.amenities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {hotel.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full"
              >
                {amenityIcons[amenity] || null}
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="text-xs text-gray-400 px-2 py-1">
                +{hotel.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div>
            <span className="text-blue-600 font-bold text-lg">
              ₹{hotel.pricePerNight.toLocaleString()}
            </span>
            <span className="text-gray-400 text-xs"> /night</span>
          </div>
          <Link
            to={`/hotels/${hotel._id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            View Details
          </Link>
        </div>

      </div>
    </div>
  )
}

export default HotelCard