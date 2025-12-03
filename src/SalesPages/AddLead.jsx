// import React, { useState } from "react";
// import { IoMdArrowRoundBack, IoMdStarOutline, IoMdStar } from "react-icons/io";
// import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
// import axios from "axios";
// import axiosInstance from "../utils/axiosInstance";
// import styles from "../styles/AddLead.module.css"; // External CSS
// import { BASE_URL } from "../config";
// import { useNavigate } from "react-router-dom";

// function AddLead() {
//   const [rating, setRating] = useState(0);
//   const [activeTab, setActiveTab] = useState(0);
//   const token = JSON.parse(localStorage.getItem("mexcargoUserData"))?.token;
//   console.log(token);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     // leadReferenceNo: "",
//     date: new Date().toISOString().split("T")[0],
//     time: "",
//     modeOfCommunication: "",
//     wayOfLead: "",
//     companyName: "",
//     companySector: "",
//     companySetUp: "",
//     companyHeadOffice: "",
//     easyHubCentre: "",
//     state: "",
//     employeeName: "",
//     department: "",
//     designation: "",
//     contactNo: "",
//     landLineNo: "",
//     mailId: "",
//     endUserName: "",
//     endUserDepartment: "",
//     endUserDesignation: "",
//     endUserContactNo: "",
//     endUserLandLineNo: "",
//     endUserMailId: "",
//     source: "",
//     destination: "",
//     movingDateAndTime: new Date().toISOString().slice(0, 16),
//     receivingDateTime: "",
//     commodity: "",
//     size: "",
//     weight: "",
//     typeOfTransportation: "",
//     sizeOfTransportation: "",
//     commodityValue: "",
//     vehicleValue: "",
//     carMovingDate: "",
//     carMovingTime: "",
//     goodsTransport: "",
//     carTransport: "",
//     whenWeGetGoods: "",
//     anyThingElseRatherThanGood: "",
//     anyWarehouseFacilityRatherThanThisThings: "",
//     insuranceFacilityOfGoods: "",
//     commodityAndOtherGoodsInsuranceFacility: "",
//     otherServices: "",
//     riskCoverageGood: "",
//     additionalNeedRequests: [{ needName: "", needValue: "" }],
//     remark: "",
//     remarkDate: "",
//     remarkTime: "",
//     rating: 0,
//     followUpStatus: "",
//     followUpRequest: {
//       followUpDate: "",
//       followUpRemark: "",
//     },
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleAddField = () => {
//     setFormData({
//       ...formData,
//       additionalNeedRequests: [
//         ...formData.additionalNeedRequests,
//         { needName: "", needValue: "" },
//       ],
//     });
//   };

//   const handleFieldChange = (index, field, value) => {
//     const updatedFields = [...formData.additionalNeedRequests];
//     updatedFields[index][field] = value;
//     setFormData({ ...formData, additionalNeedRequests: updatedFields });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formData);
//     try {
//       const response = await axiosInstance.post(
//         `${BASE_URL}/created/lead`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 200) {
//         alert("Lead submitted successfully!");
//         setFormData({
//           // leadReferenceNo: "",
//           date: "",
//           time: "",
//           modeOfCommunication: "",
//           wayOfLead: "",
//           companyName: "",
//           companyHeadOffice: "",
//           easyHubCentre: "",
//           state: "",
//           employeeName: "",
//           department: "",
//           designation: "",
//           contactNo: "",
//           landLineNo: "",
//           mailId: "",
//           source: "",
//           destination: "",
//           movingDateAndTime: "",
//           receivingDateTime: "",
//           commodity: "",
//           size: "",
//           weight: "",
//           typeOfTransportation: "",
//           sizeOfTransportation: "",
//           commodityValue: "",
//           vehicleValue: "",
//           goodsTransport: "",
//           carTransport: "",
//           // whenWeGetGoods: "",
//           anyThingElseRatherThanGood: "",
//           anyWarehouseFacilityRatherThanThisThings: "",
//           insuranceFacilityOfGoods: "",
//           // commodityAndOtherGoodsInsuranceFacility: "",
//           otherServices: "",
//           additionalNeedRequests: [{ needName: "", needValue: "" }],
//           remark: "",
//           remarkDate: "",
//           remarkTime: "",
//           rating: 0,
//           followUpStatus: "",
//           followUpRequest: {
//             followUpDate: "",
//             followUpRemark: "",
//           },
//         });
//         navigate("/sales_lead_management");
//       }
//     } catch (error) {
//       console.error("Error submitting lead:", error);
//       alert("Failed to submit lead.");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <p className={styles.backButton}>
//         <IoMdArrowRoundBack onClick={() => window.history.back()} />
//       </p>

//       <h2 className={styles.leadHeading}>Add Data</h2>

//       <div className={styles.tabWrapper}>
//         <Tabs
//           selectedIndex={activeTab}
//           onSelect={(index) => setActiveTab(index)}
//         >
//           <TabList className={styles.tabList}>
//             <Tab>Lead Reference</Tab>
//             <Tab>Company Details</Tab>
//             <Tab>Employee Details</Tab>
//             <Tab> End User Details</Tab>
//             <Tab>Need</Tab>
//             <Tab>Follow Up</Tab>
//           </TabList>

//           <form className={styles.Add_lead_main_form} onSubmit={handleSubmit}>
//             {/* Lead Reference */}
//             <TabPanel className={styles.lead_ref_tabpanel}>
//               {/* <h2 className={styles.lead_ref_heading}>Lead Reference</h2> */}
//               {/* <label>Lead Reference No.</label>
//               <input
//                 type="text"
//                 name="leadReferenceNo"
//                 value={formData.leadReferenceNo}
//                 onChange={handleInputChange}
//                 className={styles.lead_ref_input}
//               /> */}

//               <label>Date</label>
//               <input
//                 type="date"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleInputChange}
//                 className={styles.lead_ref_input}
//               />

//               <label>Time</label>
//               <input
//                 type="time"
//                 name="time"
//                 value={formData.time}
//                 onChange={handleInputChange}
//                 className={styles.lead_ref_input}
//               />

//               <label>Mode Of Communication</label>
//               <input
//                 type="text"
//                 name="modeOfCommunication"
//                 value={formData.modeOfCommunication}
//                 onChange={handleInputChange}
//                 className={styles.lead_ref_input}
//               />

//               <label>Lead Source</label>
//               <select
//                 name="wayOfLead"
//                 value={formData.wayOfLead}
//                 onChange={handleInputChange}
//                 className={styles.lead_ref_select}
//               >
//                 <option value="">Select Way Of Lead</option>
//                 <option value="PHONE">PHONE</option>
//                 <option value="EMAIL">EMAIL</option>
//                 <option value="WHATSAPP">WHATSAPP</option>
//                 <option value="PHYSICAL_MEETING">PHYSICAL MEETING</option>
//                 <option value="NET_SEARCHING">NET SEARCHING</option>
//               </select>
//               <button
//                 type="button"
//                 className={styles.nextButton}
//                 onClick={() => setActiveTab(1)}
//               >
//                 Next
//               </button>
//             </TabPanel>

//             {/* Company Details */}
//             <TabPanel className={styles.company_detail_tabpannel}>
//               <h2 className={styles.tabHeading}>Company Details</h2>
//               <input
//                 type="text"
//                 name="companyName"
//                 value={formData.companyName}
//                 onChange={handleInputChange}
//                 placeholder="Company Name"
//               />
//               <input
//                 type="text"
//                 name="companySector"
//                 value={formData.companySector}
//                 onChange={handleInputChange}
//                 placeholder="Company Sector"
//               />
//               <input
//                 type="text"
//                 name="companySetUp"
//                 value={formData.companySetUp}
//                 onChange={handleInputChange}
//                 placeholder="Company Set Up"
//               />
//               <input
//                 type="text"
//                 name="companyHeadOffice"
//                 value={formData.companyHeadOffice}
//                 onChange={handleInputChange}
//                 placeholder="Company Head Office"
//               />
//               <input
//                 type="text"
//                 name="easyHubCentre" // Changed from EasyHub to match body
//                 placeholder="Easy Hub Center"
//                 value={formData.easyHubCentre}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="text"
//                 name="state"
//                 value={formData.state}
//                 onChange={handleInputChange}
//                 placeholder="State"
//               />

//               <button
//                 type="button"
//                 className={styles.nextButton}
//                 onClick={() => setActiveTab(2)}
//               >
//                 Next
//               </button>
//             </TabPanel>

//             {/* Employee Details */}
//             <TabPanel className={styles.employe_detail_tabpannel}>
//               <h2 className={styles.employe_detail_tabHeading}>
//                 Company Employee Details
//               </h2>
//               <input
//                 type="text"
//                 name="employeeName"
//                 value={formData.employeeName}
//                 onChange={handleInputChange}
//                 placeholder="Employee Name"
//               />
//               <input
//                 type="text"
//                 name="department"
//                 value={formData.department}
//                 onChange={handleInputChange}
//                 placeholder="Department"
//               />
//               <input
//                 type="text"
//                 name="designation"
//                 value={formData.designation}
//                 onChange={handleInputChange}
//                 placeholder="Designation"
//               />

//               <input
//                 type="text"
//                 name="contactNo"
//                 value={formData.contactNo}
//                 onChange={handleInputChange}
//                 placeholder="Contact No."
//               />
//               <input
//                 type="text"
//                 name="landLineNo"
//                 value={formData.landLineNo}
//                 onChange={handleInputChange}
//                 placeholder="Landline"
//               />
//               <input
//                 type="text"
//                 name="mailId"
//                 placeholder="Mail ID"
//                 value={formData.mailId}
//                 onChange={handleInputChange}
//               />
//               <button
//                 type="button"
//                 className={styles.nextButton}
//                 onClick={() => setActiveTab(3)}
//               >
//                 Next
//               </button>
//             </TabPanel>
//             <TabPanel className={styles.end_user_tabpannel}>
//               <h2 className={styles.end_user_tabHeading}>End User Details</h2>

//               <input
//                 type="text"
//                 name="endUserName"
//                 value={formData.endUserName}
//                 placeholder=" End User Name"
//                 className={styles.end_user_input_field}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="text"
//                 name="endUserDepartment"
//                 value={formData.endUserDepartment}
//                 placeholder="User Department"
//                 className={styles.end_user_input_field}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="text"
//                 name="endUserDesignation"
//                 value={formData.endUserDesignation}
//                 placeholder="User Designation"
//                 className={styles.end_user_input_field}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="text"
//                 name="endUserContactNo"
//                 value={formData.endUserContactNo}
//                 placeholder="User Contact No."
//                 className={styles.end_user_input_field}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="text"
//                 name="endUserLandLineNo"
//                 value={formData.endUserLandLineNo}
//                 placeholder="User Landline"
//                 className={styles.end_user_input_field}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="email"
//                 name="endUserMailId"
//                 value={formData.endUserMailId}
//                 placeholder="User Email"
//                 className={styles.end_user_input_field}
//                 onChange={handleInputChange}
//               />
//               <button
//                 type="button"
//                 className={styles.nextButton}
//                 onClick={() => setActiveTab(4)}
//               >
//                 Next
//               </button>
//             </TabPanel>
//             {/* Need */}
//             <TabPanel className={styles.need_tabpannel}>
//               <h2 className={styles.need_tabHeading}>Need</h2>
//               <div className={styles.source}>
//                 <input
//                   type="search"
//                   name="source"
//                   placeholder="Origin"
//                   value={formData.source}
//                   onChange={handleInputChange}
                
//                 />
//                 To
//                 <input
//                   type="search"
//                   name="destination"
//                   placeholder="Destination"
//                   value={formData.destination}
//                   onChange={handleInputChange}
                
//                 />
//               </div>

//               <label htmlFor="movingDateAndTime">Moving Date</label>
//               <input
//                 type="date"
//                 name="movingDate"
//                 value={
//                   formData.movingDateAndTime?.split("T")[0] ||
//                   new Date().toISOString().split("T")[0]
//                 }
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     movingDateAndTime: `${e.target.value}T${
//                       formData.movingDateAndTime?.split("T")[1] || "00:00"
//                     }`,
//                   })
//                 }
//               />

//               <label htmlFor="movingTime">Moving Time</label>
//               <input
//                 type="time"
//                 name="movingTime"
//                 value={formData.movingDateAndTime?.split("T")[1] || "00:00"}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     movingDateAndTime: `${
//                       formData.movingDateAndTime?.split("T")[0] ||
//                       new Date().toISOString().split("T")[0]
//                     }T${e.target.value}`,
//                   })
//                 }
//               />

//               <label htmlFor="receivingDateTime">Expected Receiving Date</label>
//               <input
//                 type="date"
//                 name="receivingDateTime"
//                 value={formData.receivingDateTime.split("T")[0]}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     receivingDateTime: `${e.target.value}T${
//                       formData.receivingDateTime.split("T")[1] || "00:00"
//                     }`,
//                   })
//                 }
//               />

//               <label htmlFor="receivingTime">Expected Receiving Time</label>
//               <input
//                 type="time"
//                 name="receivingDateTime"
//                 value={formData.receivingDateTime.split("T")[1] || ""}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     receivingDateTime: `${
//                       formData.receivingDateTime.split("T")[0]
//                     }T${e.target.value}`,
//                   })
//                 }
//               />

//               <input
//                 type="text"
//                 name="commodity"
//                 placeholder="Commodity"
//                 value={formData.commodity}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="size"
//                 placeholder="Dimension"
//                 value={formData.size}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="weight"
//                 placeholder="Weight"
//                 value={formData.weight}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="typeOfTransportation"
//                 placeholder="Type of Transportation"
//                 value={formData.typeOfTransportation}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="sizeOfTransportation"
//                 placeholder="Size of vehicle"
//                 value={formData.sizeOfTransportation}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="commodityValue"
//                 placeholder=" Value of Commodity "
//                 value={formData.commodityValue}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="vehicleValue"
//                 placeholder="Car Vehicle Name "
//                 value={formData.vehicleValue}
//                 onChange={handleInputChange}
//               />

//               <label htmlFor=""> Car Moving Date:</label>
//               <input
//                 type="date"
//                 name="carMovingDate"
//                 placeholder="Car Vehicle Name "
//                 value={formData.carMovingDate}
//                 onChange={handleInputChange}
//               />
//               <label htmlFor=""> Car Moving Time:</label>
//               <input
//                 type="time"
//                 name="carMovingTime"
//                 placeholder="Car Vehicle Name "
//                 value={formData.carMovingTime}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="text"
//                 name="goodsTransport"
//                 placeholder="mode of transport"
//                 value={formData.goodsTransport}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="carTransport"
//                 placeholder="car"
//                 value={formData.carTransport}
//                 onChange={handleInputChange}
//               />

//               <select
//                 name="otherServices"
//                 onChange={handleInputChange}
//                 value={formData.otherServices}
//               >
//                 <option value="">Other Services</option>
//                 <option value="AIR_CONDITION">Air Condition</option>
//                 <option value="TV_INSTALLATION">TV Installation</option>
//                 <option value="DISH_ANTENNA">Dish Antenna</option>
//                 <option value="WATER_GEYSER">Water Geyser</option>
//                 <option value="HYDRAULIC_BAG">Hydraulic Bag</option>
//                 <option value="FURNITURE_MADE_OF_ENGINEERED_WOOD">
//                   Furniture Made of Engineered Wood
//                 </option>
//               </select>
//               {/* 
//               <input
//                 type="text"
//                 name="anyWarehouseFacilityRatherThanThisThings"
//                 placeholder="Any Warehouse Facility Rather than These Things"
//                 value={formData.anyWarehouseFacilityRatherThanThisThings}
//                 onChange={handleInputChange}
//               /> */}

//               {/* <input
//                 type="text"
//                 name="insuranceFacilityOfGoods"
//                 placeholder="Insurance Facility Of Goods"
//                 value={formData.insuranceFacilityOfGoods}
//                 onChange={handleInputChange}
//               /> */}

//               <select
//                 name="riskCoverageGood"
//                 value={formData.riskCoverageGood}
//                 onChange={handleInputChange}
//               >
//                 <option value=""> Risk Coverage Of Goods</option>
//                 <option value="OWNER_RISK">Owner risk</option>
//                 <option value="CAREER_RISK">Career risk</option>
//               </select>

//               <h3> Extra Fields</h3>
//               {formData.additionalNeedRequests.map((field, index) => (
//                 <div key={index} className={styles.additionalField}>
//                   <input
//                     type="text"
//                     placeholder="Article Name"
//                     value={field.needName}
//                     onChange={(e) =>
//                       handleFieldChange(index, "needName", e.target.value)
//                     }
//                   />
//                   <input
//                     type="text"
//                     placeholder="Article Value"
//                     value={field.needValue}
//                     onChange={(e) =>
//                       handleFieldChange(index, "needValue", e.target.value)
//                     }
//                   />
//                   <input
//                     type="text"
//                     placeholder="Article Dimension"
//                     value={field.articleDimension}
//                     onChange={(e) =>
//                       handleFieldChange(
//                         index,
//                         "articleDimension",
//                         e.target.value
//                       )
//                     }
//                   />
//                 </div>
//               ))}
//               <button type="button" onClick={handleAddField}>
//                 Add Field
//               </button>
//               <button
//                 type="button"
//                 className={styles.nextButton}
//                 onClick={() => setActiveTab(5)}
//               >
//                 Next
//               </button>
//             </TabPanel>

//             {/* Note */}
//             <TabPanel className={styles.note_tabpanel}>
//               <h2 className={styles.note_tabHeading}>Follow Up </h2>
//               <input
//                 type="text"
//                 name="remark"
//                 value={formData.remark}
//                 onChange={handleInputChange}
//                 placeholder="Remark"
//               />
//               <input
//                 type="date"
//                 name="remarkDate"
//                 value={formData.remarkDate}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="time"
//                 name="remarkTime"
//                 value={formData.remarkTime}
//                 onChange={handleInputChange}
//               />
//               <div className={styles.rating}>
//                 {[...Array(5)].map((_, index) => (
//                   <span
//                     key={index}
//                     onClick={() =>
//                       setFormData({ ...formData, rating: String(index + 1) })
//                     }
//                     className={
//                       index < parseInt(formData.rating) ? styles.starActive : ""
//                     }
//                   >
//                     {index < parseInt(formData.rating) ? (
//                       <IoMdStar />
//                     ) : (
//                       <IoMdStarOutline />
//                     )}
//                   </span>
//                 ))}
//               </div>

//               <select
//                 name="followUpStatus"
//                 value={formData.followUpStatus || ""}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     followUpStatus: e.target.value,
//                   })
//                 }
//               >
//                 <option value="">Select Status</option>
//                 <option value="ONGOING">ONGOING</option>
//                 <option value="COMPLETED">COMPLETED</option>
//               </select>
//               <label htmlFor="followUpDate">Next Follow Up Date</label>
//               <input
//                 type="date"
//                 name="followUpRequest.followUpDate"
//                 value={formData.followUpRequest.followUpDate}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     followUpRequest: {
//                       ...formData.followUpRequest,
//                       followUpDate: e.target.value,
//                     },
//                   })
//                 }
//               />

//               <input
//                 type="text"
//                 name="followUpRequest.followUpRemark"
//                 placeholder="Follow Up Remark"
//                 value={formData.followUpRequest.followUpRemark}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     followUpRequest: {
//                       ...formData.followUpRequest,
//                       followUpRemark: e.target.value,
//                     },
//                   })
//                 }
//               />

//               <button type="submit" className={styles.submitButton}>
//                 Submit
//               </button>
//             </TabPanel>
//           </form>
//         </Tabs>
//       </div>
//     </div>
//   );
// }

// export default AddLead;
































import React, { useState } from "react";
import { IoMdArrowRoundBack, IoMdStarOutline, IoMdStar } from "react-icons/io";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axiosInstance from "../utils/axiosInstance";
import styles from "../styles/AddLead.module.css";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

function AddLead() {
  const [activeTab, setActiveTab] = useState(0);
  const token = JSON.parse(localStorage.getItem("mexcargoUserData"))?.token;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0], // yyyy-mm-dd
    time: "", // simple "HH:MM" string (Option A)
    modeOfCommunication: "",
    wayOfLead: "",
    dataReference: "",
    companyName: "",
    companySector: "",
    companySetUp: "",
    companyHeadOffice: "",
    easyHubCentre: "",
    state: "",
    employeeName: "",
    department: "",
    designation: "",
    contactNo: "",
    landLineNo: "",
    mailId: "",
    endUserName: "",
    endUserDepartment: "",
    endUserDesignation: "",
    endUserContactNo: "",
    endUserLandLineNo: "",
    endUserMailId: "",
    source: "",
    destination: "",
    originFloorNo: "",
destinationFloorNo: "",
originDetailsAddress: "",
destinationDetailsAddress: "",
isLiftAvailableInOrigin: "",
isLiftAvailableInDestination: "",
specialService: "",
secondaryVehicle: "",

    // movingDateAndTime stored as "YYYY-MM-DDTHH:MM" string OR empty string
    movingDateAndTime: new Date().toISOString().slice(0, 16),
    receivingDateTime: "",
    commodity: "",
    size: "",
    weight: "",
    typeOfTransportation: "",
    sizeOfTransportation: "",
    commodityValue: "",
    vehicleValue: "",
    carMovingDate: "",
    carMovingTime: "", // simple "HH:MM"
     carReceivingDate: "",
  carReceivingTime: "",
    goodsTransport: "",
    carTransport: "",
    whenWeGetGoods: "",
    anyThingElseRatherThanGood: "",
    anyWarehouseFacilityRatherThanThisThings: "",
    insuranceFacilityOfGoods: "",
    commodityAndOtherGoodsInsuranceFacility: "",
    otherServices: "",
    riskCoverageGood: "",
    // internal fields: additionalNeedRequests keep as needName/needValue/articleDimension
    additionalNeedRequests: [{ needName: "", needValue: "", articleDimension: "" ,articleWeight: ""}],
    remark: "",
    remarkDate: "",
    remarkTime: "",
    rating: 0,
    followUpStatus: "",
    followUpRequest: {
      followUpDate: "",
      followUpRemark: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddField = () => {
    setFormData((prev) => ({
      ...prev,
      additionalNeedRequests: [
        ...prev.additionalNeedRequests,
        { needName: "", needValue: "", articleDimension: "" },
      ],
    }));
  };

  const handleFieldChange = (index, field, value) => {
    const updatedFields = [...formData.additionalNeedRequests];
    updatedFields[index] = { ...updatedFields[index], [field]: value };
    setFormData((prev) => ({ ...prev, additionalNeedRequests: updatedFields }));
  };

  // helpers to set movingDate/time safely (movingDateAndTime stored as "YYYY-MM-DDTHH:MM")
  const setMovingDate = (dateValue) => {
    const timePart = formData.movingDateAndTime?.split("T")[1] || "00:00";
    setFormData((prev) => ({
      ...prev,
      movingDateAndTime: `${dateValue}T${timePart}`,
    }));
  };

  const setMovingTime = (timeValue) => {
    const datePart = formData.movingDateAndTime?.split("T")[0] || new Date().toISOString().split("T")[0];
    setFormData((prev) => ({
      ...prev,
      movingDateAndTime: `${datePart}T${timeValue}`,
    }));
  };

  // Safe getters for splitting ISO-ish strings
  const getDatePart = (isoLike) => isoLike?.split?.("T")?.[0] || "";
  const getTimePart = (isoLike) => isoLike?.split?.("T")?.[1] || "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert additionalNeedRequests -> backend expects articleName/articleValue/articleDimension (example)
    const mappedAdditional = (formData.additionalNeedRequests || []).map((f) => ({
      articleName: f.needName || null,
      articleValue: f.needValue || null,
      articleDimension: f.articleDimension || null,
      articleWeight: f.articleWeight || null,
    }));

    // Build the payload that matches backend shape, converting empty strings to null
   const payload = {
  date: formData.date || null,
  time: formData.time || null, // HH:MM
  modeOfCommunication: formData.modeOfCommunication || null,
  wayOfLead: formData.wayOfLead || null,
  dataReference: formData.dataReference || null,
  companyName: formData.companyName || null,
  companySector: formData.companySector || null,
  companySetUp: formData.companySetUp || null,
  companyHeadOffice: formData.companyHeadOffice || null,
  easyHubCentre: formData.easyHubCentre || null,
  state: formData.state || null,

  employeeName: formData.employeeName || null,
  department: formData.department || null,
  designation: formData.designation || null,
  contactNo: formData.contactNo || null,
  landLineNo: formData.landLineNo || null,
  mailId: formData.mailId || null,

  endUserName: formData.endUserName || null,
  endUserDepartment: formData.endUserDepartment || null,
  endUserDesignation: formData.endUserDesignation || null,
  endUserContactNo: formData.endUserContactNo || null,
  endUserLandLineNo: formData.endUserLandLineNo || null,
  endUserMailId: formData.endUserMailId || null,

  source: formData.source || null,
  destination: formData.destination || null,
originFloorNo: formData.originFloorNo || null,
destinationFloorNo: formData.destinationFloorNo || null,
originDetailsAddress: formData.originDetailsAddress || null,
destinationDetailsAddress: formData.destinationDetailsAddress || null,

isLiftAvailableInOrigin:
  formData.isLiftAvailableInOrigin === "" ? null : formData.isLiftAvailableInOrigin,

isLiftAvailableInDestination:
  formData.isLiftAvailableInDestination === "" ? null : formData.isLiftAvailableInDestination,

specialService: formData.specialService || null,
secondaryVehicle: formData.secondaryVehicle || null,

  movingDateAndTime: formData.movingDateAndTime || null, // YYYY-MM-DDTHH:MM
  receivingDateTime: formData.receivingDateTime || null, // YYYY-MM-DDTHH:MM

  commodity: formData.commodity || null,
  size: formData.size || null,
  weight: formData.weight || null,
  typeOfTransportation: formData.typeOfTransportation || null,
  sizeOfTransportation: formData.sizeOfTransportation || null,
  commodityValue: formData.commodityValue || null,
  vehicleValue: formData.vehicleValue || null,

  goodsTransport: formData.goodsTransport || null,
  carTransport: formData.carTransport || null,
  carMovingDate: formData.carMovingDate || null,
  carMovingTime: formData.carMovingTime || null, // HH:MM
  carReceivingDate: formData.carReceivingDate || null,
  carReceivingTime: formData.carReceivingTime || null,

  whenWeGetGoods: formData.whenWeGetGoods || null,
  anyThingElseRatherThanGood: formData.anyThingElseRatherThanGood || null,
  anyWarehouseFacilityRatherThanThisThings:
    formData.anyWarehouseFacilityRatherThanThisThings || null,
  insuranceFacilityOfGoods: formData.insuranceFacilityOfGoods || null,
  commodityAndOtherGoodsInsuranceFacility:
    formData.commodityAndOtherGoodsInsuranceFacility || null,
  otherServices: formData.otherServices || null,
  riskCoverageGood: formData.riskCoverageGood || null,

  additionalNeedRequests: mappedAdditional,

  remark: formData.remark || null,
  remarkDate: formData.remarkDate || null,
  remarkTime: formData.remarkTime || null,
  rating: formData.rating ? Number(formData.rating) : null,

  followUpStatus: formData.followUpStatus || null,
  followUpRequest: {
    followUpDate: formData.followUpRequest?.followUpDate || null,
    followUpRemark: formData.followUpRequest?.followUpRemark || null,
  },
};
    try {
      const response = await axiosInstance.post(`${BASE_URL}/created/lead`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert("Lead submitted successfully!");
        // reset form to initial state (you can customize)
        setFormData({
           date: new Date().toISOString().split("T")[0], // yyyy-mm-dd
    time: "", // simple "HH:MM" string (Option A)
    modeOfCommunication: "",
    wayOfLead: "",
    dataReference: "",
    companyName: "",
    companySector: "",
    companySetUp: "",
    companyHeadOffice: "",
    easyHubCentre: "",
    state: "",
    employeeName: "",
    department: "",
    designation: "",
    contactNo: "",
    landLineNo: "",
    mailId: "",
    endUserName: "",
    endUserDepartment: "",
    endUserDesignation: "",
    endUserContactNo: "",
    endUserLandLineNo: "",
    endUserMailId: "",
    source: "",
    destination: "",
    originFloorNo: "",
destinationFloorNo: "",
originDetailsAddress: "",
destinationDetailsAddress: "",
isLiftAvailableInOrigin: "",
isLiftAvailableInDestination: "",
specialService: "",
secondaryVehicle: "",

    // movingDateAndTime stored as "YYYY-MM-DDTHH:MM" string OR empty string
    movingDateAndTime: new Date().toISOString().slice(0, 16),
    receivingDateTime: "",
    commodity: "",
    size: "",
    weight: "",
    typeOfTransportation: "",
    sizeOfTransportation: "",
    commodityValue: "",
    vehicleValue: "",
    carMovingDate: "",
    carMovingTime: "", // simple "HH:MM"
     carReceivingDate: "",
  carReceivingTime: "",
    goodsTransport: "",
    carTransport: "",
    whenWeGetGoods: "",
    anyThingElseRatherThanGood: "",
    anyWarehouseFacilityRatherThanThisThings: "",
    insuranceFacilityOfGoods: "",
    commodityAndOtherGoodsInsuranceFacility: "",
    otherServices: "",
    riskCoverageGood: "",
    // internal fields: additionalNeedRequests keep as needName/needValue/articleDimension
    additionalNeedRequests: [{ needName: "", needValue: "", articleDimension: "" ,articleWeight: ""}],
    remark: "",
    remarkDate: "",
    remarkTime: "",
    rating: 0,
    followUpStatus: "",
    followUpRequest: {
      followUpDate: "",
      followUpRemark: "",
    },
        });
        navigate("/sales_lead_management");
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
      alert("Failed to submit lead.");
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.backButton}>
        <IoMdArrowRoundBack onClick={() => window.history.back()} />
      </p>

      <h2 className={styles.leadHeading}>Add Data</h2>

      <div className={styles.tabWrapper}>
        <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
          <TabList className={styles.tabList}>
            <Tab>Lead Reference</Tab>
            <Tab>Company Details</Tab>
            <Tab>Employee Details</Tab>
            <Tab>End User Details</Tab>
            <Tab>Need</Tab>
            <Tab>Follow Up</Tab>
          </TabList>

          <form className={styles.Add_lead_main_form} onSubmit={handleSubmit}>
            {/* Lead Reference */}
            <TabPanel className={styles.lead_ref_tabpanel}>
  <label>Date</label>
  <input
    type="date"
    name="date"
    value={formData.date}
    onChange={handleInputChange}
    className={styles.lead_ref_input}
  />

  <label>Time</label>
  <input
    type="time"
    name="time"
    value={formData.time}
    onChange={handleInputChange}
    className={styles.lead_ref_input}
  />

  {/* MODE OF COMMUNICATION */}
  <label>Mode Of Communication</label>
  <select
    name="modeOfCommunication"
    value={formData.modeOfCommunication}
    onChange={handleInputChange}
    className={styles.lead_ref_select}
  >
    <option value="">SELECT MODE OF COMMUNICATION</option>
    <option value="PHONE">PHONE</option>
    <option value="EMAIL">EMAIL</option>
    <option value="WHATSAPP">WHATSAPP</option>
    <option value="SMS">SMS</option>
    <option value="PERSONAL_VISIT">PERSONAL VISIT</option>
    <option value="NET_SEARCHING">NET SEARCHING</option>
    <option value="OTHER">OTHER</option>
  </select>

  {/* LEAD SOURCE */}
  <label>Lead Source</label>
  <select
    name="wayOfLead"
    value={formData.wayOfLead}
    onChange={handleInputChange}
    className={styles.lead_ref_select}
  >
    <option value="">SELECT LEAD SOURCE</option>
    <option value="VENDOR">VENDOR</option>
    <option value="REFERENCES">REFERENCES</option>
    <option value="BULK_LIST">BULK LIST</option>
    <option value="PREVIOUS_CLIENT">PREVIOUS CLIENT</option>
    <option value="GMV">GMV (GOOGLE MY BUSINESS)</option>
    <option value="LEAD_PURCHASE">LEAD PURCHASE</option>
    <option value="SOCIAL_MEDIA">SOCIAL MEDIA</option>
    <option value="MARKETING">MARKETING</option>
    <option value="PHYSICAL_LINK">PHYSICAL LINK</option>
    <option value="ADVERTISMENT">ADVERTISMENT</option>
    <option value="ASSOCIATED_PARTNER">ASSOCIATED PARTNER</option>
    <option value="MOVING_PARTNER">MOVING PARTNER</option>
    <option value="GET_BY_SALES_TEAM">GET BY SALES TEAM</option>
    <option value="OTHER">OTHER</option>
  </select>

  {/* NEW FIELD: DATA REFERENCE */}
  <label>Data Reference</label>
  <select
    name="dataReference"
    value={formData.dataReference}
    onChange={handleInputChange}
    className={styles.lead_ref_select}
  >
  <option value="">SELECT DATA REFERENCE</option>

<option value="CORPORATE_REFERENCE">CORPORATE REFERENCE</option>
<option value="BULK_DIRECTLY">BULK DIRECTLY</option>
<option value="LEAD_REFERENCE_PROCEDURE">LEAD REFERENCE PROCEDURE</option>
<option value="LEAD_REFERENCE_PROSECUTOR">LEAD REFERENCE PROSECUTOR</option>
<option value="LEAD_PROSECUTOR">LEAD PROSECUTOR</option>
<option value="BULK_TRANSFER_LIST">BULK TRANSFER LIST</option>
<option value="GMV">GMV</option>
<option value="GMB">GMB</option>

<option value="LEAD_PURCHASE">LEAD PURCHASE</option>
<option value="CAMPAIGN">CAMPAIGN</option>
<option value="CAMPAIGNING">CAMPAIGNING</option>

<option value="SOCIAL_MEDIA_MARKETING">SOCIAL MEDIA MARKETING</option>

<option value="ASSOCIATED_PARTNER">ASSOCIATED PARTNER</option>
<option value="ASSOCIATE_PARTNER">ASSOCIATE PARTNER</option>

<option value="MOVING_PARTNER">MOVING PARTNER</option>

<option value="BY_SALES_TEAM">BY SALES TEAM</option>
<option value="SALES_TEAM_REFERRAL">SALES TEAM REFERRAL</option>

<option value="OTHER">OTHER</option>

  </select>

  <button
    type="button"
    className={styles.nextButton}
    onClick={() => setActiveTab(1)}
  >
    Next
  </button>
</TabPanel>


            {/* Company Details */}
            <TabPanel className={styles.company_detail_tabpannel}>
              <h2 className={styles.tabHeading}>Company Details</h2>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Company Name" />
              <input type="text" name="companySector" value={formData.companySector} onChange={handleInputChange} placeholder="Company Sector" />
              <input type="text" name="companySetUp" value={formData.companySetUp} onChange={handleInputChange} placeholder="Company Set Up" />
              <input type="text" name="companyHeadOffice" value={formData.companyHeadOffice} onChange={handleInputChange} placeholder="Company Head Office" />
              <input type="text" name="easyHubCentre" value={formData.easyHubCentre} onChange={handleInputChange} placeholder="Easy Hub Center" />
              <input type="text" name="minorHub" value={formData.minorHub} onChange={handleInputChange} placeholder="Minor Hub" />
              <input type="text" name="majorHub" value={formData.majorHub} onChange={handleInputChange} placeholder="Major Hub" />
              <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" />

              <button type="button" className={styles.nextButton} onClick={() => setActiveTab(2)}>
                Next
              </button>
            </TabPanel>

            {/* Employee Details */}
            <TabPanel className={styles.employe_detail_tabpannel}>
              <h2 className={styles.employe_detail_tabHeading}>Company Employee Details</h2>
              <input type="text" name="employeeName" value={formData.employeeName} onChange={handleInputChange} placeholder="Employee Name" />
              <input type="text" name="department" value={formData.department} onChange={handleInputChange} placeholder="Department" />
              <input type="text" name="designation" value={formData.designation} onChange={handleInputChange} placeholder="Designation" />
              <input type="text" name="contactNo" value={formData.contactNo} onChange={handleInputChange} placeholder="Contact No." />
              <input type="text" name="landLineNo" value={formData.landLineNo} onChange={handleInputChange} placeholder="Landline" />
              <input type="text" name="mailId" value={formData.mailId} onChange={handleInputChange} placeholder="Mail ID" />

              <button type="button" className={styles.nextButton} onClick={() => setActiveTab(3)}>
                Next
              </button>
            </TabPanel>

            {/* End User */}
            <TabPanel className={styles.end_user_tabpannel}>
              <h2 className={styles.end_user_tabHeading}>End User Details</h2>
              <input type="text" name="endUserName" value={formData.endUserName} onChange={handleInputChange} placeholder="End User Name" />
              <input type="text" name="endUserDepartment" value={formData.endUserDepartment} onChange={handleInputChange} placeholder="User Department" />
              <input type="text" name="endUserDesignation" value={formData.endUserDesignation} onChange={handleInputChange} placeholder="User Designation" />
              <input type="text" name="endUserContactNo" value={formData.endUserContactNo} onChange={handleInputChange} placeholder="User Contact No." />
              <input type="text" name="endUserLandLineNo" value={formData.endUserLandLineNo} onChange={handleInputChange} placeholder="User Landline" />
              <input type="email" name="endUserMailId" value={formData.endUserMailId} onChange={handleInputChange} placeholder="User Email" />

              <button type="button" className={styles.nextButton} onClick={() => setActiveTab(4)}>
                Next
              </button>
            </TabPanel>




    {/* NEED TAB */}
<TabPanel className={styles.need_tabpannel}>
  <h2 className={styles.need_tabHeading}>Need Details</h2>

  {/* ORIGIN / DESTINATION */}
  <label>Origin</label>
  <input
    type="text"
    name="source"
    placeholder="Enter Origin Location"
    value={formData.source}
    onChange={handleInputChange}
  />

  <label>Destination</label>
  <input
    type="text"
    name="destination"
    placeholder="Enter Destination Location"
    value={formData.destination}
    onChange={handleInputChange}
  />

  {/* FLOOR NUMBERS */}
  <label>Origin Floor No</label>
  <input
    type="text"
    name="originFloorNo"
    placeholder="Enter Floor No (Origin)"
    value={formData.originFloorNo}
    onChange={handleInputChange}
  />

  <label>Destination Floor No</label>
  <input
    type="text"
    name="destinationFloorNo"
    placeholder="Enter Floor No (Destination)"
    value={formData.destinationFloorNo}
    onChange={handleInputChange}
  />

  {/* FULL ADDRESSES */}
  <label>Origin Full Address</label>
  <textarea
    name="originDetailsAddress"
    placeholder="Enter Complete Origin Address"
    value={formData.originDetailsAddress}
    onChange={handleInputChange}
  />

  <label>Destination Full Address</label>
  <textarea
    name="destinationDetailsAddress"
    placeholder="Enter Complete Destination Address"
    value={formData.destinationDetailsAddress}
    onChange={handleInputChange}
  />

  {/* LIFT AVAILABILITY */}
  <label>Lift Available at Origin?</label>
  <select
    name="isLiftAvailableInOrigin"
    value={formData.isLiftAvailableInOrigin}
    onChange={handleInputChange}
  >
    <option value="">SELECT</option>
    <option value={true}>YES</option>
    <option value={false}>NO</option>
  </select>

  <label>Lift Available at Destination?</label>
  <select
    name="isLiftAvailableInDestination"
    value={formData.isLiftAvailableInDestination}
    onChange={handleInputChange}
  >
    <option value="">SELECT</option>
    <option value={true}>YES</option>
    <option value={false}>NO</option>
  </select>

  {/* SPECIAL SERVICE */}
  <label>Special Service</label>
  <input
    type="text"
    name="specialService"
    placeholder="Enter Special Services (Optional)"
    value={formData.specialService}
    onChange={handleInputChange}
  />

  {/* SECONDARY VEHICLE */}
  <label>Secondary Vehicle</label>
  <input
    type="text"
    name="secondaryVehicle"
    placeholder="Enter Secondary Vehicle Details"
    value={formData.secondaryVehicle}
    onChange={handleInputChange}
  />

  {/* MOVING DATE & TIME */}
  <label>Moving Date</label>
  <input
    type="date"
    value={getDatePart(formData.movingDateAndTime)}
    onChange={(e) => setMovingDate(e.target.value)}
  />

  <label>Moving Time</label>
  <input
    type="time"
    value={getTimePart(formData.movingDateAndTime)}
    onChange={(e) => setMovingTime(e.target.value)}
  />

  {/* RECEIVING DATE & TIME */}
  <label>Receiving Date</label>
  <input
    type="date"
    value={getDatePart(formData.receivingDateTime)}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        receivingDateTime: `${e.target.value}T${getTimePart(prev.receivingDateTime) || "00:00"}`
      }))
    }
  />

  <label>Receiving Time</label>
  <input
    type="time"
    value={getTimePart(formData.receivingDateTime)}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        receivingDateTime: `${getDatePart(prev.receivingDateTime) || ""}T${e.target.value}`
      }))
    }
  />

  {/* COMMODITY DETAILS */}
  <label>Commodity</label>
  <input
    type="text"
    name="commodity"
    placeholder="Enter Commodity (Household, Furniture, Vehicle, etc.)"
    value={formData.commodity}
    onChange={handleInputChange}
  />

  <label>Commodity Size</label>
  <input
    type="text"
    name="size"
    placeholder="Enter Commodity Size"
    value={formData.size}
    onChange={handleInputChange}
  />

  <label>Weight</label>
  <input
    type="text"
    name="weight"
    placeholder="Enter Weight"
    value={formData.weight}
    onChange={handleInputChange}
  />

  <label>Second Weight</label>
  <input
    type="text"
    name="secondWeightValue"
    placeholder="Enter Second Weight"
    value={formData.secondWeightValue}
    onChange={handleInputChange}
  />

  <label>Overall Weight</label>
  <input
    type="text"
    name="overAllWeightValue"
    placeholder="Enter Overall Weight"
    value={formData.overAllWeightValue}
    onChange={handleInputChange}
  />

  {/* TRANSPORT */}
  <label>Type of Transportation</label>
  <input
    type="text"
    name="typeOfTransportation"
    placeholder="Enter Type of Transportation"
    value={formData.typeOfTransportation}
    onChange={handleInputChange}
  />

  <label>Size of Transportation</label>
  <input
    type="text"
    name="sizeOfTransportation"
    placeholder="Enter Transportation Size"
    value={formData.sizeOfTransportation}
    onChange={handleInputChange}
  />

  <label>Preferred Route</label>
  <input
    type="text"
    name="preferredRoot"
    placeholder="Enter Preferred Route"
    value={formData.preferredRoot}
    onChange={handleInputChange}
  />

  {/* VALUES */}
  <label>Commodity Value</label>
  <input
    type="text"
    name="commodityValue"
    placeholder="Enter Commodity Value"
    value={formData.commodityValue}
    onChange={handleInputChange}
  />

  <label>Vehicle Value</label>
  <input
    type="text"
    name="vehicleValue"
    placeholder="Enter Vehicle Value"
    value={formData.vehicleValue}
    onChange={handleInputChange}
  />

  {/* GOODS TRANSPORT */}
   <label>Goods Transport</label>
  <input
    type="text"
    name="goodsTransport"
    placeholder="Enter Mode of Goods Transport"
    value={formData.goodsTransport}
    onChange={handleInputChange}
  />
 <label>Car Transport</label>
  <input
    type="text"
    name="carTransport"
    placeholder="Enter Car Transport Type"
    value={formData.carTransport}
    onChange={handleInputChange}
  />

  <label>Car Moving Date</label>
  <input
    type="date"
    name="carMovingDate"
    value={formData.carMovingDate}
    onChange={handleInputChange}
  />

  <label>Car Moving Time</label>
  <input
    type="time"
    name="carMovingTime"
    value={formData.carMovingTime}
    onChange={handleInputChange}
  />

  <label>Car Receiving Date</label>
  <input
    type="date"
    name="carReceivingDate"
    value={formData.carReceivingDate}
    onChange={handleInputChange}
  />

  <label>Car Receiving Time</label>
  <input
    type="time"
    name="carReceivingTime"
    value={formData.carReceivingTime}
    onChange={handleInputChange}
  />

  {/* OTHERS */}
  <label>When We Get Goods?</label>
  <input
    type="text"
    name="whenWeGetGoods"
    placeholder="Enter Expected Receiving Time"
    value={formData.whenWeGetGoods}
    onChange={handleInputChange}
  />

  <label>Anything Else Rather Than Goods?</label>
  <input
    type="text"
    name="anyThingElseRatherThanGood"
    placeholder="Enter Additional Items"
    value={formData.anyThingElseRatherThanGood}
    onChange={handleInputChange}
  />

  <label>Warehouse Facility Needed?</label>
  <input
    type="text"
    name="anyWarehouseFacilityRatherThanThisThings"
    placeholder="Enter Warehouse Requirements"
    value={formData.anyWarehouseFacilityRatherThanThisThings}
    onChange={handleInputChange}
  />

  {/* RISK COVERAGE */}
  <label>Risk Coverage</label>
  <select
    name="riskCoverageGood"
    value={formData.riskCoverageGood}
    onChange={handleInputChange}
  >
    <option value="">SELECT RISK COVERAGE</option>
    <option value="OWNER_RISK">OWNER RISK</option>
    <option value="TRANSIT_INSURANCE">TRANSIT INSURANCE</option>
  </select>

  {/* OTHER SERVICES */}
  <label>Other Services</label>
  <select
    name="otherServices"
    value={formData.otherServices}
    onChange={handleInputChange}
  >
    <option value="">SELECT OTHER SERVICE</option>
    <option value="ASSEMBLING">ASSEMBLING</option>
    <option value="DISASSEMBLING">DISASSEMBLING</option>
    <option value="INSTALLATION">INSTALLATION</option>
    <option value="UNINSTALLATION">UNINSTALLATION</option>
    <option value="PACKING">PACKING</option>
    <option value="UNPACKING">UNPACKING</option>
    <option value="LOADING">LOADING</option>
    <option value="UNLOADING">UNLOADING</option>
    <option value="CLEANING_SERVICE">CLEANING SERVICE</option>
    <option value="OTHER">OTHER</option>
  </select>

  <button
    type="button"
    className={styles.nextButton}
    onClick={() => setActiveTab(5)}
  >
    Next
  </button>
