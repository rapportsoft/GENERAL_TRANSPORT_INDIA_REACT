// import AuthContext from "../Components/AuthProvider";
// import { useLocation, useNavigate } from "react-router-dom";
// import React, { useEffect, useState, useContext } from "react";
// import "../Components/Style.css";
// import Select from "react-select";
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
//   faCalculator,
//   faCertificate,
//   fas,
//   faEdit,
//   faGroupArrowsRotate,
//   faPrint,
//   faPlaneArrival,
//   faXmark,
//   faEye,
// } from "@fortawesome/free-solid-svg-icons";
// import "../assets/css/style.css";
// import "../Components/Style.css";
// import useAxios from "../Components/useAxios";
// import cfsService from "../service/CFSService";
// import { toast } from "react-toastify";
// import ipaddress from "../Components/IpAddress";
// import {
//   Row,
//   Col,
//   FormGroup,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   Label,
//   Input,
//   Table,
//   ModalFooter,
//   FormFeedback,
//   Button,
// } from "reactstrap";
// import { Pagination } from "react-bootstrap";
// import { format } from "date-fns";
// import pdfLogo from "../Images/pdfLogo.png";
// import xlsLogo from "../Images/xlsLogo.png";



// function ReceingGeneralCargo({ noctrans, nocno, acttab, boe, listOfData, listOfInbond, flag, onRequest }) {
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

//   const [inbondFlag, setInBondFlag] = useState("add");

//   const initialNoc = {
//     companyId: companyid,
//     branchId: branchId,
//     receivingId: "",
//     depositNo: "",
//     importerName: "",
//     onAccountOf: "",
//     deliveryId: "",
//     receivingDate: new Date(),
//     profitcentreId: "N00008",
//     shift: "",
//     gateInId: "",
//     docType: "",
//     boeNo: "",
//     boeDate: "",
//     invoiceNo: "",
//     invoiceDate: "",
//     challanNo: "",
//     challanDate: "",
//     processId: "",
//     cha: "",
//     importerId: "",
//     crossingCargo: "",
//     noOfMarks: "",
//     commodityDescription: "",
//     grossWeight: "",
//     typeOfPackage: "",
//     uom: "",
//     containerNo: "",
//     containerSize: "",
//     containerType: "",
//     areaOccupied: "",
//     cargoCondition: "",
//     gateInPackages: "",
//     totalDeliveredPkg: "",
//     receivedPackages: "",
//     deliveredPackages: "0",
//     spaceAllocated: "",
//     shortQty: "",
//     comments: "",
//     invoiceStatus: "",
//     status: "",
//     createdBy: "",
//     createdDate: "",
//     editedBy: "",
//     editedDate: "",
//     approvedBy: "",
//     approvedDate: "",
//     damageRemark: "",
//     remark: "",
//     jobNo: "",
//     model: "",
//     cfs: "",
//     noOf20Ft: "",
//     noOf40Ft: "",
//     assesmentId: "",
//     handlingEquip1: "",
//     handlingEquip2: "",
//     handlingEquip3: "",
//     owner1: "",
//     owner2: "",
//     owner3: "",
//     source: "",
//     transporter: "",
//     transporterName: "",
//     commodityId: "",
//     jobDtlTransId: "",
//     areaAllocated: "",
//     gateInWeight: "",
//     receivedWeight: "",
//     jobDate: "",
//     jobTransDate: "",
//     cargoDuty: "",
//     cargoValue: "",
//   };


//   const initialNocDtl = {
//     companyId: companyid, // String
//     branchId: branchId, // String
//     lineNo: "", // String
//     jobNop: "",
//     jobWeight: "",
//     receivingId: "", // String
//     gateInId: "", // String
//     gateInDate: null, // Date (use null or a Date object if you prefer)
//     containerNo: "", // String
//     containerSize: "", // String
//     containerType: "", // String
//     vehicleNo: "", // String
//     gateInPackages: "0", // String
//     gateInWeight: "0", // String
//     receivingPackages: "0", // String
//     receivingWeight: "0", // String
//     status: "", // String
//     qtyTakenOut: "", // String
//     weightTakenOut: null, // BigDecimal (use null or a number)
//     commodityDescription: "", // String
//     typeOfPackages: "", // String
//     commodityId: "", // String
//     jobDtlTransId: "", // String
//     createdBy: "", // String
//     createdDate: null, // Date (use null or a Date object if you prefer)
//     editedBy: "", // String
//     editedDate: null, // Date (use null or a Date object if you prefer)
//     approvedBy: "", // String
//     approvedDate: null, // Date (use null or a Date object if you prefer)
//   };



//   const [nocTansIdSearchId, setNocTransIdSearchId] = useState("");


//   const [isModalOpenForIGMSearch, setisModalOpenForIGMSearch] = useState(false);
//   const openIGMSearchModal = () => {
//     setisModalOpenForIGMSearch(true);
//     searchCHA("");
//   };

//   const closeIGMSearchModal = () => {
//     setisModalOpenForIGMSearch(false);
//     setChaSearchId("");
//     setCHASearchedData([]);
//   };

//   const [chaSearchId, setChaSearchId] = useState("");
//   const [chaSearchedData, setCHASearchedData] = useState([]);

//   const searchCHA = (id) => {
//     setLoading(true);
//     axios
//       .get(
//         `${ipaddress}api/receiving/search?companyId=${companyid}&branchId=${branchId}&partyName=${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         }
//       )
//       .then((response) => {
//         setCHASearchedData(response.data);
//         setLoading(false);
//         setCurrentPage(1);

//         console.log("response.data", response.data);
//       })
//       .catch((error) => {
//         setLoading(false);
//       });
//   };

//   const clearSearch = () => {
//     setChaSearchId("");
//     searchCHA("");
//   };
//   const [chaName, setChaName] = useState("");
//   useEffect(() => {
//     if (acttab == "P01803") {

//       if (listOfData.jobTransId && listOfData.jobNo && listOfData.boeNo && listOfInbond.receivingId) {
//         selectIGMSearchRadio(listOfData.jobTransId, listOfInbond.receivingId, listOfData.jobNo);
//       }
//       else {
//         getBoeData(listOfData.boeNo);
//       }
//       if (flag) {
//         handleClear();
//       }
//     }
//   }, [listOfData.jobTransId, listOfInbond.receivingId, listOfData.jobNo, acttab]);

//   const selectIGMSearchRadio = (
//     trasid,
//     inbondingId,
//     nocNo,
//   ) => {
//     closeIGMSearchModal();
//     axios
//       .get(
//         `${ipaddress}api/receiving/getDataByTransIdANDNocIDAndInBondingId?companyId=${companyid}&branchId=${branchId}&nocTransID=${trasid}&inBondingId=${inbondingId}&nocNo=${nocNo}`,
//         {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         }
//       )
//       .then((response) => {
//         const data = response.data;
//         setInBondFlag("edit");
//         console.log("getDataByPartyIdAndGstNo", data);
//         setInBond(response.data)

//         setIsoName(response.data.boeNo);

//         setChaName(response.data.editedBy);
//         setBondingErrors((prevErrors) => ({
//           ...prevErrors,
//           cha: "",
//         }));

//         // fetchData(
//         //   companyid,
//         //   branchId,
//         //   response.data.nocTransId,
//         //   response.data.nocNo,
//         // );
//         handleGridData(response.data.receivingId);
//         fetchDataAfterSave(
//           companyid,
//           branchId,
//           response.data.receivingId,
//         )
//       })
//       .catch((error) => { });
//   };


//   const [importerSearchId, setImporterSearchId] = useState("");
//   const [importerSearchedData, setImporterSearchedData] = useState([]);


//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = chaSearchedData;
//   const totalPages = Math.ceil(chaSearchedData.length / itemsPerPage);

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

//     return Array.from(
//       { length: endPage - startPage + 1 },
//       (_, i) => startPage + i
//     );
//   };

//   const [inBond, setInBond] = useState(initialNoc);
//   const [nocDtl, setNocDtl] = useState(initialNocDtl);
//   const handleNocChange = (e) => {
//     const { name, value } = e.target;

//     setInBond((prevNOC) => {
//       const updatedNOC = {
//         ...prevNOC,
//         [name]: value,
//       };

//       // Calculate the sum of cifValue and cargoDuty
//       const cifValue = parseFloat(updatedNOC.cifValue) || 0;
//       const cargoDuty = parseFloat(updatedNOC.cargoDuty) || 0;

//       return {
//         ...updatedNOC,
//         insuranceValue: (cifValue + cargoDuty).toFixed(2), // Update insuranceValue
//       };
//     });

//     document.getElementById(name).classList.remove("error-border");
//     setBondingErrors((prevErrors) => ({
//       ...prevErrors,
//       [name]: "",
//     }));
//   };

//   const handleDocDateChange = (date) => {
//     setInBond((prevNoc) => ({
//       ...prevNoc,
//       nocFromDate: date,
//     }));

//     setInBond((prevNoc) => ({
//       ...prevNoc,
//       nocValidityDate: "",
//     }));

//     document.getElementById("nocFromDate").classList.remove("error-border");
//     setBondingErrors((prevErrors) => ({
//       ...prevErrors,
//       nocFromDate: "",
//     }));
//   };

//   const handleNocTransDate = (date) => {
//     setInBond((prevNoc) => ({
//       ...prevNoc,
//       receivingDate: date,
//     }));
//     //   document.getElementById("nocFromDate").classList.remove('error-border');
//     //   setBondingErrors((prevErrors) => ({
//     //     ...prevErrors,
//     //     nocFromDate: "",
//     // }));
//   };


//   const handleNocValidityDateChnage = (date) => {
//     setInBond((prevNoc) => ({
//       ...prevNoc,
//       bondingDate: date,
//       bondValidityDate: date ? new Date(date.getTime() + 364 * 24 * 60 * 60 * 1000) : null,
//     }));
//     document.getElementById("bondingDate").classList.remove("error-border");
//     setBondingErrors((prevErrors) => ({
//       ...prevErrors,
//       bondingDate: "",
//     }));
//   };

//   const [bondingErrors, setBondingErrors] = useState({
//     bondingNo: "",
//     bondingDate: "",
//   });

//   const [nocDtlErrors, setNocDtlErrors] = useState({
//     nocPackages: "",
//     typeOfPackage: "",
//     cifValue: "",
//     cargoDuty: "",
//     insuranceValue: "",
//     commodityDescription: "",
//     grossWeight: "",
//   });








//   const handleSave = () => {
//     setLoading(true);

//     let errors = {};

//     if (!inBond.boeNo) {
//       errors.boeNo = "BOE No is required.";
//       document.getElementById("boeNo").classList.add("error-border");
//       toast.error("BOE No is required.", {
//         // ... (toast options)
//       });
//       setLoading(false);
//       return;
//     }

//     if (!inBond.cargoCondition) {
//       errors.cargoCondition = "Please specify cargo condition...";
//       document.getElementById("cargoCondition").classList.add("error-border");
//       toast.error("Please specify cargo condition...", {
//       });
//       setLoading(false);
//       return;
//     }
//     if (!inBond.handlingEquip1) {
//       errors.handlingEquip1 = "Please specify handling equipment...";
//       document.getElementById("handlingEquip1").classList.add("error-border");
//       toast.error("Please specify cargo condition...", {
//       });
//       setLoading(false);
//       return;
//     }

//     if (!inBond.handlingEquip2) {
//       errors.handlingEquip2 = "Please specify handling2 equipment...";
//       document.getElementById("handlingEquip2").classList.add("error-border");
//       toast.error("Please specify cargo condition...", {
//       });
//       setLoading(false);
//       return;
//     }

//     if (selectedRows.length === 0) {
//       toast.error(
//         "Commodity not selected. Please select commodity to add..."
//       );
//       setLoading(false);
//       return;
//     }

//     // const hasEmptyFields = rows.some(row =>
//     //   !row.yardLocation || !row.yardBlock || !row.blockCellNo || row.areaReleased
//     // );

//     // if (hasEmptyFields) {
//     //   const errorMsg = "Required fields in location must be filled before saving.";
//     //   setErrors((prevErrors) => ({
//     //     ...prevErrors,
//     //     save: errorMsg, // Set error message for save
//     //   }));
//     //   setLoading(false);
//     //   toast.error(errorMsg); // Display error toast
//     //   return; // Exit the function to prevent saving
//     // }

//     const hasEmptyFields = rows.some(row => {
//       if (!row.yardLocation || !row.yardBlock || !row.blockCellNo) {
//         return true;
//       }

//       if (inBond.spaceAllocated === 'COVERED') {
//         // areaReleased must be greater than 0
//         return !row.cellAreaAllocated || parseFloat(row.cellAreaAllocated) <= 0;
//       }

//       // If OPEN, skip areaReleased check
//       return false;
//     });

//     if (hasEmptyFields) {
//       const errorMsg = "Required fields in location must be filled before saving.";
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         save: errorMsg,
//       }));
//       setLoading(false);
//       toast.error(errorMsg);
//       return;
//     }




//     let isValid = true;
//     const updatedValues = [...inputValues];
//     selectedRows.forEach((dtl, index) => {
//       if (!updatedValues[index]) {
//         updatedValues[index] = {};
//       }

//       const values = updatedValues[index];
//       let errorMessage = "";

//       if (!values.receivingPackages) {
//         errorMessage = "Receiving Packages is required";
//         toast.error("Receiving Packages is required.", {
//         });
//         setLoading(false);
//         isValid = false;
//       } else if (parseFloat(values.receivingPackages) > dtl.noOfPackages) {
//         errorMessage =
//           "Receiving Packages should not be greater than gate in Packages";
//         toast.error(
//           "Receiving Packages should not be greater than gate in Packages.",
//           {
//           }
//         );
//         setLoading(false);
//         isValid = false;
//       }

//       // Automatically calculate inbondInsuranceValue
//       updatedValues[index].inbondInsuranceValue =
//         parseFloat(values.inbondCifValue || 0) +
//         parseFloat(values.inbondCargoDuty || 0);

//       // Automatically calculate inbondGrossWt
//       const perPackageWeight = dtl.grossWeight / dtl.nocPackages;
//       updatedValues[index].inbondGrossWt = (
//         perPackageWeight * parseFloat(values.inBondedPackages || 0)
//       ).toFixed(2);

//       updatedValues[index].errorMessage = errorMessage;
//     });




//     const dataToSave = selectedRows.map((row) => {
//       const index = currentItems.findIndex(
//         (item) =>
//           item.jobTransId === row.jobTransId &&
//           item.jobNo === row.jobNo &&
//           item.commodityId === row.commodityId &&
//           item.srNo === row.srNo
//       );
//       const inputValuesForRow = inputValues[index] || {};
//       const updatedFields = {};

//       Object.keys(inputValuesForRow).forEach((field) => {
//         if (inputValuesForRow[field] !== undefined) {
//           updatedFields[field] = inputValuesForRow[field];
//         }
//       });

//       return {
//         ...row,
//         ...updatedFields,
//       };
//     });

//     const requestBody = {
//       inBond: {
//         ...inBond,
//       },
//       nocDtl: {
//         ...dataToSave,
//       },
//       grid: {
//         ...rows
//       }
//     };


//     // return;

//     // setLoading(false);
//     if (isValid) {
//       axios
//         .post(
//           `${ipaddress}api/receiving/saveCfInbondCrg?companyId=${companyid}&branchId=${branchId}&user=${userId}&flag=${inbondFlag}`,
//           requestBody,
//           {
//             headers: {
//               Authorization: `Bearer ${jwtToken}`,
//             },
//           }
//         )
//         .then((response) => {
//           setInBond(response.data);
//           fetchDataAfterSave(
//             companyid,
//             branchId,
//             response.data.receivingId,
//           );
//           handleGridData(response.data.receivingId)
//           setInBondFlag("edit");
//           toast.success("Data save successfully!!", {
//             autoClose: 800,
//           });
//           onRequest();
//           setLoading(false);
//         })
//         .catch((error) => {
//           setLoading(false);
//           if (error.response) {
//             // This will log detailed error information from the backend
//             console.error("Error data:", error.response.data);
//             toast.error(error.response.data || "An error occurred. Please try again.", {
//               autoClose: 9000,
//             });
//           }
//         });
//     } else {
//       // Update state to reflect errors
//       setInputValues(updatedValues);
//     }
//   };


//   const handleClear = () => {
//     // Reset the form fields
//     setInBond(initialNoc);
//     document.getElementById("boeNo").classList.remove("error-border");
//     document.getElementById("boeDate").classList.remove("error-border");
//     setBondingErrors("");
//     setSelectAll(false);
//     setSelectedRows([]);
//     setInBondFlag("add");
//     setChaName("");
//     setCHASearchedData([]);
//     setIsoName('');
//     setModalDataInput((prev) => ({
//       ...prev,
//       yardLocation: '',
//       yardBlock: '',
//       blockCellNo: '',
//       cellArea: '',
//       cellAreaAllocated: '',
//       cellAreaUsed: '',
//     }));
//     setRows([]);
//     setErrors('');
//   };

//   const [modal, setModal] = useState(false);
//   const toggle = () => setModal(!modal);




//   const fetchData = async (companyid, branchId, nocTransId, nocNo, areaAllocated) => {
//     try {
//       const response = await fetch(
//         `${ipaddress}api/receiving/getALLCfbondNocDtl?companyId=${companyid}&branchId=${branchId}&nocTransId=${nocTransId}&nocNo=${nocNo}`,
//         {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const a = areaAllocated;

//       const data = await response.json();

//       setCHASearchedData(data);

//       const newTotalPackages = data.reduce(
//         (sum, row) => sum + (parseFloat(row.gateInPackages) || 0),
//         0
//       );


//       const differences = data.map(row =>
//         parseFloat(row.gateInPackages) - parseFloat(row.inBondedPackages)
//       );

//       const packages = data.map(row =>
//         parseFloat(row.inBondedPackages || 0)
//       );

//       let area;
//       if (inBond.inBondingId != null) {
//         area = a / newTotalPackages * packages;
//       }
//       else {
//         area = a / newTotalPackages * differences;
//       }


//       // setInputValues(data.map(mnr => ({
//       //   ...mnr,
//       //   receivingPackages: (mnr.noOfPackages - (mnr.receivingPackages || 0)),

//       //   // areaOccupied : a  / newTotalPackages * (mnr.gateInPackages - (mnr.inBondedPackages || 0)),
//       //   shortagePackages: mnr.shortagePackages || 0,
//       //   damagedQty: mnr.damagedQty || 0,
//       //   breakage: mnr.breakage || 0,
//       //   commodityId: mnr.commodityId,
//       //   gateInPackages: mnr.noOfPackages,
//       //   jobGwt: mnr.jobGwt,
//       //   jobNop: mnr.jobNop,
//       //   actCommodityId: mnr.actCommodityId,
//       //   editedBy: '',
//       //   receivingWeight: (
//       //     ((mnr.jobGwt / mnr.jobNop) * (mnr.noOfPackages - (mnr.receivingPackages || 0)))
//       //   ).toFixed(2),

//       // })));



//       setInputValues(
//         data.map(mnr => ({
//           ...mnr,

//           receivingPackages: (mnr.gateInPackages - (mnr.receivingPackages || 0)),

//           balanceReceivedPackages: (mnr.gateInPackages - (mnr.receivingPackages || 0)),

//           balanceReceivedWeight: (
//             (mnr.gateInWeight || 0) - (
//               ((mnr.jobGwt / (mnr.jobNop || 1)) *
//                 (mnr.receivingPackages - (mnr.gateInPackages || 0)))
//             ).toFixed(2)
//           ),
//           // balanceReceivedWeight: (mnr.gateInWeight - (mnr.receivingWeight || 0)),

//           shortagePackages: mnr.shortagePackages || 0,
//           damagedQty: mnr.damagedQty || 0,
//           breakage: mnr.breakage || 0,

//           commodityId: mnr.commodityId,
//           gateInPackages: mnr.noOfPackages,
//           jobGwt: mnr.jobGwt,
//           jobNop: mnr.jobNop,
//           actCommodityId: mnr.actCommodityId,
//           editedBy: '',
//           receivingWeight: (
//             (mnr.gateInWeight || 0) - (
//               ((mnr.jobGwt / (mnr.jobNop || 1)) *
//                 (mnr.receivingPackages - (mnr.gateInPackages || 0)))
//             ).toFixed(2)
//           ),

//           oldReceivedPackages:
//             (mnr.oldReceivedPackages || 0) + (mnr.receivingPackages || 0),



//         }))
//       );



//       console.log("cfbodnNocDtl records ", data);
//     } catch (error) {
//       // setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };


//   const fetchDataAfterSave = async (companyid, branchId, inBondingId) => {
//     try {
//       const response = await fetch(
//         `${ipaddress}api/receiving/findByCompanyIdAndBranchIdAndCommonBondingIdAndNocTransId?companyId=${companyid}&branchId=${branchId}&inBondingId=${inBondingId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }


//       const data = await response.json();
//       setCHASearchedData(data);

//       const selectedData = data.filter((row) => row.receivingId !== undefined && row.receivingId !== null);
//       setSelectedRows(selectedData);
//       setSelectAll(true);
//       //setIsDataFetched(true);

//       console.log("fetchDataAfterSave_____________________________", data);

//       // setInputValues(data.map(mnr => ({
//       //   ...mnr,

//       //   receivingPackages: (mnr.gateInPackages - (mnr.receivingPackages || 0)),



//       //   receivingWeight: (
//       //     ((mnr.jobGwt / mnr.jobNop) * (mnr.gateInPackages - (mnr.receivingPackages || 0)))
//       //   ).toFixed(2),

//       // })));


//       setInputValues(data.map(mnr => ({
//         ...mnr,

//         receivingPackages: mnr.receivingPackages || 0,

//         balanceReceivedPackages: (mnr.gateInPackages - (mnr.receivingPackages || 0)),

//         balanceReceivedWeight: (
//           (
//             (mnr.gateInWeight || 0) -
//             ((mnr.jobGwt / (mnr.jobNop || 1)) * (mnr.receivingPackages || 0))
//           ).toFixed(2)
//         ),

//         receivingWeight: (
//           (
//             (mnr.jobGwt / (mnr.jobNop || 1)) * (mnr.receivingPackages || 0)
//           ).toFixed(2)
//         ),

//         oldReceivedPackages: (mnr.oldReceivedPackages || 0) + (mnr.receivingPackages || 0), // No increment after save

//         shortagePackages: mnr.shortagePackages || 0,
//         damagedQty: mnr.damagedQty || 0,
//         breakage: mnr.breakage || 0,

//         commodityId: mnr.commodityId,
//         actCommodityId: mnr.actCommodityId,
//         gateInPackages: mnr.noOfPackages,
//         jobGwt: mnr.jobGwt,
//         jobNop: mnr.jobNop,

//         editedBy: '',
//       })));


//       console.log("cfbodnNocDtl records ", data);
//     } catch (error) {
//       // setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };



//   const getMinDate = (date) => {
//     if (!date) return null;
//     const minDate = new Date(date);
//     minDate.setDate(minDate.getDate() + 1); // Add one day
//     return minDate;
//   };



//   const [selectAll, setSelectAll] = useState(false);
//   const [selectedItems, setSelectedItems] = useState([]);

//   useEffect(() => {
//     setSelectAll(selectedItems.length === chaSearchedData.length);
//   }, [selectedItems, chaSearchedData]);

//   const handleSelectAll = (event) => {
//     const isChecked = event.target.checked;
//     setSelectAll(isChecked);
//     if (isChecked) {
//       setSelectedRows([...currentItems]); // Select all rows
//     } else {
//       setSelectedRows([]); // Deselect all rows
//     }
//   };

//   const [selectedRows, setSelectedRows] = useState([]);
//   const [inputValues, setInputValues] = useState([]);


//   function handleInputChangeNew(e, val1, val2) {
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

//   const handleInputChangeFotDtl = (event, fieldName, index, val, val1) => {
//     const { value } = event.target;
//     let newValue = value;

