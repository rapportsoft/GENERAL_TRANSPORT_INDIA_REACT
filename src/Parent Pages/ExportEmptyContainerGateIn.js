// // import AuthContext from '../Components/AuthProvider';
// // import { useLocation, useNavigate } from 'react-router-dom';
// // import React, { useEffect, useState, useContext } from 'react';
// // import '../Components/Style.css';
// // import { Pagination } from 'react-bootstrap';
// // import Select from 'react-select';
// // import {
// //   Card,
// //   CardBody,
// //   Container,
// //   Row,
// //   Col,
// //   Form,
// //   FormGroup,
// //   Modal,
// //   ModalHeader,
// //   ModalBody,
// //   Label,
// //   Input,
// //   Table,
// // } from "reactstrap";
// // import DatePicker from "react-datepicker";
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faShip, faBackward, faCalendarAlt, faAdd, faPlaneDeparture, faCalculator, faTired, faWheatAwnCircleExclamation, faToriiGate } from '@fortawesome/free-solid-svg-icons';
// // import '../assets/css/style.css';
// // import '../Components/Style.css';
// // import { Button } from "react-bootstrap";
// // import useAxios from '../Components/useAxios';
// // import CFSService from '../service/CFSService';
// // import { toast } from 'react-toastify';
// // import ipaddress from "../Components/IpAddress";
// // import moment from 'moment';

// // function ExportEmptyContainerGateIn({ searchData, resetFlag }) {

// //   const navigate = useNavigate();
// //   const axios = useAxios();
// //   const { isAuthenticated } = useContext(AuthContext);

// //   // If the user is not authenticated, redirect to the login page
// //   useEffect(() => {
// //     if (!isAuthenticated) {

// //       navigate('/login?message=You need to be authenticated to access this page.');
// //     }
// //   }, [isAuthenticated, navigate]);

// //   const {
// //     jwtToken,
// //     userId,
// //     username,
// //     branchId,
// //     companyid,
// //     role,
// //     companyname,
// //     branchname,
// //     login,
// //     logout,
// //     userType,
// //     userRights
// //   } = useContext(AuthContext);


// //   const styles = {
// //     overlay: {
// //       position: 'fixed',
// //       top: 0,
// //       left: 0,
// //       width: '100%',
// //       height: '100%',
// //       backgroundColor: 'rgba(255, 255, 255, 0.8)',
// //       display: 'flex',
// //       justifyContent: 'center',
// //       alignItems: 'center',
// //       zIndex: 9999,
// //     },
// //   };

// //   const location = useLocation();
// //   const [loading, setLoading] = useState(false);
// //   const [errors, setErrors] = useState({});

// //   const queryParams = new URLSearchParams(location.search);
// //   const processId = queryParams.get('process_id');

// //   const foundRights = role !== 'ROLE_ADMIN' ? userRights.find(item => item.process_Id === processId) : null;
// //   const allowCreate = foundRights?.allow_Create === 'Y';
// //   const allowRead = foundRights?.allow_Read === 'Y';
// //   const allowEdit = foundRights?.allow_Update === 'Y';
// //   const allowDelete = foundRights?.allow_Delete === 'Y';


// //   const [gateIn, setGateIn] = useState({
// //     companyId: '',
// //     branchId: '',
// //     gateInId: '',
// //     finYear: new Date().getFullYear(),
// //     erpDocRefNo: '',
// //     docRefNo: '',
// //     lineNo: '',
// //     srNo: 0,
// //     docRefDate: null,
// //     profitcentreId: 'CFS Export',
// //     viaNo: '',
// //     containerNo: '',
// //     containerSize: '',
// //     isoCode: '',
// //     containerType: '',
// //     containerStatus: 'MTY',
// //     containerSealNo: '',
// //     tareWeight: '',
// //     sa: '',
// //     sl: '',
// //     containerHealth: '',
// //     transporterName: '',
// //     vehicleNo: '',
// //     driverName: '',
// //     comments: '',
// //     status: '',
// //     createdBy: '',
// //     jobOrderId: '',
// //     jobDate: null,
// //     inGateInDate: new Date(),
// //     deliveryOrderNo: '',
// //     deliveryOrderDate: null,
// //     doValidityDate: null,
// //     onAccountOf: '',
// //     origin: ''
// //   })

// //   const [formErrors, setFormErrors] = useState({
// //     containerNo: '',
// //     isoCode: '',
// //     tareWeight: '',
// //     vehicleNo: '',
// //     driverName: '',
// //     onAccountOf: '',
// //     sa: '',
// //     sl: ''
// //   })

// //   const [noCheckDigit, setNoCheckDigit] = useState('N');
// //   const [chaData, setChaData] = useState([]);
// //   const [partyName, setpartyName] = useState('');

// //   const searchChaData = (id) => {
// //     if (id === '') {
// //       setChaData([]);
// //       return;
// //     }
// //     axios.get(`${ipaddress}party/getAll?cid=${companyid}&bid=${branchId}&val=${id}`, {
// //       headers: {
// //         Authorization: `Bearer ${jwtToken}`
// //       }
// //     })
// //       .then((response) => {
// //         const portOptions = response.data.map(port => ({
// //           value: port[0],
// //           label: port[1],
// //           code: port[2]
// //         }))
// //         setChaData(portOptions);
// //       })
// //       .catch((error) => {
// //         setChaData([]);
// //       })
// //   }


// //   const handleOnAccounOfChange = async (selectedOption, { action }) => {
// //     if (action === 'clear') {
// //       setGateIn({
// //         ...gateIn,
// //         onAccountOf: ''
// //       })
// //       setpartyName('');
// //     }
// //     else {
// //       setGateIn({
// //         ...gateIn,
// //         onAccountOf: selectedOption.value
// //       })
// //       setpartyName(selectedOption.label);
// //       setFormErrors({
// //         ...formErrors,
// //         onAccountOf : ''
// //       })
// //     }
// //   }


// //   const handleContainerNoValidation1 = (containerNo) => {
// //     const containerNoUpper = containerNo.toUpperCase();
// //     console.log(containerNoUpper);

// //     let s = 0;
// //     let x = 0;

// //     // Char values mapping
// //     const charVal = {
// //       A: "10",
// //       B: "12",
// //       C: "13",
// //       D: "14",
// //       E: "15",
// //       F: "16",
// //       G: "17",
// //       H: "18",
// //       I: "19",
// //       J: "20",
// //       K: "21",
// //       L: "23",
// //       M: "24",
// //       N: "25",
// //       O: "26",
// //       P: "27",
// //       Q: "28",
// //       R: "29",
// //       S: "30",
// //       T: "31",
// //       U: "32",
// //       V: "34",
// //       W: "35",
// //       X: "36",
// //       Y: "37",
// //       Z: "38",
// //     };

// //     const len = containerNoUpper.length;

// //     if (len !== 11) {
// //       return false;
// //     } else {
// //       for (let i = 0; i < len - 1; i++) {
// //         const asciiVal = containerNoUpper.charCodeAt(i);
// //         if (asciiVal >= 65 && asciiVal <= 90) { // A-Z
// //           s += Math.pow(2, i) * parseInt(charVal[containerNoUpper.charAt(i)]);
// //         } else {
// //           s += Math.pow(2, i) * parseInt(containerNoUpper.charAt(i));
// //         }
// //       }

// //       x = s % 11;

// //       if (
// //         x === parseInt(containerNoUpper.charAt(len - 1)) ||
// //         (x === 10 && containerNoUpper.charAt(len - 1) === "0")
// //       ) {
// //         // Valid container number
// //         return true;
// //       } else {
// //         // Invalid container number
// //         return false;
// //       }
// //     }
// //   };

// //   function handleInputChange(e) {
// //     const inputValue = e;
// //     const numericInput = inputValue.replace(/[^0-9.]/g, '');
// //     const parts = numericInput.split('.');
// //     const integerPart = parts[0].slice(0, 12);
// //     let decimalPart = parts[1];

// //     // Limit decimal places if needed
// //     if (decimalPart !== undefined) {
// //       decimalPart = `.${decimalPart.slice(0, 3)}`;
// //     }

// //     const sanitizedInput = decimalPart !== undefined ? `${integerPart}${decimalPart}` : integerPart;
// //     return sanitizedInput;
// //   };

// //   const handleGateInChange = (e) => {
// //     const { name, value } = e.target;

// //     let sanitizedValue = value;


// //     if (['tareWeight'].includes(name)) {
// //       sanitizedValue = handleInputChange(sanitizedValue);
// //     }

// //     if (name === 'containerNo') 
// //     {
// //       if (value && noCheckDigit === 'N') {
// //         if (!handleContainerNoValidation1(value)) {
// //           setFormErrors((prevErrors) => ({
// //             ...prevErrors,
// //             [name]: "Invalid Container No.",
// //           }));

// //         }
// //         else {
// //           setFormErrors((prevErrors) => ({
// //             ...prevErrors,
// //             [name]: "",
// //           }));
// //         }
// //       }
// //       else {
// //         setFormErrors((prevErrors) => ({
// //           ...prevErrors,
// //           [name]: "",
// //         }));
// //       }
// //     }
// //     else {
// //       setFormErrors((prevErrors) => ({
// //         ...prevErrors,
// //         [name]: "",
// //       }));
// //     }

// //     setGateIn({
// //       ...gateIn,
// //       [name]: sanitizedValue,
// //     });



// //   };

// //   const [linerName, setLinerName] = useState('');
// //   const [agentName, setAgentName] = useState('');
// //   const [linerData, setLinerData] = useState([]);
// //   const [agentData, setAgentData] = useState([]);

// //   const handleClear = () => {
// //     setLinerName('');
// //     setAgentName('');
// //     setGateIn({
// //       companyId: '',
// //       branchId: '',
// //       gateInId: '',
// //       finYear: new Date().getFullYear(),
// //       erpDocRefNo: '',
// //       docRefNo: '',
// //       lineNo: '',
// //       srNo: 0,
// //       docRefDate: null,
// //       profitcentreId: 'CFS Export',
// //       viaNo: '',
// //       containerNo: '',
// //       containerSize: '',
// //       isoCode: '',
// //       containerType: '',
// //       containerStatus: 'MTY',
// //       containerSealNo: '',
// //       tareWeight: '',
// //       sa: '',
// //       sl: '',
// //       containerHealth: '',
// //       transporterName: '',
// //       vehicleNo: '',
// //       driverName: '',
// //       comments: '',
// //       status: '',
// //       createdBy: '',
// //       jobOrderId: '',
// //       jobDate: null,
// //       inGateInDate: new Date(),
// //       deliveryOrderNo: '',
// //       deliveryOrderDate: null,
// //       doValidityDate: null,
// //       onAccountOf: '',
// //       origin: ''
// //     })
// //     setFormErrors({
// //       containerNo: '',
// //       isoCode: '',
// //       tareWeight: '',
// //       vehicleNo: '',
// //       driverName: '',
// //       onAccountOf: '',
// //       sa: '',
// //       sl: ''
// //     })
// //     setNoCheckDigit('N');
// //     setpartyName('');
// //   }

// //   const [isoCodes, setIsoCodes] = useState([]);


// //   const getIsoContainers = () => {
// //     axios.get(`${ipaddress}IsoContainer/searchByIsoCode?companyId=${companyid}`, {
// //       headers: {
// //         Authorization: `Bearer ${jwtToken}`
// //       }
// //     })
// //       .then((response) => {
// //         const data = response.data;
// //         const portOptions = data.map(port => ({
// //           value: port.isoCode,
// //           label: port.isoCode,
// //           type: port.containerType,
// //           size: port.containerSize,
// //           wt: port.tareWeight
// //         }))
// //         setIsoCodes(portOptions);
// //       })
// //       .catch((error) => {

// //       })
// //   }

// //   useEffect(() => {
// //     if (searchData && searchData.activeTab === 'P00219') {
// //       getIsoContainers();
// //     }

// //   }, [searchData])

// //   const handleIsoChange = async (selectedOption, { action }) => {
// //     if (action === 'clear') {
// //       setGateIn({
// //         ...gateIn,
// //         isoCode: '',
// //         containerSize: '',
// //         containerType: '',
// //         tareWeight: ''
// //       })
// //     }
// //     else {
// //       setGateIn({
// //         ...gateIn,
// //         isoCode: selectedOption.value,
// //         containerSize: selectedOption.size,
// //         containerType: selectedOption.type,
// //         tareWeight: selectedOption.wt
// //       })

// //       setFormErrors((prevErrors) => ({
// //         ...prevErrors,
// //         isoCode: "",
// //         tareWeight: ""
// //       }));
// //     }
// //   }

// //   const getLinerData = (val) => {
// //     if (val === '') {
// //       setLinerData([]);
// //       return;
// //     }

// //     axios.get(`${ipaddress}party/getLiner?cid=${companyid}&bid=${branchId}&val=${val}`, {
// //       headers: {
// //         Authorization: `Bearer ${jwtToken}`
// //       }
// //     })
// //       .then((response) => {
// //         const data = response.data;
// //         const portOptions = data.map(port => ({
// //           value: port[0],
// //           label: port[1],
// //           code: port[2]
// //         }))
// //         setLinerData(portOptions);
// //       })
// //       .catch((error) => {

// //       })
// //   }


// //   const getAgentData = (val) => {
// //     if (val === '') {
// //       setAgentData([]);
// //       return;
// //     }

// //     axios.get(`${ipaddress}party/getAgent?cid=${companyid}&bid=${branchId}&val=${val}`, {
// //       headers: {
// //         Authorization: `Bearer ${jwtToken}`
// //       }
// //     })
// //       .then((response) => {
// //         const data = response.data;
// //         const portOptions = data.map(port => ({
// //           value: port[0],
// //           label: port[1],
// //           code: port[2]
// //         }))
// //         setAgentData(portOptions);
// //       })
// //       .catch((error) => {

// //       })
// //   }


// //   const handleLinerChange = async (selectedOption, { action }) => {

// //     if (action === 'clear') {
// //       setLinerName('');

// //       setGateIn({
// //         ...gateIn,
// //         sl: ''
// //       })
// //     }
// //     else {
// //       setLinerName(selectedOption ? selectedOption.label : '');
// //       setGateIn({
// //         ...gateIn,
// //         sl: selectedOption ? selectedOption.value : ''
// //       });
// //       setFormErrors({
// //         ...formErrors,
// //         sl : ''
// //       })
// //     }
// //   };

// //   const handleAgentChange = async (selectedOption, { action }) => {

// //     if (action === 'clear') {
// //       setAgentName('');
// //       setGateIn({
// //         ...gateIn,
// //         sa: ''
// //       })
// //     }
// //     else {
// //       setAgentName(selectedOption ? selectedOption.label : '');
// //       setGateIn({
// //         ...gateIn,
// //         sa: selectedOption ? selectedOption.value : ''
// //       })
// //       setFormErrors({
// //         ...formErrors,
// //         sa : ''
// //       })
// //     }
// //   };


// //   const handleSave = () => {
// //     setLoading(true);
// //     setFormErrors({
// //       containerNo: '',
// //       isoCode: '',
// //       tareWeight: '',
// //       vehicleNo: '',
// //       driverName: '',
// //       onAccountOf: '',
// //       sa: '',
// //       sl: ''
// //     })

// //     let errors = {};

// //     if (!gateIn.containerNo) {
// //       errors.containerNo = "Container no is required."
// //     }
// //     else {
// //       if (!handleContainerNoValidation1(gateIn.containerNo) && noCheckDigit === 'N') {
// //         errors.containerNo = "Invalid container no."
// //       }
// //     }
// //     if (!gateIn.isoCode) {
// //       errors.isoCode = "ISO is required."
// //     }

// //     if (!gateIn.tareWeight) {
// //       errors.tareWeight = "Tare weight is required."
// //     }

// //     if (!gateIn.vehicleNo) {
// //       errors.vehicleNo = "Vehicle no is required."
// //     }

// //     if (!gateIn.driverName) {
// //       errors.driverName = "Driver name is required."
// //     }
// //     if (!gateIn.onAccountOf) {
// //       errors.onAccountOf = "On account of is required."
// //     }
// //     if (!gateIn.sa) {
// //       errors.sa = "Shipping agent is required."
// //     }
// //     if (!gateIn.sl) {
// //       errors.sl = "Shipping line is required."
// //     }

// //     if (Object.keys(errors).length > 0) {
// //       setLoading(false);
// //       setFormErrors(errors);
// //       toast.error("Please fill in the required fields.", {
// //         autoClose: 1000
// //       })
// //       return;
// //     }

// //     axios.post(`${ipaddress}gateIn/saveExportEmptyContainer?cid=${companyid}&bid=${branchId}&user=${userId}`, gateIn, {
// //       headers: {
// //         Authorization: `Bearer ${jwtToken}`
// //       }
// //     })
// //       .then((response) => {

// //         const data = response.data;
// //         const gate = data.gateInData;

// //         if (!handleContainerNoValidation1(gate.containerNo)) {
// //           setNoCheckDigit('Y');
// //         }
// //         else {
// //           setNoCheckDigit('N');
// //         }

// //         setGateIn({
// //           companyId: gate.companyId || '',
// //           branchId: gate.branchId || '',
// //           gateInId: gate.gateInId || '',
// //           finYear: gate.finYear || new Date().getFullYear(),
// //           erpDocRefNo: gate.erpDocRefNo || '',
// //           docRefNo: gate.docRefNo || '',
// //           lineNo: gate.lineNo || '',
// //           srNo: gate.srNo || 0,
// //           docRefDate: gate.docRefDate === null ? null : new Date(gate.docRefDate),
// //           profitcentreId: 'CFS Export',
// //           viaNo: gate.viaNo || '',
// //           containerNo: gate.containerNo || '',
// //           containerSize: gate.containerSize || '',
// //           isoCode: gate.isoCode || '',
// //           containerType: gate.containerType || '',
// //           containerStatus: 'MTY',
// //           containerSealNo: gate.containerSealNo || '',
// //           tareWeight: gate.tareWeight || '',
// //           sa: gate.sa || '',
// //           sl: gate.sl || '',
// //           containerHealth: gate.containerHealth || '',
// //           transporterName: gate.transporterName || '',
// //           vehicleNo: gate.vehicleNo || '',
// //           driverName: gate.driverName || '',
// //           comments: gate.comments || '',
// //           status: gate.status || '',
// //           createdBy: gate.createdBy || '',
// //           jobOrderId: gate.jobOrderId || '',
// //           jobDate: gate.jobDate === null ? null : new Date(gate.jobDate),
// //           inGateInDate: gate.inGateInDate === null ? null : new Date(gate.inGateInDate),
// //           deliveryOrderNo: gate.deliveryOrderNo || '',
// //           deliveryOrderDate: gate.deliveryOrderDate === null ? null : new Date(gate.deliveryOrderDate),
// //           doValidityDate: gate.doValidityDate === null ? null : new Date(gate.doValidityDate),
// //           onAccountOf: gate.onAccountOf || '',
// //           origin: gate.origin || ''
// //         })

// //         setpartyName(data.onAccountOf);
// //         setAgentName(data.sa);
// //         setLinerName(data.sl);

// //         setLoading(false);

// //         toast.success("Data save successfully!!", {
// //           autoClose: 800
// //         })

// //       })
// //       .catch((error) => {

// //         setLoading(false);

// //         toast.error(error.response.data, {
// //           autoClose: 800
// //         })
// //       })



// //   }


// //   const [isModalOpenForSearchGateInData, setIsModalOpenForGateInData] = useState(false);
// //   const [searchId, setSearchId] = useState('');
// //   const [gateInSearchData, setGateInSearchData] = useState([]);

// //   const openGateInModal = () => {
// //     setIsModalOpenForGateInData(true);
// //     searchExportEmptyContainerGateIn('');
// //     setSearchId('');
// //   }

// //   const closeGateInModal = () => {
// //     setIsModalOpenForGateInData(false);
// //     setSearchId('');
// //     setGateInSearchData([]);
// //   }

// //   const searchExportEmptyContainerGateIn = (id) => {
// //     setLoading(true);
// //     axios.get(`${ipaddress}gateIn/searchExportEmptyContainerGateIn?cid=${companyid}&bid=${branchId}&search=${id}`, {
// //       headers: {
// //         Authorization: `Bearer ${jwtToken}`
// //       }
// //     })
// //       .then((response) => {
// //         setGateInSearchData(response.data);
// //         setLoading(false);
// //         toast.success("Data found successfully!!", {
// //           autoClose: 800
// //         })
// //       })
// //       .catch((error) => {
// //         setGateInSearchData([]);
// //         setLoading(false);
// //         toast.error(error.response.data, {
// //           autoClose: 800
// //         })
// //       })
// //   }

// //   const handleSearchClear = () => {
// //     searchExportEmptyContainerGateIn('');
// //     setSearchId('');
// //   }

// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [itemsPerPage] = useState(5);

// //   const indexOfLastItem = currentPage * itemsPerPage;
// //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //   const currentItems = gateInSearchData.slice(indexOfFirstItem, indexOfLastItem);
// //   const totalPages = Math.ceil(gateInSearchData.length / itemsPerPage);

// //   // Function to handle page change
// //   const handlePageChange = (page) => {
// //     if (page >= 1 && page <= totalPages) {
// //       setCurrentPage(page);
// //     }
// //   };
// //   const displayPages = () => {
// //     const centerPageCount = 5;
// //     const middlePage = Math.floor(centerPageCount / 2);
// //     let startPage = currentPage - middlePage;
// //     let endPage = currentPage + middlePage;

// //     if (startPage < 1) {
// //       startPage = 1;
// //       endPage = Math.min(totalPages, centerPageCount);
// //     }

// //     if (endPage > totalPages) {
// //       endPage = totalPages;
// //       startPage = Math.max(1, totalPages - centerPageCount + 1);
// //     }

// //     return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
// //   };


// //   const getExportSearchSelectedData = (id) => {
// //     setLoading(true);
// //     axios.get(`${ipaddress}gateIn/getExportSearchSelectedData?cid=${companyid}&bid=${branchId}&gateInId=${id}`, {
// //       headers: {
// //         Authorization: `Bearer ${jwtToken}`
// //       }
// //     })
// //       .then((response) => {
// //         const data = response.data;
// //         const gate = data.gateInData;

