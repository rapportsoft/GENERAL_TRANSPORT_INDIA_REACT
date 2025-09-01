// import AuthContext from "../Components/AuthProvider";
// import { useLocation, useNavigate } from "react-router-dom";
// import React, { useEffect, useState, useContext } from "react";
// import "../Components/Style.css";
// import Select from "react-select";
// import CreatableSelect from 'react-select/creatable';
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
//   faPassport,
//   faChartLine,
//   faHandshakeAngle,
//   faHandshake,
//   faTruckRampBox,
//   faTruck,
//   faWorm,
//   faCircleInfo,
//   faRemoveFormat,
//   faShippingFast,
//   faTimesCircle,
// } from "@fortawesome/free-solid-svg-icons";
// import "../assets/css/style.css";
// import "../Components/Style.css";
// import { Button } from "react-bootstrap";
// import useAxios from "../Components/useAxios";
// import cfsService from "../service/CFSService";
// import movementService from "../service/MovementService";
// import { toast } from "react-toastify";
// import moment from "moment";

// function ExportMovement({ searchData, resetFlag, updatePagesList }) {


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




//   const axiosInstance = useAxios();
//   const CFSService = new cfsService(axiosInstance);
//   const MovementService = new movementService(axiosInstance);

//   const [profitcentre, setProfitcentre] = useState({
//     profitcentreId: '',
//     profitcentreDesc: ''
//   });

//   const getProgitCenterById = async (profitCenterId) => {
//     try {
//       const response = await CFSService.getProgitCenterById(companyid, branchId, profitCenterId, jwtToken);
//       setProfitcentre(response.data);
//       setExportMovement(prevState =>
//         prevState.map(item => ({
//           ...item,
//           profitcentreId: response.data.profitcentreId
//         }))
//       );
//     } catch (error) {
//       console.error('Error fetching port data:', error);
//     }
//   };



//   useEffect(() => {
//     const fetchData = async () => {
//       await getProgitCenterById('N00004');
//       await getContainerTypes('J00005');
//     };
//     fetchData();
//   }, []);

//   const location = useLocation();
//   const [loading, setLoading] = useState(false);

//   const processId = 'P00238';

//   const foundRights =
//     role !== "ROLE_ADMIN"
//       ? userRights.find((item) => item.process_Id === processId)
//       : null;
//   const allowCreate = foundRights?.allow_Create === "Y";
//   const allowRead = foundRights?.allow_Read === "Y";
//   const allowEdit = foundRights?.allow_Update === "Y";
//   const allowDelete = foundRights?.allow_Delete === "Y";




//   useEffect(() => {
//     if (searchData && searchData.activeTab === processId && searchData.profitCenterId && searchData.movementReqId && searchData.containerNo) {
//       selectMovementSearchRadio(searchData.profitCenterId, searchData.movementReqId, searchData.containerNo, "1");
//     }
//   }, [searchData]);
//   useEffect(() => {

//     if (resetFlag) {
//       handleReset();
//     }
//   }, [resetFlag]);



//   const initialExportMovement = {
//     companyId: companyid,
//     branchId: branchId,
//     finYear: "",
//     movementReqId: "",
//     movementReqLineId: "",
//     movementReqDate: "",
//     movementOrderDate: new Date(),
//     stuffTallyId: "",
//     movReqType: "CLP",
//     stuffTallyLineId: "",
//     profitcentreId: profitcentre.profitcentreId,
//     stuffTallyDate: "",
//     stuffId: "",
//     stuffDate: "",
//     sbNo: "",
//     sbTransId: "",
//     sbDate: "",
//     shift: "Day",
//     agentSealNo: "",
//     vesselId: "",
//     voyageNo: "",
//     rotationNo: "",
//     pol: "",
//     pod: "",
//     containerNo: "",
//     containerSize: "",
//     containerType: "",
//     containerCondition: "",
//     containerStatus: "",
//     periodFrom: "",
//     accSrNo: 1,
//     onAccountOf: "",
//     stuffRequestQty: 0,
//     stuffedQty: 0,
//     balanceQty: 0,
//     cargoWeight: 0.0,
//     totalCargoWt: 0.0,
//     grossWeight: 0.0,
//     tareWeight: 0.0,
//     genSetRequired: "",
//     haz: "",
//     imoCode: "",
//     item: "",
//     shippingAgent: "",
//     shippingLine: "",
//     commodity: "",
//     customsSealNo: "",
//     viaNo: "",
//     cartingDate: "",
//     icdHub: "",
//     exporterName: "",
//     consignee: "",
//     fob: 0.0,
//     coverDetails: "",
//     coverDate: "",
//     holdingAgent: "",
//     holdingAgentName: "",
//     holdDate: "",
//     releaseDate: "",
//     holdRemarks: "",
//     clpStatus: "",
//     clpCreatedBy: "",
//     clpCreatedDate: "",
//     clpApprovedBy: "",
//     clpApprovedDate: "",
//     gatePassNo: "",
//     addServices: "N",
//     typeOfContainer: "General",
//     gateOutId: "",
//     gateOutDate: "",
//     impSrNo: 1,
//     importerId: "",
//     billingParty: " ",
//     igst: "N",
//     cgst: "N",
//     sgst: "N",
//     status: "",
//     comments: '',
//     createdBy: "",
//     createdDate: new Date(),
//     editedBy: '',
//     editedDate: new Date(),
//     approvedBy: '',
//     approvedDate: new Date(),
//     currentLocation: '',
//     othPartyId: "",
//     invoiceAssessed: "N",
//     assessmentId: "",
//     invoiceNo: "",
//     invoiceDate: null,
//     creditType: "N",
//     invoiceCategory: " ",
//     billAmt: 0.0,
//     invoiceAmt: 0.0,
//     forceEntryFlag: "N",
//     forceEntryDate: null,
//     forceEntryApproval: '',
//     forceEntryRemarks: '',
//     sSRTransId: "",
//     forceEntryFlagInv: "N",
//     trailerType: "",
//     shippingLineName: "",
//     shippingAgentName: "",
//     vesselName: "",
//     gateInId: '',
//   };


//   const [ExportMovement, setExportMovement] = useState([initialExportMovement]);
//   const [preExportMovement, setPreExportMovement] = useState([]);
//   const [validationErrors, setValidationErrors] = useState([]);
//   const [currentPageMovementSearch, setCurrentPageMovementSearch] = useState(1);
//   const [containerData, setContainerData] = useState([]);
//   const [selectedContainerNos, setSelectedContainerNos] = useState([]);


//   const lastEntryWithId = ExportMovement.slice().reverse().find(entry => entry.movementReqId && entry.movementReqId.trim().length > 0);
//   // If found, use it as lastEntry; otherwise, use the last entry in the array
//   const lastEntry = lastEntryWithId || ExportMovement[ExportMovement.length - 1];

//   const [isModalOpenForMovementSearch, setIsModalOpenForMovementSearch] = useState(false);
//   const [searchMovementvalues, setSearchMovementvalues] = useState('');
//   const [movementSearchData, setMovementSearchData] = useState([]);

//   const [selectedItems, setSelectedItems] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);


//   // vessel data

//   const [vesselData, setVesselData] = useState([]);
//   const [selectedViaNo, setSelectedViaNo] = useState([]);
//   const [selectedVoyageNo, setSelectedVoyageNo] = useState([]);



//   const [containerTypes, setContainerTypes] = useState([]);




//   const getContainerTypes = async (jarId) => {
//     const cargoType = await getjarByJarId(jarId);
//     if (cargoType && Array.isArray(cargoType) && cargoType.length > 0) {
//       setContainerTypes(cargoType);
//     } else {
//       setContainerTypes([]);
//     }
//   };


//   const getjarByJarId = async (jarId) => {
//     try {
//       const response = await CFSService.getJarDetailSelect(companyid, jarId, jwtToken);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching port data:', error);
//     }
//   };




//   // PAGINATION FOR SELECT EXPORTER
//   const [itemsPerPage] = useState(5);

//   const indexOfLastItemCartingSearch = currentPageMovementSearch * itemsPerPage;
//   const indexOfFirstItemCartingSearch = indexOfLastItemCartingSearch - itemsPerPage;
//   const currentItemsMovementSearch = movementSearchData.slice(indexOfFirstItemCartingSearch, indexOfLastItemCartingSearch);
//   const totalPagesCartingSearch = Math.ceil(movementSearchData.length / itemsPerPage);

//   // Function to handle page change
//   const handlePageChangeCarting = (page) => {
//     if (page >= 1 && page <= totalPagesCartingSearch) {
//       setCurrentPageMovementSearch(page);
//     }
//   };


//   const displayPagesMovement = () => {
//     const centerPageCount = 5;
//     const middlePage = Math.floor(centerPageCount / 2);
//     let startPage = currentPageMovementSearch - middlePage;
//     let endPage = currentPageMovementSearch + middlePage;

//     if (startPage < 1) {
//       startPage = 1;
//       endPage = Math.min(totalPagesCartingSearch, centerPageCount);
//     }

//     if (endPage > totalPagesCartingSearch) {
//       endPage = totalPagesCartingSearch;
//       startPage = Math.max(1, totalPagesCartingSearch - centerPageCount + 1);
//     }

//     return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
//   };







//   const handleOpenMovementSearch = async () => {
//     setIsModalOpenForMovementSearch(true);
//     setSearchMovementvalues('');
//     searchMovementSearch();
//   };

//   const searchMovementSearch = async (searchvalue) => {
//     setCurrentPageMovementSearch(1);
//     setLoading(true);
//     try {
//       const response = await MovementService.getMovementEntriesToSelect(companyid, branchId, searchvalue, jwtToken);
//       setMovementSearchData(response.data);
//     } catch (error) {
//       console.error("Error fetching SB entries:", error);
//     } finally {
//       setLoading(false);
//     }
//   };



//   const handleCloseMovementSearch = (val) => {
//     setIsModalOpenForMovementSearch(false);
//     setSearchMovementvalues('');
//     setMovementSearchData([]);
//   }


//   const clearMovementSearch = (val) => {
//     setSearchMovementvalues('');
//     setMovementSearchData([]);
//   }

//   const selectMovementSearchRadio = async (profitcentreId, movementReqId, ContainerNo, lineId) => {


//     // // console.log('selectMovementSearchRadio \n', profitcentreId, movementReqId, ContainerNo, shippingAgent, shippingLine, lineId);

//     await getSelectedMovementSearch(profitcentreId, movementReqId, ContainerNo, lineId);
//     handleCloseMovementSearch();
//   }


//   const getSelectedMovementSearch = async (profitcentreId, movementReqId, ContainerNo, lineId) => {

//     // // console.log(profitcentreId, movementReqId, ContainerNo, lineId);

//     setValidationErrors([]);
//     setLoading(true);
//     try {
//       const response = await MovementService.getSelectedMovementEntry(companyid, branchId, movementReqId, lineId, ContainerNo, profitcentreId, jwtToken);

//       const initialSelectedContainerNos = response.data.map(entry => ({
//         label: entry.containerNo,
//         value: entry.containerNo,
//       }));
//       // Set the transformed data into the state
//       setSelectedContainerNos(initialSelectedContainerNos);


//       const initialSelectedViaNoNos = response.data.map(entry => ({
//         label: entry.viaNo,
//         value: entry.viaNo,
//       }));
//       // Set the transformed data into the state
//       setSelectedViaNo(initialSelectedViaNoNos);


//       const initialSelectedVoyageNos = response.data.map(entry => ({
//         label: entry.voyageNo,
//         value: entry.voyageNo,
//       }));
//       // Set the transformed data into the state
//       setSelectedVoyageNo(initialSelectedVoyageNos);




//       const initialPods = response.data.map(entry => ({
//         label: entry.pod,
//         value: entry.pod,
//       }));
//       // Set the transformed data into the state
//       setSelectedPod(initialPods);


//       const initialPols = response.data.map(entry => ({
//         label: entry.pol,
//         value: entry.pol,
//       }));
//       // Set the transformed data into the state
//       setSelectedPol(initialPols);







//       setExportMovement(response.data);
//     } catch (error) {
//       console.error("Error fetching SB entries:", error);
//     } finally {
//       setLoading(false);
//     }
//   };




//   const handleHeaderChange = (fieldName, value) => {
//     // Update exportStuffRequest state
//     setExportMovement(prevRequest =>
//       prevRequest.map(item => ({
//         ...item,
//         [fieldName]: value
//       }))
//     );
//     // Update validationErrors state
//     setValidationErrors(prevErrors =>
//       prevErrors.map(error => {
//         const updatedError = { ...error }; // Copy the error object
//         delete updatedError[fieldName]; // Remove the specific field error
//         return updatedError; // Return the updated error object
//       })
//     );
//   };









//   const validateExportMovement = (exportStuffRequest) => {
//     let errors = [];

//     exportStuffRequest.forEach((detail, index) => {
//       const { sbNo, movReqType, containerNo, viaNo, voyageNo, vesselName, grossWeight, typeOfContainer, movementOrderDate, movementReqDate, pod } = detail;
//       let error = {};
//       // // console.log('vesselName ', vesselName);

//       if (!vesselName) { error.vesselName = 'vesselName is required'; }
//       if (!viaNo) error.viaNo = 'viaNo is required.';
//       if (!voyageNo) error.voyageNo = 'voyageNo is required.';
//       if (!movReqType) error.movReqType = 'movReqType is required.';
//       if (!containerNo) error.containerNo = 'containerNo is required.';
//       if (!grossWeight) error.grossWeight = 'grossWeight is required.';
//       if (!sbNo) error.sbNo = 'sbNo is required.';


//       if (!typeOfContainer) error.typeOfContainer = 'typeOfContainer is required.';
//       if (!movementOrderDate) error.movementOrderDate = 'movementOrderDate is required.';
//       if (!movementReqDate) error.movementReqDate = 'movementReqDate is required.';
//       if (!pod) error.pod = 'pod is required.';

//       if (!movementOrderDate || new Date(movementOrderDate).toString() === 'Invalid Date') {
//         error.movementOrderDate = 'movementOrderDate is required.';
//       }

//       if (!movementReqDate || new Date(movementReqDate).toString() === 'Invalid Date') {
//         error.movementReqDate = 'movementReqDate is required.';
//       }

//       errors.push(error);
//     });
//     setValidationErrors(errors);
//     return errors.every(error => Object.keys(error).length === 0);
//   };






//   // ContainerWise Stuffing request
//   const handleContainerNoSearch = async (searchValue, movementType) => {
//     // // console.log('handleContainerNoSearch ', searchValue, 'movementType : ',movementType);
//     if (!searchValue) {
//       setContainerData([]);
//       return;
//     }
//     try {
//       const response = await MovementService.searchContainerNoForMovementWork(companyid, branchId, searchValue, profitcentre.profitcentreId, movementType, jwtToken);
//       const data = response.data;

//       // // // console.log('ContainerData ', data);

//       setContainerData(data);
//     } catch (error) {
//       setContainerData([]);
//       console.error('Error searching ContainerData:', error);
//     }
//   };



//   const handleContainerNoSelect = (selectedOption, index) => {
//     // Update selectedSbNos
//     const updatedSbNos = [...selectedContainerNos];
//     updatedSbNos[index] = selectedOption; // Set the selected option for the specific index
//     setSelectedContainerNos(updatedSbNos); // Update the state

//     setExportMovement((prevContainer) => {
//       const newContainer = [...prevContainer];
//       const firstRecordWithMovementReqId = prevContainer.find(record => record.movementReqId);


//       // Clear validation errors for this index
//       const updatedValidationErrors = [...validationErrors];
//       updatedValidationErrors[index] = {}; // Clear errors for the current index
//       setValidationErrors(updatedValidationErrors);

