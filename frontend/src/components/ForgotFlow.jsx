
import React, { useState } from "react";
import ForgotPassword from "./ForgotPassword";
import EnterOTP from "./EnterOtp";
import ResetPassword from "./ResetPassword";

function ForgotFlow() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  return (
    <div className="p-6 bg-gray-800 text-white rounded-xl shadow-md max-w-md mx-auto">
      {step === 1 && <ForgotPassword onOtpSent={(email) => { setEmail(email); setStep(2); }} />}
      {step === 2 && <EnterOTP email={email} onVerified={() => setStep(3)} />}
      {step === 3 && <ResetPassword email={email} />}
    </div>
  );
}

export default ForgotFlow;