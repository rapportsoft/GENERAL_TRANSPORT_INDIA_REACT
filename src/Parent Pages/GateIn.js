
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

export default function GateIn({ igm, cont, conList, process, onRequest, inId, igmtrans }) {
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

    const [gateIn, setGateIn] = useState({
        companyId: '',
        branchId: '',
        gateInId: '',
        finYear: new Date().getFullYear(),
        erpDocRefNo: '',
        docRefNo: '',
        lineNo: '',
        srNo: 0,
        docRefDate: null,
        profitcentreId: '',
        viaNo: '',
        containerNo: '',
        containerSize: '',
        containerType: '',
        containerStatus: '',
        containerSealNo: '',
        customsSealNo: '',
        actualSealNo: '',
        vehicleType: 'Normal',
        isoCode: '',
        eirGrossWeight: '',
        tareWeight: '',
        hazardous: 'N',
        hazClass: '',
        sa: '',
        sl: '',
        portExitNo: '',
        portExitDate: null,
        origin: '',
        refer: 'N',
        temperature: '',
        containerHealth: '',
        yardLocation: '',
        yardBlock: '',
        yardCell: '',
        yardLocation1: '',
        yardBlock1: '',
        yardCell1: '',
        transporterStatus: 'C',
        transporterName: '',
        vehicleNo: '',
        driverName: '',
        comments: '',
        specialRemarks: '',
        status: '',
        createdBy: '',
        approvedBy: '',
        tripType: 'Single',
        drt: 'N',
        scannerType: '',
        holdStatus: '',
        holdType: '',
        holdUser: '',
        holdDate: null,
        holdRemarks: '',
        pnStatus: 'N',
        jobOrderId: '',
        jobDate: null,
        inGateInDate: new Date(),
        scanningStatus: '',
        odcStatus: '',
        terminal: '',
        vessel: '',
        lowBed: 'N',
        createdDate: null
    });

    function handleInputChange1(e) {
        const inputValue = e;
        const numericInput = inputValue.replace(/[^0-9.]/g, '');
        const parts = numericInput.split('.');
        const integerPart = parts[0].slice(0, 12);
        let decimalPart = parts[1];

        // Limit decimal places if needed
        if (decimalPart !== undefined) {
            decimalPart = `.${decimalPart.slice(0, 3)}`;
        }

        const sanitizedInput = decimalPart !== undefined ? `${integerPart}${decimalPart}` : integerPart;
        return sanitizedInput;
    };

    // Example function to update a specific field
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        let sanitizedValue = value;

        if (name === 'hazardous') {
            if (sanitizedValue === 'N') {
                gateIn.hazClass = "";
            }


        }

        if (['tareWeight', 'eirGrossWeight'].includes(name)) {
            sanitizedValue = handleInputChange1(sanitizedValue);
        }

        setGateIn({
            ...gateIn,
            [name]: sanitizedValue,
        });

        document.getElementById(name).classList.remove('error-border');
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const [transporterData, setTransporterData] = useState([]);

    const getTransporter = () => {
        axios.get(`${ipaddress}party/getTrans?cid=${companyid}&bid=${branchId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setTransporterData(response.data);
            })
            .catch((error) => {

            })
    }


    useEffect(() => {
        getTransporter();
    }, [])


    const [yardData, setYardData] = useState([]);
    const [yardId, setyardId] = useState('');

    const getYardData = (id) => {
        axios.get(`${ipaddress}api/yardblockcells/getAllRecords?cid=${companyid}&val=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setYardData(response.data);
            })
            .catch((error) => {

            })
    }


    const handleYardReset = () => {
        setyardId('');
        getYardData('');
    }

    const selectYardData = (lid, ldesc, block, cell, flag) => {
        if (yardFlag === 'yard') {
            setGateIn({
                ...gateIn,
                yardLocation: lid,
                yardBlock: block,
                yardCell: cell

            })
        }
        else {
            setGateIn({
                ...gateIn,
                yardLocation1: lid,
                yardBlock1: block,
                yardCell1: cell

            })
        }
        closeYardModal();

    }


    const [currentPage1, setCurrentPage1] = useState(1);
    const [itemsPerPage1] = useState(5);

    const indexOfLastItem1 = currentPage1 * itemsPerPage1;
    const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
    const currentItems1 = yardData.slice(indexOfFirstItem1, indexOfLastItem1);
    const totalPages1 = Math.ceil(yardData.length / itemsPerPage1);

    // Function to handle page change
    const handlePageChange1 = (page) => {
        if (page >= 1 && page <= totalPages1) {
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
            endPage = Math.min(totalPages1, centerPageCount);
        }

        if (endPage > totalPages1) {
            endPage = totalPages1;
            startPage = Math.max(1, totalPages1 - centerPageCount + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };



    const [isModalOpenForYard, setIsModalOpenForYard] = useState(false);
    const [yardFlag, setYardFlag] = useState('');

    const openYardModal = (flag) => {
        setIsModalOpenForYard(true);
        setYardFlag(flag);
        getYardData('');
    }

    const closeYardModal = () => {
        setYardFlag('');
        setIsModalOpenForYard(false);

    }


    const [containerData, setContainerData] = useState([]);
    const [searchContainer, setSearchContainer] = useState('');

    const getContainers = (search) => {
        setLoading(true);
        axios.get(`${ipaddress}cfigm/searchContainer?cid=${companyid}&bid=${branchId}&search=${search}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setContainerData(response.data);
                console.log('con ', response.data);

                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            })
    }

    const [currentPage2, setCurrentPage2] = useState(1);
    const [itemsPerPage2] = useState(5);

    const indexOfLastItem2 = currentPage2 * itemsPerPage2;
    const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;
    const currentItems2 = containerData.slice(indexOfFirstItem2, indexOfLastItem2);
    const totalPages2 = Math.ceil(containerData.length / itemsPerPage2);

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


    const clearContainer = () => {
        setSearchContainer('');
        getContainers('');
    }

    const [isModalOpenForContainer, setIsModalOpenForContainer] = useState(false);
    const [sl, setSl] = useState('');
    const [sa, setSa] = useState('');
    const [pn, setPn] = useState('');
    const [vessel, setVessel] = useState('');
    const [profit, setProfit] = useState('');


    const openContainerModal = () => {
        setIsModalOpenForContainer(true);
        getContainers('');
    }

    const closeContainerModal = () => {
        setIsModalOpenForContainer(false);
        setSearchContainer('');
        setContainerData([]);
    }


    const handlePortExitDate = (date) => {
        setGateIn({
            ...gateIn,
            portExitDate: date
        })

        document.getElementById('portExitDate').classList.remove('error-border');
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            'portExitDate': "",
        }));
    }

    const selectContainerData = (item, flag) => {


        if (flag === 'add') {
            setGateIn({
                ...gateIn,
                containerNo: item[0],
                containerStatus: item[4],
                containerSize: item[1],
                containerType: item[2],
                isoCode: item[3],
                containerSealNo: item[5],
                sl: item[7],
                actualSealNo: item[5],
                sa: item[6],
                docRefDate: new Date(item[10]),
                erpDocRefNo: item[8],
                docRefNo: item[9],
                jobDate: new Date(item[13]),
                terminal: item[11],
                jobOrderId: item[9],
                tareWeight: item[28],
                vessel: item[27],
                viaNo: item[14],
                eirGrossWeight: item[29],
                refer: item[23],
                lowBed: item[24],
                scannerType: item[21],
                odcStatus: item[26],
                temperature: item[25],
                profitcentreId: item[15],
                lineNo: item[31]
            })
            setProfit(item[16]);
            setVessel(item[22]);
            setPn(item[20]);
            setSa(item[18]);
            setSl(item[19]);
        }
        else {
            setGateIn({
                ...gateIn,
                containerNo: '',
                containerStatus: '',
                containerSize: '',
                containerType: '',
                isoCode: '',
                containerSealNo: '',
                sl: '',
                actualSealNo: '',
                sa: '',
                docRefDate: '',
                erpDocRefNo: '',
                docRefNo: '',
                jobDate: '',
                terminal: '',
                jobOrderId: '',
                tareWeight: '',
                vessel: '',
                viaNo: '',
                eirGrossWeight: '',
                refer: 'N',
                lowBed: 'N',
                scannerType: '',
                odcStatus: 'N',
                temperature: '',
                profitcentreId: '',
                lineNo: ''
            })
            setProfit('');
            setVessel('');
            setPn('');
            setSa('');
            setSl('');
        }

        closeContainerModal();




    }

    const cleaGateIn = () => {

        setFormErrors({
            vehicleNo: '',
            transporterName: '',
            portExitNo: '',
            portExitDate: '',
            comments: '',

        })
        document.getElementById('vehicleNo').classList.remove('error-border');
        document.getElementById('transporterName').classList.remove('error-border');
        document.getElementById('portExitNo').classList.remove('error-border');
        document.getElementById('portExitDate').classList.remove('error-border');
        document.getElementById('comments').classList.remove('error-border');

        setGateIn({
            companyId: '',
            branchId: '',
            gateInId: '',
            finYear: new Date().getFullYear(),
            erpDocRefNo: '',
            docRefNo: '',
            lineNo: '',
            srNo: 0,
            docRefDate: null,
            profitcentreId: '',
            viaNo: '',
            containerNo: '',
            containerSize: '',
            containerType: '',
            containerStatus: '',
            containerSealNo: '',
            customsSealNo: '',
            actualSealNo: '',
            vehicleType: 'Normal',
            isoCode: '',
            eirGrossWeight: '',
            tareWeight: '',
            hazardous: 'N',
            hazClass: '',
            sa: '',
            sl: '',
            portExitNo: '',
            portExitDate: null,
            origin: '',
            refer: 'N',
            temperature: '',
            containerHealth: '',
            yardLocation: '',
            yardBlock: '',
            yardCell: '',
            yardLocation1: '',
            yardBlock1: '',
            yardCell1: '',
            transporterStatus: 'C',
            transporterName: '',
            vehicleNo: '',
            driverName: '',
            comments: '',
            specialRemarks: '',
            status: '',
            createdBy: '',
            approvedBy: '',
            tripType: 'Single',
            drt: 'N',
            scannerType: '',
            holdStatus: '',
            holdType: '',
            holdUser: '',
            holdDate: null,
            holdRemarks: '',
            pnStatus: 'N',
            jobOrderId: '',
            jobDate: null,
            inGateInDate: new Date(),
            scanningStatus: '',
            odcStatus: '',
            terminal: '',
            vessel: '',
            lowBed: 'N',
            createdDate: null
        });
        setProfit('');
        setVessel('');
        setPn('');
        setSa('');
        setSl('');
        setFlag('add');
    }

    const [formErrors, setFormErrors] = useState({
        vehicleNo: '',
        transporterName: '',
        portExitNo: '',
        portExitDate: '',
        comments: '',

    })


    const [flag, setFlag] = useState('add');
    const saveData = () => {
        setLoading(true);

        setFormErrors({
            vehicleNo: '',
            transporterName: '',
            portExitNo: '',
            portExitDate: '',
            comments: '',

        })
        document.getElementById('vehicleNo').classList.remove('error-border');
        document.getElementById('transporterName').classList.remove('error-border');
        document.getElementById('portExitNo').classList.remove('error-border');
        document.getElementById('portExitDate').classList.remove('error-border');
        document.getElementById('comments').classList.remove('error-border');

        let errors = {};

        if (!gateIn.vehicleNo) {
            errors.vehicleNo = "Vehicle No is required."
            document.getElementById("vehicleNo").classList.add('error-border');
        }

        if (!gateIn.transporterName) {
            errors.transporterName = "Transporter name is required."
            document.getElementById("transporterName").classList.add('error-border');
        }

        if (!gateIn.portExitNo) {
            errors.portExitNo = "Port exit no is required."
            document.getElementById("portExitNo").classList.add('error-border');
        }

        if (!gateIn.portExitDate) {
            errors.portExitDate = "Port exit date is required."
            document.getElementById("portExitDate").classList.add('error-border');
        }

        if (!gateIn.comments) {
            errors.comments = "Remarks is required."
            document.getElementById("comments").classList.add('error-border');
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setLoading(false);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            })
            return;
        }

        if (!gateIn.containerNo) {
            toast.error("Please select the container no.", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }




        axios.post(`${ipaddress}gateIn/saveGateIn?cid=${companyid}&bid=${branchId}&user=${userId}&flag=${flag}`, gateIn, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                toast.success("Data saved successfully!!!!", {
                    autoClose: 800
                });
                setLoading(false);
                setFlag('edit');

                const data = response.data;

                // Update state with specific values from response.data
                setGateIn(prevState => ({
                    ...prevState,
                    companyId: data.companyId || prevState.companyId,
                    branchId: data.branchId || prevState.branchId,
                    gateInId: data.gateInId || prevState.gateInId,
                    finYear: data.finYear || prevState.finYear,
                    erpDocRefNo: data.erpDocRefNo || prevState.erpDocRefNo,
                    docRefNo: data.docRefNo || prevState.docRefNo,
                    lineNo: data.lineNo || prevState.lineNo,
                    srNo: data.srNo || prevState.srNo,
                    docRefDate: new Date(data.docRefDate) || prevState.docRefDate,
                    profitcentreId: data.profitcentreId || prevState.profitcentreId,
                    viaNo: data.viaNo || prevState.viaNo,
                    containerNo: data.containerNo || prevState.containerNo,
                    containerSize: data.containerSize || prevState.containerSize,
                    containerType: data.containerType || prevState.containerType,
                    containerStatus: data.containerStatus || prevState.containerStatus,
                    containerSealNo: data.containerSealNo || prevState.containerSealNo,
                    customsSealNo: data.customsSealNo || prevState.customsSealNo,
                    actualSealNo: data.actualSealNo || prevState.actualSealNo,
                    vehicleType: data.vehicleType || 'Normal',
                    isoCode: data.isoCode || prevState.isoCode,
                    eirGrossWeight: data.eirGrossWeight || prevState.eirGrossWeight,
                    tareWeight: data.tareWeight || prevState.tareWeight,
                    hazardous: data.hazardous || 'N',
                    hazClass: data.hazClass || prevState.hazClass,
                    sa: data.sa || prevState.sa,
                    sl: data.sl || prevState.sl,
                    portExitNo: data.portExitNo || prevState.portExitNo,
                    portExitDate: new Date(data.portExitDate) || prevState.portExitDate,
                    origin: data.origin || prevState.origin,
                    refer: data.refer || 'N',
                    temperature: data.temperature || prevState.temperature,
                    containerHealth: data.containerHealth || prevState.containerHealth,
                    yardLocation: data.yardLocation || prevState.yardLocation,
                    yardBlock: data.yardBlock || prevState.yardBlock,
                    yardCell: data.yardCell || prevState.yardCell,
                    yardLocation1: data.yardLocation1 || prevState.yardLocation1,
                    yardBlock1: data.yardBlock1 || prevState.yardBlock1,
                    yardCell1: data.yardCell1 || prevState.yardCell1,
                    transporterStatus: data.transporterStatus || 'C',
                    transporterName: data.transporterName || prevState.transporterName,
                    vehicleNo: data.vehicleNo || prevState.vehicleNo,
                    driverName: data.driverName || prevState.driverName,
                    comments: data.comments || prevState.comments,
                    specialRemarks: data.specialRemarks || prevState.specialRemarks,
                    status: data.status || prevState.status,
                    createdBy: data.createdBy || prevState.createdBy,
                    approvedBy: data.approvedBy || prevState.approvedBy,
                    tripType: data.tripType || 'Single',
                    drt: data.drt || 'N',
                    scannerType: data.scannerType || prevState.scannerType,
                    holdStatus: data.holdStatus || prevState.holdStatus,
                    holdType: data.holdType || prevState.holdType,
                    holdUser: data.holdUser || prevState.holdUser,
                    holdDate: new Date(data.holdDate) || prevState.holdDate,
                    holdRemarks: data.holdRemarks || prevState.holdRemarks,
                    pnStatus: data.pnStatus || 'N',
                    jobOrderId: data.jobOrderId || prevState.jobOrderId,
                    jobDate: data.jobDate || prevState.jobDate,
                    inGateInDate: new Date(data.inGateInDate) || new Date(),
                    scanningStatus: data.scanningStatus || prevState.scanningStatus,
                    odcStatus: data.odcStatus || prevState.odcStatus,
                    terminal: data.terminal || prevState.terminal,
                    vessel: data.vessel || prevState.vessel,
                    lowBed: data.lowBed || 'N',
                    createdDate: data.createdDate || null
                }));
                onRequest();
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                });
                setLoading(false);
            });
    };

    const [isModalOpenForGateInSearch, setIsModalOpenForGateInSearch] = useState(false);

    const openGateInSearchModal = () => {
        setIsModalOpenForGateInSearch(true);
        searchGateIn('');
    }

    const closeGateInSearchModal = () => {
        setIsModalOpenForGateInSearch(false);
        setgateInId('');
        setgateInSearchData([]);
    }

    const [gateInId, setgateInId] = useState('');
    const [gateInSearchData, setgateInSearchData] = useState([]);

    const searchGateIn = (id) => {
        setLoading(true);
        axios.get(`${ipaddress}gateIn/getImpData?cid=${companyid}&bid=${branchId}&search=${id}&process=${process}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setgateInSearchData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            })
    }

    const clearGateIn = () => {
        searchGateIn('');
        setgateInId('');
    }

    const getSingleGateInData = (gatein, igmtrans, igm, vessel, pn, sa, sl, profit) => {
        if (!gatein || !igmtrans || !igm) {
            return;
        }
        console.log('gatein, igmtrans, igm ',gatein, igmtrans, igm);
        
        axios.get(`${ipaddress}gateIn/getSingleData?cid=${companyid}&bid=${branchId}&gateinid=${gatein}&igmtrans=${igmtrans}&igm=${igm}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                setFlag('edit');

                // Update state with specific values from response.data
                setGateIn(prevState => ({
                    ...prevState,
                    companyId: data.companyId || prevState.companyId,
                    branchId: data.branchId || prevState.branchId,
                    gateInId: data.gateInId || prevState.gateInId,
                    finYear: data.finYear || prevState.finYear,
                    erpDocRefNo: data.erpDocRefNo || prevState.erpDocRefNo,
                    docRefNo: data.docRefNo || prevState.docRefNo,
                    lineNo: data.lineNo || prevState.lineNo,
                    srNo: data.srNo || prevState.srNo,
                    docRefDate: new Date(data.docRefDate) || prevState.docRefDate,
                    profitcentreId: data.profitcentreId || prevState.profitcentreId,
                    viaNo: data.viaNo || prevState.viaNo,
                    containerNo: data.containerNo || prevState.containerNo,
                    containerSize: data.containerSize || prevState.containerSize,
                    containerType: data.containerType || prevState.containerType,
                    containerStatus: data.containerStatus || prevState.containerStatus,
                    containerSealNo: data.containerSealNo || prevState.containerSealNo,
                    customsSealNo: data.customsSealNo || prevState.customsSealNo,
                    actualSealNo: data.actualSealNo || prevState.actualSealNo,
                    vehicleType: data.vehicleType || 'Normal',
                    isoCode: data.isoCode || prevState.isoCode,
                    eirGrossWeight: data.eirGrossWeight || prevState.eirGrossWeight,
                    tareWeight: data.tareWeight || prevState.tareWeight,
                    hazardous: data.hazardous || 'N',
                    hazClass: data.hazClass || prevState.hazClass,
                    sa: data.sa || prevState.sa,
                    sl: data.sl || prevState.sl,
                    portExitNo: data.portExitNo || prevState.portExitNo,
                    portExitDate: new Date(data.portExitDate) || prevState.portExitDate,
                    origin: data.origin || prevState.origin,
                    refer: data.refer || 'N',
                    temperature: data.temperature || prevState.temperature,
                    containerHealth: data.containerHealth || prevState.containerHealth,
                    yardLocation: data.yardLocation || prevState.yardLocation,
                    yardBlock: data.yardBlock || prevState.yardBlock,
                    yardCell: data.yardCell || prevState.yardCell,
                    yardLocation1: data.yardLocation1 || prevState.yardLocation1,
                    yardBlock1: data.yardBlock1 || prevState.yardBlock1,
                    yardCell1: data.yardCell1 || prevState.yardCell1,
                    transporterStatus: data.transporterStatus || 'C',
                    transporterName: data.transporterName || prevState.transporterName,
                    vehicleNo: data.vehicleNo || prevState.vehicleNo,
                    driverName: data.driverName || prevState.driverName,
                    comments: data.comments || prevState.comments,
                    specialRemarks: data.specialRemarks || prevState.specialRemarks,
                    status: data.status || prevState.status,
                    createdBy: data.createdBy || prevState.createdBy,
                    approvedBy: data.approvedBy || prevState.approvedBy,
                    tripType: data.tripType || 'Single',
                    drt: data.drt || 'N',
                    scannerType: data.scannerType || prevState.scannerType,
                    holdStatus: data.holdStatus || prevState.holdStatus,
                    holdType: data.holdType || prevState.holdType,
                    holdUser: data.holdUser || prevState.holdUser,
                    holdDate: new Date(data.holdDate) || prevState.holdDate,
                    holdRemarks: data.holdRemarks || prevState.holdRemarks,
                    pnStatus: data.pnStatus || 'N',
                    jobOrderId: data.jobOrderId || prevState.jobOrderId,
                    jobDate: data.jobDate || prevState.jobDate,
                    inGateInDate: new Date(data.inGateInDate) || new Date(),
                    scanningStatus: data.scanningStatus || prevState.scanningStatus,
                    odcStatus: data.odcStatus || prevState.odcStatus,
                    terminal: data.terminal || prevState.terminal,
                    vessel: data.vessel || prevState.vessel,
                    lowBed: data.lowBed || 'N',
                    createdDate: data.createdDate || null
                }));
                setProfit(profit);
                setVessel(vessel);
                setPn(pn);
                setSa(sa);
                setSl(sl);
                closeGateInSearchModal();
            })
            .catch((error) => {

            })
    }

    const [currentPage3, setCurrentPage3] = useState(1);
    const [itemsPerPage3] = useState(5);

    const indexOfLastItem3 = currentPage3 * itemsPerPage3;
    const indexOfFirstItem3 = indexOfLastItem3 - itemsPerPage3;
    const currentItems3 = gateInSearchData.slice(indexOfFirstItem3, indexOfLastItem3);
    const totalPages3 = Math.ceil(gateInSearchData.length / itemsPerPage3);

    // Function to handle page change
    const handlePageChange3 = (page) => {
        if (page >= 1 && page <= totalPages3) {
            setCurrentPage3(page);
        }
    };
    const displayPages3 = () => {
        const centerPageCount = 5;
        const middlePage = Math.floor(centerPageCount / 2);
        let startPage = currentPage3 - middlePage;
        let endPage = currentPage3 + middlePage;

        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(totalPages3, centerPageCount);
        }

        if (endPage > totalPages3) {
            endPage = totalPages3;
            startPage = Math.max(1, totalPages3 - centerPageCount + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    const [containerList, setContainerList] = useState([]);

    const getContainersForSearch = (val) => {

        if (val === '') {
            setContainerList([]);
            return;
        }
        axios.get(`${ipaddress}cfigm/getSearchCon?cid=${companyid}&bid=${branchId}&con=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const portOptions = data.map(port => ({
                    value: port,
                    label: port
                }))
                setContainerList(portOptions);
            })
            .catch((error) => {
                setContainerList([]);
            })


    }

    const handleConChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setGateIn({
                ...gateIn,
                containerNo: ''
            })
            cleaGateIn();
        }
        else {
            setGateIn({
                ...gateIn,
                containerNo: selectedOption.value
            })

            selectSingleCon(selectedOption.value);
        }


    }

    const selectSingleCon = (val) => {
        axios.get(`${ipaddress}cfigm/getSearchSingleCon?cid=${companyid}&bid=${branchId}&con=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const item = response.data[0];
                setGateIn({
                    ...gateIn,
                    containerNo: item[0],
                    containerStatus: item[4],
                    containerSize: item[1],
                    containerType: item[2],
                    isoCode: item[3],
                    containerSealNo: item[5],
                    sl: item[7],
                    actualSealNo: item[5],
                    sa: item[6],
                    docRefDate: new Date(item[10]),
                    erpDocRefNo: item[8],
                    docRefNo: item[9],
                    jobDate: new Date(item[13]),
                    terminal: item[11],
                    jobOrderId: item[9],
                    tareWeight: item[28],
                    vessel: item[27],
                    viaNo: item[14],
                    eirGrossWeight: item[29],
                    refer: item[23],
                    lowBed: item[24],
                    scannerType: item[21],
                    odcStatus: item[26],
                    temperature: item[25],
                    profitcentreId: item[15],
                    lineNo: item[30],
                    hazardous: item[31] === 'Hazardous' ? 'Y' : 'N',
                    origin: item[32]
                })
                setProfit(item[16]);
                setVessel(item[22]);
                setPn(item[20]);
                setSa(item[18]);
                setSl(item[19]);

            })
            .catch((error) => {
                setGateIn({
                    ...gateIn,
                    containerNo: '',
                    containerStatus: '',
                    containerSize: '',
                    containerType: '',
                    isoCode: '',
                    containerSealNo: '',
                    sl: '',
                    actualSealNo: '',
                    sa: '',
                    docRefDate: '',
                    erpDocRefNo: '',
                    docRefNo: '',
                    jobDate: '',
                    terminal: '',
                    jobOrderId: '',
                    tareWeight: '',
                    vessel: '',
                    viaNo: '',
                    eirGrossWeight: '',
                    refer: 'N',
                    lowBed: 'N',
                    scannerType: '',
                    odcStatus: 'N',
                    temperature: '',
                    profitcentreId: '',
                    lineNo: '',
                    hazardous: 'N',
                    origin: ''
                })
                setProfit('');
                setVessel('');
                setPn('');
                setSa('');
                setSl('');
            })
    }

    const [yardSearchData, setYardSearchData] = useState([]);

    const getSearchYardData = (val) => {

        if (val === '') {
            setYardSearchData([]);
            return;
        }

        axios.get(`${ipaddress}api/yardblockcells/getAllYard?companyId=${companyid}&branchId=${branchId}&search=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const portOptions = data.map(port => ({
                    value: port.yardLocationId + '-' + port.blockId + '-' + port.cellNoRow,
                    label: port.yardLocationId + '-' + port.blockId + '-' + port.cellNoRow,
                    yardLocation: port.yardLocationId,
                    block: port.blockId,
                    cell: port.cellNoRow
                }))
                setYardSearchData(portOptions);
            })
            .catch((error) => {
                setYardSearchData([]);
            })
    }

    const handleYardChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setGateIn({
                ...gateIn,
                yardLocation: '',
                yardBlock: '',
                yardCell: ''
            })

        }
        else {
            setGateIn({
                ...gateIn,
                yardLocation: selectedOption.yardLocation,
                yardBlock: selectedOption.block,
                yardCell: selectedOption.cell
            })


        }


    }

    const handleYardChange1 = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setGateIn({
                ...gateIn,
                yardLocation1: '',
                yardBlock1: '',
                yardCell1: ''
            })

        }
        else {
            setGateIn({
                ...gateIn,
                yardLocation1: selectedOption.yardLocation,
                yardBlock1: selectedOption.block,
                yardCell1: selectedOption.cell
            })


        }


    }

    console.log('con data ', cont, ' ', conList, ' ', inId, ' ', igm, ' ', igmtrans);

    useEffect(() => {
        if (process === 'P00203' && !gateIn.gateInId) {
            if (cont !== '' && conList.length > 0) {


                selectSingleCon(cont);

            }

            if (cont === '' && conList.length === 0) {
                //  selectSingleCon('');
                console.log('inId ', inId);

                if (inId) {
                    getSingleGateInData(inId[0], inId[1], inId[2], inId[11], inId[10], inId[8], inId[9], inId[7]);
                }

            }

            if (cont !== '' && conList.length === 0) {

                getSingleCon(cont);

            }


        }

    }, [cont, conList, process, inId, igmtrans])

    useEffect(() => {
        if (process === 'P00203') {
            if (gateIn.gateInId) {
                getSingleGateInData1(gateIn.gateInId);
            }
        }
    }, [])


    const getSingleGateInData1 = (gatein) => {
        axios.get(`${ipaddress}gateIn/getSingleData2?cid=${companyid}&bid=${branchId}&gateinid=${gatein}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                setFlag('edit');

                // Update state with specific values from response.data
                setGateIn(prevState => ({
                    ...prevState,
                    companyId: data.companyId || prevState.companyId,
                    branchId: data.branchId || prevState.branchId,
                    gateInId: data.gateInId || prevState.gateInId,
                    finYear: data.finYear || prevState.finYear,
                    erpDocRefNo: data.erpDocRefNo || prevState.erpDocRefNo,
                    docRefNo: data.docRefNo || prevState.docRefNo,
                    lineNo: data.lineNo || prevState.lineNo,
                    srNo: data.srNo || prevState.srNo,
                    docRefDate: new Date(data.docRefDate) || prevState.docRefDate,
                    profitcentreId: data.profitcentreId || prevState.profitcentreId,
                    viaNo: data.viaNo || prevState.viaNo,
                    containerNo: data.containerNo || prevState.containerNo,
                    containerSize: data.containerSize || prevState.containerSize,
                    containerType: data.containerType || prevState.containerType,
                    containerStatus: data.containerStatus || prevState.containerStatus,
                    containerSealNo: data.containerSealNo || prevState.containerSealNo,
                    customsSealNo: data.customsSealNo || prevState.customsSealNo,
                    actualSealNo: data.actualSealNo || prevState.actualSealNo,
                    vehicleType: data.vehicleType || 'Normal',
                    isoCode: data.isoCode || prevState.isoCode,
                    eirGrossWeight: data.eirGrossWeight || prevState.eirGrossWeight,
                    tareWeight: data.tareWeight || prevState.tareWeight,
                    hazardous: data.hazardous || 'N',
                    hazClass: data.hazClass || prevState.hazClass,
                    sa: data.sa || prevState.sa,
                    sl: data.sl || prevState.sl,
                    portExitNo: data.portExitNo || prevState.portExitNo,
                    portExitDate: new Date(data.portExitDate) || prevState.portExitDate,
                    origin: data.origin || prevState.origin,
                    refer: data.refer || 'N',
                    temperature: data.temperature || prevState.temperature,
                    containerHealth: data.containerHealth || prevState.containerHealth,
                    yardLocation: data.yardLocation || prevState.yardLocation,
                    yardBlock: data.yardBlock || prevState.yardBlock,
                    yardCell: data.yardCell || prevState.yardCell,
                    yardLocation1: data.yardLocation1 || prevState.yardLocation1,
                    yardBlock1: data.yardBlock1 || prevState.yardBlock1,
                    yardCell1: data.yardCell1 || prevState.yardCell1,
                    transporterStatus: data.transporterStatus || 'C',
                    transporterName: data.transporterName || prevState.transporterName,
                    vehicleNo: data.vehicleNo || prevState.vehicleNo,
                    driverName: data.driverName || prevState.driverName,
                    comments: data.comments || prevState.comments,
                    specialRemarks: data.specialRemarks || prevState.specialRemarks,
                    status: data.status || prevState.status,
                    createdBy: data.createdBy || prevState.createdBy,
                    approvedBy: data.approvedBy || prevState.approvedBy,
                    tripType: data.tripType || 'Single',
                    drt: data.drt || 'N',
                    scannerType: data.scannerType || prevState.scannerType,
                    holdStatus: data.holdStatus || prevState.holdStatus,
                    holdType: data.holdType || prevState.holdType,
                    holdUser: data.holdUser || prevState.holdUser,
                    holdDate: new Date(data.holdDate) || prevState.holdDate,
                    holdRemarks: data.holdRemarks || prevState.holdRemarks,
                    pnStatus: data.pnStatus || 'N',
                    jobOrderId: data.jobOrderId || prevState.jobOrderId,
                    jobDate: data.jobDate || prevState.jobDate,
                    inGateInDate: new Date(data.inGateInDate) || new Date(),
                    scanningStatus: data.scanningStatus || prevState.scanningStatus,
                    odcStatus: data.odcStatus || prevState.odcStatus,
                    terminal: data.terminal || prevState.terminal,
                    vessel: data.vessel || prevState.vessel,
                    lowBed: data.lowBed || 'N',
                    createdDate: data.createdDate || null
                }));
                setProfit(profit);
                setVessel(vessel);
                setPn(pn);
                setSa(sa);
                setSl(sl);
                closeGateInSearchModal();
            })
            .catch((error) => {

            })
    }

    const getSingleCon = (con) => {

        if (!con) {
            return;
        }

        axios.get(`${ipaddress}cfigm/getSingleCon1?cid=${companyid}&bid=${branchId}&con=${con}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data[0];

                if (data[33]) {
                    getSingleGateInData(data[33], data[8], data[9], data[22], data[20], data[18], data[19], data[16]);
                    // setProfit(item[16]);
                    // setVessel(item[22]);
                    // setPn(item[20]);
                    // setSa(item[18]);
                    // setSl(item[19]);
                }


            })
            .catch((error) => {

            })
    }

    const [scanDocStatus, setscanDocStatus] = useState([]);

    const getScanDocStatus = () => {
        axios.get(`${ipaddress}jardetail/getScanDoc?cid=${companyid}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setscanDocStatus(response.data);
            })
            .catch((error) => {

            })
    }

    useEffect(() => {
        if (process === 'P00203') {
            getScanDocStatus();
        }
    }, [process])



    const downloadReport = () => {
        setLoading(true);
        axios
            .post(
                `${ipaddress}importReports/importGateInReport?cid=${companyid}&bid=${branchId}&gateInId=${gateIn.gateInId}&erp=${gateIn.erpDocRefNo}&doc=${gateIn.docRefNo}&companyname=${companyname}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            )
            .then((response) => {
                const base64Pdf = response.data; // Assuming the base64 string is returned directly

                // Decode the Base64 string to a binary array
                const binaryData = atob(base64Pdf);

                // Convert binary data to a Uint8Array
                const byteArray = new Uint8Array(binaryData.length);
                for (let i = 0; i < binaryData.length; i++) {
                    byteArray[i] = binaryData.charCodeAt(i);
                }

                // Create a Blob from the Uint8Array
                const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });

                // Generate a URL for the PDF Blob
                const pdfUrl = URL.createObjectURL(pdfBlob);

                // Open the PDF in a new tab and trigger printing
                const pdfWindow = window.open(pdfUrl);
                // pdfWindow.onload = () => {
                //     pdfWindow.print();
                // };


                // const base64Pdf = response.data; // Assuming the base64 string is returned directly

                // // Decode the Base64 string to a binary array
                // const binaryData = atob(base64Pdf);

                // // Convert binary data to a Uint8Array
                // const byteArray = new Uint8Array(binaryData.length);
                // for (let i = 0; i < binaryData.length; i++) {
                //     byteArray[i] = binaryData.charCodeAt(i);
                // }

                // // Create a Blob from the Uint8Array
                // const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });

                // // Generate a URL for the PDF Blob
                // const pdfUrl = URL.createObjectURL(pdfBlob);

                // // Create an anchor element for downloading the file
                // const link = document.createElement("a");
                // link.href = pdfUrl;
                // link.download = "GateInReport.pdf"; // The name of the downloaded file
                // link.click();

                // // Clean up the object URL
                // URL.revokeObjectURL(pdfUrl);

                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching PDF:', error);
                setLoading(false);
            });
    };


    return (
        <div >
            <div>
                <Row>

                    <Modal Modal isOpen={isModalOpenForContainer} onClose={closeContainerModal} toggle={closeContainerModal} style={{ maxWidth: '1100px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                        <ModalHeader toggle={closeContainerModal} style={{
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
                            /> Search Container</h5>



                        </ModalHeader>
                        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                            <Row>
                                <Col md={4}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Search By Container No
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="fobValueInDollar"
                                            value={searchContainer}

                                            onChange={(e) => setSearchContainer(e.target.value)}

                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6} style={{ marginTop: '24px' }}>
                                    <button
                                        className="btn btn-outline-primary btn-margin newButton"
                                        style={{ marginRight: 10 }}
                                        id="submitbtn2"

                                        onClick={() => { getContainers(searchContainer); setCurrentPage2(1); }}
                                    >
                                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                        Search
                                    </button>
                                    <button
                                        className="btn btn-outline-danger btn-margin newButton"
                                        style={{ marginRight: 10 }}
                                        id="submitbtn2"
                                        onClick={clearContainer}
                                    >
                                        <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                        Reset
                                    </button>
                                </Col>

                            </Row>
                            <hr />
                            <Row>
                                <div className='mt-1 table-responsive'>
                                    <table className="table table-bordered table-hover tableHeader">
                                        <thead className="tableHeader">
                                            <tr>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>#</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Container No</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Container Size</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Container Type</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>ISO Code</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Container Status</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Seal No</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Shipping Agent</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Shipping Line</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>IGM Trans Id</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>IGM No</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>IGM Date</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Port</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Port Jo</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Port Jo Date</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Via No</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Profitcentre No</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Profitcentre</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Party Name</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Shipping Agent</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Shipping Line</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Port Name</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Scanner</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Vessel Name</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Reefer</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Low Bed</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>temperature</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>ODC Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <input type="radio" name="radioGroup" onChange={() => selectContainerData('', 'remove')} value={''} />
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            {currentItems2.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <input type="radio" name="radioGroup" onChange={() => selectContainerData(item, 'add')} value={item[0]} />
                                                    </td>
                                                    <td>{item[0]}</td>
                                                    <td>{item[1]}</td>
                                                    <td>{item[2]}</td>
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
                                                    <td>{item[23]}</td>
                                                    <td>{item[24] === "\u0000" ? 'N' : item[24]}</td>
                                                    <td>{item[25]}</td>
                                                    <td>{item[26] === "\u0000" ? 'N' : item[26]}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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
                                </div>
                            </Row>
                        </ModalBody>
                    </Modal>

                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Gate In No
                            </label>
                            <Row>
                                <Col md={8}>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        id="gateInId"
                                        name='gateInId'
                                        value={gateIn.gateInId}
                                        onChange={handleInputChange}
                                        disabled
                                    />
                                </Col>
                                <Col md={3}>
                                    <button
                                        className="btn btn-outline-primary btn-margin newButton"
                                        style={{ fontSize: 13 }}
                                        id="submitbtn2"
                                        onClick={openGateInSearchModal}
                                    >
                                        <FontAwesomeIcon icon={faSearch} />

                                    </button>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Col>
                    <Modal Modal isOpen={isModalOpenForGateInSearch} onClose={closeGateInSearchModal} toggle={closeGateInSearchModal} style={{ maxWidth: '1100px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                        <ModalHeader toggle={closeGateInSearchModal} style={{
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
                            /> Search </h5>



                        </ModalHeader>
                        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                            <Row>
                                <Col md={4}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Search By Container No / Gate in No
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="fobValueInDollar"
                                            value={gateInId}

                                            onChange={(e) => setgateInId(e.target.value)}

                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6} style={{ marginTop: '24px' }}>
                                    <button
                                        className="btn btn-outline-primary btn-margin newButton"
                                        style={{ marginRight: 10 }}
                                        id="submitbtn2"

                                        onClick={() => { searchGateIn(gateInId); setCurrentPage3(1); }}
                                    >
                                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                        Search
                                    </button>
                                    <button
                                        className="btn btn-outline-danger btn-margin newButton"
                                        style={{ marginRight: 10 }}
                                        id="submitbtn2"
                                        onClick={clearGateIn}
                                    >
                                        <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                        Reset
                                    </button>
                                </Col>
                            </Row>
                            <hr />
                            <div className='mt-1 table-responsive'>
                                <table className="table table-bordered table-hover tableHeader">
                                    <thead className="tableHeader">
                                        <tr>
                                            <th scope="col" className="text-center" style={{ color: 'black' }}>#</th>
                                            <th scope="col" className="text-center" style={{ color: 'black' }}>Gate In No</th>
                                            <th scope="col" className="text-center" style={{ color: 'black' }}>Gate In Date</th>
                                            <th scope="col" className="text-center" style={{ color: 'black' }}>Container No</th>
                                            <th scope="col" className="text-center" style={{ color: 'black' }}>Vehicle No</th>
                                            <th scope="col" className="text-center" style={{ color: 'black' }}>Status</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {currentItems3.map((item, index) => (
                                            <tr className='text-center' key={index}>
                                                <td> <input type="radio" name="radioGroup" onChange={() => getSingleGateInData(item[0], item[1], item[2], item[11], item[10], item[8], item[9], item[7])} value={item[0]} /></td>
                                                <td>{item[0]}</td>
                                                <td>{item[6]}</td>
                                                <td>{item[3]}</td>
                                                <td>{item[4]}</td>
                                                <td>{item[5]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                                    <Pagination.First onClick={() => handlePageChange3(1)} />
                                    <Pagination.Prev
                                        onClick={() => handlePageChange3(currentPage3 - 1)}
                                        disabled={currentPage3 === 1}
                                    />
                                    <Pagination.Ellipsis />

                                    {displayPages3().map((pageNumber) => (
                                        <Pagination.Item
                                            key={pageNumber}
                                            active={pageNumber === currentPage3}
                                            onClick={() => handlePageChange3(pageNumber)}
                                        >
                                            {pageNumber}
                                        </Pagination.Item>
                                    ))}

                                    <Pagination.Ellipsis />
                                    <Pagination.Next
                                        onClick={() => handlePageChange3(currentPage3 + 1)}
                                        disabled={currentPage3 === totalPages3}
                                    />
                                    <Pagination.Last onClick={() => handlePageChange3(totalPages3)} />
                                </Pagination>
                            </div>


                        </ModalBody>
                    </Modal>



                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Gate In Date
                            </label>
                            <div style={{ position: 'relative' }}>
                                <DatePicker
                                    selected={gateIn.inGateInDate}
                                    name='inGateInDate'
                                    id="inGateInDate"
                                    dateFormat="dd/MM/yyyy HH:mm"

                                    disabled
                                    className="form-control border-right-0 inputField"

                                    wrapperClassName="custom-react-datepicker-wrapper"
                                    customInput={
                                        <input
                                            style={{
                                                height: "30px",
                                                width: "100%",
                                            }}
                                        />

                                    }

                                />
                                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                            </div>
                        </FormGroup>
                    </Col>




                    {/* <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Created Date
                            </label>
                            <div style={{ position: 'relative' }}>
                                <DatePicker
                                    selected={gateIn.createdDate}
                                    name='createdDate'
                                    id="createdDate"
                                    dateFormat="dd/MM/yyyy HH:mm"
                                    className="form-control"
                                    disabled
                                    wrapperClassName="custom-react-datepicker-wrapper"
                                    customInput={
                                        <input
                                            style={{
                                                height: "30px",
                                                width: "100%",
                                            }}
                                        />

                                    }

                                />
                                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                            </div>
                        </FormGroup>
                    </Col> */}
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                IGM No
                            </label>
                            <Input
                                className="form-control"
                                type="text"
                                id="docRefNo"
                                name='docRefNo'
                                value={gateIn.docRefNo}
                                onChange={handleInputChange}
                                disabled
                            />
                        </FormGroup>
                    </Col>

                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                IGM Date
                            </label>
                            <div style={{ position: 'relative' }}>
                                <DatePicker
                                    selected={gateIn.docRefDate}
                                    id="docRefDate"
                                    name='docRefDate'
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    disabled
                                    wrapperClassName="custom-react-datepicker-wrapper"
                                    customInput={
                                        <input
                                            style={{
                                                height: "30px",
                                                width: "100%",
                                            }}
                                        />

                                    }

                                />
                                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                            </div>

                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Status
                            </label>
                            <Input
                                className="form-control"
                                type="text"
                                id="status"
                                name='status'
                                value={gateIn.status === 'A' ? 'Approved' : ''}
                                onChange={handleInputChange}
                                disabled
                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Created By
                            </label>
                            <Input
                                className="form-control"
                                type="text"
                                id="createdBy"
                                name='createdBy'
                                value={gateIn.createdBy}
                                onChange={handleInputChange}
                                disabled
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Container No
                            </label>
                            {conList.length > 0 ? (
                                gateIn.gateInId === '' ? (
                                    <Input
                                        className="form-control"
                                        type="select"
                                        id="status"
                                        name='status'
                                        value={gateIn.containerNo}
                                        onChange={(e) => {
                                            setGateIn({
                                                ...gateIn,
                                                containerNo: e.target.value
                                            }); selectSingleCon(e.target.value);
                                        }}

                                    >
                                        <option value=""></option>
                                        {conList.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}

                                    </Input>
                                ) : (
                                    <Input
                                        className="form-control"
                                        type="text"
                                        id="status"
                                        name='status'
                                        value={gateIn.containerNo}
                                        disabled

                                    >


                                    </Input>
                                )
                            )
                                :
                                (
                                    gateIn.gateInId === '' ? (
                                        // <Row>
                                        //     <Col md={9}>
                                        //         <Input
                                        //             className="form-control"
                                        //             type="text"
                                        //             id="containerNo"
                                        //             name='containerNo'
                                        //             value={gateIn.containerNo}
                                        //             onChange={handleInputChange}
                                        //             disabled
                                        //         />
                                        //     </Col>
                                        //     <Col md={2}>
                                        //         <button
                                        //             className="btn btn-outline-primary btn-margin newButton"
                                        //             style={{ marginRight: 10, fontSize: 13 }}
                                        //             id="submitbtn2"
                                        //             onClick={openContainerModal}
                                        //         >
                                        //             <FontAwesomeIcon icon={faSearch} />

                                        //         </button>
                                        //     </Col>
                                        // </Row>
                                        <Select

                                            value={{ value: gateIn.containerNo, label: gateIn.containerNo }}
                                            onChange={handleConChange}
                                            onInputChange={getContainersForSearch}
                                            options={containerList}
                                            placeholder="Select Container"
                                            isClearable
                                            id="containerNo"
                                            name="containerNo"
                                            className={`autocompleteHeight}`}

                                            styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    height: 32, // Set height
                                                    minHeight: 32, // Set minimum height
                                                    border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
                                                    boxShadow: "none",
                                                    display: 'flex',
                                                    alignItems: 'center', // Align items vertically
                                                    padding: 0, // Remove padding to control height
                                                    "&:hover": {
                                                        border: "1px solid #ccc",
                                                    },
                                                    borderRadius: '6px', // Add border radius
                                                    "&:hover": {
                                                        border: "1px solid #ccc",
                                                    },
                                                }),
                                                valueContainer: (provided) => ({
                                                    ...provided,
                                                    height: '100%', // Full height of the control
                                                    display: 'flex',
                                                    alignItems: 'center', // Align items vertically
                                                    padding: '0 0.75rem', // Match padding
                                                }),
                                                singleValue: (provided) => ({
                                                    ...provided,
                                                    lineHeight: '32px', // Center text vertically
                                                }),
                                                indicatorSeparator: () => ({
                                                    display: "none",
                                                }),
                                                dropdownIndicator: () => ({
                                                    display: "none",
                                                }),
                                                placeholder: (provided) => ({
                                                    ...provided,
                                                    lineHeight: '32px', // Center placeholder text vertically
                                                    color: "gray",
                                                }),
                                                clearIndicator: (provided) => ({
                                                    ...provided,
                                                    padding: 2, // Remove padding
                                                    display: 'flex',
                                                    alignItems: 'center', // Align clear indicator vertically
                                                }),
                                            }}
                                        />
                                    ) : (
                                        <Row>
                                            <Col md={12}>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    id="containerNo"
                                                    name='containerNo'
                                                    value={gateIn.containerNo}
                                                    onChange={handleInputChange}
                                                    disabled
                                                />
                                            </Col>

                                        </Row>
                                    )
                                )
                            }


                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Container Status
                            </label>
                            <Input
                                className="form-control"
                                type="text"
                                id="containerStatus"
                                name='containerStatus'
                                value={gateIn.containerStatus}
                                onChange={handleInputChange}
                                disabled
                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        ISO Code
                                    </label>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        id="isoCode"
                                        name='isoCode'
                                        value={gateIn.isoCode}
                                        onChange={handleInputChange}
                                        disabled
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Size & Type
                                </label>
                                <Input
                                    className="form-control"
                                    type="text"
                                    id="containerSize"
                                    name='containerSize'
                                    value={gateIn.containerSize + gateIn.containerType}
                                    onChange={handleInputChange}
                                    disabled
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Vehicle No <span style={{ color: 'red' }}>*</span>
                            </label>
                            <Input
                                className="form-control"
                                type="text"
                                id="vehicleNo"
                                name='vehicleNo'
                                value={gateIn.vehicleNo}
                                onChange={handleInputChange}
                            />
                            <div style={{ color: 'red' }} className="error-message">{formErrors.vehicleNo}</div>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Driver
                            </label>
                            <Input
                                className="form-control"
                                type="text"
                                id="driverName"
                                name='driverName'
                                value={gateIn.driverName}
                                onChange={handleInputChange}
                                maxLength={50}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Vehicle Type
                            </label>
                            <Input
                                className="form-control"
                                type="select"
                                id="vehicleType"
                                name='vehicleType'
                                value={gateIn.vehicleType}
                                onChange={handleInputChange}
                            >
                                <option value="Normal" selected>Normal</option>
                                <option value="Lowbed">Low Bed</option>
                                <option value="Slowbed">Semi Low Bed</option>
                                <option value="Genset">Gen Set</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>


                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Transporter Name <span style={{ color: 'red' }}>*</span>
                            </label>
                            <Input
                                className="form-control"
                                type="select"
                                id="transporterName"
                                name='transporterName'
                                value={gateIn.transporterName}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Transporter</option>
                                {transporterData.map((item, index) => (
                                    <option key={index} value={item[1]}>{item[1]}</option>
                                ))}

                            </Input>
                            <div style={{ color: 'red' }} className="error-message">{formErrors.transporterName}</div>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Transporter Status
                            </label>
                            <Input
                                className="form-control"
                                type="select"
                                id="transporterStatus"
                                name='transporterStatus'
                                value={gateIn.transporterStatus}
                                onChange={handleInputChange}
                            >

                                <option value="C" selected="">Own	</option>

                                <option value="P">Hired</option>

                            </Input>

                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                IGM Seal No
                            </label>
                            <Input
                                className="form-control"
                                type="text"
                                id="containerSealNo"
                                name='containerSealNo'
                                value={gateIn.containerSealNo}
                                onChange={handleInputChange}
                                maxLength={15}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Actual Seal No
                            </label>
                            <Input
                                className="form-control"
                                type="text"
                                id="actualSealNo"
                                name='actualSealNo'
                                value={gateIn.actualSealNo}
                                onChange={handleInputChange}
                                maxLength={15}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Port EIR No <span style={{ color: 'red' }}>*</span>
                            </label>
                            <Input
                                className="form-control"
                                type="text"
                                id="portExitNo"
                                name='portExitNo'
                                value={gateIn.portExitNo}
                                onChange={handleInputChange}
                                maxLength={25}
                            />
                            <div style={{ color: 'red' }} className="error-message">{formErrors.portExitNo}</div>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Port EIR Date <span style={{ color: 'red' }}>*</span>
                            </label>
                            <div style={{ position: 'relative' }}>
                                <DatePicker
                                    selected={gateIn.portExitDate}
                                    onChange={handlePortExitDate}
                                    name='portExitDate'
                                    id="portExitDate"
                                    dateFormat="dd/MM/yyyy HH:mm"
                                    className="form-control"
                                    showTimeInput
                                    wrapperClassName="custom-react-datepicker-wrapper"
                                    customInput={
                                        <input
                                            style={{
                                                height: "30px",
                                                width: "100%",
                                            }}
                                        />

                                    }

                                />
                                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                            </div>
                            <div style={{ color: 'red' }} className="error-message">{formErrors.portExitDate}</div>

                        </FormGroup>
                    </Col>

                </Row>
                <Row>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Scanning Status
                            </label>
                            <Input
                                className="form-control"
                                type="select"
                                id="scanningStatus"
                                name='scanningStatus'
                                value={gateIn.scanningStatus}
                                onChange={handleInputChange}
                            >
                                <option value="" selected="">	</option>

                                {/* <option value="Not Scan Need to be Scan">Not Scan Need to be Scan</option>

                                <option value="Scan Cleared">Scan Cleared</option>

                                <option value="Not Scan due to ODC">Not Scan due to ODC</option>

                                <option value="Subject to Clearance from DC/CSD">Subject to Clearance from DC/CSD</option>

                                <option value="not scanned due to scanner failure">not scanned due to scanner failure</option>

                                <option value="Scanning List Unavailable">Scanning List Unavailable</option>

                                <option value="Red Stamp on EIR">Red Stamp on EIR</option> */}
                                {scanDocStatus.map((item, index) => (
                                    <option key={index} value={item.jarDtlId}>{item.jarDtlDesc}</option>
                                ))}
                            </Input>



                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Yard Cell No
                        </label>
                        {/* <Row>

                            <Col md={2}><Input
                                className="form-control"
                                type="text"
                                id="yardLocation"
                                name='yardLocation'
                                value={gateIn.yardLocation}
                                onChange={handleInputChange}
                                disabled
                            /></Col>
                            <Col md={2}><Input
                                className="form-control"
                                type="text"
                                id="yardBlock"
                                name='yardBlock'
                                value={gateIn.yardBlock}
                                onChange={handleInputChange}
                                disabled
                            /></Col>
                            <Col md={2}><Input
                                className="form-control"
                                type="text"
                                id="yardCell"
                                name='yardCell'
                                value={gateIn.yardCell}
                                onChange={handleInputChange}
                                disabled
                            />

                            </Col>

                            <Col md={2}>
                                <button
                                    className="btn btn-outline-primary btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    onClick={() => openYardModal('yard')}
                                >
                                    <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />

                                </button>
                            </Col>
                        </Row> */}

                        <Select

                            value={{ value: gateIn.yardLocation + '-' + gateIn.yardBlock + '-' + gateIn.yardCell, label: gateIn.yardLocation + '-' + gateIn.yardBlock + '-' + gateIn.yardCell }}
                            onChange={handleYardChange}
                            onInputChange={getSearchYardData}
                            options={yardSearchData}
                            placeholder="Select Yard Location"
                            isClearable
                            id="yardLocation"
                            name="yardLocation"
                            className={`autocompleteHeight}`}

                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    height: 32, // Set height
                                    minHeight: 32, // Set minimum height
                                    border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
                                    boxShadow: "none",
                                    display: 'flex',
                                    alignItems: 'center', // Align items vertically
                                    padding: 0, // Remove padding to control height
                                    "&:hover": {
                                        border: "1px solid #ccc",
                                    },
                                    borderRadius: '6px', // Add border radius
                                    "&:hover": {
                                        border: "1px solid #ccc",
                                    },
                                }),
                                valueContainer: (provided) => ({
                                    ...provided,
                                    height: '100%', // Full height of the control
                                    display: 'flex',
                                    alignItems: 'center', // Align items vertically
                                    padding: '0 0.75rem', // Match padding
                                }),
                                singleValue: (provided) => ({
                                    ...provided,
                                    lineHeight: '32px', // Center text vertically
                                }),
                                indicatorSeparator: () => ({
                                    display: "none",
                                }),
                                dropdownIndicator: () => ({
                                    display: "none",
                                }),
                                placeholder: (provided) => ({
                                    ...provided,
                                    lineHeight: '32px', // Center placeholder text vertically
                                    color: "gray",
                                }),
                                clearIndicator: (provided) => ({
                                    ...provided,
                                    padding: 2, // Remove padding
                                    display: 'flex',
                                    alignItems: 'center', // Align clear indicator vertically
                                }),
                            }}
                        />

                    </Col>

                    <Col md={2}>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Block Cell No
                        </label>
                        {/* <Row>

                            <Col md={2}><Input
                                className="form-control"
                                type="text"
                                id="yardLocation1"
                                name='yardLocation1'
                                value={gateIn.yardLocation1}
                                onChange={handleInputChange}
                                disabled
                            /></Col>
                            <Col md={2}><Input
                                className="form-control"
                                type="text"
                                id="yardBlock1"
                                name='yardBlock1'
                                value={gateIn.yardBlock1}
                                onChange={handleInputChange}
                                disabled
                            /></Col>
                            <Col md={2}><Input
                                className="form-control"
                                type="text"
                                id="yardCell1"
                                name='yardCell1'
                                value={gateIn.yardCell1}
                                onChange={handleInputChange}
                                disabled
                            />

                            </Col>

                            <Col md={2}>
                                <button
                                    className="btn btn-outline-primary btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    onClick={() => openYardModal('block')}
                                >
                                    <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />

                                </button>
                            </Col>

                        </Row> */}
                        <Select

                            value={{ value: gateIn.yardLocation1 + '-' + gateIn.yardBlock1 + '-' + gateIn.yardCell1, label: gateIn.yardLocation1 + '-' + gateIn.yardBlock1 + '-' + gateIn.yardCell1 }}
                            onChange={handleYardChange1}
                            onInputChange={getSearchYardData}
                            options={yardSearchData}
                            placeholder="Select Yard Location"
                            isClearable
                            id="yardLocation"
                            name="yardLocation"
                            className={`autocompleteHeight}`}

                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    height: 32, // Set height
                                    minHeight: 32, // Set minimum height
                                    border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
                                    boxShadow: "none",
                                    display: 'flex',
                                    alignItems: 'center', // Align items vertically
                                    padding: 0, // Remove padding to control height
                                    "&:hover": {
                                        border: "1px solid #ccc",
                                    },
                                    borderRadius: '6px', // Add border radius
                                    "&:hover": {
                                        border: "1px solid #ccc",
                                    },
                                }),
                                valueContainer: (provided) => ({
                                    ...provided,
                                    height: '100%', // Full height of the control
                                    display: 'flex',
                                    alignItems: 'center', // Align items vertically
                                    padding: '0 0.75rem', // Match padding
                                }),
                                singleValue: (provided) => ({
                                    ...provided,
                                    lineHeight: '32px', // Center text vertically
                                }),
                                indicatorSeparator: () => ({
                                    display: "none",
                                }),
                                dropdownIndicator: () => ({
                                    display: "none",
                                }),
                                placeholder: (provided) => ({
                                    ...provided,
                                    lineHeight: '32px', // Center placeholder text vertically
                                    color: "gray",
                                }),
                                clearIndicator: (provided) => ({
                                    ...provided,
                                    padding: 2, // Remove padding
                                    display: 'flex',
                                    alignItems: 'center', // Align clear indicator vertically
                                }),
                            }}
                        />
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Tare Weight
                            </label>
                            <Input
                                className="form-control"
                                type="text"
                                id="tareWeight"
                                name='tareWeight'
                                value={gateIn.tareWeight}
                                onChange={handleInputChange}
                                maxLength={16}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                EIR Gross Weight (KGS)
                            </label>
                            <Input
                                className="form-control"
                                type="text"
                                id="eirGrossWeight"
                                name='eirGrossWeight'
                                value={gateIn.eirGrossWeight}
                                maxLength={16}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Container Health
                            </label>
                            <Input
                                className="form-control"
                                type="select"
                                id="containerHealth"
                                name='containerHealth'
                                value={gateIn.containerHealth}
                                onChange={handleInputChange}

                            >
                                <option value="" selected="">	</option>

                                <option value="HDEMAG">Heavy Damage</option>

                                <option value="LDEMAG">Light Damage</option>

                                <option value="MDEMAG">Medium Damage</option>

                                <option value="OK">Healthy</option>
                            </Input>

                        </FormGroup>
                    </Col>

                </Row>
                <Row>
                    <Col md={2}>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Low Bed
                                    </label>
                                    <Input
                                        className="form-control"
                                        type="select"
                                        id="lowBed"
                                        name='lowBed'
                                        value={gateIn.lowBed}
                                        onChange={handleInputChange}

                                    >
                                        <option value="N" selected>No</option>
                                        <option value="Y">Yes</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        ODC Status
                                    </label>
                                    <Input
                                        className="form-control"
                                        type="select"
                                        id="odcStatus"
                                        name='odcStatus'
                                        value={gateIn.odcStatus}
                                        onChange={handleInputChange}
                                    >

                                        <option value="N" selected="">No</option>

                                        <option value="Y">Yes</option>

                                    </Input>

                                </FormGroup>
                            </Col>
                        </Row>

                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Row>
                                <Col md={6}>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        PN 59
                                    </label>
                                    <Input
                                        className="form-control"
                                        type="select"
                                        id="pnStatus"
                                        name='pnStatus'
                                        value={gateIn.pnStatus}
                                        onChange={handleInputChange}
                                    >

                                        <option value="N" selected="">No</option>

                                        <option value="Y">Yes</option>

                                    </Input>
                                </Col>
                                <Col md={6}>

                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Scanning
                                    </label>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        id="scannerType"
                                        name='scannerType'
                                        value={gateIn.scannerType}
                                        onChange={handleInputChange}

                                        disabled
                                    />

                                </Col>
                            </Row>
                        </FormGroup>
                    </Col>



                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Shipping Line
                            </label>
                            <Input
                                className="form-control"
                                type="text"
                                id="sl"
                                name='sl'
                                value={sl}
                                onChange={handleInputChange}
                                disabled
                            />
                        </FormGroup>
                    </Col>

                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Shipping Agent
                            </label>
                            <Input
                                className="form-control"
                                type="text"
                                id="sa"
                                name='sa'
                                value={sa}
                                onChange={handleInputChange}
                                disabled
                            />
                        </FormGroup>
                    </Col>

                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Port
                            </label>
                            <Input
                                className="form-control"
                                type="text"
                                value={pn}
                                name='terminal'
                                id='terminal'
                                disabled
                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                POL
                            </label>
                            <Input
                                className="form-control"
                                type="text"
                                name="origin"
                                value={gateIn.origin}
                                id='origin'
                                disabled
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Job Order No
                            </label>
                            <Input
                                className="form-control"
                                type="text"
                                id="jobOrderId"
                                name='jobOrderId'
                                value={gateIn.jobOrderId}
                                onChange={handleInputChange}
                                disabled
                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Job Order Date
                            </label>
                            <div style={{ position: 'relative' }}>
                                <DatePicker
                                    selected={gateIn.jobDate}
                                    id="jobDate"
                                    name='jobDate'
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    disabled
                                    wrapperClassName="custom-react-datepicker-wrapper"
                                    customInput={
                                        <input
                                            style={{
                                                height: "30px",
                                                width: "100%",
                                            }}
                                        />

                                    }

                                />
                                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                            </div>
                        </FormGroup>
                    </Col>

                    <Col md={2}>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Vessel & Via No
                        </label>
                        <Row>

                            <Col md={6}><Input
                                className="form-control"
                                type="text"
                                id="vessel"
                                name='vessel'
                                value={vessel}
                                onChange={handleInputChange}

                                disabled
                            /></Col>
                            <Col md={6}><Input
                                className="form-control"
                                type="text"
                                id="viaNo"
                                name='viaNo'
                                value={gateIn.viaNo}
                                onChange={handleInputChange}
                                disabled
                            /></Col>
                        </Row>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Customs Seal No
                            </label>
                            <Input
                                className="form-control"
                                type="text"
                                value={gateIn.customsSealNo}
                                onChange={handleInputChange}
                                id='customsSealNo'
                                name='customsSealNo'
                                maxLength={15}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Temperature
                            </label>
                            <Input
                                className="form-control"
                                type="text"
                                id="temperature"
                                name='temperature'
                                value={gateIn.temperature}
                                onChange={handleInputChange}
                                disabled
                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Profitcentre Id
                            </label>
                            <Input
                                className="form-control"
                                type="text"
                                id="profitcentreId"
                                name='profitcentreId'
                                value={profit}
                                onChange={handleInputChange}
                                disabled
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>

                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                IGM Trans Id
                            </label>
                            <Input
                                className="form-control"
                                type="text"
                                id="erpDocRefNo"
                                name='erpDocRefNo'
                                value={gateIn.erpDocRefNo}
                                onChange={handleInputChange}
                                disabled
                            />
                        </FormGroup>
                    </Col>



                    <Col md={2}>
                        <FormGroup>
                            <Row>
                                <Col md={6}>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Movement
                                    </label>
                                    <Input
                                        className="form-control"
                                        type="select"
                                        id="drt"
                                        name='drt'
                                        value={gateIn.drt}
                                        onChange={handleInputChange}
                                    >
                                        <option value="N" selected>CFS</option>
                                        <option value="Y">DRT</option>
                                    </Input>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Trip type
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="tripType"
                                            name='tripType'
                                            value={gateIn.tripType}
                                            onChange={handleInputChange}
                                            disabled
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Row>
                                <Col md={6}>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Hazardous
                                    </label>
                                    <Input
                                        className="form-control"
                                        type="select"
                                        id="hazardous"
                                        name='hazardous'
                                        value={gateIn.hazardous}
                                        onChange={handleInputChange}
                                    >

                                        <option value="N" selected="">No</option>

                                        <option value="Y">Yes</option>

                                    </Input>
                                </Col>
                                <Col md={6}>

                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            HAZ Class
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="hazClass"
                                            name='hazClass'
                                            disabled={gateIn.hazardous === 'N'}
                                            value={gateIn.hazClass}
                                            onChange={handleInputChange}
                                            maxLength={10}
                                        />
                                    </FormGroup>

                                </Col>
                            </Row>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Remarks <span style={{ color: 'red' }}>*</span>
                            </label>
                            <Input
                                className="form-control"
                                type="textarea"
                                maxLength={150}
                                id="comments"
                                style={{ borderColor: formErrors.comments ? 'red' : '' }}
                                name="comments"
                                value={gateIn.comments}
                                onChange={handleInputChange}
                            />
                            <div style={{ color: 'red' }} className="error-message">{formErrors.comments}</div>
                        </FormGroup>
                    </Col>
                </Row>
                {/* <Row>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Reefer
                            </label>
                            <Input
                                className="form-control"
                                type="select"
                                id="refer"
                                name='refer'
                                value={gateIn.refer}
                                onChange={handleInputChange}
                            >
                                <option value="N" selected>No</option>
                                <option value="Y">Yes</option>
                            </Input>

                        </FormGroup>
                    </Col>



                </Row> */}

                <Row>

                    <Modal Modal isOpen={isModalOpenForYard} onClose={closeYardModal} toggle={closeYardModal} style={{ maxWidth: '700px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                        <ModalHeader toggle={closeYardModal} style={{
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
                            /> Search Yard</h5>



                        </ModalHeader>
                        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Search
                                        </label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="fobValueInDollar"
                                            value={yardId}
                                            onChange={(e) => setyardId(e.target.value)}

                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6} style={{ marginTop: '24px' }}>
                                    <button
                                        className="btn btn-outline-primary btn-margin newButton"
                                        style={{ marginRight: 10 }}
                                        id="submitbtn2"
                                        onClick={() => { getYardData(yardId); setCurrentPage1(1) }}
                                    >
                                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                        Search
                                    </button>
                                    <button
                                        className="btn btn-outline-danger btn-margin newButton"
                                        style={{ marginRight: 10 }}
                                        id="submitbtn2"
                                        onClick={() => handleYardReset()}
                                    >
                                        <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                        Reset
                                    </button>
                                </Col>

                            </Row>
                            <hr />
                            <div className='mt-1 table-responsive'>
                                <table className="table table-bordered table-hover tableHeader">
                                    <thead className="tableHeader">
                                        <tr>
                                            <th scope="col" className="text-center" style={{ color: 'black' }}>#</th>
                                            <th scope="col" className="text-center" style={{ color: 'black' }}>YardLocation Id</th>
                                            <th scope="col" className="text-center" style={{ color: 'black' }}>YardLocation Desc</th>
                                            <th scope="col" className="text-center" style={{ color: 'black' }}>Block Id</th>
                                            <th scope="col" className="text-center" style={{ color: 'black' }}>Cell No Row</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='text-center'>
                                            <td>
                                                <input type="radio" onChange={() => selectYardData("", "", "", "")} name="radioGroup" value={''} />
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        {currentItems1.map((item, index) => (


                                            <tr key={index} className='text-center'>
                                                <td>
                                                    <input type="radio" name="radioGroup" onChange={() => selectYardData(item.yardLocationId, item.yardLocationDesc, item.blockId, item.cellNoRow)} value={item.yardLocationId} />
                                                </td>
                                                <td>{item.yardLocationId}</td>
                                                <td>{item.yardLocationDesc}</td>
                                                <td>{item.blockId}</td>
                                                <td>{item.cellNoRow}</td>
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
                                            active={pageNumber === currentPage1}
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





                </Row>
                <Row>


                    {/* <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Special Comment
                            </label>
                            <Input
                                className="form-control"
                                type="text"
                                id="specialRemarks"
                                name='specialRemarks'
                                value={gateIn.specialRemarks}
                                onChange={handleInputChange}
                                disabled
                            />
                        </FormGroup>
                    </Col> */}


                </Row>
                <hr />

                <Row className='text-center'>
                    <Col>
                        <button
                            className="btn btn-outline-primary btn-margin newButton"
                            style={{ marginRight: 10 }}
                            id="submitbtn2"
                            onClick={saveData}
                        >
                            <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                            Save
                        </button>
                        <button
                            className="btn btn-outline-danger btn-margin newButton"
                            style={{ marginRight: 10 }}
                            id="submitbtn2"
                            onClick={cleaGateIn}
                        >
                            <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                            Clear
                        </button>
                        <button
                            className="btn btn-outline-success btn-margin newButton"
                            style={{ marginRight: 10 }}
                            id="submitbtn2"
                            onClick={downloadReport}
                            disabled={gateIn.gateInId === ''}
                        >
                            <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
                            Print Report
                        </button>
                    </Col>
                </Row>
            </div>
        </div >
    )
}