//       if (!selectedOption) {
//         // If selectedOption is null, clear all values at the index
//         newContainer[index] = {
//           ...newContainer[index],
//           sbNo: '',
//           sbDate: '',
//           containerNo: '',
//           containerSize: '',
//           containerType: '',
//           shippingAgentName: '',
//           shippingAgent: '',
//           shippingLine: '',
//           shippingLineName: '',
//           onAccountOf: '',
//           viaNo: '',
//           voyageNo: '',
//           vesselId: '',
//           vesselName: '',
//           stuffTallyId: '',
//           gateInId: '',
//           agentSealNo: '',
//           customsSealNo: '',
//           grossWeight: '',
//           pod: '',
//           pol: '',
//           stuffId: '',
//           stuffDate: null,
//           stuffTallyLineId: '',
//           stuffTallyDate: null
//         };

//       } else {
//         // Extract values from the selected option
//         const {
//           sbNo,
//           sbDate,
//           containerNo,
//           containerSize,
//           containerType,
//           shippingAgentName,
//           shippingAgent,
//           shippingLine,
//           shippingLineName,
//           onAccountOf,
//           viaNo,
//           voyageNo,
//           vesselId,
//           vesselName,
//           stuffTallyId,
//           gateInId,
//           agentSealNo,
//           customsSealNo,
//           grossWeight,
//           pod,
//           pol,
//           stuffId,
//           stuffDate,
//           stuffTallyLineId,
//           stuffTallyDate,
//         } = selectedOption;

//         // Update the specific index with the new values
//         newContainer[index] = {
//           ...newContainer[index],
//           sbNo: sbNo,
//           sbDate: sbDate,
//           containerNo: containerNo,
//           containerSize: containerSize,
//           containerType: containerType,
//           shippingAgentName: shippingAgentName,
//           shippingAgent: shippingAgent,
//           shippingLine: shippingLine,
//           shippingLineName: shippingLineName,
//           onAccountOf: onAccountOf,
//           viaNo: viaNo,
//           voyageNo: voyageNo,
//           vesselId: vesselId,
//           vesselName: vesselName,
//           stuffTallyId: stuffTallyId,
//           gateInId: gateInId,
//           agentSealNo: agentSealNo,
//           customsSealNo: customsSealNo,
//           grossWeight: grossWeight,
//           pod: pod,
//           pol: pol,
//           stuffId: stuffId,
//           stuffDate: stuffDate,
//           stuffTallyLineId: stuffTallyLineId,
//           stuffTallyDate: stuffTallyDate,
//           movementOrderDate: firstRecordWithMovementReqId ? firstRecordWithMovementReqId.movementOrderDate : new Date()
//         };
//       }

//       return newContainer; // Return the updated container
//     });


//     // Update selectedViaNo and selectedVoyageNo for the current index
//     const updatedViaNo = [...selectedViaNo];
//     updatedViaNo[index] = selectedOption ? { value: selectedOption.viaNo, label: selectedOption.viaNo } : null;
//     setSelectedViaNo(updatedViaNo); // Update viaNo

//     const updatedVoyageNo = [...selectedVoyageNo];
//     updatedVoyageNo[index] = selectedOption ? { value: selectedOption.voyageNo, label: selectedOption.voyageNo } : null;
//     setSelectedVoyageNo(updatedVoyageNo); // Update voyageNo

//     // Optionally, clear sbNos if needed
//     setContainerData([]); // Clear the sbNos if that is intended
//   };







//   const handlePaymentDateChange = (date, index, name, containerNo) => {
//     setExportMovement(prevState => {
//       const updatedTransDtl = prevState.map(item => {
//         // Only update the item if its containerNo matches the provided containerNo
//         if (item.containerNo === containerNo) {
//           return {
//             ...item,
//             [name]: date
//           };
//         }
//         return item; // Return other items as they are
//       });
//       return updatedTransDtl;
//     });
//     // Clear the validation error for the specified field
//     setValidationErrors(prevErrors => {
//       const updatedErrors = [...prevErrors];
//       if (updatedErrors[index]) {
//         delete updatedErrors[index][name];  // Corrected deletion syntax
//       }
//       return updatedErrors;
//     });
//   };


//   const handleKeyDown = (event, index, fieldName, containerNo) => {

//     if (event.key === 'Enter') {


//       handlePaymentDateChange(new Date(), index, fieldName, containerNo);
//     }
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
//         id={id}
//         style={{ width: '100%' }} // Adjust as needed
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



//   const searchVoyageAndVia = async (searchValue) => {
//     // // console.log('searchValue ', searchValue);
//     if (!searchValue) {
//       setVesselData([]);
//       return;
//     }
//     try {
//       const response = await CFSService.searchVessel(companyid, branchId, searchValue, jwtToken);
//       const data = response.data;

//       // // console.log('searchVoyageAndVia ', data);

//       setVesselData(data);
//     } catch (error) {
//       setVesselData([]);
//       console.error('Error searching vessel:', error);
//     }
//   };


//   const handleVoyageSelect = async (selectedOption, fieldName, index) => {
//     // Update selected values for viaNo and voyageNo index-wise
//     setSelectedViaNo(prevState => {
//       const updatedState = [...prevState];
//       updatedState[index] = selectedOption ? { value: selectedOption.viaNo, label: selectedOption.viaNo } : null;
//       return updatedState;
//     });

//     setSelectedVoyageNo(prevState => {
//       const updatedState = [...prevState];
//       updatedState[index] = selectedOption ? { value: selectedOption.voyageNo, label: selectedOption.voyageNo } : null;
//       return updatedState;
//     });

//     // Prepare updates based on selected option
//     const updates = selectedOption
//       ? {
//         vesselId: selectedOption.value,
//         voyageNo: selectedOption.voyageNo,
//         viaNo: selectedOption.viaNo,
//         vesselName: selectedOption.vesselName,
//         rotationDate: selectedOption.rotationDate,
//         gateOpenDate: new Date(selectedOption.gateOpenDate),
//         berthingDate: new Date(selectedOption.berthDate),
//         rotationNo: selectedOption.rotationNo,
//       }
//       : { vesselId: '', voyageNo: '', viaNo: '', vesselName: '', rotationDate: null, gateOpenDate: null, berthingDate: null, rotationNo: '' };

//     // Update exportMovement at the specified index
//     setExportMovement(prevState => {
//       return prevState.map((item, idx) => {
//         if (idx === index) {
//           return { ...item, ...updates }; // Update the specific index
//         }
//         return item; // Return other items unchanged
//       });
//     });

//     // Update validationErrors state for the specific index
//     setValidationErrors(prevErrors => {
//       return prevErrors.map((error, idx) => {
//         if (idx === index) {
//           const updatedError = { ...error }; // Copy the error object

//           // Remove specific field errors
//           delete updatedError.voyageNo;
//           delete updatedError.viaNo;
//           delete updatedError.vesselName;

//           return updatedError; // Return the updated error object
//         }
//         return error; // Return other errors unchanged
//       });
//     });
//   };



//   const handleCreationSelect = async (inputValue, fieldName, index) => {
//     const updates = { [fieldName]: inputValue }; // Dynamically set the field name

//     if (fieldName === 'viaNo') {
//       setSelectedViaNo(prevState => {
//         const updatedState = [...prevState];
//         updatedState[index] = { value: inputValue, label: inputValue };
//         return updatedState;
//       });
//     } else if (fieldName === 'voyageNo') {
//       setSelectedVoyageNo(prevState => {
//         const updatedState = [...prevState];
//         updatedState[index] = { value: inputValue, label: inputValue };
//         return updatedState;
//       });
//     }

//     // Update exportMovement at the specified index
//     setExportMovement(prevState =>
//       prevState.map((item, idx) => {
//         if (idx === index) {
//           return { ...item, ...updates }; // Update only the specified index
//         }
//         return item; // Leave other items unchanged
//       })
//     );

//     // Update validationErrors state for the specified index
//     setValidationErrors(prevErrors =>
//       prevErrors.map((error, idx) => {
//         if (idx === index) {
//           const updatedError = { ...error };
//           delete updatedError[fieldName]; // Remove validation error for the specific field
//           return updatedError; // Return the updated error
//         }
//         return error; // Leave other errors unchanged
//       })
//     );
//   };












//   // // console.log('export Movement : ', ExportMovement);

//   // // console.log('validation Erors: ', validationErrors);






//   const handleSave = async (exportStuffRequest) => {
//     if (!Array.isArray(exportStuffRequest) || exportStuffRequest.length === 0) {
//       toast.warning('please select container!', {
//         position: 'top-center',
//         autoClose: 700,
//       });
//       return;
//     }

//     // // console.log('container Export : \n', ExportMovement);

//     if (!validateExportMovement(exportStuffRequest)) {
//       toast.warning('Please enter required fields!', {
//         position: 'top-center',
//         autoClose: 1000,
//       });
//       // // console.log('validationErrorsContainer : \n', validationErrors);
//       return false;
//     }
//     setLoading(true);
//     try {
//       const response = await MovementService.saveExportMovement(companyid, branchId, userId, exportStuffRequest, jwtToken);

//       setExportMovement(response.data);
//       // setPreExportMovement(response.data);

//       if (searchData && (searchData.sbNo || searchData.container)
//       ) {
//         updatePagesList("P00238");
//       }

//       // // console.log('saveExportMovement : \n', response.data);
//       toast.success('Data added Successfully!', {
//         position: 'top-center',
//         autoClose: 700,
//       });


//       return { success: true, cargoGateIns: response.data };
//     } catch (error) {

//       if (error.response && error.response.status === 400) { // Check if error response exists
//         const errorMessage = error.response.data;


//         // Extract SrNo and sbNo from the error message for targeted validation
//         const match = errorMessage.match(/SrNo: (\d+) and Container No: (\d+)/);
//         if (match) {


//           const srNo = parseInt(match[1], 10);
//           const sbNo = match[2];

//           const errorMessageNew = `Duplicate Container No found for SrNo: <strong>${srNo}</strong> and Container No: <strong>${sbNo}</strong>`;
//           const contentWidth = errorMessageNew.length * 6;

//           toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessageNew }} />, {
//             position: 'top-center',
//             autoClose: 3000,
//             style: { width: `${contentWidth}px` },
//           });

//           // Find the index of the cargo entry based on SrNo
//           const errorIndex = ExportMovement.findIndex(entry => entry.stuffReqLineId === srNo);
//           if (errorIndex !== -1) {
//             const newErrors = [...validationErrors];
//             newErrors[errorIndex] = { ...newErrors[errorIndex], sbNo: `Duplicate SB No: ${sbNo}` };
//             setValidationErrors(newErrors);
//           }
//         }
//         else {
//           toast.error(errorMessage, {
//             position: 'top-center',
//             autoClose: 3000,
//           });
//         }

//         return { success: false, cargoEntries: null };
//       }

//       toast.error('Oops something went wrong!', {
//         position: 'top-center',
//         autoClose: 700,
//       });

//       return { success: false, cargoGateIns: null }; // Return false if an error occurs

//     } finally {
//       setLoading(false);
//     }
//   };



//   const handleReset = async () => {
//     setValidationErrors([]);
//     setExportMovement([initialExportMovement]);


//     const clearedContainerNos = selectedContainerNos.map(() => null);
//     const clearedVias = selectedViaNo.map(() => null);
//     const clearedVoyages = selectedVoyageNo.map(() => null);
//     const clearedPol = selectedPol.map(() => null);
//     const clearedPod = selectedPod.map(() => null);

//     setSelectedPod(clearedPod);
//     setSelectedPol(clearedPol);

//     setSelectedContainerNos(clearedContainerNos);
//     setSelectedViaNo(clearedVias);
//     setSelectedVoyageNo(clearedVoyages);
//   };



//   const handleAddRow = async (exportStuffingRequest) => {

//     // // console.log('exportStuffingRequest \n ', exportStuffingRequest);

//     const { success, cargoGateIns } = await handleSave(exportStuffingRequest);
//     if (!success) {
//       return;
//     }
//     const saveRecord = cargoGateIns[0];
//     // Calculate the new srNo based on the current list length
//     const newSrNo = cargoGateIns.length + 1;
//     // Create a new entry with the incremented srNo
//     const newCargoEntry = {
//       ...initialExportMovement,
//       movementReqLineId: newSrNo,
//       movementOrderDate: saveRecord.stuffReqDate,
//       profitcenterId: saveRecord.profitcentreId,
//       shift: saveRecord.shift,
//       comments: saveRecord.comments,
//       movementOrderDate: saveRecord.movementOrderDate
//     };
//     // Add the new entry to the state
//     setExportMovement([...cargoGateIns, newCargoEntry]);
//   };



//   //   const handleFieldChange = (e, index, fieldName) => {
//   //     let value;
//   //     let forceEntryDate; // Do not set a default value; leave it undefined unless it's a checkbox

//   //     // Check if the field is a checkbox
//   //     if (e.target.type === 'checkbox') {
//   //         value = e.target.checked ? 'Y' : 'N'; // 'Y' if checked, 'N' if unchecked
//   //         forceEntryDate = e.target.checked ? new Date() : null; // Update forceEntryDate only for checkbox
//   //     } else {
//   //         value = e.target.value; // For text and other fields, use the input value
//   //     }

//   //     // Remove validation error for the specific field
//   //     setValidationErrors(prevErrors => {
//   //         const updatedErrors = [...prevErrors];
//   //         if (updatedErrors[index]) {
//   //             delete updatedErrors[index][fieldName];
//   //         }
//   //         return updatedErrors;
//   //     });

//   //     // Update the state
//   //     setExportMovement(prevState => {
//   //         const updatedTransDtl = [...prevState];
//   //         updatedTransDtl[index] = {
//   //             ...updatedTransDtl[index],
//   //             [fieldName]: value, // Update the field with the new value
//   //             ...(forceEntryDate !== undefined && { forceEntryDate }) // Update forceEntryDate only if defined
//   //         };
//   //         return updatedTransDtl;
//   //     });
//   // };


//   const handleFieldChange = (e, index, fieldName) => {
//     let value;
//     let forceEntryDate; // Do not set a default value; leave it undefined unless it's a checkbox

//     // Check if the field is a checkbox
//     if (e.target.type === 'checkbox') {
//       value = e.target.checked ? 'Y' : 'N'; // 'Y' if checked, 'N' if unchecked
//       forceEntryDate = e.target.checked ? new Date() : null; // Update forceEntryDate only for checkbox
//     } else {
//       value = e.target.value; // For text and other fields, use the input value
//     }

//     // Remove validation error for the specific field
//     setValidationErrors(prevErrors => {
//       const updatedErrors = [...prevErrors];

//       if (fieldName === 'movReqType') {
//         // Remove specific fields from validationErrors for this index
//         if (updatedErrors[index]) {
//           delete updatedErrors[index]['sbNo'];
//           delete updatedErrors[index]['sbDate'];
//           delete updatedErrors[index]['containerNo'];
//           delete updatedErrors[index]['containerSize'];
//           delete updatedErrors[index]['containerType'];
//           delete updatedErrors[index]['shippingAgentName'];
//           delete updatedErrors[index]['shippingAgent'];
//           delete updatedErrors[index]['shippingLine'];
//           delete updatedErrors[index]['shippingLineName'];
//           delete updatedErrors[index]['onAccountOf'];
//           delete updatedErrors[index]['viaNo'];
//           delete updatedErrors[index]['voyageNo'];
//           delete updatedErrors[index]['vesselId'];
//           delete updatedErrors[index]['vesselName'];
//           delete updatedErrors[index]['stuffTallyId'];
//           delete updatedErrors[index]['gateInId'];
//           delete updatedErrors[index]['agentSealNo'];
//           delete updatedErrors[index]['customsSealNo'];
//           delete updatedErrors[index]['grossWeight'];
//           delete updatedErrors[index]['pod'];
//           delete updatedErrors[index]['pol'];
//           delete updatedErrors[index]['stuffId'];
//           delete updatedErrors[index]['stuffDate'];
//           delete updatedErrors[index]['stuffTallyLineId'];
//           delete updatedErrors[index]['stuffTallyDate'];
//         }
//       } else if (updatedErrors[index]) {
//         delete updatedErrors[index][fieldName];
//       }

//       return updatedErrors;
//     });

//     if (fieldName === 'movReqType') {
//       setSelectedContainerNos(prevSelected => {
//         const updatedSelected = [...prevSelected];
//         updatedSelected[index] = null; // Remove the selectedContainerNo for this index
//         return updatedSelected;
//       });

