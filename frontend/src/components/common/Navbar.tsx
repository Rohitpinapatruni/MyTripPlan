import { useState } from 'react'
import { Link,  } from 'react-router-dom'
import { Menu, X, Hotel, LogOut, BookOpen, Map } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)


  const handleLogout = () => {
    logout()
    setMenuOpen(false)
  }

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex items-center gap-2 text-blue-600 font-bold text-xl"
          >
            <Hotel size={28} />
            <span>StayEasy</span>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/hotels"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Hotels
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/my-bookings"
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                >
                  My Bookings
                </Link>
                <Link
                  to="/trips/me"
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                >
                  My Trip
                </Link>
                <div className="flex items-center gap-3">
                  <span className="text-gray-700 font-medium">
                    Hi, {user?.name.split(' ')[0]}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="md:hidden text-gray-600 hover:text-blue-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

        </div>
      </div>

      {/* ── Mobile Menu Dropdown ── */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4 shadow-lg">
          <Link
            to="/hotels"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium"
          >
            <Hotel size={18} />
            Hotels
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/my-bookings"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium"
              >
                <BookOpen size={18} />
                My Bookings
              </Link>
              <Link
                to="/trips/me"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium"
              >
                <Map size={18} />
                My Trip
              </Link>
              <div className="border-t pt-3 flex items-center justify-between">
                <span className="text-gray-700 font-medium">
                  Hi, {user?.name.split(' ')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-3 border-t pt-3">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-center text-gray-600 hover:text-blue-600 font-medium border border-gray-200 py-2 rounded-lg"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="text-center bg-blue-600 text-white py-2 rounded-lg font-medium"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar