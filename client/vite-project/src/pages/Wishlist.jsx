import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../axiosCalls/axios";
import SiteHeader from "../components/SiteHeader";

const wobblyRadius = "255px 15px 225px 15px / 15px 225px 15px 255px";
const cardRadius = "18px 5px 20px 7px / 8px 20px 6px 18px";

export default function Wishlist() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [removingIds, setRemovingIds] = useState([]);

  const fetchWishlist = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await axiosInstance.get("/wishlist");
      setWishlist(response.data.wishlist ?? []);
    } catch (requestError) {
      console.error("Failed to load wishlist:", requestError);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const handleRemove = async (productId) => {
    setRemovingIds((current) => [...current, productId]);

    try {
      await axiosInstance.delete(`/wishlist/${productId}`);
      setWishlist((current) => current.filter((item) => item._id !== productId));
    } catch (requestError) {
      console.error("Remove from wishlist failed:", requestError);
      setError(true);
    } finally {
      setRemovingIds((current) => current.filter((id) => id !== productId));
    }
  };

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
          className="mb-8 border-[3px] border-[#2d2d2d] bg-white px-6 py-8 shadow-[8px_8px_0px_0px_#2d2d2d] sm:px-10 sm:py-10"
          style={{ borderRadius: wobblyRadius }}
        >
          <p
            className="inline-block -rotate-2 bg-[#fff9c4] px-3 py-1 text-sm font-bold uppercase tracking-[0.14em] text-[#2d5da1]"
            style={{ borderRadius: "4px 2px 5px 3px" }}
          >
            Your saves
          </p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-[Kalam] text-4xl sm:text-5xl">My Wishlist</h1>
              {!loading && !error && (
                <p className="mt-2 text-lg text-[#55514c]">
                  {wishlist.length} {wishlist.length === 1 ? "product saved" : "products saved"}
                </p>
              )}
            </div>
            <Link
              to="/products"
              className="text-lg font-bold text-[#2d2d2d] underline decoration-[#ff4d4d] decoration-2 underline-offset-4 transition hover:text-[#2d5da1]"
            >
              Continue shopping →
            </Link>
          </div>
        </section>

        {loading ? (
          <div
            role="status"
            className="border-2 border-dashed border-[#2d2d2d] bg-white px-5 py-12 text-center text-xl shadow-[4px_4px_0px_0px_#2d2d2d]"
            style={{ borderRadius: wobblyRadius }}
          >
            Loading your wishlist...
          </div>
        ) : error ? (
          <div
            role="alert"
            className="border-2 border-[#2d2d2d] bg-[#fff9c4] px-5 py-10 text-center shadow-[4px_4px_0px_0px_#2d2d2d]"
            style={{ borderRadius: wobblyRadius }}
          >
            <p className="font-[Kalam] text-2xl">Something went wrong.</p>
            <p className="mt-2 text-lg">We couldn&apos;t load your wishlist.</p>
            <button
              type="button"
              onClick={fetchWishlist}
              className="mt-5 min-h-12 border-[3px] border-[#2d2d2d] bg-white px-6 text-lg font-bold shadow-[4px_4px_0px_0px_#2d2d2d] transition duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#2d5da1] hover:text-white hover:shadow-[2px_2px_0px_0px_#2d2d2d] active:translate-x-1 active:translate-y-1 active:shadow-none"
              style={{ borderRadius: wobblyRadius }}
            >
              Try Again
            </button>
          </div>
        ) : wishlist.length === 0 ? (
          <div
            className="border-2 border-[#2d2d2d] bg-white px-5 py-10 text-center shadow-[6px_6px_0px_0px_#2d2d2d]"
            style={{ borderRadius: wobblyRadius }}
          >
            <div className="text-6xl" aria-hidden="true">❤️</div>
            <h2 className="mt-4 font-[Kalam] text-3xl">Your wishlist is empty</h2>
            <p className="mt-2 text-lg text-[#55514c]">
              Save products you love and find them here later.
            </p>
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="mt-6 min-h-12 border-[3px] border-[#2d2d2d] bg-[#ff4d4d] px-6 text-lg font-bold text-white shadow-[4px_4px_0px_0px_#2d2d2d] transition duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#2d5da1] hover:text-white hover:shadow-[2px_2px_0px_0px_#2d2d2d] active:translate-x-1 active:translate-y-1 active:shadow-none"
              style={{ borderRadius: wobblyRadius }}
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
            {wishlist.map((product) => (
              <article
                key={product._id}
                className="group border-2 border-[#2d2d2d] bg-white p-2.5 shadow-[4px_4px_0px_0px_rgba(45,45,45,0.28)] transition-transform duration-100 hover:-translate-y-1 hover:rotate-1 hover:shadow-[6px_6px_0px_0px_#2d2d2d]"
                style={{ borderRadius: cardRadius }}
              >
                <div
                  className="overflow-hidden border-2 border-[#2d2d2d] bg-[#e5e0d8]"
                  style={{ borderRadius: "10px 5px 12px 6px / 6px 12px 5px 10px" }}
                >
                  <img src={product.image} alt={product.name} className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>

                <div className="px-2 pb-2 pt-4">
                  <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#2d5da1]">
                    {product.category}
                  </p>
                  <h2 className="mt-2 font-[Kalam] text-2xl leading-tight">{product.name}</h2>
                  <p className="mt-2 text-xl font-bold">₹{Number(product.price).toLocaleString("en-IN")}</p>
                  <p className={`mt-2 text-base font-bold ${product.stock > 0 ? "text-[#2d5da1]" : "text-[#ff4d4d]"}`}>
                    {product.stock > 0 ? `${product.stock} units left` : "Out of stock"}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link
                      to={`/products/${product._id}`}
                      className="flex min-h-12 items-center justify-center border-2 border-[#2d2d2d] bg-[#e5e0d8] px-2 text-center text-base font-bold transition duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#2d5da1] hover:text-white hover:shadow-[2px_2px_0px_0px_#2d2d2d] active:translate-x-1 active:translate-y-1 active:shadow-none"
                      style={{ borderRadius: "12px 5px 10px 6px / 6px 10px 5px 12px" }}
                    >
                      View Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleRemove(product._id)}
                      disabled={removingIds.includes(product._id)}
                      className="min-h-12 border-[3px] border-[#2d2d2d] bg-white px-2 text-base font-bold shadow-[3px_3px_0px_0px_#2d2d2d] transition duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#ff4d4d] hover:text-white hover:shadow-[2px_2px_0px_0px_#2d2d2d] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
                      style={{ borderRadius: wobblyRadius }}
                    >
                      {removingIds.includes(product._id) ? "Removing..." : "Remove from Wishlist"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
