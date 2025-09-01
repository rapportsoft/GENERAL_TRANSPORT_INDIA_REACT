// import AuthContext from '../Components/AuthProvider';
// import { useLocation, useNavigate } from 'react-router-dom';
// import React, { useEffect, useState, useContext } from 'react';
// import '../Components/Style.css';
// import { Pagination } from 'react-bootstrap';
// import Select from 'react-select';
// import Swal from 'sweetalert2';
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
// import { Button } from "react-bootstrap";
// import useAxios from '../Components/useAxios';
// import CFSService from '../service/CFSService';
// import { toast } from 'react-toastify';
// import ipaddress from "../Components/IpAddress";
// import movementService from "../service/MovementService";
// import CreatableSelect from 'react-select/creatable';
// import { error } from 'jquery';

// function StuffingTallyCLP({ searchData, resetFlag, updatePagesList }) {

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

//   const axiosInstance = useAxios();
//   const MovementService = new movementService(axiosInstance);

//   const location = useLocation();
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const processId = 'P00221';

//   const foundRights = role !== 'ROLE_ADMIN' ? userRights.find(item => item.process_Id === processId) : null;
//   const allowCreate = foundRights?.allow_Create === 'Y';
//   const allowRead = foundRights?.allow_Read === 'Y';
//   const allowEdit = foundRights?.allow_Update === 'Y';
//   const allowDelete = foundRights?.allow_Delete === 'Y';



//   useEffect(() => {
//     if (searchData && searchData.activeTab === processId && searchData.stuffTallyId && searchData.containerNo) {
//       getSelectedTallyData(searchData.stuffTallyId);
//     }
//   }, [searchData]);

//   useEffect(() => {
//     if (resetFlag) {
//       handleClear();
//     }
//   }, [resetFlag]);


//   const [stuffTally, setStuffTally] = useState({
//     companyId: '',
//     branchId: '',
//     stuffTallyId: '',
//     sbTransId: '',
//     stuffTallyLineId: 0,
//     profitcentreId: '',
//     cartingTransId: '',
//     sbLineId: '',
//     cartingLineId: '',
//     sbNo: '',
//     stuffTallyDate: new Date(),
//     stuffMode: 'Normal',
//     status: '',
//     createdBy: '',
//     stuffId: '',
//     stuffDate: null,
//     shift: 'Day',
//     shippingAgent: '',
//     shippingLine: '',
//     cargoWeight: '',
//     agentSealNo: '',
//     customsSealNo: '',
//     containerStatus: 'FCL',
//     vesselId: '',
//     vesselName: '',
//     voyageNo: '',
//     viaNo: '',
//     terminal: '',
//     pol: '',
//     containerCondition: '',
//     containerNo: '',
//     containerSize: '',
//     containerType: '',
//     tareWeight: '',
//     yardLocation: '',
//     yardBlock: '',
//     blockCellNo: '',
//     pod: '',
//     finalPod: '',
//     periodFrom: null,
//     cha: '',
//     haz: 'N',
//     sealType: '',
//     genSetRequired: 'N',
//     docType: '',
//     docNo: '',
//     rotationNo: '',
//     rotationDate: null,
//     terminal: '',
//     berthingDate: null,
//     gateOpenDate: null,
//     deliveryOrderNo: '',
//     stuffTallyWoTransId: '',
//     stuffTallyCutWoTransDate: null,
//   })


//   const [stuffTallyDtl, setStuffTallyDtl] = useState([{
//     companyId: '',
//     branchId: '',
//     stuffTallyId: '',
//     sbTransId: '',
//     stuffTallyLineId: 0,
//     profitcentreId: '',
//     cartingTransId: '',
//     sbLineId: '',
//     cartingLineId: '',
//     sbNo: '',
//     sbDate: null,
//     exporterName: '',
//     commodity: '',
//     consignee: '',
//     fob: '',
//     typeOfPackage: '',
//     yardPackages: 0,
//     cellAreaAllocated: 0,
//     stuffRequestQty: 0,
//     contStuffPackages: 0,
//     stuffedQuantity: 0,
//     areaReleased: 0,
//     stuffedQty: 0,
//     balanceQty: 0,
//     balQty: 0,
//     cargoWeight: 0,
//     totalCargoWeight: 0
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



//   const handleStuffTallyChange = (e, val1, val2) => {
//     const { name, value } = e.target;
//     let sanitizeValue = value

//     if (['tareWeight', 'cargoWeight'].includes(name)) {
//       sanitizeValue = handleInputChange(value, val1, val2)
//     }

//     setStuffTally(prevState => ({
//       ...prevState,
//       [name]: sanitizeValue
//     }));

//     setFormErrors(prevState => ({
//       ...prevState,
//       [name]: ''
//     }));

//   };

//   const handleStuffTallyDtlChange = (e, index, val1, val2) => {
//     const { name, value } = e.target;
//     let sanitizedValue = value;

//     // Sanitize input for specific fields
//     if (['stuffedQty', 'balanceQty', 'cargoWeight', 'areaReleased'].includes(name)) {
//       sanitizedValue = handleInputChange(value, val1, val2);
//     }

//     if (name === 'stuffedQty') {
//       if (sanitizedValue === '') {
//         setStuffTallyDtl(prevState => {
//           const updatedData = [...prevState];
//           updatedData[index] = {
//             ...updatedData[index],
//             areaReleased: '',
//             cargoWeight: '',
//             balanceQty: ''
//           };
//           return updatedData;
//         });
//       }
//       console.log('balQty ' + stuffTallyDtl[index].balQty, ' ', stuffTally.stuffTallyId !== '' ? (((stuffTallyDtl[index].stuffRequestQty >= stuffTallyDtl[index].stuffedQuantity) ? stuffTallyDtl[index].stuffRequestQty : stuffTallyDtl[index].stuffedQuantity) + stuffTallyDtl[index].balQty) : stuffTallyDtl[index].stuffRequestQty);

//       if (sanitizedValue > (stuffTally.stuffTallyId !== '' ? (stuffTallyDtl[index].stuffedQuantity + stuffTallyDtl[index].balQty) : stuffTallyDtl[index].stuffRequestQty)) {
//         sanitizedValue = '';

//         setStuffTallyDtl(prevState => {
//           const updatedData = [...prevState];
//           updatedData[index] = {
//             ...updatedData[index],
//             areaReleased: '',
//             cargoWeight: '',
//             balanceQty: ''
//           };
//           return updatedData;
//         });
//       }

//       else {


//         if (sanitizedValue > 0) {
//           let area = (parseFloat(stuffTallyDtl[index].cellAreaAllocated) * parseFloat(sanitizedValue)) / parseFloat(stuffTallyDtl[index].stuffRequestQty)
//           let gross = (parseFloat(stuffTallyDtl[index].totalCargoWeight) * parseFloat(sanitizedValue)) / parseFloat(stuffTallyDtl[index].stuffRequestQty)
//           let bal = 0;

//           if (parseFloat(sanitizedValue) <= parseFloat(stuffTallyDtl[index].stuffRequestQty)) {
//             bal = parseFloat(stuffTallyDtl[index].stuffRequestQty) - parseFloat(sanitizedValue);
//           }


//           setStuffTallyDtl(prevState => {
//             const updatedData = [...prevState];
//             updatedData[index] = {
//               ...updatedData[index],
//               areaReleased: handleInputChange(area, 5, 3),
//               cargoWeight: handleInputChange(gross, 12, 4),
//               balanceQty: handleInputChange(bal, 8, 0),
//             };
//             return updatedData;
//           });
//           setErrors(prevErrors => {
//             // Ensure prevErrors is an array
//             const updatedErrors = Array.isArray(prevErrors) ? [...prevErrors] : [];

//             if (updatedErrors[index]) {
//               delete updatedErrors[index]['areaReleased'];
//               delete updatedErrors[index]['cargoWeight'];

//               // Remove the error object at the index if it's empty
//               if (Object.keys(updatedErrors[index]).length === 0) {
//                 updatedErrors.splice(index, 1);
//               }
//             }

//             return updatedErrors;
//           });

//         }

//       }
//     }

//     // Update igmCrgData state
//     setStuffTallyDtl(prevState => {
//       const updatedData = [...prevState];
//       updatedData[index] = {
//         ...updatedData[index],
//         [name]: sanitizedValue
//       };
//       return updatedData;
//     });

//     setErrors(prevErrors => {
//       // Ensure prevErrors is an array
//       const updatedErrors = Array.isArray(prevErrors) ? [...prevErrors] : [];

//       if (updatedErrors[index]) {
//         delete updatedErrors[index][name]; // Corrected field access

//         // Remove the entry if there are no more errors for that index
//         if (Object.keys(updatedErrors[index]).length === 0) {
//           updatedErrors.splice(index, 1);
//         }
//       }

//       return updatedErrors;
//     });




//   }

//   const [packages, setpackages] = useState([]);
//   const getTypeOfPack = () => {
//     const id = 'J00060';
//     axios.get(`${ipaddress}jardetail/getJarDetail?companyId=${companyid}&jarId=${id}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {
//         setpackages(response.data);
//       })
//       .catch((error) => {

//       })
//   }

//   const [chaList, setChaList] = useState([]);
//   const [chaName, setChaName] = useState('');

//   const handleCHAList = (val) => {
//     if (val === '') {
//       setChaList([]);
//       return;
//     }

//     axios.get(`${ipaddress}party/getCha1?cid=${companyid}&bid=${branchId}&val=${val}`, {
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
//         setChaList(portOptions);
//       })
//       .catch((error) => {
//         setChaList([]);
//       })
//   }

//   const handleChaSelect = async (selectedOption, { action }) => {
//     if (action === 'clear') {
//       setStuffTally({
//         ...stuffTally,
//         cha: ''
//       });
//       setChaName('');
//     }
//     else {
//       setStuffTally({
//         ...stuffTally,
//         cha: selectedOption.value,
//       });
//       setChaName(selectedOption.label);
//     }

//   }

//   useEffect(() => {
//     if (searchData && searchData.activeTab === 'P00221') {
//       getTypeOfPack();
//     }
//   }, [searchData])

//   const [vesselData, setVesselData] = useState([]);

//   const searchVoyageAndVia = (id) => {


//     if (id === '') {
//       setVesselData([]);
//       return;
//     }

//     axios.get(`${ipaddress}stuffTally/searchVoyage?cid=${companyid}&bid=${branchId}&search=${id}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {

//         const data = response.data;



//         const vesselOp = data.map(port => ({
//           value: port.vesselCode,
//           label: port.vesselName + '-' + port.voyageNo + '-' + port.viaNo,
//           viaNo: port.viaNo,
//           gateOpenDate: port.gateOpenDate,
//           berthDate: port.berthDate,
//           rotationNo: port.rotationNo,
//           rotationNoDate: port.rotationNoDate,
//           vesselName: port.vesselName,
//           voyageNo: port.voyageNo
//         }))

//         setVesselData(vesselOp);
//       })
//       .catch((error) => {
//         setVesselData([]);
//       })
//   }

//   const handleVoyageSelect = async (selectedOption, { action }) => {
//     if (action === 'clear') {
//       setStuffTally({
//         ...stuffTally,
//         vesselId: '',
//         voyageNo: '',
//         viaNo: '',
//         vesselName: ''
//       });

//     }
//     else {
//       setStuffTally({
//         ...stuffTally,
//         vesselId: selectedOption.value,
//         voyageNo: selectedOption.voyageNo,
//         viaNo: selectedOption.viaNo,
//         vesselName: selectedOption.vesselName
//       });

//     }

//   }

//   const [stuffReqData, setStuffReqData] = useState([]);


//   const searchStuffreqIdData = (id) => {

//     if (id === '') {
//       setStuffReqData([]);
//       return;
//     }

//     axios.get(`${ipaddress}stuffTally/getDataByStuffId?cid=${companyid}&bid=${branchId}&search=${id}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {

//         const data = response.data;

//         console.log('data ', data);



//         const d = data.map(port => ({
//           value: port,
//           label: port,
//         }))

//         setStuffReqData(d);
//       })
//       .catch((error) => {
//         setStuffReqData([]);
//       })
//   }


//   const handleStuffReqIdSelect = async (selectedOption, { action }) => {
//     if (action === 'clear') {
//       // setStuffTally({
//       //   ...stuffTally,
//       //   stuffId: '',
//       // });

//       handleClear();

//     }
//     else {
//       getSelectedStuffReqData(selectedOption.value);

//     }

//   }

//   const getSelectedStuffReqData = (id) => {
//     setLoading(true);
//     axios.get(`${ipaddress}stuffTally/getDataByStuffReqId?cid=${companyid}&bid=${branchId}&id=${id}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {

//         console.log('reqdata ', response.data);

//         const data = response.data;
//         const reqdata = response.data.data;
//         const singleData = reqdata[0];
//         setChaName(data.cha[0][1]);

//         setStuffTally({
//           companyId: '',
//           branchId: '',
//           stuffTallyId: '',
//           sbTransId: singleData.sbTransId || '',
//           stuffTallyLineId: 0,
//           profitcentreId: singleData.profitcentreId || '',
//           cartingTransId: singleData.cartingTransId || '',
//           sbLineId: singleData.sbLineId || '',
//           cartingLineId: singleData.cartingLineId || '',
//           sbNo: singleData.sbNo || '',
//           stuffTallyDate: new Date(),
//           stuffMode: 'Normal',
//           status: '',
//           createdBy: '',
//           stuffId: singleData.stuffReqId || '',
//           stuffDate: singleData.stuffReqDate === null ? null : new Date(singleData.stuffReqDate),
//           shift: 'Day',
//           shippingAgent: singleData.shippingAgent || '',
//           shippingLine: singleData.shippingLine || '',
//           cargoWeight: '',
//           agentSealNo: singleData.agentSealNo || '',
//           customsSealNo: '',
//           containerStatus: 'FCL',
//           vesselId: singleData.vesselId || '',
//           vesselName: singleData.vesselName || '',
//           voyageNo: singleData.voyageNo || '',
//           viaNo: singleData.viaNo || '',
//           terminal: singleData.terminal || '',
//           pol: singleData.pol || '',
//           containerCondition: singleData.containerHealth || '',
//           containerNo: singleData.containerNo || '',
//           containerSize: singleData.containerSize || '',
//           containerType: singleData.containerType || '',
//           tareWeight: singleData.tareWeight || '',
//           yardLocation: singleData.yardLocation || '',
//           yardBlock: singleData.yardBlock || '',
//           blockCellNo: singleData.blockCellNo || '',
//           pod: singleData.pod || '',
//           finalPod: singleData.finalPod || '',
//           periodFrom: singleData.periodFrom === null ? null : new Date(singleData.periodFrom),
//           cha: data.cha[0][0] || '',
//           haz: singleData.haz || '',
//           sealType: singleData.sealType || '',
//           genSetRequired: singleData.genSetRequired || 'N',
//           docType: singleData.docType || '',
//           docNo: singleData.docNo || '',
//           rotationNo: singleData.rotationNo || '',
//           rotationDate: singleData.rotationDate === null ? null : new Date(singleData.rotationDate),
//           terminal: singleData.terminal || '',
//           berthingDate: singleData.berthingDate === null ? null : new Date(singleData.berthingDate),
//           gateOpenDate: singleData.gateOpenDate === null ? null : new Date(singleData.gateOpenDate),
//           deliveryOrderNo: singleData.deliveryOrderNo || '',
//           stuffTallyWoTransId: '',
//           stuffTallyCutWoTransDate: null,
//           totalGrossWeight: 0.00,
//         });


//         setSelectedFinalPod( singleData.finalPod ? {value: singleData.finalPod, label: singleData.finalPod} : null);
//         setSelectedPod( singleData.pod ? {value: singleData.pod, label: singleData.pod} : null);
//         setSelectedTerminal( singleData.terminal ? {value: singleData.terminal, label: singleData.terminal} : null);

//         setStuffTallyDtl(reqdata.map((item) => ({
//           companyId: '',
//           branchId: '',
//           stuffTallyId: '',
//           sbTransId: item.sbTransId || '',
//           stuffTallyLineId: item.stuffReqLineId || 0,
//           profitcentreId: item.profitcentreId || '',
//           cartingTransId: item.cartingTransId || '',
//           sbLineId: item.sbLineNo || '',
//           cartingLineId: item.cartingLineId || '',
//           sbNo: item.sbNo || '',
//           sbDate: item.sbDate === null ? null : new Date(item.sbDate),
//           exporterName: item.exporterName || '',
//           commodity: item.cargoDescription || '',
//           consignee: item.consignee || '',
//           fob: item.fob || '',
//           typeOfPackage: item.typeOfPackage || '',
//           stuffedQuantity: 0,
//           yardPackages: item.yardPackages || 0,
//           cellAreaAllocated: (item.cellAreaAllocated * item.noOfPackagesStuffed) / item.contStuffPackages || 0,
//           stuffRequestQty: item.noOfPackagesStuffed || 0,
//           contStuffPackages: item.contStuffPackages || 0,
//           areaReleased: 0,
//           stuffedQty: 0,
//           balanceQty: 0,
//           balQty: 0,
//           cargoWeight: 0.00,
//           totalCargoWeight: handleInputChange((parseFloat(item.cargoWeight) * parseFloat(item.noOfPackagesStuffed)) / parseFloat(item.contStuffPackages), 12, 4) || 0
//         })))






//         toast.success("Data found successfully!!", {
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

//   const [formErrors, setFormErrors] = useState({
//     stuffId: '',
//     agentSealNo: '',
//     customsSealNo: '',
//     vesselName: '',
//     voyageNo: '',
//     terminal: '',
//     pod: '',
//     finalPod: '',
//     tareWeight: '',
//   })



