import React, { useState, useEffect } from "react";
import { APIURL } from "../env";
import "../Css/Mycomplain.css";
const Mycomplain = () => {
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");

  async function handleComplaints() {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const res = await fetch(`${APIURL}/complaints`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setComplaint(data); // Assuming `data` contains the complaint details
      } else {
        setError("Failed to fetch complaints. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  }

  useEffect(() => {
    handleComplaints();
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!complaint) {
    return <p>Loading...</p>;
  }

  return (
    <div className="complaints-container">
      <h2 className="complaints-header">My complaints</h2>
      <div className="complaint-details">
        <div className="complaint-row">
          <span className="complaint-label">Status:</span>
          <span className="complaint-value">{complaint.status}</span>
        </div>
        <div className="complaint-row">
          <span className="complaint-label">Grievance type:</span>
          <span className="complaint-value">{complaint.grievanceType}</span>
        </div>
        <div className="complaint-row">
          <span className="complaint-label">Province:</span>
          <span className="complaint-value">{complaint.province}</span>
        </div>
        <div className="complaint-row">
          <span className="complaint-label">Tole:</span>
          <span className="complaint-value">{complaint.tole}</span>
        </div>
        <div className="complaint-row">
          <span className="complaint-label">Ward no.:</span>
          <span className="complaint-value">{complaint.wardNo}</span>
        </div>
        <div className="complaint-row">
          <span className="complaint-label">Location:</span>
          <span className="complaint-value">{complaint.location}</span>
        </div>
        <div className="complaint-row">
          <span className="complaint-label">Description:</span>
          <span className="complaint-value">{complaint.description}</span>
        </div>
      </div>
    </div>
  );
};

export default Mycomplain;
