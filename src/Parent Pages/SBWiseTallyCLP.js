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
// import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faShip, faBackward, faCalendarAlt, faAdd, faPlaneDeparture, faCalculator, faTired, faWheatAwnCircleExclamation, faToriiGate, faPlus, faL, faPrint } from '@fortawesome/free-solid-svg-icons';
// import '../assets/css/style.css';
// import '../Components/Style.css';
// import { Button } from "react-bootstrap";
// import useAxios from '../Components/useAxios';
// import CFSService from '../service/CFSService';
// import movementService from "../service/MovementService";
// import { toast } from 'react-toastify';
// import ipaddress from "../Components/IpAddress";
// import moment from 'moment';
// import CreatableSelect from 'react-select/creatable';
// import { error, map } from 'jquery';
// function SBWiseTallyCLP({ searchData, resetFlag, updatePagesList }) {
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


//   const axiosInstance = useAxios();
//   const MovementService = new movementService(axiosInstance);


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

//   const processId = 'P00222';
//   const foundRights =
//     role !== "ROLE_ADMIN"
//       ? userRights.find((item) => item.process_Id === processId)
//       : null;
//   const allowCreate = foundRights?.allow_Create === "Y";
//   const allowRead = foundRights?.allow_Read === "Y";
//   const allowEdit = foundRights?.allow_Update === "Y";
//   const allowDelete = foundRights?.allow_Delete === "Y";











//   useEffect(() => {
//     if (searchData && searchData.activeTab === processId && searchData.stuffTallyId && searchData.containerNo) {
//       searchDataBySbAndContainerNo(searchData.sbNo, searchData.sbTransId, 'N', 'Y', searchData.containerNo);

//       setSearchContainerNo(searchData.containerNo);
//       setSearchSbNo(searchData.sbNo);
//       setSearchSbTransId(searchData.sbTransId);
//       setSaveCheck('Y');
//       setNewCheck('N');
//       getSbNoForTally1(searchData.containerNo);

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
//     sbDate: null,
//     movementType: 'CLP',
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
//     exporterName: '',
//     commodity: '',
//     consignee: '',
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
//     sbPackages: '',
//     sbWt: '',
//     berthingDate: null,
//     gateOpenDate: null,
//     deliveryOrderNo: '',
//     stuffTallyWoTransId: '',
//     stuffTallyCutWoTransDate: null,
//     fob: '',
//     onAccountOf: '',
//     stuffedQuantity: ''
//   })

//   const [stuffTallyDtl, setStuffTallyDtl] = useState([{
//     companyId: '',
//     branchId: '',
//     stuffTallyId: '',
//     stuffId: '',
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
//     areaReleased: 0,
//     stuffedQty: 0,
//     contStuffPackages: 0,
//     balanceQty: 0,
//     cargoWeight: 0,
//     totalCargoWeight: 0,
//     containerNo: '',
//     stuffTallyDate: null,
//     containerSize: '',
//     containerType: '',
//     tareWeight: '',
//     gateInDate: null,
//     deliveryOrderNo: '',
//     agentSealNo: '',
//     customsSealNo: '',
//     status: '',
//     cargoType: '',
//     reworkFlag: ''
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
//     if (['stuffedQty', 'tareWeight', 'cargoWeight'].includes(name)) {
//       sanitizedValue = handleInputChange(value, val1, val2);
//     }

//     if (name === 'stuffedQty') {
//       if (sanitizedValue === '') {
//         setStuffTallyDtl(prevState => {
//           const updatedData = [...prevState];
//           updatedData[index] = {
//             ...updatedData[index],
//             cargoWeight: '',
//           };
//           return updatedData;
//         });
//       }
//       if (sanitizedValue > stuffTallyDtl[index].stuffRequestQty && stuffTallyDtl[index].stuffTallyId === '') {
//         sanitizedValue = ''

//         setStuffTallyDtl(prevState => {
//           const updatedData = [...prevState];
//           updatedData[index] = {
//             ...updatedData[index],
//             cargoWeight: '',
//           };
//           return updatedData;
//         });
//       }
//       else {


//         if (sanitizedValue > 0) {
//           if (stuffTallyDtl[index].stuffTallyId !== '') {
//             const incrementVal = stuffTallyDtl.reduce(
//               (acc, item) => acc + (item.stuffedQty > item.stuffRequestQty ? (item.stuffedQty - Math.max(item.stuffRequestQty, item.contStuffPackages)) : 0),
//               0
//             );


//             // Calculate the total accepted value by including the specific stuffRequestQty for the current item
//             const acceptedVal = remainQuantity > 0 ? (remainQuantity - incrementVal) + Math.max(stuffTallyDtl[index].stuffRequestQty, stuffTallyDtl[index].contStuffPackages) : stuffTallyDtl[index].contStuffPackages;

//             console.log('acceptedVal:', acceptedVal, 'incrementVal:', incrementVal, 'remainQuantity:', remainQuantity, 'stuffTallyDtl[index].contStuffPackages ', stuffTallyDtl[index].contStuffPackages);

//             if (sanitizedValue > acceptedVal) {
//               // Reset sanitizedValue if it exceeds acceptedVal
//               sanitizedValue = '';

//               // Update state to clear cargoWeight for the item at the specified index
//               setStuffTallyDtl(prevState => {
//                 const updatedData = [...prevState];
//                 updatedData[index] = {
//                   ...updatedData[index],
//                   cargoWeight: '', // Clear the cargoWeight field
//                 };
//                 return updatedData;
//               });
//             }

//             else {
//               let gross = (parseFloat(stuffTallyDtl[index].totalCargoWeight) * parseFloat(sanitizedValue)) / parseFloat(stuffTallyDtl[index].stuffRequestQty)

//               console.log('gross ', gross, ' ', parseFloat(stuffTallyDtl[index].totalCargoWeight), ' ');

//               setStuffTallyDtl(prevState => {
//                 const updatedData = [...prevState];
//                 updatedData[index] = {
//                   ...updatedData[index],
//                   cargoWeight: handleInputChange(gross, 12, 4),
//                 };
//                 return updatedData;
//               });
//               setErrors(prevErrors => {
//                 const updatedErrors = Array.isArray(prevErrors) ? [...prevErrors] : [];

//                 if (updatedErrors[index]) {
//                   delete updatedErrors[index]['cargoWeight'];

//                   // Remove the error object at the index if it's empty
//                   if (Object.keys(updatedErrors[index]).length === 0) {
//                     updatedErrors.splice(index, 1);
//                   }
//                 }

//                 return updatedErrors;
//               });
//             }

//           }
//           else {
//             let gross = (parseFloat(stuffTallyDtl[index].totalCargoWeight) * parseFloat(sanitizedValue)) / parseFloat(stuffTallyDtl[index].stuffRequestQty)


//             setStuffTallyDtl(prevState => {
//               const updatedData = [...prevState];
//               updatedData[index] = {
//                 ...updatedData[index],
//                 cargoWeight: gross,
//               };
//               return updatedData;
//             });
//             setErrors(prevErrors => {
//               const updatedErrors = Array.isArray(prevErrors) ? [...prevErrors] : [];

//               if (updatedErrors[index]) {
//                 delete updatedErrors[index]['cargoWeight'];

//                 // Remove the error object at the index if it's empty
//                 if (Object.keys(updatedErrors[index]).length === 0) {
//                   updatedErrors.splice(index, 1);
//                 }
//               }

//               return updatedErrors;
//             });
//           }

//         }

//       }
//     }

//     console.log(sanitizedValue);



//     setStuffTallyDtl(prevState => {
//       const updatedData = [...prevState];
//       updatedData[index] = {
//         ...updatedData[index],
//         [name]: sanitizedValue
//       };
//       return updatedData;
//     });


//     // Update igmCrgData state

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
//       setFormErrors({
//         ...formErrors,
//         voyageNo: '',
//         vesselName: ''
//       });

//     }

//   }


//   const [selectedData, setSelectedData] = useState([]);
//   const [selectAllChecked, setSelectAllChecked] = useState(false);

//   // Handler for individual checkbox
//   const handleCheckboxChange = (item) => {
//     const isChecked = selectedData.some(selectedItem => selectedItem.containerNo === item.containerNo);

//     if (isChecked) {
//       // Remove item from selectedData
//       const updatedSelection = selectedData.filter(selectedItem => selectedItem.containerNo !== item.containerNo);
//       setSelectedData(updatedSelection);

//       // Uncheck the header checkbox if not all individual checkboxes are checked
//       if (updatedSelection.length !== stuffTallyDtl.length) {
//         setSelectAllChecked(false);
//       }
//     } else {
//       // Add item to selectedData
//       const updatedSelection = [...selectedData, item];
//       setSelectedData(updatedSelection);

//       // Check the header checkbox if all individual checkboxes are checked
//       if (updatedSelection.length === stuffTallyDtl.length) {
//         setSelectAllChecked(true);
//       }
//     }
//   };

//   // Header checkbox handler
//   const handleSelectAll = () => {
//     if (selectAllChecked) {
//       // Unselect items where stuffTallyId is an empty string
//       let data = selectedData.filter(item => item.stuffTallyId !== '');
//       setSelectedData(data);
//     } else {

//       setSelectedData(stuffTallyDtl);
//     }
//     setSelectAllChecked(!selectAllChecked);
//   };



//   // Effect to check if all rows are selected
//   useEffect(() => {
//     if (searchData && searchData.activeTab === 'P00222') {
//       if (selectedData.length === stuffTallyDtl.length && stuffTallyDtl.length > 0) {
//         setSelectAllChecked(true);
//       } else {
//         setSelectAllChecked(false);
//       }
//     }
//   }, [selectedData, stuffTallyDtl]);

//   const [searchSbNo, setSearchSbNo] = useState('');
//   const [searchSbTransId, setSearchSbTransId] = useState('');
//   const [searchContainerNo, setSearchContainerNo] = useState('');
//   const [newCheck, setNewCheck] = useState('N');
//   const [saveCheck, setSaveCheck] = useState('N');
//   const [searchSbData, setSearchSbData] = useState([]);


//   const getSbNoForTally = (id) => {
//     if (!id) {
//       setSearchSbData([]);
//     }


//     axios.get(`${ipaddress}stuffTally/getSbNoForTally?cid=${companyid}&bid=${branchId}&sb=${id}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {
//         const data = response.data;
//         const sb = data.map(port => ({
//           value: port[0],
//           label: port[0],
//           sbTransId: port[1],
//         }))
//         console.log('sb ', sb);
//         setSearchSbData(sb);

//       })
//       .catch((error) => {
//         setSearchSbData([]);
//       })
//   }


//   const getSbNoForTally1 = (id) => {
//     if (!id) {
//       setSearchSbData([]);
//     }


//     axios.get(`${ipaddress}stuffTally/getSbNoForTally1?cid=${companyid}&bid=${branchId}&con=${id}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {
//         const data = response.data;
//         const sb = data.map(port => ({
//           value: port[0],
//           label: port[0],
//           sbTransId: port[1],
//         }))

//         setSearchSbData(sb);

//       })
//       .catch((error) => {
//         setSearchSbData([]);
//       })
//   }

//   const handleSbSelect = async (selectedOption, { action }) => {
//     if (action === 'clear') {
//       setSearchSbNo('');
//       setSearchSbTransId('');
//     }
//     else {
//       setSearchSbNo(selectedOption.value);
//       setSearchSbTransId(selectedOption.sbTransId);

//     }

//   }



//   const searchDataBySbAndContainerNo = (searchSbNo, searchSbTransId, newCheck, saveCheck, searchContainerNo) => {
//     setLoading(true);

//     if (!searchSbNo) {
//       toast.error("Please select SB No.", {
//         autoClose: 800
//       })
//       setLoading(false);
//       return;
//     }

//     if (newCheck !== 'Y' && saveCheck !== 'Y') {
//       toast.error("Please select between New and Saved checkbox.", {
//         autoClose: 800
//       })
//       setLoading(false);
//       return;
//     }

//     axios.get(`${ipaddress}stuffTally/searchDataForTally?cid=${companyid}&bid=${branchId}&sb=${searchSbNo}&sbTransId=${searchSbTransId}&newCheck=${newCheck}&saveCheck=${saveCheck}&con=${searchContainerNo}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {

