import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { APIURL } from "../env";

const Changepassword = () => {
  const [oldpass, setOldpass] = useState("");
  const [newpass, setNewpass] = useState("");
  const [confirmPass, setConfirmpass] = useState("");
  const navigate = useNavigate();

  async function handlepassword(e) {
    e.preventDefault();

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
        navigate("/login");
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
      <button onClick={handlepassword}></button>
    </div>
  );
};

export default Changepassword;
