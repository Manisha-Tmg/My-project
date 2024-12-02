import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Css/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("button clicked", email, password);
    try {
      const res = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const userData = await res.json();
      if (userData.success) {
        alert("Login successful");
        navigate("/home");
      } else {
        alert(userData.message);
      }
    } catch (error) {
      console.log("Error 404", error);
    }
  };

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
            type="password"
            className="logform-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

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
