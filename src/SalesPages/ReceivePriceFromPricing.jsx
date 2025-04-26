import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import "../styles/PricingCardDataToSales.css";
import axiosInstance from "../utils/axiosInstance";
function ReceivePriceFromPricing() {
  const [loading, setLoading] = useState("Loading...");
  const token = JSON.parse(localStorage.getItem("mexcargoUserData"))?.token;
  const [pricingData, setPricingData] = useState([]);
  const [receiveActualPrice, setReceiveActualPrice] = useState([]);
  const [showreceiveActualPricePopup, setShowReceiveActualPricePopup] =
    useState(false);
  const [quatationId, setQuatationId] = useState(null);
  const [showNewPriceFormpopup, setshowNewPriceFormpopup] = useState(false);
  const [packingAmount, setPackingAmount] = useState("");
  const [loadingAmount, setLoadingAmount] = useState("");
  const [unloadingAmount, setUnloadingAmount] = useState("");
  const [unpackingAmount, setUnpackingAmount] = useState("");
  const [packingAndLoadingAmount, setPackingAndLoadingAmount] = useState("");
  const [unloadingAndUnpackingAmount, setUnloadingAndUnpackingAmount] =
    useState("");
  const [
    packingAndLoadingAndUnloadingAndUnpackingAmount,
    setPackingAndLoadingAndUnloadingAndUnpackingAmount,
  ] = useState("");
  const [transportationOfHouseholdAmount, setTransportationOfHouseholdAmount] =
    useState("");
  const [priceDetails, setPriceDetails] = useState({});
  const [showpriceDetailspopup, setshowpriceDetailspopup] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [refreshkey, setRefreshKey] = useState(0);
  const [newUpdateId, setNewUpdateId] = useState(null);
  useEffect(() => {
    async function priceReceiveFromPricing() {
      try {
        const response = await axiosInstance.get(
          `${BASE_URL}/quatation/get/which-is-analyze-pricing`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Response from pricing:", response.data);
        setPricingData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    priceReceiveFromPricing();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
  };

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleViewDetails = async (id) => {
    setShowReceiveActualPricePopup(true);
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
      setReceiveActualPrice(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const showNewPriceForm = (id) => {
    setQuatationId(id);
    setshowNewPriceFormpopup(true);
  };

  async function handleSubmitNewPricing(e) {
    e.preventDefault();

    const payload = {
      packingAmount: String(packingAmount)?.replace(/,/g, ""),
      loadingAmount: String(loadingAmount)?.replace(/,/g, ""),
      unloadingAmount: String(unloadingAmount)?.replace(/,/g, ""),
      unpackingAmount: String(unpackingAmount)?.replace(/,/g, ""),
      packingAndLoadingAmount: String(packingAndLoadingAmount)?.replace(
        /,/g,
        ""
      ),
      unloadingAndUnpackingAmount: String(unloadingAndUnpackingAmount)?.replace(
        /,/g,
        ""
      ),
      packingAndLoadingAndUnloadingAndUnpackingAmount: String(
        packingAndLoadingAndUnloadingAndUnpackingAmount
      )?.replace(/,/g, ""),
      transportationOfHouseholdAmount: String(
        transportationOfHouseholdAmount
      )?.replace(/,/g, ""),
    };

    try {
      let response;

      if (updateId && newUpdateId) {
        response = await axiosInstance.put(
          `${BASE_URL}/quatation/${newUpdateId}/update-particular-amount`,
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
          `${BASE_URL}/quatation/${quatationId}/add-particular-amount`,
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
          updateId
            ? "Pricing Updated Successfully"
            : "Pricing Added Successfully"
        );
        viewPriceAddedBySales(quatationId);
        setPriceDetails((prev) => {
          return response.data;
        });
        setRefreshKey(refreshkey + 1);
        setPackingAmount("");
        setLoadingAmount("");
        setUnloadingAmount("");
        setUnpackingAmount("");
        setPackingAndLoadingAmount("");
        setUnloadingAndUnpackingAmount("");
        setPackingAndLoadingAndUnloadingAndUnpackingAmount("");
        setTransportationOfHouseholdAmount("");
        setshowNewPriceFormpopup(false);
        setUpdateId(null);
      }
    } catch (error) {
      console.error("Error submitting pricing:", error);
      alert("Something went wrong. Please try again.");
    }
  }

  async function viewPriceAddedBySales(id) {
    setNewUpdateId(id);
    setshowpriceDetailspopup(true);
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/quatation/${id}/get-particular-amount`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setPriceDetails((prev) => {
        return response.data;
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleUpdateviewPriceAddedBySales(id) {
    setUpdateId(id);
    setshowNewPriceFormpopup(true);
    setPackingAmount(priceDetails.packingAmount || "");
    setLoadingAmount(priceDetails.loadingAmount || "");
    setUnloadingAmount(priceDetails.unloadingAmount || "");
    setUnpackingAmount(priceDetails.unpackingAmount || "");
    setPackingAndLoadingAmount(priceDetails.packingAndLoadingAmount || "");
    setUnloadingAndUnpackingAmount(
      priceDetails.unloadingAndUnpackingAmount || ""
    );
    setPackingAndLoadingAndUnloadingAndUnpackingAmount(
      priceDetails.packingAndLoadingAndUnloadingAndUnpackingAmount || ""
    );
    setTransportationOfHouseholdAmount(
      priceDetails.transportationOfHouseholdAmount || ""
    );
  }

  async function handleQuatationSendToEndUser(id) {
    setLoading("Loading...");
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/quatation/${id}/particular-amount/send-to-end-user`,
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
        alert("Quatation Send To End User Successfully");
        setLoading("");
      }
    } catch (error) {
      console.log(error);
      setLoading("Something went wrong. Please try again.");
    }
  }
  return (
    <>
      <div className="pricingcarddatatosales-container">
        {pricingData.map((item, index) => (
          <div className="pricingcarddatatosales" key={index}>
            <div className="pricing-card-header">
              <h2> #{item.quatationReferenceNo}</h2>
            </div>
            <div className="pricing-card-grid">
              <div className="pricing-card-item">
                <strong>Lead Ref:</strong> {item.leadReferenceNo}
              </div>
              <div className="pricing-card-item">
                <strong>From:</strong> {item.source}
              </div>
              <div className="pricing-card-item">
                <strong>To:</strong> {item.destination}
              </div>
              <div className="pricing-card-item">
                <strong>Transport:</strong> {item.typeOfTransporatation}
              </div>
              <div className="pricing-card-item">
                <strong>Weight:</strong> {item.weight} kg
              </div>
              <div className="pricing-card-item">
                <strong>Size:</strong> {item.size} m³
              </div>
              <div className="pricing-card-item">
                <strong>Commodity:</strong> {item.commodity}
              </div>
              <div className="pricing-card-item">
                <strong>Commodity Moving Date:</strong>{" "}
                {formatDate(item.movingDateAndTime)}
              </div>
              <div className="pricing-card-item">
                <strong>Commodity Moving Time:</strong>{" "}
                {formatTime(item.movingDateAndTime)}
              </div>
              <div className="pricing-card-item">
                <strong>Car Transport:</strong> {item.carTransport}
              </div>
              <div className="pricing-card-item">
                <strong>Car Moving Date:</strong>{" "}
                {formatDate(item.carMovingDate)}
              </div>
              <div className="pricing-card-item">
                <strong>Car Moving Time:</strong>{" "}
                {formatTime(`2025-01-01T${item.carMovingTime}`)}
              </div>
              <div className="pricing-card-item">
                <strong>Required Quotation Date:</strong>{" "}
                {formatDate(item.requiredQuatationDate)}
              </div>
              <div className="pricing-card-item">
                <strong>Required Quotation Time:</strong>{" "}
                {formatTime(`2025-01-01T${item.requiredQuatationTime}`)}
              </div>
              <div className="pricing-card-item">
                <strong>Forwarded Quotation Date:</strong>{" "}
                {formatDate(item.forwardQuatationDate)}
              </div>
              <div className="pricing-card-item">
                <strong>Forwarded Quotation Time:</strong>{" "}
                {formatTime(`2025-01-01T${item.forwardQuationTime}`)}
              </div>
              <div className="pricing-card-item">
                <strong>Other Services:</strong> {item.otherServices}
              </div>
              <div className="pricing-card-item">
                <strong>Quatation Status:</strong> {item.quatationStatus}
              </div>
            </div>
            <div className="pricingcarddatatosales_button">
              <button
                className="view-detail-btn"
                onClick={() => handleViewDetails(item.quatationId)}
              >
                View Details
              </button>
              <button
                className="view-detail-btn"
                onClick={() => showNewPriceForm(item.quatationId)}
                disabled={item.isParticularAmountAdded}
                style={{
                  backgroundColor: item.isParticularAmountAdded ? "gray" : "",
                  cursor: item.isParticularAmountAdded
                    ? "not-allowed"
                    : "pointer",
                }}
              >
                Add New Price by sales executive
              </button>

              <button
                className="view-detail-btn"
                onClick={() => viewPriceAddedBySales(item.quatationId)}
              >
                View Addedd Price by sales executive
              </button>
              <button
                className="view-detail-btn"
                onClick={() => handleQuatationSendToEndUser(item.quatationId)}
              >
                Send To End User
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="receive-actual-price-container">
        {showreceiveActualPricePopup && (
          <div className="receive-actual-price-popup">
            <div className="receive-actual-price-popup-content">
              <h2>Price Details</h2>
              <div className="receive-actual-price-grid">
                <div className="receive-actual-price-price-item">
                  <strong>Analyze Additional Service Cost : </strong>
                  {receiveActualPrice.analyzeAdditionalServiceCost?.toLocaleString(
                    "en-IN"
                  )}
                </div>
                <div className="receive-actual-price-price-item">
                  <strong>Analyze Car Service Cost : </strong>
                  {receiveActualPrice.analyzeCarServiceCost?.toLocaleString(
                    "en-IN"
                  )}
                </div>
                <div className="receive-actual-price-price-item">
                  <strong>Analyze Package Cost : </strong>
                  {receiveActualPrice.analyzePackageCost?.toLocaleString(
                    "en-IN"
                  )}
                </div>
                <div className="receive-actual-price-price-item">
                  <strong>Analyze Trs Cost : </strong>
                  {receiveActualPrice.analyzeTrsCost?.toLocaleString("en-IN")}
                </div>
              </div>
              <button
                className="receive-actual-price-close-popup-btn"
                onClick={() => setShowReceiveActualPricePopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {showNewPriceFormpopup && (
        <div className="showNewPriceFormpopup-overlay">
          <div className="showNewPriceFormpopup-popup">
            <button
              className="showNewPriceFormpopup-close"
              onClick={() => setshowNewPriceFormpopup(false)}
            >
              ✖
            </button>
            <h2 className="showNewPriceFormpopup-title">New Pricing Details</h2>

            <form
              className="showNewPriceFormpopup-form"
              onSubmit={handleSubmitNewPricing}
            >
              <label>Packing Amount</label>
              <input
                type="text"
                className="showNewPriceFormpopup-input"
                value={packingAmount}
                onChange={(e) => setPackingAmount(e.target.value)}
              />

              <label>Loading Amount</label>
              <input
                type="text"
                className="showNewPriceFormpopup-input"
                value={loadingAmount}
                onChange={(e) => setLoadingAmount(e.target.value)}
              />

              <label>Unloading Amount</label>
              <input
                type="text"
                className="showNewPriceFormpopup-input"
                value={unloadingAmount}
                onChange={(e) => setUnloadingAmount(e.target.value)}
              />

              <label>Unpacking Amount</label>
              <input
                type="text"
                className="showNewPriceFormpopup-input"
                value={unpackingAmount}
                onChange={(e) => setUnpackingAmount(e.target.value)}
              />

              <label>Packing + Loading Amount</label>
              <input
                type="text"
                className="showNewPriceFormpopup-input"
                value={packingAndLoadingAmount}
                onChange={(e) => setPackingAndLoadingAmount(e.target.value)}
              />

              <label>Unloading + Unpacking Amount</label>
              <input
                type="text"
                className="showNewPriceFormpopup-input"
                value={unloadingAndUnpackingAmount}
                onChange={(e) => setUnloadingAndUnpackingAmount(e.target.value)}
              />

              <label>Total Packing, Loading, Unloading, Unpacking</label>
              <input
                type="text"
                className="showNewPriceFormpopup-input"
                value={packingAndLoadingAndUnloadingAndUnpackingAmount}
                onChange={(e) =>
                  setPackingAndLoadingAndUnloadingAndUnpackingAmount(
                    e.target.value
                  )
                }
              />

              <label>Transportation of Household Amount</label>
              <input
                type="text"
                className="showNewPriceFormpopup-input"
                value={transportationOfHouseholdAmount}
                onChange={(e) =>
                  setTransportationOfHouseholdAmount(e.target.value)
                }
              />

              <button type="submit" className="showNewPriceFormpopup-submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {showpriceDetailspopup && (
        <div className="viewPriceAddedBySales-overlay">
          <div className="viewPriceAddedBySales-card">
            <button
              className="viewPriceAddedBySales-close"
              onClick={() => setshowpriceDetailspopup(false)}
            >
              ✖
            </button>
            <h2 className="viewPriceAddedBySales-title">Price Details</h2>

            <div className="viewPriceAddedBySales-grid">
              <p>
                <strong>Packing:</strong> ₹
                {priceDetails.packingAmount?.toLocaleString("en-GB")}
              </p>
              <p>
                <strong>Loading:</strong> ₹
                {priceDetails.loadingAmount?.toLocaleString("en-GB")}
              </p>
              <p>
                <strong>Unloading:</strong> ₹
                {priceDetails.unloadingAmount?.toLocaleString("en-GB")}
              </p>
              <p>
                <strong>Unpacking:</strong> ₹
                {priceDetails.unpackingAmount?.toLocaleString("en-GB")}
              </p>
              <p>
                <strong>Packing + Loading:</strong> ₹
                {priceDetails.packingAndLoadingAmount?.toLocaleString("en-GB")}
              </p>
              <p>
                <strong>Unloading + Unpacking:</strong> ₹
                {priceDetails.unloadingAndUnpackingAmount?.toLocaleString(
                  "en-GB"
                )}
              </p>
              <p>
                <strong>All Services:</strong> ₹
                {priceDetails.packingAndLoadingAndUnloadingAndUnpackingAmount?.toLocaleString(
                  "en-GB"
                )}
              </p>
              <p>
                <strong>Transportation:</strong> ₹
                {priceDetails.transportationOfHouseholdAmount?.toLocaleString(
                  "en-GB"
                )}
              </p>
            </div>

            <button
              className="viewPriceAddedBySales-updateButton"
              onClick={() =>
                handleUpdateviewPriceAddedBySales(
                  priceDetails.quatationParticularsAmountId
                )
              }
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ReceivePriceFromPricing;
