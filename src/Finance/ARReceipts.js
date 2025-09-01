
// // import AuthContext from '../Components/AuthProvider';
// // import { useNavigate } from 'react-router-dom';
// // import { useEffect, useState, useContext } from 'react';
// // import '../Components/Style.css';
// // import ipaddress from "../Components/IpAddress";
// // import Select, { components } from 'react-select';
// // import { Pagination } from 'react-bootstrap';
// // import Swal from 'sweetalert2';
// // import {
// //     Card,
// //     CardBody,
// //     Container,
// //     Row,
// //     Col,
// //     Form,
// //     FormGroup,
// //     Modal,
// //     ModalHeader,
// //     ModalBody,
// //     Label,
// //     Input,
// //     Table,
// //     ModalFooter,
// //     CardTitle,
// // } from "reactstrap";
// // import DatePicker from "react-datepicker";
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faIdBadge, faChartGantt, faBold, faPrint, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faCalendarAlt, faAdd, faCancel, faXmark, faArrowDown, faPlus, faArrowUp, faEdit, faChevronUp, faChevronDown, faMagnifyingGlassChart, faProcedures, faSpinner, faArrowUpFromBracket, faUsersViewfinder, faBackward, faCross } from '@fortawesome/free-solid-svg-icons';
// // import '../assets/css/style.css';
// // import '../Components/Style.css';
// // import { Button } from "react-bootstrap";
// // import useAxios from '../Components/useAxios';
// // import { toast } from 'react-toastify';
// // import printformat1 from '../Images/printformat1.png';
// // import printformat2 from '../Images/printformat2.png';

// // export default function ARReceipts({ activeTab }) {
// //     const navigate = useNavigate();
// //     const { isAuthenticated } = useContext(AuthContext);
// //     const [loading, setLoading] = useState(false);
// //     const styles = {
// //         overlay: {
// //             position: 'fixed',
// //             top: 0,
// //             left: 0,
// //             width: '100%',
// //             height: '100%',
// //             backgroundColor: 'rgba(255, 255, 255, 0.8)',
// //             display: 'flex',
// //             justifyContent: 'center',
// //             alignItems: 'center',
// //             zIndex: 9999,
// //         },
// //         label: {
// //             backgroundColor: '#e3eefa',
// //             padding: '5px',
// //             borderRadius: '4px',
// //         }
// //     };

// //     // If the user is not authenticated, redirect to the login page
// //     useEffect(() => {
// //         if (!isAuthenticated) {

// //             navigate('/login?message=You need to be authenticated to access this page.');
// //         }
// //     }, [isAuthenticated, navigate]);

// //     const axios = useAxios();

// //     const {
// //         jwtToken,
// //         userId,
// //         username,
// //         branchId,
// //         companyid,
// //         role,
// //         companyname,
// //         branchname,
// //         login,
// //         logout,
// //         userType,
// //         tabMenus,
// //         userRights
// //     } = useContext(AuthContext);







// //     const processId = 'P01104';

// //     const foundRights = role !== 'ROLE_ADMIN' ? userRights.find(item => item.process_Id === processId) : null;
// //     const allowCreate = foundRights?.allow_Create === 'Y';
// //     const allowRead = foundRights?.allow_Read === 'Y';
// //     const allowEdit = foundRights?.allow_Update === 'Y';
// //     const allowDelete = foundRights?.allow_Delete === 'Y';

















// //     const [paymentMode, setPaymentMode] = useState([{
// //         payMode: '',
// //         chequeNo: '',
// //         chequeDate: null,
// //         bankDetails: '',
// //         amount: '',
// //         status: ''
// //     }])


// //     const addPaymentMode = () => {


// //         setPaymentMode([...paymentMode, {
// //             payMode: '',
// //             chequeNo: '',
// //             chequeDate: null,
// //             bankDetails: '',
// //             amount: '',
// //             status: ''
// //         }]);



// //     };

// //     const removePaymentMode = (index, amount) => {
// //         setPaymentMode((prevState) => prevState.filter((_, i) => i !== index));
// //     };


// //     const [finTrans, setFinTrans] = useState({
// //         companyId: "",
// //         branchId: "",
// //         docType: "",
// //         transId: "",
// //         transDate: new Date(),
// //         status: "",
// //         isOnAccPay: "N",
// //         createdBy: "",
// //         partyId: "",
// //         partyName: "",
// //         partyGst: "",
// //         partyAddress1: "",
// //         partyAddress2: "",
// //         partyAddress3: "",
// //         accSrNo: "",
// //         documentAmt: "",
// //         narration: "",
// //         advanceAmt: '',
// //         advanceClearedAmt: '',
// //         isReceiptCancel: 'N'
// //     })


// //     const [invoiceData, setInvoiceData] = useState([{
// //         invoiceNo: '',
// //         billingTo: '',
// //         billingParty: '',
// //         comments: '',
// //         importerId: '',
// //         importerSrNo: '',
// //         importerName: '',
// //         invoiceAmt: '',
// //         invoiceBalAmt: '',
// //         receiptAmt: '',
// //         tdsDeductee: '',
// //         tdsPercentage: '',
// //         tdsAmt: '',
// //         tdsStatus: '',
// //         localAmount: '',
// //         transId: ''
// //     }])


// //     const handleInvoiceChange = (e, index) => {
// //         const { name, value } = e.target;
// //         let sanitizeValue = value;

// //         if (name === 'receiptAmt') {
// //             sanitizeValue = handleInputChange(value, 13, 2)

// //             if (invoiceData[index].invoiceBalAmt < sanitizeValue) {
// //                 sanitizeValue = '';
// //             }
// //         }



// //         setInvoiceData((prevState) => {
// //             const updatedRows = [...prevState];
// //             updatedRows[index] = {
// //                 ...updatedRows[index],
// //                 [name]: sanitizeValue,
// //             };
// //             return updatedRows;
// //         });
// //     };

// //     const handleInvoiceChange1 = (e, index) => {
// //         const { name, value } = e.target;
// //         let sanitizeValue = value;

// //         if (name === 'receiptAmt') {
// //             sanitizeValue = handleInputChange(value, 13, 2);

// //             if (invoiceData[index].invoiceBalAmt < sanitizeValue) {
// //                 sanitizeValue = '';
// //             } else {
// //                 setPaymentMode((prevState) => {
// //                     const updatedPaymentModes = [...prevState];

// //                     // Find existing ADVANCE row
// //                     let advanceRow = updatedPaymentModes.find((row) => row.payMode === 'ADVANCE');

// //                     // Calculate total receiptAmt from invoiceData
// //                     let totalReceiptAmt = invoiceData.reduce((acc, curr, idx) =>
// //                         idx === index ? acc + parseFloat(sanitizeValue || 0) : acc + parseFloat(curr.receiptAmt || 0), 0
// //                     );

// //                     if (!advanceRow) {
// //                         // Check for an empty row
// //                         const emptyRow = updatedPaymentModes.find((row) => !row.payMode);
// //                         if (emptyRow) {
// //                             emptyRow.payMode = 'ADVANCE';
// //                             emptyRow.amount = totalReceiptAmt;
// //                         } else {
// //                             // Add a new ADVANCE row
// //                             updatedPaymentModes.push({
// //                                 payMode: 'ADVANCE',
// //                                 chequeNo: '',
// //                                 chequeDate: null,
// //                                 bankDetails: '',
// //                                 amount: totalReceiptAmt,
// //                                 status: '',
// //                             });
// //                         }
// //                     } else {
// //                         // Update existing ADVANCE row
// //                         advanceRow.amount = totalReceiptAmt;
// //                     }

// //                     return updatedPaymentModes;
// //                 });
// //             }
// //         }

// //         // Update invoiceData
// //         setInvoiceData((prevState) => {
// //             const updatedRows = [...prevState];
// //             updatedRows[index] = {
// //                 ...updatedRows[index],
// //                 [name]: sanitizeValue,
// //             };
// //             return updatedRows;
// //         });
// //     };




// //     const handleChange = (e) => {
// //         const { name, value, type, checked } = e.target;

// //         if (name === "docType") {
// //             if (finTrans.docType !== value) {
// //                 handleClear();
// //             }
// //         }

// //         setFinTrans((prevState) => ({
// //             ...prevState,
// //             [name]: type === "checkbox" ? (checked ? "Y" : "N") : value,
// //         }));
// //     };


// //     const [accData, setAccData] = useState([]);

// //     const getAccData = (val) => {
// //         if (!val) {
// //             setAccData([]);
// //             return;
// //         }

// //         axios.get(`${ipaddress}party/getAllWithAdd?cid=${companyid}&bid=${branchId}&val=${val}`, {
// //             headers: {
// //                 Authorization: `Bearer ${jwtToken}`
// //             }
// //         })
// //             .then((response) => {
// //                 const data = response.data;

// //                 const partyOptions = data.map(port => ({
// //                     value: port[0],
// //                     label: port[1] + ' - ' + port[2] + ' ' + port[3] + ' ' + port[4],
// //                     impName: port[1],
// //                     gst: port[6],
// //                     address1: port[2],
// //                     address2: port[3],
// //                     address3: port[4],
// //                     srNo: port[5],
// //                     state: port[7]
// //                 }))

// //                 setAccData(partyOptions);
// //             })
// //             .catch((error) => {
// //                 setAccData([]);
// //             })
// //     }


// //     const handleAccChange = async (selectedOption, { action }) => {

// //         if (action === 'clear') {

// //             setFinTrans((prev) => ({
// //                 ...prev,
// //                 partyId: "",
// //                 partyGst: "",
// //                 partyAddress1: "",
// //                 partyAddress2: "",
// //                 partyAddress3: "",
// //                 accSrNo: "",
// //             }));

// //             handleClear();
// //         }
// //         else {


// //             setFinTrans((prev) => ({
// //                 ...prev,
// //                 partyId: selectedOption.value,
// //                 partyName: selectedOption.impName,
// //                 partyGst: selectedOption.gst,
// //                 partyAddress1: selectedOption.address1,
// //                 partyAddress2: selectedOption.address2,
// //                 partyAddress3: selectedOption.address3,
// //                 accSrNo: selectedOption.srNo,
// //             }));

// //             getAdvanceData(selectedOption.value);
// //         }
// //     };


// //     const getAdvanceData = (id) => {
// //         axios.get(`${ipaddress}receipt/advanceReceiptBeforeSaveSearch`, {
// //             headers: {
// //                 Authorization: `Bearer ${jwtToken}`
// //             },
// //             params: {
// //                 cid: companyid,
// //                 bid: branchId,
// //                 id: id,
// //                 type: finTrans.docType
// //             }

// //         })

// //             .then((response) => {

// //                 const data = response.data;

// //                 console.log('data ', data);


// //                 if (finTrans.docType === "AD") {
// //                     setFinTrans((prev) => ({
// //                         ...prev,
// //                         advanceAmt: data[3] || '',
// //                         advanceClearedAmt: data[4] || ''
// //                     }));
// //                 }
// //                 if (finTrans.docType === "RE") {


// //                     if (data.length === 0) {
// //                         toast.error("Data not found", {
// //                             autoClose: 800
// //                         })

// //                         return;
// //                     }

// //                     setInvoiceData(data.map((item) => {
// //                         const invoiceAmt = parseFloat(item[23] || 0); // Ensure it's a number
// //                         const tdsPercentage = parseFloat(item[22] || 0); // Ensure it's a number
// //                         const tdsAmt = (invoiceAmt * tdsPercentage) / 100; // Calculate TDS Amount
// //                         const tdsStatus = item[19] || '';

// //                         return {
// //                             invoiceNo: item[0] || '',
// //                             billingTo: item[2] || '',
// //                             billingParty: item[5] || '',
// //                             comments: item[6] || '',
// //                             importerId: item[7] || '',
// //                             importerSrNo: item[8] || '',
// //                             importerName: item[9] || '',
// //                             invoiceAmt: item[10] || '',
// //                             invoiceBalAmt: item[11] || '',
// //                             receiptAmt: '',
// //                             tdsDeductee: item[21] || '',
// //                             tdsStatus: tdsStatus,
// //                             tdsPercentage: tdsStatus !== 'Y' ? tdsPercentage : 0,
// //                             tdsAmt: tdsStatus !== 'Y' ? tdsAmt.toFixed(2) : 0,
// //                             localAmount: item[23] || '',
// //                             transId: item[14] || '',

// //                         };



// //                     }));

// //                 }
// //                 if (finTrans.docType === "AJ") {


// //                     if (data.receipt.length === 0) {
// //                         toast.error("Data not found", {
// //                             autoClose: 800
// //                         })

// //                         return;
// //                     }

// //                     setFinTrans((prev) => ({
// //                         ...prev,
// //                         advanceAmt: data.advance[3] || '',
// //                         advanceClearedAmt: data.advance[4] || ''
// //                     }));

// //                     setInvoiceData(data.receipt.map((item) => {
// //                         // const invoiceAmt = parseFloat(item[23] || 0); // Ensure it's a number
// //                         // const tdsPercentage = parseFloat(item[22] || 0); // Ensure it's a number
// //                         // const tdsAmt = (invoiceAmt * tdsPercentage) / 100; // Calculate TDS Amount

// //                         const invoiceAmt = parseFloat(item[23] || 0); // Ensure it's a number
// //                         const tdsPercentage = parseFloat(item[22] || 0); // Ensure it's a number
// //                         const tdsAmt = (invoiceAmt * tdsPercentage) / 100; // Calculate TDS Amount
// //                         const tdsStatus = item[19] || '';



// //                         return {
// //                             invoiceNo: item[0] || '',
// //                             billingTo: item[2] || '',
// //                             billingParty: item[5] || '',
// //                             comments: item[6] || '',
// //                             importerId: item[7] || '',
// //                             importerSrNo: item[8] || '',
// //                             importerName: item[9] || '',
// //                             invoiceAmt: item[10] || '',
// //                             invoiceBalAmt: item[11] || '',
// //                             receiptAmt: '',
// //                             tdsDeductee: item[21] || '',
// //                             tdsStatus: tdsStatus,
// //                             tdsPercentage: tdsStatus !== 'Y' ? tdsPercentage : 0,
// //                             tdsAmt: tdsStatus !== 'Y' ? tdsAmt.toFixed(2) : 0,
// //                             localAmount: item[23] || '',
// //                             transId: item[14] || '',
// //                         };
// //                     }));

// //                 }
// //             })
// //             .catch((error) => {
// //                 if (finTrans.docType === "AD") {
// //                     setFinTrans((prev) => ({
// //                         ...prev,
// //                         advanceAmt: '0',
// //                         advanceClearedAmt: '0'
// //                     }));
// //                 }

// //                 toast.error(error.response.data, {
// //                     autoClose: 800
// //                 })

// //                 if (finTrans.docType === "RE") {
// //                     setInvoiceData(
// //                         [{
// //                             invoiceNo: '',
// //                             billingTo: '',
// //                             billingParty: '',
// //                             comments: '',
// //                             importerId: '',
// //                             importerSrNo: '',
// //                             importerName: '',
// //                             invoiceAmt: '',
// //                             invoiceBalAmt: '',
// //                             receiptAmt: '',
// //                             tdsDeductee: '',
// //                             tdsPercentage: '',
// //                             tdsAmt: '',
// //                             tdsStatus: '',
// //                             localAmount: '',
// //                             transId: ''
// //                         }]
// //                     )
// //                 }
// //             })
// //     }

// //     const handleClear = () => {
// //         setFinTrans({
// //             companyId: "",
// //             branchId: "",
// //             docType: "",
// //             transId: "",
// //             transDate: new Date(),
// //             status: "",
// //             isOnAccPay: "N",
// //             createdBy: "",
// //             partyId: "",
// //             partyName: "",
// //             partyGst: "",
// //             partyAddress1: "",
// //             partyAddress2: "",
// //             partyAddress3: "",
// //             accSrNo: "",
// //             documentAmt: "",
// //             narration: "",
// //             advanceAmt: '',
// //             advanceClearedAmt: '',
// //             isReceiptCancel: '',
// //         })

// //         setPaymentMode([
// //             {
// //                 payMode: '',
// //                 chequeNo: '',
// //                 chequeDate: null,
// //                 bankDetails: '',
// //                 amount: '',
// //                 status: ''
// //             }
// //         ])

// //         setInvoiceData([{
// //             invoiceNo: '',
// //             billingTo: '',
// //             billingParty: '',
// //             comments: '',
// //             importerId: '',
// //             importerSrNo: '',
// //             importerName: '',
// //             invoiceAmt: '',
// //             invoiceBalAmt: '',
// //             receiptAmt: '',
// //             tdsDeductee: '',
// //             tdsPercentage: '',
// //             tdsAmt: '',
// //             tdsStatus: '',
// //             localAmount: '',
// //             transId: ''
// //         }])
// //     }


// //     function handleInputChange(e, val1, val2) {
// //         const inputValue = e.toString(); // Convert e to string
// //         const numericInput = inputValue.replace(/[^0-9.]/g, ''); // Remove non-numeric characters
// //         const parts = numericInput.split('.'); // Split on decimal point
// //         const integerPart = parts[0].slice(0, val1); // Limit integer part to val1 digits

// //         let decimalPart = parts[1]; // Get decimal part

// //         // If val2 is 0, do not allow any decimal point
// //         if (val2 === 0) {
// //             return integerPart; // Return only the integer part
// //         }

// //         // Limit decimal places if val2 > 0
// //         if (decimalPart !== undefined) {
// //             decimalPart = `.${decimalPart.slice(0, val2)}`; // Limit decimal part to val2 digits
// //         }

// //         // Combine integer and decimal parts
// //         const sanitizedInput = decimalPart !== undefined ? `${integerPart}${decimalPart}` : integerPart;
// //         return sanitizedInput; // Return sanitized input
// //     }


// //     const handlePaymentModeChange = (e, index) => {
// //         const { name, value } = e.target;
// //         let sanitizeValue = value;

// //         if (name === 'amount') {
// //             sanitizeValue = handleInputChange(value, 13, 2)
// //         }



// //         setPaymentMode((prevState) => {
// //             const updatedRows = [...prevState];
// //             updatedRows[index] = {
// //                 ...updatedRows[index],
// //                 [name]: sanitizeValue,
// //             };
// //             return updatedRows;
// //         });
// //     };


// //     const handlePaymentModeChange1 = (e, index) => {
// //         const { name, value } = e.target;
// //         let sanitizeValue = value;
// //         if (name === 'payMode' && value === 'TDS') {


// // console.log('invoiceData', invoiceData);
// //             let tdsInvoice = invoiceData.filter(
// //                 (item) =>
// //                     item.invoiceNo !== '' &&
// //                     item.tdsStatus !== '' &&
// //                     item.tdsStatus === 'N' &&
// //                     item.tdsAmt !== '' &&
// //                     item.tdsAmt > 0 && item.receiptAmt > 0
// //             );

// //             const totalTdsAmt = tdsInvoice.reduce(
// //                 (total, item) => total + (parseFloat(item.tdsAmt) || 0),
// //                 0
// //             ).toFixed(2);

// //             console.log('tdsInvoice', tdsInvoice);

// //             setPaymentMode((prevState) => {
// //                 const updatedRows = [...prevState];

// //                 // Update the TDS row
// //                 updatedRows[index] = {
// //                     ...updatedRows[index],
// //                     amount: totalTdsAmt,
// //                 };

// //                 // Find the ADVANCE row and subtract totalTdsAmt from its amount
// //                 const advanceRow = updatedRows.find((row) => row.payMode === 'ADVANCE');
// //                 if (advanceRow) {
// //                     const currentAdvanceAmt = parseFloat(advanceRow.amount || 0);
// //                     advanceRow.amount = (currentAdvanceAmt - parseFloat(totalTdsAmt)).toFixed(2);
// //                 }

// //                 return updatedRows;
// //             });
// //         }


// //         const filteredPaymentModes = paymentMode.find((item, i) => i === index);

// //         if (name === 'amount' && filteredPaymentModes.payMode !== 'TDS') {
// //             // Sanitize the input value
// //             const sanitizedInput = handleInputChange(value, 13, 2);

// //             // Calculate the total invoice amount
// //             const totalAmt = invoiceData
// //                 .reduce((total, item) => total + (parseFloat(item.receiptAmt) || 0), 0)
// //                 .toFixed(2);

// //             // Filter payment modes excluding 'TDS' and the current index
// //             const filteredPaymentModes = paymentMode.filter((item, i) => item.payMode !== 'TDS' && i !== index);

// //             // Calculate the total amount excluding the current item and 'TDS'
// //             const currentTotal = filteredPaymentModes
// //                 .reduce((total, item) => total + (parseFloat(item.amount) || 0), 0)
// //                 .toFixed(2);

// //             // Calculate the remaining amount that can be allocated
// //             const remainingAmt = parseFloat(totalAmt) - parseFloat(currentTotal);

// //             // Ensure the new value does not exceed the remaining amount
// //             if (parseFloat(sanitizedInput || 0) > remainingAmt) {
// //                 sanitizeValue = ''; // Reject the value if it exceeds the remaining amount
// //             } else {
// //                 sanitizeValue = sanitizedInput; // Accept the value if valid
// //             }
// //         }


// //         setPaymentMode((prevState) => {
// //             const updatedRows = [...prevState];
// //             updatedRows[index] = {
// //                 ...updatedRows[index],
// //                 [name]: sanitizeValue,
// //             };
// //             return updatedRows;
// //         });
// //     };




// //     const handleSave = () => {

// //         if (!finTrans.docType) {
// //             toast.error("Trans type is required.", {
// //                 autoClose: 800
// //             })
// //             return;
// //         }


// //         if (!finTrans.partyId) {
// //             toast.error("Party id is required.", {
// //                 autoClose: 800
// //             })
// //             return;
// //         }

// //         if (paymentMode.length === 0) {
// //             toast.error("Atleast one payment mode is required.", {
// //                 autoClose: 800
// //             })
// //             return;
// //         }

// //         for (let i = 0; i < paymentMode.length; i++) {
// //             const { chequeNo, chequeDate, amount, payMode } = paymentMode[i];



// //             // Check if chequeNo and chequeDate are missing for modes other than CASH and TDS
// //             if ((!chequeNo || !chequeDate) && payMode !== 'CASH' && payMode !== 'TDS') {
// //                 toast.error(`Error: Cheque details are missing for payment mode entry ${i + 1}.`, {
// //                     autoClose: 800,
// //                 });
// //                 return; // Stop the process if validation fails
// //             }


// //             if (!amount) {
// //                 toast.error(`Error: Amount is required for payment mode entry ${i + 1}.`, {
// //                     autoClose: 800,
// //                 });
// //                 return; // Stop the process if validation fails
// //             }
// //         }


// //         setLoading(true);

// //         finTrans.documentAmt = paymentMode.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0).toFixed(2);
// //         const formData = {
// //             finTransData: finTrans,
// //             paymentDto: paymentMode
// //         }


// //         axios.post(`${ipaddress}receipt/saveAdvanceReceipt`, formData, {
// //             headers: {
// //                 Authorization: `Bearer ${jwtToken}`
// //             },
// //             params: {
// //                 cid: companyid,
// //                 bid: branchId,
// //                 user: userId
// //             }
// //         })
// //             .then((response) => {
// //                 setLoading(false);
// //                 const data = response.data;
// //                 console.log('data ', data);

// //                 const singleData = data.finTransData[0];
// //                 const balData = data.bal;

// //                 setFinTrans({
// //                     companyId: "",
// //                     branchId: "",
// //                     docType: singleData[1] || "",
// //                     transId: singleData[0] || "",
// //                     transDate: singleData[2] === null ? null : new Date(singleData[2]),
// //                     status: singleData[4] || "",
// //                     isOnAccPay: "N",
// //                     createdBy: singleData[5] || "",
// //                     partyId: singleData[6] || "",
// //                     partyName: singleData[7] || "",
// //                     partyGst: singleData[9] || "",
// //                     partyAddress1: singleData[10] || "",
// //                     partyAddress2: singleData[11] || "",
// //                     partyAddress3: singleData[12] || "",
// //                     accSrNo: singleData[8] || "",
// //                     documentAmt: singleData[3] || "",
// //                     narration: singleData[13] || "",
// //                     advanceAmt: balData[3] || "0",
// //                     advanceClearedAmt: balData[4] || "0",
// //                     isReceiptCancel: singleData[19] || "",
// //                 })


// //                 setPaymentMode(data.finTransData.map((item) => (
// //                     {
// //                         payMode: item[14] || '',
// //                         chequeNo: item[15] || '',
// //                         chequeDate: item[16] === null ? null : new Date(item[16]),
// //                         bankDetails: item[17] || '',
// //                         amount: item[18] || '',
// //                         status: item[4] || '',
// //                     }
// //                 )))


// //                 toast.success("Data save successfully!!", {
// //                     autoClose: 800
// //                 })
// //             })
// //             .catch((error) => {
// //                 toast.error(error.response.data, {
// //                     autoClose: 800
// //                 })
// //                 setLoading(false);
// //             })
// //     }



// //     const handleSave1 = () => {

// //         if (!finTrans.docType) {
// //             toast.error("Trans type is required.", {
// //                 autoClose: 800
// //             })
// //             return;
// //         }


// //         if (!finTrans.partyId) {
// //             toast.error("Party id is required.", {
// //                 autoClose: 800
// //             })
// //             return;
// //         }

// //         let invData = invoiceData.filter(item => (item.invoiceNo !== '' && (item.receiptAmt !== '' && item.receiptAmt > 0)))

// //         const totalTdsAmt = invData.reduce((total, item) => total + (parseFloat(item.tdsAmt) || 0), 0).toFixed(2);

// //         if (invData.length === 0) {
// //             toast.error("Please enter receipt amount.", {
// //                 autoClose: 800
// //             })
// //             return;
// //         }

// //         if (paymentMode.length === 0) {
// //             toast.error("Atleast one payment mode is required.", {
// //                 autoClose: 800
// //             })
// //             return;
// //         }

// //         for (let i = 0; i < paymentMode.length; i++) {
// //             const { chequeNo, chequeDate, amount, payMode } = paymentMode[i];



// //             // Check if chequeNo and chequeDate are missing for modes other than CASH and TDS
// //             if ((!chequeNo || !chequeDate) && payMode !== 'CASH' && payMode !== 'TDS' && payMode !== 'ADVANCE') {
// //                 toast.error(`Error: Cheque details are missing for payment mode entry ${i + 1}.`, {
// //                     autoClose: 800,
// //                 });
// //                 return; // Stop the process if validation fails
// //             }


// //             if (!amount) {
// //                 toast.error(`Error: Amount is required for payment mode entry ${i + 1}.`, {
// //                     autoClose: 800,
// //                 });
// //                 return; // Stop the process if validation fails
// //             }
// //         }

// //         let tdsData = paymentMode.filter(item => item.payMode === 'TDS' && item.amount > 0)
// //         let receiptAmt = invData.reduce((total, item) => total + (parseFloat(item.receiptAmt) || 0), 0).toFixed(2);
// //         let paymentAmt = paymentMode.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0).toFixed(2);

// //         if (finTrans.docType === 'AJ') {
// //             let wtTdsData = paymentMode.filter(item => item.payMode === 'ADVANCE' && item.amount > 0)

// //             let paymentAmtWtTds = wtTdsData.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0).toFixed(2);


// //             if (finTrans.advanceClearedAmt < paymentAmtWtTds) {
// //                 toast.error(`The advance amount exceeds the balance for the cleared amount. Please add the advance first.`, {
// //                     autoClose: 800,
// //                 });
// //                 return; // Stop the process if validation failsF
// //             }
// //         }

// //         if (tdsData.length > 0) {
// //             const paymentTdsAmt = tdsData.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0).toFixed(2);


// //             if (paymentTdsAmt !== totalTdsAmt) {
// //                 toast.error(`The TDS amount entered is incorrect. The correct TDS amount is ${totalTdsAmt}. Please update it accordingly.`, {
// //                     autoClose: 800,
// //                 });
// //                 return; // Halt the process if the validation fails
// //             }

// //             if (receiptAmt !== paymentAmt) {
// //                 toast.error(`Total Receipt Amt and Total Invoice Amt Should be Equal`, {
// //                     autoClose: 800,
// //                 });
// //                 return; // Stop the process if validation fails
// //             }

// //         }
// //         else {
// //             if (receiptAmt !== paymentAmt) {
// //                 toast.error(`Total Receipt Amt and Total Invoice Amt Should be Equal`, {
// //                     autoClose: 800,
// //                 });
// //                 return; // Stop the process if validation fails
// //             }
// //         }





// //         setLoading(true);

// //         finTrans.documentAmt = paymentMode.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0).toFixed(2);
// //         const formData = {
// //             finTransData: finTrans,
// //             invoiceDto: invData,
// //             paymentDto: paymentMode
// //         }


// //         axios.post(`${ipaddress}receipt/saveReceipt`, formData, {
// //             headers: {
// //                 Authorization: `Bearer ${jwtToken}`
// //             },
// //             params: {
// //                 cid: companyid,
// //                 bid: branchId,
// //                 user: userId,
// //                 type: finTrans.docType
// //             }
// //         })
// //             .then((response) => {
// //                 setLoading(false);
// //                 const data = response.data;
// //                 console.log('data ', data, " ", data.advance);

// //                 const singleData = data.finTransData[0];
// //                 const advanceData = (data.advance === null || data.advance === undefined) ? null : data.advance;

// //                 setFinTrans({
// //                     companyId: "",
// //                     branchId: "",
// //                     docType: singleData[1] || "",
// //                     transId: singleData[0] || "",
// //                     transDate: singleData[2] === null ? null : new Date(singleData[2]),
// //                     status: singleData[4] || "",
// //                     isOnAccPay: "N",
// //                     createdBy: singleData[5] || "",
// //                     partyId: singleData[6] || "",
// //                     partyName: singleData[7] || "",
// //                     partyGst: singleData[9] || "",
// //                     partyAddress1: singleData[10] || "",
// //                     partyAddress2: singleData[11] || "",
// //                     partyAddress3: singleData[12] || "",
// //                     accSrNo: singleData[8] || "",
// //                     documentAmt: singleData[3] || "",
// //                     narration: singleData[13] || "",
// //                     advanceAmt: advanceData === null ? "0" : advanceData[3] || "0",
// //                     advanceClearedAmt: advanceData === null ? "0" : advanceData[4] || "0",
// //                     isReceiptCancel: singleData[19] || "",
// //                 })


