import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import "../Css/UserDetails.css";
import SideBar from "../Component/Side";
import { APIURL } from "../env";
import { format } from "date-fns";

const Loader = () => (
  <div className="loader">
    <p>Loading...</p>
  </div>
);

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`${APIURL}/api/v1/admin/user/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(
            res.status === 404
              ? "User not found"
              : "Failed to fetch user details"
          );
        }

        const data = await res.json();
        if (data.success && data.data) {
          setUser(data.data);
        } else {
          throw new Error(data.message || "Failed to load user data");
        }
      } catch (err) {
        setError(err.message);
        if (err.message === "User not found") {
          setTimeout(() => navigate("/users"), 3000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id, navigate]);

  if (loading) return <Loader />;
  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <Link to="/users">Go back to User Management</Link>
      </div>
    );
  }

  return (
    <div className="admin-main-contain">
      <SideBar />
      <div className="user-details-container">
        <h3 className="user-details-header">
          <Link to="/users">
            <IoIosArrowBack
              className="user-header-icon"
              style={{ color: "white", height: "30", width: "30" }}
            />
          </Link>
          <span>User Details</span>
        </h3>

        {user ? (
          <div className="user-details-card">
            <FaEdit
              className="edit-icon"
              onClick={() => navigate(`/admin/editUser/${user.id}`)}
            />
            <table className="detailstable">
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>{user.fullname}</td>
                </tr>
                <tr>
                  <th>Contact</th>
                  <td>{user.contact.primaryNumber}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>{format(new Date(user.createdAt), "dd/MM/yyyy")}</td>
                </tr>
                <tr>
                  <th>Province</th>
                  <td>{user.address.province}</td>
                </tr>
                <tr>
                  <th>Ward no.</th>
                  <td>{user.address.ward}</td>
                </tr>
                <tr>
                  <th>District</th>
                  <td>{user.address.district}</td>
                </tr>
                <tr>
                  <th>Tole</th>
                  <td>{user.address.tole}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div>No user data available</div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