//     if (['receivingPackages', 'receivingWeight'].includes(fieldName)) {
//       newValue = handleInputChangeNew(value, val, val1)
//     }

//     setInputValues((prevInputValues) => {
//       const updatedValues = [...prevInputValues];
//       // const dtl = currentItems[index]; 

//       const selectedRow = selectedRows[index];

//       console.log("selectedRow", selectedRow);
//       const dtl = currentItems[index]; // Get the current item details for comparison

//       let errorMessage = "";



//       const newTotalPackages = updatedValues.reduce(
//         (sum, row) => sum + (parseFloat(row.gateInPackages) || 0),
//         0
//       );

//       if (fieldName === "receivingPackages") {
//         // Calculate per package weight and update inbondGrossWt
//         const perPackageWeight = dtl.jobGwt / dtl.jobNop;
//         updatedValues[index].receivingWeight = (
//           perPackageWeight * parseFloat(newValue)
//         ).toFixed(2);

//       }


//       let addition;

//       if (inBond.receivingId) {
//         addition = dtl.gateInPackages;
//       } else {
//         addition = dtl.noOfPackages - dtl.receivingPackages;
//         // addition=dtl.inBondedPackages;
//       }

//       //const addition=dtl.gateInPackages - dtl.inBondedPackages;
//       console.log("addition", addition);

//       if (fieldName === "receivingPackages" && parseFloat(newValue) > addition) {
//         errorMessage = `Receiving Packages should not be greater than ${addition}`;
//       }

//       // Set the updated values and error message if applicable
//       updatedValues[index] = {
//         ...updatedValues[index],
//         [fieldName]: newValue,
//         errorMessage,
//       };

//       return updatedValues;
//     });
//   };


//   const handleCheckboxChangeForDtl = (event, row) => {
//     const isChecked = event.target.checked;
//     if (isChecked) {
//       // If not already selected, add to selected rows
//       if (
//         !selectedRows.some(
//           (selectedRow) =>
//             selectedRow.jobTransId === row.jobTransId &&
//             selectedRow.jobNo === row.jobNo &&
//             selectedRow.commodityId === row.commodityId &&
//             selectedRow.srNo === row.srNo
//         )
//       ) {
//         setSelectedRows([...selectedRows, row]);
//       }
//     } else {
//       // Remove from selected rows
//       const updatedRows = selectedRows.filter(
//         (selectedRow) =>
//           selectedRow.jobTransId !== row.jobTransId ||
//           selectedRow.jobNo !== row.jobNo ||
//           selectedRow.commodityId !== row.commodityId ||
//           selectedRow.srNo !== row.srNo
//       );
//       setSelectedRows(updatedRows);
//     }
//   };

//   // State to hold totals for the selected rows
//   const [totals, setTotals] = useState({
//     totalInBondedPackages: 0,
//     totalShortagePackages: 0,
//     totalDamagedQty: 0,
//     totalBreakage: 0,
//   });


//   const calculateTotals = () => {
//     let totalInBondedPackages = 0;
//     let totalShortagePackages = 0;
//     let totalDamagedQty = 0;
//     let totalBreakage = 0;
//     let totalAreaOccupied = 0;

//     selectedRows.forEach((row) => {
//       const isInBondingIdValid = inBond?.receivingId != null && inBond?.receivingId !== '';
//       const index = currentItems.findIndex(
//         (item) =>
//           inBond?.receivingId
//             ? // If srNo exists, use commodityId
//             item.jobTransId === row.jobTransId &&
//             item.jobNo === row.jobNo &&
//             item.commodityId === row.commodityId &&
//             item.srNo === row.srNo
//             : // Otherwise, use cfBondDtlId
//             item.jobTransId === row.jobTransId &&
//             item.jobNo === row.jobNo &&
//             item.commodityId === row.commodityId &&
//             item.srNo === row.srNo
//       );
//       if (index !== -1) {
//         const source = isInBondingIdValid ? row : inputValues[index];

//         totalInBondedPackages += parseFloat(source?.receivingPackages || 0);
//         totalShortagePackages += parseFloat(source?.receivingWeight || 0);
//         // totalAreaOccupied += parseFloat(source?.areaOccupied || 0);
//         totalDamagedQty += parseFloat(source?.damagedQty || 0);
//         totalBreakage += parseFloat(source?.breakage || 0);
//       }
//     });

//     setTotals({
//       totalInBondedPackages,
//       totalShortagePackages,
//       totalAreaOccupied
//     });

//     setInBond((pre) => ({
//       ...pre,
//       receivedPackages: handleInputChangeNew(totalInBondedPackages, 13, 3),
//       receivedWeight: handleInputChangeNew(totalShortagePackages, 13, 3),
//       // areaOccupied:handleInputChangeNew(totalAreaOccupied,13,3)
//     }));
//   };



//   // Example usage: Call this function after selection changes
//   useEffect(() => {
//     calculateTotals();
//   }, [selectedRows, inputValues]);



//   const [yardLocationsData, setYardLocationsData] = useState([]);


//   const handleYardLocationData = (type) => {
//     fetch(
//       `${ipaddress}api/yardblockcells/getLocationsAllYardCellByType?companyId=${companyid}&branchId=${branchId}&type=${type === 'OPEN' ? 'O' : type === 'COVERED' ? 'C' : ''
//       }`
//     ).then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         setYardLocationsData(data);
//       })
//       .catch((error) => console.error("Error:", error));
//   };



//   useEffect(() => {
//     if (inBond.spaceAllocated) handleYardLocationData(inBond.spaceAllocated);
//   }, [inBond.spaceAllocated]);





//   const initialYardGrid = {
//     companyId: companyid,
//     branchId: branchId,
//     receivingId: '',
//     gateInId: '',
//     srNo: 1,
//     yardLocation: '',
//     yardBlock: '',
//     blockCellNo: '',
//     cellArea: 0.000,
//     cellAreaUsed: 0.000,
//     cellAreaAllocated: 0.000,
//     qtyTakenOut: 0,
//     areaReleased: 0.000,
//     gridReleased: '',
//     receivedPackages: 0,
//     deliveredPackages: 0,
//     status: '',
//     createdBy: '',
//     createdDate: null,
//     editedBy: '',
//     editedDate: null,
//     approvedBy: '',
//     approvedDate: null,
//   };


//   const [modalDataInput, setModalDataInput] = useState(initialYardGrid);

//   const handleGridData = (inBid) => {
//     axios.get(
//       `${ipaddress}api/receiving/getAfterSaveGrid?companyId=${companyid}&branchId=${branchId}&inBondingId=${inBid}`,
//       {
//         headers: `Authorization ${jwtToken}`
//       }
//     )
//       .then((response) => {
//         console.log(response.data);
//         const data = response.data;

//         const newRows = data.map((row, index) => ({
//           ...row,
//           srNo: row.srNo,
//           receivedPackages: row.receivedPackages,
//           yardLocation: row.yardLocation,
//           yardBlock: row.yardBlock,
//           blockCellNo: row.blockCellNo,
//           cellArea: row.cellArea,
//           nocTransId: row.nocTransId,
//           cellAreaAllocated: row.cellAreaAllocated,
//           cellAreaUsed: row.cellAreaUsed,
//         }));

//         // Update the rows state with new values
//         setRows(newRows);

//         console.log("Updated rows: ", rows); // Log the new data
//         console.log("yardblockcellsyardblockcells", response.data);
//       })
//       .catch((error) => console.error("Error:", error));
//   };





//   const [boeData, setBOEData] = useState([]);
//   const [isoName, setIsoName] = useState('');


//   const handleBoeChange = async (selectedOption, { action }) => {
//     if (action === 'clear') {
//       setIsoName('');
//       setCHASearchedData([]);
//       setChaName('');
//       setInBond(initialNoc);

//       document.getElementById('boeNo').classList.remove('error-border');
//       setBondingErrors((prevErrors) => ({
//         ...prevErrors,
//         ['boeNo']: "",
//       }));
//     }
//     else {
//       setIsoName(selectedOption?.label)
//       setInBond((pri) => ({
//         ...pri,
//         boeNo: selectedOption ? selectedOption.value : '',
//         cha: selectedOption?.cha,
//         jobTransId: selectedOption?.jobTransId,
//         jobNo: selectedOption?.jobNo,
//         jobTransDate: selectedOption?.jobTransDate,
//         jobDate: selectedOption?.jobDate,
//         boeNo: selectedOption?.value,
//         cha: selectedOption?.cha,
//         boeDate: selectedOption?.boeDate,
//         chaName: selectedOption?.editedBy,
//         importerId: selectedOption?.importerId,
//         importerName: selectedOption?.importerName,
//         gateInId: selectedOption?.gateInId,
//         gateInDate: selectedOption?.gateInDate,
//         gateInPackages: selectedOption?.gateInPackages,
//         gateInWeight: selectedOption?.gateInWeight,
//         areaAllocated: selectedOption?.area,
//         transporterName: selectedOption?.transporterName,
//       }));

//       setChaName(selectedOption?.editedBy)
//       fetchData(
//         companyid,
//         branchId,
//         selectedOption?.jobTransId,
//         selectedOption?.jobNo,
//         selectedOption?.area,
//       );
//       document.getElementById('boeNo').classList.remove('error-border');
//       setBondingErrors((prevErrors) => ({
//         ...prevErrors,
//         ['boeNo']: "",
//       }));
//     }
//   };

//   const getBoeData = (val) => {
//     if (val === '') {
//       setBOEData([]);
//       return;
//     }

//     axios.get(`${ipaddress}api/receiving/dataAllDataOfCfBondNocForInbondScreen?companyId=${companyid}&branchId=${branchId}&partyName=${val}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {
//         const data = response.data;

//         // Filter unique (boeNo, gateInId) combinations
//         const uniqueMap = new Map();
//         data.forEach(port => {
//           const key = `${port.boeNo}-${port.gateInId}`;
//           if (!uniqueMap.has(key)) {
//             uniqueMap.set(key, port);
//           }
//         });

//         const uniqueData = Array.from(uniqueMap.values());

//         const portOptions = uniqueData.map(port => ({
//           value: port.boeNo,
//           label: `${port.boeNo}-${port.gateInId}`,
//           boeNo: port.boeNo,
//           boeDate: port.boeDate,
//           gateInId: port.gateInId,
//           gateInDate: port.gateInDate,
//           jobNo: port.jobNo,
//           jobDate: port.jobDate,
//           jobTransId: port.jobTransId,
//           jobTransDate: port.jobTransDate,
//           cha: port.cha,
//           editedBy: port.editedBy,
//           type: port.containerType,
//           size: port.containerSize,
//           weight: port.tareWeight,
//           transporterName: port.transporterName,
//           gateInPackages: port.noOfPackages,
//           gateInWeight: port.grossWeight,
//           importerId: port.importerId,
//           importerName: port.importerName,
//           area: port.area,
//         }));
//         if (listOfData.boeNo) {
//           handleBoeChange(portOptions[0], { action: "select" });
//         }
//         // Set BOE Data
//         setBOEData(portOptions);
//       })
//       .catch((error) => {

//       })
//   }

//   const [totalPackages, setTotalPackages] = useState(0);
//   const [rows, setRows] = useState([
//     {
//       companyId: companyid,
//       branchId: branchId,
//       receivingId: '',
//       gateInId: '',
//       srNo: 1,
//       yardLocation: '',
//       yardBlock: '',
//       blockCellNo: '',
//       cellArea: 0.000,
//       cellAreaUsed: 0.000,
//       cellAreaAllocated: 0.000,
//       qtyTakenOut: 0,
//       areaReleased: 0.000,
//       gridReleased: '',
//       receivedPackages: 0,
//       deliveredPackages: 0,
//       status: '',
//       createdBy: '',
//       createdDate: null,
//       editedBy: '',
//       editedDate: null,
//       approvedBy: '',
//       approvedDate: null,
//       jobTransId: "",
//       jobNo: "",
//     },
//   ]);
//   const handleInputChange = (index, e) => {
//     const { name, value } = e.target;
//     const newRows = [...rows];
//     newRows[index][name] = value;

//     // Check if the field being updated is inBondPackages
//     if (name === "receivedPackages") {
//       const currentRow = newRows[index];
//       const maxInBondPackages = currentRow.receivedPackages; // Set this to the actual max from your yard data

//       if (parseFloat(value) > maxInBondPackages) {
//         const errorMessage = `This row's inBondPackages cannot exceed ${maxInBondPackages}.`;
//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           [`inBondPackages-${index}`]: errorMessage,
//         }));
//         toast.error(errorMessage); // Show toast notification
//       } else {
//         setErrors((prevErrors) => {
//           const newErrors = { ...prevErrors };
//           delete newErrors[`receivedPackages-${index}`];
//           return newErrors;
//         });
//       }

//       // Calculate the new total packages
//       const newTotalPackages = newRows.reduce(
//         (sum, row) => sum + (parseFloat(row.receivedPackages) || 0),
//         0
//       );
//       setTotalPackages(newTotalPackages);

//       // Validation: Total packages should not exceed oldInbondPkgs
//       if (newTotalPackages > modalDataInput.oldInbondPkgs) {
//         const errorMessage = `Total packages (${newTotalPackages}) cannot exceed ${modalDataInput.oldInbondPkgs}`;
//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           totalPackages: errorMessage,
//         }));
//         toast.error(errorMessage); // Show toast notification
//       } else {
//         setErrors((prevErrors) => {
//           const newErrors = { ...prevErrors };
//           delete newErrors.totalPackages;
//           return newErrors;
//         });
//       }
//     }

//     // Validation for cellAreaAllocated
//     if (name === "cellAreaAllocated") {
//       const cellArea = parseFloat(rows[index].cellArea);
//       const cellAreaUsed = parseFloat(rows[index].cellAreaUsed);
//       const cellAreaAllocated = parseFloat(value);

//       let addtion;
//       if (inBond.receivingId) {
//         addtion = cellArea
//       }
//       else {
//         addtion = cellArea - cellAreaUsed
//       }
//       // Validation: Cell Area Allocated should not exceed available area
//       if (cellAreaAllocated > (addtion)) {
//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           [`cellAreaAllocated-${index}`]: `Allocated area cannot exceed ${addtion}`,
//         }));
//       } else {
//         setErrors((prevErrors) => {
//           const newErrors = { ...prevErrors };
//           delete newErrors[`cellAreaAllocated-${index}`];
//           return newErrors;
//         });
//       }
//     }
//     setRows(newRows);
//   };

//   const deleteRow = (index) => {
//     const newRows = [...rows];
//     newRows.splice(index, 1);
//     setErrors((prevErrors) => {
//       const newErrors = { ...prevErrors };
//       delete newErrors[`cellAreaAllocated-${index}`];
//       delete newErrors[`yardLocation-${index}`];
//       return newErrors;
//     });
//     setRows(newRows);
//   };


//   const handleSelectChange = (index, selectedOption) => {

//     const fieldName = 'yardLocation';
//     // Prepare the new values from selectedOption
//     const newYardLocation = selectedOption ? selectedOption.yard : '';
//     const newYardBlock = selectedOption ? selectedOption.yardBlock : '';
//     const newBlockCellNo = selectedOption ? selectedOption.yardBCell : '';

//     // Check for duplicates in the yardCellArray
//     const isDuplicate = rows.some((cell, i) =>
//       i !== index &&
//       cell.yardLocation === newYardLocation &&
//       cell.yardBlock === newYardBlock &&
//       cell.blockCellNo === newBlockCellNo
//     );

//     if (isDuplicate) {
//       const errorMsg = "Duplicate location...";
//       // Set the error message for duplicate entry
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         addRow: errorMsg, // Set error message
//       }));

//       // Display the error toast
//       toast.error(errorMsg);

//       // Reset the row values if a duplicate is found
//       const updatedRows = rows.map((row, i) =>
//         i === index
//           ? {
//             yardLocation: "",
//             yardBlock: "",
//             blockCellNo: "",
//             cellArea: "",
//             cellAreaUsed: "",
//             inBondPackages: "",
//             cellAreaAllocated: "",
//           }
//           : row
//       );
//       setRows(updatedRows);

//       return; // Exit the function to prevent further execution
//     }



//     if (selectedOption) {
//       const updatedRows = rows.map((row, i) =>
//         i === index
//           ? {
//             ...row,
//             yardLocation: selectedOption.yard,
//             yardBlock: selectedOption.yardBlock,
//             blockCellNo: selectedOption.yardBCell,
//             cellArea: selectedOption.area,
//             cellAreaUsed: selectedOption.areaUsed,
//             receivedPackages: selectedOption.receivedPackages,
//             cellAreaAllocated: selectedOption.cellAreaAllocated,
//           }
//           : row
//       );
//       setRows(updatedRows);
//     } else {
//       // Clear the row if Select is cleared
//       const updatedRows = rows.map((row, i) =>
//         i === index
//           ? {
//             yardLocation: "",
//             yardBlock: "",
//             blockCellNo: "",
//             cellArea: "",
//             cellAreaUsed: "",
//             receivedPackages: "",
//             cellAreaAllocated: "",
//           }
//           : row
//       );


//       setRows(updatedRows);
//     }
//   };

//   const addRow = () => {

//     // const hasEmptyFields = rows.some(row => 
//     //   !row.yardLocation || !row.yardBlock || !row.blockCellNo || 
//     //   !row.cellArea || !row.inBondPackages || 
//     //   !row.cellAreaAllocated
//     // );

//     // // If there are empty fields, show an error and do not add a new row
//     // if (hasEmptyFields) {
//     //   const errorMsg = "All fields must be filled before adding a new row.";
//     //   setErrors((prevErrors) => ({
//     //     ...prevErrors,
//     //     addRow: errorMsg, // Set error message
//     //   }));
//     //   toast.error(errorMsg); // Display error toast
//     //   return; // Exit the function to prevent adding a new row
//     // }


//     const newTotalPackages = rows.reduce(
//       (sum, row) => sum + (parseFloat(row.inBondPackages) || 0),
//       0
//     );

//     // Check if adding a new row exceeds oldInBondPackages
//     if (newTotalPackages > modalDataInput.oldInbondPkgs) {
//       const errorMessage = `Total packages (${newTotalPackages}) cannot exceed ${modalDataInput.oldInbondPkgs}`;
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         totalPackages: errorMessage,
//       }));
//       toast.error(errorMessage); // Show toast notification
//     } else {
//       setErrors((prevErrors) => {
//         const newErrors = { ...prevErrors };
//         delete newErrors.totalPackages;
//         return newErrors;
//       });
//     }

//     // Clear error if validation is successful
//     setErrors((prevErrors) => {
//       const newErrors = { ...prevErrors };
//       delete newErrors.totalPackages;
//       return newErrors;
//     });

//     // setModalFlag('add');
//     const nextSrNo = rows.length > 0 ? Math.max(...rows.map(row => parseInt(row.srNo, 10))) + 1 : 1;
//     // Add new row
//     setRows([
//       ...rows,
//       {
//         srNo: nextSrNo.toString(), // Incremented serial number
//         yardLocation: "",
//         yardBlock: "",
//         blockCellNo: "",
//         cellArea: "",
//         cellAreaUsed: "",
//         receivedPackages: "",
//         cellAreaAllocated: "",
//       },
//     ]);

//   };

//   const handlePrint = async (type) => {
//     setLoading(true);
//     let inBondingId = inBond.inBondingId;
//     try {
//       const response = await axios.get(`${ipaddress}api/cfinbondcrg/generateCustomeInBondPrint?companyId=${companyid}&branchId=${branchId}&uname=${username}&type=${type}&cname=${companyname}&bname=${branchname}&inBondingId=${inBondingId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`
//           }
//         });

//       console.log("Response Data");
//       console.log(response.data);

//       if (type === 'PDF') {

//         const pdfBase64 = response.data;

//         const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

//         const blobUrl = URL.createObjectURL(pdfBlob);

//         const downloadLink = document.createElement('a');
//         downloadLink.href = blobUrl;
//         downloadLink.download = 'BOND GATEPASS';
//         downloadLink.style.display = 'none';
//         document.body.appendChild(downloadLink);
//         downloadLink.click();
//         document.body.removeChild(downloadLink);
//         window.URL.revokeObjectURL(blobUrl);

//         toast.success("Downloading PDF!", {
//           position: 'top-center',
//           autoClose: 800,
//         });
//       } else if (type === 'PRINT') {
//         const pdfBase64 = response.data;

//         const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

//         const blobUrl = URL.createObjectURL(pdfBlob);

//         window.open(blobUrl, '_blank');
//       } else {
//         throw new Error('Invalid print type');
//       }
//     } catch (error) {
//       console.error('Error in handlePrint:', error.message);

//     } finally {
//       setLoading(false);
//     }
//   };
















//   const axiosInstance = useAxios();
//   const CFSService = new cfsService(axiosInstance);







//   // Document upload
//   const [isModalOpenForDocumentUpload, setIsModalOpenForDocumentUpload] = useState(false);

//   const initialDocumentUpload = {
//     companyId: companyid,
//     branchId: branchId,
//     sbNo: '',
//     sbTransId: '',
//     hSbTransId: '',
//     sbLineNo: '',
//     fileName: '',
//     base64Url: '',
//     fileType: '',
//     isSaved: 'N',
//     isContainerDamage: 'N',
//     isCargoDamage: 'N',
//     damageRemark: '',
//     commodityDescription: ''
//   }

//   const [sbDocumentUpload, setSbDocumentUpload] = useState([initialDocumentUpload]);
//   const [removedList, setRemovedList] = useState([]);


//   const handleOpenDocumentUpload = async (sbNoEntry) => {
//     try {
//       const response = await CFSService.getDataForDocumentuploadGeneral(
//         companyid,
//         branchId,
//         sbNoEntry.receivingId,
//         sbNoEntry.gateInId, sbNoEntry.srNo, sbNoEntry.containerNo, jwtToken
//       );

//       console.log(' response.data \n', response.data);

//       setSbDocumentUpload(
//         response.data?.length > 0
//           ? response.data
//           : [{ ...initialDocumentUpload, sbNo: sbNoEntry.receivingId, commodityDescription: sbNoEntry.commodityDescription, sbTransId: sbNoEntry.containerNo, hSbTransId: sbNoEntry.gateInId, sbLineNo: sbNoEntry.srNo, isSaved: 'N' }]
//       );

//       setIsModalOpenForDocumentUpload(true);
//     } catch (error) {
//       console.error('Error fetching data for document get upload : \n', error);
//       toast.error('An error occurred while fetching data. Please try again.', {
//         position: 'top-center',
//         autoClose: 700,
//       });
//     }
//   };


//   const handleCloseDocumentUpload = async () => {
//     setIsModalOpenForDocumentUpload(false);
//     setSbDocumentUpload([initialDocumentUpload]);
//     setRemovedList([]);
//   }


//   const handleFileUploadFileChange = (event) => {
//     const files = Array.from(event.target.files);

//     if (files.length === 0) return;

//     const maxSize = 10 * 1024 * 1024; // 10MB in bytes

//     const allowedTypes = [
//       "image/jpeg",
//       "image/png",
//       "application/pdf",
//       "application/vnd.ms-excel", // XLS
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX           
//     ];

//     const validFiles = files.filter(
//       (file) => allowedTypes.includes(file.type) && file.size <= maxSize
//     );

//     if (validFiles.length === 0) {
//       alert("Only JPG, PNG, PDF, XLS and XLSX files are allowed (Max: 10MB)!");
//       return;
//     }

//     validFiles.forEach((file) => {
//       const reader = new FileReader();

//       // Read Excel and CSV files as binary string
//       if (file.type.includes("excel")) {
//         reader.readAsBinaryString(file);
//       } else {
//         reader.readAsDataURL(file);
//       }

//       reader.onload = () => {
//         const base64String =
//           file.type.includes("excel")
//             ? btoa(reader.result) // Convert binary to base64
//             : reader.result;

//         setSbDocumentUpload((prev) => {
//           const existingIndex = prev.findIndex((doc) => doc.fileName === "");