//         const data = response.data;
//         const singleData = data[0];
//         setSelectAllChecked(false);
//         setSelectedData([]);

//         if (newCheck === 'Y') {
//           setStuffTally({
//             companyId: '',
//             branchId: '',
//             stuffTallyId: '',
//             sbTransId: singleData.sbTransId || '',
//             stuffTallyLineId: 0,
//             profitcentreId: singleData.profitcentreId || '',
//             cartingTransId: '',
//             sbLineId: '',
//             cartingLineId: '',
//             sbNo: singleData.sbNo || '',
//             sbDate: singleData.sbDate === null ? null : new Date(singleData.sbDate),
//             movementType: 'CLP',
//             stuffTallyDate: new Date(),
//             stuffMode: 'Normal',
//             status: '',
//             createdBy: '',
//             stuffId: '',
//             stuffDate: null,
//             shift: 'Day',
//             shippingAgent: singleData.shippingAgent || '',
//             shippingLine: singleData.shippingLine || '',
//             cargoWeight: '',
//             agentSealNo: '',
//             customsSealNo: '',
//             containerStatus: 'FCL',
//             vesselId: singleData.vesselId || '',
//             vesselName: singleData.vesselName || '',
//             voyageNo: singleData.voyageNo || '',
//             viaNo: singleData.viaNo || '',
//             terminal: singleData.terminal || '',
//             pol: '',
//             exporterName: singleData.exporterName || '',
//             commodity: singleData.cargoDescription || '',
//             consignee: singleData.consignee || '',
//             pod: singleData.pod || '',
//             finalPod: '',
//             periodFrom: null,
//             cha: singleData.cha || '',
//             haz: 'N',
//             sealType: '',
//             genSetRequired: 'N',
//             docType: '',
//             docNo: '',
//             rotationNo: singleData.rotationNo || '',
//             rotationDate: singleData.rotationDate === null ? null : new Date(singleData.rotationDate),
//             sbPackages: singleData.sbPackages || '',
//             sbWt: singleData.sbWt || '',
//             berthingDate: singleData.berthingDate === null ? null : new Date(singleData.berthingDate),
//             gateOpenDate: singleData.gateOpenDate === null ? null : new Date(singleData.gateOpenDate),
//             deliveryOrderNo: singleData.deliveryOrderNo || '',
//             stuffTallyWoTransId: '',
//             stuffTallyCutWoTransDate: null,
//             fob: singleData.fob || '',
//             onAccountOf: singleData.onAccountOf || '',
//             stuffedQuantity: singleData.stuffedQuantity || ''
//           });


//           setSelectedFinalPod( singleData.finalPod ? {value: singleData.finalPod, label: singleData.finalPod} : null);
//           setSelectedPod( singleData.pod ? {value: singleData.pod, label: singleData.pod} : null);
//           setSelectedTerminal( singleData.terminal ? {value: singleData.terminal, label: singleData.terminal} : null);


//           setStuffTallyDtl(data.map((item, index) => (
//             {
//               companyId: '',
//               branchId: '',
//               stuffTallyId: '',
//               stuffId: item.stuffReqId || '',
//               sbTransId: '',
//               stuffTallyLineId: 0,
//               profitcentreId: '',
//               cartingTransId: '',
//               sbLineId: '',
//               cartingLineId: '',
//               sbNo: '',
//               sbDate: null,
//               exporterName: '',
//               commodity: '',
//               consignee: '',
//               fob: '',
//               typeOfPackage: '',
//               yardPackages: 0,
//               cellAreaAllocated: 0,
//               stuffRequestQty: item.noOfPackagesStuffed || 0,
//               areaReleased: 0,
//               stuffedQty: 0,
//               contStuffPackages: 0,
//               balanceQty: 0,
//               cargoWeight: 0,
//               totalCargoWeight: item.cargoWeight || 0,
//               containerNo: item.containerNo || '',
//               stuffTallyDate: null,
//               containerSize: item.containerSize || '',
//               containerType: item.containerType || '',
//               tareWeight: item.tareWeight || '',
//               gateInDate: item.containerGateInDate === null ? null : new Date(item.containerGateInDate),
//               deliveryOrderNo: item.deliveryOrderNo || '',
//               agentSealNo: item.agentSealNo || '',
//               customsSealNo: item.customsSealNo || '',
//               status: '',
//               cargoType: '',
//               reworkFlag: ''
//             }
//           )));
//         }
//         else {
//           setRemainQuantity(singleData.balanceQty);
//           setStuffTally({
//             companyId: '',
//             branchId: '',
//             stuffTallyId: '',
//             sbTransId: singleData.sbTransId || '',
//             stuffTallyLineId: 0,
//             profitcentreId: singleData.profitcentreId || '',
//             cartingTransId: '',
//             sbLineId: '',
//             cartingLineId: '',
//             sbNo: singleData.sbNo || '',
//             sbDate: singleData.sbDate === null ? null : new Date(singleData.sbDate),
//             movementType: singleData.movementType || 'CLP',
//             stuffTallyDate: new Date(),
//             stuffMode: singleData.stuffMode || 'Normal',
//             status: '',
//             createdBy: '',
//             stuffId: '',
//             stuffDate: null,
//             shift: 'Day',
//             shippingAgent: singleData.shippingAgent || '',
//             shippingLine: singleData.shippingLine || '',
//             cargoWeight: '',
//             agentSealNo: '',
//             customsSealNo: '',
//             containerStatus: 'FCL',
//             vesselId: singleData.vesselId || '',
//             vesselName: singleData.vesselName || '',
//             voyageNo: singleData.voyageNo || '',
//             viaNo: singleData.viaNo || '',
//             terminal: singleData.terminal || '',
//             pol: '',
//             exporterName: singleData.exporterName || '',
//             commodity: singleData.commodity || '',
//             consignee: singleData.consignee || '',
//             pod: singleData.pod || '',
//             finalPod: singleData.finalPod || '',
//             periodFrom: null,
//             cha: singleData.cha || '',
//             haz: 'N',
//             sealType: '',
//             genSetRequired: 'N',
//             docType: '',
//             docNo: '',
//             rotationNo: singleData.rotationNo || '',
//             rotationDate: singleData.rotationDate === null ? null : new Date(singleData.rotationDate),
//             sbPackages: singleData.sbPackages || '',
//             sbWt: singleData.sbWt || '',
//             berthingDate: singleData.berthingDate === null ? null : new Date(singleData.berthingDate),
//             gateOpenDate: singleData.gateOpenDate === null ? null : new Date(singleData.gateOpenDate),
//             deliveryOrderNo: singleData.deliveryOrderNo || '',
//             stuffTallyWoTransId: singleData.stuffTallyWoTransId || '',
//             stuffTallyCutWoTransDate: singleData.stuffTallyCutWoTransDate === null ? null : new Date(singleData.stuffTallyCutWoTransDate),
//             fob: singleData.fob || '',
//             onAccountOf: singleData.onAccountOf || '',
//             stuffedQuantity: singleData.stuffedQuantity || '',
//             status: singleData.status,
//             createdBy: singleData.createdBy
//           });


//           setSelectedFinalPod( singleData.finalPod ? {value: singleData.finalPod, label: singleData.finalPod} : null);
//           setSelectedPod( singleData.pod ? {value: singleData.pod, label: singleData.pod} : null);
//           setSelectedTerminal( singleData.terminal ? {value: singleData.terminal, label: singleData.terminal} : null);


//           let tallyData = [{}];

//           tallyData = data.map((item) => (
//             {
//               companyId: '',
//               branchId: '',
//               stuffTallyId: item.stuffTallyId || '',
//               stuffId: item.stuffId || '',
//               sbTransId: '',
//               stuffTallyLineId: 0,
//               profitcentreId: '',
//               cartingTransId: '',
//               sbLineId: '',
//               cartingLineId: '',
//               sbNo: '',
//               sbDate: null,
//               exporterName: '',
//               commodity: '',
//               consignee: '',
//               fob: '',
//               typeOfPackage: '',
//               yardPackages: 0,
//               cellAreaAllocated: 0,
//               stuffRequestQty: item.stuffRequestQty || 0,
//               areaReleased: 0,
//               stuffedQty: item.stuffedQty || 0,
//               contStuffPackages: item.stuffedQty || 0,
//               balanceQty: 0,
//               cargoWeight: item.cargoWeight || 0,
//               totalCargoWeight: item.cargoWeight || 0,
//               containerNo: item.containerNo || '',
//               stuffTallyDate: item.stuffTallyDate === null ? null : new Date(item.stuffTallyDate),
//               containerSize: item.containerSize || '',
//               containerType: item.containerType || '',
//               tareWeight: item.tareWeight || '',
//               gateInDate: item.gateInDate === null ? null : new Date(item.gateInDate),
//               deliveryOrderNo: item.deliveryOrderNo || '',
//               agentSealNo: item.agentSealNo || '',
//               customsSealNo: item.customsSealNo || '',
//               status: item.status || '',
//               cargoType: item.cargoType || '',
//               reworkFlag: item.reworkFlag || ''
//             }
//           ))

//           setStuffTallyDtl(tallyData);
//           setSelectedData(tallyData);
//           setSelectAllChecked(true);
//         }

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
//     vesselName: '',
//     voyageNo: '',
//     terminal: '',
//     pod: '',
//     finalPod: '',
//   })

//   const [remainQuantity, setRemainQuantity] = useState('');

//   const handleClear = () => {
//     setNewCheck('N');
//     setSaveCheck('N');
//     setSearchSbNo('');
//     setSearchSbTransId('');
//     setSearchContainerNo('');
//     setFormErrors({
//       vesselName: '',
//       voyageNo: '',
//       terminal: '',
//       pod: '',
//       finalPod: '',
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
//       sbDate: null,
//       movementType: 'CLP',
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
//       terminal: "",
//       pol: '',
//       exporterName: '',
//       commodity: '',
//       consignee: '',
//       pod: '',
//       finalPod: "",
//       periodFrom: null,
//       cha: '',
//       haz: 'N',
//       sealType: '',
//       genSetRequired: 'N',
//       docType: '',
//       docNo: '',
//       rotationNo: "",
//       rotationDate: null,
//       sbPackages: '',
//       sbWt: '',
//       berthingDate: null,
//       gateOpenDate: null,
//       deliveryOrderNo: '',
//       stuffTallyWoTransId: '',
//       stuffTallyCutWoTransDate: null,
//       fob: '',
//       onAccountOf: '',
//       stuffedQuantity: ''
//     })

//     setStuffTallyDtl([{
//       companyId: '',
//       branchId: '',
//       stuffTallyId: '',
//       sbTransId: '',
//       stuffId: '',
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
//       areaReleased: 0,
//       stuffedQty: 0,
//       contStuffPackages: 0,
//       balanceQty: 0,
//       cargoWeight: 0,
//       totalCargoWeight: 0,
//       containerNo: '',
//       stuffTallyDate: null,
//       containerSize: '',
//       containerType: '',
//       tareWeight: '',
//       gateInDate: null,
//       deliveryOrderNo: '',
//       agentSealNo: '',
//       customsSealNo: '',
//       status: '',
//       cargoType: '',
//       reworkFlag: ''
//     }]);


//     setSelectedFinalPod(null);
//     setSelectedPod(null);
//     setSelectedTerminal(null);

//   }

//   const handleSave = () => {
//     setLoading(true);
//     setFormErrors({
//       vesselName: '',
//       voyageNo: '',
//       terminal: '',
//       pod: '',
//       finalPod: '',
//     })

//     let errors = {};

//     const updatedSelectedData = selectedData.map((selectedItem) => {
//       const matchingItem = stuffTallyDtl.find(
//         (tallyItem) => tallyItem.containerNo === selectedItem.containerNo
//       );
//       return matchingItem ? { ...matchingItem } : { ...selectedItem };
//     });

//     // Update the state with the modified list
//     setSelectedData(updatedSelectedData);


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

//     let newErrors = updatedSelectedData.map(() => ({}));
//     setErrors([]);

//     updatedSelectedData.forEach((data, index) => {
//       let rowErrors = {};
//       console.log('data.cargoType ', data.cargoType);

