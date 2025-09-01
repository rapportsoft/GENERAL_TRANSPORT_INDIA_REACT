import { faCalendarAlt, faDownload, faEye, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, FormGroup, Row } from 'reactstrap';
import AuthContext from '../Components/AuthProvider';
import useAxios from '../Components/useAxios';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import ipaddress from '../Components/IpAddress';
import moment from 'moment';
import { Pagination } from 'react-bootstrap';
import { format } from 'date-fns';
import Select from "react-select";
export default function GeneralOperationalReports() {

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
  
    const [startDate ,setStartDate] =useState('');
    const [endDate ,setEndDate] =useState(new Date());
    const [igmNo ,setIgmNo] =useState('');
    const [itemNo ,setItemNo] =useState('');
    const [cha,setCha]=useState('');
    const [accountHolder ,setAccountHolder]=useState('');
    const [shippingLine,setShippingLine] = useState('');
    const [selectedReport, setSelectedReport] = useState(""); // Track selected radio button
    const [chaName, setChaName] = useState('');
    const [isoData, setISOData] = useState([]);
    const [shippingLineName, setShippingLineName] = useState("");
    const [accountHolderName, setAccountHolderName] = useState("");
const [impData, setImpData] = useState([]);
const [accountHolderData, setAccountHolderData] = useState([]);
    const handlePortChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
      
            console.log("respone datacagahgdhsagdhs",selectedOption);
            setCha('');
            setChaName(''); 
        }
        else {
            console.log("respone datacagahgdhsagdhs",selectedOption);
      
            setCha(selectedOption ? selectedOption.value : '')
            setChaName(selectedOption ? selectedOption.drop : '');
        }
      };
      
      const getIsoData = (val) => {
        if (val === '') {
            setISOData([]);
            return;
        }
      
        axios.get(`${ipaddress}api/cfbondnoc/search?companyId=${companyid}&branchId=${branchId}&partyName=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
      
                console.log("response.data",data);
                const portOptions = data.map(port => ({
                    value: port.partyId,
                    label: `${ port.partyName}-${port.address1},${port.address1},${port.address3}`,
                    drop: port.partyName,
                    ccode:port.customerCode,
                    bWeek:port.bondnocWeek,
                    cName:port.partyName,
                }))
                setISOData(portOptions);
            })
            .catch((error) => {
      
            })
      }

      const handleShippingLineChange = async (selectedOption, { action }) => {
        if (action === 'clear') {
            setShippingLineName('');
          setShippingLine(''); 
          console.log("respone datacagahgdhsagdhs",selectedOption);
        }
        else {
            console.log("respone datacagahgdhsagdhs",selectedOption);
      
            setShippingLine(selectedOption ? selectedOption.value : '');
            setShippingLineName(selectedOption ? selectedOption.impN : '');
        }
      };
      
      const getShippingLineData = (val) => {
        if (val === '') {
          setImpData([]);
            return;
        }
      
        axios.get(`${ipaddress}api/cfbondnoc/searchShippingLine?companyId=${companyid}&branchId=${branchId}&partyName=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
      
                console.log("response.data",data);
                const portOptions = data.map(port => ({ 
                    value: port.partyId,
                    label: `${port.partyName}-${port.address1}-${port.address2}-${port.address3}`,
                    //label: port.partyName,
                    impN:port.partyName,
                    ad1:port.address1,
                    ad2:port.address2,
                    ad3:port.address3,
                }))
                setImpData(portOptions);
            })
            .catch((error) => {
      
            })
      }
      const handleAccountHolderChange = async (selectedOption, { action }) => {
        if (action === 'clear') {
            setAccountHolderName('');
          setAccountHolder(''); 
          console.log("respone datacagahgdhsagdhs",selectedOption);
        }
        else {
            console.log("respone datacagahgdhsagdhs",selectedOption);
      
            setAccountHolder(selectedOption ? selectedOption.value : '');
            setAccountHolderName(selectedOption ? selectedOption.impN : '');
        }
      };
      
      const getAccountHolderData = (val) => {
        if (val === '') {
            setAccountHolderData([]);
            return;
        }
      
        axios.get(`${ipaddress}api/cfbondnoc/searchImporters?companyId=${companyid}&branchId=${branchId}&partyName=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
      
                console.log("response.data",data);
                const portOptions = data.map(port => ({ 
                    value: port.partyId,
                    label: `${port.partyName}-${port.address1}-${port.address2}-${port.address3}`,
                    //label: port.partyName,
                    impN:port.partyName,
                    ad1:port.address1,
                    ad2:port.address2,
                    ad3:port.address3,
                }))
                setAccountHolderData(portOptions);
            })
            .catch((error) => {
      
            })
      }
      
      const reports = [
        "General Receiving Register",
        "General Delivery Register",
        "General Stock Report",
      ];
    


      const handleRadioChange = (report) => {
        setSelectedReport(report);   // Update the selected report
        setInventoryList([]); 
        handlePageChange(1);       // Empty the inventoryList
      };
      

      const [inventoryList ,setInventoryList]=useState([]);
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


    const handleStartDateChange = (date) => {
        setStartDate(date);
      };
    
      // Handler for end date change
      const handleEndDateChange = (date) => {
        setEndDate(date);
      };



      const handleExleDownload = async (type) => {
        try {
          setLoading(true);
  
        const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DD HH:mm') : '';
        const formattedEndDate= endDate ? moment(endDate).format('YYYY-MM-DD HH:mm') : '';
        if (!selectedReport) {
          toast.error('Please select a report.');
          setLoading(false); // Ensure the loading state is reset
          return;
        }
if (
  (!formattedStartDate || !formattedEndDate)
) {
  toast.error('Please enter both start date and end date.');
  setLoading(false); // Ensure the loading state is reset
  return;
}
        console.log(selectedReport);
        console.log(formattedStartDate);
        console.log(formattedEndDate);
       
          const response = await axios.get(
            `${ipaddress}api/generalReports/getImportGateInContainerDetailedReport?companyId=${companyid}&branchId=${branchId}&uname=${username}&type=${type}&cname=${companyname}&bname=${branchname}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&accountHolder=${accountHolder}&cha=${cha}&selectedReport=${selectedReport}`,
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
          setInventoryList([]);
          setSelectedReport('');
        } catch (error) {
          console.error('Error downloading Excel file:', error);
      
          // Error toast notification
          toast.error('Failed to download Excel file. Please try again.', { autoClose: 900 });
        }finally{
          setLoading(false);
        }
      };



      const handleShow = async (type) => {
        try {
          setLoading(true);
            console.log("In show data");

            const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DD HH:mm') : '';
            const formattedEndDate = endDate ? moment(endDate).format('YYYY-MM-DD HH:mm') : '';
            
            if (!selectedReport) {
              toast.error('Please select a report.');
              setLoading(false); // Ensure the loading state is reset
              return;
            }
        // Check startDate and endDate only if the selectedReport is neither "Import Long Standing Report" nor "LCL Cargo Balance Inventory Report"
        if (
          (!formattedStartDate || !formattedEndDate)
        ) {
          toast.error('Please enter both start date and end date.');
          setLoading(false); // Ensure the loading state is reset
          return;
        }

            const response = await axios.get(
                `${ipaddress}api/generalReports/show?companyId=${companyid}&branchId=${branchId}&uname=${username}&type=${type}&cname=${companyname}&bname=${branchname}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&accountHolder=${accountHolder}&cha=${cha}&selectedReport=${selectedReport}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                }
            );
    
            const data = response.data;
            if (data.length === 0) {
              toast.info(`No records found for dates: ${formattedStartDate} to ${formattedEndDate}`);
          }
    setInventoryList(data);
            console.log(data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
            // You may want to show a toast notification or alert the user
        }finally{
          setLoading(false);
        }
    };
    

      const handleClear =()=>{
        setIgmNo('');
        setItemNo('');
        setStartDate('');
        setEndDate(new Date());
        setInventoryList([]);
        setSelectedReport("");
        setCha('');
        setChaName('');
        setAccountHolder('');
        setAccountHolderName('');
        setShippingLine('');
        setShippingLineName('');
      }

      const GeneralReceivingRegister = ({ currentItems}) => (
        <table className="table table-bordered table-hover tableHeader">
          <thead className="text-center">
            <tr>
              <th scope="col">Sr No</th>
              <th scope="col">Receiving Date</th>
              <th scope="col" style={{minWidth:270}}>Importer Name</th>
              <th scope="col" style={{minWidth:270}}>CHA Name</th>
              <th scope="col" style={{minWidth:126}}>BE NO</th>
              <th scope="col"  style={{minWidth:180}}>BE Date</th>
              <th scope="col"  style={{minWidth:180}}>Commodity</th>
              <th scope="col">Container</th>
              <th scope="col">No Of 20</th>
              <th scope="col">No Of 40</th>
              <th scope="col">Gate In Packages</th>
              <th scope="col">Gate In Weight</th>
              <th scope="col">Received Quantity</th>
              <th scope="col">Receiving Weight</th>
              <th scope="col">Package Type</th>
              <th scope="col">Vehicle No</th>
              <th scope="col" style={{minWidth:270}}>Transporter</th>
              <th scope="col">Handling</th>
              <th scope="col">Handling1</th>
              <th scope="col">Handling2</th>
              <th scope="col">Owner1</th>
              <th scope="col">Owner2</th>
              <th scope="col">Owner3</th>
              <th scope="col" style={{minWidth:126}}>Job No</th>
              <th scope="col">Remarks</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td> {/* Sr No */}
                <td>{item[0] || ""}</td> {/* Receiving Date */}
                <td>{item[1] || ""}</td> {/* Importer Name */}
                <td>{item[2] || ""}</td> {/* CHA Name */}
                <td>{item[3] || ""}</td> {/* BE NO */}
                <td>{item[4] || ""}</td> {/* BE Date */}
                <td>{item[5] || ""}</td> {/* Commodity */}
                <td>{item[6] || ""}</td> {/* Container */}
                <td>{item[7] || ""}</td> {/* No Of 20 */}
                <td>{item[8] || ""}</td> {/* No Of 40 */}
                <td>{item[9] || ""}</td> {/* Gate In Packages */}
                <td>{item[10] || ""}</td> {/* Gate In Weight */}
                <td>{item[11] || ""}</td> {/* Received Quantity */}
                <td>{item[12] || ""}</td> {/* Receiving Weight */}
                <td>{item[13] || ""}</td> {/* Package Type */}
                <td>{item[14] || ""}</td> {/* Vehicle No */}
                <td>{item[15] || ""}</td> {/* Transporter */}
                <td>{item[16] || ""}</td> {/* Handling */}
                <td>{item[17] || ""}</td> {/* Handling1 */}
                <td>{item[18] || ""}</td> {/* Handling2 */}
                <td>{item[19] || ""}</td> {/* Owner1 */}
                <td>{item[20] || ""}</td> {/* Owner2 */}
                <td>{item[21] || ""}</td> {/* Owner3 */}
                <td>{item[22] || ""}</td> {/* Job No */}
                <td>{item[23] || ""}</td> {/* Remarks */}
              </tr>
            ))}
          </tbody>
        </table>
      );
      
    
    const GeneralDeliveryRegister = ({ currentItems }) => (
      <table className="table table-bordered table-hover tableHeader">
      <thead className="text-center">
        <tr>
          <th scope="col">Sr No</th>
          <th scope="col">Delivery Date</th>
          <th scope="col" style={{minWidth:270}}>Importer Name</th>
          <th scope="col" style={{minWidth:270}}>CHA Name</th>
          <th scope="col" style={{minWidth:126}}>BE NO</th>
          <th scope="col"  style={{minWidth:180}}>BE Date</th>
          <th scope="col"  style={{minWidth:180}}>Commodity</th>
          <th scope="col">Container</th>
          <th scope="col">No Of 20</th>
          <th scope="col">No Of 40</th>
          <th scope="col">Delivery Packages</th>
          <th scope="col">Delivery Weight</th>
          <th scope="col">Out Quantity</th>
          <th scope="col">Out Weight</th>
   
          <th scope="col">Package Type</th>
          <th scope="col">Yard Location</th>
          <th scope="col">Yard Block</th>
          <th scope="col">Block Cell No</th>
          <th scope="col">Vehicle No</th>
          <th scope="col" style={{minWidth:270}}>Transporter</th>
          <th scope="col">Handling</th>
          <th scope="col">Handling1</th>
          <th scope="col">Handling2</th>
          <th scope="col">Owner1</th>
          <th scope="col">Owner2</th>
          <th scope="col">Owner3</th>
          <th scope="col" style={{minWidth:126}}>Job No</th>
          <th scope="col">Remarks</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {currentItems.map((item, index) => (
          <tr key={index}>
            <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td> {/* Sr No */}
            <td>{item[0] || ""}</td> {/* Receiving Date */}
            <td>{item[1] || ""}</td> {/* Importer Name */}
            <td>{item[2] || ""}</td> {/* CHA Name */}
            <td>{item[3] || ""}</td> {/* BE NO */}
            <td>{item[4] || ""}</td> {/* BE Date */}
            <td>{item[5] || ""}</td> {/* Commodity */}
            <td>{item[6] || ""}</td> {/* Container */}
            <td>{item[7] || ""}</td> {/* No Of 20 */}
            <td>{item[8] || ""}</td> {/* No Of 40 */}
            <td>{item[9] || ""}</td> {/* Gate In Packages */}
            <td>{item[10] || ""}</td> {/* Gate In Weight */}
            <td>{item[11] || ""}</td> {/* Received Quantity */}
            <td>{item[12] || ""}</td> {/* Receiving Weight */}
            <td>{item[13] || ""}</td> {/* Package Type */}
            <td>{item[14] || ""}</td> {/* Vehicle No */}
            <td>{item[15] || ""}</td> {/* Transporter */}
            <td>{item[16] || ""}</td> {/* Handling */}
            <td>{item[17] || ""}</td> {/* Handling1 */}
            <td>{item[18] || ""}</td> {/* Handling2 */}
            <td>{item[19] || ""}</td> {/* Owner1 */}
            <td>{item[20] || ""}</td> {/* Owner2 */}
            <td>{item[21] || ""}</td> {/* Owner3 */}
            <td>{item[22] || ""}</td> {/* Job No */}
            <td>{item[23] || ""}</td> {/* Remarks */}
            <td>{item[24] || ""}</td> {/* Remarks */}
            <td>{item[25] || ""}</td> {/* Remarks */}
            <td>{item[26] || ""}</td> {/* Remarks */}
          </tr>
        ))}
      </tbody>
    </table>

    
    
    );
    const GeneralStockReport = ({ currentItems }) => (
      <table className="table table-bordered table-hover tableHeader">
      <thead className="text-center">
        <tr>
          <th scope="col">Sr No</th>
          <th scope="col">Deposit No</th>
          <th scope="col">Boe No</th>
          <th scope="col" style={{minWidth:144}}>Boe Date</th>
          <th scope="col" style={{minWidth:270}}>Importer Name</th>
          <th scope="col" style={{minWidth:270}}>CHA</th>
          <th scope="col" >Commodity</th>
          <th scope="col" style={{minWidth:270}}>Commodity Desc</th>
          <th scope="col">Gate In Packages</th>
          <th scope="col">Gross Weight</th>
          <th scope="col">Receiving Pkg</th>
          <th scope="col">Receiving Weight</th>
          <th scope="col">Delivery Pkg</th>
          <th scope="col">Delivery Weight</th>
          <th scope="col">Gate Pass Pkg</th>
          <th scope="col">Gate Pass Weight</th>
          <th scope="col">Remaining Packages</th>
          <th scope="col">Remaining Delivery</th>
          <th scope="col">Warehouse</th>
          <th scope="col">Warehouse Block</th>
          <th scope="col">Warehouse Cell No</th>
          <th scope="col" style={{minWidth:126}}>Job No</th>
          <th scope="col">Job Trans Id</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {currentItems.map((item, index) => (
          <tr key={index}>
            <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td> {/* Sr No */}
            <td>{item[0] || ""}</td>  {/* Deposit No */}
            <td>{item[1] || ""}</td>  {/* Boe No */}
            <td>{item[2] || ""}</td>  {/* Boe Date */}
            <td>{item[3] || ""}</td>  {/* Importer Name */}
            <td>{item[4] || ""}</td>  {/* CHA */}
            <td>{item[5] || ""}</td>  {/* Commodity */}
            <td>{item[6] || ""}</td>  {/* Commodity Desc */}
            <td>{item[7] || ""}</td>  {/* Gate In Packages */}
            <td>{item[8] || ""}</td>  {/* Gross Weight */}
            <td>{item[9] || ""}</td>  {/* Receiving Pkg */}
            <td>{item[10] || ""}</td> {/* Receiving Weight */}
            <td>{item[11] || ""}</td> {/* Delivery Pkg */}
            <td>{item[12] || ""}</td> {/* Delivery Weight */}
            <td>{item[13] || ""}</td> {/* Gate Pass Pkg */}
            <td>{item[14] || ""}</td> {/* Gate Pass Weight */}
            <td>{item[15] || ""}</td> {/* Remaining Packages */}
            <td>{item[16] || ""}</td> {/* Remaining Delivery */}
            <td>{item[17] || ""}</td> {/* Warehouse */}
            <td>{item[18] || ""}</td> {/* Warehouse Block */}
            <td>{item[19] || ""}</td> {/* Warehouse Cell No */}
            <td>{item[20] || ""}</td> {/* Job No */}
            <td>{item[21] || ""}</td> {/* Job Trans Id */}
          </tr>
        ))}
      </tbody>
    </table>
    
    );
    
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
      <Col md={2}>
        
        <FormGroup>
          <label className="forlabel bold-label" htmlFor="inGateInDate">
            Start Date <span className="error-message">*</span>
          </label>
          <div style={{ position: "relative" }}>

             <div>
                      <DatePicker
                       
                        wrapperClassName="custom-react-datepicker-wrapper"
                        className="form-control"
                        selected={startDate}
                        id="startDate"
                        name='startDate'
                        onChange={handleStartDateChange}
                        timeInputLabel="Time:"
                        dateFormat="dd/MM/yyyy HH:mm"
                        showTimeInput
                        timeFormat="HH:mm"
                        popperPlacement="bottom-start"
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
            End Date <span className="error-message">*</span>
          </label>
          <div style={{ position: "relative" }}>
