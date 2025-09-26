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
export default function FinanceOperationsReport() {

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
    const [sbNo ,setSbNo] =useState('');
    const [bookingNo ,setBookingNo] =useState('');
    const [cha,setCha]=useState('');
    const [accountHolder ,setAccountHolder]=useState('');
    const [exporterName,setExporterName] = useState('');
    const [selectedReport, setSelectedReport] = useState(""); // Track selected radio button
    const [chaName, setChaName] = useState('');
    const [isoData, setISOData] = useState([]);
    const [shippingLineName, setShippingLineName] = useState("");
    const [accountHolderName, setAccountHolderName] = useState("");
const [impData, setImpData] = useState([]);
const [accountHolderData, setAccountHolderData] = useState([]);



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
      
        axios.get(`${ipaddress}api/exportOperationalReports/searchAccountHolder?companyId=${companyid}&branchId=${branchId}&partyName=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
      
                console.log("response.data",data);
                const portOptions = data.map(port => ({ 
                    value: port[0],
                    label: port[1],
                    //label: port.partyName,
                    impN:port[1]
                }))
                setAccountHolderData(portOptions);
            })
            .catch((error) => {
      
            })
      }
      
      const reports = [
        "Invoice Sales Register Report",  
        "Invoice Register Container Wise Report",  
        "Credit Note Report",  
        // "Import Monthly Revenue Report",
        // "Export Monthly Revenue Report",
        "TDS Report",
        "Daily Receipt Report"

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
  selectedReport !== 'Import Long Standing Report ' &&
  selectedReport !== 'LCL Cargo Balance Inventory Report' &&
  selectedReport !== 'Import FCL Destuff Balance Report' &&
  selectedReport !== 'Yard Balance Report Details' &&
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
            `${ipaddress}api/financeReports/getFinanceReports?companyId=${companyid}&branchId=${branchId}&uname=${username}&type=${type}&cname=${companyname}&bname=${branchname}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&billParty=${accountHolder}&selectedReport=${selectedReport}`,
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
                `${ipaddress}api/financeReports/show?companyId=${companyid}&branchId=${branchId}&uname=${username}&type=${type}&cname=${companyname}&bname=${branchname}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&billParty=${accountHolder}&selectedReport=${selectedReport}`,
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
        setSbNo('');
        setBookingNo('');
        setStartDate('');
        setEndDate(new Date());
        setInventoryList([]);
        setSelectedReport("");
        setCha('');
        setChaName('');
        setAccountHolder('');
        setAccountHolderName('');
        setExporterName('');
        setShippingLineName('');
      }

      const ExportCargoBalanceCragoReport = ({ currentItems }) => {
        return (
          <table className="table table-bordered table-hover tableHeader">
            <thead className="text-center">
              <tr>
                <th scope="col">Sr No</th>
                <th scope="col">Shipping Bill No</th>
                <th scope="col">Shipping Bill Date</th>
                <th scope="col" style={{minWidth:270}}>Cargo Description</th>
                <th scope="col" style={{minWidth:270}}>CHA</th>
                <th scope="col" style={{minWidth:270}}>Account Holder</th>
                <th scope="col" style={{minWidth:270}}>Exporter</th>
                <th scope="col">Dec Pkgs</th>
                <th scope="col">Dec Wt</th>
                <th scope="col">Carting Date</th>
                <th scope="col">Bal Pkgs</th>
                <th scope="col">Bal Wt</th>
                <th scope="col">Bal Area</th>
                <th scope="col">WH Location</th>
                <th scope="col">Storage Space</th>
                <th scope="col">No Of Days</th>
                <th scope="col">POD</th>
                <th scope="col">FOB</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
                  <td>{item[0] || ""}</td>  {/* Shipping Bill No */}
                  <td>{item[1] || ""}</td>  {/* Shipping Bill Date */}
                  <td>{item[2] || ""}</td>  {/* Cargo Description */}
                  <td>{item[3] || ""}</td>  {/* CHA */}
                  <td>{item[4] || ""}</td>  {/* Account Holder */}
                  <td>{item[5] || ""}</td>  {/* Exporter */}
                  <td>{item[6] || ""}</td>  {/* Dec Pkgs */}
                  <td>{item[7] || ""}</td>  {/* Dec Wt */}
                  <td>{item[8] || ""}</td>  {/* Carting Date */}
                  <td>{item[9] || ""}</td>  {/* Bal Pkgs */}
                  <td>{item[10] || ""}</td> {/* Bal Wt */}
                  <td>{item[11] || ""}</td> {/* Bal Area */}
                  <td>{item[12] || ""}</td> {/* WH Location */}
                  <td>{item[13] || ""}</td> {/* Storage Space */}
                  <td>{item[14] || ""}</td> {/* No Of Days */}
                  <td>{item[15] || ""}</td> {/* POD */}
                  <td>{item[16] || ""}</td> {/* FOB */}
                </tr>
              ))}
            </tbody>
          </table>
        );
      };
      

      const TdsReport = ({ currentItems }) => (
        <table className="table table-bordered table-hover tableHeader">
        <thead className="text-center">
          <tr>
            <th scope="col">SR NO</th>
            <th scope="col">INVOICE REF NO</th>
            <th scope="col">TDS NO</th>
            <th scope="col">INVOICE DATE</th>
            <th scope="col" style={{minWidth:270}}>BILLING PARTY</th>
            <th scope="col" style={{minWidth:270}}>CHA NAME</th>
            <th scope="col" style={{minWidth:270}}>IMPORTER NAME</th>
            <th scope="col">BASIC AMOUNT</th>
            <th scope="col">GST</th>
            <th scope="col">TOTAL INVOICE AMOUNT</th>
            <th scope="col">OTHER DEDUCTION AMOUNT</th>
            <th scope="col" style={{minWidth:126}}>EFT</th>
            <th scope="col" style={{minWidth:126}}>CHEQUE</th>
            <th scope="col" style={{minWidth:126}}>TDS</th>
            <th scope="col" style={{minWidth:126}}>CASH</th>
            <th scope="col" style={{minWidth:126}}>RTGS</th>
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
            </tr>
          ))}
        </tbody>
      </table>
      );

      const CartingPendency = ({ currentItems }) => (
        <table className="table table-bordered table-hover tableHeader">
        <thead className="text-center">
            <tr>
                <th scope="col">Sr.No.</th>
                <th scope="col">Shipping Bill No</th>
                <th scope="col">Shipping Bill Date</th>
                <th scope="col" style={{minWidth:360}}>EXPORTER</th>
                <th scope="col" style={{minWidth:360}}>CHA</th>
                <th scope="col" style={{minWidth:360}}>Account Holder</th>
                <th scope="col" style={{minWidth:162}}>Truck No</th>
                <th scope="col">Gate In Date</th>
                <th scope="col" style={{minWidth:180}}>Cargo Description</th>
                <th scope="col">SB Pkgs</th>
                <th scope="col">SB WT</th>
                <th scope="col">PKG WT</th>
                <th scope="col">JO PKGS</th>
                <th scope="col">JO WT</th>
                <th scope="col">Pkg Type</th>
                <th scope="col">JO NO</th>
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
                </tr>
            ))}
        </tbody>
    </table>
    
      );

      const CargoBackToTown = ({ currentItems }) => (
        <table className="table table-bordered table-hover tableHeader">
        <thead className="text-center">
          <tr>
            <th scope="col">SR NO</th>
            <th scope="col">TRUCK NO</th>
            <th scope="col">SHIPPING BILL NO</th>
            <th scope="col" style={{minWidth:360}}>AGENT NAME</th>
            <th scope="col" style={{minWidth:360}}>CHA NAME</th>
            <th scope="col" style={{minWidth:171}}>OUT DATE</th>
            <th scope="col">PACKAGES</th>
            <th scope="col">WEIGHT</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
              <td>{item[0] || ""}</td> {/* Truck No */}
              <td>{item[1] || ""}</td> {/* Shipping Bill No */}
              <td>{item[2] || ""}</td> {/* Agent Name */}
              <td>{item[3] || ""}</td> {/* CHA Name */}
              <td>{item[4] || ""}</td> {/* Out Date */}
              <td>{item[5] || ""}</td> {/* Packages */}
              <td>{item[6] || ""}</td> {/* Weight */}
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
              <td>{index + 1}</td>
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

      const MovementPendancy = ({ currentItems }) => (
        <table className="table table-bordered table-hover tableHeader">
        <thead className="text-center">
          <tr>
            <th scope="col">SR. NO.</th>
            <th scope="col">CONT NO</th>
            <th scope="col">CONT SIZE</th>
            <th scope="col" style={{minWidth:360}}>LINE</th>
            <th scope="col">SHIPPING BILL</th>
            <th scope="col" style={{minWidth:360}}>CHA</th>
            <th scope="col" style={{minWidth:360}}>EXPORTER</th>
            <th scope="col" style={{minWidth:180}}>CARGO DETAILS</th>
            <th scope="col">STUFF ORDER DATE</th>
            <th scope="col">MOVEMENT ORDER DATE</th>
            <th scope="col">CUTOFF DATE</th>
            <th scope="col">VCN_NO</th>
            <th scope="col">VESSEL NAME</th>
            <th scope="col">NATURE</th>
            <th scope="col">Terminal</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
              <td>{item[0] || ""}</td> {/* CONT NO */}
              <td>{item[1] || ""}</td> {/* CONT SIZE */}
              <td>{item[2] || ""}</td> {/* LINE */}
              <td>{item[3] || ""}</td> {/* SHIPPING BILL */}
              <td>{item[4] || ""}</td> {/* CHA */}
              <td>{item[5] || ""}</td> {/* EXPORTER */}
              <td>{item[6] || ""}</td> {/* CARGO DETAILS */}
              <td>{item[7] || ""}</td> {/* STUFF ORDER DATE */}
              <td>{item[8] || ""}</td> {/* MOVEMENT ORDER DATE */}
              <td>{item[9] || ""}</td> {/* CUTOFF DATE */}
              <td>{item[10] || ""}</td> {/* VCN_NO */}
              <td>{item[11] || ""}</td> {/* VESSEL NAME */}
              <td>{item[12] || ""}</td> {/* NATURE */}
              <td>{item[13] || ""}</td> {/* Terminal */}
            </tr>
          ))}
        </tbody>
      </table>
      
      );

   
const columnsHeader = [
  "SR NO",
		        	    "BILL TO",
		        	    "BILLING PARTY",
		        	    "IMPORTER/EXPORTER/CONSIGNEE NAME",
		        	    "LINE NAME",
		        	    "CHA NAME",
		        	    "ACCOUNT HOLDER",
		        	    "IGM/SB NO",
		        	    "ITEM NO",
		        	    "CONT NO",
		        	    "CONT SIZE",
		        	    "CONT TYPE",
		        	    "ENBLCK STATUS",
		        	    "FCL LCL MODE",
		        	    "CARGO WT",
		        	    "TARE WT",
		        	    "GROSS WT",
		        	    "AREA",
		        	    "LCL DESTUFF DATE",
		        	    "CARGO TYPE",
		        	    "GATE IN DATE",
		        	    "GATE OUT DATE",
		        	    "NO OF ITEMS",
		        	    "CARGO COMMODITY",
		        	    "INVOICE REF NO",
		        	    "INVOICE DATE",
		        	    "PAYMENT MODE",
		        	    "LOADED / DESTUFF",
		        	    "DPD/NON DPD (IMPORT)",
		        	    "BUFFER/DOCK STUFF (EXPORT)",
		        	    "EMPTY GATE IN",
		        	    "EMPTY GATE OUT",
		        	    "TOTAL NO OF DAYS",
		        	    "FREE DAYS",
		        	    "CHARGEABLE DAYS",
		        	    "BILL RATE",
		        	    "TOTAL INV AMOUNT",
		        	    "CGST",
		        	    "SGST",
		        	    "IGST",
];


const InvoiceSalesContainerWiseReport = ({ currentItems }) => {
  const [dynamicHeaders, setDynamicHeaders] = useState([]);
  const [serviceMap, setServiceMap] = useState(new Map());

  useEffect(() => {
    const newDynamicHeaders = new Set();
    const newServiceMap = new Map();

    currentItems.forEach((resultData) => {
      if (resultData.length > 0) {
        const totServices = resultData[3]?.toString();
        const invoiceNo = resultData[0]?.toString();
        const container = resultData[1]?.toString();

        if (totServices) {
          const serviceTokens = totServices.split(",");

          serviceTokens.forEach((serv) => {
            const fields = serv.split("~");

            if (fields.length > 4) {
              const serviceShortDesc = fields[4]?.trim();
              const id = fields[0]?.trim();
              const mainValue = `${invoiceNo}~${container}~${serviceShortDesc}`;

              // Add to service map
              newServiceMap.set(mainValue, (newServiceMap.get(mainValue) || 0) + 1);

              // Add to dynamic headers
              newDynamicHeaders.add(serviceShortDesc);
            } else {
              console.warn("Error: tot_services does not contain enough elements.");
            }
          });
        }
      }
    });

    // Update state
    setDynamicHeaders(Array.from(newDynamicHeaders));
    setServiceMap(newServiceMap);
  }, [currentItems]);

  const combinedHeaders = [...columnsHeader, ...dynamicHeaders];

  return (
    <table className="table table-bordered table-hover tableHeader">
      <thead className="text-center">
        <tr>
          {combinedHeaders.map((header, index) => (
            <th key={index} scope="col">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody className="text-center">
        {currentItems.map((item, rowIndex) => (
          <tr key={rowIndex}>
            <td>{((currentPage - 1) * itemsPerPage) + rowIndex + 1}</td>
            <td>{item[28]}</td> {/* CONT NO */}
            <td>{item[29]}</td> {/* CONT SIZE */}
            <td>{item[0] || ""}</td> {/* Stuffing JOB ORDER DATE */}
            <td>{item[1] || ""}</td> {/* CARGO COMMODITY */}
            <td>{item[2] || ""}</td> {/* AGENT NAME */}
            <td>{item[3] || ""}</td> {/* STUFFED WT */}
            <td>{item[4] || ""}</td> {/* TARE WT */}
            <td>{item[5] || ""}</td>
            <td>{item[6] || ""}</td>
            <td>{item[7] || ""}</td>
            <td>{item[8] || ""}</td>
            <td>{""}</td>
            <td>{item[33] || ""}</td>
            <td>{item[9] || ""}</td>
            <td>{item[32] || ""}</td>
            <td>{item[10] || ""}</td>
            <td>{item[31] || ""}</td>
            <td>{item[11] || ""}</td>
            <td>{item[12] || ""}</td>
            <td>{item[13] || ""}</td>
            <td>{item[14] || ""}</td>
            <td>{  ""}</td>
            <td>{item[15] || ""}</td>
            <td>{item[17] || ""}</td>
            <td>{item[18] || ""}</td>
            <td>{item[30] || ""}</td>
            <td>{item[34] || ""}</td>
            <td>{item[35] || ""}</td>
            <td>{item[36] || ""}</td>
            <td>{item[37] || ""}</td>
            <td>{item[38] || ""}</td>
            {dynamicHeaders.map((dynamicHeader, dynIndex) => {
              const invoiceNo = item[0];
              const container = item[1];
              const mainValue = `${invoiceNo}~${container}~${dynamicHeader}`;
              const count = serviceMap.get(mainValue) || 0;
              return <td key={dynIndex}>{count}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};




   

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
    





    const ExportContainerOutBased = ({ currentItems }) => (
      <table className="table table-bordered table-hover tableHeader">
      <thead className="text-center">
        <tr>
          <th scope="col">Sr No</th>
          <th scope="col">SB No</th>
          <th scope="col" style={{minWidth:171}}>SB Date</th>
          <th scope="col">Pack</th>
          <th scope="col">Stuff Pack</th>
          <th scope="col">Pack Type</th>
          <th scope="col">MCIPCIN</th>
          <th scope="col">Cont No</th>
          <th scope="col">Cont Size</th>
          <th scope="col">Stuff Order Date</th>
          <th scope="col">Seal No 1</th>
          <th scope="col">Seal No 2</th>
          <th scope="col">SF Status</th>
          <th scope="col">ASR Error</th>
          <th scope="col">Officer Approve Status</th>
          <th scope="col" style={{minWidth:171}}>Out Date</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {currentItems.map((item, index) => (
          <tr key={index}>
           <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
            <td>{item[0] || ""}</td> {/* SB No */}
            <td>{item[1] || ""}</td> {/* SB Date */}
            <td>{item[2] || ""}</td> {/* Pack */}
            <td>{item[3] || ""}</td> {/* Stuff Pack */}
            <td>{item[4] || ""}</td> {/* Pack Type */}
            <td>{item[5] || ""}</td> {/* MCIPCIN */}
            <td>{item[6] || ""}</td> {/* Cont No */}
            <td>{item[7] || ""}</td> {/* Cont Size */}
            <td>{item[8] || ""}</td> {/* Stuff Order Date */}
            <td>{item[9] || ""}</td> {/* Seal No 1 */}
            <td>{item[10] || ""}</td> {/* Seal No 2 */}
            <td>{item[11] || ""}</td> {/* SF Status */}
            <td>{item[12] || ""}</td> {/* ASR Error */}
            <td>{item[13] || ""}</td> {/* Officer Approve Status */}
            <td>{item[14] || ""}</td> {/* Out Date */}
          </tr>
        ))}
      </tbody>
    </table>
    
    
    );
  

    const InvoiceSalesRegister = ({ currentItems }) => {
        const processedItems = [];
        const importerTracker = {};
        const sacCodeTracker = {};  // Tracker for SAC Code-wise summary
      
        inventoryList.forEach((item) => {
          const importerName = item[4]; // Assuming item[4] is Importer Name
          if (importerTracker[importerName]) {
            processedItems.push([
              "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""
            ]);
          } else {
            importerTracker[importerName] = true;
            processedItems.push(item);
          }
        });
      
        // Summary Logic for Importers and SAC Codes
        const importerSummaryTracker = {};
        let totalAmount = 0;
        let totalCgst = 0;
        let totalSgst = 0;
        let totalIgst = 0;
      
        // SAC Code-wise summary
        let totalCgstBySac = 0;
        let totalSgstBySac = 0;
        let totalIgstBySac = 0;
      
        inventoryList.forEach((item) => {
          const importerName = item[4] || "Unknown";
          const sacCode = item[27] || "Unknown";
          const taxableAmount = parseFloat(item[16] || 0);
          const cgst = item[17] === "Y" ? taxableAmount / 2 : 0;
          const sgst = item[18] === "Y" ? taxableAmount / 2 : 0;
          const igst = item[19] === "Y" ? taxableAmount : 0;
      
          // Importer Summary Tracking
          if (!importerSummaryTracker[importerName]) {
            importerSummaryTracker[importerName] = [0, 0, 0, 0]; // [Taxable Amount, CGST, SGST, IGST]
          }
          const summaryData = importerSummaryTracker[importerName];
          summaryData[0] += taxableAmount;
          summaryData[1] += cgst;
          summaryData[2] += sgst;
          summaryData[3] += igst;
      
          // SAC Code-wise Summary Tracking
          if (!sacCodeTracker[sacCode]) {
            sacCodeTracker[sacCode] = [0, 0, 0, 0]; // [Taxable Amount, CGST, SGST, IGST]
          }
          const sacSummaryData = sacCodeTracker[sacCode];
          sacSummaryData[0] += taxableAmount;
          sacSummaryData[1] += cgst;
          sacSummaryData[2] += sgst;
          sacSummaryData[3] += igst;
      
          totalAmount += taxableAmount;
          totalCgst += cgst;
          totalSgst += sgst;
          totalIgst += igst;
      
          totalCgstBySac += cgst;
          totalSgstBySac += sgst;
          totalIgstBySac += igst;
        });
      
        // Format the summary data
        const importerSummary = Object.entries(importerSummaryTracker).map(([importerName, [amount, cgst, sgst, igst]], index) => ({
          srNo: index + 1,
          importerName,
          taxableAmount: amount,
          cgst,
          sgst,
          igst,
        }));
      
        const sacCodeSummary = Object.entries(sacCodeTracker).map(([sacCode, [amount, cgst, sgst, igst]], index) => ({
          srNo: index + 1,
          sacCode,
          taxableAmount: amount,
          cgst,
          sgst,
          igst,
        }));
      
        // Render the tables
        return (
          <div>
            <table className="table table-bordered table-hover tableHeader">
              <thead className="text-center">
                <tr>
                  <th>Sr No</th>
                  <th style={{minWidth:153}}>Invoice Date</th>
                  <th>Invoice Debit Note No</th>
                  <th>Invoice Debit Note Flag</th>
                  <th>Reference No</th>
                  <th style={{minWidth:360}}>Importer Name</th>
                  <th>Document No</th>
                  <th style={{minWidth:360}}>Billing Party</th>
                  <th style={{minWidth:360}}>Address1</th>
                  <th style={{minWidth:360}}>Address2</th>
                  <th style={{minWidth:360}}>Address3</th>
                  <th style={{minWidth:360}}>Address4</th>
                  <th>VAT TIN No</th>
                  <th>CST No</th>
                  <th>GST No</th>
                  <th style={{minWidth:360}}>Charge Name</th>
                  <th>Bill Wise Detail</th>
                  <th>Amount</th>
                  <th>CGST</th>
                  <th>SGST</th>
                  <th>IGST</th>
                  <th>Credit Period</th>
                  <th style={{minWidth:360}}>Narration</th>
                  <th>SAC Code</th>
                  <th>Remark</th>
                  <th>IRN</th>
                  <th>FCL/LCL</th>
                  <th>Footer Remarks</th>
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
                  </tr>
                ))}
              </tbody>
            </table>
      
            {/* Importer Summary Table */}
            <h5>Importer Summary</h5>
            <table className="table table-bordered table-hover tableHeader">
              <thead className="text-center">
                <tr>
                  <th>Sr No</th>
                  <th>Importer Name</th>
                  <th>Taxable Amount</th>
                  <th>CGST</th>
                  <th>SGST</th>
                  <th>IGST</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {importerSummary.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.srNo}</td>
                    <td>{entry.importerName}</td>
                    <td>{entry.taxableAmount.toFixed(2)}</td>
                    <td>{entry.cgst.toFixed(2)}</td>
                    <td>{entry.sgst.toFixed(2)}</td>
                    <td>{entry.igst.toFixed(2)}</td>
                  </tr>
                  
                ))}

<tr>
                  <td colSpan="2"><strong>Total</strong></td>
                  <td>{totalAmount.toFixed(2)}</td>
                  <td>{totalCgst.toFixed(2)}</td>
                  <td>{totalSgst.toFixed(2)}</td>
                  <td>{totalIgst.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
      
            {/* SAC Code-wise Summary Table */}
            <h5>SAC Code Summary</h5>
            <table className="table table-bordered table-hover tableHeader">
              <thead className="text-center">
                <tr>
                  <th>Sr No</th>
                  <th>SAC Code</th>
                  {/* <th>Taxable Amount</th> */}
                  <th>CGST</th>
                  <th>SGST</th>
                  <th>IGST</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {sacCodeSummary.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.srNo}</td>
                    <td>{entry.sacCode}</td>
                    {/* <td>{entry.taxableAmount.toFixed(2)}</td> */}
                    <td>{entry.cgst.toFixed(2)}</td>
                    <td>{entry.sgst.toFixed(2)}</td>
                    <td>{entry.igst.toFixed(2)}</td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr>
                  <td colSpan="2"><strong>Total</strong></td>
                  {/* <td>{totalAmount.toFixed(2)}</td> */}
                  <td>{totalCgstBySac.toFixed(2)}</td>
                  <td>{totalSgstBySac.toFixed(2)}</td>
                  <td>{totalIgstBySac.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      };
      
      





const ExportCartingReport = ({ currentItems }) => {
  // Maps for tracking data
  const agentSbCartingMap = {}; // Map for agents -> SB numbers -> Carting IDs
  const agentTotals = {}; // Map for agent totals: [0] - weight, [1] - area, [2] - SB count

  // Populate the maps
  inventoryList.forEach((i) => {
    const agent = i[3] || "Unknown"; // Shipping Agent
    const sbno = i[0] || ""; // SB Number
    const cartingId = i[19] || ""; // Carting ID
    const weight = i[14] ? parseFloat(i[14]) : 0.0; // Weight
    const area = i[15] ? parseFloat(i[15]) : 0.0; // Area

    if (!agentSbCartingMap[agent]) {
      agentSbCartingMap[agent] = {};
    }

    if (!agentSbCartingMap[agent][sbno]) {
      agentSbCartingMap[agent][sbno] = new Set();
    }

    agentSbCartingMap[agent][sbno].add(cartingId);

    if (!agentTotals[agent]) {
      agentTotals[agent] = [0, 0, 0]; // Initialize totals: [0] - weight, [1] - area, [2] - SB count
    }

    agentTotals[agent][0] += weight;
    agentTotals[agent][1] += area;
  });

  // Calculate total SB count per agent
  Object.entries(agentSbCartingMap).forEach(([agent, sbCartingMap]) => {
    Object.values(sbCartingMap).forEach((cartingIds) => {
      if (cartingIds.size > 0) {
        agentTotals[agent][2] += 1; // Increment SB count
      }
    });
  });

  const getAgentSummary = () => {
    return Object.entries(agentTotals).map(([agent, totals], index) => ({
      srNo: index + 1,
      agent,
      totalSbCount: totals[2], // Total SB Count
      weight: totals[0].toFixed(2), // Total Weight
      area: totals[1].toFixed(2), // Total Area
    }));
  };

  const agentSummary = getAgentSummary();

  return (
    <div>
      {/* Main Table */}
      <table className="table table-bordered table-hover tableHeader">
        <thead className="text-center">
          <tr>
            <th>Sr No</th>
            <th>Shipping Bill No</th>
            <th>Shipping Bill Date</th>
            <th style={{ minWidth: 360 }}>CHA</th>
            <th style={{ minWidth: 360 }}>Account Holder</th>
            <th style={{ minWidth: 360 }}>Exporter Name</th>
            <th style={{ minWidth: 360 }}>Consignee</th>
            <th>Declared Weight</th>
            <th>Remarks</th>
            <th style={{ minWidth: 180 }}>Carting Date</th>
            <th>Cargo Description</th>
            <th>Ware House Occupancy</th>
            <th>Ware House Location</th>
            <th>Declared Pkgs</th>
            <th>Unload Package</th>
            <th>Unload Weight</th>
            <th>Unload Area</th>
            <th>Pod</th>
            <th>Equipment</th>
            <th>FOB</th>
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
            <th>Total SB Count</th>
            <th>Weight</th>
            <th>Area</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {agentSummary.map((entry, index) => (
            <tr key={index}>
              <td>{entry.srNo}</td>
              <td>{entry.agent}</td>
              <td>{entry.totalSbCount}</td>
              <td>{entry.weight}</td>
              <td>{entry.area}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


const ExportContainerONWHBufferStuffing = ({ currentItems }) => {
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
        const agent = i[20] || "Unknown"; // Shipping Agent
        const containerSize = i[2] || ""; // Container Size
        const containerNo = i[1] || ""; // Container Number
    
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
      <th style={{ minWidth: 360 }}>A/C Name</th>
      <th>CONT No</th>
      <th>Size</th>
      <th>Cont Type</th>
      <th style={{minWidth:180}}>Mty In Date</th>
      <th style={{minWidth:180}}>Stuffing Date</th>
      <th style={{minWidth:180}}>Out Date</th>
      <th>POD</th>
      <th>Vessel Name</th>
      <th>Equipment</th>
      <th>POL</th>
      <th>Stuffed Pkgs</th>
      <th>Remarks</th>
      <th>Gross Wt</th>
      <th>VCN No</th>
      <th>Rotation No</th>
      <th>VOY No</th>
      <th style={{ minWidth: 360 }}>Shipping Line</th>
      <th>Cust Seal</th>
      <th>Agent Seal</th>
    </tr>
  </thead>
  <tbody className="text-center">
    {currentItems.map((item, index) => (
      <tr key={index}>
      <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
        <td>{item[0] || ""}</td> {/* A/C Name */}
        <td>{item[1] || ""}</td> {/* CONT No */}
        <td>{item[2] || ""}</td> {/* Size */}
        <td>{item[3] || ""}</td> {/* Cont Type */}
        <td>{item[4] || ""}</td> {/* Mty In Date */}
        <td>{item[5] || ""}</td> {/* Stuffing Date */}
        <td>{item[6] || ""}</td> {/* Out Date */}
        <td>{item[7] || ""}</td> {/* POD */}
        <td>{item[8] || ""}</td> {/* Vessel Name */}
        <td>{item[9] || ""}</td> {/* Equipment */}
        <td>{item[10] || ""}</td> {/* POL */}
        <td>{item[11] || ""}</td> {/* Stuffed Pkgs */}
        <td>{item[12] || ""}</td> {/* Remarks */}
        <td>{item[13] || ""}</td> {/* Gross Wt */}
        <td>{item[14] || ""}</td> {/* VCN No */}
        <td>{item[15] || ""}</td> {/* Rotation No */}
        <td>{item[16] || ""}</td> {/* VOY No */}
        <td>{item[17] || ""}</td> {/* Shipping Line */}
        <td>{item[18] || ""}</td> {/* Cust Seal */}
        <td>{item[19] || ""}</td> {/* Agent Seal */}
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


    const ExportFactoryStuffGateInReport = ({ currentItems }) => (
      <table className="table table-bordered table-hover tableHeader">
      <thead className="text-center">
        <tr>
          <th scope="col">SR NO</th>
          <th scope="col">Mode</th>
          <th scope="col">Work Order No.</th>
          <th scope="col">Work Order Date</th>
          <th scope="col">Gate In Date</th>
          <th scope="col">Vehicle</th>
          <th scope="col">Container No</th>
          <th scope="col">Container Size</th>
          <th scope="col">Container Type</th>
          <th scope="col">Cargo Wt.</th>
          <th scope="col">Tare Wt.</th>
          <th scope="col" style={{minWidth:360}}>Account Holder</th>
          <th scope="col" style={{minWidth:360}}>CHA</th>
          <th scope="col" style={{minWidth:360}}>Line</th>
          <th scope="col">Sr. No Buffer</th>
          <th scope="col">Sr. No Factory</th>
          <th scope="col">Gate In Condition</th>
          <th scope="col">Gate Out Date</th>
          <th scope="col">Shipping Bill No</th>
          <th scope="col">Shipping Bill Date</th>
          <th scope="col">No Of Packages</th>
          <th scope="col">Weight</th>
          <th scope="col">Vessel</th>
          <th scope="col" style={{minWidth:180}}>POD</th>
          <th scope="col" style={{minWidth:180}}>POL</th>
          <th scope="col">Agent Seal</th>
          <th scope="col">Custom Seal</th>
          <th scope="col">Gate Out Condition</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {currentItems.map((item, index) => (
          <tr key={index}>
           <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
            <td>{item[0] || ""}</td> {/* Mode */}
            <td>{item[1] || ""}</td> {/* Work Order No */}
            <td>{item[2] || ""}</td> {/* Work Order Date */}
            <td>{item[3] || ""}</td> {/* Gate In Date */}
            <td>{item[4] || ""}</td> {/* Vehicle */}
            <td>{item[5] || ""}</td> {/* Container No */}
            <td>{item[6] || ""}</td> {/* Size */}
            <td>{item[7] || ""}</td> {/* Type */}
            <td>{item[8] || ""}</td> {/* Cargo Wt */}
            <td>{item[9] || ""}</td> {/* Tare Wt */}
            <td>{item[10] || ""}</td> {/* Account Holder */}
            <td>{item[11] || ""}</td> {/* CHA */}
            <td>{item[12] || ""}</td> {/* Line */}
            <td>{item[13] || ""}</td> {/* Sr. No Buffer */}
            <td>{item[14] || ""}</td> {/* Sr. No Factory */}
            <td>{item[15] || ""}</td> {/* Gate In Condition */}
            <td>{item[16] || ""}</td> {/* Gate Out Date */}
            <td>{item[17] || ""}</td> {/* Shipping Bill No */}
            <td>{item[18] || ""}</td> {/* Shipping Bill Date */}
            <td>{item[19] || ""}</td> {/* No Of Packages */}
            <td>{item[20] || ""}</td> {/* Weight */}
            <td>{item[21] || ""}</td> {/* Vessel */}
            <td>{item[22] || ""}</td> {/* POD */}
            <td>{item[23] || ""}</td> {/* POL */}
            <td>{item[24] || ""}</td> {/* Agent Seal */}
            <td>{item[25] || ""}</td> {/* Custom Seal */}
            <td>{item[26] || ""}</td> {/* Gate Out Condition */}
          </tr>
        ))}
      </tbody>
    </table>
    
    );
    
   
const EmptyContainerReport = ({ currentItems }) => {
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
    const agent = i[3] || "Unknown"; // Shipping Agent
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
    <th>Container No.</th>
    <th>Cont Size</th>
    <th>Cont Type</th>
    <th style={{minWidth :270}}>Shipping Line</th>
    <th >Gate In Date</th>
    <th >Gate Out Date</th>
    <th >Mode Of Transport</th>
    <th >Booking No</th>
    <th >Seal No</th>
    <th style={{minWidth :270}}>A/C Holder</th>
    <th style={{minWidth :270}}>Transporter</th>
    <th>Pickup Yard</th>
    <th>Gate In Remarks</th>
    <th>Mode Of Gate In</th>
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
              <td>{"EMPTY"}</td> {/* Manifested Qty */}
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








    const ExportGateOutContainerReport = ({ currentItems }) => {
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
    <th>Sr. No</th>
    <th>Cont No</th>
    <th>Cont Size</th>
    <th>Cont Type</th>
    <th style={{minWidth:180}}>Commodity</th>
    <th style={{minWidth:180}}>Stuff Date</th>
    <th style={{minWidth:180}}>Gate out Date</th>
    <th style={{minWidth:360}}>Account Holder</th>
    <th style={{minWidth:360}}>Shipping Line</th>
    <th>Vessel Name</th>
    <th>Port</th>
    <th>Custom Seal</th>
    <th>Agent Seal</th>
    <th>VCN No</th>
    <th>Stuff Package</th>
    <th>Stuff Weight</th>
    <th>Tare Weight</th>
    <th style={{minWidth:360}}>Transporter</th>
    <th>Low Bed</th>
    <th>Vehicle No</th>
    <th>Empty In Date</th>
    <th>Empty Pickup Yard</th>
    <th>Process Type</th>
    <th>Remarks</th>
    <th>Invoice No</th>
</tr>


    
            </thead>
            <tbody className="text-center">
              {/* {processedItems.map((item, index) => ( */}
              {currentItems.map((item, index) => (
                <tr key={index}>
                 <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
<td>{item[0] || ""}</td> {/* Cont No */}
<td>{item[1] || ""}</td> {/* Cont Size */}
<td>{item[2] || ""}</td> {/* Cont Type */}
<td>{item[3] || ""}</td> {/* Commodity */}
<td>{item[4] || ""}</td> {/* Stuff Date */}
<td>{item[5] || ""}</td> {/* Gate out Date */}
<td>{item[6] || ""}</td> {/* Account Holder */}
<td>{item[7] || ""}</td> {/* Shipping Line */}
<td>{item[8] || ""}</td> {/* Vessel Name */}
<td>{item[9] || ""}</td> {/* Port */}
<td>{item[10] || ""}</td> {/* Custom Seal */}
<td>{item[11] || ""}</td> {/* Agent Seal */}
<td>{item[12] || ""}</td> {/* VCN No */}
<td>{item[13] || ""}</td> {/* Stuff Package */}
<td>{item[14] || ""}</td> {/* Stuff Weight */}
<td>{item[15] || ""}</td> {/* Tare Weight */}
<td>{item[16] || ""}</td> {/* Transporter */}
<td>{item[17] || ""}</td> {/* Low Bed */}
<td>{item[18] || ""}</td> {/* Vehicle No */}
<td>{item[19] || ""}</td> {/* Empty In Date */}
<td>{item[20] || ""}</td> {/* Empty Pickup Yard */}
<td>{item[21] || ""}</td> {/* Process Type */}
<td>{item[22] || ""}</td> {/* Remarks */}
<td>{item[23] || ""}</td> {/* Invoice No */}

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

    const ExportContainerReworkingReport = ({ currentItems }) => {
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
      <th>Sr. No.</th>
      <th>Cont No</th>
      <th>Cont Size</th>
      <th>Cont Type</th>
      <th style={{ minWidth: 180 }}>Stuffing Date</th>
      <th style={{ minWidth: 180 }}>Reworking Date</th>
      <th>Packages</th>
      <th style={{ minWidth: 180 }}>Weight</th>
      <th style={{ minWidth: 360 }}>Agent Name</th>
      <th>Container SearchType</th>
    </tr>
  </thead>
  <tbody className="text-center">
    {currentItems.map((item, index) => (
      <tr key={index}>
      <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
        <td>{item[0] || ""}</td> {/* Cont No */}
        <td>{item[1] || ""}</td> {/* Cont Size */}
        <td>{item[2] || ""}</td> {/* Type */}
        <td>{item[3] || ""}</td> {/* Stuffing Date */}
        <td>{item[4] || ""}</td> {/* Reworking Date */}
        <td>{item[5] || ""}</td> {/* Packages */}
        <td>{item[6] || ""}</td> {/* Weight */}
        <td>{item[7] || ""}</td> {/* Agent Name */}
        <td>{item[8] || ""}</td> {/* Container Type */}
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

    const ExportInOutContainersReport = ({ currentItems }) => {
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
        const agent = i[9] || "Unknown"; // Shipping Agent
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
      <th>Cont No</th>
      <th>Cont Size</th>
      <th>Cont Type</th>
      <th>ISO CODE</th>
      <th style={{minWidth:180}}>Gate In Date</th>
      <th style={{minWidth:180}}>Gate Out Date</th>
      <th>Out Truck No</th>
      <th style={{minWidth:360}}>Transporter</th>
      <th style={{minWidth:360}}>AC Holder</th>
      <th style={{minWidth:360}}>Line</th>
      <th style={{minWidth:180}}>Yard Location</th>
      <th>Gate In Mode</th>
      <th>Damage Details</th>
      <th>Remarks</th>
      <th>Booking No</th>
      <th style={{minWidth:360}}>Shipper</th>
      <th>Port Code</th>
      <th>Gate In Remarks</th>
    </tr>
  </thead>
  <tbody className="text-center">
    {currentItems.map((item, index) => (
      <tr key={index}>
        <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
        <td>{item[0] || ""}</td> {/* Cont No */}
        <td>{item[1] || ""}</td> {/* Cont Size */}
        <td>{item[2] || ""}</td> {/* Cont Type */}
        <td>{item[3] || ""}</td> {/* ISO CODE */}
        <td>{item[4] || ""}</td> {/* Gate In Date */}
        <td>{item[5] || ""}</td> {/* Gate Out Date */}
        <td>{item[6] || ""}</td> {/* Out Truck No */}
        <td>{item[7] || ""}</td> {/* Transporter */}
        <td>{item[8] || ""}</td> {/* AC Holder */}
        <td>{item[9] || ""}</td> {/* Line */}
        <td>{branchname}</td> {/* Yard Location */}
        <td>{item[11] || ""}</td> {/* Gate In Mode */}
        <td>{item[12] || ""}</td> {/* Damage Details */}
        <td>{item[13] || ""}</td> {/* Remarks */}
        <td>{item[14] || ""}</td> {/* Booking No */}
        <td>{item[15] || ""}</td> {/* Shipper */}
        <td>{item[16] || ""}</td> {/* Port Code */}
        <td>{item[17] || ""}</td> {/* Gate In Remarks */}
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

        const ExportLoadedBalanceContainersReport = ({ currentItems }) => {
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
        const agent = i[6] || "Unknown"; // Shipping Agent
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
      <th>CONT NO</th>
      <th>CONT SIZE</th>
      <th>CONT TYPE</th>
      <th style={{ minWidth: 180 }}>STUFF ORDER DATE</th>
      <th style={{ minWidth: 180 }}>MOVEMENT ORDER DATE</th>
      <th style={{ minWidth: 360 }}>ACCOUNT HOLDER</th>
      <th style={{ minWidth: 360 }}>LINE NAME</th>
      <th style={{ minWidth: 360 }}>AGENT SEAL</th>
      <th style={{ minWidth: 360 }}>CUSTOM SEAL</th>
      <th style={{ minWidth: 360 }}>VESSEL NAME</th>
      <th style={{ minWidth: 126 }}>VCN NO</th>
      <th style={{ minWidth: 126 }}>VOY NO</th>
      <th style={{ minWidth: 126 }}>PORT NAME</th>
      <th>CONT WT</th>
      <th>CONT CYCLE</th>
    </tr>
  </thead>
  <tbody className="text-center">
    {currentItems.map((item, index) => (
      <tr key={index}>
       <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
        <td>{item[0] || ""}</td> {/* CONT NO */}
        <td>{item[1] || ""}</td> {/* CONT SIZE */}
        <td>{item[2] || ""}</td> {/* CONT TYPE */}
        <td>{item[3] || ""}</td> {/* STUFF ORDER DATE */}
        <td>{item[4] || ""}</td> {/* MOVEMENT ORDER DATE */}
        <td>{item[5] || ""}</td> {/* ACCOUNT HOLDER */}
        <td>{item[6] || ""}</td> {/* LINE NAME */}
        <td>{item[7] || ""}</td> {/* AGENT SEAL */}
        <td>{item[8] || ""}</td> {/* CUSTOM SEAL */}
        <td>{item[9] || ""}</td> {/* VESSEL NAME */}
        <td>{item[10] || ""}</td> {/* VCN NO */}
        <td>{item[11] || ""}</td> {/* VOY NO */}
        <td>{item[12] || ""}</td> {/* PORT NAME */}
        <td>{item[13] || ""}</td> {/* CONT WT */}
        <td>{item[14] || ""}</td> {/* CONT CYCLE */}
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
                        popperPlacement="bottom-start"
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
                              Billing Party
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
    <Row style={{justifyContent:'center'}}>

      <Col md={3} >
    {/* <button
                className="btn btn-outline-success btn-margin newButton"
                id="submitbtn2"
                style={{ fontSize: 11, marginRight: 5 }}
               onClick={()=> handleShow('Excel') }
               disabled={selectedReport==='Invoice Register Container Wise Report'}
            >
              <FontAwesomeIcon icon={faEye} style={{ marginRight: "4px" }} />
              Show
            </button>  */}

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
    {selectedReport === "Invoice Sales Register Report" && <InvoiceSalesRegister currentItems={currentItems} />}
    {selectedReport === "Invoice Register Container Wise Report" && <InvoiceSalesContainerWiseReport currentItems={currentItems} />}
    {selectedReport === "TDS Report" && <TdsReport currentItems={currentItems} />}

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