
import AuthContext from '../Components/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext, useRef } from 'react';
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
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faCalendarAlt, faAdd, faCancel, faXmark, faArrowDown, faPlus, faArrowUp, faEdit, faA, faCamera, faCameraAlt, faPhoneAlt, faCameraRotate, faPrint } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import useAxios from '../Components/useAxios';
import { dark } from '@mui/material/styles/createPalette';
import { toast } from 'react-toastify';
import { error } from 'jquery';

export default function ManualContainerGateIn({ process }) {
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

    const [containerData, setContainerData] = useState({
        companyId: '',
        branchId: '',
        gateNo: '',
        gateInId: '',
        srNo: 0,
        erpDocRefNo: '',
        docRefNo: '',
        lineNo: '',
        gateInDate: null,
        gateInType: '',
        profitcentreId: '',
        processId: '',
        viaNo: '',
        containerNo: '',
        containerSize: '',
        containerType: '',
        containerStatus: '',
        containerSealNo: '',
        actualSealNo: '',
        isoCode: '',
        eirGrossWeight: 0,
        tareWeight: '',
        hazardous: 'N',
        hazClass: '',
        sl: '',
        importerName: '',
        portExitNo: '',
        portExitDate: null,
        refer: 'N',
        containerHealth: '',
        yardLocation: '',
        yardBlock: '',
        yardCell: '',
        transporterName: '',
        transporter: '',
        vehicleNo: '',
        driverName: '',
        vehicleType: 'Normal',
        comments: '',
        holdRemarks: '',
        status: '',
        createdBy: '',
        scannerType: '',
        pnStatus: 'N',
        scanningStatus: 'NONE',
        odcStatus: 'N',
        terminal: '',
        noCheckDigit: 'N',
        vessel: "",
        voyageNo: "",
        lowBed: "N",
        holdType: "N"
    })

    const [isoCodes, setIsoCodes] = useState([]);

    const getIsoContainers = () => {
        axios.get(`${ipaddress}IsoContainer/searchByIsoCode?companyId=${companyid}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const portOptions = data.map(port => ({
                    value: port.isoCode,
                    label: port.isoCode,
                    type: port.containerType,
                    size: port.containerSize,
                    wt: port.tareWeight
                }))
                setIsoCodes(portOptions);
            })
            .catch((error) => {

            })
    }

    const [transporterData, setTransporterData] = useState([]);

    const getTransporter = () => {
        axios.get(`${ipaddress}party/getTrans?cid=${companyid}&bid=${branchId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const portOptions = data.map(port => ({
                    value: port[0],
                    label: port[1],
                }))

                setTransporterData(portOptions);
            })
            .catch((error) => {

            })
    }

    const [ports, setPorts] = useState([]);

    const getPortData = () => {
        axios.get(`${ipaddress}manualContainerGateIn/getports?cid=${companyid}&bid=${branchId}`, {
            headers: `Bearer ${jwtToken}`
        })
            .then((response) => {
                const data = response.data;
                setPorts(data);
            })
            .catch((error) => {
                setPorts([]);
            })
    }

    useEffect(() => {
        if (process === 'P00212') {
            getIsoContainers();
            getTransporter();
            getPortData();
        }
    }, [process])

    const handleIsoChange = async (selectedOption, { action }) => {
        if (action === 'clear') {
            setContainerData({
                ...containerData,
                isoCode: '',
                containerSize: '',
                containerType: '',
                tareWeight: ''
            })
        }
        else {
            setContainerData({
                ...containerData,
                isoCode: selectedOption.value,
                containerSize: selectedOption.size,
                containerType: selectedOption.type,
                tareWeight: selectedOption.wt
            })

            setFormErrors((prevErrors) => ({
                ...prevErrors,
                isoCode: "",
            }));
        }
    }

    const handleTransporterChange = async (selectedOption, { action }) => {
        if (action === 'clear') {
            setContainerData({
                ...containerData,
                transporter: '',
                transporterName: ''
            })
        }
        else {
            setContainerData({
                ...containerData,
                transporter: selectedOption.value,
                transporterName: selectedOption.label
            })

            // setContainerErrors((prevErrors) => ({
            //     ...prevErrors,
            //     iso: "",
            // }));
        }
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
            setContainerData({
                ...containerData,
                yardLocation: '',
                yardBlock: '',
                yardCell: ''
            })

        }
        else {
            setContainerData({
                ...containerData,
                yardLocation: selectedOption.yardLocation,
                yardBlock: selectedOption.block,
                yardCell: selectedOption.cell
            })


        }


    }

    const [linerData, setLinerData] = useState([]);

    const getLinerData = (val) => {
        if (val === '') {
            setLinerData([]);
            return;
        }

        axios.get(`${ipaddress}party/getLiner?cid=${companyid}&bid=${branchId}&val=${val}`, {
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
                setLinerData(portOptions);
            })
            .catch((error) => {

            })
    }
    const [linerName, setLinerName] = useState('');
    const handleLinerChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setLinerName('');
            setContainerData({
                ...containerData,
                sl: ''
            })

        }
        else {
            setLinerName(selectedOption ? selectedOption.label : '');
            setContainerData({
                ...containerData,
                sl: selectedOption.value
            })

        }
    };

    function handleInputChange(e) {
        const inputValue = e;
        const numericInput = inputValue.replace(/[^0-9.]/g, '');
        const parts = numericInput.split('.');
        const integerPart = parts[0];
        let decimalPart = parts[1];

        // Limit decimal places if needed
        if (decimalPart !== undefined) {
            decimalPart = `.${decimalPart.slice(0, 3)}`;
        }

        const sanitizedInput = decimalPart !== undefined ? `${integerPart}${decimalPart}` : integerPart;
        return sanitizedInput;
    };

    const handleContainerNoValidation1 = (containerNo) => {
        const containerNoUpper = containerNo.toUpperCase();
        console.log(containerNoUpper);

        let s = 0;
        let x = 0;

        // Char values mapping
        const charVal = {
            A: "10",
            B: "12",
            C: "13",
            D: "14",
            E: "15",
            F: "16",
            G: "17",
            H: "18",
            I: "19",
            J: "20",
            K: "21",
            L: "23",
            M: "24",
            N: "25",
            O: "26",
            P: "27",
            Q: "28",
            R: "29",
            S: "30",
            T: "31",
            U: "32",
            V: "34",
            W: "35",
            X: "36",
            Y: "37",
            Z: "38",
        };

        const len = containerNoUpper.length;

        if (len !== 11) {
            return false;
        } else {
            for (let i = 0; i < len - 1; i++) {
                const asciiVal = containerNoUpper.charCodeAt(i);
                if (asciiVal >= 65 && asciiVal <= 90) { // A-Z
                    s += Math.pow(2, i) * parseInt(charVal[containerNoUpper.charAt(i)]);
                } else {
                    s += Math.pow(2, i) * parseInt(containerNoUpper.charAt(i));
                }
            }

            x = s % 11;

            if (
                x === parseInt(containerNoUpper.charAt(len - 1)) ||
                (x === 10 && containerNoUpper.charAt(len - 1) === "0")
            ) {
                // Valid container number
                return true;
            } else {
                // Invalid container number
                return false;
            }
        }
    };

    const [formErros, setFormErrors] = useState({
        containerNo: '',
        vehicleNo: '',
        driverName: '',
        isoCode: '',
        vessel: '',
        containerSealNo: '',
        actualSealNo: '',
        portExitDate: '',
        comments: ''
    })

    const handleContainerChange = (e) => {
        const { name, value } = e.target;
        let sanitizedValue = value;

        //Sanitize input for specific fields
        if (['eirGrossWeight'].includes(name)) {
            sanitizedValue = handleInputChange(value);
        }
        setContainerData(prevState => ({
            ...prevState,
            [name]: sanitizedValue
        }));

        if (name === 'containerNo') {
            if (containerData.noCheckDigit === 'N') {
                if (!handleContainerNoValidation1(value)) {
                    setFormErrors((prevErrors) => ({
                        ...prevErrors,
                        [name]: "Invalid Container No.",
                    }));
                }
                else {
                    setFormErrors((prevErrors) => ({
                        ...prevErrors,
                        [name]: "",
                    }));
                }
            }
            else {
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "",
                }));
            }

        }
        else {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "",
            }));
        }

        if (name === "noCheckDigit") {
            if (value === 'Y') {
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    ['containerNo']: "",
                }));
            }
            else {

                if (!handleContainerNoValidation1(containerData.containerNo)) {
                    setFormErrors((prevErrors) => ({
                        ...prevErrors,
                        ['containerNo']: "Invalid Container No.",
                    }));
                }
                else {
                    setFormErrors((prevErrors) => ({
                        ...prevErrors,
                        ['containerNo']: "",
                    }));
                }
            }
        }

    }

    const handleClear = () => {
        setFormErrors({
            containerNo: '',
            vehicleNo: '',
            driverName: '',
            isoCode: '',
            vessel: '',
            containerSealNo: '',
            actualSealNo: '',
            portExitDate: '',
            comments: ''
        })
        setLinerName('');
        setContainerData({
            companyId: '',
            branchId: '',
            gateNo: '',
            gateInId: '',
            srNo: 0,
            erpDocRefNo: '',
            docRefNo: '',
            lineNo: '',
            gateInDate: null,
            gateInType: '',
            profitcentreId: '',
            processId: '',
            viaNo: '',
            containerNo: '',
            containerSize: '',
            containerType: '',
            containerStatus: '',
            containerSealNo: '',
            actualSealNo: '',
            isoCode: '',
            eirGrossWeight: 0,
            tareWeight: '',
            hazardous: 'N',
            hazClass: '',
            sl: '',
            importerName: '',
            portExitNo: '',
            portExitDate: null,
            refer: 'N',
            containerHealth: '',
            yardLocation: '',
            yardBlock: '',
            yardCell: '',
            transporterName: '',
            transporter: '',
            vehicleNo: '',
            driverName: '',
            vehicleType: 'Normal',
            comments: '',
            holdRemarks: '',
            status: '',
            createdBy: '',
            scannerType: '',
            pnStatus: 'N',
            scanningStatus: 'NONE',
            odcStatus: 'N',
            terminal: '',
            noCheckDigit: 'N',
            vessel: "",
            voyageNo: "",
            lowBed: "N",
            holdType: "N"
        })
    }

    const handleSave = () => {
        setLoading(true);
        setFormErrors({
            containerNo: '',
            vehicleNo: '',
            driverName: '',
            isoCode: '',
            vessel: '',
            containerSealNo: '',
            actualSealNo: '',
            portExitDate: '',
            comments: ''
        })

        let errors = {};

        if (!containerData.containerNo) {
            errors.containerNo = "Container no is required."
        }
        else {
            if (!handleContainerNoValidation1(containerData.containerNo)) {
                errors.containerNo = "Invalid container no."
            }
        }

        if (!containerData.vehicleNo) {
            errors.vehicleNo = "Vehicle no is required."
        }

        if (!containerData.driverName) {
            errors.driverName = "Driver name is required."
        }

        if (!containerData.isoCode) {
            errors.isoCode = "ISO code is required."
        }

        if (!containerData.vessel) {
            errors.vessel = "Vessel is required."
        }

        if (!containerData.containerSealNo) {
            errors.containerSealNo = "Seal no 1 is required."
        }

        if (!containerData.actualSealNo) {
            errors.actualSealNo = "Seal no 2 is required."
        }

        if (!containerData.portExitDate) {
            errors.portExitDate = "Port exit date is required."
        }

        if (!containerData.comments) {
            errors.comments = "Remarks is required."
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setLoading(false);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            })
            return;
        }

        axios.post(`${ipaddress}manualContainerGateIn/saveManualCOntainerGateIn?cid=${companyid}&bid=${branchId}&user=${userId}`, containerData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data.manual;
                const slname = response.data.slName;

                setContainerData({
                    companyId: data.companyId || '',
                    branchId: data.branchId || '',
                    gateNo: data.gateNo || '',
                    gateInId: data.gateInId || '',
                    srNo: data.srNo || 0,
                    erpDocRefNo: data.erpDocRefNo || '',
                    docRefNo: data.docRefNo || '',
                    lineNo: data.lineNo || '',
                    gateInDate: new Date(data.gateInDate) || null,
                    gateInType: data.gateInType || '',
                    profitcentreId: data.profitcentreId || '',
                    processId: data.processId || '',
                    viaNo: data.viaNo || '',
                    containerNo: data.containerNo || '',
                    containerSize: data.containerSize || '',
                    containerType: data.containerType || '',
                    containerStatus: data.containerStatus || '',
                    containerSealNo: data.containerSealNo || '',
                    actualSealNo: data.actualSealNo || '',
                    isoCode: data.isoCode || '',
                    eirGrossWeight: data.eirGrossWeight || 0,
                    tareWeight: data.tareWeight || '',
                    hazardous: data.hazardous || 'N',
                    hazClass: data.hazClass || '',
                    sl: data.sl || '',
                    importerName: data.importerName || '',
                    portExitNo: data.portExitNo || '',
                    portExitDate: new Date(data.portExitDate) || null,
                    refer: data.refer || 'N',
                    containerHealth: data.containerHealth || '',
                    yardLocation: data.yardLocation || '',
                    yardBlock: data.yardBlock || '',
                    yardCell: data.yardCell || '',
                    transporterName: data.transporterName || '',
                    transporter: data.transporter || '',
                    vehicleNo: data.vehicleNo || '',
                    driverName: data.driverName || '',
                    vehicleType: data.vehicleType || 'Normal',
                    comments: data.comments || '',
                    holdRemarks: data.holdRemarks || '',
                    status: data.status === 'A' ? 'Approved' : data.status || '',
                    createdBy: data.createdBy || '',
                    scannerType: data.scannerType || '',
                    pnStatus: data.pnStatus || 'N',
                    scanningStatus: data.scanningStatus || 'NONE',
                    odcStatus: data.odcStatus || 'N',
                    terminal: data.terminal || '',
                    noCheckDigit: data.noCheckDigit || 'N',
                    vessel: data.vessel || "",
                    voyageNo: data.vessel || "",
                    lowBed: data.lowBed || "N",
                    holdType: data.holdType || "N"
                })
                setLinerName(slname);

                setLoading(false);
                toast.success("Data save successfully!!", {
                    autoClose: 800
                })
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })
    }

    const [isModalOpenForGateIn, setIsModalOpenForGateIn] = useState(false);
    const [searchId, setSearchId] = useState('');
    const [searchData, setSearchData] = useState([]);

    const search = (val) => {
        setLoading(true);
        // if (!val) {
        //     toast.error("Please enter the search value", {
        //         autoClose: 800
        //     })
        //     setLoading(false);
        //     return;
        // }

        axios.get(`${ipaddress}manualContainerGateIn/search?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setSearchData(response.data);
                toast.success("Data found successfully!!!", {
                    autoClose: 800
                })
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setSearchData([]);
                setLoading(false);
            })
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(searchData.length / itemsPerPage);

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


    const openGateInModal = () => {
        setIsModalOpenForGateIn(true);
        search('');
    }

    const closeGateInModal = () => {
        setIsModalOpenForGateIn(false);
        setSearchId('');
        setSearchData([]);
    }

    const handleSearchReset = () => {
        setSearchId('');
        search('');
    }

    const selectGateInData = (gateInId) => {
        if (!gateInId) {
            return;
        }
        axios.get(`${ipaddress}manualContainerGateIn/getSelectedData?cid=${companyid}&bid=${branchId}&val=${gateInId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data.manual;
                const slname = response.data.slName;

                setContainerData({
                    companyId: data.companyId || '',
                    branchId: data.branchId || '',
                    gateNo: data.gateNo || '',
                    gateInId: data.gateInId || '',
                    srNo: data.srNo || 0,
                    erpDocRefNo: data.erpDocRefNo || '',
                    docRefNo: data.docRefNo || '',
                    lineNo: data.lineNo || '',
                    gateInDate: new Date(data.gateInDate) || null,
                    gateInType: data.gateInType || '',
                    profitcentreId: data.profitcentreId || '',
                    processId: data.processId || '',
                    viaNo: data.viaNo || '',
                    containerNo: data.containerNo || '',
                    containerSize: data.containerSize || '',
                    containerType: data.containerType || '',
                    containerStatus: data.containerStatus || '',
                    containerSealNo: data.containerSealNo || '',
                    actualSealNo: data.actualSealNo || '',
                    isoCode: data.isoCode || '',
                    eirGrossWeight: data.eirGrossWeight || 0,
                    tareWeight: data.tareWeight || '',
                    hazardous: data.hazardous || 'N',
                    hazClass: data.hazClass || '',
                    sl: data.sl || '',
                    importerName: data.importerName || '',
                    portExitNo: data.portExitNo || '',
                    portExitDate: new Date(data.portExitDate) || null,
                    refer: data.refer || 'N',
                    containerHealth: data.containerHealth || '',
                    yardLocation: data.yardLocation || '',
                    yardBlock: data.yardBlock || '',
                    yardCell: data.yardCell || '',
                    transporterName: data.transporterName || '',
                    transporter: data.transporter || '',
                    vehicleNo: data.vehicleNo || '',
                    driverName: data.driverName || '',
                    vehicleType: data.vehicleType || 'Normal',
                    comments: data.comments || '',
                    holdRemarks: data.holdRemarks || '',
                    status: data.status === 'A' ? 'Approved' : data.status || '',
                    createdBy: data.createdBy || '',
                    scannerType: data.scannerType || '',
                    pnStatus: data.pnStatus || 'N',
                    scanningStatus: data.scanningStatus || 'NONE',
                    odcStatus: data.odcStatus || 'N',
                    terminal: data.terminal || '',
                    noCheckDigit: data.noCheckDigit || 'N',
                    vessel: data.vessel || "",
                    voyageNo: data.vessel || "",
                    lowBed: data.lowBed || "N",
                    holdType: data.holdType || "N"
                })
                setLinerName(slname);

                toast.success("Data found successfully!!", {
                    autoClose: 800
                })
                closeGateInModal();

            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
            })
    }



    const downloadGateInReport = () => {


        setLoading(true);
        axios
            .post(
                `${ipaddress}importReports/importManualGateInReport?cid=${companyid}&bid=${branchId}&gate=${containerData.gateInId}`,
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
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            });
    };

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

            <Modal Modal isOpen={isModalOpenForGateIn} onClose={closeGateInModal} toggle={closeGateInModal} style={{ maxWidth: '1000px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                <ModalHeader toggle={closeGateInModal} style={{
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
                    /> Search Empty Gate In Records</h5>



                </ModalHeader>
                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel" htmlFor="sbRequestId">Search By Gate In No / Vehicle No</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="searchId"
                                    value={searchId}
                                    onChange={(e) => setSearchId(e.target.value)}

                                />
                            </FormGroup>
                        </Col>

                        <Col md={4} style={{ marginTop: 24 }}>
                            <button
                                className="btn btn-outline-success btn-margin newButton"
                                id="submitbtn2"
                                style={{ fontSize: 13, marginRight: 5 }}
                                onClick={() => search(searchId)}
                            >
                                <FontAwesomeIcon icon={faSearch} style={{ marginRight: "1px" }} />
                                Search
                            </button>
                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ fontSize: 13 }}
                                id="submitbtn2"
                                onClick={handleSearchReset}
                            >
                                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "1px" }} />
                                Reset
                            </button>
                        </Col>
                    </Row>
                    <hr />
                    <div className="mt-1 table-responsive ">
                        <table className="table table-bordered table-hover tableHeader">
                            <thead className='tableHeader'>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Gate In No</th>
                                    <th scope="col">Gate In Date</th>
                                    <th scope="col">Container No</th>
                                    <th scope="col">Vehicle No</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input type="radio" onChange={() => selectGateInData(item[0])} name="radioGroup" />
                                        </td>
                                        <td>{item[0]}</td>
                                        <td>{item[1]}</td>
                                        <td>{item[2]}</td>
                                        <td>{item[3]}</td>
                                    </tr>
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
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Gate In No</label>
                        <Row>
                            <Col md={8}>
                                <Input
                                    type="text"
                                    name="gateInId"
                                    id='gateInId'
                                    value={containerData.gateInId}
                                    disabled
                                    className="form-control inputField"
                                />
                            </Col>
                            <Col md={4}>
                                <button
                                    className="btn btn-outline-primary btn-margin newButton"
                                    id="submitbtn2"
                                    onClick={openGateInModal}
                                    style={{ fontSize: 13, marginRight: 5 }}
                                >
                                    <FontAwesomeIcon icon={faSearch} style={{ marginRight: "1px" }} />

                                </button>
                            </Col>
                        </Row>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Gate In Date</label>
                        <div style={{ position: 'relative' }}>
                            <DatePicker
                                selected={containerData.gateInDate}
                                id='gateInDate'
                                name='gateInDate'
                                disabled
                                dateFormat="dd/MM/yyyy HH:mm"
                                className="form-control border-right-0 InputField"
                                customInput={<Input style={{ width: '100%' }} />}
                                wrapperClassName="custom-react-datepicker-wrapper"
                            />
                            <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                        </div>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Container No</label> <span style={{ color: 'red' }}>*</span>
                        <Input
                            type="text"
                            name="containerNo"
                            id='containerNo'
                            value={containerData.containerNo}
                            maxLength={11}
                            disabled={containerData.gateInId != ''}
                            onChange={handleContainerChange}
                            className={`form-control inputField ${formErros.containerNo ? 'error-border' : ''}`}
                        />
                        <div style={{ color: 'red' }} className="error-message">{formErros.containerNo}</div>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Cont Size & Type</label>
                        <Row>
                            <Col md={6}>
                                <Input
                                    type="text"
                                    name="containerSize"
                                    id='containerSize'
                                    value={containerData.containerSize}

                                    className="form-control inputField"
                                    disabled
                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    type="text"
                                    name="containerType"
                                    id='containerType'
                                    value={containerData.containerType}
                                    className="form-control inputField"
                                    disabled
                                />
                            </Col>
                        </Row>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Status</label>
                        <Input
                            type="text"
                            name="status"
                            id='status'
                            value={containerData.status}
                            className="form-control inputField"
                            disabled
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Created By</label>
                        <Input
                            type="text"
                            name="createdBy"
                            id='createdBy'
                            value={containerData.createdBy}
                            className="form-control inputField"
                            disabled
                        />
                    </FormGroup>
                </Col>

            </Row>
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Vehicle No</label> <span style={{ color: 'red' }}>*</span>
                        <Input
                            type="text"
                            name="vehicleNo"
                            id='vehicleNo'
                            value={containerData.vehicleNo}
                            onChange={handleContainerChange}
                            maxLength={15}
                            className={`form-control inputField ${formErros.vehicleNo ? 'error-border' : ''}`}
                        />
                        <div style={{ color: 'red' }} className="error-message">{formErros.vehicleNo}</div>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Driver name</label> <span style={{ color: 'red' }}>*</span>
                        <Input
                            type="text"
                            name="driverName"
                            id='driverName'
                            value={containerData.driverName}
                            onChange={handleContainerChange}
                            maxLength={50}
                            className={`form-control inputField ${formErros.driverName ? 'error-border' : ''}`}
                        />
                        <div style={{ color: 'red' }} className="error-message">{formErros.driverName}</div>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">ISO Code</label> <span style={{ color: 'red' }}>*</span>
                        <Select

                            value={{ value: containerData.isoCode, label: containerData.isoCode }}
                            onChange={handleIsoChange}
                            options={isoCodes}
                            placeholder="Select Container"
                            isClearable
                            id="isoCode"
                            name="isoCode"
                            className={`autocompleteHeight ${formErros.isoCode ? 'error-border' : ''}`}

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
                        <div style={{ color: 'red' }} className="error-message">{formErros.isoCode}</div>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Tare Wt</label>
                        <Input
                            type="text"
                            name="tareWeight"
                            id='tareWeight'
                            disabled
                            value={containerData.tareWeight}
                            className="form-control inputField"
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Transporter Name</label>
                        <Select

                            value={{ value: containerData.transporter, label: containerData.transporterName }}
                            onChange={handleTransporterChange}
                            options={transporterData}
                            placeholder="Select Transporter"
                            isClearable
                            id="transporter"
                            name="transporter"
                            className={`autocompleteHeight `}

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
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Vessel</label> <span style={{ color: 'red' }}>*</span>
                        <Input
                            type="text"
                            name="vessel"
                            id='vessel'
                            value={containerData.vessel}
                            maxLength={50}
                            onChange={handleContainerChange}
                            className={`form-control inputField ${formErros.vessel ? 'error-border' : ''}`}
                        />
                        <div style={{ color: 'red' }} className="error-message">{formErros.vessel}</div>
                    </FormGroup>
                </Col>

            </Row>

            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Via No</label>
                        <Input
                            type="text"
                            name="viaNo"
                            id='viaNo'
                            value={containerData.viaNo}
                            maxLength={7}
                            onChange={handleContainerChange}
                            className="form-control inputField"
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Seal No 1</label> <span style={{ color: 'red' }}>*</span>
                        <Input
                            type="text"
                            name="containerSealNo"
                            id='containerSealNo'
                            value={containerData.containerSealNo}
                            maxLength={15}
                            onChange={handleContainerChange}
                            className={`form-control inputField ${formErros.containerSealNo ? 'error-border' : ''}`}
                        />
                        <div style={{ color: 'red' }} className="error-message">{formErros.containerSealNo}</div>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Seal No 2</label> <span style={{ color: 'red' }}>*</span>
                        <Input
                            type="text"
                            name="actualSealNo"
                            id='actualSealNo'
                            maxLength={15}
                            onChange={handleContainerChange}
                            value={containerData.actualSealNo}
                            className={`form-control inputField ${formErros.actualSealNo ? 'error-border' : ''}`}
                        />
                        <div style={{ color: 'red' }} className="error-message">{formErros.actualSealNo}</div>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Voyage</label>
                        <Input
                            type="text"
                            name="voyageNo"
                            id='voyageNo'
                            value={containerData.voyageNo}
                            maxLength={50}
                            onChange={handleContainerChange}
                            className="form-control inputField"
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Hazardous</label>
                        <Input
                            type="select"
                            name="hazardous"
                            id='hazardous'
                            value={containerData.hazardous}
                            maxLength={1}
                            onChange={handleContainerChange}
                            className="form-control inputField"
                        >
                            <option value="N">No</option>
                            <option value="Y">Yes</option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">EIR Gross Weight</label>
                        <Input
                            type="text"
                            name="eirGrossWeight"
                            id='eirGrossWeight'
                            maxLength={7}
                            onChange={handleContainerChange}
                            value={containerData.eirGrossWeight}
                            className="form-control inputField"
                        />
                    </FormGroup>
                </Col>

            </Row>
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Reefer</label>
                        <Input
                            type="select"
                            name="refer"
                            id='refer'
                            value={containerData.refer}
                            onChange={handleContainerChange}
                            className="form-control inputField"
                        >
                            <option value="N">No</option>
                            <option value="Y">Yes</option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Haz Class</label>
                        <Input
                            type="text"
                            name="hazClass"
                            id='hazClass'
                            value={containerData.hazClass}
                            maxLength={10}
                            onChange={handleContainerChange}
                            className="form-control inputField"
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Low Bed</label>
                        <Input
                            type="select"
                            name="lowBed"
                            id='lowBed'
                            value={containerData.lowBed}
                            onChange={handleContainerChange}
                            className="form-control inputField"
                        >
                            <option value="N">No</option>
                            <option value="Y">Yes</option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Shipping Line</label>
                        <Select
                            value={{ value: containerData.sl, label: linerName }}
                            onChange={handleLinerChange}
                            onInputChange={getLinerData}
                            options={linerData}
                            placeholder="Select Shipping Line"
                            isClearable
                            id="sl"
                            name="sl"
                            className='autocompleteHeight'

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
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Importer Name</label>
                        <Input
                            type="text"
                            name="importerName"
                            id='importerName'
                            value={containerData.importerName}
                            onChange={handleContainerChange}
                            className="form-control inputField"
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Yard Cell No</label>
                        <Select

                            value={{ value: containerData.yardLocation + '-' + containerData.yardBlock + '-' + containerData.yardCell, label: containerData.yardLocation + '-' + containerData.yardBlock + '-' + containerData.yardCell }}
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
                    </FormGroup>
                </Col>

            </Row>
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Port Exit No</label>
                        <Input
                            type="text"
                            name="portExitNo"
                            id='portExitNo'
                            value={containerData.portExitNo}
                            onChange={handleContainerChange}
                            maxLength={25}
                            className="form-control inputField"
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Port Exit Date</label> <span style={{ color: 'red' }}>*</span>
                        <div style={{ position: 'relative' }}>
                            <DatePicker
                                selected={containerData.portExitDate}
                                onChange={(date) => {
                                    setContainerData({
                                        ...containerData,
                                        portExitDate: date
                                    });
                                    setFormErrors({
                                        ...formErros,
                                        portExitDate: ''
                                    })
                                }}
                                id='portExitDate'
                                name='portExitDate'
                                dateFormat="dd/MM/yyyy HH:mm"
                                showTimeInput
                                className={`form-control border-right-0 InputField ${formErros.portExitDate ? 'error-border' : ''}`}
                                customInput={<Input style={{ width: '100%' }} />}
                                wrapperClassName="custom-react-datepicker-wrapper"
                            />
                            <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                        </div>

                        <div style={{ color: 'red' }} className="error-message">{formErros.portExitDate}</div>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Vehicle type</label>
                        <Input
                            type="select"
                            name="vehicleType"
                            id='vehicleType'
                            value={containerData.vehicleType}
                            onChange={handleContainerChange}
                            className="form-control inputField"
                        >
                            <option value="Normal">Normal</option>

                            <option value="Lowbed">Low Bed</option>

                            <option value="Slowbed">Semi Low Bed</option>

                            <option value="Genset">Gen Set</option>
                        </Input>
                    </FormGroup>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Port</label>
                        <Input
                            type="select"
                            name="terminal"
                            id='terminal'
                            value={containerData.terminal}
                            onChange={handleContainerChange}
                            className="form-control inputField"
                        >
                            <option value=""></option>
                            {ports.map((item, index) => (
                                <option key={index} value={item.portCode}>{item.portName}</option>
                            ))}
                        </Input>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Container Health</label>
                        <Input
                            type="select"
                            name="containerHealth"
                            id='containerHealth'
                            value={containerData.containerHealth}
                            onChange={handleContainerChange}
                            className="form-control inputField"
                        >
                            <option value="" selected="">	</option>

                            <option value="HDEMAG">Heavy Damage</option>

                            <option value="LDEMAG">Light Damage</option>

                            <option value="	MDEMAG">Medium Damage</option>

                            <option value="OK">Healthy</option>
                        </Input>
                    </FormGroup>
                </Col>


                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Scanning Status</label>
                        <Input
                            type="select"
                            name="scanningStatus"
                            id='scanningStatus'
                            value={containerData.scanningStatus}
                            onChange={handleContainerChange}
                            className="form-control inputField"
                        >
                            <option value="NONE">NONE</option>

                            <option value="Not Scan Need to be Scan">Not Scan Need to be Scan</option>

                            <option value="Scan Cleared">Scan Cleared</option>

                            <option value="Not Scan due to ODC">Not Scan due to ODC</option>

                            <option value="Subject to Clearance from DC/CSD">Subject to Clearance from DC/CSD</option>

                            <option value="not scanned due to scanner failure">not scanned due to scanner failure</option>

                            <option value="Scanning List Unavailable">Scanning List Unavailable</option>

                            <option value="Red Stamp on EIR">Red Stamp on EIR</option>
                        </Input>

                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Scanning</label>
                        <Input
                            type="select"
                            name="scannerType"
                            id='scannerType'
                            value={containerData.scannerType}
                            onChange={handleContainerChange}
                            className="form-control inputField"
                        >
                            <option value=""></option>
                            <option value="Mobile">Mobile</option>
                            <option value="Relocatable">Relocatable</option>
                            <option value="DTS">DTS</option>
                            <option value="BOTH">BOTH</option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <Row>
                            <Col md={6}>
                                <label className="forlabel">ODC</label>
                                <Input
                                    type="select"
                                    name="odcStatus"
                                    id='odcStatus'
                                    value={containerData.odcStatus}
                                    onChange={handleContainerChange}
                                    className="form-control inputField"
                                >
                                    <option value="N">No</option>
                                    <option value="Y">Yes</option>
                                </Input>
                            </Col>
                            <Col md={6}>
                                <label className="forlabel">PN59</label>
                                <Input
                                    type="select"
                                    name="pnStatus"
                                    id='pnStatus'
                                    value={containerData.pnStatus}
                                    onChange={handleContainerChange}
                                    className="form-control inputField"
                                >
                                    <option value="N">No</option>
                                    <option value="Y">Yes</option>
                                </Input>
                            </Col>
                        </Row>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">No Check Digit</label>
                        <Input
                            type="select"
                            name="noCheckDigit"
                            id='noCheckDigit'
                            value={containerData.noCheckDigit}
                            onChange={handleContainerChange}
                            className="form-control inputField"
                        >
                            <option value="N">No</option>
                            <option value="Y">Yes</option>
                        </Input>
                    </FormGroup>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Hold Type</label>
                        <Input
                            type="select"
                            name="holdType"
                            id='holdType'
                            value={containerData.holdType}
                            onChange={handleContainerChange}
                            className="form-control inputField"
                        >

                            <option value="N" selected="">No</option>

                            <option value="T">Tariff</option>

                            <option value="CSD">Red Stamp/CSD Hold</option>

                            <option value="NotScan"> Not Scan</option>

                        </Input>
                    </FormGroup>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Remarks</label> <span style={{ color: 'red' }}>*</span>
                        <Input
                            type="textarea"
                            name="comments"
                            id='comments'
                            value={containerData.comments}
                            maxLength={150}
                            onChange={handleContainerChange}
                            className={`form-control inputField ${formErros.comments ? 'error-border' : ''}`}
                        />
                        <div style={{ color: 'red' }} className="error-message">{formErros.comments}</div>
                    </FormGroup>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel">Hold Remarks</label>
                        <Input
                            type="textarea"
                            name="holdRemarks"
                            id='holdRemarks'
                            value={containerData.holdRemarks}
                            onChange={handleContainerChange}
                            maxLength={250}
                            className="form-control inputField"
                        />
                    </FormGroup>
                </Col>

            </Row>
            <hr />
            <Row className='text-center'>
                <Col>
                    <button
                        className="btn btn-outline-primary btn-margin newButton"
                        style={{ marginRight: 10 }}
                        id="submitbtn2"
                        onClick={handleSave}
                    >
                        <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                        Save
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

                    <button
                        className="btn btn-outline-success btn-margin newButton"
                        style={{ marginRight: 10 }}
                        id="submitbtn2"
                        disabled={containerData.gateInId === ''}
                        onClick={downloadGateInReport}
                    >
                        <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
                        Print Report
                    </button>
                </Col>
            </Row>
        </div>
    )
}
