import React, { useEffect, useState } from "react";
import styles from "../styles/Leadmanegment.module.css";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import axiosInstance from "../utils/axiosInstance";

function SalesLeadManegment() {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("mexcargoUserData"))?.token;
  const userId = JSON.parse(localStorage.getItem("mexcargoUserData")).userId;
  const [refreshKey, setrefreshKey] = useState(0);
  const [leads, setLeads] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const [companyDetail, setCompanyDetail] = useState(null);
  const [employeeDetail, setEmployeeDetail] = useState(null);
  const [endUserDetail, setEndUserDetail] = useState(null);
  const [leadNeedDetail, setLeadNeedDetail] = useState(null);
  const [leadNote, setLeadNote] = useState(null);
  const [showCompanyPopup, setShowCompanyPopup] = useState(false);
  const [showEmployeePopup, setShowEmployeePopup] = useState(false);
  const [showEndUserPopup, setShowEndUserPopup] = useState(false);
  const [showLeadNeedPopup, setShowLeadNeedPopup] = useState(false);
  const [showNotePopup, setShowNotePopup] = useState(false);
  const [showQuatationForm, setShowQuatationForm] = useState(false);
  const [purchesEmpList, setpurchesEmpList] = useState([]);
  const [Quatationdate, setQuatationdate] = useState("");
  const [QuatationTime, setQuatationTime] = useState("");
  const [QuatationReffrencsNo, setQuatationReffrencsNo] = useState("");
  const [QuatationLeadId, setQuatationLeadId] = useState("");
  const [QuatationEmployeeId, setQuatationEmployeeId] = useState([]);
  const [leadId, setLeadId] = useState(null);
  const [showNextFollowUpPopup, setShowNextFollowUpPopup] = useState(false);
  const [newfollowUpdate, setNewfollowUpdate] = useState("");
  const [newfollowRemark, setNewfollowRemark] = useState("");
  const [newSelectStatus, setNewSelectStatus] = useState("");
  const [searchLeadRefNo, setSearchLeadRefNo] = useState("");
  const [planningExecutiveList, setPlanningExecutiveList] = useState([]);
  const [planningExecutivepopup, setPlanningExecutivepopup] = useState(false);
  const [selectedPlanningExecutives, setSelectedPlanningExecutives] = useState(
    []
  );
  const [planningId, setPlanningId] = useState(null);
  const [accountLeadId, setaccountLeadId] = useState(null);
  const [accountExecutivepopup, setAccountExecutivepopup] = useState(false);
  const [accountExecutiveList, setAccountExecutiveList] = useState([]);
  const [selectedAccountExecutive, setSelectedAccountExecutive] =
    useState(null);

  useEffect(() => {
    async function getAllLeads() {
      try {
        const response = await fetch(
          `${BASE_URL}/get/currentuser/lead?userId=${userId}&page=${page}&size=${pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setLeads(data.content || []);
        setTotalPages(data.page.totalPages || 1);
      } catch (error) {
        console.log(error);
      }
    }
    getAllLeads();
  }, [refreshKey, page]);

  async function handleViewCompanyDetail(id) {
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/get/lead/${id}/company/details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setCompanyDetail(response.data);
      setShowCompanyPopup(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleViewEmployeeDetail(id) {
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/get/lead/${id}/company/emp/details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setEmployeeDetail(response.data);
      setShowEmployeePopup(true);
    } catch (error) {
      console.error(error);
    }
  }


  async function handleViewendUserDetail(id) {
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/lead/${id}/end-user-details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setEndUserDetail(response.data);
     setShowEndUserPopup(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleViewLeadNeed(id) {
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/get/lead/${id}/need`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLeadNeedDetail(response.data);
      setShowLeadNeedPopup(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchLeadNote(id) {
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/get/lead/${id}/note`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLeadNote(response.data || "No note available");
      setShowNotePopup(true);
    } catch (error) {
      console.error("Error fetching lead note:", error);
      setLeadNote("Error fetching note. Please try again.");
      setShowNotePopup(true);
    }
  }

  async function handleDeleteLead(id) {
    const deleted = window.confirm("Are you sure you want to delete Lead?");
    if (!deleted) return;
    try {
      const response = await axiosInstance.delete(
        `${BASE_URL}/delete/lead/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Lead deleted successfully");
        setLeads(leads.filter((l) => l.leadId !== id));
      }
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  }

  function handleAddQuatation(id) {
    setQuatationLeadId(id);
    setShowQuatationForm(true);
    setrefreshKey(refreshKey + 1);
  }

  useEffect(() => {
    async function getAllperchesEmployeList() {
      try {
        const response = await axiosInstance.get(
          `${BASE_URL}/purchase/emp/list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setpurchesEmpList(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllperchesEmployeList();
  }, [refreshKey]);

  async function handleSubmitQuatation(e) {
    e.preventDefault();
    const formData = {
      requiredQuatationDate: Quatationdate,
      requiredQuatationTime: QuatationTime,
      quatationReferenceNo: QuatationReffrencsNo,
      purchaseExecutiveIds: QuatationEmployeeId,
      leadId: QuatationLeadId,
    };

    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/quatation/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Quatation added successfully");
        setShowQuatationForm(false);
        setrefreshKey(refreshKey + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

 const formatTime = (time) => {
  // Handle null, undefined, empty string, or invalid time
  if (!time || typeof time !== "string" || !time.includes(":")) {
    return "N/A";   // You can change it to "" if you prefer no display
  }

  const [hoursStr, minutes] = time.split(":");
  const hours = parseInt(hoursStr, 10);

  if (isNaN(hours)) return "N/A";

  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  return `${formattedHours}:${minutes} ${ampm}`;
};


  function handleshowNextFollowUp(id) {
    setLeadId(id);
    setShowNextFollowUpPopup(true);
  }

  async function handleAddnewFollowUp(e) {
    e.preventDefault();
    const formData = {
      followUpDate: newfollowUpdate,
      followUpRemark: newfollowRemark,
    };

    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/add/lead/${leadId}/followups?followUpStatus=${newSelectStatus}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Follow-up added successfully");
        setShowNextFollowUpPopup(false);
        setrefreshKey(refreshKey + 1);
        setNewfollowUpdate("");
        setNewfollowRemark("");
        setNewSelectStatus("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchLead = leads.filter((lead) =>
    lead.leadReferenceNo.toLowerCase().includes(searchLeadRefNo.toLowerCase())
  );

  function handleAddOtherTash(id) {
    navigate(`/other_task/${id}`);
  }

  useEffect(() => {
    async function getAllPlanningExecutiveList() {
      try {
        const response = await axiosInstance.get(
          `${BASE_URL}/get/planning-executive-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setPlanningExecutiveList(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllPlanningExecutiveList();
  }, []);

  function handleShowPlanningExecutive(id) {
    setPlanningExecutivepopup(true);
    setPlanningId(id);
  }

  async function handleDataSendToPlanningExecutive(e) {
    e.preventDefault();
    const body = {
      leadId: planningId,
      planningExecutiveIds: Array.isArray(selectedPlanningExecutives)
        ? selectedPlanningExecutives
        : [selectedPlanningExecutives],
    };

    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/send-enduser-details/with/quatation-details/to/planning-executive`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Data sent to planning executive successfully");
        setPlanningExecutivepopup(false);
        setrefreshKey(refreshKey + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleShowAccountExecutive(id) {
    setAccountExecutivepopup(true);
    setaccountLeadId(id);
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
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDataSendToaccountExecutive(e) {
    e.preventDefault();
    const body = {
      leadId: accountLeadId,
      accountExecutiveId: selectedAccountExecutive,
    };
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/lead/particular-ammount/send/account-executives`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Data sent to account executive successfully");
        setAccountExecutivepopup(false);
        setrefreshKey(refreshKey + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Sales Lead Management
      </h2>

      <div className={styles.lead_search_section}>
        <input
          type="search"
          placeholder="Search By Lead REF No..."
          value={searchLeadRefNo}
          onChange={(e) => {
            setSearchLeadRefNo(e.target.value);
            setPage(0);
          }}
        />
        <div className={styles.Lead_multiple_button}>
          <button onClick={() => navigate("/add_lead")}>Add Lead</button>
        </div>
      </div>

      <div className={styles.lead_management_table_wrapper}>
        <div className={styles.lead_table_scrrol}>
          <table className={styles.lead_management_table}>
            <thead>
              <tr>
                <th>Lead Ref No</th>
                <th>Date</th>
                <th>Time</th>
                <th>RFQ Sent To End User</th>
                <th>Company Details</th>
                <th>Employee Details</th>
                <th>End User Details</th>
                <th>Need</th>
                <th>Note</th>
                <th>RFQ</th>
                <th>Quotation Status</th>
                <th>Actions</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {handleSearchLead.length > 0 ? (
                handleSearchLead.map((lead) => (
                  <tr key={lead.leadId}>
                    <td>{lead.leadReferenceNo}</td>
                    <td>
                      {new Date(lead.leadDate).toLocaleDateString("en-GB")}
                    </td>
                    <td>{formatTime(lead.leadTime)}</td>
                    <td>
                      {lead.isQuatationSendToUser ? "Already Sent" : "Pending"}
                    </td>
                    <td>
                      <button
                        className={styles.viewButton}
                        onClick={() => handleViewCompanyDetail(lead.leadId)}
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <button
                        className={styles.viewButton}
                        onClick={() => handleViewEmployeeDetail(lead.leadId)}
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <button
                        className={styles.viewButton}
                        onClick={() => handleViewendUserDetail(lead.leadId)}
                      >
                        View
                      </button>
                    </td>

                    <td>
                      <button
                        className={styles.viewButton}
                        onClick={() => handleViewLeadNeed(lead.leadId)}
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <button
                        className={styles.viewButton}
                        onClick={() => fetchLeadNote(lead.leadId)}
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleAddQuatation(lead.leadId)}
                        className={
                          lead.isQuatationCreated
                            ? styles.disable_button
                            : styles.viewButton
                        }
                        disabled={lead.isQuatationCreated}
                      >
                        {lead.isQuatationCreated
                          ? "Quatation Added"
                          : "Add Quatation"}
                      </button>
                    </td>
                    <td>
                      {lead.isQuatationCreated
                        ? "Already Sent to Purchase"
                        : "Pending"}
                    </td>
                    <td>
                      <button className={styles.editButton}>Edit</button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDeleteLead(lead.leadId)}
                      >
                        Delete
                      </button>
                    </td>
                    <td className={styles.taskButtonsContainer}>
                      <button
                        className={`${styles.taskButton} ${styles.nextFollowButton}`}
                        onClick={() => handleshowNextFollowUp(lead.leadId)}
                      >
                        Next Follow Up
                      </button>
                      {lead.followUpStatus === "COMPLETED" && (
                        <button
                          className={`${styles.taskButton} ${styles.otherTaskButton}`}
                          onClick={() => handleAddOtherTash(lead.leadId)}
                        >
                          Other Task
                        </button>
                      )}
                      {lead.isVerbalConfirmationTaskCompleted && (
                        <>
                          <button
                            className={`${styles.taskButton} ${styles.planningButton}`}
                            onClick={() =>
                              handleShowPlanningExecutive(lead.leadId)
                            }
                          >
                            Sent To Planning
                          </button>
                          <button
                            className={`${styles.taskButton} ${styles.accountButton}`}
                            onClick={() =>
                              handleShowAccountExecutive(lead.leadId)
                            }
                          >
                            Sent To Account
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12">No leads found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.pagination}>
        <button
          disabled={page === 0}
          onClick={() => setPage((prev) => prev - 1)}
          className={page === 0 ? styles.disabledButton : ""}
        >
          ⬅ Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index)}
            className={page === index ? styles.activePage : ""}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className={page + 1 >= totalPages ? styles.disabledButton : ""}
        >
          Next ➡
        </button>
      </div>

      {showCompanyPopup && companyDetail && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <h3>Company Details</h3>
            <p>
              <strong>Company Name:</strong>{" "}
              {companyDetail.companyName || "N/A"}
            </p>
            <p>
              <strong>Head Office:</strong>{" "}
              {companyDetail.headOfOffice || "N/A"}
            </p>
            <p>
              <strong>Easy Hub Centre:</strong>{" "}
              {companyDetail.easyHubCentre || "N/A"}
            </p>
            <p>
              <strong>State:</strong> {companyDetail.state || "N/A"}
            </p>
            <button
              className={styles.closeButton}
              onClick={() => setShowCompanyPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      
      {showEmployeePopup && employeeDetail && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <h3>Employee Details</h3>
            <p>
              <strong>Employee Name:</strong>{" "}
              {employeeDetail.employeeName || "N/A"}
            </p>
            <p>
              <strong>Designation:</strong>{" "}
              {employeeDetail.designation || "N/A"}
            </p>
            <p>
              <strong>Department:</strong> {employeeDetail.department || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {employeeDetail.mailId || "N/A"}
            </p>
            <p>
              <strong>Contact No:</strong> {employeeDetail.contactNo || "N/A"}
            </p>
            <p>
              <strong>LandLine No:</strong> {employeeDetail.landLineNo || "N/A"}
            </p>
            <button
              className={styles.closeButton}
              onClick={() => setShowEmployeePopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
{showEndUserPopup && endUserDetail && (
  <div className={styles.popupOverlay}>
    <div className={styles.popupContent}>
      <h3>End User Details</h3>
      <p><strong>UserName:</strong> {endUserDetail.userName || "N/A"}</p>
      <p><strong>Department:</strong> {endUserDetail.department || "N/A"}</p>
      <p><strong>Designation:</strong> {endUserDetail.designation || "N/A"}</p>
      <p><strong>Contact No:</strong> {endUserDetail.contactNo || "N/A"}</p>
      <p><strong>Land Line No:</strong> {endUserDetail.landLineNo || "N/A"}</p>
      <p><strong>Mail Id:</strong> {endUserDetail.mailId || "N/A"}</p>

      <button
        className={styles.closeButton}
        onClick={() => setShowEndUserPopup(false)}
      >
        Close
      </button>
    </div>
  </div>
)}


      {showLeadNeedPopup && leadNeedDetail && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <h3>Lead Need Details</h3>
            <p>
              <strong>Source:</strong> {leadNeedDetail.source || "N/A"}
            </p>
            <p>
              <strong>Destination:</strong>{" "}
              {leadNeedDetail.destination || "N/A"}
            </p>
            <p>
              <strong>Commodity:</strong> {leadNeedDetail.commodity || "N/A"}
            </p>
            <p>
              <strong>Commodity Value:</strong>{" "}
              {leadNeedDetail.commodityValue || "N/A"}
            </p>
            <p>
              <strong>Weight:</strong> {leadNeedDetail.weight || "N/A"}
            </p>
            <p>
              <strong>Size:</strong> {leadNeedDetail.size || "N/A"}
            </p>
            <p>
              <strong>Type of Transportation:</strong>{" "}
              {leadNeedDetail.typeOfTransporatation || "N/A"}
            </p>
            <p>
              <strong>Size of Transportation:</strong>{" "}
              {leadNeedDetail.sizeOfTransporatation || "N/A"}
            </p>
            <p>
              <strong>Good Transport:</strong>{" "}
              {leadNeedDetail.goodTransport || "N/A"}
            </p>
            <p>
              <strong>Car Transport:</strong>{" "}
              {leadNeedDetail.carTransport || "N/A"}
            </p>
            <p>
              <strong>Car Moving Date:</strong>
              {leadNeedDetail.carMovingDate
                ? new Date(leadNeedDetail.carMovingDate).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      timeZone: "Asia/Kolkata",
                    }
                  )
                : "N/A"}
            </p>
            <p>
              <strong>Car Moving Time:</strong>
              {leadNeedDetail.carMovingTime
                ? new Date(
                    `1970-01-01T${leadNeedDetail.carMovingTime}`
                  ).toLocaleTimeString("en-IN", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                    timeZone: "Asia/Kolkata",
                  })
                : "N/A"}
            </p>
            <p>
              <strong>Vehicle Value:</strong>{" "}
              {leadNeedDetail.vehicleValue || "N/A"}
            </p>
            <p>
              <strong>Insurance Facility:</strong>{" "}
              {leadNeedDetail.insuranceFacilityOfGoods || "N/A"}
            </p>
            <p>
              <strong>When We Get Goods:</strong>{" "}
              {leadNeedDetail.whenWeGetGoods || "N/A"}
            </p>
            <p>
              <strong>Any Other Warehouse Facility:</strong>{" "}
              {leadNeedDetail.anyWareHouseFacilityRatherThanThisThings || "N/A"}
            </p>
            <p>
              <strong>Anything Else:</strong>{" "}
              {leadNeedDetail.anyThingsElseRatherThanGood || "N/A"}
            </p>
            <p>
              <strong>Other Services:</strong>{" "}
              {leadNeedDetail.otherServices || "N/A"}
            </p>
            <p>
              <strong>Risk Coverage (Goods):</strong>{" "}
              {leadNeedDetail.riskCoverageGood || "N/A"}
            </p>
            <p>
              <strong>Moving Date & Time:</strong>{" "}
              {leadNeedDetail.movingDateAndTime
                ? new Date(leadNeedDetail.movingDateAndTime).toLocaleString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                      timeZone: "Asia/Kolkata",
                    }
                  )
                : "N/A"}
            </p>
            <p>
              <strong>Receiving Date & Time:</strong>{" "}
              {leadNeedDetail.receivingDateAndTime
                ? new Date(leadNeedDetail.receivingDateAndTime).toLocaleString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                      timeZone: "Asia/Kolkata",
                    }
                  )
                : "N/A"}
            </p>
            {leadNeedDetail.additionalNeed &&
              leadNeedDetail.additionalNeed.length > 0 && (
                <>
                  <h4>Additional Needs</h4>
                  <ul>
                    {leadNeedDetail.additionalNeed.map((need, index) => (
                      <li key={need.additionalNeedId || index}>
                        {need.needName ? (
                          <>
                            <strong>{need.needName}:</strong>{" "}
                            {need.needValue || "N/A"}
                          </>
                        ) : (
                          <span>
                            <strong>Unnamed Additional Need:</strong> No details
                            available
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            <button
              className={styles.closeButton}
              onClick={() => setShowLeadNeedPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showNotePopup && leadNote && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <h3>Lead Note</h3>
            <p>
              <strong>Remark:</strong> {leadNote.remark || "N/A"}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(leadNote.date).toLocaleDateString() || "N/A"}
            </p>
            <p>
              <strong>Time:</strong> {leadNote.time || "N/A"}
            </p>
            <p>
              <strong>Rating:</strong> {leadNote.rating || "N/A"}
            </p>
            {leadNote.followUps && leadNote.followUps.length > 0 && (
              <>
                <h4 className={styles.followup_heading}>Follow-ups</h4>
                {leadNote.followUpStatus && (
                  <p className={styles.followup_status}>
                    <strong>Status:</strong> {leadNote.followUpStatus}
                  </p>
                )}
                <div className={styles.followup_table_container}>
                  <table className={styles.followup_table}>
                    <thead>
                      <tr>
                        <th>Follow-up Date</th>
                        <th>Remark</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leadNote.followUps.map((followUp, index) => (
                        <tr key={followUp.followUpId || index}>
                          <td>
                            {followUp.followUpDate
                              ? new Date(
                                  followUp.followUpDate
                                ).toLocaleDateString("en-IN", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  timeZone: "Asia/Kolkata",
                                })
                              : "N/A"}
                          </td>
                          <td>{followUp.followUpRemark || "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
            <button
              className={styles.closeButton}
              onClick={() => setShowNotePopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showQuatationForm && (
        <div className={styles.quatationOverlay}>
          <div className={styles.quatationPopup}>
            <button
              className={styles.quatationCloseButton}
              onClick={() => setShowQuatationForm(false)}
            >
              ✖
            </button>
            <p className={styles.quatationPopupTitle}>Quotation Form</p>
            <form
              className={styles.quatationForm}
              onSubmit={handleSubmitQuatation}
            >
              <label>Quotation Required Date</label>
              <input
                type="date"
                className={styles.quatationInput}
                value={Quatationdate}
                onChange={(e) => setQuatationdate(e.target.value)}
                required
              />
              <label>Quotation Required Time</label>
              <input
                type="time"
                className={styles.quatationInput}
                value={QuatationTime}
                onChange={(e) => setQuatationTime(e.target.value)}
                required
              />
              <label>Quotation Reference No</label>
              <input
                type="text"
                placeholder="Quotation Reference No"
                className={styles.quatationInput}
                value={QuatationReffrencsNo}
                onChange={(e) => setQuatationReffrencsNo(e.target.value)}
                required
              />
              <label>Referred to Purchase Executive</label>
              <select
                multiple
                value={QuatationEmployeeId}
                onChange={(e) =>
                  setQuatationEmployeeId(
                    [...e.target.selectedOptions].map((opt) => opt.value)
                  )
                }
                required
              >
                <option value="" disabled>
                  Select Employee
                </option>
                {purchesEmpList.length > 0 ? (
                  purchesEmpList.map((emp) => (
                    <option key={emp.userId} value={emp.userId}>
                      {emp.userName}
                    </option>
                  ))
                ) : (
                  <option disabled>No Employee available</option>
                )}
              </select>
              <button type="submit" className={styles.quatationSubmitButton}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {showNextFollowUpPopup && (
        <div className={styles.nextfollwuppopupOverlay}>
          <div className={styles.nextfollwuppopupContent}>
            <div className={styles.nextfollwupbuttonGroup}>
              <button
                type="button"
                className={styles.nextfollwupcloseButton}
                onClick={() => setShowNextFollowUpPopup(false)}
              >
                Close
              </button>
            </div>
            <h3 className={styles.nextfollwuppopupTitle}>Next Follow Up</h3>
            <form
              className={styles.nextFollowupForm}
              onSubmit={handleAddnewFollowUp}
            >
              <label>
                Next Follow Up Date:
                <input
                  type="date"
                  value={newfollowUpdate}
                  onChange={(e) => setNewfollowUpdate(e.target.value)}
                  required
                />
              </label>
              <label>
                Next Follow Up Remark:
                <input
                  type="text"
                  placeholder="Enter remark"
                  value={newfollowRemark}
                  onChange={(e) => setNewfollowRemark(e.target.value)}
                  required
                />
              </label>
              <label>
                Select Status:
                <select
                  value={newSelectStatus}
                  onChange={(e) => setNewSelectStatus(e.target.value)}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="ONGOING">ONGOING</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </label>
              <div className={styles.nextfollwupbuttonGroup}>
                <button
                  type="submit"
                  className={styles.nextfollwupsubmitButton}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {planningExecutivepopup && (
        <div className={styles.planningexecutive_name_container_overlay}>
          <div className={styles.planningexecutive_name_container_popup}>
            <button
              className={styles.planningexecutive_name_container_closeBtn}
              onClick={() => setPlanningExecutivepopup(false)}
            >
              ×
            </button>
            <h3 className={styles.planningexecutive_name_container_title}>
              Select Planning Executives
            </h3>
            <form onSubmit={handleDataSendToPlanningExecutive}>
              <select
                className={styles.planningexecutive_name_container_select}
                multiple
                value={selectedPlanningExecutives}
                onChange={(e) =>
                  setSelectedPlanningExecutives(
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
              >
                {planningExecutiveList.length > 0 ? (
                  planningExecutiveList.map((planningEmp) => (
                    <option value={planningEmp.userId} key={planningEmp.userId}>
                      {planningEmp.userName}
                    </option>
                  ))
                ) : (
                  <option disabled>No Planning Executive available</option>
                )}
              </select>
              <button
                type="submit"
                className={styles.planningexecutive_name_container_submitBtn}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {accountExecutivepopup && (
        <div className={styles.planningexecutive_name_container_overlay}>
          <div className={styles.planningexecutive_name_container_popup}>
            <button
              className={styles.planningexecutive_name_container_closeBtn}
              onClick={() => setAccountExecutivepopup(false)}
            >
              ×
            </button>
            <h3 className={styles.planningexecutive_name_container_title}>
              Select Account Executives
            </h3>
            <form onSubmit={handleDataSendToaccountExecutive}>
              <select
                className={styles.planningexecutive_name_container_select}
                value={selectedAccountExecutive}
                onChange={(e) => setSelectedAccountExecutive(e.target.value)}
              >
                <option value="">Select Account Executive</option>
                {accountExecutiveList.length > 0 ? (
                  accountExecutiveList.map((planningEmp) => (
                    <option value={planningEmp.userId} key={planningEmp.userId}>
                      {planningEmp.userName}
                    </option>
                  ))
                ) : (
                  <option disabled>No Account Executive available</option>
                )}
              </select>
              <button
                type="submit"
                className={styles.planningexecutive_name_container_submitBtn}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default SalesLeadManegment;
