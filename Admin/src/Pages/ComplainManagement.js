import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import "../Css/Complainmanagement.css";
import { APIURL } from "../env";
import SideBar from "../Component/Side";

const ComplaintManagement = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [filters, setFilters] = useState({ status: "", category: "" });
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchComplaints = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Authentication required");
      }

      const res = await fetch(`${APIURL}/api/v1/admin/complaints`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await res.json();

      if (!responseData.success) {
        throw new Error(responseData.message || "Failed to fetch complaints");
      }

      setComplaints(responseData.data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching complaints:", err);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  useEffect(() => {
    let filtered = complaints;

    if (search.trim()) {
      filtered = filtered.filter(
        (complaint) =>
          complaint.complaintTitle
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          complaint.categoryName.toLowerCase().includes(search.toLowerCase()) ||
          complaint.fullname.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter(
        (complaint) => complaint.status === filters.status
      );
    }
    if (filters.category) {
      filtered = filtered.filter(
        (complaint) => complaint.categoryName === filters.category
      );
    }

    setFilteredComplaints(filtered);
  }, [search, filters, complaints]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setPage(1);
  };

  const updateComplaintStatus = async (complaintId, newStatus) => {
    if (!complaintId) {
      console.error("Invalid complaint ID:", complaintId);
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Authentication required");
      }

      const res = await fetch(
        `${APIURL}/api/v1/admin/complaint/${complaintId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const responseData = await res.json();
      console.log(responseData);
      if (!responseData.success) {
        throw new Error(responseData.message || "Failed to update status");
      }

      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint.complaintId === complaintId
            ? { ...complaint, status: newStatus }
            : complaint
        )
      );

      alert(responseData.message || "Status updated successfully");
    } catch (err) {
      console.error("Error updating complaint status:", err);
      alert(err.message || "Failed to update status");
    }
  };
  const handleViewDetails = (complaintId) => {
    navigate(`/complaint/${complaintId}`);
  };

  if (loading) {
    return (
      <div className="complain-container">
        <SideBar />
        <div className="complaint-table-container">
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="complain-container">
        <SideBar />
        <div className="complaint-table-container">
          <div className="error-message">
            {error}
            <button onClick={fetchComplaints} className="retry-button">
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="complain-container">
      <SideBar />
      <div className="complaint-table-container">
        <div className="admin-container">
          <div className="table-header">
            <div className="complain-search-container">
              <input
                type="text"
                placeholder="Search..."
                className="complain-search-input"
                value={search}
                onChange={handleSearch}
              />
            </div>
            <div className="filter-buttonStatus">
              {" "}
              <CiFilter style={{ width: "30", height: "30" }} />
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="">Filter</option>
                <option value="PENDING">PENDING</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="RESOLVED">RESOLVED</option>
              </select>
            </div>
            <div className="filter-buttonCategory">
              <CiFilter style={{ width: "30", height: "30" }} />
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="">Filter</option>
                <option value="ROAD">ROAD</option>
                <option value="DRAINAGE">DRAINAGE</option>
                <option value="WATER-SUPPLY">WATER-SUPPLY</option>
                <option value="STREET-LIGHT">STREET-LIGHT</option>
                <option value="GARBAGE-COLLECTION">GARBAGE-COLLECTIONT</option>
                <option value="DOMESTIC-VIOLENCE">DOMESTIC-VIOLENCE</option>
                <option value="TRAFFIC-VIOLATION">TRAFFIC-VIOLATION</option>
                <option value="CORRUPTION">CORRUPTION</option>
                <option value="ELECTRICAL-ISSUES">ELECTRICAL-ISSUES</option>
                <option value="CHILD-LABOUR">CHILD-LABOUR</option>
              </select>
            </div>
          </div>

          {filteredComplaints.length === 0 ? (
            <div className="no-data">No complaints found</div>
          ) : (
            <table className="complaint-table">
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>Complaint</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((complaint, index) => (
                  <tr key={complaint.complaintId}>
                    <td>{(page - 1) * 10 + index + 1}</td>
                    <td>{complaint.complaintTitle}</td>
                    <td>{complaint.categoryName}</td>
                    <td>{complaint.location}</td>
                    <td>{complaint.fullname}</td>
                    <td>
                      {new Date(complaint.createdAt).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </td>
                    <td>
                      <select
                        value={complaint.status}
                        onChange={(e) =>
                          updateComplaintStatus(
                            complaint.complaintId,
                            e.target.value
                          )
                        }
                        className="status-select"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="RESOLVED">RESOLVED</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="action-button"
                        onClick={() => handleViewDetails(complaint.complaintId)}
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="complain-pagination">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <IoIosArrowBack />
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={filteredComplaints.length < 10}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintManagement;
