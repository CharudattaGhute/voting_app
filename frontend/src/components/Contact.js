import React from "react";
import "../CSS/Contact.css";
import Navbar from "../pages/UserNavbar";

function Contact() {
  return (
    <div className="containerfluid">
      <Navbar />
      <footer className="footer-section">
        <div className="footer-content">
          <div className="footer-column contact-info">
            <h5>Contact:</h5>
            <hr />
            <p>1800 9090 32</p>
            <p>1800 9000 64</p>
            <h5>Helpline Number:</h5>
            <hr />
            <p>9090 1234 46</p>
            <p>9090 1234 47</p>
            <h5>Email:</h5>
            <hr />
            <p>complaint@electionindia.gov.in</p>
            <p>info@electionindia.gov.in</p>
          </div>
          <div className="footer-column">
            <h5>Get In:</h5>
            <hr />
            <a href="#">Register</a>
            <a href="#">Login</a>
            <h5>Know More:</h5>
            <hr />
            <a href="#">Features</a>
            <a href="#">About</a>
            <a href="#">Steps</a>
            <h5>Follow Us:</h5>
            <hr />
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
          </div>
          <div className="footer-column quick-feedback">
            <h5>Quick Feedback:</h5>

            <input type="text" placeholder="Your Name" />
            <textarea placeholder="Your Feedback"></textarea>
            <button className="btn btn-primary">Send</button>
          </div>
        </div>
        <p className="copyright">© shank.design</p>
      </footer>
    </div>
  );
}

export default Contact;
