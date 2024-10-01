import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, Accordion } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../CSS/VoterPanel.css";
import Navbar from "../pages/UserNavbar";

const VotingPanel = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [candidateInfo, setCandidateInfo] = useState(null);
  const [confirmVote, setConfirmVote] = useState(false);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const voteCheckResponse = await axios.get(
          `http://localhost:5012/api/voter/hasvoted/${electionId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (voteCheckResponse.data.hasVoted) {
          console.log("voter data", voteCheckResponse.data);
          setHasVoted(true);

          toast.info("You have already voted in this election.", {
            position: "top-right",
          });
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:5012/api/elections/getelctioncandidate/${electionId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCandidates(response.data.candidates || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch candidates.", { position: "top-right" });
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [electionId, navigate]);

  // Handle candidate selection
  const handleSelect = async (candidateId) => {
    const selected = candidates.find(
      (candidate) => candidate._id === candidateId
    );
    setSelectedCandidate(selected);

    try {
      const response = await axios.get(
        `http://localhost:5012/api/candidate/getcandidatinfo/${candidateId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setCandidateInfo(response.data.Candidate);
    } catch (error) {
      toast.error("Error fetching candidate info.", { position: "top-right" });
    }
  };

  // Handle vote submission
  const handleSubmit = async () => {
    if (!selectedCandidate) {
      toast.error("Please select a candidate before voting!", {
        position: "top-right",
      });
      return;
    }

    if (!confirmVote) {
      toast.error("Please confirm your vote selection!", {
        position: "top-right",
      });
      return;
    }

    try {
      await axios.post(
        "http://localhost:5012/api/voter/addvote",
        { electionId, candidateId: selectedCandidate._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setVoteSubmitted(true);
      toast.success(`You have voted for ${selectedCandidate.candidatename}`, {
        position: "top-right",
      });
    } catch (error) {
      toast.error("Failed to submit your vote.", { position: "top-right" });
    }
  };

  // If the vote has already been submitted
  if (voteSubmitted) {
    return (
      <div className="voting-panel">
        <Navbar />
        <ToastContainer />
        <div className="thank-you-message">
          <h2>Thank you for your vote!</h2>
          <p>Your vote has been successfully submitted.</p>
          <Button onClick={() => navigate("/userinfo")}>Go Home</Button>
        </div>
      </div>
    );
  }

  // If the user has already voted, show a message
  if (hasVoted) {
    return (
      <div className="voting-panel">
        <Navbar />
        <ToastContainer />
        <h3>You have already voted in this election.</h3>
        <Button onClick={() => navigate("/electionlist")}>
          Go to Election List
        </Button>
      </div>
    );
  }

  // Main render for voting panel if user hasn't voted yet
  return (
    <div className="voting-panel">
      <Navbar />
      <ToastContainer />
      <h3>Select Your Candidate</h3>
      {loading ? (
        <p>Loading candidates...</p>
      ) : (
        <div className="candidates">
          {candidates.map((candidate) => (
            <Card
              key={candidate._id}
              className={`candidate-card ${
                selectedCandidate?._id === candidate._id ? "selected" : ""
              }`}
              onClick={() => handleSelect(candidate._id)}
            >
              <Card.Body>
                <Card.Title>{candidate.candidatename}</Card.Title>
                <Card.Text>Party: {candidate.Party}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
      {selectedCandidate && (
        <Accordion className="confirmation-section">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Candidate Info</Accordion.Header>
            <Accordion.Body>
              <h4>You have selected:</h4>
              <p>
                <strong>Name:</strong> {selectedCandidate.candidatename}
              </p>
              <p>
                <strong>Party:</strong> {selectedCandidate.Party}
              </p>
              {candidateInfo && (
                <>
                  <p>
                    <strong>Age:</strong> {candidateInfo.Age}
                  </p>
                  <p>
                    <strong>Education:</strong> {candidateInfo.Education}
                  </p>
                </>
              )}
              <input
                type="checkbox"
                id="confirmVote"
                checked={confirmVote}
                onChange={() => setConfirmVote(!confirmVote)}
              />
              <label htmlFor="confirmVote">
                I confirm my vote for {selectedCandidate.candidatename}.
              </label>
              <Button onClick={handleSubmit} className="submit-vote">
                Submit Vote
              </Button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </div>
  );
};

export default VotingPanel;
