import React from "react";

function Signup() {
  return (
    <form className="space-y-5">
      <div>
        <label className="block text-sm">Name</label>
        <input
          type="text"
          className="w-full mt-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Your Name"
        />
      </div>
      <div>
        <label className="block text-sm">Email</label>
        <input
          type="email"
          className="w-full mt-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Enter your mail"
        />
      </div>
      <div>
        <label className="block text-sm">Password</label>
        <input
          type="password"
          className="w-full mt-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-black hover:bg-gray-900 transition-all p-2 rounded text-white font-semibold"
      >
        Sign Up
      </button>
    </form>
  );
}

export default Signup;
