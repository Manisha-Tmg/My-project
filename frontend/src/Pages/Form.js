import React, { useState } from "react";
import "../Css/Form.css";
import { useLocation, useNavigate } from "react-router-dom";
import { APIURL } from "../env";
import ProvinceDistrictSelector from "../Components/Province";

const ComplaintForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const grievanceType = state?.grievanceType || "";

  const [formData, setFormData] = useState({
    complaintTitle: "",
    provinceId: "",
    districtId: "",
    tole: "",
    ward: "",
    description: "",
    categoryName: grievanceType,
    attachments: [],
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "SamasyaSewa");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/ddh1i3vod/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) throw new Error("Upload failed");
        const result = await response.json();

        return {
          url: result.secure_url,
          fileName: file.name,
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...uploadedFiles],
      }));
    } catch (error) {
      setResponseMessage("Error uploading files: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const accessToken = localStorage.getItem("accessToken");

      const requestBody = {
        complaintTitle: formData.complaintTitle.trim(),
        description: formData.description.trim(),
        categoryName: formData.categoryName,
        location: {
          tole: formData.tole,
          ward: parseInt(formData.ward, 10),
          provinceId: parseInt(formData.provinceId, 10),
          districtId: parseInt(formData.districtId, 10),
        },
        attachments: formData.attachments,
        anonymous: false,
      };

      console.log("Sending request with body:", requestBody); // Add this for debugging

      const response = await fetch(`${APIURL}/api/v1/complaint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log("Received response:", result);

      if (response.ok) {
        setResponseMessage("Complaint submitted successfully!");
        setFormData({
          complaintTitle: "",
          provinceId: "",
          districtId: "",
          tole: "",
          ward: "",
          description: "",
          categoryName: grievanceType,
          attachments: [],
        });
        navigate("/complain");
      } else {
        setResponseMessage(
          "Error: " + (result.message || "Failed to submit complaint.")
        );
        if (result.errors) {
          const backendErrors = {};
          result.errors.forEach((error) => {
            if (error.includes("district")) {
              backendErrors.districtId = "District is required";
            }
          });
          setErrors({ ...errors, ...backendErrors });
        }
      }
    } catch (error) {
      setResponseMessage("Error: " + error.message);
      console.error("Network error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!grievanceType) {
    return (
      <div className="form-container">
        <p className="error-message">
          Please select a grievance type from the previous page first.
        </p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <form className="complaint-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Complaint Title *</label>
          <input
            type="text"
            className="title"
            name="complaintTitle"
            // className={errors.complaintTitle ? "error" : ""}
            value={formData.complaintTitle}
            onChange={handleChange}
            placeholder="Enter complaint title"
            required
          />
          {errors.complaintTitle && (
            <span className="error-text">{errors.complaintTitle}</span>
          )}
        </div>

        <div className="form-group">
          <label>Category *</label>
          <input
            type="text"
            value={grievanceType}
            className="title"
            disabled
            style={{ backgroundColor: "#f0f0f0" }}
          />
        </div>

        <div className="form-group">
          <label>Disaster Affected Area *</label>
          <ProvinceDistrictSelector
            provinceId={formData.provinceId}
            districtId={formData.districtId}
            setProvinceId={(id) => {
              setFormData((prev) => ({
                ...prev,
                provinceId: id,
                districtId: "",
              }));
              setErrors({ ...errors, provinceId: "", districtId: "" });
            }}
            setDistrictId={(id) => {
              setFormData((prev) => ({
                ...prev,
                districtId: id,
              }));
              setErrors({ ...errors, districtId: "" });
            }}
          />
          {errors.provinceId && (
            <span className="error-text">{errors.provinceId}</span>
          )}
          {errors.districtId && (
            <span className="error-text">{errors.districtId}</span>
          )}

          <input
            type="text"
            name="tole"
            className="title"
            value={formData.tole}
            onChange={handleChange}
            placeholder="Tole"
          />

          <input
            type="text"
            name="ward"
            className="title"
            value={formData.ward}
            onChange={handleChange}
            placeholder="Ward no"
            required
          />
          {errors.ward && <span className="error-text">{errors.ward}</span>}
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            className="title"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            required
          />
        </div>

        <div className="form-group">
          <label>File (if any)</label>
          <input
            type="file"
            name="file"
            className="title"
            multiple
            onChange={handleFileChange}
          />
          {formData.attachments.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                {formData.attachments.length} file(s) attached
              </p>
            </div>
          )}
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {responseMessage && (
        <p
          className={`response-message ${
            responseMessage.includes("Error") ? "error" : "success"
          }`}
        >
          {responseMessage}
        </p>
      )}
    </div>
  );
};

export default ComplaintForm;