// //         if (!handleContainerNoValidation1(gate.containerNo)) {
// //           setNoCheckDigit('Y');
// //         }
// //         else {
// //           setNoCheckDigit('N');
// //         }

// //         setGateIn({
// //           companyId: gate.companyId || '',
// //           branchId: gate.branchId || '',
// //           gateInId: gate.gateInId || '',
// //           finYear: gate.finYear || new Date().getFullYear(),
// //           erpDocRefNo: gate.erpDocRefNo || '',
// //           docRefNo: gate.docRefNo || '',
// //           lineNo: gate.lineNo || '',
// //           srNo: gate.srNo || 0,
// //           docRefDate: gate.docRefDate === null ? null : new Date(gate.docRefDate),
// //           profitcentreId: 'CFS Export',
// //           viaNo: gate.viaNo || '',
// //           containerNo: gate.containerNo || '',
// //           containerSize: gate.containerSize || '',
// //           isoCode: gate.isoCode || '',
// //           containerType: gate.containerType || '',
// //           containerStatus: 'MTY',
// //           containerSealNo: gate.containerSealNo || '',
// //           tareWeight: gate.tareWeight || '',
// //           sa: gate.sa || '',
// //           sl: gate.sl || '',
// //           containerHealth: gate.containerHealth || '',
// //           transporterName: gate.transporterName || '',
// //           vehicleNo: gate.vehicleNo || '',
// //           driverName: gate.driverName || '',
// //           comments: gate.comments || '',
// //           status: gate.status || '',
// //           createdBy: gate.createdBy || '',
// //           jobOrderId: gate.jobOrderId || '',
// //           jobDate: gate.jobDate === null ? null : new Date(gate.jobDate),
// //           inGateInDate: gate.inGateInDate === null ? null : new Date(gate.inGateInDate),
// //           deliveryOrderNo: gate.deliveryOrderNo || '',
// //           deliveryOrderDate: gate.deliveryOrderDate === null ? null : new Date(gate.deliveryOrderDate),
// //           doValidityDate: gate.doValidityDate === null ? null : new Date(gate.doValidityDate),
// //           onAccountOf: gate.onAccountOf || '',
// //           origin: gate.origin || ''
// //         })

// //         setpartyName(data.onAccountOf);
// //         setAgentName(data.sa);
// //         setLinerName(data.sl);

// //         setLoading(false);

// //         toast.success("Data found successfully!!", {
// //           autoClose: 800
// //         })
// //         closeGateInModal();
// //       })
// //       .catch((error) => {
// //         toast.error(error.response.data, {
// //           autoClose: 800
// //         })
// //         setLoading(false);
// //       })
// //   }


// //   return (
// //     <>
// //       {loading && (
// //         <div className="loader" style={styles.overlay}>
// //           <div className="truckWrapper">
// //             <div className="truckBody">
// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 fill="none"
// //                 viewBox="0 0 198 93"
// //                 className="trucksvg"
// //               >
// //                 <path
// //                   strokeWidth="3"
// //                   stroke="#282828"
// //                   fill="#F83D3D"
// //                   d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
// //                 ></path>
// //                 <path
// //                   strokeWidth="3"
// //                   stroke="#282828"
// //                   fill="#7D7C7C"
// //                   d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
// //                 ></path>
// //                 <path
// //                   strokeWidth="2"
// //                   stroke="#282828"
// //                   fill="#282828"
// //                   d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"
// //                 ></path>
// //                 <rect
// //                   strokeWidth="2"
// //                   stroke="#282828"
// //                   fill="#FFFCAB"
// //                   rx="1"
// //                   height="7"
// //                   width="5"
// //                   y="63"
// //                   x="187"
// //                 ></rect>
// //                 <rect
// //                   strokeWidth="2"
// //                   stroke="#282828"
// //                   fill="#282828"
// //                   rx="1"
// //                   height="11"
// //                   width="4"
// //                   y="81"
// //                   x="193"
// //                 ></rect>
// //                 <rect
// //                   strokeWidth="3"
// //                   stroke="#282828"
// //                   fill="#DFDFDF"
// //                   rx="2.5"
// //                   height="90"
// //                   width="121"
// //                   y="1.5"
// //                   x="6.5"
// //                 ></rect>
// //                 <rect
// //                   strokeWidth="2"
// //                   stroke="#282828"
// //                   fill="#DFDFDF"
// //                   rx="2"
// //                   height="4"
// //                   width="6"
// //                   y="84"
// //                   x="1"
// //                 ></rect>
// //               </svg>
// //             </div>
// //             <div className="truckTires">
// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 fill="none"
// //                 viewBox="0 0 30 30"
// //                 className="tiresvg"
// //               >
// //                 <circle
// //                   strokeWidth="3"
// //                   stroke="#282828"
// //                   fill="#282828"
// //                   r="13.5"
// //                   cy="15"
// //                   cx="15"
// //                 ></circle>
// //                 <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
// //               </svg>
// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 fill="none"
// //                 viewBox="0 0 30 30"
// //                 className="tiresvg"
// //               >
// //                 <circle
// //                   strokeWidth="3"
// //                   stroke="#282828"
// //                   fill="#282828"
// //                   r="13.5"
// //                   cy="15"
// //                   cx="15"
// //                 ></circle>
// //                 <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
// //               </svg>
// //             </div>
// //             <div className="road"></div>
// //             <svg
// //               xmlSpace="preserve"
// //               viewBox="0 0 453.459 453.459"
// //               xmlnsXlink="http://www.w3.org/1999/xlink"
// //               xmlns="http://www.w3.org/2000/svg"
// //               id="Capa_1"
// //               version="1.1"
// //               fill="#000000"
// //               className="lampPost"
// //             >
// //               <path
// //                 d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993
// //                       c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514
// //                       c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16
// //                       c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914
// //                       h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75
// //                       v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795
// //                       V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0z
// //                       M232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017
// //                       h78.747C231.693,100.736,232.77,106.162,232.77,111.694z"
// //               ></path>
// //             </svg>
// //           </div>
// //         </div>
// //       )}

// //       <div>

// //         {/* <h5
// //         className="pageHead"
// //         style={{
// //           fontFamily: "Your-Heading-Font",
// //           paddingLeft: "2%",
// //           paddingRight: "-20px",
// //         }}
// //       >
// //         {" "}
// //         <FontAwesomeIcon
// //           icon={faToriiGate}
// //           style={{
// //             marginRight: "8px",
// //             color: "black",
// //           }}
// //         />
// //         Export Empty Container Gate In
// //         <hr />
// //       </h5> */}
// //         <div>
// //           <Modal Modal isOpen={isModalOpenForSearchGateInData} onClose={closeGateInModal} toggle={closeGateInModal} style={{ maxWidth: '1200px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

// //             <ModalHeader toggle={closeGateInModal} style={{
// //               backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
// //               boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
// //               border: '1px solid rgba(0, 0, 0, 0.3)',
// //               borderRadius: '0',
// //               backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
// //               backgroundSize: 'cover',
// //               backgroundRepeat: 'no-repeat',
// //               //backgroundPosition: 'center',
// //               backgroundPosition: 'center',
// //             }} >


// //               <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', color: 'white' }} > <FontAwesomeIcon
// //                 icon={faSearch}
// //                 style={{
// //                   marginRight: '8px',
// //                   color: 'white', // Set the color to golden
// //                 }}
// //               /> Search Empty Container Gate In Data</h5>



// //             </ModalHeader>
// //             <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
// //               <Row>
// //                 <Col md={4}>
// //                   <FormGroup>
// //                     <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                       Search by Gate In Id / Container No / Vehicle No
// //                     </label>
// //                     <input
// //                       className="form-control"
// //                       type="text"
// //                       id="searchId"
// //                       name='searchId'
// //                       value={searchId}
// //                       onChange={(e) => setSearchId(e.target.value)}
// //                     />

// //                   </FormGroup>
// //                 </Col>
// //                 <Col md={4} style={{ marginTop: 20 }}>
// //                   <button
// //                     className="btn btn-outline-primary btn-margin newButton"
// //                     style={{ marginRight: 10, fontSize: 12 }}
// //                     id="submitbtn2"
// //                     onClick={() => searchExportEmptyContainerGateIn(searchId)}

// //                   >
// //                     <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
// //                     Search
// //                   </button>
// //                   <button
// //                     className="btn btn-outline-danger btn-margin newButton"
// //                     style={{ marginRight: 10, fontSize: 12 }}
// //                     id="submitbtn2"
// //                     onClick={handleSearchClear}
// //                   >
// //                     <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
// //                     Reset
// //                   </button>
// //                 </Col>
// //               </Row>
// //               <hr />

// //               <div className="mt-1 table-responsive ">
// //                 <table className="table table-bordered table-hover tableHeader">
// //                   <thead className='tableHeader'>
// //                     <tr>
// //                       <th scope="col">#</th>
// //                       <th scope="col">Gate In Id</th>
// //                       <th scope="col">Gate In date</th>
// //                       <th scope="col">Container No</th>
// //                       <th scope="col">Vehicle No</th>

// //                     </tr>
// //                     <tr className='text-center'>
// //                       <th scope="col"></th>
// //                       <th scope="col">{gateInSearchData.length}</th>
// //                       <th scope="col"></th>
// //                       <th scope="col"></th>
// //                       <th scope="col"></th>

// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {currentItems.map((item, index) => (
// //                       <tr key={index}>
// //                         <td>
// //                           <input type="radio" onChange={() => getExportSearchSelectedData(item[0])} name="radioGroup" value={item[0]} />
// //                         </td>
// //                         <td>{item[0]}</td>
// //                         <td>{item[1]}</td>
// //                         <td>{item[2]}</td>
// //                         <td>{item[3]}</td>

// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //                 <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
// //                   <Pagination.First onClick={() => handlePageChange(1)} />
// //                   <Pagination.Prev
// //                     onClick={() => handlePageChange(currentPage - 1)}
// //                     disabled={currentPage === 1}
// //                   />
// //                   <Pagination.Ellipsis />

// //                   {displayPages().map((pageNumber) => (
// //                     <Pagination.Item
// //                       key={pageNumber}
// //                       active={pageNumber === currentPage}
// //                       onClick={() => handlePageChange(pageNumber)}
// //                     >
// //                       {pageNumber}
// //                     </Pagination.Item>
// //                   ))}

// //                   <Pagination.Ellipsis />
// //                   <Pagination.Next
// //                     onClick={() => handlePageChange(currentPage + 1)}
// //                     disabled={currentPage === totalPages}
// //                   />
// //                   <Pagination.Last onClick={() => handlePageChange(totalPages)} />
// //                 </Pagination>
// //               </div>
// //             </ModalBody>
// //           </Modal>
// //           <Row>
// //             <Col md={2}>
// //               <FormGroup>
// //                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                   Gate In No
// //                 </label>
// //                 <Row>
// //                   <Col md={9}>
// //                     <Input
// //                       className="form-control"
// //                       type="text"
// //                       id="gateInId"
// //                       name='gateInId'
// //                       value={gateIn.gateInId}
// //                       disabled
// //                     />
// //                   </Col>
// //                   <Col md={3} className="d-flex justify-content-end">
// //                     <button
// //                       className="btn btn-outline-primary btn-margin newButton"
// //                       style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
// //                       id="submitbtn2"
// //                       onClick={openGateInModal}
// //                     >
// //                       <FontAwesomeIcon icon={faSearch} size="sm" s />
// //                     </button>
// //                   </Col>
// //                 </Row>
// //               </FormGroup>
// //             </Col>
// //             <Col md={2}>
// //               <FormGroup>
// //                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                   Gate In Date
// //                 </label>
// //                 <div style={{ position: 'relative' }}>
// //                   <DatePicker
// //                     selected={gateIn.inGateInDate}
// //                     name='inGateInDate'
// //                     id="inGateInDate"
// //                     dateFormat="dd/MM/yyyy HH:mm"
// //                     className="form-control"
// //                     disabled
// //                     wrapperClassName="custom-react-datepicker-wrapper"
// //                     customInput={
// //                       <input
// //                         style={{
// //                           height: "30px",
// //                           width: "100%",
// //                         }}
// //                       />

// //                     }

// //                   />
// //                   <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
// //                 </div>
// //               </FormGroup>
// //             </Col>
// //             <Col md={2}>
// //               <FormGroup>
// //                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                   On Account Of <span style={{ color: 'red' }}>*</span>
// //                 </label>
// //                 <Select
// //                   value={{ value: gateIn.onAccountOf, label: partyName }}
// //                   onChange={handleOnAccounOfChange}
// //                   onInputChange={searchChaData}
// //                   options={chaData}
// //                   placeholder="Select Party"
// //                   isClearable
// //                   id="onAccountOf"
// //                   name='onAccountOf'
// //                   className={`autocompleteHeight ${formErrors.onAccountOf ? 'error-border' : ''}`}
// //                   styles={{
// //                     control: (provided, state) => ({
// //                       ...provided,
// //                       height: 32, // Set height
// //                       minHeight: 32, // Set minimum height
// //                       border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
// //                       boxShadow: "none",
// //                       display: 'flex',
// //                       alignItems: 'center', // Align items vertically
// //                       padding: 0, // Remove padding to control height
// //                       "&:hover": {
// //                         border: "1px solid #ccc",
// //                       },
// //                       borderRadius: '6px', // Add border radius
// //                       "&:hover": {
// //                         border: "1px solid #ccc",
// //                       },
// //                     }),
// //                     valueContainer: (provided) => ({
// //                       ...provided,
// //                       height: '100%', // Full height of the control
// //                       display: 'flex',
// //                       alignItems: 'center', // Align items vertically
// //                       padding: '0 0.75rem', // Match padding
// //                     }),
// //                     singleValue: (provided) => ({
// //                       ...provided,
// //                       lineHeight: '32px', // Center text vertically
// //                     }),
// //                     indicatorSeparator: () => ({
// //                       display: "none",
// //                     }),
// //                     dropdownIndicator: () => ({
// //                       display: "none",
// //                     }),
// //                     placeholder: (provided) => ({
// //                       ...provided,
// //                       lineHeight: '32px', // Center placeholder text vertically
// //                       color: "gray",
// //                     }),
// //                     clearIndicator: (provided) => ({
// //                       ...provided,
// //                       padding: 2, // Remove padding
// //                       display: 'flex',
// //                       alignItems: 'center', // Align clear indicator vertically
// //                     }),
// //                   }}
// //                 />

// //               </FormGroup>
// //             </Col>
// //             <Col md={2}>
// //               <FormGroup>
// //                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                   No Check Digit
// //                 </label>
// //                 <Input
// //                   className="form-control"
// //                   type="select"
// //                   id="noCheckDigit"
// //                   name='noCheckDigit'
// //                   value={noCheckDigit}
// //                   onChange={(e) => {
// //                     setNoCheckDigit(e.target.value);

// //                     if (e.target.value === 'Y') {
// //                       setFormErrors((prevErrors) => ({
// //                         ...prevErrors,
// //                         ['containerNo']: "",
// //                       }));
// //                     }
// //                     else {
// //                       if (!handleContainerNoValidation1(gateIn.containerNo)) {
// //                         setFormErrors((prevErrors) => ({
// //                           ...prevErrors,
// //                           ['containerNo']: "Invalid Container No.",
// //                         }));

// //                       }
// //                     }
// //                   }}
// //                 >
// //                   <option value="N">No</option>
// //                   <option value="Y">Yes</option>
// //                 </Input>
// //               </FormGroup>
// //             </Col>
// //             <Col md={2}>
// //               <FormGroup>
// //                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                   Status
// //                 </label>
// //                 <Input
// //                   className="form-control"
// //                   type="text"
// //                   id="status"
// //                   name='status'
// //                   value={gateIn.status === 'A' ? 'Approved' : gateIn.status}
// //                   disabled
// //                 />
// //               </FormGroup>
// //             </Col>
// //             <Col md={2}>
// //               <FormGroup>
// //                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                   Created By
// //                 </label>
// //                 <Input
// //                   className="form-control"
// //                   type="text"
// //                   id="createdBy"
// //                   name='createdBy'
// //                   value={gateIn.createdBy}
// //                   disabled
// //                 />
// //               </FormGroup>
// //             </Col>
// //           </Row>
// //           <Row>
// //             <Col md={2}>
// //               <FormGroup>
// //                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                   Container No <span style={{ color: 'red' }}>*</span>
// //                 </label>
// //                 <Input
// //                   className={`form-control ${formErrors.containerNo ? 'error-border' : ''}`}
// //                   type="text"
// //                   id="containerNo"
// //                   name='containerNo'
// //                   value={gateIn.containerNo}
// //                   maxLength={11}
// //                   onChange={handleGateInChange}
// //                   disabled={gateIn.gateInId !== ''}
// //                 />
// //                 <div style={{ color: 'red' }} className="error-message">{formErrors.containerNo}</div>
// //               </FormGroup>
// //             </Col>
// //             <Col md={2}>
// //               <FormGroup>
// //                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                   ISO Code <span style={{ color: 'red' }}>*</span>
// //                 </label>
// //                 <Select

// //                   value={{ value: gateIn.isoCode, label: gateIn.isoCode }}
// //                   onChange={handleIsoChange}
// //                   options={isoCodes}
// //                   placeholder="Select Container"
// //                   isClearable
// //                   id="isoCode"
// //                   disabled={gateIn.gateInId !== ''}
// //                   name="isoCode"
// //                   className={`autocompleteHeight ${formErrors.isoCode ? 'error-border' : ''}`}

// //                   styles={{
// //                     control: (provided, state) => ({
// //                       ...provided,
// //                       height: 32, // Set height
// //                       minHeight: 32, // Set minimum height
// //                       border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
// //                       boxShadow: "none",
// //                       display: 'flex',
// //                       alignItems: 'center', // Align items vertically
// //                       padding: 0, // Remove padding to control height
// //                       "&:hover": {
// //                         border: "1px solid #ccc",
// //                       },
// //                       borderRadius: '6px', // Add border radius
// //                       "&:hover": {
// //                         border: "1px solid #ccc",
// //                       },
// //                     }),
// //                     valueContainer: (provided) => ({
// //                       ...provided,
// //                       height: '100%', // Full height of the control
// //                       display: 'flex',
// //                       alignItems: 'center', // Align items vertically
// //                       padding: '0 0.75rem', // Match padding
// //                     }),
// //                     singleValue: (provided) => ({
// //                       ...provided,
// //                       lineHeight: '32px', // Center text vertically
// //                     }),
// //                     indicatorSeparator: () => ({
// //                       display: "none",
// //                     }),
// //                     dropdownIndicator: () => ({
// //                       display: "none",
// //                     }),
// //                     placeholder: (provided) => ({
// //                       ...provided,
// //                       lineHeight: '32px', // Center placeholder text vertically
// //                       color: "gray",
// //                     }),
// //                     clearIndicator: (provided) => ({
// //                       ...provided,
// //                       padding: 2, // Remove padding
// //                       display: 'flex',
// //                       alignItems: 'center', // Align clear indicator vertically
// //                     }),
// //                   }}
// //                 />
// //                 <div style={{ color: 'red' }} className="error-message">{formErrors.isoCode}</div>
// //               </FormGroup>
// //             </Col>
// //             <Col md={2}>
// //               <FormGroup>
// //                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                   Cont Size & Type
// //                 </label>
// //                 <Input
// //                   className="form-control"
// //                   type="text"
// //                   id="containerSize"
// //                   name='containerSize'
// //                   value={gateIn.containerSize + gateIn.containerType}
// //                   disabled
// //                 />
// //               </FormGroup>
// //             </Col>
// //             <Col md={2}>
// //               <FormGroup>
// //                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                   Tare Weight <span style={{ color: 'red' }}>*</span>
// //                 </label>
// //                 <Input
// //                   className={`form-control ${formErrors.tareWeight ? 'error-border' : ''}`}
// //                   type="text"
// //                   id="tareWeight"
// //                   name='tareWeight'
// //                   value={gateIn.tareWeight}
// //                   onChange={handleGateInChange}
// //                   maxLength={16}
// //                 />
// //                 <div style={{ color: 'red' }} className="error-message">{formErrors.tareWeight}</div>
// //               </FormGroup>
// //             </Col>
// //             <Col md={2}>
// //               <FormGroup>
// //                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                   Seal No
// //                 </label>
// //                 <Input
// //                   className="form-control"
// //                   type="text"
// //                   id="containerSealNo"
// //                   name='containerSealNo'
// //                   value={gateIn.containerSealNo}
// //                   onChange={handleGateInChange}
// //                   maxLength={15}
// //                 />
// //               </FormGroup>
// //             </Col>
// //             <Col md={2}>
// //               <FormGroup>
// //                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                   Container Status
// //                 </label>
// //                 <Input
// //                   className="form-control"
// //                   type="select"
// //                   id="containerStatus"
// //                   name='containerStatus'
// //                   value={gateIn.containerStatus}
// //                   disabled
// //                 >
// //                   <option value="MTY">EMPTY</option>
// //                 </Input>
// //               </FormGroup>
// //             </Col>
// //           </Row>
// //           <Row>
// //             <Col md={2}>
// //               <FormGroup>
// //                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                   Vehicle No <span style={{ color: 'red' }}>*</span>
// //                 </label>
// //                 <Input
// //                   className={`form-control ${formErrors.vehicleNo ? 'error-border' : ''}`}
// //                   type="text"
// //                   id="vehicleNo"
// //                   name='vehicleNo'
// //                   value={gateIn.vehicleNo}
// //                   onChange={handleGateInChange}
// //                   maxLength={15}
// //                 />
// //                 <div style={{ color: 'red' }} className="error-message">{formErrors.vehicleNo}</div>
// //               </FormGroup>
// //             </Col>
// //             <Col md={2}>
// //               <FormGroup>
// //                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                   Driver Name <span style={{ color: 'red' }}>*</span>
// //                 </label>
// //                 <Input
// //                   className={`form-control ${formErrors.driverName ? 'error-border' : ''}`}
// //                   type="text"
// //                   id="driverName"
// //                   name='driverName'
// //                   value={gateIn.driverName}
// //                   onChange={handleGateInChange}
// //                   maxLength={50}
// //                 />
// //                 <div style={{ color: 'red' }} className="error-message">{formErrors.driverName}</div>
// //               </FormGroup>
// //             </Col>
// //             <Col md={2}>
// //               <FormGroup>
// //                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                   Transporter Name
// //                 </label>
// //                 <Input
// //                   className="form-control"
// //                   type="text"
// //                   id="transporterName"
// //                   name='transporterName'
// //                   value={gateIn.transporterName}
// //                   onChange={handleGateInChange}
// //                   maxLength={50}
// //                 />
// //               </FormGroup>
// //             </Col>
// //             <Col md={2}>
// //               <FormGroup>
// //                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                   DO No
// //                 </label>
// //                 <Input
// //                   className="form-control"
// //                   type="text"
// //                   id="deliveryOrderNo"
// //                   name='deliveryOrderNo'
// //                   value={gateIn.deliveryOrderNo}
// //                   onChange={handleGateInChange}
// //                   maxLength={10}
// //                 />
// //               </FormGroup>
// //             </Col>
// //             <Col md={2}>
// //               <FormGroup>
// //                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                   Do Date
// //                 </label>
// //                 <div style={{ position: 'relative' }}>
// //                   <DatePicker
// //                     selected={gateIn.deliveryOrderDate}
// //                     onChange={(date) => {
// //                       setGateIn(prevState => ({
// //                         ...prevState,
// //                         deliveryOrderDate: date,
// //                         doValidityDate: date >= prevState.doValidityDate ? null : prevState.doValidityDate,
// //                       }));

