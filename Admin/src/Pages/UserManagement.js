import React, { useState, useEffect } from "react";
import "../Css/UserManagement.css";
import { FaRegEye } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import SideBar from "../Component/Side";
import { APIURL } from "../env";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

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
          setUsers(data.data || []); // Assuming `data.data` contains the array of users
        } else {
          setErrorMsg(data.message || "Failed to fetch user data.");
        }
      } catch (error) {
        setErrorMsg("An unexpected error occurred. Please try again later.");
      }
    }
    fetchUsers();
  }, []);

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
                      <td>{user.name || "N/A"}</td>
                      <td>{user.trackingId || "N/A"}</td>
                      <td>
                        <button className="view-button">
                          <FaRegEye />
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
            <div className="pagination">
              <button>
                <IoIosArrowBack />
              </button>
              <button>
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
