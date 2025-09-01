// import AuthContext from "../Components/AuthProvider";
// import { useLocation, useNavigate } from "react-router-dom";
// import React, { useEffect, useState, useContext } from "react";
// import "../Components/Style.css";
// import Select from "react-select";
// import ipaddress from "../Components/IpAddress";
// import { Pagination } from 'react-bootstrap';
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
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import CreatableSelect from 'react-select/creatable';
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
//   faMoneyBillTransfer,
//   faPassport,
//   faCalculator,
// } from "@fortawesome/free-solid-svg-icons";
// import "../assets/css/style.css";
// import "../Components/Style.css";
// import { Button } from "react-bootstrap";
// import useAxios from "../Components/useAxios";
// import CFSService from "../service/CFSService";
// import { toast } from "react-toastify";
// import moment from "moment";
// import { error } from "jquery";

// function ExportGateOut({ searchData, resetFlag }) {
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


//   const [gateOutData, setGateOutData] = useState({
//     companyId: '',
//     branchId: '',
//     gateOutId: '',
//     erpDocRefNo: '',
//     docRefNo: '',
//     srNo: '',
//     profitcentreId: 'CFS Export',
//     transType: '',
//     gateOutDate: null,
//     shift: 'Day',
//     gateNoOut: 'Gate01',
//     status: '',
//     createdBy: '',
//     gatePassNo: '',
//     gatePassDate: null,
//     vehicleNo: '',
//     driverName: '',
//     transporterStatus: '',
//     transporterName: '',
//     sl: '',
//     comments: ''
//   })

//   const [multipleGateOutData, setMultipleGateOutData] = useState([{
//     companyId: '',
//     branchId: '',
//     gatePassId: '',
//     srNo: '',
//     customsSealNo: '',
//     containerNo: '',
//     containerSize: '',
//     containerType: '',
//     pod: '',
//     grossWt: '',
//     pol: '',
//     viaNo: '',
//     vesselId: '',
//     sbNo: '',
//     sbDate: null,
//     backToTownPackages: '',
//     commodity: ''
//   }])

//   const [formErrors, setFormErrors] = useState({
//     shift: '',
//     gateNoOut: '',
//     gatePassNo: ''
//   })

//   const [gatePassSearchId, setGatePassSearchId] = useState('');
//   const [gatePassSearchName, setGatePassSearhName] = useState('');
//   const [gatePassSearchData, setGatePassSearchData] = useState([]);

//   const handleGateOutChange = (e) => {
//     const { name, value } = e.target;

//     setGateOutData(prev => ({
//       ...prev,
//       [name]: value
//     }))

//     setFormErrors(prevState => ({
//       ...prevState,
//       [name]: ''
//     }));
//   }

//   const [gateData, setGateData] = useState([]);

//   const getGateNo = () => {
//     const jarId = 'J00063';
//     axios.get(`${ipaddress}jardetail/getJarDetail?companyId=${companyid}&jarId=${jarId}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {

//         if (response.data.length === 0) {
//           setGateData([]);
//         }
//         else {
//           setGateData(response.data);
//         }

//       })
//       .catch((error) => {
//         setGateData([]);
//       })
//   }


//   useEffect(() => {

//     if (searchData.activeTab === 'P00223') {
//       getGateNo();
//     }
//   }, [searchData])

//   const handleGatePassSearch = async (selectedOption, { action }) => {

//     if (action === 'clear') {
//       setGatePassSearchId('');
//       setGatePassSearhName('');
//     }
//     else {
//       setGatePassSearchId(selectedOption.value);
//       setGatePassSearhName(selectedOption.label);
//       setFormErrors(prevState => ({
//         ...prevState,
//         gatePassNo: ''
//       }));
//       getGatePassSelectedData(selectedOption.value);
//     }

//   }

//   const getGatePassSelectedData = (val) => {
//     axios.get(`${ipaddress}exportGatePass/searchForGateOutSelectData?cid=${companyid}&bid=${branchId}&val=${val}`, {
//       headers: `Bearer${jwtToken}`
//     })
//       .then((response) => {
//         const data = response.data;
//         const singleData = data[0]

//         setGateOutData({
//           companyId: '',
//           branchId: '',
//           gateOutId: '',
//           erpDocRefNo: '',
//           docRefNo: '',
//           srNo: '',
//           profitcentreId: 'CFS Export',
//           transType: singleData.transType || '',
//           gateOutDate: null,
//           shift: 'Day',
//           gateNoOut: 'Gate01',
//           status: '',
//           createdBy: '',
//           gatePassNo: singleData.gatePassId || '',
//           gatePassDate: singleData.gatePassDate === null ? null : new Date(singleData.gatePassDate),
//           vehicleNo: singleData.vehicleNo || '',
//           driverName: singleData.driverName || '',
//           transporterStatus: singleData.transporterStatus || '',
//           transporterName: singleData.transporterName || '',
//           sl: singleData.sl || '',
//           comments: ''
//         })

//         setMultipleGateOutData(data.map((item) => ({
//           companyId: '',
//           branchId: '',
//           gatePassId: item.gatePassId || '',
//           srNo: item.srNo || '',
//           customsSealNo: item.customsSealNo || '',
//           containerNo: item.containerNo || '',
//           containerSize: item.containerSize || '',
//           containerType: item.containerType || '',
//           pod: item.pod || '',
//           grossWt: item.grossWt || '',
//           pol: item.pol || '',
//           viaNo: item.viaNo || '',
//           vesselId: item.vesselId || '',
//           sbNo: item.sbNo || '',
//           sbDate: item.sbDate === null ? null : new Date(item.sbDate),
//           backToTownPackages: item.backToTownPackages || '',
//           commodity: item.commodity || ''
//         })))

