import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API request to login endpoint
      const response = await axios.post( "http://localhost:5000/api/login", {
        email,
        password,
      });
      
      // Handle successful login
      console.log(response.data);
      localStorage.setItem("authToken", response.data.token); // Example: store token in localStorage
      window.location.href = "/dashboard"; // Redirect to dashboard or home
    } catch (error) {
      // Handle errors
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      
      <div>
        <label className="block text-sm">Email</label>
        <input
          type="email"
          className="w-full mt-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm">Password</label>
        <input
          type="password"
          className="w-full mt-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <div className="text-right mt-1">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-400 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full bg-black hover:bg-gray-900 transition-all p-2 rounded text-white font-semibold"
      >
        Login
      </button>
    </form>
  );
}

export default Login;