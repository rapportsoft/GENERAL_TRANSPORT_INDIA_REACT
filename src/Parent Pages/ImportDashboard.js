import React, { useContext, useEffect } from 'react'
import { FaChartBar, FaCog, FaTruck, FaUsers } from 'react-icons/fa';
import styles from "../Dashboard.module.css";
import { BarChart, GaugeContainer, GaugeReferenceArc, GaugeValueArc, useGaugeState } from '@mui/x-charts';
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart';
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
import worldMap from '../worlwide.json'; 
import Lottie from 'lottie-react';
import useAxios from '../Components/useAxios';
import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import ipaddress from '../Components/IpAddress';
import moment from 'moment';

import { IconButton } from '@mui/material';

export default function ImportDashboard() {

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
  const [lclDesstuffData ,setLclDesstuffData] =useState([]);
  const [gateEmptyOutData ,setGateEmptyOutData] =useState([]);
  const [gateInDataLastWeek ,setGateInDataLastWeek] =useState([]);
  const [loadedOutLastWeek ,setLoadedOutLastWeek] =useState([]);
  const [fclDestuffLastWeek ,setFclDestuffLastWeek] =useState([]);
  const [lddInventoryLastWeek ,setLddInventoryLastWeek] =useState([]);
  const [lclWeek ,setLclWeek] =useState([]);
  const [emptyOutLastWeek ,setEmptyOutLastWeek] =useState([]);
  const [fclLoadedData ,setFclLoadedData] =useState([]);
  const [fclDestuffData ,setFclDestuffData] =useState([]);
  const [inventoryData ,setInventoryData] =useState([]);
  const [loadedInventoryList ,setLoadedInventoryList]=useState([]);
  const [portWisePendency,setPortWisePendency] = useState([]);

  // const [gaugeValue,setGaugeValue] =useState(0);

  const handleDashBoardData = async () => {
    setLoading(true);
    try {

        
      const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DD HH:mm') : '';
      const formattedEndDate= endDate ? moment(endDate).format('YYYY-MM-DD HH:mm') : '';

        const response = await axios.get(
            `${ipaddress}api/dashboard/getDashBoardImport?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
        );

        handleLoadedInventoryReport(formattedStartDate,formattedEndDate);
        handlePortWisePendency(formattedStartDate,formattedEndDate);
        const gateIn = response.data.gateIn;
        const int = response.data.inventory;
        const fclLoaded = response.data.containerCountsSealCutting;
        const fclDestuff = response.data.fclDestuff;
        const emptyOutData=response.data.containerCountsEmptyOut;
        const lcl=response.data.importCutsomesData;

        setGateInData(gateIn);
        setInventoryData(int);
        setFclLoadedData(fclLoaded);
        setFclDestuffData(fclDestuff);
        setGateEmptyOutData(emptyOutData);
        setLclDesstuffData(lcl);

        const data = response.data;

       setFclDestuffLastWeek(data.fclDestuffMap);
        setGateInDataLastWeek(data.lastWeekGateInData);
        setLoadedOutLastWeek(data.lastWeekLclLoadedMap);
      
        setLddInventoryLastWeek(data.lddMapLastWeek);
        setEmptyOutLastWeek(data.bufferInUser);
        setLclWeek(data.lclDestuffWeekData);
       
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

const handlePortWisePendency = async (formattedStartDate,formattedEndDate) => {
  try {
      
      const response = await axios.get(
          `${ipaddress}api/commonReports/getPortWisePendency?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
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


          setPortWisePendency(inventoryArray);

          console.log(" inventoryArray  inventoryArray  " ,inventoryArray);
      } else {
          // If already an array, directly set it
          setPortWisePendency(data);
      }

  } catch (error) {
     
  }
};

  useEffect(() => {
    handleDashBoardData();
  }, []);

 



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


  // const impLddInvLasWeekData = [
  //   { day: "Mon", value: lddInventoryLastWeek.Monday },
  //   { day: "Tue", value: lddInventoryLastWeek.Tuesday },
  //   { day: "Wed", value: lddInventoryLastWeek.Wednesday},
  //   { day: "Thu", value: lddInventoryLastWeek.Thursday },
  //   { day: "Fri", value: lddInventoryLastWeek.Friday },
  //   { day: "Sat", value: lddInventoryLastWeek.Saturday },
  //   { day: "Sun", value: lddInventoryLastWeek.Sunday },
  // ];



  // const emptyOutLineChart = [
  //   { day: "Mon", value: emptyOutLastWeek.Monday },
  //   { day: "Tue", value: emptyOutLastWeek.Tuesday },
  //   { day: "Wed", value: emptyOutLastWeek.Wednesday},
  //   { day: "Thu", value: emptyOutLastWeek.Thursday },
  //   { day: "Fri", value: emptyOutLastWeek.Friday },
  //   { day: "Sat", value: emptyOutLastWeek.Saturday },
  //   { day: "Sun", value: emptyOutLastWeek.Sunday },
  // ];
  const emptyOutLineChart = Object.keys(emptyOutLastWeek)
  .filter((key) => key !== "name") // Remove "name" key
  .map((date) => ({
    date, // Keep date in YYYY-MM-DD format
    value: emptyOutLastWeek[date] || 0, // Use value, default to 0
  }))
  .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort in ascending order



  const lclDestuffLastWeek = Object.keys(lclWeek)
  .filter((key) => key !== "name") // Remove "name" key
  .map((date) => ({
    date, // Keep date in YYYY-MM-DD format
    value: lclWeek[date] || 0, // Use value, default to 0
  }))
  .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort in ascending order


  // const lclDestuffLastWeek = [
  //   { day: "Mon", value: lclWeek.Monday },
  //   { day: "Tue", value: lclWeek.Tuesday },
  //   { day: "Wed", value: lclWeek.Wednesday},
  //   { day: "Thu", value: lclWeek.Thursday },
  //   { day: "Fri", value: lclWeek.Friday },
  //   { day: "Sat", value: lclWeek.Saturday },
  //   { day: "Sun", value: lclWeek.Sunday },
  // ];

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

// const allowedPorts = ["JNPT", "NSFT", "BMCTPL", "GTI", "NSICT", "NSIGT"];

// const allowedPortsLower = allowedPorts.map(port => port.toLowerCase());
// const filteredDataPort = Object.values(portWisePendency).filter((item) =>
// allowedPortsLower.includes(item.name.toLowerCase()) // Convert item.name to lowercase
// );

// const barChartData = filteredDataPort.map(port => {
//   return {
//     name: port.name,
//     data: [port["20"], port["40"]], // Data for 20 and 40
//   };
// });
  
const allowedPorts = ["JNPT", "NSFT", "BMCTPL", "GTI", "NSICT", "NSIGT"];

// Convert allowedPorts to lowercase and remove duplicates for comparison
const allowedPortsLower = new Set(allowedPorts.map(port => port.toLowerCase()));

// Ensure portWisePendency is correctly structured
const filteredDataPort = Object.values(portWisePendency).filter((item) =>
  item?.name && allowedPortsLower.has(item.name.trim().toLowerCase()) // Trim whitespace
);

// Create a complete barChartData list to match `allowedPorts`
const barChartData = allowedPorts.map(portName => {
  const port = filteredDataPort.find(item => item.name.trim().toLowerCase() === portName.toLowerCase());
  return {
    name: portName, // Use original casing
    data: [port?.["20"] ?? 0, port?.["40"] ?? 0] // Default to 0 if missing
  };
});



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
    <div className={styles.dashboardImport}> 

   <header className={styles.header} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <h4 style={{marginLeft:9}}>Import Activity </h4>
  
  <h5 style={{ marginLeft: 9,float:'right' }}>
    <span style={{ marginLeft: "9px", color: "white" }}>
      {formattedDate}
    </span>
  </h5>
</header>
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
      <div className={`${styles.widget} ${styles.widgetExpSecondary}`} >
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

      <div className={`${styles.widget} ${styles.widgetExpTertiary}`}>
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
      <div className={`${styles.widget} ${styles.widgetExpQuaternary}`}>
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
      <div className={`${styles.widget} ${styles.widgetExpPrimary}`}>
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


    <section className={styles.widgetschart}>
<Row>

<Col md={6}>
    <div className={`${styles.pieChart} ${styles.gradientTwo}`}>
    <h6 style={{textAlign:'center',color:'white'}}>PORT WISE PENDENCY IMPORT CONTAINER
</h6>

    <BarChart
        xAxis={[{
          scaleType: 'band',
          data: allowedPorts, // The x-axis will be the port names
        }]}
        series={[
          {
            name: '20',
            data: barChartData.map(item => item.data[0]), // Data for 20
            label: '20', // Label for 20
          },
          {
            name: '40',
            data: barChartData.map(item => item.data[1]), // Data for 40
            label: '40', // Label for 40
          }
        ]}
        width={500}
        height={300}
      />
    </div>
  </Col>
<Col md={6}>
  <div className={`${styles.pieChart} ${styles.gradientOne}`}>
<h6 style={{textAlign:'center',color:'white'}}>DISTRUBUTION OF IMPORT CONTAINER(INVENTORY)
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
</Col>

</Row>
</section>



<section className={styles.widgets}>
      <div className={`${styles.widget} ${styles.widgetPrimary}`}>
        <h4>Empty Out <FontAwesomeIcon icon={faTachometerAlt} className="gauge-icon" /></h4>

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
      <td style={{ textAlign: "center" }}>{gateEmptyOutData[20] || 0}</td>
      <td style={{ textAlign: "center" }}>{gateEmptyOutData[40] || 0}</td>
      <td style={{ textAlign: "center" }}>{gateEmptyOutData.Tues || 0}</td>
    </tr>
    </tbody>
  </table>
        <ResponsiveContainer width="100%" height={50}>
          <LineChart data={emptyOutLineChart}>
          <Tooltip content={<CustomTooltip />}/>
            <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
     
      <div className={`${styles.widget} ${styles.widgetTertiary}`}>
      <div style={{ display: "flex", gap: "5px",justifyContent:'center'}}>
    <h4 >LCL Destuff</h4>
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
      <td style={{ textAlign: "center" }}>{lclDesstuffData[20] || 0}</td>
      <td style={{ textAlign: "center" }}>{lclDesstuffData[40] || 0}</td>
      <td style={{ textAlign: "center" }}>{lclDesstuffData.Tues || 0}</td>
    </tr>
    </tbody>
  </table>
        <ResponsiveContainer width="100%" height={50}>
          <LineChart data={lclDestuffLastWeek}>
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="value" stroke="#ffc658" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </section> 

  </div>

  </>
  )
}
