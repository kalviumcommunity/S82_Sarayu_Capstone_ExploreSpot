import React, { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import EnterOTP from "../EnterOtp";
import ResetPassword from "./ResetPassword";

function ForgotFlow() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 px-4 py-12">
      <div className="bg-white/30 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md">
        {step === 1 && (
          <ForgotPassword
            onOtpSent={(email) => {
              setEmail(email);
              setStep(2);
            }}
          />

          
        )}
        {step === 2 && <EnterOTP email={email} onVerified={() => setStep(3)} />}
        {step === 3 && <ResetPassword email={email} />}
      </div>
    </div>
  );
}

export default ForgotFlow;
