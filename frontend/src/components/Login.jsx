import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // redirect after login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label>Email</label>
            <input
              type="email"
              className="w-full p-2 bg-gray-800 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              className="w-full p-2 bg-gray-800 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button className="w-full bg-blue-600 py-2 rounded-lg font-bold">
            Login
          </button>
        </form>

        <GoogleLogin />

        <p className="text-center mt-4 text-gray-400">
          Forgot password?{" "}
          <Link to="/forgot-password" className="text-blue-400">
            Reset
          </Link>
        </p>

        <p className="text-center mt-4 text-gray-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-400">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
