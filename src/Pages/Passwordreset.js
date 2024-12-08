import React, { useState } from "react";
import "../Scss/forgot.scss";
import { useNavigate } from "react-router-dom";

const Passwordreset = () => {
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const navigate = useNavigate();

  const handlePassword = async (event) => {
    event.preventDefault();
    if (password === confirmpassword) {
      alert("Your password was sucessfully changed");
      navigate("/login");
    } else {
      alert("Please check your password");
    }
  };
  return (
    <div className="password-reset-container" onSubmit={handlePassword}>
      <h1 className="password-reset-title">Password Reset</h1>
      <form className="password-reset-form">
        <input
          type="password"
          placeholder="New Password"
          className="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className="password-input"
          value={confirmpassword}
          onChange={(e) => setconfirmpassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="submit-button"
          onClick={handlePassword}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Passwordreset;
