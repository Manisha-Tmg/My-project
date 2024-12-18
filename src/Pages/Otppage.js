import React, { useState } from "react";
import "../Css/otp.css";
import { APIURL } from "../env";

const Otppage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [userName, setUserName] = useState("test12@gmail.com");

  const [Msg, setMsg] = useState("");

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 1) {
      const newotp = [...otp];
      newotp[index] = value;
      setOtp(newotp);
      // Focus on the next input if exists
      const nextInput = e.target.nextSibling;
      if (value !== "" && nextInput) {
        nextInput.focus();
      }
    }
  };

  async function handlesub(e) {
    e.preventDefault();
    const enteredOtp = otp.join(""); // Combine all OTP parts into a single string
    if (enteredOtp.length === 6) {
      try {
        const token = localStorage.getItem("accesstoken");
        const response = await fetch(`${APIURL}/api/v1/auth/verify-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ otp: enteredOtp }),
        });
        console.log("error", response);
        if (response.ok) {
          const data = await response.json();
          setMsg(`otp verified:${data.message}`);
        } else {
          const errormessage = await response.json();
          setMsg(`error occured ${errormessage.message}`);
        }
      } catch (error) {
        alert(error);
      }
    }
  }
  return (
    <div className="otp-page">
      <h2>Enter OTP</h2>
      <form onSubmit={handlesub} className="otp-form">
        <div className="otp-inputs">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(e, index)}
              onFocus={(e) => e.target.select()}
              className="otp-input"
            />
          ))}
        </div>
        <button type="submit" className="otp-submit">
          Submit
        </button>
      </form>
      {Msg && <p className="otp-message">{Msg}</p>}
    </div>
  );
};

export default Otppage;
