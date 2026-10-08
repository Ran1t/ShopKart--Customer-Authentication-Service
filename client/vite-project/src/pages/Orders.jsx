import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../axiosCalls/axios";
import SiteHeader from "../components/SiteHeader";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => { axiosInstance.get("/orders").then(({ data }) => setOrders(data.orders || [])).catch((e) => setError(e.response?.data?.message || "Unable to load your orders.")).finally(() => setLoading(false)); }, []);
  return <div className="min-h-screen bg-[#f8f7f3] text-[#1B2A2E]"><SiteHeader /><main className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
    <h1 className="text-3xl font-bold">My Orders</h1>
    {loading ? <p className="mt-6">Loading your orders…</p> : error ? <p role="alert" className="mt-6 text-red-700">{error}</p> : !orders.length ? <section className="mt-6 rounded-2xl border border-[#E4E2DC] bg-white p-8 text-center"><p>You have no orders yet.</p><Link className="mt-4 inline-block font-semibold text-[#D84F38]" to="/products">Browse products</Link></section> : <div className="mt-6 space-y-4">{orders.map((order) => <article key={order._id} className="rounded-2xl border border-[#E4E2DC] bg-white p-5 sm:p-6">
      <div className="flex flex-wrap justify-between gap-3"><div><h2 className="font-bold">Order #{order._id.slice(-8).toUpperCase()}</h2><p className="mt-1 text-sm text-[#6B7773]">{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p></div><span className="h-fit rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-800">{order.status}</span></div>
      <ul className="mt-4 space-y-1 text-sm">{order.items.map((item, i) => <li key={`${item.product}-${i}`}>{item.name} × {item.quantity} <span className="text-[#6B7773]">— ₹{(item.price * item.quantity).toLocaleString("en-IN")}</span></li>)}</ul>
      <div className="mt-4 flex items-center justify-between border-t border-[#EEECE7] pt-4"><span className="font-bold">Total: ₹{order.totalAmount.toLocaleString("en-IN")}</span><Link className="text-sm font-semibold text-[#D84F38]" to={`/order-success/${order._id}`}>View details</Link></div>
    </article>)}</div>}
  </main></div>;
}
