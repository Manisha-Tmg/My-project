import React from 'react'
import { Link } from "react-router-dom";
import "../Css/Dropdown.css";

const Dropdown = () => {
  return (
        <div className="dropdown-list">
          <Link to={"/"}>
            <li className="home">Home</li>
          </Link>
          <Link to={"/Aboutus"}>
            <li className="about">About Us</li>
          </Link>
          <Link to={"/contact"}>
            <li className="contact">Contact</li>
          </Link>
          <Link to={"/login"}>
            <li className="login">Login</li>
          </Link>
        </div>
  )
}

export default Dropdown;
