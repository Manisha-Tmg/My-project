import React from "react";
import "../Css/Aboutus.css";
import Footer from "../Components/Footer";

const Aboutus = () => {
  return (
    <div>
      {" "}
      <div className="about-us-container">
        <div className="heading-container">
          <h1 className="about-us-heading"></h1>
        </div>

        <div className="about-us-content">
          <div className="left-side">
            <div className="logo-container">
              <div className="about-logo1">About</div>
              <div className="about-logo">Us</div>
            </div>

            <p>
              Welcome to Samasyasewa, a platform dedicated to addressing
              community issues with efficiency and transparency. We are
              committed to empowering individuals and communities by providing a
              streamlined system to report complaints, track their resolution,
              and foster accountability. Recognizing the challenges faced in
              resolving everyday problems like infrastructure concerns and
              public services, Samasyasewa bridges the gap between citizens and
              relevant authorities through a user-friendly, tech-driven
              approach.
            </p>

            <br />

            <p>
              Our mission is to simplify the complaint management process,
              ensuring that voices are heard and solutions are implemented
              effectively. By promoting collaboration, innovation, and
              transparency, we aim to create stronger, more connected
              communities where problems are resolved promptly. At Samasyasewa,
              we believe every issue deserves attention and every voice matters.
              Together, let’s build a better community—one step at a time.
            </p>
          </div>
          <div className="right-side">
            <img
              src="https://via.placeholder.com/400"
              alt="About Samasya Sewa"
              className="about-us-image"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Aboutus;
