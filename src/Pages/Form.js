import React, { useState } from "react";
import "../Css/Form.css";
import { APIURL } from "../env";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    province: "",
    district: "",
    tole: "",
    ward: "",
    description: "",
    file: [],
  });

  const [loading, setLoading] = useState(false); // State to handle loading
  const [responseMessage, setResponseMessage] = useState(""); // State for response message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("province", formData.province);
      formDataToSend.append("district", formData.district);
      formDataToSend.append("tole", formData.tole);
      formDataToSend.append("ward", formData.ward);
      formDataToSend.append("description", formData.description);
      if (formData.file) {
        formDataToSend.append("file", formData.file);
      }

      const response = await fetch(`${APIURL}/api/v1/complaint`, {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        setResponseMessage("Complaint submitted successfully!");
        console.log("Response:", result);
      } else {
        const error = await response.json();
        setResponseMessage(
          "Error: " + (error.message || "Failed to submit complaint.")
        );
        console.error("Error response:", error);
      }
    } catch (error) {
      setResponseMessage("Error: " + error.message);
      console.error("Network error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="form-container"
      // style={{
      //   width: "100%",
      //   height: "100%",
      //   flexDirection: "column",
      //   justifyContent: "center",
      //   alignItems: "center",
      //   gap: 20,
      //   display: "inline-flex",
      // }}
    >
      <form className="complaint-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Complaint Title</label>
          <p className="note">
            [Note: To address the complaint effectively, please provide detailed
            information]
          </p>
          <input
            type="text"
            className="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter complaint title"
            required
          />
        </div>

        <div className="form-group">
          <label>Disaster affected area *</label>
          <div>
            <select
              className="title"
              value={formData.province}
              onChange={handleChange}
              required
            >
              <option value="">Province</option>
              <option value="Province 1">Province 1</option>
              <option value="Province 2">Province 2</option>
              <option value="Bagmati">Bagmati</option>
            </select>
          </div>
          <select
            className="title"
            value={formData.district}
            onChange={handleChange}
            required
          >
            <option value="">District</option>
            <option value="Kathmandu">Kathmandu</option>
            <option value="Lalitpur">Lalitpur</option>
            <option value="Bhaktapur">Bhaktapur</option>
          </select>
          <input
            type="text"
            className="title"
            value={formData.tole}
            onChange={handleChange}
            placeholder="Tole"
          />
          <input
            type="text"
            className="title"
            value={formData.ward}
            onChange={handleChange}
            placeholder="Ward no."
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            className="title"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </div>

        <div className="form-group">
          <label>File (if any)</label>
          <input
            className="title"
            type="file"
            name="file"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
};

export default ComplaintForm;
