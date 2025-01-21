import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import "../Css/Complaindetails.css";
import SideBar from "../Component/Side";
import { APIURL } from "../env";
import { format } from "date-fns";

const ComplaintDetails = () => {
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { complaintId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(
          `${APIURL}/api/v1/admin/complaint/${complaintId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error(
            res.status === 404
              ? "User not found"
              : "Failed to fetch user details"
          );
        }

        const data = await res.json();
        if (data.success && data.data) {
          setComplaint(data.data);
          console.log(data);
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
  }, [complaintId, navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!complaint) return <div>No complaint found</div>;

  return (
    <div className="ComplaintDetails-container">
      <SideBar />
      <div className="complaint-details-container">
        <h3 className="complaint-details-header">
          <Link to="/complaints">
            <IoIosArrowBack
              className="back-icon"
              style={{ height: "30", width: "30" }}
            />
          </Link>
          Complaint Details
        </h3>
        <table className="detailstable">
          <tbody>
            <tr>
              <th>Grievance type</th>
              <td>{complaint.categoryName}</td>
            </tr>
            <tr>
              <th>Complaint Id</th>
              <td>{complaint.complaintId}</td>
            </tr>
            <tr>
              <th>Complaint Title</th>
              <td>{complaint.complaintTitle}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{format(new Date(complaint.createdAt), "dd/MM/yyyy")}</td>
            </tr>
            <tr>
              <th>Province</th>
              <td>{complaint.location.Province}</td>
            </tr>
            <tr>
              <th>Ward no.</th>
              <td>{complaint.location.ward}</td>
            </tr>
            <tr>
              <th>District</th>
              <td>{complaint.location.district}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{complaint.description}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{complaint.status}</td>
            </tr>
            <tr>
              <th>Attachments</th>
              <td>
                {Array.isArray(complaint.attachments) &&
                complaint.attachments.length > 0 ? (
                  complaint.attachments.map((attachment) => (
                    <a
                      key={attachment.id}
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Attachment {attachment.id}
                    </a>
                  ))
                ) : (
                  <span>No attachments</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintDetails;
