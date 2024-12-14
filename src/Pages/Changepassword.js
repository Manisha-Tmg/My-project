import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Changepassword = () => {
  const [oldpass, setOldpass] = useState();
  const [newpass, setNewpass] = useState();
  const [confirmPass, setConfirmpass] = useState();
  const navigate = useNavigate();
  return (
    <div>
      <h2>Chnage Password</h2>
      <div className="div-password">
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
      </div>
      <button onClick={handlepassword}></button>
    </div>
  );
};

export default Changepassword;
