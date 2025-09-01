// import AuthContext from "../Components/AuthProvider";
// import { useLocation, useNavigate } from "react-router-dom";
// import React, { useEffect, useState, useContext } from "react";
// import "../Components/Style.css";
// import Select from "react-select";
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
// } from "@fortawesome/free-solid-svg-icons";
// import "../assets/css/style.css";
// import "../Components/Style.css";
// import { Button } from "react-bootstrap";
// import useAxios from "../Components/useAxios";
// import { toast } from "react-toastify";
// import moment from "moment";
// import cfsService from "../service/CFSService";
// import movementService from "../service/MovementService";

// function SBTransferProcess() {
//   const navigate = useNavigate();
//   const { isAuthenticated } = useContext(AuthContext);

//   const axiosInstance = useAxios();
//   const CFSService = new cfsService(axiosInstance);
//   const MovementService = new movementService(axiosInstance);

//   const [profitcentre, setProfitcentre] = useState({
//     profitcentreId: '',
//     profitcentreDesc: ''
//   });

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

//   const getProgitCenterById = async (profitCenterId) => {
//     try {
//       const response = await CFSService.getProgitCenterById(companyid, branchId, profitCenterId, jwtToken);
//       setProfitcentre(response.data);
//       setExportTransfer(prevState => ({
//         ...prevState,
//         profitcentreId: response.data?.profitcentreId || null
//       }));

//       setExportTransferDetail(prevState =>
//         prevState.map(item => ({
//           ...item,
//           profitcentreId: response.data.profitcentreId
//         }))
//       );
//     } catch (error) {
//       console.error('Error fetching port data:', error);
//     }
//   };

//   const [totals, setTotals] = useState({
//     packages: 0,
//   });



//   useEffect(() => {
//     const fetchData = async () => {
//       await getProgitCenterById('N00004');
//     };
//     fetchData();
//   }, []);



//   const location = useLocation();
//   const [loading, setLoading] = useState(false);

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


//   const [fromSbNos, setFromSbNos] = useState([]);
//   const [selectedFromSbNo, setSelectedFromSbNo] = useState([]);

//   const [toSbNos, setToSbNos] = useState([]);
//   const [selectedToSbNo, setSelectedToSbNo] = useState([]);

//   const initialExportTransfer = {
//     companyId: companyid, // String, assuming it's the company id
//     branchId: branchId,  // String, assuming it's the branch id
//     sbChangeTransId: '',  // String
//     srNo: '',  // String
//     finYear: '',  // String
//     profitcentreId: profitcentre.profitcentreId,  // String
//     sbTransId: '',  // String
//     trfSbTransId: '',  // String
//     sbLineNo: '',  // String
//     trfSbLineNo: '',  // String
//     sbNo: '',  // String
//     trfSbNo: '',  // String
//     sbChangeTransDate: null,  // Date (can be a string or Date object depending on usage)
//     sbTransDate: null,  // Date
//     exporterName: '',  // String
//     onAccountOf: '',  // String
//     transferPackages: 0,  // BigDecimal (number type in JS)
//     transferGrossWeight: 0.0,  // BigDecimal (number type in JS)
//     sbDate: null,  // Date
//     trfSbDate: '',  // Date
//     noOfPackages: 0,  // BigDecimal (number type in JS)
//     trfNoOfPackages: 0,  // BigDecimal (number type in JS)
//     gateInPackages: 0,  // BigDecimal (number type in JS)
//     trfGateInPackages: 0,  // BigDecimal (number type in JS)
//     cartedPackages: 0,  // BigDecimal (number type in JS)
//     trfCartedPackages: 0,  // BigDecimal (number type in JS)
//     nilPackages: 0,  // BigDecimal (number type in JS)
//     grossWeight: 0.0,  // BigDecimal (number type in JS)
//     trfGrossWeight: 0.0,  // BigDecimal (number type in JS)
//     gateInWeight: 0.0,  // BigDecimal (number type in JS)
//     trfGateInWeight: 0.0,  // BigDecimal (number type in JS)
//     cartedWeight: 0.0,  // BigDecimal (number type in JS)
//     trfCartedWeight: 0.0,  // BigDecimal (number type in JS)
//     prevTransferPack: 0,  // BigDecimal (number type in JS)
//     stuffedQty: 0,  // BigDecimal (number type in JS)
//     backToTownPack: 0,  // BigDecimal (number type in JS)
//     commodity: '',  // String
//     toCommodity: '',  // String
//     comments: '',  // String
//     status: '',  // String
//     createdBy: '',  // String
//     createdDate: '',  // Date
//     editedBy: '',  // String
//     editedDate: '',  // Date
//     approvedBy: '',  // String
//     approvedDate: '',  // Date
//     nilFlag: '',  // String
//     exporterName: '',
//     chaName: '',
//     preTranferedPackages: 0,
//     maxQuantity: 0,
//   };



//   const initialExportTransferDetail = {
//     companyId: companyid,
//     branchId: branchId,
//     finYear: "",
//     sbChangeTransId: "",
//     transLineId: "",
//     cartingTransId: "",
//     cartingLineId: "",
//     sbTransId: "",
//     vehicleNo: "",
//     gateInId: "",
//     sbNo: "",
//     sbLineNo: "",
//     trfSbTransId: "",
//     trfSbNo: "",
//     trfSbLineNo: "",
//     cartingPackages: 0,
//     outPkgs: 0,
//     balancePkgs: 0,
//     trfCartedPackages: 0,
//     nilPackages: 0,
//     cartedWeight: 0.0,
//     trfCartedWeight: 0.0,
//     status: "",
//     createdBy: "",
//     createdDate: "", // Store date as string or Date object, depending on your use case
//     editedBy: "",
//     editedDate: "", // Store date as string or Date object, depending on your use case
//     approvedBy: "",
//     approvedDate: "", // Store date as string or Date object, depending on your use case
//     gateInDate: null,
//     gateInPackages: 0,
//     cha: '',
//     onAccountOf: '',
//     grossWeight: 0,
//     trfGateInWeight: 0,
//     gateInWeight: 0,
//     trfGateInPackages: 0,
//     gateInPackages: 0
//   };



//   const [exportTransfer, setExportTransfer] = useState(initialExportTransfer);
//   const [exportTransferDetail, setExportTransferDetail] = useState([initialExportTransferDetail]);



//   const [validationErrors, setValidationErrors] = useState([]);
//   const [validationErrorsGateIns, setValidationErrorsGateIns] = useState([]);



//   useEffect(() => {
//     const totalTransferPkg = exportTransferDetail.reduce((acc, item) => acc + (Number(item.trfGateInPackages) || 0), 0);
//     setTotals({
//       packages: totalTransferPkg,
//     });
//   }, [exportTransferDetail]);

//   const handleFromSbNoChange = async (selectedOption) => {
//     // Update selectedSbNos   
//     setSelectedFromSbNo(selectedOption); // Update the state
//     const updates = selectedOption ? {
//       sbTransId: selectedOption.sbTransId,
//       sbLineNo: selectedOption.sbLineNo,
//       sbNo: selectedOption.sbNo,
//       sbTransDate: selectedOption.sbTransDate ? new Date(selectedOption.sbTransDate) : null,
//       exporter: selectedOption.exporterId,
//       cha: selectedOption.cha,
//       onAccountOf: selectedOption.onAccountOf,
//       transferPackages: 0,
//       transferGrossWeight: 0,
//       sbDate: selectedOption.sbDate ? new Date(selectedOption.sbDate) : null,
//       noOfPackages: selectedOption.noOfPackages,
//       gateInPackages: selectedOption.gateInPackages,
//       cartedPackages: selectedOption.cartedPackages,
//       nilPackages: 0,
//       grossWeight: selectedOption.grossWeight,
//       gateInWeight: 0,
//       cartedWeight: 0,
//       prevTransferPack: selectedOption.transferPackages,
//       stuffedQty: selectedOption.stuffReqQty,
//       backToTownPack: selectedOption.backToTownPack,
//       commodity: selectedOption.commodity,
//       exporterName: selectedOption.exporterName,
//       chaName: selectedOption.chaName,
//       preTranferedPackages: selectedOption.transferPackages,
//       maxQuantity: selectedOption.maxQuantity
//     } :
//       {
//         sbTransId: '',
//         sbLineNo: '',
//         sbNo: '',
//         sbTransDate: null,
//         exporter: '',
//         cha: '',
//         onAccountOf: '',
//         transferPackages: 0,
//         transferGrossWeight: 0,
//         sbDate: null,
//         noOfPackages: 0,
//         gateInPackages: 0,
//         cartedPackages: 0,
//         nilPackages: 0,
//         grossWeight: 0,
//         gateInWeight: 0,
//         cartedWeight: 0,
//         prevTransferPack: 0,
//         stuffedQty: 0,
//         backToTownPack: 0,
//         commodity: '',
//         exporterName: '',
//         chaName: '',
//         stuffedQty: 0,
//         preTranferedPackages: 0,
//         comments: '',
//         maxQuantity: 0
//       }


//     if (selectedOption) {
//       setExportTransfer((prevState) => ({
//         ...prevState,
//         ...updates,
//       }));
//       await gateTateInEntriesFromSbNo(selectedOption.sbNo, selectedOption.sbLineNo, selectedOption.sbTransId);

//     } else {
//       setExportTransferDetail([initialExportTransferDetail]);
//       setExportTransfer(initialExportTransfer);
//       setSelectedToSbNo(null);
//     }

//     setValidationErrors((prevErrors) => ({
//       ...prevErrors,
//       sbNo: '',
//     }));
//   }

//   const gateTateInEntriesFromSbNo = async (sbNo, sbLineNo, sbTransId) => {
//     try {
//       const response = await MovementService.gateTateInEntriesFromSbNo(companyid, branchId, profitcentre.profitcentreId, sbNo, sbLineNo, sbTransId, jwtToken);

//       console.log("transfer Detail ", response.data);

//       if (Array.isArray(response.data)) {
//         setExportTransferDetail(response.data);
//       } else {
//         setExportTransferDetail([]);
//       }
//     } catch (error) {
//       console.log("Error getting gateIn entries", error);
//       setExportTransferDetail([]);
//     }
//   }


//   const handleToSbNoChange = (selectedOption) => {

//     setSelectedToSbNo(selectedOption);

//     const updates = selectedOption ? {
//       trfSbTransId: selectedOption.sbTransId,
//       trfSbLineNo: selectedOption.sbLineNo,
//       trfSbNo: selectedOption.sbNo,
//       trfSbDate: selectedOption.sbDate ? new Date(selectedOption.sbDate) : null,
//       trfNoOfPackages: selectedOption.actualNoOfPackages,
//       trfGateInPackages: 0,
//       trfCartedPackages: 0,
//       nilPackages: 0,
//       trfGateInWeight: 0,
//       toCommodity: selectedOption.commodity,
//       cartedWeight: selectedOption.cartedWeight,
//       toGateInPackages: selectedOption.gateInPackages,
//       toGateInWeight: 0,
//       trfGrossWeight: selectedOption.grossWeight
//     } :
//       {
//         trfSbTransId: '',
//         trfSbLineNo: '',
//         trfSbNo: '',
//         trfSbDate: null,
//         trfNoOfPackages: 0,
//         trfGateInPackages: 0,
//         trfCartedPackages: 0,
//         nilPackages: 0,
//         trfGrossWeight: 0,
//         trfGateInWeight: 0,
//         toCommodity: '',
//         cartedWeight: 0
//       }

//     // Update selectedSbNos
//     setExportTransfer((prevState) => ({
//       ...prevState,
//       ...updates,
//     }));

//     const updatedDetails = exportTransferDetail.map((detail) => ({
//       ...detail, // Spread existing properties
//       trfSbTransId: selectedOption ? selectedOption.sbTransId : '',
//       trfSbNo: selectedOption ? selectedOption.sbNo : '',
//       trfSbLineNo: selectedOption ? selectedOption.sbLineNo : '',
//       cha: selectedOption ? selectedOption.cha : '',
//       onAccountOf: selectedOption ? selectedOption.onAccountOf : '',
//       grossWeight: selectedOption ? selectedOption.grossWeight : 0,
//       actualNoOfPackages: selectedOption ? selectedOption.actualNoOfPackages : 0
//     }));

//     // Set the updated array back to the state
//     setExportTransferDetail(updatedDetails);

//     setValidationErrors((prevErrors) => ({
//       ...prevErrors,
//       trfSbNo: '',
//     }));
//   }


