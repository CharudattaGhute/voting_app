import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Alert } from "react-bootstrap";

const AddElectionForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Fetch candidates when the component mounts
    const fetchCandidates = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5012/api/candidate/getallcandidate",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCandidates(response.data.newcandidate); // Ensure correct data structure
      } catch (err) {
        console.error(
          "Error fetching candidates:",
          err.response ? err.response.data : err.message
        );
        setError(err.response ? err.response.data.error : "Network error");
      }
    };
    fetchCandidates();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const electionData = {
      title,
      description,
      start_date: startDate,
      end_date: endDate,
      candidates: selectedCandidates, // Array of candidate IDs
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5012/api/elections/create",
        electionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(true);
      setError(null);
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setSelectedCandidates([]);
      console.log("Response Data:", response.data);
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.error : "Network error");
      setSuccess(false);
    }
  };

  const handleCandidateChange = (event) => {
    const { options } = event.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedCandidates(selectedOptions);
  };

  return (
    <div className="containerfluid" style={{ marginTop: "10%" }}>
      <Container>
        <h2>Add New Election</h2>
        {success && (
          <Alert variant="success">Election added successfully!</Alert>
        )}
        {error && <Alert variant="danger">Error: {error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter election title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter election description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formStartDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEndDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCandidates">
            <Form.Label>Candidates</Form.Label>
            <Form.Control
              as="select"
              multiple
              value={selectedCandidates}
              onChange={handleCandidateChange}
              required
            >
              {Array.isArray(candidates) &&
                candidates.map((candidate) => (
                  <option key={candidate._id} value={candidate._id}>
                    {candidate.candidatename}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Election
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default AddElectionForm;
