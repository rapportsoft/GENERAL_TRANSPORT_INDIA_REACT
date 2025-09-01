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
export default function ImportOperationalReports() {

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
      
        axios.get(`${ipaddress}api/cfbondnoc/searchAccountHolder?companyId=${companyid}&branchId=${branchId}&partyName=${val}`, {
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
        "Hold Release Report",
        "Import GateIn Container detailed Report",
        "Import GateOut Container detailed Report",
        // "Import FGP Report",
        "Import Long Standing Report",
        "Import LCL Cargo Delivery Report",
        "Import FCL Destuff Balance Report",
        "LCL Cargo Balance Inventory Report",
        // "Import Destuff Equipment Report",
        "Import FCL Custom Tally Sheet Report",
        "Import Manual GateIn Report",
        "Loaded To Destuff Empty Inventory",
        // "Scan Container Report",
        "SealCutting Report",
        // "WEIGHMENT REPORT",
        "TRANSPORTER WISE TUES REPORT",
        // "LCL Zero Payment",
        "Import LCL Cargo Destuff Report",
        "Yard Balance Report Details",
        "Import BOE Wise Gate Out Report",
        // "Loaded To Destuff Empty Out Report Details",
        // "Hub stuffing Report",
      ];
    
      // const handleRadioChange = (report) => setSelectedReport(report);


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
    
        // Check startDate and endDate only if the selectedReport is neither "Import Long Standing Report" nor "LCL Cargo Balance Inventory Report"
if (
  selectedReport !== 'Import Long Standing Report' &&
  selectedReport !== 'LCL Cargo Balance Inventory Report' &&
  selectedReport !== 'Import FCL Destuff Balance Report' &&
  selectedReport !== 'Yard Balance Report Details' &&
  (!formattedStartDate || !formattedEndDate)
) {
  toast.error('Please enter both start date and end date.');
  setLoading(false); // Ensure the loading state is reset
  return;
}
        // if (!formattedStartDate || !formattedEndDate) {
        //   toast.error('Please enter both start date and end date.');
        //   setLoading(false); // Ensure the loading state is reset
        //   return;
        // }

        console.log(selectedReport);
        console.log(formattedStartDate);
        console.log(formattedEndDate);
       
          const response = await axios.get(
            `${ipaddress}api/importReports/getImportGateInContainerDetailedReport?companyId=${companyid}&branchId=${branchId}&uname=${username}&type=${type}&cname=${companyname}&bname=${branchname}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&igmNo=${igmNo}&itemNo=${itemNo}&shippingLine=${shippingLine}&accountHolder=${accountHolder}&cha=${cha}&selectedReport=${selectedReport}`,
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
        
            // if (!formattedStartDate || !formattedEndDate) {
            //   toast.error('Please enter both start date and end date.');
            //   setLoading(false); // Ensure the loading state is reset
            //   return;
            // }

        // Check startDate and endDate only if the selectedReport is neither "Import Long Standing Report" nor "LCL Cargo Balance Inventory Report"
        if (
          selectedReport !== 'Import Long Standing Report' &&
          selectedReport !== 'LCL Cargo Balance Inventory Report' &&
          selectedReport !== 'Import FCL Destuff Balance Report' &&
          selectedReport !== 'Yard Balance Report Details' &&
          (!formattedStartDate || !formattedEndDate)
        ) {
          toast.error('Please enter both start date and end date.');
          setLoading(false); // Ensure the loading state is reset
          return;
        }

            const response = await axios.get(
                `${ipaddress}api/importReports/show?companyId=${companyid}&branchId=${branchId}&uname=${username}&type=${type}&cname=${companyname}&bname=${branchname}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&igmNo=${igmNo}&itemNo=${itemNo}&shippingLine=${shippingLine}&accountHolder=${accountHolder}&cha=${cha}&selectedReport=${selectedReport}`,
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

      const ImportLongStandingReportTable = ({ currentItems }) => (
        <table className="table table-bordered table-hover tableHeader">
          <thead className="text-center">
            <tr>
              <th scope="col" style={{ maxWidth: "90px" }}>Sr No.</th>
              <th scope="col" style={{ maxWidth: "150px" }}>Container No</th>
              <th scope="col" style={{ maxWidth: "90px" }}>Size</th>
              <th scope="col"style={{minWidth:270}}>Description Of Goods</th>
              <th scope="col" >Weight (Kgs)</th>
              <th scope="col" style={{ maxWidth: "150px" }}>In Date</th>
              <th scope="col" style={{ maxWidth: "90px" }}>IGM No</th>
              <th scope="col" style={{ maxWidth: "90px" }}>Item No</th>
              <th scope="col" style={{minWidth:270}}>Shipping Line Name</th>
              <th scope="col" style={{minWidth:270}}>Consignee's Name</th>
              <th scope="col" style={{ maxWidth: "90px" }}>Days</th>
              <th scope="col" style={{minWidth:270}}>CHA Name </th>
              <th scope="col" style={{minWidth:190}}>Agent Code</th>
              <th scope="col" style={{ maxWidth: "150px" }}>Current Stage</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
                <td>{item[0] || ""}</td>
                <td>{item[1] || ""}</td>
                <td>{item[2] || ""}</td>
                <td>{item[3] || ""}</td>
                <td>{item[4] || ""}</td>
                <td>{item[5] || ""}</td>
                <td>{item[6] || ""}</td>
                <td>{item[7] || ""}</td>
                <td>{item[8] || ""}</td>
                <td>{item[9] || ""}</td>
                <td>{item[11] || ""}</td>
                <td>{item[12] || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );

      const SealCuttingReport = ({ currentItems }) => (
        <table className="table table-bordered table-hover tableHeader">
        <thead className="text-center">
          <tr>
            <th scope="col">SR No</th>
            <th scope="col">IGM_NO</th>
            <th scope="col">ITEM_NO</th>
            <th scope="col">BL_NO</th>
            <th scope="col">BL_DATE</th>
            <th scope="col">CONTAINER_NO</th>
            <th scope="col">SIZE</th>
            <th scope="col">TYPE</th>
            <th scope="col">IN DATE</th>
            <th scope="col"style={{minWidth:315}}>CHA</th>
            <th scope="col">BOE_NO</th>
            <th scope="col">BOE_DATE</th>
            <th scope="col">SEALCUTTING_DATE</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
              <td>{item[0] || ""}</td>
              <td>{item[1] || ""}</td>
              <td>{item[2] || ""}</td>
              <td>{item[3] || ""}</td>
              <td>{item[4] || ""}</td>
              <td>{item[5] || ""}</td>
              <td>{item[6] || ""}</td>
              <td>{item[7] || ""}</td>
              <td>{item[8] || ""}</td>
              <td>{item[9] || ""}</td>
              <td>{item[10] || ""}</td>
              <td>{item[11] || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
      );

      const ImportGateInContarinerDetailedReport = ({ currentItems }) => (
        <table className="table table-bordered table-hover tableHeader">
        <thead className="text-center">
          <tr>
            <th scope="col">Sr No</th>
            <th scope="col" style={{ maxWidth: "90px" }}>Port</th>
            <th scope="col">Vessel Name</th>
            <th scope="col" style={{ maxWidth: "90px" }}>Voy No</th>
            <th scope="col">Via/Vcn No</th>
            <th scope="col" style={{minWidth:270}}>Line Name</th>
            <th scope="col" style={{minWidth:270}}>Agent Name</th>
            <th scope="col" style={{ maxWidth: "90px" }}>IGM No</th>
            <th scope="col">Item No</th>
            <th scope="col" style={{ maxWidth: "90px" }}>Cont No</th>
            <th scope="col">Size</th>
            <th scope="col">Type</th>
            <th scope="col">ISO Code</th>
            <th scope="col">Cont Desc</th>
            <th scope="col">Weight</th>
            <th scope="col">Scan Location</th>
            <th scope="col">Genset</th>
            <th scope="col" style={{ maxWidth: "180px" }}>Seal No</th>
            <th scope="col" style={{ maxWidth: "180px" }}>Remarks</th>
            <th scope="col" style={{ maxWidth: "180px" }}>Hold Remarks</th>
            <th scope="col" style={{ maxWidth: "180px" }}>Cargo Type</th>
            <th scope="col" style={{minWidth:270}}>Commodity</th>
            <th scope="col" style={{minWidth:270}}>Importer Name</th>
            <th scope="col" style={{ maxWidth: "180px" }}>V B Date</th>
            <th scope="col" style={{ maxWidth: "180px" }}>Job Order No</th>
            <th scope="col">J O Date</th>
            <th scope="col">Gate In Date</th>
            <th scope="col" style={{ maxWidth: "180px" }}>Truck No</th>
            <th scope="col">FCL/LCL</th>
            <th scope="col" style={{ maxWidth: "270px" }}>Transporter Name</th>
            <th scope="col">Low Bed</th>
            <th scope="col" style={{ maxWidth: "180px" }}>BL No</th>
            <th scope="col" style={{ maxWidth: "180px" }}>Damage Details</th>
            <th scope="col">JO Dwell Time (Dy:Hr:Min)</th>
            <th scope="col" style={{ maxWidth: "270px" }}>Account Holder</th>
            <th scope="col" style={{ maxWidth: "180px" }}>Nominated Customer</th>
            <th scope="col" style={{ maxWidth: "90px" }}>IMO</th>
            <th scope="col" style={{ maxWidth: "90px" }}>UN No</th>
            <th scope="col" style={{ maxWidth: "180px" }}>Cargo Description</th>
            <th scope="col" style={{ maxWidth: "90px" }}>Yard</th>
          </tr>
        </thead>
        <tbody className="text-center">
        {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
                <td>{item[0] || ""}</td>
                <td>{item[1] || ""}</td>
                <td>{item[2] || ""}</td>
                <td>{item[3] || ""}</td>
                <td>{item[4] || ""}</td>
                <td>{item[5] || ""}</td>
                <td>{item[6] || ""}</td>
                <td>{item[7] || ""}</td>
                <td>{item[8] || ""}</td>
                <td>{item[9] || ""}</td>
                <td>{item[10] || ""}</td>
                <td>{item[11] || ""}</td>
                <td>{item[12] || ""}</td>
                <td>{item[13] || ""}</td>
                <td>{item[14] || ""}</td>
                <td>{item[15] || ""}</td>
                <td>{item[16] || ""}</td>
                <td>{item[17] || ""}</td>
                <td>{item[18] || ""}</td>
                <td>{item[19] || ""}</td>
                <td>{item[20] || ""}</td>
                <td>{item[21] || ""}</td>
                <td>{item[22]}</td>
                <td>{item[23] }</td>
                <td>{item[24]}</td>
                <td>{item[25]}</td>
                {/* <td>{item[26] || ""}</td> */}
                <td>{item[27] || ""}</td>
                <td>{item[28] || ""}</td>
                <td>{item[29] || ""}</td>
                <td>{item[30] || ""}</td>
                {/* <td>{item[31] || ""}</td> */}
                <td>{item[32] || ""}</td>
                <td>{item[33] || ""}</td>
                <td>{item[34] || ""}</td>
                <td>{item[35] || ""}</td>
                <td>{item[36] || ""}</td>
                <td>{item[37] || ""}</td>
                <td>{item[38] || ""}</td>
                <td>{item[39] || ""}</td>
                <td>{item[40] || ""}</td>
            </tr>
        ))}
    </tbody>
      </table>
      );

      const LCLCargoInvetoryBalance = ({ currentItems }) => (
        <table className="table table-bordered table-hover tableHeader">
        <thead className="text-center">
          <tr>
            <th scope="col">Sr_No</th>
            <th scope="col">Cont No</th>
            <th scope="col">Cont Size</th>
            <th scope="col">Cont Type</th>
            <th scope="col">IGM</th>
            <th scope="col">Sub/Item</th>
            <th scope="col">IGM Date</th>
            <th scope="col">BL No</th>
            <th scope="col">BL Date</th>
            <th scope="col">Voy No</th>
            <th scope="col">Gate In Date</th>
            <th scope="col">Destuff Date</th>
            <th scope="col">Declared Pkg</th>
            <th scope="col">Destuffed Pkg</th>
            <th scope="col">Importer Name</th>
            <th scope="col">No of Days</th>
            <th scope="col">Ware House Location</th>
            <th scope="col">Area</th>
            <th scope="col">Movement Type</th>
            <th scope="col">Consoler Name</th>
            <th scope="col">Agent Name</th>
            <th scope="col">Remarks</th>
            <th scope="col">Location</th>
            <th scope="col">Hold Remarks</th>
            <th scope="col">Cargo Type</th>
            <th scope="col">Assessable Value</th>
            <th scope="col">Duty Value</th>
            <th scope="col">IMO</th>
            <th scope="col">UN No</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {currentItems.map((item, index) => (
            <tr key={index}>
             <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
              <td>{item[0] || ""}</td>
              <td>{item[1] || ""}</td>
              <td>{item[2] || ""}</td>
              <td>{item[3] || ""}</td>
              <td>{item[4] || ""}</td>
              <td>{item[5] || ""}</td>
              <td>{item[6] || ""}</td>
              <td>{item[7] || ""}</td>
              <td>{item[8] || ""}</td>
              <td>{item[9] || ""}</td>
              <td>{item[10] || ""}</td>
              <td>{item[11] || ""}</td>
              <td>{item[12] || ""}</td>
              <td>{item[13] || ""}</td>
              <td>{item[14] || ""}</td>
              <td>{item[15] || ""}</td>
              <td>{item[16] || ""}</td>
              <td>{item[17] || ""}</td>
              <td>{item[18] || ""}</td>
              <td>{item[19] || ""}</td>
              <td>{item[20] || ""}</td>
              <td>{item[21] || ""}</td>
              <td>{item[22] || ""}</td>
              <td>{item[23] || ""}</td>
              <td>{item[24] || ""}</td>
              <td>{item[25] || ""}</td>
              <td>{item[26] || ""}</td>
              <td>{item[27] || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      
      );

      const HoldReleasedReport = ({ currentItems }) => (
        <table className="table table-bordered table-hover tableHeader">
        <thead className="text-center">
          <tr>
            <th scope="col">Sr No</th>
            <th scope="col" style={{ maxWidth: "90px" }}>IGM No</th>
            <th scope="col">Item No</th>
            <th scope="col" style={{ maxWidth: "90px" }}>Cont No</th>
            <th scope="col">Cont Size</th>
            <th scope="col">Cont Type</th>
            <th scope="col">BOE No</th>
            <th scope="col" style={{ maxWidth: "180px" }}>BOE Date</th>
            <th scope="col" style={{ maxWidth: "180px" }}>Gate In Date</th>
            <th scope="col">Hold Remarks</th>
            <th scope="col"style={{minWidth:270}}>Importer Name</th>
            <th scope="col" style={{minWidth:270}}>Shipping Agent Name</th>
            <th scope="col">FCL/LCL</th>
            <th scope="col" style={{ maxWidth: "180px" }}>Hold BY</th>
            <th scope="col" style={{ maxWidth: "180px" }}>Hold Type</th>
            <th scope="col" style={{ maxWidth: "180px" }}>Hold Date</th>
            <th scope="col" style={{ maxWidth: "180px" }}>Release Date</th>
            <th scope="col" style={{ maxWidth: "180px" }}>Release Remark</th>
            <th scope="col" style={{minWidth:270}}>Cargo Description</th>
            <th scope="col" style={{ maxWidth: "180px" }}>Gate Out</th>
            <th scope="col" style={{ maxWidth: "180px" }}>Destuff Date</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
              <td>{item[0] || ""}</td>
              <td>{item[1] || ""}</td>
              <td>{item[2] || ""}</td>
              <td>{item[3] || ""}</td>
              <td>{item[4] || ""}</td>
              <td>{item[5] || ""}</td>
              <td>{item[6] || ""}</td>
              <td>{item[7] || ""}</td>
              <td>{item[8] || ""}</td>
              <td>{item[9] || ""}</td>
              <td>{item[10] || ""}</td>
              <td>{item[11] || ""}</td>
              <td>{item[12] || ""}</td>
              <td>{item[13] || ""}</td>
              <td>{item[14] || ""}</td>
              <td>{item[15] || ""}</td>
              <td>{item[16] || ""}</td>
              <td>{item[17] || ""}</td>
              <td>{item[18] || ""}</td>
              <td>{item[19] || ""}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
      
      );

      const ImportManualGateInReport = ({ currentItems }) => (
        <table className="table table-bordered table-hover tableHeader">
        <thead className="text-center">
        <tr>
  <th scope="col">Sr No</th>
  <th scope="col">CONT NO</th>
  <th scope="col">CONT SIZE</th>
  <th scope="col">CONTAINER TYPE</th>
  <th scope="col">ISO CODE</th>
  <th scope="col">GATE PASS NO</th>
  <th scope="col">GATE IN DATE</th>
  <th scope="col">SYSTEM GATE IN DATE</th>
  <th scope="col">AGENT SEAL NO</th>
  <th scope="col">CUSTOM SEAL NO</th>
  <th scope="col">TRUCK NO</th>
  <th scope="col">PORT EIR NO</th>
  <th scope="col">VESSEL NAME</th>
  <th scope="col"style={{minWidth:315}}>SHIPPING LINE NAME</th>
  <th scope="col"style={{minWidth:315}}>SHIPPING AGENT NAME</th>
  <th scope="col">PORT</th>
  <th scope="col">SCAN LOCATION</th>
  <th scope="col">SCAN STATUS</th>
</tr>

        </thead>
        <tbody className="text-center">
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
              <td>{item[2] || ""}</td>
              <td>{item[3] || ""}</td>
              <td>{item[4] || ""}</td>
              <td>{item[5] || ""}</td>
              <td>{item[5] || ""}</td>
              <td>{item[6] || ""}</td>
              <td>{item[7] || ""}</td>
              <td>{item[8] || ""}</td>
              <td>{item[9] || ""}</td>
              <td>{item[10] || ""}</td>
              <td>{item[11] || ""}</td>
              <td>{item[12] || ""}</td>
              <td>{item[13] || ""}</td>
              <td>{item[14] || ""}</td>
              <td>{item[15] || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      );




      const ImportBOEWiseGateOutReport = ({ currentItems }) => (
        <table className="table table-bordered table-hover tableHeader">
        <thead className="text-center">
          <tr>
            <th scope="col">Sr. No.</th>
            <th scope="col">BOE No</th>
            <th scope="col">BOE Date</th>
            <th scope="col">Importer Name</th>
            <th scope="col">CHA</th>
            <th scope="col">Gate Out Date</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
              <td>{item[0] || ""}</td>
              <td>{item[1] || ""}</td>
              <td>{item[2] || ""}</td>
              <td>{item[3] || ""}</td>
              <td>{item[4] || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      
      );

      const LoadedToDistuffEmptyContainer = ({ currentItems }) => (
        <table className="table table-bordered table-hover tableHeader">
        <thead className="text-center">
        <tr>
  <th scope="col">Sr No</th>
  <th scope="col">Container No</th>
  <th scope="col">Size</th>
  <th scope="col">Type</th>
  <th scope="col">IsoCode</th>
  <th scope="col">Cha</th>
  <th scope="col"style={{minWidth:315}}>Agent Name</th>
  <th scope="col"style={{minWidth:153}}>Gate Pass Date</th>
  <th scope="col">Days</th>
</tr>

</thead>
<tbody className="text-center">
  {currentItems.map((item, index) => (
    <tr key={index}>
      <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
      <td>{item[0]}</td>  {/* Container No */}
      <td>{item[1]}</td>  {/* Size */}
      <td>{item[2] || ""}</td>  {/* Type */}
      <td>{item[3] || ""}</td>  {/* IsoCode */}
      <td>{item[4] || ""}</td>  {/* Cha */}
      <td>{item[5] || ""}</td>  {/* Agent Name */}
      <td>{item[6] || ""}</td>  {/* Agent Name */}
      {/* <td>{item[6] ? format(new Date(item[6]), 'dd/MM/yyyy HH:mm') : ''}</td> */}
      <td>{item[7] || ""}</td>  {/* Days */}
    </tr>
  ))}
</tbody>

      </table>
      
      );

      const WeighmentReport = ({ currentItems }) => (
        <table className="table table-bordered table-hover tableHeader">
        <thead className="text-center">
          <tr>
            <th scope="col">Sr No</th>
            <th scope="col">FCL_LCL</th>
            <th scope="col">Container No</th>
            <th scope="col">Container Size</th>
            <th scope="col"style={{minWidth:135}}>Gate In Date</th>
            <th scope="col">Gate Out Date</th>
            <th scope="col"style={{minWidth:135}}>IGM Date</th>
            <th scope="col">IGM No</th>
            <th scope="col">Item No</th>
            <th scope="col">IGM WT</th>
            <th scope="col">VGM WT</th>
            <th scope="col">DIFF</th>
            <th scope="col" style={{minWidth:315}}>Importer Name</th>
            <th scope="col"style={{minWidth:315}}>Cargo Description</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
              <td>{item[0] || ""}</td> {/* FCL_LCL_mode */}
              <td>{item[1] || ""}</td> {/* Container No */}
              <td>{item[2] || ""}</td> {/* Container Size */}
              <td>{item[3] || ""}</td> {/* Gate In Date */}
              <td>{item[4] || ""}</td> {/* Gate Out Date */}
              <td>{item[5] || ""}</td> {/* IGM Date */}
              <td>{item[6] || ""}</td> {/* IGM No */}
              <td>{item[7] || ""}</td> {/* Item No */}
              <td>{item[8] || ""}</td> {/* IGM WT */}
              <td>{item[9] || ""}</td> {/* VGM WT */}
              <td>{item[10] || ""}</td> {/* DIFF */}
              <td>{item[11] || ""}</td> {/* Importer */}
              <td>{item[12] || ""}</td> {/* Cargo Description */}
            </tr>
          ))}
        </tbody>
      </table>
      
      
      );

      const TransporterWiseTues = ({ currentItems }) => (
        <table className="table table-bordered table-hover tableHeader">
            <thead className="text-center">
                <tr>
                    <th scope="col">Sr No</th>
                    <th scope="col" style={{minWidth:270}}>TRANSPORTER_NAME</th>
                    <th scope="col">SIZE_20</th>
                    <th scope="col">SIZE_40</th>
                    <th scope="col">TUES</th>
                </tr>
            </thead>
            <tbody className="text-center">
                {currentItems.map((item, index) => {
                    const size20 = item[2] ? parseInt(item[2], 10) : 0; // Parse size_20, default to 0
                    const size40 = item[3] ? parseInt(item[3], 10) : 0; // Parse size_40, default to 0
                    const tues = size20 + size40 * 2; // Calculate TUES
    
                    return (
                        <tr key={index}>
                            <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
                            <td>{item[1] || ""}</td> {/* TRANSPORTER_NAME */}
                            <td>{size20}</td> {/* SIZE_20 */}
                            <td>{size40}</td> {/* SIZE_40 */}
                            <td>{tues}</td> {/* TUES */}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
    



    const LCLZeroPaymetReport = ({ currentItems }) => (
      <table className="table table-bordered table-hover tableHeader">
      <thead className="text-center">
        <tr>
      <th scope="col">Sr No</th>
      <th scope="col">IGM No</th>
      <th scope="col">Item No</th>
      <th scope="col">Container No</th>
      <th scope="col">Container Size</th>
      <th scope="col">Destuff Date</th>
      <th scope="col">BL No</th>
      <th scope="col"style={{minWidth:315}}>Importer Name</th>
      <th scope="col">LCL No Bill / LCL Zero Bill</th>
      <th scope="col"style={{minWidth:315}}>Agent Name</th>
      <th scope="col">Gate Out Date</th>
      </tr>
      </thead>
      <tbody className="text-center">
        {currentItems.map((item, index) => (
          <tr key={index}>
              <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
        <td>{item[0] || ""}</td> {/* IGM No (item[0]) */}
        <td>{item[1] || ""}</td> {/* Item No (item[2]) */}
        <td>{item[2] || ""}</td> {/* Container No (item[3]) */}
        <td>{item[3] || ""}</td> {/* Container Size (item[4]) */}
        <td>{item[4] || ""}</td> {/* Destuff Date (item[5]) */}
        <td>{item[5] || ""}</td> {/* BL No (item[6]) */}
        <td>{item[6] || ""}</td> {/* Importer Name (item[8]) */}
        <td>{item[7] || ""}</td> {/* LCL No Bill / LCL Zero Bill (item[7]) */}
        <td>{item[8] || ""}</td> {/* Agent Name (item[9]) */}
        <td>{item[9] || ""}</td> {/* Gate Out Date (item[10]) */}
          </tr>
        ))}
      </tbody>
    </table>
    
    
    );

    const ImportFCLDestuffBalanceReport = ({ currentItems }) => (
      <table className="table table-bordered table-hover tableHeader">
      <thead className="text-center">
      <tr>
      <th scope="col">Sr No</th>
      <th scope="col">Container No</th>
      <th scope="col">Container Size</th>
      <th scope="col">Container Type</th>
      <th scope="col">IGM No</th>
      <th scope="col">ITEM No</th>
      <th scope="col">BL NO</th>
      <th scope="col">No Of Packages</th>
      <th scope="col"style={{minWidth:270}}>Importer Name</th>
      <th scope="col"style={{minWidth:270}}>Cargo Description</th>
      <th scope="col">Vessel Name</th>
      <th scope="col">VOY No</th>
      <th scope="col">Package Type</th>
      <th scope="col">IGM Date</th>
      <th scope="col">Gate In Date</th>
      <th scope="col"style={{minWidth:270}}>Shipping Agent</th>
      <th scope="col">Console Agent</th>
      <th scope="col">No Of Packages 1</th>
      <th scope="col">Cargo Delv Pack</th>
      <th scope="col">Balance Packages</th>
      <th scope="col">Net Wt</th>
      <th scope="col">Cargo Delv Wt</th>
      <th scope="col">Balance Wt</th>
    </tr>
      </thead>
      <tbody className="text-center">
        {currentItems.map((item, index) => (
          <tr key={index}>
          <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
          <td>{item[0] || ""}</td> {/* Container No */}
          <td>{item[1] || ""}</td> {/* Container Size */}
          <td>{item[2] || ""}</td> {/* Container Type */}
          <td>{item[3] || ""}</td> {/* IGM No */}
          <td>{item[4] || ""}</td> {/* ITEM No */}
          <td>{item[5] || ""}</td> {/* BL NO */}
          <td>{item[6] || ""}</td> {/* No Of Packages */}
          <td>{item[7] || ""}</td> {/* Importer Name */}
          <td>{item[8] || ""}</td> {/* Cargo Description */}
          <td>{item[9] || ""}</td> {/* Vessel Name */}
          <td>{item[10] || ""}</td> {/* VOY No */}
          <td>{item[11] || ""}</td> {/* Package Type */}
          <td>{item[12] || ""}</td> {/* IGM Date */}
          <td>{item[13] || ""}</td> {/* Gate In Date */}
          <td>{item[14] || ""}</td> {/* Shipping Agent Name */}
          <td>{item[15] || ""}</td> {/* Console Agent */}
          <td>{item[16] || ""}</td> {/* No Of Packages 1 */}
          <td>{item[17] || ""}</td> {/* Cargo Delv Pack */}
          <td>{item[18] || ""}</td> {/* Balance Packages */}
          <td>{item[19] || ""}</td> {/* Net Wt */}
          <td>{item[20] || ""}</td> {/* Cargo Delv Wt */}
          <td>{item[21] || ""}</td> {/* Balance Wt */}
        </tr>
        ))}
      </tbody>
    </table>
    
    
    );
    
    const ImportLCLCargoDeliveryReport = ({ currentItems }) => (
<table className="table table-bordered table-hover tableHeader">
  <thead className="text-center">
    <tr>
      <th scope="col">Sr. No.</th>
      <th scope="col">Cont No</th>
      <th scope="col">Cont Size</th>
      <th scope="col">Type</th>
      <th scope="col">IGM No</th>
      <th scope="col">Item No</th>
      <th scope="col">Igm Date</th>
      <th scope="col">Gate In Date</th>
      <th scope="col">Delivery Date</th>
      <th scope="col">Vessel Name</th>
      <th scope="col">VOY No</th>
      <th scope="col">BL No</th>
      <th scope="col">Boe no</th>
      <th scope="col">Boe date</th>
      <th scope="col">Destuff Date</th>
      <th scope="col">Package as per IGM</th>
      <th scope="col">Package Destuffed</th>
      <th scope="col">Package Type</th>
      <th scope="col">Movement Type</th>
      <th scope="col"style={{minWidth:270}}>Importer Name</th>
      <th scope="col"style={{minWidth:270}}>Agent Name</th>
      <th scope="col">Consoler</th>
      <th scope="col">Location</th>
      <th scope="col">Area</th>
      <th scope="col"style={{minWidth:270}}>Cargo Description</th>
      <th scope="col">Remarks</th>
      <th scope="col">Assess Value</th>
      <th scope="col">Duty Value</th>
      <th scope="col">Gate Pass Id</th>
      <th scope="col"style={{minWidth:270}}>CHA</th>
    </tr>
  </thead>
  <tbody className="text-center">
    {currentItems.map((item, index) => (
      <tr key={index}>
        <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
        <td>{item[0] || ""}</td> {/* Cont No */}
        <td>{item[1] || ""}</td> {/* Cont Size */}
        <td>{item[2] || ""}</td> {/* Type */}
        <td>{item[3] || ""}</td> {/* IGM No */}
        <td>{item[4] || ""}</td> {/* Item No */}
        <td>{item[5] || ""}</td> {/* Igm Date */}
        <td>{item[6] || ""}</td> {/* Gate In Date */}
        <td>{item[7] || ""}</td> {/* Delivery Date */}
        <td>{item[8] || ""}</td> {/* Vessel Name */}
        <td>{item[9] || ""}</td> {/* VOY No */}
        <td>{item[10] || ""}</td> {/* BL No */}
        <td>{item[11] || ""}</td> {/* Boe no */}
        <td>{item[12] || ""}</td> {/* Boe date */}
        <td>{item[13] || ""}</td> {/* Destuff Date */}
        <td>{item[14] || ""}</td> {/* Package as per IGM */}
        <td>{item[15] || ""}</td> {/* Package Destuffed */}
        <td>{item[16] || ""}</td> {/* Package Type */}
        <td>{item[17] || ""}</td> {/* Movement Type */}
        <td>{item[18] || ""}</td> {/* Importer Name */}
        <td>{item[19] || ""}</td> {/* Agent Name */}
        <td>{item[20] || ""}</td> {/* Consoler */}
        <td>{item[21] || ""}</td> {/* Location */}
        <td>{item[22] || ""}</td> {/* Area */}
        <td>{item[23] || ""}</td> {/* Cargo Description */}
        <td>{item[24] || ""}</td> {/* Remarks */}
        <td>{item[25] || ""}</td> {/* Assess Value */}
        <td>{item[26] || ""}</td> {/* Duty Value */}
        <td>{item[27] || ""}</td> {/* Gate Pass Id */}
        <td>{item[28] || ""}</td> {/* CHA */}
      </tr>
    ))}
  </tbody>
</table>

    
    
    );
    const ImportFCLCustomTallyReport = ({ currentItems }) => (
      <table className="table table-bordered table-hover tableHeader">
      <thead className="text-center">
        <tr>
          <th scope="col">Sr No</th>
          <th scope="col">Container No.</th>
          <th scope="col">Size</th>
          <th scope="col">Type</th>
          <th scope="col">IGM No.</th>
          <th scope="col">Item</th>
          <th scope="col">boe no</th>
          <th scope="col">boe date</th>
          <th style={{minWidth:190}}>CHA</th>
          <th scope="col" style={{minWidth:190}}>Importer</th>
          <th scope="col">Declared Pkgs.</th>
          <th scope="col">Examed No. of Packets</th>
          <th scope="col">Percent</th>
          <th scope="col">Item Description</th>
          <th scope="col">Invoice No.</th>
          <th scope="col">Invoice Date</th>
          <th scope="col">Custom Exam WO No.</th>
          <th scope="col">WO Date</th>
          <th scope="col">Scrap Lab</th>
          <th scope="col">Equipment</th>
          <th scope="col">Remark</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {currentItems.map((item, index) => (
          <tr key={index}>
            <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
            <td>{item[0] || ""}</td> {/* Container No */}
            <td>{item[1] || ""}</td> {/* Size */}
            <td>{item[2] || ""}</td> {/* Type */}
            <td>{item[3] || ""}</td> {/* IGM No */}
            <td>{item[4] || ""}</td> {/* Item */}
            <td>{item[5] || ""}</td> {/* boe no */}
            <td>{item[6] || ""}</td> {/* boe date */}
            <td>{item[7] || ""}</td> {/* CHA */}
            <td>{item[8] || ""}</td> {/* Importer */}
            <td>{item[9] || ""}</td> {/* Declared Pkgs */}
            <td>{item[10] || ""}</td> {/* Examed No. of Packets */}
            <td>{item[11] || ""}</td> {/* Percent */}
            <td>{item[12] || ""}</td> {/* Item Description */}
            <td>{item[13] || ""}</td> {/* Invoice No */}
            <td>{item[14] || ""}</td> {/* Invoice Date */}
            <td>{item[15] || ""}</td> {/* Custom Exam WO No */}
            <td>{item[16] || ""}</td> {/* WO Date */}
            <td>{item[17] || ""}</td> {/* Scrap Lab */}
            <td>{item[18] || ""}</td> {/* Equipment */}
            <td>{item[19] || ""}</td> {/* Remark */}
          </tr>
        ))}
      </tbody>
    </table>);
    
    // const ImportLCLCargoDestuffReport = ({ currentItems }) => {
    //   // Preprocess the data to display Container No, Size, and Type only in the first row for each container
    //   const processedItems = [];
    //   const containerTracker = {};
    
    //   currentItems.forEach((item) => {
    //     const containerNo = item[0]; // Assuming item[0] is Container No
    //     if (containerTracker[containerNo]) {
    //       // If container already processed, set relevant fields to empty
    //       processedItems.push([
    //         "", // Container No
    //         "", // Size
    //         "", // Type
    //         ...item.slice(3), // Remaining columns
    //       ]);
    //     } else {
    //       // First occurrence of container
    //       containerTracker[containerNo] = true;
    //       processedItems.push(item);
    //     }
    //   });
    
    //   return (
    //     <table className="table table-bordered table-hover tableHeader">
    //       <thead className="text-center">
    //       <tr>
    //       <th scope="col">Sr No</th>
    //       <th scope="col">Container No</th>
    //       <th scope="col">Size</th>
    //       <th scope="col">Type</th>
    //       <th scope="col">Tare WT</th>
    //       <th scope="col"style={{minWidth:144}}>Gate In Date</th>
    //       <th scope="col"style={{minWidth:144}}>Destuff Date</th>
    //       <th scope="col"style={{minWidth:315}}>Agent Name</th>
    //       <th scope="col"style={{minWidth:315}}>Line</th>
    //       <th scope="col"style={{minWidth:315}}>Vessel Name</th>
    //       <th scope="col">VOY No</th>
    //       <th scope="col">IGM No</th>
    //       <th scope="col">Item No</th>
    //       <th scope="col">Manifested Weight</th>
    //       <th scope="col">Manifested Qty</th>
    //       <th scope="col">Destuff Qty</th>
    //       <th scope="col">Excess</th>
    //       <th scope="col">Short</th>
    //       <th scope="col">Weight</th>
    //       <th scope="col">Pkg Type</th>
    //       <th scope="col">Remarks</th>
    //     </tr>
    //       </thead>
    //       <tbody className="text-center">
    //         {processedItems.map((item, index) => (
    //           <tr key={index}>
    //             <td>{index + 1}</td> {/* Sr No */}
    //             <td>{item[0] || ""}</td> {/* Container No */}
    //             <td>{item[1] || ""}</td> {/* Size */}
    //             <td>{item[2] || ""}</td> {/* Type */}
    //             <td>{item[3] || ""}</td> {/* IGM No */}
    //             <td>{item[4] || ""}</td> {/* Item */}
    //             <td>{item[5] || ""}</td> {/* boe no */}
    //             <td>{item[6] || ""}</td> {/* boe date */}
    //             <td>{item[7] || ""}</td> {/* CHA */}
    //             <td>{item[8] || ""}</td> {/* Importer */}
    //             <td>{item[9] || ""}</td> {/* Declared Pkgs */}
    //             <td>{item[10] || ""}</td> {/* Examed No. of Packets */}
    //             <td>{item[11] || ""}</td> {/* Percent */}
    //             <td>{item[12] || ""}</td> {/* Item Description */}
    //             <td>{item[13] || ""}</td> {/* Invoice No */}
    //             <td>{item[14] || ""}</td> {/* Invoice Date */}
    //             <td>{item[15] || ""}</td> {/* Custom Exam WO No */}
    //             <td>{item[16] || ""}</td> {/* WO Date */}
    //             <td>{item[17] || ""}</td> {/* Scrap Lab */}
    //             <td>{item[18] || ""}</td> {/* Equipment */}
    //             <td>{item[19] || ""}</td> {/* Remark */}
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   );

    //   ImportLCLCargoDestuffSummary(currentItems);
    // };

    
const ImportLCLCargoDestuffReport = ({ currentItems }) => {
  // Preprocess the data to display Container No, Size, and Type only in the first row for each container
  const processedItems = [];
  const containerTracker = {};

  currentItems.forEach((item) => {
    const containerNo = item[0]; // Assuming item[0] is Container No
    if (containerTracker[containerNo]) {
      // If container already processed, set relevant fields to empty
      processedItems.push([
        "", // Container No
        "", // Size
        "", // Type
        "", // Tare WT
        ...item.slice(4), // Remaining columns
      ]);
    } else {
      // First occurrence of container
      containerTracker[containerNo] = true;
      processedItems.push(item);
    }
  });
  // Calculate the shipping agent-wise summary
  const agentContainerTracker = {};
  const agentContainerCount = {};

  inventoryList.forEach((i) => {
    const agent = i[7] || "Unknown"; // Shipping Agent
    const containerSize = i[1] || ""; // Container Size
    const containerNo = i[0] || ""; // Container Number

    // Initialize container tracker and count array for this agent if not already present
    agentContainerTracker[agent] = agentContainerTracker[agent] || new Set();
    agentContainerCount[agent] = agentContainerCount[agent] || [0, 0, 0, 0]; // Index 0 - Size 20, 1 - Size 22, 2 - Size 40, 3 - Size 45

    // Check if this container number has already been processed for this agent
    if (!agentContainerTracker[agent].has(containerNo)) {
      // Add this container number to the set for this agent
      agentContainerTracker[agent].add(containerNo);

      // Increment the count based on container size
      switch (containerSize) {
        case "20":
          agentContainerCount[agent][0]++;
          break;
        case "22":
          agentContainerCount[agent][1]++;
          break;
        case "40":
          agentContainerCount[agent][2]++;
          break;
        case "45":
          agentContainerCount[agent][3]++;
          break;
        default:
          break;
      }
    }
  });

  const getAgentSummary = () => {
    return Object.entries(agentContainerCount).map(([agent, sizes], index) => {
      const total = sizes.reduce((sum, count) => sum + count, 0);
      const tuesValue = sizes[0] * 1 + sizes[1] * 1 + sizes[2] * 2 + sizes[3] * 2;
      return {
        srNo: index + 1,
        agent,
        size20: sizes[0],
        size22: sizes[1],
        size40: sizes[2],
        size45: sizes[3],
        total,
        tuesValue,
      };
    });
  };

  const agentSummary = getAgentSummary();

  return (
    <div>
      <table className="table table-bordered table-hover tableHeader">
        <thead className="text-center">
          <tr>
            <th>Sr No</th>
            <th>Container No</th>
            <th>Size</th>
            <th>Type</th>
            <th>Tare WT</th>
            <th style={{ minWidth: 144 }}>Gate In Date</th>
            <th style={{ minWidth: 144 }}>Destuff Date</th>
            <th style={{ minWidth: 315 }}>Agent Name</th>
            <th style={{ minWidth: 315 }}>Line</th>
            <th style={{ minWidth: 315 }}>Vessel Name</th>
            <th>VOY No</th>
            <th>IGM No</th>
            <th>Item No</th>
            <th>Manifested Weight</th>
            <th>Manifested Qty</th>
            <th>Destuff Qty</th>
            <th>Excess</th>
            <th>Short</th>
            <th>Weight</th>
            <th>Pkg Type</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {processedItems.map((item, index) => (
            <tr key={index}>
              <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
              <td>{item[0] || ""}</td> {/* Container No */}
              <td>{item[1] || ""}</td> {/* Size */}
              <td>{item[2] || ""}</td> {/* Type */}
              <td>{item[3] || ""}</td> {/* Tare WT */}
              <td>{item[4] || ""}</td> {/* Gate In Date */}
              <td>{item[5] || ""}</td> {/* Destuff Date */}
              <td>{item[6] || ""}</td> {/* Agent Name */}
              <td>{item[7] || ""}</td> {/* Line */}
              <td>{item[8] || ""}</td> {/* Vessel Name */}
              <td>{item[9] || ""}</td> {/* VOY No */}
              <td>{item[10] || ""}</td> {/* IGM No */}
              <td>{item[11] || ""}</td> {/* Item No */}
              <td>{item[12] || ""}</td> {/* Manifested Weight */}
              <td>{item[13] || ""}</td> {/* Manifested Qty */}
              <td>{item[14] || ""}</td> {/* Destuff Qty */}
              <td>{item[15] || ""}</td> {/* Excess */}
              <td>{item[16] || ""}</td> {/* Short */}
              <td>{item[17] || ""}</td> {/* Weight */}
              <td>{item[18] || ""}</td> {/* Pkg Type */}
              <td>{item[19] || ""}</td> {/* Remarks */}
            </tr>
          ))}
        </tbody>
      </table>

            {/* Summary Table */}
            <h5>Shipping Agent Summary</h5>
            <table className="table table-bordered table-hover tableHeader">
        <thead className="text-center">
          <tr>
            <th>Sr No</th>
            <th>Shipping Agent</th>
            <th>Size 20</th>
            <th>Size 22</th>
            <th>Size 40</th>
            <th>Size 45</th>
            <th>Total</th>
            <th>TUE'S Value</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {agentSummary.map((entry, index) => (
            <tr key={index}>
              <td>{entry.srNo}</td>
              <td>{entry.agent}</td>
              <td>{entry.size20}</td>
              <td>{entry.size22}</td>
              <td>{entry.size40}</td>
              <td>{entry.size45}</td>
              <td>{entry.total}</td>
              <td>{entry.tuesValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

    const ImportLCLCargoDestuffSummary = ({ currentItems }) => {
      const [summaryData, setSummaryData] = useState([]);
    
      useEffect(() => {
        // Prepare summary data
        const agentContainerTracker = {};
        const agentContainerCount = {};
    
        currentItems.forEach((item) => {
          const agent = item[7] || 'Unknown'; // Shipping Agent
          const containerSize = item[1] || ''; // Container Size
          const containerNo = item[0] || ''; // Container Number
    
          // Initialize container tracker and count array for this agent if not already present
          if (!agentContainerTracker[agent]) {
            agentContainerTracker[agent] = new Set();
            agentContainerCount[agent] = [0, 0, 0, 0]; // Index 0 - Size 20, 1 - Size 22, 2 - Size 40, 3 - Size 45
          }
    
          // Check if this container number has already been processed for this agent
          if (!agentContainerTracker[agent].has(containerNo)) {
            // Add this container number to the set for this agent
            agentContainerTracker[agent].add(containerNo);
    
            // Increment the count based on container size
            switch (containerSize) {
              case '20':
                agentContainerCount[agent][0]++;
                break;
              case '22':
                agentContainerCount[agent][1]++;
                break;
              case '40':
                agentContainerCount[agent][2]++;
                break;
              case '45':
                agentContainerCount[agent][3]++;
                break;
              default:
                break;
            }
          }
        });
    
        // Prepare summary rows
        const summaryRows = [];
        let srNo = 1;
        let totalSize20 = 0, totalSize22 = 0, totalSize40 = 0, totalSize45 = 0;
    
        for (const [agent, sizes] of Object.entries(agentContainerCount)) {
          const totalCount = sizes.reduce((acc, sizeCount) => acc + sizeCount, 0);
          const tuesValue = sizes[0] + sizes[1] + (sizes[2] * 2) + (sizes[3] * 2);
    
          summaryRows.push({
            srNo: srNo++,
            agent,
            size20: sizes[0],
            size22: sizes[1],
            size40: sizes[2],
            size45: sizes[3],
            total: totalCount,
            tuesValue,
          });
    
          totalSize20 += sizes[0];
          totalSize22 += sizes[1];
          totalSize40 += sizes[2];
          totalSize45 += sizes[3];
        }
    
        // Add a total row
        summaryRows.push({
          srNo: 'Total',
          agent: '',
          size20: totalSize20,
          size22: totalSize22,
          size40: totalSize40,
          size45: totalSize45,
          total: totalSize20 + totalSize22 + totalSize40 + totalSize45,
          tuesValue: (totalSize20 * 1) + (totalSize22 * 1) + (totalSize40 * 2) + (totalSize45 * 2),
        });
    
        setSummaryData(summaryRows);
      }, [currentItems]);
    
      return (
        <table className="table table-bordered table-hover">
          <thead className="text-center">
            <tr>
              <th>Sr No</th>
              <th>Shipping Agent</th>
              <th>Size 20</th>
              <th>Size 22</th>
              <th>Size 40</th>
              <th>Size 45</th>
              <th>Total</th>
              <th>TUE's Value</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {summaryData.map((row, index) => (
              <tr key={index}>
                <td>{row.srNo}</td>
                <td>{row.agent}</td>
                <td>{row.size20}</td>
                <td>{row.size22}</td>
                <td>{row.size40}</td>
                <td>{row.size45}</td>
                <td>{row.total}</td>
                <td>{row.tuesValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    };








    const ImportContainerGateOutDetailedReport = ({ currentItems }) => (
      <table className="table table-bordered table-hover tableHeader">
      <thead className="text-center">
        <tr>
          <th scope="col">Sr No</th>
          <th scope="col">Cont No</th>
          <th scope="col">Size</th>
          <th scope="col">Type</th>
          <th scope="col">ISO Code</th>
          <th scope="col">Cargo Type</th>
          <th scope="col">Scan Type</th>
          <th scope="col">FCL/LCL</th>
          <th scope="col">Movement Type</th>
          <th scope="col">IGM No</th>
          <th scope="col">Item No</th>
          <th scope="col">Gross Wt</th>
          <th scope="col">Gate In Date</th>
          <th scope="col">Gate Out Date</th>
          <th scope="col" style={{minWidth:315}}>S.Line</th>
          <th scope="col" style={{minWidth:315}}>CHA</th>
          <th scope="col" style={{minWidth:315}}>Importer</th>
          <th scope="col">VCN No.</th>
          <th scope="col">Voy No</th>
          <th scope="col" style={{minWidth:180}}>Vessel Name</th>
          <th scope="col">Port</th>
          <th scope="col">BOE No.</th>
          <th scope="col">BOE Date</th>
          <th scope="col">Truck No.</th>
          <th scope="col">Remarks</th>
          <th scope="col">Dwell Time in Teus</th>
          <th scope="col">BL No.</th>
          <th scope="col">Surveyor</th>
          <th scope="col">Out Dwell Time (Dy:Hr:Min)</th>
          <th scope="col" style={{minWidth:315}}>Cargo Description</th>
          <th scope="col">Nominated Customer</th>
          <th scope="col">Yard</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {currentItems.map((item, index) => (
          <tr key={index}>
            <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
            <td>{item[0] || ""}</td> {/* Cont No */}
            <td>{item[1] || ""}</td> {/* Size */}
            <td>{item[2] || ""}</td> {/* Type */}
            <td>{item[3] || ""}</td> {/* ISO Code */}
            <td>{item[4] || ""}</td> {/* Cargo Type */}
            <td>{item[5] || ""}</td> {/* Scan Type */}
            <td>{item[6] || ""}</td> {/* FCL/LCL */}
            <td>{item[7] || ""}</td> {/* Movement Type */}
            <td>{item[8] || ""}</td> {/* IGM No */}
            <td>{item[9] || ""}</td> {/* Item No */}
            <td>{item[10] || ""}</td> {/* Gross Wt */}
            <td>{item[11] || ""}</td> {/* Gate In Date */}
            <td>{item[12] || ""}</td> {/* Gate Out Date */}
            <td>{item[13] || ""}</td> {/* S.Line */}
            <td>{item[14] || ""}</td> {/* CHA */}
            <td>{item[15] || ""}</td> {/* Importer */}
            <td>{item[16] || ""}</td> {/* VCN No. */}
            <td>{item[17] || ""}</td> {/* Voy No */}
            <td>{item[18] || ""}</td> {/* Vessel Name */}
            <td>{item[19] || ""}</td> {/* Port */}
            <td>{item[20] || ""}</td> {/* BOE No. */}
            <td>{item[21] || ""}</td> {/* BOE Date */}
            <td>{item[22] || ""}</td> {/* Truck No. */}
            <td>{item[23] || ""}</td> {/* Remarks */}
            <td>{item[24] || ""}</td> {/* Dwell Time in Teus */}
            <td>{item[25] || ""}</td> {/* BL No. */}
            <td>{item[26] || ""}</td> {/* Surveyor */}
            <td>{item[27] || ""}</td> {/* Out Dwell Time (Dy:Hr:Min) */}
            <td>{item[28] || ""}</td> {/* Cargo Description */}
            <td>{item[29] || ""}</td> {/* Nominated Customer */}
            <td>{item[30] || ""}</td> {/* Yard */}
          </tr>
        ))}
      </tbody>
    </table>
    );







    const YardBalanceReportDetails = ({ currentItems }) => (
      <table className="table table-bordered table-hover tableHeader">
      <thead className="text-center">
        <tr>
          <th scope="col">Sr. No.</th>
          <th scope="col">Container No.</th>
          <th scope="col">Gate In Date</th>
          <th scope="col">IGM NO.</th>
          <th scope="col" style={{minWidth:135}}>IGM DATE</th>
          <th scope="col">IGM LINE NO.</th>
          <th scope="col">IGM SUBLINE NO.</th>
          <th scope="col">B.E. NO.</th>
          <th scope="col" style={{minWidth:135}}>B.E. DATE</th>
          <th scope="col" style={{minWidth:315}}>Importer Name</th>
          <th scope="col">Goods Cargo Description</th>
          <th scope="col" style={{minWidth:315}}>CHA Name</th>
          <th scope="col">CHA Code</th>
          <th scope="col">Container Size</th>
          <th scope="col">FCL/LCL</th>
          <th scope="col">B/L No.</th>
          <th scope="col" style={{minWidth:135}}>B/L Date</th>
          <th scope="col">CFS Name</th>
          <th scope="col">Container Type</th>
          <th scope="col">Delivery Mode Loaded/Destuff</th>
          <th scope="col">Vessel Name</th>
          <th scope="col">Vessel Berthing Date</th>
          <th scope="col">Port Out Date and Time</th>
          <th scope="col">VCN No.</th>
          <th scope="col">VOY No.</th>
          <th scope="col" style={{minWidth:315}}>Line Name</th>
          <th scope="col" style={{minWidth:315}}>Agent Name</th>
          <th scope="col">Port</th>
          <th scope="col">Agent Seal</th>
          <th scope="col">Custom Seal</th>
          <th scope="col">Pkgs</th>
          <th scope="col">Weight</th>
          <th scope="col">Gate In Remark</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {currentItems.map((item, index) => (
          <tr key={index}>
            <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
            <td>{item[0] || ""}</td> {/* Container No. */}
            <td>{item[1] || ""}</td> {/* Container Gate In Date and Time */}
            <td>{item[2] || ""}</td> {/* IGM NO. */}
            <td>{item[3] || ""}</td> {/* IGM DATE */}
            <td>{item[4] || ""}</td> {/* IGM LINE NO. */}
            <td>{item[5] || ""}</td> {/* IGM SUBLINE NO. */}
            <td>{item[6] || ""}</td> {/* B.E. NO. */}
            <td>{item[7] || ""}</td> {/* B.E. DATE */}
            <td>{item[8] || ""}</td> {/* Importer Name */}
            <td>{item[9] || ""}</td> {/* Goods Cargo Description */}
            <td>{item[10] || ""}</td> {/* CHA Name */}
            <td>{item[11] || ""}</td> {/* CHA Code */}
            <td>{item[12] || ""}</td> {/* Container Size */}
            <td>{item[13] || ""}</td> {/* FCL/LCL */}
            <td>{item[14] || ""}</td> {/* B/L No. */}
            <td>{item[15] || ""}</td> {/* B/L Date */}
            <td>{item[16] || ""}</td> {/* CFS Name */}
            <td>{item[17] || ""}</td> {/* Container Type */}
            <td>{item[18] || ""}</td> {/* Delivery Mode Loaded/Destuff */}
            <td>{item[19] || ""}</td> {/* Vessel Name */}
            <td>{item[20] || ""}</td> {/* Vessel Berthing Date */}
            <td>{item[21] || ""}</td> {/* Port Out Date and Time */}
            <td>{item[22] || ""}</td> {/* VCN No. */}
            <td>{item[23] || ""}</td> {/* VOY No. */}
            <td>{item[24] || ""}</td> {/* Line */}
            <td>{item[25] || ""}</td> {/* Agent */}
            <td>{item[26] || ""}</td> {/* Port */}
            <td>{item[27] || ""}</td> {/* Agent Seal */}
            <td>{item[28] || ""}</td> {/* Custom Seal */}
            <td>{item[29] || ""}</td> {/* Pkgs */}
            <td>{item[30] || ""}</td> {/* Weight */}
            <td>{item[31] || ""}</td> {/* Gate In Remark */}
          </tr>
        ))}
      </tbody>
    </table>
    
    );
    const ScanContainerReport = ({ currentItems }) => (
      <table className="table table-bordered table-hover tableHeader">
     <thead className="text-center">
  <tr>
    <th scope="col">SR No.</th>
    <th scope="col">IGM_NO.</th>
    <th scope="col">ITEM_NO.</th>
    <th scope="col">BL_NO.</th>
    <th scope="col">CONT_NO.</th>
    <th scope="col">CONT_SIZE</th>
    <th scope="col">CONT_TYPE</th>
    <th scope="col" style={{minWidth:180}}>GATE_IN DATE</th>
    <th scope="col">SCAN_OUT_DATE</th>
    <th scope="col">SCAN_IN_DATE</th>
    <th scope="col" style={{minWidth:315}}>IMPORTER_NAME</th>
  </tr>
</thead>

      <tbody className="text-center">
        {currentItems.map((item, index) => (
          <tr key={index}>
            <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
            <td>{item[0] || ""}</td> {/* Container No. */}
            <td>{item[1] || ""}</td> {/* Container Gate In Date and Time */}
            <td>{item[2] || ""}</td> {/* IGM NO. */}
            <td>{item[3] || ""}</td> {/* IGM DATE */}
            <td>{item[4] || ""}</td> {/* IGM LINE NO. */}
            <td>{item[5] || ""}</td> {/* IGM SUBLINE NO. */}
            <td>{item[6] || ""}</td> {/* B.E. NO. */}
            <td>{item[7] || ""}</td> {/* B.E. DATE */}
            <td>{item[8] || ""}</td> {/* Importer Name */}
            <td>{item[9] || ""}</td> {/* Goods Cargo Description */}
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
                        timeFormat="HH:mm" // Display time in 24-hour format
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
                              Account Holder
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

{/* <div style={{ color: 'red' }} className="error-message">{nocErrors.importerName}</div> */}
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

{/* <div style={{ color: 'red' }} className="error-message">{nocErrors.cha}</div> */}
                            </FormGroup>
                        </Col>
    </Row>

<Row>
<Col md={2}>
      <FormGroup>
        <label className="forlabel bold-label" htmlFor="igmNo">
       IGM No
        </label>
        <input
          className="form-control"
          type="text"
          id="igmNo"
          maxLength={15}
          name="igmNo"
          value={igmNo}
          onChange={(e)=>setIgmNo(e.target.value)}
        />
      </FormGroup>
    </Col>

    <Col md={2}>
      <FormGroup>
        <label className="forlabel bold-label" htmlFor="itemNo">
       Item No
        </label>
        <input
          className="form-control"
          type="text"
          id="itemNo"
          maxLength={15}
          name="itemNo"
          value={itemNo}
          onChange={(e)=>setItemNo(e.target.value)}
        />
      </FormGroup>
    </Col>
    <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="importerName">
                                Shipping Line
                                </label>
                                <Select
                                    value={{ value: shippingLine, label: shippingLineName }}
                                    onChange={handleShippingLineChange}
                                    onInputChange={getShippingLineData}
                                    options={impData}
                                    placeholder="Select importerName"
                                    isClearable
                                    id="importerName"
                                    vesselName="importerName"

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

{/* <div style={{ color: 'red' }} className="error-message">{nocErrors.importerName}</div> */}
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
    {selectedReport === "Import Long Standing Report" && <ImportLongStandingReportTable currentItems={currentItems} />}
    {selectedReport === "SealCutting Report" && <SealCuttingReport currentItems={currentItems} />}
    {selectedReport === "Import GateIn Container detailed Report" && <ImportGateInContarinerDetailedReport currentItems={currentItems} />}
    {selectedReport === "Hold Release Report" && <HoldReleasedReport currentItems={currentItems} />}
    {selectedReport === "LCL Cargo Balance Inventory Report" && <LCLCargoInvetoryBalance currentItems={currentItems} />}
    {selectedReport === "Import Manual GateIn Report" && <ImportManualGateInReport currentItems={currentItems} />}
    {selectedReport === "Loaded To Destuff Empty Inventory" && <LoadedToDistuffEmptyContainer currentItems={currentItems} />}
    {selectedReport === "WEIGHMENT REPORT" && <WeighmentReport currentItems={currentItems} />}
    {selectedReport === "TRANSPORTER WISE TUES REPORT" && <TransporterWiseTues currentItems={currentItems} />}
    {selectedReport === "LCL Zero Payment" && <LCLZeroPaymetReport currentItems={currentItems} />}
    {selectedReport === "Import FCL Destuff Balance Report" && <ImportFCLDestuffBalanceReport currentItems={currentItems} />}
    {selectedReport === "Import LCL Cargo Delivery Report" && <ImportLCLCargoDeliveryReport currentItems={currentItems} />}
    {selectedReport === "Import FCL Custom Tally Sheet Report" && <ImportFCLCustomTallyReport currentItems={currentItems} />}
    {selectedReport === "Import LCL Cargo Destuff Report" && <ImportLCLCargoDestuffReport currentItems={currentItems} />}
    {selectedReport === "Import GateOut Container detailed Report" && <ImportContainerGateOutDetailedReport currentItems={currentItems} />}
    {selectedReport === "Yard Balance Report Details" && <YardBalanceReportDetails currentItems={currentItems} />}
    {selectedReport === "Scan Container Report" && <ScanContainerReport currentItems={currentItems} />}
    {selectedReport === "Import BOE Wise Gate Out Report" && <ImportBOEWiseGateOutReport currentItems={currentItems} />}
    
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
  // <div>No Data Available</div>
  <></>
)}

      </>
  )
}
