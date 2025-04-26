import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import "./pricingdetail.css";
import axiosInstance from "../utils/axiosInstance";

function PricingDetail() {
  const { id } = useParams();
  const [pricingDetail, setPricingDetail] = useState([]);
  const [finalpriceformShow, setfinalpriceformShow] = useState(false);
  const token = JSON.parse(localStorage.getItem("mexcargoUserData"))?.token;
  const [analyzePackageCost, setAnalyzePackageCost] = useState("");
  const [analyzeTrsCost, setAnalyzeTrsCost] = useState("");
  const [analyzeCarServiceCost, setAnalyzeCarServiceCost] = useState("");
  const [analyzeAdditionalServiceCost, setAnalyzeAdditionalServiceCost] =
    useState("");
  const [showfinalpricecard, setshowfinalpricecard] = useState(false);
  const [finalPriceCard, setfinalPriceCard] = useState({});
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    async function getPricingDataWithMaterResponse() {
      try {
        const response = await axiosInstance.get(
          `${BASE_URL}/pricingexceutive/quatation/${id}/get/masters-with-response`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setPricingDetail(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getPricingDataWithMaterResponse();
  }, [id]);

  function handleShowFinalFormShow() {
    setfinalpriceformShow(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      analyzePackageCost,
      analyzeTrsCost,
      analyzeCarServiceCost,
      analyzeAdditionalServiceCost,
    };

    try {
      let response;
      if (isUpdateMode && editingId) {
        response = await axiosInstance.put(
          `${BASE_URL}/pricingexceutive/quatation/${editingId}/update-analyze-pricing`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        response = await axiosInstance.post(
          `${BASE_URL}/pricingexceutive/quatation/${id}/add-analyze-pricing`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (response.status === 200) {
        alert(
          isUpdateMode ? "Updated Successfully" : "Cost Added Successfully"
        );
        setfinalpriceformShow(false);
        setIsUpdateMode(false);
        setEditingId(null);
        handleviewFinalPrice();
        setAnalyzePackageCost("");
        setAnalyzeTrsCost("");
        setAnalyzeCarServiceCost("");
        setAnalyzeAdditionalServiceCost("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function handleviewFinalPrice() {
    setshowfinalpricecard(true);
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/get/quatation/${id}/analyze-pricing`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setfinalPriceCard(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleUpdatefinalprice(id) {
    setIsUpdateMode(true);
    setfinalpriceformShow(true);
    setEditingId(id);
    setAnalyzePackageCost(finalPriceCard.analyzePackageCost || "");
    setAnalyzeTrsCost(finalPriceCard.analyzeTrsCost || "");
    setAnalyzeCarServiceCost(finalPriceCard.analyzeCarServiceCost || "");
    setAnalyzeAdditionalServiceCost(
      finalPriceCard.analyzeAdditionalServiceCost || ""
    );
  }

  async function handleSendToSales(id) {
    // alert(id);

    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/pricingexceutive/quatation/${id}/analyze-pricing/send-to-creator`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        alert(" Price Sent To Sales Executive Successfully");
        setshowfinalpricecard(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="final_pricing_container">
        <button onClick={handleShowFinalFormShow}>
          Add Price By Pricing Executive{" "}
        </button>
        <button onClick={handleviewFinalPrice}>
          {" "}
          View Final Price Added By Pricing Executive
        </button>
      </div>
      {finalpriceformShow && (
        <>
          <div className="addfinalprice-overlay">
            <div className="addfinalprice-modal">
              <div className="addfinalprice-header">
                <p>Final Price</p>
                <button
                  onClick={() => setfinalpriceformShow(false)}
                  className="addfinalprice-close-btn"
                >
                  ×
                </button>
              </div>

              <form className="addfinalprice-form" onSubmit={handleSubmit}>
                <div className="addfinalprice-group">
                  <label>Analyze Package Cost</label>
                  <input
                    type="text"
                    value={analyzePackageCost}
                    onChange={(e) => setAnalyzePackageCost(e.target.value)}
                  />
                </div>

                <div className="addfinalprice-group">
                  <label>Analyze TRS Cost</label>
                  <input
                    type="text"
                    value={analyzeTrsCost}
                    onChange={(e) => setAnalyzeTrsCost(e.target.value)}
                  />
                </div>

                <div className="addfinalprice-group">
                  <label>Analyze Car Service Cost</label>
                  <input
                    type="text"
                    value={analyzeCarServiceCost}
                    onChange={(e) => setAnalyzeCarServiceCost(e.target.value)}
                  />
                </div>

                <div className="addfinalprice-group">
                  <label>Analyze Additional Service Cost</label>
                  <input
                    type="text"
                    value={analyzeAdditionalServiceCost}
                    onChange={(e) =>
                      setAnalyzeAdditionalServiceCost(e.target.value)
                    }
                  />
                </div>

                <button type="submit" className="addfinalprice-submit-btn">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </>
      )}
      <div className="pricingdetalcard-container">
        {pricingDetail.length === 0 ? (
          <p className="pricingdetalcard-no-data">No details available</p>
        ) : (
          pricingDetail.map((detail, index) => (
            <div key={index} className="pricingdetalcard">
              <div className="pricingdetalcard-header">
                <h2>{detail.companyName}</h2>
                <span className="pricingdetalcard-tag">
                  {detail.serviceSector}
                </span>
              </div>

              <div className="pricingdetalcard-section">
                <h4>Associate Information</h4>
                <div className="pricingdetalcard-grid">
                  <div>
                    <strong>Associate Code:</strong> {detail.associateCode}
                  </div>
                  <div>
                    <strong>Contact Name:</strong> {detail.contactName}
                  </div>
                  <div>
                    <strong>Contact Number:</strong> {detail.contactNumber}
                  </div>
                  <div>
                    <strong>Email:</strong> {detail.emailId}
                  </div>
                  <div>
                    <strong>Hub:</strong> {detail.hub}
                  </div>
                  <div>
                    <strong>Location:</strong> {detail.location}
                  </div>
                  <div>
                    <strong>State:</strong> {detail.state}
                  </div>
                  <div>
                    <strong>Grade:</strong> {detail.grade}
                  </div>
                </div>
              </div>

              <div className="pricingdetalcard-section">
                <h4>Original Costs</h4>
                <div className="pricingdetalcard-cost-grid">
                  <div>
                    <strong>Package:</strong> ₹
                    {detail.originalPackageCost?.toLocaleString("en-IN")}
                  </div>
                  <div>
                    <strong>Car Service:</strong> ₹
                    {detail.originalCarServiceCost?.toLocaleString("en-IN")}
                  </div>
                  <div>
                    <strong>TRS:</strong> ₹
                    {detail.originalTrsCost?.toLocaleString("en-IN")}
                  </div>
                  <div>
                    <strong>Additional Services:</strong> ₹
                    {detail.originalAdditionalServiceCost.toLocaleString(
                      "en-IN"
                    )}
                  </div>
                </div>
              </div>

              <div className="pricingdetalcard-section">
                <h4>Final Costs</h4>
                <div className="pricingdetalcard-cost-grid pricingdetalcard-final">
                  <div>
                    <strong>Package:</strong> ₹
                    {detail.finalPackageCost?.toLocaleString("en-IN")}
                  </div>
                  <div>
                    <strong>Car Service:</strong> ₹
                    {detail.finalCarServiceCost.toLocaleString("en-IN")}
                  </div>
                  <div>
                    <strong>TRS:</strong> ₹
                    {detail.finalTrsCost.toLocaleString("en-IN")}
                  </div>
                  <div>
                    <strong>Additional Services:</strong> ₹
                    {detail.finalAdditionalServiceCost.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showfinalpricecard && (
        <div className="finalpricecard-overlay">
          <div className="finalpricecard-detail">
            <button
              onClick={() => setshowfinalpricecard(false)}
              className="finalpricecard-close-btn"
            >
              ×
            </button>
            <h3 className="finalpricecard-title">Final Price Details</h3>
            {finalPriceCard && (
              <div className="finalpricecard-info">
                <div>
                  <strong>Package Cost:</strong> ₹
                  {finalPriceCard.analyzePackageCost?.toLocaleString("en-IN") ||
                    "N/A"}
                </div>
                <div>
                  <strong>TRS Cost:</strong> ₹
                  {finalPriceCard.analyzeTrsCost?.toLocaleString("en-IN") ||
                    "N/A"}
                </div>
                <div>
                  <strong>Car Service Cost:</strong> ₹
                  {finalPriceCard.analyzeCarServiceCost?.toLocaleString(
                    "en-IN"
                  ) || "N/A"}
                </div>
                <div>
                  <strong>Additional Service Cost:</strong> ₹
                  {finalPriceCard.analyzeAdditionalServiceCost?.toLocaleString(
                    "en-IN"
                  ) || "N/A"}
                </div>
              </div>
            )}

            <div className="finalpricecard-buttons">
              <button
                className="updatefinalPriceCard"
                onClick={() =>
                  handleUpdatefinalprice(finalPriceCard.quatationId)
                }
              >
                Update
              </button>
              <button
                className="sendtosalesPricingDetail"
                onClick={() => handleSendToSales(finalPriceCard.quatationId)}
              >
                Send To Sales Creater
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PricingDetail;
