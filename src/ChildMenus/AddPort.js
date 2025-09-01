import AuthContext from '../Components/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import Select from 'react-select';
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
} from "reactstrap";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faShip, faBackward } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import useAxios from '../Components/useAxios';
import CFSService from '../service/CFSService';
import { toast } from 'react-toastify';

function AddPort() {

    const navigate = useNavigate();

    const axiosInstance = useAxios();
    const cfsService = new CFSService(axiosInstance);


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
        userRights
    } = useContext(AuthContext);


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
    };

    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const queryParams = new URLSearchParams(location.search);
    const processId = queryParams.get('process_id');


    const portCode = location.state?.portCode;
    const portTransId = location.state?.portTransId;
    const operationOld = location.state?.operation;
    const searchCriteria = location.state?.searchCriteria;
    const currentPage = location.state?.currentPage;





    const foundRights = role !== 'ROLE_ADMIN' ? userRights.find(item => item.process_Id === processId) : null;
    const allowRead = foundRights?.allow_Read === 'Y';
    const allowEdit = foundRights?.allow_Update === 'Y';

    const [operation, setOperation] = useState(operationOld);
    const [portTypes, setPortTypes] = useState([]);
    const [selectedPortType, setSelectedPortType] = useState([]);

    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState([]);

    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState([]);

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState([]);

    const [jobOrderFormats, setJobOrderFormats] = useState([]);
    const [selectedJobOrderFormat, setSelectedJobOrderFormat] = useState([]);


    const initialPort = {
        companyId: companyid,
        branchId: branchId,
        portTransId: '',
        portCode: '',
        isoPortCode: '',
        portName: '',
        portType: '',
        jobOrderPrefix: '',
        jobOrderNextNo: '',
        jobOrderFormat: '',
        agentCode: '',
        address1: '',
        address2: '',
        address3: '',
        city: '',
        pin: '',
        state: '',
        phoneNo: '',
        faxNo: '',
        contactPerson: '',
        contactDesignation: '',
        contactPhone: '',
        contactFaxNo: '',
        contactEmail: '',
        country: '',
        status: '',
        createdBy: userId,
        createdDate: '',
        editedBy: '',
        editedDate: '',
        approvedBy: userId,
        approvedDate: '',
        localPort: ''
    };


    const [port, setPort] = useState(initialPort);





    const getPortTypes = async (jarId) => {
        const portType = await getjarByJarId(jarId);
        setPortTypes(portType);
    };

    const getjobOrderFormat = async (jarId) => {
        const portType = await getjarByJarId(jarId);
        setJobOrderFormats(portType);
    };

    const getjarByJarId = async (jarId) => {
        try {
            const response = await cfsService.getjarByJarId(companyid, jarId, jwtToken);
            const ports = response.data;
            const portTypeList = ports.map(port => ({
                value: port[0],
                label: port[1]
            }));

            return portTypeList;
        } catch (error) {
            console.error('Error fetching port data:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {

            if (portCode && portTransId) {
                getPortByPortCodeAndPortTransId(portCode, portTransId);
            }
            await getPortTypes('J00057');
            await getjobOrderFormat('J00058');
            await getCityStateCountry();
        };
        fetchData();
    }, []);


    const getPortByPortCodeAndPortTransId = async (portCode, portTransId) => {
        try {
            // Attempt to fetch the data
            const response = await cfsService.getPortByPortCodeAndPortTransId(companyid, branchId, portCode, portTransId, jwtToken);
            setPort(response.data);
        } catch (error) {
            // Handle errors
            console.error("Error fetching port data:", error);
            // Optionally, you can set an error state or show an error message to the user
            // setError("Failed to fetch port data. Please try again later.");
        }
    };


    useEffect(() => {
        const foundType = states.find(type => type.label === port.state);
        setSelectedState(foundType ? foundType : null);
    }, [states, selectedState, port.state, operation]);

    useEffect(() => {
        const foundType = countries.find(type => type.label === port.country);
        setSelectedCountry(foundType ? foundType : null);
    }, [countries, selectedCountry, port.country, operation]);


    useEffect(() => {
        const foundType = portTypes.find(type => type.label === port.portType);
        setSelectedPortType(foundType ? foundType : null);
    }, [portTypes, selectedPortType, port.portType, operation]);

    useEffect(() => {
        const foundType = cities.find(type => type.label === port.city);
        setSelectedCity(foundType ? foundType : null);
    }, [cities, selectedCity, port.city, operation]);

    useEffect(() => {
        const foundType = jobOrderFormats.find(type => type.label === port.jobOrderFormat);
        setSelectedJobOrderFormat(foundType ? foundType : null);
    }, [jobOrderFormats, selectedJobOrderFormat, port.jobOrderFormat, operation]);


















    const getCityStateCountry = async () => {
        const res = await cfsService.getCityStateCountry(companyid, jwtToken);

        console.log(res.data);
        setCities(res.data.city);
        setCountries(res.data.country);
        setStates(res.data.state);
    }

    const handleSelectField = (field, option) => {
        if (field === 'portType') {
            setSelectedPortType(option);
        } else if (field === 'city') {
            setSelectedCity(option);
        } else if (field === 'state') {
            setSelectedState(option);
        } else if (field === 'country') {
            setSelectedCountry(option);
        } else if (field === 'jobOrderFormat') {
            setSelectedJobOrderFormat(option);
        }

        setPort(prevCriteria => ({
            ...prevCriteria,
            [field]: option?.label || ''
        }));

        if (errors[field]) {
            setErrors(prevErrors => ({ ...prevErrors, [field]: '' }));
        }
    };


    console.log(errors);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if ((name === 'pin' || name === 'phoneNo' || name === 'faxNo' || name === 'agentCode') && !/^\d*$/.test(value)) {
            return;
        }



        setPort((prevPort) => ({
            ...prevPort,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        }
    };

    async function addPort(port, userId) {
        setLoading(true);
        try {
            const response = await cfsService.addPort(port, userId, jwtToken);
            setPort(response.data);
            const messege = `Port Added with Id <strong>${response.data.portCode}</strong>`
            toast.success(<div dangerouslySetInnerHTML={{ __html: messege }} />, {
                position: 'top-center',
                autoClose: 1200,
                style: { width: '29vw' },
            });
            setOperation(allowEdit ? 'U' : 'E');
        } catch (error) {
            if (error.response) {
                const errorData = error.response.data;
                console.log(errorData);

                if (errorData.error && errorData.field) {
                    toast.error(errorData.error, {
                        position: 'top-center',
                        autoClose: 1200,
                        style: { width: '27vw' },
                    });

                    setErrors({ [errorData.field]: errorData.error });
                } else {
                    toast.error("Something went wrong!", {
                        position: 'top-center',
                        autoClose: 1200,
                        style: { width: '27vw' },
                    });
                }
            } else {
                toast.error("An error occurred while saving export data",
                    {
                        position: 'top-center',
                        autoClose: 1200,
                        style: { width: '31vw' },
                    }
                );
            }
        }
        finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error('Please Select required fields!', {
                position: 'top-center',
                autoClose: 900,
                style: { width: `26vw` },
            });

            return;
        }

        if (port.contactEmail) {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (port.contactEmail && !emailPattern.test(port.contactEmail)) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    contactEmail: 'Invalid email format'
                }));
                return;
            } else {
                setErrors(prevErrors => ({ ...prevErrors, contactEmail: '' }));
            }
        }
        setLoading(true);
        try {

            
            if (!port.status) {
                addPort(port, userId);
            } else {
                const response = await cfsService.updatePort(port, userId, jwtToken);
                setPort(response.data);
                toast.success('Port Record updated Successfully!', {
                    position: 'top-center',
                    autoClose: 900,
                    style: { width: `27vw` },
                });
            }
        }
        catch {
            toast.error('Oops something went wrong!', {
                position: 'top-center',
                autoClose: 700,
            });
        }
        finally {
            setLoading(false);
        }
    };

    // const Handleback = () => {
    //     navigate(`/master/port`, { state: { searchCriteria: searchCriteria, currentPage: currentPage } })
    // };


    const Handleback = () => {
        navigate(`/master/port?process_id=${processId}`, {
            state: {
                searchCriteria: searchCriteria,
                currentPage: currentPage
            }
        });
    };


    const validateForm = () => {
        const newErrors = {};
        if (!port.portCode) {
            newErrors.portCode = 'Port code is required';
        }

        if (!port.portName) {
            newErrors.portName = 'Port name is required';
        }

        if (!port.isoPortCode) {
            newErrors.isoPortCode = 'ISO port code is required';
        }
        if (!port.portType) {
            newErrors.portType = 'select port type';
        }

        if (!port.address1) {
            newErrors.address1 = 'Address1 is required';
        }
        if (!port.city) {
            newErrors.city = 'City is required';
        }

        if (!port.state) {
            newErrors.state = 'State is required';
        }
        if (!port.country) {
            newErrors.country = 'Country is required';
        }

        if (!port.address1) {
            newErrors.address1 = 'Address1 is required';
        }

        if (!port.agentCode) {
            newErrors.agentCode = 'Agent code is required';
        }

        if (!port.pin) {
            newErrors.pin = 'Pin is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };





    const localPortData = [{
        value: 'Local',
        label: 'Local'
    }, {
        value: 'Other',
        label: 'Other'
    }];



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

            <div className='Container'>
                <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
                    icon={faShip}
                    style={{
                        marginRight: '8px',
                        color: 'black',
                    }}
                />Port</h5>
                <Card style={{ backgroundColor: "#F8F8F8" }}>
                    <CardBody>
                        <Row>

                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="portId">Port Code</Label><span className='error'>*</span>
                                    <div style={{ position: 'relative' }}>
                                        <Input
                                            type="text"
                                            name="portCode"
                                            className={`form-control inputField ${errors.portCode ? 'error-border' : ' '}`}
                                            placeholder="Enter Port Code"
                                            value={port.portCode}
                                            onChange={handleChange}
                                            readOnly={operation === 'E' || !!port.status}
                                            id={operation === 'E' || port.status ? 'service' : ''}
                                            maxLength={6}
                                        />
                                        {errors.portCode && (
                                            <span className="error-messageNew">{errors.portCode}</span>
                                        )}
                                    </div>
                                </FormGroup>
                            </Col>


                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="portId">ISO Port Code</Label><span className='error'>*</span>
                                    <div style={{ position: 'relative' }}>
                                        <Input
                                            type="text"
                                            name="isoPortCode"
                                            className={`form-control inputField ${errors.isoPortCode ? 'error-border' : ' '}`}
                                            placeholder="Enter ISO Port Code"
                                            value={port.isoPortCode}
                                            onChange={handleChange}
                                            readOnly={operation === 'E'}
                                            id={operation === 'E' ? 'service' : ''}
                                            maxLength={6}
                                        />
                                        {errors.isoPortCode && (
                                            <span className="error-messageNew">{errors.isoPortCode}</span>
                                        )}
                                    </div>
                                </FormGroup>
                            </Col>


                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="portId">Port Name</Label><span className='error'>*</span>
                                    <div style={{ position: 'relative' }}>
                                        <Input
                                            type="text"
                                            name="portName"
                                            className={`form-control inputField ${errors.portName ? 'error-border' : ' '}`}
                                            placeholder="Enter Port Name"
                                            value={port.portName}
                                            onChange={handleChange}
                                            readOnly={operation === 'E'}
                                            id={operation === 'E' ? 'service' : ''}
                                            maxLength={50}
                                        />
                                        {errors.portName && (
                                            <span className="error-messageNew">{errors.portName}</span>
                                        )}
                                    </div>
                                </FormGroup>
                            </Col>


                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="typeOfProduct">Port Type</Label><span className='error'>*</span>
                                    <div style={{ position: 'relative' }}>
                                        <Select
                                            options={portTypes}
                                            value={selectedPortType}
                                            onChange={(option) => handleSelectField('portType', option)}
                                            isClearable
                                            isDisabled={operation === 'E'}
                                            id={operation === 'E' ? 'service' : ''}
                                            className={errors.portType ? 'error-border' : ''}
                                            placeholder="Select a Port Type"
                                            styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                                                    // borderColor: errors.consoleName ? '#f52b2b' : '',
                                                    boxShadow: 'none',
                                                    '&:hover': {
                                                        border: '1px solid #ccc'
                                                    }
                                                }),
                                                indicatorSeparator: () => ({
                                                    display: 'none'
                                                }),
                                                dropdownIndicator: () => ({
                                                    display: 'none'
                                                })
                                            }}
                                        />
                                        {errors.portType && (
                                            <span className="error-messageNew">{errors.portType}</span>
                                        )}
                                    </div>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>


                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="portId">Address1</Label><span className='error'>*</span>
                                    <div style={{ position: 'relative' }}>
                                        <Input
                                            type="text"
                                            name="address1"
                                            className={`form-control inputField ${errors.address1 ? 'error-border' : ' '}`}
                                            placeholder="Enter Address"
                                            value={port.address1}
                                            onChange={handleChange}
                                            readOnly={operation === 'E'}
                                            id={operation === 'E' ? 'service' : ''}
                                            maxLength={50}
                                        />
                                        {errors.address1 && (
                                            <span className="error-messageNew">{errors.address1}</span>
                                        )}
                                    </div>
                                </FormGroup>
                            </Col>


                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="portId">Address2</Label>
                                    <div style={{ position: 'relative' }}>
                                        <Input
                                            type="text"
                                            name="address2"
                                            className={`form-control inputField`}
                                            placeholder="Enter Address"
                                            value={port.address2}
                                            onChange={handleChange}
                                            readOnly={operation === 'E'}
                                            id={operation === 'E' ? 'service' : ''}
                                            maxLength={50}
                                        />

                                    </div>
                                </FormGroup>
                            </Col>



                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="portId">Address3</Label>
                                    <div style={{ position: 'relative' }}>
                                        <Input
                                            type="text"
                                            name="address3"
                                            className={`form-control inputField`}
                                            placeholder="Enter Address"
                                            value={port.address3}
                                            onChange={handleChange}
                                            readOnly={operation === 'E'}
                                            id={operation === 'E' ? 'service' : ''}
                                            maxLength={50}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>


                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="typeOfProduct">City</Label><span className='error'>*</span>
                                    <div style={{ position: 'relative' }}>
                                        <Select
                                            options={cities}
                                            value={selectedCity}
                                            onChange={(option) => handleSelectField('city', option)}
                                            isClearable
                                            isDisabled={operation === 'E'}
                                            id={operation === 'E' ? 'service' : ''}
                                            className={errors.city ? 'error-border' : ''}
                                            placeholder="Select a City"
                                            styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                                                    boxShadow: 'none',
                                                    '&:hover': {
                                                        border: '1px solid #ccc'
                                                    }
                                                }),
                                                indicatorSeparator: () => ({
                                                    display: 'none'
                                                }),
                                                dropdownIndicator: () => ({
                                                    display: 'none'
                                                })
                                            }}
                                        />
                                        {errors.city && (
                                            <span className="error-messageNew">{errors.city}</span>
                                        )}
                                    </div>
                                </FormGroup>
                            </Col>

                        </Row>


                        <Row>
                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="State">State</Label><span className='error'>*</span>
                                    <div style={{ position: 'relative' }}>
                                        <Select
                                            options={states}
                                            value={selectedState}
                                            onChange={(option) => handleSelectField('state', option)}
                                            isClearable
                                            isDisabled={operation === 'E'}
                                            id={operation === 'E' ? 'service' : ''}
                                            className={errors.state ? 'error-border' : ''}
                                            placeholder="Select a State"
                                            styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                                                    boxShadow: 'none',
                                                    '&:hover': {
                                                        border: '1px solid #ccc'
                                                    }
                                                }),
                                                indicatorSeparator: () => ({
                                                    display: 'none'
                                                }),
                                                dropdownIndicator: () => ({
                                                    display: 'none'
                                                })
                                            }}
                                        />
                                        {errors.state && (
                                            <span className="error-messageNew">{errors.state}</span>
                                        )}
                                    </div>
                                </FormGroup>
                            </Col>

                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="State">Country</Label><span className='error'>*</span>
                                    <div style={{ position: 'relative' }}>
                                        <Select
                                            options={countries}
                                            value={selectedCountry}
                                            onChange={(option) => handleSelectField('country', option)}
                                            isClearable
                                            isDisabled={operation === 'E'}
                                            id={operation === 'E' ? 'service' : ''}
                                            className={errors.country ? 'error-border' : ''}
                                            placeholder="Select a Country"
                                            styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                                                    boxShadow: 'none',
                                                    '&:hover': {
                                                        border: '1px solid #ccc'
                                                    }
                                                }),
                                                indicatorSeparator: () => ({
                                                    display: 'none'
                                                }),
                                                dropdownIndicator: () => ({
                                                    display: 'none'
                                                })
                                            }}
                                        />
                                        {errors.country && (
                                            <span className="error-messageNew">{errors.country}</span>
                                        )}
                                    </div>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="portId">Pin</Label><span className='error'>*</span>
                                    <div style={{ position: 'relative' }}>
                                        <Input
                                            type="text"
                                            name="pin"
                                            className={`form-control inputField ${errors.pin ? 'error-border' : ' '}`}
                                            placeholder="Enter Pin Code"
                                            value={port.pin}
                                            onChange={handleChange}
                                            readOnly={operation === 'E'}
                                            id={operation === 'E' ? 'service' : ''}
                                            maxLength={8}
                                        />
                                        {errors.pin && (
                                            <span className="error-messageNew">{errors.pin}</span>
                                        )}
                                    </div>
                                </FormGroup>
                            </Col>

                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="portId">Phone No</Label>
                                    <div style={{ position: 'relative' }}>
                                        <Input
                                            type="text"
                                            name="phoneNo"
                                            className={`form-control inputField`}
                                            placeholder="Enter Phone No"
                                            value={port.phoneNo}
                                            onChange={handleChange}
                                            readOnly={operation === 'E'}
                                            id={operation === 'E' ? 'service' : ''}
                                            maxLength={15}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>


                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="portId">Fax No</Label>
                                    <div style={{ position: 'relative' }}>
                                        <Input
                                            type="text"
                                            name="faxNo"
                                            className={`form-control inputField`}
                                            placeholder="Enter FaxNo No"
                                            value={port.faxNo}
                                            onChange={handleChange}
                                            readOnly={operation === 'E'}
                                            id={operation === 'E' ? 'service' : ''}
                                            maxLength={15}
                                        />

                                    </div>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="portId">Agent Code</Label><span className='error'>*</span>
                                    <div style={{ position: 'relative' }}>
                                        <Input
                                            type="text"
                                            name="agentCode"
                                            className={`form-control inputField ${errors.agentCode ? 'error-border' : ' '}`}
                                            placeholder="Enter Agent Code"
                                            value={port.agentCode}
                                            onChange={handleChange}
                                            readOnly={operation === 'E'}
                                            id={operation === 'E' ? 'service' : ''}
                                            maxLength={10}
                                        />
                                        {errors.agentCode && (
                                            <span className="error-messageNew">{errors.agentCode}</span>
                                        )}
                                    </div>
                                </FormGroup>
                            </Col>

                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="portId">Job Order Prefix</Label>
                                    <div style={{ position: 'relative' }}>
                                        <Input
                                            type="text"
                                            name="jobOrderPrefix"
                                            className={`form-control inputField`}
                                            placeholder="Enter Phone No"
                                            value={port.jobOrderPrefix}
                                            onChange={handleChange}
                                            readOnly={operation === 'E'}
                                            id={operation === 'E' ? 'service' : ''}
                                            maxLength={5}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>




                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="portId">Job Order Next No</Label>
                                    <div style={{ position: 'relative' }}>
                                        <Input
                                            type="text"
                                            name="jobOrderNextNo"
                                            className={`form-control inputField`}
                                            placeholder="Enter Job Order Next No"
                                            value={port.jobOrderNextNo}
                                            onChange={handleChange}
                                            readOnly={operation === 'E'}
                                            id={operation === 'E' ? 'service' : ''}
                                            maxLength={10}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>

                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="jobOrderFormat">Job Order Format</Label>
                                    <div style={{ position: 'relative' }}>
                                        <Select
                                            options={jobOrderFormats}
                                            value={selectedJobOrderFormat}
                                            onChange={(option) => handleSelectField('jobOrderFormat', option)}
                                            isClearable
                                            isDisabled={operation === 'E'}
                                            id={operation === 'E' ? 'service' : ''}
                                            placeholder="Select Job Order Format"
                                            styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                                                    boxShadow: 'none',
                                                    '&:hover': {
                                                        border: '1px solid #ccc'
                                                    }
                                                }),
                                                indicatorSeparator: () => ({
                                                    display: 'none'
                                                }),
                                                dropdownIndicator: () => ({
                                                    display: 'none'
                                                })
                                            }}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="portId">Local / Other</Label>
                                    <div style={{ position: 'relative' }}>
                                        <Select
                                            options={localPortData}
                                            value={{ value: port.localPort, label: port.localPort }}
                                            onChange={(option) => handleSelectField('localPort', option)}
                                            isClearable
                                            isDisabled={operation === 'E'}
                                            id={operation === 'E' ? 'service' : ''}
                                            placeholder="Select Local / Other"
                                            styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                                                    boxShadow: 'none',
                                                    '&:hover': {
                                                        border: '1px solid #ccc'
                                                    }
                                                }),
                                                indicatorSeparator: () => ({
                                                    display: 'none'
                                                }),
                                                dropdownIndicator: () => ({
                                                    display: 'none'
                                                })
                                            }}
                                        />
                                    </div>
                                    {/* <Input
                                        type="select"
                                        name="localPort"
                                        className={`form-control inputField`}
                                        value={port.localPort}
                                        onChange={handleChange}
                                        readOnly={operation === 'E'}
                                        id={operation === 'E' ? 'service' : ''}
                                    >
                                        <option value="">Select</option>
                                        <option value="Local">Local</option>
                                        <option value="Other">Other</option>
                                    </Input> */}


                                </FormGroup>
                            </Col>
                        </Row>


                        <Row className='mt-3'>
                            <h4 style={{ fontWeight: 'bold' }}>Contact Details</h4>

                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="portId">Contact Person</Label>
                                    <div style={{ position: 'relative' }}>
                                        <Input
                                            type="text"
                                            name="contactPerson"
                                            className={`form-control inputField`}
                                            placeholder="Enter Contact Person"
                                            value={port.contactPerson}
                                            onChange={handleChange}
                                            readOnly={operation === 'E'}
                                            id={operation === 'E' ? 'service' : ''}
                                            maxLength={25}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>


                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="portId">Contact Designation</Label>
                                    <div style={{ position: 'relative' }}>
                                        <Input
                                            type="text"
                                            name="contactDesignation"
                                            className={`form-control inputField`}
                                            placeholder="Enter Contact Designation"
                                            value={port.contactDesignation}
                                            onChange={handleChange}
                                            readOnly={operation === 'E'}
                                            id={operation === 'E' ? 'service' : ''}
                                            maxLength={25}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>


                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="portId">Contact Phone</Label>
                                    <div style={{ position: 'relative' }}>
                                        <Input
                                            type="text"
                                            name="contactPhone"
                                            className={`form-control inputField`}
                                            placeholder="Enter Contact Phone"
                                            value={port.contactPhone}
                                            onChange={handleChange}
                                            readOnly={operation === 'E'}
                                            id={operation === 'E' ? 'service' : ''}
                                            maxLength={12}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>


                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="portId">Contact Fax No</Label>
                                    <div style={{ position: 'relative' }}>
                                        <Input
                                            type="text"
                                            name="contactFaxNo"
                                            className={`form-control inputField`}
                                            placeholder="Enter Contact Fax No"
                                            value={port.contactFaxNo}
                                            onChange={handleChange}
                                            readOnly={operation === 'E'}
                                            id={operation === 'E' ? 'service' : ''}
                                            maxLength={15}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>

                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="portId">Contact Email</Label>
                                    <div style={{ position: 'relative' }}>
                                        <Input
                                            type="text"
                                            name="contactEmail"
                                            className={`form-control inputField ${errors.contactEmail ? 'error-border' : ' '}`}
                                            placeholder="Enter Contact Email"
                                            value={port.contactEmail}
                                            onChange={handleChange}
                                            readOnly={operation === 'E'}
                                            id={operation === 'E' ? 'service' : ''}
                                            maxLength={25}
                                        />
                                        {errors.contactEmail && (
                                            <span className="error-messageNew">{errors.contactEmail}</span>
                                        )}
                                    </div>
                                </FormGroup>
                            </Col>

                        </Row>
                        <div className="text-center mb-3 mt-2">

                            {operation !== 'E' && (
                                <Button
                                    type="submit"
                                    className=""
                                    style={{ fontWeight: 'bold' }}
                                    variant="outline-success"
                                    onClick={(e) => handleSubmit(e)}
                                >
                                    <FontAwesomeIcon
                                        icon={faSave}
                                        style={{ marginRight: "5px" }}
                                    />
                                    SUBMIT
                                </Button>
                            )}
                            <Button
                                type="button"
                                className="widthbtn"
                                variant="outline-danger"
                                style={{ marginLeft: '10px', fontWeight: 'bold' }}
                                onClick={Handleback}
                            >
                                <FontAwesomeIcon icon={faBackward} style={{ marginRight: '5px' }} />
                                BACK
                            </Button>
                        </div>

                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default AddPort;