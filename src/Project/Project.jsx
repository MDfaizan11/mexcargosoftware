import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { BASE_URL } from "../config";
import "../Project/project.css";
import { useNavigate } from "react-router-dom";
function Project() {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("mexcargoUserData"))?.token;
  const ProjectExecutiveId = JSON.parse(
    localStorage.getItem("mexcargoUserData")
  )?.userId;
  const [getAllProjectData, setgetAllProjectData] = useState("");
  const [quatationProjectExecutiveId, setquatationProjectExecutiveId] =
    useState("");
  const [showProjectTaskForm, setshowProjectTaskForm] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [idealDate, setIdealDate] = useState("");
  const [idealTime, setIdealTime] = useState("");
  const [implementedDate, setImplementedDate] = useState("");
  const [implementedTime, setImplementedTime] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (timeString) => {
    const date = new Date(`1970-01-01T${timeString}`);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    async function getAllProjectdata() {
      try {
        const response = await axiosInstance.get(
          `${BASE_URL}/get/project-executive/${ProjectExecutiveId}/quatation`
        );
        console.log(response.data);
        setgetAllProjectData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllProjectdata();
  }, []);

  function handleshowAddTaskForm(id) {
    setquatationProjectExecutiveId(id);
    setshowProjectTaskForm(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      taskName,
      idealDate,
      idealTime,
      implementedDate,
      implementedTime,
      quatationProjectExecutiveId,
    };
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/project-executive/create/task`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Task Added successfuly");
        setIdealDate("");
        setIdealTime("");
        setImplementedDate("");
        setImplementedTime("");
        setTaskName("");
        setshowProjectTaskForm(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleViewAllTask(id) {
    navigate(`/viewTask/${id}`);
  }
  return (
    <>
      <h3 className="Project_heading">Project Section</h3>
      <div className="projectCardData-container">
        {getAllProjectData.length > 0 ? (
          getAllProjectData.map((item, index) => (
            <div key={index} className="projectCardData-card">
              <h3 className="projectCardData-title">
                Quotation Reference: {item.quatationReferenceNo}
              </h3>
              <p>
                <strong>Source:</strong> {item.source}
              </p>
              <p>
                <strong>Destination:</strong> {item.destination}
              </p>
              <p>
                <strong>Commodity:</strong> {item.commodity}
              </p>
              <p>
                <strong>Moving Date & Time:</strong>
                {formatDate(item.movingDateAndTime)} at{" "}
                {formatTime(item.movingDateAndTime.slice(11, 16))}
              </p>
              <p>
                <strong>Weight:</strong> {item.weight} kg
              </p>
              <p>
                <strong>Size:</strong> {item.size}
              </p>
              <p>
                <strong>Type of Transportation:</strong>{" "}
                {item.typeOfTransporatation}
              </p>

              <p>
                <strong>Car Transport:</strong> {item.carTransport}
              </p>
              <p>
                <strong>Car Moving Date:</strong>{" "}
                {formatDate(item.carMovingDate)}
              </p>
              <p>
                <strong>Car Moving Time:</strong>{" "}
                {formatTime(item.carMovingTime)}
              </p>

              <p>
                <strong>Other Services:</strong> {item.otherServices}
              </p>

              <p>
                <strong>Required Quotation Date:</strong>{" "}
                {formatDate(item.requiredQuatationDate)}
              </p>
              <p>
                <strong>Required Quotation Time:</strong>{" "}
                {formatTime(item.requiredQuatationTime)}
              </p>
              <p>
                <strong>Receiving Quotation Date:</strong>{" "}
                {formatDate(item.receivingQuatationDate)}
              </p>
              <p>
                <strong>Receiving Quotation Time:</strong>{" "}
                {formatTime(item.receivingQuationTime)}
              </p>
              <button
                className="project_add_task_button"
                onClick={() =>
                  handleshowAddTaskForm(item.quatationProjectExecutiveId)
                }
              >
                Add Task
              </button>
              <button
                className="project_add_task_button"
                onClick={() =>
                  handleViewAllTask(item.quatationProjectExecutiveId)
                }
              >
                {" "}
                View Task
              </button>
            </div>
          ))
        ) : (
          <p className="projectCardData-empty">No Data found</p>
        )}
      </div>

      {showProjectTaskForm && (
        <div className="project_task_from_overlay">
          <div className="project_task_from_popup">
            <button
              className="project_task_from_close"
              onClick={() => setshowProjectTaskForm(false)}
            >
              ×
            </button>
            <form onSubmit={handleSubmit} className="project_task_from">
              <input
                type="text"
                placeholder="Enter Task Name"
                className="project_task_from_input"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />

              <label className="project_task_from_label">Ideal Date :</label>
              <input
                type="date"
                className="project_task_from_input"
                value={idealDate}
                onChange={(e) => setIdealDate(e.target.value)}
              />

              <label className="project_task_from_label">Ideal Time :</label>
              <input
                type="time"
                className="project_task_from_input"
                value={idealTime}
                onChange={(e) => setIdealTime(e.target.value)}
              />

              <label className="project_task_from_label">
                Implemented Date :
              </label>
              <input
                type="date"
                className="project_task_from_input"
                value={implementedDate}
                onChange={(e) => setImplementedDate(e.target.value)}
              />

              <label className="project_task_from_label">
                Implemented Time :
              </label>
              <input
                type="time"
                className="project_task_from_input"
                value={implementedTime}
                onChange={(e) => setImplementedTime(e.target.value)}
              />

              <button type="submit" className="project_task_from_submit_button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Project;
