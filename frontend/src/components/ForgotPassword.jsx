import React from "react";

function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Your Password</h2>
        <form className="space-y-5">
          <div>
            <label className="block text-sm">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter your Email"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-900 transition-all p-2 rounded text-white font-semibold"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
