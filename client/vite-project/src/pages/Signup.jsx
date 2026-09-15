import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { axiosInstance } from '../axiosCalls/axios'

export default function Signup() {
    const [form, setForm] = useState({ fullname: "", email: "", password: "", username: "", phone: "" })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)
        try {
            await axiosInstance.post("/customers/register", form)
            console.log("User Registered")
        }
        catch (error) {
            console.log(error)
            setError(
                error?.response?.data?.message || "Something went wrong. Please try again."
            )
        }
        finally {
            setLoading(false)
        }
    }
  return (
    <div className="min-h-screen w-full bg-white flex items-stretch font-[Inter]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
      `}</style>

      {/* Left panel — cart illustration */}
      <div className="hidden lg:flex lg:w-[44%] relative bg-[#FFF4EC] flex-col justify-between p-12 overflow-hidden">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-[10px] bg-[#1B2A2E] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="9" cy="20" r="1.2" fill="#FFF4EC" />
              <circle cx="17" cy="20" r="1.2" fill="#FFF4EC" />
              <path d="M2.5 3h2l2.2 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.97-1.66L20 7.5H6" stroke="#FFF4EC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-[#1B2A2E] font-[Sora] font-semibold text-lg tracking-tight">ShopKart</span>
        </div>

        <div className="relative flex-1 flex items-center justify-center">
          <div className="absolute top-6 left-2 bg-white rounded-xl shadow-[0_8px_24px_-8px_rgba(27,42,46,0.18)] px-3.5 py-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF6B4A]" />
            <span className="text-[#1B2A2E] text-[13px] font-medium">Flat 30% off</span>
          </div>
          <div className="absolute bottom-10 right-0 bg-white rounded-xl shadow-[0_8px_24px_-8px_rgba(27,42,46,0.18)] px-3.5 py-2.5">
            <div className="text-[#1B2A2E] text-[13px] font-semibold">Free delivery</div>
            <div className="text-[#8A9490] text-[11px]">on your first order</div>
          </div>
          <div className="absolute top-1/2 -right-4 -translate-y-1/2 bg-[#1B2A2E] rounded-xl px-3.5 py-2">
            <div className="text-[#FFF4EC] text-[13px] font-semibold">★ 4.7 rated</div>
          </div>

          <div className="relative w-64 h-64 rounded-4xl bg-white shadow-[0_20px_50px_-15px_rgba(27,42,46,0.25)] flex items-center justify-center">
            <svg width="130" height="130" viewBox="0 0 24 24" fill="none">
              <circle cx="9" cy="20" r="1.4" fill="#1B2A2E" />
              <circle cx="17" cy="20" r="1.4" fill="#1B2A2E" />
              <path d="M2.5 3h2l2.2 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.97-1.66L20 7.5H6" stroke="#1B2A2E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="9.5" y="9.5" width="3" height="3" rx="0.5" fill="#FF6B4A"/>
            </svg>
          </div>
        </div>

        <div className="max-w-sm">
          <p className="font-[Sora] text-[#1B2A2E] text-[26px] leading-tight font-semibold tracking-tight">
            Everything you need, one cart away.
          </p>
          <p className="text-[#6B7773] text-[14px] leading-relaxed mt-3">
            Create your account to save items, track orders, and check out faster.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-100">
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-[10px] bg-[#1B2A2E] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="9" cy="20" r="1.2" fill="#FFF4EC" />
                <circle cx="17" cy="20" r="1.2" fill="#FFF4EC" />
                <path d="M2.5 3h2l2.2 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.97-1.66L20 7.5H6" stroke="#FFF4EC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-[#1B2A2E] font-[Sora] font-semibold text-lg tracking-tight">ShopKart</span>
          </div>

          <h1 className="font-[Sora] text-[#1B2A2E] text-[28px] font-semibold tracking-tight">
            Create your account
          </h1>
          <p className="text-[#6B7773] text-[15px] mt-2 mb-8">
            Fill in your details below to start shopping.
          </p>

          {error && (
            <div className="mb-6 flex items-start gap-2.5 rounded-lg border border-[#E0483A]/25 bg-[#E0483A]/6 px-4 py-3 text-sm text-[#B03A2E]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0">
                <circle cx="12" cy="12" r="9" stroke="#B03A2E" strokeWidth="1.6"/>
                <path d="M12 8v5" stroke="#B03A2E" strokeWidth="1.6" strokeLinecap="round"/>
                <circle cx="12" cy="16" r="0.9" fill="#B03A2E"/>
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form noValidate className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName" className="block text-[13px] font-medium text-[#1B2A2E] mb-1.5">
                Full name <span className="text-[#E0483A]">*</span>
              </label>
              <input
                id="fullName"
                name="fullname"
                onChange={handleChange}
                type="text"
                placeholder="Ananya Sharma"
                autoComplete="name"
                disabled={loading}
                className="w-full px-3.5 py-2.5 rounded-lg text-[15px] text-[#1B2A2E] placeholder:text-[#A6AEAB] bg-white border border-[#E4E2DC] outline-none transition-colors focus:border-[#1B2A2E] focus:ring-2 focus:ring-[#1B2A2E]/12 disabled:bg-[#FAFAF8] disabled:text-[#A6AEAB]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[13px] font-medium text-[#1B2A2E] mb-1.5">
                Email address <span className="text-[#E0483A]">*</span>
              </label>
              <input
                id="email"
                name="email"
                onChange={handleChange}
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                disabled={loading}
                className="w-full px-3.5 py-2.5 rounded-lg text-[15px] text-[#1B2A2E] placeholder:text-[#A6AEAB] bg-white border border-[#E4E2DC] outline-none transition-colors focus:border-[#1B2A2E] focus:ring-2 focus:ring-[#1B2A2E]/12 disabled:bg-[#FAFAF8] disabled:text-[#A6AEAB]"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-[13px] font-medium text-[#1B2A2E] mb-1.5">
                Phone number <span className="text-[#E0483A]">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                onChange={handleChange}
                type="tel"
                placeholder="98765 43210"
                autoComplete="tel"
                disabled={loading}
                className="w-full px-3.5 py-2.5 rounded-lg text-[15px] text-[#1B2A2E] placeholder:text-[#A6AEAB] bg-white border border-[#E4E2DC] outline-none transition-colors focus:border-[#1B2A2E] focus:ring-2 focus:ring-[#1B2A2E]/12 disabled:bg-[#FAFAF8] disabled:text-[#A6AEAB]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[13px] font-medium text-[#1B2A2E] mb-1.5">
                Password <span className="text-[#E0483A]">*</span>
              </label>
              <input
                id="password"
                name="password"
                onChange={handleChange}
                type="password"
                placeholder="More than 6 characters"
                autoComplete="new-password"
                disabled={loading}
                className="w-full px-3.5 py-2.5 rounded-lg text-[15px] text-[#1B2A2E] placeholder:text-[#A6AEAB] bg-white border border-[#E4E2DC] outline-none transition-colors focus:border-[#1B2A2E] focus:ring-2 focus:ring-[#1B2A2E]/12 disabled:bg-[#FAFAF8] disabled:text-[#A6AEAB]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF6B4A] text-white font-[Sora] font-semibold text-[15px] py-3 rounded-lg mt-2 hover:bg-[#F15A3A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B4A] focus-visible:ring-offset-2 disabled:bg-[#FF6B4A]/60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="white" strokeOpacity="0.35" strokeWidth="3"/>
                  <path d="M21 12a9 9 0 0 0-9-9" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              )}
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="text-center text-[#6B7773] text-sm mt-7">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[#1B2A2E] font-semibold hover:text-[#FF6B4A] transition-colors focus:outline-none focus-visible:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}