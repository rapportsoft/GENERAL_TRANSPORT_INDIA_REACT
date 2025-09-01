// // import AuthContext from "../Components/AuthProvider";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import React, { useEffect, useState, useContext } from "react";
// // import "../Components/Style.css";
// // import ShipingBillNew from "./ShipingBillNew";
// // import {
// //   Card,
// //   CardBody,
// //   Row,
// //   Col,
// //   FormGroup,
// // } from "reactstrap";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faArrowAltCircleLeft, faSearch, faRefresh, faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
// // import "../assets/css/style.css";
// // import "../Components/Style.css";
// // import { Button } from "react-bootstrap";
// // import ExportCargoGateIn from "./ExportCargoGateIn";
// // import ExportCarting from "./ExportCarting";
// // import SBEndoresment from "./SBEndoresment";
// // import SBWiseStuffingRequest from "./SBWiseStuffingRequest";
// // import StuffingTallyCLP from "./StuffingTallyCLP";
// // import SBWiseTallyCLP from "./SBWiseTallyCLP";
// // import ExportGateOut from "./ExportGateOut";
// // import CargoBackToTown from "./CargoBackToTown";
// // import PortReturnContainerGateIn from "./PortReturnContainerGateIn";
// // import ExportReworkingContainer from "./ExportReworkingContainer";
// // import SBTransferProcess from "./SBTransferProcess";
// // import ContainerWiseStuffing from "./ContainerWiseStuffing";
// // import ShippingBillHistory from "./ShippingBillHistory";
// // import ShippingBillWiseGateOutPass from "./ShippingBillWiseGateOutPass";
// // import ExportSSRActivity from "./ExportSSRActivity";
// // import BufferFDSOnWheel from "./BufferFDSOnWheel";
// // import ExportEmptyContainerGateIn from "./ExportEmptyContainerGateIn";
// // import BufferFDSOnWheelContainerCLP from "./BufferFDSOnWheelContainerCLP";
// // import ExportMovement from "./ExportMovement";
// // import BufferWorkOrder from "./BufferWorkOrder";
// // import NewExportAudit from "./NewExportAudit";
// // import useAxios from '../Components/useAxios';
// // import { CSSTransition } from 'react-transition-group';
// // import cfsService from '../service/CFSService';
// // import { toast } from 'react-toastify';

// // export default function Export() {
// //   const navigate = useNavigate();
// //   const { isAuthenticated } = useContext(AuthContext);

// //   // If the user is not authenticated, redirect to the login page
// //   useEffect(() => {
// //     if (!isAuthenticated) {
// //       navigate(
// //         "/login?message=You need to be authenticated to access this page."
// //       );
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
// //     tabMenus,
// //     userRights,
// //   } = useContext(AuthContext);

// //   const location = useLocation();
// //   const searchParams = new URLSearchParams(location.search);
// //   const processId = searchParams.get("process_id");

// //   const [activeTab, setActiveTab] = useState("home-1");


// //   const axios = useAxios();
// //   const [loading, setLoading] = useState(false);

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
// //     label: {
// //       backgroundColor: '#e3eefa',
// //       padding: '5px',
// //       borderRadius: '4px',
// //     }
// //   };

// //   const [isRowVisible, setIsRowVisible] = useState(true);
// //   const toggleRowVisibility = () => {
// //     setIsRowVisible(!isRowVisible);
// //   };


// //   const axiosInstance = useAxios();
// //   const CFSService = new cfsService(axiosInstance);


// //   const initialSearchValue = {
// //     companyId: companyid,
// //     branchId: branchId,
// //     sbNo: '',
// //     vehicleNo: '',
// //     containerNo: '',
// //     bookingNo: '',
// //     pod: ''
// //   }

// //   const initialsearchData = {
// //     companyId: companyid,
// //     branchId: branchId,
// //     sbNo: '',
// //     sbTransId: '',
// //     hsbSbTransId:'',
// //     gateInId: '',
// //     profitCenterId: '',
// //     activeTab:'',
// //     cartingTransId: '',
// //     cartingLineId: '',
// //     cartingprofitCentre: '',
// //     cartingSbNo: ''
// //   }
// // const [resetFlag, setResetFlag] = useState(false);
// //   const [searchData, setSearchData] = useState(initialsearchData);

// //   useEffect(() => {
// //     setSearchData(prevState => ({
// //       ...prevState,
// //       activeTab: activeTab
// //     }));
// //   }, [activeTab]);


// //   const [pagesList, setPagesList] = useState([]);
// //   const [searchCriteria, setSearchCriteria] = useState(initialSearchValue);

// //   console.log('resetFlag ',resetFlag);
  

// //   const reset = async () => {
// //     setSearchCriteria(initialSearchValue);
// //     setPagesList([]);
// //     setSearchData(initialsearchData);
// //     setActiveTab('home-1');
// //     setResetFlag(prevState => !prevState);
// //   }

// //   const handleChange = (e) => {
// //     const { id, value } = e.target;
// //     setSearchCriteria((prevCriteria) => ({
// //       ...prevCriteria,
// //       [id]: value,
// //     }));
// //   };



// //   const searchExportMain = async (searchCriteria) => {
// //     setResetFlag(false);
// //     if (
// //       searchCriteria &&
// //       !searchCriteria.sbNo &&
// //       !searchCriteria.vehicleNo &&
// //       !searchCriteria.containerNo &&
// //       !searchCriteria.bookingNo &&
// //       !searchCriteria.pod
// //     ) {
// //       toast.error('Please Enter at least one field!', {
// //         position: 'top-center',
// //         autoClose: 1000,
// //       });
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const response = await CFSService.searchExportMain(searchCriteria, jwtToken);

// //       const { allowedList, data } = response.data;
// //       setPagesList(allowedList);
// //       setSearchData(data);
// //       setActiveTab('home-1');
// //       renderTabs();
// //     } catch (error) {
// //       setPagesList([]);
// //       setSearchData(initialsearchData);
// //       setActiveTab('home-1');
// //       // Log error details (optional)
// //       console.error('An error occurred while fetching the export data:', error);
// //       // Show error message based on server response
// //       if (error.response && error.response.data) {
// //         // Show the specific error message from the server
// //         toast.error(error.response.data, {
// //           position: 'top-center',
// //           autoClose: 1000,
// //         });
// //       } else {
// //         toast.error('Oops something went wrong!', {
// //           position: 'top-center',
// //           autoClose: 1000,
// //         });
// //       }
// //     } finally {
// //       setLoading(false);
// //       // setPagesList([]);
// //       setActiveTab('home-1');
// //       renderTabs();
// //     }
// //   };


// //   const renderTabs = () => {
// //     const hasRights = (tab) => {
// //       const userRight = userRights.find((right) => right.process_Id === tab.processId);
// //       return userRight && userRight.allow_Read === "Y";
// //     };

// //     let filteredTabMenus; // Further filter based on user rights

// //     const isAdmin = role === "ROLE_ADMIN";

// //     if (isAdmin) {
// //       filteredTabMenus = tabMenus.filter((tab) => tab.pprocess_Id === processId);
// //     }
// //     else {
// //       filteredTabMenus = tabMenus
// //         .filter((tab) => tab.pprocess_Id === processId) // Filter based on processId
// //         .filter((tab) => hasRights(tab));
// //     }

// //     return (
// //       <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', width: '100%', height: '54px' }}>
// //         <ul className="nav nav-tabs" style={{ display: 'flex', flexWrap: 'nowrap' }}>
// //           {filteredTabMenus.map((tab) => {
// //             const isEnabled = pagesList.length === 0 || pagesList.includes(tab.processId);
// //             const isTabDisabled = !isEnabled;

// //             const tabStyle = {
// //               whiteSpace: 'nowrap',
// //               backgroundColor: isTabDisabled ? '#E0E0E0' : '', // Change to your desired color
// //             };

// //             return (
// //               <li className="nav-item flex-fill" key={tab.processId} role="presentation" style={{ flex: '0 0 auto' }}>
// //                 <button
// //                   className={`nav-link border ${activeTab === tab.processId ? "active" : ""}`}
// //                   id={tab.processId}
// //                   data-bs-toggle="tab"
// //                   data-bs-target={`#bordered-justified-${tab.processId}`}
// //                   type="button"
// //                   role="tab"
// //                   aria-controls={`bordered-justified-${tab.processId}`}
// //                   aria-selected={activeTab === tab.processId}
// //                   onClick={() => handleTabClick(tab.processId)}
// //                   disabled={isTabDisabled}
// //                   style={tabStyle}
// //                 >
// //                   {tab.child_Menu_Name}
// //                 </button>
// //               </li>
// //             );
// //           })}
// //         </ul>
// //       </div>
// //     );
// //   };

// //   const handleTabClick = (tabId) => {
// //     setActiveTab(tabId);
// //   };
// //   const [sealCuttingData, setSealCuttingData] = useState([
// //     { label: "ItemWise SealCutting", value: "itemwise" },
// //     { label: "Containerwise Cutting", value: "containerwise" },
// //   ]);
// //   const [selectSealCuttingType, setSelectSealCuttingType] = useState("");

// //   const handleSealCuttingChange = async (selectedOption, { action }) => {
// //     if (action === "clear") {
// //       setSelectSealCuttingType("");
// //     } else {
// //       setSelectSealCuttingType(selectedOption ? selectedOption.value : "");
// //     }
// //   };

// //   // CARGO EXAMINATION
// //   const [errors, setErrors] = useState({});
// //   const [examTallyIds, setExamTallyIds] = useState([]);
// //   const [examTallyId, setExamTallyId] = useState(null);

// //   const handleKeyDown = (event, name) => {
// //     if (event.key === "Enter") {
// //       alert("Hii : " + name + " " + new Date());
// //     }
// //   };

// //   const [selectedGatePassType, setSelectedGatePassType] = useState("");

// //   const handleSelectChange = (event) => {
// //     setSelectedGatePassType(event.target.value);
// //   };

// //   const [uploadData, setUploadData] = useState([
// //     { label: "IGM File Upload", value: "IGM File Upload" },
// //     { label: "IGM Excel Upload", value: "IGM Excel Upload" },
// //     { label: "Scanning List Upload", value: "Scanning List Upload" },
// //   ]);

// //   const [selectUploadType, setSelectUploadType] = useState("");

// //   const handleUploadTypeChange = async (selectedOption, { action }) => {
// //     if (action === "clear") {
// //       setSelectUploadType("");
// //     } else {
// //       setSelectUploadType(selectedOption ? selectedOption.value : "");
// //     }
// //   };

// //   //-----------------------------IGM Entry Start

// //   const [igmData, setIgmData] = useState({
// //     companyId: "",
// //     branchId: "",
// //     finYear: "",
// //     igmTransId: "",
// //     profitcentreId: "",
// //     igmNo: "",
// //     docDate: null,
// //     igmDate: null,
// //     viaNo: "",
// //     vesselId: "",
// //     voyageNo: "",
// //     port: "",
// //     vesselEta: null,
// //     vesselArvDate: null,
// //     vesselArvTime: "",
// //     shippingLine: "",
// //     shippingAgent: "",
// //     comments: "",
// //     portJo: "",
// //     portJoDate: null,
// //     partyId: "",
// //     dataInputStatus: "N",
// //     exportJoFileName: "",
// //     entryStatus: "",
// //     status: "",
// //     createdBy: "",
// //     createdDate: null,
// //     editedBy: "",
// //     editedDate: null,
// //     approvedBy: "",
// //     approvedDate: null,
// //     scanningDate: null,
// //     manualLinkFlag: "N",
// //   });

// //   const handleIgmDataChange = (e) => {
// //     const { name, value } = e.target;
// //     setIgmData((prevState) => ({
// //       ...prevState,
// //       [name]: value,
// //     }));
// //   };

// //   const handleDocDate = (date) => {
// //     setIgmData({
// //       ...igmData,
// //       docDate: date,
// //     });
// //   };

// //   const handleIgmDate = (date) => {
// //     setIgmData({
// //       ...igmData,
// //       igmDate: date,
// //     });
// //   };

