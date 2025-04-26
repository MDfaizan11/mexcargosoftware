import { useEffect, useState } from "react";
import Styles from "../styles/TeamToDo.module.css";
import axios from "axios";
import { BASE_URL } from "../config";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
function TeamTodoSales() {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("mexcargoUserData"))?.token;
  const userId = JSON.parse(localStorage.getItem("mexcargoUserData"))?.userId;
  const [refreshKey, setrefreshKey] = useState(0);
  const [teamToDoTableData, setteamToDoTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const [count, setCount] = useState(0);
  const [SelectedName, setSelectedName] = useState("");
  const [showAddRemarkPopUp, setshowAddRemarkPopUp] = useState(false);
  const [showPhonePopUp, setshowPhonePopUp] = useState(false);
  const [showEmailPopUp, setshowEmailPopUp] = useState(false);
  const [showWhatsappPopUp, setshowWhatsappPopUp] = useState(false);
  const [showPhysicalPopUp, setshowPhysicalPopUp] = useState(false);
  const [showNetSearchingPopUp, setshowNetSearchingPopUp] = useState(false);
  const [showMeetingPopUp, setshowMeetingPopUp] = useState(false);
  const [showReportPopUp, setshowReportPopUp] = useState(false);
  const [showMiscellaneousPopUp, setshowMiscellaneousPopUp] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneTime, setPhoneTime] = useState("");
  const [Emailname, setEmailname] = useState("");
  const [Email, setEmail] = useState("");
  const [emailTime, setEmailTime] = useState("");
  const [WhatappName, setWhatappName] = useState("");
  const [whatappNumber, setWhatappNumber] = useState("");
  const [WhatappTime, setWhatappTime] = useState("");
  const [physicalName, setPhysicalName] = useState("");
  const [physicalLocation, setPhysicalLocation] = useState("");
  const [physicalTime, setPhysicalTime] = useState("");
  const [netSearchingName, setNetSearchingName] = useState("");
  const [netSearchingTime, setNetSearchingTime] = useState("");
  const [meetingName, setMeetingName] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [reportName, setReportName] = useState("");
  const [reportTime, setReportTime] = useState("");
  const [miscellaneousName, setMiscellaneousName] = useState("");
  const [miscellaneousTime, setMiscellaneousTime] = useState("");
  const [todoTableId, setTodoTableId] = useState(null);

  const [showPhoneDetailcard, setshowPhoneDetailcard] = useState(false);
  const [phoneDetaildata, setPhoneDetailsdata] = useState([]);
  const [EmailDetailcardShow, setEmailDetailcardShow] = useState(false);
  const [emailDetailcarddata, setemailDetailcarddata] = useState([]);
  const [whatappDetailcardShow, setwhatappDetailcardShow] = useState(false);
  const [whatappDetailcardData, setwhatappDetailcardData] = useState([]);
  const [meetingDetailCardShow, setmeetingDetailCardShow] = useState(false);
  const [meetingDetailCardData, setmeetingDetailCardData] = useState([]);
  const [physicalmeetingCardShow, setphysicalmeetingCardShow] = useState(false);
  const [physicalmeetingCardData, setphysicalmeetingCardData] = useState([]);
  const [netSearchingDetailcardShow, setnetSearchingDetailcardShow] =
    useState(false);
  const [netSearchingCardData, setnetSearchingCardData] = useState([]);
  const [miscellaneousDetailcardShow, setmiscellaneousDetailcardShow] =
    useState(false);
  const [miscellaneousDetailcardData, setmiscellaneousDetailcardData] =
    useState([]);
  const [reportDetailcardShow, setreportDetailcardShow] = useState(false);
  const [reportDetailcardData, setreportDetailcardData] = useState([]);

  useEffect(() => {
    async function getTeamTodoTable(page = 0) {
      try {
        const response = await axiosInstance.get(
          `${BASE_URL}/get/todoentity/count/list?userId=${userId}&page=${page}&size=${pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setteamToDoTableData(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getTeamTodoTable(currentPage);
  }, [userId, token, currentPage, refreshKey]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  function handleShowAddremark() {
    setshowAddRemarkPopUp(!showAddRemarkPopUp);
  }

  function handleShowAddremarkPhone(name) {
    alert(name);
    setSelectedName(name);
    setshowPhonePopUp(!showPhonePopUp);
    setshowEmailPopUp(false);
    setshowWhatsappPopUp(false);
    setEmailDetailcardShow(false);
    closeOtherPopups("phone");
  }

  function handleShowAddremarkEmail(name) {
    alert(name);
    setSelectedName(name);
    setshowEmailPopUp(true);
    setshowPhonePopUp(false);
    setshowWhatsappPopUp(false);
    closeOtherPopups("email");
  }

  function handleShowAddremarkWhatsapp(name) {
    setSelectedName(name);
    setshowWhatsappPopUp(!showWhatsappPopUp);
    setshowEmailPopUp(false);
    setshowPhonePopUp(false);
    closeOtherPopups("whatsapp");
  }

  function handleShowAddremarkPhysical(name) {
    alert(name);
    setSelectedName(name);
    setshowPhysicalPopUp(!showPhysicalPopUp);
    setshowPhonePopUp(false);
    setshowEmailPopUp(false);
    setshowWhatsappPopUp(false);
    setshowNetSearchingPopUp(false);
    closeOtherPopups("physical");
  }

  function handleShowAddremarkNetSearching(name) {
    alert(name);
    setSelectedName(name);
    setshowNetSearchingPopUp(!showNetSearchingPopUp);
    setshowPhonePopUp(false);
    setshowEmailPopUp(false);
    setshowWhatsappPopUp(false);
    setshowPhysicalPopUp(false);
    setshowMeetingPopUp(false);
    closeOtherPopups("netSearching");
  }

  function handleShowAddremarkMeeting(name) {
    alert(name);
    setSelectedName(name);
    closeOtherPopups("meeting");
    setshowMeetingPopUp(!showMeetingPopUp);
    setshowPhonePopUp(false);
    setshowEmailPopUp(false);
    setshowWhatsappPopUp(false);
    setshowPhysicalPopUp(false);
    setshowNetSearchingPopUp(false);
    setshowReportPopUp(false);
  }

  function handleShowAddremarkReport(name) {
    alert(name);
    setSelectedName(name);
    setshowReportPopUp(!showReportPopUp);
    setshowPhonePopUp(false);
    setshowEmailPopUp(false);
    setshowWhatsappPopUp(false);
    setshowPhysicalPopUp(false);
    setshowNetSearchingPopUp(false);
    setshowMeetingPopUp(false);
    closeOtherPopups("report");
    setshowMiscellaneousPopUp(false);
  }

  function handleShowAddremarkMiscellaneous(name) {
    setSelectedName(name);
    setshowMiscellaneousPopUp(!showMiscellaneousPopUp);
    closeOtherPopups("miscellaneous");
    setshowPhonePopUp(false);
    setshowEmailPopUp(false);
    setshowWhatsappPopUp(false);
    setshowPhysicalPopUp(false);
    setshowNetSearchingPopUp(false);
    setshowMeetingPopUp(false);
    setshowReportPopUp(false);
  }

  function closeOtherPopups(openPopup) {
    const popups = {
      phone: setshowPhonePopUp,
      email: setshowEmailPopUp,
      whatsapp: setshowWhatsappPopUp,
      physical: setshowPhysicalPopUp,
      netSearching: setshowNetSearchingPopUp,
      meeting: setshowMeetingPopUp,
      report: setshowReportPopUp,
      miscellaneous: setshowMiscellaneousPopUp,
    };

    Object.entries(popups).forEach(([key, setter]) => {
      if (key !== openPopup) setter(false);
    });
  }

  useEffect(() => {
    if (SelectedName) {
      fetchData(SelectedName);
    }
  }, [SelectedName, refreshKey]);

  async function fetchData(name) {
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/get/todoentity/${name}/currentdate/count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API Response:", response.data.count);
      setCount(response.data.count);
    } catch (error) {
      console.error("API Error:", error);
    }
  }

  async function handlePhoneSubmit(e) {
    e.preventDefault();

    const data = [
      {
        name: name,
        phoneNumber: phoneNumber,
        phoneTime: phoneTime,
      },
    ];
    try {
      const response = await axios.post(
        `${BASE_URL}/add/phone/details?counter=${count + 1}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Phone added successfully:", response.data);
      if (response.status === 200) {
        alert("Phone added successfully");
        setshowPhoneDetailcard(false);
        setEmailDetailcardShow(false);
        setName("");
        setPhoneNumber("");
        setPhoneTime("");
        setrefreshKey((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddEmail(e) {
    e.preventDefault();
    const data = [
      {
        name: Emailname,
        email: Email,
        emailTime: emailTime,
      },
    ];
    try {
      const response = await axios.post(
        `${BASE_URL}/add/email/details?counter=${count + 1}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Email added successfully:", response.data);
      if (response.status === 200) {
        alert("Email added successfully");
        setEmailname("");
        setEmail("");
        setEmailTime("");
        setrefreshKey((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddWhatAppDetail(e) {
    e.preventDefault();
    const data = [
      {
        name: WhatappName,
        whatsAppNumber: whatappNumber,
        whatsAppTime: WhatappTime,
      },
    ];
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/add/whatsApp/details?counter=${count + 1}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Whatsapp added successfully:", response.data);
      if (response.status === 200) {
        alert("Whatsapp added successfully");
        setWhatappName("");
        setWhatappNumber("");
        setWhatappTime("");
        setrefreshKey((prev) => prev + 1);
        setshowWhatsappPopUp(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddPhysicalDetail(e) {
    e.preventDefault();
    const data = [
      {
        name: physicalName,
        location: physicalLocation,
        meetingTime: physicalTime,
      },
    ];
    try {
      const response = await axiosInstance.post(
        `${BASE_URL}/add/physicalmeeting/details?counter=${count + 1}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Physical added successfully:", response.data);
      if (response.status === 200) {
        alert("Physical added successfully");
        setPhysicalName("");
        setPhysicalLocation("");
        setPhysicalTime("");
        setrefreshKey((prev) => prev + 1);
        setshowPhysicalPopUp(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddNetSearching(e) {
    e.preventDefault();
    const data = [
      {
        name: netSearchingName,
        time: netSearchingTime,
      },
    ];
    try {
      const response = await axios.post(
        `${BASE_URL}/add/netsearching/details?counter=${count + 1}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Net searching added successfully");
        setNetSearchingName("");
        setNetSearchingTime("");
        setrefreshKey((prev) => prev + 1);
        setshowNetSearchingPopUp(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddMeeting(e) {
    e.preventDefault();
    const data = [
      {
        name: meetingName,
        meetingTime: meetingTime,
      },
    ];
    try {
      const response = await axios.post(
        `${BASE_URL}/add/meeting/details?counter=${count + 1}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Meeting added successfully");
        setMeetingName("");
        setMeetingTime("");
        setrefreshKey((prev) => prev + 1);
        setshowMeetingPopUp(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function handleAddReport(e) {
    e.preventDefault();
    const data = [
      {
        name: reportName,
        reportTime: reportTime,
      },
    ];
    try {
      const response = await axios.post(
        `${BASE_URL}/add/report/details?counter=${count + 1}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Report added successfully");
        setReportName("");
        setReportTime("");
        setrefreshKey((prev) => prev + 1);
        setshowReportPopUp(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function handleAddMiscellaneous(e) {
    e.preventDefault();
    const data = [
      {
        taskName: miscellaneousName,
        taskTime: miscellaneousTime,
      },
    ];
    try {
      const response = await axios.post(
        `${BASE_URL}/add/miscellaneous/details?counter=${count + 1}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Miscellaneous added successfully");
        setMiscellaneousName("");
        setMiscellaneousTime("");
        setrefreshKey((prev) => prev + 1);
        setshowMiscellaneousPopUp(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePhoneDetail(id) {
    setTodoTableId(id);
    setshowPhoneDetailcard(true);
    setEmailDetailcardShow(false);
    setwhatappDetailcardShow(false);
    setmeetingDetailCardShow(false);
    setphysicalmeetingCardShow(false);
    setnetSearchingDetailcardShow(false);
    setmiscellaneousDetailcardShow(false);
    setreportDetailcardShow(false);

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
      console.log(response.data);
      setPhoneDetailsdata(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeletePhoneDetail(id) {
    try {
      const response = await axios.delete(
        `${BASE_URL}/delete/phone/${id}/details?toDoId=${todoTableId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        alert("Phone deleted successfully");
        setrefreshKey((prev) => prev + 1);
        setPhoneDetailsdata((prevData) =>
          prevData.filter((phoneData) => phoneData.phoneId !== id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleClickEmailCount(id) {
    setTodoTableId(id);
    setEmailDetailcardShow(true);
    setshowPhoneDetailcard(false);
    setwhatappDetailcardShow(false);
    setmeetingDetailCardShow(false);
    setphysicalmeetingCardShow(false);
    setnetSearchingDetailcardShow(false);
    setmiscellaneousDetailcardShow(false);
    setreportDetailcardShow(false);

    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/get/todo/${id}/email/details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setemailDetailcarddata(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteEmail(id) {
    try {
      const response = await axios.delete(
        `${BASE_URL}/delete/email/${id}/details?toDoId=${todoTableId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        alert("Email deleted successfully");
        setrefreshKey((prev) => prev + 1);
        setemailDetailcarddata((prevData) =>
          prevData.filter((emailData) => emailData.emailId !== id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleclickWhatappCount(id) {
    setTodoTableId(id);
    setwhatappDetailcardShow(true);
    setshowPhoneDetailcard(false);
    setEmailDetailcardShow(false);
    setmeetingDetailCardShow(false);
    setphysicalmeetingCardShow(false);
    setnetSearchingDetailcardShow(false);
    setmiscellaneousDetailcardShow(false);
    setreportDetailcardShow(false);

    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/get/todo/${id}/whatsapp/details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setwhatappDetailcardData(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDeleteWhatsapp(id) {
    try {
      const response = await axios.delete(
        `${BASE_URL}/delete/whasApp/${id}/details?toDoId=${todoTableId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        alert("Whatsapp deleted successfully");
        setrefreshKey((prev) => prev + 1);
        setwhatappDetailcardData((prevData) =>
          prevData.filter((whatsappData) => whatsappData.whatsAppId !== id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleClickMeetingCount(id) {
    setTodoTableId(id);
    setmeetingDetailCardShow(true);
    setshowPhoneDetailcard(false);
    setEmailDetailcardShow(false);
    setwhatappDetailcardShow(false);
    setphysicalmeetingCardShow(false);
    setnetSearchingDetailcardShow(false);
    setmiscellaneousDetailcardShow(false);
    setreportDetailcardShow(false);

    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/get/todo/${id}/meeting/details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setmeetingDetailCardData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteMeeting(id) {
    try {
      const response = await axios.delete(
        `${BASE_URL}/delete/meeting/${id}/details?toDoId=${todoTableId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        alert("Meeting deleted successfully");
        setrefreshKey((prev) => prev + 1);
        setmeetingDetailCardData((prevData) =>
          prevData.filter((meetingData) => meetingData.meetingId !== id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleClickPhysicalMeetingCount(id) {
    setTodoTableId(id);
    setphysicalmeetingCardShow(true);
    setshowPhoneDetailcard(false);
    setEmailDetailcardShow(false);
    setwhatappDetailcardShow(false);
    setmeetingDetailCardShow(false);
    setnetSearchingDetailcardShow(false);
    setmiscellaneousDetailcardShow(false);
    setreportDetailcardShow(false);

    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/get/todo/${id}/physicalmeeting/details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setphysicalmeetingCardData(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDeletephysicalMeeting(id) {
    try {
      const response = await axios.delete(
        `${BASE_URL}/delete/physicalmeeting/${id}/details?toDoId=${todoTableId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        alert("physicalmeeting deleted successfully");
        setrefreshKey((prev) => prev + 1);
        setphysicalmeetingCardData((prevData) =>
          prevData.filter((meetingData) => meetingData.physicalMeetingId !== id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleClicknetSearchCount(id) {
    setTodoTableId(id);
    setnetSearchingDetailcardShow(true);
    setshowPhoneDetailcard(false);
    setEmailDetailcardShow(false);
    setwhatappDetailcardShow(false);
    setmeetingDetailCardShow(false);
    setphysicalmeetingCardShow(false);
    setmiscellaneousDetailcardShow(false);
    setreportDetailcardShow(false);

    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/get/todo/${id}/netsearching/details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setnetSearchingCardData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handledeleteNetSearching(id) {
    try {
      const response = await axios.delete(
        `${BASE_URL}/delete/netsearching/${id}/details?toDoId=${todoTableId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        alert("netsearching deleted successfully");
        setrefreshKey((prev) => prev + 1);
        setnetSearchingCardData((prevData) =>
          prevData.filter((meetingData) => meetingData.netSearchingId !== id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleClickmiscellaneousCount(id) {
    setTodoTableId(id);
    setmiscellaneousDetailcardShow(true);
    setshowPhoneDetailcard(false);
    setEmailDetailcardShow(false);
    setwhatappDetailcardShow(false);
    setmeetingDetailCardShow(false);
    setnetSearchingDetailcardShow(false);
    setphysicalmeetingCardShow(false);
    setreportDetailcardShow(false);

    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/get/todo/${id}/miscellaneous/details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setmiscellaneousDetailcardData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeletemiscellaneousDetailData(id) {
    try {
      const response = await axios.delete(
        `${BASE_URL}/delete/miscellaneous/${id}/details?toDoId=${todoTableId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        alert("miscellaneous deleted successfully");
        setrefreshKey((prev) => prev + 1);
        setmiscellaneousDetailcardData((prevData) =>
          prevData.filter((meetingData) => meetingData.miscellaneousId !== id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleclickReportCount(id) {
    setTodoTableId(id);
    setreportDetailcardShow(true);
    setshowPhoneDetailcard(false);
    setEmailDetailcardShow(false);
    setwhatappDetailcardShow(false);
    setmeetingDetailCardShow(false);
    setnetSearchingDetailcardShow(false);
    setphysicalmeetingCardShow(false);
    setmiscellaneousDetailcardShow(false);

    try {
      const response = await axiosInstance.get(
        `${BASE_URL}/get/todo/${id}/report/details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setreportDetailcardData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteReport(id) {
    try {
      const response = await axios.delete(
        `${BASE_URL}/delete/report/${id}/details?toDoId=${todoTableId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        alert("Report deleted successfully");
        setrefreshKey((prev) => prev + 1);
        setreportDetailcardData((prevData) =>
          prevData.filter((meetingData) => meetingData.reportId !== id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className={Styles.teamTodo_search_section}>
        <input type="search" className={Styles.teamTodo_search} />
        <button
          className={Styles.teamTodo_Add_button}
          onClick={handleShowAddremark}
        >
          +
        </button>
      </div>

      {/* todo table */}

      <div className={Styles.teamToDoTableContainer}>
        <h2 className={Styles.teamToDoTableTitle}>Team To-Do Table</h2>
        <div className={Styles.tableWrapper}>
          <table className={Styles.teamToDoTable}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Phone</th>
                <th>Email</th>
                <th>WhatsApp</th>
                <th>Meeting</th>
                <th>Physical Meeting</th>
                <th>Net Searching</th>
                <th>Miscellaneous</th>
                <th>Report</th>
                <th>Other</th>
              </tr>
            </thead>
            <tbody>
              {teamToDoTableData.length > 0 ? (
                teamToDoTableData.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {new Date(item.toDoDate).toLocaleDateString("en-GB")}
                    </td>
                    <td>
                      <button onClick={() => handlePhoneDetail(item.toDoId)}>
                        {item.phoneDetailsCount || 0}
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleClickEmailCount(item.toDoId)}
                      >
                        {item.emailDetailsCount || 0}
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleclickWhatappCount(item.toDoId)}
                      >
                        {item.whatsAppDetailsCount || 0}
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleClickMeetingCount(item.toDoId)}
                      >
                        {item.meetingCount || 0}
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          handleClickPhysicalMeetingCount(item.toDoId)
                        }
                      >
                        {item.physicalMeetingCount || 0}
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleClicknetSearchCount(item.toDoId)}
                      >
                        {item.netSerchingCount || 0}
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          handleClickmiscellaneousCount(item.toDoId)
                        }
                      >
                        {item.miscellaneousCount || 0}
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleclickReportCount(item.toDoId)}
                      >
                        {item.reportCount || 0}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className={Styles.noData}>
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={Styles.pagination}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className={Styles.pageButton}
          >
            Prev
          </button>
          <span className={Styles.pageInfo}>
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage + 1 >= totalPages}
            className={Styles.pageButton}
          >
            Next
          </button>
        </div>
      </div>

      {/* ** */}
      {showAddRemarkPopUp && (
        <div className={Styles.teamTodo_Add_remark_overlay}>
          <div className={Styles.teamTodo_Add_remark_popup}>
            <button
              onClick={() => setshowAddRemarkPopUp(false)}
              className={Styles.teamTodo_Add_remark_close}
            >
              ✖
            </button>
            <h2 className={Styles.teamTodo_Add_remark_title}>
              Add to-do remark
            </h2>
            <div className={Styles.teamTodo_Add_remark_content}>
              <div className={Styles.teamTodo_Add_remark_phone_section}>
                <p>Phone</p>
                <button
                  className={Styles.teamTodo_Add_remark_button}
                  onClick={() => handleShowAddremarkPhone("PHONE")}
                >
                  Add
                </button>
              </div>
              <div className={Styles.teamTodo_Add_remark_email_section}>
                <p>Email</p>
                <button
                  className={Styles.teamTodo_Add_remark_button}
                  onClick={() => handleShowAddremarkEmail("EMAIL")}
                >
                  Add
                </button>
              </div>
              <div className={Styles.teamTodo_Add_remark_whatsapp_section}>
                <p>WhatsApp</p>
                <button
                  className={Styles.teamTodo_Add_remark_button}
                  onClick={() => handleShowAddremarkWhatsapp("WHATSAPP")}
                >
                  Add
                </button>
              </div>
              <div
                className={Styles.teamTodo_Add_remark_Physical_Meeting_section}
              >
                <p>Physical Meeting</p>
                <button
                  className={Styles.teamTodo_Add_remark_button}
                  onClick={() =>
                    handleShowAddremarkPhysical("PHYSICAL_MEETING")
                  }
                >
                  Add
                </button>
              </div>
              <div className={Styles.teamTodo_Add_remark_Net_Searching_section}>
                <p>Net Searching</p>
                <button
                  className={Styles.teamTodo_Add_remark_button}
                  onClick={() =>
                    handleShowAddremarkNetSearching("NET_SEARCHING")
                  }
                >
                  Add
                </button>
              </div>
              <div className={Styles.teamTodo_Add_remark_Meeting_section}>
                <p>Meeting</p>
                <button
                  className={Styles.teamTodo_Add_remark_button}
                  onClick={() => handleShowAddremarkMeeting("MEETING")}
                >
                  Add
                </button>
              </div>
              <div className={Styles.teamTodo_Add_remark_Report_section}>
                <p>Report</p>
                <button
                  className={Styles.teamTodo_Add_remark_button}
                  onClick={() => handleShowAddremarkReport("REPORT")}
                >
                  Add
                </button>
              </div>
              <div className={Styles.teamTodo_Add_remark_Miscellaneous_section}>
                <p>Miscellaneous</p>
                <button
                  className={Styles.teamTodo_Add_remark_button}
                  onClick={() =>
                    handleShowAddremarkMiscellaneous("MISCELLANEOUS")
                  }
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPhonePopUp && showPhonePopUp && (
        <div className={Styles.phone_Add_remark_overlay}>
          <div className={Styles.phone_Add_remark_popup}>
            <button
              onClick={() => setshowPhonePopUp(false)}
              className={Styles.phone_Add_remark_close}
            >
              ✖
            </button>

            <h2 className={Styles.phone_Add_remark_title}>Add Phone</h2>
            <p>Counter: {count || 0}</p>

            <form
              className={Styles.phone_Add_remark_content}
              onSubmit={handlePhoneSubmit}
            >
              <div className={Styles.phone_Add_remark_section}>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className={Styles.phone_Add_remark_input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  className={Styles.phone_Add_remark_input}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
                <input
                  type="time"
                  className={Styles.phone_Add_remark_input}
                  value={phoneTime}
                  onChange={(e) => setPhoneTime(e.target.value)}
                  required
                />

                <button
                  type="submit"
                  className={Styles.phone_Add_remark_button}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEmailPopUp && (
        <div className={Styles.email_Add_remark_overlay}>
          <div className={Styles.email_Add_remark_popup}>
            <button
              onClick={() => setshowEmailPopUp(false)}
              className={Styles.email_Add_remark_close}
            >
              ✖
            </button>
            <h2 className={Styles.email_Add_remark_title}>Add Email</h2>
            <p className={Styles.email_Add_remark_counter}>
              Counter : {count || 0}
            </p>
            <div>
              <form
                action=""
                onSubmit={handleAddEmail}
                className={Styles.email_Add_remark_content}
              >
                <input
                  type="text"
                  placeholder="Enter Name"
                  className={Styles.email_Add_remark_input}
                  value={Emailname}
                  onChange={(e) => setEmailname(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Enter Email"
                  className={Styles.email_Add_remark_input}
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="time"
                  className={Styles.email_Add_remark_input}
                  value={emailTime}
                  onChange={(e) => setEmailTime(e.target.value)}
                />
                <button className={Styles.email_Add_remark_button}>Add</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {showWhatsappPopUp && (
        <div className={Styles.whatsapp_Add_remark_overlay}>
          <div className={Styles.whatsapp_Add_remark_popup}>
            <button
              onClick={() => setshowWhatsappPopUp(false)}
              className={Styles.whatsapp_Add_remark_close}
            >
              X
            </button>
            <h2 className={Styles.whatsapp_Add_remark_title}>Add Whatsapp</h2>
            <p className={Styles.whatsapp_Add_remark_counter}>
              Counter : {count}
            </p>
            <form
              className={Styles.whatsapp_Add_remark_content}
              onSubmit={handleAddWhatAppDetail}
            >
              <input
                type="text"
                placeholder="Enter Name"
                className={Styles.whatsapp_Add_remark_input}
                value={WhatappName}
                onChange={(e) => setWhatappName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Whatsapp Number"
                className={Styles.whatsapp_Add_remark_input}
                value={whatappNumber}
                onChange={(e) => setWhatappNumber(e.target.value)}
              />
              <input
                type="time"
                className={Styles.whatsapp_Add_remark_input}
                value={WhatappTime}
                onChange={(e) => setWhatappTime(e.target.value)}
              />
              <button className={Styles.whatsapp_Add_remark_button}>Add</button>
            </form>
          </div>
        </div>
      )}

      {showPhysicalPopUp && (
        <div className={Styles.physical_Add_remark_overlay}>
          <div className={Styles.physical_Add_remark_popup}>
            <button
              onClick={() => setshowPhysicalPopUp(false)}
              className={Styles.physical_Add_remark_close}
            >
              X{" "}
            </button>

            <h2 className={Styles.physical_Add_remark_title}>
              Add Physical Meeting
            </h2>
            <p className={Styles.physical_Add_remark_counter}>Count: {count}</p>

            <form
              className={Styles.physical_Add_remark_content}
              onSubmit={handleAddPhysicalDetail}
            >
              <input
                type="text"
                placeholder="Enter Name"
                className={Styles.physical_Add_remark_input}
                value={physicalName}
                onChange={(e) => setPhysicalName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Location"
                className={Styles.physical_Add_remark_input}
                value={physicalLocation}
                onChange={(e) => setPhysicalLocation(e.target.value)}
              />
              <input
                type="time"
                className={Styles.physical_Add_remark_input}
                value={physicalTime}
                onChange={(e) => setPhysicalTime(e.target.value)}
              />
              <button className={Styles.physical_Add_remark_button}>Add</button>
            </form>
          </div>
        </div>
      )}

      {showNetSearchingPopUp && (
        <div className={Styles.netSearching_Add_remark_overlay}>
          <form
            className={Styles.netSearching_Add_remark_popup}
            onSubmit={handleAddNetSearching}
          >
            <p
              onClick={() => setshowNetSearchingPopUp(false)}
              className={Styles.netSearching_Add_remark_close}
            >
              ✖
            </p>
            <h2>Add Net Searching</h2>
            <p>Counter : {count}</p>
            <input
              type="text"
              placeholder="Enter Name"
              value={netSearchingName}
              onChange={(e) => setNetSearchingName(e.target.value)}
            />
            <input
              type="time"
              value={netSearchingTime}
              onChange={(e) => setNetSearchingTime(e.target.value)}
            />
            <button className={Styles.netSearching_Add_remark_add_button}>
              Add
            </button>
          </form>
        </div>
      )}

      {showMeetingPopUp && (
        <div className={Styles.meeting_Add_remark_overlay}>
          <form
            className={Styles.meeting_Add_remark_popup}
            onSubmit={handleAddMeeting}
          >
            <p
              onClick={() => setshowMeetingPopUp(false)}
              className={Styles.meeting_Add_remark_close}
            >
              ✖
            </p>
            <h2>Add Meeting</h2>
            <p>Count : {count}</p>
            <input
              type="text"
              placeholder="Enter Name"
              value={meetingName}
              onChange={(e) => setMeetingName(e.target.value)}
            />
            <input
              type="time"
              value={meetingTime}
              onChange={(e) => setMeetingTime(e.target.value)}
            />
            <button className={Styles.meeting_Add_remark_add_button}>
              Add
            </button>
          </form>
        </div>
      )}

      {showReportPopUp && (
        <div className={Styles.report_Add_remark_overlay}>
          <form
            className={Styles.report_Add_remark_popup}
            onSubmit={handleAddReport}
          >
            <p
              onClick={() => setshowReportPopUp(false)}
              className={Styles.report_Add_remark_popup_close}
            >
              ✖
            </p>
            <h2>Add Report</h2>
            <p>Count : {count}</p>
            <input
              type="text"
              placeholder="Enter Name"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
            />
            <input
              type="time"
              value={reportTime}
              onChange={(e) => setReportTime(e.target.value)}
            />
            <button className={Styles.report_Add_remark_add_button}>Add</button>
          </form>
        </div>
      )}

      {showMiscellaneousPopUp && (
        <div className={Styles.miscellaneous_Add_remark_overlay}>
          <form
            className={Styles.miscellaneous_Add_remark_popup}
            onSubmit={handleAddMiscellaneous}
          >
            <button
              onClick={() => setshowMiscellaneousPopUp(false)}
              className={Styles.miscellaneous_Add_remark_popup_close}
            >
              ✖
            </button>
            <h2>Add Miscellaneous</h2>
            <p>Count : {count}</p>
            <input
              type="text"
              placeholder="Enter Task"
              value={miscellaneousName}
              onChange={(e) => setMiscellaneousName(e.target.value)}
            />
            <input
              type="time"
              value={miscellaneousTime}
              onChange={(e) => setMiscellaneousTime(e.target.value)}
            />
            <button className={Styles.miscellaneous_Add_remark_add_button}>
              Add
            </button>
          </form>
        </div>
      )}

      {showPhoneDetailcard && (
        <div className={Styles.phone_popup_overlay}>
          <div className={Styles.phone_popup_card}>
            <button
              onClick={() => setshowPhoneDetailcard(false)}
              className={Styles.phone_popup_close}
            >
              X
            </button>
            <h2 className={Styles.phone_popup_title}>Phone Details</h2>
            <div className={Styles.phone_popup_content}>
              {phoneDetaildata.map((phoneData, index) => {
                return (
                  <div className={Styles.phone_popup_item} key={index}>
                    <p>
                      <strong>Name:</strong> {phoneData.name}
                    </p>
                    <p>
                      <strong>Phone Number:</strong> {phoneData.phoneNumber}
                    </p>
                    <p>
                      <strong>Phone Time:</strong> {phoneData.phoneTime}
                    </p>
                    <p>
                      <button
                        className={Styles.phone_popup_delete_button}
                        onClick={() =>
                          handleDeletePhoneDetail(phoneData.phoneId)
                        }
                      >
                        Delete
                      </button>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {EmailDetailcardShow && (
        <>
          <div className={Styles.phone_popup_overlay}>
            <div className={Styles.phone_popup_card}>
              <button
                onClick={() => setEmailDetailcardShow(false)}
                className={Styles.phone_popup_close}
              >
                X
              </button>
              <h2 className={Styles.phone_popup_title}>Email Details</h2>
              <div className={Styles.phone_popup_content}>
                {emailDetailcarddata.map((emailData, index) => {
                  return (
                    <div className={Styles.phone_popup_item} key={index}>
                      <p>
                        <strong>Name:</strong> {emailData.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {emailData.email}
                      </p>
                      <p>
                        <button
                          className={Styles.phone_popup_delete_button}
                          onClick={() => handleDeleteEmail(emailData.emailId)}
                        >
                          Delete
                        </button>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {whatappDetailcardShow && (
        <>
          <div className={Styles.phone_popup_overlay}>
            <div className={Styles.phone_popup_card}>
              <button
                onClick={() => setwhatappDetailcardShow(false)}
                className={Styles.phone_popup_close}
              >
                X
              </button>
              <h2 className={Styles.phone_popup_title}>Whatsapp Details</h2>
              <div className={Styles.phone_popup_content}>
                {whatappDetailcardData.map((whatappData, index) => {
                  return (
                    <div className={Styles.phone_popup_item} key={index}>
                      <p>
                        <strong>Name:</strong> {whatappData.name}
                      </p>
                      <p>
                        <strong>Whatsapp Number:</strong>{" "}
                        {whatappData.whatsAppNumber}
                      </p>
                      <p>
                        <strong>Whatsapp Time:</strong>{" "}
                        {whatappData.whatsAppTime}
                      </p>
                      <p>
                        <button
                          className={Styles.phone_popup_delete_button}
                          onClick={() =>
                            handleDeleteWhatsapp(whatappData.whatsAppId)
                          }
                        >
                          Delete
                        </button>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {meetingDetailCardShow && (
        <>
          <div className={Styles.phone_popup_overlay}>
            <div className={Styles.phone_popup_card}>
              <button
                onClick={() => setmeetingDetailCardShow(false)}
                className={Styles.phone_popup_close}
              >
                X
              </button>
              <h2 className={Styles.phone_popup_title}>Meeting Details</h2>
              <div className={Styles.phone_popup_content}>
                {meetingDetailCardData.map((meetingData, index) => {
                  return (
                    <div className={Styles.phone_popup_item} key={index}>
                      <p>
                        <strong>Name:</strong> {meetingData.name}
                      </p>
                      <p>
                        <strong>Location:</strong> {meetingData.location}
                      </p>
                      <p>
                        <strong>Meeting Time:</strong> {meetingData.meetingTime}
                      </p>
                      <p>
                        <button
                          className={Styles.phone_popup_delete_button}
                          onClick={() =>
                            handleDeleteMeeting(meetingData.meetingId)
                          }
                        >
                          Delete
                        </button>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {physicalmeetingCardShow && (
        <>
          <div className={Styles.phone_popup_overlay}>
            <div className={Styles.phone_popup_card}>
              <button
                onClick={() => setphysicalmeetingCardShow(false)}
                className={Styles.phone_popup_close}
              >
                X
              </button>
              <h2 className={Styles.phone_popup_title}>
                Physical Meeting Details
              </h2>
              <div className={Styles.phone_popup_content}>
                {physicalmeetingCardData.map((physicalMeetingData, index) => {
                  return (
                    <div className={Styles.phone_popup_item} key={index}>
                      <p>
                        <strong>Name:</strong> {physicalMeetingData.name}
                      </p>
                      <p>
                        <strong>Location:</strong>{" "}
                        {physicalMeetingData.location}
                      </p>
                      <p>
                        <strong>Meeting Time:</strong>{" "}
                        {physicalMeetingData.meetingTime}
                      </p>
                      <p>
                        <button
                          className={Styles.phone_popup_delete_button}
                          onClick={() =>
                            handleDeletephysicalMeeting(
                              physicalMeetingData.physicalMeetingId
                            )
                          }
                        >
                          Delete
                        </button>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {netSearchingDetailcardShow && (
        <>
          <div className={Styles.phone_popup_overlay}>
            <div className={Styles.phone_popup_card}>
              <button
                onClick={() => setnetSearchingDetailcardShow(false)}
                className={Styles.phone_popup_close}
              >
                X
              </button>
              <h2 className={Styles.phone_popup_title}>
                Net Searching Details
              </h2>
              <div className={Styles.phone_popup_content}>
                {netSearchingCardData.map((netSearchingData, index) => {
                  return (
                    <div className={Styles.phone_popup_item} key={index}>
                      <p>
                        <strong>Name:</strong> {netSearchingData.name}
                      </p>
                      <p>
                        <strong>Meeting Time:</strong> {netSearchingData.time}
                      </p>
                      <p>
                        <button
                          className={Styles.phone_popup_delete_button}
                          onClick={() =>
                            handledeleteNetSearching(
                              netSearchingData.netSearchingId
                            )
                          }
                        >
                          Delete
                        </button>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {miscellaneousDetailcardShow && (
        <>
          <div className={Styles.phone_popup_overlay}>
            <div className={Styles.phone_popup_card}>
              <button
                onClick={() => setmiscellaneousDetailcardShow(false)}
                className={Styles.phone_popup_close}
              >
                X
              </button>
              <h2 className={Styles.phone_popup_title}>
                Miscellaneous Details
              </h2>
              <div className={Styles.phone_popup_content}>
                {miscellaneousDetailcardData.map(
                  (miscellaneousDetailData, index) => {
                    return (
                      <div className={Styles.phone_popup_item} key={index}>
                        <p>
                          <strong>Name:</strong>{" "}
                          {miscellaneousDetailData.taskName}
                        </p>
                        <p>
                          <strong>Meeting Time:</strong>{" "}
                          {miscellaneousDetailData.taskTime}
                        </p>
                        <p>
                          <button
                            className={Styles.phone_popup_delete_button}
                            onClick={() =>
                              handleDeletemiscellaneousDetailData(
                                miscellaneousDetailData.miscellaneousId
                              )
                            }
                          >
                            Delete
                          </button>
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {reportDetailcardShow && (
        <>
          <div className={Styles.phone_popup_overlay}>
            <div className={Styles.phone_popup_card}>
              <button
                onClick={() => setreportDetailcardShow(false)}
                className={Styles.phone_popup_close}
              >
                X
              </button>
              <h2 className={Styles.phone_popup_title}>Report Details</h2>
              <div className={Styles.phone_popup_content}>
                {reportDetailcardData.map((reportDetailData, index) => {
                  return (
                    <div className={Styles.phone_popup_item} key={index}>
                      <p>
                        <strong>Name:</strong> {reportDetailData.name}
                      </p>
                      <p>
                        <strong>Report Time:</strong>{" "}
                        {reportDetailData.reportTime}
                      </p>

                      <p>
                        <button
                          className={Styles.phone_popup_delete_button}
                          onClick={() =>
                            handleDeleteReport(reportDetailData.reportId)
                          }
                        >
                          delete
                        </button>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default TeamTodoSales;
