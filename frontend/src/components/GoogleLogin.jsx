import React from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User:", result.user);
      navigate("/"); // redirect to home
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <button
      onClick={signInWithGoogle}
      className="w-full bg-red-600 text-white py-2 rounded-lg mt-4"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;
