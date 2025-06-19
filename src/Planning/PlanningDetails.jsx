// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axiosInstance from "../utils/axiosInstance";
// import { BASE_URL } from "../config";
// import "../Planning/planningdetail.css";
// import { useNavigate } from "react-router-dom";
// function PlanningDetails() {
//   const navigate = useNavigate();
//   const { quatationId, leadId } = useParams();
//   console.log(`QuatationId  ${quatationId}`);
//   const token = JSON.parse(localStorage.getItem("mexcargoUserData"))?.token;
//   const [planningDetailsData, setPlanningDetailsData] = useState([]);
//   const [selectedMasterId, setSelectedMasterId] = useState(null);
//   const [SelectplanningService, setSelectplanningService] = useState("");
//   const [addplanningPrice, setAddplanningPrice] = useState("");
//   const [MasterList, setMasterList] = useState([]);
//   useEffect(() => {
//     async function getAllMasterData() {
//       try {
//         const response = await axiosInstance.get(
//           `${BASE_URL}/pricingexceutive/quatation/${quatationId}/get/masters-with-response`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         console.log(response.data);
//         setPlanningDetailsData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }
//     getAllMasterData();
//   }, [quatationId, token]);

//   // useEffect(() => {
//   //   async function getMasterList() {
//   //     try {
//   //       const response = await axiosInstance.get(
//   //         `${BASE_URL}/get/master/list`,
//   //         {
//   //           headers: {
//   //             Authorization: `Bearer ${token}`,
//   //             "Content-Type": "application/json",
//   //           },
//   //         }
//   //       );
//   //       console.log(response.data);
//   //       setMasterList(response.data);
//   //     } catch (error) {
//   //       console.log(error);
//   //     }
//   //   }
//   //   getMasterList();
//   // }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const selectedCard = planningDetailsData.find(
//       (item) => item.quatationMasterId === selectedMasterId
//     );
//     if (!selectedCard) {
//       alert("Please select a card before submitting.");
//       return;
//     }

//     const body = {
//       quatationId: Number(quatationId),
//       quatationMasterId: selectedCard.quatationMasterId,
//       serviceType: SelectplanningService,
//       finalServiceAmount: Number(addplanningPrice),
//     };
//     console.log(body);
//     try {
//       const response = await axiosInstance.post(
//         `${BASE_URL}/select/master-for-service`,
//         body,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log(response.data);
//       if (response.status === 200) {
//         alert(" successfully  added");
//       }
//     } catch (error) {
//       const errormassage = error.response.data;
//       alert(errormassage);
//     }
//   };

//   function handleAddNewMaster(leadId, quatationId) {
//     navigate(`/newMasterAdd/${quatationId}/${leadId}`);
//   }

//   return (
//     <>
//       <h2>Select a Quotation Plan</h2>

//       <div className="planning_upper_container">
//         <div className="Select_service_sector">
//           <select
//             value={SelectplanningService}
//             onChange={(e) => setSelectplanningService(e.target.value)}
//           >
//             <option value=""> Select Service</option>
//             <option value="PACKAGE">PACKAGE</option>
//             <option value="TRS">TRS</option>
//             <option value="CAR">CAR</option>
//             <option value="ADDITIONAL_SERVICE">ADDITIONAL_SERVICE</option>
//           </select>
//         </div>

//         <div className="plannng_details_add_price">
//           <div className="plannng_details_add_price_input">
//             <input
//               type="text"
//               placeholder="Add Price"
//               value={addplanningPrice}
//               onChange={(e) => setAddplanningPrice(e.target.value)}
//             />
//           </div>
//         </div>

//         <button
//           onClick={() => handleAddNewMaster(leadId, quatationId)}
//           className="Planning_Add_master_button"
//         >
//           Add Mster
//         </button>
//       </div>

//       {/* <div>
//         <select>
//           <option value="">Select Master</option>
//           {MasterList.map((item, index) => {
//             return (
//               <>
//                 {
//                   <option key={index} value={item.masterId}>
//                     {item.contactName}
//                   </option>
//                 }
//               </>
//             );
//           })}
//         </select>
//       </div> */}

