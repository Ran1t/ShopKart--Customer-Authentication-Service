import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { axiosInstance } from "../axiosCalls/axios";
import { useCart } from "../cart/cartContext";
import SiteHeader from "../components/SiteHeader";

const blankAddress = { fullName: "", phone: "", addressLine1: "", city: "", state: "", pincode: "" };
const fields = [
  ["fullName", "Full name"], ["phone", "Phone number"], ["addressLine1", "Address line"],
  ["city", "City"], ["state", "State"], ["pincode", "Pincode"],
];
const inputClass = "w-full rounded-lg border border-[#D9D7D1] bg-white px-3 py-3 text-sm outline-none focus:border-[#FF6B4A] focus:ring-2 focus:ring-[#FF6B4A]/20";

function loadRazorpay() {
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Checkout() {
  const { items, subtotal, loading, clearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState(blankAddress);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  if (loading) return <main className="min-h-screen bg-[#f8f7f3] p-10 text-center">Loading your cart…</main>;
  if (!items.length) return <Navigate to="/cart" replace />;

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    const missing = fields.find(([key]) => !address[key].trim());
    if (missing) return setError(`${missing[1]} is required.`);
    if (!/^\+?[0-9][0-9\s()-]{7,14}$/.test(address.phone.trim())) return setError("Enter a valid phone number.");
    if (!/^\d{6}$/.test(address.pincode.trim())) return setError("Pincode must contain 6 digits.");

    setBusy(true);
    try {
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error("Unable to load Razorpay Checkout. Check your connection and try again.");
      const { data } = await axiosInstance.post("/orders/create-payment-order", { shippingAddress: address });
      const payment = new window.Razorpay({
        key: data.key, amount: data.amount, currency: data.currency, name: "ShopKart",
        description: "ShopKart order payment", order_id: data.razorpayOrderId,
        prefill: { name: address.fullName, contact: address.phone },
        theme: { color: "#FF6B4A" },
        modal: { ondismiss: () => setBusy(false) },
        handler: async (response) => {
          try {
            const verified = await axiosInstance.post("/orders/verify-payment", {
              shopKartOrderId: data.shopKartOrderId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            clearCart();
            navigate(`/order-success/${verified.data.order._id}`, { replace: true });
          } catch (verificationError) {
            setError(verificationError.response?.data?.message || "Payment verification failed. Your cart is preserved; contact support if payment was deducted.");
            setBusy(false);
          }
        },
      });
      payment.on("payment.failed", (response) => {
        setError(response.error?.description || "Payment failed. Your cart has not been cleared. Please try again.");
        setBusy(false);
      });
      payment.open();
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || "Unable to start checkout.");
      setBusy(false);
    }
  };

  return <div className="min-h-screen bg-[#f8f7f3] text-[#1B2A2E]"><SiteHeader />
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <Link to="/cart" className="text-sm font-semibold text-[#D84F38]">← Back to cart</Link>
      <h1 className="mt-3 text-3xl font-bold">Checkout</h1>
      <form onSubmit={submit} className="mt-7 grid gap-7 lg:grid-cols-[1.4fr_.8fr]">
        <section className="rounded-2xl border border-[#E4E2DC] bg-white p-5 sm:p-7">
          <h2 className="text-xl font-bold">Shipping details</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {fields.map(([key, label]) => <label key={key} className={key === "addressLine1" ? "sm:col-span-2" : ""}>
              <span className="mb-1.5 block text-sm font-medium">{label}</span>
              <input className={inputClass} autoComplete={key === "addressLine1" ? "street-address" : key} value={address[key]} onChange={(event) => setAddress((current) => ({ ...current, [key]: event.target.value }))} />
            </label>)}
          </div>
        </section>
        <aside className="h-fit rounded-2xl border border-[#E4E2DC] bg-white p-5 sm:p-7">
          <h2 className="text-xl font-bold">Review order</h2>
          <ul className="mt-4 divide-y divide-[#EEECE7]">{items.map(({ product, quantity }) => <li key={product._id} className="flex justify-between gap-4 py-3 text-sm"><span>{product.name} × {quantity}</span><strong>₹{(product.price * quantity).toLocaleString("en-IN")}</strong></li>)}</ul>
          <div className="mt-4 flex justify-between border-t border-[#EEECE7] pt-4 text-lg font-bold"><span>Total</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
          {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button disabled={busy} className="mt-5 w-full rounded-lg bg-[#FF6B4A] px-4 py-3 font-semibold text-white hover:bg-[#F15A3A] disabled:cursor-wait disabled:opacity-60">{busy ? "Waiting for payment…" : "Pay with Razorpay"}</button>
          <p className="mt-3 text-center text-xs text-[#6B7773]">Secure Razorpay test mode checkout</p>
        </aside>
      </form>
    </main>
  </div>;
}
