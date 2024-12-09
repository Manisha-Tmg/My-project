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
            <div className="about-logo-container">
              <div className="about-logo1" style={{ "text-align": "center" }}>
                About
              </div>
              <div className="about-logo">Us</div>
            </div>

            <p>
              Welcome to Samasyasewa, a cutting-edge platform designed to
              transform the way communities address and resolve local issues.
              Our goal is to provide a seamless and transparent solution for
              citizens to report complaints, track their progress, and ensure
              that responsible authorities take action promptly. At Samasyasewa,
              we believe that every voice matters and that collective action can
              create lasting change in our neighborhoods and cities.Our platform
              was developed with the vision of empowering individuals and
              fostering community-driven solutions. In a world where local
              issues such as infrastructure problems, public services, and
              environmental concerns often go unnoticed, Samasyasewa ensures
              that no problem is too small to be addressed. Whether it's a
              street light that's not working, a drainage issue, or a safety
              concern, we make it easy for citizens to voice their complaints
              and ensure they are handled efficiently.
            </p>

            <br />

            <p>
              Our mission is simple but impactful: to streamline the complaint
              management process, making it faster, more transparent, and more
              collaborative. With our user-friendly interface, anyone can easily
              submit a complaint, track its resolution, and get notified when
              the issue is resolved. We partner with local authorities and
              organizations to provide the resources and accountability needed
              to resolve community issues. At Samasyasewa, we are not just a
              platform—we are a movement towards stronger, more resilient
              communities. By promoting transparency, collaboration, and
              innovation, we help bridge the gap between citizens and
              decision-makers. We believe that by working together, we can
              foster positive change, build trust, and create communities where
              everyone has a voice in shaping their surroundings.
            </p>
            <br />
            <p>
              Join us in our mission to make a difference. Together, we can
              build safer, cleaner, and more vibrant communities, one issue at a
              time.
            </p>
          </div>
          {/* <div className="right-side">
            <img
              src="https://via.placeholder.com/400"
              alt="About Samasya Sewa"
              className="about-us-image"
            />
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Aboutus;
