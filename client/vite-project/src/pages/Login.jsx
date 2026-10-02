import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../axiosCalls/axios";
import { useAuth } from "../auth/authContext";

const wobblyRadius = "255px 15px 225px 15px / 15px 225px 15px 255px";
const inputClass =
  "w-full border-2 border-[#2d2d2d] bg-[#fdfbf7] px-4 py-3 text-lg text-[#2d2d2d] outline-none transition focus:border-[#2d5da1] focus:ring-2 focus:ring-[#2d5da1]/20 disabled:opacity-60";

function CartMark() {
  return (
    <span
      className="flex h-11 w-11 rotate-[-3deg] items-center justify-center border-2 border-[#2d2d2d] bg-[#fff9c4] shadow-[3px_3px_0px_0px_#2d2d2d]"
      style={{ borderRadius: "10px 5px 12px 6px / 6px 12px 5px 10px" }}
    >
      <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="20" r="1.2" />
        <circle cx="17" cy="20" r="1.2" />
        <path d="M2.5 3h2l2.2 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.97-1.66L20 7.5H6" />
      </svg>
    </span>
  );
}

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (event) => {
    setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axiosInstance.post("/customers/login", form);
      setUser(response.data.customer);
      navigate("/home");
    } catch (requestError) {
      console.error("Login failed:", requestError);
      setError(
        requestError?.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="flex min-h-screen items-center justify-center bg-[#fdfbf7] px-4 py-8 font-[Patrick_Hand] text-[#2d2d2d] sm:px-6 sm:py-12"
      style={{
        backgroundImage: "radial-gradient(#e5e0d8 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@700&family=Patrick+Hand&display=swap');
      `}</style>

      <section
        className="grid w-full max-w-5xl overflow-hidden border-[3px] border-[#2d2d2d] bg-white shadow-[8px_8px_0px_0px_#2d2d2d] lg:grid-cols-[0.9fr_1.1fr]"
        style={{ borderRadius: wobblyRadius }}
      >
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-[#fff9c4] p-10 lg:flex">
          <Link to="/" className="flex w-fit items-center gap-3" aria-label="ShopKart home">
            <CartMark />
            <span className="font-[Kalam] text-2xl">ShopKart</span>
          </Link>
          <div className="relative py-12">
            <span aria-hidden="true" className="absolute -right-1 top-0 font-[Kalam] text-5xl text-[#ff4d4d]">✳</span>
            <div
              className="flex h-52 w-52 rotate-2 items-center justify-center border-[3px] border-[#2d2d2d] bg-white shadow-[6px_6px_0px_0px_#2d2d2d]"
              style={{ borderRadius: "22px 8px 26px 10px / 12px 28px 9px 24px" }}
            >
              <svg aria-hidden="true" className="h-28 w-28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="20" r="1.4" />
                <circle cx="17" cy="20" r="1.4" />
                <path d="M2.5 3h2l2.2 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.97-1.66L20 7.5H6" />
                <path d="m10 10 2 2m0-2-2 2" stroke="#ff4d4d" strokeWidth="1.8" />
              </svg>
            </div>
            <span
              className="absolute bottom-4 right-1 rotate-2 border-2 border-[#2d2d2d] bg-white px-3 py-2 text-lg font-bold shadow-[3px_3px_0px_0px_#2d2d2d]"
              style={{ borderRadius: "7px 15px 5px 13px" }}
            >
              Good finds await!
            </span>
          </div>
          <div>
            <h2 className="font-[Kalam] text-3xl leading-tight">Pick up right where you left off.</h2>
            <p className="mt-3 text-lg leading-relaxed text-[#55514c]">
              Log in to see your saved items, track orders, and keep shopping.
            </p>
          </div>
        </aside>

        <div className="flex items-center justify-center px-6 py-9 sm:px-10 sm:py-12 lg:px-14">
          <div className="w-full max-w-md">
            <Link to="/" className="mb-8 flex w-fit items-center gap-3 lg:hidden">
              <CartMark />
              <span className="font-[Kalam] text-2xl">ShopKart</span>
            </Link>
            <p
              className="inline-block -rotate-2 bg-[#fff9c4] px-3 py-1 text-sm font-bold uppercase tracking-[0.14em]"
              style={{ borderRadius: "4px 2px 5px 3px" }}
            >
              Welcome back
            </p>
            <h1 className="mt-4 font-[Kalam] text-4xl sm:text-5xl">Let&apos;s get shopping!</h1>
            <p className="mt-2 text-lg text-[#55514c]">Log in to continue your ShopKart adventure.</p>

            {error && (
              <div role="alert" className="mt-6 border-2 border-[#ff4d4d] bg-[#ff4d4d]/10 px-4 py-3 text-base text-[#9c2727]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-base font-bold">
                  Email address <span className="text-[#ff4d4d]">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  onChange={handleChange}
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={loading}
                  className={inputClass}
                  style={{ borderRadius: "8px 18px 7px 16px / 16px 7px 18px 8px" }}
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-1.5 block text-base font-bold">
                  Password <span className="text-[#ff4d4d]">*</span>
                </label>
                <input
                  id="password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  placeholder="More than 6 characters"
                  autoComplete="current-password"
                  disabled={loading}
                  className={inputClass}
                  style={{ borderRadius: "18px 7px 16px 8px / 7px 16px 8px 18px" }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="min-h-12 w-full border-[3px] border-[#2d2d2d] bg-[#ff4d4d] px-5 py-2 text-lg font-bold text-white shadow-[4px_4px_0px_0px_#2d2d2d] transition duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#2d5da1] hover:shadow-[2px_2px_0px_0px_#2d2d2d] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
                style={{ borderRadius: wobblyRadius }}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <p className="mt-7 text-center text-lg text-[#55514c]">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="font-bold text-[#2d5da1] underline decoration-[#ff4d4d] decoration-2 underline-offset-4 hover:text-[#ff4d4d]">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
