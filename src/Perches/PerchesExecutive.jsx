import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import "../Perches/perchesexecutive.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

function PerchesExecutive() {
  const navigate = useNavigate();
  const [quatationId, setQuatationId] = useState(null);
  const token = JSON.parse(localStorage.getItem("mexcargoUserData"))?.token;

  const [quotationData, setQuotationData] = useState([]);
  const [sortingallQuotationData, setsortingallQuotationData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [QuatationMasterId, setQuatationMasterId] = useState(null);
  const [showmasterresponseform, setShowMasterResponseForm] = useState(false);
  const [originalPackageCost, setOriginalPackageCost] = useState("");
  const [originalTrsCost, setOriginalTrsCost] = useState("");
  const [originalCarServiceCost, setOriginalCarServiceCost] = useState("");
  const [originalAdditionalCost, setOriginalAdditionalCost] = useState("");
  const [finalPackageCost, setFinalPackageCost] = useState("");
  const [finalTrsCost, setFinalTrsCost] = useState("");
  const [finalCarServiceCost, setFinalCarServiceCost] = useState("");
  const [finalAdditionalCost, setFinalAdditionalCost] = useState("");
  const [showPricingList, setShowPricingList] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [pricingList, setPricingList] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [myQuatationId, setMyQuatationId] = useState(null);
  const [showPricingMember, setshowPricingMember] = useState(false);
  const [pricingMemberData, setpricingMemberData] = useState("");

  const [formData, setFormData] = useState({
    originalPackageCost: "",
    originalTrsCost: "",
    originalCarServiceCost: "",
    originalAdditionalCost: "",
    finalPackageCost: "",
    finalTrsCost: "",
    finalCarServiceCost: "",
    finalAdditionalCost: "",
  });

  useEffect(() => {
    async function getallQuatationFromSales() {
      try {
        const response = await axiosInstance.get(
          `${BASE_URL}/purchaseexecutive/quatation/data`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);

        const sortedData = [...response.data].sort((a, b) => {
          return new Date(b.carMovingDate) - new Date(a.carMovingDate);
        });

        setQuotationData(sortedData);
        setsortingallQuotationData(sortedData);
      } catch (error) {
        console.error(error);
      }
    }

    getallQuatationFromSales();
  }, []);

  const formatToIST = (dateStr, timeStr) => {
    let dateTime;

    if (timeStr) {
      dateTime = new Date(`${dateStr}T${timeStr}`);
    } else {
      dateTime = new Date(dateStr);
    }

    if (isNaN(dateTime)) return "-";

    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-GB", options).format(dateTime);
  };

  function handlepassmasterId(id, quatationId) {
    // alert(`${id}, ${quatationId}`);
    navigate(`/masterpage/${id}/${quatationId}`);
  }
  async function handleViewMaster(id) {
    setQuatationId(id);
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/get/quatation/${id}/master`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setMasterData(response.data);
      setShowPopup(true);
    } catch (error) {
      console.log(error);
    }
  }

  function handleAddmasterQuatation(id) {
    // alert(id);
    setQuatationMasterId(id);
    setShowMasterResponseForm(true);
  }

  async function handleAddmasterResponse(e) {
    e.preventDefault();
    // console.log(first);
    const formData = {
      // quotationMasterId: quatationId,
      // masterId: masterId,
      quotationMasterId: QuatationMasterId,
      originalPackageCost: originalPackageCost.replace(/,/g, ""),
      originalTrsCost: originalTrsCost.replace(/,/g, ""),
      originalCarServiceCost: originalCarServiceCost.replace(/,/g, ""),
      originalAdditionalCost: originalAdditionalCost.replace(/,/g, ""),
      finalPackageCost: finalPackageCost.replace(/,/g, ""),
      finalTrsCost: finalTrsCost.replace(/,/g, ""),
      finalCarServiceCost: finalCarServiceCost.replace(/,/g, ""),
      finalAdditionalCost: finalAdditionalCost.replace(/,/g, ""),
    };
    console.log(formData);
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/purchaseexecutive/quatation/add/master-response`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.status === 201) {
        alert("Master response added successfully.");
        setShowMasterResponseForm(false);
        setOriginalPackageCost("");
        setOriginalTrsCost("");
        setOriginalCarServiceCost("");
        setOriginalAdditionalCost("");
        setFinalPackageCost("");
        setFinalTrsCost("");
        setFinalCarServiceCost("");
        setFinalAdditionalCost("");
      } else {
        alert("Failed to add master response.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleviewmasterResponseSend(id) {
    navigate(`/sendresponsemater/${quatationId}/${id}`);
  }

  useEffect(() => {
    async function getAllPricingList() {
      try {
        const response = await axiosInstance.get(
          `${BASE_URL}/get/pricing/emp/list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setPricingList(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllPricingList();
  }, []);
  function handleSendtoPricing(id) {
    setMyQuatationId(id);
    setShowPricingList(true);
  }
  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedUsers(selectedOptions);
  };

  const handleSubmitSendToPricing = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const formData = {
      quatationId: myQuatationId,
      pricingIds: selectedUsers,
    };
    console.log(formData);
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/purchaseexecutive/quatation/send-to-pricing-executive`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Quotation sent to pricing executive successfully.");
        setShowPricingList(false);
        setSelectedUsers([]);
      } else {
        alert("Failed to send quotation to pricing executive.");
      }
    } catch (error) {
      console.error("Failed to send to pricing:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  async function handleShowAllPrincingMember(id) {
    setshowPricingMember(true);
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/purchaseexecutive/quatation/${id}/list-pricing-excutive`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setpricingMemberData(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  function handleClickNewQuatation(myquatationStatus) {
    if (myquatationStatus === "All") {
      setQuotationData(sortingallQuotationData);
    } else {
      const response = sortingallQuotationData.filter((item) => {
        return item.quatationStatus === myquatationStatus;
      });
      console.log(response);
      setQuotationData(response);
    }
  }

  return (
    <>
      <div className="search_button_container">
        <button onClick={() => handleClickNewQuatation("All")}>
          All Quatation
        </button>
        <button onClick={() => handleClickNewQuatation("QUOTATION_CREATED")}>
          New Quatation
        </button>
        <button
          onClick={() => handleClickNewQuatation("SENT_TO_SERVICE_PROVIDERS")}
        >
          Send To Master
        </button>
        <button
          onClick={() => handleClickNewQuatation("SENT_TO_PRICING_EXECUTIVE")}
        >
          Send To Pricing
        </button>
      </div>

      <div className="purchaseexecutive-wrapper">
        <h1 className="purchaseexecutive-page-title">Purchase Quotations</h1>
        <div className="purchaseexecutive-container">
          {quotationData.length > 0 ? (
            quotationData.map((quotation, index) => (
              <div key={index} className="purchaseexecutive-card">
                <div className="purchaseexecutive-card-header">
                  <div className="purchaseexecutive-header-left">
                    <h2 className="purchaseexecutive-card-title">
                      Quotation #{quotation.quatationId}
                    </h2>
                    <span className="purchaseexecutive-card-subtitle">
                      Ref: {quotation.quatationReferenceNo}
                    </span>
                  </div>
                  <div className="view_add_vutton">
                    <button
                      className="purchaseexecutive-add-btn"
                      onClick={() =>
                        handlepassmasterId(
                          quotation.leadId,
                          quotation.quatationId
                        )
                      }
                    >
                      Send To Master
                    </button>{" "}
                    <button
                      className="purchaseexecutive-add-btn"
                      onClick={() => handleViewMaster(quotation.quatationId)}
                    >
                      view Master Member
                    </button>
                    <button
                      className="purchaseexecutive-add-btn"
                      onClick={() => handleSendtoPricing(quotation.quatationId)}
                    >
                      Send To Pricing
                    </button>
                    <button
                      className=" purchaseexecutive-add-btn"
                      onClick={() =>
                        handleShowAllPrincingMember(quotation.quatationId)
                      }
                    >
                      View Pricing Member
                    </button>
                  </div>
                </div>

                {/* <div className="purchaseexecutive-card-body">
                  <div className="purchaseexecutive-route-section">
                  
                    <div className="purchaseexecutive-route-details">
                      <span className="purchaseexecutive-route-from">
                        {quotation.source}
                      </span>
                      <span> TO </span>
                      <span className="purchaseexecutive-route-to">
                        {quotation.destination}
                      </span>
                    </div>
                  </div>

                  <div className="purchaseexecutive-details-grid">
                    <div className="purchaseexecutive-detail-item">
                      <span className="purchaseexecutive-label">Lead ID:</span>
                      <span className="purchaseexecutive-value">
                        {quotation.leadId}
                      </span>
                    </div>
                    <div className="purchaseexecutive-detail-item">
                      <span className="purchaseexecutive-label">Lead Ref:</span>
                      <span className="purchaseexecutive-value">
                        {quotation.leadReferenceNo}
                      </span>
                    </div>
                    <div className="purchaseexecutive-detail-item">
                      <span className="purchaseexecutive-label">
                        commodity:
                      </span>
                      <span className="purchaseexecutive-value">
                        {quotation.commodity}
                      </span>
                    </div>
                    <div className="purchaseexecutive-detail-item">
                      <span className="purchaseexecutive-label">
                        commodity Size:
                      </span>
                      <span className="purchaseexecutive-value">
                        {quotation.size}
                      </span>
                    </div>
                    <div className="purchaseexecutive-detail-item">
                      <span className="purchaseexecutive-label">
                        commodity Weight:
                      </span>
                      <span className="purchaseexecutive-value">
                        {quotation.weight}
                      </span>
                    </div>
                    <div className="purchaseexecutive-detail-item">
                      <span className="purchaseexecutive-label">
                        Commodity Moving Date & Time:
                      </span>
                      <span className="purchaseexecutive-value">
                        {formatToIST(quotation.movingDateAndTime)}
                      </span>
                    </div>
                    <div className="purchaseexecutive-detail-item">
                      <span className="purchaseexecutive-label">
                        Car Transport:
                      </span>
                      <span className="purchaseexecutive-value">
                        {quotation.carTransport}
                      </span>
                    </div>
                    <div className="purchaseexecutive-detail-item">
                      <span className="purchaseexecutive-label">
                        Car Moving Date:
                      </span>
                      <span className="purchaseexecutive-value">
                        {quotation.carMovingDate}
                      </span>
                    </div>
                    <div className="purchaseexecutive-detail-item">
                      <span className="purchaseexecutive-label">
                        Car Moving Time:
                      </span>
                      <span className="purchaseexecutive-value">
                        {quotation.carMovingTime}
                      </span>
                    </div>
                    <div className="purchaseexecutive-detail-item">
                      <span className="purchaseexecutive-label">
                        Other Services:
                      </span>
                      <span className="purchaseexecutive-value">
                        {quotation.otherServices}
                      </span>
                    </div>

                    <div className="purchaseexecutive-detail-item">
                      <span className="purchaseexecutive-label">Required:</span>
                      <span className="purchaseexecutive-value">
                      {formatToIST(quotation.requiredQuatationDate, quotation.requiredQuatationTime)}

                      </span>
                    </div>
                    <div className="purchaseexecutive-detail-item">
                      <span className="purchaseexecutive-label">Recevied:</span>
                      <span className="purchaseexecutive-value">
                        {formatToIST(
                          quotation.receivingQuatationDate,
                          quotation.receivingQuationTime
                        )}
                      </span>
                    </div>
                  </div>
                </div> */}

                <div className="purchaseexecutive-card-body">
                  <div className="purchaseexecutive-route-section">
                    <div className="purchaseexecutive-route-details">
                      <span className="purchaseexecutive-route-from">
                        {quotation.source}
                      </span>
                      <span> TO </span>
                      <span className="purchaseexecutive-route-to">
                        {quotation.destination}
                      </span>
                    </div>
                  </div>

                  <div className="purchaseexecutive-details-grid">
                    <div className="purchaseexecutive-detail-item">
                      <span className="purchaseexecutive-label">Lead ID:</span>
                      <span className="purchaseexecutive-value">
                        {quotation.leadId}
                      </span>
                    </div>
                    <div className="purchaseexecutive-detail-item">
                      <span className="purchaseexecutive-label">Lead Ref:</span>
                      <span className="purchaseexecutive-value">
                        {quotation.leadReferenceNo}
                      </span>
                    </div>
                    <div className="purchaseexecutive-detail-item">
                      <span className="purchaseexecutive-label">
                        Commodity:
                      </span>
                      <span className="purchaseexecutive-value">
                        {quotation.commodity}
                      </span>
                    </div>
                    <div className="purchaseexecutive-detail-item">
                      <span className="purchaseexecutive-label">
                        Commodity Size:
                      </span>
                      <span className="purchaseexecutive-value">
                        {quotation.size}
                      </span>
                    </div>
                    <div className="purchaseexecutive-detail-item">
                      <span className="purchaseexecutive-label">
                        Commodity Weight:
                      </span>
                      <span className="purchaseexecutive-value">
                        {quotation.weight}
                      </span>
                    </div>
                    <div className="purchaseexecutive-detail-item">
                      <span className="purchaseexecutive-label">
                        Commodity Moving Date & Time:
                      </span>
                      <span className="purchaseexecutive-value">
                        {formatToIST(quotation.movingDateAndTime)}
                      </span>
                    </div>
                    <div className="purchaseexecutive-detail-item">
                      <span className="purchaseexecutive-label">
                        Car Transport:
                      </span>
                      <span className="purchaseexecutive-value">
                        {quotation.carTransport}
                      </span>
                    </div>
                    <div className="purchaseexecutive-detail-item">
                      <span className="purchaseexecutive-label">
                        Car Moving Date:
                      </span>
                      <span className="purchaseexecutive-value">
                        {formatToIST(quotation.carMovingDate)}
                      </span>
                    </div>
                    <div className="purchaseexecutive-detail-item">
                      <span className="purchaseexecutive-label">
                        Car Moving Time:
                      </span>
                      <span className="purchaseexecutive-value">
                        {formatToIST(
                          quotation.carMovingDate,
                          quotation.carMovingTime
                        )}
                      </span>
                    </div>
                    <div className="purchaseexecutive-detail-item">
                      <span className="purchaseexecutive-label">
                        Other Services:
                      </span>
                      <span className="purchaseexecutive-value">
                        {quotation.otherServices}
                      </span>
                    </div>
                    <div className="purchaseexecutive-detail-item">
                      <span className="purchaseexecutive-label">Required:</span>
                      <span className="purchaseexecutive-value">
                        {formatToIST(
                          quotation.requiredQuatationDate,
                          quotation.requiredQuatationTime
                        )}
                      </span>
                    </div>
                    <div className="purchaseexecutive-detail-item">
                      <span className="purchaseexecutive-label">Received:</span>
                      <span className="purchaseexecutive-value">
                        {formatToIST(
                          quotation.receivingQuatationDate,
                          quotation.receivingQuationTime
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="purchaseexecutive-loading-container">
              <div className="purchaseexecutive-loading-spinner"></div>
              <span>Loading Quotations...</span>
            </div>
          )}
        </div>
      </div>

      {showPopup && (
        <div className="masterpage-popup-overlay">
          <div className="masterpage-popup">
            <div className="masterpage-popup-header">
              <h3>Master Details</h3>
              <button
                onClick={() => setShowPopup(false)}
                className="masterpage-close-btn"
              >
                ×
              </button>
            </div>
            <div className="masterpage-popup-content">
              {masterData.map((item, index) => (
                <div key={index} className="masterpage-popup-card">
                  <p>
                    <button
                      className="masterpage-popup-card_button"
                      onClick={() =>
                        handleAddmasterQuatation(item.quotationMasterId)
                      }
                    >
                      Add master Response
                    </button>
                  </p>
                  <p>
                    <button
                      className="masterpage-popup-card_button"
                      onClick={() =>
                        handleviewmasterResponseSend(item.quotationMasterId)
                      }
                    >
                      View master Response
                    </button>
                  </p>

                  <p>
                    <strong>Associate Code:</strong>{" "}
                    <span>{item.associateCode}</span>
                  </p>
                  <p>
                    <strong>Service Sector:</strong>{" "}
                    <span>{item.serviceSector}</span>
                  </p>
                  <p>
                    <strong>Company:</strong> <span>{item.companyName}</span>
                  </p>
                  <p>
                    <strong>Contact:</strong> <span>{item.contactName}</span>
                  </p>
                  <p>
                    <strong>Hub:</strong> <span>{item.hub}</span>
                  </p>
                  {item.contactNumber && (
                    <p>
                      <strong>Phone:</strong> <span>{item.contactNumber}</span>
                    </p>
                  )}
                  {item.emailId && (
                    <p>
                      <strong>Email:</strong> <span>{item.emailId}</span>
                    </p>
                  )}
                  {item.location && (
                    <p>
                      <strong>Location:</strong> <span>{item.location}</span>
                    </p>
                  )}
                  {item.state && (
                    <p>
                      <strong>State:</strong> <span>{item.state}</span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showmasterresponseform && (
        <div className="responseformmaster-overlay">
          <div className="responseformmaster-popup">
            <div className="responseformmaster-header">
              <h3>Master Response Form</h3>
              <button
                onClick={() => setShowMasterResponseForm(false)}
                className="responseformmaster-close-btn"
              >
                ×
              </button>
            </div>

            <form
              className="responseformmaster-content"
              onSubmit={handleAddmasterResponse}
            >
              <h4>Original Costs</h4>
              <input
                type="text"
                value={originalPackageCost}
                onChange={(e) => setOriginalPackageCost(e.target.value)}
                placeholder="Original Package Cost"
                className="responseformmaster-input"
              />
              <input
                type="text"
                value={originalTrsCost}
                onChange={(e) => setOriginalTrsCost(e.target.value)}
                placeholder="Original TRS Cost"
                className="responseformmaster-input"
              />
              <input
                type="text"
                value={originalCarServiceCost}
                onChange={(e) => setOriginalCarServiceCost(e.target.value)}
                placeholder="Original Car Service Cost"
                className="responseformmaster-input"
              />
              <input
                type="text"
                value={originalAdditionalCost}
                onChange={(e) => setOriginalAdditionalCost(e.target.value)}
                placeholder="Original Additional Cost"
                className="responseformmaster-input"
              />

              <h4>Final Costs</h4>
              <input
                type="text"
                value={finalPackageCost}
                onChange={(e) => setFinalPackageCost(e.target.value)}
                placeholder="Final Package Cost"
                className="responseformmaster-input"
              />
              <input
                type="text"
                value={finalTrsCost}
                onChange={(e) => setFinalTrsCost(e.target.value)}
                placeholder="Final TRS Cost"
                className="responseformmaster-input"
              />
              <input
                type="text"
                value={finalCarServiceCost}
                onChange={(e) => setFinalCarServiceCost(e.target.value)}
                placeholder="Final Car Service Cost"
                className="responseformmaster-input"
              />
              <input
                type="text"
                value={finalAdditionalCost}
                onChange={(e) => setFinalAdditionalCost(e.target.value)}
                placeholder="Final Additional Cost"
                className="responseformmaster-input"
              />

              <button type="submit" className="responseformmaster-submit-btn">
                Submit Response
              </button>
            </form>
          </div>
        </div>
      )}

      {showPricingList && (
        <div className="sendresponsemater-overlay">
          <div className="sendresponsemater-pricing-list">
            <h2 className="sendresponsemater-pricing-list-title">
              Pricing List
            </h2>

            <form onSubmit={handleSubmitSendToPricing}>
              <div className="sendresponsemater-multiselect-wrapper">
                <label htmlFor="pricing-users">Select Users:</label>
                <select
                  id="pricing-users"
                  multiple
                  value={selectedUsers}
                  onChange={handleSelectChange}
                  className="sendresponsemater-multiselect"
                >
                  {pricingList.map((pricing) => (
                    <option key={pricing.userId} value={pricing.userId}>
                      {pricing.userName}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ textAlign: "right", marginTop: "1rem" }}>
                <button
                  className="sendresponsemater-close-pricing-list"
                  type="button"
                  onClick={() => setShowPricingList(false)}
                >
                  Close
                </button>
                <button
                  className="sendresponsemater-send-to-pricing-btn"
                  type="submit"
                  disabled={selectedUsers.length === 0}
                >
                  {isUpdating ? "Sending..." : "Send to Pricing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showPricingMember && (
        <div className="showallpricingmemberCard">
          <button
            className="close-btn"
            onClick={() => setshowPricingMember(false)}
          >
            ✕
          </button>
          <h3>Pricing Members</h3>
          {pricingMemberData.length > 0 ? (
            <div className="member-grid">
              {pricingMemberData.map((member, index) => (
                <div key={index} className="member-card">
                  <p>
                    <strong>Name:</strong> {member.userName}
                  </p>
                  <p>
                    <strong>Email:</strong> {member.email}
                  </p>
                  <p>
                    <strong>Mobile:</strong> {member.mobileNumber}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {member.quatationForwardDate
                      ? new Date(
                          member.quatationForwardDate
                        ).toLocaleDateString("en-GB")
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Time:</strong>{" "}
                    {member.quatationForwardTime || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No pricing members found.</p>
          )}
        </div>
      )}
    </>
  );
}

export default PerchesExecutive;
