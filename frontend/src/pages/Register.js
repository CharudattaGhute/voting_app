import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  PersonFill,
  EnvelopeFill,
  LockFill,
  TelephoneFill,
  FileEarmarkPersonFill,
} from "react-bootstrap-icons";
import loginimg from "../image/Register.png";
import "../CSS/Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [fatherMotherName, setFatherMotherName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [Aadhar_Number, setAadhar_Number] = useState("");
  const [role, setRole] = useState("user");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const navigate = useNavigate();

  const handleChange = (setter) => (e) => setter(e.target.value);
  const handleCheckboxChange = () => setAgreeTerms(!agreeTerms);

  async function register(payload) {
    try {
      console.log("Sending registration payload:", payload); // Log the payload
      const response = await axios.post(
        "http://localhost:5012/api/user/register",
        payload
      );
      toast.success(response.data.message || "Registration Successful");
      console.log("Registration successful:", response.data); // Log the response
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error.response || error.message); // Log the error details
      toast.error(error.response?.data?.error || "Registration failed");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== reenterPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const payload = {
      name,
      dateOfBirth,
      fatherMotherName,
      email,
      mobileNo,
      password,
      Aadhar_Number,
      role,
    };

    console.log("Submitting form with payload:", payload); // Log form submission
    await register(payload);
  };

  return (
    <div className="hero">
      <div className="container min-vh-100 d-flex align-items-center justify-content-center">
        <div
          className="card shadow-lg"
          style={{ maxWidth: "900px" }}
          id="hero1"
        >
          <div className="card-body p-0">
            <div className="row g-0">
              {/* Left Image Section */}
              <div className="col-lg-5 d-none d-lg-block">
                <img
                  src={loginimg}
                  alt="Person interacting with screens"
                  className="img-fluid h-80"
                  style={{
                    borderTopLeftRadius: ".25rem",
                    borderBottomLeftRadius: ".25rem",
                    marginTop: "100px",
                  }}
                />
              </div>

              <div className="col-lg-7 p-5">
                <h2 className="text-center mb-4">Register Form</h2>
                <form onSubmit={handleSubmit}>
                  {/* Name Input */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <PersonFill />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Name"
                        name="name"
                        value={name}
                        onChange={handleChange(setName)}
                        required
                      />
                    </div>
                  </div>

                  {/* Date of Birth Input */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <FileEarmarkPersonFill />
                      </span>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Enter Date of Birth"
                        name="dateOfBirth"
                        value={dateOfBirth}
                        onChange={handleChange(setDateOfBirth)}
                        required
                      />
                    </div>
                  </div>

                  {/* Father/Mother Name Input */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <PersonFill />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Father/Mother Name"
                        name="fatherMotherName"
                        value={fatherMotherName}
                        onChange={handleChange(setFatherMotherName)}
                        required
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <EnvelopeFill />
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email"
                        name="email"
                        value={email}
                        onChange={handleChange(setEmail)}
                        required
                      />
                    </div>
                  </div>

                  {/* Mobile Number Input */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <TelephoneFill />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Mobile Number"
                        name="mobileNo"
                        value={mobileNo}
                        onChange={handleChange(setMobileNo)}
                        required
                      />
                    </div>
                  </div>

                  {/* Aadhar Number Input */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <LockFill />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Aadhar Number"
                        name="Aadhar_Number"
                        value={Aadhar_Number}
                        onChange={handleChange(setAadhar_Number)}
                        required
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <LockFill />
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        name="password"
                        value={password}
                        onChange={handleChange(setPassword)}
                        required
                      />
                    </div>
                  </div>

                  {/* Re-enter Password Input */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <LockFill />
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Re-enter Password"
                        name="reenterPassword"
                        value={reenterPassword}
                        onChange={handleChange(setReenterPassword)}
                        required
                      />
                    </div>
                  </div>

                  {/* Role Selection Dropdown */}
                  <div className="mb-3">
                    <div className="input-group">
                      <label className="input-group-text">Role</label>
                      <select
                        className="form-select"
                        value={role}
                        onChange={handleChange(setRole)}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>

                  {/* Agree Terms Checkbox */}
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="agreeTerms"
                      checked={agreeTerms}
                      onChange={handleCheckboxChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="agreeTerms">
                      I agree to all terms
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="register"
                    className="btn btn-danger text-white mb-3"
                  >
                    Register
                  </button>

                  {/* Redirect to Sign In */}
                  <div className="text-center">
                    <p>
                      Already have an account?{" "}
                      <Link to="/Login">
                        <span className="text-info">Sign In</span>
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
