import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ipaddress from "../Components/IpAddress";
import { faAdd, faArrowLeft, faArrowLeftRotate, faAtom, faCalendarCheck, faCalendarDay, faCalendarDays, faCalendarPlus, faCertificate, faCircleArrowLeft, faHandshake, faJar, faPlus, faRefresh, faSearch, faShip, faUserCircle, faUsersViewfinder } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { Pagination } from "react-bootstrap";
import Swal from 'sweetalert2';
import Select from 'react-select';
import {
    Row,
    Col,
    Input,
    Form,
    FormGroup,
    Label,
    Card,
    CardBody,
    Modal,
    Table,
    Container,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";
import { toast } from "react-toastify";
import AuthContext from "../Components/AuthProvider";
import DatePicker from "react-datepicker";
import { red } from "@mui/material/colors";
import "../Components/Style.css"

export default function VesselDetails() {
    const [loading, setLoading] = useState(false);


    const {
        jwtToken,
        userId,
        username,
        branchId,
        companyid,
        role,
        companyname,
        branchname,
        logintype,
        logintypeid,
        userType,
        isAuthenticated,
        login,
        logout,
        userRights,
        parentMenus,
        childMenus,
        tabMenus,
    } = useContext(AuthContext);

    console.log('userRights ', userRights);

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
        },

    };
    const navigate = useNavigate();



    useEffect(() => {
        if (!isAuthenticated) {
            navigate(
                "/login?message=You need to be authenticated to access this page."
            );
        }
    }, [isAuthenticated, navigate]);

    const [isModalOpenForvessel, setIsModalOpenForvessel] = useState(false);
    const [flag, setFlag] = useState('add');

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const processId = queryParams.get('process_id');

    const foundRights = role !== 'ROLE_ADMIN' ? userRights.find(item => item.process_Id === processId) : null;
    const allowCreate = foundRights?.allow_Create === 'Y';
    const allowRead = foundRights?.allow_Read === 'Y';
    const allowEdit = foundRights?.allow_Update === 'Y';
    const allowDelete = foundRights?.allow_Delete === 'Y';





    console.log('processId ', processId);



    const openModal = () => {
        setIsModalOpenForvessel(true);
    }

    const handleClose = () => {
        setIsModalOpenForvessel(false);
        setFlag('add');
        search(searchId);
        setVesselDetails({
            companyId: "",
            branchId: "",
            vesselId: "",
            vesselName: "",
            operator: "",
            portOfRegistration: "",
            vesselFlag: "",
            status: "",
            masterVessel: "",
            approvedBy: "",
            approvedDate: null,
            editedBy: "",
            editedDate: null
        })
        document.getElementById("vesselName").classList.remove('error-border')
        setError('');
        setParyid('');
        setPartyname('')
        setPortid('');
        setPortname('')
        setVesselid('');
        setVesselname('')
    }

    const [port, setPort] = useState([]);
    const [vessel, setVessel] = useState([]);
    const [party, setParty] = useState([]);

    const getAllData = () => {
        axios.get(`${ipaddress}party/getDataForVessel?cid=${companyid}&bid=${branchId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                console.log('data data ', data);
                const partyOptions = data.party.map(party => ({
                    value: party[0],
                    label: party[1]
                }));

                setParty(partyOptions);

                const countryOptions = data.country.map(party => ({
                    value: party[0],
                    label: party[1]
                }));
                setVessel(countryOptions);
                const portOptions = data.port.map(party => ({
                    value: party[0],
                    label: party[1]
                }));
                setPort(portOptions);
            })
            .catch((error) => {

            })
    }

    useEffect(() => {
        getAllData();
    }, [])

    const [partyid, setParyid] = useState('');
    const [partyname, setPartyname] = useState('');

    const [portid, setPortid] = useState('');
    const [portname, setPortname] = useState('');

    const [vesselid, setVesselid] = useState('');
    const [vesselname, setVesselname] = useState('');

    const handlePartyChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setParyid('');
            setPartyname('');
        }
        else {
            setParyid(selectedOption ? selectedOption.value : '');
            setPartyname(selectedOption ? selectedOption.label : '');
        }
    };

    const handlePortChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setPortid('');
            setPortname('');
        }
        else {
            setPortid(selectedOption ? selectedOption.value : '');
            setPortname(selectedOption ? selectedOption.label : '');
        }
    };

    const handleVesselChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setVesselid('');
            setVesselname('');
        }
        else {
            setVesselid(selectedOption ? selectedOption.value : '');
            setVesselname(selectedOption ? selectedOption.label : '');
        }
    };

    const getLabel = (id, city) => {
        const selectedCity = city.find((option) => option.value === id);
        return selectedCity ? selectedCity.label : '';
    };

    const [vesselDetails, setVesselDetails] = useState({
        companyId: "",
        branchId: "",
        vesselId: "",
        vesselName: "",
        operator: "",
        portOfRegistration: "",
        vesselFlag: "",
        status: "",
        masterVessel: "",
        approvedBy: "",
        approvedDate: null,
        editedBy: "",
        editedDate: null
    });

    const handleVesselDtlChange = (event) => {
        const { name, value } = event.target;
        setVesselDetails((prevFilters) => ({
            ...prevFilters,
            [name]: value,

        }));
        document.getElementById(name).classList.remove('error-border');
        setError('');
    }

    const [error, setError] = useState('');

    const saveData = () => {
        setLoading(true);
        document.getElementById("vesselName").classList.remove('error-border')
        setError('');
        if (!vesselDetails.vesselName) {
            setError("Vessel name is required");
            document.getElementById("vesselName").classList.add('error-border')
            return;
        }

        console.log('partyid ', partyid, ' ', portid, ' ', vesselid);
        vesselDetails.operator = partyid;
        vesselDetails.portOfRegistration = portid;
        vesselDetails.vesselFlag = vesselid;

        axios.post(`${ipaddress}vessel/saveData?cid=${companyid}&bid=${branchId}&user=${userId}&flag=${flag}`, vesselDetails, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                setLoading(false);
                if (data) {
                    toast.success("Data save successfully!!", {
                        autoClose: 800
                    })
                    handleClose();
                }
            })
            .catch((error) => {
                toast.error("Something went wrong!!", {
                    autoClose: 800
                })
                setLoading(false);
            })

    }

    const handleClear = () => {
        setVesselDetails({
            companyId: "",
            branchId: "",
            vesselId: "",
            vesselName: "",
            operator: "",
            portOfRegistration: "",
            vesselFlag: "",
            status: "",
            masterVessel: "",
            approvedBy: "",
            approvedDate: null,
            editedBy: "",
            editedDate: null
        });
        setFlag('add');
        setParyid('');
        setPartyname('')
        setPortid('');
        setPortname('')
        setVesselid('');
        setVesselname('')
        document.getElementById("vesselName").classList.remove('error-border')
        setError('');
    }
    const [searchId, setSearchId] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const search = (id) => {
        setLoading(true);
        axios.get(`${ipaddress}vessel/search?cid=${companyid}&bid=${branchId}&vname=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setLoading(false);
                setFilteredData(response.data);
            })
            .catch((error) => {
                setLoading(false);
            })
    }

    useEffect(() => {
        search(searchId);
    }, [])

    const handleSearchReset = () => {
        setSearchId('');
        search('');
    }


    const [currentPage2, setCurrentPage2] = useState(1);
    const [itemsPerPage2] = useState(20);

    const indexOfLastItem2 = currentPage2 * itemsPerPage2;
    const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;
    const currentItems2 = filteredData.slice(indexOfFirstItem2, indexOfLastItem2);
    const totalPages2 = Math.ceil(filteredData.length / itemsPerPage2);

    // Function to handle page change
    const handlePageChange2 = (page) => {
        if (page >= 1 && page <= totalPages2) {
            setCurrentPage2(page);
        }
    };
    const displayPages2 = () => {
        const centerPageCount = 5;
        const middlePage = Math.floor(centerPageCount / 2);
        let startPage = currentPage2 - middlePage;
        let endPage = currentPage2 + middlePage;

        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(totalPages2, centerPageCount);
        }

        if (endPage > totalPages2) {
            endPage = totalPages2;
            startPage = Math.max(1, totalPages2 - centerPageCount + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    const setCurrentPageFun = () => {
        setCurrentPage2(1);
    };


    const getEdit = (id) => {
        setIsModalOpenForvessel(true);

        axios.get(`${ipaddress}vessel/getData?cid=${companyid}&bid=${branchId}&vid=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setVesselDetails(response.data);
                setParyid(response.data.operator);
                setPartyname(getLabel(response.data.operator, party))
                setPortid(response.data.portOfRegistration);
                setPortname(getLabel(response.data.portOfRegistration, port))
                setVesselid(response.data.vesselFlag);
                setVesselname(getLabel(response.data.vesselFlag, vessel))
                setFlag('edit')
            })
            .catch((error) => {

            })
    }

    const deleteData = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure you want to delete this record?',
            width: 'auto',
            position: 'top', // Set the position to 'top'
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            customClass: {
                title: 'your-custom-title-class', // Define a custom class for the title
                cancelButton: 'your-custom-cancel-button-class', // Define a custom class for the cancel button
                confirmButton: 'your-custom-confirm-button-class', // Define a custom class for the confirm button
                content: 'your-custom-content-class', // Define a custom class for the content
            },
            buttonsStyling: false,
        });

        if (result.isConfirmed) {
            axios.post(`${ipaddress}vessel/deleteData?cid=${companyid}&bid=${branchId}&vid=${id}&user=${userId}`, null, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            })
                .then((response) => {
                    const data = response.data;

                    if (data === 'success') {
                        search(searchId);
                        toast.error("Data deleted successfully!!", {
                            autoClose: 800
                        })
                    }
                    else {
                        toast.error("Something went wrong!!", {
                            autoClose: 800
                        })
                    }
                })
                .catch((error) => {
                    toast.error("Something went wrong!!", {
                        autoClose: 800
                    })
                })
        }
    }

    const addVoyage = (vesselId, vesselName) => {
        navigate(`/master/addvoyage`, { state: { flag: "add", vesselId: vesselId, vesselName: vesselName } });
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
            <div className="container">
                <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-50px' }} > <FontAwesomeIcon
                    icon={faShip}
                    style={{
                        marginRight: '8px',
                        color: 'black', // Set the color to golden
                    }}
                />Vessel Details</h5>
                <Card style={{ backgroundColor: "#F8F8F8" }}>
                    <CardBody>
                        <Row className="text-end">
                            {(role !== 'ROLE_ADMIN' && allowCreate) || (role === 'ROLE_ADMIN') ? (
                                <Col>
                                    <Button
                                        disabled={false} // Adjust this if needed
                                        type="button"
                                        className="btn btn-outline-primary btn-margin newButton"
                                        onClick={openModal}
                                        variant="outline-primary"
                                        style={{ marginTop: '0px', marginRight: 15 }}
                                    >
                                        <FontAwesomeIcon icon={faPlus} style={{ marginRight: '1px' }} />
                                        New Entry
                                    </Button>
                                </Col>
                            ) : null}

                        </Row>
                        <hr />
                        <Row>
                            <Col md={4}>
                                <Label style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">Vessel Name</Label>
                                <Input
                                    type="text"
                                    name="gateInId"
                                    id="gateInId"
                                    className="inputField"
                                    value={searchId}
                                    onChange={(e) => setSearchId(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row className="text-center" style={{ marginTop: 25 }}>
                            <Col>
                                <Button type="button" onClick={() => { search(searchId); setCurrentPageFun(); }} className="btn btn-outline-primary btn-margin newButton" variant="outline-primary" style={{ marginTop: '0px', marginRight: 15 }}>
                                    <FontAwesomeIcon icon={faSearch} style={{ marginRight: '1px' }} />
                                    Search
                                </Button>
                                <Button type="button" onClick={handleSearchReset} className="btn btn-outline-danger btn-margin newButton" variant="outline-danger" style={{ marginTop: '0px' }}>
                                    <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '1px' }} />
                                    Reset
                                </Button>
                            </Col>
                        </Row>
                        <hr />
                        <div className="table-responsive mt-3">

                            <Table className="table table-bordered table-hover" style={{ border: '2px solid black' }}>
                                <thead className="thead-dark bg-dark"  >
                                    <tr style={{ fontWeight: 'bold', border: '2px solid black', fontSize: '17px' }}>
                                        <th scope="col" className="text-center" >Sr No</th>
                                        <th scope="col" className="text-center" >Vessel Id</th>
                                        <th scope="col" className="text-center" >Vessel Name</th>
                                        <th scope="col" className="text-center" >Port Of Registration</th>
                                        <th scope="col" className="text-center" >Vessel Flag</th>
                                        <th scope="col" className="text-center" >Status</th>
                                        <th scope="col" className="text-center" >Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems2.map((item, index) => (
                                        <tr key={index} className='text-center'>
                                            <td style={{ textAlign: 'center', fontFamily: 'Your-Data-Font' }}>{((currentPage2 - 1) * itemsPerPage2) + index + 1}</td>
                                            <td style={{ textAlign: 'center', fontFamily: 'Your-Data-Font' }}>{item.vesselId}</td>
                                            <td style={{ textAlign: 'center', fontFamily: 'Your-Data-Font' }}>{item.vesselName}</td>
                                            <td style={{ textAlign: 'center', fontFamily: 'Your-Data-Font' }}>{item.portOfRegistration}</td>
                                            <td style={{ textAlign: 'center', fontFamily: 'Your-Data-Font' }}>{item.vesselFlag}</td>
                                            <td style={{ textAlign: 'center', fontFamily: 'Your-Data-Font' }}>{item.status === 'A' ? 'Approved' : ''}</td>

                                            <td className="text-center">
                                                <div className="">
                                                    <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <FontAwesomeIcon icon={faAtom} style={{ marginRight: '5px' }} />
                                                        Action
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        {(role !== 'ROLE_ADMIN' && allowEdit) || (role === 'ROLE_ADMIN') ? (
                                                            <li>
                                                                <button className="dropdown-item" onClick={() => getEdit(item.vesselId)}>
                                                                    <FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />Modify Details
                                                                </button>
                                                            </li>
                                                        ) : (null)}
                                                        <li>
                                                            <button className="dropdown-item" onClick={() => addVoyage(item.vesselId, item.vesselName)} >
                                                                <FontAwesomeIcon icon={faAdd} style={{ marginRight: "5px" }} />Add Voyage
                                                            </button>
                                                        </li>
                                                        {/* {(role !== 'ROLE_ADMIN' && allowDelete) || (role === 'ROLE_ADMIN') ? (
                                                            <li>
                                                                <button className="dropdown-item"
                                                                    onClick={() => deleteData(item.vesselId)}
                                                                >
                                                                    <FontAwesomeIcon icon={faTrash} style={{ marginRight: "5px" }} />Delete Details
                                                                </button>
                                                            </li>
                                                        ) : (null)} */}

                                                    </ul>
                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                        <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                            <Pagination.First onClick={() => handlePageChange2(1)} />
                            <Pagination.Prev
                                onClick={() => handlePageChange2(currentPage2 - 1)}
                                disabled={currentPage2 === 1}
                            />
                            <Pagination.Ellipsis />

                            {displayPages2().map((pageNumber) => (
                                <Pagination.Item
                                    key={pageNumber}
                                    active={pageNumber === currentPage2}
                                    onClick={() => handlePageChange2(pageNumber)}
                                >
                                    {pageNumber}
                                </Pagination.Item>
                            ))}

                            <Pagination.Ellipsis />
                            <Pagination.Next
                                onClick={() => handlePageChange2(currentPage2 + 1)}
                                disabled={currentPage2 === totalPages2}
                            />
                            <Pagination.Last onClick={() => handlePageChange2(totalPages2)} />
                        </Pagination>


                        <Modal Modal isOpen={isModalOpenForvessel} onClose={handleClose} toggle={handleClose} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }}>

                            <ModalHeader toggle={handleClose} style={{
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

                                {flag === 'add' ? (
                                    <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
                                        icon={faPlus}
                                        style={{
                                            marginRight: '8px',
                                            color: 'black', // Set the color to golden
                                        }}
                                    /> Add Vessel Details</h5>
                                )
                                    :
                                    (
                                        <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
                                            icon={faEdit}
                                            style={{
                                                marginRight: '8px',
                                                color: 'black', // Set the color to golden
                                            }}
                                        /> Edit Vessel Details</h5>
                                    )

                                }


                            </ModalHeader>
                            <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                                <Row>
                                    <Col md={4}>
                                        <Label style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">Vessel Id</Label>
                                        <Input
                                            type="text"
                                            name="vesselId"
                                            id="vesselId"
                                            readOnly
                                            value={vesselDetails.vesselId}
                                            onChange={handleVesselDtlChange}
                                            style={{ backgroundColor: "#E0E0E0" }}
                                            className="inputField"
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Label style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">Vessel Name <span style={{ color: 'red' }}>*</span></Label>
                                        <Input
                                            type="text"
                                            name="vesselName"
                                            id="vesselName"
                                            className="inputField"
                                            value={vesselDetails.vesselName}
                                            onChange={handleVesselDtlChange}
                                            maxLength={25}
                                        />
                                        <div style={{ color: 'red' }} className="error-message">{error}</div>
                                    </Col>
                                    <Col md={4}>
                                        <Label style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">Status</Label>
                                        <Input
                                            type="text"
                                            name="status"
                                            id="status"
                                            readOnly
                                            style={{ backgroundColor: "#E0E0E0" }}
                                            className="inputField"
                                            value={vesselDetails.status === 'A' ? 'Approved' : ''}
                                            onChange={handleVesselDtlChange}
                                        />
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <Label style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">Operator/Principal</Label>
                                        <Select
                                            options={party}
                                            value={{ value: partyid, label: partyname }}
                                            onChange={handlePartyChange}
                                            id="partyType"
                                            name="partyType"
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
                                    </Col>
                                    <Col md={4}>
                                        <Label style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">Port Of Registration</Label>
                                        <Select
                                            options={port}
                                            value={{ value: portid, label: portname }}
                                            onChange={handlePortChange}
                                            id="partyType"
                                            name="partyType"
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
                                    </Col>
                                    <Col md={4}>
                                        <Label style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">Approved By</Label>
                                        <Input
                                            type="text"
                                            name="approvedBy"
                                            id="approvedBy"
                                            readOnly
                                            style={{ backgroundColor: "#E0E0E0" }}
                                            className="inputField"
                                            value={vesselDetails.approvedBy}
                                            onChange={handleVesselDtlChange}
                                        />
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <Label style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">Vessel Flag</Label>
                                        <Select
                                            options={vessel}
                                            value={{ value: vesselid, label: vesselname }}
                                            onChange={handleVesselChange}
                                            id="partyType"
                                            name="partyType"
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
                                    </Col>
                                    <Col md={4}>
                                        <Label style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">Mother Vessel</Label>
                                        <Input
                                            type="text"
                                            name="masterVessel"
                                            id="masterVessel"
                                            className="inputField"
                                            value={vesselDetails.masterVessel}
                                            onChange={handleVesselDtlChange}
                                            maxLength={25}
                                        />
                                    </Col>


                                </Row>
                                <hr />
                                <Row className="text-center" style={{ marginTop: 25 }}>
                                    <Col>
                                        <Button type="button" className="btn btn-outline-success btn-margin newButton" onClick={saveData} variant="outline-success" style={{ marginTop: '0px', marginRight: 15 }}>
                                            <FontAwesomeIcon icon={faSave} style={{ marginRight: '1px' }} />
                                            Submit
                                        </Button>
                                        {flag === 'add' && (
                                            <Button type="button" onClick={handleClear} className="btn btn-outline-danger btn-margin newButton" variant="outline-danger" style={{ marginTop: '0px' }}>
                                                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '1px' }} />
                                                Clear
                                            </Button>
                                        )}
                                    </Col>
                                </Row>
                            </ModalBody>
                        </Modal>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
