import React from "react";
import "../CSS/Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="vote-container">
      <nav className="navbar-D">
        <ul className="navbar-links-d">
          <li>
            <a onClick={() => navigate("/About")}>About</a>
          </li>
          <li>
            <a onClick={() => navigate("/Contact")}>Contact</a>
          </li>
          <li>
            <a href="#login" onClick={() => navigate("/Login")}>
              Login
            </a>
          </li>
          <li>
            <a href="#" onClick={() => navigate("/Userpage")}>
              Navbar
            </a>
          </li>
        </ul>
      </nav>

      <div className="vote-content">
        <div className="vote-image">
          <img
            src="https://images.squarespace-cdn.com/content/v1/620ec217689e8b22dc39cf23/1660080791855-4KPSTGMWPAOINO203ZZX/manny-becerra-LA1VawaCjjI-unsplash.jpg?format=1500w"
            alt="Let's Vote"
          />
        </div>
        <div className="vote-text">
          <h2>Be a part of decision</h2>
          <h1>Vote Today</h1>
          <div className="vote-buttons">
            <button
              className="btn register-btn text-white"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
            <button
              className="btn readmore-btn text-white"
              onClick={() => navigate("/ReadMore")}
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
