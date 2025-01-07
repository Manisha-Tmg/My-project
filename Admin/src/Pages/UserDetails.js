import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import "../Css/UserDetails.css";
import SideBar from "../Component/Side";
import { APIURL } from "../env";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${APIURL}/api/v1/admin/user/${id}`, {
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
        setUser(data.data);
      } catch (err) {
        setError(err.message);
        if (err.message === "User not found") {
          setTimeout(() => navigate("/admin/UserManagement"), 3000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user data available</div>;

  return (
    <div className="admin-main-contain">
      <SideBar />
      <div className="user-details-container">
        <h3 className="user-details-header">
          <Link to="/admin/UserManagement">
            <IoIosArrowBack className="user-header-icon" />
          </Link>
          <span>User Details</span>
        </h3>

        <div className="user-details-card">
          <FaEdit className="edit-icon" />
          <div className="user-detail-row">
            <span className="detail-label">Name</span>
            <span className="detail-value">{user.name}</span>
          </div>
          <div className="user-detail-row">
            <span className="detail-label">Contact Number</span>
            <span className="detail-value">{user.contact}</span>
          </div>
          <div className="user-detail-row">
            <span className="detail-label">Email</span>
            <span className="detail-value">{user.email}</span>
          </div>
          <div className="user-detail-row">
            <span className="detail-label">Province</span>
            <span className="detail-value">{user.province}</span>
          </div>
          <div className="user-detail-row">
            <span className="detail-label">District</span>
            <span className="detail-value">{user.district}</span>
          </div>
          <div className="user-detail-row">
            <span className="detail-label">Tole</span>
            <span className="detail-value">{user.tole}</span>
          </div>
          <div className="user-detail-row">
            <span className="detail-label">Ward no.</span>
            <span className="detail-value">{user.wardNo}</span>
          </div>
          <div className="user-detail-row">
            <span className="detail-label">Date</span>
            <span className="detail-value">
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