//           if (existingIndex !== -1) {
//             // If an empty file entry exists, update it
//             const updatedDocuments = [...prev];
//             updatedDocuments[existingIndex] = {
//               ...updatedDocuments[existingIndex],
//               fileName: file.name,
//               base64Url: base64String,
//               fileType: file.type,
//             };
//             return updatedDocuments;
//           } else {
//             // If no empty entry exists, add a new object
//             return [
//               ...prev,
//               {
//                 companyId: prev[0]?.companyId || "",
//                 branchId: prev[0]?.branchId || "",
//                 sbNo: prev[0]?.sbNo || "",
//                 sbTransId: prev[0]?.sbTransId || "",
//                 hSbTransId: prev[0]?.hSbTransId || "",
//                 sbLineNo: prev[0]?.sbLineNo || "",
//                 commodityDescription: prev[0]?.commodityDescription || "",
//                 isContainerDamage: prev[0]?.isContainerDamage || "",
//                 isCargoDamage: prev[0]?.isCargoDamage || "",
//                 damageRemark: prev[0]?.damageRemark || "",
//                 fileName: file.name,
//                 base64Url: base64String,
//                 fileType: file.type,
//               },
//             ];
//           }
//         });

//         console.log("File Uploaded:", file.name);
//       };

//       reader.onerror = (error) => {
//         console.error("Error reading file:", error);
//       };
//     });
//   };


//   const handleRemoveFile = (index, sbNo, sbLineNo, sbTransId, hsbTransId, isSaved, fileName, commodityDescription, isCargoDamage, isContainerDamage, damageRemark) => {

//     const updatedFiles = sbDocumentUpload.filter((_, i) => i !== index);

//     // If the file is saved, add its name to removedList
//     if (isSaved === 'Y') {
//       setRemovedList(prevList => [...prevList, fileName]);
//     }

//     if (updatedFiles.length === 0) {
//       setSbDocumentUpload([{
//         ...initialDocumentUpload,
//         sbNo: sbNo,
//         sbTransId: sbTransId,
//         hSbTransId: hsbTransId,
//         sbLineNo: sbLineNo,
//         isSaved: 'N',
//         commodityDescription,
//         isCargoDamage, isContainerDamage, damageRemark
//       }]);
//     } else {
//       setSbDocumentUpload(updatedFiles);
//     }
//   };

//   const uploadGeneralDocument = async () => {
//     setLoading(true);

//     let sbFile = sbDocumentUpload[0];
//     try {
//       const response = await CFSService.uploadGeneralDocument(companyid, branchId, sbFile.sbNo, sbFile.sbTransId, sbFile.hSbTransId, sbFile.sbLineNo, sbDocumentUpload, removedList, userId, jwtToken);

//       setSbDocumentUpload(response.data);
//       toast.success('Document uploaded successfully', {
//         position: 'top-center',
//         autoClose: 700,
//       });

//     } catch {
//       toast.error('An error occurred while uploading the files. Please try again.', {
//         position: 'top-center',
//         style: { width: '29vw' },
//         autoClose: 700,
//       });
//     } finally {
//       setLoading(false);
//     }
//   }

//   const [isModalOpenForViewDocument, setIsModalOpenForViewDocument] = useState(false);
//   const [viewFile, setViewFile] = useState('');


//   const handleView = (file) => {
//     setViewFile(file);
//     setIsModalOpenForViewDocument(true);
//   };


//   const renderFile = () => {
//     if (!viewFile) return null;

//     if (viewFile.fileType === 'application/pdf') {
//       return <iframe src={viewFile.base64Url} title="PDF Viewer" style={{ width: '100%', height: '500px' }} />;
//     }
//     else if (viewFile.fileType.startsWith('image/')) {
//       return <img src={viewFile.base64Url} alt="Preview" style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />;
//     }
//     else if (
//       viewFile.fileType === 'application/vnd.ms-excel' ||
//       viewFile.fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//     ) {
//       const handleDownload = () => {
//         const link = document.createElement('a');
//         link.href = viewFile.base64Url;
//         link.download = viewFile.fileName || 'file.xlsx';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//       };

//       return (
//         <div>
//           <p>Excel files cannot be previewed. Click below to download:</p>
//           <Button
//             type="button"
//             className="newButton mt-2 mb-2"
//             color="primary"
//             outline
//             style={{ marginRight: '10px' }}
//             onClick={handleDownload}
//           >
//             <FontAwesomeIcon
//               icon={faDownload}
//               style={{ marginRight: "5px" }}
//             />
//             Download {viewFile.fileName}
//           </Button>



//         </div>
//       );
//     }
//     else if (viewFile.fileType === 'text/csv') {
//       try {
//         const csvText = atob(viewFile.split(',')[1]);
//         const rows = csvText.split('\n').map((row) => row.split(','));

//         return (
//           <table className="table table-bordered">
//             <thead>
//               <tr>{rows[0].map((col, i) => <th key={i}>{col}</th>)}</tr>
//             </thead>
//             <tbody>
//               {rows.slice(1).map((row, i) => (
//                 <tr key={i}>{row.map((col, j) => <td key={j}>{col}</td>)}</tr>
//               ))}
//             </tbody>
//           </table>
//         );
//       } catch (error) {
//         return (
//           <div>
//             <p>Error loading CSV preview. Click below to download:</p>
//             <a href={viewFile} download={viewFile.fileName} className="btn btn-primary">
//               Download {viewFile.fileName}
//             </a>
//           </div>
//         );
//       }
//     }
//     else {
//       return <p>Unsupported file format</p>;
//     }
//   };


//   const handleCloseViewDocument = async () => {
//     setIsModalOpenForViewDocument(false);
//   }






//   const handleChangeDamageDetails = (e) => {
//     const { name } = e.target;
//     const value = e.target.type === 'checkbox' ? (e.target.checked ? 'Y' : 'N') : e.target.value;

//     setSbDocumentUpload((prev) =>
//       prev.map((item) => ({
//         ...item,
//         [name]: value
//       }))
//     );
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
//         {/* <Card>
//           <CardBody> */}
//         <div>
//           <Row>

//             <Modal
//               Modal
//               isOpen={isModalOpenForIGMSearch}
//               onClose={closeIGMSearchModal}
//               toggle={closeIGMSearchModal}
//               style={{
//                 maxWidth: "1200px",
//                 fontSize: 12,
//                 wioverflow: "-moz-hidden-unscrollable",
//               }}
//             >
//               <ModalHeader
//                 toggle={closeIGMSearchModal}
//                 style={{
//                   backgroundColor: "#80cbc4",
//                   color: "black",
//                   fontFamily: "Your-Heading-Font",
//                   textAlign: "center",
//                   background: "#26a69a",
//                   boxShadow: "0px 5px 10px rgba(0, 77, 64, 0.3)",
//                   border: "1px solid rgba(0, 0, 0, 0.3)",
//                   borderRadius: "0",
//                   backgroundImage:
//                     "radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )",
//                   backgroundSize: "cover",
//                   backgroundRepeat: "no-repeat",
//                   //backgroundPosition: 'center',
//                   backgroundPosition: "center",
//                 }}
//               >
//                 <h5
//                   className="pageHead"
//                   style={{
//                     fontFamily: "Your-Heading-Font",
//                     color: "white",
//                   }}
//                 >
//                   {" "}
//                   <FontAwesomeIcon
//                     icon={faSearch}
//                     style={{
//                       marginRight: "8px",
//                       color: "white", // Set the color to golden
//                     }}
//                   />{" "}
//                   Search In Bonding
//                 </h5>
//               </ModalHeader>
//               <ModalBody
//                 style={{
//                   backgroundImage:
//                     "url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)",
//                   backgroundSize: "cover",
//                 }}
//               >
//                 <Row>
//                   <Col md={4}>
//                     <FormGroup>
//                       <label
//                         className="forlabel bold-label"
//                         htmlFor="sbRequestId"
//                       >
//                         Search by Receiving Id / Importer /Job Trans Id
//                       </label>
//                       <input
//                         className="form-control"
//                         type="text"
//                         id="chaSearchId"
//                         maxLength={15}
//                         name="chaSearchId"
//                         value={chaSearchId}
//                         onChange={(e) =>
//                           setChaSearchId(e.target.value)
//                         }
//                       />
//                     </FormGroup>
//                   </Col>
//                   <Col md={4} style={{ marginTop: 24 }}>
//                     <button
//                       className="btn btn-outline-primary btn-margin newButton"
//                       style={{ marginRight: 10 }}
//                       id="submitbtn2"
//                       onClick={() => searchCHA(chaSearchId)}
//                     >
//                       <FontAwesomeIcon
//                         icon={faSearch}
//                         style={{ marginRight: "5px" }}
//                       />
//                       Search
//                     </button>
//                     <button
//                       className="btn btn-outline-danger btn-margin newButton"
//                       style={{ marginRight: 10 }}
//                       id="submitbtn2"
//                       onClick={clearSearch}
//                     >
//                       <FontAwesomeIcon
//                         icon={faRefresh}
//                         style={{ marginRight: "5px" }}
//                       />
//                       Reset
//                     </button>
//                   </Col>
//                 </Row>
//                 <hr />
//                 <div className="mt-1 table-responsive ">
//                   <table className="table table-bordered table-hover tableHeader">
//                     <thead className="tableHeader">
//                       <tr>
//                         <th scope="col">Select</th>
//                         <th scope="col">Receiving Id</th>
//                         <th scope="col">Receiving Date</th>
//                         <th scope="col">Job Trans Id</th>

//                         <th scope="col">Job No </th>
//                         <th scope="col"> BOE No</th>
//                         <th scope="col">BOE Date</th>
//                         <th scope="col">Impoter Name</th>

//                         <th scope="col">Status</th>
//                       </tr>
//                       <tr className="text-center">
//                         <th scope="col"></th>
//                         <th scope="col">{chaSearchedData.length}</th>
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
//                       {currentItems.map((item, index) => (
//                         <tr key={index}>
//                           <td>
//                             <input
//                               type="radio"
//                               name="radioGroup"
//                               onChange={() =>
//                                 selectIGMSearchRadio(
//                                   item.jobTransId,
//                                   item.receivingId,
//                                   item.jobNo,

//                                 )
//                               }
//                               value={item[0]}
//                             />
//                           </td>
//                           <td>{item.receivingId}</td>
//                           <td>{item.receivingDate ? format(new Date(item.receivingDate), 'dd/MM/yyyy HH:mm') : null}</td>
//                           <td>{item.jobTransId}</td>
//                           <td>{item.jobNo}</td>
//                           <td>{item.boeNo}</td>
//                           <td>{item.boeDate ? format(new Date(item.boeDate), 'dd/MM/yyyy HH:mm') : null}</td>
//                           <td>{item.importerName}</td>
//                           <td>{item.status}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                   <Pagination
//                     style={{
//                       display: "flex",
//                       justifyContent: "center",
//                       color: "gray",
//                     }}
//                   >
//                     <Pagination.First onClick={() => handlePageChange(1)} />
//                     <Pagination.Prev
//                       onClick={() => handlePageChange(currentPage - 1)}
//                       disabled={currentPage === 1}
//                     />
//                     <Pagination.Ellipsis />

//                     {displayPages().map((pageNumber) => (
//                       <Pagination.Item
//                         key={pageNumber}
//                         active={pageNumber === currentPage}
//                         onClick={() => handlePageChange(pageNumber)}
//                       >
//                         {pageNumber}
//                       </Pagination.Item>
//                     ))}

//                     <Pagination.Ellipsis />
//                     <Pagination.Next
//                       onClick={() => handlePageChange(currentPage + 1)}
//                       disabled={currentPage === totalPages}
//                     />
//                     <Pagination.Last
//                       onClick={() => handlePageChange(totalPages)}
//                     />
//                   </Pagination>
//                 </div>
//               </ModalBody>
//             </Modal>
//           </Row>

//           {/* <hr /> */}
//           <Row>
//             <Col md={2}>
//               <Row>
//                 <Col md={9}>
//                   <FormGroup>
//                     <label
//                       className="forlabel bold-label"
//                       htmlFor="receivingId"
//                     >
//                       Receiving Id
//                     </label>
//                     <input
//                       className="form-control"
//                       type="text"
//                       id="receivingId"
//                       name="receivingId"
//                       value={inBond.receivingId}
//                       maxLength={27}
//                       disabled

//                     />
//                   </FormGroup>
//                 </Col>

//                 <Col md={3} className="d-flex justify-content-end" style={{ marginTop: 21 }}>
//                   <button
//                     className="btn btn-outline-primary btn-margin newButton"
//                     style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//                     id="submitbtn2"
//                     onClick={openIGMSearchModal}
//                   >
//                     <FontAwesomeIcon
//                       icon={faSearch}
//                     />

//                   </button>
//                 </Col>
//               </Row>

//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="receivingDate"
//                 >
//                   Receiving Date
//                 </label>
//                 <div style={{ position: "relative" }}>
//                   <DatePicker
//                     selected={inBond.receivingDate}
//                     onChange={handleNocTransDate}
//                     id="receivingDate"
//                     name="receivingDate"
//                     dateFormat="dd/MM/yyyy HH:mm"
//                     showTimeSelect
//                     value={inBond.receivingDate}
//                     disabled
//                     timeFormat="HH:mm"
//                     className="form-control border-right-0 inputField"
//                     wrapperClassName="custom-react-datepicker-wrapper"
//                   />
//                   <FontAwesomeIcon
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
//                 <label className="forlabel bold-label" htmlFor="boeNo">
//                   BE/Job No <span className="error-message">*</span>
//                 </label>
//                 <Select
//                   value={inBond.boeNo ? { value: inBond.boeNo, label: isoName } : null}
//                   onChange={handleBoeChange}
//                   // onInputChange={getBoeData}
//                   onInputChange={(inputValue, { action }) => {
//                     if (action === 'input-change') {
//                       getBoeData(inputValue);
//                     }
//                   }}
//                   filterOption={() => true}
//                   options={boeData}
//                   placeholder="Search BE/Job No"
//                   isClearable
//                   id="boeNo"
//                   vesselName="boeNo"
//                   styles={{
//                     control: (provided, state) => ({
//                       ...provided,
//                       height: 32,  // Set the height of the select input
//                       minHeight: 32,
//                       border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
//                       // display: 'flex',
//                       // alignItems: 'center',  // Vertically center the content
//                       // padding: '0 10px',     // Ensure padding is consistent
//                       // borderRadius: '6px',
//                       // width: '100%',
//                       // boxSizing: 'border-box',
//                       // position: 'relative',  // Ensure positioning doesn't cause layout issues
//                     }),

//                     valueContainer: (provided) => ({
//                       ...provided,
//                       // display: 'flex',
//                       alignItems: 'center',  // Vertically center the text
//                       padding: '0 8px',
//                       height: '100%',
//                       whiteSpace: 'nowrap',
//                       textOverflow: 'ellipsis',
//                       lineHeight: '28px',
//                       maxWidth: 'calc(100% - 20px)',
//                       position: 'relative',
//                       overflow: 'visible',
//                     }),

//                     input: (provided) => ({
//                       ...provided,
//                       width: '100%',
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       whiteSpace: 'nowrap',
//                       outline: 'none', // Avoid outline clashes
//                     }),

//                     singleValue: (provided) => ({
//                       ...provided,
//                       lineHeight: '32px',
//                       overflow: 'hidden',
//                       whiteSpace: 'nowrap',
//                       textOverflow: 'ellipsis',
//                     }),

//                     clearIndicator: (provided) => ({
//                       ...provided,
//                       padding: 2,
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       position: 'absolute',
//                       right: 5,
//                       top: '50%',
//                       transform: 'translateY(-50%)', // Vertically center the clear indicator
//                     }),

//                     indicatorSeparator: () => ({
//                       display: 'none', // Remove the separator between indicators
//                     }),

//                     dropdownIndicator: () => ({
//                       display: 'none', // Remove the dropdown arrow
//                     }),

//                     placeholder: (provided) => ({
//                       ...provided,
//                       lineHeight: '32px',
//                       color: 'gray',
//                     }),
//                   }}
//                 />
//                 <div style={{ color: 'red' }} className="error-message">{errors.boeNo}</div>
//               </FormGroup>
//             </Col>

//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="boeDate">
//                   BE Date
//                 </label>
//                 <div style={{ position: "relative" }}>
//                   <DatePicker
//                     selected={inBond.boeDate}
//                     onChange={handleNocValidityDateChnage}
//                     id="boeDate"
//                     name="boeDate"
//                     disabled

//                     dateFormat="dd/MM/yyyy"
//                     className="form-control border-right-0 inputField"
//                     wrapperClassName="custom-react-datepicker-wrapper"
//                     minDate={getMinDate(inBond.boeDate)}
//                   />
//                   <FontAwesomeIcon
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
//                 <div style={{ color: "red" }} className="error-message">
//                   {bondingErrors.nocValidityDate}
//                 </div>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="sbRequestId"
//                 >
//                   Approved By
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="approvedBy"
//                   disabled

//                   maxLength={15}
//                   name="approvedBy"
//                   value={inBond.approvedBy}
//                 />
//               </FormGroup>
//             </Col>

//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="sbRequestId"
//                 >
//                   Status
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="status"
//                   maxLength={15}
//                   disabled

//                   name="status"
//                   value={inBond.status === "A" ? "Approved" : inBond.status === "N" ? "New" : ""}
//                 />
//               </FormGroup>
//             </Col>

//           </Row>
//           <Row>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="gateInId">
//                   Gate In Id
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="gateInId"
//                   maxLength={15}
//                   name="gateInId"
//                   value={inBond.gateInId}
//                   disabled

//                 />
//                 <div style={{ color: "red" }} className="error-message">
//                   {bondingErrors.gateInId}
//                 </div>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="jobNo">
//                   Job No
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="jobNo"
//                   maxLength={15}
//                   name="jobNo"
//                   value={inBond.jobNo}
//                   disabled

//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="docDate">
//                   Job Date
//                 </label>
//                 <div style={{ position: "relative" }}>
//                   <DatePicker
//                     selected={inBond.jobDate}
//                     onChange={handleDocDateChange}
//                     id="nocDate"
//                     disabled

//                     name="nocDate"
//                     dateFormat="dd/MM/yyyy"
//                     className="form-control border-right-0 inputField"

//                     wrapperClassName="custom-react-datepicker-wrapper"
//                   />
//                   <FontAwesomeIcon
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
//                   htmlFor="jobTransDate"
//                 >
//                   Job Trans Date
//                 </label>
//                 <div style={{ position: "relative" }}>
//                   <DatePicker
//                     selected={inBond.jobTransDate}
//                     onChange={handleNocTransDate}
//                     id="jobTransDate"
//                     name="jobTransDate"
//                     dateFormat="dd/MM/yyyy HH:mm"
//                     showTimeSelect
//                     value={inBond.jobTransDate}
//                     disabled

//                     timeFormat="HH:mm"
//                     className="form-control border-right-0 inputField"

//                     wrapperClassName="custom-react-datepicker-wrapper"
//                   />
//                   <FontAwesomeIcon
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
//                 <label className="forlabel bold-label" htmlFor="depositNo">
//                   Deposite No
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="depositNo"
//                   maxLength={15}
//                   name="depositNo"
//                   value={inBond.depositNo}
//                   disabled

//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="sbRequestId"
//                 >
//                   Created By <span className="error-message"></span>
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="createdBy"
//                   disabled

//                   maxLength={15}
//                   name="createdBy"
//                   value={inBond.createdBy}
//                 />
//               </FormGroup>
//             </Col>

//           </Row>

//           <Row>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="spaceAllocated">
//                   Space Allocated
//                 </label>
//                 <select
//                   className="form-control"
//                   id="spaceAllocated"
//                   name="spaceAllocated"
//                   value={inBond.spaceAllocated}
//                   disabled={inBond.receivingId}
//                   onChange={(e) => {
//                     setInBond((prevNOC) => ({
//                       ...prevNOC,
//                       spaceAllocated: e.target.value,
//                     }));
//                   }}
//                 >
//                   <option value="">Select Space</option>
//                   <option value="COVERED">Covered Space</option>
//                   <option value="OPEN">Open Space</option>
//                 </select>
//               </FormGroup>
//             </Col>

//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="cargoCondition">
//                   Cargo Condition <span className="error-message">*</span>
//                 </label>
//                 <select
//                   className={`form-control ${inBond.cargoCondition ? 'border-reset' : ''}`}
//                   id="cargoCondition"
//                   name="cargoCondition"
//                   value={inBond.cargoCondition} // Should match option values
//                   onChange={(e) =>
//                     setInBond((prevNOC) => ({
//                       ...prevNOC,
//                       cargoCondition: e.target.value,
//                     }))
//                   }
//                 >
//                   <option value="">Select </option>
//                   <option value="HDM">Heavy Damage</option>
//                   <option value="LDM">Light Damage</option>
//                   <option value="MDM">Medium Damage</option>
//                   <option value="WOW">Healthy</option>
//                 </select>
//               </FormGroup>
//             </Col>


//             <Col md={4}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="importerName"
//                 >
//                   Importer Name
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="importerName"
//                   maxLength={15}
//                   name="importerName"
//                   value={inBond.importerName}
//                   disabled

//                 />
//               </FormGroup>
//             </Col>
//             <Col md={4}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="cha">
//                   CHA
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="cha"
//                   disabled

//                   maxLength={15}
//                   name="cha"
//                   value={chaName}
//                   onChange={handleNocChange}
//                 />
//                 <div style={{ color: "red" }} className="error-message">
//                   {bondingErrors.cha}
//                 </div>
//               </FormGroup>
//             </Col>
//           </Row>

//           <Row>


//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="areaAllocated"
//                 >
//                   Area Allocated
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="areaAllocated"
//                   maxLength={15}
//                   name="areaAllocated"
//                   value={inBond.areaAllocated}
//                   disabled

//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="areaOccupied"
//                 >
//                   Area Occupied
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="areaOccupied"
//                   maxLength={15}
//                   name="areaOccupied"
//                   value={inBond.areaOccupied}
//                   disabled

//                 />
//                 <div style={{ color: "red" }} className="error-message">
//                   {bondingErrors.uom}
//                 </div>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="gateInPackages"
//                 >
//                   Gate In Packages
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="gateInPackages"
//                   maxLength={15}
//                   name="gateInPackages"
//                   value={inBond.gateInPackages}
//                   onChange={handleNocChange}
//                   disabled

//                 />

//                 <div style={{ color: "red" }} className="error-message">
//                   {bondingErrors.gateInPackages}
//                 </div>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="receivedPackages"
//                 >
//                   Receiving Packages
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="receivedPackages"
//                   maxLength={15}
//                   name="receivedPackages"
//                   value={inBond.receivedPackages}
//                   disabled

//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="gateInWeight"
//                 >
//                   Gate In Weight
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="gateInWeight"
//                   maxLength={15}
//                   name="gateInWeight"
//                   disabled

//                   value={inBond.gateInWeight}
//                   onChange={handleNocChange}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="receivedWeight"
//                 >
//                   Receiving Weight
//                 </label>
//                 <input
//                   disabled

//                   className="form-control"
//                   type="text"
//                   id="receivedWeight"
//                   name="receivedWeight"
//                   value={inBond.receivedWeight}
//                   onChange={handleNocChange}
//                   maxLength={15}
//                 />
//               </FormGroup>
//             </Col>

//           </Row>


//           <Row>

//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="noOf20Ft">
//                   No of 20 FT Containers
//                 </label>

//                 <input
//                   className="form-control"
//                   type="text"
//                   id="noOf20Ft"
//                   maxLength={5}
//                   name="noOf20Ft"
//                   value={inBond.noOf20Ft}
//                   onChange={handleNocChange}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="noOf40Ft">
//                   No of 40 FT Containers
//                 </label>

//                 <input
//                   className="form-control"
//                   type="text"
//                   id="noOf40Ft"
//                   maxLength={5}
//                   name="noOf40Ft"
//                   value={inBond.noOf40Ft}
//                   onChange={handleNocChange}

