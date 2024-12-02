import React from "react";
import "../Css/Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Details</h2>
      <div className="contact-card">
        <h2>Office of the Prime Minister and Council of Ministers</h2>
        <p>Singha Durbar, Kathmandu, Nepal</p>
        <p>P O Box No. 23312</p>
        <p>
          Phone: <a href="tel:015970087">01-427777</a>
        </p>
        <p>
          Email: <a href="mailto:1111@nepal.gov.np">samasyasewa@gmail.com</a>
        </p>
        <p>
          Audio Notice Board:{" "}
          <span className="audio-notice">1618070701111</span>
        </p>
      </div>
      <footer className="contact-footer">
        “Samasya Sewa” is a system for redressal of complaints based on
        Information Communication Technology of the Nepal Government & OPMCM
        (Office of the Prime Minister and Council of Ministers) and all rights
        of this system belong to OPMCM.
      </footer>
    </div>
  );
};

export default Contact;
