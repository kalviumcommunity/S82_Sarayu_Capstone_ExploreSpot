import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md text-white">
        <h2 className="text-center text-3xl font-bold mb-6">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            className="w-full p-2 bg-gray-800 rounded"
            placeholder="Email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            className="w-full p-2 bg-gray-800 rounded"
            placeholder="Password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <input
            type="password"
            className="w-full p-2 bg-gray-800 rounded"
            placeholder="Confirm Password"
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />

          {error && <p className="text-red-400">{error}</p>}

          <button className="w-full bg-green-600 py-2 rounded-lg font-bold">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
