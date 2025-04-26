import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import styles from "../styles/MemberLeads.module.css";
import axiosInstance from "../utils/axiosInstance";
function MemberLead() {
  const token = JSON.parse(localStorage.getItem("mexcargoUserData")).token;
  const { id } = useParams();
  const pageSize = 10;
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    async function getMemberLead() {
      try {
        const response = await axiosInstance.get(
          `${BASE_URL}/get/currentuser/lead?userId=${id}&page=${page}&size=${pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Member Lead", response.data);
        setLeads(response.data.content || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.log(error);
      }
    }
    getMemberLead();
  }, [page, id]);

  return (
    <div className={styles.member_lead_table_container}>
      {/* <h2>Member Leads</h2> */}
      <table className={styles.member_lead_table}>
        <thead>
          <tr>
            <th>Lead ID</th>
            <th>Reference No</th>
            <th>Lead Date</th>
            <th>Lead Time</th>
            <th>Mode of Communication</th>
            <th>Way of Lead</th>
          </tr>
        </thead>
        <tbody>
          {leads.length > 0 ? (
            leads.map((lead) => (
              <tr key={lead.leadId}>
                <td>{lead.leadId}</td>
                <td>{lead.leadReferenceNo}</td>
                <td>{lead.leadDate}</td>
                <td>{lead.leadTime}</td>
                <td>{lead.modeOfCommunication}</td>
                <td>{lead.wayOfLead}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className={styles.no_data}>
                No leads available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className={styles.pagination}>
        <button
          disabled={page === 0}
          onClick={() => setPage((prev) => prev - 1)}
          className={page === 0 ? styles.disabledButton : ""}
        >
          ⬅ Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index)}
            className={page === index ? styles.activePage : ""}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className={page + 1 >= totalPages ? styles.disabledButton : ""}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}

export default MemberLead;
