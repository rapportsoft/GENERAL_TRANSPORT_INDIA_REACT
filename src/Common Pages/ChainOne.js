import { faBell, faCalendarAlt, faHandHolding, faHandHoldingHand, faListUl, faPeopleGroup, faRecycle, faRefresh, faSave, faUserCircle, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useContext, useRef } from 'react';
import AuthContext from '../Components/AuthProvider';
import useAxios from '../Components/useAxios';
import { FaFilePdf, FaFileImage, FaFileAlt, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  Table,
} from "reactstrap";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import DatePicker from "react-datepicker";
import ipaddress from "../Components/IpAddress";
import { toast } from "react-toastify";
const ChainOne = ({ activeTab, selectedId }) => {



  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    },
    label: {
      backgroundColor: '#e3eefa',
      padding: '5px',
      borderRadius: '4px',
    }
  };

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {

      navigate('/login?message=You need to be authenticated to access this page.');
    }
  }, [isAuthenticated, navigate]);

  const axios = useAxios();

  const {
    jwtToken,
    userId,
    username,
    branchId,
    companyid,
    role,
    companyname,
    branchname,
    login,
    logout,
    userType,
    tabMenus,
    userRights
  } = useContext(AuthContext);

  const [defect, setDefect] = useState({
    title: "",
    description: "",
    requestType: "",
    follower: "",
    assignee: "",
    priority: "",
    publicReply: "",
  });

  const [showCC, setShowCC] = useState(false);
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [subject, setSubject] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [status, setStatus] = useState("New");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedFiles, setSelectedFiles] = useState([]);

  // const handleFileChange = (event) => {
  //   const files = Array.from(event.target.files);
  //   setSelectedFiles(files);
  // };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles([...selectedFiles, ...files]); // Append new files
  };

  const removeFile = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  const [mainSearch, setMainSearch] = useState({
    requester: "",
    assignee: "",
    follower: "",
    approvalPeriod: "", // New state for Approval Period
  });

  const handleMainSearchChange = (e) => {
    const { name, value } = e.target;
    setMainSearch((prev) => ({
      ...prev,
      [name]: value,
      approvalPeriod: value ? "Pending Approval" : "", // Auto-set approval period
    }));
  };


  const handleStatusChange = (selectedStatus) => {
    setStatus(selectedStatus);
    console.log("Status saved:", selectedStatus); // Replace this with your save logic
  };

  const [assigneeData, setAssigneeData] = useState([]);
  const [approverData, setApproverData] = useState([]);
  const [followersData, setFollowersData] = useState([]);

  const getAssigneeData = () => {


    axios.get(`${ipaddress}changeMangement/getAssigneeData?cid=${companyid}&bid=${branchId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        setAssigneeData(response.data);

      })
      .catch((error) => {
        setAssigneeData([]);
      })
  }


  const getApproverData = () => {
    axios.get(`${ipaddress}changeMangement/getApproverData?cid=${companyid}&bid=${branchId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        setApproverData(response.data);

      })
      .catch((error) => {
        setApproverData([]);
      })
  }

  const getFollowersData = () => {
    axios.get(`${ipaddress}changeMangement/getFollowersData?cid=${companyid}&bid=${branchId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        setFollowersData(response.data);

      })
      .catch((error) => {
        setFollowersData([]);
      })
  }

  useEffect(() => {

    if (activeTab === "P01602") {

      getAssigneeData();
      getApproverData();
      getFollowersData();
    }
  }, [activeTab])


  const [ticketHdr, setTicketHdr] = useState({
    companyId: '',
    branchId: '',
    status: '',
    createdBy: '',
    createdDate: new Date(),
    approvedBy: '',
    approvedDate: null,
    ticketNo: '',
    ticketStatus: '',
    requester: userId,
    assignee: '',
    approver: '',
    followers: '',
    incidentType: '',
    incident: 'Incident',
    priority: '',
    subject: '',
    status: '',

  })

  const [ticketDtl, setTicketDtl] = useState({
    companyId: '',
    branchId: '',
    ticketNo: '',
    srNo: '',
    ticketStatus: '',
    messageFrom: '',
    message: '',
    attachedFiles: ''
  })

  const [searchTerm, setSearchTerm] = useState(''); // For autocomplete search
  const [filteredFollowers, setFilteredFollowers] = useState([]);
  const handleTicketHdrChange = (e) => {
    const { name, value } = e.target;
    setTicketHdr((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleClear = () => {
    setFilteredFollowers([]);
    setSearchTerm('');
    setStatus('New');
    setSelectedFiles([]);
    setTicketHdr({
      companyId: '',
      branchId: '',
      status: '',
      createdBy: '',
      createdDate: new Date(),
      approvedBy: '',
      approvedDate: null,
      ticketNo: '',
      ticketStatus: '',
      requester: userId,
      assignee: '',
      approver: '',
      followers: '',
      incidentType: '',
      incident: 'Incident',
      priority: '',
      subject: '',
      status: '',
    })
    setOldTktMessages([]);
    setTicketDtl({
      companyId: '',
      branchId: '',
      ticketNo: '',
      srNo: '',
      ticketStatus: '',
      messageFrom: '',
      message: '',
      attachedFiles: ''
    })
  }

  // Handle changes for ticketDtl
  const handleTicketDtlChange = (e) => {
    const { name, value } = e.target;
    setTicketDtl((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddFollower = (followerId, followerName) => {
    const newFollower = `${followerId}:${followerName}`;

    // Check for duplicates
    const existingFollowers = ticketHdr.followers.split('~');
    const isDuplicate = existingFollowers.some((follower) => follower.split(':')[0] === followerId);

    if (!isDuplicate) {
      const updatedFollowers = ticketHdr.followers
        ? `${ticketHdr.followers}~${newFollower}`
        : newFollower;
      setTicketHdr({ ...ticketHdr, followers: updatedFollowers });
      setSearchTerm(''); // Clear search term
    } else {
      return;
    }
  };

  // Handle removing a follower
  const handleRemoveFollower = (followerToRemove) => {
    const updatedFollowers = ticketHdr.followers
      .split('~')
      .filter((follower) => follower !== followerToRemove)
      .join('~');
    setTicketHdr({ ...ticketHdr, followers: updatedFollowers });
  };

  // Handle search term change
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      const filtered = followersData.filter((item) =>
        item[1].toLowerCase().includes(term.toLowerCase())
      );
      setFilteredFollowers(filtered);
    } else {
      setFilteredFollowers([]);
    }
  };

  // Render selected followers with remove buttons
  const renderSelectedFollowers = () => {
    if (!ticketHdr.followers) return null;
    return ticketHdr.followers.split('~').map((follower, index) => (
      <div key={index} style={{ display: 'inline-block', margin: '4px', padding: '4px', border: '1px solid #ccc' }}>
        {follower.split(':')[1]}
        <button
          type="button"
          onClick={() => handleRemoveFollower(follower)}
          style={{ marginLeft: '8px', color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}
        >
          ×
        </button>
      </div>
    ));
  };

  const [OldTktMessages, setOldTktMessages] = useState([]);

  const handleSave = () => {
    if (!ticketHdr.assignee) {
      toast.error("Assignee is required", {
        autoClose: 800

      })
      return;
    }
    if (!ticketHdr.approver) {
      toast.error("Approver is required", {
        autoClose: 800

      })
      return;
    }
    if (!ticketHdr.incidentType) {
      toast.error("Type is required", {
        autoClose: 800

      })
      return;
    }
    if (!ticketHdr.priority) {
      toast.error("Priority is required", {
        autoClose: 800

      })
      return;
    }
    if (!ticketHdr.subject) {
      toast.error("Ticket subject is required", {
        autoClose: 800

      })
      return;
    }
    if (!ticketDtl.message) {
      toast.error("Ticket description is required", {
        autoClose: 800

      })
      return;
    }

    const formData = new FormData();

    // Add JSON data as strings
    formData.append('ticketHdr', JSON.stringify(ticketHdr));
    formData.append('ticketDtl', JSON.stringify(ticketDtl));

    selectedFiles.forEach((file) => {
      formData.append('selectedFiles', file); // Same field name for all files
    });
    formData.append('cid', companyid);
    formData.append('bid', branchId);
    formData.append('user', userId);
    formData.append('status', status);

    setLoading(true);
    axios.post(`${ipaddress}changeMangement/saveTicket`, formData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {

        const data = response.data;

        setTicketDtl({
          companyId: '',
          branchId: '',
          ticketNo: '',
          srNo: '',
          ticketStatus: '',
          messageFrom: '',
          message: '',
          attachedFiles: ''
        })

        setSelectedFiles([]);
        setTicketHdr(data.ticketHdr);
        const processedMessages = data.ticketDtl.map((item) => {
          const formattedDate = new Date(item.createdDate).toLocaleString();

          // Separate createdBy and formattedDate into a distinct variable
          const senderInfo = `${item.createdBy} (${formattedDate})`; // Bold using markdown syntax
          const messageContent = item.message || "No message";
          const createdBy = item.createdBy;
          // Handle file links
          const fileLinks = [];
          if (item.fileByteData) {
            Object.entries(item.fileByteData).forEach(([fileName, fileContent]) => {
              const fileUrl = `data:application/octet-stream;base64,${fileContent}`;
              fileLinks.push({ fileName, fileUrl });
            });
          }

          return { senderInfo, messageContent, fileLinks, createdBy };
        });

        setOldTktMessages(processedMessages);
        setOldTktMessages(processedMessages);

        toast.success('Data save successfully!!', {
          autoClose: 800
        })

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data, {
          autoClose: 800
        })
      })
  }

  const getFileIcon = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();
    switch (ext) {
      case "pdf":
        return <FaFilePdf style={{ color: "red", fontSize: "24px" }} />;
      case "png":
      case "jpg":
      case "jpeg":
        return <FaFileImage style={{ color: "green", fontSize: "24px" }} />;
      default:
        return <FaFileAlt style={{ color: "gray", fontSize: "24px" }} />;
    }
  };

  const chatContainerRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [OldTktMessages]);

  const handleFileDownload = async (fileUrl, fileName) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };


  const getDataByTicketId = (id) => {
    if (id === '') {
      return;
    }

    setLoading(true);
    axios.get(`${ipaddress}changeMangement/getTicketDataById?cid=${companyid}&bid=${branchId}&id=${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;
        setLoading(false);
        setTicketDtl({
          companyId: '',
          branchId: '',
          ticketNo: '',
          srNo: '',
          ticketStatus: '',
          messageFrom: '',
          message: '',
          attachedFiles: ''
        })

        setSelectedFiles([]);
        setTicketHdr(data.ticketHdr);
        const processedMessages = data.ticketDtl.map((item) => {
          const formattedDate = new Date(item.createdDate).toLocaleString();

          // Separate createdBy and formattedDate into a distinct variable
          const senderInfo = `${item.createdBy} (${formattedDate})`; // Bold using markdown syntax
          const messageContent = item.message || "No message";
          const createdBy = item.createdBy;
          // Handle file links
          const fileLinks = [];
          if (item.fileByteData) {
            Object.entries(item.fileByteData).forEach(([fileName, fileContent]) => {
              const fileUrl = `data:application/octet-stream;base64,${fileContent}`;
              fileLinks.push({ fileName, fileUrl });
            });
          }

          return { senderInfo, messageContent, fileLinks, createdBy };
        });

        setOldTktMessages(processedMessages);
        setOldTktMessages(processedMessages);

        toast.success('Data found successfully!!', {
          autoClose: 800
        })
      })
      .catch((error) => {
        setLoading(false);

        toast.error(error.response.data, {
          autoClose: 800
        })
      })
  }

  useEffect(() => {
    getDataByTicketId(selectedId);
  }, [selectedId])

  return (
    <>
      {loading && (
        <div style={styles.overlay}>
          <div className="loader">
            <div className="truckWrapper">
              <div className="truckBody">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 198 93"
                  className="trucksvg"
                >
                  <path
                    strokeWidth="3"
                    stroke="#282828"
                    fill="#F83D3D"
                    d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
                  ></path>
                  <path
                    strokeWidth="3"
                    stroke="#282828"
                    fill="#7D7C7C"
                    d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
                  ></path>
                  <path
                    strokeWidth="2"
                    stroke="#282828"
                    fill="#282828"
                    d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"
                  ></path>
                  <rect
                    strokeWidth="2"
                    stroke="#282828"
                    fill="#FFFCAB"
                    rx="1"
                    height="7"
                    width="5"
                    y="63"
                    x="187"
                  ></rect>
                  <rect
                    strokeWidth="2"
                    stroke="#282828"
                    fill="#282828"
                    rx="1"
                    height="11"
                    width="4"
                    y="81"
                    x="193"
                  ></rect>
                  <rect
                    strokeWidth="3"
                    stroke="#282828"
                    fill="#DFDFDF"
                    rx="2.5"
                    height="90"
                    width="121"
                    y="1.5"
                    x="6.5"
                  ></rect>
                  <rect
                    strokeWidth="2"
                    stroke="#282828"
                    fill="#DFDFDF"
                    rx="2"
                    height="4"
                    width="6"
                    y="84"
                    x="1"
                  ></rect>
                </svg>
              </div>
              <div className="truckTires">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 30 30"
                  className="tiresvg"
                >
                  <circle
                    strokeWidth="3"
                    stroke="#282828"
                    fill="#282828"
                    r="13.5"
                    cy="15"
                    cx="15"
                  ></circle>
                  <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 30 30"
                  className="tiresvg"
                >
                  <circle
                    strokeWidth="3"
                    stroke="#282828"
                    fill="#282828"
                    r="13.5"
                    cy="15"
                    cx="15"
                  ></circle>
                  <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
                </svg>
              </div>
              <div className="road"></div>
              <svg
                xmlSpace="preserve"
                viewBox="0 0 453.459 453.459"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xmlns="http://www.w3.org/2000/svg"
                id="Capa_1"
                version="1.1"
                fill="#000000"
                className="lampPost"
              >
                <path
                  d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993
            c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514
            c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16
            c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914
            h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75
            v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795
            V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0z
            M232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017
            h78.747C231.693,100.736,232.77,106.162,232.77,111.694z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      )}

      <Card>
        <CardBody>
          <Row>

            <Col md={2}>
              <FormGroup>
                <label style={{ fontSize: '14px' }} className="forlabel" for="inBondingId">Ticket No</label>
                <input
                  type="text"
                  name="ticketNo"
                  id="ticketNo"
                  disabled
                  // style={{ backgroundColor: '#E0E0E0' }}
                  value={ticketHdr.ticketNo}
                  className="form-control"
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label style={{ fontSize: '14px' }} className="forlabel" for="inBondingId">Ticket Status</label>
                <input
                  type="text"
                  name="ticketStatus"
                  id="ticketStatus"
                  disabled
                  // style={{ backgroundColor: '#E0E0E0' }}
                  value={ticketHdr.ticketStatus}
                  className="form-control"
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label style={{ fontSize: '14px' }} className="forlabel" for="inBondingId">Created By</label>
                <input
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  disabled
                  value={ticketHdr.createdBy}
                  className="form-control"
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label style={{ fontSize: '14px' }} className="forlabel" for="inBondingId">Created Date </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={ticketHdr.createdDate}
                    // onChange={handleNocTransDate}
                    id="createdDate"
                    name="createdDate"
                    dateFormat="dd/MM/yyyy HH:mm"
                    showTimeSelect
                    disabled
                    readOnly
                    style={{ backgroundColor: "#E0E0E0" }}
                    timeFormat="HH:mm"
                    className="form-control border-right-0 inputField"
                    customInput={<input style={{ width: "100%" }} />}
                    wrapperClassName="custom-react-datepicker-wrapper"
                  />
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "#6c757d",
                    }}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label style={{ fontSize: '14px' }} className="forlabel" for="inBondingId">Approved Date</label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={ticketHdr.approvedDate}

                    id="approvedDate"
                    name="approvedDate"
                    dateFormat="dd/MM/yyyy HH:mm"
                    showTimeSelect
                    disabled
                    readOnly
                    style={{ backgroundColor: "#E0E0E0" }}
                    timeFormat="HH:mm"
                    className="form-control border-right-0 inputField"
                    customInput={<input style={{ width: "100%" }} />}
                    wrapperClassName="custom-react-datepicker-wrapper"
                  />
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "#6c757d",
                    }}
                  />
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {/* Left Column (Dropdowns) */}
            <Col md={3} className="position-relative">
              <ul className="list-unstyled">
                {/* Requester */}
                <li className="mb-3">
                  <FormGroup>
                    <label className="forlabel bold-label">Requester   <FontAwesomeIcon icon={faUserCircle} style={{ marginRight: "4px", color: "blue" }} /></label>
                    <Input
                      className="form-control"
                      name="requester"
                      id="requester"
                      value={ticketHdr.requester}
                      onChange={handleTicketHdrChange}
                      disabled
                    />
                  </FormGroup>
                </li>

                {/* Assignee */}
                <li className="mb-3">
                  <FormGroup>
                    <label className="forlabel bold-label">Assignee<FontAwesomeIcon icon={faHandHoldingHand} style={{ marginLeft: "4px", color: '#00e6ac' }} /></label>
                    <select
                      className="form-control"
                      name="assignee"
                      id="assignee"
                      value={ticketHdr.assignee}
                      onChange={handleTicketHdrChange}
                      disabled={ticketHdr.ticketNo !== ''}
                    >
                      <option value="">Select</option>
                      {assigneeData.map((item, index) => (
                        <option key={index} value={item[0]}>{item[1]}</option>
                      ))}

                    </select>
                  </FormGroup>
                </li>
                <li className="mb-3">
                  <FormGroup>
                    <label className="forlabel bold-label">Approver<FontAwesomeIcon icon={faUserPen} style={{ marginLeft: "4px", color: '#ff751a' }} /></label>
                    <select
                      className="form-control"
                      name="approver"
                      id="approver"
                      value={ticketHdr.approver}
                      onChange={handleTicketHdrChange}
                      disabled={ticketHdr.ticketNo !== ''}

                    >
                      <option value="">Select</option>
                      {approverData.map((item, index) => (
                        <option key={index} value={item[0]}>{item[1]}</option>
                      ))}
                    </select>
                  </FormGroup>
                </li>

                {/* Follower */}
                <li>
                  <FormGroup>
                    <label className="forlabel bold-label">
                      Followers <FontAwesomeIcon icon={faPeopleGroup} style={{ marginLeft: '4px', color: '#66d9ff' }} />
                    </label>
                    <Input
                      className="form-control"
                      placeholder="Search and add followers..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      disabled={ticketHdr.ticketNo !== ''}

                      rows={3}
                    />
                    {/* Display selected followers */}
                    <div
                      style={{
                        marginTop: '8px',
                        pointerEvents: ticketHdr.ticketNo !== '' ? 'none' : 'auto',  // Prevent clicks if ticketNo is not empty
                        opacity: ticketHdr.ticketNo !== '' ? 0.5 : 1,               // Reduce visibility if disabled
                      }}
                    >
                      {renderSelectedFollowers()}
                    </div>
                    {/* Autocomplete suggestions */}
                    {searchTerm && (
                      <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                        {filteredFollowers.map((item, index) => (
                          <li
                            key={index}
                            onClick={() => handleAddFollower(item[0], item[1])}
                            style={{ padding: '4px', cursor: 'pointer', backgroundColor: '#f0f0f0', marginBottom: '2px' }}
                          >
                            {item[1]}
                          </li>
                        ))}
                      </ul>
                    )}
                  </FormGroup>
                </li>


                <li className="mb-3">
                  <FormGroup>
                    <label className="forlabel bold-label">Type<FontAwesomeIcon icon={faListUl} style={{ marginLeft: "5px", color: '#005580' }} /></label>
                    <select
                      className="form-control"
                      name="incidentType"
                      id="incidentType"
                      value={ticketHdr.incidentType}
                      disabled={ticketHdr.ticketNo !== ''}

                      onChange={handleTicketHdrChange}
                    >
                      <option value="">Select</option>
                      <option value="Import">Import</option>
                      <option value="Export">Export</option>
                      <option value="Bond">Bond</option>
                      <option value="Account">Account</option>
                      <option value="Auction">Auction</option>
                      <option value="EYMS">EYMS</option>
                      <option value="Other">Other</option>
                    </select>
                  </FormGroup>
                </li>

              </ul>

              {/* Horizontal Line */}
              <hr style={{ borderTop: "4px solid #ccc", marginTop: 54, backgroundColor: "#ccc" }} />

              <Row>
                {/* Incident Dropdown */}
                <Col md={6}>
                  <FormGroup>
                    <label className="forlabel bold-label">Incident<FontAwesomeIcon icon={faRecycle} style={{ marginLeft: "5px", color: 'green' }} /></label>
                    <select
                      className="form-control"
                      name="incident"
                      id="incident"
                      value={ticketHdr.incident}
                      onChange={handleTicketHdrChange}
                      disabled={ticketHdr.ticketNo !== ''}
                    >
                      <option value="Incident">Incident</option>
                      <option value="Change Request">Change Request</option>
                    </select>
                  </FormGroup>
                </Col>

                {/* Property Dropdown */}
                <Col md={6}>
                  <FormGroup>
                    <label className="forlabel bold-label">Priority<FontAwesomeIcon icon={faBell} style={{ marginLeft: "5px", color: 'red' }} /></label>
                    <select
                      className="form-control"
                      name="priority"
                      id="priority"
                      value={ticketHdr.priority}
                      disabled={ticketHdr.ticketNo !== ''}

                      onChange={handleTicketHdrChange}
                    >
                      <option value="">Select </option>
                      <option value="Low">Low</option>
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <button
                    className="btn btn-outline-danger btn-margin newButton"
                    style={{ fontSize: 12 }}
                    id="submitbtn2"
                    onClick={handleClear}
                  >
                    <FontAwesomeIcon
                      icon={faRefresh}
                      style={{ marginRight: "5px" }}
                    />
                    Clear Ticket
                  </button>
                </Col>
              </Row>

              {/* Vertical Line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  height: "100%",
                  width: "2px",
                  backgroundColor: "#ccc",
                }}
              ></div>
            </Col>
            <Col md={8}>
              <div className="p-1">
                <FormGroup>
                  <label className="forlabel bold-label">Subject</label>
                  <input type="text" className="form-control"
                    id="subject"
                    name="subject"
                    maxLength={200}
                    value={ticketHdr.subject}
                    onChange={handleTicketHdrChange}
                    disabled={ticketHdr.ticketNo !== ''}

                    placeholder="Enter subject here" />
                </FormGroup>
                <FormGroup>
                  <label className="forlabel bold-label">Messages</label>
                  <div
                    ref={chatContainerRef}
                    className="chat-container"
                    style={{
                      overflowY: "auto",
                      height: "400px",
                      padding: "10px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      backgroundColor: "#f5f5f5",
                      borderRadius: "10px",
                    }}
                  >
                    {Array.isArray(OldTktMessages) && OldTktMessages.length > 0 ? (
                      OldTktMessages.map((msg, index) => {
                        const isSender = msg.createdBy === userId; // Check if the message is sent by the logged-in user

                        return (
                          <div
                            key={index}
                            style={{
                              alignSelf: isSender ? "flex-end" : "flex-start",
                              backgroundColor: isSender ? "#dcf8c6" : "#ffffff",
                              padding: "10px",
                              borderRadius: "10px",
                              maxWidth: "70%",
                              boxShadow: "0px 1px 3px rgba(0,0,0,0.2)",
                              wordBreak: "break-word",
                            }}
                          >
                            {/* Render sender info in bold */}
                            <span style={{ fontWeight: 700 }}>{msg.senderInfo}</span>

                            {/* Render message content */}
                            <p style={{ margin: "5px 0", whiteSpace: "pre-wrap" }}>{msg.messageContent}</p>

                            {/* Render file links */}
                            {msg.fileLinks.map((file, i) => (
                              <div
                                key={i}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                  padding: "5px",
                                  backgroundColor: "#e9e9e9",
                                  borderRadius: "8px",
                                  marginTop: "5px",
                                }}
                              >
                                {getFileIcon(file.fileName)}
                                <button
                                  onClick={() => handleFileDownload(file.fileUrl, file.fileName)}
                                  style={{ textDecoration: "none", color: "black", fontWeight: "bold", flex: 1, border: 'none' }}
                                >
                                  {file.fileName}
                                </button>
                                <button
                                  onClick={() => handleFileDownload(file.fileUrl, file.fileName)}
                                  style={{ border: "none", background: "transparent", cursor: "pointer" }}
                                >
                                  <FaDownload style={{ fontSize: "18px", color: "blue" }} />
                                </button>
                              </div>
                            ))}
                          </div>
                        );
                      })
                    ) : (
                      <p style={{ textAlign: "center", color: "gray" }}>No messages available</p>
                    )}
                  </div>

                </FormGroup>
                <hr style={{ margin: "5px 0", border: "1px solid #ccc" }} />


                <div className="p-2 bg-light rounded">
                  <FormGroup>
                    <label className="forlabel bold-label">Message</label>
                    {/* <div className="p-2 border rounded bg-white">

                      <div className="d-flex align-items-center">
                        <label className="bold-label me-2">To</label>
                        <input
                          type="email"
                          className="border-0 flex-grow-1"
                          placeholder="Enter recipient email"
                          value={to}
                          onChange={(e) => setTo(e.target.value)}
                        />
                        {!showCC && (
                          <button
                            className="btn btn-link p-0 text-primary ms-2"
                            onClick={() => setShowCC(true)}
                          >
                            CC
                          </button>
                        )}
                      </div>

                      {showCC && (
                        <>
                          <div className="d-flex align-items-center">
                            <label className="bold-label me-2">CC</label>
                            <input
                              type="email"
                              className="border-0 flex-grow-1"
                              placeholder="Enter CC email"
                              value={cc}
                              onChange={(e) => setCc(e.target.value)}
                              onBlur={() => {
                                if (!cc.trim()) setShowCC(false); // Hide CC if empty
                              }}
                            />
                          </div>
                          <hr className="my-2" style={{ borderTop: "1px solid #ccc" }} />
                        </>
                      )}
                    </div> */}

                    <textarea className="form-control mt-2" rows="6"
                      value={ticketDtl.message}
                      name="message"
                      id="message"
                      onChange={handleTicketDtlChange}
                      style={{ overflowY: "auto", resize: "none", maxHeight: "200px" }}
                      placeholder="Compose your email..."></textarea>
                  </FormGroup>

                  <div className="d-flex justify-content-between align-items-center">

                    <div>
                      <input
                        type="file"
                        id="attachment"
                        className="d-none"
                        multiple
                        onChange={handleFileChange}
                      />

                      {/* Attach File Button */}
                      <label htmlFor="attachment" style={{ fontSize: 14 }} className="btn btn-outline-secondary">
                        📎 Attach File
                      </label>

                      {/* Display Selected Files */}
                      {selectedFiles.length > 0 && (
                        <ul className="mt-2 list-unstyled">
                          {selectedFiles.map((file, index) => (
                            // <li key={index} style={{ backgroundColor: 'lightgray', marginTop: 5, borderRadius: 5 }} className="d-flex align-items-center">
                            <Row key={index} style={{ backgroundColor: 'lightgray', marginLeft: 2, marginTop: 5, borderRadius: 5 }}>
                              <Col md={10}>
                                <span>{file.name}</span>
                              </Col>
                              <Col md={2}>
                                <button
                                  className="btn btn-sm  ms-2"
                                  onClick={() => removeFile(index)}
                                  disabled={ticketHdr.ticketNo !== ''}
                                >
                                  ❌
                                </button>
                              </Col>
                            </Row>


                            //  </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div>
                      <Row>
                        <Col md={12}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            {/* "Save as" button */}
                            <button
                              className="btn btn-secondary"
                              style={{ marginRight: '0px', fontSize: 16 }}
                              onClick={handleSave}
                            >
                              <FontAwesomeIcon
                                icon={faSave}
                                style={{ marginRight: "5px" }}
                              />
                              Save
                            </button>

                            {/* Dropdown with caret */}
                            {/* <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
                              <DropdownToggle caret className="btn btn-primary" />
                              <DropdownMenu>
                                {['New', 'Open', 'In Process', 'Solved'].map((item) => (
                                  <DropdownItem key={item} onClick={() => handleStatusChange(item)}>
                                    {item}
                                  </DropdownItem>
                                ))}
                              </DropdownMenu>
                            </Dropdown> */}
                          </div>
                        </Col>
                        {/* <Col md={4}>
                          <button
                            className="btn btn-outline-danger btn-margin newButton"
                            style={{ fontSize: 12 }}
                            id="submitbtn2"
                            onClick={handleClear}
                          >
                            <FontAwesomeIcon
                              icon={faRefresh}
                              style={{ marginRight: "5px" }}
                            />
                            Clear
                          </button>
                        </Col> */}
                      </Row>


                    </div>
                  </div>

                </div>

              </div>
            </Col>

          </Row>
        </CardBody>
      </Card>



    </>
  );
};

export default ChainOne;