</TabPanel>







            {/* Follow Up */}
            <TabPanel className={styles.note_tabpanel}>
              <h2 className={styles.note_tabHeading}>Follow Up</h2>
              <input type="text" name="remark" value={formData.remark} onChange={handleInputChange} placeholder="Remark" />
              <input type="date" name="remarkDate" value={formData.remarkDate} onChange={handleInputChange} />
              <input type="time" name="remarkTime" value={formData.remarkTime} onChange={handleInputChange} />

              <div className={styles.rating}>
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    onClick={() => setFormData((prev) => ({ ...prev, rating: String(index + 1) }))}
                    className={index < parseInt(formData.rating || 0) ? styles.starActive : ""}
                  >
                    {index < parseInt(formData.rating || 0) ? <IoMdStar /> : <IoMdStarOutline />}
                  </span>
                ))}
              </div>

              <select
                name="followUpStatus"
                value={formData.followUpStatus || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, followUpStatus: e.target.value }))}
              >
                <option value="">Select Status</option>
                <option value="ONGOING">ONGOING</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>

              <label>Next Follow Up Date</label>
              <input
                type="date"
                name="followUpRequest.followUpDate"
                value={formData.followUpRequest.followUpDate}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, followUpRequest: { ...prev.followUpRequest, followUpDate: e.target.value } }))
                }
              />

              <input
                type="text"
                name="followUpRequest.followUpRemark"
                placeholder="Follow Up Remark"
                value={formData.followUpRequest.followUpRemark}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, followUpRequest: { ...prev.followUpRequest, followUpRemark: e.target.value } }))
                }
              />

              <button type="submit" className={styles.submitButton}>Submit</button>
            </TabPanel>
          </form>
        </Tabs>
      </div>
    </div>
  );
}

