import React, { useEffect, useState } from "react";

import { BASE_URL } from "../config";
import styles from "../styles/Quatation.module.css";
import axiosInstance from "../utils/axiosInstance";
function QuotationSales() {
  const token = JSON.parse(localStorage.getItem("mexcargoUserData"))?.token;
  const [executiveData, setExecutiveData] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [isExecutiveOpen, setIsExecutiveOpen] = useState(false);
  const [searchQuatation, setSearchQuatation] = useState("");
  useEffect(() => {
    async function GetAllQuatation() {
      try {
        const response = await axiosInstance.get(
          `${BASE_URL}/quatation/required/data`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setQuotations(response.data);
      } catch (error) {
        console.error("Error fetching quotations:", error);
      }
    }
    GetAllQuatation();
  }, []);

  async function getAllExecutive(id) {
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/quatation/${id}/purchaseexecutives`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setExecutiveData(response.data);
      setIsExecutiveOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

  function formatTimeLocal(timeStr) {
    if (!timeStr || typeof timeStr !== "string") {
      return "Invalid time"; // Fallback value or handle as needed
    }

    const [hours, minutes, seconds] = timeStr.split(":");
    const date = new Date();
    date.setHours(+hours, +minutes, +seconds);

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }

  const filterQuatation = quotations.filter((quatation, index) => {
    return quatation.source
      .toLowerCase()
      .includes(searchQuatation.toLocaleLowerCase());
  });
  return (
    <>
      <h2 className={styles.Quotationheading}>Quotation Sales</h2>

      <div className={styles.quatation_sales_search_baar}>
        <input
          type="search"
          value={searchQuatation}
          onChange={(e) => setSearchQuatation(e.target.value)}
          placeholder="Search by Source...."
        />
      </div>
      <div className={styles.Quotationcontainer}>
        <div className={styles.QuotationcardContainer}>
          {quotations.length > 0 ? (
            filterQuatation.map((quotation, index) => (
              <div key={index} className={styles.quatationcard}>
                <div className={styles.cardHeader}>
                  <h3>#{quotation.quatationReferenceNo}</h3>
                  <p className={styles.leadRef}>
                    Lead Ref: {quotation.leadReferenceNo}
                  </p>
                </div>
                <div className={styles.cardBody}>
                  <p>
                    <strong>Source:</strong> {quotation.source}
                  </p>
                  <p>
                    <strong>Destination:</strong> {quotation.destination}
                  </p>
                  <p>
                    <strong>Commodity:</strong> {quotation.commodity}
                  </p>
                  <p>
                    <strong>Commodity Size:</strong> {quotation.size}
                  </p>
                  <p>
                    <strong>Commodity weight:</strong> {quotation.weight}
                  </p>
                  <p>
                    <strong>Commodity Moving Date & Time:</strong>{" "}
                    {new Date(quotation.movingDateAndTime).toLocaleString()}
                  </p>

                  <p>
                    <strong>Car Transport:</strong> {quotation.carTransport}
                  </p>
                  <p>
                    <strong>Car moving date:</strong>{" "}
                    {quotation.carMovingDate
                      ? new Date(quotation.carMovingDate).toLocaleDateString(
                          "en-GB"
                        )
                      : "N/A"}
                  </p>

                  <p>
                    <strong>Car moving Time:</strong>{" "}
                    {quotation.carMovingTime
                      ? formatTimeLocal(quotation.carMovingTime)
                      : "N/A"}
                  </p>

                  <p>
                    <strong>Quatation Required Date:</strong>{" "}
                    {new Date(quotation.requiredQuatationDate).toDateString()}
                  </p>
                  <p>
                    <strong>Quatation Required Time:</strong>{" "}
                    {formatTimeLocal(quotation.requiredQuatationTime)}
                  </p>
                  <p>
                    <strong>Other Services:</strong> {quotation.otherServices}
                  </p>
                  <p>
                    <strong> Quatation Forward Date To Perches Team :</strong>{" "}
                    {new Date(quotation.forwardQuatationDate).toDateString()}
                  </p>
                  <p>
                    <strong> Quatation Forward Time To Perches Team:</strong>{" "}
                    {formatTimeLocal(quotation.forwardQuationTime)}
                  </p>
                </div>

                <button
                  className={styles.button}
                  onClick={() => getAllExecutive(quotation.quatationId)}
                >
                  View Executive
                </button>
              </div>
            ))
          ) : (
            <p className={styles.noData}>No Quotations Available</p>
          )}
        </div>
      </div>
      {isExecutiveOpen && (
        <div className={styles.executiveContainer}>
          <div className={styles.executiveModal}>
            <div className={styles.executiveHeader}>
              <h3>Executive Details</h3>
              <button
                className={styles.executiveCloseButton}
                onClick={() => setIsExecutiveOpen(false)}
              >
                ×
              </button>
            </div>
            <div className={styles.executiveBody}>
              {executiveData.length > 0 ? (
                executiveData.map((executive, index) => (
                  <div key={index} className={styles.executiveItem}>
                    <p>
                      <strong>Name :</strong> {executive.userName}
                    </p>
                    <p>
                      <strong>Email :</strong> {executive.email}
                    </p>
                    <p>
                      <strong>Mobile :</strong> {executive.mobileNumber}
                    </p>
                  </div>
                ))
              ) : (
                <p>No Executive Data Available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default QuotationSales;
