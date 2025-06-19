// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../config";
// import { useParams } from "react-router-dom";
// import "../Perches/masterpage.css";

// function MasterPage() {
//   const { id, quatationId } = useParams();
//   const token = JSON.parse(localStorage.getItem("mexcargoUserData")).token;
//   const [allMasterList, setAllMasterList] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [searchMaster, setSearchMaster] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [alreadySentMasters, setAlreadySentMasters] = useState([]);

//   useEffect(() => {
//     async function handleShowAllMasterList() {
//       try {
//         const response = await axios.get(`${BASE_URL}/get/master/list`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
//         console.log(response.data);
//         setAllMasterList(response.data);

//         const sentMastersRes = await axios.get(
//           `${BASE_URL}/get/quatation/${quatationId}/master`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         setAlreadySentMasters(sentMastersRes.data);
//       } catch (error) {
//         console.error("Error fetching master list:", error);
//       }
//     }
//     handleShowAllMasterList();
//   }, []);

//   const handleCheckboxChange = (masterId) => {
//     setSelectedItems((prev) =>
//       prev.includes(masterId)
//         ? prev.filter((id) => id !== masterId)
//         : [...prev, masterId]
//     );
//   };

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedItems(allMasterList.map((item) => item.masterId));
//     } else {
//       setSelectedItems([]);
//     }
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const requestBody = {
//         leadId: id,
//         masterIds: selectedItems,
//       };
//       console.log(requestBody);
//       const response = await axios.post(
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
//       }
//     } catch (error) {
//       console.error("Error sending to masters:", error);
//     }
//   };

//   const filtermaster = allMasterList.filter((item) =>
//     item.contactName.toLowerCase().includes(searchMaster.toLowerCase())
//   );

//   return (
//     <div className="masterpage-wrapper">
//       <div className="masterpage-header">
//         <input
//           type="search"
//           value={searchMaster}
//           onChange={(e) => setSearchMaster(e.target.value)}
//           placeholder="Search Master List"
//           className="masterpage-search-input"
//         />
//         <div className="masterpage-controls">
//           <label>
//             <input
//               type="checkbox"
//               onChange={handleSelectAll}
//               checked={
//                 allMasterList.length > 0 &&
//                 selectedItems.length === allMasterList.length
//               }
//               disabled={loading}
//             />
//             Select All
//           </label>
//           <button
//             onClick={handleSubmit}
//             disabled={selectedItems.length === 0 || loading}
//             style={{
//               marginLeft: "20px",
//               padding: "5px 15px",
//               backgroundColor:
//                 selectedItems.length === 0 || loading ? "#ccc" : "#007bff",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor:
//                 selectedItems.length === 0 || loading
//                   ? "not-allowed"
//                   : "pointer",
//             }}
//           >
//             {loading
//               ? "Sending..."
//               : `Send to Masters (${selectedItems.length})`}
//           </button>
//         </div>
//       </div>

//       <div className="masterpage-content">
//         <h2 className="masterpage-title">Master List</h2>
//         <div className="masterpage-grid">
//           {filtermaster.map((item) => (
//             <div key={item.masterId} className="masterpage-card">
//               <label className="masterpage-card-checkbox">
//                 <input
//                   type="checkbox"
//                   checked={selectedItems.includes(item.masterId)}
//                   onChange={() => handleCheckboxChange(item.masterId)}
//                 />
//                 <strong>Master ID: {item.masterId}</strong>
//               </label>
//               <p>
//                 <strong>Associate Code:</strong>{" "}
//                 <span>{item.associateCode}</span>
//               </p>
//               <p>
//                 <strong>Service Sector:</strong>{" "}
//                 <span>{item.serviceSector}</span>
//               </p>
//               <p>
//                 <strong>Company:</strong> <span>{item.companyName}</span>
//               </p>
//               <p>
//                 <strong>Contact:</strong> <span>{item.contactName}</span>
//               </p>
//               <p>
//                 <strong>Hub:</strong> <span>{item.hub}</span>
//               </p>
//               {item.contactNumber && (
//                 <p>
//                   <strong>Phone:</strong> <span>{item.contactNumber}</span>
//                 </p>
//               )}
//               {item.emailId && (
//                 <p>
//                   <strong>Email:</strong> <span>{item.emailId}</span>
//                 </p>
//               )}
//               {item.location && (
//                 <p>
//                   <strong>Location:</strong> <span>{item.location}</span>
//                 </p>
//               )}
//               {item.state && (
//                 <p>
//                   <strong>State:</strong> <span>{item.state}</span>
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MasterPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { useParams } from "react-router-dom";
import "../Perches/masterpage.css";
import axiosInstance from "../utils/axiosInstance";

function MasterPage() {
  const { id, quatationId } = useParams();
  const token = JSON.parse(localStorage.getItem("mexcargoUserData")).token;

  const [allMasterList, setAllMasterList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchMaster, setSearchMaster] = useState("");
  const [loading, setLoading] = useState(false);
  const [alreadySentMasters, setAlreadySentMasters] = useState([]);

  useEffect(() => {
    async function handleShowAllMasterList() {
      try {
        const response = await axiosInstance.get(
          `${BASE_URL}/get/master/list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setAllMasterList(response.data);

        const sentMastersRes = await axiosInstance.get(
          `${BASE_URL}/get/quatation/${quatationId}/master`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Assuming response is an array of masterId (adjust if structure is different)
        const sentIds = sentMastersRes.data.map((m) => m.masterId);
        setAlreadySentMasters(sentIds);
      } catch (error) {
        console.error("Error fetching master list:", error);
      }
    }

    handleShowAllMasterList();
  }, [quatationId, token]);

  const handleCheckboxChange = (masterId) => {
    if (alreadySentMasters.includes(masterId)) return;

    setSelectedItems((prev) =>
      prev.includes(masterId)
        ? prev.filter((id) => id !== masterId)
        : [...prev, masterId]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const selectable = allMasterList
        .map((item) => item.masterId)
        .filter((id) => !alreadySentMasters.includes(id));
      setSelectedItems(selectable);
    } else {
      setSelectedItems([]);
    }
  };

  const handleSubmit = async () => {
    const toSend = selectedItems.filter(
      (id) => !alreadySentMasters.includes(id)
    );
    if (toSend.length === 0) {
      alert("No valid masters selected to send.");
      return;
    }

    setLoading(true);
    try {
      const requestBody = {
        leadId: id,
        masterIds: toSend,
      };

      const response = await axiosInstance.post(
        `${BASE_URL}/purchaseexecutive/quatation/send-to-masters`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSelectedItems([]);
        alert("Successfully sent to selected masters!");

        // Refresh alreadySentMasters list
        const sentRes = await axiosInstance.get(
          `${BASE_URL}/get/quatation/${quatationId}/master`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setAlreadySentMasters(sentRes.data.map((m) => m.masterId));
      }
    } catch (error) {
      console.error("Error sending to masters:", error);
    } finally {
      setLoading(false);
    }
  };

  const filtermaster = allMasterList.filter(
    (item) =>
      item.contactName.toLowerCase().includes(searchMaster.toLowerCase()) ||
      item.hub.toLowerCase().includes(searchMaster.toLocaleLowerCase()) ||
      item.state.toLowerCase().includes(searchMaster.toLocaleLowerCase())
  );

  return (
    <div className="masterpage-wrapper">
      <div className="masterpage-header">
        <input
          type="search"
          value={searchMaster}
          onChange={(e) => setSearchMaster(e.target.value)}
          placeholder="Search Master List"
          className="masterpage-search-input"
        />
        <div className="masterpage-controls">
          <label>
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={
                allMasterList.length > 0 &&
                selectedItems.length ===
                  allMasterList.filter(
                    (item) => !alreadySentMasters.includes(item.masterId)
                  ).length
              }
              disabled={loading}
            />
            Select All
          </label>
          <button
            onClick={handleSubmit}
            disabled={selectedItems.length === 0 || loading}
            style={{
              marginLeft: "20px",
              padding: "5px 15px",
              backgroundColor:
                selectedItems.length === 0 || loading ? "#ccc" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor:
                selectedItems.length === 0 || loading
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {loading
              ? "Sending..."
              : `Send to Masters (${selectedItems.length})`}
          </button>
        </div>
      </div>

      <div className="masterpage-content">
        <h2 className="masterpage-title">Master List</h2>
        {/* <div className="masterpage-grid">
          {filtermaster.map((item) => {
            const isAlreadySent = alreadySentMasters.includes(item.masterId);
            return (
              <div
                key={item.masterId}
                className={`masterpage-card ${
                  isAlreadySent ? "already-sent" : ""
                }`}
                style={{
                  backgroundColor: isAlreadySent ? "#f2f2f2" : "white",
                  opacity: isAlreadySent ? 0.6 : 1,
                }}
              >
                <label className="masterpage-card-checkbox">
                  <input
                    type="checkbox"
                    disabled={isAlreadySent}
                    checked={selectedItems.includes(item.masterId)}
                    onChange={() => handleCheckboxChange(item.masterId)}
                  />
                  <strong>
                    Master ID: {item.masterId}{" "}
                    {isAlreadySent && "(Already Sent)"}
                  </strong>
                </label>
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
                {item.location && (
                  <p>
                    <strong>Grade:</strong> <span>{item.grade} star</span>
                  </p>
                )}
                {item.state && (
                  <p>
                    <strong>State:</strong> <span>{item.state}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div> */}
        <div className="masterpage_table-wrapper">
          <div className="masterpage_table-scroll">
            <table className="masterpage_table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Hub</th>
                  <th>Associate Code</th>
                  <th>Service Sector</th>
                  <th>Company</th>
                  <th>Contact</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Grade</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {filtermaster.map((item) => {
                  const isAlreadySent = alreadySentMasters.includes(
                    item.masterId
                  );
                  return (
                    <tr
                      key={item.masterId}
                      className={`masterpage_table-row ${
                        isAlreadySent ? "masterpage_table-already-sent" : ""
                      }`}
                    >
                      <td>
                        <input
                          type="checkbox"
                          disabled={isAlreadySent}
                          checked={selectedItems.includes(item.masterId)}
                          onChange={() => handleCheckboxChange(item.masterId)}
                        />
                      </td>
                      <td>{item.hub}</td>
                      <td>{item.associateCode}</td>
                      <td>{item.serviceSector}</td>
                      <td>{item.companyName}</td>
                      <td>{item.contactName}</td>
                      <td>{item.contactNumber || "-"}</td>
                      <td>{item.emailId || "-"}</td>
                      <td>{item.location || "-"}</td>
                      <td>{item.grade ? `${item.grade} star` : "-"}</td>
                      <td>{item.state || "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MasterPage;
