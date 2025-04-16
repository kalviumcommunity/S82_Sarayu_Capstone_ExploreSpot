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
    <form onSubmit={handleVerify} className="space-y-4">
      <label className="block text-sm">Enter OTP</label>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white border"
      />
      <button type="submit" className="w-full bg-green-600 p-2 rounded text-white">
        Verify OTP
      </button>
    </form>
  );
}

export default EnterOTP;

