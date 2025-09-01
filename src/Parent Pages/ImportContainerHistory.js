
import AuthContext from '../Components/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import ipaddress from "../Components/IpAddress";
import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts';
import Select from 'react-select';
import { Pagination } from 'react-bootstrap';
import Swal from 'sweetalert2';
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
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faCalendarAlt, faAdd, faCancel, faXmark, faArrowDown, faPlus, faArrowUp, faEdit, faPrint } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import useAxios from '../Components/useAxios';
import { dark } from '@mui/material/styles/createPalette';
import { toast } from 'react-toastify';
import { error } from 'jquery';

export default function ImportContainerHistory({ igm, cont, conList, process, onRequest, inId, igmtrans }) {
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

    const [igmNo, setIgmNo] = useState('');
    const [itemNo, setItemNo] = useState('');
    const [blNo, setBlNo] = useState('');
    const [containerNo, setContainerNo] = useState('');
    const [beNo, setBeNo] = useState('');

    const [headerData, setHeaderData] = useState({});
    const [containerData, setContainerData] = useState([]);
    const [manualContainerData, setManualContainerData] = useState([]);
    const [invoiceData, setInvoiceData] = useState([]);

    const handleClear = () => {
        setIgmNo('');
        setItemNo('');
        setBlNo('');
        setContainerNo('');
        setBeNo('');

        setHeaderData({});
        setContainerData([]);
        setManualContainerData([]);
        setInvoiceData([]);
    }

    const handleSearch = () => {
        if (igmNo === '' && itemNo === '' && blNo === '' && containerNo === '' && beNo === '') {
            toast.error("Please enter at least one search criteria (IGM No, Item No, BL No, Container No, or BE No).", {
                autoClose: 800
            });
            return
        }

        if (igmNo !== '' && itemNo === '' && blNo === '' && containerNo === '' && beNo === '') {
            toast.error("Please enter item no", {
                autoClose: 800
            });
            return
        }

        if (igmNo === '' && itemNo !== '' && blNo === '' && containerNo === '' && beNo === '') {
            toast.error("Please enter igm no", {
                autoClose: 800
            });
            return
        }

        setLoading(true);
        axios.get(`${ipaddress}cfigm/importContainerHistory?cid=${companyid}&bid=${branchId}&igm=${igmNo}&item=${itemNo}&blNo=${blNo}&con=${containerNo}&beNo=${beNo}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setLoading(false);

                const data = response.data;

                toast.success("Data found successfully!!", {
                    autoClose: 800
                })

                const header = data.record1;
                const conData = data.record2;
                const manualGateIn = data.record3;
                const invData = data.record4;

                setHeaderData(header);
                setContainerData(conData);
                setManualContainerData(manualGateIn);
                setInvoiceData(invData);
            })
            .catch((error) => {
                setLoading(false);

                toast.error(error.response.data, {
                    autoClose: 800
                })

                setHeaderData({});
                setContainerData([]);
                setManualContainerData([]);
                setInvoiceData([]);
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
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            IGM No
                        </label>
                        <Input
                            className="form-control"
                            type="text"
                            id="igmNo"
                            name='igmNo'
                            value={igmNo}
                            onChange={(e) => setIgmNo(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Item No
                        </label>
                        <Input
                            className="form-control"
                            type="text"
                            id="itemNo"
                            name='itemNo'
                            value={itemNo}
                            onChange={(e) => setItemNo(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            BL No
                        </label>
                        <Input
                            className="form-control"
                            type="text"
                            id="blNo"
                            name='blNo'
                            value={blNo}
                            onChange={(e) => setBlNo(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Container No
                        </label>
                        <Input
                            className="form-control"
                            type="text"
                            id="containerNo"
                            name='containerNo'
                            value={containerNo}
                            onChange={(e) => setContainerNo(e.target.value)}
                        />
                    </FormGroup>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            BE No
                        </label>
                        <Input
                            className="form-control"
                            type="text"
                            id="beNo"
                            name='beNo'
                            value={beNo}
                            onChange={(e) => setBeNo(e.target.value)}
                        />
                    </FormGroup>

                </Col>

            </Row>
            <Row>

                <Col className='text-center'>
                    <button
                        className="btn btn-outline-primary btn-margin newButton"
                        style={{ marginRight: 10 }}
                        id="submitbtn2"
                        onClick={handleSearch}
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
                        Clear
                    </button>
                </Col>
            </Row>

            {(headerData.length > 0) && (
                <>
                    <div className="mt-3 table-responsive" style={{ fontSize: 14, marginTop: 20, color: 'red' }}>
                        <table className="table table-bordered table-hover tableHeader dynamic-table">
                            <thead className="tableHeader">
                                <tr className="table-header">
                                    <th colSpan={28} scope="col" className="text-center">Header Details</th>

                                </tr>
                                <tr className="table-header">
                                    <th scope="col" className="text-center">IGM No</th>
                                    <th scope="col" className="text-center">IGM Date</th>
                                    <th scope="col" className="text-center">Line No</th>
                                    <th scope="col" className="text-center">BE No</th>
                                    <th scope="col" className="text-center">BE Date</th>
                                    <th scope="col" className="text-center">Cargo Value</th>
                                    <th scope="col" className="text-center">Custom Duty</th>
                                    <th scope="col" className="text-center">BL No</th>
                                    <th scope="col" className="text-center">BL Date</th>
                                    <th scope="col" className="text-center">Profitcentre</th>
                                    <th scope="col" className="text-center">NOP</th>
                                    <th scope="col" className="text-center">Gross Wt</th>
                                    <th scope="col" className="text-center">OOC Date</th>
                                    <th scope="col" className="text-center">Vessel Name</th>
                                    <th scope="col" className="text-center">Via</th>
                                    <th scope="col" className="text-center">DO No</th>
                                    <th scope="col" className="text-center">No Of Container</th>
                                    <th scope="col" className="text-center">Shipping Line</th>
                                    <th scope="col" className="text-center">Consignee</th>
                                    <th scope="col" className="text-center">CHA</th>
                                    <th scope="col" className="text-center">Port</th>
                                    <th scope="col" className="text-center">POL</th>
                                    <th scope="col" className="text-center">Do Date</th>
                                    <th scope="col" className="text-center">Commodity</th>
                                    <th scope="col" className="text-center">Job Order No</th>
                                    <th scope="col" className="text-center">Job Date</th>
                                    <th scope="col" className="text-center">Force Date</th>
                                    <th scope="col" className="text-center">Force Approve By</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{headerData[0]}</td>
                                    <td>{headerData[1]}</td>
                                    <td>{headerData[2]}</td>
                                    <td>{headerData[3]}</td>
                                    <td>{headerData[4]}</td>
                                    <td>{headerData[5]}</td>
                                    <td>{headerData[6]}</td>
                                    <td>{headerData[7]}</td>
                                    <td>{headerData[8]}</td>
                                    <td>{headerData[9]}</td>
                                    <td>{headerData[10]}</td>
                                    <td>{headerData[11]}</td>
                                    <td>{headerData[12]}</td>
                                    <td>{headerData[13]}</td>
                                    <td>{headerData[14]}</td>
                                    <td>{headerData[15]}</td>
                                    <td>{headerData[16]}</td>
                                    <td>{headerData[17]}</td>
                                    <td>{headerData[18]}</td>
                                    <td>{headerData[19]}</td>
                                    <td>{headerData[20]}</td>
                                    <td>{headerData[21]}</td>
                                    <td>{headerData[22]}</td>
                                    <td>{headerData[23]}</td>
                                    <td>{headerData[0]}</td>
                                    <td>{headerData[1]}</td>
                                    <td>{headerData[24]}</td>
                                    <td>{headerData[25]}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-3 table-responsive" style={{ fontSize: 14, marginTop: 20, color: 'red' }}>
                        <table className="table table-bordered table-hover tableHeader dynamic-table">
                            <thead className="tableHeader">
                                <tr className="table-header">
                                    <th colSpan={25} scope="col" className="text-center">Container Details</th>

                                </tr>
                                <tr className="table-header">
                                    <th scope="col" className="text-center">Sr No</th>
                                    <th scope="col" className="text-center">Container No</th>
                                    <th scope="col" className="text-center">Size / Type</th>
                                    <th scope="col" className="text-center">Gate In Date</th>
                                    <th scope="col" className="text-center">Scanner Type</th>
                                    <th scope="col" className="text-center">Scan Status</th>
                                    <th scope="col" className="text-center">Scanner Date</th>
                                    <th scope="col" className="text-center">NOP</th>
                                    <th scope="col" className="text-center">Exam(%)</th>
                                    <th scope="col" className="text-center">Cargo Wt.</th>
                                    <th scope="col" className="text-center">Type Of Container</th>
                                    <th scope="col" className="text-center">Seal Cut Date</th>
                                    <th scope="col" className="text-center">Exam Date</th>
                                    <th scope="col" className="text-center">Gate Out Type</th>
                                    <th scope="col" className="text-center">Gate Pass Id</th>
                                    <th scope="col" className="text-center">Gate Pass Date</th>
                                    <th scope="col" className="text-center">Gate Out Date</th>
                                    <th scope="col" className="text-center">Destuff Id</th>
                                    <th scope="col" className="text-center">Destuff Date</th>
                                    <th scope="col" className="text-center">Empty Gate Pass Id</th>
                                    <th scope="col" className="text-center">Empty Gate Pass Date</th>
                                    <th scope="col" className="text-center">Empty Gate Out Id</th>
                                    <th scope="col" className="text-center">Empty gate Out Date</th>
                                    <th scope="col" className="text-center">IGM/Scan Hold</th>
                                    <th scope="col" className="text-center">Custom Hold</th>
                                </tr>
                            </thead>
                            <tbody>
                                {containerData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item[0]}</td>
                                        <td>{item[1]}{item[2]}</td>
                                        <td>{item[3]}</td>
                                        <td>{item[4]}</td>
                                        <td>{item[5]}</td>
                                        <td>{item[6]}</td>
                                        <td>{item[7]}</td>
                                        <td>{item[8]}</td>
                                        <td>{item[9]}</td>
                                        <td>{item[10]}</td>
                                        <td>{item[11]}</td>
                                        <td>{item[12]}</td>
                                        <td>{item[13]}</td>
                                        <td>{item[14]}</td>
                                        <td>{item[15]}</td>
                                        <td>{item[16]}</td>
                                        <td>{item[17]}</td>
                                        <td>{item[18]}</td>
                                        <td>{item[19]}</td>
                                        <td>{item[20]}</td>
                                        <td>{item[21]}</td>
                                        <td>{item[22]}</td>
                                        <td>{item[23] === 'H' ? 'Hold' : ''}</td>
                                        <td>{item[23] === 'H' ? 'Hold' : ''}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-3 table-responsive" style={{ fontSize: 14, marginTop: 20, color: 'red' }}>
                        <table className="table table-bordered table-hover tableHeader dynamic-table">
                            <thead className="tableHeader">
                                <tr className="table-header">
                                    <th colSpan={3} scope="col" className="text-center">Manual Container Gatein Details</th>

                                </tr>
                                <tr className="table-header">
                                    <th scope="col" className="text-center">Sr No</th>
                                    <th scope="col" className="text-center">Gate In Id</th>
                                    <th scope="col" className="text-center">Gate In Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {manualContainerData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item[0]}</td>
                                        <td>{item[1]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-3 table-responsive" style={{ fontSize: 14, marginTop: 20, color: 'red' }}>
                        <table className="table table-bordered table-hover tableHeader dynamic-table">
                            <thead className="tableHeader">
                                <tr className="table-header">
                                    <th colSpan={3} scope="col" className="text-center">Invoice & Payment Details</th>

                                </tr>
                                <tr className="table-header">
                                    <th scope="col" className="text-center">Sr No</th>
                                    <th scope="col" className="text-center">Invoice No</th>
                                    <th scope="col" className="text-center">Invoice Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoiceData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item[0]}</td>
                                        <td>{item[1]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

        </div>
    )
}
