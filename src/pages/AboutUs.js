import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const AboutUs = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('.about-list li');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach((section) => observer.observe(section));
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container-2">
        <h1>About Us</h1>
        <ul className="about-list">
          <li>
            <h2>Who we are?</h2>
            <p className="paraf-text">
              We are a company that provides a variety of services and different apps for users.
            </p>
          </li>
          <li>
            <h2>Vision</h2>
            <p className="paraf-text">
              We want to give you the best of the best with all the functions that you want.
            </p>
          </li>
          <li>
            <h2>Team</h2>
            <p className="paraf-text">The Team Members:</p>
            <ul className="team-list">
              <li>
                <strong>John Doe</strong> - Lead Developer
              </li>
              <li>
                <strong>Alice Doe</strong> - UX Designer
              </li>
              <li>
                <strong>Patrick Doe</strong> - Project Manager
              </li>
              <li>
                <strong>Jannice Doe</strong> - QA Engineer
              </li>
            </ul>
          </li>
          <li>
            <h2>Contact Information</h2>
            <p className="paraf-text">
              You can contact us via email or social media.
              <br />
              <strong>Email:</strong> theappcontact@email.com
            </p>
            <div className="social-media">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} size="2x" className="social-icon" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} size="2x" className="social-icon" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} size="2x" className="social-icon" />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;