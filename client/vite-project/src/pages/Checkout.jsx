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
const wobblyRadius = "255px 15px 225px 15px / 15px 225px 15px 255px";
const inputRadius = "8px 18px 7px 16px / 16px 7px 18px 8px";
const inputClass = "w-full border-2 border-[#2d2d2d] bg-[#fdfbf7] px-4 py-3 text-lg text-[#2d2d2d] outline-none transition focus:border-[#2d5da1] focus:ring-2 focus:ring-[#2d5da1]/20 disabled:opacity-60";

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

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fdfbf7] p-10 text-center font-[Patrick_Hand] text-lg text-[#2d2d2d]">
        Loading your cart…
      </main>
    );
  }
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
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "ShopKart",
        description: "ShopKart order payment",
        order_id: data.razorpayOrderId,
        prefill: { name: address.fullName, contact: address.phone },
        theme: { color: "#ff4d4d" },
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

  return (
    <div
      className="min-h-screen bg-[#fdfbf7] font-[Patrick_Hand] text-[#2d2d2d]"
      style={{ backgroundImage: "radial-gradient(#e5e0d8 1px, transparent 1px)", backgroundSize: "24px 24px" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@700&family=Patrick+Hand&display=swap');`}</style>
      <SiteHeader theme="paper" />
      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
        <Link to="/cart" className="inline-flex min-h-10 items-center font-bold text-[#2d5da1] underline decoration-[#2d5da1] decoration-2 underline-offset-4 hover:text-[#ff4d4d]">
          <span aria-hidden="true" className="mr-2">←</span>Back to cart
        </Link>
        <div className="mt-3 border-b-2 border-dashed border-[#2d2d2d]/40 pb-5">
          <p className="inline-block -rotate-1 bg-[#fff9c4] px-3 py-1 text-sm font-bold tracking-[0.12em] text-[#2d5da1]" style={{ borderRadius: "4px 2px 6px 3px" }}>
            ALMOST YOURS
          </p>
          <h1 className="mt-2 font-[Kalam] text-4xl sm:text-5xl">Checkout</h1>
          <p className="mt-1 text-lg text-[#55514c]">Add your delivery details and review your finds.</p>
        </div>

        <form onSubmit={submit} className="mt-7 grid items-start gap-7 lg:grid-cols-[1.35fr_0.85fr]">
          <section className="border-2 border-[#2d2d2d] bg-white p-5 shadow-[5px_5px_0px_0px_rgba(45,45,45,0.25)] sm:p-7" style={{ borderRadius: "18px 5px 20px 7px / 8px 20px 6px 18px" }}>
            <div className="flex items-start gap-3 border-b-2 border-dashed border-[#2d2d2d]/30 pb-4">
              <span className="flex h-9 w-9 rotate-[-3deg] items-center justify-center border-2 border-[#2d2d2d] bg-[#fff9c4] font-[Kalam] text-lg shadow-[2px_2px_0px_0px_#2d2d2d]" style={{ borderRadius: "8px 14px 6px 12px" }}>1</span>
              <div>
                <h2 className="font-[Kalam] text-2xl sm:text-3xl">Shipping details</h2>
                <p className="text-base text-[#55514c]">Where should we send your order?</p>
              </div>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {fields.map(([key, label]) => (
                <label key={key} className={key === "addressLine1" ? "sm:col-span-2" : ""}>
                  <span className="mb-1.5 block text-base font-bold">{label} <span className="text-[#ff4d4d]">*</span></span>
                  <input
                    className={inputClass}
                    style={{ borderRadius: inputRadius }}
                    name={key}
                    autoComplete={key === "addressLine1" ? "street-address" : key}
                    value={address[key]}
                    onChange={(event) => setAddress((current) => ({ ...current, [key]: event.target.value }))}
                  />
                </label>
              ))}
            </div>
          </section>

          <aside className="border-2 border-[#2d2d2d] bg-[#fff9c4] p-5 shadow-[5px_5px_0px_0px_#2d2d2d] sm:p-7" style={{ borderRadius: "7px 18px 6px 16px / 16px 6px 18px 7px" }}>
            <div className="flex items-start gap-3 border-b-2 border-dashed border-[#2d2d2d]/40 pb-4">
              <span className="flex h-9 w-9 rotate-2 items-center justify-center border-2 border-[#2d2d2d] bg-white font-[Kalam] text-lg shadow-[2px_2px_0px_0px_#2d2d2d]" style={{ borderRadius: "14px 7px 12px 6px" }}>2</span>
              <div>
                <h2 className="font-[Kalam] text-2xl sm:text-3xl">Review order</h2>
                <p className="text-base text-[#55514c]">A final look in your cart.</p>
              </div>
            </div>
            <ul className="mt-3 divide-y divide-dashed divide-[#2d2d2d]/30">
              {items.map(({ product, quantity }) => (
                <li key={product._id} className="flex justify-between gap-4 py-3 text-base">
                  <span className="min-w-0">{product.name} <span className="text-[#55514c]">× {quantity}</span></span>
                  <strong className="shrink-0">₹{(product.price * quantity).toLocaleString("en-IN")}</strong>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex justify-between border-t-2 border-[#2d2d2d] pt-4 font-[Kalam] text-2xl">
              <span>Total</span><span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            {error && <p role="alert" className="mt-4 border-2 border-[#ff4d4d] bg-white px-4 py-3 text-base text-[#9c2727]" style={{ borderRadius: "8px 16px 7px 14px" }}>{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="mt-5 min-h-12 w-full border-[3px] border-[#2d2d2d] bg-[#ff4d4d] px-4 py-3 text-lg font-bold text-white shadow-[4px_4px_0px_0px_#2d2d2d] transition duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#2d5da1] hover:shadow-[2px_2px_0px_0px_#2d2d2d] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-wait disabled:opacity-60"
              style={{ borderRadius: wobblyRadius }}
            >
              {busy ? "Waiting for payment…" : "Pay with Razorpay"}
            </button>
            <p className="mt-3 text-center text-sm text-[#55514c]">Secure Razorpay test mode checkout</p>
          </aside>
        </form>
      </main>
    </div>
  );
}