//   const searchSbNos = async (searchvalue, type) => {

//     if (!searchvalue) {
//       if (type === 'from') {
//         setFromSbNos([]);
//       } else {
//         setToSbNos([]);
//       }
//       return;
//     }
//     try {
//       const response = await MovementService.searchSbNoForTransfer(companyid, branchId, searchvalue, profitcentre.profitcentreId, type, jwtToken);

//       if (type === 'from') {
//         setFromSbNos(response.data);
//       } else {
//         setToSbNos(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching SB entries:", error);
//     }
//   };


//   const handleHeaderChange = (fieldName, value, type) => {
//     // Update exportStuffRequest state

//     if (type === 'number') {
//       value = value.replace(/[^0-9]/g, '');
//     }
//     setExportTransfer(prevState => ({
//       ...prevState,
//       [fieldName]: value
//     }));

//     setValidationErrors((prevErrors) => ({
//       ...prevErrors,
//       [fieldName]: '',
//     }));

//   };

//   const CustomInput = React.forwardRef(({ value, onClick, onKeyDown, className, id }, ref) => (
//     <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
//       <input
//         ref={ref}
//         value={value}
//         onClick={onClick}
//         onKeyDown={onKeyDown}
//         readOnly
//         className={className} // Apply the passed className here
//         id='service'
//         style={{ width: '100%' }} // Adjust as needed
//         tabIndex={-1}
//       />
//       <FontAwesomeIcon
//         icon={faCalendarAlt}
//         style={{
//           position: 'absolute',
//           right: '10px',
//           color: '#6c757d',
//         }}
//       />
//     </div>
//   ));


//   const handleFieldChange = (e, index, fieldName, type) => {
//     let { value } = e.target;

//     // Allow digits and decimal points or only digits based on type
//     if (type === 'number') {
//       value = value.replace(/[^0-9]/g, '');
//     }

//     setValidationErrorsGateIns(prevErrors => {
//       const updatedErrors = [...prevErrors];
//       if (updatedErrors[index]) {
//         delete updatedErrors[index][fieldName];
//       }
//       return updatedErrors;
//     });

//     // Update the state without validation
//     setExportTransferDetail(prevState => {
//       const updatedTransDtl = [...prevState];
//       updatedTransDtl[index] = {
//         ...updatedTransDtl[index],
//         [fieldName]: value,
//       };

//       // Calculate average cargo weight if fieldName is noOfPackagesStuffed
//       if (fieldName === 'trfGateInPackages') {

//         const currentEntry = updatedTransDtl[index];

//         const noOfPackages = parseInt(currentEntry.gateInPackages || 0);
//         const totalCargoWeight = parseFloat(currentEntry.gateInWeight || 0);

//         console.log('noOfPackages ', noOfPackages, ' totalCargoWeight ', totalCargoWeight);

//         if (noOfPackages > 0) {
//           const weightPerPackage = totalCargoWeight / noOfPackages;
//           const noOfPackagesStuffed = parseInt(value || 0);
//           const averageCargoWeight = (weightPerPackage * noOfPackagesStuffed).toFixed(2);
//           console.log('averageCargoWeight Container', averageCargoWeight);
//           updatedTransDtl[index].trfGateInWeight = parseFloat(averageCargoWeight); // Update cargoWeight for exportStuffRequest
//         } else {
//           updatedTransDtl[index].trfGateInWeight = 0; // or handle as needed
//         }
//       }

//       // // Update validation errors for cargoWeight
//       // setValidationErrorsGateIns(prevErrors => {
//       //   const updatedErrors = [...prevErrors];
//       //   if (updatedErrors[index]) {
//       //     delete updatedErrors[index].cargoWeight;
//       //   }
//       //   return updatedErrors;
//       // });

//       return updatedTransDtl;
//     });
//   };




//   const validateTransferDetail = (exportTransferDetail) => {
//     let errors = [];

//     exportTransferDetail.forEach((detail) => {
//       const { sbNo, trfSbNo, trfGateInPackages, balancePkgs } = detail;

//       let error = {};

//       if (!sbNo) error.sbNo = 'sbNo is required.';
//       if (!trfSbNo) error.trfSbNo = 'trfSbNo is required.';

//       if (parseFloat(trfGateInPackages) > parseFloat(balancePkgs)) {
//         error.trfGateInPackages = 'trfCartedPackages must be less than balancePkgs.';
//       }
//       console.log(error, 'trfGateInPackages, balancePkgs ', parseFloat(trfGateInPackages), parseFloat(balancePkgs));
//       errors.push(error);
//     });

//     setValidationErrorsGateIns(errors);

//     // Check if there are any errors
//     return errors.every(error => Object.keys(error).length === 0);
//   };


//   const validateTransfer = (ExportTransfer) => {

//     const { sbNo, sbDate, transferPackages } = ExportTransfer;
//     let error = {};

//     if (!sbNo) error.sbNo = 'sbNo is required.';
//     if (!sbDate) error.sbDate = 'sbDate is required.';
//     if (!transferPackages || transferPackages <= 0) {
//       error.transferPackages = 'Transfer packages must be greater than 0.';
//     }

//     setValidationErrors(error);
//     return Object.keys(error).length === 0;
//   };


//   console.log('validationErrors : ', validationErrors, ' \n validationErrorsGateIns : ', validationErrorsGateIns);

//   console.log('exportTranfer : ', exportTransfer, ' \n exportTranferDetail', exportTransferDetail);

//   const handleSave = async (exportTranfer, exportTranferDetail) => {
//     if (!validateTransfer(exportTranfer)) {
//       return false;
//     }

//     if (!validateTransferDetail(exportTranferDetail)) {
//       return false;
//     }

//     if (parseFloat(totals.packages) !== parseFloat(exportTranfer.transferPackages)) {

//       console.log('totals.packages : ', parseFloat(totals.packages), ' exportTranfer.transferPackages : ', parseFloat(exportTranfer.transferPackages));

//       toast.error('Header and detail trasfered package should be same!', {
//         position: 'top-center',
//         autoClose: 700,
//         style: { width: `27vw` },
//       });
//       return;
//     }

//     if (parseFloat(exportTranfer.transferPackages) > (parseFloat(exportTranfer.trfNoOfPackages) - parseFloat(exportTranfer.toGateInPackages))) {

//       console.log('exportTranfer.maxQuantity : ', parseFloat(exportTranfer.maxQuantity), ' exportTranfer.transferPackages : ', parseFloat(exportTranfer.transferPackages));

//       toast.warning(<div dangerouslySetInnerHTML={{ __html: `Maximum Transfer packages to SbNo: <strong>${exportTranfer.trfSbNo}</strong> are:<strong> ${(parseFloat(exportTranfer.trfNoOfPackages) - parseFloat(exportTranfer.toGateInPackages))} </strong>` }} />, {
//         position: 'top-center',
//         autoClose: 1000,
//         style: { width: '29vw' },
//       });
//       return;
//     }


//     if (parseFloat(exportTranfer.transferPackages) > parseFloat(exportTranfer.maxQuantity)) {

//       console.log('exportTranfer.maxQuantity : ', parseFloat(exportTranfer.maxQuantity), ' exportTranfer.transferPackages : ', parseFloat(exportTranfer.transferPackages));

//       toast.warning(<div dangerouslySetInnerHTML={{ __html: `Maximum Transfer packages from Sb No:<strong>${exportTranfer.sbNo}</strong> are:<strong> ${parseFloat(exportTranfer.maxQuantity)} </strong>` }} />, {
//         position: 'top-center',
//         autoClose: 1000,
//         style: { width: '28vw' },
//       });
//       return;
//     }


//     console.log('going to save : ', exportTranferDetail);


//     setLoading(true);
//     try {
//       const response = await MovementService.addExportTransfer(companyid, branchId, exportTranfer, exportTranferDetail, userId, jwtToken);

//       const { exportTransfer, exportTransferDetail } = response.data;


//       const initialFromSbNo = {
//         label: exportTransfer.sbNo,
//         value: exportTransfer.sbNo,
//       }

//       const initialToSbNo = {
//         label: exportTransfer.trfSbNo,
//         value: exportTransfer.trfSbNo,
//       }
//       // Set the transformed data into the state
//       setSelectedFromSbNo(initialFromSbNo);
//       setSelectedToSbNo(initialToSbNo);


//       setExportTransfer(exportTransfer);
//       setExportTransferDetail(exportTransferDetail);

//       toast.success('Data added Successfully!', {
//         position: 'top-center',
//         autoClose: 700,
//       });
//     } catch (error) {
//       toast.error('Oops something went wrong!', {
//         position: 'top-center',
//         autoClose: 700,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };



//   const handleReset = async () => {

//     console.log('calling handleReset()');

//     setSelectedFromSbNo(null);
//     setFromSbNos([]);
//     setSelectedToSbNo(null);
//     setToSbNos([]);

//     setValidationErrors([]);
//     setValidationErrorsGateIns([]);
//     setExportTransferDetail([initialExportTransferDetail]);
//     setExportTransfer(initialExportTransfer);
//   };



//   const [isModalOpenForGateInSearch, setIsModalOpenForGateInSearch] = useState(false);

//   const [searchGateInvalues, setSearchGateInvalues] = useState('');
//   const [gateInSearchData, setGateInSearchData] = useState([]);

//   const selectGateInSearchRadio = async (sbChangeTransId, srNo, profitCenterId) => {
//     await getSelectedSbTransferEntry(sbChangeTransId, srNo, profitCenterId);
//     handleCloseGateInSearch();
//   }

//   const handleCloseGateInSearch = (val) => {
//     setIsModalOpenForGateInSearch(false);
//     setSearchGateInvalues('');
//     setGateInSearchData([]);
//   }


//   const clearGateInSearchSearch = (val) => {
//     setSearchGateInvalues('');
//     searchSbTransferSearch();
//   }

//   const handleOpenSbTransferSearch = async () => {
//     setIsModalOpenForGateInSearch(true);
//     setSearchGateInvalues('');
//     searchSbTransferSearch();
//   };


//   const formatDate = (value) => {
//     if (!value) {
//       return "";
//     }

//     const date = new Date(value);

//     // Extract date components
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };


//   const [currentPageGateInSearch, setCurrentPageGateInSearch] = useState(1);
//   const [itemsPerPage] = useState(5);

//   const indexOfLastItemGateInSearch = currentPageGateInSearch * itemsPerPage;
//   const indexOfFirstItemGateInSearch = indexOfLastItemGateInSearch - itemsPerPage;
//   const currentItemsGateInSearch = gateInSearchData.slice(indexOfFirstItemGateInSearch, indexOfLastItemGateInSearch);
//   const totalPagesGateInSearch = Math.ceil(gateInSearchData.length / itemsPerPage);

//   // Function to handle page change
//   const handlePageChangeGateIn = (page) => {
//     if (page >= 1 && page <= totalPagesGateInSearch) {
//       setCurrentPageGateInSearch(page);
//     }
//   };


//   const displayPagesGateIn = () => {
//     const centerPageCount = 5;
//     const middlePage = Math.floor(centerPageCount / 2);
//     let startPage = currentPageGateInSearch - middlePage;
//     let endPage = currentPageGateInSearch + middlePage;

//     if (startPage < 1) {
//       startPage = 1;
//       endPage = Math.min(totalPagesGateInSearch, centerPageCount);
//     }

//     if (endPage > totalPagesGateInSearch) {
//       endPage = totalPagesGateInSearch;
//       startPage = Math.max(1, totalPagesGateInSearch - centerPageCount + 1);
//     }

//     return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
//   };



//   const searchSbTransferSearch = async (searchvalue) => {
//     setCurrentPageGateInSearch(1);
//     setLoading(true);
//     try {
//       const response = await MovementService.getTransferEntriesToSelect(companyid, branchId, searchvalue, profitcentre.profitcentreId, jwtToken);
//       setGateInSearchData(response.data);
//     } catch (error) {
//       console.error("Error fetching GateIn entries:", error);
//     } finally {
//       setLoading(false);
//     }
//   };


//   const getSelectedSbTransferEntry = async (sbChangeTransId, srNo, profitCenterId) => {
//     console.log(sbChangeTransId, srNo, profitCenterId);

//     setValidationErrors([]);
//     setLoading(true);
//     try {
//       const response = await MovementService.getSelectedTransferEntry(companyid, branchId, profitCenterId, sbChangeTransId, srNo, jwtToken);
//       const { exportTransfer, exportTransferDetail } = response.data;

