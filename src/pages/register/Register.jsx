import React, { useState } from "react";
import { Eye, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import meditation from "../../assets/medi.png";
import { axiosInstance } from "../../api/axiosinstance";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  await axiosInstance.post("/register", { fullname, email, password });
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="flex h-[580px] w-[840px] overflow-hidden rounded-2xl font-sans bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.15),0_10px_20px_rgba(0,0,0,0.15)] mt-2">

      <div className="relative w-1/2">
        <img
          src={meditation}
          alt="Meditation"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-1 bg-black/30" />

        <div className="absolute inset-1 flex items-center justify-center px-10 py-10">
          <div className="rounded-3xl border border-white/30 bg-white/20 backdrop-blur-sm p-6 shadow-xl">

            <div className="flex items-center gap-2 text-white mb-4">
              <Leaf size={18} />
              <span className="font-semibold text-sm">
                The Digital Sanctuary
              </span>
            </div>

            <h1 className="text-2xl font-bold text-white leading-snug mb-4">
              Begin your journey toward a more intentional life.
            </h1>

            <p className="text-white/80 text-xs leading-relaxed">
              Small habits compound. Join the community redefining
              well-being through digital mindfulness.
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-1/2 flex-col justify-between px-10 py-6">

        <div className="w-full max-w-sm mx-auto">

          <h2 className="text-2xl font-bold text-gray-800">
            Join the Sanctuary
          </h2>

          <p className="text-gray-500 mt-1 mb-6 text-sm">
            Create your account to start your ritual.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                Full Name
              </label>
              <input
                value={fullname}
                onChange={(e)=>setFullname(e.target.value)}
                type="text"
                placeholder="Alex Rivers"
                className="mt-1 w-full rounded-full bg-gray-100 px-5 py-[9px] outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                Email Address
              </label>
              <input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                type="email"
                placeholder="alex@sanctuary.com"
                className="mt-1 w-full rounded-full bg-gray-100 px-5 py-[9px] outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                Create Password
              </label>

              <div className="relative mt-1">
                <input
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full rounded-full bg-gray-100 px-5 py-[9px] outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <Eye size={18} />
                </button>
              </div>
            </div>

            <button className="w-full rounded-full py-[9px] font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-md hover:scale-[1.02] transition">
              Create Account
            </button>
          </form>

          <div className="flex items-center my-5">
            <div className="flex-grow border-t"></div>
            <span className="px-3 text-[10px] text-gray-400 uppercase">
              Or continue with
            </span>
            <div className="flex-grow border-t"></div>
          </div>

          <div className="flex gap-3">
            <button type="button" className="flex w-1/2 items-center justify-center gap-2 rounded-full border py-2 text-sm hover:bg-gray-50">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-4" alt="Google" />
              Google
            </button>

            <button type="button" className="flex w-1/2 items-center justify-center gap-2 rounded-full border py-2 text-sm hover:bg-gray-50">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_0108YpHnJ1RDlUSIdgzD57Kuh7SgYFkgig&s" className="h-2" alt="Apple" />
              Apple
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-semibold">
              Sign In
            </Link>
          </p>

        </div>

        <p className="text-center text-[10px] text-gray-400 mt-4">
          By creating an account, you agree to our{" "}
          <span className="underline cursor-pointer">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="underline cursor-pointer">
            Privacy Policy
          </span>.
        </p>

      </div>
    </div>
  );
};

export default Register;