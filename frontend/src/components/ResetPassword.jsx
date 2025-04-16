import React, { useState } from "react";
import axios from "axios";

function ResetPassword({ email }) {
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/reset-password", {
        email,
        newPassword,
      });
      alert("Password reset successfully!");
    } catch (err) {
      alert("Failed to reset password.");
    }
  };

  return (
    <form onSubmit={handleReset} className="space-y-4">
      <label className="block text-sm">New Password</label>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white border"
      />
      <button type="submit" className="w-full bg-purple-600 p-2 rounded text-white">
        Reset Password
      </button>
    </form>
  );
}

export default ResetPassword;
