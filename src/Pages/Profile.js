import React from "react";
import "../Css/Profile.css";
import { useState, useEffect } from "react";
import { APIURL } from "../env";

const Profile = () => {
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.setItem(
    "accessToken",
    userData.data.accessToken
  );
  const token = localStorage.setItem("token", userData.data.token);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`${APIURL}/api/v1/user/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer${localStorage.getItem({ token })}`,
            Authorization: `Bearer${localStorage.getItem({ accessToken })}`,
          },
        });

        // if (!response.ok) {
        //   alert(error);
        // }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data available.</div>;
  }

  return (
    <div className="profile">
      <h2>Profile</h2>
      <div className="user-detail-card">
        <p>Name: {userData.name}</p>
        <p>Contact: {userData.contact}</p>
        <p>Province: {userData.province}</p>
        <p>Tole: {userData.tole}</p>
        <p>Ward No: {userData.wardNo}</p>
        <p>Location: {userData.location}</p>
        <p>Email: {userData.email}</p>
      </div>
    </div>
  );
};

export default Profile;
