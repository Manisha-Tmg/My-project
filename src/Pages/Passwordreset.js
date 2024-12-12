import React, { useState } from "react";
import "../Scss/forgot.scss";
import { useNavigate } from "react-router-dom";
import { APIURL } from "../env";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Passwordreset = () => {
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [unHide, setUnHide] = useState(false);

  const navigate = useNavigate();

  async function handlePassword(event) {
    event.preventDefault();
    if (password === confirmpassword) {
      try {
        const response = await fetch(`${APIURL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        });
      } catch (error) {
        alert(error);
      }
    }
  }
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
          type={unHide ? "text" : "password"}
          placeholder="Confirm New Password"
          className="password-input"
          value={confirmpassword}
          onChange={(e) => setconfirmpassword(e.target.value)}
          required
        />
        <button type="text" className="btn" onClick={() => setUnHide(!unHide)}>
          {unHide ? <FaEye /> : <FaEyeSlash />}
        </button>
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
