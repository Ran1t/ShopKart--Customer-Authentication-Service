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

const wobblyRadius = '255px 15px 225px 15px / 15px 225px 15px 255px'
const cardRadius = '18px 5px 20px 7px / 8px 20px 6px 18px'

export default function Home() {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/customers/logout')
      setUser(null)
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div
      className="min-h-screen w-full bg-[#fdfbf7] font-[Patrick_Hand] text-[#2d2d2d]"
      style={{
        backgroundImage: 'radial-gradient(#e5e0d8 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@700&family=Patrick+Hand&display=swap');
      `}</style>

      <SiteHeader theme="paper" onLogout={handleLogout} />

      <main className="mx-auto max-w-5xl px-5 sm:px-6">
        <section className="grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div
            className="relative border-[3px] border-[#2d2d2d] bg-white px-6 py-8 shadow-[8px_8px_0px_0px_#2d2d2d] sm:px-10 sm:py-10"
            style={{ borderRadius: wobblyRadius }}
          >
            <span
              aria-hidden="true"
              className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 rotate-[-3deg] bg-[#e5e0d8]/80"
              style={{ borderRadius: '3px 2px 5px 1px' }}
            />
            <span
              className="inline-flex -rotate-2 items-center gap-2 border-2 border-[#2d2d2d] bg-[#fff9c4] px-3 py-1.5 text-sm font-bold"
              style={{ borderRadius: '5px 2px 7px 3px' }}
            >
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#ff4d4d]" />
              Festive sale is live
            </span>
            <h1 className="mt-5 font-[Kalam] text-4xl leading-[1.12] sm:text-5xl">
              Everything you need, delivered to your door<span className="text-[#ff4d4d]">!</span>
            </h1>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-[#55514c] sm:text-xl">
              Shop electronics, fashion, home essentials and more — with fast delivery and easy returns on every order.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigate('/products')}
                className="min-h-12 border-[3px] border-[#2d2d2d] bg-white px-6 py-2 text-lg font-bold shadow-[4px_4px_0px_0px_#2d2d2d] transition duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#ff4d4d] hover:text-white hover:shadow-[2px_2px_0px_0px_#2d2d2d] active:translate-x-1 active:translate-y-1 active:shadow-none"
                style={{ borderRadius: wobblyRadius }}
              >
                Start shopping
              </button>
              <a
                href="#style-edit"
                className="min-h-12 px-3 py-2 text-lg font-bold text-[#2d2d2d] underline decoration-[#2d5da1] decoration-2 underline-offset-4 transition hover:text-[#2d5da1]"
              >
                Explore the style edit
              </a>
            </div>
            <svg aria-hidden="true" className="absolute -bottom-8 right-7 hidden h-12 w-28 rotate-6 text-[#2d5da1] sm:block" viewBox="0 0 112 48" fill="none">
              <path d="M5 10c27 1 49 10 69 26m0 0-3-14m3 14 13-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 5" />
            </svg>
          </div>

          <div className="relative flex min-h-72 items-center justify-center py-4 sm:min-h-80">
            <div
              className="flex h-56 w-56 rotate-2 items-center justify-center border-[3px] border-[#2d2d2d] bg-[#fff9c4] shadow-[8px_8px_0px_0px_#2d2d2d] transition-transform duration-150 hover:-rotate-2 sm:h-64 sm:w-64"
              style={{ borderRadius: '22px 8px 26px 10px / 12px 28px 9px 24px' }}
            >
              <svg className="h-28 w-28 text-[#2d2d2d] sm:h-32 sm:w-32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="9" cy="20" r="1.4" fill="currentColor" />
                <circle cx="17" cy="20" r="1.4" fill="currentColor" />
                <path d="M2.5 3h2l2.2 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.97-1.66L20 7.5H6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="m10 10 2 2m0-2-2 2" stroke="#ff4d4d" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <div
              className="absolute left-0 top-5 -rotate-3 border-2 border-[#2d2d2d] bg-white px-3.5 py-2 shadow-[3px_3px_0px_0px_#2d2d2d] sm:left-2"
              style={{ borderRadius: '7px 15px 5px 13px' }}
            >
              <span className="text-lg font-bold">Flat 30% off ✳</span>
            </div>
            <div
              className="absolute bottom-2 right-0 rotate-2 border-2 border-[#2d2d2d] bg-white px-3.5 py-2.5 shadow-[3px_3px_0px_0px_#2d2d2d] sm:right-2"
              style={{ borderRadius: '15px 6px 13px 7px' }}
            >
              <div className="text-lg font-bold">Free delivery</div>
              <div className="text-sm text-[#55514c]">on orders over ₹499</div>
            </div>
            <span aria-hidden="true" className="absolute right-2 top-1 hidden animate-bounce font-[Kalam] text-4xl text-[#ff4d4d] [animation-duration:3s] sm:block">✳</span>
          </div>
        </section>

        <section id="style-edit" className="scroll-mt-20 py-8 sm:py-12">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b-2 border-dashed border-[#2d2d2d]/40 pb-4">
            <div>
              <p
                className="inline-block -rotate-1 bg-[#fff9c4] px-3 py-1 text-sm font-bold tracking-[0.12em] text-[#2d5da1]"
                style={{ borderRadius: '4px 2px 6px 3px' }}
              >
                A LITTLE INSPIRATION
              </p>
              <h2 className="mt-2 font-[Kalam] text-3xl sm:text-4xl">The style edit</h2>
              <p className="mt-2 max-w-lg text-lg leading-relaxed text-[#55514c]">
                Fresh outfit ideas for him, for her, and for your next new favorite look.
              </p>
            </div>
            <Link
              to="/products?category=Fashion"
              className="text-lg font-bold text-[#2d2d2d] underline decoration-[#ff4d4d] decoration-2 underline-offset-4 transition-colors hover:text-[#2d5da1]"
            >
              Shop all fashion →
            </Link>
          </div>

          <div className="grid gap-7 pb-12 sm:grid-cols-2 lg:grid-cols-3">
            {fashionEdits.map((edit, index) => (
              <article
                key={edit.label}
                className={`group relative border-2 border-[#2d2d2d] bg-white p-2.5 shadow-[4px_4px_0px_0px_rgba(45,45,45,0.28)] transition-transform duration-100 hover:-translate-y-1 hover:rotate-1 hover:shadow-[6px_6px_0px_0px_#2d2d2d] motion-reduce:transition-none ${index === 1 ? 'rotate-[0.5deg]' : index === 2 ? '-rotate-[0.5deg]' : ''}`}
                style={{ borderRadius: cardRadius }}
              >
                <span
                  className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 -rotate-2 bg-[#fff9c4] px-3 py-1 text-sm font-bold"
                  style={{ borderRadius: '3px 2px 5px 1px' }}
                >
                  {edit.label}
                </span>
                <div
                  className="aspect-[4/3] overflow-hidden border-2 border-[#2d2d2d] bg-[#e5e0d8]"
                  style={{ borderRadius: '10px 5px 12px 6px / 6px 12px 5px 10px' }}
                >
                  <img src={edit.image} alt={edit.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="px-2 pb-2 pt-4">
                  <h3 className="font-[Kalam] text-2xl text-[#2d2d2d]">{edit.title}</h3>
                  <p className="mt-1 min-h-12 text-lg leading-relaxed text-[#55514c]">{edit.description}</p>
                  <Link
                    to="/products?category=Fashion"
                    className="mt-4 inline-flex min-h-12 items-center gap-2 text-lg font-bold text-[#2d5da1] underline decoration-[#2d5da1] decoration-2 underline-offset-4 hover:text-[#ff4d4d]"
                  >
                    Explore fashion <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-[#2d2d2d] bg-[#e5e0d8]/80">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-5 py-10 sm:px-6 md:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div
                className="flex h-9 w-9 rotate-[-3deg] items-center justify-center border-2 border-[#2d2d2d] bg-[#fff9c4] shadow-[2px_2px_0px_0px_#2d2d2d]"
                style={{ borderRadius: '10px 5px 12px 6px' }}
              >
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="9" cy="20" r="1.2" fill="#2d2d2d" />
                  <circle cx="17" cy="20" r="1.2" fill="#2d2d2d" />
                  <path d="M2.5 3h2l2.2 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.97-1.66L20 7.5H6" stroke="#2d2d2d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-[Kalam] text-xl font-bold">ShopKart</span>
            </div>
            <p className="text-base leading-relaxed text-[#55514c]">Your everyday marketplace for everything, delivered fast.</p>
          </div>
          <div>
            <h2 className="mb-3 font-[Kalam] text-xl font-bold">Shop</h2>
            <ul className="space-y-2 text-base text-[#55514c]">
              <li><Link to="/products?category=Electronics" className="transition hover:text-[#2d5da1] hover:line-through">Electronics</Link></li>
              <li><Link to="/products?category=Fashion" className="transition hover:text-[#2d5da1] hover:line-through">Fashion</Link></li>
              <li><Link to="/products?category=Home" className="transition hover:text-[#2d5da1] hover:line-through">Home &amp; Living</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 font-[Kalam] text-xl font-bold">Support</h2>
            <ul className="space-y-2 text-base text-[#55514c]">
              <li><a href="#style-edit" className="transition hover:text-[#2d5da1] hover:line-through">Track order</a></li>
              <li><a href="#style-edit" className="transition hover:text-[#2d5da1] hover:line-through">Returns</a></li>
              <li><a href="#style-edit" className="transition hover:text-[#2d5da1] hover:line-through">Contact us</a></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 font-[Kalam] text-xl font-bold">Company</h2>
            <ul className="space-y-2 text-base text-[#55514c]">
              <li><a href="#style-edit" className="transition hover:text-[#2d5da1] hover:line-through">About</a></li>
              <li><a href="#style-edit" className="transition hover:text-[#2d5da1] hover:line-through">Careers</a></li>
              <li><a href="#style-edit" className="transition hover:text-[#2d5da1] hover:line-through">Terms</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
