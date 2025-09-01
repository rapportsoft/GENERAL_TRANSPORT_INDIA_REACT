// import AuthContext from "../Components/AuthProvider";
// import { useLocation, useNavigate } from "react-router-dom";
// import React, { useEffect, useState, useContext } from "react";
// import "../Components/Style.css";
// import Select from "react-select";
// import {
//   Card,
//   CardBody,
//   Container,
//   Row,
//   Col,
//   Form,
//   FormGroup,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   Label,
//   Input,
//   Table,
// } from "reactstrap";
// import DatePicker from "react-datepicker";
// import { Pagination } from 'react-bootstrap';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faIdBadge,
//   faChartGantt,
//   faBold,
//   faBox,
//   faArrowAltCircleLeft,
//   faSearch,
//   faRefresh,
//   faUpload,
//   faFileExcel,
//   faSave,
//   faCheck,
//   faDownload,
//   faTrash,
//   faShip,
//   faBackward,
//   faCalendarAlt,
//   faAdd,
//   faPlaneDeparture,
//   faHouse,
// } from "@fortawesome/free-solid-svg-icons";
// import "../assets/css/style.css";
// import "../Components/Style.css";
// import { Button } from "react-bootstrap";
// import useAxios from "../Components/useAxios";
// import CFSService from "../service/CFSService";
// import { toast } from "react-toastify";
// import moment from "moment";
// import ipaddress from "../Components/IpAddress";

// function CargoBackToTown() {
//   const navigate = useNavigate();
//   const axios = useAxios();
//   const { isAuthenticated } = useContext(AuthContext);

//   // If the user is not authenticated, redirect to the login page
//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate(
//         "/login?message=You need to be authenticated to access this page."
//       );
//     }
//   }, [isAuthenticated, navigate]);

//   const {
//     jwtToken,
//     userId,
//     username,
//     branchId,
//     companyid,
//     role,
//     companyname,
//     branchname,
//     login,
//     logout,
//     userType,
//     userRights,
//   } = useContext(AuthContext);

//   const styles = {
//     overlay: {
//       position: "fixed",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: "100%",
//       backgroundColor: "rgba(255, 255, 255, 0.8)",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       zIndex: 9999,
//     },
//   };

//   const location = useLocation();
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const queryParams = new URLSearchParams(location.search);
//   const processId = queryParams.get("process_id");

//   const foundRights =
//     role !== "ROLE_ADMIN"
//       ? userRights.find((item) => item.process_Id === processId)
//       : null;
//   const allowCreate = foundRights?.allow_Create === "Y";
//   const allowRead = foundRights?.allow_Read === "Y";
//   const allowEdit = foundRights?.allow_Update === "Y";
//   const allowDelete = foundRights?.allow_Delete === "Y";

//   const [onAccountOfData, setOnAccountOfData] = useState([]);

//   const searchOnAccountOfData = (id) => {
//     if (id === '') {
//       setOnAccountOfData([]);
//       return;
//     }
//     axios.get(`${ipaddress}party/getAll?cid=${companyid}&bid=${branchId}&val=${id}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {
//         const portOptions = response.data.map(port => ({
//           value: port[0],
//           label: port[1],
//           code: port[2]
//         }))
//         setOnAccountOfData(portOptions);
//       })
//       .catch((error) => {
//         setOnAccountOfData([]);
//       })
//   }

//   const handleOnAccountOfChange = async (selectedOption, { action }) => {

//     if (action === 'clear') {
//       setBackToTownData({
//         ...backToTownData,
//         onAccountOf: '',
//         onAccountOfName: ''
//       })
//     }
//     else {
//       setBackToTownData({
//         ...backToTownData,
//         onAccountOf: selectedOption.value,
//         onAccountOfName: selectedOption.label
//       })

//       setFormErrors(prevState => ({
//         ...prevState,
//         onAccountOf: ''
//       }));
//     }

//   }

//   const [sbData, setSbData] = useState([]);

//   const searchSbData = (val) => {
//     if (!val) {
//       setSbData([]);
//       return;
//     }

//     axios.get(`${ipaddress}exportBackToTown/searchSb?cid=${companyid}&bid=${branchId}&val=${val}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {
//         const portOptions = response.data.map(port => ({
//           value: port[0],
//           label: port[0],
//           transId: port[1]
//         }))

//         setSbData(portOptions);
//       })
//       .catch((error) => {
//         setSbData([]);
//       })
//   }

//   const handleSbNoChange = async (selectedOption, { action }) => {

//     if (action === 'clear') {
//       setBackToTownData({
//         ...backToTownData,
//         sbNo: '',
//       })

//       handleClear();
//     }
//     else {
//       setBackToTownData({
//         ...backToTownData,
//         sbNo: selectedOption.value,
//       })

//       getSelectedSbData(selectedOption.value, selectedOption.transId);

//       setFormErrors(prevState => ({
//         ...prevState,
//         sbNo: ''
//       }));
//     }

//   }

//   const getSelectedSbData = (sb, trans) => {

//     axios.get(`${ipaddress}exportBackToTown/selectSbData?cid=${companyid}&bid=${branchId}&sb=${sb}&trans=${trans}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {
//         const data = response.data[0];

//         console.log('sb data ', data);

//         setBackToTownData({
//           companyId: '',
//           branchId: '',
//           backToTownTransId: '',
//           profitcentreId: 'CFS Export',
//           backToTownTransDate: new Date(),
//           sbTransId: data[0] || '',
//           sbTransDate: data[1] === null ? null : new Date(data[1]),
//           sbNo: data[2] || '',
//           sbDate: data[3] === null ? null : new Date(data[3]),
//           onAccountOf: data[8] || '',
//           onAccountOfName: data[9] || '',
//           requestReferenceNo: '',
//           requestReferenceDate: '',
//           status: '',
//           createdBy: '',
//           importerId: data[4] || '',
//           exporterAddress: data[5] + ' ' + data[6] + ' ' + data[7] || '',
//           typeOfContainer: '',
//           commodity: data[10] || '',
//           numberOfMarks: data[11] || '',
//           backToTownLineId: '1',
//           actualNoOfPackages: data[12] || '',
//           balancePackages: data[13] || '',
//           backToTownPackages: '',
//           grossWeight: data[14] || '',
//           backToTownWeight: '',
//         })

//       })
//       .catch((error) => {

//       })
//   }


//   const [backToTownData, setBackToTownData] = useState({
//     companyId: '',
//     branchId: '',
//     backToTownTransId: '',
//     profitcentreId: 'CFS Export',
//     backToTownTransDate: new Date(),
//     sbTransId: '',
//     sbTransDate: null,
//     sbNo: '',
//     sbDate: null,
//     onAccountOf: '',
//     onAccountOfName: '',
//     requestReferenceNo: '',
//     requestReferenceDate: '',
//     status: '',
//     createdBy: '',
//     importerId: '',
//     exporterAddress: '',
//     typeOfContainer: '',
//     commodity: '',
//     numberOfMarks: '',
//     backToTownLineId: '',
//     actualNoOfPackages: '',
//     balancePackages: '',
//     backToTownPackages: '',
//     grossWeight: '',
//     backToTownWeight: '',
//   })

//   const [formErrors, setFormErrors] = useState({
//     sbNo: '',
//     backToTownPackages: '',
//     backToTownWeight: '',
//     onAccountOf: ''
//   })

//   function handleInputChange(e, val1, val2) {
//     const inputValue = e.toString(); // Convert e to string
//     const numericInput = inputValue.replace(/[^0-9.]/g, ''); // Remove non-numeric characters
//     const parts = numericInput.split('.'); // Split on decimal point
//     const integerPart = parts[0].slice(0, val1); // Limit integer part to val1 digits

//     let decimalPart = parts[1]; // Get decimal part

//     // If val2 is 0, do not allow any decimal point
//     if (val2 === 0) {
//       return integerPart; // Return only the integer part
//     }

//     // Limit decimal places if val2 > 0
//     if (decimalPart !== undefined) {
//       decimalPart = `.${decimalPart.slice(0, val2)}`; // Limit decimal part to val2 digits
//     }

//     // Combine integer and decimal parts
//     const sanitizedInput = decimalPart !== undefined ? `${integerPart}${decimalPart}` : integerPart;
//     return sanitizedInput; // Return sanitized input
//   }


