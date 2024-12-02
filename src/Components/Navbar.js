import React from "react";
import "../Css/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="left-container">
          <div className="logo1">Samasya</div>
          <div className="logo">Sewa</div>
        </div>
        <ul className="nav-links">
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"/contact"}>
            <li className="contact">Contact</li>
          </Link>
          <Link to={"/Aboutus"}>
            <li className="about">About Us</li>
          </Link>{" "}
        </ul>
        <div className="auth-btns">
          <Link to={"/login"}>
            <button className="btn1">Log In</button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