// //                 setPaymentMode(data.finTransData.map((item) => (
// //                     {
// //                         payMode: item[14] || '',
// //                         chequeNo: item[15] || '',
// //                         chequeDate: item[16] === null ? null : new Date(item[16]),
// //                         bankDetails: item[17] || '',
// //                         amount: item[18] || '',
// //                         status: item[4] || '',
// //                     }
// //                 )))

// //                 setInvoiceData(data.finTransInvData.map((item) => (
// //                     {
// //                         invoiceNo: item[0] || '',
// //                         billingTo: item[2] || '',
// //                         billingParty: item[3] || '',
// //                         comments: item[4] || '',
// //                         importerId: item[5] || '',
// //                         importerSrNo: '',
// //                         importerName: item[6] || '',
// //                         invoiceAmt: item[7] || '',
// //                         invoiceBalAmt: item[8] || '',
// //                         receiptAmt: item[9] || '',
// //                         tdsDeductee: '',
// //                         tdsAmt: '',
// //                         tdsStatus: '',
// //                         localAmount: ''
// //                     }
// //                 )))

// //                 toast.success("Data save successfully!!", {
// //                     autoClose: 800
// //                 })
// //             })
// //             .catch((error) => {
// //                 console.log('error ', error);

// //                 toast.error(error.response.data, {
// //                     autoClose: 800
// //                 })
// //                 setLoading(false);
// //             })
// //     }



// //     const [isModalOpenForSearchGateInData, setIsModalOpenForGateInData] = useState(false);
// //     const [searchId, setSearchId] = useState('');
// //     const [gateInSearchData, setGateInSearchData] = useState([]);

// //     const openGateInModal = () => {
// //         setIsModalOpenForGateInData(true);
// //         searchExportEmptyContainerGateIn('');
// //         setSearchId('');
// //     }

// //     const closeGateInModal = () => {
// //         setIsModalOpenForGateInData(false);
// //         setSearchId('');
// //         setGateInSearchData([]);
// //     }

// //     const searchExportEmptyContainerGateIn = (id) => {
// //         setLoading(true);
// //         axios.get(`${ipaddress}receipt/getAfterSaveData?cid=${companyid}&bid=${branchId}&val=${id}`, {
// //             headers: {
// //                 Authorization: `Bearer ${jwtToken}`
// //             }
// //         })
// //             .then((response) => {
// //                 setGateInSearchData(response.data);
// //                 setLoading(false);
// //                 toast.success("Data found successfully!!", {
// //                     autoClose: 800
// //                 })
// //             })
// //             .catch((error) => {
// //                 setGateInSearchData([]);
// //                 setLoading(false);
// //                 toast.error(error.response.data, {
// //                     autoClose: 800
// //                 })
// //             })
// //     }

// //     const handleSearchClear = () => {
// //         searchExportEmptyContainerGateIn('');
// //         setSearchId('');
// //     }

// //     const [currentPage, setCurrentPage] = useState(1);
// //     const [itemsPerPage] = useState(5);

// //     const indexOfLastItem = currentPage * itemsPerPage;
// //     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //     const currentItems = gateInSearchData.slice(indexOfFirstItem, indexOfLastItem);
// //     const totalPages = Math.ceil(gateInSearchData.length / itemsPerPage);

// //     // Function to handle page change
// //     const handlePageChange = (page) => {
// //         if (page >= 1 && page <= totalPages) {
// //             setCurrentPage(page);
// //         }
// //     };
// //     const displayPages = () => {
// //         const centerPageCount = 5;
// //         const middlePage = Math.floor(centerPageCount / 2);
// //         let startPage = currentPage - middlePage;
// //         let endPage = currentPage + middlePage;

// //         if (startPage < 1) {
// //             startPage = 1;
// //             endPage = Math.min(totalPages, centerPageCount);
// //         }

// //         if (endPage > totalPages) {
// //             endPage = totalPages;
// //             startPage = Math.max(1, totalPages - centerPageCount + 1);
// //         }

// //         return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
// //     };


// //     const getSelectedReceiptData = (val, id, type) => {
// //         axios.get(`${ipaddress}receipt/getReceiptSelectedData?cid=${companyid}&bid=${branchId}&val=${val}&id=${id}&type=${type}`, {
// //             headers: {
// //                 Authorization: `Bearer ${jwtToken}`
// //             }
// //         })
// //             .then((response) => {
// //                 setLoading(false);
// //                 const data = response.data;

// //                 const singleData = data.finTransData[0];
// //                 const advanceData = data.advance;

// //                 setFinTrans({
// //                     companyId: "",
// //                     branchId: "",
// //                     docType: singleData[1] || "",
// //                     transId: singleData[0] || "",
// //                     transDate: singleData[2] === null ? null : new Date(singleData[2]),
// //                     status: singleData[4] || "",
// //                     isOnAccPay: "N",
// //                     createdBy: singleData[5] || "",
// //                     partyId: singleData[6] || "",
// //                     partyName: singleData[7] || "",
// //                     partyGst: singleData[9] || "",
// //                     partyAddress1: singleData[10] || "",
// //                     partyAddress2: singleData[11] || "",
// //                     partyAddress3: singleData[12] || "",
// //                     accSrNo: singleData[8] || "",
// //                     documentAmt: singleData[3] || "",
// //                     narration: singleData[13] || "",
// //                     advanceAmt: advanceData === null ? "0" : advanceData[3] || "0",
// //                     advanceClearedAmt: advanceData === null ? "0" : advanceData[4] || "0",
// //                     isReceiptCancel: singleData[19] || "",
// //                 })


// //                 setPaymentMode(data.finTransData.map((item) => (
// //                     {
// //                         payMode: item[14] || '',
// //                         chequeNo: item[15] || '',
// //                         chequeDate: item[16] === null ? null : new Date(item[16]),
// //                         bankDetails: item[17] || '',
// //                         amount: item[18] || '',
// //                         status: item[4] || '',
// //                     }
// //                 )))

// //                 if (data.finTransInvData.length > 0) {
// //                     setInvoiceData(data.finTransInvData.map((item) => (
// //                         {
// //                             invoiceNo: item[0] || '',
// //                             billingTo: item[2] || '',
// //                             billingParty: item[3] || '',
// //                             comments: item[4] || '',
// //                             importerId: item[5] || '',
// //                             importerSrNo: '',
// //                             importerName: item[6] || '',
// //                             invoiceAmt: item[7] || '',
// //                             invoiceBalAmt: item[8] || '',
// //                             receiptAmt: item[9] || '',
// //                             tdsDeductee: '',
// //                             tdsAmt: '',
// //                             tdsStatus: '',
// //                             localAmount: ''
// //                         }
// //                     )))
// //                 }



// //                 toast.success("Data found successfully!!", {
// //                     autoClose: 800
// //                 })

// //                 closeGateInModal();
// //             })
// //             .catch((error) => {
// //                 toast.error(error.response.data, {
// //                     autoClose: 800
// //                 })
// //             })
// //     }

// //     const [showModalforPrintReciept, setShowModalforPrintReciept] = useState(false);
// //     const handleCloseModalPrint = () => {

// //         setShowModalforPrintReciept(false);
// //     };
// //     const handleModelOPenForPrintReciept = () => {
// //         setShowModalforPrintReciept(true);

// //     }


// //     const handlePrint1 = async (type) => {
// //         setLoading(true);
// //         console.log("inside the print")

// //         // finTrans.transId
// //         console.log("finTrans.transId", finTrans.transId);
// //         console.log("finTrans.transId", finTrans.docType);
// //         const transId = finTrans.transId;
// //         const docType = finTrans.docType;

// //         axios.post(`${ipaddress}receiptprint/advreceipt/${companyid}/${branchId}/${transId}/${docType}`, {}, {
// //             headers: {

// //                 Authorization: `Bearer ${jwtToken}`,
// //                 "Content-Type": "application/json",
// //             }
// //         })
// //             .then(response => {
// //                 // console.log('Response:', response.data); // Handle success
// //                 const pdfBase64 = response.data;
// //                 const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
// //                 const blobUrl = URL.createObjectURL(pdfBlob);
// //                 window.open(blobUrl, '_blank');
// //                 setLoading(false);


// //             })
// //             .catch(error => {
// //                 console.error('Error in handlePrint:', error.message);
// //                 setLoading(false);
// //                 //   Handle the error as needed, e.g., show an error toast or message
// //                 // toast.error(`Error: ${error.message}`, {
// //                 //       //     position: toast.POSITION.TOP_CENTER,
// //                 //       //     autoClose: 2000,
// //                 //       // });
// //                 //     }
// //             });


// //     }



// //     console.log('FintransData : \n', finTrans);


// //     const handleCancelReciept = async (transId, narration, docType, partyId) => {
// // console.log('transId, narration, docType, partyId ', transId, narration, docType, partyId);


// //         Swal.fire({
// //             title: "Are you sure?",
// //             text: "You want to cancel the receipt!",
// //             icon: "warning",
// //             showCancelButton: true,
// //             confirmButtonColor: "#3085d6",
// //             cancelButtonColor: "#d33",
// //             confirmButtonText: "Yes, cancel it!"
// //         }).then(async (result) => {
// //             if (result.isConfirmed) {
// //                 setLoading(true);
// //                 try {
// //                     const response = await axios.get(`${ipaddress}receipt/receiptCancel`, {
// //                         params: {
// //                             companyId: companyid,
// //                             branchId,
// //                             transId,
// //                             userId, narration, docType
// //                         }
// //                     });

// //                     console.log('handleCancelReciept : ', response.data);

// //                     Swal.fire({
// //                         title: "Cancelled!",
// //                         text: "The receipt has been cancelled.",
// //                         icon: "success"
// //                     });
// //                     getSelectedReceiptData(transId, partyId, docType);
// //                 } catch (error) {
// //                     Swal.fire({
// //                         icon: "error",
// //                         title: "Oops...",
// //                         text: "Something went wrong while cancelling the receipt!"
// //                     });
// //                     console.error("Error in handleCancelReciept:", error);
// //                 } finally {
// //                     setLoading(false);
// //                 }
// //             }
// //         });
// //     };










// //     return (
// //         <div>
// //             {loading && (
// //                 <div style={styles.overlay}>
// //                     <div className="loader">
// //                         <div className="truckWrapper">
// //                             <div className="truckBody">
// //                                 <svg
// //                                     xmlns="http://www.w3.org/2000/svg"
// //                                     fill="none"
// //                                     viewBox="0 0 198 93"
// //                                     className="trucksvg"
// //                                 >
// //                                     <path
// //                                         strokeWidth="3"
// //                                         stroke="#282828"
// //                                         fill="#F83D3D"
// //                                         d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
// //                                     ></path>
// //                                     <path
// //                                         strokeWidth="3"
// //                                         stroke="#282828"
// //                                         fill="#7D7C7C"
// //                                         d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
// //                                     ></path>
// //                                     <path
// //                                         strokeWidth="2"
// //                                         stroke="#282828"
// //                                         fill="#282828"
// //                                         d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"
// //                                     ></path>
// //                                     <rect
// //                                         strokeWidth="2"
// //                                         stroke="#282828"
// //                                         fill="#FFFCAB"
// //                                         rx="1"
// //                                         height="7"
// //                                         width="5"
// //                                         y="63"
// //                                         x="187"
// //                                     ></rect>
// //                                     <rect
// //                                         strokeWidth="2"
// //                                         stroke="#282828"
// //                                         fill="#282828"
// //                                         rx="1"
// //                                         height="11"
// //                                         width="4"
// //                                         y="81"
// //                                         x="193"
// //                                     ></rect>
// //                                     <rect
// //                                         strokeWidth="3"
// //                                         stroke="#282828"
// //                                         fill="#DFDFDF"
// //                                         rx="2.5"
// //                                         height="90"
// //                                         width="121"
// //                                         y="1.5"
// //                                         x="6.5"
// //                                     ></rect>
// //                                     <rect
// //                                         strokeWidth="2"
// //                                         stroke="#282828"
// //                                         fill="#DFDFDF"
// //                                         rx="2"
// //                                         height="4"
// //                                         width="6"
// //                                         y="84"
// //                                         x="1"
// //                                     ></rect>
// //                                 </svg>
// //                             </div>
// //                             <div className="truckTires">
// //                                 <svg
// //                                     xmlns="http://www.w3.org/2000/svg"
// //                                     fill="none"
// //                                     viewBox="0 0 30 30"
// //                                     className="tiresvg"
// //                                 >
// //                                     <circle
// //                                         strokeWidth="3"
// //                                         stroke="#282828"
// //                                         fill="#282828"
// //                                         r="13.5"
// //                                         cy="15"
// //                                         cx="15"
// //                                     ></circle>
// //                                     <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
// //                                 </svg>
// //                                 <svg
// //                                     xmlns="http://www.w3.org/2000/svg"
// //                                     fill="none"
// //                                     viewBox="0 0 30 30"
// //                                     className="tiresvg"
// //                                 >
// //                                     <circle
// //                                         strokeWidth="3"
// //                                         stroke="#282828"
// //                                         fill="#282828"
// //                                         r="13.5"
// //                                         cy="15"
// //                                         cx="15"
// //                                     ></circle>
// //                                     <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
// //                                 </svg>
// //                             </div>
// //                             <div className="road"></div>
// //                             <svg
// //                                 xmlSpace="preserve"
// //                                 viewBox="0 0 453.459 453.459"
// //                                 xmlnsXlink="http://www.w3.org/1999/xlink"
// //                                 xmlns="http://www.w3.org/2000/svg"
// //                                 id="Capa_1"
// //                                 version="1.1"
// //                                 fill="#000000"
// //                                 className="lampPost"
// //                             >
// //                                 <path
// //                                     d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993
// //             c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514
// //             c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16
// //             c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914
// //             h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75
// //             v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795
// //             V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0z
// //             M232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017
// //             h78.747C231.693,100.736,232.77,106.162,232.77,111.694z"
// //                                 ></path>
// //                             </svg>
// //                         </div>
// //                     </div>
// //                 </div>
// //             )}

// //             <Modal
// //                 isOpen={showModalforPrintReciept}
// //                 toggle={handleCloseModalPrint}
// //                 style={{ maxWidth: 600 }}
// //             >
// //                 <ModalHeader
// //                     toggle={handleCloseModalPrint}
// //                     style={{
// //                         backgroundColor: "#80cbc4",
// //                         color: "black",
// //                         fontFamily: "Your-Heading-Font",
// //                         textAlign: "center",
// //                         background: "#26a69a",
// //                         boxShadow: "0px 5px 10px rgba(0, 77, 64, 0.3)",
// //                         border: "1px solid rgba(0, 0, 0, 0.3)",
// //                         borderRadius: "0",
// //                         backgroundColor: "#85144b",
// //                         backgroundColor: "rgba(0, 0, 0, 0.3)",
// //                         backgroundImage:
// //                             'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
// //                         backgroundSize: "cover",
// //                         backgroundRepeat: "no-repeat",
// //                         //backgroundPosition: 'center',
// //                         backgroundPosition: "center",
// //                     }}
// //                 >
// //                     {/* <FontAwesomeIcon icon="fa-solid fa-truck-arrow-right" style={{ marginRight: '9px' }}/> */}
// //                     <FontAwesomeIcon icon={faArrowUpFromBracket}
// //                         style={{ marginRight: "9px" }}
// //                     />
// //                     View Receipt
// //                 </ModalHeader>
// //                 <ModalBody
// //                     style={{
// //                         backgroundImage:
// //                             "url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)",
// //                         backgroundSize: "cover",
// //                     }}
// //                 >


// //                     <Form>

// //                         {/* Example form fields for the modal */}
// //                         <Row>
// //                             <Col md={6}>
// //                                 <Card
// //                                     style={{
// //                                         width: '95%'
// //                                     }}
// //                                 >
// //                                     <img
// //                                         alt="Sample"
// //                                         style={{ width: '100%', height: '300px', objectFit: 'contain' }}
// //                                         src={printformat1}

// //                                     />
// //                                     <CardBody>
// //                                         <CardTitle tag="h5">
// //                                             Receipt Format 1
// //                                         </CardTitle>
// //                                         {/* <CardSubtitle
// //                       className="mb-2 text-muted"
// //                       tag="h6"
// //                     >
// //                       Set Default
// //                       <Input type="radio" name="radio1" style={{ marginLeft: "10px" }} />

// //                     </CardSubtitle> */}

// //                                         <Button color="primary" outline
// //                                         // onClick={() => handlePrint("PRINT")}
// //                                         >
// //                                             <FontAwesomeIcon
// //                                                 icon={faUsersViewfinder}
// //                                                 style={{ marginRight: "5px" }}
// //                                             />
// //                                             View
// //                                         </Button>

// //                                     </CardBody>
// //                                 </Card>
// //                             </Col>

// //                             <Col md={6}>
// //                                 <Card
// //                                     style={{
// //                                         width: '95%'
// //                                     }}
// //                                 >
// //                                     <img
// //                                         alt="Sample"
// //                                         style={{ width: '100%', height: '300px', objectFit: 'contain' }}
// //                                         src={printformat2}

// //                                     />
// //                                     <CardBody>
// //                                         <CardTitle tag="h5">
// //                                             Receipt  Format 2
// //                                         </CardTitle>
// //                                         {/* <CardSubtitle
// //                       className="mb-2 text-muted"
// //                       tag="h6"
// //                     >
// //                       Set Default
// //                       <Input type="radio" name="radio1" style={{ marginLeft: "10px" }} />
// //                     </CardSubtitle> */}

// //                                         <Button color="primary" outline
// //                                             onClick={() => handlePrint1("PRINT")}
// //                                         >
// //                                             <FontAwesomeIcon
// //                                                 icon={faUsersViewfinder}
// //                                                 style={{ marginRight: "5px" }}
// //                                             />
// //                                             View
// //                                         </Button>
// //                                     </CardBody>
// //                                 </Card>
// //                             </Col>

// //                         </Row>



// //                         {/* Add more form fields as needed */}
// //                     </Form>
// //                 </ModalBody>
// //                 <ModalFooter
// //                     style={{
// //                         backgroundImage:
// //                             "url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)",
// //                         backgroundSize: "cover",
// //                         display: "flex",
// //                         justifyContent: "center",

// //                     }}
// //                 >

// //                     <div className="d-flex justify-content-center">
// //                         <Button color="danger" outline onClick={handleCloseModalPrint}>
// //                             <FontAwesomeIcon
// //                                 icon={faBackward}
// //                                 style={{ marginRight: "5px" }}
// //                             />
// //                             Back
// //                         </Button>

// //                     </div>
// //                 </ModalFooter>
// //             </Modal>


// //             <Modal Modal isOpen={isModalOpenForSearchGateInData} onClose={closeGateInModal} toggle={closeGateInModal} style={{ maxWidth: '1200px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

// //                 <ModalHeader toggle={closeGateInModal} style={{
// //                     backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
// //                     boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
// //                     border: '1px solid rgba(0, 0, 0, 0.3)',
// //                     borderRadius: '0',
// //                     backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
// //                     backgroundSize: 'cover',
// //                     backgroundRepeat: 'no-repeat',
// //                     //backgroundPosition: 'center',
// //                     backgroundPosition: 'center',
// //                 }} >


// //                     <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', color: 'white' }} > <FontAwesomeIcon
// //                         icon={faSearch}
// //                         style={{
// //                             marginRight: '8px',
// //                             color: 'white', // Set the color to golden
// //                         }}
// //                     /> Search Receipt Data</h5>



// //                 </ModalHeader>
// //                 <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
// //                     <Row>
// //                         <Col md={5}>
// //                             <FormGroup>
// //                                 <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                                     Search by DOC Type / DOC No / Party Name
// //                                 </label>
// //                                 <input
// //                                     className="form-control"
// //                                     type="text"
// //                                     id="searchId"
// //                                     name='searchId'
// //                                     value={searchId}
// //                                     onChange={(e) => setSearchId(e.target.value)}
// //                                 />

// //                             </FormGroup>
// //                         </Col>
// //                         <Col md={4} style={{ marginTop: 20 }}>
// //                             <button
// //                                 className="btn btn-outline-primary btn-margin newButton"
// //                                 style={{ marginRight: 10, fontSize: 12 }}
// //                                 id="submitbtn2"
// //                                 onClick={() => searchExportEmptyContainerGateIn(searchId)}

// //                             >
// //                                 <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
// //                                 Search
// //                             </button>
// //                             <button
// //                                 className="btn btn-outline-danger btn-margin newButton"
// //                                 style={{ marginRight: 10, fontSize: 12 }}
// //                                 id="submitbtn2"
// //                                 onClick={handleSearchClear}
// //                             >
// //                                 <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
// //                                 Reset
// //                             </button>
// //                         </Col>
// //                     </Row>
// //                     <hr />

// //                     <div className="mt-1 table-responsive ">
// //                         <table className="table table-bordered table-hover tableHeader">
// //                             <thead className='tableHeader'>
// //                                 <tr className='text-center'>
// //                                     <th scope="col">#</th>
// //                                     <th scope="col">DOC Type</th>
// //                                     <th scope="col">DOC No</th>
// //                                     <th scope="col">Trans Date</th>
// //                                     <th scope="col">Party Name</th>
// //                                 </tr>
// //                                 <tr className='text-center'>
// //                                     <th scope="col"></th>
// //                                     <th scope="col">{gateInSearchData.length}</th>
// //                                     <th scope="col"></th>
// //                                     <th scope="col"></th>
// //                                     <th scope="col"></th>

// //                                 </tr>
// //                             </thead>
// //                             <tbody>
// //                                 {currentItems.map((item, index) => (
// //                                     <tr key={index} className='text-center'>
// //                                         <td>
// //                                             <input type="radio" onChange={() => getSelectedReceiptData(item[1], item[3], item[0])} name="radioGroup" value={item[0]} />
// //                                         </td>
// //                                         <td>{item[0]}</td>
// //                                         <td>{item[1]}</td>
// //                                         <td>{item[2]}</td>
// //                                         <td>{item[4]}</td>
// //                                     </tr>
// //                                 ))}
// //                             </tbody>
// //                         </table>
// //                         <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
// //                             <Pagination.First onClick={() => handlePageChange(1)} />
// //                             <Pagination.Prev
// //                                 onClick={() => handlePageChange(currentPage - 1)}
// //                                 disabled={currentPage === 1}
// //                             />
// //                             <Pagination.Ellipsis />

// //                             {displayPages().map((pageNumber) => (
// //                                 <Pagination.Item
// //                                     key={pageNumber}
// //                                     active={pageNumber === currentPage}
// //                                     onClick={() => handlePageChange(pageNumber)}
// //                                 >
// //                                     {pageNumber}
// //                                 </Pagination.Item>
// //                             ))}

// //                             <Pagination.Ellipsis />
// //                             <Pagination.Next
// //                                 onClick={() => handlePageChange(currentPage + 1)}
// //                                 disabled={currentPage === totalPages}
// //                             />
// //                             <Pagination.Last onClick={() => handlePageChange(totalPages)} />
// //                         </Pagination>
// //                     </div>
// //                 </ModalBody>
// //             </Modal>

// //             <Row>
// //                 <Col md={2}>
// //                     <FormGroup>
// //                         <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                             Trans type
// //                         </label>
// //                         <Input
// //                             className="form-control"
// //                             type="select"
// //                             id="docType"
// //                             name='docType'
// //                             value={finTrans.docType}
// //                             onChange={handleChange}

// //                         >
// //                             <option value=""></option>
// //                             <option value="AD">Advance</option>
// //                             <option value="RE">Receipt</option>
// //                             <option value="AJ">Adjustment</option>
// //                         </Input>

// //                     </FormGroup>
// //                 </Col>
// //                 <Col md={2}>
// //                     <FormGroup>
// //                         <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                             Receipt Id
// //                         </label>
// //                         <Row>
// //                             <Col md={9}>
// //                                 <Input
// //                                     className="form-control"
// //                                     type="text"
// //                                     id="transId"
// //                                     name='transId'
// //                                     value={finTrans.transId}
// //                                     onChange={handleChange}
// //                                     disabled
// //                                 />
// //                             </Col>
// //                             <Col md={3} className="d-flex justify-content-end" >
// //                                 <button
// //                                     className="btn btn-outline-primary btn-margin newButton"
// //                                     style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
// //                                     id="submitbtn2"
// //                                     onClick={openGateInModal}
// //                                 >
// //                                     <FontAwesomeIcon icon={faSearch} size="sm" s />
// //                                 </button>
// //                             </Col>
// //                         </Row>


// //                     </FormGroup>
// //                 </Col>
// //                 <Col md={2}>
// //                     <FormGroup>
// //                         <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                             Receipt Date
// //                         </label>
// //                         <div style={{ position: 'relative' }}>
// //                             <DatePicker
// //                                 selected={finTrans.transDate}
// //                                 disabled
// //                                 id='transDate'
// //                                 name='transDate'
// //                                 dateFormat="dd/MM/yyyy HH:mm"
// //                                 className="form-control border-right-0 InputField"
// //                                 customInput={<Input style={{ width: '100%' }} />}
// //                                 wrapperClassName="custom-react-datepicker-wrapper"
// //                             />
// //                             <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
// //                         </div>

// //                     </FormGroup>
// //                 </Col>
// //                 {/* <Col md={2}>
// //                     <FormGroup>
// //                         <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                             Is On Account Pay
// //                         </label>
// //                         <Input
// //                             className="form-control"
// //                             type="checkbox"
// //                             style={{ height: 25 }}
// //                             id="isOnAccPay"
// //                             name='isOnAccPay'
// //                             value={finTrans.isOnAccPay}
// //                             onChange={handleChange}
// //                         />

// //                     </FormGroup>
// //                 </Col> */}

// //                 <Col md={2}>
// //                     <FormGroup>
// //                         <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                             Receipt Amt
// //                         </label>
// //                         <Input
// //                             className="form-control"
// //                             type="text"
// //                             id="documentAmt"
// //                             name="documentAmt"
// //                             value={paymentMode.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0).toFixed(2)}
// //                             disabled
// //                         />

// //                     </FormGroup>
// //                 </Col>
// //                 <Col md={2}>
// //                     <FormGroup>
// //                         <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                             Status
// //                         </label>
// //                         <Input
// //                             className="form-control"
// //                             type="text"
// //                             id="status"
// //                             name='status'
// //                             value={finTrans.status === 'A' ? 'Approved' : finTrans.status}
// //                             onChange={handleChange}
// //                             disabled
// //                         />

// //                     </FormGroup>
// //                 </Col>
// //                 <Col md={2}>
// //                     <FormGroup>
// //                         <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                             Created By
// //                         </label>
// //                         <Input
// //                             className="form-control"
// //                             type="text"
// //                             id="createdBy"
// //                             name='createdBy'
// //                             value={finTrans.createdBy}
// //                             onChange={handleChange}
// //                             disabled
// //                         />

// //                     </FormGroup>
// //                 </Col>

// //             </Row>
// //             <Row>
// //                 <Col md={2}>
// //                     <FormGroup>
// //                         <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                             Party Name
// //                         </label>
// //                         <Select
// //                             value={{ value: finTrans.partyId, label: finTrans.partyName }}
// //                             onChange={handleAccChange}
// //                             onInputChange={getAccData}
// //                             isDisabled={finTrans.docType === ""}
// //                             options={accData}
// //                             placeholder="Select Account Holder"
// //                             isClearable
// //                             menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
// //                             menuPosition="fixed" // Sets the dropdown menu position to fixed    
// //                             id="othPartyId"
// //                             name="othPartyId"
// //                             className="autocompleteHeight"
// //                             styles={{
// //                                 control: (provided, state) => ({
// //                                     ...provided,
// //                                     height: 32, // Set height
// //                                     minHeight: 32, // Set minimum height
// //                                     border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
// //                                     boxShadow: "none",
// //                                     display: 'flex',
// //                                     alignItems: 'center', // Align items vertically
// //                                     padding: 0, // Remove padding to control height
// //                                     "&:hover": {
// //                                         border: "1px solid #ccc",
// //                                     },
// //                                     borderRadius: '6px', // Add border radius
// //                                     "&:hover": {
// //                                         border: "1px solid #ccc",
// //                                     },
// //                                 }),
// //                                 valueContainer: (provided) => ({
// //                                     ...provided,
// //                                     height: '100%', // Full height of the control
// //                                     display: 'flex',
// //                                     alignItems: 'center', // Align items vertically
// //                                     padding: '0 0.75rem', // Match padding
// //                                 }),
// //                                 singleValue: (provided) => ({
// //                                     ...provided,
// //                                     lineHeight: '32px', // Center text vertically
// //                                 }),
// //                                 indicatorSeparator: () => ({
// //                                     display: "none",
// //                                 }),
// //                                 dropdownIndicator: () => ({
// //                                     display: "none",
// //                                 }),
// //                                 placeholder: (provided) => ({
// //                                     ...provided,
// //                                     lineHeight: '32px', // Center placeholder text vertically
// //                                     color: "gray",
// //                                 }),
// //                                 clearIndicator: (provided) => ({
// //                                     ...provided,
// //                                     padding: 2, // Remove padding
// //                                     display: 'flex',
// //                                     alignItems: 'center', // Align clear indicator vertically
// //                                 }),
// //                             }}

// //                         />

// //                     </FormGroup>
// //                 </Col>

// //                 <Col md={2}>
// //                     <FormGroup>
// //                         <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                             Party GSTIN
// //                         </label>
// //                         <Input
// //                             className="form-control"
// //                             type="text"
// //                             id="partyGst"
// //                             name='partyGst'
// //                             value={finTrans.partyGst}
// //                             onChange={handleChange}
// //                             disabled
// //                         />

// //                     </FormGroup>
// //                 </Col>

// //                 <Col md={2}>
// //                     <FormGroup>
// //                         <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                             Party Address1
// //                         </label>
// //                         <Input
// //                             className="form-control"
// //                             type="text"
// //                             id="partyAddress1"
// //                             name='partyAddress1'
// //                             value={finTrans.partyAddress1}
// //                             onChange={handleChange}
// //                             disabled
// //                         />

// //                     </FormGroup>
// //                 </Col>