//   const handleBacktotownChange = (e, val1, val2) => {
//     const { name, value } = e.target;
//     let sanitizeValue = value

//     if (['backToTownPackages', 'backToTownWeight'].includes(name)) {
//       sanitizeValue = handleInputChange(value, val1, val2)
//     }

//     if (name === 'backToTownPackages') {
//       if (sanitizeValue > backToTownData.balancePackages) {
//         sanitizeValue = ''

//         setBackToTownData(prev => ({
//           ...prev,
//           [name]: sanitizeValue,
//           backToTownWeight: ''
//         }))
//       }
//       else {

//         const wt = (backToTownData.grossWeight * sanitizeValue) / backToTownData.actualNoOfPackages;
//         console.log('wt ', wt);

//         setBackToTownData(prev => ({
//           ...prev,
//           [name]: sanitizeValue,
//           backToTownWeight: wt
//         }))
//       }

//       setFormErrors(prevState => ({
//         ...prevState,
//         [name]: '',
//         backToTownWeight: ''
//       }));
//     }
//     else {
//       setBackToTownData(prev => ({
//         ...prev,
//         [name]: sanitizeValue
//       }))
//       setFormErrors(prevState => ({
//         ...prevState,
//         [name]: ''
//       }));
//     }



//   }

//   const handleClear = () => {
//     setFormErrors({
//       sbNo: '',
//       backToTownPackages: '',
//       backToTownWeight: '',
//       onAccountOf: ''
//     })

//     setBackToTownData({
//       companyId: '',
//       branchId: '',
//       backToTownTransId: '',
//       profitcentreId: 'CFS Export',
//       backToTownTransDate: new Date(),
//       sbTransId: '',
//       sbTransDate: null,
//       sbNo: '',
//       sbDate: null,
//       onAccountOf: '',
//       onAccountOfName: '',
//       requestReferenceNo: '',
//       requestReferenceDate: '',
//       status: '',
//       createdBy: '',
//       importerId: '',
//       exporterAddress: '',
//       typeOfContainer: '',
//       commodity: '',
//       numberOfMarks: '',
//       backToTownLineId: '',
//       actualNoOfPackages: '',
//       balancePackages: '',
//       backToTownPackages: '',
//       grossWeight: '',
//       backToTownWeight: '',
//     })

//   }

//   const handleSave = () => {
//     setLoading(true);

//     setFormErrors({
//       sbNo: '',
//       backToTownPackages: '',
//       backToTownWeight: ''
//     })

//     let errors = {};

//     if (!backToTownData.sbNo) {
//       errors.sbNo = "SB No is required."
//     }

//     if (!backToTownData.onAccountOf) {
//       errors.onAccountOf = "On account of is required."
//     }

//     if (!backToTownData.backToTownPackages || Math.abs(backToTownData.backToTownPackages) < 0.000001) {
//       errors.backToTownPackages = "Back to town packages is required."
//     }

//     if (!backToTownData.backToTownWeight || Math.abs(backToTownData.backToTownWeight) < 0.000001) {
//       errors.backToTownWeight = "Back to town wt is required.";
//     }

//     if (Object.keys(errors).length > 0) {
//       setLoading(false);
//       setFormErrors(errors);
//       toast.error("Please fill in the required fields.", {
//         autoClose: 1000
//       })
//       return;
//     }

//     axios.post(`${ipaddress}exportBackToTown/saveBackToTownData?cid=${companyid}&bid=${branchId}&user=${userId}`, backToTownData, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {

//         const data = response.data;

//         setBackToTownData({
//           companyId: '',
//           branchId: '',
//           backToTownTransId: data.backToTownTransId || '',
//           profitcentreId: 'CFS Export',
//           backToTownTransDate: data.backToTownTransDate === null ? null : new Date(data.backToTownTransDate),
//           sbTransId: data.sbTransId || '',
//           sbTransDate: data.sbTransDate === null ? null : new Date(data.sbTransDate),
//           sbNo: data.sbNo || '',
//           sbDate: data.sbDate === null ? null : new Date(data.sbDate),
//           onAccountOf: data.onAccountOf || '',
//           onAccountOfName: data.onAccountOfName || '',
//           requestReferenceNo: data.requestReferenceNo || '',
//           requestReferenceDate: data.requestReferenceDate === null ? null : new Date(data.requestReferenceDate),
//           status: data.status || '',
//           createdBy: data.createdBy || '',
//           importerId: data.importerId || '',
//           exporterAddress: data.exporterAddress || '',
//           typeOfContainer: data.typeOfContainer || '',
//           commodity: data.commodity || '',
//           numberOfMarks: data.numberOfMarks || '',
//           backToTownLineId: data.backToTownLineId || '',
//           actualNoOfPackages: data.actualNoOfPackages || '',
//           balancePackages: data.balancePackages || '',
//           backToTownPackages: data.backToTownPackages || '',
//           grossWeight: data.grossWeight || '',
//           backToTownWeight: data.backToTownWeight || ''
//         })


//         toast.success('Data save successfully!!', {
//           autoClose: 800
//         })

//         setLoading(false);

//       })
//       .catch((error) => {
//         toast.error(error.response.data, {
//           autoClose: 800
//         })
//         setLoading(false);
//       })




//   }


//   const [isModalOpenForSearchGateInData, setIsModalOpenForGateInData] = useState(false);
//   const [searchId, setSearchId] = useState('');
//   const [gateInSearchData, setGateInSearchData] = useState([]);

//   const openGateInModal = () => {
//     setIsModalOpenForGateInData(true);
//     searchExportEmptyContainerGateIn('');
//     setSearchId('');
//   }

//   const closeGateInModal = () => {
//     setIsModalOpenForGateInData(false);
//     setSearchId('');
//     setGateInSearchData([]);
//   }

//   const searchExportEmptyContainerGateIn = (id) => {
//     setLoading(true);
//     axios.get(`${ipaddress}exportBackToTown/searchbacktoTownData?cid=${companyid}&bid=${branchId}&val=${id}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {
//         setGateInSearchData(response.data);
//         setLoading(false);
//         toast.success("Data found successfully!!", {
//           autoClose: 800
//         })
//       })
//       .catch((error) => {
//         setGateInSearchData([]);
//         setLoading(false);
//         toast.error(error.response.data, {
//           autoClose: 800
//         })
//       })
//   }


//   const getSelectedData = (id, sb, trans) => {
//     setLoading(true);

//     axios.get(`${ipaddress}exportBackToTown/selectbacktoTownData?cid=${companyid}&bid=${branchId}&id=${id}&sb=${sb}&trans=${trans}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {

//         const data = response.data;

//         setBackToTownData({
//           companyId: '',
//           branchId: '',
//           backToTownTransId: data.backToTownTransId || '',
//           profitcentreId: 'CFS Export',
//           backToTownTransDate: data.backToTownTransDate === null ? null : new Date(data.backToTownTransDate),
//           sbTransId: data.sbTransId || '',
//           sbTransDate: data.sbTransDate === null ? null : new Date(data.sbTransDate),
//           sbNo: data.sbNo || '',
//           sbDate: data.sbDate === null ? null : new Date(data.sbDate),
//           onAccountOf: data.onAccountOf || '',
//           onAccountOfName: data.onAccountOfName || '',
//           requestReferenceNo: data.requestReferenceNo || '',
//           requestReferenceDate: data.requestReferenceDate === null ? null : new Date(data.requestReferenceDate),
//           status: data.status || '',
//           createdBy: data.createdBy || '',
//           importerId: data.importerId || '',
//           exporterAddress: data.exporterAddress || '',
//           typeOfContainer: data.typeOfContainer || '',
//           commodity: data.commodity || '',
//           numberOfMarks: data.numberOfMarks || '',
//           backToTownLineId: data.backToTownLineId || '',
//           actualNoOfPackages: data.actualNoOfPackages || '',
//           balancePackages: data.balancePackages || '',
//           backToTownPackages: data.backToTownPackages || '',
//           grossWeight: data.grossWeight || '',
//           backToTownWeight: data.backToTownWeight || ''
//         })


//         setLoading(false);
//         closeGateInModal();
//       })
//       .catch((error) => {
//         toast.error(error.response.data, {
//           autoClose: 800
//         })
//         setLoading(false);
//       })
//   }

//   const handleSearchClear = () => {
//     searchExportEmptyContainerGateIn('');
//     setSearchId('');
//   }

