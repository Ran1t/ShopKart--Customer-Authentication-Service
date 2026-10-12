import { Link } from 'react-router-dom'

const categories = [
  {
    name: 'Everyday tech',
    description: 'Useful little upgrades for work and play.',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=85',
    alt: 'Headphones and everyday electronics',
    color: '#fff9c4',
  },
  {
    name: 'Wear it your way',
    description: 'Easy favorites for your own kind of style.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85',
    alt: 'Friends browsing a clothing store',
    color: '#e5e0d8',
  },
  {
    name: 'Make room for cozy',
    description: 'Small touches that make a place feel like yours.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85',
    alt: 'Warm, comfortable living room',
    color: '#dce8f5',
  },
]

const wobblyRadius = '255px 15px 225px 15px / 15px 225px 15px 255px'

function CartMark() {
  return (
    <span
      className="flex h-10 w-10 rotate-[-3deg] items-center justify-center border-2 border-[#2d2d2d] bg-[#fff9c4] shadow-[2px_2px_0px_0px_#2d2d2d]"
      style={{ borderRadius: '10px 5px 12px 6px / 6px 12px 5px 10px' }}
    >
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="20" r="1.2" />
        <circle cx="17" cy="20" r="1.2" />
        <path d="M2.5 3h2l2.2 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.97-1.66L20 7.5H6" />
      </svg>
    </span>
  )
}

