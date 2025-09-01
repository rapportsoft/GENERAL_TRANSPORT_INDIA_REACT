
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
import CreatableSelect from 'react-select/creatable';

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

export default function EmptyVehicleGateIn({ activeTab, gateInId }) {
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

    const [profitData, setProfitData] = useState([]);

    const getProfitCenters = () => {
        axios.get(`${ipaddress}api/profitcentres/getAllProfitCenters?companyId=${companyid}&branchId=${branchId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                console.log('Profitcentre data ',response.data);
                
                if (response.data.length === 0) {
                    setProfitData([]);
                }
                else {
                    setProfitData(response.data);
                }

            })
            .catch((error) => {
                setProfitData([]);
            })
    }

    const [transporterData, setTransporterData] = useState([]);

    const getTransporter = () => {
        axios.get(`${ipaddress}party/getTrans?cid=${companyid}&bid=${branchId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const portOptions = data.map(port => ({
                    value: port[0],
                    label: port[1],
                }))
                setTransporterData(portOptions);
            })
            .catch((error) => {

            })
    }


    const handleTransporter = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setGateInData({
                ...gateInData,
                transporter: '',
                transporterName: ''
            })
        }
        else {
            setGateInData({
                ...gateInData,
                transporter: selectedOption.value,
                transporterName: selectedOption.label
            })
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                ['transporterName']: "",
            }));
        }

    }
    console.log('activeTab ',activeTab);
    

    useEffect(() => {
        if (activeTab === 'P00601') {
            console.log('empty empty ');
            
            getGateNo();
            getProfitCenters();
            getTransporter();
            selectGateInData(gateInId);
        }
    }, [activeTab])

    const [gateInData, setGateInData] = useState({
        companyId: '',
        branchId: '',
        gateInId: '',
        finYear: new Date().getFullYear(),
        erpDocRefNo: '',
        docRefNo: '',
        srNo: '',
        inGateInDate: new Date(),
        status: '',
        shift: '1',
        gateNo: '',
        status: '',
        createdBy: '',
        gateNo: '',
        tripType: '',
        vehicleNo: '',
        driverName: '',
        profitcentreId: '',
        processId: 'P00601',
        transporterStatus: 'P',
        transporter: '',
        transporterName: ''
    })

    const handleGateInDataChange = (e) => {
        const { name, value } = e.target;
        setGateInData(prevState => ({
            ...prevState,
            [name]: value
        }));

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const [formErrors, setFormErrors] = useState({
        gateNo: '',
        tripType: '',
        vehicleNo: '',
        driverName: '',
        profitcentreId: '',
        transporterName: ''
    })

    const handleSave = () => {
        setLoading(true);
        let errors = {};

        if (!gateInData.gateNo) {
            errors.gateNo = "Gate No is required."
        }
        if (!gateInData.tripType) {
            errors.tripType = "Trip type is required."
        }
        if (!gateInData.vehicleNo) {
            errors.vehicleNo = "Vehicle No is required."
        }
        if (!gateInData.driverName) {
            errors.driverName = "Driver is required."
        }
        if (!gateInData.profitcentreId) {
            errors.profitcentreId = "Profitcentre Id is required."
        }
        if (!gateInData.transporterName) {
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

        axios.post(`${ipaddress}gateIn/saveEmptyVehiclegateIn?cid=${companyid}&bid=${branchId}&userId=${userId}`, gateInData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                console.log('gate in data ', data);

                setGateInData({
                    companyId: data.companyId || '',
                    branchId: data.branchId || '',
                    gateInId: data.gateInId || '',
                    finYear: data.finYear || new Date().getFullYear(),
                    erpDocRefNo: data.erpDocRefNo || '',
                    docRefNo: data.docRefNo || '',
                    srNo: data.srNo || '',
                    inGateInDate: new Date(data.inGateInDate) || new Date(),
                    status: data.status || '',
                    shift: data.shift || '1',
                    gateNo: data.gateNo || '',
                    status: data.status || '',
                    createdBy: data.createdBy || '',
                    gateNo: data.gateNo || '',
                    tripType: data.tripType || '',
                    vehicleNo: data.vehicleNo || '',
                    driverName: data.driverName || '',
                    profitcentreId: data.profitcentreId || '',
                    processId: data.processId || 'P00601',
                    transporterStatus: data.transporterStatus || 'P',
                    transporter: data.transporter || '',
                    transporterName: data.transporterName || ''
                });

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

    const handleClear = () => {
        setGateInData({
            companyId: '',
            branchId: '',
            gateInId: '',
            finYear: new Date().getFullYear(),
            erpDocRefNo: '',
            docRefNo: '',
            srNo: '',
            inGateInDate: new Date(),
            status: '',
            shift: '1',
            gateNo: '',
            status: '',
            createdBy: '',
            gateNo: '',
            tripType: '',
            vehicleNo: '',
            driverName: '',
            profitcentreId: '',
            processId: 'P00601',
            transporterStatus: 'P',
            transporter: '',
            transporterName: ''
        })

        setFormErrors({
            gateNo: '',
            tripType: '',
            vehicleNo: '',
            driverName: '',
            profitcentreId: '',
            transporterName: ''
        })
    }

    const [isModalOpenForGateIn, setIsModalOpenForGateIn] = useState(false);
    const [searchId, setSearchId] = useState('');
    const [searchData, setSearchData] = useState([]);

    const search = (val) => {
        setLoading(true);
        // if (!val) {
        //     toast.error("Please enter the search value", {
        //         autoClose: 800
        //     })
        //     setLoading(false);
        //     return;
        // }

        axios.get(`${ipaddress}gateIn/searchEmptyVehicleGateInRecords?cid=${companyid}&bid=${branchId}&val=${val}`, {
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
                setSearchData([]);
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


    const openGateInModal = () => {
        setIsModalOpenForGateIn(true);
        search('');
    }

    const closeGateInModal = () => {
        setIsModalOpenForGateIn(false);
        setSearchId('');
        setSearchData([]);
    }

    const handleSearchReset = () => {
        setSearchId('');
        search('');
    }

    const selectGateInData = (gateInId) => {
        if(!gateInId){
            return;
        }
        axios.get(`${ipaddress}gateIn/getSingleData2?cid=${companyid}&bid=${branchId}&gateinid=${gateInId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;

                if (data != null) {
                    setGateInData({
                        companyId: data.companyId || '',
                        branchId: data.branchId || '',
                        gateInId: data.gateInId || '',
                        finYear: data.finYear || new Date().getFullYear(),
                        erpDocRefNo: data.erpDocRefNo || '',
                        docRefNo: data.docRefNo || '',
                        srNo: data.srNo || '',
                        inGateInDate: new Date(data.inGateInDate) || new Date(),
                        status: data.status || '',
                        shift: data.shift || '1',
                        gateNo: data.gateNo || '',
                        status: data.status || '',
                        createdBy: data.createdBy || '',
                        gateNo: data.gateNo || '',
                        tripType: data.tripType || '',
                        vehicleNo: data.vehicleNo || '',
                        driverName: data.driverName || '',
                        profitcentreId: data.profitcentreId || '',
                        processId: data.processId || 'P00601',
                        transporterStatus: data.transporterStatus || 'P',
                        transporter: data.transporter || '',
                        transporterName: data.transporterName || ''
                    });
                    closeGateInModal();
                }
            })
            .catch((error) => {

            })
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

            <Modal Modal isOpen={isModalOpenForGateIn} onClose={closeGateInModal} toggle={closeGateInModal} style={{ maxWidth: '1000px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                <ModalHeader toggle={closeGateInModal} style={{
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
                    /> Search Empty Gate In Records</h5>



                </ModalHeader>
                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel" htmlFor="sbRequestId">Search By Gate In No / Vehicle No</label>
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
                                    <th scope="col">Gate In No</th>
                                    <th scope="col">Gate In Date</th>
                                    <th scope="col">Gate No</th>
                                    <th scope="col">Gate In Shift</th>
                                    <th scope="col">Driver</th>
                                    <th scope="col">Vehicle No</th>
                                    <th scope="col">Trip Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input type="radio" onChange={()=>selectGateInData(item[0])} name="radioGroup" />
                                        </td>
                                        <td>{item[0]}</td>
                                        <td>{item[1]}</td>
                                        <td>{item[2]}</td>
                                        <td>{item[3]}</td>
                                        <td>{item[4]}</td>
                                        <td>{item[5]}</td>
                                        <td>{item[6]}</td>
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
                            Gate In No
                        </label>
                        <Row>
                            <Col md={9}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    id="gateInId"
                                    name='gateInId'
                                    value={gateInData.gateInId}
                                    onChange={handleGateInDataChange}
                                    disabled
                                />
                            </Col>
                            <Col md={3}>
                                <button
                                    className="btn btn-outline-primary btn-margin newButton"
                                    id="submitbtn2"
                                    style={{ fontSize: 13, marginRight: 5 }}
                                    onClick={openGateInModal}
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
                            Gate In Date
                        </label>
                        <div style={{ position: 'relative' }}>
                            <DatePicker
                                selected={gateInData.inGateInDate}
                                id='inGateInDate'
                                disabled
                                name='inGateInDate'
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
                            Gate In Shift
                        </label>
                        <Input
                            className="form-control"
                            type="select"
                            id="shift"
                            name='shift'
                            value={gateInData.shift}
                            onChange={handleGateInDataChange}
                        >
                            <option value="1">Day</option>
                            <option value="2">Night</option>
                            <option value="3">Third</option>
                        </Input>

                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Gate No <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Input
                            className="form-control"
                            type="select"
                            id="gateNo"
                            name='gateNo'
                            style={{ borderColor: formErrors.gateNo ? 'red' : '' }}
                            value={gateInData.gateNo}
                            onChange={handleGateInDataChange}
                        >
                            <option value="">Select Gate No</option>
                            {gateData.map((item, index) => (
                                <option key={index} value={item[0]}>{item[1]}</option>
                            ))}
                        </Input>
                        <div style={{ color: 'red' }} className="error-message">{formErrors.gateNo}</div>
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
                            value={gateInData.status === 'A' ? 'Approved' : gateInData.status}
                            onChange={handleGateInDataChange}
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
                            value={gateInData.createdBy}
                            onChange={handleGateInDataChange}
                            disabled
                        />

                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Vehicle Status
                        </label>
                        <Input
                            className="form-control"
                            type="text"
                            id="igmNo"
                            name='igmNo'
                            value="EMPTY"
                            disabled
                        />

                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Vehicle In For <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Input
                            className="form-control"
                            type="select"
                            id="tripType"
                            name='tripType'
                            style={{ borderColor: formErrors.tripType ? 'red' : '' }}
                            value={gateInData.tripType}
                            onChange={handleGateInDataChange}
                        >
                            <option value="">Select Vehicle In For</option>
                            <option value="Empty">Empty Pickup</option>
                            <option value="Loaded">Loaded Pickup</option>
                            <option value="Cargo">Cargo Pickup</option>
                        </Input>
                        <div style={{ color: 'red' }} className="error-message">{formErrors.tripType}</div>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Vehicle No <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Input
                            className="form-control"
                            type="text"
                            id="vehicleNo"
                            name='vehicleNo'
                            style={{ borderColor: formErrors.vehicleNo ? 'red' : '' }}
                            value={gateInData.vehicleNo}
                            onChange={handleGateInDataChange}
                            maxLength={15}
                        />
                        <div style={{ color: 'red' }} className="error-message">{formErrors.vehicleNo}</div>
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
                            style={{ borderColor: formErrors.driverName ? 'red' : '' }}
                            name='driverName'
                            value={gateInData.driverName}
                            onChange={handleGateInDataChange}
                            maxLength={50}
                        />
                        <div style={{ color: 'red' }} className="error-message">{formErrors.driverName}</div>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Profitcentre Id <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Input
                            className="form-control"
                            type="select"
                            id="profitcentreId"
                            name='profitcentreId'
                            style={{ borderColor: formErrors.profitcentreId ? 'red' : '' }}
                            value={gateInData.profitcentreId}
                            onChange={handleGateInDataChange}
                        >
                            <option value="">Select Profitcentre Id</option>
                            {profitData.map((item, index) => (
                                <option key={index} value={item.profitcentreId}>{item.profitcentreDesc}</option>
                            ))}
                        </Input>
                        <div style={{ color: 'red' }} className="error-message">{formErrors.profitcentreId}</div>

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
                            value={gateInData.transporterStatus}
                            onChange={handleGateInDataChange}
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
                        {/* <Input
                            className="form-control"
                            type="text"
                            id="transporterName"
                            name='transporterName'
                            value={gateInData.transporterName}
                            onChange={handleGateInDataChange}
                        /> */}
                        {/* <Select
                            value={{ value: gateInData.transporter, label: gateInData.transporterName }}
                            onChange={handleTransporter}
                            options={transporterData}
                            placeholder="Select Transporter"
                            isClearable
                            id="transporter"
                            name="transporter"
                            className='autocompleteHeight'

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
                        
                        */}

                        <CreatableSelect
                            value={{ value: gateInData.transporter, label: gateInData.transporterName }}
                            onChange={handleTransporter}
                            onCreateOption={(inputValue) => {

                                setGateInData({
                                    ...gateInData,
                                    transporter: '',  // Save the manually typed value
                                    transporterName: inputValue.slice(0, 50) // Assign the value to transporterName as well
                                });
                                setFormErrors((prevErrors) => ({
                                    ...prevErrors,
                                    ['transporterName']: "",
                                }));
                            }}
                            options={transporterData}
                            placeholder="Select or Type Transporter"
                            isClearable
                            id="transporterName"
                            name="transporterName"
                            className={`autocompleteHeight ${formErrors.transporterName ? 'error-border' : ''}`}
                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    height: 32,
                                    minHeight: 32,
                                    border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
                                    boxShadow: "none",
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: 0,
                                    borderColor: formErrors.transporterName ? 'red' : '',
                                    borderRadius: '6px',
                                    "&:hover": {
                                        border: "1px solid #ccc",

                                    },
                                }),
                                valueContainer: (provided) => ({
                                    ...provided,
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0 0.75rem',
                                }),
                                singleValue: (provided) => ({
                                    ...provided,
                                    lineHeight: '32px',
                                }),
                                indicatorSeparator: () => ({
                                    display: "none",
                                }),
                                dropdownIndicator: () => ({
                                    display: "none",
                                }),
                                placeholder: (provided) => ({
                                    ...provided,
                                    lineHeight: '32px',
                                    color: "gray",
                                }),
                                clearIndicator: (provided) => ({
                                    ...provided,
                                    padding: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                }),
                            }}
                        />
                        <div style={{ color: 'red' }} className="error-message">{formErrors.transporterName}</div>

                    </FormGroup>
                </Col>
                {/* <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Transporter Name <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Input
                            className="form-control"
                            type="text"
                            id="igmNo"
                            name='igmNo'
                        />

                    </FormGroup>
                </Col> */}

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