//   const handleClear = () => {
//     setFormErrors({
//       stuffId: '',
//       agentSealNo: '',
//       customsSealNo: '',
//       vesselName: '',
//       voyageNo: '',
//       terminal: '',
//       pod: '',
//       finalPod: '',
//       tareWeight: '',
//     })
//     setErrors([]);
//     setStuffTally({
//       companyId: '',
//       branchId: '',
//       stuffTallyId: '',
//       sbTransId: '',
//       stuffTallyLineId: 0,
//       profitcentreId: '',
//       cartingTransId: '',
//       sbLineId: '',
//       cartingLineId: '',
//       sbNo: '',
//       stuffTallyDate: new Date(),
//       stuffMode: 'Normal',
//       status: '',
//       createdBy: '',
//       stuffId: '',
//       stuffDate: null,
//       shift: 'Day',
//       shippingAgent: '',
//       shippingLine: '',
//       cargoWeight: '',
//       agentSealNo: '',
//       customsSealNo: '',
//       containerStatus: 'FCL',
//       vesselId: '',
//       vesselName: '',
//       voyageNo: '',
//       viaNo: '',
//       terminal: '',
//       pol: '',
//       containerCondition: '',
//       containerNo: '',
//       containerSize: '',
//       containerType: '',
//       tareWeight: '',
//       yardLocation: '',
//       yardBlock: '',
//       blockCellNo: '',
//       pod: '',
//       finalPod: '',
//       periodFrom: null,
//       cha: '',
//       haz: 'N',
//       sealType: '',
//       genSetRequired: 'N',
//       docType: '',
//       docNo: '',
//       rotationNo: '',
//       rotationDate: null,
//       terminal: '',
//       berthingDate: null,
//       gateOpenDate: null,
//       deliveryOrderNo: '',
//       stuffTallyWoTransId: '',
//       stuffTallyCutWoTransDate: null,
//       totalGrossWeight: 0.00
//     })
//     setChaName('');
//     setStuffTallyDtl([{
//       companyId: '',
//       branchId: '',
//       stuffTallyId: '',
//       sbTransId: '',
//       stuffTallyLineId: 0,
//       profitcentreId: '',
//       cartingTransId: '',
//       sbLineId: '',
//       cartingLineId: '',
//       sbNo: '',
//       sbDate: null,
//       exporterName: '',
//       commodity: '',
//       consignee: '',
//       fob: '',
//       typeOfPackage: '',
//       yardPackages: 0,
//       cellAreaAllocated: 0,
//       stuffRequestQty: 0,
//       contStuffPackages: 0,
//       areaReleased: 0,
//       stuffedQty: 0,
//       stuffedQuantity: 0,
//       balanceQty: 0,
//       balQty: 0,
//       cargoWeight: 0,
//       totalCargoWeight: 0
//     }]);

//     setSelectedFinalPod(null);
//     setSelectedPod(null);
//     setSelectedTerminal(null);
//   }

//   const handleSave = () => {
//     setLoading(true);
//     setFormErrors({
//       stuffId: '',
//       agentSealNo: '',
//       customsSealNo: '',
//       vesselName: '',
//       voyageNo: '',
//       terminal: '',
//       pod: '',
//       finalPod: '',
//       tareWeight: '',
//     })

//     let errors = {};

//     if (!stuffTally.stuffId) {
//       errors.stuffId = "Stuff id is required."
//     }
//     if (!stuffTally.agentSealNo) {
//       errors.agentSealNo = "Agent seal no is required."
//     }
//     if (!stuffTally.customsSealNo) {
//       errors.customsSealNo = "Customs seal no is required."
//     }
//     if (!stuffTally.vesselName) {
//       errors.vesselName = "Vessel name is required."
//     }

//     if (!stuffTally.voyageNo) {
//       errors.voyageNo = "Voyage no is required."
//     }
//     if (!stuffTally.terminal) {
//       errors.terminal = "Terminal name is required."
//     }
//     if (!stuffTally.pod) {
//       errors.pod = "POD is required."
//     }
//     if (!stuffTally.tareWeight) {
//       errors.tareWeight = "Container tare wt is required."
//     }
//     if (!stuffTally.finalPod) {
//       errors.finalPod = "Final pod is required."
//     }

//     if (Object.keys(errors).length > 0) {
//       setLoading(false);
//       setFormErrors(errors);
//       toast.error("Please fill in the required fields.", {
//         autoClose: 1000
//       })
//       return;
//     }

//     let newErrors = stuffTallyDtl.map(() => ({}));
//     setErrors([]);

//     stuffTallyDtl.forEach((data, index) => {
//       let rowErrors = {};

//       if (!data.stuffedQty) rowErrors.stuffedQty = "Stuffed quantity is required.";
//       if (!data.cargoWeight) rowErrors.cargoWeight = "Gross wt is required.";

//       if (Object.keys(rowErrors).length > 0) {
//         newErrors[index] = rowErrors;
//       }
//     });

//     // Check if any errors exist
//     const hasErrors = newErrors.some(errorObj => Object.keys(errorObj).length > 0);

//     if (hasErrors) {

//       setErrors(newErrors);
//       setLoading(false);
//       toast.error("Please fill in the required fields.", {
//         autoClose: 1000
//       });

//       return;
//     }

//     const wt = stuffTallyDtl.reduce((total, item) => total + (item.cargoWeight ? parseFloat(item.cargoWeight) : 0), 0);
//     console.log('wt ', wt);

//     const wt1 = handleInputChange(wt, 12, 3);

//     stuffTally.totalGrossWeight = wt1;

//     const formData = {
//       singleTally: stuffTally,
//       tally: stuffTallyDtl
//     }

//     axios.post(`${ipaddress}stuffTally/saveStuffingTally?cid=${companyid}&bid=${branchId}&user=${userId}`, formData, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {

//         const data = response.data;
//         const singleData = data[0];

//         setStuffTally({
//           companyId: singleData.companyId || '',
//           branchId: singleData.branchId || '',
//           stuffTallyId: singleData.stuffTallyId || '',
//           sbTransId: singleData.sbTransId || '',
//           stuffTallyLineId: singleData.stuffTallyLineId || 0,
//           profitcentreId: singleData.profitcentreId || '',
//           cartingTransId: singleData.cartingTransId || '',
//           sbLineId: singleData.sbLineId || '',
//           cartingLineId: singleData.cartingLineId || '',
//           sbNo: singleData.sbNo || '',
//           stuffTallyDate: singleData.stuffTallyDate === null ? new Date() : new Date(singleData.stuffTallyDate),
//           stuffMode: singleData.stuffMode || 'Normal',
//           status: singleData.status || '',
//           createdBy: singleData.createdBy || '',
//           stuffId: singleData.stuffId || '',
//           stuffDate: singleData.stuffDate === null ? null : new Date(singleData.stuffDate),
//           shift: singleData.shift || 'Day',
//           shippingAgent: singleData.shippingAgent || '',
//           shippingLine: singleData.shippingLine || '',
//           cargoWeight: singleData.cargoWeight || '',
//           agentSealNo: singleData.agentSealNo || '',
//           customsSealNo: singleData.customsSealNo || '',
//           containerStatus: singleData.containerStatus || 'FCL',
//           vesselId: singleData.vesselId || '',
//           vesselName: singleData.vesselName || '',
//           voyageNo: singleData.voyageNo || '',
//           viaNo: singleData.viaNo || '',
//           terminal: singleData.terminal || '',
//           pol: singleData.pol || '',
//           containerCondition: singleData.containerCondition || '',
//           containerNo: singleData.containerNo || '',
//           containerSize: singleData.containerSize || '',
//           containerType: singleData.containerType || '',
//           tareWeight: singleData.tareWeight || '',
//           yardLocation: singleData.yardLocation || '',
//           yardBlock: singleData.yardBlock || '',
//           blockCellNo: singleData.blockCellNo || '',
//           pod: singleData.pod || '',
//           finalPod: singleData.finalPod || '',
//           periodFrom: singleData.periodFrom === null ? null : new Date(singleData.periodFrom),
//           cha: singleData.cha || '',
//           haz: singleData.haz || '',
//           sealType: singleData.sealType || '',
//           genSetRequired: singleData.genSetRequired || 'N',
//           docType: singleData.docType || '',
//           docNo: singleData.docNo || '',
//           rotationNo: singleData.rotationNo || '',
//           rotationDate: singleData.rotationDate === null ? null : new Date(singleData.rotationDate),
//           terminal: singleData.terminal || '',
//           berthingDate: singleData.berthingDate === null ? null : new Date(singleData.berthingDate),
//           gateOpenDate: singleData.gateOpenDate === null ? null : new Date(singleData.gateOpenDate),
//           deliveryOrderNo: singleData.deliveryOrderNo || '',
//           stuffTallyWoTransId: singleData.stuffTallyWoTransId || '',
//           stuffTallyCutWoTransDate: singleData.stuffTallyCutWoTransDate === null ? null : new Date(singleData.stuffTallyCutWoTransDate),
//           totalGrossWeight: singleData.totalGrossWeight || 0.00,
//         });

//         setChaName(singleData.chaName);
//         setStuffTallyDtl(data.map((item) => ({
//           companyId: item.companyId || '',
//           branchId: item.branchId || '',
//           stuffTallyId: item.stuffTallyId || '',
//           sbTransId: item.sbTransId || '',
//           stuffTallyLineId: item.stuffTallyLineId || 0,
//           profitcentreId: item.profitcentreId || '',
//           cartingTransId: item.cartingTransId || '',
//           sbLineId: item.sbLineId || '',
//           cartingLineId: item.cartingLineId || '',
//           sbNo: item.sbNo || '',
//           sbDate: item.sbDate === null ? null : new Date(item.sbDate),
//           exporterName: item.exporterName || '',
//           commodity: item.commodity || '',
//           consignee: item.consignee || '',
//           fob: item.fob || '',
//           typeOfPackage: item.typeOfPackage || '',
//           yardPackages: item.yardPackages || 0,
//           cellAreaAllocated: item.cellAreaAllocated || 0,
//           stuffRequestQty: item.stuffRequestQty || 0,
//           contStuffPackages: 0,
//           areaReleased: item.areaReleased || 0,
//           stuffedQty: item.stuffedQty || 0,
//           stuffedQuantity: item.stuffedQty || 0,
//           balQty: item.balQty || 0,
//           balanceQty: item.balanceQty || 0,
//           cargoWeight: item.cargoWeight || 0.00,
//           totalCargoWeight: item.totalCargoWeight || 0
//         })))


//         toast.success("Data save successfully!!", {
//           autoClose: 800
//         })

//         if (searchData && (searchData.sbNo || searchData.container)
//         ) {
//           updatePagesList("P00221");
//         }

//         setLoading(false);
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
//     axios.get(`${ipaddress}stuffTally/searchTallyData?cid=${companyid}&bid=${branchId}&search=${id}`, {
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


//   const getSelectedTallyData = async (id) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${ipaddress}stuffTally/getSelectedData?cid=${companyid}&bid=${branchId}&search=${id}`, {
//         headers: {
//           Authorization: `Bearer ${jwtToken}`
//         }
//       });

//       const data = response.data;
//       const singleData = data[0];

//       setStuffTally({
//         companyId: singleData.companyId || '',
//         branchId: singleData.branchId || '',
//         stuffTallyId: singleData.stuffTallyId || '',
//         sbTransId: singleData.sbTransId || '',
//         stuffTallyLineId: singleData.stuffTallyLineId || 0,
//         profitcentreId: singleData.profitcentreId || '',
//         cartingTransId: singleData.cartingTransId || '',
//         sbLineId: singleData.sbLineId || '',
//         cartingLineId: singleData.cartingLineId || '',
//         sbNo: singleData.sbNo || '',
//         stuffTallyDate: singleData.stuffTallyDate === null ? new Date() : new Date(singleData.stuffTallyDate),
//         stuffMode: singleData.stuffMode || 'Normal',
//         status: singleData.status || '',
//         createdBy: singleData.createdBy || '',
//         stuffId: singleData.stuffId || '',
//         stuffDate: singleData.stuffDate === null ? null : new Date(singleData.stuffDate),
//         shift: singleData.shift || 'Day',
//         shippingAgent: singleData.shippingAgent || '',
//         shippingLine: singleData.shippingLine || '',
//         cargoWeight: singleData.cargoWeight || '',
//         agentSealNo: singleData.agentSealNo || '',
//         customsSealNo: singleData.customsSealNo || '',
//         containerStatus: singleData.containerStatus || 'FCL',
//         vesselId: singleData.vesselId || '',
//         vesselName: singleData.vesselName || '',
//         voyageNo: singleData.voyageNo || '',
//         viaNo: singleData.viaNo || '',
//         terminal: singleData.terminal || '',
//         pol: singleData.pol || '',
//         containerCondition: singleData.containerCondition || '',
//         containerNo: singleData.containerNo || '',
//         containerSize: singleData.containerSize || '',
//         containerType: singleData.containerType || '',
//         tareWeight: singleData.tareWeight || '',
//         yardLocation: singleData.yardLocation || '',
//         yardBlock: singleData.yardBlock || '',
//         blockCellNo: singleData.blockCellNo || '',
//         pod: singleData.pod || '',
//         finalPod: singleData.finalPod || '',
//         periodFrom: singleData.periodFrom === null ? null : new Date(singleData.periodFrom),
//         cha: singleData.cha || '',
//         haz: singleData.haz || '',
//         sealType: singleData.sealType || '',
//         genSetRequired: singleData.genSetRequired || 'N',
//         docType: singleData.docType || '',
//         docNo: singleData.docNo || '',
//         rotationNo: singleData.rotationNo || '',
//         rotationDate: singleData.rotationDate === null ? null : new Date(singleData.rotationDate),
//         terminal: singleData.terminal || '',
//         berthingDate: singleData.berthingDate === null ? null : new Date(singleData.berthingDate),
//         gateOpenDate: singleData.gateOpenDate === null ? null : new Date(singleData.gateOpenDate),
//         deliveryOrderNo: singleData.deliveryOrderNo || '',
//         stuffTallyWoTransId: singleData.stuffTallyWoTransId || '',
//         stuffTallyCutWoTransDate: singleData.stuffTallyCutWoTransDate === null ? null : new Date(singleData.stuffTallyCutWoTransDate),
//         totalGrossWeight: singleData.totalGrossWeight || 0.00,
//       });

//       setChaName(singleData.chaName);
//       setStuffTallyDtl(data.map((item) => ({
//         companyId: item.companyId || '',
//         branchId: item.branchId || '',
//         stuffTallyId: item.stuffTallyId || '',
//         sbTransId: item.sbTransId || '',
//         stuffTallyLineId: item.stuffTallyLineId || 0,
//         profitcentreId: item.profitcentreId || '',
//         cartingTransId: item.cartingTransId || '',
//         sbLineId: item.sbLineId || '',
//         cartingLineId: item.cartingLineId || '',
//         sbNo: item.sbNo || '',
//         sbDate: item.sbDate === null ? null : new Date(item.sbDate),
//         exporterName: item.exporterName || '',
//         commodity: item.commodity || '',
//         consignee: item.consignee || '',
//         fob: item.fob || '',
//         typeOfPackage: item.typeOfPackage || '',
//         yardPackages: item.yardPackages || 0,
//         cellAreaAllocated: item.cellAreaAllocated || 0,
//         stuffRequestQty: item.stuffRequestQty || 0,
//         contStuffPackages: 0,
//         areaReleased: item.areaReleased || 0,
//         stuffedQty: item.stuffedQty || 0,
//         stuffedQuantity: item.stuffedQty || 0,
//         balanceQty: item.balanceQty || 0,
//         balQty: item.balQty || 0,
//         cargoWeight: item.cargoWeight || 0.00,
//         totalCargoWeight: item.totalCargoWeight || 0
//       })))


//       setSelectedFinalPod({value: singleData.finalPod, label: singleData.finalPod});
//       setSelectedPod({value: singleData.pod, label: singleData.pod});
//       setSelectedTerminal({value: singleData.terminal, label: singleData.terminal});

// // console.log('singleData', singleData, selectedPod, selectedFinalPod, selectedTerminal);


//       closeGateInModal();

//       // toast.success("Data found successfully!!", {
//       //   autoClose: 800
//       // });

//     } catch (error) {
//       console.error("Error fetching data:", error);
//       toast.error("Failed to fetch data", {
//         autoClose: 800
//       });
//     }
//     finally {
//       setLoading(false);
//     }
//   };







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

//   const [isModalOpenForCotainerWorkOrder, setisModalOpenForCotainerWorkOrder] = useState(false);

//   const openContainerWiseModal = () => {
//     setisModalOpenForCotainerWorkOrder(true);
//     getVendorAndEquipment();
//     getContainerWiseEquipmentData();
//   }

//   const [getVendor, setGetVendor] = useState({});
//   const [getEquipment, setGetEquipment] = useState([]);
//   const [selectVendor, setSelectVendor] = useState('');
//   const [selectEquipmend, setSelectEquipmend] = useState('');

//   const getVendorAndEquipment = () => {
//     axios.get(`${ipaddress}equipmentActivity/getVendor?cid=${companyid}&bid=${branchId}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {
//         console.log('vendor ', response.data);

//         setGetVendor(response.data.party);
//         setGetEquipment(response.data.jar);
//       })
//       .catch((error) => {

//       })
//   }

//   const closeContainerWiseModal = () => {
//     setisModalOpenForCotainerWorkOrder(false);
//     handleContainerEquipmentClear('');
//   }

//   const handleContainerEquipmentClear = () => {
//     setSelectVendor('');
//     setSelectEquipmend('');
//   }

//   const [conEquipmentData, setConEquipmentData] = useState([]);

//   const getContainerWiseEquipmentData = () => {
//     const params = new URLSearchParams({
//       companyId: companyid,
//       branchId: branchId,
//       con: stuffTally.containerNo,
//       val1: stuffTally.stuffTallyId,
//       val2: stuffTally.stuffId
//     }).toString();
//     axios.get(`${ipaddress}equipmentActivity/getContainerDataForStuffing?${params}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {
//         setConEquipmentData(response.data);

//       })
//       .catch((error) => {
//         setConEquipmentData([]);
//       })
//   }


//   const handleContainerSaveEquipment = (ven, equi) => {
//     setLoading(true);
//     if (!ven) {
//       toast.error("Please select vendor", {
//         autoClose: 800
//       })
//       setLoading(false);
//       return;
//     }

//     if (!equi) {
//       toast.error("Please select equipment", {
//         autoClose: 800
//       })
//       setLoading(false);
//       return;
//     }


//     const params = new URLSearchParams({
//       cid: companyid,
//       bid: branchId,
//       user: userId,
//       equipment: equi,
//       vendor: ven,
//       stuffId: stuffTally.stuffTallyId,
//       finYear: new Date().getFullYear(),
//       container: stuffTally.containerNo
//     }).toString();

//     // Send the POST request with query parameters and body
//     axios.post(`${ipaddress}equipmentActivity/saveStuffTallyContainerEquipment?${params}`, null, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//         'Content-Type': 'application/json' // Ensure the content type is set to JSON
//       }
//     })
//       .then((response) => {
//         toast.success(response.data, {
//           autoClose: 800
//         })
//         setLoading(false);
//         getContainerWiseEquipmentData();
//         handleContainerEquipmentClear();
//       })
//       .catch((error) => {
//         toast.error(error.response.data, {
//           autoClose: 800
//         })
//         setLoading(false);
//       })
//   }

