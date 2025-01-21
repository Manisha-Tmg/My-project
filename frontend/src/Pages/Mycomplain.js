import React, { useState, useEffect } from "react";
import { APIURL } from "../env";
import "../Css/Mycomplain.css";

const Mycomplain = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");

  async function handleComplaints() {
    try {
      const token = localStorage.getItem("accessToken");

      const res = await fetch(`${APIURL}/api/v1/complaints`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const result = await res.json();
        console.log("API Response:", result.data);
        setComplaints(result.data);
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

  if (!complaints) {
    return <p>Loading...</p>;
  }

  return (
    <div className="complaints-container">
      <h2 className="complaints-header">My Complaints</h2>
      {complaints.map((complaint) => (
        <div key={complaint.complaintId} className="complaint-details">
          <div className="complaint-row">
            <span className="complaint-label">Complaint ID:</span>
            <span className="complaint-value">{complaint.complaintId}</span>
          </div>
          <div className="complaint-row">
            <span className="complaint-label">Complaint Title:</span>
            <span className="complaint-value">{complaint.complaintTitle}</span>
          </div>
          <div className="complaint-row">
            <span className="complaint-label">Grievance Type:</span>
            <span className="complaint-value">{complaint.categoryName}</span>
          </div>
          <div className="complaint-row">
            <span className="complaint-label">Location:</span>
            <span className="complaint-value">{complaint.location}</span>
          </div>
          <div className="complaint-row">
            <span className="complaint-label">Full Name:</span>
            <span className="complaint-value">{complaint.fullname}</span>
          </div>
          <div className="complaint-row">
            <span className="complaint-label">Status:</span>
            <span className="complaint-value">{complaint.status}</span>
          </div>
          <div className="complaint-row">
            <span className="complaint-label">Date:</span>
            <span className="complaint-value">
              {new Date(complaint.createdAt).toLocaleString()}
            </span>
          </div>
          <div className="complaint-row">
            <span className="complaint-label">Attachments:</span>
            <span className="complaint-value">
              {Array.isArray(complaint.attachments) &&
              complaint.attachments.length > 0 ? (
                complaint.attachments.map((attachment) => (
                  <a
                    className="complaint-value"
                    key={attachment.id}
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Attachment {attachment.id}
                  </a>
                ))
              ) : (
                <span className="complaint-value">No attachments</span>
              )}{" "}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Mycomplain;
