import { Link } from "react-router-dom";
import { useCart } from "../cart/cartContext";
import SiteHeader from "../components/SiteHeader";

const wobblyRadius = "255px 15px 225px 15px / 15px 225px 15px 255px";

export default function CartPage() {
  const { items, itemCount, subtotal, loading, error, refreshCart, changeQuantity, removeFromCart } = useCart();

  const handleQuantityChange = async (productId, nextQuantity) => {
    if (nextQuantity < 1) return;
    await changeQuantity(productId, nextQuantity);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] font-[Patrick_Hand] text-[#2d2d2d]" style={{ backgroundImage: "radial-gradient(#e5e0d8 1px, transparent 1px)", backgroundSize: "24px 24px" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@700&family=Patrick+Hand&display=swap');`}</style>
        <SiteHeader theme="paper" />
        <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-14">
          <div role="status" className="border-2 border-dashed border-[#2d2d2d] bg-white px-5 py-12 text-center text-xl shadow-[4px_4px_0px_0px_#2d2d2d]" style={{ borderRadius: wobblyRadius }}>
            Loading your cart...
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fdfbf7] font-[Patrick_Hand] text-[#2d2d2d]" style={{ backgroundImage: "radial-gradient(#e5e0d8 1px, transparent 1px)", backgroundSize: "24px 24px" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@700&family=Patrick+Hand&display=swap');`}</style>
        <SiteHeader theme="paper" />
        <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-14">
          <div role="alert" className="border-2 border-[#2d2d2d] bg-[#fff9c4] px-5 py-10 text-center shadow-[4px_4px_0px_0px_#2d2d2d]" style={{ borderRadius: wobblyRadius }}>
            <p className="font-[Kalam] text-2xl">Unable to load your cart.</p>
            <button type="button" onClick={refreshCart} className="mt-5 min-h-12 border-[3px] border-[#2d2d2d] bg-white px-6 text-lg font-bold shadow-[4px_4px_0px_0px_#2d2d2d] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#2d5da1] hover:text-white" style={{ borderRadius: wobblyRadius }}>
              Try Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] font-[Patrick_Hand] text-[#2d2d2d]" style={{ backgroundImage: "radial-gradient(#e5e0d8 1px, transparent 1px)", backgroundSize: "24px 24px" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@700&family=Patrick+Hand&display=swap');`}</style>
      <SiteHeader theme="paper" />

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-14">
        <section className="mb-8 border-[3px] border-[#2d2d2d] bg-white px-6 py-8 shadow-[8px_8px_0px_0px_#2d2d2d] sm:px-10 sm:py-10" style={{ borderRadius: wobblyRadius }}>
          <h1 className="font-[Kalam] text-4xl sm:text-5xl">My Cart</h1>
          {!items.length ? null : <p className="mt-2 text-lg text-[#55514c]">{itemCount} {itemCount === 1 ? "item" : "items"} in your cart</p>}
        </section>

        {!items.length ? (
          <div className="border-2 border-[#2d2d2d] bg-white px-5 py-10 text-center shadow-[6px_6px_0px_0px_#2d2d2d]" style={{ borderRadius: wobblyRadius }}>
            <div className="text-6xl" aria-hidden="true">🛒</div>
            <h2 className="mt-4 font-[Kalam] text-3xl">Your cart is empty</h2>
            <p className="mt-2 text-lg text-[#55514c]">Looks like you haven&apos;t added anything yet.</p>
            <Link to="/products" className="mt-6 inline-flex min-h-12 items-center border-[3px] border-[#2d2d2d] bg-[#ff4d4d] px-6 text-lg font-bold text-white shadow-[4px_4px_0px_0px_#2d2d2d] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#2d5da1]" style={{ borderRadius: wobblyRadius }}>
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.7fr_0.9fr]">
            <div className="space-y-6">
              {items.map(({ product, quantity }) => (
                <article key={product._id} className="flex flex-col gap-4 border-[3px] border-[#2d2d2d] bg-white p-4 shadow-[6px_6px_0px_0px_#2d2d2d] sm:flex-row sm:items-center" style={{ borderRadius: "18px 7px 16px 8px / 7px 16px 8px 18px" }}>
                  <img src={product.image} alt={product.name} className="h-28 w-28 rounded-xl object-cover border-2 border-[#2d2d2d] bg-[#e5e0d8]" />
                  <div className="flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#2d5da1]">{product.category}</p>
                        <h3 className="font-[Kalam] text-2xl">{product.name}</h3>
                      </div>
                      <p className="text-xl font-bold">₹{Number(product.price).toLocaleString("en-IN")}</p>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3 border-2 border-[#2d2d2d] bg-[#f5f3ef] px-2 py-1" style={{ borderRadius: "12px 6px 10px 7px" }}>
                        <button type="button" className="flex h-8 w-8 items-center justify-center border-2 border-[#2d2d2d] bg-white text-xl font-bold" style={{ borderRadius: "8px 4px 6px 5px" }} onClick={() => handleQuantityChange(product._id, quantity - 1)} aria-label={`Decrease quantity for ${product.name}`}>
                          −
                        </button>
                        <span className="min-w-6 text-center text-lg font-bold">{quantity}</span>
                        <button type="button" className="flex h-8 w-8 items-center justify-center border-2 border-[#2d2d2d] bg-white text-xl font-bold" style={{ borderRadius: "8px 4px 6px 5px" }} onClick={() => handleQuantityChange(product._id, quantity + 1)} aria-label={`Increase quantity for ${product.name}`}>
                          +
                        </button>
                      </div>

                      <button type="button" onClick={() => removeFromCart(product._id)} className="text-base font-bold text-[#2d2d2d] underline decoration-[#ff4d4d] decoration-2 underline-offset-4 transition hover:text-[#2d5da1]">
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="border-[3px] border-[#2d2d2d] bg-white p-5 shadow-[6px_6px_0px_0px_#2d2d2d]" style={{ borderRadius: wobblyRadius }}>
              <h2 className="font-[Kalam] text-3xl">Order Summary</h2>
              <div className="mt-5 space-y-3 text-lg text-[#55514c]">
                <div className="flex justify-between gap-4"><span>Items</span><span className="font-bold text-[#2d2d2d]">{itemCount}</span></div>
                <div className="flex justify-between gap-4"><span>Subtotal</span><span className="font-bold text-[#2d2d2d]">₹{Number(subtotal).toLocaleString("en-IN")}</span></div>
              </div>
              <Link to="/checkout" className="mt-6 flex w-full min-h-12 items-center justify-center border-[3px] border-[#2d2d2d] bg-[#ff4d4d] px-4 text-lg font-bold text-white shadow-[4px_4px_0px_0px_#2d2d2d] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#2d5da1]" style={{ borderRadius: wobblyRadius }}>
                Proceed to Checkout
              </Link>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