<div>
                      <DatePicker
                        id="endDate"
                        name='endDate'
                        wrapperClassName="custom-react-datepicker-wrapper"
                        className="form-control"
                        selected={endDate}
                        onChange={handleEndDateChange}
                        // dateFormat="dd/MM/yyyy"
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

      <Col md={4}>
<FormGroup>
                                <label className="forlabel bold-label" htmlFor="accountHolder">
                              Importer Name
                                </label>
                                <Select
                                    value={{ value: accountHolder, label: accountHolderName }}
                                    onChange={handleAccountHolderChange}
                                    onInputChange={getAccountHolderData}
                                    options={accountHolderData}
                                    placeholder="Select accountHolder"
                                    isClearable
                                    id="accountHolder"
                                    vesselName="accountHolder"

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
                            </FormGroup>
    </Col>

    <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    CHA
                                </label>
                                <Select
                                    value={{ value:cha, label:chaName }}
                                    onChange={handlePortChange}
                                    onInputChange={getIsoData}
                                    options={isoData}
                                    placeholder="Select CHA"
                                    isClearable
                                    id="cha"
                                    vesselName="cha"
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
                            </FormGroup>
                        </Col>
    </Row>

<Row>

</Row>
<div className="report-list mt-4">
        <Row>
          {reports.map((report, index) => (
            <Col md={4} key={index} className="mb-2">
              <div className="d-flex align-items-center">
                <input
                  type="radio"
                  id={`radio-${index}`}
                  name="reportGroup"
                  checked={selectedReport === report}
                  onChange={() => handleRadioChange(report)}
                />
                 <label className="ms-2 bold-report" htmlFor={`radio-${index}`}>
            {report}
          </label>
              </div>
            </Col>
          ))}
        </Row>
      </div>

