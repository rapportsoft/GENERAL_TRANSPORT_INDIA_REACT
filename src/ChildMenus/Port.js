import AuthContext from '../Components/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import Select from 'react-select';
import { Pagination } from "react-bootstrap";
import Swal from "sweetalert2";
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
    Button,
    Table,
} from "reactstrap";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faShip, faEye, faEdit, faTrashAlt, faAtom, faSyncAlt, faShippingFast } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import useAxios from '../Components/useAxios';
import CFSService from '../service/CFSService';
import { toast } from 'react-toastify';

function Port() {

    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

    const axiosInstance = useAxios();
    const cfsService = new CFSService(axiosInstance);

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
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust the opacity and color as needed
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999, // Ensure the overlay is above other elements
        },
    };

    const [loading, setLoading] = useState(false);
    const [ports, setPorts] = useState([]);

    const [portNames, setPortNames] = useState([]);
    const [selectedPortName, setSelectedPortName] = useState([]);

    const [portTypes, setPortTypes] = useState([]);
    const [selectedPortType, setSelectedPortType] = useState([]);

    const [portCodes, setPortCodes] = useState([]);
    const [selectedPortCode, setSelectedPortCode] = useState([]);


    const [searchCriteria, setSearchCriteria] = useState([]);

    const location = useLocation();
    const updatedSerchcriteria = location.state?.searchCriteria;
    const updatedCurrentPage = location.state?.currentPage

    const initialSearchCriteria = {
        companyId: companyid,
        branchId: branchId,
        portName: '',
        portCode: '',
        portType: ''
    };


    useEffect(() => {
        const fetchData = async () => {
            await getSelectTags();
            await getPortTypes('J00057');
            const criteriaToSet = updatedSerchcriteria || initialSearchCriteria;
            const updatedPage = updatedCurrentPage || currentPage;
            setCurrentPage(updatedPage);
            setSearchCriteria(criteriaToSet);
            await handleSearch(criteriaToSet);
        };
        fetchData();
    }, []);



    const queryParams = new URLSearchParams(location.search);
    const processId = queryParams.get('process_id');


    const foundRights = role !== 'ROLE_ADMIN' ? userRights.find(item => item.process_Id === processId) : null;
    const allowCreate = foundRights?.allow_Create === 'Y';
    const allowRead = foundRights?.allow_Read === 'Y';
    const allowEdit = foundRights?.allow_Update === 'Y';
    const allowDelete = foundRights?.allow_Delete === 'Y';


    console.log('allowCreate '+allowCreate + ' allowRead '+allowRead + ' allowEdit '+allowEdit + ' allowDelete '+allowDelete);


    const getSelectTags = async () => {
        try {
            const response = await cfsService.getSelectTags(companyid, branchId, jwtToken);
            const ports = response.data;

            const portNamesList = ports.map(port => ({
                value: port.portName,
                label: port.portName
            }));

            const portCodesList = ports.map(port => ({
                value: port.portCode,
                label: port.portCode
            }));

            setPortNames(portNamesList);
            setPortCodes(portCodesList);
        } catch (error) {
            console.error('Error fetching port data:', error);
        }
    };



    const getPortTypes = async (jarId) => {
        const portType = await getjarByJarId(jarId);
        setPortTypes(portType);
    }

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


    const handleSearch = async (searchCriteria) => {
        setLoading(true);
        try {
            const response = await cfsService.searchPorts(searchCriteria, jwtToken);
            setPorts(response.data);
            console.log(response.data);
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

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = ports.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(ports.length / itemsPerPage);

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



    useEffect(() => {
        const foundType = portNames.find(type => type.label === searchCriteria.portName);
        setSelectedPortName(foundType ? foundType : null);
    }, [portNames, selectedPortName, searchCriteria.portName]);

    useEffect(() => {
        const foundType = portCodes.find(type => type.label === searchCriteria.portCode);
        setSelectedPortCode(foundType ? foundType : null);
    }, [portCodes, selectedPortCode, searchCriteria.portCode]);


    useEffect(() => {
        const foundType = portTypes.find(type => type.label === searchCriteria.portType);
        setSelectedPortType(foundType ? foundType : null);
    }, [portTypes, selectedPortType, searchCriteria.portType]);







    const handleSelectField = (field, option) => {
        setSearchCriteria(prevCriteria => ({
            ...prevCriteria,
            [field]: option ? option.label : ''
        }));

        switch (field) {
            case 'portName':
                setSelectedPortName(option);
                break;
            case 'portCode':
                setSelectedPortCode(option);
                break;
            case 'portType':
                setSelectedPortType(option);
                break;
            default:
                break;
        }
    };

    const handleAdd = () => {
        navigate(`/master/port/add-port?process_id=${processId}`, {
            state: {
                searchCriteria: searchCriteria,
                currentPage: currentPage
            }
        });
    };
    
    const handleViewClick = (portCode, portTransId, operation) => {
        navigate(`/master/port/add-port?process_id=${processId}`, {
            state: {
                portCode: portCode,
                portTransId: portTransId,
                operation: operation,
                searchCriteria: searchCriteria,
                currentPage: currentPage
            }
        });
    };

    const handleDelete = async (portCode, portTransId) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await cfsService.deletePort(companyid, branchId, portCode, portTransId, userId,jwtToken);

                const errorMessage = response ? response.data : "An error occurred during delete.";
                const contentWidth = errorMessage.length * 10;
                toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessage }} />, {
                    position: 'top-center',
                    autoClose: 1500,
                    style: { width: `${contentWidth}px` },
                });
                await handleSearch(searchCriteria);
            }
        });

    };

    const handleCurrentPage = () => {
        setCurrentPage(1);
    }

    const handleReset = async () => {
        setSelectedPortType(null);
        setSelectedPortName(null);
        setSelectedPortCode(null);
        setSearchCriteria(initialSearchCriteria);
        await handleSearch(initialSearchCriteria);
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

            <div className='Container'>
                <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
                    icon={faShip}
                    style={{
                        marginRight: '8px',
                        color: 'black', // Set the color to golden
                    }}
                />Port</h5>
                <Card style={{ backgroundColor: "#F8F8F8" }}>
                    <CardBody>

                        {(role !== 'ROLE_ADMIN' && allowCreate) || (role === 'ROLE_ADMIN') ? (
                            <>
                                <div className="text-end">
                                    <button
                                        className="btn btn-outline-success text-end"
                                        onClick={handleAdd}
                                        style={{ marginRight: 5, fontWeight: 'bold' }}
                                    >
                                        <FontAwesomeIcon icon={faShip} style={{ marginRight: '5px' }} />
                                        Add Port
                                    </button>
                                </div>

                                <hr />

                            </>
                        ) : null}
                        <Row>

                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="typeOfProduct">Port Code</Label>
                                    <Select
                                        options={portCodes}
                                        value={selectedPortCode}
                                        onChange={(option) => handleSelectField('portCode', option)}
                                        isClearable
                                        placeholder="Select a Port Code"
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
                                </FormGroup>
                            </Col>


                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="typeOfProduct">Port Name</Label>
                                    <Select
                                        options={portNames}
                                        value={selectedPortName}
                                        onChange={(option) => handleSelectField('portName', option)}
                                        isClearable
                                        placeholder="Select a Port Name"
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
                                </FormGroup>
                            </Col>


                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="typeOfProduct">Port Type</Label>
                                    <Select
                                        options={portTypes}
                                        value={selectedPortType}
                                        onChange={(option) => handleSelectField('portType', option)}
                                        isClearable
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
                                </FormGroup>
                            </Col>


                            <Col md={3}>
                                <Row style={{ marginTop: '1.85vw' }}>
                                    <Col md={6}>
                                        <Button
                                            color="primary"
                                            outline
                                            onClick={() => { handleSearch(searchCriteria); handleCurrentPage(); }}
                                            className="mr-2"
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                                            SEARCH
                                        </Button>
                                    </Col>

                                    <Col md={6}>
                                        <Button
                                            color="danger"
                                            outline
                                            onClick={handleReset}
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
                                            RESET
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>

                        </Row>
















                        {ports && ports.length > 0 && (
                            <div className="table-responsive mt-3">
                                <Table className="table table-bordered table-hover" style={{ border: '2px solid black' }}>
                                    <thead className="thead-dark bg-dark text-center"  >
                                        <tr style={{ fontWeight: 'bold', border: '2px solid black', fontSize: '20px' }}>
                                            <th>Sr No</th>
                                            <th>Port Code</th>
                                            <th>Port ISO Code</th>
                                            <th>Port Name</th>
                                            <th>Port Type</th>
                                            <th>Action</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {currentItems.map((item, index) => (
                                            <tr key={item.id} className='text-center'>
                                                <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
                                                <td>{item.portCode}</td>
                                                <td>{item.isoPortCode}</td>
                                                <td>{item.portName}</td>
                                                <td>{item.portType}</td>

                                                <td className="text-center">
                                                    <Button
                                                        color="primary"
                                                        type="button"
                                                        className="btn btn-primary dropdown-toggle"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    ><FontAwesomeIcon icon={faAtom} />
                                                    </Button>
                                                    <ul className="dropdown-menu">

                                                        {(role !== 'ROLE_ADMIN' && allowRead) || (role === 'ROLE_ADMIN') ? (
                                                            <li>
                                                                <button
                                                                    className="dropdown-item"
                                                                    onClick={() => handleViewClick(item.portCode, item.portTransId, "E")}
                                                                ><FontAwesomeIcon icon={faEye} style={{ marginRight: '5px' }} />
                                                                    View Details
                                                                </button>
                                                            </li>

                                                        ) : null}

                                                        {(role !== 'ROLE_ADMIN' && allowEdit) || (role === 'ROLE_ADMIN') ? (
                                                            <li>
                                                                <button
                                                                    className="dropdown-item"
                                                                    onClick={() => handleViewClick(item.portCode, item.portTransId, "U")}
                                                                ><FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />
                                                                    Update Details
                                                                </button>
                                                            </li>
                                                        ) : null}


                                                        {/* {(role !== 'ROLE_ADMIN' && allowDelete) || (role === 'ROLE_ADMIN') ? (
                                                            <li>
                                                                <button
                                                                    className="dropdown-item"
                                                                    onClick={() => handleDelete(item.portCode, item.portTransId)}
                                                                ><FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '5px', color: 'red' }} />
                                                                    Delete Record
                                                                </button>
                                                            </li>

                                                        ) : null} */}
                                                    </ul>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>



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
                        )}
                    </CardBody>
                </Card>
            </div >
        </>
    );
}

export default Port;