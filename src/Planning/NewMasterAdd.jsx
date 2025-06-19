// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useState } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import { BASE_URL } from "../config";
// function NewMasterAdd() {
//   const { leadId, quatationId } = useParams();
//   console.log(leadId, quatationId);
//   const token = JSON.parse(localStorage.getItem("mexcargoUserData")).token;
//   const [allMasterList, setAllMasterList] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [searchMaster, setSearchMaster] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [alreadySentMasters, setAlreadySentMasters] = useState([]);

//   useEffect(() => {
//     async function handleShowAllMasterList() {
//       try {
//         const response = await axiosInstance.get(
//           `${BASE_URL}/get/master/list`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         setAllMasterList(response.data);

//         const sentMastersRes = await axiosInstance.get(
//           `${BASE_URL}/get/quatation/${quatationId}/master`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         // Assuming response is an array of masterId (adjust if structure is different)
//         const sentIds = sentMastersRes.data.map((m) => m.masterId);
//         setAlreadySentMasters(sentIds);
//       } catch (error) {
//         console.error("Error fetching master list:", error);
//       }
//     }

//     handleShowAllMasterList();
//   }, [quatationId, token]);

//   const handleCheckboxChange = (masterId) => {
//     if (alreadySentMasters.includes(masterId)) return;

//     setSelectedItems((prev) =>
//       prev.includes(masterId)
//         ? prev.filter((id) => id !== masterId)
//         : [...prev, masterId]
//     );
//   };

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       const selectable = allMasterList
//         .map((item) => item.masterId)
//         .filter((id) => !alreadySentMasters.includes(id));
//       setSelectedItems(selectable);
//     } else {
//       setSelectedItems([]);
//     }
//   };

//   const handleSubmit = async () => {
//     const toSend = selectedItems.filter(
//       (id) => !alreadySentMasters.includes(id)
//     );
//     if (toSend.length === 0) {
//       alert("No valid masters selected to send.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const requestBody = {
//         leadId: leadId,
//         masterIds: toSend,
//       };
//       console.log(requestBody);
//       const response = await axiosInstance.post(
//         `${BASE_URL}/purchaseexecutive/quatation/send-to-masters`,
//         requestBody,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 200) {
//         setSelectedItems([]);
//         alert("Successfully sent to selected masters!");

//         // Refresh alreadySentMasters list
//         const sentRes = await axiosInstance.get(
//           `${BASE_URL}/get/quatation/${quatationId}/master`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         setAlreadySentMasters(sentRes.data.map((m) => m.masterId));
//       }
//     } catch (error) {
//       console.error("Error sending to masters:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filtermaster = allMasterList.filter((item) =>
//     item.contactName.toLowerCase().includes(searchMaster.toLowerCase())
//   );
//   return (
//     <>
//       <p>NewMasterAdd</p>

//       <div className="masterpage-wrapper">
//         <div className="masterpage-header">
//           <input
//             type="search"
//             value={searchMaster}
//             onChange={(e) => setSearchMaster(e.target.value)}
//             placeholder="Search Master List"
//             className="masterpage-search-input"
//           />
//           <div className="masterpage-controls">
//             <label>
//               <input
//                 type="checkbox"
//                 onChange={handleSelectAll}
//                 checked={
//                   allMasterList.length > 0 &&
//                   selectedItems.length ===
//                     allMasterList.filter(
//                       (item) => !alreadySentMasters.includes(item.masterId)
//                     ).length
//                 }
//                 disabled={loading}
//               />
//               Select All
//             </label>
//             <button
//               onClick={handleSubmit}
//               disabled={selectedItems.length === 0 || loading}
//               style={{
//                 marginLeft: "20px",
//                 padding: "5px 15px",
//                 backgroundColor:
//                   selectedItems.length === 0 || loading ? "#ccc" : "#007bff",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor:
//                   selectedItems.length === 0 || loading
//                     ? "not-allowed"
//                     : "pointer",
//               }}
//             >
//               {loading
//                 ? "Sending..."
//                 : `Send to Masters (${selectedItems.length})`}
//             </button>
//           </div>
//         </div>

