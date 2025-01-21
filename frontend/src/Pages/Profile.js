import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/Profile.css";
import { APIURL } from "../env";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("No token found. Please log in.");
        navigate("/login");
        return;
      }

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
            setUserData(data.data);
          } else {
            alert("Failed to fetch user profile: " + data.message);
          }
        } else {
          throw new Error("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("An error occurred while fetching user data.");
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (!userData) {
    return <div>No user data available.</div>;
  }

  return (
    <div className="profile-page">
      <header className="profile-header">
        {" "}
        <button className="back-button" onClick={() => window.history.back()}>
          ←
        </button>
        <h2>Profile</h2>
      </header>
      <div className="user-detail-card">
        <div className="profile-field">
          <label>Full Name:</label>
          <input
            className="inputt"
            value={userData.fullname || "N/A"}
            readOnly
          />
        </div>

        <div className="profile-field">
          <label>Email:</label>
          <input className="inputt" value={userData.email || "N/A"} readOnly />
        </div>

        <div className="profile-field">
          <label>Address:</label>
          <input
            className="inputt"
            value={userData.address || "N/A"}
            readOnly
          />
        </div>

        <div className="profile-field">
          <label>Contact:</label>
          <input
            className="inputt"
            value={userData.contactNo || "N/A"}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
