// import React, { useContext, useEffect } from 'react'
// import { FaChartBar, FaCog, FaTruck, FaUsers } from 'react-icons/fa';
// import styles from "../Dashboard.module.css";
// import { BarChart, GaugeContainer, GaugeReferenceArc, GaugeValueArc, useGaugeState } from '@mui/x-charts';
// import { PieChart } from '@mui/x-charts/PieChart';
// import { useState } from 'react';
// import GaugeChart from 'react-gauge-chart';
// import { TooltipProps } from 'recharts';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faTachometerAlt, faTruckFront } from '@fortawesome/free-solid-svg-icons';
// import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Table } from 'reactstrap';
// import { Player } from '@lottiefiles/react-lottie-player';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// import gauge from '../gauge.json';
// import warehouse from '../bondingann.json';
// import Lottie from 'lottie-react';
// import useAxios from '../Components/useAxios';
// import AuthContext from '../Components/AuthProvider';
// import { useNavigate } from 'react-router-dom';
// import ipaddress from '../Components/IpAddress';
// import moment from 'moment';

// import { IconButton } from '@mui/material';
// import { Pagination } from 'react-bootstrap';

// export default function GeneralDashboard() {

//   const axios = useAxios();
//   const { isAuthenticated } = useContext(AuthContext);

//   const navigate = useNavigate();
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

//   const data = [
//     { label: 'Windows', value: 50 },
//     { label: 'MacOS', value: 30 },
//     { label: 'Linux', value: 20 },
//   ];











//   // function GaugePointer() {
//   //   const { valueAngle, outerRadius, cx, cy } = useGaugeState();

//   //   if (valueAngle === null) {
//   //     // No value to display
//   //     return null;
//   //   }

//   //   const target = {
//   //     x: cx + outerRadius * Math.sin(valueAngle),
//   //     y: cy - outerRadius * Math.cos(valueAngle),
//   //   };
//   //   return (
//   //     <g>
//   //       <circle cx={cx} cy={cy} r={5} fill="red" />
//   //       <path
//   //         d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
//   //         stroke="red"
//   //         strokeWidth={3}
//   //       />
//   //     </g>
//   //   );
//   // }


//   const [importData, setImportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   // '2024-08-06 11:01:43.987000'
//   const currentDate = new Date();
//   currentDate.setHours(8, 0, 0, 0);
//   const [startDate, setStartDate] = useState(
//     currentDate
//   );
//   const [endDate, setEndDate] = useState(new Date());



//   const [nocCount, setNocCount] = useState(0);
//   const [nocSum, setNocSum] = useState(0);
//   const [nocCif, setNocCif] = useState(0);
//   const [nocArea, setNocArea] = useState(0);

//   const [exbondCount, setExbondCount] = useState(0);
//   const [exbondSum, setExbondSum] = useState(0);
//   const [exbondCif, setExbondCif] = useState(0);
//   const [exbondArea, setExbondArea] = useState(0);

//   const [inbondCount, setInbondCount] = useState(0);
//   const [inbondSum, setInbondSum] = useState(0);
//   const [inbondCif, setInbondCif] = useState(0);
//   const [inbondArea, setInbondArea] = useState(0);
//   const [customAppDuty, setCustomAppDuty] = useState(0);
//   const [inbondAppDuty, setInbondAppDuty] = useState(0);
//   const [remainigDuty, setRemainingDuty] = useState(0);

//   const [customAppCif, setCustomAppCif] = useState(0);
//   const [inbondAppCif, setInbondAppCif] = useState(0);
//   const [remainingCif, setRemainingCif] = useState(0);


//   const [customAppArea, setCustomAppArea] = useState(0);
//   const [inbondAppArea, setInbondAppArea] = useState(0);
//   const [remainingAreaaa, setRemainingArea] = useState(0);

//   const [inbondPackagesInventory, setInbondPackagesInventory] = useState(0);
//   const [inbondGrossWeightInventory, setInbondGrossWeightInventory] = useState(0);

//   // const [gaugeValue,setGaugeValue] =useState(0);



//   const handleDashBoardData = async () => {
//     setLoading(true);
//     try {

//       console.log("startDate : ", startDate);
//       console.log("endDate : ", endDate);

//       const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DD HH:mm') : '';
//       const formattedEndDate = endDate ? moment(endDate).format('YYYY-MM-DD HH:mm') : '';

//       const response = await axios.get(
//         `${ipaddress}api/dashboard/getGeneralDashBoradData?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
//         {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`
//           }
//         }
//       );
//       const data = response.data;
//       console.log("last wek data ", data.lastWeekGateInData);

//       setNocCount(data.noc.nocCount);
//       setNocSum(data.noc.dutysum);
//       setNocCif(data.noc.cifSum);
//       setNocArea(data.noc.area);

//       setInbondCount(data.inbond.nocCount);
//       setInbondSum(data.inbond.dutysum);
//       setInbondCif(data.inbond.cifSum);
//       setInbondArea(data.inbond.area);

//       setExbondCount(data.exbond.nocCount);
//       setExbondSum(data.exbond.dutysum);
//       setExbondCif(data.exbond.cifSum);
//       setExbondArea(data.exbond.area);

//       const customeData = response.data;
//       setCustomAppDuty(customeData.custom.approvedDuty);
//       setInbondAppDuty(customeData.custom.inBondDuty);
//       setRemainingDuty(customeData.custom.remaining);

//       setCustomAppCif(customeData.custom.approvedCif);
//       setInbondAppCif(customeData.custom.inBondCif);
//       setRemainingCif(customeData.custom.remainingCif);

//       setCustomAppArea(customeData.custom.approvedArea);
//       setInbondAppArea(customeData.custom.inBondArea);
//       setRemainingArea(customeData.custom.remainingArea);

//       setInbondPackagesInventory(customeData.getBondInventoryMap.totalInBondedPackages);
//       setInbondGrossWeightInventory(customeData.getBondInventoryMap.totalInBondGrossWt);

//       console.log("customeData.custom ", customeData.custom.approvedDuty);
//       console.log("customeData.custom ", customeData.custom.inBondDuty);

//       console.log("data            ", data);
//       if (data && typeof data === 'object' && !Array.isArray(data)) {
//         // Convert object to an array with both keys and values
//         const inventoryArray = Object.entries(data).map(([key, value]) => ({
//           name: key, // Key becomes the name (e.g., "JOB ORDER")
//           ...value   // Spread the value (which is another object)
//         }));

//         setImportData(inventoryArray);
//       } else {
//         // If already an array, directly set it
//         setImportData(data);
//       }

//     } catch (error) {

//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     handleDashBoardData();
//   }, []);

//   const approvedDuty = Math.max(customAppDuty || 1, 1); // Total approved duty
//   const inBondDuty = Math.min(inbondAppDuty || 0, approvedDuty); // Used duty (clamped to approvedDuty)
//   const remainingDuty = remainigDuty; // Balance duty
//   const remainingPercentage = (remainingDuty / approvedDuty) * 100; // Percentage of remaining duty
//   // const gaugeValue = 100 - remainingPercentage; // Used percentage based on approvedDuty
//   const gaugeValue = parseFloat((100 - remainingPercentage).toFixed(2));
//   const useddDuty = Math.max(approvedDuty - remainingDuty, 0).toFixed(3); // Rounded to 3 decimal places




//   const approvedCif = Math.max(customAppCif || 1, 1); // Total approved duty
//   const inBondCif = Math.min(inbondAppCif || 0, approvedCif); // Used duty (clamped to approvedDuty)
//   const remaininggCif = remainingCif; // Balance duty
//   const remainingPercentageCif = (remaininggCif / approvedCif) * 100; // Percentage of remaining duty
//   // const gaugeValueCif = 100 - remainingPercentageCif;
//   const gaugeValueCif = parseFloat((100 - remainingPercentageCif).toFixed(2));


//   const useddCif = Math.max(approvedCif - remaininggCif, 0).toFixed(3); // Rounded to 3 decimal places


//   const approvedArea = Math.max(customAppArea || 1, 1); // Total approved duty
//   const inBondArea = Math.min(inbondAppArea || 0, approvedArea); // Used duty (clamped to approvedDuty)
//   const remaininggArea = remainingAreaaa; // Balance duty
//   const remainingPercentageArea = ((remaininggArea / approvedArea) * 100).toFixed(2); // Percentage with 2 decimal places
//   // const gaugeValueArea = 100 - remainingPercentageArea; // Used percentage based on approvedDuty
//   const gaugeValueArea = parseFloat((100 - remainingPercentageArea).toFixed(2));
//   const useddArea = Math.max(approvedArea - remaininggArea, 0).toFixed(3); // Rounded to 3 decimal places




//   function GaugePointer() {
//     const { valueAngle, outerRadius, cx, cy } = useGaugeState();

//     if (valueAngle === null) {
//       // No value to display
//       return null;
//     }

