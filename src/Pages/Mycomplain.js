import React, { useEffect } from "react";
import { APIURL } from "../env";

const Mycomplain = () => {
  async function handleComplaints(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${APIURL}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(),
      });
      if (res.ok) {
        const data = await res.json();
      }
    } catch (error) {
      alert(error);
    }
  }
  useEffect(() => {
    handleComplaints();
  })[handleComplaints];
  return (
    <div>
      <h2>My complaints</h2>
      <div></div>
    </div>
  );
};

export default Mycomplain;