//       })
//       .catch((error) => {

//       })
//   }

//   const handleSearchGatePassData = (val) => {
//     if (val === '') {
//       setGatePassSearchData([]);
//       return;
//     }

//     axios.get(`${ipaddress}exportGatePass/searchForGateOut?cid=${companyid}&bid=${branchId}&val=${val}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {
//         const data = response.data;
//         const portOptions = data.map(port => ({
//           value: port[0],
//           label: port[0] + ' - ' + port[1],
//         }))
//         setGatePassSearchData(portOptions);
//       })
//       .catch((error) => {
//         setGatePassSearchData([]);
//       })
//   }


//   const handleClear = () => {
//     setGateOutData({
//       companyId: '',
//       branchId: '',
//       gateOutId: '',
//       erpDocRefNo: '',
//       docRefNo: '',
//       srNo: '',
//       profitcentreId: 'CFS Export',
//       transType: '',
//       gateOutDate: null,
//       shift: 'Day',
//       gateNoOut: 'Gate01',
//       status: '',
//       createdBy: '',
//       gatePassNo: '',
//       gatePassDate: null,
//       vehicleNo: '',
//       driverName: '',
//       transporterStatus: '',
//       transporterName: '',
//       sl: '',
//       comments: ''
//     })

//     setMultipleGateOutData([{
//       companyId: '',
//       branchId: '',
//       gatePassId: '',
//       srNo: '',
//       customsSealNo: '',
//       containerNo: '',
//       containerSize: '',
//       containerType: '',
//       pod: '',
//       grossWt: '',
//       pol: '',
//       viaNo: '',
//       vesselId: '',
//       sbNo: '',
//       sbDate: null,
//       backToTownPackages: '',
//       commodity: ''
//     }])

//     setFormErrors({
//       shift: '',
//       gateNoOut: '',
//       gatePassNo: ''
//     })

//     setGatePassSearhName('');
//     setGatePassSearchId('');
//     setGatePassSearchData([]);
//   }


//   const handleSave = () => {
//     setLoading(true);
//     setFormErrors({
//       shift: '',
//       gateNoOut: '',
//       gatePassNo: ''
//     })

//     let errors = {};

//     if (!gateOutData.shift) {
//       errors.shift = "Gate out shift is required."
//     }

//     if (!gateOutData.gateNoOut) {
//       errors.gateNoOut = "Gate no is required."
//     }

//     if (!gateOutData.gatePassNo) {
//       errors.gatePassNo = "Gate pass id is required."
//     }

//     if (Object.keys(errors).length > 0) {
//       setLoading(false);
//       setFormErrors(errors);
//       toast.error("Please fill in the required fields.", {
//         autoClose: 1000
//       })
//       return;
//     }

//     let finalData = [];

//     if (gateOutData.transType === 'CLP' || gateOutData.transType === 'PortRn') {
//       finalData = multipleGateOutData.filter(item => item.containerNo !== '');

//       if (finalData.length === 0) {
//         toast.error("Container data not found.", {
//           autoClose: 800
//         })
//         setLoading(false);
//         return;
//       }
//     }



//     if (gateOutData.transType === 'CRG') {
//       finalData = multipleGateOutData.filter(item => item.sbNo !== '');

//       if (finalData.length === 0) {
//         toast.error("SB data not found.", {
//           autoClose: 800
//         })
//         setLoading(false);
//         return;
//       }
//     }
// if (gateOutData.transType === 'Buffer') {
//       finalData = multipleGateOutData.filter(item => item.containerNo !== '');

//       if (finalData.length === 0) {
//         toast.error("Container data not found.", {
//           autoClose: 800
//         })
//         setLoading(false);
//         return;
//       }
//     }


//     const formData = {
//       gateOutData: gateOutData,
//       multipleGateOutData: finalData
//     }

//     axios.post(`${ipaddress}exportGatePass/saveGateOut?cid=${companyid}&bid=${branchId}&user=${userId}`, formData, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {
//         const data = response.data;

//         const out = data.gateOut;
//         const multipleOutData = data.multipleGateOutData;
//         const singleData = out[0];

//         toast.success("Data save successfully!!!", {
//           autoClose: 800
//         })

//         setGateOutData({
//           companyId: '',
//           branchId: '',
//           gateOutId: singleData.gateOutId || '',
//           erpDocRefNo: '',
//           docRefNo: '',
//           srNo: '',
//           profitcentreId: 'CFS Export',
//           transType: singleData.transType || '',
//           gateOutDate: singleData.gateOutDate === null ? null : new Date(singleData.gateOutDate),
//           shift: 'Day',
//           gateNoOut: singleData.gateNoOut || '',
//           status: singleData.status || '',
//           createdBy: singleData.createdBy || '',
//           gatePassNo: singleData.gatePassNo || '',
//           gatePassDate: singleData.gatePassDate === null ? null : new Date(singleData.gatePassDate),
//           vehicleNo: singleData.vehicleNo || '',
//           driverName: singleData.driverName || '',
//           transporterStatus: singleData.transporterStatus || '',
//           transporterName: singleData.transporterName || '',
//           sl: singleData.sl || '',
//           comments: singleData.comments || ''
//         })

//         setMultipleGateOutData(multipleOutData.map((item) => ({
//           companyId: '',
//           branchId: '',
//           gatePassId: item.gatePassId || '',
//           srNo: item.srNo || '',
//           customsSealNo: item.customsSealNo || '',
//           containerNo: item.containerNo || '',
//           containerSize: item.containerSize || '',
//           containerType: item.containerType || '',
//           pod: item.pod || '',
//           grossWt: item.grossWt || '',
//           pol: item.pol || '',
//           viaNo: item.viaNo || '',
//           vesselId: item.vesselId || '',
//           sbNo: item.sbNo || '',
//           sbDate: item.sbDate === null ? null : new Date(item.sbDate),
//           backToTownPackages: item.backToTownPackages || '',
//           commodity: item.commodity || ''
//         })))


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
//     axios.get(`${ipaddress}exportGatePass/searchGateOutData?cid=${companyid}&bid=${branchId}&val=${id}`, {
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