//     const target = {
//       x: cx + outerRadius * Math.sin(valueAngle),
//       y: cy - outerRadius * Math.cos(valueAngle),
//     };
//     return (
//       <g>
//         <circle cx={cx} cy={cy} r={5} fill="#000d1a" />
//         <path
//           d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
//           stroke="#000d1a"
//           strokeWidth={3}
//         />
//       </g>
//     );
//   }

//   const [tooltip, setTooltip] = useState(null); // Tooltip state
//   const [tooltipCif, setTooltipCif] = useState(null); // Tooltip state
//   const [tooltipArea, setTooltipArea] = useState(null); // Tooltip state

//   const handleMouseEnter = (type, cx, cy) => {
//     const data =
//       type === "used"
//         ? `Used: ${inBondDuty} (${gaugeValue.toFixed(2)}%)`
//         : `Remaining: ${remainingDuty} (${remainingPercentage.toFixed(2)}%)`;
//     setTooltip({ text: data, x: cx, y: cy });
//   };

//   const handleMouseLeave = () => {
//     setTooltip(null); // Hide tooltip
//   };

//   const handleMouseEnterCif = (type, cx, cy) => {
//     const data =
//       type === "used"
//         ? `Used: ${inBondCif} (${gaugeValueCif.toFixed(2)}%)`
//         : `Remaining: ${remainingCif} (${remainingPercentageCif.toFixed(2)}%)`;
//     setTooltipCif({ text: data, x: cx, y: cy });
//   };
//   const handleMouseLeaveCif = () => {
//     setTooltipCif(null); // Hide tooltip
//   };





//   const handleMouseEnterArea = (type, cx, cy) => {
//     const data =
//       type === "used"
//         ? `Used: ${inBondArea} (${gaugeValueArea.toFixed(2)}%)`
//         : `Remaining: ${remainingAreaaa} (${remainingPercentageArea}%)`;
//     setTooltipArea({ text: data, x: cx, y: cy });
//   };
//   const handleMouseLeaveArea = () => {
//     setTooltipArea(null); // Hide tooltip
//   };







//   const stylesLoader = {
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




//   const formattedDate = formatDate(new Date());

//   function formatDate(date) {
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();

//     const hours = String(date.getHours()).padStart(2, "0");
//     const minutes = String(date.getMinutes()).padStart(2, "0");

//     return `${day}/${month}/${year} ${hours}:${minutes}`;
//   }

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       const data = payload[0].payload; // Access the data of the hovered point
//       return (
//         <div className="custom-tooltip">
//           <p className="label">{`${data.day}: ${data.value}`}</p>
//         </div>
//       );
//     }
//     return null;
//   };


//   const fetchInData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `${ipaddress}api/dashboard/inWiseShp/${companyid}/${branchId}`
//       );

//       if (response && response.data) {
//         const { shippingLineInfo, shippingLineInfoOut, shippingLineInfoOpen } =
//           response.data;

//         const dataaaaa = response.data.shippingLineInfo + response.data.shippingLineInfoOut + response.data.shippingLineInfoOpen
//         const totalInfo = response.data.Total; // Total information object
//         const totalInfoOut = response.data.TotalOut; // Total information object

//         const totalInfoOpen = response.data.totalInfoOpen; // Total information object

//         const lineInfo = response.data.shippingLineInfo;

//         const lineInfoout = response.data.shippingLineInfoOut;

//         const lineInfoOpen = response.data.shippingLineInfoOpen;



//         setShippingLIneInfo(response.data);
//         // setCountIn(totalInfo.TotalCount);
//         // setCountSize20In(totalInfo.TotalSize20Count);
//         // setCountSize40In(totalInfo.TotalSize40Count);

//         // setCountOut(totalInfoOut.totalCountOut);
//         // setCountSize20Out(totalInfoOut.totalSize20CountOut);
//         // setCountSize40Out(totalInfoOut.totalSize40CountOut);

//         // setCountBalance(totalInfoOpen.totalCountOpen);
//         // setCountSize20(totalInfoOpen.totalSize20CountOpen);
//         // setCountSize40(totalInfoOpen.totalSize40CountOpen);

//       } else {
//         throw new Error("Failed to get Data");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInData();
//   }, [0]);





//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 5;
//   const [shippingLIneInfo, setShippingLIneInfo] = useState({});
//   const filteredShippingLineNames = Object.keys(shippingLIneInfo).filter(
//     (shippingLineName) =>
//       !["Total", "TotalOut", "totalInfoOpen"].includes(shippingLineName)
//   );
//   const totalItems = filteredShippingLineNames.length;
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   // const currentRecords = Object.keys(shippingLIneInfo).slice(indexOfFirstRecord, indexOfLastRecord);

//   const currentItems = filteredShippingLineNames.slice(
//     indexOfFirstRecord,
//     indexOfLastRecord
//   );
//   const totalPages = Math.ceil(
//     Object.keys(filteredShippingLineNames).length / recordsPerPage
//   );

//   // Function to handle pagination page change
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // Generate an array of page numbers to display dynamically
//   const displayPages = () => {
//     const centerPageCount = 5; // Number of page numbers to show around the current page
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

//   return (
//     <>
//       {loading && (
//         <div className="loader" style={stylesLoader.overlay}>
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
//       <div className={styles.dashboardBonding}>




//         <section className={styles.widgetsCFSBonding} style={{ position: "relative", overflow: "hidden", borderRadius: "12px" }}>
//           <div
//             style={{
//               position: "relative",
//               zIndex: 2,
//               padding: "9px",
//               borderRadius: "12px",
//               backgroundImage: "linear-gradient(to top, #5ee7df 0%, #b490ca 100%)",
//               boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             <h5
//               style={{
//                 textAlign: "center",
//                 fontSize: "1.5rem",
//                 color: "Green",
//                 marginBottom: "9px",
//               }}
//             >
//               {`General Bonding Data  (${formattedDate})`}
//             </h5>

//             <table
//               style={{
//                 width: "100%",
//                 borderCollapse: "collapse",
//                 borderRadius: "8px",
//                 overflow: "hidden",
//                 fontSize: "1rem",
//                 backgroundColor: "#fff",
//                 textAlign: "center", // Center-align all table text
//               }}
//               className="table-bordered"
//             >
//               <thead>
//                 <tr
//                   style={{
//                     color: "orange",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   <th colSpan={3} style={{ padding: "10px" }}>JOB Entry</th>
//                   <th colSpan={3} style={{ padding: "10px" }}>RECEIVING</th>
//                   <th colSpan={3} style={{ padding: "10px" }}>DELIVERY</th>
//                   <th colSpan={3} style={{ padding: "10px" }}>JOB INV</th>
//                 </tr>

//                 <tr
//                   style={{
//                     backgroundImage: "linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%)",
//                     color: "white",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   <th style={{ padding: "10px" }}>Count</th>
//                   <th style={{ padding: "10px" }}>PKG</th>
//                   <th style={{ padding: "10px" }}>Weight</th>
//                   <th style={{ padding: "10px" }}>Count</th>
//                   <th style={{ padding: "10px" }}>PKG</th>
//                   <th style={{ padding: "10px" }}>Weight</th>
//                   <th style={{ padding: "10px" }}>Count</th>
//                   <th style={{ padding: "10px" }}>PKG</th>
//                   <th style={{ padding: "10px" }}>Weight</th>
//                   <th style={{ padding: "10px" }}>PKG</th>
//                   <th style={{ padding: "10px" }}>Weight</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr style={{ backgroundColor: "#798686", color: "#fff" }}>
//                   <td style={{ padding: "10px" }}>{nocCount}</td>
//                   <td style={{ padding: "10px" }}>{nocSum}</td>
//                   <td style={{ padding: "10px" }}>{nocCif}</td>

//                   {/* <td style={{ padding: "10px" }}>{nocArea}</td> */}
//                   <td style={{ padding: "10px" }}>{inbondCount}</td>
//                   <td style={{ padding: "10px" }}>{inbondSum}</td>
//                   <td style={{ padding: "10px" }}>{inbondCif}</td>

//                   {/* <td style={{ padding: "10px" }}>{inbondArea}</td> */}
//                   <td style={{ padding: "10px" }}>{exbondCount}</td>
//                   <td style={{ padding: "10px" }}>{exbondSum}</td>
//                   <td style={{ padding: "10px" }}>{exbondCif}</td>

//                   {/* <td style={{ padding: "10px" }}>{exbondArea}</td> */}
//                   <td style={{ padding: "10px" }}>{inbondPackagesInventory}</td>
//                   <td style={{ padding: "10px" }}>{inbondGrossWeightInventory}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </section>




//         <section className={styles.widgetschartTopTen} style={{ marginTop: 9 }}>
//           <Row>

