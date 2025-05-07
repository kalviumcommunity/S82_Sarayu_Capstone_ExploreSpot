import React, { useState } from "react";
import EnterOTP from "./EnterOTP";
import ResetPassword from "./ResetPassword";

function OTPFlow({ email }) {
  const [otpVerified, setOtpVerified] = useState(false);

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      {!otpVerified ? (
        <EnterOTP email={email} onVerified={() => setOtpVerified(true)} />
      ) : (
        <ResetPassword email={email} />
      )}
    </div>
  );
}

export default OTPFlow;
