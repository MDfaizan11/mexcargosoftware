import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { BASE_URL } from "../config";
import { useParams } from "react-router-dom";
import "../Project/viewTask.css"; // External CSS

function ViewTask() {
  const { id } = useParams();
  const token = JSON.parse(localStorage.getItem("mexcargoUserData"))?.token;
  const [getTaskData, setGetTaskData] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [taskUpdateId, setTaskUpdateId] = useState("");
  const [showUpdateTaskForm, setshowUpdateTaskForm] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [idealDate, setIdealDate] = useState("");
  const [idealTime, setIdealTime] = useState("");
  const [implementedDate, setImplementedDate] = useState("");
  const [implementedTime, setImplementedTime] = useState("");
  useEffect(() => {
    async function getAllTasks() {
      try {
        const response = await axiosInstance.get(
          `${BASE_URL}/project-executive/${id}/project-tasks`
        );
        console.log(response.data);
        setGetTaskData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getAllTasks();
  }, [id, refreshKey]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "N/A";
    const time = new Date(`1970-01-01T${timeStr}`);
    return time.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  async function handleDeleteTask(id) {
    const deleteConfirm = window.confirm("Are You Sure To Delete Task ?");
    if (!deleteConfirm) return;
    try {
      const response = await axiosInstance.delete(
        `${BASE_URL}/project-executive/delete/task/${id}`
      );
      if (response.status === 200) {
        alert("Task Delete Successfully");
        setRefreshKey(refreshKey + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEditTask(id) {
    setTaskUpdateId(id);
    setshowUpdateTaskForm(true);
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/project-executive/project-task/${id}`
      );
      console.log(response.data);
      setTaskName(response.data?.taskName);
      setIdealDate(response.data?.idealDate);
      setIdealTime(response.data?.idealTime);
      setImplementedDate(response.data?.implementedDate);
      setImplementedTime(response.data?.implementedTime);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdatetask(e) {
    e.preventDefault();
    const formdata = {
      taskName: taskName,
      idealDate: idealDate,
      idealTime: idealTime,
      implementedDate: implementedDate,
      implementedTime: implementedTime,
      quatationProjectExecutiveId: id,
    };
    try {
      const response = await axiosInstance.put(
        `${BASE_URL}/project-executive/update/task/${taskUpdateId}`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Task Update Successfully");
        setTaskName("");
        setIdealDate("");
        setIdealTime("");
        setImplementedDate("");
        setImplementedTime("");
        setRefreshKey(refreshKey + 1);
        setshowUpdateTaskForm(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="viewtaskcard-container">
        <h2 className="viewtaskcard-title" style={{ textAlign: "center" }}>
          View Task
        </h2>
        {getTaskData.length > 0 ? (
          getTaskData.map((task) => (
            <div key={task.id} className="viewtaskcard-card">
              <h3 className="viewtaskcard-taskname">
                Task Name : {task.taskName}
              </h3>
              <p>
                <strong>Ideal Date:</strong> {formatDate(task.idealDate)}
              </p>
              <p>
                <strong>Ideal Time:</strong> {formatTime(task.idealTime)}
              </p>
              <p>
                <strong>Implemented Date:</strong>{" "}
                {formatDate(task.implementedDate)}
              </p>
              <p>
                <strong>Implemented Time:</strong>{" "}
                {formatTime(task.implementedTime)}
              </p>
              <p>
                <strong>Time Difference:</strong>{" "}
                {task.timeDifferenceMinutes ?? "N/A"} minutes
              </p>
              <div className="viewtaskcard-button-group">
                <button
                  className="viewtaskcard-edit-btn"
                  onClick={() => handleEditTask(task.id)}
                >
                  Edit
                </button>
                <button
                  className="viewtaskcard-delete-btn"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="viewtaskcard-empty">No tasks available</p>
        )}
      </div>

      {showUpdateTaskForm && (
        <div className="update_task_form_overlay">
          <div className="update_task_form_popup">
            <span
              onClick={() => setshowUpdateTaskForm(false)}
              className="update_task_form_close"
            >
              ×
            </span>
            <form className="update_task_form" onSubmit={handleUpdatetask}>
              <label htmlFor="taskName">Task Name</label>
              <input
                type="text"
                id="taskName"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />

              <label htmlFor="idealDate">Ideal Date</label>
              <input
                type="date"
                id="idealDate"
                value={idealDate}
                onChange={(e) => setIdealDate(e.target.value)}
              />

              <label htmlFor="idealTime">Ideal Time</label>
              <input
                type="time"
                id="idealTime"
                value={idealTime}
                onChange={(e) => setIdealTime(e.target.value)}
              />

              <label htmlFor="implementedDate">Implemented Date</label>
              <input
                type="date"
                id="implementedDate"
                value={implementedDate}
                onChange={(e) => setImplementedDate(e.target.value)}
              />

              <label htmlFor="implementedTime">Implemented Time</label>
              <input
                type="time"
                id="implementedTime"
                value={implementedTime}
                onChange={(e) => setImplementedTime(e.target.value)}
              />

              <button type="submit" className="update_task_form_button">
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewTask;
