import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import "../Pricing/pricingexecutive.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
function Pricingexecutive() {
  const navigate = useNavigate();
  const [quotationData, setQuotationData] = useState([]);

  const token = JSON.parse(localStorage.getItem("mexcargoUserData"))?.token;
  const localUserId = JSON.parse(
    localStorage.getItem("mexcargoUserData")
  )?.userId;

  useEffect(() => {
    async function receviedQuatationFromPerches() {
      try {
        const response = await axiosInstance.get(
          `${BASE_URL}/pricingexceutive/quatation/data/${localUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data);
        const sortingdata = [...response.data].sort((a, b) => b.id - a.id);
        setQuotationData(sortingdata);
      } catch (error) {
        console.error(error);
      }
    }
    receviedQuatationFromPerches();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours);
    const suffix = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${suffix}`;
  };

  const formatDateTime = (datetimeStr) => {
    const date = new Date(datetimeStr);
    const datePart = formatDate(date);
    const timePart = formatTime(date.toTimeString().split(" ")[0]);
    return `${datePart}, ${timePart}`;
  };

  function handleClickShowDetail(id) {
    navigate(`/pricingDetail/${id}`);
  }
  return (
    <div className="pricingcarddata-container">
      {quotationData.length === 0 ? (
        <p style={{ textAlign: "center", fontWeight: "bold" }}>
          No Quotation Available
        </p>
      ) : (
        quotationData.map((item, index) => (
          <div
            key={index}
            className="pricingcarddata-card"
            onClick={() => handleClickShowDetail(item.quatationId)}
            style={{ cursor: "pointer" }}
          >
            <h3>Quotation Ref #: {item.quatationReferenceNo}</h3>

            <p>
              <strong>Lead Ref #:</strong> {item.leadReferenceNo}
            </p>
            <p>
              <strong>Source:</strong> {item.source}
            </p>
            <p>
              <strong>Destination:</strong> {item.destination}
            </p>
            <p>
              <strong>Commodity Moving Date & Time:</strong>{" "}
              {formatDateTime(item.movingDateAndTime)}
            </p>
            <p>
              <strong>Commodity:</strong> {item.commodity}
            </p>
            <p>
              <strong>Commodity Size:</strong> {item.size}
            </p>
            <p>
              <strong>Commodity Weight:</strong> {item.weight}
            </p>
            <p>
              <strong>Other Services:</strong> {item.otherServices}
            </p>
            <p>
              <strong>Transport Type:</strong> {item.typeOfTransporatation}
            </p>
            <p>
              <strong>Car Transport:</strong> {item.carTransport}
            </p>
            <p>
              <strong>Car Moving Date:</strong> {formatDate(item.carMovingDate)}
            </p>
            <p>
              <strong>Car Moving Time:</strong> {formatTime(item.carMovingTime)}
            </p>
            <p>
              <strong>Required Quotation:</strong>{" "}
              {`${formatDate(item.requiredQuatationDate)}, ${formatTime(
                item.requiredQuatationTime
              )}`}
            </p>
            <p>
              <strong>Received Quotation:</strong>{" "}
              {`${formatDate(item.receivingQuatationDate)}, ${formatTime(
                item.receivingQuationTime
              )}`}
            </p>
            <button className="pricing_view_details_button">
              {" "}
              View Details
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Pricingexecutive;
