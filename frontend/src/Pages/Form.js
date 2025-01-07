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
    file: [],
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: [...e.target.files] });
  };

  // const validateForm = () => {
  //   const newErrors = {};

  //   if (!formData.complaintTitle.trim()) {
  //     newErrors.complaintTitle = "Complaint title is required";
  //   }

  //   if (!formData.categoryName) {
  //     newErrors.categoryName = "Category is required";
  //   }

  //   if (!formData.provinceId) {
  //     newErrors.provinceId = "Province is required";
  //   }

  //   if (!formData.districtId) {
  //     newErrors.districtId = "District is required";
  //   }

  //   if (!formData.ward.trim()) {
  //     newErrors.ward = "Ward is required";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!validateForm()) {
    //   setResponseMessage("Please fill all required fields.");
    //   return;
    // }

    setLoading(true);
    setResponseMessage("");

    try {
      const accessToken = localStorage.getItem("accessToken");

      // Ensure all required location fields are properly formatted
      const requestBody = {
        complaintTitle: formData.complaintTitle.trim(),
        description: formData.description.trim(),
        categoryName: formData.categoryName,
        locations: {
          provinceId: parseInt(formData.provinceId) || null, //changing string into int as per the need of the backend
          districtId: parseInt(formData.districtId) || null, //changing string into int as per the need of the backend
          ward: formData.ward.trim(),
          tole: formData.tole.trim(),
        },
        attachments: formData.file.map((file) => ({ url: file.name })),
        anonymous: false,
      };

      // Validate location data before sending
      if (
        !requestBody.locations.provinceId ||
        !requestBody.locations.districtId
      ) {
        throw new Error("Province and District are required");
      }

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

      if (response.ok) {
        setResponseMessage("Complaint submitted successfully!");
        // Reset form
        setFormData({
          complaintTitle: "",
          provinceId: "",
          districtId: "",
          tole: "",
          ward: "",
          description: "",
          categoryName: grievanceType,
          file: [],
        });
        setErrors({});
        navigate("/complain");
      } else {
        setResponseMessage(
          "Error: " + (result.message || "Failed to submit complaint.")
        );
        if (result.errors) {
          console.error("Validation errors:", result.errors);
          // Map backend errors to form fields
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
          <p className="note">
            [Note: To address the complaint effectively, please provide detailed
            information]
          </p>
          <input
            type="text"
            name="complaintTitle"
            className={`title ${errors.complaintTitle ? "error" : ""}`}
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
            className={`title ${errors.ward ? "error" : ""}`}
            value={formData.ward}
            onChange={handleChange}
            placeholder="Ward no. *"
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