//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="noOfMarks"
//                 >
//                   Mark Nos
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="noOfMarks"
//                   maxLength={15}
//                   name="noOfMarks"
//                   value={
//                     inBond.noOfMarks != null
//                       ? inBond.noOfMarks
//                       : "0"
//                   }
//                   onChange={handleNocChange}

//                 />
//               </FormGroup>
//             </Col>

//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="crossingCargo">
//                   Crossing Cargo
//                 </label>
//                 <select
//                   className="form-control"
//                   id="crossingCargo"
//                   name="crossingCargo"
//                   value={inBond.crossingCargo}
//                   onChange={(e) =>
//                     setInBond((prevNOC) => ({
//                       ...prevNOC,
//                       crossingCargo: e.target.value,
//                     }))
//                   }
//                 >
//                   <option value="N">NO</option>
//                   <option value="Y">YES</option>

//                 </select>
//               </FormGroup>
//             </Col>
//             <Col md={4}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="comments">
//                   Remarks
//                 </label>

//                 <Input
//                   className="form-control"
//                   type="textarea"
//                   id="comments"
//                   maxLength={149}
//                   name="comments"
//                   value={inBond.comments}
//                   onChange={handleNocChange}

//                 />
//               </FormGroup>
//             </Col>
//           </Row>
//           {/* <Row>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="cargoDuty">
//                 Cargo Duty
//                 </label>

//                 <input
//                   className="form-control"
//                   type="text"
//                   id="cargoDuty"
//                   maxLength={5}
//                   name="cargoDuty"
//                   value={
//                     inBond.cargoDuty != null
//                       ? inBond.cargoDuty
//                       : "0"
//                   }
//                   onChange={handleNocChange}

//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="cargoValue"
//                 >
//                 Cargo Value
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="cargoValue"
//                   maxLength={15}
//                   name="cargoValue"
//                   value={
//                     inBond.cargoValue != null
//                       ? inBond.cargoValue
//                       : "0"
//                   }
//                   onChange={handleNocChange}

//                 />
//               </FormGroup>
//             </Col>
//           </Row> */}

//           <Row>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="handlingEquip1">
//                   Handling Equipment <span className="error-message">*</span>
//                 </label>
//                 <select
//                   className={`form-control ${inBond.handlingEquip1 ? 'border-reset' : ''}`}
//                   id="handlingEquip1"
//                   name="handlingEquip1"
//                   value={inBond.handlingEquip1} // Should match option values
//                   onChange={(e) =>
//                     setInBond((prevNOC) => ({
//                       ...prevNOC,
//                       handlingEquip1: e.target.value,
//                     }))
//                   }
//                 >
//                   <option value="">Select </option>
//                   <option value="Fork">Fork</option>
//                   <option value="Labour">Labour</option>
//                   <option value="Hydra">Hydra</option>
//                 </select>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="handlingEquip2">
//                   Handling Equipment 2 <span className="error-message">*</span>
//                 </label>
//                 <select
//                   className={`form-control ${inBond.handlingEquip2 ? 'border-reset' : ''}`}
//                   id="handlingEquip2"
//                   name="handlingEquip2"
//                   value={inBond.handlingEquip2} // Should match option values
//                   onChange={(e) =>
//                     setInBond((prevNOC) => ({
//                       ...prevNOC,
//                       handlingEquip2: e.target.value,
//                     }))
//                   }
//                 >
//                   <option value="">Select </option>
//                   <option value="Fork">Fork</option>
//                   <option value="Labour">Labour</option>
//                   <option value="Hydra">Hydra</option>
//                 </select>
//               </FormGroup>
//             </Col>

//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="handlingEquip3">

