import React, { useState, useEffect } from "react";
import "../Css/Profile.css";
import { APIURL } from "../env";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("No token found. Please log in.");
        window.location.href = "/login";
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
        console.log({ Authorization: `Bearer ${token}` });

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Data:", data);
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
        <p className="p-p">
          <label className="labell" htmlFor="inputt">
            Full Name:
          </label>
          <strong
            className="inputt"
            value={userData.fullname || "N/A"}
            readOnly
          />
        </p>
        <p className="p">
          <label className="labell" htmlFor="inputt">
            Email:
          </label>
          <strong className="inputt" value={userData.email || "N/A"} readOnly />
        </p>

        <p className="p-p">
          <label className="labell" htmlFor="inputt">
            Address:
          </label>
          <strong
            className="inputt"
            value={userData.address || "N/A"}
            readOnly
          />
        </p>
        <p className="p-p">
          <label className="labell" htmlFor="inputt">
            Contact:
          </label>
          <strong
            className="inputt"
            value={userData.contactNo || "N/A"}
            readOnly
          />
        </p>
      </div>
    </div>
  );
};

export default Profile;
