import React from "react";

const DetailRow = ({ label, value }) => (
  <div className="user-detail-row">
    <span className="detail-label">{label}</span>
    <span className="detail-value">{value || "N/A"}</span>
  </div>
);
export default DetailRow;
