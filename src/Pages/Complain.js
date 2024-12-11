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
    console.log(selectedGrievance);
    try {
      const response = await fetch(`${APIURL}/api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedGrievance,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Complaint submitted successfully!");
        navigate("/form");
      } else {
        alert("please select the type");
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <div className="Complainform-container" onSubmit={handleSubmit}>
        <button className="register-button">Register a Complaint</button>
        <div className="form-group">
          <label className="label1">Select the Grievance Type</label>
          <select
            className="type"
            value={selectedGrievance}
            onChange={(e) => setSelectedGrievance(e.target.value)}
          >
            <option value="Natural Disasters">Natural Disasters</option>
            <option value="Man-Made Disasters">Man-Made Disasters</option>
            <option value="Environmental Disasters">
              Environmental Disasters
            </option>
          </select>
        </div>
        <Link to={"/form"}>
          <button className="next-button" onClick={handleSubmit}>
            Step 1
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Complain;
