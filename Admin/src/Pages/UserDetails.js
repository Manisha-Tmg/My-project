import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import "../Css/UserDetails.css";
import SideBar from "../Component/Side";
import { APIURL } from "../env";
import { format } from "date-fns";
import DetailRow from "../Component/DetailRow";

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
            <IoIosArrowBack className="user-header-icon" />
          </Link>
          <span>User Details</span>
        </h3>

        {user ? (
          <div className="user-details-card">
            <FaEdit
              className="edit-icon"
              onClick={() => navigate(`/admin/editUser/${user.id}`)}
            />
            <DetailRow label="Name" value={user.fullname} />
            <DetailRow
              label="Contact Number"
              value={user.contact.primaryNumber}
            />
            <DetailRow
              label="Secondary Contact"
              value={user.contact.secondaryNumber}
            />
            <DetailRow label="Email" value={user.email} />
            <DetailRow label="Province" value={user.address.province} />
            <DetailRow label="District" value={user.address.district} />
            <DetailRow label="Tole" value={user.address.tole} />
            <DetailRow label="Ward no." value={user.address.ward} />
            <DetailRow
              label="Date"
              value={format(new Date(user.createdAt), "dd/MM/yyyy")}
            />
          </div>
        ) : (
          <div>No user data available</div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
