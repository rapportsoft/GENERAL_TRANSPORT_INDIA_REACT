import { faBatteryEmpty, faBoxesStacked, faCalendarAlt, faDownload, faEye, faFerry, faFileExcel, faHourglass, faHourglassStart, faOtter, faOutdent, faPortrait, faRefresh, faShip, faStopwatch, faStore, faTruck, faTruckRampBox, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, FormGroup, Row, Table } from 'reactstrap';
import AuthContext from '../Components/AuthProvider';
import useAxios from '../Components/useAxios';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import ipaddress from '../Components/IpAddress';
import { format } from 'date-fns';
import moment from 'moment';
import { Pagination } from "react-bootstrap"
import { Today } from '@mui/icons-material';
export default function MovementSummeryReport() {

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
  
    const currentDate = new Date();
    currentDate.setHours(8, 0, 0, 0);
    const [startDate ,setStartDate] =useState(
      currentDate
    );

    const [endDate ,setEndDate] =useState(new Date());
    const [dateRange, setDateRange] = useState("Today");
    const prevDateRangeRef = useRef();


   
    

    useEffect(() => {
        const currentDate = new Date();

        if (dateRange === "Today") {
          // Set to current date with time 08:00
          currentDate.setHours(8, 0, 0, 0);
          setStartDate(currentDate);
          setEndDate(new Date()); // End date is also set to the current date at 08:00
        } else if (dateRange === "Daily") {
          // Set to yesterday's date with time 08:00 for start date
          const startDateCopy = new Date(currentDate); // Create a new date object for start date
          startDateCopy.setDate(startDateCopy.getDate() - 1); // Subtract 1 day for start date
          startDateCopy.setHours(8, 0, 0, 0); // Set time to 08:00 for start date
          setStartDate(startDateCopy);
      
          // Set to current date with time 08:00 for end date
          currentDate.setHours(8, 0, 0, 0); // Set time to 08:00 for end date
          setEndDate(currentDate); // Set the current date for the end date
        }else {
            setEndDate(new Date());
        }
      }, [dateRange]); // Trigger when `dateRange` changes
      

      
    const handleStartDateChange = (date) => {
        setStartDate(date);
      };
    
      // Handler for end date change
      const handleEndDateChange = (date) => {
        setEndDate(date);
      };




      const [inventoryList ,setInventoryList]=useState([]);
      const [loadedInventoryList ,setLoadedInventoryList]=useState([]);
      const [importInventoryList ,setImportInventoryList]=useState([]);
      const [deliveryOrderData ,setDeliveryOrderData]=useState([]);
      const [exportData,setExportData] = useState([]);
      const [cfsBonding,setCfsBonding] = useState([]);
      const [portWisePendency,setPortWisePendency] = useState([]);

      const [nocCount, setNocCount] = useState(0);
const [inbondCount, setInbondCount] = useState(0);
const [exbondCount, setExbondCount] = useState(0);
const [nocSum, setNocSum] = useState(0);
const [inbondSum, setInbondSum] = useState(0);
const [exbondSum, setExbondSum] = useState(0);




      

      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage] = useState(10);
    
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = inventoryList.slice(indexOfFirstItem, indexOfLastItem);
      const totalPages = Math.ceil(inventoryList.length / itemsPerPage);
    
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




      // const handleExleDownload = async (type) => {
      //   try {
      //       setLoading(true);
      //     let exBondingId = "EXBL000045";
      //     if (! endDate)
      //     {
      //       toast.warn("Please select end date...",{
      //         position:'top-center'
      //       })
      //       return ;
      //     }
      //     console.log("type :",type);
      //     const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DD HH:mm') : '';
      //     const formattedEndDate = moment(endDate).format('YYYY-MM-DD HH:mm');

      //     console.log("formattedStartDate",formattedStartDate);
      //     console.log("formattedEndDate",formattedEndDate);
        
      //     const response = await axios.get(
      //       `${ipaddress}api/bondingReport/cBondcargoInventoryReport?companyId=${companyid}&branchId=${branchId}&uname=${username}&type=${type}&cname=${companyname}&bname=${branchname}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
      //       {
      //         headers: {
      //           Authorization: `Bearer ${jwtToken}`
      //         },
      //         responseType: 'blob' // Make sure the response type is set to blob
      //       }
      //     );
      
      //     // Create a URL for the file and trigger the download
      //     const url = window.URL.createObjectURL(new Blob([response.data]));
      //     const a = document.createElement('a');
      //     a.href = url;
      //     a.download = `BondInvetoryReport_${exBondingId}.xlsx`;
      //     document.body.appendChild(a);
      //     a.click();
      //     document.body.removeChild(a);
      
      //     // Optionally, revoke the Object URL to free up resources
      //     window.URL.revokeObjectURL(url);
      
      //     // Success toast notification
      //     toast.success('Excel file downloaded successfully!', { autoClose: 900 });
      //   } catch (error) {
      //     console.error('Error downloading Excel file:', error);
      
      //     // Error toast notification
      //     toast.error('Failed to download Excel file. Please try again.', { autoClose: 900 });
      //   }finally{
      //       setLoading(false);
      //   }
      // };




      const handleExportExleDownload = async (selectedReport) => {
        try {
          setLoading(true);
  
        const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DD HH:mm') : '';
        const formattedEndDate= endDate ? moment(endDate).format('YYYY-MM-DD HH:mm') : '';
        if (!selectedReport) {
          toast.error('Please select a report.');
          setLoading(false); // Ensure the loading state is reset
          return;
        }
    
        console.log(selectedReport);
        console.log(formattedStartDate);
        console.log(formattedEndDate);
       
          const response = await axios.get(
            `${ipaddress}api/exportOperationalReports/getExportOperationalReport?companyId=${companyid}&branchId=${branchId}&uname=${username}&cname=${companyname}&bname=${branchname}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&selectedReport=${selectedReport}`,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`
              },
              responseType: 'blob' // Make sure the response type is set to blob
            }
          );
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement('a');
          a.href = url;
          a.download = `${selectedReport}.xlsx`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
      
          // Optionally, revoke the Object URL to free up resources
          window.URL.revokeObjectURL(url);
      
          // Success toast notification
          toast.success('Excel file downloaded successfully!', { autoClose: 900 });
          
        } catch (error) {
          console.error('Error downloading Excel file:', error);
      
          // Error toast notification
          toast.error('Failed to download Excel file. Please try again.', { autoClose: 900 });
        }finally{
          setLoading(false);
        }
      };

      const handleExleDownload = async (selectedReport) => {
        try {
          setLoading(true);
  
        const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DD HH:mm') : '';
        const formattedEndDate= endDate ? moment(endDate).format('YYYY-MM-DD HH:mm') : '';
        if (!selectedReport) {
          toast.error('Please select a report.');
          setLoading(false); // Ensure the loading state is reset
          return;
        }
    
        console.log(selectedReport);
        console.log(formattedStartDate);
        console.log(formattedEndDate);
       
          const response = await axios.get(
            `${ipaddress}api/importReports/getImportGateInContainerDetailedReport?companyId=${companyid}&branchId=${branchId}&uname=${username}&cname=${companyname}&bname=${branchname}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&selectedReport=${selectedReport}`,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`
              },
              responseType: 'blob' // Make sure the response type is set to blob
            }
          );
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement('a');
          a.href = url;
          a.download = `${selectedReport}.xlsx`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
      
          // Optionally, revoke the Object URL to free up resources
          window.URL.revokeObjectURL(url);
      
          // Success toast notification
          toast.success('Excel file downloaded successfully!', { autoClose: 900 });
          
        } catch (error) {
          console.error('Error downloading Excel file:', error);
      
          // Error toast notification
          toast.error('Failed to download Excel file. Please try again.', { autoClose: 900 });
        }finally{
          setLoading(false);
        }
      };

      const handlePortWiseExleDownload = async (selectedReport) => {
        try {
          setLoading(true);
  
        const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DD HH:mm') : '';
        const formattedEndDate= endDate ? moment(endDate).format('YYYY-MM-DD HH:mm') : '';
        if (!selectedReport) {
          toast.error('Please select a report.');
          setLoading(false); // Ensure the loading state is reset
          return;
        }
    
        console.log(selectedReport);
        console.log(formattedStartDate);
        console.log(formattedEndDate);
       
          const response = await axios.get(
            `${ipaddress}api/commonReports/getPortWisePendencyReport?companyId=${companyid}&branchId=${branchId}&uname=${username}&cname=${companyname}&bname=${branchname}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&selectedReport=${selectedReport}`,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`
              },
              responseType: 'blob' // Make sure the response type is set to blob
            }
          );
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement('a');
          a.href = url;
          a.download = `${selectedReport}.xlsx`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
      
          // Optionally, revoke the Object URL to free up resources
          window.URL.revokeObjectURL(url);
      
          // Success toast notification
          toast.success('Excel file downloaded successfully!', { autoClose: 900 });
          
        } catch (error) {
          console.error('Error downloading Excel file:', error);
      
          // Error toast notification
          toast.error('Failed to download Excel file. Please try again.', { autoClose: 900 });
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
            console.log("LOaded data :",data);
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
    const handleMTYData = async (formattedStartDate,formattedEndDate) => {
      try {
         
          const response = await axios.get(
              `${ipaddress}api/commonReports/getMTYData?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
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
  
              setImportInventoryList(inventoryArray);
          } else {
              // If already an array, directly set it
              setImportInventoryList(data);
          }
  
      } catch (error) {
         
      }
  };

  const handleDeliveryOrderData = async (formattedStartDate,formattedEndDate) => {
    try {
      
        const response = await axios.get(
            `${ipaddress}api/commonReports/getDataForDeliveryReport?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
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

            setDeliveryOrderData(inventoryArray);
        } else {
            // If already an array, directly set it
            setDeliveryOrderData(data);
        }

    } catch (error) {
       
    }
};

const handleExportData = async (formattedStartDate,formattedEndDate) => {
  try {
      
      const response = await axios.get(
          `${ipaddress}api/commonReports/getDataForExportSection?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
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

          setExportData(inventoryArray);
      } else {
          // If already an array, directly set it
          setExportData(data);
      }

  } catch (error) {
     
  }
};

