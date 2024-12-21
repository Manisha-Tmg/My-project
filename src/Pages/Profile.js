import React, { useState, useEffect } from "react";
import "../Css/Profile.css";
import { APIURL } from "../env";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("No token found. Please log in.");
        window.location.href = "/login"; // Redirect to login
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

        if (!response.ok) {
          if (response.status === 401) {
            alert("Unauthorized. Please log in again.");
            localStorage.removeItem("token");
            window.location.href = "/login"; // Redirect to login
            return;
          }
          throw new Error("Failed to fetch user data.");
        }

        const data = await response.json();
        setUserData(data.user || data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("An error occurred while fetching user data.");
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (!userData) {
    return <div>No user data available.</div>;
  }

  return (
    <div className="profile">
      <h2>Profile</h2>
      <div className="user-detail-card">
        <p>Name: {userData.name || "N/A"}</p>
        <p>Contact: {userData.contact || "N/A"}</p>
        <p>Province: {userData.province || "N/A"}</p>
        <p>Tole: {userData.tole || "N/A"}</p>
        <p>Ward No: {userData.wardNo || "N/A"}</p>
        <p>Location: {userData.location || "N/A"}</p>
        <p>Email: {userData.email || "N/A"}</p>
      </div>
    </div>
  );
};

export default Profile;
