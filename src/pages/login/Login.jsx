import React, { useState } from "react";
import meditation from "../../assets/Meditation.png";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/axiosinstance";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/login", { email, password });
      navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex h-[580px] w-[800px] overflow-hidden rounded-2xl bg-white font-sans text-slate-900 shadow-[0_-10px_20px_rgba(0,0,0,0.15),0_10px_20px_rgba(0,0,0,0.15)] mt-2">
      <div className="relative hidden w-1/2 lg:block">
        <img src={meditation} alt="Meditation visual" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="max-w-sm rounded-3xl border border-white/30 bg-white/10 p-7 backdrop-blur-xl shadow-2xl">
            <h1 className="mb-3 text-3xl font-bold leading-tight text-slate-900">Welcome Back to your Sanctuary</h1>
            <p className="mb-6 text-base text-slate-800/80">Small habits don't add up, they compound.</p>
            <div className="flex gap-2">
              <div className="h-1 w-8 rounded-full bg-indigo-600" />
              <div className="h-1 w-2 rounded-full bg-indigo-300" />
              <div className="h-1 w-2 rounded-full bg-indigo-300" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full lg:w-1/2 flex-col justify-center px-8 py-6">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg">
              <Sparkles size={22} />
            </div>
            <span className="text-lg font-semibold text-indigo-600">Digital Sanctuary</span>
          </div>

          <div className="mb-5">
            <h2 className="text-2xl font-bold text-slate-900">Sign In</h2>
            <p className="mt-1 text-sm text-slate-500">Continue your journey to mindful productivity.</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-[10px] font-bold tracking-widest text-slate-400 uppercase">Email Address</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="name@sanctuary.com" required className="w-full rounded-full bg-slate-100 px-5 py-3 outline-none transition focus:bg-white focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div>
              <div className="mb-1 flex justify-between">
                <label className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Password</label>
                <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-500">Forgot Password?</a>
              </div>

              <div className="relative">
                <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="••••••••" required className="w-full rounded-full bg-slate-100 px-5 py-3 outline-none transition focus:bg-white focus:ring-2 focus:ring-indigo-500" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input type="checkbox" id="remember" className="h-4 w-4 rounded-full border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              <label htmlFor="remember" className="text-sm text-slate-500">Keep me signed in for 30 days</label>
            </div>

            <button type="submit" className="w-full rounded-full bg-indigo-600 py-3 font-bold text-white shadow-lg transition hover:bg-indigo-700 active:scale-[0.98]">Sign In</button>

            <div className="relative my-5 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
              <span className="relative bg-white px-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase">Or continue with</span>
            </div>

            <div className="flex gap-3">
              <button type="button" className="flex w-1/2 items-center justify-center gap-2 rounded-full border border-slate-200 py-2 hover:bg-slate-50">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-4 w-4" alt="Google" />
                <span className="text-sm font-semibold">Google</span>
              </button>

              <button type="button" className="flex w-1/2 items-center justify-center gap-2 rounded-full border border-slate-200 py-2 hover:bg-slate-50">
                <img src="data:image/png;base64,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" className="h-4 w-4" alt="Apple" />
                <span className="text-sm font-semibold">Apple</span>
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">New to Digital Sanctuary? <Link to="/register" className="font-bold text-indigo-600 hover:underline">Create an Account</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;