const handleCFSBondingData = async (formattedStartDate,formattedEndDate) => {
  try {
     
      const response = await axios.get(
          `${ipaddress}api/commonReports/getCFSBondingData?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
          {
              headers: {
                  Authorization: `Bearer ${jwtToken}`
              }
          }
      );
      const data = response.data;
      const {noc } =response.data

      console.log("data cfs bonding :",data.noc.nocCount);
      setNocCount(data.noc.nocCount);
      setNocSum(data.noc.dutysum);

      setInbondCount(data.inbond.nocCount);
      setInbondSum(data.inbond.dutysum);

      setExbondCount(data.exbond.nocCount);
      setExbondSum(data.exbond.dutysum);
      


      console.log("data cfs bonding noc sum :",data.noc.dutysum);
      if (data && typeof data === 'object' && !Array.isArray(data)) {
          // Convert object to an array with both keys and values
          const inventoryArray = Object.entries(data).map(([key, value]) => ({
              name: key, // Key becomes the name (e.g., "JOB ORDER")
              ...value   // Spread the value (which is another object)
          }));

          setCfsBonding(inventoryArray);
      } else {
          // If already an array, directly set it
          setCfsBonding(data);
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
      console.log('setPortWisePendency :',data);
      if (data && typeof data === 'object' && !Array.isArray(data)) {
          // Convert object to an array with both keys and values
          const inventoryArray = Object.entries(data).map(([key, value]) => ({
              name: key, // Key becomes the name (e.g., "JOB ORDER")
              ...value   // Spread the value (which is another object)
          }));

          setPortWisePendency(inventoryArray);
      } else {
          // If already an array, directly set it
          setPortWisePendency(data);
      }

  } catch (error) {
     
  }
};






const handleInBondExleDownload = async (type) => {
  try {
    setLoading(true);

    console.log("end date in inbond :" , endDate);
    const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DD HH:mm') : '';
    // const formattedEndDate = moment(endDate).format('YYYY-MM-DD HH:mm');
    const formattedEndDate= endDate ? moment(endDate).format('YYYY-MM-DD HH:mm') : '';
    const response = await axios.get(
      `${ipaddress}api/bondingReport/bondDepositRegister?companyId=${companyid}&branchId=${branchId}&uname=${username}&type=${type}&cname=${companyname}&bname=${branchname}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        responseType: 'blob' // Make sure the response type is set to blob
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = `InBondDepositRegister.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Optionally, revoke the Object URL to free up resources
    window.URL.revokeObjectURL(url);

    // Success toast notification
    toast.success('Excel file downloaded successfully!', { autoClose: 900 });
  } catch (error) {
    console.error('Error downloading Excel file:', error);

    // Error toast notification
    toast.error('Failed to download Excel file. Please try again.', { autoClose: 900 });
  }finally{
    setLoading(false);
  }
};

const handleExBondExleDownload = async (type) => {
  try {
    setLoading(true);
    if (!startDate && !endDate) {
      toast.error('Please enter both start date and end date.'); // Show toast if any date is missing
      return;
  }
    const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DD HH:mm') : '';
    // const formattedEndDate = moment(endDate).format('YYYY-MM-DD HH:mm');
    const formattedEndDate= endDate ? moment(endDate).format('YYYY-MM-DD HH:mm') : '';
    const response = await axios.get(
      `${ipaddress}api/bondingReport/bondDeliveryRegister?companyId=${companyid}&branchId=${branchId}&uname=${username}&type=${type}&cname=${companyname}&bname=${branchname}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        responseType: 'blob' // Make sure the response type is set to blob
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = `ExBondDepositRegister.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Optionally, revoke the Object URL to free up resources
    window.URL.revokeObjectURL(url);

    // Success toast notification
    toast.success('Excel file downloaded successfully!', { autoClose: 900 });
  } catch (error) {
    console.error('Error downloading Excel file:', error);

    // Error toast notification
    toast.error('Failed to download Excel file. Please try again.', { autoClose: 900 });
  }finally{
    setLoading(false);
  }
};

const handleNocBondExleDownload = async (type) => {
  try {
    setLoading(true);
    if (!startDate && !endDate) {
      toast.error('Please enter both start date and end date.'); // Show toast if any date is missing
      return;
  }
    const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DD HH:mm') : '';
    // const formattedEndDate = moment(endDate).format('YYYY-MM-DD HH:mm');
    const formattedEndDate= endDate ? moment(endDate).format('YYYY-MM-DD HH:mm') : '';
    const response = await axios.get(
      `${ipaddress}api/bondingReport/nocRegister?companyId=${companyid}&branchId=${branchId}&uname=${username}&type=${type}&cname=${companyname}&bname=${branchname}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        responseType: 'blob' // Make sure the response type is set to blob
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = `NocDepositRegister.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Optionally, revoke the Object URL to free up resources
    window.URL.revokeObjectURL(url);

    // Success toast notification
    toast.success('Excel file downloaded successfully!', { autoClose: 900 });
  } catch (error) {
    console.error('Error downloading Excel file:', error);

    // Error toast notification
    toast.error('Failed to download Excel file. Please try again.', { autoClose: 900 });
  }finally{
    setLoading(false);
  }
};
      const handleShow = async (startDate,endDate) => {
        setLoading(true);

        console.log("endDate :",endDate);
        try {
            if (!endDate) {
                toast.warn("Please select end date...", {
                    position: 'top-center'
                });
                return;
            }
    
            const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DD HH:mm') : '';
            const formattedEndDate = endDate ? moment(endDate).format('YYYY-MM-DD HH:mm') : '';
    
            const response = await axios.get(
                `${ipaddress}api/commonReports/getJoGateIn?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                }
            );
    
            const data = response.data;
            console.log("Data received:", data);

            handleLoadedInventoryReport(formattedStartDate,formattedEndDate);
            handleMTYData(formattedStartDate,formattedEndDate);
            handleDeliveryOrderData(formattedStartDate,formattedEndDate);
            handleExportData(formattedStartDate,formattedEndDate);
            handlePortWisePendency(formattedStartDate,formattedEndDate);
            handleCFSBondingData(formattedStartDate,formattedEndDate);
            if (data && typeof data === 'object' && !Array.isArray(data)) {
                // Convert object to an array with both keys and values
                const inventoryArray = Object.entries(data).map(([key, value]) => ({
                    name: key, // Key becomes the name (e.g., "JOB ORDER")
                    ...value   // Spread the value (which is another object)
                }));
    
                setInventoryList(inventoryArray);
            } else {
                // If already an array, directly set it
                setInventoryList(data);
            }
    
            console.log("Inventory List:", inventoryList);
    
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error("Error fetching data. Please try again.", {
                position: 'top-center'
            });
        }finally{
          setLoading(false);
        }
    };


    useEffect(()=>{
        handleShow(startDate,endDate);
    },[])

    // useEffect(()=>{
    //   if (dateRange === "Today"  ) {
    //     handleShow();
    //   }
    // },[])
    // useEffect(()=>{
    //   if (dateRange === "Daily" ) {
    //     handleShow();
    //   }
    // },[])
    // useEffect(()=>{
    //   if (dateRange === "Custom"  ) {
    //     handleShow();
    //   }
    // },[])

    