//       if (!data.stuffedQty) rowErrors.stuffedQty = "Stuffed quantity is required.";
//       if (!data.cargoWeight) rowErrors.cargoWeight = "Gross wt is required.";
//       if (!data.agentSealNo) rowErrors.agentSealNo = "Agent seal no is required.";
//       if (!data.customsSealNo) rowErrors.customsSealNo = "Custom seal no is required.";
//       if (!data.tareWeight) rowErrors.tareWeight = "Tare wt is required.";
//       if (!data.cargoType) rowErrors.cargoType = "Cargo type is required.";

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

//     let newTallyData = updatedSelectedData.filter(item => item.containerNo !== '' || item.reworkFlag !== 'Y');

//     if (newTallyData.length === 0) {
//       toast.error("Please select atleast one container", {
//         autoClose: 800
//       })
//       setLoading(false);
//       return;
//     }

//     console.log('newTallyData ', newTallyData);


//     const formData = {
//       singleTally: stuffTally,
//       tally: newTallyData
//     }

//     axios.post(`${ipaddress}stuffTally/saveSbWiseTallyRecord?cid=${companyid}&bid=${branchId}&user=${userId}`, formData, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {
//         const data = response.data;
//         const singleData = data[0];

//         // console.log('balanceQty ', singleData.balanceQty);


//         setRemainQuantity(singleData.balanceQty);

//         setStuffTally({
//           companyId: '',
//           branchId: '',
//           stuffTallyId: '',
//           sbTransId: singleData.sbTransId || '',
//           stuffTallyLineId: 0,
//           profitcentreId: singleData.profitcentreId || '',
//           cartingTransId: '',
//           sbLineId: '',
//           cartingLineId: '',
//           sbNo: singleData.sbNo || '',
//           sbDate: singleData.sbDate === null ? null : new Date(singleData.sbDate),
//           movementType: singleData.movementType || 'CLP',
//           stuffTallyDate: new Date(),
//           stuffMode: singleData.stuffMode || 'Normal',
//           status: '',
//           createdBy: '',
//           stuffId: '',
//           stuffDate: null,
//           shift: 'Day',
//           shippingAgent: singleData.shippingAgent || '',
//           shippingLine: singleData.shippingLine || '',
//           cargoWeight: '',
//           agentSealNo: '',
//           customsSealNo: '',
//           containerStatus: 'FCL',
//           vesselId: singleData.vesselId || '',
//           vesselName: singleData.vesselName || '',
//           voyageNo: singleData.voyageNo || '',
//           viaNo: singleData.viaNo || '',
//           terminal: singleData.terminal || '',
//           pol: '',
//           exporterName: singleData.exporterName || '',
//           commodity: singleData.commodity || '',
//           consignee: singleData.consignee || '',
//           pod: singleData.pod || '',
//           finalPod: singleData.finalPod || '',
//           periodFrom: null,
//           cha: singleData.cha || '',
//           haz: 'N',
//           sealType: '',
//           genSetRequired: 'N',
//           docType: '',
//           docNo: '',
//           rotationNo: singleData.rotationNo || '',
//           rotationDate: singleData.rotationDate === null ? null : new Date(singleData.rotationDate),
//           sbPackages: singleData.sbPackages || '',
//           sbWt: singleData.sbWt || '',
//           berthingDate: singleData.berthingDate === null ? null : new Date(singleData.berthingDate),
//           gateOpenDate: singleData.gateOpenDate === null ? null : new Date(singleData.gateOpenDate),
//           deliveryOrderNo: singleData.deliveryOrderNo || '',
//           stuffTallyWoTransId: singleData.stuffTallyWoTransId || '',
//           stuffTallyCutWoTransDate: singleData.stuffTallyCutWoTransDate === null ? null : new Date(singleData.stuffTallyCutWoTransDate),
//           fob: singleData.fob || '',
//           onAccountOf: singleData.onAccountOf || '',
//           stuffedQuantity: singleData.stuffedQuantity || ''
//         })

//         let tallyData = [{}];

//         tallyData = data.map((item) => (
//           {
//             companyId: '',
//             branchId: '',
//             stuffTallyId: item.stuffTallyId || '',
//             stuffId: item.stuffId || '',
//             sbTransId: '',
//             stuffTallyLineId: 0,
//             profitcentreId: '',
//             cartingTransId: '',
//             sbLineId: '',
//             cartingLineId: '',
//             sbNo: '',
//             sbDate: null,
//             exporterName: '',
//             commodity: '',
//             consignee: '',
//             fob: '',
//             typeOfPackage: '',
//             yardPackages: 0,
//             cellAreaAllocated: 0,
//             stuffRequestQty: item.stuffRequestQty || 0,
//             contStuffPackages: item.stuffedQty || 0,
//             areaReleased: 0,
//             stuffedQty: item.stuffedQty || 0,
//             balanceQty: 0,
//             cargoWeight: item.cargoWeight || 0,
//             totalCargoWeight: item.cargoWeight || 0,
//             containerNo: item.containerNo || '',
//             stuffTallyDate: item.stuffTallyDate === null ? null : new Date(item.stuffTallyDate),
//             containerSize: item.containerSize || '',
//             containerType: item.containerType || '',
//             tareWeight: item.tareWeight || '',
//             gateInDate: item.gateInDate === null ? null : new Date(item.gateInDate),
//             deliveryOrderNo: item.deliveryOrderNo || '',
//             agentSealNo: item.agentSealNo || '',
//             customsSealNo: item.customsSealNo || '',
//             status: item.status || '',
//             cargoType: item.cargoType || '',
//             reworkFlag: item.reworkFlag || ''
//           }
//         ))
//         setSelectAllChecked(true);
//         setStuffTallyDtl(tallyData);
//         setSelectedData(tallyData);

//         setLoading(false);

//         if (searchData && (searchData.sbNo || searchData.container)
//         ) {
//           updatePagesList("P00222");
//         }

//         toast.success("Data save successfully!!!", {
//           autoClose: 800
//         })


//       })
//       .catch((error) => {
//         toast.error(error.response.data, {
//           autoClose: 800
//         })

//         setLoading(false);
//       })

//   }

//   const [isModalOpenForCotainerWorkOrder, setisModalOpenForCotainerWorkOrder] = useState(false);
//   const [selectedCon, setSelectedCon] = useState({});

//   const openContainerWiseModal = (item) => {
//     setisModalOpenForCotainerWorkOrder(true);
//     getVendorAndEquipment();
//     getContainerWiseEquipmentData(item);
//     setSelectedCon(item);
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
//     setSelectedCon({});
//   }

//   const handleContainerEquipmentClear = () => {
//     setSelectVendor('');
//     setSelectEquipmend('');
//   }

//   const [conEquipmentData, setConEquipmentData] = useState([]);

//   const getContainerWiseEquipmentData = (item) => {
//     const params = new URLSearchParams({
//       companyId: companyid,
//       branchId: branchId,
//       con: item.containerNo,
//       val1: item.stuffTallyId,
//       val2: item.stuffId
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
//       stuffId: selectedCon.stuffTallyId,
//       finYear: new Date().getFullYear(),
//       container: selectedCon.containerNo
//     }).toString();

//     // Send the POST request with query parameters and body
//     axios.post(`${ipaddress}equipmentActivity/saveStuffTallySbWiseContainerEquipment?${params}`, null, {
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
//         getContainerWiseEquipmentData(selectedCon);
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
//           container: selectedCon.containerNo
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
//             getContainerWiseEquipmentData(selectedCon);
//           })
//           .catch((error) => {
//             toast.error(error.response.data, {
//               autoClose: 800
//             })
//           })

//       }
//     });
//   }

//   const downloadSbWiseStuffReport = () => {


//     setLoading(true);
//     axios
//       .post(
//         `${ipaddress}exportReport/exportSBWiseStuffTallyReport?cid=${companyid}&bid=${branchId}&id=${stuffTally.sbTransId}&sb=${stuffTally.sbNo}`,
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

//       <div>
//         {/* <h5
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
//           SB Wise Tally/CLP
//           <hr />
//         </h5> */}
//         <Row>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="searchSbNo">
//                 SB No
//               </label>
//               <Select
//                 value={{ value: searchSbNo, label: searchSbNo }}
//                 onChange={handleSbSelect}
//                 onInputChange={getSbNoForTally}
//                 options={searchSbData}
//                 placeholder="Select SB No"
//                 isClearable
//                 // id="searchSbNo"
//                 name='searchSbNo'
//                 className={`autocompleteHeight`}
//                 isDisabled={searchData.stuffTallyId}
//                 id={searchData.stuffTallyId ? 'service' : ' '}
//                 // readOnly = {searchData.stuffTallyId}
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
//                 Container No
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id={searchData.stuffTallyId ? 'service' : ' '}
//                 readOnly={searchData.stuffTallyId}
//                 name='searchContainerNo'
//                 value={searchContainerNo}
//                 onChange={(e) => { setSearchContainerNo(e.target.value); getSbNoForTally1(e.target.value); }}
//               />
//             </FormGroup>
//           </Col>
//           <Col md={1}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 New
//               </label>
//               <Input
//                 type="checkbox"
//                 name="newCheck"
//                 id="newCheck"
//                 className="form-control inputField"
//                 checked={newCheck === 'Y'}
//                 disabled={saveCheck === 'Y'}
//                 onChange={(e) => setNewCheck(e.target.checked ? 'Y' : 'N')}
//                 style={{ height: 25, borderColor: 'black' }}
//               />

//             </FormGroup>
//           </Col>
//           <Col md={1}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Saved
//               </label>
//               <Input
//                 type="checkbox"
//                 name="saveCheck"
//                 id="saveCheck"
//                 className="form-control inputField"
//                 checked={saveCheck === 'Y'}
//                 // disabled={newCheck === 'Y'}
//                 disabled={newCheck === 'Y' || searchData.stuffTallyId}
//                 onChange={(e) => setSaveCheck(e.target.checked ? 'Y' : 'N')}
//                 style={{ height: 25, borderColor: 'black' }}
//               />

//             </FormGroup>
//           </Col>


//           <Col md={2} style={{ marginTop: 22 }}>
//                 <button
//                   className="btn btn-outline-primary btn-margin newButton"
//                   style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//                   onClick={(e) => searchDataBySbAndContainerNo(searchSbNo, searchSbTransId, newCheck, saveCheck, searchContainerNo)}
//                   disabled={searchData.stuffTallyId}
//                 >
//                   <FontAwesomeIcon icon={faSearch} size="sm" />
//                 </button>
//               </Col>





//           {/* <Col md={2}>
//             <button
//               className="btn btn-outline-primary btn-margin newButton"
//               style={{ marginTop: 18 }}
//               id="submitbtn2"
//               onClick={(e) => searchDataBySbAndContainerNo(searchSbNo, searchSbTransId, newCheck, saveCheck, searchContainerNo)}
//               disabled={searchData.stuffTallyId}
//             >
//               <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
//               Search
//             </button>
//           </Col> */}
//         </Row>



//         <hr style={{ margin: 0, padding: 0 }} />

//         <Row className='mt-2'>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 SB Trans ID
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="sbTransId"
//                 name='sbTransId'
//                 value={stuffTally.sbTransId}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 SB No
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="sbNo"
//                 name='sbNo'
//                 value={stuffTally.sbNo}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 SB Date
//               </label>
//               <div style={{ position: 'relative' }}>
//                 <DatePicker
//                   selected={stuffTally.sbDate}
//                   name='sbDate'
//                   id="sbDate"
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
//                 Movement Type
//               </label>
//               <Input
//                 className="form-control"
//                 type="select"
//                 id="movementType"
//                 name='movementType'
//                 value={stuffTally.movementType}
//                 onChange={(e) => handleStuffTallyChange(e)}
//               >
//                 <option value="CLP">CLP</option>
//                 <option value="Buffer" selected="">FactoryStuffing/Buffer/Export FCL</option>
//               </Input>
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
//                 id="consignee"
//                 name='consignee'
//                 value={stuffTally.status === 'A' ? 'Approved' : ''}
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
//                 id="commodity"
//                 name='commodity'
//                 value={stuffTally.createdBy}
//                 disabled
//               />
//             </FormGroup>
//           </Col>




//         </Row>
//         <Row>



