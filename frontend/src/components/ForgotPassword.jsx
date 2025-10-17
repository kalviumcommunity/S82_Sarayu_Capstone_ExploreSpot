import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api2/send-otp", { email });
      setMessage(response.data.message || "OTP has been sent to your email.");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("There was an error sending the OTP. Please try again.");
      setMessage("");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-purple-200 text-white font-sans px-4">
      <div className="bg-white/30 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-black text-center">Reset Your Password</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
<label className="text-black text-sm mb-1">Email Address</label>

            <input
              type="email"
              placeholder="Enter your registered email"
              className="w-full p-3 rounded-xl bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {message && <p className="text-green-100 text-sm">{message}</p>}
          {errorMessage && <p className="text-red-200 text-sm">{errorMessage}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-purple-500 hover:bg-purple-600 transition text-white font-semibold"
            onClick={() => {
              setTimeout(() => {
                navigate("/enter-otp");
              }, 2000);
            }}
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
