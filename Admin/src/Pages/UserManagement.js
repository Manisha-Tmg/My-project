import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/UserManagement.css";
import { FaRegEye } from "react-icons/fa";
import SideBar from "../Component/Side";
import { APIURL } from "../env";
import Pagination from "../Component/Pagination";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`${APIURL}/api/v1/admin/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.success) {
          setUsers(data.data || []);
        } else {
          setErrorMsg(data.message || "Failed to fetch user data.");
        }
      } catch (error) {
        setErrorMsg("An unexpected error occurred. Please try again later.");
      }
    }
    fetchUsers();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/user/${id}`);
  };

  return (
    <div className="user-management-container">
      <SideBar />
      <div className="user-management-content">
        <div className="admin-container">
          <div className="user-management-table">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            {errorMsg && <p className="error-message">{errorMsg}</p>}
            <table className="admin-user-table">
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>User</th>
                  <th>Unique Tracking ID</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.fullname || "N/A"}</td>
                      <td>{user.id || "N/A"}</td>
                      <td>
                        <button
                          className="view-button"
                          onClick={() => handleViewDetails(user.id)}
                        >
                          <FaRegEye style={{ cursor: "pointer" }} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="no-data">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
