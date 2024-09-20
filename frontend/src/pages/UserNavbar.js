import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../CSS/UserNavbar.css";
import AddCandidate from "../Admin/AddCandidates";
import { useState } from "react";

function UserNavbar({ role }) {
  const navigate = useNavigate();
  const [islogout, setIslogout] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
  };
  const handlelogout = () => {
    localStorage.removeItem("token");
    setIslogout(true);
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {role === "admin" ? (
                <>
                  <li className="nav-item">
                    <button
                      className="nav-link btn"
                      onClick={() => handleNavigation("/userinfo")}
                    >
                      Dashboard
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn"
                      onClick={() => handleNavigation("/addelection")}
                    >
                      addelection
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn"
                      onClick={() => handleNavigation("/addcandidate")}
                    >
                      Add Candidates
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn"
                      onClick={() => handleNavigation("/Votesperelection")}
                    >
                      Votes result
                    </button>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn" onClick={handlelogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <button
                      className="nav-link btn"
                      onClick={() => handleNavigation("/userinfo")}
                    >
                      Profile Info
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn"
                      onClick={() => handleNavigation("/election")}
                    >
                      Election
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn"
                      onClick={() => handleNavigation("/contact")}
                    >
                      Contact
                    </button>
                  </li>

                  <li className="nav-item">
                    <button className="nav-link btn" onClick={handlelogout}>
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default UserNavbar;
