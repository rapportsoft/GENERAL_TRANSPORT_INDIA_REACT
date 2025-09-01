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
    FormGroup,
    Label,
    Input,
    Table,
} from "reactstrap";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faGroupArrowsRotate, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import useAxios from '../Components/useAxios';
export default function ProfitCenter() {
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

    const addBranch = () => {
        navigate(`/master/addProfitCenter`, { state: { flag: "add" } });
    }

    const EditParty = (id) => {
        navigate(`/master/addProfitCenter`, { state: { flag: "edit", profitcentreId: id } });
    }


    const [profitDesc, setProfitDesc] = useState('');
    const [vesselMandatory, setVesselMandatory] = useState('');
    const [joMandatory, setJoMandatory] = useState('');
    const [containerMandatory, setContainerMandatory] = useState('');
    const [filteredData, setFilteredData] = useState([]);


    // const search = (p) => {

    //     axios.get(`${ipaddress}api/profitcentres/getProfitcenterAllData?companyId=${companyid}&branchId=${branchId}&desc=${p}`, {
    //         headers: {
    //             Authorization: `Bearer ${jwtToken}`
    //         }
    //     })
    //         .then((response) => {
    //             setFilteredData(response.data);
    //         })
    //         .catch((error) => {

    //         })
    // }

    const search = async (vesselMandatory, joMandatory, containerMandatory, p) => {
        setLoading(true);

        try {
            const response = await axios.get(`${ipaddress}api/profitcentres/getProfitcenterAllData`, {
                params: {
                    companyId: companyid,
                    branchId: branchId,
                    vesselMandatory: vesselMandatory,
                    joMandatory: joMandatory,
                    containerMandatory: containerMandatory,
                    desc: p
                },
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            setFilteredData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            // You can handle the error more gracefully here, e.g., by displaying an error message to the user
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        search('');
    }, [])

    const deleteProfitCenter = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            html: 'Are you sure you want to delete the record?',
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
                axios.post(`${ipaddress}api/profitcentres/deleteProfitCenter?companyId=${companyid}&branchId=${branchId}&profitcentreId=${id}`, null, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                })
                    .then((response) => {
                        search();
                        if (response.data === 'success') {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Data deleted successfully!!!",
                                icon: "success"
                            });
                        }

                    })
                    .catch((error) => {

                    })

            }
        });
    }
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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
        search('');
        setProfitDesc('');
        setVesselMandatory('');
        setJoMandatory('');
        setContainerMandatory('');
    }

    const [loading, setLoading] = useState(false);
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
                    icon={faGroupArrowsRotate}
                    style={{
                        marginRight: '8px',
                        color: 'black', // Set the color to golden
                    }}
                />ProfitCentre</h5>
                <Card style={{ backgroundColor: "#F8F8F8" }}>
                    <CardBody>
                        <Row className="justify-content-end">
                            <Col xs="auto">
                                {(role !== 'ROLE_ADMIN' && allowCreate) || (role === 'ROLE_ADMIN') ? (
                                    <button
                                        className="btn btn-outline-success btn-margin newButton"
                                        style={{ marginRight: 10 }}
                                        id="submitbtn2"
                                        onClick={addBranch}
                                    >
                                        <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
                                        New Entry
                                    </button>
                                ) : (null)}
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col md={3}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Profit Centre Desc
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="fobValueInDollar"
                                        maxLength={15}
                                        value={profitDesc}
                                        onChange={(e) => setProfitDesc(e.target.value)}
                                    />


                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Vessel Mandatory
                                    </label>
                                    {/* <input
                                    className="form-control"
                                    type="text"
                                    id="fobValueInDollar"
                                    maxLength={15}
                                    value={vesselMandatory}
                                    onChange={(e) => setVesselMandatory(e.target.value)}
                                /> */}

                                    <select
                                        className="form-control"
                                        id="vesselMandatory"
                                        value={vesselMandatory}
                                        onChange={(e) => setVesselMandatory(e.target.value)}
                                    ><option value="">Select...</option>
                                        <option value="N">NO</option>
                                        <option value="Y">YES</option>
                                    </select>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Job Order Mandatory
                                    </label>
                                    <select
                                        className="form-control"
                                        id="joMandatory"
                                        value={joMandatory}
                                        onChange={(e) => setJoMandatory(e.target.value)}
                                    >
                                        <option value="">Select...</option>
                                        <option value="N">NO</option>
                                        <option value="Y">YES</option>
                                    </select>

                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Container Mandatory
                                    </label>
                                    <select
                                        className="form-control"
                                        id="containerMandatory"
                                        value={containerMandatory}
                                        onChange={(e) => setContainerMandatory(e.target.value)}
                                    > <option value="">Select...</option>
                                        <option value="N">NO</option>
                                        <option value="Y">YES</option>
                                    </select>

                                </FormGroup>
                            </Col>
                            <Col md={3} style={{ marginTop: 24 }}>
                                <button
                                    className="btn btn-outline-success btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    onClick={() => search(vesselMandatory, joMandatory, containerMandatory, profitDesc)}
                                >
                                    <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                    Search
                                </button>
                                <button
                                    className="btn btn-outline-danger btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    onClick={handleClear}
                                >
                                    <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                    Reset
                                </button>
                            </Col>
                        </Row>
                        <hr />
                        <div className="mt-1 table-responsive ">
                            <p className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '1%', paddingRight: '-20px' }} > <FontAwesomeIcon
                                icon={faGroupArrowsRotate}
                                style={{
                                    marginRight: '4px',
                                    color: 'black', // Set the color to golden
                                }}
                            />ProfitCentre Summary</p>
                            <table className="table table-bordered table-hover tableHeader">
                                <thead className='tableHeader'>
                                    <tr>
                                        <th scope="col">Sr NO</th>
                                        <th scope="col">Profit Centre Id</th>
                                        <th scope="col">Profit Centre Desc</th>
                                        <th scope="col">Vessel Mandatory</th>
                                        <th scope="col">Job Order Mandatory</th>
                                        <th scope="col">Container Mandatory</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                {currentItems.length === 0 ? (
                                    <tbody className="text-center">
                                        <tr>
                                            <td colSpan="8">NO Records</td>
                                        </tr>
                                    </tbody>
                                ) : (
                                    <tbody>
                                        {currentItems.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.profitcentreId}</td>
                                                <td>{item.profitcentreDesc}</td>
                                                <td>{item.vesselMandatory === 'Y' ? 'YES' : 'NO'}</td>
                                                <td>{item.joMandatory === 'Y' ? 'YES' : 'NO'}</td>
                                                <td>{item.containerMandatory === 'Y' ? 'YES' : 'NO'}</td>
                                                <td>{item.status === 'A' ? 'Approved' : ''}</td>
                                                <td>
                                                {(role !== 'ROLE_ADMIN' && allowEdit) || (role === 'ROLE_ADMIN') ? (
                                                    <button
                                                        className="btn btn-outline-primary btn-margin newButton"
                                                        style={{ marginRight: 3 }}
                                                        id="submitbtn2"
                                                        onClick={() => EditParty(item.profitcentreId)}
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />

                                                    </button>
                                                ):(null)}
                                                 {/* {(role !== 'ROLE_ADMIN' && allowDelete) || (role === 'ROLE_ADMIN') ? (
                                                    <button
                                                        className="btn btn-outline-danger btn-margin newButton"
                                                        style={{ marginRight: 3 }}
                                                        id="submitbtn2"
                                                        onClick={() => deleteProfitCenter(item.profitcentreId)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} style={{ marginRight: "5px" }} />

                                                    </button>
                                                 ):(null)} */}

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                )}
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
        </>
    )
}