// //   const handleScanningDate = (date) => {
// //     setIgmData({
// //       ...igmData,
// //       scanningDate: date,
// //     });
// //   };

// //   const handleVesselArvDate = (date) => {
// //     setIgmData({
// //       ...igmData,
// //       vesselArvDate: date,
// //     });
// //   };

// //   const handleVesselBerthDate = (date) => {
// //     setIgmData({
// //       ...igmData,
// //       vesselEta: date,
// //     });
// //   };

// //   const [igmErrors, setIgmErrors] = useState({
// //     viaNo: "",
// //     igmNo: "",
// //     igmDate: "",
// //     port: "",
// //     vessel: "",
// //     shippingLine: "",
// //     vesselBerthDate: "",
// //     shippingAgent: "",
// //   });

// //   const handleOpenIgmAddDetails = () => {
// //     handleTabClick("P00211");
// //   };

// //   const getPortData = () => { };

// //   const [igmCrgData, setIgmCrgData] = useState([
// //     {
// //       companyId: "",
// //       branchId: "",
// //       finYear: "",
// //       igmTransId: "",
// //       profitcentreId: "",
// //       igmLineNo: "",
// //       igmNo: "",
// //       cycle: "IMP",
// //       viaNo: "",
// //       blNo: "",
// //       blDate: null,
// //       cargoMovement: "",
// //       sampleQty: 0,
// //       importerId: "",
// //       importerName: "",
// //       importerAddress1: "",
// //       importerAddress2: "",
// //       importerAddress3: "",
// //       notifyPartyName: "",
// //       notifiedAddress1: "",
// //       notifiedAddress2: "",
// //       notifiedAddress3: "",
// //       oldImporterName: "",
// //       oldImporterAddress1: "",
// //       oldImporterAddress2: "",
// //       oldImporterAddress3: "",
// //       origin: "",
// //       destination: "",
// //       commodityDescription: "",
// //       commodityCode: "",
// //       areaUsed: 0,
// //       noOfPackages: 0,
// //       qtyTakenOut: 0,
// //       qtyTakenOutWeight: 0,
// //       grossWeight: 0,
// //       weighmentWeight: 0,
// //       unitOfWeight: "",
// //       typeOfPackage: "",
// //       cargoType: "",
// //       imoCode: "",
// //       unNo: "",
// //       dataInputStatus: "",
// //       entryStatus: "",
// //       actualNoOfPackages: 0,
// //       damagedNoOfPackages: 0,
// //       gainLossPackage: "0",
// //       yardLocation: "",
// //       yardBlock: "",
// //       blockCellNo: "",
// //       noOfDestuffContainers: 0,
// //       noOfContainers: 0,
// //       examTallyId: "",
// //       examTallyDate: null,
// //       blTariffNo: "",
// //       destuffId: "",
// //       destuffCharges: 0,
// //       destuffDate: null,
// //       cargoValue: 0,
// //       cargoDuty: 0,
// //       gateOutNo: "",
// //       gateOutDate: null,
// //       marksOfNumbers: "",
// //       holdingAgent: "",
// //       holdingAgentName: "",
// //       holdDate: null,
// //       releaseDate: null,
// //       holdRemarks: "",
// //       holdStatus: "",
// //       releaseAgent: "",
// //       releaseRemarks: "",
// //       noticeId: "",
// //       noticeType: "",
// //       noticeDate: null,
// //       auctionStatus: "N",
// //       status: "",
// //       customerId: "",
// //       blUpdaterUser: "",
// //       blUpdaterFlag: "N",
// //       blUpdaterDate: null,
// //       blReportUser: "",
// //       blReportFlag: "N",
// //       blReportDate: null,
// //       createdBy: "",
// //       createdDate: null,
// //       editedBy: "",
// //       editedDate: null,
// //       approvedBy: "",
// //       approvedDate: null,
// //       hazReeferRemarks: "",
// //       crgAllowFlag: "N",
// //       othPartyId: "",
// //       mergeStatus: "",
// //       mergeCreatedDate: null,
// //       mergeCreatedBy: "",
// //       mergeApprovedBy: "",
// //       mergeApprovedDate: null,
// //       oldLineNo: "",
// //       riskStatus: "N",
// //       riskStatusBy: "",
// //       riskStatusDate: null,
// //       smtpFlag: "N",
// //       smtpStatusBy: "",
// //       smtpStatusDate: null,
// //       newFwdId: "",
// //       primaryItem: "Y",
// //       igmSendStatus: "N",
// //       igmSendDate: null,
// //       partDeStuffId: "",
// //       partDeStuffDate: null,
// //       igmImporterName: "",
// //       igmImporterAddress1: "",
// //       igmImporterAddress2: "",
// //       igmImporterAddress3: "",
// //     },
// //   ]);

// //   const [igmCnData, setIgmCnData] = useState([
// //     {
// //       companyId: "",
// //       branchId: "",
// //       finYear: "",
// //       igmTransId: "",
// //       profitcentreId: "",
// //       igmNo: "",
// //       igmLineNo: "",
// //       containerNo: "",
// //       viaNo: "",
// //       cycle: "IMP",
// //       cycleUpdatedBy: "",
// //       cycleUpdatedDate: "",
// //       containerSize: "",
// //       containerType: "",
// //       haz: "N",
// //       hazClass: "",
// //       typeOfContainer: "",
// //       oldTypeOfContainer: "",
// //       overDimension: "N",
// //       shift: "",
// //       iso: "",
// //       internalShifting: "N",
// //       beNo: "",
// //       beDate: "",
// //       containerWeight: 0.0,
// //       containerStatus: "",
// //       containerSealNo: "",
// //       customsSealNo: "",
// //       dataInputStatus: " ",
// //       entryStatus: "",
// //       customsSample: "",
// //       customsSampleDate: "",
// //       scannerType: "",
// //       reExport: "N",
// //       extraTransport: "N",
// //       extraTransportDate: "",
// //       fumigation: "N",
// //       fumigationDate: "",
// //       movementReqId: "",
// //       sealCuttingType: "",
// //       cargoValue: 0.0,
// //       cargoDuty: 0.0,
// //       blStatus: "",
// //       marketingPerson: "",
// //       movementType: "",
// //       sealCutTransId: "",
// //       containerExamStatus: "",
// //       sealCutReqDate: "",
// //       containerExamDate: "",
// //       mobileNo: "",
// //       sealCutRemarks: "",
// //       containerExamRemarks: "",
// //       actualNoOfPackages: 0,
// //       damagedNoOfPackages: 0,
// //       yardLocation: "",
// //       yardBlock: "",
// //       blockCellNo: "",
// //       yardLocation1: "",
// //       yardBlock1: "",
// //       blockCellNo1: "",
// //       blTariffNo: "",
// //       deStuffId: "",
// //       typeOfCargo: "",
// //       destuffStatus: "N",
// //       deStuffDate: "",
// //       doEntryFlag: "N",
// //       doEntryDate: "",
// //       forceEntryFlag: "N",
// //       forceEntryDate: "",
// //       nocIssuedBy: "",
// //       nocIssuedDate: "",
// //       icdFlag: "N",
// //       icdPlace: "",
// //       icdDate: "",
// //       deliveryDate: "",
// //       accountingDate: "",
// //       railReservationDate: "",
// //       transporterId: "",
// //       handOverTo: "",
// //       handOverDate: "",
// //       raContractNo: "",
// //       raContractDate: "",
// //       noOfCoils: 0,
// //       noOfCoilBundles: 0,
// //       noOfLooseCoils: 0,
// //       unstuffingDoneFlag: "N",
// //       unstuffingType: "N",
// //       lastChangedOn: "",
// //       lastChangedBy: "",
// //     },
// //   ]);

// //   return (
// //     <>
// //       <div className="Container">

// //         {loading && (
// //           <div style={styles.overlay}>
// //             <div className="loader">
// //               <div className="truckWrapper">
// //                 <div className="truckBody">
// //                   <svg
// //                     xmlns="http://www.w3.org/2000/svg"
// //                     fill="none"
// //                     viewBox="0 0 198 93"
// //                     className="trucksvg"
// //                   >
// //                     <path
// //                       strokeWidth="3"
// //                       stroke="#282828"
// //                       fill="#F83D3D"
// //                       d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
// //                     ></path>
// //                     <path
// //                       strokeWidth="3"
// //                       stroke="#282828"
// //                       fill="#7D7C7C"
// //                       d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
// //                     ></path>
// //                     <path
// //                       strokeWidth="2"
// //                       stroke="#282828"
// //                       fill="#282828"
// //                       d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"
// //                     ></path>
// //                     <rect
// //                       strokeWidth="2"
// //                       stroke="#282828"
// //                       fill="#FFFCAB"
// //                       rx="1"
// //                       height="7"
// //                       width="5"
// //                       y="63"
// //                       x="187"
// //                     ></rect>
// //                     <rect
// //                       strokeWidth="2"
// //                       stroke="#282828"
// //                       fill="#282828"
// //                       rx="1"
// //                       height="11"
// //                       width="4"
// //                       y="81"
// //                       x="193"
// //                     ></rect>
// //                     <rect
// //                       strokeWidth="3"
// //                       stroke="#282828"
// //                       fill="#DFDFDF"
// //                       rx="2.5"
// //                       height="90"
// //                       width="121"
// //                       y="1.5"
// //                       x="6.5"
// //                     ></rect>
// //                     <rect
// //                       strokeWidth="2"
// //                       stroke="#282828"
// //                       fill="#DFDFDF"
// //                       rx="2"
// //                       height="4"
// //                       width="6"
// //                       y="84"
// //                       x="1"
// //                     ></rect>
// //                   </svg>
// //                 </div>
// //                 <div className="truckTires">
// //                   <svg
// //                     xmlns="http://www.w3.org/2000/svg"
// //                     fill="none"
// //                     viewBox="0 0 30 30"
// //                     className="tiresvg"
// //                   >
// //                     <circle
// //                       strokeWidth="3"
// //                       stroke="#282828"
// //                       fill="#282828"
// //                       r="13.5"
// //                       cy="15"
// //                       cx="15"
// //                     ></circle>
// //                     <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
// //                   </svg>
// //                   <svg
// //                     xmlns="http://www.w3.org/2000/svg"
// //                     fill="none"
// //                     viewBox="0 0 30 30"
// //                     className="tiresvg"
// //                   >
// //                     <circle
// //                       strokeWidth="3"
// //                       stroke="#282828"
// //                       fill="#282828"
// //                       r="13.5"
// //                       cy="15"
// //                       cx="15"
// //                     ></circle>
// //                     <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
// //                   </svg>
// //                 </div>
// //                 <div className="road"></div>
// //                 <svg
// //                   xmlSpace="preserve"
// //                   viewBox="0 0 453.459 453.459"
// //                   xmlnsXlink="http://www.w3.org/1999/xlink"
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   id="Capa_1"
// //                   version="1.1"
// //                   fill="#000000"
// //                   className="lampPost"
// //                 >
// //                   <path
// //                     d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993
// //             c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514
// //             c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16
// //             c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914
// //             h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75
// //             v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795
// //             V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0z
// //             M232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017
// //             h78.747C231.693,100.736,232.77,106.162,232.77,111.694z"
// //                   ></path>
// //                 </svg>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '2%', paddingRight: '2%' }}>
// //           <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }}>
// //             {" "}
// //             <FontAwesomeIcon
// //               icon={faArrowAltCircleLeft}
// //               style={{
// //                 marginRight: "8px",
// //                 color: "black", // Set the color to golden
// //               }}
// //             />
// //             Export
// //           </h5>

// //           <div onClick={toggleRowVisibility} style={{ cursor: 'pointer', textAlign: 'right' }}>
// //             <FontAwesomeIcon icon={isRowVisible ? faChevronUp : faChevronDown} />
// //           </div>
// //         </div>

// //         <Card style={{ backgroundColor: "#F8F8F8" }}>
// //           <CardBody>
// //             <CSSTransition
// //               in={isRowVisible}
// //               timeout={300}
// //               classNames="row-animation"
// //               unmountOnExit
// //             >

