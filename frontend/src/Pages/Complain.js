import React, { useState, useEffect } from "react";
import "../Css/Complain.css";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { APIURL } from "../env";

const Complain = () => {
  const [selectedGrievance, setSelectedGrievance] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories();
  }, []);

  async function getAllCategories() {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch(`${APIURL}/api/v1/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      });

      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }

  const handleSubmit = () => {
    if (!selectedGrievance) {
      alert("Please select a grievance type.");
      return;
    }

    navigate("/form", { state: { grievanceType: selectedGrievance } });
  };

  return (
    <div className="complain-container">
      <div className="Complainform-container">
        <div className="form-group">
          <select
            className="label1"
            value={selectedGrievance}
            onChange={(e) => setSelectedGrievance(e.target.value)}
          >
            <option value="" disabled>
              Select the Grievance Type
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {/* <button className="register-button" onClick={handleSubmit}>
          Register a Complaint
        </button> */}
        <button className="next-button" onClick={handleSubmit}>
          Step 1
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Complain;
