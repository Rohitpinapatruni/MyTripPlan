import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Hotel, Eye, EyeOff, Loader } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import type { RegisterInput } from '../types'


// ── Validation Schema ──
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type RegisterFormInput = RegisterInput & { confirmPassword: string }

const RegisterPage = () => {
  const { register: registerUser } = useAuth()
  const [showPassword, setShowPassword]        = useState(false)
  const [showConfirmPassword, setShowConfirm]  = useState(false)
  const [serverError, setServerError]          = useState('')
  const [isLoading, setIsLoading]              = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInput>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormInput) => {
    try {
      setIsLoading(true)
      setServerError('')
      const { confirmPassword, ...registerData } = data
      await registerUser(registerData)
    } catch (error: any) {
      setServerError(
        error?.response?.data?.message || 'Registration failed. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* ── Card ── */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">

          {/* ── Logo ── */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-blue-600 text-white p-3 rounded-xl mb-3">
              <Hotel size={32} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Create Account
            </h1>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              Join StayEasy and start booking
            </p>
          </div>

          {/* ── Server Error ── */}
          {serverError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
              {serverError}
            </div>
          )}

          {/* ── Form ── */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

            {/* Name */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                {...register('name')}
                type="text"
                placeholder="John Doe"
                className={`w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition
                  ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="john@example.com"
                className={`w-full border rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition
                  ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`w-full border rounded-lg px-4 py-3 pr-11 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition
                    ${errors.password ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`w-full border rounded-lg px-4 py-3 pr-11 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition
                    ${errors.confirmPassword ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>

          </form>

          {/* ── Footer ── */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign in here
            </Link>
          </p>
            
        </div>
      </div>
    </div>
  )
}

export default RegisterPage;
