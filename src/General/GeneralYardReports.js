import { faCalendarAlt, faDownload, faEye, faFileExcel, faRefresh, faSearch, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Row,
    Col,
    FormGroup,
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    Input,
    Table,
    ModalFooter,
    FormFeedback,
    Button,
} from "reactstrap";
import AuthContext from '../Components/AuthProvider';
import useAxios from '../Components/useAxios';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import { Pagination } from 'react-bootstrap';
import cfsService from '../service/CFSService';
import pdfLogo from "../Images/pdfLogo.png";
import xlsLogo from "../Images/xlsLogo.png";
import moment from 'moment';
import ipaddress from '../Components/IpAddress';

export default function GeneralYardReports() {

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

    const axiosInstance = useAxios();
    const CFSService = new cfsService(axiosInstance);
    const initialSearchCriteria = {
        companyId: companyid,
        branchId: branchId,
        searchValue: '',
        startDate: new Date(),
        endDate: new Date()
    }

    const [searchCriteria, setSearchCriteria] = useState(initialSearchCriteria);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
const [yardReportData, setYardReportData] = useState([]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = yardReportData.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(yardReportData.length / itemsPerPage);
    console.log('yardReportData : \n', yardReportData);

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
const handleClear = () => {
    setSearchCriteria(initialSearchCriteria);

    // ✅ Clear table data
    setYardReportData([]);

    // ✅ Reset pagination
    setCurrentPage(1);
};
    // const handleClear = async () => {
    //     setSearchCriteria(initialSearchCriteria);
    //     handleShow(initialSearchCriteria);
    // }
    const handleShow = async (searchCriteria) => {
    setLoading(true);
    try {
        // const formattedStartDate = searchCriteria.startDate ? moment(searchCriteria.startDate).format('YYYY-MM-DD HH:mm') : '';
        // const formattedEndDate = searchCriteria.endDate ? moment(searchCriteria.endDate).format('YYYY-MM-DD HH:mm') : '';
        
        const response = await axios.get(
            `${ipaddress}api/generalReports/showGeneralYad?companyId=${companyid}&branchId=${branchId}&uname=${username}&type=show&cname=${companyname}&bname=${branchname}&locationCategory=${searchCriteria.locationCategory || ''}&occupancyCategory=${searchCriteria.occupancyCategory || ''}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
        );
        
        // Change this line - use setYardReportData instead of setDamageReportData
        setYardReportData(response.data);
        setCurrentPage(1); // Reset to first page
        
        if (!response.data || response.data.length === 0) {
            toast.info('No data found!', {
                position: 'top-center',
                autoClose: 700,
            });
        }
    } catch (error) {
        console.log('something went wrong in yard search...', error);
        toast.error('Oops something went wrong!', {
            position: 'top-center',
            autoClose: 700,
        });
    } finally {
        setLoading(false);
    }
}
// const handleShow = async (searchCriteria) => {
//     setLoading(true);
//     try {
//         const formattedStartDate = searchCriteria.startDate ? moment(searchCriteria.startDate).format('YYYY-MM-DD HH:mm') : '';
//         const formattedEndDate = searchCriteria.endDate ? moment(searchCriteria.endDate).format('YYYY-MM-DD HH:mm') : '';
        
//         const response = await axios.get(
//             `${ipaddress}api/generalReports/showGeneralYad?companyId=${companyid}&branchId=${branchId}&uname=${username}&type=show&cname=${companyname}&bname=${branchname}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&locationCategory=${searchCriteria.locationCategory || ''}&occupancyCategory=${searchCriteria.occupancyCategory || ''}`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${jwtToken}`
//                 }
//             }
//         );
//         setDamageReportData(response.data);
//         if (!response.data || response.data.length === 0) {
//             toast.info('No data found!', {
//                 position: 'top-center',
//                 autoClose: 700,
//             });
//         }
//     } catch (error) {
//         console.log('something went wrong in yard search...');
//         toast.error('Oops something went wrong!', {
//             position: 'top-center',
//             autoClose: 700,
//         });
//     } finally {
//         setLoading(false);
//     }
// }

const handleYardDownload = async (type) => {
    try {
        setLoading(true);

        // const formattedStartDate = searchCriteria.startDate ? moment(searchCriteria.startDate).format('YYYY-MM-DD HH:mm') : '';
        // const formattedEndDate = searchCriteria.endDate ? moment(searchCriteria.endDate).format('YYYY-MM-DD HH:mm') : '';

        // Validate dates
        // if (!formattedStartDate || !formattedEndDate) {
        //     toast.error('Please enter both start date and end date.');
        //     setLoading(false);
        //     return;
        // }

        console.log('Downloading yard occupancy report...');
        // console.log('Start Date:', formattedStartDate);
        // console.log('End Date:', formattedEndDate);
        console.log('Location Category:', searchCriteria.locationCategory);
        console.log('Occupancy Category:', searchCriteria.occupancyCategory);

        const response = await axios.get(
            `${ipaddress}api/generalReports/Generalyarddownload?companyId=${companyid}&branchId=${branchId}&uname=${username}&type=${type}&cname=${companyname}&bname=${branchname}&locationCategory=${searchCriteria.locationCategory || ''}&occupancyCategory=${searchCriteria.occupancyCategory || ''}`,
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
        a.download = `yard_occupancy_report.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Optionally, revoke the Object URL to free up resources
        window.URL.revokeObjectURL(url);

        // Success toast notification
        toast.success('Yard occupancy report downloaded successfully!', { autoClose: 900 });
        
    } catch (error) {
        console.error('Error downloading yard occupancy report:', error);

        // Error toast notification
        toast.error('Failed to download yard occupancy report. Please try again.', { autoClose: 900 });
    } finally {
        setLoading(false);
    }
};
  const shouldShowAdditionalColumns = () => {
        const locationCategory = searchCriteria.locationCategory;
        const occupancyCategory = searchCriteria.occupancyCategory;
        
        return (locationCategory === 'C' || locationCategory === 'G') && 
               (occupancyCategory === 'OCCUPIED' || occupancyCategory === 'PARTIAL');
    };

    function formatDate(date) {
        if (!date) return '';

        const d = new Date(date);
        if (isNaN(d.getTime())) return ''; // Invalid date

        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = d.getFullYear();

        return `${day}/${month}/${year}`;
    }

    // Document upload
    const [isModalOpenForDocumentUpload, setIsModalOpenForDocumentUpload] = useState(false);
    const [isModalOpenForViewDocument, setIsModalOpenForViewDocument] = useState(false);
    const [viewFile, setViewFile] = useState('');

    const initialDocumentUpload = {
        companyId: companyid,
        branchId: branchId,
        sbNo: '',
        sbTransId: '',
        hSbTransId: '',
        sbLineNo: '',
        fileName: '',
        base64Url: '',
        fileType: '',
        isSaved: 'N',
        isContainerDamage: 'N',
        isCargoDamage: 'N',
        damageRemark: '',
        commodityDescription: ''
    }

    const [sbDocumentUpload, setSbDocumentUpload] = useState([initialDocumentUpload]);

    const handleOpenDocumentUpload = async (sbNoEntry) => {
        try {
            const response = await CFSService.getDataForDocumentuploadGeneral(
                companyid,
                branchId,
                sbNoEntry.receivingId,
                sbNoEntry.gateInId,
                sbNoEntry.srNo,
                sbNoEntry.containerNo,
                jwtToken
            );

            console.log('response.data \n', response.data);

            setSbDocumentUpload(
                response.data?.length > 0
                    ? response.data
                    : [{ ...initialDocumentUpload, sbNo: sbNoEntry.receivingId, commodityDescription: sbNoEntry.commodityDescription, sbTransId: sbNoEntry.containerNo, hSbTransId: sbNoEntry.gateInId, sbLineNo: sbNoEntry.srNo, isSaved: 'N' }]
            );

            setIsModalOpenForDocumentUpload(true);
        } catch (error) {
            console.error('Error fetching data for document get upload : \n', error);
            toast.error('An error occurred while fetching data. Please try again.', {
                position: 'top-center',
                autoClose: 700,
            });
        }
    };

    const handleCloseDocumentUpload = async () => {
        setIsModalOpenForDocumentUpload(false);
        setSbDocumentUpload([initialDocumentUpload]);
    }

    const handleFileUploadFileChange = (event) => {
        const files = Array.from(event.target.files);

        if (files.length === 0) return;

        const maxSize = 10 * 1024 * 1024; // 10MB in bytes

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "application/pdf",
            "application/vnd.ms-excel", // XLS
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX           
        ];

        const validFiles = files.filter(
            (file) => allowedTypes.includes(file.type) && file.size <= maxSize
        );

        if (validFiles.length === 0) {
            alert("Only JPG, PNG, PDF, XLS and XLSX files are allowed (Max: 10MB)!");
            return;
        }

        validFiles.forEach((file) => {
            const reader = new FileReader();

            // Read Excel and CSV files as binary string
            if (file.type.includes("excel")) {
                reader.readAsBinaryString(file);
            } else {
                reader.readAsDataURL(file);
            }

            reader.onload = () => {
                const base64String =
                    file.type.includes("excel")
                        ? btoa(reader.result) // Convert binary to base64
                        : reader.result;

                setSbDocumentUpload((prev) => {
                    const existingIndex = prev.findIndex((doc) => doc.fileName === "");

                    if (existingIndex !== -1) {
                        // If an empty file entry exists, update it
                        const updatedDocuments = [...prev];
                        updatedDocuments[existingIndex] = {
                            ...updatedDocuments[existingIndex],
                            fileName: file.name,
                            base64Url: base64String,
                            fileType: file.type,
                        };
                        return updatedDocuments;
                    } else {
                        // If no empty entry exists, add a new object
                        return [
                            ...prev,
                            {
                                companyId: prev[0]?.companyId || "",
                                branchId: prev[0]?.branchId || "",
                                sbNo: prev[0]?.sbNo || "",
                                sbTransId: prev[0]?.sbTransId || "",
                                hSbTransId: prev[0]?.hSbTransId || "",
                                sbLineNo: prev[0]?.sbLineNo || "",
                                commodityDescription: prev[0]?.commodityDescription || "",
                                isContainerDamage: prev[0]?.isContainerDamage || "",
                                isCargoDamage: prev[0]?.isCargoDamage || "",
                                damageRemark: prev[0]?.damageRemark || "",
                                fileName: file.name,
                                base64Url: base64String,
                                fileType: file.type,
                            },
                        ];
                    }
                });

                console.log("File Uploaded:", file.name);
            };

            reader.onerror = (error) => {
                console.error("Error reading file:", error);
            };
        });
    };

    const handleView = (file) => {
        setViewFile(file);
        setIsModalOpenForViewDocument(true);
    };

    const handleCloseViewDocument = async () => {
        setIsModalOpenForViewDocument(false);
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
                    {/* <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="startDate">
                                Start Date <span className="error-message">*</span>
                            </label>
                            <div style={{ position: "relative" }}>
                                <div>
                                    <DatePicker
                                        wrapperClassName="custom-react-datepicker-wrapper"
                                        className="form-control"
                                        selected={searchCriteria.startDate}
                                        id="startDate"
                                        name='startDate'
                                        onChange={(date) => setSearchCriteria(pre => ({ ...pre, startDate: date }))}
                                        dateFormat="dd/MM/yyyy"
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
                            <label className="forlabel bold-label" htmlFor="endDate">
                                End Date <span className="error-message">*</span>
                            </label>
                            <div style={{ position: "relative" }}>
                                <div>
                                    <DatePicker
                                        id="endDate"
                                        name='endDate'
                                        wrapperClassName="custom-react-datepicker-wrapper"
                                        className="form-control"
                                        dateFormat="dd/MM/yyyy"
                                        selected={searchCriteria.endDate}
                                        onChange={(date) => setSearchCriteria(pre => ({ ...pre, endDate: date }))}
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
                    </Col> */}

                    <Col md={3}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="location">
                                Location Category
                            </label>
                            <Input
                                type="select"
                                value={searchCriteria.locationCategory || ""}
                                onChange={(e) => setSearchCriteria(pre => ({ ...pre, locationCategory: e.target.value }))}
                                className="form-control"
                            >
                                <option value="">Select Space</option>
                                <option value="O">Open Space</option>
                                <option value="C">Racking System</option>
                                <option value="G">Covered Grounded Space</option>
                            </Input>
                        </FormGroup>
                    </Col>

                <Col md={3}>
    <FormGroup>
        <label className="forlabel bold-label" htmlFor="location">
            Occupancy Category
        </label>
        <Input
            type="select"
            value={searchCriteria.occupancyCategory || ""}
            onChange={(e) => setSearchCriteria(pre => ({ ...pre, occupancyCategory: e.target.value }))}
            className="form-control"
        >
            <option value="">Select Occupancy</option>
            <option value="EMPTY">Empty</option>
            <option value="OCCUPIED">Occupied</option>
            <option value="PARTIAL">Partially Occupied</option>
        </Input>
    </FormGroup>
</Col>

                </Row>
<hr></hr>
                   <Row style={{ justifyContent: 'center', display: 'flex' }}>
                    
                    <Col md={3} style={{ marginTop: 22 }}>
                        <button
                            className="btn btn-outline-success btn-margin newButton"
                            id="submitbtn2"
                            style={{ fontSize: 12, marginRight: 5 }}
                            onClick={() => { handleShow(searchCriteria); }}
                        >
                            <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                            Show
                        </button>
                        <button
                            className="btn btn-outline-danger btn-margin newButton"
                            style={{ fontSize: 12 }}
                            id="submitbtn2"
                            onClick={handleClear}
                        >
                            <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
                            Clear
                        </button>

                        {/* {yardReportData.length > 0 && ( */}
                            <button
    className="btn btn-outline-primary btn-margin newButton"
    style={{ fontSize: 12, marginLeft: 5 }}
    id="submitbtn2"
    onClick={() => { handleYardDownload('excel'); }}
>
    <FontAwesomeIcon icon={faFileExcel} style={{ marginRight: '5px' }} />
    Download
</button>
                        {/* )} */}
                    </Col>
                </Row>

             {yardReportData?.length > 0 && (
    <>
        <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
            <Table className="table table-bordered" style={{ border: '2px solid black' }}>
                <thead>
                    <tr>
                        <th scope="col" className="text-center" style={{ color: "black" }}>
                            Sr No.
                        </th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>
                            Yard Location
                        </th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>
                            Block
                        </th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>
                            Cell
                        </th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>
                            Cell Area
                        </th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>
                            Cell Area Used
                        </th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>
                            Occupancy Status
                        </th>
                           {shouldShowAdditionalColumns() && (
                                        <>
                                            
                                            {/* <th scope="col" className="text-center" style={{ color: "black" }}>
                                                Receiving Pck
                                            </th>
                                            <th scope="col" className="text-center" style={{ color: "black" }}>
                                                Qty Taken Out
                                            </th> */}
                                            <th scope="col" className="text-center" style={{ color: "black" }}>
                                                Receiving Id
                                            </th>
                                        </>
                                    )}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={index}>
                            <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
                            <td>{item.yardLocation || item[0]}</td>
                            <td>{item.block || item[1]}</td>
                            <td>{item.cell || item[2]}</td>
                            <td >{item.cellArea || item[3]}</td>
                            <td >{item.cellAreaUsed || item[4]}</td>
                              <td>{item.occupancyStatus || item[5]}</td>
                           {/* Conditionally show these data cells */}
                                        {shouldShowAdditionalColumns() && (
                                            <>
                                                {/* <td>{item.receivingPack || item[7] || '-'}</td>
                                                <td>{item.qtytakeOut || item[8] }</td> */}
                                                <td>{item.receivingId || item[6] || '-'}</td>
                                            </>
                                        )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
        
        {/* Add Pagination here */}
        <Pagination style={{ display: "flex", justifyContent: "center", color: "gray", marginTop: "15px" }}>
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
)}
                <hr />
            </div>

        </>
    )
}