//                   Handling Equipment 3
//                 </label>
//                 <select
//                   className={`form-control ${inBond.handlingEquip3 ? 'border-reset' : ''}`}
//                   id="handlingEquip3"
//                   name="handlingEquip3"
//                   value={inBond.handlingEquip3} // Should match option values
//                   onChange={(e) =>
//                     setInBond((prevNOC) => ({
//                       ...prevNOC,
//                       handlingEquip3: e.target.value,
//                     }))
//                   }
//                 >
//                   <option value="">Select </option>
//                   <option value="Fork">Fork</option>
//                   <option value="Labour">Labour</option>
//                   <option value="Hydra">Hydra</option>
//                 </select>
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="cargoDuty">
//                   Cargo Duty
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="cargoDuty"
//                   maxLength={16} // 13 digits + 1 decimal + 2 decimals
//                   name="cargoDuty"
//                   value={inBond.cargoDuty != null ? inBond.cargoDuty : "0.00"}
//                   pattern="^\d{0,13}(\.\d{0,2})?$"
//                   step="0.01"
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     if (/^\d{0,13}(\.\d{0,2})?$/.test(value) || value === "") {
//                       handleNocChange(e);
//                     }
//                   }}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={2}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="cargoValue">
//                   Cargo Value
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   id="cargoValue"
//                   maxLength={16} // 13 digits + 1 decimal + 2 decimals
//                   name="cargoValue"
//                   value={inBond.cargoValue != null ? inBond.cargoValue : "0.00"}
//                   pattern="^\d{0,13}(\.\d{0,2})?$"
//                   step="0.01"
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     if (/^\d{0,13}(\.\d{0,2})?$/.test(value) || value === "") {
//                       handleNocChange(e);
//                     }
//                   }}
//                 />
//               </FormGroup>
//             </Col>
//           </Row>

//         </div>
//         <hr />
//         <Row className="text-center">
//           <Col>
//             <button
//               className="btn btn-outline-primary btn-margin newButton"
//               style={{ marginRight: 10 }}
//               id="submitbtn2"
//               // disabled={inBond.status==="A"}
//               onClick={handleSave}
//             >
//               <FontAwesomeIcon
//                 icon={faSave}
//                 style={{ marginRight: "5px" }}
//               />
//               Save
//             </button>

//             {/* <button
//                   className="btn btn-outline-primary btn-margin newButton"
//                   style={{ marginRight: 10 }}
//                   id="submitbtn2"
//                   disabled={inBond.status==="A"}
//                   onClick={handleSubmit}
//                 >
//                   <FontAwesomeIcon
//                     icon={faSave}
//                     style={{ marginRight: "5px" }}
//                   />
//                   Submit
//                 </button> */}

//             {/* {inBond.status ==="A" ?
// (
// <button
//               className="btn btn-outline-primary btn-margin newButton"
//               style={{ marginRight: 10 }}
//               id="submitbtn2"
//               onClick={()=> handlePrint('PRINT')}
//             >
//               <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
//               Print
//             </button>

// ):null} */}
//             <button
//               className="btn btn-outline-primary btn-margin newButton"
//               style={{ marginRight: 10 }}
//               // disabled={inBond.status==="A"}
//               onClick={addRow} >
//               <FontAwesomeIcon icon={faAdd} style={{ marginRight: "5px" }} />
//               Add Row
//             </button>

//             <button
//               className="btn btn-outline-danger btn-margin newButton"
//               style={{ marginRight: 10 }}
//               id="submitbtn2"
//               onClick={handleClear}
//             >
//               <FontAwesomeIcon
//                 icon={faRefresh}
//                 style={{ marginRight: "5px" }}
//               />
//               Clear
//             </button>
//           </Col>
//         </Row>
//         <hr />


//         <div className="mt-1 table-responsive ">
//           <table className="table table-bordered table-hover tableHeader">
//             <thead className='tableHeader'>
//               <tr>
//                 <th scope="col" className="text-center" style={{ color: "black" }} >Select Yard Location <span className="error-message">*</span></th>
//                 <th scope="col" className="text-center" style={{ color: "black" }} >   Yard Location  <span className="error-message">*</span>   </th>
//                 <th scope="col" className="text-center" style={{ color: "black" }} >   Yard Block    </th>
//                 <th scope="col" className="text-center" style={{ color: "black" }} >Cell</th>
//                 <th scope="col" className="text-center" style={{ color: "black" }} >Cell Area</th>
//                 <th scope="col" className="text-center" style={{ color: "black" }} >Cell Area Used</th>
//                 <th scope="col" className="text-center" style={{ color: "black" }} >Yard Packages <span className="error-message">*</span></th>
//                 <th scope="col" className="text-center" style={{ color: "black" }} >Cell Area Allocated <span className="error-message">*</span></th>
//               </tr>
//             </thead>
//             <tbody>
//               {rows.map((row, index) => (
//                 <tr key={index}>
//                   <td>
//                     <Select

//                       isClearable
//                       menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
//                       menuPosition="fixed" // Sets the dropdown menu position to fixed    
//                       menuPlacement="top"
//                       onMenuOpen={() => {
//                         if (!inBond.spaceAllocated) {

//                           toast.error("Select Space Allocated first", {
//                             position: 'top-center',
//                             autoClose: 1000,
//                           });
//                           // alert("Space Allocated is not available.");
//                         }
//                       }}
//                       options={yardLocationsData.map((party) => ({
//                         value: `${party.yardLocationId}-${party.blockId}-${party.cellNoRow}`,
//                         label: `${party.yardLocationId}-${party.blockId}-${party.cellNoRow}`,
//                         areaUsed: party.cellAreaUsed,
//                         area: party.cellArea,
//                         yard: party.yardLocationId,
//                         yardBlock: party.blockId,
//                         yardBCell: party.cellNoRow,
//                         cellAreaUsed: party.cellAreaUsed,
//                         receivedPackages: party.receivedPackages,
//                         cellAreaAllocated: party.cellAreaAllocated,
//                       }))}
//                       onChange={(selectedOption) =>
//                         handleSelectChange(index, selectedOption)
//                       }
//                       styles={{
//                         container: (base) => ({ ...base, width: '180px' }),
//                         menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Ensure the dropdown is above other elements
//                       }}

//                     />
//                   </td>
//                   <td>
//                     <Input
//                       className="form-control"
//                       type="text"
//                       value={row.yardLocation}
//                       name='yardLocation'
//                       disabled
//                       style={{
//                         borderColor:
//                           errors[`yardLocation-${index}`] ? "red" : "",
//                       }}
//                     />
//                     {errors[`yardLocation-${index}`] && (
//                       <span style={{ color: "red" }}>
//                         {errors[`yardLocation-${index}`]}
//                       </span>
//                     )}

//                   </td>
//                   <td>
//                     <Input
//                       className="form-control"
//                       type="text"
//                       name="yardBlock"
//                       value={row.yardBlock}
//                       disabled
//                     />

//                   </td>
//                   <td>
//                     <Input
//                       className="form-control"
//                       type="text"
//                       name="blockCellNo"
//                       value={row.blockCellNo}

//                       disabled
//                     />
//                   </td>
//                   <td>
//                     <Input
//                       className="form-control"
//                       type="text"
//                       value={row.cellArea}
//                       name="cellArea"

//                       disabled
//                     />
//                   </td>
//                   <td>
//                     <Input
//                       className="form-control"
//                       type="text"
//                       name="cellAreaUsed"
//                       value={row.cellAreaUsed}

//                       disabled
//                     />
//                   </td>
//                   <td>
//                     <Input
//                       className="form-control"
//                       type="text"
//                       value={row.receivedPackages}
//                       name="receivedPackages"
//                       onChange={(e) => handleInputChange(index, e)}
//                       style={{
//                         borderColor: errors[`receivedPackages-${index}`] ? "red" : "",
//                       }}
//                     />
//                     {errors[`receivedPackages-${index}`] && (
//                       <span style={{ color: "red" }}>
//                         {errors[`receivedPackages-${index}`]}
//                       </span>
//                     )}
//                   </td>
//                   <td>
//                     <Input
//                       className="form-control"
//                       type="text"
//                       name="cellAreaAllocated"
//                       value={row.cellAreaAllocated}
//                       onChange={(e) => handleInputChange(index, e)}
//                       disabled={inBond.spaceAllocated === 'OPEN'}
//                       style={{
//                         borderColor:
//                           errors[`cellAreaAllocated-${index}`] ? "red" : "",
//                       }}
//                     />
//                     {errors[`cellAreaAllocated-${index}`] && (
//                       <span style={{ color: "red" }}>
//                         {errors[`cellAreaAllocated-${index}`]}
//                       </span>
//                     )}
//                   </td>
//                   {/* <td>
//                 {row.inBondingId }
//                 <button
//                   onClick={() => deleteRow(index)}
//                   className="btn btn-danger"
//                 >
//                   <FontAwesomeIcon icon={faXmark} />
//                 </button>
//                               </td> */}

//                   {!row.inBondingId && row.status !== 'A' && (
//                     <>
//                       <td>
//                         {/* <button
//                           onClick={() => deleteRow(index)}
//                           disabled={row.status === 'A'}
//                           className="btn btn-danger"
//                         >
//                           <FontAwesomeIcon icon={faXmark} />
//                         </button> */}


//                         <Button type="button" onClick={() => deleteRow(index)}
//                           className="newButton"
//                           color="danger"
//                           outline>
//                           <FontAwesomeIcon icon={faTrash} />
//                         </Button>

//                       </td>
//                     </>
//                   )}

//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {errors.totalPackages && (
//             <div style={{ color: "red" }}>{errors.totalPackages}</div>
//           )}
//         </div>
//         {/* <Row className="text-center">
//     <Col  className="d-flex justify-content-center" style={{ marginTop: '24px' }}>
//         <button
//             className="btn btn-outline-primary btn-margin newButton"
//             style={{ marginRight: 10 }}
//             id="submitbtn2"
//             // disabled={inBond.status==="A"}
//             onClick={handleSaveCfBondGrid}
//         >
//             <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
//             Save
//         </button>


//         <button
//             className="btn btn-outline-danger btn-margin newButton"
//             style={{ marginRight: 10 }}
//             id="submitbtn2"
//             onClick={() => handleYardReset()}
//         >
//             <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
//             Reset
//         </button>
//     </Col>
// </Row> */}
//         <hr />

//         <div
//           className="table-responsive"
//           style={{ maxHeight: "400px", overflowY: "auto" }}
//         >
//           <h5
//             className="pageHead"
//             style={{
//               fontFamily: "Your-Heading-Font",
//               paddingLeft: "2%",
//               paddingRight: "-20px",
//             }}
//           >
//             {" "}
//             <FontAwesomeIcon
//               icon={faGroupArrowsRotate}
//               style={{
//                 marginRight: "8px",
//                 color: "black", // Set the color to golden
//               }}
//             />
//             Receiving Cargo Details
//           </h5>
//           <table className="table table-bordered table-hover tableHeader" >
//             <thead className="tableHeader"  >
//               <tr>
//                 <th
//                   scope="col"
//                   className="text-center"
//                   style={{ color: "black" }}
//                 >
//                   <input
//                     type="checkbox"
//                     style={{ transform: "scale(1.5)" }}
//                     checked={selectAll}
//                     onChange={(event) => handleSelectAll(event)}
//                     disabled={inBond.receivingId}
//                   />
//                 </th>
//                 <th
//                   scope="col"
//                   className="text-center"
//                   style={{ color: "black" }}
//                 >
//                   Sr No.
//                 </th>
//                 <th
//                   scope="col"
//                   className="text-center"
//                   style={{ color: "black" }}
//                 >
//                   Commodity
//                 </th>
//                 <th
//                   scope="col"
//                   className="text-center"
//                   style={{ color: "black" }}
//                 >
//                   Type Of Package
//                 </th>
//                 <th
//                   scope="col"
//                   className="text-center"
//                   style={{ color: "black" }}
//                 >
//                   JOB Package
//                 </th>

//                 <th
//                   scope="col"
//                   className="text-center"
//                   style={{ color: "black" }}
//                 >
//                   Gate In Package
//                 </th>

//                 <th
//                   scope="col"
//                   className="text-center"
//                   style={{ color: "black" }}
//                 >
//                   Gate In Weight
//                 </th>
//                 <th
//                   scope="col"
//                   className="text-center"
//                   style={{ color: "black" }}
//                 >
//                   Gate In Id
//                 </th>

//                 <th
//                   scope="col"
//                   className="text-center"
//                   style={{ color: "black" }}
//                 >
//                   Gate In Date
//                 </th>

//                 <th
//                   scope="col"
//                   className="text-center"
//                   style={{ color: "black" }}
//                 >
//                   Vehicle No
//                 </th>

//                 <th
//                   scope="col"
//                   className="text-center"
//                   style={{ color: "black" }}
//                 >
//                   Container No
//                 </th>

//                 <th
//                   scope="col"
//                   className="text-center"
//                   style={{ color: "black" }}
//                 >
//                   Container Size
//                 </th>

//                 <th
//                   scope="col"
//                   className="text-center"
//                   style={{ color: "black" }}
//                 >
//                   Container Type
//                 </th>

//                 <th
//                   scope="col"
//                   className="text-center"
//                   style={{ color: "black" }}
//                 >
//                   Old Recived PKG
//                 </th>

//                 <th
//                   scope="col"
//                   className="text-center"
//                   style={{ color: "black" }}
//                 >
//                   Bal Receiving PKG <span className="error-message">*</span>
//                 </th>
//                 <th
//                   scope="col"
//                   className="text-center"
//                   style={{ color: "black" }}
//                 >
//                   Bal Receiving Weight  <span className="error-message">*</span>
//                 </th>
//                 <th
//                   scope="col"
//                   className="text-center"
//                   style={{ color: "black" }}
//                 >
//                   Receiving Package
//                 </th>
//                 <th
//                   scope="col"
//                   className="text-center"
//                   style={{ color: "black" }}
//                 >
//                   Receiving Weight
//                 </th>

//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Damage Documents</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.map((dtl, index) => (
//                 <tr key={index} className="text-center">
//                   <td>
//                     <input
//                       type="checkbox"
//                       style={{ transform: "scale(1.5)" }}
//                       disabled={dtl.receivingId}
//                       checked={
//                         (inBond.receivingId === dtl.receivingId) ||
//                         selectedRows.some
//                           ((selectedRow) =>
//                             selectedRow.jobTransId === dtl.jobTransId &&
//                             selectedRow.jobNo === dtl.jobNo &&
//                             selectedRow.commodityId === dtl.commodityId &&
//                             selectedRow.srNo === dtl.srNo
//                           )
//                       }
//                       onChange={(e) => handleCheckboxChangeForDtl(e, dtl)}
//                     />
//                   </td>
//                   <th scope="row">{index + 1}</th>
//                   <td>{dtl.commodityDescription}</td>
//                   <td>{dtl.typeOfPackage}</td>
//                   <td>{dtl.jobNop}</td>
//                   <td>{dtl.noOfPackages || dtl.gateInPackages}</td>
//                   <td>{dtl.grossWeight || dtl.gateInWeight}</td>

//                   <td>{dtl.gateInId}</td>
//                   <td>{dtl.gateInDate ? format(new Date(dtl.gateInDate), 'dd/MM/yyyy HH:mm') : ''}</td>
//                   <td>{dtl.vehicleNo}</td>
//                   <td>{dtl.containerNo}</td>
//                   <td>{dtl.containerSize}</td>
//                   <td>{dtl.containerType}</td>

//                   {/* <td>{dtl.receivingPackages != null ? dtl.receivingPackages : 0}</td> */}

//                   <td>{inputValues[index]?.oldReceivedPackages}</td>
//                   {/* <td>{dtl.balanceReceivedPackages}</td>
//                   <td>{dtl.balanceReceivedWeight}</td> */}

//                   {/* 

//                   <td>{dtl.balanceReceivedPackages || dtl.balanceReceivedPackages}</td>
//                   <td>{dtl.balanceReceivedWeight || dtl.balanceReceivedWeight}</td> */}

//                   {/* <td>{inputValues[index]?.oldReceivedPackages}</td> */}
//                   <td>{inputValues[index]?.balanceReceivedPackages}</td>
//                   <td>{inputValues[index]?.balanceReceivedWeight}</td>

//                   <td style={{ textAlign: "center" }}>
//                     <input
//                       className="form-control"
//                       style={{ width: "126px" }}
//                       type="text"
//                       value={inputValues[index]?.receivingPackages}
//                       placeholder="Enter PKGS"
//                       onChange={(e) => {
//                         const regex = /^[0-9]*\.?[0-9]*$/;
//                         if (regex.test(e.target.value)) {
//                           handleInputChangeFotDtl(
//                             e,
//                             "receivingPackages",
//                             index
//                           )
//                         }
//                       }}
//                       onPaste={(e) => {
//                         const pastedData = e.clipboardData.getData("text");
//                         if (!/^[0-9]*\.?[0-9]*$/.test(pastedData)) {
//                           e.preventDefault();
//                         }
//                       }}
//                     />

//                     {inputValues[index]?.errorMessage &&
//                       inputValues[index]?.errorMessage.includes(
//                         "Receiving Packages"
//                       ) && (
//                         <span style={{ color: "red", fontSize: "12px" }}>
//                           {inputValues[index]?.errorMessage}
//                         </span>
//                       )}
//                   </td>
//                   <td style={{ textAlign: "center" }}>
//                     <input
//                       className="form-control"
//                       disabled
//                       style={{ width: "126px" }}
//                       type="number"
//                       value={inputValues[index]?.receivingWeight}
//                       onChange={(e) =>
//                         handleInputChangeFotDtl(e, "receivingWeight", index, 13, 3)
//                       }
//                     />
//                   </td>


//                   <td className="text-center">
//                     {((role === 'ROLE_ADMIN' || allowEdit) && dtl.receivingId) && (
//                       <FontAwesomeIcon
//                         icon={faUpload}
//                         onClick={() => handleOpenDocumentUpload(dtl)}
//                         style={{ color: 'green', cursor: 'pointer', fontSize: '24px' }}
//                       />
//                     )}

//                   </td>


















//                 </tr>
//               ))}
//             </tbody>
//           </table>






//         </div>

//       </div>















//       {/* Document Upload */}

//       <Modal Modal isOpen={isModalOpenForDocumentUpload} onClose={handleCloseDocumentUpload} toggle={handleCloseDocumentUpload} style={{ maxWidth: '1000px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>

//         <ModalHeader toggle={handleCloseDocumentUpload} style={{
//           backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
//           boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
//           border: '1px solid rgba(0, 0, 0, 0.3)',
//           borderRadius: '0',
//           backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
//           backgroundSize: 'cover',
//           backgroundRepeat: 'no-repeat',
//           backgroundPosition: 'center',
//         }} >

//           <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', color: 'white' }} > <FontAwesomeIcon
//             icon={faUpload}
//             style={{
//               marginRight: '8px',
//               color: 'white',
//             }}
//           />Container Document Upload</h5>

//         </ModalHeader>
//         <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
//           <Row>

//             <Col md={3}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbNo">
//                   Container No
//                 </label>
//                 <Input
//                   className="form-control"
//                   type="text"
//                   maxLength={15}
//                   name='sbNo'
//                   value={sbDocumentUpload[0]?.sbTransId || ""}
//                   disabled
//                 />
//               </FormGroup>
//             </Col>

//             <Col md={3}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="sbTransId">
//                   Commodity Description
//                 </label>
//                 <input
//                   className="form-control"
//                   type="text"
//                   maxLength={15}
//                   name='SbTransId'
//                   value={sbDocumentUpload[0]?.commodityDescription || ""}
//                   disabled
//                 />
//               </FormGroup>
//             </Col>



//             <Col md={6}>
//               <FormGroup>
//                 <label className="forlabel bold-label" htmlFor="fileUpload">
//                   Upload File (Image/PDF/XLS)
//                 </label>
//                 <input
//                   type="file"
//                   className="form-control"
//                   id="fileUpload"
//                   multiple
//                   accept="image/png, image/jpeg, application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//                   onChange={handleFileUploadFileChange}
//                 />
//               </FormGroup>
//             </Col>
//           </Row>

//           <Row>

//             <Col xs={12} md={6}>

//               <Row>


//                 <Col xs={12} md={6}>
//                   <FormGroup>
//                     <label className="forlabel bold-label" htmlFor="isContainerDamage">
//                       Container Damage
//                     </label>
//                     <Input
//                       className={`form-control`}
//                       type="checkbox"
//                       name='isContainerDamage'
//                       checked={sbDocumentUpload[0]?.isContainerDamage === 'Y'}
//                       onChange={handleChangeDamageDetails}
//                       style={{ width: '20px', height: '24px', cursor: 'pointer', margin: '0' }}
//                     />
//                   </FormGroup>
//                 </Col>


//                 <Col xs={12} md={6}>
//                   <FormGroup>
//                     <label className="forlabel bold-label" htmlFor="isCargoDamage">
//                       Cargo Damage
//                     </label>
//                     <Input
//                       className={`form-control`}
//                       type="checkbox"
//                       name='isCargoDamage'
//                       checked={sbDocumentUpload[0]?.isCargoDamage === 'Y'}
//                       onChange={handleChangeDamageDetails}
//                       style={{ width: '20px', height: '24px', cursor: 'pointer', margin: '0' }}
//                     />
//                   </FormGroup>
//                 </Col>
//               </Row>
//             </Col>

//             <Col md={6}>
//               <FormGroup>
//                 <label
//                   className="forlabel bold-label"
//                   htmlFor="damageRemark"
//                 >
//                   Remark
//                 </label>
//                 <textarea
//                   className="form-control"
//                   id="damageRemark"
//                   name='damageRemark'
//                   value={sbDocumentUpload[0]?.damageRemark}
//                   onChange={handleChangeDamageDetails}
//                   maxLength={300}
//                   rows={2}
//                 ></textarea>
//               </FormGroup>
//             </Col>


//           </Row>





//           {sbDocumentUpload.length > 0 && sbDocumentUpload.some(file => file.fileName) && (
//             <div className="file-scroll-container">
//               <Row className="flex-nowrap">
//                 {sbDocumentUpload.map((file, index) => (
//                   file.base64Url && (
//                     <Col key={index} md="auto">
//                       <div className="file-preview-wrapper">
//                         <div className="file-preview">
//                           <span className="remove-btn" onClick={() => handleRemoveFile(index, file.sbNo, file.sbLineNo, file.sbTransId, file.hSbTransId, file.isSaved, file.fileName, file.commodityDescription, file.isCargoDamage, file.isContainerDamage, file.damageRemark)}>&times;</span>
//                           <div onClick={() => handleView(file)}>
//                             {file.fileType === "application/pdf" ? (
//                               <img src={pdfLogo} alt="PDF Preview" className="file-thumbnail" />
//                             ) : file.fileType === "application/vnd.ms-excel" ||
//                               file.fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
//                               file.fileType === "text/csv" ? (
//                               <img src={xlsLogo} alt="Excel/CSV Preview" className="file-thumbnail" />
//                             ) : (
//                               <img src={file.base64Url} alt={file.fileName} className="file-thumbnail" />
//                             )}
//                           </div>

//                         </div>
//                         <p className="file-name">{file.fileName}</p>
//                       </div>
//                     </Col>
//                   )
//                 ))}
//               </Row>
//             </div>
//           )}


//           <Row className="text-center mt-1 mb-1">
//             <Col>
//               <button
//                 className="btn btn-outline-primary btn-margin newButton"
//                 style={{ marginRight: 10, fontWeight: 'bold' }}
//                 id="submitbtn2"
//                 onClick={uploadGeneralDocument}
//               >
//                 <FontAwesomeIcon icon={faUpload} style={{ marginRight: "5px" }} />
//                 Upload
//               </button>
//             </Col>
//           </Row>
//         </ModalBody>
//       </Modal >


//       <Modal Modal isOpen={isModalOpenForViewDocument} onClose={handleCloseViewDocument} toggle={handleCloseViewDocument} style={{ maxWidth: '1000px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>

//         <ModalHeader toggle={handleCloseViewDocument} style={{
//           backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
//           boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
//           border: '1px solid rgba(0, 0, 0, 0.3)',
//           borderRadius: '0',
//           backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
//           backgroundSize: 'cover',
//           backgroundRepeat: 'no-repeat',
//           backgroundPosition: 'center',
//         }} >
//           <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', color: 'white' }} > <FontAwesomeIcon
//             icon={faEye}
//             style={{
//               marginRight: '8px',
//               color: 'white',
//             }}
//           />View Document</h5>

//         </ModalHeader>
//         <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg)', backgroundSize: 'cover' }}>
//           {renderFile()}
//         </ModalBody>
//       </Modal >















































//     </>
//   );
// }

// export default ReceingGeneralCargo;










import AuthContext from "../Components/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import Select from "react-select";
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
  faCalculator,
  faCertificate,
  fas,
  faEdit,
  faGroupArrowsRotate,
  faPrint,
  faPlaneArrival,
  faXmark,
  faEye,
  faAtom,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/style.css";
import "../Components/Style.css";
import useAxios from "../Components/useAxios";
import cfsService from "../service/CFSService";
import { toast } from "react-toastify";
import ipaddress from "../Components/IpAddress";
import {
  Row,
  Col,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  Table,
  ModalFooter,
  FormFeedback,
  Button,
} from "reactstrap";
import { Pagination } from "react-bootstrap";
import { format } from "date-fns";
import pdfLogo from "../Images/pdfLogo.png";
import xlsLogo from "../Images/xlsLogo.png";



function ReceingGeneralCargo({ noctrans, nocno, acttab, boe, listOfData, listOfInbond, flag, onRequest }) {
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

  const queryParams = new URLSearchParams(location.search);
  const processId = queryParams.get("process_id");

  const foundRights =
    role !== "ROLE_ADMIN"
      ? userRights.find((item) => item.process_Id === processId)
      : null;
  const allowCreate = foundRights?.allow_Create === "Y";
  const allowRead = foundRights?.allow_Read === "Y";
  const allowEdit = foundRights?.allow_Update === "Y";
  const allowDelete = foundRights?.allow_Delete === "Y";

  const [inbondFlag, setInBondFlag] = useState("add");

  const initialNoc = {
    companyId: companyid,
    branchId: branchId,
    receivingId: "",
    depositNo: "",
    importerName: "",
    onAccountOf: "",
    deliveryId: "",
    receivingDate: new Date(),
    profitcentreId: "N00008",
    shift: "",
    gateInId: "",
    docType: "",
    boeNo: "",
    boeDate: "",
    invoiceNo: "",
    invoiceDate: "",
    challanNo: "",
    challanDate: "",
    processId: "",
    cha: "",
    importerId: "",
    crossingCargo: "",
    noOfMarks: "",
    commodityDescription: "",
    grossWeight: "",
    typeOfPackage: "",
    uom: "",
    containerNo: "",
    containerSize: "",
    containerType: "",
    areaOccupied: "",
    cargoCondition: "",
    gateInPackages: "",
    totalDeliveredPkg: "",
    receivedPackages: "",
    deliveredPackages: "0",
    spaceAllocated: "",
    shortQty: "",
    comments: "",
    invoiceStatus: "",
    status: "",
    createdBy: "",
    createdDate: "",
    editedBy: "",
    editedDate: "",
    approvedBy: "",
    approvedDate: "",
    damageRemark: "",
    remark: "",
    jobNo: "",
    model: "",
    cfs: "",
    noOf20Ft: "",
    noOf40Ft: "",
    assesmentId: "",
    handlingEquip1: "",
    handlingEquip2: "",
    handlingEquip3: "",
    owner1: "",
    owner2: "",
    owner3: "",
    source: "",
    transporter: "",
    transporterName: "",
    commodityId: "",
    jobDtlTransId: "",
    areaAllocated: "",
    gateInWeight: "",
    receivedWeight: "",
    jobDate: "",
    jobTransDate: "",
    cargoDuty: "",
    cargoValue: "",
  };


  const initialNocDtl = {
    companyId: companyid, // String
    branchId: branchId, // String
    lineNo: "", // String
    jobNop: "",
    jobWeight: "",
    receivingId: "", // String
    gateInId: "", // String
    gateInDate: null, // Date (use null or a Date object if you prefer)
    containerNo: "", // String
    containerSize: "", // String
    containerType: "", // String
    vehicleNo: "", // String
    gateInPackages: "0", // String
    gateInWeight: "0", // String
    receivingPackages: "0", // String
    receivingWeight: "0", // String
    status: "", // String
    qtyTakenOut: "", // String
    weightTakenOut: null, // BigDecimal (use null or a number)
    commodityDescription: "", // String
    typeOfPackages: "", // String
    commodityId: "", // String
    jobDtlTransId: "", // String
    createdBy: "", // String
    createdDate: null, // Date (use null or a Date object if you prefer)
    editedBy: "", // String
    editedDate: null, // Date (use null or a Date object if you prefer)
    approvedBy: "", // String
    approvedDate: null, // Date (use null or a Date object if you prefer)
  };



  const [nocTansIdSearchId, setNocTransIdSearchId] = useState("");


  const [isModalOpenForIGMSearch, setisModalOpenForIGMSearch] = useState(false);
  const openIGMSearchModal = () => {
    setisModalOpenForIGMSearch(true);
    searchCHA("");
  };

  const closeIGMSearchModal = () => {
    setisModalOpenForIGMSearch(false);
    setChaSearchId("");
    setCHASearchedData([]);
  };

  const [chaSearchId, setChaSearchId] = useState("");
  const [chaSearchedData, setCHASearchedData] = useState([]);

  const searchCHA = (id) => {
    setLoading(true);
    axios
      .get(
        `${ipaddress}api/receiving/search?companyId=${companyid}&branchId=${branchId}&partyName=${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        setCHASearchedData(response.data);
        setLoading(false);
        setCurrentPage(1);

        console.log("response.data", response.data);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const clearSearch = () => {
    setChaSearchId("");
    searchCHA("");
  };
  const [chaName, setChaName] = useState("");
  useEffect(() => {
    if (acttab == "P01803") {

      if (listOfData.jobTransId && listOfData.jobNo && listOfData.boeNo && listOfInbond.receivingId) {
        selectIGMSearchRadio(listOfData.jobTransId, listOfInbond.receivingId, listOfData.jobNo);
      }
      else {
        getBoeData(listOfData.boeNo);
      }
      if (flag) {
        handleClear();
      }
    }
  }, [listOfData.jobTransId, listOfInbond.receivingId, listOfData.jobNo, acttab]);

  const selectIGMSearchRadio = (
    trasid,
    inbondingId,
    nocNo,
  ) => {
    closeIGMSearchModal();
    axios
      .get(
        `${ipaddress}api/receiving/getDataByTransIdANDNocIDAndInBondingId?companyId=${companyid}&branchId=${branchId}&nocTransID=${trasid}&inBondingId=${inbondingId}&nocNo=${nocNo}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        setInBondFlag("edit");
        console.log("getDataByPartyIdAndGstNo", data);
        setInBond(response.data)

        setIsoName(response.data.boeNo);

        setChaName(response.data.editedBy);
        setBondingErrors((prevErrors) => ({
          ...prevErrors,
          cha: "",
        }));

        // fetchData(
        //   companyid,
        //   branchId,
        //   response.data.nocTransId,
        //   response.data.nocNo,
        // );
        handleGridData(response.data.receivingId);
        fetchDataAfterSave(
          companyid,
          branchId,
          response.data.receivingId,
        )
      })
      .catch((error) => { });
  };


  const [importerSearchId, setImporterSearchId] = useState("");
  const [importerSearchedData, setImporterSearchedData] = useState([]);


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = chaSearchedData;
  const totalPages = Math.ceil(chaSearchedData.length / itemsPerPage);

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

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const [inBond, setInBond] = useState(initialNoc);
  const [nocDtl, setNocDtl] = useState(initialNocDtl);
  const handleNocChange = (e) => {
    const { name, value } = e.target;

    setInBond((prevNOC) => {
      const updatedNOC = {
        ...prevNOC,
        [name]: value,
      };

      // Calculate the sum of cifValue and cargoDuty
      const cifValue = parseFloat(updatedNOC.cifValue) || 0;
      const cargoDuty = parseFloat(updatedNOC.cargoDuty) || 0;

      return {
        ...updatedNOC,
        insuranceValue: (cifValue + cargoDuty).toFixed(3), // Update insuranceValue
      };
    });

    document.getElementById(name).classList.remove("error-border");
    setBondingErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleDocDateChange = (date) => {
    setInBond((prevNoc) => ({
      ...prevNoc,
      nocFromDate: date,
    }));

    setInBond((prevNoc) => ({
      ...prevNoc,
      nocValidityDate: "",
    }));

    document.getElementById("nocFromDate").classList.remove("error-border");
    setBondingErrors((prevErrors) => ({
      ...prevErrors,
      nocFromDate: "",
    }));
  };

  const handleNocTransDate = (date) => {
    setInBond((prevNoc) => ({
      ...prevNoc,
      receivingDate: date,
    }));
    //   document.getElementById("nocFromDate").classList.remove('error-border');
    //   setBondingErrors((prevErrors) => ({
    //     ...prevErrors,
    //     nocFromDate: "",
    // }));
  };


  const handleNocValidityDateChnage = (date) => {
    setInBond((prevNoc) => ({
      ...prevNoc,
      bondingDate: date,
      bondValidityDate: date ? new Date(date.getTime() + 364 * 24 * 60 * 60 * 1000) : null,
    }));
    document.getElementById("bondingDate").classList.remove("error-border");
    setBondingErrors((prevErrors) => ({
      ...prevErrors,
      bondingDate: "",
    }));
  };

  const [bondingErrors, setBondingErrors] = useState({
    bondingNo: "",
    bondingDate: "",
  });

  const [nocDtlErrors, setNocDtlErrors] = useState({
    nocPackages: "",
    typeOfPackage: "",
    cifValue: "",
    cargoDuty: "",
    insuranceValue: "",
    commodityDescription: "",
    grossWeight: "",
  });








  const handleSave = () => {
    setLoading(true);

    let errors = {};

    if (!inBond.boeNo) {
      errors.boeNo = "BOE No is required.";
      document.getElementById("boeNo").classList.add("error-border");
      toast.error("BOE No is required.", {
        // ... (toast options)
      });
      setLoading(false);
      return;
    }

    if (!inBond.receivingDate) {
      errors.receivingDate = "Receiving date is required.";
      toast.error("Receiving date is required.", {
        // ... (toast options)
      });
      setLoading(false);
      return;
    }

    if (!inBond.cargoCondition) {
      errors.cargoCondition = "Please specify cargo condition...";
      document.getElementById("cargoCondition").classList.add("error-border");
      toast.error("Please specify cargo condition...", {
      });
      setLoading(false);
      return;
    }
    if (!inBond.handlingEquip1) {
      errors.handlingEquip1 = "Please specify handling equipment...";
      document.getElementById("handlingEquip1").classList.add("error-border");
      toast.error("Please specify cargo condition...", {
      });
      setLoading(false);
      return;
    }

    if (!inBond.handlingEquip2) {
      errors.handlingEquip2 = "Please specify handling2 equipment...";
      document.getElementById("handlingEquip2").classList.add("error-border");
      toast.error("Please specify cargo condition...", {
      });
      setLoading(false);
      return;
    }

    if (selectedRows.length === 0) {
      toast.error(
        "Commodity not selected. Please select commodity to add..."
      );
      setLoading(false);
      return;
    }

    // const hasEmptyFields = rows.some(row =>
    //   !row.yardLocation || !row.yardBlock || !row.blockCellNo || row.areaReleased
    // );

    // if (hasEmptyFields) {
    //   const errorMsg = "Required fields in location must be filled before saving.";
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     save: errorMsg, // Set error message for save
    //   }));
    //   setLoading(false);
    //   toast.error(errorMsg); // Display error toast
    //   return; // Exit the function to prevent saving
    // }

    const hasEmptyFields = rows.some(row => {
      if (!row.yardLocation || !row.yardBlock || !row.blockCellNo) {
        return true;
      }

      if (inBond.spaceAllocated === 'COVERED') {
        // areaReleased must be greater than 0
        return !row.cellAreaAllocated || parseFloat(row.cellAreaAllocated) <= 0;
      }

      // If OPEN, skip areaReleased check
      return false;
    });

    if (hasEmptyFields) {
      const errorMsg = "Required fields in location must be filled before saving.";
      setErrors((prevErrors) => ({
        ...prevErrors,
        save: errorMsg,
      }));
      setLoading(false);
      toast.error(errorMsg);
      return;
    }




    let isValid = true;
    const updatedValues = [...inputValues];
    selectedRows.forEach((dtl, index) => {
      if (!updatedValues[index]) {
        updatedValues[index] = {};
      }

      const values = updatedValues[index];
      let errorMessage = "";

      if (!values.receivingPackages) {
        errorMessage = "Receiving Packages is required";
        toast.error("Receiving Packages is required.", {
        });
        setLoading(false);
        isValid = false;
      } else if (parseFloat(values.receivingPackages) > dtl.noOfPackages) {
        errorMessage =
          "Receiving Packages should not be greater than gate in Packages";
        toast.error(
          "Receiving Packages should not be greater than gate in Packages.",
          {
          }
        );
        setLoading(false);
        isValid = false;
      }

      // Automatically calculate inbondInsuranceValue
      updatedValues[index].inbondInsuranceValue =
        parseFloat(values.inbondCifValue || 0) +
        parseFloat(values.inbondCargoDuty || 0);

      // Automatically calculate inbondGrossWt
      const perPackageWeight = dtl.grossWeight / dtl.nocPackages;
      updatedValues[index].inbondGrossWt = (
        perPackageWeight * parseFloat(values.inBondedPackages || 0)
      ).toFixed(3);

      updatedValues[index].errorMessage = errorMessage;
    });




    const dataToSave = selectedRows.map((row) => {
      const index = currentItems.findIndex(
        (item) =>
          item.jobTransId === row.jobTransId &&
          item.jobNo === row.jobNo &&
          item.commodityId === row.commodityId &&
          item.srNo === row.srNo
      );
      const inputValuesForRow = inputValues[index] || {};
      const updatedFields = {};

      Object.keys(inputValuesForRow).forEach((field) => {
        if (inputValuesForRow[field] !== undefined) {
          updatedFields[field] = inputValuesForRow[field];
        }
      });

      return {
        ...row,
        ...updatedFields,
      };
    });

    const requestBody = {
      inBond: {
        ...inBond,
      },
      nocDtl: {
        ...dataToSave,
      },
      grid: {
        ...rows
      }
    };


    // return;

    // setLoading(false);
    if (isValid) {
      axios
        .post(
          `${ipaddress}api/receiving/saveCfInbondCrg?companyId=${companyid}&branchId=${branchId}&user=${userId}&flag=${inbondFlag}`,
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .then((response) => {
          setInBond(response.data);
          fetchDataAfterSave(
            companyid,
            branchId,
            response.data.receivingId,
          );
          handleGridData(response.data.receivingId)
          setInBondFlag("edit");
          toast.success("Data save successfully!!", {
            autoClose: 800,
          });
          onRequest();
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          if (error.response) {
            // This will log detailed error information from the backend
            console.error("Error data:", error.response.data);
            toast.error(error.response.data || "An error occurred. Please try again.", {
              autoClose: 9000,
            });
          }
        });
    } else {
      // Update state to reflect errors
      setInputValues(updatedValues);
    }
  };


  const handleClear = () => {
    // Reset the form fields
    setInBond(initialNoc);
    document.getElementById("boeNo").classList.remove("error-border");
    document.getElementById("boeDate").classList.remove("error-border");
    setBondingErrors("");
    setSelectAll(false);
    setSelectedRows([]);
    setInBondFlag("add");
    setChaName("");
    setCHASearchedData([]);
    setIsoName('');
    setModalDataInput((prev) => ({
      ...prev,
      yardLocation: '',
      yardBlock: '',
      blockCellNo: '',
      cellArea: '',
      cellAreaAllocated: '',
      cellAreaUsed: '',
    }));
    setRows([]);
    setErrors('');
  };

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);




  const fetchData = async (companyid, branchId, nocTransId, nocNo, areaAllocated) => {
    try {
      const response = await fetch(
        `${ipaddress}api/receiving/getALLCfbondNocDtl?companyId=${companyid}&branchId=${branchId}&nocTransId=${nocTransId}&nocNo=${nocNo}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const a = areaAllocated;

      const data = await response.json();

      setCHASearchedData(data);

      const newTotalPackages = data.reduce(
        (sum, row) => sum + (parseFloat(row.gateInPackages) || 0),
        0
      );


      const differences = data.map(row =>
        parseFloat(row.gateInPackages) - parseFloat(row.inBondedPackages)
      );

      const packages = data.map(row =>
        parseFloat(row.inBondedPackages || 0)
      );

      let area;
      if (inBond.inBondingId != null) {
        area = a / newTotalPackages * packages;
      }
      else {
        area = a / newTotalPackages * differences;
      }


      console.log('data : ', data);


      // setInputValues(data.map(mnr => ({
      //   ...mnr,
      //   receivingPackages: (mnr.noOfPackages - (mnr.receivingPackages || 0)),

      //   // areaOccupied : a  / newTotalPackages * (mnr.gateInPackages - (mnr.inBondedPackages || 0)),
      //   shortagePackages: mnr.shortagePackages || 0,
      //   damagedQty: mnr.damagedQty || 0,
      //   breakage: mnr.breakage || 0,
      //   commodityId: mnr.commodityId,
      //   gateInPackages: mnr.noOfPackages,
      //   jobGwt: mnr.jobGwt,
      //   jobNop: mnr.jobNop,
      //   actCommodityId: mnr.actCommodityId,
      //   editedBy: '',
      //   receivingWeight: (
      //     ((mnr.jobGwt / mnr.jobNop) * (mnr.noOfPackages - (mnr.receivingPackages || 0)))
      //   ).toFixed(2),

      // })));



      setInputValues(
        data.map(mnr => ({
          ...mnr,

          receivingPackages: (mnr.gateInPackages - (mnr.receivingPackages || 0)),

          balanceReceivedPackages: (mnr.gateInPackages - (mnr.receivingPackages || 0)),

          balanceReceivedWeight: (
            (mnr.gateInWeight || 0) - (
              ((mnr.jobGwt / (mnr.jobNop || 1)) *
                (mnr.receivingPackages - (mnr.gateInPackages || 0)))
            ).toFixed(3)
          ),
          shortagePackages: mnr.shortagePackages || 0,
          damagedQty: mnr.damagedQty || 0,
          breakage: mnr.breakage || 0,
          commodityId: mnr.commodityId,
          gateInPackages: mnr.noOfPackages,
          jobGwt: mnr.jobGwt,
          jobNop: mnr.jobNop,
          actCommodityId: mnr.actCommodityId,
          editedBy: '',
          receivingWeight: (
            (mnr.gateInWeight || 0) - (
              ((mnr.jobGwt / (mnr.jobNop || 1)) *
                (mnr.receivingPackages - (mnr.gateInPackages || 0)))
            ).toFixed(3)
          ),

          oldReceivedPackages: (mnr.receivingPackages || 0),
          oldReceivedWeight: (mnr.receivingWeight || 0),

        }))
      );



      console.log("cfbodnNocDtl records ", data);
    } catch (error) {
      // setError(error);
    } finally {
      setLoading(false);
    }
  };


  const fetchDataAfterSave = async (companyid, branchId, inBondingId) => {
    try {
      const response = await fetch(
        `${ipaddress}api/receiving/findByCompanyIdAndBranchIdAndCommonBondingIdAndNocTransId?companyId=${companyid}&branchId=${branchId}&inBondingId=${inBondingId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }


      const data = await response.json();
      setCHASearchedData(data);

      const selectedData = data.filter((row) => row.receivingId !== undefined && row.receivingId !== null);
      setSelectedRows(selectedData);
      setSelectAll(true);
      //setIsDataFetched(true);

      console.log("fetchDataAfterSave_____________________________", data);

      // setInputValues(data.map(mnr => ({
      //   ...mnr,

      //   receivingPackages: (mnr.gateInPackages - (mnr.receivingPackages || 0)),



      //   receivingWeight: (
      //     ((mnr.jobGwt / mnr.jobNop) * (mnr.gateInPackages - (mnr.receivingPackages || 0)))
      //   ).toFixed(2),

      // })));


      setInputValues(data.map(mnr => ({
        ...mnr,

        receivingPackages: mnr.receivingPackages || 0,
        oldReceivedPackagesThis: mnr.receivingPackages || 0,
        balanceReceivedPackages: (mnr.gateInPackages - (mnr.oldReceivingPackages || 0)),

        balanceReceivedWeight: (mnr.gateInWeight || 0) - (mnr.oldReceivingPackages || 0),

        receivingWeight: mnr.receivingWeight || 0,

        oldReceivedPackages: mnr.oldReceivingPackages || 0, // No increment after save
        oldReceivedWeight: mnr.oldReceivingWeight || 0, // No increment after save


        shortagePackages: mnr.shortagePackages || 0,
        damagedQty: mnr.damagedQty || 0,
        breakage: mnr.breakage || 0,

        commodityId: mnr.commodityId,
        actCommodityId: mnr.actCommodityId,
        gateInPackages: mnr.noOfPackages,
        jobGwt: mnr.jobGwt,
        jobNop: mnr.jobNop,

        editedBy: '',
      })));


      console.log("cfbodnNocDtl records ", data);
    } catch (error) {
      // setError(error);
    } finally {
      setLoading(false);
    }
  };



  const getMinDate = (date) => {
    if (!date) return null;
    const minDate = new Date(date);
    minDate.setDate(minDate.getDate() + 1); // Add one day
    return minDate;
  };



  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setSelectAll(selectedItems.length === chaSearchedData.length);
  }, [selectedItems, chaSearchedData]);

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      setSelectedRows([...currentItems]); // Select all rows
    } else {
      setSelectedRows([]); // Deselect all rows
    }
  };

  const [selectedRows, setSelectedRows] = useState([]);
  const [inputValues, setInputValues] = useState([]);


  function handleInputChangeNew(e, val1, val2) {
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





  const handleInputChangeFotDtl = (event, fieldName, index, val, val1) => {
    const { value } = event.target;
    let newValue = value;

    if (['receivingPackages', 'receivingWeight'].includes(fieldName)) {
      newValue = handleInputChangeNew(value, val, val1)
    }

    setInputValues((prevInputValues) => {
      const updatedValues = [...prevInputValues];
      // const dtl = currentItems[index]; 

      const dtl = currentItems[index]; // Get the current item details for comparison
      const currentRow = updatedValues[index]; // Use from inputValues directly
      let errorMessage = "";



      const newTotalPackages = updatedValues.reduce(
        (sum, row) => sum + (parseFloat(row.gateInPackages) || 0),
        0
      );

      if (fieldName === "receivingPackages") {
        const perPackageWeight = dtl.jobGwt / dtl.jobNop;
        updatedValues[index].receivingWeight = (
          perPackageWeight * parseFloat(newValue)
        ).toFixed(3);

      }


      let addition;

      if (inBond.receivingId) {
        // addition = dtl.gateInPackages;

        const oldPkg = parseFloat(currentRow.oldReceivedPackagesThis || 0);
        const balancePkg = parseFloat(currentRow.balanceReceivedPackages || 0);
        addition = oldPkg + balancePkg;


      } else {
        addition = dtl.noOfPackages - dtl.receivingPackages;
      }

      console.log("addition", addition);

      if (fieldName === "receivingPackages" && parseFloat(newValue) > addition) {
        errorMessage = `Receiving Packages should not be greater than ${addition}`;
      }

      // Set the updated values and error message if applicable
      updatedValues[index] = {
        ...updatedValues[index],
        [fieldName]: newValue,
        errorMessage,
      };

      return updatedValues;
    });
  };










  const handleCheckboxChangeForDtl = (event, row) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      // If not already selected, add to selected rows
      if (
        !selectedRows.some(
          (selectedRow) =>
            selectedRow.jobTransId === row.jobTransId &&
            selectedRow.jobNo === row.jobNo &&
            selectedRow.commodityId === row.commodityId &&
            selectedRow.srNo === row.srNo
        )
      ) {
        setSelectedRows([...selectedRows, row]);
      }
    } else {
      // Remove from selected rows
      const updatedRows = selectedRows.filter(
        (selectedRow) =>
          selectedRow.jobTransId !== row.jobTransId ||
          selectedRow.jobNo !== row.jobNo ||
          selectedRow.commodityId !== row.commodityId ||
          selectedRow.srNo !== row.srNo
      );
      setSelectedRows(updatedRows);
    }
  };

  // State to hold totals for the selected rows
  const [totals, setTotals] = useState({
    totalInBondedPackages: 0,
    totalShortagePackages: 0,
    totalDamagedQty: 0,
    totalBreakage: 0,
  });


  const calculateTotals = () => {
    let totalInBondedPackages = 0;
    let totalShortagePackages = 0;
    let totalDamagedQty = 0;
    let totalBreakage = 0;
    let totalAreaOccupied = 0;

    selectedRows.forEach((row) => {
      const isInBondingIdValid = inBond?.receivingId != null && inBond?.receivingId !== '';
      const index = currentItems.findIndex(
        (item) =>
          inBond?.receivingId
            ? // If srNo exists, use commodityId
            item.jobTransId === row.jobTransId &&
            item.jobNo === row.jobNo &&
            item.commodityId === row.commodityId &&
            item.srNo === row.srNo
            : // Otherwise, use cfBondDtlId
            item.jobTransId === row.jobTransId &&
            item.jobNo === row.jobNo &&
            item.commodityId === row.commodityId &&
            item.srNo === row.srNo
      );
      if (index !== -1) {
        const source = isInBondingIdValid ? row : inputValues[index];

        totalInBondedPackages += parseFloat(source?.receivingPackages || 0);
        totalShortagePackages += parseFloat(source?.receivingWeight || 0);
        // totalAreaOccupied += parseFloat(source?.areaOccupied || 0);
        totalDamagedQty += parseFloat(source?.damagedQty || 0);
        totalBreakage += parseFloat(source?.breakage || 0);
      }
    });

    setTotals({
      totalInBondedPackages,
      totalShortagePackages,
      totalAreaOccupied
    });

    setInBond((pre) => ({
      ...pre,
      receivedPackages: handleInputChangeNew(totalInBondedPackages, 13, 3),
      receivedWeight: handleInputChangeNew(totalShortagePackages, 13, 3),
      // areaOccupied:handleInputChangeNew(totalAreaOccupied,13,3)
    }));
  };



  // Example usage: Call this function after selection changes
  useEffect(() => {
    calculateTotals();
  }, [selectedRows, inputValues]);



  const [yardLocationsData, setYardLocationsData] = useState([]);


  const handleYardLocationData = (type) => {
    fetch(
      `${ipaddress}api/yardblockcells/getLocationsAllYardCellByType?companyId=${companyid}&branchId=${branchId}&type=${type === 'OPEN' ? 'O' : type === 'COVERED' ? 'C' : ''
      }`
    ).then((response) => response.json())
      .then((data) => {
        console.log(data);
        setYardLocationsData(data);
      })
      .catch((error) => console.error("Error:", error));
  };



  useEffect(() => {
    if (inBond.spaceAllocated) handleYardLocationData(inBond.spaceAllocated);
  }, [inBond.spaceAllocated]);





  const initialYardGrid = {
    companyId: companyid,
    branchId: branchId,
    receivingId: '',
    gateInId: '',
    srNo: 1,
    yardLocation: '',
    yardBlock: '',
    blockCellNo: '',
    cellArea: 0.000,
    cellAreaUsed: 0.000,
    cellAreaAllocated: 0.000,
    qtyTakenOut: 0,
    areaReleased: 0.000,
    gridReleased: '',
    receivedPackages: 0,
    deliveredPackages: 0,
    status: '',
    createdBy: '',
    createdDate: null,
    editedBy: '',
    editedDate: null,
    approvedBy: '',
    approvedDate: null,
  };


  const [modalDataInput, setModalDataInput] = useState(initialYardGrid);

  const handleGridData = (inBid) => {
    axios.get(
      `${ipaddress}api/receiving/getAfterSaveGrid?companyId=${companyid}&branchId=${branchId}&inBondingId=${inBid}`,
      {
        headers: `Authorization ${jwtToken}`
      }
    )
      .then((response) => {
        console.log(response.data);
        const data = response.data;

        const newRows = data.map((row, index) => ({
          ...row,
          srNo: row.srNo,
          receivedPackages: row.receivedPackages,
          yardLocation: row.yardLocation,
          yardBlock: row.yardBlock,
          blockCellNo: row.blockCellNo,
          cellArea: row.cellArea,
          nocTransId: row.nocTransId,
          cellAreaAllocated: row.cellAreaAllocated,
          cellAreaUsed: row.cellAreaUsed,
        }));

        // Update the rows state with new values
        setRows(newRows);

        console.log("Updated rows: ", rows); // Log the new data
        console.log("yardblockcellsyardblockcells", response.data);
      })
      .catch((error) => console.error("Error:", error));
  };





  const [boeData, setBOEData] = useState([]);
  const [isoName, setIsoName] = useState('');


  const handleBoeChange = async (selectedOption, { action }) => {
    if (action === 'clear') {
      setIsoName('');
      setCHASearchedData([]);
      setChaName('');
      setInBond(initialNoc);

      document.getElementById('boeNo').classList.remove('error-border');
      setBondingErrors((prevErrors) => ({
        ...prevErrors,
        ['boeNo']: "",
      }));
    }
    else {
      setIsoName(selectedOption?.label)
      setInBond((pri) => ({
        ...pri,
        boeNo: selectedOption ? selectedOption.value : '',
        cha: selectedOption?.cha,
        jobTransId: selectedOption?.jobTransId,
        jobNo: selectedOption?.jobNo,
        jobTransDate: selectedOption?.jobTransDate,
        jobDate: selectedOption?.jobDate,
        receivingDate: selectedOption?.jobDate == null ? new Date() : new Date(selectedOption?.jobDate),
        boeNo: selectedOption?.value,
        cha: selectedOption?.cha,
        boeDate: selectedOption?.boeDate,
        chaName: selectedOption?.editedBy,
        importerId: selectedOption?.importerId,
        importerName: selectedOption?.importerName,
        gateInId: selectedOption?.gateInId,
        gateInDate: selectedOption?.gateInDate,
        gateInPackages: selectedOption?.gateInPackages,
        gateInWeight: selectedOption?.gateInWeight,
        areaAllocated: selectedOption?.area,
        transporterName: selectedOption?.transporterName,
      }));

      setChaName(selectedOption?.editedBy)
      fetchData(
        companyid,
        branchId,
        selectedOption?.jobTransId,
        selectedOption?.jobNo,
        selectedOption?.area,
      );
      document.getElementById('boeNo').classList.remove('error-border');
      setBondingErrors((prevErrors) => ({
        ...prevErrors,
        ['boeNo']: "",
      }));
    }
  };

  const getBoeData = (val) => {
    if (val === '') {
      setBOEData([]);
      return;
    }

    axios.get(`${ipaddress}api/receiving/dataAllDataOfCfBondNocForInbondScreen?companyId=${companyid}&branchId=${branchId}&partyName=${val}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;

        // Filter unique (boeNo, gateInId) combinations
        const uniqueMap = new Map();
        data.forEach(port => {
          const key = `${port.boeNo}-${port.gateInId}`;
          if (!uniqueMap.has(key)) {
            uniqueMap.set(key, port);
          }
        });

        const uniqueData = Array.from(uniqueMap.values());

        const portOptions = uniqueData.map(port => ({
          value: port.boeNo,
          label: `${port.boeNo}-${port.gateInId}`,
          boeNo: port.boeNo,
          boeDate: port.boeDate,
          gateInId: port.gateInId,
          gateInDate: port.gateInDate,
          jobNo: port.jobNo,
          jobDate: port.jobDate,
          jobTransId: port.jobTransId,
          jobTransDate: port.jobTransDate,
          cha: port.cha,
          editedBy: port.editedBy,
          type: port.containerType,
          size: port.containerSize,
          weight: port.tareWeight,
          transporterName: port.transporterName,
          gateInPackages: port.noOfPackages,
          gateInWeight: port.grossWeight,
          importerId: port.importerId,
          importerName: port.importerName,
          area: port.area,
        }));
        if (listOfData.boeNo) {
          handleBoeChange(portOptions[0], { action: "select" });
        }
        // Set BOE Data
        setBOEData(portOptions);
      })
      .catch((error) => {

      })
  }

  const [totalPackages, setTotalPackages] = useState(0);
  const [rows, setRows] = useState([
    {
      companyId: companyid,
      branchId: branchId,
      receivingId: '',
      gateInId: '',
      srNo: 1,
      yardLocation: '',
      yardBlock: '',
      blockCellNo: '',
      cellArea: 0.000,
      cellAreaUsed: 0.000,
      cellAreaAllocated: 0.000,
      qtyTakenOut: 0,
      areaReleased: 0.000,
      gridReleased: '',
      receivedPackages: 0,
      deliveredPackages: 0,
      status: '',
      createdBy: '',
      createdDate: null,
      editedBy: '',
      editedDate: null,
      approvedBy: '',
      approvedDate: null,
      jobTransId: "",
      jobNo: "",
    },
  ]);
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newRows = [...rows];
    newRows[index][name] = value;

    // Check if the field being updated is inBondPackages
    if (name === "receivedPackages") {
      const currentRow = newRows[index];
      const maxInBondPackages = currentRow.receivedPackages; // Set this to the actual max from your yard data

      if (parseFloat(value) > maxInBondPackages) {
        const errorMessage = `This row's inBondPackages cannot exceed ${maxInBondPackages}.`;
        setErrors((prevErrors) => ({
          ...prevErrors,
          [`inBondPackages-${index}`]: errorMessage,
        }));
        toast.error(errorMessage); // Show toast notification
      } else {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[`receivedPackages-${index}`];
          return newErrors;
        });
      }

      // Calculate the new total packages
      const newTotalPackages = newRows.reduce(
        (sum, row) => sum + (parseFloat(row.receivedPackages) || 0),
        0
      );
      setTotalPackages(newTotalPackages);

      // Validation: Total packages should not exceed oldInbondPkgs
      if (newTotalPackages > modalDataInput.oldInbondPkgs) {
        const errorMessage = `Total packages (${newTotalPackages}) cannot exceed ${modalDataInput.oldInbondPkgs}`;
        setErrors((prevErrors) => ({
          ...prevErrors,
          totalPackages: errorMessage,
        }));
        toast.error(errorMessage); // Show toast notification
      } else {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors.totalPackages;
          return newErrors;
        });
      }
    }

    // Validation for cellAreaAllocated
    if (name === "cellAreaAllocated") {
      const cellArea = parseFloat(rows[index].cellArea);
      const cellAreaUsed = parseFloat(rows[index].cellAreaUsed);
      const cellAreaAllocated = parseFloat(value);

      let addtion;
      if (inBond.receivingId) {
        addtion = cellArea
      }
      else {
        addtion = cellArea - cellAreaUsed
      }
      // Validation: Cell Area Allocated should not exceed available area
      if (cellAreaAllocated > (addtion)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [`cellAreaAllocated-${index}`]: `Allocated area cannot exceed ${addtion}`,
        }));
      } else {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[`cellAreaAllocated-${index}`];
          return newErrors;
        });
      }
    }
    setRows(newRows);
  };

  const deleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[`cellAreaAllocated-${index}`];
      delete newErrors[`yardLocation-${index}`];
      return newErrors;
    });
    setRows(newRows);
  };


  const handleSelectChange = (index, selectedOption) => {

    const fieldName = 'yardLocation';
    // Prepare the new values from selectedOption
    const newYardLocation = selectedOption ? selectedOption.yard : '';
    const newYardBlock = selectedOption ? selectedOption.yardBlock : '';
    const newBlockCellNo = selectedOption ? selectedOption.yardBCell : '';

    // Check for duplicates in the yardCellArray
    const isDuplicate = rows.some((cell, i) =>
      i !== index &&
      cell.yardLocation === newYardLocation &&
      cell.yardBlock === newYardBlock &&
      cell.blockCellNo === newBlockCellNo
    );

    if (isDuplicate) {
      const errorMsg = "Duplicate location...";
      // Set the error message for duplicate entry
      setErrors((prevErrors) => ({
        ...prevErrors,
        addRow: errorMsg, // Set error message
      }));

      // Display the error toast
      toast.error(errorMsg);

      // Reset the row values if a duplicate is found
      const updatedRows = rows.map((row, i) =>
        i === index
          ? {
            yardLocation: "",
            yardBlock: "",
            blockCellNo: "",
            cellArea: "",
            cellAreaUsed: "",
            inBondPackages: "",
            cellAreaAllocated: "",
          }
          : row
      );
      setRows(updatedRows);

      return; // Exit the function to prevent further execution
    }



    if (selectedOption) {
      const updatedRows = rows.map((row, i) =>
        i === index
          ? {
            ...row,
            yardLocation: selectedOption.yard,
            yardBlock: selectedOption.yardBlock,
            blockCellNo: selectedOption.yardBCell,
            cellArea: selectedOption.area,
            cellAreaUsed: selectedOption.areaUsed,
            receivedPackages: selectedOption.receivedPackages,
            cellAreaAllocated: selectedOption.cellAreaAllocated,
          }
          : row
      );
      setRows(updatedRows);
    } else {
      // Clear the row if Select is cleared
      const updatedRows = rows.map((row, i) =>
        i === index
          ? {
            yardLocation: "",
            yardBlock: "",
            blockCellNo: "",
            cellArea: "",
            cellAreaUsed: "",
            receivedPackages: "",
            cellAreaAllocated: "",
          }
          : row
      );


      setRows(updatedRows);
    }
  };

  const addRow = () => {

    // const hasEmptyFields = rows.some(row => 
    //   !row.yardLocation || !row.yardBlock || !row.blockCellNo || 
    //   !row.cellArea || !row.inBondPackages || 
    //   !row.cellAreaAllocated
    // );

    // // If there are empty fields, show an error and do not add a new row
    // if (hasEmptyFields) {
    //   const errorMsg = "All fields must be filled before adding a new row.";
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     addRow: errorMsg, // Set error message
    //   }));
    //   toast.error(errorMsg); // Display error toast
    //   return; // Exit the function to prevent adding a new row
    // }


    const newTotalPackages = rows.reduce(
      (sum, row) => sum + (parseFloat(row.inBondPackages) || 0),
      0
    );

    // Check if adding a new row exceeds oldInBondPackages
    if (newTotalPackages > modalDataInput.oldInbondPkgs) {
      const errorMessage = `Total packages (${newTotalPackages}) cannot exceed ${modalDataInput.oldInbondPkgs}`;
      setErrors((prevErrors) => ({
        ...prevErrors,
        totalPackages: errorMessage,
      }));
      toast.error(errorMessage); // Show toast notification
    } else {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.totalPackages;
        return newErrors;
      });
    }

    // Clear error if validation is successful
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.totalPackages;
      return newErrors;
    });

    // setModalFlag('add');
    const nextSrNo = rows.length > 0 ? Math.max(...rows.map(row => parseInt(row.srNo, 10))) + 1 : 1;
    // Add new row
    setRows([
      ...rows,
      {
        srNo: nextSrNo.toString(), // Incremented serial number
        yardLocation: "",
        yardBlock: "",
        blockCellNo: "",
        cellArea: "",
        cellAreaUsed: "",
        receivedPackages: "",
        cellAreaAllocated: "",
      },
    ]);

  };

  const handlePrint = async (type) => {
    setLoading(true);
    let inBondingId = inBond.inBondingId;
    try {
      const response = await axios.get(`${ipaddress}api/cfinbondcrg/generateCustomeInBondPrint?companyId=${companyid}&branchId=${branchId}&uname=${username}&type=${type}&cname=${companyname}&bname=${branchname}&inBondingId=${inBondingId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        });

      console.log("Response Data");
      console.log(response.data);

      if (type === 'PDF') {

        const pdfBase64 = response.data;

        const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

        const blobUrl = URL.createObjectURL(pdfBlob);

        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'BOND GATEPASS';
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(blobUrl);

        toast.success("Downloading PDF!", {
          position: 'top-center',
          autoClose: 800,
        });
      } else if (type === 'PRINT') {
        const pdfBase64 = response.data;

        const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

        const blobUrl = URL.createObjectURL(pdfBlob);

        window.open(blobUrl, '_blank');
      } else {
        throw new Error('Invalid print type');
      }
    } catch (error) {
      console.error('Error in handlePrint:', error.message);

    } finally {
      setLoading(false);
    }
  };
















  const axiosInstance = useAxios();
  const CFSService = new cfsService(axiosInstance);







  // Document upload
  const [isModalOpenForDocumentUpload, setIsModalOpenForDocumentUpload] = useState(false);

  const initialDocumentUpload = {
    companyId: companyid,
    branchId: branchId,
    sbNo: '',
    sbTransId: '',
    hSbTransId: '',
    sbLineNo: '',
    fileName: '',
    base64Url: '',
    fileType: '',
    isSaved: 'N',
    isContainerDamage: 'N',
    isCargoDamage: 'N',
    damageRemark: '',
    commodityDescription: ''
  }

  const [sbDocumentUpload, setSbDocumentUpload] = useState([initialDocumentUpload]);
  const [removedList, setRemovedList] = useState([]);


  const handleOpenDocumentUpload = async (sbNoEntry) => {
    try {
      const response = await CFSService.getDataForDocumentuploadGeneral(
        companyid,
        branchId,
        sbNoEntry.receivingId,
        sbNoEntry.gateInId, sbNoEntry.srNo, sbNoEntry.containerNo, jwtToken
      );

      console.log(' response.data \n', response.data);

      setSbDocumentUpload(
        response.data?.length > 0
          ? response.data
          : [{ ...initialDocumentUpload, sbNo: sbNoEntry.receivingId, commodityDescription: sbNoEntry.commodityDescription, sbTransId: sbNoEntry.containerNo, hSbTransId: sbNoEntry.gateInId, sbLineNo: sbNoEntry.srNo, isSaved: 'N' }]
      );

      setIsModalOpenForDocumentUpload(true);
    } catch (error) {
      console.error('Error fetching data for document get upload : \n', error);
      toast.error('An error occurred while fetching data. Please try again.', {
        position: 'top-center',
        autoClose: 700,
      });
    }
  };


  const handleCloseDocumentUpload = async () => {
    setIsModalOpenForDocumentUpload(false);
    setSbDocumentUpload([initialDocumentUpload]);
    setRemovedList([]);
  }


  const handleFileUploadFileChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length === 0) return;

    const maxSize = 10 * 1024 * 1024; // 10MB in bytes

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "application/vnd.ms-excel", // XLS
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX           
    ];

    const validFiles = files.filter(
      (file) => allowedTypes.includes(file.type) && file.size <= maxSize
    );

    if (validFiles.length === 0) {
      alert("Only JPG, PNG, PDF, XLS and XLSX files are allowed (Max: 10MB)!");
      return;
    }

    validFiles.forEach((file) => {
      const reader = new FileReader();

      // Read Excel and CSV files as binary string
      if (file.type.includes("excel")) {
        reader.readAsBinaryString(file);
      } else {
        reader.readAsDataURL(file);
      }

      reader.onload = () => {
        const base64String =
          file.type.includes("excel")
            ? btoa(reader.result) // Convert binary to base64
            : reader.result;

        setSbDocumentUpload((prev) => {
          const existingIndex = prev.findIndex((doc) => doc.fileName === "");

          if (existingIndex !== -1) {
            // If an empty file entry exists, update it
            const updatedDocuments = [...prev];
            updatedDocuments[existingIndex] = {
              ...updatedDocuments[existingIndex],
              fileName: file.name,
              base64Url: base64String,
              fileType: file.type,
            };
            return updatedDocuments;
          } else {
            // If no empty entry exists, add a new object
            return [
              ...prev,
              {
                companyId: prev[0]?.companyId || "",
                branchId: prev[0]?.branchId || "",
                sbNo: prev[0]?.sbNo || "",
                sbTransId: prev[0]?.sbTransId || "",
                hSbTransId: prev[0]?.hSbTransId || "",
                sbLineNo: prev[0]?.sbLineNo || "",
                commodityDescription: prev[0]?.commodityDescription || "",
                isContainerDamage: prev[0]?.isContainerDamage || "",
                isCargoDamage: prev[0]?.isCargoDamage || "",
                damageRemark: prev[0]?.damageRemark || "",
                fileName: file.name,
                base64Url: base64String,
                fileType: file.type,
              },
            ];
          }
        });

        console.log("File Uploaded:", file.name);
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
    });
  };


  const handleRemoveFile = (index, sbNo, sbLineNo, sbTransId, hsbTransId, isSaved, fileName, commodityDescription, isCargoDamage, isContainerDamage, damageRemark) => {

    const updatedFiles = sbDocumentUpload.filter((_, i) => i !== index);

    // If the file is saved, add its name to removedList
    if (isSaved === 'Y') {
      setRemovedList(prevList => [...prevList, fileName]);
    }

    if (updatedFiles.length === 0) {
      setSbDocumentUpload([{
        ...initialDocumentUpload,
        sbNo: sbNo,
        sbTransId: sbTransId,
        hSbTransId: hsbTransId,
        sbLineNo: sbLineNo,
        isSaved: 'N',
        commodityDescription,
        isCargoDamage, isContainerDamage, damageRemark
      }]);
    } else {
      setSbDocumentUpload(updatedFiles);
    }
  };

  const uploadGeneralDocument = async () => {
    setLoading(true);

    let sbFile = sbDocumentUpload[0];
    try {
      const response = await CFSService.uploadGeneralDocument(companyid, branchId, sbFile.sbNo, sbFile.sbTransId, sbFile.hSbTransId, sbFile.sbLineNo, sbDocumentUpload, removedList, userId, jwtToken);

      setSbDocumentUpload(response.data);
      toast.success('Document uploaded successfully', {
        position: 'top-center',
        autoClose: 700,
      });

    } catch {
      toast.error('An error occurred while uploading the files. Please try again.', {
        position: 'top-center',
        style: { width: '29vw' },
        autoClose: 700,
      });
    } finally {
      setLoading(false);
    }
  }

  const [isModalOpenForViewDocument, setIsModalOpenForViewDocument] = useState(false);
  const [viewFile, setViewFile] = useState('');


  const handleView = (file) => {
    setViewFile(file);
    setIsModalOpenForViewDocument(true);
  };


  const renderFile = () => {
    if (!viewFile) return null;

    if (viewFile.fileType === 'application/pdf') {
      return <iframe src={viewFile.base64Url} title="PDF Viewer" style={{ width: '100%', height: '500px' }} />;
    }
    else if (viewFile.fileType.startsWith('image/')) {
      return <img src={viewFile.base64Url} alt="Preview" style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />;
    }
    else if (
      viewFile.fileType === 'application/vnd.ms-excel' ||
      viewFile.fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      const handleDownload = () => {
        const link = document.createElement('a');
        link.href = viewFile.base64Url;
        link.download = viewFile.fileName || 'file.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      return (
        <div>
          <p>Excel files cannot be previewed. Click below to download:</p>
          <Button
            type="button"
            className="newButton mt-2 mb-2"
            color="primary"
            outline
            style={{ marginRight: '10px' }}
            onClick={handleDownload}
          >
            <FontAwesomeIcon
              icon={faDownload}
              style={{ marginRight: "5px" }}
            />
            Download {viewFile.fileName}
          </Button>



        </div>
      );
    }
    else if (viewFile.fileType === 'text/csv') {
      try {
        const csvText = atob(viewFile.split(',')[1]);
        const rows = csvText.split('\n').map((row) => row.split(','));

        return (
          <table className="table table-bordered">
            <thead>
              <tr>{rows[0].map((col, i) => <th key={i}>{col}</th>)}</tr>
            </thead>
            <tbody>
              {rows.slice(1).map((row, i) => (
                <tr key={i}>{row.map((col, j) => <td key={j}>{col}</td>)}</tr>
              ))}
            </tbody>
          </table>
        );
      } catch (error) {
        return (
          <div>
            <p>Error loading CSV preview. Click below to download:</p>
            <a href={viewFile} download={viewFile.fileName} className="btn btn-primary">
              Download {viewFile.fileName}
            </a>
          </div>
        );
      }
    }
    else {
      return <p>Unsupported file format</p>;
    }
  };


  const handleCloseViewDocument = async () => {
    setIsModalOpenForViewDocument(false);
  }






  const handleChangeDamageDetails = (e) => {
    const { name } = e.target;
    const value = e.target.type === 'checkbox' ? (e.target.checked ? 'Y' : 'N') : e.target.value;

    setSbDocumentUpload((prev) =>
      prev.map((item) => ({
        ...item,
        [name]: value
      }))
    );
  };


  const [isModalOpenForAddBatch, setIsModalOpenForAddBatch] = useState(false);
  const [selectedSrNo, setSelectedSrNo] = useState("");

  const [batchData, setBatchData] = useState([{
    batchNo: "",
    receivingId: "",
    receivingSrNo: 0,
    srNo: 0,
    startDate: null,
    endDate: null
  }])

  const handleBatchChange = (e, index) => {
    const { name, value } = e.target;

    setBatchData((prevState) => {
      const updatedRows = [...prevState];
      updatedRows[index] = {
        ...updatedRows[index],
        [name]: value,
      };
      return updatedRows;
    });
  }

  const openAddBatchModal = (srNo) => {

    setIsModalOpenForAddBatch(true);
    setSelectedSrNo(srNo);
    getBatchData(srNo);
  }

  const closeAddBatchModal = () => {
    setIsModalOpenForAddBatch(false);
    setSelectedSrNo("");
    setBatchData([{
      batchNo: "",
      receivingId: "",
      receivingSrNo: 0,
      srNo: 0,
      startDate: null,
      endDate: null
    }])
  }

  const addBatch = () => {
    const addData = {
      batchNo: "",
      receivingId: "",
      receivingSrNo: 0,
      srNo: 0,
      startDate: null,
      endDate: null
    }

    setBatchData([...batchData, addData]);
  }

  const removeBatch = (index) => {
    const updated = batchData.filter((_, i) => i !== index);
    setBatchData(updated);
  };

  const handleSaveBatch = () => {

    if (batchData.length === 0) {
      toast.error('Please enter batch data', {
        autoClose: 800
      })
      return;
    }

    for (let i = 0; i < batchData.length; i++) {
      const { batchNo, startDate, endDate } = batchData[i];

      if (!batchNo) {
        toast.error(`Error: Batch no are missing for batch entry ${i + 1}.`, {
          autoClose: 800,
        });
        return; // Stop the process if validation fails
      }

      if (!startDate) {
        toast.error(`Error: Mfg Date are missing for batch entry ${i + 1}.`, {
          autoClose: 800,
        });
        return; // Stop the process if validation fails
      }

      if (!endDate) {
        toast.error(`Error: Exp Date are missing for batch entry ${i + 1}.`, {
          autoClose: 800,
        });
        return; // Stop the process if validation fails
      }
    }

    setLoading(true);

    axios.post(`${ipaddress}api/receiving/saveBatchData`, batchData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      },
      params: {
        cid: companyid,
        bid: branchId,
        user: userId,
        receivingId: inBond.receivingId,
        rSrNo: selectedSrNo
      }
    })
      .then((response) => {
        setLoading(false);

        toast.success("Batch data save successfully!!", {
          autoClose: 800
        })

        setBatchData(response.data.map((item) => ({
          batchNo: item.batchNo || "",
          receivingId: item.receivingId || "",
          receivingSrNo: item.receivingSrNo || 0,
          srNo: item.srNo || 0,
          startDate: item.startDate === null ? null : new Date(item.startDate),
          endDate: item.endDate === null ? null : new Date(item.endDate),
        })))

      })
      .catch((error) => {
        setLoading(false);
        if (error) {
          toast.error(error.response.data, {
            autoClose: 800
          })
        }
      })
  }

  const getBatchData = (srNo) => {
    setLoading(true);
    axios.get(`${ipaddress}api/receiving/getBatchData`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      },
      params: {
        cid: companyid,
        bid: branchId,
        user: userId,
        receivingId: inBond.receivingId,
        rSrNo: srNo
      }
    })
      .then((response) => {
        setLoading(false);


        setBatchData(response.data.map((item) => ({
          batchNo: item.batchNo || "",
          receivingId: item.receivingId || "",
          receivingSrNo: item.receivingSrNo || 0,
          srNo: item.srNo || 0,
          startDate: item.startDate === null ? null : new Date(item.startDate),
          endDate: item.endDate === null ? null : new Date(item.endDate),
        })))
      })
      .catch((error) => {
        setLoading(false);
        setBatchData([{
          batchNo: "",
          receivingId: "",
          receivingSrNo: 0,
          srNo: 0,
          startDate: null,
          endDate: null
        }])
      })
  }

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
        {/* <Card>
          <CardBody> */}
        <div>
          <Row>

            <Modal
              Modal
              isOpen={isModalOpenForIGMSearch}
              onClose={closeIGMSearchModal}
              toggle={closeIGMSearchModal}
              style={{
                maxWidth: "1200px",
                fontSize: 12,
                wioverflow: "-moz-hidden-unscrollable",
              }}
            >
              <ModalHeader
                toggle={closeIGMSearchModal}
                style={{
                  backgroundColor: "#80cbc4",
                  color: "black",
                  fontFamily: "Your-Heading-Font",
                  textAlign: "center",
                  background: "#26a69a",
                  boxShadow: "0px 5px 10px rgba(0, 77, 64, 0.3)",
                  border: "1px solid rgba(0, 0, 0, 0.3)",
                  borderRadius: "0",
                  backgroundImage:
                    "radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  //backgroundPosition: 'center',
                  backgroundPosition: "center",
                }}
              >
                <h5
                  className="pageHead"
                  style={{
                    fontFamily: "Your-Heading-Font",
                    color: "white",
                  }}
                >
                  {" "}
                  <FontAwesomeIcon
                    icon={faSearch}
                    style={{
                      marginRight: "8px",
                      color: "white", // Set the color to golden
                    }}
                  />{" "}
                  Search In Bonding
                </h5>
              </ModalHeader>
              <ModalBody
                style={{
                  backgroundImage:
                    "url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)",
                  backgroundSize: "cover",
                }}
              >
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <label
                        className="forlabel bold-label"
                        htmlFor="sbRequestId"
                      >
                        Search by Receiving Id / Importer /Job Trans Id
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="chaSearchId"
                        maxLength={15}
                        name="chaSearchId"
                        value={chaSearchId}
                        onChange={(e) =>
                          setChaSearchId(e.target.value)
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4} style={{ marginTop: 24 }}>
                    <button
                      className="btn btn-outline-primary btn-margin newButton"
                      style={{ marginRight: 10 }}
                      id="submitbtn2"
                      onClick={() => searchCHA(chaSearchId)}
                    >
                      <FontAwesomeIcon
                        icon={faSearch}
                        style={{ marginRight: "5px" }}
                      />
                      Search
                    </button>
                    <button
                      className="btn btn-outline-danger btn-margin newButton"
                      style={{ marginRight: 10 }}
                      id="submitbtn2"
                      onClick={clearSearch}
                    >
                      <FontAwesomeIcon
                        icon={faRefresh}
                        style={{ marginRight: "5px" }}
                      />
                      Reset
                    </button>
                  </Col>
                </Row>
                <hr />
                <div className="mt-1 table-responsive ">
                  <table className="table table-bordered table-hover tableHeader">
                    <thead className="tableHeader">
                      <tr>
                        <th scope="col">Select</th>
                        <th scope="col">Receiving Id</th>
                        <th scope="col">Receiving Date</th>
                        <th scope="col">Job Trans Id</th>

                        <th scope="col">Job No </th>
                        <th scope="col"> BOE No</th>
                        <th scope="col">BOE Date</th>
                        <th scope="col">Impoter Name</th>

                        <th scope="col">Status</th>
                      </tr>
                      <tr className="text-center">
                        <th scope="col"></th>
                        <th scope="col">{chaSearchedData.length}</th>
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
                      {currentItems.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              type="radio"
                              name="radioGroup"
                              onChange={() =>
                                selectIGMSearchRadio(
                                  item.jobTransId,
                                  item.receivingId,
                                  item.jobNo,

                                )
                              }
                              value={item[0]}
                            />
                          </td>
                          <td>{item.receivingId}</td>
                          <td>{item.receivingDate ? format(new Date(item.receivingDate), 'dd/MM/yyyy HH:mm') : null}</td>
                          <td>{item.jobTransId}</td>
                          <td>{item.jobNo}</td>
                          <td>{item.boeNo}</td>
                          <td>{item.boeDate ? format(new Date(item.boeDate), 'dd/MM/yyyy HH:mm') : null}</td>
                          <td>{item.importerName}</td>
                          <td>{item.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Pagination
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      color: "gray",
                    }}
                  >
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
                    <Pagination.Last
                      onClick={() => handlePageChange(totalPages)}
                    />
                  </Pagination>
                </div>
              </ModalBody>
            </Modal>
          </Row>

          {/* <hr /> */}
          <Row>
            <Col md={2}>
              <Row>
                <Col md={9}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="receivingId"
                    >
                      Receiving Id
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="receivingId"
                      name="receivingId"
                      value={inBond.receivingId}
                      maxLength={27}
                      disabled

                    />
                  </FormGroup>
                </Col>

                <Col md={3} className="d-flex justify-content-end" style={{ marginTop: 21 }}>
                  <button
                    className="btn btn-outline-primary btn-margin newButton"
                    style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    id="submitbtn2"
                    onClick={openIGMSearchModal}
                  >
                    <FontAwesomeIcon
                      icon={faSearch}
                    />

                  </button>
                </Col>
              </Row>

            </Col>
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="receivingDate"
                >
                  Receiving Date <span style={{ color: 'red' }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={inBond.receivingDate}
                    onChange={handleNocTransDate}
                    id="receivingDate"
                    name="receivingDate"
                    dateFormat="dd/MM/yyyy HH:mm"
                    showTimeInput
                    value={inBond.receivingDate}
                    //  disabled
                    timeFormat="HH:mm"
                    className="form-control border-right-0 inputField"
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
                <label className="forlabel bold-label" htmlFor="boeNo">
                  BE/Job No <span className="error-message">*</span>
                </label>
                <Select
                  value={inBond.boeNo ? { value: inBond.boeNo, label: isoName } : null}
                  onChange={handleBoeChange}
                  // onInputChange={getBoeData}
                  onInputChange={(inputValue, { action }) => {
                    if (action === 'input-change') {
                      getBoeData(inputValue);
                    }
                  }}
                  filterOption={() => true}
                  options={boeData}
                  placeholder="Search BE/Job No"
                  isClearable
                  id="boeNo"
                  vesselName="boeNo"
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
                <div style={{ color: 'red' }} className="error-message">{errors.boeNo}</div>
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="boeDate">
                  BE Date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={inBond.boeDate}
                    onChange={handleNocValidityDateChnage}
                    id="boeDate"
                    name="boeDate"
                    disabled

                    dateFormat="dd/MM/yyyy"
                    className="form-control border-right-0 inputField"
                    wrapperClassName="custom-react-datepicker-wrapper"
                    minDate={getMinDate(inBond.boeDate)}
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
                <div style={{ color: "red" }} className="error-message">
                  {bondingErrors.nocValidityDate}
                </div>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Approved By
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="approvedBy"
                  disabled

                  maxLength={15}
                  name="approvedBy"
                  value={inBond.approvedBy}
                />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Status
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="status"
                  maxLength={15}
                  disabled

                  name="status"
                  value={inBond.status === "A" ? "Approved" : inBond.status === "N" ? "New" : ""}
                />
              </FormGroup>
            </Col>

          </Row>
          <Row>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="gateInId">
                  Gate In Id
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="gateInId"
                  maxLength={15}
                  name="gateInId"
                  value={inBond.gateInId}
                  disabled

                />
                <div style={{ color: "red" }} className="error-message">
                  {bondingErrors.gateInId}
                </div>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="jobNo">
                  Job No
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="jobNo"
                  maxLength={15}
                  name="jobNo"
                  value={inBond.jobNo}
                  disabled

                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="docDate">
                  Job Date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={inBond.jobDate}
                    onChange={handleDocDateChange}
                    id="nocDate"
                    disabled

                    name="nocDate"
                    dateFormat="dd/MM/yyyy"
                    className="form-control border-right-0 inputField"

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
                <label
                  className="forlabel bold-label"
                  htmlFor="jobTransDate"
                >
                  Job Trans Date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={inBond.jobTransDate}
                    onChange={handleNocTransDate}
                    id="jobTransDate"
                    name="jobTransDate"
                    dateFormat="dd/MM/yyyy HH:mm"
                    showTimeSelect
                    value={inBond.jobTransDate}
                    disabled

                    timeFormat="HH:mm"
                    className="form-control border-right-0 inputField"

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
                <label className="forlabel bold-label" htmlFor="depositNo">
                  Deposite No
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="depositNo"
                  maxLength={15}
                  name="depositNo"
                  value={inBond.depositNo}
                  disabled

                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Created By <span className="error-message"></span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="createdBy"
                  disabled

                  maxLength={15}
                  name="createdBy"
                  value={inBond.createdBy}
                />
              </FormGroup>
            </Col>

          </Row>

          <Row>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="spaceAllocated">
                  Space Allocated
                </label>
                <select
                  className="form-control"
                  id="spaceAllocated"
                  name="spaceAllocated"
                  value={inBond.spaceAllocated}
                  disabled={inBond.receivingId}
                  onChange={(e) => {
                    setInBond((prevNOC) => ({
                      ...prevNOC,
                      spaceAllocated: e.target.value,
                    }));
                  }}
                >
                  <option value="">Select Space</option>
                  <option value="COVERED">Covered Space</option>
                  <option value="OPEN">Open Space</option>
                </select>
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="cargoCondition">
                  Cargo Condition <span className="error-message">*</span>
                </label>
                <select
                  className={`form-control ${inBond.cargoCondition ? 'border-reset' : ''}`}
                  id="cargoCondition"
                  name="cargoCondition"
                  value={inBond.cargoCondition} // Should match option values
                  onChange={(e) =>
                    setInBond((prevNOC) => ({
                      ...prevNOC,
                      cargoCondition: e.target.value,
                    }))
                  }
                >
                  <option value="">Select </option>
                  <option value="HDM">Heavy Damage</option>
                  <option value="LDM">Light Damage</option>
                  <option value="MDM">Medium Damage</option>
                  <option value="WOW">Healthy</option>
                </select>
              </FormGroup>
            </Col>


            <Col md={4}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="importerName"
                >
                  Importer Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="importerName"
                  maxLength={15}
                  name="importerName"
                  value={inBond.importerName}
                  disabled

                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="cha">
                  CHA
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="cha"
                  disabled

                  maxLength={15}
                  name="cha"
                  value={chaName}
                  onChange={handleNocChange}
                />
                <div style={{ color: "red" }} className="error-message">
                  {bondingErrors.cha}
                </div>
              </FormGroup>
            </Col>
          </Row>

          <Row>


            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="areaAllocated"
                >
                  Area Allocated
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="areaAllocated"
                  maxLength={15}
                  name="areaAllocated"
                  value={inBond.areaAllocated}
                  disabled

                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="areaOccupied"
                >
                  Area Occupied
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="areaOccupied"
                  maxLength={15}
                  name="areaOccupied"
                  value={inBond.areaOccupied}
                  disabled

                />
                <div style={{ color: "red" }} className="error-message">
                  {bondingErrors.uom}
                </div>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="gateInPackages"
                >
                  Gate In Packages
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="gateInPackages"
                  maxLength={15}
                  name="gateInPackages"
                  value={inBond.gateInPackages}
                  onChange={handleNocChange}
                  disabled

                />

                <div style={{ color: "red" }} className="error-message">
                  {bondingErrors.gateInPackages}
                </div>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="receivedPackages"
                >
                  Receiving Packages
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="receivedPackages"
                  maxLength={15}
                  name="receivedPackages"
                  value={inBond.receivedPackages}
                  disabled

                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="gateInWeight"
                >
                  Gate In Weight
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="gateInWeight"
                  maxLength={15}
                  name="gateInWeight"
                  disabled

                  value={inBond.gateInWeight}
                  onChange={handleNocChange}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="receivedWeight"
                >
                  Receiving Weight
                </label>
                <input
                  disabled

                  className="form-control"
                  type="text"
                  id="receivedWeight"
                  name="receivedWeight"
                  value={inBond.receivedWeight}
                  onChange={handleNocChange}
                  maxLength={15}
                />
              </FormGroup>
            </Col>

          </Row>


          <Row>

            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="noOf20Ft">
                  No of 20 FT Containers
                </label>

                <input
                  className="form-control"
                  type="text"
                  id="noOf20Ft"
                  maxLength={5}
                  name="noOf20Ft"
                  value={inBond.noOf20Ft}
                  onChange={handleNocChange}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="noOf40Ft">
                  No of 40 FT Containers
                </label>

                <input
                  className="form-control"
                  type="text"
                  id="noOf40Ft"
                  maxLength={5}
                  name="noOf40Ft"
                  value={inBond.noOf40Ft}
                  onChange={handleNocChange}

                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="noOfMarks"
                >
                  Mark Nos
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="noOfMarks"
                  maxLength={15}
                  name="noOfMarks"
                  value={
                    inBond.noOfMarks != null
                      ? inBond.noOfMarks
                      : "0"
                  }
                  onChange={handleNocChange}

                />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="crossingCargo">
                  Crossing Cargo
                </label>
                <select
                  className="form-control"
                  id="crossingCargo"
                  name="crossingCargo"
                  value={inBond.crossingCargo}
                  onChange={(e) =>
                    setInBond((prevNOC) => ({
                      ...prevNOC,
                      crossingCargo: e.target.value,
                    }))
                  }
                >
                  <option value="N">NO</option>
                  <option value="Y">YES</option>

                </select>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="comments">
                  Remarks
                </label>

                <Input
                  className="form-control"
                  type="textarea"
                  id="comments"
                  maxLength={149}
                  name="comments"
                  value={inBond.comments}
                  onChange={handleNocChange}

                />
              </FormGroup>
            </Col>
          </Row>
          {/* <Row>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="cargoDuty">
                Cargo Duty
                </label>

                <input
                  className="form-control"
                  type="text"
                  id="cargoDuty"
                  maxLength={5}
                  name="cargoDuty"
                  value={
                    inBond.cargoDuty != null
                      ? inBond.cargoDuty
                      : "0"
                  }
                  onChange={handleNocChange}
                 
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="cargoValue"
                >
                Cargo Value
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="cargoValue"
                  maxLength={15}
                  name="cargoValue"
                  value={
                    inBond.cargoValue != null
                      ? inBond.cargoValue
                      : "0"
                  }
                  onChange={handleNocChange}
                
                />
              </FormGroup>
            </Col>
          </Row> */}

          <Row>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="handlingEquip1">
                  Handling Equipment <span className="error-message">*</span>
                </label>
                <select
                  className={`form-control ${inBond.handlingEquip1 ? 'border-reset' : ''}`}
                  id="handlingEquip1"
                  name="handlingEquip1"
                  value={inBond.handlingEquip1} // Should match option values
                  onChange={(e) =>
                    setInBond((prevNOC) => ({
                      ...prevNOC,
                      handlingEquip1: e.target.value,
                    }))
                  }
                >
                  <option value="">Select </option>
                  <option value="Fork">Fork</option>
                  <option value="Labour">Labour</option>
                  <option value="Hydra">Hydra</option>
                  <option value="Kalmar">Kalmar</option>
                </select>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="handlingEquip2">
                  Handling Equipment 2 <span className="error-message">*</span>
                </label>
                <select
                  className={`form-control ${inBond.handlingEquip2 ? 'border-reset' : ''}`}
                  id="handlingEquip2"
                  name="handlingEquip2"
                  value={inBond.handlingEquip2} // Should match option values
                  onChange={(e) =>
                    setInBond((prevNOC) => ({
                      ...prevNOC,
                      handlingEquip2: e.target.value,
                    }))
                  }
                >
                  <option value="">Select </option>
                  <option value="Fork">Fork</option>
                  <option value="Labour">Labour</option>
                  <option value="Hydra">Hydra</option>
                  <option value="Kalmar">Kalmar</option>
                </select>
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="handlingEquip3">

                  Handling Equipment 3
                </label>
                <select
                  className={`form-control ${inBond.handlingEquip3 ? 'border-reset' : ''}`}
                  id="handlingEquip3"
                  name="handlingEquip3"
                  value={inBond.handlingEquip3} // Should match option values
                  onChange={(e) =>
                    setInBond((prevNOC) => ({
                      ...prevNOC,
                      handlingEquip3: e.target.value,
                    }))
                  }
                >
                  <option value="">Select </option>
                  <option value="Fork">Fork</option>
                  <option value="Labour">Labour</option>
                  <option value="Hydra">Hydra</option>
                  <option value="Kalmar">Kalmar</option>
                </select>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="cargoDuty">
                  Cargo Duty
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="cargoDuty"
                  maxLength={16} // 13 digits + 1 decimal + 2 decimals
                  name="cargoDuty"
                  value={inBond.cargoDuty != null ? inBond.cargoDuty : "0.00"}
                  pattern="^\d{0,13}(\.\d{0,2})?$"
                  step="0.01"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,13}(\.\d{0,2})?$/.test(value) || value === "") {
                      handleNocChange(e);
                    }
                  }}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="cargoValue">
                  Cargo Value
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="cargoValue"
                  maxLength={16} // 13 digits + 1 decimal + 2 decimals
                  name="cargoValue"
                  value={inBond.cargoValue != null ? inBond.cargoValue : "0.00"}
                  pattern="^\d{0,13}(\.\d{0,2})?$"
                  step="0.01"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,13}(\.\d{0,2})?$/.test(value) || value === "") {
                      handleNocChange(e);
                    }
                  }}
                />
              </FormGroup>
            </Col>
          </Row>

        </div>
        <hr />
        <Row className="text-center">
          <Col>
            <button
              className="btn btn-outline-primary btn-margin newButton"
              style={{ marginRight: 10 }}
              id="submitbtn2"
              // disabled={inBond.status==="A"}
              onClick={handleSave}
            >
              <FontAwesomeIcon
                icon={faSave}
                style={{ marginRight: "5px" }}
              />
              Save
            </button>

            {/* <button
                  className="btn btn-outline-primary btn-margin newButton"
                  style={{ marginRight: 10 }}
                  id="submitbtn2"
                  disabled={inBond.status==="A"}
                  onClick={handleSubmit}
                >
                  <FontAwesomeIcon
                    icon={faSave}
                    style={{ marginRight: "5px" }}
                  />
                  Submit
                </button> */}

            {/* {inBond.status ==="A" ?
(
<button
              className="btn btn-outline-primary btn-margin newButton"
              style={{ marginRight: 10 }}
              id="submitbtn2"
              onClick={()=> handlePrint('PRINT')}
            >
              <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
              Print
            </button>

):null} */}
            <button
              className="btn btn-outline-primary btn-margin newButton"
              style={{ marginRight: 10 }}
              // disabled={inBond.status==="A"}
              onClick={addRow} >
              <FontAwesomeIcon icon={faAdd} style={{ marginRight: "5px" }} />
              Add Row
            </button>

            <button
              className="btn btn-outline-danger btn-margin newButton"
              style={{ marginRight: 10 }}
              id="submitbtn2"
              onClick={handleClear}
            >
              <FontAwesomeIcon
                icon={faRefresh}
                style={{ marginRight: "5px" }}
              />
              Clear
            </button>
          </Col>
        </Row>
        <hr />


        <div className="mt-1 table-responsive ">
          <table className="table table-bordered table-hover tableHeader">
            <thead className='tableHeader'>
              <tr>
                <th scope="col" className="text-center" style={{ color: "black" }} >Select Yard Location <span className="error-message">*</span></th>
                <th scope="col" className="text-center" style={{ color: "black" }} >   Yard Location  <span className="error-message">*</span>   </th>
                <th scope="col" className="text-center" style={{ color: "black" }} >   Yard Block    </th>
                <th scope="col" className="text-center" style={{ color: "black" }} >Cell</th>
                <th scope="col" className="text-center" style={{ color: "black" }} >Cell Area</th>
                <th scope="col" className="text-center" style={{ color: "black" }} >Cell Area Used</th>
                <th scope="col" className="text-center" style={{ color: "black" }} >Yard Packages <span className="error-message">*</span></th>
                <th scope="col" className="text-center" style={{ color: "black" }} >Cell Area Allocated <span className="error-message">*</span></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <Select

                      isClearable
                      menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                      menuPosition="fixed" // Sets the dropdown menu position to fixed    
                      menuPlacement="top"
                      onMenuOpen={() => {
                        if (!inBond.spaceAllocated) {

                          toast.error("Select Space Allocated first", {
                            position: 'top-center',
                            autoClose: 1000,
                          });
                          // alert("Space Allocated is not available.");
                        }
                      }}
                      options={yardLocationsData.map((party) => ({
                        value: `${party.yardLocationId}-${party.blockId}-${party.cellNoRow}`,
                        label: `${party.yardLocationId}-${party.blockId}-${party.cellNoRow}`,
                        areaUsed: party.cellAreaUsed,
                        area: party.cellArea,
                        yard: party.yardLocationId,
                        yardBlock: party.blockId,
                        yardBCell: party.cellNoRow,
                        cellAreaUsed: party.cellAreaUsed,
                        receivedPackages: party.receivedPackages,
                        cellAreaAllocated: party.cellAreaAllocated,
                      }))}
                      onChange={(selectedOption) =>
                        handleSelectChange(index, selectedOption)
                      }
                      styles={{
                        container: (base) => ({ ...base, width: '180px' }),
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Ensure the dropdown is above other elements
                      }}

                    />
                  </td>
                  <td>
                    <Input
                      className="form-control"
                      type="text"
                      value={row.yardLocation}
                      name='yardLocation'
                      disabled
                      style={{
                        borderColor:
                          errors[`yardLocation-${index}`] ? "red" : "",
                      }}
                    />
                    {errors[`yardLocation-${index}`] && (
                      <span style={{ color: "red" }}>
                        {errors[`yardLocation-${index}`]}
                      </span>
                    )}

                  </td>
                  <td>
                    <Input
                      className="form-control"
                      type="text"
                      name="yardBlock"
                      value={row.yardBlock}
                      disabled
                    />

                  </td>
                  <td>
                    <Input
                      className="form-control"
                      type="text"
                      name="blockCellNo"
                      value={row.blockCellNo}

                      disabled
                    />
                  </td>
                  <td>
                    <Input
                      className="form-control"
                      type="text"
                      value={row.cellArea}
                      name="cellArea"

                      disabled
                    />
                  </td>
                  <td>
                    <Input
                      className="form-control"
                      type="text"
                      name="cellAreaUsed"
                      value={row.cellAreaUsed}

                      disabled
                    />
                  </td>
                  <td>
                    <Input
                      className="form-control"
                      type="text"
                      value={row.receivedPackages}
                      name="receivedPackages"
                      onChange={(e) => handleInputChange(index, e)}
                      style={{
                        borderColor: errors[`receivedPackages-${index}`] ? "red" : "",
                      }}
                    />
                    {errors[`receivedPackages-${index}`] && (
                      <span style={{ color: "red" }}>
                        {errors[`receivedPackages-${index}`]}
                      </span>
                    )}
                  </td>
                  <td>
                    <Input
                      className="form-control"
                      type="text"
                      name="cellAreaAllocated"
                      value={row.cellAreaAllocated}
                      onChange={(e) => handleInputChange(index, e)}
                      disabled={inBond.spaceAllocated === 'OPEN'}
                      style={{
                        borderColor:
                          errors[`cellAreaAllocated-${index}`] ? "red" : "",
                      }}
                    />
                    {errors[`cellAreaAllocated-${index}`] && (
                      <span style={{ color: "red" }}>
                        {errors[`cellAreaAllocated-${index}`]}
                      </span>
                    )}
                  </td>
                  {/* <td>
                {row.inBondingId }
                <button
                  onClick={() => deleteRow(index)}
                  className="btn btn-danger"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
                              </td> */}

                  {!row.inBondingId && row.status !== 'A' && (
                    <>
                      <td>
                        {/* <button
                          onClick={() => deleteRow(index)}
                          disabled={row.status === 'A'}
                          className="btn btn-danger"
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button> */}


                        <Button type="button" onClick={() => deleteRow(index)}
                          className="newButton"
                          color="danger"
                          outline>
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>

                      </td>
                    </>
                  )}

                </tr>
              ))}
            </tbody>
          </table>
          {errors.totalPackages && (
            <div style={{ color: "red" }}>{errors.totalPackages}</div>
          )}
        </div>
        {/* <Row className="text-center">
    <Col  className="d-flex justify-content-center" style={{ marginTop: '24px' }}>
        <button
            className="btn btn-outline-primary btn-margin newButton"
            style={{ marginRight: 10 }}
            id="submitbtn2"
            // disabled={inBond.status==="A"}
            onClick={handleSaveCfBondGrid}
        >
            <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
            Save
        </button>


        <button
            className="btn btn-outline-danger btn-margin newButton"
            style={{ marginRight: 10 }}
            id="submitbtn2"
            onClick={() => handleYardReset()}
        >
            <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
            Reset
        </button>
    </Col>
</Row> */}
        <hr />

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
            {" "}
            <FontAwesomeIcon
              icon={faGroupArrowsRotate}
              style={{
                marginRight: "8px",
                color: "black", // Set the color to golden
              }}
            />
            Receiving Cargo Details
          </h5>
          <table className="table table-bordered table-hover tableHeader" >
            <thead className="tableHeader"  >
              <tr>
                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  <input
                    type="checkbox"
                    style={{ transform: "scale(1.5)" }}
                    checked={selectAll}
                    onChange={(event) => handleSelectAll(event)}
                    disabled={inBond.receivingId}
                  />
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Sr No.
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Commodity
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Type Of Package
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  JOB Package
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Gate In Package
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Gate In Weight
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Gate In Id
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Gate In Date
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Vehicle No
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Container No
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Container Size
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Container Type
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Old Recived PKG
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Old Recived Weight
                </th>



                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Bal Receiving PKG
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Bal Receiving Weight
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Receiving Package <span className="error-message">*</span>
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Receiving Weight <span className="error-message">*</span>
                </th>

                <th scope="col" className="text-center" style={{ color: 'black' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((dtl, index) => (
                <tr key={index} className="text-center">
                  <td>
                    <input
                      type="checkbox"
                      style={{ transform: "scale(1.5)" }}
                      disabled={dtl.receivingId}
                      checked={
                        (inBond.receivingId === dtl.receivingId) ||
                        selectedRows.some
                          ((selectedRow) =>
                            selectedRow.jobTransId === dtl.jobTransId &&
                            selectedRow.jobNo === dtl.jobNo &&
                            selectedRow.commodityId === dtl.commodityId &&
                            selectedRow.srNo === dtl.srNo
                          )
                      }
                      onChange={(e) => handleCheckboxChangeForDtl(e, dtl)}
                    />
                  </td>
                  <th scope="row">{index + 1}</th>
                  <td>{dtl.commodityDescription}</td>
                  <td>{dtl.typeOfPackage}</td>
                  <td>{dtl.jobNop}</td>
                  <td>{dtl.noOfPackages || dtl.gateInPackages}</td>
                  <td>{dtl.grossWeight || dtl.gateInWeight}</td>

                  <td>{dtl.gateInId}</td>
                  <td>{dtl.gateInDate ? format(new Date(dtl.gateInDate), 'dd/MM/yyyy HH:mm') : ''}</td>
                  <td>{dtl.vehicleNo}</td>
                  <td>{dtl.containerNo}</td>
                  <td>{dtl.containerSize}</td>
                  <td>{dtl.containerType}</td>

                  {/* <td>{dtl.receivingPackages != null ? dtl.receivingPackages : 0}</td> */}

                  <td>{inputValues[index]?.oldReceivedPackages}</td>
                  <td>{inputValues[index]?.oldReceivedWeight}</td>
                  {/* <td>{dtl.balanceReceivedPackages}</td>
                  <td>{dtl.balanceReceivedWeight}</td> */}

                  {/* 

                  <td>{dtl.balanceReceivedPackages || dtl.balanceReceivedPackages}</td>
                  <td>{dtl.balanceReceivedWeight || dtl.balanceReceivedWeight}</td> */}

                  {/* <td>{inputValues[index]?.oldReceivedPackages}</td> */}
                  <td>{inputValues[index]?.balanceReceivedPackages}</td>
                  <td>{inputValues[index]?.balanceReceivedWeight}</td>

                  <td style={{ textAlign: "center" }}>
                    <input
                      className="form-control"
                      style={{ width: "126px" }}
                      type="text"
                      value={inputValues[index]?.receivingPackages}
                      placeholder="Enter PKGS"
                      onChange={(e) => {
                        const regex = /^[0-9]*\.?[0-9]*$/;
                        if (regex.test(e.target.value)) {
                          handleInputChangeFotDtl(
                            e,
                            "receivingPackages",
                            index
                          )
                        }
                      }}
                      onPaste={(e) => {
                        const pastedData = e.clipboardData.getData("text");
                        if (!/^[0-9]*\.?[0-9]*$/.test(pastedData)) {
                          e.preventDefault();
                        }
                      }}
                    />

                    {inputValues[index]?.errorMessage &&
                      inputValues[index]?.errorMessage.includes(
                        "Receiving Packages"
                      ) && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                          {inputValues[index]?.errorMessage}
                        </span>
                      )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      className="form-control"
                      disabled
                      style={{ width: "126px" }}
                      type="number"
                      value={inputValues[index]?.receivingWeight}
                      onChange={(e) =>
                        handleInputChangeFotDtl(e, "receivingWeight", index, 13, 3)
                      }
                    />
                  </td>


                  <td className="text-center">
                    {/* {((role === 'ROLE_ADMIN' || allowEdit) && dtl.receivingId) && (
                      <FontAwesomeIcon
                        icon={faUpload}
                        onClick={() => handleOpenDocumentUpload(dtl)}
                        style={{ color: 'green', cursor: 'pointer', fontSize: '24px' }}
                      />
                    )} */}
                    <td className="text-center">
                      <div className="">
                        <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                          <FontAwesomeIcon icon={faAtom} style={{ marginRight: '5px' }} />
                          Action
                        </button>
                        <ul className="dropdown-menu">
                          {((role === 'ROLE_ADMIN' || allowEdit) && dtl.receivingId) && (
                            <li>
                              <button className="dropdown-item" onClick={() => handleOpenDocumentUpload(dtl)}>
                                <FontAwesomeIcon icon={faUpload} style={{ marginRight: "5px" }} />Upload Damage Doc
                              </button>
                            </li>)}
                          {((role === 'ROLE_ADMIN' || allowEdit) && dtl.receivingId) && (
                            <li>
                              <button className="dropdown-item" onClick={() => openAddBatchModal(dtl.srNo)}>
                                <FontAwesomeIcon icon={faAdd} style={{ marginRight: "5px" }} />Add Batch
                              </button>
                            </li>)}

                        </ul>
                      </div>
                    </td>

                  </td>


















                </tr>
              ))}
            </tbody>
          </table>






        </div>

      </div>















      {/* Document Upload */}

      <Modal Modal isOpen={isModalOpenForDocumentUpload} onClose={handleCloseDocumentUpload} toggle={handleCloseDocumentUpload} style={{ maxWidth: '1000px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>

        <ModalHeader toggle={handleCloseDocumentUpload} style={{
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
            icon={faUpload}
            style={{
              marginRight: '8px',
              color: 'white',
            }}
          />Container Document Upload</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
          <Row>

            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbNo">
                  Container No
                </label>
                <Input
                  className="form-control"
                  type="text"
                  maxLength={15}
                  name='sbNo'
                  value={sbDocumentUpload[0]?.sbTransId || ""}
                  disabled
                />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbTransId">
                  Commodity Description
                </label>
                <input
                  className="form-control"
                  type="text"
                  maxLength={15}
                  name='SbTransId'
                  value={sbDocumentUpload[0]?.commodityDescription || ""}
                  disabled
                />
              </FormGroup>
            </Col>



            <Col md={6}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="fileUpload">
                  Upload File (Image/PDF/XLS)
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="fileUpload"
                  multiple
                  accept="image/png, image/jpeg, application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  onChange={handleFileUploadFileChange}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>

            <Col xs={12} md={6}>

              <Row>


                <Col xs={12} md={6}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="isContainerDamage">
                      Container Damage
                    </label>
                    <Input
                      className={`form-control`}
                      type="checkbox"
                      name='isContainerDamage'
                      checked={sbDocumentUpload[0]?.isContainerDamage === 'Y'}
                      onChange={handleChangeDamageDetails}
                      style={{ width: '20px', height: '24px', cursor: 'pointer', margin: '0' }}
                    />
                  </FormGroup>
                </Col>


                <Col xs={12} md={6}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="isCargoDamage">
                      Cargo Damage
                    </label>
                    <Input
                      className={`form-control`}
                      type="checkbox"
                      name='isCargoDamage'
                      checked={sbDocumentUpload[0]?.isCargoDamage === 'Y'}
                      onChange={handleChangeDamageDetails}
                      style={{ width: '20px', height: '24px', cursor: 'pointer', margin: '0' }}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Col>

            <Col md={6}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="damageRemark"
                >
                  Remark
                </label>
                <textarea
                  className="form-control"
                  id="damageRemark"
                  name='damageRemark'
                  value={sbDocumentUpload[0]?.damageRemark}
                  onChange={handleChangeDamageDetails}
                  maxLength={300}
                  rows={2}
                ></textarea>
              </FormGroup>
            </Col>


          </Row>





          {sbDocumentUpload.length > 0 && sbDocumentUpload.some(file => file.fileName) && (
            <div className="file-scroll-container">
              <Row className="flex-nowrap">
                {sbDocumentUpload.map((file, index) => (
                  file.base64Url && (
                    <Col key={index} md="auto">
                      <div className="file-preview-wrapper">
                        <div className="file-preview">
                          <span className="remove-btn" onClick={() => handleRemoveFile(index, file.sbNo, file.sbLineNo, file.sbTransId, file.hSbTransId, file.isSaved, file.fileName, file.commodityDescription, file.isCargoDamage, file.isContainerDamage, file.damageRemark)}>&times;</span>
                          <div onClick={() => handleView(file)}>
                            {file.fileType === "application/pdf" ? (
                              <img src={pdfLogo} alt="PDF Preview" className="file-thumbnail" />
                            ) : file.fileType === "application/vnd.ms-excel" ||
                              file.fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                              file.fileType === "text/csv" ? (
                              <img src={xlsLogo} alt="Excel/CSV Preview" className="file-thumbnail" />
                            ) : (
                              <img src={file.base64Url} alt={file.fileName} className="file-thumbnail" />
                            )}
                          </div>

                        </div>
                        <p className="file-name">{file.fileName}</p>
                      </div>
                    </Col>
                  )
                ))}
              </Row>
            </div>
          )}


          <Row className="text-center mt-1 mb-1">
            <Col>
              <button
                className="btn btn-outline-primary btn-margin newButton"
                style={{ marginRight: 10, fontWeight: 'bold' }}
                id="submitbtn2"
                onClick={uploadGeneralDocument}
              >
                <FontAwesomeIcon icon={faUpload} style={{ marginRight: "5px" }} />
                Upload
              </button>
            </Col>
          </Row>
        </ModalBody>
      </Modal >


      <Modal Modal isOpen={isModalOpenForViewDocument} onClose={handleCloseViewDocument} toggle={handleCloseViewDocument} style={{ maxWidth: '1000px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>

        <ModalHeader toggle={handleCloseViewDocument} style={{
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
            icon={faEye}
            style={{
              marginRight: '8px',
              color: 'white',
            }}
          />View Document</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg)', backgroundSize: 'cover' }}>
          {renderFile()}
        </ModalBody>
      </Modal >









      <Modal Modal isOpen={isModalOpenForAddBatch} onClose={closeAddBatchModal} toggle={closeAddBatchModal} style={{ maxWidth: '700px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>

        <ModalHeader toggle={closeAddBatchModal} style={{
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
            icon={faAdd}
            style={{
              marginRight: '8px',
              color: 'white',
            }}
          />Add Batch</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
          <Row>
            <Col className="text-center">
              <button
                className="btn btn-outline-primary btn-margin newButton"
                style={{ marginRight: 10 }}
                id="submitbtn2"
                onClick={handleSaveBatch}
              >
                <FontAwesomeIcon
                  icon={faSave}
                  style={{ marginRight: "5px" }}
                />
                Save
              </button>
              <button
                className="btn btn-outline-success btn-margin newButton"
                style={{ marginRight: 10 }}
                id="submitbtn2"
                onClick={addBatch}
              >
                <FontAwesomeIcon
                  icon={faAdd}
                  style={{ marginRight: "5px" }}
                />
                Add Batch
              </button>
            </Col>
          </Row>
          <div id="datepicker-portal10"></div>
          <div className="mt-3 table-responsive ">
            <table className="table table-bordered table-hover tableHeader">
              <thead className='tableHeader'>
                <tr className='text-center'>
                  <th scope="col">Sr No</th>
                  <th scope="col">Batch No <span style={{ color: 'red' }}>*</span> </th>
                  <th scope="col">Mfg Date <span style={{ color: 'red' }}>*</span></th>
                  <th scope="col">Exp Date <span style={{ color: 'red' }}>*</span></th>
                  <th scope="col">Action</th>
                </tr>

              </thead>
              <tbody>
                {batchData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <Input
                        type="text"
                        name="batchNo"
                        id="batchNo"
                        value={item.batchNo}
                        maxLength={30}
                        onChange={(e) => handleBatchChange(e, index)}
                      />
                    </td>
                    <td>
                      <div style={{ position: "relative" }}>
                        <DatePicker
                          selected={item.startDate}
                          onChange={(date) => {
                            setBatchData((prevState) => {
                              const updatedRows = [...prevState];
                              updatedRows[index] = {
                                ...updatedRows[index],
                                startDate: date,
                                endDate: date >= prevState.endDate ? null : prevState.endDate,
                              };
                              return updatedRows;
                            });
                          }}
                          portalId="datepicker-portal10"
                          id="startDate"
                          name="startDate"
                          dateFormat="dd/MM/yyyy"
                          className="form-control border-right-0 inputField"
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
                    </td>
                    <td>
                      <div style={{ position: "relative" }}>
                        <DatePicker
                          selected={item.endDate}
                          onChange={(date) => {
                            setBatchData((prevState) => {
                              const updatedRows = [...prevState];
                              updatedRows[index] = {
                                ...updatedRows[index],
                                endDate: date,
                              };
                              return updatedRows;
                            });
                          }}
                          minDate={(() => {
                            const date = new Date(item.startDate);
                            date.setDate(date.getDate() + 1);
                            return date;
                          })()}
                          portalId="datepicker-portal10"
                          id="endDate"
                          name="endDate"
                          dateFormat="dd/MM/yyyy"
                          className="form-control border-right-0 inputField"
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
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-margin newButton"
                        id="submitbtn2"
                        onClick={() => removeBatch(index)}
                        disabled={item.receivingId}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </ModalBody>
      </Modal >





































    </>
  );
}

export default ReceingGeneralCargo;