//       setSelectedViaNo(prevSelected => {
//         const updatedSelected = [...prevSelected];
//         updatedSelected[index] = null; // Remove the selectedContainerNo for this index
//         return updatedSelected;
//       });

//       setSelectedVoyageNo(prevSelected => {
//         const updatedSelected = [...prevSelected];
//         updatedSelected[index] = null; // Remove the selectedContainerNo for this index
//         return updatedSelected;
//       });
//     }
//     // Update the state
//     setExportMovement(prevState => {
//       const updatedTransDtl = [...prevState];

//       if (fieldName === 'movReqType') {
//         // Reset specific fields to their initial values for this index
//         updatedTransDtl[index] = {
//           ...updatedTransDtl[index],
//           [fieldName]: value, // Update the field with the new value
//           sbNo: '',
//           sbDate: '',
//           containerNo: '',
//           containerSize: '',
//           containerType: '',
//           shippingAgentName: '',
//           shippingAgent: '',
//           shippingLine: '',
//           shippingLineName: '',
//           onAccountOf: '',
//           viaNo: '',
//           voyageNo: '',
//           vesselId: '',
//           vesselName: '',
//           stuffTallyId: '',
//           gateInId: '',
//           agentSealNo: '',
//           customsSealNo: '',
//           grossWeight: '',
//           pod: '',
//           pol: '',
//           stuffId: '',
//           stuffDate: null,
//           stuffTallyLineId: '',
//           stuffTallyDate: null,
//           forceEntryDate: null,
//           forceEntryFlag: 'N',
//           movementReqDate: null,
//           forceEntryApproval: '',
//           forceEntryRemarks: '',
//           typeOfContainer: 'General'

//         };




//       } else {
//         updatedTransDtl[index] = {
//           ...updatedTransDtl[index],
//           [fieldName]: value, // Update the field with the new value
//           ...(forceEntryDate !== undefined && { forceEntryDate }) // Update forceEntryDate only if defined
//         };
//       }

//       return updatedTransDtl;
//     });
//   };







//   const handleRemoveRow = (index) => {
//     if (ExportMovement.length > 1) {
//       setExportMovement(ExportMovement.filter((_, i) => i !== index));
//     }
//   };





//   const searchPortData = async (searchValue, fieldName) => {
//     if (!searchValue) {
//       setPodData([]);
//       setPolData([])
//       return;
//     }
//     try {
//       const response = await MovementService.searchPortsData(companyid, branchId, searchValue, jwtToken);
//       fieldName === 'pod' ? setPodData(response.data) : setPolData(response.data);

//       // console.log('port Data: ', response.data);
//     } catch (error) {
//       setPodData([]);
//       setPolData([])
//       console.error('Error searching vessel:', error);
//     }
//   };



//   const [podData, setPodData] = useState([]);
//   const [selectedPod, setSelectedPod] = useState([]);
//   const [polData, setPolData] = useState([]);
//   const [selectedPol, setSelectedPol] = useState([]);

//   const handlePodSelect = async (selectedOption, fieldName, index) => {
//     // Update selected values for viaNo and voyageNo index-wise

//     if (fieldName === 'pod') {
//       setSelectedPod(prevState => {
//         const updatedState = [...prevState];
//         updatedState[index] = selectedOption;
//         return updatedState;
//       });
//     }
//     else {
//       setSelectedPol(prevState => {
//         const updatedState = [...prevState];
//         updatedState[index] = selectedOption;
//         return updatedState;
//       });
//     }
//     let updates = {};
//     // Prepare updates based on selected option
//     if (fieldName === 'pod') {
//       updates = selectedOption
//         ? {
//           pod: selectedOption.label,
//         }
//         : { pod: '' };
//     } else {
//       updates = selectedOption
//         ? {
//           pol: selectedOption.label,
//         }
//         : { pol: '' };
//     }

//     // Update exportMovement at the specified index
//     setExportMovement(prevState => {
//       return prevState.map((item, idx) => {
//         if (idx === index) {
//           return { ...item, ...updates }; // Update the specific index
//         }
//         return item; // Return other items unchanged
//       });
//     });

//     // Update validationErrors state for the specific index
//     setValidationErrors(prevErrors => {
//       return prevErrors.map((error, idx) => {
//         if (idx === index) {
//           const updatedError = { ...error }; // Copy the error object
//           // Remove specific field errors
//           delete updatedError[fieldName];
//           return updatedError; // Return the updated error object
//         }
//         return error; // Return other errors unchanged
//       });
//     });
//   };



//   const handleCreationSelectPod = async (inputValue, fieldName, index) => {
//     const updates = { [fieldName]: inputValue }; // Dynamically set the field name

//     if (fieldName === 'pod') {
//       setSelectedPod(prevState => {
//         const updatedState = [...prevState];
//         updatedState[index] = { value: inputValue, label: inputValue };
//         return updatedState;
//       });
//     } else {
//       setSelectedPol(prevState => {
//         const updatedState = [...prevState];
//         updatedState[index] = { value: inputValue, label: inputValue };
//         return updatedState;
//       });
//     }


//     // Update exportMovement at the specified index
//     setExportMovement(prevState =>
//       prevState.map((item, idx) => {
//         if (idx === index) {
//           return { ...item, ...updates }; // Update only the specified index
//         }
//         return item; // Leave other items unchanged
//       })
//     );

//     // Update validationErrors state for the specified index
//     setValidationErrors(prevErrors =>
//       prevErrors.map((error, idx) => {
//         if (idx === index) {
//           const updatedError = { ...error };
//           delete updatedError[fieldName]; // Remove validation error for the specific field
//           return updatedError; // Return the updated error
//         }
//         return error; // Leave other errors unchanged
//       })
//     );
//   };

// console.log('exportMovement : ', ExportMovement);








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
//                       Work Order Id
//                     </label>
//                     <input
//                       className="form-control"
//                       type="text"
//                       id="service"
//                       readOnly
//                       value={lastEntry.movementReqId}
//                     />
//                   </FormGroup>
//                 </Col>

//                 <Col md={3} className="d-flex justify-content-end" style={{ marginTop: 21 }}>
//                   <button
//                     className="btn btn-outline-primary btn-margin newButton"
//                     style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//                     id="submitbtn2"
//                     onClick={handleOpenMovementSearch}
//                   >
//                     <FontAwesomeIcon icon={faSearch} size="sm" />
//                   </button>
//                 </Col>
//               </Row>
//             </Col>




//             <Modal Modal isOpen={isModalOpenForMovementSearch} onClose={handleCloseMovementSearch} toggle={handleCloseMovementSearch} style={{ maxWidth: '1100px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>

//               <ModalHeader toggle={handleCloseMovementSearch} style={{
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
//                 /> Search Movement Entries</h5>

//               </ModalHeader>
//               <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
//                 <Row>
//                   <Col md={6}>
//                     <FormGroup>
//                       <label className="forlabel bold-label" htmlFor="sbRequestId">
//                         Search by ContainerNo / Request Id / Via/ Voyage
//                       </label>
//                       <input
//                         className="form-control"
//                         type="text"
//                         id="searchCartingvalues"
//                         maxLength={15}
//                         name='searchCartingvalues'
//                         value={searchMovementvalues}
//                         onChange={(e) => setSearchMovementvalues(e.target.value)}
//                       />

//                     </FormGroup>
//                   </Col>
//                   <Col md={6} style={{ marginTop: 24 }}>
//                     <button
//                       className="btn btn-outline-primary btn-margin newButton"
//                       style={{ marginRight: 10, fontWeight: 'bold' }}
//                       id="submitbtn2"
//                       onClick={() => searchMovementSearch(searchMovementvalues)}
//                     >
//                       <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
//                       Search
//                     </button>
//                     <button
//                       className="btn btn-outline-danger btn-margin newButton"
//                       style={{ marginRight: 10, fontWeight: 'bold' }}
//                       id="submitbtn2"
//                       onClick={clearMovementSearch}
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
//                         <th scope="col">MovementReq Id</th>
//                         <th scope="col">ContainerNo</th>
//                         <th scope="col">ViaNo</th>
//                         <th scope="col">VoyageNo</th>
//                         <th scope="col">ShippingAgent</th>
//                         <th scope="col">ShippingLine</th>
//                         <th scope="col">Status</th>
//                       </tr>
//                       <tr className='text-center'>
//                         <th scope="col"></th>
//                         <th scope="col">{movementSearchData.length}</th>
//                         <th scope="col"></th>
//                         <th scope="col"></th>
//                         <th scope="col"></th>
//                         <th scope="col"></th>
//                         <th scope="col"></th>
//                         <th scope="col"></th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr className='text-center'>
//                         <td>
//                           <input type="radio" name="radioGroup" onChange={() => selectMovementSearchRadio('', '', '', '', '', '', '')} value={''} />
//                         </td>
//                         <td></td>
//                         <td></td>
//                         <td></td>
//                         <td></td>
//                         <td></td>
//                         <td></td>
//                         <td></td>
//                       </tr>
//                       {currentItemsMovementSearch.map((item, index) => (
//                         <>
//                           <tr key={index} className='text-center'>
//                             <td>
//                               <input
//                                 type="radio"
//                                 name="radioGroup"
//                                 onClick={() => selectMovementSearchRadio(item[0], item[1], item[5], item[3])} // Using onClick instead of onChange
//                                 value={item[0]}
//                               />
//                             </td>

//                             <td>{item[1]}</td>
//                             <td>{item[5]}</td>
//                             <td>{item[11]}</td>
//                             <td>{item[10]}</td>
//                             <td>{item[8]}</td>
//                             <td>{item[9]}</td>
//                             <td>{item[12] === 'A' ? 'Approved' : item[12] === 'N' ? 'New' : ''}</td>
//                           </tr>
//                         </>
//                       ))}
//                     </tbody>
//                   </table>
//                   <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
//                     <Pagination.First onClick={() => handlePageChangeCarting(1)} />
//                     <Pagination.Prev
//                       onClick={() => handlePageChangeCarting(currentPageMovementSearch - 1)}
//                       disabled={currentPageMovementSearch === 1}
//                     />
//                     <Pagination.Ellipsis />

//                     {displayPagesMovement().map((pageNumber) => (
//                       <Pagination.Item
//                         key={pageNumber}
//                         active={pageNumber === currentPageMovementSearch}
//                         onClick={() => handlePageChangeCarting(pageNumber)}
//                       >
//                         {pageNumber}
//                       </Pagination.Item>
//                     ))}
//                     <Pagination.Ellipsis />
//                     <Pagination.Next
//                       onClick={() => handlePageChangeCarting(currentPageMovementSearch + 1)}
//                       disabled={currentPageMovementSearch === totalPagesCartingSearch}
//                     />
//                     <Pagination.Last onClick={() => handlePageChangeCarting(totalPagesCartingSearch)} />
//                   </Pagination>
//                 </div>
//               </ModalBody>
//             </Modal>











































//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="movementReqDate">
//                   Work Order Date
//                 </label>
//                 <div style={{ position: "relative" }}>




//                   <DatePicker
//                     selected={lastEntry.movementOrderDate}
//                     // onChange={(date) => handleDateChange('inGateInDate', date)}
//                     id="service"
//                     name="cartingTransDate"
//                     placeholderText="Enter Carting Date"
//                     dateFormat="dd/MM/yyyy HH:mm" // Updated format
//                     timeInputLabel="Time:"
//                     showTimeInput
//                     timeFormat="HH:mm" // 24-hour format for time
//                     timeIntervals={15}
//                     className={`form-control`}
//                     wrapperClassName="custom-react-datepicker-wrapper"
//                     disabled
//                     readOnly
//                     tabIndex={-1}
//                   /><FontAwesomeIcon
//                     icon={faCalendarAlt}
//                     style={{
//                       position: "absolute",
//                       right: "10px",
//                       top: "50%",
//                       transform: "translateY(-50%)",
//                       pointerEvents: "none",
//                       color: "#6c757d",
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
//                 <label className="forlabel" for="HazardousHazardous">Shift <span className="error-message">*</span></label>
//                 <div style={{ position: 'relative' }}>
//                   <Input
//                     type="select"
//                     name="shift"
//                     className={`form-control ${validationErrors.length > 0 && validationErrors[validationErrors.length - 1]?.shift ? 'error-border' : ''}`}
//                     value={lastEntry.shift}
//                     onChange={(e) => handleHeaderChange('shift', e.target.value)}
//                   >
//                     <option value="Day">Day</option>
//                     <option value="Second">Second</option>
//                     <option value="Third">Third</option>
//                   </Input>
//                 </div>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="status"
//                 >
//                   Status
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="service"
//                   maxLength={15}
//                   readOnly
//                   name="status"
//                   value={lastEntry.status === 'A' ? 'Approved' : lastEntry.status === 'N' ? 'New' : ''}
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
//                   name="approvedBy"
//                   value={lastEntry.createdBy}
//                 />
//               </FormGroup>
//             </Col>
//           </Row>


//           <Row>


//             <Col md={4}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                   Comments
//                 </label>
//                 <textarea
//                   className={`inputwidthTukaMax form-control`}
//                   id="remarks"
//                   name='remarks'
//                   value={lastEntry.comments}
//                   onChange={(e) => handleHeaderChange('comments', e.target.value)}
//                   maxLength={250}
//                   rows={2}
//                 ></textarea>
//               </FormGroup>
//             </Col>

//           </Row>


//         </div>

//         <Row className="text-center">
//           <Col>
//             <button
//               className="btn btn-outline-primary btn-margin newButton"
//               style={{ fontSize: 13, marginRight: 10 }}
//               id="submitbtn2"
//               onClick={(e) => handleSave(ExportMovement)}
//             >
//               <FontAwesomeIcon
//                 icon={faSave}
//                 style={{ marginRight: "5px" }}
//               />
//               Save
//             </button>

//             <button
//               className="btn btn-outline-danger btn-margin newButton"
//               style={{ fontSize: 13, marginRight: 10 }}
//               id="submitbtn2"
//               onClick={handleReset}
//             >
//               <FontAwesomeIcon
//                 icon={faRefresh}
//                 style={{ marginRight: "5px" }}
//               />
//               Clear
//             </button>


//             <button
//               className="btn btn-outline-primary btn-margin newButton"
//               style={{ fontSize: 13, marginRight: 10 }}
//               id="submitbtn2"
//               onClick={(e) => handleAddRow(ExportMovement)}
//             >
//               <FontAwesomeIcon
//                 icon={faAdd}
//                 style={{ marginRight: "5px" }}
//               />
//               Add Container
//             </button>


//           </Col>
//         </Row>




//         <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>

//           <h5>Movement work order Container details</h5>

//           <Table className="table table-bordered" style={{ border: '2px solid black' }}>
//             <thead className="tableHeader">
//               <tr>
//                 <th scope="col" className="text-center" style={{ color: "black" }}>Sr No</th>
//                 <th scope="col" className="text-center" style={{ color: "black" }}>Type</th>
//                 <th scope="col" className="text-center" style={{ color: "black" }}>Container No <span className="error-message">*</span></th>
//                 <th scope="col" className="text-center" style={{ color: "black" }}>Size</th>
//                 <th scope="col" className="text-center" style={{ color: "black" }}>Type</th>
//                 <th scope="col" className="text-center" style={{ color: "black" }}>Agent Seal No</th>
//                 <th scope="col" className="text-center" style={{ color: "black" }}>Custom Seal No</th>
//                 <th scope="col" className="text-center" style={{ color: "black" }}>SB No</th>
//                 <th scope="col" className="text-center" style={{ color: "black" }}>POL</th>
//                 <th scope="col" className="text-center" style={{ color: "black" }}>POD<span className="error-message">*</span></th>
//                 <th scope="col" className="text-center" style={{ color: "black" }}>Shipping Agent</th>
//                 <th scope="col" className="text-center" style={{ color: "black" }}>Shipping Line</th>
//                 <th scope="col" className="text-center" style={{ color: "black" }}>Via No<span className="error-message">*</span></th>
//                 <th scope="col" className="text-center" style={{ color: "black" }}>Voyage No<span className="error-message">*</span></th>
//                 <th scope="col" className="text-center" style={{ color: "black" }}>Vessel<span className="error-message">*</span></th>
//                 <th scope="col" className="text-center" style={{ color: "black" }}>Gross Wt</th>
//                 <th scope="col" className="text-center" style={{ color: "black" }}>Type Of Container</th>
//                 <th scope="col" className="text-center" style={{ color: "black" }}>Movement Req Date</th>
//                 <th scope="col" className="text-center" style={{ color: "black" }}>Force Entry Date</th>
//                 <th scope="col" className="text-center" style={{ color: "black" }}>Force Flag</th>
//                 <th scope="col" className="text-center" style={{ color: "black" }}>Authorised Person</th>
//                 <th scope="col" className="text-center" style={{ color: "black" }}>Force Approval Remarks</th>
//                 <th scope="col" className="text-center" style={{ color: "black" }}>Status</th>
//                 {ExportMovement.length > 1 && (
//                   <th scope="col" className="text-center" style={{ color: "black" }}>Action</th>
//                 )}
//               </tr>
//             </thead>
//             <tbody>
//               {ExportMovement.map((cargoEntry, index) => (
//                 <tr key={index} className="text-center">
//                   <td>
//                     {index + 1}
//                   </td>