//       <div className="planningDetails-main-wrapper">
//         <div className="planningDetails-container">
//           {planningDetailsData.length === 0 ? (
//             <p>No planning details available.</p>
//           ) : (
//             <form className="planningDetails-form" onSubmit={handleSubmit}>
//               {planningDetailsData.map((item) => (
//                 <label key={item.masterId} className="planningDetails-card">
//                   <input
//                     type="radio"
//                     name="selectedPlan"
//                     value={item.masterId}
//                     checked={selectedMasterId === item.masterId}
//                     onChange={() => setSelectedMasterId(item.masterId)}
//                   />
//                   <div className="planningDetails-card-content">
//                     <p>
//                       <strong>Associate Code:</strong> {item.associateCode}
//                     </p>
//                     <p>
//                       <strong>Company Name:</strong> {item.companyName}
//                     </p>
//                     <p>
//                       <strong>Contact Name:</strong> {item.contactName}
//                     </p>
//                     <p>
//                       <strong>Contact Number:</strong> {item.contactNumber}
//                     </p>
//                     <p>
//                       <strong>Email:</strong> {item.emailId}
//                     </p>
//                     <p>
//                       <strong>Location:</strong> {item.location}
//                     </p>
//                     <p>
//                       <strong>State:</strong> {item.state}
//                     </p>
//                     <p>
//                       <strong>Hub:</strong> {item.hub}
//                     </p>
//                     <p>
//                       <strong>Service Sector:</strong> {item.serviceSector}
//                     </p>
//                     <p>
//                       <strong>Grade:</strong> {item.grade}
//                     </p>

//                     <p>
//                       <strong>Original Package Cost:</strong> ₹
//                       {item.originalPackageCost?.toLocaleString()}
//                     </p>
//                     <p>
//                       <strong>Final Package Cost:</strong> ₹
//                       {item.finalPackageCost?.toLocaleString()}
//                     </p>

//                     <p>
//                       <strong>Original Transport Cost:</strong> ₹
//                       {item.originalTrsCost?.toLocaleString()}
//                     </p>
//                     <p>
//                       <strong>Final Transport Cost:</strong> ₹
//                       {item.finalTrsCost?.toLocaleString()}
//                     </p>

//                     <p>
//                       <strong>Original Car Service Cost:</strong> ₹
//                       {item.originalCarServiceCost?.toLocaleString()}
//                     </p>
//                     <p>
//                       <strong>Final Car Service Cost:</strong> ₹
//                       {item.finalCarServiceCost?.toLocaleString()}
//                     </p>

//                     <p>
//                       <strong>Original Additional Service Cost:</strong> ₹
//                       {item.originalAdditionalServiceCost?.toLocaleString()}
//                     </p>
//                     <p>
//                       <strong>Final Additional Service Cost:</strong> ₹
//                       {item.finalAdditionalServiceCost?.toLocaleString()}
//                     </p>
//                   </div>
//                 </label>
//               ))}
//               <button type="submit" className="planningDetails-submit-button">
//                 Submit Selected Plan
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default PlanningDetails;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { BASE_URL } from "../config";
import "../Planning/planningdetail.css";