//         <div className="masterpage-content">
//           <h2 className="masterpage-title">Master List</h2>
//           <div className="masterpage-grid">
//             {filtermaster.map((item) => {
//               const isAlreadySent = alreadySentMasters.includes(item.masterId);
//               return (
//                 <div
//                   key={item.masterId}
//                   className={`masterpage-card ${
//                     isAlreadySent ? "already-sent" : ""
//                   }`}
//                   style={{
//                     backgroundColor: isAlreadySent ? "#f2f2f2" : "white",
//                     opacity: isAlreadySent ? 0.6 : 1,
//                   }}
//                 >
//                   <label className="masterpage-card-checkbox">
//                     <input
//                       type="checkbox"
//                       disabled={isAlreadySent}
//                       checked={selectedItems.includes(item.masterId)}
//                       onChange={() => handleCheckboxChange(item.masterId)}
//                     />
//                     <strong>
//                       Master ID: {item.masterId}{" "}
//                       {isAlreadySent && "(Already Sent)"}
//                     </strong>
//                   </label>
//                   <p>
//                     <strong>Associate Code:</strong>{" "}
//                     <span>{item.associateCode}</span>
//                   </p>
//                   <p>
//                     <strong>Service Sector:</strong>{" "}
//                     <span>{item.serviceSector}</span>
//                   </p>
//                   <p>
//                     <strong>Company:</strong> <span>{item.companyName}</span>
//                   </p>
//                   <p>
//                     <strong>Contact:</strong> <span>{item.contactName}</span>
//                   </p>
//                   <p>
//                     <strong>Hub:</strong> <span>{item.hub}</span>
//                   </p>
//                   {item.contactNumber && (
//                     <p>
//                       <strong>Phone:</strong> <span>{item.contactNumber}</span>
//                     </p>
//                   )}
//                   {item.emailId && (
//                     <p>
//                       <strong>Email:</strong> <span>{item.emailId}</span>
//                     </p>
//                   )}
//                   {item.location && (
//                     <p>
//                       <strong>Location:</strong> <span>{item.location}</span>
//                     </p>
//                   )}
//                   {item.state && (
//                     <p>
//                       <strong>State:</strong> <span>{item.state}</span>
//                     </p>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default NewMasterAdd;

