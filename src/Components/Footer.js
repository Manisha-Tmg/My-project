import React from "react";
import "../Css/Footer.css";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  House,
  SearchX,
  Mail,
} from "lucide-react";

function Footer() {
  return (
    <div className="page-container">
      <div className="content"> </div>

      <footer className="footer">
        <div className="footer-section quick-links">
          <h1 className="footer-title">Quick Links</h1>
          <ul className="footer-links">
            <li>
              {" "}
              <House size={20} color="#2556b6" />
              <a href="#home" className="footer-link">
                Home
              </a>
            </li>
            <li>
              <SearchX size={20} color="#b62525" />
              <a href="#aboutus" className="footer-link">
                About Us
              </a>
            </li>
            <li>
              <Mail size={20} color="#2556b6" />
              <a href="#" className="footer-link">
                Email: Samasyasewa@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section reach-out">
          <h1 className="footer-title">Reach out to us!</h1>
          <ul className="social-links">
            <li>
              <a href="https://facebook.com" className="social-icon">
                <Facebook size={36} color="#2556b6" />
              </a>
            </li>
            <li>
              <a href="https://instagram.com" className="social-icon">
                <Instagram size={36} color="#b62525" />
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" className="social-icon">
                <Linkedin size={36} color="#2556b6" />
              </a>
            </li>
            <li>
              <a href="https://youtube.com" className="social-icon">
                <Youtube size={36} color="#ff0000" />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