export default AddLead;





















// import React, { useState } from "react";
// import { IoMdArrowRoundBack, IoMdStarOutline, IoMdStar } from "react-icons/io";
// import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
// import axiosInstance from "../utils/axiosInstance";
// import styles from "../styles/AddLead.module.css";
// import { BASE_URL } from "../config";
// import { useNavigate } from "react-router-dom";

// function AddLead() {
//   const [activeTab, setActiveTab] = useState(0);
//   const token = JSON.parse(localStorage.getItem("mexcargoUserData"))?.token;
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     date: new Date().toISOString().split("T")[0],
//     time: "",
//     modeOfCommunication: "",
//     wayOfLead: "",
//     companyName: "",
//     companySector: "",
//     companySetUp: "",
//     companyHeadOffice: "",
//     easyHubCentre: "",
//     state: "",
//     employeeName: "",
//     department: "",
//     designation: "",
//     contactNo: "",
//     landLineNo: "",
//     mailId: "",
//     endUserName: "",
//     endUserDepartment: "",
//     endUserDesignation: "",
//     endUserContactNo: "",
//     endUserLandLineNo: "",
//     endUserMailId: "",
//     source: "",
//     destination: "",
//     movingDateAndTime: new Date().toISOString().slice(0, 16),
//     receivingDateTime: "",
//     commodity: "",
//     size: "",
//     weight: "",
//     typeOfTransportation: "",
//     sizeOfTransportation: "",
//     commodityValue: "",
//     vehicleValue: "",
//     carMovingDate: "",
//     carMovingTime: "",
//     goodsTransport: "",
//     carTransport: "",
//     whenWeGetGoods: "",
//     anyThingElseRatherThanGood: "",
//     anyWarehouseFacilityRatherThanThisThings: "",
//     insuranceFacilityOfGoods: "",
//     commodityAndOtherGoodsInsuranceFacility: "",
//     otherServices: "",
//     riskCoverageGood: "",
//     additionalNeedRequests: [
//       { needName: "", needValue: "", articleDimension: "" },
//     ],
//     remark: "",
//     remarkDate: "",
//     remarkTime: "",
//     rating: 0,
//     followUpStatus: "",
//     followUpRequest: {
//       followUpDate: "",
//       followUpRemark: "",
//     },
//   });

