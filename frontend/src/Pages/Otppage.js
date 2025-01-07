import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Css/otp.css";
import { APIURL } from "../env";

const OtpVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract token and email from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get("token");
    const emailParam = params.get("email");

    if (tokenParam) {
      setToken(tokenParam);
    } else {
      // setErrorMsg("Verification token is missing. Please request a new OTP.");
    }

    if (emailParam) {
      setEmail(emailParam);
    }
  }, [location]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }

    if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const otpString = otp.join("");

    if (otpString.length !== 6 || !/^\d{6}$/.test(otpString)) {
      setErrorMsg("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const response = await fetch(`${APIURL}/api/v1/auth/verify-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: otpString,
          email,
          token, // Send the token in the body
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMsg("OTP verified successfully!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setErrorMsg(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setErrorMsg("An error occurred during verification. Please try again.");
    }
  };

  return (
    <div className="otp-verification-container">
      <form className="otp-verification-form" onSubmit={handleVerifyOtp}>
        <h2 className="otp-header">OTP Verification</h2>
        <p className="otp-instructions">
          Please enter the OTP sent to {email || "your email"}.
        </p>

        <div className="otp-input-container">
          {otp.map((_, index) => (
            <input
              key={index}
              type="text"
              className="otp-input"
              maxLength="1"
              value={otp[index]}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              disabled={!token}
            />
          ))}
        </div>

        {errorMsg && <p className="error-message">{errorMsg}</p>}
        {successMsg && <p className="success-message">{successMsg}</p>}

        <button type="submit" className="btn-verify" disabled={!token}>
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OtpVerification;
