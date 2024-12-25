import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Css/Signin.css";
import { APIURL } from "../env";

const Signin = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("");
  const [tole, setTole] = useState("");
  const [addresses, setaddresses] = useState("");
  const [ward, setWard] = useState("");
  const [location, setLocation] = useState("");
  const [Primarycontact, setPrimarycontact] = useState("");
  const [Secondarycontact, setSecondarycontact] = useState("");
  const [provinces, setProvinces] = useState([]); // To store province data
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Fetch province data
  async function getAllProvince() {
    try {
      const res = await fetch(`${APIURL}/api/v1/provinces`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        setProvinces(data.data);
      } else {
        console.error("Failed to fetch provinces", data.message);
      }
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  }

  // Call the function to fetch provinces on component mount
  useEffect(() => {
    getAllProvince();
  }, []);

  const handleValidation = () => {
    const newErrors = {
      fullname: !fullname,
      email: !email,
      password: !password,
      state: !state,
      tole: !tole,
      ward: !ward,
      location: !location,
      Primarycontact: !Primarycontact || Primarycontact <= 0,
      Secondarycontact: !Secondarycontact || Secondarycontact <= 0,
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const isButtonDisabled = Object.values({
    fullname,
    email,
    password,
    addresses,
    Primarycontact,
    Secondarycontact,
  }).some((value) => !value);

  async function handleSignup(event) {
    event.preventDefault();
    if (Primarycontact < 0) {
      alert("Numbers cannot be negative");
    }
    if (!handleValidation()) {
      return;
    }

    try {
      const res = await fetch(`${APIURL}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          password,
          addresses,
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
        alert("User created successfully");
        setFullname("");
        setEmail("");
        setPassword("");
        setaddresses("");
        setState("");
        setTole("");
        setWard("");
        setLocation("");
        setPrimarycontact("");
        setSecondarycontact("");

        setTimeout(() => {
          navigate("/otp");
        }, 1000);
      } else {
        alert(userData.message);
      }
    } catch (error) {
      alert("Error: 404", error);
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
          />
        </div>
        <h3 className="h-22">Address Information</h3>
        <div className="m-3">
          <label htmlFor="state" className="form-label">
            Province
          </label>
          <select
            className="form-control"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">Select Province</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.name}>
                {province.name}
              </option>
            ))}
          </select>
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
          />
        </div>
        <button
          type="submit"
          className="btn11"
          disabled={isButtonDisabled}
          style={{
            backgroundColor: isButtonDisabled ? "gray" : "#e82f22",
            cursor: isButtonDisabled ? "not-allowed" : "pointer",
          }}
        >
          Sign Up
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