// //                     }}
// //                     name='deliveryOrderDate'
// //                     id="deliveryOrderDate"
// //                     dateFormat="dd/MM/yyyy"
// //                     className="form-control"
// //                     wrapperClassName="custom-react-datepicker-wrapper"
// //                     customInput={
// //                       <input
// //                         style={{
// //                           height: "30px",
// //                           width: "100%",
// //                         }}
// //                       />

// //                     }

// //                   />
// //                   <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
// //                 </div>
// //               </FormGroup>
// //             </Col>
// //             <Col md={2}>
// //               <FormGroup>
// //                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                   Do Validity Date
// //                 </label>
// //                 <div style={{ position: 'relative' }}>
// //                   <DatePicker
// //                     selected={gateIn.doValidityDate}
// //                     onChange={(date) => {
// //                       setGateIn(prevState => ({
// //                         ...prevState,
// //                         doValidityDate: date
// //                       }));

// //                     }}
// //                     minDate={(() => {
// //                       const date = new Date(gateIn.deliveryOrderDate);
// //                       date.setDate(date.getDate() + 1);
// //                       return date;
// //                     })()}
// //                     name='doValidityDate'
// //                     id="doValidityDate"
// //                     dateFormat="dd/MM/yyyy"
// //                     className="form-control"
// //                     wrapperClassName="custom-react-datepicker-wrapper"
// //                     customInput={
// //                       <input
// //                         style={{
// //                           height: "30px",
// //                           width: "100%",
// //                         }}
// //                       />

// //                     }

// //                   />
// //                   <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
// //                 </div>
// //               </FormGroup>
// //             </Col>
// //           </Row>
// //           <Row>
// //             <Col md={2}>
// //               <FormGroup>
// //                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                   Shipping Agent <span style={{ color: 'red' }}>*</span>
// //                 </label>
// //                 <Select
// //                   value={{ value: gateIn.sa, label: agentName }}
// //                   onChange={handleAgentChange}
// //                   onInputChange={getAgentData}
// //                   options={agentData}
// //                   placeholder="Select Shipping Agent"
// //                   isClearable
// //                   id="sa"
// //                   name='sa'
// //                   className={`autocompleteHeight ${formErrors.sa ? 'error-border' : ''}`}
// //                   styles={{
// //                     control: (provided, state) => ({
// //                       ...provided,
// //                       height: 32, // Set height
// //                       minHeight: 32, // Set minimum height
// //                       border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
// //                       boxShadow: "none",
// //                       display: 'flex',
// //                       alignItems: 'center', // Align items vertically
// //                       padding: 0, // Remove padding to control height
// //                       "&:hover": {
// //                         border: "1px solid #ccc",
// //                       },
// //                       borderRadius: '6px', // Add border radius
// //                       "&:hover": {
// //                         border: "1px solid #ccc",
// //                       },
// //                     }),
// //                     valueContainer: (provided) => ({
// //                       ...provided,
// //                       height: '100%', // Full height of the control
// //                       display: 'flex',
// //                       alignItems: 'center', // Align items vertically
// //                       padding: '0 0.75rem', // Match padding
// //                     }),
// //                     singleValue: (provided) => ({
// //                       ...provided,
// //                       lineHeight: '32px', // Center text vertically
// //                     }),
// //                     indicatorSeparator: () => ({
// //                       display: "none",
// //                     }),
// //                     dropdownIndicator: () => ({
// //                       display: "none",
// //                     }),
// //                     placeholder: (provided) => ({
// //                       ...provided,
// //                       lineHeight: '32px', // Center placeholder text vertically
// //                       color: "gray",
// //                     }),
// //                     clearIndicator: (provided) => ({
// //                       ...provided,
// //                       padding: 2, // Remove padding
// //                       display: 'flex',
// //                       alignItems: 'center', // Align clear indicator vertically
// //                     }),
// //                   }}
// //                 />
// //               </FormGroup>
// //             </Col>
// //             <Col md={2}>
// //               <FormGroup>
// //                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                   Shipping Line <span style={{ color: 'red' }}>*</span>
// //                 </label>
// //                 <Select
// //                   value={{ value: gateIn.sl, label: linerName }}
// //                   onChange={handleLinerChange}
// //                   onInputChange={getLinerData}
// //                   options={linerData}
// //                   placeholder="Select Shipping Agent"
// //                   isClearable
// //                   id="sl"
// //                   name='sl'
// //                   className={`autocompleteHeight ${formErrors.sl ? 'error-border' : ''}`}
// //                   styles={{
// //                     control: (provided, state) => ({
// //                       ...provided,
// //                       height: 32, // Set height
// //                       minHeight: 32, // Set minimum height
// //                       border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
// //                       boxShadow: "none",
// //                       display: 'flex',
// //                       alignItems: 'center', // Align items vertically
// //                       padding: 0, // Remove padding to control height
// //                       "&:hover": {
// //                         border: "1px solid #ccc",
// //                       },
// //                       borderRadius: '6px', // Add border radius
// //                       "&:hover": {
// //                         border: "1px solid #ccc",
// //                       },
// //                     }),
// //                     valueContainer: (provided) => ({
// //                       ...provided,
// //                       height: '100%', // Full height of the control
// //                       display: 'flex',
// //                       alignItems: 'center', // Align items vertically
// //                       padding: '0 0.75rem', // Match padding
// //                     }),
// //                     singleValue: (provided) => ({
// //                       ...provided,
// //                       lineHeight: '32px', // Center text vertically
// //                     }),
// //                     indicatorSeparator: () => ({
// //                       display: "none",
// //                     }),
// //                     dropdownIndicator: () => ({
// //                       display: "none",
// //                     }),
// //                     placeholder: (provided) => ({
// //                       ...provided,
// //                       lineHeight: '32px', // Center placeholder text vertically
// //                       color: "gray",
// //                     }),
// //                     clearIndicator: (provided) => ({
// //                       ...provided,
// //                       padding: 2, // Remove padding
// //                       display: 'flex',
// //                       alignItems: 'center', // Align clear indicator vertically
// //                     }),
// //                   }}
// //                 />
// //               </FormGroup>
// //             </Col>
// //             <Col md={2}>
// //               <FormGroup>
// //                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                   Container Health
// //                 </label>
// //                 <Input
// //                   className="form-control"
// //                   type="select"
// //                   id="containerHealth"
// //                   name='containerHealth'
// //                   value={gateIn.containerHealth}
// //                   onChange={handleGateInChange}
// //                 >
// //                   <option value="" selected="">	</option>

// //                   <option value="HDEMAG">Heavy Damage</option>

// //                   <option value="LDEMAG">Light Damage</option>

// //                   <option value="MDEMAG">Medium Damage</option>

// //                   <option value="OK">Healthy</option>
// //                 </Input>
// //               </FormGroup>
// //             </Col>
// //             <Col md={2}>
// //               <FormGroup>
// //                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                   Profitcentre Id
// //                 </label>
// //                 <Input
// //                   className="form-control"
// //                   type="text"
// //                   id="profitcentreId"
// //                   name='profitcentreId'
// //                   value={gateIn.profitcentreId}
// //                   disabled
// //                 />
// //               </FormGroup>
// //             </Col>
// //             <Col md={2}>
// //               <FormGroup>
// //                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                   Job Order No
// //                 </label>
// //                 <Input
// //                   className="form-control"
// //                   type="text"
// //                   id="jobOrderId"
// //                   name='jobOrderId'
// //                   value={gateIn.jobOrderId}
// //                   onChange={handleGateInChange}
// //                   maxLength={16}
// //                 />
// //               </FormGroup>
// //             </Col>
// //             <Col md={2}>
// //               <FormGroup>
// //                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                   Job Order Date
// //                 </label>
// //                 <div style={{ position: 'relative' }}>
// //                   <DatePicker
// //                     selected={gateIn.jobDate}
// //                     onChange={(date) => {
// //                       setGateIn(prevState => ({
// //                         ...prevState,
// //                         jobDate: date
// //                       }));
// //                     }}

// //                     name='jobDate'
// //                     id="jobDate"
// //                     dateFormat="dd/MM/yyyy"
// //                     className="form-control"
// //                     wrapperClassName="custom-react-datepicker-wrapper"
// //                     customInput={
// //                       <input
// //                         style={{
// //                           height: "30px",
// //                           width: "100%",
// //                         }}
// //                       />

// //                     }

// //                   />
// //                   <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
// //                 </div>
// //               </FormGroup>
// //             </Col>
// //           </Row>
// //           <Row>
// //             <Col md={2}>
// //               <FormGroup>
// //                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                   Pick Up Yard
// //                 </label>
// //                 <Input
// //                   className="form-control"
// //                   type="text"
// //                   id="origin"
// //                   name='origin'
// //                   value={gateIn.origin}
// //                   onChange={handleGateInChange}
// //                   maxLength={50}
// //                 />
// //               </FormGroup>
// //             </Col>
// //             <Col md={2}>
// //               <FormGroup>
// //                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                   Remarks
// //                 </label>
// //                 <Input
// //                   className="form-control"
// //                   type="textarea"
// //                   id="comments"
// //                   name='comments'
// //                   value={gateIn.comments}
// //                   onChange={handleGateInChange}
// //                   maxLength={150}
// //                 />
// //               </FormGroup>
// //             </Col>

// //           </Row>

// //           <Row className='text-center'>
// //             <Col>
// //               <button
// //                 className="btn btn-outline-primary btn-margin newButton"
// //                 style={{ marginRight: 10 }}
// //                 id="submitbtn2"
// //                 onClick={handleSave}
// //               >
// //                 <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
// //                 Save
// //               </button>
// //               <button
// //                 className="btn btn-outline-danger btn-margin newButton"
// //                 style={{ marginRight: 10 }}
// //                 id="submitbtn2"
// //                 onClick={handleClear}
// //               >
// //                 <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
// //                 Clear
// //               </button>
// //             </Col>
// //           </Row>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }


// // export default ExportEmptyContainerGateIn;







// import AuthContext from '../Components/AuthProvider';
// import { useLocation, useNavigate } from 'react-router-dom';
// import React, { useEffect, useState, useContext } from 'react';
// import '../Components/Style.css';
// import { Pagination } from 'react-bootstrap';
// import Select from 'react-select';
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
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faShip, faBackward, faCalendarAlt, faAdd, faPlaneDeparture, faCalculator, faTired, faWheatAwnCircleExclamation, faToriiGate, faPrint } from '@fortawesome/free-solid-svg-icons';
// import '../assets/css/style.css';
// import '../Components/Style.css';
// import useAxios from '../Components/useAxios';
// import { toast } from 'react-toastify';
// import ipaddress from "../Components/IpAddress";

// function ExportEmptyContainerGateIn({ searchData, resetFlag }) {

//   const navigate = useNavigate();
//   const axios = useAxios();
//   const { isAuthenticated } = useContext(AuthContext);

//   // If the user is not authenticated, redirect to the login page
//   useEffect(() => {
//     if (!isAuthenticated) {

//       navigate('/login?message=You need to be authenticated to access this page.');
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
//     userRights
//   } = useContext(AuthContext);


//   const styles = {
//     overlay: {
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       backgroundColor: 'rgba(255, 255, 255, 0.8)',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       zIndex: 9999,
//     },
//   };

//   const location = useLocation();
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const processId = 'P00219';

//   const foundRights = role !== 'ROLE_ADMIN' ? userRights.find(item => item.process_Id === processId) : null;
//   const allowCreate = foundRights?.allow_Create === 'Y';
//   const allowRead = foundRights?.allow_Read === 'Y';
//   const allowEdit = foundRights?.allow_Update === 'Y';
//   const allowDelete = foundRights?.allow_Delete === 'Y';




//   useEffect(() => {
//     if (searchData && searchData.activeTab === processId && searchData.containerGateInId && searchData.containerNo) {
//       getExportSearchSelectedData(searchData.containerGateInId);
//     }
//   }, [searchData]);

//   useEffect(() => {
//     if (resetFlag) {
//       handleClear();
//     }
//   }, [resetFlag]);

















//   const [gateIn, setGateIn] = useState({
//     companyId: '',
//     branchId: '',
//     gateInId: '',
//     finYear: new Date().getFullYear(),
//     erpDocRefNo: '',
//     docRefNo: '',
//     lineNo: '',
//     srNo: 0,
//     docRefDate: null,
//     profitcentreId: 'CFS Export',
//     viaNo: '',
//     containerNo: '',
//     containerSize: '',
//     isoCode: '',
//     containerType: '',
//     containerStatus: 'MTY',
//     containerSealNo: '',
//     tareWeight: '',
//     sa: '',
//     sl: '',
//     containerHealth: '',
//     transporterName: '',
//     vehicleNo: '',
//     driverName: '',
//     comments: '',
//     status: '',
//     createdBy: '',
//     jobOrderId: '',
//     jobDate: null,
//     inGateInDate: new Date(),
//     deliveryOrderNo: '',
//     deliveryOrderDate: null,
//     doValidityDate: null,
//     onAccountOf: '',
//     origin: ''
//   })

//   const [formErrors, setFormErrors] = useState({
//     containerNo: '',
//     isoCode: '',
//     tareWeight: '',
//     vehicleNo: '',
//     driverName: '',
//     onAccountOf: '',
//     sa: '',
//     sl: ''
//   })

//   const [noCheckDigit, setNoCheckDigit] = useState('N');
//   const [chaData, setChaData] = useState([]);
//   const [partyName, setpartyName] = useState('');

//   const searchChaData = (id) => {
//     if (id === '') {
//       setChaData([]);
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
//         setChaData(portOptions);
//       })
//       .catch((error) => {
//         setChaData([]);
//       })
//   }


//   const handleOnAccounOfChange = async (selectedOption, { action }) => {
//     if (action === 'clear') {
//       setGateIn({
//         ...gateIn,
//         onAccountOf: ''
//       })
//       setpartyName('');
//     }
//     else {
//       setGateIn({
//         ...gateIn,
//         onAccountOf: selectedOption.value
//       })
//       setpartyName(selectedOption.label);
//       setFormErrors({
//         ...formErrors,
//         onAccountOf: ''
//       })
//     }
//   }


//   const handleContainerNoValidation1 = (containerNo) => {
//     const containerNoUpper = containerNo.toUpperCase();
//     // console.log(containerNoUpper);

//     let s = 0;
//     let x = 0;

//     // Char values mapping
//     const charVal = {
//       A: "10",
//       B: "12",
//       C: "13",
//       D: "14",
//       E: "15",
//       F: "16",
//       G: "17",
//       H: "18",
//       I: "19",
//       J: "20",
//       K: "21",
//       L: "23",
//       M: "24",
//       N: "25",
//       O: "26",
//       P: "27",
//       Q: "28",
//       R: "29",
//       S: "30",
//       T: "31",
//       U: "32",
//       V: "34",
//       W: "35",
//       X: "36",
//       Y: "37",
//       Z: "38",
//     };

//     const len = containerNoUpper.length;

//     if (len !== 11) {
//       return false;
//     } else {
//       for (let i = 0; i < len - 1; i++) {
//         const asciiVal = containerNoUpper.charCodeAt(i);
//         if (asciiVal >= 65 && asciiVal <= 90) { // A-Z
//           s += Math.pow(2, i) * parseInt(charVal[containerNoUpper.charAt(i)]);
//         } else {
//           s += Math.pow(2, i) * parseInt(containerNoUpper.charAt(i));
//         }
//       }

//       x = s % 11;

//       if (
//         x === parseInt(containerNoUpper.charAt(len - 1)) ||
//         (x === 10 && containerNoUpper.charAt(len - 1) === "0")
//       ) {
//         // Valid container number
//         return true;
//       } else {
//         // Invalid container number
//         return false;
//       }
//     }
//   };

//   function handleInputChange(e) {
//     const inputValue = e;
//     const numericInput = inputValue.replace(/[^0-9.]/g, '');
//     const parts = numericInput.split('.');
//     const integerPart = parts[0].slice(0, 12);
//     let decimalPart = parts[1];

//     // Limit decimal places if needed
//     if (decimalPart !== undefined) {
//       decimalPart = `.${decimalPart.slice(0, 3)}`;
//     }

//     const sanitizedInput = decimalPart !== undefined ? `${integerPart}${decimalPart}` : integerPart;
//     return sanitizedInput;
//   };

//   const handleGateInChange = (e) => {
//     const { name, value } = e.target;

//     let sanitizedValue = value;


//     if (['tareWeight'].includes(name)) {
//       sanitizedValue = handleInputChange(sanitizedValue);
//     }

//     if (name === 'containerNo') {
//       if (value && noCheckDigit === 'N') {
//         if (!handleContainerNoValidation1(value)) {
//           setFormErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: "Invalid Container No.",
//           }));

//         }
//         else {
//           setFormErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: "",
//           }));
//         }
//       }
//       else {
//         setFormErrors((prevErrors) => ({
//           ...prevErrors,
//           [name]: "",
//         }));
//       }
//     }
//     else {
//       setFormErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: "",
//       }));
//     }

//     setGateIn({
//       ...gateIn,
//       [name]: sanitizedValue,
//     });



//   };

//   const [linerName, setLinerName] = useState('');
//   const [agentName, setAgentName] = useState('');
//   const [linerData, setLinerData] = useState([]);
//   const [agentData, setAgentData] = useState([]);

//   const handleClear = () => {
//     setLinerName('');
//     setAgentName('');
//     setGateIn({
//       companyId: '',
//       branchId: '',
//       gateInId: '',
//       finYear: new Date().getFullYear(),
//       erpDocRefNo: '',
//       docRefNo: '',
//       lineNo: '',
//       srNo: 0,
//       docRefDate: null,
//       profitcentreId: 'CFS Export',
//       viaNo: '',
//       containerNo: '',
//       containerSize: '',
//       isoCode: '',
//       containerType: '',
//       containerStatus: 'MTY',
//       containerSealNo: '',
//       tareWeight: '',
//       sa: '',
//       sl: '',
//       containerHealth: '',
//       transporterName: '',
//       vehicleNo: '',
//       driverName: '',
//       comments: '',
//       status: '',
//       createdBy: '',
//       jobOrderId: '',
//       jobDate: null,
//       inGateInDate: new Date(),
//       deliveryOrderNo: '',
//       deliveryOrderDate: null,
//       doValidityDate: null,
//       onAccountOf: '',
//       origin: ''
//     })
//     setFormErrors({
//       containerNo: '',
//       isoCode: '',
//       tareWeight: '',
//       vehicleNo: '',
//       driverName: '',
//       onAccountOf: '',
//       sa: '',
//       sl: ''
//     })
//     setNoCheckDigit('N');
//     setpartyName('');
//   }

//   const [isoCodes, setIsoCodes] = useState([]);


//   const getIsoContainers = () => {
//     axios.get(`${ipaddress}IsoContainer/searchByIsoCode?companyId=${companyid}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {
//         const data = response.data;
//         const portOptions = data.map(port => ({
//           value: port.isoCode,
//           label: port.isoCode,
//           type: port.containerType,
//           size: port.containerSize,
//           wt: port.tareWeight
//         }))
//         setIsoCodes(portOptions);
//       })
//       .catch((error) => {

//       })
//   }

//   useEffect(() => {
//     if (searchData && searchData.activeTab === 'P00219') {
//       getIsoContainers();
//     }

//   }, [searchData])

//   const handleIsoChange = async (selectedOption, { action }) => {
//     if (action === 'clear') {
//       setGateIn({
//         ...gateIn,
//         isoCode: '',
//         containerSize: '',
//         containerType: '',
//         tareWeight: ''
//       })
//     }
//     else {
//       setGateIn({
//         ...gateIn,
//         isoCode: selectedOption.value,
//         containerSize: selectedOption.size,
//         containerType: selectedOption.type,
//         tareWeight: selectedOption.wt
//       })

//       setFormErrors((prevErrors) => ({
//         ...prevErrors,
//         isoCode: "",
//         tareWeight: ""
//       }));
//     }
//   }

//   const getLinerData = (val) => {
//     if (val === '') {
//       setLinerData([]);
//       return;
//     }

//     axios.get(`${ipaddress}party/getLiner?cid=${companyid}&bid=${branchId}&val=${val}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {
//         const data = response.data;
//         const portOptions = data.map(port => ({
//           value: port[0],
//           label: port[1],
//           code: port[2]
//         }))
//         setLinerData(portOptions);
//       })
//       .catch((error) => {

//       })
//   }


//   const getAgentData = (val) => {
//     if (val === '') {
//       setAgentData([]);
//       return;
//     }

