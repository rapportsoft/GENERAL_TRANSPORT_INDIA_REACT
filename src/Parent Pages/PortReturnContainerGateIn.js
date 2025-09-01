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
//   faTruckFast,
// } from "@fortawesome/free-solid-svg-icons";
// import "../assets/css/style.css";
// import "../Components/Style.css";
// import { Button } from "react-bootstrap";
// import useAxios from "../Components/useAxios";
// import CFSService from "../service/CFSService";
// import { toast } from "react-toastify";
// import moment from "moment";
// import ipaddress from "../Components/IpAddress";
// import CreatableSelect from 'react-select/creatable';

// function PortReturnContainerGateIn({ searchData, resetFlag }) {

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

//   const handleISOChange = async (selectedOption, { action }) => {

//     if (action === 'clear') {
//       setGateIn({
//         ...gateIn,
//         isoCode: '',
//         containerSize: '',
//         containerType: ''
//       })
//     }
//     else {
//       setGateIn({
//         ...gateIn,
//         isoCode: selectedOption.value || '',
//         containerSize: selectedOption.size || '',
//         containerType: selectedOption.type || ''
//       })

//       // setFormErrors(prevState => ({
//       //   ...prevState,
//       //   onAccountOf: ''
//       // }));
//     }

//   }

//   const [transporterData, setTransporterData] = useState([]);

//   const getTransporter = () => {
//     axios.get(`${ipaddress}party/getTrans?cid=${companyid}&bid=${branchId}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {
//         const data = response.data;
//         const portOptions = data.map(port => ({
//           value: port[0],
//           label: port[1],
//         }))
//         setTransporterData(portOptions);
//       })
//       .catch((error) => {

//       })
//   }

//   const handleTransporterChange = async (selectedOption, { action }) => {

//     if (action === 'clear') {
//       setGateIn({
//         ...gateIn,
//         transporter: '',
//         transporterName: '',
//       })
//     }
//     else {
//       setGateIn({
//         ...gateIn,
//         transporter: selectedOption.value || '',
//         transporterName: selectedOption.label || '',
//       })

//       setFormErrors(prevState => ({
//         ...prevState,
//         transporter: ''
//       }));
//     }

//   }


//   useEffect(() => {

//     if (searchData.activeTab === 'P00226') {
//       getGateNo();
//       getIsoContainers();
//       getTransporter();
//     }
//   }, [searchData])

//   const [linerData, setLinerData] = useState([]);
//   const [agentData, setAgentData] = useState([]);

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

//   const handleSlChange = async (selectedOption, { action }) => {

//     if (action === 'clear') {
//       setGateIn({
//         ...gateIn,
//         sl: '',
//         slName: '',
//       })
//     }
//     else {
//       setGateIn({
//         ...gateIn,
//         sl: selectedOption.value || '',
//         slName: selectedOption.label || '',
//       })

//       // setFormErrors(prevState => ({
//       //   ...prevState,
//       //   onAccountOf: ''
//       // }));
//     }

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

//   const handleSaChange = async (selectedOption, { action }) => {

//     if (action === 'clear') {
//       setGateIn({
//         ...gateIn,
//         sa: '',
//         saName: '',
//       })
//     }
//     else {
//       setGateIn({
//         ...gateIn,
//         sa: selectedOption.value || '',
//         saName: selectedOption.label || '',
//       })

//       // setFormErrors(prevState => ({
//       //   ...prevState,
//       //   onAccountOf: ''
//       // }));
//     }

//   }

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
//       setGateIn({
//         ...gateIn,
//         onAccountOf: '',
//         onAccountOfName: '',
//       })
//     }
//     else {
//       setGateIn({
//         ...gateIn,
//         onAccountOf: selectedOption.value || '',
//         onAccountOfName: selectedOption.label || '',
//       })

//       setFormErrors(prevState => ({
//         ...prevState,
//         onAccountOf: ''
//       }));
//     }

//   }


//   const [gateIn, setGateIn] = useState({
//     companyId: '',
//     branchId: '',
//     gateInId: '',
//     finYear: new Date().getFullYear(),
//     erpDocRefNo: '',
//     docRefNo: '',
//     lineNo: '',
//     srNo: '',
//     shift: 'Day',
//     inGateInDate: new Date(),
//     gateNo: 'Gate01',
//     cartingTransId: '',
//     status: '',
//     createdBy: '',
//     gateInType: 'PortRn',
//     containerNo: '',
//     containerSize: '',
//     containerType: '',
//     isoCode: '',
//     containerStatus: 'FCL',
//     profitcentreId: 'CFS Export',
//     containerSealNo: '',
//     customsSealNo: '',
//     grossWeight: '',
//     hazardous: 'N',
//     refer: 'N',
//     sa: '',
//     saName: '',
//     sl: '',
//     slName: '',
//     deliveryOrderNo: '',
//     deliveryOrderDate: null,
//     doValidityDate: null,
//     onAccountOf: '',
//     onAccountOfName: '',
//     containerHealth: '',
//     transporter: '',
//     transporterName: '',
//     transporterStatus: '',
//     vehicleNo: '',
//     driverName: '',
//     comments: ''
//   })

//   const [multipleGateIn, setMultipleGateIn] = useState([{
//     companyId: '',
//     branchId: '',
//     gateInId: '',
//     erpDocRefNo: '',
//     docRefNo: '',
//     docRefDate: null,
//     commodityDescription: '',
//     actualNoOfPackages: '',
//     cargoWeight: '',
//     fob: ''
//   }])



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


//   const handleGateInChange = (e, val1, val2) => {

//     const { name, value } = e.target;

//     let sanitizevalue = value

//     if (['grossWeight'].includes(name)) {
//       sanitizevalue = handleInputChange(value, val1, val2);
//     }

//     setGateIn(prev => ({
//       ...prev,
//       [name]: sanitizevalue
//     }))

//     setFormErrors(prev => ({
//       ...prev,
//       [name]: ''
//     }))
//   }

//   const [formErrors, setFormErrors] = useState({
//     gateNo: '',
//     containerNo: '',
//     onAccountOf: '',
//     transporter: '',
//     vehicleNo: ''
//   })


//   const handleClear = () => {
//     setGateIn({
//       companyId: '',
//       branchId: '',
//       gateInId: '',
//       finYear: new Date().getFullYear(),
//       erpDocRefNo: '',
//       docRefNo: '',
//       lineNo: '',
//       srNo: '',
//       shift: 'Day',
//       inGateInDate: new Date(),
//       gateNo: 'Gate01',
//       cartingTransId: '',
//       status: '',
//       createdBy: '',
//       gateInType: 'PortRn',
//       containerNo: '',
//       containerSize: '',
//       containerType: '',
//       isoCode: '',
//       containerStatus: 'FCL',
//       profitcentreId: 'CFS Export',
//       containerSealNo: '',
//       customsSealNo: '',
//       grossWeight: '',
//       hazardous: 'N',
//       refer: 'N',
//       sa: '',
//       saName: '',
//       sl: '',
//       slName: '',
//       deliveryOrderNo: '',
//       deliveryOrderDate: null,
//       doValidityDate: null,
//       onAccountOf: '',
//       onAccountOfName: '',
//       containerHealth: '',
//       transporter: '',
//       transporterName: '',
//       transporterStatus: '',
//       vehicleNo: '',
//       driverName: '',
//       comments: ''
//     })

//     setMultipleGateIn([{
//       companyId: '',
//       branchId: '',
//       gateInId: '',
//       erpDocRefNo: '',
//       docRefNo: '',
//       docRefDate: null,
//       commodityDescription: '',
//       actualNoOfPackages: '',
//       cargoWeight: '',
//       fob: ''
//     }])

