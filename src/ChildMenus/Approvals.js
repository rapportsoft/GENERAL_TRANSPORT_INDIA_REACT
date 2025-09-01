
import AuthContext from '../Components/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import ipaddress from "../Components/IpAddress";
import axios from "axios";
import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts';
import Select from 'react-select';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { Pagination } from "react-bootstrap";
// import "../Components/Style.css"
import { toast } from 'react-toastify';
import {
    Card,
    CardBody,
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Table,
    Modal,
    ModalBody,
    ModalHeader
} from "reactstrap";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faGroupArrowsRotate, faPlus, faEdit, faCheckSquare, faCheckDouble, faCheckCircle, faListAlt } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import useAxios from '../Components/useAxios';
import useApi from '../Components/TokenService';
import "../Common Pages/Ticket.css"
import { FaCircle } from 'react-icons/fa';
import { error } from 'jquery';


export default function Approvals() {
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
    const { isAuthenticated } = useContext(AuthContext);
    const axios = useAxios();
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


    const queryParams = new URLSearchParams(location.search);
    const processId = queryParams.get('process_id');

    const foundRights = role !== 'ROLE_ADMIN' ? userRights.find(item => item.process_Id === processId) : null;
    const allowCreate = foundRights?.allow_Create === 'Y';
    const allowRead = foundRights?.allow_Read === 'Y';
    const allowEdit = foundRights?.allow_Update === 'Y';
    const allowDelete = foundRights?.allow_Delete === 'Y';

    const [pendingParties, setPendingParties] = useState([]);
    const [approvedParties, setApprovedParties] = useState([]);
    const [pendingParties1, setPendingParties1] = useState([]);
    const [approvedParties1, setApprovedParties1] = useState([]);

    const getData = () => {
        setLoading(true);
        axios.get(`${ipaddress}customerPortal/getCustomers?cid=${companyid}&bid=${branchId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                setPendingParties(data.pendingData);
                setApprovedParties(data.approvedData);
                setPendingParties1(data.pendingData);
                setApprovedParties1(data.approvedData);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                setPendingParties([]);
                setApprovedParties([]);
                setPendingParties1([]);
                setApprovedParties1([]);
            })
    }


    useEffect(() => {
        getData();
    }, [])

    const [searchTerm, setSearchTerm] = useState("");


    const searchApprovedData = (id) => {

        setSearchTerm(id);

        const filteredParties = approvedParties1.filter(ticket =>
            ticket[0].toLowerCase().includes(id.toLowerCase()) ||
            ticket[1].toLowerCase().includes(id.toLowerCase())
        );

        setApprovedParties(filteredParties);

    }

    const [searchTerm1, setSearchTerm1] = useState("");


    const searchPendingData = (id) => {

        setSearchTerm1(id);

        const filteredParties = pendingParties1.filter(ticket =>
            ticket[0].toLowerCase().includes(id.toLowerCase()) ||
            ticket[1].toLowerCase().includes(id.toLowerCase())
        );

        setPendingParties(filteredParties);

    }

    const [isModalForOpenForEditParty, setIsModalForOpenForEditParty] = useState(false);

    const openEditParty = (id, partyid) => {
        setIsModalForOpenForEditParty(true);

        getDataById(id, partyid);
    }

    const closeEditParty = (id) => {
        setIsModalForOpenForEditParty(false);
        getData();
        setCustomerData({
            companyId: "",
            branchId: "",
            partyId: "",
            partyName: "",
            address1: "",
            address2: "",
            city: "",
            pin: "",
            state: "",
            gstNo: "",
            iecCode: "",
            panNo: "",
            agt: "N",
            cha: "N",
            frw: "N",
            imp: "N",
            lin: "N",
            exp: "N",
            biddr: "N",
            vnd: "N",
            approvalRemarks: "",
            loginId: "",
            loginPassword: "",
            gstUploadPath: "",
            panUploadPath: "",
            addressUploadPath: "",
            status: ""
        })
    }


    const getDataById = (id, partyid) => {
        axios.get(`${ipaddress}customerPortal/getCustomerById?cid=${companyid}&bid=${branchId}&id=${id}&partyid=${partyid}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {

                const data = response.data;


                setCustomerData({
                    companyId: "",
                    branchId: "",
                    partyId: data.party.partyId || "",
                    partyName: data.party.partyName || "",
                    address1: data.address.address1 || "",
                    address2: data.address.address2 || "",
                    city: data.address.city || "",
                    pin: data.address.pin || "",
                    state: data.address.state || "",
                    gstNo: data.address.gstNo || "",
                    iecCode: data.party.iecCode || "",
                    panNo: data.party.panNo || "",
                    agt: data.party.agt || "N",
                    cha: data.party.cha || "N",
                    frw: data.party.frw || "N",
                    imp: data.party.imp || "N",
                    lin: data.party.lin || "N",
                    exp: data.party.exp || "N",
                    biddr: data.party.biddr || "N",
                    vnd: data.party.vnd || "N",
                    approvalRemarks: data.party.approvalRemarks || "",
                    loginId: data.userData === null ? "" : data.userData[0],
                    loginPassword: data.userData === null ? "" : data.userData[1],
                    gstUploadPath: data.party.gstUploadPath || "",
                    panUploadPath: data.party.panUploadPath || "",
                    addressUploadPath: data.party.addressUploadPath || "",
                    status: data.party.status || ""
                })
            })
            .catch((error) => {
                setCustomerData({
                    companyId: "",
                    branchId: "",
                    partyId: "",
                    partyName: "",
                    address1: "",
                    address2: "",
                    city: "",
                    pin: "",
                    state: "",
                    gstNo: "",
                    iecCode: "",
                    panNo: "",
                    agt: "N",
                    cha: "N",
                    frw: "N",
                    imp: "N",
                    lin: "N",
                    exp: "N",
                    biddr: "N",
                    vnd: "N",
                    approvalRemarks: "",
                    loginId: "",
                    loginPassword: "",
                    gstUploadPath: "",
                    panUploadPath: "",
                    addressUploadPath: "",
                    status: ""
                })
            })
    }

    const [customerData, setCustomerData] = useState({
        companyId: "",
        branchId: "",
        partyId: "",
        partyName: "",
        address1: "",
        address2: "",
        city: "",
        pin: "",
        state: "",
        gstNo: "",
        iecCode: "",
        panNo: "",
        agt: "N",
        cha: "N",
        frw: "N",
        imp: "N",
        lin: "N",
        exp: "N",
        biddr: "N",
        vnd: "N",
        approvalRemarks: "",
        loginId: "",
        loginPassword: "",
        gstUploadPath: "",
        panUploadPath: "",
        addressUploadPath: "",
        status: ""
    });

    const handleCustomerChange = (e) => {
        const { name, value } = e.target;
        setCustomerData((prevState) => ({
            ...prevState,
            [name]: value
        }));

    }


    const downloadFile = async (partyId, report, fileName) => {
        try {


            console.log('partyId ', partyId, ' ', report);

            let formData = new FormData();
            formData.append('cid', companyid);
            formData.append('bid', branchId);
            formData.append('partyId', partyId);
            formData.append('report', report);

            const params = new URLSearchParams(formData);

            const response = await axios.get(`${ipaddress}customerPortal/downloadExistingFile?${params}`, {
                responseType: 'blob', // Important for file download
            });

            // Get the file name from the response headers, or use the passed fileName
            const downloadedFileName = response.headers['content-disposition']
                ? response.headers['content-disposition'].split('filename=')[1].replace(/"/g, '')
                : fileName; // Fallback to passed fileName if not found

            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create a temporary anchor element to trigger the download
            const link = document.createElement('a');
            link.href = url;

            // Set the file name for download (you can change this to be dynamic based on the response)
            link.setAttribute('download', downloadedFileName);

            // Append the anchor to the document and trigger a click event
            document.body.appendChild(link);
            link.click();

            // Clean up by removing the anchor element from the document
            document.body.removeChild(link);
        } catch (error) {
            toast.error('Error downloading the file:', {
                autoClose: 800
            });
        }
    };


    const handleSave = () => {

        if (customerData.approvalRemarks === '') {
            toast.error("Approval remarks is required.", {
                autoClose: 800
            })
            return;
        }

        if (customerData.loginId === '' && customerData.loginPassword !== '') {
            toast.error("User id is required.", {
                autoClose: 800
            })
            return;
        }

        if (customerData.loginId !== '' && customerData.loginPassword === '') {
            toast.error("User password is required.", {
                autoClose: 800
            })
            return;
        }


        setLoading(true);

        axios.post(`${ipaddress}customerPortal/saveUserCRMData?cid=${companyid}&bid=${branchId}&user=${userId}`, customerData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setLoading(false);

                const data = response.data;

                setCustomerData({
                    companyId: "",
                    branchId: "",
                    partyId: data.party.partyId || "",
                    partyName: data.party.partyName || "",
                    address1: data.address.address1 || "",
                    address2: data.address.address2 || "",
                    city: data.address.city || "",
                    pin: data.address.pin || "",
                    state: data.address.state || "",
                    gstNo: data.address.gstNo || "",
                    iecCode: data.party.iecCode || "",
                    panNo: data.party.panNo || "",
                    agt: data.party.agt || "N",
                    cha: data.party.cha || "N",
                    frw: data.party.frw || "N",
                    imp: data.party.imp || "N",
                    lin: data.party.lin || "N",
                    exp: data.party.exp || "N",
                    biddr: data.party.biddr || "N",
                    vnd: data.party.vnd || "N",
                    approvalRemarks: data.party.approvalRemarks || "",
                    loginId: data.userData === null ? "" : data.userData[0],
                    loginPassword: data.userData === null ? "" : data.userData[1],
                    gstUploadPath: data.party.gstUploadPath || "",
                    panUploadPath: data.party.panUploadPath || "",
                    addressUploadPath: data.party.addressUploadPath || "",
                    status: data.party.status || ""
                })

                toast.success('Data Approved Successfully!!', {
                    autoClose: 800
                })
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.response.data, {
                    autoClose: 800
                })
            })
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
                icon={faCheckCircle}
                style={{
                    marginRight: '8px',
                    color: 'black', // Set the color to golden
                }}
            />Approvals
                <span style={{ float: 'right' }}>
                    <FontAwesomeIcon
                        onClick={() => getData()}
                        icon={faRefresh}
                        style={{
                            marginRight: '8px',
                            color: 'blue', // Set the color to golden
                        }} />
                </span>
            </h5>




            <Modal Modal isOpen={isModalForOpenForEditParty} onClose={closeEditParty} toggle={closeEditParty} style={{ maxWidth: '1000px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                <ModalHeader toggle={closeEditParty} style={{
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
                        icon={faListAlt}
                        style={{
                            marginRight: '8px',
                            color: 'white', // Set the color to golden
                        }}
                    /> Customer Details</h5>



                </ModalHeader>
                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                    <div >
                        <div style={{ fontWeight: 800 }} className="text-center">
                            Party Types
                        </div>

                        <div style={{ paddingLeft: 10, paddingRight: 10 }}>

                            <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    name='agt'
                                    checked={customerData.agt === 'Y' ? true : false}
                                    disabled
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">Agent</Label>
                            </span>
                            <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    name='biddr'
                                    checked={customerData.biddr === 'Y' ? true : false}
                                    disabled
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">Bidder</Label>
                            </span>
                            <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    name='cha'
                                    checked={customerData.cha === 'Y' ? true : false}
                                    disabled
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">CHA</Label>
                            </span>
                            <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    name='exp'
                                    checked={customerData.exp === 'Y' ? true : false}
                                    disabled
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">Exporter</Label>
                            </span>
                            <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    name='frw'
                                    checked={customerData.frw === 'Y' ? true : false}
                                    disabled
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">Forwarders</Label>
                            </span>
                            <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    name='imp'
                                    checked={customerData.imp === 'Y' ? true : false}
                                    disabled
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">Importer</Label>
                            </span>
                            <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    name='lin'
                                    checked={customerData.lin === 'Y' ? true : false}
                                    disabled
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">Liner</Label>
                            </span>
                            <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    name='vnd'
                                    checked={customerData.vnd === 'Y' ? true : false}
                                    disabled
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">Vendor</Label>
                            </span>



                        </div>
                    </div>
                    <hr />
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Customer Name
                                </label>
                                <Input
                                    className={`form-control`}
                                    type="text"
                                    id="userName"
                                    name='userName'
                                    value={customerData.partyName}
                                    disabled
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    IEC Code
                                </label>
                                <Input
                                    className={`form-control`}
                                    type="text"
                                    id="iecCode"
                                    name='iecCode'
                                    value={customerData.iecCode}
                                    disabled
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Address1
                                </label>
                                <Input
                                    className={`form-control`}
                                    type="textarea"
                                    id="address1"
                                    name='address1'
                                    value={customerData.address1}
                                    disabled
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Address2
                                </label>
                                <Input
                                    className={`form-control`}
                                    type="textarea"
                                    id="address2"
                                    name='address2'
                                    value={customerData.address2}
                                    disabled
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Pin
                                </label>
                                <Input
                                    className={`form-control`}
                                    type="text"
                                    id="pin"
                                    name='pin'
                                    value={customerData.pin}
                                    disabled
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    City
                                </label>
                                <Input
                                    className={`form-control`}
                                    type="text"
                                    id="city"
                                    name='city'
                                    value={customerData.city}

                                    disabled
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    State
                                </label>
                                <Input
                                    className={`form-control`}
                                    type="text"
                                    id="state"
                                    name='state'
                                    value={customerData.state}

                                    disabled
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Pan No
                                </label>
                                <Input
                                    className={`form-control`}
                                    type="text"
                                    id="panNo"
                                    name='panNo'
                                    value={customerData.panNo}

                                    disabled
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    GST No / ARN No
                                </label>
                                <Input
                                    className={`form-control`}
                                    type="text"
                                    id="gstNo"
                                    name='gstNo'
                                    value={customerData.gstNo}

                                    disabled
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    User Id
                                </label>
                                <Input
                                    className={`form-control`}
                                    type="text"
                                    id="loginId"
                                    name='loginId'
                                    value={customerData.loginId}
                                    onChange={handleCustomerChange}
                                    maxLength={10}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Password
                                </label>
                                <Input
                                    className={`form-control`}
                                    type="password"
                                    id="loginPassword"
                                    name='loginPassword'
                                    value={customerData.loginPassword}
                                    onChange={handleCustomerChange}
                                    maxLength={15}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Approval Remarks
                                </label>
                                <Input
                                    className={`form-control`}
                                    type="textarea"
                                    id="approvalRemarks"
                                    name='approvalRemarks'
                                    value={customerData.approvalRemarks}
                                    onChange={handleCustomerChange}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <div className="mt-2 table-responsive">
                        <table className="table table-bordered table-hover tableHeader dynamic-table">
                            <thead className="tableHeader">
                                <tr>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>GST File</th>
                                    <th scope="col" className="text-center" style={{ color: 'red' }}>{customerData.gstUploadPath.split('\\').pop().split('/').pop()}</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>
                                        <Button
                                            outline
                                            color="success"
                                            className="btn-margin newButton"
                                            style={{ marginRight: 10 }}
                                            id="submitbtn2"
                                            disabled={customerData.gstUploadPath === '' || customerData.gstUploadPath === null}
                                            onClick={() => downloadFile(customerData.partyId, "gst", customerData.gstUploadPath.split('\\').pop().split('/').pop())}
                                        >
                                            <FontAwesomeIcon icon={faUpload} />
                                        </Button>
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>PAN File</th>
                                    <th scope="col" className="text-center" style={{ color: 'red' }}>{customerData.panUploadPath.split('\\').pop().split('/').pop()}</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>
                                        <Button
                                            outline
                                            color="success"
                                            className="btn-margin newButton"
                                            style={{ marginRight: 10 }}
                                            id="submitbtn2"
                                            disabled={customerData.panUploadPath === '' || customerData.panUploadPath === null}
                                            onClick={() => downloadFile(customerData.partyId, "pan", customerData.panUploadPath.split('\\').pop().split('/').pop())}

                                        >
                                            <FontAwesomeIcon icon={faUpload} />
                                        </Button>
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Address Proof</th>
                                    <th scope="col" className="text-center" style={{ color: 'red' }}>{customerData.addressUploadPath.split('\\').pop().split('/').pop()}</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>
                                        <Button
                                            outline
                                            color="success"
                                            className="btn-margin newButton"
                                            style={{ marginRight: 10 }}
                                            id="submitbtn2"
                                            disabled={customerData.addressUploadPath === '' || customerData.addressUploadPath === null}
                                            onClick={() => downloadFile(customerData.partyId, "address", customerData.addressUploadPath.split('\\').pop().split('/').pop())}

                                        >
                                            <FontAwesomeIcon icon={faUpload} />
                                        </Button>
                                    </th>
                                </tr>
                            </thead>

                        </table>
                    </div>
                    <Row>
                        <Col className='text-center'>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={handleSave}
                                disabled={customerData.status === 'A'}
                            >
                                <FontAwesomeIcon icon={faSave} style={{ marginRight: 5 }} />
                                Save
                            </button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
            <Row>
                <Col md={6}>
                    <Card style={{ backgroundColor: "#F8F8F8" }}>
                        <CardBody>
                            <Row>
                                <Col md={8}>
                                    <FormGroup>
                                        <Label className="forlabel bold-label" style={{ fontWeight: 'bolder' }} htmlFor="sbRequestId">
                                            Search Pending Approvals
                                        </Label>
                                        <Input
                                            className={`form-control`}
                                            type="text"
                                            id="searchTerm1"
                                            name='searchTerm1'
                                            value={searchTerm1}
                                            onChange={(e) => searchPendingData(e.target.value)}
                                            style={{ height: 40 }}
                                            placeholder='Search By Party Id / Party Name'
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <div className="ticket-container1" >
                                {pendingParties.length > 0 ? (
                                    pendingParties.map((ticket, index) => (
                                        <div
                                            key={index}
                                            className={`ticket-item unread`}
                                            onClick={() => openEditParty(ticket[0], ticket[4])}
                                        >
                                            <FaCircle className={`status-icon unread-icon`} />
                                            <div className="ticket-info">
                                                <div className="ticket-header" style={{ fontSize: 12, color: 'GrayText' }}>
                                                    <span>{ticket[0]}</span>
                                                </div>
                                                <div className="ticket-subject" style={{ fontSize: 14 }}>
                                                    <span>{ticket[1]} ({ticket[4]})</span>
                                                    <span style={{ float: 'inline-end', color: 'lightgreen' }}>{ticket[2] === 'N' ? 'New' : 'Approved'}</span>
                                                </div>
                                                <div className="ticket-meta">
                                                    <span className="ticket-date">{new Date(ticket[3]).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ textAlign: "center", padding: "20px", fontSize: "16px", color: "#777" }}>
                                        No records found
                                    </div>
                                )}

                            </div>

                        </CardBody>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card style={{ backgroundColor: "#F8F8F8" }}>
                        <CardBody>
                            <Row>
                                <Col md={8}>
                                    <FormGroup>
                                        <Label className="forlabel bold-label" style={{ fontWeight: 'bolder' }} htmlFor="sbRequestId">
                                            Search Approved Parties
                                        </Label>
                                        <Input
                                            className={`form-control`}
                                            type="text"
                                            id="searchTerm"
                                            name='searchTerm'
                                            value={searchTerm}
                                            onChange={(e) => searchApprovedData(e.target.value)}
                                            style={{ height: 40 }}
                                            placeholder='Search By Party Id / Party Name'
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <div className="ticket-container1" >
                                {approvedParties.length > 0 ? (
                                    approvedParties.map((ticket, index) => (
                                        <div
                                            key={index}
                                            className={`ticket-item unread`}
                                            onClick={() => openEditParty(ticket[0], ticket[4])}
                                        >
                                            <FaCircle className={`status-icon unread-icon`} />
                                            <div className="ticket-info">
                                                <div className="ticket-header" style={{ fontSize: 12, color: 'GrayText' }}>
                                                    <span>{ticket[0]}</span>
                                                </div>
                                                <div className="ticket-subject" style={{ fontSize: 14 }}>
                                                    <span>{ticket[1]} ({ticket[4]})</span>
                                                    <span style={{ float: 'inline-end', color: 'lightgreen' }}>{ticket[2] === 'N' ? 'New' : 'Approved'}</span>
                                                </div>
                                                <div className="ticket-meta">

                                                    <span className="ticket-date">{new Date(ticket[3]).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ textAlign: "center", padding: "20px", fontSize: "16px", color: "#777" }}>
                                        No records found
                                    </div>
                                )}

                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </div>
    )
}
