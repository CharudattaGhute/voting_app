import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersonFill, LockFill } from "react-bootstrap-icons";
import loginimg from "../image/ach3.png";
import "../CSS/login.css";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleemailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function login(payload) {
    try {
      const response = await axios.post(
        "http://localhost:5012/api/user/login",
        payload
      );
      const { access: token, success } = response.data;
      setToken(token);
      console.log(token);
      setSuccess(success);
      console.log(success);
      localStorage.setItem("token", token);
      toast.success("User successfully logged in");
      return success;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Invalid Username or Password");
      } else if (error.response && error.response.status === 404) {
        toast.error("User is not registered");
      } else {
        toast.error("Login failed. Please try again.");
      }
      return false;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginSuccess = await login({ email, password });
    if (loginSuccess) {
      navigate("/userinfo");
    }
  };

  return (
    <div className="signin-hero">
      <div className="signin-container d-flex align-items-center justify-content-center">
        <div className="signin-card shadow-lg" id="signin-card">
          <div className="signin-card-body p-0">
            <div className="row g-0">
              {/* Left Form Section */}
              <div className="col-lg-7 p-5">
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                  {/* Username Input */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <PersonFill />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Email Address"
                        name="email"
                        value={email}
                        onChange={handleemailChange}
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
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="login"
                    className="btn btn-danger text-white mb-3"
                  >
                    Login
                  </button>

                  {/* Redirect to Sign Up */}
                  <div className="text-center">
                    <p>
                      Don't have an account?{" "}
                      <Link to="/Register">
                        <span className="text-info">Sign Up</span>
                      </Link>
                    </p>
                  </div>
                </form>
              </div>

              {/* Right Image Section */}
              <div className="col-lg-5 d-none d-lg-block mt-5">
                <img
                  src={loginimg}
                  alt="Person interacting with screens"
                  className="img-fluid h-80"
                  id="signin-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignInPage;