const handleClear =()=>{
  // setInventoryList([]);
  setDateRange("Today");
//   setStartDate(null);
  setEndDate(new Date());
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
      <Row>
      <Col md={3} style={{ paddingTop: 22 }}>
  <FormGroup>
    <div className="d-flex justify-content-start">
      <div className="form-check" style={{ marginRight: '18px' }}>
        <input
          type="radio"
          id="todayRadio"
          name="dateRange"
          className="form-check-input"
          style={{
            transform: 'scale(1.5)', // Increase size of radio button
            border: '2px solid #6c757d', // Add border to radio button
            borderRadius: '50%', // Make sure border is around the circle
            padding: '5px', // Ensure padding around the radio button
          }}
          checked={dateRange === "Today"}
          onChange={() => { 
            setDateRange("Today")
            const currentDate = new Date();
            currentDate.setHours(8, 0, 0, 0);

            handleShow(currentDate,endDate)
          }
        
      }
        />
        <label className="form-check-label" htmlFor="todayRadio" style={{ fontSize: '14px' }}>
          Today
        </label>
      </div>

      <div className="form-check" style={{ marginRight: '18px' }}>
        <input
          type="radio"
          id="dailyRadio"
          name="dateRange"
          className="form-check-input"
          style={{
            transform: 'scale(1.5)', // Increase size of radio button
            border: '2px solid #6c757d', // Add border to radio button
            borderRadius: '50%', // Make sure border is around the circle
            padding: '5px', // Ensure padding around the radio button
          }}
          checked={dateRange === "Daily"}
          onChange={() => {setDateRange("Daily")
  
          const startDateCopy = new Date(currentDate); // Create a new date object for start date
          startDateCopy.setDate(startDateCopy.getDate() - 1); // Subtract 1 day for start date
          startDateCopy.setHours(8, 0, 0, 0); // Set time to 08:00 for start date
          setStartDate(startDateCopy);

          handleShow(startDateCopy,currentDate)
        }}
        />
        <label className="form-check-label" htmlFor="dailyRadio" style={{ fontSize: '14px' }}>
          Daily
        </label>
      </div>

      <div className="form-check">
        <input
          type="radio"
          id="customRadio"
          name="dateRange"
          className="form-check-input"
          style={{
            transform: 'scale(1.5)', // Increase size of radio button
            border: '2px solid #6c757d', // Add border to radio button
            borderRadius: '50%', // Make sure border is around the circle
            padding: '5px', // Ensure padding around the radio button
          }}
          checked={dateRange === "Custom"}
          onChange={() => {setDateRange("Custom")

          const startDateCopy = new Date(currentDate); // Create a new date object for start date
          startDateCopy.setDate(startDateCopy.getDate() - 1); // Subtract 1 day for start date
          startDateCopy.setHours(8, 0, 0, 0); // Set time to 08:00 for start date
          setStartDate(startDateCopy);

          handleShow(startDateCopy, new Date());
        }
        }
        />
        <label className="form-check-label" htmlFor="customRadio" style={{ fontSize: '14px' }}>
          Custom
        </label>
      </div>
    </div>
  </FormGroup>
</Col>



      <Col md={2}>
        <FormGroup>
          <label className="forlabel bold-label" htmlFor="inGateInDate">
            Start Date
          </label>
          <div style={{ position: "relative" }}>

             <div>
                      <DatePicker
                       
                        wrapperClassName="custom-react-datepicker-wrapper"
                        className="form-control"
                        selected={startDate}
                        disabled={dateRange === "Today" || dateRange === "Daily"}

                       id="startDate"
                       name='startDate'
                        onChange={handleStartDateChange}
                        timeInputLabel="Time:"
                        dateFormat="dd/MM/yyyy HH:mm" // 24-hour format for date and time
                        showTimeInput
                        timeFormat="HH:mm" // Display time in 24-hour format
                      />
                    </div>
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
          <label className="forlabel bold-label" htmlFor="outGateInDate">
            End Date
          </label>
          <div style={{ position: "relative" }}>
<div>
                      <DatePicker
                        id="endDate"
                        name='endDate'
                        wrapperClassName="custom-react-datepicker-wrapper"
                        className="form-control"
                        selected={endDate}
                        disabled={dateRange === "Today" || dateRange === "Daily"}
                        onChange={handleEndDateChange}
                        timeInputLabel="Time:"
                        dateFormat="dd/MM/yyyy HH:mm"
                        showTimeInput
                      />
                    </div>
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

      <Col md={4} style={{ paddingTop: 22 ,
               
            }}>

      <button
                className="btn btn-outline-success btn-margin newButton"
                id="submitbtn2"
                style={{ fontSize: 11, marginRight: 5 }}
                onClick={()=> handleShow(startDate,endDate) }

            >
              <FontAwesomeIcon icon={faEye} style={{ marginRight: "4px" }} />
              Show
            </button>

            



            <button
                className="btn btn-outline-danger btn-margin newButton"
                id="submitbtn2"
                style={{ fontSize: 11, marginRight: 5 }}
                onClick={handleClear }

            >
              <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "4px" }} />
              Clear
            </button>

        </Col>
    </Row>


      </div>

      <Row style={{marginTop:18}}>
