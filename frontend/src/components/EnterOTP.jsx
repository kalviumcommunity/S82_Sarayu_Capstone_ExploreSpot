import React, { useState } from "react";
import axios from "axios";

function EnterOTP({ email, onVerified }) {
  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/verify-otp", {
        email,
        enteredOtp: otp,
      });
      alert("OTP verified!");
      onVerified();
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 px-4 py-12">
      <div className="bg-white/30 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-purple-800 mb-6">Enter OTP</h2>
        <form onSubmit={handleVerify} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">OTP sent to {email}</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 rounded-full font-semibold transition"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default EnterOTP;