//     axios.get(`${ipaddress}party/getAgent?cid=${companyid}&bid=${branchId}&val=${val}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {
//         const data = response.data;
//         const portOptions = data.map(port => ({
//           value: port[0],
//           label: port[1],
//           code: port[2]
//         }))
//         setAgentData(portOptions);
//       })
//       .catch((error) => {

//       })
//   }


//   const handleLinerChange = async (selectedOption, { action }) => {

//     if (action === 'clear') {
//       setLinerName('');

//       setGateIn({
//         ...gateIn,
//         sl: ''
//       })
//     }
//     else {
//       setLinerName(selectedOption ? selectedOption.label : '');
//       setGateIn({
//         ...gateIn,
//         sl: selectedOption ? selectedOption.value : ''
//       });
//       setFormErrors({
//         ...formErrors,
//         sl: ''
//       })
//     }
//   };

//   const handleAgentChange = async (selectedOption, { action }) => {

//     if (action === 'clear') {
//       setAgentName('');
//       setGateIn({
//         ...gateIn,
//         sa: ''
//       })
//     }
//     else {
//       setAgentName(selectedOption ? selectedOption.label : '');
//       setGateIn({
//         ...gateIn,
//         sa: selectedOption ? selectedOption.value : ''
//       })
//       setFormErrors({
//         ...formErrors,
//         sa: ''
//       })
//     }
//   };


//   const handleSave = () => {
//     setLoading(true);
//     setFormErrors({
//       containerNo: '',
//       isoCode: '',
//       tareWeight: '',
//       vehicleNo: '',
//       driverName: '',
//       onAccountOf: '',
//       sa: '',
//       sl: ''
//     })

//     let errors = {};

//     if (!gateIn.containerNo) {
//       errors.containerNo = "Container no is required."
//     }
//     else {
//       if (!handleContainerNoValidation1(gateIn.containerNo) && noCheckDigit === 'N') {
//         errors.containerNo = "Invalid container no."
//       }
//     }
//     if (!gateIn.isoCode) {
//       errors.isoCode = "ISO is required."
//     }

//     if (!gateIn.tareWeight) {
//       errors.tareWeight = "Tare weight is required."
//     }

//     if (!gateIn.vehicleNo) {
//       errors.vehicleNo = "Vehicle no is required."
//     }

//     if (!gateIn.driverName) {
//       errors.driverName = "Driver name is required."
//     }
//     if (!gateIn.onAccountOf) {
//       errors.onAccountOf = "On account of is required."
//     }
//     if (!gateIn.sa) {
//       errors.sa = "Shipping agent is required."
//     }
//     if (!gateIn.sl) {
//       errors.sl = "Shipping line is required."
//     }

//     if (Object.keys(errors).length > 0) {
//       setLoading(false);
//       setFormErrors(errors);
//       toast.error("Please fill in the required fields.", {
//         autoClose: 1000
//       })
//       return;
//     }

//     axios.post(`${ipaddress}gateIn/saveExportEmptyContainer?cid=${companyid}&bid=${branchId}&user=${userId}`, gateIn, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {

//         const data = response.data;
//         const gate = data.gateInData;

//         if (!handleContainerNoValidation1(gate.containerNo)) {
//           setNoCheckDigit('Y');
//         }
//         else {
//           setNoCheckDigit('N');
//         }

//         setGateIn({
//           companyId: gate.companyId || '',
//           branchId: gate.branchId || '',
//           gateInId: gate.gateInId || '',
//           finYear: gate.finYear || new Date().getFullYear(),
//           erpDocRefNo: gate.erpDocRefNo || '',
//           docRefNo: gate.docRefNo || '',
//           lineNo: gate.lineNo || '',
//           srNo: gate.srNo || 0,
//           docRefDate: gate.docRefDate === null ? null : new Date(gate.docRefDate),
//           profitcentreId: 'CFS Export',
//           viaNo: gate.viaNo || '',
//           containerNo: gate.containerNo || '',
//           containerSize: gate.containerSize || '',
//           isoCode: gate.isoCode || '',
//           containerType: gate.containerType || '',
//           containerStatus: 'MTY',
//           containerSealNo: gate.containerSealNo || '',
//           tareWeight: gate.tareWeight || '',
//           sa: gate.sa || '',
//           sl: gate.sl || '',
//           containerHealth: gate.containerHealth || '',
//           transporterName: gate.transporterName || '',
//           vehicleNo: gate.vehicleNo || '',
//           driverName: gate.driverName || '',
//           comments: gate.comments || '',
//           status: gate.status || '',
//           createdBy: gate.createdBy || '',
//           jobOrderId: gate.jobOrderId || '',
//           jobDate: gate.jobDate === null ? null : new Date(gate.jobDate),
//           inGateInDate: gate.inGateInDate === null ? null : new Date(gate.inGateInDate),
//           deliveryOrderNo: gate.deliveryOrderNo || '',
//           deliveryOrderDate: gate.deliveryOrderDate === null ? null : new Date(gate.deliveryOrderDate),
//           doValidityDate: gate.doValidityDate === null ? null : new Date(gate.doValidityDate),
//           onAccountOf: gate.onAccountOf || '',
//           origin: gate.origin || ''
//         })

//         setpartyName(data.onAccountOf);
//         setAgentName(data.sa);
//         setLinerName(data.sl);

//         setLoading(false);

//         toast.success("Data save successfully!!", {
//           autoClose: 800
//         })

//       })
//       .catch((error) => {

//         setLoading(false);

//         toast.error(error.response.data, {
//           autoClose: 800
//         })
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
//     axios.get(`${ipaddress}gateIn/searchExportEmptyContainerGateIn?cid=${companyid}&bid=${branchId}&search=${id}`, {
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


//   const getExportSearchSelectedData = (id) => {
//     setLoading(true);
//     axios.get(`${ipaddress}gateIn/getExportSearchSelectedData?cid=${companyid}&bid=${branchId}&gateInId=${id}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {
//         const data = response.data;
//         const gate = data.gateInData;

//         if (!handleContainerNoValidation1(gate.containerNo)) {
//           setNoCheckDigit('Y');
//         }
//         else {
//           setNoCheckDigit('N');
//         }

//         setGateIn({
//           companyId: gate.companyId || '',
//           branchId: gate.branchId || '',
//           gateInId: gate.gateInId || '',
//           finYear: gate.finYear || new Date().getFullYear(),
//           erpDocRefNo: gate.erpDocRefNo || '',
//           docRefNo: gate.docRefNo || '',
//           lineNo: gate.lineNo || '',
//           srNo: gate.srNo || 0,
//           docRefDate: gate.docRefDate === null ? null : new Date(gate.docRefDate),
//           profitcentreId: 'CFS Export',
//           viaNo: gate.viaNo || '',
//           containerNo: gate.containerNo || '',
//           containerSize: gate.containerSize || '',
//           isoCode: gate.isoCode || '',
//           containerType: gate.containerType || '',
//           containerStatus: 'MTY',
//           containerSealNo: gate.containerSealNo || '',
//           tareWeight: gate.tareWeight || '',
//           sa: gate.sa || '',
//           sl: gate.sl || '',
//           containerHealth: gate.containerHealth || '',
//           transporterName: gate.transporterName || '',
//           vehicleNo: gate.vehicleNo || '',
//           driverName: gate.driverName || '',
//           comments: gate.comments || '',
//           status: gate.status || '',
//           createdBy: gate.createdBy || '',
//           jobOrderId: gate.jobOrderId || '',
//           jobDate: gate.jobDate === null ? null : new Date(gate.jobDate),
//           inGateInDate: gate.inGateInDate === null ? null : new Date(gate.inGateInDate),
//           deliveryOrderNo: gate.deliveryOrderNo || '',
//           deliveryOrderDate: gate.deliveryOrderDate === null ? null : new Date(gate.deliveryOrderDate),
//           doValidityDate: gate.doValidityDate === null ? null : new Date(gate.doValidityDate),
//           onAccountOf: gate.onAccountOf || '',
//           origin: gate.origin || ''
//         })

//         setpartyName(data.onAccountOf);
//         setAgentName(data.sa);
//         setLinerName(data.sl);

//         setLoading(false);

//         // toast.success("Data found successfully!!", {
//         //   autoClose: 800
//         // })
//         closeGateInModal();
//       })
//       .catch((error) => {
//         toast.error(error.response.data, {
//           autoClose: 800
//         })
//         setLoading(false);
//       })
//   }

//   const downloadMtyGateInReport = () => {


//     setLoading(true);
//     axios
//       .post(
//         `${ipaddress}exportReport/exportEmptyContReport?cid=${companyid}&bid=${branchId}&id=${gateIn.gateInId}`,
//         null,
//         {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         }
//       )
//       .then((response) => {
//         const base64Pdf = response.data; // Assuming the base64 string is returned directly

//         // Decode the Base64 string to a binary array
//         const binaryData = atob(base64Pdf);

//         // Convert binary data to a Uint8Array
//         const byteArray = new Uint8Array(binaryData.length);
//         for (let i = 0; i < binaryData.length; i++) {
//           byteArray[i] = binaryData.charCodeAt(i);
//         }

//         // Create a Blob from the Uint8Array
//         const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });

//         // Generate a URL for the PDF Blob
//         const pdfUrl = URL.createObjectURL(pdfBlob);

//         // Open the PDF in a new tab and trigger printing
//         const pdfWindow = window.open(pdfUrl);
//         // pdfWindow.onload = () => {
//         //     pdfWindow.print();
//         // };


//         // const base64Pdf = response.data; // Assuming the base64 string is returned directly

//         // // Decode the Base64 string to a binary array
//         // const binaryData = atob(base64Pdf);

//         // // Convert binary data to a Uint8Array
//         // const byteArray = new Uint8Array(binaryData.length);
//         // for (let i = 0; i < binaryData.length; i++) {
//         //     byteArray[i] = binaryData.charCodeAt(i);
//         // }

//         // // Create a Blob from the Uint8Array
//         // const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });

//         // // Generate a URL for the PDF Blob
//         // const pdfUrl = URL.createObjectURL(pdfBlob);

//         // // Create an anchor element for downloading the file
//         // const link = document.createElement("a");
//         // link.href = pdfUrl;
//         // link.download = "GateInReport.pdf"; // The name of the downloaded file
//         // link.click();

//         // // Clean up the object URL
//         // URL.revokeObjectURL(pdfUrl);

//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching PDF:', error);
//         toast.error(error.response.data, {
//           autoClose: 800
//         })
//         setLoading(false);
//       });
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

//         {/* <h5
//         className="pageHead"
//         style={{
//           fontFamily: "Your-Heading-Font",
//           paddingLeft: "2%",
//           paddingRight: "-20px",
//         }}
//       >
//         {" "}
//         <FontAwesomeIcon
//           icon={faToriiGate}
//           style={{
//             marginRight: "8px",
//             color: "black",
//           }}
//         />
//         Export Empty Container Gate In
//         <hr />
//       </h5> */}
//         <div>
//           <Modal Modal isOpen={isModalOpenForSearchGateInData} onClose={closeGateInModal} toggle={closeGateInModal} style={{ maxWidth: '1200px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

//             <ModalHeader toggle={closeGateInModal} style={{
//               backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
//               boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
//               border: '1px solid rgba(0, 0, 0, 0.3)',
//               borderRadius: '0',
//               backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
//               backgroundSize: 'cover',
//               backgroundRepeat: 'no-repeat',
//               //backgroundPosition: 'center',
//               backgroundPosition: 'center',
//             }} >


//               <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', color: 'white' }} > <FontAwesomeIcon
//                 icon={faSearch}
//                 style={{
//                   marginRight: '8px',
//                   color: 'white', // Set the color to golden
//                 }}
//               /> Search Empty Container Gate In Data</h5>



//             </ModalHeader>
//             <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
//               <Row>
//                 <Col md={4}>
//                   <FormGroup>
//                     <label className="forlabel bold-label" htmlFor="sbRequestId">
//                       Search by Gate In Id / Container No / Vehicle No
//                     </label>
//                     <input
//                       className="form-control"
//                       type="text"
//                       id="searchId"
//                       name='searchId'
//                       value={searchId}
//                       onChange={(e) => setSearchId(e.target.value)}
//                     />

//                   </FormGroup>
//                 </Col>
//                 <Col md={4} style={{ marginTop: 20 }}>
//                   <button
//                     className="btn btn-outline-primary btn-margin newButton"
//                     style={{ marginRight: 10, fontSize: 12 }}
//                     id="submitbtn2"
//                     onClick={() => searchExportEmptyContainerGateIn(searchId)}

//                   >
//                     <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
//                     Search
//                   </button>
//                   <button
//                     className="btn btn-outline-danger btn-margin newButton"
//                     style={{ marginRight: 10, fontSize: 12 }}
//                     id="submitbtn2"
//                     onClick={handleSearchClear}
//                   >
//                     <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
//                     Reset
//                   </button>
//                 </Col>
//               </Row>
//               <hr />

//               <div className="mt-1 table-responsive ">
//                 <table className="table table-bordered table-hover tableHeader">
//                   <thead className='tableHeader'>
//                     <tr>
//                       <th scope="col">#</th>
//                       <th scope="col">Gate In Id</th>
//                       <th scope="col">Gate In date</th>
//                       <th scope="col">Container No</th>
//                       <th scope="col">Vehicle No</th>

//                     </tr>
//                     <tr className='text-center'>
//                       <th scope="col"></th>
//                       <th scope="col">{gateInSearchData.length}</th>
//                       <th scope="col"></th>
//                       <th scope="col"></th>
//                       <th scope="col"></th>

//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentItems.map((item, index) => (
//                       <tr key={index}>
//                         <td>
//                           <input type="radio" onChange={() => getExportSearchSelectedData(item[0])} name="radioGroup" value={item[0]} />
//                         </td>
//                         <td>{item[0]}</td>
//                         <td>{item[1]}</td>
//                         <td>{item[2]}</td>
//                         <td>{item[3]}</td>

//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
//                   <Pagination.First onClick={() => handlePageChange(1)} />
//                   <Pagination.Prev
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 1}
//                   />
//                   <Pagination.Ellipsis />

//                   {displayPages().map((pageNumber) => (
//                     <Pagination.Item
//                       key={pageNumber}
//                       active={pageNumber === currentPage}
//                       onClick={() => handlePageChange(pageNumber)}
//                     >
//                       {pageNumber}
//                     </Pagination.Item>
//                   ))}

//                   <Pagination.Ellipsis />
//                   <Pagination.Next
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                   />
//                   <Pagination.Last onClick={() => handlePageChange(totalPages)} />
//                 </Pagination>
//               </div>
//             </ModalBody>
//           </Modal>
//           <Row>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Gate In No
//                 </label>
//                 <Row>
//                   <Col md={9}>
//                     <Input
//                       className="form-control"
//                       type="text"
//                       id="gateInId"
//                       name='gateInId'
//                       value={gateIn.gateInId}
//                       disabled
//                     />
//                   </Col>
//                   <Col md={3} className="d-flex justify-content-end">
//                     <button
//                       className="btn btn-outline-primary btn-margin newButton"
//                       style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//                       id="submitbtn2"
//                       onClick={openGateInModal}
//                     >
//                       <FontAwesomeIcon icon={faSearch} size="sm" s />
//                     </button>
//                   </Col>
//                 </Row>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Gate In Date
//                 </label>
//                 <div style={{ position: 'relative' }}>
//                   <DatePicker
//                     selected={gateIn.inGateInDate}
//                     name='inGateInDate'
//                     id="inGateInDate"
//                     dateFormat="dd/MM/yyyy HH:mm"
//                     className="form-control"
//                     disabled
//                     wrapperClassName="custom-react-datepicker-wrapper"
//                     customInput={
//                       <input
//                         style={{
//                           height: "30px",
//                           width: "100%",
//                         }}
//                       />

//                     }

//                   />
//                   <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
//                 </div>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   On Account Of <span style={{ color: 'red' }}>*</span>
//                 </label>
//                 <Select
//                   value={{ value: gateIn.onAccountOf, label: partyName }}
//                   onChange={handleOnAccounOfChange}
//                   onInputChange={searchChaData}
//                   options={chaData}
//                   placeholder="Select Party"
//                   isClearable
//                   id="onAccountOf"
//                   name='onAccountOf'
//                   className={`autocompleteHeight ${formErrors.onAccountOf ? 'error-border' : ''}`}
//                    styles={{
//                       control: (provided, state) => ({
//                         ...provided,
//                         height: 32,  // Set the height of the select input
//                         minHeight: 32,
//                         border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
//                         // display: 'flex',
//                         // alignItems: 'center',  // Vertically center the content
//                         // padding: '0 10px',     // Ensure padding is consistent
//                         // borderRadius: '6px',
//                         // width: '100%',
//                         // boxSizing: 'border-box',
//                         // position: 'relative',  // Ensure positioning doesn't cause layout issues
//                       }),
            
//                       valueContainer: (provided) => ({
//                         ...provided,
//                         // display: 'flex',
//                         alignItems: 'center',  // Vertically center the text
//                         padding: '0 8px',
//                         height: '100%',
//                         whiteSpace: 'nowrap',
//                         textOverflow: 'ellipsis',
//                         lineHeight: '28px',
//                         maxWidth: 'calc(100% - 20px)',
//                         position: 'relative',
//                         overflow: 'visible',
//                       }),
            
//                       input: (provided) => ({
//                         ...provided,
//                         width: '100%',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                         whiteSpace: 'nowrap',
//                         outline: 'none', // Avoid outline clashes
//                       }),
            
//                       singleValue: (provided) => ({
//                         ...provided,
//                         lineHeight: '32px',
//                         overflow: 'hidden',
//                         whiteSpace: 'nowrap',
//                         textOverflow: 'ellipsis',
//                       }),
            
//                       clearIndicator: (provided) => ({
//                         ...provided,
//                         padding: 2,
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         position: 'absolute',
//                         right: 5,
//                         top: '50%',
//                         transform: 'translateY(-50%)', // Vertically center the clear indicator
//                       }),
            
//                       indicatorSeparator: () => ({
//                         display: 'none', // Remove the separator between indicators
//                       }),
            
//                       dropdownIndicator: () => ({
//                         display: 'none', // Remove the dropdown arrow
//                       }),
            
//                       placeholder: (provided) => ({
//                         ...provided,
//                         lineHeight: '32px',
//                         color: 'gray',
//                       }),
//                     }}
//                 />

//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   No Check Digit
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="select"
//                   id="noCheckDigit"
//                   name='noCheckDigit'
//                   value={noCheckDigit}
//                   onChange={(e) => {
//                     setNoCheckDigit(e.target.value);

//                     if (e.target.value === 'Y') {
//                       setFormErrors((prevErrors) => ({
//                         ...prevErrors,
//                         ['containerNo']: "",
//                       }));
//                     }
//                     else {
//                       if (!handleContainerNoValidation1(gateIn.containerNo)) {
//                         setFormErrors((prevErrors) => ({
//                           ...prevErrors,
//                           ['containerNo']: "Invalid Container No.",
//                         }));

//                       }
//                     }
//                   }}
//                 >
//                   <option value="N">No</option>
//                   <option value="Y">Yes</option>
//                 </Input>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Status
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="text"
//                   id="status"
//                   name='status'
//                   value={gateIn.status === 'A' ? 'Approved' : gateIn.status}
//                   disabled
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Created By
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="text"
//                   id="createdBy"
//                   name='createdBy'
//                   value={gateIn.createdBy}
//                   disabled
//                 />
//               </FormGroup>
//             </Col>
//           </Row>
//           <Row>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Container No <span style={{ color: 'red' }}>*</span>
//                 </label>
//                 <Input
//                   className={`form-control ${formErrors.containerNo ? 'error-border' : ''}`}
//                   type="text"
//                   id="containerNo"
//                   name='containerNo'
//                   value={gateIn.containerNo}
//                   maxLength={11}
//                   onChange={handleGateInChange}
//                   disabled={gateIn.gateInId !== ''}
//                 />
//                 <div style={{ color: 'red' }} className="error-message">{formErrors.containerNo}</div>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   ISO Code <span style={{ color: 'red' }}>*</span>
//                 </label>
//                 <Select

//                   value={{ value: gateIn.isoCode, label: gateIn.isoCode }}
//                   onChange={handleIsoChange}
//                   options={isoCodes}
//                   placeholder="Select Container"
//                   isClearable
//                   id="isoCode"
//                   disabled={gateIn.gateInId !== ''}
//                   name="isoCode"
//                   className={`autocompleteHeight ${formErrors.isoCode ? 'error-border' : ''}`}

//                    styles={{
//                       control: (provided, state) => ({
//                         ...provided,
//                         height: 32,  // Set the height of the select input
//                         minHeight: 32,
//                         border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
//                         // display: 'flex',
//                         // alignItems: 'center',  // Vertically center the content
//                         // padding: '0 10px',     // Ensure padding is consistent
//                         // borderRadius: '6px',
//                         // width: '100%',
//                         // boxSizing: 'border-box',
//                         // position: 'relative',  // Ensure positioning doesn't cause layout issues
//                       }),
            
//                       valueContainer: (provided) => ({
//                         ...provided,
//                         // display: 'flex',
//                         alignItems: 'center',  // Vertically center the text
//                         padding: '0 8px',
//                         height: '100%',
//                         whiteSpace: 'nowrap',
//                         textOverflow: 'ellipsis',
//                         lineHeight: '28px',
//                         maxWidth: 'calc(100% - 20px)',
//                         position: 'relative',
//                         overflow: 'visible',
//                       }),
            
//                       input: (provided) => ({
//                         ...provided,
//                         width: '100%',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                         whiteSpace: 'nowrap',
//                         outline: 'none', // Avoid outline clashes
//                       }),
            
//                       singleValue: (provided) => ({
//                         ...provided,
//                         lineHeight: '32px',
//                         overflow: 'hidden',
//                         whiteSpace: 'nowrap',
//                         textOverflow: 'ellipsis',
//                       }),
            
//                       clearIndicator: (provided) => ({
//                         ...provided,
//                         padding: 2,
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         position: 'absolute',
//                         right: 5,
//                         top: '50%',
//                         transform: 'translateY(-50%)', // Vertically center the clear indicator
//                       }),
            
