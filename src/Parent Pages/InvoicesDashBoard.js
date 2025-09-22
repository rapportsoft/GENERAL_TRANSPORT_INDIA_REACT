import React, { useContext, useEffect, useState } from "react";
import { PieChart ,pieArcLabelClasses } from '@mui/x-charts/PieChart';
import styles from "../Dashboard.module.css";
import { faBusinessTime, faFileCirclePlus, faFileInvoice, faIndianRupee, faIndianRupeeSign, faMoneyBill, faSackDollar, faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { CartesianGrid, Line ,LineChart as LC, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "reactstrap";
import { BarChart, LineChart } from "@mui/x-charts";
import useAxios from '../Components/useAxios';
import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import ipaddress from '../Components/IpAddress';
import moment from 'moment';
// Register Chart.js components

const InvoicesDashBoard = () => {


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
  // Sample data for cards

  const [importData,setImportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentDate = new Date();
  currentDate.setHours(8, 0, 0, 0);
  const [startDate ,setStartDate] =useState(
     currentDate
  );
const [endDate ,setEndDate] =useState(new Date());
const [invoicesdata,setinvoicesdata]=useState([]);

const [invoicesTotal,setInvoicesTotal]=useState([]);
const [totalCollection,setTotalCollection]=useState([]);
const [totalOutStanding,setTotalOutStanding]=useState([]);

const [invoicesTotalLastWeek,setInvoicesTotalLastWeek]=useState([]);
const [totalCollectionLastWeek,setTotalCollectionLastWeek]=useState([]);
const [totalOutStandingLastWeek,setTotalOutStandingLastWeek]=useState([]);
const [pieChartData,setPieChartData] =useState([]);
const [topOutStandingBarChart,setTopOutStandingBarChart] =useState([]);


const [totalCollectionChart,setTotalCollectionChart]=useState([]);
const [totalInvoicesChart,setTotalInvoicesChart]=useState([]);
const [advaceData,setAdvanceData]=useState([]);
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


  const handleDashBoardData = async () => {
    setLoading(true);
    try {
        
      const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DD HH:mm') : '';
      const formattedEndDate= endDate ? moment(endDate).format('YYYY-MM-DD HH:mm') : '';

        const response = await axios.get(
            `${ipaddress}api/dashboard/getInvoiceDashBoard?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
        );
        const data = response.data;
        const invoiceDetails = response.data.invocesRecord.invoiceDetails;
        const collectionDetails = response.data.collection.totalCollections;
        const invTotals = response.data.invocesRecord;

        const collection = response.data.collection;
        const outStandingMap = response.data.outStandingMap;


        const invoicesDayWise = response.data.invoicesDayWise;
        const invociceCollection = response.data.invociceCollection;
        const outStandingLastWeekMap = response.data.outStandingLastWeekMap;

        const pieChart = response.data.pieChart;
        const top10OutStandingChart = response.data.top10OutStandingChart.top10OutStanding;
        const advanceMap =response.data.advanceMap.advance;
 
        // setinvoicesdata(invoiceDetails);
        setInvoicesTotal(invTotals);
        setTotalCollection(collection);
        setTotalOutStanding(outStandingMap);
     
        setInvoicesTotalLastWeek(invoicesDayWise)
        setTotalCollectionLastWeek(invociceCollection);
        setTotalOutStandingLastWeek(outStandingLastWeekMap);
        setPieChartData(pieChart);
        setTopOutStandingBarChart(top10OutStandingChart);

        setTotalInvoicesChart(invoiceDetails);
        setTotalCollectionChart(collectionDetails);
        setAdvanceData(advanceMap);
   

        console.log("pieChart            ",pieChart);
        console.log("invoicesDayWise            ",invoicesDayWise);
        // console.log("advanceMap            ",advanceMap);

        if (data && typeof data === 'object' && !Array.isArray(data)) {
            const inventoryArray = Object.entries(data).map(([key, value]) => ({
                name: key,
                ...value  
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


  // const categories = totalInvoicesChart.map((item) => item[0]); // Extract category names from index 1
  // const categoriesColl = totalCollectionChart.map((item) => item[1]); // Extract category names from index 1
//   const categories = ['CFS Import', 'CFS Export','CFS Bond']; // X-Axis Labels
// const invoiceDetails = totalInvoicesChart
//   .filter((item) => categories.includes(item[0])) // Keep only items matching categories
//   .map((item) => item[3]);

// // Ensure collectionDetails length matches categories
// const collectionDetails = totalCollectionChart
//   .filter((item) => categories.includes(item[1])) // Keep only items matching categories
//   .map((item) => item[3]);


const categories = ['General Warehousing'];
const advanceCategory = ['Advance']; // Separate category for Advance
// Extract Invoice Amounts (Index 3) and Align with Categories
const invoiceDetails = categories.map(category => {
  const item = totalInvoicesChart.find(item => item[0] === category); // Use index 1 for category name
  return item ? item[3] : 0; // Use Index 3 for Invoice Amount, Default to 0 if missing
});

// Extract Collection Amounts (Index 3) and Align with Categories
const collectionDetails = categories.map(category => {
  const item = totalCollectionChart.find(item => item[1] === category); // Use index 1 for category name
  return item ? item[3] : 0; // Use Index 3 for Collection Amount, Default to 0 if missing
});


const advanceMoney = [advaceData?.[0]?.[3] || 0];


  // const invoiceDetails = totalInvoicesChart.map((item) => item[3]);

// Extract Collection Amounts (Index 3)
// const collectionDetails = totalCollectionChart.map((item) => item[3]);

  // const categories = ['CFS Import', 'CFS Export','CFS Bond']; // X-Axis Labels
 // const categories = totalInvoicesChart.map((item) => item[0]); // Extract category names from index 1

  // const lastWeekTotalInvoicesGeneratedLineChart = Object.keys(invoicesTotalLastWeek)
  // .filter((key) => key !== "name") // Remove "name" key
  // .map((date) => ({
  //   date, // Keep date in YYYY-MM-DD format
  //   // value: invoicesTotalLastWeek[date] || 0, // Use value, default to 0
  //   value: (invoicesTotalLastWeek[date]?.amount || 0).toFixed(2), // Format amount to 2 decimal places
  // }))
  // .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort in ascending order

  const formattedData = (invoicesTotalLastWeek || {}); // Default to an empty object if undefined

const sampleData = Object.keys(formattedData)
  .filter((key) => key !== "name") // Remove the "name" key if present
  .map((dateKey) => {
    const amount = formattedData[dateKey]?.amount || 0;
    return {
      date: dateKey, // Date remains as string (YYYY-MM-DD)
      // Convert amount to a number with 2 decimal places
      value: parseFloat(Number(amount).toFixed(2))
    };
  })
  .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date in ascending order


  const lastWeekTotalCollection = Object.keys(totalCollectionLastWeek)
  .filter((key) => key !== "name") // Remove "name" key
  .map((date) => ({
    date, // Keep date in YYYY-MM-DD format
    // value: invoicesTotalLastWeek[date] || 0, // Use value, default to 0
    // value: totalCollectionLastWeek[date]?.amount || 0, // Use 'amount' field instead of count
    value: (totalCollectionLastWeek[date]?.amount || 0).toFixed(2), // Format amount to 2 decimal places
  }))
  .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort in ascending order

  const lastWeekOutStandingLineChart = Object.keys(totalOutStandingLastWeek)
  .filter((key) => key !== "name") // Remove "name" key
  .map((date) => ({
    date, // Keep date in YYYY-MM-DD format
    // value: invoicesTotalLastWeek[date] || 0, // Use value, default to 0
    value: totalOutStandingLastWeek[date]?.amount || 0, // Use 'amount' field instead of count
    // value: (totalOutStandingLastWeek[date]?.amount).toFixed(2), // Format amount to 2 decimal places
  }))
  .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort in ascending order


  const formatToK = (num) => {
    return num >= 1000 ? `${(num / 1000).toFixed(1)}K` : num; // Convert to K format
  };

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
  
  const paymentModeData = pieChartData?.paymentModeData || {};

  // Convert payment mode data to an array (defaulting to zero values if empty)
  const dataEntries = Object.entries(paymentModeData).map(([key, value]) => ({
    label: `${key}(${value?.count})`, // "PDA", "CASH", "CREDIT"
    value: value?.amount || 0, // Ensure amount is valid
  }));

  // Calculate total sum for percentage calculation (avoid division by zero)
  const totalSum = dataEntries.reduce((acc, item) => acc + item.value, 0) || 1;

  const dataset = topOutStandingBarChart.map((item) => ({
    partyName: item[1],  // Use index 1 for labels
    totalOutstanding: item[4] // Use index 4 for values
  }));
  
  // Value Formatter (optional)
  const valueFormatter = (value) => value.toLocaleString(); 
  // const sampleData = [
  //   { name: "Point 1", value: 0 },
  //   { name: "Point 2", value: 431304.98 },
  //   { name: "Point 3", value: 172997.90 },
  //   { name: "Point 4", value: 13161834.54 },
  //   { name: "Point 5", value: 677883.81 },
  //   { name: "Point 6", value: 1203898.90 },
  //   { name: "Point 7", value: 1753557.81 },
  // ];
  
  
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
    <div style={{ padding: "20px" }}className={styles.dashboardInv}>
      <section className={styles.widgets}>
      <div className={`${styles.widget} ${styles.widgetPrimaryInv}`} >
      <div style={{ display: "flex", gap: "5px",justifyContent:'center'}}>
    <h4>Invoices Generated <FontAwesomeIcon icon={faFileInvoice} className="gauge-icon" /></h4>
  </div>
  <table style={{ marginTop: 0 }} className={styles.table}>
  <thead>
    <tr>
    <th style={{textAlign:'center',color:'#009999'}}>Count <FontAwesomeIcon icon={faFileCirclePlus} /></th>
      <th style={{textAlign:'center',color:'#009999'}}>Amount <FontAwesomeIcon icon={faIndianRupeeSign} /></th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <td style={{ textAlign: "center" }}>{invoicesTotal["totalInvoiceCount"]}</td>
      <td style={{ textAlign: "center" }}>{invoicesTotal["totalAmount"]}</td>
    </tr>
  </tbody>
</table>

  {/* <ResponsiveContainer width="100%" height={50}>
  <LC data={lastWeekTotalInvoicesGeneratedLineChart}>
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
          </LC>
        </ResponsiveContainer> */}
<div
  style={{
    position: "relative",
    width: "100%",
    height: "100px", // Adjust height as needed
    marginTop: "4px",
    zIndex: 1,
  }}
>
  <ResponsiveContainer width="100%" height="100%">
    <LC data={sampleData}>
      <Tooltip content={<CustomTooltip />} cursor={false} />
      <YAxis hide={true} domain={["auto", "auto"]} />
      <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
    </LC>
  </ResponsiveContainer>
</div>



</div>
<div className={`${styles.widget} ${styles.widgetSecondaryInv}`} >
      <div style={{ display: "flex", gap: "5px",justifyContent:'center'}}>
    <h4 >Total Collection <FontAwesomeIcon icon={faMoneyBill} className="gauge-icon" /></h4>
    
  </div>
  <table style={{ marginTop: 0 }} className={styles.table}>
  <thead>
    <tr>
    <th style={{textAlign:'center',color:'#b36b00'}}>Count <FontAwesomeIcon icon={faFileCirclePlus} /></th>
      <th style={{textAlign:'center',color:'#b36b00'}}>Amount <FontAwesomeIcon icon={faIndianRupeeSign} /></th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <td style={{ textAlign: "center" }}>{totalCollection["totalCount"]}</td>
      <td style={{ textAlign: "center" }}>{totalCollection["totalCollection"]}</td>
    </tr>
  </tbody>
</table>

  {/* <ResponsiveContainer width="100%" height={50}>
  <LC data={lastWeekTotalCollection}>
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
          </LC>
        </ResponsiveContainer> */}

<div
    style={{
      position: "relative",
      width: "100%",
      height: "100px", // Adjust height as needed
      marginTop: "5px",
      zIndex: 1,
    }}
  >
    <ResponsiveContainer width="100%" height="100%">
      <LC data={lastWeekTotalCollection}>
        <Tooltip content={<CustomTooltip />} cursor={false} />
   
        <YAxis hide={true}  domain={["auto", "auto"]} />
        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
      </LC>
    </ResponsiveContainer>
  </div>

</div>
<div className={`${styles.widget} ${styles.widgetTertiaryInv}`} >
      <div style={{ display: "flex", gap: "5px",justifyContent:'center'}}>
    <h4 >Total Outstanding <FontAwesomeIcon icon={faSackDollar} className="gauge-icon" /></h4>
    
  </div>
  <table style={{ marginTop: 0 }} className={styles.table}>
  <thead>
    <tr>
      <th style={{textAlign:'center',color:'#196619'}}>Count <FontAwesomeIcon icon={faFileCirclePlus} /></th>
      <th style={{textAlign:'center',color:'#196619'}}>Amount <FontAwesomeIcon icon={faIndianRupeeSign} /></th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <td style={{ textAlign: "center" }}>{totalOutStanding["totalCoOutStanding"]}</td>
      <td style={{ textAlign: "center" }}>{totalOutStanding["totalOutStandingAmount"]}</td>
    </tr>
  </tbody>
</table>

  {/* <ResponsiveContainer width="100%" height={50}>
  <LC data={lastWeekOutStandingLineChart}>
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
          </LC>
        </ResponsiveContainer> */}

<div
    style={{
      position: "relative",
      width: "100%",
      height: "100px", // Adjust height as needed
      marginTop: "5px",
      zIndex: 1,
    }}
  >
    <ResponsiveContainer width="100%" height="100%">
      <LC data={lastWeekOutStandingLineChart}>
        <Tooltip content={<CustomTooltip />} cursor={false} />
   
        <YAxis hide={true}  domain={["auto", "auto"]} />
        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
      </LC>
    </ResponsiveContainer>
  </div>
</div>
      </section>




 <section className={styles.widgetschartInv}>
      <Row>

 <Col md={6}>
  <div className={`${styles.pieChart} ${styles.gradientTwo}`}>
    <h6 style={{textAlign:'center',color:'#990000'}}>PROCESS WISE INVOICES AND COLLECTIONS</h6>
    
    <LineChart
      xAxis={[{ scaleType: 'band', data: [...categories, ...advanceCategory] }]}
      yAxis={[{ valueFormatter: formatToK }]} // Format Y-axis labels in K notation
      series={[
        { data: [...invoiceDetails, null], label: 'Invoices', color: '#8884d8' }, 
        { data: [...collectionDetails, null], label: 'Collections', color: '#82ca9d' }, 
        { data: [...new Array(categories.length).fill(null), advanceMoney[0]], label: 'Advance', color: '#FF5733' }, 
      ]}
      width={500}
      height={300}
      margin={{ right: 72, left: 72 }} // Adjust margins to prevent label cut-off
    />
  </div>
</Col> 

{/* <Col md={6}>
  <div className={`${styles.pieChart} ${styles.gradientTwo}`}>
    <h6 style={{ textAlign: 'center', color: '#990000' }}>
      PROCESS WISE INVOICES AND COLLECTIONS
    </h6>

    <LineChart
      xAxis={[{ scaleType: 'band', data: [...categories, ...advanceCategory] }]}
      // yAxis={[{ valueFormatter: formatToK }]} // Format Y-axis labels in K notation
      series={[
        { data: [...invoiceDetails, null], label: 'Invoices', color: '#8884d8' },
        { data: [...collectionDetails, null], label: 'Collections', color: '#82ca9d' },
        {
          data: [...new Array(categories.length).fill(null), advanceMoney[0]],
          label: 'Advance',
          color: '#FF5733',
        },
      ]}
      width={500}
      height={300}
      margin={{ right: 72, left: 72 }} // Adjust margins to prevent label cut-off
    />
  </div>
</Col> */}


<Col md={6}>
   <div className={`${styles.lineeeeee} ${styles.gradientOnelineeeeee}`}>
<h6 style={{textAlign:'center',color:'#990000'}}>PAYMNET MODE WISE COLLECTION(REPORT)
</h6>


    <PieChart
      series={[
        {
          data: dataEntries,
          label: {
            show: true, // Show labels inside slices
            color: 'white',
          },
          arcLabel: (item) => `${((item.value / totalSum) * 100).toFixed(2)}%`, // Label with name and percentage
          arcLabelMinAngle: 9, // Ensure that small slices don't get labels
          arcLabelRadius: '60%', // Adjust radius of the label
          innerRadius: 36, // Space inside the pie
          outerRadius: 144, // Full arc width
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fontWeight: 'bold', // Customize label styling
          color: 'orange',
        },
      }}
      height={300}
    />
  </div>
</Col>

      </Row>
      </section>






      <section className={styles.widgetschartTopTen}>
<Row>

{/* <Col md={12}>
  <div className={`${styles.pieChart} ${styles.gradientTwo}`}>
  <h6 style={{textAlign:'center',color:'#990000'}}>PARTY WISE OUTSTANDING 
</h6>
  <BarChart
    dataset={dataset}
    yAxis={[{ scaleType: 'band', dataKey: 'partyName' }]}  // Use 'partyName' for labels
    series={[{ dataKey: 'totalOutstanding', label: 'Total Outstanding', valueFormatter }]}
    layout="horizontal"
    width={500}
    height={300}
    margin={{right: 100, left: 100 }} // ✅ Adjust margins to prevent label cut-off
  />
  </div>
</Col> */}
<Col md={12}>
  <div className={`${styles.horTopTen} ${styles.gradientTwo}`}>
    <h6 style={{ textAlign: 'center', color: '#990000' }}>PARTY WISE OUTSTANDING</h6>
    <BarChart
      dataset={dataset}
      yAxis={[
        { 
          scaleType: 'band', 
          dataKey: 'partyName', 
          tickLabelProps: () => ({
            textAnchor: 'end',  // Align text properly
            angle: -45,         // Rotate labels for longer text
            fontSize: 12,       // Reduce font size for better fit
            width: 270,         // Allow text to fit
            wordWrap: 'break-word' // Wrap long words
          })
        }
      ]}
      series={[{ dataKey: 'totalOutstanding', label: 'Total Outstanding', valueFormatter }]}
      layout="horizontal"
      width={900} // Increased width for more space
      height={300} // Increased height for better spacing
      margin={{ left: 360 }} // ✅ Increased left margin to fit labels
    />
  </div>
</Col>


</Row>
</section>
    </div>

    </>
  );
};
export default InvoicesDashBoard;