//         <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Consignee
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="consignee"
//                 name='consignee'
//                 value={stuffTally.consignee}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Commodity
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="commodity"
//                 name='commodity'
//                 value={stuffTally.commodity}
//                 disabled
//               />
//             </FormGroup>
//           </Col>



//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Exporter
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="exporterName"
//                 name='exporterName'
//                 value={stuffTally.exporterName}
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
//                 disabled
//               />
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
//                 disabled
//               />
//             </FormGroup>
//           </Col>


//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 FOB
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="fob"
//                 name='fob'
//                 value={stuffTally.fob}
//                 disabled
//               />
//             </FormGroup>
//           </Col>



//         </Row>
//         <Row>



//         <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 SB Packages
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="sbPackages"
//                 name='sbPackages'
//                 value={stuffTally.sbPackages}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 SB Weight
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="sbWt"
//                 name='sbWt'
//                 value={stuffTally.sbWt}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Total Stuff Packages
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="stuffedQuantity"
//                 name='stuffedQuantity'
//                 value={stuffTally.stuffedQuantity}
//                 disabled
//               />
//             </FormGroup>
//           </Col>


//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Vessel
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
//               {/* <div style={{ color: 'red' }} className="error-message">{formErrors.voyageNo}</div> */}
//             </FormGroup>
//             <div style={{ color: 'red' }} className="error-message">{formErrors.voyageNo}</div>
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


//         {/* <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Port Of Discharge <span style={{ color: 'red' }}>*</span>
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


//           {/* <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Final POD <span style={{ color: 'red' }}>*</span>
//               </label>
//               <Input
//                 className={`form-control ${formErrors.finalPod ? 'error-border' : ''}`}
//                 type="text"
//                 id="finalPod"
//                 name='finalPod'
//                 value={stuffTally.finalPod}
//                 onChange={(e) => handleStuffTallyChange(e)}
//                 maxLength={40}
//               />
//               <div style={{ color: 'red' }} className="error-message">{formErrors.finalPod}</div>
//             </FormGroup>
//           </Col> */}










// <Col md={2}>
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
//           {/* <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Terminal Name <span style={{ color: 'red' }}>*</span>
//               </label>
//               <Input
//                 className={`form-control ${formErrors.terminal ? 'error-border' : ''}`}
//                 type="text"
//                 id="terminal"
//                 name='terminal'
//                 value={stuffTally.terminal}
//                 onChange={(e) => handleStuffTallyChange(e)}
//                 maxLength={10}
//               />
//               <div style={{ color: 'red' }} className="error-message">{formErrors.terminal}</div>
//             </FormGroup>
//           </Col> */}






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


//         </Row>
//         <Row>


//         <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 CHA
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="cha"
//                 name='cha'
//                 value={stuffTally.cha}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 On Account Of
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="onAccountOf"
//                 name='onAccountOf'
//                 value={stuffTally.onAccountOf}
//                 disabled
//               />
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
//                 onChange={(e) => handleInputChange(e)}
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
//                 Job Order
//               </label>
//               <Input
//                 className="form-control"
//                 type="text"
//                 id="stuffTallyWoTransId"
//                 name='stuffTallyWoTransId'
//                 value={stuffTally.stuffTallyWoTransId}
//                 disabled
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


//         </Row>
//         <Row className='text-center'>
//           <Col>
//             <button
//               className="btn btn-outline-primary btn-margin newButton"
//               style={{ marginRight: 10 , fontSize: 13}}
//               id="submitbtn2"
//               onClick={handleSave}
//             >
//               <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
//               Save
//             </button>
//             <button
//               className="btn btn-outline-danger btn-margin newButton"
//               style={{ marginRight: 10 , fontSize: 13}}
//               id="submitbtn2"
//               onClick={handleClear}
//             >
//               <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
//               Clear
//             </button>
//             <button
//               className="btn btn-outline-success btn-margin newButton"
//               style={{ marginRight: 10 , fontSize: 13}}
//               id="submitbtn2"
//               disabled={stuffTally.stuffTallyWoTransId === ''}
//               onClick={downloadSbWiseStuffReport}
//             >
//               <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
//               Print Report
//             </button>
//           </Col>
//         </Row>

//         <Modal Modal isOpen={isModalOpenForCotainerWorkOrder} onClose={closeContainerWiseModal} toggle={closeContainerWiseModal} style={{ maxWidth: '900px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

//           <ModalHeader toggle={closeContainerWiseModal} style={{
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
//               icon={faAdd}
//               style={{
//                 marginRight: '8px',
//                 color: 'white', // Set the color to golden
//               }}
//             /> Add Equipment</h5>



//           </ModalHeader>
//           <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >

//             <Row>
//               <Col md={4}>
//                 <FormGroup>
//                   <label className="forlabel bold-label" htmlFor="sbRequestId">
//                     Vendor
//                   </label>
//                   <Input
//                     className="form-control"
//                     type="select"
//                     id="selectVendor"
//                     name='selectVendor'
//                     value={selectVendor}
//                     onChange={(e) => setSelectVendor(e.target.value)}

//                   >
//                     <option value="">Select Vendor</option>

//                     <option value={getVendor.partyId}>{getVendor.partyName}</option>


//                   </Input>


//                 </FormGroup>
//               </Col>
//               <Col md={8}>
//                 <FormGroup>
//                   <label className="forlabel bold-label" htmlFor="sbRequestId">
//                     Equipment
//                   </label>
//                   <Input
//                     className="form-control"
//                     type="select"
//                     id="selectEquipmend"
//                     name='selectEquipmend'
//                     value={selectEquipmend}
//                     onChange={(e) => setSelectEquipmend(e.target.value)}

//                   >
//                     <option value="">Select Equipment</option>
//                     {getEquipment.map((item, index) => (
//                       <option key={index} value={item.jarDtlId}>{item.jarDtlDesc}</option>
//                     ))}

//                   </Input>

//                 </FormGroup>
//               </Col>
//             </Row>
//             <hr />
//             <Row>
//               <Col className='text-center'>
//                 <button
//                   className="btn btn-outline-primary btn-margin newButton"
//                   style={{ marginRight: 10 }}
//                   id="submitbtn2"
//                   onClick={() => handleContainerSaveEquipment(selectVendor, selectEquipmend)}
//                 >
//                   <FontAwesomeIcon icon={faSave} style={{ marginRight: 5 }} />
//                   Save

//                 </button>
//                 <button
//                   className="btn btn-outline-danger btn-margin newButton"
//                   style={{ marginRight: 10 }}
//                   id="submitbtn2"
//                   onClick={handleContainerEquipmentClear}

//                 >
//                   <FontAwesomeIcon icon={faRefresh} style={{ marginRight: 5 }} />
//                   Clear
//                 </button>



//               </Col>
//             </Row>

//             <div className="mt-3 table-responsive">
//               <table className="table table-bordered table-hover tableHeader">
//                 <thead className="tableHeader">
//                   <tr>

//                     <th scope="col">Sr No</th>
//                     <th scope="col">Container No</th>
//                     <th scope="col">Container Size</th>
//                     <th scope="col">Container Type</th>

//                     <th scope="col">Status</th>

//                   </tr>
//                 </thead>
//                 <tbody>

//                   <tr >

//                     <td>1</td>
//                     <td>{selectedCon.containerNo}</td>
//                     <td>{selectedCon.containerSize}</td>
//                     <td>{selectedCon.containerType}</td>

//                     <td>A</td>

//                   </tr>

//                 </tbody>
//               </table>
//             </div>
//             <div className="mt-3 table-responsive ">
//               <table className="table table-bordered table-hover tableHeader">
//                 <thead className='tableHeader'>
//                   <tr>

//                     <th scope="col">Sr No</th>
//                     <th scope="col">Equipment</th>
//                     <th scope="col">Vendor</th>

//                     <th scope="col">Delete</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {conEquipmentData.map((item, index) => (
//                     <tr
//                       key={index}

//                     >
//                       <td>{index + 1}</td>
//                       <td>{item[0]}</td>
//                       <td>{item[1]}</td>

//                       <td>
//                         <button
//                           className="btn btn-outline-danger btn-margin newButton"
//                           style={{ marginRight: 10 }}
//                           id="submitbtn2"
//                           onClick={() => deleteContainerEquipments(item[2], item[3], item[4])}

//                         >
//                           <FontAwesomeIcon icon={faTrash} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}

//                 </tbody>
//               </table>

//             </div>
//           </ModalBody>
//         </Modal>

//         <div className="table-responsive mt-2">
//           <Table className="table table-bordered table-hover tableHeader">
//             <thead className="thead-dark bg-dark"  >
//               <tr>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Stuff Tally Id</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Stuff Tally Date</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Container No</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Size</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Type</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Gate In Date</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Do No</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Agent Seal <span style={{ color: 'red' }}>*</span></th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Custom Seal <span style={{ color: 'red' }}>*</span></th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Stuff Req Qty</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Stuff Tally Qty <span style={{ color: 'red' }}>*</span></th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Stuff Tally Wt <span style={{ color: 'red' }}>*</span></th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Tare Wt. <span style={{ color: 'red' }}>*</span></th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Cargo Type <span style={{ color: 'red' }}>*</span></th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Status</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>
//                   <Input
//                     type="checkbox"
//                     className="form-check-Input radios"
//                     style={{ width: 25, height: 25 }}
//                     name='selectAll'
//                     id='selectAll'
//                     checked={selectAllChecked}
//                     onChange={handleSelectAll}
//                     onKeyDown={(e) => e.key === "Enter" && handleSelectAll()}
//                   />
//                 </th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Equipment</th>
//               </tr>
//             </thead>
//             <tbody>
//               {stuffTallyDtl.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.stuffTallyId}</td>
//                   <td>
//                     <div style={{ position: 'relative', width: 150 }}>
//                       <DatePicker
//                         selected={item.stuffTallyDate}
//                         name='stuffTallyDate'
//                         id={`stuffTallyDate${index}`}
//                         dateFormat="dd/MM/yyyy HH:mm"
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
//                   <td>{item.containerNo}</td>
//                   <td>{item.containerSize}</td>
//                   <td>{item.containerType}</td>
//                   <td>
//                     <div style={{ position: 'relative', width: 150 }}>
//                       <DatePicker
//                         selected={item.gateInDate}
//                         name='gateInDate'
//                         id={`gateInDate${index}`}
//                         dateFormat="dd/MM/yyyy HH:mm"
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
//                   <td>{item.deliveryOrderNo}</td>
//                   <td>
//                     <Input
//                       className={`form-control ${errors[index]?.agentSealNo ? 'error-border' : ''}`}
//                       type="text"
//                       style={{ width: 150 }}
//                       id={`agentSealNo${index}`}
//                       name='agentSealNo'
//                       maxLength={15}
//                       value={item.agentSealNo}
//                       onChange={(e) => handleStuffTallyDtlChange(e, index)}
//                       disabled={item.reworkFlag === 'Y'}
//                     />
//                   </td>
//                   <td>
//                     <Input
//                       className={`form-control ${errors[index]?.customsSealNo ? 'error-border' : ''}`}
//                       type="text"
//                       style={{ width: 150 }}
//                       id={`customsSealNo${index}`}
//                       name='customsSealNo'
//                       maxLength={15}
//                       value={item.customsSealNo}
//                       onChange={(e) => handleStuffTallyDtlChange(e, index)}
//                       disabled={item.reworkFlag === 'Y'}
//                     />
//                   </td>
//                   <td>{item.stuffRequestQty}</td>
//                   <td>
//                     <Input
//                       className={`form-control ${errors[index]?.stuffedQty ? 'error-border' : ''}`}
//                       type="text"
//                       id={`stuffedQty${index}`}
//                       name='stuffedQty'
//                       value={item.stuffedQty}
//                       onChange={(e) => handleStuffTallyDtlChange(e, index, 8, 0)}
//                       disabled={item.reworkFlag === 'Y'}
//                     />
//                   </td>
//                   <td>
//                     <Input
//                       className={`form-control ${errors[index]?.cargoWeight ? 'error-border' : ''}`}
//                       type="text"
//                       id={`cargoWeight${index}`}
//                       name='cargoWeight'
//                       value={item.cargoWeight}
//                       onChange={(e) => handleStuffTallyDtlChange(e, index, 12, 4)}
//                       disabled={item.reworkFlag === 'Y'}
//                     />
//                   </td>
//                   <td>
//                     <Input
//                       className={`form-control ${errors[index]?.tareWeight ? 'error-border' : ''}`}
//                       type="text"
//                       style={{ width: 120 }}
//                       id={`tareWeight${index}`}
//                       name='tareWeight'
//                       value={item.tareWeight}
//                       onChange={(e) => handleStuffTallyDtlChange(e, index, 12, 3)}
//                       disabled={item.reworkFlag === 'Y'}
//                     />
//                   </td>
//                   <td>
//                     <Input
//                       className={`form-control ${errors[index]?.cargoType ? 'error-border' : ''}`}
//                       type="select"
//                       id={`cargoType${index}`}
//                       name='cargoType'
//                       value={item.cargoType}
//                       style={{ width: 150 }}
//                       onChange={(e) => handleStuffTallyDtlChange(e, index)}
//                       disabled={item.reworkFlag === 'Y'}
//                     >


