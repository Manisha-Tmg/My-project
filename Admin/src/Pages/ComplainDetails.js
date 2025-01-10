import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import "../Css/Complaindetails.css";
import SideBar from "../Component/Side";
import { APIURL } from "../env";

const ComplaintDetails = () => {
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    fetchComplaintDetails();
  }, [id]);

  async function fetchComplaintDetails() {
    try {
      const params = new URLSearchParams(location.search);
      const id = params.get("id");
      const res = await fetch(`${APIURL}/api/v1/admin/complaints/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();
      setComplaint(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!complaint) return <div>No complaint found</div>;

  return (
    <div className="ComplaintDetails-container">
      <SideBar />
      <div className="complaint-details-container">
        <h3 className="complaint-details-header">
          <Link to="/complaints">
            <IoIosArrowBack className="back-icon" />
          </Link>
          Complaint Details
        </h3>
        <FaEdit className="complain-edit-icon" />
        <table className="detailstable">
          <tbody>
            <tr>
              <th>Grievance type</th>
              <td>{complaint.grievanceType}</td>
            </tr>
            <tr>
              <th>Province</th>
              <td>{complaint.province}</td>
            </tr>
            <tr>
              <th>Tole</th>
              <td>{complaint.tole}</td>
            </tr>
            <tr>
              <th>Ward no.</th>
              <td>{complaint.wardNo}</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>{complaint.location}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{complaint.description}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{complaint.status}</td>
            </tr>
            {complaint.image && (
              <tr>
                <th>Image</th>
                <td>
                  <img
                    src={complaint.image}
                    alt="Complaint evidence"
                    className="complaint-image"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintDetails;
