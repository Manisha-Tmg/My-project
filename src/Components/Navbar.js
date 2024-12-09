import React, { useEffect, useState } from "react";
import "../Css/Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const signUpLocation = location.pathname;

  useEffect(() => {
    const myToken = localStorage.getItem("token");
    if (myToken && signUpLocation !== "/signin") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
      if (signUpLocation !== "/signin") {
        navigate("/login"); // Redirect to login page only if not on /signin
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
    <div>
      <nav className="navbar">
        <div className="left-container">
          <div className="logo1">Samasya</div>
          <div className="logo">Sewa</div>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/complain">Home</Link>
          </li>
          <li>
            <Link to="/contact" className="contact">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/aboutus" className="about">
              About Us
            </Link>
          </li>
        </ul>
        <div className="auth-btns">
          {isLogin ? (
            <button onClick={handleLogout} className="btn1">
              Log Out
            </button>
          ) : (
            <Link to="/login">
              <button className="btn1">Log In</button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
