import React, { useState } from "react";
import "../Css/Complain.css";
import { Link } from "react-router-dom";

const Complain = () => {
  const [selectedGrievance, setSelectedGrievance] = useState("");

  const handleChange = (e) => {
    setSelectedGrievance(e.target.value);
  };

  const handleNext = () => {
    alert(`Selected Grievance Type: ${selectedGrievance || ""}`);
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
          <option value="type1">1</option>
          <option value="type2">2</option>
        </select>
      </div>
      <Link to={"/profile"}>
        <button className="next-button" onClick={handleNext}>
          NEXT
        </button>
      </Link>
    </div>
  );
};

export default Complain;