<hr/>
    <Row style={{justifyContent:'center',display:'flex'}}>

      <Col md={7} style={{justifyContent:'center',display:'flex'}} >
      <button
                className="btn btn-outline-success btn-margin newButton"
                id="submitbtn2"
                style={{ fontSize: 11, marginRight: 5 }}
               onClick={()=> handleShow('Excel') }
            >
              <FontAwesomeIcon icon={faEye} style={{ marginRight: "4px" }} />
              Show
            </button>

            <button
                className="btn btn-outline-success btn-margin newButton"
                id="submitbtn2"
                style={{ fontSize: 11, marginRight: 5 }}
                onClick={()=> handleExleDownload('Excel')}

            >
              <FontAwesomeIcon icon={faDownload} style={{ marginRight: "4px" }} />
              Download
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
{inventoryList.length > 0 ? (
  <>
    <div className="table-responsive" style={{ paddingTop: 9 }}>
    {selectedReport === "General Receiving Register" && <GeneralReceivingRegister currentItems={currentItems} />}
    {selectedReport === "General Delivery Register" && <GeneralDeliveryRegister currentItems={currentItems} />}
    {selectedReport === "General Stock Report" && <GeneralStockReport currentItems={currentItems} />}
    
    </div>
    <Pagination style={{ display: "flex", justifyContent: "center", color: "gray" }}>
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
  </>
) : (
  <></>
)}

      </>
  )
}