//   const deleteContainerEquipments = (equi, ven, destuff) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       html: `Are you sure you want to delete the record?`,
//       icon: 'warning',
//       showCancelButton: true,
//       customClass: {
//         icon: 'icon-smaller' // Apply the custom class to the icon
//       },
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, close it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         const params = new URLSearchParams({
//           cid: companyid,
//           bid: branchId,
//           user: userId,
//           destuff: destuff,
//           equipment: equi,
//           vendor: ven,
//           container: stuffTally.containerNo
//         }).toString();
//         axios.post(`${ipaddress}equipmentActivity/deleteContainerEquipmentsForStuffingTally?${params}`, null, {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`
//           }
//         })
//           .then((response) => {
//             toast.error(response.data, {
//               autoClose: 800
//             })
//             getContainerWiseEquipmentData();
//           })
//           .catch((error) => {
//             toast.error(error.response.data, {
//               autoClose: 800
//             })
//           })

//       }
//     });
//   }

//   const downloadContWiseStuffReport = () => {


//     setLoading(true);
//     axios
//       .post(
//         `${ipaddress}exportReport/exportContWiseStuffTallyReport?cid=${companyid}&bid=${branchId}&id=${stuffTally.stuffTallyId}&con=${stuffTally.containerNo}`,
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





//   const handlePODChange = async (selectedOption, fieldName) => {
//     // Update selected values
//     if (fieldName === 'finalPod') {
//       setSelectedFinalPod(selectedOption);
//     } else if (fieldName === 'pod') {
//       setSelectedPod(selectedOption);
//     } else {
//       setSelectedTerminal(selectedOption);
//     }

//     setStuffTally(prevState => ({
//       ...prevState,
//       [fieldName]: selectedOption ? selectedOption.label : ''
//     }));

//     setFormErrors(prevState => ({
//       ...prevState,
//       [fieldName]: ''
//     }));

//   };


//   const handleCreationPODSelect = async (inputValue, fieldName) => {

//     const selectedOption = { value: inputValue, label: inputValue };
//     if (fieldName === 'finalPod') {
//       setSelectedFinalPod(selectedOption);
//     } else if (fieldName === 'pod') {
//       setSelectedPod(selectedOption);
//     } else {
//       setSelectedTerminal(selectedOption);
//     }
//     setStuffTally(prevState => ({
//       ...prevState,
//       [fieldName]: inputValue
//     }));

//     setFormErrors(prevState => ({
//       ...prevState,
//       [fieldName]: ''
//     }));

//   };



//   const [terminalData, setTerminalData] = useState([]);
//   const [podData, setPodData] = useState([]);
//   const [selectedTerminal, setSelectedTerminal] = useState(null);
//   const [selectedPod, setSelectedPod] = useState(null);
//   const [finalPodData, setFinalPodData] = useState([]);
//   const [selectedFinalPod, setSelectedFinalPod] = useState(null);

//   const searchPortData = async (searchValue, fieldName) => {
//     if (!searchValue) {
//       setPodData([]);
//       setTerminalData([]);
//       setFinalPodData([]);
//       return;
//     }
//     try {
//       const response = await MovementService.searchPortsData(companyid, branchId, searchValue, jwtToken);
//       if (fieldName === 'finalPod') {
//         setFinalPodData(response.data);
//       } else if (fieldName === 'pod') {
//         setPodData(response.data);
//       } else {
//         setTerminalData(response.data);
//       }
//     } catch (error) {
//       setPodData([]);
//       setTerminalData([]);
//       setFinalPodData([]);
//       console.error('Error searching vessel:', error);
//     }
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

//       <Modal Modal isOpen={isModalOpenForCotainerWorkOrder} onClose={closeContainerWiseModal} toggle={closeContainerWiseModal} style={{ maxWidth: '900px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

//         <ModalHeader toggle={closeContainerWiseModal} style={{
//           backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
//           boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
//           border: '1px solid rgba(0, 0, 0, 0.3)',
//           borderRadius: '0',
//           backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
//           backgroundSize: 'cover',
//           backgroundRepeat: 'no-repeat',
//           //backgroundPosition: 'center',
//           backgroundPosition: 'center',
//         }} >


//           <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', color: 'white' }} > <FontAwesomeIcon
//             icon={faAdd}
//             style={{
//               marginRight: '8px',
//               color: 'white', // Set the color to golden
//             }}
//           /> Add Equipment</h5>



//         </ModalHeader>
//         <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >

//           <Row>
//             <Col md={4}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Vendor
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="select"
//                   id="selectVendor"
//                   name='selectVendor'
//                   value={selectVendor}
//                   onChange={(e) => setSelectVendor(e.target.value)}

//                 >
//                   <option value="">Select Vendor</option>

//                   <option value={getVendor.partyId}>{getVendor.partyName}</option>


//                 </Input>


//               </FormGroup>
//             </Col>
//             <Col md={8}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Equipment
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="select"
//                   id="selectEquipmend"
//                   name='selectEquipmend'
//                   value={selectEquipmend}
//                   onChange={(e) => setSelectEquipmend(e.target.value)}

//                 >
//                   <option value="">Select Equipment</option>
//                   {getEquipment.map((item, index) => (
//                     <option key={index} value={item.jarDtlId}>{item.jarDtlDesc}</option>
//                   ))}

//                 </Input>

//               </FormGroup>
//             </Col>
//           </Row>
//           <hr />
//           <Row>
//             <Col className='text-center'>
//               <button
//                 className="btn btn-outline-primary btn-margin newButton"
//                 style={{ marginRight: 10 }}
//                 id="submitbtn2"
//                 onClick={() => handleContainerSaveEquipment(selectVendor, selectEquipmend)}
//               >
//                 <FontAwesomeIcon icon={faSave} style={{ marginRight: 5 }} />
//                 Save

//               </button>
//               <button
//                 className="btn btn-outline-danger btn-margin newButton"
//                 style={{ marginRight: 10 }}
//                 id="submitbtn2"
//                 onClick={handleContainerEquipmentClear}

//               >
//                 <FontAwesomeIcon icon={faRefresh} style={{ marginRight: 5 }} />
//                 Clear
//               </button>



//             </Col>
//           </Row>

//           <div className="mt-3 table-responsive">
//             <table className="table table-bordered table-hover tableHeader">
//               <thead className="tableHeader">
//                 <tr>

//                   <th scope="col">Sr No</th>
//                   <th scope="col">Container No</th>
//                   <th scope="col">Container Size</th>
//                   <th scope="col">Container Type</th>

//                   <th scope="col">Status</th>

//                 </tr>
//               </thead>
//               <tbody>

//                 <tr >

//                   <td>1</td>
//                   <td>{stuffTally.containerNo}</td>
//                   <td>{stuffTally.containerSize}</td>
//                   <td>{stuffTally.containerType}</td>

//                   <td>A</td>

//                 </tr>

//               </tbody>
//             </table>
//           </div>
//           <div className="mt-3 table-responsive ">
//             <table className="table table-bordered table-hover tableHeader">
//               <thead className='tableHeader'>
//                 <tr>

//                   <th scope="col">Sr No</th>
//                   <th scope="col">Equipment</th>
//                   <th scope="col">Vendor</th>

//                   <th scope="col">Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {conEquipmentData.map((item, index) => (
//                   <tr
//                     key={index}

//                   >
//                     <td>{index + 1}</td>
//                     <td>{item[0]}</td>
//                     <td>{item[1]}</td>

//                     <td>
//                       <button
//                         className="btn btn-outline-danger btn-margin newButton"
//                         style={{ marginRight: 10 }}
//                         id="submitbtn2"
//                         onClick={() => deleteContainerEquipments(item[2], item[3], item[4])}

//                       >
//                         <FontAwesomeIcon icon={faTrash} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}

//               </tbody>
//             </table>

//           </div>
//         </ModalBody>
//       </Modal>
//       <Modal Modal isOpen={isModalOpenForSearchGateInData} onClose={closeGateInModal} toggle={closeGateInModal} style={{ maxWidth: '1200px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

//         <ModalHeader toggle={closeGateInModal} style={{
//           backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
//           boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
//           border: '1px solid rgba(0, 0, 0, 0.3)',
//           borderRadius: '0',
//           backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
//           backgroundSize: 'cover',
//           backgroundRepeat: 'no-repeat',
//           //backgroundPosition: 'center',
//           backgroundPosition: 'center',
//         }} >


//           <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', color: 'white' }} > <FontAwesomeIcon
//             icon={faSearch}
//             style={{
//               marginRight: '8px',
//               color: 'white', // Set the color to golden
//             }}
//           /> Search Stuff Tally Data</h5>



//         </ModalHeader>
//         <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
//           <Row>
//             <Col md={4}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Search by Stuff Tally Id / Container No
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="searchId"
//                   name='searchId'
//                   value={searchId}
//                   onChange={(e) => setSearchId(e.target.value)}
//                 />

//               </FormGroup>
//             </Col>
//             <Col md={4} style={{ marginTop: 20 }}>
//               <button
//                 className="btn btn-outline-primary btn-margin newButton"
//                 style={{ marginRight: 10, fontSize: 12 }}
//                 id="submitbtn2"
//                 onClick={() => searchExportEmptyContainerGateIn(searchId)}

//               >
//                 <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
//                 Search
//               </button>
//               <button
//                 className="btn btn-outline-danger btn-margin newButton"
//                 style={{ marginRight: 10, fontSize: 12 }}
//                 id="submitbtn2"
//                 onClick={handleSearchClear}
//               >
//                 <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
//                 Reset
//               </button>
//             </Col>
//           </Row>
//           <hr />

//           <div className="mt-1 table-responsive ">
//             <table className="table table-bordered table-hover tableHeader">
//               <thead className='tableHeader'>
//                 <tr>
//                   <th scope="col">#</th>
//                   <th scope="col">Stuff Tally Id</th>
//                   <th scope="col">Stuff Tally Date</th>
//                   <th scope="col">Container No</th>

//                 </tr>
//                 <tr className='text-center'>
//                   <th scope="col"></th>
//                   <th scope="col">{gateInSearchData.length}</th>
//                   <th scope="col"></th>
//                   <th scope="col"></th>

//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems.map((item, index) => (
//                   <tr key={index}>
//                     <td>
//                       <input type="radio" name="radioGroup" onChange={() => getSelectedTallyData(item[0])} value={item[0]} />
//                     </td>
//                     <td>{item[0]}</td>
//                     <td>{item[1]}</td>
//                     <td>{item[2]}</td>

//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
//               <Pagination.First onClick={() => handlePageChange(1)} />
//               <Pagination.Prev
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//               />
//               <Pagination.Ellipsis />

//               {displayPages().map((pageNumber) => (
//                 <Pagination.Item
//                   key={pageNumber}
//                   active={pageNumber === currentPage}
//                   onClick={() => handlePageChange(pageNumber)}
//                 >
//                   {pageNumber}
//                 </Pagination.Item>
//               ))}

//               <Pagination.Ellipsis />
//               <Pagination.Next
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//               />
//               <Pagination.Last onClick={() => handlePageChange(totalPages)} />
//             </Pagination>
//           </div>
//         </ModalBody>
//       </Modal>

//       <div>


//         <Row>
//           <Col md={2}>





















//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Stuff Tally Id
//               </label>
//               <Row>
//                 <Col md={9}>
//                   <Input
//                     className="form-control"
//                     type="text"
//                     id="stuffTallyId"
//                     name='stuffTallyId'
//                     value={stuffTally.stuffTallyId}
//                     onChange={(e) => handleStuffTallyChange(e)}
//                     disabled
//                   />
//                 </Col>

//                 <Col md={3} className="d-flex justify-content-end">
//                   <button
//                     className="btn btn-outline-primary btn-margin newButton"
//                     style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//                     id="submitbtn2"
//                     onClick={openGateInModal}
//                   >
//                     <FontAwesomeIcon icon={faSearch} size="sm" s />
//                   </button>
//                 </Col>

//                 {/* 
//                 <Col md={3}>
//                   <button
//                     className="btn btn-outline-primary btn-margin newButton"
//                     style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//                     id="submitbtn2"
//                     onClick={openGateInModal}
//                   >
//                     <FontAwesomeIcon icon={faSearch} size="sm" s />
//                   </button>
//                 </Col> */}
//               </Row>
//             </FormGroup>











//           </Col>














//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Stuff Tally Date
//               </label>
//               <div style={{ position: 'relative' }}>
//                 <DatePicker
//                   selected={stuffTally.stuffTallyDate}
//                   name='stuffTallyDate'
//                   id="stuffTallyDate"
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
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Stuff Mode
//               </label>
//               <Input
//                 className="form-control"
//                 type="select"
//                 id="stuffMode"
//                 name='stuffMode'
//                 value={stuffTally.stuffMode}
//                 onChange={(e) => handleStuffTallyChange(e)}
//               >


//                 <option value="Normal">Normal</option>

//                 <option value="Direct Stuff">Direct Stuff</option>

//                 <option value="Cross Stuffing">Cross Stuffing</option>

//                 <option value="Inter CFS Movement">Inter CFS Movement</option>

//               </Input>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Profitcentre Id
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="profitcentreId"
//                 name='profitcentreId'
//                 value={stuffTally.profitcentreId}
//                 onChange={(e) => handleStuffTallyChange(e)}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Status
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="status"
//                 name='status'
//                 value={stuffTally.status === 'A' ? 'Approved' : ''}
//                 onChange={(e) => handleStuffTallyChange(e)}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Created By
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="createdBy"
//                 name='createdBy'
//                 value={stuffTally.createdBy}
//                 onChange={(e) => handleStuffTallyChange(e)}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//         </Row>
//         <Row>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Stuff Id <span style={{ color: 'red' }}>*</span>
//               </label>
//               <Select
//                 value={{ value: stuffTally.stuffId, label: stuffTally.stuffId }}
//                 onChange={handleStuffReqIdSelect}
//                 onInputChange={searchStuffreqIdData}
//                 options={stuffReqData}
//                 placeholder="Select Stuff Id"
//                 isClearable
//                 id="stuffId"
//                 name='stuffId'
//                 className={`autocompleteHeight ${formErrors.stuffId ? 'error-border' : ''}`}
//                styles={{
//           control: (provided, state) => ({
//             ...provided,
//             height: 32,  // Set the height of the select input
//             minHeight: 32,
//             border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
//             // display: 'flex',
//             // alignItems: 'center',  // Vertically center the content
//             // padding: '0 10px',     // Ensure padding is consistent
//             // borderRadius: '6px',
//             // width: '100%',
//             // boxSizing: 'border-box',
//             // position: 'relative',  // Ensure positioning doesn't cause layout issues
//           }),

//           valueContainer: (provided) => ({
//             ...provided,
//             // display: 'flex',
//             alignItems: 'center',  // Vertically center the text
//             padding: '0 8px',
//             height: '100%',
//             whiteSpace: 'nowrap',
//             textOverflow: 'ellipsis',
//             lineHeight: '28px',
//             maxWidth: 'calc(100% - 20px)',
//             position: 'relative',
//             overflow: 'visible',
//           }),

//           input: (provided) => ({
//             ...provided,
//             width: '100%',
//             overflow: 'hidden',
//             textOverflow: 'ellipsis',
//             whiteSpace: 'nowrap',
//             outline: 'none', // Avoid outline clashes
//           }),

//           singleValue: (provided) => ({
//             ...provided,
//             lineHeight: '32px',
//             overflow: 'hidden',
//             whiteSpace: 'nowrap',
//             textOverflow: 'ellipsis',
//           }),

//           clearIndicator: (provided) => ({
//             ...provided,
//             padding: 2,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             position: 'absolute',
//             right: 5,
//             top: '50%',
//             transform: 'translateY(-50%)', // Vertically center the clear indicator
//           }),

//           indicatorSeparator: () => ({
//             display: 'none', // Remove the separator between indicators
//           }),

//           dropdownIndicator: () => ({
//             display: 'none', // Remove the dropdown arrow
//           }),

//           placeholder: (provided) => ({
//             ...provided,
//             lineHeight: '32px',
//             color: 'gray',
//           }),
//         }}
//               />
//               <div style={{ color: 'red' }} className="error-message">{formErrors.stuffId}</div>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Stuff Date
//               </label>
//               <div style={{ position: 'relative' }}>
//                 <DatePicker
//                   selected={stuffTally.stuffDate}
//                   name='stuffDate'
//                   id="stuffDate"
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
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Shift
//               </label>
//               <Input
//                 className="form-control"
//                 type="select"
//                 id="shift"
//                 name='shift'
//                 value={stuffTally.shift}
//                 onChange={(e) => handleStuffTallyChange(e)}
//               >

//                 <option value="Day">Day	</option>

//                 <option value="Second">Second</option>

//                 <option value="Third">Third</option>

//               </Input>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Shipping Agent
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="shippingAgent"
//                 name='shippingAgent'
//                 value={stuffTally.shippingAgent}
//                 onChange={(e) => handleStuffTallyChange(e)}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Shipping Line
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="shippingLine"
//                 name='shippingLine'
//                 value={stuffTally.shippingLine}
//                 onChange={(e) => handleStuffTallyChange(e)}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Cargo Weight
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="totalGrossWeight"
//                 name='totalGrossWeight'
//                 value={stuffTallyDtl.reduce((total, item) => total + (item.cargoWeight ? parseFloat(item.cargoWeight) : 0), 0)}
//                 disabled
//                 onChange={(e) => handleStuffTallyChange(e, 6, 4)}
//               />
//             </FormGroup>
//           </Col>
//         </Row>
//         <Row>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Agent Seal No <span style={{ color: 'red' }}>*</span>
//               </label>
//               <Input
//                 className={`form-control ${formErrors.agentSealNo ? 'error-border' : ''}`}
//                 type="text"
//                 id="agentSealNo"
//                 name='agentSealNo'
//                 value={stuffTally.agentSealNo}
//                 maxLength={15}
//                 onChange={(e) => handleStuffTallyChange(e)}
//               />
//               <div style={{ color: 'red' }} className="error-message">{formErrors.agentSealNo}</div>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Customs Seal No  <span style={{ color: 'red' }}>*</span>
//               </label>
//               <Input
//                 className={`form-control ${formErrors.customsSealNo ? 'error-border' : ''}`}
//                 type="text"
//                 id="customsSealNo"
//                 name='customsSealNo'
//                 maxLength={15}
//                 value={stuffTally.customsSealNo}
//                 onChange={(e) => handleStuffTallyChange(e)}
//               />
//               <div style={{ color: 'red' }} className="error-message">{formErrors.customsSealNo}</div>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Container Status
//               </label>
//               <Input
//                 className="form-control"
//                 type="select"
//                 id="containerStatus"
//                 name='containerStatus'
//                 value={stuffTally.containerStatus}
//                 onChange={(e) => handleStuffTallyChange(e)}
//               >
//                 <option value="FCL">FCL</option>
//                 <option value="LCL">LCL</option>

//               </Input>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Vessel  <span style={{ color: 'red' }}>*</span>
//               </label>
//               <Input
//                 className={`form-control ${formErrors.vesselName ? 'error-border' : ''}`}
//                 type="text"
//                 id="vesselName"
//                 name='vesselName'
//                 maxLength={50}
//                 value={stuffTally.vesselName}
//                 onChange={(e) => handleStuffTallyChange(e)}
//               />
//               <div style={{ color: 'red' }} className="error-message">{formErrors.vesselName}</div>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Voyage No  <span style={{ color: 'red' }}>*</span>
//               </label>
//               <CreatableSelect
//                 value={{ value: stuffTally.voyageNo, label: stuffTally.voyageNo }}
//                 onChange={handleVoyageSelect}
//                 onInputChange={searchVoyageAndVia}
//                 options={vesselData}
//                 onCreateOption={(inputValue) => {

//                   setStuffTally({
//                     ...stuffTally,
//                     voyageNo: inputValue.slice(0, 10) // Assign the value to transporterName as well
//                   });
//                   setFormErrors({
//                     ...formErrors,
//                     voyageNo: ''
//                   });

//                 }}
//                 placeholder="Select Voyage No"
//                 isClearable
//                 id="voyageNo"
//                 name='voyageNo'
//                 className={`autocompleteHeight ${formErrors.voyageNo ? 'error-border' : ''}`}
//                styles={{
//           control: (provided, state) => ({
//             ...provided,
//             height: 32,  // Set the height of the select input
//             minHeight: 32,
//             border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
//             // display: 'flex',
//             // alignItems: 'center',  // Vertically center the content
//             // padding: '0 10px',     // Ensure padding is consistent
//             // borderRadius: '6px',
//             // width: '100%',
//             // boxSizing: 'border-box',
//             // position: 'relative',  // Ensure positioning doesn't cause layout issues
//           }),

//           valueContainer: (provided) => ({
//             ...provided,
//             // display: 'flex',
//             alignItems: 'center',  // Vertically center the text
//             padding: '0 8px',
//             height: '100%',
//             whiteSpace: 'nowrap',
//             textOverflow: 'ellipsis',
//             lineHeight: '28px',
//             maxWidth: 'calc(100% - 20px)',
//             position: 'relative',
//             overflow: 'visible',
//           }),

//           input: (provided) => ({
//             ...provided,
//             width: '100%',
//             overflow: 'hidden',
//             textOverflow: 'ellipsis',
//             whiteSpace: 'nowrap',
//             outline: 'none', // Avoid outline clashes
//           }),

//           singleValue: (provided) => ({
//             ...provided,
//             lineHeight: '32px',
//             overflow: 'hidden',
//             whiteSpace: 'nowrap',
//             textOverflow: 'ellipsis',
//           }),

//           clearIndicator: (provided) => ({
//             ...provided,
//             padding: 2,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             position: 'absolute',
//             right: 5,
//             top: '50%',
//             transform: 'translateY(-50%)', // Vertically center the clear indicator
//           }),

//           indicatorSeparator: () => ({
//             display: 'none', // Remove the separator between indicators
//           }),

//           dropdownIndicator: () => ({
//             display: 'none', // Remove the dropdown arrow
//           }),

//           placeholder: (provided) => ({
//             ...provided,
//             lineHeight: '32px',
//             color: 'gray',
//           }),
//         }}
//               />
//               <div style={{ color: 'red' }} className="error-message">{formErrors.voyageNo}</div>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Via No
//               </label>
//               <CreatableSelect
//                 value={{ value: stuffTally.viaNo, label: stuffTally.viaNo }}
//                 onChange={handleVoyageSelect}
//                 onInputChange={searchVoyageAndVia}
//                 options={vesselData}
//                 placeholder="Select Via No"
//                 onCreateOption={(inputValue) => {

//                   setStuffTally({
//                     ...stuffTally,
//                     viaNo: inputValue.slice(0, 10) // Assign the value to transporterName as well
//                   });

//                 }}
//                 isClearable
//                 id="viaNo"
//                 name='viaNo'
//                 className={`autocompleteHeight `}
//                styles={{
//           control: (provided, state) => ({
//             ...provided,
//             height: 32,  // Set the height of the select input
//             minHeight: 32,
//             border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
//             // display: 'flex',
//             // alignItems: 'center',  // Vertically center the content
//             // padding: '0 10px',     // Ensure padding is consistent
//             // borderRadius: '6px',
//             // width: '100%',
//             // boxSizing: 'border-box',
//             // position: 'relative',  // Ensure positioning doesn't cause layout issues
//           }),

//           valueContainer: (provided) => ({
//             ...provided,
//             // display: 'flex',
//             alignItems: 'center',  // Vertically center the text
//             padding: '0 8px',
//             height: '100%',
//             whiteSpace: 'nowrap',
//             textOverflow: 'ellipsis',
//             lineHeight: '28px',
//             maxWidth: 'calc(100% - 20px)',
//             position: 'relative',
//             overflow: 'visible',
//           }),

//           input: (provided) => ({
//             ...provided,
//             width: '100%',
//             overflow: 'hidden',
//             textOverflow: 'ellipsis',
//             whiteSpace: 'nowrap',
//             outline: 'none', // Avoid outline clashes
//           }),

//           singleValue: (provided) => ({
//             ...provided,
//             lineHeight: '32px',
//             overflow: 'hidden',
//             whiteSpace: 'nowrap',
//             textOverflow: 'ellipsis',
//           }),

//           clearIndicator: (provided) => ({
//             ...provided,
//             padding: 2,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             position: 'absolute',
//             right: 5,
//             top: '50%',
//             transform: 'translateY(-50%)', // Vertically center the clear indicator
//           }),

//           indicatorSeparator: () => ({
//             display: 'none', // Remove the separator between indicators
//           }),

//           dropdownIndicator: () => ({
//             display: 'none', // Remove the dropdown arrow
//           }),

//           placeholder: (provided) => ({
//             ...provided,
//             lineHeight: '32px',
//             color: 'gray',
//           }),
//         }}
//               />
//             </FormGroup>
//           </Col>
//         </Row>
//         <Row>
//           {/* <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Terminal Name  <span style={{ color: 'red' }}>*</span>
//               </label>
//               <Input
//                 className={`form-control ${formErrors.terminal ? 'error-border' : ''}`}
//                 type="text"
//                 id="terminal"
//                 name='terminal'
//                 maxLength={10}
//                 value={stuffTally.terminal}
//                 onChange={(e) => handleStuffTallyChange(e)}
//               />
//               <div style={{ color: 'red' }} className="error-message">{formErrors.terminal}</div>
//             </FormGroup>
//           </Col> */}


//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//               Terminal Name <span className="error-message">*</span>
//               </label>
//               <CreatableSelect
//                 value={selectedTerminal}
//                 onChange={(selectedOption) => handlePODChange(selectedOption, 'terminal')}
//                 options={terminalData}
//                 placeholder="Select Terminal"
//                 onInputChange={(inputValue, { action }) => {
//                   if (action === 'input-change') {
//                     searchPortData(inputValue, 'terminal');
//                   }
//                 }}
//                 onCreateOption={(inputValue) => {
//                   const maxLength = 50;
//                   const truncatedInputValue = inputValue.slice(0, maxLength);
//                   handleCreationPODSelect(truncatedInputValue, 'terminal') }}
//                 isClearable
//                 id="terminal"
//                 name='terminal'
//                 className={`${formErrors.terminal ? 'error-border' : ''}`}
//                 styles={{
//                   control: (provided, state) => ({
//                     ...provided,
//                     height: 32,  // Set the height of the select input
//                     minHeight: 32,
//                     border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
//                   }),

//                   valueContainer: (provided) => ({
//                     ...provided,
//                     // display: 'flex',
//                     alignItems: 'center',  // Vertically center the text
//                     padding: '0 8px',
//                     height: '100%',
//                     whiteSpace: 'nowrap',
//                     textOverflow: 'ellipsis',
//                     lineHeight: '28px',
//                     maxWidth: 'calc(100% - 20px)',
//                     position: 'relative',
//                     overflow: 'visible',
//                   }),

//                   input: (provided) => ({
//                     ...provided,
//                     width: '100%',
//                     overflow: 'hidden',
//                     textOverflow: 'ellipsis',
//                     whiteSpace: 'nowrap',
//                     outline: 'none', // Avoid outline clashes
//                   }),

//                   singleValue: (provided) => ({
//                     ...provided,
//                     lineHeight: '32px',
//                     overflow: 'hidden',
//                     whiteSpace: 'nowrap',
//                     textOverflow: 'ellipsis',
//                   }),

//                   clearIndicator: (provided) => ({
//                     ...provided,
//                     padding: 2,
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     position: 'absolute',
//                     right: 5,
//                     top: '50%',
//                     transform: 'translateY(-50%)', // Vertically center the clear indicator
//                   }),

//                   indicatorSeparator: () => ({
//                     display: 'none', // Remove the separator between indicators
//                   }),

//                   dropdownIndicator: () => ({
//                     display: 'none', // Remove the dropdown arrow
//                   }),

//                   placeholder: (provided) => ({
//                     ...provided,
//                     lineHeight: '32px',
//                     color: 'gray',
//                   }),
//                 }}
//               />
//               <div style={{ color: 'red' }} className="error-message">{formErrors.terminal}</div>
//             </FormGroup>
//           </Col>



//           {/* <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Port Of Discharge  <span style={{ color: 'red' }}>*</span>
//               </label>
//               <Input
//                 className={`form-control ${formErrors.pod ? 'error-border' : ''}`}
//                 type="text"
//                 id="pod"
//                 name='pod'
//                 value={stuffTally.pod}
//                 onChange={(e) => handleStuffTallyChange(e)}
//                 maxLength={100}
//               />
//               <div style={{ color: 'red' }} className="error-message">{formErrors.pod}</div>
//             </FormGroup>
//           </Col> */}



//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 POD <span className="error-message">*</span>
//               </label>
//               <CreatableSelect
//                 value={selectedPod}
//                 onChange={(selectedOption) => handlePODChange(selectedOption, 'pod')}
//                 options={podData}
//                 placeholder="Select POD"
//                 onInputChange={(inputValue, { action }) => {
//                   if (action === 'input-change') {
//                     searchPortData(inputValue, 'pod');
//                   }
//                 }}
//                 onCreateOption={(inputValue) => { 
//                   const maxLength = 50;
//                   const truncatedInputValue = inputValue.slice(0, maxLength);
//                   handleCreationPODSelect(truncatedInputValue, 'pod') }}
//                 isClearable
//                 id="pod"
//                 name='pod'
//                 className={`${formErrors.pod ? 'error-border' : ''}`}
//                 styles={{
//                   control: (provided, state) => ({
//                     ...provided,
//                     height: 32,  // Set the height of the select input
//                     minHeight: 32,
//                     border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
//                   }),

//                   valueContainer: (provided) => ({
//                     ...provided,
//                     // display: 'flex',
//                     alignItems: 'center',  // Vertically center the text
//                     padding: '0 8px',
//                     height: '100%',
//                     whiteSpace: 'nowrap',
//                     textOverflow: 'ellipsis',
//                     lineHeight: '28px',
//                     maxWidth: 'calc(100% - 20px)',
//                     position: 'relative',
//                     overflow: 'visible',
//                   }),

//                   input: (provided) => ({
//                     ...provided,
//                     width: '100%',
//                     overflow: 'hidden',
//                     textOverflow: 'ellipsis',
//                     whiteSpace: 'nowrap',
//                     outline: 'none', // Avoid outline clashes
//                   }),

//                   singleValue: (provided) => ({
//                     ...provided,
//                     lineHeight: '32px',
//                     overflow: 'hidden',
//                     whiteSpace: 'nowrap',
//                     textOverflow: 'ellipsis',
//                   }),

//                   clearIndicator: (provided) => ({
//                     ...provided,
//                     padding: 2,
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     position: 'absolute',
//                     right: 5,
//                     top: '50%',
//                     transform: 'translateY(-50%)', // Vertically center the clear indicator
//                   }),

//                   indicatorSeparator: () => ({
//                     display: 'none', // Remove the separator between indicators
//                   }),

//                   dropdownIndicator: () => ({
//                     display: 'none', // Remove the dropdown arrow
//                   }),

//                   placeholder: (provided) => ({
//                     ...provided,
//                     lineHeight: '32px',
//                     color: 'gray',
//                   }),
//                 }}
//               />
//               <div style={{ color: 'red' }} className="error-message">{formErrors.pod}</div>
//             </FormGroup>
//           </Col>


//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Container Health
//               </label>
//               <Input
//                 className="form-control"
//                 type="select"
//                 id="containerCondition"
//                 name='containerCondition'
//                 value={stuffTally.containerCondition}
//                 onChange={(e) => handleStuffTallyChange(e)}
//               >
//                 <option value="" selected="">	</option>

//                 <option value="HDEMAG">Heavy Damage</option>

//                 <option value="LDEMAG">Light Damage</option>

//                 <option value="MDEMAG">Medium Damage</option>

//                 <option value="OK">Healthy</option>
//               </Input>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Container No
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="containerNo"
//                 name='containerNo'
//                 value={stuffTally.containerNo}
//                 onChange={(e) => handleStuffTallyChange(e)}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Type Size
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="containerSize"
//                 name='containerSize'
//                 value={stuffTally.containerSize + stuffTally.containerType}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Container Tare Wt  <span style={{ color: 'red' }}>*</span>
//               </label>
//               <Input
//                 className={`form-control ${formErrors.tareWeight ? 'error-border' : ''}`}
//                 type="text"
//                 id="tareWeight"
//                 name='tareWeight'
//                 value={stuffTally.tareWeight}
//                 onChange={(e) => handleStuffTallyChange(e, 12, 3)}
//               />
//               <div style={{ color: 'red' }} className="error-message">{formErrors.tareWeight}</div>
//             </FormGroup>
//           </Col>
//         </Row>
//         <Row>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Do No
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="deliveryOrderNo"
//                 name='deliveryOrderNo'
//                 value={stuffTally.deliveryOrderNo}
//                 maxLength={35}
//                 disabled
//               />
//             </FormGroup>
//           </Col>



//           {/* <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Final POD  <span style={{ color: 'red' }}>*</span>
//               </label>
//               <Input
//                 className={`form-control ${formErrors.finalPod ? 'error-border' : ''}`}
//                 type="text"
//                 id="finalPod"
//                 name='finalPod'
//                 value={stuffTally.finalPod}
//                 maxLength={40}
//                 onChange={(e) => handleStuffTallyChange(e)}
//               />
//               <div style={{ color: 'red' }} className="error-message">{formErrors.finalPod}</div>
//             </FormGroup>
//           </Col> */}



//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Final POD <span className="error-message">*</span>
//               </label>
//               <CreatableSelect
//                 value={selectedFinalPod}
//                 onChange={(selectedOption) => handlePODChange(selectedOption, 'finalPod')}
//                 options={finalPodData}
//                 placeholder="Select FinalPod"
//                 onInputChange={(inputValue, { action }) => {
//                   if (action === 'input-change') {
//                     searchPortData(inputValue, 'finalPod');
//                   }
//                 }}
//                 onCreateOption={(inputValue) => { 
//                   const maxLength = 50;
//                   const truncatedInputValue = inputValue.slice(0, maxLength);
//                   handleCreationPODSelect(truncatedInputValue, 'finalPod') }}
//                 isClearable
//                 id="finalPod"
//                 name='finalPod'
//                 className={`${formErrors.finalPod ? 'error-border' : ''}`}
//                 styles={{
//                   control: (provided, state) => ({
//                     ...provided,
//                     height: 32,  // Set the height of the select input
//                     minHeight: 32,
//                     border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
//                   }),

//                   valueContainer: (provided) => ({
//                     ...provided,
//                     // display: 'flex',
//                     alignItems: 'center',  // Vertically center the text
//                     padding: '0 8px',
//                     height: '100%',
//                     whiteSpace: 'nowrap',
//                     textOverflow: 'ellipsis',
//                     lineHeight: '28px',
//                     maxWidth: 'calc(100% - 20px)',
//                     position: 'relative',
//                     overflow: 'visible',
//                   }),

//                   input: (provided) => ({
//                     ...provided,
//                     width: '100%',
//                     overflow: 'hidden',
//                     textOverflow: 'ellipsis',
//                     whiteSpace: 'nowrap',
//                     outline: 'none', // Avoid outline clashes
//                   }),

//                   singleValue: (provided) => ({
//                     ...provided,
//                     lineHeight: '32px',
//                     overflow: 'hidden',
//                     whiteSpace: 'nowrap',
//                     textOverflow: 'ellipsis',
//                   }),

//                   clearIndicator: (provided) => ({
//                     ...provided,
//                     padding: 2,
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     position: 'absolute',
//                     right: 5,
//                     top: '50%',
//                     transform: 'translateY(-50%)', // Vertically center the clear indicator
//                   }),

//                   indicatorSeparator: () => ({
//                     display: 'none', // Remove the separator between indicators
//                   }),

//                   dropdownIndicator: () => ({
//                     display: 'none', // Remove the dropdown arrow
//                   }),

//                   placeholder: (provided) => ({
//                     ...provided,
//                     lineHeight: '32px',
//                     color: 'gray',
//                   }),
//                 }}
//               />
//               <div style={{ color: 'red' }} className="error-message">{formErrors.finalPod}</div>
//             </FormGroup>
//           </Col>




//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Period From
//               </label>
//               <div style={{ position: 'relative' }}>
//                 <DatePicker
//                   selected={stuffTally.periodFrom}
//                   name='periodFrom'
//                   id="periodFrom"
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
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 CHA
//               </label>
//               <Select
//                 value={{ value: stuffTally.cha, label: chaName }}
//                 onChange={handleChaSelect}
//                 onInputChange={handleCHAList}
//                 options={chaList}
//                 placeholder="Select CHA"
//                 isClearable
//                 id="cha"
//                 name='cha'
//                 className={`autocompleteHeight `}
//                styles={{
//           control: (provided, state) => ({
//             ...provided,
//             height: 32,  // Set the height of the select input
//             minHeight: 32,
//             border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
//             // display: 'flex',
//             // alignItems: 'center',  // Vertically center the content
//             // padding: '0 10px',     // Ensure padding is consistent
//             // borderRadius: '6px',
//             // width: '100%',
//             // boxSizing: 'border-box',
//             // position: 'relative',  // Ensure positioning doesn't cause layout issues
//           }),

//           valueContainer: (provided) => ({
//             ...provided,
//             // display: 'flex',
//             alignItems: 'center',  // Vertically center the text
//             padding: '0 8px',
//             height: '100%',
//             whiteSpace: 'nowrap',
//             textOverflow: 'ellipsis',
//             lineHeight: '28px',
//             maxWidth: 'calc(100% - 20px)',
//             position: 'relative',
//             overflow: 'visible',
//           }),

//           input: (provided) => ({
//             ...provided,
//             width: '100%',
//             overflow: 'hidden',
//             textOverflow: 'ellipsis',
//             whiteSpace: 'nowrap',
//             outline: 'none', // Avoid outline clashes
//           }),

//           singleValue: (provided) => ({
//             ...provided,
//             lineHeight: '32px',
//             overflow: 'hidden',
//             whiteSpace: 'nowrap',
//             textOverflow: 'ellipsis',
//           }),

//           clearIndicator: (provided) => ({
//             ...provided,
//             padding: 2,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             position: 'absolute',
//             right: 5,
//             top: '50%',
//             transform: 'translateY(-50%)', // Vertically center the clear indicator
//           }),

//           indicatorSeparator: () => ({
//             display: 'none', // Remove the separator between indicators
//           }),

//           dropdownIndicator: () => ({
//             display: 'none', // Remove the dropdown arrow
//           }),

//           placeholder: (provided) => ({
//             ...provided,
//             lineHeight: '32px',
//             color: 'gray',
//           }),
//         }}
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Hazardous
//               </label>
//               <Input
//                 className="form-control"
//                 type="select"
//                 id="haz"
//                 name='haz'
//                 value={stuffTally.haz}
//                 onChange={(e) => handleStuffTallyChange(e)}
//               >
//                 <option value="N">No</option>
//                 <option value="Y">Yes</option>
//               </Input>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Seal Type
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="sealType"
//                 name='sealType'
//                 value={stuffTally.sealType}
//                 onChange={(e) => handleStuffTallyChange(e)}
//                 maxLength={5}
//               />
//             </FormGroup>
//           </Col>
//         </Row>
//         <Row>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Gen Set Required
//               </label>
//               <Input
//                 type="checkbox"
//                 name="genSetRequired"
//                 id="genSetRequired"
//                 className="form-control inputField"
//                 checked={stuffTally.genSetRequired === 'Y'}
//                 onChange={(e) => {
//                   setStuffTally((prev) => ({
//                     ...prev,
//                     genSetRequired: e.target.checked ? 'Y' : 'N' // Update the state to 'Y' or 'N' based on checkbox state
//                   }));
//                 }}
//                 style={{ height: 25 }}
//               />

//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Doc Type
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="docType"
//                 name='docType'
//                 value={stuffTally.docType}
//                 onChange={(e) => handleStuffTallyChange(e)}
//                 maxLength={5}
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Doc Number
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="docNo"
//                 name='docNo'
//                 value={stuffTally.docNo}
//                 onChange={(e) => handleStuffTallyChange(e)}
//                 maxLength={5}
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Rotation No
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="rotationNo"
//                 name='rotationNo'
//                 value={stuffTally.rotationNo}
//                 onChange={(e) => handleStuffTallyChange(e)}
//                 maxLength={10}
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Rotation Date
//               </label>
//               <div style={{ position: 'relative' }}>
//                 <DatePicker
//                   selected={stuffTally.rotationDate}
//                   onChange={(date) => {
//                     setStuffTally(prev => ({
//                       ...prev,
//                       rotationDate: date
//                     }))
//                   }}
//                   name='rotationDate'
//                   id="rotationDate"
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
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Terminal
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="terminal"
//                 name='terminal'
//                 value={stuffTally.terminal}
//                 maxLength={10}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//         </Row>
//         <Row>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Berthing Date
//               </label>
//               <div style={{ position: 'relative' }}>
//                 <DatePicker
//                   selected={stuffTally.berthingDate}
//                   onChange={(date) => {
//                     setStuffTally(prev => ({
//                       ...prev,
//                       berthingDate: date
//                     }))
//                   }}
//                   name='berthingDate'
//                   id="berthingDate"
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
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Gate Open Date
//               </label>
//               <div style={{ position: 'relative' }}>
//                 <DatePicker
//                   selected={stuffTally.gateOpenDate}
//                   onChange={(date) => {
//                     setStuffTally(prev => ({
//                       ...prev,
//                       gateOpenDate: date
//                     }))
//                   }}
//                   name='gateOpenDate'
//                   id="gateOpenDate"
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
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Job Order
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="stuffTallyWoTransId"
//                 disabled
//                 name='stuffTallyWoTransId'
//                 value={stuffTally.stuffTallyWoTransId}
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 JO Date
//               </label>
//               <div style={{ position: 'relative' }}>
//                 <DatePicker
//                   selected={stuffTally.stuffTallyCutWoTransDate}
//                   name='stuffTallyCutWoTransDate'
//                   id="stuffTallyCutWoTransDate"
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


//         </Row>
//         <Row className='text-center'>
//           <Col>
//             <button
//               className="btn btn-outline-primary btn-margin newButton"
//               style={{ marginRight: 10 }}
//               id="submitbtn2"
//               onClick={handleSave}
//             //    disabled={stuffTally.stuffTallyId !== ''}
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
//             <button
//               className="btn btn-outline-success btn-margin newButton"
//               style={{ marginRight: 10 }}
//               id="submitbtn2"
//               disabled={stuffTally.stuffTallyId === ''}
//               onClick={openContainerWiseModal}
//             >
//               <FontAwesomeIcon icon={faAdd} style={{ marginRight: 5 }} />
//               Add Equipment

//             </button>
//             <button
//               className="btn btn-outline-success btn-margin newButton"
//               style={{ marginRight: 10 }}
//               id="submitbtn2"
//               disabled={stuffTally.stuffTallyId === ''}
//               onClick={downloadContWiseStuffReport}
//             >
//               <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
//               Print Report
//             </button>
//           </Col>
//         </Row>

//         <div className="table-responsive mt-2">
//           <Table className="table table-bordered table-hover tableHeader">
//             <thead className="thead-dark bg-dark"  >
//               <tr>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Line No</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>SB Trans Id</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>SB No</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>SB Date</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Exporter</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Commodity</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Consignee</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>FOB</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Type Of Pkg</th>
//                 {/* <th scope="col" className="text-center" style={{ color: 'black' }}>Yard Pkgs</th> */}
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Area</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Stuff Req Qty</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Stuffed Qty <span style={{ color: 'red' }}>*</span></th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Area Released</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Balance</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Gross Wt <span style={{ color: 'red' }}>*</span></th>
//               </tr>
//             </thead>
//             <tbody>
//               {stuffTallyDtl.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.stuffTallyLineId}</td>
//                   <td>{item.sbTransId}</td>
//                   <td>{item.sbNo}</td>
//                   <td >
//                     <div style={{ position: 'relative', width: 150 }}>
//                       <DatePicker
//                         selected={item.sbDate}
//                         name='sbDate'
//                         id={`sbDate${index}`}
//                         dateFormat="dd/MM/yyyy"
//                         className="form-control"
//                         disabled
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
//                   <td>{item.exporterName}</td>
//                   <td>{item.commodity}</td>
//                   <td>{item.consignee}</td>
//                   <td>{item.fob}</td>
//                   <td >
//                     <Input
//                       className={`form-control ${errors[index]?.typeOfPackage ? 'error-border' : ''}`}
//                       type="select"
//                       id={`typeOfPackage${index}`}
//                       onChange={(e) => handleStuffTallyDtlChange(e, index)}
//                       name='typeOfPackage'
//                       value={item.typeOfPackage}
//                       style={{ width: 200 }}
//                     >
//                       <option value="">Selet Type Of Package</option>
//                       {packages.map((item, index) => (
//                         <option key={index} value={item[0]}>{item[1]}</option>
//                       ))}
//                     </Input>
//                   </td>
//                   {/* <td>{item.yardPackages}</td> */}
//                   <td>{item.cellAreaAllocated}</td>
//                   <td>{item.stuffRequestQty}</td>
//                   <td>
//                     <Input
//                       className={`form-control ${errors[index]?.stuffedQty ? 'error-border' : ''}`}
//                       type="text"
//                       id={`stuffedQty${index}`}
//                       name='stuffedQty'
//                       style={{ width: 150 }}
//                       value={item.stuffedQty}
//                       onChange={(e) => handleStuffTallyDtlChange(e, index, 8, 0)}
//                     />
//                   </td>
//                   <td>
//                     <Input
//                       className={`form-control ${errors[index]?.areaReleased ? 'error-border' : ''}`}
//                       type="text"
//                       style={{ width: 150 }}
//                       id={`areaReleased${index}`}
//                       name='areaReleased'
//                       value={item.areaReleased}
//                       disabled
//                       onChange={(e) => handleStuffTallyDtlChange(e, index, 5, 3)}
//                     />
//                   </td>
//                   <td>
//                     <Input
//                       className="form-control"
//                       type="text"
//                       style={{ width: 150 }}
//                       id={`balanceQty${index}`}
//                       name='balanceQty'
//                       value={item.stuffRequestQty < item.stuffedQty ? 0 : item.balanceQty}
//                       onChange={(e) => handleStuffTallyDtlChange(e, index, 8, 0)}
//                       disabled
//                     />
//                   </td>
//                   <td>
//                     <Input
//                       className={`form-control ${errors[index]?.cargoWeight ? 'error-border' : ''}`}
//                       type="text"
//                       style={{ width: 150 }}
//                       id={`cargoWeight${index}`}
//                       name='cargoWeight'
//                       value={item.cargoWeight}
//                       onChange={(e) => handleStuffTallyDtlChange(e, index, 12, 4)}
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>

//       </div>

//     </>
//   );
// }

// export default StuffingTallyCLP;












import AuthContext from '../Components/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import { Pagination } from 'react-bootstrap';
import Select from 'react-select';
import Swal from 'sweetalert2';
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
import { Button } from "react-bootstrap";
import useAxios from '../Components/useAxios';
import CFSService from '../service/CFSService';
import { toast } from 'react-toastify';
import ipaddress from "../Components/IpAddress";
import movementService from "../service/MovementService";
import CreatableSelect from 'react-select/creatable';
import { error } from 'jquery';

function StuffingTallyCLP({ searchData, resetFlag, updatePagesList }) {

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

  const axiosInstance = useAxios();
  const MovementService = new movementService(axiosInstance);

  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const processId = 'P00221';

  const foundRights = role !== 'ROLE_ADMIN' ? userRights.find(item => item.process_Id === processId) : null;
  const allowCreate = foundRights?.allow_Create === 'Y';
  const allowRead = foundRights?.allow_Read === 'Y';
  const allowEdit = foundRights?.allow_Update === 'Y';
  const allowDelete = foundRights?.allow_Delete === 'Y';



  useEffect(() => {
    if (searchData && searchData.activeTab === processId && searchData.stuffTallyId && searchData.containerNo) {
      getSelectedTallyData(searchData.stuffTallyId);
    }
  }, [searchData]);

  useEffect(() => {
    if (resetFlag) {
      handleClear();
    }
  }, [resetFlag]);


  const [stuffTally, setStuffTally] = useState({
    companyId: '',
    branchId: '',
    stuffTallyId: '',
    sbTransId: '',
    stuffTallyLineId: 0,
    profitcentreId: '',
    cartingTransId: '',
    sbLineId: '',
    cartingLineId: '',
    sbNo: '',
    stuffTallyDate: new Date(),
    stuffMode: 'Normal',
    status: '',
    createdBy: '',
    stuffId: '',
    stuffDate: null,
    shift: 'Day',
    shippingAgent: '',
    shippingLine: '',
    cargoWeight: '',
    agentSealNo: '',
    customsSealNo: '',
    containerStatus: 'FCL',
    vesselId: '',
    vesselName: '',
    voyageNo: '',
    viaNo: '',
    terminal: '',
    pol: '',
    containerCondition: '',
    containerNo: '',
    containerSize: '',
    containerType: '',
    tareWeight: '',
    yardLocation: '',
    yardBlock: '',
    blockCellNo: '',
    pod: '',
    finalPod: '',
    periodFrom: null,
    cha: '',
    haz: 'N',
    sealType: '',
    genSetRequired: 'N',
    docType: '',
    docNo: '',
    rotationNo: '',
    rotationDate: null,
    terminal: '',
    berthingDate: null,
    gateOpenDate: null,
    deliveryOrderNo: '',
    stuffTallyWoTransId: '',
    stuffTallyCutWoTransDate: null,
    length: '',
    weight: '',
    height: '',
    odcType: '',
    cargoType: ''
  })


  const [stuffTallyDtl, setStuffTallyDtl] = useState([{
    companyId: '',
    branchId: '',
    stuffTallyId: '',
    sbTransId: '',
    stuffTallyLineId: 0,
    profitcentreId: '',
    cartingTransId: '',
    sbLineId: '',
    cartingLineId: '',
    sbNo: '',
    sbDate: null,
    exporterName: '',
    commodity: '',
    consignee: '',
    fob: '',
    typeOfPackage: '',
    yardPackages: 0,
    cellAreaAllocated: 0,
    stuffRequestQty: 0,
    contStuffPackages: 0,
    stuffedQuantity: 0,
    areaReleased: 0,
    stuffedQty: 0,
    balanceQty: 0,
    balQty: 0,
    cargoWeight: 0,
    totalCargoWeight: 0,
    length: '',
    weight: '',
    height: '',
    odcType: '',
    cargoType: '',
    hsnCode: '',
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



  const handleStuffTallyChange = (e, val1, val2) => {
    const { name, value } = e.target;
    let sanitizeValue = value

    if (['tareWeight', 'cargoWeight', 'length', 'weight', 'height'].includes(name)) {
      sanitizeValue = handleInputChange(value, val1, val2)
    }

    setStuffTally(prevState => ({
      ...prevState,
      [name]: sanitizeValue
    }));

    setFormErrors(prevState => ({
      ...prevState,
      [name]: ''
    }));

  };

  const handleStuffTallyDtlChange = (e, index, val1, val2) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    // Sanitize input for specific fields
    if (['stuffedQty', 'balanceQty', 'cargoWeight', 'areaReleased'].includes(name)) {
      sanitizedValue = handleInputChange(value, val1, val2);
    }

    if (name === 'stuffedQty') {
      if (sanitizedValue === '') {
        setStuffTallyDtl(prevState => {
          const updatedData = [...prevState];
          updatedData[index] = {
            ...updatedData[index],
            areaReleased: '',
            cargoWeight: '',
            balanceQty: ''
          };
          return updatedData;
        });
      }
      console.log('balQty ' + stuffTallyDtl[index].balQty, ' ', stuffTally.stuffTallyId !== '' ? (((stuffTallyDtl[index].stuffRequestQty >= stuffTallyDtl[index].stuffedQuantity) ? stuffTallyDtl[index].stuffRequestQty : stuffTallyDtl[index].stuffedQuantity) + stuffTallyDtl[index].balQty) : stuffTallyDtl[index].stuffRequestQty);

      if (sanitizedValue > (stuffTally.stuffTallyId !== '' ? (stuffTallyDtl[index].stuffedQuantity + stuffTallyDtl[index].balQty) : stuffTallyDtl[index].stuffRequestQty)) {
        sanitizedValue = '';

        setStuffTallyDtl(prevState => {
          const updatedData = [...prevState];
          updatedData[index] = {
            ...updatedData[index],
            areaReleased: '',
            cargoWeight: '',
            balanceQty: ''
          };
          return updatedData;
        });
      }

      else {


        if (sanitizedValue > 0) {
          let area = (parseFloat(stuffTallyDtl[index].cellAreaAllocated) * parseFloat(sanitizedValue)) / parseFloat(stuffTallyDtl[index].stuffRequestQty)
          let gross = (parseFloat(stuffTallyDtl[index].totalCargoWeight) * parseFloat(sanitizedValue)) / parseFloat(stuffTallyDtl[index].stuffRequestQty)
          let bal = 0;

          if (parseFloat(sanitizedValue) <= parseFloat(stuffTallyDtl[index].stuffRequestQty)) {
            bal = parseFloat(stuffTallyDtl[index].stuffRequestQty) - parseFloat(sanitizedValue);
          }


          setStuffTallyDtl(prevState => {
            const updatedData = [...prevState];
            updatedData[index] = {
              ...updatedData[index],
              areaReleased: handleInputChange(area, 5, 3),
              cargoWeight: handleInputChange(gross, 12, 4),
              balanceQty: handleInputChange(bal, 8, 0),
            };
            return updatedData;
          });
          setErrors(prevErrors => {
            // Ensure prevErrors is an array
            const updatedErrors = Array.isArray(prevErrors) ? [...prevErrors] : [];

            if (updatedErrors[index]) {
              delete updatedErrors[index]['areaReleased'];
              delete updatedErrors[index]['cargoWeight'];

              // Remove the error object at the index if it's empty
              if (Object.keys(updatedErrors[index]).length === 0) {
                updatedErrors.splice(index, 1);
              }
            }

            return updatedErrors;
          });

        }

      }
    }

    // Update igmCrgData state
    setStuffTallyDtl(prevState => {
      const updatedData = [...prevState];
      updatedData[index] = {
        ...updatedData[index],
        [name]: sanitizedValue
      };
      return updatedData;
    });

    setErrors(prevErrors => {
      // Ensure prevErrors is an array
      const updatedErrors = Array.isArray(prevErrors) ? [...prevErrors] : [];

      if (updatedErrors[index]) {
        delete updatedErrors[index][name]; // Corrected field access

        // Remove the entry if there are no more errors for that index
        if (Object.keys(updatedErrors[index]).length === 0) {
          updatedErrors.splice(index, 1);
        }
      }

      return updatedErrors;
    });




  }

  const [packages, setpackages] = useState([]);
  const getTypeOfPack = () => {
    const id = 'J00060';
    axios.get(`${ipaddress}jardetail/getJarDetail?companyId=${companyid}&jarId=${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        setpackages(response.data);
      })
      .catch((error) => {

      })
  }


  const [hsnData, setHsnData] = useState([]);
  const getHsnData = () => {
    const id = 'J00071';
    axios.get(`${ipaddress}jardetail/getJarDetail?companyId=${companyid}&jarId=${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        setHsnData(response.data);
      })
      .catch((error) => {

      })
  }

  const [chaList, setChaList] = useState([]);
  const [chaName, setChaName] = useState('');

  const handleCHAList = (val) => {
    if (val === '') {
      setChaList([]);
      return;
    }

    axios.get(`${ipaddress}party/getCha1?cid=${companyid}&bid=${branchId}&val=${val}`, {
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
        setChaList(portOptions);
      })
      .catch((error) => {
        setChaList([]);
      })
  }

  const handleChaSelect = async (selectedOption, { action }) => {
    if (action === 'clear') {
      setStuffTally({
        ...stuffTally,
        cha: ''
      });
      setChaName('');
    }
    else {
      setStuffTally({
        ...stuffTally,
        cha: selectedOption.value,
      });
      setChaName(selectedOption.label);
    }

  }

  useEffect(() => {
    if (searchData && searchData.activeTab === 'P00221') {
      getTypeOfPack();
      getHsnData();
    }
  }, [searchData])

  const [vesselData, setVesselData] = useState([]);

  const searchVoyageAndVia = (id) => {


    if (id === '') {
      setVesselData([]);
      return;
    }

    axios.get(`${ipaddress}stuffTally/searchVoyage?cid=${companyid}&bid=${branchId}&search=${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {

        const data = response.data;



        const vesselOp = data.map(port => ({
          value: port.vesselCode,
          label: port.vesselName + '-' + port.voyageNo + '-' + port.viaNo,
          viaNo: port.viaNo,
          gateOpenDate: port.gateOpenDate,
          berthDate: port.berthDate,
          rotationNo: port.rotationNo,
          rotationNoDate: port.rotationNoDate,
          vesselName: port.vesselName,
          voyageNo: port.voyageNo
        }))

        setVesselData(vesselOp);
      })
      .catch((error) => {
        setVesselData([]);
      })
  }

  const handleVoyageSelect = async (selectedOption, { action }) => {
    if (action === 'clear') {
      setStuffTally({
        ...stuffTally,
        vesselId: '',
        voyageNo: '',
        viaNo: '',
        vesselName: ''
      });

    }
    else {
      setStuffTally({
        ...stuffTally,
        vesselId: selectedOption.value,
        voyageNo: selectedOption.voyageNo,
        viaNo: selectedOption.viaNo,
        vesselName: selectedOption.vesselName
      });

    }

  }

  const [stuffReqData, setStuffReqData] = useState([]);


  const searchStuffreqIdData = (id) => {

    if (id === '') {
      setStuffReqData([]);
      return;
    }

    axios.get(`${ipaddress}stuffTally/getDataByStuffId?cid=${companyid}&bid=${branchId}&search=${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {

        const data = response.data;

        console.log('data ', data);



        const d = data.map(port => ({
          value: port,
          label: port,
        }))

        setStuffReqData(d);
      })
      .catch((error) => {
        setStuffReqData([]);
      })
  }


  const handleStuffReqIdSelect = async (selectedOption, { action }) => {
    if (action === 'clear') {
      // setStuffTally({
      //   ...stuffTally,
      //   stuffId: '',
      // });

      handleClear();

    }
    else {
      getSelectedStuffReqData(selectedOption.value);

    }

  }

  const getSelectedStuffReqData = (id) => {
    setLoading(true);
    axios.get(`${ipaddress}stuffTally/getDataByStuffReqId?cid=${companyid}&bid=${branchId}&id=${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {

        console.log('reqdata ', response.data);

        const data = response.data;
        const reqdata = response.data.data;
        const singleData = reqdata[0];
        setChaName(data.cha[0][1]);

        setStuffTally({
          companyId: '',
          branchId: '',
          stuffTallyId: '',
          sbTransId: singleData.sbTransId || '',
          stuffTallyLineId: 0,
          profitcentreId: singleData.profitcentreId || '',
          cartingTransId: singleData.cartingTransId || '',
          sbLineId: singleData.sbLineId || '',
          cartingLineId: singleData.cartingLineId || '',
          sbNo: singleData.sbNo || '',
          stuffTallyDate: new Date(),
          stuffMode: 'Normal',
          status: '',
          createdBy: '',
          stuffId: singleData.stuffReqId || '',
          stuffDate: singleData.stuffReqDate === null ? null : new Date(singleData.stuffReqDate),
          shift: 'Day',
          shippingAgent: singleData.shippingAgent || '',
          shippingLine: singleData.shippingLine || '',
          cargoWeight: '',
          agentSealNo: singleData.agentSealNo || '',
          customsSealNo: '',
          containerStatus: 'FCL',
          vesselId: singleData.vesselId || '',
          vesselName: singleData.vesselName || '',
          voyageNo: singleData.voyageNo || '',
          viaNo: singleData.viaNo || '',
          terminal: singleData.terminal || '',
          pol: singleData.pol || '',
          containerCondition: singleData.containerHealth || '',
          containerNo: singleData.containerNo || '',
          containerSize: singleData.containerSize || '',
          containerType: singleData.containerType || '',
          tareWeight: singleData.tareWeight || '',
          yardLocation: singleData.yardLocation || '',
          yardBlock: singleData.yardBlock || '',
          blockCellNo: singleData.blockCellNo || '',
          pod: singleData.pod || '',
          finalPod: singleData.finalPod || '',
          periodFrom: singleData.periodFrom === null ? null : new Date(singleData.periodFrom),
          cha: data.cha[0][0] || '',
          haz: singleData.haz || '',
          sealType: singleData.sealType || '',
          genSetRequired: singleData.genSetRequired || 'N',
          docType: singleData.docType || '',
          docNo: singleData.docNo || '',
          rotationNo: singleData.rotationNo || '',
          rotationDate: singleData.rotationDate === null ? null : new Date(singleData.rotationDate),
          terminal: singleData.terminal || '',
          berthingDate: singleData.berthingDate === null ? null : new Date(singleData.berthingDate),
          gateOpenDate: singleData.gateOpenDate === null ? null : new Date(singleData.gateOpenDate),
          deliveryOrderNo: singleData.deliveryOrderNo || '',
          stuffTallyWoTransId: '',
          stuffTallyCutWoTransDate: null,
          totalGrossWeight: 0.00,
        });


        setSelectedFinalPod(singleData.finalPod ? { value: singleData.finalPod, label: singleData.finalPod } : null);
        setSelectedPod(singleData.pod ? { value: singleData.pod, label: singleData.pod } : null);
        setSelectedTerminal(singleData.terminal ? { value: singleData.terminal, label: singleData.terminal } : null);

        setStuffTallyDtl(reqdata.map((item) => ({
          companyId: '',
          branchId: '',
          stuffTallyId: '',
          sbTransId: item.sbTransId || '',
          stuffTallyLineId: item.stuffReqLineId || 0,
          profitcentreId: item.profitcentreId || '',
          cartingTransId: item.cartingTransId || '',
          sbLineId: item.sbLineNo || '',
          cartingLineId: item.cartingLineId || '',
          sbNo: item.sbNo || '',
          sbDate: item.sbDate === null ? null : new Date(item.sbDate),
          exporterName: item.exporterName || '',
          commodity: item.cargoDescription || '',
          consignee: item.consignee || '',
          fob: item.fob || '',
          typeOfPackage: item.typeOfPackage || '',
          stuffedQuantity: 0,
          yardPackages: item.yardPackages || 0,
          cellAreaAllocated: (item.cellAreaAllocated * item.noOfPackagesStuffed) / item.contStuffPackages || 0,
          stuffRequestQty: item.noOfPackagesStuffed || 0,
          contStuffPackages: item.contStuffPackages || 0,
          areaReleased: 0,
          stuffedQty: 0,
          balanceQty: 0,
          balQty: 0,
          hsnCode: '',
          cargoWeight: 0.00,
          totalCargoWeight: handleInputChange((parseFloat(item.cargoWeight) * parseFloat(item.noOfPackagesStuffed)) / parseFloat(item.contStuffPackages), 12, 4) || 0
        })))






        toast.success("Data found successfully!!", {
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

  const [formErrors, setFormErrors] = useState({
    stuffId: '',
    agentSealNo: '',
    customsSealNo: '',
    vesselName: '',
    voyageNo: '',
    terminal: '',
    pod: '',
    finalPod: '',
    tareWeight: '',
  })



  const handleClear = () => {
    setFormErrors({
      stuffId: '',
      agentSealNo: '',
      customsSealNo: '',
      vesselName: '',
      voyageNo: '',
      terminal: '',
      pod: '',
      finalPod: '',
      tareWeight: '',
      length: '',
      height: '',
      weight: '',
      odcType: '',
      cargoType: ''
    })
    setErrors([]);
    setStuffTally({
      companyId: '',
      branchId: '',
      stuffTallyId: '',
      sbTransId: '',
      stuffTallyLineId: 0,
      profitcentreId: '',
      cartingTransId: '',
      sbLineId: '',
      cartingLineId: '',
      sbNo: '',
      stuffTallyDate: new Date(),
      stuffMode: 'Normal',
      status: '',
      createdBy: '',
      stuffId: '',
      stuffDate: null,
      shift: 'Day',
      shippingAgent: '',
      shippingLine: '',
      cargoWeight: '',
      agentSealNo: '',
      customsSealNo: '',
      containerStatus: 'FCL',
      vesselId: '',
      vesselName: '',
      voyageNo: '',
      viaNo: '',
      terminal: '',
      pol: '',
      containerCondition: '',
      containerNo: '',
      containerSize: '',
      containerType: '',
      tareWeight: '',
      yardLocation: '',
      yardBlock: '',
      blockCellNo: '',
      pod: '',
      finalPod: '',
      periodFrom: null,
      cha: '',
      haz: 'N',
      sealType: '',
      genSetRequired: 'N',
      docType: '',
      docNo: '',
      rotationNo: '',
      rotationDate: null,
      terminal: '',
      berthingDate: null,
      gateOpenDate: null,
      deliveryOrderNo: '',
      stuffTallyWoTransId: '',
      stuffTallyCutWoTransDate: null,
      totalGrossWeight: 0.00,
      length: '',
      height: '',
      weight: '',
      odcType: '',
      cargoType: ''
    })
    setChaName('');
    setStuffTallyDtl([{
      companyId: '',
      branchId: '',
      stuffTallyId: '',
      sbTransId: '',
      stuffTallyLineId: 0,
      profitcentreId: '',
      cartingTransId: '',
      sbLineId: '',
      cartingLineId: '',
      sbNo: '',
      sbDate: null,
      exporterName: '',
      commodity: '',
      consignee: '',
      fob: '',
      typeOfPackage: '',
      yardPackages: 0,
      cellAreaAllocated: 0,
      stuffRequestQty: 0,
      contStuffPackages: 0,
      areaReleased: 0,
      stuffedQty: 0,
      stuffedQuantity: 0,
      balanceQty: 0,
      balQty: 0,
      cargoWeight: 0,
      totalCargoWeight: 0,
      length: '',
      height: '',
      weight: '',
      odcType: '',
      cargoType: '',
      hsnCode: '',
    }]);

    setSelectedFinalPod(null);
    setSelectedPod(null);
    setSelectedTerminal(null);
  }

  const handleSave = () => {
    setLoading(true);
    setFormErrors({
      stuffId: '',
      agentSealNo: '',
      customsSealNo: '',
      vesselName: '',
      voyageNo: '',
      terminal: '',
      pod: '',
      finalPod: '',
      tareWeight: '',
      length: '',
      height: '',
      weight: '',
      odcType: '',
      cargoType: ''
    })

    let errors = {};

    if (!stuffTally.stuffId) {
      errors.stuffId = "Stuff id is required."
    }
    if (!stuffTally.agentSealNo) {
      errors.agentSealNo = "Agent seal no is required."
    }
    if (!stuffTally.customsSealNo) {
      errors.customsSealNo = "Customs seal no is required."
    }
    if (!stuffTally.vesselName) {
      errors.vesselName = "Vessel name is required."
    }

    if (!stuffTally.voyageNo) {
      errors.voyageNo = "Voyage no is required."
    }
    if (!stuffTally.terminal) {
      errors.terminal = "Terminal name is required."
    }
    if (!stuffTally.pod) {
      errors.pod = "POD is required."
    }
    if (!stuffTally.tareWeight) {
      errors.tareWeight = "Container tare wt is required."
    }
    if (!stuffTally.finalPod) {
      errors.finalPod = "Final pod is required."
    }

    if (!stuffTally.cargoType) {
      errors.cargoType = "cargoType is required."
    }


    if (stuffTally.cargoType === "OutGauge") {
      if (!stuffTally.length || stuffTally.length <= 0) errors.length = "Length is required and must be greater than 0.";
      if (!stuffTally.height || stuffTally.height <= 0) errors.height = "Height is required and must be greater than 0.";
      if (!stuffTally.weight || stuffTally.weight <= 0) errors.weight = "Weight is required and must be greater than 0.";
      if (!stuffTally.odcType) errors.odcType = "ODC Type is required.";
      if (!stuffTally.hsnCode) errors.hsnCode = "HSN code is required.";

    }

    if (Object.keys(errors).length > 0) {
      setLoading(false);
      setFormErrors(errors);
      toast.error("Please fill in the required fields.", {
        autoClose: 1000
      })
      return;
    }

    let newErrors = stuffTallyDtl.map(() => ({}));
    setErrors([]);

    stuffTallyDtl.forEach((data, index) => {
      let rowErrors = {};

      if (!data.stuffedQty) rowErrors.stuffedQty = "Stuffed quantity is required.";
      if (!data.cargoWeight) rowErrors.cargoWeight = "Gross wt is required.";

      if (Object.keys(rowErrors).length > 0) {
        newErrors[index] = rowErrors;
      }
    });

    // Check if any errors exist
    const hasErrors = newErrors.some(errorObj => Object.keys(errorObj).length > 0);

    if (hasErrors) {

      setErrors(newErrors);
      setLoading(false);
      toast.error("Please fill in the required fields.", {
        autoClose: 1000
      });

      return;
    }

    const wt = stuffTallyDtl.reduce((total, item) => total + (item.cargoWeight ? parseFloat(item.cargoWeight) : 0), 0);
    console.log('wt ', wt);

    const wt1 = handleInputChange(wt, 12, 3);

    stuffTally.totalGrossWeight = wt1;

    const formData = {
      singleTally: stuffTally,
      tally: stuffTallyDtl
    }

    axios.post(`${ipaddress}stuffTally/saveStuffingTally?cid=${companyid}&bid=${branchId}&user=${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {

        const data = response.data;
        const singleData = data[0];

        setStuffTally({
          companyId: singleData.companyId || '',
          branchId: singleData.branchId || '',
          stuffTallyId: singleData.stuffTallyId || '',
          sbTransId: singleData.sbTransId || '',
          stuffTallyLineId: singleData.stuffTallyLineId || 0,
          profitcentreId: singleData.profitcentreId || '',
          cartingTransId: singleData.cartingTransId || '',
          sbLineId: singleData.sbLineId || '',
          cartingLineId: singleData.cartingLineId || '',
          sbNo: singleData.sbNo || '',
          stuffTallyDate: singleData.stuffTallyDate === null ? new Date() : new Date(singleData.stuffTallyDate),
          stuffMode: singleData.stuffMode || 'Normal',
          status: singleData.status || '',
          createdBy: singleData.createdBy || '',
          stuffId: singleData.stuffId || '',
          stuffDate: singleData.stuffDate === null ? null : new Date(singleData.stuffDate),
          shift: singleData.shift || 'Day',
          shippingAgent: singleData.shippingAgent || '',
          shippingLine: singleData.shippingLine || '',
          cargoWeight: singleData.cargoWeight || '',
          agentSealNo: singleData.agentSealNo || '',
          customsSealNo: singleData.customsSealNo || '',
          containerStatus: singleData.containerStatus || 'FCL',
          vesselId: singleData.vesselId || '',
          vesselName: singleData.vesselName || '',
          voyageNo: singleData.voyageNo || '',
          viaNo: singleData.viaNo || '',
          terminal: singleData.terminal || '',
          pol: singleData.pol || '',
          containerCondition: singleData.containerCondition || '',
          containerNo: singleData.containerNo || '',
          containerSize: singleData.containerSize || '',
          containerType: singleData.containerType || '',
          tareWeight: singleData.tareWeight || '',
          yardLocation: singleData.yardLocation || '',
          yardBlock: singleData.yardBlock || '',
          blockCellNo: singleData.blockCellNo || '',
          pod: singleData.pod || '',
          finalPod: singleData.finalPod || '',
          periodFrom: singleData.periodFrom === null ? null : new Date(singleData.periodFrom),
          cha: singleData.cha || '',
          haz: singleData.haz || '',
          sealType: singleData.sealType || '',
          genSetRequired: singleData.genSetRequired || 'N',
          docType: singleData.docType || '',
          docNo: singleData.docNo || '',
          rotationNo: singleData.rotationNo || '',
          rotationDate: singleData.rotationDate === null ? null : new Date(singleData.rotationDate),
          terminal: singleData.terminal || '',
          berthingDate: singleData.berthingDate === null ? null : new Date(singleData.berthingDate),
          gateOpenDate: singleData.gateOpenDate === null ? null : new Date(singleData.gateOpenDate),
          deliveryOrderNo: singleData.deliveryOrderNo || '',
          stuffTallyWoTransId: singleData.stuffTallyWoTransId || '',
          stuffTallyCutWoTransDate: singleData.stuffTallyCutWoTransDate === null ? null : new Date(singleData.stuffTallyCutWoTransDate),
          totalGrossWeight: singleData.totalGrossWeight || 0.00,
          length: singleData.length || '',
          height: singleData.height || '',
          weight: singleData.weight || '',
          odcType: singleData.odcType || '',
          cargoType: singleData.cargoType || ''
        });

        setChaName(singleData.chaName);
        setStuffTallyDtl(data.map((item) => ({
          companyId: item.companyId || '',
          branchId: item.branchId || '',
          stuffTallyId: item.stuffTallyId || '',
          sbTransId: item.sbTransId || '',
          stuffTallyLineId: item.stuffTallyLineId || 0,
          profitcentreId: item.profitcentreId || '',
          cartingTransId: item.cartingTransId || '',
          sbLineId: item.sbLineId || '',
          cartingLineId: item.cartingLineId || '',
          sbNo: item.sbNo || '',
          sbDate: item.sbDate === null ? null : new Date(item.sbDate),
          exporterName: item.exporterName || '',
          commodity: item.commodity || '',
          consignee: item.consignee || '',
          fob: item.fob || '',
          typeOfPackage: item.typeOfPackage || '',
          yardPackages: item.yardPackages || 0,
          cellAreaAllocated: item.cellAreaAllocated || 0,
          stuffRequestQty: item.stuffRequestQty || 0,
          contStuffPackages: 0,
          areaReleased: item.areaReleased || 0,
          stuffedQty: item.stuffedQty || 0,
          stuffedQuantity: item.stuffedQty || 0,
          balQty: item.balQty || 0,
          balanceQty: item.balanceQty || 0,
          cargoWeight: item.cargoWeight || 0.00,
          totalCargoWeight: item.totalCargoWeight || 0,
          length: item.length || '',
          height: item.height || '',
          weight: item.weight || '',
          odcType: item.odcType || '',
          cargoType: item.cargoType || '',
          hsnCode: item.hsnCode || '',
        })))


        toast.success("Data save successfully!!", {
          autoClose: 800
        })

        if (searchData && (searchData.sbNo || searchData.container)
        ) {
          updatePagesList("P00221");
        }

        setLoading(false);
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
    axios.get(`${ipaddress}stuffTally/searchTallyData?cid=${companyid}&bid=${branchId}&search=${id}`, {
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


  const getSelectedTallyData = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${ipaddress}stuffTally/getSelectedData?cid=${companyid}&bid=${branchId}&search=${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });

      const data = response.data;
      const singleData = data[0];

      setStuffTally({
        companyId: singleData.companyId || '',
        branchId: singleData.branchId || '',
        stuffTallyId: singleData.stuffTallyId || '',
        sbTransId: singleData.sbTransId || '',
        stuffTallyLineId: singleData.stuffTallyLineId || 0,
        profitcentreId: singleData.profitcentreId || '',
        cartingTransId: singleData.cartingTransId || '',
        sbLineId: singleData.sbLineId || '',
        cartingLineId: singleData.cartingLineId || '',
        sbNo: singleData.sbNo || '',
        stuffTallyDate: singleData.stuffTallyDate === null ? new Date() : new Date(singleData.stuffTallyDate),
        stuffMode: singleData.stuffMode || 'Normal',
        status: singleData.status || '',
        createdBy: singleData.createdBy || '',
        stuffId: singleData.stuffId || '',
        stuffDate: singleData.stuffDate === null ? null : new Date(singleData.stuffDate),
        shift: singleData.shift || 'Day',
        shippingAgent: singleData.shippingAgent || '',
        shippingLine: singleData.shippingLine || '',
        cargoWeight: singleData.cargoWeight || '',
        agentSealNo: singleData.agentSealNo || '',
        customsSealNo: singleData.customsSealNo || '',
        containerStatus: singleData.containerStatus || 'FCL',
        vesselId: singleData.vesselId || '',
        vesselName: singleData.vesselName || '',
        voyageNo: singleData.voyageNo || '',
        viaNo: singleData.viaNo || '',
        terminal: singleData.terminal || '',
        pol: singleData.pol || '',
        containerCondition: singleData.containerCondition || '',
        containerNo: singleData.containerNo || '',
        containerSize: singleData.containerSize || '',
        containerType: singleData.containerType || '',
        tareWeight: singleData.tareWeight || '',
        yardLocation: singleData.yardLocation || '',
        yardBlock: singleData.yardBlock || '',
        blockCellNo: singleData.blockCellNo || '',
        pod: singleData.pod || '',
        finalPod: singleData.finalPod || '',
        periodFrom: singleData.periodFrom === null ? null : new Date(singleData.periodFrom),
        cha: singleData.cha || '',
        haz: singleData.haz || '',
        sealType: singleData.sealType || '',
        genSetRequired: singleData.genSetRequired || 'N',
        docType: singleData.docType || '',
        docNo: singleData.docNo || '',
        rotationNo: singleData.rotationNo || '',
        rotationDate: singleData.rotationDate === null ? null : new Date(singleData.rotationDate),
        terminal: singleData.terminal || '',
        berthingDate: singleData.berthingDate === null ? null : new Date(singleData.berthingDate),
        gateOpenDate: singleData.gateOpenDate === null ? null : new Date(singleData.gateOpenDate),
        deliveryOrderNo: singleData.deliveryOrderNo || '',
        stuffTallyWoTransId: singleData.stuffTallyWoTransId || '',
        stuffTallyCutWoTransDate: singleData.stuffTallyCutWoTransDate === null ? null : new Date(singleData.stuffTallyCutWoTransDate),
        totalGrossWeight: singleData.totalGrossWeight || 0.00,
        length: singleData.length || '',
        height: singleData.height || '',
        weight: singleData.weight || '',
        odcType: singleData.odcType || '',
        cargoType: singleData.cargoType || ''
      });

      setChaName(singleData.chaName);
      setStuffTallyDtl(data.map((item) => ({
        companyId: item.companyId || '',
        branchId: item.branchId || '',
        stuffTallyId: item.stuffTallyId || '',
        sbTransId: item.sbTransId || '',
        stuffTallyLineId: item.stuffTallyLineId || 0,
        profitcentreId: item.profitcentreId || '',
        cartingTransId: item.cartingTransId || '',
        sbLineId: item.sbLineId || '',
        cartingLineId: item.cartingLineId || '',
        sbNo: item.sbNo || '',
        sbDate: item.sbDate === null ? null : new Date(item.sbDate),
        exporterName: item.exporterName || '',
        commodity: item.commodity || '',
        consignee: item.consignee || '',
        fob: item.fob || '',
        typeOfPackage: item.typeOfPackage || '',
        yardPackages: item.yardPackages || 0,
        cellAreaAllocated: item.cellAreaAllocated || 0,
        stuffRequestQty: item.stuffRequestQty || 0,
        contStuffPackages: 0,
        areaReleased: item.areaReleased || 0,
        stuffedQty: item.stuffedQty || 0,
        stuffedQuantity: item.stuffedQty || 0,
        balanceQty: item.balanceQty || 0,
        balQty: item.balQty || 0,
        cargoWeight: item.cargoWeight || 0.00,
        totalCargoWeight: item.totalCargoWeight || 0,
        length: item.length || '',
        height: item.height || '',
        weight: item.weight || '',
        odcType: item.odcType || '',
        cargoType: item.cargoType || '',
        hsnCode: item.hsnCode || '',
      })))


      setSelectedFinalPod({ value: singleData.finalPod, label: singleData.finalPod });
      setSelectedPod({ value: singleData.pod, label: singleData.pod });
      setSelectedTerminal({ value: singleData.terminal, label: singleData.terminal });

      closeGateInModal();
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data", {
        autoClose: 800
      });
    }
    finally {
      setLoading(false);
    }
  };







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

  const [isModalOpenForCotainerWorkOrder, setisModalOpenForCotainerWorkOrder] = useState(false);

  const openContainerWiseModal = () => {
    setisModalOpenForCotainerWorkOrder(true);
    getVendorAndEquipment();
    getContainerWiseEquipmentData();
  }

  const [getVendor, setGetVendor] = useState({});
  const [getEquipment, setGetEquipment] = useState([]);
  const [selectVendor, setSelectVendor] = useState('');
  const [selectEquipmend, setSelectEquipmend] = useState('');

  const getVendorAndEquipment = () => {
    axios.get(`${ipaddress}equipmentActivity/getVendor?cid=${companyid}&bid=${branchId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        console.log('vendor ', response.data);

        setGetVendor(response.data.party);
        setGetEquipment(response.data.jar);
      })
      .catch((error) => {

      })
  }

  const closeContainerWiseModal = () => {
    setisModalOpenForCotainerWorkOrder(false);
    handleContainerEquipmentClear('');
  }

  const handleContainerEquipmentClear = () => {
    setSelectVendor('');
    setSelectEquipmend('');
  }

  const [conEquipmentData, setConEquipmentData] = useState([]);

  const getContainerWiseEquipmentData = () => {
    const params = new URLSearchParams({
      companyId: companyid,
      branchId: branchId,
      con: stuffTally.containerNo,
      val1: stuffTally.stuffTallyId,
      val2: stuffTally.stuffId
    }).toString();
    axios.get(`${ipaddress}equipmentActivity/getContainerDataForStuffing?${params}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        setConEquipmentData(response.data);

      })
      .catch((error) => {
        setConEquipmentData([]);
      })
  }


  const handleContainerSaveEquipment = (ven, equi) => {
    setLoading(true);
    if (!ven) {
      toast.error("Please select vendor", {
        autoClose: 800
      })
      setLoading(false);
      return;
    }

    if (!equi) {
      toast.error("Please select equipment", {
        autoClose: 800
      })
      setLoading(false);
      return;
    }


    const params = new URLSearchParams({
      cid: companyid,
      bid: branchId,
      user: userId,
      equipment: equi,
      vendor: ven,
      stuffId: stuffTally.stuffTallyId,
      finYear: new Date().getFullYear(),
      container: stuffTally.containerNo
    }).toString();

    // Send the POST request with query parameters and body
    axios.post(`${ipaddress}equipmentActivity/saveStuffTallyContainerEquipment?${params}`, null, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json' // Ensure the content type is set to JSON
      }
    })
      .then((response) => {
        toast.success(response.data, {
          autoClose: 800
        })
        setLoading(false);
        getContainerWiseEquipmentData();
        handleContainerEquipmentClear();
      })
      .catch((error) => {
        toast.error(error.response.data, {
          autoClose: 800
        })
        setLoading(false);
      })
  }

  const deleteContainerEquipments = (equi, ven, destuff) => {
    Swal.fire({
      title: 'Are you sure?',
      html: `Are you sure you want to delete the record?`,
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        icon: 'icon-smaller' // Apply the custom class to the icon
      },
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, close it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const params = new URLSearchParams({
          cid: companyid,
          bid: branchId,
          user: userId,
          destuff: destuff,
          equipment: equi,
          vendor: ven,
          container: stuffTally.containerNo
        }).toString();
        axios.post(`${ipaddress}equipmentActivity/deleteContainerEquipmentsForStuffingTally?${params}`, null, {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        })
          .then((response) => {
            toast.error(response.data, {
              autoClose: 800
            })
            getContainerWiseEquipmentData();
          })
          .catch((error) => {
            toast.error(error.response.data, {
              autoClose: 800
            })
          })

      }
    });
  }

  const downloadContWiseStuffReport = () => {


    setLoading(true);
    axios
      .post(
        `${ipaddress}exportReport/exportContWiseStuffTallyReport?cid=${companyid}&bid=${branchId}&id=${stuffTally.stuffTallyId}&con=${stuffTally.containerNo}`,
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





  const handlePODChange = async (selectedOption, fieldName) => {
    // Update selected values
    if (fieldName === 'finalPod') {
      setSelectedFinalPod(selectedOption);
    } else if (fieldName === 'pod') {
      setSelectedPod(selectedOption);
    } else {
      setSelectedTerminal(selectedOption);
    }

    setStuffTally(prevState => ({
      ...prevState,
      [fieldName]: selectedOption ? selectedOption.label : ''
    }));

    setFormErrors(prevState => ({
      ...prevState,
      [fieldName]: ''
    }));

  };


  const handleCreationPODSelect = async (inputValue, fieldName) => {

    const selectedOption = { value: inputValue, label: inputValue };
    if (fieldName === 'finalPod') {
      setSelectedFinalPod(selectedOption);
    } else if (fieldName === 'pod') {
      setSelectedPod(selectedOption);
    } else {
      setSelectedTerminal(selectedOption);
    }
    setStuffTally(prevState => ({
      ...prevState,
      [fieldName]: inputValue
    }));

    setFormErrors(prevState => ({
      ...prevState,
      [fieldName]: ''
    }));

  };



  const [terminalData, setTerminalData] = useState([]);
  const [podData, setPodData] = useState([]);
  const [selectedTerminal, setSelectedTerminal] = useState(null);
  const [selectedPod, setSelectedPod] = useState(null);
  const [finalPodData, setFinalPodData] = useState([]);
  const [selectedFinalPod, setSelectedFinalPod] = useState(null);

  const searchPortData = async (searchValue, fieldName) => {
    if (!searchValue) {
      setPodData([]);
      setTerminalData([]);
      setFinalPodData([]);
      return;
    }
    try {
      const response = await MovementService.searchPortsData(companyid, branchId, searchValue, jwtToken);
      if (fieldName === 'finalPod') {
        setFinalPodData(response.data);
      } else if (fieldName === 'pod') {
        setPodData(response.data);
      } else {
        setTerminalData(response.data);
      }
    } catch (error) {
      setPodData([]);
      setTerminalData([]);
      setFinalPodData([]);
      console.error('Error searching vessel:', error);
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

      <Modal Modal isOpen={isModalOpenForCotainerWorkOrder} onClose={closeContainerWiseModal} toggle={closeContainerWiseModal} style={{ maxWidth: '900px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

        <ModalHeader toggle={closeContainerWiseModal} style={{
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
            icon={faAdd}
            style={{
              marginRight: '8px',
              color: 'white', // Set the color to golden
            }}
          /> Add Equipment</h5>



        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >

          <Row>
            <Col md={4}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Vendor
                </label>
                <Input
                  className="form-control"
                  type="select"
                  id="selectVendor"
                  name='selectVendor'
                  value={selectVendor}
                  onChange={(e) => setSelectVendor(e.target.value)}

                >
                  <option value="">Select Vendor</option>

                  <option value={getVendor.partyId}>{getVendor.partyName}</option>


                </Input>


              </FormGroup>
            </Col>
            <Col md={8}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Equipment
                </label>
                <Input
                  className="form-control"
                  type="select"
                  id="selectEquipmend"
                  name='selectEquipmend'
                  value={selectEquipmend}
                  onChange={(e) => setSelectEquipmend(e.target.value)}

                >
                  <option value="">Select Equipment</option>
                  {getEquipment.map((item, index) => (
                    <option key={index} value={item.jarDtlId}>{item.jarDtlDesc}</option>
                  ))}

                </Input>

              </FormGroup>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col className='text-center'>
              <button
                className="btn btn-outline-primary btn-margin newButton"
                style={{ marginRight: 10 }}
                id="submitbtn2"
                onClick={() => handleContainerSaveEquipment(selectVendor, selectEquipmend)}
              >
                <FontAwesomeIcon icon={faSave} style={{ marginRight: 5 }} />
                Save

              </button>
              <button
                className="btn btn-outline-danger btn-margin newButton"
                style={{ marginRight: 10 }}
                id="submitbtn2"
                onClick={handleContainerEquipmentClear}

              >
                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: 5 }} />
                Clear
              </button>



            </Col>
          </Row>

          <div className="mt-3 table-responsive">
            <table className="table table-bordered table-hover tableHeader">
              <thead className="tableHeader">
                <tr>

                  <th scope="col">Sr No</th>
                  <th scope="col">Container No</th>
                  <th scope="col">Container Size</th>
                  <th scope="col">Container Type</th>

                  <th scope="col">Status</th>

                </tr>
              </thead>
              <tbody>

                <tr >

                  <td>1</td>
                  <td>{stuffTally.containerNo}</td>
                  <td>{stuffTally.containerSize}</td>
                  <td>{stuffTally.containerType}</td>

                  <td>A</td>

                </tr>

              </tbody>
            </table>
          </div>
          <div className="mt-3 table-responsive ">
            <table className="table table-bordered table-hover tableHeader">
              <thead className='tableHeader'>
                <tr>

                  <th scope="col">Sr No</th>
                  <th scope="col">Equipment</th>
                  <th scope="col">Vendor</th>

                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {conEquipmentData.map((item, index) => (
                  <tr
                    key={index}

                  >
                    <td>{index + 1}</td>
                    <td>{item[0]}</td>
                    <td>{item[1]}</td>

                    <td>
                      <button
                        className="btn btn-outline-danger btn-margin newButton"
                        style={{ marginRight: 10 }}
                        id="submitbtn2"
                        onClick={() => deleteContainerEquipments(item[2], item[3], item[4])}

                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>

          </div>
        </ModalBody>
      </Modal>
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
          /> Search Stuff Tally Data</h5>



        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
          <Row>
            <Col md={4}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Search by Stuff Tally Id / Container No
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
                  <th scope="col">Stuff Tally Id</th>
                  <th scope="col">Stuff Tally Date</th>
                  <th scope="col">Container No</th>

                </tr>
                <tr className='text-center'>
                  <th scope="col"></th>
                  <th scope="col">{gateInSearchData.length}</th>
                  <th scope="col"></th>
                  <th scope="col"></th>

                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input type="radio" name="radioGroup" onChange={() => getSelectedTallyData(item[0])} value={item[0]} />
                    </td>
                    <td>{item[0]}</td>
                    <td>{item[1]}</td>
                    <td>{item[2]}</td>

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

      <div>


        <Row>
          <Col md={2}>





















            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Stuff Tally Id
              </label>
              <Row>
                <Col md={9}>
                  <Input
                    className="form-control"
                    type="text"
                    id="stuffTallyId"
                    name='stuffTallyId'
                    value={stuffTally.stuffTallyId}
                    onChange={(e) => handleStuffTallyChange(e)}
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

                {/* 
                <Col md={3}>
                  <button
                    className="btn btn-outline-primary btn-margin newButton"
                    style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    id="submitbtn2"
                    onClick={openGateInModal}
                  >
                    <FontAwesomeIcon icon={faSearch} size="sm" s />
                  </button>
                </Col> */}
              </Row>
            </FormGroup>











          </Col>














          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Stuff Tally Date
              </label>
              <div style={{ position: 'relative' }}>
                <DatePicker
                  selected={stuffTally.stuffTallyDate}
                  name='stuffTallyDate'
                  id="stuffTallyDate"
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
                Stuff Mode
              </label>
              <Input
                className="form-control"
                type="select"
                id="stuffMode"
                name='stuffMode'
                value={stuffTally.stuffMode}
                onChange={(e) => handleStuffTallyChange(e)}
              >


                <option value="Normal">Normal</option>

                <option value="Direct Stuff">Direct Stuff</option>

                <option value="Cross Stuffing">Cross Stuffing</option>

                <option value="Inter CFS Movement">Inter CFS Movement</option>

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
                value={stuffTally.profitcentreId}
                onChange={(e) => handleStuffTallyChange(e)}
                disabled
              />
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
                value={stuffTally.status === 'A' ? 'Approved' : ''}
                onChange={(e) => handleStuffTallyChange(e)}
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
                value={stuffTally.createdBy}
                onChange={(e) => handleStuffTallyChange(e)}
                disabled
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Stuff Id <span style={{ color: 'red' }}>*</span>
              </label>
              <Select
                value={{ value: stuffTally.stuffId, label: stuffTally.stuffId }}
                onChange={handleStuffReqIdSelect}
                onInputChange={searchStuffreqIdData}
                options={stuffReqData}
                placeholder="Select Stuff Id"
                isClearable
                id="stuffId"
                name='stuffId'
                className={`autocompleteHeight ${formErrors.stuffId ? 'error-border' : ''}`}
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
              <div style={{ color: 'red' }} className="error-message">{formErrors.stuffId}</div>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Stuff Date
              </label>
              <div style={{ position: 'relative' }}>
                <DatePicker
                  selected={stuffTally.stuffDate}
                  name='stuffDate'
                  id="stuffDate"
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
                Shift
              </label>
              <Input
                className="form-control"
                type="select"
                id="shift"
                name='shift'
                value={stuffTally.shift}
                onChange={(e) => handleStuffTallyChange(e)}
              >

                <option value="Day">Day	</option>

                <option value="Second">Second</option>

                <option value="Third">Third</option>

              </Input>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Shipping Agent
              </label>
              <Input
                className="form-control"
                type="text"
                id="shippingAgent"
                name='shippingAgent'
                value={stuffTally.shippingAgent}
                onChange={(e) => handleStuffTallyChange(e)}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Shipping Line
              </label>
              <Input
                className="form-control"
                type="text"
                id="shippingLine"
                name='shippingLine'
                value={stuffTally.shippingLine}
                onChange={(e) => handleStuffTallyChange(e)}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Cargo Weight
              </label>
              <Input
                className="form-control"
                type="text"
                id="totalGrossWeight"
                name='totalGrossWeight'
                value={stuffTallyDtl.reduce((total, item) => total + (item.cargoWeight ? parseFloat(item.cargoWeight) : 0), 0)}
                disabled
                onChange={(e) => handleStuffTallyChange(e, 6, 4)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Agent Seal No <span style={{ color: 'red' }}>*</span>
              </label>
              <Input
                className={`form-control ${formErrors.agentSealNo ? 'error-border' : ''}`}
                type="text"
                id="agentSealNo"
                name='agentSealNo'
                value={stuffTally.agentSealNo}
                maxLength={15}
                onChange={(e) => handleStuffTallyChange(e)}
              />
              <div style={{ color: 'red' }} className="error-message">{formErrors.agentSealNo}</div>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Customs Seal No  <span style={{ color: 'red' }}>*</span>
              </label>
              <Input
                className={`form-control ${formErrors.customsSealNo ? 'error-border' : ''}`}
                type="text"
                id="customsSealNo"
                name='customsSealNo'
                maxLength={15}
                value={stuffTally.customsSealNo}
                onChange={(e) => handleStuffTallyChange(e)}
              />
              <div style={{ color: 'red' }} className="error-message">{formErrors.customsSealNo}</div>
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
                value={stuffTally.containerStatus}
                onChange={(e) => handleStuffTallyChange(e)}
              >
                <option value="FCL">FCL</option>
                <option value="LCL">LCL</option>

              </Input>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Vessel  <span style={{ color: 'red' }}>*</span>
              </label>
              <Input
                className={`form-control ${formErrors.vesselName ? 'error-border' : ''}`}
                type="text"
                id="vesselName"
                name='vesselName'
                maxLength={50}
                value={stuffTally.vesselName}
                onChange={(e) => handleStuffTallyChange(e)}
              />
              <div style={{ color: 'red' }} className="error-message">{formErrors.vesselName}</div>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Voyage No  <span style={{ color: 'red' }}>*</span>
              </label>
              <CreatableSelect
                value={{ value: stuffTally.voyageNo, label: stuffTally.voyageNo }}
                onChange={handleVoyageSelect}
                onInputChange={searchVoyageAndVia}
                options={vesselData}
                onCreateOption={(inputValue) => {

                  setStuffTally({
                    ...stuffTally,
                    voyageNo: inputValue.slice(0, 10) // Assign the value to transporterName as well
                  });
                  setFormErrors({
                    ...formErrors,
                    voyageNo: ''
                  });

                }}
                placeholder="Select Voyage No"
                isClearable
                id="voyageNo"
                name='voyageNo'
                className={`autocompleteHeight ${formErrors.voyageNo ? 'error-border' : ''}`}
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
              <div style={{ color: 'red' }} className="error-message">{formErrors.voyageNo}</div>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Via No
              </label>
              <CreatableSelect
                value={{ value: stuffTally.viaNo, label: stuffTally.viaNo }}
                onChange={handleVoyageSelect}
                onInputChange={searchVoyageAndVia}
                options={vesselData}
                placeholder="Select Via No"
                onCreateOption={(inputValue) => {

                  setStuffTally({
                    ...stuffTally,
                    viaNo: inputValue.slice(0, 10) // Assign the value to transporterName as well
                  });

                }}
                isClearable
                id="viaNo"
                name='viaNo'
                className={`autocompleteHeight `}
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
        </Row>
        <Row>
          {/* <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Terminal Name  <span style={{ color: 'red' }}>*</span>
              </label>
              <Input
                className={`form-control ${formErrors.terminal ? 'error-border' : ''}`}
                type="text"
                id="terminal"
                name='terminal'
                maxLength={10}
                value={stuffTally.terminal}
                onChange={(e) => handleStuffTallyChange(e)}
              />
              <div style={{ color: 'red' }} className="error-message">{formErrors.terminal}</div>
            </FormGroup>
          </Col> */}


          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Terminal Name <span className="error-message">*</span>
              </label>
              <CreatableSelect
                value={selectedTerminal}
                onChange={(selectedOption) => handlePODChange(selectedOption, 'terminal')}
                options={terminalData}
                placeholder="Select Terminal"
                onInputChange={(inputValue, { action }) => {
                  if (action === 'input-change') {
                    searchPortData(inputValue, 'terminal');
                  }
                }}
                onCreateOption={(inputValue) => {
                  const maxLength = 50;
                  const truncatedInputValue = inputValue.slice(0, maxLength);
                  handleCreationPODSelect(truncatedInputValue, 'terminal')
                }}
                isClearable
                id="terminal"
                name='terminal'
                className={`${formErrors.terminal ? 'error-border' : ''}`}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    height: 32,  // Set the height of the select input
                    minHeight: 32,
                    border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
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
              <div style={{ color: 'red' }} className="error-message">{formErrors.terminal}</div>
            </FormGroup>
          </Col>



          {/* <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Port Of Discharge  <span style={{ color: 'red' }}>*</span>
              </label>
              <Input
                className={`form-control ${formErrors.pod ? 'error-border' : ''}`}
                type="text"
                id="pod"
                name='pod'
                value={stuffTally.pod}
                onChange={(e) => handleStuffTallyChange(e)}
                maxLength={100}
              />
              <div style={{ color: 'red' }} className="error-message">{formErrors.pod}</div>
            </FormGroup>
          </Col> */}



          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                POD <span className="error-message">*</span>
              </label>
              <CreatableSelect
                value={selectedPod}
                onChange={(selectedOption) => handlePODChange(selectedOption, 'pod')}
                options={podData}
                placeholder="Select POD"
                onInputChange={(inputValue, { action }) => {
                  if (action === 'input-change') {
                    searchPortData(inputValue, 'pod');
                  }
                }}
                onCreateOption={(inputValue) => {
                  const maxLength = 50;
                  const truncatedInputValue = inputValue.slice(0, maxLength);
                  handleCreationPODSelect(truncatedInputValue, 'pod')
                }}
                isClearable
                id="pod"
                name='pod'
                className={`${formErrors.pod ? 'error-border' : ''}`}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    height: 32,  // Set the height of the select input
                    minHeight: 32,
                    border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
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
              <div style={{ color: 'red' }} className="error-message">{formErrors.pod}</div>
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
                id="containerCondition"
                name='containerCondition'
                value={stuffTally.containerCondition}
                onChange={(e) => handleStuffTallyChange(e)}
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
                Container No
              </label>
              <Input
                className="form-control"
                type="text"
                id="containerNo"
                name='containerNo'
                value={stuffTally.containerNo}
                onChange={(e) => handleStuffTallyChange(e)}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Type Size
              </label>
              <Input
                className="form-control"
                type="text"
                id="containerSize"
                name='containerSize'
                value={stuffTally.containerSize + stuffTally.containerType}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Container Tare Wt  <span style={{ color: 'red' }}>*</span>
              </label>
              <Input
                className={`form-control ${formErrors.tareWeight ? 'error-border' : ''}`}
                type="text"
                id="tareWeight"
                name='tareWeight'
                value={stuffTally.tareWeight}
                onChange={(e) => handleStuffTallyChange(e, 12, 3)}
              />
              <div style={{ color: 'red' }} className="error-message">{formErrors.tareWeight}</div>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Do No
              </label>
              <Input
                className="form-control"
                type="text"
                id="deliveryOrderNo"
                name='deliveryOrderNo'
                value={stuffTally.deliveryOrderNo}
                maxLength={35}
                disabled
              />
            </FormGroup>
          </Col>



          {/* <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Final POD  <span style={{ color: 'red' }}>*</span>
              </label>
              <Input
                className={`form-control ${formErrors.finalPod ? 'error-border' : ''}`}
                type="text"
                id="finalPod"
                name='finalPod'
                value={stuffTally.finalPod}
                maxLength={40}
                onChange={(e) => handleStuffTallyChange(e)}
              />
              <div style={{ color: 'red' }} className="error-message">{formErrors.finalPod}</div>
            </FormGroup>
          </Col> */}



          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Final POD <span className="error-message">*</span>
              </label>
              <CreatableSelect
                value={selectedFinalPod}
                onChange={(selectedOption) => handlePODChange(selectedOption, 'finalPod')}
                options={finalPodData}
                placeholder="Select FinalPod"
                onInputChange={(inputValue, { action }) => {
                  if (action === 'input-change') {
                    searchPortData(inputValue, 'finalPod');
                  }
                }}
                onCreateOption={(inputValue) => {
                  const maxLength = 50;
                  const truncatedInputValue = inputValue.slice(0, maxLength);
                  handleCreationPODSelect(truncatedInputValue, 'finalPod')
                }}
                isClearable
                id="finalPod"
                name='finalPod'
                className={`${formErrors.finalPod ? 'error-border' : ''}`}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    height: 32,  // Set the height of the select input
                    minHeight: 32,
                    border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
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
              <div style={{ color: 'red' }} className="error-message">{formErrors.finalPod}</div>
            </FormGroup>
          </Col>




          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Period From
              </label>
              <div style={{ position: 'relative' }}>
                <DatePicker
                  selected={stuffTally.periodFrom}
                  name='periodFrom'
                  id="periodFrom"
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
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                CHA
              </label>
              <Select
                value={{ value: stuffTally.cha, label: chaName }}
                onChange={handleChaSelect}
                onInputChange={handleCHAList}
                options={chaList}
                placeholder="Select CHA"
                isClearable
                id="cha"
                name='cha'
                className={`autocompleteHeight `}
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
                Hazardous
              </label>
              <Input
                className="form-control"
                type="select"
                id="haz"
                name='haz'
                value={stuffTally.haz}
                onChange={(e) => handleStuffTallyChange(e)}
              >
                <option value="N">No</option>
                <option value="Y">Yes</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Seal Type
              </label>
              <Input
                className="form-control"
                type="text"
                id="sealType"
                name='sealType'
                value={stuffTally.sealType}
                onChange={(e) => handleStuffTallyChange(e)}
                maxLength={5}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Gen Set Required
              </label>
              <Input
                type="checkbox"
                name="genSetRequired"
                id="genSetRequired"
                className="form-control inputField"
                checked={stuffTally.genSetRequired === 'Y'}
                onChange={(e) => {
                  setStuffTally((prev) => ({
                    ...prev,
                    genSetRequired: e.target.checked ? 'Y' : 'N' // Update the state to 'Y' or 'N' based on checkbox state
                  }));
                }}
                style={{ height: 25 }}
              />

            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Doc Type
              </label>
              <Input
                className="form-control"
                type="text"
                id="docType"
                name='docType'
                value={stuffTally.docType}
                onChange={(e) => handleStuffTallyChange(e)}
                maxLength={5}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Doc Number
              </label>
              <Input
                className="form-control"
                type="text"
                id="docNo"
                name='docNo'
                value={stuffTally.docNo}
                onChange={(e) => handleStuffTallyChange(e)}
                maxLength={5}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Rotation No
              </label>
              <Input
                className="form-control"
                type="text"
                id="rotationNo"
                name='rotationNo'
                value={stuffTally.rotationNo}
                onChange={(e) => handleStuffTallyChange(e)}
                maxLength={10}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Rotation Date
              </label>
              <div style={{ position: 'relative' }}>
                <DatePicker
                  selected={stuffTally.rotationDate}
                  onChange={(date) => {
                    setStuffTally(prev => ({
                      ...prev,
                      rotationDate: date
                    }))
                  }}
                  name='rotationDate'
                  id="rotationDate"
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
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Terminal
              </label>
              <Input
                className="form-control"
                type="text"
                id="terminal"
                name='terminal'
                value={stuffTally.terminal}
                maxLength={10}
                disabled
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Berthing Date
              </label>
              <div style={{ position: 'relative' }}>
                <DatePicker
                  selected={stuffTally.berthingDate}
                  onChange={(date) => {
                    setStuffTally(prev => ({
                      ...prev,
                      berthingDate: date
                    }))
                  }}
                  name='berthingDate'
                  id="berthingDate"
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
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Gate Open Date
              </label>
              <div style={{ position: 'relative' }}>
                <DatePicker
                  selected={stuffTally.gateOpenDate}
                  onChange={(date) => {
                    setStuffTally(prev => ({
                      ...prev,
                      gateOpenDate: date
                    }))
                  }}
                  name='gateOpenDate'
                  id="gateOpenDate"
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
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Job Order
              </label>
              <Input
                className="form-control"
                type="text"
                id="stuffTallyWoTransId"
                disabled
                name='stuffTallyWoTransId'
                value={stuffTally.stuffTallyWoTransId}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                JO Date
              </label>
              <div style={{ position: 'relative' }}>
                <DatePicker
                  selected={stuffTally.stuffTallyCutWoTransDate}
                  name='stuffTallyCutWoTransDate'
                  id="stuffTallyCutWoTransDate"
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
                Cargo Type <span className="error-message">*</span>
              </label>
              <Input
                className={`form-control ${formErrors.cargoType ? 'error-border' : ''}`}
                type="select"
                id={`cargoType`}
                name='cargoType'
                // style={{ width: 150 }}
                value={stuffTally.cargoType}
                onChange={(e) => handleStuffTallyChange(e)}
              >
                <option value=""></option>

                <option value="Normal">General Cargo</option>

                <option value="Special">Special Handling</option>

                <option value="OutGauge">Out Gauge Cargo</option>

                <option value="Dirty">Dirty Cargo</option>

                <option value="Haz">HAZ Cargo</option>

                <option value="Loose">Loose Cargo</option>

                <option value="Bulk">Bulk Cargo</option>
              </Input>
            </FormGroup>
          </Col>



          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Type Of ODC
              </label>
              <Input
                className={`form-control ${formErrors.odcType ? 'error-border' : ''}`}
                type="select"
                id={`odcType`}
                name='odcType'
                value={stuffTally.odcType}
                // style={{ width: 150 }}
                onChange={(e) => handleStuffTallyChange(e)}
              >
                <option value=""></option>

                <option value="Heavy Machinery and Equipment">Heavy Machinery and Equipment</option>

                <option value="Large Structures and Components">Large Structures and Components</option>

                <option value="Offshore and Energy Equipment">Offshore and Energy Equipment</option>

              </Input>
            </FormGroup>
          </Col>


          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Length
              </label>
              <Input
                className={`form-control ${formErrors.length ? 'error-border' : ''}`}
                type="text"
                id="length"
                onChange={(e) => handleStuffTallyChange(e, 16, 3)}
                name='length'
                value={stuffTally.length}
              />
            </FormGroup>
          </Col>


          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Weight
              </label>
              <Input
                className={`form-control ${formErrors.weight ? 'error-border' : ''}`}
                type="text"
                id="weight"
                onChange={(e) => handleStuffTallyChange(e, 16, 3)}
                name='weight'
                value={stuffTally.weight}
              />
            </FormGroup>
          </Col>


          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Height
              </label>
              <Input
                className={`form-control ${formErrors.height ? 'error-border' : ''}`}
                type="text"
                id="height"
                onChange={(e) => handleStuffTallyChange(e, 16, 3)}
                name='height'
                value={stuffTally.height}
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
            //    disabled={stuffTally.stuffTallyId !== ''}
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
              disabled={stuffTally.stuffTallyId === ''}
              onClick={openContainerWiseModal}
            >
              <FontAwesomeIcon icon={faAdd} style={{ marginRight: 5 }} />
              Add Equipment

            </button>
            <button
              className="btn btn-outline-success btn-margin newButton"
              style={{ marginRight: 10 }}
              id="submitbtn2"
              disabled={stuffTally.stuffTallyId === ''}
              onClick={downloadContWiseStuffReport}
            >
              <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
              Print Report
            </button>
          </Col>
        </Row>

        <div className="table-responsive mt-2">
          <Table className="table table-bordered table-hover tableHeader">
            <thead className="thead-dark bg-dark"  >
              <tr>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Line No</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>SB Trans Id</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>SB No</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>SB Date</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Exporter</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Commodity</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>HSN Code <span style={{ color: 'red' }}>*</span></th>

                <th scope="col" className="text-center" style={{ color: 'black' }}>Consignee</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>FOB</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Type Of Pkg</th>
                {/* <th scope="col" className="text-center" style={{ color: 'black' }}>Yard Pkgs</th> */}
                <th scope="col" className="text-center" style={{ color: 'black' }}>Area</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Stuff Req Qty</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Stuffed Qty <span style={{ color: 'red' }}>*</span></th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Area Released</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Balance</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Gross Wt <span style={{ color: 'red' }}>*</span></th>
              </tr>
            </thead>
            <tbody>
              {stuffTallyDtl.map((item, index) => (
                <tr key={index}>
                  <td>{item.stuffTallyLineId}</td>
                  <td>{item.sbTransId}</td>
                  <td>{item.sbNo}</td>
                  <td >
                    <div style={{ position: 'relative', width: 150 }}>
                      <DatePicker
                        selected={item.sbDate}
                        name='sbDate'
                        id={`sbDate${index}`}
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
                  </td>
                  <td>{item.exporterName}</td>
                  <td>{item.commodity}</td>
                  <td >
                    <Input
                      className={`form-control ${errors[index]?.hsnCode ? 'error-border' : ''}`}
                      type="select"
                      id={`hsnCode${index}`}
                      onChange={(e) => handleStuffTallyDtlChange(e, index)}
                      name='hsnCode'
                      value={item.hsnCode}
                      style={{ width: 200 }}
                    >
                      <option value="">Selet HSN Code</option>
                      {hsnData.map((item, index) => (
                        <option key={index} value={item[0]}>{item[1]}</option>
                      ))}
                    </Input>
                  </td>
                  <td>{item.consignee}</td>
                  <td>{item.fob}</td>
                  <td >
                    <Input
                      className={`form-control ${errors[index]?.typeOfPackage ? 'error-border' : ''}`}
                      type="select"
                      id={`typeOfPackage${index}`}
                      onChange={(e) => handleStuffTallyDtlChange(e, index)}
                      name='typeOfPackage'
                      value={item.typeOfPackage}
                      style={{ width: 200 }}
                    >
                      <option value="">Selet Type Of Package</option>
                      {packages.map((item, index) => (
                        <option key={index} value={item[0]}>{item[1]}</option>
                      ))}
                    </Input>
                  </td>
                  {/* <td>{item.yardPackages}</td> */}
                  <td>{item.cellAreaAllocated}</td>
                  <td>{item.stuffRequestQty}</td>
                  <td>
                    <Input
                      className={`form-control ${errors[index]?.stuffedQty ? 'error-border' : ''}`}
                      type="text"
                      id={`stuffedQty${index}`}
                      name='stuffedQty'
                      style={{ width: 150 }}
                      value={item.stuffedQty}
                      onChange={(e) => handleStuffTallyDtlChange(e, index, 8, 0)}
                    />
                  </td>
                  <td>
                    <Input
                      className={`form-control ${errors[index]?.areaReleased ? 'error-border' : ''}`}
                      type="text"
                      style={{ width: 150 }}
                      id={`areaReleased${index}`}
                      name='areaReleased'
                      value={item.areaReleased}
                      disabled
                      onChange={(e) => handleStuffTallyDtlChange(e, index, 5, 3)}
                    />
                  </td>
                  <td>
                    <Input
                      className="form-control"
                      type="text"
                      style={{ width: 150 }}
                      id={`balanceQty${index}`}
                      name='balanceQty'
                      value={item.stuffRequestQty < item.stuffedQty ? 0 : item.balanceQty}
                      onChange={(e) => handleStuffTallyDtlChange(e, index, 8, 0)}
                      disabled
                    />
                  </td>
                  <td>
                    <Input
                      className={`form-control ${errors[index]?.cargoWeight ? 'error-border' : ''}`}
                      type="text"
                      style={{ width: 150 }}
                      id={`cargoWeight${index}`}
                      name='cargoWeight'
                      value={item.cargoWeight}
                      onChange={(e) => handleStuffTallyDtlChange(e, index, 12, 4)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

      </div>

    </>
  );
}

export default StuffingTallyCLP;