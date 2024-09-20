import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import UserNavbar from "../pages/UserNavbar";
import "../CSS/Userpage.css";

const Userpage = () => {
  const [role, setRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setRole(decodedToken.role);

          // Fetch user data from the API
          const response = await axios.get(
            "http://localhost:5012/api/user/userinfo",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.success) {
            setUserData(response.data.user);
            console.log("Userinfo", response.data.user);
          } else {
            console.error("Failed to fetch user data:", response.data.msg);
          }
        } catch (error) {
          console.error("Failed to decode token or fetch user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <>
        <UserNavbar role={role} />
        <div className="Userpage">
          <div className="profile-container">
            <p>Loading...</p>
          </div>
        </div>
      </>
    );
  }

  if (!role) {
    return (
      <>
        <UserNavbar role={role} />
        <div className="Userpage">
          <div className="profile-container">
            <p>Please log in to view profile information.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <UserNavbar role={role} />
      <div className="Userpage">
        <div className="profile-container">
          <div className="profile-image-section">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small_2x/user-profile-icon-free-vector.jpg"
              alt="Profile"
              className="profile-pic"
            />
            <button className="btn change-pic-btn">
              Change profile picture
            </button>
            <div className="edit-profile">
              <i className="fas fa-edit"></i>
              <span>Edit Profile</span>
            </div>
          </div>

          <div className="profile-info-section">
            <p>
              <strong>Role:</strong>{" "}
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </p>
            <p>
              <strong>Name:</strong> {userData?.name || "N/A"}
            </p>
            <p>
              <strong>Father's/Mother's Name:</strong>{" "}
              {userData?.fatherMotherName || "N/A"}
            </p>
            <p>
              <strong>Age:</strong> {userData?.age || "N/A"}
            </p>
            <p>
              <strong>Mobile Number:</strong> {userData?.mobileNo || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {userData?.email || "N/A"}
            </p>
            <p>
              <strong>Aadhar Number:</strong> {userData?.Aadhar_Number || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {userData?.address || "N/A"}
            </p>
            <p>
              <strong>Eligible:</strong> {userData?.eligible ? "True" : "False"}
            </p>
            <p>
              <strong>Verified:</strong> {userData?.verified ? "True" : "False"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Userpage;
