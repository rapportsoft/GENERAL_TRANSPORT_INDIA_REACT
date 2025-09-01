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
//   Label,
//   Input,
//   Table,
//   Modal,
//   ModalHeader,
//   ModalBody,
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
//   faAd,
// } from "@fortawesome/free-solid-svg-icons";
// import "../assets/css/style.css";
// import "../Components/Style.css";
// import { Button } from "react-bootstrap";
// import useAxios from "../Components/useAxios";
// import CFSService from "../service/CFSService";
// import { toast } from "react-toastify";
// import moment from "moment";
// import { error } from "jquery";

// function ExportReworkingContainer() {
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
//   const [errors, setErrors] = useState([]);

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


//   const [destuffData, setDestuffData] = useState({
//     companyId: '',
//     branchId: '',
//     deStuffId: '',
//     deStuffDate: new Date(),
//     profitCentreId: 'CFS Export',
//     containerSearchType: 'Normal Container',
//     status: '',
//     createdBy: '',
//     gateInId: '',
//     gateInDate: null,
//     containerNo: '',
//     containerType: '',
//     containerSize: '',
//     containerStatus: '',
//     shippingAgent: '',
//     saName: '',
//     vehicleNo: '',
//     customSealNo: '',
//     saSealNo: '',
//     onAccountOf: '',
//     onAccountOfName: '',
//     areaOccupied: '',
//     yardPackages: '',
//     fromDate: null,
//     toDate: null,
//     remark: '',
//   })


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDestuffData((prevState) => ({
//       ...prevState,
//       [name]: value
//     }));

//     if (name === 'containerSearchType') {
//       setFormErrors({
//         containerNo: '',
//         onAccountOf: '',
//         fromDate: '',
//         toDate: ''
//       })

//       setErrors([]);
//       setDestuffData({
//         ...destuffData,
//         companyId: '',
//         branchId: '',
//         deStuffId: '',
//         deStuffDate: new Date(),
//         profitCentreId: 'CFS Export',
//         containerSearchType: value,
//         status: '',
//         createdBy: '',
//         gateInId: '',
//         gateInDate: null,
//         containerNo: '',
//         containerType: '',
//         containerSize: '',
//         containerStatus: '',
//         shippingAgent: '',
//         saName: '',
//         vehicleNo: '',
//         customSealNo: '',
//         saSealNo: '',
//         onAccountOf: '',
//         onAccountOfName: '',
//         areaOccupied: '',
//         yardPackages: '',
//         fromDate: null,
//         toDate: null,
//         remark: '',
//       })

//       setMultipleDestuffData([{
//         companyId: '',
//         branchId: '',
//         cartingTransId: '',
//         cartingLineId: '',
//         sbTransId: '',
//         sbNo: '',
//         commodity: '',
//         gateInPackages: '',
//         gateInWeight: '',
//         actualNoOfPackages: '',
//         actualNoOfWeight: '',
//         fob: '',
//         areaOccupied: '',
//         yardPackages: '',
//         gridLocation: '',
//         gridBlock: '',
//         gridCellNo: '',
//         yardArea: '',
//         yardPack: ''
//       }])
//     }

//     // setFormErrors((prevErrors) => ({
//     //   ...prevErrors,
//     //   [name]: "",
//     // }));
//   }

//   const [multipleDestuffData, setMultipleDestuffData] = useState([{
//     companyId: '',
//     branchId: '',
//     cartingTransId: '',
//     cartingLineId: '',
//     sbTransId: '',
//     sbNo: '',
//     commodity: '',
//     gateInPackages: '',
//     gateInWeight: '',
//     actualNoOfPackages: '',
//     actualNoOfWeight: '',
//     fob: '',
//     areaOccupied: '',
//     yardPackages: '',
//     gridLocation: '',
//     gridBlock: '',
//     gridCellNo: '',
//     yardArea: '',
//     yardPack: ''
//   }])


//   const [onAccountOfData, setOnAccountOfData] = useState([])

//   const handleGetOnAccountOfData = (id) => {
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

//   const handleOnAccountChange = async (selectedOption, { action }) => {

//     if (action === 'clear') {

//       setDestuffData({
//         ...destuffData,
//         onAccountOf: '',
//         onAccountOfName: ''
//       });

//     }
//     else {


//       setDestuffData({
//         ...destuffData,
//         onAccountOf: selectedOption ? selectedOption.value : '',
//         onAccountOfName: selectedOption ? selectedOption.label : ''
//       });
//       setFormErrors({
//         ...formErrors,
//         onAccountOf: ''
//       })
//     }
//   };


//   const [containerData, setContainerData] = useState([]);

//   const handleGetContainerNo = (val) => {
//     if (val === '') {
//       setContainerData([]);
//       return;
//     }

//     axios.get(`${ipaddress}carting/getContainerNoForExportReworking?cid=${companyid}&bid=${branchId}&val=${val}&type=${destuffData.containerSearchType}`, {
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

//   const handleContainerNoChange = async (selectedOption, { action }) => {

//     if (action === 'clear') {

//       setDestuffData({
//         ...destuffData,
//         containerNo: '',
//       });

//       handleClear();

//     }
//     else {


//       setDestuffData({
//         ...destuffData,
//         containerNo: selectedOption ? selectedOption.value : '',
//       });
//       setFormErrors({
//         ...formErrors,
//         containerNo: ''
//       })

//       getSelectedContainerNoData(selectedOption.value);
//     }
//   };


//   const getSelectedContainerNoData = (val) => {
//     axios.get(`${ipaddress}carting/getSelectedContainerNoForExportReworking?cid=${companyid}&bid=${branchId}&val=${val}&type=${destuffData.containerSearchType}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {

//         const data = response.data;
//         const singleData = data[0]
//         const type = destuffData.containerSearchType;
//         if (destuffData.containerSearchType === 'Port Return Container') {
//           setDestuffData({
//             companyId: '',
//             branchId: '',
//             deStuffId: '',
//             deStuffDate: new Date(),
//             profitCentreId: 'CFS Export',
//             containerSearchType: type,
//             status: '',
//             createdBy: '',
//             gateInId: singleData[0] || '',
//             gateInDate: singleData[1] === null ? null : new Date(singleData[1]),
//             containerNo: singleData[2] || '',
//             containerType: singleData[4] || '',
//             containerSize: singleData[3] || '',
//             containerStatus: singleData[5] || '',
//             shippingAgent: singleData[7] || '',
//             saName: singleData[8] || '',
//             vehicleNo: singleData[9] || '',
//             customSealNo: singleData[6] || '',
//             saSealNo: '',
//             onAccountOf: singleData[10] || '',
//             onAccountOfName: singleData[11] || '',
//             areaOccupied: '',
//             yardPackages: '',
//             fromDate: null,
//             toDate: null,
//             remark: '',
//           })

//           setMultipleDestuffData(data.map((item) => (
//             {
//               companyId: '',
//               branchId: '',
//               cartingTransId: '',
//               cartingLineId: '',
//               sbTransId: item[12] || '',
//               sbNo: item[13] || '',
//               commodity: item[14] || '',
//               gateInPackages: item[15] || '',
//               gateInWeight: item[16] || '',
//               actualNoOfPackages: item[15] || '',
//               actualNoOfWeight: item[16] || '',
//               fob: item[17] || '',
//               areaOccupied: '',
//               yardPackages: '',
//               gridLocation: '',
//               gridBlock: '',
//               gridCellNo: '',
//               yardArea: '',
//               yardPack: ''
//             }
//           )))
//         }
//         else {
//           setDestuffData({
//             companyId: '',
//             branchId: '',
//             deStuffId: '',
//             deStuffDate: new Date(),
//             profitCentreId: 'CFS Export',
//             containerSearchType: type,
//             status: '',
//             createdBy: '',
//             gateInId: singleData[0] || '',
//             gateInDate: singleData[1] === null ? null : new Date(singleData[1]),
//             containerNo: singleData[2] || '',
//             containerType: singleData[4] || '',
//             containerSize: singleData[3] || '',
//             containerStatus: singleData[5] || '',
//             shippingAgent: singleData[18] || '',
//             saName: singleData[7] || '',
//             vehicleNo: singleData[8] || '',
//             customSealNo: singleData[6] || '',
//             saSealNo: '',
//             onAccountOf: singleData[11] || '',
//             onAccountOfName: singleData[12] || '',
//             areaOccupied: '',
//             yardPackages: '',
//             fromDate: null,
//             toDate: null,
//             remark: '',
//           })

//           setMultipleDestuffData(data.map((item) => (
//             {
//               companyId: '',
//               branchId: '',
//               cartingTransId: '',
//               cartingLineId: '',
//               sbTransId: item[13] || '',
//               sbNo: item[14] || '',
//               commodity: item[15] || '',
//               gateInPackages: item[10] || '',
//               gateInWeight: item[16] || '',
//               actualNoOfPackages: item[10] || '',
//               actualNoOfWeight: item[16] || '',
//               fob: item[17] || '',
//               areaOccupied: '',
//               yardPackages: '',
//               gridLocation: '',
//               gridBlock: '',
//               gridCellNo: '',
//               yardArea: '',
//               yardPack: ''
//             }
//           )))
//         }

//       })
//       .catch((error) => {
//         toast.error(error.response.data, {
//           autoClose: 800
//         })
//       })
//   }

//   const [yardSearchData, setYardSearchData] = useState([]);

//   const getSearchYardData = (val) => {

//     if (val === '') {
//       setYardSearchData([]);
//       return;
//     }

//     axios.get(`${ipaddress}api/yardblockcells/getAllYard?companyId=${companyid}&branchId=${branchId}&search=${val}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {
//         const data = response.data;
//         const portOptions = data.map(port => ({
//           value: port.yardLocationId + '-' + port.blockId + '-' + port.cellNoRow,
//           label: port.yardLocationId + '-' + port.blockId + '-' + port.cellNoRow,
//           yardLocation: port.yardLocationId,
//           block: port.blockId,
//           cell: port.cellNoRow
//         }))
//         setYardSearchData(portOptions);
//       })
//       .catch((error) => {
//         setYardSearchData([]);
//       })
//   }


//   const [yardSearchData1, setYardSearchData1] = useState([]);

//   const getSearchYardData1 = (val) => {

//     if (val === '') {
//       setYardSearchData([]);
//       return;
//     }

//     axios.get(`${ipaddress}api/yardblockcells/getAllYardForReworking?companyId=${companyid}&branchId=${branchId}&search=${val}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {
//         const data = response.data;
//         const portOptions = data.map(port => ({
//           value: port.yardLocationId + '-' + port.blockId + '-' + port.cellNoRow,
//           label: port.yardLocationId + '-' + port.blockId + '-' + port.cellNoRow,
//           yardLocation: port.yardLocationId,
//           block: port.blockId,
//           cell: port.cellNoRow,
//           cellArea: port.cellArea,
//           cellAreaUsed: port.cellAreaUsed
//         }))
//         setYardSearchData1(portOptions);
//       })
//       .catch((error) => {
//         setYardSearchData1([]);
//       })
//   }

//   const handleYardChange = async (selectedOption, { action }, index) => {
//     setMultipleDestuffData((prevData) => {
//       const updatedData = [...prevData];
//       if (action === 'clear') {
//         // Clear values for the specific index
//         updatedData[index] = {
//           ...updatedData[index],
//           gridLocation: '',
//           gridBlock: '',
//           gridCellNo: '',
//         };
//       } else {
//         // Update with selected values
//         updatedData[index] = {
//           ...updatedData[index],
//           gridLocation: selectedOption.yardLocation,
//           gridBlock: selectedOption.block,
//           gridCellNo: selectedOption.cell
//         };
//       }
//       return updatedData;
//     });
//     if (action !== 'clear') {
//       setErrors(prevErrors => {
//         const updatedErrors = Array.isArray(prevErrors) ? [...prevErrors] : [];

//         if (updatedErrors[index]) {
//           delete updatedErrors[index]['gridLocation'];

//           // Remove the error object at the index if it's empty
//           if (Object.keys(updatedErrors[index]).length === 0) {
//             updatedErrors.splice(index, 1);
//           }
//         }

//         return updatedErrors;
//       });
//     }
//   };

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


//   const handleMultipleDestuffdataChange = (e, index, val1, val2) => {
//     const { name, value } = e.target;
//     let sanitizedValue = value;

//     // Sanitize input for specific fields
//     if (['actualNoOfPackages', 'actualNoOfWeight', 'yardArea', 'yardPack'].includes(name)) {
//       sanitizedValue = handleInputChange(value, val1, val2);
//     }

//     if (name === 'actualNoOfPackages') {

//       if ((sanitizedValue < multipleDestuffData[index].yardPack) && destuffData.status === '') {
//         setMultipleDestuffData(prevState => {
//           const updatedData = [...prevState];
//           updatedData[index] = {
//             ...updatedData[index],
//             ['yardPack']: '',
//           };
//           return updatedData;
//         });
//       }

//       if (sanitizedValue > parseFloat(multipleDestuffData[index].gateInPackages)) {
//         sanitizedValue = ''

//         setMultipleDestuffData(prevState => {
//           const updatedData = [...prevState];
//           updatedData[index] = {
//             ...updatedData[index],
//             ['actualNoOfWeight']: '',
//           };
//           return updatedData;
//         });
//       }
//       else {
//         const wt = (parseFloat(multipleDestuffData[index].gateInWeight) * sanitizedValue) / parseFloat(multipleDestuffData[index].gateInPackages)

//         setMultipleDestuffData(prevState => {
//           const updatedData = [...prevState];
//           updatedData[index] = {
//             ...updatedData[index],
//             ['actualNoOfWeight']: wt,
//           };
//           return updatedData;
//         });

//         setErrors(prevErrors => {
//           const updatedErrors = Array.isArray(prevErrors) ? [...prevErrors] : [];

//           if (updatedErrors[index]) {
//             delete updatedErrors[index]['actualNoOfWeight'];

//             // Remove the error object at the index if it's empty
//             if (Object.keys(updatedErrors[index]).length === 0) {
//               updatedErrors.splice(index, 1);
//             }
//           }

//           return updatedErrors;
//         });
//       }


//     }

//     if (name === 'yardPack') {
//       console.log('sanitizedValue ', sanitizedValue, multipleDestuffData[index].actualNoOfPackages);

//       if (sanitizedValue > parseFloat(multipleDestuffData[index].actualNoOfPackages)) {
//         sanitizedValue = '';

//         setErrors(prevErrors => {
//           const updatedErrors = Array.isArray(prevErrors) ? [...prevErrors] : [];

//           if (updatedErrors[index]) {
//             delete updatedErrors[index]['yardPack'];

//             // Remove the error object at the index if it's empty
//             if (Object.keys(updatedErrors[index]).length === 0) {
//               updatedErrors.splice(index, 1);
//             }
//           }

//           return updatedErrors;
//         });


//       }
//     }


//     setMultipleDestuffData(prevState => {
//       const updatedData = [...prevState];
//       updatedData[index] = {
//         ...updatedData[index],
//         [name]: sanitizedValue,
//       };
//       return updatedData;
//     });

//     setErrors(prevErrors => {
//       const updatedErrors = Array.isArray(prevErrors) ? [...prevErrors] : [];

//       if (updatedErrors[index]) {
//         delete updatedErrors[index][name];

//         // Remove the error object at the index if it's empty
//         if (Object.keys(updatedErrors[index]).length === 0) {
//           updatedErrors.splice(index, 1);
//         }
//       }

//       return updatedErrors;
//     });

//   }

//   const [formErrors, setFormErrors] = useState({
//     containerNo: '',
//     onAccountOf: '',
//     fromDate: '',
//     toDate: ''
//   })




//   const handleClear = () => {
//     setFormErrors({
//       containerNo: '',
//       onAccountOf: '',
//       fromDate: '',
//       toDate: ''
//     })

//     setErrors([]);
//     setDestuffData({
//       companyId: '',
//       branchId: '',
//       deStuffId: '',
//       deStuffDate: new Date(),
//       profitCentreId: 'CFS Export',
//       containerSearchType: 'Normal Container',
//       status: '',
//       createdBy: '',
//       gateInId: '',
//       gateInDate: null,
//       containerNo: '',
//       containerType: '',
//       containerSize: '',
//       containerStatus: '',
//       shippingAgent: '',
//       saName: '',
//       vehicleNo: '',
//       customSealNo: '',
//       saSealNo: '',
//       onAccountOf: '',
//       onAccountOfName: '',
//       areaOccupied: '',
//       yardPackages: '',
//       fromDate: null,
//       toDate: null,
//       remark: '',
//     })

//     setMultipleDestuffData([{
//       companyId: '',
//       branchId: '',
//       cartingTransId: '',
//       cartingLineId: '',
//       sbTransId: '',
//       sbNo: '',
//       commodity: '',
//       gateInPackages: '',
//       gateInWeight: '',
//       actualNoOfPackages: '',
//       actualNoOfWeight: '',
//       fob: '',
//       areaOccupied: '',
//       yardPackages: '',
//       gridLocation: '',
//       gridBlock: '',
//       gridCellNo: '',
//       yardArea: '',
//       yardPack: ''
//     }])
//   }


//   const handleSave = (status) => {
//     setFormErrors({
//       containerNo: '',
//       onAccountOf: '',
//       fromDate: '',
//       toDate: ''
//     })

//     let errors = {};

//     if (!destuffData.containerNo) {
//       errors.containerNo = "Container no is required."
//     }

//     if (!destuffData.onAccountOf) {
//       errors.onAccountOf = "On account of is required."
//     }

//     if (!destuffData.fromDate) {
//       errors.fromDate = "From date is required."
//     }

//     if (!destuffData.toDate) {
//       errors.toDate = "To date is required."
//     }


//     if (Object.keys(errors).length > 0) {
//       setLoading(false);
//       setFormErrors(errors);
//       toast.error("Please fill in the required fields.", {
//         autoClose: 1000
//       })
//       return;
//     }


//     if (multipleDestuffData.length === 0) {
//       setErrors([]);

//       toast.error("SB data not found.", {
//         autoClose: 1000
//       })
//       setLoading(false);
//       return;
//     }

//     let newErrors = multipleDestuffData.map(() => ({}));
//     setErrors([]);

//     multipleDestuffData.forEach((data, index) => {
//       let rowErrors = {};

//       if (!data.actualNoOfPackages) rowErrors.actualNoOfPackages = "Destuff qty is required.";
//       if (!data.actualNoOfWeight) rowErrors.actualNoOfWeight = "Actual wt is required.";
//       if (!data.gridLocation) rowErrors.gridLocation = "Yard location is required.";
//       if (!data.yardPack) rowErrors.yardPack = "Yard pack is required.";
//       if (!data.yardArea) rowErrors.yardArea = "Yard area is required.";

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

//     if (status === 'A') {
//       let check = multipleDestuffData.filter(item => parseFloat(item.actualNoOfPackages) !== parseFloat(item.yardPackages))

//       if (check.length > 0) {
//         toast.error("Destuff qty doesn't matched with yard packages.", {
//           autoClose: 800
//         })
//         setLoading(false);
//         return;
//       }
//     }

//     const formData = {
//       conCarting: destuffData,
//       carting: multipleDestuffData
//     }

//     axios.post(`${ipaddress}carting/saveExportReworkingContainer?cid=${companyid}&bid=${branchId}&user=${userId}&status=${status}`, formData, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {

//         const data = response.data.carting;
//         const singleData = response.data.conCarting;


//         setDestuffData({
//           companyId: '',
//           branchId: '',
//           deStuffId: singleData.deStuffId || '',
//           deStuffDate: singleData.deStuffDate === null ? null : new Date(singleData.deStuffDate) || new Date(),
//           profitCentreId: 'CFS Export',
//           containerSearchType: singleData.containerSearchType || 'Normal Container',
//           status: singleData.status || '',
//           createdBy: singleData.createdBy || '',
//           gateInId: singleData.gateInId || '',
//           gateInDate: singleData.gateInDate === null ? null : new Date(singleData.gateInDate),
//           containerNo: singleData.containerNo || '',
//           containerType: singleData.containerType || '',
//           containerSize: singleData.containerSize || '',
//           containerStatus: singleData.containerStatus || '',
//           shippingAgent: singleData.shippingAgent || '',
//           saName: singleData.saName || '',
//           vehicleNo: singleData.vehicleNo || '',
//           customSealNo: singleData.customSealNo || '',
//           saSealNo: singleData.saSealNo || '',
//           onAccountOf: singleData.onAccountOf || '',
//           onAccountOfName: singleData.onAccountOfName || '',
//           areaOccupied: '',
//           yardPackages: '',
//           fromDate: singleData.fromDate === null ? null : new Date(singleData.fromDate),
//           toDate: singleData.toDate === null ? null : new Date(singleData.toDate),
//           remark: singleData.remark || '',
//         })

//         setMultipleDestuffData(data.map((item) => (
//           {
//             companyId: '',
//             branchId: '',
//             cartingTransId: item[0] || '',
//             cartingLineId: item[1] || '',
//             sbTransId: item[2] || '',
//             sbNo: item[3] || '',
//             commodity: item[4] || '',
//             gateInPackages: item[5] || '',
//             gateInWeight: item[6] || '',
//             actualNoOfPackages: item[7] || '',
//             actualNoOfWeight: item[8] || '',
//             fob: item[9] || '',
//             areaOccupied: item[13] || '',
//             yardPackages: item[14] || '',
//             gridLocation: item[10] || '',
//             gridBlock: item[11] || '',
//             gridCellNo: item[12] || '',
//             yardArea: item[15] || '',
//             yardPack: item[16] || '',
//           }
//         )))

//         toast.success('Data save successfully!!!', {
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
//     axios.get(`${ipaddress}carting/searchReworking?cid=${companyid}&bid=${branchId}&val=${id}`, {
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

//     axios.get(`${ipaddress}carting/getSearchedReworkingData?cid=${companyid}&bid=${branchId}&val=${id}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {


//         const data = response.data.carting;
//         const singleData = response.data.conCarting;


//         setDestuffData({
//           companyId: '',
//           branchId: '',
//           deStuffId: singleData.deStuffId || '',
//           deStuffDate: singleData.deStuffDate === null ? null : new Date(singleData.deStuffDate) || new Date(),
//           profitCentreId: 'CFS Export',
//           containerSearchType: singleData.containerSearchType || 'Normal Container',
//           status: singleData.status || '',
//           createdBy: singleData.createdBy || '',
//           gateInId: singleData.gateInId || '',
//           gateInDate: singleData.gateInDate === null ? null : new Date(singleData.gateInDate),
//           containerNo: singleData.containerNo || '',
//           containerType: singleData.containerType || '',
//           containerSize: singleData.containerSize || '',
//           containerStatus: singleData.containerStatus || '',
//           shippingAgent: singleData.shippingAgent || '',
//           saName: singleData.saName || '',
//           vehicleNo: singleData.vehicleNo || '',
//           customSealNo: singleData.customSealNo || '',
//           saSealNo: singleData.saSealNo || '',
//           onAccountOf: singleData.onAccountOf || '',
//           onAccountOfName: singleData.onAccountOfName || '',
//           areaOccupied: '',
//           yardPackages: '',
//           fromDate: singleData.fromDate === null ? null : new Date(singleData.fromDate),
//           toDate: singleData.toDate === null ? null : new Date(singleData.toDate),
//           remark: singleData.remark || '',
//         })

//         setMultipleDestuffData(data.map((item) => (
//           {
//             companyId: '',
//             branchId: '',
//             cartingTransId: item[0] || '',
//             cartingLineId: item[1] || '',
//             sbTransId: item[2] || '',
//             sbNo: item[3] || '',
//             commodity: item[4] || '',
//             gateInPackages: item[5] || '',
//             gateInWeight: item[6] || '',
//             actualNoOfPackages: item[7] || '',
//             actualNoOfWeight: item[8] || '',
//             fob: item[9] || '',
//             areaOccupied: item[13] || '',
//             yardPackages: item[14] || '',
//             gridLocation: item[10] || '',
//             gridBlock: item[11] || '',
//             gridCellNo: item[12] || '',
//             yardArea: item[15] || '',
//             yardPack: item[16] || '',
//           }
//         )))

//         toast.success('Data found successfully!!!', {
//           autoClose: 800
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



//   const [isModalForOpenYard, setIsModalForOpenYard] = useState(false);
//   const [yardData, setYardData] = useState([{
//     companyId: '',
//     branchId: '',
//     processTransId: '',
//     lineNo: '',
//     subSrNo: '',
//     yardLocation: '',
//     yardBlock: '',
//     blockCellNo: '',
//     yardPackages: '',
//     cellArea: '',
//     cellAreaUsed: '',
//     cellAreaAllocated: ''
//   }])

//   const [yardLineId, setYardLineId] = useState('');
//   const [destuffQty, setDestuffQty] = useState('');

//   const openYardModal = (sb, packages) => {
//     setIsModalForOpenYard(true);
//     setYardLineId(sb);
//     setDestuffQty(packages);

//     getGridData(sb);
//   }

//   const getGridData = (lineId) => {
//     axios.get(`${ipaddress}carting/getGridDataForReworking?cid=${companyid}&bid=${branchId}&id=${destuffData.deStuffId}&lineid=${lineId}`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {

//         const data = response.data;

//         console.log('grid data ', data);


//         setYardData(data.map((item) => ({
//           companyId: '',
//           branchId: '',
//           processTransId: item.processTransId || '',
//           lineNo: item.lineNo || '',
//           subSrNo: item.subSrNo || '',
//           yardLocation: item.yardLocation || '',
//           yardBlock: item.yardBlock || '',
//           blockCellNo: item.blockCellNo || '',
//           yardPackages: item.yardPackages || '',
//           cellArea: item.cellArea || 0,
//           cellAreaUsed: item.cellAreaUsed || 0,
//           cellAreaAllocated: item.cellAreaAllocated || 0
//         })))
//       })
//       .catch((error) => {

//       })
//   }

//   const closeYardModal = () => {
//     setIsModalForOpenYard(false);
//     setYardData([{
//       companyId: '',
//       branchId: '',
//       processTransId: '',
//       lineNo: '',
//       subSrNo: '',
//       yardLocation: '',
//       yardBlock: '',
//       blockCellNo: '',
//       yardPackages: '',
//       cellArea: '',
//       cellAreaUsed: '',
//       cellAreaAllocated: ''
//     }]);
//     setDestuffQty('');
//     setYardLineId('');
//     setGridErrors([]);
//   }

//   const [gridErrors, setGridErrors] = useState([]);

//   const handleGridChange = async (selectedOption, { action }, index) => {
//     if (action !== 'clear') {
//       const newEntry = {
//         yardLocation: selectedOption.yardLocation,
//         yardBlock: selectedOption.block,
//         blockCellNo: selectedOption.cell
//       };

//       // Perform the duplicate check before updating the state
//       const isDuplicate = yardData.some(
//         (item, i) =>
//           i !== index &&
//           item.yardLocation === newEntry.yardLocation &&
//           item.yardBlock === newEntry.yardBlock &&
//           item.blockCellNo === newEntry.blockCellNo
//       );

//       if (isDuplicate) {
//         toast.error('Duplicate entry detected for Yard Location, Yard Block, and Block Cell No.', {
//           autoClose: 800
//         });
//         return; // Exit early to avoid state updates
//       }
//     }

//     setYardData((prevData) => {
//       const updatedData = [...prevData];

//       if (action === 'clear') {
//         // Clear values for the specific index
//         updatedData[index] = {
//           ...updatedData[index],
//           yardLocation: '',
//           yardBlock: '',
//           blockCellNo: '',
//           yardPackages: '',
//           cellArea: '',
//           cellAreaUsed: '',
//           cellAreaAllocated: ''
//         };
//       } else {
//         // Update with selected values
//         updatedData[index] = {
//           ...updatedData[index],
//           yardLocation: selectedOption.yardLocation,
//           yardBlock: selectedOption.block,
//           blockCellNo: selectedOption.cell,
//           cellArea: selectedOption.cellArea,
//           cellAreaUsed: selectedOption.cellAreaUsed,
//           yardPackages: '',
//           cellAreaAllocated: ''
//         };
//       }

//       return updatedData;
//     });

//     if (action !== 'clear') {
//       setGridErrors((prevErrors) => {
//         const updatedErrors = Array.isArray(prevErrors) ? [...prevErrors] : [];

//         if (updatedErrors[index]) {
//           delete updatedErrors[index]['yardLocation'];

//           // Remove the error object at the index if it's empty
//           if (Object.keys(updatedErrors[index]).length === 0) {
//             updatedErrors.splice(index, 1);
//           }
//         }

//         return updatedErrors;
//       });
//     }
//   };




//   const handleMultipleYardDataChange = (e, index, val1, val2) => {
//     const { name, value } = e.target;
//     let sanitizedValue = value;

//     // Sanitize input for specific fields
//     if (['cellAreaAllocated', 'yardPackages'].includes(name)) {
//       sanitizedValue = handleInputChange(value, val1, val2);
//     }

//     if (name === 'cellAreaAllocated') {
//       let areaVal = parseFloat(yardData[index].cellArea) - parseFloat(yardData[index].cellAreaUsed);

//       if (sanitizedValue > areaVal) {
//         sanitizedValue = ''
//       }
//     }

//     if (name === 'yardPackages') {
//       // Calculate the total of all yardPackages excluding the current index
//       const currentTotal = yardData.reduce((sum, item, i) => {
//         if (i !== index) {
//           return sum + parseInt(item.yardPackages || 0, 10);
//         }
//         return sum;
//       }, 0);

//       // Add the new value to the total
//       const newTotal = currentTotal + parseInt(sanitizedValue || 0, 10);

//       // If the new total exceeds 50, reset the sanitized value
//       if (newTotal > 50) {
//         sanitizedValue = '';

//       }
//     }


//     setYardData(prevState => {
//       const updatedData = [...prevState];
//       updatedData[index] = {
//         ...updatedData[index],
//         [name]: sanitizedValue,
//       };
//       return updatedData;
//     });

//     setGridErrors(prevErrors => {
//       const updatedErrors = Array.isArray(prevErrors) ? [...prevErrors] : [];

//       if (updatedErrors[index]) {
//         delete updatedErrors[index][name];

//         // Remove the error object at the index if it's empty
//         if (Object.keys(updatedErrors[index]).length === 0) {
//           updatedErrors.splice(index, 1);
//         }
//       }

//       return updatedErrors;
//     });

//   }

//   const addRow = () => {
//     setYardData(prevData => [
//       ...prevData,
//       {
//         companyId: '',
//         branchId: '',
//         processTransId: '',
//         lineNo: '',
//         subSrNo: '',
//         yardLocation: '',
//         yardBlock: '',
//         blockCellNo: '',
//         yardPackages: '',
//         cellArea: '',
//         cellAreaUsed: '',
//         cellAreaAllocated: ''
//       }
//     ]);
//   };

//   const removeRow = (index) => {
//     setYardData(prevData => prevData.filter((_, i) => i !== index));
//   };


//   const handleSaveYardpackages = () => {
//     setLoading(true);


//     let newErrors = yardData.map(() => ({}));
//     setGridErrors([]);

//     yardData.forEach((data, index) => {
//       let rowErrors = {};

//       if (!data.yardLocation) rowErrors.yardLocation = "Yard location is required.";
//       if (!data.cellAreaAllocated) rowErrors.cellAreaAllocated = "Area occupied is required.";
//       if (!data.yardPackages) rowErrors.yardPackages = "Yard packages is required.";


//       if (Object.keys(rowErrors).length > 0) {
//         newErrors[index] = rowErrors;
//       }
//     });

//     // Check if any errors exist
//     const hasErrors = newErrors.some(errorObj => Object.keys(errorObj).length > 0);

//     if (hasErrors) {

//       setGridErrors(newErrors);
//       setLoading(false);
//       toast.error("Please fill in the required fields.", {
//         autoClose: 1000
//       });

//       return;
//     }


//     let finalValue = yardData.reduce((total, item) => total + (parseInt(item.yardPackages || 0, 0)), 0);

//     if (finalValue !== destuffQty) {
//       toast.error("Destuff qty doesn't match with total yard packages.", {
//         autoClose: 800
//       })
//       setLoading(false);
//       return;
//     }


//     axios.post(`${ipaddress}carting/saveyardPackForReworking?cid=${companyid}&bid=${branchId}&user=${userId}`, yardData, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`
//       }
//     })
//       .then((response) => {

//         const gridData = response.data.gridData;
//         const cartingData = response.data.carting;

//         setYardData(gridData.map((item) => ({
//           companyId: '',
//           branchId: '',
//           processTransId: item.processTransId || '',
//           lineNo: item.lineNo || '',
//           subSrNo: item.subSrNo || '',
//           yardLocation: item.yardLocation || '',
//           yardBlock: item.yardBlock || '',
//           blockCellNo: item.blockCellNo || '',
//           yardPackages: item.yardPackages || '',
//           cellArea: item.cellArea || 0,
//           cellAreaUsed: item.cellAreaUsed || 0,
//           cellAreaAllocated: item.cellAreaAllocated || 0
//         })))

//         setMultipleDestuffData(cartingData.map((item) => (
//           {
//             companyId: '',
//             branchId: '',
//             cartingTransId: item[0] || '',
//             cartingLineId: item[1] || '',
//             sbTransId: item[2] || '',
//             sbNo: item[3] || '',
//             commodity: item[4] || '',
//             gateInPackages: item[5] || '',
//             gateInWeight: item[6] || '',
//             actualNoOfPackages: item[7] || '',
//             actualNoOfWeight: item[8] || '',
//             fob: item[9] || '',
//             areaOccupied: item[13] || '',
//             yardPackages: item[14] || '',
//             gridLocation: item[10] || '',
//             gridBlock: item[11] || '',
//             gridCellNo: item[12] || '',
//             yardArea: item[15] || '',
//             yardPack: item[16] || '',
//           }
//         )))

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
//             /> Search Stuff Tally Data</h5>



//           </ModalHeader>
//           <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
//             <Row>
//               <Col md={4}>
//                 <FormGroup>
//                   <label className="forlabel bold-label" htmlFor="sbRequestId">
//                     Search by Destuff Id/Container No/Container Size & Type
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
//                     <th scope="col">Destuff Id</th>
//                     <th scope="col">Destuff Date</th>
//                     <th scope="col">Container No</th>
//                     <th scope="col">Container Size</th>
//                     <th scope="col">Container Type</th>

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
//                         <input type="radio" onChange={() => getSelectedData(item[0])} name="radioGroup" />
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
//               <label className="forlabel bold-label" htmlFor="deStuffId">

//                 Destuff Id
//               </label>
//               <Row>
//                 <Col md={9}>
//                   <Input
//                     className={`form-control`}
//                     type="text"
//                     id="deStuffId"
//                     name='deStuffId'
//                     value={destuffData.deStuffId}
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
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Destuff Date
//               </label>
//               <div className='datepicker' style={{ position: 'relative', height: 30 }}>
//                 <DatePicker
//                   selected={destuffData.deStuffDate}
//                   id='deStuffDate'
//                   name='deStuffDate'
//                   disabled
//                   dateFormat="dd/MM/yyyy HH:mm"
//                   className="form-control border-right-0 inputField"
//                   customInput={<input style={{ width: '100%' }} />}
//                   wrapperClassName="custom-react-datepicker-wrapper"
//                 />
//                 <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
//               </div>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Reworking Type
//               </label>
//               <Input
//                 className={`form-control`}
//                 type="select"
//                 id="containerSearchType"
//                 name='containerSearchType'
//                 value={destuffData.containerSearchType}
//                 onChange={handleChange}
//                 disabled={destuffData.deStuffId !== ''}
//               >
//                 <option value="Normal Container" selected="">Normal Container</option>

//                 <option value="Port Return Container">Port Return Container</option>

//                 <option value="Buffer Container">Buffer Container</option>

//               </Input>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Profitcentre
//               </label>
//               <Input
//                 className={`form-control`}
//                 type="text"
//                 id="profitCentreId"
//                 name='profitCentreId'
//                 value={destuffData.profitCentreId}
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
//                 className={`form-control`}
//                 type="text"
//                 id="status"
//                 name='status'
//                 value={destuffData.status === 'A' ? 'Approved' : destuffData.status === 'N' ? 'New' : destuffData.status}
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
//                 className={`form-control`}
//                 type="text"
//                 id="createdBy"
//                 name='createdBy'
//                 value={destuffData.createdBy}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//         </Row>
//         <Row>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Gate In Id
//               </label>
//               <Input
//                 className={`form-control`}
//                 type="text"
//                 id="gateInId"
//                 name='gateInId'
//                 value={destuffData.gateInId}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Gate In Date
//               </label>
//               <div className='datepicker' style={{ position: 'relative', height: 30 }}>
//                 <DatePicker
//                   selected={destuffData.gateInDate}
//                   id='gateInDate'
//                   name='gateInDate'
//                   disabled
//                   dateFormat="dd/MM/yyyy"
//                   className="form-control border-right-0 inputField"
//                   customInput={<input style={{ width: '100%' }} />}
//                   wrapperClassName="custom-react-datepicker-wrapper"
//                 />
//                 <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
//               </div>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Container No <span style={{ color: 'red' }}>*</span>
//               </label>
//               <Select
//                 value={{ value: destuffData.containerNo, label: destuffData.containerNo }}
//                 onChange={handleContainerNoChange}
//                 onInputChange={handleGetContainerNo}
//                 options={containerData}
//                 placeholder="Select Container no"
//                 isClearable
//                 isDisabled={destuffData.deStuffId !== ''}
//                 id="containerNo"
//                 name="containerNo"
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
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Type Size
//               </label>
//               <Input
//                 className={`form-control`}
//                 type="text"
//                 id="containerSize"
//                 name='containerSize'
//                 value={destuffData.containerSize + destuffData.containerType}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Container Status
//               </label>
//               <Input
//                 className={`form-control`}
//                 type="text"
//                 id="containerStatus"
//                 name='containerStatus'
//                 value={destuffData.containerStatus}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Custom Seal No
//               </label>
//               <Input
//                 className={`form-control`}
//                 type="text"
//                 id="customSealNo"
//                 name='customSealNo'
//                 value={destuffData.customSealNo}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//         </Row>
//         <Row>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 SA Seal No
//               </label>
//               <Input
//                 className={`form-control`}
//                 type="text"
//                 id="saSealNo"
//                 name='saSealNo'
//                 value={destuffData.saSealNo}
//                 onChange={handleChange}
//                 maxLength={15}
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Shipping Agent
//               </label>
//               <Input
//                 className={`form-control`}
//                 type="text"
//                 id="saName"
//                 name='saName'
//                 value={destuffData.saName}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Vehicle No
//               </label>
//               <Input
//                 className={`form-control`}
//                 type="text"
//                 id="vehicleNo"
//                 name='toLocation'
//                 value={destuffData.vehicleNo}
//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Area Occupied
//               </label>
//               <Input
//                 className={`form-control`}
//                 type="text"
//                 id="areaOccupied"
//                 name='areaOccupied'
//                 value={multipleDestuffData.reduce((total, item) => total + (parseFloat(item.areaOccupied) || 0), 0)}

//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Packages
//               </label>
//               <Input
//                 className={`form-control`}
//                 type="text"
//                 id="yardPackages"
//                 name='yardPackages'
//                 value={multipleDestuffData.reduce((total, item) => total + (parseFloat(item.yardPackages) || 0), 0)}

//                 disabled
//               />
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 On Account Of <span style={{ color: 'red' }}>*</span>
//               </label>
//               <Select
//                 value={{ value: destuffData.onAccountOf, label: destuffData.onAccountOfName }}
//                 onInputChange={handleGetOnAccountOfData}
//                 onChange={handleOnAccountChange}
//                 options={onAccountOfData}
//                 placeholder="Select On Account Of"
//                 isClearable
//                 id="onAccountOf"
//                 name="onAccountOf"
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
//         </Row>
//         <Row>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 From Date <span style={{ color: 'red' }}>*</span>
//               </label>
//               <div className='datepicker' style={{ position: 'relative', height: 30 }}>
//                 <DatePicker
//                   selected={destuffData.fromDate}
//                   onChange={(date) => {
//                     setDestuffData(prevJobData => ({
//                       ...prevJobData,
//                       fromDate: date,
//                       toDate: date >= prevJobData.toDate ? null : prevJobData.toDate
//                     }));
//                     setFormErrors({
//                       ...formErrors,
//                       fromDate: ''
//                     });
//                   }}
//                   id='fromDate'
//                   name='fromDate'
//                   dateFormat="dd/MM/yyyy HH:mm"
//                   showTimeInput
//                   className={`form-control border-right-0 inputField ${formErrors.fromDate ? 'error-border' : ''}`}
//                   customInput={<input style={{ width: '100%' }} />}
//                   wrapperClassName="custom-react-datepicker-wrapper"
//                 />
//                 <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
//               </div>
//               <div style={{ color: 'red' }} className="error-message">{formErrors.fromDate}</div>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 To Date <span style={{ color: 'red' }}>*</span>
//               </label>
//               <div className='datepicker' style={{ position: 'relative', height: 30 }}>
//                 <DatePicker
//                   selected={destuffData.toDate}
//                   onChange={(date) => {
//                     setDestuffData(prevJobData => ({
//                       ...prevJobData,
//                       toDate: date,

//                     }));

//                     setFormErrors({
//                       ...formErrors,
//                       toDate: ''
//                     });
//                   }}
//                   minDate={(() => {
//                     const date = new Date(destuffData.fromDate);
//                     date.setDate(date.getDate() + 1);
//                     return date;
//                   })()}
//                   id='toDate'
//                   name='toDate'
//                   dateFormat="dd/MM/yyyy HH:mm"
//                   showTimeInput
//                   className={`form-control border-right-0 inputField ${formErrors.toDate ? 'error-border' : ''}`}
//                   customInput={<input style={{ width: '100%' }} />}
//                   wrapperClassName="custom-react-datepicker-wrapper"
//                 />
//                 <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
//               </div>
//               <div style={{ color: 'red' }} className="error-message">{formErrors.toDate}</div>
//             </FormGroup>
//           </Col>
//           <Col md={2}>
//             <FormGroup>
//               <label className="forlabel bold-label" htmlFor="sbRequestId">
//                 Remarks
//               </label>
//               <Input
//                 className={`form-control`}
//                 type="textarea"
//                 id="remark"
//                 name='remark'
//                 value={destuffData.remark}
//                 onChange={handleChange}
//                 maxLength={200}
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
//               disabled={destuffData.status === 'A'}
//               onClick={() => handleSave('N')}
//             >
//               <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
//               Save
//             </button>

//             <button
//               className="btn btn-outline-primary btn-margin newButton"
//               style={{ marginRight: 10 }}
//               id="submitbtn2"
//               disabled={destuffData.status === '' || destuffData.status === 'A'}
//               onClick={() => handleSave('A')}
//             >
//               <FontAwesomeIcon icon={faCheck} style={{ marginRight: "5px" }} />
//               Submit
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

//         <Modal Modal isOpen={isModalForOpenYard} onClose={closeYardModal} toggle={closeYardModal} style={{ maxWidth: '1000px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

//           <ModalHeader toggle={closeYardModal} style={{
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
//             />Add Yard Packages</h5>



//           </ModalHeader>
//           <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
//             <Row>
//               <Col md={3}>
//                 <FormGroup>
//                   <label className="forlabel bold-label" htmlFor="sbRequestId">
//                     Destuff Qty
//                   </label>
//                   <Input
//                     className={`form-control`}
//                     type="text"
//                     id="destuffQty"
//                     name='destuffQty'
//                     value={destuffQty}
//                     disabled
//                   />
//                 </FormGroup>
//               </Col>
//               <Col md={3}>
//                 <FormGroup>
//                   <label className="forlabel bold-label" htmlFor="sbRequestId">
//                     Total Area Occupied
//                   </label>
//                   <Input
//                     className={`form-control`}
//                     type="text"
//                     id="cellAreaAllocated"
//                     name='cellAreaAllocated'
//                     value={yardData.reduce((total, item) => total + (parseInt(item.cellAreaAllocated || 0, 0)), 0)}

//                     disabled
//                   />
//                 </FormGroup>
//               </Col>
//               <Col md={3}>
//                 <FormGroup>
//                   <label className="forlabel bold-label" htmlFor="sbRequestId">
//                     Total Yard Packages
//                   </label>
//                   <Input
//                     className={`form-control`}
//                     type="text"
//                     id="yardPackages"
//                     name='yardPackages'
//                     value={yardData.reduce((total, item) => total + (parseInt(item.yardPackages || 0, 0)), 0)}

//                     disabled
//                   />
//                 </FormGroup>
//               </Col>
//             </Row>
//             <hr />
//             <div className="mt-2 table-responsive">
//               <table className="table table-bordered table-hover tableHeader dynamic-table">
//                 <thead className="tableHeader">
//                   <tr>
//                     <th scope="col" className="text-center" style={{ color: 'black' }}>Select Yard Location</th>
//                     <th scope="col" className="text-center" style={{ color: 'black' }}>Cell Area</th>
//                     <th scope="col" className="text-center" style={{ color: 'black' }}>Cell Area used</th>
//                     <th scope="col" className="text-center" style={{ color: 'black' }}>Area Occupied <span style={{ color: 'red' }}>*</span></th>
//                     <th scope="col" className="text-center" style={{ color: 'black' }}>Yard Packages <span style={{ color: 'red' }}>*</span></th>
//                     <th scope="col" className="text-center" style={{ color: 'black' }}>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {yardData.map((item, index) => (
//                     <tr key={index}>
//                       <td>
//                         <Select

//                           value={{ value: item.yardLocation + '-' + item.yardBlock + '-' + item.blockCellNo, label: item.yardLocation + '-' + item.yardBlock + '-' + item.blockCellNo }}
//                           onChange={(option, actionMeta) => handleGridChange(option, actionMeta, index)}
//                           onInputChange={getSearchYardData1}
//                           options={yardSearchData1}
//                           placeholder="Select Yard Location"
//                           isClearable
//                           id={`yardLocation${index}`}
//                           name="yardLocation"
//                           className={`autocompleteHeight ${gridErrors[index]?.yardLocation ? 'error-border' : ''}`}
//                           //  menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
//                           menuPosition="fixed"
//                           styles={{
//                             control: (provided, state) => ({
//                               ...provided,
//                               height: 32, // Set height
//                               minHeight: 32, // Set minimum height
//                               border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
//                               boxShadow: "none",
//                               display: 'flex',
//                               alignItems: 'center', // Align items vertically
//                               padding: 0, // Remove padding to control height
//                               "&:hover": {
//                                 border: "1px solid #ccc",
//                               },
//                               borderRadius: '6px', // Add border radius
//                               "&:hover": {
//                                 border: "1px solid #ccc",
//                               },
//                             }),
//                             valueContainer: (provided) => ({
//                               ...provided,
//                               height: '100%', // Full height of the control
//                               display: 'flex',
//                               alignItems: 'center', // Align items vertically
//                               padding: '0 0.75rem', // Match padding
//                             }),
//                             singleValue: (provided) => ({
//                               ...provided,
//                               lineHeight: '32px', // Center text vertically
//                             }),
//                             indicatorSeparator: () => ({
//                               display: "none",
//                             }),
//                             dropdownIndicator: () => ({
//                               display: "none",
//                             }),
//                             placeholder: (provided) => ({
//                               ...provided,
//                               lineHeight: '32px', // Center placeholder text vertically
//                               color: "gray",
//                             }),
//                             clearIndicator: (provided) => ({
//                               ...provided,
//                               padding: 2, // Remove padding
//                               display: 'flex',
//                               alignItems: 'center', // Align clear indicator vertically
//                             }),
//                           }}
//                         />

//                       </td>
//                       <td>{item.cellArea}</td>
//                       <td>{item.cellAreaUsed}</td>
//                       <td style={{ width: 150 }}>
//                         <Input
//                           className={`form-control ${gridErrors[index]?.cellAreaAllocated ? 'error-border' : ''}`}
//                           type="text"
//                           id={`cellAreaAllocated${index}`}
//                           name='cellAreaAllocated'
//                           value={item.cellAreaAllocated}
//                           onChange={(e) => handleMultipleYardDataChange(e, index, 5, 3)}
//                           style={{ width: 150 }}
//                         />
//                       </td>
//                       <td style={{ width: 150 }}>
//                         <Input
//                           className={`form-control ${gridErrors[index]?.yardPackages ? 'error-border' : ''}`}
//                           type="text"
//                           id={`yardPackages${index}`}
//                           name='yardPackages'
//                           value={item.yardPackages}
//                           onChange={(e) => handleMultipleYardDataChange(e, index, 5, 0)}
//                         />
//                       </td>
//                       <td>
//                         <button
//                           className="btn btn-outline-danger btn-margin newButton"
//                           style={{ marginRight: 10 }}
//                           id="submitbtn2"
//                           disabled={item.processTransId !== ''}
//                           onClick={() => removeRow(index)}
//                         >
//                           <FontAwesomeIcon icon={faTrash} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}

//                 </tbody>
//               </table>
//             </div>
//             <Row className='text-center'>
//               <Col>
//                 <button
//                   className="btn btn-outline-primary btn-margin newButton"
//                   style={{ marginRight: 10 }}
//                   id="submitbtn2"
//                   onClick={handleSaveYardpackages}
//                 >
//                   <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
//                   Save
//                 </button>

//                 <button
//                   className="btn btn-outline-danger btn-margin newButton"
//                   style={{ marginRight: 10 }}
//                   id="submitbtn2"
//                   onClick={addRow}
//                 >
//                   <FontAwesomeIcon icon={faAdd} style={{ marginRight: "5px" }} />
//                   Add Row
//                 </button>
//               </Col>
//             </Row>
//           </ModalBody>
//         </Modal>


//         <div className="mt-5 table-responsive">
//           <table className="table table-bordered table-hover tableHeader dynamic-table">
//             <thead className="tableHeader">
//               <tr>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Sr No</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>SB Trans Id</th>
//                 <th scope="col" className="text-center" style={{ color: 'black', minWidth: 90 }}>SB No</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Commodity Description</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>No Of Pack</th>
//                 <th scope="col" className="text-center" style={{ color: 'black', minWidth: 90 }}>Weight</th>
//                 <th scope="col" className="text-center" style={{ color: 'black', minWidth: 90 }}>Destuff Qty <span style={{ color: 'red' }}>*</span></th>
//                 <th scope="col" className="text-center" style={{ color: 'black', minWidth: 130 }}>Actual Wt <span style={{ color: 'red' }}>*</span></th>
//                 <th scope="col" className="text-center" style={{ color: 'black', minWidth: 120 }}>FOB</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Total Area Occupied</th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Total Yard Packages</th>
//                 <th scope="col" className="text-center" style={{ color: 'black', minWidth: 150 }}>Yard Location <span style={{ color: 'red' }}>*</span></th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Area Occupied <span style={{ color: 'red' }}>*</span></th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Yard Packages <span style={{ color: 'red' }}>*</span></th>
//                 <th scope="col" className="text-center" style={{ color: 'black' }}>Add Yard</th>
//               </tr>
//             </thead>
//             <tbody>
//               {multipleDestuffData.map((item, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{item.sbTransId}</td>
//                   <td>{item.sbNo}</td>
//                   <td>{item.commodity}</td>
//                   <td>{item.gateInPackages}</td>
//                   <td>{item.gateInWeight}</td>
//                   <td>
//                     <Input
//                       className={`form-control ${errors[index]?.actualNoOfPackages ? 'error-border' : ''}`}
//                       type="text"
//                       id={`actualNoOfPackages${index}`}
//                       name='actualNoOfPackages'
//                       disabled
//                       value={item.actualNoOfPackages}
//                       onChange={(e) => handleMultipleDestuffdataChange(e, index, 8, 0)}
//                     />
//                   </td>
//                   <td>
//                     <Input
//                       className={`form-control ${errors[index]?.actualNoOfWeight ? 'error-border' : ''}`}
//                       type="text"
//                       id={`actualNoOfWeight${index}`}
//                       name='actualNoOfWeight'
//                       value={item.actualNoOfWeight}
//                       onChange={(e) => handleMultipleDestuffdataChange(e, index, 12, 4)}
//                     />
//                   </td>
//                   <td>{item.fob}</td>
//                   <td>{item.areaOccupied}</td>
//                   <td>{item.yardPackages}</td>
//                   <td>
//                     <Select

//                       value={{ value: item.gridLocation + '-' + item.gridBlock + '-' + item.gridCellNo, label: item.gridLocation + '-' + item.gridBlock + '-' + item.gridCellNo }}
//                       onChange={(option, actionMeta) => handleYardChange(option, actionMeta, index)}
//                       onInputChange={getSearchYardData}
//                       options={yardSearchData}
//                       placeholder="Select Yard Location"
//                       isClearable
//                       id="gridLocation"
//                       name="gridLocation"
//                       isDisabled={destuffData.status === 'N' || destuffData.status === 'A'}
//                       className={`autocompleteHeight ${errors[index]?.gridLocation ? 'error-border' : ''}`}
//                       menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
//                       menuPosition="fixed"
//                       styles={{
//                         control: (provided, state) => ({
//                           ...provided,
//                           height: 32, // Set height
//                           minHeight: 32, // Set minimum height
//                           border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
//                           boxShadow: "none",
//                           display: 'flex',
//                           alignItems: 'center', // Align items vertically
//                           padding: 0, // Remove padding to control height
//                           "&:hover": {
//                             border: "1px solid #ccc",
//                           },
//                           borderRadius: '6px', // Add border radius
//                           "&:hover": {
//                             border: "1px solid #ccc",
//                           },
//                         }),
//                         valueContainer: (provided) => ({
//                           ...provided,
//                           height: '100%', // Full height of the control
//                           display: 'flex',
//                           alignItems: 'center', // Align items vertically
//                           padding: '0 0.75rem', // Match padding
//                         }),
//                         singleValue: (provided) => ({
//                           ...provided,
//                           lineHeight: '32px', // Center text vertically
//                         }),
//                         indicatorSeparator: () => ({
//                           display: "none",
//                         }),
//                         dropdownIndicator: () => ({
//                           display: "none",
//                         }),
//                         placeholder: (provided) => ({
//                           ...provided,
//                           lineHeight: '32px', // Center placeholder text vertically
//                           color: "gray",
//                         }),
//                         clearIndicator: (provided) => ({
//                           ...provided,
//                           padding: 2, // Remove padding
//                           display: 'flex',
//                           alignItems: 'center', // Align clear indicator vertically
//                         }),
//                       }}
//                     />

//                   </td>
//                   <td>
//                     <Input
//                       className={`form-control ${errors[index]?.yardArea ? 'error-border' : ''}`}
//                       type="text"
//                       id={`yardArea${index}`}
//                       name='yardArea'
//                       value={item.yardArea}
//                       onChange={(e) => handleMultipleDestuffdataChange(e, index, 5, 3)}
//                       disabled={destuffData.status === 'N' || destuffData.status === 'A'}
//                     />
//                   </td>
//                   <td>
//                     <Input
//                       className={`form-control ${errors[index]?.yardPack ? 'error-border' : ''}`}
//                       type="text"
//                       id={`yardPack${index}`}
//                       name='yardPack'
//                       value={item.yardPack}
//                       onChange={(e) => handleMultipleDestuffdataChange(e, index, 5, 0)}
//                       disabled={destuffData.status === 'N' || destuffData.status === 'A'}
//                     />
//                   </td>
//                   <td>
//                     <button
//                       className="btn btn-outline-primary btn-margin newButton"
//                       style={{ marginRight: 10 }}
//                       id="submitbtn2"
//                       disabled={destuffData.status === '' || destuffData.status === 'A'}
//                       onClick={() => openYardModal(item.cartingLineId, item.actualNoOfPackages)}
//                     >
//                       <FontAwesomeIcon icon={faAdd} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}

//             </tbody>
//           </table>
//         </div>
//       </div >
//     </>
//   );
// }

// export default ExportReworkingContainer;






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
  Label,
  Input,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
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
  faAd,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/style.css";
import "../Components/Style.css";
import { Button } from "react-bootstrap";
import useAxios from "../Components/useAxios";
import CFSService from "../service/CFSService";
import { toast } from "react-toastify";
import moment from "moment";
import { error } from "jquery";

function ExportReworkingContainer({ searchData, resetFlag, updatePagesList }) {
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
  const [errors, setErrors] = useState([]);

  const processId = 'P00227';


  useEffect(() => {
    if (searchData && searchData.activeTab === processId && searchData.profitCenterId && searchData.reworkingId && searchData.containerNo) {    
      getSelectedData(searchData.reworkingId);
    }
  }, [searchData]);

  useEffect(() => {
    if (resetFlag) {
      handleClear();
    }    
  }, [resetFlag]);












  // getSelectedData





  const foundRights =
    role !== "ROLE_ADMIN"
      ? userRights.find((item) => item.process_Id === processId)
      : null;
  const allowCreate = foundRights?.allow_Create === "Y";
  const allowRead = foundRights?.allow_Read === "Y";
  const allowEdit = foundRights?.allow_Update === "Y";
  const allowDelete = foundRights?.allow_Delete === "Y";


  const [destuffData, setDestuffData] = useState({
    companyId: '',
    branchId: '',
    deStuffId: '',
    deStuffDate: new Date(),
    profitCentreId: 'CFS Export',
    containerSearchType: 'Normal Container',
    status: '',
    createdBy: '',
    gateInId: '',
    gateInDate: null,
    containerNo: '',
    containerType: '',
    containerSize: '',
    containerStatus: '',
    shippingAgent: '',
    saName: '',
    vehicleNo: '',
    customSealNo: '',
    saSealNo: '',
    onAccountOf: '',
    onAccountOfName: '',
    areaOccupied: '',
    yardPackages: '',
    fromDate: null,
    toDate: null,
    remark: '',
  })


  const handleChange = (e) => {
    const { name, value } = e.target;
    setDestuffData((prevState) => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'containerSearchType') {
      setFormErrors({
        containerNo: '',
        onAccountOf: '',
        fromDate: '',
        toDate: ''
      })

      setErrors([]);
      setDestuffData({
        ...destuffData,
        companyId: '',
        branchId: '',
        deStuffId: '',
        deStuffDate: new Date(),
        profitCentreId: 'CFS Export',
        containerSearchType: value,
        status: '',
        createdBy: '',
        gateInId: '',
        gateInDate: null,
        containerNo: '',
        containerType: '',
        containerSize: '',
        containerStatus: '',
        shippingAgent: '',
        saName: '',
        vehicleNo: '',
        customSealNo: '',
        saSealNo: '',
        onAccountOf: '',
        onAccountOfName: '',
        areaOccupied: '',
        yardPackages: '',
        fromDate: null,
        toDate: null,
        remark: '',
      })

      setMultipleDestuffData([{
        companyId: '',
        branchId: '',
        cartingTransId: '',
        cartingLineId: '',
        sbTransId: '',
        sbNo: '',
        commodity: '',
        gateInPackages: '',
        gateInWeight: '',
        actualNoOfPackages: '',
        actualNoOfWeight: '',
        fob: '',
        areaOccupied: '',
        yardPackages: '',
        gridLocation: '',
        gridBlock: '',
        gridCellNo: '',
        yardArea: '',
        yardPack: ''
      }])
    }

    // setFormErrors((prevErrors) => ({
    //   ...prevErrors,
    //   [name]: "",
    // }));
  }

  const [multipleDestuffData, setMultipleDestuffData] = useState([{
    companyId: '',
    branchId: '',
    cartingTransId: '',
    cartingLineId: '',
    sbTransId: '',
    sbNo: '',
    commodity: '',
    gateInPackages: '',
    gateInWeight: '',
    actualNoOfPackages: '',
    actualNoOfWeight: '',
    fob: '',
    areaOccupied: '',
    yardPackages: '',
    gridLocation: '',
    gridBlock: '',
    gridCellNo: '',
    yardArea: '',
    yardPack: ''
  }])


  const [onAccountOfData, setOnAccountOfData] = useState([])

  const handleGetOnAccountOfData = (id) => {
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

  const handleOnAccountChange = async (selectedOption, { action }) => {

    if (action === 'clear') {

      setDestuffData({
        ...destuffData,
        onAccountOf: '',
        onAccountOfName: ''
      });

    }
    else {


      setDestuffData({
        ...destuffData,
        onAccountOf: selectedOption ? selectedOption.value : '',
        onAccountOfName: selectedOption ? selectedOption.label : ''
      });
      setFormErrors({
        ...formErrors,
        onAccountOf: ''
      })
    }
  };


  const [containerData, setContainerData] = useState([]);

  const handleGetContainerNo = (val) => {
    if (val === '') {
      setContainerData([]);
      return;
    }

    axios.get(`${ipaddress}carting/getContainerNoForExportReworking?cid=${companyid}&bid=${branchId}&val=${val}&type=${destuffData.containerSearchType}`, {
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

  const handleContainerNoChange = async (selectedOption, { action }) => {

    if (action === 'clear') {

      setDestuffData({
        ...destuffData,
        containerNo: '',
      });

      handleClear();

    }
    else {


      setDestuffData({
        ...destuffData,
        containerNo: selectedOption ? selectedOption.value : '',
      });
      setFormErrors({
        ...formErrors,
        containerNo: ''
      })

      getSelectedContainerNoData(selectedOption.value);
    }
  };


  const getSelectedContainerNoData = (val) => {
    axios.get(`${ipaddress}carting/getSelectedContainerNoForExportReworking?cid=${companyid}&bid=${branchId}&val=${val}&type=${destuffData.containerSearchType}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {

        const data = response.data;
        const singleData = data[0]
        const type = destuffData.containerSearchType;
        if (destuffData.containerSearchType === 'Port Return Container') {
          setDestuffData({
            companyId: '',
            branchId: '',
            deStuffId: '',
            deStuffDate: new Date(),
            profitCentreId: 'CFS Export',
            containerSearchType: type,
            status: '',
            createdBy: '',
            gateInId: singleData[0] || '',
            gateInDate: singleData[1] === null ? null : new Date(singleData[1]),
            containerNo: singleData[2] || '',
            containerType: singleData[4] || '',
            containerSize: singleData[3] || '',
            containerStatus: singleData[5] || '',
            shippingAgent: singleData[7] || '',
            saName: singleData[8] || '',
            vehicleNo: singleData[9] || '',
            customSealNo: singleData[6] || '',
            saSealNo: '',
            onAccountOf: singleData[10] || '',
            onAccountOfName: singleData[11] || '',
            areaOccupied: '',
            yardPackages: '',
            fromDate: null,
            toDate: null,
            remark: '',
          })

          setMultipleDestuffData(data.map((item) => (
            {
              companyId: '',
              branchId: '',
              cartingTransId: '',
              cartingLineId: '',
              sbTransId: item[12] || '',
              sbNo: item[13] || '',
              commodity: item[14] || '',
              gateInPackages: item[15] || '',
              gateInWeight: item[16] || '',
              actualNoOfPackages: item[15] || '',
              actualNoOfWeight: item[16] || '',
              fob: item[17] || '',
              areaOccupied: '',
              yardPackages: '',
              gridLocation: '',
              gridBlock: '',
              gridCellNo: '',
              yardArea: '',
              yardPack: ''
            }
          )))
        }
        else {
          setDestuffData({
            companyId: '',
            branchId: '',
            deStuffId: '',
            deStuffDate: new Date(),
            profitCentreId: 'CFS Export',
            containerSearchType: type,
            status: '',
            createdBy: '',
            gateInId: singleData[0] || '',
            gateInDate: singleData[1] === null ? null : new Date(singleData[1]),
            containerNo: singleData[2] || '',
            containerType: singleData[4] || '',
            containerSize: singleData[3] || '',
            containerStatus: singleData[5] || '',
            shippingAgent: singleData[18] || '',
            saName: singleData[7] || '',
            vehicleNo: singleData[8] || '',
            customSealNo: singleData[6] || '',
            saSealNo: '',
            onAccountOf: singleData[11] || '',
            onAccountOfName: singleData[12] || '',
            areaOccupied: '',
            yardPackages: '',
            fromDate: null,
            toDate: null,
            remark: '',
          })

          setMultipleDestuffData(data.map((item) => (
            {
              companyId: '',
              branchId: '',
              cartingTransId: '',
              cartingLineId: '',
              sbTransId: item[13] || '',
              sbNo: item[14] || '',
              commodity: item[15] || '',
              gateInPackages: item[10] || '',
              gateInWeight: item[16] || '',
              actualNoOfPackages: item[10] || '',
              actualNoOfWeight: item[16] || '',
              fob: item[17] || '',
              areaOccupied: '',
              yardPackages: '',
              gridLocation: '',
              gridBlock: '',
              gridCellNo: '',
              yardArea: '',
              yardPack: ''
            }
          )))
        }

      })
      .catch((error) => {
        toast.error(error.response.data, {
          autoClose: 800
        })
      })
  }

  const [yardSearchData, setYardSearchData] = useState([]);

  const getSearchYardData = (val) => {

    if (val === '') {
      setYardSearchData([]);
      return;
    }

    axios.get(`${ipaddress}api/yardblockcells/getAllYard?companyId=${companyid}&branchId=${branchId}&search=${val}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;
        const portOptions = data.map(port => ({
          value: port.yardLocationId + '-' + port.blockId + '-' + port.cellNoRow,
          label: port.yardLocationId + '-' + port.blockId + '-' + port.cellNoRow,
          yardLocation: port.yardLocationId,
          block: port.blockId,
          cell: port.cellNoRow
        }))
        setYardSearchData(portOptions);
      })
      .catch((error) => {
        setYardSearchData([]);
      })
  }


  const [yardSearchData1, setYardSearchData1] = useState([]);

  const getSearchYardData1 = (val) => {

    if (val === '') {
      setYardSearchData([]);
      return;
    }

    axios.get(`${ipaddress}api/yardblockcells/getAllYardForReworking?companyId=${companyid}&branchId=${branchId}&search=${val}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;
        const portOptions = data.map(port => ({
          value: port.yardLocationId + '-' + port.blockId + '-' + port.cellNoRow,
          label: port.yardLocationId + '-' + port.blockId + '-' + port.cellNoRow,
          yardLocation: port.yardLocationId,
          block: port.blockId,
          cell: port.cellNoRow,
          cellArea: port.cellArea,
          cellAreaUsed: port.cellAreaUsed
        }))
        setYardSearchData1(portOptions);
      })
      .catch((error) => {
        setYardSearchData1([]);
      })
  }

  const handleYardChange = async (selectedOption, { action }, index) => {
    setMultipleDestuffData((prevData) => {
      const updatedData = [...prevData];
      if (action === 'clear') {
        // Clear values for the specific index
        updatedData[index] = {
          ...updatedData[index],
          gridLocation: '',
          gridBlock: '',
          gridCellNo: '',
        };
      } else {
        // Update with selected values
        updatedData[index] = {
          ...updatedData[index],
          gridLocation: selectedOption.yardLocation,
          gridBlock: selectedOption.block,
          gridCellNo: selectedOption.cell
        };
      }
      return updatedData;
    });
    if (action !== 'clear') {
      setErrors(prevErrors => {
        const updatedErrors = Array.isArray(prevErrors) ? [...prevErrors] : [];

        if (updatedErrors[index]) {
          delete updatedErrors[index]['gridLocation'];

          // Remove the error object at the index if it's empty
          if (Object.keys(updatedErrors[index]).length === 0) {
            updatedErrors.splice(index, 1);
          }
        }

        return updatedErrors;
      });
    }
  };

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


  const handleMultipleDestuffdataChange = (e, index, val1, val2) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    // Sanitize input for specific fields
    if (['actualNoOfPackages', 'actualNoOfWeight', 'yardArea', 'yardPack'].includes(name)) {
      sanitizedValue = handleInputChange(value, val1, val2);
    }

    if (name === 'actualNoOfPackages') {

      if ((sanitizedValue < multipleDestuffData[index].yardPack) && destuffData.status === '') {
        setMultipleDestuffData(prevState => {
          const updatedData = [...prevState];
          updatedData[index] = {
            ...updatedData[index],
            ['yardPack']: '',
          };
          return updatedData;
        });
      }

      if (sanitizedValue > parseFloat(multipleDestuffData[index].gateInPackages)) {
        sanitizedValue = ''

        setMultipleDestuffData(prevState => {
          const updatedData = [...prevState];
          updatedData[index] = {
            ...updatedData[index],
            ['actualNoOfWeight']: '',
          };
          return updatedData;
        });
      }
      else {
        const wt = (parseFloat(multipleDestuffData[index].gateInWeight) * sanitizedValue) / parseFloat(multipleDestuffData[index].gateInPackages)

        setMultipleDestuffData(prevState => {
          const updatedData = [...prevState];
          updatedData[index] = {
            ...updatedData[index],
            ['actualNoOfWeight']: wt,
          };
          return updatedData;
        });

        setErrors(prevErrors => {
          const updatedErrors = Array.isArray(prevErrors) ? [...prevErrors] : [];

          if (updatedErrors[index]) {
            delete updatedErrors[index]['actualNoOfWeight'];

            // Remove the error object at the index if it's empty
            if (Object.keys(updatedErrors[index]).length === 0) {
              updatedErrors.splice(index, 1);
            }
          }

          return updatedErrors;
        });
      }


    }

    if (name === 'yardPack') {
      console.log('sanitizedValue ', sanitizedValue, multipleDestuffData[index].actualNoOfPackages);

      if (sanitizedValue > parseFloat(multipleDestuffData[index].actualNoOfPackages)) {
        sanitizedValue = '';

        setErrors(prevErrors => {
          const updatedErrors = Array.isArray(prevErrors) ? [...prevErrors] : [];

          if (updatedErrors[index]) {
            delete updatedErrors[index]['yardPack'];

            // Remove the error object at the index if it's empty
            if (Object.keys(updatedErrors[index]).length === 0) {
              updatedErrors.splice(index, 1);
            }
          }

          return updatedErrors;
        });


      }
    }


    setMultipleDestuffData(prevState => {
      const updatedData = [...prevState];
      updatedData[index] = {
        ...updatedData[index],
        [name]: sanitizedValue,
      };
      return updatedData;
    });

    setErrors(prevErrors => {
      const updatedErrors = Array.isArray(prevErrors) ? [...prevErrors] : [];

      if (updatedErrors[index]) {
        delete updatedErrors[index][name];

        // Remove the error object at the index if it's empty
        if (Object.keys(updatedErrors[index]).length === 0) {
          updatedErrors.splice(index, 1);
        }
      }

      return updatedErrors;
    });

  }

  const [formErrors, setFormErrors] = useState({
    containerNo: '',
    onAccountOf: '',
    fromDate: '',
    toDate: ''
  })




  const handleClear = () => {
    setFormErrors({
      containerNo: '',
      onAccountOf: '',
      fromDate: '',
      toDate: ''
    })

    setErrors([]);
    setDestuffData({
      companyId: '',
      branchId: '',
      deStuffId: '',
      deStuffDate: new Date(),
      profitCentreId: 'CFS Export',
      containerSearchType: 'Normal Container',
      status: '',
      createdBy: '',
      gateInId: '',
      gateInDate: null,
      containerNo: '',
      containerType: '',
      containerSize: '',
      containerStatus: '',
      shippingAgent: '',
      saName: '',
      vehicleNo: '',
      customSealNo: '',
      saSealNo: '',
      onAccountOf: '',
      onAccountOfName: '',
      areaOccupied: '',
      yardPackages: '',
      fromDate: null,
      toDate: null,
      remark: '',
    })

    setMultipleDestuffData([{
      companyId: '',
      branchId: '',
      cartingTransId: '',
      cartingLineId: '',
      sbTransId: '',
      sbNo: '',
      commodity: '',
      gateInPackages: '',
      gateInWeight: '',
      actualNoOfPackages: '',
      actualNoOfWeight: '',
      fob: '',
      areaOccupied: '',
      yardPackages: '',
      gridLocation: '',
      gridBlock: '',
      gridCellNo: '',
      yardArea: '',
      yardPack: ''
    }])
  }


  const handleSave = (status) => {
    setFormErrors({
      containerNo: '',
      onAccountOf: '',
      fromDate: '',
      toDate: ''
    })

    let errors = {};

    if (!destuffData.containerNo) {
      errors.containerNo = "Container no is required."
    }

    if (!destuffData.onAccountOf) {
      errors.onAccountOf = "On account of is required."
    }

    if (!destuffData.fromDate) {
      errors.fromDate = "From date is required."
    }

    if (!destuffData.toDate) {
      errors.toDate = "To date is required."
    }


    if (Object.keys(errors).length > 0) {
      setLoading(false);
      setFormErrors(errors);
      toast.error("Please fill in the required fields.", {
        autoClose: 1000
      })
      return;
    }


    if (multipleDestuffData.length === 0) {
      setErrors([]);

      toast.error("SB data not found.", {
        autoClose: 1000
      })
      setLoading(false);
      return;
    }

    let newErrors = multipleDestuffData.map(() => ({}));
    setErrors([]);

    multipleDestuffData.forEach((data, index) => {
      let rowErrors = {};

      if (!data.actualNoOfPackages) rowErrors.actualNoOfPackages = "Destuff qty is required.";
      if (!data.actualNoOfWeight) rowErrors.actualNoOfWeight = "Actual wt is required.";
      if (!data.gridLocation) rowErrors.gridLocation = "Yard location is required.";
      if (!data.yardPack) rowErrors.yardPack = "Yard pack is required.";
      if (!data.yardArea) rowErrors.yardArea = "Yard area is required.";

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

    if (status === 'A') {
      let check = multipleDestuffData.filter(item => parseFloat(item.actualNoOfPackages) !== parseFloat(item.yardPackages))

      if (check.length > 0) {
        toast.error("Destuff qty doesn't matched with yard packages.", {
          autoClose: 800
        })
        setLoading(false);
        return;
      }
    }

    const formData = {
      conCarting: destuffData,
      carting: multipleDestuffData
    }

    axios.post(`${ipaddress}carting/saveExportReworkingContainer?cid=${companyid}&bid=${branchId}&user=${userId}&status=${status}`, formData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {

        const data = response.data.carting;
        const singleData = response.data.conCarting;


        setDestuffData({
          companyId: '',
          branchId: '',
          deStuffId: singleData.deStuffId || '',
          deStuffDate: singleData.deStuffDate === null ? null : new Date(singleData.deStuffDate) || new Date(),
          profitCentreId: 'CFS Export',
          containerSearchType: singleData.containerSearchType || 'Normal Container',
          status: singleData.status || '',
          createdBy: singleData.createdBy || '',
          gateInId: singleData.gateInId || '',
          gateInDate: singleData.gateInDate === null ? null : new Date(singleData.gateInDate),
          containerNo: singleData.containerNo || '',
          containerType: singleData.containerType || '',
          containerSize: singleData.containerSize || '',
          containerStatus: singleData.containerStatus || '',
          shippingAgent: singleData.shippingAgent || '',
          saName: singleData.saName || '',
          vehicleNo: singleData.vehicleNo || '',
          customSealNo: singleData.customSealNo || '',
          saSealNo: singleData.saSealNo || '',
          onAccountOf: singleData.onAccountOf || '',
          onAccountOfName: singleData.onAccountOfName || '',
          areaOccupied: '',
          yardPackages: '',
          fromDate: singleData.fromDate === null ? null : new Date(singleData.fromDate),
          toDate: singleData.toDate === null ? null : new Date(singleData.toDate),
          remark: singleData.remark || '',
        })

        setMultipleDestuffData(data.map((item) => (
          {
            companyId: '',
            branchId: '',
            cartingTransId: item[0] || '',
            cartingLineId: item[1] || '',
            sbTransId: item[2] || '',
            sbNo: item[3] || '',
            commodity: item[4] || '',
            gateInPackages: item[5] || '',
            gateInWeight: item[6] || '',
            actualNoOfPackages: item[7] || '',
            actualNoOfWeight: item[8] || '',
            fob: item[9] || '',
            areaOccupied: item[13] || '',
            yardPackages: item[14] || '',
            gridLocation: item[10] || '',
            gridBlock: item[11] || '',
            gridCellNo: item[12] || '',
            yardArea: item[15] || '',
            yardPack: item[16] || '',
          }
        )))


        if (searchData && (searchData.sbNo || searchData.container)
        ) {
          updatePagesList("P00227");
        }


        toast.success('Data save successfully!!!', {
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
    axios.get(`${ipaddress}carting/searchReworking?cid=${companyid}&bid=${branchId}&val=${id}`, {
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

    axios.get(`${ipaddress}carting/getSearchedReworkingData?cid=${companyid}&bid=${branchId}&val=${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {


        const data = response.data.carting;
        const singleData = response.data.conCarting;


        setDestuffData({
          companyId: '',
          branchId: '',
          deStuffId: singleData.deStuffId || '',
          deStuffDate: singleData.deStuffDate === null ? null : new Date(singleData.deStuffDate) || new Date(),
          profitCentreId: 'CFS Export',
          containerSearchType: singleData.containerSearchType || 'Normal Container',
          status: singleData.status || '',
          createdBy: singleData.createdBy || '',
          gateInId: singleData.gateInId || '',
          gateInDate: singleData.gateInDate === null ? null : new Date(singleData.gateInDate),
          containerNo: singleData.containerNo || '',
          containerType: singleData.containerType || '',
          containerSize: singleData.containerSize || '',
          containerStatus: singleData.containerStatus || '',
          shippingAgent: singleData.shippingAgent || '',
          saName: singleData.saName || '',
          vehicleNo: singleData.vehicleNo || '',
          customSealNo: singleData.customSealNo || '',
          saSealNo: singleData.saSealNo || '',
          onAccountOf: singleData.onAccountOf || '',
          onAccountOfName: singleData.onAccountOfName || '',
          areaOccupied: '',
          yardPackages: '',
          fromDate: singleData.fromDate === null ? null : new Date(singleData.fromDate),
          toDate: singleData.toDate === null ? null : new Date(singleData.toDate),
          remark: singleData.remark || '',
        })

        setMultipleDestuffData(data.map((item) => (
          {
            companyId: '',
            branchId: '',
            cartingTransId: item[0] || '',
            cartingLineId: item[1] || '',
            sbTransId: item[2] || '',
            sbNo: item[3] || '',
            commodity: item[4] || '',
            gateInPackages: item[5] || '',
            gateInWeight: item[6] || '',
            actualNoOfPackages: item[7] || '',
            actualNoOfWeight: item[8] || '',
            fob: item[9] || '',
            areaOccupied: item[13] || '',
            yardPackages: item[14] || '',
            gridLocation: item[10] || '',
            gridBlock: item[11] || '',
            gridCellNo: item[12] || '',
            yardArea: item[15] || '',
            yardPack: item[16] || '',
          }
        )))

        toast.success('Data found successfully!!!', {
          autoClose: 800
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



  const [isModalForOpenYard, setIsModalForOpenYard] = useState(false);
  const [yardData, setYardData] = useState([{
    companyId: '',
    branchId: '',
    processTransId: '',
    lineNo: '',
    subSrNo: '',
    yardLocation: '',
    yardBlock: '',
    blockCellNo: '',
    yardPackages: '',
    cellArea: '',
    cellAreaUsed: '',
    cellAreaAllocated: ''
  }])

  const [yardLineId, setYardLineId] = useState('');
  const [destuffQty, setDestuffQty] = useState('');

  const openYardModal = (sb, packages) => {
    setIsModalForOpenYard(true);
    setYardLineId(sb);
    setDestuffQty(packages);

    getGridData(sb);
  }

  const getGridData = (lineId) => {
    axios.get(`${ipaddress}carting/getGridDataForReworking?cid=${companyid}&bid=${branchId}&id=${destuffData.deStuffId}&lineid=${lineId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {

        const data = response.data;

        console.log('grid data ', data);


        setYardData(data.map((item) => ({
          companyId: '',
          branchId: '',
          processTransId: item.processTransId || '',
          lineNo: item.lineNo || '',
          subSrNo: item.subSrNo || '',
          yardLocation: item.yardLocation || '',
          yardBlock: item.yardBlock || '',
          blockCellNo: item.blockCellNo || '',
          yardPackages: item.yardPackages || '',
          cellArea: item.cellArea || 0,
          cellAreaUsed: item.cellAreaUsed || 0,
          cellAreaAllocated: item.cellAreaAllocated || 0
        })))
      })
      .catch((error) => {

      })
  }

  const closeYardModal = () => {
    setIsModalForOpenYard(false);
    setYardData([{
      companyId: '',
      branchId: '',
      processTransId: '',
      lineNo: '',
      subSrNo: '',
      yardLocation: '',
      yardBlock: '',
      blockCellNo: '',
      yardPackages: '',
      cellArea: '',
      cellAreaUsed: '',
      cellAreaAllocated: ''
    }]);
    setDestuffQty('');
    setYardLineId('');
    setGridErrors([]);
  }

  const [gridErrors, setGridErrors] = useState([]);

  const handleGridChange = async (selectedOption, { action }, index) => {
    if (action !== 'clear') {
      const newEntry = {
        yardLocation: selectedOption.yardLocation,
        yardBlock: selectedOption.block,
        blockCellNo: selectedOption.cell
      };

      // Perform the duplicate check before updating the state
      const isDuplicate = yardData.some(
        (item, i) =>
          i !== index &&
          item.yardLocation === newEntry.yardLocation &&
          item.yardBlock === newEntry.yardBlock &&
          item.blockCellNo === newEntry.blockCellNo
      );

      if (isDuplicate) {
        toast.error('Duplicate entry detected for Yard Location, Yard Block, and Block Cell No.', {
          autoClose: 800
        });
        return; // Exit early to avoid state updates
      }
    }

    setYardData((prevData) => {
      const updatedData = [...prevData];

      if (action === 'clear') {
        // Clear values for the specific index
        updatedData[index] = {
          ...updatedData[index],
          yardLocation: '',
          yardBlock: '',
          blockCellNo: '',
          yardPackages: '',
          cellArea: '',
          cellAreaUsed: '',
          cellAreaAllocated: ''
        };
      } else {
        // Update with selected values
        updatedData[index] = {
          ...updatedData[index],
          yardLocation: selectedOption.yardLocation,
          yardBlock: selectedOption.block,
          blockCellNo: selectedOption.cell,
          cellArea: selectedOption.cellArea,
          cellAreaUsed: selectedOption.cellAreaUsed,
          yardPackages: '',
          cellAreaAllocated: ''
        };
      }

      return updatedData;
    });

    if (action !== 'clear') {
      setGridErrors((prevErrors) => {
        const updatedErrors = Array.isArray(prevErrors) ? [...prevErrors] : [];

        if (updatedErrors[index]) {
          delete updatedErrors[index]['yardLocation'];

          // Remove the error object at the index if it's empty
          if (Object.keys(updatedErrors[index]).length === 0) {
            updatedErrors.splice(index, 1);
          }
        }

        return updatedErrors;
      });
    }
  };




  const handleMultipleYardDataChange = (e, index, val1, val2) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    // Sanitize input for specific fields
    if (['cellAreaAllocated', 'yardPackages'].includes(name)) {
      sanitizedValue = handleInputChange(value, val1, val2);
    }

    if (name === 'cellAreaAllocated') {
      let areaVal = parseFloat(yardData[index].cellArea) - parseFloat(yardData[index].cellAreaUsed);

      if (sanitizedValue > areaVal) {
        sanitizedValue = ''
      }
    }

    if (name === 'yardPackages') {
      // Calculate the total of all yardPackages excluding the current index
      const currentTotal = yardData.reduce((sum, item, i) => {
        if (i !== index) {
          return sum + parseInt(item.yardPackages || 0, 10);
        }
        return sum;
      }, 0);

      // Add the new value to the total
      const newTotal = currentTotal + parseInt(sanitizedValue || 0, 10);

      // If the new total exceeds 50, reset the sanitized value
      if (newTotal > destuffQty) {
        sanitizedValue = '';

      }
    }


    setYardData(prevState => {
      const updatedData = [...prevState];
      updatedData[index] = {
        ...updatedData[index],
        [name]: sanitizedValue,
      };
      return updatedData;
    });

    setGridErrors(prevErrors => {
      const updatedErrors = Array.isArray(prevErrors) ? [...prevErrors] : [];

      if (updatedErrors[index]) {
        delete updatedErrors[index][name];

        // Remove the error object at the index if it's empty
        if (Object.keys(updatedErrors[index]).length === 0) {
          updatedErrors.splice(index, 1);
        }
      }

      return updatedErrors;
    });

  }

  const addRow = () => {
    setYardData(prevData => [
      ...prevData,
      {
        companyId: '',
        branchId: '',
        processTransId: '',
        lineNo: '',
        subSrNo: '',
        yardLocation: '',
        yardBlock: '',
        blockCellNo: '',
        yardPackages: '',
        cellArea: '',
        cellAreaUsed: '',
        cellAreaAllocated: ''
      }
    ]);
  };

  const removeRow = (index) => {
    setYardData(prevData => prevData.filter((_, i) => i !== index));
  };


  const handleSaveYardpackages = () => {
    setLoading(true);


    let newErrors = yardData.map(() => ({}));
    setGridErrors([]);

    yardData.forEach((data, index) => {
      let rowErrors = {};

      if (!data.yardLocation) rowErrors.yardLocation = "Yard location is required.";
      if (!data.cellAreaAllocated) rowErrors.cellAreaAllocated = "Area occupied is required.";
      if (!data.yardPackages) rowErrors.yardPackages = "Yard packages is required.";


      if (Object.keys(rowErrors).length > 0) {
        newErrors[index] = rowErrors;
      }
    });

    // Check if any errors exist
    const hasErrors = newErrors.some(errorObj => Object.keys(errorObj).length > 0);

    if (hasErrors) {

      setGridErrors(newErrors);
      setLoading(false);
      toast.error("Please fill in the required fields.", {
        autoClose: 1000
      });

      return;
    }


    let finalValue = yardData.reduce((total, item) => total + (parseInt(item.yardPackages || 0, 0)), 0);

    if (finalValue !== destuffQty) {
      toast.error("Destuff qty doesn't match with total yard packages.", {
        autoClose: 800
      })
      setLoading(false);
      return;
    }


    axios.post(`${ipaddress}carting/saveyardPackForReworking?cid=${companyid}&bid=${branchId}&user=${userId}`, yardData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {

        const gridData = response.data.gridData;
        const cartingData = response.data.carting;

        setYardData(gridData.map((item) => ({
          companyId: '',
          branchId: '',
          processTransId: item.processTransId || '',
          lineNo: item.lineNo || '',
          subSrNo: item.subSrNo || '',
          yardLocation: item.yardLocation || '',
          yardBlock: item.yardBlock || '',
          blockCellNo: item.blockCellNo || '',
          yardPackages: item.yardPackages || '',
          cellArea: item.cellArea || 0,
          cellAreaUsed: item.cellAreaUsed || 0,
          cellAreaAllocated: item.cellAreaAllocated || 0
        })))

        setMultipleDestuffData(cartingData.map((item) => (
          {
            companyId: '',
            branchId: '',
            cartingTransId: item[0] || '',
            cartingLineId: item[1] || '',
            sbTransId: item[2] || '',
            sbNo: item[3] || '',
            commodity: item[4] || '',
            gateInPackages: item[5] || '',
            gateInWeight: item[6] || '',
            actualNoOfPackages: item[7] || '',
            actualNoOfWeight: item[8] || '',
            fob: item[9] || '',
            areaOccupied: item[13] || '',
            yardPackages: item[14] || '',
            gridLocation: item[10] || '',
            gridBlock: item[11] || '',
            gridCellNo: item[12] || '',
            yardArea: item[15] || '',
            yardPack: item[16] || '',
          }
        )))

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
            /> Search Reworking Data</h5>



          </ModalHeader>
          <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
            <Row>
              <Col md={4}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="sbRequestId">
                    Search by Destuff Id/Container No/Container Size & Type
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
                  style={{ marginRight: 10 }}
                  id="submitbtn2"
                  onClick={() => searchExportEmptyContainerGateIn(searchId)}

                >
                  <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                  Search
                </button>
                <button
                  className="btn btn-outline-danger btn-margin newButton"
                  style={{ marginRight: 10 }}
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
                    <th scope="col">Destuff Id</th>
                    <th scope="col">Destuff Date</th>
                    <th scope="col">Container No</th>
                    <th scope="col">Container Size</th>
                    <th scope="col">Container Type</th>

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
                        <input type="radio" onChange={() => getSelectedData(item[0])} name="radioGroup" />
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
              <label className="forlabel bold-label" htmlFor="deStuffId">

                Destuff Id
              </label>
              <Row>
                <Col md={9}>
                  <Input
                    className={`form-control`}
                    type="text"
                    id="deStuffId"
                    name='deStuffId'
                    value={destuffData.deStuffId}
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
                Destuff Date
              </label>
              <div className='datepicker' style={{ position: 'relative', height: 30 }}>
                <DatePicker
                  selected={destuffData.deStuffDate}
                  id='deStuffDate'
                  name='deStuffDate'
                  disabled
                  dateFormat="dd/MM/yyyy HH:mm"
                  className="form-control border-right-0 inputField"
                  customInput={<input style={{ width: '100%' }} />}
                  wrapperClassName="custom-react-datepicker-wrapper"
                />
                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
              </div>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Reworking Type
              </label>
              <Input
                className={`form-control`}
                type="select"
                id="containerSearchType"
                name='containerSearchType'
                value={destuffData.containerSearchType}
                onChange={handleChange}
                disabled={destuffData.deStuffId !== ''}
              >
                <option value="Normal Container" selected="">Normal Container</option>

                <option value="Port Return Container">Port Return Container</option>

                <option value="Buffer Container">Buffer Container</option>

              </Input>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Profitcentre
              </label>
              <Input
                className={`form-control`}
                type="text"
                id="profitCentreId"
                name='profitCentreId'
                value={destuffData.profitCentreId}
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
                className={`form-control`}
                type="text"
                id="status"
                name='status'
                value={destuffData.status === 'A' ? 'Approved' : destuffData.status === 'N' ? 'New' : destuffData.status}
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
                className={`form-control`}
                type="text"
                id="createdBy"
                name='createdBy'
                value={destuffData.createdBy}
                disabled
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Gate In Id
              </label>
              <Input
                className={`form-control`}
                type="text"
                id="gateInId"
                name='gateInId'
                value={destuffData.gateInId}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Gate In Date
              </label>
              <div className='datepicker' style={{ position: 'relative', height: 30 }}>
                <DatePicker
                  selected={destuffData.gateInDate}
                  id='gateInDate'
                  name='gateInDate'
                  disabled
                  dateFormat="dd/MM/yyyy"
                  className="form-control border-right-0 inputField"
                  customInput={<input style={{ width: '100%' }} />}
                  wrapperClassName="custom-react-datepicker-wrapper"
                />
                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
              </div>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Container No <span style={{ color: 'red' }}>*</span>
              </label>
              <Select
                value={{ value: destuffData.containerNo, label: destuffData.containerNo }}
                onChange={handleContainerNoChange}
                onInputChange={handleGetContainerNo}
                options={containerData}
                placeholder="Select Container no"
                isClearable
                isDisabled={destuffData.deStuffId !== ''}
                id="containerNo"
                name="containerNo"
                className={`autocompleteHeight ${formErrors.containerNo ? 'error-border' : ''}`}

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
              <div style={{ color: 'red' }} className="error-message">{formErrors.containerNo}</div>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Type Size
              </label>
              <Input
                className={`form-control`}
                type="text"
                id="containerSize"
                name='containerSize'
                value={destuffData.containerSize + destuffData.containerType}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Container Status
              </label>
              <Input
                className={`form-control`}
                type="text"
                id="containerStatus"
                name='containerStatus'
                value={destuffData.containerStatus}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Custom Seal No
              </label>
              <Input
                className={`form-control`}
                type="text"
                id="customSealNo"
                name='customSealNo'
                value={destuffData.customSealNo}
                disabled
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                SA Seal No
              </label>
              <Input
                className={`form-control`}
                type="text"
                id="saSealNo"
                name='saSealNo'
                value={destuffData.saSealNo}
                onChange={handleChange}
                maxLength={15}
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Shipping Agent
              </label>
              <Input
                className={`form-control`}
                type="text"
                id="saName"
                name='saName'
                value={destuffData.saName}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Vehicle No
              </label>
              <Input
                className={`form-control`}
                type="text"
                id="vehicleNo"
                name='toLocation'
                value={destuffData.vehicleNo}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Area Occupied
              </label>
              <Input
                className={`form-control`}
                type="text"
                id="areaOccupied"
                name='areaOccupied'
                value={multipleDestuffData.reduce((total, item) => total + (parseFloat(item.areaOccupied) || 0), 0)}

                disabled
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Packages
              </label>
              <Input
                className={`form-control`}
                type="text"
                id="yardPackages"
                name='yardPackages'
                value={multipleDestuffData.reduce((total, item) => total + (parseFloat(item.yardPackages) || 0), 0)}

                disabled
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                On Account Of <span style={{ color: 'red' }}>*</span>
              </label>
              <Select
                value={{ value: destuffData.onAccountOf, label: destuffData.onAccountOfName }}
                onInputChange={handleGetOnAccountOfData}
                onChange={handleOnAccountChange}
                options={onAccountOfData}
                placeholder="Select On Account Of"
                isClearable
                id="onAccountOf"
                name="onAccountOf"
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
              <div style={{ color: 'red' }} className="error-message">{formErrors.onAccountOf}</div>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                From Date <span style={{ color: 'red' }}>*</span>
              </label>
              <div className='datepicker' style={{ position: 'relative', height: 30 }}>
                <DatePicker
                  selected={destuffData.fromDate}
                  onChange={(date) => {
                    setDestuffData(prevJobData => ({
                      ...prevJobData,
                      fromDate: date,
                      toDate: date >= prevJobData.toDate ? null : prevJobData.toDate
                    }));
                    setFormErrors({
                      ...formErrors,
                      fromDate: ''
                    });
                  }}
                  id='fromDate'
                  name='fromDate'
                  dateFormat="dd/MM/yyyy HH:mm"
                  showTimeInput
                  className={`form-control border-right-0 inputField ${formErrors.fromDate ? 'error-border' : ''}`}
                  customInput={<input style={{ width: '100%' }} />}
                  wrapperClassName="custom-react-datepicker-wrapper"
                />
                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
              </div>
              <div style={{ color: 'red' }} className="error-message">{formErrors.fromDate}</div>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                To Date <span style={{ color: 'red' }}>*</span>
              </label>
              <div className='datepicker' style={{ position: 'relative', height: 30 }}>
                <DatePicker
                  selected={destuffData.toDate}
                  onChange={(date) => {
                    setDestuffData(prevJobData => ({
                      ...prevJobData,
                      toDate: date,

                    }));

                    setFormErrors({
                      ...formErrors,
                      toDate: ''
                    });
                  }}
                  minDate={(() => {
                    const date = new Date(destuffData.fromDate);
                    date.setDate(date.getDate() + 1);
                    return date;
                  })()}
                  id='toDate'
                  name='toDate'
                  dateFormat="dd/MM/yyyy HH:mm"
                  showTimeInput
                  className={`form-control border-right-0 inputField ${formErrors.toDate ? 'error-border' : ''}`}
                  customInput={<input style={{ width: '100%' }} />}
                  wrapperClassName="custom-react-datepicker-wrapper"
                />
                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
              </div>
              <div style={{ color: 'red' }} className="error-message">{formErrors.toDate}</div>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Remarks
              </label>
              <Input
                className={`form-control`}
                type="textarea"
                id="remark"
                name='remark'
                value={destuffData.remark}
                onChange={handleChange}
                maxLength={200}
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
              disabled={destuffData.status === 'A'}
              onClick={() => handleSave('N')}
            >
              <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
              Save
            </button>

            <button
              className="btn btn-outline-primary btn-margin newButton"
              style={{ marginRight: 10 }}
              id="submitbtn2"
              disabled={destuffData.status === '' || destuffData.status === 'A'}
              onClick={() => handleSave('A')}
            >
              <FontAwesomeIcon icon={faCheck} style={{ marginRight: "5px" }} />
              Submit
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
          </Col>
        </Row>

        <Modal Modal isOpen={isModalForOpenYard} onClose={closeYardModal} toggle={closeYardModal} style={{ maxWidth: '1000px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

          <ModalHeader toggle={closeYardModal} style={{
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
            />Add Yard Packages</h5>



          </ModalHeader>
          <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
            <Row>
              <Col md={3}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="sbRequestId">
                    Destuff Qty
                  </label>
                  <Input
                    className={`form-control`}
                    type="text"
                    id="destuffQty"
                    name='destuffQty'
                    value={destuffQty}
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="sbRequestId">
                    Total Area Occupied
                  </label>
                  <Input
                    className={`form-control`}
                    type="text"
                    id="cellAreaAllocated"
                    name='cellAreaAllocated'
                    value={yardData.reduce((total, item) => total + (parseInt(item.cellAreaAllocated || 0, 0)), 0)}

                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="sbRequestId">
                    Total Yard Packages
                  </label>
                  <Input
                    className={`form-control`}
                    type="text"
                    id="yardPackages"
                    name='yardPackages'
                    value={yardData.reduce((total, item) => total + (parseInt(item.yardPackages || 0, 0)), 0)}

                    disabled
                  />
                </FormGroup>
              </Col>
            </Row>
            <hr />
            <div className="mt-2 table-responsive">
              <table className="table table-bordered table-hover tableHeader dynamic-table">
                <thead className="tableHeader">
                  <tr>
                    <th scope="col" className="text-center" style={{ color: 'black' }}>Select Yard Location</th>
                    <th scope="col" className="text-center" style={{ color: 'black' }}>Cell Area</th>
                    <th scope="col" className="text-center" style={{ color: 'black' }}>Cell Area used</th>
                    <th scope="col" className="text-center" style={{ color: 'black' }}>Area Occupied <span style={{ color: 'red' }}>*</span></th>
                    <th scope="col" className="text-center" style={{ color: 'black' }}>Yard Packages <span style={{ color: 'red' }}>*</span></th>
                    <th scope="col" className="text-center" style={{ color: 'black' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {yardData.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Select

                          value={{ value: item.yardLocation + '-' + item.yardBlock + '-' + item.blockCellNo, label: item.yardLocation + '-' + item.yardBlock + '-' + item.blockCellNo }}
                          onChange={(option, actionMeta) => handleGridChange(option, actionMeta, index)}
                          onInputChange={getSearchYardData1}
                          options={yardSearchData1}
                          placeholder="Select Yard Location"
                          isClearable
                          id={`yardLocation${index}`}
                          name="yardLocation"
                          className={`autocompleteHeight ${gridErrors[index]?.yardLocation ? 'error-border' : ''}`}
                          //  menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                          menuPosition="fixed"
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

                      </td>
                      <td>{item.cellArea}</td>
                      <td>{item.cellAreaUsed}</td>
                      <td style={{ width: 150 }}>
                        <Input
                          className={`form-control ${gridErrors[index]?.cellAreaAllocated ? 'error-border' : ''}`}
                          type="text"
                          id={`cellAreaAllocated${index}`}
                          name='cellAreaAllocated'
                          value={item.cellAreaAllocated}
                          onChange={(e) => handleMultipleYardDataChange(e, index, 5, 3)}
                          style={{ width: 150 }}
                        />
                      </td>
                      <td style={{ width: 150 }}>
                        <Input
                          className={`form-control ${gridErrors[index]?.yardPackages ? 'error-border' : ''}`}
                          type="text"
                          id={`yardPackages${index}`}
                          name='yardPackages'
                          value={item.yardPackages}
                          onChange={(e) => handleMultipleYardDataChange(e, index, 5, 0)}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-margin newButton"
                          style={{ marginRight: 10 }}
                          id="submitbtn2"
                          disabled={item.processTransId !== ''}
                          onClick={() => removeRow(index)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
            <Row className='text-center'>
              <Col>
                <button
                  className="btn btn-outline-primary btn-margin newButton"
                  style={{ marginRight: 10 }}
                  id="submitbtn2"
                  onClick={handleSaveYardpackages}
                >
                  <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                  Save
                </button>

                <button
                  className="btn btn-outline-danger btn-margin newButton"
                  style={{ marginRight: 10 }}
                  id="submitbtn2"
                  onClick={addRow}
                >
                  <FontAwesomeIcon icon={faAdd} style={{ marginRight: "5px" }} />
                  Add Row
                </button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>


        <div className="mt-5 table-responsive">
          <table className="table table-bordered table-hover tableHeader dynamic-table">
            <thead className="tableHeader">
              <tr>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Sr No</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>SB Trans Id</th>
                <th scope="col" className="text-center" style={{ color: 'black', minWidth: 90 }}>SB No</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Commodity Description</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>No Of Pack</th>
                <th scope="col" className="text-center" style={{ color: 'black', minWidth: 90 }}>Weight</th>
                <th scope="col" className="text-center" style={{ color: 'black', minWidth: 90 }}>Destuff Qty <span style={{ color: 'red' }}>*</span></th>
                <th scope="col" className="text-center" style={{ color: 'black', minWidth: 130 }}>Actual Wt <span style={{ color: 'red' }}>*</span></th>
                <th scope="col" className="text-center" style={{ color: 'black', minWidth: 120 }}>FOB</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Total Area Occupied</th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Total Yard Packages</th>
                <th scope="col" className="text-center" style={{ color: 'black', minWidth: 150 }}>Yard Location <span style={{ color: 'red' }}>*</span></th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Area Occupied <span style={{ color: 'red' }}>*</span></th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Yard Packages <span style={{ color: 'red' }}>*</span></th>
                <th scope="col" className="text-center" style={{ color: 'black' }}>Add Yard</th>
              </tr>
            </thead>
            <tbody>
              {multipleDestuffData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.sbTransId}</td>
                  <td>{item.sbNo}</td>
                  <td>{item.commodity}</td>
                  <td>{item.gateInPackages}</td>
                  <td>{item.gateInWeight}</td>
                  <td>
                    <Input
                      className={`form-control ${errors[index]?.actualNoOfPackages ? 'error-border' : ''}`}
                      type="text"
                      id={`actualNoOfPackages${index}`}
                      name='actualNoOfPackages'
                      disabled
                      value={item.actualNoOfPackages}
                      onChange={(e) => handleMultipleDestuffdataChange(e, index, 8, 0)}
                    />
                  </td>
                  <td>
                    <Input
                      className={`form-control ${errors[index]?.actualNoOfWeight ? 'error-border' : ''}`}
                      type="text"
                      id={`actualNoOfWeight${index}`}
                      name='actualNoOfWeight'
                      value={item.actualNoOfWeight}
                      onChange={(e) => handleMultipleDestuffdataChange(e, index, 12, 4)}
                    />
                  </td>
                  <td>{item.fob}</td>
                  <td>{item.areaOccupied}</td>
                  <td>{item.yardPackages}</td>
                  <td>
                    <Select

                      value={{ value: item.gridLocation + '-' + item.gridBlock + '-' + item.gridCellNo, label: item.gridLocation + '-' + item.gridBlock + '-' + item.gridCellNo }}
                      onChange={(option, actionMeta) => handleYardChange(option, actionMeta, index)}
                      onInputChange={getSearchYardData}
                      options={yardSearchData}
                      placeholder="Select Yard Location"
                      isClearable
                      id="gridLocation"
                      name="gridLocation"
                      isDisabled={destuffData.status === 'N' || destuffData.status === 'A'}
                      className={`autocompleteHeight ${errors[index]?.gridLocation ? 'error-border' : ''}`}
                      menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                      menuPosition="fixed"
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

                  </td>
                  <td>
                    <Input
                      className={`form-control ${errors[index]?.yardArea ? 'error-border' : ''}`}
                      type="text"
                      id={`yardArea${index}`}
                      name='yardArea'
                      value={item.yardArea}
                      onChange={(e) => handleMultipleDestuffdataChange(e, index, 5, 3)}
                      disabled={destuffData.status === 'N' || destuffData.status === 'A'}
                    />
                  </td>
                  <td>
                    <Input
                      className={`form-control ${errors[index]?.yardPack ? 'error-border' : ''}`}
                      type="text"
                      id={`yardPack${index}`}
                      name='yardPack'
                      value={item.yardPack}
                      onChange={(e) => handleMultipleDestuffdataChange(e, index, 5, 0)}
                      disabled={destuffData.status === 'N' || destuffData.status === 'A'}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-primary btn-margin newButton"
                      style={{ marginRight: 10 }}
                      id="submitbtn2"
                      disabled={destuffData.status === '' || destuffData.status === 'A'}
                      onClick={() => openYardModal(item.cartingLineId, item.actualNoOfPackages)}
                    >
                      <FontAwesomeIcon icon={faAdd} />
                    </button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div >
    </>
  );
}

export default ExportReworkingContainer;