<Col md={4}>
  {/* className="table-responsive" */}
  <div 
   style={{ 
    boxShadow: "0 8px 16px rgba(3, 39, 38, 0.8)", // Exact shadow you requested
  }}
>
  <table className="table table-bordered table-hover tableHeader">
      <thead>
        <tr>
          <th colSpan="6" style={{ textAlign: "center",fontSize: "18px" }}>
          {" "}
                          <FontAwesomeIcon
                            icon={faTruckRampBox}
                            style={{ marginRight: 4 }}
                          />{" "}
            Delivery Report
          </th>
        </tr>
        <tr>
          <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}></th>
          <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>20</th>
          <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}> 40</th>
                               <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}> Total</th>
          <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>Tues</th>
                           <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>Excel</th>
                          
        </tr>
      </thead>
      <tbody>
        {deliveryOrderData.length > 0 ? (
          deliveryOrderData.map((item, index) => (
            <tr key={index}>
              <td style={{textAlign:'center'}}>{item.name}</td> {/* Replace with the actual field name */}
              <td style={{textAlign:'center'}}>{item["20"] || 0}</td> {/* Replace with the correct key for "20" count */}
              <td style={{textAlign:'center'}}>{item["40"] || 0}</td> {/* Replace with the correct key for "40" count */}
              <td style={{textAlign:'center'}}>{item["total"] || 0}</td> {/* Replace with the correct key for "40" count */}
              <td style={{textAlign:'center'}}>{item["Tues"] || 0}</td> {/* Replace with the correct key for "Tues" count */}
              <td style={{ textAlign: 'center' }}>
            {/* Download icon for each row */}
            <FontAwesomeIcon 
              icon={faFileExcel} 
              style={{ cursor: 'pointer', fontSize: '18px', color: '#1c6c9b' }} 
              onClick={() => handleExleDownload(item.name)} 
            />
          </td>
            </tr>
          ))
        ) : (
          <>
          </>
        )}
      </tbody>
    </table>
