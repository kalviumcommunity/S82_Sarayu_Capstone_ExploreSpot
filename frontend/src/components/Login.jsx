import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", form, {
        withCredentials: true,
      });
      if (response.data.token && response.data.name) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userName", response.data.name); // Save name
        navigate("/");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const name = result.user.displayName;
      localStorage.setItem("userName", name);
      // Optional: send result.user.email to your backend to create/find user
      navigate("/");
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google login failed");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ width: "400px", padding: "30px", backgroundColor: "#f4f4f4", borderRadius: "10px", boxShadow: "0px 4px 20px rgba(0,0,0,0.3)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required style={{ padding: "12px", borderRadius: "5px", border: "1px solid #ccc" }} />
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required style={{ padding: "12px", borderRadius: "5px", border: "1px solid #ccc" }} />
          <button type="submit" style={{ padding: "12px", borderRadius: "5px", backgroundColor: "#8EC5FC", color: "white", fontWeight: "bold", cursor: "pointer", border: "none" }}>
            Login
          </button>
        </form>

        <p style={{ textAlign: "center", margin: "10px 0" }}>OR</p>
        <button onClick={handleGoogleLogin} style={{ padding: "12px", borderRadius: "5px", backgroundColor: "#4285F4", color: "white", fontWeight: "bold", cursor: "pointer", border: "none", width: "100%" }}>
          Login with Google
        </button>

        <p style={{ marginTop: "10px", textAlign: "center" }}>
          Don’t have an account?{' '}
          <span style={{ color: "#007BFF", cursor: "pointer" }} onClick={() => navigate("/signup")}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
