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
    const { items, itemCount, subtotal, pendingProductIds, changeQuantity, removeFromCart } = useCart();
    const [cartActionError, setCartActionError] = useState("");
    const dark = theme === "dark";
    const paper = theme === "paper";

    const updateDrawerQuantity = async (productId, quantity) => {
        setCartActionError("");
        try { await changeQuantity(productId, quantity); }
        catch { setCartActionError("Unable to update the cart. Please try again."); }
    };

    const removeDrawerItem = async (productId) => {
        setCartActionError("");
        try { await removeFromCart(productId); }
        catch { setCartActionError("Unable to remove this product. Please try again."); }
    };

    return (
        <>
            <header className={`sticky top-0 z-30 border-b-2 backdrop-blur ${dark ? "border-slate-800 bg-slate-950/90 text-slate-100" : paper ? "border-[#2d2d2d] bg-[#fdfbf7]/95 text-[#2d2d2d]" : "border-[#E4E2DC] bg-white/95 text-[#1B2A2E]"}`}>
                <div className={`mx-auto flex h-16 items-center justify-between gap-3 px-4 sm:px-6 ${paper ? "max-w-5xl" : "max-w-7xl"}`}>
                    <Link to="/home" className="flex shrink-0 items-center gap-2 font-semibold">
                        <span className={`flex h-9 w-9 items-center justify-center ${paper ? "rotate-[-3deg] border-2 border-[#2d2d2d] bg-[#fff9c4] text-[#2d2d2d] shadow-[2px_2px_0px_0px_#2d2d2d]" : "rounded-xl"} ${dark ? "bg-indigo-600 text-white" : !paper ? "bg-[#1B2A2E] text-[#FFF4EC]" : ""}`} style={paper ? { borderRadius: "10px 5px 12px 6px / 6px 12px 5px 10px" } : undefined}><CartIcon /></span>
                        <span className={`text-lg ${paper ? "font-[Kalam] text-xl" : ""}`}>ShopKart</span>
                    </Link>

                    <nav aria-label="Main navigation" className="flex items-center gap-3 text-xs font-semibold sm:gap-6 sm:text-sm">
                        <Link to="/home" className={dark ? "text-slate-400 transition hover:text-white" : paper ? "transition hover:text-[#2d5da1] hover:underline hover:decoration-[#ff4d4d] hover:decoration-2 hover:underline-offset-4" : "transition hover:text-[#FF6B4A]"}>Home</Link>
                        <Link to="/products" className={dark ? "text-slate-400 transition hover:text-white" : paper ? "transition hover:text-[#2d5da1] hover:underline hover:decoration-[#ff4d4d] hover:decoration-2 hover:underline-offset-4" : "transition hover:text-[#FF6B4A]"}>Products</Link>
                        <Link to="/wishlist" className={dark ? "text-slate-400 transition hover:text-white" : paper ? "transition hover:text-[#2d5da1] hover:underline hover:decoration-[#ff4d4d] hover:decoration-2 hover:underline-offset-4" : "transition hover:text-[#FF6B4A]"}>Wishlist</Link>
                        <Link to="/orders" className={dark ? "text-slate-400 transition hover:text-white" : paper ? "transition hover:text-[#2d5da1] hover:underline hover:decoration-[#ff4d4d] hover:decoration-2 hover:underline-offset-4" : "transition hover:text-[#FF6B4A]"}>Orders</Link>
                        <Link to="/cart" className={dark ? "text-slate-400 transition hover:text-white" : paper ? "transition hover:text-[#2d5da1] hover:underline hover:decoration-[#ff4d4d] hover:decoration-2 hover:underline-offset-4" : "transition hover:text-[#FF6B4A]"}>Cart ({itemCount})</Link>
                    </nav>

                    <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                        <button type="button" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${itemCount} items`} className={`relative flex h-10 w-10 items-center justify-center border transition ${paper ? "border-2 border-[#2d2d2d] bg-white shadow-[2px_2px_0px_0px_#2d2d2d] hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-[#e5e0d8]" : "rounded-lg"} ${dark ? "border-slate-800 bg-slate-900 text-slate-300 hover:text-white" : !paper ? "border-[#E4E2DC] hover:border-[#1B2A2E]" : ""}`} style={paper ? { borderRadius: "8px 14px 6px 12px / 13px 6px 14px 7px" } : undefined}>
                            <CartIcon />
                            {itemCount > 0 && <span className={`absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center px-1 text-[10px] font-bold text-white ${paper ? "border border-[#2d2d2d] bg-[#ff4d4d]" : "rounded-full bg-[#FF6B4A]"}`} style={paper ? { borderRadius: "8px 5px 7px 4px" } : undefined}>{itemCount}</span>}
                        </button>
                        {onLogout && (
                            <button
                                type="button"
                                onClick={onLogout}
                                className={`min-h-10 px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${paper ? "border-2 border-[#2d2d2d] bg-white text-[#2d2d2d] shadow-[3px_3px_0px_0px_#2d2d2d] hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-[#ff4d4d] hover:text-white" : "rounded-lg bg-[#FF6B4A] text-white hover:bg-[#F15A3A]"}`}
                                style={paper ? { borderRadius: "14px 7px 12px 6px" } : undefined}
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {cartOpen && (
                <div className="fixed inset-0 z-50 flex justify-end" role="presentation">
                    <button type="button" aria-label="Close cart" onClick={() => setCartOpen(false)} className="absolute inset-0 bg-slate-950/45" />
                    <aside role="dialog" aria-modal="true" aria-labelledby="cart-title" className={`relative flex h-full w-full max-w-md flex-col ${paper ? "border-l-2 border-[#2d2d2d] bg-[#fdfbf7] text-[#2d2d2d] shadow-[-6px_0px_0px_0px_#2d2d2d]" : "bg-white text-[#1B2A2E] shadow-2xl"}`}>
                        <div className={`flex items-center justify-between px-5 py-4 ${paper ? "border-b-2 border-dashed border-[#2d2d2d]/50" : "border-b border-[#E4E2DC]"}`}>
                            <div>
                                <h2 id="cart-title" className={`text-lg font-bold ${paper ? "font-[Kalam] text-2xl" : ""}`}>Your cart</h2>
                                <p className="mt-0.5 text-xs text-[#6B7773]">{itemCount} {itemCount === 1 ? "item" : "items"}</p>
                            </div>
                            <button type="button" onClick={() => setCartOpen(false)} aria-label="Close cart" className={`flex h-9 w-9 items-center justify-center border text-xl leading-none hover:bg-[#FFF4EC] ${paper ? "border-2 border-[#2d2d2d] bg-white shadow-[2px_2px_0px_0px_#2d2d2d]" : "rounded-full border-[#E4E2DC]"}`} style={paper ? { borderRadius: "8px 14px 6px 12px" } : undefined}>×</button>
                        </div>

                        {items.length === 0 ? (
                            <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                                <span className={`flex h-14 w-14 items-center justify-center ${paper ? "rotate-[-3deg] border-2 border-[#2d2d2d] bg-[#fff9c4] text-[#2d2d2d]" : "rounded-full bg-[#FFF4EC] text-[#FF6B4A]"}`} style={paper ? { borderRadius: "16px 8px 18px 6px" } : undefined}><CartIcon /></span>
                                <h3 className={`mt-4 font-semibold ${paper ? "font-[Kalam] text-xl" : ""}`}>Your cart is empty</h3>
                                <p className="mt-1 text-sm text-[#6B7773]">Browse the catalog to find something you love.</p>
                                <Link to="/products" onClick={() => setCartOpen(false)} className={`mt-5 px-4 py-2.5 text-sm font-semibold text-white ${paper ? "border-2 border-[#2d2d2d] bg-[#ff4d4d] shadow-[3px_3px_0px_0px_#2d2d2d] hover:translate-x-[1px] hover:translate-y-[1px]" : "rounded-lg bg-[#FF6B4A] hover:bg-[#F15A3A]"}`} style={paper ? { borderRadius: "14px 7px 12px 6px" } : undefined}>Browse products</Link>
                            </div>
                        ) : (
                            <>
                                {cartActionError && <p role="alert" className="px-5 pt-3 text-sm font-semibold text-[#b42318]">{cartActionError}</p>}
                                <ul className="flex-1 divide-y divide-[#E4E2DC] overflow-y-auto px-5">
                                    {items.map(({ product, quantity }) => (
                                        <li key={product._id} className="flex gap-3 py-4">
                                            <img src={product.image} alt="" className="h-20 w-20 rounded-lg bg-[#F5F3EF] object-cover" />
                                            <div className="flex min-w-0 flex-1 flex-col">
                                                <div className="flex items-start justify-between gap-2">
                                                    <p className="line-clamp-2 text-sm font-semibold">{product.name}</p>
                                                    <button type="button" disabled={pendingProductIds.includes(product._id)} onClick={() => removeDrawerItem(product._id)} aria-label={`Remove ${product.name}`} className="shrink-0 text-xs text-[#6B7773] underline hover:text-[#D84F38] disabled:opacity-50">Remove</button>
                                                </div>
                                                <p className="mt-1 text-sm font-bold">₹{Number(product.price).toLocaleString("en-IN")}</p>
                                                <div className="mt-auto flex items-center gap-3 pt-2">
                                                    <button type="button" disabled={pendingProductIds.includes(product._id) || quantity <= 1} onClick={() => updateDrawerQuantity(product._id, quantity - 1)} aria-label={`Decrease ${product.name} quantity`} className="flex h-7 w-7 items-center justify-center rounded border border-[#E4E2DC] hover:bg-[#FFF4EC] disabled:opacity-50">−</button>
                                                    <span className="min-w-4 text-center text-sm">{quantity}</span>
                                                    <button type="button" onClick={() => updateDrawerQuantity(product._id, quantity + 1)} disabled={pendingProductIds.includes(product._id) || product.stock <= 0} aria-label={`Increase ${product.name} quantity`} className="flex h-7 w-7 items-center justify-center rounded border border-[#E4E2DC] hover:bg-[#FFF4EC] disabled:cursor-not-allowed disabled:opacity-40">+</button>
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
