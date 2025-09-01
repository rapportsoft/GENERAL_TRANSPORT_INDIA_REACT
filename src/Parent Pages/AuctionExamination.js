import AuthContext from "../Components/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreatableSelect from 'react-select/creatable';
import {
    faSearch,
    faRefresh,
    faSave,
    faCalendarAlt,
    faAdd,
    faPrint,
    faTruck,
    faBraille,
    faTicket,
    faTruckFast,
    faLocation,
    faXmark,
    faPlus,
    faTrash,
    faGavel,
    faPercent,
    faHandHoldingDollar,
    faFileContract,
    faShieldAlt,
    faStamp,
    faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/style.css";
import "../Components/Style.css";
import useAxios from "../Components/useAxios";
import CFSService from "../service/CFSService";
import { toast } from "react-toastify";
import moment from "moment";
import ipaddress from "../Components/IpAddress";
import {
    Card,
    CardBody,
    Row,
    Col,
    FormGroup,
    Modal,
    ModalHeader,
    ModalBody,
    Input,
    FormFeedback,
    Table,
    Label,
} from "reactstrap";
import { Button, Pagination } from "react-bootstrap";
import { format } from "date-fns";
import { CatchingPokemonSharp } from "@mui/icons-material";
import Swal from "sweetalert2";
import { error } from "jquery";

export default function AuctionExamination({ igm, igmLineNo, igmTrans, blNo, id1, id2, id3, acttab, listOfData, flag, onRequest, aucData, searchFlag }) {
    const navigate = useNavigate();
    const axios = useAxios();
    const { isAuthenticated } = useContext(AuthContext);

    // If the user is not authenticated, redirect to the login page
    useEffect(() => {
        if (!isAuthenticated) {
            navigate(
                "/login?message=You need to be authenticated to access this page."
            );
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
        userRights,
    } = useContext(AuthContext);

    const styles = {
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
        },
    };

    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        gateNoOut: "",
    });

    const queryParams = new URLSearchParams(location.search);
    const processId = queryParams.get("process_id");

    const foundRights =
        role !== "ROLE_ADMIN"
            ? userRights.find((item) => item.process_Id === processId)
            : null;
    const allowCreate = foundRights?.allow_Create === "Y";
    const allowRead = foundRights?.allow_Read === "Y";
    const allowEdit = foundRights?.allow_Update === "Y";
    const allowDelete = foundRights?.allow_Delete === "Y";

    const [examinationType, setExaminationType] = useState('');
    const [auctionData, setAuctionData] = useState([]);
    const [auctionData1, setAuctionData1] = useState([]);

    const handleExaminationChange = (e) => {

        const value = e.target.value;

        if (value === '') {
            setAuctionData([]);
            setAuctionData1([]);
            setSelectedItems([]);
        }
        else {
            if (value === 'Container') {
                getContainerData();
            }
            else if (value === 'Cargo') {
                getCargoData();
            }
        }

        setExaminationType(value);
    }


    const getContainerData = () => {
        setLoading(true);
        try {
            axios.get(`${ipaddress}auctionExamination/getAuctionContainerWiseData?cid=${companyid}&bid=${branchId}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            })
                .then((response) => {
                    setAuctionData(response.data);
                    setAuctionData1(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    setAuctionData([]);
                    setAuctionData1([]);
                    setLoading(false);
                })
        } catch (error) {
            setLoading(false);
        }
    }

    const getCargoData = () => {
        setLoading(true);
        try {
            axios.get(`${ipaddress}auctionExamination/getAuctionCargoWiseData?cid=${companyid}&bid=${branchId}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            })
                .then((response) => {
                    setAuctionData(response.data);
                    setAuctionData1(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    setAuctionData([]);
                    setAuctionData1([]);
                    setLoading(false);
                })
        } catch (error) {
            setLoading(false);
        }
    }

    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckboxChange = (item) => {
        setSelectedItems((prevSelected) => {
            // Check if the item is already selected
            const isAlreadySelected = prevSelected.some(selected => selected[3] === item[3]); // Assuming containerNo (item[3]) is unique

            if (isAlreadySelected) {
                // Remove item if already selected
                return prevSelected.filter(selected => selected[3] !== item[3]);
            } else {
                // Add item if not selected
                return [...prevSelected, item];
            }
        });
    };

    const handleSaveContainerWise = () => {

        try {
            setLoading(true);
            axios.post(`${ipaddress}auctionExamination/saveContainerTypeData?cid=${companyid}&bid=${branchId}`, selectedItems, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            })
                .then((response) => {

                    setLoading(false);

                    const data = response.data;

                    toast.success("Data Update Successfully!!!", {
                        autoClose: 800
                    })

                    setAuctionData(data);
                    setSelectedItems([]);
                    setAuctionData1(data);
                    setSearchTerm1('');
                })
                .catch((error) => {
                    setLoading(false);
                })

        } catch (error) {
            setLoading(false);
        }
    }


    const handleSaveCargoWise = () => {

        try {
            setLoading(true);
            axios.post(`${ipaddress}auctionExamination/saveCargoTypeData?cid=${companyid}&bid=${branchId}`, selectedItems, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            })
                .then((response) => {

                    setLoading(false);

                    const data = response.data;

                    toast.success("Data Update Successfully!!!", {
                        autoClose: 800
                    })

                    setAuctionData(data);
                    setSelectedItems([]);
                    setAuctionData1(data);
                    setSearchTerm1('');
                })
                .catch((error) => {
                    setLoading(false);
                })

        } catch (error) {
            setLoading(false);
        }
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = auctionData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(auctionData.length / itemsPerPage);

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


    const [searchTerm1, setSearchTerm1] = useState("");


    const searchPendingData = (id) => {

        setSearchTerm1(id);

        const filteredParties = auctionData1.filter(ticket =>
            ticket[1].toLowerCase().includes(id.toLowerCase()) ||
            ticket[2].toLowerCase().includes(id.toLowerCase()) ||
            ticket[3].toLowerCase().includes(id.toLowerCase())
        );

        setAuctionData(filteredParties);

    }

    const searchPendingData1 = (id) => {

        setSearchTerm1(id);

        const filteredParties = auctionData1.filter(ticket =>
            ticket[3].toLowerCase().includes(id.toLowerCase()) ||
            ticket[4].toLowerCase().includes(id.toLowerCase()) ||
            ticket[5].toLowerCase().includes(id.toLowerCase())
        );

        setAuctionData(filteredParties);

    }

    return (
        <div>
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


            <Row>
                <Col md={3}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="examinationType">Examination Type</label>
                        <Input
                            className="form-control"
                            type="select"
                            id="examinationType"
                            name='examinationType'
                            value={examinationType}
                            onChange={handleExaminationChange}
                        >
                            <option value=""></option>
                            <option value="Cargo">Cargo Status</option>
                            <option value="Container">Container Status</option>
                        </Input>
                    </FormGroup>
                </Col>
                {examinationType === 'Container' && (
                    <>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="examinationType">Search By Container No/Size/Type</label>
                                <Input
                                    className="form-control"
                                    type="text"
                                    id="searchTerm1"
                                    name='searchTerm1'
                                    value={searchTerm1}
                                    onChange={(e) => searchPendingData1(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={5} className="text-end">
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                id="submitbtn2"
                                style={{ fontSize: 13, marginRight: 5, marginTop: 22 }}
                                onClick={handleSaveContainerWise}
                            >
                                <FontAwesomeIcon
                                    icon={faSave}
                                    style={{ marginRight: "3px" }}
                                />
                                Save
                            </button>
                        </Col>
                    </>
                )}

                {examinationType === 'Cargo' && (
                    <>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="examinationType">Search By IGM No/IGM Line No/Importer Name</label>
                                <Input
                                    className="form-control"
                                    type="text"
                                    id="searchTerm1"
                                    name='searchTerm1'
                                    value={searchTerm1}
                                    onChange={(e) => searchPendingData(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={5} className="text-end">

                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                id="submitbtn2"
                                style={{ fontSize: 13, marginRight: 5, marginTop: 22 }}
                                onClick={handleSaveCargoWise}
                            >
                                <FontAwesomeIcon
                                    icon={faSave}
                                    style={{ marginRight: "3px" }}
                                />
                                Save
                            </button>
                        </Col>
                    </>
                )}
            </Row>


            {(examinationType === 'Container') && (
                <div className="mt-3 table-responsive">
                    <table className="table table-bordered table-hover tableHeader">
                        <thead className="tableHeader">
                            <tr className="text-center">
                                <th scope="col">Container No</th>
                                <th scope="col">Size / Type</th>
                                <th scope="col">Status</th>
                                <th scope="col">Container Location</th>
                                <th scope="col">Gate In Date</th>
                                <th scope="col">Hold Status</th>
                                <th scope="col">Hold Date</th>
                                <th scope="col">Release Date</th>
                                <th scope="col">Exam Status</th>
                                <th scope="col">Notice Generated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? (
                                <>
                                    {auctionData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item[3]}</td>
                                            <td>{item[4]}{item[5]}</td>
                                            <td>{item[6]}</td>
                                            <td>{item[7]}-{item[8]}-{item[9]}</td>
                                            <td>{item[10]}</td>
                                            <td>{item[11] === 'H' ? 'Hold' : item[11] === 'R' ? 'Release' : ''}</td>
                                            <td>{item[12]}</td>
                                            <td>{item[13]}</td>
                                            <td>
                                                <Input
                                                    className="form-control"
                                                    type="checkbox"
                                                    id="check"
                                                    name='check'
                                                    disabled={item[14] === 'B'}
                                                    checked={selectedItems.some(selected => selected[3] === item[3]) || item[14] === 'B'} // Check if already selected
                                                    onChange={() => handleCheckboxChange(item)}
                                                    style={{ borderColor: 'black' }}
                                                />
                                            </td>
                                            <td>{item[15] === 'P' ? 'First' : item[15] === 'S' ? 'Seconde' : item[15] === 'F' ? 'Final' : ''}</td>
                                        </tr>
                                    ))

                                    }
                                </>
                            )
                                :
                                (
                                    <tr>
                                        <td colSpan={10}>No Records Found</td>

                                    </tr>
                                )}
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
            )}



            {(examinationType === 'Cargo') && (
                <div className="mt-3 table-responsive">
                    <table className="table table-bordered table-hover tableHeader">
                        <thead className="tableHeader">
                            <tr className="text-center">
                                <th scope="col">IGM No</th>
                                <th scope="col">IGM Line No</th>
                                <th scope="col">Importer Name</th>
                                <th scope="col">Commodity Desc</th>
                                <th scope="col">Gate In Date</th>
                                <th scope="col">Hold Status</th>
                                <th scope="col">Hold Date</th>
                                <th scope="col">Release Date</th>
                                <th scope="col">Exam Status</th>
                                <th scope="col">Notice Generated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? (
                                <>
                                    {auctionData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item[1]}</td>
                                            <td>{item[2]}</td>
                                            <td>{item[3]}</td>
                                            <td>{item[4]}</td>
                                            <td>{item[5]}</td>
                                            <td>{item[6] === 'H' ? 'Hold' : item[6] === 'R' ? 'Release' : ''}</td>
                                            <td>{item[7]}</td>
                                            <td>{item[8]}</td>
                                            <td>
                                                <Input
                                                    className="form-control"
                                                    type="checkbox"
                                                    id="check"
                                                    name='check'
                                                    disabled={item[9] === 'B'}
                                                    checked={selectedItems.some(selected => ((selected[0] === item[0]) && (selected[1] === item[1]) && (selected[2] === item[2]))) || item[9] === 'B'} // Check if already selected
                                                    onChange={() => handleCheckboxChange(item)}
                                                    style={{ borderColor: 'black' }}
                                                />
                                            </td>
                                            <td>{item[10] === 'P' ? 'First' : item[10] === 'S' ? 'Seconde' : item[10] === 'F' ? 'Final' : ''}</td>
                                        </tr>
                                    ))

                                    }
                                </>
                            )
                                :
                                (
                                    <tr>
                                        <td colSpan={10}>No Records Found</td>

                                    </tr>
                                )}
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
            )}
        </div>
    )
}