export default function Landing() {
  return (
    <div
      className="min-h-screen bg-[#fdfbf7] font-[Patrick_Hand] text-[#2d2d2d]"
      style={{
        backgroundImage: 'radial-gradient(#e5e0d8 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@700&family=Patrick+Hand&display=swap');
      `}</style>

      <header className="sticky top-0 z-20 border-b-2 border-[#2d2d2d] bg-[#fdfbf7]/95 backdrop-blur">
        <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="ShopKart home">
            <CartMark />
            <span className="font-[Kalam] text-2xl font-bold">ShopKart</span>
          </Link>
          <nav aria-label="Main navigation" className="flex items-center gap-3 sm:gap-5">
            <a href="#collections" className="hidden text-base font-bold transition hover:text-[#2d5da1] sm:inline">Collections</a>
            <a href="#how-it-works" className="hidden text-base font-bold transition hover:text-[#2d5da1] md:inline">How it works</a>
            <Link to="/login" className="px-2 py-2 text-sm font-bold underline decoration-[#2d5da1] decoration-2 underline-offset-4 transition hover:text-[#2d5da1] sm:px-3 sm:text-base">Log in</Link>
            <Link
              to="/signup"
              className="border-2 border-[#2d2d2d] bg-[#ff4d4d] px-3 py-2 text-sm font-bold text-white shadow-[3px_3px_0px_0px_#2d2d2d] transition hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-[#2d5da1] hover:shadow-[2px_2px_0px_0px_#2d2d2d] sm:px-4 sm:text-base"
              style={{ borderRadius: '12px 5px 14px 6px' }}
            >
              Join ShopKart
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 sm:px-8">
        <section className="grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
          <div
            className="relative border-[3px] border-[#2d2d2d] bg-white px-6 py-8 shadow-[8px_8px_0px_0px_#2d2d2d] sm:px-10 sm:py-11"
            style={{ borderRadius: wobblyRadius }}
          >
            <span
              className="inline-flex -rotate-2 items-center gap-2 border-2 border-[#2d2d2d] bg-[#fff9c4] px-3 py-1.5 text-sm font-bold tracking-wide"
              style={{ borderRadius: '5px 2px 7px 3px' }}
            >
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#ff4d4d]" />
              YOUR NEXT GOOD FIND
            </span>
            <h1 className="mt-5 max-w-xl font-[Kalam] text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
              Little things you love, all in one cart<span className="text-[#ff4d4d]">.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#55514c] sm:text-xl">
              Find everyday tech, fresh style, and cozy home picks. Save your favorites and keep all your good finds together.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                to="/signup"
                className="inline-flex min-h-12 items-center justify-center border-[3px] border-[#2d2d2d] bg-[#ff4d4d] px-6 py-2 text-lg font-bold text-white shadow-[4px_4px_0px_0px_#2d2d2d] transition duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#2d5da1] hover:shadow-[2px_2px_0px_0px_#2d2d2d] active:translate-x-1 active:translate-y-1 active:shadow-none"
                style={{ borderRadius: wobblyRadius }}
              >
                Start exploring
              </Link>
              <Link to="/login" className="min-h-12 px-2 py-2 text-lg font-bold text-[#2d2d2d] underline decoration-[#2d5da1] decoration-2 underline-offset-4 transition hover:text-[#2d5da1]">
                I already have an account
              </Link>
            </div>
            <svg aria-hidden="true" className="absolute -bottom-8 right-8 hidden h-12 w-28 rotate-6 text-[#2d5da1] sm:block" viewBox="0 0 112 48" fill="none">
              <path d="M5 10c27 1 49 10 69 26m0 0-3-14m3 14 13-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 5" />
            </svg>
          </div>

          <div className="relative mx-auto w-full max-w-md py-3 sm:py-6 lg:max-w-none">
            <div className="relative ml-auto h-[20rem] w-[86%] rotate-2 overflow-hidden border-[3px] border-[#2d2d2d] bg-[#e5e0d8] shadow-[8px_8px_0px_0px_#2d2d2d] sm:h-[25rem]">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1100&q=85"
                alt="A bright, welcoming clothing and lifestyle shop"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2d2d2d]/80 to-transparent px-5 pb-5 pt-16 text-white sm:px-7 sm:pb-7">
                <p className="font-[Kalam] text-2xl sm:text-3xl">Make room for a little joy.</p>
                <p className="mt-1 text-base sm:text-lg">Your next favorite is waiting.</p>
              </div>
            </div>
            <div
              className="absolute left-0 top-7 -rotate-3 border-2 border-[#2d2d2d] bg-[#fff9c4] px-4 py-3 shadow-[4px_4px_0px_0px_#2d2d2d] sm:left-1 sm:top-10"
              style={{ borderRadius: '7px 15px 5px 13px' }}
            >
              <p className="text-sm font-bold uppercase tracking-wide text-[#2d5da1]">Good finds</p>
              <p className="font-[Kalam] text-xl">For every day</p>
            </div>
            <div
              className="absolute bottom-0 left-1 rotate-2 border-2 border-[#2d2d2d] bg-white px-4 py-3 shadow-[4px_4px_0px_0px_#2d2d2d] sm:bottom-2 sm:left-0"
              style={{ borderRadius: '15px 6px 13px 7px' }}
            >
              <p className="font-[Kalam] text-lg">Saved with a heart</p>
              <p className="text-sm text-[#55514c]">Picked just for you</p>
            </div>
            <span aria-hidden="true" className="absolute right-0 top-0 rotate-6 font-[Kalam] text-5xl text-[#ff4d4d]">✳</span>
          </div>
        </section>

        <section id="collections" className="scroll-mt-24 py-8 sm:py-12">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b-2 border-dashed border-[#2d2d2d]/40 pb-4">
            <div>
              <p
                className="inline-block -rotate-1 bg-[#fff9c4] px-3 py-1 text-sm font-bold tracking-[0.12em] text-[#2d5da1]"
                style={{ borderRadius: '4px 2px 6px 3px' }}
              >
                TAKE A LOOK AROUND
              </p>
              <h2 className="mt-2 font-[Kalam] text-3xl sm:text-4xl">A little bit of everything</h2>
              <p className="mt-2 max-w-xl text-lg leading-relaxed text-[#55514c]">Browse the collections and find something that feels like you.</p>
            </div>
            <Link to="/signup" className="text-lg font-bold text-[#2d2d2d] underline decoration-[#ff4d4d] decoration-2 underline-offset-4 transition-colors hover:text-[#2d5da1]">
              See what you love <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid gap-6 pb-12 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to="/signup"
                className={`group relative border-2 border-[#2d2d2d] bg-white p-2.5 shadow-[4px_4px_0px_0px_rgba(45,45,45,0.28)] transition duration-150 hover:-translate-y-1 hover:rotate-1 hover:shadow-[6px_6px_0px_0px_#2d2d2d] motion-reduce:transition-none ${index === 1 ? 'rotate-[0.5deg]' : index === 2 ? '-rotate-[0.5deg]' : ''}`}
                style={{ borderRadius: '18px 5px 20px 7px / 8px 20px 6px 18px' }}
              >
                <div className="aspect-[4/3] overflow-hidden border-2 border-[#2d2d2d]" style={{ backgroundColor: category.color, borderRadius: '10px 5px 12px 6px / 6px 12px 5px 10px' }}>
                  <img src={category.image} alt={category.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="px-2 pb-2 pt-4">
                  <h3 className="font-[Kalam] text-2xl">{category.name}</h3>
                  <p className="mt-1 min-h-12 text-lg leading-relaxed text-[#55514c]">{category.description}</p>
                  <span className="mt-3 inline-flex min-h-10 items-center gap-2 font-bold text-[#2d5da1] underline decoration-[#2d5da1] decoration-2 underline-offset-4 group-hover:text-[#ff4d4d]">
                    Explore the shop <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-24 pb-14 sm:pb-20">
          <div className="border-[3px] border-[#2d2d2d] bg-[#fff9c4] px-6 py-8 shadow-[6px_6px_0px_0px_#2d2d2d] sm:px-10 sm:py-10" style={{ borderRadius: wobblyRadius }}>
            <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#2d5da1]">Easy as one, two, three</p>
                <h2 className="mt-2 font-[Kalam] text-3xl sm:text-4xl">Your next good find is close.</h2>
              </div>
              <ol className="grid gap-5 sm:grid-cols-3">
                {[
                  ['01', 'Make an account', 'A quick sign up gets you started.'],
                  ['02', 'Pick your favorites', 'Browse, save, and add to your cart.'],
                  ['03', 'Check out with ease', 'Keep track of your orders in one place.'],
                ].map(([number, title, description]) => (
                  <li key={number} className="border-t-2 border-dashed border-[#2d2d2d]/50 pt-3">
                    <span className="font-[Kalam] text-2xl text-[#ff4d4d]">{number}</span>
                    <h3 className="mt-1 font-[Kalam] text-xl">{title}</h3>
                    <p className="mt-1 text-base leading-relaxed text-[#55514c]">{description}</p>
                  </li>
                ))}
              </ol>
            </div>
            <Link
              to="/signup"
              className="mt-7 inline-flex min-h-12 items-center border-[3px] border-[#2d2d2d] bg-white px-5 py-2 text-lg font-bold shadow-[3px_3px_0px_0px_#2d2d2d] transition hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-[#ff4d4d] hover:text-white hover:shadow-[2px_2px_0px_0px_#2d2d2d]"
              style={{ borderRadius: wobblyRadius }}
            >
              Create your account
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-[#2d2d2d] bg-[#e5e0d8]/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-7 text-base text-[#55514c] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link to="/" className="flex w-fit items-center gap-2 text-[#2d2d2d]">
            <CartMark />
            <span className="font-[Kalam] text-xl font-bold">ShopKart</span>
          </Link>
          <p>Everyday finds, picked with you in mind.</p>
          <Link to="/login" className="w-fit font-bold underline decoration-[#2d5da1] decoration-2 underline-offset-4 hover:text-[#2d5da1]">Log in to your account</Link>
        </div>
      </footer>
    </div>
  )
}
