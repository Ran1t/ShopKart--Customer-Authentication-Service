import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../axiosCalls/axios";
import SiteHeader from "../components/SiteHeader";
import { useCart } from "../cart/cartContext";

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
      } catch (error) {
        console.error("Failed to load product:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) {
    return <><SiteHeader theme="dark" /><p className="p-6 text-slate-300">Loading product...</p></>;
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <SiteHeader theme="dark" />
        <div className="mx-auto max-w-5xl px-6 py-10">
          <p className="text-slate-300">Something went wrong while loading the product.</p>
          <Link to="/products" className="mt-4 inline-block text-sm font-semibold text-indigo-400 hover:text-white">← Back to products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <SiteHeader theme="dark" />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Link to="/products" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white">← Back to products</Link>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
            <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
          </div>

          <section className="flex flex-col items-start py-2">
            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-300">{product.category}</span>
            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">{product.name}</h1>
            <p className="mt-4 leading-relaxed text-slate-400">{product.description}</p>
            <p className="mt-6 text-3xl font-bold">₹{Number(product.price).toLocaleString("en-IN")}</p>
            <p className={`mt-3 text-sm font-medium ${product.stock > 0 ? "text-emerald-400" : "text-slate-500"}`}>
              {product.stock > 0 ? `${product.stock} units left` : "Out of stock"}
            </p>
            <button
              type="button"
              onClick={() => { addToCart(product); setAdded(true); }}
              disabled={product.stock <= 0}
              className="mt-7 w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 sm:w-auto"
            >
              {product.stock <= 0 ? "Out of stock" : added ? "Added to cart" : "Add to cart"}
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}