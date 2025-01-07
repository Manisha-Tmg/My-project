import React, { useState, useEffect } from "react";
import "../Css/dashboard.css";
import { APIURL } from "../env";
import SideBar from "../Component/Side";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalComplaints: 0,
    totalComplaintsPending: 0,
    totalComplaintsInProgress: 0,
    totalComplaintsResolved: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function handleDash() {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await fetch(`${APIURL}/api/v1/admin/dashboard`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log({ Authorization: `Bearer ${accessToken}` });
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const data = await res.json();
      setDashboardData(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleDash();
  }, []);

  return (
    <div className="dashboard-container">
      <SideBar />
      <div className="dashboard-content">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="card-container">
            <div className="card">
              <div className="icon">👥</div>
              <p className="text">Total Users</p>
              <p className="number">{dashboardData.totalUsers}</p>
            </div>
            <div className="card">
              <div className="icon">📝</div>
              <p className="text">Total Complaints</p>
              <p className="number">{dashboardData.totalComplaints}</p>
            </div>
            <div className="card">
              <div className="icon">⏳</div>
              <p className="text">Pending Complaints</p>
              <p className="number">{dashboardData.totalComplaintsPending}</p>
            </div>
            <div className="card">
              <div className="icon">🔄</div>
              <p className="text">In Progress</p>
              <p className="number">
                {dashboardData.totalComplaintsInProgress}
              </p>
            </div>
            <div className="card">
              <div className="icon">✅</div>
              <p className="text">Resolved</p>
              <p className="number">{dashboardData.totalComplaintsResolved}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
