import React, { useEffect, useState } from "react";
import "../Css/Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import Menu and X icons
import Dropdown from "./Dropdown";
import Trademark from "./Trademark";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const signUpLocation = location.pathname;
  const otpLocation = location.pathname;
  const forgotLocation = location.pathname;

  useEffect(() => {
    const myToken = localStorage.getItem("token");
    if (
      myToken &&
      signUpLocation !== "/signin" &&
      otpLocation !== "/verify-user" &&
      forgotLocation !== "/forgot-password"
    ) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
      if (
        signUpLocation !== "/signin" &&
        otpLocation !== "/verify-user" &&
        forgotLocation !== "/forgot-password"
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

  // For Hamburger menu
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen); // Toggle menu state
  };

  return (
    <div>
      <nav className="navbar">
        <Trademark />
        <ul className="nav-links">
          <li>
            {isLogin ? (
              <Link to="/complain">Home</Link>
            ) : (
              <span
                to="/complain"
                // style={{ cursor: "not-allowed" }}
              >
                Home
              </span>
            )}
          </li>
          <li>
            {" "}
            {isLogin ? (
              <Link to="/contact" className="contact">
                Contact
              </Link>
            ) : (
              <span
                to="/contact"
                className="contact"
                // style={{ cursor: "not-allowed" }}
              >
                Contact
              </span>
            )}
          </li>
          <li>
            {isLogin ? (
              <Link to="/aboutus" className="about">
                About Us
              </Link>
            ) : (
              <span to="/aboutus" className="about">
                About Us
              </span>
            )}
          </li>{" "}
          <li>
            {isLogin ? (
              <Link to="/profile" className="profile">
                Profile
              </Link>
            ) : (
              <span>
                <Link to="/profile" className="profile">
                  Profile
                </Link>
              </span>
            )}
          </li>
          <li>
            {isLogin ? (
              <Link to="/reset-password" className="passwordchange">
                Changepassword
              </Link>
            ) : (
              <span>
                <Link to="/reset-password" className="passwordchange">
                  Changepassword
                </Link>
              </span>
            )}
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

        {/* Hamburger Menu and Dropdown */}
        <div className="hamburger-menu" onClick={handleMenuClick}>
          {menuOpen ? (
            <X className="cross-icon" />
          ) : (
            <Menu className="menu-icon" />
          )}
          {menuOpen && <Dropdown className="dropdown-menu" />}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