import React from "react";
import { useState } from "react";
import "../Planning/newMasterAdd.css";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import { BASE_URL } from "../config";
import { useParams } from "react-router-dom";
function NewMasterAdd() {
  const { quatationId, leadId } = useParams();
  console.log([leadId, quatationId]);
  console.log(`QuatationId ${quatationId}`);
  const token = JSON.parse(localStorage.getItem("mexcargoUserData"))?.token;

  const [associateCode, setAssociateCode] = useState("");
  const [serviceSector, setServiceSector] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [grade, setGrade] = useState("");
  const [location, setLocation] = useState("");
  const [hub, setHub] = useState("");
  const [stateName, setStateName] = useState("");
  const [originalPackageCost, setOriginalPackageCost] = useState("");
  const [originalTrsCost, setOriginalTrsCost] = useState("");
  const [originalCarServiceCost, setOriginalCarServiceCost] = useState("");
  const [originalAdditionalServiceCost, setOriginalAdditionalServiceCost] =
    useState("");
  const [finalPackageCost, setFinalPackageCost] = useState("");
  const [finalTrsCost, setFinalTrsCost] = useState("");
  const [finalCarServiceCost, setFinalCarServiceCost] = useState("");
  const [finalAdditionalServiceCost, setFinalAdditionalServiceCost] =
    useState("");

  const handleSubmit = async (e) => {
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
      state: stateName,
      originalPackageCost,
      originalTrsCost,
      originalCarServiceCost,
      originalAdditionalServiceCost,
      finalPackageCost,
      finalTrsCost,
      finalCarServiceCost,
      finalAdditionalServiceCost,
    };
    console.log(formData);

    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/add/maste/master-response/in/quatation/${quatationId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        alert("Master added successfully!");
        // Reset form fields after successful submission
        setAssociateCode("");
        setServiceSector("");
        setCompanyName("");
        setContactName("");
        setContactNumber("");
        setEmailId("");
        setGrade("");
        setLocation("");
        setHub("");
        setStateName("");
        setOriginalPackageCost("");
        setOriginalTrsCost("");
        setOriginalCarServiceCost("");
        setOriginalAdditionalServiceCost("");
        setFinalPackageCost("");
        setFinalTrsCost("");
        setFinalCarServiceCost("");
        setFinalAdditionalServiceCost("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="addnew_master_heading">Add New Master</h2>

      <form className="newAddMasterForm_container" onSubmit={handleSubmit}>
        <div className="newAddMasterForm_field">
          <label>Associate Code</label>
          <input
            type="text"
            value={associateCode}
            onChange={(e) => setAssociateCode(e.target.value)}
          />
        </div>

        <div className="newAddMasterForm_field">
          <label>Service Sector</label>
          <input
            type="text"
            value={serviceSector}
            onChange={(e) => setServiceSector(e.target.value)}
          />
        </div>

        <div className="newAddMasterForm_field">
          <label>Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="newAddMasterForm_field">
          <label>Contact Name</label>
          <input
            type="text"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
        </div>

        <div className="newAddMasterForm_field">
          <label>Contact Number</label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </div>

        <div className="newAddMasterForm_field">
          <label>Email ID</label>
          <input
            type="email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
        </div>

        <div className="newAddMasterForm_field">
          <label>Grade</label>
          <input
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </div>

        <div className="newAddMasterForm_field">
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="newAddMasterForm_field">
          <label>Hub</label>
          <input
            type="text"
            value={hub}
            onChange={(e) => setHub(e.target.value)}
          />
        </div>

        <div className="newAddMasterForm_field">
          <label>State</label>
          <input
            type="text"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
          />
        </div>

        <div className="newAddMasterForm_field">
          <label>Original Package Cost</label>
          <input
            type="text"
            value={originalPackageCost}
            onChange={(e) => setOriginalPackageCost(e.target.value)}
          />
        </div>

        <div className="newAddMasterForm_field">
          <label>Original TRS Cost</label>
          <input
            type="text"
            value={originalTrsCost}
            onChange={(e) => setOriginalTrsCost(e.target.value)}
          />
        </div>

        <div className="newAddMasterForm_field">
          <label>Original CAR Service Cost</label>
          <input
            type="text"
            value={originalCarServiceCost}
            onChange={(e) => setOriginalCarServiceCost(e.target.value)}
          />
        </div>

        <div className="newAddMasterForm_field">
          <label>Original Additional Service Cost</label>
          <input
            type="text"
            value={originalAdditionalServiceCost}
            onChange={(e) => setOriginalAdditionalServiceCost(e.target.value)}
          />
        </div>

        <div className="newAddMasterForm_field">
          <label>Final Package Cost</label>
          <input
            type="text"
            value={finalPackageCost}
            onChange={(e) => setFinalPackageCost(e.target.value)}
          />
        </div>

        <div className="newAddMasterForm_field">
          <label>Final TRS Cost</label>
          <input
            type="text"
            value={finalTrsCost}
            onChange={(e) => setFinalTrsCost(e.target.value)}
          />
        </div>

        <div className="newAddMasterForm_field">
          <label>Final CAR Service Cost</label>
          <input
            type="text"
            value={finalCarServiceCost}
            onChange={(e) => setFinalCarServiceCost(e.target.value)}
          />
        </div>

        <div className="newAddMasterForm_field">
          <label>Final Additional Service Cost</label>
          <input
            type="text"
            value={finalAdditionalServiceCost}
            onChange={(e) => setFinalAdditionalServiceCost(e.target.value)}
          />
        </div>

        <button className="newAddMasterForm_submit" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default NewMasterAdd;