//                   <td>

//                     <FormGroup>

//                       <Input
//                         type="select"
//                         name="movReqType"
//                         className={`form-control inputwidthTuka ${validationErrors[index]?.movReqType ? 'error-border' : ''}`}
//                         value={cargoEntry.movReqType}
//                         onChange={(e) => handleFieldChange(e, index, 'movReqType', '')}
//                         disabled={cargoEntry.status}
//                         readOnly={cargoEntry.status}
//                         id={cargoEntry.status ? 'service' : ''}
//                       >
//                         <option value="CLP">CLP</option>
//                         <option value="Buffer">Buffer</option>
//                         <option value="ONWH">On Wheel</option>
//                         <option value="PortRn">Port Return</option>
//                       </Input>
//                     </FormGroup>

//                   </td>


//                   <td>
//                     <FormGroup>
//                       <Select
//                         options={containerData}
//                         value={selectedContainerNos[index]}
//                         onChange={(selectedOption) => handleContainerNoSelect(selectedOption, index)}
//                         onInputChange={(inputValue, { action }) => {
//                           if (action === 'input-change') {
//                             handleContainerNoSearch(inputValue, cargoEntry.movReqType);
//                           }
//                         }}
//                         className={`inputwidthTukaMax ${validationErrors[index]?.containerNo ? 'error-border' : ''}`}
//                         placeholder="Select ContainerNo"
//                         //components={{ Option: CustomOption }}
//                         menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
//                         menuPosition="fixed" // Sets the dropdown menu position to fixed    
//                         menuPlacement="top"
//                         isClearable
//                         isDisabled={cargoEntry.status}
//                         id={cargoEntry.status ? 'service' : ''}
//                         styles={{
//                           control: (provided, state) => ({
//                             ...provided,
//                             height: 32, // Set height
//                             minHeight: 32, // Set minimum height
//                             border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
//                             boxShadow: "none",
//                             display: 'flex',
//                             alignItems: 'center', // Align items vertically
//                             padding: 0, // Remove padding to control height
//                             "&:hover": {
//                               border: "1px solid #ccc",
//                             },
//                             borderRadius: '6px', // Add border radius
//                             "&:hover": {
//                               border: "1px solid #ccc",
//                             },
//                           }),
//                           valueContainer: (provided) => ({
//                             ...provided,
//                             height: '100%', // Full height of the control
//                             display: 'flex',
//                             alignItems: 'center', // Align items vertically
//                             padding: '0 0.75rem', // Match padding
//                           }),
//                           singleValue: (provided) => ({
//                             ...provided,
//                             lineHeight: '32px', // Center text vertically
//                           }),
//                           indicatorSeparator: () => ({
//                             display: "none",
//                           }),
//                           dropdownIndicator: () => ({
//                             display: "none",
//                           }),
//                           placeholder: (provided) => ({
//                             ...provided,
//                             lineHeight: '32px', // Center placeholder text vertically
//                             color: "gray",
//                           }),
//                           clearIndicator: (provided) => ({
//                             ...provided,
//                             padding: 2, // Remove padding
//                             display: 'flex',
//                             alignItems: 'center', // Align clear indicator vertically
//                           }),
//                         }}
//                       />
//                     </FormGroup>
//                   </td>






//                   <td>
//                     <FormGroup>
//                       <Input
//                         type="text"
//                         value={cargoEntry.containerSize}
//                         className={`inputwidthTukaMin form-control`}
//                         readOnly
//                         id="service"
//                         tabIndex={-1}
//                       />
//                     </FormGroup>
//                   </td>




//                   <td>
//                     <FormGroup>
//                       <Input
//                         type="text"
//                         value={cargoEntry.containerType}
//                         className={`inputwidthTukaMin form-control`}
//                         readOnly
//                         id="service"
//                         tabIndex={-1}
//                       />
//                     </FormGroup>
//                   </td>


//                   <td>
//                     <FormGroup>
//                       <Input
//                         type="text"
//                         value={cargoEntry.agentSealNo}
//                         className={`inputwidthTuka form-control ${validationErrors[index]?.agentSealNo ? 'error-border' : ''}`}
//                         maxLength={15}
//                         onChange={(e) => handleFieldChange(e, index, 'agentSealNo', '')}
//                       />
//                     </FormGroup>
//                   </td>


//                   <td>
//                     <FormGroup>
//                       <Input
//                         type="text"
//                         value={cargoEntry.customsSealNo}
//                         className={`inputwidthTuka form-control ${validationErrors[index]?.customsSealNo ? 'error-border' : ''}`}
//                         maxLength={15}
//                         onChange={(e) => handleFieldChange(e, index, 'customsSealNo', '')}
//                       />
//                     </FormGroup>
//                   </td>


//                   <td>
//                     <FormGroup>
//                       <Input
//                         type="text"
//                         value={cargoEntry.sbNo}
//                         className={`inputwidthTuka form-control`}
//                         readOnly
//                         id="service"
//                         tabIndex={-1}
//                       />
//                     </FormGroup>
//                   </td>

//                   <td>
//                     <FormGroup>
//                       <CreatableSelect
//                         value={selectedPol[index]}
//                         onChange={(selectedOption) => handlePodSelect(selectedOption, 'pol', index)}
//                         options={polData}
//                         placeholder="Select POL"
//                         onInputChange={(inputValue, { action }) => {
//                           if (action === 'input-change') {
//                             searchPortData(inputValue, 'pol');
//                           }
//                         }}
//                         onCreateOption={(inputValue) => {
//                           const maxLength = 50;
//                           const truncatedInputValue = inputValue.slice(0, maxLength);
//                           handleCreationSelectPod(truncatedInputValue, 'pol', index)
//                         }}
//                         isClearable
//                         id="pod"
//                         name='pod'
//                         className={`inputwidthTuka`}
//                         menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
//                         menuPosition="fixed" // Sets the dropdown menu position to fixed    
//                         menuPlacement="top"
//                         styles={{
//                           control: (provided, state) => ({
//                             ...provided,
//                             height: 32,  // Set the height of the select input
//                             minHeight: 32,
//                             border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
//                             // display: 'flex',
//                             // alignItems: 'center',  // Vertically center the content
//                             // padding: '0 10px',     // Ensure padding is consistent
//                             // borderRadius: '6px',
//                             // width: '100%',
//                             // boxSizing: 'border-box',
//                             // position: 'relative',  // Ensure positioning doesn't cause layout issues
//                           }),

//                           valueContainer: (provided) => ({
//                             ...provided,
//                             // display: 'flex',
//                             alignItems: 'center',  // Vertically center the text
//                             padding: '0 8px',
//                             height: '100%',
//                             whiteSpace: 'nowrap',
//                             textOverflow: 'ellipsis',
//                             lineHeight: '28px',
//                             maxWidth: 'calc(100% - 20px)',
//                             position: 'relative',
//                             overflow: 'visible',
//                           }),

//                           input: (provided) => ({
//                             ...provided,
//                             width: '100%',
//                             overflow: 'hidden',
//                             textOverflow: 'ellipsis',
//                             whiteSpace: 'nowrap',
//                             outline: 'none', // Avoid outline clashes
//                           }),

//                           singleValue: (provided) => ({
//                             ...provided,
//                             lineHeight: '32px',
//                             overflow: 'hidden',
//                             whiteSpace: 'nowrap',
//                             textOverflow: 'ellipsis',
//                           }),

//                           clearIndicator: (provided) => ({
//                             ...provided,
//                             padding: 2,
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             position: 'absolute',
//                             right: 5,
//                             top: '50%',
//                             transform: 'translateY(-50%)', // Vertically center the clear indicator
//                           }),

//                           indicatorSeparator: () => ({
//                             display: 'none', // Remove the separator between indicators
//                           }),

//                           dropdownIndicator: () => ({
//                             display: 'none', // Remove the dropdown arrow
//                           }),

//                           placeholder: (provided) => ({
//                             ...provided,
//                             lineHeight: '32px',
//                             color: 'gray',
//                           }),
//                         }}
//                       />

//                     </FormGroup>
//                   </td>


//                   <td>
//                     <FormGroup>
//                       <CreatableSelect
//                         value={selectedPod[index]}
//                         onChange={(selectedOption) => handlePodSelect(selectedOption, 'pod', index)}
//                         options={podData}
//                         placeholder="Select POD"
//                         onInputChange={(inputValue, { action }) => {
//                           if (action === 'input-change') {
//                             searchPortData(inputValue, 'pod');
//                           }
//                         }}
//                         onCreateOption={(inputValue) => {
//                           const maxLength = 50;
//                           const truncatedInputValue = inputValue.slice(0, maxLength);
//                           handleCreationSelectPod(truncatedInputValue, 'pod', index)
//                         }}
//                         isClearable
//                         id="pod"
//                         name='pod'
//                         className={`inputwidthTuka ${validationErrors[index]?.pod ? 'error-border' : ''}`}
//                         menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
//                         menuPosition="fixed" // Sets the dropdown menu position to fixed    
//                         menuPlacement="top"
//                         styles={{
//                           control: (provided, state) => ({
//                             ...provided,
//                             height: 32,  // Set the height of the select input
//                             minHeight: 32,
//                             border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
//                             // display: 'flex',
//                             // alignItems: 'center',  // Vertically center the content
//                             // padding: '0 10px',     // Ensure padding is consistent
//                             // borderRadius: '6px',
//                             // width: '100%',
//                             // boxSizing: 'border-box',
//                             // position: 'relative',  // Ensure positioning doesn't cause layout issues
//                           }),

//                           valueContainer: (provided) => ({
//                             ...provided,
//                             // display: 'flex',
//                             alignItems: 'center',  // Vertically center the text
//                             padding: '0 8px',
//                             height: '100%',
//                             whiteSpace: 'nowrap',
//                             textOverflow: 'ellipsis',
//                             lineHeight: '28px',
//                             maxWidth: 'calc(100% - 20px)',
//                             position: 'relative',
//                             overflow: 'visible',
//                           }),

//                           input: (provided) => ({
//                             ...provided,
//                             width: '100%',
//                             overflow: 'hidden',
//                             textOverflow: 'ellipsis',
//                             whiteSpace: 'nowrap',
//                             outline: 'none', // Avoid outline clashes
//                           }),

//                           singleValue: (provided) => ({
//                             ...provided,
//                             lineHeight: '32px',
//                             overflow: 'hidden',
//                             whiteSpace: 'nowrap',
//                             textOverflow: 'ellipsis',
//                           }),

//                           clearIndicator: (provided) => ({
//                             ...provided,
//                             padding: 2,
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             position: 'absolute',
//                             right: 5,
//                             top: '50%',
//                             transform: 'translateY(-50%)', // Vertically center the clear indicator
//                           }),

//                           indicatorSeparator: () => ({
//                             display: 'none', // Remove the separator between indicators
//                           }),

//                           dropdownIndicator: () => ({
//                             display: 'none', // Remove the dropdown arrow
//                           }),

//                           placeholder: (provided) => ({
//                             ...provided,
//                             lineHeight: '32px',
//                             color: 'gray',
//                           }),
//                         }}
//                       />

//                     </FormGroup>
//                   </td>




//                   {/* <td>
//                     <FormGroup>
//                       <Input
//                         type="text"
//                         className={`inputwidthTuka form-control ${validationErrors[index]?.pol ? 'error-border' : ''}`}
//                         maxLength={15}
//                         onChange={(e) => handleFieldChange(e, index, 'pol', '')}
//                         value={cargoEntry.pol}
//                       />
//                     </FormGroup>
//                   </td>

//                   <td>
//                     <FormGroup>
//                       <Input
//                         type="text"
//                         className={`inputwidthTuka form-control ${validationErrors[index]?.pod ? 'error-border' : ''}`}
//                         maxLength={15}
//                         onChange={(e) => handleFieldChange(e, index, 'pod', '')}
//                         value={cargoEntry.pod}
//                       />
//                     </FormGroup>
//                   </td> */}



//                   <td>
//                     <FormGroup>
//                       <Input
//                         type="text"
//                         className={`inputwidthTuka form-control ${validationErrors[index]?.shippingAgentName ? 'error-border' : ''}`}
//                         readOnly
//                         id="service"
//                         tabIndex={-1}
//                         value={cargoEntry.shippingAgentName}
//                       />
//                     </FormGroup>
//                   </td>



//                   <td>
//                     <FormGroup>
//                       <Input
//                         type="text"
//                         className={`inputwidthTuka form-control ${validationErrors[index]?.shippingLineName ? 'error-border' : ''}`}
//                         readOnly
//                         id="service"
//                         tabIndex={-1}
//                         value={cargoEntry.shippingLineName}
//                       />
//                     </FormGroup>
//                   </td>







//                   <td>
//                     <FormGroup>
//                       <CreatableSelect
//                         value={selectedViaNo[index]}
//                         onChange={(selectedOption) => handleVoyageSelect(selectedOption, 'viaNo', index)}
//                         options={vesselData}
//                         placeholder="Select Via No"
//                         onInputChange={(inputValue, { action }) => {
//                           if (action === 'input-change') {
//                             searchVoyageAndVia(inputValue);
//                           }
//                         }}
//                         onCreateOption={(inputValue) => { handleCreationSelect(inputValue, 'viaNo', index) }}
//                         isClearable
//                         id="viaNo"
//                         name='viaNo'
//                         className={`inputwidthTuka ${validationErrors.some(error => error.hasOwnProperty('viaNo')) ? 'error-border' : ''}`}

//                         menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
//                         menuPosition="fixed" // Sets the dropdown menu position to fixed    
//                         menuPlacement="top"
//                         styles={{
//                           control: (provided, state) => ({
//                             ...provided,
//                             height: 32, // Set height
//                             minHeight: 32, // Set minimum height
//                             border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
//                             boxShadow: "none",
//                             display: 'flex',
//                             alignItems: 'center', // Align items vertically
//                             padding: 0, // Remove padding to control height
//                             "&:hover": {
//                               border: "1px solid #ccc",
//                             },
//                             borderRadius: '6px', // Add border radius
//                             "&:hover": {
//                               border: "1px solid #ccc",
//                             },
//                           }),

//                           valueContainer: (provided) => ({
//                             ...provided,
//                             height: '100%', // Full height of the control
//                             display: 'flex',
//                             alignItems: 'center', // Align items vertically
//                             padding: '0 0.75rem', // Match padding
//                           }),
//                           singleValue: (provided) => ({
//                             ...provided,
//                             lineHeight: '32px', // Center text vertically
//                           }),
//                           indicatorSeparator: () => ({
//                             display: "none",
//                           }),
//                           dropdownIndicator: () => ({
//                             display: "none",
//                           }),
//                           placeholder: (provided) => ({
//                             ...provided,
//                             lineHeight: '32px', // Center placeholder text vertically
//                             color: "gray",
//                           }),
//                           clearIndicator: (provided) => ({
//                             ...provided,
//                             padding: 2, // Remove padding
//                             display: 'flex',
//                             alignItems: 'center', // Align clear indicator vertically
//                           }),
//                         }}
//                       />