//   // Handle input updates
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Additional Field Controls
//   const handleAddField = () => {
//     setFormData((prev) => ({
//       ...prev,
//       additionalNeedRequests: [
//         ...prev.additionalNeedRequests,
//         { needName: "", needValue: "", articleDimension: "" },
//       ],
//     }));
//   };

//   const handleFieldChange = (index, field, value) => {
//     const updatedFields = [...formData.additionalNeedRequests];
//     updatedFields[index] = { ...updatedFields[index], [field]: value };
//     setFormData((prev) => ({
//       ...prev,
//       additionalNeedRequests: updatedFields,
//     }));
//   };

//   // Moving Date & Time Utilities
//   const setMovingDate = (dateValue) => {
//     const timePart =
//       formData.movingDateAndTime?.split("T")[1] || "00:00";
//     setFormData((prev) => ({
//       ...prev,
//       movingDateAndTime: `${dateValue}T${timePart}`,
//     }));
//   };

//   const setMovingTime = (timeValue) => {
//     const datePart =
//       formData.movingDateAndTime?.split("T")[0] ||
//       new Date().toISOString().split("T")[0];
//     setFormData((prev) => ({
//       ...prev,
//       movingDateAndTime: `${datePart}T${timeValue}`,
//     }));
//   };

//   const getDatePart = (isoLike) =>
//     isoLike?.split?.("T")?.[0] || "";
//   const getTimePart = (isoLike) =>
//     isoLike?.split?.("T")?.[1] || "";

