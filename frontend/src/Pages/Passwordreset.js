import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { APIURL } from "../env";
import "../Css/forgot.css";

const EmailVerification = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const verifyEmail = async () => {
    try {
      const response = await fetch(`${APIURL}/api/v1/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        navigate("/login");
        setMessage("Link send to your email");
      } else {
        setMessage("error verifing email");
      }
    } catch (error) {}
  };

  return (
    <div className="email-verification">
      <header className="profile-header1">
        <Link to={"/login"}>
          <button className="back-button" onClick={() => window.history.back()}>
            ←
          </button>
        </Link>
        <h2> Password Reset</h2>
      </header>{" "}
      <div className="div-verification">
        <p style={{ marginTop: "15px" }}>
          Please enter your email to reset the password
        </p>
        <input
          className="forgot-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <p>{message}</p>
        <button className="forgot-button" onClick={verifyEmail}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;
