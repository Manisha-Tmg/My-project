import React from "react";
import { Link } from "react-router-dom";
import "../Css/Sidebar.css";
import Trademark from "./Trademark";
import { IoIosLogOut } from "react-icons/io";

const SideBar = () => {
  return (
    <div>
      <nav className="admin-sidebar">
        <Trademark />
        <p className="admin-menuu">Menu</p>
        <ul className="menu-list">
          <li className="menu-item">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="menu-item">
            <Link to="/users">User Management</Link>
          </li>
          <li className="menu-item">
            <Link to="/complaints">Complaint Management</Link>
          </li>
        </ul>
        <Link to={"/Login"}>
          <button className="admin-logout-button">
            Logout <IoIosLogOut className="admin-logout-icon" />{" "}
          </button>
        </Link>
        {/* <LogoutButton className="logout-button"></LogoutButton>/admin/Login */}
      </nav>
    </div>
  );
};

export default SideBar;
