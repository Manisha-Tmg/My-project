import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Css/Login.css";
import { APIURL } from "../env";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    try {
      setLoading(true);
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
        setLoading(false);
        setSuccess(userData.message);
        setEmail("");
        setPassword("");
        localStorage.setItem("accessToken", userData.data.accessToken);
        localStorage.setItem("token", userData.data.token);
        localStorage.setItem("role", userData.data.role);

        if (userData.data.role === "ADMIN") {
          navigate("/dashboard");
        } else if (userData.data.role === "USER") {
          navigate("/complain");
        }
      } else {
        setErr(userData.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <div className="log-body-login">
      <form className="form-login" onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="log-form-label">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            className="log-form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="log-form-label">
            Password
          </label>
          <input
            type="password"
            className="log-form-control"
            placeholder="Password"
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
        {err && <p style={{ color: "red" }}>{err}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <button className="logbutton" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <label className="account1" htmlFor="exampleCheck1">
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
