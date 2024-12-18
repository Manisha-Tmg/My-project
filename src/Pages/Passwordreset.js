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
            Accept: "application/json",
          },
          body: JSON.stringify({ password }),
        });
        if (response.ok) {
          const data = await response.json();
          alert(`password changesd succesfully, ${password}`);
          navigate("/login");
        }
      } catch (error) {
        alert(error);
      }
    }
  }
  return (
    <form className="password-reset-container" onSubmit={handlePassword}>
      <h1 className="password-reset-title">Password Reset</h1>
      <label>New Password</label>
      <input
        type={unHide ? "text" : "password"}
        // placeholder="New Password"
        className="password-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label>Confirm Password</label>

      <input
        type="password"
        // type={unHide ? "text" : "password"}
        // placeholder="Confirm  Password"
        className="password-input"
        value={confirmpassword}
        onChange={(e) => setconfirmpassword(e.target.value)}
        required
      />
      {/* <span type="text" className="btn" onClick={() => setUnHide(!unHide)}>
        {unHide ? <FaEye /> : <FaEyeSlash />}
      </span> */}
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default Passwordreset;
