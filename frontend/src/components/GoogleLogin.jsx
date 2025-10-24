import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const GoogleLogin = () => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User Info:", result.user);
      alert(`Welcome ${result.user.displayName}`);
    } catch (error) {
      console.error("Error during Google login:", error);
      alert("Google login failed. Try again!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Sign in with Google</h2>
      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          borderRadius: "5px",
          backgroundColor: "#4285F4",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
          border: "none",
        }}
      >
        Login with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