//   const getSelectedData = (id) => {
//     setLoading(true);

//     axios.get(`${ipaddress}exportGatePass/getSelectedGateOutData?cid=${companyid}&bid=${branchId}&val=${id}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {

//         const data = response.data;

//         const out = data.gateOut;
//         const multipleOutData = data.multipleGateOutData;
//         const singleData = out[0];

//         setGateOutData({
//           companyId: '',
//           branchId: '',
//           gateOutId: singleData.gateOutId || '',
//           erpDocRefNo: '',
//           docRefNo: '',
//           srNo: '',
//           profitcentreId: 'CFS Export',
//           transType: singleData.transType || '',
//           gateOutDate: singleData.gateOutDate === null ? null : new Date(singleData.gateOutDate),
//           shift: 'Day',
//           gateNoOut: singleData.gateNoOut || '',
//           status: singleData.status || '',
//           createdBy: singleData.createdBy || '',
//           gatePassNo: singleData.gatePassNo || '',
//           gatePassDate: singleData.gatePassDate === null ? null : new Date(singleData.gatePassDate),
//           vehicleNo: singleData.vehicleNo || '',
//           driverName: singleData.driverName || '',
//           transporterStatus: singleData.transporterStatus || '',
//           transporterName: singleData.transporterName || '',
//           sl: singleData.sl || '',
//           comments: singleData.comments || ''
//         })

//         setMultipleGateOutData(multipleOutData.map((item) => ({
//           companyId: '',
//           branchId: '',
//           gatePassId: item.gatePassId || '',
//           srNo: item.srNo || '',
//           customsSealNo: item.customsSealNo || '',
//           containerNo: item.containerNo || '',
//           containerSize: item.containerSize || '',
//           containerType: item.containerType || '',
//           pod: item.pod || '',
//           grossWt: item.grossWt || '',
//           pol: item.pol || '',
//           viaNo: item.viaNo || '',
//           vesselId: item.vesselId || '',
//           sbNo: item.sbNo || '',
//           sbDate: item.sbDate === null ? null : new Date(item.sbDate),
//           backToTownPackages: item.backToTownPackages || '',
//           commodity: item.commodity || ''
//         })))




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
//             icon={faCalculator}
//             style={{
//               marginRight: "8px",
//               color: "black", // Set the color to golden
//             }}
//           />
//           Export Gate Out Confirmation
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
//             /> Search Gate Out Data</h5>



//           </ModalHeader>
//           <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
//             <Row>
//               <Col md={4}>
//                 <FormGroup>
//                   <label className="forlabel bold-label" htmlFor="sbRequestId">
//                     Search by Gate Out Id / GatePass Id / Container No / Vehicle No
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
//                     <th scope="col">Gate Out No</th>
//                     <th scope="col">Gate Out Date</th>
//                     <th scope="col">Gate Pass Id</th>
//                     <th scope="col">Gate Pass Date</th>
//                     <th scope="col">Container No</th>
//                     <th scope="col">Vehicle No</th>

//                   </tr>
//                   <tr className='text-center'>
//                     <th scope="col"></th>
//                     <th scope="col">{gateInSearchData.length}</th>
//                     <th scope="col"></th>
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
//                         <input type="radio" onChange={() => getSelectedData(item[0])} name="radioGroup" />
//                       </td>
//                       <td>{item[0]}</td>
//                       <td>{item[1]}</td>
//                       <td>{item[2]}</td>
//                       <td>{item[3]}</td>
//                       <td>{item[4]}</td>
//                       <td>{item[5]}</td>
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
//           <Col md={4}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Search By Gate Pass Id / Container No
//               </label>
//               <Select
//                 value={{ value: gatePassSearchId, label: gatePassSearchName }}
//                 options={gatePassSearchData}
//                 onChange={handleGatePassSearch}
//                 onInputChange={handleSearchGatePassData}
//                 placeholder="Search By Gate Pass Id/Container No"
//                 isClearable
//                 id="gatePassSearchId"
//                 name='gatePassSearchId'
//                 className={`autocompleteHeight`}
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
//             </FormGroup>
//           </Col>
//         </Row>
//         <Row>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="createdBy">
//                 Gate Out No
//               </label>
//               <Row>
//                 <Col md={9}>
//                   <Input
//                     className="form-control"
//                     type="text"
//                     id="gateOutId"
//                     name='gateOutId'
//                     value={gateOutData.gateOutId}
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
//               <label className="forlabel bold-label" htmlFor="createdBy">
//                 Gate Out Date
//               </label>
//               <div style={{ position: 'relative' }}>
//                 <DatePicker
//                   selected={gateOutData.gateOutDate}
//                   name='gateOutDate'
//                   id="gateOutDate"
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
//           {/* <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="createdBy">
//                 Gate Out Shift <span style={{ color: 'red' }}>*</span>
//               </label>
//               <Input
//                 className={`form-control ${formErrors.shift ? 'error-border' : ''}`}
//                 type="select"
//                 id="shift"
//                 name='shift'
//                 value={gateOutData.shift}
//                 onChange={handleGateOutChange}
//               >
//                 <option value="Day">Day</option>
//                 <option value="Night">Night</option>
//                 <option value="Third">Third</option>
//               </Input>
//               <div style={{ color: 'red' }} className="error-message">{formErrors.shift}</div>
//             </FormGroup>
//           </Col> */}
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="createdBy">
//                 Gate No <span style={{ color: 'red' }}>*</span>
//               </label>
//               <Input
//                 className={`form-control ${formErrors.gateNoOut ? 'error-border' : ''}`}
//                 type="select"
//                 id="gateNoOut"
//                 name='gateNoOut'
//                 value={gateOutData.gateNoOut}
//                 onChange={handleGateOutChange}
//               >
//                 <option value="">Select Gate No</option>
//                 {gateData.map((item, index) => (
//                   <option key={index} value={item[0]}>{item[1]}</option>
//                 ))}
//               </Input>
//               <div style={{ color: 'red' }} className="error-message">{formErrors.gateNoOut}</div>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="createdBy">
//                 Profitcentre Id
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="profitcentreId"
//                 name='profitcentreId'
//                 value={gateOutData.profitcentreId}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="createdBy">
//                 Status
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="status"
//                 name='status'
//                 value={gateOutData.status === 'A' ? 'Approved' : gateOutData.status}
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
//                 value={gateOutData.createdBy}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//         </Row>
//         <Row>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="createdBy">
//                 Gate Pass Id <span style={{ color: 'red' }}>*</span>
//               </label>
//               <Input
//                 className={`form-control ${formErrors.gatePassNo ? 'error-border' : ''}`}
//                 type="text"
//                 id="gatePassNo"
//                 name='gatePassNo'
//                 value={gateOutData.gatePassNo}
//                 disabled
//               />
//               <div style={{ color: 'red' }} className="error-message">{formErrors.gatePassNo}</div>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="createdBy">
//                 Gate Pass Date
//               </label>
//               <div style={{ position: 'relative' }}>
//                 <DatePicker
//                   selected={gateOutData.gatePassDate}
//                   name='gatePassDate'
//                   id="gatePassDate"
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
//               <label className="forlabel bold-label" htmlFor="createdBy">
//                 Vehicle No
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="vehicleNo"
//                 name='vehicleNo'
//                 value={gateOutData.vehicleNo}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="createdBy">
//                 Driver
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="driverName"
//                 name='driverName'
//                 value={gateOutData.driverName}
//                 disabled
//               />
//             </FormGroup>
//           </Col>