//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = gateInSearchData.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(gateInSearchData.length / itemsPerPage);

//   // Function to handle page change
//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };
//   const displayPages = () => {
//     const centerPageCount = 5;
//     const middlePage = Math.floor(centerPageCount / 2);
//     let startPage = currentPage - middlePage;
//     let endPage = currentPage + middlePage;

//     if (startPage < 1) {
//       startPage = 1;
//       endPage = Math.min(totalPages, centerPageCount);
//     }

//     if (endPage > totalPages) {
//       endPage = totalPages;
//       startPage = Math.max(1, totalPages - centerPageCount + 1);
//     }

//     return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
//   };


//   return (
//     <>
//       {loading && (
//         <div className="loader" style={styles.overlay}>
//           <div className="truckWrapper">
//             <div className="truckBody">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 198 93"
//                 className="trucksvg"
//               >
//                 <path
//                   strokeWidth="3"
//                   stroke="#282828"
//                   fill="#F83D3D"
//                   d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
//                 ></path>
//                 <path
//                   strokeWidth="3"
//                   stroke="#282828"
//                   fill="#7D7C7C"
//                   d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
//                 ></path>
//                 <path
//                   strokeWidth="2"
//                   stroke="#282828"
//                   fill="#282828"
//                   d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"
//                 ></path>
//                 <rect
//                   strokeWidth="2"
//                   stroke="#282828"
//                   fill="#FFFCAB"
//                   rx="1"
//                   height="7"
//                   width="5"
//                   y="63"
//                   x="187"
//                 ></rect>
//                 <rect
//                   strokeWidth="2"
//                   stroke="#282828"
//                   fill="#282828"
//                   rx="1"
//                   height="11"
//                   width="4"
//                   y="81"
//                   x="193"
//                 ></rect>
//                 <rect
//                   strokeWidth="3"
//                   stroke="#282828"
//                   fill="#DFDFDF"
//                   rx="2.5"
//                   height="90"
//                   width="121"
//                   y="1.5"
//                   x="6.5"
//                 ></rect>
//                 <rect
//                   strokeWidth="2"
//                   stroke="#282828"
//                   fill="#DFDFDF"
//                   rx="2"
//                   height="4"
//                   width="6"
//                   y="84"
//                   x="1"
//                 ></rect>
//               </svg>
//             </div>
//             <div className="truckTires">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 30 30"
//                 className="tiresvg"
//               >
//                 <circle
//                   strokeWidth="3"
//                   stroke="#282828"
//                   fill="#282828"
//                   r="13.5"
//                   cy="15"
//                   cx="15"
//                 ></circle>
//                 <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
//               </svg>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 30 30"
//                 className="tiresvg"
//               >
//                 <circle
//                   strokeWidth="3"
//                   stroke="#282828"
//                   fill="#282828"
//                   r="13.5"
//                   cy="15"
//                   cx="15"
//                 ></circle>
//                 <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
//               </svg>
//             </div>
//             <div className="road"></div>
//             <svg
//               xmlSpace="preserve"
//               viewBox="0 0 453.459 453.459"
//               xmlnsXlink="http://www.w3.org/1999/xlink"
//               xmlns="http://www.w3.org/2000/svg"
//               id="Capa_1"
//               version="1.1"
//               fill="#000000"
//               className="lampPost"
//             >
//               <path
//                 d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993
//                       c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514
//                       c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16
//                       c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914
//                       h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75
//                       v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795
//                       V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0z
//                       M232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017
//                       h78.747C231.693,100.736,232.77,106.162,232.77,111.694z"
//               ></path>
//             </svg>
//           </div>
//         </div>
//       )}

//       <div>
//         <h5
//           className="pageHead"
//           style={{
//             fontFamily: "Your-Heading-Font",
//             paddingLeft: "2%",
//             paddingRight: "-20px",
//           }}
//         >
//           {" "}
//           <FontAwesomeIcon
//             icon={faHouse}
//             style={{
//               marginRight: "8px",
//               color: "black", // Set the color to golden
//             }}
//           />
//           Export Cargo Back to Town
//           <hr />
//         </h5>


//         <Modal Modal isOpen={isModalOpenForSearchGateInData} onClose={closeGateInModal} toggle={closeGateInModal} style={{ maxWidth: '1200px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

//           <ModalHeader toggle={closeGateInModal} style={{
//             backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
//             boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
//             border: '1px solid rgba(0, 0, 0, 0.3)',
//             borderRadius: '0',
//             backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
//             backgroundSize: 'cover',
//             backgroundRepeat: 'no-repeat',
//             //backgroundPosition: 'center',
//             backgroundPosition: 'center',
//           }} >


//             <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', color: 'white' }} > <FontAwesomeIcon
//               icon={faSearch}
//               style={{
//                 marginRight: '8px',
//                 color: 'white', // Set the color to golden
//               }}
//             /> Search Cargo Back To Town Data</h5>



//           </ModalHeader>
//           <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
//             <Row>
//               <Col md={4}>
//                 <FormGroup>
//                   <label className="forlabel bold-label" htmlFor="sbRequestId">
//                     Search by Back To Town Trans Id / Sb No / Sb Trans Id / Request Reference No
//                   </label>
//                   <input
//                     className="form-control"
//                     type="text"
//                     id="searchId"
//                     name='searchId'
//                     value={searchId}
//                     onChange={(e) => setSearchId(e.target.value)}
//                   />

//                 </FormGroup>
//               </Col>
//               <Col md={4} style={{ marginTop: 40 }}>
//                 <button
//                   className="btn btn-outline-primary btn-margin newButton"
//                   style={{ marginRight: 10, fontSize: 12 }}
//                   id="submitbtn2"
//                   onClick={() => searchExportEmptyContainerGateIn(searchId)}

//                 >
//                   <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
//                   Search
//                 </button>
//                 <button
//                   className="btn btn-outline-danger btn-margin newButton"
//                   style={{ marginRight: 10, fontSize: 12 }}
//                   id="submitbtn2"
//                   onClick={handleSearchClear}
//                 >
//                   <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
//                   Reset
//                 </button>
//               </Col>
//             </Row>
//             <hr />

//             <div className="mt-1 table-responsive ">
//               <table className="table table-bordered table-hover tableHeader">
//                 <thead className='tableHeader'>
//                   <tr>
//                     <th scope="col">#</th>
//                     <th scope="col">Back To Town Trans Id</th>
//                     <th scope="col">Back to Town Date</th>
//                     <th scope="col">SB No</th>
//                     <th scope="col">SB Trans Id</th>
//                     <th scope="col">Request Reference No</th>

//                   </tr>
//                   <tr className='text-center'>
//                     <th scope="col"></th>
//                     <th scope="col">{gateInSearchData.length}</th>
//                     <th scope="col"></th>
//                     <th scope="col"></th>
//                     <th scope="col"></th>
//                     <th scope="col"></th>

//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentItems.map((item, index) => (
//                     <tr key={index}>
//                       <td>
//                         <input type="radio" onChange={() => getSelectedData(item[0], item[2], item[3])} name="radioGroup" />
//                       </td>
//                       <td>{item[0]}</td>
//                       <td>{item[1]}</td>
//                       <td>{item[2]}</td>
//                       <td>{item[3]}</td>
//                       <td>{item[4]}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
//                 <Pagination.First onClick={() => handlePageChange(1)} />
//                 <Pagination.Prev
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                 />
//                 <Pagination.Ellipsis />

//                 {displayPages().map((pageNumber) => (
//                   <Pagination.Item
//                     key={pageNumber}
//                     active={pageNumber === currentPage}
//                     onClick={() => handlePageChange(pageNumber)}
//                   >
//                     {pageNumber}
//                   </Pagination.Item>
//                 ))}

//                 <Pagination.Ellipsis />
//                 <Pagination.Next
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                 />
//                 <Pagination.Last onClick={() => handlePageChange(totalPages)} />
//               </Pagination>
//             </div>
//           </ModalBody>
//         </Modal>

