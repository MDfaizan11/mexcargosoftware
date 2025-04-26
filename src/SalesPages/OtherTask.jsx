import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/OtherTask.module.css";
import axios from "axios";
import { BASE_URL } from "../config";
import axiosInstance from "../utils/axiosInstance";
function OtherTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("mexcargoUserData"))?.token;
  const [showPricing, setShowPricing] = useState(false);
  const [extraNeedFormShow, setExtraNeedFormShow] = useState(false);
  const [extraneedId, setExtraneedId] = useState(null);
  const [originFloorNo, setOriginFloorNo] = useState("");
  const [destinationFloorNo, setDestinationFloorNo] = useState("");
  const [originDetailsAddress, setOriginDetailsAddress] = useState("");
  const [destinationDetailsAddress, setDestinationDetailsAddress] =
    useState("");
  const [isLiftAvailableInOrigin, setIsLiftAvailableInOrigin] = useState(false);
  const [isLiftAvailableInDestination, setIsLiftAvailableInDestination] =
    useState(false);
  const [specialService, setSpecialService] = useState("");
  const [secondaryVehicle, setSecondaryVehicle] = useState("");
  const [remark, setRemark] = useState("");

  const [pricingData, setPricingData] = useState([]);
  const [getPricingData, setGetPricingData] = useState([]);
  const [shoupdatePriingCard, setShoupdatePriingCard] = useState(false);
  const [showUpdatePricingForm, setShowUpdatePricingForm] = useState(false);

  const [showExtraNeedUpdateForm, setShowExtraNeedUpdateForm] = useState(false);
  const [extraNeedUpdateId, setExtraNeedUpdateId] = useState(null);
  const [AddtaskId, setAddtaskId] = useState(null);
  const [salesTasks, setSalesTasks] = useState([]);
  const [showTaskData, setShowTaskData] = useState(false);
  const [taskStates, setTaskStates] = useState([]);
  const [taskgetData, setTaskgetData] = useState([]);
  const [ShowtaskgetData, setShowtaskgetData] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
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

  function handleShowUpdateLead(id) {
    navigate(`/leadfulldatashow/${id}`);
  }

  async function handleShowPricing(id) {
    setShowPricing(true);
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/get/lead/${id}/particular-amount`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setPricingData(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  function handleAddExtraNeedData(id) {
    setExtraneedId(id);
    setExtraNeedFormShow(true);
  }
  async function handleSubmitextraneed(e) {
    e.preventDefault();
    const formData = {
      originFloorNo: originFloorNo,
      destinationFloorNo: destinationFloorNo,
      originDetailsAddress: originDetailsAddress,
      destinationDetailsAddress: destinationDetailsAddress,
      isLiftAvailableInOrigin: isLiftAvailableInOrigin,
      isLiftAvailableInDestination: isLiftAvailableInDestination,
      specialService: specialService,
      secondaryVehicle: secondaryVehicle,
      remark: remark,
    };
    console.log(formData);
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/add/lead/${extraneedId}/extra-need-data`,
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
        alert("Extra need added successfully");
        setExtraNeedFormShow(false);
        // setrefreshKey(refreshKey + 1);
        setOriginFloorNo("");
        setDestinationFloorNo("");
        setOriginDetailsAddress("");
        setDestinationDetailsAddress("");
        setIsLiftAvailableInOrigin(false);
        setIsLiftAvailableInDestination(false);
        setSpecialService("");
        setSecondaryVehicle("");
        setRemark("");
      }
    } catch (error) {
      const massage = error.response.data?.message;
      if (massage) {
        alert(
          "You can add data only once. For further changes, please update the existing data."
        );
      } else {
        console.log(error);
      }
    }
  }

  const handleUpdatePricing = async (e) => {
    e.preventDefault();
    setShowUpdatePricingForm(true);

    try {
      const response = await axiosInstance.put(
        `${BASE_URL}/update/lead/${id}/particular-amount`,
        {
          packingAmount: parseFloat(pricingData.packingAmount) || 0,
          loadingAmount: parseFloat(pricingData.loadingAmount) || 0,
          unloadingAmount: parseFloat(pricingData.unloadingAmount) || 0,
          unpackingAmount: parseFloat(pricingData.unpackingAmount) || 0,
          packingAndLoadingAmount:
            parseFloat(pricingData.packingAndLoadingAmount) || 0,
          unloadingAndUnpackingAmount:
            parseFloat(pricingData.unloadingAndUnpackingAmount) || 0,
          packingAndLoadingAndUnloadingAndUnpackingAmount:
            parseFloat(
              pricingData.packingAndLoadingAndUnloadingAndUnpackingAmount
            ) || 0,
          transportationOfHouseholdAmount:
            parseFloat(pricingData.transportationOfHouseholdAmount) || 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      alert("Pricing Added successfully");
      setShowPricing(true);
      setShowUpdatePricingForm(false);
    } catch (error) {
      console.log(error);
      alert("Error updating pricing");
    }
  };

  async function handleViewExtraNeed(id) {
    setShoupdatePriingCard(true);
    setShowTaskData(false);
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/get/lead/${id}/extra-need-details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setGetPricingData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleUpdateExistingPricing(id) {
    setExtraNeedUpdateId(id);
    setShowExtraNeedUpdateForm(true);

    // Pre-fill form fields from existing data
    setOriginFloorNo(getPricingData.originFloorNo);
    setDestinationFloorNo(getPricingData.destinationFloorNo);
    setOriginDetailsAddress(getPricingData.originDetailsAddress);
    setDestinationDetailsAddress(getPricingData.destinationDetailsAddress);
    setIsLiftAvailableInOrigin(getPricingData.isLiftAvailableInOrigin);
    setIsLiftAvailableInDestination(
      getPricingData.isLiftAvailableInDestination
    );
    setSpecialService(getPricingData.specialService);
    setSecondaryVehicle(getPricingData.secondaryVehicle);
    setRemark(getPricingData.remark);
  }

  async function handleSubmitUpdate(e) {
    e.preventDefault();
    const updatedData = {
      originFloorNo,
      destinationFloorNo,
      originDetailsAddress,
      destinationDetailsAddress,
      isLiftAvailableInOrigin,
      isLiftAvailableInDestination,
      specialService,
      secondaryVehicle,
      remark,
    };

    try {
      const response = await axiosInstance.put(
        `${BASE_URL}/update/lead/${extraNeedUpdateId}/extra-need-details`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Details updated successfully!");
        setShowExtraNeedUpdateForm(false);
        handleViewExtraNeed(extraNeedUpdateId);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update data.");
    }
  }
  async function handleAddTask(id) {
    setAddtaskId(id);
    setShowTaskData(true);
    setShoupdatePriingCard(false);
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/lead/${id}/get/tasks/sales-and-marketing`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setSalesTasks(response.data);
      const initialStates = response.data.map((task) => ({
        salesAndMarketingTaskId: task.salesAndMarketingTaskId,
        agreementNumber: task.agreementNumber || "",
        completedTaskDate: task.completedTaskDate || "",
        completedTaskTime: task.completedTaskTime || "",
        confirmationMode: task.confirmationMode || "",
        isCompleted: task.isCompleted || false,
      }));
      setTaskStates(initialStates);
    } catch (error) {
      console.log(error);
    }
  }
  const handleTaskChange = (index, field, value) => {
    const updatedTasks = [...taskStates];
    updatedTasks[index][field] = value;
    setTaskStates(updatedTasks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {};
    salesTasks.forEach((task, index) => {
      const state = taskStates[index];

      if (task.name === "Verbal Confirmation") {
        payload.verbalTaskCompltedDate = state.completedTaskDate;
        payload.verbalTaskCompletedTime = state.completedTaskTime;
        payload.isVerbalTaskCompleted = state.isCompleted;
      }

      if (task.name === "Get Client Work Order") {
        payload.workOrderTaskCompltedDate = state.completedTaskDate;
        payload.workOrderTaskCompletedTime = state.completedTaskTime;
        payload.isWorkOrderTaskCompleted = state.isCompleted;
      }

      if (task.name === "Agreement Paper Sent") {
        payload.agrementSentPaperTaskCompltedDate = state.completedTaskDate;
        payload.agrementSentPaperTaskCompletedTime = state.completedTaskTime;
        payload.isAgrementSentPaperTaskCompleted = state.isCompleted;
        payload.agrementSentPaperNumber = state.agreementNumber;
      }

      if (task.name === "Agreement Confirmation") {
        payload.agrementConfirmationTaskCompltedDate = state.completedTaskDate;
        payload.agrementConfirmationTaskCompltedTime = state.completedTaskTime;
        payload.isAgrementConfirmationTaskCompleted = state.isCompleted;
        payload.agrementConfirmationMode = state.confirmationMode;
        payload.agrementConfirmationNumber = state.agreementNumber;
      }
    });

    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/lead/${AddtaskId}/mark-task`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Tasks updated successfully!");
        // ✅ Reset input states manually
        const emptyStates = salesTasks.map((task) => ({
          salesAndMarketingTaskId: task.salesAndMarketingTaskId,
          agreementNumber: "",
          completedTaskDate: "",
          completedTaskTime: "",
          confirmationMode: "",
          isCompleted: false,
        }));
        setTaskStates(emptyStates);
        // setShowTaskData(false);
      }
    } catch (error) {
      console.error("Failed to update tasks:", error);
      alert("Error updating tasks.");
    }
  };

  async function handleViewAllTask(id) {
    setShowtaskgetData(true);
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/lead/${id}/get/tasks/sales-and-marketing`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setTaskgetData(response.data);
      setShowTaskData(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className={styles.other_task_button_container}>
        <button onClick={() => handleShowUpdateLead(id)}> Update Lead</button>
        <button onClick={() => handleShowPricing(id)}> Pricing Edit</button>
        <button onClick={() => handleAddExtraNeedData(id)}>
          Add Extra Need
        </button>
        <button onClick={() => handleViewExtraNeed(id)}>View Extra Need</button>
        <button onClick={() => handleAddTask(id)}> Add Task</button>
        <button onClick={() => handleViewAllTask(id)}> Show Task Data</button>
      </div>
      {extraNeedFormShow && (
        <div className={styles.extra_field_form__overlay}>
          <div className={styles.extra_field_form__container}>
            <h2 className={styles.extra_field_form__title}>Add Extra Need</h2>
            <form onSubmit={handleSubmitextraneed}>
              <input
                className={styles.extra_field_form__input}
                value={originFloorNo}
                onChange={(e) => setOriginFloorNo(e.target.value)}
                placeholder="Origin Floor No"
              />
              <input
                className={styles.extra_field_form__input}
                value={destinationFloorNo}
                onChange={(e) => setDestinationFloorNo(e.target.value)}
                placeholder="Destination Floor No"
              />
              <input
                className={styles.extra_field_form__input}
                value={originDetailsAddress}
                onChange={(e) => setOriginDetailsAddress(e.target.value)}
                placeholder="Origin Address"
              />
              <input
                className={styles.extra_field_form__input}
                value={destinationDetailsAddress}
                onChange={(e) => setDestinationDetailsAddress(e.target.value)}
                placeholder="Destination Address"
              />

              <div className={styles.extra_field_form__checkbox_group_row}>
                <label>
                  <input
                    type="checkbox"
                    checked={isLiftAvailableInOrigin}
                    onChange={(e) =>
                      setIsLiftAvailableInOrigin(e.target.checked)
                    }
                  />
                  Origin Lift
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={isLiftAvailableInDestination}
                    onChange={(e) =>
                      setIsLiftAvailableInDestination(e.target.checked)
                    }
                  />
                  Destination Lift
                </label>
              </div>

              <input
                className={styles.extra_field_form__input}
                value={specialService}
                onChange={(e) => setSpecialService(e.target.value)}
                placeholder="Special Service"
              />
              <input
                className={styles.extra_field_form__input}
                value={secondaryVehicle}
                onChange={(e) => setSecondaryVehicle(e.target.value)}
                placeholder="Secondary Vehicle"
              />
              <textarea
                className={styles.extra_field_form__textarea}
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Remark"
              ></textarea>

              <div className={styles.extra_field_form__actions}>
                <button
                  className={styles.extra_field_form__cancel_button}
                  onClick={() => setExtraNeedFormShow(false)}
                >
                  Cancel
                </button>
                <button className={styles.extra_field_form__submit_button}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPricing && pricingData && (
        <div className={styles.nwepricingdataEditOverlay}>
          <div className={styles.nwepricingdataEdit}>
            <h2>Pricing Details</h2>
            <p>
              Packing Amount : ₹{pricingData.packingAmount?.toLocaleString()}
            </p>
            <p>
              Loading Amount : ₹{pricingData.loadingAmount?.toLocaleString()}
            </p>
            <p>
              Unloading Amount : ₹
              {pricingData.unloadingAmount?.toLocaleString()}
            </p>
            <p>
              Unpacking Amount : ₹
              {pricingData.unpackingAmount?.toLocaleString()}
            </p>
            <p>
              Transportation Amount : ₹
              {pricingData.transportationOfHouseholdAmount?.toLocaleString()}
            </p>
            <p>
              Total (Packing + Loading) Amount : ₹
              {pricingData.packingAndLoadingAmount?.toLocaleString()}
            </p>
            <p>
              Total (Unloading + Unpacking) Amount : ₹
              {pricingData.unloadingAndUnpackingAmount?.toLocaleString()}
            </p>
            <p>
              Packing And Loading And Unloading And Unpacking Amount : ₹
              {pricingData.packingAndLoadingAndUnloadingAndUnpackingAmount?.toLocaleString()}
            </p>

            <button
              className={styles.updateButton}
              onClick={() => {
                setShowUpdatePricingForm(true);
                setShowPricing(false);
              }}
            >
              Update
            </button>

            <button
              className={styles.closeButton}
              onClick={() => setShowPricing(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showUpdatePricingForm && pricingData && (
        <div className={styles.nwepricingdataEditOverlay}>
          <div className={styles.nwepricingdataEdit}>
            <h2>Update Pricing Details</h2>
            <form
              onSubmit={handleUpdatePricing}
              className={styles.updateexistingprices}
            >
              <h2 className={styles.updateexistingprices__title}>
                Update Pricing Details
              </h2>

              <div className={styles.updateexistingprices__field}>
                <label className={styles.updateexistingprices__label}>
                  Packing Amount
                </label>
                <input
                  type="number"
                  value={pricingData.packingAmount}
                  onChange={(e) =>
                    setPricingData({
                      ...pricingData,
                      packingAmount: e.target.value,
                    })
                  }
                  placeholder="Enter packing amount"
                  className={styles.updateexistingprices__input}
                />
              </div>

              <div className={styles.updateexistingprices__field}>
                <label className={styles.updateexistingprices__label}>
                  Loading Amount
                </label>
                <input
                  type="number"
                  value={pricingData.loadingAmount}
                  onChange={(e) =>
                    setPricingData({
                      ...pricingData,
                      loadingAmount: e.target.value,
                    })
                  }
                  placeholder="Enter loading amount"
                  className={styles.updateexistingprices__input}
                />
              </div>

              <div className={styles.updateexistingprices__field}>
                <label className={styles.updateexistingprices__label}>
                  Unloading Amount
                </label>
                <input
                  type="number"
                  value={pricingData.unloadingAmount}
                  onChange={(e) =>
                    setPricingData({
                      ...pricingData,
                      unloadingAmount: e.target.value,
                    })
                  }
                  placeholder="Enter unloading amount"
                  className={styles.updateexistingprices__input}
                />
              </div>

              <div className={styles.updateexistingprices__field}>
                <label className={styles.updateexistingprices__label}>
                  Unpacking Amount
                </label>
                <input
                  type="number"
                  value={pricingData.unpackingAmount}
                  onChange={(e) =>
                    setPricingData({
                      ...pricingData,
                      unpackingAmount: e.target.value,
                    })
                  }
                  placeholder="Enter unpacking amount"
                  className={styles.updateexistingprices__input}
                />
              </div>

              <div className={styles.updateexistingprices__field}>
                <label className={styles.updateexistingprices__label}>
                  Transportation Amount
                </label>
                <input
                  type="number"
                  value={pricingData.transportationOfHouseholdAmount}
                  onChange={(e) =>
                    setPricingData({
                      ...pricingData,
                      transportationOfHouseholdAmount: e.target.value,
                    })
                  }
                  placeholder="Enter transportation amount"
                  className={styles.updateexistingprices__input}
                />
              </div>

              <div className={styles.updateexistingprices__field}>
                <label className={styles.updateexistingprices__label}>
                  Total Packing + Loading
                </label>
                <input
                  type="number"
                  value={pricingData.packingAndLoadingAmount}
                  onChange={(e) =>
                    setPricingData({
                      ...pricingData,
                      packingAndLoadingAmount: e.target.value,
                    })
                  }
                  placeholder="Enter total packing + loading"
                  className={styles.updateexistingprices__input}
                />
              </div>

              <div className={styles.updateexistingprices__field}>
                <label className={styles.updateexistingprices__label}>
                  Total Unloading + Unpacking
                </label>
                <input
                  type="number"
                  value={pricingData.unloadingAndUnpackingAmount}
                  onChange={(e) =>
                    setPricingData({
                      ...pricingData,
                      unloadingAndUnpackingAmount: e.target.value,
                    })
                  }
                  placeholder="Enter total unloading + unpacking"
                  className={styles.updateexistingprices__input}
                />
              </div>

              <div className={styles.updateexistingprices__field}>
                <label className={styles.updateexistingprices__label}>
                  Grand Total
                </label>
                <input
                  type="number"
                  value={
                    pricingData.packingAndLoadingAndUnloadingAndUnpackingAmount
                  }
                  onChange={(e) =>
                    setPricingData({
                      ...pricingData,
                      packingAndLoadingAndUnloadingAndUnpackingAmount:
                        e.target.value,
                    })
                  }
                  placeholder="Enter grand total"
                  className={styles.updateexistingprices__input}
                />
              </div>

              <div className={styles.updateexistingprices__actions}>
                <button
                  type="submit"
                  className={styles.updateexistingprices__save}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setShowUpdatePricingForm(false)}
                  className={styles.updateexistingprices__cancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/*   task section */}

      {shoupdatePriingCard && getPricingData && (
        <>
          <div className={styles.showupdatePricedata_card}>
            <h3 className={styles.showupdatePricedata_title}>
              Extra Need Details
            </h3>
            <p>
              <strong>Origin Floor No:</strong> {getPricingData.originFloorNo}
            </p>
            <p>
              <strong>Destination Floor No:</strong>{" "}
              {getPricingData.destinationFloorNo}
            </p>
            <p>
              <strong>Origin Address:</strong>{" "}
              {getPricingData.originDetailsAddress}
            </p>
            <p>
              <strong>Destination Address:</strong>{" "}
              {getPricingData.destinationDetailsAddress}
            </p>
            <p>
              <strong>Lift at Origin:</strong>{" "}
              {getPricingData.isLiftAvailableInOrigin ? "Yes" : "No"}
            </p>
            <p>
              <strong>Lift at Destination:</strong>{" "}
              {getPricingData.isLiftAvailableInDestination ? "Yes" : "No"}
            </p>
            <p>
              <strong>Special Service:</strong> {getPricingData.specialService}
            </p>
            <p>
              <strong>Secondary Vehicle:</strong>{" "}
              {getPricingData.secondaryVehicle}
            </p>
            <p>
              <strong>Remark:</strong> {getPricingData.remark}
            </p>

            <button
              className={styles.showupdatePricedata_update_button}
              onClick={() => handleUpdateExistingPricing(id)}
            >
              Update
            </button>
            <button
              className={styles.showupdatePricedata_close_button}
              onClick={() => setShoupdatePriingCard(false)}
            >
              close
            </button>
          </div>
        </>
      )}

      {/*  update */}

      {showExtraNeedUpdateForm && (
        <form
          onSubmit={handleSubmitUpdate}
          className={styles.updateextraneed_form}
        >
          <h3 className={styles.updateextraneed_title}>
            Update Extra Need Details
          </h3>

          <div className={styles.updateextraneed_grid}>
            <input
              type="text"
              value={originFloorNo}
              onChange={(e) => setOriginFloorNo(e.target.value)}
              placeholder="Origin Floor No"
            />
            <input
              type="text"
              value={destinationFloorNo}
              onChange={(e) => setDestinationFloorNo(e.target.value)}
              placeholder="Destination Floor No"
            />
            <input
              type="text"
              value={originDetailsAddress}
              onChange={(e) => setOriginDetailsAddress(e.target.value)}
              placeholder="Origin Address"
            />
            <input
              type="text"
              value={destinationDetailsAddress}
              onChange={(e) => setDestinationDetailsAddress(e.target.value)}
              placeholder="Destination Address"
            />

            <label className={styles.updateextraneed_checkboxLabel}>
              <input
                type="checkbox"
                checked={isLiftAvailableInOrigin}
                onChange={(e) => setIsLiftAvailableInOrigin(e.target.checked)}
              />
              Lift at Origin
            </label>
            <label className={styles.updateextraneed_checkboxLabel}>
              <input
                type="checkbox"
                checked={isLiftAvailableInDestination}
                onChange={(e) =>
                  setIsLiftAvailableInDestination(e.target.checked)
                }
              />
              Lift at Destination
            </label>

            <input
              type="text"
              value={specialService}
              onChange={(e) => setSpecialService(e.target.value)}
              placeholder="Special Service"
            />
            <input
              type="text"
              value={secondaryVehicle}
              onChange={(e) => setSecondaryVehicle(e.target.value)}
              placeholder="Secondary Vehicle"
            />
            <input
              type="text"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Remark"
            />
          </div>

          <div className={styles.updateextraneed_buttons}>
            <button type="submit" className={styles.updateextraneed_updateBtn}>
              Submit Update
            </button>
            <button
              type="button"
              className={styles.updateextraneed_cancelBtn}
              onClick={() => setShowExtraNeedUpdateForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* task */}
      {showTaskData && (
        <form onSubmit={handleSubmit} className={styles.salestasks_form}>
          <h2 className={styles.salestasks_title}>Sales & Marketing Tasks</h2>

          {salesTasks.map((task, index) => (
            <div
              key={task.salesAndMarketingTaskId}
              className={styles.salestasks_card}
            >
              <h3>{task.name}</h3>
              <p>{task.description}</p>

              <input
                type="text"
                placeholder="Agreement Number"
                value={taskStates[index]?.agreementNumber}
                onChange={(e) =>
                  handleTaskChange(index, "agreementNumber", e.target.value)
                }
                style={
                  ["Verbal Confirmation", "Get Client Work Order"].includes(
                    task.name
                  )
                    ? { display: "none" }
                    : {}
                }
              />
              <input
                type="date"
                value={taskStates[index]?.completedTaskDate}
                onChange={(e) =>
                  handleTaskChange(index, "completedTaskDate", e.target.value)
                }
              />
              <input
                type="time"
                value={taskStates[index]?.completedTaskTime}
                onChange={(e) =>
                  handleTaskChange(index, "completedTaskTime", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Confirmation Mode"
                value={taskStates[index]?.confirmationMode}
                onChange={(e) =>
                  handleTaskChange(index, "confirmationMode", e.target.value)
                }
                style={
                  [
                    "Verbal Confirmation",
                    "Get Client Work Order",
                    "Agreement Paper Sent",
                  ].includes(task.name)
                    ? { display: "none" }
                    : {}
                }
              />
              <label className={styles.salestasks_checkboxLabel}>
                <input
                  type="checkbox"
                  checked={taskStates[index]?.isCompleted}
                  onChange={(e) =>
                    handleTaskChange(index, "isCompleted", e.target.checked)
                  }
                />
                Task Completed
              </label>
            </div>
          ))}

          <div className={styles.salestasks_buttons}>
            <button type="submit" className={styles.salestasks_submitBtn}>
              Submit Tasks
            </button>
            <button
              className={styles.salestasks_closeBtn}
              onClick={() => setShowTaskData(false)}
            >
              Cancle
            </button>
          </div>
        </form>
      )}

      {/* get task data */}
      {ShowtaskgetData && (
        <div className={styles.taskgetData_container}>
          <div className={styles.taskgetData_header}>
            <h2 className={styles.taskgetData_title}>
              Sales & Marketing Task Status
            </h2>
            <button
              className={styles.taskgetData_closeBtn}
              onClick={() => setShowtaskgetData(false)}
            >
              ✖ Close
            </button>
          </div>

          {taskgetData.map((task) => (
            <div
              key={task.salesAndMarketingTaskId}
              className={styles.taskgetData_card}
            >
              <h3 className={styles.taskgetData_taskName}>{task.name}</h3>
              <p className={styles.taskgetData_description}>
                {task.description}
              </p>

              <p>
                <strong>Completed Date:</strong>{" "}
                {formatDate(task.completedTaskDate)}
              </p>

              <p>
                <strong>Completed Time:</strong>{" "}
                {formatTime(task.completedTaskTime)}
              </p>

              {task.agreementNumber && (
                <p>
                  <strong>Agreement Number:</strong> {task.agreementNumber}
                </p>
              )}
              {task.confirmationMode && (
                <p>
                  <strong>Confirmation Mode:</strong> {task.confirmationMode}
                </p>
              )}

              <p>
                <strong>Status:</strong>{" "}
                {task.isCompleted ? (
                  <span className={styles.taskgetData_completed}>
                    ✅ Completed
                  </span>
                ) : (
                  <span className={styles.taskgetData_incomplete}>
                    ❌ Not Completed
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default OtherTask;
