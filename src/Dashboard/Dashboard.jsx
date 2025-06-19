// import React, { useState } from "react";
// import { NavLink, Outlet } from "react-router-dom";
// import styles from "./Dashboard.module.css";
// import { FaBell } from "react-icons/fa";
// import { MdOutlineDashboard, MdOutlinePersonOutline } from "react-icons/md";

// function Dashboard() {
//   const [showLogout, setShowLogout] = useState(false);
//   const localEmail = JSON.parse(
//     localStorage.getItem("mexcargoUserData")
//   )?.email;
//   const departmentName = JSON.parse(
//     localStorage.getItem("mexcargoUserData")
//   )?.departmentName;
//   const Role = JSON.parse(localStorage.getItem("mexcargoUserData"))?.role;

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   function handleShowLogout() {
//     setShowLogout(!showLogout);
//   }

//   function handleLogout() {
//     localStorage.removeItem("mexcargoUserData");
//     window.location.href = "/login";
//   }
//   return (
//     <div className={styles.dashboard_main_container}>
//       <button className={styles.hamburger} onClick={toggleSidebar}>
//         ☰
//       </button>

//       <div
//         className={`${styles.dashboard_link_side} ${
//           isSidebarOpen ? styles.open : ""
//         }`}
//       >
//         {Role === "Admin" && (
//           <>
//             <h3> Mex Cargo</h3>
//             <NavLink
//               to="/"
//               end
//               className={({ isActive }) => (isActive ? styles.active : "")}
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <MdOutlineDashboard /> Dashboard
//             </NavLink>
//             <NavLink
//               to="sales_lead_management"
//               className={({ isActive }) => (isActive ? styles.active : "")}
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <MdOutlinePersonOutline /> Lead
//             </NavLink>
//             <NavLink
//               to="quotation_sales"
//               className={({ isActive }) => (isActive ? styles.active : "")}
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <MdOutlinePersonOutline /> Quotation
//             </NavLink>
//             <NavLink
//               to="team_todo_sales"
//               className={({ isActive }) => (isActive ? styles.active : "")}
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <MdOutlinePersonOutline /> Team ToDo Mark
//             </NavLink>
//             <NavLink
//               to="team_sales"
//               className={({ isActive }) => (isActive ? styles.active : "")}
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <MdOutlinePersonOutline /> Team
//             </NavLink>
//             <NavLink
//               to="/addmaster"
//               className={({ isActive }) => (isActive ? styles.active : "")}
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <MdOutlinePersonOutline /> Add Master
//             </NavLink>

//             <NavLink
//               to="/receive_price_from_pricing"
//               className={({ isActive }) => (isActive ? styles.active : "")}
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <MdOutlinePersonOutline /> Receive price from Pricing Executive
//             </NavLink>
//             <NavLink
//               to="/quatation_slip"
//               className={({ isActive }) => (isActive ? styles.active : "")}
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <MdOutlinePersonOutline /> Quatation Slip
//             </NavLink>
//           </>
//         )}
//         {Role === "Leader" && departmentName === "Sales And Marketing" && (
//           <>
//             <NavLink
//               to="/"
//               end
//               className={({ isActive }) => (isActive ? styles.active : "")}
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <MdOutlineDashboard /> Dashboard
//             </NavLink>
//             <NavLink
//               to="sales_lead_management"
//               className={({ isActive }) => (isActive ? styles.active : "")}
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <MdOutlinePersonOutline /> Lead
//             </NavLink>
//             <NavLink
//               to="quotation_sales"
//               className={({ isActive }) => (isActive ? styles.active : "")}
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <MdOutlinePersonOutline /> Quotation
//             </NavLink>
//             <NavLink
//               to="team_todo_sales"
//               className={({ isActive }) => (isActive ? styles.active : "")}
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <MdOutlinePersonOutline /> Team ToDo Mark
//             </NavLink>
//             <NavLink
//               to="team_sales"
//               className={({ isActive }) => (isActive ? styles.active : "")}
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <MdOutlinePersonOutline /> Team
//             </NavLink>
//           </>
//         )}

//         {Role === "Member" && departmentName === "Sales And Marketing" && (
//           <>
//             <NavLink
//               to="sales_lead_management"
//               className={({ isActive }) => (isActive ? styles.active : "")}
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <MdOutlinePersonOutline /> Lead
//             </NavLink>
//             <NavLink
//               to="team_todo_sales"
//               className={({ isActive }) => (isActive ? styles.active : "")}
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <MdOutlinePersonOutline /> Team ToDo Mark
//             </NavLink>
//             <NavLink
//               to="quotation_sales"
//               className={({ isActive }) => (isActive ? styles.active : "")}
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               <MdOutlinePersonOutline /> Quotation
//             </NavLink>
//           </>
//         )}
//         {Role === "Purchase Executive" && departmentName === "Operation" && (
//           <NavLink
//             to="/perches_executive"
//             className={({ isActive }) => (isActive ? styles.active : "")}
//             onClick={() => setIsSidebarOpen(false)}
//           >
//             <MdOutlinePersonOutline /> Purches Executive
//           </NavLink>
//         )}

//         {Role === "Pricing Executive" && departmentName === "Operation" && (
//           <NavLink
//             to={"/pricing"}
//             className={({ isActive }) => (isActive ? styles.active : "")}
//             onClick={() => setIsSidebarOpen(false)}
//           >
//             Pricing Executive{" "}
//           </NavLink>
//         )}

//         {Role === "Planning Executive" && departmentName === "Operation" && (
//           <NavLink
//             to={"/planning"}
//             className={({ isActive }) => (isActive ? styles.active : "")}
//             onClick={() => setIsSidebarOpen(false)}
//           >
//             Planning
//           </NavLink>
//         )}
//         {Role === "Project Executive" && departmentName === "Operation" && (
//           <NavLink
//             to={"/project"}
//             className={({ isActive }) => (isActive ? styles.active : "")}
//             onClick={() => setIsSidebarOpen(false)}
//           >
//             Project
//           </NavLink>
//         )}
//       </div>

//       <div className={styles.dashboard_content_side}>
//         <div className={styles.outlet_header}>
//           <h2>{departmentName || "Admin DashBoard"}</h2>
//           <div className={styles.outlet_header_icon}>
//             <p>
//               <FaBell />
//             </p>
//             <div className={styles.logout_container}>
//               <p className={styles.email_text} onClick={handleShowLogout}>
//                 {localEmail}
//               </p>
//               {showLogout && (
//                 <button className={styles.logout_button} onClick={handleLogout}>
//                   Log Out
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

"use client";

import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { FaBell, FaUser, FaChevronDown } from "react-icons/fa";
import {
  MdOutlineDashboard,
  MdOutlinePersonOutline,
  MdLeaderboard,
  MdQuote,
  MdGroup,
  MdAdd,
  MdPriceCheck,
  MdReceipt,
  MdShoppingCart,
  MdSchedule,
  MdWork,
  MdClose,
  MdMenu,
} from "react-icons/md";
import { MdFormatQuote } from "react-icons/md";

function Dashboard() {
  const [showLogout, setShowLogout] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const localEmail = JSON.parse(
    localStorage.getItem("mexcargoUserData")
  )?.email;
  const departmentName = JSON.parse(
    localStorage.getItem("mexcargoUserData")
  )?.departmentName;
  const Role = JSON.parse(localStorage.getItem("mexcargoUserData"))?.role;

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

  const getNavIcon = (path) => {
    const iconMap = {
      "/": <MdOutlineDashboard />,
      sales_lead_management: <MdLeaderboard />,
      quotation_sales: <MdFormatQuote />,

      team_todo_sales: <MdSchedule />,
      team_sales: <MdGroup />,
      "/addmaster": <MdAdd />,
      "/receive_price_from_pricing": <MdPriceCheck />,
      "/quatation_slip": <MdReceipt />,
      "/perches_executive": <MdShoppingCart />,
      "/pricing": <MdPriceCheck />,
      "/planning": <MdSchedule />,
      "/project": <MdWork />,
    };
    return iconMap[path] || <MdOutlinePersonOutline />;
  };

  return (
    <div className={styles.dashboard_main_container}>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div className={styles.overlay} onClick={toggleSidebar}></div>
      )}

      {/* Mobile Header */}
      <div className={styles.mobile_header}>
        <button className={styles.hamburger} onClick={toggleSidebar}>
          {isSidebarOpen ? <MdClose /> : <MdMenu />}
        </button>
        <div className={styles.mobile_logo}>
          <h3>Mex Cargo</h3>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`${styles.dashboard_link_side} ${
          isSidebarOpen ? styles.open : ""
        }`}
      >
        <div className={styles.sidebar_header}>
          <div className={styles.logo_container}>
            <div className={styles.logo_icon}>MX</div>
            <h3 className={styles.logo_text}>Mex Cargo</h3>
          </div>
        </div>

        <nav className={styles.sidebar_nav}>
          {Role === "Admin" && (
            <>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `${styles.nav_link} ${isActive ? styles.active : ""}`
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                {getNavIcon("/")}
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                to="sales_lead_management"
                className={({ isActive }) =>
                  `${styles.nav_link} ${isActive ? styles.active : ""}`
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                {getNavIcon("sales_lead_management")}
                <span>Lead Management</span>
              </NavLink>
              <NavLink
                to="quotation_sales"
                className={({ isActive }) =>
                  `${styles.nav_link} ${isActive ? styles.active : ""}`
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                {getNavIcon("quotation_sales")}
                <span>Quotations</span>
              </NavLink>
              <NavLink
                to="team_todo_sales"
                className={({ isActive }) =>
                  `${styles.nav_link} ${isActive ? styles.active : ""}`
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                {getNavIcon("team_todo_sales")}
                <span>Team ToDo</span>
              </NavLink>
              <NavLink
                to="team_sales"
                className={({ isActive }) =>
                  `${styles.nav_link} ${isActive ? styles.active : ""}`
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                {getNavIcon("team_sales")}
                <span>Team Management</span>
              </NavLink>
              <NavLink
                to="/addmaster"
                className={({ isActive }) =>
                  `${styles.nav_link} ${isActive ? styles.active : ""}`
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                {getNavIcon("/addmaster")}
                <span>Add Master</span>
              </NavLink>
              <NavLink
                to="/receive_price_from_pricing"
                className={({ isActive }) =>
                  `${styles.nav_link} ${isActive ? styles.active : ""}`
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                {getNavIcon("/receive_price_from_pricing")}
                <span>Pricing Updates</span>
              </NavLink>
              <NavLink
                to="/quatation_slip"
                className={({ isActive }) =>
                  `${styles.nav_link} ${isActive ? styles.active : ""}`
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                {getNavIcon("/quatation_slip")}
                <span>Quotation Slip</span>
              </NavLink>
            </>
          )}

          {Role === "Leader" && departmentName === "Sales And Marketing" && (
            <>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `${styles.nav_link} ${isActive ? styles.active : ""}`
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                {getNavIcon("/")}
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                to="sales_lead_management"
                className={({ isActive }) =>
                  `${styles.nav_link} ${isActive ? styles.active : ""}`
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                {getNavIcon("sales_lead_management")}
                <span>Lead Management</span>
              </NavLink>
              <NavLink
                to="quotation_sales"
                className={({ isActive }) =>
                  `${styles.nav_link} ${isActive ? styles.active : ""}`
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                {getNavIcon("quotation_sales")}
                <span>Quotations</span>
              </NavLink>
              <NavLink
                to="team_todo_sales"
                className={({ isActive }) =>
                  `${styles.nav_link} ${isActive ? styles.active : ""}`
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                {getNavIcon("team_todo_sales")}
                <span>Team ToDo</span>
              </NavLink>
              <NavLink
                to="team_sales"
                className={({ isActive }) =>
                  `${styles.nav_link} ${isActive ? styles.active : ""}`
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                {getNavIcon("team_sales")}
                <span>Team Management</span>
              </NavLink>
            </>
          )}

          {Role === "Member" && departmentName === "Sales And Marketing" && (
            <>
              <NavLink
                to="sales_lead_management"
                className={({ isActive }) =>
                  `${styles.nav_link} ${isActive ? styles.active : ""}`
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                {getNavIcon("sales_lead_management")}
                <span>Lead Management</span>
              </NavLink>
              <NavLink
                to="team_todo_sales"
                className={({ isActive }) =>
                  `${styles.nav_link} ${isActive ? styles.active : ""}`
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                {getNavIcon("team_todo_sales")}
                <span>Team ToDo</span>
              </NavLink>
              <NavLink
                to="quotation_sales"
                className={({ isActive }) =>
                  `${styles.nav_link} ${isActive ? styles.active : ""}`
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                {getNavIcon("quotation_sales")}
                <span>Quotations</span>
              </NavLink>
            </>
          )}

          {Role === "Purchase Executive" && departmentName === "Operation" && (
            <NavLink
              to="/perches_executive"
              className={({ isActive }) =>
                `${styles.nav_link} ${isActive ? styles.active : ""}`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              {getNavIcon("/perches_executive")}
              <span>Purchase Executive</span>
            </NavLink>
          )}

          {Role === "Pricing Executive" && departmentName === "Operation" && (
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `${styles.nav_link} ${isActive ? styles.active : ""}`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              {getNavIcon("/pricing")}
              <span>Pricing Executive</span>
            </NavLink>
          )}

          {Role === "Planning Executive" && departmentName === "Operation" && (
            <NavLink
              to="/planning"
              className={({ isActive }) =>
                `${styles.nav_link} ${isActive ? styles.active : ""}`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              {getNavIcon("/planning")}
              <span>Planning</span>
            </NavLink>
          )}

          {Role === "Project Executive" && departmentName === "Operation" && (
            <NavLink
              to="/project"
              className={({ isActive }) =>
                `${styles.nav_link} ${isActive ? styles.active : ""}`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              {getNavIcon("/project")}
              <span>Project</span>
            </NavLink>
          )}
        </nav>
      </div>

      {/* Main Content */}
      <div className={styles.dashboard_content_side}>
        <header className={styles.outlet_header}>
          <div className={styles.header_left}>
            <h2 className={styles.department_title}>
              {departmentName || "Admin Dashboard"}
            </h2>
          </div>

          <div className={styles.header_right}>
            {/* <div className={styles.notification_container}>
              <button className={styles.notification_btn}>
                <FaBell />
                <span className={styles.notification_badge}>3</span>
              </button>
            </div> */}

            <div className={styles.user_menu}>
              <div className={styles.user_info} onClick={handleShowLogout}>
                <div className={styles.user_avatar}>
                  <FaUser />
                </div>
                <div className={styles.user_details}>
                  <span className={styles.user_email}>{localEmail}</span>
                  <span className={styles.user_role}>{Role}</span>
                </div>
                <FaChevronDown
                  className={`${styles.dropdown_icon} ${
                    showLogout ? styles.rotated : ""
                  }`}
                />
              </div>

              {showLogout && (
                <div className={styles.dropdown_menu}>
                  <button
                    className={styles.logout_button}
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className={styles.main_content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
