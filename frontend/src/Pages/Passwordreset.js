import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { APIURL } from "../env";
import "../Css/forgot.css";

const EmailVerification = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      verifyEmail(token);
    }
  }, [location]);

  const verifyEmail = async (token) => {
    try {
      const response = await fetch(`${APIURL}/verify-email?token=${token}`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      setMessage("An error occurred during verification.");
    }
  };

  return (
    <div>
      <h2>Email Verification</h2>
      <p>{message}</p>
    </div>
  );
};

export default EmailVerification;
