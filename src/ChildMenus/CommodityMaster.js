import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ipaddress from "../Components/IpAddress";
import { faJar, faPlus, faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { Pagination } from "react-bootstrap";
import Swal from 'sweetalert2';
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
import { Spinner } from "reactstrap";

export default function CommodityMaster() {


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
    const {
        jwtToken,
        userId,
        username,
        branchId,
        companyid,
        isAuthenticated,
        role,
        login,
        logout,
    } = useContext(AuthContext);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(
                "/login?message=You need to be authenticated to access this page."
            );
        }
    }, [isAuthenticated, navigate]);
    const [loading, setLoading] = useState(false);

    const [commodityId, setCommodityId] = useState('');
    const [commodityCode, setCommodityCode] = useState('');
    const [commodityDesc, setCommodityDesc] = useState('');


    const handleReset = () => {
        setCommodityId('');
        setCommodityCode('');
        setCommodityDesc('');
        search('', '', '');
    }


    const [filteredData, setFilteredData] = useState([]);
    const search = (id, code, desc) => {
        setLoading(true);
        axios.get(`${ipaddress}commodity/search?cid=${companyid}&bid=${branchId}&commId=${id}&commCode=${code}&commDesc=${desc}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setFilteredData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            })
    }

    useEffect(() => {
        search(commodityId, commodityCode, commodityDesc);
    }, [])

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


    const [isModalOpenForCommodity, setIsModalOpenForCommodity] = useState(false);
    const [flag, setFlag] = useState('add');

    const handleAddCommodity = () => {
        setIsModalOpenForCommodity(true);
    }

    const handleClose = () => {
        setFlag('add');
        setIsModalOpenForCommodity(false);
        setFormErrors({
            commodityDesc: '',
            commodityCode: '',
            hsnCode: ''
        })
        document.getElementById('commodityCode').classList.remove('error-border');
        document.getElementById('commodityDesc').classList.remove('error-border');
        document.getElementById('hsnCode').classList.remove('error-border');
        setFormData({
            companyId: companyid,
            branchId: branchId,
            commodityId: '',
            commodityCode: '',
            commodityDesc: '',
            hsnCode: '',
            status: '',
            approvedBy: '',
            approvedDate: null,
            editedBy: '',
            editedDate: null
        })
        search(commodityId, commodityCode, commodityDesc);
    }

    const [formData, setFormData] = useState({
        companyId: companyid,
        branchId: branchId,
        commodityId: '',
        commodityCode: '',
        commodityDesc: '',
        hsnCode: '',
        status: '',
        approvedBy: '',
        approvedDate: null,
        editedBy: '',
        editedDate: null
    })

    const handleFormDataChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFilters) => ({
            ...prevFilters,
            [name]: value,

        }));
        setFormErrors((prevFilters) => ({
            ...prevFilters,
            [name]: '',

        }));
        document.getElementById(name).classList.remove('error-border');
    }

    const [formErrors, setFormErrors] = useState({
        commodityDesc: '',
        commodityCode: '',
        hsnCode: ''
    })

    const handleSave = () => {
        let error = {};
        setLoading(true);
        if (!formData.commodityCode) {
            error.commodityCode = "Commodity code is required."
            document.getElementById('commodityCode').classList.add('error-border');
        }

        if (!formData.commodityDesc) {
            error.commodityDesc = "Commodity desc is required."
            document.getElementById('commodityDesc').classList.add('error-border');
        }

        if (!formData.hsnCode) {
            error.hsnCode = "HSN code is required."
            document.getElementById('hsnCode').classList.add('error-border');
        }
        if (Object.keys(error).length > 0) {
            setFormErrors(error);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            })
            setLoading(false);
            return;
        }

        axios.post(`${ipaddress}commodity/save?cid=${companyid}&bid=${branchId}&user=${userId}&flag=${flag}`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setFormData(response.data);
                toast.success('Data save successfully', {
                    autoClose: 800
                })
                setFormErrors({
                    commodityDesc: '',
                    commodityCode: '',
                    hsnCode: ''
                })
                setLoading(false);
                document.getElementById('commodityCode').classList.remove('error-border');
                document.getElementById('commodityDesc').classList.remove('error-border');
                document.getElementById('hsnCode').classList.remove('error-border');
                setFlag("edit");
            })
            .catch((error) => {
                toast.error("Something went wrong", {
                    autoClose: 800
                })
                setLoading(false);
            })
    }


    const handleFormClear = () => {
        setFormErrors({
            commodityDesc: '',
            commodityCode: '',
            hsnCode: ''
        })
        document.getElementById('commodityCode').classList.remove('error-border');
        document.getElementById('commodityDesc').classList.remove('error-border');
        document.getElementById('hsnCode').classList.remove('error-border');
        setFormData({
            companyId: companyid,
            branchId: branchId,
            commodityId: '',
            commodityCode: '',
            commodityDesc: '',
            hsnCode: '',
            status: '',
            approvedBy: '',
            approvedDate: null,
            editedBy: '',
            editedDate: null
        })
        setFlag('add');
    }

    const getData = (commId) => {
        axios.get(`${ipaddress}commodity/getDataByCommId?cid=${companyid}&bid=${branchId}&commId=${commId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setFormData(response.data);
                setFlag('edit');
                handleAddCommodity();
            })
            .catch((error) => {

            })
    }

    const deleteData = async (commId) => {
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
            axios.post(
                `${ipaddress}commodity/deleteData`,
                null,
                {
                    params: {
                        cid: companyid,
                        bid: branchId,
                        user: userId,
                        commId: commId
                    },
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                }
            )
                .then((response) => {
                    const data = response.data;

                    if (data === 'deleted') {
                        toast.error("Data deleted successfully!!", {
                            autoClose: 800
                        })
                        search(commodityId, commodityCode, commodityDesc);
                    }
                    else {
                        toast.error("Record not found!!", {
                            autoClose: 800
                        })
                    }
                })
                .catch((error) => {
                    toast.error("Record not found!!", {
                        autoClose: 800
                    })
                })
        }
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
                    icon={faJar}
                    style={{
                        marginRight: '8px',
                        color: 'black', // Set the color to golden
                    }}
                />Commodity Details</h5>

                <Card style={{ backgroundColor: "#F8F8F8" }}>
                    <CardBody>
                        <Row className="text-end">
                            <Col>
                                <Button type="button" className="" onClick={() => handleAddCommodity()} variant="outline-primary" style={{ marginTop: '0px', marginRight: 15 }}>
                                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: '1px' }} />
                                    New Entry
                                </Button>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col md={3}>
                                <Label style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">Commodity Id</Label>
                                <Input
                                    type="text"
                                    name="gateInId"
                                    id="gateInId"
                                    value={commodityId}
                                    onChange={(e) => setCommodityId(e.target.value)}
                                    className="inputField"
                                    placeholder="Enter Commodity Id"
                                />
                            </Col>
                            <Col md={3}>
                                <Label style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">Commodity Code</Label>
                                <Input
                                    type="text"
                                    name="gateInId"
                                    id="gateInId"
                                    value={commodityCode}
                                    onChange={(e) => setCommodityCode(e.target.value)}
                                    className="inputField"
                                    placeholder="Enter Commodity Code"
                                />
                            </Col>
                            <Col md={3}>
                                <Label style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">Commodity Desc</Label>
                                <Input
                                    type="text"
                                    name="gateInId"
                                    id="gateInId"
                                    value={commodityDesc}
                                    onChange={(e) => setCommodityDesc(e.target.value)}
                                    className="inputField"
                                    placeholder="Enter Commodity Desc"
                                />
                            </Col>

                            <Col md={3} style={{ marginTop: 24 }}>
                                <button
                                    className="btn btn-outline-success btn-margin newButton"
                                    id="submitbtn2"
                                    style={{ fontSize: 12, marginRight: 5 }}
                                    onClick={() => { search(commodityId, commodityCode, commodityDesc); setCurrentPageFun(); }}
                                >
                                    <FontAwesomeIcon icon={faSearch} style={{ marginRight: '1px' }} />
                                    Search
                                </button>
                                <button
                                    className="btn btn-outline-danger btn-margin newButton"
                                    style={{ fontSize: 12 }}
                                    id="submitbtn2"
                                    onClick={handleReset}
                                >
                                    <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '1px' }} />
                                    Reset
                                </button>
                            </Col>




                        </Row>
                        {/* <Row className="text-center" style={{ marginTop: 25 }}>
                            <Col>
                                <Button type="button" onClick={() => { search(commodityId, commodityCode, commodityDesc); setCurrentPageFun(); }} className="" variant="outline-primary" style={{ marginTop: '0px', marginRight: 15 }}>
                                    <FontAwesomeIcon icon={faSearch} style={{ marginRight: '1px' }} />
                                    Search
                                </Button>
                                <Button type="button" onClick={handleReset} className="" variant="outline-danger" style={{ marginTop: '0px' }}>
                                    <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '1px' }} />
                                    Reset
                                </Button>
                            </Col>
                        </Row> */}

                        {filteredData && filteredData.length > 0 && (
                            <>
                                <hr />
                                <div className="mt-1 table-responsive ">
                                    <Table className="table table-bordered table-hover tableHeader">
                                        <thead className='tableHeader'>
                                            <tr style={{ fontWeight: 'bold', border: '2px solid black', fontSize: '17px' }}>
                                                <th scope="col" className="text-center">Sr No</th>
                                                <th scope="col" className="text-center">Commodity Id</th>
                                                <th scope="col" className="text-center">Commodity Code</th>
                                                <th scope="col" className="text-center">Commodity Desc</th>
                                                <th scope="col" className="text-center">Status</th>
                                                <th scope="col" className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems2.map((item, index) => (
                                                <tr key={index} className='text-center'>
                                                    <td style={{ textAlign: 'center' }}>{((currentPage2 - 1) * itemsPerPage2) + index + 1}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.commodityId}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.commodityCode}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.commodityDesc}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.status === 'A' ? 'Approved' : ''}</td>
                                                    <td style={{ textAlign: 'center' }}>

                                                        <Button type="button" onClick={() => getData(item.commodityId)} className="" variant="outline-primary" style={{ marginTop: '0px', marginRight: 15 }}>
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </Button>
                                                        <Button type="button" onClick={() => deleteData(item.commodityId)} className="" variant="outline-danger" style={{ marginTop: '0px', marginRight: 15 }}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </Button>
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

                            </>
                        )}
                    </CardBody>
                </Card>
            </div>









            <Modal Modal isOpen={isModalOpenForCommodity} onClose={handleClose} toggle={handleClose} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }}>

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
                        /> Add Commodity Details</h5>
                    )
                        :
                        (
                            <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
                                icon={faEdit}
                                style={{
                                    marginRight: '8px',
                                    color: 'black', // Set the color to golden
                                }}
                            /> Edit Commodity Details</h5>
                        )

                    }

                </ModalHeader>
                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                    <Row>
                        <Col md={4}>
                            <Label style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">Commodity Id</Label>
                            <Input
                                type="text"
                                name="commodityId"
                                id="commodityId"
                                disabled
                                value={formData.commodityId}
                                onChange={handleFormDataChange}
                                className="inputField"
                            />
                        </Col>
                        <Col md={4}>
                            <Label style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">Commodity Code <span style={{ color: 'red' }}>*</span></Label>
                            <Input
                                type="text"
                                name="commodityCode"
                                id="commodityCode"
                                maxLength={150}
                                value={formData.commodityCode}
                                onChange={handleFormDataChange}
                                className="inputField"
                            />
                            <div style={{ color: 'red' }} className="error-message">{formErrors.commodityCode}</div>
                        </Col>
                        <Col md={4}>
                            <Label style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">Commodity Desc <span style={{ color: 'red' }}>*</span></Label>
                            <Input
                                type="text"
                                name="commodityDesc"
                                id="commodityDesc"
                                className="inputField"
                                maxLength={200}
                                value={formData.commodityDesc}
                                onChange={handleFormDataChange}
                            />
                            <div style={{ color: 'red' }} className="error-message">{formErrors.commodityDesc}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Label style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">HSN Code <span style={{ color: 'red' }}>*</span></Label>
                            <Input
                                type="text"
                                name="hsnCode"
                                id="hsnCode"
                                className="inputField"
                                value={formData.hsnCode}
                                maxLength={20}
                                onChange={handleFormDataChange}
                            />
                            <div style={{ color: 'red' }} className="error-message">{formErrors.hsnCode}</div>
                        </Col>
                        <Col md={4}>
                            <Label style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">Status</Label>
                            <Input
                                type="text"
                                name="status"
                                id="status"
                                className="inputField"
                                disabled
                                value={formData.status === 'A' ? 'Approved' : ''}
                                onChange={handleFormDataChange}
                            />
                        </Col>

                    </Row>
                    <hr />
                    <Row className="text-center" style={{ marginTop: 25 }}>
                        <Col>
                            <Button type="button" onClick={handleSave} className="newButton" variant="outline-success" style={{ marginTop: '0px', marginRight: 15 }}>
                                <FontAwesomeIcon icon={faSave} style={{ marginRight: '1px' }} />
                                Submit
                            </Button>
                            {flag === 'add' && (
                                <Button type="button" onClick={handleFormClear} className="newButton" variant="outline-danger" style={{ marginTop: '0px' }}>
                                    <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '1px' }} />
                                    Clear
                                </Button>
                            )}
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>

        </div>
    )
}