// //               <Row>
// //                 <Col md={2}>
// //                   <FormGroup>
// //                     <label className="forlabel" htmlFor="sbNo">
// //                       SB No
// //                     </label>
// //                     <input
// //                       placeholder="Enter SB No"
// //                       className="form-control"
// //                       id="sbNo"
// //                       value={searchCriteria.sbNo}
// //                       onChange={handleChange}
// //                     />
// //                   </FormGroup>
// //                 </Col>
// //                 <Col md={2}>
// //                   <FormGroup>
// //                     <label className="inputHeader" htmlFor="containerNo">
// //                       Container No
// //                     </label>
// //                     <input
// //                       placeholder="Enter Container No"
// //                       className="form-control"
// //                       id="containerNo"
// //                       value={searchCriteria.containerNo}
// //                       onChange={handleChange}
// //                     />
// //                   </FormGroup>
// //                 </Col>
// //                 <Col md={2}>
// //                   <FormGroup>
// //                     <label className="forlabel" htmlFor="vehicleNo">
// //                       Vehicle No
// //                     </label>
// //                     <input
// //                       placeholder="Enter Vehicle No"
// //                       className="form-control"
// //                       id="vehicleNo"
// //                       value={searchCriteria.vehicleNo}
// //                       onChange={handleChange}
// //                     />
// //                   </FormGroup>
// //                 </Col>
// //                 <Col md={2}>
// //                   <FormGroup>
// //                     <label className="inputHeader" htmlFor="bookingNo">
// //                       Booking No
// //                     </label>
// //                     <input
// //                       placeholder="Enter Booking No"
// //                       className="form-control"
// //                       id="bookingNo"
// //                       value={searchCriteria.bookingNo}
// //                       onChange={handleChange}
// //                     />
// //                   </FormGroup>
// //                 </Col>
// //                 <Col md={2}>
// //                   <FormGroup>
// //                     <label className="inputHeader" htmlFor="pod">
// //                       POD
// //                     </label>
// //                     <input
// //                       placeholder="Enter Pod"
// //                       className="form-control"
// //                       id="pod"
// //                       value={searchCriteria.pod}
// //                       onChange={handleChange}
// //                     />
// //                   </FormGroup>
// //                 </Col>
// //                 <Col md={2} style={{ marginTop: 24 }}>
// //                   <button
// //                     className="btn btn-outline-success btn-margin newButton"
// //                     id="submitbtn2"
// //                     style={{ fontSize: 11, marginRight: 5 }}
// //                     onClick={() => searchExportMain(searchCriteria)}
// //                   >
// //                     <FontAwesomeIcon icon={faSearch} style={{ marginRight: '1px' }} />
// //                     Search
// //                   </button>
// //                   <button
// //                     className="btn btn-outline-danger btn-margin newButton"
// //                     style={{ fontSize: 11 }}
// //                     id="submitbtn2"
// //                     onClick={reset}
// //                   >
// //                     <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '1px' }} />
// //                     Reset
// //                   </button>
// //                 </Col>
// //               </Row>

// //             </CSSTransition>
// //             <Row>
// //               <div className="tabs-container">
// //                 <ul
// //                   style={{ border: "1px solid black" }}
// //                   className="nav nav-tabs nav-tabs-bordered d-flex"
// //                   id="borderedTabJustified"
// //                   role="tablist"
// //                 >
// //                   {renderTabs()}
// //                 </ul>
// //               </div>
// //               <div
// //                 className="tab-content pt-2"
// //                 id="borderedTabJustifiedContent"
// //               >
// //                 <div
// //                   className={`tab-pane fade ${activeTab === "P00216" ? "show active" : ""
// //                     }`}
// //                   id="bordered-justified-profile-2"
// //                   role="tabpanel"
// //                   aria-labelledby="2"
// //                 >
// //                   <ShipingBillNew searchData = {searchData} resetFlag = {resetFlag} />
// //                 </div>

// //                 <div
// //                   className={`tab-pane fade ${activeTab === "P00217" ? "show active" : ""
// //                     }`}
// //                   id="bordered-justified-contact-3"
// //                   role="tabpanel"
// //                   aria-labelledby="3"
// //                 >
// //                   <ExportCargoGateIn searchData = {searchData} resetFlag = {resetFlag} />
// //                 </div>

// //                 <div
// //                   className={`tab-pane fade ${activeTab === "P00218" ? "show active" : ""
// //                     }`}
// //                   id="bordered-justified-home-4"
// //                   role="tabpanel"
// //                   aria-labelledby="4"
// //                 >
// //                   <ExportCarting searchData = {searchData} resetFlag = {resetFlag} />
// //                 </div>

// //                 <div
// //                   className={`tab-pane fade ${activeTab === "P00219" ? "show active" : ""
// //                     }`}
// //                   id="bordered-justified-cargo-exmination"
// //                   role="tabpanel"
// //                   aria-labelledby="5"
// //                 >
// //                   <ExportEmptyContainerGateIn searchData = {searchData} resetFlag = {resetFlag} />
// //                 </div>

// //                 <div
// //                   className={`tab-pane fade ${activeTab === "P00220" ? "show active" : ""
// //                     }`}
// //                   id="bordered-justified-Destuff"
// //                   role="tabpanel"
// //                   aria-labelledby="6"
// //                 >
// //                   <SBWiseStuffingRequest />
// //                 </div>

// //                 <div
// //                   className={`tab-pane fade ${activeTab === "P00221" ? "show active" : ""
// //                     }`}
// //                   id="bordered-justified-Gate Pass"
// //                   role="tabpanel"
// //                   aria-labelledby="7"
// //                 >
// //                   <StuffingTallyCLP searchData = {searchData} resetFlag = {resetFlag} />
// //                 </div>
// //                 <div
// //                   className={`tab-pane fade ${activeTab === "P00222" ? "show active" : ""
// //                     }`}
// //                   id="bordered-justified-Gate Out"
// //                   role="tabpanel"
// //                   aria-labelledby="8"
// //                 >
// //                   <SBWiseTallyCLP />
// //                 </div>

// //                 <div
// //                   className={`tab-pane fade ${activeTab === "P00223" ? "show active" : ""
// //                     }`}
// //                   id="bordered-justified-Gate Out"
// //                   role="tabpanel"
// //                   aria-labelledby="8"
// //                 >
// //                   <ExportGateOut searchData = {searchData} resetFlag = {resetFlag} />
// //                 </div>
// //                 <div
// //                   className={`tab-pane fade ${activeTab === "P00225" ? "show active" : ""
// //                     }`}
// //                   id="bordered-justified-Gate Out"
// //                   role="tabpanel"
// //                   aria-labelledby="8"
// //                 >
// //                   <CargoBackToTown searchData = {searchData} resetFlag = {resetFlag} />
// //                 </div>

// //                 <div
// //                   className={`tab-pane fade ${activeTab === "P00226" ? "show active" : ""
// //                     }`}
// //                   id="bordered-justified-Gate Out"
// //                   role="tabpanel"
// //                   aria-labelledby="8"
// //                 >
// //                   <PortReturnContainerGateIn searchData = {searchData} resetFlag = {resetFlag} />
// //                 </div>




// //                 <div
// //                   className={`tab-pane fade ${activeTab === "P00227" ? "show active" : ""
// //                     }`}
// //                   id="bordered-justified-Gate Out"
// //                   role="tabpanel"
// //                   aria-labelledby="8"
// //                 >
// //                   <ExportReworkingContainer />
// //                 </div>

// //                 <div
// //                   className={`tab-pane fade ${activeTab === "P00228" ? "show active" : ""
// //                     }`}
// //                   id="bordered-justified-Gate Out"
// //                   role="tabpanel"
// //                   aria-labelledby="8"
// //                 >
// //                   <SBTransferProcess />
// //                 </div>

// //                 <div
// //                   className={`tab-pane fade ${activeTab === "P00229" ? "show active" : ""
// //                     }`}
// //                   id="bordered-justified-Gate Out"
// //                   role="tabpanel"
// //                   aria-labelledby="8"
// //                 >
// //                   <ContainerWiseStuffing />
// //                 </div>


// //                 <div
// //                   className={`tab-pane fade ${activeTab === "P00230" ? "show active" : ""
// //                     }`}
// //                   id="bordered-justified-Gate Out"
// //                   role="tabpanel"
// //                   aria-labelledby="8"
// //                 >
// //                   <ShippingBillHistory />
// //                 </div>

// //                 <div
// //                   className={`tab-pane fade ${activeTab === "P00231" ? "show active" : ""
// //                     }`}
// //                   id="bordered-justified-Gate Out"
// //                   role="tabpanel"
// //                   aria-labelledby="8"
// //                 >
// //                   <ShippingBillWiseGateOutPass searchData = {searchData} resetFlag = {resetFlag} />
// //                 </div>

// //                 <div
// //                   className={`tab-pane fade ${activeTab === "P00233" ? "show active" : ""
// //                     }`}
// //                   id="bordered-justified-Gate Out"
// //                   role="tabpanel"
// //                   aria-labelledby="8"
// //                 >
// //                   <ExportSSRActivity />
// //                 </div>

// //                 <div
// //                   className={`tab-pane fade ${activeTab === "P00234" ? "show active" : ""
// //                     }`}
// //                   id="bordered-justified-Gate Out"
// //                   role="tabpanel"
// //                   aria-labelledby="8"
// //                 >
// //                   <BufferFDSOnWheel />
// //                 </div>

// //                 <div
// //                   className={`tab-pane fade ${activeTab === "P00235" ? "show active" : ""
// //                     }`}
// //                   id="bordered-justified-Gate Out"
// //                   role="tabpanel"
// //                   aria-labelledby="8"
// //                 >
// //                   <ExportEmptyContainerGateIn />
// //                 </div>

// //                 <div
// //                   className={`tab-pane fade ${activeTab === "P00236" ? "show active" : ""
// //                     }`}
// //                   id="bordered-justified-Gate Out"
// //                   role="tabpanel"
// //                   aria-labelledby="8"
// //                 >
// //                   <BufferFDSOnWheelContainerCLP />
// //                 </div>

// //                 <div
// //                   className={`tab-pane fade ${activeTab === "P00238" ? "show active" : ""
// //                     }`}
// //                   id="bordered-justified-Gate Out"
// //                   role="tabpanel"
// //                   aria-labelledby="8"
// //                 >
// //                   <ExportMovement />
// //                 </div>

// //                 <div
// //                   className={`tab-pane fade ${activeTab === "P00242" ? "show active" : ""
// //                     }`}
// //                   id="bordered-justified-Gate Out"
// //                   role="tabpanel"
// //                   aria-labelledby="8"
// //                 >
// //                   <BufferWorkOrder />
// //                 </div>


// //                 <div
// //                   className={`tab-pane fade ${activeTab === "P00244" ? "show active" : ""
// //                     }`}
// //                   id="bordered-justified-Gate Out"
// //                   role="tabpanel"
// //                   aria-labelledby="8"
// //                 >
// //                   <NewExportAudit />
// //                 </div>

// //               </div>
// //             </Row>
// //           </CardBody>
// //         </Card>
// //       </div>
// //     </>
// //   );
// // }