//       const initialFromSbNo = {
//         label: exportTransfer.sbNo,
//         value: exportTransfer.sbNo,
//       }

//       const initialToSbNo = {
//         label: exportTransfer.trfSbNo,
//         value: exportTransfer.trfSbNo,
//       }
//       // Set the transformed data into the state
//       setSelectedFromSbNo(initialFromSbNo);
//       setSelectedToSbNo(initialToSbNo);




//       setExportTransfer(exportTransfer);
//       setExportTransferDetail(exportTransferDetail);
//     } catch (error) {
//       console.error("Error fetching Tally entries:", error);
//       // Optionally handle the error further, e.g., show a notification to the user
//     } finally {
//       setLoading(false);
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

//         <div>
//           <Row>
//             <Col md={2}>
//               <Row>
//                 <Col md={9}>
//                   <FormGroup>
//                     <label
//                       className="forlabel bold-label"
//                       htmlFor="sbRequestId"
//                     >
//                       SB Change Trans Id
//                     </label>
//                     <input
//                       className="form-control"
//                       type="text"
//                       id="service"
//                       readOnly
//                       value={exportTransfer.sbChangeTransId}
//                     />
//                   </FormGroup>
//                 </Col>

//                 <Col md={3} className="d-flex justify-content-end" style={{ marginTop: 21 }}>
//                   <button
//                     className="btn btn-outline-primary btn-margin newButton"
//                     style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//                     id="submitbtn2"
//                     onClick={handleOpenSbTransferSearch}
//                   >
//                     <FontAwesomeIcon icon={faSearch} size="sm" />
//                   </button>
//                 </Col>
//               </Row>
//             </Col>







//             <Modal Modal isOpen={isModalOpenForGateInSearch} onClose={handleCloseGateInSearch} toggle={handleCloseGateInSearch} style={{ maxWidth: '1100px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>

//               <ModalHeader toggle={handleCloseGateInSearch} style={{
//                 backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
//                 boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
//                 border: '1px solid rgba(0, 0, 0, 0.3)',
//                 borderRadius: '0',
//                 backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
//                 backgroundSize: 'cover',
//                 backgroundRepeat: 'no-repeat',
//                 backgroundPosition: 'center',
//               }} >


//                 <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', color: 'white' }} > <FontAwesomeIcon
//                   icon={faSearch}
//                   style={{
//                     marginRight: '8px',
//                     color: 'white',
//                   }}
//                 /> Search SB Transfer</h5>

//               </ModalHeader>
//               <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
//                 <Row>
//                   <Col md={6}>
//                     <FormGroup>
//                       <label className="forlabel bold-label" htmlFor="sbRequestId">
//                         Search by Value
//                       </label>
//                       <input
//                         className="form-control"
//                         type="text"
//                         id="searchGateInvalues"
//                         placeholder="SB Change Trans Id/From SBNo/From SBTransId/To SBNo/To SBTransId"
//                         maxLength={15}
//                         name='searchGateInvalues'
//                         value={searchGateInvalues}
//                         onChange={(e) => setSearchGateInvalues(e.target.value)}
//                       />

//                     </FormGroup>
//                   </Col>
//                   <Col md={6} style={{ marginTop: 24 }}>
//                     <button
//                       className="btn btn-outline-primary btn-margin newButton"
//                       // style={{ marginRight: 10, fontWeight: 'bold' }}
//                       style={{ fontSize: 12, marginRight: 10 }}
//                       id="submitbtn2"
//                       onClick={() => searchSbTransferSearch(searchGateInvalues)}
//                     >
//                       <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
//                       Search
//                     </button>
//                     <button
//                       className="btn btn-outline-danger btn-margin newButton"
//                       // style={{ marginRight: 10, fontWeight: 'bold' }}
//                       style={{ fontSize: 12, marginRight: 10 }}
//                       id="submitbtn2"
//                       onClick={clearGateInSearchSearch}
//                     >
//                       <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
//                       Reset
//                     </button>
//                   </Col>
//                 </Row>
//                 <hr />
//                 <div className="mt-1 table-responsive ">
//                   <table className="table table-bordered table-hover tableHeader">
//                     <thead className='tableHeader'>
//                       <tr className='text-center'>
//                         <th scope="col">#</th>
//                         <th scope="col">SB Change Trans Id</th>
//                         <th scope="col">SB Change Trans Date</th>
//                         <th scope="col">ProfitCenter</th>
//                         <th scope="col">SB Trans Id</th>
//                         <th scope="col">From SBNo</th>
//                         <th scope="col">From SBTransId</th>
//                         <th scope="col">From SBDate</th>
//                         <th scope="col">To SBNo</th>
//                         <th scope="col">To SBTransId</th>
//                         <th scope="col">To SBDate</th>
//                         <th scope="col">Status</th>

//                       </tr>
//                       <tr className='text-center'>
//                         <th scope="col"></th>
//                         <th scope="col">{gateInSearchData.length}</th>
//                         <th scope="col"></th>
//                         <th scope="col"></th>
//                         <th scope="col"></th>
//                         <th scope="col"></th>
//                         <th scope="col"></th>
//                         <th scope="col"></th>
//                         <th scope="col"></th>
//                         <th scope="col"></th>
//                         <th scope="col"></th>
//                         <th scope="col"></th>
//                       </tr>
//                     </thead>
//                     <tbody>

//                       {currentItemsGateInSearch.map((item, index) => (
//                         <>
//                           <tr key={index} className='text-center'>
//                             <td>
//                               <input type="radio" name="radioGroup" onChange={() => selectGateInSearchRadio(item.sbChangeTransId, item.srNo, item.profitcentreId)} value={item.sbChangeTransId} />
//                             </td>
//                             <td>{item.sbChangeTransId}</td>
//                             <td>{formatDate(item.sbChangeTransDate)}</td>
//                             <td>{item.sbChangeTransDate}</td>
//                             <td>{item.profitCenterName}</td>
//                             <td>{item.sbTransId}</td>
//                             <td>{item.sbNo}</td>
//                             <td>{formatDate(item.sbDate)}</td>
//                             <td>{item.trfSbNo}</td>
//                             <td>{item.trfSbTransId}</td>
//                             <td>{formatDate(item.trfSbDate)}</td>
//                             <td>{item[7]}</td>
//                             <td>{item.status === 'A' ? 'Approved' : ''}</td>
//                           </tr>
//                         </>
//                       ))}
//                     </tbody>
//                   </table>
//                   <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
//                     <Pagination.First onClick={() => handlePageChangeGateIn(1)} />
//                     <Pagination.Prev
//                       onClick={() => handlePageChangeGateIn(currentPageGateInSearch - 1)}
//                       disabled={currentPageGateInSearch === 1}
//                     />
//                     <Pagination.Ellipsis />

//                     {displayPagesGateIn().map((pageNumber) => (
//                       <Pagination.Item
//                         key={pageNumber}
//                         active={pageNumber === currentPageGateInSearch}
//                         onClick={() => handlePageChangeGateIn(pageNumber)}
//                       >
//                         {pageNumber}
//                       </Pagination.Item>
//                     ))}

//                     <Pagination.Ellipsis />
//                     <Pagination.Next
//                       onClick={() => handlePageChangeGateIn(currentPageGateInSearch + 1)}
//                       disabled={currentPageGateInSearch === totalPagesGateInSearch}
//                     />
//                     <Pagination.Last onClick={() => handlePageChangeGateIn(totalPagesGateInSearch)} />
//                   </Pagination>
//                 </div>
//               </ModalBody>
//             </Modal>

















//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="sbRequestId"
//                 >
//                   SB Change Trans Date
//                 </label>
//                 <div style={{ position: "relative" }}>
//                   <DatePicker
//                     selected={exportTransfer.sbChangeTransDate}
//                     name="sbChangeTransDate"
//                     // onChange={(date) => handlePaymentDateChangeHeader(date, 'stuffTallyDate')}
//                     placeholderText="Trans Date"
//                     dateFormat="dd/MM/yyyy HH:mm"
//                     timeInputLabel="Time:"
//                     showTimeInput
//                     timeFormat="HH:mm"
//                     timeIntervals={15}
//                     className={`form-control`}
//                     wrapperClassName="custom-react-datepicker-wrapper"
//                     disabled
//                     readOnly
//                     id='service'
//                     tabIndex={-1}
//                   /><FontAwesomeIcon
//                     icon={faCalendarAlt}
//                     style={{
//                       position: "absolute",
//                       right: "10px",
//                       top: "50%",
//                       transform: "translateY(-50%)",
//                       pointerEvents: "none",
//                     }}
//                   />
//                 </div>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="sbRequestId"
//                 >
//                   Profit Centre Id
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="service"
//                   maxLength={20}
//                   readOnly
//                   value={profitcentre.profitcentreDesc}
//                   tabIndex={-1}
//                 />
//               </FormGroup>
//             </Col>

//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Status
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="service"
//                   readOnly
//                   maxLength={15}
//                   value={exportTransfer.status === 'A' ? 'Approved' : ''}
//                   tabIndex={-1}
//                 />
//               </FormGroup>
//             </Col>

//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="approvedBy">
//                   Created By
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="service"
//                   readOnly
//                   maxLength={15}
//                   name="createdBy"
//                   value={exportTransfer.createdBy}
//                 />
//               </FormGroup>
//             </Col>



//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="approvedBy">
//                   Approved By
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="service"
//                   readOnly
//                   maxLength={15}
//                   name="approvedBy"
//                   value={exportTransfer.approvedBy}
//                 />
//               </FormGroup>
//             </Col>
//           </Row>


//           <Row>


//             <Col md={2}>

//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="sbRequestId"
//                 >
//                   From SB No<span className="error-message">*</span>
//                 </label>
//                 <Select
//                   options={fromSbNos}
//                   value={selectedFromSbNo}
//                   onChange={(selectedOption) => handleFromSbNoChange(selectedOption)}
//                   onInputChange={(inputValue, { action }) => {
//                     if (action === 'input-change') {
//                       searchSbNos(inputValue, 'from');
//                     }
//                   }}
//                   className={`${validationErrors.sbNo ? 'error-border' : ''}`}
//                   placeholder="Select SB No"
//                   isDisabled={exportTransfer.sbChangeTransId}
//                   id={exportTransfer.sbChangeTransId ? 'service' : ''}
//                   isClearable
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
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="sbRequestId"
//                 >
//                   From SB Trans ID
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="service"
//                   maxLength={20}
//                   readOnly
//                   value={exportTransfer.sbTransId}
//                   tabIndex={-1}
//                 />
//               </FormGroup>
//             </Col>

//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="sbRequestId"
//                 >
//                   SB trans date
//                 </label>
//                 <div style={{ position: "relative" }}>
//                   <DatePicker
//                     selected={exportTransfer.sbTransDate}
//                     name="sbTransDate"
//                     // onChange={(date) => handlePaymentDateChangeHeader(date, 'stuffTallyDate')}
//                     placeholderText="SB Trans Date"
//                     dateFormat="dd/MM/yyyy HH:mm"
//                     timeInputLabel="Time:"
//                     showTimeInput
//                     timeFormat="HH:mm"
//                     timeIntervals={15}
//                     className={`form-control`}
//                     wrapperClassName="custom-react-datepicker-wrapper"
//                     disabled
//                     id='service'
//                     readOnly
//                     tabIndex={-1}
//                   /><FontAwesomeIcon
//                     icon={faCalendarAlt}
//                     style={{
//                       position: "absolute",
//                       right: "10px",
//                       top: "50%",
//                       transform: "translateY(-50%)",
//                       pointerEvents: "none"
//                     }}
//                   />
//                 </div>
//               </FormGroup>
//             </Col>



//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="sbRequestId"
//                 >
//                   SB Date
//                 </label>
//                 <div style={{ position: "relative" }}>
//                   <DatePicker
//                     selected={exportTransfer.sbDate}
//                     name="sbChangeTransDate"
//                     // onChange={(date) => handlePaymentDateChangeHeader(date, 'stuffTallyDate')}
//                     placeholderText="SB Date"
//                     dateFormat="dd/MM/yyyy HH:mm"
//                     timeInputLabel="Time:"
//                     showTimeInput
//                     timeFormat="HH:mm"
//                     timeIntervals={15}
//                     className={`form-control`}
//                     wrapperClassName="custom-react-datepicker-wrapper"
//                     disabled
//                     readOnly
//                     id='service'
//                     tabIndex={-1}
//                   /><FontAwesomeIcon
//                     icon={faCalendarAlt}
//                     style={{
//                       position: "absolute",
//                       right: "10px",
//                       top: "50%",
//                       transform: "translateY(-50%)",
//                       pointerEvents: "none"
//                     }}
//                   />
//                 </div>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="sbRequestId"
//                 >
//                   From SB Line No
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="service"
//                   maxLength={20}
//                   readOnly
//                   value={exportTransfer.sbTransId}
//                   tabIndex={-1}
//                 />
//               </FormGroup>
//             </Col>

