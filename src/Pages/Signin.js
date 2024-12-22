import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Css/Signin.css";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { APIURL } from "../env";

const Signin = () => {
  const [provinceId, setProvinceId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tole, setTole] = useState("");
  const [ward, setWard] = useState("");
  const [Primarycontact, setPrimarycontact] = useState("");
  const [Secondarycontact, setSecondarycontact] = useState("");
  const [showHide, setShowHide] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleValidation = () => {
    const newErrors = {
      fullname: !fullname,
      email: !email,
      password: !password,
      provinceId: !provinceId,
      districtId: !districtId,
      tole: !tole,
      ward: !ward,
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
    provinceId,
    districtId,
    tole,
    ward,
    Primarycontact,
    Secondarycontact,
  }).some((value) => !value);

  const handleSignup = async (event) => {
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
          provinceId,
          districtId,
          tole,
          ward,
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
        setProvinceId("");
        setDistrictId("");
        setTole("");
        setWard("");
        setPrimarycontact("");
        setSecondarycontact("");

        setTimeout(() => {
          navigate("/otp");
        }, 1000);
      } else {
        alert(userData.message);
      }
    } catch (error) {
      alert("Error 404", error);
    }
  };

  useEffect(() => {
    setErrorMsg("");
  }, []);
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

            // required
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
            // required
          />
        </div>
        <div className="m-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>

          <input
            type="password"
            // type={showHide ? "text" : "password"}
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
          {/* <span
            type="text"
            className="btneye"
            onClick={() => setShowHide(!showHide)}
          >
            {showHide ? <FaRegEye /> : <FaRegEyeSlash />}
          </span> */}
        </div>
        {/* Address Section */}
        <h3 className="h-22">Address Information</h3>
        <div className="m-3">
          <label>Province ID</label>
          <input
            type="text"
            value={provinceId}
            onChange={(e) => setProvinceId(e.target.value)}
          />
        </div>
        <div>
          <label>District ID</label>
          <input
            type="text"
            value={districtId}
            onChange={(e) => setDistrictId(e.target.value)}
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
            // required
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
            // required
          />
        </div>
        {/* <div className="m-3">
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
            // required
          /> */}
        {/* </div> */}
        <div className="m-3">
          <label htmlFor="contact" className="form-label">
            Primary Contact
          </label>
          <input
            type="tel"
            className="form-control"
            id="Primarycontact"
            placeholder="Enter your contact number"
            value={Primarycontact}
            onChange={(e) => setPrimarycontact(e.target.value)}
            // required
          />
        </div>{" "}
        <div className="m-3">
          <label htmlFor="contact" className="form-label">
            Secondary Contact
          </label>
          <input
            type="tel"
            className="form-control"
            id="SEcondarycontact"
            placeholder="Enter your contact number"
            value={Secondarycontact}
            onChange={(e) => setSecondarycontact(e.target.value)}
            // required
          />
        </div>
        <button
          type="submit"
          className="btn11"
          disabled={isButtonDisabled}
          //  onClick={handleSignup}
          style={{
            backgroundColor: isButtonDisabled ? "gray" : "#e82f22",
            cursor: isButtonDisabled ? "not-allowed" : "pointer",
          }}
        >
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
