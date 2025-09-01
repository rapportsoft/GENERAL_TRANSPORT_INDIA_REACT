import React, { useContext, useEffect } from 'react'
import { FaChartBar, FaCog, FaTruck, FaUsers } from 'react-icons/fa';
import styles from "../Dashboard.module.css";
import { BarChart, GaugeContainer, GaugeReferenceArc, GaugeValueArc, useGaugeState } from '@mui/x-charts';
import { PieChart,pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useState } from 'react';
import GaugeChart from 'react-gauge-chart';
import { TooltipProps } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { LineChart, Line, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col } from 'reactstrap';
import { Player } from '@lottiefiles/react-lottie-player';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import gauge from '../gauge.json'; 
import warehouse from '../bondingann.json'; 
import Lottie from 'lottie-react';
import useAxios from '../Components/useAxios';
import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import ipaddress from '../Components/IpAddress';
import moment from 'moment';

import { IconButton } from '@mui/material';

export default function AllDashboard() {

  const axios = useAxios();
  const { isAuthenticated } = useContext(AuthContext);

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
    { label: 'Windows', value: 50 },
    { label: 'MacOS', value: 30 },
    { label: 'Linux', value: 20 },
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


  const [importData,setImportData] = useState([]);
  const [loading, setLoading] = useState(false);
  // '2024-08-06 11:01:43.987000'
  const currentDate = new Date();
    currentDate.setHours(8, 0, 0, 0);
    const [startDate ,setStartDate] =useState(
      currentDate
    );
  const [endDate ,setEndDate] =useState(new Date());

  const [gateInData ,setGateInData] =useState([]);
  const [gateInDataLastWeek ,setGateInDataLastWeek] =useState([]);
  const [loadedOutLastWeek ,setLoadedOutLastWeek] =useState([]);
  const [fclDestuffLastWeek ,setFclDestuffLastWeek] =useState([]);
  const [lddInventoryLastWeek ,setLddInventoryLastWeek] =useState([]);

  const [exportBufferInLastWeek,setExportBufferInLastWeek] =useState([]);
  const [exportMovementOutLastWeek,setExportMovementOutLastWeek] =useState([]);
  const [exportTallyLastWeek,setExportTallyLastWeek] =useState([]);
  const [exportLDDLastWeek,setExportLDDLastWeek] =useState([]);

  const [fclLoadedData ,setFclLoadedData] =useState([]);
  const [fclDestuffData ,setFclDestuffData] =useState([]);
  const [inventoryData ,setInventoryData] =useState([]);

  const[exportCrating,setExportCartingData]=useState([]);
  const[exportStuffTally,setExportStuffTally]=useState([]);
  const[exportBufferGateIn,setExportBufferGateIn]=useState([]);
  const[exportMovementOut,setExportMovementOut]=useState([]);
  const[exportLDDPendency,setExportLDDPendency]=useState([]);


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
  const [customAppDuty,setCustomAppDuty] =useState(0);
  const [inbondAppDuty,setInbondAppDuty] =useState(0);
  const[remainigDuty,setRemainingDuty] =useState(0);

  const [customAppCif, setCustomAppCif] = useState(0);
const [inbondAppCif, setInbondAppCif] = useState(0);
const [remainingCif, setRemainingCif] = useState(0);


const [customAppArea, setCustomAppArea] = useState(0);
const [inbondAppArea, setInbondAppArea] = useState(0);
const [remainingArea, setRemainingArea] = useState(0);
const [loadedInventoryList ,setLoadedInventoryList]=useState([]);
  // const [gaugeValue,setGaugeValue] =useState(0);



  const handleDashBoardData = async () => {
    setLoading(true);
    try {

      console.log("startDate : ",startDate);
      console.log("endDate : ",endDate);
        
      const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DD HH:mm') : '';
      const formattedEndDate= endDate ? moment(endDate).format('YYYY-MM-DD HH:mm') : '';

        const response = await axios.get(
            `${ipaddress}api/dashboard/getDashBoardImportData?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
        );
        const gateIn = response.data.gateIn;
        const int = response.data.inventory;
        const fclLoaded = response.data.containerCountsSealCutting;
        const fclDestuff = response.data.fclDestuff;
        
        const exportLDDMap = response.data.exportLDDMap;
        const exportBufferContainer = response.data.exportBufferContainer;
        const emptyMovementOutMap = response.data.emptyMovementOutMap;
        const exportStuffTally = response.data.exportStuffTally;
        // const fclDestuff = response.data.fclDestuff;

        setGateInData(gateIn);
        setInventoryData(int);
        setFclLoadedData(fclLoaded);
        setFclDestuffData(fclDestuff);

        setExportCartingData();
        setExportBufferGateIn(exportBufferContainer);
        setExportStuffTally(exportStuffTally);
        setExportLDDPendency(exportLDDMap);
        setExportMovementOut(emptyMovementOutMap);
        handleLoadedInventoryReport(formattedStartDate,formattedEndDate);
        const data = response.data;

       console.log("last wek data ",data.lastWeekGateInData);

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
       

        setGateInDataLastWeek(data.lastWeekGateInData);
        setLoadedOutLastWeek(data.lastWeekLclLoadedMap);
        setFclDestuffLastWeek(data.fclDestuffMap);
        setLddInventoryLastWeek(data.lddMapLastWeek);


        setExportBufferInLastWeek(data.bufferInUser);
        setExportMovementOutLastWeek(data.exportMovementOutLastWeekMap);
        setExportTallyLastWeek(data.exportStuffTallyData);
        setExportLDDLastWeek(data.exportLaddLastWeekData);

        console.log( "customeData.custom ",customeData.custom.approvedDuty);
        console.log( "customeData.custom ",customeData.custom.inBondDuty);

        console.log("data            ",data);
        if (data && typeof data === 'object' && !Array.isArray(data)) {
            // Convert object to an array with both keys and values
            const inventoryArray = Object.entries(data).map(([key, value]) => ({
                name: key, // Key becomes the name (e.g., "JOB ORDER")
                ...value   // Spread the value (which is another object)
            }));
  
            setImportData(inventoryArray);
        } else {
            // If already an array, directly set it
            setImportData(data);
        }
  
    } catch (error) {
       
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    handleDashBoardData();
  }, []);

  const handleLoadedInventoryReport = async (formattedStartDate,formattedEndDate) => {
    try {
      
        const response = await axios.get(
            `${ipaddress}api/commonReports/getLoadedInventoryReport?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
        );
        const data = response.data;
        if (data && typeof data === 'object' && !Array.isArray(data)) {
            // Convert object to an array with both keys and values
            const inventoryArray = Object.entries(data).map(([key, value]) => ({
                name: key, // Key becomes the name (e.g., "JOB ORDER")
                ...value   // Spread the value (which is another object)
            }));

            setLoadedInventoryList(inventoryArray);
        } else {
            // If already an array, directly set it
            setLoadedInventoryList(data);
        }

    } catch (error) {
       
    }
};


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
  // const gaugeValueCif = 100 - remainingPercentageCif; // Used percentage based on approvedDuty
  const gaugeValueCif = parseFloat((100 - remainingPercentageCif).toFixed(2));
  const useddCif = Math.max(approvedCif - remaininggCif, 0).toFixed(3); // Rounded to 3 decimal places


  const approvedArea = Math.max(customAppArea || 1, 1); // Total approved duty
  const inBondArea = Math.min(inbondAppArea || 0, approvedArea); // Used duty (clamped to approvedDuty)
  const remaininggArea = remainingArea; // Balance duty
  const remainingPercentageArea = (remaininggArea / approvedArea) * 100; // Percentage of remaining duty
  const gaugeValueArea = parseFloat((100 - remainingPercentageArea).toFixed(2));
  const useddArea = Math.max(approvedArea - remaininggArea, 0).toFixed(3); // Rounded to 3 decimal places


  // function GaugePointer({ approvedDuty, inBondDuty }) {
  //   const { valueAngle, outerRadius, cx, cy } = useGaugeState();
  
  //   if (valueAngle === null) {
  //     return null;
  //   }
  
  //   const target = {
  //     x: cx + outerRadius * Math.sin(valueAngle),
  //     y: cy - outerRadius * Math.cos(valueAngle),
  //   };
  
  //   return (
  //     <g>
  //       <circle cx={target.x} cy={target.y} r={5} fill="red" />
  //       <path
  //         d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
  //         stroke="#0077b3"
  //         strokeWidth={3}
  //       />
  //     </g>
  //   );
  // }


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
        <circle cx={cx} cy={cy} r={5} fill="#0077b3" />
        <path
          d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
          stroke="#0077b3"
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
        : `Remaining: ${remainingArea} (${remainingPercentageArea.toFixed(2)}%)`;
        setTooltipArea({ text: data, x: cx, y: cy });
  };
  const handleMouseLeaveArea = () => {
    setTooltipArea(null); // Hide tooltip
  };


  // List of allowed container types
