import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Css/Login.css";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { APIURL } from "../env";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showHide, setShowHide] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    console.log("button clicked", email, password);

    try {
      const res = await fetch(`${APIURL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const userData = await res.json();

      if (userData.success) {
        localStorage.setItem("token", userData.token);
        localStorage.getItem("email", email);
        localStorage.getItem("password", password);
        alert("Login successful");
        navigate("/");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.log("Error 404", error);
      alert("An error occurred during login. Please try again.");
    }
  }

  return (
    <div className="body-login">
      <form className="form-login" onSubmit={handleLogin}>
        <h2 className="h-2">LOG IN</h2>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="logform-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type={showHide ? "text" : "password"}
            className="logform-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="button"
          className="eyebutton"
          onClick={() => setShowHide(!showHide)}
        >
          {showHide ? <FaRegEye /> : <FaRegEyeSlash />}
        </button>

        <div className="remember-forgot">
          <Link id="forgot" to={"/forgot"}>
            Forgot Password?
          </Link>
        </div>

        <button className="logbutton" type="submit">
          Login
        </button>

        <label className="account" htmlFor="exampleCheck1">
          Don't have an account?{" "}
          <Link to={"/signin"} className="sign">
            Sign Up
          </Link>
        </label>
      </form>
    </div>
  );
};

export default Login;
