import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Css/Login.css";
// import { FaRegEye } from "react-icons/fa";
// import { FaRegEyeSlash } from "react-icons/fa";
import { APIURL } from "../env";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [showHide, setShowHide] = useState(false);
  const [sucess, SetSucess] = useState(null);
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
        SetSucess(userData.message);
        setEmail("");
        setPassword("");
        localStorage.setItem("accessToken", userData.data.accessToken);
        localStorage.setItem("token", userData.data.token);
        navigate("/dashboard");
      } else {
        setErr(userData.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <div className="body-login">
      <form className="form-login" onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
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
            // type={showHide ? "text" : "password"}
            className="logform-control"
            placeholder="Password"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* <span
            type="text"
            className="eyebutton"
            onClick={() => setShowHide(!showHide)}
          >
            {showHide ? <FaRegEye /> : <FaRegEyeSlash />}
          </span>{" "} */}
        </div>

        {err && <p style={{ color: "red" }}>{err}</p>}
        {sucess && <p style={{ color: "green" }}>{sucess}</p>}
        <button className="logbutton" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
