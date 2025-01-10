import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Css/Dropdown.css";

const Dropdown = () => {
  const [isLogin, setIsLogin] = useState(false);
  const location = useLocation();

  const signUpLocation = location.pathname;
  const otpLocation = location.pathname;
  const forgotLocation = location.pathname;

  const navigate = useNavigate();

  useEffect(() => {
    const myToken = localStorage.getItem("token");
    if (
      myToken &&
      signUpLocation !== "/signin" &&
      forgotLocation !== "/forgot"
    ) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
      if (
        signUpLocation !== "/signin" &&
        otpLocation !== "/otp" &&
        forgotLocation !== "/forgot"
      ) {
        navigate("/login"); // Redirect to login page only if not on /signin page/forgetpass
      }
    }
  }, [navigate, signUpLocation]);

  const handleLogout = () => {
    const confirmCheck = window.confirm("Are you sure want to logout?");
    if (confirmCheck) {
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      setIsLogin(false);
      navigate("/login");
    }
  };

  return (
    <div className="dropdown-list">
      {isLogin ? (
        <Link to={"/"}>
          <li className="drop-home">Home</li>
        </Link>
      ) : (
        <span>
          <li className="drop-home">Home</li>
        </span>
      )}
      {isLogin ? (
        <Link to={"/Aboutus"}>
          <li className="drop-about">About Us</li>
        </Link>
      ) : (
        <span>
          <li className="drop-about">About Us</li>
        </span>
      )}
      {isLogin ? (
        <Link to={"/contact"}>
          <li className="drop-contact">Contact</li>
        </Link>
      ) : (
        <span>
          <li className="drop-contact">Contact</li>
        </span>
      )}

      {isLogin ? (
        <Link
          onClick={handleLogout}
          className="log"
          style={{ textDecoration: "none" }}
        >
          Log Out
        </Link>
      ) : (
        <Link to="/login">
          <li className="log" style={{ textDecoration: "none" }}>
            Log In
          </li>
        </Link>
      )}
    </div>
  );
};

export default Dropdown;
