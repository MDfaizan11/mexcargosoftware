import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
import styles from "../styles/TeamTodoDetail.module.css";
import axiosInstance from "../utils/axiosInstance";
function PhoneDetail() {
  const { id } = useParams();
  const token = JSON.parse(localStorage.getItem("mexcargoUserData"))?.token;
  const [phoneDetail, setPhoneDetail] = useState([]);

  useEffect(() => {
    async function getPhoneDetail() {
      try {
        const response = await axiosInstance.get(
          `${BASE_URL}/get/todo/${id}/phone/details`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setPhoneDetail(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getPhoneDetail();
  }, [id, token]);

  return (
    <>
      <div className={styles.phone_container}>
        <h2 className={styles.phone_title}>Phone Details</h2>
        <div className={styles.phone_table_wrapper}>
          <table className={styles.phone_detail_table}>
            <thead>
              <tr>
                <th className={styles.phone_table_header}>Name</th>
                <th className={styles.phone_table_header}>Phone Number</th>
                <th className={styles.phone_table_header}>Phone Time</th>
              </tr>
            </thead>
            <tbody>
              {phoneDetail.length > 0 ? (
                phoneDetail.map((item) => (
                  <tr key={item.phoneId} className={styles.phone_table_row}>
                    <td className={styles.phone_table_data}>{item.name}</td>
                    <td className={styles.phone_table_data}>
                      {item.phoneNumber}
                    </td>
                    <td className={styles.phone_table_data}>
                      {item.phoneTime}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className={styles.phone_no_data}>
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default PhoneDetail;