//     setFormErrors({
//       gateNo: '',
//       containerNo: '',
//       onAccountOf: '',
//       transporter: '',
//       vehicleNo: ''
//     })
//   }


//   const [containerData, setContainerData] = useState([]);

//   const getContainers = (val) => {
//     if (val === '') {
//       setContainerData([]);
//       return
//     }

//     axios.get(`${ipaddress}portReturn/getContainers?cid=${companyid}&bid=${branchId}&val=${val}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {
//         const portOptions = response.data.map(port => ({
//           value: port,
//           label: port,
//         }))


//         setContainerData(portOptions);
//       })
//       .catch((error) => {
//         setContainerData([]);
//       })
//   }

//   const handleContainerChange = async (selectedOption, { action }) => {

//     if (action === 'clear') {
//       handleClear();
//     }
//     else {
//       setGateIn({
//         ...gateIn,
//         containerNo: selectedOption.value || ''
//       })
//       getSelectedContainerData(selectedOption.value);
//       setFormErrors(prevState => ({
//         ...prevState,
//         containerNo: '',
//         onAccountOf: '',
//         transporter: ''
//       }));
//     }

//   }

//   const getSelectedContainerData = (val) => {
//     axios.get(`${ipaddress}portReturn/getSingleContainer?cid=${companyid}&bid=${branchId}&val=${val}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {

//         const data = response.data;
//         const conData = data.containerData;
//         const sbData = data.sbData;


//         setGateIn({
//           companyId: '',
//           branchId: '',
//           gateInId: '',
//           finYear: new Date().getFullYear(),
//           erpDocRefNo: '',
//           docRefNo: '',
//           lineNo: '',
//           srNo: '',
//           shift: 'Day',
//           inGateInDate: new Date(),
//           gateNo: 'Gate01',
//           cartingTransId: sbData[0][8] || '',
//           status: '',
//           createdBy: '',
//           gateInType: 'PortRn',
//           containerNo: conData.containerNo || '',
//           containerSize: conData.containerSize || '',
//           containerType: conData.containerType || '',
//           isoCode: conData.isoCode || '',
//           containerStatus: conData.containerStatus || 'FCL',
//           profitcentreId: 'CFS Export',
//           containerSealNo: sbData[0][6] || '',
//           customsSealNo: sbData[0][7] || '',
//           grossWeight: sbData.reduce((item, val) => item + val[5], 0),
//           hazardous: 'N',
//           refer: 'N',
//           sa: conData.sa || '',
//           saName: conData.saName || '',
//           sl: conData.sl || '',
//           slName: conData.slName || '',
//           deliveryOrderNo: conData.deliveryOrderNo || '',
//           deliveryOrderDate: conData.deliveryOrderDate === null ? null : new Date(conData.deliveryOrderDate),
//           doValidityDate: conData.doValidityDate === null ? null : new Date(conData.doValidityDate),
//           onAccountOf: conData.onAccountOf || '',
//           onAccountOfName: conData.onAccountOfName || '',
//           containerHealth: '',
//           transporter: conData.transporter || '',
//           transporterName: conData.transporterName || '',
//           transporterStatus: conData.transporterStatus || '',
//           vehicleNo: '',
//           driverName: '',
//           comments: ''
//         })

//         setMultipleGateIn(sbData.map((item) => ({
//           companyId: '',
//           branchId: '',
//           gateInId: '',
//           erpDocRefNo: item[0] || '',
//           docRefNo: item[1] || '',
//           docRefDate: item[2] === null ? null : new Date(item[2]),
//           commodityDescription: item[3] || '',
//           actualNoOfPackages: item[4] || '',
//           cargoWeight: item[5] || '',
//           fob: item[9] || ''
//         })))


//       })
//       .catch((error) => {
//         toast.error(error.response.data, {
//           autoClose: 800
//         })
//       })
//   }

//   const handleSave = () => {
//     setLoading(true);
//     setFormErrors({
//       gateNo: '',
//       containerNo: '',
//       onAccountOf: '',
//       transporter: '',
//       vehicleNo: ''
//     })

//     let errors = {};

//     if (!gateIn.gateNo) {
//       errors.gateNo = "Gate no is required."
//     }

//     if (!gateIn.containerNo) {
//       errors.containerNo = "Container no is required."
//     }

//     if (!gateIn.onAccountOf) {
//       errors.onAccountOf = "On account of is required."
//     }

//     if (!gateIn.transporter) {
//       errors.transporter = "Transporter is required."
//     }

//     if (!gateIn.vehicleNo) {
//       errors.vehicleNo = "Vehicle no is required."
//     }

//     if (Object.keys(errors).length > 0) {
//       setLoading(false);
//       setFormErrors(errors);
//       toast.error("Please fill in the required fields.", {
//         autoClose: 1000
//       })
//       return;
//     }


//     const formData = {
//       gateInData: gateIn,
//       multipleGateInData: multipleGateIn
//     }

//     axios.post(`${ipaddress}portReturn/savePortContainerGateIn?cid=${companyid}&bid=${branchId}&user=${userId}`, formData, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {

//         const data = response.data;
//         const conData = data[0];

//         console.log('gate in data ', data);


//         setGateIn({
//           companyId: '',
//           branchId: '',
//           gateInId: conData.gateInId || '',
//           finYear: new Date().getFullYear(),
//           erpDocRefNo: '',
//           docRefNo: '',
//           lineNo: '',
//           srNo: '',
//           shift: 'Day',
//           inGateInDate: conData.inGateInDate === null ? new Date() : new Date(conData.inGateInDate),
//           gateNo: conData.gateNo || 'Gate01',
//           cartingTransId: conData.cartingTransId || '',
//           status: conData.status || '',
//           createdBy: conData.createdBy || '',
//           gateInType: 'PortRn',
//           containerNo: conData.containerNo || '',
//           containerSize: conData.containerSize || '',
//           containerType: conData.containerType || '',
//           isoCode: conData.isoCode || '',
//           containerStatus: conData.containerStatus || 'FCL',
//           profitcentreId: 'CFS Export',
//           containerSealNo: conData.containerSealNo || '',
//           customsSealNo: conData.customsSealNo || '',
//           grossWeight: conData.grossWeight || '',
//           hazardous: conData.hazardous || 'N',
//           refer: conData.refer || 'N',
//           sa: conData.sa || '',
//           saName: conData.saName || '',
//           sl: conData.sl || '',
//           slName: conData.slName || '',
//           deliveryOrderNo: conData.deliveryOrderNo || '',
//           deliveryOrderDate: conData.deliveryOrderDate === null ? null : new Date(conData.deliveryOrderDate),
//           doValidityDate: conData.doValidityDate === null ? null : new Date(conData.doValidityDate),
//           onAccountOf: conData.onAccountOf || '',
//           onAccountOfName: conData.onAccountOfName || '',
//           containerHealth: conData.containerHealth || '',
//           transporter: conData.transporter || '',
//           transporterName: conData.transporterName || '',
//           transporterStatus: conData.transporterStatus || '',
//           vehicleNo: conData.vehicleNo || '',
//           driverName: conData.driverName || '',
//           comments: conData.comments || ''
//         })

