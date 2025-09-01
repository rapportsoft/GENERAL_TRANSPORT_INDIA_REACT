import React, { useContext, useEffect } from 'react'
import { FaChartBar, FaCog, FaTruck, FaUsers } from 'react-icons/fa';
import styles from "../Dashboard.module.css";
import { BarChart, GaugeContainer, GaugeReferenceArc, GaugeValueArc, useGaugeState } from '@mui/x-charts';
import { PieChart } from '@mui/x-charts/PieChart';
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

export default function BondingDashBoard() {

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
const [remainingAreaaa, setRemainingArea] = useState(0);

const [inbondPackagesInventory, setInbondPackagesInventory] = useState(0);
const [inbondGrossWeightInventory, setInbondGrossWeightInventory] = useState(0);

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
        const fclLoaded = response.data.fclLoaded;
        const fclDestuff = response.data.fclDestuff;
        
        const exportLDDMap = response.data.exportLDDMap;
        const exportBufferContainer = response.data.exportBufferContainer;
        const emptyMovementOutMap = response.data.emptyMovementOutMap;
        const exportStuffTally = response.data.exportStuffTally;
        // const fclDestuff = response.data.fclDestuff;

       

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

        setInbondPackagesInventory(customeData.getBondInventoryMap.totalInBondedPackages);
        setInbondGrossWeightInventory(customeData.getBondInventoryMap.totalInBondGrossWt);

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
  const remainingPercentageArea = ((remaininggArea / approvedArea) * 100).toFixed(2); // Percentage with 2 decimal places
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
          <p  className="label">{`${data.day}: ${data.value}`}</p>
        </div>
      );
    }
    return null;
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



 
<section className={styles.widgetsCFSBonding} style={{ position: "relative", overflow: "hidden", borderRadius: "12px" }}>
   <div
    style={{
      position: "relative",
      zIndex: 2,
      padding: "9px",
      borderRadius: "12px",
      backgroundImage: "linear-gradient(to top, #5ee7df 0%, #b490ca 100%)",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    }}
    className="table-responsive"
  >
    <h5
      style={{
        textAlign: "center",
        fontSize: "1.5rem",
        color: "Green",
        marginBottom: "9px",
      }}
    >
     {`CFS Bonding Data  (${formattedDate})`}
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
          <th colSpan={2} style={{ padding: "10px" }}>CARGO INV</th>
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
          <th style={{ padding: "10px" }}>Packages</th>
          <th style={{ padding: "10px" }}>Weight</th>
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
          <td style={{ padding: "10px" }}>{inbondPackagesInventory}</td>
          <td style={{ padding: "10px" }}>{inbondGrossWeightInventory}</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
<div 
// style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem",marginBottom:0 }}

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
      width={250}
      height={250}
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
    <h5 style={{ textAlign: "center", color: "white",fontWeight:'bold' }}>CIF</h5></div>
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
    <h5 style={{ textAlign: "center", color: "white",fontWeight:'bold' }}>DUTY</h5></div>
  </div>

  {/* <div style={{ textAlign: "center", position: "relative", flex: "1 1 0" }}> */}
  <div style={{ margin: "auto",justifyContent: "center", textAlign: "center", position: "relative",}}>
    <GaugeContainer
      width={250}
      height={250}
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
    <h5 style={{ textAlign: "center", color: "white",fontWeight:'bold' }}>AREA</h5></div>
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
    <div style={{ marginTop: "0.5rem" }}>
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


    <div style={{ marginTop: "0.5rem" }}>
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

    <div style={{ marginTop: "0.5rem" }}>
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
          <td style={{ color: "black", padding: "8px" ,fontWeight:'bold'}}>{`${remainingAreaaa}`}</td>
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