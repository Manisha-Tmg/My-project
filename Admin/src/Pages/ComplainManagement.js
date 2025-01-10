import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import "../Css/Complainmanagement.css";
import { APIURL } from "../env";
import SideBar from "../Component/Side";

const ComplaintTable = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchComplaints = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const searchParam = search ? `&search=${search}` : "";
      const res = await fetch(
        `${APIURL}/api/v1/admin/complaints?page=${page}${searchParam}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();
      setComplaints(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  const handleView = (id) => {
    navigate(`/complaint`);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
            <button className="filter-button">
              <CiFilter /> Filter
            </button>
          </div>

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
              {complaints.map((complaint, index) => (
                <tr key={complaint.id}>
                  <td>{(page - 1) * 10 + index + 1}</td>
                  <td>{complaint.complaintTitle}</td>
                  <td>{complaint.categoryName}</td>
                  <td>{complaint.location}</td>
                  <td>{complaint.fullname}</td>
                  <td>{new Date(complaint.createdAt).toLocaleDateString()}</td>
                  <td>{complaint.status}</td>
                  <td>
                    <button
                      className="action-button"
                      onClick={() => handleView(complaint.id)}
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="complain-pagination">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <IoIosArrowBack />
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={complaints.length < 10}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintTable;
