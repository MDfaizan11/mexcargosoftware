import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import "../styles/todo.css";
import axiosInstance from "../utils/axiosInstance";
function ToDO() {
  const { id } = useParams();
  const token = JSON.parse(localStorage.getItem("mexcargoUserData"))?.token;
  const [todoData, setTodoData] = useState(null);

  useEffect(() => {
    async function getTodoList() {
      try {
        const response = await fetch(
          `${BASE_URL}/get/todoentity/count/list?userId=${id}&page=0&size=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("✅ API Data:", result);

        if (result?.content?.length > 0) {
          setTodoData(result.content[0]);
        } else {
          console.warn("⚠️ No data found in content array.");
        }
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    }

    getTodoList();
  }, [id, token]);

  return (
    <div className="seprate-todo-wrapper">
      <h2 className="seprate-todo-title">ToDo Counts</h2>
      {todoData ? (
        <div className="seprate-todo-grid">
          <div className="seprate-todo-card">
            <h3>Email Count</h3>
            <p>{todoData.emailDetailsCount}</p>
          </div>
          <div className="seprate-todo-card">
            <h3>Meeting Count</h3>
            <p>{todoData.meetingCount}</p>
          </div>
          <div className="seprate-todo-card">
            <h3>Miscellaneous Count</h3>
            <p>{todoData.miscellaneousCount}</p>
          </div>
          <div className="seprate-todo-card">
            <h3>Net Searching Count</h3>
            <p>{todoData.netSerchingCount}</p>
          </div>
          <div className="seprate-todo-card">
            <h3>Phone Details Count</h3>
            <p>{todoData.phoneDetailsCount}</p>
          </div>
          <div className="seprate-todo-card">
            <h3>Physical Meeting Count</h3>
            <p>{todoData.physicalMeetingCount}</p>
          </div>
          <div className="seprate-todo-card">
            <h3>Report Count</h3>
            <p>{todoData.reportCount}</p>
          </div>
          <div className="seprate-todo-card">
            <h3>WhatsApp Details Count</h3>
            <p>{todoData.whatsAppDetailsCount}</p>
          </div>
          <div className="seprate-todo-card">
            <h3>To-Do Date</h3>
            <p>{new Date(todoData.toDoDate).toLocaleDateString("en-GB")}</p>
          </div>
        </div>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
}

export default ToDO;