// //                 <Col md={2}>
// //                     <FormGroup>
// //                         <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                             Party Address2
// //                         </label>
// //                         <Input
// //                             className="form-control"
// //                             type="text"
// //                             id="partyAddress2"
// //                             name='partyAddress2'
// //                             value={finTrans.partyAddress2}
// //                             onChange={handleChange}
// //                             disabled
// //                         />

// //                     </FormGroup>
// //                 </Col>

// //                 <Col md={2}>
// //                     <FormGroup>
// //                         <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                             Party Address3
// //                         </label>
// //                         <Input
// //                             className="form-control"
// //                             type="text"
// //                             id="partyAddress3"
// //                             name='partyAddress3'
// //                             value={finTrans.partyAddress3}
// //                             onChange={handleChange}
// //                             disabled
// //                         />

// //                     </FormGroup>
// //                 </Col>


// //                 <Col md={2}>
// //                     <FormGroup>
// //                         <label className="forlabel bold-label" htmlFor="sbRequestId">
// //                             Remarks
// //                         </label>
// //                         <Input
// //                             className="form-control"
// //                             type="textarea"
// //                             id="narration"
// //                             name='narration'
// //                             value={finTrans.narration}
// //                             onChange={handleChange}
// //                             maxLength={250}
// //                         />

// //                     </FormGroup>
// //                 </Col>
// //             </Row>
// //             <div id="datepicker-portal2"></div>
// //             <Row className="justify-content-center">
// //                 <Col xs={12} className="d-flex flex-wrap justify-content-center gap-2">
// //                     <button
// //                         className="btn btn-outline-primary btn-margin newButton"
// //                         style={{ marginRight: 10, fontSize: 13 }}
// //                         id="submitbtn2"
// //                         onClick={finTrans.docType === 'AD' ? handleSave : handleSave1}
// //                         disabled={finTrans.transId !== "" || (finTrans.docType === 'RE' && invoiceData.length === 0)}
// //                     >
// //                         <FontAwesomeIcon
// //                             icon={faSave}
// //                             style={{ marginRight: "5px" }}
// //                         />
// //                         Save
// //                     </button>


// //                     <button
// //                         className="btn btn-outline-danger btn-margin newButton"
// //                         style={{ marginRight: 10, fontSize: 13 }}
// //                         id="submitbtn2"
// //                         onClick={handleClear}
// //                     >
// //                         <FontAwesomeIcon
// //                             icon={faRefresh}
// //                             style={{ marginRight: "5px" }}
// //                         />
// //                         Clear
// //                     </button>

// //                     <button
// //                         className="btn btn-outline-primary btn-margin newButton"
// //                         style={{ marginRight: 10, fontSize: 13 }}
// //                         id="submitbtn2"
// //                         onClick={addPaymentMode}
// //                         disabled={finTrans.transId !== ""}
// //                     >
// //                         <FontAwesomeIcon
// //                             icon={faAdd}
// //                             style={{ marginRight: "5px" }}
// //                         />
// //                         Add Payment Mode
// //                     </button>

// //                     <button
// //                         className="btn btn-outline-primary btn-margin newButton"
// //                         style={{ marginRight: 10, fontSize: 13 }}
// //                         id="submitbtn2"
// //                         onClick={handleModelOPenForPrintReciept}

// //                     >
// //                         <FontAwesomeIcon
// //                             icon={faPrint}
// //                             style={{ marginRight: "5px" }}
// //                         />
// //                         Print
// //                     </button>

// //                     {(finTrans.transId !== "" && (finTrans.docType === 'AJ' || finTrans.docType === 'RE') && finTrans.isReceiptCancel !== 'Y' &&
// //                         (role === 'ROLE_ADMIN' || allowDelete === 'Y')) && (
// //                             <button
// //                                 className="btn btn-outline-danger btn-margin newButton"
// //                                 style={{ marginRight: 10, fontSize: 13 }}
// //                                 id="submitbtn2"
// //                                 onClick={() => handleCancelReciept(finTrans.transId, finTrans.narration, finTrans.docType, finTrans.partyId)}
// //                             >
// //                                 <FontAwesomeIcon
// //                                     icon={faCancel}
// //                                     style={{ marginRight: "5px" }}
// //                                 />
// //                                 Cancel
// //                             </button>
// //                         )}

// //                 </Col>
// //             </Row>
// //             {finTrans.docType === "AD" && (
// //                 <>
// //                     <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
// //                         <Table className="table table-bordered" style={{ border: '2px solid black' }}>
// //                             <thead>
// //                                 <tr>
// //                                     <th scope="col" colSpan={2} style={{ color: "black" }}>
// //                                         Advance Balance
// //                                     </th>
// //                                 </tr>
// //                                 <tr>

// //                                     <th scope="col" className="text-center" style={{ color: "black" }}>
// //                                         Advance Amount
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black" }}>
// //                                         Balance for Clear Amount.
// //                                     </th>
// //                                 </tr>
// //                             </thead>
// //                             <tbody>
// //                                 <tr className='text-center'>
// //                                     <td>{finTrans.advanceAmt}</td>
// //                                     <td>{finTrans.advanceClearedAmt}</td>
// //                                 </tr>
// //                             </tbody>
// //                         </Table>
// //                     </div>


// //                     <div className="mt-3 table-responsive" style={{ maxHeight: "400px" }}>
// //                         <Table className="table table-bordered table-responsive" style={{ border: '2px solid black' }}>
// //                             <thead>
// //                                 <tr>
// //                                     <th scope="col" colSpan={7} style={{ color: "black", width: 50 }}>
// //                                         Advance Payment Details
// //                                     </th>
// //                                 </tr>
// //                                 <tr>
// //                                     <th scope="col" className="text-center" style={{ color: "black", width: 50 }}>
// //                                         Sr No
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black", width: 150 }}>
// //                                         Payment Mode
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black", width: 200 }}>
// //                                         Cheque/Transaction No <span style={{ color: 'red' }}>*</span>
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black", width: 210 }}>
// //                                         Cheque/Transaction Date <span style={{ color: 'red' }}>*</span>
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black" }}>
// //                                         Bank Details
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black", width: 150 }}>
// //                                         Amount
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black", width: 100 }}>
// //                                         Status
// //                                     </th>
// //                                 </tr>
// //                             </thead>
// //                             <tbody>
// //                                 {paymentMode.map((item, index) => (
// //                                     <tr key={index}>
// //                                         <td>{index + 1}</td>
// //                                         <td>
// //                                             <Input
// //                                                 className="form-control"
// //                                                 type="select"
// //                                                 id="payMode"
// //                                                 name='payMode'
// //                                                 value={item.payMode}
// //                                                 onChange={(e) => handlePaymentModeChange(e, index)}
// //                                                 style={{ width: 150 }}
// //                                                 disabled={finTrans.transId !== ""}
// //                                             >
// //                                                 <option value=""></option>
// //                                                 <option value="EFT">EFT</option>
// //                                                 <option value="RTGS">RTGS</option>
// //                                                 <option value="CASH">CASH</option>
// //                                                 <option value="CHEQUE">CHEQUE</option>
// //                                                 {finTrans.docType !== "AD" && (
// //                                                     <option value="TDS">TDS</option>
// //                                                 )}
// //                                             </Input>

// //                                         </td>
// //                                         <td>
// //                                             <Input
// //                                                 className="form-control"
// //                                                 type="text"
// //                                                 id="chequeNo"
// //                                                 name='chequeNo'
// //                                                 onChange={(e) => handlePaymentModeChange(e, index)}
// //                                                 maxLength={25}
// //                                                 value={item.chequeNo}
// //                                                 style={{ width: 180 }}
// //                                                 disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.transId !== ""}
// //                                             />
// //                                         </td>
// //                                         <td>
// //                                             <div style={{ position: 'relative', width: 210 }}>
// //                                                 <DatePicker
// //                                                     selected={item.chequeDate} // The currently selected date for the row
// //                                                     onChange={(selectedDate) => {
// //                                                         const updatedDate = new Date(selectedDate); // Ensure it's a Date object
// //                                                         const currentTime = new Date();
// //                                                         updatedDate.setHours(currentTime.getHours());
// //                                                         updatedDate.setMinutes(currentTime.getMinutes());
// //                                                         updatedDate.setSeconds(currentTime.getSeconds());
// //                                                         updatedDate.setMilliseconds(currentTime.getMilliseconds());

// //                                                         setPaymentMode((prevState) => {
// //                                                             const updatedRows = [...prevState];
// //                                                             updatedRows[index] = {
// //                                                                 ...updatedRows[index],
// //                                                                 chequeDate: updatedDate,
// //                                                             };
// //                                                             return updatedRows;
// //                                                         });
// //                                                     }}
// //                                                     portalId="datepicker-portal2"
// //                                                     disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.transId !== ""}
// //                                                     popperPlacement="top-start"
// //                                                     id="chequeDate" // Unique identifier
// //                                                     name="chequeDate" // Name of the field
// //                                                     dateFormat="dd/MM/yyyy HH:mm" // Display format for the date and time
// //                                                     showTimeInput // Enables time input in the date picker
// //                                                     className="form-control border-right-0 InputField" // Custom class names for styling
// //                                                     customInput={<Input style={{ width: '100%' }} />} // Custom input element for styling
// //                                                     wrapperClassName="custom-react-datepicker-wrapper" // Custom wrapper for date picker
// //                                                 />

// //                                                 <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
// //                                             </div>
// //                                         </td>
// //                                         <td>
// //                                             <Input
// //                                                 className="form-control"
// //                                                 type="text"
// //                                                 id="bankDetails"
// //                                                 name='bankDetails'
// //                                                 value={item.bankDetails}
// //                                                 onChange={(e) => handlePaymentModeChange(e, index)}
// //                                                 maxLength={50}
// //                                                 disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.transId !== ""}

// //                                             />
// //                                         </td>
// //                                         <td>
// //                                             <Input
// //                                                 className="form-control"
// //                                                 type="text"
// //                                                 id="amount"
// //                                                 name='amount'
// //                                                 value={item.amount}
// //                                                 disabled={item.payMode === '' || item.payMode === 'TDS' || finTrans.transId !== ""}
// //                                                 onChange={(e) => handlePaymentModeChange(e, index)}
// //                                                 style={{ width: 180 }}

// //                                             />
// //                                         </td>
// //                                         <td className='text-center'>

// //                                             {item.status === '' ? (
// //                                                 <button
// //                                                     className="btn btn-outline-danger btn-margin newButton"
// //                                                     style={{ marginRight: 10, fontSize: 13 }}
// //                                                     id="submitbtn2"
// //                                                     onClick={() => removePaymentMode(index, item.amount)}
// //                                                 >
// //                                                     <FontAwesomeIcon
// //                                                         icon={faTrash}
// //                                                     />
// //                                                 </button>
// //                                             ) : (
// //                                                 <span>{item.status}</span>
// //                                             )}
// //                                         </td>
// //                                     </tr>
// //                                 ))}
// //                             </tbody>
// //                         </Table>
// //                     </div>
// //                 </>

// //             )}


// //             {finTrans.docType === "RE" && (
// //                 <>
// //                     <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
// //                         <Table className="table table-bordered" style={{ border: '2px solid black' }}>
// //                             <thead>
// //                                 <tr>
// //                                     <th scope="col" colSpan={9} style={{ color: "black" }}>
// //                                         Invoice Details For Adjustment
// //                                     </th>
// //                                 </tr>
// //                                 <tr>

// //                                     <th scope="col" className="text-center" style={{ color: "black" }}>
// //                                         Sr No
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black" }}>
// //                                         Invoice No
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black" }}>
// //                                         Billing To
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black" }}>
// //                                         Billing Party
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black" }}>
// //                                         Comments
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black" }}>
// //                                         Importer Name
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black" }}>
// //                                         Invoice Amt.
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black" }}>
// //                                         Invoice Bal Amt.
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black" }}>
// //                                         Receipt Amt.
// //                                     </th>
// //                                 </tr>
// //                             </thead>
// //                             <tbody>
// //                                 {invoiceData.map((item, index) => (
// //                                     <tr key={index} className='text-center'>
// //                                         <td>{index + 1}</td>
// //                                         <td>{item.invoiceNo}</td>
// //                                         <td>{item.billingTo}</td>
// //                                         <td>{item.billingParty}</td>
// //                                         <td>{item.comments}</td>
// //                                         <td>{item.importerName}</td>
// //                                         <td>{item.invoiceAmt}</td>
// //                                         <td>{item.invoiceBalAmt}</td>
// //                                         <td>
// //                                             <Input
// //                                                 className="form-control"
// //                                                 type="text"
// //                                                 id="receiptAmt"
// //                                                 name='receiptAmt'
// //                                                 value={item.receiptAmt}
// //                                                 disabled={finTrans.transId !== ""}
// //                                                 onChange={(e) => handleInvoiceChange(e, index)}
// //                                                 style={{ width: 180 }}

// //                                             />
// //                                         </td>
// //                                     </tr>
// //                                 ))}

// //                             </tbody>
// //                         </Table>
// //                     </div>


// //                     <div className="mt-3 table-responsive" style={{ maxHeight: "400px" }}>
// //                         <Table className="table table-bordered table-responsive" style={{ border: '2px solid black' }}>
// //                             <thead>
// //                                 <tr>
// //                                     <th scope="col" colSpan={7} style={{ color: "black", width: 50 }}>
// //                                         Payment Details
// //                                     </th>
// //                                 </tr>
// //                                 <tr>
// //                                     <th scope="col" className="text-center" style={{ color: "black", width: 50 }}>
// //                                         Sr No
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black", width: 150 }}>
// //                                         Payment Mode
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black", width: 200 }}>
// //                                         Cheque/Transaction No <span style={{ color: 'red' }}>*</span>
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black", width: 210 }}>
// //                                         Cheque/Transaction Date <span style={{ color: 'red' }}>*</span>
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black" }}>
// //                                         Bank Details
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black", width: 150 }}>
// //                                         Amount
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black", width: 100 }}>
// //                                         Status
// //                                     </th>
// //                                 </tr>
// //                             </thead>
// //                             <tbody>
// //                                 {paymentMode.map((item, index) => (
// //                                     <tr key={index}>
// //                                         <td>{index + 1}</td>
// //                                         <td>
// //                                             <Input
// //                                                 className="form-control"
// //                                                 type="select"
// //                                                 id="payMode"
// //                                                 name='payMode'
// //                                                 value={item.payMode}
// //                                                 onChange={(e) => handlePaymentModeChange1(e, index)}
// //                                                 style={{ width: 150 }}
// //                                                 disabled={finTrans.transId !== ""}
// //                                             >
// //                                                 <option value=""></option>
// //                                                 <option value="EFT">EFT</option>
// //                                                 <option value="RTGS">RTGS</option>
// //                                                 <option value="CASH">CASH</option>
// //                                                 <option value="CHEQUE">CHEQUE</option>
// //                                                 {finTrans.docType !== "AD" && (
// //                                                     <option value="TDS">TDS</option>
// //                                                 )}
// //                                             </Input>

// //                                         </td>
// //                                         <td>
// //                                             <Input
// //                                                 className="form-control"
// //                                                 type="text"
// //                                                 id="chequeNo"
// //                                                 name='chequeNo'
// //                                                 onChange={(e) => handlePaymentModeChange1(e, index)}
// //                                                 maxLength={25}
// //                                                 value={item.chequeNo}
// //                                                 style={{ width: 180 }}
// //                                                 disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.transId !== ""}
// //                                             />
// //                                         </td>
// //                                         <td>
// //                                             <div style={{ position: 'relative', width: 210 }}>
// //                                                 <DatePicker
// //                                                     selected={item.chequeDate} // The currently selected date for the row
// //                                                     onChange={(selectedDate) => {
// //                                                         const updatedDate = new Date(selectedDate); // Ensure it's a Date object
// //                                                         const currentTime = new Date();
// //                                                         updatedDate.setHours(currentTime.getHours());
// //                                                         updatedDate.setMinutes(currentTime.getMinutes());
// //                                                         updatedDate.setSeconds(currentTime.getSeconds());
// //                                                         updatedDate.setMilliseconds(currentTime.getMilliseconds());

// //                                                         setPaymentMode((prevState) => {
// //                                                             const updatedRows = [...prevState];
// //                                                             updatedRows[index] = {
// //                                                                 ...updatedRows[index],
// //                                                                 chequeDate: updatedDate,
// //                                                             };
// //                                                             return updatedRows;
// //                                                         });
// //                                                     }}
// //                                                     portalId="datepicker-portal2"
// //                                                     disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.transId !== ""}
// //                                                     popperPlacement="top-start"
// //                                                     id="chequeDate" // Unique identifier
// //                                                     name="chequeDate" // Name of the field
// //                                                     dateFormat="dd/MM/yyyy HH:mm" // Display format for the date and time
// //                                                     showTimeInput // Enables time input in the date picker
// //                                                     className="form-control border-right-0 InputField" // Custom class names for styling
// //                                                     customInput={<Input style={{ width: '100%' }} />} // Custom input element for styling
// //                                                     wrapperClassName="custom-react-datepicker-wrapper" // Custom wrapper for date picker
// //                                                 />

// //                                                 <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
// //                                             </div>
// //                                         </td>
// //                                         <td>
// //                                             <Input
// //                                                 className="form-control"
// //                                                 type="text"
// //                                                 id="bankDetails"
// //                                                 name='bankDetails'
// //                                                 value={item.bankDetails}
// //                                                 onChange={(e) => handlePaymentModeChange1(e, index)}
// //                                                 maxLength={50}
// //                                                 disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.transId !== ""}

// //                                             />
// //                                         </td>
// //                                         <td>
// //                                             <Input
// //                                                 className="form-control"
// //                                                 type="text"
// //                                                 id="amount"
// //                                                 name='amount'
// //                                                 value={item.amount}
// //                                                 disabled={item.payMode === '' || finTrans.transId !== ""}
// //                                                 onChange={(e) => handlePaymentModeChange1(e, index)}
// //                                                 style={{ width: 180 }}

// //                                             />
// //                                         </td>
// //                                         <td className='text-center'>

// //                                             {item.status === '' ? (
// //                                                 <button
// //                                                     className="btn btn-outline-danger btn-margin newButton"
// //                                                     style={{ marginRight: 10, fontSize: 13 }}
// //                                                     id="submitbtn2"
// //                                                     onClick={() => removePaymentMode(index, item.amount)}
// //                                                 >
// //                                                     <FontAwesomeIcon
// //                                                         icon={faTrash}
// //                                                     />
// //                                                 </button>
// //                                             ) : (
// //                                                 <span>{item.status}</span>
// //                                             )}
// //                                         </td>
// //                                     </tr>
// //                                 ))}
// //                             </tbody>
// //                         </Table>
// //                     </div>

// //                 </>
// //             )}





// //             {finTrans.docType === "AJ" && (
// //                 <>
// //                     <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
// //                         <Table className="table table-bordered" style={{ border: '2px solid black' }}>
// //                             <thead>
// //                                 <tr>
// //                                     <th scope="col" colSpan={2} style={{ color: "black" }}>
// //                                         Advance Balance
// //                                     </th>
// //                                 </tr>
// //                                 <tr>

// //                                     <th scope="col" className="text-center" style={{ color: "black" }}>
// //                                         Advance Amount
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black" }}>
// //                                         Balance for Clear Amount.
// //                                     </th>
// //                                 </tr>
// //                             </thead>
// //                             <tbody>
// //                                 <tr className='text-center'>
// //                                     <td>{finTrans.advanceAmt}</td>
// //                                     <td>{finTrans.advanceClearedAmt}</td>
// //                                 </tr>
// //                             </tbody>
// //                         </Table>
// //                     </div>
// //                     <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
// //                         <Table className="table table-bordered" style={{ border: '2px solid black' }}>
// //                             <thead>
// //                                 <tr>
// //                                     <th scope="col" colSpan={9} style={{ color: "black" }}>
// //                                         Invoice Details For Adjustment
// //                                     </th>
// //                                 </tr>
// //                                 <tr>

// //                                     <th scope="col" className="text-center" style={{ color: "black" }}>
// //                                         Sr No
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black" }}>
// //                                         Invoice No
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black" }}>
// //                                         Billing To
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black" }}>
// //                                         Billing Party
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black" }}>
// //                                         Comments
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black" }}>
// //                                         Importer Name
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black" }}>
// //                                         Invoice Amt.
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black" }}>
// //                                         Invoice Bal Amt.
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black" }}>
// //                                         Receipt Amt.
// //                                     </th>
// //                                 </tr>
// //                             </thead>
// //                             <tbody>
// //                                 {invoiceData.map((item, index) => (
// //                                     <tr key={index} className='text-center'>
// //                                         <td>{index + 1}</td>
// //                                         <td>{item.invoiceNo}</td>
// //                                         <td>{item.billingTo}</td>
// //                                         <td>{item.billingParty}</td>
// //                                         <td>{item.comments}</td>
// //                                         <td>{item.importerName}</td>
// //                                         <td>{item.invoiceAmt}</td>
// //                                         <td>{item.invoiceBalAmt}</td>
// //                                         <td>
// //                                             <Input
// //                                                 className="form-control"
// //                                                 type="text"
// //                                                 id="receiptAmt"
// //                                                 name='receiptAmt'
// //                                                 value={item.receiptAmt}
// //                                                 disabled={finTrans.transId !== ""}
// //                                                 onChange={(e) => handleInvoiceChange1(e, index)}
// //                                                 style={{ width: 180 }}

// //                                             />
// //                                         </td>
// //                                     </tr>
// //                                 ))}

// //                             </tbody>
// //                         </Table>
// //                     </div>


// //                     <div className="mt-3 table-responsive" style={{ maxHeight: "400px" }}>
// //                         <Table className="table table-bordered table-responsive" style={{ border: '2px solid black' }}>
// //                             <thead>
// //                                 <tr>
// //                                     <th scope="col" colSpan={7} style={{ color: "black", width: 50 }}>
// //                                         Payment Details
// //                                     </th>
// //                                 </tr>
// //                                 <tr>
// //                                     <th scope="col" className="text-center" style={{ color: "black", width: 50 }}>
// //                                         Sr No
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black", width: 150 }}>
// //                                         Payment Mode
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black", width: 200 }}>
// //                                         Cheque/Transaction No <span style={{ color: 'red' }}>*</span>
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black", width: 210 }}>
// //                                         Cheque/Transaction Date <span style={{ color: 'red' }}>*</span>
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black" }}>
// //                                         Bank Details
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black", width: 150 }}>
// //                                         Amount
// //                                     </th>
// //                                     <th scope="col" className="text-center" style={{ color: "black", width: 100 }}>
// //                                         Status
// //                                     </th>
// //                                 </tr>
// //                             </thead>
// //                             <tbody>
// //                                 {paymentMode.map((item, index) => (
// //                                     <tr key={index}>
// //                                         <td>{index + 1}</td>
// //                                         <td>
// //                                             <Input
// //                                                 className="form-control"
// //                                                 type="select"
// //                                                 id="payMode"
// //                                                 name='payMode'
// //                                                 value={item.payMode}
// //                                                 onChange={(e) => handlePaymentModeChange1(e, index)}
// //                                                 style={{ width: 150 }}
// //                                                 disabled={finTrans.transId !== ""}
// //                                             >
// //                                                 <option value=""></option>
// //                                                 <option value="ADVANCE">ADVANCE</option>
// //                                                 {finTrans.docType !== "AD" && (
// //                                                     <option value="TDS">TDS</option>
// //                                                 )}
// //                                             </Input>

// //                                         </td>
// //                                         <td>
// //                                             <Input
// //                                                 className="form-control"
// //                                                 type="text"
// //                                                 id="chequeNo"
// //                                                 name='chequeNo'
// //                                                 onChange={(e) => handlePaymentModeChange1(e, index)}
// //                                                 maxLength={25}
// //                                                 value={item.chequeNo}
// //                                                 style={{ width: 180 }}
// //                                                 disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.transId !== ""}
// //                                             />
// //                                         </td>
// //                                         <td>
// //                                             <div style={{ position: 'relative', width: 210 }}>
// //                                                 <DatePicker
// //                                                     selected={item.chequeDate} // The currently selected date for the row
// //                                                     onChange={(selectedDate) => {
// //                                                         const updatedDate = new Date(selectedDate); // Ensure it's a Date object
// //                                                         const currentTime = new Date();
// //                                                         updatedDate.setHours(currentTime.getHours());
// //                                                         updatedDate.setMinutes(currentTime.getMinutes());
// //                                                         updatedDate.setSeconds(currentTime.getSeconds());
// //                                                         updatedDate.setMilliseconds(currentTime.getMilliseconds());

// //                                                         setPaymentMode((prevState) => {
// //                                                             const updatedRows = [...prevState];
// //                                                             updatedRows[index] = {
// //                                                                 ...updatedRows[index],
// //                                                                 chequeDate: updatedDate,
// //                                                             };
// //                                                             return updatedRows;
// //                                                         });
// //                                                     }}
// //                                                     portalId="datepicker-portal2"
// //                                                     disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.transId !== ""}
// //                                                     popperPlacement="top-start"
// //                                                     id="chequeDate" // Unique identifier
// //                                                     name="chequeDate" // Name of the field
// //                                                     dateFormat="dd/MM/yyyy HH:mm" // Display format for the date and time
// //                                                     showTimeInput // Enables time input in the date picker
// //                                                     className="form-control border-right-0 InputField" // Custom class names for styling
// //                                                     customInput={<Input style={{ width: '100%' }} />} // Custom input element for styling
// //                                                     wrapperClassName="custom-react-datepicker-wrapper" // Custom wrapper for date picker
// //                                                 />

// //                                                 <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
// //                                             </div>
// //                                         </td>
// //                                         <td>
// //                                             <Input
// //                                                 className="form-control"
// //                                                 type="text"
// //                                                 id="bankDetails"
// //                                                 name='bankDetails'
// //                                                 value={item.bankDetails}
// //                                                 onChange={(e) => handlePaymentModeChange1(e, index)}
// //                                                 maxLength={50}
// //                                                 disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.transId !== ""}

// //                                             />
// //                                         </td>
// //                                         <td>
// //                                             <Input
// //                                                 className="form-control"
// //                                                 type="text"
// //                                                 id="amount"
// //                                                 name='amount'
// //                                                 value={item.amount}
// //                                                 disabled={item.payMode === '' || finTrans.transId !== "" || item.payMode === "ADVANCE"}
// //                                                 onChange={(e) => handlePaymentModeChange1(e, index)}
// //                                                 style={{ width: 180 }}

// //                                             />
// //                                         </td>
// //                                         <td className='text-center'>

// //                                             {item.status === '' ? (
// //                                                 <button
// //                                                     className="btn btn-outline-danger btn-margin newButton"
// //                                                     style={{ marginRight: 10, fontSize: 13 }}
// //                                                     id="submitbtn2"
// //                                                     disabled={item.payMode === "ADVANCE"}
// //                                                     onClick={() => removePaymentMode(index, item.amount)}
// //                                                 >
// //                                                     <FontAwesomeIcon
// //                                                         icon={faTrash}
// //                                                     />
// //                                                 </button>
// //                                             ) : (
// //                                                 <span>{item.status}</span>
// //                                             )}
// //                                         </td>
// //                                     </tr>
// //                                 ))}
// //                             </tbody>
// //                         </Table>
// //                     </div>

// //                 </>
// //             )}
// //         </div>
// //     )
// // }






// import AuthContext from '../Components/AuthProvider';
// import { useNavigate } from 'react-router-dom';
// import { useEffect, useState, useContext } from 'react';
// import '../Components/Style.css';
// import ipaddress from "../Components/IpAddress";
// import Select, { components } from 'react-select';
// import { Pagination } from 'react-bootstrap';
// import Swal from 'sweetalert2';
// import {
//     Card,
//     CardBody,
//     Container,
//     Row,
//     Col,
//     Form,
//     FormGroup,
//     Modal,
//     ModalHeader,
//     ModalBody,
//     Label,
//     Input,
//     Table,
//     ModalFooter,
//     CardTitle,
// } from "reactstrap";
// import DatePicker from "react-datepicker";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faIdBadge, faChartGantt, faBold, faPrint, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faCalendarAlt, faAdd, faCancel, faXmark, faArrowDown, faPlus, faArrowUp, faEdit, faChevronUp, faChevronDown, faMagnifyingGlassChart, faProcedures, faSpinner, faArrowUpFromBracket, faUsersViewfinder, faBackward, faCross } from '@fortawesome/free-solid-svg-icons';
// import '../assets/css/style.css';
// import '../Components/Style.css';
// import { Button } from "react-bootstrap";
// import useAxios from '../Components/useAxios';
// import { toast } from 'react-toastify';
// import printformat1 from '../Images/printformat1.png';
// import printformat2 from '../Images/printformat2.png';

// export default function ARReceipts({ activeTab }) {
//     const navigate = useNavigate();
//     const { isAuthenticated } = useContext(AuthContext);
//     const [loading, setLoading] = useState(false);
//     const styles = {
//         overlay: {
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             backgroundColor: 'rgba(255, 255, 255, 0.8)',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             zIndex: 9999,
//         },
//         label: {
//             backgroundColor: '#e3eefa',
//             padding: '5px',
//             borderRadius: '4px',
//         }
//     };

//     // If the user is not authenticated, redirect to the login page
//     useEffect(() => {
//         if (!isAuthenticated) {

//             navigate('/login?message=You need to be authenticated to access this page.');
//         }
//     }, [isAuthenticated, navigate]);

//     const axios = useAxios();

//     const {
//         jwtToken,
//         userId,
//         username,
//         branchId,
//         companyid,
//         role,
//         companyname,
//         branchname,
//         login,
//         logout,
//         userType,
//         tabMenus,
//         userRights
//     } = useContext(AuthContext);







//     const processId = 'P01104';

//     const foundRights = role !== 'ROLE_ADMIN' ? userRights.find(item => item.process_Id === processId) : null;
//     const allowCreate = foundRights?.allow_Create === 'Y';
//     const allowRead = foundRights?.allow_Read === 'Y';
//     const allowEdit = foundRights?.allow_Update === 'Y';
//     const allowDelete = foundRights?.allow_Delete === 'Y';

















