import React, { useState } from "react";

const Otppage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [Msg, setMsg] = useState("");

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 1) {
      const newotp = [...otp];
      newotp[index] = value;
      setOtp(newotp);
      if (value !== "" && e.target.nextSibling) {
        e.target.nextSibling.onFocus();
      }
    }
  };

  const handlesub = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join(""); //to join all otp
    if (enteredOtp.length === 6) {
      setMsg(`otp sunmitted :${enteredOtp}`);
    } else {
      setMsg("try again");
    }
  };
  return (
    <div className="otp-page">
      <h2>Enter OTP</h2>
      <form onSubmit={handlesub} className="otp-form">
        <div className="otp-inputs">
          {otp.map((value, index) => (
            <input
              type="numbers"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(e.target, index)}
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