</div>

  </Col>
  <Col md={4}>
  {/* className="table-responsive" */}
  <div 
   style={{ 
    boxShadow: "0 8px 16px rgba(3, 39, 38, 0.8)", // Exact shadow you requested
  }}
>
  <table className="table table-bordered table-hover tableHeader">
      <thead>
        <tr>
          <th colSpan="6" style={{ textAlign: "center",fontSize: "18px" }}>
          {" "}
                          <FontAwesomeIcon
                            icon={faOutdent}
                            style={{ marginRight: 4 }}
                          />{" "}
            Export Report
          </th>
        </tr>
        <tr>
          <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}></th>
          <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>20</th>
          <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}> 40</th>
                               <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}> Total</th>
          <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>Tues</th>
                           <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>Excel</th>
                          
        </tr>
      </thead>
      <tbody>
        {exportData.length > 0 ? (
          exportData.map((item, index) => (
            <tr key={index}>
              <td style={{textAlign:'center'}}>{item.name}</td> {/* Replace with the actual field name */}
              <td style={{textAlign:'center'}}>{item["20"] || 0}</td> {/* Replace with the correct key for "20" count */}
              <td style={{textAlign:'center'}}>{item["40"] || 0}</td> {/* Replace with the correct key for "40" count */}
              <td style={{textAlign:'center'}}>{item["total"] || 0}</td> {/* Replace with the correct key for "40" count */}
              <td style={{textAlign:'center'}}>{item["Tues"] || 0}</td> {/* Replace with the correct key for "Tues" count */}
              <td style={{ textAlign: 'center' }}>
            {/* Download icon for each row */}
            <FontAwesomeIcon 
              icon={faFileExcel} 
              style={{ cursor: 'pointer', fontSize: '18px', color: '#1c6c9b' }} 
              onClick={() => handleExportExleDownload(item.name)} 
            />
          </td>
            </tr>
          ))
        ) : (
          <>
          </>
        )}
      </tbody>
    </table>
</div>

  </Col>


  <Col md={4}>
  {/* <ui> */}
  <ui style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
    <li>
    <div 
   style={{ 
    boxShadow: "0 8px 16px rgba(3, 39, 38, 0.8)", // Exact shadow you requested
  }}
>

  <table className="table table-bordered table-hover tableHeader">
      <thead>
        <tr>
          <th colSpan="6" style={{ textAlign: "center",fontSize: "18px" }}>
          {" "}
                          <FontAwesomeIcon
                            icon={faBoxesStacked}
                            style={{ marginRight: 4 }}
                          />{" "}
           Inventory MTY Report
          </th>
        </tr>
        <tr>
          <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}></th>
          <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>20</th>
          <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}> 40</th>
                               <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}> Total</th>
          <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>Tues</th>
                           <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>Excel</th>
                          
        </tr>
      </thead>
      <tbody>
        {importInventoryList.length > 0 ? (
          importInventoryList.map((item, index) => (
            <tr key={index}>
              <td style={{textAlign:'center'}}>{item.name}</td> {/* Replace with the actual field name */}
              <td style={{textAlign:'center'}}>{item["20"] || 0}</td> {/* Replace with the correct key for "20" count */}
              <td style={{textAlign:'center'}}>{item["40"] || 0}</td> {/* Replace with the correct key for "40" count */}
              <td style={{textAlign:'center'}}>{item["total"] || 0}</td> {/* Replace with the correct key for "40" count */}
              <td style={{textAlign:'center'}}>{item["Tues"] || 0}</td> {/* Replace with the correct key for "Tues" count */}
              <td style={{ textAlign: 'center' }}>
            {/* Download icon for each row */}
            <FontAwesomeIcon 
              icon={faFileExcel} 
              style={{ cursor: 'pointer', fontSize: '18px', color: '#1c6c9b' }} 
              onClick={() => handleExleDownload(item.name)} 
            />
          </td>
            </tr>
          ))
        ) : (
          <>
          </>
        )}
      </tbody>
    </table>
</div>
    </li>
    <li>
    <div 
   style={{ 
    boxShadow: "0 8px 16px rgba(3, 39, 38, 0.8)", // Exact shadow you requested
  }}