//     const [paymentMode, setPaymentMode] = useState([{
//         payMode: '',
//         chequeNo: '',
//         chequeDate: null,
//         bankDetails: '',
//         amount: '',
//         status: '',
//         transId: '',
//         lineId: ''
//     }])


//     const addPaymentMode = () => {


//         setPaymentMode([...paymentMode, {
//             payMode: '',
//             chequeNo: '',
//             chequeDate: null,
//             bankDetails: '',
//             amount: '',
//             status: ''
//         }]);



//     };

//     const removePaymentMode = (index, amount) => {
//         setPaymentMode((prevState) => prevState.filter((_, i) => i !== index));
//     };


//     const [finTrans, setFinTrans] = useState({
//         companyId: "",
//         branchId: "",
//         docType: "",
//         transId: "",
//         transDate: new Date(),
//         status: "",
//         isOnAccPay: "N",
//         createdBy: "",
//         partyId: "",
//         partyName: "",
//         partyGst: "",
//         partyAddress1: "",
//         partyAddress2: "",
//         partyAddress3: "",
//         accSrNo: "",
//         documentAmt: "",
//         narration: "",
//         advanceAmt: '',
//         advanceClearedAmt: '',
//         isReceiptCancel: 'N'
//     })


//     const initialInvoiceData = useState([{
//         invoiceNo: '',
//         billingTo: '',
//         billingParty: '',
//         comments: '',
//         importerId: '',
//         importerSrNo: '',
//         importerName: '',
//         invoiceAmt: '',
//         invoiceBalAmt: '',
//         receiptAmt: '',
//         tdsDeductee: '',
//         tdsPercentage: '',
//         tdsAmt: '',
//         tdsStatus: '',
//         localAmount: '',
//         transId: ''
//     }]);


//     const [invoiceData, setInvoiceData] = useState(initialInvoiceData);

//     const [savedInvoiceData, setSavedInvoiceData] = useState(initialInvoiceData);


//     // const handleInvoiceChange = (e, index) => {
//     //     const { name, value } = e.target;
//     //     let sanitizeValue = value;

//     //     if (name === 'receiptAmt') {
//     //         sanitizeValue = handleInputChange(value, 13, 2)

//     //         if (invoiceData[index].invoiceBalAmt < sanitizeValue) {
//     //             sanitizeValue = '';
//     //         }


//     //     }



//     //     setInvoiceData((prevState) => {
//     //         const updatedRows = [...prevState];
//     //         updatedRows[index] = {
//     //             ...updatedRows[index],
//     //             [name]: sanitizeValue,
//     //         };
//     //         return updatedRows;
//     //     });
//     // };



//     const handleInvoiceChange = (e, index) => {
//         const { name, value } = e.target;
//         let sanitizeValue = value;

//         if (name === 'receiptAmt') {
//             sanitizeValue = handleInputChange(value, 13, 2);

//             const currentRow = invoiceData[index];
//             const invoiceBalAmt = currentRow.invoiceBalAmt || 0;

//             // Assume this is available from props or state
//             const savedInvoice = savedInvoiceData.find(
//                 (item) => item.invoiceNo === currentRow.invoiceNo
//             );

//             let allowedLimit = invoiceBalAmt;

//             if (currentRow.transId && savedInvoice) {
//                 const savedAmount = savedInvoice.receiptAmt || 0;
//                 allowedLimit = invoiceBalAmt + savedAmount;
//             }

//             console.log('allowedLimit : ' + allowedLimit, ' invoiceBalAmt : ', invoiceBalAmt, ' \ncurrentRow.transId ', currentRow.transId, ' savedInvoice ', savedInvoice);


//             if (Number(sanitizeValue) > Number(allowedLimit)) {
//                 sanitizeValue = '';
//             }
//         }

//         setInvoiceData((prevState) => {
//             const updatedRows = [...prevState];
//             updatedRows[index] = {
//                 ...updatedRows[index],
//                 [name]: sanitizeValue,
//             };
//             return updatedRows;
//         });
//     };




//     const handleInvoiceChange1 = (e, index) => {
//         const { name, value } = e.target;
//         let sanitizeValue = value;

//         if (name === 'receiptAmt') {
//             sanitizeValue = handleInputChange(value, 13, 2);

//             if (invoiceData[index].invoiceBalAmt < sanitizeValue) {
//                 sanitizeValue = '';
//             } else {
//                 setPaymentMode((prevState) => {
//                     const updatedPaymentModes = [...prevState];

//                     // Find existing ADVANCE row
//                     let advanceRow = updatedPaymentModes.find((row) => row.payMode === 'ADVANCE');

//                     // Calculate total receiptAmt from invoiceData
//                     let totalReceiptAmt = invoiceData.reduce((acc, curr, idx) =>
//                         idx === index ? acc + parseFloat(sanitizeValue || 0) : acc + parseFloat(curr.receiptAmt || 0), 0
//                     );

//                     if (!advanceRow) {
//                         // Check for an empty row
//                         const emptyRow = updatedPaymentModes.find((row) => !row.payMode);
//                         if (emptyRow) {
//                             emptyRow.payMode = 'ADVANCE';
//                             emptyRow.amount = totalReceiptAmt;
//                         } else {
//                             // Add a new ADVANCE row
//                             updatedPaymentModes.push({
//                                 payMode: 'ADVANCE',
//                                 chequeNo: '',
//                                 chequeDate: null,
//                                 bankDetails: '',
//                                 amount: totalReceiptAmt,
//                                 status: '',
//                             });
//                         }
//                     } else {
//                         // Update existing ADVANCE row
//                         advanceRow.amount = totalReceiptAmt;
//                     }

//                     return updatedPaymentModes;
//                 });
//             }
//         }

//         // Update invoiceData
//         setInvoiceData((prevState) => {
//             const updatedRows = [...prevState];
//             updatedRows[index] = {
//                 ...updatedRows[index],
//                 [name]: sanitizeValue,
//             };
//             return updatedRows;
//         });
//     };




//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;

//         if (name === "docType") {
//             if (finTrans.docType !== value) {
//                 handleClear();
//             }
//         }

//         setFinTrans((prevState) => ({
//             ...prevState,
//             [name]: type === "checkbox" ? (checked ? "Y" : "N") : value,
//         }));
//     };


//     const [accData, setAccData] = useState([]);

//     const getAccData = (val) => {
//         if (!val) {
//             setAccData([]);
//             return;
//         }

//         axios.get(`${ipaddress}party/getAllWithAdd?cid=${companyid}&bid=${branchId}&val=${val}`, {
//             headers: {
//                 Authorization: `Bearer ${jwtToken}`
//             }
//         })
//             .then((response) => {
//                 const data = response.data;

//                 const partyOptions = data.map(port => ({
//                     value: port[0],
//                     label: port[1] + ' - ' + port[2] + ' ' + port[3] + ' ' + port[4],
//                     impName: port[1],
//                     gst: port[6],
//                     address1: port[2],
//                     address2: port[3],
//                     address3: port[4],
//                     srNo: port[5],
//                     state: port[7]
//                 }))

//                 setAccData(partyOptions);
//             })
//             .catch((error) => {
//                 setAccData([]);
//             })
//     }


//     const handleAccChange = async (selectedOption, { action }) => {

//         if (action === 'clear') {

//             setFinTrans((prev) => ({
//                 ...prev,
//                 partyId: "",
//                 partyGst: "",
//                 partyAddress1: "",
//                 partyAddress2: "",
//                 partyAddress3: "",
//                 accSrNo: "",
//             }));

//             handleClear();
//         }
//         else {


//             setFinTrans((prev) => ({
//                 ...prev,
//                 partyId: selectedOption.value,
//                 partyName: selectedOption.impName,
//                 partyGst: selectedOption.gst,
//                 partyAddress1: selectedOption.address1,
//                 partyAddress2: selectedOption.address2,
//                 partyAddress3: selectedOption.address3,
//                 accSrNo: selectedOption.srNo,
//             }));

//             getAdvanceData(selectedOption.value);
//         }
//     };


//     const getAdvanceData = (id) => {
//         axios.get(`${ipaddress}receipt/advanceReceiptBeforeSaveSearch`, {
//             headers: {
//                 Authorization: `Bearer ${jwtToken}`
//             },
//             params: {
//                 cid: companyid,
//                 bid: branchId,
//                 id: id,
//                 type: finTrans.docType
//             }

//         })

//             .then((response) => {

//                 const data = response.data;

//                 console.log('data ', data);


//                 if (finTrans.docType === "AD") {
//                     setFinTrans((prev) => ({
//                         ...prev,
//                         advanceAmt: data[3] || '',
//                         advanceClearedAmt: data[4] || ''
//                     }));
//                 }
//                 if (finTrans.docType === "RE") {


//                     if (data.length === 0) {
//                         toast.error("Data not found", {
//                             autoClose: 800
//                         })

//                         return;
//                     }

//                     setInvoiceData(data.map((item) => {
//                         const invoiceAmt = parseFloat(item[23] || 0); // Ensure it's a number
//                         const tdsPercentage = parseFloat(item[22] || 0); // Ensure it's a number
//                         const tdsAmt = (invoiceAmt * tdsPercentage) / 100; // Calculate TDS Amount
//                         const tdsStatus = item[19] || '';

//                         return {
//                             invoiceNo: item[0] || '',
//                             billingTo: item[2] || '',
//                             billingParty: item[5] || '',
//                             comments: item[6] || '',
//                             importerId: item[7] || '',
//                             importerSrNo: item[8] || '',
//                             importerName: item[9] || '',
//                             invoiceAmt: item[10] || '',
//                             invoiceBalAmt: item[11] || '',
//                             receiptAmt: '',
//                             tdsDeductee: item[21] || '',
//                             tdsStatus: tdsStatus,
//                             tdsPercentage: tdsStatus !== 'Y' ? tdsPercentage : 0,
//                             tdsAmt: tdsStatus !== 'Y' ? tdsAmt.toFixed(2) : 0,
//                             localAmount: item[23] || '',
//                             transId: item[14] || '',
//                         };
//                     }));



                   



//                 }
//                 if (finTrans.docType === "AJ") {


//                     if (data.receipt.length === 0) {
//                         toast.error("Data not found", {
//                             autoClose: 800
//                         })

//                         return;
//                     }

//                     setFinTrans((prev) => ({
//                         ...prev,
//                         advanceAmt: data.advance[3] || '',
//                         advanceClearedAmt: data.advance[4] || ''
//                     }));

//                     setInvoiceData(data.receipt.map((item) => {
//                         const invoiceAmt = parseFloat(item[23] || 0); // Ensure it's a number
//                         const tdsPercentage = parseFloat(item[22] || 0); // Ensure it's a number
//                         const tdsAmt = (invoiceAmt * tdsPercentage) / 100; // Calculate TDS Amount
//                         const tdsStatus = item[19] || '';



//                         return {
//                             invoiceNo: item[0] || '',
//                             billingTo: item[2] || '',
//                             billingParty: item[5] || '',
//                             comments: item[6] || '',
//                             importerId: item[7] || '',
//                             importerSrNo: item[8] || '',
//                             importerName: item[9] || '',
//                             invoiceAmt: item[10] || '',
//                             invoiceBalAmt: item[11] || '',
//                             receiptAmt: '',
//                             tdsDeductee: item[21] || '',
//                             tdsStatus: tdsStatus,
//                             tdsPercentage: tdsStatus !== 'Y' ? tdsPercentage : 0,
//                             tdsAmt: tdsStatus !== 'Y' ? tdsAmt.toFixed(2) : 0,
//                             localAmount: item[23] || '',
//                             transId: item[14] || '',
//                         };
//                     }));

//                 }
//             })
//             .catch((error) => {
//                 if (finTrans.docType === "AD") {
//                     setFinTrans((prev) => ({
//                         ...prev,
//                         advanceAmt: '0',
//                         advanceClearedAmt: '0'
//                     }));
//                 }

//                 toast.error(error.response.data, {
//                     autoClose: 800
//                 })

//                 if (finTrans.docType === "RE") {
//                     setInvoiceData(
//                         [{
//                             invoiceNo: '',
//                             billingTo: '',
//                             billingParty: '',
//                             comments: '',
//                             importerId: '',
//                             importerSrNo: '',
//                             importerName: '',
//                             invoiceAmt: '',
//                             invoiceBalAmt: '',
//                             receiptAmt: '',
//                             tdsDeductee: '',
//                             tdsPercentage: '',
//                             tdsAmt: '',
//                             tdsStatus: '',
//                             localAmount: '',
//                             transId: ''
//                         }]
//                     )
//                 }
//             })
//     }

//     const handleClear = () => {
//         setFinTrans({
//             companyId: "",
//             branchId: "",
//             docType: "",
//             transId: "",
//             transDate: new Date(),
//             status: "",
//             isOnAccPay: "N",
//             createdBy: "",
//             partyId: "",
//             partyName: "",
//             partyGst: "",
//             partyAddress1: "",
//             partyAddress2: "",
//             partyAddress3: "",
//             accSrNo: "",
//             documentAmt: "",
//             narration: "",
//             advanceAmt: '',
//             advanceClearedAmt: '',
//             isReceiptCancel: '',
//         })

//         setPaymentMode([
//             {
//                 payMode: '',
//                 chequeNo: '',
//                 chequeDate: null,
//                 bankDetails: '',
//                 amount: '',
//                 status: ''
//             }
//         ])

//         setInvoiceData([{
//             invoiceNo: '',
//             billingTo: '',
//             billingParty: '',
//             comments: '',
//             importerId: '',
//             importerSrNo: '',
//             importerName: '',
//             invoiceAmt: '',
//             invoiceBalAmt: '',
//             receiptAmt: '',
//             tdsDeductee: '',
//             tdsPercentage: '',
//             tdsAmt: '',
//             tdsStatus: '',
//             localAmount: '',
//             transId: ''
//         }])
//     }


//     function handleInputChange(e, val1, val2) {
//         const inputValue = e.toString(); // Convert e to string
//         const numericInput = inputValue.replace(/[^0-9.]/g, ''); // Remove non-numeric characters
//         const parts = numericInput.split('.'); // Split on decimal point
//         const integerPart = parts[0].slice(0, val1); // Limit integer part to val1 digits

//         let decimalPart = parts[1]; // Get decimal part

//         // If val2 is 0, do not allow any decimal point
//         if (val2 === 0) {
//             return integerPart; // Return only the integer part
//         }

//         // Limit decimal places if val2 > 0
//         if (decimalPart !== undefined) {
//             decimalPart = `.${decimalPart.slice(0, val2)}`; // Limit decimal part to val2 digits
//         }

//         // Combine integer and decimal parts
//         const sanitizedInput = decimalPart !== undefined ? `${integerPart}${decimalPart}` : integerPart;
//         return sanitizedInput; // Return sanitized input
//     }


//     const handlePaymentModeChange = (e, index) => {
//         const { name, value } = e.target;
//         let sanitizeValue = value;

//         if (name === 'amount') {
//             sanitizeValue = handleInputChange(value, 13, 2)
//         }



//         setPaymentMode((prevState) => {
//             const updatedRows = [...prevState];
//             updatedRows[index] = {
//                 ...updatedRows[index],
//                 [name]: sanitizeValue,
//             };
//             return updatedRows;
//         });
//     };


//     const handlePaymentModeChange1 = (e, index) => {
//         const { name, value } = e.target;
//         let sanitizeValue = value;
//         if (name === 'payMode' && value === 'TDS') {


//             let tdsInvoice = invoiceData.filter(
//                 (item) =>
//                     item.invoiceNo !== '' &&
//                     item.tdsStatus !== '' &&
//                     item.tdsStatus === 'N' &&
//                     item.tdsAmt !== '' &&
//                     item.tdsAmt > 0 && item.receiptAmt > 0
//             );

//             const totalTdsAmt = tdsInvoice.reduce(
//                 (total, item) => total + (parseFloat(item.tdsAmt) || 0),
//                 0
//             ).toFixed(2);


//             setPaymentMode((prevState) => {
//                 const updatedRows = [...prevState];

//                 // Update the TDS row
//                 updatedRows[index] = {
//                     ...updatedRows[index],
//                     amount: totalTdsAmt,
//                 };

//                 // Find the ADVANCE row and subtract totalTdsAmt from its amount
//                 const advanceRow = updatedRows.find((row) => row.payMode === 'ADVANCE');
//                 if (advanceRow) {
//                     const currentAdvanceAmt = parseFloat(advanceRow.amount || 0);
//                     advanceRow.amount = (currentAdvanceAmt - parseFloat(totalTdsAmt)).toFixed(2);
//                 }

//                 return updatedRows;
//             });
//         }


//         const filteredPaymentModes = paymentMode.find((item, i) => i === index);

//         if (name === 'amount' && filteredPaymentModes.payMode !== 'TDS') {
//             // Sanitize the input value
//             const sanitizedInput = handleInputChange(value, 13, 2);

//             // Calculate the total invoice amount
//             const totalAmt = invoiceData
//                 .reduce((total, item) => total + (parseFloat(item.receiptAmt) || 0), 0)
//                 .toFixed(2);

//             // Filter payment modes excluding 'TDS' and the current index
//             const filteredPaymentModes = paymentMode.filter((item, i) => item.payMode !== 'TDS' && i !== index);

//             // Calculate the total amount excluding the current item and 'TDS'
//             const currentTotal = filteredPaymentModes
//                 .reduce((total, item) => total + (parseFloat(item.amount) || 0), 0)
//                 .toFixed(2);

//             // Calculate the remaining amount that can be allocated
//         const remainingAmt = parseFloat((parseFloat(totalAmt) - parseFloat(currentTotal)).toFixed(2));

//         console.log('totalAmt : ', totalAmt, ' currentTotal : ', currentTotal, ' remainingAmt ', remainingAmt);


//             // Ensure the new value does not exceed the remaining amount
//             if (parseFloat(sanitizedInput || 0) > remainingAmt) {
//                 sanitizeValue = ''; // Reject the value if it exceeds the remaining amount
//             } else {
//                 sanitizeValue = sanitizedInput; // Accept the value if valid
//             }
//         }


//         setPaymentMode((prevState) => {
//             const updatedRows = [...prevState];
//             updatedRows[index] = {
//                 ...updatedRows[index],
//                 [name]: sanitizeValue,
//             };
//             return updatedRows;
//         });
//     };




//     const handleSave = () => {

//         if (!finTrans.docType) {
//             toast.error("Trans type is required.", {
//                 autoClose: 800
//             })
//             return;
//         }


//         if (!finTrans.partyId) {
//             toast.error("Party id is required.", {
//                 autoClose: 800
//             })
//             return;
//         }

//         if (paymentMode.length === 0) {
//             toast.error("Atleast one payment mode is required.", {
//                 autoClose: 800
//             })
//             return;
//         }

//         for (let i = 0; i < paymentMode.length; i++) {
//             const { chequeNo, chequeDate, amount, payMode } = paymentMode[i];



//             // Check if chequeNo and chequeDate are missing for modes other than CASH and TDS
//             if ((!chequeNo || !chequeDate) && payMode !== 'CASH' && payMode !== 'TDS') {
//                 toast.error(`Error: Cheque details are missing for payment mode entry ${i + 1}.`, {
//                     autoClose: 800,
//                 });
//                 return; // Stop the process if validation fails
//             }


//             if (!amount) {
//                 toast.error(`Error: Amount is required for payment mode entry ${i + 1}.`, {
//                     autoClose: 800,
//                 });
//                 return; // Stop the process if validation fails
//             }
//         }


//         setLoading(true);

//         finTrans.documentAmt = paymentMode.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0).toFixed(2);
//         const formData = {
//             finTransData: finTrans,
//             paymentDto: paymentMode
//         }


//         axios.post(`${ipaddress}receipt/saveAdvanceReceipt`, formData, {
//             headers: {
//                 Authorization: `Bearer ${jwtToken}`
//             },
//             params: {
//                 cid: companyid,
//                 bid: branchId,
//                 user: userId
//             }
//         })
//             .then((response) => {
//                 setLoading(false);
//                 const data = response.data;
//                 console.log('data ', data);

//                 const singleData = data.finTransData[0];
//                 const balData = data.bal;

//                 setFinTrans({
//                     companyId: "",
//                     branchId: "",
//                     docType: singleData[1] || "",
//                     transId: singleData[0] || "",
//                     transDate: singleData[2] === null ? null : new Date(singleData[2]),
//                     status: singleData[4] || "",
//                     isOnAccPay: "N",
//                     createdBy: singleData[5] || "",
//                     partyId: singleData[6] || "",
//                     partyName: singleData[7] || "",
//                     partyGst: singleData[9] || "",
//                     partyAddress1: singleData[10] || "",
//                     partyAddress2: singleData[11] || "",
//                     partyAddress3: singleData[12] || "",
//                     accSrNo: singleData[8] || "",
//                     documentAmt: singleData[3] || "",
//                     narration: singleData[13] || "",
//                     advanceAmt: balData[3] || "0",
//                     advanceClearedAmt: balData[4] || "0",
//                     isReceiptCancel: singleData[19] || "",
//                 })


//                 setPaymentMode(data.finTransData.map((item) => (
//                     {
//                         payMode: item[14] || '',
//                         chequeNo: item[15] || '',
//                         chequeDate: item[16] === null ? null : new Date(item[16]),
//                         bankDetails: item[17] || '',
//                         amount: item[18] || '',
//                         status: item[4] || '',
//                     }
//                 )))


//                 toast.success("Data save successfully!!", {
//                     autoClose: 800
//                 })
//             })
//             .catch((error) => {
//                 toast.error(error.response.data, {
//                     autoClose: 800
//                 })
//                 setLoading(false);
//             })
//     }


//     console.log('invData  : \n', invoiceData);





//     const handleSave1 = () => {

//         if (!finTrans.docType) {
//             toast.error("Trans type is required.", {
//                 autoClose: 800
//             })
//             return;
//         }


//         if (!finTrans.partyId) {
//             toast.error("Party id is required.", {
//                 autoClose: 800
//             })
//             return;
//         }

//         let invData = invoiceData.filter(item => (item.invoiceNo !== '' && (item.receiptAmt !== '' && item.receiptAmt > 0)))

//         const totalTdsAmt = invData.reduce((total, item) => total + (parseFloat(item.tdsAmt) || 0), 0).toFixed(2);

//         if (invData.length === 0) {
//             toast.error("Please enter receipt amount.", {
//                 autoClose: 800
//             })
//             return;
//         }

//         if (paymentMode.length === 0) {
//             toast.error("Atleast one payment mode is required.", {
//                 autoClose: 800
//             })
//             return;
//         }

//         for (let i = 0; i < paymentMode.length; i++) {
//             const { chequeNo, chequeDate, amount, payMode } = paymentMode[i];



//             // Check if chequeNo and chequeDate are missing for modes other than CASH and TDS
//             if ((!chequeNo || !chequeDate) && payMode !== 'CASH' && payMode !== 'TDS' && payMode !== 'ADVANCE') {
//                 toast.error(`Error: Cheque details are missing for payment mode entry ${i + 1}.`, {
//                     autoClose: 800,
//                 });
//                 return; // Stop the process if validation fails
//             }


//             if (!amount) {
//                 toast.error(`Error: Amount is required for payment mode entry ${i + 1}.`, {
//                     autoClose: 800,
//                 });
//                 return; // Stop the process if validation fails
//             }
//         }

//         let tdsData = paymentMode.filter(item => item.payMode === 'TDS' && item.amount > 0)
//         let receiptAmt = invData.reduce((total, item) => total + (parseFloat(item.receiptAmt) || 0), 0).toFixed(2);
//         let paymentAmt = paymentMode.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0).toFixed(2);

//         if (finTrans.docType === 'AJ') {
//             let wtTdsData = paymentMode.filter(item => item.payMode === 'ADVANCE' && item.amount > 0)

//             let paymentAmtWtTds = wtTdsData.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0).toFixed(2);


//             if (finTrans.advanceClearedAmt < paymentAmtWtTds) {
//                 toast.error(`The advance amount exceeds the balance for the cleared amount. Please add the advance first.`, {
//                     autoClose: 800,
//                 });
//                 return; // Stop the process if validation failsF
//             }
//         }

//         if (tdsData.length > 0) {
//             const paymentTdsAmt = tdsData.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0).toFixed(2);


//             if (paymentTdsAmt !== totalTdsAmt) {
//                 toast.error(`The TDS amount entered is incorrect. The correct TDS amount is ${totalTdsAmt}. Please update it accordingly.`, {
//                     autoClose: 800,
//                 });
//                 return; // Halt the process if the validation fails
//             }

//             if (receiptAmt !== paymentAmt) {
//                 toast.error(`Total Receipt Amt and Total Invoice Amt Should be Equal`, {
//                     autoClose: 800,
//                 });
//                 return; // Stop the process if validation fails
//             }

//         }
//         else {
//             if (receiptAmt !== paymentAmt) {
//                 toast.error(`Total Receipt Amt and Total Invoice Amt Should be Equal`, {
//                     autoClose: 800,
//                 });
//                 return; // Stop the process if validation fails
//             }
//         }





//         setLoading(true);

//         finTrans.documentAmt = paymentMode.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0).toFixed(2);
//         const formData = {
//             finTransData: finTrans,
//             invoiceDto: invData,
//             paymentDto: paymentMode
//         }


//         axios.post(`${ipaddress}receipt/saveReceipt`, formData, {
//             headers: {
//                 Authorization: `Bearer ${jwtToken}`
//             },
//             params: {
//                 cid: companyid,
//                 bid: branchId,
//                 user: userId,
//                 type: finTrans.docType
//             }
//         })
//             .then((response) => {
//                 setLoading(false);
//                 const data = response.data;

//                 const singleData = data.finTransData[0];
//                 const advanceData = (data.advance === null || data.advance === undefined) ? null : data.advance;

//                 setFinTrans({
//                     companyId: "",
//                     branchId: "",
//                     docType: singleData[1] || "",
//                     transId: singleData[0] || "",
//                     transDate: singleData[2] === null ? null : new Date(singleData[2]),
//                     status: singleData[4] || "",
//                     isOnAccPay: "N",
//                     createdBy: singleData[5] || "",
//                     partyId: singleData[6] || "",
//                     partyName: singleData[7] || "",
//                     partyGst: singleData[9] || "",
//                     partyAddress1: singleData[10] || "",
//                     partyAddress2: singleData[11] || "",
//                     partyAddress3: singleData[12] || "",
//                     accSrNo: singleData[8] || "",
//                     documentAmt: singleData[3] || "",
//                     narration: singleData[13] || "",
//                     advanceAmt: advanceData === null ? "0" : advanceData[3] || "0",
//                     advanceClearedAmt: advanceData === null ? "0" : advanceData[4] || "0",
//                     isReceiptCancel: singleData[19] || "",
//                 })


//                 setPaymentMode(data.finTransData.map((item) => (
//                     {
//                         payMode: item[14] || '',
//                         chequeNo: item[15] || '',
//                         chequeDate: item[16] === null ? null : new Date(item[16]),
//                         bankDetails: item[17] || '',
//                         amount: item[18] || '',
//                         status: item[4] || '',
//                         transId: singleData[0] || "",
//                         lineId: item[20] || "",
//                     }
//                 )))

//                 // setInvoiceData(data.finTransInvData.map((item) => (
//                 //     {
//                 //         invoiceNo: item[0] || '',
//                 //         billingTo: item[2] || '',
//                 //         billingParty: item[3] || '',
//                 //         comments: item[4] || '',
//                 //         importerId: item[5] || '',
//                 //         importerSrNo: '',
//                 //         importerName: item[6] || '',
//                 //         invoiceAmt: item[7] || '',
//                 //         invoiceBalAmt: item[8] || '',
//                 //         receiptAmt: item[9] || '',
//                 //         tdsDeductee: item[12] || '',
//                 //         tdsAmt: item[11] || '',
//                 //         tdsStatus: item[10] || '',
//                 //         localAmount: item[13] || '',
//                 //         transId: item[14] || '',

//                 //     }
//                 // )));


//                 const finTransMapped = (data.finTransInvData || []).map((item) => {
//                     const invoiceAmt = parseFloat(item[14] || 0);
//                     const tdsPercentage = parseFloat(item[13] || 0);
//                     const tdsStatus = item[10] || '';
//                     const tdsAmt = (invoiceAmt * tdsPercentage) / 100;

//                     return {
//                         invoiceNo: item[0] || '',
//                         billingTo: item[2] || '',
//                         billingParty: item[3] || '',
//                         comments: item[4] || '',
//                         importerId: item[5] || '',
//                         importerSrNo: '',
//                         importerName: item[6] || '',
//                         invoiceAmt: item[7] || '',
//                         invoiceBalAmt: item[8] || '',
//                         receiptAmt: item[9] || '',
//                         tdsDeductee: item[12] || '',
//                         tdsStatus,
//                         tdsPercentage: tdsStatus !== 'Y' ? tdsPercentage : 0,
//                         tdsAmt: tdsStatus !== 'Y' ? tdsAmt.toFixed(2) : 0,
//                         localAmount: item[14] || '',
//                         transId: item[15] || '',
//                     };
//                 });

//                 const preInvoiceMapped = (data.preInvoiceData || []).map((item) => {
//                     const invoiceAmt = parseFloat(item[23] || 0);
//                     const tdsPercentage = parseFloat(item[22] || 0);
//                     const tdsStatus = item[19] || '';
//                     const tdsAmt = (invoiceAmt * tdsPercentage) / 100;

//                     return {
//                         invoiceNo: item[0] || '',
//                         billingTo: item[2] || '',
//                         billingParty: item[5] || '',
//                         comments: item[6] || '',
//                         importerId: item[7] || '',
//                         importerSrNo: item[8] || '',
//                         importerName: item[9] || '',
//                         invoiceAmt: item[10] || '',
//                         invoiceBalAmt: item[11] || '',
//                         receiptAmt: '',
//                         tdsDeductee: item[21] || '',
//                         tdsStatus,
//                         tdsPercentage: tdsStatus !== 'Y' ? tdsPercentage : 0,
//                         tdsAmt: tdsStatus !== 'Y' ? tdsAmt.toFixed(2) : 0,
//                         localAmount: item[23] || '',
//                         transId: item[14] || '',
//                     };
//                 });

//                 // Combine and set
//                 setInvoiceData([...finTransMapped, ...preInvoiceMapped]);