//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="createdBy">
//                 Trans Type
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="transType"
//                 name='transType'
//                 value={gateOutData.transType}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="createdBy">
//                 Shipping Line
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="sl"
//                 name='sl'
//                 value={gateOutData.sl}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//         </Row>
//         <Row>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="createdBy">
//                 Transporter Status
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="transporterStatus"
//                 name='transporterStatus'
//                 value={gateOutData.transporterStatus}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="createdBy">
//                 Transporter
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="transporterName"
//                 name='transporterName'
//                 value={gateOutData.transporterName}
//                 disabled
//               />
//             </FormGroup>
//           </Col>

//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="createdBy">
//                 Remarks
//               </label>
//               <Input
//                 className="form-control"
//                 type="textarea"
//                 id="comments"
//                 name='comments'
//                 value={gateOutData.comments}
//                 onChange={handleGateOutChange}
//                 maxLength={150}
//               />
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
//               disabled={gateOutData.gateOutId !== ''}
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
//         {(gateOutData.transType === 'CLP' || gateOutData.transType === 'PortRn' || gateOutData.transType === 'Buffer') && (
//           <div className="table-responsive mt-4">
//             <Table className="table table-bordered table-hover tableHeader">
//               <thead className="thead-dark bg-dark"  >
//                 <tr>
//                   <th scope="col" className="text-center" style={{ color: 'black' }}>Sr No</th>
//                   <th scope="col" className="text-center" style={{ color: 'black' }}>Container No</th>
//                   <th scope="col" className="text-center" style={{ color: 'black' }}>Cont Size&Type</th>
//                   <th scope="col" className="text-center" style={{ color: 'black' }}>Gross Wt</th>
//                   <th scope="col" className="text-center" style={{ color: 'black' }}>Customs Seal No</th>
//                   <th scope="col" className="text-center" style={{ color: 'black' }}>POL</th>
//                   <th scope="col" className="text-center" style={{ color: 'black' }}>POD</th>
//                   <th scope="col" className="text-center" style={{ color: 'black' }}>Vessel</th>
//                   <th scope="col" className="text-center" style={{ color: 'black' }}>Via No</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {multipleGateOutData.map((item, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{item.containerNo}</td>
//                     <td>{item.containerSize}{item.containerType}</td>
//                     <td>{item.grossWt}</td>
//                     <td>{item.customsSealNo}</td>
//                     <td>{item.pol}</td>
//                     <td>{item.pod}</td>
//                     <td>{item.vesselId}</td>
//                     <td>{item.viaNo}</td>
//                   </tr>
//                 ))}

//               </tbody>
//             </Table>
//           </div>
//         )}


//         {gateOutData.transType === 'CRG' && (
//           <div className="table-responsive mt-4">
//             <Table className="table table-bordered table-hover tableHeader">
//               <thead className="thead-dark bg-dark"  >
//                 <tr>
//                   <th scope="col" className="text-center" style={{ color: 'black' }}>Sr No</th>
//                   <th scope="col" className="text-center" style={{ color: 'black' }}>SB No</th>
//                   <th scope="col" className="text-center" style={{ color: 'black', width: 150 }}>SB Date</th>
//                   <th scope="col" className="text-center" style={{ color: 'black' }}>Commodity</th>
//                   <th scope="col" className="text-center" style={{ color: 'black', width: 150 }}>Qty Taken Out</th>
//                 </tr>
//               </thead>
//               <tbody className="text-center">
//                 {multipleGateOutData.map((item, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{item.sbNo}</td>
//                     <td>
//                       <div style={{ position: 'relative', width: 150 }}>
//                         <DatePicker
//                           selected={item.sbDate}
//                           name='sbDate'
//                           id="sbDate"
//                           dateFormat="dd/MM/yyyy HH:mm"
//                           className="form-control"
//                           disabled
//                           wrapperClassName="custom-react-datepicker-wrapper"
//                           customInput={
//                             <input
//                               style={{
//                                 height: "30px",
//                                 width: "100%",
//                               }}
//                             />

