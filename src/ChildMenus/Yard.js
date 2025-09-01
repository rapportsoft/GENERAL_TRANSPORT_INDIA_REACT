
import AuthContext from '../Components/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import ipaddress from "../Components/IpAddress";
import axios from "axios";
import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts';
import Select from 'react-select';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { Pagination } from "react-bootstrap";
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faGroupArrowsRotate, faPlus, faEdit, faSpaceShuttle, faWarehouse, faAdd } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import useAxios from '../Components/useAxios';
import { toast } from 'react-toastify';

export default function Yard() {
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

    const [isModalForLocation, setIsModalForLocation] = useState(false);
    const [locationFlag, setLocationFlag] = useState('add');

    const openLocationModal = () => {
        setIsModalForLocation(true);
    }

    const closeLocationModal = () => {
        setIsModalForLocation(false);
        setYardLocationData({
            companyId: "",
            finYear: "",
            yardId: "",
            yardLocationId: "",
            yardLocationDesc: "",
            locationCategory: "",
            createdBy: "",
            createdDate: null,
            approvedBy: "",
            approvedDate: null,
            status: ""
        })
    }

    const [isModalForBlock, setIsModalForBlock] = useState(false);

    const openBlockModal = () => {
        setIsModalForBlock(true);
    }

    const closeBlockModal = () => {
        setIsModalForBlock(false);
    }

    const [isModalForCell, setIsModalForCell] = useState(false);

    const openCellModal = () => {
        setIsModalForCell(true);
    }

    const closeCellModal = () => {
        setIsModalForCell(false);
    }


    const [branchData, setBranchData] = useState({});
    const [yardData, setYardData] = useState({
        companyId: '',
        finYear: '',
        yardId: '',
        yardArea: '',
        noOfTireAllowed: '',
        createdBy: '',
        createdDate: '',
        approvedBy: '',
        approvedDate: '',
        status: ''
    });


    const getData = () => {
        axios.get(`${ipaddress}yard/getYardInfo?cid=${companyid}&bid=${branchId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setBranchData(response.data.branch);
                if (response.data.yard !== null) {
                    setYardData(response.data.yard);
                    getYardLocations();
                }

            })
            .catch((error) => {

            })
    }


    useEffect(() => {
        getData();
    }, [])


    const handleYardData = (e) => {
        const { name, value } = e.target;

        setYardData((yardData) => ({
            ...yardData,
            [name]: value
        })
        )

        document.getElementById(name).classList.remove('error-border');
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    }

    const [formErrors, setFormErrors] = useState({
        yardArea: '',
        noOfTireAllowed: ''
    })

    const saveYardData = () => {
        let errors = {};

        if (!yardData.yardArea) {
            errors.yardArea = "Yard area is required"
            document.getElementById("yardArea").classList.add('error-border');
        }

        if (!yardData.noOfTireAllowed) {
            errors.noOfTireAllowed = "No. of tire allowed is required"
            document.getElementById("noOfTireAllowed").classList.add('error-border');
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            })
            return;
        }

        axios.post(`${ipaddress}yard/saveYard?cid=${companyid}&bid=${branchId}&user=${userId}`, yardData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setYardData(response.data);
                toast.success("Data save successfully!!!", {
                    autoClose: 800
                })
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
            })
    }

    const [yardLocations, setYardLocations] = useState([]);

    const getYardLocations = () => {
        axios.get(`${ipaddress}yard/getYardLocations?cid=${companyid}&branchid=${branchId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setYardLocations(response.data);
            })
            .catch((error) => {

            })
    }

    const [yardLocationData, setYardLocationData] = useState({
        companyId: "",
        finYear: "",
        yardId: "",
        yardLocationId: "",
        yardLocationDesc: "",
        locationCategory: "",
        createdBy: "",
        createdDate: null,
        approvedBy: "",
        approvedDate: null,
        status: ""
    })

    const [formErrors1, setFormErrors1] = useState({
        yardLocationId: "",
        yardLocationDesc: "",
        locationCategory: "",
    })

    const handleYardLocationDataChange = (e) => {
        const { name, value } = e.target;

        setYardLocationData((yardLocationData) => ({
            ...yardLocationData,
            [name]: value
        }))

        document.getElementById(name).classList.remove('error-border');
        setFormErrors1((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    }

    const saveYardLocation = () => {
        let errors = {};

        if (!yardLocationData.yardLocationId) {
            errors.yardLocationId = "Yard location id is required"
            document.getElementById("yardLocationId").classList.add('error-border');
        }

        if (!yardLocationData.yardLocationDesc) {
            errors.yardLocationDesc = "Yard location desc. is required"
            document.getElementById("yardLocationDesc").classList.add('error-border');
        }

        if (!yardLocationData.locationCategory) {
            errors.locationCategory = "Location catrgory is required"
            document.getElementById("locationCategory").classList.add('error-border');
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            })
            return;
        }

        yardLocationData.yardId = yardData.yardId;

        axios.post(`${ipaddress}yard/saveyardLocation?cid=${companyid}&bid=${branchId}&user=${userId}&flag=${locationFlag}`, yardLocationData, {
            headers: `Bearer ${jwtToken}`
        })
            .then((response) => {
                getYardLocations();
                toast.success("Data save successfully!!", {
                    autoClose: 800
                })
                closeLocationModal();
            })
            .catch((error) => {

            })
    }


    return (
        <div className='Container'>
            <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
                icon={faWarehouse}
                style={{
                    marginRight: '8px',
                    color: 'black', // Set the color to golden
                }}
            />Yard</h5>
          
            <Card style={{ backgroundColor: "#F8F8F8" }}>
                <CardBody>
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label className="inputHeader">Yard Id</Label>
                                <Input
                                    type="text"
                                    name="phoneNo"
                                    id='phoneNo'
                                    className="form-control inputField"
                                    readOnly
                                    value={branchData.branchId}
                                    style={{ backgroundColor: '#E0E0E0' }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label className="inputHeader">Yard Desc</Label>
                                <Input
                                    type="text"
                                    name="phoneNo"
                                    id='phoneNo'
                                    className="form-control inputField"
                                    readOnly
                                    value={branchData.branchName}
                                    style={{ backgroundColor: '#E0E0E0' }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label className="inputHeader">Status</Label>
                                <Input
                                    type="text"
                                    name="phoneNo"
                                    id='phoneNo'
                                    className="form-control inputField"
                                    readOnly
                                    value={yardData.status === 'A' ? 'Approved' : ''}
                                    style={{ backgroundColor: '#E0E0E0' }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label className="inputHeader">Created By</Label>
                                <Input
                                    type="text"
                                    name="phoneNo"
                                    id='phoneNo'
                                    className="form-control inputField"
                                    readOnly
                                    value={yardData.createdBy}
                                    style={{ backgroundColor: '#E0E0E0' }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label className="inputHeader">Address1</Label>
                                <Input
                                    type="text"
                                    name="phoneNo"
                                    id='phoneNo'
                                    className="form-control inputField"
                                    readOnly
                                    value={branchData.address1}
                                    style={{ backgroundColor: '#E0E0E0' }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label className="inputHeader">Address2</Label>
                                <Input
                                    type="text"
                                    name="phoneNo"
                                    id='phoneNo'
                                    className="form-control inputField"
                                    readOnly
                                    value={branchData.address2}
                                    style={{ backgroundColor: '#E0E0E0' }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label className="inputHeader">Address3</Label>
                                <Input
                                    type="text"
                                    name="phoneNo"
                                    id='phoneNo'
                                    className="form-control inputField"
                                    readOnly
                                    value={branchData.address3}
                                    style={{ backgroundColor: '#E0E0E0' }}
                                />
                            </FormGroup>
                        </Col>

                        <Col md={3}>
                            <FormGroup>
                                <Label className="inputHeader">Country</Label>
                                <Input
                                    type="text"
                                    name="phoneNo"
                                    id='phoneNo'
                                    className="form-control inputField"
                                    readOnly
                                    value={branchData.country}
                                    style={{ backgroundColor: '#E0E0E0' }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>

                        <Col md={3}>
                            <FormGroup>
                                <Label className="inputHeader">State</Label>
                                <Input
                                    type="text"
                                    name="phoneNo"
                                    id='phoneNo'
                                    className="form-control inputField"
                                    readOnly
                                    value={branchData.state}
                                    style={{ backgroundColor: '#E0E0E0' }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label className="inputHeader">City</Label>
                                <Input
                                    type="text"
                                    name="phoneNo"
                                    id='phoneNo'
                                    className="form-control inputField"
                                    readOnly
                                    value={branchData.city}
                                    style={{ backgroundColor: '#E0E0E0' }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label className="inputHeader">Pin</Label>
                                <Input
                                    type="text"
                                    name="phoneNo"
                                    id='phoneNo'
                                    className="form-control inputField"
                                    readOnly
                                    value={branchData.pin}
                                    style={{ backgroundColor: '#E0E0E0' }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label className="inputHeader">Phone No</Label>
                                <Input
                                    type="text"
                                    name="phoneNo"
                                    id='phoneNo'
                                    className="form-control inputField"
                                    readOnly
                                    value={branchData.phoneNo}
                                    style={{ backgroundColor: '#E0E0E0' }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label className="inputHeader">Yard Area</Label> <span style={{ color: 'red' }}>*</span>
                                <Input
                                    type="text"
                                    name="yardArea"
                                    value={yardData.yardArea}
                                    onChange={handleYardData}
                                    id='yardArea'
                                    className="form-control inputField"
                                />
                                <div style={{ color: 'red' }} className="error-message">{formErrors.yardArea}</div>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label className="inputHeader">No Of Tire Allowed</Label> <span style={{ color: 'red' }}>*</span>
                                <Input
                                    type="text"
                                    name="noOfTireAllowed"
                                    value={yardData.noOfTireAllowed}
                                    onChange={handleYardData}
                                    id='noOfTireAllowed'
                                    className="form-control inputField"
                                />
                                <div style={{ color: 'red' }} className="error-message">{formErrors.noOfTireAllowed}</div>
                            </FormGroup>
                        </Col>
                        <Col md={3}>

                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginTop: 28 }}
                                id="submitbtn2"
                                onClick={saveYardData}
                            >
                                <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                Save
                            </button>

                        </Col>

                    </Row>
                    {yardData.yardId !== "" && (
                        <>
                            <hr />
                            <Row className="justify-content-end">
                                <Col xs="auto">
                                    <button
                                        className="btn btn-outline-success btn-margin newButton"
                                        style={{ marginRight: 10 }}
                                        onClick={openLocationModal}
                                        id="submitbtn2"
                                    >
                                        <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
                                        Add Location/Shed
                                    </button>
                                </Col>
                            </Row>
                            <hr />



                            <Modal Modal isOpen={isModalForLocation} onClose={closeLocationModal} toggle={closeLocationModal} style={{ maxWidth: '900px', wioverflow: '-moz-hidden-unscrollable' }}>

                                <ModalHeader toggle={closeLocationModal} style={{
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
                                        icon={faAdd}
                                        style={{
                                            marginRight: '8px',
                                            color: 'white', // Set the color to golden
                                        }}
                                    /> Add Location</h5>

                                </ModalHeader>
                                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                                    <Row>

                                        <Col md={3}>
                                            <FormGroup>
                                                <Label className="inputHeader">Yard Location Id</Label>
                                                <Input
                                                    type="text"
                                                    name="yardLocationId"
                                                    id='yardLocationId'
                                                    className="form-control inputField"
                                                    value={yardLocationData.yardLocationId}
                                                    onChange={handleYardLocationDataChange}
                                                />
                                                <div style={{ color: 'red' }} className="error-message">{formErrors1.yardLocationId}</div>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label className="inputHeader">Yard Location Desc</Label>
                                                <Input
                                                    type="text"
                                                    name="yardLocationDesc"
                                                    id='yardLocationDesc'
                                                    className="form-control inputField"
                                                    value={yardLocationData.yardLocationDesc}
                                                    onChange={handleYardLocationDataChange}
                                                />
                                                <div style={{ color: 'red' }} className="error-message">{formErrors1.yardLocationDesc}</div>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label className="inputHeader">Location Category</Label>
                                                <Input
                                                    type="select"
                                                    name="locationCategory"
                                                    id='locationCategory'
                                                    className="form-control"
                                                    value={yardLocationData.locationCategory}
                                                    onChange={handleYardLocationDataChange}
                                                >
                                                    <option value=""></option>
                                                    <option value="C">Covered</option>
                                                    <option value="O">Opened</option>


                                                </Input>
                                                <div style={{ color: 'red' }} className="error-message">{formErrors1.locationCategory}</div>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label className="inputHeader">Status</Label>
                                                <Input
                                                    type="text"
                                                    name="phoneNo"
                                                    id='phoneNo'
                                                    className="form-control inputField"
                                                    readOnly
                                                    value={yardLocationData.status}
                                                    style={{ backgroundColor: '#E0E0E0' }}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className='text-center'>
                                        <Col>

                                            <button
                                                className="btn btn-outline-primary btn-margin newButton"
                                                style={{ marginTop: 28 }}
                                                id="submitbtn2"
                                                onClick={saveYardLocation}
                                            >
                                                <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                                Save Location
                                            </button>

                                        </Col>
                                    </Row>
                                </ModalBody>
                            </Modal>

                            <div className="mt-1 table-responsive ">
                                <table className="table table-bordered table-hover tableHeader">
                                    <thead className='tableHeader'>
                                        <tr>
                                            <th scope="col">Sr No</th>
                                            <th scope="col">Yard Location Id</th>
                                            <th scope="col">Yard Location Desc</th>
                                            <th scope="col">Location Category</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {yardLocations.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.yardLocationId}</td>
                                                <td>{item.yardLocationDesc}</td>
                                                <td>{item.locationCategory}</td>
                                                <td>{item.status === 'A' ? 'Approved' : ''}</td>
                                                <td></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <hr />
                            <Row className="justify-content-end">
                                <Col xs="auto">
                                    <button
                                        className="btn btn-outline-success btn-margin newButton"
                                        style={{ marginRight: 10 }}
                                        onClick={openBlockModal}
                                        id="submitbtn2"
                                    >
                                        <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
                                        Add Block
                                    </button>
                                </Col>
                            </Row>
                            <hr />



                            <Modal Modal isOpen={isModalForBlock} onClose={closeBlockModal} toggle={closeBlockModal} style={{ maxWidth: '900px', wioverflow: '-moz-hidden-unscrollable' }}>

                                <ModalHeader toggle={closeBlockModal} style={{
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
                                        icon={faAdd}
                                        style={{
                                            marginRight: '8px',
                                            color: 'white', // Set the color to golden
                                        }}
                                    /> Add Block</h5>

                                </ModalHeader>
                                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                                    <Row>

                                        <Col md={4}>
                                            <FormGroup>
                                                <Label className="inputHeader">Block Id</Label>
                                                <Input
                                                    type="text"
                                                    name="phoneNo"
                                                    id='phoneNo'
                                                    className="form-control inputField"
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md={4}>
                                            <FormGroup>
                                                <Label className="inputHeader">Status</Label>
                                                <Input
                                                    type="text"
                                                    name="phoneNo"
                                                    id='phoneNo'
                                                    className="form-control inputField"
                                                    readOnly
                                                    style={{ backgroundColor: '#E0E0E0' }}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className='text-center'>
                                        <Col>

                                            <button
                                                className="btn btn-outline-primary btn-margin newButton"
                                                style={{ marginTop: 28 }}
                                                id="submitbtn2"
                                            >
                                                <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                                Save Block
                                            </button>

                                        </Col>
                                    </Row>
                                </ModalBody>
                            </Modal>
                            <div className="mt-1 table-responsive ">
                                <table className="table table-bordered table-hover tableHeader">
                                    <thead className='tableHeader'>
                                        <tr>
                                            <th scope="col">Sr No</th>
                                            <th scope="col">Block Id</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <hr />
                            <Row className="justify-content-end">
                                <Col xs="auto">
                                    <button
                                        className="btn btn-outline-success btn-margin newButton"
                                        style={{ marginRight: 10 }}
                                        onClick={openCellModal}
                                        id="submitbtn2"
                                    >
                                        <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
                                        Add Grid/Cell
                                    </button>
                                </Col>
                            </Row>
                            <hr />



                            <Modal Modal isOpen={isModalForCell} onClose={closeCellModal} toggle={closeCellModal} style={{ maxWidth: '900px', wioverflow: '-moz-hidden-unscrollable' }}>

                                <ModalHeader toggle={closeCellModal} style={{
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
                                        icon={faAdd}
                                        style={{
                                            marginRight: '8px',
                                            color: 'white', // Set the color to golden
                                        }}
                                    /> Add Grid/Cell</h5>

                                </ModalHeader>
                                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                                    <Row>

                                        <Col md={4}>
                                            <FormGroup>
                                                <Label className="inputHeader">Cell No Row</Label>
                                                <Input
                                                    type="text"
                                                    name="phoneNo"
                                                    id='phoneNo'
                                                    className="form-control inputField"
                                                />
                                            </FormGroup>
                                        </Col>


                                        <Col md={4}>
                                            <FormGroup>
                                                <Label className="inputHeader">Cell Area</Label>
                                                <Input
                                                    type="text"
                                                    name="phoneNo"
                                                    id='phoneNo'
                                                    className="form-control inputField"
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md={4}>
                                            <FormGroup>
                                                <Label className="inputHeader">Status</Label>
                                                <Input
                                                    type="text"
                                                    name="phoneNo"
                                                    id='phoneNo'
                                                    className="form-control inputField"
                                                    readOnly
                                                    style={{ backgroundColor: '#E0E0E0' }}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className='text-center'>
                                        <Col>

                                            <button
                                                className="btn btn-outline-primary btn-margin newButton"
                                                style={{ marginTop: 28 }}
                                                id="submitbtn2"
                                            >
                                                <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                                Save Grid/Cell
                                            </button>

                                        </Col>
                                    </Row>
                                </ModalBody>
                            </Modal>
                            <div className="mt-1 table-responsive ">
                                <table className="table table-bordered table-hover tableHeader">
                                    <thead className='tableHeader'>
                                        <tr>
                                            <th scope="col">Sr No</th>
                                            <th scope="col">Cell No Row</th>
                                            <th scope="col">Cell Area</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>

                        </>
                    )}
                </CardBody>
            </Card>

        </div>
    )
}
