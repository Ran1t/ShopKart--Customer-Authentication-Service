import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../cart/cartContext";

function CartIcon() {
    return (
        <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
            <path d="M2 3h2l2.4 11.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6L22 7H5" />
        </svg>
    );
}

export default function SiteHeader({ theme = "light", onLogout }) {
    const [cartOpen, setCartOpen] = useState(false);
    const { items, itemCount, subtotal, changeQuantity, removeFromCart } = useCart();
    const dark = theme === "dark";

    return (
        <>
            <header className={`sticky top-0 z-30 border-b backdrop-blur ${dark ? "border-slate-800 bg-slate-950/90 text-slate-100" : "border-[#E4E2DC] bg-white/95 text-[#1B2A2E]"}`}>
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
                    <Link to="/home" className="flex shrink-0 items-center gap-2 font-semibold">
                        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${dark ? "bg-indigo-600 text-white" : "bg-[#1B2A2E] text-[#FFF4EC]"}`}><CartIcon /></span>
                        <span className="text-lg">ShopKart</span>
                    </Link>

                    <nav aria-label="Main navigation" className="flex items-center gap-3 text-xs font-semibold sm:gap-6 sm:text-sm">
                        <Link to="/home" className={dark ? "text-slate-400 transition hover:text-white" : "transition hover:text-[#FF6B4A]"}>Home</Link>
                        <Link to="/products" className={dark ? "text-slate-400 transition hover:text-white" : "transition hover:text-[#FF6B4A]"}>Products</Link>
                    </nav>

                    <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                        <button type="button" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${itemCount} items`} className={`relative flex h-9 w-9 items-center justify-center rounded-lg border transition ${dark ? "border-slate-800 bg-slate-900 text-slate-300 hover:text-white" : "border-[#E4E2DC] hover:border-[#1B2A2E]"}`}>
                            <CartIcon />
                            {itemCount > 0 && <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FF6B4A] px-1 text-[10px] font-bold text-white">{itemCount}</span>}
                        </button>
                        {onLogout && <button type="button" onClick={onLogout} className="rounded-lg bg-[#FF6B4A] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#F15A3A] sm:px-4 sm:text-sm">Logout</button>}
                    </div>
                </div>
            </header>

            {cartOpen && (
                <div className="fixed inset-0 z-50 flex justify-end" role="presentation">
                    <button type="button" aria-label="Close cart" onClick={() => setCartOpen(false)} className="absolute inset-0 bg-slate-950/45" />
                    <aside role="dialog" aria-modal="true" aria-labelledby="cart-title" className="relative flex h-full w-full max-w-md flex-col bg-white text-[#1B2A2E] shadow-2xl">
                        <div className="flex items-center justify-between border-b border-[#E4E2DC] px-5 py-4">
                            <div>
                                <h2 id="cart-title" className="text-lg font-bold">Your cart</h2>
                                <p className="mt-0.5 text-xs text-[#6B7773]">{itemCount} {itemCount === 1 ? "item" : "items"}</p>
                            </div>
                            <button type="button" onClick={() => setCartOpen(false)} aria-label="Close cart" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E4E2DC] text-xl leading-none hover:bg-[#FFF4EC]">×</button>
                        </div>

                        {items.length === 0 ? (
                            <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF4EC] text-[#FF6B4A]"><CartIcon /></span>
                                <h3 className="mt-4 font-semibold">Your cart is empty</h3>
                                <p className="mt-1 text-sm text-[#6B7773]">Browse the catalog to find something you love.</p>
                                <Link to="/products" onClick={() => setCartOpen(false)} className="mt-5 rounded-lg bg-[#FF6B4A] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#F15A3A]">Browse products</Link>
                            </div>
                        ) : (
                            <>
                                <ul className="flex-1 divide-y divide-[#E4E2DC] overflow-y-auto px-5">
                                    {items.map(({ product, quantity }) => (
                                        <li key={product._id} className="flex gap-3 py-4">
                                            <img src={product.image} alt="" className="h-20 w-20 rounded-lg bg-[#F5F3EF] object-cover" />
                                            <div className="flex min-w-0 flex-1 flex-col">
                                                <div className="flex items-start justify-between gap-2">
                                                    <p className="line-clamp-2 text-sm font-semibold">{product.name}</p>
                                                    <button type="button" onClick={() => removeFromCart(product._id)} aria-label={`Remove ${product.name}`} className="shrink-0 text-xs text-[#6B7773] underline hover:text-[#D84F38]">Remove</button>
                                                </div>
                                                <p className="mt-1 text-sm font-bold">₹{Number(product.price).toLocaleString("en-IN")}</p>
                                                <div className="mt-auto flex items-center gap-3 pt-2">
                                                    <button type="button" onClick={() => changeQuantity(product._id, quantity - 1)} aria-label={`Decrease ${product.name} quantity`} className="flex h-7 w-7 items-center justify-center rounded border border-[#E4E2DC] hover:bg-[#FFF4EC]">−</button>
                                                    <span className="min-w-4 text-center text-sm">{quantity}</span>
                                                    <button type="button" onClick={() => changeQuantity(product._id, quantity + 1)} disabled={quantity >= product.stock} aria-label={`Increase ${product.name} quantity`} className="flex h-7 w-7 items-center justify-center rounded border border-[#E4E2DC] hover:bg-[#FFF4EC] disabled:cursor-not-allowed disabled:opacity-40">+</button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="border-t border-[#E4E2DC] px-5 py-4">
                                    <div className="flex justify-between text-sm font-semibold"><span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
                                    <p className="mt-1 text-xs text-[#6B7773]">Shipping and taxes calculated at checkout.</p>
                                    <button type="button" onClick={() => setCartOpen(false)} className="mt-4 w-full rounded-lg bg-[#FF6B4A] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#F15A3A]">Continue shopping</button>
                                </div>
                            </>
                        )}
                    </aside>
                </div>
            )}
        </>
    );
}