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
export default function ExpiredBondReport() {

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
  
    const [startDate ,setStartDate] =useState();
    const [endDate ,setEndDate] =useState(new Date());

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

      const handleShow = async (type) => {
        try {
            console.log("In show data");
            
            if (!endDate) {
              toast.error('Please enter at least end date.'); // Show toast if any date is missing
              return;
          }

            const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DD HH:mm') : '';
            const formattedEndDate = endDate ? moment(endDate).format('YYYY-MM-DD HH:mm') : '';
            
            const response = await axios.get(
                `${ipaddress}api/bondingReport/showBondExpiredBondData?companyId=${companyid}&branchId=${branchId}&uname=${username}&type=${type}&cname=${companyname}&bname=${branchname}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
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
        }
    };
    

      const handleClear =()=>{
        setInventoryList([]);
        setStartDate('');
        setEndDate(new Date());
      }
      


      const handleExleDownload = async (type) => {
        try {
          setLoading(true);
          let exBondingId = "EXBL000045";

          if (!endDate) {
            toast.error('Please enter at least end date.'); // Show toast if any date is missing
            return;
        }
          const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DD HH:mm') : '';
          const formattedEndDate = endDate ? moment(endDate).format('YYYY-MM-DD HH:mm') : '';
          const response = await axios.get(
            `${ipaddress}api/bondingReport/expiredBondReport?companyId=${companyid}&branchId=${branchId}&uname=${username}&type=${type}&cname=${companyname}&bname=${branchname}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`
              },
              responseType: 'blob' // Make sure the response type is set to blob
            }
          );
      
          // Create a URL for the file and trigger the download
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement('a');
          a.href = url;
          a.download = `ExpiredBondReport.xlsx`;
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
            Start Date
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

      <Col md={3} style={{ paddingTop: 22 ,
               
            }}>

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

      <Col md={3} style={{ paddingTop: 22 ,
               
            }}>


        </Col>
    </Row>
      </div>

      {inventoryList.length > 0 ? ( // Check if inventoryList has items
      <>
      <div className="table-responsive">
  
      <table className="table table-bordered table-hover tableHeader">
    <thead className="text-center">
        <tr>
            <th scope="col">Sr. No.</th>
            <th scope="col">Noc No</th>
            <th scope="col">Noc Date</th>
            <th scope="col">Inbond Boe No</th>
            <th scope="col">Inbond Boe Date</th>
            <th scope="col">IgM No</th>
            <th scope="col">Item No</th>
            <th scope="col">Inbond Weight</th>
            <th scope="col">Area</th>
            <th scope="col">Inbond Asset Value</th>
            <th scope="col">Inbond Custom Duty</th>
            <th scope="col">Asset Value + Duty Value</th>
            <th scope="col">Cha Name</th>
            <th scope="col">Importer Name</th>
            <th scope="col">Cargo Description</th>
            <th scope="col">Bond Bal Asset Value</th>
            <th scope="col">Bond Bal Duty Value</th>
            <th scope="col">Bond Expiry Date</th>
            <th scope="col">Balance Pkgs</th>
            <th scope="col">Exbond Delivery Pkgs</th>
            <th scope="col">Remark</th>
        </tr>
    </thead>
    <tbody className="text-center">
        {currentItems.map((item, index) => (
            <tr key={index}>
                <td>
                    <input style={{ width: '45px', border: 'none', outline: 'none', boxShadow: 'none' }} value={index + 1} readOnly />
                </td>
                <td>
                    <input style={{ width: '100px', border: 'none', outline: 'none', boxShadow: 'none' }} value={item.nocNo || ""} />
                </td>
                <td>
                    <input style={{ width: '100px', border: 'none', outline: 'none', boxShadow: 'none' }} value={item.nocDate ? format(new Date(item.nocDate), 'dd/MM/yyyy') : ""} readOnly />
                </td>
                <td>
                    <input style={{ width: '100px', border: 'none', outline: 'none', boxShadow: 'none' }} value={item.boeNo || ""} />
                </td>
                <td>
                    <input style={{ width: '100px', border: 'none', outline: 'none', boxShadow: 'none' }} value={item.boeDate ? format(new Date(item.boeDate), 'dd/MM/yyyy') : ""} readOnly />
                </td>
                <td>
                    <input style={{ width: '90px', border: 'none', outline: 'none', boxShadow: 'none' }} value={item.igmNo || ""} />
                </td>
                <td>
                    <input style={{ width: '99px', border: 'none', outline: 'none', boxShadow: 'none' }} value={item.igmLineNo || ""} />
                </td>
                <td>
                    <input style={{ width: '100px', border: 'none', outline: 'none', boxShadow: 'none' }} value={item.inbondGrossWtDtl || ""} />
                </td>
                {/* <td>
                    <input style={{ width: '100px', border: 'none', outline: 'none', boxShadow: 'none' }} value={(item.areaOccupied || 0) - (item.areaRelesed || 0)} readOnly />
                </td> */}
                 <td>
                    <input style={{ width: '100px', border: 'none', outline: 'none', boxShadow: 'none' }} value={item.areaOccupied} readOnly />
                </td>
                <td>
                    <input style={{ width: '100px', border: 'none', outline: 'none', boxShadow: 'none' }} value={item.inbondCifValue || ""} />
                </td>
                <td>
                    <input style={{ width: '100px', border: 'none', outline: 'none', boxShadow: 'none' }} value={item.inbondCargoDuty || ""} />
                </td>
                <td>
                    <input style={{ width: '120px', border: 'none', outline: 'none', boxShadow: 'none' }} value={(item.inbondCifValue || 0) + (item.inbondCargoDuty || 0)} readOnly />
                </td>
                <td>
                    <input style={{ width: '270px', border: 'none', outline: 'none', boxShadow: 'none' }} value={item.cha || ""} />
                </td>
                <td>
                    <input style={{ width: '270px', border: 'none', outline: 'none', boxShadow: 'none' }} value={item.importerName || ""} />
                </td>
                <td>
                    <input style={{ width: '270px', border: 'none', outline: 'none', boxShadow: 'none' }} value={item.commodityDescription || ""} />
                </td>
                <td>
                    <input style={{ width: '100px', border: 'none', outline: 'none', boxShadow: 'none' }} value={(item.inbondCifValue || 0) - (item.exbondCifValue || 0)} readOnly />
                </td>
                <td>
                    <input style={{ width: '100px', border: 'none', outline: 'none', boxShadow: 'none' }} value={(item.inbondCargoDuty || 0) - (item.exbondCargoDuty || 0)} readOnly />
                </td>
                <td>
                    <input style={{ width: '100px', border: 'none', outline: 'none', boxShadow: 'none' }} value={item.bondingDate ? format(new Date(item.bondingDate), 'dd/MM/yyyy') : ""} readOnly />
                </td>
                <td>
                    <input style={{ width: '81px', border: 'none', outline: 'none', boxShadow: 'none' }} value={(item.inBondedPackagesDtl || 0) - (item.exBondedPackagesDtl || 0)} readOnly />
                </td>
                <td>
                    <input style={{ width: '81px', border: 'none', outline: 'none', boxShadow: 'none' }} value={item.exBondedPackagesDtl !=null ? item.exBondedPackagesDtl :'0'} />
                </td>
                <td>
                    <input style={{ width: '150px', border: 'none', outline: 'none', boxShadow: 'none' }} value={item.comments || ""} />
                </td>
            </tr>
        ))}
    </tbody>
</table>

   
</div>

< Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
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