//                       indicatorSeparator: () => ({
//                         display: 'none', // Remove the separator between indicators
//                       }),
            
//                       dropdownIndicator: () => ({
//                         display: 'none', // Remove the dropdown arrow
//                       }),
            
//                       placeholder: (provided) => ({
//                         ...provided,
//                         lineHeight: '32px',
//                         color: 'gray',
//                       }),
//                     }}
//                 />
//                 <div style={{ color: 'red' }} className="error-message">{formErrors.isoCode}</div>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Cont Size & Type
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="text"
//                   id="containerSize"
//                   name='containerSize'
//                   value={gateIn.containerSize + gateIn.containerType}
//                   disabled
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Tare Weight <span style={{ color: 'red' }}>*</span>
//                 </label>
//                 <Input
//                   className={`form-control ${formErrors.tareWeight ? 'error-border' : ''}`}
//                   type="text"
//                   id="tareWeight"
//                   name='tareWeight'
//                   value={gateIn.tareWeight}
//                   onChange={handleGateInChange}
//                   maxLength={16}
//                 />
//                 <div style={{ color: 'red' }} className="error-message">{formErrors.tareWeight}</div>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Seal No
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="text"
//                   id="containerSealNo"
//                   name='containerSealNo'
//                   value={gateIn.containerSealNo}
//                   onChange={handleGateInChange}
//                   maxLength={15}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Container Status
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="select"
//                   id="containerStatus"
//                   name='containerStatus'
//                   value={gateIn.containerStatus}
//                   disabled
//                 >
//                   <option value="MTY">EMPTY</option>
//                 </Input>
//               </FormGroup>
//             </Col>
//           </Row>
//           <Row>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Vehicle No <span style={{ color: 'red' }}>*</span>
//                 </label>
//                 <Input
//                   className={`form-control ${formErrors.vehicleNo ? 'error-border' : ''}`}
//                   type="text"
//                   id="vehicleNo"
//                   name='vehicleNo'
//                   value={gateIn.vehicleNo}
//                   onChange={handleGateInChange}
//                   maxLength={15}
//                 />
//                 <div style={{ color: 'red' }} className="error-message">{formErrors.vehicleNo}</div>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Driver Name <span style={{ color: 'red' }}>*</span>
//                 </label>
//                 <Input
//                   className={`form-control ${formErrors.driverName ? 'error-border' : ''}`}
//                   type="text"
//                   id="driverName"
//                   name='driverName'
//                   value={gateIn.driverName}
//                   onChange={handleGateInChange}
//                   maxLength={50}
//                 />
//                 <div style={{ color: 'red' }} className="error-message">{formErrors.driverName}</div>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Transporter Name
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="text"
//                   id="transporterName"
//                   name='transporterName'
//                   value={gateIn.transporterName}
//                   onChange={handleGateInChange}
//                   maxLength={50}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   DO No
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="text"
//                   id="deliveryOrderNo"
//                   name='deliveryOrderNo'
//                   value={gateIn.deliveryOrderNo}
//                   onChange={handleGateInChange}
//                   maxLength={10}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Do Date
//                 </label>
//                 <div style={{ position: 'relative' }}>
//                   <DatePicker
//                     selected={gateIn.deliveryOrderDate}
//                     onChange={(date) => {
//                       setGateIn(prevState => ({
//                         ...prevState,
//                         deliveryOrderDate: date,
//                         doValidityDate: date >= prevState.doValidityDate ? null : prevState.doValidityDate,
//                       }));

//                     }}
//                     name='deliveryOrderDate'
//                     id="deliveryOrderDate"
//                     dateFormat="dd/MM/yyyy"
//                     className="form-control"
//                     wrapperClassName="custom-react-datepicker-wrapper"
//                     customInput={
//                       <input
//                         style={{
//                           height: "30px",
//                           width: "100%",
//                         }}
//                       />

//                     }

//                   />
//                   <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
//                 </div>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Do Validity Date
//                 </label>
//                 <div style={{ position: 'relative' }}>
//                   <DatePicker
//                     selected={gateIn.doValidityDate}
//                     onChange={(date) => {
//                       setGateIn(prevState => ({
//                         ...prevState,
//                         doValidityDate: date
//                       }));

//                     }}
//                     minDate={(() => {
//                       const date = new Date(gateIn.deliveryOrderDate);
//                       date.setDate(date.getDate() + 1);
//                       return date;
//                     })()}
//                     name='doValidityDate'
//                     id="doValidityDate"
//                     dateFormat="dd/MM/yyyy"
//                     className="form-control"
//                     wrapperClassName="custom-react-datepicker-wrapper"
//                     customInput={
//                       <input
//                         style={{
//                           height: "30px",
//                           width: "100%",
//                         }}
//                       />

//                     }

//                   />
//                   <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
//                 </div>
//               </FormGroup>
//             </Col>
//           </Row>
//           <Row>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Shipping Agent <span style={{ color: 'red' }}>*</span>
//                 </label>
//                 <Select
//                   value={{ value: gateIn.sa, label: agentName }}
//                   onChange={handleAgentChange}
//                   onInputChange={getAgentData}
//                   options={agentData}
//                   placeholder="Select Shipping Agent"
//                   isClearable
//                   id="sa"
//                   name='sa'
//                   className={`autocompleteHeight ${formErrors.sa ? 'error-border' : ''}`}
//                    styles={{
//                       control: (provided, state) => ({
//                         ...provided,
//                         height: 32,  // Set the height of the select input
//                         minHeight: 32,
//                         border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
//                         // display: 'flex',
//                         // alignItems: 'center',  // Vertically center the content
//                         // padding: '0 10px',     // Ensure padding is consistent
//                         // borderRadius: '6px',
//                         // width: '100%',
//                         // boxSizing: 'border-box',
//                         // position: 'relative',  // Ensure positioning doesn't cause layout issues
//                       }),
            
//                       valueContainer: (provided) => ({
//                         ...provided,
//                         // display: 'flex',
//                         alignItems: 'center',  // Vertically center the text
//                         padding: '0 8px',
//                         height: '100%',
//                         whiteSpace: 'nowrap',
//                         textOverflow: 'ellipsis',
//                         lineHeight: '28px',
//                         maxWidth: 'calc(100% - 20px)',
//                         position: 'relative',
//                         overflow: 'visible',
//                       }),
            
//                       input: (provided) => ({
//                         ...provided,
//                         width: '100%',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                         whiteSpace: 'nowrap',
//                         outline: 'none', // Avoid outline clashes
//                       }),
            
//                       singleValue: (provided) => ({
//                         ...provided,
//                         lineHeight: '32px',
//                         overflow: 'hidden',
//                         whiteSpace: 'nowrap',
//                         textOverflow: 'ellipsis',
//                       }),
            
//                       clearIndicator: (provided) => ({
//                         ...provided,
//                         padding: 2,
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         position: 'absolute',
//                         right: 5,
//                         top: '50%',
//                         transform: 'translateY(-50%)', // Vertically center the clear indicator
//                       }),
            
//                       indicatorSeparator: () => ({
//                         display: 'none', // Remove the separator between indicators
//                       }),
            
//                       dropdownIndicator: () => ({
//                         display: 'none', // Remove the dropdown arrow
//                       }),
            
//                       placeholder: (provided) => ({
//                         ...provided,
//                         lineHeight: '32px',
//                         color: 'gray',
//                       }),
//                     }}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Shipping Line <span style={{ color: 'red' }}>*</span>
//                 </label>
//                 <Select
//                   value={{ value: gateIn.sl, label: linerName }}
//                   onChange={handleLinerChange}
//                   onInputChange={getLinerData}
//                   options={linerData}
//                   placeholder="Select Shipping Agent"
//                   isClearable
//                   id="sl"
//                   name='sl'
//                   className={`autocompleteHeight ${formErrors.sl ? 'error-border' : ''}`}
//                    styles={{
//                       control: (provided, state) => ({
//                         ...provided,
//                         height: 32,  // Set the height of the select input
//                         minHeight: 32,
//                         border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
//                         // display: 'flex',
//                         // alignItems: 'center',  // Vertically center the content
//                         // padding: '0 10px',     // Ensure padding is consistent
//                         // borderRadius: '6px',
//                         // width: '100%',
//                         // boxSizing: 'border-box',
//                         // position: 'relative',  // Ensure positioning doesn't cause layout issues
//                       }),
            
//                       valueContainer: (provided) => ({
//                         ...provided,
//                         // display: 'flex',
//                         alignItems: 'center',  // Vertically center the text
//                         padding: '0 8px',
//                         height: '100%',
//                         whiteSpace: 'nowrap',
//                         textOverflow: 'ellipsis',
//                         lineHeight: '28px',
//                         maxWidth: 'calc(100% - 20px)',
//                         position: 'relative',
//                         overflow: 'visible',
//                       }),
            
//                       input: (provided) => ({
//                         ...provided,
//                         width: '100%',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                         whiteSpace: 'nowrap',
//                         outline: 'none', // Avoid outline clashes
//                       }),
            
//                       singleValue: (provided) => ({
//                         ...provided,
//                         lineHeight: '32px',
//                         overflow: 'hidden',
//                         whiteSpace: 'nowrap',
//                         textOverflow: 'ellipsis',
//                       }),
            
//                       clearIndicator: (provided) => ({
//                         ...provided,
//                         padding: 2,
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         position: 'absolute',
//                         right: 5,
//                         top: '50%',
//                         transform: 'translateY(-50%)', // Vertically center the clear indicator
//                       }),
            
//                       indicatorSeparator: () => ({
//                         display: 'none', // Remove the separator between indicators
//                       }),
            
//                       dropdownIndicator: () => ({
//                         display: 'none', // Remove the dropdown arrow
//                       }),
            
//                       placeholder: (provided) => ({
//                         ...provided,
//                         lineHeight: '32px',
//                         color: 'gray',
//                       }),
//                     }}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Container Health
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="select"
//                   id="containerHealth"
//                   name='containerHealth'
//                   value={gateIn.containerHealth}
//                   onChange={handleGateInChange}
//                 >
//                   <option value="" selected="">	</option>

//                   <option value="HDEMAG">Heavy Damage</option>

//                   <option value="LDEMAG">Light Damage</option>

//                   <option value="MDEMAG">Medium Damage</option>

//                   <option value="OK">Healthy</option>
//                 </Input>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Profitcentre Id
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="text"
//                   id="profitcentreId"
//                   name='profitcentreId'
//                   value={gateIn.profitcentreId}
//                   disabled
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Job Order No
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="text"
//                   id="jobOrderId"
//                   name='jobOrderId'
//                   value={gateIn.jobOrderId}
//                   onChange={handleGateInChange}
//                   maxLength={16}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Job Order Date
//                 </label>
//                 <div style={{ position: 'relative' }}>
//                   <DatePicker
//                     selected={gateIn.jobDate}
//                     onChange={(date) => {
//                       setGateIn(prevState => ({
//                         ...prevState,
//                         jobDate: date
//                       }));
//                     }}

//                     name='jobDate'
//                     id="jobDate"
//                     dateFormat="dd/MM/yyyy"
//                     className="form-control"
//                     wrapperClassName="custom-react-datepicker-wrapper"
//                     customInput={
//                       <input
//                         style={{
//                           height: "30px",
//                           width: "100%",
//                         }}
//                       />

//                     }

//                   />
//                   <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
//                 </div>
//               </FormGroup>
//             </Col>
//           </Row>
//           <Row>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Pick Up Yard
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="text"
//                   id="origin"
//                   name='origin'
//                   value={gateIn.origin}
//                   onChange={handleGateInChange}
//                   maxLength={50}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Remarks
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="textarea"
//                   id="comments"
//                   name='comments'
//                   value={gateIn.comments}
//                   onChange={handleGateInChange}
//                   maxLength={150}
//                 />
//               </FormGroup>
//             </Col>

//           </Row>

//           <Row className='text-center'>
//             <Col>
//               <button
//                 className="btn btn-outline-primary btn-margin newButton"
//                 style={{ marginRight: 10 }}
//                 id="submitbtn2"
//                 onClick={handleSave}
//               >
//                 <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
//                 Save
//               </button>
//               <button
//                 className="btn btn-outline-danger btn-margin newButton"
//                 style={{ marginRight: 10 }}
//                 id="submitbtn2"
//                 onClick={handleClear}
//               >
//                 <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
//                 Clear
//               </button>
//               <button
//                 className="btn btn-outline-success btn-margin newButton"
//                 style={{ marginRight: 10 }}
//                 id="submitbtn2"
//                 disabled={gateIn.gateInId === ''}
//                 onClick={downloadMtyGateInReport}
//               >
//                 <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
//                 Print Report
//               </button>
//             </Col>
//           </Row>
//         </div>
//       </div>
//     </>
//   );
// }


// export default ExportEmptyContainerGateIn;




// import AuthContext from '../Components/AuthProvider';
// import { useLocation, useNavigate } from 'react-router-dom';
// import React, { useEffect, useState, useContext } from 'react';
// import '../Components/Style.css';
// import { Pagination } from 'react-bootstrap';
// import Select from 'react-select';
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
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faShip, faBackward, faCalendarAlt, faAdd, faPlaneDeparture, faCalculator, faTired, faWheatAwnCircleExclamation, faToriiGate } from '@fortawesome/free-solid-svg-icons';
// import '../assets/css/style.css';
// import '../Components/Style.css';
// import { Button } from "react-bootstrap";
// import useAxios from '../Components/useAxios';
// import CFSService from '../service/CFSService';
// import { toast } from 'react-toastify';
// import ipaddress from "../Components/IpAddress";
// import moment from 'moment';

// function ExportEmptyContainerGateIn({ searchData, resetFlag }) {

//   const navigate = useNavigate();
//   const axios = useAxios();
//   const { isAuthenticated } = useContext(AuthContext);

//   // If the user is not authenticated, redirect to the login page
//   useEffect(() => {
//     if (!isAuthenticated) {

//       navigate('/login?message=You need to be authenticated to access this page.');
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
//     userRights
//   } = useContext(AuthContext);


//   const styles = {
//     overlay: {
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       backgroundColor: 'rgba(255, 255, 255, 0.8)',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       zIndex: 9999,
//     },
//   };

//   const location = useLocation();
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const queryParams = new URLSearchParams(location.search);
//   const processId = queryParams.get('process_id');

//   const foundRights = role !== 'ROLE_ADMIN' ? userRights.find(item => item.process_Id === processId) : null;
//   const allowCreate = foundRights?.allow_Create === 'Y';
//   const allowRead = foundRights?.allow_Read === 'Y';
//   const allowEdit = foundRights?.allow_Update === 'Y';
//   const allowDelete = foundRights?.allow_Delete === 'Y';


//   const [gateIn, setGateIn] = useState({
//     companyId: '',
//     branchId: '',
//     gateInId: '',
//     finYear: new Date().getFullYear(),
//     erpDocRefNo: '',
//     docRefNo: '',
//     lineNo: '',
//     srNo: 0,
//     docRefDate: null,
//     profitcentreId: 'CFS Export',
//     viaNo: '',
//     containerNo: '',
//     containerSize: '',
//     isoCode: '',
//     containerType: '',
//     containerStatus: 'MTY',
//     containerSealNo: '',
//     tareWeight: '',
//     sa: '',
//     sl: '',
//     containerHealth: '',
//     transporterName: '',
//     vehicleNo: '',
//     driverName: '',
//     comments: '',
//     status: '',
//     createdBy: '',
//     jobOrderId: '',
//     jobDate: null,
//     inGateInDate: new Date(),
//     deliveryOrderNo: '',
//     deliveryOrderDate: null,
//     doValidityDate: null,
//     onAccountOf: '',
//     origin: ''
//   })

//   const [formErrors, setFormErrors] = useState({
//     containerNo: '',
//     isoCode: '',
//     tareWeight: '',
//     vehicleNo: '',
//     driverName: '',
//     onAccountOf: '',
//     sa: '',
//     sl: ''
//   })

//   const [noCheckDigit, setNoCheckDigit] = useState('N');
//   const [chaData, setChaData] = useState([]);
//   const [partyName, setpartyName] = useState('');

//   const searchChaData = (id) => {
//     if (id === '') {
//       setChaData([]);
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
//         setChaData(portOptions);
//       })
//       .catch((error) => {
//         setChaData([]);
//       })
//   }


//   const handleOnAccounOfChange = async (selectedOption, { action }) => {
//     if (action === 'clear') {
//       setGateIn({
//         ...gateIn,
//         onAccountOf: ''
//       })
//       setpartyName('');
//     }
//     else {
//       setGateIn({
//         ...gateIn,
//         onAccountOf: selectedOption.value
//       })
//       setpartyName(selectedOption.label);
//       setFormErrors({
//         ...formErrors,
//         onAccountOf : ''
//       })
//     }
//   }


//   const handleContainerNoValidation1 = (containerNo) => {
//     const containerNoUpper = containerNo.toUpperCase();
//     console.log(containerNoUpper);

//     let s = 0;
//     let x = 0;

//     // Char values mapping
//     const charVal = {
//       A: "10",
//       B: "12",
//       C: "13",
//       D: "14",
//       E: "15",
//       F: "16",
//       G: "17",
//       H: "18",
//       I: "19",
//       J: "20",
//       K: "21",
//       L: "23",
//       M: "24",
//       N: "25",
//       O: "26",
//       P: "27",
//       Q: "28",
//       R: "29",
//       S: "30",
//       T: "31",
//       U: "32",
//       V: "34",
//       W: "35",
//       X: "36",
//       Y: "37",
//       Z: "38",
//     };

//     const len = containerNoUpper.length;

//     if (len !== 11) {
//       return false;
//     } else {
//       for (let i = 0; i < len - 1; i++) {
//         const asciiVal = containerNoUpper.charCodeAt(i);
//         if (asciiVal >= 65 && asciiVal <= 90) { // A-Z
//           s += Math.pow(2, i) * parseInt(charVal[containerNoUpper.charAt(i)]);
//         } else {
//           s += Math.pow(2, i) * parseInt(containerNoUpper.charAt(i));
//         }
//       }

//       x = s % 11;

//       if (
//         x === parseInt(containerNoUpper.charAt(len - 1)) ||
//         (x === 10 && containerNoUpper.charAt(len - 1) === "0")
//       ) {
//         // Valid container number
//         return true;
//       } else {
//         // Invalid container number
//         return false;
//       }
//     }
//   };

//   function handleInputChange(e) {
//     const inputValue = e;
//     const numericInput = inputValue.replace(/[^0-9.]/g, '');
//     const parts = numericInput.split('.');
//     const integerPart = parts[0].slice(0, 12);
//     let decimalPart = parts[1];

//     // Limit decimal places if needed
//     if (decimalPart !== undefined) {
//       decimalPart = `.${decimalPart.slice(0, 3)}`;
//     }

//     const sanitizedInput = decimalPart !== undefined ? `${integerPart}${decimalPart}` : integerPart;
//     return sanitizedInput;
//   };

//   const handleGateInChange = (e) => {
//     const { name, value } = e.target;

//     let sanitizedValue = value;


//     if (['tareWeight'].includes(name)) {
//       sanitizedValue = handleInputChange(sanitizedValue);
//     }

//     if (name === 'containerNo') 
//     {
//       if (value && noCheckDigit === 'N') {
//         if (!handleContainerNoValidation1(value)) {
//           setFormErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: "Invalid Container No.",
//           }));

//         }
//         else {
//           setFormErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: "",
//           }));
//         }
//       }
//       else {
//         setFormErrors((prevErrors) => ({
//           ...prevErrors,
//           [name]: "",
//         }));
//       }
//     }
//     else {
//       setFormErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: "",
//       }));
//     }

//     setGateIn({
//       ...gateIn,
//       [name]: sanitizedValue,
//     });



//   };

//   const [linerName, setLinerName] = useState('');
//   const [agentName, setAgentName] = useState('');
//   const [linerData, setLinerData] = useState([]);
//   const [agentData, setAgentData] = useState([]);

//   const handleClear = () => {
//     setLinerName('');
//     setAgentName('');
//     setGateIn({
//       companyId: '',
//       branchId: '',
//       gateInId: '',
//       finYear: new Date().getFullYear(),
//       erpDocRefNo: '',
//       docRefNo: '',
//       lineNo: '',
//       srNo: 0,
//       docRefDate: null,
//       profitcentreId: 'CFS Export',
//       viaNo: '',
//       containerNo: '',
//       containerSize: '',
//       isoCode: '',
//       containerType: '',
//       containerStatus: 'MTY',
//       containerSealNo: '',
//       tareWeight: '',
//       sa: '',
//       sl: '',
//       containerHealth: '',
//       transporterName: '',
//       vehicleNo: '',
//       driverName: '',
//       comments: '',
//       status: '',
//       createdBy: '',
//       jobOrderId: '',
//       jobDate: null,
//       inGateInDate: new Date(),
//       deliveryOrderNo: '',
//       deliveryOrderDate: null,
//       doValidityDate: null,
//       onAccountOf: '',
//       origin: ''
//     })
//     setFormErrors({
//       containerNo: '',
//       isoCode: '',
//       tareWeight: '',
//       vehicleNo: '',
//       driverName: '',
//       onAccountOf: '',
//       sa: '',
//       sl: ''
//     })
//     setNoCheckDigit('N');
//     setpartyName('');
//   }

//   const [isoCodes, setIsoCodes] = useState([]);


//   const getIsoContainers = () => {
//     axios.get(`${ipaddress}IsoContainer/searchByIsoCode?companyId=${companyid}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {
//         const data = response.data;
//         const portOptions = data.map(port => ({
//           value: port.isoCode,
//           label: port.isoCode,
//           type: port.containerType,
//           size: port.containerSize,
//           wt: port.tareWeight
//         }))
//         setIsoCodes(portOptions);
//       })
//       .catch((error) => {

//       })
//   }

//   useEffect(() => {
//     if (searchData && searchData.activeTab === 'P00219') {
//       getIsoContainers();
//     }

//   }, [searchData])

