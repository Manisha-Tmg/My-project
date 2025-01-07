import React, { useState, useEffect } from "react";
import { APIURL } from "../env";

const ProvinceDistrictSelector = ({
  setProvinceId,
  setDistrictId,
  provinceId,
  districtId,
}) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  const [errors, setErrors] = useState({});

  // Fetch provinces on mount
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch(`${APIURL}/api/v1/provinces`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        });
        const data = await response.json();
        if (data.success) {
          setProvinces(data.data);
        } else {
          console.error("Failed to fetch provinces:", data.message);
        }
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  // Fetch districts when provinceId changes
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!provinceId) {
        setDistricts([]);
        return;
      }

      try {
        const response = await fetch(
          `${APIURL}/api/v1/province/${provinceId}/districts`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          setDistricts(data.data);
        } else {
          console.error("Failed to fetch districts:", data.message);
        }
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };

    fetchDistricts();
  }, [provinceId]);

  const handleProvinceChange = (e) => {
    const value = e.target.value;
    setProvinceId(value);
    setDistrictId("");
    setErrors({});
  };

  const handleDistrictChange = (e) => {
    const value = e.target.value;
    setDistrictId(value);
    setErrors({});
  };

  return (
    <div className="form-group">
      <select
        className="title"
        value={provinceId || ""}
        onChange={handleProvinceChange}
        required
      >
        <option value="">Select Province</option>
        {provinces.map((province) => (
          <option key={province.id} value={province.id}>
            {province.name}
          </option>
        ))}
      </select>
      {errors.provinceId && <span className="error">{errors.provinceId}</span>}

      <select
        className="title"
        value={districtId || ""}
        onChange={handleDistrictChange}
        disabled={!provinceId}
        required
      >
        <option value="">Select District</option>
        {districts.map((district) => (
          <option key={district.id} value={district.id}>
            {district.name}
          </option>
        ))}
      </select>
      {errors.districtId && <span className="error">{errors.districtId}</span>}
    </div>
  );
};

export default ProvinceDistrictSelector;