//                     </FormGroup>
//                   </td>



//                   <td>
//                     <FormGroup>

//                       <CreatableSelect
//                         value={selectedVoyageNo[index]}
//                         // value={{ value: lastEntry.voyageNo, label: lastEntry.voyageNo }}
//                         onChange={(selectedOption) => handleVoyageSelect(selectedOption, 'voyageNo', index)}
//                         // onInputChange={searchVoyageAndVia}

//                         onInputChange={(inputValue, { action }) => {
//                           if (action === 'input-change') {
//                             searchVoyageAndVia(inputValue);
//                           }
//                         }}
//                         options={vesselData}
//                         onCreateOption={(inputValue) => { handleCreationSelect(inputValue, 'voyageNo', index) }}
//                         placeholder="Select Voyage No"
//                         isClearable
//                         id="voyageNo"
//                         name='voyageNo'
//                         menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
//                         menuPosition="fixed" // Sets the dropdown menu position to fixed    
//                         menuPlacement="top"
//                         className={`inputwidthTuka ${validationErrors.some(error => error.hasOwnProperty('voyageNo')) ? 'error-border' : ''}`}
//                         styles={{
//                           control: (provided, state) => ({
//                             ...provided,
//                             height: 32, // Set height
//                             minHeight: 32, // Set minimum height
//                             border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
//                             boxShadow: "none",
//                             display: 'flex',
//                             alignItems: 'center', // Align items vertically
//                             padding: 0, // Remove padding to control height
//                             "&:hover": {
//                               border: "1px solid #ccc",
//                             },
//                             borderRadius: '6px', // Add border radius
//                             "&:hover": {
//                               border: "1px solid #ccc",
//                             },
//                           }),
//                           valueContainer: (provided) => ({
//                             ...provided,
//                             height: '100%', // Full height of the control
//                             display: 'flex',
//                             alignItems: 'center', // Align items vertically
//                             padding: '0 0.75rem', // Match padding
//                           }),
//                           singleValue: (provided) => ({
//                             ...provided,
//                             lineHeight: '32px', // Center text vertically
//                           }),
//                           indicatorSeparator: () => ({
//                             display: "none",
//                           }),
//                           dropdownIndicator: () => ({
//                             display: "none",
//                           }),
//                           placeholder: (provided) => ({
//                             ...provided,
//                             lineHeight: '32px', // Center placeholder text vertically
//                             color: "gray",
//                           }),
//                           clearIndicator: (provided) => ({
//                             ...provided,
//                             padding: 2, // Remove padding
//                             display: 'flex',
//                             alignItems: 'center', // Align clear indicator vertically
//                           }),
//                         }}
//                       />




//                     </FormGroup>
//                   </td>


//                   <td>
//                     <FormGroup>
//                       <Input
//                         type="text"
//                         value={cargoEntry.vesselName}
//                         className={`inputwidthTukaMax form-control`}
//                         readOnly
//                         id="service"
//                         tabIndex={-1}
//                       />
//                     </FormGroup>
//                   </td>

//                   <td>
//                     <FormGroup>
//                       <Input
//                         type="text"
//                         value={cargoEntry.grossWeight}
//                         className={`inputwidthTukaMin form-control`}
//                         readOnly
//                         id="service"
//                         tabIndex={-1}
//                       />
//                     </FormGroup>
//                   </td>





//                   <td>
//                     <FormGroup>
//                       <Input
//                         type="select"
//                         value={cargoEntry.typeOfContainer}
//                         className={`inputwidthTukaMax form-control ${validationErrors[index]?.typeOfContainer ? 'error-border' : ''}`}
//                         onChange={(e) => handleFieldChange(e, index, 'typeOfContainer')}
//                       >
//                         <option value="General">General</option>
//                         {containerTypes.map((type, idx) => (
//                           <option key={idx} value={type.label}>
//                             {type.label}
//                           </option>
//                         ))}
//                       </Input>
//                     </FormGroup>
//                   </td>


//                   <td onKeyDown={(event) => handleKeyDown(event, index, 'movementReqDate', cargoEntry.containerNo)} tabIndex={0}>
//                     <DatePicker
//                       selected={cargoEntry.movementReqDate}
//                       onChange={(date) => handlePaymentDateChange(date, index, 'movementReqDate', cargoEntry.containerNo)}
//                       name="movementReqDate"
//                       placeholderText="MovementReq Date"
//                       value={cargoEntry.movementReqDate}
//                       dateFormat="dd/MM/yyyy HH:mm"
//                       showTimeInput
//                       timeFormat="HH:mm"
//                       timeIntervals={15}
//                       // customInput={<CustomInput className={`inputwidthTukaMax form-control`} />}
//                       customInput={<CustomInput className={`inputwidthTukaMax form-control ${validationErrors[index]?.movementReqDate ? 'error-border' : ''}`}
//                       // onKeyDown={(event) => handleKeyDown(event, index, 'movementReqDate', cargoEntry.containerNo)} 
//                       />
//                       }
//                     // className={`inputwidthTukaMax form-control ${validationErrors[index]?.movementReqDate ? 'error-border' : ''}`}                     
//                     />
//                   </td>


//                   <td>
//                     <DatePicker
//                       selected={cargoEntry.forceEntryDate}
//                       // onChange={(date) => handlePaymentDateChange(date, index, 'forceEntryDate', cargoEntry.containerNo)}
//                       id="service"
//                       disabled
//                       name="sbDate"
//                       placeholderText="Sb Date"
//                       dateFormat="dd/MM/yyyy HH:mm"
//                       showTimeInput
//                       timeFormat="HH:mm"
//                       timeIntervals={15}
//                       customInput={<CustomInput className={`inputwidthTukaMax form-control`} />}
//                       className={`inputwidthTukaMax form-control ${validationErrors[index]?.forceEntryDate ? 'error-border' : ''}`}
//                       tabIndex={-1}
//                     />

//                   </td>



//                   <td>
//                     <FormGroup>
//                       <Input
//                         type="checkbox"
//                         maxLength={15}
//                         onChange={(e) => handleFieldChange(e, index, 'forceEntryFlag')}
//                         checked={cargoEntry.forceEntryFlag === 'Y'} // Check if forceEntryFlag is 'Y'
//                         style={{ width: '24px', height: '28px', cursor: 'pointer', margin: '0' }}
//                       />
//                     </FormGroup>
//                   </td>



//                   <td>
//                     <FormGroup>
//                       <Input
//                         type="text"
//                         className={`inputwidthTuka form-control ${validationErrors[index]?.forceEntryApproval ? 'error-border' : ''}`}
//                         maxLength={50}
//                         onChange={(e) => handleFieldChange(e, index, 'forceEntryApproval', '')}
//                         value={cargoEntry.forceEntryApproval}
//                       />
//                     </FormGroup>
//                   </td>

//                   <td>
//                     <FormGroup>
//                       <textarea
//                         className={`inputwidthTukaMax form-control`}
//                         id="remarks"
//                         name='forceEntryRemarks'
//                         onChange={(e) => handleFieldChange(e, index, 'forceEntryRemarks', '')}
//                         value={cargoEntry.forceEntryRemarks}
//                         maxLength={250}
//                         rows={2}
//                       ></textarea>
//                     </FormGroup>
//                   </td>

//                   <td>
//                     {cargoEntry.status === 'A' ? 'Approved' : ''}
//                   </td>

//                   {index > 0 && index === ExportMovement.length - 1 && (!cargoEntry.movementReqId || cargoEntry.movementReqId.trim() === '') && (
//                     <td>
//                       <FontAwesomeIcon
//                         icon={faTimesCircle}
//                         onClick={() => handleRemoveRow(index)}
//                         style={{ color: 'red', cursor: 'pointer', fontSize: '24px' }}
//                       />
//                     </td>
//                   )}


//                 </tr>
//               ))}
//             </tbody>

//           </Table>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ExportMovement;






import AuthContext from "../Components/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
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
  faPassport,
  faChartLine,
  faHandshakeAngle,
  faHandshake,
  faTruckRampBox,
  faTruck,
  faWorm,
  faCircleInfo,
  faRemoveFormat,
  faShippingFast,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/style.css";
import "../Components/Style.css";
import { Button } from "react-bootstrap";
import useAxios from "../Components/useAxios";
import cfsService from "../service/CFSService";
import movementService from "../service/MovementService";
import { toast } from "react-toastify";
import moment from "moment";