const allowedTypes = ["General", "Manual", "Reefer", "Hazardous", "ODC"];
const filteredData = Object.values(loadedInventoryList).filter((item) =>
  allowedTypes.includes(item.typeOfContainer)
);

// Calculate total sum of all container totals
const totalSum = filteredData.reduce((sum, item) => sum + item.total, 0) || 1; // Avoid division by zero

// Convert object data into the PieChart format with percentage calculation
const pieChartData = filteredData.map((item) => {
  const percentage = ((item.total / totalSum) * 100).toFixed(2); // Calculate percentage
  return {
    label: `${item.typeOfContainer}`, // Show total and percentage
    // label:`${percentage}`,
    value: item.total || 0.01, // Assign a small non-zero value for zero entries
  };
});


  // function GaugePointer({ approvedDuty, inBondDuty, remainingDuty }) {
  //   const { valueAngle, outerRadius, cx, cy } = useGaugeState();
  //   const [tooltipVisible, setTooltipVisible] = useState(false);
  
  //   if (valueAngle === null) {
  //     return null;
  //   }
  
  //   const target = {
  //     x: cx + outerRadius * Math.sin(valueAngle),
  //     y: cy - outerRadius * Math.cos(valueAngle),
  //   };
  
  //   return (
  //     <g>
  //       <circle
  //         cx={target.x}
  //         cy={target.y}
  //         r={5}
  //         fill="red"
  //         onMouseEnter={() => setTooltipVisible(true)}
  //         onMouseLeave={() => setTooltipVisible(false)}
  //       />
  //       <path
  //         d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
  //         stroke="red"
  //         strokeWidth={3}
  //       />
  //       {tooltipVisible && (
  //         <foreignObject
  //           x={target.x - 50}
  //           y={target.y - 40}
  //           width={100}
  //           height={50}
  //         >
  //           <div
  //             style={{
  //               backgroundColor: "white",
  //               border: "1px solid gray",
  //               borderRadius: "5px",
  //               padding: "5px",
  //               textAlign: "center",
  //               fontSize: "12px",
  //             }}
  //           >
  //             <div>
  //               <strong>Used:</strong> {inBondDuty} ({gaugeValue.toFixed(1)}%)
  //             </div>
  //             <div>
  //               <strong>Remaining:</strong> {remainingDuty} (
  //               {remainingPercentage.toFixed(1)}%)
  //             </div>
  //           </div>
  //         </foreignObject>
  //       )}
  //     </g>
  //   );
  // }



  // const importDataDemo = [
  //   { day: "Mon", value: gateInDataLastWeek.Monday },
  //   { day: "Tue", value: gateInDataLastWeek.Tuesday },
  //   { day: "Wed", value: gateInDataLastWeek.Wednesday},
  //   { day: "Thu", value: gateInDataLastWeek.Thursday },
  //   { day: "Fri", value: gateInDataLastWeek.Friday },
  //   { day: "Sat", value: gateInDataLastWeek.Saturday },
  //   { day: "Sun", value: gateInDataLastWeek.Sunday },
  // ];

  // const lclLoadedOutDataLIneChart = [
  //   { day: "Mon", value: loadedOutLastWeek.Monday },
  //   { day: "Tue", value: loadedOutLastWeek.Tuesday },
  //   { day: "Wed", value: loadedOutLastWeek.Wednesday},
  //   { day: "Thu", value: loadedOutLastWeek.Thursday },
  //   { day: "Fri", value: loadedOutLastWeek.Friday },
  //   { day: "Sat", value: loadedOutLastWeek.Saturday },
  //   { day: "Sun", value: loadedOutLastWeek.Sunday },
  // ];

  // const fclDestuffLasWeekData = [
  //   { day: "Mon", value: fclDestuffLastWeek.Monday },
  //   { day: "Tue", value: fclDestuffLastWeek.Tuesday },
  //   { day: "Wed", value: fclDestuffLastWeek.Wednesday},
  //   { day: "Thu", value: fclDestuffLastWeek.Thursday },
  //   { day: "Fri", value: fclDestuffLastWeek.Friday },
  //   { day: "Sat", value: fclDestuffLastWeek.Saturday },
  //   { day: "Sun", value: fclDestuffLastWeek.Sunday },
  // ];

  // const impLddInvLasWeekData = [
  //   { day: "Mon", value: lddInventoryLastWeek.Monday },
  //   { day: "Tue", value: lddInventoryLastWeek.Tuesday },
  //   { day: "Wed", value: lddInventoryLastWeek.Wednesday},
  //   { day: "Thu", value: lddInventoryLastWeek.Thursday },
  //   { day: "Fri", value: lddInventoryLastWeek.Friday },
  //   { day: "Sat", value: lddInventoryLastWeek.Saturday },
  //   { day: "Sun", value: lddInventoryLastWeek.Sunday },
  // ];
  
  const importDataDemo = Object.keys(gateInDataLastWeek)
  .filter((key) => key !== "name") // Remove "name" key
  .map((date) => ({
    date, // Keep date in YYYY-MM-DD format
    value: gateInDataLastWeek[date] || 0, // Use value, default to 0
  }))
  .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort in ascending order
  
  const lclLoadedOutDataLIneChart = Object.keys(loadedOutLastWeek)
  .filter((key) => key !== "name") // Remove "name" key
  .map((date) => ({
    date, // Keep date in YYYY-MM-DD format
    value: loadedOutLastWeek[date] || 0, // Use value, default to 0
  }))
  .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort in ascending order


  const fclDestuffLasWeekData = Object.keys(fclDestuffLastWeek)
  .filter((key) => key !== "name") // Remove "name" key
  .map((date) => ({
    date, // Keep date in YYYY-MM-DD format
    value: fclDestuffLastWeek[date] || 0, // Use value, default to 0
  }))
  .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort in ascending order

  const impLddInvLasWeekData = Object.keys(lddInventoryLastWeek)
  .filter((key) => key !== "name") // Remove "name" key
  .map((date) => ({
    date, // Keep date in YYYY-MM-DD format
    value: lddInventoryLastWeek[date] || 0, // Use value, default to 0
  }))
  .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort in ascending order


  // const exportDataDemo = [
  //   { day: "Mon", value: exportBufferInLastWeek.Monday },
  //   { day: "Tue", value: exportBufferInLastWeek.Tuesday },
  //   { day: "Wed", value: exportBufferInLastWeek.Wednesday},
  //   { day: "Thu", value: exportBufferInLastWeek.Thursday },
  //   { day: "Fri", value: exportBufferInLastWeek.Friday },
  //   { day: "Sat", value: exportBufferInLastWeek.Saturday },
  //   { day: "Sun", value: exportBufferInLastWeek.Sunday },
  // ];
  
  // const exportMovemnetOutWeek = [
  //   { day: "Mon", value: exportMovementOutLastWeek.Monday },
  //   { day: "Tue", value: exportMovementOutLastWeek.Tuesday },
  //   { day: "Wed", value: exportMovementOutLastWeek.Wednesday},
  //   { day: "Thu", value: exportMovementOutLastWeek.Thursday },
  //   { day: "Fri", value: exportMovementOutLastWeek.Friday },
  //   { day: "Sat", value: exportMovementOutLastWeek.Saturday },
  //   { day: "Sun", value: exportMovementOutLastWeek.Sunday },
  // ];
  
  // const exportTallyData = [
  //   { day: "Mon", value: exportTallyLastWeek.Monday },
  //   { day: "Tue", value: exportTallyLastWeek.Tuesday },
  //   { day: "Wed", value: exportTallyLastWeek.Wednesday},
  //   { day: "Thu", value: exportTallyLastWeek.Thursday },
  //   { day: "Fri", value: exportTallyLastWeek.Friday },
  //   { day: "Sat", value: exportTallyLastWeek.Saturday },
  //   { day: "Sun", value: exportTallyLastWeek.Sunday },
  // ];

  const exportDataDemo = Object.keys(exportBufferInLastWeek)
  .filter((key) => key !== "name") // Remove "name" key
  .map((date) => ({
    date, // Keep date in YYYY-MM-DD format
    value: exportBufferInLastWeek[date] || 0, // Use value, default to 0
  }))
  .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort in ascending order
  
  const exportMovemnetOutWeek = Object.keys(exportMovementOutLastWeek)
  .filter((key) => key !== "name") // Remove "name" key
  .map((date) => ({
    date, // Keep date in YYYY-MM-DD format
    value: exportMovementOutLastWeek[date] || 0, // Use value, default to 0
  }))
  .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort in ascending order
  

  const exportTallyData = Object.keys(exportTallyLastWeek)
  .filter((key) => key !== "name") // Remove "name" key
  .map((date) => ({
    date, // Keep date in YYYY-MM-DD format
    value: exportTallyLastWeek[date] || 0, // Use value, default to 0
  }))
  .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort in ascending order


  const exportLDDData = [
    { day: "Mon", value: exportLDDLastWeek.Monday },
    { day: "Tue", value: exportLDDLastWeek.Tuesday },
    { day: "Wed", value: exportLDDLastWeek.Wednesday},
    { day: "Thu", value: exportLDDLastWeek.Thursday },
    { day: "Fri", value: exportLDDLastWeek.Friday },
    { day: "Sat", value: exportLDDLastWeek.Saturday },
    { day: "Sun", value: exportLDDLastWeek.Sunday },
  ];
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

  // const CustomTooltip = ({ active, payload, label }) => {
  //   if (active && payload && payload.length) {
  //     const data = payload[0].payload; // Access the data of the hovered point
  //     return (
  //       <div className="custom-tooltip">
  //         <p  className="label">{`${data.day}: ${data.value}`}</p>
  //       </div>
  //     );
  //   }
  //   return null;
  // };





  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload; // Access the data of the hovered point

      const formattedDate = new Date(data.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      });

      return (
        <div className="custom-tooltip">
          <p  className="label">{`${formattedDate} - ${data.value}`}</p>
        </div>
      );
    }
    return null;
  };
  



  const [chartWidth, setChartWidth] = useState(window.innerWidth < 768 ? 320 : 500);

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth < 768 ? 320 : 500); // Adjust width for mobile
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const [chartSize, setChartSize] = useState({
    height: window.innerWidth < 768 ? 250 : 300,
    outerRadius: window.innerWidth < 768 ? 100 : 144,
    innerRadius: window.innerWidth < 768 ? 30 : 36,
    fontSize: window.innerWidth < 768 ? 7 : 14, // Adjust label size
    labelRadius: window.innerWidth < 768 ? "50%" : "60%",
  });

  useEffect(() => {
    const handleResize = () => {
      setChartSize({
        height: window.innerWidth < 768 ? 250 : 300,
        outerRadius: window.innerWidth < 768 ? 100 : 144,
        innerRadius: window.innerWidth < 768 ? 30 : 36,
        fontSize: window.innerWidth < 768 ? 7 : 14, // Responsive font size
        labelRadius: window.innerWidth < 768 ? "50%" : "60%",
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className={styles.dashboard}> 
  

    {/* <header className={styles.header}>
      <h4>Daily CFS Activity</h4>
      
      <p>Your operations at a glance</p>
    </header> */}

<header className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <h4 style={{marginLeft:9}}>Daily CFS Activity</h4>
  
  <h5 style={{ marginLeft: 9,float:'right' }}>
    <span style={{ marginLeft: "9px", color: "white" }}>
      {formattedDate}
    </span>
  </h5>
</header>

{/* <FontAwesomeIcon icon={faTachometerAlt} className="gauge-icon" /> */}







{/* <button
                className="btn btn-outline-success btn-margin newButton"
                id="submitbtn2"
                style={{ fontSize: 11, marginRight: 5 }}
                onClick={()=> handleDashBoardData(startDate,endDate) }

            >
              <FontAwesomeIcon icon={faEye} style={{ marginRight: "4px" }} />
              Show
            </button> */}
                <section className={styles.widgets}>
      <div className={`${styles.widget} ${styles.widgetPrimary}`} >
      <div style={{ display: "flex", gap: "5px",justifyContent:'center'}}>
    <h4 >Import Gate In</h4>
    <div style={{ width: "50px", height: "45px" }}>
      <Lottie animationData={gauge} />
    </div>
  </div>
  <table  style={{ marginTop: 0 }} className={styles.table}>
    <thead>
      <tr>
        <th>20</th>
        <th>40</th>
        <th>TEUS</th>
      </tr>
    </thead>
    <tbody>
    <tr>
      <td style={{ textAlign: "center" }}>{gateInData[20] || 0}</td>
      <td style={{ textAlign: "center" }}>{gateInData[40] || 0}</td>
      <td style={{ textAlign: "center" }}>{gateInData.Tues || 0}</td>
    </tr>
    </tbody>
  </table>
  <ResponsiveContainer width="100%" height={50}>
          <LineChart data={importDataDemo}>
            {/* <Tooltip  /> */}
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>

</div>

      <div className={`${styles.widget} ${styles.widgetSecondary}`}>
      <div style={{ display: "flex", gap: "5px",justifyContent:'center'}}>
    <h4 >Loaded Out</h4>
    <div style={{ width: "50px", height: "45px" }}>
      <Lottie animationData={gauge} />
    </div>
  </div>
  <table  style={{ marginTop: 0 }} className={styles.table}>
    <thead>
      <tr>
        <th>20</th>
        <th>40</th>
        <th>TEUS</th>
      </tr>
    </thead>
    <tbody>
    <tr>
      <td style={{ textAlign: "center" }}>{fclLoadedData[20] || 0}</td>
      <td style={{ textAlign: "center" }}>{fclLoadedData[40] || 0}</td>
      <td style={{ textAlign: "center" }}>{fclLoadedData.Tues || 0}</td>
    </tr>
    </tbody>
  </table>
        <ResponsiveContainer width="100%" height={50}>
          <LineChart data={lclLoadedOutDataLIneChart}>
          <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className={`${styles.widget} ${styles.widgetTertiary}`}>
      <div style={{ display: "flex", gap: "5px",justifyContent:'center'}}>
    <h4 >FCL Destuff</h4>
    <div style={{ width: "50px", height: "45px" }}>
      <Lottie animationData={gauge} />
    </div>
  </div>
  <table  style={{ marginTop: 0 }} className={styles.table}>
    <thead>
      <tr>
        <th>20</th>
        <th>40</th>
        <th>TEUS</th>
      </tr>
    </thead>
    <tbody>
    <tr>
      <td style={{ textAlign: "center" }}>{fclDestuffData[20] || 0}</td>
      <td style={{ textAlign: "center" }}>{fclDestuffData[40] || 0}</td>
      <td style={{ textAlign: "center" }}>{fclDestuffData.Tues || 0}</td>
    </tr>
    </tbody>
  </table>
        <ResponsiveContainer width="100%" height={50}>
          <LineChart data={fclDestuffLasWeekData}>
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="value" stroke="#ffc658" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className={`${styles.widget} ${styles.widgetQuaternary}`}>
      <div style={{ display: "flex", gap: "5px",justifyContent:'center'}}>
    <h4 >LDD Inventory</h4>
    <div style={{ width: "50px", height: "45px" }}>
      <Lottie animationData={gauge} />
    </div>
  </div>
  <table  style={{ marginTop: 0 }} className={styles.table}>
    <thead>
      <tr>
        <th>20</th>
        <th>40</th>
        <th>TEUS</th>
      </tr>
    </thead>
    <tbody>
    <tr>
      <td style={{ textAlign: "center" }}>{inventoryData[20] || 0}</td>
      <td style={{ textAlign: "center" }}>{inventoryData[40] || 0}</td>
      <td style={{ textAlign: "center" }}>{inventoryData.Tues || 0}</td>
    </tr>
    </tbody>
  </table>
        <ResponsiveContainer width="100%" height={50}>
          <LineChart data={impLddInvLasWeekData}>
            <Tooltip content={<CustomTooltip />}/>
            <Line type="monotone" dataKey="value" stroke="#ff8042" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </section>




<section className={styles.widgetschartAll}>
  
<Row>

{/* <Col md={6}>
  <div className={`${styles.pieChart} ${styles.gradientTwo}`}>
  <h6 style={{textAlign:'center',color:'#990000'}}>IMPORT EXPORT CONTAINER DATA
</h6>

<BarChart
  xAxis={[{
    scaleType: 'band',
    data: ['IN', 'OUT', 'STUFF', 'LDD'] // Categories
  }]}
  series={[
    {
      name: 'Import', 
      data: [
        gateInData.Tues,           // Import for IN
        fclLoadedData.Tues,   // Import for OUT
        fclDestuffData.Tues, // Import for STUFF (adjust based on your data)
        inventoryData.Tues           // Import for LDD (adjust based on your data)
        
      ], label: 'Import'
    },
    {
      name: 'Export', 
      data: [
        exportBufferGateIn.Tues,   // Export for IN
        exportMovementOut.Tues,          // Export for OUT
        exportStuffTally.Tues  ,   // Export for STUFF (adjust based on your data)
        exportLDDPendency.Tues          // Export for LDD (adjust based on your data)
      ], label: 'Export'
    }
  ]}
  width={500}
  height={300}
/>
</div>
</Col> */}

<Col md={6} xs={12} style={{ padding: "10px" }}> {/* Responsive Column */}
      <div style={{ width: "100%", overflowX: "auto" }}> {/* Responsive Wrapper */}
        <h6 style={{ textAlign: "center", color: "#990000" }}>IMP EXP CONTAINER DATA</h6>
        <BarChart
          xAxis={[{
            scaleType: "band",
            data: ["IN", "OUT", "STUFF", "LDD"] // Categories
          }]}
          series={[
            {
              name: "Import",
              data: [
                gateInData.Tues,
                fclLoadedData.Tues,
                fclDestuffData.Tues,
                inventoryData.Tues
              ],
              label: "Import"
            },
            {
              name: "Export",
              data: [
                exportBufferGateIn.Tues,
                exportMovementOut.Tues,
                exportStuffTally.Tues,
                exportLDDPendency.Tues
              ],
              label: "Export"
            }
          ]}
          width={chartWidth}
          height={window.innerWidth < 768 ? 250 : 300} // Adjust height for mobile
        />
      </div>
    </Col>

{/* <Col md={6}>
  <div className={`${styles.pieChart} ${styles.gradientOne}`}
  >
  <h6 style={{textAlign:'center',color:'#990000'}}>DISTRUBUTION OF IMPORT CONTAINER(INVENTORY)
</h6>

    <PieChart
      series={[
        {
          data: pieChartData,
          label: {
            show: false, // Hide default labels
            color: 'orange', // Make text visible inside the slice
          },
          arcLabel: (item) => `${((item.value / totalSum) * 100).toFixed(2)}%`, // Percentage label on the arc
          arcLabelMinAngle: 18, // Ensure that small slices don't get labels
          arcLabelRadius: '60%', // Adjust radius of the label
          innerRadius: 36, // Space inside the pie
          outerRadius: 144, // Full arc width
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fontWeight: 'bold', // Customize the label styling
          color:'orange'
        },
      }}
      height={300}
    />
  </div>
</Col> */}



<Col md={6} xs={12} style={{ padding: "10px" }}>
      <div style={{ width: "100%", textAlign: "center" }}>
        <h6 style={{ textAlign: "center", color: "#990000" }}>
          DISTRIBUTION OF IMP CONTAINER (INVENTORY)
        </h6>
        <PieChart
          series={[
            {
              data: pieChartData,
              arcLabel: (item) =>
                `${((item.value / totalSum) * 100).toFixed(1)}%`, // Show % labels
              arcLabelMinAngle: 18,
              arcLabelRadius: chartSize.labelRadius,
              innerRadius: chartSize.innerRadius,
              outerRadius: chartSize.outerRadius,
              paddingAngle: chartSize.paddingAngle, // Fixes overlap
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 20, additionalRadius: -30, color: "gray" },
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fontWeight: "bold",
              fontSize: `${chartSize.fontSize}px`,
              fill: "black",
              // stroke: "white",
              strokeWidth: 1.5, // Fix overlapping issue
            },
          }}
          height={chartSize.height}
        />

      </div>
    </Col>
</Row>
</section>


<section className={styles.widgets}>
      {/* <div className={`${styles.widget} ${styles.widgetExpPrimary}`} >
  
  <h4>Export Carting <FontAwesomeIcon icon={faTachometerAlt} className="gauge-icon" /></h4>
  <table className={styles.table}>
    <thead>
      <tr>
        <th>20</th>
        <th>40</th>
        <th>TEUS</th>
      </tr>
    </thead>
    <tbody>

    </tbody>
  </table>
  <ResponsiveContainer width="100%" height={50}>
          <LineChart data={importDataDemo}>
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>

</div> */}

      <div className={`${styles.widget} ${styles.widgetExpSecondary}`}>
        <h4>Export Stuff Tally <FontAwesomeIcon icon={faTachometerAlt} className="gauge-icon" /></h4>

        <table className={styles.table}>
    <thead>
      <tr>
        <th>20</th>
        <th>40</th>
        <th>TEUS</th>
      </tr>
    </thead>
    <tbody>
    <tr>
      <td style={{ textAlign: "center" }}>{exportStuffTally[20] || 0}</td>
      <td style={{ textAlign: "center" }}>{exportStuffTally[40] || 0}</td>
      <td style={{ textAlign: "center" }}>{exportStuffTally.Tues || 0}</td>
    </tr>
    </tbody>
  </table>
        <ResponsiveContainer width="100%" height={50}>
          <LineChart data={exportTallyData}>
          <Tooltip content={<CustomTooltip/>} />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className={`${styles.widget} ${styles.widgetExpTertiary}`}>
        <h4>Buffer Gate In <FontAwesomeIcon icon={faTachometerAlt} className="gauge-icon" /></h4>
        <table className={styles.table}>
    <thead>
      <tr>
        <th>20</th>
        <th>40</th>
        <th>TEUS</th>
      </tr>
    </thead>
    <tbody>
    <tr>
      <td style={{ textAlign: "center" }}>{exportBufferGateIn[20] || 0}</td>
      <td style={{ textAlign: "center" }}>{exportBufferGateIn[40] || 0}</td>
      <td style={{ textAlign: "center" }}>{exportBufferGateIn.Tues || 0}</td>
    </tr>
    </tbody>
  </table>
        <ResponsiveContainer width="100%" height={50}>
          <LineChart data={exportDataDemo}>
            <Tooltip content={<CustomTooltip/>} />
            <Line type="monotone" dataKey="value" stroke="#ffc658" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className={`${styles.widget} ${styles.widgetExpQuaternary}`}>
        <h4>Movement Out <FontAwesomeIcon icon={faTachometerAlt} className="gauge-icon" /></h4>

        <table className={styles.table}>
    <thead>
      <tr>
        <th>20</th>
        <th>40</th>
        <th>TEUS</th>
      </tr>
    </thead>
    <tbody>
    <tr>
      <td style={{ textAlign: "center" }}>{exportMovementOut[20] || 0}</td>
      <td style={{ textAlign: "center" }}>{exportMovementOut[40] || 0}</td>
      <td style={{ textAlign: "center" }}>{exportMovementOut.Tues || 0}</td>
    </tr>
    </tbody>
  </table>
        <ResponsiveContainer width="100%" height={50}>
          <LineChart data={exportMovemnetOutWeek}>
          <Tooltip content={<CustomTooltip/>} />
            <Line type="monotone" dataKey="value" stroke="#ff8042" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>








      <div className={`${styles.widget} ${styles.widgetExpPrimary}`} >
  
  <h4>LDD Pendency <FontAwesomeIcon icon={faTachometerAlt} className="gauge-icon" /></h4>
  <table className={styles.table}>
    <thead>
      <tr>
        <th>20</th>
        <th>40</th>
        <th>TEUS</th>
      </tr>
    </thead>
    <tbody>
    <tr>
      <td style={{ textAlign: "center" }}>{exportLDDPendency[20] || 0}</td>
      <td style={{ textAlign: "center" }}>{exportLDDPendency[40] || 0}</td>
      <td style={{ textAlign: "center" }}>{exportLDDPendency.Tues || 0}</td>
    </tr>
    </tbody>
  </table>
  {/* <ResponsiveContainer width="100%" height={50}>
          <LineChart data={exportLDDData}>
          <Tooltip content={<CustomTooltip/>} />
            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer> */}

</div>
    </section> 





<section className={styles.widgetsCFSBonding} style={{ position: "relative", overflow: "hidden", borderRadius: "12px" }}>
   <div
    style={{
      position: "relative",
      zIndex: 2,
      padding: "20px",
      borderRadius: "12px",
      backgroundImage: "linear-gradient(to top, #5ee7df 0%, #b490ca 100%)",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    }}
    className="table-responsive"
  >
    <h3
      style={{
        textAlign: "center",
        fontSize: "1.5rem",
        color: "Green",
        marginBottom: "20px",
      }}
    >
      CFS Bonding Data
    </h3>

 {/* <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "450px",
        backgroundSize:'cover',
        opacity: 0.2,
        zIndex: 1,
      }}
    >
      <Lottie
        animationData={warehouse}
        style={{
          width: "450px",
          height: "100%",
        }}
      />
    </div>  */}

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
      className="table-bordered table-responsive"
    >
      <thead>
        <tr
          style={{
            color: "orange",
            fontWeight: "bold",
          }}
        >
          <th colSpan={4} style={{ padding: "10px" }}>NOC</th>
          <th colSpan={4} style={{ padding: "10px" }}>INBOND</th>
          <th colSpan={4} style={{ padding: "10px" }}>EXBOND</th>
        </tr>

        <tr
          style={{
            backgroundImage: "linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%)",
            color: "white",
            fontWeight: "bold",
          }}
        >
          <th style={{ padding: "10px" }}>Count</th>
          <th style={{ padding: "10px" }}>CIF</th>
          <th style={{ padding: "10px" }}>Duty</th>
          <th style={{ padding: "10px" }}>Area</th>
          <th style={{ padding: "10px" }}>Count</th>
          <th style={{ padding: "10px" }}>CIF</th>
          <th style={{ padding: "10px" }}>Duty</th>
          <th style={{ padding: "10px" }}>Area</th>
          <th style={{ padding: "10px" }}>Count</th>
          <th style={{ padding: "10px" }}>CIF</th>
          <th style={{ padding: "10px" }}>Duty</th>
          <th style={{ padding: "10px" }}>Area</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ backgroundColor: "#798686", color: "#fff" }}>
          <td style={{ padding: "10px" }}>{nocCount}</td>
          <td style={{ padding: "10px" }}>{nocCif}</td>
          <td style={{ padding: "10px" }}>{nocSum}</td>
          <td style={{ padding: "10px" }}>{nocArea}</td>
          <td style={{ padding: "10px" }}>{inbondCount}</td>
          <td style={{ padding: "10px" }}>{inbondCif}</td>
          <td style={{ padding: "10px" }}>{inbondSum}</td>
          <td style={{ padding: "10px" }}>{inbondArea}</td>
          <td style={{ padding: "10px" }}>{exbondCount}</td>
          <td style={{ padding: "10px" }}>{exbondCif}</td>
          <td style={{ padding: "10px" }}>{exbondSum}</td>
          <td style={{ padding: "10px" }}>{exbondArea}</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>


<div 
// style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.1rem" }}
style={{
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  // width: "100%",
  maxWidth: "1800px", // Restricts max width to 1400px for a clean layout
  margin: "auto", // Centers the container
  gap: "1rem", // Provides spacing between gauges
}}
>
  {/* <div style={{ textAlign: "center", position: "relative", flex: "1 1 0" }}> */}
  <div style={{ margin: "auto",justifyContent: "center", textAlign: "center", position: "relative",}}>
    <GaugeContainer
      width={200}
      height={200}
      startAngle={-110}
      endAngle={110}
      value={gaugeValueCif}
    >
      <GaugeReferenceArc
        style={{ fill: "lightgreen" }}
        onMouseEnter={() => handleMouseEnterCif("remaining", 100, 50)}
        onMouseLeave={handleMouseLeaveCif}
      />
      <GaugeValueArc
        style={{ fill: "red" }}
        onMouseEnter={() => handleMouseEnterCif("used", 100, 150)}
        onMouseLeave={handleMouseLeaveCif}
      />
      <GaugePointer />
    </GaugeContainer>
    {tooltipCif && (
      <div
        style={{
          position: "absolute",
          left: `${tooltipCif.x}px`,
          top: `${tooltipCif.y}px`,
          transform: "translate(-50%, -50%)",
          backgroundColor: "black",
          border: "1px solid gray",
          borderRadius: "5px",
          padding: "5px",
          fontSize: "12px",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        {tooltipCif.text}
      </div>
    )}
        <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -60%)",
      textAlign: "center",
    }}
  >
    <h4 style={{ margin: 0, fontSize: "18px", color: "white", fontWeight: "bold" }}>
      {`${gaugeValueCif}%`}
    </h4>
    <span style={{ fontSize: "12px", color: "lightgray" }}>Used</span>
  </div>
    <div style={{ marginTop: "1rem" }}>
      <h5 style={{ textAlign: "center", color: "white",fontWeight:'bold' }}>CIF</h5>
    </div>
  </div>
  {/* <div style={{ textAlign: "center", position: "relative", flex: "2 1 0" }}> */}
  <div style={{ margin: "auto",justifyContent: "center", textAlign: "center", position: "relative",}}>
    <GaugeContainer
      width={250}
      height={250}
      startAngle={-110}
      endAngle={110}
      value={gaugeValue}
    >
      <GaugeReferenceArc
        style={{ fill: "lightgreen" }}
        onMouseEnter={() => handleMouseEnter("remaining", 100, 50)}
        onMouseLeave={handleMouseLeave}
      />
      <GaugeValueArc
        style={{ fill: "red" }}
        onMouseEnter={() => handleMouseEnter("used", 100, 150)}
        onMouseLeave={handleMouseLeave}
      />
      <GaugePointer />
    </GaugeContainer>
    {tooltip && (
      <div
        style={{
          position: "absolute",
          left: `${tooltip.x}px`,
          top: `${tooltip.y}px`,
          transform: "translate(-50%, -50%)",
          backgroundColor: "black",
          border: "1px solid gray",
          borderRadius: "5px",
          padding: "5px",
          fontSize: "12px",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        {tooltip.text}
      </div>
    )}
      <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -60%)",
      textAlign: "center",
    }}
  >
    <h4 style={{ margin: 0, fontSize: "18px", color: "white", fontWeight: "bold" }}>
      {`${gaugeValue}%`}
    </h4>
    <span style={{ fontSize: "12px", color: "lightgray" }}>Used</span>
  </div>
    <div style={{ marginTop: "1rem" }}>
    {/* <h6 style={{ textAlign: "center", color: "white",fontWeight:'bold' }}>{`(${useddDuty} / ${approvedDuty})`}</h6> */}
      <h5 style={{ textAlign: "center", color: "white",fontWeight:'bold' }}>DUTY</h5>
    </div>
  </div>
  {/* <div style={{ textAlign: "center", position: "relative", flex: "1 1 0" }}> */}
  <div style={{ margin: "auto",justifyContent: "center", textAlign: "center", position: "relative",}}>
    <GaugeContainer
      width={200}
      height={200}
      startAngle={-110}
      endAngle={110}
      value={gaugeValueArea}
    >
      <GaugeReferenceArc
        style={{ fill: "lightgreen" }}
        onMouseEnter={() => handleMouseEnterArea("remaining", 100, 50)}
        onMouseLeave={handleMouseLeaveArea}
      />
      <GaugeValueArc
        style={{ fill: "red" }}
        onMouseEnter={() => handleMouseEnterArea("used", 100, 150)}
        onMouseLeave={handleMouseLeaveArea}
      />
      <GaugePointer />
    </GaugeContainer>
    {tooltipArea && (
      <div
        style={{
          position: "absolute",
          left: `${tooltipArea.x}px`,
          top: `${tooltipArea.y}px`,
          transform: "translate(-50%, -50%)",
          backgroundColor: "black",
          border: "1px solid gray",
          borderRadius: "5px",
          padding: "5px",
          fontSize: "12px",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        {tooltipArea.text}
      </div>
    )}
          <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -60%)",
      textAlign: "center",
    }}
  >
    <h4 style={{ margin: 0, fontSize: "18px", color: "white", fontWeight: "bold" }}>
      {`${gaugeValueArea}%`}
    </h4>
    <span style={{ fontSize: "12px", color: "lightgray" }}>Used</span>
  </div>
    <div style={{ marginTop: "1rem" }}>
    {/* <h6 style={{ textAlign: "center", color: "white",fontWeight:'bold'}}>{`(${useddArea} / ${approvedArea})`}</h6> */}
      <h5 style={{ textAlign: "center", color: "white",fontWeight:'bold' }}>AREA</h5>
    </div>
  </div>