//         <Row>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="backToTownTransId">
//                 Back To Town Trans Id
//               </label>
//               <Row>
//                 <Col md={9}>
//                   <Input
//                     className="form-control"
//                     type="text"
//                     id="backToTownTransId"
//                     name='backToTownTransId'
//                     value={backToTownData.backToTownTransId}
//                     disabled
//                   />
//                 </Col>
//                 <Col md={3}>
//                   <button
//                     className="btn btn-outline-primary btn-margin newButton"
//                     style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//                     id="submitbtn2"
//                     onClick={openGateInModal}
//                   >
//                     <FontAwesomeIcon icon={faSearch} size="sm" s />
//                   </button>
//                 </Col>
//               </Row>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="backToTownTransDate">
//                 Back To Town Trans Date
//               </label>
//               <div style={{ position: 'relative' }}>
//                 <DatePicker
//                   selected={backToTownData.backToTownTransDate}
//                   name='backToTownTransDate'
//                   id="backToTownTransDate"
//                   dateFormat="dd/MM/yyyy HH:mm"
//                   className="form-control"
//                   disabled
//                   wrapperClassName="custom-react-datepicker-wrapper"
//                   customInput={
//                     <input
//                       style={{
//                         height: "30px",
//                         width: "100%",
//                       }}
//                     />

//                   }

//                 />
//                 <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
//               </div>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbTransId">
//                 SB Trans Id
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="sbTransId"
//                 name='sbTransId'
//                 value={backToTownData.sbTransId}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbTransDate">
//                 SB Trans Date
//               </label>
//               <div style={{ position: 'relative' }}>
//                 <DatePicker
//                   selected={backToTownData.sbTransDate}
//                   name='sbTransDate'
//                   id="sbTransDate"
//                   dateFormat="dd/MM/yyyy HH:mm"
//                   className="form-control"
//                   disabled
//                   wrapperClassName="custom-react-datepicker-wrapper"
//                   customInput={
//                     <input
//                       style={{
//                         height: "30px",
//                         width: "100%",
//                       }}
//                     />

//                   }

//                 />
//                 <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
//               </div>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="status">
//                 Status
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="status"
//                 name='status'
//                 value={backToTownData.status === 'A' ? 'Approved' : backToTownData.status}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="createdBy">
//                 Created By
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="createdBy"
//                 name='createdBy'
//                 value={backToTownData.createdBy}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//         </Row>

//         <Row>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbNo">
//                 SB No <span style={{ color: 'red' }}>*</span>
//               </label>
//               <Select
//                 value={{ value: backToTownData.sbNo, label: backToTownData.sbNo }}
//                 options={sbData}
//                 onInputChange={searchSbData}
//                 onChange={handleSbNoChange}
//                 placeholder="Select SB No"
//                 isClearable
//                 id="sbNo"
//                 name='sbNo'
//                 className={`autocompleteHeight ${formErrors.sbNo ? 'error-border' : ''}`}
//                 styles={{
//                   control: (provided, state) => ({
//                     ...provided,
//                     height: 32, // Set height
//                     minHeight: 32, // Set minimum height
//                     border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
//                     boxShadow: "none",
//                     display: 'flex',
//                     alignItems: 'center', // Align items vertically
//                     padding: 0, // Remove padding to control height
//                     "&:hover": {
//                       border: "1px solid #ccc",
//                     },
//                     borderRadius: '6px', // Add border radius
//                     "&:hover": {
//                       border: "1px solid #ccc",
//                     },
//                   }),

//                   valueContainer: (provided) => ({
//                     ...provided,
//                     height: '100%', // Full height of the control
//                     display: 'flex',
//                     alignItems: 'center', // Align items vertically
//                     padding: '0 0.75rem', // Match padding
//                   }),
//                   singleValue: (provided) => ({
//                     ...provided,
//                     lineHeight: '32px', // Center text vertically
//                   }),
//                   indicatorSeparator: () => ({
//                     display: "none",
//                   }),
//                   dropdownIndicator: () => ({
//                     display: "none",
//                   }),
//                   placeholder: (provided) => ({
//                     ...provided,
//                     lineHeight: '32px', // Center placeholder text vertically
//                     color: "gray",
//                   }),
//                   clearIndicator: (provided) => ({
//                     ...provided,
//                     padding: 2, // Remove padding
//                     display: 'flex',
//                     alignItems: 'center', // Align clear indicator vertically
//                   }),
//                 }}
//               />
//               <div style={{ color: 'red' }} className="error-message">{formErrors.sbNo}</div>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbDate">
//                 SB Date
//               </label>
//               <div style={{ position: 'relative' }}>
//                 <DatePicker
//                   selected={backToTownData.sbDate}
//                   name='sbDate'
//                   id="sbDate"
//                   dateFormat="dd/MM/yyyy"
//                   className="form-control"
//                   disabled
//                   wrapperClassName="custom-react-datepicker-wrapper"
//                   customInput={
//                     <input
//                       style={{
//                         height: "30px",
//                         width: "100%",
//                       }}
//                     />

//                   }

//                 />
//                 <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
//               </div>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="profitcentreId">
//                 Profitcentre Id
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="profitcentreId"
//                 name='profitcentreId'
//                 value={backToTownData.profitcentreId}
//                 disabled
//               />
//             </FormGroup>
//           </Col>

//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="onAccountOf">
//                 On Account Of <span style={{ color: 'red' }}>*</span>
//               </label>
//               <Select
//                 value={{ value: backToTownData.onAccountOf, label: backToTownData.onAccountOfName }}
//                 options={onAccountOfData}
//                 onChange={handleOnAccountOfChange}
//                 onInputChange={searchOnAccountOfData}
//                 placeholder="Select On Account Of"
//                 isClearable
//                 id="onAccountOf"
//                 name='onAccountOf'
//                 className={`autocompleteHeight ${formErrors.onAccountOf ? 'error-border' : ''}`}
//                 styles={{
//                   control: (provided, state) => ({
//                     ...provided,
//                     height: 32, // Set height
//                     minHeight: 32, // Set minimum height
//                     border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
//                     boxShadow: "none",
//                     display: 'flex',
//                     alignItems: 'center', // Align items vertically
//                     padding: 0, // Remove padding to control height
//                     "&:hover": {
//                       border: "1px solid #ccc",
//                     },
//                     borderRadius: '6px', // Add border radius
//                     "&:hover": {
//                       border: "1px solid #ccc",
//                     },
//                   }),

//                   valueContainer: (provided) => ({
//                     ...provided,
//                     height: '100%', // Full height of the control
//                     display: 'flex',
//                     alignItems: 'center', // Align items vertically
//                     padding: '0 0.75rem', // Match padding
//                   }),
//                   singleValue: (provided) => ({
//                     ...provided,
//                     lineHeight: '32px', // Center text vertically
//                   }),
//                   indicatorSeparator: () => ({
//                     display: "none",
//                   }),
//                   dropdownIndicator: () => ({
//                     display: "none",
//                   }),
//                   placeholder: (provided) => ({
//                     ...provided,
//                     lineHeight: '32px', // Center placeholder text vertically
//                     color: "gray",
//                   }),
//                   clearIndicator: (provided) => ({
//                     ...provided,
//                     padding: 2, // Remove padding
//                     display: 'flex',
//                     alignItems: 'center', // Align clear indicator vertically
//                   }),
//                 }}
//               />
//               <div style={{ color: 'red' }} className="error-message">{formErrors.onAccountOf}</div>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="importerId">
//                 Exporter
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="importerId"
//                 name='importerId'
//                 value={backToTownData.importerId}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="exporterAddress">
//                 Exporter Address
//               </label>
//               <Input
//                 className="form-control"
//                 type="textarea"
//                 id="exporterAddress"
//                 name='exporterAddress'
//                 value={backToTownData.exporterAddress}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//         </Row>

//         <Row>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="requestReferenceNo">
//                 Request Reference No
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="requestReferenceNo"
//                 name='requestReferenceNo'
//                 value={backToTownData.requestReferenceNo}
//                 onChange={(e) => handleBacktotownChange(e)}
//                 maxLength={25}
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="requestReferenceDate">
//                 Request Reference Date
//               </label>
//               <div style={{ position: 'relative' }}>
//                 <DatePicker
//                   selected={backToTownData.requestReferenceDate}
//                   onChange={(date) => setBackToTownData({
//                     ...backToTownData,
//                     requestReferenceDate: date
//                   })}
//                   name='requestReferenceDate'
//                   id="requestReferenceDate"
//                   dateFormat="dd/MM/yyyy"
//                   className="form-control"
//                   wrapperClassName="custom-react-datepicker-wrapper"
//                   customInput={
//                     <input
//                       style={{
//                         height: "30px",
//                         width: "100%",
//                       }}
//                     />

