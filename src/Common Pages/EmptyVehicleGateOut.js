
import AuthContext from '../Components/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import ipaddress from "../Components/IpAddress";
import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts';
import Select, { components } from 'react-select';
import { Pagination } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import {
    Card,
    CardBody,
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    Input,
    Table,
} from "reactstrap";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faCalendarAlt, faAdd, faCancel, faXmark, faArrowDown, faPlus, faArrowUp, faEdit, faChevronUp, faChevronDown, faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import useAxios from '../Components/useAxios';
import { dark } from '@mui/material/styles/createPalette';
import { toast } from 'react-toastify';
import { CSSTransition } from 'react-transition-group';

export default function EmptyVehicleGateOut({ activeTab,gateInId,gateOutId,vehicleno }) {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
        },
        label: {
            backgroundColor: '#e3eefa',
            padding: '5px',
            borderRadius: '4px',
        }
    };

    // If the user is not authenticated, redirect to the login page
    useEffect(() => {
        if (!isAuthenticated) {

            navigate('/login?message=You need to be authenticated to access this page.');
        }
    }, [isAuthenticated, navigate]);

    const axios = useAxios();

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
        tabMenus,
        userRights
    } = useContext(AuthContext);
    const location = useLocation();

    const [gateData, setGateData] = useState([]);

    const getGateNo = () => {
        const jarId = 'J00063';
        axios.get(`${ipaddress}jardetail/getJarDetail?companyId=${companyid}&jarId=${jarId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {

                if (response.data.length === 0) {
                    setGateData([]);
                }
                else {
                    setGateData(response.data);
                }

            })
            .catch((error) => {
                setGateData([]);
            })
    }

    useEffect(() => {
        if (activeTab === 'P00602') {
            getGateNo();

            if(gateOutId === ''){
                getVehicleData(gateInId);
            }
            else{
                getSelectedGateOutData(gateInId,gateOutId);
            }
        }

    }, [activeTab,gateInId,gateOutId,vehicleno])

    const [gateOutData, setGateOutData] = useState({
        companyId: '',
        branchId: '',
        finYear: new Date().getFullYear(),
        erpDocRefNo: '',
        gateOutId: '',
        srNo: '',
        profitcentreId: '',
        gateOutDate: new Date(),
        processId: '',
        shift: '1',
        gateNoIn: '',
        gateNoOut: '',
        transporterStatus: 'P',
        transporter: '',
        transporterName: '',
        vehicleNo: '',
        tripType: '',
        driverName: '',
        createdBy: '',
        createdDate: '',
        approvedBy: '',
        approvedDate: '',
        editedBy: '',
        editedDate: '',
        status: '',
        comments: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGateOutData((prevState) => ({
            ...prevState,
            [name]: value
        }));

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };


    const [formErrors, setFormErrors] = useState({
        gateNoIn: '',
        gateNoOut: '',
        shift: '',
        vehicleNo: '',
        driverName: '',
        transporterName: ''
    })


    const handleClear = () => {
        setGateOutData({
            companyId: '',
            branchId: '',
            finYear: new Date().getFullYear(),
            erpDocRefNo: '',
            gateOutId: '',
            srNo: '',
            profitcentreId: '',
            gateOutDate: new Date(),
            processId: '',
            shift: '1',
            gateNoIn: '',
            gateNoOut: '',
            transporterStatus: 'P',
            transporter: '',
            transporterName: '',
            vehicleNo: '',
            tripType: '',
            driverName: '',
            createdBy: '',
            createdDate: '',
            approvedBy: '',
            approvedDate: '',
            editedBy: '',
            editedDate: '',
            status: '',
            comments: ''
        })
        setFormErrors({
            gateNoIn: '',
            gateNoOut: '',
            shift: '',
            vehicleNo: '',
            driverName: '',
            transporterName: ''
        })
    }

    const handleSave = () => {
        setLoading(true);
        let errors = {};

        if (!gateOutData.shift) {
            errors.shift = "Gate out shift is required."
        }
        if (!gateOutData.gateNoIn) {
            errors.gateNoIn = "Gate no. in is required."
        }
        if (!gateOutData.vehicleNo) {
            errors.vehicleNo = "Vehicle No is required."
        }
        if (!gateOutData.driverName) {
            errors.driverName = "Driver is required."
        }
        if (!gateOutData.gateNoOut) {
            errors.gateNoOut = "Gate no. out is required."
        }
        if (!gateOutData.transporterName) {
            errors.transporterName = "Transporter is required."
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setLoading(false);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            })
            return;
        }

        axios.post(`${ipaddress}gateIn/saveEmptyGateOut?cid=${companyid}&bid=${branchId}&userId=${userId}`, gateOutData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {

                const data = response.data;
                setGateOutData({
                    companyId: data.companyid || '',
                    branchId: data.branchId || '',
                    finYear: data.finYear || new Date().getFullYear(),
                    erpDocRefNo: data.erpDocRefNo || '',
                    gateOutId: data.gateOutId || '',
                    srNo: data.srNo || '1',
                    profitcentreId: data.profitcentreId || '',
                    gateOutDate: new Date(data.gateOutDate) || new Date(),
                    processId: data.processId || '',
                    shift: data.shift || '1',
                    gateNoIn: data.gateNoIn || '',
                    gateNoOut: data.gateNoOut || '',
                    transporterStatus: data.transporterStatus || 'P',
                    transporter: data.transporter || '',
                    transporterName: data.transporterName || '',
                    vehicleNo: data.vehicleNo || '',
                    tripType: data.tripType || '',
                    driverName: data.driverName || '',
                    createdBy: data.createdBy || '',
                    createdDate: new Date(data.createdDate) || null,
                    approvedBy: data.approvedBy || '',
                    approvedDate: new Date(data.approvedDate) || null,
                    editedBy: data.editedBy || '',
                    editedDate: new Date(data.editedDate) || null,
                    status: data.status || '',
                    comments: data.comments || ''
                })


                toast.success("Data save successfully!!", {
                    autoClose: 800
                })
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })

    }

    const getSelectedGateOutData = (gateInId, gateOutId) => {

        if(!gateInId || !gateOutId){
            return;
        }

        axios.get(`${ipaddress}gateIn/getSelectedGateOutData?cid=${companyid}&bid=${branchId}&gateInId=${gateInId}&gateOutId=${gateOutId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;

                setGateOutData({
                    companyId: data.companyid || '',
                    branchId: data.branchId || '',
                    finYear: data.finYear || new Date().getFullYear(),
                    erpDocRefNo: data.erpDocRefNo || '',
                    gateOutId: data.gateOutId || '',
                    srNo: data.srNo || '1',
                    profitcentreId: data.profitcentreId || '',
                    gateOutDate: new Date(data.gateOutDate) || new Date(),
                    processId: data.processId || '',
                    shift: data.shift || '1',
                    gateNoIn: data.gateNoIn || '',
                    gateNoOut: data.gateNoOut || '',
                    transporterStatus: data.transporterStatus || 'P',
                    transporter: data.transporter || '',
                    transporterName: data.transporterName || '',
                    vehicleNo: data.vehicleNo || '',
                    tripType: data.tripType || '',
                    driverName: data.driverName || '',
                    createdBy: data.createdBy || '',
                    createdDate: new Date(data.createdDate) || null,
                    approvedBy: data.approvedBy || '',
                    approvedDate: new Date(data.approvedDate) || null,
                    editedBy: data.editedBy || '',
                    editedDate: new Date(data.editedDate) || null,
                    status: data.status || '',
                    comments: data.comments || ''
                })
                closeGateOutModal();
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
            })
    }

    const [vehData, setVehData] = useState([]);
    const searchVehTrkData = (val) => {
        if (!val) {
            setVehData([]);
            return;
        }

        axios.get(`${ipaddress}gateIn/getVehTrkData?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const portOptions = data.map(port => ({
                    value: port[0],
                    label: port[0],
                    code: port[1]
                }))
                setVehData(portOptions);
            })
            .catch((error) => {
                setVehData([]);
            })
    }

    const getVehicleData = (id) => {

        if(!id){
            return;
        }

        axios.get(`${ipaddress}gateIn/getVehTrkSelectedData?cid=${companyid}&bid=${branchId}&val=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;

                setGateOutData({
                    companyId: companyid || '',
                    branchId: branchId || '',
                    finYear: new Date().getFullYear(),
                    erpDocRefNo: data.gateInId || '',
                    gateOutId: '',
                    srNo: '1',
                    profitcentreId: data.profitcentreId || '',
                    gateOutDate: new Date() || '',
                    processId: data.processId || '',
                    shift: '1',
                    gateNoIn: data.gateNoIn || '',
                    gateNoOut: '',
                    transporterStatus: data.transporterStatus || 'P',
                    transporter: data.transporter || '',
                    transporterName: data.transporterName || '',
                    vehicleNo: data.vehicleNo || '',
                    tripType: '',
                    driverName: data.driverName || '',
                    createdBy: '',
                    createdDate: '',
                    approvedBy: '',
                    approvedDate: '',
                    editedBy: '',
                    editedDate: '',
                    status: '',
                    comments: ''
                })
            })
            .catch((error) => {
                handleClear();
            })
    }

    const handleVehicleChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setGateOutData({
                ...gateOutData,
                vehicleNo: ''
            })
            handleClear();
        }
        else {
            setGateOutData({
                ...gateOutData,
                vehicleNo: selectedOption.value
            })
            getVehicleData(selectedOption.code);
        }
    }


    const [isModalOpenForGateOut, setIsModalOpenForGateOut] = useState(false);
    const [searchId, setSearchId] = useState('');
    const [searchData, setSearchData] = useState([]);

    const search = (val) => {
        setLoading(true);


        axios.get(`${ipaddress}gateIn/searchgateOutData?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setSearchData(response.data);
                toast.success("Data found successfully!!!", {
                    autoClose: 800
                })
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(searchData.length / itemsPerPage);

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

    const openGateOutModal = () => {
        setIsModalOpenForGateOut(true);
        search('');
    }

    const closeGateOutModal = () => {
        setIsModalOpenForGateOut(false);
        setSearchId('');
        setSearchData([]);
    }

    const handleSearchReset = () => {
        setSearchId('');
        search('');
    }

    return (
        <div>
            {loading && (
                <div style={styles.overlay}>
                    <div className="loader">
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
                </div>
            )}
            <Modal Modal isOpen={isModalOpenForGateOut} onClose={closeGateOutModal} toggle={closeGateOutModal} style={{ maxWidth: '1000px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                <ModalHeader toggle={closeGateOutModal} style={{
                    backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
                    boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    borderRadius: '0',
                    backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    //backgroundPosition: 'center',
                    backgroundPosition: 'center',
                }} >


                    <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', color: 'white' }} > <FontAwesomeIcon
                        icon={faSearch}
                        style={{
                            marginRight: '8px',
                            color: 'white', // Set the color to golden
                        }}
                    /> Search Empty Gate Out Records</h5>



                </ModalHeader>
                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel" htmlFor="sbRequestId">Search By Gate Out No / Vehicle No</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="searchId"
                                    value={searchId}
                                    onChange={(e) => setSearchId(e.target.value)}

                                />
                            </FormGroup>
                        </Col>

                        <Col md={4} style={{ marginTop: 24 }}>
                            <button
                                className="btn btn-outline-success btn-margin newButton"
                                id="submitbtn2"
                                style={{ fontSize: 13, marginRight: 5 }}
                                onClick={() => search(searchId)}
                            >
                                <FontAwesomeIcon icon={faSearch} style={{ marginRight: "1px" }} />
                                Search
                            </button>
                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ fontSize: 13 }}
                                id="submitbtn2"
                                onClick={handleSearchReset}
                            >
                                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "1px" }} />
                                Reset
                            </button>
                        </Col>
                    </Row>
                    <hr />
                    <div className="mt-1 table-responsive ">
                        <table className="table table-bordered table-hover tableHeader">
                            <thead className='tableHeader'>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Gate Out No</th>
                                    <th scope="col">Gate Out Date</th>
                                    <th scope="col">Gate No</th>
                                    <th scope="col">Gate Out Shift</th>
                                    <th scope="col">Driver</th>
                                    <th scope="col">Vehicle No</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input type="radio" onChange={()=>getSelectedGateOutData(item[6],item[0])} name="radioGroup" />
                                        </td>
                                        <td>{item[0]}</td>
                                        <td>{item[1]}</td>
                                        <td>{item[2]}</td>
                                        <td>{item[3]}</td>
                                        <td>{item[4]}</td>
                                        <td>{item[5]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
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
                    </div>
                </ModalBody>
            </Modal>

            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Gate Out No
                        </label>
                        <Row>
                            <Col md={9}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    id="gateOutId"
                                    name='gateOutId'
                                    value={gateOutData.gateOutId}
                                    onChange={handleChange}
                                    disabled
                                />
                            </Col>
                            <Col md={3}>
                                <button
                                    className="btn btn-outline-primary btn-margin newButton"
                                    id="submitbtn2"
                                    style={{ fontSize: 13, marginRight: 5 }}
                                    onClick={openGateOutModal}
                                >
                                    <FontAwesomeIcon icon={faSearch} style={{ marginRight: "1px" }} />

                                </button>
                            </Col>
                        </Row>

                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Gate Out Date
                        </label>
                        <div style={{ position: 'relative' }}>
                            <DatePicker
                                selected={gateOutData.gateOutDate}
                                id='gateOutDate'
                                disabled
                                name='gateOutDate'
                                dateFormat="dd/MM/yyyy HH:mm"
                                className="form-control border-right-0 inputField"
                                customInput={<input style={{ width: '100%' }} />}
                                wrapperClassName="custom-react-datepicker-wrapper"
                            />
                            <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                        </div>

                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Gate Out Shift <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Input
                            className="form-control"
                            type="select"
                            id="shift"
                            name='shift'
                            style={{ borderColor: formErrors.shift ? 'red' : '' }}
                            value={gateOutData.shift}
                            onChange={handleChange}
                        >
                            <option value="1">Day</option>
                            <option value="2">Night</option>
                            <option value="3">Third</option>
                        </Input>
                        <div style={{ color: 'red' }} className="error-message">{formErrors.shift}</div>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>

                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Gate No (IN) <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Input
                            className="form-control"
                            type="select"
                            id="gateNoIn"
                            name='gateNoIn'
                            style={{ borderColor: formErrors.gateNoIn ? 'red' : '' }}
                            value={gateOutData.gateNoIn}
                            onChange={handleChange}
                            disabled
                        >
                            <option value="">Select Gate No</option>
                            {gateData.map((item, index) => (
                                <option key={index} value={item[0]}>{item[1]}</option>
                            ))}
                        </Input>
                        <div style={{ color: 'red' }} className="error-message">{formErrors.gateNoIn}</div>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Status
                        </label>
                        <Input
                            className="form-control"
                            type="text"
                            id="status"
                            name='status'
                            value={gateOutData.status === 'A' ? 'Approved' : gateOutData.status}
                            onChange={handleChange}
                            disabled
                        />

                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Created By
                        </label>
                        <Input
                            className="form-control"
                            type="text"
                            id="createdBy"
                            name='createdBy'
                            value={gateOutData.createdBy}
                            onChange={handleChange}
                            disabled
                        />

                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Vehicle No <span style={{ color: 'red' }}>*</span>
                        </label>
                        {/* <Input
                            className="form-control"
                            type="text"
                            id="vehicleNo"
                            name='vehicleNo'
                            style={{ borderColor: formErrors.vehicleNo ? 'red' : '' }}
                            value={gateOutData.vehicleNo}
                            onChange={handleChange}
                        /> */}
                        <Select
                            value={{ value: gateOutData.vehicleNo, label: gateOutData.vehicleNo }}
                            onInputChange={searchVehTrkData}
                            onChange={handleVehicleChange}
                            options={vehData}
                            placeholder="Select Vehicle No"
                            isClearable
                            isDisabled={gateOutData.gateOutId}
                            id="vehicleNo"
                            name="vehicleNo"
                            className={`autocompleteHeight ${formErrors.vehicleNo ? 'error-border' : ''}`}

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
                        <div style={{ color: 'red' }} className="error-message">{formErrors.vehicleNo}</div>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Vehicle Status
                        </label>
                        <Input
                            className="form-control"
                            type="text"
                            id="vehicleStatus"
                            name='vehicleStatus'
                            value="EMPTY"
                            disabled
                        />

                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Driver <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Input
                            className="form-control"
                            type="text"
                            id="driverName"
                            name='driverName'
                            maxLength={50}
                            style={{ borderColor: formErrors.driverName ? 'red' : '' }}
                            value={gateOutData.driverName}
                            onChange={handleChange}
                        />
                        <div style={{ color: 'red' }} className="error-message">{formErrors.driverName}</div>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>

                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Gate No (OUT) <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Input
                            className="form-control"
                            type="select"
                            id="gateNoOut"
                            name='gateNoOut'
                            style={{ borderColor: formErrors.gateNoOut ? 'red' : '' }}
                            value={gateOutData.gateNoOut}
                            onChange={handleChange}
                        >
                            <option value="">Select Gate No</option>
                            {gateData.map((item, index) => (
                                <option key={index} value={item[0]}>{item[1]}</option>
                            ))}
                        </Input>
                        <div style={{ color: 'red' }} className="error-message">{formErrors.gateNoOut}</div>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Profitcentre Id
                        </label>
                        <Input
                            className="form-control"
                            type="text"
                            id="profitcentreId"
                            name='profitcentreId'
                            value={gateOutData.profitcentreId}
                            onChange={handleChange}
                            disabled
                        />

                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Transporter Status
                        </label>
                        <Input
                            className="form-control"
                            type="select"
                            id="transporterStatus"
                            name='transporterStatus'
                            value={gateOutData.transporterStatus}
                            onChange={handleChange}
                            disabled
                        >
                            <option value="P">Private</option>
                            <option value="C">Contractor</option>
                        </Input>

                    </FormGroup>
                </Col>

            </Row>
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Transporter <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Input
                            className="form-control"
                            type="text"
                            id="transporterName"
                            name='transporterName'
                            value={gateOutData.transporterName}
                            onChange={handleChange}
                            style={{ borderColor: formErrors.transporterName ? 'red' : '' }}
                            disabled
                        />
                        <div style={{ color: 'red' }} className="error-message">{formErrors.transporterName}</div>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Comments
                        </label>
                        <Input
                            className="form-control"
                            type="textarea"
                            id="comments"
                            name='comments'
                            value={gateOutData.comments}
                            onChange={handleChange}
                            maxLength={150}
                        />

                    </FormGroup>
                </Col>

            </Row>
            <hr />

            <Row className='text-center'>
                <Col>
                    <button
                        className="btn btn-outline-primary btn-margin newButton"
                        style={{ marginRight: 10 }}
                        id="submitbtn2"
                        onClick={handleSave}
                    >
                        <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                        Save
                    </button>

                    <button
                        className="btn btn-outline-danger btn-margin newButton"
                        style={{ marginRight: 10 }}
                        id="submitbtn2"
                        onClick={handleClear}
                    >
                        <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                        Clear
                    </button>
                </Col>
            </Row>
        </div>
    )
}