//         setMultipleGateIn(data.map((item) => ({
//           companyId: '',
//           branchId: '',
//           gateInId: item.gateInId || '',
//           erpDocRefNo: item.erpDocRefNo || '',
//           docRefNo: item.docRefNo || '',
//           docRefDate: item.docRefDate === null ? null : new Date(item.docRefDate),
//           commodityDescription: item.commodityDescription || '',
//           actualNoOfPackages: item.actualNoOfPackages || '',
//           cargoWeight: item.cargoWeight || '',
//           fob: ''
//         })))



//         toast.success("Data save successfully!!", {
//           autoClose: 800
//         })

//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log('error ', error);

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
//     axios.get(`${ipaddress}portReturn/search?cid=${companyid}&bid=${branchId}&val=${id}`, {
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

//     axios.get(`${ipaddress}portReturn/searchSelectedData?cid=${companyid}&bid=${branchId}&val=${id}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {

//         const data = response.data;
//         const conData = data[0];



//         setGateIn({
//           companyId: '',
//           branchId: '',
//           gateInId: conData.gateInId || '',
//           finYear: new Date().getFullYear(),
//           erpDocRefNo: '',
//           docRefNo: '',
//           lineNo: '',
//           srNo: '',
//           shift: 'Day',
//           inGateInDate: conData.inGateInDate === null ? new Date() : new Date(conData.inGateInDate),
//           gateNo: conData.gateNo || 'Gate01',
//           cartingTransId: conData.cartingTransId || '',
//           status: conData.status || '',
//           createdBy: conData.createdBy || '',
//           gateInType: 'PortRn',
//           containerNo: conData.containerNo || '',
//           containerSize: conData.containerSize || '',
//           containerType: conData.containerType || '',
//           isoCode: conData.isoCode || '',
//           containerStatus: conData.containerStatus || 'FCL',
//           profitcentreId: 'CFS Export',
//           containerSealNo: conData.containerSealNo || '',
//           customsSealNo: conData.customsSealNo || '',
//           grossWeight: conData.grossWeight || '',
//           hazardous: conData.hazardous || 'N',
//           refer: conData.refer || 'N',
//           sa: conData.sa || '',
//           saName: conData.saName || '',
//           sl: conData.sl || '',
//           slName: conData.slName || '',
//           deliveryOrderNo: conData.deliveryOrderNo || '',
//           deliveryOrderDate: conData.deliveryOrderDate === null ? null : new Date(conData.deliveryOrderDate),
//           doValidityDate: conData.doValidityDate === null ? null : new Date(conData.doValidityDate),
//           onAccountOf: conData.onAccountOf || '',
//           onAccountOfName: conData.onAccountOfName || '',
//           containerHealth: conData.containerHealth || '',
//           transporter: conData.transporter || '',
//           transporterName: conData.transporterName || '',
//           transporterStatus: conData.transporterStatus || '',
//           vehicleNo: conData.vehicleNo || '',
//           driverName: conData.driverName || '',
//           comments: conData.comments || ''
//         })

//         setMultipleGateIn(data.map((item) => ({
//           companyId: '',
//           branchId: '',
//           gateInId: item.gateInId || '',
//           erpDocRefNo: item.erpDocRefNo || '',
//           docRefNo: item.docRefNo || '',
//           docRefDate: item.docRefDate === null ? null : new Date(item.docRefDate),
//           commodityDescription: item.commodityDescription || '',
//           actualNoOfPackages: item.actualNoOfPackages || '',
//           cargoWeight: item.cargoWeight || '',
//           fob: ''
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

//       <div><h5
//         className="pageHead"
//         style={{
//           fontFamily: "Your-Heading-Font",
//           paddingLeft: "2%",
//           paddingRight: "-20px",
//         }}
//       >
//         {" "}
//         <FontAwesomeIcon
//           icon={faShip}
//           style={{
//             marginRight: "8px",
//             color: "black", // Set the color to golden
//           }}
//         />
//         Port Return Container Gate In
//         <hr />
//       </h5>
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
//             /> Search Port Return Gate In Data</h5>



//           </ModalHeader>
//           <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
//             <Row>
//               <Col md={4}>
//                 <FormGroup>
//                   <label className="forlabel bold-label" htmlFor="sbRequestId">
//                     Search by Gate In Id / Container No / Vehicle No
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
//               <Col md={4} style={{ marginTop: 20 }}>
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
//                     <th scope="col">Gate In Id</th>
//                     <th scope="col">Gate In Date</th>
//                     <th scope="col">Gate No</th>
//                     <th scope="col">Container No</th>
//                     <th scope="col">Container Size</th>
//                     <th scope="col">Container type</th>
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
//                       <td>{item[6]}</td>
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
//               <label className="forlabel bold-label" htmlFor="gateInId">
//                 Gate In No
//               </label>
//               <Row>
//                 <Col md={9}>
//                   <Input
//                     value={gateIn.gateInId}
//                     className="form-control"
//                     type="text"
//                     id="gateInId"
//                     name='gateInId'
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
//               <label className="forlabel bold-label" htmlFor="inGateInDate">
//                 Gate In Date
//               </label>
//               <div style={{ position: 'relative' }}>
//                 <DatePicker
//                   selected={gateIn.inGateInDate}
//                   name='inGateInDate'
//                   id="inGateInDate"
//                   disabled
//                   dateFormat="dd/MM/yyyy HH:mm"
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
//               <label className="forlabel bold-label" htmlFor="gateNo">
//                 Gate No <span style={{ color: 'red' }}>*</span>
//               </label>
//               <Row>
//                 {/* <Col md={6}>
//                   <Input
//                     className="form-control"
//                     type="select"
//                     id="requestReferenceNo"
//                     name='requestReferenceNo'
//                   >
//                     <option value="Day">Day</option>
//                     <option value="Second">Second</option>
//                     <option value="Third">Third</option>
//                   </Input>
//                 </Col> */}
//                 <Col md={12}>
//                   <Input
//                     className={`form-control ${formErrors.gateNo ? 'error-border' : ''}`}
//                     type="select"
//                     id="gateNo"
//                     name='gateNo'
//                     value={gateIn.gateNo}
//                     onChange={(e) => handleGateInChange(e)}
//                   >
//                     <option value="">Select Gate No</option>
//                     {gateData.map((item, index) => (
//                       <option key={index} value={item[0]}>{item[1]}</option>
//                     ))}
//                   </Input>
//                   <div style={{ color: 'red' }} className="error-message">{formErrors.gateNo}</div>
//                 </Col>
//               </Row>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="cartingTransId">
//                 Movement Request Id
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="cartingTransId"
//                 name='cartingTransId'
//                 disabled
//                 value={gateIn.cartingTransId}
//               />
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
//                 disabled
//                 value={gateIn.status === 'A' ? 'Approved' : gateIn.status}
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
//                 value={gateIn.createdBy}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//         </Row>
//         <Row>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="gateInType">
//                 Gate In Type
//               </label>
//               <Input
//                 className="form-control"
//                 type="select"
//                 disabled
//                 value={gateIn.gateInType}
//                 id="gateInType"
//                 name='gateInType'