//                       <option value=""></option>

//                       <option value="Normal">General Cargo</option>

//                       <option value="Special">Special Handling</option>

//                       <option value="OutGauge">Out Gauge Cargo</option>

//                       <option value="Dirty">Dirty Cargo</option>

//                       <option value="Haz">HAZ Cargo</option>

//                       <option value="Loose">Loose Cargo</option>

//                       <option value="Bulk">Bulk Cargo</option>


//                     </Input>
//                   </td>
//                   <td>{item.status === 'A' ? 'Approved' : item.status}</td>
//                   <td>
//                     <input
//                       type="checkbox"
//                       className="form-check-input radios"
//                       style={{ width: 25, height: 25 }}
//                       checked={selectedData.some(selectedItem => selectedItem.containerNo === item.containerNo)}
//                       onChange={() => handleCheckboxChange(item)}
//                       disabled={item.stuffTallyId !== ''}
//                       onKeyDown={(e) => e.key === "Enter" && handleCheckboxChange(item)}
//                     />
//                   </td>
//                   <td className='text-center'>
//                     <button
//                       className="btn btn-outline-primary btn-margin newButton"
//                       style={{ marginRight: 10 }}
//                       id="submitbtn2"
//                       disabled={item.stuffTallyId === '' || item.reworkFlag === 'Y'}
//                       onClick={() => openContainerWiseModal(item)}
//                     >
//                       <FontAwesomeIcon icon={faPlus} />
//                     </button>
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