function ExportMovement({ searchData, resetFlag, updatePagesList }) {


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
  const MovementService = new movementService(axiosInstance);

  const [profitcentre, setProfitcentre] = useState({
    profitcentreId: '',
    profitcentreDesc: ''
  });

  const getProgitCenterById = async (profitCenterId) => {
    try {
      const response = await CFSService.getProgitCenterById(companyid, branchId, profitCenterId, jwtToken);
      setProfitcentre(response.data);
      setExportMovement(prevState =>
        prevState.map(item => ({
          ...item,
          profitcentreId: response.data.profitcentreId
        }))
      );
    } catch (error) {
      console.error('Error fetching port data:', error);
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      await getProgitCenterById('N00004');
      await getContainerTypes('J00005');
    };
    fetchData();
  }, []);

  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const processId = 'P00238';

  const foundRights =
    role !== "ROLE_ADMIN"
      ? userRights.find((item) => item.process_Id === processId)
      : null;
  const allowCreate = foundRights?.allow_Create === "Y";
  const allowRead = foundRights?.allow_Read === "Y";
  const allowEdit = foundRights?.allow_Update === "Y";
  const allowDelete = foundRights?.allow_Delete === "Y";




  useEffect(() => {
    if (searchData && searchData.activeTab === processId && searchData.profitCenterId && searchData.movementReqId && searchData.containerNo) {
      selectMovementSearchRadio(searchData.profitCenterId, searchData.movementReqId, searchData.containerNo, "1");
    }
  }, [searchData]);
  useEffect(() => {

    if (resetFlag) {
      handleReset();
    }
  }, [resetFlag]);



  const initialExportMovement = {
    companyId: companyid,
    branchId: branchId,
    finYear: "",
    movementReqId: "",
    movementReqLineId: "",
    movementReqDate: new Date(),
    movementOrderDate: new Date(),
    stuffTallyId: "",
    movReqType: "CLP",
    stuffTallyLineId: "",
    profitcentreId: profitcentre.profitcentreId,
    stuffTallyDate: "",
    stuffId: "",
    stuffDate: "",
    sbNo: "",
    sbTransId: "",
    sbDate: "",
    shift: "Day",
    agentSealNo: "",
    vesselId: "",
    voyageNo: "",
    rotationNo: "",
    pol: "",
    pod: "",
    containerNo: "",
    containerSize: "",
    containerType: "",
    containerCondition: "",
    containerStatus: "",
    periodFrom: "",
    accSrNo: 1,
    onAccountOf: "",
    stuffRequestQty: 0,
    stuffedQty: 0,
    balanceQty: 0,
    cargoWeight: 0.0,
    totalCargoWt: 0.0,
    grossWeight: 0.0,
    tareWeight: 0.0,
    genSetRequired: "",
    haz: "",
    imoCode: "",
    item: "",
    shippingAgent: "",
    shippingLine: "",
    commodity: "",
    customsSealNo: "",
    viaNo: "",
    cartingDate: "",
    icdHub: "",
    exporterName: "",
    consignee: "",
    fob: 0.0,
    coverDetails: "",
    coverDate: "",
    holdingAgent: "",
    holdingAgentName: "",
    holdDate: "",
    releaseDate: "",
    holdRemarks: "",
    clpStatus: "",
    clpCreatedBy: "",
    clpCreatedDate: "",
    clpApprovedBy: "",
    clpApprovedDate: "",
    gatePassNo: "",
    addServices: "N",
    typeOfContainer: "General",
    gateOutId: "",
    gateOutDate: "",
    impSrNo: 1,
    importerId: "",
    billingParty: " ",
    igst: "N",
    cgst: "N",
    sgst: "N",
    status: "",
    comments: '',
    createdBy: "",
    createdDate: new Date(),
    editedBy: '',
    editedDate: new Date(),
    approvedBy: '',
    approvedDate: new Date(),
    currentLocation: '',
    othPartyId: "",
    invoiceAssessed: "N",
    assessmentId: "",
    invoiceNo: "",
    invoiceDate: null,
    creditType: "N",
    invoiceCategory: " ",
    billAmt: 0.0,
    invoiceAmt: 0.0,
    forceEntryFlag: "N",
    forceEntryDate: null,
    forceEntryApproval: '',
    forceEntryRemarks: '',
    sSRTransId: "",
    forceEntryFlagInv: "N",
    trailerType: "",
    shippingLineName: "",
    shippingAgentName: "",
    vesselName: "",
    gateInId: '',
  };


  const [ExportMovement, setExportMovement] = useState([initialExportMovement]);
  const [preExportMovement, setPreExportMovement] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);
  const [currentPageMovementSearch, setCurrentPageMovementSearch] = useState(1);
  const [containerData, setContainerData] = useState([]);
  const [selectedContainerNos, setSelectedContainerNos] = useState([]);


  const lastEntryWithId = ExportMovement.slice().reverse().find(entry => entry.movementReqId && entry.movementReqId.trim().length > 0);
  // If found, use it as lastEntry; otherwise, use the last entry in the array
  const lastEntry = lastEntryWithId || ExportMovement[ExportMovement.length - 1];

  const [isModalOpenForMovementSearch, setIsModalOpenForMovementSearch] = useState(false);
  const [searchMovementvalues, setSearchMovementvalues] = useState('');
  const [movementSearchData, setMovementSearchData] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);


  // vessel data

  const [vesselData, setVesselData] = useState([]);
  const [selectedViaNo, setSelectedViaNo] = useState([]);
  const [selectedVoyageNo, setSelectedVoyageNo] = useState([]);



  const [containerTypes, setContainerTypes] = useState([]);




  const getContainerTypes = async (jarId) => {
    const cargoType = await getjarByJarId(jarId);
    if (cargoType && Array.isArray(cargoType) && cargoType.length > 0) {
      setContainerTypes(cargoType);
    } else {
      setContainerTypes([]);
    }
  };


  const getjarByJarId = async (jarId) => {
    try {
      const response = await CFSService.getJarDetailSelect(companyid, jarId, jwtToken);
      return response.data;
    } catch (error) {
      console.error('Error fetching port data:', error);
    }
  };




  // PAGINATION FOR SELECT EXPORTER
  const [itemsPerPage] = useState(5);

  const indexOfLastItemCartingSearch = currentPageMovementSearch * itemsPerPage;
  const indexOfFirstItemCartingSearch = indexOfLastItemCartingSearch - itemsPerPage;
  const currentItemsMovementSearch = movementSearchData.slice(indexOfFirstItemCartingSearch, indexOfLastItemCartingSearch);
  const totalPagesCartingSearch = Math.ceil(movementSearchData.length / itemsPerPage);

  // Function to handle page change
  const handlePageChangeCarting = (page) => {
    if (page >= 1 && page <= totalPagesCartingSearch) {
      setCurrentPageMovementSearch(page);
    }
  };


  const displayPagesMovement = () => {
    const centerPageCount = 5;
    const middlePage = Math.floor(centerPageCount / 2);
    let startPage = currentPageMovementSearch - middlePage;
    let endPage = currentPageMovementSearch + middlePage;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPagesCartingSearch, centerPageCount);
    }

    if (endPage > totalPagesCartingSearch) {
      endPage = totalPagesCartingSearch;
      startPage = Math.max(1, totalPagesCartingSearch - centerPageCount + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };







  const handleOpenMovementSearch = async () => {
    setIsModalOpenForMovementSearch(true);
    setSearchMovementvalues('');
    searchMovementSearch();
  };

  const searchMovementSearch = async (searchvalue) => {
    setCurrentPageMovementSearch(1);
    setLoading(true);
    try {
      const response = await MovementService.getMovementEntriesToSelect(companyid, branchId, searchvalue, jwtToken);
      setMovementSearchData(response.data);
    } catch (error) {
      console.error("Error fetching SB entries:", error);
    } finally {
      setLoading(false);
    }
  };



  const handleCloseMovementSearch = (val) => {
    setIsModalOpenForMovementSearch(false);
    setSearchMovementvalues('');
    setMovementSearchData([]);
  }


  const clearMovementSearch = (val) => {
    setSearchMovementvalues('');
    setMovementSearchData([]);
  }

  const selectMovementSearchRadio = async (profitcentreId, movementReqId, ContainerNo, lineId) => {


    // // console.log('selectMovementSearchRadio \n', profitcentreId, movementReqId, ContainerNo, shippingAgent, shippingLine, lineId);

    await getSelectedMovementSearch(profitcentreId, movementReqId, ContainerNo, lineId);
    handleCloseMovementSearch();
  }


  const getSelectedMovementSearch = async (profitcentreId, movementReqId, ContainerNo, lineId) => {

    // // console.log(profitcentreId, movementReqId, ContainerNo, lineId);

    setValidationErrors([]);
    setLoading(true);
    try {
      const response = await MovementService.getSelectedMovementEntry(companyid, branchId, movementReqId, lineId, ContainerNo, profitcentreId, jwtToken);

      const initialSelectedContainerNos = response.data.map(entry => ({
        label: entry.containerNo,
        value: entry.containerNo,
      }));
      // Set the transformed data into the state
      setSelectedContainerNos(initialSelectedContainerNos);


      const initialSelectedViaNoNos = response.data.map(entry => ({
        label: entry.viaNo,
        value: entry.viaNo,
      }));
      // Set the transformed data into the state
      setSelectedViaNo(initialSelectedViaNoNos);


      const initialSelectedVoyageNos = response.data.map(entry => ({
        label: entry.voyageNo,
        value: entry.voyageNo,
      }));
      // Set the transformed data into the state
      setSelectedVoyageNo(initialSelectedVoyageNos);




      const initialPods = response.data.map(entry => ({
        label: entry.pod,
        value: entry.pod,
      }));
      // Set the transformed data into the state
      setSelectedPod(initialPods);


      const initialPols = response.data.map(entry => ({
        label: entry.pol,
        value: entry.pol,
      }));
      // Set the transformed data into the state
      setSelectedPol(initialPols);







      setExportMovement(response.data);
    } catch (error) {
      console.error("Error fetching SB entries:", error);
    } finally {
      setLoading(false);
    }
  };




  const handleHeaderChange = (fieldName, value) => {
    // Update exportStuffRequest state
    setExportMovement(prevRequest =>
      prevRequest.map(item => ({
        ...item,
        [fieldName]: value
      }))
    );
    // Update validationErrors state
    setValidationErrors(prevErrors =>
      prevErrors.map(error => {
        const updatedError = { ...error }; // Copy the error object
        delete updatedError[fieldName]; // Remove the specific field error
        return updatedError; // Return the updated error object
      })
    );
  };









  const validateExportMovement = (exportStuffRequest) => {
    let errors = [];

    exportStuffRequest.forEach((detail, index) => {
      const { sbNo, movReqType, containerNo, viaNo, voyageNo, vesselName, grossWeight, typeOfContainer, movementOrderDate, movementReqDate, pod } = detail;
      let error = {};
      // // console.log('vesselName ', vesselName);

      if (!vesselName) { error.vesselName = 'VesselName is required'; }
      if (!viaNo) error.viaNo = 'ViaNo is required.';
      if (!voyageNo) error.voyageNo = 'VoyageNo is required.';
      if (!movReqType) error.movReqType = 'MovReqType is required.';
      if (!containerNo) error.containerNo = 'ContainerNo is required.';
      if (!grossWeight) error.grossWeight = 'GrossWeight is required.';
      if (!sbNo) error.sbNo = 'SbNo is required.';


      if (!typeOfContainer) error.typeOfContainer = 'TypeOfContainer is required.';
      if (!movementOrderDate) error.movementOrderDate = 'MovementOrderDate is required.';
      if (!movementReqDate) error.movementReqDate = 'MovementReqDate is required.';
      if (!pod) error.pod = 'Pod is required.';

      if (!movementOrderDate || new Date(movementOrderDate).toString() === 'Invalid Date') {
        error.movementOrderDate = 'MovementReqDate is required.';
      }

      if (!movementReqDate || new Date(movementReqDate).toString() === 'Invalid Date') {
        error.movementReqDate = 'MovementOrderDate is required.';
      }

      errors.push(error);
    });
    setValidationErrors(errors);
    return errors.every(error => Object.keys(error).length === 0);
  };






  // ContainerWise Stuffing request
  const handleContainerNoSearch = async (searchValue, movementType) => {
    if (!searchValue) {
      setContainerData([]);
      return;
    }
    try {
      const response = await MovementService.searchContainerNoForMovementWork(companyid, branchId, searchValue, profitcentre.profitcentreId, movementType, jwtToken);
      const data = response.data;

      setContainerData(data);
    } catch (error) {
      setContainerData([]);
      console.error('Error searching ContainerData:', error);
    }
  };



  const handleContainerNoSelect = (selectedOption, index) => {
    // Update selectedSbNos
    const updatedSbNos = [...selectedContainerNos];
    updatedSbNos[index] = selectedOption; // Set the selected option for the specific index
    setSelectedContainerNos(updatedSbNos); // Update the state

    setExportMovement((prevContainer) => {
      const newContainer = [...prevContainer];
      const firstRecordWithMovementReqId = prevContainer.find(record => record.movementReqId);


      // Clear validation errors for this index
      const updatedValidationErrors = [...validationErrors];
      updatedValidationErrors[index] = {}; // Clear errors for the current index
      setValidationErrors(updatedValidationErrors);

      if (!selectedOption) {
        // If selectedOption is null, clear all values at the index
        newContainer[index] = {
          ...newContainer[index],
          sbNo: '',
          sbDate: '',
          containerNo: '',
          containerSize: '',
          containerType: '',
          shippingAgentName: '',
          shippingAgent: '',
          shippingLine: '',
          shippingLineName: '',
          onAccountOf: '',
          viaNo: '',
          voyageNo: '',
          vesselId: '',
          vesselName: '',
          stuffTallyId: '',
          gateInId: '',
          agentSealNo: '',
          customsSealNo: '',
          grossWeight: '',
          pod: '',
          pol: '',
          stuffId: '',
          stuffDate: null,
          stuffTallyLineId: '',
          stuffTallyDate: null
        };

      } else {
        // Extract values from the selected option
        const {
          sbNo,
          sbDate,
          containerNo,
          containerSize,
          containerType,
          shippingAgentName,
          shippingAgent,
          shippingLine,
          shippingLineName,
          onAccountOf,
          viaNo,
          voyageNo,
          vesselId,
          vesselName,
          stuffTallyId,
          gateInId,
          agentSealNo,
          customsSealNo,
          grossWeight,
          pod,
          pol,
          stuffId,
          stuffDate,
          stuffTallyLineId,
          stuffTallyDate,
        } = selectedOption;

        // Update the specific index with the new values
        newContainer[index] = {
          ...newContainer[index],
          sbNo: sbNo,
          sbDate: sbDate,
          containerNo: containerNo,
          containerSize: containerSize,
          containerType: containerType,
          shippingAgentName: shippingAgentName,
          shippingAgent: shippingAgent,
          shippingLine: shippingLine,
          shippingLineName: shippingLineName,
          onAccountOf: onAccountOf,
          viaNo: viaNo,
          voyageNo: voyageNo,
          vesselId: vesselId,
          vesselName: vesselName,
          stuffTallyId: stuffTallyId,
          gateInId: gateInId,
          agentSealNo: agentSealNo,
          customsSealNo: customsSealNo,
          grossWeight: grossWeight,
          pod: pod,
          pol: pol,
          stuffId: stuffId,
          stuffDate: stuffDate,
          stuffTallyLineId: stuffTallyLineId,
          stuffTallyDate: stuffTallyDate,
          movementOrderDate: firstRecordWithMovementReqId ? firstRecordWithMovementReqId.movementOrderDate : new Date()
        };
      }

      return newContainer; // Return the updated container
    });


    // Update selectedViaNo and selectedVoyageNo for the current index
    const updatedViaNo = [...selectedViaNo];
    updatedViaNo[index] = selectedOption?.viaNo ? { value: selectedOption.viaNo, label: selectedOption.viaNo } : null;
    setSelectedViaNo(updatedViaNo); // Update viaNo

    const updatedVoyageNo = [...selectedVoyageNo];
    updatedVoyageNo[index] = selectedOption?.voyageNo ? { value: selectedOption.voyageNo, label: selectedOption.voyageNo } : null;
    setSelectedVoyageNo(updatedVoyageNo); // Update voyageNo

    const updatedPol = [...selectedPol];
    updatedPol[index] = selectedOption?.pol ? { value: selectedOption.pol, label: selectedOption.pol } : null;
    setSelectedPol(updatedPol); // Update viaNo

    const updatedPod = [...selectedPod];
    updatedPod[index] = selectedOption?.pod ? { value: selectedOption.pod, label: selectedOption.pod } : null;
    setSelectedPod(updatedPod); // Update voyageNo

    // Optionally, clear sbNos if needed
    setContainerData([]); // Clear the sbNos if that is intended
  };







  const handlePaymentDateChange = (date, index, name, containerNo) => {
    setExportMovement(prevState => {
      const updatedTransDtl = prevState.map(item => {
        // Only update the item if its containerNo matches the provided containerNo
        if (item.containerNo === containerNo) {
          return {
            ...item,
            [name]: date
          };
        }
        return item; // Return other items as they are
      });
      return updatedTransDtl;
    });
    // Clear the validation error for the specified field
    setValidationErrors(prevErrors => {
      const updatedErrors = [...prevErrors];
      if (updatedErrors[index]) {
        delete updatedErrors[index][name];  // Corrected deletion syntax
      }
      return updatedErrors;
    });
  };


  const handleKeyDown = (event, index, fieldName, containerNo) => {

    if (event.key === 'Enter') {


      handlePaymentDateChange(new Date(), index, fieldName, containerNo);
    }
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
        id={id}
        style={{ width: '100%' }} // Adjust as needed
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



  const searchVoyageAndVia = async (searchValue) => {
    // // console.log('searchValue ', searchValue);
    if (!searchValue) {
      setVesselData([]);
      return;
    }
    try {
      const response = await CFSService.searchVessel(companyid, branchId, searchValue, jwtToken);
      const data = response.data;

      // // console.log('searchVoyageAndVia ', data);

      setVesselData(data);
    } catch (error) {
      setVesselData([]);
      console.error('Error searching vessel:', error);
    }
  };


  const handleVoyageSelect = async (selectedOption, fieldName, index) => {
    // Update selected values for viaNo and voyageNo index-wise
    setSelectedViaNo(prevState => {
      const updatedState = [...prevState];
      updatedState[index] = selectedOption ? { value: selectedOption.viaNo, label: selectedOption.viaNo } : null;
      return updatedState;
    });

    setSelectedVoyageNo(prevState => {
      const updatedState = [...prevState];
      updatedState[index] = selectedOption ? { value: selectedOption.voyageNo, label: selectedOption.voyageNo } : null;
      return updatedState;
    });

    // Prepare updates based on selected option
    const updates = selectedOption
      ? {
        vesselId: selectedOption.value,
        voyageNo: selectedOption.voyageNo,
        viaNo: selectedOption.viaNo,
        vesselName: selectedOption.vesselName,
        rotationDate: selectedOption.rotationDate,
        gateOpenDate: new Date(selectedOption.gateOpenDate),
        berthingDate: new Date(selectedOption.berthDate),
        rotationNo: selectedOption.rotationNo,
      }
      : { vesselId: '', voyageNo: '', viaNo: '', vesselName: '', rotationDate: null, gateOpenDate: null, berthingDate: null, rotationNo: '' };

    // Update exportMovement at the specified index
    setExportMovement(prevState => {
      return prevState.map((item, idx) => {
        if (idx === index) {
          return { ...item, ...updates }; // Update the specific index
        }
        return item; // Return other items unchanged
      });
    });

    // Update validationErrors state for the specific index
    setValidationErrors(prevErrors => {
      return prevErrors.map((error, idx) => {
        if (idx === index) {
          const updatedError = { ...error }; // Copy the error object

          // Remove specific field errors
          delete updatedError.voyageNo;
          delete updatedError.viaNo;
          delete updatedError.vesselName;

          return updatedError; // Return the updated error object
        }
        return error; // Return other errors unchanged
      });
    });
  };



  const handleCreationSelect = async (inputValue, fieldName, index) => {
    const updates = { [fieldName]: inputValue }; // Dynamically set the field name

    if (fieldName === 'viaNo') {
      setSelectedViaNo(prevState => {
        const updatedState = [...prevState];
        updatedState[index] = { value: inputValue, label: inputValue };
        return updatedState;
      });
    } else if (fieldName === 'voyageNo') {
      setSelectedVoyageNo(prevState => {
        const updatedState = [...prevState];
        updatedState[index] = { value: inputValue, label: inputValue };
        return updatedState;
      });
    }

    // Update exportMovement at the specified index
    setExportMovement(prevState =>
      prevState.map((item, idx) => {
        if (idx === index) {
          return { ...item, ...updates }; // Update only the specified index
        }
        return item; // Leave other items unchanged
      })
    );

    // Update validationErrors state for the specified index
    setValidationErrors(prevErrors =>
      prevErrors.map((error, idx) => {
        if (idx === index) {
          const updatedError = { ...error };
          delete updatedError[fieldName]; // Remove validation error for the specific field
          return updatedError; // Return the updated error
        }
        return error; // Leave other errors unchanged
      })
    );
  };












  // // console.log('export Movement : ', ExportMovement);

  // // console.log('validation Erors: ', validationErrors);






  const handleSave = async (exportStuffRequest) => {
    if (!Array.isArray(exportStuffRequest) || exportStuffRequest.length === 0) {
      toast.warning('please select container!', {
        position: 'top-center',
        autoClose: 700,
      });
      return;
    }

    // // console.log('container Export : \n', ExportMovement);

    if (!validateExportMovement(exportStuffRequest)) {
      toast.warning('Please enter required fields!', {
        position: 'top-center',
        autoClose: 1000,
      });
      // // console.log('validationErrorsContainer : \n', validationErrors);
      return false;
    }
    setLoading(true);
    try {
      const response = await MovementService.saveExportMovement(companyid, branchId, userId, exportStuffRequest, jwtToken);

      setExportMovement(response.data);
      // setPreExportMovement(response.data);

      if (searchData && (searchData.sbNo || searchData.container)
      ) {
        updatePagesList("P00238");
      }

      // // console.log('saveExportMovement : \n', response.data);
      toast.success('Data added Successfully!', {
        position: 'top-center',
        autoClose: 700,
      });


      return { success: true, cargoGateIns: response.data };
    } catch (error) {

      if (error.response && error.response.status === 400) { // Check if error response exists
        const errorMessage = error.response.data;


        // Extract SrNo and sbNo from the error message for targeted validation
        const match = errorMessage.match(/SrNo: (\d+) and Container No: (\d+)/);
        if (match) {


          const srNo = parseInt(match[1], 10);
          const sbNo = match[2];

          const errorMessageNew = `Duplicate Container No found for SrNo: <strong>${srNo}</strong> and Container No: <strong>${sbNo}</strong>`;
          const contentWidth = errorMessageNew.length * 6;

          toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessageNew }} />, {
            position: 'top-center',
            autoClose: 3000,
            style: { width: `${contentWidth}px` },
          });

          // Find the index of the cargo entry based on SrNo
          const errorIndex = ExportMovement.findIndex(entry => entry.stuffReqLineId === srNo);
          if (errorIndex !== -1) {
            const newErrors = [...validationErrors];
            newErrors[errorIndex] = { ...newErrors[errorIndex], sbNo: `Duplicate SB No: ${sbNo}` };
            setValidationErrors(newErrors);
          }
        }
        else {
          toast.error(errorMessage, {
            position: 'top-center',
            autoClose: 3000,
          });
        }

        return { success: false, cargoEntries: null };
      }

      toast.error('Oops something went wrong!', {
        position: 'top-center',
        autoClose: 700,
      });

      return { success: false, cargoGateIns: null }; // Return false if an error occurs

    } finally {
      setLoading(false);
    }
  };



  const handleReset = async () => {
    setValidationErrors([]);
    setExportMovement([initialExportMovement]);


    const clearedContainerNos = selectedContainerNos.map(() => null);
    const clearedVias = selectedViaNo.map(() => null);
    const clearedVoyages = selectedVoyageNo.map(() => null);
    const clearedPol = selectedPol.map(() => null);
    const clearedPod = selectedPod.map(() => null);

    setSelectedPod(clearedPod);
    setSelectedPol(clearedPol);

    setSelectedContainerNos(clearedContainerNos);
    setSelectedViaNo(clearedVias);
    setSelectedVoyageNo(clearedVoyages);
  };



  const handleAddRow = async (exportStuffingRequest) => {

    // // console.log('exportStuffingRequest \n ', exportStuffingRequest);

    const { success, cargoGateIns } = await handleSave(exportStuffingRequest);
    if (!success) {
      return;
    }
    const saveRecord = cargoGateIns[0];
    // Calculate the new srNo based on the current list length
    const newSrNo = cargoGateIns.length + 1;
    // Create a new entry with the incremented srNo
    const newCargoEntry = {
      ...initialExportMovement,
      movementReqLineId: newSrNo,
      movementOrderDate: saveRecord.stuffReqDate,
      profitcenterId: saveRecord.profitcentreId,
      shift: saveRecord.shift,
      comments: saveRecord.comments,
      movementOrderDate: saveRecord.movementOrderDate
    };
    // Add the new entry to the state
    setExportMovement([...cargoGateIns, newCargoEntry]);
  };



  //   const handleFieldChange = (e, index, fieldName) => {
  //     let value;
  //     let forceEntryDate; // Do not set a default value; leave it undefined unless it's a checkbox

  //     // Check if the field is a checkbox
  //     if (e.target.type === 'checkbox') {
  //         value = e.target.checked ? 'Y' : 'N'; // 'Y' if checked, 'N' if unchecked
  //         forceEntryDate = e.target.checked ? new Date() : null; // Update forceEntryDate only for checkbox
  //     } else {
  //         value = e.target.value; // For text and other fields, use the input value
  //     }

  //     // Remove validation error for the specific field
  //     setValidationErrors(prevErrors => {
  //         const updatedErrors = [...prevErrors];
  //         if (updatedErrors[index]) {
  //             delete updatedErrors[index][fieldName];
  //         }
  //         return updatedErrors;
  //     });

  //     // Update the state
  //     setExportMovement(prevState => {
  //         const updatedTransDtl = [...prevState];
  //         updatedTransDtl[index] = {
  //             ...updatedTransDtl[index],
  //             [fieldName]: value, // Update the field with the new value
  //             ...(forceEntryDate !== undefined && { forceEntryDate }) // Update forceEntryDate only if defined
  //         };
  //         return updatedTransDtl;
  //     });
  // };


  const handleFieldChange = (e, index, fieldName) => {
    let value;
    let forceEntryDate; // Do not set a default value; leave it undefined unless it's a checkbox

    // Check if the field is a checkbox
    if (e.target.type === 'checkbox') {
      value = e.target.checked ? 'Y' : 'N'; // 'Y' if checked, 'N' if unchecked
      forceEntryDate = e.target.checked ? new Date() : null; // Update forceEntryDate only for checkbox
    } else {
      value = e.target.value; // For text and other fields, use the input value
    }

    // Remove validation error for the specific field
    setValidationErrors(prevErrors => {
      const updatedErrors = [...prevErrors];

      if (fieldName === 'movReqType') {
        // Remove specific fields from validationErrors for this index
        if (updatedErrors[index]) {
          delete updatedErrors[index]['sbNo'];
          delete updatedErrors[index]['sbDate'];
          delete updatedErrors[index]['containerNo'];
          delete updatedErrors[index]['containerSize'];
          delete updatedErrors[index]['containerType'];
          delete updatedErrors[index]['shippingAgentName'];
          delete updatedErrors[index]['shippingAgent'];
          delete updatedErrors[index]['shippingLine'];
          delete updatedErrors[index]['shippingLineName'];
          delete updatedErrors[index]['onAccountOf'];
          delete updatedErrors[index]['viaNo'];
          delete updatedErrors[index]['voyageNo'];
          delete updatedErrors[index]['vesselId'];
          delete updatedErrors[index]['vesselName'];
          delete updatedErrors[index]['stuffTallyId'];
          delete updatedErrors[index]['gateInId'];
          delete updatedErrors[index]['agentSealNo'];
          delete updatedErrors[index]['customsSealNo'];
          delete updatedErrors[index]['grossWeight'];
          delete updatedErrors[index]['pod'];
          delete updatedErrors[index]['pol'];
          delete updatedErrors[index]['stuffId'];
          delete updatedErrors[index]['stuffDate'];
          delete updatedErrors[index]['stuffTallyLineId'];
          delete updatedErrors[index]['stuffTallyDate'];
        }
      } else if (updatedErrors[index]) {
        delete updatedErrors[index][fieldName];
      }

      return updatedErrors;
    });

    if (fieldName === 'movReqType') {
      setSelectedContainerNos(prevSelected => {
        const updatedSelected = [...prevSelected];
        updatedSelected[index] = null; // Remove the selectedContainerNo for this index
        return updatedSelected;
      });

      setSelectedViaNo(prevSelected => {
        const updatedSelected = [...prevSelected];
        updatedSelected[index] = null; // Remove the selectedContainerNo for this index
        return updatedSelected;
      });

      setSelectedVoyageNo(prevSelected => {
        const updatedSelected = [...prevSelected];
        updatedSelected[index] = null; // Remove the selectedContainerNo for this index
        return updatedSelected;
      });
    }
    // Update the state
    setExportMovement(prevState => {
      const updatedTransDtl = [...prevState];

      if (fieldName === 'movReqType') {
        // Reset specific fields to their initial values for this index
        updatedTransDtl[index] = {
          ...updatedTransDtl[index],
          [fieldName]: value, // Update the field with the new value
          sbNo: '',
          sbDate: '',
          containerNo: '',
          containerSize: '',
          containerType: '',
          shippingAgentName: '',
          shippingAgent: '',
          shippingLine: '',
          shippingLineName: '',
          onAccountOf: '',
          viaNo: '',
          voyageNo: '',
          vesselId: '',
          vesselName: '',
          stuffTallyId: '',
          gateInId: '',
          agentSealNo: '',
          customsSealNo: '',
          grossWeight: '',
          pod: '',
          pol: '',
          stuffId: '',
          stuffDate: null,
          stuffTallyLineId: '',
          stuffTallyDate: null,
          forceEntryDate: null,
          forceEntryFlag: 'N',
          movementReqDate: new Date(),
          forceEntryApproval: '',
          forceEntryRemarks: '',
          typeOfContainer: 'General'

        };




      } else {
        updatedTransDtl[index] = {
          ...updatedTransDtl[index],
          [fieldName]: value, // Update the field with the new value
          ...(forceEntryDate !== undefined && { forceEntryDate }) // Update forceEntryDate only if defined
        };
      }

      return updatedTransDtl;
    });
  };







  const handleRemoveRow = (index) => {
    if (ExportMovement.length > 1) {
      setExportMovement(ExportMovement.filter((_, i) => i !== index));
    }
  };





  const searchPortData = async (searchValue, fieldName) => {
    if (!searchValue) {
      setPodData([]);
      setPolData([])
      return;
    }
    try {
      const response = await MovementService.searchPortsData(companyid, branchId, searchValue, jwtToken);
      fieldName === 'pod' ? setPodData(response.data) : setPolData(response.data);

      // console.log('port Data: ', response.data);
    } catch (error) {
      setPodData([]);
      setPolData([])
      console.error('Error searching vessel:', error);
    }
  };



  const [podData, setPodData] = useState([]);
  const [selectedPod, setSelectedPod] = useState([]);
  const [polData, setPolData] = useState([]);
  const [selectedPol, setSelectedPol] = useState([]);

  const handlePodSelect = async (selectedOption, fieldName, index) => {
    // Update selected values for viaNo and voyageNo index-wise

    if (fieldName === 'pod') {
      setSelectedPod(prevState => {
        const updatedState = [...prevState];
        updatedState[index] = selectedOption;
        return updatedState;
      });
    }
    else {
      setSelectedPol(prevState => {
        const updatedState = [...prevState];
        updatedState[index] = selectedOption;
        return updatedState;
      });
    }
    let updates = {};
    // Prepare updates based on selected option
    if (fieldName === 'pod') {
      updates = selectedOption
        ? {
          pod: selectedOption.label,
        }
        : { pod: '' };
    } else {
      updates = selectedOption
        ? {
          pol: selectedOption.label,
        }
        : { pol: '' };
    }

    // Update exportMovement at the specified index
    setExportMovement(prevState => {
      return prevState.map((item, idx) => {
        if (idx === index) {
          return { ...item, ...updates }; // Update the specific index
        }
        return item; // Return other items unchanged
      });
    });

    // Update validationErrors state for the specific index
    setValidationErrors(prevErrors => {
      return prevErrors.map((error, idx) => {
        if (idx === index) {
          const updatedError = { ...error }; // Copy the error object
          // Remove specific field errors
          delete updatedError[fieldName];
          return updatedError; // Return the updated error object
        }
        return error; // Return other errors unchanged
      });
    });
  };



  const handleCreationSelectPod = async (inputValue, fieldName, index) => {
    const updates = { [fieldName]: inputValue }; // Dynamically set the field name

    if (fieldName === 'pod') {
      setSelectedPod(prevState => {
        const updatedState = [...prevState];
        updatedState[index] = { value: inputValue, label: inputValue };
        return updatedState;
      });
    } else {
      setSelectedPol(prevState => {
        const updatedState = [...prevState];
        updatedState[index] = { value: inputValue, label: inputValue };
        return updatedState;
      });
    }


    // Update exportMovement at the specified index
    setExportMovement(prevState =>
      prevState.map((item, idx) => {
        if (idx === index) {
          return { ...item, ...updates }; // Update only the specified index
        }
        return item; // Leave other items unchanged
      })
    );

    // Update validationErrors state for the specified index
    setValidationErrors(prevErrors =>
      prevErrors.map((error, idx) => {
        if (idx === index) {
          const updatedError = { ...error };
          delete updatedError[fieldName]; // Remove validation error for the specific field
          return updatedError; // Return the updated error
        }
        return error; // Leave other errors unchanged
      })
    );
  };