//               >
//                 <option value="PortRn">Port Return</option>
//               </Input>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="containerNo">
//                 Container No <span style={{ color: 'red' }}>*</span>
//               </label>
//               <Select
//                 value={{ value: gateIn.containerNo, label: gateIn.containerNo }}
//                 options={containerData}
//                 onInputChange={getContainers}
//                 onChange={handleContainerChange}
//                 placeholder="Select Container"
//                 isClearable
//                 isDisabled={gateIn.gateInId !== ''}
//                 id="containerNo"
//                 name='containerNo'
//                 className={`autocompleteHeight ${formErrors.containerNo ? 'error-border' : ''}`}
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
//               <div style={{ color: 'red' }} className="error-message">{formErrors.containerNo}</div>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="isoCode">
//                 ISO Code
//               </label>
//               <Select
//                 value={{ value: gateIn.isoCode, label: gateIn.isoCode }}
//                 options={isoCodes}
//                 onChange={handleISOChange}
//                 placeholder="Select ISO Code"
//                 isClearable
//                 isDisabled
//                 id="isoCode"
//                 name='isoCode'
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
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="containerSize">
//                 Cont Size&Type
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="containerSize"
//                 name='containerSize'
//                 disabled
//                 value={gateIn.containerSize + gateIn.containerType}
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="containerStatus">
//                 Container Status
//               </label>
//               <Input
//                 className="form-control"
//                 type="select"
//                 id="containerStatus"
//                 name='containerStatus'
//                 value={gateIn.containerStatus}
//                 onChange={handleGateInChange}
//               >
//                 <option value="FCL">FCL</option>
//                 <option value="LCL">LCL</option>
//                 <option value="MTY">EMPTY</option>
//               </Input>
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
//                 disabled
//                 value={gateIn.profitcentreId}
//               />
//             </FormGroup>
//           </Col>
//         </Row>
//         <Row>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="customsSealNo">
//                 Custom Seal No
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="customsSealNo"
//                 name='customsSealNo'
//                 value={gateIn.customsSealNo}
//                 onChange={handleGateInChange}
//                 disabled
//                 maxLength={15}
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="containerSealNo">
//                 Container Seal No
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="containerSealNo"
//                 name='containerSealNo'
//                 value={gateIn.containerSealNo}
//                 onChange={handleGateInChange}
//                 maxLength={15}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="grossWeight">
//                 Gross Weight
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="grossWeight"
//                 name='grossWeight'
//                 value={gateIn.grossWeight}
//                 onChange={(e) => handleGateInChange(e, 12, 4)}
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="hazardous">
//                 Hazardous / Refer
//               </label>
//               <Row>
//                 <Col md={6}>
//                   <Input
//                     className="form-control"
//                     type="select"
//                     id="hazardous"
//                     name='hazardous'
//                     value={gateIn.hazardous}
//                     onChange={handleGateInChange}
//                   >
//                     <option value="N">No</option>
//                     <option value="Y">Yes</option>
//                   </Input>

//                 </Col>
//                 <Col md={6}>
//                   <Input
//                     className="form-control"
//                     type="select"
//                     id="refer"
//                     name='refer'
//                     value={gateIn.refer}
//                     onChange={handleGateInChange}
//                   >
//                     <option value="N">No</option>
//                     <option value="Y">Yes</option>
//                   </Input>
//                 </Col>
//               </Row>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="requestReferenceNo">
//                 Shipping Agent
//               </label>
//               <Select
//                 value={{ value: gateIn.sa, label: gateIn.saName }}
//                 options={agentData}
//                 onChange={handleSaChange}
//                 onInputChange={getAgentData}
//                 placeholder="Select Shipping Agent"
//                 isClearable
//                 id="onAccountOf"
//                 name='onAccountOf'
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
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="requestReferenceNo">
//                 Shipping Line
//               </label>
//               <Select
//                 value={{ value: gateIn.sl, label: gateIn.slName }}
//                 options={linerData}
//                 onChange={handleSlChange}
//                 onInputChange={getLinerData}
//                 placeholder="Select Shipping Line"
//                 isClearable
//                 id="onAccountOf"
//                 name='onAccountOf'
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
//               <label className="forlabel bold-label" htmlFor="requestReferenceNo">
//                 DO No
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="deliveryOrderNo"
//                 name='deliveryOrderNo'
//                 value={gateIn.deliveryOrderNo}
//                 onChange={handleGateInChange}
//                 maxLength={10}
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="deliveryOrderDate">
//                 DO Date
//               </label>
//               <div style={{ position: 'relative' }}>
//                 <DatePicker
//                   selected={gateIn.deliveryOrderDate}
//                   onChange={(date) => {
//                     setGateIn(prevState => ({
//                       ...prevState,
//                       deliveryOrderDate: date,
//                       doValidityDate: date >= prevState.doValidityDate ? null : prevState.doValidityDate,
//                     }));

//                   }}
//                   name='deliveryOrderDate'
//                   id="deliveryOrderDate"
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
//               <label className="forlabel bold-label" htmlFor="doValidityDate">
//                 DO Validity Date
//               </label>
//               <div style={{ position: 'relative' }}>
//                 <DatePicker
//                   selected={gateIn.doValidityDate}
//                   onChange={(date) => {
//                     setGateIn(prevState => ({
//                       ...prevState,
//                       doValidityDate: date
//                     }));

//                   }}
//                   minDate={(() => {
//                     const date = new Date(gateIn.deliveryOrderDate);
//                     date.setDate(date.getDate() + 1);
//                     return date;
//                   })()}
//                   name='doValidityDate'
//                   id="doValidityDate"
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
//               <label className="forlabel bold-label" htmlFor="onAccountOfName">
//                 On Account Of <span style={{ color: 'red' }}>*</span>
//               </label>
//               <Select
//                 value={{ value: gateIn.onAccountOf, label: gateIn.onAccountOfName }}
//                 options={onAccountOfData}
//                 onChange={handleOnAccountOfChange}
//                 onInputChange={searchOnAccountOfData}
//                 placeholder="Select OnAccountOf"
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
//               <label className="forlabel bold-label" htmlFor="containerHealth">
//                 Container Health
//               </label>
//               <Input
//                 className="form-control"
//                 type="select"
//                 id="containerHealth"
//                 name='containerHealth'
//                 value={gateIn.containerHealth}
//                 onChange={handleGateInChange}
//               >

//                 <option value="" selected="">Select Container Health</option>

//                 <option value="HDEMAG">Heavy Damage</option>

//                 <option value="LDEMAG">Light Damage</option>

//                 <option value="MDEMAG">Medium Damage</option>

//                 <option value="OK">Healthy</option>
//               </Input>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="transporterStatus">
//                 Transporter Status
//               </label>
//               <Input
//                 className="form-control"
//                 type="select"
//                 id="transporterStatus"
//                 name='transporterStatus'
//                 value={gateIn.transporterStatus}
//                 onChange={handleGateInChange}
//               >
//                 <option value="P">Private</option>
//                 <option value="C">Contractor</option>
//               </Input>
//             </FormGroup>
//           </Col>
//         </Row>
//         <Row>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="transporter">
//                 Transporter <span style={{ color: 'red' }}>*</span>
//               </label>
//               <CreatableSelect
//                 value={{ value: gateIn.transporter, label: gateIn.transporterName }}
//                 onChange={handleTransporterChange}
//                 onCreateOption={(inputValue) => {