//                   }

//                 />
//                 <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
//               </div>
//             </FormGroup>
//           </Col>

//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="typeOfContainer">
//                 Cargo Type
//               </label>
//               <Input
//                 className="form-control"
//                 type="select"
//                 id="typeOfContainer"
//                 name='typeOfContainer'
//                 value={backToTownData.typeOfContainer}
//                 onChange={(e) => handleBacktotownChange(e)}
//               >
//                 <option value="">Select Cargo Type</option>

//                 <option value="ALL">ALL</option>

//                 <option value="General">General</option>

//                 <option value="Hazardous">Hazardous</option>

//                 <option value="ODC">ODC</option>

//                 <option value="Reefer">Reefer</option>

//                 <option value="Tank">Tank</option>

//                 <option value="TankHaz">Tank_Haz</option>

//                 <option value="ReeferHaz">Reefer_Haz</option>

//                 <option value="FlatTrack">FlatTrack</option>

//                 <option value="ODC_HAZ">ODC_HAZ</option>

//               </Input>
//             </FormGroup>
//           </Col>
//         </Row>

//         <Row className='text-center'>
//           <Col>
//             <button
//               className="btn btn-outline-primary btn-margin newButton"
//               style={{ marginRight: 10 }}
//               id="submitbtn2"
//               onClick={handleSave}
//             >
//               <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
//               Save
//             </button>
//             <button
//               className="btn btn-outline-danger btn-margin newButton"
//               style={{ marginRight: 10 }}
//               id="submitbtn2"
//               onClick={handleClear}
//             >
//               <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
//               Clear
//             </button>

//           </Col>
//         </Row>

//         <div className="table-responsive mt-4">
//           <Table className="table table-bordered table-hover tableHeader">
//             <thead className="thead-dark bg-dark"  >
//               <tr>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Back to Town Line Id</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Commodity</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Marks & Nos</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Total Package</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Balance Packages</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Back To Town Pkgs <span style={{ color: 'red' }}>*</span></th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Gross Weight</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>BTT Weight <span style={{ color: 'red' }}>*</span></th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>{backToTownData.backToTownLineId}</td>
//                 <td>{backToTownData.commodity}</td>
//                 <td>{backToTownData.numberOfMarks}</td>
//                 <td>{backToTownData.actualNoOfPackages}</td>
//                 <td>{backToTownData.balancePackages}</td>
//                 <td>
//                   <Input
//                     className={`form-control ${formErrors.backToTownPackages ? 'error-border' : ''}`}
//                     type="text"
//                     id="backToTownPackages"
//                     name='backToTownPackages'
//                     value={backToTownData.backToTownPackages}
//                     onChange={(e) => handleBacktotownChange(e, 8, 0)}
//                     style={{ width: 150 }}
//                   />
//                 </td>
//                 <td>{backToTownData.grossWeight}</td>
//                 <td>
//                   <Input
//                     className={`form-control ${formErrors.backToTownWeight ? 'error-border' : ''}`}
//                     type="text"
//                     id="backToTownWeight"
//                     name='backToTownWeight'
//                     value={backToTownData.backToTownWeight}
//                     onChange={(e) => handleBacktotownChange(e, 13, 3)}
//                     style={{ width: 150 }}
//                   />
//                 </td>
//               </tr>
//             </tbody>
//           </Table>
//         </div>
//       </div>
//     </>
//   );
// }

// export default CargoBackToTown;


import AuthContext from "../Components/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import Select from "react-select";
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  Table,
} from "reactstrap";
import DatePicker from "react-datepicker";
import { Pagination } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdBadge,
  faChartGantt,
  faBold,
  faBox,
  faArrowAltCircleLeft,
  faSearch,
  faRefresh,
  faUpload,
  faFileExcel,
  faSave,
  faCheck,
  faDownload,
  faTrash,
  faShip,
  faBackward,
  faCalendarAlt,
  faAdd,
  faPlaneDeparture,
  faHouse,
  faPrint
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/style.css";
import "../Components/Style.css";
import { Button } from "react-bootstrap";
import useAxios from "../Components/useAxios";
import cfsService from "../service/CFSService";
import { toast } from "react-toastify";
import moment from "moment";
import ipaddress from "../Components/IpAddress";

