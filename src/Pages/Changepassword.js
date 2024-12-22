import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIURL } from "../env";
import "../Css/Changepass.css";

const Changepassword = () => {
  const [oldpass, setOldpass] = useState("");
  const [newpass, setNewpass] = useState("");
  const [confirmPass, setConfirmpass] = useState("");
  const [errr, setErr] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  async function handlepassword(e) {
    e.preventDefault();

    setErr(null);
    setSuccess(null);

    if (newpass !== confirmPass) {
      alert("password don not match");
    }

    const password = { oldpass, newpass };
    try {
      const res = await fetch(`${APIURL}/api/v1//user/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(password),
      });
      if (res.ok) {
        const data = await res.json();
        setTimeout(() => navigate("/login"), 3000); //navigate to login page after 3sec
      }
    } catch (error) {
      alert(error);
    }
  }
  return (
    <form className="form-password" onSubmit={handlepassword}>
      <h2>Change Password</h2>
      <label className="label-pass" type="password">
        Old password
      </label>
      <input
        className="input-pass"
        value={oldpass}
        onChange={(e) => setOldpass(e.target.value)}
      ></input>
      <label className="label-pass" type="password">
        New password
      </label>
      <input
        className="input-pass"
        value={newpass}
        onChange={(e) => setNewpass(e.target.value)}
      ></input>
      <label className="label-pass" type="password">
        Confirm password
      </label>
      <input
        className="input-pass"
        value={confirmPass}
        onChange={(e) => setConfirmpass(e.target.value)}
      ></input>
      {errr && <p style={{ color: "red" }}>{errr}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <button onClick={handlepassword}>Next</button>{" "}
    </form>
  );
};

export default Changepassword;