//             <Col md={12}>
//               <div className={`${styles.pieChart} ${styles.gradientTwo}`}>
//                 <h6 style={{ textAlign: 'center', color: '#990000' }}>GENERAL BONDING DATA OVERVIEW</h6>
//                 <BarChart
//                   xAxis={[{
//                     scaleType: 'band',
//                     data: ['JOB', 'RECEIVING', 'DELIVERY', 'INV']
//                   }]}
//                   series={[
//                     {
//                       name: 'Count',
//                       data: [
//                         nocCount,        // JOB
//                         inbondCount,     // RECEIVING
//                         exbondCount,     // DELIVERY
//                         //   invCount         // INV (you must define this!)
//                       ],
//                       label: 'Count'
//                     },
//                     {
//                       name: 'PKG',
//                       data: [
//                         nocSum,                  // JOB
//                         inbondSum,              // RECEIVING
//                         exbondSum,              // DELIVERY
//                         inbondPackagesInventory // INV
//                       ],
//                       label: 'PKG'
//                     },
//                     {
//                       name: 'WEIGHT',
//                       data: [
//                         nocCif,                   // JOB
//                         inbondCif,               // RECEIVING
//                         exbondCif,               // DELIVERY
//                         inbondGrossWeightInventory // INV
//                       ],
//                       label: 'WEIGHT'
//                     }
//                   ]}
//                   width={900}
//                   height={300}
//                   margin={{ left: 270 }} // ✅ Increased left margin to fit labels
//                 />
//               </div>
//             </Col>
//           </Row>
//         </section>




//         {/* <Row>
//               <Col> */}
//         <section className={styles.widgetschartTopTen} style={{ marginTop: 4 }}>
//           <div className=" mt-1 table-responsive">
//             <Table className="table table-bordered  custom-table mt-2">
//               <thead style={{ width: "50%", height: "10%" }}>
//                 <tr className="text-center">
//                   <th colSpan="10" style={{ fontSize: "18px" }}>
//                     {" "}
//                     <FontAwesomeIcon
//                       icon={faTruckFront}
//                       style={{ marginRight: 4 }}
//                     />{" "}
//                     Importer Wise Overview
//                   </th>
//                 </tr>
//                 <tr className="text-center">
//                   <th
//                     style={{
//                       background: "#1c6c9b",
//                       color: "orange",
//                       textAlign: "center",
//                     }}
//                   >
//                     Sr No
//                   </th>
//                   <th
//                     style={{
//                       background: "#1c6c9b",
//                       color: "orange",
//                       textAlign: "center",
//                     }}
//                   >
//                     Importer Name
//                   </th>
//                   <th
//                     colSpan="2"
//                     style={{
//                       background: "#1c6c9b",
//                       color: "orange",
//                       textAlign: "center",
//                     }}
//                   >
//                     Job Entry
//                   </th>
//                   <th
//                     colSpan="2"
//                     style={{
//                       background: "#1c6c9b",
//                       color: "orange",
//                       textAlign: "center",
//                     }}
//                   >
//                     Receiving
//                   </th>
//                   <th
//                     colSpan="2"
//                     style={{
//                       background: "#1c6c9b",
//                       color: "orange",
//                       textAlign: "center",
//                     }}
//                   >
//                     Delivery
//                   </th>
//                   <th
//                     colSpan="2"
//                     style={{
//                       background: "#1c6c9b",
//                       color: "orange",
//                       textAlign: "center",
//                     }}
//                   >
//                     Remaining
//                   </th>
//                 </tr>
//                 <tr className="text-center">
//                   <th></th>
//                   <th></th>
//                   <th>PKG</th>
//                   <th>WEIGHT</th>
//                   <th>PKG</th>
//                   <th>WEIGHT</th>
//                   <th>PKG</th>
//                   <th>WEIGHT</th>
//                   <th>PKG</th>
//                   <th>WEIGHT</th>
//                 </tr>
//               </thead>
//               {currentItems.map((shippingLineName, index) => (
//                 <tbody>

//                   <tr
//                     key={index}
//                     className="text-center"
//                     style={{ marginBottom: 0 }}
//                   >
//                     <td
//                       style={{ fontWeight: "bold" }}
//                       className="table-column"
//                     >
//                       {(currentPage - 1) * recordsPerPage + index + 1}
//                     </td>
//                     {/* <td  rowSpan={1}>{index + 1}</td> */}
//                     <td style={{ fontWeight: "bold" }}>
//                       {shippingLineName}
//                     </td>
//                     <td>
//                       {/* {shippingLIneInfo[shippingLineName].Size20CountOpen} */}

//                       {shippingLIneInfo[shippingLineName].jobTotalPackages
//                         ? shippingLIneInfo[shippingLineName].jobTotalPackages
//                         : 0}
//                     </td>
//                     <td>
//                       {/* {shippingLIneInfo[shippingLineName].Size40CountOpen} */}

//                       {shippingLIneInfo[shippingLineName].jobGrossWeightTotal
//                         ? shippingLIneInfo[shippingLineName].jobGrossWeightTotal
//                         : 0}
//                     </td>

//                     <td>
//                       {shippingLIneInfo[shippingLineName].recTotalPackages || 0}{" "}
//                     </td>
//                     <td>
//                       {shippingLIneInfo[shippingLineName].recGrossWeightTotal
//                         ? shippingLIneInfo[shippingLineName].recGrossWeightTotal
//                         : 0}
//                     </td>

//                     <td>
//                       {shippingLIneInfo[shippingLineName].deliveryTotalPackages
//                         ? shippingLIneInfo[shippingLineName].deliveryTotalPackages
//                         : 0}
//                     </td>

//                     <td>
//                       {shippingLIneInfo[shippingLineName].deliveryGrossWeightTotal
//                         ? shippingLIneInfo[shippingLineName].deliveryGrossWeightTotal
//                         : 0}
//                     </td>

//                     <td>
//                       {parseInt(
//                         shippingLIneInfo[shippingLineName].recTotalPackages
//                           ? shippingLIneInfo[shippingLineName]
//                             .recTotalPackages
//                           : 0
//                       ) -
//                         parseInt(
//                           shippingLIneInfo[shippingLineName].deliveryTotalPackages
//                             ? shippingLIneInfo[shippingLineName]
//                               .deliveryTotalPackages
//                             : 0
//                         )}
//                     </td>

//                     <td>
//                       {parseInt(
//                         shippingLIneInfo[shippingLineName].recGrossWeightTotal
//                           ? shippingLIneInfo[shippingLineName]
//                             .recGrossWeightTotal
//                           : 0
//                       ) -
//                         parseInt(
//                           shippingLIneInfo[shippingLineName].deliveryGrossWeightTotal
//                             ? shippingLIneInfo[shippingLineName]
//                               .deliveryGrossWeightTotal
//                             : 0
//                         )}
//                     </td>
//                   </tr>
//                   <td colSpan="10">
//                     <hr
//                       style={{
//                         borderTop: "3px solid #004975",
//                         margin: "0",
//                         padding: "0",
//                       }}
//                     />
//                   </td>
//                 </tbody>
//               ))}
//             </Table>
//             <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>

//               <Pagination.First
//                 onClick={() => handlePageChange(1)}
//                 disabled={currentPage === 1}
//               />
//               <Pagination.Prev
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//               />
//               <Pagination.Ellipsis disabled={displayPages()[0] === 1} />

//               {displayPages().map((pageNumber) => (
//                 <Pagination.Item
//                   key={pageNumber}
//                   active={pageNumber === currentPage}
//                   onClick={() => handlePageChange(pageNumber)}
//                 >
//                   {pageNumber}
//                 </Pagination.Item>
//               ))}

//               <Pagination.Ellipsis
//                 disabled={displayPages().slice(-1)[0] === totalPages}
//               />
//               <Pagination.Next
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//               />
//               <Pagination.Last
//                 onClick={() => handlePageChange(totalPages)}
//                 disabled={currentPage === totalPages}
//               />
//             </Pagination>
//           </div>

//         </section>
//         {/* </Col>
//                 </Row> */}


//       </div>

//     </>
//   )




// }

















import React, { useContext, useEffect, useMemo, useState, useRef } from "react";
import { FaChartBar, FaCog, FaTruck, FaUsers } from "react-icons/fa";
import styles from "../Dashboard.module.css";

import {
  BarChart,
  GaugeContainer,
  GaugeReferenceArc,
  GaugeValueArc,
  useGaugeState,
  pieArcLabelClasses, // ✅ ADD THIS
} from "@mui/x-charts"; // ✅ ENSURE THIS IS FROM x-charts

import { PieChart } from "@mui/x-charts/PieChart";
import GaugeChart from "react-gauge-chart";

import { TooltipProps } from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTachometerAlt,
  faTruckFront,
} from "@fortawesome/free-solid-svg-icons";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
  Table,
} from "reactstrap";

