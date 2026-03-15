import { Link } from 'react-router-dom'
import { Hotel, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">

        {/* ── Top Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <Hotel size={26} />
              <span>StayEasy</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Find and book the perfect hotel for your next trip. Trusted by thousands of travelers.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-semibold text-base mb-1">
              Quick Links
            </h3>
            <Link to="/" className="text-sm hover:text-blue-400 transition-colors">Home</Link>
            <Link to="/hotels" className="text-sm hover:text-blue-400 transition-colors">Hotels</Link>
            <Link to="/my-bookings" className="text-sm hover:text-blue-400 transition-colors">My Bookings</Link>
            <Link to="/trips/me" className="text-sm hover:text-blue-400 transition-colors">My Trip</Link>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-semibold text-base mb-1">
              Support
            </h3>
            <span className="text-sm hover:text-blue-400 transition-colors cursor-pointer">FAQ</span>
            <span className="text-sm hover:text-blue-400 transition-colors cursor-pointer">Cancellation Policy</span>
            <span className="text-sm hover:text-blue-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="text-sm hover:text-blue-400 transition-colors cursor-pointer">Terms of Service</span>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-semibold text-base mb-1">
              Contact Us
            </h3>
            <div className="flex items-center gap-2 text-sm">
              <Mail size={15} className="text-blue-400" />
              support@stayeasy.com
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone size={15} className="text-blue-400" />
              +91 98765 43210
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={15} className="text-blue-400" />
              Mumbai, India
            </div>
          </div>

        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} StayEasy. All rights reserved.
        </div>

      </div>
    </footer>
  )
}

export default Footer