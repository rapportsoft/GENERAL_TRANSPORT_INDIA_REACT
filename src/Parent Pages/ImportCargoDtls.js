
import AuthContext from '../Components/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import ipaddress from "../Components/IpAddress";
import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts';
import Select from 'react-select';
import { Pagination } from 'react-bootstrap';
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
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faCalendarAlt, faAdd, faFileImport } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import useAxios from '../Components/useAxios';
import { dark } from '@mui/material/styles/createPalette';
import { toast } from 'react-toastify';

export default function ImportCargoDtls() {
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
    const [igmData, setIgmData] = useState(location.state?.igmData);
    const [flag, setFlag] = useState(location.state?.flag);
    const [profitCenterData, setprofitCenterData] = useState(location.state?.profitCenterData);
    const [packages, setpackages] = useState([]);

    const getTypeOfPack = () => {
        const id = 'J00060';
        axios.get(`${ipaddress}jardetail/getJarDetail?companyId=${companyid}&jarId=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setpackages(response.data);
            })
            .catch((error) => {

            })
    }

    useEffect(() => {
        getTypeOfPack();
    }, [])

    const [igmCrgData, setIgmCrgData] = useState({
        companyId: '',
        branchId: '',
        finYear: '',
        igmTransId: '',
        profitcentreId: '',
        igmLineNo: '',
        igmNo: '',
        cycle: 'IMP',
        viaNo: '',
        blNo: '',
        blDate: null,
        cargoMovement: '',
        sampleQty: 0,
        importerId: '',
        importerName: '',
        importerAddress1: '',
        importerAddress2: '',
        importerAddress3: '',
        notifyPartyId: '',
        notifyPartyName: '',
        notifiedAddress1: '',
        notifiedAddress2: '',
        notifiedAddress3: '',
        oldImporterName: '',
        oldImporterAddress1: '',
        oldImporterAddress2: '',
        oldImporterAddress3: '',
        origin: '',
        destination: '',
        commodityDescription: '',
        commodityCode: '',
        areaUsed: 0,
        noOfPackages: 0,
        qtyTakenOut: 0,
        qtyTakenOutWeight: 0,
        grossWeight: 0,
        weighmentWeight: 0,
        unitOfWeight: '',
        typeOfPackage: '',
        cargoType: '',
        imoCode: '',
        unNo: '',
        dataInputStatus: '',
        entryStatus: '',
        actualNoOfPackages: 0,
        damagedNoOfPackages: 0,
        gainLossPackage: '0',
        yardLocation: '',
        yardBlock: '',
        blockCellNo: '',
        noOfDestuffContainers: 0,
        noOfContainers: 0,
        examTallyId: '',
        examTallyDate: null,
        blTariffNo: '',
        destuffId: '',
        destuffCharges: 0,
        destuffDate: null,
        cargoValue: 0,
        cargoDuty: 0,
        gateOutNo: '',
        gateOutDate: null,
        marksOfNumbers: '',
        holdingAgent: '',
        holdingAgentName: '',
        holdDate: null,
        releaseDate: null,
        holdRemarks: '',
        holdStatus: '',
        releaseAgent: '',
        releaseRemarks: '',
        noticeId: '',
        noticeType: '',
        noticeDate: null,
        auctionStatus: 'N',
        status: '',
        customerId: '',
        blUpdaterUser: '',
        blUpdaterFlag: 'N',
        blUpdaterDate: null,
        blReportUser: '',
        blReportFlag: 'N',
        blReportDate: null,
        createdBy: '',
        createdDate: null,
        editedBy: '',
        editedDate: null,
        approvedBy: '',
        approvedDate: null,
        hazReeferRemarks: '',
        crgAllowFlag: 'N',
        othPartyId: '',
        mergeStatus: '',
        mergeCreatedDate: null,
        mergeCreatedBy: '',
        mergeApprovedBy: '',
        mergeApprovedDate: null,
        oldLineNo: '',
        riskStatus: 'N',
        riskStatusBy: '',
        riskStatusDate: null,
        smtpFlag: 'N',
        smtpStatusBy: '',
        smtpStatusDate: null,
        newFwdId: '',
        primaryItem: 'Y',
        igmSendStatus: 'N',
        igmSendDate: null,
        partDeStuffId: '',
        partDeStuffDate: null,
        igmImporterName: '',
        igmImporterAddress1: '',
        igmImporterAddress2: '',
        igmImporterAddress3: ''
    });

    const handleIgmCrgChange = (e) => {
        const { name, value } = e.target;
        setIgmCrgData(prevState => ({
            ...prevState,
            [name]: value
        }));

    };

    const handleBLDate = (date) =>{
        setIgmCrgData({
            ...igmCrgData,
            blDate: date
        })
    }

    const [igmCnData, setIgmCnData] = useState([{
        companyId: '',
        branchId: '',
        finYear: '',
        igmTransId: '',
        profitcentreId: '',
        igmNo: '',
        igmLineNo: '',
        containerNo: '',
        viaNo: '',
        cycle: 'IMP',
        cycleUpdatedBy: '',
        cycleUpdatedDate: '',
        containerSize: '',
        containerType: '',
        haz: 'N',
        hazClass: '',
        typeOfContainer: '',
        oldTypeOfContainer: '',
        overDimension: 'N',
        shift: '',
        iso: '',
        internalShifting: 'N',
        beNo: '',
        beDate: '',
        containerWeight: 0.00,
        containerStatus: '',
        containerSealNo: '',
        customsSealNo: '',
        dataInputStatus: ' ',
        entryStatus: '',
        customsSample: '',
        customsSampleDate: '',
        scannerType: '',
        reExport: 'N',
        extraTransport: 'N',
        extraTransportDate: '',
        fumigation: 'N',
        fumigationDate: '',
        movementReqId: '',
        sealCuttingType: '',
        cargoValue: 0.000,
        cargoDuty: 0.000,
        blStatus: '',
        marketingPerson: '',
        movementType: '',
        sealCutTransId: '',
        containerExamStatus: '',
        sealCutReqDate: '',
        containerExamDate: '',
        mobileNo: '',
        sealCutRemarks: '',
        containerExamRemarks: '',
        actualNoOfPackages: 0,
        damagedNoOfPackages: 0,
        yardLocation: '',
        yardBlock: '',
        blockCellNo: '',
        yardLocation1: '',
        yardBlock1: '',
        blockCellNo1: '',
        blTariffNo: '',
        deStuffId: '',
        typeOfCargo: '',
        destuffStatus: 'N',
        deStuffDate: '',
        doEntryFlag: 'N',
        doEntryDate: '',
        forceEntryFlag: 'N',
        forceEntryDate: '',
        nocIssuedBy: '',
        nocIssuedDate: '',
        icdFlag: 'N',
        icdPlace: '',
        icdDate: '',
        deliveryDate: '',
        accountingDate: '',
        railReservationDate: '',
        transporterId: '',
        handOverTo: '',
        handOverDate: '',
        raContractNo: '',
        raContractDate: '',
        noOfCoils: 0,
        noOfCoilBundles: 0,
        noOfLooseCoils: 0,
        unstuffingDoneFlag: 'N',
        unstuffingType: 'N',
        lastChangedOn: '',
        lastChangedBy: ''
    }
    ])

    const [chaData, setChaData] = useState([]);


    const getChaData = (val) => {
        if (val === '') {
            setChaData([]);
            return;
        }

        axios.get(`${ipaddress}party/getCha?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const portOptions = data.map(port => ({
                    value: port[0],
                    label: port[1],
                    code: port[2]
                }))
                setChaData(portOptions);
            })
            .catch((error) => {

            })
    }

    const [forwarderData, setForwarderData] = useState([]);
    const getFwdData = (val) => {
        if (val === '') {
            setForwarderData([]);
            return;
        }

        axios.get(`${ipaddress}party/getAll?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const portOptions = data.map(port => ({
                    value: port[0],
                    label: port[1],
                    code: port[2]
                }))
                setForwarderData(portOptions);
            })
            .catch((error) => {

            })
    }

    const [chaId, setChaId] = useState('');
    const [chaName, setChaName] = useState('');

    const handleCHAChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setChaName('');
            setChaId('');
        }
        else {
            setChaName(selectedOption ? selectedOption.label : '');
            setChaId(selectedOption ? selectedOption.value : '');
        }
    };



    const [fwdId, setfwdId] = useState('');
    const [fwdName, setfwdName] = useState('');

    const handleFWDChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setfwdName('');
            setfwdId('');
        }
        else {
            setfwdName(selectedOption ? selectedOption.label : '');
            setfwdId(selectedOption ? selectedOption.value : '');
        }
    };

    const [isModalOpenForImp, setIsModalOpenForimp] = useState(false);

    const handleOpenImp = (val) => {
        setIsModalOpenForimp(true);
        searchIGM('');
    }


    const handleCloseImp = (val) => {
        setIsModalOpenForimp(false);
        setIgmSearchId('');
        setIgmSearchedData([]);
    }






    const [igmSearchId, setIgmSearchId] = useState('');
    const [igmSearchedData, setIgmSearchedData] = useState([]);

    const searchIGM = (id) => {
        setLoading(true);
        axios.get(`${ipaddress}party/getImp?cid=${companyid}&bid=${branchId}&search=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setIgmSearchedData(response.data);
                setLoading(false);
                setCurrentPage(1);
            })
            .catch((error) => {
                setLoading(false);
            })
    }


    const clearSearch = () => {
        setIgmSearchId('');
        searchIGM('');
    }

    const selectIGMSearchRadio = (id, name, ad1, ad2, ad3) => {
        igmCrgData.importerId = id;
        igmCrgData.importerName = name;
        igmCrgData.importerAddress1 = ad1;
        igmCrgData.importerAddress2 = ad2;
        igmCrgData.importerAddress3 = ad3;
        handleCloseImp();
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = igmSearchedData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(igmSearchedData.length / itemsPerPage);

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


    const [isModalOpenForImp1, setIsModalOpenForimp1] = useState(false);

    const handleOpenImp1 = (val) => {
        setIsModalOpenForimp1(true);
        searchIGM1('');
    }


    const handleCloseImp1 = (val) => {
        setIsModalOpenForimp1(false);
        setIgmSearchId1('');
        setIgmSearchedData1([]);
    }



    const [igmSearchId1, setIgmSearchId1] = useState('');
    const [igmSearchedData1, setIgmSearchedData1] = useState([]);

    const searchIGM1 = (id) => {
        setLoading(true);
        axios.get(`${ipaddress}party/getImp?cid=${companyid}&bid=${branchId}&search=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setIgmSearchedData1(response.data);
                setLoading(false);
                setCurrentPage1(1);
            })
            .catch((error) => {
                setLoading(false);
            })
    }


    const clearSearch1 = () => {
        setIgmSearchId1('');
        searchIGM1('');
    }

    const selectIGMSearchRadio1 = (id, name, ad1, ad2, ad3) => {
        igmCrgData.notifyPartyId = id;
        igmCrgData.notifyPartyName = name;
        igmCrgData.notifiedAddress1 = ad1;
        igmCrgData.notifiedAddress2 = ad2;
        igmCrgData.notifiedAddress3 = ad3;
        handleCloseImp1();
    }

    const [currentPage1, setCurrentPage1] = useState(1);
    const [itemsPerPage1] = useState(5);

    const indexOfLastItem1 = currentPage1 * itemsPerPage1;
    const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
    const currentItems1 = igmSearchedData1.slice(indexOfFirstItem1, indexOfLastItem1);
    const totalPages1 = Math.ceil(igmSearchedData1.length / itemsPerPage1);

    // Function to handle page change
    const handlePageChange1 = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage1(page);
        }
    };
    const displayPages1 = () => {
        const centerPageCount = 5;
        const middlePage = Math.floor(centerPageCount / 2);
        let startPage = currentPage1 - middlePage;
        let endPage = currentPage1 + middlePage;

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


    return (
        <div className='container'>
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
                icon={faFileImport}
                style={{
                    marginRight: '8px',
                    color: 'black', // Set the color to golden
                }}
            />Import Document Cargo Details</h5>
            <Card>
                <CardBody>
                    <div >
                        <div>
                            <Row>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Container No
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="fobValueInDollar"
                                            maxLength={15}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={3} style={{ marginTop: 25 }}>
                                    <button
                                        className="btn btn-outline-primary btn-margin newButton"
                                        style={{ marginRight: 10 }}
                                        id="submitbtn2"
                                    >
                                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                        Search
                                    </button>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            IGM Trans Id
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="fobValueInDollar"
                                            maxLength={15}
                                            readOnly
                                            value={igmData.igmTransId}
                                            style={{ backgroundColor: '#E0E0E0' }}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            DOC Date
                                        </label>
                                        <div style={{ position: 'relative' }}>
                                            <DatePicker
                                                selected={igmData.docDate}
                                                id="sbDate"
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control"
                                                disabled
                                                style={{ backgroundColor: '#E0E0E0' }}
                                                wrapperClassName="custom-react-datepicker-wrapper"
                                                customInput={
                                                    <input
                                                        style={{
                                                            height: "38px",
                                                            width: "100%",
                                                        }}
                                                    />

                                                }

                                            />
                                            <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                        </div>

                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            IGM No
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            value={igmData.igmNo}
                                            id="fobValueInDollar"
                                            maxLength={15}
                                            readOnly
                                            style={{ backgroundColor: '#E0E0E0' }}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Status
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="fobValueInDollar"
                                            value={igmCrgData.status}
                                            readOnly
                                            style={{ backgroundColor: '#E0E0E0' }}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            IGM Date
                                        </label>
                                        <div style={{ position: 'relative' }}>
                                            <DatePicker
                                                selected={igmData.igmDate}
                                                id="sbDate"
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control"
                                                disabled
                                                style={{ backgroundColor: '#E0E0E0' }}
                                                wrapperClassName="custom-react-datepicker-wrapper"
                                                customInput={
                                                    <input
                                                        style={{
                                                            height: "38px",
                                                            width: "100%",
                                                        }}
                                                    />

                                                }

                                            />
                                            <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            VIA No
                                        </label>
                                        <Input
                                            value={igmData.viaNo}
                                            className="form-control"
                                            type="text"
                                            id="fobValueInDollar"
                                            maxLength={15}
                                            readOnly
                                            style={{ backgroundColor: '#E0E0E0' }}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Profitcentre
                                        </label>
                                        <Input
                                            value={profitCenterData.profitcentreDesc}
                                            className="form-control"
                                            type="text"
                                            id="fobValueInDollar"
                                            maxLength={15}
                                            readOnly
                                            style={{ backgroundColor: '#E0E0E0' }}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Created By
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="fobValueInDollar"
                                            value={igmCrgData.createdBy}
                                            readOnly
                                            style={{ backgroundColor: '#E0E0E0' }}
                                        />
                                    </FormGroup>
                                </Col>

                            </Row>
                            <Row>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Cycle type / IGM Line No <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Row>
                                            <Col md={6}>
                                                <Input
                                                    className="form-control"
                                                    type="select"
                                                    id="cycle"
                                                    name='cycle'
                                                    value={igmCrgData.cycle}
                                                    onChange={handleIgmCrgChange}
                                                >
                                                    <option value="IMP">IMP</option>
                                                    <option value="DPD">DPD</option>
                                                    <option value="FREE_HAND">FREE_HAND</option>
                                                    <option value="REQUEST">REQUEST</option>
                                                </Input>
                                            </Col>
                                            <Col md={6}>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    id="igmLineNo"
                                                    onChange={handleIgmCrgChange}
                                                    name='igmLineNo'
                                                    maxLength={7}
                                                    value={igmCrgData.igmLineNo}
                                                />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            BL No<span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="blNo"
                                            name='blNo'
                                            onChange={handleIgmCrgChange}
                                            value={igmCrgData.blNo}
                                            maxLength={20}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            BL Date<span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <div style={{ position: 'relative' }}>
                                            <DatePicker
                                                selected={igmCrgData.blDate}
                                                id="blDate"
                                                onChange={handleBLDate}
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control"
                                                name="blDate"
                                                wrapperClassName="custom-react-datepicker-wrapper"
                                                customInput={
                                                    <input
                                                        style={{
                                                            height: "38px",
                                                            width: "100%",
                                                        }}
                                                    />

                                                }

                                            />
                                            <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Approved By
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="approvedBy"
                                            name='approvedBy'
                                            value={igmCrgData.approvedBy}
                                            readOnly
                                            style={{ backgroundColor: '#E0E0E0' }}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="commodity">
                                            Commodity<span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="textarea"
                                            id="commodityDescription"
                                            name='commodityDescription'
                                            style={{ height: '120px' }}
                                            onChange={handleIgmCrgChange}
                                            value={igmCrgData.commodityDescription}
                                            rowspan={2}
                                            maxLength={250}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col md={4}>
                                            <FormGroup>
                                                <label className="forlabel bold-label" htmlFor="cargoMovement1">
                                                    Cargo Movement<span style={{ color: 'red' }}>*</span>
                                                </label>
                                                <Input
                                                    className="form-control"
                                                    type="select"
                                                    id="cargoMovement"
                                                    onChange={handleIgmCrgChange}
                                                    name='cargoMovement'
                                                    value={igmCrgData.cargoMovement}
                                                >
                                                    <option value="">Select Cargo Movement</option>
                                                    <option value="Local Cargo">Local Cargo</option>
                                                    <option value="Transhipment to ICD-SMTP">Transhipment to ICD-SMTP</option>
                                                    <option value="Transhipment Cargo">Transhipment Cargo</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <label className="forlabel bold-label" htmlFor="cargoWeight1">
                                                    Cargo Weight<span style={{ color: 'red' }}>*</span>
                                                </label>
                                                <Input
                                                    className="form-control"
                                                    type="number"
                                                    id="grossWeight"
                                                    onChange={handleIgmCrgChange}
                                                    name='grossWeight'
                                                    value={igmCrgData.grossWeight}

                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <label className="forlabel bold-label" htmlFor="cargoWeight2">
                                                    No Of Packges<span style={{ color: 'red' }}>*</span>
                                                </label>
                                                <Input
                                                    className="form-control"
                                                    type="number"
                                                    id="noOfPackages"
                                                    onChange={handleIgmCrgChange}
                                                    name='noOfPackages'
                                                    value={igmCrgData.noOfPackages}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>
                                            <FormGroup>
                                                <label className="forlabel bold-label" htmlFor="cargoWeight4">
                                                    Cargo Type
                                                </label>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    id="cargoType"
                                                    value={igmCrgData.cargoType}
                                                    name='cargoType'
                                                    onChange={handleIgmCrgChange}
                                                >
                                                    <option value="Non Agro">Non Agro</option>
                                                    <option value="Agro">Agro</option>
                                                    <option value="Haz">Haz</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <label className="forlabel bold-label" htmlFor="cargoWeight3">
                                                    Unit Weight<span style={{ color: 'red' }}>*</span>
                                                </label>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    id="unitOfWeight"
                                                    onChange={handleIgmCrgChange}
                                                    name='unitOfWeight'
                                                    value={igmCrgData.unitOfWeight}
                                                    maxLength={3}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <label className="forlabel bold-label" htmlFor="cargoWeight4">
                                                    Type Of Package<span style={{ color: 'red' }}>*</span>
                                                </label>
                                                <Input
                                                    className="form-control"
                                                    type="select"
                                                    id="typeOfPackage"
                                                    onChange={handleIgmCrgChange}
                                                    name='typeOfPackage'
                                                    value={igmCrgData.typeOfPackage}
                                                >
                                                    <option value="">Selet Type Of Package</option>
                                                    {packages.map((item, index) => (
                                                        <option key={index} value={item[0]}>{item[1]}</option>
                                                    ))}
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="commodity">
                                            Marks & Numbers
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="textarea"
                                            id="marksOfNumbers"
                                            name='marksOfNumbers'
                                            onChange={handleIgmCrgChange}
                                            style={{ height: '120px' }}
                                            value={igmCrgData.marksOfNumbers}
                                            rowspan={2}
                                            maxLength={250}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col md={4}>
                                            <FormGroup>
                                                <label className="forlabel bold-label" htmlFor="cargoMovement1">
                                                    Account Holder
                                                </label>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    id="cargoMovement1"
                                                    maxLength={15}

                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <label className="forlabel bold-label" htmlFor="cargoWeight1">
                                                    Importer Name<span style={{ color: 'red' }}>*</span>
                                                </label>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    id="importerName"
                                                    name='importerName'
                                                    readOnly
                                                    value={igmCrgData.importerName}
                                                    style={{ backgroundColor: '#E0E0E0' }}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={1} style={{ marginTop: 24 }}>
                                            <button
                                                className="btn btn-outline-primary btn-margin newButton"
                                                style={{ marginRight: 10 }}
                                                id="submitbtn2"
                                                onClick={handleOpenImp}
                                            >
                                                <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                            </button>
                                        </Col>
                                        <Modal Modal isOpen={isModalOpenForImp} onClose={handleCloseImp} toggle={handleCloseImp} style={{ maxWidth: '700px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                                            <ModalHeader toggle={handleCloseImp} style={{
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
                                                    icon={faSearch}
                                                    style={{
                                                        marginRight: '8px',
                                                        color: 'white', // Set the color to golden
                                                    }}
                                                /> Search Importer</h5>



                                            </ModalHeader>
                                            <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                                                <Row>
                                                    <Col md={6}>
                                                        <FormGroup>
                                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                                Search by Party Name
                                                            </label>
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                id="igmTransId"
                                                                maxLength={15}
                                                                name='igmTransId'
                                                                value={igmSearchId}
                                                                onChange={(e) => setIgmSearchId(e.target.value)}
                                                            />

                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6} style={{ marginTop: 24 }}>
                                                        <button
                                                            className="btn btn-outline-primary btn-margin newButton"
                                                            style={{ marginRight: 10 }}
                                                            id="submitbtn2"
                                                            onClick={() => searchIGM(igmSearchId)}
                                                        >
                                                            <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                                            Search
                                                        </button>
                                                        <button
                                                            className="btn btn-outline-danger btn-margin newButton"
                                                            style={{ marginRight: 10 }}
                                                            id="submitbtn2"
                                                            onClick={clearSearch}
                                                        >
                                                            <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                                            Reset
                                                        </button>
                                                    </Col>
                                                </Row>
                                                <hr />
                                                <div className="mt-1 table-responsive ">
                                                    <table className="table table-bordered table-hover tableHeader">
                                                        <thead className='tableHeader'>
                                                            <tr>
                                                                <th scope="col">#</th>
                                                                <th scope="col">Party Name</th>
                                                                <th scope="col">Address1</th>
                                                                <th scope="col">Address2</th>
                                                                <th scope="col">Address3</th>

                                                            </tr>
                                                            <tr className='text-center'>
                                                                <th scope="col"></th>
                                                                <th scope="col">{igmSearchedData.length}</th>
                                                                <th scope="col"></th>
                                                                <th scope="col"></th>
                                                                <th scope="col"></th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr >
                                                                <td>
                                                                    <input type="radio" name="radioGroup" onChange={() => selectIGMSearchRadio('', '', '', '', '')} value={''} />
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>

                                                            </tr>
                                                            {currentItems.map((item, index) => (
                                                                <>

                                                                    <tr key={index}>
                                                                        <td>
                                                                            <input type="radio" name="radioGroup" onChange={() => selectIGMSearchRadio(item[0], item[1], item[2], item[3], item[4])} value={item[0]} />
                                                                        </td>
                                                                        <td>{item[1]}</td>
                                                                        <td>{item[2]}</td>
                                                                        <td>{item[3]}</td>
                                                                        <td>{item[4]}</td>

                                                                    </tr>
                                                                </>
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
                                            </ModalBody>
                                        </Modal>
                                        <Col md={3}>
                                            <FormGroup>
                                                <label className="forlabel bold-label" htmlFor="cargoWeight2">
                                                    Notify Party Name
                                                </label>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    id="notifyPartyName"
                                                    name='notifyPartyName'
                                                    readOnly
                                                    value={igmCrgData.notifyPartyName}
                                                    style={{ backgroundColor: '#E0E0E0' }}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={1} style={{ marginTop: 24 }}>
                                            <button
                                                className="btn btn-outline-primary btn-margin newButton"
                                                style={{ marginRight: 10 }}
                                                id="submitbtn2"
                                                onClick={handleOpenImp1}
                                            >
                                                <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                            </button>
                                        </Col>
                                    </Row>
                                    <Modal Modal isOpen={isModalOpenForImp1} onClose={handleCloseImp1} toggle={handleCloseImp1} style={{ maxWidth: '700px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                                        <ModalHeader toggle={handleCloseImp1} style={{
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
                                                icon={faSearch}
                                                style={{
                                                    marginRight: '8px',
                                                    color: 'white', // Set the color to golden
                                                }}
                                            /> Search Importer</h5>



                                        </ModalHeader>
                                        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                                            <Row>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                            Search by Party Name
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            id="igmTransId"
                                                            maxLength={15}
                                                            name='igmTransId'
                                                            value={igmSearchId1}
                                                            onChange={(e) => setIgmSearchId1(e.target.value)}
                                                        />

                                                    </FormGroup>
                                                </Col>
                                                <Col md={6} style={{ marginTop: 24 }}>
                                                    <button
                                                        className="btn btn-outline-primary btn-margin newButton"
                                                        style={{ marginRight: 10 }}
                                                        id="submitbtn2"
                                                        onClick={() => searchIGM1(igmSearchId)}
                                                    >
                                                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                                        Search
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-danger btn-margin newButton"
                                                        style={{ marginRight: 10 }}
                                                        id="submitbtn2"
                                                        onClick={clearSearch1}
                                                    >
                                                        <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                                        Reset
                                                    </button>
                                                </Col>
                                            </Row>
                                            <hr />
                                            <div className="mt-1 table-responsive ">
                                                <table className="table table-bordered table-hover tableHeader">
                                                    <thead className='tableHeader'>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Party Name</th>
                                                            <th scope="col">Address1</th>
                                                            <th scope="col">Address2</th>
                                                            <th scope="col">Address3</th>

                                                        </tr>
                                                        <tr className='text-center'>
                                                            <th scope="col"></th>
                                                            <th scope="col">{igmSearchedData1.length}</th>
                                                            <th scope="col"></th>
                                                            <th scope="col"></th>
                                                            <th scope="col"></th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr >
                                                            <td>
                                                                <input type="radio" name="radioGroup" onChange={() => selectIGMSearchRadio1('', '', '', '', '')} value={''} />
                                                            </td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>

                                                        </tr>
                                                        {currentItems1.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <input type="radio" name="radioGroup" onChange={() => selectIGMSearchRadio1(item[0], item[1], item[2], item[3], item[4])} value={item[0]} />
                                                                </td>
                                                                <td>{item[1]}</td>
                                                                <td>{item[2]}</td>
                                                                <td>{item[3]}</td>
                                                                <td>{item[4]}</td>

                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                                                    <Pagination.First onClick={() => handlePageChange1(1)} />
                                                    <Pagination.Prev
                                                        onClick={() => handlePageChange1(currentPage1 - 1)}
                                                        disabled={currentPage1 === 1}
                                                    />
                                                    <Pagination.Ellipsis />

                                                    {displayPages1().map((pageNumber) => (
                                                        <Pagination.Item
                                                            key={pageNumber}
                                                            active={pageNumber === currentPage}
                                                            onClick={() => handlePageChange1(pageNumber)}
                                                        >
                                                            {pageNumber}
                                                        </Pagination.Item>
                                                    ))}

                                                    <Pagination.Ellipsis />
                                                    <Pagination.Next
                                                        onClick={() => handlePageChange1(currentPage1 + 1)}
                                                        disabled={currentPage1 === totalPages1}
                                                    />
                                                    <Pagination.Last onClick={() => handlePageChange1(totalPages1)} />
                                                </Pagination>
                                            </div>
                                        </ModalBody>
                                    </Modal>
                                    <Row>
                                        <Col md={4}>
                                            <FormGroup>
                                                <label className="forlabel bold-label" htmlFor="cargoMovement2">
                                                    Origin
                                                </label>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    id="origin"
                                                    name='origin'
                                                    value={igmCrgData.origin}
                                                    onChange={handleIgmCrgChange}
                                                    maxLength={50}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <label className="forlabel bold-label" htmlFor="cargoWeight3">
                                                    Importer Address1<span style={{ color: 'red' }}>*</span>
                                                </label>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    id="importerAddress1"
                                                    name='importerAddress1'
                                                    value={igmCrgData.importerAddress1}
                                                    onChange={handleIgmCrgChange}
                                                    maxLength={250}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <label className="forlabel bold-label" htmlFor="cargoWeight4">
                                                    Notified Address1
                                                </label>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    id="notifiedAddress1"
                                                    name='notifiedAddress1'
                                                    value={igmCrgData.notifiedAddress1}
                                                    onChange={handleIgmCrgChange}
                                                    maxLength={250}
                                                />
                                            </FormGroup>
                                        </Col>

                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="cargoWeight4">
                                            Destination<span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="destination"
                                            name='destination'
                                            onChange={handleIgmCrgChange}
                                            value={igmCrgData.destination}
                                            maxLength={50}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="cargoWeight4">
                                            IMO Code
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="imoCode"
                                            name='imoCode'
                                            onChange={handleIgmCrgChange}
                                            value={igmCrgData.imoCode}
                                            maxLength={3}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="cargoWeight4">
                                            Importer Address2
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="importerAddress2"
                                            name='importerAddress2'
                                            onChange={handleIgmCrgChange}
                                            value={igmCrgData.importerAddress2}
                                            maxLength={100}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="cargoWeight4">
                                            Notified Address2
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="notifiedAddress2"
                                            onChange={handleIgmCrgChange}
                                            name='notifiedAddress2'
                                            value={igmCrgData.notifiedAddress2}
                                            maxLength={100}
                                        />
                                    </FormGroup>
                                </Col>

                            </Row>
                            <Row>

                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="cargoWeight4">
                                            UN No
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="unNo"
                                            name='unNo'
                                            onChange={handleIgmCrgChange}
                                            value={igmCrgData.unNo}
                                            maxLength={10}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="cargoWeight4">
                                            Haz/Reefer Remarks
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="hazReeferRemarks"
                                            name='hazReeferRemarks'
                                            onChange={handleIgmCrgChange}
                                            value={igmCrgData.hazReeferRemarks}
                                            maxLength={10}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="cargoWeight4">
                                            Importer Address3
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="importerAddress3"
                                            onChange={handleIgmCrgChange}
                                            name='importerAddress3'
                                            value={igmCrgData.importerAddress3}
                                            maxLength={100}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="cargoWeight4">
                                            Notified Address3
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="notifiedAddress3"
                                            name='notifiedAddress3'
                                            onChange={handleIgmCrgChange}
                                            maxLength={100}
                                            value={igmCrgData.notifiedAddress3}
                                        />
                                    </FormGroup>
                                </Col>

                            </Row>
                            <Row>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="cargoWeight4">
                                            CHA
                                        </label>
                                        <Select
                                            isDisabled
                                            value={{ value: chaId, label: chaName }}
                                            onChange={handleCHAChange}
                                            onInputChange={getChaData}
                                            options={chaData}
                                            placeholder="Select Port"
                                            isClearable
                                            id="port"
                                            vesselName="port"

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
                                                }),
                                                placeholder: (provided) => ({
                                                    ...provided,
                                                    display: 'flex',
                                                    color: 'gray',
                                                }),
                                            }}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="cargoWeight4">
                                            DO No
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="cargoWeight4"
                                            readOnly
                                            style={{ backgroundColor: '#E0E0E0' }}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            DO Date
                                        </label>
                                        <DatePicker

                                            id="sbDate"
                                            dateFormat="dd/MM/yyyy"
                                            className="form-control"
                                            disabled
                                            style={{ backgroundColor: '#E0E0E0' }}
                                            wrapperClassName="custom-react-datepicker-wrapper"
                                            customInput={
                                                <input
                                                    style={{
                                                        height: "38px",
                                                        width: "100%",
                                                    }}
                                                />

                                            }

                                        />

                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            DO Validity Date
                                        </label>
                                        <DatePicker

                                            id="sbDate"
                                            dateFormat="dd/MM/yyyy"
                                            className="form-control"
                                            disabled
                                            style={{ backgroundColor: '#E0E0E0' }}
                                            wrapperClassName="custom-react-datepicker-wrapper"
                                            customInput={
                                                <input
                                                    style={{
                                                        height: "38px",
                                                        width: "100%",
                                                    }}
                                                />

                                            }

                                        />

                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="cargoWeight4">
                                            BOE No
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="cargoWeight4"
                                            readOnly
                                            style={{ backgroundColor: '#E0E0E0' }}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            BOE Date
                                        </label>
                                        <DatePicker

                                            id="sbDate"
                                            dateFormat="dd/MM/yyyy"
                                            className="form-control"
                                            disabled
                                            style={{ backgroundColor: '#E0E0E0' }}
                                            wrapperClassName="custom-react-datepicker-wrapper"
                                            customInput={
                                                <input
                                                    style={{
                                                        height: "38px",
                                                        width: "100%",
                                                    }}
                                                />

                                            }

                                        />

                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="cargoWeight4">
                                            Assessable Value
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="cargoValue"
                                            name='cargoValue'
                                            readOnly
                                            style={{ backgroundColor: '#E0E0E0' }}
                                        />
                                    </FormGroup>
                                </Col>


                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="cargoWeight4">
                                            Forwarder
                                        </label>
                                        <Select
                                            value={{ value: fwdId, label: fwdName }}
                                            onChange={handleFWDChange}
                                            onInputChange={getFwdData}
                                            options={forwarderData}
                                            placeholder="Select Port"
                                            isClearable
                                            id="port"
                                            vesselName="port"
                                            isDisabled
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
                                                }),
                                                placeholder: (provided) => ({
                                                    ...provided,
                                                    display: 'flex',
                                                    color: 'gray',
                                                }),
                                            }}
                                        />

                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="cargoWeight4">
                                            Cargo Duty
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="cargoDuty"
                                            name='cargoDuty'
                                            readOnly
                                            style={{ backgroundColor: '#E0E0E0' }}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="cargoWeight4">
                                            Waiver Risk Charges
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="select"
                                            id="riskStatus"
                                            name='riskStatus'
                                            disabled
                                            style={{ backgroundColor: '#E0E0E0' }}
                                        >
                                            <option value="N">No</option>
                                            <option value="Y">Yes</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="cargoWeight4">
                                            SMTP Flag
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="select"
                                            id="smtpFlag"
                                            name='smtpFlag'
                                            disabled
                                            style={{ backgroundColor: '#E0E0E0' }}
                                        >
                                            <option value="N">No</option>
                                            <option value="Y">Yes</option>
                                        </Input>
                                    </FormGroup>
                                </Col>

                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="cargoWeight4">
                                            Cargo
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="cargoWeight4"
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
                                        style={{ marginRight: 10 }}
                                        id="submitbtn2"
                                    >
                                        <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                        Submit
                                    </button>
                                    <button
                                        className="btn btn-outline-danger btn-margin newButton"
                                        style={{ marginRight: 10 }}
                                        id="submitbtn2"
                                    >
                                        <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                        Clear
                                    </button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}
