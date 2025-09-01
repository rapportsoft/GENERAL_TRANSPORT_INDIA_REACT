
import AuthContext from '../Components/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import ipaddress from "../Components/IpAddress";
import useAxios from '../Components/useAxios';
import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts';
import Select from 'react-select';
import { Pagination } from "react-bootstrap";
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import {
    Card,
    CardBody,
    Container,
    Row,
    Col,
    Form,
    Modal,
    ModalBody,
    ModalHeader,
    FormGroup,
    Label,
    Input,
    Table,
} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faGroupArrowsRotate, faPlus, faClose, faAdd, faArrowLeft, faEdit, faCalendarAlt, faAtom } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import { error } from 'jquery';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function AddVoyage() {
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
    const navigate = useNavigate();
    const axios = useAxios();
    const { isAuthenticated } = useContext(AuthContext);

    // If the user is not authenticated, redirect to the login page
    useEffect(() => {
        if (!isAuthenticated) {

            navigate('/login?message=You need to be authenticated to access this page.');
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
        tabMenus,
        userRights
    } = useContext(AuthContext);


    const location = useLocation();

    const back = () => {
        navigate(`/master/vessel`);
    }

    const [flag, setFlag] = useState(location.state?.flag);
    const vesselId = location.state?.vesselId;
    const vesselName = location.state?.vesselName;


    const [voyage, setVoyage] = useState({
        companyId: "",
        branchId: "",
        pod: "",
        pol: "",
        vesselCode: "",
        voyageNo: "",
        viaNo: "",
        igmNo: "",
        partyId: "",
        vesselSchdNo: "",
        srNo: 0,
        igmDate: "",
        eta: "",
        gateOpenDate: "",
        vesselArvDate: "",
        vesselSailDate: "",
        atb: "",
        atd: "",
        loadDateTime: "",
        cutOffDateTime: "",
        noOfCrew: 0,
        noOfPassenger: 0,
        positionOfVessel: "",
        masterName: "",
        berthNo: "",
        berthDate: "",
        rotationNo: "",
        rotationNoDate: "",
        viaNoDate: "",
        pcNo: "",
        pcDate: "",
        lightHouseCertNo: "",
        lightHouseCertDate: "",
        lightDues: 0.00,
        createdBy: "",
        createdDate: "",
        editedBy: "",
        editedDate: "",
        approvedBy: "",
        approvedDate: "",
        status: ""
    });

    // Function to update the state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setVoyage(prevState => ({
            ...prevState,
            [name]: value
        }));

        document.getElementById(name).classList.remove('error-border');
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const [portOfCallData, setPortOfCallData] = useState([]);
    const [nextPortOfCallData, setNextPortOfCallData] = useState([]);

    const [pid, setPid] = useState('');
    const [pname, setpname] = useState('');

    const [nid, setNid] = useState('');
    const [nName, setNname] = useState('');

    const getPortData = () => {
        axios.get(`${ipaddress}voyage/getPortData?cid=${companyid}&bid=${branchId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const portOptions = data.map(party => ({
                    value: party[0],
                    label: party[1]
                }));
                setPortOfCallData(portOptions);
                setNextPortOfCallData(portOptions);
            })
            .catch((error) => {

            })
    }

    const handlePortChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setPid('');
            setpname('');
        }
        else {
            setPid(selectedOption ? selectedOption.value : '');
            setpname(selectedOption ? selectedOption.label : '');
        }

        document.getElementById('pol').classList.remove('error-border');
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            ['pol']: "",
        }));
    };

    const handleNextPortChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setNid('');
            setNname('');
        }
        else {
            setNid(selectedOption ? selectedOption.value : '');
            setNname(selectedOption ? selectedOption.label : '');
        }
    };


    const [voyageData, setVoyageData] = useState([]);
    const [voyageNo, setVoyageNo] = useState('');
    const getDataByVesselId = (id) => {
        axios.get(`${ipaddress}voyage/search?cid=${companyid}&bid=${branchId}&vesselId=${vesselId}&voyageNo=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                console.log('response.data ', response.data);
                setVoyageData(response.data);
            })
            .catch((error) => {

            })
    }

    const handleClearSearch = () =>{
        setVoyageNo('');
        getDataByVesselId('');
    }

    useEffect(() => {
        getPortData();
        getDataByVesselId('');
    }, [])

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = voyageData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(voyageData.length / itemsPerPage);

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


    const handleETADate = (date) => {
        setVoyage({
            ...voyage,
            eta: date
        })
        document.getElementById('eta').classList.remove('error-border');
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            ['eta']: "",
        }));
    }

    const handlePortDate = (date) => {
        setVoyage({
            ...voyage,
            cutOffDateTime: date
        })
    }

    const handleGateDate = (date) => {
        setVoyage({
            ...voyage,
            gateOpenDate: date
        })
        document.getElementById('gateOpenDate').classList.remove('error-border');
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            ['gateOpenDate']: "",
        }));
    }

    const handleIGMDate = (date) => {
        setVoyage({
            ...voyage,
            igmDate: date
        })
    }

    const handleRotationDate = (date) => {
        setVoyage({
            ...voyage,
            rotationNoDate: date
        })
    }

    const handleATADate = (date) => {
        setVoyage({
            ...voyage,
            atb: date
        })
    }

    const handleATSDate = (date) => {
        setVoyage({
            ...voyage,
            atd: date
        })
    }

    const handleVIADate = (date) => {
        setVoyage({
            ...voyage,
            viaNoDate: date
        })
    }

    const [formErrors, setFormErrors] = useState({
        voyageNo: '',
        pol: '',
        viaNo: '',
        eta: '',
        gateOpenDate: ''
    })

    const saveData = () => {
        setFormErrors({
            voyageNo: '',
            pol: '',
            viaNo: '',
            eta: '',
            gateOpenDate: ''
        })
        document.getElementById('voyageNo').classList.remove('error-border');
        document.getElementById('pol').classList.remove('error-border');
        document.getElementById('viaNo').classList.remove('error-border');
        document.getElementById('eta').classList.remove('error-border');
        document.getElementById('gateOpenDate').classList.remove('error-border');
        let errors = {};
        setLoading(true);

        if (!voyage.voyageNo) {
            errors.voyageNo = "Voyage no is required."
            document.getElementById("voyageNo").classList.add('error-border');
        }

        if (!pid) {
            errors.pol = "Port Of call is required."
            document.getElementById("pol").classList.add('error-border');
        }

        if (!voyage.viaNo) {
            errors.viaNo = "Via no is required."
            document.getElementById("viaNo").classList.add('error-border');
        }

        if (!voyage.eta) {
            errors.eta = "Berthing\ETA date time is required."
            document.getElementById("eta").classList.add('error-border');
        }

        if (!voyage.gateOpenDate) {
            errors.gateOpenDate = "Gate open date time is required."
            document.getElementById("gateOpenDate").classList.add('error-border');
        }

        if (Object.keys(errors).length > 0) {
            setLoading(false);
            setFormErrors(errors);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            })
            return;
        }

        // Correct assignment syntax
        voyage.vesselCode = vesselId;
        voyage.pol = pid;
        voyage.pod = nid;
        console.log('voyage ', voyage);
        axios.post(`${ipaddress}voyage/saveData?cid=${companyid}&bid=${branchId}&user=${userId}&flag=${flag}`, voyage, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                console.log('ssg ', response.data);
                // setVoyage(response.data);
                getVoyageData(response.data.vesselCode, response.data.srNo);
                getDataByVesselId(voyageNo);
                toast.success("Data saved successfully!!", {
                    autoClose: 800
                });
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                });
                setLoading(false);

            });
    }


    const getVoyageData = (voyage, sr) => {
        axios.get(`${ipaddress}voyage/getVoyageData?cid=${companyid}&bid=${branchId}&voyage=${voyage}&sr=${sr}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {

                setVoyage(response.data)
                setFlag('edit')
                setPid(response.data.pol);
                setNid(response.data.pod);

                const findPName = portOfCallData.find(item => item.value === response.data.pol);
                const findNname = nextPortOfCallData.find(item => item.value === response.data.pod);
                setpname(findPName.label);
                setNname(findNname.label);
            })
            .catch((error) => {

            })
    }

    const handleClear = () => {
        setFormErrors({
            voyageNo: '',
            pol: '',
            viaNo: '',
            eta: '',
            gateOpenDate: ''
        })
        document.getElementById('voyageNo').classList.remove('error-border');
        document.getElementById('pol').classList.remove('error-border');
        document.getElementById('viaNo').classList.remove('error-border');
        document.getElementById('eta').classList.remove('error-border');
        document.getElementById('gateOpenDate').classList.remove('error-border');

        setVoyage({
            companyId: "",
            branchId: "",
            pod: "",
            pol: "",
            vesselCode: "",
            voyageNo: "",
            viaNo: "",
            igmNo: "",
            partyId: "",
            vesselSchdNo: "",
            srNo: 0,
            igmDate: "",
            eta: "",
            gateOpenDate: "",
            vesselArvDate: "",
            vesselSailDate: "",
            atb: "",
            atd: "",
            loadDateTime: "",
            cutOffDateTime: "",
            noOfCrew: 0,
            noOfPassenger: 0,
            positionOfVessel: "",
            masterName: "",
            berthNo: "",
            berthDate: "",
            rotationNo: "",
            rotationNoDate: "",
            viaNoDate: "",
            pcNo: "",
            pcDate: "",
            lightHouseCertNo: "",
            lightHouseCertDate: "",
            lightDues: 0.00,
            createdBy: "",
            createdDate: "",
            editedBy: "",
            editedDate: "",
            approvedBy: "",
            approvedDate: "",
            status: ""
        })
        setFlag('add');
        setPid('');
        setpname('');
        setNid('');
        setNname('');
    }


    const deleteVoyage = (vesselId, sr) => {
        Swal.fire({
            title: 'Are you sure?',
            html: `Are you sure you want to delete the record?`,
            icon: 'warning',
            showCancelButton: true,
            customClass: {
                icon: 'icon-smaller' // Apply the custom class to the icon
            },
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, close it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`${ipaddress}voyage/deleteVoyage?cid=${companyid}&bid=${branchId}&vesselId=${vesselId}&sr=${sr}`, null, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                })
                    .then((response) => {
                        getDataByVesselId(voyageNo);
                        if (response.data === 'success') {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Data deleted successfully!!!",
                                icon: "success"
                            });
                        }
                        else {
                            toast.error(response.data, {
                                autoClose: 800
                            })
                        }

                    })
                    .catch((error) => {

                    })

            }
        });
    }

    const handlePageChange1 = () => {
        setCurrentPage(1)
    }

    return (
        <div className='Container'>
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
            <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
                icon={faPlus}
                style={{
                    marginRight: '8px',
                    color: 'black', // Set the color to golden
                }}
            />Add Voyage</h5>
            <Card style={{ backgroundColor: "#F8F8F8" }}>
                <CardBody>
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <Label className="inputHeader">Vessel Code</Label><span style={{ color: 'red' }}>*</span>
                                <Input
                                    type="text"
                                    name="phoneNo"
                                    id='phoneNo'
                                    className="form-control inputField"
                                    readOnly
                                    value={vesselName}
                                    style={{ backgroundColor: '#E0E0E0' }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label className="inputHeader">Voyage No</Label> <span style={{ color: 'red' }}>*</span>
                                <Input
                                    type="text"
                                    name="voyageNo"
                                    id='voyageNo'
                                    className="form-control inputField"
                                    value={voyage.voyageNo}
                                    onChange={handleChange}
                                    maxLength={10}
                                />
                                <div style={{ color: 'red' }} className="error-message">{formErrors.voyageNo}</div>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label className="inputHeader">Status</Label>
                                <Input
                                    type="text"
                                    name="status"
                                    id='status'
                                    className="form-control inputField"
                                    readOnly
                                    value={voyage.status === 'A' ? 'Approved' : ''}
                                    style={{ backgroundColor: '#E0E0E0' }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <Label className="inputHeader">Port Of Call</Label><span style={{ color: 'red' }}>*</span>
                                <Select
                                    options={portOfCallData}
                                    onChange={handlePortChange}
                                    value={{ value: pid, label: pname }}
                                    id="pol"
                                    name="pol"
                                    isClearable
                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                border: '1px solid #ccc',
                                            },
                                        }),
                                        indicatorSeparator: () => ({
                                            display: 'none',
                                        }),
                                        dropdownIndicator: () => ({
                                            display: 'none',
                                        }),
                                    }}

                                />
                                <div style={{ color: 'red' }} className="error-message">{formErrors.pol}</div>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label className="inputHeader">Next Port Of Call</Label>
                                <Select
                                    options={nextPortOfCallData}
                                    onChange={handleNextPortChange}
                                    value={{ value: nid, label: nName }}
                                    id="pod"
                                    name="pod"
                                    isClearable
                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                border: '1px solid #ccc',
                                            },
                                        }),
                                        indicatorSeparator: () => ({
                                            display: 'none',
                                        }),
                                        dropdownIndicator: () => ({
                                            display: 'none',
                                        }),
                                    }}

                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label className="inputHeader">VIA No</Label><span style={{ color: 'red' }}>*</span>
                                <Input
                                    type="text"
                                    name="viaNo"
                                    id='viaNo'
                                    className="form-control inputField"
                                    value={voyage.viaNo}
                                    onChange={handleChange}
                                    maxLength={10}
                                />
                                <div style={{ color: 'red' }} className="error-message">{formErrors.viaNo}</div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Label className="forlabel" for="nocTransDate">Berthing\ETA Date Time</Label><span style={{ color: 'red' }}>*</span>
                            <div style={{ position: 'relative' }}>
                                <DatePicker
                                    selected={voyage.eta}
                                    id='eta'
                                    name='eta'
                                    onChange={handleETADate}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control border-right-0 inputField"
                                    customInput={<input style={{ width: '100%' }} />}
                                    wrapperClassName="custom-react-datepicker-wrapper"
                                />
                                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                <div style={{ color: 'red' }} className="error-message">{formErrors.eta}</div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <Label className="forlabel" for="nocTransDate">Gate Open Date Time</Label><span style={{ color: 'red' }}>*</span>
                            <div style={{ position: 'relative' }}>
                                <DatePicker
                                    selected={voyage.gateOpenDate}
                                    id='gateOpenDate'
                                    name='gateOpenDate'
                                    onChange={handleGateDate}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control border-right-0 inputField"
                                    customInput={<input style={{ width: '100%' }} />}
                                    wrapperClassName="custom-react-datepicker-wrapper"
                                />
                                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                <div style={{ color: 'red' }} className="error-message">{formErrors.gateOpenDate}</div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label className="inputHeader">IGM No</Label>
                                <Input
                                    type="text"
                                    name="igmNo"
                                    id='igmNo'
                                    className="form-control inputField"
                                    value={voyage.igmNo}
                                    onChange={handleChange}
                                    maxLength={10}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Label className="forlabel" for="nocTransDate">IGM Date</Label>
                            <div style={{ position: 'relative' }}>
                                <DatePicker
                                    selected={voyage.igmDate}
                                    id='igmDate'
                                    onChange={handleIGMDate}
                                    name='igmDate'
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control border-right-0 inputField"
                                    customInput={<input style={{ width: '100%' }} />}
                                    wrapperClassName="custom-react-datepicker-wrapper"
                                />
                                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                            </div>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label className="inputHeader">Rotation No</Label>
                                <Input
                                    type="text"
                                    name="rotationNo"
                                    id='rotationNo'
                                    className="form-control inputField"
                                    value={voyage.rotationNo}
                                    onChange={handleChange}
                                    maxLength={10}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <Label className="forlabel" for="nocTransDate">Rotation Date</Label>
                            <div style={{ position: 'relative' }}>
                                <DatePicker
                                    selected={voyage.rotationNoDate}
                                    id='rotationNoDate'
                                    name='rotationNoDate'
                                    onChange={handleRotationDate}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control border-right-0 inputField"
                                    customInput={<input style={{ width: '100%' }} />}
                                    wrapperClassName="custom-react-datepicker-wrapper"
                                />
                                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Label className="forlabel" for="nocTransDate">ATA</Label>
                            <div style={{ position: 'relative' }}>
                                <DatePicker
                                    selected={voyage.atb}
                                    id='atb'
                                    name='atb'
                                    onChange={handleATADate}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control border-right-0 inputField"
                                    customInput={<input style={{ width: '100%' }} />}
                                    wrapperClassName="custom-react-datepicker-wrapper"
                                />
                                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                            </div>
                        </Col>
                        <Col md={4}>
                            <Label className="forlabel" for="nocTransDate">VIA No Date</Label>
                            <div style={{ position: 'relative' }}>
                                <DatePicker
                                    selected={voyage.viaNoDate}
                                    id='viaNoDate'
                                    name='viaNoDate'
                                    dateFormat="dd/MM/yyyy"
                                    onChange={handleVIADate}
                                    className="form-control border-right-0 inputField"
                                    customInput={<input style={{ width: '100%' }} />}
                                    wrapperClassName="custom-react-datepicker-wrapper"
                                />
                                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                            </div>
                        </Col>
                        <Col md={4}>
                            <Label className="forlabel" for="nocTransDate">ATS</Label>
                            <div style={{ position: 'relative' }}>
                                <DatePicker
                                    selected={voyage.atd}
                                    id='atd'
                                    name='atd'
                                    onChange={handleATSDate}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control border-right-0 inputField"
                                    customInput={<input style={{ width: '100%' }} />}
                                    wrapperClassName="custom-react-datepicker-wrapper"
                                />
                                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Label className="forlabel" for="nocTransDate">	Port Cut Of Date</Label>
                            <div style={{ position: 'relative' }}>
                                <DatePicker
                                    selected={voyage.cutOffDateTime}
                                    id='cutOffDateTime'
                                    name='cutOffDateTime'
                                    onChange={handlePortDate}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control border-right-0 inputField"
                                    customInput={<input style={{ width: '100%' }} />}
                                    wrapperClassName="custom-react-datepicker-wrapper"
                                />
                                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col className='text-center'>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={saveData}
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

                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={back}
                            >
                                <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: "5px" }} />
                                Back
                            </button>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <Label className="inputHeader">Search By Voyage No</Label>
                                <Input
                                    type="text"
                                    name="voyageNo1"
                                    id='voyageNo1'
                                    className="form-control inputField"
                                    value={voyageNo}
                                    onChange={(e) => setVoyageNo(e.target.value)}
                                    maxLength={10}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4} style={{marginTop:28}}>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={()=>{getDataByVesselId(voyageNo);handlePageChange1()}}
                            >
                                <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                Search
                            </button>

                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={handleClearSearch}
                            >
                                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                Clear
                            </button>
                        </Col>
                    </Row>
                    <div className="mt-1 table-responsive ">
                        <table className="table table-bordered table-hover tableHeader">
                            <thead className='tableHeader'>
                                <tr>
                                    <th scope="col">Sr No</th>
                                    <th scope="col">Voyage No</th>
                                    <th scope="col">Port Of Call</th>
                                    <th scope="col">Next Port Of Call</th>
                                    <th scope="col">ETA</th>
                                    <th scope="col">ATA</th>
                                    <th scope="col">ATS</th>
                                    <th scope="col">VIA No</th>
                                    <th scope="col">Gate Open Date</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item[3]}</td>
                                        <td>{item[0]}</td>
                                        <td>{item[1]}</td>
                                        <td>{item[5]}</td>
                                        <td>{item[7]}</td>
                                        <td>{item[8]}</td>
                                        <td>{item[4]}</td>
                                        <td>{item[6]}</td>
                                        <td>{item[10] === 'A' ? 'Approved' : ""}</td>
                                        <td className="text-center">
                                            <div className="">
                                                <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <FontAwesomeIcon icon={faAtom} style={{ marginRight: '5px' }} />
                                                    Action
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <button onClick={() => getVoyageData(vesselId, item[11])} className="dropdown-item" >
                                                            <FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />Modify Details
                                                        </button>
                                                    </li>


                                                    {/* <li>
                                                        <button className="dropdown-item"
                                                            onClick={() => deleteVoyage(vesselId, item[11])}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} style={{ marginRight: "5px" }} />Delete Details
                                                        </button>
                                                    </li> */}

                                                </ul>
                                            </div>
                                        </td>
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


                </CardBody>
            </Card>

        </div>
    )
}
