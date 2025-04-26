import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { FaBell } from "react-icons/fa";
import { MdOutlineDashboard, MdOutlinePersonOutline } from "react-icons/md";

function Dashboard() {
  const [showLogout, setShowLogout] = useState(false);
  const localEmail = JSON.parse(
    localStorage.getItem("mexcargoUserData")
  )?.email;
  const departmentName = JSON.parse(
    localStorage.getItem("mexcargoUserData")
  )?.departmentName;
  const Role = JSON.parse(localStorage.getItem("mexcargoUserData"))?.role;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  function handleShowLogout() {
    setShowLogout(!showLogout);
  }

  function handleLogout() {
    localStorage.removeItem("mexcargoUserData");
    window.location.href = "/login";
  }
  return (
    <div className={styles.dashboard_main_container}>
      <button className={styles.hamburger} onClick={toggleSidebar}>
        ☰
      </button>

      <div
        className={`${styles.dashboard_link_side} ${
          isSidebarOpen ? styles.open : ""
        }`}
      >
        {Role === "Admin" && (
          <>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => setIsSidebarOpen(false)}
            >
              <MdOutlineDashboard /> Dashboard
            </NavLink>
            <NavLink
              to="sales_lead_management"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => setIsSidebarOpen(false)}
            >
              <MdOutlinePersonOutline /> Lead
            </NavLink>
            <NavLink
              to="quotation_sales"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => setIsSidebarOpen(false)}
            >
              <MdOutlinePersonOutline /> Quotation
            </NavLink>
            <NavLink
              to="team_todo_sales"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => setIsSidebarOpen(false)}
            >
              <MdOutlinePersonOutline /> Team ToDo Mark
            </NavLink>
            <NavLink
              to="team_sales"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => setIsSidebarOpen(false)}
            >
              <MdOutlinePersonOutline /> Team
            </NavLink>
            <NavLink
              to="/addmaster"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => setIsSidebarOpen(false)}
            >
              <MdOutlinePersonOutline /> Add Master
            </NavLink>

            <NavLink
              to="/receive_price_from_pricing"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => setIsSidebarOpen(false)}
            >
              <MdOutlinePersonOutline /> Receive price from Pricing Executive
            </NavLink>
            <NavLink
              to="/quatation_slip"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => setIsSidebarOpen(false)}
            >
              <MdOutlinePersonOutline /> Quatation Slip
            </NavLink>
          </>
        )}
        {Role === "Leader" && departmentName === "Sales And Marketing" && (
          <>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => setIsSidebarOpen(false)}
            >
              <MdOutlineDashboard /> Dashboard
            </NavLink>
            <NavLink
              to="sales_lead_management"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => setIsSidebarOpen(false)}
            >
              <MdOutlinePersonOutline /> Lead
            </NavLink>
            <NavLink
              to="quotation_sales"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => setIsSidebarOpen(false)}
            >
              <MdOutlinePersonOutline /> Quotation
            </NavLink>
            <NavLink
              to="team_todo_sales"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => setIsSidebarOpen(false)}
            >
              <MdOutlinePersonOutline /> Team ToDo Mark
            </NavLink>
            <NavLink
              to="team_sales"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => setIsSidebarOpen(false)}
            >
              <MdOutlinePersonOutline /> Team
            </NavLink>
          </>
        )}

        {Role === "Member" && departmentName === "Sales And Marketing" && (
          <>
            <NavLink
              to="sales_lead_management"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => setIsSidebarOpen(false)}
            >
              <MdOutlinePersonOutline /> Lead
            </NavLink>
            <NavLink
              to="team_todo_sales"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => setIsSidebarOpen(false)}
            >
              <MdOutlinePersonOutline /> Team ToDo Mark
            </NavLink>
            <NavLink
              to="quotation_sales"
              className={({ isActive }) => (isActive ? styles.active : "")}
              onClick={() => setIsSidebarOpen(false)}
            >
              <MdOutlinePersonOutline /> Quotation
            </NavLink>
          </>
        )}
        {Role === "Purchase Executive" && departmentName === "Operation" && (
          <NavLink
            to="/perches_executive"
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={() => setIsSidebarOpen(false)}
          >
            <MdOutlinePersonOutline /> Perches Executive
          </NavLink>
        )}

        {Role === "Pricing Executive" && departmentName === "Operation" && (
          <NavLink
            to={"/pricing"}
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={() => setIsSidebarOpen(false)}
          >
            Pricing Executive{" "}
          </NavLink>
        )}

        {Role === "Planning Executive" && departmentName === "Operation" && (
          <NavLink
            to={"/planning"}
            className={({ isActive }) => (isActive ? styles.active : "")}
            onClick={() => setIsSidebarOpen(false)}
          >
            planning{" "}
          </NavLink>
        )}
      </div>

      <div className={styles.dashboard_content_side}>
        <div className={styles.outlet_header}>
          <h2>{departmentName || "Admin DashBoard"}</h2>
          <div className={styles.outlet_header_icon}>
            <p>
              <FaBell />
            </p>
            <div className={styles.logout_container}>
              <p className={styles.email_text} onClick={handleShowLogout}>
                {localEmail}
              </p>
              {showLogout && (
                <button className={styles.logout_button} onClick={handleLogout}>
                  Log Out
                </button>
              )}
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