//   const handleIsoChange = async (selectedOption, { action }) => {
//     if (action === 'clear') {
//       setGateIn({
//         ...gateIn,
//         isoCode: '',
//         containerSize: '',
//         containerType: '',
//         tareWeight: ''
//       })
//     }
//     else {
//       setGateIn({
//         ...gateIn,
//         isoCode: selectedOption.value,
//         containerSize: selectedOption.size,
//         containerType: selectedOption.type,
//         tareWeight: selectedOption.wt
//       })

//       setFormErrors((prevErrors) => ({
//         ...prevErrors,
//         isoCode: "",
//         tareWeight: ""
//       }));
//     }
//   }

//   const getLinerData = (val) => {
//     if (val === '') {
//       setLinerData([]);
//       return;
//     }

//     axios.get(`${ipaddress}party/getLiner?cid=${companyid}&bid=${branchId}&val=${val}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {
//         const data = response.data;
//         const portOptions = data.map(port => ({
//           value: port[0],
//           label: port[1],
//           code: port[2]
//         }))
//         setLinerData(portOptions);
//       })
//       .catch((error) => {

//       })
//   }


//   const getAgentData = (val) => {
//     if (val === '') {
//       setAgentData([]);
//       return;
//     }

//     axios.get(`${ipaddress}party/getAgent?cid=${companyid}&bid=${branchId}&val=${val}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {
//         const data = response.data;
//         const portOptions = data.map(port => ({
//           value: port[0],
//           label: port[1],
//           code: port[2]
//         }))
//         setAgentData(portOptions);
//       })
//       .catch((error) => {

//       })
//   }


//   const handleLinerChange = async (selectedOption, { action }) => {

//     if (action === 'clear') {
//       setLinerName('');

//       setGateIn({
//         ...gateIn,
//         sl: ''
//       })
//     }
//     else {
//       setLinerName(selectedOption ? selectedOption.label : '');
//       setGateIn({
//         ...gateIn,
//         sl: selectedOption ? selectedOption.value : ''
//       });
//       setFormErrors({
//         ...formErrors,
//         sl : ''
//       })
//     }
//   };

//   const handleAgentChange = async (selectedOption, { action }) => {

//     if (action === 'clear') {
//       setAgentName('');
//       setGateIn({
//         ...gateIn,
//         sa: ''
//       })
//     }
//     else {
//       setAgentName(selectedOption ? selectedOption.label : '');
//       setGateIn({
//         ...gateIn,
//         sa: selectedOption ? selectedOption.value : ''
//       })
//       setFormErrors({
//         ...formErrors,
//         sa : ''
//       })
//     }
//   };


//   const handleSave = () => {
//     setLoading(true);
//     setFormErrors({
//       containerNo: '',
//       isoCode: '',
//       tareWeight: '',
//       vehicleNo: '',
//       driverName: '',
//       onAccountOf: '',
//       sa: '',
//       sl: ''
//     })

//     let errors = {};

//     if (!gateIn.containerNo) {
//       errors.containerNo = "Container no is required."
//     }
//     else {
//       if (!handleContainerNoValidation1(gateIn.containerNo) && noCheckDigit === 'N') {
//         errors.containerNo = "Invalid container no."
//       }
//     }
//     if (!gateIn.isoCode) {
//       errors.isoCode = "ISO is required."
//     }

//     if (!gateIn.tareWeight) {
//       errors.tareWeight = "Tare weight is required."
//     }

//     if (!gateIn.vehicleNo) {
//       errors.vehicleNo = "Vehicle no is required."
//     }

//     if (!gateIn.driverName) {
//       errors.driverName = "Driver name is required."
//     }
//     if (!gateIn.onAccountOf) {
//       errors.onAccountOf = "On account of is required."
//     }
//     if (!gateIn.sa) {
//       errors.sa = "Shipping agent is required."
//     }
//     if (!gateIn.sl) {
//       errors.sl = "Shipping line is required."
//     }

//     if (Object.keys(errors).length > 0) {
//       setLoading(false);
//       setFormErrors(errors);
//       toast.error("Please fill in the required fields.", {
//         autoClose: 1000
//       })
//       return;
//     }

//     axios.post(`${ipaddress}gateIn/saveExportEmptyContainer?cid=${companyid}&bid=${branchId}&user=${userId}`, gateIn, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {

//         const data = response.data;
//         const gate = data.gateInData;

//         if (!handleContainerNoValidation1(gate.containerNo)) {
//           setNoCheckDigit('Y');
//         }
//         else {
//           setNoCheckDigit('N');
//         }

//         setGateIn({
//           companyId: gate.companyId || '',
//           branchId: gate.branchId || '',
//           gateInId: gate.gateInId || '',
//           finYear: gate.finYear || new Date().getFullYear(),
//           erpDocRefNo: gate.erpDocRefNo || '',
//           docRefNo: gate.docRefNo || '',
//           lineNo: gate.lineNo || '',
//           srNo: gate.srNo || 0,
//           docRefDate: gate.docRefDate === null ? null : new Date(gate.docRefDate),
//           profitcentreId: 'CFS Export',
//           viaNo: gate.viaNo || '',
//           containerNo: gate.containerNo || '',
//           containerSize: gate.containerSize || '',
//           isoCode: gate.isoCode || '',
//           containerType: gate.containerType || '',
//           containerStatus: 'MTY',
//           containerSealNo: gate.containerSealNo || '',
//           tareWeight: gate.tareWeight || '',
//           sa: gate.sa || '',
//           sl: gate.sl || '',
//           containerHealth: gate.containerHealth || '',
//           transporterName: gate.transporterName || '',
//           vehicleNo: gate.vehicleNo || '',
//           driverName: gate.driverName || '',
//           comments: gate.comments || '',
//           status: gate.status || '',
//           createdBy: gate.createdBy || '',
//           jobOrderId: gate.jobOrderId || '',
//           jobDate: gate.jobDate === null ? null : new Date(gate.jobDate),
//           inGateInDate: gate.inGateInDate === null ? null : new Date(gate.inGateInDate),
//           deliveryOrderNo: gate.deliveryOrderNo || '',
//           deliveryOrderDate: gate.deliveryOrderDate === null ? null : new Date(gate.deliveryOrderDate),
//           doValidityDate: gate.doValidityDate === null ? null : new Date(gate.doValidityDate),
//           onAccountOf: gate.onAccountOf || '',
//           origin: gate.origin || ''
//         })

//         setpartyName(data.onAccountOf);
//         setAgentName(data.sa);
//         setLinerName(data.sl);

//         setLoading(false);

//         toast.success("Data save successfully!!", {
//           autoClose: 800
//         })

//       })
//       .catch((error) => {

//         setLoading(false);

//         toast.error(error.response.data, {
//           autoClose: 800
//         })
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
//     axios.get(`${ipaddress}gateIn/searchExportEmptyContainerGateIn?cid=${companyid}&bid=${branchId}&search=${id}`, {
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


//   const getExportSearchSelectedData = (id) => {
//     setLoading(true);
//     axios.get(`${ipaddress}gateIn/getExportSearchSelectedData?cid=${companyid}&bid=${branchId}&gateInId=${id}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {
//         const data = response.data;
//         const gate = data.gateInData;

//         if (!handleContainerNoValidation1(gate.containerNo)) {
//           setNoCheckDigit('Y');
//         }
//         else {
//           setNoCheckDigit('N');
//         }

//         setGateIn({
//           companyId: gate.companyId || '',
//           branchId: gate.branchId || '',
//           gateInId: gate.gateInId || '',
//           finYear: gate.finYear || new Date().getFullYear(),
//           erpDocRefNo: gate.erpDocRefNo || '',
//           docRefNo: gate.docRefNo || '',
//           lineNo: gate.lineNo || '',
//           srNo: gate.srNo || 0,
//           docRefDate: gate.docRefDate === null ? null : new Date(gate.docRefDate),
//           profitcentreId: 'CFS Export',
//           viaNo: gate.viaNo || '',
//           containerNo: gate.containerNo || '',
//           containerSize: gate.containerSize || '',
//           isoCode: gate.isoCode || '',
//           containerType: gate.containerType || '',
//           containerStatus: 'MTY',
//           containerSealNo: gate.containerSealNo || '',
//           tareWeight: gate.tareWeight || '',
//           sa: gate.sa || '',
//           sl: gate.sl || '',
//           containerHealth: gate.containerHealth || '',
//           transporterName: gate.transporterName || '',
//           vehicleNo: gate.vehicleNo || '',
//           driverName: gate.driverName || '',
//           comments: gate.comments || '',
//           status: gate.status || '',
//           createdBy: gate.createdBy || '',
//           jobOrderId: gate.jobOrderId || '',
//           jobDate: gate.jobDate === null ? null : new Date(gate.jobDate),
//           inGateInDate: gate.inGateInDate === null ? null : new Date(gate.inGateInDate),
//           deliveryOrderNo: gate.deliveryOrderNo || '',
//           deliveryOrderDate: gate.deliveryOrderDate === null ? null : new Date(gate.deliveryOrderDate),
//           doValidityDate: gate.doValidityDate === null ? null : new Date(gate.doValidityDate),
//           onAccountOf: gate.onAccountOf || '',
//           origin: gate.origin || ''
//         })

//         setpartyName(data.onAccountOf);
//         setAgentName(data.sa);
//         setLinerName(data.sl);

//         setLoading(false);

//         toast.success("Data found successfully!!", {
//           autoClose: 800
//         })
//         closeGateInModal();
//       })
//       .catch((error) => {
//         toast.error(error.response.data, {
//           autoClose: 800
//         })
//         setLoading(false);
//       })
//   }


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

//         {/* <h5
//         className="pageHead"
//         style={{
//           fontFamily: "Your-Heading-Font",
//           paddingLeft: "2%",
//           paddingRight: "-20px",
//         }}
//       >
//         {" "}
//         <FontAwesomeIcon
//           icon={faToriiGate}
//           style={{
//             marginRight: "8px",
//             color: "black",
//           }}
//         />
//         Export Empty Container Gate In
//         <hr />
//       </h5> */}
//         <div>
//           <Modal Modal isOpen={isModalOpenForSearchGateInData} onClose={closeGateInModal} toggle={closeGateInModal} style={{ maxWidth: '1200px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

//             <ModalHeader toggle={closeGateInModal} style={{
//               backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
//               boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
//               border: '1px solid rgba(0, 0, 0, 0.3)',
//               borderRadius: '0',
//               backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
//               backgroundSize: 'cover',
//               backgroundRepeat: 'no-repeat',
//               //backgroundPosition: 'center',
//               backgroundPosition: 'center',
//             }} >


//               <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', color: 'white' }} > <FontAwesomeIcon
//                 icon={faSearch}
//                 style={{
//                   marginRight: '8px',
//                   color: 'white', // Set the color to golden
//                 }}
//               /> Search Empty Container Gate In Data</h5>



//             </ModalHeader>
//             <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
//               <Row>
//                 <Col md={4}>
//                   <FormGroup>
//                     <label className="forlabel bold-label" htmlFor="sbRequestId">
//                       Search by Gate In Id / Container No / Vehicle No
//                     </label>
//                     <input
//                       className="form-control"
//                       type="text"
//                       id="searchId"
//                       name='searchId'
//                       value={searchId}
//                       onChange={(e) => setSearchId(e.target.value)}
//                     />

//                   </FormGroup>
//                 </Col>
//                 <Col md={4} style={{ marginTop: 20 }}>
//                   <button
//                     className="btn btn-outline-primary btn-margin newButton"
//                     style={{ marginRight: 10, fontSize: 12 }}
//                     id="submitbtn2"
//                     onClick={() => searchExportEmptyContainerGateIn(searchId)}

//                   >
//                     <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
//                     Search
//                   </button>
//                   <button
//                     className="btn btn-outline-danger btn-margin newButton"
//                     style={{ marginRight: 10, fontSize: 12 }}
//                     id="submitbtn2"
//                     onClick={handleSearchClear}
//                   >
//                     <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
//                     Reset
//                   </button>
//                 </Col>
//               </Row>
//               <hr />

//               <div className="mt-1 table-responsive ">
//                 <table className="table table-bordered table-hover tableHeader">
//                   <thead className='tableHeader'>
//                     <tr>
//                       <th scope="col">#</th>
//                       <th scope="col">Gate In Id</th>
//                       <th scope="col">Gate In date</th>
//                       <th scope="col">Container No</th>
//                       <th scope="col">Vehicle No</th>

//                     </tr>
//                     <tr className='text-center'>
//                       <th scope="col"></th>
//                       <th scope="col">{gateInSearchData.length}</th>
//                       <th scope="col"></th>
//                       <th scope="col"></th>
//                       <th scope="col"></th>

//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentItems.map((item, index) => (
//                       <tr key={index}>
//                         <td>
//                           <input type="radio" onChange={() => getExportSearchSelectedData(item[0])} name="radioGroup" value={item[0]} />
//                         </td>
//                         <td>{item[0]}</td>
//                         <td>{item[1]}</td>
//                         <td>{item[2]}</td>
//                         <td>{item[3]}</td>

//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
//                   <Pagination.First onClick={() => handlePageChange(1)} />
//                   <Pagination.Prev
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 1}
//                   />
//                   <Pagination.Ellipsis />

//                   {displayPages().map((pageNumber) => (
//                     <Pagination.Item
//                       key={pageNumber}
//                       active={pageNumber === currentPage}
//                       onClick={() => handlePageChange(pageNumber)}
//                     >
//                       {pageNumber}
//                     </Pagination.Item>
//                   ))}

//                   <Pagination.Ellipsis />
//                   <Pagination.Next
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                   />
//                   <Pagination.Last onClick={() => handlePageChange(totalPages)} />
//                 </Pagination>
//               </div>
//             </ModalBody>
//           </Modal>
//           <Row>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Gate In No
//                 </label>
//                 <Row>
//                   <Col md={9}>
//                     <Input
//                       className="form-control"
//                       type="text"
//                       id="gateInId"
//                       name='gateInId'
//                       value={gateIn.gateInId}
//                       disabled
//                     />
//                   </Col>
//                   <Col md={3} className="d-flex justify-content-end">
//                     <button
//                       className="btn btn-outline-primary btn-margin newButton"
//                       style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//                       id="submitbtn2"
//                       onClick={openGateInModal}
//                     >
//                       <FontAwesomeIcon icon={faSearch} size="sm" s />
//                     </button>
//                   </Col>
//                 </Row>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Gate In Date
//                 </label>
//                 <div style={{ position: 'relative' }}>
//                   <DatePicker
//                     selected={gateIn.inGateInDate}
//                     name='inGateInDate'
//                     id="inGateInDate"
//                     dateFormat="dd/MM/yyyy HH:mm"
//                     className="form-control"
//                     disabled
//                     wrapperClassName="custom-react-datepicker-wrapper"
//                     customInput={
//                       <input
//                         style={{
//                           height: "30px",
//                           width: "100%",
//                         }}
//                       />

//                     }

//                   />
//                   <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
//                 </div>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   On Account Of <span style={{ color: 'red' }}>*</span>
//                 </label>
//                 <Select
//                   value={{ value: gateIn.onAccountOf, label: partyName }}
//                   onChange={handleOnAccounOfChange}
//                   onInputChange={searchChaData}
//                   options={chaData}
//                   placeholder="Select Party"
//                   isClearable
//                   id="onAccountOf"
//                   name='onAccountOf'
//                   className={`autocompleteHeight ${formErrors.onAccountOf ? 'error-border' : ''}`}
//                   styles={{
//                     control: (provided, state) => ({
//                       ...provided,
//                       height: 32, // Set height
//                       minHeight: 32, // Set minimum height
//                       border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
//                       boxShadow: "none",
//                       display: 'flex',
//                       alignItems: 'center', // Align items vertically
//                       padding: 0, // Remove padding to control height
//                       "&:hover": {
//                         border: "1px solid #ccc",
//                       },
//                       borderRadius: '6px', // Add border radius
//                       "&:hover": {
//                         border: "1px solid #ccc",
//                       },
//                     }),
//                     valueContainer: (provided) => ({
//                       ...provided,
//                       height: '100%', // Full height of the control
//                       display: 'flex',
//                       alignItems: 'center', // Align items vertically
//                       padding: '0 0.75rem', // Match padding
//                     }),
//                     singleValue: (provided) => ({
//                       ...provided,
//                       lineHeight: '32px', // Center text vertically
//                     }),
//                     indicatorSeparator: () => ({
//                       display: "none",
//                     }),
//                     dropdownIndicator: () => ({
//                       display: "none",
//                     }),
//                     placeholder: (provided) => ({
//                       ...provided,
//                       lineHeight: '32px', // Center placeholder text vertically
//                       color: "gray",
//                     }),
//                     clearIndicator: (provided) => ({
//                       ...provided,
//                       padding: 2, // Remove padding
//                       display: 'flex',
//                       alignItems: 'center', // Align clear indicator vertically
//                     }),
//                   }}
//                 />

//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   No Check Digit
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="select"
//                   id="noCheckDigit"
//                   name='noCheckDigit'
//                   value={noCheckDigit}
//                   onChange={(e) => {
//                     setNoCheckDigit(e.target.value);

//                     if (e.target.value === 'Y') {
//                       setFormErrors((prevErrors) => ({
//                         ...prevErrors,
//                         ['containerNo']: "",
//                       }));
//                     }
//                     else {
//                       if (!handleContainerNoValidation1(gateIn.containerNo)) {
//                         setFormErrors((prevErrors) => ({
//                           ...prevErrors,
//                           ['containerNo']: "Invalid Container No.",
//                         }));

//                       }
//                     }
//                   }}
//                 >
//                   <option value="N">No</option>
//                   <option value="Y">Yes</option>
//                 </Input>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Status
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="text"
//                   id="status"
//                   name='status'
//                   value={gateIn.status === 'A' ? 'Approved' : gateIn.status}
//                   disabled
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Created By
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="text"
//                   id="createdBy"
//                   name='createdBy'
//                   value={gateIn.createdBy}
//                   disabled
//                 />
//               </FormGroup>
//             </Col>
//           </Row>
//           <Row>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Container No <span style={{ color: 'red' }}>*</span>
//                 </label>
//                 <Input
//                   className={`form-control ${formErrors.containerNo ? 'error-border' : ''}`}
//                   type="text"
//                   id="containerNo"
//                   name='containerNo'
//                   value={gateIn.containerNo}
//                   maxLength={11}
//                   onChange={handleGateInChange}
//                   disabled={gateIn.gateInId !== ''}
//                 />
//                 <div style={{ color: 'red' }} className="error-message">{formErrors.containerNo}</div>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   ISO Code <span style={{ color: 'red' }}>*</span>
//                 </label>
//                 <Select

//                   value={{ value: gateIn.isoCode, label: gateIn.isoCode }}
//                   onChange={handleIsoChange}
//                   options={isoCodes}
//                   placeholder="Select Container"
//                   isClearable
//                   id="isoCode"
//                   disabled={gateIn.gateInId !== ''}
//                   name="isoCode"
//                   className={`autocompleteHeight ${formErrors.isoCode ? 'error-border' : ''}`}

//                   styles={{
//                     control: (provided, state) => ({
//                       ...provided,
//                       height: 32, // Set height
//                       minHeight: 32, // Set minimum height
//                       border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
//                       boxShadow: "none",
//                       display: 'flex',
//                       alignItems: 'center', // Align items vertically
//                       padding: 0, // Remove padding to control height
//                       "&:hover": {
//                         border: "1px solid #ccc",
//                       },
//                       borderRadius: '6px', // Add border radius
//                       "&:hover": {
//                         border: "1px solid #ccc",
//                       },
//                     }),
//                     valueContainer: (provided) => ({
//                       ...provided,
//                       height: '100%', // Full height of the control
//                       display: 'flex',
//                       alignItems: 'center', // Align items vertically
//                       padding: '0 0.75rem', // Match padding
//                     }),
//                     singleValue: (provided) => ({
//                       ...provided,
//                       lineHeight: '32px', // Center text vertically
//                     }),
//                     indicatorSeparator: () => ({
//                       display: "none",
//                     }),
//                     dropdownIndicator: () => ({
//                       display: "none",
//                     }),
//                     placeholder: (provided) => ({
//                       ...provided,
//                       lineHeight: '32px', // Center placeholder text vertically
//                       color: "gray",
//                     }),
//                     clearIndicator: (provided) => ({
//                       ...provided,
//                       padding: 2, // Remove padding
//                       display: 'flex',
//                       alignItems: 'center', // Align clear indicator vertically
//                     }),
//                   }}
//                 />
//                 <div style={{ color: 'red' }} className="error-message">{formErrors.isoCode}</div>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Cont Size & Type
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="text"
//                   id="containerSize"
//                   name='containerSize'
//                   value={gateIn.containerSize + gateIn.containerType}
//                   disabled
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Tare Weight <span style={{ color: 'red' }}>*</span>
//                 </label>
//                 <Input
//                   className={`form-control ${formErrors.tareWeight ? 'error-border' : ''}`}
//                   type="text"
//                   id="tareWeight"
//                   name='tareWeight'
//                   value={gateIn.tareWeight}
//                   onChange={handleGateInChange}
//                   maxLength={16}
//                 />
//                 <div style={{ color: 'red' }} className="error-message">{formErrors.tareWeight}</div>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Seal No
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="text"
//                   id="containerSealNo"
//                   name='containerSealNo'
//                   value={gateIn.containerSealNo}
//                   onChange={handleGateInChange}
//                   maxLength={15}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Container Status
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="select"
//                   id="containerStatus"
//                   name='containerStatus'
//                   value={gateIn.containerStatus}
//                   disabled
//                 >
//                   <option value="MTY">EMPTY</option>
//                 </Input>
//               </FormGroup>
//             </Col>
//           </Row>
//           <Row>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Vehicle No <span style={{ color: 'red' }}>*</span>
//                 </label>
//                 <Input
//                   className={`form-control ${formErrors.vehicleNo ? 'error-border' : ''}`}
//                   type="text"
//                   id="vehicleNo"
//                   name='vehicleNo'
//                   value={gateIn.vehicleNo}
//                   onChange={handleGateInChange}
//                   maxLength={15}
//                 />
//                 <div style={{ color: 'red' }} className="error-message">{formErrors.vehicleNo}</div>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Driver Name <span style={{ color: 'red' }}>*</span>
//                 </label>
//                 <Input
//                   className={`form-control ${formErrors.driverName ? 'error-border' : ''}`}
//                   type="text"
//                   id="driverName"
//                   name='driverName'
//                   value={gateIn.driverName}
//                   onChange={handleGateInChange}
//                   maxLength={50}
//                 />
//                 <div style={{ color: 'red' }} className="error-message">{formErrors.driverName}</div>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Transporter Name
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="text"
//                   id="transporterName"
//                   name='transporterName'
//                   value={gateIn.transporterName}
//                   onChange={handleGateInChange}
//                   maxLength={50}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   DO No
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="text"
//                   id="deliveryOrderNo"
//                   name='deliveryOrderNo'
//                   value={gateIn.deliveryOrderNo}
//                   onChange={handleGateInChange}
//                   maxLength={10}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Do Date
//                 </label>
//                 <div style={{ position: 'relative' }}>
//                   <DatePicker
//                     selected={gateIn.deliveryOrderDate}
//                     onChange={(date) => {
//                       setGateIn(prevState => ({
//                         ...prevState,
//                         deliveryOrderDate: date,
//                         doValidityDate: date >= prevState.doValidityDate ? null : prevState.doValidityDate,
//                       }));

