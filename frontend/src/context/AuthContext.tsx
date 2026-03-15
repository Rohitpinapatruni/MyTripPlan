import {
  createContext,
  useContext,
  useState,
  useEffect,
  
} from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import type { IUser, RegisterInput, LoginInput } from '../types'
import { registerApi, loginApi, getMeApi } from '../api/authApi'

// ─────────────────────────────
// Context Type
// ─────────────────────────────
interface AuthContextType {
  user: IUser | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  register: (data: RegisterInput) => Promise<void>
  login: (data: LoginInput) => Promise<void>
  logout: () => void
}

// ─────────────────────────────
// Create Context
// ─────────────────────────────
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// ─────────────────────────────
// Auth Provider
// ─────────────────────────────
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser]       = useState<IUser | null>(null)
  const [token, setToken]     = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const navigate              = useNavigate()

  // ─────────────────────────────
  // On app load — check if token
  // exists and fetch user
  // ─────────────────────────────
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token')

      if (storedToken) {
        setToken(storedToken)
        try {
          const response = await getMeApi()
          if (response.data?.user) {
            setUser(response.data.user)
          }
        } catch (error) {
          // token invalid or expired
          localStorage.removeItem('token')
          setToken(null)
          setUser(null)
        }
      }
      setIsLoading(false)
    }

    initAuth()
  }, [])

  // ─────────────────────────────
  // Register
  // ─────────────────────────────
  const register = async (data: RegisterInput): Promise<void> => {
    const response = await registerApi(data)

    if (response.data) {
      const { token, user } = response.data
      localStorage.setItem('token', token)
      setToken(token)
      setUser(user)
      navigate('/')
    }
  }

  // ─────────────────────────────
  // Login
  // ─────────────────────────────
  const login = async (data: LoginInput): Promise<void> => {
    const response = await loginApi(data)

    if (response.data) {
      const { token, user } = response.data
      localStorage.setItem('token', token)
      setToken(token)
      setUser(user)
      navigate('/')
    }
  }

  // ─────────────────────────────
  // Logout
  // ─────────────────────────────
  const logout = (): void => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user,
        register,
        login,
        logout,
      }}
    >
      {/* Don't render app until auth check is done */}
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

// ─────────────────────────────
// Export Context Hook
// ─────────────────────────────
export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return context
}