function PlanningDetails() {
  const navigate = useNavigate();
  const { quatationId, leadId } = useParams();
  const token = JSON.parse(localStorage.getItem("mexcargoUserData"))?.token;

  const [planningDetailsData, setPlanningDetailsData] = useState([]);
  const [selectedMasterId, setSelectedMasterId] = useState(null);
  const [SelectplanningService, setSelectplanningService] = useState("");
  const [addplanningPrice, setAddplanningPrice] = useState("");

  useEffect(() => {
    async function getAllMasterData() {
      try {
        const response = await axiosInstance.get(
          `${BASE_URL}/pricingexceutive/quatation/${quatationId}/get/masters-with-response`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setPlanningDetailsData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getAllMasterData();
  }, [quatationId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedCard = planningDetailsData.find(
      (item) => item.quatationMasterId === selectedMasterId
    );

    if (!selectedCard) {
      alert("Please select a card before submitting.");
      return;
    }

    const body = {
      quatationId: Number(quatationId),
      quatationMasterId: selectedCard.quatationMasterId,
      serviceType: SelectplanningService,
      finalServiceAmount: Number(addplanningPrice),
    };

    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/select/master-for-service`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Successfully added");

        // ✅ Reset the form
        setSelectedMasterId(null);
        setSelectplanningService("");
        setAddplanningPrice("");
      }
    } catch (error) {
      const errormessage = error?.response?.data || "Something went wrong.";
      alert(errormessage);
    }
  };

  function handleAddNewMaster() {
    navigate(`/newMasterAdd/${quatationId}/${leadId}`);
  }

  return (
    <>
      <h2>Select a Quotation Plan</h2>

      <div className="planning_upper_container">
        <div className="Select_service_sector">
          <select
            value={SelectplanningService}
            onChange={(e) => setSelectplanningService(e.target.value)}
          >
            <option value="">Select Service</option>
            <option value="PACKAGE">PACKAGE</option>
            <option value="TRS">TRS</option>
            <option value="CAR">CAR</option>
            <option value="ADDITIONAL_SERVICE">ADDITIONAL_SERVICE</option>
          </select>
        </div>

        <div className="plannng_details_add_price">
          <input
            type="text"
            placeholder="Add Price"
            value={addplanningPrice}
            onChange={(e) => setAddplanningPrice(e.target.value)}
          />
        </div>

        <button
          onClick={handleAddNewMaster}
          className="Planning_Add_master_button"
        >
          Add Master
        </button>
      </div>

      <div className="planningDetails-main-wrapper">
        <div className="planningDetails-container">
          {planningDetailsData.length === 0 ? (
            <p>No planning details available.</p>
          ) : (
            <form className="planningDetails-form" onSubmit={handleSubmit}>
              {planningDetailsData.map((item) => (
                <label
                  key={item.quatationMasterId}
                  className="planningDetails-card"
                >
                  <input
                    type="radio"
                    name="selectedPlan"
                    value={item.quatationMasterId}
                    checked={selectedMasterId === item.quatationMasterId}
                    onChange={() => setSelectedMasterId(item.quatationMasterId)}
                  />
                  <div className="planningDetails-card-content">
                    <p>
                      <strong>Associate Code:</strong> {item.associateCode}
                    </p>
                    <p>
                      <strong>Company Name:</strong> {item.companyName}
                    </p>
                    <p>
                      <strong>Contact Name:</strong> {item.contactName}
                    </p>
                    <p>
                      <strong>Contact Number:</strong> {item.contactNumber}
                    </p>
                    <p>
                      <strong>Email:</strong> {item.emailId}
                    </p>
                    <p>
                      <strong>Location:</strong> {item.location}
                    </p>
                    <p>
                      <strong>State:</strong> {item.state}
                    </p>
                    <p>
                      <strong>Hub:</strong> {item.hub}
                    </p>
                    <p>
                      <strong>Service Sector:</strong> {item.serviceSector}
                    </p>
                    <p>
                      <strong>Grade:</strong> {item.grade}
                    </p>

                    <p>
                      <strong>Original Package Cost:</strong> ₹
                      {item.originalPackageCost?.toLocaleString()}
                    </p>
                    <p>
                      <strong>Final Package Cost:</strong> ₹
                      {item.finalPackageCost?.toLocaleString()}
                    </p>
                    <p>
                      <strong>Original Transport Cost:</strong> ₹
                      {item.originalTrsCost?.toLocaleString()}
                    </p>
                    <p>
                      <strong>Final Transport Cost:</strong> ₹
                      {item.finalTrsCost?.toLocaleString()}
                    </p>
                    <p>
                      <strong>Original Car Service Cost:</strong> ₹
                      {item.originalCarServiceCost?.toLocaleString()}
                    </p>
                    <p>
                      <strong>Final Car Service Cost:</strong> ₹
                      {item.finalCarServiceCost?.toLocaleString()}
                    </p>
                    <p>
                      <strong>Original Additional Service Cost:</strong> ₹
                      {item.originalAdditionalServiceCost?.toLocaleString()}
                    </p>
                    <p>
                      <strong>Final Additional Service Cost:</strong> ₹
                      {item.finalAdditionalServiceCost?.toLocaleString()}
                    </p>
                  </div>
                </label>
              ))}
              <button type="submit" className="planningDetails-submit-button">
                Submit Selected Plan
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default PlanningDetails;