//                     }}
//                     name='deliveryOrderDate'
//                     id="deliveryOrderDate"
//                     dateFormat="dd/MM/yyyy"
//                     className="form-control"
//                     wrapperClassName="custom-react-datepicker-wrapper"
//                     customInput={
//                       <input
//                         style={{
//                           height: "30px",
//                           width: "100%",
//                         }}
//                       />

//                     }

//                   />
//                   <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
//                 </div>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Do Validity Date
//                 </label>
//                 <div style={{ position: 'relative' }}>
//                   <DatePicker
//                     selected={gateIn.doValidityDate}
//                     onChange={(date) => {
//                       setGateIn(prevState => ({
//                         ...prevState,
//                         doValidityDate: date
//                       }));

//                     }}
//                     minDate={(() => {
//                       const date = new Date(gateIn.deliveryOrderDate);
//                       date.setDate(date.getDate() + 1);
//                       return date;
//                     })()}
//                     name='doValidityDate'
//                     id="doValidityDate"
//                     dateFormat="dd/MM/yyyy"
//                     className="form-control"
//                     wrapperClassName="custom-react-datepicker-wrapper"
//                     customInput={
//                       <input
//                         style={{
//                           height: "30px",
//                           width: "100%",
//                         }}
//                       />

//                     }

//                   />
//                   <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
//                 </div>
//               </FormGroup>
//             </Col>
//           </Row>
//           <Row>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Shipping Agent <span style={{ color: 'red' }}>*</span>
//                 </label>
//                 <Select
//                   value={{ value: gateIn.sa, label: agentName }}
//                   onChange={handleAgentChange}
//                   onInputChange={getAgentData}
//                   options={agentData}
//                   placeholder="Select Shipping Agent"
//                   isClearable
//                   id="sa"
//                   name='sa'
//                   className={`autocompleteHeight ${formErrors.sa ? 'error-border' : ''}`}
//                   styles={{
//                     control: (provided, state) => ({
//                       ...provided,
//                       height: 32, // Set height
//                       minHeight: 32, // Set minimum height
//                       border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
//                       boxShadow: "none",
//                       display: 'flex',
//                       alignItems: 'center', // Align items vertically
//                       padding: 0, // Remove padding to control height
//                       "&:hover": {
//                         border: "1px solid #ccc",
//                       },
//                       borderRadius: '6px', // Add border radius
//                       "&:hover": {
//                         border: "1px solid #ccc",
//                       },
//                     }),
//                     valueContainer: (provided) => ({
//                       ...provided,
//                       height: '100%', // Full height of the control
//                       display: 'flex',
//                       alignItems: 'center', // Align items vertically
//                       padding: '0 0.75rem', // Match padding
//                     }),
//                     singleValue: (provided) => ({
//                       ...provided,
//                       lineHeight: '32px', // Center text vertically
//                     }),
//                     indicatorSeparator: () => ({
//                       display: "none",
//                     }),
//                     dropdownIndicator: () => ({
//                       display: "none",
//                     }),
//                     placeholder: (provided) => ({
//                       ...provided,
//                       lineHeight: '32px', // Center placeholder text vertically
//                       color: "gray",
//                     }),
//                     clearIndicator: (provided) => ({
//                       ...provided,
//                       padding: 2, // Remove padding
//                       display: 'flex',
//                       alignItems: 'center', // Align clear indicator vertically
//                     }),
//                   }}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Shipping Line <span style={{ color: 'red' }}>*</span>
//                 </label>
//                 <Select
//                   value={{ value: gateIn.sl, label: linerName }}
//                   onChange={handleLinerChange}
//                   onInputChange={getLinerData}
//                   options={linerData}
//                   placeholder="Select Shipping Agent"
//                   isClearable
//                   id="sl"
//                   name='sl'
//                   className={`autocompleteHeight ${formErrors.sl ? 'error-border' : ''}`}
//                   styles={{
//                     control: (provided, state) => ({
//                       ...provided,
//                       height: 32, // Set height
//                       minHeight: 32, // Set minimum height
//                       border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
//                       boxShadow: "none",
//                       display: 'flex',
//                       alignItems: 'center', // Align items vertically
//                       padding: 0, // Remove padding to control height
//                       "&:hover": {
//                         border: "1px solid #ccc",
//                       },
//                       borderRadius: '6px', // Add border radius
//                       "&:hover": {
//                         border: "1px solid #ccc",
//                       },
//                     }),
//                     valueContainer: (provided) => ({
//                       ...provided,
//                       height: '100%', // Full height of the control
//                       display: 'flex',
//                       alignItems: 'center', // Align items vertically
//                       padding: '0 0.75rem', // Match padding
//                     }),
//                     singleValue: (provided) => ({
//                       ...provided,
//                       lineHeight: '32px', // Center text vertically
//                     }),
//                     indicatorSeparator: () => ({
//                       display: "none",
//                     }),
//                     dropdownIndicator: () => ({
//                       display: "none",
//                     }),
//                     placeholder: (provided) => ({
//                       ...provided,
//                       lineHeight: '32px', // Center placeholder text vertically
//                       color: "gray",
//                     }),
//                     clearIndicator: (provided) => ({
//                       ...provided,
//                       padding: 2, // Remove padding
//                       display: 'flex',
//                       alignItems: 'center', // Align clear indicator vertically
//                     }),
//                   }}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Container Health
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="select"
//                   id="containerHealth"
//                   name='containerHealth'
//                   value={gateIn.containerHealth}
//                   onChange={handleGateInChange}
//                 >
//                   <option value="" selected="">	</option>

//                   <option value="HDEMAG">Heavy Damage</option>

//                   <option value="LDEMAG">Light Damage</option>

//                   <option value="MDEMAG">Medium Damage</option>

//                   <option value="OK">Healthy</option>
//                 </Input>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Profitcentre Id
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="text"
//                   id="profitcentreId"
//                   name='profitcentreId'
//                   value={gateIn.profitcentreId}
//                   disabled
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Job Order No
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="text"
//                   id="jobOrderId"
//                   name='jobOrderId'
//                   value={gateIn.jobOrderId}
//                   onChange={handleGateInChange}
//                   maxLength={16}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Job Order Date
//                 </label>
//                 <div style={{ position: 'relative' }}>
//                   <DatePicker
//                     selected={gateIn.jobDate}
//                     onChange={(date) => {
//                       setGateIn(prevState => ({
//                         ...prevState,
//                         jobDate: date
//                       }));
//                     }}

//                     name='jobDate'
//                     id="jobDate"
//                     dateFormat="dd/MM/yyyy"
//                     className="form-control"
//                     wrapperClassName="custom-react-datepicker-wrapper"
//                     customInput={
//                       <input
//                         style={{
//                           height: "30px",
//                           width: "100%",
//                         }}
//                       />

//                     }

//                   />
//                   <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
//                 </div>
//               </FormGroup>
//             </Col>
//           </Row>
//           <Row>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Pick Up Yard
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="text"
//                   id="origin"
//                   name='origin'
//                   value={gateIn.origin}
//                   onChange={handleGateInChange}
//                   maxLength={50}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Remarks
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="textarea"
//                   id="comments"
//                   name='comments'
//                   value={gateIn.comments}
//                   onChange={handleGateInChange}
//                   maxLength={150}
//                 />
//               </FormGroup>
//             </Col>

//           </Row>

//           <Row className='text-center'>
//             <Col>
//               <button
//                 className="btn btn-outline-primary btn-margin newButton"
//                 style={{ marginRight: 10 }}
//                 id="submitbtn2"
//                 onClick={handleSave}
//               >
//                 <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
//                 Save
//               </button>
//               <button
//                 className="btn btn-outline-danger btn-margin newButton"
//                 style={{ marginRight: 10 }}
//                 id="submitbtn2"
//                 onClick={handleClear}
//               >
//                 <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
//                 Clear
//               </button>
//             </Col>
//           </Row>
//         </div>
//       </div>
//     </>
//   );
// }


// export default ExportEmptyContainerGateIn;







import AuthContext from '../Components/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import { Pagination } from 'react-bootstrap';
import Select from 'react-select';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faShip, faBackward, faCalendarAlt, faAdd, faPlaneDeparture, faCalculator, faTired, faWheatAwnCircleExclamation, faToriiGate, faPrint } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import useAxios from '../Components/useAxios';
import { toast } from 'react-toastify';
import ipaddress from "../Components/IpAddress";

