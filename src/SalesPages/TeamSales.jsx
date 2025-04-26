import React, { useEffect, useState } from "react";
import styles from "../styles/TeamSales.module.css";
import { BASE_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
function TeamSales() {
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("mexcargoUserData")).token;
  const [refreshKey, setrefreshKey] = useState(0);
  const [employeForm, setEmployeForm] = useState(false);

  // State for department & role selection
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");

  // group create
  const [groupFormShow, setGroupFormShow] = useState(false);
  const [Allleader, setAllLeader] = useState([]);
  const [allMember, setallMember] = useState([]);

  const [groupName, setGroupName] = useState("");
  const [selectedLeader, setSelectedLeader] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const [getAllGroups, setgetAllGroups] = useState([]);
  const [getGroupTableData, setGroupTableData] = useState([]);
  const [GroupId, setGroupId] = useState("");
  const [showChangeLeader, setShowChangeLeader] = useState(false);
  // const [leaderId, setLeaderId] = useState("");
  const [NewLeaderId, setNewLeaderId] = useState("");
  const [gropuEditId, setgropuEditId] = useState("");
  const [showEditGroupForm, setshowEditGroupForm] = useState(false);
  const [newGroupName, setnewGroupName] = useState("");

  const [ShowAddMemberForm, setshowAddMemberForm] = useState(false);
  const [MemberId, setmemberId] = useState([]);
  function handleShowAddEmployeeForm() {
    setEmployeForm(!employeForm);
  }

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const response = await fetch(`${BASE_URL}/department`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("Departments:", data);
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    }
    fetchDepartments();
  }, []);

  // Handle department selection and update roles
  const handleDepartmentChange = (e) => {
    const deptId = e.target.value;
    setSelectedDept(deptId);
    const dept = departments.find((d) => d.departmentId == deptId);
    setRoles(dept ? dept.roleList : []);
    setSelectedRole("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeData = {
      userName: employeeName,
      emailId: employeeEmail,
      mobileNumber: employeeNumber,
      password: employeePassword,
      departmentId: selectedDept,
      roleId: selectedRole,
    };

    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/emp/register`,
        employeeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        alert("Employee added successfully.");
        setrefreshKey(refreshKey + 1);
        setEmployeForm(false);
        setEmployeeName("");
        setEmployeeEmail("");
        setEmployeeNumber("");
        setEmployeePassword("");
        setSelectedDept("");
        setSelectedRole("");
      }
    } catch (error) {
      if (error.status === 409) {
        alert("Head is already created for this department.");
      } else {
        alert("Failed to add employee. Please try again.");
      }
      console.error("Error adding employee:", error.message);
    }
  };

  function handleShowCreateGroup() {
    setGroupFormShow(!groupFormShow);
  }

  useEffect(() => {
    async function getAllLeader() {
      try {
        const response = await axiosInstance.get(
          `${BASE_URL}/available/leader`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("All leader", response.data);
        setAllLeader(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllLeader();
  }, [refreshKey]);

  useEffect(() => {
    async function getAllMember() {
      try {
        const response = await axiosInstance.get(
          `${BASE_URL}/available/member`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("all member", response.data);
        setallMember(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllMember();
  }, [refreshKey]);

  async function handleCreateGroup(e) {
    e.preventDefault();
    const groupData = {
      groupName: groupName,
      leaderId: selectedLeader,
      members: selectedMembers,
    };
    console.log("Group Data:", groupData);
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/created/group`,
        groupData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        alert("Group created successfully.");
        setrefreshKey(refreshKey + 1);
        setGroupFormShow(false);
        setGroupName("");
        setSelectedLeader("");
        setSelectedMembers([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getAllGroup() {
      try {
        const response = await axiosInstance.get(
          `${BASE_URL}/get/groups/name`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Group Name:", response.data);
        setgetAllGroups(response.data);

        handleShowEmployeTable(response.data[0].groupId);
      } catch (error) {
        console.error("Error fetching group name:", error);
      }
    }
    getAllGroup();
  }, [refreshKey]);

  async function handleShowEmployeTable(id) {
    setGroupId(id);
    try {
      const response = await axiosInstance.get(`${BASE_URL}/get/group/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Employee details:", response.data);
      setGroupTableData(response.data);
    } catch (error) {}
  }
  useEffect(() => {
    handleShowEmployeTable();
  }, [refreshKey]);
  function handleViewMemberLead(id) {
    navigate(`/memberlead/${id}`);
  }

  async function handleDeleteMember(id) {
    const deleteMember = window.confirm("Are you sure you want to delete");
    if (!deleteMember) return;
    try {
      const response = await axios.delete(
        `${BASE_URL}/delete/group/${GroupId}/member/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(GroupId);
      console.log(response.data);

      if (response.status === 200) {
        alert(response.data);
        setrefreshKey(refreshKey + 1);
      } else {
        alert("Failed to delete member");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleShiftLeader(id) {
    setShowChangeLeader(true);
  }

  async function handleAddNewLeader(e) {
    e.preventDefault();
    console.log(NewLeaderId);
    console.log(GroupId);
    try {
      const response = await axios.patch(
        `${BASE_URL}/update/group/${GroupId}/leader/${NewLeaderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Leader Changed successfully");
        // window.location.reload();
        setrefreshKey(refreshKey + 1);
        setShowChangeLeader(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteGroup(id) {
    const deleteGroup = window.confirm(
      "Are you sure you want to delete this group"
    );
    if (!deleteGroup) return;
    try {
      const response = await axios.delete(`${BASE_URL}/delete/group/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      if (response.status === 200) {
        alert("Group deleted successfully.");
        setrefreshKey(refreshKey + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEditGroup(id) {
    setgropuEditId(id);
    setshowEditGroupForm(true);
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/get/group/${id}/name`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.groupName);
      setnewGroupName(response.data.groupName);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateGroupName(event) {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `${BASE_URL}/update/group/${gropuEditId}/name?groupName=${encodeURIComponent(
          newGroupName
        )}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Group updated successfully:", response.data);
      if (response.status === 200) {
        alert("Group updated successfully.");
        setrefreshKey(refreshKey + 1);
        setshowEditGroupForm(false);
      }
    } catch (error) {
      console.error(
        "Error updating group:",
        error.response?.data || error.message
      );
    }
  }
  function handleAddMember(id) {
    setGroupId(id);
    setshowAddMemberForm(true);
  }

  async function handleAddNewMember(e) {
    e.preventDefault();

    const formdata = {
      memberIds: MemberId,
    };
    try {
      const response = await axios.patch(
        `${BASE_URL}/group/${GroupId}/add/member`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        alert("Member added successfully");
        setrefreshKey(refreshKey + 1);
        setshowAddMemberForm(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleViewTOdoLeader(LeaderID) {
    navigate(`/todo/${LeaderID}`);
  }

  function handleViewmeberTodo(memberToDOId) {
    navigate(`/todo/${memberToDOId}`);
  }
  return (
    <>
      <div className={styles.team_Sales_search_section}>
        <input
          type="search"
          placeholder="Search employees..."
          className={styles.Team_search_baar}
        />
        <div className={styles.team_sales_add_button}>
          <button onClick={handleShowCreateGroup}> + Create Group</button>
          <button onClick={handleShowAddEmployeeForm}>+ Add Employee</button>
        </div>
      </div>

      {employeForm && (
        <div className={styles.Add_employe_modal_overlay}>
          <div className={styles.Add_employe_modal_content}>
            <button
              className={styles.Add_employe_close_button}
              onClick={() => setEmployeForm(false)}
            >
              ✖
            </button>
            <h2>Add Employee</h2>
            <form onSubmit={handleSubmit} className={styles.Add_employe_form}>
              <input
                type="text"
                placeholder="Employee Name"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                required
                className={styles.Add_employee_input}
              />
              <input
                type="email"
                placeholder="Employee Email"
                value={employeeEmail}
                onChange={(e) => setEmployeeEmail(e.target.value)}
                required
                className={styles.Add_employee_input}
              />
              <input
                type="number"
                placeholder="Employee Number"
                value={employeeNumber}
                onChange={(e) => setEmployeeNumber(e.target.value)}
                required
                className={styles.Add_employee_input}
              />
              <input
                type="password"
                placeholder="Employee Password"
                value={employeePassword}
                onChange={(e) => setEmployeePassword(e.target.value)}
                required
                className={styles.Add_employee_input}
              />

              {/* Department Dropdown */}
              <select
                value={selectedDept}
                onChange={handleDepartmentChange}
                required
                className={styles.Add_employee_select_input}
              >
                <option value="">Select Department</option>

                {departments.length > 0
                  ? departments.map((dept) => {
                      return (
                        <option
                          key={dept.departmentId}
                          value={dept.departmentId}
                        >
                          {dept.departmentName}
                        </option>
                      );
                    })
                  : "no more departments"}
              </select>

              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                required
                className={styles.Add_employee_select_input}
                disabled={!selectedDept}
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role.roleId} value={role.roleId}>
                    {role.roleName}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className={styles.Add_employe_submit_button}
              >
                Add Employee
              </button>
            </form>
          </div>
        </div>
      )}

      {/* create group */}
      {groupFormShow && (
        <div className={styles.create_group_modal_overlay}>
          <div className={styles.create_group_modal_content}>
            <button
              className={styles.create_group_close_button}
              onClick={() => setGroupFormShow(false)}
            >
              ✖
            </button>
            <h2>Create Group</h2>

            <form
              onSubmit={handleCreateGroup}
              className={styles.create_group_form}
            >
              <input
                type="text"
                placeholder="Enter Group Name"
                className={styles.create_group_input_field}
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />

              <select
                className={styles.create_group_select_field}
                value={selectedLeader}
                onChange={(e) => setSelectedLeader(e.target.value)}
              >
                <option value="">Select Leader</option>

                {Allleader.length > 0 ? (
                  Allleader.map((leader) => (
                    <option key={leader.empId} value={leader.userId}>
                      {leader.userName}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No leader found
                  </option>
                )}
              </select>

              <select
                className={styles.create_group_select_field}
                multiple
                value={selectedMembers}
                onChange={(e) =>
                  setSelectedMembers(
                    [...e.target.selectedOptions].map((opt) => opt.value)
                  )
                }
              >
                <option value="" disabled>
                  Select Members (Min: 2)
                </option>

                {allMember.length > 0 ? (
                  allMember.map((member) => (
                    <option key={member.userId} value={member.userId}>
                      {member.userName}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No members found
                  </option>
                )}
              </select>

              <button
                className={styles.create_group_submit_button}
                disabled={!selectedLeader || selectedMembers.length < 2}
              >
                Create Group
              </button>
            </form>
          </div>
        </div>
      )}

      <div className={styles.allGroupContainer}>
        {getAllGroups.length > 0 ? (
          getAllGroups.map((item) => (
            <div key={item.groupId} className={styles.groupCard}>
              <h3 className={styles.groupName}>{item.groupName}</h3>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.viewButton}
                  onClick={() => handleShowEmployeTable(item.groupId)}
                >
                  View
                </button>
                <button
                  className={styles.editButton}
                  onClick={() => handleEditGroup(item.groupId)}
                >
                  Edit
                </button>

                <button
                  className={styles.editButton}
                  onClick={() => handleAddMember(item.groupId)}
                >
                  {" "}
                  Add Member
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteGroup(item.groupId)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noGroups}>No Groups Available</p>
        )}
      </div>

      <div className={styles.teamSales_table_container}>
        <table className={styles.teamSales_group_table}>
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>EMP Name</th>
              <th>Email</th>
              <th>Mobile No.</th>
              <th>Password</th>
              <th>Position</th>
              <th>To-Do List</th>
              <th>Lead</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {getGroupTableData && getGroupTableData.leader ? (
              <>
                {/* Leader Row */}
                <tr
                  key={getGroupTableData.leader?.id}
                  className={styles.leader_row}
                >
                  <td>{getGroupTableData.leader?.id || "N/A"}</td>
                  <td>{getGroupTableData.leader?.name || "N/A"}</td>
                  <td>{getGroupTableData.leader?.email || "N/A"}</td>
                  <td>{getGroupTableData.leader?.number || "N/A"}</td>
                  <td>{getGroupTableData.leader?.password || "N/A"}</td>
                  <td>{getGroupTableData.leader?.role || "N/A"}</td>
                  <td>
                    <button
                      className={styles.teamSales_group_table_view_button}
                      onClick={() =>
                        handleViewTOdoLeader(getGroupTableData.leader?.id)
                      }
                    >
                      TO Do View
                    </button>
                  </td>
                  <td>
                    <button
                      className={styles.teamSales_group_table_view_button}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <button
                      className={styles.teamSales_group_table_view_button}
                      onClick={() =>
                        handleShiftLeader(getGroupTableData.leader?.id)
                      }
                    >
                      shift Leader
                    </button>
                  </td>
                </tr>

                {/* Member Rows */}
                {getGroupTableData.memberList &&
                getGroupTableData.memberList.length > 0 ? (
                  getGroupTableData.memberList.map((member) => (
                    <tr key={member?.id} className={styles.member_row}>
                      <td>{member?.id || "N/A"}</td>
                      <td>{member?.name || "N/A"}</td>
                      <td>{member?.email || "N/A"}</td>
                      <td>{member?.number || "N/A"}</td>
                      <td>{member?.password || "N/A"}</td>
                      <td>{member?.role || "N/A"}</td>
                      <td>
                        <button
                          className={styles.teamSales_group_table_view_button}
                          onClick={() => handleViewmeberTodo(member?.id)}
                        >
                          TO Do View
                        </button>
                      </td>
                      <td>
                        <button
                          className={styles.teamSales_group_table_view_button}
                          onClick={() => handleViewMemberLead(member?.id)}
                        >
                          Lead View
                        </button>
                      </td>
                      <td>
                        <button
                          className={styles.teamSales_group_table_delete_button}
                          onClick={() => handleDeleteMember(member?.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className={styles.no_data}>
                      No members available
                    </td>
                  </tr>
                )}
              </>
            ) : (
              <tr>
                <td colSpan="9" className={styles.no_data}>
                  No employee data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showChangeLeader && (
        <div className={styles.change_leader_popup_overlay}>
          <div className={styles.change_leader_popup_content}>
            <button
              onClick={() => setShowChangeLeader(false)}
              className={styles.close_change_leader_form}
            >
              ✖
            </button>
            <form
              className={styles.change_leader_form}
              onSubmit={handleAddNewLeader}
            >
              <h2 className={styles.change_leader_form_title}>Change Leader</h2>

              <select
                name="leader"
                id="leader"
                className={styles.change_leader_form_select}
                value={NewLeaderId}
                onChange={(e) => setNewLeaderId(e.target.value)}
              >
                <option value="">Select Leader</option>
                {Allleader.length > 0 ? (
                  Allleader.map((member) => (
                    <option key={member.userId} value={member.userId}>
                      {member.userName}
                    </option>
                  ))
                ) : (
                  <option disabled>No Leader Available</option>
                )}
              </select>

              <button
                type="submit"
                className={styles.change_leader_form_submit_button}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {showEditGroupForm && (
        <div className={styles.edit_groupName_overlay}>
          <div className={styles.edit_groupName_modal}>
            <button
              onClick={() => setshowEditGroupForm(false)}
              className={styles.edit_groupName_close}
            >
              ✖
            </button>
            <h2 className={styles.edit_groupName_title}>Edit Group Name</h2>
            <form
              onSubmit={handleUpdateGroupName}
              className={styles.edit_groupName_form}
            >
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setnewGroupName(e.target.value)}
                className={styles.edit_groupName_form_input}
                placeholder="Enter new group name"
              />
              <button
                type="submit"
                className={styles.edit_groupName_form_submit_button}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {ShowAddMemberForm && (
        <div className={styles.add_memberContainer}>
          <div className={styles.add_memberModal}>
            <div className={styles.add_memberHeader}>
              <h3>Add New Member</h3>
              <button
                className={styles.add_memberCloseButton}
                onClick={() => setshowAddMemberForm(false)}
              >
                ×
              </button>
            </div>
            <form
              className={styles.add_memberForm}
              onSubmit={handleAddNewMember}
            >
              {allMember.length > 0 ? (
                <select
                  className={styles.add_member_form_select}
                  value={MemberId}
                  multiple
                  onChange={(e) =>
                    setmemberId(
                      Array.from(e.target.selectedOptions, (opt) => opt.value)
                    )
                  }
                >
                  <option value="">Select Member</option>
                  {allMember.map((member, index) => (
                    <option key={index} value={member.userId}>
                      {member.userName}
                    </option>
                  ))}
                </select>
              ) : (
                <p>No Member Available</p>
              )}
              <button className={styles.add_member_submit_button}>
                Add Member
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default TeamSales;