//   // Submit Handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const mappedAdditional =
//       formData.additionalNeedRequests.map((f) => ({
//         articleName: f.needName || null,
//         articleValue: f.needValue || null,
//         articleDimension: f.articleDimension || null,
//       }));

//     const payload = {
//       ...formData,
//       time: formData.time || null,
//       movingDateAndTime: formData.movingDateAndTime || null,
//       receivingDateTime: formData.receivingDateTime || null,
//       rating: formData.rating ? Number(formData.rating) : null,
//       additionalNeedRequests: mappedAdditional,
//       followUpRequest: {
//         followUpDate:
//           formData.followUpRequest?.followUpDate || null,
//         followUpRemark:
//           formData.followUpRequest?.followUpRemark || null,
//       },
//     };

//     try {
//       const response = await axiosInstance.post(
//         `${BASE_URL}/created/lead`,
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 200 || response.status === 201) {
//         alert("Lead submitted successfully!");
//         navigate("/sales_lead_management");
//       }
//     } catch (error) {
//       console.error("Error submitting lead:", error);
//       alert("Failed to submit lead.");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <p className={styles.backButton}>
//         <IoMdArrowRoundBack
//           onClick={() => window.history.back()}
//         />
//       </p>

//       <h2 className={styles.leadHeading}>Add Data</h2>

//       <div className={styles.tabWrapper}>
//         <Tabs
//           selectedIndex={activeTab}
//           onSelect={(index) => setActiveTab(index)}
//         >
//           <TabList className={styles.tabList}>
//             <Tab>Lead Reference</Tab>
//             <Tab>Company Details</Tab>
//             <Tab>Employee Details</Tab>
//             <Tab>End User Details</Tab>
//             <Tab>Need</Tab>
//             <Tab>Follow Up</Tab>
//           </TabList>

//           {/* FORM START */}
//           <form
//             className={styles.Add_lead_main_form}
//             onSubmit={handleSubmit}
//           >
//             {/* TAB 1 — Lead Reference */}
//             <TabPanel className={styles.lead_ref_tabpanel}>
//               <label>Date</label>
//               <input
//                 type="date"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleInputChange}
//               />

//               <label>Time</label>
//               <input
//                 type="time"
//                 name="time"
//                 value={formData.time}
//                 onChange={handleInputChange}
//               />

//               <label>Mode Of Communication</label>
//               <input
//                 type="text"
//                 name="modeOfCommunication"
//                 value={formData.modeOfCommunication}
//                 onChange={handleInputChange}
//               />

//               <label>Lead Source</label>
//               <select
//                 name="wayOfLead"
//                 value={formData.wayOfLead}
//                 onChange={handleInputChange}
//               >
//                 <option value="">Select Way Of Lead</option>
//                 <option value="PHONE">PHONE</option>
//                 <option value="EMAIL">EMAIL</option>
//                 <option value="WHATSAPP">WHATSAPP</option>
//                 <option value="PHYSICAL_MEETING">
//                   PHYSICAL MEETING
//                 </option>
//                 <option value="NET_SEARCHING">
//                   NET_SEARCHING
//                 </option>
//               </select>

//               <button
//                 type="button"
//                 onClick={() => setActiveTab(1)}
//                 className={styles.nextButton}
//               >
//                 Next
//               </button>
//             </TabPanel>

//             {/* TAB 2 — Company Details */}
//             <TabPanel className={styles.company_detail_tabpannel}>
//               <h2 className={styles.tabHeading}>
//                 Company Details
//               </h2>

//               <input
//                 type="text"
//                 name="companyName"
//                 placeholder="Company Name"
//                 value={formData.companyName}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="text"
//                 name="companySector"
//                 placeholder="Company Sector"
//                 value={formData.companySector}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="text"
//                 name="companySetUp"
//                 placeholder="Company Set Up"
//                 value={formData.companySetUp}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="text"
//                 name="companyHeadOffice"
//                 placeholder="Company Head Office"
//                 value={formData.companyHeadOffice}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="text"
//                 name="easyHubCentre"
//                 placeholder="Easy Hub Center"
//                 value={formData.easyHubCentre}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="minorhub"
//                 placeholder="Minor Hub"
//                 value={formData.minorhub}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="text"
//                 name="majorHub"
//                 placeholder="Major Hub"
//                 value={formData.majorHub}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="state"
//                 placeholder="State"
//                 value={formData.state}
//                 onChange={handleInputChange}
//               />

//               <button
//                 type="button"
//                 onClick={() => setActiveTab(2)}
//                 className={styles.nextButton}
//               >
//                 Next
//               </button>
//             </TabPanel>

//             {/* TAB 3 — Employee Details */}
//             <TabPanel className={styles.employe_detail_tabpannel}>
//               <h2 className={styles.employe_detail_tabHeading}>
//                 Company Employee Details
//               </h2>

//               <input
//                 type="text"
//                 name="employeeName"
//                 placeholder="Employee Name"
//                 value={formData.employeeName}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="department"
//                 placeholder="Department"
//                 value={formData.department}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="designation"
//                 placeholder="Designation"
//                 value={formData.designation}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="contactNo"
//                 placeholder="Contact No."
//                 value={formData.contactNo}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="landLineNo"
//                 placeholder="Landline"
//                 value={formData.landLineNo}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="mailId"
//                 placeholder="Mail ID"
//                 value={formData.mailId}
//                 onChange={handleInputChange}
//               />

//               <button
//                 type="button"
//                 onClick={() => setActiveTab(3)}
//                 className={styles.nextButton}
//               >
//                 Next
//               </button>
//             </TabPanel>

//             {/* TAB 4 — End User */}
//             <TabPanel className={styles.end_user_tabpannel}>
//               <h2 className={styles.end_user_tabHeading}>
//                 End User Details
//               </h2>

//               <input
//                 type="text"
//                 name="endUserName"
//                 placeholder="End User Name"
//                 value={formData.endUserName}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="endUserDepartment"
//                 placeholder="User Department"
//                 value={formData.endUserDepartment}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="endUserDesignation"
//                 placeholder="User Designation"
//                 value={formData.endUserDesignation}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="endUserContactNo"
//                 placeholder="User Contact No."
//                 value={formData.endUserContactNo}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="endUserLandLineNo"
//                 placeholder="User Landline"
//                 value={formData.endUserLandLineNo}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="email"
//                 name="endUserMailId"
//                 placeholder="User Email"
//                 value={formData.endUserMailId}
//                 onChange={handleInputChange}
//               />

//               <button
//                 type="button"
//                 onClick={() => setActiveTab(4)}
//                 className={styles.nextButton}
//               >
//                 Next
//               </button>
//             </TabPanel>

//             {/* TAB 5 — Need */}
//             <TabPanel className={styles.need_tabpannel}>
//               <h2 className={styles.need_tabHeading}>Need</h2>

//               <div className={styles.source}>
//                 <input
//                   type="search"
//                   name="source"
//                   placeholder="Origin"
//                   value={formData.source}
//                   onChange={handleInputChange}
//                 />
//                 To
//                 <input
//                   type="search"
//                   name="destination"
//                   placeholder="Destination"
//                   value={formData.destination}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <label>Moving Date</label>
//               <input
//                 type="date"
//                 name="movingDate"
//                 value={
//                   getDatePart(formData.movingDateAndTime) ||
//                   new Date().toISOString().split("T")[0]
//                 }
//                 onChange={(e) => setMovingDate(e.target.value)}
//               />

//               <label>Moving Time</label>
//               <input
//                 type="time"
//                 name="movingTime"
//                 value={
//                   getTimePart(formData.movingDateAndTime) ||
//                   "00:00"
//                 }
//                 onChange={(e) => setMovingTime(e.target.value)}
//               />

//               <label>Expected Receiving Date</label>
//               <input
//                 type="date"
//                 name="receivingDate"
//                 value={getDatePart(formData.receivingDateTime)}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     receivingDateTime: `${e.target.value}T${
//                       getTimePart(prev.receivingDateTime) ||
//                       "00:00"
//                     }`,
//                   }))
//                 }
//               />

//               <label>Expected Receiving Time</label>
//               <input
//                 type="time"
//                 name="receivingTime"
//                 value={
//                   getTimePart(formData.receivingDateTime) || ""
//                 }
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     receivingDateTime: `${
//                       getDatePart(prev.receivingDateTime) || ""
//                     }T${e.target.value}`,
//                   }))
//                 }
//               />

//               <input
//                 type="text"
//                 name="commodity"
//                 placeholder="Commodity"
//                 value={formData.commodity}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="size"
//                 placeholder="Dimension"
//                 value={formData.size}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="weight"
//                 placeholder="Weight"
//                 value={formData.weight}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="typeOfTransportation"
//                 placeholder="Type of Transportation"
//                 value={formData.typeOfTransportation}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="sizeOfTransportation"
//                 placeholder="Size of vehicle"
//                 value={formData.sizeOfTransportation}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="commodityValue"
//                 placeholder="Value of Commodity"
//                 value={formData.commodityValue}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="vehicleValue"
//                 placeholder="Car Vehicle Name"
//                 value={formData.vehicleValue}
//                 onChange={handleInputChange}
//               />

//               <label>Car Moving Date:</label>
//               <input
//                 type="date"
//                 name="carMovingDate"
//                 value={formData.carMovingDate}
//                 onChange={handleInputChange}
//               />

//               <label>Car Moving Time:</label>
//               <input
//                 type="time"
//                 name="carMovingTime"
//                 value={formData.carMovingTime}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="goodsTransport"
//                 placeholder="Mode of transport"
//                 value={formData.goodsTransport}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="carTransport"
//                 placeholder="Car"
//                 value={formData.carTransport}
//                 onChange={handleInputChange}
//               />

//               <select
//                 name="otherServices"
//                 value={formData.otherServices}
//                 onChange={handleInputChange}
//               >
//                 <option value="">Other Services</option>
//                 <option value="AIR_CONDITION">Air Condition</option>
//                 <option value="TV_INSTALLATION">
//                   TV Installation
//                 </option>
//                 <option value="DISH_ANTENNA">Dish Antenna</option>
//                 <option value="WATER_GEYSER">Water Geyser</option>
//                 <option value="HYDRAULIC_BAG">Hydraulic Bag</option>
//                 <option value="FURNITURE_MADE_OF_ENGINEERED_WOOD">
//                   Furniture Made of Engineered Wood
//                 </option>
//               </select>

//               <select
//                 name="riskCoverageGood"
//                 value={formData.riskCoverageGood}
//                 onChange={handleInputChange}
//               >
//                 <option value="">
//                   Risk Coverage Of Goods
//                 </option>
//                 <option value="OWNER_RISK">Owner risk</option>
//                 <option value="CAREER_RISK">Career risk</option>
//               </select>

//               <h3>Extra Fields</h3>

//               {formData.additionalNeedRequests.map(
//                 (field, index) => (
//                   <div
//                     key={index}
//                     className={styles.additionalField}
//                   >
//                     <input
//                       type="text"
//                       placeholder="Article Name"
//                       value={field.needName}
//                       onChange={(e) =>
//                         handleFieldChange(
//                           index,
//                           "needName",
//                           e.target.value
//                         )
//                       }
//                     />

//                     <input
//                       type="text"
//                       placeholder="Article Value"
//                       value={field.needValue}
//                       onChange={(e) =>
//                         handleFieldChange(
//                           index,
//                           "needValue",
//                           e.target.value
//                         )
//                       }
//                     />

//                     <input
//                       type="text"
//                       placeholder="Article Dimension"
//                       value={field.articleDimension}
//                       onChange={(e) =>
//                         handleFieldChange(
//                           index,
//                           "articleDimension",
//                           e.target.value
//                         )
//                       }
//                     />
//                   </div>
//                 )
//               )}

//               <button type="button" onClick={handleAddField}>
//                 Add Field
//               </button>

//               <button
//                 type="button"
//                 className={styles.nextButton}
//                 onClick={() => setActiveTab(5)}
//               >
//                 Next
//               </button>
//             </TabPanel>

//             {/* TAB 6 — Follow Up */}
//             <TabPanel className={styles.note_tabpanel}>
//               <h2 className={styles.note_tabHeading}>
//                 Follow Up
//               </h2>

//               <input
//                 type="text"
//                 name="remark"
//                 placeholder="Remark"
//                 value={formData.remark}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="date"
//                 name="remarkDate"
//                 value={formData.remarkDate}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="time"
//                 name="remarkTime"
//                 value={formData.remarkTime}
//                 onChange={handleInputChange}
//               />

//               <div className={styles.rating}>
//                 {[...Array(5)].map((_, index) => (
//                   <span
//                     key={index}
//                     onClick={() =>
//                       setFormData((prev) => ({
//                         ...prev,
//                         rating: String(index + 1),
//                       }))
//                     }
//                     className={
//                       index <
//                       parseInt(formData.rating || 0)
//                         ? styles.starActive
//                         : ""
//                     }
//                   >
//                     {index <
//                     parseInt(formData.rating || 0) ? (
//                       <IoMdStar />
//                     ) : (
//                       <IoMdStarOutline />
//                     )}
//                   </span>
//                 ))}
//               </div>

//               <select
//                 name="followUpStatus"
//                 value={formData.followUpStatus || ""}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     followUpStatus: e.target.value,
//                   }))
//                 }
//               >
//                 <option value="">Select Status</option>
//                 <option value="ONGOING">ONGOING</option>
//                 <option value="COMPLETED">COMPLETED</option>
//               </select>

//               <label>Next Follow Up Date</label>
//               <input
//                 type="date"
//                 value={formData.followUpRequest.followUpDate}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     followUpRequest: {
//                       ...prev.followUpRequest,
//                       followUpDate: e.target.value,
//                     },
//                   }))
//                 }
//               />

//               <input
//                 type="text"
//                 placeholder="Follow Up Remark"
//                 value={
//                   formData.followUpRequest.followUpRemark
//                 }
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     followUpRequest: {
//                       ...prev.followUpRequest,
//                       followUpRemark: e.target.value,
//                     },
//                   }))
//                 }
//               />

//               <button
//                 type="submit"
//                 className={styles.submitButton}
//               >
//                 Submit
//               </button>
//             </TabPanel>
//           </form>
//         </Tabs>
//       </div>
//     </div>
//   );
// }

// export default AddLead;
