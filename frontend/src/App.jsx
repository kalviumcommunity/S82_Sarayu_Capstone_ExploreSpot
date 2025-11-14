import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import SignupPage from "./components/Register";
import LoginPage from "./components/Login";
import EnterOTP from "./components/EnterOTP";
import ResetPassword from "./components/ResetPassword";
import HomePage from "./components/HomePage";
import ShareExperience from "./components/ShareExperience";
import Thankyou from "./pages/Thankyou";
import PromoteBusiness from "./components/PromoteBusiness";
import ExploreSpot from "./components/ExploreSpot";
import GoogleLogin from "./components/GoogleLogin";
import "./firebase"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/enter-otp" element={<EnterOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/share" element={<ShareExperience />} />
        <Route path="/thank-you" element={<Thankyou />} />
        <Route path="/promote" element={<PromoteBusiness />} />
        <Route path="/explore" element={<ExploreSpot />} />

        <Route path="/google-login" element={<GoogleLogin />} /> {/* Google login route */}
      </Routes>
    </Router>
  );
}

export default App;
