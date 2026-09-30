import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { axiosInstance } from "../axiosCalls/axios";
import SiteHeader from "../components/SiteHeader";
import { useCart } from "../cart/cartContext";

const categories = ["All", "Electronics", "Fashion", "Home", "Accessories"];

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const search = searchParams.get("search") ?? "";
    const category = searchParams.get("category") ?? "All";
    const sort = searchParams.get("sort") ?? "featured";

    useEffect(() => {
        let active = true;

        const loadProducts = async () => {
            setLoading(true);
            setError(false);
            try {
                const params = {};
                if (search.trim()) params.search = search.trim();
                if (category !== "All") params.category = category;
                if (sort === "price_asc" || sort === "price_desc") params.sort = sort;
                const response = await axiosInstance.get("/products", { params });
                if (active) setProducts(response.data.products ?? []);
            } catch (requestError) {
                console.error("Failed to load products:", requestError);
                if (active) setError(true);
            } finally {
                if (active) setLoading(false);
            }
        };

        loadProducts();
        return () => { active = false; };
    }, [search, category, sort, retryCount]);

    const updateFilter = (key, value) => {
        const nextParams = new URLSearchParams(searchParams);
        if (value) nextParams.set(key, value);
        else nextParams.delete(key);
        setSearchParams(nextParams);
    };

    const visibleProducts = sort === "newest"
        ? [...products].sort((first, second) => String(second._id).localeCompare(String(first._id)))
        : products;

    return (
        <div className="min-h-screen bg-white font-[Inter] text-[#1B2A2E]">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
            `}</style>

            <SiteHeader />

            <main className="mx-auto max-w-300 px-6 py-9 sm:py-12">
                <section className="mb-8 rounded-2xl bg-[#FFF4EC] px-6 py-8 sm:px-10 sm:py-10">
                    <p className="text-xs font-semibold tracking-[0.16em] text-[#D84F38]">THE SHOPKART CATALOG</p>
                    <h1 className="mt-2 font-[Sora] text-3xl font-semibold tracking-tight text-[#1B2A2E] sm:text-4xl">Find your next favorite.</h1>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#6B7773]">Explore the full collection, search for something specific, or filter by category.</p>
                </section>

                <section aria-label="Product filters">
                    <div className="mb-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px_190px]">
                        <label className="flex items-center gap-3 rounded-xl border border-[#E4E2DC] bg-white px-4 py-3 focus-within:border-[#1B2A2E]">
                            <svg aria-hidden="true" className="h-5 w-5 shrink-0 text-[#6B7773]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                                <circle cx="11" cy="11" r="7" />
                                <path d="m20 20-4-4" />
                            </svg>
                            <input
                                type="search"
                                aria-label="Search products"
                                placeholder="Search products..."
                                value={search}
                                onChange={(event) => updateFilter("search", event.target.value)}
                                className="w-full bg-transparent text-sm text-[#1B2A2E] outline-none placeholder:text-[#8A9490]"
                            />
                        </label>

                        <label className="flex items-center gap-3 rounded-xl border border-[#E4E2DC] bg-white px-4 py-3">
                            <span className="shrink-0 text-xs font-medium text-[#6B7773]">Category</span>
                            <select
                                aria-label="Filter by category"
                                value={category}
                                onChange={(event) => updateFilter("category", event.target.value === "All" ? "" : event.target.value)}
                                className="w-full bg-transparent text-sm text-[#1B2A2E] outline-none"
                            >
                                {categories.map((item) => <option key={item} value={item}>{item === "All" ? "All categories" : item}</option>)}
                            </select>
                        </label>

                        <label className="flex items-center gap-3 rounded-xl border border-[#E4E2DC] bg-white px-4 py-3">
                            <span className="shrink-0 text-xs font-medium text-[#6B7773]">Sort</span>
                            <select
                                aria-label="Sort products"
                                value={sort}
                                onChange={(event) => updateFilter("sort", event.target.value === "featured" ? "" : event.target.value)}
                                className="w-full bg-transparent text-sm text-[#1B2A2E] outline-none"
                            >
                                <option value="featured">Featured</option>
                                <option value="price_asc">Price: low to high</option>
                                <option value="price_desc">Price: high to low</option>
                                <option value="newest">Newest</option>
                            </select>
                        </label>
                    </div>

                    <div className="mb-5 flex items-center justify-between gap-4">
                        <h2 className="font-[Sora] text-xl font-semibold text-[#1B2A2E]">
                            {search || category !== "All" ? "Matching products" : "All products"}
                        </h2>
                        <Link to="/home" className="shrink-0 text-sm font-medium text-[#1B2A2E] transition-colors hover:text-[#D84F38]">Back to home</Link>
                    </div>

                    {loading ? (
                        <p role="status" className="py-12 text-center text-sm text-[#6B7773]">Loading products...</p>
                    ) : error ? (
                        <div role="alert" className="rounded-xl border border-[#E4E2DC] bg-[#FAF9F6] px-5 py-10 text-center">
                            <p className="text-sm text-[#6B7773]">Something went wrong while loading products.</p>
                            <button type="button" onClick={() => setRetryCount((count) => count + 1)} className="mt-3 text-sm font-semibold text-[#D84F38] underline underline-offset-4">Try again</button>
                        </div>
                    ) : visibleProducts.length === 0 ? (
                        <div className="rounded-xl border border-[#E4E2DC] bg-[#FAF9F6] px-5 py-12 text-center">
                            <p className="font-[Sora] text-lg font-semibold text-[#1B2A2E]">No products found.</p>
                            <p className="mt-2 text-sm text-[#6B7773]">Try another search or category.</p>
                            {(search || category !== "All") && (
                                <button type="button" onClick={() => setSearchParams({})} className="mt-4 text-sm font-semibold text-[#D84F38] underline underline-offset-4">Clear filters</button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
                            {visibleProducts.map((product) => (
                                <article key={product._id} className="group overflow-hidden rounded-xl border border-[#E4E2DC] bg-white transition hover:border-[#1B2A2E]">
                                    <Link to={`/products/${product._id}`} aria-label={`View ${product.name}`} className="block aspect-square overflow-hidden bg-[#F5F3EF]">
                                        <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                    </Link>
                                    <div className="p-3.5 sm:p-4">
                                        <p className="text-xs text-[#6B7773]">{product.category}</p>
                                        <Link to={`/products/${product._id}`} className="mt-1 block truncate text-sm font-semibold text-[#1B2A2E] hover:text-[#D84F38]">{product.name}</Link>
                                        <div className="mt-2 flex items-center justify-between gap-2">
                                            <span className="font-semibold text-[#1B2A2E]">₹{Number(product.price).toLocaleString("en-IN")}</span>
                                            <span className={`text-[11px] ${product.stock > 0 ? "text-emerald-700" : "text-[#B03A2E]"}`}>{product.stock > 0 ? `${product.stock} left` : "Sold out"}</span>
                                        </div>
                                        <div className="mt-3 grid grid-cols-2 gap-2">
                                            <Link to={`/products/${product._id}`} className="rounded-lg border border-[#E4E2DC] px-2 py-2 text-center text-xs font-semibold text-[#1B2A2E] transition hover:border-[#1B2A2E]">View details</Link>
                                            <button type="button" onClick={() => addToCart(product)} disabled={product.stock <= 0} className="rounded-lg bg-[#1B2A2E] px-2 py-2 text-xs font-semibold text-white transition hover:bg-[#30464B] disabled:cursor-not-allowed disabled:opacity-50">Add to cart</button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