//                 setSavedInvoiceData(data.finTransInvData.map((item) => (
//                     {
//                         invoiceNo: item[0] || '',
//                         billingTo: item[2] || '',
//                         billingParty: item[3] || '',
//                         comments: item[4] || '',
//                         importerId: item[5] || '',
//                         importerSrNo: '',
//                         importerName: item[6] || '',
//                         invoiceAmt: item[7] || '',
//                         invoiceBalAmt: item[8] || '',
//                         receiptAmt: item[9] || '',
//                         tdsDeductee: item[12] || '',
//                         tdsAmt: item[11] || '',
//                         tdsStatus: item[10] || '',
//                         localAmount: item[13] || '',
//                         transId: item[14] || '',
//                     }
//                 )));



//                 toast.success("Data save successfully!!", {
//                     autoClose: 800
//                 })
//             })
//             .catch((error) => {
//                 console.log('error ', error);

//                 toast.error(error.response.data, {
//                     autoClose: 800
//                 })
//                 setLoading(false);
//             })
//     }



//     const [isModalOpenForSearchGateInData, setIsModalOpenForGateInData] = useState(false);
//     const [searchId, setSearchId] = useState('');
//     const [gateInSearchData, setGateInSearchData] = useState([]);

//     const openGateInModal = () => {
//         setIsModalOpenForGateInData(true);
//         searchExportEmptyContainerGateIn('');
//         setSearchId('');
//     }

//     const closeGateInModal = () => {
//         setIsModalOpenForGateInData(false);
//         setSearchId('');
//         setGateInSearchData([]);
//     }

//     const searchExportEmptyContainerGateIn = (id) => {
//         setLoading(true);
//         axios.get(`${ipaddress}receipt/getAfterSaveData?cid=${companyid}&bid=${branchId}&val=${id}`, {
//             headers: {
//                 Authorization: `Bearer ${jwtToken}`
//             }
//         })
//             .then((response) => {
//                 setGateInSearchData(response.data);
//                 setLoading(false);
//                 toast.success("Data found successfully!!", {
//                     autoClose: 800
//                 })
//             })
//             .catch((error) => {
//                 setGateInSearchData([]);
//                 setLoading(false);
//                 toast.error(error.response.data, {
//                     autoClose: 800
//                 })
//             })
//     }

//     const handleSearchClear = () => {
//         searchExportEmptyContainerGateIn('');
//         setSearchId('');
//     }

//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(5);

//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = gateInSearchData.slice(indexOfFirstItem, indexOfLastItem);
//     const totalPages = Math.ceil(gateInSearchData.length / itemsPerPage);

//     // Function to handle page change
//     const handlePageChange = (page) => {
//         if (page >= 1 && page <= totalPages) {
//             setCurrentPage(page);
//         }
//     };
//     const displayPages = () => {
//         const centerPageCount = 5;
//         const middlePage = Math.floor(centerPageCount / 2);
//         let startPage = currentPage - middlePage;
//         let endPage = currentPage + middlePage;

//         if (startPage < 1) {
//             startPage = 1;
//             endPage = Math.min(totalPages, centerPageCount);
//         }

//         if (endPage > totalPages) {
//             endPage = totalPages;
//             startPage = Math.max(1, totalPages - centerPageCount + 1);
//         }

//         return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
//     };


//     const getSelectedReceiptData = (val, id, type) => {
//         axios.get(`${ipaddress}receipt/getReceiptSelectedData?cid=${companyid}&bid=${branchId}&val=${val}&id=${id}&type=${type}`, {
//             headers: {
//                 Authorization: `Bearer ${jwtToken}`
//             }
//         })
//             .then((response) => {
//                 setLoading(false);
//                 const data = response.data;

//                 console.log(' data  getReceiptSelectedData \n ', data);
                

//                 const singleData = data.finTransData[0];
//                 const advanceData = data.advance;

//                 setFinTrans({
//                     companyId: "",
//                     branchId: "",
//                     docType: singleData[1] || "",
//                     transId: singleData[0] || "",
//                     transDate: singleData[2] === null ? null : new Date(singleData[2]),
//                     status: singleData[4] || "",
//                     isOnAccPay: "N",
//                     createdBy: singleData[5] || "",
//                     partyId: singleData[6] || "",
//                     partyName: singleData[7] || "",
//                     partyGst: singleData[9] || "",
//                     partyAddress1: singleData[10] || "",
//                     partyAddress2: singleData[11] || "",
//                     partyAddress3: singleData[12] || "",
//                     accSrNo: singleData[8] || "",
//                     documentAmt: singleData[3] || "",
//                     narration: singleData[13] || "",
//                     advanceAmt: advanceData === null ? "0" : advanceData[3] || "0",
//                     advanceClearedAmt: advanceData === null ? "0" : advanceData[4] || "0",
//                     isReceiptCancel: singleData[19] || "",
//                 })


//                 // setPaymentMode(data.finTransData.map((item) => (
//                 //     {
//                 //         payMode: item[14] || '',
//                 //         chequeNo: item[15] || '',
//                 //         chequeDate: item[16] === null ? null : new Date(item[16]),
//                 //         bankDetails: item[17] || '',
//                 //         amount: item[18] || '',
//                 //         status: item[4] || '',
//                 //     }
//                 // )))

//                 // if (data.finTransInvData.length > 0) {
//                 //     setInvoiceData(data.finTransInvData.map((item) => (
//                 //         {
//                 //             invoiceNo: item[0] || '',
//                 //             billingTo: item[2] || '',
//                 //             billingParty: item[3] || '',
//                 //             comments: item[4] || '',
//                 //             importerId: item[5] || '',
//                 //             importerSrNo: '',
//                 //             importerName: item[6] || '',
//                 //             invoiceAmt: item[7] || '',
//                 //             invoiceBalAmt: item[8] || '',
//                 //             receiptAmt: item[9] || '',
//                 //             tdsDeductee: '',
//                 //             tdsAmt: '',
//                 //             tdsStatus: '',
//                 //             localAmount: ''
//                 //         }
//                 //     )))
//                 // }


//                 setPaymentMode(data.finTransData.map((item) => (
//                     {
//                         payMode: item[14] || '',
//                         chequeNo: item[15] || '',
//                         chequeDate: item[16] === null ? null : new Date(item[16]),
//                         bankDetails: item[17] || '',
//                         amount: item[18] || '',
//                         status: item[4] || '',
//                         transId: singleData[0] || "",
//                         lineId: item[20] || "",
//                     }
//                 )))







//  const finTransMapped = (data.finTransInvData || []).map((item) => {
//                         const invoiceAmt = parseFloat(item[14] || 0);
//                         const tdsPercentage = parseFloat(item[13] || 0);
//                         const tdsStatus = item[10] || '';
//                         const tdsAmt = (invoiceAmt * tdsPercentage) / 100;

//                         return {
//                             invoiceNo: item[0] || '',
//                             billingTo: item[2] || '',
//                             billingParty: item[3] || '',
//                             comments: item[4] || '',
//                             importerId: item[5] || '',
//                             importerSrNo: '',
//                             importerName: item[6] || '',
//                             invoiceAmt: item[7] || '',
//                             invoiceBalAmt: item[8] || '',
//                             receiptAmt: item[9] || '',
//                             tdsDeductee: item[12] || '',
//                             tdsStatus,
//                             tdsPercentage: tdsStatus !== 'Y' ? tdsPercentage : 0,
//                             tdsAmt: tdsStatus !== 'Y' ? tdsAmt.toFixed(2) : 0,
//                             localAmount: item[14] || '',
//                             transId: item[15] || '',
//                         };
//                     });

//                     const preInvoiceMapped = (data.preInvoiceData || []).map((item) => {
//                         const invoiceAmt = parseFloat(item[23] || 0);
//                         const tdsPercentage = parseFloat(item[22] || 0);
//                         const tdsStatus = item[19] || '';
//                         const tdsAmt = (invoiceAmt * tdsPercentage) / 100;

//                         return {
//                             invoiceNo: item[0] || '',
//                             billingTo: item[2] || '',
//                             billingParty: item[5] || '',
//                             comments: item[6] || '',
//                             importerId: item[7] || '',
//                             importerSrNo: item[8] || '',
//                             importerName: item[9] || '',
//                             invoiceAmt: item[10] || '',
//                             invoiceBalAmt: item[11] || '',
//                             receiptAmt: '',
//                             tdsDeductee: item[21] || '',
//                             tdsStatus,
//                             tdsPercentage: tdsStatus !== 'Y' ? tdsPercentage : 0,
//                             tdsAmt: tdsStatus !== 'Y' ? tdsAmt.toFixed(2) : 0,
//                             localAmount: item[23] || '',
//                             transId: item[14] || '',
//                         };
//                     });

//                     // Combine and set
//                     setInvoiceData([...finTransMapped, ...preInvoiceMapped]);


















//                 setSavedInvoiceData(data.finTransInvData.map((item) => (
//                     {
//                         invoiceNo: item[0] || '',
//                         billingTo: item[2] || '',
//                         billingParty: item[3] || '',
//                         comments: item[4] || '',
//                         importerId: item[5] || '',
//                         importerSrNo: '',
//                         importerName: item[6] || '',
//                         invoiceAmt: item[7] || '',
//                         invoiceBalAmt: item[8] || '',
//                         receiptAmt: item[9] || '',
//                         tdsDeductee: item[12] || '',
//                         tdsAmt: item[11] || '',
//                         tdsStatus: item[10] || '',
//                         localAmount: item[14] || '',
//                         transId: item[15] || '',
//                     }
//                 )));


//                 toast.success("Data found successfully!!", {
//                     autoClose: 800
//                 })

//                 closeGateInModal();
//             })
//             .catch((error) => {
//                 toast.error(error.response.data, {
//                     autoClose: 800
//                 })
//             })
//     }

//     const [showModalforPrintReciept, setShowModalforPrintReciept] = useState(false);
//     const handleCloseModalPrint = () => {

//         setShowModalforPrintReciept(false);
//     };
//     const handleModelOPenForPrintReciept = () => {
//         setShowModalforPrintReciept(true);

//     }


//     const handlePrint1 = async (type) => {
//         setLoading(true);
//         console.log("inside the print")

//         // finTrans.transId
//         console.log("finTrans.transId", finTrans.transId);
//         console.log("finTrans.transId", finTrans.docType);
//         const transId = finTrans.transId;
//         const docType = finTrans.docType;

//         axios.post(`${ipaddress}receiptprint/advreceipt/${companyid}/${branchId}/${transId}/${docType}`, {}, {
//             headers: {

//                 Authorization: `Bearer ${jwtToken}`,
//                 "Content-Type": "application/json",
//             }
//         })
//             .then(response => {
//                 // console.log('Response:', response.data); // Handle success
//                 const pdfBase64 = response.data;
//                 const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
//                 const blobUrl = URL.createObjectURL(pdfBlob);
//                 window.open(blobUrl, '_blank');
//                 setLoading(false);


//             })
//             .catch(error => {
//                 console.error('Error in handlePrint:', error.message);
//                 setLoading(false);
//                 //   Handle the error as needed, e.g., show an error toast or message
//                 // toast.error(`Error: ${error.message}`, {
//                 //       //     position: toast.POSITION.TOP_CENTER,
//                 //       //     autoClose: 2000,
//                 //       // });
//                 //     }
//             });


//     }



//     // console.log('FintransData : \n', finTrans);


//     const handleCancelReciept = async (transId, narration, docType, partyId) => {
//         console.log('transId, narration, docType, partyId ', transId, narration, docType, partyId);


//         Swal.fire({
//             title: "Are you sure?",
//             text: "You want to cancel the receipt!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, cancel it!"
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 setLoading(true);
//                 try {
//                     const response = await axios.get(`${ipaddress}receipt/receiptCancel`, {
//                         params: {
//                             companyId: companyid,
//                             branchId,
//                             transId,
//                             userId, narration, docType
//                         }
//                     });

//                     console.log('handleCancelReciept : ', response.data);

//                     Swal.fire({
//                         title: "Cancelled!",
//                         text: "The receipt has been cancelled.",
//                         icon: "success"
//                     });
//                     getSelectedReceiptData(transId, partyId, docType);
//                 } catch (error) {
//                     Swal.fire({
//                         icon: "error",
//                         title: "Oops...",
//                         text: "Something went wrong while cancelling the receipt!"
//                     });
//                     console.error("Error in handleCancelReciept:", error);
//                 } finally {
//                     setLoading(false);
//                 }
//             }
//         });
//     };










//     return (
//         <div>
//             {loading && (
//                 <div style={styles.overlay}>
//                     <div className="loader">
//                         <div className="truckWrapper">
//                             <div className="truckBody">
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="none"
//                                     viewBox="0 0 198 93"
//                                     className="trucksvg"
//                                 >
//                                     <path
//                                         strokeWidth="3"
//                                         stroke="#282828"
//                                         fill="#F83D3D"
//                                         d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
//                                     ></path>
//                                     <path
//                                         strokeWidth="3"
//                                         stroke="#282828"
//                                         fill="#7D7C7C"
//                                         d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
//                                     ></path>
//                                     <path
//                                         strokeWidth="2"
//                                         stroke="#282828"
//                                         fill="#282828"
//                                         d="M150 65C150 65.39 149.763 65.8656 149.127 66.2893C148.499 66.7083 147.573 67 146.5 67C145.427 67 144.501 66.7083 143.873 66.2893C143.237 65.8656 143 65.39 143 65C143 64.61 143.237 64.1344 143.873 63.7107C144.501 63.2917 145.427 63 146.5 63C147.573 63 148.499 63.2917 149.127 63.7107C149.763 64.1344 150 64.61 150 65Z"
//                                     ></path>
//                                     <rect
//                                         strokeWidth="2"
//                                         stroke="#282828"
//                                         fill="#FFFCAB"
//                                         rx="1"
//                                         height="7"
//                                         width="5"
//                                         y="63"
//                                         x="187"
//                                     ></rect>
//                                     <rect
//                                         strokeWidth="2"
//                                         stroke="#282828"
//                                         fill="#282828"
//                                         rx="1"
//                                         height="11"
//                                         width="4"
//                                         y="81"
//                                         x="193"
//                                     ></rect>
//                                     <rect
//                                         strokeWidth="3"
//                                         stroke="#282828"
//                                         fill="#DFDFDF"
//                                         rx="2.5"
//                                         height="90"
//                                         width="121"
//                                         y="1.5"
//                                         x="6.5"
//                                     ></rect>
//                                     <rect
//                                         strokeWidth="2"
//                                         stroke="#282828"
//                                         fill="#DFDFDF"
//                                         rx="2"
//                                         height="4"
//                                         width="6"
//                                         y="84"
//                                         x="1"
//                                     ></rect>
//                                 </svg>
//                             </div>
//                             <div className="truckTires">
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="none"
//                                     viewBox="0 0 30 30"
//                                     className="tiresvg"
//                                 >
//                                     <circle
//                                         strokeWidth="3"
//                                         stroke="#282828"
//                                         fill="#282828"
//                                         r="13.5"
//                                         cy="15"
//                                         cx="15"
//                                     ></circle>
//                                     <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
//                                 </svg>
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="none"
//                                     viewBox="0 0 30 30"
//                                     className="tiresvg"
//                                 >
//                                     <circle
//                                         strokeWidth="3"
//                                         stroke="#282828"
//                                         fill="#282828"
//                                         r="13.5"
//                                         cy="15"
//                                         cx="15"
//                                     ></circle>
//                                     <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
//                                 </svg>
//                             </div>
//                             <div className="road"></div>
//                             <svg
//                                 xmlSpace="preserve"
//                                 viewBox="0 0 453.459 453.459"
//                                 xmlnsXlink="http://www.w3.org/1999/xlink"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 id="Capa_1"
//                                 version="1.1"
//                                 fill="#000000"
//                                 className="lampPost"
//                             >
//                                 <path
//                                     d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993
//             c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514
//             c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16
//             c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914
//             h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75
//             v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795
//             V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0z
//             M232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017
//             h78.747C231.693,100.736,232.77,106.162,232.77,111.694z"
//                                 ></path>
//                             </svg>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <Modal
//                 isOpen={showModalforPrintReciept}
//                 toggle={handleCloseModalPrint}
//                 style={{ maxWidth: 600 }}
//             >
//                 <ModalHeader
//                     toggle={handleCloseModalPrint}
//                     style={{
//                         backgroundColor: "#80cbc4",
//                         color: "black",
//                         fontFamily: "Your-Heading-Font",
//                         textAlign: "center",
//                         background: "#26a69a",
//                         boxShadow: "0px 5px 10px rgba(0, 77, 64, 0.3)",
//                         border: "1px solid rgba(0, 0, 0, 0.3)",
//                         borderRadius: "0",
//                         backgroundColor: "#85144b",
//                         backgroundColor: "rgba(0, 0, 0, 0.3)",
//                         backgroundImage:
//                             'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
//                         backgroundSize: "cover",
//                         backgroundRepeat: "no-repeat",
//                         //backgroundPosition: 'center',
//                         backgroundPosition: "center",
//                     }}
//                 >
//                     {/* <FontAwesomeIcon icon="fa-solid fa-truck-arrow-right" style={{ marginRight: '9px' }}/> */}
//                     <FontAwesomeIcon icon={faArrowUpFromBracket}
//                         style={{ marginRight: "9px" }}
//                     />
//                     View Receipt
//                 </ModalHeader>
//                 <ModalBody
//                     style={{
//                         backgroundImage:
//                             "url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)",
//                         backgroundSize: "cover",
//                     }}
//                 >


//                     <Form>

//                         {/* Example form fields for the modal */}
//                         <Row>
//                             <Col md={6}>
//                                 <Card
//                                     style={{
//                                         width: '95%'
//                                     }}
//                                 >
//                                     <img
//                                         alt="Sample"
//                                         style={{ width: '100%', height: '300px', objectFit: 'contain' }}
//                                         src={printformat1}

//                                     />
//                                     <CardBody>
//                                         <CardTitle tag="h5">
//                                             Receipt Format 1
//                                         </CardTitle>
//                                         {/* <CardSubtitle
//                       className="mb-2 text-muted"
//                       tag="h6"
//                     >
//                       Set Default
//                       <Input type="radio" name="radio1" style={{ marginLeft: "10px" }} />

//                     </CardSubtitle> */}

//                                         <Button color="primary" outline
//                                         // onClick={() => handlePrint("PRINT")}
//                                         >
//                                             <FontAwesomeIcon
//                                                 icon={faUsersViewfinder}
//                                                 style={{ marginRight: "5px" }}
//                                             />
//                                             View
//                                         </Button>

//                                     </CardBody>
//                                 </Card>
//                             </Col>

//                             <Col md={6}>
//                                 <Card
//                                     style={{
//                                         width: '95%'
//                                     }}
//                                 >
//                                     <img
//                                         alt="Sample"
//                                         style={{ width: '100%', height: '300px', objectFit: 'contain' }}
//                                         src={printformat2}

//                                     />
//                                     <CardBody>
//                                         <CardTitle tag="h5">
//                                             Receipt  Format 2
//                                         </CardTitle>
//                                         {/* <CardSubtitle
//                       className="mb-2 text-muted"
//                       tag="h6"
//                     >
//                       Set Default
//                       <Input type="radio" name="radio1" style={{ marginLeft: "10px" }} />
//                     </CardSubtitle> */}

//                                         <Button color="primary" outline
//                                             onClick={() => handlePrint1("PRINT")}
//                                         >
//                                             <FontAwesomeIcon
//                                                 icon={faUsersViewfinder}
//                                                 style={{ marginRight: "5px" }}
//                                             />
//                                             View
//                                         </Button>
//                                     </CardBody>
//                                 </Card>
//                             </Col>

//                         </Row>



//                         {/* Add more form fields as needed */}
//                     </Form>
//                 </ModalBody>
//                 <ModalFooter
//                     style={{
//                         backgroundImage:
//                             "url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)",
//                         backgroundSize: "cover",
//                         display: "flex",
//                         justifyContent: "center",

//                     }}
//                 >

//                     <div className="d-flex justify-content-center">
//                         <Button color="danger" outline onClick={handleCloseModalPrint}>
//                             <FontAwesomeIcon
//                                 icon={faBackward}
//                                 style={{ marginRight: "5px" }}
//                             />
//                             Back
//                         </Button>

//                     </div>
//                 </ModalFooter>
//             </Modal>


//             <Modal Modal isOpen={isModalOpenForSearchGateInData} onClose={closeGateInModal} toggle={closeGateInModal} style={{ maxWidth: '1200px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

//                 <ModalHeader toggle={closeGateInModal} style={{
//                     backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
//                     boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
//                     border: '1px solid rgba(0, 0, 0, 0.3)',
//                     borderRadius: '0',
//                     backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
//                     backgroundSize: 'cover',
//                     backgroundRepeat: 'no-repeat',
//                     //backgroundPosition: 'center',
//                     backgroundPosition: 'center',
//                 }} >


//                     <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', color: 'white' }} > <FontAwesomeIcon
//                         icon={faSearch}
//                         style={{
//                             marginRight: '8px',
//                             color: 'white', // Set the color to golden
//                         }}
//                     /> Search Receipt Data</h5>



//                 </ModalHeader>
//                 <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
//                     <Row>
//                         <Col md={5}>
//                             <FormGroup>
//                                 <label className="forlabel bold-label" htmlFor="sbRequestId">
//                                     Search by DOC Type / DOC No / Party Name
//                                 </label>
//                                 <input
//                                     className="form-control"
//                                     type="text"
//                                     id="searchId"
//                                     name='searchId'
//                                     value={searchId}
//                                     onChange={(e) => setSearchId(e.target.value)}
//                                 />

//                             </FormGroup>
//                         </Col>
//                         <Col md={4} style={{ marginTop: 20 }}>
//                             <button
//                                 className="btn btn-outline-primary btn-margin newButton"
//                                 style={{ marginRight: 10, fontSize: 12 }}
//                                 id="submitbtn2"
//                                 onClick={() => searchExportEmptyContainerGateIn(searchId)}

//                             >
//                                 <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
//                                 Search
//                             </button>
//                             <button
//                                 className="btn btn-outline-danger btn-margin newButton"
//                                 style={{ marginRight: 10, fontSize: 12 }}
//                                 id="submitbtn2"
//                                 onClick={handleSearchClear}
//                             >
//                                 <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
//                                 Reset
//                             </button>
//                         </Col>
//                     </Row>
//                     <hr />

//                     <div className="mt-1 table-responsive ">
//                         <table className="table table-bordered table-hover tableHeader">
//                             <thead className='tableHeader'>
//                                 <tr className='text-center'>
//                                     <th scope="col">#</th>
//                                     <th scope="col">DOC Type</th>
//                                     <th scope="col">DOC No</th>
//                                     <th scope="col">Trans Date</th>
//                                     <th scope="col">Party Name</th>
//                                 </tr>
//                                 <tr className='text-center'>
//                                     <th scope="col"></th>
//                                     <th scope="col">{gateInSearchData.length}</th>
//                                     <th scope="col"></th>
//                                     <th scope="col"></th>
//                                     <th scope="col"></th>

//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {currentItems.map((item, index) => (
//                                     <tr key={index} className='text-center'>
//                                         <td>
//                                             <input type="radio" onChange={() => getSelectedReceiptData(item[1], item[3], item[0])} name="radioGroup" value={item[0]} />
//                                         </td>
//                                         <td>{item[0]}</td>
//                                         <td>{item[1]}</td>
//                                         <td>{item[2]}</td>
//                                         <td>{item[4]}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                         <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
//                             <Pagination.First onClick={() => handlePageChange(1)} />
//                             <Pagination.Prev
//                                 onClick={() => handlePageChange(currentPage - 1)}
//                                 disabled={currentPage === 1}
//                             />
//                             <Pagination.Ellipsis />

//                             {displayPages().map((pageNumber) => (
//                                 <Pagination.Item
//                                     key={pageNumber}
//                                     active={pageNumber === currentPage}
//                                     onClick={() => handlePageChange(pageNumber)}
//                                 >
//                                     {pageNumber}
//                                 </Pagination.Item>
//                             ))}

//                             <Pagination.Ellipsis />
//                             <Pagination.Next
//                                 onClick={() => handlePageChange(currentPage + 1)}
//                                 disabled={currentPage === totalPages}
//                             />
//                             <Pagination.Last onClick={() => handlePageChange(totalPages)} />
//                         </Pagination>
//                     </div>
//                 </ModalBody>
//             </Modal>

//             <Row>
//                 <Col md={2}>
//                     <FormGroup>
//                         <label className="forlabel bold-label" htmlFor="sbRequestId">
//                             Trans type
//                         </label>
//                         <Input
//                             className="form-control"
//                             type="select"
//                             id="docType"
//                             name='docType'
//                             value={finTrans.docType}
//                             onChange={handleChange}

//                         >
//                             <option value=""></option>
//                             <option value="AD">Advance</option>
//                             <option value="RE">Receipt</option>
//                             <option value="AJ">Adjustment</option>
//                         </Input>

//                     </FormGroup>
//                 </Col>
//                 <Col md={2}>
//                     <FormGroup>
//                         <label className="forlabel bold-label" htmlFor="sbRequestId">
//                             Receipt Id
//                         </label>
//                         <Row>
//                             <Col md={9}>
//                                 <Input
//                                     className="form-control"
//                                     type="text"
//                                     id="transId"
//                                     name='transId'
//                                     value={finTrans.transId}
//                                     onChange={handleChange}
//                                     disabled
//                                 />
//                             </Col>
//                             <Col md={3} className="d-flex justify-content-end" >
//                                 <button
//                                     className="btn btn-outline-primary btn-margin newButton"
//                                     style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//                                     id="submitbtn2"
//                                     onClick={openGateInModal}
//                                 >
//                                     <FontAwesomeIcon icon={faSearch} size="sm" s />
//                                 </button>
//                             </Col>
//                         </Row>


//                     </FormGroup>
//                 </Col>
//                 <Col md={2}>
//                     <FormGroup>
//                         <label className="forlabel bold-label" htmlFor="sbRequestId">
//                             Receipt Date
//                         </label>
//                         <div style={{ position: 'relative' }}>
//                             <DatePicker
//                                 selected={finTrans.transDate}
//                                 disabled
//                                 id='transDate'
//                                 name='transDate'
//                                 dateFormat="dd/MM/yyyy HH:mm"
//                                 className="form-control border-right-0 InputField"
//                                 customInput={<Input style={{ width: '100%' }} />}
//                                 wrapperClassName="custom-react-datepicker-wrapper"
//                             />
//                             <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
//                         </div>

//                     </FormGroup>
//                 </Col>
//                 {/* <Col md={2}>
//                     <FormGroup>
//                         <label className="forlabel bold-label" htmlFor="sbRequestId">
//                             Is On Account Pay
//                         </label>
//                         <Input
//                             className="form-control"
//                             type="checkbox"
//                             style={{ height: 25 }}
//                             id="isOnAccPay"
//                             name='isOnAccPay'
//                             value={finTrans.isOnAccPay}
//                             onChange={handleChange}
//                         />

//                     </FormGroup>
//                 </Col> */}

//                 <Col md={2}>
//                     <FormGroup>
//                         <label className="forlabel bold-label" htmlFor="sbRequestId">
//                             Receipt Amt
//                         </label>
//                         <Input
//                             className="form-control"
//                             type="text"
//                             id="documentAmt"
//                             name="documentAmt"
//                             value={paymentMode.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0).toFixed(2)}
//                             disabled
//                         />

//                     </FormGroup>
//                 </Col>
//                 <Col md={2}>
//                     <FormGroup>
//                         <label className="forlabel bold-label" htmlFor="sbRequestId">
//                             Status
//                         </label>
//                         <Input
//                             className="form-control"
//                             type="text"
//                             id="status"
//                             name='status'
//                             value={finTrans.status === 'A' ? 'Approved' : finTrans.status}
//                             onChange={handleChange}
//                             disabled
//                         />

//                     </FormGroup>
//                 </Col>
//                 <Col md={2}>
//                     <FormGroup>
//                         <label className="forlabel bold-label" htmlFor="sbRequestId">
//                             Created By
//                         </label>
//                         <Input
//                             className="form-control"
//                             type="text"
//                             id="createdBy"
//                             name='createdBy'
//                             value={finTrans.createdBy}
//                             onChange={handleChange}
//                             disabled
//                         />

//                     </FormGroup>
//                 </Col>

//             </Row>
//             <Row>
//                 <Col md={2}>
//                     <FormGroup>
//                         <label className="forlabel bold-label" htmlFor="sbRequestId">
//                             Party Name
//                         </label>
//                         <Select
//                             value={finTrans.partyId ? { value: finTrans.partyId, label: finTrans.partyName } : null}
//                             onChange={handleAccChange}
//                             onInputChange={getAccData}
//                             isDisabled={finTrans.docType === "" || finTrans.transId}
//                             options={accData}
//                             placeholder="Select Party"
//                             isClearable
//                             menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
//                             menuPosition="fixed" // Sets the dropdown menu position to fixed    
//                             id="othPartyId"
//                             name="othPartyId"
//                             className="autocompleteHeight"
//                             styles={{
//                                 control: (provided, state) => ({
//                                     ...provided,
//                                     height: 32,  // Set the height of the select input
//                                     minHeight: 32,
//                                     border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
//                                     width: "180px", // Set the width to 180px
//                                     height: "1px"
//                                 }),

//                                 valueContainer: (provided) => ({
//                                     ...provided,
//                                     // display: 'flex',
//                                     alignItems: 'center',  // Vertically center the text
//                                     padding: '0 8px',
//                                     height: '100%',
//                                     whiteSpace: 'nowrap',
//                                     textOverflow: 'ellipsis',
//                                     lineHeight: '28px',
//                                     maxWidth: 'calc(100% - 20px)',
//                                     position: 'relative',
//                                     overflow: 'visible',
//                                 }),

//                                 input: (provided) => ({
//                                     ...provided,
//                                     width: '100%',
//                                     overflow: 'hidden',
//                                     textOverflow: 'ellipsis',
//                                     whiteSpace: 'nowrap',
//                                     outline: 'none', // Avoid outline clashes
//                                 }),

//                                 singleValue: (provided) => ({
//                                     ...provided,
//                                     lineHeight: '32px',
//                                     overflow: 'hidden',
//                                     whiteSpace: 'nowrap',
//                                     textOverflow: 'ellipsis',
//                                 }),

