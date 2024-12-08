import React, { useState } from "react";
import "../Css/Complain.css";
import { Link } from "react-router-dom";

const Complain = () => {
  const [selectedGrievance, setSelectedGrievance] = useState("");

  const handleChange = (e) => {
    setSelectedGrievance(e.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedGrievance) {
      alert("Please select a grievance type before submitting.");
      return;
    }

    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grievanceType: selectedGrievance,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the complaint");
      }

      const data = await response.json();
      alert("Complaint submitted successfully!");
    } catch (error) {
      console.error("Error submitting the complaint:", error);
      alert("Failed to submit the complaint. Please try again.");
    }
  };

  return (
    <div className="Complainform-container" onSubmit={handleChange}>
      <button className="register-button">Register a Complaint</button>
      <div className="form-group">
        <label className="label1">Select the Grievance Type</label>
        <select
          className="type"
          value={selectedGrievance}
          onChange={handleChange}
        >
          <option value="">-</option>
          <option value="type1">Disaster</option>
          <option value="type2">2</option>
        </select>
      </div>
      <Link to={"/form"}>
        <button className="next-button" onClick={handleSubmit}>
          Step 1
        </button>
      </Link>
    </div>
  );
};

export default Complain;