//                           }

//                         />
//                         <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
//                       </div>
//                     </td>
//                     <td>{item.commodity}</td>
//                     <td>{item.backToTownPackages}</td>
//                   </tr>
//                 ))}

//               </tbody>
//             </Table>
//           </div>
//         )}
//       </div >
//     </>
//   );
// }

// export default ExportGateOut;




import AuthContext from "../Components/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import Select from "react-select";
import ipaddress from "../Components/IpAddress";
import { Pagination } from 'react-bootstrap';
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreatableSelect from 'react-select/creatable';
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
  faMoneyBillTransfer,
  faPassport,
  faCalculator,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/style.css";
import "../Components/Style.css";
import { Button } from "react-bootstrap";
import useAxios from "../Components/useAxios";
import CFSService from "../service/CFSService";
import { toast } from "react-toastify";
import moment from "moment";
import { error } from "jquery";

function ExportGateOut({ searchData, resetFlag , updatePagesList}) {
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

  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const processId = 'P00223';


  useEffect(() => {
    if (searchData && searchData.activeTab === processId && searchData.profitCenterId && searchData.gateOutId && searchData.containerNo) {
      getSelectedData(searchData.gateOutId);
    }
  }, [searchData]);
  useEffect(() => {

    if (resetFlag) {
      handleClear();
    }    
  }, [resetFlag]);











  const foundRights =
    role !== "ROLE_ADMIN"
      ? userRights.find((item) => item.process_Id === processId)
      : null;
  const allowCreate = foundRights?.allow_Create === "Y";
  const allowRead = foundRights?.allow_Read === "Y";
  const allowEdit = foundRights?.allow_Update === "Y";
  const allowDelete = foundRights?.allow_Delete === "Y";


  const [gateOutData, setGateOutData] = useState({
    companyId: '',
    branchId: '',
    gateOutId: '',
    erpDocRefNo: '',
    docRefNo: '',
    srNo: '',
    profitcentreId: 'CFS Export',
    transType: '',
    gateOutDate: null,
    shift: 'Day',
    gateNoOut: 'Gate01',
    status: '',
    createdBy: '',
    gatePassNo: '',
    gatePassDate: null,
    vehicleNo: '',
    driverName: '',
    transporterStatus: '',
    transporterName: '',
    sl: '',
    comments: ''
  })

  const [multipleGateOutData, setMultipleGateOutData] = useState([{
    companyId: '',
    branchId: '',
    gatePassId: '',
    srNo: '',
    customsSealNo: '',
    containerNo: '',
    containerSize: '',
    containerType: '',
    pod: '',
    grossWt: '',
    pol: '',
    viaNo: '',
    vesselId: '',
    sbNo: '',
    sbDate: null,
    backToTownPackages: '',
    commodity: ''
  }])

  const [formErrors, setFormErrors] = useState({
    shift: '',
    gateNoOut: '',
    gatePassNo: ''
  })

  const [gatePassSearchId, setGatePassSearchId] = useState('');
  const [gatePassSearchName, setGatePassSearhName] = useState('');
  const [gatePassSearchData, setGatePassSearchData] = useState([]);

  const handleGateOutChange = (e) => {
    const { name, value } = e.target;

    setGateOutData(prev => ({
      ...prev,
      [name]: value
    }))

    setFormErrors(prevState => ({
      ...prevState,
      [name]: ''
    }));
  }

  const [gateData, setGateData] = useState([]);

  const getGateNo = () => {
    const jarId = 'J00063';
    axios.get(`${ipaddress}jardetail/getJarDetail?companyId=${companyid}&jarId=${jarId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {

        if (response.data.length === 0) {
          setGateData([]);
        }
        else {
          setGateData(response.data);
        }

      })
      .catch((error) => {
        setGateData([]);
      })
  }


  useEffect(() => {

    if (searchData.activeTab === 'P00223') {
      getGateNo();
    }
  }, [searchData])

  const handleGatePassSearch = async (selectedOption, { action }) => {

    if (action === 'clear') {
      setGatePassSearchId('');
      setGatePassSearhName('');
    }
    else {
      setGatePassSearchId(selectedOption.value);
      setGatePassSearhName(selectedOption.label);
      setFormErrors(prevState => ({
        ...prevState,
        gatePassNo: ''
      }));
      getGatePassSelectedData(selectedOption.value);
    }

  }

  const getGatePassSelectedData = (val) => {
    axios.get(`${ipaddress}exportGatePass/searchForGateOutSelectData?cid=${companyid}&bid=${branchId}&val=${val}`, {
      headers: `Bearer${jwtToken}`
    })
      .then((response) => {
        const data = response.data;
        const singleData = data[0]

        setGateOutData({
          companyId: '',
          branchId: '',
          gateOutId: '',
          erpDocRefNo: '',
          docRefNo: '',
          srNo: '',
          profitcentreId: 'CFS Export',
          transType: singleData.transType || '',
          gateOutDate: null,
          shift: 'Day',
          gateNoOut: 'Gate01',
          status: '',
          createdBy: '',
          gatePassNo: singleData.gatePassId || '',
          gatePassDate: singleData.gatePassDate === null ? null : new Date(singleData.gatePassDate),
          vehicleNo: singleData.vehicleNo || '',
          driverName: singleData.driverName || '',
          transporterStatus: singleData.transporterStatus || '',
          transporterName: singleData.transporterName || '',
          sl: singleData.sl || '',
          comments: ''
        })

        setMultipleGateOutData(data.map((item) => ({
          companyId: '',
          branchId: '',
          gatePassId: item.gatePassId || '',
          srNo: item.srNo || '',
          customsSealNo: item.customsSealNo || '',
          containerNo: item.containerNo || '',
          containerSize: item.containerSize || '',
          containerType: item.containerType || '',
          pod: item.pod || '',
          grossWt: item.grossWt || '',
          pol: item.pol || '',
          viaNo: item.viaNo || '',
          vesselId: item.vesselId || '',
          sbNo: item.sbNo || '',
          sbDate: item.sbDate === null ? null : new Date(item.sbDate),
          backToTownPackages: item.backToTownPackages || '',
          commodity: item.commodity || ''
        })))

      })
      .catch((error) => {

      })
  }

  const handleSearchGatePassData = (val) => {
    if (val === '') {
      setGatePassSearchData([]);
      return;
    }

    axios.get(`${ipaddress}exportGatePass/searchForGateOut?cid=${companyid}&bid=${branchId}&val=${val}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;
        const portOptions = data.map(port => ({
          value: port[0],
          label: port[0] + ' - ' + port[1],
        }))
        setGatePassSearchData(portOptions);
      })
      .catch((error) => {
        setGatePassSearchData([]);
      })
  }


  const handleClear = () => {
    setGateOutData({
      companyId: '',
      branchId: '',
      gateOutId: '',
      erpDocRefNo: '',
      docRefNo: '',
      srNo: '',
      profitcentreId: 'CFS Export',
      transType: '',
      gateOutDate: null,
      shift: 'Day',
      gateNoOut: 'Gate01',
      status: '',
      createdBy: '',
      gatePassNo: '',
      gatePassDate: null,
      vehicleNo: '',
      driverName: '',
      transporterStatus: '',
      transporterName: '',
      sl: '',
      comments: ''
    })

    setMultipleGateOutData([{
      companyId: '',
      branchId: '',
      gatePassId: '',
      srNo: '',
      customsSealNo: '',
      containerNo: '',
      containerSize: '',
      containerType: '',
      pod: '',
      grossWt: '',
      pol: '',
      viaNo: '',
      vesselId: '',
      sbNo: '',
      sbDate: null,
      backToTownPackages: '',
      commodity: ''
    }])

    setFormErrors({
      shift: '',
      gateNoOut: '',
      gatePassNo: ''
    })

    setGatePassSearhName('');
    setGatePassSearchId('');
    setGatePassSearchData([]);
  }


  const handleSave = () => {
    setLoading(true);
    setFormErrors({
      shift: '',
      gateNoOut: '',
      gatePassNo: ''
    })

    let errors = {};

    if (!gateOutData.shift) {
      errors.shift = "Gate out shift is required."
    }

    if (!gateOutData.gateNoOut) {
      errors.gateNoOut = "Gate no is required."
    }

    if (!gateOutData.gatePassNo) {
      errors.gatePassNo = "Gate pass id is required."
    }

    if (Object.keys(errors).length > 0) {
      setLoading(false);
      setFormErrors(errors);
      toast.error("Please fill in the required fields.", {
        autoClose: 1000
      })
      return;
    }

    let finalData = [];

    if (gateOutData.transType === 'CONT' || gateOutData.transType === 'MOVE') {
      finalData = multipleGateOutData.filter(item => item.containerNo !== '');

      if (finalData.length === 0) {
        toast.error("Container data not found.", {
          autoClose: 800
        })
        setLoading(false);
        return;
      }
    }



    if (gateOutData.transType === 'CRG') {
      finalData = multipleGateOutData.filter(item => item.sbNo !== '');

      if (finalData.length === 0) {
        toast.error("SB data not found.", {
          autoClose: 800
        })
        setLoading(false);
        return;
      }
    }
if (gateOutData.transType === 'BOWC') {
      finalData = multipleGateOutData.filter(item => item.containerNo !== '');

      if (finalData.length === 0) {
        toast.error("Container data not found.", {
          autoClose: 800
        })
        setLoading(false);
        return;
      }
    }


    const formData = {
      gateOutData: gateOutData,
      multipleGateOutData: finalData
    }

    axios.post(`${ipaddress}exportGatePass/saveGateOut?cid=${companyid}&bid=${branchId}&user=${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;

        const out = data.gateOut;
        const multipleOutData = data.multipleGateOutData;
        const singleData = out[0];

        toast.success("Data save successfully!!!", {
          autoClose: 800
        })

        setGateOutData({
          companyId: '',
          branchId: '',
          gateOutId: singleData.gateOutId || '',
          erpDocRefNo: '',
          docRefNo: '',
          srNo: '',
          profitcentreId: 'CFS Export',
          transType: singleData.transType || '',
          gateOutDate: singleData.gateOutDate === null ? null : new Date(singleData.gateOutDate),
          shift: 'Day',
          gateNoOut: singleData.gateNoOut || '',
          status: singleData.status || '',
          createdBy: singleData.createdBy || '',
          gatePassNo: singleData.gatePassNo || '',
          gatePassDate: singleData.gatePassDate === null ? null : new Date(singleData.gatePassDate),
          vehicleNo: singleData.vehicleNo || '',
          driverName: singleData.driverName || '',
          transporterStatus: singleData.transporterStatus || '',
          transporterName: singleData.transporterName || '',
          sl: singleData.sl || '',
          comments: singleData.comments || ''
        })

        setMultipleGateOutData(multipleOutData.map((item) => ({
          companyId: '',
          branchId: '',
          gatePassId: item.gatePassId || '',
          srNo: item.srNo || '',
          customsSealNo: item.customsSealNo || '',
          containerNo: item.containerNo || '',
          containerSize: item.containerSize || '',
          containerType: item.containerType || '',
          pod: item.pod || '',
          grossWt: item.grossWt || '',
          pol: item.pol || '',
          viaNo: item.viaNo || '',
          vesselId: item.vesselId || '',
          sbNo: item.sbNo || '',
          sbDate: item.sbDate === null ? null : new Date(item.sbDate),
          backToTownPackages: item.backToTownPackages || '',
          commodity: item.commodity || ''
        })))


        if (searchData && (searchData.sbNo || searchData.container)
        ) {
          updatePagesList("P00223");
        }


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
    axios.get(`${ipaddress}exportGatePass/searchGateOutData?cid=${companyid}&bid=${branchId}&val=${id}`, {
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


  const getSelectedData = (id) => {
    setLoading(true);

    axios.get(`${ipaddress}exportGatePass/getSelectedGateOutData?cid=${companyid}&bid=${branchId}&val=${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {

        const data = response.data;

        const out = data.gateOut;
        const multipleOutData = data.multipleGateOutData;
        const singleData = out[0];

        setGateOutData({
          companyId: '',
          branchId: '',
          gateOutId: singleData.gateOutId || '',
          erpDocRefNo: '',
          docRefNo: '',
          srNo: '',
          profitcentreId: 'CFS Export',
          transType: singleData.transType || '',
          gateOutDate: singleData.gateOutDate === null ? null : new Date(singleData.gateOutDate),
          shift: 'Day',
          gateNoOut: singleData.gateNoOut || '',
          status: singleData.status || '',
          createdBy: singleData.createdBy || '',
          gatePassNo: singleData.gatePassNo || '',
          gatePassDate: singleData.gatePassDate === null ? null : new Date(singleData.gatePassDate),
          vehicleNo: singleData.vehicleNo || '',
          driverName: singleData.driverName || '',
          transporterStatus: singleData.transporterStatus || '',
          transporterName: singleData.transporterName || '',
          sl: singleData.sl || '',
          comments: singleData.comments || ''
        })

        setMultipleGateOutData(multipleOutData.map((item) => ({
          companyId: '',
          branchId: '',
          gatePassId: item.gatePassId || '',
          srNo: item.srNo || '',
          customsSealNo: item.customsSealNo || '',
          containerNo: item.containerNo || '',
          containerSize: item.containerSize || '',
          containerType: item.containerType || '',
          pod: item.pod || '',
          grossWt: item.grossWt || '',
          pol: item.pol || '',
          viaNo: item.viaNo || '',
          vesselId: item.vesselId || '',
          sbNo: item.sbNo || '',
          sbDate: item.sbDate === null ? null : new Date(item.sbDate),
          backToTownPackages: item.backToTownPackages || '',
          commodity: item.commodity || ''
        })))




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
            /> Search Gate Out Data</h5>



          </ModalHeader>
          <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
            <Row>
              <Col md={4}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="sbRequestId">
                    Search by Gate Out Id / GatePass Id / Container No / Vehicle No
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
                    <th scope="col">Gate Out No</th>
                    <th scope="col">Gate Out Date</th>
                    <th scope="col">Gate Pass Id</th>
                    <th scope="col">Gate Pass Date</th>
                    <th scope="col">Container No</th>
                    <th scope="col">Vehicle No</th>

                  </tr>
                  <tr className='text-center'>
                    <th scope="col"></th>
                    <th scope="col">{gateInSearchData.length}</th>
                    <th scope="col"></th>
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
                        <input type="radio" onChange={() => getSelectedData(item[0])} name="radioGroup" />
                      </td>
                      <td>{item[0]}</td>
                      <td>{item[1]}</td>
                      <td>{item[2]}</td>
                      <td>{item[3]}</td>
                      <td>{item[4]}</td>
                      <td>{item[5]}</td>
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
          <Col md={4}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Search By Gate Pass Id / Container No
              </label>
              <Select
                value={{ value: gatePassSearchId, label: gatePassSearchName }}
                options={gatePassSearchData}
                onChange={handleGatePassSearch}
                onInputChange={handleSearchGatePassData}
                placeholder="Search By Gate Pass Id/Container No"
                isClearable
                id="gatePassSearchId"
                name='gatePassSearchId'
                className={`autocompleteHeight`}
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
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="createdBy">
                Gate Out No
              </label>
              <Row>
                <Col md={9}>
                  <Input
                    className="form-control"
                    type="text"
                    id="gateOutId"
                    name='gateOutId'
                    value={gateOutData.gateOutId}
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
                    <FontAwesomeIcon icon={faSearch} size="sm" />
                  </button>
                </Col>
              </Row>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="createdBy">
                Gate Out Date
              </label>
              <div style={{ position: 'relative' }}>
                <DatePicker
                  selected={gateOutData.gateOutDate}
                  name='gateOutDate'
                  id="gateOutDate"
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
          {/* <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="createdBy">
                Gate Out Shift <span style={{ color: 'red' }}>*</span>
              </label>
              <Input
                className={`form-control ${formErrors.shift ? 'error-border' : ''}`}
                type="select"
                id="shift"
                name='shift'
                value={gateOutData.shift}
                onChange={handleGateOutChange}
              >
                <option value="Day">Day</option>
                <option value="Night">Night</option>
                <option value="Third">Third</option>
              </Input>
              <div style={{ color: 'red' }} className="error-message">{formErrors.shift}</div>
            </FormGroup>
          </Col> */}
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="createdBy">
                Gate No <span style={{ color: 'red' }}>*</span>
              </label>
              <Input
                className={`form-control ${formErrors.gateNoOut ? 'error-border' : ''}`}
                type="select"
                id="gateNoOut"
                name='gateNoOut'
                value={gateOutData.gateNoOut}
                onChange={handleGateOutChange}
              >
                <option value="">Select Gate No</option>
                {gateData.map((item, index) => (
                  <option key={index} value={item[0]}>{item[1]}</option>
                ))}
              </Input>
              <div style={{ color: 'red' }} className="error-message">{formErrors.gateNoOut}</div>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="createdBy">
                Profitcentre Id
              </label>
              <Input
                className="form-control"
                type="text"
                id="profitcentreId"
                name='profitcentreId'
                value={gateOutData.profitcentreId}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="createdBy">
                Status
              </label>
              <Input
                className="form-control"
                type="text"
                id="status"
                name='status'
                value={gateOutData.status === 'A' ? 'Approved' : gateOutData.status}
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
                value={gateOutData.createdBy}
                disabled
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="createdBy">
                Gate Pass Id <span style={{ color: 'red' }}>*</span>
              </label>
              <Input
                className={`form-control ${formErrors.gatePassNo ? 'error-border' : ''}`}
                type="text"
                id="gatePassNo"
                name='gatePassNo'
                value={gateOutData.gatePassNo}
                disabled
              />
              <div style={{ color: 'red' }} className="error-message">{formErrors.gatePassNo}</div>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="createdBy">
                Gate Pass Date
              </label>
              <div style={{ position: 'relative' }}>
                <DatePicker
                  selected={gateOutData.gatePassDate}
                  name='gatePassDate'
                  id="gatePassDate"
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
              <label className="forlabel bold-label" htmlFor="createdBy">
                Vehicle No
              </label>
              <Input
                className="form-control"
                type="text"
                id="vehicleNo"
                name='vehicleNo'
                value={gateOutData.vehicleNo}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="createdBy">
                Driver
              </label>
              <Input
                className="form-control"
                type="text"
                id="driverName"
                name='driverName'
                value={gateOutData.driverName}
                disabled
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="createdBy">
                Trans Type
              </label>
              <Input
                className="form-control"
                type="text"
                id="transType"
                name='transType'
                value={gateOutData.transType}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="createdBy">
                Shipping Line
              </label>
              <Input
                className="form-control"
                type="text"
                id="sl"
                name='sl'
                value={gateOutData.sl}
                disabled
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="createdBy">
                Transporter Status
              </label>
              <Input
                className="form-control"
                type="text"
                id="transporterStatus"
                name='transporterStatus'
                value={gateOutData.transporterStatus}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="createdBy">
                Transporter
              </label>
              <Input
                className="form-control"
                type="text"
                id="transporterName"
                name='transporterName'
                value={gateOutData.transporterName}
                disabled
              />
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="createdBy">
                Remarks
              </label>
              <Input
                className="form-control"
                type="textarea"
                id="comments"
                name='comments'
                value={gateOutData.comments}
                onChange={handleGateOutChange}
                maxLength={150}
              />
            </FormGroup>
          </Col>

        </Row>
        <Row className='text-center'>
          <Col>
            <button
              className="btn btn-outline-primary btn-margin newButton"
              style={{ marginRight: 10, fontSize: 13 }}
              id="submitbtn2"
              onClick={handleSave}
              disabled={gateOutData.gateOutId !== ''}
            >
              <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
              Save
            </button>
            <button
              className="btn btn-outline-danger btn-margin newButton"
              style={{ marginRight: 10 , fontSize: 13}}
              id="submitbtn2"
              onClick={handleClear}
            >
              <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
              Clear
            </button>

          </Col>
        </Row>
        {(gateOutData.transType === 'CONT' || gateOutData.transType === 'MOVE' || gateOutData.transType === 'BOWC') && (
          <div className="table-responsive mt-4">
            <Table className="table table-bordered table-hover tableHeader">
              <thead className="thead-dark bg-dark"  >
                <tr>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>Sr No</th>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>Container No</th>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>Cont Size&Type</th>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>Gross Wt</th>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>Customs Seal No</th>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>POL</th>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>POD</th>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>Vessel</th>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>Via No</th>
                </tr>
              </thead>
              <tbody>
                {multipleGateOutData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.containerNo}</td>
                    <td>{item.containerSize}{item.containerType}</td>
                    <td>{item.grossWt}</td>
                    <td>{item.customsSealNo}</td>
                    <td>{item.pol}</td>
                    <td>{item.pod}</td>
                    <td>{item.vesselId}</td>
                    <td>{item.viaNo}</td>
                  </tr>
                ))}

              </tbody>
            </Table>
          </div>
        )}


        {gateOutData.transType === 'CRG' && (
          <div className="table-responsive mt-4">
            <Table className="table table-bordered table-hover tableHeader">
              <thead className="thead-dark bg-dark"  >
                <tr>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>Sr No</th>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>SB No</th>
                  <th scope="col" className="text-center" style={{ color: 'black', width: 150 }}>SB Date</th>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>Commodity</th>
                  <th scope="col" className="text-center" style={{ color: 'black', width: 150 }}>Qty Taken Out</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {multipleGateOutData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.sbNo}</td>
                    <td>
                      <div style={{ position: 'relative', width: 150 }}>
                        <DatePicker
                          selected={item.sbDate}
                          name='sbDate'
                          id="sbDate"
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
                    </td>
                    <td>{item.commodity}</td>
                    <td>{item.backToTownPackages}</td>
                  </tr>
                ))}

              </tbody>
            </Table>
          </div>
        )}
      </div >
    </>
  );
}

export default ExportGateOut;