//                                 clearIndicator: (provided) => ({
//                                     ...provided,
//                                     padding: 2,
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     position: 'absolute',
//                                     right: 5,
//                                     top: '50%',
//                                     transform: 'translateY(-50%)', // Vertically center the clear indicator
//                                 }),

//                                 indicatorSeparator: () => ({
//                                     display: 'none', // Remove the separator between indicators
//                                 }),

//                                 dropdownIndicator: () => ({
//                                     display: 'none', // Remove the dropdown arrow
//                                 }),

//                                 placeholder: (provided) => ({
//                                     ...provided,
//                                     lineHeight: '32px',
//                                     color: 'gray',
//                                 }),
//                             }}
//                         />

//                     </FormGroup>
//                 </Col>

//                 <Col md={2}>
//                     <FormGroup>
//                         <label className="forlabel bold-label" htmlFor="sbRequestId">
//                             Party GSTIN
//                         </label>
//                         <Input
//                             className="form-control"
//                             type="text"
//                             id="partyGst"
//                             name='partyGst'
//                             value={finTrans.partyGst}
//                             onChange={handleChange}
//                             disabled
//                         />

//                     </FormGroup>
//                 </Col>

//                 <Col md={2}>
//                     <FormGroup>
//                         <label className="forlabel bold-label" htmlFor="sbRequestId">
//                             Party Address1
//                         </label>
//                         <Input
//                             className="form-control"
//                             type="text"
//                             id="partyAddress1"
//                             name='partyAddress1'
//                             value={finTrans.partyAddress1}
//                             onChange={handleChange}
//                             disabled
//                         />

//                     </FormGroup>
//                 </Col>

//                 <Col md={2}>
//                     <FormGroup>
//                         <label className="forlabel bold-label" htmlFor="sbRequestId">
//                             Party Address2
//                         </label>
//                         <Input
//                             className="form-control"
//                             type="text"
//                             id="partyAddress2"
//                             name='partyAddress2'
//                             value={finTrans.partyAddress2}
//                             onChange={handleChange}
//                             disabled
//                         />

//                     </FormGroup>
//                 </Col>

//                 <Col md={2}>
//                     <FormGroup>
//                         <label className="forlabel bold-label" htmlFor="sbRequestId">
//                             Party Address3
//                         </label>
//                         <Input
//                             className="form-control"
//                             type="text"
//                             id="partyAddress3"
//                             name='partyAddress3'
//                             value={finTrans.partyAddress3}
//                             onChange={handleChange}
//                             disabled
//                         />

//                     </FormGroup>
//                 </Col>


//                 <Col md={2}>
//                     <FormGroup>
//                         <label className="forlabel bold-label" htmlFor="sbRequestId">
//                             Remarks
//                         </label>
//                         <Input
//                             className="form-control"
//                             type="textarea"
//                             id="narration"
//                             name='narration'
//                             value={finTrans.narration}
//                             onChange={handleChange}
//                             maxLength={250}
//                         />

//                     </FormGroup>
//                 </Col>
//             </Row>
//             <div id="datepicker-portal2"></div>
//             <Row className="justify-content-center">
//                 <Col xs={12} className="d-flex flex-wrap justify-content-center gap-2">
//                     <button
//                         className="btn btn-outline-primary btn-margin newButton"
//                         style={{ marginRight: 10, fontSize: 13 }}
//                         id="submitbtn2"
//                         onClick={finTrans.docType === 'AD' ? handleSave : handleSave1}
//                         disabled={finTrans.isReceiptCancel === 'Y' || (finTrans.docType === 'RE' && invoiceData.length === 0)}
//                     >
//                         <FontAwesomeIcon
//                             icon={faSave}
//                             style={{ marginRight: "5px" }}
//                         />
//                         Save
//                     </button>


//                     <button
//                         className="btn btn-outline-danger btn-margin newButton"
//                         style={{ marginRight: 10, fontSize: 13 }}
//                         id="submitbtn2"
//                         onClick={handleClear}
//                     >
//                         <FontAwesomeIcon
//                             icon={faRefresh}
//                             style={{ marginRight: "5px" }}
//                         />
//                         Clear
//                     </button>

//                     <button
//                         className="btn btn-outline-primary btn-margin newButton"
//                         style={{ marginRight: 10, fontSize: 13 }}
//                         id="submitbtn2"
//                         onClick={addPaymentMode}
//                         disabled={finTrans.isReceiptCancel === 'Y'}
//                     >
//                         <FontAwesomeIcon
//                             icon={faAdd}
//                             style={{ marginRight: "5px" }}
//                         />
//                         Add Payment Mode
//                     </button>

//                     <button
//                         className="btn btn-outline-primary btn-margin newButton"
//                         style={{ marginRight: 10, fontSize: 13 }}
//                         id="submitbtn2"
//                         onClick={handleModelOPenForPrintReciept}

//                     >
//                         <FontAwesomeIcon
//                             icon={faPrint}
//                             style={{ marginRight: "5px" }}
//                         />
//                         Print
//                     </button>

//                     {(finTrans.transId !== "" && (finTrans.docType === 'AJ' || finTrans.docType === 'RE') && finTrans.isReceiptCancel !== 'Y' &&
//                         (role === 'ROLE_ADMIN' || allowDelete === 'Y')) && (
//                             <button
//                                 className="btn btn-outline-danger btn-margin newButton"
//                                 style={{ marginRight: 10, fontSize: 13 }}
//                                 id="submitbtn2"
//                                 onClick={() => handleCancelReciept(finTrans.transId, finTrans.narration, finTrans.docType, finTrans.partyId)}
//                             >
//                                 <FontAwesomeIcon
//                                     icon={faCancel}
//                                     style={{ marginRight: "5px" }}
//                                 />
//                                 Cancel
//                             </button>
//                         )}

//                 </Col>
//             </Row>
//             {finTrans.docType === "AD" && (
//                 <>
//                     <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
//                         <Table className="table table-bordered" style={{ border: '2px solid black' }}>
//                             <thead>
//                                 <tr>
//                                     <th scope="col" colSpan={2} style={{ color: "black" }}>
//                                         Advance Balance
//                                     </th>
//                                 </tr>
//                                 <tr>

//                                     <th scope="col" className="text-center" style={{ color: "black" }}>
//                                         Advance Amount
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black" }}>
//                                         Balance for Clear Amount.
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr className='text-center'>
//                                     <td>{finTrans.advanceAmt}</td>
//                                     <td>{finTrans.advanceClearedAmt}</td>
//                                 </tr>
//                             </tbody>
//                         </Table>
//                     </div>