import { Player } from "@lottiefiles/react-lottie-player";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import gauge from "../gauge.json";
import warehouse from "../bondingann.json";
import Lottie from "lottie-react";
import useAxios from "../Components/useAxios";
import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import ipaddress from "../Components/IpAddress";
import moment from "moment";
import { IconButton } from "@mui/material";
import { Pagination } from "react-bootstrap";

export default function GeneralDashboard() {
  const [hoveredImporter, setHoveredImporter] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 });
  const [hoverStates, setHoverStates] = useState({});
  const rowRefs = useRef({});

  // const [hoveredImporter, setHoveredImporter] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [totalSum, setTotalSum] = useState(0);

  const chartSize = {
    height: 180,
    labelRadius: 45,
    innerRadius: 20,
    outerRadius: 70,
    paddingAngle: 2,
    fontSize: 11,
  };

  const axios = useAxios();
  const { isAuthenticated } = useContext(AuthContext);
  const recordsPerPage = 5;
  const itemsPerPage = 5;
  const navigate = useNavigate();
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

  const data = [
    { label: "Windows", value: 50 },
    { label: "MacOS", value: 30 },
    { label: "Linux", value: 20 },
  ];

  // function GaugePointer() {
  //   const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  //   if (valueAngle === null) {
  //     // No value to display
  //     return null;
  //   }

  //   const target = {
  //     x: cx + outerRadius * Math.sin(valueAngle),
  //     y: cy - outerRadius * Math.cos(valueAngle),
  //   };
  //   return (
  //     <g>
  //       <circle cx={cx} cy={cy} r={5} fill="red" />
  //       <path
  //         d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
  //         stroke="red"
  //         strokeWidth={3}
  //       />
  //     </g>
  //   );
  // }

  const [importData, setImportData] = useState([]);
  const [loading, setLoading] = useState(false);
  // '2024-08-06 11:01:43.987000'
  const currentDate = new Date();
  currentDate.setHours(8, 0, 0, 0);
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(new Date());

  const [nocCount, setNocCount] = useState(0);
  const [nocSum, setNocSum] = useState(0);
  const [nocCif, setNocCif] = useState(0);
  const [nocArea, setNocArea] = useState(0);

  const [exbondCount, setExbondCount] = useState(0);
  const [exbondSum, setExbondSum] = useState(0);
  const [exbondCif, setExbondCif] = useState(0);
  const [exbondArea, setExbondArea] = useState(0);

  const [inbondCount, setInbondCount] = useState(0);
  const [inbondSum, setInbondSum] = useState(0);
  const [inbondCif, setInbondCif] = useState(0);
  const [inbondArea, setInbondArea] = useState(0);
  const [customAppDuty, setCustomAppDuty] = useState(0);
  const [inbondAppDuty, setInbondAppDuty] = useState(0);
  const [remainigDuty, setRemainingDuty] = useState(0);

  const [customAppCif, setCustomAppCif] = useState(0);
  const [inbondAppCif, setInbondAppCif] = useState(0);
  const [remainingCif, setRemainingCif] = useState(0);

  const [customAppArea, setCustomAppArea] = useState(0);
  const [inbondAppArea, setInbondAppArea] = useState(0);
  const [remainingAreaaa, setRemainingArea] = useState(0);

  const [inbondPackagesInventory, setInbondPackagesInventory] = useState(0);
  const [inbondGrossWeightInventory, setInbondGrossWeightInventory] =
    useState(0);

  // const [gaugeValue,setGaugeValue] =useState(0);

  const handleDashBoardData = async () => {
    setLoading(true);
    try {
      console.log("startDate : ", startDate);
      console.log("endDate : ", endDate);

      const formattedStartDate = startDate
        ? moment(startDate).format("YYYY-MM-DD HH:mm")
        : "";
      const formattedEndDate = endDate
        ? moment(endDate).format("YYYY-MM-DD HH:mm")
        : "";

      const response = await axios.get(
        `${ipaddress}api/dashboard/getGeneralDashBoradData?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const data = response.data;
      console.log("last wek data ", data.lastWeekGateInData);

      setNocCount(data.noc.nocCount);
      setNocSum(data.noc.dutysum);
      setNocCif(data.noc.cifSum);
      setNocArea(data.noc.area);

      setInbondCount(data.inbond.nocCount);
      setInbondSum(data.inbond.dutysum);
      setInbondCif(data.inbond.cifSum);
      setInbondArea(data.inbond.area);

      setExbondCount(data.exbond.nocCount);
      setExbondSum(data.exbond.dutysum);
      setExbondCif(data.exbond.cifSum);
      setExbondArea(data.exbond.area);

      const customeData = response.data;
      setCustomAppDuty(customeData.custom.approvedDuty);
      setInbondAppDuty(customeData.custom.inBondDuty);
      setRemainingDuty(customeData.custom.remaining);

      setCustomAppCif(customeData.custom.approvedCif);
      setInbondAppCif(customeData.custom.inBondCif);
      setRemainingCif(customeData.custom.remainingCif);

      setCustomAppArea(customeData.custom.approvedArea);
      setInbondAppArea(customeData.custom.inBondArea);
      setRemainingArea(customeData.custom.remainingArea);

      setInbondPackagesInventory(
        customeData.getBondInventoryMap.totalInBondedPackages
      );
      setInbondGrossWeightInventory(
        customeData.getBondInventoryMap.totalInBondGrossWt
      );

      console.log("customeData.custom ", customeData.custom.approvedDuty);
      console.log("customeData.custom ", customeData.custom.inBondDuty);

      console.log("data            ", data);
      if (data && typeof data === "object" && !Array.isArray(data)) {
        // Convert object to an array with both keys and values
        const inventoryArray = Object.entries(data).map(([key, value]) => ({
          name: key, // Key becomes the name (e.g., "JOB ORDER")
          ...value, // Spread the value (which is another object)
        }));

        setImportData(inventoryArray);
      } else {
        // If already an array, directly set it
        setImportData(data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleDashBoardData();
  }, []);

  const approvedDuty = Math.max(customAppDuty || 1, 1); // Total approved duty
  const inBondDuty = Math.min(inbondAppDuty || 0, approvedDuty); // Used duty (clamped to approvedDuty)
  const remainingDuty = remainigDuty; // Balance duty
  const remainingPercentage = (remainingDuty / approvedDuty) * 100; // Percentage of remaining duty
  // const gaugeValue = 100 - remainingPercentage; // Used percentage based on approvedDuty
  const gaugeValue = parseFloat((100 - remainingPercentage).toFixed(2));
  const useddDuty = Math.max(approvedDuty - remainingDuty, 0).toFixed(3); // Rounded to 3 decimal places

  const approvedCif = Math.max(customAppCif || 1, 1); // Total approved duty
  const inBondCif = Math.min(inbondAppCif || 0, approvedCif); // Used duty (clamped to approvedDuty)
  const remaininggCif = remainingCif; // Balance duty
  const remainingPercentageCif = (remaininggCif / approvedCif) * 100; // Percentage of remaining duty
  // const gaugeValueCif = 100 - remainingPercentageCif;
  const gaugeValueCif = parseFloat((100 - remainingPercentageCif).toFixed(2));

  const useddCif = Math.max(approvedCif - remaininggCif, 0).toFixed(3); // Rounded to 3 decimal places

  const approvedArea = Math.max(customAppArea || 1, 1); // Total approved duty
  const inBondArea = Math.min(inbondAppArea || 0, approvedArea); // Used duty (clamped to approvedDuty)
  const remaininggArea = remainingAreaaa; // Balance duty
  const remainingPercentageArea = (
    (remaininggArea / approvedArea) *
    100
  ).toFixed(2); // Percentage with 2 decimal places
  // const gaugeValueArea = 100 - remainingPercentageArea; // Used percentage based on approvedDuty
  const gaugeValueArea = parseFloat((100 - remainingPercentageArea).toFixed(2));
  const useddArea = Math.max(approvedArea - remaininggArea, 0).toFixed(3); // Rounded to 3 decimal places

  function GaugePointer() {
    const { valueAngle, outerRadius, cx, cy } = useGaugeState();

    if (valueAngle === null) {
      // No value to display
      return null;
    }

    const target = {
      x: cx + outerRadius * Math.sin(valueAngle),
      y: cy - outerRadius * Math.cos(valueAngle),
    };
    return (
      <g>
        <circle cx={cx} cy={cy} r={5} fill="#000d1a" />
        <path
          d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
          stroke="#000d1a"
          strokeWidth={3}
        />
      </g>
    );
  }

  const [tooltip, setTooltip] = useState(null); // Tooltip state
  const [tooltipCif, setTooltipCif] = useState(null); // Tooltip state
  const [tooltipArea, setTooltipArea] = useState(null); // Tooltip state

  const handleMouseEnter = (type, cx, cy) => {
    const data =
      type === "used"
        ? `Used: ${inBondDuty} (${gaugeValue.toFixed(2)}%)`
        : `Remaining: ${remainingDuty} (${remainingPercentage.toFixed(2)}%)`;
    setTooltip({ text: data, x: cx, y: cy });
  };

  const handleMouseLeave = () => {
    setTooltip(null); // Hide tooltip
  };

  const handleMouseEnterCif = (type, cx, cy) => {
    const data =
      type === "used"
        ? `Used: ${inBondCif} (${gaugeValueCif.toFixed(2)}%)`
        : `Remaining: ${remainingCif} (${remainingPercentageCif.toFixed(2)}%)`;
    setTooltipCif({ text: data, x: cx, y: cy });
  };
  const handleMouseLeaveCif = () => {
    setTooltipCif(null); // Hide tooltip
  };

  const handleMouseEnterArea = (type, cx, cy) => {
    const data =
      type === "used"
        ? `Used: ${inBondArea} (${gaugeValueArea.toFixed(2)}%)`
        : `Remaining: ${remainingAreaaa} (${remainingPercentageArea}%)`;
    setTooltipArea({ text: data, x: cx, y: cy });
  };
  const handleMouseLeaveArea = () => {
    setTooltipArea(null); // Hide tooltip
  };

  const stylesLoader = {
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

  const formattedDate = formatDate(new Date());

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload; // Access the data of the hovered point
      return (
        <div className="custom-tooltip">
          <p className="label">{`${data.day}: ${data.value}`}</p>
        </div>
      );
    }
    return null;
  };

  const fetchInData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${ipaddress}api/dashboard/inWiseShp/${companyid}/${branchId}`
      );

      if (response && response.data) {
        const { shippingLineInfo, shippingLineInfoOut, shippingLineInfoOpen } =
          response.data;

        const dataaaaa =
          response.data.shippingLineInfo +
          response.data.shippingLineInfoOut +
          response.data.shippingLineInfoOpen;
        const totalInfo = response.data.Total; // Total information object
        const totalInfoOut = response.data.TotalOut; // Total information object

        const totalInfoOpen = response.data.totalInfoOpen; // Total information object

        const lineInfo = response.data.shippingLineInfo;

        const lineInfoout = response.data.shippingLineInfoOut;

        const lineInfoOpen = response.data.shippingLineInfoOpen;

        setShippingLIneInfo(response.data);
        // setCountIn(totalInfo.TotalCount);
        // setCountSize20In(totalInfo.TotalSize20Count);
        // setCountSize40In(totalInfo.TotalSize40Count);

        // setCountOut(totalInfoOut.totalCountOut);
        // setCountSize20Out(totalInfoOut.totalSize20CountOut);
        // setCountSize40Out(totalInfoOut.totalSize40CountOut);

        // setCountBalance(totalInfoOpen.totalCountOpen);
        // setCountSize20(totalInfoOpen.totalSize20CountOpen);
        // setCountSize40(totalInfoOpen.totalSize40CountOpen);
      } else {
        throw new Error("Failed to get Data");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInData();
  }, [0]);

  {
    /* my code start here*/
  }

  // For Commodity Inventory Table

  const [commodityInventoryData, setCommodityInventoryData] = useState({
    headers: [],
    rows: [],
  });

  //const recordsPerPage = 10; // or any number you prefer
  const [currentCommodityPage, setCurrentCommodityPage] = useState(1);

  const fetchCommodityInventoryData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${ipaddress}api/dashboard/distinctCommodities/${companyid}/${branchId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const pivotedRows = response.data.data || [];
      const commodityHeaders = response.data.commodities || [];

      console.log("My Header:", commodityHeaders);
      console.log("My Data:", pivotedRows);

      setCommodityInventoryData({
        headers: commodityHeaders,
        rows: pivotedRows,
      });
    } catch (error) {
      console.error("Error fetching commodity inventory data:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Slice safely after confirming array is populated
  const currentCommodityItems = useMemo(() => {
    if (!commodityInventoryData.rows.length) return [];
    const start = (currentCommodityPage - 1) * recordsPerPage;
    const end = start + recordsPerPage;
    return commodityInventoryData.rows.slice(start, end);
  }, [commodityInventoryData.rows, currentCommodityPage, recordsPerPage]);

  const totalCommodityPages = useMemo(() => {
    return Math.ceil(commodityInventoryData.rows.length / recordsPerPage) || 1;
  }, [commodityInventoryData.rows.length, recordsPerPage]);

  useEffect(() => {
    fetchCommodityInventoryData();
  }, []);

  {
    /* my code end here*/
  }

  const [currentPage, setCurrentPage] = useState(1);

  const [shippingLIneInfo, setShippingLIneInfo] = useState({});
  const filteredShippingLineNames = Object.keys(shippingLIneInfo).filter(
    (shippingLineName) =>
      !["Total", "TotalOut", "totalInfoOpen"].includes(shippingLineName)
  );
  const totalItems = filteredShippingLineNames.length;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // const currentRecords = Object.keys(shippingLIneInfo).slice(indexOfFirstRecord, indexOfLastRecord);

  const currentItems = filteredShippingLineNames.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(
    Object.keys(filteredShippingLineNames).length / recordsPerPage
  );

  // Function to handle pagination page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate an array of page numbers to display dynamically
  const displayPages = () => {
    const centerPageCount = 5; // Number of page numbers to show around the current page
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

  return (
    <>
      {loading && (
        <div className="loader" style={stylesLoader.overlay}>
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
      <div className={styles.dashboardBonding}>
        <section
          className={styles.widgetsCFSBonding}
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "12px",
          }}
        >
          <div
            style={{
              position: "relative",
              zIndex: 2,
              padding: "9px",
              borderRadius: "12px",
              backgroundImage:
                "linear-gradient(to top, #5ee7df 0%, #b490ca 100%)",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h5
              style={{
                textAlign: "center",
                fontSize: "1.5rem",
                color: "Green",
                marginBottom: "9px",
              }}
            >
              {`General Bonding Data  (${formattedDate})`}
            </h5>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                borderRadius: "8px",
                overflow: "hidden",
                fontSize: "1rem",
                backgroundColor: "#fff",
                textAlign: "center", // Center-align all table text
              }}
              className="table-bordered"
            >
              <thead>
                <tr
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                  }}
                >
                  <th colSpan={3} style={{ padding: "10px" }}>
                    JOB Entry
                  </th>
                  <th colSpan={3} style={{ padding: "10px" }}>
                    RECEIVING
                  </th>
                  <th colSpan={3} style={{ padding: "10px" }}>
                    DELIVERY
                  </th>
                  <th colSpan={3} style={{ padding: "10px" }}>
                    JOB INV
                  </th>
                </tr>

                <tr
                  style={{
                    backgroundImage:
                      "linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%)",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  <th style={{ padding: "10px" }}>Count</th>
                  <th style={{ padding: "10px" }}>PKG</th>
                  <th style={{ padding: "10px" }}>Weight</th>
                  <th style={{ padding: "10px" }}>Count</th>
                  <th style={{ padding: "10px" }}>PKG</th>
                  <th style={{ padding: "10px" }}>Weight</th>
                  <th style={{ padding: "10px" }}>Count</th>
                  <th style={{ padding: "10px" }}>PKG</th>
                  <th style={{ padding: "10px" }}>Weight</th>
                  <th style={{ padding: "10px" }}>PKG</th>
                  <th style={{ padding: "10px" }}>Weight</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: "#798686", color: "#fff" }}>
                  <td style={{ padding: "10px" }}>{nocCount}</td>
                  <td style={{ padding: "10px" }}>{nocSum}</td>
                  <td style={{ padding: "10px" }}>{nocCif}</td>

                  {/* <td style={{ padding: "10px" }}>{nocArea}</td> */}
                  <td style={{ padding: "10px" }}>{inbondCount}</td>
                  <td style={{ padding: "10px" }}>{inbondSum}</td>
                  <td style={{ padding: "10px" }}>{inbondCif}</td>

                  {/* <td style={{ padding: "10px" }}>{inbondArea}</td> */}
                  <td style={{ padding: "10px" }}>{exbondCount}</td>
                  <td style={{ padding: "10px" }}>{exbondSum}</td>
                  <td style={{ padding: "10px" }}>{exbondCif}</td>

                  {/* <td style={{ padding: "10px" }}>{exbondArea}</td> */}
                  <td style={{ padding: "10px" }}>{inbondPackagesInventory}</td>
                  <td style={{ padding: "10px" }}>
                    {inbondGrossWeightInventory}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.widgetschartTopTen} style={{ marginTop: 9 }}>
          <Row>
            <Col md={12}>
              <div className={`${styles.pieChart} ${styles.gradientTwo}`}>
                <h6 style={{ textAlign: "center", color: "#990000" }}>
                  GENERAL BONDING DATA OVERVIEW
                </h6>
                <BarChart
                  xAxis={[
                    {
                      scaleType: "band",
                      data: ["JOB", "RECEIVING", "DELIVERY", "INV"],
                    },
                  ]}
                  series={[
                    {
                      name: "Count",
                      data: [
                        nocCount, // JOB
                        inbondCount, // RECEIVING
                        exbondCount, // DELIVERY
                        //   invCount         // INV (you must define this!)
                      ],
                      label: "Count",
                    },
                    {
                      name: "PKG",
                      data: [
                        nocSum, // JOB
                        inbondSum, // RECEIVING
                        exbondSum, // DELIVERY
                        inbondPackagesInventory, // INV
                      ],
                      label: "PKG",
                    },
                    {
                      name: "WEIGHT",
                      data: [
                        nocCif, // JOB
                        inbondCif, // RECEIVING
                        exbondCif, // DELIVERY
                        inbondGrossWeightInventory, // INV
                      ],
                      label: "WEIGHT",
                    },
                  ]}
                  width={900}
                  height={300}
                  margin={{ left: 270 }} // ✅ Increased left margin to fit labels
                />
              </div>
            </Col>
          </Row>
        </section>

        {/* my code start here */}
        {/* <section className={styles.widgetschartTopTen} style={{ marginTop: 9 }}>
  <Row>
    <Col md={12}>
      <div className={`${styles.pieChart} ${styles.gradientTwo}`}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", padding: "12px" }}>
          <FontAwesomeIcon icon={faTruckFront} />
          <span style={{ fontSize: "18px", color: "black" }}>Importer & Commodity Wise Inventory</span>
        </div>

        <div className="mt-1 table-responsive">
          <table className="table table-bordered table-striped" style={{ backgroundColor: "#ffffff", fontSize: "14px" }}>
            <thead style={{ backgroundColor: "#f5f5f5", color: "#000" }}>
              <tr>
                <th>Sr. No.</th>
                <th>Importer Name</th>
                {commodityInventoryData.headers.map(c => (
                  <th key={c} colSpan={2} style={{ textAlign: "center" }}>{c}</th>
                ))}
              </tr>
              <tr>
                <th></th>
                <th></th>
                {commodityInventoryData.headers.map(c => (
                  <React.Fragment key={c}>
                    <th>PKG</th>
                    <th>Weight</th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>

            <tbody>
              {currentCommodityItems.map((row, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#fafafa" : "#ffffff" }}>
                  <td>{(currentCommodityPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{row.Importer}</td>
                  {commodityInventoryData.headers.map((commodity) => (
                    <React.Fragment key={commodity}>
                      <td>{row[commodity + '_PKG']}</td>
                      <td>{row[commodity + '_WT']}</td>
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
            <Pagination.First onClick={() => setCurrentCommodityPage(1)} disabled={currentCommodityPage === 1} />
            <Pagination.Prev onClick={() => setCurrentCommodityPage(prev => Math.max(prev - 1, 1))} disabled={currentCommodityPage === 1} />
            {Array.from({ length: totalCommodityPages }, (_, i) => i + 1).map(page => (
              <Pagination.Item
                key={page}
                active={page === currentCommodityPage}
                onClick={() => setCurrentCommodityPage(page)}
              >
                {page}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setCurrentCommodityPage(prev => Math.min(prev + 1, totalCommodityPages))}
              disabled={currentCommodityPage === totalCommodityPages}
            />
            <Pagination.Last
              onClick={() => setCurrentCommodityPage(totalCommodityPages)}
              disabled={currentCommodityPage === totalCommodityPages}
            />
          </Pagination>
        </div>
      </div>
    </Col>
  </Row>
</section> */}

        {/* <section className={styles.widgetschartTopTen} style={{ marginTop: 9 }}>
          <Row>
            <Col md={12}>
              <div
                style={{
                  background: "linear-gradient(to right, #dedff1ff, #eceaeaff)",
                  borderRadius: "10px",
                  padding: "15px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "12px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faTruckFront}
                    style={{ fontSize: "22px", color: "black" }}
                  />
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "black",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Importer & Commodity Wise Inventory
                  </span>
                </div>

                <div className="mt-1 table-responsive">
                  <table
                    className="table table-bordered"
                    style={{
                      backgroundColor: "#fff",
                      fontSize: "14px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          background: "#1c6c9b",
                          color: "orange",
                          textAlign: "center",
                        }}
                      >
                        <th
                          style={{
                            backgroundColor: "#347593ff",
                            color: "orange",
                          }}
                        >
                          Sr. No.
                        </th>
                        <th
                          style={{
                            backgroundColor: "#347593ff",
                            color: "orange",
                             minWidth: "290px",
                          }}
                        >
                          Importer Name
                        </th>
                        {commodityInventoryData.headers.map((c) => (
                          <th
                            key={c}
                            colSpan={2}
                            style={{

                              backgroundColor: "#347593ff",
                              textAlign: "center",
                              color: "orange",
                              
                            }}
                           
                          >
                            {c}
                          </th>
                        ))}
                      </tr>
                      <tr
                        style={{
                          backgroundColor: "#005f73",
                          color: "orange",
                          textAlign: "center",
                        }}
                      >
                        <th style={{ backgroundColor: "#8cc1e0ff" }}></th>
                         <th style={{ backgroundColor: "#8cc1e0ff" }}></th>
                        {commodityInventoryData.headers.map((c) => (
                          <React.Fragment key={c}>
                            <th
                              style={{
                                color: "black",
                                backgroundColor: "#8cc1e0ff",
                              }}
                            >
                              PKG
                            </th>
                            <th
                              style={{
                                color: "black",
                                backgroundColor: "#7ab8dbff",
                              }}
                            >
                              Weight
                            </th>
                          </React.Fragment>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {currentCommodityItems.map((row, index) => (
                        <tr
                          key={index}
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "#f3e8ff" : "#e0cfff",
                            textAlign: "center",
                            fontWeight: 500,
                            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                            margin: "4px 0",
                            borderBottom: "2px solid #d1c4e9",
                          }}
                        >
                          <td style={{ fontWeight: "bold" }}>
                            {(currentCommodityPage - 1) * itemsPerPage +
                              index +
                              1}
                          </td>
                          <td style={{ fontWeight: "bold" }}>{row.Importer}</td>
                          {commodityInventoryData.headers.map((commodity) => (
                            <React.Fragment key={commodity}>
                              <td>{row[commodity + "_PKG"]}</td>
                              <td>{row[commodity + "_WT"]}</td>
                            </React.Fragment>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <Pagination
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      color: "#333",
                    }}
                  >
                    <Pagination.First
                      onClick={() => setCurrentCommodityPage(1)}
                      disabled={currentCommodityPage === 1}
                    />
                    <Pagination.Prev
                      onClick={() =>
                        setCurrentCommodityPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentCommodityPage === 1}
                    />
                    {Array.from(
                      { length: totalCommodityPages },
                      (_, i) => i + 1
                    ).map((page) => (
                      <Pagination.Item
                        key={page}
                        active={page === currentCommodityPage}
                        onClick={() => setCurrentCommodityPage(page)}
                        style={{
                          backgroundColor:
                            page === currentCommodityPage ? "#4e54c8" : "#fff",
                          color:
                            page === currentCommodityPage ? "#fff" : "#333",
                          fontWeight:
                            page === currentCommodityPage ? "bold" : "normal",
                        }}
                      >
                        {page}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      onClick={() =>
                        setCurrentCommodityPage((prev) =>
                          Math.min(prev + 1, totalCommodityPages)
                        )
                      }
                      disabled={currentCommodityPage === totalCommodityPages}
                    />
                    <Pagination.Last
                      onClick={() =>
                        setCurrentCommodityPage(totalCommodityPages)
                      }
                      disabled={currentCommodityPage === totalCommodityPages}
                    />
                  </Pagination>
                </div>
              </div>
            </Col>
          </Row>
        </section> */}

        {/* it imp */}
        {/* <section className={styles.widgetschartTopTen} style={{ marginTop: 9 }}>
  <Row>
    <Col md={12}>
      <div
        style={{
          background: "linear-gradient(to right, #dedff1ff, #eceaeaff)",
          borderRadius: "10px",
          padding: "15px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginBottom: "12px",
          }}
        >
          <FontAwesomeIcon
            icon={faTruckFront}
            style={{ fontSize: "22px", color: "black" }}
          />
          <span
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "black",
              letterSpacing: "0.5px",
            }}
          >
            Importer & Commodity Wise Inventory
          </span>
        </div>

        <div className="mt-1 table-responsive">
          <table
            className="table table-bordered"
            style={{
              backgroundColor: "#fff",
              fontSize: "14px",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#1c6c9b",
                  color: "orange",
                  textAlign: "center",
                }}
              >
                <th
                  style={{
                    backgroundColor: "#347593ff",
                    color: "orange",
                  }}
                >
                  Sr. No.
                </th>
                <th
                  style={{
                    backgroundColor: "#347593ff",
                    color: "orange",
                    minWidth: "290px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Importer Name
                </th>
                {commodityInventoryData.headers.map((c) => (
                  <th
                    key={c}
                    colSpan={2}
                    style={{
                      backgroundColor: "#347593ff",
                      textAlign: "center",
                      color: "orange",
                    }}
                  >
                    {c}
                  </th>
                ))}
              </tr>
              <tr
                style={{
                  backgroundColor: "#005f73",
                  color: "orange",
                  textAlign: "center",
                }}
              >
                <th style={{ backgroundColor: "#8cc1e0ff" }}></th>
                <th style={{ backgroundColor: "#8cc1e0ff" }}></th>
                {commodityInventoryData.headers.map((c) => (
                  <React.Fragment key={c}>
                    <th
                      style={{
                        color: "black",
                        backgroundColor: "#8cc1e0ff",
                      }}
                    >
                      PKG
                    </th>
                    <th
                      style={{
                        color: "black",
                        backgroundColor: "#7ab8dbff",
                      }}
                    >
                      Weight
                    </th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>

            <tbody>
              {currentCommodityItems.map((row, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor:
                      index % 2 === 0 ? "#f3e8ff" : "#e0cfff",
                    textAlign: "center",
                    fontWeight: 500,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    margin: "4px 0",
                    borderBottom: "2px solid #d1c4e9",
                  }}
                >
                  <td style={{ fontWeight: "bold" }}>
                    {(currentCommodityPage - 1) * itemsPerPage +
                      index +
                      1}
                  </td>
                  <td
                    style={{
                      fontWeight: "bold",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={() => {
                      setHoveredImporter(row.Importer);
                      const filtered = Object.keys(row)
                        .filter((key) => key.endsWith("_PKG"))
                        .map((key) => ({
                          label: key.replace("_PKG", ""),
                          value: row[key] || 0,
                        }))
                        .filter((item) => item.value > 0);

                      setPieChartData(filtered);
                      setTotalSum(
                        filtered.reduce((sum, item) => sum + item.value, 0)
                      );
                    }}
                    onMouseLeave={() => setHoveredImporter(null)}
                  >
                    {row.Importer}
                  </td>
                  {commodityInventoryData.headers.map((commodity) => (
                    <React.Fragment key={commodity}>
                      <td>{row[commodity + "_PKG"]}</td>
                      <td>{row[commodity + "_WT"]}</td>
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {hoveredImporter && pieChartData.length > 0 && (
            <Col
              md={6}
              xs={12}
              style={{ padding: "10px", margin: "0 auto" }}
            >
              <div style={{ width: "100%", textAlign: "center" }}>
                <h6 style={{ textAlign: "center", color: "#990000" }}>
                  DISTRIBUTION OF IMP CONTAINER (INVENTORY)
                </h6>
                <PieChart
                  series={[
                    {
                      data: pieChartData,
                      arcLabel: (item) => `${item.label}`,
                      arcLabelMinAngle: 18,
                      arcLabelRadius: chartSize.labelRadius,
                      innerRadius: chartSize.innerRadius,
                      outerRadius: chartSize.outerRadius,
                      paddingAngle: chartSize.paddingAngle,
                      highlightScope: {
                        faded: "global",
                        highlighted: "item",
                      },
                      faded: {
                        innerRadius: 20,
                        additionalRadius: -30,
                        color: "gray",
                      },
                    },
                  ]}
                  sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                      fontWeight: "bold",
                      fontSize: `${chartSize.fontSize}px`,
                      fill: "black",
                      strokeWidth: 1.5,
                    },
                  }}
                  height={chartSize.height}
                />
              </div>
            </Col>
          )}

          <Pagination
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#333",
            }}
          >
            <Pagination.First
              onClick={() => setCurrentCommodityPage(1)}
              disabled={currentCommodityPage === 1}
            />
            <Pagination.Prev
              onClick={() =>
                setCurrentCommodityPage((prev) => Math.max(prev - 1, 1))
              }
              disabled={currentCommodityPage === 1}
            />
            {Array.from({ length: totalCommodityPages }, (_, i) => i + 1).map(
              (page) => (
                <Pagination.Item
                  key={page}
                  active={page === currentCommodityPage}
                  onClick={() => setCurrentCommodityPage(page)}
                  style={{
                    backgroundColor:
                      page === currentCommodityPage ? "#4e54c8" : "#fff",
                    color: page === currentCommodityPage ? "#fff" : "#333",
                    fontWeight:
                      page === currentCommodityPage ? "bold" : "normal",
                  }}
                >
                  {page}
                </Pagination.Item>
              )
            )}
            <Pagination.Next
              onClick={() =>
                setCurrentCommodityPage((prev) =>
                  Math.min(prev + 1, totalCommodityPages)
                )
              }
              disabled={currentCommodityPage === totalCommodityPages}
            />
            <Pagination.Last
              onClick={() => setCurrentCommodityPage(totalCommodityPages)}
              disabled={currentCommodityPage === totalCommodityPages}
            />
          </Pagination>
        </div>
      </div>
    </Col>
  </Row>
</section> */}

        <section
          className={styles.widgetschartTopTen}
          style={{ marginTop: 9, position: "relative" }}
        >
          <Row>
            <Col md={12}>
              <div
                style={{
                  background: "linear-gradient(to right, #dedff1ff, #eceaeaff)",
                  borderRadius: "10px",
                  padding: "15px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "12px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faTruckFront}
                    style={{ fontSize: "22px", color: "black" }}
                  />
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "black",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Importer & Commodity Wise Inventory
                  </span>
                </div>

                <div className="mt-1 table-responsive">
                  <table
                    className="table table-bordered"
                    style={{
                      backgroundColor: "#fff",
                      fontSize: "14px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          background: "#1c6c9b",
                          color: "orange",
                          textAlign: "center",
                        }}
                      >
                        <th style={{ backgroundColor: "#347593ff", color: "orange" }}>
                          Sr. No.
                        </th>
                        <th
                          style={{
                            backgroundColor: "#347593ff",
                            color: "orange",
                            minWidth: "290px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Importer Name
                        </th>
                        {commodityInventoryData.headers.map((c) => (
                          <th
                            key={c}
                            colSpan={2}
                            style={{
                              backgroundColor: "#347593ff",
                              textAlign: "center",
                              color: "orange",
                            }}
                          >
                            {c}
                          </th>
                        ))}
                      </tr>
                      <tr
                        style={{
                          backgroundColor: "#005f73",
                          color: "orange",
                          textAlign: "center",
                        }}
                      >
                        <th style={{ backgroundColor: "#8cc1e0ff" }}></th>
                        <th style={{ backgroundColor: "#8cc1e0ff" }}></th>
                        {commodityInventoryData.headers.map((c) => (
                          <React.Fragment key={c}>
                            <th
                              style={{
                                color: "black",
                                backgroundColor: "#8cc1e0ff",
                              }}
                            >
                              PKG
                            </th>
                            <th
                              style={{
                                color: "black",
                                backgroundColor: "#7ab8dbff",
                              }}
                            >
                              Weight
                            </th>
                          </React.Fragment>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {currentCommodityItems.map((row, index) => (
                        <tr
                          key={index}

                          style={{
                            backgroundColor: index % 2 === 0 ? "#f3e8ff" : "#e0cfff",
                            textAlign: "center",
                            fontWeight: 500,
                            borderBottom: "2px solid #d1c4e9",
                          }}
                        >
                          <td style={{ fontWeight: "bold" }}>
                            {(currentCommodityPage - 1) * itemsPerPage + index + 1}
                          </td>
                          <td
                            style={{
                              fontWeight: "bold",
                              whiteSpace: "nowrap",
                              cursor: "pointer",
                              color: "#333",
                            }}

                            onMouseEnter={() => {
                              if (row.Importer && row.Importer.trim() !== "") {
                                const filtered = Object.keys(row)
                                  .filter((key) => key.endsWith("_PKG"))
                                  .map((key) => ({
                                    label: key.replace("_PKG", ""),
                                    value: Number(row[key]) || 0,
                                  }))
                                  .filter((item) => item.value > 0);

                                setHoveredImporter(row.Importer);
                                setPieChartData(filtered);
                              }
                            }}
                            onMouseLeave={() => {
                              setHoveredImporter(null);
                            }}

                          >
                            {row.Importer}
                          </td>
                          {commodityInventoryData.headers.map((commodity) => (
                            <React.Fragment key={commodity}>
                              <td>{row[commodity + "_PKG"]}</td>
                              <td>{row[commodity + "_WT"]}</td>
                            </React.Fragment>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Pie Chart Popup */}
                  {hoveredImporter && pieChartData.length > 0 && (
                    <div
                      onMouseLeave={() => setHoveredImporter(null)}
                      style={{
                        position: "absolute",
                        top: "15px",
                        right: "20px",
                        zIndex: 10000,
                        backgroundColor: "#ffffff",
                        borderRadius: "12px",
                        padding: "20px",
                        width: "320px",
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                        border: "1px solid #ccc",
                        transition: "opacity 0.3s ease-in-out",
                        opacity: hoveredImporter ? 1 : 0,
                      }}
                    >
                      <h6
                        style={{
                          textAlign: "center",
                          fontWeight: "600",
                          marginBottom: "10px",
                          color: "#003366",
                        }}
                      >
                        {hoveredImporter} Inventory
                      </h6>
                      <PieChart
                        series={[
                          {
                            data: pieChartData.map((item, idx) => ({
                              ...item,
                              label: item.label,
                            })),
                            arcLabel: (item) => {
                              const total = pieChartData.reduce(
                                (sum, d) => sum + (d.value ?? 0),
                                0
                              );
                              const value = item.value ?? 0;

                              if (total > 0 && value > 0) {
                                const percentage = ((value / total) * 100).toFixed(2);
                                return `${percentage}%`;
                              }

                              return `${item.label}: 0%`;
                            },
                            arcLabelMinAngle: 15,
                            arcLabelRadius: chartSize.labelRadius,
                            innerRadius: chartSize.innerRadius,
                            outerRadius: chartSize.outerRadius,
                            paddingAngle: chartSize.paddingAngle,
                            cornerRadius: 5,
                            highlightScope: { faded: "global", highlighted: "item" },
                            faded: { additionalRadius: -15, color: "gray" },
                          },
                        ]}
                        height={chartSize.height}
                        sx={{
                          [`& .${pieArcLabelClasses.root}`]: {
                            fontWeight: "bold",
                            fontSize: `${chartSize.fontSize}px`,
                            fill: "#333",
                          },
                          [`& .MuiPieArc-root`]: {
                            stroke: "#fff",
                            strokeWidth: 2,
                          },
                        }}
                      />

                    </div>
                  )}

                  <Pagination
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      color: "#333",
                    }}
                  >
                    <Pagination.First
                      onClick={() => setCurrentCommodityPage(1)}
                      disabled={currentCommodityPage === 1}
                    />
                    <Pagination.Prev
                      onClick={() =>
                        setCurrentCommodityPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentCommodityPage === 1}
                    />
                    {Array.from({ length: totalCommodityPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Pagination.Item
                          key={page}
                          active={page === currentCommodityPage}
                          onClick={() => setCurrentCommodityPage(page)}
                          style={{
                            backgroundColor:
                              page === currentCommodityPage ? "#4e54c8" : "#fff",
                            color: page === currentCommodityPage ? "#fff" : "#333",
                            fontWeight:
                              page === currentCommodityPage ? "bold" : "normal",
                          }}
                        >
                          {page}
                        </Pagination.Item>
                      )
                    )}
                    <Pagination.Next
                      onClick={() =>
                        setCurrentCommodityPage((prev) =>
                          Math.min(prev + 1, totalCommodityPages)
                        )
                      }
                      disabled={currentCommodityPage === totalCommodityPages}
                    />
                    <Pagination.Last
                      onClick={() => setCurrentCommodityPage(totalCommodityPages)}
                      disabled={currentCommodityPage === totalCommodityPages}
                    />
                  </Pagination>
                </div>
              </div>
            </Col>
          </Row>
        </section>


        {/* my code end here */}

        {/* <Row>
              <Col> */}
        <section className={styles.widgetschartTopTen} style={{ marginTop: 4 }}>
          <div className=" mt-1 table-responsive">
            <Table className="table table-bordered  custom-table mt-2">
              <thead style={{ width: "50%", height: "10%" }}>
                <tr className="text-center">
                  <th colSpan="10" style={{ fontSize: "18px" }}>
                    {" "}
                    <FontAwesomeIcon
                      icon={faTruckFront}
                      style={{ marginRight: 4 }}
                    />{" "}
                    Importer Wise Overview
                  </th>
                </tr>
                <tr className="text-center">
                  <th
                    style={{
                      background: "#1c6c9b",
                      color: "orange",
                      textAlign: "center",
                    }}
                  >
                    Sr No
                  </th>
                  <th
                    style={{
                      background: "#1c6c9b",
                      color: "orange",
                      textAlign: "center",
                    }}
                  >
                    Importer Name
                  </th>
                  <th
                    colSpan="2"
                    style={{
                      background: "#1c6c9b",
                      color: "orange",
                      textAlign: "center",
                    }}
                  >
                    Job Entry
                  </th>
                  <th
                    colSpan="2"
                    style={{
                      background: "#1c6c9b",
                      color: "orange",
                      textAlign: "center",
                    }}
                  >
                    Receiving
                  </th>
                  <th
                    colSpan="2"
                    style={{
                      background: "#1c6c9b",
                      color: "orange",
                      textAlign: "center",
                    }}
                  >
                    Delivery
                  </th>
                  <th
                    colSpan="2"
                    style={{
                      background: "#1c6c9b",
                      color: "orange",
                      textAlign: "center",
                    }}
                  >
                    Remaining
                  </th>
                </tr>
                <tr className="text-center">
                  <th></th>
                  <th></th>
                  <th>PKG</th>
                  <th>WEIGHT</th>
                  <th>PKG</th>
                  <th>WEIGHT</th>
                  <th>PKG</th>
                  <th>WEIGHT</th>
                  <th>PKG</th>
                  <th>WEIGHT</th>
                </tr>
              </thead>
              {currentItems.map((shippingLineName, index) => (
                <tbody>
                  <tr
                    key={index}
                    className="text-center"
                    style={{ marginBottom: 0 }}
                  >
                    <td style={{ fontWeight: "bold" }} className="table-column">
                      {(currentPage - 1) * recordsPerPage + index + 1}
                    </td>
                    {/* <td  rowSpan={1}>{index + 1}</td> */}
                    <td style={{ fontWeight: "bold" }}>{shippingLineName}</td>
                    <td>
                      {/* {shippingLIneInfo[shippingLineName].Size20CountOpen} */}

                      {shippingLIneInfo[shippingLineName].jobTotalPackages
                        ? shippingLIneInfo[shippingLineName].jobTotalPackages
                        : 0}
                    </td>
                    <td>
                      {/* {shippingLIneInfo[shippingLineName].Size40CountOpen} */}

                      {shippingLIneInfo[shippingLineName].jobGrossWeightTotal
                        ? shippingLIneInfo[shippingLineName].jobGrossWeightTotal
                        : 0}
                    </td>

                    <td>
                      {shippingLIneInfo[shippingLineName].recTotalPackages || 0}{" "}
                    </td>
                    <td>
                      {shippingLIneInfo[shippingLineName].recGrossWeightTotal
                        ? shippingLIneInfo[shippingLineName].recGrossWeightTotal
                        : 0}
                    </td>

                    <td>
                      {shippingLIneInfo[shippingLineName].deliveryTotalPackages
                        ? shippingLIneInfo[shippingLineName]
                          .deliveryTotalPackages
                        : 0}
                    </td>

                    <td>
                      {shippingLIneInfo[shippingLineName]
                        .deliveryGrossWeightTotal
                        ? shippingLIneInfo[shippingLineName]
                          .deliveryGrossWeightTotal
                        : 0}
                    </td>

                    <td>
                      {parseInt(
                        shippingLIneInfo[shippingLineName].recTotalPackages
                          ? shippingLIneInfo[shippingLineName].recTotalPackages
                          : 0
                      ) -
                        parseInt(
                          shippingLIneInfo[shippingLineName]
                            .deliveryTotalPackages
                            ? shippingLIneInfo[shippingLineName]
                              .deliveryTotalPackages
                            : 0
                        )}
                    </td>

                    <td>
                      {parseInt(
                        shippingLIneInfo[shippingLineName].recGrossWeightTotal
                          ? shippingLIneInfo[shippingLineName]
                            .recGrossWeightTotal
                          : 0
                      ) -
                        parseInt(
                          shippingLIneInfo[shippingLineName]
                            .deliveryGrossWeightTotal
                            ? shippingLIneInfo[shippingLineName]
                              .deliveryGrossWeightTotal
                            : 0
                        )}
                    </td>
                  </tr>
                  <td colSpan="10">
                    <hr
                      style={{
                        borderTop: "3px solid #004975",
                        margin: "0",
                        padding: "0",
                      }}
                    />
                  </td>
                </tbody>
              ))}
            </Table>
            <Pagination
              style={{
                display: "flex",
                justifyContent: "center",
                color: "gray",
              }}
            >
              <Pagination.First
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              />
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              <Pagination.Ellipsis disabled={displayPages()[0] === 1} />

              {displayPages().map((pageNumber) => (
                <Pagination.Item
                  key={pageNumber}
                  active={pageNumber === currentPage}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </Pagination.Item>
              ))}

              <Pagination.Ellipsis
                disabled={displayPages().slice(-1)[0] === totalPages}
              />
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
              <Pagination.Last
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        </section>
        {/* </Col>
                </Row> */}
      </div>
    </>
  );
}
