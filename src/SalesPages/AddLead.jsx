import React, { useState } from "react";
import { IoMdArrowRoundBack, IoMdStarOutline, IoMdStar } from "react-icons/io";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import styles from "../styles/AddLead.module.css"; // External CSS
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

function AddLead() {
  const [rating, setRating] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const token = JSON.parse(localStorage.getItem("mexcargoUserData"))?.token;
  console.log(token);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // leadReferenceNo: "",
    date: new Date().toISOString().split("T")[0],
    time: "",
    modeOfCommunication: "",
    wayOfLead: "",
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
    carMovingTime: "",
    goodsTransport: "",
    carTransport: "",
    whenWeGetGoods: "",
    anyThingElseRatherThanGood: "",
    anyWarehouseFacilityRatherThanThisThings: "",
    insuranceFacilityOfGoods: "",
    commodityAndOtherGoodsInsuranceFacility: "",
    otherServices: "",
    riskCoverageGood: "",
    additionalNeedRequests: [{ needName: "", needValue: "" }],
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
    setFormData({ ...formData, [name]: value });
  };

  const handleAddField = () => {
    setFormData({
      ...formData,
      additionalNeedRequests: [
        ...formData.additionalNeedRequests,
        { needName: "", needValue: "" },
      ],
    });
  };

  const handleFieldChange = (index, field, value) => {
    const updatedFields = [...formData.additionalNeedRequests];
    updatedFields[index][field] = value;
    setFormData({ ...formData, additionalNeedRequests: updatedFields });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/created/lead`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Lead submitted successfully!");
        setFormData({
          // leadReferenceNo: "",
          date: "",
          time: "",
          modeOfCommunication: "",
          wayOfLead: "",
          companyName: "",
          companyHeadOffice: "",
          easyHubCentre: "",
          state: "",
          employeeName: "",
          department: "",
          designation: "",
          contactNo: "",
          landLineNo: "",
          mailId: "",
          source: "",
          destination: "",
          movingDateAndTime: "",
          receivingDateTime: "",
          commodity: "",
          size: "",
          weight: "",
          typeOfTransportation: "",
          sizeOfTransportation: "",
          commodityValue: "",
          vehicleValue: "",
          goodsTransport: "",
          carTransport: "",
          // whenWeGetGoods: "",
          anyThingElseRatherThanGood: "",
          anyWarehouseFacilityRatherThanThisThings: "",
          insuranceFacilityOfGoods: "",
          // commodityAndOtherGoodsInsuranceFacility: "",
          otherServices: "",
          additionalNeedRequests: [{ needName: "", needValue: "" }],
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

      <h2 className={styles.leadHeading}>Add Lead</h2>

      <div className={styles.tabWrapper}>
        <Tabs
          selectedIndex={activeTab}
          onSelect={(index) => setActiveTab(index)}
        >
          <TabList className={styles.tabList}>
            <Tab>Lead Reference</Tab>
            <Tab>Company Details</Tab>
            <Tab>Employee Details</Tab>
            <Tab> End User Details</Tab>
            <Tab>Need</Tab>
            <Tab>Note</Tab>
          </TabList>

          <form className={styles.Add_lead_main_form} onSubmit={handleSubmit}>
            {/* Lead Reference */}
            <TabPanel className={styles.lead_ref_tabpanel}>
              {/* <h2 className={styles.lead_ref_heading}>Lead Reference</h2> */}
              {/* <label>Lead Reference No.</label>
              <input
                type="text"
                name="leadReferenceNo"
                value={formData.leadReferenceNo}
                onChange={handleInputChange}
                className={styles.lead_ref_input}
              /> */}

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

              <label>Mode Of Communication</label>
              <input
                type="text"
                name="modeOfCommunication"
                value={formData.modeOfCommunication}
                onChange={handleInputChange}
                className={styles.lead_ref_input}
              />

              <label>Way Of Lead</label>
              <select
                name="wayOfLead"
                value={formData.wayOfLead}
                onChange={handleInputChange}
                className={styles.lead_ref_select}
              >
                <option value="">Select Way Of Lead</option>
                <option value="PHONE">PHONE</option>
                <option value="EMAIL">EMAIL</option>
                <option value="WHATSAPP">WHATSAPP</option>
                <option value="PHYSICAL_MEETING">PHYSICAL MEETING</option>
                <option value="NET_SEARCHING">NET SEARCHING</option>
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
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Company Name"
              />
              <input
                type="text"
                name="companySector"
                value={formData.companySector}
                onChange={handleInputChange}
                placeholder="Company Sector"
              />
              <input
                type="text"
                name="companySetUp"
                value={formData.companySetUp}
                onChange={handleInputChange}
                placeholder="Company Set Up"
              />
              <input
                type="text"
                name="companyHeadOffice"
                value={formData.companyHeadOffice}
                onChange={handleInputChange}
                placeholder="Company Head Office"
              />
              <input
                type="text"
                name="easyHubCentre" // Changed from EasyHub to match body
                placeholder="Easy Hub Center"
                value={formData.easyHubCentre}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State"
              />

              <button
                type="button"
                className={styles.nextButton}
                onClick={() => setActiveTab(2)}
              >
                Next
              </button>
            </TabPanel>

            {/* Employee Details */}
            <TabPanel className={styles.employe_detail_tabpannel}>
              <h2 className={styles.employe_detail_tabHeading}>
                Company Employee Details
              </h2>
              <input
                type="text"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleInputChange}
                placeholder="Employee Name"
              />
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="Department"
              />
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                placeholder="Designation"
              />

              <input
                type="text"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleInputChange}
                placeholder="Contact No."
              />
              <input
                type="text"
                name="landLineNo"
                value={formData.landLineNo}
                onChange={handleInputChange}
                placeholder="Landline"
              />
              <input
                type="text"
                name="mailId"
                placeholder="Mail ID"
                value={formData.mailId}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className={styles.nextButton}
                onClick={() => setActiveTab(3)}
              >
                Next
              </button>
            </TabPanel>
            <TabPanel className={styles.end_user_tabpannel}>
              <h2 className={styles.end_user_tabHeading}>End User Details</h2>

              <input
                type="text"
                name="endUserName"
                value={formData.endUserName}
                placeholder=" End User Name"
                className={styles.end_user_input_field}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="endUserDepartment"
                value={formData.endUserDepartment}
                placeholder="User Department"
                className={styles.end_user_input_field}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="endUserDesignation"
                value={formData.endUserDesignation}
                placeholder="User Designation"
                className={styles.end_user_input_field}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="endUserContactNo"
                value={formData.endUserContactNo}
                placeholder="User Contact No."
                className={styles.end_user_input_field}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="endUserLandLineNo"
                value={formData.endUserLandLineNo}
                placeholder="User Landline"
                className={styles.end_user_input_field}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="endUserMailId"
                value={formData.endUserMailId}
                placeholder="User Email"
                className={styles.end_user_input_field}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className={styles.nextButton}
                onClick={() => setActiveTab(4)}
              >
                Next
              </button>
            </TabPanel>
            {/* Need */}
            <TabPanel className={styles.need_tabpannel}>
              <h2 className={styles.need_tabHeading}>Need</h2>
              <div className={styles.source}>
                <input
                  type="search"
                  name="source"
                  placeholder="Origin"
                  value={formData.source}
                  onChange={handleInputChange}
                  required
                />
                To
                <input
                  type="search"
                  name="destination"
                  placeholder="Destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <label htmlFor="movingDateAndTime">Moving Date</label>
              <input
                type="date"
                name="movingDate"
                value={
                  formData.movingDateAndTime?.split("T")[0] ||
                  new Date().toISOString().split("T")[0]
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    movingDateAndTime: `${e.target.value}T${
                      formData.movingDateAndTime?.split("T")[1] || "00:00"
                    }`,
                  })
                }
              />

              <label htmlFor="movingTime">Moving Time</label>
              <input
                type="time"
                name="movingTime"
                value={formData.movingDateAndTime?.split("T")[1] || "00:00"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    movingDateAndTime: `${
                      formData.movingDateAndTime?.split("T")[0] ||
                      new Date().toISOString().split("T")[0]
                    }T${e.target.value}`,
                  })
                }
              />

              <label htmlFor="receivingDateTime">Expected Receiving Date</label>
              <input
                type="date"
                name="receivingDateTime"
                value={formData.receivingDateTime.split("T")[0]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    receivingDateTime: `${e.target.value}T${
                      formData.receivingDateTime.split("T")[1] || "00:00"
                    }`,
                  })
                }
              />

              <label htmlFor="receivingTime">Expected Receiving Time</label>
              <input
                type="time"
                name="receivingDateTime"
                value={formData.receivingDateTime.split("T")[1] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    receivingDateTime: `${
                      formData.receivingDateTime.split("T")[0]
                    }T${e.target.value}`,
                  })
                }
              />

              <input
                type="text"
                name="commodity"
                placeholder="Commodity"
                value={formData.commodity}
                onChange={handleInputChange}
              />

              <input
                type="text"
                name="size"
                placeholder="Dimension"
                value={formData.size}
                onChange={handleInputChange}
              />

              <input
                type="text"
                name="weight"
                placeholder="Weight"
                value={formData.weight}
                onChange={handleInputChange}
              />

              <input
                type="text"
                name="typeOfTransportation"
                placeholder="Type of Transportation"
                value={formData.typeOfTransportation}
                onChange={handleInputChange}
              />

              <input
                type="text"
                name="sizeOfTransportation"
                placeholder="Size of vehicle"
                value={formData.sizeOfTransportation}
                onChange={handleInputChange}
              />

              <input
                type="text"
                name="commodityValue"
                placeholder=" Value of Commodity "
                value={formData.commodityValue}
                onChange={handleInputChange}
              />

              <input
                type="text"
                name="vehicleValue"
                placeholder="Car Vehicle Name "
                value={formData.vehicleValue}
                onChange={handleInputChange}
              />

              <label htmlFor=""> Car Moving Date:</label>
              <input
                type="date"
                name="carMovingDate"
                placeholder="Car Vehicle Name "
                value={formData.carMovingDate}
                onChange={handleInputChange}
              />
              <label htmlFor=""> Car Moving Time:</label>
              <input
                type="time"
                name="carMovingTime"
                placeholder="Car Vehicle Name "
                value={formData.carMovingTime}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="goodsTransport"
                placeholder="Goods Transport Mode"
                value={formData.goodsTransport}
                onChange={handleInputChange}
              />

              <input
                type="text"
                name="carTransport"
                placeholder="Car Transport"
                value={formData.carTransport}
                onChange={handleInputChange}
              />

              <select
                name="otherServices"
                onChange={handleInputChange}
                value={formData.otherServices}
              >
                <option value="">Other Services</option>
                <option value="AIR_CONDITION">Air Condition</option>
                <option value="TV_INSTALLATION">TV Installation</option>
                <option value="DISH_ANTENNA">Dish Antenna</option>
                <option value="WATER_GEYSER">Water Geyser</option>
                <option value="HYDRAULIC_BAG">Hydraulic Bag</option>
                <option value="FURNITURE_MADE_OF_ENGINEERED_WOOD">
                  Furniture Made of Engineered Wood
                </option>
              </select>
              {/* 
              <input
                type="text"
                name="anyWarehouseFacilityRatherThanThisThings"
                placeholder="Any Warehouse Facility Rather than These Things"
                value={formData.anyWarehouseFacilityRatherThanThisThings}
                onChange={handleInputChange}
              /> */}

              <input
                type="text"
                name="insuranceFacilityOfGoods"
                placeholder="Insurance Facility Of Goods"
                value={formData.insuranceFacilityOfGoods}
                onChange={handleInputChange}
              />

              <select
                name="riskCoverageGood"
                value={formData.riskCoverageGood}
                onChange={handleInputChange}
              >
                <option value=""> Risk Coverage Of Goods</option>
                <option value="OWNER_RISK">Owner risk</option>
                <option value="CAREER_RISK">Career risk</option>
              </select>

              <h3> Extra Fields</h3>
              {formData.additionalNeedRequests.map((field, index) => (
                <div key={index} className={styles.additionalField}>
                  <input
                    type="text"
                    placeholder="Article Name"
                    value={field.needName}
                    onChange={(e) =>
                      handleFieldChange(index, "needName", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Article Value"
                    value={field.needValue}
                    onChange={(e) =>
                      handleFieldChange(index, "needValue", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Article Dimension"
                    value={field.articleDimension}
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        "articleDimension",
                        e.target.value
                      )
                    }
                  />
                </div>
              ))}
              <button type="button" onClick={handleAddField}>
                Add Field
              </button>
              <button
                type="button"
                className={styles.nextButton}
                onClick={() => setActiveTab(5)}
              >
                Next
              </button>
            </TabPanel>

            {/* Note */}
            <TabPanel className={styles.note_tabpanel}>
              <h2 className={styles.note_tabHeading}>Note</h2>
              <input
                type="text"
                name="remark"
                value={formData.remark}
                onChange={handleInputChange}
                placeholder="Remark"
              />
              <input
                type="date"
                name="remarkDate"
                value={formData.remarkDate}
                onChange={handleInputChange}
              />
              <input
                type="time"
                name="remarkTime"
                value={formData.remarkTime}
                onChange={handleInputChange}
              />
              <div className={styles.rating}>
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    onClick={() =>
                      setFormData({ ...formData, rating: String(index + 1) })
                    }
                    className={
                      index < parseInt(formData.rating) ? styles.starActive : ""
                    }
                  >
                    {index < parseInt(formData.rating) ? (
                      <IoMdStar />
                    ) : (
                      <IoMdStarOutline />
                    )}
                  </span>
                ))}
              </div>

              <select
                name="followUpStatus"
                value={formData.followUpStatus || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    followUpStatus: e.target.value,
                  })
                }
              >
                <option value="">Select Status</option>
                <option value="ONGOING">ONGOING</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
              <label htmlFor="followUpDate">Next Follow Up Date</label>
              <input
                type="date"
                name="followUpRequest.followUpDate"
                value={formData.followUpRequest.followUpDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    followUpRequest: {
                      ...formData.followUpRequest,
                      followUpDate: e.target.value,
                    },
                  })
                }
              />

              <input
                type="text"
                name="followUpRequest.followUpRemark"
                placeholder="Follow Up Remark"
                value={formData.followUpRequest.followUpRemark}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    followUpRequest: {
                      ...formData.followUpRequest,
                      followUpRemark: e.target.value,
                    },
                  })
                }
              />

              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
            </TabPanel>
          </form>
        </Tabs>
      </div>
    </div>
  );
}

export default AddLead;
