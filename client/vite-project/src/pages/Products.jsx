import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { axiosInstance } from "../axiosCalls/axios";
import SiteHeader from "../components/SiteHeader";
import { useCart } from "../cart/cartContext";

const categories = ["All", "Electronics", "Fashion", "Home", "Accessories"];
const wobblyRadius = "255px 15px 225px 15px / 15px 225px 15px 255px";
const cardRadius = "18px 5px 20px 7px / 8px 20px 6px 18px";

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { addToCart, pendingProductIds } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const [wishlist, setWishlist] = useState([]);
    const [savingIds, setSavingIds] = useState([]);
    const search = searchParams.get("search") ?? "";
    const category = searchParams.get("category") ?? "All";
    const sort = searchParams.get("sort") ?? "featured";

    const fetchWishlist = async () => {
        try {
            const response = await axiosInstance.get("/wishlist");
            setWishlist(response.data.wishlist ?? []);
        } catch (requestError) {
            console.error("Failed to load wishlist:", requestError);
        }
    };

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

    useEffect(() => {
        fetchWishlist();
    }, []);

    const handleAddToWishlist = async (productId) => {
        if (savingIds.includes(productId)) return;

        setSavingIds((current) => [...current, productId]);

        try {
            await axiosInstance.post(`/wishlist/${productId}`);
            await fetchWishlist();
        } catch (requestError) {
            console.error("Failed to save product:", requestError);
            if (requestError.response?.status === 409) {
                await fetchWishlist();
            }
        } finally {
            setSavingIds((current) => current.filter((id) => id !== productId));
        }
    };

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

            <main className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-14">
                <section
                    aria-labelledby="catalog-title"
                    className="relative mb-12 border-[3px] border-[#2d2d2d] bg-white px-6 py-9 shadow-[8px_8px_0px_0px_#2d2d2d] sm:px-10 sm:py-11"
                    style={{ borderRadius: wobblyRadius }}
                >
                    <span
                        aria-hidden="true"
                        className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 rotate-[-3deg] bg-[#e5e0d8]/80"
                        style={{ borderRadius: "3px 2px 5px 1px" }}
                    />
                    <div className="relative max-w-2xl">
                        <p
                            className="inline-block -rotate-2 bg-[#fff9c4] px-3 py-1 text-sm font-bold uppercase tracking-[0.14em]"
                            style={{ borderRadius: "4px 2px 5px 3px" }}
                        >
                            The ShopKart catalog
                        </p>
                        <h1 id="catalog-title" className="mt-4 font-[Kalam] text-4xl leading-tight sm:text-5xl">
                            Find your next favorite<span className="text-[#ff4d4d]">!</span>
                        </h1>
                        <p className="mt-3 text-lg leading-relaxed text-[#55514c] sm:text-xl">
                            Good things are out there. Search around, pick a category, and see what catches your eye.
                        </p>
                        <svg aria-hidden="true" className="mt-3 h-4 w-44 text-[#2d5da1]" viewBox="0 0 180 14" fill="none">
                            <path d="M3 9C38 2 65 13 99 6s52-2 78-4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 5" />
                        </svg>
                    </div>
                    <span aria-hidden="true" className="absolute right-6 top-5 hidden rotate-6 font-[Kalam] text-4xl text-[#2d5da1] sm:block">✳</span>
                </section>

                <section aria-label="Product filters">
                    <div className="mb-8 grid gap-4 md:grid-cols-[minmax(0,1fr)_220px_200px]">
                        <label
                            className="flex min-h-14 items-center gap-3 border-2 border-[#2d2d2d] bg-white px-4 shadow-[3px_3px_0px_0px_#2d2d2d] transition focus-within:border-[#2d5da1] focus-within:ring-2 focus-within:ring-[#2d5da1]/20"
                            style={{ borderRadius: wobblyRadius }}
                        >
                            <svg aria-hidden="true" className="h-5 w-5 shrink-0 text-[#2d5da1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <circle cx="11" cy="11" r="7" />
                                <path d="m20 20-4-4" />
                            </svg>
                            <input
                                type="search"
                                aria-label="Search products"
                                placeholder="What are you looking for?"
                                value={search}
                                onChange={(event) => updateFilter("search", event.target.value)}
                                className="w-full bg-transparent text-lg outline-none placeholder:text-[#2d2d2d]/45"
                            />
                        </label>

                        <label
                            className="flex min-h-14 items-center gap-3 border-2 border-[#2d2d2d] bg-white px-4 shadow-[3px_3px_0px_0px_#2d2d2d] transition focus-within:border-[#2d5da1] focus-within:ring-2 focus-within:ring-[#2d5da1]/20"
                            style={{ borderRadius: "8px 18px 7px 16px / 16px 7px 18px 8px" }}
                        >
                            <span className="shrink-0 text-sm font-bold text-[#55514c]">Category</span>
                            <select
                                aria-label="Filter by category"
                                value={category}
                                onChange={(event) => updateFilter("category", event.target.value === "All" ? "" : event.target.value)}
                                className="w-full min-w-0 bg-transparent text-base outline-none"
                            >
                                {categories.map((item) => <option key={item} value={item}>{item === "All" ? "Everything" : item}</option>)}
                            </select>
                        </label>

                        <label
                            className="flex min-h-14 items-center gap-3 border-2 border-[#2d2d2d] bg-white px-4 shadow-[3px_3px_0px_0px_#2d2d2d] transition focus-within:border-[#2d5da1] focus-within:ring-2 focus-within:ring-[#2d5da1]/20"
                            style={{ borderRadius: "18px 7px 16px 8px / 7px 16px 8px 18px" }}
                        >
                            <span className="shrink-0 text-sm font-bold text-[#55514c]">Sort</span>
                            <select
                                aria-label="Sort products"
                                value={sort}
                                onChange={(event) => updateFilter("sort", event.target.value === "featured" ? "" : event.target.value)}
                                className="w-full min-w-0 bg-transparent text-base outline-none"
                            >
                                <option value="featured">Featured</option>
                                <option value="price_asc">Price: low to high</option>
                                <option value="price_desc">Price: high to low</option>
                                <option value="newest">Newest</option>
                            </select>
                        </label>
                    </div>

                    <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b-2 border-dashed border-[#2d2d2d]/40 pb-3">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#2d5da1]">
                                {search || category !== "All" ? "A little something for you" : "Fresh from the shelves"}
                            </p>
                            <h2 className="mt-1 font-[Kalam] text-3xl">
                                {search || category !== "All" ? "Matching finds" : "All the good stuff"}
                            </h2>
                        </div>
                        <Link to="/home" className="text-lg font-bold text-[#2d2d2d] underline decoration-[#ff4d4d] decoration-2 underline-offset-4 transition hover:text-[#2d5da1]">
                            ← Back to the shop
                        </Link>
                    </div>

                    {loading ? (
                        <p role="status" className="border-2 border-dashed border-[#2d2d2d] bg-white px-5 py-12 text-center text-xl" style={{ borderRadius: wobblyRadius }}>
                            Looking through the shelves...
                        </p>
                    ) : error ? (
                        <div role="alert" className="border-2 border-[#2d2d2d] bg-[#fff9c4] px-5 py-10 text-center shadow-[4px_4px_0px_0px_#2d2d2d]" style={{ borderRadius: wobblyRadius }}>
                            <p className="font-[Kalam] text-2xl">Oops, the shelves didn&apos;t load.</p>
                            <p className="mt-1 text-lg">Give it another try?</p>
                            <button
                                type="button"
                                onClick={() => setRetryCount((count) => count + 1)}
                                className="mt-4 min-h-12 border-[3px] border-[#2d2d2d] bg-white px-6 text-lg font-bold shadow-[4px_4px_0px_0px_#2d2d2d] transition duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#ff4d4d] hover:text-white hover:shadow-[2px_2px_0px_0px_#2d2d2d] active:translate-x-1 active:translate-y-1 active:shadow-none"
                                style={{ borderRadius: wobblyRadius }}
                            >
                                Try again
                            </button>
                        </div>
                    ) : visibleProducts.length === 0 ? (
                        <div className="border-2 border-dashed border-[#2d2d2d] bg-white px-5 py-12 text-center shadow-[4px_4px_0px_0px_#2d2d2d]" style={{ borderRadius: wobblyRadius }}>
                            <p className="font-[Kalam] text-3xl">Nothing on this page yet.</p>
                            <p className="mt-2 text-lg text-[#55514c]">Try another search or category and see what turns up.</p>
                            {(search || category !== "All") && (
                                <button
                                    type="button"
                                    onClick={() => setSearchParams({})}
                                    className="mt-4 min-h-12 border-[3px] border-[#2d2d2d] bg-[#e5e0d8] px-5 text-lg font-bold shadow-[4px_4px_0px_0px_#2d2d2d] transition duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#2d5da1] hover:text-white hover:shadow-[2px_2px_0px_0px_#2d2d2d] active:translate-x-1 active:translate-y-1 active:shadow-none"
                                    style={{ borderRadius: wobblyRadius }}
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                            {visibleProducts.map((product, index) => (
                                <article
                                    key={product._id}
                                    className={`group relative border-2 border-[#2d2d2d] bg-white p-2.5 shadow-[4px_4px_0px_0px_rgba(45,45,45,0.28)] transition-transform duration-100 hover:-translate-y-1 hover:rotate-1 hover:shadow-[6px_6px_0px_0px_#2d2d2d] motion-reduce:transition-none ${index % 3 === 1 ? "rotate-[0.5deg]" : index % 3 === 2 ? "-rotate-[0.5deg]" : ""}`}
                                    style={{ borderRadius: cardRadius }}
                                >
                                    <span
                                        className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 -rotate-2 bg-[#fff9c4] px-3 py-1 text-sm font-bold"
                                        style={{ borderRadius: "3px 2px 5px 1px" }}
                                    >
                                        {product.category}
                                    </span>
                                    <Link
                                        to={`/products/${product._id}`}
                                        aria-label={`View ${product.name}`}
                                        className="block aspect-[4/3] overflow-hidden border-2 border-[#2d2d2d] bg-[#e5e0d8]"
                                        style={{ borderRadius: "10px 5px 12px 6px / 6px 12px 5px 10px" }}
                                    >
                                        <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                    </Link>
                                    <div className="px-2 pb-2 pt-4">
                                        <Link to={`/products/${product._id}`} className="block truncate font-[Kalam] text-2xl leading-tight text-[#2d2d2d] hover:text-[#ff4d4d]">
                                            {product.name}
                                        </Link>
                                        <div className="mt-2 flex items-center justify-between gap-2 text-lg">
                                            <span className="font-bold">₹{Number(product.price).toLocaleString("en-IN")}</span>
                                            <span className={`text-base font-bold ${product.stock > 0 ? "text-[#2d5da1]" : "text-[#ff4d4d]"}`}>
                                                {product.stock > 0 ? `${product.stock} left` : "Sold out"}
                                            </span>
                                        </div>
                                        <div className="mt-4 flex flex-col gap-2">
                                            <div className="grid grid-cols-2 gap-2">
                                                <Link
                                                    to={`/products/${product._id}`}
                                                    className="flex min-h-12 items-center justify-center border-2 border-[#2d2d2d] bg-[#e5e0d8] px-2 text-center text-base font-bold transition duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#2d5da1] hover:text-white hover:shadow-[2px_2px_0px_0px_#2d2d2d] active:translate-x-1 active:translate-y-1 active:shadow-none"
                                                    style={{ borderRadius: "12px 5px 10px 6px / 6px 10px 5px 12px" }}
                                                >
                                                    View details
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => handleAddToWishlist(product._id)}
                                                    disabled={savingIds.includes(product._id) || wishlist.some((item) => item._id === product._id)}
                                                    className="min-h-12 border-[3px] border-[#2d2d2d] bg-white px-2 text-base font-bold shadow-[3px_3px_0px_0px_#2d2d2d] transition duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#ff4d4d] hover:text-white hover:shadow-[2px_2px_0px_0px_#2d2d2d] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:bg-white disabled:hover:text-[#2d2d2d] disabled:hover:shadow-[3px_3px_0px_0px_#2d2d2d]"
                                                    style={{ borderRadius: wobblyRadius }}
                                                >
                                                    {savingIds.includes(product._id)
                                                        ? "⏳ Saving..."
                                                        : wishlist.some((item) => item._id === product._id)
                                                            ? "♥ Saved"
                                                            : "♡ Wishlist"}
                                                </button>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => addToCart(product)}
                                                disabled={product.stock <= 0 || pendingProductIds.includes(product._id)}
                                                className="min-h-12 border-[3px] border-[#2d2d2d] bg-[#ff4d4d] px-3 text-base font-bold text-white shadow-[3px_3px_0px_0px_#2d2d2d] transition duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#2d5da1] hover:shadow-[2px_2px_0px_0px_#2d2d2d] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:bg-[#e5e0d8] disabled:text-[#55514c]"
                                                style={{ borderRadius: wobblyRadius }}
                                            >
                                                {pendingProductIds.includes(product._id) ? "Adding..." : product.stock > 0 ? "Add to cart" : "Sold out"}
                                            </button>
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
