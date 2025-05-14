import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-200 flex items-center justify-center px-4">
      <div className="bg-white bg-opacity-80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl text-center max-w-md w-full">
        <h2 className="text-4xl font-bold text-purple-700 mb-4">Thank You!</h2>
        <p className="text-gray-700 text-lg mb-6">
          Your experience has been successfully shared. 🌍✨
        </p>
        <Link
          to="/explore-spots"
          className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:opacity-90"
        >
          Explore Other Spots
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