//                     <div className="mt-3 table-responsive" style={{ maxHeight: "400px" }}>
//                         <Table className="table table-bordered table-responsive" style={{ border: '2px solid black' }}>
//                             <thead>
//                                 <tr>
//                                     <th scope="col" colSpan={7} style={{ color: "black", width: 50 }}>
//                                         Advance Payment Details
//                                     </th>
//                                 </tr>
//                                 <tr>
//                                     <th scope="col" className="text-center" style={{ color: "black", width: 50 }}>
//                                         Sr No
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black", width: 150 }}>
//                                         Payment Mode
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black", width: 200 }}>
//                                         Cheque/Transaction No <span style={{ color: 'red' }}>*</span>
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black", width: 210 }}>
//                                         Cheque/Transaction Date <span style={{ color: 'red' }}>*</span>
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black" }}>
//                                         Bank Details
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black", width: 150 }}>
//                                         Amount
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black", width: 100 }}>
//                                         Status
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {paymentMode.map((item, index) => (
//                                     <tr key={index}>
//                                         <td>{index + 1}</td>
//                                         <td>
//                                             <Input
//                                                 className="form-control"
//                                                 type="select"
//                                                 id="payMode"
//                                                 name='payMode'
//                                                 value={item.payMode}
//                                                 onChange={(e) => handlePaymentModeChange(e, index)}
//                                                 style={{ width: 150 }}
//                                                 disabled={finTrans.transId !== ""}
//                                             >
//                                                 <option value=""></option>
//                                                 <option value="EFT">EFT</option>
//                                                 <option value="RTGS">RTGS</option>
//                                                 <option value="CASH">CASH</option>
//                                                 <option value="CHEQUE">CHEQUE</option>
//                                                 {finTrans.docType !== "AD" && (
//                                                     <option value="TDS">TDS</option>
//                                                 )}
//                                             </Input>

//                                         </td>
//                                         <td>
//                                             <Input
//                                                 className="form-control"
//                                                 type="text"
//                                                 id="chequeNo"
//                                                 name='chequeNo'
//                                                 onChange={(e) => handlePaymentModeChange(e, index)}
//                                                 maxLength={25}
//                                                 value={item.chequeNo}
//                                                 style={{ width: 180 }}
//                                                 disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.transId !== ""}
//                                             />
//                                         </td>
//                                         <td>
//                                             <div style={{ position: 'relative', width: 210 }}>
//                                                 <DatePicker
//                                                     selected={item.chequeDate} // The currently selected date for the row
//                                                     onChange={(selectedDate) => {
//                                                         const updatedDate = new Date(selectedDate); // Ensure it's a Date object
//                                                         const currentTime = new Date();
//                                                         updatedDate.setHours(currentTime.getHours());
//                                                         updatedDate.setMinutes(currentTime.getMinutes());
//                                                         updatedDate.setSeconds(currentTime.getSeconds());
//                                                         updatedDate.setMilliseconds(currentTime.getMilliseconds());

//                                                         setPaymentMode((prevState) => {
//                                                             const updatedRows = [...prevState];
//                                                             updatedRows[index] = {
//                                                                 ...updatedRows[index],
//                                                                 chequeDate: updatedDate,
//                                                             };
//                                                             return updatedRows;
//                                                         });
//                                                     }}
//                                                     portalId="datepicker-portal2"
//                                                     disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.transId !== ""}
//                                                     popperPlacement="top-start"
//                                                     id="chequeDate" // Unique identifier
//                                                     name="chequeDate" // Name of the field
//                                                     dateFormat="dd/MM/yyyy HH:mm" // Display format for the date and time
//                                                     showTimeInput // Enables time input in the date picker
//                                                     className="form-control border-right-0 InputField" // Custom class names for styling
//                                                     customInput={<Input style={{ width: '100%' }} />} // Custom input element for styling
//                                                     wrapperClassName="custom-react-datepicker-wrapper" // Custom wrapper for date picker
//                                                 />

//                                                 <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
//                                             </div>
//                                         </td>
//                                         <td>
//                                             <Input
//                                                 className="form-control"
//                                                 type="text"
//                                                 id="bankDetails"
//                                                 name='bankDetails'
//                                                 value={item.bankDetails}
//                                                 onChange={(e) => handlePaymentModeChange(e, index)}
//                                                 maxLength={50}
//                                                 disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.transId !== ""}

//                                             />
//                                         </td>
//                                         <td>
//                                             <Input
//                                                 className="form-control"
//                                                 type="text"
//                                                 id="amount"
//                                                 name='amount'
//                                                 value={item.amount}
//                                                 disabled={item.payMode === '' || item.payMode === 'TDS' || finTrans.transId !== ""}
//                                                 onChange={(e) => handlePaymentModeChange(e, index)}
//                                                 style={{ width: 180 }}

//                                             />
//                                         </td>
//                                         <td className='text-center'>

//                                             {item.status === '' ? (
//                                                 <button
//                                                     className="btn btn-outline-danger btn-margin newButton"
//                                                     style={{ marginRight: 10, fontSize: 13 }}
//                                                     id="submitbtn2"
//                                                     onClick={() => removePaymentMode(index, item.amount)}
//                                                 >
//                                                     <FontAwesomeIcon
//                                                         icon={faTrash}
//                                                     />
//                                                 </button>
//                                             ) : (
//                                                 <span>{item.status}</span>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </Table>
//                     </div>
//                 </>

//             )}


//             {finTrans.docType === "RE" && (
//                 <>
//                     <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
//                         <Table className="table table-bordered" style={{ border: '2px solid black' }}>
//                             <thead>
//                                 <tr>
//                                     <th scope="col" colSpan={9} style={{ color: "black" }}>
//                                         Invoice Details For Adjustment
//                                     </th>
//                                 </tr>
//                                 <tr>

//                                     <th scope="col" className="text-center" style={{ color: "black" }}>
//                                         Sr No
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black" }}>
//                                         Invoice No
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black" }}>
//                                         Billing To
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black" }}>
//                                         Billing Party
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black" }}>
//                                         Comments
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black" }}>
//                                         Importer Name
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black" }}>
//                                         Invoice Amt.
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black" }}>
//                                         Invoice Bal Amt.
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black" }}>
//                                         Receipt Amt.
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {invoiceData.map((item, index) => (
//                                     <tr key={index} className='text-center'>
//                                         <td>{index + 1}</td>
//                                         <td>{item.invoiceNo}</td>
//                                         <td>{item.billingTo}</td>
//                                         <td>{item.billingParty}</td>
//                                         <td>{item.comments}</td>
//                                         <td>{item.importerName}</td>
//                                         <td>{item.invoiceAmt}</td>
//                                         <td>{item.invoiceBalAmt}</td>
//                                         <td>
//                                             <Input
//                                                 className="form-control"
//                                                 type="text"
//                                                 id="receiptAmt"
//                                                 name='receiptAmt'
//                                                 value={item.receiptAmt}
//                                                 disabled={finTrans.isReceiptCancel === "Y"}
//                                                 onChange={(e) => handleInvoiceChange(e, index)}
//                                                 style={{ width: 180 }}
//                                             />
//                                         </td>
//                                     </tr>
//                                 ))}

//                             </tbody>
//                         </Table>
//                     </div>


//                     <div className="mt-3 table-responsive" style={{ maxHeight: "400px" }}>
//                         <Table className="table table-bordered table-responsive" style={{ border: '2px solid black' }}>
//                             <thead>
//                                 <tr>
//                                     <th scope="col" colSpan={7} style={{ color: "black", width: 50 }}>
//                                         Payment Details
//                                     </th>
//                                 </tr>
//                                 <tr>
//                                     <th scope="col" className="text-center" style={{ color: "black", width: 50 }}>
//                                         Sr No
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black", width: 150 }}>
//                                         Payment Mode
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black", width: 200 }}>
//                                         Cheque/Transaction No <span style={{ color: 'red' }}>*</span>
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black", width: 210 }}>
//                                         Cheque/Transaction Date <span style={{ color: 'red' }}>*</span>
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black" }}>
//                                         Bank Details
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black", width: 150 }}>
//                                         Amount
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black", width: 100 }}>
//                                         Status
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {paymentMode.map((item, index) => (
//                                     <tr key={index}>
//                                         <td>{index + 1}</td>
//                                         <td>
//                                             <Input
//                                                 className="form-control"
//                                                 type="select"
//                                                 id="payMode"
//                                                 name='payMode'
//                                                 value={item.payMode}
//                                                 onChange={(e) => handlePaymentModeChange1(e, index)}
//                                                 style={{ width: 150 }}
//                                                 disabled={finTrans.isReceiptCancel === "Y"}
//                                             >
//                                                 <option value=""></option>
//                                                 <option value="EFT">EFT</option>
//                                                 <option value="RTGS">RTGS</option>
//                                                 <option value="CASH">CASH</option>
//                                                 <option value="CHEQUE">CHEQUE</option>
//                                                 {finTrans.docType !== "AD" && (
//                                                     <option value="TDS">TDS</option>
//                                                 )}
//                                             </Input>

//                                         </td>
//                                         <td>
//                                             <Input
//                                                 className="form-control"
//                                                 type="text"
//                                                 id="chequeNo"
//                                                 name='chequeNo'
//                                                 onChange={(e) => handlePaymentModeChange1(e, index)}
//                                                 maxLength={25}
//                                                 value={item.chequeNo}
//                                                 style={{ width: 180 }}
//                                                 disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.isReceiptCancel === "Y"}
//                                             />
//                                         </td>
//                                         <td>
//                                             <div style={{ position: 'relative', width: 210 }}>
//                                                 <DatePicker
//                                                     selected={item.chequeDate} // The currently selected date for the row
//                                                     onChange={(selectedDate) => {
//                                                         const updatedDate = new Date(selectedDate); // Ensure it's a Date object
//                                                         const currentTime = new Date();
//                                                         updatedDate.setHours(currentTime.getHours());
//                                                         updatedDate.setMinutes(currentTime.getMinutes());
//                                                         updatedDate.setSeconds(currentTime.getSeconds());
//                                                         updatedDate.setMilliseconds(currentTime.getMilliseconds());

//                                                         setPaymentMode((prevState) => {
//                                                             const updatedRows = [...prevState];
//                                                             updatedRows[index] = {
//                                                                 ...updatedRows[index],
//                                                                 chequeDate: updatedDate,
//                                                             };
//                                                             return updatedRows;
//                                                         });
//                                                     }}
//                                                     portalId="datepicker-portal2"
//                                                     disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.isReceiptCancel === "Y"}
//                                                     popperPlacement="top-start"
//                                                     id="chequeDate" // Unique identifier
//                                                     name="chequeDate" // Name of the field
//                                                     dateFormat="dd/MM/yyyy HH:mm" // Display format for the date and time
//                                                     showTimeInput // Enables time input in the date picker
//                                                     className="form-control border-right-0 InputField" // Custom class names for styling
//                                                     customInput={<Input style={{ width: '100%' }} />} // Custom input element for styling
//                                                     wrapperClassName="custom-react-datepicker-wrapper" // Custom wrapper for date picker
//                                                 />

//                                                 <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
//                                             </div>
//                                         </td>
//                                         <td>
//                                             <Input
//                                                 className="form-control"
//                                                 type="text"
//                                                 id="bankDetails"
//                                                 name='bankDetails'
//                                                 value={item.bankDetails}
//                                                 onChange={(e) => handlePaymentModeChange1(e, index)}
//                                                 maxLength={50}
//                                                 disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.isReceiptCancel === "Y"}

//                                             />
//                                         </td>
//                                         <td>
//                                             <Input
//                                                 className="form-control"
//                                                 type="text"
//                                                 id="amount"
//                                                 name='amount'
//                                                 value={item.amount}
//                                                 disabled={item.payMode === '' || finTrans.isReceiptCancel === "Y"}
//                                                 onChange={(e) => handlePaymentModeChange1(e, index)}
//                                                 style={{ width: 180 }}

//                                             />
//                                         </td>
//                                         <td className='text-center'>

//                                             {item.status === '' ? (
//                                                 <button
//                                                     className="btn btn-outline-danger btn-margin newButton"
//                                                     style={{ marginRight: 10, fontSize: 13 }}
//                                                     id="submitbtn2"
//                                                     onClick={() => removePaymentMode(index, item.amount)}
//                                                 >
//                                                     <FontAwesomeIcon
//                                                         icon={faTrash}
//                                                     />
//                                                 </button>
//                                             ) : (
//                                                 <span>{item.status}</span>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </Table>
//                     </div>

//                 </>
//             )}





//             {finTrans.docType === "AJ" && (
//                 <>
//                     <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
//                         <Table className="table table-bordered" style={{ border: '2px solid black' }}>
//                             <thead>
//                                 <tr>
//                                     <th scope="col" colSpan={2} style={{ color: "black" }}>
//                                         Advance Balance
//                                     </th>
//                                 </tr>
//                                 <tr>

//                                     <th scope="col" className="text-center" style={{ color: "black" }}>
//                                         Advance Amount
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black" }}>
//                                         Balance for Clear Amount.
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr className='text-center'>
//                                     <td>{finTrans.advanceAmt}</td>
//                                     <td>{finTrans.advanceClearedAmt}</td>
//                                 </tr>
//                             </tbody>
//                         </Table>
//                     </div>
//                     <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
//                         <Table className="table table-bordered" style={{ border: '2px solid black' }}>
//                             <thead>
//                                 <tr>
//                                     <th scope="col" colSpan={9} style={{ color: "black" }}>
//                                         Invoice Details For Adjustment
//                                     </th>
//                                 </tr>
//                                 <tr>

//                                     <th scope="col" className="text-center" style={{ color: "black" }}>
//                                         Sr No
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black" }}>
//                                         Invoice No
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black" }}>
//                                         Billing To
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black" }}>
//                                         Billing Party
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black" }}>
//                                         Comments
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black" }}>
//                                         Importer Name
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black" }}>
//                                         Invoice Amt.
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black" }}>
//                                         Invoice Bal Amt.
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black" }}>
//                                         Receipt Amt.
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {invoiceData.map((item, index) => (
//                                     <tr key={index} className='text-center'>
//                                         <td>{index + 1}</td>
//                                         <td>{item.invoiceNo}</td>
//                                         <td>{item.billingTo}</td>
//                                         <td>{item.billingParty}</td>
//                                         <td>{item.comments}</td>
//                                         <td>{item.importerName}</td>
//                                         <td>{item.invoiceAmt}</td>
//                                         <td>{item.invoiceBalAmt}</td>
//                                         <td>
//                                             <Input
//                                                 className="form-control"
//                                                 type="text"
//                                                 id="receiptAmt"
//                                                 name='receiptAmt'
//                                                 value={item.receiptAmt}
//                                                 disabled={finTrans.transId !== ""}
//                                                 onChange={(e) => handleInvoiceChange1(e, index)}
//                                                 style={{ width: 180 }}

//                                             />
//                                         </td>
//                                     </tr>
//                                 ))}

//                             </tbody>
//                         </Table>
//                     </div>


//                     <div className="mt-3 table-responsive" style={{ maxHeight: "400px" }}>
//                         <Table className="table table-bordered table-responsive" style={{ border: '2px solid black' }}>
//                             <thead>
//                                 <tr>
//                                     <th scope="col" colSpan={7} style={{ color: "black", width: 50 }}>
//                                         Payment Details
//                                     </th>
//                                 </tr>
//                                 <tr>
//                                     <th scope="col" className="text-center" style={{ color: "black", width: 50 }}>
//                                         Sr No
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black", width: 150 }}>
//                                         Payment Mode
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black", width: 200 }}>
//                                         Cheque/Transaction No <span style={{ color: 'red' }}>*</span>
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black", width: 210 }}>
//                                         Cheque/Transaction Date <span style={{ color: 'red' }}>*</span>
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black" }}>
//                                         Bank Details
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black", width: 150 }}>
//                                         Amount
//                                     </th>
//                                     <th scope="col" className="text-center" style={{ color: "black", width: 100 }}>
//                                         Status
//                                     </th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {paymentMode.map((item, index) => (
//                                     <tr key={index}>
//                                         <td>{index + 1}</td>
//                                         <td>
//                                             <Input
//                                                 className="form-control"
//                                                 type="select"
//                                                 id="payMode"
//                                                 name='payMode'
//                                                 value={item.payMode}
//                                                 onChange={(e) => handlePaymentModeChange1(e, index)}
//                                                 style={{ width: 150 }}
//                                                 disabled={finTrans.transId !== ""}
//                                             >
//                                                 <option value=""></option>
//                                                 <option value="ADVANCE">ADVANCE</option>
//                                                 {finTrans.docType !== "AD" && (
//                                                     <option value="TDS">TDS</option>
//                                                 )}
//                                             </Input>

//                                         </td>
//                                         <td>
//                                             <Input
//                                                 className="form-control"
//                                                 type="text"
//                                                 id="chequeNo"
//                                                 name='chequeNo'
//                                                 onChange={(e) => handlePaymentModeChange1(e, index)}
//                                                 maxLength={25}
//                                                 value={item.chequeNo}
//                                                 style={{ width: 180 }}
//                                                 disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.transId !== ""}
//                                             />
//                                         </td>
//                                         <td>
//                                             <div style={{ position: 'relative', width: 210 }}>
//                                                 <DatePicker
//                                                     selected={item.chequeDate} // The currently selected date for the row
//                                                     onChange={(selectedDate) => {
//                                                         const updatedDate = new Date(selectedDate); // Ensure it's a Date object
//                                                         const currentTime = new Date();
//                                                         updatedDate.setHours(currentTime.getHours());
//                                                         updatedDate.setMinutes(currentTime.getMinutes());
//                                                         updatedDate.setSeconds(currentTime.getSeconds());
//                                                         updatedDate.setMilliseconds(currentTime.getMilliseconds());

//                                                         setPaymentMode((prevState) => {
//                                                             const updatedRows = [...prevState];
//                                                             updatedRows[index] = {
//                                                                 ...updatedRows[index],
//                                                                 chequeDate: updatedDate,
//                                                             };
//                                                             return updatedRows;
//                                                         });
//                                                     }}
//                                                     portalId="datepicker-portal2"
//                                                     disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.transId !== ""}
//                                                     popperPlacement="top-start"
//                                                     id="chequeDate" // Unique identifier
//                                                     name="chequeDate" // Name of the field
//                                                     dateFormat="dd/MM/yyyy HH:mm" // Display format for the date and time
//                                                     showTimeInput // Enables time input in the date picker
//                                                     className="form-control border-right-0 InputField" // Custom class names for styling
//                                                     customInput={<Input style={{ width: '100%' }} />} // Custom input element for styling
//                                                     wrapperClassName="custom-react-datepicker-wrapper" // Custom wrapper for date picker
//                                                 />

//                                                 <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
//                                             </div>
//                                         </td>
//                                         <td>
//                                             <Input
//                                                 className="form-control"
//                                                 type="text"
//                                                 id="bankDetails"
//                                                 name='bankDetails'
//                                                 value={item.bankDetails}
//                                                 onChange={(e) => handlePaymentModeChange1(e, index)}
//                                                 maxLength={50}
//                                                 disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.transId !== ""}

//                                             />
//                                         </td>
//                                         <td>
//                                             <Input
//                                                 className="form-control"
//                                                 type="text"
//                                                 id="amount"
//                                                 name='amount'
//                                                 value={item.amount}
//                                                 disabled={item.payMode === '' || finTrans.transId !== "" || item.payMode === "ADVANCE"}
//                                                 onChange={(e) => handlePaymentModeChange1(e, index)}
//                                                 style={{ width: 180 }}

//                                             />
//                                         </td>
//                                         <td className='text-center'>

//                                             {item.status === '' ? (
//                                                 <button
//                                                     className="btn btn-outline-danger btn-margin newButton"
//                                                     style={{ marginRight: 10, fontSize: 13 }}
//                                                     id="submitbtn2"
//                                                     disabled={item.payMode === "ADVANCE"}
//                                                     onClick={() => removePaymentMode(index, item.amount)}
//                                                 >
//                                                     <FontAwesomeIcon
//                                                         icon={faTrash}
//                                                     />
//                                                 </button>
//                                             ) : (
//                                                 <span>{item.status}</span>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </Table>
//                     </div>

//                 </>
//             )}
//         </div>
//     )
// }






import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import ipaddress from "../Components/IpAddress";
import Select, { components } from 'react-select';
import { Pagination } from 'react-bootstrap';
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
    ModalFooter,
    CardTitle,
} from "reactstrap";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faChartGantt, faBold, faPrint, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faCalendarAlt, faAdd, faCancel, faXmark, faArrowDown, faPlus, faArrowUp, faEdit, faChevronUp, faChevronDown, faMagnifyingGlassChart, faProcedures, faSpinner, faArrowUpFromBracket, faUsersViewfinder, faBackward, faCross } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import useAxios from '../Components/useAxios';
import { toast } from 'react-toastify';
import printformat1 from '../Images/printformat1.png';
import printformat2 from '../Images/printformat2.png';

export default function ARReceipts({ activeTab }) {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
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

    // If the user is not authenticated, redirect to the login page
    useEffect(() => {
        if (!isAuthenticated) {

            navigate('/login?message=You need to be authenticated to access this page.');
        }
    }, [isAuthenticated, navigate]);

    const axios = useAxios();

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
        userRights
    } = useContext(AuthContext);







    const processId = 'P01104';

    const foundRights = role !== 'ROLE_ADMIN' ? userRights.find(item => item.process_Id === processId) : null;
    const allowCreate = foundRights?.allow_Create === 'Y';
    const allowRead = foundRights?.allow_Read === 'Y';
    const allowEdit = foundRights?.allow_Update === 'Y';
    const allowDelete = foundRights?.allow_Delete === 'Y';

















    const [paymentMode, setPaymentMode] = useState([{
        payMode: '',
        chequeNo: '',
        chequeDate: null,
        bankDetails: '',
        amount: '',
        status: '',
        transId: '',
        lineId: ''
    }])


    const addPaymentMode = () => {


        setPaymentMode([...paymentMode, {
            payMode: '',
            chequeNo: '',
            chequeDate: null,
            bankDetails: '',
            amount: '',
            status: ''
        }]);



    };

    const removePaymentMode = (index, amount) => {
        setPaymentMode((prevState) => prevState.filter((_, i) => i !== index));
    };


    const [finTrans, setFinTrans] = useState({
        companyId: "",
        branchId: "",
        docType: "",
        transId: "",
        transDate: new Date(),
        status: "",
        isOnAccPay: "N",
        createdBy: "",
        partyId: "",
        partyName: "",
        partyGst: "",
        partyAddress1: "",
        partyAddress2: "",
        partyAddress3: "",
        accSrNo: "",
        documentAmt: "",
        narration: "",
        advanceAmt: '',
        advanceClearedAmt: '',
        isReceiptCancel: 'N'
    })


    const initialInvoiceData = useState([{
        invoiceNo: '',
        billingTo: '',
        billingParty: '',
        comments: '',
        importerId: '',
        importerSrNo: '',
        importerName: '',
        invoiceAmt: '',
        invoiceBalAmt: '',
        receiptAmt: '',
        tdsDeductee: '',
        tdsPercentage: '',
        tdsAmt: '',
        tdsStatus: '',
        localAmount: '',
        transId: ''
    }]);


    const [invoiceData, setInvoiceData] = useState(initialInvoiceData);

    const [savedInvoiceData, setSavedInvoiceData] = useState(initialInvoiceData);


    // const handleInvoiceChange = (e, index) => {
    //     const { name, value } = e.target;
    //     let sanitizeValue = value;

    //     if (name === 'receiptAmt') {
    //         sanitizeValue = handleInputChange(value, 13, 2)

    //         if (invoiceData[index].invoiceBalAmt < sanitizeValue) {
    //             sanitizeValue = '';
    //         }


    //     }



    //     setInvoiceData((prevState) => {
    //         const updatedRows = [...prevState];
    //         updatedRows[index] = {
    //             ...updatedRows[index],
    //             [name]: sanitizeValue,
    //         };
    //         return updatedRows;
    //     });
    // };



    const handleInvoiceChange = (e, index) => {
        const { name, value } = e.target;
        let sanitizeValue = value;

        if (name === 'receiptAmt') {
            sanitizeValue = handleInputChange(value, 13, 2);

            const currentRow = invoiceData[index];
            const invoiceBalAmt = currentRow.invoiceBalAmt || 0;

            // Assume this is available from props or state
            const savedInvoice = savedInvoiceData.find(
                (item) => item.invoiceNo === currentRow.invoiceNo
            );

            let allowedLimit = invoiceBalAmt;

            if (currentRow.transId && savedInvoice) {
                const savedAmount = savedInvoice.receiptAmt || 0;
                allowedLimit = invoiceBalAmt + savedAmount;
            }

            console.log('allowedLimit : ' + allowedLimit, ' invoiceBalAmt : ', invoiceBalAmt, ' \ncurrentRow.transId ', currentRow.transId, ' savedInvoice ', savedInvoice);


            if (Number(sanitizeValue) > Number(allowedLimit)) {
                sanitizeValue = '';
            }
        }

        setInvoiceData((prevState) => {
            const updatedRows = [...prevState];
            updatedRows[index] = {
                ...updatedRows[index],
                [name]: sanitizeValue,
            };
            return updatedRows;
        });
    };




    const handleInvoiceChange1 = (e, index) => {
        const { name, value } = e.target;
        let sanitizeValue = value;

        if (name === 'receiptAmt') {
            sanitizeValue = handleInputChange(value, 13, 2);

            if (invoiceData[index].invoiceBalAmt < sanitizeValue) {
                sanitizeValue = '';
            } else {
                setPaymentMode((prevState) => {
                    const updatedPaymentModes = [...prevState];

                    // Find existing ADVANCE row
                    let advanceRow = updatedPaymentModes.find((row) => row.payMode === 'ADVANCE');

                    // Calculate total receiptAmt from invoiceData
                    let totalReceiptAmt = invoiceData.reduce((acc, curr, idx) =>
                        idx === index ? acc + parseFloat(sanitizeValue || 0) : acc + parseFloat(curr.receiptAmt || 0), 0
                    );

                    if (!advanceRow) {
                        // Check for an empty row
                        const emptyRow = updatedPaymentModes.find((row) => !row.payMode);
                        if (emptyRow) {
                            emptyRow.payMode = 'ADVANCE';
                            emptyRow.amount = totalReceiptAmt;
                        } else {
                            // Add a new ADVANCE row
                            updatedPaymentModes.push({
                                payMode: 'ADVANCE',
                                chequeNo: '',
                                chequeDate: null,
                                bankDetails: '',
                                amount: totalReceiptAmt,
                                status: '',
                            });
                        }
                    } else {
                        // Update existing ADVANCE row
                        advanceRow.amount = totalReceiptAmt;
                    }

                    return updatedPaymentModes;
                });
            }
        }

        // Update invoiceData
        setInvoiceData((prevState) => {
            const updatedRows = [...prevState];
            updatedRows[index] = {
                ...updatedRows[index],
                [name]: sanitizeValue,
            };
            return updatedRows;
        });
    };




    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "docType") {
            if (finTrans.docType !== value) {
                handleClear();
            }
        }

        setFinTrans((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? (checked ? "Y" : "N") : value,
        }));
    };


    const [accData, setAccData] = useState([]);

    const getAccData = (val) => {
        if (!val) {
            setAccData([]);
            return;
        }

        axios.get(`${ipaddress}party/getAllWithAdd?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;

                const partyOptions = data.map(port => ({
                    value: port[0],
                    label: port[1] + ' - ' + port[2] + ' ' + port[3] + ' ' + port[4],
                    impName: port[1],
                    gst: port[6],
                    address1: port[2],
                    address2: port[3],
                    address3: port[4],
                    srNo: port[5],
                    state: port[7]
                }))

                setAccData(partyOptions);
            })
            .catch((error) => {
                setAccData([]);
            })
    }


    const handleAccChange = async (selectedOption, { action }) => {

        if (action === 'clear') {

            setFinTrans((prev) => ({
                ...prev,
                partyId: "",
                partyGst: "",
                partyAddress1: "",
                partyAddress2: "",
                partyAddress3: "",
                accSrNo: "",
            }));

            handleClear();
        }
        else {


            setFinTrans((prev) => ({
                ...prev,
                partyId: selectedOption.value,
                partyName: selectedOption.impName,
                partyGst: selectedOption.gst,
                partyAddress1: selectedOption.address1,
                partyAddress2: selectedOption.address2,
                partyAddress3: selectedOption.address3,
                accSrNo: selectedOption.srNo,
            }));

            getAdvanceData(selectedOption.value);
        }
    };


    const getAdvanceData = (id) => {
        axios.get(`${ipaddress}receipt/advanceReceiptBeforeSaveSearch`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            },
            params: {
                cid: companyid,
                bid: branchId,
                id: id,
                type: finTrans.docType
            }

        })

            .then((response) => {

                const data = response.data;

                console.log('data ', data);


                if (finTrans.docType === "AD") {
                    setFinTrans((prev) => ({
                        ...prev,
                        advanceAmt: data[3] || '',
                        advanceClearedAmt: data[4] || ''
                    }));
                }
                if (finTrans.docType === "RE") {


                    if (data.length === 0) {
                        toast.error("Data not found", {
                            autoClose: 800
                        })

                        return;
                    }

                    setInvoiceData(data.map((item) => {
                        const invoiceAmt = parseFloat(item[23] || 0); // Ensure it's a number
                        const tdsPercentage = parseFloat(item[22] || 0); // Ensure it's a number
                        const tdsAmt = (invoiceAmt * tdsPercentage) / 100; // Calculate TDS Amount
                        const tdsStatus = item[19] || '';

                        return {
                            invoiceNo: item[0] || '',
                            billingTo: item[2] || '',
                            billingParty: item[5] || '',
                            comments: item[6] || '',
                            importerId: item[7] || '',
                            importerSrNo: item[8] || '',
                            importerName: item[9] || '',
                            invoiceAmt: item[10] || '',
                            invoiceBalAmt: item[11] || '',
                            receiptAmt: '',
                            tdsDeductee: item[21] || '',
                            tdsStatus: tdsStatus,
                            tdsPercentage: tdsStatus !== 'Y' ? tdsPercentage : 0,
                            tdsAmt: tdsStatus !== 'Y' ? tdsAmt.toFixed(2) : 0,
                            localAmount: item[23] || '',
                            transId: item[14] || '',
                        };
                    }));







                }
                if (finTrans.docType === "AJ") {


                    if (data.receipt.length === 0) {
                        toast.error("Data not found", {
                            autoClose: 800
                        })

                        return;
                    }

                    setFinTrans((prev) => ({
                        ...prev,
                        advanceAmt: data.advance[3] || '',
                        advanceClearedAmt: data.advance[4] || ''
                    }));

                    setInvoiceData(data.receipt.map((item) => {
                        const invoiceAmt = parseFloat(item[23] || 0); // Ensure it's a number
                        const tdsPercentage = parseFloat(item[22] || 0); // Ensure it's a number
                        const tdsAmt = (invoiceAmt * tdsPercentage) / 100; // Calculate TDS Amount
                        const tdsStatus = item[19] || '';



                        return {
                            invoiceNo: item[0] || '',
                            billingTo: item[2] || '',
                            billingParty: item[5] || '',
                            comments: item[6] || '',
                            importerId: item[7] || '',
                            importerSrNo: item[8] || '',
                            importerName: item[9] || '',
                            invoiceAmt: item[10] || '',
                            invoiceBalAmt: item[11] || '',
                            receiptAmt: '',
                            tdsDeductee: item[21] || '',
                            tdsStatus: tdsStatus,
                            tdsPercentage: tdsStatus !== 'Y' ? tdsPercentage : 0,
                            tdsAmt: tdsStatus !== 'Y' ? tdsAmt.toFixed(2) : 0,
                            localAmount: item[23] || '',
                            transId: item[14] || '',
                        };
                    }));

                }
            })
            .catch((error) => {
                if (finTrans.docType === "AD") {
                    setFinTrans((prev) => ({
                        ...prev,
                        advanceAmt: '0',
                        advanceClearedAmt: '0'
                    }));
                }

                toast.error(error.response.data, {
                    autoClose: 800
                })

                if (finTrans.docType === "RE") {
                    setInvoiceData(
                        [{
                            invoiceNo: '',
                            billingTo: '',
                            billingParty: '',
                            comments: '',
                            importerId: '',
                            importerSrNo: '',
                            importerName: '',
                            invoiceAmt: '',
                            invoiceBalAmt: '',
                            receiptAmt: '',
                            tdsDeductee: '',
                            tdsPercentage: '',
                            tdsAmt: '',
                            tdsStatus: '',
                            localAmount: '',
                            transId: ''
                        }]
                    )
                }
            })
    }

    const handleClear = () => {
        setFinTrans({
            companyId: "",
            branchId: "",
            docType: "",
            transId: "",
            transDate: new Date(),
            status: "",
            isOnAccPay: "N",
            createdBy: "",
            partyId: "",
            partyName: "",
            partyGst: "",
            partyAddress1: "",
            partyAddress2: "",
            partyAddress3: "",
            accSrNo: "",
            documentAmt: "",
            narration: "",
            advanceAmt: '',
            advanceClearedAmt: '',
            isReceiptCancel: '',
        })

        setPaymentMode([
            {
                payMode: '',
                chequeNo: '',
                chequeDate: null,
                bankDetails: '',
                amount: '',
                status: ''
            }
        ])

        setInvoiceData([{
            invoiceNo: '',
            billingTo: '',
            billingParty: '',
            comments: '',
            importerId: '',
            importerSrNo: '',
            importerName: '',
            invoiceAmt: '',
            invoiceBalAmt: '',
            receiptAmt: '',
            tdsDeductee: '',
            tdsPercentage: '',
            tdsAmt: '',
            tdsStatus: '',
            localAmount: '',
            transId: ''
        }])
    }


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


    const handlePaymentModeChange = (e, index) => {
        const { name, value } = e.target;
        let sanitizeValue = value;

        if (name === 'amount') {
            sanitizeValue = handleInputChange(value, 13, 2)
        }



        setPaymentMode((prevState) => {
            const updatedRows = [...prevState];
            updatedRows[index] = {
                ...updatedRows[index],
                [name]: sanitizeValue,
            };
            return updatedRows;
        });
    };


    const handlePaymentModeChange1 = (e, index) => {
        const { name, value } = e.target;
        let sanitizeValue = value;
        if (name === 'payMode' && value === 'TDS') {


            let tdsInvoice = invoiceData.filter(
                (item) =>
                    item.invoiceNo !== '' &&
                    item.tdsStatus !== '' &&
                    item.tdsStatus === 'N' &&
                    item.tdsAmt !== '' &&
                    item.tdsAmt > 0 && item.receiptAmt > 0
            );

            const totalTdsAmt = tdsInvoice.reduce(
                (total, item) => total + (parseFloat(item.tdsAmt) || 0),
                0
            ).toFixed(2);


            setPaymentMode((prevState) => {
                const updatedRows = [...prevState];

                // Update the TDS row
                updatedRows[index] = {
                    ...updatedRows[index],
                    amount: totalTdsAmt,
                };

                // Find the ADVANCE row and subtract totalTdsAmt from its amount
                const advanceRow = updatedRows.find((row) => row.payMode === 'ADVANCE');
                if (advanceRow) {
                    const currentAdvanceAmt = parseFloat(advanceRow.amount || 0);
                    advanceRow.amount = (currentAdvanceAmt - parseFloat(totalTdsAmt)).toFixed(2);
                }

                return updatedRows;
            });
        }


        const filteredPaymentModes = paymentMode.find((item, i) => i === index);

        if (name === 'amount' && filteredPaymentModes.payMode !== 'TDS') {
            // Sanitize the input value
            const sanitizedInput = handleInputChange(value, 13, 2);

            // Calculate the total invoice amount
            const totalAmt = invoiceData
                .reduce((total, item) => total + (parseFloat(item.receiptAmt) || 0), 0)
                .toFixed(2);

            // Filter payment modes excluding 'TDS' and the current index
            const filteredPaymentModes = paymentMode.filter((item, i) => item.payMode !== 'TDS' && i !== index);

            // Calculate the total amount excluding the current item and 'TDS'
            const currentTotal = filteredPaymentModes
                .reduce((total, item) => total + (parseFloat(item.amount) || 0), 0)
                .toFixed(2);

            // Calculate the remaining amount that can be allocated
            const remainingAmt = parseFloat((parseFloat(totalAmt) - parseFloat(currentTotal)).toFixed(2));

            console.log('totalAmt : ', totalAmt, ' currentTotal : ', currentTotal, ' remainingAmt ', remainingAmt);


            // Ensure the new value does not exceed the remaining amount
            if (parseFloat(sanitizedInput || 0) > remainingAmt) {
                sanitizeValue = ''; // Reject the value if it exceeds the remaining amount
            } else {
                sanitizeValue = sanitizedInput; // Accept the value if valid
            }
        }


        setPaymentMode((prevState) => {
            const updatedRows = [...prevState];
            updatedRows[index] = {
                ...updatedRows[index],
                [name]: sanitizeValue,
            };
            return updatedRows;
        });
    };




    const handleSave = () => {

        if (!finTrans.docType) {
            toast.error("Trans type is required.", {
                autoClose: 800
            })
            return;
        }


        if (!finTrans.partyId) {
            toast.error("Party id is required.", {
                autoClose: 800
            })
            return;
        }

        if (paymentMode.length === 0) {
            toast.error("Atleast one payment mode is required.", {
                autoClose: 800
            })
            return;
        }

        for (let i = 0; i < paymentMode.length; i++) {
            const { chequeNo, chequeDate, amount, payMode } = paymentMode[i];



            // Check if chequeNo and chequeDate are missing for modes other than CASH and TDS
            if ((!chequeNo || !chequeDate) && payMode !== 'CASH' && payMode !== 'TDS') {
                toast.error(`Error: Cheque details are missing for payment mode entry ${i + 1}.`, {
                    autoClose: 800,
                });
                return; // Stop the process if validation fails
            }


            if (!amount) {
                toast.error(`Error: Amount is required for payment mode entry ${i + 1}.`, {
                    autoClose: 800,
                });
                return; // Stop the process if validation fails
            }
        }


        setLoading(true);

        finTrans.documentAmt = paymentMode.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0).toFixed(2);
        const formData = {
            finTransData: finTrans,
            paymentDto: paymentMode
        }


        axios.post(`${ipaddress}receipt/saveAdvanceReceipt`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            },
            params: {
                cid: companyid,
                bid: branchId,
                user: userId
            }
        })
            .then((response) => {
                setLoading(false);
                const data = response.data;
                console.log('data ', data);

                const singleData = data.finTransData[0];
                const balData = data.bal;

                setFinTrans({
                    companyId: "",
                    branchId: "",
                    docType: singleData[1] || "",
                    transId: singleData[0] || "",
                    transDate: singleData[2] === null ? null : new Date(singleData[2]),
                    status: singleData[4] || "",
                    isOnAccPay: "N",
                    createdBy: singleData[5] || "",
                    partyId: singleData[6] || "",
                    partyName: singleData[7] || "",
                    partyGst: singleData[9] || "",
                    partyAddress1: singleData[10] || "",
                    partyAddress2: singleData[11] || "",
                    partyAddress3: singleData[12] || "",
                    accSrNo: singleData[8] || "",
                    documentAmt: singleData[3] || "",
                    narration: singleData[13] || "",
                    advanceAmt: balData[3] || "0",
                    advanceClearedAmt: balData[4] || "0",
                    isReceiptCancel: singleData[19] || "",
                })


                setPaymentMode(data.finTransData.map((item) => (
                    {
                        payMode: item[14] || '',
                        chequeNo: item[15] || '',
                        chequeDate: item[16] === null ? null : new Date(item[16]),
                        bankDetails: item[17] || '',
                        amount: item[18] || '',
                        status: item[4] || '',
                    }
                )))


                toast.success("Data save successfully!!", {
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


    console.log('invData  : \n', invoiceData);





    const handleSave1 = () => {

        if (!finTrans.docType) {
            toast.error("Trans type is required.", {
                autoClose: 800
            })
            return;
        }


        if (!finTrans.partyId) {
            toast.error("Party id is required.", {
                autoClose: 800
            })
            return;
        }

        let invData = invoiceData.filter(item => (item.invoiceNo !== '' && (item.receiptAmt !== '' && item.receiptAmt > 0)))

        const totalTdsAmt = invData.reduce((total, item) => total + (parseFloat(item.tdsAmt) || 0), 0).toFixed(2);

        if (invData.length === 0) {
            toast.error("Please enter receipt amount.", {
                autoClose: 800
            })
            return;
        }

        if (paymentMode.length === 0) {
            toast.error("Atleast one payment mode is required.", {
                autoClose: 800
            })
            return;
        }

        for (let i = 0; i < paymentMode.length; i++) {
            const { chequeNo, chequeDate, amount, payMode } = paymentMode[i];



            // Check if chequeNo and chequeDate are missing for modes other than CASH and TDS
            if ((!chequeNo || !chequeDate) && payMode !== 'CASH' && payMode !== 'TDS' && payMode !== 'ADVANCE') {
                toast.error(`Error: Cheque details are missing for payment mode entry ${i + 1}.`, {
                    autoClose: 800,
                });
                return; // Stop the process if validation fails
            }


            if (!amount) {
                toast.error(`Error: Amount is required for payment mode entry ${i + 1}.`, {
                    autoClose: 800,
                });
                return; // Stop the process if validation fails
            }
        }

        let tdsData = paymentMode.filter(item => item.payMode === 'TDS' && item.amount > 0)
        let receiptAmt = invData.reduce((total, item) => total + (parseFloat(item.receiptAmt) || 0), 0).toFixed(2);
        let paymentAmt = paymentMode.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0).toFixed(2);

        if (finTrans.docType === 'AJ') {
            let wtTdsData = paymentMode.filter(item => item.payMode === 'ADVANCE' && item.amount > 0)

            let paymentAmtWtTds = wtTdsData.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0).toFixed(2);


            if (finTrans.advanceClearedAmt < paymentAmtWtTds) {
                toast.error(`The advance amount exceeds the balance for the cleared amount. Please add the advance first.`, {
                    autoClose: 800,
                });
                return; // Stop the process if validation failsF
            }
        }

        if (tdsData.length > 0) {
            const paymentTdsAmt = tdsData.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0).toFixed(2);


            if (paymentTdsAmt !== totalTdsAmt) {
                toast.error(`The TDS amount entered is incorrect. The correct TDS amount is ${totalTdsAmt}. Please update it accordingly.`, {
                    autoClose: 800,
                });
                return; // Halt the process if the validation fails
            }

            if (receiptAmt !== paymentAmt) {
                toast.error(`Total Receipt Amt and Total Invoice Amt Should be Equal`, {
                    autoClose: 800,
                });
                return; // Stop the process if validation fails
            }

        }
        else {
            if (receiptAmt !== paymentAmt) {
                toast.error(`Total Receipt Amt and Total Invoice Amt Should be Equal`, {
                    autoClose: 800,
                });
                return; // Stop the process if validation fails
            }
        }





        setLoading(true);

        finTrans.documentAmt = paymentMode.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0).toFixed(2);
        const formData = {
            finTransData: finTrans,
            invoiceDto: invData,
            paymentDto: paymentMode
        }


        axios.post(`${ipaddress}receipt/saveReceipt`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            },
            params: {
                cid: companyid,
                bid: branchId,
                user: userId,
                type: finTrans.docType
            }
        })
            .then((response) => {
                setLoading(false);
                const data = response.data;

                const singleData = data.finTransData[0];
                const advanceData = (data.advance === null || data.advance === undefined) ? null : data.advance;

                setFinTrans({
                    companyId: "",
                    branchId: "",
                    docType: singleData[1] || "",
                    transId: singleData[0] || "",
                    transDate: singleData[2] === null ? null : new Date(singleData[2]),
                    status: singleData[4] || "",
                    isOnAccPay: "N",
                    createdBy: singleData[5] || "",
                    partyId: singleData[6] || "",
                    partyName: singleData[7] || "",
                    partyGst: singleData[9] || "",
                    partyAddress1: singleData[10] || "",
                    partyAddress2: singleData[11] || "",
                    partyAddress3: singleData[12] || "",
                    accSrNo: singleData[8] || "",
                    documentAmt: singleData[3] || "",
                    narration: singleData[13] || "",
                    advanceAmt: advanceData === null ? "0" : advanceData[3] || "0",
                    advanceClearedAmt: advanceData === null ? "0" : advanceData[4] || "0",
                    isReceiptCancel: singleData[19] || "",
                })


                setPaymentMode(data.finTransData.map((item) => (
                    {
                        payMode: item[14] || '',
                        chequeNo: item[15] || '',
                        chequeDate: item[16] === null ? null : new Date(item[16]),
                        bankDetails: item[17] || '',
                        amount: item[18] || '',
                        status: item[4] || '',
                        transId: singleData[0] || "",
                        lineId: item[20] || "",
                    }
                )))

                // setInvoiceData(data.finTransInvData.map((item) => (
                //     {
                //         invoiceNo: item[0] || '',
                //         billingTo: item[2] || '',
                //         billingParty: item[3] || '',
                //         comments: item[4] || '',
                //         importerId: item[5] || '',
                //         importerSrNo: '',
                //         importerName: item[6] || '',
                //         invoiceAmt: item[7] || '',
                //         invoiceBalAmt: item[8] || '',
                //         receiptAmt: item[9] || '',
                //         tdsDeductee: item[12] || '',
                //         tdsAmt: item[11] || '',
                //         tdsStatus: item[10] || '',
                //         localAmount: item[13] || '',
                //         transId: item[14] || '',

                //     }
                // )));


                const finTransMapped = (data.finTransInvData || []).map((item) => {
                    const invoiceAmt = parseFloat(item[14] || 0);
                    const tdsPercentage = parseFloat(item[13] || 0);
                    const tdsStatus = item[10] || '';
                    const tdsAmt = (invoiceAmt * tdsPercentage) / 100;

                    return {
                        invoiceNo: item[0] || '',
                        billingTo: item[2] || '',
                        billingParty: item[3] || '',
                        comments: item[4] || '',
                        importerId: item[5] || '',
                        importerSrNo: '',
                        importerName: item[6] || '',
                        invoiceAmt: item[7] || '',
                        invoiceBalAmt: item[8] || '',
                        receiptAmt: item[9] || '',
                        tdsDeductee: item[12] || '',
                        tdsStatus,
                        tdsPercentage: tdsStatus !== 'Y' ? tdsPercentage : 0,
                        tdsAmt: tdsStatus !== 'Y' ? tdsAmt.toFixed(2) : 0,
                        localAmount: item[14] || '',
                        transId: item[15] || '',
                    };
                });

                const preInvoiceMapped = (data.preInvoiceData || []).map((item) => {
                    const invoiceAmt = parseFloat(item[23] || 0);
                    const tdsPercentage = parseFloat(item[22] || 0);
                    const tdsStatus = item[19] || '';
                    const tdsAmt = (invoiceAmt * tdsPercentage) / 100;

                    return {
                        invoiceNo: item[0] || '',
                        billingTo: item[2] || '',
                        billingParty: item[5] || '',
                        comments: item[6] || '',
                        importerId: item[7] || '',
                        importerSrNo: item[8] || '',
                        importerName: item[9] || '',
                        invoiceAmt: item[10] || '',
                        invoiceBalAmt: item[11] || '',
                        receiptAmt: '',
                        tdsDeductee: item[21] || '',
                        tdsStatus,
                        tdsPercentage: tdsStatus !== 'Y' ? tdsPercentage : 0,
                        tdsAmt: tdsStatus !== 'Y' ? tdsAmt.toFixed(2) : 0,
                        localAmount: item[23] || '',
                        transId: item[14] || '',
                    };
                });

                // Combine and set
                setInvoiceData([...finTransMapped, ...preInvoiceMapped]);









                setSavedInvoiceData(data.finTransInvData.map((item) => (
                    {
                        invoiceNo: item[0] || '',
                        billingTo: item[2] || '',
                        billingParty: item[3] || '',
                        comments: item[4] || '',
                        importerId: item[5] || '',
                        importerSrNo: '',
                        importerName: item[6] || '',
                        invoiceAmt: item[7] || '',
                        invoiceBalAmt: item[8] || '',
                        receiptAmt: item[9] || '',
                        tdsDeductee: item[12] || '',
                        tdsAmt: item[11] || '',
                        tdsStatus: item[10] || '',
                        localAmount: item[13] || '',
                        transId: item[14] || '',
                    }
                )));



                toast.success("Data save successfully!!", {
                    autoClose: 800
                })
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
        axios.get(`${ipaddress}receipt/getAfterSaveData?cid=${companyid}&bid=${branchId}&val=${id}`, {
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


    const getSelectedReceiptData = (val, id, type) => {
        axios.get(`${ipaddress}receipt/getReceiptSelectedData?cid=${companyid}&bid=${branchId}&val=${val}&id=${id}&type=${type}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setLoading(false);
                const data = response.data;

                console.log(' data  getReceiptSelectedData \n ', data);


                const singleData = data.finTransData[0];
                const advanceData = data.advance;

                setFinTrans({
                    companyId: "",
                    branchId: "",
                    docType: singleData[1] || "",
                    transId: singleData[0] || "",
                    transDate: singleData[2] === null ? null : new Date(singleData[2]),
                    status: singleData[4] || "",
                    isOnAccPay: "N",
                    createdBy: singleData[5] || "",
                    partyId: singleData[6] || "",
                    partyName: singleData[7] || "",
                    partyGst: singleData[9] || "",
                    partyAddress1: singleData[10] || "",
                    partyAddress2: singleData[11] || "",
                    partyAddress3: singleData[12] || "",
                    accSrNo: singleData[8] || "",
                    documentAmt: singleData[3] || "",
                    narration: singleData[13] || "",
                    advanceAmt: advanceData === null ? "0" : advanceData[3] || "0",
                    advanceClearedAmt: advanceData === null ? "0" : advanceData[4] || "0",
                    isReceiptCancel: singleData[19] || "",
                })


                // setPaymentMode(data.finTransData.map((item) => (
                //     {
                //         payMode: item[14] || '',
                //         chequeNo: item[15] || '',
                //         chequeDate: item[16] === null ? null : new Date(item[16]),
                //         bankDetails: item[17] || '',
                //         amount: item[18] || '',
                //         status: item[4] || '',
                //     }
                // )))

                // if (data.finTransInvData.length > 0) {
                //     setInvoiceData(data.finTransInvData.map((item) => (
                //         {
                //             invoiceNo: item[0] || '',
                //             billingTo: item[2] || '',
                //             billingParty: item[3] || '',
                //             comments: item[4] || '',
                //             importerId: item[5] || '',
                //             importerSrNo: '',
                //             importerName: item[6] || '',
                //             invoiceAmt: item[7] || '',
                //             invoiceBalAmt: item[8] || '',
                //             receiptAmt: item[9] || '',
                //             tdsDeductee: '',
                //             tdsAmt: '',
                //             tdsStatus: '',
                //             localAmount: ''
                //         }
                //     )))
                // }


                setPaymentMode(data.finTransData.map((item) => (
                    {
                        payMode: item[14] || '',
                        chequeNo: item[15] || '',
                        chequeDate: item[16] === null ? null : new Date(item[16]),
                        bankDetails: item[17] || '',
                        amount: item[18] || '',
                        status: item[4] || '',
                        transId: singleData[0] || "",
                        lineId: item[20] || "",
                    }
                )))







                const finTransMapped = (data.finTransInvData || []).map((item) => {
                    const invoiceAmt = parseFloat(item[14] || 0);
                    const tdsPercentage = parseFloat(item[13] || 0);
                    const tdsStatus = item[10] || '';
                    const tdsAmt = (invoiceAmt * tdsPercentage) / 100;

                    return {
                        invoiceNo: item[0] || '',
                        billingTo: item[2] || '',
                        billingParty: item[3] || '',
                        comments: item[4] || '',
                        importerId: item[5] || '',
                        importerSrNo: '',
                        importerName: item[6] || '',
                        invoiceAmt: item[7] || '',
                        invoiceBalAmt: item[8] || '',
                        receiptAmt: item[9] || '',
                        tdsDeductee: item[12] || '',
                        tdsStatus,
                        tdsPercentage: tdsStatus !== 'Y' ? tdsPercentage : 0,
                        tdsAmt: tdsStatus !== 'Y' ? tdsAmt.toFixed(2) : 0,
                        localAmount: item[14] || '',
                        transId: item[15] || '',
                    };
                });

                let preInvoiceMapped = [];
                if (singleData[19] !== 'Y') {
                    preInvoiceMapped = (data.preInvoiceData || []).map((item) => {
                        const invoiceAmt = parseFloat(item[23] || 0);
                        const tdsPercentage = parseFloat(item[22] || 0);
                        const tdsStatus = item[19] || '';
                        const tdsAmt = (invoiceAmt * tdsPercentage) / 100;

                        return {
                            invoiceNo: item[0] || '',
                            billingTo: item[2] || '',
                            billingParty: item[5] || '',
                            comments: item[6] || '',
                            importerId: item[7] || '',
                            importerSrNo: item[8] || '',
                            importerName: item[9] || '',
                            invoiceAmt: item[10] || '',
                            invoiceBalAmt: item[11] || '',
                            receiptAmt: '',
                            tdsDeductee: item[21] || '',
                            tdsStatus,
                            tdsPercentage: tdsStatus !== 'Y' ? tdsPercentage : 0,
                            tdsAmt: tdsStatus !== 'Y' ? tdsAmt.toFixed(2) : 0,
                            localAmount: item[23] || '',
                            transId: item[14] || '',
                        };
                    });
                }



                // Combine and set
                setInvoiceData([...finTransMapped, ...preInvoiceMapped]);


















                setSavedInvoiceData(data.finTransInvData.map((item) => (
                    {
                        invoiceNo: item[0] || '',
                        billingTo: item[2] || '',
                        billingParty: item[3] || '',
                        comments: item[4] || '',
                        importerId: item[5] || '',
                        importerSrNo: '',
                        importerName: item[6] || '',
                        invoiceAmt: item[7] || '',
                        invoiceBalAmt: item[8] || '',
                        receiptAmt: item[9] || '',
                        tdsDeductee: item[12] || '',
                        tdsAmt: item[11] || '',
                        tdsStatus: item[10] || '',
                        localAmount: item[14] || '',
                        transId: item[15] || '',
                    }
                )));


                toast.success("Data found successfully!!", {
                    autoClose: 800
                })

                closeGateInModal();
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
            })
    }

    const [showModalforPrintReciept, setShowModalforPrintReciept] = useState(false);
    const handleCloseModalPrint = () => {

        setShowModalforPrintReciept(false);
    };
    const handleModelOPenForPrintReciept = () => {
        setShowModalforPrintReciept(true);

    }


    const handlePrint1 = async (type) => {
        setLoading(true);
        console.log("inside the print")

        // finTrans.transId
        console.log("finTrans.transId", finTrans.transId);
        console.log("finTrans.transId", finTrans.docType);
        const transId = finTrans.transId;
        const docType = finTrans.docType;

        axios.post(`${ipaddress}receiptprint/advreceipt/${companyid}/${branchId}/${transId}/${docType}`, {}, {
            headers: {

                Authorization: `Bearer ${jwtToken}`,
                "Content-Type": "application/json",
            }
        })
            .then(response => {
                // console.log('Response:', response.data); // Handle success
                const pdfBase64 = response.data;
                const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
                const blobUrl = URL.createObjectURL(pdfBlob);
                window.open(blobUrl, '_blank');
                setLoading(false);


            })
            .catch(error => {
                console.error('Error in handlePrint:', error.message);
                setLoading(false);
                //   Handle the error as needed, e.g., show an error toast or message
                // toast.error(`Error: ${error.message}`, {
                //       //     position: toast.POSITION.TOP_CENTER,
                //       //     autoClose: 2000,
                //       // });
                //     }
            });


    }



    // console.log('FintransData : \n', finTrans);


    const handleCancelReciept = async (transId, narration, docType, partyId) => {
        console.log('transId, narration, docType, partyId ', transId, narration, docType, partyId);


        Swal.fire({
            title: "Are you sure?",
            text: "You want to cancel the receipt!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                try {
                    const response = await axios.get(`${ipaddress}receipt/receiptCancel`, {
                        params: {
                            companyId: companyid,
                            branchId,
                            transId,
                            userId, narration, docType
                        }
                    });

                    console.log('handleCancelReciept : ', response.data);

                    Swal.fire({
                        title: "Cancelled!",
                        text: "The receipt has been cancelled.",
                        icon: "success"
                    });
                    getSelectedReceiptData(transId, partyId, docType);
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong while cancelling the receipt!"
                    });
                    console.error("Error in handleCancelReciept:", error);
                } finally {
                    setLoading(false);
                }
            }
        });
    };










    return (
        <div>
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

            <Modal
                isOpen={showModalforPrintReciept}
                toggle={handleCloseModalPrint}
                style={{ maxWidth: 600 }}
            >
                <ModalHeader
                    toggle={handleCloseModalPrint}
                    style={{
                        backgroundColor: "#80cbc4",
                        color: "black",
                        fontFamily: "Your-Heading-Font",
                        textAlign: "center",
                        background: "#26a69a",
                        boxShadow: "0px 5px 10px rgba(0, 77, 64, 0.3)",
                        border: "1px solid rgba(0, 0, 0, 0.3)",
                        borderRadius: "0",
                        backgroundColor: "#85144b",
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        backgroundImage:
                            'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        //backgroundPosition: 'center',
                        backgroundPosition: "center",
                    }}
                >
                    {/* <FontAwesomeIcon icon="fa-solid fa-truck-arrow-right" style={{ marginRight: '9px' }}/> */}
                    <FontAwesomeIcon icon={faArrowUpFromBracket}
                        style={{ marginRight: "9px" }}
                    />
                    View Receipt
                </ModalHeader>
                <ModalBody
                    style={{
                        backgroundImage:
                            "url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)",
                        backgroundSize: "cover",
                    }}
                >


                    <Form>

                        {/* Example form fields for the modal */}
                        <Row>
                            <Col md={6}>
                                <Card
                                    style={{
                                        width: '95%'
                                    }}
                                >
                                    <img
                                        alt="Sample"
                                        style={{ width: '100%', height: '300px', objectFit: 'contain' }}
                                        src={printformat1}

                                    />
                                    <CardBody>
                                        <CardTitle tag="h5">
                                            Receipt Format 1
                                        </CardTitle>
                                        {/* <CardSubtitle
                      className="mb-2 text-muted"
                      tag="h6"
                    >
                      Set Default
                      <Input type="radio" name="radio1" style={{ marginLeft: "10px" }} />

                    </CardSubtitle> */}

                                        <Button color="primary" outline
                                        // onClick={() => handlePrint("PRINT")}
                                        >
                                            <FontAwesomeIcon
                                                icon={faUsersViewfinder}
                                                style={{ marginRight: "5px" }}
                                            />
                                            View
                                        </Button>

                                    </CardBody>
                                </Card>
                            </Col>

                            <Col md={6}>
                                <Card
                                    style={{
                                        width: '95%'
                                    }}
                                >
                                    <img
                                        alt="Sample"
                                        style={{ width: '100%', height: '300px', objectFit: 'contain' }}
                                        src={printformat2}

                                    />
                                    <CardBody>
                                        <CardTitle tag="h5">
                                            Receipt  Format 2
                                        </CardTitle>
                                        {/* <CardSubtitle
                      className="mb-2 text-muted"
                      tag="h6"
                    >
                      Set Default
                      <Input type="radio" name="radio1" style={{ marginLeft: "10px" }} />
                    </CardSubtitle> */}

                                        <Button color="primary" outline
                                            onClick={() => handlePrint1("PRINT")}
                                        >
                                            <FontAwesomeIcon
                                                icon={faUsersViewfinder}
                                                style={{ marginRight: "5px" }}
                                            />
                                            View
                                        </Button>
                                    </CardBody>
                                </Card>
                            </Col>

                        </Row>



                        {/* Add more form fields as needed */}
                    </Form>
                </ModalBody>
                <ModalFooter
                    style={{
                        backgroundImage:
                            "url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)",
                        backgroundSize: "cover",
                        display: "flex",
                        justifyContent: "center",

                    }}
                >

                    <div className="d-flex justify-content-center">
                        <Button color="danger" outline onClick={handleCloseModalPrint}>
                            <FontAwesomeIcon
                                icon={faBackward}
                                style={{ marginRight: "5px" }}
                            />
                            Back
                        </Button>

                    </div>
                </ModalFooter>
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
                    /> Search Receipt Data</h5>



                </ModalHeader>
                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                    <Row>
                        <Col md={5}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Search by DOC Type / DOC No / Party Name
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
                                <tr className='text-center'>
                                    <th scope="col">#</th>
                                    <th scope="col">DOC Type</th>
                                    <th scope="col">DOC No</th>
                                    <th scope="col">Trans Date</th>
                                    <th scope="col">Party Name</th>
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
                                    <tr key={index} className='text-center'>
                                        <td>
                                            <input type="radio" onChange={() => getSelectedReceiptData(item[1], item[3], item[0])} name="radioGroup" value={item[0]} />
                                        </td>
                                        <td>{item[0]}</td>
                                        <td>{item[1]}</td>
                                        <td>{item[2]}</td>
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
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Trans type
                        </label>
                        <Input
                            className="form-control"
                            type="select"
                            id="docType"
                            name='docType'
                            value={finTrans.docType}
                            onChange={handleChange}

                        >
                            <option value=""></option>
                            <option value="AD">Advance</option>
                            <option value="RE">Receipt</option>
                            <option value="AJ">Adjustment</option>
                        </Input>

                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Receipt Id
                        </label>
                        <Row>
                            <Col md={9}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    id="transId"
                                    name='transId'
                                    value={finTrans.transId}
                                    onChange={handleChange}
                                    disabled
                                />
                            </Col>
                            <Col md={3} className="d-flex justify-content-end" >
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
                            Receipt Date
                        </label>
                        <div style={{ position: 'relative' }}>
                            <DatePicker
                                selected={finTrans.transDate}
                                disabled
                                id='transDate'
                                name='transDate'
                                dateFormat="dd/MM/yyyy HH:mm"
                                className="form-control border-right-0 InputField"
                                customInput={<Input style={{ width: '100%' }} />}
                                wrapperClassName="custom-react-datepicker-wrapper"
                            />
                            <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                        </div>

                    </FormGroup>
                </Col>
                {/* <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Is On Account Pay
                        </label>
                        <Input
                            className="form-control"
                            type="checkbox"
                            style={{ height: 25 }}
                            id="isOnAccPay"
                            name='isOnAccPay'
                            value={finTrans.isOnAccPay}
                            onChange={handleChange}
                        />

                    </FormGroup>
                </Col> */}

                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Receipt Amt
                        </label>
                        <Input
                            className="form-control"
                            type="text"
                            id="documentAmt"
                            name="documentAmt"
                            value={paymentMode.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0).toFixed(2)}
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
                            value={finTrans.status === 'A' ? 'Approved' : finTrans.status}
                            onChange={handleChange}
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
                            value={finTrans.createdBy}
                            onChange={handleChange}
                            disabled
                        />

                    </FormGroup>
                </Col>

            </Row>
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Party Name
                        </label>
                        <Select
                            value={finTrans.partyId ? { value: finTrans.partyId, label: finTrans.partyName } : null}
                            onChange={handleAccChange}
                            onInputChange={getAccData}
                            isDisabled={finTrans.docType === "" || finTrans.transId}
                            options={accData}
                            placeholder="Select Party"
                            isClearable
                            menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                            menuPosition="fixed" // Sets the dropdown menu position to fixed    
                            id="othPartyId"
                            name="othPartyId"
                            className="autocompleteHeight"
                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    height: 32,  // Set the height of the select input
                                    minHeight: 32,
                                    border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                                    width: "180px", // Set the width to 180px
                                    height: "1px"
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
                            Party GSTIN
                        </label>
                        <Input
                            className="form-control"
                            type="text"
                            id="partyGst"
                            name='partyGst'
                            value={finTrans.partyGst}
                            onChange={handleChange}
                            disabled
                        />

                    </FormGroup>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Party Address1
                        </label>
                        <Input
                            className="form-control"
                            type="text"
                            id="partyAddress1"
                            name='partyAddress1'
                            value={finTrans.partyAddress1}
                            onChange={handleChange}
                            disabled
                        />

                    </FormGroup>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Party Address2
                        </label>
                        <Input
                            className="form-control"
                            type="text"
                            id="partyAddress2"
                            name='partyAddress2'
                            value={finTrans.partyAddress2}
                            onChange={handleChange}
                            disabled
                        />

                    </FormGroup>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Party Address3
                        </label>
                        <Input
                            className="form-control"
                            type="text"
                            id="partyAddress3"
                            name='partyAddress3'
                            value={finTrans.partyAddress3}
                            onChange={handleChange}
                            disabled
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
                            id="narration"
                            name='narration'
                            value={finTrans.narration}
                            onChange={handleChange}
                            maxLength={250}
                        />

                    </FormGroup>
                </Col>
            </Row>
            <div id="datepicker-portal2"></div>
            <Row className="justify-content-center">
                <Col xs={12} className="d-flex flex-wrap justify-content-center gap-2">
                    <button
                        className="btn btn-outline-primary btn-margin newButton"
                        style={{ marginRight: 10, fontSize: 13 }}
                        id="submitbtn2"
                        onClick={finTrans.docType === 'AD' ? handleSave : handleSave1}
                        disabled={finTrans.isReceiptCancel === 'Y' || (finTrans.docType === 'RE' && invoiceData.length === 0)}
                    >
                        <FontAwesomeIcon
                            icon={faSave}
                            style={{ marginRight: "5px" }}
                        />
                        Save
                    </button>


                    <button
                        className="btn btn-outline-danger btn-margin newButton"
                        style={{ marginRight: 10, fontSize: 13 }}
                        id="submitbtn2"
                        onClick={handleClear}
                    >
                        <FontAwesomeIcon
                            icon={faRefresh}
                            style={{ marginRight: "5px" }}
                        />
                        Clear
                    </button>

                    <button
                        className="btn btn-outline-primary btn-margin newButton"
                        style={{ marginRight: 10, fontSize: 13 }}
                        id="submitbtn2"
                        onClick={addPaymentMode}
                        disabled={finTrans.isReceiptCancel === 'Y'}
                    >
                        <FontAwesomeIcon
                            icon={faAdd}
                            style={{ marginRight: "5px" }}
                        />
                        Add Payment Mode
                    </button>

                    <button
                        className="btn btn-outline-primary btn-margin newButton"
                        style={{ marginRight: 10, fontSize: 13 }}
                        id="submitbtn2"
                        onClick={handleModelOPenForPrintReciept}

                    >
                        <FontAwesomeIcon
                            icon={faPrint}
                            style={{ marginRight: "5px" }}
                        />
                        Print
                    </button>

                    {(finTrans.transId !== "" && (finTrans.docType === 'AJ' || finTrans.docType === 'RE') && finTrans.isReceiptCancel !== 'Y' &&
                        (role === 'ROLE_ADMIN' || allowDelete === 'Y')) && (
                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ marginRight: 10, fontSize: 13 }}
                                id="submitbtn2"
                                onClick={() => handleCancelReciept(finTrans.transId, finTrans.narration, finTrans.docType, finTrans.partyId)}
                            >
                                <FontAwesomeIcon
                                    icon={faCancel}
                                    style={{ marginRight: "5px" }}
                                />
                                Cancel
                            </button>
                        )}

                </Col>
            </Row>
            {finTrans.docType === "AD" && (
                <>
                    <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
                        <Table className="table table-bordered" style={{ border: '2px solid black' }}>
                            <thead>
                                <tr>
                                    <th scope="col" colSpan={2} style={{ color: "black" }}>
                                        Advance Balance
                                    </th>
                                </tr>
                                <tr>

                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Advance Amount
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Balance for Clear Amount.
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='text-center'>
                                    <td>{finTrans.advanceAmt}</td>
                                    <td>{finTrans.advanceClearedAmt}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>


                    <div className="mt-3 table-responsive" style={{ maxHeight: "400px" }}>
                        <Table className="table table-bordered table-responsive" style={{ border: '2px solid black' }}>
                            <thead>
                                <tr>
                                    <th scope="col" colSpan={7} style={{ color: "black", width: 50 }}>
                                        Advance Payment Details
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="col" className="text-center" style={{ color: "black", width: 50 }}>
                                        Sr No
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black", width: 150 }}>
                                        Payment Mode
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black", width: 200 }}>
                                        Cheque/Transaction No <span style={{ color: 'red' }}>*</span>
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black", width: 210 }}>
                                        Cheque/Transaction Date <span style={{ color: 'red' }}>*</span>
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Bank Details
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black", width: 150 }}>
                                        Amount
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black", width: 100 }}>
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentMode.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Input
                                                className="form-control"
                                                type="select"
                                                id="payMode"
                                                name='payMode'
                                                value={item.payMode}
                                                onChange={(e) => handlePaymentModeChange(e, index)}
                                                style={{ width: 150 }}
                                                disabled={finTrans.transId !== ""}
                                            >
                                                <option value=""></option>
                                                <option value="EFT">EFT</option>
                                                <option value="RTGS">RTGS</option>
                                                <option value="CASH">CASH</option>
                                                <option value="CHEQUE">CHEQUE</option>
                                                {finTrans.docType !== "AD" && (
                                                    <option value="TDS">TDS</option>
                                                )}
                                            </Input>

                                        </td>
                                        <td>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="chequeNo"
                                                name='chequeNo'
                                                onChange={(e) => handlePaymentModeChange(e, index)}
                                                maxLength={25}
                                                value={item.chequeNo}
                                                style={{ width: 180 }}
                                                disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.transId !== ""}
                                            />
                                        </td>
                                        <td>
                                            <div style={{ position: 'relative', width: 210 }}>
                                                <DatePicker
                                                    selected={item.chequeDate} // The currently selected date for the row
                                                    onChange={(selectedDate) => {
                                                        const updatedDate = new Date(selectedDate); // Ensure it's a Date object
                                                        const currentTime = new Date();
                                                        updatedDate.setHours(currentTime.getHours());
                                                        updatedDate.setMinutes(currentTime.getMinutes());
                                                        updatedDate.setSeconds(currentTime.getSeconds());
                                                        updatedDate.setMilliseconds(currentTime.getMilliseconds());

                                                        setPaymentMode((prevState) => {
                                                            const updatedRows = [...prevState];
                                                            updatedRows[index] = {
                                                                ...updatedRows[index],
                                                                chequeDate: updatedDate,
                                                            };
                                                            return updatedRows;
                                                        });
                                                    }}
                                                    portalId="datepicker-portal2"
                                                    disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.transId !== ""}
                                                    popperPlacement="top-start"
                                                    id="chequeDate" // Unique identifier
                                                    name="chequeDate" // Name of the field
                                                    dateFormat="dd/MM/yyyy HH:mm" // Display format for the date and time
                                                    showTimeInput // Enables time input in the date picker
                                                    className="form-control border-right-0 InputField" // Custom class names for styling
                                                    customInput={<Input style={{ width: '100%' }} />} // Custom input element for styling
                                                    wrapperClassName="custom-react-datepicker-wrapper" // Custom wrapper for date picker
                                                />

                                                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                            </div>
                                        </td>
                                        <td>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="bankDetails"
                                                name='bankDetails'
                                                value={item.bankDetails}
                                                onChange={(e) => handlePaymentModeChange(e, index)}
                                                maxLength={50}
                                                disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.transId !== ""}

                                            />
                                        </td>
                                        <td>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="amount"
                                                name='amount'
                                                value={item.amount}
                                                disabled={item.payMode === '' || item.payMode === 'TDS' || finTrans.transId !== ""}
                                                onChange={(e) => handlePaymentModeChange(e, index)}
                                                style={{ width: 180 }}

                                            />
                                        </td>
                                        <td className='text-center'>

                                            {item.status === '' ? (
                                                <button
                                                    className="btn btn-outline-danger btn-margin newButton"
                                                    style={{ marginRight: 10, fontSize: 13 }}
                                                    id="submitbtn2"
                                                    onClick={() => removePaymentMode(index, item.amount)}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                    />
                                                </button>
                                            ) : (
                                                <span>{item.status}</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </>

            )}


            {finTrans.docType === "RE" && (
                <>
                    <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
                        <Table className="table table-bordered" style={{ border: '2px solid black' }}>
                            <thead>
                                <tr>
                                    <th scope="col" colSpan={9} style={{ color: "black" }}>
                                        Invoice Details For Adjustment
                                    </th>
                                </tr>
                                <tr>

                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Sr No
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Invoice No
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Billing To
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Billing Party
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Comments
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Importer Name
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Invoice Amt.
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Invoice Bal Amt.
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Receipt Amt.
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoiceData.map((item, index) => (
                                    <tr key={index} className='text-center'>
                                        <td>{index + 1}</td>
                                        <td>{item.invoiceNo}</td>
                                        <td>{item.billingTo}</td>
                                        <td>{item.billingParty}</td>
                                        <td>{item.comments}</td>
                                        <td>{item.importerName}</td>
                                        <td>{item.invoiceAmt}</td>
                                        <td>{item.invoiceBalAmt}</td>
                                        <td>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="receiptAmt"
                                                name='receiptAmt'
                                                value={item.receiptAmt}
                                                disabled={finTrans.isReceiptCancel === "Y"}
                                                onChange={(e) => handleInvoiceChange(e, index)}
                                                style={{ width: 180 }}
                                            />
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>
                    </div>


                    <div className="mt-3 table-responsive" style={{ maxHeight: "400px" }}>
                        <Table className="table table-bordered table-responsive" style={{ border: '2px solid black' }}>
                            <thead>
                                <tr>
                                    <th scope="col" colSpan={7} style={{ color: "black", width: 50 }}>
                                        Payment Details
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="col" className="text-center" style={{ color: "black", width: 50 }}>
                                        Sr No
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black", width: 150 }}>
                                        Payment Mode
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black", width: 200 }}>
                                        Cheque/Transaction No <span style={{ color: 'red' }}>*</span>
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black", width: 210 }}>
                                        Cheque/Transaction Date <span style={{ color: 'red' }}>*</span>
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Bank Details
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black", width: 150 }}>
                                        Amount
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black", width: 100 }}>
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentMode.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Input
                                                className="form-control"
                                                type="select"
                                                id="payMode"
                                                name='payMode'
                                                value={item.payMode}
                                                onChange={(e) => handlePaymentModeChange1(e, index)}
                                                style={{ width: 150 }}
                                                disabled={finTrans.isReceiptCancel === "Y"}
                                            >
                                                <option value=""></option>
                                                <option value="EFT">EFT</option>
                                                <option value="RTGS">RTGS</option>
                                                <option value="CASH">CASH</option>
                                                <option value="CHEQUE">CHEQUE</option>
                                                {finTrans.docType !== "AD" && (
                                                    <option value="TDS">TDS</option>
                                                )}
                                            </Input>

                                        </td>
                                        <td>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="chequeNo"
                                                name='chequeNo'
                                                onChange={(e) => handlePaymentModeChange1(e, index)}
                                                maxLength={25}
                                                value={item.chequeNo}
                                                style={{ width: 180 }}
                                                disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.isReceiptCancel === "Y"}
                                            />
                                        </td>
                                        <td>
                                            <div style={{ position: 'relative', width: 210 }}>
                                                <DatePicker
                                                    selected={item.chequeDate} // The currently selected date for the row
                                                    onChange={(selectedDate) => {
                                                        const updatedDate = new Date(selectedDate); // Ensure it's a Date object
                                                        const currentTime = new Date();
                                                        updatedDate.setHours(currentTime.getHours());
                                                        updatedDate.setMinutes(currentTime.getMinutes());
                                                        updatedDate.setSeconds(currentTime.getSeconds());
                                                        updatedDate.setMilliseconds(currentTime.getMilliseconds());

                                                        setPaymentMode((prevState) => {
                                                            const updatedRows = [...prevState];
                                                            updatedRows[index] = {
                                                                ...updatedRows[index],
                                                                chequeDate: updatedDate,
                                                            };
                                                            return updatedRows;
                                                        });
                                                    }}
                                                    portalId="datepicker-portal2"
                                                    disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.isReceiptCancel === "Y"}
                                                    popperPlacement="top-start"
                                                    id="chequeDate" // Unique identifier
                                                    name="chequeDate" // Name of the field
                                                    dateFormat="dd/MM/yyyy HH:mm" // Display format for the date and time
                                                    showTimeInput // Enables time input in the date picker
                                                    className="form-control border-right-0 InputField" // Custom class names for styling
                                                    customInput={<Input style={{ width: '100%' }} />} // Custom input element for styling
                                                    wrapperClassName="custom-react-datepicker-wrapper" // Custom wrapper for date picker
                                                />

                                                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                            </div>
                                        </td>
                                        <td>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="bankDetails"
                                                name='bankDetails'
                                                value={item.bankDetails}
                                                onChange={(e) => handlePaymentModeChange1(e, index)}
                                                maxLength={50}
                                                disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.isReceiptCancel === "Y"}

                                            />
                                        </td>
                                        <td>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="amount"
                                                name='amount'
                                                value={item.amount}
                                                disabled={item.payMode === '' || finTrans.isReceiptCancel === "Y"}
                                                onChange={(e) => handlePaymentModeChange1(e, index)}
                                                style={{ width: 180 }}

                                            />
                                        </td>
                                        <td className='text-center'>

                                            {item.status === '' ? (
                                                <button
                                                    className="btn btn-outline-danger btn-margin newButton"
                                                    style={{ marginRight: 10, fontSize: 13 }}
                                                    id="submitbtn2"
                                                    onClick={() => removePaymentMode(index, item.amount)}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                    />
                                                </button>
                                            ) : (
                                                <span>{item.status}</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                </>
            )}





            {finTrans.docType === "AJ" && (
                <>
                    <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
                        <Table className="table table-bordered" style={{ border: '2px solid black' }}>
                            <thead>
                                <tr>
                                    <th scope="col" colSpan={2} style={{ color: "black" }}>
                                        Advance Balance
                                    </th>
                                </tr>
                                <tr>

                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Advance Amount
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Balance for Clear Amount.
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='text-center'>
                                    <td>{finTrans.advanceAmt}</td>
                                    <td>{finTrans.advanceClearedAmt}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
                        <Table className="table table-bordered" style={{ border: '2px solid black' }}>
                            <thead>
                                <tr>
                                    <th scope="col" colSpan={9} style={{ color: "black" }}>
                                        Invoice Details For Adjustment
                                    </th>
                                </tr>
                                <tr>

                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Sr No
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Invoice No
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Billing To
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Billing Party
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Comments
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Importer Name
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Invoice Amt.
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Invoice Bal Amt.
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Receipt Amt.
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoiceData.map((item, index) => (
                                    <tr key={index} className='text-center'>
                                        <td>{index + 1}</td>
                                        <td>{item.invoiceNo}</td>
                                        <td>{item.billingTo}</td>
                                        <td>{item.billingParty}</td>
                                        <td>{item.comments}</td>
                                        <td>{item.importerName}</td>
                                        <td>{item.invoiceAmt}</td>
                                        <td>{item.invoiceBalAmt}</td>
                                        <td>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="receiptAmt"
                                                name='receiptAmt'
                                                value={item.receiptAmt}
                                                disabled={finTrans.transId !== ""}
                                                onChange={(e) => handleInvoiceChange1(e, index)}
                                                style={{ width: 180 }}

                                            />
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>
                    </div>


                    <div className="mt-3 table-responsive" style={{ maxHeight: "400px" }}>
                        <Table className="table table-bordered table-responsive" style={{ border: '2px solid black' }}>
                            <thead>
                                <tr>
                                    <th scope="col" colSpan={7} style={{ color: "black", width: 50 }}>
                                        Payment Details
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="col" className="text-center" style={{ color: "black", width: 50 }}>
                                        Sr No
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black", width: 150 }}>
                                        Payment Mode
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black", width: 200 }}>
                                        Cheque/Transaction No <span style={{ color: 'red' }}>*</span>
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black", width: 210 }}>
                                        Cheque/Transaction Date <span style={{ color: 'red' }}>*</span>
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Bank Details
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black", width: 150 }}>
                                        Amount
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black", width: 100 }}>
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentMode.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Input
                                                className="form-control"
                                                type="select"
                                                id="payMode"
                                                name='payMode'
                                                value={item.payMode}
                                                onChange={(e) => handlePaymentModeChange1(e, index)}
                                                style={{ width: 150 }}
                                                disabled={finTrans.transId !== ""}
                                            >
                                                <option value=""></option>
                                                <option value="ADVANCE">ADVANCE</option>
                                                {finTrans.docType !== "AD" && (
                                                    <option value="TDS">TDS</option>
                                                )}
                                            </Input>

                                        </td>
                                        <td>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="chequeNo"
                                                name='chequeNo'
                                                onChange={(e) => handlePaymentModeChange1(e, index)}
                                                maxLength={25}
                                                value={item.chequeNo}
                                                style={{ width: 180 }}
                                                disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.transId !== ""}
                                            />
                                        </td>
                                        <td>
                                            <div style={{ position: 'relative', width: 210 }}>
                                                <DatePicker
                                                    selected={item.chequeDate} // The currently selected date for the row
                                                    onChange={(selectedDate) => {
                                                        const updatedDate = new Date(selectedDate); // Ensure it's a Date object
                                                        const currentTime = new Date();
                                                        updatedDate.setHours(currentTime.getHours());
                                                        updatedDate.setMinutes(currentTime.getMinutes());
                                                        updatedDate.setSeconds(currentTime.getSeconds());
                                                        updatedDate.setMilliseconds(currentTime.getMilliseconds());

                                                        setPaymentMode((prevState) => {
                                                            const updatedRows = [...prevState];
                                                            updatedRows[index] = {
                                                                ...updatedRows[index],
                                                                chequeDate: updatedDate,
                                                            };
                                                            return updatedRows;
                                                        });
                                                    }}
                                                    portalId="datepicker-portal2"
                                                    disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.transId !== ""}
                                                    popperPlacement="top-start"
                                                    id="chequeDate" // Unique identifier
                                                    name="chequeDate" // Name of the field
                                                    dateFormat="dd/MM/yyyy HH:mm" // Display format for the date and time
                                                    showTimeInput // Enables time input in the date picker
                                                    className="form-control border-right-0 InputField" // Custom class names for styling
                                                    customInput={<Input style={{ width: '100%' }} />} // Custom input element for styling
                                                    wrapperClassName="custom-react-datepicker-wrapper" // Custom wrapper for date picker
                                                />

                                                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                            </div>
                                        </td>
                                        <td>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="bankDetails"
                                                name='bankDetails'
                                                value={item.bankDetails}
                                                onChange={(e) => handlePaymentModeChange1(e, index)}
                                                maxLength={50}
                                                disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || finTrans.transId !== ""}

                                            />
                                        </td>
                                        <td>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="amount"
                                                name='amount'
                                                value={item.amount}
                                                disabled={item.payMode === '' || finTrans.transId !== "" || item.payMode === "ADVANCE"}
                                                onChange={(e) => handlePaymentModeChange1(e, index)}
                                                style={{ width: 180 }}

                                            />
                                        </td>
                                        <td className='text-center'>

                                            {item.status === '' ? (
                                                <button
                                                    className="btn btn-outline-danger btn-margin newButton"
                                                    style={{ marginRight: 10, fontSize: 13 }}
                                                    id="submitbtn2"
                                                    disabled={item.payMode === "ADVANCE"}
                                                    onClick={() => removePaymentMode(index, item.amount)}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                    />
                                                </button>
                                            ) : (
                                                <span>{item.status}</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                </>
            )}
        </div>
    )
}


