import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "../components/signUp";
import ForgotPassword from "./components/ForgotPassword";


function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black transition-all duration-500">
              <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-96 text-white">
                <h2 className="text-3xl font-bold mb-6 text-center">
                  {showLogin ? "Welcome Back" : "Create Account"}
                </h2>
                {showLogin ? <Login /> : <Signup />}
                <p className="text-sm text-gray-400 mt-6 text-center">
                  {showLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    onClick={() => setShowLogin(!showLogin)}
                    className="ml-2 text-blue-400 hover:underline"
                  >
                    {showLogin ? "Sign Up" : "Login"}
                  </button>
                </p>
              </div>
            </div>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