//                   setGateIn({
//                     ...gateIn,
//                     transporter: '',  // Save the manually typed value
//                     transporterName: inputValue.slice(0, 50) // Assign the value to transporterName as well
//                   });
//                   setFormErrors((prevErrors) => ({
//                     ...prevErrors,
//                     ['transporter']: "",
//                   }));
//                 }}
//                 options={transporterData}
//                 placeholder="Select Transporter"
//                 isClearable
//                 id="transporter"
//                 name='transporter'
//                 className={`autocompleteHeight ${formErrors.transporter ? 'error-border' : ''}`}
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
//               <div style={{ color: 'red' }} className="error-message">{formErrors.transporter}</div>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="vehicleNo">
//                 Vehicle No <span style={{ color: 'red' }}>*</span>
//               </label>
//               <Input
//                 className={`form-control ${formErrors.vehicleNo ? 'error-border' : ''}`}
//                 type="text"
//                 id="vehicleNo"
//                 name='vehicleNo'
//                 value={gateIn.vehicleNo}
//                 onChange={handleGateInChange}
//                 maxLength={15}
//               />
//               <div style={{ color: 'red' }} className="error-message">{formErrors.vehicleNo}</div>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="driverName">
//                 Driver
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="driverName"
//                 name='driverName'
//                 value={gateIn.driverName}
//                 onChange={handleGateInChange}
//                 maxLength={50}
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="comments">
//                 Remarks
//               </label>
//               <Input
//                 className="form-control"
//                 type="textarea"
//                 id="comments"
//                 name='comments'
//                 value={gateIn.comments}
//                 onChange={handleGateInChange}
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
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>SB No</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>SB Trans Id</th>
//                 <th scope="col" className="text-center" style={{ color: 'black', minWidth: 100 }}>SB Date</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Commodity</th>
//                 <th scope="col" className="text-center" style={{ color: 'black', minWidth: 80 }}>No Of Pack</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Cargo Weight</th>
//               </tr>
//             </thead>
//             <tbody>
//               {multipleGateIn.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.docRefNo}</td>
//                   <td>{item.erpDocRefNo}</td>
//                   <td style={{ width: 170 }}>
//                     <div style={{ position: 'relative' }}>
//                       <DatePicker
//                         selected={item.docRefDate}
//                         name='docRefDate'
//                         id="docRefDate"
//                         disabled
//                         dateFormat="dd/MM/yyyy HH:mm"
//                         className="form-control"
//                         wrapperClassName="custom-react-datepicker-wrapper"
//                         customInput={
//                           <input
//                             style={{
//                               height: "30px",
//                               width: "100%",
//                             }}
//                           />

//                         }

//                       />
//                       <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
//                     </div>
//                   </td>
//                   <td>{item.commodityDescription}</td>
//                   <td>{item.actualNoOfPackages}</td>
//                   <td>{item.cargoWeight}</td>
//                 </tr>
//               ))}

//             </tbody>
//           </Table>
//         </div>

//       </div>
//     </>
//   );
// }

// export default PortReturnContainerGateIn;



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
  faTruckFast,
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
import CreatableSelect from 'react-select/creatable';