>

  <table className="table table-bordered table-hover tableHeader">
      <thead>
        <tr>
          <th colSpan="6" style={{ textAlign: "center",fontSize: "18px" }}>
          {" "}
                          {/* <FontAwesomeIcon
                            icon={faWarehouse,faHourglassStart}
                            style={{ marginRight: 4 }}
                          />{" "} */}
                          <div>
      <FontAwesomeIcon 
        icon={faWarehouse} 
        style={{ marginRight: 4 }} 
      />
      <FontAwesomeIcon 
        icon={faStopwatch} 
        style={{ marginRight: 4 }} 
      />{" "}
      Long Standing Cargo Details
     {/* Long Standing Cargo Details(Special Format) */}
    </div>
           

          </th>
        </tr>
        <tr>
          <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>
                            FCL LOADED BALANCE
                          </th>
          {/* <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>LDD INVENTORY</th> */}
          <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}> LCL BALANCE INVENTORY</th>
                               {/* <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>LC-CST</th> */}

                          
        </tr>
      </thead>
      <tbody>

            <tr >
            <td style={{ textAlign: 'center' }}>
          {/* Button 1 */}
          <button 
            style={{ background: 'none', border: 'none', cursor: 'pointer' }} 
            onClick={() => handleExleDownload("FCL LOADED BALANCE")}
          >
            <FontAwesomeIcon icon={faFileExcel} style={{ fontSize: '18px', color: '#1c6c9b' }} />
            
          </button>
          <br />
         
        </td>

        {/* <td style={{ textAlign: 'center' }}>

          <button 
            style={{ background: 'none', border: 'none', cursor: 'pointer' }} 
            onClick={() => handleExleDownload("FCL LOADED BALANCE")}
          >
            <FontAwesomeIcon icon={faFileExcel} style={{ fontSize: '18px', color: '#1c6c9b' }} />
            
          </button>
      
        </td> */}
        <td style={{ textAlign: 'center' }}>

          <button 
            style={{ background: 'none', border: 'none', cursor: 'pointer' }} 
            onClick={() => handleExleDownload("LCL Cargo Balance Inventory Report")}
          >
            <FontAwesomeIcon icon={faFileExcel} style={{ fontSize: '18px', color: '#1c6c9b' }} />
           
          </button>
          <br />

     
        </td>
        {/* <td style={{ textAlign: 'center' }}>

          <button 
            style={{ background: 'none', border: 'none', cursor: 'pointer' }} 
            onClick={() => handleExleDownload("LC-CST")}
          >
            <FontAwesomeIcon icon={faFileExcel} style={{ fontSize: '18px', color: '#1c6c9b' }} />
          
          </button>
          <br />

        </td> */}
            </tr>

      </tbody>
    </table>
</div>
    </li>
   
  </ui>


  </Col> 

</Row>

      <Row style={{marginTop:1}}>
  <Col md={4}>
  <div 
   style={{ 
    boxShadow: "0 8px 16px rgba(3, 39, 38, 0.8)", // Exact shadow you requested
  }}
>
  <table className="table table-bordered table-hover tableHeader">
      <thead>
        <tr>
          <th colSpan="6" style={{ textAlign: "center",fontSize: "18px" }}>
          {" "}
                          <FontAwesomeIcon
                            icon={faTruck}
                            style={{ marginRight: 4 }}
                          />{" "}
            JO/Gate In Report
          </th>
        </tr>
        <tr>
          <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}></th>
          <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>20</th>
          <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}> 40</th>
                               <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}> Total</th>
          <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>Tues</th>
                           <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>Excel</th>
                          
        </tr>
      </thead>
      <tbody>
        {inventoryList.length > 0 ? (
          inventoryList.map((item, index) => (
            <tr key={index}>
              <td style={{textAlign:'center'}}>{item.name}</td> {/* Replace with the actual field name */}
              <td style={{textAlign:'center'}}>{item["20"] || 0}</td> {/* Replace with the correct key for "20" count */}
              <td style={{textAlign:'center'}}>{item["40"] || 0}</td> {/* Replace with the correct key for "40" count */}
              <td style={{textAlign:'center'}}>{item["total"] || 0}</td> {/* Replace with the correct key for "40" count */}
              <td style={{textAlign:'center'}}>{item["Tues"] || 0}</td> {/* Replace with the correct key for "Tues" count */}
              <td style={{ textAlign: 'center' }}>
            {/* Download icon for each row */}
            <FontAwesomeIcon 
              icon={faFileExcel} 
              style={{ cursor: 'pointer', fontSize: '18px', color: '#1c6c9b' }} 
              onClick={() => handleExleDownload(item.name)} 
            />
          </td>
            </tr>
          ))
        ) : (
          <>
          </>
        )}
      </tbody>
    </table>
</div>

  </Col>

  <Col md={4}>
<div 
   style={{ 
    boxShadow: "0 8px 16px rgba(3, 39, 38, 0.8)", // Exact shadow you requested
  }}