// export default SBWiseTallyCLP;














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
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faShip, faBackward, faCalendarAlt, faAdd, faPlaneDeparture, faCalculator, faTired, faWheatAwnCircleExclamation, faToriiGate, faPlus, faL, faPrint } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import useAxios from '../Components/useAxios';
import CFSService from '../service/CFSService';
import movementService from "../service/MovementService";
import { toast } from 'react-toastify';
import ipaddress from "../Components/IpAddress";
import moment from 'moment';
import CreatableSelect from 'react-select/creatable';
import { error, map } from 'jquery';
function SBWiseTallyCLP({ searchData, resetFlag, updatePagesList }) {
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


  const axiosInstance = useAxios();
  const MovementService = new movementService(axiosInstance);


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

  const processId = 'P00222';
  const foundRights =
    role !== "ROLE_ADMIN"
      ? userRights.find((item) => item.process_Id === processId)
      : null;
  const allowCreate = foundRights?.allow_Create === "Y";
  const allowRead = foundRights?.allow_Read === "Y";
  const allowEdit = foundRights?.allow_Update === "Y";
  const allowDelete = foundRights?.allow_Delete === "Y";











  useEffect(() => {
    if (searchData && searchData.activeTab === processId && searchData.stuffTallyId && searchData.containerNo) {
      searchDataBySbAndContainerNo(searchData.sbNo, searchData.sbTransId, 'N', 'Y', searchData.containerNo);

      setSearchContainerNo(searchData.containerNo);
      setSearchSbNo(searchData.sbNo);
      setSearchSbTransId(searchData.sbTransId);
      setSaveCheck('Y');
      setNewCheck('N');
      getSbNoForTally1(searchData.containerNo);

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
    sbDate: null,
    movementType: 'CLP',
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
    hsnCode: '',
    vesselId: '',
    vesselName: '',
    voyageNo: '',
    viaNo: '',
    terminal: '',
    pol: '',
    exporterName: '',
    commodity: '',
    consignee: '',
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
    sbPackages: '',
    sbWt: '',
    berthingDate: null,
    gateOpenDate: null,
    deliveryOrderNo: '',
    stuffTallyWoTransId: '',
    stuffTallyCutWoTransDate: null,
    fob: '',
    onAccountOf: '',
    stuffedQuantity: '',
    length: '',
    weight: '',
    height: '',
    odcType: ''
  })

  const [stuffTallyDtl, setStuffTallyDtl] = useState([{
    companyId: '',
    branchId: '',
    stuffTallyId: '',
    stuffId: '',
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
    areaReleased: 0,
    stuffedQty: 0,
    contStuffPackages: 0,
    balanceQty: 0,
    cargoWeight: 0,
    totalCargoWeight: 0,
    containerNo: '',
    stuffTallyDate: null,
    containerSize: '',
    containerType: '',
    tareWeight: '',
    gateInDate: null,
    deliveryOrderNo: '',
    agentSealNo: '',
    customsSealNo: '',
    status: '',
    cargoType: '',
    reworkFlag: '',
    length: '',
    weight: '',
    height: '',
    odcType: ''
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

    if (['tareWeight', 'cargoWeight'].includes(name)) {
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
    if (['stuffedQty', 'tareWeight', 'cargoWeight', 'length', 'weight', 'height'].includes(name)) {
      sanitizedValue = handleInputChange(value, val1, val2);
    }

    if (name === 'stuffedQty') {
      if (sanitizedValue === '') {
        setStuffTallyDtl(prevState => {
          const updatedData = [...prevState];
          updatedData[index] = {
            ...updatedData[index],
            cargoWeight: '',
          };
          return updatedData;
        });
      }
      if (sanitizedValue > stuffTallyDtl[index].stuffRequestQty && stuffTallyDtl[index].stuffTallyId === '') {
        sanitizedValue = ''

        setStuffTallyDtl(prevState => {
          const updatedData = [...prevState];
          updatedData[index] = {
            ...updatedData[index],
            cargoWeight: '',
          };
          return updatedData;
        });
      }
      else {


        if (sanitizedValue > 0) {
          if (stuffTallyDtl[index].stuffTallyId !== '') {
            const incrementVal = stuffTallyDtl.reduce(
              (acc, item) => acc + (item.stuffedQty > item.stuffRequestQty ? (item.stuffedQty - Math.max(item.stuffRequestQty, item.contStuffPackages)) : 0),
              0
            );


            // Calculate the total accepted value by including the specific stuffRequestQty for the current item
            const acceptedVal = remainQuantity > 0 ? (remainQuantity - incrementVal) + Math.max(stuffTallyDtl[index].stuffRequestQty, stuffTallyDtl[index].contStuffPackages) : stuffTallyDtl[index].contStuffPackages;

            if (sanitizedValue > acceptedVal) {
              // Reset sanitizedValue if it exceeds acceptedVal
              sanitizedValue = '';

              // Update state to clear cargoWeight for the item at the specified index
              setStuffTallyDtl(prevState => {
                const updatedData = [...prevState];
                updatedData[index] = {
                  ...updatedData[index],
                  cargoWeight: '', // Clear the cargoWeight field
                };
                return updatedData;
              });
            }

            else {
              let gross = (parseFloat(stuffTallyDtl[index].totalCargoWeight) * parseFloat(sanitizedValue)) / parseFloat(stuffTallyDtl[index].stuffRequestQty)

              setStuffTallyDtl(prevState => {
                const updatedData = [...prevState];
                updatedData[index] = {
                  ...updatedData[index],
                  cargoWeight: handleInputChange(gross, 12, 4),
                };
                return updatedData;
              });
              setErrors(prevErrors => {
                const updatedErrors = Array.isArray(prevErrors) ? [...prevErrors] : [];

                if (updatedErrors[index]) {
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
          else {
            let gross = (parseFloat(stuffTallyDtl[index].totalCargoWeight) * parseFloat(sanitizedValue)) / parseFloat(stuffTallyDtl[index].stuffRequestQty)


            setStuffTallyDtl(prevState => {
              const updatedData = [...prevState];
              updatedData[index] = {
                ...updatedData[index],
                cargoWeight: gross,
              };
              return updatedData;
            });
            setErrors(prevErrors => {
              const updatedErrors = Array.isArray(prevErrors) ? [...prevErrors] : [];

              if (updatedErrors[index]) {
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
    }

    console.log(sanitizedValue);



    setStuffTallyDtl(prevState => {
      const updatedData = [...prevState];
      updatedData[index] = {
        ...updatedData[index],
        [name]: sanitizedValue
      };
      return updatedData;
    });


    // Update igmCrgData state

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
      setFormErrors({
        ...formErrors,
        voyageNo: '',
        vesselName: ''
      });

    }

  }


  const [selectedData, setSelectedData] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  // Handler for individual checkbox
  const handleCheckboxChange = (item) => {
    const isChecked = selectedData.some(selectedItem => selectedItem.containerNo === item.containerNo);

    if (isChecked) {
      // Remove item from selectedData
      const updatedSelection = selectedData.filter(selectedItem => selectedItem.containerNo !== item.containerNo);
      setSelectedData(updatedSelection);

      // Uncheck the header checkbox if not all individual checkboxes are checked
      if (updatedSelection.length !== stuffTallyDtl.length) {
        setSelectAllChecked(false);
      }
    } else {
      // Add item to selectedData
      const updatedSelection = [...selectedData, item];
      setSelectedData(updatedSelection);

      // Check the header checkbox if all individual checkboxes are checked
      if (updatedSelection.length === stuffTallyDtl.length) {
        setSelectAllChecked(true);
      }
    }
  };

  // Header checkbox handler
  const handleSelectAll = () => {
    if (selectAllChecked) {
      // Unselect items where stuffTallyId is an empty string
      let data = selectedData.filter(item => item.stuffTallyId !== '');
      setSelectedData(data);
    } else {

      setSelectedData(stuffTallyDtl);
    }
    setSelectAllChecked(!selectAllChecked);
  };

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

  // Effect to check if all rows are selected
  useEffect(() => {
    if (searchData && searchData.activeTab === 'P00222') {
      if (selectedData.length === stuffTallyDtl.length && stuffTallyDtl.length > 0) {
        setSelectAllChecked(true);
      } else {
        setSelectAllChecked(false);
      }

      getHsnData();
    }
  }, [selectedData, stuffTallyDtl]);

  const [searchSbNo, setSearchSbNo] = useState('');
  const [searchSbTransId, setSearchSbTransId] = useState('');
  const [searchContainerNo, setSearchContainerNo] = useState('');
  const [newCheck, setNewCheck] = useState('N');
  const [saveCheck, setSaveCheck] = useState('N');
  const [searchSbData, setSearchSbData] = useState([]);


  const getSbNoForTally = (id) => {
    if (!id) {
      setSearchSbData([]);
    }


    axios.get(`${ipaddress}stuffTally/getSbNoForTally?cid=${companyid}&bid=${branchId}&sb=${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;
        const sb = data.map(port => ({
          value: port[0],
          label: port[0],
          sbTransId: port[1],
        }))
        console.log('sb ', sb);
        setSearchSbData(sb);

      })
      .catch((error) => {
        setSearchSbData([]);
      })
  }


  const getSbNoForTally1 = (id) => {
    if (!id) {
      setSearchSbData([]);
    }


    axios.get(`${ipaddress}stuffTally/getSbNoForTally1?cid=${companyid}&bid=${branchId}&con=${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;
        const sb = data.map(port => ({
          value: port[0],
          label: port[0],
          sbTransId: port[1],
        }))

        setSearchSbData(sb);

      })
      .catch((error) => {
        setSearchSbData([]);
      })
  }

  const handleSbSelect = async (selectedOption, { action }) => {
    if (action === 'clear') {
      setSearchSbNo('');
      setSearchSbTransId('');
    }
    else {
      setSearchSbNo(selectedOption.value);
      setSearchSbTransId(selectedOption.sbTransId);

    }

  }



  const searchDataBySbAndContainerNo = (searchSbNo, searchSbTransId, newCheck, saveCheck, searchContainerNo) => {
    setLoading(true);

    if (!searchSbNo) {
      toast.error("Please select SB No.", {
        autoClose: 800
      })
      setLoading(false);
      return;
    }

    if (newCheck !== 'Y' && saveCheck !== 'Y') {
      toast.error("Please select between New and Saved checkbox.", {
        autoClose: 800
      })
      setLoading(false);
      return;
    }

    axios.get(`${ipaddress}stuffTally/searchDataForTally?cid=${companyid}&bid=${branchId}&sb=${searchSbNo}&sbTransId=${searchSbTransId}&newCheck=${newCheck}&saveCheck=${saveCheck}&con=${searchContainerNo}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {

        const data = response.data;
        const singleData = data[0];
        setSelectAllChecked(false);
        setSelectedData([]);

        if (newCheck === 'Y') {
          setStuffTally({
            companyId: '',
            branchId: '',
            stuffTallyId: '',
            sbTransId: singleData.sbTransId || '',
            stuffTallyLineId: 0,
            profitcentreId: singleData.profitcentreId || '',
            cartingTransId: '',
            sbLineId: '',
            hsnCode: '',
            cartingLineId: '',
            sbNo: singleData.sbNo || '',
            sbDate: singleData.sbDate === null ? null : new Date(singleData.sbDate),
            movementType: 'CLP',
            stuffTallyDate: new Date(),
            stuffMode: 'Normal',
            status: '',
            createdBy: '',
            stuffId: '',
            stuffDate: null,
            shift: 'Day',
            shippingAgent: singleData.shippingAgent || '',
            shippingLine: singleData.shippingLine || '',
            cargoWeight: '',
            agentSealNo: '',
            customsSealNo: '',
            containerStatus: 'FCL',
            vesselId: singleData.vesselId || '',
            vesselName: singleData.vesselName || '',
            voyageNo: singleData.voyageNo || '',
            viaNo: singleData.viaNo || '',
            terminal: singleData.terminal || '',
            pol: '',
            exporterName: singleData.exporterName || '',
            commodity: singleData.cargoDescription || '',
            consignee: singleData.consignee || '',
            pod: singleData.pod || '',
            finalPod: '',
            periodFrom: null,
            cha: singleData.cha || '',
            haz: 'N',
            sealType: '',
            genSetRequired: 'N',
            docType: '',
            docNo: '',
            rotationNo: singleData.rotationNo || '',
            rotationDate: singleData.rotationDate === null ? null : new Date(singleData.rotationDate),
            sbPackages: singleData.sbPackages || '',
            sbWt: singleData.sbWt || '',
            berthingDate: singleData.berthingDate === null ? null : new Date(singleData.berthingDate),
            gateOpenDate: singleData.gateOpenDate === null ? null : new Date(singleData.gateOpenDate),
            deliveryOrderNo: singleData.deliveryOrderNo || '',
            stuffTallyWoTransId: '',
            stuffTallyCutWoTransDate: null,
            fob: singleData.fob || '',
            onAccountOf: singleData.onAccountOf || '',
            stuffedQuantity: singleData.stuffedQuantity || ''
          });


          setSelectedFinalPod(singleData.finalPod ? { value: singleData.finalPod, label: singleData.finalPod } : null);
          setSelectedPod(singleData.pod ? { value: singleData.pod, label: singleData.pod } : null);
          setSelectedTerminal(singleData.terminal ? { value: singleData.terminal, label: singleData.terminal } : null);


          setStuffTallyDtl(data.map((item, index) => (
            {
              companyId: '',
              branchId: '',
              stuffTallyId: '',
              stuffId: item.stuffReqId || '',
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
              stuffRequestQty: item.noOfPackagesStuffed || 0,
              areaReleased: 0,
              stuffedQty: 0,
              contStuffPackages: 0,
              balanceQty: 0,
              cargoWeight: 0,
              totalCargoWeight: item.cargoWeight || 0,
              containerNo: item.containerNo || '',
              stuffTallyDate: null,
              containerSize: item.containerSize || '',
              containerType: item.containerType || '',
              tareWeight: item.tareWeight || '',
              gateInDate: item.containerGateInDate === null ? null : new Date(item.containerGateInDate),
              deliveryOrderNo: item.deliveryOrderNo || '',
              agentSealNo: item.agentSealNo || '',
              customsSealNo: item.customsSealNo || '',
              status: '',
              cargoType: '',
              reworkFlag: '',
            }
          )));
        }
        else {
          setRemainQuantity(singleData.balanceQty);
          setStuffTally({
            companyId: '',
            branchId: '',
            stuffTallyId: '',
            sbTransId: singleData.sbTransId || '',
            stuffTallyLineId: 0,
            profitcentreId: singleData.profitcentreId || '',
            cartingTransId: '',
            sbLineId: '',
            cartingLineId: '',
            sbNo: singleData.sbNo || '',
            sbDate: singleData.sbDate === null ? null : new Date(singleData.sbDate),
            movementType: singleData.movementType || 'CLP',
            stuffTallyDate: new Date(),
            stuffMode: singleData.stuffMode || 'Normal',
            status: '',
            createdBy: '',
            stuffId: '',
            stuffDate: null,
            shift: 'Day',
            shippingAgent: singleData.shippingAgent || '',
            shippingLine: singleData.shippingLine || '',
            cargoWeight: '',
            agentSealNo: '',
            customsSealNo: '',
            containerStatus: 'FCL',
            vesselId: singleData.vesselId || '',
            vesselName: singleData.vesselName || '',
            voyageNo: singleData.voyageNo || '',
            viaNo: singleData.viaNo || '',
            terminal: singleData.terminal || '',
            pol: '',
            exporterName: singleData.exporterName || '',
            commodity: singleData.commodity || '',
            consignee: singleData.consignee || '',
            pod: singleData.pod || '',
            finalPod: singleData.finalPod || '',
            periodFrom: null,
            cha: singleData.cha || '',
            haz: 'N',
            sealType: '',
            genSetRequired: 'N',
            docType: '',
            docNo: '',
            rotationNo: singleData.rotationNo || '',
            rotationDate: singleData.rotationDate === null ? null : new Date(singleData.rotationDate),
            sbPackages: singleData.sbPackages || '',
            sbWt: singleData.sbWt || '',
            berthingDate: singleData.berthingDate === null ? null : new Date(singleData.berthingDate),
            gateOpenDate: singleData.gateOpenDate === null ? null : new Date(singleData.gateOpenDate),
            deliveryOrderNo: singleData.deliveryOrderNo || '',
            stuffTallyWoTransId: singleData.stuffTallyWoTransId || '',
            stuffTallyCutWoTransDate: singleData.stuffTallyCutWoTransDate === null ? null : new Date(singleData.stuffTallyCutWoTransDate),
            fob: singleData.fob || '',
            onAccountOf: singleData.onAccountOf || '',
            stuffedQuantity: singleData.stuffedQuantity || '',
            status: singleData.status,
            createdBy: singleData.createdBy,
            length: singleData.length || '',
            height: singleData.height || '',
            weight: singleData.weight || '',
            odcType: singleData.odcType || '',
            hsnCode: singleData.hsnCode || '',
          });


          setSelectedFinalPod(singleData.finalPod ? { value: singleData.finalPod, label: singleData.finalPod } : null);
          setSelectedPod(singleData.pod ? { value: singleData.pod, label: singleData.pod } : null);
          setSelectedTerminal(singleData.terminal ? { value: singleData.terminal, label: singleData.terminal } : null);


          let tallyData = [{}];

          tallyData = data.map((item) => (
            {
              companyId: '',
              branchId: '',
              stuffTallyId: item.stuffTallyId || '',
              stuffId: item.stuffId || '',
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
              stuffRequestQty: item.stuffRequestQty || 0,
              areaReleased: 0,
              stuffedQty: item.stuffedQty || 0,
              contStuffPackages: item.stuffedQty || 0,
              balanceQty: 0,
              cargoWeight: item.cargoWeight || 0,
              totalCargoWeight: item.cargoWeight || 0,
              containerNo: item.containerNo || '',
              stuffTallyDate: item.stuffTallyDate === null ? null : new Date(item.stuffTallyDate),
              containerSize: item.containerSize || '',
              containerType: item.containerType || '',
              tareWeight: item.tareWeight || '',
              gateInDate: item.gateInDate === null ? null : new Date(item.gateInDate),
              deliveryOrderNo: item.deliveryOrderNo || '',
              agentSealNo: item.agentSealNo || '',
              customsSealNo: item.customsSealNo || '',
              status: item.status || '',
              cargoType: item.cargoType || '',
              reworkFlag: item.reworkFlag || '',
              length: item.length || '',
              height: item.height || '',
              weight: item.weight || '',
              odcType: item.odcType || ''
            }
          ))

          setStuffTallyDtl(tallyData);
          setSelectedData(tallyData);
          setSelectAllChecked(true);
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

  const [formErrors, setFormErrors] = useState({
    vesselName: '',
    voyageNo: '',
    terminal: '',
    pod: '',
    finalPod: '',
    hsnCode: ''
  })

  const [remainQuantity, setRemainQuantity] = useState('');

  const handleClear = () => {
    setNewCheck('N');
    setSaveCheck('N');
    setSearchSbNo('');
    setSearchSbTransId('');
    setSearchContainerNo('');
    setFormErrors({
      vesselName: '',
      voyageNo: '',
      terminal: '',
      pod: '',
      finalPod: '',
      hsnCode: ''
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
      sbDate: null,
      movementType: 'CLP',
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
      terminal: "",
      pol: '',
      hsnCode: '',
      exporterName: '',
      commodity: '',
      consignee: '',
      pod: '',
      finalPod: "",
      periodFrom: null,
      cha: '',
      haz: 'N',
      sealType: '',
      genSetRequired: 'N',
      docType: '',
      docNo: '',
      rotationNo: "",
      rotationDate: null,
      sbPackages: '',
      sbWt: '',
      berthingDate: null,
      gateOpenDate: null,
      deliveryOrderNo: '',
      stuffTallyWoTransId: '',
      stuffTallyCutWoTransDate: null,
      fob: '',
      onAccountOf: '',
      stuffedQuantity: '',
      length: '',
      height: '',
      weight: '',
      odcType: ''
    })

    setStuffTallyDtl([{
      companyId: '',
      branchId: '',
      stuffTallyId: '',
      sbTransId: '',
      stuffId: '',
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
      areaReleased: 0,
      stuffedQty: 0,
      contStuffPackages: 0,
      balanceQty: 0,
      cargoWeight: 0,
      totalCargoWeight: 0,
      containerNo: '',
      stuffTallyDate: null,
      containerSize: '',
      containerType: '',
      tareWeight: '',
      gateInDate: null,
      deliveryOrderNo: '',
      agentSealNo: '',
      customsSealNo: '',
      status: '',
      cargoType: '',
      reworkFlag: '',
      length: '',
      height: '',
      weight: '',
      odcType: ''
    }]);

    setSelectedFinalPod(null);
    setSelectedPod(null);
    setSelectedTerminal(null);
  }

  const handleSave = () => {
    setLoading(true);
    setFormErrors({
      vesselName: '',
      voyageNo: '',
      terminal: '',
      pod: '',
      finalPod: '',
      hsnCode: ''
    })

    let errors = {};

    const updatedSelectedData = selectedData.map((selectedItem) => {
      const matchingItem = stuffTallyDtl.find(
        (tallyItem) => tallyItem.containerNo === selectedItem.containerNo
      );
      return matchingItem ? { ...matchingItem } : { ...selectedItem };
    });

    // Update the state with the modified list
    setSelectedData(updatedSelectedData);


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

    if (!stuffTally.finalPod) {
      errors.finalPod = "Final pod is required."
    }

    if (!stuffTally.hsnCode) {
      errors.hsnCode = "HSN code is required."
    }


    if (Object.keys(errors).length > 0) {
      setLoading(false);
      setFormErrors(errors);
      toast.error("Please fill in the required fields.", {
        autoClose: 1000
      })
      return;
    }

    let newErrors = updatedSelectedData.map(() => ({}));
    setErrors([]);

    updatedSelectedData.forEach((data, index) => {
      let rowErrors = {};
      console.log('data.cargoType ', data.cargoType);

      if (!data.stuffedQty) rowErrors.stuffedQty = "Stuffed quantity is required.";
      if (!data.cargoWeight) rowErrors.cargoWeight = "Gross wt is required.";
      if (!data.agentSealNo) rowErrors.agentSealNo = "Agent seal no is required.";
      if (!data.customsSealNo) rowErrors.customsSealNo = "Custom seal no is required.";
      if (!data.tareWeight) rowErrors.tareWeight = "Tare wt is required.";
      if (!data.cargoType) rowErrors.cargoType = "Cargo type is required.";

      if (data.cargoType === "OutGauge") {
        if (!data.length || data.length <= 0) rowErrors.length = "Length is required and must be greater than 0.";
        if (!data.height || data.height <= 0) rowErrors.height = "Height is required and must be greater than 0.";
        if (!data.weight || data.weight <= 0) rowErrors.weight = "Weight is required and must be greater than 0.";
        if (!data.odcType) rowErrors.odcType = "ODC Type is required.";
      }
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

    let newTallyData = updatedSelectedData.filter(item => item.containerNo !== '' || item.reworkFlag !== 'Y');

    if (newTallyData.length === 0) {
      toast.error("Please select atleast one container", {
        autoClose: 800
      })
      setLoading(false);
      return;
    }

    console.log('newTallyData ', newTallyData);


    const formData = {
      singleTally: stuffTally,
      tally: newTallyData
    }

    axios.post(`${ipaddress}stuffTally/saveSbWiseTallyRecord?cid=${companyid}&bid=${branchId}&user=${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;
        const singleData = data[0];

        // console.log('balanceQty ', singleData.balanceQty);


        setRemainQuantity(singleData.balanceQty);

        setStuffTally({
          companyId: '',
          branchId: '',
          stuffTallyId: '',
          sbTransId: singleData.sbTransId || '',
          stuffTallyLineId: 0,
          profitcentreId: singleData.profitcentreId || '',
          cartingTransId: '',
          sbLineId: '',
          cartingLineId: '',
          sbNo: singleData.sbNo || '',
          sbDate: singleData.sbDate === null ? null : new Date(singleData.sbDate),
          movementType: singleData.movementType || 'CLP',
          stuffTallyDate: new Date(),
          stuffMode: singleData.stuffMode || 'Normal',
          status: singleData.status || '',
          createdBy: singleData.createdBy || '',
          stuffId: '',
          stuffDate: null,
          shift: 'Day',
          shippingAgent: singleData.shippingAgent || '',
          shippingLine: singleData.shippingLine || '',
          cargoWeight: '',
          agentSealNo: '',
          customsSealNo: '',
          containerStatus: 'FCL',
          vesselId: singleData.vesselId || '',
          vesselName: singleData.vesselName || '',
          voyageNo: singleData.voyageNo || '',
          viaNo: singleData.viaNo || '',
          terminal: singleData.terminal || '',
          pol: '',
          exporterName: singleData.exporterName || '',
          commodity: singleData.commodity || '',
          consignee: singleData.consignee || '',
          pod: singleData.pod || '',
          finalPod: singleData.finalPod || '',
          periodFrom: null,
          cha: singleData.cha || '',
          haz: 'N',
          sealType: '',
          genSetRequired: 'N',
          docType: '',
          docNo: '',
          rotationNo: singleData.rotationNo || '',
          rotationDate: singleData.rotationDate === null ? null : new Date(singleData.rotationDate),
          sbPackages: singleData.sbPackages || '',
          sbWt: singleData.sbWt || '',
          berthingDate: singleData.berthingDate === null ? null : new Date(singleData.berthingDate),
          gateOpenDate: singleData.gateOpenDate === null ? null : new Date(singleData.gateOpenDate),
          deliveryOrderNo: singleData.deliveryOrderNo || '',
          stuffTallyWoTransId: singleData.stuffTallyWoTransId || '',
          stuffTallyCutWoTransDate: singleData.stuffTallyCutWoTransDate === null ? null : new Date(singleData.stuffTallyCutWoTransDate),
          fob: singleData.fob || '',
          onAccountOf: singleData.onAccountOf || '',
          stuffedQuantity: singleData.stuffedQuantity || '',
          length: singleData.length || '',
          height: singleData.height || '',
          weight: singleData.weight || '',
          odcType: singleData.odcType || '',
          hsnCode: singleData.hsnCode || '',
        })

        let tallyData = [{}];

        tallyData = data.map((item) => (
          {
            companyId: '',
            branchId: '',
            stuffTallyId: item.stuffTallyId || '',
            stuffId: item.stuffId || '',
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
            stuffRequestQty: item.stuffRequestQty || 0,
            contStuffPackages: item.stuffedQty || 0,
            areaReleased: 0,
            stuffedQty: item.stuffedQty || 0,
            balanceQty: 0,
            cargoWeight: item.cargoWeight || 0,
            totalCargoWeight: item.cargoWeight || 0,
            containerNo: item.containerNo || '',
            stuffTallyDate: item.stuffTallyDate === null ? null : new Date(item.stuffTallyDate),
            containerSize: item.containerSize || '',
            containerType: item.containerType || '',
            tareWeight: item.tareWeight || '',
            gateInDate: item.gateInDate === null ? null : new Date(item.gateInDate),
            deliveryOrderNo: item.deliveryOrderNo || '',
            agentSealNo: item.agentSealNo || '',
            customsSealNo: item.customsSealNo || '',
            status: item.status || '',
            cargoType: item.cargoType || '',
            reworkFlag: item.reworkFlag || '',
            length: item.length || '',
            height: item.height || '',
            weight: item.weight || '',
            odcType: item.odcType || ''

          }
        ))
        setSelectAllChecked(true);
        setStuffTallyDtl(tallyData);
        setSelectedData(tallyData);

        setLoading(false);

        if (searchData && (searchData.sbNo || searchData.container)
        ) {
          updatePagesList("P00222");
        }

        toast.success("Data save successfully!!!", {
          autoClose: 800
        })


      })
      .catch((error) => {
        toast.error(error.response.data, {
          autoClose: 800
        })

        setLoading(false);
      })

  }

  const [isModalOpenForCotainerWorkOrder, setisModalOpenForCotainerWorkOrder] = useState(false);
  const [selectedCon, setSelectedCon] = useState({});

  const openContainerWiseModal = (item) => {
    setisModalOpenForCotainerWorkOrder(true);
    getVendorAndEquipment();
    getContainerWiseEquipmentData(item);
    setSelectedCon(item);
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
    setSelectedCon({});
  }

  const handleContainerEquipmentClear = () => {
    setSelectVendor('');
    setSelectEquipmend('');
  }

  const [conEquipmentData, setConEquipmentData] = useState([]);

  const getContainerWiseEquipmentData = (item) => {
    const params = new URLSearchParams({
      companyId: companyid,
      branchId: branchId,
      con: item.containerNo,
      val1: item.stuffTallyId,
      val2: item.stuffId
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
      stuffId: selectedCon.stuffTallyId,
      finYear: new Date().getFullYear(),
      container: selectedCon.containerNo
    }).toString();

    // Send the POST request with query parameters and body
    axios.post(`${ipaddress}equipmentActivity/saveStuffTallySbWiseContainerEquipment?${params}`, null, {
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
        getContainerWiseEquipmentData(selectedCon);
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
          container: selectedCon.containerNo
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
            getContainerWiseEquipmentData(selectedCon);
          })
          .catch((error) => {
            toast.error(error.response.data, {
              autoClose: 800
            })
          })

      }
    });
  }

  const downloadSbWiseStuffReport = () => {


    setLoading(true);
    axios
      .post(
        `${ipaddress}exportReport/exportSBWiseStuffTallyReport?cid=${companyid}&bid=${branchId}&id=${stuffTally.sbTransId}&sb=${stuffTally.sbNo}`,
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
            icon={faCalculator}
            style={{
              marginRight: "8px",
              color: "black", // Set the color to golden
            }}
          />
          SB Wise Tally/CLP
          <hr />
        </h5> */}
        <Row>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="searchSbNo">
                SB No
              </label>
              <Select
                value={{ value: searchSbNo, label: searchSbNo }}
                onChange={handleSbSelect}
                onInputChange={getSbNoForTally}
                options={searchSbData}
                placeholder="Select SB No"
                isClearable
                // id="searchSbNo"
                name='searchSbNo'
                className={`autocompleteHeight`}
                isDisabled={searchData.stuffTallyId}
                id={searchData.stuffTallyId ? 'service' : ' '}
                // readOnly = {searchData.stuffTallyId}
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
                Container No
              </label>
              <Input
                className="form-control"
                type="text"
                id={searchData.stuffTallyId ? 'service' : ' '}
                readOnly={searchData.stuffTallyId}
                name='searchContainerNo'
                value={searchContainerNo}
                onChange={(e) => { setSearchContainerNo(e.target.value); getSbNoForTally1(e.target.value); }}
              />
            </FormGroup>
          </Col>
          <Col md={1}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                New
              </label>
              <Input
                type="checkbox"
                name="newCheck"
                id="newCheck"
                className="form-control inputField"
                checked={newCheck === 'Y'}
                disabled={saveCheck === 'Y'}
                onChange={(e) => setNewCheck(e.target.checked ? 'Y' : 'N')}
                style={{ height: 25, borderColor: 'black' }}
              />

            </FormGroup>
          </Col>
          <Col md={1}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Saved
              </label>
              <Input
                type="checkbox"
                name="saveCheck"
                id="saveCheck"
                className="form-control inputField"
                checked={saveCheck === 'Y'}
                // disabled={newCheck === 'Y'}
                disabled={newCheck === 'Y' || searchData.stuffTallyId}
                onChange={(e) => setSaveCheck(e.target.checked ? 'Y' : 'N')}
                style={{ height: 25, borderColor: 'black' }}
              />

            </FormGroup>
          </Col>


          <Col md={2} style={{ marginTop: 22 }}>
            <button
              className="btn btn-outline-primary btn-margin newButton"
              style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onClick={(e) => searchDataBySbAndContainerNo(searchSbNo, searchSbTransId, newCheck, saveCheck, searchContainerNo)}
              disabled={searchData.stuffTallyId}
            >
              <FontAwesomeIcon icon={faSearch} size="sm" />
            </button>
          </Col>





          {/* <Col md={2}>
            <button
              className="btn btn-outline-primary btn-margin newButton"
              style={{ marginTop: 18 }}
              id="submitbtn2"
              onClick={(e) => searchDataBySbAndContainerNo(searchSbNo, searchSbTransId, newCheck, saveCheck, searchContainerNo)}
              disabled={searchData.stuffTallyId}
            >
              <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
              Search
            </button>
          </Col> */}
        </Row>



        <hr style={{ margin: 0, padding: 0 }} />

        <Row className='mt-2'>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                SB Trans ID
              </label>
              <Input
                className="form-control"
                type="text"
                id="sbTransId"
                name='sbTransId'
                value={stuffTally.sbTransId}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                SB No
              </label>
              <Input
                className="form-control"
                type="text"
                id="sbNo"
                name='sbNo'
                value={stuffTally.sbNo}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                SB Date
              </label>
              <div style={{ position: 'relative' }}>
                <DatePicker
                  selected={stuffTally.sbDate}
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
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Movement Type
              </label>
              <Input
                className="form-control"
                type="select"
                id="movementType"
                name='movementType'
                value={stuffTally.movementType}
                onChange={(e) => handleStuffTallyChange(e)}
              >
                <option value="CLP">CLP</option>
                <option value="Buffer" selected="">FactoryStuffing/Buffer/Export FCL</option>
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
                id="consignee"
                name='consignee'
                value={stuffTally.status === 'A' ? 'Approved' : ''}
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
                id="commodity"
                name='commodity'
                value={stuffTally.createdBy}
                disabled
              />
            </FormGroup>
          </Col>




        </Row>
        <Row>



          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Consignee
              </label>
              <Input
                className="form-control"
                type="text"
                id="consignee"
                name='consignee'
                value={stuffTally.consignee}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Commodity
              </label>
              <Input
                className="form-control"
                type="text"
                id="commodity"
                name='commodity'
                value={stuffTally.commodity}
                disabled
              />
            </FormGroup>
          </Col>



          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Exporter
              </label>
              <Input
                className="form-control"
                type="text"
                id="exporterName"
                name='exporterName'
                value={stuffTally.exporterName}
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
                disabled
              />
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
                disabled
              />
            </FormGroup>
          </Col>


          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                FOB
              </label>
              <Input
                className="form-control"
                type="text"
                id="fob"
                name='fob'
                value={stuffTally.fob}
                disabled
              />
            </FormGroup>
          </Col>



        </Row>
        <Row>



          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                SB Packages
              </label>
              <Input
                className="form-control"
                type="text"
                id="sbPackages"
                name='sbPackages'
                value={stuffTally.sbPackages}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                SB Weight
              </label>
              <Input
                className="form-control"
                type="text"
                id="sbWt"
                name='sbWt'
                value={stuffTally.sbWt}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Total Stuff Packages
              </label>
              <Input
                className="form-control"
                type="text"
                id="stuffedQuantity"
                name='stuffedQuantity'
                value={stuffTally.stuffedQuantity}
                disabled
              />
            </FormGroup>
          </Col>


          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Vessel
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
              {/* <div style={{ color: 'red' }} className="error-message">{formErrors.voyageNo}</div> */}
            </FormGroup>
            <div style={{ color: 'red' }} className="error-message">{formErrors.voyageNo}</div>
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
                Port Of Discharge <span style={{ color: 'red' }}>*</span>
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


          {/* <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Final POD <span style={{ color: 'red' }}>*</span>
              </label>
              <Input
                className={`form-control ${formErrors.finalPod ? 'error-border' : ''}`}
                type="text"
                id="finalPod"
                name='finalPod'
                value={stuffTally.finalPod}
                onChange={(e) => handleStuffTallyChange(e)}
                maxLength={40}
              />
              <div style={{ color: 'red' }} className="error-message">{formErrors.finalPod}</div>
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
          {/* <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Terminal Name <span style={{ color: 'red' }}>*</span>
              </label>
              <Input
                className={`form-control ${formErrors.terminal ? 'error-border' : ''}`}
                type="text"
                id="terminal"
                name='terminal'
                value={stuffTally.terminal}
                onChange={(e) => handleStuffTallyChange(e)}
                maxLength={10}
              />
              <div style={{ color: 'red' }} className="error-message">{formErrors.terminal}</div>
            </FormGroup>
          </Col> */}






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
                HSN Code <span className="error-message">*</span>
              </label>
              <Input
                className={`form-control ${formErrors.hsnCode ? 'error-border' : ''}`}
                type="select"
                id="hsnCode"
                name='hsnCode'
                value={stuffTally.hsnCode}
                onChange={(e) => handleStuffTallyChange(e)}
              >
                <option value="">Selet HSN Code</option>
                {hsnData.map((item, index) => (
                  <option key={index} value={item[0]}>{item[1]}</option>
                ))}

              </Input>
              <div style={{ color: 'red' }} className="error-message">{formErrors.hsnCode}</div>

            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                CHA
              </label>
              <Input
                className="form-control"
                type="text"
                id="cha"
                name='cha'
                value={stuffTally.cha}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                On Account Of
              </label>
              <Input
                className="form-control"
                type="text"
                id="onAccountOf"
                name='onAccountOf'
                value={stuffTally.onAccountOf}
                disabled
              />
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
                onChange={(e) => handleInputChange(e)}
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
                Job Order
              </label>
              <Input
                className="form-control"
                type="text"
                id="stuffTallyWoTransId"
                name='stuffTallyWoTransId'
                value={stuffTally.stuffTallyWoTransId}
                disabled
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


        </Row>
        <Row className='text-center'>
          <Col>
            <button
              className="btn btn-outline-primary btn-margin newButton"
              style={{ marginRight: 10, fontSize: 13 }}
              id="submitbtn2"
              onClick={handleSave}
            >
              <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
              Save
            </button>
            <button
              className="btn btn-outline-danger btn-margin newButton"
              style={{ marginRight: 10, fontSize: 13 }}
              id="submitbtn2"
              onClick={handleClear}
            >
              <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
              Clear
            </button>
            <button
              className="btn btn-outline-success btn-margin newButton"
              style={{ marginRight: 10, fontSize: 13 }}
              id="submitbtn2"
              disabled={stuffTally.stuffTallyWoTransId === ''}
              onClick={downloadSbWiseStuffReport}
            >
              <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
              Print Report
            </button>
          </Col>
        </Row>

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
                    <td>{selectedCon.containerNo}</td>
                    <td>{selectedCon.containerSize}</td>
                    <td>{selectedCon.containerType}</td>

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

        <div className="table-responsive mt-2">
          <Table className="table table-bordered table-hover tableHeader">
            <thead className="thead-dark bg-dark"  >
              <tr>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Stuff Tally Id</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Stuff Tally Date</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Container No</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Size</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Type</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Gate In Date</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Do No</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Agent Seal <span style={{ color: 'red' }}>*</span></th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Custom Seal <span style={{ color: 'red' }}>*</span></th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Stuff Req Qty</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Stuff Tally Qty <span style={{ color: 'red' }}>*</span></th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Stuff Tally Wt <span style={{ color: 'red' }}>*</span></th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Tare Wt. <span style={{ color: 'red' }}>*</span></th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Cargo Type <span style={{ color: 'red' }}>*</span></th>

                <th scope="col" className="text-center" style={{ color: 'black' }}>Type Of ODC</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Length</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Weight</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Height</th>


                <th scope="col" className="text-center" style={{ color: 'black' }}>Status</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>
                  <Input
                    type="checkbox"
                    className="form-check-Input radios"
                    style={{ width: 25, height: 25 }}
                    name='selectAll'
                    id='selectAll'
                    checked={selectAllChecked}
                    onChange={handleSelectAll}
                    onKeyDown={(e) => e.key === "Enter" && handleSelectAll()}
                  />
                </th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Equipment</th>
              </tr>
            </thead>
            <tbody>
              {stuffTallyDtl.map((item, index) => (
                <tr key={index}>
                  <td>{item.stuffTallyId}</td>
                  <td>
                    <div style={{ position: 'relative', width: 150 }}>
                      <DatePicker
                        selected={item.stuffTallyDate}
                        name='stuffTallyDate'
                        id={`stuffTallyDate${index}`}
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
                  <td>{item.containerNo}</td>
                  <td>{item.containerSize}</td>
                  <td>{item.containerType}</td>
                  <td>
                    <div style={{ position: 'relative', width: 150 }}>
                      <DatePicker
                        selected={item.gateInDate}
                        name='gateInDate'
                        id={`gateInDate${index}`}
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
                  <td>{item.deliveryOrderNo}</td>
                  <td>
                    <Input
                      className={`form-control ${errors[index]?.agentSealNo ? 'error-border' : ''}`}
                      type="text"
                      style={{ width: 150 }}
                      id={`agentSealNo${index}`}
                      name='agentSealNo'
                      maxLength={15}
                      value={item.agentSealNo}
                      onChange={(e) => handleStuffTallyDtlChange(e, index)}
                      disabled={item.reworkFlag === 'Y'}
                    />
                  </td>
                  <td>
                    <Input
                      className={`form-control ${errors[index]?.customsSealNo ? 'error-border' : ''}`}
                      type="text"
                      style={{ width: 150 }}
                      id={`customsSealNo${index}`}
                      name='customsSealNo'
                      maxLength={15}
                      value={item.customsSealNo}
                      onChange={(e) => handleStuffTallyDtlChange(e, index)}
                      disabled={item.reworkFlag === 'Y'}
                    />
                  </td>
                  <td>{item.stuffRequestQty}</td>
                  <td>
                    <Input
                      className={`form-control ${errors[index]?.stuffedQty ? 'error-border' : ''}`}
                      type="text"
                      id={`stuffedQty${index}`}
                      name='stuffedQty'
                      value={item.stuffedQty}
                      onChange={(e) => handleStuffTallyDtlChange(e, index, 8, 0)}
                      disabled={item.reworkFlag === 'Y'}
                    />
                  </td>
                  <td>
                    <Input
                      className={`form-control ${errors[index]?.cargoWeight ? 'error-border' : ''}`}
                      type="text"
                      id={`cargoWeight${index}`}
                      name='cargoWeight'
                      value={item.cargoWeight}
                      onChange={(e) => handleStuffTallyDtlChange(e, index, 12, 4)}
                      disabled={item.reworkFlag === 'Y'}
                    />
                  </td>
                  <td>
                    <Input
                      className={`form-control ${errors[index]?.tareWeight ? 'error-border' : ''}`}
                      type="text"
                      style={{ width: 120 }}
                      id={`tareWeight${index}`}
                      name='tareWeight'
                      value={item.tareWeight}
                      onChange={(e) => handleStuffTallyDtlChange(e, index, 12, 3)}
                      disabled={item.reworkFlag === 'Y'}
                    />
                  </td>
                  <td>
                    <Input
                      className={`form-control ${errors[index]?.cargoType ? 'error-border' : ''}`}
                      type="select"
                      id={`cargoType${index}`}
                      name='cargoType'
                      value={item.cargoType}
                      style={{ width: 150 }}
                      onChange={(e) => handleStuffTallyDtlChange(e, index)}
                      disabled={item.reworkFlag === 'Y'}
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
                  </td>


                  <td>
                    <Input
                      className={`form-control ${errors[index]?.odcType ? 'error-border' : ''}`}
                      type="select"
                      id={`odcType${index}`}
                      name='odcType'
                      value={item.odcType}
                      style={{ width: 150 }}
                      onChange={(e) => handleStuffTallyDtlChange(e, index)}
                      disabled={item.reworkFlag === 'Y'}
                    >
                      <option value=""></option>

                      <option value="Heavy Machinery and Equipment">Heavy Machinery and Equipment</option>

                      <option value="Large Structures and Components">Large Structures and Components</option>

                      <option value="Offshore and Energy Equipment">Offshore and Energy Equipment</option>

                    </Input>
                  </td>



                  <td>
                    <Input
                      className={`form-control inputwidthTukaMin ${errors[index]?.length ? 'error-border' : ''}`}
                      type="text"
                      id={`length${index}`}
                      name='length'
                      value={item.length}
                      onChange={(e) => handleStuffTallyDtlChange(e, index, 16, 3)}
                      disabled={item.reworkFlag === 'Y'}
                    />
                  </td>
                  <td>
                    <Input
                      className={`form-control inputwidthTukaMin ${errors[index]?.weight ? 'error-border' : ''}`}
                      type="text"
                      style={{ width: 120 }}
                      id={`weight${index}`}
                      name='weight'
                      value={item.weight}
                      onChange={(e) => handleStuffTallyDtlChange(e, index, 16, 3)}
                      disabled={item.reworkFlag === 'Y'}
                    />
                  </td>

                  <td>
                    <Input
                      className={`form-control inputwidthTukaMin ${errors[index]?.height ? 'error-border' : ''}`}
                      type="text"
                      style={{ width: 120 }}
                      id={`height${index}`}
                      name='height'
                      value={item.height}
                      onChange={(e) => handleStuffTallyDtlChange(e, index, 16, 3)}
                      disabled={item.reworkFlag === 'Y'}
                    />
                  </td>

























                  <td>{item.status === 'A' ? 'Approved' : item.status}</td>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input radios"
                      style={{ width: 25, height: 25 }}
                      checked={selectedData.some(selectedItem => selectedItem.containerNo === item.containerNo)}
                      onChange={() => handleCheckboxChange(item)}
                      disabled={item.stuffTallyId !== ''}
                      onKeyDown={(e) => e.key === "Enter" && handleCheckboxChange(item)}
                    />
                  </td>
                  <td className='text-center'>
                    <button
                      className="btn btn-outline-primary btn-margin newButton"
                      style={{ marginRight: 10 }}
                      id="submitbtn2"
                      disabled={item.stuffTallyId === '' || item.reworkFlag === 'Y'}
                      onClick={() => openContainerWiseModal(item)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
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

export default SBWiseTallyCLP;