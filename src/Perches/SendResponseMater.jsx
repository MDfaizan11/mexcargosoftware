import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import "./SendResponseMater.css";
import axiosInstance from "../utils/axiosInstance";

function SendResponseMater() {
  const token = JSON.parse(localStorage.getItem("mexcargoUserData"))?.token;

  const { QuatationId, id } = useParams();
  const [responseData, setResponseData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [pricingList, setPricingList] = useState([]);
  const [showPricingList, setShowPricingList] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

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
    async function fetchResponse() {
      try {
        const response = await axiosInstance.get(
          `${BASE_URL}/get/quatationMasterId/${id}/response`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setResponseData(response.data);
        setFormData({
          originalPackageCost: response.data.originalPackageCost,
          originalTrsCost: response.data.originalTrsCost,
          originalCarServiceCost: response.data.originalCarServiceCost,
          originalAdditionalCost: response.data.originalAdditionalServiceCost,
          finalPackageCost: response.data.finalPackageCost,
          finalTrsCost: response.data.finalTrsCost,
          finalCarServiceCost: response.data.finalCarServiceCost,
          finalAdditionalCost: response.data.finalAdditionalServiceCost,
        });
      } catch (error) {
        console.error("Failed to fetch response:", error);
      }
    }

    fetchResponse();
  }, [QuatationId, id]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleUpdateResponse(responseId) {
    try {
      const response = await axiosInstance.put(
        `${BASE_URL}/purchaseexecutive/quatation/master/response/${responseId}/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Response updated successfully.");
        setEditMode(false);
        setResponseData((prev) => ({
          ...prev,
          ...formData,
        }));
      } else {
        alert("Failed to update response.");
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  }

  //   useEffect(() => {
  //     async function getAllPricingList() {
  //       try {
  //         const response = await axios.get(`${BASE_URL}/get/pricing/emp/list`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         });
  //         console.log(response.data);
  //         setPricingList(response.data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     getAllPricingList();
  //   }, []);

  //   function handleSendToPricing() {
  //     setShowPricingList(true);
  //   }

  //   const handleSelectChange = (e) => {
  //     const selectedOptions = Array.from(e.target.selectedOptions).map(
  //       (option) => option.value
  //     );
  //     setSelectedUsers(selectedOptions);
  //   };
  //   const handleSubmitSendToPricing = async (e) => {
  //     e.preventDefault();
  //     setIsUpdating(true);

  //     const formData = {
  //       quatationId: QuatationId,
  //       pricingIds: selectedUsers,
  //     };
  //     console.log(formData);
  //     try {
  //       const response = await axios.post(
  //         `${BASE_URL}/purchaseexecutive/quatation/send-to-pricing-executive`,
  //         formData,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       if (response.status === 200) {
  //         alert("Quotation sent to pricing executive successfully.");
  //         setShowPricingList(false);
  //         setSelectedUsers([]);
  //       } else {
  //         alert("Failed to send quotation to pricing executive.");
  //       }
  //     } catch (error) {
  //       console.error("Failed to send to pricing:", error);
  //     } finally {
  //       setIsUpdating(false);
  //     }
  //   };

  if (!responseData) {
    return <div className="sendresponsemater-loading">Loading response...</div>;
  }
  return (
    <>
      <div className="sendresponsemater-container">
        <h2 className="sendresponsemater-title">Master Quotation Response</h2>

        <div className="sendresponsemater-card">
          <table className="sendresponsemater-table">
            <thead>
              <tr>
                <th>Cost Type</th>
                <th>Original</th>
                <th>Final</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Package</td>
                <td>₹{responseData.originalPackageCost}</td>
                <td>₹{responseData.finalPackageCost}</td>
              </tr>
              <tr>
                <td>TRS</td>
                <td>₹{responseData.originalTrsCost}</td>
                <td>₹{responseData.finalTrsCost}</td>
              </tr>
              <tr>
                <td>Car Service</td>
                <td>₹{responseData.originalCarServiceCost}</td>
                <td>₹{responseData.finalCarServiceCost}</td>
              </tr>
              <tr>
                <td>Additional Service</td>
                <td>₹{responseData.originalAdditionalCost}</td>
                <td>₹{responseData.finalAdditionalCost}</td>
              </tr>
            </tbody>
          </table>

          {editMode && (
            <div className="sendresponsemater-form">
              {Object.keys(formData).map((key) => (
                <div className="sendresponsemater-form-group" key={key}>
                  <label>{key}:</label>
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="sendresponsemater-footer">
            <p>
              <strong>Response Date:</strong>{" "}
              {new Date(responseData.responseDate).toLocaleString()}
            </p>
            <p>
              <strong>Response ID:</strong> #
              {responseData.masterQuatationResponseId}
            </p>
          </div>

          <div className="sendresponsemater-button-wrapper">
            {!editMode ? (
              <button
                className="sendresponsemater-update-btn"
                onClick={() => setEditMode(true)}
              >
                Edit Response
              </button>
            ) : (
              <div className="sendresponsemater-button-wrapper">
                <button
                  className="sendresponsemater-update-btn"
                  onClick={() =>
                    handleUpdateResponse(responseData.masterQuatationResponseId)
                  }
                  disabled={isUpdating}
                >
                  Save Update
                </button>
                <button
                  className="sendresponsemater-cancel-btn"
                  onClick={() => setEditMode(false)}
                >
                  Close
                </button>
              </div>
            )}

            {/* <button
              className="sendresponsemater_send_to_pricing"
              onClick={() =>
                handleSendToPricing(responseData.masterQuatationResponseId)
              }
            >
              Send To Pricing
            </button> */}
          </div>
        </div>
      </div>
      {/* {showPricingList && (
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
                  {isUpdating ? "Saving..." : "Send to Pricing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
    </>
  );
}

export default SendResponseMater;