//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="sbRequestId"
//                 >
//                   From SB Commodity
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="service"
//                   maxLength={20}
//                   readOnly
//                   value={exportTransfer.commodity}
//                   tabIndex={-1}
//                 />
//               </FormGroup>
//             </Col>




//           </Row>
//           <Row>

//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="sbRequestId"
//                 >
//                   Gate In Packages
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="service"
//                   maxLength={20}
//                   readOnly
//                   value={exportTransfer.gateInPackages}
//                   tabIndex={-1}
//                 />
//               </FormGroup>
//             </Col>



//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="sbRequestId"
//                 >
//                   Stufffed Qty
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="service"
//                   maxLength={20}
//                   readOnly
//                   value={exportTransfer.stuffedQty}
//                   tabIndex={-1}
//                 />
//               </FormGroup>
//             </Col>

//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="sbRequestId"
//                 >
//                   Cargo BTT Qty
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="service"
//                   maxLength={20}
//                   readOnly
//                   value={exportTransfer.backToTownPack}
//                   tabIndex={-1}
//                 />
//               </FormGroup>
//             </Col>


//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="sbRequestId"
//                 >
//                   Transferred Pkgs
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="service"
//                   maxLength={20}
//                   readOnly
//                   value={exportTransfer.preTranferedPackages}
//                   tabIndex={-1}
//                 />
//               </FormGroup>
//             </Col>

//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="sbRequestId"
//                 >
//                   Exporter Name
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="service"
//                   maxLength={20}
//                   readOnly
//                   value={exportTransfer.exporterName}
//                   tabIndex={-1}
//                 />
//               </FormGroup>
//             </Col>

//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="sbRequestId"
//                 >
//                   CHA
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="service"
//                   maxLength={20}
//                   readOnly
//                   value={exportTransfer.chaName}
//                   tabIndex={-1}
//                 />
//               </FormGroup>
//             </Col>



//           </Row>

//           <Row>

//             <Col md={2}>

//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="sbRequestId"
//                 >
//                   Transfer To SB No<span className="error-message">*</span>
//                 </label>
//                 <Select
//                   options={toSbNos}
//                   value={selectedToSbNo}
//                   onChange={(selectedOption) => handleToSbNoChange(selectedOption)}
//                   onInputChange={(inputValue, { action }) => {
//                     if (action === 'input-change') {
//                       searchSbNos(inputValue, 'to');
//                     }
//                   }}
//                   className={`${validationErrors.trfSbNo ? 'error-border' : ''}`}
//                   placeholder="Select To SB No"
//                   isDisabled={exportTransfer.sbChangeTransId}
//                   id={exportTransfer.sbChangeTransId ? 'service' : ''}
//                   isClearable
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
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="sbRequestId"
//                 >
//                   Transfer To SB TransId
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="service"
//                   maxLength={20}
//                   readOnly
//                   value={exportTransfer.trfSbTransId}
//                   tabIndex={-1}
//                 />
//               </FormGroup>
//             </Col>



//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="sbRequestId"
//                 >
//                   Transfer To SB Date
//                 </label>
//                 <div style={{ position: "relative" }}>
//                   <DatePicker
//                     selected={exportTransfer.trfSbDate}
//                     name="sbChangeTransDate"
//                     // onChange={(date) => handlePaymentDateChangeHeader(date, 'stuffTallyDate')}
//                     placeholderText="Transfer SB Date"
//                     dateFormat="dd/MM/yyyy HH:mm"
//                     timeInputLabel="Time:"
//                     showTimeInput
//                     timeFormat="HH:mm"
//                     timeIntervals={15}
//                     className={`form-control`}
//                     wrapperClassName="custom-react-datepicker-wrapper"
//                     disabled
//                     readOnly
//                     id='service'
//                     tabIndex={-1}
//                   /><FontAwesomeIcon
//                     icon={faCalendarAlt}
//                     style={{
//                       position: "absolute",
//                       right: "10px",
//                       top: "50%",
//                       transform: "translateY(-50%)",
//                       pointerEvents: "none",
//                     }}
//                   />
//                 </div>
//               </FormGroup>
//             </Col>








//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="sbRequestId"
//                 >
//                   Transfer To SB LineNo
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="service"
//                   maxLength={20}
//                   readOnly
//                   value={exportTransfer.trfSbLineNo}
//                   tabIndex={-1}
//                 />
//               </FormGroup>
//             </Col>


//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="sbRequestId"
//                 >
//                   To SB Commodity
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="service"
//                   maxLength={20}
//                   readOnly
//                   value={exportTransfer.toCommodity}
//                   tabIndex={-1}
//                 />
//               </FormGroup>
//             </Col>


//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel" for="HazardousHazardous">All Packages Amend</label>
//                 <div style={{ position: 'relative' }}>
//                   <Input
//                     type="select"
//                     name="nilFlag"
//                     className={`form-control`}
//                     value={exportTransfer.nilFlag}
//                     onChange={(e) => handleHeaderChange('nilFlag', e.target.value)}
//                     disabled={exportTransfer.sbChangeTransId}
//                     id={exportTransfer.sbChangeTransId ? 'service' : ''}

//                   >
//                     <option value="N">No</option>
//                     <option value="Y">Yes</option>
//                   </Input>
//                 </div>
//               </FormGroup>
//             </Col>

//           </Row>


//         </div>

//         <hr />
//         <div>












//           <div
//             className="table-responsive"
//             style={{ maxHeight: "400px", overflowY: "auto" }}
//           >

//             <h5
//               className="pageHead"
//               style={{
//                 fontFamily: "Your-Heading-Font",
//                 paddingLeft: "2%",
//                 paddingRight: "-20px",
//               }}
//             >
//               SB Transfer Process
//             </h5>

//             <Table className="table table-bordered" style={{ border: '2px solid black' }}>
//               <thead className="tableHeader">
//                 <tr>
//                   <th colSpan="4" className="text-center"><strong>FROM SHIPPING BILL</strong></th>
//                   <th colSpan="2" className="text-center"><strong>TRANSFER DETAILS</strong></th>
//                   <th colSpan="2" className="text-center"><strong>TO SHIPPING BILL</strong></th>
//                   <th className="text-center"></th>
//                 </tr>
//                 <tr>
//                   <th scope="col" className="text-center" style={{ color: "black" }}>Sr No</th>
//                   <th scope="col" className="text-center" style={{ color: "black" }}>SB Line No</th>
//                   <th scope="col" className="text-center" style={{ color: "black" }}>No Of Packages</th>
//                   <th scope="col" className="text-center" style={{ color: "black" }}>GateIn Pkg.</th>
//                   <th scope="col" className="text-center" style={{ color: "black" }}>Transfer Pkg.</th>
//                   <th scope="col" className="text-center" style={{ color: "black" }}>Nil Pkg.</th>
//                   <th scope="col" className="text-center" style={{ color: "black" }}>No Of Packages</th>
//                   <th scope="col" className="text-center" style={{ color: "black" }}>GateIn Pkg.</th>
//                   <th scope="col" className="text-center" style={{ color: "black" }}>Comments</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="text-center">
//                   <td className="text-center">1</td>
//                   <td className="text-center">
//                     <FormGroup>
//                       <Input
//                         type="text"
//                         value={exportTransfer.sbLineNo}
//                         className={`inputwidthTuka form-control text-center`}
//                         readOnly
//                         id="service"
//                         tabIndex={-1}
//                       />
//                     </FormGroup>
//                   </td>
//                   <td className="text-center">
//                     <FormGroup>
//                       <Input
//                         type="text"
//                         value={exportTransfer.noOfPackages}
//                         className={`inputwidthTuka form-control text-center`}
//                         readOnly
//                         id="service"
//                         tabIndex={-1}
//                       />
//                     </FormGroup>

//                   </td>
//                   <td className="text-center">
//                     <FormGroup>
//                       <Input
//                         type="text"
//                         value={exportTransfer.gateInPackages}
//                         className={`inputwidthTuka form-control text-center`}
//                         readOnly
//                         id="service"
//                         tabIndex={-1}
//                       />
//                     </FormGroup>

//                   </td>

//                   <td className="text-center">

//                     <FormGroup>
//                       <Input
//                         type="text"
//                         className={`inputwidthTuka form-control text-center ${validationErrors.transferPackages ? 'error-border' : ''}`}
//                         maxLength={8}
//                         value={exportTransfer.transferPackages}
//                         onChange={(e) => handleHeaderChange('transferPackages', e.target.value, 'number')}
//                         readOnly={exportTransfer.sbChangeTransId}
//                         id={exportTransfer.sbChangeTransId ? 'service' : ''}
//                       />
//                     </FormGroup>

//                   </td>


//                   <td className="text-center">

//                     <FormGroup>
//                       <Input
//                         type="text"
//                         value={exportTransfer.nilPackages}
//                         className={`inputwidthTuka form-control text-center`}
//                         readOnly
//                         id="service"
//                         tabIndex={-1}
//                       />
//                     </FormGroup>
//                   </td>

//                   <td className="text-center">
//                     <FormGroup>
//                       <Input
//                         type="text"
//                         value={exportTransfer.trfNoOfPackages}
//                         className={`inputwidthTuka form-control text-center`}
//                         readOnly
//                         id="service"
//                         tabIndex={-1}
//                       />
//                     </FormGroup>

//                   </td>
//                   <td className="text-center">
//                     <FormGroup>
//                       <Input
//                         type="text"
//                         value={exportTransfer.trfGateInPackages}
//                         className={`inputwidthTuka form-control text-center`}
//                         readOnly
//                         id="service"
//                         tabIndex={-1}
//                       />
//                     </FormGroup>
//                   </td>
//                   <td className="text-center">
//                     <FormGroup>
//                       <Input
//                         type="text"
//                         className={`inputwidthTukaMax form-control`}
//                         maxLength={50}
//                         value={exportTransfer.comments}
//                         onChange={(e) => handleHeaderChange('comments', e.target.value)}
//                         readOnly={exportTransfer.sbChangeTransId}
//                         id={exportTransfer.sbChangeTransId ? 'service' : ''}
//                       />
//                     </FormGroup>
//                   </td>
//                 </tr>


//               </tbody>
//             </Table>



//           </div>
















//         </div>
















//         <div>
//           <div
//             className="table-responsive"
//             style={{ maxHeight: "400px", overflowY: "auto" }}
//           >
//             <h5
//               className="pageHead"
//               style={{
//                 fontFamily: "Your-Heading-Font",
//                 paddingLeft: "2%",
//                 paddingRight: "-20px",
//               }}
//             >
//               Balance Cargo Info
//             </h5>
//             <Table className="table table-bordered" style={{ border: '2px solid black' }}>
//               <thead className="tableHeader">
//                 <tr>
//                   <th scope="col" className="text-center" style={{ color: "black" }}>Sr No</th>
//                   <th scope="col" className="text-center" style={{ color: "black" }}>Gate In Id</th>
//                   <th scope="col" className="text-center" style={{ color: "black" }}>Gate In Date</th>
//                   <th scope="col" className="text-center" style={{ color: "black" }}>Vehicle No</th>
//                   <th scope="col" className="text-center" style={{ color: "black" }}>Gate In Pkg.</th>
//                   <th scope="col" className="text-center" style={{ color: "black" }}>Out Qty.</th>
//                   <th scope="col" className="text-center" style={{ color: "black" }}>Balance Qty.</th>
//                   <th scope="col" className="text-center" style={{ color: "black" }}>Transfer Pkg.</th>
//                   <th scope="col" className="text-center" style={{ color: "black" }}>Nil Pkg.</th>
//                   <th scope="col" className="text-center" style={{ color: "black" }}>Status</th>
//                 </tr>
//               </thead>
//               <tbody>


//                 {exportTransferDetail.map((cargoEntry, index) => (
//                   <tr key={index} className="text-center">
//                     <td className="text-center">
//                       {index + 1}
//                     </td>


