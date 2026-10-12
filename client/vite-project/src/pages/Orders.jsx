import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../axiosCalls/axios";
import SiteHeader from "../components/SiteHeader";

const wobblyRadius = "255px 15px 225px 15px / 15px 225px 15px 255px";

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosInstance.get("/orders")
      .then(({ data }) => setOrders(data.orders || []))
      .catch((requestError) => setError(requestError.response?.data?.message || "Unable to load your orders."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className="min-h-screen bg-[#fdfbf7] font-[Patrick_Hand] text-[#2d2d2d]"
      style={{ backgroundImage: "radial-gradient(#e5e0d8 1px, transparent 1px)", backgroundSize: "24px 24px" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@700&family=Patrick+Hand&display=swap');`}</style>
      <SiteHeader theme="paper" />
      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="border-b-2 border-dashed border-[#2d2d2d]/40 pb-5">
          <p className="inline-block -rotate-1 bg-[#fff9c4] px-3 py-1 text-sm font-bold tracking-[0.12em] text-[#2d5da1]" style={{ borderRadius: "4px 2px 6px 3px" }}>
            YOUR SHOPPING STORY
          </p>
          <h1 className="mt-2 font-[Kalam] text-4xl sm:text-5xl">My orders</h1>
          <p className="mt-1 text-lg text-[#55514c]">All your recent finds, together in one place.</p>
        </div>

        {loading ? (
          <div className="mt-7 border-2 border-[#2d2d2d] bg-white p-7 text-center text-lg shadow-[4px_4px_0px_0px_rgba(45,45,45,0.25)]" style={{ borderRadius: "18px 5px 20px 7px" }}>
            Loading your orders…
          </div>
        ) : error ? (
          <p role="alert" className="mt-7 border-2 border-[#ff4d4d] bg-white p-5 text-lg text-[#9c2727] shadow-[4px_4px_0px_0px_rgba(45,45,45,0.2)]" style={{ borderRadius: "8px 16px 7px 14px" }}>
            {error}
          </p>
        ) : !orders.length ? (
          <section className="mt-7 border-2 border-[#2d2d2d] bg-white px-6 py-10 text-center shadow-[5px_5px_0px_0px_#2d2d2d] sm:px-10" style={{ borderRadius: wobblyRadius }}>
            <span className="mx-auto flex h-14 w-14 rotate-[-3deg] items-center justify-center border-2 border-[#2d2d2d] bg-[#fff9c4] font-[Kalam] text-2xl shadow-[3px_3px_0px_0px_#2d2d2d]" style={{ borderRadius: "16px 8px 18px 6px" }}>0</span>
            <h2 className="mt-4 font-[Kalam] text-2xl sm:text-3xl">No orders just yet</h2>
            <p className="mt-2 text-lg text-[#55514c]">Your next favorite find could be just around the corner.</p>
            <Link
              className="mt-5 inline-flex min-h-12 items-center border-[3px] border-[#2d2d2d] bg-[#ff4d4d] px-5 py-2 text-lg font-bold text-white shadow-[4px_4px_0px_0px_#2d2d2d] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#2d5da1] hover:shadow-[2px_2px_0px_0px_#2d2d2d]"
              style={{ borderRadius: wobblyRadius }}
              to="/products"
            >
              Browse products
            </Link>
          </section>
        ) : (
          <div className="mt-7 space-y-5">
            {orders.map((order, index) => (
              <article
                key={order._id}
                className="border-2 border-[#2d2d2d] bg-white p-5 shadow-[5px_5px_0px_0px_rgba(45,45,45,0.25)] sm:p-6"
                style={{ borderRadius: index % 2 ? "7px 18px 6px 16px / 16px 6px 18px 7px" : "18px 5px 20px 7px / 8px 20px 6px 18px" }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-dashed border-[#2d2d2d]/35 pb-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#2d5da1]">Order placed</p>
                    <h2 className="mt-1 font-[Kalam] text-xl sm:text-2xl">#{order._id.slice(-8).toUpperCase()}</h2>
                    <p className="mt-1 text-base text-[#55514c]">{formatDate(order.createdAt)}</p>
                  </div>
                  <span
                    className={`border-2 border-[#2d2d2d] px-3 py-1 text-sm font-bold ${order.paymentStatus === "PAID" ? "bg-[#dff1df] text-[#285c32]" : "bg-[#fff9c4] text-[#5c4b16]"}`}
                    style={{ borderRadius: "7px 15px 5px 13px" }}
                  >
                    {order.status}
                  </span>
                </div>
                <ul className="mt-3 divide-y divide-dashed divide-[#2d2d2d]/25">
                  {order.items.map((item, itemIndex) => (
                    <li key={`${item.product}-${itemIndex}`} className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-2 text-base">
                      <span>{item.name} <span className="text-[#55514c]">× {item.quantity}</span></span>
                      <span className="text-[#55514c]">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t-2 border-[#2d2d2d] pt-4">
                  <p className="font-[Kalam] text-xl">Total: ₹{Number(order.totalAmount).toLocaleString("en-IN")}</p>
                  <Link
                    className="inline-flex min-h-10 items-center font-bold text-[#2d5da1] underline decoration-[#ff4d4d] decoration-2 underline-offset-4 hover:text-[#ff4d4d]"
                    to={`/order-success/${order._id}`}
                  >
                    View order details <span aria-hidden="true" className="ml-1">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
