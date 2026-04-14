import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/axiosinstance";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const email = params.get("email") || "";

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
  await axiosInstance.post("/verify-otp", { email, otp });
  
  navigate("/onboarding");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
        <p className="text-sm text-gray-600 mb-6">We sent a 6-digit code to {email}</p>
        <form onSubmit={handleVerify} className="space-y-4">
          <input value={otp} onChange={(e)=>setOtp(e.target.value)} placeholder="123456" className="w-full rounded px-4 py-2 border" />
          <button className="w-full rounded bg-indigo-600 text-white py-2">Verify</button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
