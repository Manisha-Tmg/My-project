import React, { useState } from "react";
import { APIURL } from "../env";
import { useLocation, useNavigate } from "react-router-dom";
import "../Css/forgot.css";
import { IoIosArrowBack } from "react-icons/io";

const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  async function handlePassword() {
    try {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");

      if (!token) {
        alert("Token is missing. Please use the correct link from your email.");
        return;
      }

      const res = await fetch(
        `${APIURL}/api/v1/auth/reset-password?token=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            token: token, // Sending token as part of the request body
            newPassword: newPassword, // New password
          }),
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Password reset successful!");
        navigate("/login");
      } else {
        alert(data.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <div className="email-verification">
      <div className="div-verification">
        <h2 className="titlle">Set a new password</h2>
        <IoIosArrowBack
          className="iconnn"
          style={{ height: "30px", width: "30px" }}
        />
        <p className="icons" style={{ marginTop: "15px" }}>
          Create a new password. Ensure it differs from previous ones for
          security
        </p>
        <input
          type="password"
          className="forgot-input"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button className="forgot-button" onClick={handlePassword}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