>
  <table className="table table-bordered table-hover tableHeader">
      <thead>
        <tr>
          <th colSpan="6" style={{ textAlign: "center",fontSize: "18px" }}>
          {" "}
                          <FontAwesomeIcon
                            icon={faStore}
                            style={{ marginRight: 4 }}
                          />{" "}
            Inventory Loaded Report
          </th>
        </tr>
        <tr>
          <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}></th>
          <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>20</th>
          <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}> 40</th>
                               <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}> Total</th>
          <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>Tues</th>
                           <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>Excel</th>
                          
        </tr>
      </thead>
      {/* <tbody>
        {loadedInventoryList.length > 0 ? (
          loadedInventoryList.map((item, index) => (
            <tr key={index}>
              <td style={{textAlign:'center'}}>{item.name}</td> 
              <td style={{textAlign:'center'}}>{item["20"] || 0}</td> 
              <td style={{textAlign:'center'}}>{item["40"] || 0}</td> 
              <td style={{textAlign:'center'}}>{item["total"] || 0}</td> 
              <td style={{textAlign:'center'}}>{item["Tues"] || 0}</td> 
              <td style={{ textAlign: 'center' }}>
            <FontAwesomeIcon 
              icon={faFileExcel} 
              style={{ cursor: 'pointer', fontSize: '18px', color: '#1c6c9b' }} 
              onClick={() => handleExleDownload(item.name)} 
            />
          </td>
            </tr>
          ))
        ) : (
          <>
          </>
        )}
      </tbody> */}
      <tbody>
  {loadedInventoryList.length > 0 ? (
    [...loadedInventoryList]
      .sort((a, b) => (a.name === "Total" ? 1 : b.name === "Total" ? -1 : 0)) // Moves "Total" to the end
      .map((item, index) => (
        <tr key={index}>
             <td style={{textAlign:'center'}}>{item.name}</td> 
              <td style={{textAlign:'center'}}>{item["20"] || 0}</td> 
              <td style={{textAlign:'center'}}>{item["40"] || 0}</td> 
              <td style={{textAlign:'center'}}>{item["total"] || 0}</td> 
              <td style={{textAlign:'center'}}>{item["Tues"] || 0}</td> 
          <td style={{ textAlign: "center" }}>
            <FontAwesomeIcon
              icon={faFileExcel}
              style={{ cursor: "pointer", fontSize: "18px", color: "#1c6c9b" }}
              onClick={() => handleExleDownload(item.name)}
            />
          </td>
        </tr>
      ))
  ) : (
    <></>
  )}
</tbody>

    </table>
</div>
</Col>
  <Col md={4}>
  <ui style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
  <li>

<div 
// className='table-responsive'
style={{ 
boxShadow: "0 8px 16px rgba(3, 39, 38, 0.8)",
}}
>

<table className="table table-bordered table-hover tableHeader ">
  <thead>
    <tr>
      <th colSpan="6" style={{ textAlign: "center", fontSize: "18px" }}>
        <div>
          <FontAwesomeIcon 
            icon={faWarehouse} 
            style={{ marginRight: 4 }} 
          />
          CFS Bonding
        </div>
      </th>
    </tr>
    <tr>
      <th colSpan={2} style={{
            background: "#1c6c9b",
            color: "orange",
            textAlign: "center",
          }}>NOC
           <FontAwesomeIcon 
              icon={faFileExcel} 
              style={{ cursor: 'pointer', fontSize: '18px', color: 'orange',marginLeft:'4px' }} 
              onClick={() => handleNocBondExleDownload("type")} 
            />
            </th>
      <th colSpan={2} style={{
            background: "#1c6c9b",
            color: "orange",
            textAlign: "center",
          }}>INBOND
          <FontAwesomeIcon 
              icon={faFileExcel} 
              style={{ cursor: 'pointer', fontSize: '18px', color: 'orange',marginLeft:'4px' }} 
              onClick={() => handleInBondExleDownload("type")} 
            />
            </th>
      <th colSpan={2} style={{
            background: "#1c6c9b",
            color: "orange",
            textAlign: "center",
          }}>EXBOND
          <FontAwesomeIcon 
              icon={faFileExcel} 
              style={{ cursor: 'pointer', fontSize: '18px', color: 'orange',marginLeft:'4px' }} 
              onClick={() => handleExBondExleDownload("type")} 
            />
            </th>
    </tr>
    <tr>
      
      <th style={{
            background: "#d9edf7",
            color: "black",
            textAlign: "center",
          }}>Count</th>
          <th style={{
            background: "#d9edf7",
            color: "black",
            textAlign: "center",
          }}>Duty</th>
     
      <th style={{
            background: "#d9edf7",
            color: "black",
            textAlign: "center",
          }}>Count</th>
           <th style={{
            background: "#d9edf7",
            color: "black",
            textAlign: "center",
          }}>Duty</th>
         
      <th style={{
            background: "#d9edf7",
            color: "black",
            textAlign: "center",
          }}>Count</th>
           <th style={{
            background: "#d9edf7",
            color: "black",
            textAlign: "center",
          }}>Duty</th>
    </tr>
    
  </thead>
  <tbody>
    <tr>
    <td style={{ textAlign: 'center' }}>{nocCount}</td>
    <td style={{ textAlign: 'center' }}>{nocSum}</td>

    <td style={{ textAlign: 'center' }}>{inbondCount}</td>
    <td style={{ textAlign: 'center' }}>{inbondSum}</td>

    <td style={{ textAlign: 'center' }}>{exbondCount}</td>
    <td style={{ textAlign: 'center' }}>{exbondSum}</td>


    {/* <td style={{ textAlign: 'center' }}>{item.name}</td>
    <td style={{ textAlign: 'center' }}>{item.name}</td>
    <td style={{ textAlign: 'center' }}>{item.name}</td>
    <td style={{ textAlign: 'center' }}>{item.name}</td> */}
   
    </tr>
  </tbody>
</table>