//                     <td className="text-center">
//                       <FormGroup>
//                         <Input
//                           type="text"
//                           value={cargoEntry.gateInId}
//                           className={`inputwidthTuka form-control text-center`}
//                           readOnly
//                           id="service"
//                           tabIndex={-1}
//                         />
//                       </FormGroup>
//                     </td>




//                     <td className="text-center">
//                       <DatePicker
//                         selected={cargoEntry.gateInDate}
//                         // onChange={(date) => handlePaymentDateChange(date, index, 'stuffReqDate', cargoEntry.containerNo)}
//                         id="service"
//                         disabled
//                         name="sbDate"
//                         placeholderText="Sb Date"
//                         dateFormat="dd/MM/yyyy HH:mm"
//                         showTimeInput
//                         timeFormat="HH:mm"
//                         timeIntervals={15}
//                         customInput={<CustomInput className={`inputwidthTukaMax form-control`} />}
//                         className={`inputwidthTukaMax form-control`}
//                         tabIndex={-1}
//                       />

//                     </td>

//                     <td className="text-center">
//                       <FormGroup>
//                         <Input
//                           type="text"
//                           value={cargoEntry.vehicleNo}
//                           className={`inputwidthTuka form-control text-center`}
//                           maxLength={15}
//                           tabIndex={-1}
//                           readOnly
//                           id="service"
//                         />
//                       </FormGroup>
//                     </td>


//                     <td className="text-center">
//                       <FormGroup>
//                         <Input
//                           type="text"
//                           value={cargoEntry.gateInPackages}
//                           className={`inputwidthTukaMin form-control text-center`}
//                           maxLength={15}
//                           tabIndex={-1}
//                           readOnly
//                           id="service"
//                         />
//                       </FormGroup>
//                     </td>


//                     <td className="text-center">
//                       <FormGroup>
//                         <Input
//                           type="text"
//                           value={cargoEntry.outPkgs}
//                           className={`inputwidthTukaMin form-control text-center`}
//                           maxLength={15}
//                           tabIndex={-1}
//                           readOnly
//                           id="service"
//                         />
//                       </FormGroup>
//                     </td>


//                     <td className="text-center">
//                       <FormGroup>
//                         <Input
//                           type="text"
//                           value={cargoEntry.balancePkgs}
//                           className={`inputwidthTukaMin form-control text-center`}
//                           readOnly
//                           id="service"
//                           tabIndex={-1}
//                         />
//                       </FormGroup>
//                     </td>


//                     <td className="text-center">
//                       <FormGroup>
//                         <Input
//                           type="text"
//                           className={`inputwidthTuka form-control text-center ${validationErrorsGateIns[index]?.trfGateInPackages ? 'error-border' : ''}`}
//                           maxLength={15}
//                           readOnly={exportTransfer.sbChangeTransId}
//                           id={exportTransfer.sbChangeTransId ? 'service' : ''}
//                           onChange={(e) => handleFieldChange(e, index, 'trfGateInPackages', 'number')}
//                           value={cargoEntry.trfGateInPackages}
//                         />
//                       </FormGroup>
//                     </td>

//                     <td className="text-center">
//                       <FormGroup>
//                         <Input
//                           type="text"
//                           className={`inputwidthTuka form-control text-center`}
//                           readOnly
//                           id="service"
//                           tabIndex={-1}
//                           value={cargoEntry.nilPackages}
//                         />
//                       </FormGroup>
//                     </td>

//                     <td className="text-center">
//                       {cargoEntry.status === 'A' ? 'Approved' : ''}
//                     </td>

//                   </tr>
//                 ))}

//               </tbody>
//             </Table>


//           </div>
//         </div>
//         <Row className="text-center">
//           <Col>
//             <button
//               className="btn btn-outline-primary btn-margin newButton"
//               style={{ marginRight: 10 }}
//               id="submitbtn2"
//               onClick={(e) => handleSave(exportTransfer, exportTransferDetail)}
//               disabled={exportTransfer.sbChangeTransId}
//             >
//               <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
//               Save
//             </button>

//             <button
//               className="btn btn-outline-danger btn-margin newButton"
//               style={{ marginRight: 10 }}
//               id="submitbtn2"
//               onClick={handleReset}
//             >
//               <FontAwesomeIcon
//                 icon={faRefresh}
//                 style={{ marginRight: "5px" }}
//               />
//               Clear
//             </button>
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// }

// export default SBTransferProcess;



import AuthContext from "../Components/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import Select from "react-select";
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
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/style.css";
import "../Components/Style.css";
import { Button } from "react-bootstrap";
import useAxios from "../Components/useAxios";
import { toast } from "react-toastify";
import moment from "moment";
import cfsService from "../service/CFSService";
import movementService from "../service/MovementService";

