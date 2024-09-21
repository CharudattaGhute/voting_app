import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Modal, Button } from "react-bootstrap";
import UserNavbar from "../pages/UserNavbar";
import "../CSS/Userpage.css";

const Userpage = () => {
  const [role, setRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setRole(decodedToken.role);

        const storedUserData = localStorage.getItem("userData");

        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
          setLoading(false);
        } else {
          fetchUserData(token);
        }
      } catch (error) {
        console.error("Failed to decode token or fetch user data:", error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:5012/api/user/userinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const user = response.data.user;
        setUserData(user);
        localStorage.setItem("userData", JSON.stringify(user));
      } else {
        console.error("Failed to fetch user data:", response.data.msg);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => setShowModal(false);
  const handleModalOpen = () => setShowModal(true);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image file first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    setUploading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5012/api/image/addimage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message === "Image added successfully") {
        alert("Image uploaded successfully!");

        const newImageUrl = response.data.image.image;

        if (newImageUrl) {
          const updatedUserData = { ...userData, image: newImageUrl };
          setUserData(updatedUserData);
          localStorage.setItem("userData", JSON.stringify(updatedUserData));
        }

        setShowModal(false);
      } else {
        alert(
          `Failed to upload image: ${response.data.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred during the upload.");
    } finally {
      setUploading(false);
    }
  };

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

  if (!role || !userData) {
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
              src={
                userData?.image
                  ? `http://localhost:5012${
                      userData.image
                    }?timestamp=${new Date().getTime()}`
                  : "default-profile-pic-url"
              }
              alt="Profile"
              className="profile-pic"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "default-profile-pic-url";
              }}
            />
            <button
              className="btn change-pic-btn"
              style={{ color: "white" }}
              onClick={handleModalOpen}
            >
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

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleImageUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Userpage;
