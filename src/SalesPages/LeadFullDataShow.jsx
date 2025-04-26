import React, { useEffect, useState } from "react";
import "../styles/leadfulldatashow.css";
import axios from "axios";
import { BASE_URL } from "../config";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
function LeadFullDataShow() {
  const { id } = useParams();
  const [leadData, setLeadData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const token = JSON.parse(localStorage.getItem("mexcargoUserData"))?.token;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const [hour, minute] = timeString.split(":");
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get(
          `${BASE_URL}/lead/${id}/full-details`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setLeadData(response.data);
        setFormData(response.data); // Initialize form data
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosInstance.put(
        `${BASE_URL}/update/lead/${id}/full-details`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLeadData(formData); // Update displayed data
      setShowModal(true); // Close modal
      alert("Lead updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update lead.");
    } finally {
      setLoading(false);
    }

    console.log(formData);
  };

  const handleAddExtraField = async () => {
    const extraFieldBody = {
      originFloorNo: "012A",
      destinationFloorNo: "12B",
      originDetailsAddress: "Plot no, 74 near panachpawali road, nagpur",
      destinationDetailsAddress: "Plot no,34 mahal nagpur",
      isLiftAvailableInOrigin: true,
      isLiftAvailableInDestination: false,
      specialService: "Crane",
      secondaryVehicle: "Na",
      remark: "Communication of the client is good",
    };

    try {
      await axiosInstance.post(
        `${BASE_URL}/add/lead/${id}/extra-need-data`,
        extraFieldBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Extra field created successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to create extra field.");
    }
  };

  const handleInputChange = (section, field, value, index = null) => {
    setFormData((prev) => {
      if (index !== null) {
        // Handle array fields like additionalNeed
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: prev[section][field].map((item, i) =>
              i === index ? { ...item, ...value } : item
            ),
          },
        };
      }
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      };
    });
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  if (loading) return <p className="leadFullDataShow-loading">Loading...</p>;
  if (!leadData || !formData)
    return <p className="leadFullDataShow-error">No data found.</p>;

  const { lead, company, companyEmployee, need } = leadData;

  return (
    <div className="leadFullDataShow-container">
      <h2 className="leadFullDataShow-title">Lead Full Details</h2>

      {/* Company Info */}
      <section className="leadFullDataShow-card">
        <h3 className="leadFullDataShow-sectionTitle">Company Info</h3>
        <div className="leadFullDataShow-grid">
          <InfoItem label="Name" value={company.companyName} />
          <InfoItem label="Sector" value={company.companySector} />
          <InfoItem label="Set Up" value={company.companySetUp} />
          <InfoItem label="Head Office" value={company.headOfOffice} />
          <InfoItem label="EasyHub Centre" value={company.easyHubCentre} />
          <InfoItem label="State" value={company.state} />
        </div>
      </section>

      {/* Employee Info */}
      <section className="leadFullDataShow-card">
        <h3 className="leadFullDataShow-sectionTitle">Employee Info</h3>
        <div className="leadFullDataShow-grid">
          <InfoItem label="Name" value={companyEmployee.employeeName} />
          <InfoItem label="Contact" value={companyEmployee.contactNo} />
          <InfoItem label="Email" value={companyEmployee.mailId} />
          <InfoItem label="Department" value={companyEmployee.department} />
          <InfoItem label="Designation" value={companyEmployee.designation} />
          <InfoItem label="Landline" value={companyEmployee.landLineNo} />
        </div>
      </section>

      {/* Lead Info */}
      <section className="leadFullDataShow-card">
        <h3 className="leadFullDataShow-sectionTitle">Lead Info</h3>
        <div className="leadFullDataShow-grid">
          <InfoItem label="Reference No" value={lead.leadReferenceNo} />
          <InfoItem label="Date" value={formatDate(lead.leadDate)} />
          <InfoItem label="Time" value={formatTime(lead.leadTime)} />
          <InfoItem label="Way of Lead" value={lead.wayOfLead} />
          <InfoItem label="Communication" value={lead.modeOfCommunication} />
        </div>
      </section>

      {/* Need Info */}
      <section className="leadFullDataShow-card">
        <h3 className="leadFullDataShow-sectionTitle">Need Info</h3>
        <div className="leadFullDataShow-grid">
          <InfoItem label="Source" value={need.source} />
          <InfoItem label="Destination" value={need.destination} />
          <InfoItem
            label="Moving Date & Time"
            value={formatDateTime(need.movingDateAndTime)}
          />
          <InfoItem
            label="Receiving Date & Time"
            value={formatDateTime(need.receivingDateAndTime)}
          />
          <InfoItem label="Vehicle Value" value={`₹${need.vehicleValue}`} />
          <InfoItem label="Commodity Value" value={`₹${need.commodityValue}`} />
          <InfoItem label="Other Services" value={need.otherServices} />
          <InfoItem
            label="Warehouse Facility"
            value={need.anyWareHouseFacilityRatherThanThisThings}
          />
          <InfoItem label="Car Transport" value={need.carTransport} />
          <InfoItem label="Good Transport" value={need.goodTransport} />
          <InfoItem label="Commodity" value={need.commodity} />
          <InfoItem
            label="Insurance Facility"
            value={need.insuranceFacilityOfGoods}
          />
          <InfoItem label="Risk Coverage" value={need.riskCoverageGood} />
          <InfoItem label="Size" value={need.size} />
          <InfoItem
            label="Size of Transportation"
            value={need.sizeOfTransporatation}
          />
          <InfoItem
            label="Type of Transportation"
            value={need.typeOfTransporatation}
          />
          <InfoItem label="Weight" value={need.weight} />
          <InfoItem
            label="Car Moving Date"
            value={formatDate(need.carMovingDate)}
          />
          <InfoItem
            label="Car Moving Time"
            value={formatTime(need.carMovingTime)}
          />
          <InfoItem
            label="Anything Else"
            value={need.anyThingsElseRatherThanGood}
          />
          {/* <InfoItem label="When We Get Goods" value={need.whenWeGetGoods} /> */}
          {need.additionalNeed && need.additionalNeed.length > 0 && (
            <div className="leadFullDataShow-additionalNeed">
              <strong className="leadFullDataShow-infoLabel">
                Additional Need:
              </strong>
              {need.additionalNeed.map((item, index) => (
                <div
                  key={item.additionalNeedId}
                  className="leadFullDataShow-additionalNeedItem"
                >
                  <InfoItem label="Article Name" value={item.articleName} />
                  <InfoItem label="Article Value" value={item.articleValue} />
                  <InfoItem
                    label="Article Dimension"
                    value={item.articleDimension}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="leadFullDataShow-buttons">
        <button className="leadFullDataShow-button" onClick={openModal}>
          Update Lead
        </button>
      </div>

      {/* Update Form Modal */}
      {showModal && (
        <div className="leadFullDataShow-modal">
          <div className="leadFullDataShow-modalContent">
            <h3 className="leadFullDataShow-sectionTitle">
              Update Lead Details
            </h3>
            <form onSubmit={handleUpdate} className="leadFullDataShow-form">
              {/* Company Info */}
              <div className="leadFullDataShow-formSection">
                <h4 className="leadFullDataShow-formSectionTitle">
                  Company Info
                </h4>
                <FormInput
                  label="Name"
                  value={formData.company.companyName}
                  onChange={(e) =>
                    handleInputChange("company", "companyName", e.target.value)
                  }
                />
                <FormInput
                  label="Sector"
                  value={formData.company.companySector}
                  onChange={(e) =>
                    handleInputChange(
                      "company",
                      "companySector",
                      e.target.value
                    )
                  }
                />
                <FormInput
                  label="Set Up"
                  value={formData.company.companySetUp}
                  onChange={(e) =>
                    handleInputChange("company", "companySetUp", e.target.value)
                  }
                />
                <FormInput
                  label="Head Office"
                  value={formData.company.headOfOffice}
                  onChange={(e) =>
                    handleInputChange("company", "headOfOffice", e.target.value)
                  }
                />
                <FormInput
                  label="EasyHub Centre"
                  value={formData.company.easyHubCentre}
                  onChange={(e) =>
                    handleInputChange(
                      "company",
                      "easyHubCentre",
                      e.target.value
                    )
                  }
                />
                <FormInput
                  label="State"
                  value={formData.company.state}
                  onChange={(e) =>
                    handleInputChange("company", "state", e.target.value)
                  }
                />
              </div>

              {/* Employee Info */}
              <div className="leadFullDataShow-formSection">
                <h4 className="leadFullDataShow-formSectionTitle">
                  Employee Info
                </h4>
                <FormInput
                  label="Name"
                  value={formData.companyEmployee.employeeName}
                  onChange={(e) =>
                    handleInputChange(
                      "companyEmployee",
                      "employeeName",
                      e.target.value
                    )
                  }
                />
                <FormInput
                  label="Contact"
                  value={formData.companyEmployee.contactNo}
                  onChange={(e) =>
                    handleInputChange(
                      "companyEmployee",
                      "contactNo",
                      e.target.value
                    )
                  }
                />
                <FormInput
                  label="Email"
                  value={formData.companyEmployee.mailId}
                  onChange={(e) =>
                    handleInputChange(
                      "companyEmployee",
                      "mailId",
                      e.target.value
                    )
                  }
                />
                <FormInput
                  label="Department"
                  value={formData.companyEmployee.department}
                  onChange={(e) =>
                    handleInputChange(
                      "companyEmployee",
                      "department",
                      e.target.value
                    )
                  }
                />
                <FormInput
                  label="Designation"
                  value={formData.companyEmployee.designation}
                  onChange={(e) =>
                    handleInputChange(
                      "companyEmployee",
                      "designation",
                      e.target.value
                    )
                  }
                />
                <FormInput
                  label="Landline"
                  value={formData.companyEmployee.landLineNo}
                  onChange={(e) =>
                    handleInputChange(
                      "companyEmployee",
                      "landLineNo",
                      e.target.value
                    )
                  }
                />
              </div>

              {/* Lead Info */}
              <div className="leadFullDataShow-formSection">
                <h4 className="leadFullDataShow-formSectionTitle">Lead Info</h4>
                <FormInput
                  label="Reference No"
                  value={formData.lead.leadReferenceNo}
                  onChange={(e) =>
                    handleInputChange("lead", "leadReferenceNo", e.target.value)
                  }
                />
                <FormInput
                  label="Date"
                  value={formData.lead.leadDate}
                  onChange={(e) =>
                    handleInputChange("lead", "leadDate", e.target.value)
                  }
                />
                <FormInput
                  label="Time"
                  value={formData.lead.leadTime}
                  onChange={(e) =>
                    handleInputChange("lead", "leadTime", e.target.value)
                  }
                />
                <div className="leadFormInput_dropdown">
                  <label htmlFor="wayOfLead" className="leadFormInput_label">
                    Way of Lead
                  </label>
                  <select
                    id="wayOfLead"
                    className="leadFormInput_select"
                    value={formData.lead.wayOfLead}
                    onChange={(e) =>
                      handleInputChange("lead", "wayOfLead", e.target.value)
                    }
                  >
                    <option value="">Select Way of Lead</option>
                    <option value="PHONE">Phone</option>
                    <option value="EMAIL">Email</option>
                    <option value="WHATSAPP">WhatsApp</option>
                    <option value="PHYSICAL_MEETING">Physical Meeting</option>
                    <option value="NET_SEARCHING">Net Searching</option>
                  </select>
                </div>
                <FormInput
                  label="Communication"
                  value={formData.lead.modeOfCommunication}
                  onChange={(e) =>
                    handleInputChange(
                      "lead",
                      "modeOfCommunication",
                      e.target.value
                    )
                  }
                />
              </div>

              {/* Need Info */}
              <div className="leadFullDataShow-formSection">
                <h4 className="leadFullDataShow-formSectionTitle">Need Info</h4>
                <FormInput
                  label="Source"
                  value={formData.need.source}
                  onChange={(e) =>
                    handleInputChange("need", "source", e.target.value)
                  }
                />
                <FormInput
                  label="Destination"
                  value={formData.need.destination}
                  onChange={(e) =>
                    handleInputChange("need", "destination", e.target.value)
                  }
                />
                <FormInput
                  label="Moving Date & Time"
                  value={formData.need.movingDateAndTime.slice(0, 16)}
                  onChange={(e) =>
                    handleInputChange(
                      "need",
                      "movingDateAndTime",
                      e.target.value
                    )
                  }
                  type="datetime-local"
                />
                <FormInput
                  label="Receiving Date & Time"
                  value={formData.need.receivingDateAndTime.slice(0, 16)}
                  onChange={(e) =>
                    handleInputChange(
                      "need",
                      "receivingDateAndTime",
                      e.target.value
                    )
                  }
                  type="datetime-local"
                />
                <FormInput
                  label="Vehicle Value"
                  value={formData.need.vehicleValue}
                  onChange={(e) =>
                    handleInputChange("need", "vehicleValue", e.target.value)
                  }
                  type="number"
                />
                <FormInput
                  label="Commodity Value"
                  value={formData.need.commodityValue}
                  onChange={(e) =>
                    handleInputChange("need", "commodityValue", e.target.value)
                  }
                  type="number"
                />
                {/* <FormInput
                  label="Other Services"
                  value={formData.need.otherServices}
                  onChange={(e) =>
                    handleInputChange("need", "otherServices", e.target.value)
                  }
                /> */}
                <div className="leadFormInput_dropdown">
                  <label
                    htmlFor="otherServices"
                    className="leadFormInput_label"
                  >
                    Other Services
                  </label>
                  <select
                    id="otherServices"
                    className="leadFormInput_select"
                    value={formData.need.otherServices}
                    onChange={(e) =>
                      handleInputChange("need", "otherServices", e.target.value)
                    }
                  >
                    <option value="">Select Service</option>
                    <option value="AIR_CONDITION">Air Condition</option>
                    <option value="TV_INSTALLATION">TV Installation</option>
                    <option value="DISH_ANTINA">Dish Antina</option>
                    <option value="WATER_GEYSER">Water Geyser</option>
                    <option value="HYDRAULIC_BAG">Hydraulic Bag</option>
                    <option value="FURNITURE_MADE_OF_ENGINEERED_WOOD">
                      Furniture Made of Engineered Wood
                    </option>
                  </select>
                </div>
                <FormInput
                  label="Warehouse Facility"
                  value={formData.need.anyWareHouseFacilityRatherThanThisThings}
                  onChange={(e) =>
                    handleInputChange(
                      "need",
                      "anyWareHouseFacilityRatherThanThisThings",
                      e.target.value
                    )
                  }
                />
                <FormInput
                  label="Car Transport"
                  value={formData.need.carTransport}
                  onChange={(e) =>
                    handleInputChange("need", "carTransport", e.target.value)
                  }
                />
                <FormInput
                  label="Good Transport"
                  value={formData.need.goodTransport}
                  onChange={(e) =>
                    handleInputChange("need", "goodTransport", e.target.value)
                  }
                />
                <FormInput
                  label="Commodity"
                  value={formData.need.commodity}
                  onChange={(e) =>
                    handleInputChange("need", "commodity", e.target.value)
                  }
                />
                <FormInput
                  label="Insurance Facility"
                  value={formData.need.insuranceFacilityOfGoods}
                  onChange={(e) =>
                    handleInputChange(
                      "need",
                      "insuranceFacilityOfGoods",
                      e.target.value
                    )
                  }
                />
                {/* <FormInput
                  label="Risk Coverage"
                  value={formData.need.riskCoverageGood}
                  onChange={(e) =>
                    handleInputChange(
                      "need",
                      "riskCoverageGood",
                      e.target.value
                    )
                  }
                /> */}
                <div className="leadFormInput_dropdown">
                  <label htmlFor="riskCoverage" className="leadFormInput_label">
                    Risk Coverage
                  </label>
                  <select
                    id="riskCoverage"
                    className="leadFormInput_select"
                    value={formData.need.riskCoverageGood}
                    onChange={(e) =>
                      handleInputChange(
                        "need",
                        "riskCoverageGood",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select Risk Type</option>
                    <option value="OWNER_RISK">Owner Risk</option>
                    <option value="CAREER_RISK">Career Risk</option>
                  </select>
                </div>
                <FormInput
                  label="Size"
                  value={formData.need.size}
                  onChange={(e) =>
                    handleInputChange("need", "size", e.target.value)
                  }
                />
                <FormInput
                  label="Size of Transportation"
                  value={formData.need.sizeOfTransporatation}
                  onChange={(e) =>
                    handleInputChange(
                      "need",
                      "sizeOfTransporatation",
                      e.target.value
                    )
                  }
                />
                <FormInput
                  label="Type of Transportation"
                  value={formData.need.typeOfTransporatation}
                  onChange={(e) =>
                    handleInputChange(
                      "need",
                      "typeOfTransporatation",
                      e.target.value
                    )
                  }
                />
                <FormInput
                  label="Weight"
                  value={formData.need.weight}
                  onChange={(e) =>
                    handleInputChange("need", "weight", e.target.value)
                  }
                />
                <FormInput
                  label="Car Moving Date"
                  value={formData.need.carMovingDate}
                  onChange={(e) =>
                    handleInputChange("need", "carMovingDate", e.target.value)
                  }
                  type="date"
                />
                <FormInput
                  label="Car Moving Time"
                  value={formData.need.carMovingTime}
                  onChange={(e) =>
                    handleInputChange("need", "carMovingTime", e.target.value)
                  }
                  type="time"
                />
                <FormInput
                  label="Anything Else"
                  value={formData.need.anyThingsElseRatherThanGood}
                  onChange={(e) =>
                    handleInputChange(
                      "need",
                      "anyThingsElseRatherThanGood",
                      e.target.value
                    )
                  }
                />
                <FormInput
                  label="When We Get Goods"
                  value={formData.need.whenWeGetGoods}
                  onChange={(e) =>
                    handleInputChange("need", "whenWeGetGoods", e.target.value)
                  }
                />
                {formData.need.additionalNeed &&
                  formData.need.additionalNeed.length > 0 && (
                    <div className="leadFullDataShow-additionalNeedForm">
                      <h5 className="leadFullDataShow-formSectionTitle">
                        Additional Need
                      </h5>
                      {formData.need.additionalNeed.map((item, index) => (
                        <div
                          key={item.additionalNeedId}
                          className="leadFullDataShow-additionalNeedItem"
                        >
                          <FormInput
                            label={`Article Name ${index + 1}`}
                            value={item.articleName}
                            onChange={(e) =>
                              handleInputChange(
                                "need",
                                "additionalNeed",
                                { articleName: e.target.value },
                                index
                              )
                            }
                          />
                          <FormInput
                            label={`Article Value ${index + 1}`}
                            value={item.articleValue}
                            onChange={(e) =>
                              handleInputChange(
                                "need",
                                "additionalNeed",
                                { articleValue: e.target.value },
                                index
                              )
                            }
                            type="number"
                          />
                          <FormInput
                            label={`Article Dimension ${index + 1}`}
                            value={item.articleDimension}
                            onChange={(e) =>
                              handleInputChange(
                                "need",
                                "additionalNeed",
                                { articleDimension: e.target.value },
                                index
                              )
                            }
                          />
                        </div>
                      ))}
                    </div>
                  )}
              </div>

              <div className="leadFullDataShow-formButtons">
                <button type="submit" className="leadFullDataShow-button">
                  Save
                </button>
                <button
                  type="button"
                  className="leadFullDataShow-button leadFullDataShow-cancelButton"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable InfoItem component
const InfoItem = ({ label, value }) => (
  <div className="leadFullDataShow-infoItem">
    <strong className="leadFullDataShow-infoLabel">{label}:</strong>
    <span className="leadFullDataShow-infoValue">{value || "N/A"}</span>
  </div>
);

// Reusable FormInput component
const FormInput = ({ label, value, onChange, type = "text" }) => (
  <div className="leadFullDataShow-formInput">
    <label className="leadFullDataShow-infoLabel">{label}</label>
    <input
      type={type}
      value={value || ""}
      onChange={onChange}
      className="leadFullDataShow-input"
    />
  </div>
);

export default LeadFullDataShow;