// import AuthContext from "../Components/AuthProvider";
// import { useLocation, useNavigate } from "react-router-dom";
// import React, { useEffect, useState, useContext } from "react";
// import "../Components/Style.css";
// import ShipingBillNew from "./ShipingBillNew";
// import {
//   Card,
//   CardBody,
//   Row,
//   Col,
//   FormGroup,
// } from "reactstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowAltCircleLeft, faSearch, faRefresh, faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
// import "../assets/css/style.css";
// import "../Components/Style.css";
// import { Button } from "react-bootstrap";
// import ExportCargoGateIn from "./ExportCargoGateIn";
// import ExportCarting from "./ExportCarting";
// import SBEndoresment from "./SBEndoresment";
// import SBWiseStuffingRequest from "./SBWiseStuffingRequest";
// import StuffingTallyCLP from "./StuffingTallyCLP";
// import SBWiseTallyCLP from "./SBWiseTallyCLP";
// import ExportGateOut from "./ExportGateOut";
// import CargoBackToTown from "./CargoBackToTown";
// import PortReturnContainerGateIn from "./PortReturnContainerGateIn";
// import ExportReworkingContainer from "./ExportReworkingContainer";
// import SBTransferProcess from "./SBTransferProcess";
// import ContainerWiseStuffing from "./ContainerWiseStuffing";
// import ShippingBillHistory from "./ShippingBillHistory";
// import ShippingBillWiseGateOutPass from "./ShippingBillWiseGateOutPass";
// import ExportSSRActivity from "./ExportSSRActivity";
// import BufferFDSOnWheel from "./BufferFDSOnWheel";
// import ExportEmptyContainerGateIn from "./ExportEmptyContainerGateIn";
// import BufferFDSOnWheelContainerCLP from "./BufferFDSOnWheelContainerCLP";
// import ExportMovement from "./ExportMovement";
// import BufferWorkOrder from "./BufferWorkOrder";
// import NewExportAudit from "./NewExportAudit";
// import useAxios from '../Components/useAxios';
// import { CSSTransition } from 'react-transition-group';
// import cfsService from '../service/CFSService';
// import { toast } from 'react-toastify';

// export default function Export() {
//   const navigate = useNavigate();
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
//     tabMenus,
//     userRights,
//   } = useContext(AuthContext);

//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const processId = searchParams.get("process_id");

//   const [activeTab, setActiveTab] = useState("home-1");
//   const [renderedTabs, setRenderedTabs] = useState([]);

//   const [loading, setLoading] = useState(false);

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
//     label: {
//       backgroundColor: '#e3eefa',
//       padding: '5px',
//       borderRadius: '4px',
//     }
//   };

//   const [isRowVisible, setIsRowVisible] = useState(true);
//   const toggleRowVisibility = () => {
//     setIsRowVisible(!isRowVisible);
//   };


//   const axiosInstance = useAxios();
//   const CFSService = new cfsService(axiosInstance);


//   const initialSearchValue = {
//     companyId: companyid,
//     branchId: branchId,
//     sbNo: '',
//     vehicleNo: '',
//     containerNo: '',
//     bookingNo: '',
//     pod: ''
//   }

//   const initialsearchData = {
//     companyId: companyid,
//     branchId: branchId,
//     sbNo: '',
//     sbTransId: '',
//     sbLineNo: '',
//     hsbSbTransId:'',
//     gateInId: '',
//     profitCenterId: '',
//     activeTab:'',
//     cartingTransId: '',
//     cartingLineId: '',
//     stuffingReqId: '',
//     containerNo: '',
//     containerGateInId: '',
//     stuffTallyId: '',
//     movementReqId: '',
//     gatePassNo: '',
//     gateOutId: '',
//     bufferStuffTallyId: '',  
//     containerType: '',
//     sbChangeTransId: '',
//     sbChangeSrNo:'',
//     reworkingId:'',
//     portReturnId:''
//   }
// const [resetFlag, setResetFlag] = useState(false);
//   const [searchData, setSearchData] = useState(initialsearchData);

//   useEffect(() => {
//     setSearchData(prevState => ({
//       ...prevState,
//       activeTab: activeTab
//     }));
//   }, [activeTab]);


//   const [pagesList, setPagesList] = useState([]);
//   const [searchCriteria, setSearchCriteria] = useState(initialSearchValue);

//   console.log('activeTab ',activeTab, 'searchData ', searchData ,'resetFlag ',resetFlag, ' \n renderedTabs : ',renderedTabs);
  

