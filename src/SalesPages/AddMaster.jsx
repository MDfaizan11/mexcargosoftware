import React, { useEffect, useState } from "react";
import "../styles/Addmaster.css";
import axios from "axios";
import { BASE_URL } from "../config";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import axiosInstance from "../utils/axiosInstance";
function AddMaster() {
  const token = JSON.parse(localStorage.getItem("mexcargoUserData")).token;
  const [refreshKey, setRefreshKey] = useState(0);
  const [associateCode, setAssociateCode] = useState("");
  const [serviceSector, setServiceSector] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [grade, setGrade] = useState(0);
  const [location, setLocation] = useState("");
  const [hub, setHub] = useState("");
  const [state, setState] = useState("");
  const [masterData, setMasterData] = useState([]);

  async function handleAddMaster(e) {
    e.preventDefault();
    const formData = {
      associateCode,
      serviceSector,
      companyName,
      contactName,
      contactNumber,
      emailId,
      grade,
      location,
      hub,
      state,
    };
    console.log(formData);
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/add/master`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Master added successfully.");
        setRefreshKey(refreshKey + 1);
        setAssociateCode("");
        setServiceSector("");
        setCompanyName("");
        setContactName("");
        setContactNumber("");
        setEmailId("");
        setGrade(0);
        setLocation("");
        setHub("");
        setState("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getAllMaster() {
      try {
        const response = await axiosInstance.get(
          `${BASE_URL}/get/master/list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setMasterData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllMaster();
  }, [refreshKey]);

  async function handleDeleteMater(id) {
    const isConfirmed = window.confirm("Are you sure you want to delete this?");
    if (!isConfirmed) return;
    try {
      const response = await axiosInstance.delete(
        `${BASE_URL}/delete/master/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Master deleted successfully.");
        setRefreshKey(refreshKey + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="masterForm-container">
        <h2 className="Master-form-title">Master Registration Form</h2>
        <form className="masterForm" onSubmit={handleAddMaster}>
          <div className="master-form-group">
            <label>Associate Code:</label>
            <input
              type="text"
              value={associateCode}
              onChange={(e) => setAssociateCode(e.target.value)}
            />
          </div>

          <div className="master-form-group">
            <label>Service Sector:</label>
            <input
              type="text"
              value={serviceSector}
              onChange={(e) => setServiceSector(e.target.value)}
            />
          </div>

          <div className="master-form-group">
            <label>Company Name:</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="master-form-group">
            <label>Contact Name:</label>
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
            />
          </div>

          <div className="master-form-group">
            <label>Contact Number:</label>
            <input
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>

          <div className="master-form-group">
            <label>Email ID:</label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          <div className="master-form-group">
            <label>Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="master-form-group">
            <label>Hub:</label>
            <input
              type="text"
              value={hub}
              onChange={(e) => setHub(e.target.value)}
            />
          </div>

          <div className="master-form-group">
            <label>State:</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="master-form-group">
            <label>Grade:</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} onClick={() => setGrade(star)}>
                  {star <= grade ? (
                    <MdOutlineStar className="star selected" />
                  ) : (
                    <MdOutlineStarBorder className="star" />
                  )}
                </span>
              ))}
            </div>
          </div>
          <button type="submit" className="master-submit-btn">
            Submit
          </button>
        </form>
      </div>

      {masterData.length > 0 && (
        <div className="master-list-container">
          <h2 className="master-list-title">Master List</h2>
          <div className="mater_table_responsive">
            <table className="master_table">
              <thead>
                <tr>
                  <th>Associate Code</th>
                  <th>Service Sector</th>
                  <th>Company Name</th>
                  <th>Contact Name</th>
                  <th>Contact Number</th>
                  <th>Email ID</th>
                  <th>Grade</th>
                  <th>Location</th>
                  <th>Hub</th>
                  <th>State</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {masterData.map((master) => (
                  <tr key={master.masterId}>
                    <td>{master.associateCode}</td>
                    <td>{master.serviceSector}</td>
                    <td>{master.companyName}</td>
                    <td>{master.contactName}</td>
                    <td>{master.contactNumber}</td>
                    <td>{master.emailId}</td>
                    <td>{`${master.grade} star `}</td>
                    <td>{master.location}</td>
                    <td>{master.hub}</td>
                    <td>{master.state}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteMater(master.masterId)}
                        className="delete_master_button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default AddMaster;
