import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/otp.css";
import { APIURL } from "../env";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    setErrorMsg(""); // Clear previous errors
    setSuccessMsg(""); // Clear previous success messages

    // Validate OTP: It must be 6 digits and numeric
    if (!/^\d{6}$/.test(otp)) {
      setErrorMsg("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const response = await fetch(`${APIURL}/api/v1/auth/verify-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ otp, email: "man@gmail.com" }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMsg("OTP verified successfully!");
        setTimeout(() => {
          navigate("/login"); // Redirect to the Login page if verification was successful
        }, 1000);
      } else {
        setErrorMsg(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setErrorMsg("An error occurred during verification. Please try again.");
    }
  };

  return (
    <div className="otp-verification-container">
      <form className="otp-verification-form" onSubmit={handleVerifyOtp}>
        <h2 className="otp-header">OTP Verification</h2>
        <p className="otp-instructions">
          Please enter the OTP sent to your email or phone.
        </p>

        <input
          type="text"
          className="form-control otp-input"
          placeholder="Enter OTP"
          value={otp}
          maxLength="6" // Restrict input to 6 characters
          pattern="\d*" // Allow only numeric input
          onChange={(e) => setOtp(e.target.value)}
        />

        {errorMsg && <p className="error-message">{errorMsg}</p>}
        {successMsg && <p className="success-message">{successMsg}</p>}

        <button type="submit" className="btn-verify">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OtpVerification;
