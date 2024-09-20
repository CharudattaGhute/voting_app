import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../CSS/Vote.css";
import Navbar from "../pages/UserNavbar";

const Vote = () => {
  const { electionId } = useParams();
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleProceed = () => {
    if (isChecked) {
      navigate(`/voterpanel/${electionId}`);
    } else {
      alert(
        "Please confirm that you understand the steps by checking the box."
      );
    }
  };

  return (
    <div className="containerfluid">
      <Navbar />
      <div className="vote-page container-v mt-5">
        <div className="card shadow-lg border-0">
          <div className="card-body">
            <h5 className="card-title text-center">
              This election is being conducted by the Election Commission of
              India.
            </h5>
            <p className="text-center">
              As a member of the constituency under the Uttar Pradesh State
              Election, you are allowed to vote. Please take the following steps
              to cast a valid vote.
            </p>
            <div className="instructions-box">
              <h6>Steps:</h6>
              <ul>
                <li>
                  Stay in the frame of your camera alone and with sufficient
                  lighting for the entire duration.
                </li>
                <li>
                  Have Security Keys with you, as you will require them to
                  proceed.
                </li>
                <li>You are allowed to make only one vote per election.</li>
                <li>You can choose only one candidate per election.</li>
                <li>Candidate information is available on the page.</li>
                <li>
                  Ensure you are selecting your desired candidate by confirming
                  the name and symbol on the screen.
                </li>
                <li>
                  After selecting the candidate, make sure to submit your vote.
                </li>
                <li>
                  Results will be announced five days after the election is
                  completed.
                </li>
                <li>
                  You can verify your vote after the election results are
                  announced.
                </li>
              </ul>
            </div>
            <div className="d-flex justify-content-center">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="confirm"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                <label className="form-check-label" htmlFor="confirm">
                  I understand and will follow the above steps.
                </label>
              </div>
            </div>
            <div className="text-center mt-4">
              <button
                className="btn btn-secondary mx-2"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button className="btn btn-primary mx-2" onClick={handleProceed}>
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vote;
