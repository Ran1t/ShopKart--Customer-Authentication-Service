import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../axiosCalls/axios";
import SiteHeader from "../components/SiteHeader";
import { useCart } from "../cart/cartContext";

const wobblyRadius = "255px 15px 225px 15px / 15px 225px 15px 255px";

function PaperPage({ children }) {
  return (
    <div
      className="min-h-screen bg-[#fdfbf7] font-[Patrick_Hand] text-[#2d2d2d]"
      style={{
        backgroundImage: "radial-gradient(#e5e0d8 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@700&family=Patrick+Hand&display=swap');
      `}</style>
      <SiteHeader theme="paper" />
      {children}
    </div>
  );
}

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await axiosInstance.get(`/products/${id}`);
        setProduct(response.data.product);
      } catch (requestError) {
        console.error("Failed to load product:", requestError);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) {
    return (
      <PaperPage>
        <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-14">
          <p
            role="status"
            className="border-2 border-dashed border-[#2d2d2d] bg-white px-5 py-12 text-center text-xl"
            style={{ borderRadius: wobblyRadius }}
          >
            Looking for this find...
          </p>
        </main>
      </PaperPage>
    );
  }

  if (error || !product) {
    return (
      <PaperPage>
        <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-14">
          <section
            role="alert"
            className="border-2 border-[#2d2d2d] bg-[#fff9c4] px-5 py-10 text-center shadow-[4px_4px_0px_0px_#2d2d2d]"
            style={{ borderRadius: wobblyRadius }}
          >
            <p className="font-[Kalam] text-2xl">We couldn&apos;t find that product.</p>
            <p className="mt-1 text-lg">Head back to the shelves and try another one.</p>
            <Link
              to="/products"
              className="mt-5 inline-flex min-h-12 items-center border-[3px] border-[#2d2d2d] bg-white px-5 text-lg font-bold shadow-[4px_4px_0px_0px_#2d2d2d] transition duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#2d5da1] hover:text-white hover:shadow-[2px_2px_0px_0px_#2d2d2d]"
              style={{ borderRadius: wobblyRadius }}
            >
              Back to products
            </Link>
          </section>
        </main>
      </PaperPage>
    );
  }

  return (
    <PaperPage>
      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-6 sm:py-12">
        <Link
          to="/products"
          className="mb-7 inline-flex items-center gap-2 text-lg font-bold text-[#2d2d2d] underline decoration-[#2d5da1] decoration-2 underline-offset-4 transition hover:text-[#2d5da1]"
        >
          ← Back to products
        </Link>

        <article
          className="grid gap-7 border-[3px] border-[#2d2d2d] bg-white p-4 shadow-[8px_8px_0px_0px_#2d2d2d] sm:p-7 lg:grid-cols-2 lg:gap-10"
          style={{ borderRadius: wobblyRadius }}
        >
          <div
            className="relative overflow-hidden border-2 border-[#2d2d2d] bg-[#e5e0d8]"
            style={{ borderRadius: "18px 5px 20px 7px / 8px 20px 6px 18px" }}
          >
            <span
              className="absolute left-4 top-4 z-10 -rotate-2 border-2 border-[#2d2d2d] bg-[#fff9c4] px-3 py-1 text-sm font-bold uppercase tracking-wider"
              style={{ borderRadius: "5px 2px 7px 3px" }}
            >
              {product.category}
            </span>
            <img
              src={product.image}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
          </div>

          <section className="flex flex-col items-start px-1 py-2 sm:px-3 sm:py-4">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#2d5da1]">
              A closer look
            </p>
            <h1 className="mt-3 font-[Kalam] text-4xl leading-tight sm:text-5xl">
              {product.name}
            </h1>
            <svg aria-hidden="true" className="mt-3 h-4 w-44 text-[#ff4d4d]" viewBox="0 0 180 14" fill="none">
              <path d="M3 9C38 2 65 13 99 6s52-2 78-4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 5" />
            </svg>
            <p className="mt-5 text-lg leading-relaxed text-[#55514c] sm:text-xl">
              {product.description}
            </p>

            <div className="mt-7 flex w-full flex-wrap items-end justify-between gap-3 border-b-2 border-dashed border-[#2d2d2d]/40 pb-5">
              <p className="font-[Kalam] text-4xl font-bold">
                ₹{Number(product.price).toLocaleString("en-IN")}
              </p>
              <p className={`text-lg font-bold ${product.stock > 0 ? "text-[#2d5da1]" : "text-[#ff4d4d]"}`}>
                {product.stock > 0 ? `${product.stock} units left` : "Out of stock"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                addToCart(product);
                setAdded(true);
              }}
              disabled={product.stock <= 0}
              className="mt-6 min-h-12 w-full border-[3px] border-[#2d2d2d] bg-[#ff4d4d] px-6 py-2 text-lg font-bold text-white shadow-[4px_4px_0px_0px_#2d2d2d] transition duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#2d5da1] hover:shadow-[2px_2px_0px_0px_#2d2d2d] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:bg-[#e5e0d8] disabled:text-[#55514c] disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_#2d2d2d] sm:w-auto"
              style={{ borderRadius: wobblyRadius }}
            >
              {product.stock <= 0 ? "Out of stock" : added ? "Added to cart ✓" : "Add to cart"}
            </button>
          </section>
        </article>
      </main>
    </PaperPage>
  );
}
