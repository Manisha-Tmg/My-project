import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIURL } from "../env";
import "../Css/Changepass.css";
import Input from "../Components/Input";

const Changepassword = () => {
  const [oldPassword, setOldpass] = useState("");
  const [newPassword, setNewpass] = useState("");
  const [confirmNewPassword, setConfirmpass] = useState("");
  const [errr, setErr] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  async function handlepassword(e) {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    setErr(null);
    setSuccess(null);

    // Validate if the passwords match
    if (newPassword !== confirmNewPassword) {
      setErr("Passwords do not match");
      return;
    }

    // Check if all required fields are filled
    if (!oldPassword || !newPassword) {
      setErr("Old password and new password are required");
      return;
    }

    // Log values to ensure they are populated
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);

    const password = { oldPassword, newPassword, confirmNewPassword };
    try {
      const res = await fetch(`${APIURL}/api/v1/user/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword,
        }),
      });
      const data = await res.json();

      // Check if the response is successful
      if (res.ok && data.success) {
        setSuccess("Password changed successfully!");
        setTimeout(() => navigate("/login"), 3000); // Navigate to login page after 3 seconds
      } else {
        // Handle error message from API
        if (data.errors && data.errors.length > 0) {
          setErr(data.errors.join(", "));
        } else {
          setErr(data.message || "Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      setErr("An error occurred. Please try again.");
    }
  }

  return (
    <form className="form-password" onSubmit={handlepassword}>
      <h2>Change Password</h2>
      <div>Old password :</div>
      <input
        type="password"
        className="input-pass"
        value={oldPassword}
        onChange={(e) => setOldpass(e.target.value)}
      />
      <label className="label-pass">New password</label>
      <input
        type="password"
        className="input-pass"
        value={newPassword}
        onChange={(e) => setNewpass(e.target.value)}
      />
      <label className="label-pass">Confirm password</label>
      <input
        type="password"
        className="input-pass"
        value={confirmNewPassword}
        onChange={(e) => setConfirmpass(e.target.value)}
      />
      {errr && <p style={{ color: "red" }}>{errr}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <button type="submit" className="btnn">
        Submit
      </button>
    </form>
  );
};

export default Changepassword;