function PortReturnContainerGateIn({ searchData, resetFlag, updatePagesList }) {

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

  const processId = 'P00226';

  const foundRights = role !== 'ROLE_ADMIN' ? userRights.find(item => item.process_Id === processId) : null;
  const allowCreate = foundRights?.allow_Create === 'Y';
  const allowRead = foundRights?.allow_Read === 'Y';
  const allowEdit = foundRights?.allow_Update === 'Y';
  const allowDelete = foundRights?.allow_Delete === 'Y';

  const [gateData, setGateData] = useState([]);


  const axiosInstance = useAxios();
  const CFSService = new cfsService(axiosInstance);


  useEffect(() => {
    if (searchData && searchData.activeTab === processId && searchData.profitCenterId && searchData.portReturnId && searchData.containerNo) {
      getSelectedData(searchData.portReturnId);
    }
  }, [searchData]);

  useEffect(() => {
    if (resetFlag) {
      handleClear();
    }
  }, [resetFlag]);





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

  const handleISOChange = async (selectedOption, { action }) => {

    if (action === 'clear') {
      setGateIn({
        ...gateIn,
        isoCode: '',
        containerSize: '',
        containerType: ''
      })
    }
    else {
      setGateIn({
        ...gateIn,
        isoCode: selectedOption.value || '',
        containerSize: selectedOption.size || '',
        containerType: selectedOption.type || ''
      })

      // setFormErrors(prevState => ({
      //   ...prevState,
      //   onAccountOf: ''
      // }));
    }

  }

  const [transporterData, setTransporterData] = useState([]);

  const getTransporter = () => {
    axios.get(`${ipaddress}party/getTrans?cid=${companyid}&bid=${branchId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;
        const portOptions = data.map(port => ({
          value: port[0],
          label: port[1],
        }))
        setTransporterData(portOptions);
      })
      .catch((error) => {

      })
  }

  const handleTransporterChange = async (selectedOption, { action }) => {

    if (action === 'clear') {
      setGateIn({
        ...gateIn,
        transporter: '',
        transporterName: '',
      })
    }
    else {
      setGateIn({
        ...gateIn,
        transporter: selectedOption.value || '',
        transporterName: selectedOption.label || '',
      })

      setFormErrors(prevState => ({
        ...prevState,
        transporter: ''
      }));
    }

  }


  useEffect(() => {

    if (searchData.activeTab === 'P00226') {
      getGateNo();
      getIsoContainers();
      getTransporter();
    }
  }, [searchData])

  const [linerData, setLinerData] = useState([]);
  const [agentData, setAgentData] = useState([]);

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

  const handleSlChange = async (selectedOption, { action }) => {

    if (action === 'clear') {
      setGateIn({
        ...gateIn,
        sl: '',
        slName: '',
      })
    }
    else {
      setGateIn({
        ...gateIn,
        sl: selectedOption.value || '',
        slName: selectedOption.label || '',
      })

      // setFormErrors(prevState => ({
      //   ...prevState,
      //   onAccountOf: ''
      // }));
    }

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

  const handleSaChange = async (selectedOption, { action }) => {

    if (action === 'clear') {
      setGateIn({
        ...gateIn,
        sa: '',
        saName: '',
      })
    }
    else {
      setGateIn({
        ...gateIn,
        sa: selectedOption.value || '',
        saName: selectedOption.label || '',
      })

      // setFormErrors(prevState => ({
      //   ...prevState,
      //   onAccountOf: ''
      // }));
    }

  }

  const [onAccountOfData, setOnAccountOfData] = useState([]);

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
      setGateIn({
        ...gateIn,
        onAccountOf: '',
        onAccountOfName: '',
      })
    }
    else {
      setGateIn({
        ...gateIn,
        onAccountOf: selectedOption.value || '',
        onAccountOfName: selectedOption.label || '',
      })

      setFormErrors(prevState => ({
        ...prevState,
        onAccountOf: ''
      }));
    }

  }


  const [gateIn, setGateIn] = useState({
    companyId: '',
    branchId: '',
    gateInId: '',
    finYear: new Date().getFullYear(),
    erpDocRefNo: '',
    docRefNo: '',
    lineNo: '',
    srNo: '',
    shift: 'Day',
    inGateInDate: new Date(),
    gateNo: 'Gate01',
    cartingTransId: '',
    status: '',
    createdBy: '',
    gateInType: 'PortRn',
    containerNo: '',
    containerSize: '',
    containerType: '',
    isoCode: '',
    containerStatus: 'FCL',
    profitcentreId: 'CFS Export',
    containerSealNo: '',
    customsSealNo: '',
    grossWeight: '',
    hazardous: 'N',
    refer: 'N',
    sa: '',
    saName: '',
    sl: '',
    slName: '',
    deliveryOrderNo: '',
    deliveryOrderDate: null,
    doValidityDate: null,
    onAccountOf: '',
    onAccountOfName: '',
    containerHealth: '',
    transporter: '',
    transporterName: '',
    transporterStatus: '',
    vehicleNo: '',
    driverName: '',
    comments: ''
  })

  const [multipleGateIn, setMultipleGateIn] = useState([{
    companyId: '',
    branchId: '',
    gateInId: '',
    erpDocRefNo: '',
    docRefNo: '',
    docRefDate: null,
    commodityDescription: '',
    actualNoOfPackages: '',
    cargoWeight: '',
    fob: ''
  }])



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


  const handleGateInChange = (e, val1, val2) => {

    const { name, value } = e.target;

    let sanitizevalue = value

    if (['grossWeight'].includes(name)) {
      sanitizevalue = handleInputChange(value, val1, val2);
    }

    setGateIn(prev => ({
      ...prev,
      [name]: sanitizevalue
    }))

    setFormErrors(prev => ({
      ...prev,
      [name]: ''
    }))
  }

  const [formErrors, setFormErrors] = useState({
    gateNo: '',
    containerNo: '',
    onAccountOf: '',
    transporter: '',
    vehicleNo: ''
  })


  const handleClear = () => {
    setGateIn({
      companyId: '',
      branchId: '',
      gateInId: '',
      finYear: new Date().getFullYear(),
      erpDocRefNo: '',
      docRefNo: '',
      lineNo: '',
      srNo: '',
      shift: 'Day',
      inGateInDate: new Date(),
      gateNo: 'Gate01',
      cartingTransId: '',
      status: '',
      createdBy: '',
      gateInType: 'PortRn',
      containerNo: '',
      containerSize: '',
      containerType: '',
      isoCode: '',
      containerStatus: 'FCL',
      profitcentreId: 'CFS Export',
      containerSealNo: '',
      customsSealNo: '',
      grossWeight: '',
      hazardous: 'N',
      refer: 'N',
      sa: '',
      saName: '',
      sl: '',
      slName: '',
      deliveryOrderNo: '',
      deliveryOrderDate: null,
      doValidityDate: null,
      onAccountOf: '',
      onAccountOfName: '',
      containerHealth: '',
      transporter: '',
      transporterName: '',
      transporterStatus: '',
      vehicleNo: '',
      driverName: '',
      comments: ''
    })

    setMultipleGateIn([{
      companyId: '',
      branchId: '',
      gateInId: '',
      erpDocRefNo: '',
      docRefNo: '',
      docRefDate: null,
      commodityDescription: '',
      actualNoOfPackages: '',
      cargoWeight: '',
      fob: ''
    }])

    setFormErrors({
      gateNo: '',
      containerNo: '',
      onAccountOf: '',
      transporter: '',
      vehicleNo: ''
    })
  }


  const [containerData, setContainerData] = useState([]);

  const getContainers = (val) => {
    if (val === '') {
      setContainerData([]);
      return
    }

    axios.get(`${ipaddress}portReturn/getContainers?cid=${companyid}&bid=${branchId}&val=${val}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const portOptions = response.data.map(port => ({
          value: port,
          label: port,
        }))


        setContainerData(portOptions);
      })
      .catch((error) => {
        setContainerData([]);
      })
  }

  const handleContainerChange = async (selectedOption, { action }) => {

    if (action === 'clear') {
      handleClear();
    }
    else {
      setGateIn({
        ...gateIn,
        containerNo: selectedOption.value || ''
      })
      getSelectedContainerData(selectedOption.value);
      setFormErrors(prevState => ({
        ...prevState,
        containerNo: '',
        onAccountOf: '',
        transporter: ''
      }));
    }

  }

  const getSelectedContainerData = (val) => {
    axios.get(`${ipaddress}portReturn/getSingleContainer?cid=${companyid}&bid=${branchId}&val=${val}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {

        const data = response.data;
        const conData = data.containerData;
        const sbData = data.sbData;


        setGateIn({
          companyId: '',
          branchId: '',
          gateInId: '',
          finYear: new Date().getFullYear(),
          erpDocRefNo: '',
          docRefNo: '',
          lineNo: '',
          srNo: '',
          shift: 'Day',
          inGateInDate: new Date(),
          gateNo: 'Gate01',
          cartingTransId: sbData[0][8] || '',
          status: '',
          createdBy: '',
          gateInType: 'PortRn',
          containerNo: conData.containerNo || '',
          containerSize: conData.containerSize || '',
          containerType: conData.containerType || '',
          isoCode: conData.isoCode || '',
          containerStatus: conData.containerStatus || 'FCL',
          profitcentreId: 'CFS Export',
          containerSealNo: sbData[0][6] || '',
          customsSealNo: sbData[0][7] || '',
          grossWeight: sbData.reduce((item, val) => item + val[5], 0),
          hazardous: 'N',
          refer: 'N',
          sa: conData.sa || '',
          saName: conData.saName || '',
          sl: conData.sl || '',
          slName: conData.slName || '',
          deliveryOrderNo: conData.deliveryOrderNo || '',
          deliveryOrderDate: conData.deliveryOrderDate === null ? null : new Date(conData.deliveryOrderDate),
          doValidityDate: conData.doValidityDate === null ? null : new Date(conData.doValidityDate),
          onAccountOf: conData.onAccountOf || '',
          onAccountOfName: conData.onAccountOfName || '',
          containerHealth: '',
          transporter: conData.transporter || '',
          transporterName: conData.transporterName || '',
          transporterStatus: conData.transporterStatus || '',
          vehicleNo: '',
          driverName: '',
          comments: ''
        })

        setMultipleGateIn(sbData.map((item) => ({
          companyId: '',
          branchId: '',
          gateInId: '',
          erpDocRefNo: item[0] || '',
          docRefNo: item[1] || '',
          docRefDate: item[2] === null ? null : new Date(item[2]),
          commodityDescription: item[3] || '',
          actualNoOfPackages: item[4] || '',
          cargoWeight: item[5] || '',
          fob: item[9] || ''
        })))


      })
      .catch((error) => {
        toast.error(error.response.data, {
          autoClose: 800
        })
      })
  }

  const handleSave = () => {
    setLoading(true);
    setFormErrors({
      gateNo: '',
      containerNo: '',
      onAccountOf: '',
      transporter: '',
      vehicleNo: ''
    })

    let errors = {};

    if (!gateIn.gateNo) {
      errors.gateNo = "Gate no is required."
    }

    if (!gateIn.containerNo) {
      errors.containerNo = "Container no is required."
    }

    if (!gateIn.onAccountOf) {
      errors.onAccountOf = "On account of is required."
    }

    if (!gateIn.transporter) {
      errors.transporter = "Transporter is required."
    }

    if (!gateIn.vehicleNo) {
      errors.vehicleNo = "Vehicle no is required."
    }

    if (Object.keys(errors).length > 0) {
      setLoading(false);
      setFormErrors(errors);
      toast.error("Please fill in the required fields.", {
        autoClose: 1000
      })
      return;
    }


    const formData = {
      gateInData: gateIn,
      multipleGateInData: multipleGateIn
    }

    axios.post(`${ipaddress}portReturn/savePortContainerGateIn?cid=${companyid}&bid=${branchId}&user=${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {

        const data = response.data;
        const conData = data[0];

        console.log('gate in data ', data);


        setGateIn({
          companyId: '',
          branchId: '',
          gateInId: conData.gateInId || '',
          finYear: new Date().getFullYear(),
          erpDocRefNo: '',
          docRefNo: '',
          lineNo: '',
          srNo: '',
          shift: 'Day',
          inGateInDate: conData.inGateInDate === null ? new Date() : new Date(conData.inGateInDate),
          gateNo: conData.gateNo || 'Gate01',
          cartingTransId: conData.cartingTransId || '',
          status: conData.status || '',
          createdBy: conData.createdBy || '',
          gateInType: 'PortRn',
          containerNo: conData.containerNo || '',
          containerSize: conData.containerSize || '',
          containerType: conData.containerType || '',
          isoCode: conData.isoCode || '',
          containerStatus: conData.containerStatus || 'FCL',
          profitcentreId: 'CFS Export',
          containerSealNo: conData.containerSealNo || '',
          customsSealNo: conData.customsSealNo || '',
          grossWeight: conData.grossWeight || '',
          hazardous: conData.hazardous || 'N',
          refer: conData.refer || 'N',
          sa: conData.sa || '',
          saName: conData.saName || '',
          sl: conData.sl || '',
          slName: conData.slName || '',
          deliveryOrderNo: conData.deliveryOrderNo || '',
          deliveryOrderDate: conData.deliveryOrderDate === null ? null : new Date(conData.deliveryOrderDate),
          doValidityDate: conData.doValidityDate === null ? null : new Date(conData.doValidityDate),
          onAccountOf: conData.onAccountOf || '',
          onAccountOfName: conData.onAccountOfName || '',
          containerHealth: conData.containerHealth || '',
          transporter: conData.transporter || '',
          transporterName: conData.transporterName || '',
          transporterStatus: conData.transporterStatus || '',
          vehicleNo: conData.vehicleNo || '',
          driverName: conData.driverName || '',
          comments: conData.comments || ''
        })

        setMultipleGateIn(data.map((item) => ({
          companyId: '',
          branchId: '',
          gateInId: item.gateInId || '',
          erpDocRefNo: item.erpDocRefNo || '',
          docRefNo: item.docRefNo || '',
          docRefDate: item.docRefDate === null ? null : new Date(item.docRefDate),
          commodityDescription: item.commodityDescription || '',
          actualNoOfPackages: item.actualNoOfPackages || '',
          cargoWeight: item.cargoWeight || '',
          fob: ''
        })))

        if (searchData && (searchData.sbNo || searchData.container)
        ) {
          updatePagesList("P00226");
        }

        toast.success("Data save successfully!!", {
          autoClose: 800
        })

        setLoading(false);
      })
      .catch((error) => {
        console.log('error ', error);

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
    axios.get(`${ipaddress}portReturn/search?cid=${companyid}&bid=${branchId}&val=${id}`, {
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

    axios.get(`${ipaddress}portReturn/searchSelectedData?cid=${companyid}&bid=${branchId}&val=${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {

        const data = response.data;
        const conData = data[0];



        setGateIn({
          companyId: '',
          branchId: '',
          gateInId: conData.gateInId || '',
          finYear: new Date().getFullYear(),
          erpDocRefNo: '',
          docRefNo: '',
          lineNo: '',
          srNo: '',
          shift: 'Day',
          inGateInDate: conData.inGateInDate === null ? new Date() : new Date(conData.inGateInDate),
          gateNo: conData.gateNo || 'Gate01',
          cartingTransId: conData.cartingTransId || '',
          status: conData.status || '',
          createdBy: conData.createdBy || '',
          gateInType: 'PortRn',
          containerNo: conData.containerNo || '',
          containerSize: conData.containerSize || '',
          containerType: conData.containerType || '',
          isoCode: conData.isoCode || '',
          containerStatus: conData.containerStatus || 'FCL',
          profitcentreId: 'CFS Export',
          containerSealNo: conData.containerSealNo || '',
          customsSealNo: conData.customsSealNo || '',
          grossWeight: conData.grossWeight || '',
          hazardous: conData.hazardous || 'N',
          refer: conData.refer || 'N',
          sa: conData.sa || '',
          saName: conData.saName || '',
          sl: conData.sl || '',
          slName: conData.slName || '',
          deliveryOrderNo: conData.deliveryOrderNo || '',
          deliveryOrderDate: conData.deliveryOrderDate === null ? null : new Date(conData.deliveryOrderDate),
          doValidityDate: conData.doValidityDate === null ? null : new Date(conData.doValidityDate),
          onAccountOf: conData.onAccountOf || '',
          onAccountOfName: conData.onAccountOfName || '',
          containerHealth: conData.containerHealth || '',
          transporter: conData.transporter || '',
          transporterName: conData.transporterName || '',
          transporterStatus: conData.transporterStatus || '',
          vehicleNo: conData.vehicleNo || '',
          driverName: conData.driverName || '',
          comments: conData.comments || ''
        })

        setMultipleGateIn(data.map((item) => ({
          companyId: '',
          branchId: '',
          gateInId: item.gateInId || '',
          erpDocRefNo: item.erpDocRefNo || '',
          docRefNo: item.docRefNo || '',
          docRefDate: item.docRefDate === null ? null : new Date(item.docRefDate),
          commodityDescription: item.commodityDescription || '',
          actualNoOfPackages: item.actualNoOfPackages || '',
          cargoWeight: item.cargoWeight || '',
          fob: ''
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






  const downLoadReport = async () => {
    setLoading(true);

    const dataTosend = {
      companyId: companyid,
      branchId: branchId,
      profitCenterId: gateIn.profitcentreId,
      gateInId: gateIn.gateInId,
      userId: userId,
    }
    try {
      const response = await CFSService.downLoadExportPortReturnReport(dataTosend, jwtToken);

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
            /> Search Port Return Gate In Data</h5>



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
                    <th scope="col">Gate In Date</th>
                    <th scope="col">Gate No</th>
                    <th scope="col">Container No</th>
                    <th scope="col">Container Size</th>
                    <th scope="col">Container type</th>
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
                      <td>{item[6]}</td>
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
              <label className="forlabel bold-label" htmlFor="gateInId">
                Gate In No
              </label>
              <Row>
                <Col md={9}>
                  <Input
                    value={gateIn.gateInId}
                    className="form-control"
                    type="text"
                    id="gateInId"
                    name='gateInId'
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
              <label className="forlabel bold-label" htmlFor="inGateInDate">
                Gate In Date
              </label>
              <div style={{ position: 'relative' }}>
                <DatePicker
                  selected={gateIn.inGateInDate}
                  name='inGateInDate'
                  id="inGateInDate"
                  disabled
                  dateFormat="dd/MM/yyyy HH:mm"
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
              <label className="forlabel bold-label" htmlFor="gateNo">
                Gate No <span style={{ color: 'red' }}>*</span>
              </label>
              <Row>
                {/* <Col md={6}>
                  <Input
                    className="form-control"
                    type="select"
                    id="requestReferenceNo"
                    name='requestReferenceNo'
                  >
                    <option value="Day">Day</option>
                    <option value="Second">Second</option>
                    <option value="Third">Third</option>
                  </Input>
                </Col> */}
                <Col md={12}>
                  <Input
                    className={`form-control ${formErrors.gateNo ? 'error-border' : ''}`}
                    type="select"
                    id="gateNo"
                    name='gateNo'
                    value={gateIn.gateNo}
                    onChange={(e) => handleGateInChange(e)}
                  >
                    <option value="">Select Gate No</option>
                    {gateData.map((item, index) => (
                      <option key={index} value={item[0]}>{item[1]}</option>
                    ))}
                  </Input>
                  <div style={{ color: 'red' }} className="error-message">{formErrors.gateNo}</div>
                </Col>
              </Row>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="cartingTransId">
                Movement Request Id
              </label>
              <Input
                className="form-control"
                type="text"
                id="cartingTransId"
                name='cartingTransId'
                disabled
                value={gateIn.cartingTransId}
              />
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
                disabled
                value={gateIn.status === 'A' ? 'Approved' : gateIn.status}
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
                value={gateIn.createdBy}
                disabled
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="gateInType">
                Gate In Type
              </label>
              <Input
                className="form-control"
                type="select"
                disabled
                value={gateIn.gateInType}
                id="gateInType"
                name='gateInType'

              >
                <option value="PortRn">Port Return</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="containerNo">
                Container No <span style={{ color: 'red' }}>*</span>
              </label>
              <Select
                value={{ value: gateIn.containerNo, label: gateIn.containerNo }}
                options={containerData}
                onInputChange={getContainers}
                onChange={handleContainerChange}
                placeholder="Select Container"
                isClearable
                isDisabled={gateIn.gateInId !== ''}
                id="containerNo"
                name='containerNo'
                className={`autocompleteHeight ${formErrors.containerNo ? 'error-border' : ''}`}
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
              <div style={{ color: 'red' }} className="error-message">{formErrors.containerNo}</div>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="isoCode">
                ISO Code
              </label>
              <Select
                value={{ value: gateIn.isoCode, label: gateIn.isoCode }}
                options={isoCodes}
                onChange={handleISOChange}
                placeholder="Select ISO Code"
                isClearable
                isDisabled
                id="isoCode"
                name='isoCode'
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
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="containerSize">
                Cont Size&Type
              </label>
              <Input
                className="form-control"
                type="text"
                id="containerSize"
                name='containerSize'
                disabled
                value={gateIn.containerSize + gateIn.containerType}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="containerStatus">
                Container Status
              </label>
              <Input
                className="form-control"
                type="select"
                id="containerStatus"
                name='containerStatus'
                value={gateIn.containerStatus}
                onChange={handleGateInChange}
              >
                <option value="FCL">FCL</option>
                <option value="LCL">LCL</option>
                <option value="MTY">EMPTY</option>
              </Input>
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
                disabled
                value={gateIn.profitcentreId}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="customsSealNo">
                Custom Seal No
              </label>
              <Input
                className="form-control"
                type="text"
                id="customsSealNo"
                name='customsSealNo'
                value={gateIn.customsSealNo}
                onChange={handleGateInChange}
                disabled
                maxLength={15}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="containerSealNo">
                Container Seal No
              </label>
              <Input
                className="form-control"
                type="text"
                id="containerSealNo"
                name='containerSealNo'
                value={gateIn.containerSealNo}
                onChange={handleGateInChange}
                maxLength={15}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="grossWeight">
                Gross Weight
              </label>
              <Input
                className="form-control"
                type="text"
                id="grossWeight"
                name='grossWeight'
                value={gateIn.grossWeight}
                onChange={(e) => handleGateInChange(e, 12, 4)}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="hazardous">
                Hazardous / Reefer
              </label>
              <Row>
                <Col md={6}>
                  <Input
                    className="form-control"
                    type="select"
                    id="hazardous"
                    name='hazardous'
                    value={gateIn.hazardous}
                    onChange={handleGateInChange}
                  >
                    <option value="N">No</option>
                    <option value="Y">Yes</option>
                  </Input>

                </Col>
                <Col md={6}>
                  <Input
                    className="form-control"
                    type="select"
                    id="refer"
                    name='refer'
                    value={gateIn.refer}
                    onChange={handleGateInChange}
                  >
                    <option value="N">No</option>
                    <option value="Y">Yes</option>
                  </Input>
                </Col>
              </Row>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="requestReferenceNo">
                Shipping Agent
              </label>
              <Select
                value={{ value: gateIn.sa, label: gateIn.saName }}
                options={agentData}
                onChange={handleSaChange}
                onInputChange={getAgentData}
                placeholder="Select Shipping Agent"
                isClearable
                id="onAccountOf"
                name='onAccountOf'
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
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="requestReferenceNo">
                Shipping Line
              </label>
              <Select
                value={{ value: gateIn.sl, label: gateIn.slName }}
                options={linerData}
                onChange={handleSlChange}
                onInputChange={getLinerData}
                placeholder="Select Shipping Line"
                isClearable
                id="onAccountOf"
                name='onAccountOf'
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
              <label className="forlabel bold-label" htmlFor="requestReferenceNo">
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
              <label className="forlabel bold-label" htmlFor="deliveryOrderDate">
                DO Date
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
              <label className="forlabel bold-label" htmlFor="doValidityDate">
                DO Validity Date
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
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="onAccountOfName">
                On Account Of <span style={{ color: 'red' }}>*</span>
              </label>
              <Select
                value={{ value: gateIn.onAccountOf, label: gateIn.onAccountOfName }}
                options={onAccountOfData}
                onChange={handleOnAccountOfChange}
                onInputChange={searchOnAccountOfData}
                placeholder="Select OnAccountOf"
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
              <label className="forlabel bold-label" htmlFor="containerHealth">
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

                <option value="" selected="">Select Container Health</option>

                <option value="HDEMAG">Heavy Damage</option>

                <option value="LDEMAG">Light Damage</option>

                <option value="MDEMAG">Medium Damage</option>

                <option value="OK">Healthy</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="transporterStatus">
                Transporter Status
              </label>
              <Input
                className="form-control"
                type="select"
                id="transporterStatus"
                name='transporterStatus'
                value={gateIn.transporterStatus}
                onChange={handleGateInChange}
              >
                <option value="P">Private</option>
                <option value="C">Contractor</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="transporter">
                Transporter <span style={{ color: 'red' }}>*</span>
              </label>
              <CreatableSelect
                value={{ value: gateIn.transporter, label: gateIn.transporterName }}
                onChange={handleTransporterChange}
                onCreateOption={(inputValue) => {

                  setGateIn({
                    ...gateIn,
                    transporter: '',  // Save the manually typed value
                    transporterName: inputValue.slice(0, 50) // Assign the value to transporterName as well
                  });
                  setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    ['transporter']: "",
                  }));
                }}
                options={transporterData}
                placeholder="Select Transporter"
                isClearable
                id="transporter"
                name='transporter'
                className={`autocompleteHeight ${formErrors.transporter ? 'error-border' : ''}`}
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
              <div style={{ color: 'red' }} className="error-message">{formErrors.transporter}</div>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="vehicleNo">
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
              <label className="forlabel bold-label" htmlFor="driverName">
                Driver
              </label>
              <Input
                className="form-control"
                type="text"
                id="driverName"
                name='driverName'
                value={gateIn.driverName}
                onChange={handleGateInChange}
                maxLength={50}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="comments">
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


            {gateIn.gateInId && (

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
                <th scope="col" className="text-center" style={{ color: 'black' }}>SB No</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>SB Trans Id</th>
                <th scope="col" className="text-center" style={{ color: 'black', minWidth: 100 }}>SB Date</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Commodity</th>
                <th scope="col" className="text-center" style={{ color: 'black', minWidth: 80 }}>No Of Pack</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Cargo Weight</th>
              </tr>
            </thead>
            <tbody>
              {multipleGateIn.map((item, index) => (
                <tr key={index}>
                  <td>{item.docRefNo}</td>
                  <td>{item.erpDocRefNo}</td>
                  <td style={{ width: 170 }}>
                    <div style={{ position: 'relative' }}>
                      <DatePicker
                        selected={item.docRefDate}
                        name='docRefDate'
                        id="docRefDate"
                        disabled
                        dateFormat="dd/MM/yyyy HH:mm"
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
                  </td>
                  <td>{item.commodityDescription}</td>
                  <td>{item.actualNoOfPackages}</td>
                  <td>{item.cargoWeight}</td>
                </tr>
              ))}

            </tbody>
          </Table>
        </div>

      </div>
    </>
  );
}

export default PortReturnContainerGateIn;