</div>


<div 
// style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5rem",marginTop:0 }}
style={{
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  // width: "100%",
  maxWidth: "1800px", // Restricts max width to 1400px for a clean layout
  margin: "auto", // Centers the container
  gap: "5rem", // Provides spacing between gauges
}}
>

  <div style={{ textAlign: "center", position: "relative", flex: "1 1 0" }}>
    <div style={{ marginTop: "1rem" }}>
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        margin: "0 auto",
        textAlign: "center",
      }}
      className="table-bordered"
    >
      <thead>
        <tr>
          <th style={{ color: "white", fontWeight: "bold", padding: "8px" }}>Type</th>
          <th style={{ color: "white", fontWeight: "bold", padding: "8px" }}>Value (₹)</th>
        </tr>
      </thead>
      <tbody>
      <tr>
        <td style={{ backgroundColor: "#F0F8FF", color: "black", padding: "8px" }}>Approved</td>
        <td style={{ color: "black", padding: "8px",fontWeight:'bold' }}>{`${customAppCif}`}</td>
        </tr>
        <tr>
          <td style={{ backgroundColor: "red", color: "white", padding: "8px" }}>Used</td>
          <td style={{ color: "white", padding: "8px",fontWeight:'bold' }}>{`${useddCif}`}</td>
        </tr>
        <tr>
          <td style={{ backgroundColor: "lightgreen", color: "black", padding: "8px" }}>
            Remaining
          </td>
          <td style={{ color: "black", padding: "8px",fontWeight:'bold' }}>{`${remainingCif}`}</td>
        </tr>
      </tbody>
    </table>
  </div> 
  </div>

  <div style={{ textAlign: "center", position: "relative", flex: "2 1 0" }}>


    <div style={{ marginTop: "1rem" }}>
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        margin: "0 auto",
        textAlign: "center",
      }}
      className="table-bordered"
    >
      <thead>
        <tr>
          <th style={{ color: "white", fontWeight: "bold", padding: "8px" }}>Type</th>
          <th style={{ color: "white", fontWeight: "bold", padding: "8px" }}>Value (₹)</th>
        </tr>
      </thead>
      <tbody>
      <tr>
        <td style={{ backgroundColor: "#F0F8FF", color: "black", padding: "8px" }}>Approved</td>
        <td style={{ color: "black", padding: "8px",fontWeight:'bold' }}>{`${customAppDuty}`}</td>
        </tr>
        <tr>
          <td style={{ backgroundColor: "red", color: "white", padding: "8px" }}>Used</td>
          <td style={{ color: "white", padding: "8px",fontWeight:'bold' }}>{`${useddDuty}`}</td>
        </tr>
        <tr>
          <td style={{ backgroundColor: "lightgreen", color: "black", padding: "8px" }}>
            Remaining
          </td>
          <td style={{ color: "black", padding: "8px",fontWeight:'bold' }}>{`${remainigDuty}`}</td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>

  <div style={{ textAlign: "center", position: "relative", flex: "1 1 0" }}>

    <div style={{ marginTop: "1rem" }}>
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        margin: "0 auto",
        textAlign: "center",
      }}
      className="table-bordered"
    >
      <thead>
        <tr>
          <th style={{ color: "white", fontWeight: "bold", padding: "8px" }}>Type</th>
          <th style={{ color: "white", fontWeight: "bold", padding: "8px" }}>Value (Sq.M)</th>
        </tr>
      </thead>
      <tbody>
      <tr>
        <td style={{ backgroundColor: "#F0F8FF", color: "black", padding: "8px" }}>Approved</td>
        <td style={{ color: "black", padding: "8px",fontWeight:'bold' }}>{`${customAppArea}`}</td>
        </tr>
        <tr>
          <td style={{ backgroundColor: "red", color: "white", padding: "8px" }}>Used</td>
          <td style={{ color: "white", padding: "8px",fontWeight:'bold' }}>{`${useddArea}`}</td>
        </tr>
        <tr>
          <td style={{ backgroundColor: "lightgreen", color: "black", padding: "8px" }}>
            Remaining
          </td>
          <td style={{ color: "black", padding: "8px",fontWeight:'bold' }}>{`${remaininggArea}`}</td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</div>















  </div>

  </>
  )




}