import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIURL } from "../env";

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
      const res = await fetch(`${APIURL}`, {
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
    <div>
      <h2>Chnage Password</h2>
      <form className="div-password" onSubmit={handlepassword}>
        <label type="password">Old password</label>
        <input
          value={oldpass}
          onChange={(e) => setOldpass(e.target.value)}
        ></input>
        <label type="password">New password</label>
        <input
          value={newpass}
          onChange={(e) => setNewpass(e.target.value)}
        ></input>

        <label type="password">Confirm password</label>
        <input
          value={confirmPass}
          onChange={(e) => setConfirmpass(e.target.value)}
        ></input>
      </form>
      {errr && <p style={{ color: "red" }}>{errr}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <button onClick={handlepassword}></button>
    </div>
  );
};

export default Changepassword;
