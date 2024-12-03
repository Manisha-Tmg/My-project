import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Css/Signin.css";
import { APIURL } from "../env";

const Signin = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("");
  const [tole, setTole] = useState("");
  const [ward, setWard] = useState("");
  const [location, setLocation] = useState("");
  const [Primarycontact, setPrimarycontact] = useState("");
  const [Secondarycontact, setSecondarycontact] = useState("");

  const navigate = useNavigate();

  async function handleSignup(event) {
    event.preventDefault();
    console.log(
      "button clicked",
      fullname,
      email,
      password,
      state,
      tole,
      ward,
      location,
      Primarycontact,
      Secondarycontact
    );
    try {
      const res = await fetch(`${APIURL}/api/v1/auth/register`, {
        method: "POST",
        // mode: "no-cors",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          password,
          state,
          tole,
          ward,
          location,
          Primarycontact,
          Secondarycontact,
        }),
      });
      const userData = await res.json();
      if (userData.success) {
        alert("User created sucessfully");
        navigate("/login");
      } else {
        alert(userData.message);
      }
    } catch (error) {
      console.log("errorrrr 404", error);
    }
  }
  return (
    <div className="body-signin" onSubmit={handleSignup}>
      <form className="form-sign">
        <h2 className="h-22">SIGN UP</h2>
        <div className="m-3">
          <label htmlFor="fullname" className="form-label">
            Fullname
          </label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            placeholder="Enter your full name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>
        <div className="m-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="m-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Address Section */}
        <h3 className="h-22">Address Information</h3>
        <div className="m-3">
          <label htmlFor="state" className="form-label">
            State
          </label>
          <input
            type="text"
            className="form-control"
            id="state"
            placeholder="Enter your state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div className="m-3">
          <label htmlFor="municipality" className="form-label">
            Tole
          </label>
          <input
            type="text"
            className="form-control"
            id="municipality"
            placeholder="Enter your municipality"
            value={tole}
            onChange={(e) => setTole(e.target.value)}
            required
          />
        </div>
        <div className="m-3">
          <label htmlFor="ward" className="form-label">
            Ward
          </label>
          <input
            type="text"
            className="form-control"
            id="ward"
            placeholder="Enter your ward"
            value={ward}
            onChange={(e) => setWard(e.target.value)}
            required
          />
        </div>
        <div className="m-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            placeholder="Enter your exact location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="m-3">
          <label htmlFor="contact" className="form-label">
            Primarycontact
          </label>
          <input
            type="tel"
            className="form-control"
            id="Primarycontact"
            placeholder="Enter your contact number"
            value={Primarycontact}
            onChange={(e) => setPrimarycontact(e.target.value)}
            required
          />
        </div>{" "}
        <div className="m-3">
          <label htmlFor="contact" className="form-label">
            Secondarycontact
          </label>
          <input
            type="tel"
            className="form-control"
            id="SEcondarycontact"
            placeholder="Enter your contact number"
            value={Secondarycontact}
            onChange={(e) => setSecondarycontact(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn11" onClick={handleSignup}>
          Sign In
        </button>
        <label className="account1">
          Already have an account?{" "}
          <Link to={"/Login"} className="log">
            Login
          </Link>
        </label>
      </form>
    </div>
  );
};

export default Signin;
