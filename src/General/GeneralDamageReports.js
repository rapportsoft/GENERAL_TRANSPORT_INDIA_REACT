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
} from "reactstrap"; import AuthContext from '../Components/AuthProvider';
import useAxios from '../Components/useAxios';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import { Pagination } from 'react-bootstrap';
import cfsService from '../service/CFSService';
import pdfLogo from "../Images/pdfLogo.png";
import xlsLogo from "../Images/xlsLogo.png";

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

    const axiosInstance = useAxios();
    const CFSService = new cfsService(axiosInstance);

    const initialSearchCriteria = {
        companyId: companyid, branchId,
        searchValue: '',
        startDate: new Date(),
        endDate: new Date()
    }

    const [searchCriteria, setSearchCriteria] = useState(initialSearchCriteria);
    const [damageReportData, setDamageReportData] = useState([]);



    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = damageReportData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(damageReportData.length / itemsPerPage);

    console.log('damageReportData : \n', damageReportData);


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


















    const handleClear = async () => {
        setSearchCriteria(initialSearchCriteria);
        handleShow(initialSearchCriteria);
    }


    const handleShow = async (searchCriteria) => {
        setLoading(true);
        try {
            const response = await CFSService.getDamageReport(searchCriteria, jwtToken);
            setDamageReportData(response.data);
            if (!response.data || response.data.length === 0) {
                toast.info('No data found!', {
                    position: 'top-center',
                    autoClose: 700,
                });
            }
            setDamageReportData(response.data);

        } catch (error) {
            console.log('something went wrong in a damage search...');
            toast.error('Oops something went wrong!', {
                position: 'top-center',
                autoClose: 700,
            });
        } finally {
            setLoading(false);
        }
    }


    const handleDownload = async (searchCriteria) => {
        setLoading(true);
        try {
            const response = await CFSService.downLoadDamageReport(searchCriteria, jwtToken);
            if (response.status === 200) {
                const blob = new Blob([response.data], { type: response.headers['content-type'] });

                // Create a temporary URL for the blob
                const url = window.URL.createObjectURL(blob);

                // Create a link element to trigger the download
                const a = document.createElement("a");
                a.href = url;
                a.download = 'Damage_Report.xlsx';
                document.body.appendChild(a);
                a.click();

                // Clean up
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }

        } catch (error) {
            console.log('something went wrong in a damage report download...');
            toast.error('Oops something went wrong!', {
                position: 'top-center',
                autoClose: 700,
            });
        } finally {
            setLoading(false);
        }
    }

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
                sbNoEntry.gateInId, sbNoEntry.srNo, sbNoEntry.containerNo, jwtToken
            );

            console.log(' response.data \n', response.data);

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




    const [isModalOpenForViewDocument, setIsModalOpenForViewDocument] = useState(false);
    const [viewFile, setViewFile] = useState('');


    const handleView = (file) => {
        setViewFile(file);
        setIsModalOpenForViewDocument(true);
    };


    const renderFile = () => {
        if (!viewFile) return null;

        if (viewFile.fileType === 'application/pdf') {
            return <iframe src={viewFile.base64Url} title="PDF Viewer" style={{ width: '100%', height: '500px' }} />;
        }
        else if (viewFile.fileType.startsWith('image/')) {
            return <img src={viewFile.base64Url} alt="Preview" style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />;
        }
        else if (
            viewFile.fileType === 'application/vnd.ms-excel' ||
            viewFile.fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ) {
            const handleDownload = () => {
                const link = document.createElement('a');
                link.href = viewFile.base64Url;
                link.download = viewFile.fileName || 'file.xlsx';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };

            return (
                <div>
                    <p>Excel files cannot be previewed. Click below to download:</p>
                    <Button
                        type="button"
                        className="newButton mt-2 mb-2"
                        color="primary"
                        outline
                        style={{ marginRight: '10px' }}
                        onClick={handleDownload}
                    >
                        <FontAwesomeIcon
                            icon={faDownload}
                            style={{ marginRight: "5px" }}
                        />
                        Download {viewFile.fileName}
                    </Button>



                </div>
            );
        }
        else if (viewFile.fileType === 'text/csv') {
            try {
                const csvText = atob(viewFile.split(',')[1]);
                const rows = csvText.split('\n').map((row) => row.split(','));

                return (
                    <table className="table table-bordered">
                        <thead>
                            <tr>{rows[0].map((col, i) => <th key={i}>{col}</th>)}</tr>
                        </thead>
                        <tbody>
                            {rows.slice(1).map((row, i) => (
                                <tr key={i}>{row.map((col, j) => <td key={j}>{col}</td>)}</tr>
                            ))}
                        </tbody>
                    </table>
                );
            } catch (error) {
                return (
                    <div>
                        <p>Error loading CSV preview. Click below to download:</p>
                        <a href={viewFile} download={viewFile.fileName} className="btn btn-primary">
                            Download {viewFile.fileName}
                        </a>
                    </div>
                );
            }
        }
        else {
            return <p>Unsupported file format</p>;
        }
    };


    const handleCloseViewDocument = async () => {
        setIsModalOpenForViewDocument(false);
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
                    <Col md={2}>

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
                    </Col>

                    <Col md={3}>
                        <FormGroup>
                            <label
                                className="forlabel bold-label"
                                htmlFor="searchValue"
                            >
                                Search by ContainerNo / JobNo / BL No
                            </label>
                            <input
                                className="form-control"
                                placeholder='Search by...'
                                type="text"
                                maxLength={30}
                                name="searchValue"
                                onChange={(e) => setSearchCriteria(pre => ({ ...pre, searchValue: e.target.value }))}
                                value={searchCriteria.searchValue}
                            />
                        </FormGroup>
                    </Col>

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

                        {damageReportData.length > 0 && (
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ fontSize: 12, marginLeft: 5 }}
                                id="submitbtn2"
                                onClick={() => { handleDownload(searchCriteria); }}
                            >
                                <FontAwesomeIcon icon={faFileExcel} style={{ marginRight: '5px' }} />
                                Download
                            </button>
                        )}


                    </Col>




                </Row>


                {damageReportData?.length > 0 && (
                    <>
                        <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
                            <Table className="table table-bordered" style={{ border: '2px solid black' }}>
                                <thead>
                                    <tr>
                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                            Sr No.
                                        </th>
                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                            BOE No
                                        </th>
                                        <th scope="col" className="text-center" style={{ color: "black", width: "100px" }}>
                                            Job No
                                        </th>
                                        <th scope="col" className="text-center" style={{ color: "black", width: "100px" }}>
                                            Container No
                                        </th>
                                        <th scope="col" className="text-center" style={{ color: "black", width: "100px" }}>
                                            Size/Type
                                        </th>
                                        <th scope="col" className="text-center" style={{ color: "black", width: "100px" }}>
                                            Receiving Date
                                        </th>
                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                            Commodity Description
                                        </th>
                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                            Importer
                                        </th>
                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                            Damaged Type
                                        </th>

                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                            Images
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
                                            <td>{item.boeNo}</td>
                                            <td>{item.jobNo}</td>
                                            <td>{item.containerNo}</td>
                                            <td>{item.containerSize + ' / ' + item.containerType}</td>
                                            <td>{formatDate(item.receivingDate)}</td>
                                            <td>{item.commodityDescription}</td>
                                            <td>{item.importerName}</td>
                                            <td>
                                                {item.isContainerDamage === 'Y' && item.isCargoDamage === 'Y'
                                                    ? 'CONTAINER & CARGO'
                                                    : item.isContainerDamage === 'Y'
                                                        ? 'CONTAINER'
                                                        : item.isCargoDamage === 'Y'
                                                            ? 'CARGO'
                                                            : ''}
                                            </td>
                                            <td className="text-center">
                                                {(() => {
                                                    try {
                                                        const path = item.documentUploadPath;

                                                        if (!path) return false;

                                                        // If string starts with [ and ends with ], parse it
                                                        if (typeof path === 'string' && path.trim().startsWith('[')) {
                                                            const arr = JSON.parse(path);
                                                            return Array.isArray(arr) && arr.length > 0;
                                                        }

                                                        // Otherwise, treat as normal string path
                                                        return path.trim().length > 0;
                                                    } catch (e) {
                                                        return false;
                                                    }
                                                })() && (
                                                        <FontAwesomeIcon
                                                            icon={faEye}
                                                            onClick={() => handleOpenDocumentUpload(item)}
                                                            style={{ color: 'green', cursor: 'pointer', fontSize: '24px' }}
                                                        />
                                                    )}
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </>
                )}

                <hr />

            </div>



            {/* Document Upload */}

            <Modal Modal isOpen={isModalOpenForDocumentUpload} onClose={handleCloseDocumentUpload} toggle={handleCloseDocumentUpload} style={{ maxWidth: '1000px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>

                <ModalHeader toggle={handleCloseDocumentUpload} style={{
                    backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
                    boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    borderRadius: '0',
                    backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }} >

                    <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', color: 'white' }} > <FontAwesomeIcon
                        icon={faUpload}
                        style={{
                            marginRight: '8px',
                            color: 'white',
                        }}
                    />View Documents</h5>

                </ModalHeader>
                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                    <Row>

                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbNo">
                                    Container No
                                </label>
                                <Input
                                    className="form-control"
                                    type="text"
                                    maxLength={15}
                                    name='sbNo'
                                    value={sbDocumentUpload[0]?.sbTransId || ""}
                                    disabled
                                />
                            </FormGroup>
                        </Col>

                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbTransId">
                                    Commodity
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    maxLength={15}
                                    name='SbTransId'
                                    value={sbDocumentUpload[0]?.commodityDescription || ""}
                                    disabled
                                />
                            </FormGroup>
                        </Col>



                        {/* <Col md={6}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="fileUpload">
                                    Upload File (Image/PDF/XLS)
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="fileUpload"
                                    multiple
                                    accept="image/png, image/jpeg, application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                    onChange={handleFileUploadFileChange}
                                />
                            </FormGroup>
                        </Col> */}
                        {/* </Row>

                    <Row> */}

                        <Col xs={12} md={4}>

                            <Row>


                                <Col xs={12} md={6}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="isContainerDamage">
                                            Container Damage
                                        </label>
                                        <Input
                                            className={`form-control`}
                                            type="checkbox"
                                            name='isContainerDamage'
                                            checked={sbDocumentUpload[0]?.isContainerDamage === 'Y'}
                                            // onChange={handleChangeDamageDetails}
                                            style={{ width: '20px', height: '24px', cursor: 'pointer', margin: '0' }}
                                            disabled
                                        />
                                    </FormGroup>
                                </Col>


                                <Col xs={12} md={6}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="isCargoDamage">
                                            Cargo Damage
                                        </label>
                                        <Input
                                            className={`form-control`}
                                            type="checkbox"
                                            name='isCargoDamage'
                                            checked={sbDocumentUpload[0]?.isCargoDamage === 'Y'}
                                            // onChange={handleChangeDamageDetails}
                                            style={{ width: '20px', height: '24px', cursor: 'pointer', margin: '0' }}
                                            disabled
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>

                        <Col md={4}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="damageRemark"
                                >
                                    Remark
                                </label>
                                <textarea
                                    className="form-control"
                                    id="damageRemark"
                                    name='damageRemark'
                                    value={sbDocumentUpload[0]?.damageRemark}
                                    // onChange={handleChangeDamageDetails}
                                    maxLength={300}
                                    rows={2}
                                    disabled
                                ></textarea>
                            </FormGroup>
                        </Col>


                    </Row>





                    {sbDocumentUpload.length > 0 && sbDocumentUpload.some(file => file.fileName) && (
                        <div className="file-scroll-container">
                            <Row className="flex-nowrap">
                                {sbDocumentUpload.map((file, index) => (
                                    file.base64Url && (
                                        <Col key={index} md="auto">
                                            <div className="file-preview-wrapper">
                                                <div className="file-preview">
                                                    {/* <span className="remove-btn" onClick={() => handleRemoveFile(index, file.sbNo, file.sbLineNo, file.sbTransId, file.hSbTransId, file.isSaved, file.fileName, file.commodityDescription, file.isCargoDamage, file.isContainerDamage, file.damageRemark)}>&times;</span> */}
                                                    <div onClick={() => handleView(file)}>
                                                        {file.fileType === "application/pdf" ? (
                                                            <img src={pdfLogo} alt="PDF Preview" className="file-thumbnail" />
                                                        ) : file.fileType === "application/vnd.ms-excel" ||
                                                            file.fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                                                            file.fileType === "text/csv" ? (
                                                            <img src={xlsLogo} alt="Excel/CSV Preview" className="file-thumbnail" />
                                                        ) : (
                                                            <img src={file.base64Url} alt={file.fileName} className="file-thumbnail" />
                                                        )}
                                                    </div>

                                                </div>
                                                <p className="file-name">{file.fileName}</p>
                                            </div>
                                        </Col>
                                    )
                                ))}
                            </Row>
                        </div>
                    )}
                </ModalBody>
            </Modal >


            <Modal Modal isOpen={isModalOpenForViewDocument} onClose={handleCloseViewDocument} toggle={handleCloseViewDocument} style={{ maxWidth: '1000px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>

                <ModalHeader toggle={handleCloseViewDocument} style={{
                    backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
                    boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    borderRadius: '0',
                    backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }} >
                    <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', color: 'white' }} > <FontAwesomeIcon
                        icon={faEye}
                        style={{
                            marginRight: '8px',
                            color: 'white',
                        }}
                    />View Document</h5>

                </ModalHeader>
                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg)', backgroundSize: 'cover' }}>
                    {renderFile()}
                </ModalBody>
            </Modal >





        </>
    )
}