function SBTransferProcess({ searchData, resetFlag , updatePagesList}) {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const axiosInstance = useAxios();
  const CFSService = new cfsService(axiosInstance);
  const MovementService = new movementService(axiosInstance);

  const [profitcentre, setProfitcentre] = useState({
    profitcentreId: '',
    profitcentreDesc: ''
  });

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

  const getProgitCenterById = async (profitCenterId) => {
    try {
      const response = await CFSService.getProgitCenterById(companyid, branchId, profitCenterId, jwtToken);
      setProfitcentre(response.data);
      setExportTransfer(prevState => ({
        ...prevState,
        profitcentreId: response.data?.profitcentreId || null
      }));

      setExportTransferDetail(prevState =>
        prevState.map(item => ({
          ...item,
          profitcentreId: response.data.profitcentreId
        }))
      );
    } catch (error) {
      console.error('Error fetching port data:', error);
    }
  };

  const [totals, setTotals] = useState({
    packages: 0,
  });



  useEffect(() => {
    const fetchData = async () => {
      await getProgitCenterById('N00004');
    };
    fetchData();
  }, []);



  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const processId = 'P00228';

  const foundRights =
    role !== "ROLE_ADMIN"
      ? userRights.find((item) => item.process_Id === processId)
      : null;
  const allowCreate = foundRights?.allow_Create === "Y";
  const allowRead = foundRights?.allow_Read === "Y";
  const allowEdit = foundRights?.allow_Update === "Y";
  const allowDelete = foundRights?.allow_Delete === "Y";



  useEffect(() => {
    if (searchData && searchData.activeTab === processId && searchData.profitCenterId && searchData.sbChangeTransId && searchData.sbChangeSrNo) {
    
      getSelectedSbTransferEntry(searchData.sbChangeTransId, searchData.sbChangeSrNo,searchData.profitCenterId);
    }
  }, [searchData]);
  useEffect(() => {

    if (resetFlag) {
      handleReset();
    }    
  }, [resetFlag]);


  const [fromSbNos, setFromSbNos] = useState([]);
  const [selectedFromSbNo, setSelectedFromSbNo] = useState([]);

  const [toSbNos, setToSbNos] = useState([]);
  const [selectedToSbNo, setSelectedToSbNo] = useState([]);

  const initialExportTransfer = {
    companyId: companyid, // String, assuming it's the company id
    branchId: branchId,  // String, assuming it's the branch id
    sbChangeTransId: '',  // String
    srNo: '',  // String
    finYear: '',  // String
    profitcentreId: profitcentre.profitcentreId,  // String
    sbTransId: '',  // String
    trfSbTransId: '',  // String
    sbLineNo: '',  // String
    trfSbLineNo: '',  // String
    sbNo: '',  // String
    trfSbNo: '',  // String
    sbChangeTransDate: null,  // Date (can be a string or Date object depending on usage)
    sbTransDate: null,  // Date
    exporterName: '',  // String
    onAccountOf: '',  // String
    transferPackages: 0,  // BigDecimal (number type in JS)
    transferGrossWeight: 0.0,  // BigDecimal (number type in JS)
    sbDate: null,  // Date
    trfSbDate: '',  // Date
    noOfPackages: 0,  // BigDecimal (number type in JS)
    trfNoOfPackages: 0,  // BigDecimal (number type in JS)
    gateInPackages: 0,  // BigDecimal (number type in JS)
    trfGateInPackages: 0,  // BigDecimal (number type in JS)
    cartedPackages: 0,  // BigDecimal (number type in JS)
    trfCartedPackages: 0,  // BigDecimal (number type in JS)
    nilPackages: 0,  // BigDecimal (number type in JS)
    grossWeight: 0.0,  // BigDecimal (number type in JS)
    trfGrossWeight: 0.0,  // BigDecimal (number type in JS)
    gateInWeight: 0.0,  // BigDecimal (number type in JS)
    trfGateInWeight: 0.0,  // BigDecimal (number type in JS)
    cartedWeight: 0.0,  // BigDecimal (number type in JS)
    trfCartedWeight: 0.0,  // BigDecimal (number type in JS)
    prevTransferPack: 0,  // BigDecimal (number type in JS)
    stuffedQty: 0,  // BigDecimal (number type in JS)
    backToTownPack: 0,  // BigDecimal (number type in JS)
    commodity: '',  // String
    toCommodity: '',  // String
    comments: '',  // String
    status: '',  // String
    createdBy: '',  // String
    createdDate: '',  // Date
    editedBy: '',  // String
    editedDate: '',  // Date
    approvedBy: '',  // String
    approvedDate: '',  // Date
    nilFlag: '',  // String
    exporterName: '',
    chaName: '',
    preTranferedPackages: 0,
    maxQuantity: 0,
  };



  const initialExportTransferDetail = {
    companyId: companyid,
    branchId: branchId,
    finYear: "",
    sbChangeTransId: "",
    transLineId: "",
    cartingTransId: "",
    cartingLineId: "",
    sbTransId: "",
    vehicleNo: "",
    gateInId: "",
    sbNo: "",
    sbLineNo: "",
    trfSbTransId: "",
    trfSbNo: "",
    trfSbLineNo: "",
    cartingPackages: 0,
    outPkgs: 0,
    balancePkgs: 0,
    trfCartedPackages: 0,
    nilPackages: 0,
    cartedWeight: 0.0,
    trfCartedWeight: 0.0,
    status: "",
    createdBy: "",
    createdDate: "", // Store date as string or Date object, depending on your use case
    editedBy: "",
    editedDate: "", // Store date as string or Date object, depending on your use case
    approvedBy: "",
    approvedDate: "", // Store date as string or Date object, depending on your use case
    gateInDate: null,
    gateInPackages: 0,
    cha: '',
    onAccountOf: '',
    grossWeight: 0,
    trfGateInWeight: 0,
    gateInWeight: 0,
    trfGateInPackages: 0,
    gateInPackages: 0
  };



  const [exportTransfer, setExportTransfer] = useState(initialExportTransfer);
  const [exportTransferDetail, setExportTransferDetail] = useState([initialExportTransferDetail]);



  const [validationErrors, setValidationErrors] = useState([]);
  const [validationErrorsGateIns, setValidationErrorsGateIns] = useState([]);



  useEffect(() => {
    const totalTransferPkg = exportTransferDetail.reduce((acc, item) => acc + (Number(item.trfGateInPackages) || 0), 0);
    setTotals({
      packages: totalTransferPkg,
    });
  }, [exportTransferDetail]);

  const handleFromSbNoChange = async (selectedOption) => {
    // Update selectedSbNos   
    setSelectedFromSbNo(selectedOption); // Update the state
    const updates = selectedOption ? {
      sbTransId: selectedOption.sbTransId,
      sbLineNo: selectedOption.sbLineNo,
      sbNo: selectedOption.sbNo,
      sbTransDate: selectedOption.sbTransDate ? new Date(selectedOption.sbTransDate) : null,
      exporter: selectedOption.exporterId,
      cha: selectedOption.cha,
      onAccountOf: selectedOption.onAccountOf,
      transferPackages: 0,
      transferGrossWeight: 0,
      sbDate: selectedOption.sbDate ? new Date(selectedOption.sbDate) : null,
      noOfPackages: selectedOption.noOfPackages,
      gateInPackages: selectedOption.gateInPackages,
      cartedPackages: selectedOption.cartedPackages,
      nilPackages: 0,
      grossWeight: selectedOption.grossWeight,
      gateInWeight: 0,
      cartedWeight: 0,
      prevTransferPack: selectedOption.transferPackages,
      stuffedQty: selectedOption.stuffReqQty,
      backToTownPack: selectedOption.backToTownPack,
      commodity: selectedOption.commodity,
      exporterName: selectedOption.exporterName,
      chaName: selectedOption.chaName,
      preTranferedPackages: selectedOption.transferPackages,
      maxQuantity: selectedOption.maxQuantity
    } :
      {
        sbTransId: '',
        sbLineNo: '',
        sbNo: '',
        sbTransDate: null,
        exporter: '',
        cha: '',
        onAccountOf: '',
        transferPackages: 0,
        transferGrossWeight: 0,
        sbDate: null,
        noOfPackages: 0,
        gateInPackages: 0,
        cartedPackages: 0,
        nilPackages: 0,
        grossWeight: 0,
        gateInWeight: 0,
        cartedWeight: 0,
        prevTransferPack: 0,
        stuffedQty: 0,
        backToTownPack: 0,
        commodity: '',
        exporterName: '',
        chaName: '',
        stuffedQty: 0,
        preTranferedPackages: 0,
        comments: '',
        maxQuantity: 0
      }


    if (selectedOption) {
      setExportTransfer((prevState) => ({
        ...prevState,
        ...updates,
      }));
      await gateTateInEntriesFromSbNo(selectedOption.sbNo, selectedOption.sbLineNo, selectedOption.sbTransId);

    } else {
      setExportTransferDetail([initialExportTransferDetail]);
      setExportTransfer(initialExportTransfer);
      setSelectedToSbNo(null);
    }

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      sbNo: '',
    }));
  }

  const gateTateInEntriesFromSbNo = async (sbNo, sbLineNo, sbTransId) => {
    try {
      const response = await MovementService.gateTateInEntriesFromSbNo(companyid, branchId, profitcentre.profitcentreId, sbNo, sbLineNo, sbTransId, jwtToken);

      // console.log("transfer Detail ", response.data);

      if (Array.isArray(response.data)) {
        setExportTransferDetail(response.data);
      } else {
        setExportTransferDetail([]);
      }
    } catch (error) {
      // console.log("Error getting gateIn entries", error);
      setExportTransferDetail([]);
    }
  }


  const handleToSbNoChange = (selectedOption) => {

    setSelectedToSbNo(selectedOption);

    const updates = selectedOption ? {
      trfSbTransId: selectedOption.sbTransId,
      trfSbLineNo: selectedOption.sbLineNo,
      trfSbNo: selectedOption.sbNo,
      trfSbDate: selectedOption.sbDate ? new Date(selectedOption.sbDate) : null,
      trfNoOfPackages: selectedOption.actualNoOfPackages,
      trfGateInPackages: 0,
      trfCartedPackages: 0,
      nilPackages: 0,
      trfGateInWeight: 0,
      toCommodity: selectedOption.commodity,
      cartedWeight: selectedOption.cartedWeight,
      toGateInPackages: selectedOption.gateInPackages,
      toGateInWeight: 0,
      trfGrossWeight: selectedOption.grossWeight
    } :
      {
        trfSbTransId: '',
        trfSbLineNo: '',
        trfSbNo: '',
        trfSbDate: null,
        trfNoOfPackages: 0,
        trfGateInPackages: 0,
        trfCartedPackages: 0,
        nilPackages: 0,
        trfGrossWeight: 0,
        trfGateInWeight: 0,
        toCommodity: '',
        cartedWeight: 0
      }

    // Update selectedSbNos
    setExportTransfer((prevState) => ({
      ...prevState,
      ...updates,
    }));

    const updatedDetails = exportTransferDetail.map((detail) => ({
      ...detail, // Spread existing properties
      trfSbTransId: selectedOption ? selectedOption.sbTransId : '',
      trfSbNo: selectedOption ? selectedOption.sbNo : '',
      trfSbLineNo: selectedOption ? selectedOption.sbLineNo : '',
      cha: selectedOption ? selectedOption.cha : '',
      onAccountOf: selectedOption ? selectedOption.onAccountOf : '',
      grossWeight: selectedOption ? selectedOption.grossWeight : 0,
      actualNoOfPackages: selectedOption ? selectedOption.actualNoOfPackages : 0
    }));

    // Set the updated array back to the state
    setExportTransferDetail(updatedDetails);

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      trfSbNo: '',
    }));
  }


  const searchSbNos = async (searchvalue, type) => {

    if (!searchvalue) {
      if (type === 'from') {
        setFromSbNos([]);
      } else {
        setToSbNos([]);
      }
      return;
    }
    try {
      const response = await MovementService.searchSbNoForTransfer(companyid, branchId, searchvalue, profitcentre.profitcentreId, type, jwtToken);

      if (type === 'from') {
        setFromSbNos(response.data);
      } else {
        setToSbNos(response.data);
      }
    } catch (error) {
      console.error("Error fetching SB entries:", error);
    }
  };


  const handleHeaderChange = (fieldName, value, type) => {
    // Update exportStuffRequest state

    if (type === 'number') {
      value = value.replace(/[^0-9]/g, '');
    }
    setExportTransfer(prevState => ({
      ...prevState,
      [fieldName]: value
    }));

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: '',
    }));

  };

  const CustomInput = React.forwardRef(({ value, onClick, onKeyDown, className, id }, ref) => (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <input
        ref={ref}
        value={value}
        onClick={onClick}
        onKeyDown={onKeyDown}
        readOnly
        className={className} // Apply the passed className here
        id='service'
        style={{ width: '100%' }} // Adjust as needed
        tabIndex={-1}
      />
      <FontAwesomeIcon
        icon={faCalendarAlt}
        style={{
          position: 'absolute',
          right: '10px',
          color: '#6c757d',
        }}
      />
    </div>
  ));


  const handleFieldChange = (e, index, fieldName, type) => {
    let { value } = e.target;

    // Allow digits and decimal points or only digits based on type
    if (type === 'number') {
      value = value.replace(/[^0-9]/g, '');
    }

    setValidationErrorsGateIns(prevErrors => {
      const updatedErrors = [...prevErrors];
      if (updatedErrors[index]) {
        delete updatedErrors[index][fieldName];
      }
      return updatedErrors;
    });

    // Update the state without validation
    setExportTransferDetail(prevState => {
      const updatedTransDtl = [...prevState];
      updatedTransDtl[index] = {
        ...updatedTransDtl[index],
        [fieldName]: value,
      };

      // Calculate average cargo weight if fieldName is noOfPackagesStuffed
      if (fieldName === 'trfGateInPackages') {

        const currentEntry = updatedTransDtl[index];

        const noOfPackages = parseInt(currentEntry.gateInPackages || 0);
        const totalCargoWeight = parseFloat(currentEntry.gateInWeight || 0);

        // console.log('noOfPackages ', noOfPackages, ' totalCargoWeight ', totalCargoWeight);

        if (noOfPackages > 0) {
          const weightPerPackage = totalCargoWeight / noOfPackages;
          const noOfPackagesStuffed = parseInt(value || 0);
          const averageCargoWeight = (weightPerPackage * noOfPackagesStuffed).toFixed(2);
          // console.log('averageCargoWeight Container', averageCargoWeight);
          updatedTransDtl[index].trfGateInWeight = parseFloat(averageCargoWeight); // Update cargoWeight for exportStuffRequest
        } else {
          updatedTransDtl[index].trfGateInWeight = 0; // or handle as needed
        }
      }

      // // Update validation errors for cargoWeight
      // setValidationErrorsGateIns(prevErrors => {
      //   const updatedErrors = [...prevErrors];
      //   if (updatedErrors[index]) {
      //     delete updatedErrors[index].cargoWeight;
      //   }
      //   return updatedErrors;
      // });

      return updatedTransDtl;
    });
  };




  const validateTransferDetail = (exportTransferDetail) => {
    let errors = [];

    exportTransferDetail.forEach((detail) => {
      const { sbNo, trfSbNo, trfGateInPackages, balancePkgs } = detail;

      let error = {};

      if (!sbNo) error.sbNo = 'sbNo is required.';
      if (!trfSbNo) error.trfSbNo = 'trfSbNo is required.';

      if (parseFloat(trfGateInPackages) > parseFloat(balancePkgs)) {
        error.trfGateInPackages = 'trfCartedPackages must be less than balancePkgs.';
      }
      // console.log(error, 'trfGateInPackages, balancePkgs ', parseFloat(trfGateInPackages), parseFloat(balancePkgs));
      errors.push(error);
    });

    setValidationErrorsGateIns(errors);

    // Check if there are any errors
    return errors.every(error => Object.keys(error).length === 0);
  };


  const validateTransfer = (ExportTransfer) => {

    const { sbNo, sbDate, transferPackages } = ExportTransfer;
    let error = {};

    if (!sbNo) error.sbNo = 'sbNo is required.';
    if (!sbDate) error.sbDate = 'sbDate is required.';
    if (!transferPackages || transferPackages <= 0) {
      error.transferPackages = 'Transfer packages must be greater than 0.';
    }

    setValidationErrors(error);
    return Object.keys(error).length === 0;
  };


  // console.log('validationErrors : ', validationErrors, ' \n validationErrorsGateIns : ', validationErrorsGateIns);

  // console.log('exportTranfer : ', exportTransfer, ' \n exportTranferDetail', exportTransferDetail);

  const handleSave = async (exportTranfer, exportTranferDetail) => {
    if (!validateTransfer(exportTranfer)) {
      return false;
    }

    if (!validateTransferDetail(exportTranferDetail)) {
      return false;
    }

    if (parseFloat(totals.packages) !== parseFloat(exportTranfer.transferPackages)) {

      // console.log('totals.packages : ', parseFloat(totals.packages), ' exportTranfer.transferPackages : ', parseFloat(exportTranfer.transferPackages));

      toast.error('Header and detail trasfered package should be same!', {
        position: 'top-center',
        autoClose: 700,
        style: { width: `27vw` },
      });
      return;
    }

    if (parseFloat(exportTranfer.transferPackages) > (parseFloat(exportTranfer.trfNoOfPackages) - parseFloat(exportTranfer.toGateInPackages))) {

      // console.log('exportTranfer.maxQuantity : ', parseFloat(exportTranfer.maxQuantity), ' exportTranfer.transferPackages : ', parseFloat(exportTranfer.transferPackages));

      toast.warning(<div dangerouslySetInnerHTML={{ __html: `Maximum Transfer packages to SbNo: <strong>${exportTranfer.trfSbNo}</strong> are:<strong> ${(parseFloat(exportTranfer.trfNoOfPackages) - parseFloat(exportTranfer.toGateInPackages))} </strong>` }} />, {
        position: 'top-center',
        autoClose: 1000,
        style: { width: '29vw' },
      });
      return;
    }


    if (parseFloat(exportTranfer.transferPackages) > parseFloat(exportTranfer.maxQuantity)) {

      // console.log('exportTranfer.maxQuantity : ', parseFloat(exportTranfer.maxQuantity), ' exportTranfer.transferPackages : ', parseFloat(exportTranfer.transferPackages));

      toast.warning(<div dangerouslySetInnerHTML={{ __html: `Maximum Transfer packages from Sb No:<strong>${exportTranfer.sbNo}</strong> are:<strong> ${parseFloat(exportTranfer.maxQuantity)} </strong>` }} />, {
        position: 'top-center',
        autoClose: 1000,
        style: { width: '28vw' },
      });
      return;
    }


    // console.log('going to save : ', exportTranferDetail);


    setLoading(true);
    try {
      const response = await MovementService.addExportTransfer(companyid, branchId, exportTranfer, exportTranferDetail, userId, jwtToken);

      const { exportTransfer, exportTransferDetail } = response.data;


      const initialFromSbNo = {
        label: exportTransfer.sbNo,
        value: exportTransfer.sbNo,
      }

      const initialToSbNo = {
        label: exportTransfer.trfSbNo,
        value: exportTransfer.trfSbNo,
      }
      // Set the transformed data into the state
      setSelectedFromSbNo(initialFromSbNo);
      setSelectedToSbNo(initialToSbNo);


      setExportTransfer(exportTransfer);
      setExportTransferDetail(exportTransferDetail);

      if (searchData && (searchData.sbNo || searchData.container)
      ) {
        updatePagesList("P00228");
      }

      toast.success('Data added Successfully!', {
        position: 'top-center',
        autoClose: 700,
      });
    } catch (error) {
      toast.error('Oops something went wrong!', {
        position: 'top-center',
        autoClose: 700,
      });
    } finally {
      setLoading(false);
    }
  };



  const handleReset = async () => {

    // console.log('calling handleReset()');

    setSelectedFromSbNo(null);
    setFromSbNos([]);
    setSelectedToSbNo(null);
    setToSbNos([]);

    setValidationErrors([]);
    setValidationErrorsGateIns([]);
    setExportTransferDetail([initialExportTransferDetail]);
    setExportTransfer(initialExportTransfer);
  };



  const [isModalOpenForGateInSearch, setIsModalOpenForGateInSearch] = useState(false);

  const [searchGateInvalues, setSearchGateInvalues] = useState('');
  const [gateInSearchData, setGateInSearchData] = useState([]);

  const selectGateInSearchRadio = async (sbChangeTransId, srNo, profitCenterId) => {
    await getSelectedSbTransferEntry(sbChangeTransId, srNo, profitCenterId);
    handleCloseGateInSearch();
  }

  const handleCloseGateInSearch = (val) => {
    setIsModalOpenForGateInSearch(false);
    setSearchGateInvalues('');
    setGateInSearchData([]);
  }


  const clearGateInSearchSearch = (val) => {
    setSearchGateInvalues('');
    searchSbTransferSearch();
  }

  const handleOpenSbTransferSearch = async () => {
    setIsModalOpenForGateInSearch(true);
    setSearchGateInvalues('');
    searchSbTransferSearch();
  };


  const formatDate = (value) => {
    if (!value) {
      return "";
    }

    const date = new Date(value);

    // Extract date components
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  const [currentPageGateInSearch, setCurrentPageGateInSearch] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItemGateInSearch = currentPageGateInSearch * itemsPerPage;
  const indexOfFirstItemGateInSearch = indexOfLastItemGateInSearch - itemsPerPage;
  const currentItemsGateInSearch = gateInSearchData.slice(indexOfFirstItemGateInSearch, indexOfLastItemGateInSearch);
  const totalPagesGateInSearch = Math.ceil(gateInSearchData.length / itemsPerPage);

  // Function to handle page change
  const handlePageChangeGateIn = (page) => {
    if (page >= 1 && page <= totalPagesGateInSearch) {
      setCurrentPageGateInSearch(page);
    }
  };


  const displayPagesGateIn = () => {
    const centerPageCount = 5;
    const middlePage = Math.floor(centerPageCount / 2);
    let startPage = currentPageGateInSearch - middlePage;
    let endPage = currentPageGateInSearch + middlePage;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPagesGateInSearch, centerPageCount);
    }

    if (endPage > totalPagesGateInSearch) {
      endPage = totalPagesGateInSearch;
      startPage = Math.max(1, totalPagesGateInSearch - centerPageCount + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };



  const searchSbTransferSearch = async (searchvalue) => {
    setCurrentPageGateInSearch(1);
    setLoading(true);
    try {
      const response = await MovementService.getTransferEntriesToSelect(companyid, branchId, searchvalue, profitcentre.profitcentreId, jwtToken);
      setGateInSearchData(response.data);
    } catch (error) {
      console.error("Error fetching GateIn entries:", error);
    } finally {
      setLoading(false);
    }
  };


  const getSelectedSbTransferEntry = async (sbChangeTransId, srNo, profitCenterId) => {
    // console.log(sbChangeTransId, srNo, profitCenterId);

    setValidationErrors([]);
    setLoading(true);
    try {
      const response = await MovementService.getSelectedTransferEntry(companyid, branchId, profitCenterId, sbChangeTransId, srNo, jwtToken);
      const { exportTransfer, exportTransferDetail } = response.data;

      const initialFromSbNo = {
        label: exportTransfer.sbNo,
        value: exportTransfer.sbNo,
      }

      const initialToSbNo = {
        label: exportTransfer.trfSbNo,
        value: exportTransfer.trfSbNo,
      }
      // Set the transformed data into the state
      setSelectedFromSbNo(initialFromSbNo);
      setSelectedToSbNo(initialToSbNo);




      setExportTransfer(exportTransfer);
      setExportTransferDetail(exportTransferDetail);
    } catch (error) {
      console.error("Error fetching Tally entries:", error);
      // Optionally handle the error further, e.g., show a notification to the user
    } finally {
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

        <div>
          <Row>
            <Col md={2}>
              <Row>
                <Col md={9}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="sbRequestId"
                    >
                      SBChangeTrans Id
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="service"
                      readOnly
                      value={exportTransfer.sbChangeTransId}
                    />
                  </FormGroup>
                </Col>

                <Col md={3} className="d-flex justify-content-end" style={{ marginTop: 21 }}>
                  <button
                    className="btn btn-outline-primary btn-margin newButton"
                    style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    id="submitbtn2"
                    onClick={handleOpenSbTransferSearch}
                  >
                    <FontAwesomeIcon icon={faSearch} size="sm" />
                  </button>
                </Col>
              </Row>
            </Col>







            <Modal Modal isOpen={isModalOpenForGateInSearch} onClose={handleCloseGateInSearch} toggle={handleCloseGateInSearch} style={{ maxWidth: '1100px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>

              <ModalHeader toggle={handleCloseGateInSearch} style={{
                backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
                boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
                border: '1px solid rgba(0, 0, 0, 0.3)',
                borderRadius: '0',
                backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }} >


                <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', color: 'white' }} > <FontAwesomeIcon
                  icon={faSearch}
                  style={{
                    marginRight: '8px',
                    color: 'white',
                  }}
                /> Search SB Transfer</h5>

              </ModalHeader>
              <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <label className="forlabel bold-label" htmlFor="sbRequestId">
                        Search by Value
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="searchGateInvalues"
                        placeholder="SB Change Trans Id/From SBNo/From SBTransId/To SBNo/To SBTransId"
                        maxLength={15}
                        name='searchGateInvalues'
                        value={searchGateInvalues}
                        onChange={(e) => setSearchGateInvalues(e.target.value)}
                      />

                    </FormGroup>
                  </Col>
                  <Col md={6} style={{ marginTop: 24 }}>
                    <button
                      className="btn btn-outline-primary btn-margin newButton"
                      // style={{ marginRight: 10, fontWeight: 'bold' }}
                      style={{ fontSize: 12, marginRight: 10 }}
                      id="submitbtn2"
                      onClick={() => searchSbTransferSearch(searchGateInvalues)}
                    >
                      <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                      Search
                    </button>
                    <button
                      className="btn btn-outline-danger btn-margin newButton"
                      // style={{ marginRight: 10, fontWeight: 'bold' }}
                      style={{ fontSize: 12, marginRight: 10 }}
                      id="submitbtn2"
                      onClick={clearGateInSearchSearch}
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
                      <tr className='text-center'>
                        <th scope="col">#</th>
                        <th scope="col">SB Change Trans Id</th>
                        <th scope="col">SB Change Trans Date</th>
                        <th scope="col">ProfitCenter</th>
                        <th scope="col">SB Trans Id</th>
                        <th scope="col">From SBNo</th>
                        <th scope="col">From SBTransId</th>
                        <th scope="col">From SBDate</th>
                        <th scope="col">To SBNo</th>
                        <th scope="col">To SBTransId</th>
                        <th scope="col">To SBDate</th>
                        <th scope="col">Status</th>

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
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>

                      {currentItemsGateInSearch.map((item, index) => (
                        <>
                          <tr key={index} className='text-center'>
                            <td>
                              <input type="radio" name="radioGroup" onChange={() => selectGateInSearchRadio(item.sbChangeTransId, item.srNo, item.profitcentreId)} value={item.sbChangeTransId} />
                            </td>
                            <td>{item.sbChangeTransId}</td>
                            <td>{formatDate(item.sbChangeTransDate)}</td>
                            <td>{item.sbChangeTransDate}</td>
                            <td>{item.profitCenterName}</td>
                            <td>{item.sbTransId}</td>
                            <td>{item.sbNo}</td>
                            <td>{formatDate(item.sbDate)}</td>
                            <td>{item.trfSbNo}</td>
                            <td>{item.trfSbTransId}</td>
                            <td>{formatDate(item.trfSbDate)}</td>
                            <td>{item[7]}</td>
                            <td>{item.status === 'A' ? 'Approved' : ''}</td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                  <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                    <Pagination.First onClick={() => handlePageChangeGateIn(1)} />
                    <Pagination.Prev
                      onClick={() => handlePageChangeGateIn(currentPageGateInSearch - 1)}
                      disabled={currentPageGateInSearch === 1}
                    />
                    <Pagination.Ellipsis />

                    {displayPagesGateIn().map((pageNumber) => (
                      <Pagination.Item
                        key={pageNumber}
                        active={pageNumber === currentPageGateInSearch}
                        onClick={() => handlePageChangeGateIn(pageNumber)}
                      >
                        {pageNumber}
                      </Pagination.Item>
                    ))}

                    <Pagination.Ellipsis />
                    <Pagination.Next
                      onClick={() => handlePageChangeGateIn(currentPageGateInSearch + 1)}
                      disabled={currentPageGateInSearch === totalPagesGateInSearch}
                    />
                    <Pagination.Last onClick={() => handlePageChangeGateIn(totalPagesGateInSearch)} />
                  </Pagination>
                </div>
              </ModalBody>
            </Modal>

















            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  SBChangeTrans Date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={exportTransfer.sbChangeTransDate}
                    name="sbChangeTransDate"
                    // onChange={(date) => handlePaymentDateChangeHeader(date, 'stuffTallyDate')}
                    placeholderText="Trans Date"
                    dateFormat="dd/MM/yyyy HH:mm"
                    timeInputLabel="Time:"
                    showTimeInput
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    className={`form-control`}
                    wrapperClassName="custom-react-datepicker-wrapper"
                    disabled
                    readOnly
                    id='service'
                    tabIndex={-1}
                  /><FontAwesomeIcon
                    icon={faCalendarAlt}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Profit Centre Id
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  maxLength={20}
                  readOnly
                  value={profitcentre.profitcentreDesc}
                  tabIndex={-1}
                />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label className="forlabel" for="HazardousHazardous">All Packages Amend</label>
                <div style={{ position: 'relative' }}>
                  <Input
                    type="select"
                    name="nilFlag"
                    className={`form-control`}
                    value={exportTransfer.nilFlag}
                    onChange={(e) => handleHeaderChange('nilFlag', e.target.value)}
                    disabled={exportTransfer.sbChangeTransId}
                    id={exportTransfer.sbChangeTransId ? 'service' : ''}

                  >
                    <option value="N">No</option>
                    <option value="Y">Yes</option>
                  </Input>
                </div>
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Status
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  readOnly
                  maxLength={15}
                  value={exportTransfer.status === 'A' ? 'Approved' : ''}
                  tabIndex={-1}
                />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="approvedBy">
                  Created By
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  readOnly
                  maxLength={15}
                  name="createdBy"
                  value={exportTransfer.createdBy}
                />
              </FormGroup>
            </Col>



         
          </Row>


          <Row>


            <Col md={2}>

              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  From SB No<span className="error-message">*</span>
                </label>
                <Select
                  options={fromSbNos}
                  value={selectedFromSbNo}
                  onChange={(selectedOption) => handleFromSbNoChange(selectedOption)}
                  onInputChange={(inputValue, { action }) => {
                    if (action === 'input-change') {
                      searchSbNos(inputValue, 'from');
                    }
                  }}
                  className={`${validationErrors.sbNo ? 'error-border' : ''}`}
                  placeholder="Select SB No"
                  isDisabled={exportTransfer.sbChangeTransId}
                  id={exportTransfer.sbChangeTransId ? 'service' : ''}
                  isClearable
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
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  From SB Trans ID
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  maxLength={20}
                  readOnly
                  value={exportTransfer.sbTransId}
                  tabIndex={-1}
                />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  SB trans date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={exportTransfer.sbTransDate}
                    name="sbTransDate"
                    // onChange={(date) => handlePaymentDateChangeHeader(date, 'stuffTallyDate')}
                    placeholderText="SB Trans Date"
                    dateFormat="dd/MM/yyyy HH:mm"
                    timeInputLabel="Time:"
                    showTimeInput
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    className={`form-control`}
                    wrapperClassName="custom-react-datepicker-wrapper"
                    disabled
                    id='service'
                    readOnly
                    tabIndex={-1}
                  /><FontAwesomeIcon
                    icon={faCalendarAlt}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none"
                    }}
                  />
                </div>
              </FormGroup>
            </Col>



            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  SB Date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={exportTransfer.sbDate}
                    name="sbChangeTransDate"
                    // onChange={(date) => handlePaymentDateChangeHeader(date, 'stuffTallyDate')}
                    placeholderText="SB Date"
                    dateFormat="dd/MM/yyyy HH:mm"
                    timeInputLabel="Time:"
                    showTimeInput
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    className={`form-control`}
                    wrapperClassName="custom-react-datepicker-wrapper"
                    disabled
                    readOnly
                    id='service'
                    tabIndex={-1}
                  /><FontAwesomeIcon
                    icon={faCalendarAlt}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none"
                    }}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  From SB Line No
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  maxLength={20}
                  readOnly
                  value={exportTransfer.sbTransId}
                  tabIndex={-1}
                />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  From SB Commodity
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  maxLength={20}
                  readOnly
                  value={exportTransfer.commodity}
                  tabIndex={-1}
                />
              </FormGroup>
            </Col>




          </Row>
          <Row>

            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Gate In Packages
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  maxLength={20}
                  readOnly
                  value={exportTransfer.gateInPackages}
                  tabIndex={-1}
                />
              </FormGroup>
            </Col>



            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Stufffed Qty
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  maxLength={20}
                  readOnly
                  value={exportTransfer.stuffedQty}
                  tabIndex={-1}
                />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Cargo BTT Qty
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  maxLength={20}
                  readOnly
                  value={exportTransfer.backToTownPack}
                  tabIndex={-1}
                />
              </FormGroup>
            </Col>


            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Transferred Pkgs
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  maxLength={20}
                  readOnly
                  value={exportTransfer.preTranferedPackages}
                  tabIndex={-1}
                />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Exporter Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  maxLength={20}
                  readOnly
                  value={exportTransfer.exporterName}
                  tabIndex={-1}
                />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  CHA
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  maxLength={20}
                  readOnly
                  value={exportTransfer.chaName}
                  tabIndex={-1}
                />
              </FormGroup>
            </Col>



          </Row>

          <Row>

            <Col md={2}>

              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Transfer To SB No<span className="error-message">*</span>
                </label>
                <Select
                  options={toSbNos}
                  value={selectedToSbNo}
                  onChange={(selectedOption) => handleToSbNoChange(selectedOption)}
                  onInputChange={(inputValue, { action }) => {
                    if (action === 'input-change') {
                      searchSbNos(inputValue, 'to');
                    }
                  }}
                  className={`${validationErrors.trfSbNo ? 'error-border' : ''}`}
                  placeholder="Select To SB No"
                  isDisabled={exportTransfer.sbChangeTransId}
                  id={exportTransfer.sbChangeTransId ? 'service' : ''}
                  isClearable
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
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Transfer To SB TransId
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  maxLength={20}
                  readOnly
                  value={exportTransfer.trfSbTransId}
                  tabIndex={-1}
                />
              </FormGroup>
            </Col>



            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Transfer To SB Date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={exportTransfer.trfSbDate}
                    name="sbChangeTransDate"
                    // onChange={(date) => handlePaymentDateChangeHeader(date, 'stuffTallyDate')}
                    placeholderText="Transfer SB Date"
                    dateFormat="dd/MM/yyyy HH:mm"
                    timeInputLabel="Time:"
                    showTimeInput
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    className={`form-control`}
                    wrapperClassName="custom-react-datepicker-wrapper"
                    disabled
                    readOnly
                    id='service'
                    tabIndex={-1}
                  /><FontAwesomeIcon
                    icon={faCalendarAlt}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </FormGroup>
            </Col>








            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Transfer To SB LineNo
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  maxLength={20}
                  readOnly
                  value={exportTransfer.trfSbLineNo}
                  tabIndex={-1}
                />
              </FormGroup>
            </Col>


            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  To SB Commodity
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  maxLength={20}
                  readOnly
                  value={exportTransfer.toCommodity}
                  tabIndex={-1}
                />
              </FormGroup>
            </Col>


           

          </Row>


        </div>

        <hr style={{ margin: 0, padding: 0 }} />

        <div className="mt-2">












          <div
            className="table-responsive"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >

            <h5
              className="pageHead"
              style={{
                fontFamily: "Your-Heading-Font",
                paddingLeft: "2%",
                paddingRight: "-20px",
              }}
            >
              SB Transfer Process
            </h5>

            <Table className="table table-bordered" style={{ border: '2px solid black' }}>
              <thead className="tableHeader">
                <tr>
                  <th colSpan="4" className="text-center"><strong>FROM SHIPPING BILL</strong></th>
                  <th colSpan="2" className="text-center"><strong>TRANSFER DETAILS</strong></th>
                  <th colSpan="2" className="text-center"><strong>TO SHIPPING BILL</strong></th>
                  <th className="text-center"></th>
                </tr>
                <tr>
                  <th scope="col" className="text-center" style={{ color: "black" }}>Sr No</th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>SB Line No</th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>No Of Packages</th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>GateIn Pkg.</th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>Transfer Pkg.</th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>Nil Pkg.</th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>No Of Packages</th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>GateIn Pkg.</th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>Comments</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td className="text-center">1</td>
                  <td className="text-center">
                    <FormGroup>
                      <Input
                        type="text"
                        value={exportTransfer.sbLineNo}
                        className={`inputwidthTuka form-control text-center`}
                        readOnly
                        id="service"
                        tabIndex={-1}
                      />
                    </FormGroup>
                  </td>
                  <td className="text-center">
                    <FormGroup>
                      <Input
                        type="text"
                        value={exportTransfer.noOfPackages}
                        className={`inputwidthTuka form-control text-center`}
                        readOnly
                        id="service"
                        tabIndex={-1}
                      />
                    </FormGroup>

                  </td>
                  <td className="text-center">
                    <FormGroup>
                      <Input
                        type="text"
                        value={exportTransfer.gateInPackages}
                        className={`inputwidthTuka form-control text-center`}
                        readOnly
                        id="service"
                        tabIndex={-1}
                      />
                    </FormGroup>

                  </td>

                  <td className="text-center">

                    <FormGroup>
                      <Input
                        type="text"
                        className={`inputwidthTuka form-control text-center ${validationErrors.transferPackages ? 'error-border' : ''}`}
                        maxLength={8}
                        value={exportTransfer.transferPackages}
                        onChange={(e) => handleHeaderChange('transferPackages', e.target.value, 'number')}
                        readOnly={exportTransfer.sbChangeTransId}
                        id={exportTransfer.sbChangeTransId ? 'service' : ''}
                      />
                    </FormGroup>

                  </td>


                  <td className="text-center">

                    <FormGroup>
                      <Input
                        type="text"
                        value={exportTransfer.nilPackages}
                        className={`inputwidthTuka form-control text-center`}
                        readOnly
                        id="service"
                        tabIndex={-1}
                      />
                    </FormGroup>
                  </td>

                  <td className="text-center">
                    <FormGroup>
                      <Input
                        type="text"
                        value={exportTransfer.trfNoOfPackages}
                        className={`inputwidthTuka form-control text-center`}
                        readOnly
                        id="service"
                        tabIndex={-1}
                      />
                    </FormGroup>

                  </td>
                  <td className="text-center">
                    <FormGroup>
                      <Input
                        type="text"
                        value={exportTransfer.trfGateInPackages}
                        className={`inputwidthTuka form-control text-center`}
                        readOnly
                        id="service"
                        tabIndex={-1}
                      />
                    </FormGroup>
                  </td>
                  <td className="text-center">
                    <FormGroup>
                      <Input
                        type="text"
                        className={`inputwidthTukaMax form-control`}
                        maxLength={50}
                        value={exportTransfer.comments}
                        onChange={(e) => handleHeaderChange('comments', e.target.value)}
                        readOnly={exportTransfer.sbChangeTransId}
                        id={exportTransfer.sbChangeTransId ? 'service' : ''}
                      />
                    </FormGroup>
                  </td>
                </tr>


              </tbody>
            </Table>



          </div>
















        </div>
















        <div>
          <div
            className="table-responsive"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <h5
              className="pageHead"
              style={{
                fontFamily: "Your-Heading-Font",
                paddingLeft: "2%",
                paddingRight: "-20px",
              }}
            >
              Balance Cargo Info
            </h5>
            <Table className="table table-bordered" style={{ border: '2px solid black' }}>
              <thead className="tableHeader">
                <tr>
                  <th scope="col" className="text-center" style={{ color: "black" }}>Sr No</th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>Gate In Id</th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>Gate In Date</th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>Vehicle No</th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>Gate In Pkg.</th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>Out Qty.</th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>Balance Qty.</th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>Transfer Pkg.</th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>Nil Pkg.</th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>Status</th>
                </tr>
              </thead>
              <tbody>


                {exportTransferDetail.map((cargoEntry, index) => (
                  <tr key={index} className="text-center">
                    <td className="text-center">
                      {index + 1}
                    </td>


                    <td className="text-center">
                      <FormGroup>
                        <Input
                          type="text"
                          value={cargoEntry.gateInId}
                          className={`inputwidthTuka form-control text-center`}
                          readOnly
                          id="service"
                          tabIndex={-1}
                        />
                      </FormGroup>
                    </td>




                    <td className="text-center">
                      <DatePicker
                        selected={cargoEntry.gateInDate}
                        // onChange={(date) => handlePaymentDateChange(date, index, 'stuffReqDate', cargoEntry.containerNo)}
                        id="service"
                        disabled
                        name="sbDate"
                        placeholderText="Sb Date"
                        dateFormat="dd/MM/yyyy HH:mm"
                        showTimeInput
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        customInput={<CustomInput className={`inputwidthTukaMax form-control`} />}
                        className={`inputwidthTukaMax form-control`}
                        tabIndex={-1}
                      />

                    </td>

                    <td className="text-center">
                      <FormGroup>
                        <Input
                          type="text"
                          value={cargoEntry.vehicleNo}
                          className={`inputwidthTuka form-control text-center`}
                          maxLength={15}
                          tabIndex={-1}
                          readOnly
                          id="service"
                        />
                      </FormGroup>
                    </td>


                    <td className="text-center">
                      <FormGroup>
                        <Input
                          type="text"
                          value={cargoEntry.gateInPackages}
                          className={`inputwidthTukaMin form-control text-center`}
                          maxLength={15}
                          tabIndex={-1}
                          readOnly
                          id="service"
                        />
                      </FormGroup>
                    </td>


                    <td className="text-center">
                      <FormGroup>
                        <Input
                          type="text"
                          value={cargoEntry.outPkgs}
                          className={`inputwidthTukaMin form-control text-center`}
                          maxLength={15}
                          tabIndex={-1}
                          readOnly
                          id="service"
                        />
                      </FormGroup>
                    </td>


                    <td className="text-center">
                      <FormGroup>
                        <Input
                          type="text"
                          value={cargoEntry.balancePkgs}
                          className={`inputwidthTukaMin form-control text-center`}
                          readOnly
                          id="service"
                          tabIndex={-1}
                        />
                      </FormGroup>
                    </td>


                    <td className="text-center">
                      <FormGroup>
                        <Input
                          type="text"
                          className={`inputwidthTuka form-control text-center ${validationErrorsGateIns[index]?.trfGateInPackages ? 'error-border' : ''}`}
                          maxLength={15}
                          readOnly={exportTransfer.sbChangeTransId}
                          id={exportTransfer.sbChangeTransId ? 'service' : ''}
                          onChange={(e) => handleFieldChange(e, index, 'trfGateInPackages', 'number')}
                          value={cargoEntry.trfGateInPackages}
                        />
                      </FormGroup>
                    </td>

                    <td className="text-center">
                      <FormGroup>
                        <Input
                          type="text"
                          className={`inputwidthTuka form-control text-center`}
                          readOnly
                          id="service"
                          tabIndex={-1}
                          value={cargoEntry.nilPackages}
                        />
                      </FormGroup>
                    </td>

                    <td className="text-center">
                      {cargoEntry.status === 'A' ? 'Approved' : ''}
                    </td>

                  </tr>
                ))}

              </tbody>
            </Table>


          </div>
        </div>
        <Row className="text-center">
          <Col>
            <button
              className="btn btn-outline-primary btn-margin newButton"
              style={{ marginRight: 10 }}
              id="submitbtn2"
              onClick={(e) => handleSave(exportTransfer, exportTransferDetail)}
              disabled={exportTransfer.sbChangeTransId}
            >
              <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
              Save
            </button>

            <button
              className="btn btn-outline-danger btn-margin newButton"
              style={{ marginRight: 10 }}
              id="submitbtn2"
              onClick={handleReset}
            >
              <FontAwesomeIcon
                icon={faRefresh}
                style={{ marginRight: "5px" }}
              />
              Clear
            </button>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default SBTransferProcess;
