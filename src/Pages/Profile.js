import React from "react";
import "../Css/Profile.css";

const Profile = ({ user }) => {
  const sampleUser = {
    name: "Mansa",
    contact: 9813245634,
    province: "Bagmati",
    tole: 5,
    wardNo: 8,
    location: "Naxal",
    email: "mansa@gmail.com",
  };
  const userData = user || sampleUser;

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
