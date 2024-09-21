import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../CSS/Election.css";
import Navbar from "../pages/UserNavbar";

const ElectionList = () => {
  const [upcomingElections, setUpcomingElections] = useState([]);
  const [pastElections, setPastElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5012/api/elections/getallelcetion",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          const now = new Date();
          const elections = response.data.newelection || [];

          // Filter elections for upcoming and past without vote-checking
          const upcoming = elections.filter(
            (election) => new Date(election.start_date) > now
          );
          const past = elections.filter(
            (election) => new Date(election.start_date) <= now
          );

          console.log("Upcoming Elections:", upcoming); // Debugging line
          console.log("Past Elections:", past); // Debugging line

          setUpcomingElections(upcoming);
          setPastElections(past);
        } else {
          setError("No elections found");
        }
      } catch (error) {
        setError("Failed to fetch elections: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchElections();
  }, []);

  const handleElectionClick = (electionId) => {
    navigate(`/vote/${electionId}`);
  };

  return (
    <div className="containerfluid">
      <Navbar />
      <div className="election-container">
        <h3>Upcoming Elections:</h3>
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {upcomingElections.length === 0 && !loading && (
          <p>No upcoming elections available.</p>
        )}
        {upcomingElections.map((election) => (
          <div
            className="election-item"
            key={election._id}
            onClick={() => handleElectionClick(election._id)}
            style={{ cursor: "pointer" }}
          >
            <span className="election-name">
              {election.title || "No Title Available"}
            </span>
            <span className="election-date" style={{ marginLeft: "30%" }}>
              {election.start_date
                ? new Date(election.start_date).toLocaleDateString()
                : "No Date Available"}
            </span>
          </div>
        ))}

        <h3>Past Elections:</h3>
        {pastElections.length === 0 && !loading && (
          <p>No past elections available.</p>
        )}
        {pastElections.map((election) => (
          <div
            className="election-item"
            key={election._id}
            onClick={() => handleElectionClick(election._id)} // No voting for past elections
            style={{ cursor: "pointer" }}
          >
            <span className="election-name">
              {election.title || "No Title Available"}
            </span>
            <span className="election-date" style={{ marginLeft: "30%" }}>
              {election.start_date
                ? new Date(election.start_date).toLocaleDateString()
                : "No Date Available"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectionList;
