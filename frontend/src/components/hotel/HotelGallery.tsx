import { useState } from 'react'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'

interface HotelGalleryProps {
  images: string[]
  hotelName: string
}

const HotelGallery = ({ images, hotelName }: HotelGalleryProps) => {
  const [activeIndex, setActiveIndex]   = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const allImages = images.length > 0
    ? images
    : ['https://placehold.co/800x500?text=No+Image']

  const prev = () =>
    setActiveIndex((i) => (i === 0 ? allImages.length - 1 : i - 1))

  const next = () =>
    setActiveIndex((i) => (i === allImages.length - 1 ? 0 : i + 1))

  return (
    <>
      {/* ── Main Gallery ── */}
      <div className="flex flex-col md:flex-row gap-3">

        {/* Main Image */}
        <div className="relative flex-1 rounded-2xl overflow-hidden h-64 md:h-96 group cursor-pointer"
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={allImages[activeIndex]}
            alt={`${hotelName} - ${activeIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Zoom Icon */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-white/80 backdrop-blur-sm p-3 rounded-full">
              <ZoomIn size={22} className="text-gray-700" />
            </div>
          </div>

          {/* Arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Counter */}
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
            {activeIndex + 1} / {allImages.length}
          </div>
        </div>

        {/* Thumbnails — visible on md+ */}
        {allImages.length > 1 && (
          <div className="hidden md:flex flex-col gap-2 w-24">
            {allImages.slice(0, 4).map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative h-[88px] rounded-xl overflow-hidden cursor-pointer border-2 transition-all
                  ${activeIndex === i
                    ? 'border-blue-500 opacity-100'
                    : 'border-transparent opacity-60 hover:opacity-90'
                  }`}
              >
                <img
                  src={img}
                  alt={`thumb-${i}`}
                  className="w-full h-full object-cover"
                />
                {/* More overlay */}
                {i === 3 && allImages.length > 4 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm font-bold">
                    +{allImages.length - 4}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ── Mobile Dots ── */}
      {allImages.length > 1 && (
        <div className="flex md:hidden justify-center gap-1.5 mt-3">
          {allImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`rounded-full transition-all ${
                activeIndex === i
                  ? 'w-5 h-2 bg-blue-600'
                  : 'w-2 h-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X size={22} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          <img
            src={allImages[activeIndex]}
            alt={hotelName}
            className="max-h-[85vh] max-w-full object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </>
  )
}

export default HotelGallery