</div>
</li>
    <li>
    <div 
   style={{ 
    boxShadow: "0 8px 16px rgba(3, 39, 38, 0.8)", // Exact shadow you requested
  }} >
    <table className="table table-bordered table-hover tableHeader">
      <thead>
      <tr>
          <th colSpan="2" style={{ textAlign: "center",fontSize: "18px" }}>
          {" "}
                          <FontAwesomeIcon
                            icon={faFileExcel}
                            style={{ marginRight: 4 }}
                          />{" "}
            Excel Utility
          </th>
        </tr>
        <tr>
        <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}> Report Name</th>
           <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>Excel</th>
                          </tr>
      </thead>
      <tbody>
        {/* Iterate over the report types and display in table */}
        {[
          // { name: "Container Gone for Scanning Inventory", route: "Scan Container Report" },
          // { name: "Container Arrival / Pending for Scanning", route: "container-arrival-pending-scanning" },
          // { name: "Container Gateout for Scanning - List Report", route: "container-gateout-scanning-list" },
          { name: "Export Carting", route: "Export Carting Report" },
          { name: "Export Empty Out", route: "ExportEmptyInOutReport" },
          { name: "Ctr.weighment List", route: "WEIGHMENT REPORT" }
        ].map((item, index) => (
          <tr key={index}>
            <td style={{ textAlign: 'center' }}>{item.name}</td>
            <td style={{ textAlign: 'center' }}>
            <FontAwesomeIcon 
              icon={faFileExcel} 
              style={{ cursor: 'pointer', fontSize: '18px', color: '#1c6c9b' }} 
              onClick={() => handleExleDownload(item.route)} 
            />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
    </li>

    </ui>

</Col>


</Row>













<Row style={{marginTop:1}}>
<Col md={12}>
  {/* className="table-responsive" */}
  <div 
   style={{ 
    boxShadow: "0 8px 16px rgba(3, 39, 38, 0.8)", // Exact shadow you requested
  }}
>
  <table className="table table-bordered table-hover tableHeader">
      <thead>
        <tr>
          <th colSpan="14" style={{ textAlign: "center",fontSize: "18px" }}>
          {" "}
                          <FontAwesomeIcon
                            icon={faShip}
                            style={{ marginRight: 4 }}
                          />{" "}
            Port Wise Pendency
          </th>
        </tr>
        <tr>
          <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}></th>
          <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>20</th>
          <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}> 40</th>
                               <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}> Total</th>
          <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>Tues</th>


                                    <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>Less Than 0 </th>
                                    <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>0-3</th>
                                    <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>3-4</th>
                                    <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>4-5</th>
                                    <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>5-6</th>
                                    <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>6-7</th>
                                    <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>7-8</th>
                                    <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>Greater 9</th>
                           <th style={{
                            background: "#1c6c9b",
                            color: "orange",
                            textAlign: "center",
                          }}>Excel</th>
                          
        </tr>
      </thead>
      {/* <tbody>
        {portWisePendency.length > 0 ? (
          portWisePendency.map((item, index) => (
            <tr key={index}>
              <td style={{textAlign:'center'}}>{item.name}</td> 
              <td style={{textAlign:'center'}}>{item["20"] || 0}</td> 
              <td style={{textAlign:'center'}}>{item["40"] || 0}</td> 
              <td style={{textAlign:'center'}}>{item["total"] || 0}</td> 
              <td style={{textAlign:'center'}}>{item["Tues"] || 0}</td> 

              <td style={{textAlign:'center'}}>{item["Less than 0"] || 0}</td> 
              <td style={{textAlign:'center'}}>{item["0-3 days"] || 0}</td> 
              <td style={{textAlign:'center'}}>{item["3-4 days"] || 0}</td> 
              <td style={{textAlign:'center'}}>{item["4-5 days"] || 0}</td> 
              <td style={{textAlign:'center'}}>{item["5-6 days"] || 0}</td> 
              <td style={{textAlign:'center'}}>{item["6-7 days"] || 0}</td> 
              <td style={{textAlign:'center'}}>{item["7-8 days"] || 0}</td> 
              <td style={{textAlign:'center'}}>{item["Greater than 9"] || 0}</td>  */}
              {/* <td style={{ textAlign: 'center' }}>
            <FontAwesomeIcon 
              icon={faFileExcel} 
              style={{ cursor: 'pointer', fontSize: '18px', color: '#1c6c9b' }} 
              onClick={() => handlePortWiseExleDownload(item.name)} 
            />
          </td>  */}
           {/* <td style={{ textAlign: 'center' }}>
          {item.name !== "Pendency Total" && ( // Hide button for "Pendency Total"
            <FontAwesomeIcon 
              icon={faFileExcel} 
              style={{ cursor: 'pointer', fontSize: '18px', color: '#1c6c9b' }} 
              onClick={() => handlePortWiseExleDownload(item.name)} 
            />
          )}
        </td>
            </tr>
          ))
        ) : (
          <>
          </>
        )}
      </tbody> */}
      <tbody>
  {portWisePendency.length > 0 ? (
    [...portWisePendency]
      .sort((a, b) => (a.name === "Pendency Total" ? 1 : b.name === "Pendency Total" ? -1 : 0))
      .map((item, index) => (
        <tr key={index}>
          <td style={{ textAlign: "center" }}>{item.name}</td>
          <td style={{ textAlign: "center" }}>{item["20"] || 0}</td>
          <td style={{ textAlign: "center" }}>{item["40"] || 0}</td>
          <td style={{ textAlign: "center" }}>{item["total"] || 0}</td>
          <td style={{ textAlign: "center" }}>{item["Tues"] || 0}</td>

          <td style={{textAlign:'center'}}>{item["Less than 0"] || 0}</td> 
              <td style={{textAlign:'center'}}>{item["0-3 days"] || 0}</td> 
              <td style={{textAlign:'center'}}>{item["3-4 days"] || 0}</td> 
              <td style={{textAlign:'center'}}>{item["4-5 days"] || 0}</td> 
              <td style={{textAlign:'center'}}>{item["5-6 days"] || 0}</td> 
              <td style={{textAlign:'center'}}>{item["6-7 days"] || 0}</td> 
              <td style={{textAlign:'center'}}>{item["7-8 days"] || 0}</td> 
              <td style={{textAlign:'center'}}>{item["Greater than 9"] || 0}</td>

          <td style={{ textAlign: "center" }}>
            {item.name !== "Pendency Total" && (
              <FontAwesomeIcon
                icon={faFileExcel}
                style={{ cursor: "pointer", fontSize: "18px", color: "#1c6c9b" }}
                onClick={() => handlePortWiseExleDownload(item.name)}
              />
            )}
          </td>
        </tr>
      ))
  ) : (
    <></>
  )}
</tbody>

    </table>
</div>

  </Col>



</Row>
      </>
  )

  
}