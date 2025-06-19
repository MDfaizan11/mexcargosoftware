import axiosInstance from "../utils/axiosInstance";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import "../Planning/planning.css";
import { useNavigate } from "react-router-dom";

function Planning() {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("mexcargoUserData"))?.token;
  const UserId = JSON.parse(localStorage.getItem("mexcargoUserData"))?.userId;
  const [planningData, setPlanningData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showProjectExecutveList, setShowProjectExecutveList] = useState(false);

  const [projectExecutveList, setProjectExecutveList] = useState([]);
  const [leadId, setLeadId] = useState(null);
  const [projectExecutiveId, setProjectExecutiveId] = useState("");
  const [AccountExecutiveLeadId, setAccountExecutiveLeadId] = useState("");
  const [AccountExecutiveId, setAccountExecutiveId] = useState("");
  const [AccountExecutiveList, setAccountExecutiveList] = useState("");
  const [showAccontExecutiveList, setshowAccontExecutiveList] = useState(false);
  function formatDateAndTimeIST(dateOrDatePart, timePart = null) {
    if (!dateOrDatePart) return "N/A";

    try {
      let fullDateTime;
      if (timePart) {
        fullDateTime = new Date(`${dateOrDatePart}T${timePart}`);
      } else {
        // Use as full ISO string
        fullDateTime = new Date(dateOrDatePart);
      }

      if (isNaN(fullDateTime.getTime())) return "Invalid Date";

      const options = {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };

      return new Intl.DateTimeFormat("en-IN", options).format(fullDateTime);
    } catch (err) {
      console.error("Date formatting error:", err);
      return "N/A";
    }
  }

  useEffect(() => {
    async function getAllPlanningData() {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `${BASE_URL}/planning-executive/${UserId}/quatation`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Planning Data:", response.data);
        setPlanningData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching planning data:", error);
        setError("Failed to load planning data. Please try again.");
        setLoading(false);
      }
    }

    if (UserId && token) {
      getAllPlanningData();
    } else {
      setError("User not authenticated. Please log in.");
      setLoading(false);
    }
  }, [UserId, token]);

  if (loading) return <div className="planningCard-container">Loading...</div>;
  if (error) return <div className="planningCard-container">{error}</div>;

  function handleClickPlannigdetail(quatationId, leadId) {
    navigate(`/planningdetails/${quatationId}/${leadId}`);
  }

  async function getallProjectExecutveList(id) {
    setLeadId(id);
    setShowProjectExecutveList(true);
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/get/all/project-executives`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setProjectExecutveList(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleAddprojextExecutive(e) {
    e.preventDefault();
    const body = {
      leadId: leadId,
      projectExecutiveIds: Number(projectExecutiveId),
    };

    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/send-email-to-project`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        alert("Sent to Project Executive");
        setShowProjectExecutveList(false);
      }
    } catch (error) {
      const errorMassage = error.response.data;
      alert(errorMassage);
    }
  }

  async function getAllAccountExecutiveList(id) {
    setAccountExecutiveLeadId(id);
    setshowAccontExecutiveList(true);
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/get/account-executive-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setAccountExecutiveList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSendAccontExecutive(e) {
    e.preventDefault();
    const formdata = {
      leadId: AccountExecutiveLeadId,
      accountExecutiveId: AccountExecutiveId,
    };

    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/send-email-to-account`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        alert("Successfully Data send to Account Executive");
        setshowAccontExecutiveList(false);
        setAccountExecutiveId("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="planningCard-container">
        <h2>Planning Data</h2>
        {planningData.length === 0 ? (
          <p>No planning data available.</p>
        ) : (
          <div className="planningCard-cardsWrapper">
            {planningData.map((item) => (
              <div
                key={item.leadId}
                className={`planningCard-card planningCard-${
                  item.source?.toLowerCase() || "unknown"
                }`}
              >
                <h3>
                  <strong>Quotation Ref No:</strong>{" "}
                  {item.quatationReferenceNo || "N/A"}
                </h3>
                <p>
                  <strong>Source:</strong> {item.source || "N/A"}
                </p>
                <p>
                  <strong>Destination:</strong> {item.destination || "N/A"}
                </p>
                <p>
                  <strong>Commodity:</strong> {item.commodity || "N/A"}
                </p>
                <p>
                  <strong>Size:</strong> {item.size || "N/A"}
                </p>
                <p>
                  <strong>Weight:</strong> {item.weight || "N/A"}
                </p>

                <p>
                  <strong>Commodity Moving Date & Time:</strong>{" "}
                  {formatDateAndTimeIST(item.movingDateAndTime)}
                </p>
                <p>
                  <strong>Type of Transportation:</strong>{" "}
                  {item.typeOfTransporatation || "N/A"}
                </p>
                <p>
                  <strong>Car Transport:</strong> {item.carTransport || "N/A"}
                </p>

                <p>
                  <strong>Car Moving Date & Time:</strong>{" "}
                  {formatDateAndTimeIST(item.carMovingDate, item.carMovingTime)}
                </p>

                <p>
                  <strong>Required Quotation Date & Time:</strong>{" "}
                  {formatDateAndTimeIST(
                    item.requiredQuatationDate,
                    item.requiredQuatationTime
                  )}
                </p>
                <p>
                  <strong>Receiving Quotation Date & Time:</strong>{" "}
                  {formatDateAndTimeIST(
                    item.receivingQuatationDate,
                    item.receivingQuationTime
                  )}
                </p>
                <p>
                  <strong>Other Services:</strong> {item.otherServices || "N/A"}
                </p>

                <div className="planning_multi_button">
                  <button
                    className="planning_crd_viewButton"
                    onClick={() =>
                      handleClickPlannigdetail(item.quatationId, item.leadId)
                    }
                  >
                    View Details
                  </button>
                  <button
                    className="planning_crd_sentToProjectButton"
                    onClick={() => getallProjectExecutveList(item.leadId)}
                  >
                    Sent to Project
                  </button>
                  <button
                    onClick={() => getAllAccountExecutiveList(item.leadId)}
                    className="planning_crd_sentToProjectButton"
                  >
                    Sent to Account
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showProjectExecutveList && (
        <>
          <div
            className="project-executive-overlay"
            onClick={() => setShowProjectExecutveList(false)}
          ></div>

          <div className="project-executive-container">
            <button
              onClick={() => setShowProjectExecutveList(false)}
              className="project-executive-close-button"
            >
              ×
            </button>
            <h2>Project Executive List</h2>
            <form onSubmit={handleAddprojextExecutive}>
              {projectExecutveList.length === 0 ? (
                <p>No project executives available.</p>
              ) : (
                <select
                  className="project-executive-select"
                  value={projectExecutiveId}
                  onChange={(e) => setProjectExecutiveId(e.target.value)}
                >
                  <option value="">Select Project Executive</option>
                  {projectExecutveList.map((executive) => (
                    <option key={executive.id} value={executive.userId}>
                      {executive.userName}
                    </option>
                  ))}
                </select>
              )}
              <button type="submit" className="project-executive-submit-button">
                Submit
              </button>
            </form>
          </div>
        </>
      )}

      {showAccontExecutiveList && (
        <>
          <div
            className="project-executive-overlay"
            onClick={() => setshowAccontExecutiveList(false)}
          ></div>

          <div className="project-executive-container">
            <button
              onClick={() => setshowAccontExecutiveList(false)}
              className="project-executive-close-button"
            >
              ×
            </button>
            <h2>Account Executive List</h2>
            <form onSubmit={handleSendAccontExecutive}>
              {AccountExecutiveList.length === 0 ? (
                <p>No Account executives available.</p>
              ) : (
                <select
                  className="project-executive-select"
                  value={AccountExecutiveId}
                  onChange={(e) => setAccountExecutiveId(e.target.value)}
                >
                  <option value="">Select Account Executive</option>
                  {AccountExecutiveList.map((executive) => (
                    <option key={executive.id} value={executive.userId}>
                      {executive.userName}
                    </option>
                  ))}
                </select>
              )}
              <button type="submit" className="project-executive-submit-button">
                Submit
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default Planning;
