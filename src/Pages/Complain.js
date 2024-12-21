import React, { useState } from "react";
import "../Css/Complain.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { APIURL } from "../env";

const Complain = () => {
  const [selectedGrievance, setSelectedGrievance] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    // const accessToken = localStorage.getItem("accessToken");
    // const Token = localStorage.getItem("token");
    if (!selectedGrievance) {
      alert("Please select a grievance type.");
      return;
    }
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch(`${APIURL}/api/v1/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      });
      console.log("AccessToken:", accessToken);
      console.log("Headers:", {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      });
      const data = await response.json();
      if (data.success) {
        alert("Grievance type selected successfully!");
        navigate("/form", { state: { grievanceType: selectedGrievance } });
      } else {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }

  return (
    <div className="complain-container">
      <div className="Complainform-container">
        <button className="register-button" onClick={handleSubmit}>
          Register a Complaint
        </button>
        <div className="form-group">
          <label className="label1">Select the Grievance Type</label>
          <select
            className="type"
            value={selectedGrievance}
            onChange={(e) => setSelectedGrievance(e.target.value)}
          >
            <option value="" disabled>
              Select a type
            </option>
            <option value="Man-Made Disasters">Man-Made Disasters</option>
            <option value="Environmental Disasters">
              Environmental Disasters
            </option>
            <option value="GARBAGE-COLLECTION">Garbage Collection</option>
          </select>
        </div>
        <button className="next-button" onClick={handleSubmit}>
          Step 1
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Complain;
