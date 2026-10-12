import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../axiosCalls/axios";
import SiteHeader from "../components/SiteHeader";

const wobblyRadius = "255px 15px 225px 15px / 15px 225px 15px 255px";

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosInstance.get(`/orders/${id}`)
      .then(({ data }) => setOrder(data.order))
      .catch((requestError) => setError(requestError.response?.data?.message || "Unable to load this order."));
  }, [id]);

  const paid = order?.paymentStatus === "PAID";

  return (
    <div
      className="min-h-screen bg-[#fdfbf7] font-[Patrick_Hand] text-[#2d2d2d]"
      style={{ backgroundImage: "radial-gradient(#e5e0d8 1px, transparent 1px)", backgroundSize: "24px 24px" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@700&family=Patrick+Hand&display=swap');`}</style>
      <SiteHeader theme="paper" />
      <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        {error ? (
          <section role="alert" className="border-2 border-[#ff4d4d] bg-white p-6 text-lg text-[#9c2727] shadow-[5px_5px_0px_0px_#2d2d2d]" style={{ borderRadius: "18px 5px 20px 7px" }}>
            {error}
          </section>
        ) : !order ? (
          <section role="status" className="border-2 border-[#2d2d2d] bg-white p-8 text-center text-lg shadow-[5px_5px_0px_0px_#2d2d2d]" style={{ borderRadius: wobblyRadius }}>
            Loading order…
          </section>
        ) : (
          <section className="relative overflow-hidden border-[3px] border-[#2d2d2d] bg-white px-6 py-8 text-center shadow-[8px_8px_0px_0px_#2d2d2d] sm:px-10 sm:py-11" style={{ borderRadius: wobblyRadius }}>
            <span
              className={`mx-auto flex h-16 w-16 rotate-[-3deg] items-center justify-center border-[3px] border-[#2d2d2d] font-[Kalam] text-3xl shadow-[4px_4px_0px_0px_#2d2d2d] ${paid ? "bg-[#dff1df] text-[#285c32]" : "bg-[#fff9c4] text-[#5c4b16]"}`}
              style={{ borderRadius: "18px 8px 20px 7px" }}
              aria-hidden="true"
            >
              {paid ? "✓" : "…"}
            </span>
            <p className="mt-5 inline-block -rotate-1 bg-[#fff9c4] px-3 py-1 text-sm font-bold tracking-[0.12em] text-[#2d5da1]" style={{ borderRadius: "4px 2px 6px 3px" }}>
              {paid ? "THANK YOU FOR YOUR ORDER" : "PAYMENT UPDATE"}
            </p>
            <h1 className="mt-3 font-[Kalam] text-3xl sm:text-4xl">
              {paid ? "Your order is on its way!" : "Payment not completed"}
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-lg leading-relaxed text-[#55514c]">
              {paid
                ? "Your payment is confirmed and your order has been saved. You can find it any time in your order history."
                : "This order is awaiting verified payment. Your cart is still available if you would like to try again."}
            </p>

            <dl className="mx-auto mt-7 max-w-lg divide-y-2 divide-dashed divide-[#2d2d2d]/30 border-y-2 border-dashed border-[#2d2d2d]/40 text-left">
              <div className="flex flex-wrap justify-between gap-2 py-3">
                <dt className="font-bold">Order ID</dt>
                <dd className="break-all font-mono text-sm">{order._id}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="font-bold">Total</dt>
                <dd className="font-[Kalam] text-lg">₹{Number(order.totalAmount).toLocaleString("en-IN")}</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="font-bold">Status</dt>
                <dd className="font-bold">{order.status}</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                className="inline-flex min-h-12 items-center justify-center border-[3px] border-[#2d2d2d] bg-[#ff4d4d] px-5 py-2 text-lg font-bold text-white shadow-[4px_4px_0px_0px_#2d2d2d] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#2d5da1] hover:shadow-[2px_2px_0px_0px_#2d2d2d]"
                style={{ borderRadius: wobblyRadius }}
                to={paid ? "/orders" : "/checkout"}
              >
                {paid ? "View my orders" : "Return to checkout"}
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center border-2 border-[#2d2d2d] bg-white px-5 py-2 text-lg font-bold shadow-[3px_3px_0px_0px_#2d2d2d] transition hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-[#fff9c4] hover:shadow-[2px_2px_0px_0px_#2d2d2d]"
                style={{ borderRadius: "14px 7px 12px 6px" }}
                to="/products"
              >
                Continue shopping
              </Link>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
