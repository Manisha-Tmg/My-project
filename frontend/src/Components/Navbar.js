import React, { useEffect, useState } from "react";
import "../Css/Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Trademark from "./Trademark";
import { APIURL } from "../env";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userInitial, setUserInitial] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      setIsLogin(true);

      const fetchUserProfile = async () => {
        try {
          const response = await fetch(`${APIURL}/api/v1/user/profile`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              const fullname = data.data.fullname || "";
              setUserName(fullname);
              setUserInitial(fullname[0]?.toUpperCase() || "?");
            } else {
              console.error("Failed to fetch user profile:", data.message);
            }
          } else {
            throw new Error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserProfile();
    } else if (
      !["/signin", "/verify-user", "/forgot-password"].includes(
        location.pathname
      )
    ) {
      setIsLogin(false);
      navigate("/login", { replace: true });
    }
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    const confirmCheck = window.confirm("Are you sure want to logout?");
    if (confirmCheck) {
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("fullname");
      setIsLogin(false);
      navigate("/login", { replace: true });
    }
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <Trademark />
      <div className="hamburger-menu" onClick={toggleMenu}>
        {menuOpen ? (
          <X className="cross-icon" />
        ) : (
          <Menu className="menu-icon" />
        )}
      </div>
      <ul className={`nav-links ${menuOpen ? "show-menu" : ""}`}>
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
            <Link to="/aboutus" className="about1">
              About Us
            </Link>
          ) : (
            <span className="about1">About Us</span>
          )}
        </li>
        <li>
          {isLogin ? (
            <Link to="/profile" className="about">
              View Profile
            </Link>
          ) : (
            <span className="about">View Profile</span>
          )}
        </li>{" "}
        <li>
          {isLogin ? (
            <Link to="/change-password" className="about">
              Change Password
            </Link>
          ) : (
            <span className="about"> Change Password</span>
          )}
        </li>
        <li>
          {isLogin ? (
            <Link to="/login" className="about">
              Log Out
            </Link>
          ) : (
            <span className="about"> Log Out</span>
          )}
        </li>
      </ul>
      <div className="auth-section">
        {isLogin ? (
          <div className="user-info">
            <div className="avatar" onClick={toggleDropdown}>
              <span className="user-name">{userInitial}</span>
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">
                  View Profile
                </Link>

                <Link to="/complaints" className="dropdown-item">
                  My Complain
                </Link>

                <Link to="/change-password" className="dropdown-item">
                  Change Password
                </Link>
                <span onClick={handleLogout} className="dropdown-item">
                  Log Out
                </span>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button className="btn-login">Log In</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