//   const reset = async () => {
//     setSearchCriteria(initialSearchValue);
//     setPagesList([]);
//     setSearchData(initialsearchData);
//     setActiveTab('home-1');
//     setResetFlag(prevState => !prevState);
//   }

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setSearchCriteria((prevCriteria) => ({
//       ...prevCriteria,
//       [id]: value,
//     }));
//   };




//    // Callback to update pagesList from child components
//    const updatePagesList = (tab) => {
//     searchExportMain(searchCriteria);
//     setActiveTab(tab);
//   };

//   const searchExportMain = async (searchCriteria) => {
//     setResetFlag(false);
//     if (
//       searchCriteria &&
//       !searchCriteria.sbNo &&     
//       !searchCriteria.containerNo      
//     ) {
//       toast.error('Please Enter at least one field!', {
//         position: 'top-center',
//         autoClose: 1000,
//       });
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await CFSService.searchExportMain(searchCriteria, jwtToken);


//       console.log('Export Main Search : ', response.data);
      
//       const { allowedList, data } = response.data;
//       setPagesList(allowedList);
//       setSearchData(data);
//       // setActiveTab('home-1');
//       renderTabs();
//     } catch (error) {
//       setPagesList([]);
//       setSearchData(initialsearchData);
//       // setActiveTab('home-1');
//       // Log error details (optional)
//       console.error('An error occurred while fetching the export data:', error);
//       // Show error message based on server response
//       if (error.response && error.response.data) {
//         // Show the specific error message from the server
//         toast.error(error.response.data, {
//           position: 'top-center',
//           autoClose: 1000,
//         });
//       } else {
//         toast.error('Oops something went wrong!', {
//           position: 'top-center',
//           autoClose: 1000,
//         });
//       }
//     } finally {
//       setLoading(false);
//       // setPagesList([]);
//       // setActiveTab('home-1');
//       renderTabs();
//     }
//   };


//   const renderTabs = () => {
//     const hasRights = (tab) => {
//       const userRight = userRights.find((right) => right.process_Id === tab.processId);
//       return userRight && userRight.allow_Read === "Y";
//     };

//     let filteredTabMenus; // Further filter based on user rights

//     const isAdmin = role === "ROLE_ADMIN";

//     if (isAdmin) {
//       filteredTabMenus = tabMenus.filter((tab) => tab.pprocess_Id === processId);
//     }
//     else {
//       filteredTabMenus = tabMenus
//         .filter((tab) => tab.pprocess_Id === processId) // Filter based on processId
//         .filter((tab) => hasRights(tab));
//     }

//     return (
//       <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', width: '100%', height: '54px' }}>
//         <ul className="nav nav-tabs" style={{ display: 'flex', flexWrap: 'nowrap' }}>
//           {filteredTabMenus.map((tab) => {
//             const isEnabled = pagesList.length === 0 || pagesList.includes(tab.processId);
//             const isTabDisabled = !isEnabled;

//             const tabStyle = {
//               whiteSpace: 'nowrap',
//               backgroundColor: isTabDisabled ? '#E0E0E0' : '', // Change to your desired color
//             };

//             return (
//               <li className="nav-item flex-fill" key={tab.processId} role="presentation" style={{ flex: '0 0 auto' }}>
//                 <button
//                   className={`nav-link border ${activeTab === tab.processId ? "active" : ""}`}
//                   id={tab.processId}
//                   data-bs-toggle="tab"
//                   data-bs-target={`#bordered-justified-${tab.processId}`}
//                   type="button"
//                   role="tab"
//                   aria-controls={`bordered-justified-${tab.processId}`}
//                   aria-selected={activeTab === tab.processId}
//                   onClick={() => handleTabClick(tab.processId)}
//                   disabled={isTabDisabled}
//                   style={tabStyle}
//                 >
//                   {tab.child_Menu_Name}
//                 </button>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     );
//   };

//   const handleTabClick = (tabId) => {
//     setActiveTab(tabId);

//      // Mark the tab as rendered if not already
//      if (!renderedTabs.includes(tabId)) {
//       setRenderedTabs([...renderedTabs, tabId]);
//   }
//   };
  

//   const components = {
//     P00216: ShipingBillNew,
//     P00217: ExportCargoGateIn,
//     P00218: ExportCarting,
//     P00219: ExportEmptyContainerGateIn,
//     P00220: SBWiseStuffingRequest,
//     P00221: StuffingTallyCLP,
//     P00222: SBWiseTallyCLP,
//     P00223: ExportGateOut,
//     P00225: CargoBackToTown,
//     P00226: PortReturnContainerGateIn,
//     P00227: ExportReworkingContainer,
//     P00228: SBTransferProcess,
//     P00230: ShippingBillHistory,
//     P00231: ShippingBillWiseGateOutPass,
//     P00233: ExportSSRActivity,
//     P00234: BufferFDSOnWheel,
//     P00235: ExportEmptyContainerGateIn,
//     P00236: BufferFDSOnWheelContainerCLP,
//     P00238: ExportMovement,
//     P00244: NewExportAudit,
//   };











//   return (
//     <>
//       <div className="Container">

//         {loading && (
//           <div style={styles.overlay}>
//             <div className="loader">
//               <div className="truckWrapper">
//                 <div className="truckBody">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 198 93"
//                     className="trucksvg"
//                   >
//                     <path
//                       strokeWidth="3"
//                       stroke="#282828"
//                       fill="#F83D3D"
//                       d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
//                     ></path>
//                     <path
//                       strokeWidth="3"
//                       stroke="#282828"
//                       fill="#7D7C7C"
//                       d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
//                     ></path>
//                     <path
//                       strokeWidth="2"
//                       stroke="#282828"
//                       fill="#282828"
//                       d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"
//                     ></path>
//                     <rect
//                       strokeWidth="2"
//                       stroke="#282828"
//                       fill="#FFFCAB"
//                       rx="1"
//                       height="7"
//                       width="5"
//                       y="63"
//                       x="187"
//                     ></rect>
//                     <rect
//                       strokeWidth="2"
//                       stroke="#282828"
//                       fill="#282828"
//                       rx="1"
//                       height="11"
//                       width="4"
//                       y="81"
//                       x="193"
//                     ></rect>
//                     <rect
//                       strokeWidth="3"
//                       stroke="#282828"
//                       fill="#DFDFDF"
//                       rx="2.5"
//                       height="90"
//                       width="121"
//                       y="1.5"
//                       x="6.5"
//                     ></rect>
//                     <rect
//                       strokeWidth="2"
//                       stroke="#282828"
//                       fill="#DFDFDF"
//                       rx="2"
//                       height="4"
//                       width="6"
//                       y="84"
//                       x="1"
//                     ></rect>
//                   </svg>
//                 </div>
//                 <div className="truckTires">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 30 30"
//                     className="tiresvg"
//                   >
//                     <circle
//                       strokeWidth="3"
//                       stroke="#282828"
//                       fill="#282828"
//                       r="13.5"
//                       cy="15"
//                       cx="15"
//                     ></circle>
//                     <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
//                   </svg>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 30 30"
//                     className="tiresvg"
//                   >
//                     <circle
//                       strokeWidth="3"
//                       stroke="#282828"
//                       fill="#282828"
//                       r="13.5"
//                       cy="15"
//                       cx="15"
//                     ></circle>
//                     <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
//                   </svg>
//                 </div>
//                 <div className="road"></div>
//                 <svg
//                   xmlSpace="preserve"
//                   viewBox="0 0 453.459 453.459"
//                   xmlnsXlink="http://www.w3.org/1999/xlink"
//                   xmlns="http://www.w3.org/2000/svg"
//                   id="Capa_1"
//                   version="1.1"
//                   fill="#000000"
//                   className="lampPost"
//                 >
//                   <path
//                     d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993
//             c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514
//             c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16
//             c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914
//             h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75
//             v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795
//             V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0z
//             M232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017
//             h78.747C231.693,100.736,232.77,106.162,232.77,111.694z"
//                   ></path>
//                 </svg>
//               </div>
//             </div>
//           </div>
//         )}

//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '2%', paddingRight: '2%' }}>
//           <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }}>
//             {" "}
//             <FontAwesomeIcon
//               icon={faArrowAltCircleLeft}
//               style={{
//                 marginRight: "8px",
//                 color: "black", // Set the color to golden
//               }}
//             />
//             Export
//           </h5>

//           <div onClick={toggleRowVisibility} style={{ cursor: 'pointer', textAlign: 'right' }}>
//             <FontAwesomeIcon icon={isRowVisible ? faChevronUp : faChevronDown} />
//           </div>
//         </div>

//         <Card style={{ backgroundColor: "#F8F8F8" }}>
//           <CardBody>
//             <CSSTransition
//               in={isRowVisible}
//               timeout={300}
//               classNames="row-animation"
//               unmountOnExit
//             >

//               <Row>
//                 <Col md={3}>
//                   <FormGroup>
//                     <label className="forlabel" htmlFor="sbNo">
//                       SB No
//                     </label>
//                     <input
//                       placeholder="Enter SB No"
//                       className="form-control"
//                       id="sbNo"
//                       value={searchCriteria.sbNo}
//                       onChange={handleChange}
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col md={3}>
//                   <FormGroup>
//                     <label className="inputHeader" htmlFor="containerNo">
//                       Container No
//                     </label>
//                     <input
//                       placeholder="Enter Container No"
//                       className="form-control"
//                       id="containerNo"
//                       value={searchCriteria.containerNo}
//                       onChange={handleChange}
//                     />
//                   </FormGroup>
//                 </Col>
               
//                 <Col md={3} style={{ marginTop: 24 }}>
//                   <button
//                     className="btn btn-outline-success btn-margin newButton"
//                     id="submitbtn2"
//                     style={{ fontSize: 12, marginRight: 5 }}
//                     onClick={() => {searchExportMain(searchCriteria); setActiveTab('home');}}
//                   >
//                     <FontAwesomeIcon icon={faSearch} style={{ marginRight: '1px' }} />
//                     Search
//                   </button>
//                   <button
//                     className="btn btn-outline-danger btn-margin newButton"
//                     style={{ fontSize: 12 }}
//                     id="submitbtn2"
//                     onClick={reset}
//                   >
//                     <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '1px' }} />
//                     Reset
//                   </button>
//                 </Col>
//               </Row>

//             </CSSTransition>
//             <Row>
//               <div className="tabs-container">
//                 <ul
//                   style={{ border: "1px solid black" }}
//                   className="nav nav-tabs nav-tabs-bordered d-flex"
//                   id="borderedTabJustified"
//                   role="tablist"
//                 >
//                   {renderTabs()}
//                 </ul>
//               </div>

// <div className="tab-content pt-2" id="borderedTabJustifiedContent">
//   {Object.keys(components).map((tab) => (
//     <div
//       key={tab}
//       className={`tab-pane fade ${activeTab === tab ? "show active" : ""}`}
//       id={`bordered-justified-${tab}`}
//       role="tabpanel"
//     >
//       {/* Check if the tab has been rendered before */}
//       {(renderedTabs.includes(tab) || activeTab === tab) &&
//         React.createElement(components[tab], { searchData, resetFlag,  updatePagesList })}

//       {/* Mark the tab as rendered when it's active */}
//       {activeTab === tab && !renderedTabs.includes(tab) &&
//         setRenderedTabs((prevTabs) => [...prevTabs, tab])}
//     </div>
//   ))}
// </div>






//             </Row>
//           </CardBody>
//         </Card>
//       </div>
//     </>
//   );
// }





// import AuthContext from "../Components/AuthProvider";
// import { useLocation, useNavigate } from "react-router-dom";
// import React, { useEffect, useState, useContext } from "react";
// import "../Components/Style.css";
// import ShipingBillNew from "./ShipingBillNew";
// import {
//   Card,
//   CardBody,
//   Row,
//   Col,
//   FormGroup,
// } from "reactstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowAltCircleLeft, faSearch, faRefresh, faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
// import "../assets/css/style.css";
// import "../Components/Style.css";
// import { Button } from "react-bootstrap";
// import ExportCargoGateIn from "./ExportCargoGateIn";
// import ExportCarting from "./ExportCarting";
// import SBEndoresment from "./SBEndoresment";
// import SBWiseStuffingRequest from "./SBWiseStuffingRequest";
// import StuffingTallyCLP from "./StuffingTallyCLP";
// import SBWiseTallyCLP from "./SBWiseTallyCLP";
// import ExportGateOut from "./ExportGateOut";
// import CargoBackToTown from "./CargoBackToTown";
// import PortReturnContainerGateIn from "./PortReturnContainerGateIn";
// import ExportReworkingContainer from "./ExportReworkingContainer";
// import SBTransferProcess from "./SBTransferProcess";
// import ContainerWiseStuffing from "./ContainerWiseStuffing";
// import ShippingBillHistory from "./ShippingBillHistory";
// import ShippingBillWiseGateOutPass from "./ShippingBillWiseGateOutPass";
// import ExportSSRActivity from "./ExportSSRActivity";
// import BufferFDSOnWheel from "./BufferFDSOnWheel";
// import ExportEmptyContainerGateIn from "./ExportEmptyContainerGateIn";
// import BufferFDSOnWheelContainerCLP from "./BufferFDSOnWheelContainerCLP";
// import ExportMovement from "./ExportMovement";
// import BufferWorkOrder from "./BufferWorkOrder";
// import NewExportAudit from "./NewExportAudit";
// import useAxios from '../Components/useAxios';
// import { CSSTransition } from 'react-transition-group';
// import cfsService from '../service/CFSService';
// import { toast } from 'react-toastify';

// export default function Export() {
//   const navigate = useNavigate();
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
//     tabMenus,
//     userRights,
//   } = useContext(AuthContext);

//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const processId = searchParams.get("process_id");

//   const [activeTab, setActiveTab] = useState("home-1");


//   const axios = useAxios();
//   const [loading, setLoading] = useState(false);

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
//     label: {
//       backgroundColor: '#e3eefa',
//       padding: '5px',
//       borderRadius: '4px',
//     }
//   };

//   const [isRowVisible, setIsRowVisible] = useState(true);
//   const toggleRowVisibility = () => {
//     setIsRowVisible(!isRowVisible);
//   };


//   const axiosInstance = useAxios();
//   const CFSService = new cfsService(axiosInstance);


//   const initialSearchValue = {
//     companyId: companyid,
//     branchId: branchId,
//     sbNo: '',
//     vehicleNo: '',
//     containerNo: '',
//     bookingNo: '',
//     pod: ''
//   }

//   const initialsearchData = {
//     companyId: companyid,
//     branchId: branchId,
//     sbNo: '',
//     sbTransId: '',
//     hsbSbTransId:'',
//     gateInId: '',
//     profitCenterId: '',
//     activeTab:'',
//     cartingTransId: '',
//     cartingLineId: '',
//     cartingprofitCentre: '',
//     cartingSbNo: ''
//   }
// const [resetFlag, setResetFlag] = useState(false);
//   const [searchData, setSearchData] = useState(initialsearchData);

//   useEffect(() => {
//     setSearchData(prevState => ({
//       ...prevState,
//       activeTab: activeTab
//     }));
//   }, [activeTab]);


//   const [pagesList, setPagesList] = useState([]);
//   const [searchCriteria, setSearchCriteria] = useState(initialSearchValue);

//   console.log('resetFlag ',resetFlag);
  

//   const reset = async () => {
//     setSearchCriteria(initialSearchValue);
//     setPagesList([]);
//     setSearchData(initialsearchData);
//     setActiveTab('home-1');
//     setResetFlag(prevState => !prevState);
//   }

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setSearchCriteria((prevCriteria) => ({
//       ...prevCriteria,
//       [id]: value,
//     }));
//   };



//   const searchExportMain = async (searchCriteria) => {
//     setResetFlag(false);
//     if (
//       searchCriteria &&
//       !searchCriteria.sbNo &&
//       !searchCriteria.vehicleNo &&
//       !searchCriteria.containerNo &&
//       !searchCriteria.bookingNo &&
//       !searchCriteria.pod
//     ) {
//       toast.error('Please Enter at least one field!', {
//         position: 'top-center',
//         autoClose: 1000,
//       });
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await CFSService.searchExportMain(searchCriteria, jwtToken);

//       const { allowedList, data } = response.data;
//       setPagesList(allowedList);
//       setSearchData(data);
//       setActiveTab('home-1');
//       renderTabs();
//     } catch (error) {
//       setPagesList([]);
//       setSearchData(initialsearchData);
//       setActiveTab('home-1');
//       // Log error details (optional)
//       console.error('An error occurred while fetching the export data:', error);
//       // Show error message based on server response
//       if (error.response && error.response.data) {
//         // Show the specific error message from the server
//         toast.error(error.response.data, {
//           position: 'top-center',
//           autoClose: 1000,
//         });
//       } else {
//         toast.error('Oops something went wrong!', {
//           position: 'top-center',
//           autoClose: 1000,
//         });
//       }
//     } finally {
//       setLoading(false);
//       // setPagesList([]);
//       setActiveTab('home-1');
//       renderTabs();
//     }
//   };


//   const renderTabs = () => {
//     const hasRights = (tab) => {
//       const userRight = userRights.find((right) => right.process_Id === tab.processId);
//       return userRight && userRight.allow_Read === "Y";
//     };

//     let filteredTabMenus; // Further filter based on user rights

//     const isAdmin = role === "ROLE_ADMIN";

//     if (isAdmin) {
//       filteredTabMenus = tabMenus.filter((tab) => tab.pprocess_Id === processId);
//     }
//     else {
//       filteredTabMenus = tabMenus
//         .filter((tab) => tab.pprocess_Id === processId) // Filter based on processId
//         .filter((tab) => hasRights(tab));
//     }

//     return (
//       <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', width: '100%', height: '54px' }}>
//         <ul className="nav nav-tabs" style={{ display: 'flex', flexWrap: 'nowrap' }}>
//           {filteredTabMenus.map((tab) => {
//             const isEnabled = pagesList.length === 0 || pagesList.includes(tab.processId);
//             const isTabDisabled = !isEnabled;

//             const tabStyle = {
//               whiteSpace: 'nowrap',
//               backgroundColor: isTabDisabled ? '#E0E0E0' : '', // Change to your desired color
//             };

//             return (
//               <li className="nav-item flex-fill" key={tab.processId} role="presentation" style={{ flex: '0 0 auto' }}>
//                 <button
//                   className={`nav-link border ${activeTab === tab.processId ? "active" : ""}`}
//                   id={tab.processId}
//                   data-bs-toggle="tab"
//                   data-bs-target={`#bordered-justified-${tab.processId}`}
//                   type="button"
//                   role="tab"
//                   aria-controls={`bordered-justified-${tab.processId}`}
//                   aria-selected={activeTab === tab.processId}
//                   onClick={() => handleTabClick(tab.processId)}
//                   disabled={isTabDisabled}
//                   style={tabStyle}
//                 >
//                   {tab.child_Menu_Name}
//                 </button>
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     );
//   };

//   const handleTabClick = (tabId) => {
//     setActiveTab(tabId);
//   };
//   const [sealCuttingData, setSealCuttingData] = useState([
//     { label: "ItemWise SealCutting", value: "itemwise" },
//     { label: "Containerwise Cutting", value: "containerwise" },
//   ]);
//   const [selectSealCuttingType, setSelectSealCuttingType] = useState("");

//   const handleSealCuttingChange = async (selectedOption, { action }) => {
//     if (action === "clear") {
//       setSelectSealCuttingType("");
//     } else {
//       setSelectSealCuttingType(selectedOption ? selectedOption.value : "");
//     }
//   };

//   // CARGO EXAMINATION
//   const [errors, setErrors] = useState({});
//   const [examTallyIds, setExamTallyIds] = useState([]);
//   const [examTallyId, setExamTallyId] = useState(null);

//   const handleKeyDown = (event, name) => {
//     if (event.key === "Enter") {
//       alert("Hii : " + name + " " + new Date());
//     }
//   };

//   const [selectedGatePassType, setSelectedGatePassType] = useState("");

//   const handleSelectChange = (event) => {
//     setSelectedGatePassType(event.target.value);
//   };

//   const [uploadData, setUploadData] = useState([
//     { label: "IGM File Upload", value: "IGM File Upload" },
//     { label: "IGM Excel Upload", value: "IGM Excel Upload" },
//     { label: "Scanning List Upload", value: "Scanning List Upload" },
//   ]);

//   const [selectUploadType, setSelectUploadType] = useState("");

//   const handleUploadTypeChange = async (selectedOption, { action }) => {
//     if (action === "clear") {
//       setSelectUploadType("");
//     } else {
//       setSelectUploadType(selectedOption ? selectedOption.value : "");
//     }
//   };

//   //-----------------------------IGM Entry Start

//   const [igmData, setIgmData] = useState({
//     companyId: "",
//     branchId: "",
//     finYear: "",
//     igmTransId: "",
//     profitcentreId: "",
//     igmNo: "",
//     docDate: null,
//     igmDate: null,
//     viaNo: "",
//     vesselId: "",
//     voyageNo: "",
//     port: "",
//     vesselEta: null,
//     vesselArvDate: null,
//     vesselArvTime: "",
//     shippingLine: "",
//     shippingAgent: "",
//     comments: "",
//     portJo: "",
//     portJoDate: null,
//     partyId: "",
//     dataInputStatus: "N",
//     exportJoFileName: "",
//     entryStatus: "",
//     status: "",
//     createdBy: "",
//     createdDate: null,
//     editedBy: "",
//     editedDate: null,
//     approvedBy: "",
//     approvedDate: null,
//     scanningDate: null,
//     manualLinkFlag: "N",
//   });

//   const handleIgmDataChange = (e) => {
//     const { name, value } = e.target;
//     setIgmData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleDocDate = (date) => {
//     setIgmData({
//       ...igmData,
//       docDate: date,
//     });
//   };

//   const handleIgmDate = (date) => {
//     setIgmData({
//       ...igmData,
//       igmDate: date,
//     });
//   };

//   const handleScanningDate = (date) => {
//     setIgmData({
//       ...igmData,
//       scanningDate: date,
//     });
//   };

//   const handleVesselArvDate = (date) => {
//     setIgmData({
//       ...igmData,
//       vesselArvDate: date,
//     });
//   };

//   const handleVesselBerthDate = (date) => {
//     setIgmData({
//       ...igmData,
//       vesselEta: date,
//     });
//   };

//   const [igmErrors, setIgmErrors] = useState({
//     viaNo: "",
//     igmNo: "",
//     igmDate: "",
//     port: "",
//     vessel: "",
//     shippingLine: "",
//     vesselBerthDate: "",
//     shippingAgent: "",
//   });

//   const handleOpenIgmAddDetails = () => {
//     handleTabClick("P00211");
//   };

//   const getPortData = () => { };

//   const [igmCrgData, setIgmCrgData] = useState([
//     {
//       companyId: "",
//       branchId: "",
//       finYear: "",
//       igmTransId: "",
//       profitcentreId: "",
//       igmLineNo: "",
//       igmNo: "",
//       cycle: "IMP",
//       viaNo: "",
//       blNo: "",
//       blDate: null,
//       cargoMovement: "",
//       sampleQty: 0,
//       importerId: "",
//       importerName: "",
//       importerAddress1: "",
//       importerAddress2: "",
//       importerAddress3: "",
//       notifyPartyName: "",
//       notifiedAddress1: "",
//       notifiedAddress2: "",
//       notifiedAddress3: "",
//       oldImporterName: "",
//       oldImporterAddress1: "",
//       oldImporterAddress2: "",
//       oldImporterAddress3: "",
//       origin: "",
//       destination: "",
//       commodityDescription: "",
//       commodityCode: "",
//       areaUsed: 0,
//       noOfPackages: 0,
//       qtyTakenOut: 0,
//       qtyTakenOutWeight: 0,
//       grossWeight: 0,
//       weighmentWeight: 0,
//       unitOfWeight: "",
//       typeOfPackage: "",
//       cargoType: "",
//       imoCode: "",
//       unNo: "",
//       dataInputStatus: "",
//       entryStatus: "",
//       actualNoOfPackages: 0,
//       damagedNoOfPackages: 0,
//       gainLossPackage: "0",
//       yardLocation: "",
//       yardBlock: "",
//       blockCellNo: "",
//       noOfDestuffContainers: 0,
//       noOfContainers: 0,
//       examTallyId: "",
//       examTallyDate: null,
//       blTariffNo: "",
//       destuffId: "",
//       destuffCharges: 0,
//       destuffDate: null,
//       cargoValue: 0,
//       cargoDuty: 0,
//       gateOutNo: "",
//       gateOutDate: null,
//       marksOfNumbers: "",
//       holdingAgent: "",
//       holdingAgentName: "",
//       holdDate: null,
//       releaseDate: null,
//       holdRemarks: "",
//       holdStatus: "",
//       releaseAgent: "",
//       releaseRemarks: "",
//       noticeId: "",
//       noticeType: "",
//       noticeDate: null,
//       auctionStatus: "N",
//       status: "",
//       customerId: "",
//       blUpdaterUser: "",
//       blUpdaterFlag: "N",
//       blUpdaterDate: null,
//       blReportUser: "",
//       blReportFlag: "N",
//       blReportDate: null,
//       createdBy: "",
//       createdDate: null,
//       editedBy: "",
//       editedDate: null,
//       approvedBy: "",
//       approvedDate: null,
//       hazReeferRemarks: "",
//       crgAllowFlag: "N",
//       othPartyId: "",
//       mergeStatus: "",
//       mergeCreatedDate: null,
//       mergeCreatedBy: "",
//       mergeApprovedBy: "",
//       mergeApprovedDate: null,
//       oldLineNo: "",
//       riskStatus: "N",
//       riskStatusBy: "",
//       riskStatusDate: null,
//       smtpFlag: "N",
//       smtpStatusBy: "",
//       smtpStatusDate: null,
//       newFwdId: "",
//       primaryItem: "Y",
//       igmSendStatus: "N",
//       igmSendDate: null,
//       partDeStuffId: "",
//       partDeStuffDate: null,
//       igmImporterName: "",
//       igmImporterAddress1: "",
//       igmImporterAddress2: "",
//       igmImporterAddress3: "",
//     },
//   ]);

//   const [igmCnData, setIgmCnData] = useState([
//     {
//       companyId: "",
//       branchId: "",
//       finYear: "",
//       igmTransId: "",
//       profitcentreId: "",
//       igmNo: "",
//       igmLineNo: "",
//       containerNo: "",
//       viaNo: "",
//       cycle: "IMP",
//       cycleUpdatedBy: "",
//       cycleUpdatedDate: "",
//       containerSize: "",
//       containerType: "",
//       haz: "N",
//       hazClass: "",
//       typeOfContainer: "",
//       oldTypeOfContainer: "",
//       overDimension: "N",
//       shift: "",
//       iso: "",
//       internalShifting: "N",
//       beNo: "",
//       beDate: "",
//       containerWeight: 0.0,
//       containerStatus: "",
//       containerSealNo: "",
//       customsSealNo: "",
//       dataInputStatus: " ",
//       entryStatus: "",
//       customsSample: "",
//       customsSampleDate: "",
//       scannerType: "",
//       reExport: "N",
//       extraTransport: "N",
//       extraTransportDate: "",
//       fumigation: "N",
//       fumigationDate: "",
//       movementReqId: "",
//       sealCuttingType: "",
//       cargoValue: 0.0,
//       cargoDuty: 0.0,
//       blStatus: "",
//       marketingPerson: "",
//       movementType: "",
//       sealCutTransId: "",
//       containerExamStatus: "",
//       sealCutReqDate: "",
//       containerExamDate: "",
//       mobileNo: "",
//       sealCutRemarks: "",
//       containerExamRemarks: "",
//       actualNoOfPackages: 0,
//       damagedNoOfPackages: 0,
//       yardLocation: "",
//       yardBlock: "",
//       blockCellNo: "",
//       yardLocation1: "",
//       yardBlock1: "",
//       blockCellNo1: "",
//       blTariffNo: "",
//       deStuffId: "",
//       typeOfCargo: "",
//       destuffStatus: "N",
//       deStuffDate: "",
//       doEntryFlag: "N",
//       doEntryDate: "",
//       forceEntryFlag: "N",
//       forceEntryDate: "",
//       nocIssuedBy: "",
//       nocIssuedDate: "",
//       icdFlag: "N",
//       icdPlace: "",
//       icdDate: "",
//       deliveryDate: "",
//       accountingDate: "",
//       railReservationDate: "",
//       transporterId: "",
//       handOverTo: "",
//       handOverDate: "",
//       raContractNo: "",
//       raContractDate: "",
//       noOfCoils: 0,
//       noOfCoilBundles: 0,
//       noOfLooseCoils: 0,
//       unstuffingDoneFlag: "N",
//       unstuffingType: "N",
//       lastChangedOn: "",
//       lastChangedBy: "",
//     },
//   ]);

//   return (
//     <>
//       <div className="Container">

//         {loading && (
//           <div style={styles.overlay}>
//             <div className="loader">
//               <div className="truckWrapper">
//                 <div className="truckBody">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 198 93"
//                     className="trucksvg"
//                   >
//                     <path
//                       strokeWidth="3"
//                       stroke="#282828"
//                       fill="#F83D3D"
//                       d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
//                     ></path>
//                     <path
//                       strokeWidth="3"
//                       stroke="#282828"
//                       fill="#7D7C7C"
//                       d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
//                     ></path>
//                     <path
//                       strokeWidth="2"
//                       stroke="#282828"
//                       fill="#282828"
//                       d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"
//                     ></path>
//                     <rect
//                       strokeWidth="2"
//                       stroke="#282828"
//                       fill="#FFFCAB"
//                       rx="1"
//                       height="7"
//                       width="5"
//                       y="63"
//                       x="187"
//                     ></rect>
//                     <rect
//                       strokeWidth="2"
//                       stroke="#282828"
//                       fill="#282828"
//                       rx="1"
//                       height="11"
//                       width="4"
//                       y="81"
//                       x="193"
//                     ></rect>
//                     <rect
//                       strokeWidth="3"
//                       stroke="#282828"
//                       fill="#DFDFDF"
//                       rx="2.5"
//                       height="90"
//                       width="121"
//                       y="1.5"
//                       x="6.5"
//                     ></rect>
//                     <rect
//                       strokeWidth="2"
//                       stroke="#282828"
//                       fill="#DFDFDF"
//                       rx="2"
//                       height="4"
//                       width="6"
//                       y="84"
//                       x="1"
//                     ></rect>
//                   </svg>
//                 </div>
//                 <div className="truckTires">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 30 30"
//                     className="tiresvg"
//                   >
//                     <circle
//                       strokeWidth="3"
//                       stroke="#282828"
//                       fill="#282828"
//                       r="13.5"
//                       cy="15"
//                       cx="15"
//                     ></circle>
//                     <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
//                   </svg>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 30 30"
//                     className="tiresvg"
//                   >
//                     <circle
//                       strokeWidth="3"
//                       stroke="#282828"
//                       fill="#282828"
//                       r="13.5"
//                       cy="15"
//                       cx="15"
//                     ></circle>
//                     <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
//                   </svg>
//                 </div>
//                 <div className="road"></div>
//                 <svg
//                   xmlSpace="preserve"
//                   viewBox="0 0 453.459 453.459"
//                   xmlnsXlink="http://www.w3.org/1999/xlink"
//                   xmlns="http://www.w3.org/2000/svg"
//                   id="Capa_1"
//                   version="1.1"
//                   fill="#000000"
//                   className="lampPost"
//                 >
//                   <path
//                     d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993
//             c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514
//             c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16
//             c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914
//             h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75
//             v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795
//             V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0z
//             M232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017
//             h78.747C231.693,100.736,232.77,106.162,232.77,111.694z"
//                   ></path>
//                 </svg>
//               </div>
//             </div>
//           </div>
//         )}

//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '2%', paddingRight: '2%' }}>
//           <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }}>
//             {" "}
//             <FontAwesomeIcon
//               icon={faArrowAltCircleLeft}
//               style={{
//                 marginRight: "8px",
//                 color: "black", // Set the color to golden
//               }}
//             />
//             Export
//           </h5>

//           <div onClick={toggleRowVisibility} style={{ cursor: 'pointer', textAlign: 'right' }}>
//             <FontAwesomeIcon icon={isRowVisible ? faChevronUp : faChevronDown} />
//           </div>
//         </div>

//         <Card style={{ backgroundColor: "#F8F8F8" }}>
//           <CardBody>
//             <CSSTransition
//               in={isRowVisible}
//               timeout={300}
//               classNames="row-animation"
//               unmountOnExit
//             >

//               <Row>
//                 <Col md={2}>
//                   <FormGroup>
//                     <label className="forlabel" htmlFor="sbNo">
//                       SB No
//                     </label>
//                     <input
//                       placeholder="Enter SB No"
//                       className="form-control"
//                       id="sbNo"
//                       value={searchCriteria.sbNo}
//                       onChange={handleChange}
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col md={2}>
//                   <FormGroup>
//                     <label className="inputHeader" htmlFor="containerNo">
//                       Container No
//                     </label>
//                     <input
//                       placeholder="Enter Container No"
//                       className="form-control"
//                       id="containerNo"
//                       value={searchCriteria.containerNo}
//                       onChange={handleChange}
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col md={2}>
//                   <FormGroup>
//                     <label className="forlabel" htmlFor="vehicleNo">
//                       Vehicle No
//                     </label>
//                     <input
//                       placeholder="Enter Vehicle No"
//                       className="form-control"
//                       id="vehicleNo"
//                       value={searchCriteria.vehicleNo}
//                       onChange={handleChange}
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col md={2}>
//                   <FormGroup>
//                     <label className="inputHeader" htmlFor="bookingNo">
//                       Booking No
//                     </label>
//                     <input
//                       placeholder="Enter Booking No"
//                       className="form-control"
//                       id="bookingNo"
//                       value={searchCriteria.bookingNo}
//                       onChange={handleChange}
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col md={2}>
//                   <FormGroup>
//                     <label className="inputHeader" htmlFor="pod">
//                       POD
//                     </label>
//                     <input
//                       placeholder="Enter Pod"
//                       className="form-control"
//                       id="pod"
//                       value={searchCriteria.pod}
//                       onChange={handleChange}
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col md={2} style={{ marginTop: 24 }}>
//                   <button
//                     className="btn btn-outline-success btn-margin newButton"
//                     id="submitbtn2"
//                     style={{ fontSize: 11, marginRight: 5 }}
//                     onClick={() => searchExportMain(searchCriteria)}
//                   >
//                     <FontAwesomeIcon icon={faSearch} style={{ marginRight: '1px' }} />
//                     Search
//                   </button>
//                   <button
//                     className="btn btn-outline-danger btn-margin newButton"
//                     style={{ fontSize: 11 }}
//                     id="submitbtn2"
//                     onClick={reset}
//                   >
//                     <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '1px' }} />
//                     Reset
//                   </button>
//                 </Col>
//               </Row>

//             </CSSTransition>
//             <Row>
//               <div className="tabs-container">
//                 <ul
//                   style={{ border: "1px solid black" }}
//                   className="nav nav-tabs nav-tabs-bordered d-flex"
//                   id="borderedTabJustified"
//                   role="tablist"
//                 >
//                   {renderTabs()}
//                 </ul>
//               </div>
//               <div
//                 className="tab-content pt-2"
//                 id="borderedTabJustifiedContent"
//               >
//                 <div
//                   className={`tab-pane fade ${activeTab === "P00216" ? "show active" : ""
//                     }`}
//                   id="bordered-justified-profile-2"
//                   role="tabpanel"
//                   aria-labelledby="2"
//                 >
//                   <ShipingBillNew searchData = {searchData} resetFlag = {resetFlag} />
//                 </div>

//                 <div
//                   className={`tab-pane fade ${activeTab === "P00217" ? "show active" : ""
//                     }`}
//                   id="bordered-justified-contact-3"
//                   role="tabpanel"
//                   aria-labelledby="3"
//                 >
//                   <ExportCargoGateIn searchData = {searchData} resetFlag = {resetFlag} />
//                 </div>

//                 <div
//                   className={`tab-pane fade ${activeTab === "P00218" ? "show active" : ""
//                     }`}
//                   id="bordered-justified-home-4"
//                   role="tabpanel"
//                   aria-labelledby="4"
//                 >
//                   <ExportCarting searchData = {searchData} resetFlag = {resetFlag} />
//                 </div>

//                 <div
//                   className={`tab-pane fade ${activeTab === "P00219" ? "show active" : ""
//                     }`}
//                   id="bordered-justified-cargo-exmination"
//                   role="tabpanel"
//                   aria-labelledby="5"
//                 >
//                   <ExportEmptyContainerGateIn searchData = {searchData} resetFlag = {resetFlag} />
//                 </div>

//                 <div
//                   className={`tab-pane fade ${activeTab === "P00220" ? "show active" : ""
//                     }`}
//                   id="bordered-justified-Destuff"
//                   role="tabpanel"
//                   aria-labelledby="6"
//                 >
//                   <SBWiseStuffingRequest />
//                 </div>

//                 <div
//                   className={`tab-pane fade ${activeTab === "P00221" ? "show active" : ""
//                     }`}
//                   id="bordered-justified-Gate Pass"
//                   role="tabpanel"
//                   aria-labelledby="7"
//                 >
//                   <StuffingTallyCLP searchData = {searchData} resetFlag = {resetFlag} />
//                 </div>
//                 <div
//                   className={`tab-pane fade ${activeTab === "P00222" ? "show active" : ""
//                     }`}
//                   id="bordered-justified-Gate Out"
//                   role="tabpanel"
//                   aria-labelledby="8"
//                 >
//                   <SBWiseTallyCLP />
//                 </div>

//                 <div
//                   className={`tab-pane fade ${activeTab === "P00223" ? "show active" : ""
//                     }`}
//                   id="bordered-justified-Gate Out"
//                   role="tabpanel"
//                   aria-labelledby="8"
//                 >
//                   <ExportGateOut searchData = {searchData} resetFlag = {resetFlag} />
//                 </div>
//                 <div
//                   className={`tab-pane fade ${activeTab === "P00225" ? "show active" : ""
//                     }`}
//                   id="bordered-justified-Gate Out"
//                   role="tabpanel"
//                   aria-labelledby="8"
//                 >
//                   <CargoBackToTown searchData = {searchData} resetFlag = {resetFlag} />
//                 </div>

//                 <div
//                   className={`tab-pane fade ${activeTab === "P00226" ? "show active" : ""
//                     }`}
//                   id="bordered-justified-Gate Out"
//                   role="tabpanel"
//                   aria-labelledby="8"
//                 >
//                   <PortReturnContainerGateIn searchData = {searchData} resetFlag = {resetFlag} />
//                 </div>




//                 <div
//                   className={`tab-pane fade ${activeTab === "P00227" ? "show active" : ""
//                     }`}
//                   id="bordered-justified-Gate Out"
//                   role="tabpanel"
//                   aria-labelledby="8"
//                 >
//                   <ExportReworkingContainer />
//                 </div>

//                 <div
//                   className={`tab-pane fade ${activeTab === "P00228" ? "show active" : ""
//                     }`}
//                   id="bordered-justified-Gate Out"
//                   role="tabpanel"
//                   aria-labelledby="8"
//                 >
//                   <SBTransferProcess />
//                 </div>

//                 <div
//                   className={`tab-pane fade ${activeTab === "P00229" ? "show active" : ""
//                     }`}
//                   id="bordered-justified-Gate Out"
//                   role="tabpanel"
//                   aria-labelledby="8"
//                 >
//                   <ContainerWiseStuffing />
//                 </div>


//                 <div
//                   className={`tab-pane fade ${activeTab === "P00230" ? "show active" : ""
//                     }`}
//                   id="bordered-justified-Gate Out"
//                   role="tabpanel"
//                   aria-labelledby="8"
//                 >
//                   <ShippingBillHistory />
//                 </div>

//                 <div
//                   className={`tab-pane fade ${activeTab === "P00231" ? "show active" : ""
//                     }`}
//                   id="bordered-justified-Gate Out"
//                   role="tabpanel"
//                   aria-labelledby="8"
//                 >
//                   <ShippingBillWiseGateOutPass searchData = {searchData} resetFlag = {resetFlag} />
//                 </div>

//                 <div
//                   className={`tab-pane fade ${activeTab === "P00233" ? "show active" : ""
//                     }`}
//                   id="bordered-justified-Gate Out"
//                   role="tabpanel"
//                   aria-labelledby="8"
//                 >
//                   <ExportSSRActivity />
//                 </div>

//                 <div
//                   className={`tab-pane fade ${activeTab === "P00234" ? "show active" : ""
//                     }`}
//                   id="bordered-justified-Gate Out"
//                   role="tabpanel"
//                   aria-labelledby="8"
//                 >
//                   <BufferFDSOnWheel />
//                 </div>

//                 <div
//                   className={`tab-pane fade ${activeTab === "P00235" ? "show active" : ""
//                     }`}
//                   id="bordered-justified-Gate Out"
//                   role="tabpanel"
//                   aria-labelledby="8"
//                 >
//                   <ExportEmptyContainerGateIn />
//                 </div>

//                 <div
//                   className={`tab-pane fade ${activeTab === "P00236" ? "show active" : ""
//                     }`}
//                   id="bordered-justified-Gate Out"
//                   role="tabpanel"
//                   aria-labelledby="8"
//                 >
//                   <BufferFDSOnWheelContainerCLP />
//                 </div>

//                 <div
//                   className={`tab-pane fade ${activeTab === "P00238" ? "show active" : ""
//                     }`}
//                   id="bordered-justified-Gate Out"
//                   role="tabpanel"
//                   aria-labelledby="8"
//                 >
//                   <ExportMovement />
//                 </div>

//                 <div
//                   className={`tab-pane fade ${activeTab === "P00242" ? "show active" : ""
//                     }`}
//                   id="bordered-justified-Gate Out"
//                   role="tabpanel"
//                   aria-labelledby="8"
//                 >
//                   <BufferWorkOrder />
//                 </div>


//                 <div
//                   className={`tab-pane fade ${activeTab === "P00244" ? "show active" : ""
//                     }`}
//                   id="bordered-justified-Gate Out"
//                   role="tabpanel"
//                   aria-labelledby="8"
//                 >
//                   <NewExportAudit />
//                 </div>

//               </div>
//             </Row>
//           </CardBody>
//         </Card>
//       </div>
//     </>
//   );
// }


import AuthContext from "../Components/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import ShipingBillNew from "./ShipingBillNew";
import {
  Card,
  CardBody,
  Row,
  Col,
  FormGroup,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faSearch, faRefresh, faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "../assets/css/style.css";
import "../Components/Style.css";
import { Button } from "react-bootstrap";
import ExportCargoGateIn from "./ExportCargoGateIn";
import ExportCarting from "./ExportCarting";
import SBEndoresment from "./SBEndoresment";
import SBWiseStuffingRequest from "./SBWiseStuffingRequest";
import StuffingTallyCLP from "./StuffingTallyCLP";
import SBWiseTallyCLP from "./SBWiseTallyCLP";
import ExportGateOut from "./ExportGateOut";
import CargoBackToTown from "./CargoBackToTown";
import PortReturnContainerGateIn from "./PortReturnContainerGateIn";
import ExportReworkingContainer from "./ExportReworkingContainer";
import SBTransferProcess from "./SBTransferProcess";
import ContainerWiseStuffing from "./ContainerWiseStuffing";
import ShippingBillHistory from "./ShippingBillHistory";
import ShippingBillWiseGateOutPass from "./ShippingBillWiseGateOutPass";
import ExportSSRActivity from "./ExportSSRActivity";
import BufferFDSOnWheel from "./BufferFDSOnWheel";
import ExportEmptyContainerGateIn from "./ExportEmptyContainerGateIn";
import BufferFDSOnWheelContainerCLP from "./BufferFDSOnWheelContainerCLP";
import ExportMovement from "./ExportMovement";
import BufferWorkOrder from "./BufferWorkOrder";
import NewExportAudit from "./NewExportAudit";
import useAxios from '../Components/useAxios';
import { CSSTransition } from 'react-transition-group';
import cfsService from '../service/CFSService';
import { toast } from 'react-toastify';
import ExportWaiver from "./ExportWaiver";
import PortEIREntry from "./PortEIREntry";

export default function Export() {
  const navigate = useNavigate();
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
    tabMenus,
    userRights,
  } = useContext(AuthContext);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const processId = searchParams.get("process_id");

  const [activeTab, setActiveTab] = useState("P00216");
  const [renderedTabs, setRenderedTabs] = useState([]);

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

  const [isRowVisible, setIsRowVisible] = useState(true);
  const toggleRowVisibility = () => {
    setIsRowVisible(!isRowVisible);
  };


  const axiosInstance = useAxios();
  const CFSService = new cfsService(axiosInstance);


  const initialSearchValue = {
    companyId: companyid,
    branchId: branchId,
    sbNo: '',
    vehicleNo: '',
    containerNo: '',
    bookingNo: '',
    pod: ''
  }

  const initialsearchData = {
    companyId: companyid,
    branchId: branchId,
    sbNo: '',
    sbTransId: '',
    sbLineNo: '',
    hsbSbTransId:'',
    gateInId: '',
    profitCenterId: '',
    activeTab:'',
    cartingTransId: '',
    cartingLineId: '',
    stuffingReqId: '',
    containerNo: '',
    containerGateInId: '',
    stuffTallyId: '',
    movementReqId: '',
    gatePassNo: '',
    gateOutId: '',
    bufferStuffTallyId: '',  
    containerType: '',
    sbChangeTransId: '',
    sbChangeSrNo:'',
    reworkingId:'',
    portReturnId:''
  }
const [resetFlag, setResetFlag] = useState(false);
  const [searchData, setSearchData] = useState(initialsearchData);

  useEffect(() => {
    setSearchData(prevState => ({
      ...prevState,
      activeTab: activeTab
    }));
  }, [activeTab]);


  const [pagesList, setPagesList] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState(initialSearchValue);

  console.log('activeTab ',activeTab, 'searchData ', searchData ,'resetFlag ',resetFlag, ' \n renderedTabs : ',renderedTabs);
  

  const reset = async () => {
    setSearchCriteria(initialSearchValue);
    setPagesList([]);
    setSearchData(initialsearchData);
    setActiveTab('home-1');
    setResetFlag(prevState => !prevState);
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSearchCriteria((prevCriteria) => ({
      ...prevCriteria,
      [id]: value,
    }));
  };




   // Callback to update pagesList from child components
   const updatePagesList = (tab) => {
    searchExportMain(searchCriteria);
    setActiveTab(tab);
  };

  const searchExportMain = async (searchCriteria) => {
    setResetFlag(false);
    if (
      searchCriteria &&
      !searchCriteria.sbNo &&     
      !searchCriteria.containerNo      
    ) {
      toast.error('Please Enter at least one field!', {
        position: 'top-center',
        autoClose: 1000,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await CFSService.searchExportMain(searchCriteria, jwtToken);


      console.log('Export Main Search : ', response.data);
      
      const { allowedList, data } = response.data;
      setPagesList(allowedList);
      setSearchData(data);
      // setActiveTab('home-1');
      renderTabs();
    } catch (error) {
      setPagesList([]);
      setSearchData(initialsearchData);
      // setActiveTab('home-1');
      // Log error details (optional)
      console.error('An error occurred while fetching the export data:', error);
      // Show error message based on server response
      if (error.response && error.response.data) {
        // Show the specific error message from the server
        toast.error(error.response.data, {
          position: 'top-center',
          autoClose: 1000,
        });
      } else {
        toast.error('Oops something went wrong!', {
          position: 'top-center',
          autoClose: 1000,
        });
      }
    } finally {
      setLoading(false);
      // setPagesList([]);
      // setActiveTab('home-1');
      renderTabs();
    }
  };


  // const renderTabs = () => {
  //   const hasRights = (tab) => {
  //     const userRight = userRights.find((right) => right.process_Id === tab.processId);
  //     return userRight && userRight.allow_Read === "Y";
  //   };

  //   let filteredTabMenus; // Further filter based on user rights

  //   const isAdmin = role === "ROLE_ADMIN";

  //   if (isAdmin) {
  //     filteredTabMenus = tabMenus.filter((tab) => tab.pprocess_Id === processId);
  //   }
  //   else {
  //     filteredTabMenus = tabMenus
  //       .filter((tab) => tab.pprocess_Id === processId) // Filter based on processId
  //       .filter((tab) => hasRights(tab));
  //   }

  //   return (
  //     <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', width: '100%', height: '54px' }}>
  //       <ul className="nav nav-tabs" style={{ display: 'flex', flexWrap: 'nowrap' }}>
  //         {filteredTabMenus.map((tab) => {
  //           const isEnabled = pagesList.length === 0 || pagesList.includes(tab.processId);
  //           const isTabDisabled = !isEnabled;

  //           const tabStyle = {
  //             whiteSpace: 'nowrap',
  //             backgroundColor: isTabDisabled ? '#E0E0E0' : '', // Change to your desired color
  //           };

  //           return (
  //             <li className="nav-item flex-fill" key={tab.processId} role="presentation" style={{ flex: '0 0 auto' }}>
  //               <button
  //                 className={`nav-link border ${activeTab === tab.processId ? "active" : ""}`}
  //                 id={tab.processId}
  //                 data-bs-toggle="tab"
  //                 data-bs-target={`#bordered-justified-${tab.processId}`}
  //                 type="button"
  //                 role="tab"
  //                 aria-controls={`bordered-justified-${tab.processId}`}
  //                 aria-selected={activeTab === tab.processId}
  //                 onClick={() => handleTabClick(tab.processId)}
  //                 disabled={isTabDisabled}
  //                 style={tabStyle}
  //               >
  //                 {tab.child_Menu_Name}
  //               </button>
  //             </li>
  //           );
  //         })}
  //       </ul>
  //     </div>
  //   );
  // };

  const renderTabs = () => {
    const hasRights = (tab) => {
        const userRight = userRights.find((right) => right.process_Id === tab.processId);
        return userRight && userRight.allow_Read === "Y";
    };

    let filteredTabMenus; // Further filter based on user rights

    const isAdmin = role === "ROLE_ADMIN";

    if (isAdmin) {
        filteredTabMenus = tabMenus.filter((tab) => tab.pprocess_Id === processId);
    }
    else {
        filteredTabMenus = tabMenus
            .filter((tab) => tab.pprocess_Id === processId) // Filter based on processId
            .filter((tab) => hasRights(tab));
    }

    return (
        // <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', width: '100%', height: '54px' }}>
        <div
    className="tab-container"
  >
            <ul className="nav nav-tabs" style={{ display: 'flex', flexWrap: 'nowrap' }}>
                {filteredTabMenus.map((tab) => {
                    const isEnabled = pagesList.length === 0 || pagesList.includes(tab.processId);
                    const isTabDisabled = !isEnabled;

                    const tabStyle = {
                        whiteSpace: 'nowrap',
                        color: activeTab === tab.processId ? "#0d6efd" : "#333",
                        backgroundColor: isTabDisabled ? '#E0E0E0' : '', // Change to your desired color
                    };

                    return (
                        <li className="nav-item flex-fill" key={tab.processId} role="presentation" style={{ flex: '0 0 auto' }}>
                            <button
                                className={`nav-link neumorphic-button ${activeTab === tab.processId ? "active" : ""}`}
                                id={tab.processId}
                                data-bs-toggle="tab"
                                data-bs-target={`#bordered-justified-${tab.processId}`}
                                type="button"
                                role="tab"
                                aria-controls={`bordered-justified-${tab.processId}`}
                                aria-selected={activeTab === tab.processId}
                                onClick={() => handleTabClick(tab.processId)}
                                disabled={isTabDisabled}
                                style={tabStyle}
                            >
                                {tab.child_Menu_Name}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);

     // Mark the tab as rendered if not already
     if (!renderedTabs.includes(tabId)) {
      setRenderedTabs([...renderedTabs, tabId]);
  }
  };
  

  const components = {
    P00216: ShipingBillNew,
    P00217: ExportCargoGateIn,
    P00218: ExportCarting,
    P00219: ExportEmptyContainerGateIn,
    P00220: SBWiseStuffingRequest,
    P00221: StuffingTallyCLP,
    P00222: SBWiseTallyCLP,
    P00223: ExportGateOut,
    P00225: CargoBackToTown,
    P00226: PortReturnContainerGateIn,
    P00227: ExportReworkingContainer,
    P00228: SBTransferProcess,
    P00230: ShippingBillHistory,
    P00231: ShippingBillWiseGateOutPass,
    P00233: ExportSSRActivity,
    P00234: BufferFDSOnWheel,
    P00235: BufferWorkOrder,
    P00236: BufferFDSOnWheelContainerCLP,
    P00238: ExportMovement,
    P00244: NewExportAudit,
    P00248: ExportWaiver,
    P00249: PortEIREntry
  };











  return (
    <>
      <div className="Container">

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

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '2%', paddingRight: '2%' }}>
          <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }}>
            {" "}
            <FontAwesomeIcon
              icon={faArrowAltCircleLeft}
              style={{
                marginRight: "8px",
                color: "black", // Set the color to golden
              }}
            />
            Export
          </h5>

          <div onClick={toggleRowVisibility} style={{ cursor: 'pointer', textAlign: 'right' }}>
            <FontAwesomeIcon icon={isRowVisible ? faChevronUp : faChevronDown} />
          </div>
        </div>

        <Card style={{ backgroundColor: "#F8F8F8" }}>
          <CardBody>
            <CSSTransition
              in={isRowVisible}
              timeout={300}
              classNames="row-animation"
              unmountOnExit
            >

              <Row>
                <Col md={3}>
                  <FormGroup>
                    <label className="forlabel" htmlFor="sbNo">
                      SB No
                    </label>
                    <input
                      placeholder="Enter SB No"
                      className="form-control"
                      id="sbNo"
                      value={searchCriteria.sbNo}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <label className="inputHeader" htmlFor="containerNo">
                      Container No
                    </label>
                    <input
                      placeholder="Enter Container No"
                      className="form-control"
                      id="containerNo"
                      value={searchCriteria.containerNo}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
               
                <Col md={3} style={{ marginTop: 24 }}>
                  <button
                    className="btn btn-outline-success btn-margin newButton"
                    id="submitbtn2"
                    style={{ fontSize: 12, marginRight: 5 }}
                    onClick={() => {searchExportMain(searchCriteria); setActiveTab('home');}}
                  >
                    <FontAwesomeIcon icon={faSearch} style={{ marginRight: '1px' }} />
                    Search
                  </button>
                  <button
                    className="btn btn-outline-danger btn-margin newButton"
                    style={{ fontSize: 12 }}
                    id="submitbtn2"
                    onClick={reset}
                  >
                    <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '1px' }} />
                    Reset
                  </button>
                </Col>
              </Row>

            </CSSTransition>
            <Row>
            <div className="tabs-container">

<ul  className="nav nav-tabs nav-tabs-bordered d-flex" id="borderedTabJustified" role="tablist">
    {renderTabs()}
</ul>

</div>


<div className="tab-content bgScreenStyle" id="borderedTabJustifiedContent">
  {Object.keys(components).map((tab) => (
    <div
      key={tab}
      className={`tab-pane fade ${activeTab === tab ? "show active" : ""}`}
      id={`bordered-justified-${tab}`}
      role="tabpanel"
    >
      {/* Check if the tab has been rendered before */}
      {(renderedTabs.includes(tab) || activeTab === tab) &&
        React.createElement(components[tab], { searchData, resetFlag,  updatePagesList })}

      {/* Mark the tab as rendered when it's active */}
      {activeTab === tab && !renderedTabs.includes(tab) &&
        setRenderedTabs((prevTabs) => [...prevTabs, tab])}
    </div>
  ))}
</div>






            </Row>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

