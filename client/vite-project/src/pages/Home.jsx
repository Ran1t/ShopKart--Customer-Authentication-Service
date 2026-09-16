import React from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../axiosCalls/axios'

const categories = [
  'All', 'Electronics', 'Fashion', 'Home & Living', 'Beauty', 'Groceries', 'Sports',
]

const products = [
  { name: 'Wireless Earbuds', price: '₹1,499', tag: 'Bestseller', color: '#FFE3D1' },
  { name: 'Everyday Backpack', price: '₹2,199', tag: null, color: '#E4EFEA' },
  { name: 'Ceramic Mug Set', price: '₹649', tag: 'New', color: '#FDEBD4' },
  { name: 'Running Shoes', price: '₹3,299', tag: null, color: '#E8E4F3' },
  { name: 'Desk Lamp', price: '₹899', tag: null, color: '#FCE4E4' },
  { name: 'Cotton Bedsheet', price: '₹1,099', tag: 'Sale', color: '#E2F0F5' },
  { name: 'Smart Watch', price: '₹4,499', tag: null, color: '#FFF0D9' },
  { name: 'Yoga Mat', price: '₹799', tag: null, color: '#E9F1E3' },
]

export default function Home() {
  const navigate = useNavigate()

const handleLogout = async () => {
  try {
    await axiosInstance.post("/customers/logout")
    navigate("/login")
  } catch (error) {
    console.error("Logout failed:", error)
  }
}
  return (
    <div className="min-h-screen w-full bg-white font-[Inter]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
      `}</style>

      {/* Navbar */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-[#E4E2DC]">
        <div className="max-w-300 mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-[9px] bg-[#1B2A2E] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="9" cy="20" r="1.2" fill="#FFF4EC" />
                <circle cx="17" cy="20" r="1.2" fill="#FFF4EC" />
                <path d="M2.5 3h2l2.2 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.97-1.66L20 7.5H6" stroke="#FFF4EC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-[#1B2A2E] font-[Sora] font-semibold text-lg tracking-tight">ShopKart</span>
          </div>

          <div className="hidden md:flex flex-1 max-w-md">
            <div className="w-full flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#E4E2DC] text-[#A6AEAB]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="#A6AEAB" strokeWidth="1.8"/>
                <path d="m20 20-3.5-3.5" stroke="#A6AEAB" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <span className="text-[14px]">Search for products, brands...</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-[14px] text-[#1B2A2E] font-medium">
            <a href="#" className="hover:text-[#FF6B4A] transition-colors">Deals</a>
            <a href="#" className="hover:text-[#FF6B4A] transition-colors">Orders</a>
            <a href="#" className="hover:text-[#FF6B4A] transition-colors">Wishlist</a>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button className="relative w-9 h-9 rounded-full border border-[#E4E2DC] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="9" cy="20" r="1.3" fill="#1B2A2E" />
                <circle cx="17" cy="20" r="1.3" fill="#1B2A2E" />
                <path d="M2.5 3h2l2.2 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.97-1.66L20 7.5H6" stroke="#1B2A2E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF6B4A] text-white text-[10px] font-semibold flex items-center justify-center">3</span>
            </button>
            <div className="w-9 h-9 rounded-full bg-[#1B2A2E] text-[#FFF4EC] text-[13px] font-semibold flex items-center justify-center">
              A
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg bg-[#FF6B4A] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#F15A3A]"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[#FFF4EC]">
        <div className="max-w-300 mx-auto px-6 py-14 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-white text-[#1B2A2E] text-[13px] font-medium px-3 py-1.5 rounded-full border border-[#E4E2DC]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A]" />
              Festive sale is live
            </span>
            <h1 className="font-[Sora] text-[#1B2A2E] text-[40px] leading-[1.15] font-semibold tracking-tight mt-5">
              Everything you need, delivered to your door.
            </h1>
            <p className="text-[#6B7773] text-[16px] leading-relaxed mt-4 max-w-md">
              Shop electronics, fashion, home essentials and more — with fast delivery and easy returns on every order.
            </p>
            <div className="flex items-center gap-3 mt-7">
              <button className="bg-[#FF6B4A] text-white font-[Sora] font-semibold text-[15px] px-6 py-3 rounded-lg hover:bg-[#F15A3A] transition-colors">
                Start shopping
              </button>
              <button className="text-[#1B2A2E] font-semibold text-[15px] px-4 py-3 hover:text-[#FF6B4A] transition-colors">
                Browse deals →
              </button>
            </div>
          </div>

          <div className="relative h-72 flex items-center justify-center">
            <div className="absolute top-2 left-4 bg-white rounded-xl shadow-[0_8px_24px_-8px_rgba(27,42,46,0.18)] px-3.5 py-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6B4A]" />
              <span className="text-[#1B2A2E] text-[13px] font-medium">Flat 30% off</span>
            </div>
            <div className="absolute bottom-6 right-2 bg-white rounded-xl shadow-[0_8px_24px_-8px_rgba(27,42,46,0.18)] px-3.5 py-2.5">
              <div className="text-[#1B2A2E] text-[13px] font-semibold">Free delivery</div>
              <div className="text-[#8A9490] text-[11px]">on orders over ₹499</div>
            </div>
            <div className="w-56 h-56 rounded-4xl bg-white shadow-[0_20px_50px_-15px_rgba(27,42,46,0.25)] flex items-center justify-center">
              <svg width="110" height="110" viewBox="0 0 24 24" fill="none">
                <circle cx="9" cy="20" r="1.4" fill="#1B2A2E" />
                <circle cx="17" cy="20" r="1.4" fill="#1B2A2E" />
                <path d="M2.5 3h2l2.2 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.97-1.66L20 7.5H6" stroke="#1B2A2E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="9.5" y="9.5" width="3" height="3" rx="0.5" fill="#FF6B4A"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-300 mx-auto px-6 py-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`shrink-0 px-4 py-2 rounded-full text-[14px] font-medium border transition-colors ${
                i === 0
                  ? 'bg-[#1B2A2E] text-white border-[#1B2A2E]'
                  : 'bg-white text-[#1B2A2E] border-[#E4E2DC] hover:border-[#1B2A2E]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Product grid */}
      <section className="max-w-300 mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-[Sora] text-[#1B2A2E] text-[22px] font-semibold tracking-tight">
            Picked for you
          </h2>
          <a href="#" className="text-[#1B2A2E] text-[14px] font-medium hover:text-[#FF6B4A] transition-colors">
            View all
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <div
              key={p.name}
              className="group rounded-xl border border-[#E4E2DC] overflow-hidden hover:border-[#1B2A2E] transition-colors"
            >
              <div
                className="relative h-40 flex items-center justify-center"
                style={{ backgroundColor: p.color }}
              >
                {p.tag && (
                  <span className="absolute top-2.5 left-2.5 bg-white text-[#1B2A2E] text-[11px] font-semibold px-2 py-1 rounded-full">
                    {p.tag}
                  </span>
                )}
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="4" width="16" height="16" rx="2" stroke="#1B2A2E" strokeWidth="1.4" opacity="0.35"/>
                  <path d="M4 15l4.5-4.5a1.5 1.5 0 0 1 2.1 0L16 16" stroke="#1B2A2E" strokeWidth="1.4" opacity="0.35" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="9" r="1.3" fill="#1B2A2E" opacity="0.35"/>
                </svg>
              </div>
              <div className="p-3.5">
                <div className="text-[#1B2A2E] text-[14px] font-medium leading-snug">{p.name}</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[#1B2A2E] font-[Sora] font-semibold text-[15px]">{p.price}</span>
                  <button className="text-[12px] font-semibold text-[#FF6B4A] group-hover:underline">
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1B2A2E]">
        <div className="max-w-300 mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#FF6B4A] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="9" cy="20" r="1.2" fill="#1B2A2E" />
                  <circle cx="17" cy="20" r="1.2" fill="#1B2A2E" />
                  <path d="M2.5 3h2l2.2 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.97-1.66L20 7.5H6" stroke="#1B2A2E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-[#FFF4EC] font-[Sora] font-semibold text-[15px]">ShopKart</span>
            </div>
            <p className="text-[#8A9490] text-[13px] leading-relaxed">Your everyday marketplace for everything, delivered fast.</p>
          </div>
          <div>
            <div className="text-[#FFF4EC] text-[13px] font-semibold mb-3">Shop</div>
            <ul className="space-y-2 text-[#8A9490] text-[13px]">
              <li><a href="#" className="hover:text-[#FF6B4A] transition-colors">Electronics</a></li>
              <li><a href="#" className="hover:text-[#FF6B4A] transition-colors">Fashion</a></li>
              <li><a href="#" className="hover:text-[#FF6B4A] transition-colors">Home & Living</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[#FFF4EC] text-[13px] font-semibold mb-3">Support</div>
            <ul className="space-y-2 text-[#8A9490] text-[13px]">
              <li><a href="#" className="hover:text-[#FF6B4A] transition-colors">Track order</a></li>
              <li><a href="#" className="hover:text-[#FF6B4A] transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-[#FF6B4A] transition-colors">Contact us</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[#FFF4EC] text-[13px] font-semibold mb-3">Company</div>
            <ul className="space-y-2 text-[#8A9490] text-[13px]">
              <li><a href="#" className="hover:text-[#FF6B4A] transition-colors">About</a></li>
              <li><a href="#" className="hover:text-[#FF6B4A] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#FF6B4A] transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