function ExportEmptyContainerGateIn({ searchData, resetFlag }) {

  const navigate = useNavigate();
  const axios = useAxios();
  const { isAuthenticated } = useContext(AuthContext);

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {

      navigate('/login?message=You need to be authenticated to access this page.');
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
    userRights
  } = useContext(AuthContext);


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
  };

  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const processId = 'P00219';

  const foundRights = role !== 'ROLE_ADMIN' ? userRights.find(item => item.process_Id === processId) : null;
  const allowCreate = foundRights?.allow_Create === 'Y';
  const allowRead = foundRights?.allow_Read === 'Y';
  const allowEdit = foundRights?.allow_Update === 'Y';
  const allowDelete = foundRights?.allow_Delete === 'Y';




  useEffect(() => {
    if (searchData && searchData.activeTab === processId && searchData.containerGateInId && searchData.containerNo) {
      getExportSearchSelectedData(searchData.containerGateInId);
    }
  }, [searchData]);

  useEffect(() => {
    if (resetFlag) {
      handleClear();
    }
  }, [resetFlag]);

















  const [gateIn, setGateIn] = useState({
    companyId: '',
    branchId: '',
    gateInId: '',
    finYear: new Date().getFullYear(),
    erpDocRefNo: '',
    docRefNo: '',
    lineNo: '',
    srNo: 0,
    docRefDate: null,
    profitcentreId: 'CFS Export',
    viaNo: '',
    containerNo: '',
    containerSize: '',
    isoCode: '',
    containerType: '',
    containerStatus: 'MTY',
    containerSealNo: '',
    tareWeight: '',
    sa: '',
    sl: '',
    containerHealth: '',
    transporterName: '',
    vehicleNo: '',
    driverName: '',
    comments: '',
    status: '',
    createdBy: '',
    jobOrderId: '',
    jobDate: null,
    inGateInDate: new Date(),
    deliveryOrderNo: '',
    deliveryOrderDate: null,
    doValidityDate: null,
    onAccountOf: '',
    origin: ''
  })

  const [formErrors, setFormErrors] = useState({
    containerNo: '',
    isoCode: '',
    tareWeight: '',
    vehicleNo: '',
    driverName: '',
    onAccountOf: '',
    sa: '',
    sl: ''
  })

  const [noCheckDigit, setNoCheckDigit] = useState('N');
  const [chaData, setChaData] = useState([]);
  const [partyName, setpartyName] = useState('');

  const searchChaData = (id) => {
    if (id === '') {
      setChaData([]);
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
        setChaData(portOptions);
      })
      .catch((error) => {
        setChaData([]);
      })
  }


  const handleOnAccounOfChange = async (selectedOption, { action }) => {
    if (action === 'clear') {
      setGateIn({
        ...gateIn,
        onAccountOf: ''
      })
      setpartyName('');
    }
    else {
      setGateIn({
        ...gateIn,
        onAccountOf: selectedOption.value
      })
      setpartyName(selectedOption.label);
      setFormErrors({
        ...formErrors,
        onAccountOf: ''
      })
    }
  }


  const handleContainerNoValidation1 = (containerNo) => {
    const containerNoUpper = containerNo.toUpperCase();
    // console.log(containerNoUpper);

    let s = 0;
    let x = 0;

    // Char values mapping
    const charVal = {
      A: "10",
      B: "12",
      C: "13",
      D: "14",
      E: "15",
      F: "16",
      G: "17",
      H: "18",
      I: "19",
      J: "20",
      K: "21",
      L: "23",
      M: "24",
      N: "25",
      O: "26",
      P: "27",
      Q: "28",
      R: "29",
      S: "30",
      T: "31",
      U: "32",
      V: "34",
      W: "35",
      X: "36",
      Y: "37",
      Z: "38",
    };

    const len = containerNoUpper.length;

    if (len !== 11) {
      return false;
    } else {
      for (let i = 0; i < len - 1; i++) {
        const asciiVal = containerNoUpper.charCodeAt(i);
        if (asciiVal >= 65 && asciiVal <= 90) { // A-Z
          s += Math.pow(2, i) * parseInt(charVal[containerNoUpper.charAt(i)]);
        } else {
          s += Math.pow(2, i) * parseInt(containerNoUpper.charAt(i));
        }
      }

      x = s % 11;

      if (
        x === parseInt(containerNoUpper.charAt(len - 1)) ||
        (x === 10 && containerNoUpper.charAt(len - 1) === "0")
      ) {
        // Valid container number
        return true;
      } else {
        // Invalid container number
        return false;
      }
    }
  };

  function handleInputChange(e) {
    const inputValue = e;
    const numericInput = inputValue.replace(/[^0-9.]/g, '');
    const parts = numericInput.split('.');
    const integerPart = parts[0].slice(0, 12);
    let decimalPart = parts[1];

    // Limit decimal places if needed
    if (decimalPart !== undefined) {
      decimalPart = `.${decimalPart.slice(0, 3)}`;
    }

    const sanitizedInput = decimalPart !== undefined ? `${integerPart}${decimalPart}` : integerPart;
    return sanitizedInput;
  };

  const handleGateInChange = (e) => {
    const { name, value } = e.target;

    let sanitizedValue = value;


    if (['tareWeight'].includes(name)) {
      sanitizedValue = handleInputChange(sanitizedValue);
    }

    if (name === 'containerNo') {
      if (value && noCheckDigit === 'N') {
        if (!handleContainerNoValidation1(value)) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Invalid Container No.",
          }));

        }
        else {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
          }));
        }
      }
      else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }
    else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }

    setGateIn({
      ...gateIn,
      [name]: sanitizedValue,
    });



  };

  const [linerName, setLinerName] = useState('');
  const [agentName, setAgentName] = useState('');
  const [linerData, setLinerData] = useState([]);
  const [agentData, setAgentData] = useState([]);

  const handleClear = () => {
    setLinerName('');
    setAgentName('');
    setGateIn({
      companyId: '',
      branchId: '',
      gateInId: '',
      finYear: new Date().getFullYear(),
      erpDocRefNo: '',
      docRefNo: '',
      lineNo: '',
      srNo: 0,
      docRefDate: null,
      profitcentreId: 'CFS Export',
      viaNo: '',
      containerNo: '',
      containerSize: '',
      isoCode: '',
      containerType: '',
      containerStatus: 'MTY',
      containerSealNo: '',
      tareWeight: '',
      sa: '',
      sl: '',
      containerHealth: '',
      transporterName: '',
      vehicleNo: '',
      driverName: '',
      comments: '',
      status: '',
      createdBy: '',
      jobOrderId: '',
      jobDate: null,
      inGateInDate: new Date(),
      deliveryOrderNo: '',
      deliveryOrderDate: null,
      doValidityDate: null,
      onAccountOf: '',
      origin: ''
    })
    setFormErrors({
      containerNo: '',
      isoCode: '',
      tareWeight: '',
      vehicleNo: '',
      driverName: '',
      onAccountOf: '',
      sa: '',
      sl: ''
    })
    setNoCheckDigit('N');
    setpartyName('');
  }

  const [isoCodes, setIsoCodes] = useState([]);


  const getIsoContainers = () => {
    axios.get(`${ipaddress}IsoContainer/searchByIsoCode?companyId=${companyid}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;
        const portOptions = data.map(port => ({
          value: port.isoCode,
          label: port.isoCode,
          type: port.containerType,
          size: port.containerSize,
          wt: port.tareWeight
        }))
        setIsoCodes(portOptions);
      })
      .catch((error) => {

      })
  }

  useEffect(() => {
    if (searchData && searchData.activeTab === 'P00219') {
      getIsoContainers();
    }

  }, [searchData])

  const handleIsoChange = async (selectedOption, { action }) => {
    if (action === 'clear') {
      setGateIn({
        ...gateIn,
        isoCode: '',
        containerSize: '',
        containerType: '',
        tareWeight: ''
      })
    }
    else {
      setGateIn({
        ...gateIn,
        isoCode: selectedOption.value,
        containerSize: selectedOption.size,
        containerType: selectedOption.type,
        tareWeight: selectedOption.wt
      })

      setFormErrors((prevErrors) => ({
        ...prevErrors,
        isoCode: "",
        tareWeight: ""
      }));
    }
  }

  const getLinerData = (val) => {
    if (val === '') {
      setLinerData([]);
      return;
    }

    axios.get(`${ipaddress}party/getLiner?cid=${companyid}&bid=${branchId}&val=${val}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;
        const portOptions = data.map(port => ({
          value: port[0],
          label: port[1],
          code: port[2]
        }))
        setLinerData(portOptions);
      })
      .catch((error) => {

      })
  }


  const getAgentData = (val) => {
    if (val === '') {
      setAgentData([]);
      return;
    }

    axios.get(`${ipaddress}party/getAgent?cid=${companyid}&bid=${branchId}&val=${val}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;
        const portOptions = data.map(port => ({
          value: port[0],
          label: port[1],
          code: port[2]
        }))
        setAgentData(portOptions);
      })
      .catch((error) => {

      })
  }


  const handleLinerChange = async (selectedOption, { action }) => {

    if (action === 'clear') {
      setLinerName('');

      setGateIn({
        ...gateIn,
        sl: ''
      })
    }
    else {
      setLinerName(selectedOption ? selectedOption.label : '');
      setGateIn({
        ...gateIn,
        sl: selectedOption ? selectedOption.value : ''
      });
      setFormErrors({
        ...formErrors,
        sl: ''
      })
    }
  };

  const handleAgentChange = async (selectedOption, { action }) => {

    if (action === 'clear') {
      setAgentName('');
      setGateIn({
        ...gateIn,
        sa: ''
      })
    }
    else {
      setAgentName(selectedOption ? selectedOption.label : '');
      setGateIn({
        ...gateIn,
        sa: selectedOption ? selectedOption.value : ''
      })
      setFormErrors({
        ...formErrors,
        sa: ''
      })
    }
  };


  const handleSave = () => {
    setLoading(true);
    setFormErrors({
      containerNo: '',
      isoCode: '',
      tareWeight: '',
      vehicleNo: '',
      onAccountOf: '',
      sa: '',
      sl: ''
    })

    let errors = {};

    if (!gateIn.containerNo) {
      errors.containerNo = "Container no is required."
    }
    else {
      if (!handleContainerNoValidation1(gateIn.containerNo) && noCheckDigit === 'N') {
        errors.containerNo = "Invalid container no."
      }
    }
    if (!gateIn.isoCode) {
      errors.isoCode = "ISO is required."
    }

    if (!gateIn.tareWeight) {
      errors.tareWeight = "Tare weight is required."
    }

    if (!gateIn.vehicleNo) {
      errors.vehicleNo = "Vehicle no is required."
    }

    if (!gateIn.onAccountOf) {
      errors.onAccountOf = "On account of is required."
    }
    if (!gateIn.sa) {
      errors.sa = "Shipping agent is required."
    }
    if (!gateIn.sl) {
      errors.sl = "Shipping line is required."
    }

    if (Object.keys(errors).length > 0) {
      setLoading(false);
      setFormErrors(errors);
      toast.error("Please fill in the required fields.", {
        autoClose: 1000
      })
      return;
    }

    axios.post(`${ipaddress}gateIn/saveExportEmptyContainer?cid=${companyid}&bid=${branchId}&user=${userId}`, gateIn, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {

        const data = response.data;
        const gate = data.gateInData;

        if (!handleContainerNoValidation1(gate.containerNo)) {
          setNoCheckDigit('Y');
        }
        else {
          setNoCheckDigit('N');
        }

        setGateIn({
          companyId: gate.companyId || '',
          branchId: gate.branchId || '',
          gateInId: gate.gateInId || '',
          finYear: gate.finYear || new Date().getFullYear(),
          erpDocRefNo: gate.erpDocRefNo || '',
          docRefNo: gate.docRefNo || '',
          lineNo: gate.lineNo || '',
          srNo: gate.srNo || 0,
          docRefDate: gate.docRefDate === null ? null : new Date(gate.docRefDate),
          profitcentreId: 'CFS Export',
          viaNo: gate.viaNo || '',
          containerNo: gate.containerNo || '',
          containerSize: gate.containerSize || '',
          isoCode: gate.isoCode || '',
          containerType: gate.containerType || '',
          containerStatus: 'MTY',
          containerSealNo: gate.containerSealNo || '',
          tareWeight: gate.tareWeight || '',
          sa: gate.sa || '',
          sl: gate.sl || '',
          containerHealth: gate.containerHealth || '',
          transporterName: gate.transporterName || '',
          vehicleNo: gate.vehicleNo || '',
          driverName: gate.driverName || '',
          comments: gate.comments || '',
          status: gate.status || '',
          createdBy: gate.createdBy || '',
          jobOrderId: gate.jobOrderId || '',
          jobDate: gate.jobDate === null ? null : new Date(gate.jobDate),
          inGateInDate: gate.inGateInDate === null ? null : new Date(gate.inGateInDate),
          deliveryOrderNo: gate.deliveryOrderNo || '',
          deliveryOrderDate: gate.deliveryOrderDate === null ? null : new Date(gate.deliveryOrderDate),
          doValidityDate: gate.doValidityDate === null ? null : new Date(gate.doValidityDate),
          onAccountOf: gate.onAccountOf || '',
          origin: gate.origin || ''
        })

        setpartyName(data.onAccountOf);
        setAgentName(data.sa);
        setLinerName(data.sl);

        setLoading(false);

        toast.success("Data save successfully!!", {
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
    axios.get(`${ipaddress}gateIn/searchExportEmptyContainerGateIn?cid=${companyid}&bid=${branchId}&search=${id}`, {
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


  const getExportSearchSelectedData = (id) => {
    setLoading(true);
    axios.get(`${ipaddress}gateIn/getExportSearchSelectedData?cid=${companyid}&bid=${branchId}&gateInId=${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;
        const gate = data.gateInData;

        if (!handleContainerNoValidation1(gate.containerNo)) {
          setNoCheckDigit('Y');
        }
        else {
          setNoCheckDigit('N');
        }

        setGateIn({
          companyId: gate.companyId || '',
          branchId: gate.branchId || '',
          gateInId: gate.gateInId || '',
          finYear: gate.finYear || new Date().getFullYear(),
          erpDocRefNo: gate.erpDocRefNo || '',
          docRefNo: gate.docRefNo || '',
          lineNo: gate.lineNo || '',
          srNo: gate.srNo || 0,
          docRefDate: gate.docRefDate === null ? null : new Date(gate.docRefDate),
          profitcentreId: 'CFS Export',
          viaNo: gate.viaNo || '',
          containerNo: gate.containerNo || '',
          containerSize: gate.containerSize || '',
          isoCode: gate.isoCode || '',
          containerType: gate.containerType || '',
          containerStatus: 'MTY',
          containerSealNo: gate.containerSealNo || '',
          tareWeight: gate.tareWeight || '',
          sa: gate.sa || '',
          sl: gate.sl || '',
          containerHealth: gate.containerHealth || '',
          transporterName: gate.transporterName || '',
          vehicleNo: gate.vehicleNo || '',
          driverName: gate.driverName || '',
          comments: gate.comments || '',
          status: gate.status || '',
          createdBy: gate.createdBy || '',
          jobOrderId: gate.jobOrderId || '',
          jobDate: gate.jobDate === null ? null : new Date(gate.jobDate),
          inGateInDate: gate.inGateInDate === null ? null : new Date(gate.inGateInDate),
          deliveryOrderNo: gate.deliveryOrderNo || '',
          deliveryOrderDate: gate.deliveryOrderDate === null ? null : new Date(gate.deliveryOrderDate),
          doValidityDate: gate.doValidityDate === null ? null : new Date(gate.doValidityDate),
          onAccountOf: gate.onAccountOf || '',
          origin: gate.origin || ''
        })

        setpartyName(data.onAccountOf);
        setAgentName(data.sa);
        setLinerName(data.sl);

        setLoading(false);

        // toast.success("Data found successfully!!", {
        //   autoClose: 800
        // })
        closeGateInModal();
      })
      .catch((error) => {
        toast.error(error.response.data, {
          autoClose: 800
        })
        setLoading(false);
      })
  }

  const downloadMtyGateInReport = () => {

    setLoading(true);
    axios
      .post(
        `${ipaddress}exportReport/exportEmptyContReport?cid=${companyid}&bid=${branchId}&id=${gateIn.gateInId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        const base64Pdf = response.data; // Assuming the base64 string is returned directly

        // Decode the Base64 string to a binary array
        const binaryData = atob(base64Pdf);

        // Convert binary data to a Uint8Array
        const byteArray = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          byteArray[i] = binaryData.charCodeAt(i);
        }

        // Create a Blob from the Uint8Array
        const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });

        // Generate a URL for the PDF Blob
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Open the PDF in a new tab and trigger printing
        const pdfWindow = window.open(pdfUrl);
        // pdfWindow.onload = () => {
        //     pdfWindow.print();
        // };


        // const base64Pdf = response.data; // Assuming the base64 string is returned directly

        // // Decode the Base64 string to a binary array
        // const binaryData = atob(base64Pdf);

        // // Convert binary data to a Uint8Array
        // const byteArray = new Uint8Array(binaryData.length);
        // for (let i = 0; i < binaryData.length; i++) {
        //     byteArray[i] = binaryData.charCodeAt(i);
        // }

        // // Create a Blob from the Uint8Array
        // const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });

        // // Generate a URL for the PDF Blob
        // const pdfUrl = URL.createObjectURL(pdfBlob);

        // // Create an anchor element for downloading the file
        // const link = document.createElement("a");
        // link.href = pdfUrl;
        // link.download = "GateInReport.pdf"; // The name of the downloaded file
        // link.click();

        // // Clean up the object URL
        // URL.revokeObjectURL(pdfUrl);

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching PDF:', error);
        toast.error(error.response.data, {
          autoClose: 800
        })
        setLoading(false);
      });
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

        {/* <h5
        className="pageHead"
        style={{
          fontFamily: "Your-Heading-Font",
          paddingLeft: "2%",
          paddingRight: "-20px",
        }}
      >
        {" "}
        <FontAwesomeIcon
          icon={faToriiGate}
          style={{
            marginRight: "8px",
            color: "black",
          }}
        />
        Export Empty Container Gate In
        <hr />
      </h5> */}
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
              /> Search Empty Container Gate In Data</h5>



            </ModalHeader>
            <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
              <Row>
                <Col md={4}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                      Search by Gate In Id / Container No / Vehicle No
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
                <Col md={4} style={{ marginTop: 20 }}>
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
                      <th scope="col">Gate In Id</th>
                      <th scope="col">Gate In date</th>
                      <th scope="col">Container No</th>
                      <th scope="col">Vehicle No</th>

                    </tr>
                    <tr className='text-center'>
                      <th scope="col"></th>
                      <th scope="col">{gateInSearchData.length}</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>

                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <input type="radio" onChange={() => getExportSearchSelectedData(item[0])} name="radioGroup" value={item[0]} />
                        </td>
                        <td>{item[0]}</td>
                        <td>{item[1]}</td>
                        <td>{item[2]}</td>
                        <td>{item[3]}</td>

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
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Gate In No
                </label>
                <Row>
                  <Col md={9}>
                    <Input
                      className="form-control"
                      type="text"
                      id="gateInId"
                      name='gateInId'
                      value={gateIn.gateInId}
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
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Gate In Date
                </label>
                <div style={{ position: 'relative' }}>
                  <DatePicker
                    selected={gateIn.inGateInDate}
                    name='inGateInDate'
                    id="inGateInDate"
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
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  On Account Of <span style={{ color: 'red' }}>*</span>
                </label>
                <Select
                  value={{ value: gateIn.onAccountOf, label: partyName }}
                  onChange={handleOnAccounOfChange}
                  onInputChange={searchChaData}
                  options={chaData}
                  placeholder="Select Party"
                  isClearable
                  id="onAccountOf"
                  name='onAccountOf'
                  className={`autocompleteHeight ${formErrors.onAccountOf ? 'error-border' : ''}`}
                   styles={{
                      control: (provided, state) => ({
                        ...provided,
                        height: 32,  // Set the height of the select input
                        minHeight: 32,
                        border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                        // display: 'flex',
                        // alignItems: 'center',  // Vertically center the content
                        // padding: '0 10px',     // Ensure padding is consistent
                        // borderRadius: '6px',
                        // width: '100%',
                        // boxSizing: 'border-box',
                        // position: 'relative',  // Ensure positioning doesn't cause layout issues
                      }),
            
                      valueContainer: (provided) => ({
                        ...provided,
                        // display: 'flex',
                        alignItems: 'center',  // Vertically center the text
                        padding: '0 8px',
                        height: '100%',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        lineHeight: '28px',
                        maxWidth: 'calc(100% - 20px)',
                        position: 'relative',
                        overflow: 'visible',
                      }),
            
                      input: (provided) => ({
                        ...provided,
                        width: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        outline: 'none', // Avoid outline clashes
                      }),
            
                      singleValue: (provided) => ({
                        ...provided,
                        lineHeight: '32px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }),
            
                      clearIndicator: (provided) => ({
                        ...provided,
                        padding: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        right: 5,
                        top: '50%',
                        transform: 'translateY(-50%)', // Vertically center the clear indicator
                      }),
            
                      indicatorSeparator: () => ({
                        display: 'none', // Remove the separator between indicators
                      }),
            
                      dropdownIndicator: () => ({
                        display: 'none', // Remove the dropdown arrow
                      }),
            
                      placeholder: (provided) => ({
                        ...provided,
                        lineHeight: '32px',
                        color: 'gray',
                      }),
                    }}
                />

              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  No Check Digit
                </label>
                <Input
                  className="form-control"
                  type="select"
                  id="noCheckDigit"
                  name='noCheckDigit'
                  value={noCheckDigit}
                  onChange={(e) => {
                    setNoCheckDigit(e.target.value);

                    if (e.target.value === 'Y') {
                      setFormErrors((prevErrors) => ({
                        ...prevErrors,
                        ['containerNo']: "",
                      }));
                    }
                    else {
                      if (!handleContainerNoValidation1(gateIn.containerNo)) {
                        setFormErrors((prevErrors) => ({
                          ...prevErrors,
                          ['containerNo']: "Invalid Container No.",
                        }));

                      }
                    }
                  }}
                >
                  <option value="N">No</option>
                  <option value="Y">Yes</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Status
                </label>
                <Input
                  className="form-control"
                  type="text"
                  id="status"
                  name='status'
                  value={gateIn.status === 'A' ? 'Approved' : gateIn.status}
                  disabled
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Created By
                </label>
                <Input
                  className="form-control"
                  type="text"
                  id="createdBy"
                  name='createdBy'
                  value={gateIn.createdBy}
                  disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Container No <span style={{ color: 'red' }}>*</span>
                </label>
                <Input
                  className={`form-control ${formErrors.containerNo ? 'error-border' : ''}`}
                  type="text"
                  id="containerNo"
                  name='containerNo'
                  value={gateIn.containerNo}
                  maxLength={11}
                  onChange={handleGateInChange}
                  disabled={gateIn.gateInId !== ''}
                />
                <div style={{ color: 'red' }} className="error-message">{formErrors.containerNo}</div>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  ISO Code <span style={{ color: 'red' }}>*</span>
                </label>
                <Select

                  value={{ value: gateIn.isoCode, label: gateIn.isoCode }}
                  onChange={handleIsoChange}
                  options={isoCodes}
                  placeholder="Select Container"
                  isClearable
                  id="isoCode"
                  disabled={gateIn.gateInId !== ''}
                  name="isoCode"
                  className={`autocompleteHeight ${formErrors.isoCode ? 'error-border' : ''}`}

                   styles={{
                      control: (provided, state) => ({
                        ...provided,
                        height: 32,  // Set the height of the select input
                        minHeight: 32,
                        border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                        // display: 'flex',
                        // alignItems: 'center',  // Vertically center the content
                        // padding: '0 10px',     // Ensure padding is consistent
                        // borderRadius: '6px',
                        // width: '100%',
                        // boxSizing: 'border-box',
                        // position: 'relative',  // Ensure positioning doesn't cause layout issues
                      }),
            
                      valueContainer: (provided) => ({
                        ...provided,
                        // display: 'flex',
                        alignItems: 'center',  // Vertically center the text
                        padding: '0 8px',
                        height: '100%',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        lineHeight: '28px',
                        maxWidth: 'calc(100% - 20px)',
                        position: 'relative',
                        overflow: 'visible',
                      }),
            
                      input: (provided) => ({
                        ...provided,
                        width: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        outline: 'none', // Avoid outline clashes
                      }),
            
                      singleValue: (provided) => ({
                        ...provided,
                        lineHeight: '32px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }),
            
                      clearIndicator: (provided) => ({
                        ...provided,
                        padding: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        right: 5,
                        top: '50%',
                        transform: 'translateY(-50%)', // Vertically center the clear indicator
                      }),
            
                      indicatorSeparator: () => ({
                        display: 'none', // Remove the separator between indicators
                      }),
            
                      dropdownIndicator: () => ({
                        display: 'none', // Remove the dropdown arrow
                      }),
            
                      placeholder: (provided) => ({
                        ...provided,
                        lineHeight: '32px',
                        color: 'gray',
                      }),
                    }}
                />
                <div style={{ color: 'red' }} className="error-message">{formErrors.isoCode}</div>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Cont Size & Type
                </label>
                <Input
                  className="form-control"
                  type="text"
                  id="containerSize"
                  name='containerSize'
                  value={gateIn.containerSize + gateIn.containerType}
                  disabled
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Tare Weight <span style={{ color: 'red' }}>*</span>
                </label>
                <Input
                  className={`form-control ${formErrors.tareWeight ? 'error-border' : ''}`}
                  type="text"
                  id="tareWeight"
                  name='tareWeight'
                  value={gateIn.tareWeight}
                  onChange={handleGateInChange}
                  maxLength={16}
                />
                <div style={{ color: 'red' }} className="error-message">{formErrors.tareWeight}</div>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Seal No
                </label>
                <Input
                  className="form-control"
                  type="text"
                  id="containerSealNo"
                  name='containerSealNo'
                  value={gateIn.containerSealNo}
                  onChange={handleGateInChange}
                  maxLength={15}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Container Status
                </label>
                <Input
                  className="form-control"
                  type="select"
                  id="containerStatus"
                  name='containerStatus'
                  value={gateIn.containerStatus}
                  disabled
                >
                  <option value="MTY">EMPTY</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Vehicle No <span style={{ color: 'red' }}>*</span>
                </label>
                <Input
                  className={`form-control ${formErrors.vehicleNo ? 'error-border' : ''}`}
                  type="text"
                  id="vehicleNo"
                  name='vehicleNo'
                  value={gateIn.vehicleNo}
                  onChange={handleGateInChange}
                  maxLength={15}
                />
                <div style={{ color: 'red' }} className="error-message">{formErrors.vehicleNo}</div>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Driver Name
                </label>
                <Input
                  className={`form-control`}
                  type="text"
                  id="driverName"
                  name='driverName'
                  value={gateIn.driverName}
                  onChange={handleGateInChange}
                  maxLength={50}
                />
                <div style={{ color: 'red' }} className="error-message">{formErrors.driverName}</div>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Transporter Name
                </label>
                <Input
                  className="form-control"
                  type="text"
                  id="transporterName"
                  name='transporterName'
                  value={gateIn.transporterName}
                  onChange={handleGateInChange}
                  maxLength={50}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  DO No
                </label>
                <Input
                  className="form-control"
                  type="text"
                  id="deliveryOrderNo"
                  name='deliveryOrderNo'
                  value={gateIn.deliveryOrderNo}
                  onChange={handleGateInChange}
                  maxLength={10}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Do Date
                </label>
                <div style={{ position: 'relative' }}>
                  <DatePicker
                    selected={gateIn.deliveryOrderDate}
                    onChange={(date) => {
                      setGateIn(prevState => ({
                        ...prevState,
                        deliveryOrderDate: date,
                        doValidityDate: date >= prevState.doValidityDate ? null : prevState.doValidityDate,
                      }));

                    }}
                    name='deliveryOrderDate'
                    id="deliveryOrderDate"
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
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Do Validity Date
                </label>
                <div style={{ position: 'relative' }}>
                  <DatePicker
                    selected={gateIn.doValidityDate}
                    onChange={(date) => {
                      setGateIn(prevState => ({
                        ...prevState,
                        doValidityDate: date
                      }));

                    }}
                    minDate={(() => {
                      const date = new Date(gateIn.deliveryOrderDate);
                      date.setDate(date.getDate() + 1);
                      return date;
                    })()}
                    name='doValidityDate'
                    id="doValidityDate"
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
          </Row>
          <Row>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Shipping Agent <span style={{ color: 'red' }}>*</span>
                </label>
                <Select
                  value={{ value: gateIn.sa, label: agentName }}
                  onChange={handleAgentChange}
                  onInputChange={getAgentData}
                  options={agentData}
                  placeholder="Select Shipping Agent"
                  isClearable
                  id="sa"
                  name='sa'
                  className={`autocompleteHeight ${formErrors.sa ? 'error-border' : ''}`}
                   styles={{
                      control: (provided, state) => ({
                        ...provided,
                        height: 32,  // Set the height of the select input
                        minHeight: 32,
                        border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                        // display: 'flex',
                        // alignItems: 'center',  // Vertically center the content
                        // padding: '0 10px',     // Ensure padding is consistent
                        // borderRadius: '6px',
                        // width: '100%',
                        // boxSizing: 'border-box',
                        // position: 'relative',  // Ensure positioning doesn't cause layout issues
                      }),
            
                      valueContainer: (provided) => ({
                        ...provided,
                        // display: 'flex',
                        alignItems: 'center',  // Vertically center the text
                        padding: '0 8px',
                        height: '100%',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        lineHeight: '28px',
                        maxWidth: 'calc(100% - 20px)',
                        position: 'relative',
                        overflow: 'visible',
                      }),
            
                      input: (provided) => ({
                        ...provided,
                        width: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        outline: 'none', // Avoid outline clashes
                      }),
            
                      singleValue: (provided) => ({
                        ...provided,
                        lineHeight: '32px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }),
            
                      clearIndicator: (provided) => ({
                        ...provided,
                        padding: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        right: 5,
                        top: '50%',
                        transform: 'translateY(-50%)', // Vertically center the clear indicator
                      }),
            
                      indicatorSeparator: () => ({
                        display: 'none', // Remove the separator between indicators
                      }),
            
                      dropdownIndicator: () => ({
                        display: 'none', // Remove the dropdown arrow
                      }),
            
                      placeholder: (provided) => ({
                        ...provided,
                        lineHeight: '32px',
                        color: 'gray',
                      }),
                    }}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Shipping Line <span style={{ color: 'red' }}>*</span>
                </label>
                <Select
                  value={{ value: gateIn.sl, label: linerName }}
                  onChange={handleLinerChange}
                  onInputChange={getLinerData}
                  options={linerData}
                  placeholder="Select Shipping Agent"
                  isClearable
                  id="sl"
                  name='sl'
                  className={`autocompleteHeight ${formErrors.sl ? 'error-border' : ''}`}
                   styles={{
                      control: (provided, state) => ({
                        ...provided,
                        height: 32,  // Set the height of the select input
                        minHeight: 32,
                        border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                        // display: 'flex',
                        // alignItems: 'center',  // Vertically center the content
                        // padding: '0 10px',     // Ensure padding is consistent
                        // borderRadius: '6px',
                        // width: '100%',
                        // boxSizing: 'border-box',
                        // position: 'relative',  // Ensure positioning doesn't cause layout issues
                      }),
            
                      valueContainer: (provided) => ({
                        ...provided,
                        // display: 'flex',
                        alignItems: 'center',  // Vertically center the text
                        padding: '0 8px',
                        height: '100%',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        lineHeight: '28px',
                        maxWidth: 'calc(100% - 20px)',
                        position: 'relative',
                        overflow: 'visible',
                      }),
            
                      input: (provided) => ({
                        ...provided,
                        width: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        outline: 'none', // Avoid outline clashes
                      }),
            
                      singleValue: (provided) => ({
                        ...provided,
                        lineHeight: '32px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }),
            
                      clearIndicator: (provided) => ({
                        ...provided,
                        padding: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        right: 5,
                        top: '50%',
                        transform: 'translateY(-50%)', // Vertically center the clear indicator
                      }),
            
                      indicatorSeparator: () => ({
                        display: 'none', // Remove the separator between indicators
                      }),
            
                      dropdownIndicator: () => ({
                        display: 'none', // Remove the dropdown arrow
                      }),
            
                      placeholder: (provided) => ({
                        ...provided,
                        lineHeight: '32px',
                        color: 'gray',
                      }),
                    }}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Container Health
                </label>
                <Input
                  className="form-control"
                  type="select"
                  id="containerHealth"
                  name='containerHealth'
                  value={gateIn.containerHealth}
                  onChange={handleGateInChange}
                >
                  <option value="" selected="">	</option>

                  <option value="HDEMAG">Heavy Damage</option>

                  <option value="LDEMAG">Light Damage</option>

                  <option value="MDEMAG">Medium Damage</option>

                  <option value="OK">Healthy</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Profitcentre Id
                </label>
                <Input
                  className="form-control"
                  type="text"
                  id="profitcentreId"
                  name='profitcentreId'
                  value={gateIn.profitcentreId}
                  disabled
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Job Order No
                </label>
                <Input
                  className="form-control"
                  type="text"
                  id="jobOrderId"
                  name='jobOrderId'
                  value={gateIn.jobOrderId}
                  onChange={handleGateInChange}
                  maxLength={16}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Job Order Date
                </label>
                <div style={{ position: 'relative' }}>
                  <DatePicker
                    selected={gateIn.jobDate}
                    onChange={(date) => {
                      setGateIn(prevState => ({
                        ...prevState,
                        jobDate: date
                      }));
                    }}

                    name='jobDate'
                    id="jobDate"
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
          </Row>
          <Row>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Pick Up Yard
                </label>
                <Input
                  className="form-control"
                  type="text"
                  id="origin"
                  name='origin'
                  value={gateIn.origin}
                  onChange={handleGateInChange}
                  maxLength={50}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Remarks
                </label>
                <Input
                  className="form-control"
                  type="textarea"
                  id="comments"
                  name='comments'
                  value={gateIn.comments}
                  onChange={handleGateInChange}
                  maxLength={150}
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
              <button
                className="btn btn-outline-success btn-margin newButton"
                style={{ marginRight: 10 }}
                id="submitbtn2"
                disabled={gateIn.gateInId === ''}
                onClick={downloadMtyGateInReport}
              >
                <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
                Print Report
              </button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}


export default ExportEmptyContainerGateIn;