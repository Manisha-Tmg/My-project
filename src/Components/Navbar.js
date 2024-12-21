import React, { useEffect, useState } from "react";
import "../Css/Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import Menu and X icons
import Dropdown from "./Dropdown";
import Trademark from "./Trademark";
import { APIURL } from "../env";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState(""); // To store the user's name
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
      otpLocation !== "/otp" &&
      forgotLocation !== "/forgot"
    ) {
      setIsLogin(true);

      // Fetch user data
      async function fetchUserData() {
        try {
          const response = await fetch(`${APIURL}/api/v1/user/profile`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${myToken}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUserName(data.user?.name || data.name || "User"); // Adjust based on API structure
          } else if (response.status === 401) {
            localStorage.removeItem("token");
            setIsLogin(false);
            navigate("/login");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }

      fetchUserData();
    } else {
      setIsLogin(false);
      if (
        signUpLocation !== "/signin" &&
        otpLocation !== "/otp" &&
        forgotLocation !== "/forgot"
      ) {
        navigate("/login"); // Redirect to login page only if not on specific pages
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
            {isLogin ? <Link to="/complain">Home</Link> : <span>Home</span>}
          </li>
          <li>
            {isLogin ? (
              <Link to="/contact" className="contact">
                Contact
              </Link>
            ) : (
              <span className="contact">Contact</span>
            )}
          </li>
          <li>
            {isLogin ? (
              <Link to="/aboutus" className="about">
                About Us
              </Link>
            ) : (
              <span className="about">About Us</span>
            )}
          </li>
          <li>
            {isLogin ? (
              <Link to="/profile" className="profile">
                Profile
              </Link>
            ) : (
              <span className="profile">Profile</span>
            )}
          </li>
        </ul>
        <div className="auth-btns">
          {isLogin ? (
            <div className="user-avatar-container">
              {/* Avatar Style */}
              <div className="user-avatar">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="user-name">{userName}!</span>
              <button onClick={handleLogout} className="btn1">
                Log Out
              </button>
            </div>
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
