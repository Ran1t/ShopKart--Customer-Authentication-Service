import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../axiosCalls/axios";
import SiteHeader from "../components/SiteHeader";

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => { axiosInstance.get(`/orders/${id}`).then(({ data }) => setOrder(data.order)).catch((e) => setError(e.response?.data?.message || "Unable to load this order.")); }, [id]);
  return <div className="min-h-screen bg-[#f8f7f3] text-[#1B2A2E]"><SiteHeader /><main className="mx-auto max-w-2xl px-5 py-14"><section className="rounded-2xl border border-[#E4E2DC] bg-white p-7 text-center sm:p-10">
    {error ? <p role="alert" className="text-red-700">{error}</p> : !order ? <p>Loading order…</p> : <><div className="text-5xl" aria-hidden="true">{order.paymentStatus === "PAID" ? "✓" : "…"}</div><h1 className="mt-4 text-3xl font-bold">{order.paymentStatus === "PAID" ? "Order placed successfully" : "Payment not completed"}</h1><p className="mt-3 text-[#6B7773]">{order.paymentStatus === "PAID" ? "Your payment is confirmed and your order has been saved." : "This order is awaiting verified payment. Your cart remains available."}</p><dl className="mx-auto mt-7 max-w-sm space-y-3 text-left"><div className="flex justify-between gap-4"><dt>Order ID</dt><dd className="font-mono text-sm">{order._id}</dd></div><div className="flex justify-between"><dt>Total</dt><dd className="font-bold">₹{order.totalAmount.toLocaleString("en-IN")}</dd></div><div className="flex justify-between"><dt>Status</dt><dd className="font-semibold">{order.status}</dd></div></dl><div className="mt-8 flex flex-wrap justify-center gap-3"><Link className="rounded-lg bg-[#FF6B4A] px-5 py-3 font-semibold text-white" to={order.paymentStatus === "PAID" ? "/orders" : "/checkout"}>{order.paymentStatus === "PAID" ? "View my orders" : "Return to checkout"}</Link><Link className="rounded-lg border border-[#D9D7D1] px-5 py-3 font-semibold" to="/products">Continue shopping</Link></div></>}
  </section></main></div>;
}