console.log('exportMovement : ', ExportMovement);








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
                      Work Order Id
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="service"
                      readOnly
                      value={lastEntry.movementReqId}
                    />
                  </FormGroup>
                </Col>

                <Col md={3} className="d-flex justify-content-end" style={{ marginTop: 21 }}>
                  <button
                    className="btn btn-outline-primary btn-margin newButton"
                    style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    id="submitbtn2"
                    onClick={handleOpenMovementSearch}
                  >
                    <FontAwesomeIcon icon={faSearch} size="sm" />
                  </button>
                </Col>
              </Row>
            </Col>




            <Modal Modal isOpen={isModalOpenForMovementSearch} onClose={handleCloseMovementSearch} toggle={handleCloseMovementSearch} style={{ maxWidth: '1100px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>

              <ModalHeader toggle={handleCloseMovementSearch} style={{
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
                /> Search Movement Entries</h5>

              </ModalHeader>
              <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <label className="forlabel bold-label" htmlFor="sbRequestId">
                        Search by ContainerNo / Request Id / Via/ Voyage
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="searchCartingvalues"
                        maxLength={15}
                        name='searchCartingvalues'
                        value={searchMovementvalues}
                        onChange={(e) => setSearchMovementvalues(e.target.value)}
                      />

                    </FormGroup>
                  </Col>
                  <Col md={6} style={{ marginTop: 24 }}>
                    <button
                      className="btn btn-outline-primary btn-margin newButton"
                      style={{ marginRight: 10, fontWeight: 'bold' }}
                      id="submitbtn2"
                      onClick={() => searchMovementSearch(searchMovementvalues)}
                    >
                      <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                      Search
                    </button>
                    <button
                      className="btn btn-outline-danger btn-margin newButton"
                      style={{ marginRight: 10, fontWeight: 'bold' }}
                      id="submitbtn2"
                      onClick={clearMovementSearch}
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
                        <th scope="col">MovementReq Id</th>
                        <th scope="col">ContainerNo</th>
                        <th scope="col">ViaNo</th>
                        <th scope="col">VoyageNo</th>
                        <th scope="col">ShippingAgent</th>
                        <th scope="col">ShippingLine</th>
                        <th scope="col">Status</th>
                      </tr>
                      <tr className='text-center'>
                        <th scope="col"></th>
                        <th scope="col">{movementSearchData.length}</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='text-center'>
                        <td>
                          <input type="radio" name="radioGroup" onChange={() => selectMovementSearchRadio('', '', '', '', '', '', '')} value={''} />
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      {currentItemsMovementSearch.map((item, index) => (
                        <>
                          <tr key={index} className='text-center'>
                            <td>
                              <input
                                type="radio"
                                name="radioGroup"
                                onClick={() => selectMovementSearchRadio(item[0], item[1], item[5], item[3])} // Using onClick instead of onChange
                                value={item[0]}
                              />
                            </td>

                            <td>{item[1]}</td>
                            <td>{item[5]}</td>
                            <td>{item[11]}</td>
                            <td>{item[10]}</td>
                            <td>{item[8]}</td>
                            <td>{item[9]}</td>
                            <td>{item[12] === 'A' ? 'Approved' : item[12] === 'N' ? 'New' : ''}</td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                  <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                    <Pagination.First onClick={() => handlePageChangeCarting(1)} />
                    <Pagination.Prev
                      onClick={() => handlePageChangeCarting(currentPageMovementSearch - 1)}
                      disabled={currentPageMovementSearch === 1}
                    />
                    <Pagination.Ellipsis />

                    {displayPagesMovement().map((pageNumber) => (
                      <Pagination.Item
                        key={pageNumber}
                        active={pageNumber === currentPageMovementSearch}
                        onClick={() => handlePageChangeCarting(pageNumber)}
                      >
                        {pageNumber}
                      </Pagination.Item>
                    ))}
                    <Pagination.Ellipsis />
                    <Pagination.Next
                      onClick={() => handlePageChangeCarting(currentPageMovementSearch + 1)}
                      disabled={currentPageMovementSearch === totalPagesCartingSearch}
                    />
                    <Pagination.Last onClick={() => handlePageChangeCarting(totalPagesCartingSearch)} />
                  </Pagination>
                </div>
              </ModalBody>
            </Modal>











































            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="movementReqDate">
                  Work Order Date
                </label>
                <div style={{ position: "relative" }}>




                  <DatePicker
                    selected={lastEntry.movementReqDate}
                    // onChange={(date) => handleDateChange('inGateInDate', date)}
                    id="service"
                    name="cartingTransDate"
                    placeholderText="Enter Carting Date"
                    dateFormat="dd/MM/yyyy HH:mm" // Updated format
                    timeInputLabel="Time:"
                    showTimeInput
                    timeFormat="HH:mm" // 24-hour format for time
                    timeIntervals={15}
                    className={`form-control`}
                    wrapperClassName="custom-react-datepicker-wrapper"
                    disabled
                    readOnly
                    tabIndex={-1}
                  /><FontAwesomeIcon
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
                <label className="forlabel" for="HazardousHazardous">Shift <span className="error-message">*</span></label>
                <div style={{ position: 'relative' }}>
                  <Input
                    type="select"
                    name="shift"
                    className={`form-control ${validationErrors.length > 0 && validationErrors[validationErrors.length - 1]?.shift ? 'error-border' : ''}`}
                    value={lastEntry.shift}
                    onChange={(e) => handleHeaderChange('shift', e.target.value)}
                  >
                    <option value="Day">Day</option>
                    <option value="Second">Second</option>
                    <option value="Third">Third</option>
                  </Input>
                </div>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="status"
                >
                  Status
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  maxLength={15}
                  readOnly
                  name="status"
                  value={lastEntry.status === 'A' ? 'Approved' : lastEntry.status === 'N' ? 'New' : ''}
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
                  name="approvedBy"
                  value={lastEntry.createdBy}
                />
              </FormGroup>
            </Col>
          </Row>


          <Row>


            <Col md={4}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Comments
                </label>
                <textarea
                  className={`inputwidthTukaMax form-control`}
                  id="remarks"
                  name='remarks'
                  value={lastEntry.comments}
                  onChange={(e) => handleHeaderChange('comments', e.target.value)}
                  maxLength={250}
                  rows={2}
                ></textarea>
              </FormGroup>
            </Col>

          </Row>


        </div>

        <Row className="text-center">
          <Col>
            <button
              className="btn btn-outline-primary btn-margin newButton"
              style={{ fontSize: 13, marginRight: 10 }}
              id="submitbtn2"
              onClick={(e) => handleSave(ExportMovement)}
            >
              <FontAwesomeIcon
                icon={faSave}
                style={{ marginRight: "5px" }}
              />
              Save
            </button>

            <button
              className="btn btn-outline-danger btn-margin newButton"
              style={{ fontSize: 13, marginRight: 10 }}
              id="submitbtn2"
              onClick={handleReset}
            >
              <FontAwesomeIcon
                icon={faRefresh}
                style={{ marginRight: "5px" }}
              />
              Clear
            </button>


            <button
              className="btn btn-outline-primary btn-margin newButton"
              style={{ fontSize: 13, marginRight: 10 }}
              id="submitbtn2"
              onClick={(e) => handleAddRow(ExportMovement)}
            >
              <FontAwesomeIcon
                icon={faAdd}
                style={{ marginRight: "5px" }}
              />
              Add Container
            </button>


          </Col>
        </Row>




        <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>

          <h5>Movement work order Container details</h5>

          <Table className="table table-bordered" style={{ border: '2px solid black' }}>
            <thead className="tableHeader">
              <tr>
                <th scope="col" className="text-center" style={{ color: "black" }}>Sr No</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>Type</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>Container No <span className="error-message">*</span></th>
                <th scope="col" className="text-center" style={{ color: "black" }}>Size</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>Type</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>Agent Seal No</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>Custom Seal No</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>SB No</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>POL</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>POD<span className="error-message">*</span></th>
                <th scope="col" className="text-center" style={{ color: "black" }}>Shipping Agent</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>Shipping Line</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>Via No<span className="error-message">*</span></th>
                <th scope="col" className="text-center" style={{ color: "black" }}>Voyage No<span className="error-message">*</span></th>
                <th scope="col" className="text-center" style={{ color: "black" }}>Vessel<span className="error-message">*</span></th>
                <th scope="col" className="text-center" style={{ color: "black" }}>Gross Wt</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>Type Of Container</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>Movement Req Date</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>Force Entry Date</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>Force Flag</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>Authorised Person</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>Force Approval Remarks</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>Status</th>
                {ExportMovement.length > 1 && (
                  <th scope="col" className="text-center" style={{ color: "black" }}>Action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {ExportMovement.map((cargoEntry, index) => (
                <tr key={index} className="text-center">
                  <td>
                    {index + 1}
                  </td>

                  <td>

                    <FormGroup>

                      <Input
                        type="select"
                        name="movReqType"
                        className={`form-control inputwidthTuka ${validationErrors[index]?.movReqType ? 'error-border' : ''}`}
                        value={cargoEntry.movReqType}
                        onChange={(e) => handleFieldChange(e, index, 'movReqType', '')}
                        disabled={cargoEntry.status}
                        readOnly={cargoEntry.status}
                        id={cargoEntry.status ? 'service' : ''}
                      >
                        <option value="CLP">CLP</option>
                        <option value="Buffer">Buffer</option>
                        <option value="ONWH">On Wheel</option>
                        <option value="PortRn">Port Return</option>
                      </Input>
                    </FormGroup>

                  </td>


                  <td>
                    <FormGroup>
                      <Select
                        options={containerData}
                        value={selectedContainerNos[index]}
                        onChange={(selectedOption) => handleContainerNoSelect(selectedOption, index)}
                        onInputChange={(inputValue, { action }) => {
                          if (action === 'input-change') {
                            handleContainerNoSearch(inputValue, cargoEntry.movReqType);
                          }
                        }}
                        className={`inputwidthTukaMax ${validationErrors[index]?.containerNo ? 'error-border' : ''}`}
                        placeholder="Select ContainerNo"
                        menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                        menuPosition="fixed" // Sets the dropdown menu position to fixed    
                        menuPlacement="top"
                        isClearable
                        isDisabled={cargoEntry.status}
                        id={cargoEntry.status ? 'service' : ''}
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
                    </FormGroup>
                  </td>






                  <td>
                    <FormGroup>
                      <Input
                        type="text"
                        value={cargoEntry.containerSize}
                        className={`inputwidthTukaMin form-control`}
                        readOnly
                        id="service"
                        tabIndex={-1}
                      />
                    </FormGroup>
                  </td>




                  <td>
                    <FormGroup>
                      <Input
                        type="text"
                        value={cargoEntry.containerType}
                        className={`inputwidthTukaMin form-control`}
                        readOnly
                        id="service"
                        tabIndex={-1}
                      />
                    </FormGroup>
                  </td>


                  <td>
                    <FormGroup>
                      <Input
                        type="text"
                        value={cargoEntry.agentSealNo}
                        className={`inputwidthTuka form-control ${validationErrors[index]?.agentSealNo ? 'error-border' : ''}`}
                        maxLength={15}
                        onChange={(e) => handleFieldChange(e, index, 'agentSealNo', '')}
                      />
                    </FormGroup>
                  </td>


                  <td>
                    <FormGroup>
                      <Input
                        type="text"
                        value={cargoEntry.customsSealNo}
                        className={`inputwidthTuka form-control ${validationErrors[index]?.customsSealNo ? 'error-border' : ''}`}
                        maxLength={15}
                        onChange={(e) => handleFieldChange(e, index, 'customsSealNo', '')}
                      />
                    </FormGroup>
                  </td>


                  <td>
                    <FormGroup>
                      <Input
                        type="text"
                        value={cargoEntry.sbNo}
                        className={`inputwidthTuka form-control`}
                        readOnly
                        id="service"
                        tabIndex={-1}
                      />
                    </FormGroup>
                  </td>

                  <td>
                    <FormGroup>
                      <CreatableSelect
                        value={selectedPol[index]}
                        onChange={(selectedOption) => handlePodSelect(selectedOption, 'pol', index)}
                        options={polData}
                        placeholder="Select POL"
                        onInputChange={(inputValue, { action }) => {
                          if (action === 'input-change') {
                            searchPortData(inputValue, 'pol');
                          }
                        }}
                        onCreateOption={(inputValue) => {
                          const maxLength = 50;
                          const truncatedInputValue = inputValue.slice(0, maxLength);
                          handleCreationSelectPod(truncatedInputValue, 'pol', index)
                        }}
                        isClearable
                        id="pod"
                        name='pod'
                        className={`inputwidthTuka`}
                        menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                        menuPosition="fixed" // Sets the dropdown menu position to fixed    
                        menuPlacement="top"
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

                    </FormGroup>
                  </td>


                  <td>
                    <FormGroup>
                      <CreatableSelect
                        value={selectedPod[index]}
                        onChange={(selectedOption) => handlePodSelect(selectedOption, 'pod', index)}
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
                          handleCreationSelectPod(truncatedInputValue, 'pod', index)
                        }}
                        isClearable
                        id="pod"
                        name='pod'
                        className={`inputwidthTuka ${validationErrors[index]?.pod ? 'error-border' : ''}`}
                        menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                        menuPosition="fixed" // Sets the dropdown menu position to fixed    
                        menuPlacement="top"
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

                    </FormGroup>
                  </td>




                  {/* <td>
                    <FormGroup>
                      <Input
                        type="text"
                        className={`inputwidthTuka form-control ${validationErrors[index]?.pol ? 'error-border' : ''}`}
                        maxLength={15}
                        onChange={(e) => handleFieldChange(e, index, 'pol', '')}
                        value={cargoEntry.pol}
                      />
                    </FormGroup>
                  </td>

                  <td>
                    <FormGroup>
                      <Input
                        type="text"
                        className={`inputwidthTuka form-control ${validationErrors[index]?.pod ? 'error-border' : ''}`}
                        maxLength={15}
                        onChange={(e) => handleFieldChange(e, index, 'pod', '')}
                        value={cargoEntry.pod}
                      />
                    </FormGroup>
                  </td> */}



                  <td>
                    <FormGroup>
                      <Input
                        type="text"
                        className={`inputwidthTuka form-control ${validationErrors[index]?.shippingAgentName ? 'error-border' : ''}`}
                        readOnly
                        id="service"
                        tabIndex={-1}
                        value={cargoEntry.shippingAgentName}
                      />
                    </FormGroup>
                  </td>



                  <td>
                    <FormGroup>
                      <Input
                        type="text"
                        className={`inputwidthTuka form-control ${validationErrors[index]?.shippingLineName ? 'error-border' : ''}`}
                        readOnly
                        id="service"
                        tabIndex={-1}
                        value={cargoEntry.shippingLineName}
                      />
                    </FormGroup>
                  </td>







                  <td>
                    <FormGroup>
                      <CreatableSelect
                        value={selectedViaNo[index]}
                        onChange={(selectedOption) => handleVoyageSelect(selectedOption, 'viaNo', index)}
                        options={vesselData}
                        // placeholder="Select Via No"
                        onInputChange={(inputValue, { action }) => {
                          if (action === 'input-change') {
                            searchVoyageAndVia(inputValue);
                          }
                        }}
                        onCreateOption={(inputValue) => { handleCreationSelect(inputValue, 'viaNo', index) }}
                        isClearable
                        id="viaNo"
                        name='viaNo'
                        className={`inputwidthTuka ${validationErrors.some(error => error.hasOwnProperty('viaNo')) ? 'error-border' : ''}`}

                        menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                        menuPosition="fixed" // Sets the dropdown menu position to fixed    
                        menuPlacement="top"
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

                    </FormGroup>
                  </td>



                  <td>
                    <FormGroup>

                      <CreatableSelect
                        value={selectedVoyageNo[index]}
                        // value={{ value: lastEntry.voyageNo, label: lastEntry.voyageNo }}
                        onChange={(selectedOption) => handleVoyageSelect(selectedOption, 'voyageNo', index)}
                        // onInputChange={searchVoyageAndVia}

                        onInputChange={(inputValue, { action }) => {
                          if (action === 'input-change') {
                            searchVoyageAndVia(inputValue);
                          }
                        }}
                        options={vesselData}
                        onCreateOption={(inputValue) => { handleCreationSelect(inputValue, 'voyageNo', index) }}
                        // placeholder="Select Voyage No"
                        isClearable
                        id="voyageNo"
                        name='voyageNo'
                        menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                        menuPosition="fixed" // Sets the dropdown menu position to fixed    
                        menuPlacement="top"
                        className={`inputwidthTuka ${validationErrors.some(error => error.hasOwnProperty('voyageNo')) ? 'error-border' : ''}`}
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




                    </FormGroup>
                  </td>


                  <td>
                    <FormGroup>
                      <Input
                        type="text"
                        value={cargoEntry.vesselName}
                        className={`inputwidthTukaMax form-control`}
                        readOnly
                        id="service"
                        tabIndex={-1}
                      />
                    </FormGroup>
                  </td>

                  <td>
                    <FormGroup>
                      <Input
                        type="text"
                        value={cargoEntry.grossWeight}
                        className={`inputwidthTukaMin form-control`}
                        readOnly
                        id="service"
                        tabIndex={-1}
                      />
                    </FormGroup>
                  </td>





                  <td>
                    <FormGroup>
                      <Input
                        type="select"
                        value={cargoEntry.typeOfContainer}
                        className={`inputwidthTukaMax form-control ${validationErrors[index]?.typeOfContainer ? 'error-border' : ''}`}
                        onChange={(e) => handleFieldChange(e, index, 'typeOfContainer')}
                      >
                        <option value="General">General</option>
                        {containerTypes.map((type, idx) => (
                          <option key={idx} value={type.label}>
                            {type.label}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </td>


                  <td onKeyDown={(event) => handleKeyDown(event, index, 'movementOrderDate', cargoEntry.containerNo)} tabIndex={0}>
                  <FormGroup>
                    <DatePicker
                      selected={cargoEntry.movementOrderDate}
                      onChange={(date) => handlePaymentDateChange(date, index, 'movementOrderDate', cargoEntry.containerNo)}
                      name="movementOrderDate"
                      placeholderText="MovementReq Date"
                      value={cargoEntry.movementReqDate}
                      dateFormat="dd/MM/yyyy HH:mm"
                      showTimeInput
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      // customInput={<CustomInput className={`inputwidthTukaMax form-control`} />}
                      customInput={<CustomInput className={`inputwidthTukaMax form-control ${validationErrors[index]?.movementOrderDate ? 'error-border' : ''}`}
                      // onKeyDown={(event) => handleKeyDown(event, index, 'movementReqDate', cargoEntry.containerNo)} 
                      />
                      }
                    // className={`inputwidthTukaMax form-control ${validationErrors[index]?.movementReqDate ? 'error-border' : ''}`}                     
                    />
                      </FormGroup>
                  </td>


                  <td>
                  <FormGroup>
                    <DatePicker
                      selected={cargoEntry.forceEntryDate}
                      // onChange={(date) => handlePaymentDateChange(date, index, 'forceEntryDate', cargoEntry.containerNo)}
                      id="service"
                      disabled
                      name="sbDate"
                      placeholderText="Sb Date"
                      dateFormat="dd/MM/yyyy HH:mm"
                      showTimeInput
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      customInput={<CustomInput className={`inputwidthTukaMax form-control`} />}
                      className={`inputwidthTukaMax form-control ${validationErrors[index]?.forceEntryDate ? 'error-border' : ''}`}
                      tabIndex={-1}
                    />
  </FormGroup>
                  </td>



                  <td>
                    <FormGroup>
                      <Input
                        type="checkbox"
                        maxLength={15}
                        onChange={(e) => handleFieldChange(e, index, 'forceEntryFlag')}
                        checked={cargoEntry.forceEntryFlag === 'Y'} // Check if forceEntryFlag is 'Y'
                        style={{ width: '24px', height: '28px', cursor: 'pointer', margin: '0' }}
                      />
                    </FormGroup>
                  </td>



                  <td>
                    <FormGroup>
                      <Input
                        type="text"
                        className={`inputwidthTuka form-control ${validationErrors[index]?.forceEntryApproval ? 'error-border' : ''}`}
                        maxLength={50}
                        onChange={(e) => handleFieldChange(e, index, 'forceEntryApproval', '')}
                        value={cargoEntry.forceEntryApproval}
                      />
                    </FormGroup>
                  </td>

                  <td>
                    <FormGroup>
                      <textarea
                        className={`inputwidthTukaMax form-control`}
                        id="remarks"
                        name='forceEntryRemarks'
                        onChange={(e) => handleFieldChange(e, index, 'forceEntryRemarks', '')}
                        value={cargoEntry.forceEntryRemarks}
                        maxLength={250}
                        rows={2}
                      ></textarea>
                    </FormGroup>
                  </td>

                  <td>
                    {cargoEntry.status === 'A' ? 'Approved' : ''}
                  </td>

                  {index > 0 && index === ExportMovement.length - 1 && (!cargoEntry.movementReqId || cargoEntry.movementReqId.trim() === '') && (
                    <td>
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        onClick={() => handleRemoveRow(index)}
                        style={{ color: 'red', cursor: 'pointer', fontSize: '24px' }}
                      />
                    </td>
                  )}


                </tr>
              ))}
            </tbody>

          </Table>
        </div>
      </div>
    </>
  );
}

export default ExportMovement;
