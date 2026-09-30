import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../axiosCalls/axios'
import SiteHeader from '../components/SiteHeader'
import { useAuth } from '../auth/authContext'

const fashionEdits = [
  {
    label: "MEN'S EDIT",
    title: 'Off-duty layers',
    description: 'Relaxed layers and everyday staples, ready for wherever the day goes.',
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=85',
    alt: "Men's relaxed everyday outfit",
  },
  {
    label: "WOMEN'S EDIT",
    title: 'Weekend in color',
    description: 'Feel-good favorites and expressive details to make the look your own.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
    alt: 'Colorful contemporary womenswear',
  },
  {
    label: 'TRENDING OUTFITS',
    title: 'Monochrome, made easy',
    description: 'Choose one shade, then mix textures to give your outfit extra depth.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85',
    alt: 'Street style look in a coordinated palette',
  },
]

export default function Home() {
  const navigate = useNavigate()
  const { setUser } = useAuth()

const handleLogout = async () => {
  try {
    await axiosInstance.post("/customers/logout")
    setUser(null)
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

      <SiteHeader onLogout={handleLogout} />

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
              <button onClick={() => navigate('/products')} className="bg-[#FF6B4A] text-white font-[Sora] font-semibold text-[15px] px-6 py-3 rounded-lg hover:bg-[#F15A3A] transition-colors">
                Start shopping
              </button>
              <a href="#style-edit" className="text-[#1B2A2E] font-semibold text-[15px] px-4 py-3 hover:text-[#FF6B4A] transition-colors">Explore the style edit</a>
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

      {/* Fashion style edit */}
      <section id="style-edit" className="bg-[#FAF9F6] scroll-mt-16">
        <div className="max-w-300 mx-auto px-6 py-12 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-[12px] font-semibold tracking-[0.16em] text-[#D84F38]">A LITTLE INSPIRATION</p>
              <h2 className="font-[Sora] text-[#1B2A2E] text-[26px] sm:text-[30px] font-semibold tracking-tight mt-2">The style edit</h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#6B7773]">Fresh outfit ideas for him, for her, and for your next new favorite look.</p>
            </div>
            <Link to="/products?category=Fashion" className="text-sm font-semibold text-[#1B2A2E] transition-colors hover:text-[#D84F38]">Shop all fashion →</Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fashionEdits.map((edit) => (
              <article key={edit.label} className="group overflow-hidden rounded-xl border border-[#E4E2DC] bg-white">
                <div className="aspect-[4/3] overflow-hidden bg-[#F5F3EF]">
                  <img src={edit.image} alt={edit.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4 sm:p-5">
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-[#D84F38]">{edit.label}</p>
                  <h3 className="mt-2 font-[Sora] text-lg font-semibold text-[#1B2A2E]">{edit.title}</h3>
                  <p className="mt-2 min-h-10 text-sm leading-relaxed text-[#6B7773]">{edit.description}</p>
                  <Link to="/products?category=Fashion" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1B2A2E] hover:text-[#D84F38]">
                    Explore fashion <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
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