function CargoBackToTown({ searchData, resetFlag, updatePagesList }) {
  const navigate = useNavigate();
  const axios = useAxios();
  const { isAuthenticated } = useContext(AuthContext);

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);

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
    userRights,
  } = useContext(AuthContext);

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    },
  };



  const axiosInstance = useAxios();
  const CFSService = new cfsService(axiosInstance);


  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const processId = 'P00225';

  const foundRights =
    role !== "ROLE_ADMIN"
      ? userRights.find((item) => item.process_Id === processId)
      : null;
  const allowCreate = foundRights?.allow_Create === "Y";
  const allowRead = foundRights?.allow_Read === "Y";
  const allowEdit = foundRights?.allow_Update === "Y";
  const allowDelete = foundRights?.allow_Delete === "Y";

  const [onAccountOfData, setOnAccountOfData] = useState([]);








  useEffect(() => {
    if (searchData && searchData.activeTab === processId && searchData.profitCenterId && searchData.sbNo && searchData.sbTransId && searchData.backToTownTransId) {

      getSelectedData(searchData.backToTownTransId, searchData.sbNo, searchData.sbTransId);
    }
  }, [searchData]);
  useEffect(() => {

    if (resetFlag) {
      handleClear();
    }
  }, [resetFlag]);






  const searchOnAccountOfData = (id) => {
    if (id === '') {
      setOnAccountOfData([]);
      return;
    }
    axios.get(`${ipaddress}party/getAll?cid=${companyid}&bid=${branchId}&val=${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const portOptions = response.data.map(port => ({
          value: port[0],
          label: port[1],
          code: port[2]
        }))
        setOnAccountOfData(portOptions);
      })
      .catch((error) => {
        setOnAccountOfData([]);
      })
  }

  const handleOnAccountOfChange = async (selectedOption, { action }) => {

    if (action === 'clear') {
      setBackToTownData({
        ...backToTownData,
        onAccountOf: '',
        onAccountOfName: ''
      })
    }
    else {
      setBackToTownData({
        ...backToTownData,
        onAccountOf: selectedOption.value,
        onAccountOfName: selectedOption.label
      })

      setFormErrors(prevState => ({
        ...prevState,
        onAccountOf: ''
      }));
    }

  }

  const [sbData, setSbData] = useState([]);

  const searchSbData = (val) => {
    if (!val) {
      setSbData([]);
      return;
    }

    axios.get(`${ipaddress}exportBackToTown/searchSb?cid=${companyid}&bid=${branchId}&val=${val}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const portOptions = response.data.map(port => ({
          value: port[0],
          label: port[0],
          transId: port[1]
        }))

        setSbData(portOptions);
      })
      .catch((error) => {
        setSbData([]);
      })
  }

  const handleSbNoChange = async (selectedOption, { action }) => {

    if (action === 'clear') {
      setBackToTownData({
        ...backToTownData,
        sbNo: '',
      })

      handleClear();
    }
    else {
      setBackToTownData({
        ...backToTownData,
        sbNo: selectedOption.value,
      })

      getSelectedSbData(selectedOption.value, selectedOption.transId);

      setFormErrors(prevState => ({
        ...prevState,
        sbNo: ''
      }));
    }

  }

  const getSelectedSbData = (sb, trans) => {

    axios.get(`${ipaddress}exportBackToTown/selectSbData?cid=${companyid}&bid=${branchId}&sb=${sb}&trans=${trans}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data[0];

        console.log('sb data ', data);

        setBackToTownData({
          companyId: '',
          branchId: '',
          backToTownTransId: '',
          profitcentreId: 'CFS Export',
          backToTownTransDate: new Date(),
          sbTransId: data[0] || '',
          sbTransDate: data[1] === null ? null : new Date(data[1]),
          sbNo: data[2] || '',
          sbDate: data[3] === null ? null : new Date(data[3]),
          onAccountOf: data[8] || '',
          onAccountOfName: data[9] || '',
          requestReferenceNo: '',
          requestReferenceDate: '',
          status: '',
          createdBy: '',
          importerId: data[4] || '',
          exporterAddress: data[5] + ' ' + data[6] + ' ' + data[7] || '',
          typeOfContainer: '',
          commodity: data[10] || '',
          numberOfMarks: data[11] || '',
          backToTownLineId: '1',
          actualNoOfPackages: data[12] || '',
          balancePackages: data[13] || '',
          backToTownPackages: '',
          grossWeight: data[14] || '',
          backToTownWeight: '',
        })

      })
      .catch((error) => {

      })
  }


  const [backToTownData, setBackToTownData] = useState({
    companyId: '',
    branchId: '',
    backToTownTransId: '',
    profitcentreId: 'CFS Export',
    backToTownTransDate: new Date(),
    sbTransId: '',
    sbTransDate: null,
    sbNo: '',
    sbDate: null,
    onAccountOf: '',
    onAccountOfName: '',
    requestReferenceNo: '',
    requestReferenceDate: '',
    status: '',
    createdBy: '',
    importerId: '',
    exporterAddress: '',
    typeOfContainer: '',
    commodity: '',
    numberOfMarks: '',
    backToTownLineId: '',
    actualNoOfPackages: '',
    balancePackages: '',
    backToTownPackages: '',
    grossWeight: '',
    backToTownWeight: '',
  })

  const [formErrors, setFormErrors] = useState({
    sbNo: '',
    backToTownPackages: '',
    backToTownWeight: '',
    onAccountOf: ''
  })

  function handleInputChange(e, val1, val2) {
    const inputValue = e.toString(); // Convert e to string
    const numericInput = inputValue.replace(/[^0-9.]/g, ''); // Remove non-numeric characters
    const parts = numericInput.split('.'); // Split on decimal point
    const integerPart = parts[0].slice(0, val1); // Limit integer part to val1 digits

    let decimalPart = parts[1]; // Get decimal part

    // If val2 is 0, do not allow any decimal point
    if (val2 === 0) {
      return integerPart; // Return only the integer part
    }

    // Limit decimal places if val2 > 0
    if (decimalPart !== undefined) {
      decimalPart = `.${decimalPart.slice(0, val2)}`; // Limit decimal part to val2 digits
    }

    // Combine integer and decimal parts
    const sanitizedInput = decimalPart !== undefined ? `${integerPart}${decimalPart}` : integerPart;
    return sanitizedInput; // Return sanitized input
  }


  const handleBacktotownChange = (e, val1, val2) => {
    const { name, value } = e.target;
    let sanitizeValue = value

    if (['backToTownPackages', 'backToTownWeight'].includes(name)) {
      sanitizeValue = handleInputChange(value, val1, val2)
    }

    if (name === 'backToTownPackages') {
      if (sanitizeValue > backToTownData.balancePackages) {
        sanitizeValue = ''

        setBackToTownData(prev => ({
          ...prev,
          [name]: sanitizeValue,
          backToTownWeight: ''
        }))
      }
      else {

        const wt = (backToTownData.grossWeight * sanitizeValue) / backToTownData.actualNoOfPackages;
        console.log('wt ', wt);

        setBackToTownData(prev => ({
          ...prev,
          [name]: sanitizeValue,
          backToTownWeight: wt
        }))
      }

      setFormErrors(prevState => ({
        ...prevState,
        [name]: '',
        backToTownWeight: ''
      }));
    }
    else {
      setBackToTownData(prev => ({
        ...prev,
        [name]: sanitizeValue
      }))
      setFormErrors(prevState => ({
        ...prevState,
        [name]: ''
      }));
    }



  }

  const handleClear = () => {
    setFormErrors({
      sbNo: '',
      backToTownPackages: '',
      backToTownWeight: '',
      onAccountOf: ''
    })

    setBackToTownData({
      companyId: '',
      branchId: '',
      backToTownTransId: '',
      profitcentreId: 'CFS Export',
      backToTownTransDate: new Date(),
      sbTransId: '',
      sbTransDate: null,
      sbNo: '',
      sbDate: null,
      onAccountOf: '',
      onAccountOfName: '',
      requestReferenceNo: '',
      requestReferenceDate: '',
      status: '',
      createdBy: '',
      importerId: '',
      exporterAddress: '',
      typeOfContainer: '',
      commodity: '',
      numberOfMarks: '',
      backToTownLineId: '',
      actualNoOfPackages: '',
      balancePackages: '',
      backToTownPackages: '',
      grossWeight: '',
      backToTownWeight: '',
    })

  }

  const handleSave = () => {
    setLoading(true);

    setFormErrors({
      sbNo: '',
      backToTownPackages: '',
      backToTownWeight: ''
    })

    let errors = {};

    if (!backToTownData.sbNo) {
      errors.sbNo = "SB No is required."
    }

    if (!backToTownData.onAccountOf) {
      errors.onAccountOf = "On account of is required."
    }

    if (!backToTownData.backToTownPackages || Math.abs(backToTownData.backToTownPackages) < 0.000001) {
      errors.backToTownPackages = "Back to town packages is required."
    }

    if (!backToTownData.backToTownWeight || Math.abs(backToTownData.backToTownWeight) < 0.000001) {
      errors.backToTownWeight = "Back to town wt is required.";
    }

    if (Object.keys(errors).length > 0) {
      setLoading(false);
      setFormErrors(errors);
      toast.error("Please fill in the required fields.", {
        autoClose: 1000
      })
      return;
    }

    axios.post(`${ipaddress}exportBackToTown/saveBackToTownData?cid=${companyid}&bid=${branchId}&user=${userId}`, backToTownData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {

        const data = response.data;

        setBackToTownData({
          companyId: '',
          branchId: '',
          backToTownTransId: data.backToTownTransId || '',
          profitcentreId: 'CFS Export',
          backToTownTransDate: data.backToTownTransDate === null ? null : new Date(data.backToTownTransDate),
          sbTransId: data.sbTransId || '',
          sbTransDate: data.sbTransDate === null ? null : new Date(data.sbTransDate),
          sbNo: data.sbNo || '',
          sbDate: data.sbDate === null ? null : new Date(data.sbDate),
          onAccountOf: data.onAccountOf || '',
          onAccountOfName: data.onAccountOfName || '',
          requestReferenceNo: data.requestReferenceNo || '',
          requestReferenceDate: data.requestReferenceDate === null ? null : new Date(data.requestReferenceDate),
          status: data.status || '',
          createdBy: data.createdBy || '',
          importerId: data.importerId || '',
          exporterAddress: data.exporterAddress || '',
          typeOfContainer: data.typeOfContainer || '',
          commodity: data.commodity || '',
          numberOfMarks: data.numberOfMarks || '',
          backToTownLineId: data.backToTownLineId || '',
          actualNoOfPackages: data.actualNoOfPackages || '',
          balancePackages: data.balancePackages || '',
          backToTownPackages: data.backToTownPackages || '',
          grossWeight: data.grossWeight || '',
          backToTownWeight: data.backToTownWeight || ''
        })


        if (searchData && (searchData.sbNo || searchData.container)
        ) {
          updatePagesList("P00225");
        }

        toast.success('Data save successfully!!', {
          autoClose: 800
        })

        setLoading(false);

      })
      .catch((error) => {
        toast.error(error.response.data, {
          autoClose: 800
        })
        setLoading(false);
      })




  }


  const [isModalOpenForSearchGateInData, setIsModalOpenForGateInData] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [gateInSearchData, setGateInSearchData] = useState([]);

  const openGateInModal = () => {
    setIsModalOpenForGateInData(true);
    searchExportEmptyContainerGateIn('');
    setSearchId('');
  }

  const closeGateInModal = () => {
    setIsModalOpenForGateInData(false);
    setSearchId('');
    setGateInSearchData([]);
  }

  const searchExportEmptyContainerGateIn = (id) => {
    setLoading(true);
    axios.get(`${ipaddress}exportBackToTown/searchbacktoTownData?cid=${companyid}&bid=${branchId}&val=${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        setGateInSearchData(response.data);
        setLoading(false);
        toast.success("Data found successfully!!", {
          autoClose: 800
        })
      })
      .catch((error) => {
        setGateInSearchData([]);
        setLoading(false);
        toast.error(error.response.data, {
          autoClose: 800
        })
      })
  }


  const getSelectedData = (id, sb, trans) => {
    setLoading(true);

    axios.get(`${ipaddress}exportBackToTown/selectbacktoTownData?cid=${companyid}&bid=${branchId}&id=${id}&sb=${sb}&trans=${trans}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {

        const data = response.data;

        setBackToTownData({
          companyId: '',
          branchId: '',
          backToTownTransId: data.backToTownTransId || '',
          profitcentreId: 'CFS Export',
          backToTownTransDate: data.backToTownTransDate === null ? null : new Date(data.backToTownTransDate),
          sbTransId: data.sbTransId || '',
          sbTransDate: data.sbTransDate === null ? null : new Date(data.sbTransDate),
          sbNo: data.sbNo || '',
          sbDate: data.sbDate === null ? null : new Date(data.sbDate),
          onAccountOf: data.onAccountOf || '',
          onAccountOfName: data.onAccountOfName || '',
          requestReferenceNo: data.requestReferenceNo || '',
          requestReferenceDate: data.requestReferenceDate === null ? null : new Date(data.requestReferenceDate),
          status: data.status || '',
          createdBy: data.createdBy || '',
          importerId: data.importerId || '',
          exporterAddress: data.exporterAddress || '',
          typeOfContainer: data.typeOfContainer || '',
          commodity: data.commodity || '',
          numberOfMarks: data.numberOfMarks || '',
          backToTownLineId: data.backToTownLineId || '',
          actualNoOfPackages: data.actualNoOfPackages || '',
          balancePackages: data.balancePackages || '',
          backToTownPackages: data.backToTownPackages || '',
          grossWeight: data.grossWeight || '',
          backToTownWeight: data.backToTownWeight || ''
        })


        setLoading(false);
        closeGateInModal();
      })
      .catch((error) => {
        toast.error(error.response.data, {
          autoClose: 800
        })
        setLoading(false);
      })
  }

  const handleSearchClear = () => {
    searchExportEmptyContainerGateIn('');
    setSearchId('');
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = gateInSearchData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(gateInSearchData.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const displayPages = () => {
    const centerPageCount = 5;
    const middlePage = Math.floor(centerPageCount / 2);
    let startPage = currentPage - middlePage;
    let endPage = currentPage + middlePage;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPages, centerPageCount);
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - centerPageCount + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };




  const downLoadReport = async () => {
    setLoading(true);

    const dataTosend = {
      companyId: companyid,
      branchId: branchId,
      profitCenterId: backToTownData.profitcentreId,
      backToTownTransId: backToTownData.backToTownTransId,
      userId: userId,
    }
    try {
      const response = await CFSService.downLoadExportBackToTownReport(dataTosend, jwtToken);

      if (response.status === 200) {
        const pdfData = response.data;
        const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(pdfBlob);

        window.open(blobUrl, '_blank');

        toast.success("Downloading Pdf!", {
          position: 'top-center',
          autoClose: 800,
        });
      } else {
        toast.error("error downLoading file!", {
          position: 'top-center',
          autoClose: 800,
        });
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Handle the error, show an error message, etc.
    }
    finally {
      setLoading(false);
    }
  };





  return (
    <>
      {loading && (
        <div className="loader" style={styles.overlay}>
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
      )}

      <div>

        <Modal Modal isOpen={isModalOpenForSearchGateInData} onClose={closeGateInModal} toggle={closeGateInModal} style={{ maxWidth: '1200px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

          <ModalHeader toggle={closeGateInModal} style={{
            backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
            boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
            border: '1px solid rgba(0, 0, 0, 0.3)',
            borderRadius: '0',
            backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            //backgroundPosition: 'center',
            backgroundPosition: 'center',
          }} >


            <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', color: 'white' }} > <FontAwesomeIcon
              icon={faSearch}
              style={{
                marginRight: '8px',
                color: 'white', // Set the color to golden
              }}
            /> Search Cargo Back To Town Data</h5>



          </ModalHeader>
          <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
            <Row>
              <Col md={4}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="sbRequestId">
                    Search by Back To Town Trans Id / Sb No / Sb Trans Id / Request Reference No
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="searchId"
                    name='searchId'
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                  />

                </FormGroup>
              </Col>
              <Col md={4} style={{ marginTop: 40 }}>
                <button
                  className="btn btn-outline-primary btn-margin newButton"
                  style={{ marginRight: 10, fontSize: 12 }}
                  id="submitbtn2"
                  onClick={() => searchExportEmptyContainerGateIn(searchId)}

                >
                  <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                  Search
                </button>
                <button
                  className="btn btn-outline-danger btn-margin newButton"
                  style={{ marginRight: 10, fontSize: 12 }}
                  id="submitbtn2"
                  onClick={handleSearchClear}
                >
                  <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                  Reset
                </button>
              </Col>
            </Row>
            <hr />

            <div className="mt-1 table-responsive ">
              <table className="table table-bordered table-hover tableHeader">
                <thead className='tableHeader'>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Back To Town Trans Id</th>
                    <th scope="col">Back to Town Date</th>
                    <th scope="col">SB No</th>
                    <th scope="col">SB Trans Id</th>
                    <th scope="col">Request Reference No</th>

                  </tr>
                  <tr className='text-center'>
                    <th scope="col"></th>
                    <th scope="col">{gateInSearchData.length}</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>

                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <input type="radio" onChange={() => getSelectedData(item[0], item[2], item[3])} name="radioGroup" />
                      </td>
                      <td>{item[0]}</td>
                      <td>{item[1]}</td>
                      <td>{item[2]}</td>
                      <td>{item[3]}</td>
                      <td>{item[4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                <Pagination.First onClick={() => handlePageChange(1)} />
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                <Pagination.Ellipsis />

                {displayPages().map((pageNumber) => (
                  <Pagination.Item
                    key={pageNumber}
                    active={pageNumber === currentPage}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </Pagination.Item>
                ))}

                <Pagination.Ellipsis />
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} />
              </Pagination>
            </div>
          </ModalBody>
        </Modal>

        <Row>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="backToTownTransId">
                Back To Town Trans Id
              </label>
              <Row>
                <Col md={9}>
                  <Input
                    className="form-control"
                    type="text"
                    id="backToTownTransId"
                    name='backToTownTransId'
                    value={backToTownData.backToTownTransId}
                    disabled
                  />
                </Col>
                <Col md={3} className="d-flex justify-content-end">
                  <button
                    className="btn btn-outline-primary btn-margin newButton"
                    style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    id="submitbtn2"
                    onClick={openGateInModal}
                  >
                    <FontAwesomeIcon icon={faSearch} size="sm" s />
                  </button>
                </Col>
              </Row>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="backToTownTransDate">
                Back To Town Trans Date
              </label>
              <div style={{ position: 'relative' }}>
                <DatePicker
                  selected={backToTownData.backToTownTransDate}
                  name='backToTownTransDate'
                  id="backToTownTransDate"
                  dateFormat="dd/MM/yyyy HH:mm"
                  className="form-control"
                  disabled
                  wrapperClassName="custom-react-datepicker-wrapper"
                  customInput={
                    <input
                      style={{
                        height: "30px",
                        width: "100%",
                      }}
                    />

                  }

                />
                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
              </div>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbTransId">
                SB Trans Id
              </label>
              <Input
                className="form-control"
                type="text"
                id="sbTransId"
                name='sbTransId'
                value={backToTownData.sbTransId}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbTransDate">
                SB Trans Date
              </label>
              <div style={{ position: 'relative' }}>
                <DatePicker
                  selected={backToTownData.sbTransDate}
                  name='sbTransDate'
                  id="sbTransDate"
                  dateFormat="dd/MM/yyyy HH:mm"
                  className="form-control"
                  disabled
                  wrapperClassName="custom-react-datepicker-wrapper"
                  customInput={
                    <input
                      style={{
                        height: "30px",
                        width: "100%",
                      }}
                    />

                  }

                />
                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
              </div>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="status">
                Status
              </label>
              <Input
                className="form-control"
                type="text"
                id="status"
                name='status'
                value={backToTownData.status === 'A' ? 'Approved' : backToTownData.status}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="createdBy">
                Created By
              </label>
              <Input
                className="form-control"
                type="text"
                id="createdBy"
                name='createdBy'
                value={backToTownData.createdBy}
                disabled
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbNo">
                SB No <span style={{ color: 'red' }}>*</span>
              </label>
              <Select
                value={{ value: backToTownData.sbNo, label: backToTownData.sbNo }}
                options={sbData}
                onInputChange={searchSbData}
                onChange={handleSbNoChange}
                placeholder="Select SB No"
                isClearable
                id="sbNo"
                name='sbNo'
                className={`autocompleteHeight ${formErrors.sbNo ? 'error-border' : ''}`}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    height: 32, // Set height
                    minHeight: 32, // Set minimum height
                    border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
                    boxShadow: "none",
                    display: 'flex',
                    alignItems: 'center', // Align items vertically
                    padding: 0, // Remove padding to control height
                    "&:hover": {
                      border: "1px solid #ccc",
                    },
                    borderRadius: '6px', // Add border radius
                    "&:hover": {
                      border: "1px solid #ccc",
                    },
                  }),

                  valueContainer: (provided) => ({
                    ...provided,
                    height: '100%', // Full height of the control
                    display: 'flex',
                    alignItems: 'center', // Align items vertically
                    padding: '0 0.75rem', // Match padding
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    lineHeight: '32px', // Center text vertically
                  }),
                  indicatorSeparator: () => ({
                    display: "none",
                  }),
                  dropdownIndicator: () => ({
                    display: "none",
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    lineHeight: '32px', // Center placeholder text vertically
                    color: "gray",
                  }),
                  clearIndicator: (provided) => ({
                    ...provided,
                    padding: 2, // Remove padding
                    display: 'flex',
                    alignItems: 'center', // Align clear indicator vertically
                  }),
                }}
              />
              <div style={{ color: 'red' }} className="error-message">{formErrors.sbNo}</div>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbDate">
                SB Date
              </label>
              <div style={{ position: 'relative' }}>
                <DatePicker
                  selected={backToTownData.sbDate}
                  name='sbDate'
                  id="sbDate"
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  disabled
                  wrapperClassName="custom-react-datepicker-wrapper"
                  customInput={
                    <input
                      style={{
                        height: "30px",
                        width: "100%",
                      }}
                    />

                  }

                />
                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
              </div>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="profitcentreId">
                Profitcentre Id
              </label>
              <Input
                className="form-control"
                type="text"
                id="profitcentreId"
                name='profitcentreId'
                value={backToTownData.profitcentreId}
                disabled
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="onAccountOf">
                On Account Of <span style={{ color: 'red' }}>*</span>
              </label>
              <Select
                value={{ value: backToTownData.onAccountOf, label: backToTownData.onAccountOfName }}
                options={onAccountOfData}
                onChange={handleOnAccountOfChange}
                onInputChange={searchOnAccountOfData}
                placeholder="Select On Account Of"
                isClearable
                id="onAccountOf"
                name='onAccountOf'
                className={`autocompleteHeight ${formErrors.onAccountOf ? 'error-border' : ''}`}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    height: 32, // Set height
                    minHeight: 32, // Set minimum height
                    border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
                    boxShadow: "none",
                    display: 'flex',
                    alignItems: 'center', // Align items vertically
                    padding: 0, // Remove padding to control height
                    "&:hover": {
                      border: "1px solid #ccc",
                    },
                    borderRadius: '6px', // Add border radius
                    "&:hover": {
                      border: "1px solid #ccc",
                    },
                  }),

                  valueContainer: (provided) => ({
                    ...provided,
                    height: '100%', // Full height of the control
                    display: 'flex',
                    alignItems: 'center', // Align items vertically
                    padding: '0 0.75rem', // Match padding
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    lineHeight: '32px', // Center text vertically
                  }),
                  indicatorSeparator: () => ({
                    display: "none",
                  }),
                  dropdownIndicator: () => ({
                    display: "none",
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    lineHeight: '32px', // Center placeholder text vertically
                    color: "gray",
                  }),
                  clearIndicator: (provided) => ({
                    ...provided,
                    padding: 2, // Remove padding
                    display: 'flex',
                    alignItems: 'center', // Align clear indicator vertically
                  }),
                }}
              />
              <div style={{ color: 'red' }} className="error-message">{formErrors.onAccountOf}</div>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="importerId">
                Exporter
              </label>
              <Input
                className="form-control"
                type="text"
                id="importerId"
                name='importerId'
                value={backToTownData.importerId}
                disabled
              />
            </FormGroup>
          </Col>
       



          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="typeOfContainer">
                Cargo Type
              </label>
              <Input
                className="form-control"
                type="select"
                id="typeOfContainer"
                name='typeOfContainer'
                value={backToTownData.typeOfContainer}
                onChange={(e) => handleBacktotownChange(e)}
              >
                <option value="">Select Cargo Type</option>

                <option value="ALL">ALL</option>

                <option value="General">General</option>

                <option value="Hazardous">Hazardous</option>

                <option value="ODC">ODC</option>

                <option value="Reefer">Reefer</option>

                <option value="Tank">Tank</option>

                <option value="TankHaz">Tank_Haz</option>

                <option value="ReeferHaz">Reefer_Haz</option>

                <option value="FlatTrack">FlatTrack</option>

                <option value="ODC_HAZ">ODC_HAZ</option>

              </Input>
            </FormGroup>
          </Col>


        </Row>

        <Row>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="requestReferenceNo">
                Request Reference No
              </label>
              <Input
                className="form-control"
                type="text"
                id="requestReferenceNo"
                name='requestReferenceNo'
                value={backToTownData.requestReferenceNo}
                onChange={(e) => handleBacktotownChange(e)}
                maxLength={25}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="requestReferenceDate">
                Request Reference Date
              </label>
              <div style={{ position: 'relative' }}>
                <DatePicker
                  selected={backToTownData.requestReferenceDate}
                  onChange={(date) => setBackToTownData({
                    ...backToTownData,
                    requestReferenceDate: date
                  })}
                  name='requestReferenceDate'
                  id="requestReferenceDate"
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  wrapperClassName="custom-react-datepicker-wrapper"
                  customInput={
                    <input
                      style={{
                        height: "30px",
                        width: "100%",
                      }}
                    />

                  }

                />
                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
              </div>
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="exporterAddress">
                Exporter Address
              </label>
              <Input
                className="form-control"
                type="textarea"
                id="exporterAddress"
                name='exporterAddress'
                value={backToTownData.exporterAddress}
                disabled
              />
            </FormGroup>
          </Col>




        </Row>

        <Row className='text-center'>
          <Col>
            <button
              className="btn btn-outline-primary btn-margin newButton"
              style={{ marginRight: 10 }}
              id="submitbtn2"
              onClick={handleSave}
            >
              <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
              Save
            </button>
            <button
              className="btn btn-outline-danger btn-margin newButton"
              style={{ marginRight: 10 }}
              id="submitbtn2"
              onClick={handleClear}
            >
              <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
              Clear
            </button>

            {backToTownData.backToTownTransId && (

              <button
                className="btn btn-outline-primary btn-margin newButton"
                style={{ marginRight: 10 }}
                id="report"
                onClick={(e) => downLoadReport()}
              >
                <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
                Report
              </button>

            )}

          </Col>
        </Row>

        <div className="table-responsive mt-4">
          <Table className="table table-bordered table-hover tableHeader">
            <thead className="thead-dark bg-dark"  >
              <tr>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Back to Town Line Id</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Commodity</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Marks & Nos</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Total Package</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Balance Packages</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Back To Town Pkgs <span style={{ color: 'red' }}>*</span></th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Gross Weight</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>BTT Weight <span style={{ color: 'red' }}>*</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{backToTownData.backToTownLineId}</td>
                <td>{backToTownData.commodity}</td>
                <td>{backToTownData.numberOfMarks}</td>
                <td>{backToTownData.actualNoOfPackages}</td>
                <td>{backToTownData.balancePackages}</td>
                <td>
                  <Input
                    className={`form-control ${formErrors.backToTownPackages ? 'error-border' : ''}`}
                    type="text"
                    id="backToTownPackages"
                    name='backToTownPackages'
                    value={backToTownData.backToTownPackages}
                    onChange={(e) => handleBacktotownChange(e, 8, 0)}
                    style={{ width: 150 }}
                  />
                </td>
                <td>{backToTownData.grossWeight}</td>
                <td>
                  <Input
                    className={`form-control ${formErrors.backToTownWeight ? 'error-border' : ''}`}
                    type="text"
                    id="backToTownWeight"
                    name='backToTownWeight'
                    value={backToTownData.backToTownWeight}
                    onChange={(e) => handleBacktotownChange(e, 13, 3)}
                    style={{ width: 150 }}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default CargoBackToTown;
