
import AuthContext from '../Components/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext, useRef } from 'react';
import '../Components/Style.css';
import ipaddress from "../Components/IpAddress";
import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts';
import Select, { components } from 'react-select';
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
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faCalendarAlt, faAdd, faCancel, faXmark, faArrowDown, faPlus, faArrowUp, faEdit, faChevronUp, faChevronDown, faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import useAxios from '../Components/useAxios';
import { dark } from '@mui/material/styles/createPalette';
import { toast } from 'react-toastify';
import { CSSTransition } from 'react-transition-group';
import { error } from 'jquery';

export default function UploadIgm() {
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
    const [uploadData, setUploadData] = useState([
        { label: 'IGM File Upload', value: 'IGM File Upload' },
        { label: 'IGM Excel Upload', value: 'IGM Excel Upload' },
        { label: 'Scanning List Upload', value: 'Scanning List Upload' },
        { label: 'BL wise tariff excel upload', value: 'BL wise tariff excel upload' },
        { label: 'SSR Upload By Excel', value: 'SSR Upload By Excel' },
        { label: 'LCL Tariff Excel Upload', value: 'LCL Tariff Excel Upload' },
        { label: 'Upload Advance Hold Container Using Excel', value: 'Upload Advance Hold Container Using Excel' },
        { label: 'SSR Upload By Excel Without Job Order', value: 'SSR Upload By Excel Without Job Order' }
    ])

    const [selectUploadType, setSelectUploadType] = useState('');

    const handleUploadTypeChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setSelectUploadType('');
        }
        else {


            setSelectUploadType(selectedOption ? selectedOption.value : '');

            if (selectedOption.value === 'Upload Advance Hold Container Using Excel') {
                getAdvanceContainerHoldData();
            }


        }
    };

    const downloadIgmFile = async () => {
        try {
            // Make a GET request to download the Excel file
            const response = await axios.get(`${ipaddress}excelUpload/excelFormatDownload`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                responseType: 'blob', // Important to handle binary data (like Excel files)
            });

            // Create a URL from the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create a temporary anchor element to trigger the download
            const link = document.createElement('a');
            link.href = url;

            // Set the file name for download (you can change this to be dynamic based on the response)
            link.setAttribute('download', 'IGM_Upload_Format.xlsx');

            // Append the anchor to the document and trigger a click event
            document.body.appendChild(link);
            link.click();

            // Clean up by removing the anchor element from the document
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    }

    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState([]);
    const fileInputRef = useRef(null); // Ref for the file input

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            toast.error("Please select a file!", {
                autoClose: 800
            });
            return;
        }
        setLoading(true);

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('cid', companyid);  // Replace with actual values
        formData.append('bid', branchId);
        formData.append('user', userId);
        formData.append('finYear', new Date().getFullYear());

        try {
            const response = await axios.post(`${ipaddress}excelUpload/upload-Igm`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${jwtToken}`
                },
            });
            const data = response.data;
            if (data.message === 'success') {
                toast.success(data.result, {
                    autoClose: 800
                });
                setErrorMessage([]);
                return;
            }
            else {
                toast.error("Error in some fields.", {
                    autoClose: 800
                })
                setErrorMessage(data.result);
            }
        } catch (error) {
            toast.success(error.response.data, {
                autoClose: 800
            });
            setErrorMessage([]);
            return;
        }
        finally {
            setLoading(false);
        }
    };
    const handleClearFile = () => {
        setSelectedFile(null); // Clear the selected file from state

        if (fileInputRef.current) {
            fileInputRef.current.value = null; // Safely reset the file input field
        }

        setErrorMessage([]); // Clear any error messages
    };

    const [profitCenterData, setProfitCenterData] = useState({});
    const getProfitCenter = () => {
        axios.get(`${ipaddress}api/profitcentres/getDataByProfitCenterId?companyId=${companyid}&branchId=${branchId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                console.log('data ', response);
                setProfitCenterData(response.data);
            })
            .catch((error) => {

            })
    }

    useEffect(() => {
        getProfitCenter();
    }, [])

    const [igmData, setIgmData] = useState({

        companyId: '',
        branchId: '',
        finYear: new Date().getFullYear(),
        igmTransId: '',
        profitcentreId: profitCenterData.profitcentreId,
        igmNo: '',
        docDate: new Date(),
        igmDate: null,
        viaNo: '',
        vesselId: '',
        voyageNo: '',
        port: '',
        vesselEta: null,
        vesselArvDate: null,
        vesselArvTime: '',
        shippingLine: '',
        shippingAgent: '',
        comments: '',
        portJo: '',
        portJoDate: null,
        partyId: '',
        dataInputStatus: 'N',
        exportJoFileName: '',
        entryStatus: '',
        status: '',
        createdBy: '',
        createdDate: null,
        editedBy: '',
        editedDate: null,
        approvedBy: '',
        approvedDate: null,
        scanningDate: null,
        manualLinkFlag: 'N'

    })



    const handleIgmDataChange = (e) => {
        const { name, value } = e.target;
        setIgmData(prevState => ({
            ...prevState,
            [name]: value
        }));
        document.getElementById(name).classList.remove('error-border');
        setIgmErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleDocDate = (date) => {
        setIgmData({
            ...igmData,
            docDate: date
        })
    }


    const handleIgmDate = (date) => {
        setIgmData({
            ...igmData,
            igmDate: date
        })
        document.getElementById('igmDate').classList.remove('error-border');
        setIgmErrors((prevErrors) => ({
            ...prevErrors,
            ['igmDate']: "",
        }));
    }

    const handleScanningDate = (date) => {
        setIgmData({
            ...igmData,
            scanningDate: date
        })
    }

    const handleVesselArvDate = (date) => {
        setIgmData({
            ...igmData,
            vesselArvDate: date
        })
    }

    const handleVesselBerthDate = (date) => {
        setIgmData({
            ...igmData,
            vesselEta: date
        })
        document.getElementById('vesselBerthDate').classList.remove('error-border');
        setIgmErrors((prevErrors) => ({
            ...prevErrors,
            ['vesselBerthDate']: "",
        }));
    }





    const [portData, setPortData] = useState([]);
    const [portId, setPortId] = useState('');
    const [portName, setPortName] = useState('');

    const [vesselData, setVesselData] = useState([]);
    const [vesselId, setVesselId] = useState('');
    const [vesselName, setVesselName] = useState('');

    const [linerData, setLinerData] = useState([]);
    const [linerId, setLinerId] = useState('');
    const [linerName, setLinerName] = useState('');
    const [linerCode, setLinerCode] = useState('');

    const [agentData, setAgentData] = useState([]);
    const [agentId, setAgentId] = useState('');
    const [agentName, setAgentName] = useState('');
    const [agentCode, setAgentCode] = useState('');



    const getPortData = (val) => {
        if (val === '') {
            setPortData([]);
            return;
        }

        axios.get(`${ipaddress}party/getPortData1?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const portOptions = data.map(port => ({
                    value: port[0],
                    label: port[0] + ' - ' + port[1],
                    portName: port[1]
                }))
                setPortData(portOptions);
            })
            .catch((error) => {

            })
    }



    const getVesselData = (val) => {
        if (val === '') {
            setVesselData([]);
            return;
        }

        axios.get(`${ipaddress}party/getVessel?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const portOptions = data.map(port => ({
                    value: port[0],
                    label: port[1]
                }))
                setVesselData(portOptions);
            })
            .catch((error) => {

            })
    }

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


    const getAgentData = (val) => {
        if (val === '') {
            setAgentData([]);
            return;
        }

        axios.get(`${ipaddress}party/getAgent?cid=${companyid}&bid=${branchId}&val=${val}`, {
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
                setAgentData(portOptions);
            })
            .catch((error) => {

            })
    }

    const getSingleLinerData = (val) => {
        if (val === '') {
            setLinerName('');
            setLinerId('');
            return;
        }

        axios.get(`${ipaddress}party/getSingleLiner?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                setLinerName(data[0][1]);
                setLinerId(data[0][0]);

            })
            .catch((error) => {
                setLinerName('');
                setLinerId('');
            })
    }


    const getSingleAgentData = (val) => {
        if (val === '') {
            setAgentId('');
            setAgentName('');
            return;
        }

        axios.get(`${ipaddress}party/getSingleAgent?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                setAgentId(data[0][0]);
                setAgentName(data[0][1]);
            })
            .catch((error) => {
                setAgentId('');
                setAgentName('');
            })
    }



    const handlePortChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setPortName('');
            setPortId('');
            document.getElementById('port').classList.remove('error-border');
            setIgmErrors((prevErrors) => ({
                ...prevErrors,
                ['port']: "",
            }));
        }
        else {
            setPortName(selectedOption ? selectedOption.portName : '');
            setPortId(selectedOption ? selectedOption.value : '');
            document.getElementById('port').classList.remove('error-border');
            setIgmErrors((prevErrors) => ({
                ...prevErrors,
                ['port']: "",
            }));
        }
    };

    const handleVesselChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setVesselName('');
            setVesselId('');
            document.getElementById('vessel').classList.remove('error-border');
            setIgmErrors((prevErrors) => ({
                ...prevErrors,
                ['vessel']: "",
            }));
        }
        else {
            setVesselName(selectedOption ? selectedOption.label : '');
            setVesselId(selectedOption ? selectedOption.value : '');
            document.getElementById('vessel').classList.remove('error-border');
            setIgmErrors((prevErrors) => ({
                ...prevErrors,
                ['vessel']: "",
            }));
        }
    };

    const handleLinerChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setLinerName('');
            setLinerId('');
            setLinerCode('');
            document.getElementById('shippingLine').classList.remove('error-border');
            setIgmErrors((prevErrors) => ({
                ...prevErrors,
                ['shippingLine']: "",
            }));
        }
        else {
            setLinerName(selectedOption ? selectedOption.label : '');
            setLinerId(selectedOption ? selectedOption.value : '');
            setLinerCode(selectedOption ? selectedOption.code : '');
            document.getElementById('shippingLine').classList.remove('error-border');
            setIgmErrors((prevErrors) => ({
                ...prevErrors,
                ['shippingLine']: "",
            }));
        }
    };

    const handleAgentChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setAgentName('');
            setAgentId('');
            setAgentCode('');
            document.getElementById('shippingAgent').classList.remove('error-border');
            setIgmErrors((prevErrors) => ({
                ...prevErrors,
                ['shippingAgent']: "",
            }));
        }
        else {
            setAgentName(selectedOption ? selectedOption.label : '');
            setAgentId(selectedOption ? selectedOption.value : '');
            setAgentCode(selectedOption ? selectedOption.code : '');
            document.getElementById('shippingAgent').classList.remove('error-border');
            setIgmErrors((prevErrors) => ({
                ...prevErrors,
                ['shippingAgent']: "",
            }));
        }
    };


    const [igmErrors, setIgmErrors] = useState({
        viaNo: "",
        igmNo: "",
        igmDate: "",
        port: "",
        vessel: "",
        shippingLine: "",
        vesselBerthDate: "",
        shippingAgent: "",
    })

    const [igmFlag, setIgmFlag] = useState('add');

    const handleIgmSave = () => {
        setLoading(true);
        let errors = {};

        if (!igmData.viaNo) {
            errors.viaNo = "Via no is required."
            document.getElementById("viaNo").classList.add("error-border");
        }
        if (!igmData.igmNo) {
            errors.igmNo = "IGM no is required."
            document.getElementById("igmNo").classList.add("error-border");
        }
        if (!igmData.igmDate) {
            errors.igmData = "IGM date is required."
            document.getElementById("igmDate").classList.add("error-border");
        }
        if (!portId) {
            errors.port = "Port is required."
            document.getElementById("port").classList.add("error-border");
        }
        if (!vesselId) {
            errors.vessel = "Vessel is required."
            document.getElementById("vessel").classList.add("error-border");
        }
        if (!linerId) {
            errors.shippingLine = "Shipping line is required."
            document.getElementById("shippingLine").classList.add("error-border");
        }
        if (!igmData.vesselEta) {
            errors.vesselBerthDate = "Vessel berth date is required."
            document.getElementById("vesselBerthDate").classList.add("error-border");
        }
        if (!agentId) {
            errors.shippingAgent = "Shipping agent is required."
            document.getElementById("shippingAgent").classList.add("error-border");
        }

        if (Object.keys(errors).length > 0) {
            setIgmErrors(errors);
            setLoading(false);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            })
            return;
        }
        igmData.port = portId;
        igmData.vesselId = vesselId;
        igmData.profitcentreId = profitCenterData.profitcentreId;
        igmData.shippingLine = linerId;
        igmData.shippingAgent = agentId;

        console.log('igm data ', igmData);

        axios.post(`${ipaddress}cfigm/saveIgm?cid=${companyid}&bid=${branchId}&user=${userId}&flag=${igmFlag}`, igmData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;

                setIgmData(response.data);
                toast.success("Data save successfully!!", {
                    autoClose: 800
                })
                setLoading(false);
                setIgmFlag('edit');
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.response.data, {
                    autoClose: 800
                })
            })

    }

    const handleIGMClear = () => {
        setIgmData({
            companyId: '',
            branchId: '',
            finYear: new Date().getFullYear(),
            igmTransId: '',
            profitcentreId: profitCenterData.profitcentreId,
            igmNo: '',
            docDate: new Date(),
            igmDate: null,
            viaNo: '',
            vesselId: '',
            voyageNo: '',
            port: '',
            vesselEta: null,
            vesselArvDate: null,
            vesselArvTime: '',
            shippingLine: '',
            shippingAgent: '',
            comments: '',
            portJo: '',
            portJoDate: null,
            partyId: '',
            dataInputStatus: 'N',
            exportJoFileName: '',
            entryStatus: '',
            status: '',
            createdBy: '',
            createdDate: null,
            editedBy: '',
            editedDate: null,
            approvedBy: '',
            approvedDate: null,
            scanningDate: null,
            manualLinkFlag: 'N'
        })
        setPortId('');
        setPortName('');
        setVesselId('');
        setVesselName('');
        setLinerCode('');
        setLinerId('');
        setLinerName('');
        setAgentCode('');
        setAgentId('');
        //   setisHeaderCheck(false);
        setAgentName('');
        setIgmFlag('add');

        setIgmErrors({
            viaNo: "",
            igmNo: "",
            igmDate: "",
            port: "",
            vessel: "",
            shippingLine: "",
            vesselBerthDate: "",
            shippingAgent: "",
        })
        document.getElementById("viaNo").classList.remove("error-border");
        document.getElementById("igmNo").classList.remove("error-border");
        document.getElementById("igmDate").classList.remove("error-border");
        document.getElementById("port").classList.remove("error-border");
        document.getElementById("vessel").classList.remove("error-border");
        document.getElementById("shippingLine").classList.remove("error-border");
        document.getElementById("vesselBerthDate").classList.remove("error-border");
        document.getElementById("shippingAgent").classList.remove("error-border");

    }


    const [isModalOpenForIGMSearch, setisModalOpenForIGMSearch] = useState(false);
    const openIGMSearchModal = () => {
        setisModalOpenForIGMSearch(true);
        searchIGM('');
    }

    const closeIGMSearchModal = () => {
        setisModalOpenForIGMSearch(false);
        setIgmSearchId('');
        setIgmSearchedData([]);
    }

    const [igmSearchId, setIgmSearchId] = useState('');
    const [igmSearchedData, setIgmSearchedData] = useState([]);

    const searchIGM = (id) => {
        setLoading(true);
        axios.get(`${ipaddress}cfigm/search?cid=${companyid}&bid=${branchId}&search=${id}`, {
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

    const selectIGMSearchRadio = (trans, igm, portName, vesselName, shippingLineName, shippingLineCode, shippingAgentName, shippingAgentCode) => {
        closeIGMSearchModal();
        axios.get(`${ipaddress}cfigm/getDataByTransAndIGM?cid=${companyid}&bid=${branchId}&transId=${trans}&igm=${igm}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                console.log('data data ', data);
                if (data.companyId !== '') {
                    setPortId(data.port);
                    setVesselId(data.vesselId);
                    setLinerId(data.shippingLine);
                    setAgentId(data.shippingAgent);
                    setPortName(portName);
                    setVesselName(vesselName);
                    setLinerName(shippingLineName);
                    setLinerCode(shippingLineCode);
                    setAgentName(shippingAgentName);
                    setAgentCode(shippingAgentCode);
                    setIgmFlag('edit');
                    setIgmData(response.data);

                }
                else {
                    handleIGMClear();
                }

            })
            .catch((error) => {
                handleIGMClear();
            })
    }


    const [selectedFile1, setSelectedFile1] = useState(null);
    const [errorMessage1, setErrorMessage1] = useState([]);
    const fileInputRef1 = useRef(null); // Ref for the file input

    const handleFileChange1 = (event) => {
        setSelectedFile1(event.target.files[0]);
    };

    const handleUpload1 = async () => {
        setLoading(true);
        let errors = {};

        if (!igmData.viaNo) {
            errors.viaNo = "Via no is required."
            document.getElementById("viaNo").classList.add("error-border");
        }
        if (!igmData.igmNo) {
            errors.igmNo = "IGM no is required."
            document.getElementById("igmNo").classList.add("error-border");
        }
        if (!igmData.igmDate) {
            errors.igmData = "IGM date is required."
            document.getElementById("igmDate").classList.add("error-border");
        }
        if (!portId) {
            errors.port = "Port is required."
            document.getElementById("port").classList.add("error-border");
        }
        if (!vesselId) {
            errors.vessel = "Vessel is required."
            document.getElementById("vessel").classList.add("error-border");
        }
        if (!linerId) {
            errors.shippingLine = "Shipping line is required."
            document.getElementById("shippingLine").classList.add("error-border");
        }
        if (!igmData.vesselEta) {
            errors.vesselBerthDate = "Vessel berth date is required."
            document.getElementById("vesselBerthDate").classList.add("error-border");
        }
        if (!agentId) {
            errors.shippingAgent = "Shipping agent is required."
            document.getElementById("shippingAgent").classList.add("error-border");
        }

        if (Object.keys(errors).length > 0) {
            setIgmErrors(errors);
            setLoading(false);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            })
            return;
        }
        igmData.port = portId;
        igmData.vesselId = vesselId;
        igmData.profitcentreId = profitCenterData.profitcentreId;
        igmData.shippingLine = linerId;
        igmData.shippingAgent = agentId;
        if (!selectedFile1) {
            setLoading(false);
            toast.error("Please select a file!", {
                autoClose: 800
            });
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile1);
        formData.append('cid', companyid);  // Replace with actual values
        formData.append('bid', branchId);
        formData.append('user', userId);
        formData.append('finYear', new Date().getFullYear());
        formData.append('igm', JSON.stringify(igmData));
        formData.append('type', igmType);

        try {
            const response = await axios.post(`${ipaddress}excelUpload/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${jwtToken}`
                },
            });
            const data = response.data;
            if (data.message === 'success') {
                toast.success(data.result, {
                    autoClose: 800
                });
                setErrorMessage1([]);
                return;
            }
            else {
                toast.error("Error in some fields.", {
                    autoClose: 800
                })
                setErrorMessage1(data.result);
            }

            //    console.log('Dattttttttt ', data);

            // toast.success(data, {
            //     autoClose: 800
            // });
            //  setErrorMessage1([]);

        } catch (error) {
            toast.error(error.response.data, {
                autoClose: 800
            });
            setErrorMessage1([]);
            return;
        }
        finally {
            setLoading(false);
        }
    };
    const handleClearFile1 = () => {
        setSelectedFile1(null); // Clear the selected file from state

        if (fileInputRef1.current) {
            fileInputRef1.current.value = null; // Safely reset the file input field
        }

        setErrorMessage1([]); // Clear any error messages
    };


    const [selectedFile2, setSelectedFile2] = useState(null);
    const [errorMessage2, setErrorMessage2] = useState([]);
    const fileInputRef2 = useRef(null); // Ref for the file input

    const [scanTransId, setScanTransId] = useState('');
    const [igm, setIgm] = useState('');
    const [fileName, setFileName] = useState('');
    const [scanData, setScanData] = useState([]);

    const handleFileChange2 = (event) => {
        setSelectedFile2(event.target.files[0]);
    };

    const handleUpload2 = async () => {
        if (!selectedFile2) {
            toast.error("Please select a file!", {
                autoClose: 800
            });
            return;
        }
        setLoading(true);


        const formData = new FormData();
        formData.append('file', selectedFile2);
        formData.append('cid', companyid);  // Replace with actual values
        formData.append('cname', companyname);
        formData.append('bid', branchId);
        formData.append('user', userId);

        try {
            const response = await axios.post(`${ipaddress}excelUpload/uploadScanningList`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${jwtToken}`
                },
            });
            const data = response.data;

            console.log('data ', data);


            toast.success(data.success, {
                autoClose: 800
            });
            setScanData(data.scanDetail);
            setScanTransId(data.scanDetail[0].transId);
            setIgm(data.scanDetail[0].refNo);
            setFileName(data.scanDetail[0].fileName);


        } catch (error) {
            toast.error(error.response.data, {
                autoClose: 800
            });
            setErrorMessage2([]);
            return;
        }
        finally {
            setLoading(false);
        }
    };
    const handleClearFile2 = () => {
        setSelectedFile2(null); // Clear the selected file from state

        if (fileInputRef2.current) {
            fileInputRef2.current.value = null; // Safely reset the file input field
        }
        setScanTransId('');
        setIgm('');
        setFileName('');
        setErrorMessage2([]); // Clear any error messages
        setScanData([]);
    };


    const [isModalOpenForScanData, setIsModalOpenForScanData] = useState(false);
    const [searchId, setSearchId] = useState('');
    const [searchedData, setSearchedData] = useState([]);

    const openScanData = () => {
        setIsModalOpenForScanData(true);
        searchScanningData('');
    }

    const closeScanData = () => {
        setIsModalOpenForScanData(false);
        setSearchId('');
        setSearchedData([]);
    }

    const searchScanningData = (id) => {

        setLoading(true);

        axios.get(`${ipaddress}excelUpload/searchScanningData?cid=${companyid}&bid=${branchId}&id=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setSearchedData(response.data);
                toast.success("Data found successfully!!", {
                    autoClose: 800
                })
                setLoading(false);
                setCurrentPage1(1);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
                setSearchedData([]);
            })

    }

    const getSelectedData = (id) => {
        if (!id) {
            return;
        }
        axios.get(`${ipaddress}excelUpload/getScanningData?cid=${companyid}&bid=${branchId}&id=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;

                setScanData(data);
                setScanTransId(data[0].transId);
                setIgm(data[0].refNo);
                setFileName(data[0].fileName);

                toast.success("Data found successfully!!", {
                    autoClose: 800
                })
                closeScanData();
            })
            .catch((error) => {

            })
    }

    const clearScanningData = () => {
        setSearchId('');
        searchScanningData('');
    }

    const [currentPage1, setCurrentPage1] = useState(1);
    const [itemsPerPage1] = useState(5);

    const indexOfLastItem1 = currentPage1 * itemsPerPage1;
    const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
    const currentItems1 = searchedData.slice(indexOfFirstItem1, indexOfLastItem1);
    const totalPages1 = Math.ceil(searchedData.length / itemsPerPage1);

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


    const [igmType, setIgmType] = useState('IMPORT IGM');






    //  Bl wise tariff upload

    const [selectedFile3, setSelectedFile3] = useState(null);
    const [errorMessage3, setErrorMessage3] = useState([]);
    const fileInputRef3 = useRef(null); // Ref for the file input
    const [blTransId, setBlTransId] = useState('');

    const handleFileChange3 = (event) => {
        setSelectedFile3(event.target.files[0]);
    };

    const [checkBaseRate, setCheckBaseRate] = useState('N');
    const [fwdId, setFwdId] = useState('');
    const [fwdName, setFwdName] = useState('');
    const [fwdData, setFwdData] = useState([]);

    const getFwdData = (val) => {
        if (val === '') {
            setFwdData([]);
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
                }))
                setFwdData(portOptions);
            })
            .catch((error) => {

            })
    }

    const handleFwdChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setFwdName('');
            setFwdId('');
        }
        else {
            setFwdName(selectedOption ? selectedOption.label : '');
            setFwdId(selectedOption ? selectedOption.value : '');
        }
    };


    const downloadBlTariffTemplateFile = async () => {
        try {
            // Make a GET request to download the Excel file
            const response = await axios.get(`${ipaddress}blTariffUpload/excelFormatDownload`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                responseType: 'blob', // Important to handle binary data (like Excel files)
            });

            // Create a URL from the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create a temporary anchor element to trigger the download
            const link = document.createElement('a');
            link.href = url;

            // Set the file name for download (you can change this to be dynamic based on the response)
            link.setAttribute('download', 'Upload_Tariff_Format.xlsx');

            // Append the anchor to the document and trigger a click event
            document.body.appendChild(link);
            link.click();

            // Clean up by removing the anchor element from the document
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    }


    const handleClearFile3 = () => {
        setSelectedFile3(null); // Clear the selected file from state

        if (fileInputRef3.current) {
            fileInputRef3.current.value = null; // Safely reset the file input field
        }

        setErrorMessage3([]); // Clear any error messages
        setFwdName('');
        setFwdId('');
        setCheckBaseRate('N');
        setBlTransId('');
        setBlUploadTransId('');
        setBlTransData([]);
    };


    const handleUpload3 = async () => {
        if (!selectedFile3) {
            toast.error("Please select a file!", {
                autoClose: 800
            });
            return;
        }
        if (fwdId === '') {
            toast.error("Forwarder is required", {
                autoClose: 800
            });
            return;
        }
        setLoading(true);

        const formData = new FormData();
        formData.append('file', selectedFile3);
        formData.append('cid', companyid);  // Replace with actual values
        formData.append('bid', branchId);
        formData.append('user', userId);
        formData.append('id', fwdId);

        try {
            const response = await axios.post(`${ipaddress}blTariffUpload/blTariffUpload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${jwtToken}`
                },
            });
            const data = response.data;
            if (data.message === 'success') {
                toast.success(data.result, {
                    autoClose: 800
                });
                setErrorMessage3([]);
                return;
            }
            else {
                toast.error("Error in some fields.", {
                    autoClose: 800
                })
                setErrorMessage3(data.result);
            }
        } catch (error) {
            toast.success(error.response.data, {
                autoClose: 800
            });
            setErrorMessage3([]);
            return;
        }
        finally {
            setLoading(false);
        }
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
    const [blUploadTransId, setBlUploadTransId] = useState('');
    const [blTransData, setBlTransData] = useState([]);

    const searchGateIn = (id) => {
        setLoading(true);
        axios.get(`${ipaddress}blTariffUpload/search?cid=${companyid}&bid=${branchId}&transId=${id}`, {
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


    const getDataByTransId = (id) => {
        axios.get(`${ipaddress}blTariffUpload/getDataByTransId?cid=${companyid}&bid=${branchId}&transId=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;

                setBlTransData(data);

                setBlUploadTransId(data[0][0])
                closeGateInSearchModal();
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setBlTransData([]);
                setBlUploadTransId('');
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


    //SSR Upload

    const [selectedFile4, setSelectedFile4] = useState(null);
    const [errorMessage4, setErrorMessage4] = useState([]);
    const fileInputRef4 = useRef(null); // Ref for the file input
    const [blTransId1, setBlTransId1] = useState('');

    const handleFileChange4 = (event) => {
        setSelectedFile4(event.target.files[0]);
    };

    const [checkBaseRate1, setCheckBaseRate1] = useState('N');
    const [fwdId1, setFwdId1] = useState('');
    const [fwdName1, setFwdName1] = useState('');
    const [fwdData1, setFwdData1] = useState([]);

    const getFwdData1 = (val) => {
        if (val === '') {
            setFwdData1([]);
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
                }))
                setFwdData1(portOptions);
            })
            .catch((error) => {

            })
    }

    const handleFwdChange1 = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setFwdName1('');
            setFwdId1('');
        }
        else {
            setFwdName1(selectedOption ? selectedOption.label : '');
            setFwdId1(selectedOption ? selectedOption.value : '');
        }
    };


    const downloadBlTariffTemplateFile1 = async () => {
        try {
            // Make a GET request to download the Excel file
            const response = await axios.get(`${ipaddress}ssrUpload/excelFormatDownload`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                responseType: 'blob', // Important to handle binary data (like Excel files)
            });

            // Create a URL from the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create a temporary anchor element to trigger the download
            const link = document.createElement('a');
            link.href = url;

            // Set the file name for download (you can change this to be dynamic based on the response)
            link.setAttribute('download', 'Upload_SSR_Format.xlsx');

            // Append the anchor to the document and trigger a click event
            document.body.appendChild(link);
            link.click();

            // Clean up by removing the anchor element from the document
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    }


    const handleClearFile4 = () => {
        setSelectedFile4(null); // Clear the selected file from state

        if (fileInputRef4.current) {
            fileInputRef4.current.value = null; // Safely reset the file input field
        }

        setErrorMessage4([]); // Clear any error messages
        setFwdName1('');
        setFwdId1('');
        setCheckBaseRate1('N');
        setBlTransId1('');
        setBlUploadTransId1('');
        setBlTransData1([]);
    };


    const handleUpload4 = async () => {
        if (!selectedFile4) {
            toast.error("Please select a file!", {
                autoClose: 800
            });
            return;
        }
        if (fwdId1 === '') {
            toast.error("Forwarder is required", {
                autoClose: 800
            });
            return;
        }
        setLoading(true);

        const formData = new FormData();
        formData.append('file', selectedFile4);
        formData.append('cid', companyid);  // Replace with actual values
        formData.append('bid', branchId);
        formData.append('user', userId);
        formData.append('id', fwdId1);

        try {
            const response = await axios.post(`${ipaddress}ssrUpload/ssrExcelUpload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${jwtToken}`
                },
            });
            const data = response.data;
            if (data.message === 'success') {
                toast.success(data.result, {
                    autoClose: 800
                });
                setErrorMessage4([]);
                return;
            }
            else {
                toast.error("Error in some fields.", {
                    autoClose: 800
                })
                setErrorMessage4(data.result);
            }
        } catch (error) {
            toast.success(error.response.data, {
                autoClose: 800
            });
            setErrorMessage4([]);
            return;
        }
        finally {
            setLoading(false);
        }
    };

    const [isModalOpenForGateInSearch1, setIsModalOpenForGateInSearch1] = useState(false);

    const openGateInSearchModal1 = () => {
        setIsModalOpenForGateInSearch1(true);
        searchGateIn1('');
    }

    const closeGateInSearchModal1 = () => {
        setIsModalOpenForGateInSearch1(false);
        setgateInId1('');
        setgateInSearchData([]);
    }

    const [gateInId1, setgateInId1] = useState('');
    const [blUploadTransId1, setBlUploadTransId1] = useState('');
    const [blTransData1, setBlTransData1] = useState([]);

    const searchGateIn1 = (id) => {
        setLoading(true);
        axios.get(`${ipaddress}ssr/searchSSR?cid=${companyid}&bid=${branchId}&val=${id}`, {
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

    const clearGateIn1 = () => {
        searchGateIn1('');
        setgateInId1('');
    }


    const getDataByTransId1 = (id) => {
        axios.get(`${ipaddress}ssrUpload/getSSRData?cid=${companyid}&bid=${branchId}&id=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;

                setBlTransData1(data);

                setBlUploadTransId1(data[0][0])
                closeGateInSearchModal1();
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setBlTransData1([]);
                setBlUploadTransId1('');
            })
    }



    //LCL Tariff Upload

    const [selectedFile5, setSelectedFile5] = useState(null);
    const [errorMessage5, setErrorMessage5] = useState([]);
    const fileInputRef5 = useRef(null); // Ref for the file input
    const [blTransId2, setBlTransId2] = useState('');

    const handleFileChange5 = (event) => {
        setSelectedFile5(event.target.files[0]);
    };

    const [checkBaseRate2, setCheckBaseRate2] = useState('N');
    const [fwdId2, setFwdId2] = useState('');
    const [fwdName2, setFwdName2] = useState('');
    const [fwdData2, setFwdData2] = useState([]);

    const getFwdData2 = (val) => {
        if (val === '') {
            setFwdData2([]);
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
                }))
                setFwdData2(portOptions);
            })
            .catch((error) => {

            })
    }

    const handleFwdChange2 = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setFwdName2('');
            setFwdId2('');
        }
        else {
            setFwdName2(selectedOption ? selectedOption.label : '');
            setFwdId2(selectedOption ? selectedOption.value : '');
        }
    };


    const downloadBlTariffTemplateFile2 = async () => {
        try {
            // Make a GET request to download the Excel file
            const response = await axios.get(`${ipaddress}lclTariffUpload/excelFormatDownload`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                responseType: 'blob', // Important to handle binary data (like Excel files)
            });

            // Create a URL from the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create a temporary anchor element to trigger the download
            const link = document.createElement('a');
            link.href = url;

            // Set the file name for download (you can change this to be dynamic based on the response)
            link.setAttribute('download', 'LCL_Tariff_Format.xlsx');

            // Append the anchor to the document and trigger a click event
            document.body.appendChild(link);
            link.click();

            // Clean up by removing the anchor element from the document
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    }


    const handleClearFile5 = () => {
        setSelectedFile5(null); // Clear the selected file from state

        if (fileInputRef5.current) {
            fileInputRef5.current.value = null; // Safely reset the file input field
        }

        setErrorMessage5([]); // Clear any error messages
        setFwdName2('');
        setFwdId2('');
        setCheckBaseRate2('N');
        setBlTransId2('');
        setBlUploadTransId2('');
        setBlTransData2([]);
    };


    const handleUpload5 = async () => {
        if (!selectedFile5) {
            toast.error("Please select a file!", {
                autoClose: 800
            });
            return;
        }
        if (fwdId2 === '') {
            toast.error("Forwarder is required", {
                autoClose: 800
            });
            return;
        }
        setLoading(true);

        const formData = new FormData();
        formData.append('file', selectedFile5);
        formData.append('cid', companyid);  // Replace with actual values
        formData.append('bid', branchId);
        formData.append('user', userId);
        formData.append('id', fwdId2);

        try {
            const response = await axios.post(`${ipaddress}lclTariffUpload/blTariffUpload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${jwtToken}`
                },
            });
            const data = response.data;
            if (data.message === 'success') {
                toast.success(data.result, {
                    autoClose: 800
                });
                setErrorMessage5([]);
                return;
            }
            else {
                toast.error("Error in some fields.", {
                    autoClose: 800
                })
                setErrorMessage5(data.result);
            }
        } catch (error) {
            toast.success(error.response.data, {
                autoClose: 800
            });
            setErrorMessage5([]);
            return;
        }
        finally {
            setLoading(false);
        }
    };


    const [isModalOpenForGateInSearch2, setIsModalOpenForGateInSearch2] = useState(false);

    const openGateInSearchModal2 = () => {
        setIsModalOpenForGateInSearch2(true);
        searchGateIn2('');
    }

    const closeGateInSearchModal2 = () => {
        setIsModalOpenForGateInSearch2(false);
        setgateInId2('');
        setgateInSearchData([]);
    }

    const [gateInId2, setgateInId2] = useState('');
    const [blUploadTransId2, setBlUploadTransId2] = useState('');
    const [blTransData2, setBlTransData2] = useState([]);

    const searchGateIn2 = (id) => {
        setLoading(true);
        axios.get(`${ipaddress}lclTariffUpload/search?cid=${companyid}&bid=${branchId}&transId=${id}`, {
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

    const clearGateIn2 = () => {
        searchGateIn2('');
        setgateInId2('');
    }


    const getDataByTransId2 = (id) => {
        axios.get(`${ipaddress}lclTariffUpload/getDataByTransId?cid=${companyid}&bid=${branchId}&transId=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;

                setBlTransData2(data);

                setBlUploadTransId2(data[0][0])
                closeGateInSearchModal2();
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setBlTransData2([]);
                setBlUploadTransId2('');
            })
    }


    //Upload Advance Hold Containers 

    const [selectedFile6, setSelectedFile6] = useState(null);
    const [errorMessage6, setErrorMessage6] = useState([]);
    const fileInputRef6 = useRef(null);

    const handleFileChange6 = (event) => {
        setSelectedFile6(event.target.files[0]);
    };

    const [checkBaseRate3, setCheckBaseRate3] = useState('N');
    const [blTransData3, setBlTransData3] = useState([]);

    const downloadBlTariffTemplateFile3 = async () => {
        try {
            // Make a GET request to download the Excel file
            const response = await axios.get(`${ipaddress}notGateInHoldContainer/excelFormatDownload`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                responseType: 'blob', // Important to handle binary data (like Excel files)
            });

            // Create a URL from the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create a temporary anchor element to trigger the download
            const link = document.createElement('a');
            link.href = url;

            // Set the file name for download (you can change this to be dynamic based on the response)
            link.setAttribute('download', 'Upload_Hold_Cont_Format.xlsx');

            // Append the anchor to the document and trigger a click event
            document.body.appendChild(link);
            link.click();

            // Clean up by removing the anchor element from the document
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    }


    const handleClearFile6 = () => {
        setSelectedFile6(null); // Clear the selected file from state

        if (fileInputRef6.current) {
            fileInputRef6.current.value = null; // Safely reset the file input field
        }

        setErrorMessage6([]);
        setCheckBaseRate3('N');
    };


    const handleUpload6 = async () => {
        if (!selectedFile6) {
            toast.error("Please select a file!", {
                autoClose: 800
            });
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('file', selectedFile6);
        formData.append('cid', companyid);  // Replace with actual values
        formData.append('bid', branchId);
        formData.append('user', userId);

        try {
            const response = await axios.post(`${ipaddress}notGateInHoldContainer/advanceHoldContainerUpload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${jwtToken}`
                },
            });
            const data = response.data;
            if (data.message === 'success') {
                toast.success(data.result, {
                    autoClose: 800
                });
                setErrorMessage6([]);
                getAdvanceContainerHoldData();

                return;
            }
            else {
                toast.error("Error in some fields.", {
                    autoClose: 800
                })
                setErrorMessage6(data.result);

                getAdvanceContainerHoldData();

            }

        } catch (error) {
            toast.success(error.response.data, {
                autoClose: 800
            });
            setErrorMessage6([]);
            return;
        }
        finally {
            setLoading(false);
        }
    };

    const getAdvanceContainerHoldData = () => {
        axios.get(`${ipaddress}notGateInHoldContainer/getContainerData?cid=${companyid}&bid=${branchId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;

                setBlTransData3(data);

            })
            .catch((error) => {

            })
    }


    const [currentPage4, setCurrentPage4] = useState(1);
    const [itemsPerPage4] = useState(10);

    const indexOfLastItem4 = currentPage4 * itemsPerPage4;
    const indexOfFirstItem4 = indexOfLastItem4 - itemsPerPage4;
    const currentItems4 = blTransData3.slice(indexOfFirstItem4, indexOfLastItem4);
    const totalPages4 = Math.ceil(blTransData3.length / itemsPerPage4);

    // Function to handle page change
    const handlePageChange4 = (page) => {
        if (page >= 1 && page <= totalPages4) {
            setCurrentPage4(page);
        }
    };
    const displayPages4 = () => {
        const centerPageCount = 5;
        const middlePage = Math.floor(centerPageCount / 2);
        let startPage = currentPage4 - middlePage;
        let endPage = currentPage4 + middlePage;

        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(totalPages4, centerPageCount);
        }

        if (endPage > totalPages4) {
            endPage = totalPages4;
            startPage = Math.max(1, totalPages4 - centerPageCount + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };


    //SSR Upload Without Job Order

    const [selectedFile7, setSelectedFile7] = useState(null);
    const [errorMessage7, setErrorMessage7] = useState([]);
    const fileInputRef7 = useRef(null); // Ref for the file input
    const [blTransId4, setBlTransId4] = useState('');

    const handleFileChange7 = (event) => {
        setSelectedFile7(event.target.files[0]);
    };

    const [checkBaseRate4, setCheckBaseRate4] = useState('N');
    const [fwdId4, setFwdId4] = useState('');
    const [fwdName4, setFwdName4] = useState('');
    const [fwdData4, setFwdData4] = useState([]);

    const getFwdData4 = (val) => {
        if (val === '') {
            setFwdData4([]);
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
                }))
                setFwdData4(portOptions);
            })
            .catch((error) => {

            })
    }

    const handleFwdChange4 = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setFwdName4('');
            setFwdId4('');
        }
        else {
            setFwdName4(selectedOption ? selectedOption.label : '');
            setFwdId4(selectedOption ? selectedOption.value : '');
        }
    };


    const downloadBlTariffTemplateFile4 = async () => {
        try {
            // Make a GET request to download the Excel file
            const response = await axios.get(`${ipaddress}ssrUpload/WJOExcelFormatDownload`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                responseType: 'blob', // Important to handle binary data (like Excel files)
            });

            // Create a URL from the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create a temporary anchor element to trigger the download
            const link = document.createElement('a');
            link.href = url;

            // Set the file name for download (you can change this to be dynamic based on the response)
            link.setAttribute('download', 'SSR_WJO_FORMAT.xlsx');

            // Append the anchor to the document and trigger a click event
            document.body.appendChild(link);
            link.click();

            // Clean up by removing the anchor element from the document
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    }


    const handleClearFile7 = () => {
        setSelectedFile7(null); // Clear the selected file from state

        if (fileInputRef7.current) {
            fileInputRef7.current.value = null; // Safely reset the file input field
        }

        setErrorMessage7([]); // Clear any error messages
        setFwdName4('');
        setFwdId4('');
        setCheckBaseRate4('N');
        setBlTransId4('');
        setBlUploadTransId7('');
        setBlTransData7([]);
    };


    const handleUpload7 = async () => {
        if (!selectedFile7) {
            toast.error("Please select a file!", {
                autoClose: 800
            });
            return;
        }
        if (fwdId4 === '') {
            toast.error("Forwarder is required", {
                autoClose: 800
            });
            return;
        }
        setLoading(true);

        const formData = new FormData();
        formData.append('file', selectedFile7);
        formData.append('cid', companyid);  // Replace with actual values
        formData.append('bid', branchId);
        formData.append('user', userId);
        formData.append('id', fwdId4);

        try {
            const response = await axios.post(`${ipaddress}ssrUpload/ssrWJOExcelUpload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${jwtToken}`
                },
            });
            const data = response.data;
            if (data.message === 'success') {
                toast.success(data.result, {
                    autoClose: 800
                });
                setErrorMessage7([]);
                return;
            }
            else {
                toast.error("Error in some fields.", {
                    autoClose: 800
                })
                setErrorMessage7(data.result);
            }
        } catch (error) {
            toast.success(error.response.data, {
                autoClose: 800
            });
            setErrorMessage7([]);
            return;
        }
        finally {
            setLoading(false);
        }
    };

    const [isModalOpenForGateInSearch7, setIsModalOpenForGateInSearch7] = useState(false);

    const openGateInSearchModal7 = () => {
        setIsModalOpenForGateInSearch7(true);
        searchGateIn7('');
    }

    const closeGateInSearchModal7 = () => {
        setIsModalOpenForGateInSearch7(false);
        setgateInId7('');
        setgateInSearchData([]);
    }

    const [gateInId7, setgateInId7] = useState('');
    const [blUploadTransId7, setBlUploadTransId7] = useState('');
    const [blTransData7, setBlTransData7] = useState([]);

    const searchGateIn7 = (id) => {
        setLoading(true);
        axios.get(`${ipaddress}ssrUpload/getSSRJobData?cid=${companyid}&bid=${branchId}&id=${id}`, {
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

    const clearGateIn7 = () => {
        searchGateIn7('');
        setgateInId7('');
    }


    const getDataByTransId7 = (id) => {
        axios.get(`${ipaddress}ssrUpload/getSelectedSSRJobData?cid=${companyid}&bid=${branchId}&id=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;

                setBlTransData7(data);

                setBlUploadTransId7(data[0][0])
                closeGateInSearchModal7();
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setBlTransData7([]);
                setBlUploadTransId7('');
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
                                    Search By All fields
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
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>BL Trans Id</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>IGM No</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>IGM Line No</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Container No</th>

                                </tr>
                            </thead>
                            <tbody>

                                {currentItems3.map((item, index) => (
                                    <tr className='text-center' key={index}>
                                        <td> <input type="radio" name="radioGroup" onChange={() => getDataByTransId(item[0])} /></td>
                                        <td>{item[0]}</td>
                                        <td>{item[1]}</td>
                                        <td>{item[2]}</td>
                                        <td>{item[3]}</td>
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

            <Modal Modal isOpen={isModalOpenForGateInSearch1} onClose={closeGateInSearchModal1} toggle={closeGateInSearchModal1} style={{ maxWidth: '1100px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                <ModalHeader toggle={closeGateInSearchModal1} style={{
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
                    /> Search</h5>



                </ModalHeader>
                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Search By All fields
                                </label>
                                <Input
                                    className="form-control"
                                    type="text"
                                    id="fobValueInDollar"
                                    value={gateInId1}

                                    onChange={(e) => setgateInId1(e.target.value)}

                                />
                            </FormGroup>
                        </Col>
                        <Col md={6} style={{ marginTop: '24px' }}>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"

                                onClick={() => { searchGateIn1(gateInId1); setCurrentPage3(1); }}
                            >
                                <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                Search
                            </button>
                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={clearGateIn1}
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
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>SSR Trans Id</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>IGM No</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>IGM Line No</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Container No</th>

                                </tr>
                            </thead>
                            <tbody>

                                {currentItems3.map((item, index) => (
                                    <tr className='text-center' key={index}>
                                        <td> <input type="radio" name="radioGroup" onChange={() => getDataByTransId1(item[0])} /></td>
                                        <td>{item[0]}</td>
                                        <td>{item[2]}</td>
                                        <td>{item[3]}</td>
                                        <td>{item[6]}</td>
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

            <Modal Modal isOpen={isModalOpenForGateInSearch2} onClose={closeGateInSearchModal2} toggle={closeGateInSearchModal2} style={{ maxWidth: '1100px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                <ModalHeader toggle={closeGateInSearchModal2} style={{
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
                    /> Search</h5>



                </ModalHeader>
                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Search By All fields
                                </label>
                                <Input
                                    className="form-control"
                                    type="text"
                                    id="fobValueInDollar"
                                    value={gateInId2}

                                    onChange={(e) => setgateInId1(e.target.value)}

                                />
                            </FormGroup>
                        </Col>
                        <Col md={6} style={{ marginTop: '24px' }}>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"

                                onClick={() => { searchGateIn2(gateInId2); setCurrentPage3(1); }}
                            >
                                <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                Search
                            </button>
                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={clearGateIn2}
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
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>LCL Upload Trans Id</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>IGM No</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>IGM Line No</th>

                                </tr>
                            </thead>
                            <tbody>

                                {currentItems3.map((item, index) => (
                                    <tr className='text-center' key={index}>
                                        <td> <input type="radio" name="radioGroup" onChange={() => getDataByTransId2(item[0])} /></td>
                                        <td>{item[0]}</td>
                                        <td>{item[1]}</td>
                                        <td>{item[2]}</td>
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

            <Modal Modal isOpen={isModalOpenForGateInSearch7} onClose={closeGateInSearchModal7} toggle={closeGateInSearchModal7} style={{ maxWidth: '1100px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                <ModalHeader toggle={closeGateInSearchModal7} style={{
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
                    /> Search</h5>



                </ModalHeader>
                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Search By All fields
                                </label>
                                <Input
                                    className="form-control"
                                    type="text"
                                    id="fobValueInDollar"
                                    value={gateInId7}

                                    onChange={(e) => setgateInId7(e.target.value)}

                                />
                            </FormGroup>
                        </Col>
                        <Col md={6} style={{ marginTop: '24px' }}>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"

                                onClick={() => { searchGateIn7(gateInId7); setCurrentPage3(1); }}
                            >
                                <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                Search
                            </button>
                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={clearGateIn7}
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
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>SSR Trans Id</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>IGM No</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>IGM Line No</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Container No</th>

                                </tr>
                            </thead>
                            <tbody>

                                {currentItems3.map((item, index) => (
                                    <tr className='text-center' key={index}>
                                        <td> <input type="radio" name="radioGroup" onChange={() => getDataByTransId7(item[0])} /></td>
                                        <td>{item[0]}</td>
                                        <td>{item[1]}</td>
                                        <td>{item[2]}</td>
                                        <td>{item[3]}</td>
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

            <Row>
                <Col md={3}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Select Upload Type
                        </label>
                        <Select

                            placeholder="Select Upload type"
                            isClearable
                            id="nameOfExporter"
                            options={uploadData}
                            value={{ value: selectUploadType, label: selectUploadType }}
                            onChange={handleUploadTypeChange}

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
            <hr />
            {selectUploadType === 'IGM Excel Upload' ? (
                <>
                    <Row>

                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Text Path
                                </label>
                                <Input
                                    className="form-control"
                                    type="file"
                                    id="fileUpload"
                                    accept=".xlsx, .xls"
                                    onChange={handleFileChange}
                                    innerRef={fileInputRef} // Attach the ref to the input
                                />

                            </FormGroup>
                        </Col>
                        <Col md={8} style={{ marginTop: 22 }}>

                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={handleUpload}
                            >
                                <FontAwesomeIcon icon={faUpload} style={{ marginRight: "5px" }} />
                                Import IGM
                            </button>
                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={handleClearFile}
                            >
                                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                Clear
                            </button>
                            <button
                                className="btn btn-outline-success btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={downloadIgmFile}

                            >
                                <FontAwesomeIcon icon={faFileExcel} style={{ marginRight: "5px" }} />
                                Download Excel Template
                            </button>
                        </Col>
                    </Row>
                    {errorMessage.length > 0 && (
                        <div className="mt-3 table-responsive" style={{ fontSize: 14, marginTop: 20, color: 'red' }}>
                            <table className="table table-bordered table-hover tableHeader dynamic-table">
                                <thead className="tableHeader">
                                    <tr>
                                        <th scope="col" className="text-center" style={{ color: 'red' }}>Fields</th>
                                        <th scope="col" className="text-center" style={{ color: 'red' }}>Message</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {errorMessage.map((item, index) => {
                                        const [message1, message2] = item.split(' - '); // Split by ' - '
                                        return (
                                            <tr key={index}>
                                                <td style={{ color: 'red' }}>{message1}</td>
                                                <td style={{ color: 'red' }}>{message2}</td>
                                            </tr>
                                        );
                                    })}

                                </tbody>
                            </table>
                        </div>
                    )}
                </>

            ) : selectUploadType === 'IGM File Upload' ? (
                <>
                    <Row>

                        {/* <Col md={3}>
    <FormGroup>
        <label className="forlabel bold-label" htmlFor="sbRequestId">
            Container No
        </label>
        <input
            className="form-control"
            type="text"
            id="fobValueInDollar"
            maxLength={11}
            value={container}
            onChange={(e) => setContainer(e.target.value)}
        />

    </FormGroup>
</Col>
<Col md={3} style={{ marginTop: 22 }}>
    <button
        className="btn btn-outline-primary btn-margin newButton"
        style={{ marginRight: 10 }}
        id="submitbtn2"
        onClick={() => searchByContainer(container)}

    >
        <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
        Search
    </button>
</Col> */}
                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    IGM Trans Id
                                </label>
                                <Row>
                                    <Col md={12}>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="igmTransId"
                                            maxLength={15}
                                            name='igmTransId'
                                            readOnly
                                            style={{ backgroundColor: '#E0E0E0' }}
                                            value={igmData.igmTransId}
                                            onChange={handleIgmDataChange}
                                        />
                                    </Col>
                                    {/* <Col md={3}>
                                        <button
                                            className="btn btn-primary btn-margin newButton"
                                            style={{ height: 35 }}
                                            id="submitbtn2"
                                            onClick={openIGMSearchModal}

                                        >
                                            <FontAwesomeIcon icon={faMagnifyingGlassChart} />

                                        </button>
                                    </Col> */}
                                </Row>


                            </FormGroup>


                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    IGM Trans Date
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <DatePicker
                                        selected={igmData.docDate}
                                        onChange={handleDocDate}
                                        id='docDate'
                                        name='docDate'
                                        readOnly
                                        style={{ backgroundColor: '#E0E0E0' }}
                                        dateFormat="dd/MM/yyyy HH:mm"
                                        className="form-control border-right-0 inputField"
                                        customInput={<input style={{ width: '100%', backgroundColor: '#E0E0E0' }} />}
                                        wrapperClassName="custom-react-datepicker-wrapper"
                                        showTimeInput
                                        popperPlacement="top-end"
                                    />
                                    <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                </div>

                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    IGM No <span className='error-message'>*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="igmNo"
                                    maxLength={10}
                                    name='igmNo'
                                    value={igmData.igmNo}
                                    onChange={handleIgmDataChange}
                                />
                                <div style={{ color: 'red' }} className="error-message">{igmErrors.igmNo}</div>


                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    IGM Date <span className='error-message'>*</span>
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <DatePicker
                                        selected={igmData.igmDate}
                                        onChange={handleIgmDate}
                                        id='igmDate'
                                        name='igmDate'
                                        dateFormat="dd/MM/yyyy"
                                        className="form-control border-right-0 inputField"
                                        customInput={<input style={{ width: '100%' }} />}
                                        wrapperClassName="custom-react-datepicker-wrapper"
                                    />
                                    <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                </div>
                                <div style={{ color: 'red' }} className="error-message">{igmErrors.igmDate}</div>
                            </FormGroup>
                        </Col>
                        {/* <Col md={2}>
    <FormGroup>
        <label className="forlabel bold-label" htmlFor="sbRequestId">
            Status
        </label>
        <input
            className="form-control"
            type="text"
            id="status"
            maxLength={15}
            readOnly
            style={{ backgroundColor: '#E0E0E0' }}
            name='status'
            value={igmData.status === 'A' ? 'Approved' : igmData.status}
            onChange={handleIgmDataChange}
        />

    </FormGroup>
</Col>
<Col md={2}>
    <FormGroup>
        <label className="forlabel bold-label" htmlFor="sbRequestId">
            Created By
        </label>
        <input
            className="form-control"
            type="text"
            id="createdBy"
            maxLength={15}
            readOnly
            style={{ backgroundColor: '#E0E0E0' }}
            name='createdBy'
            value={igmData.createdBy}
            onChange={handleIgmDataChange}
        />

    </FormGroup>
</Col> */}
                        <Col md={4}>
                            <Row>
                                <Col md={8}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Shipping Line <span className='error-message'>*</span>
                                        </label>
                                        <Select
                                            value={{ value: linerId, label: linerName }}
                                            onChange={handleLinerChange}
                                            onInputChange={getLinerData}
                                            options={linerData}
                                            placeholder="Select Shipping Line"
                                            isClearable
                                            id="shippingLine"
                                            name="shippingLine"
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
                                        <div style={{ color: 'red' }} className="error-message">{igmErrors.shippingLine}</div>

                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Line Code <span className='error-message'>*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="fobValueInDollar"
                                            value={linerCode}
                                            onChange={(e) => { setLinerCode(e.target.value); getSingleLinerData(e.target.value) }}
                                        />

                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Modal Modal isOpen={isModalOpenForIGMSearch} onClose={closeIGMSearchModal} toggle={closeIGMSearchModal} style={{ maxWidth: '1200px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                        <ModalHeader toggle={closeIGMSearchModal} style={{
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
                            /> Search IGM</h5>



                        </ModalHeader>
                        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                            <Row>
                                <Col md={4}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Search by IGM Trans Id / IGM No
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
                                <Col md={4} style={{ marginTop: 24 }}>
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
                                            <th scope="col">IGM Trans Id</th>
                                            <th scope="col">DOC date</th>
                                            <th scope="col">IGM No</th>
                                            <th scope="col">IGM Date</th>
                                            <th scope="col">ProfitCenter Desc</th>
                                            <th scope="col">Via No</th>
                                            <th scope="col">Vessel Name</th>
                                            <th scope="col">Voyage No</th>
                                            <th scope="col">Vessel Arv Date</th>
                                            <th scope="col">Port</th>
                                            <th scope="col">Port Name</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">PartyName</th>
                                        </tr>
                                        <tr className='text-center'>
                                            <th scope="col"></th>
                                            <th scope="col">{igmSearchedData.length}</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <input type="radio" name="radioGroup" onChange={() => selectIGMSearchRadio(item[0], item[2], item[6], item[10], item[12], item[13], item[14], item[15])} value={item[0]} />
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
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Vessel Name <span className='error-message'>*</span>
                                </label>
                                <Select
                                    value={{ value: vesselId, label: vesselName }}
                                    onChange={handleVesselChange}
                                    onInputChange={getVesselData}
                                    options={vesselData}
                                    placeholder="Select Vessel"
                                    isClearable
                                    id="vessel"
                                    name="vessel"
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
                                <div style={{ color: 'red' }} className="error-message">{igmErrors.vessel}</div>

                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Voyage No
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="voyageNo"
                                    maxLength={10}
                                    name='voyageNo'
                                    value={igmData.voyageNo}
                                    onChange={handleIgmDataChange}

                                />

                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    VIA No <span className='error-message'>*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="viaNo"
                                    maxLength={10}
                                    name='viaNo'
                                    value={igmData.viaNo}
                                    onChange={handleIgmDataChange}
                                />
                                <div style={{ color: 'red' }} className="error-message">{igmErrors.viaNo}</div>

                            </FormGroup>
                        </Col>


                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Status
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="status"
                                    maxLength={15}
                                    readOnly
                                    style={{ backgroundColor: '#E0E0E0' }}
                                    name='status'
                                    value={igmData.status === 'A' ? 'Approved' : igmData.status}
                                    onChange={handleIgmDataChange}
                                />

                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <Row>
                                <Col md={8}>
                                    {/* Shipping Agent */}
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Shipping Agent <span className='error-message'>*</span>
                                        </label>
                                        <Select
                                            value={{ value: agentId, label: agentName }}
                                            onChange={handleAgentChange}
                                            onInputChange={getAgentData}
                                            options={agentData}
                                            placeholder="Select Shipping Agent"
                                            isClearable
                                            id="shippingAgent"
                                            name='shippingAgent'
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
                                        <div style={{ color: 'red' }} className="error-message">{igmErrors.shippingAgent}</div>
                                    </FormGroup>
                                </Col>

                                <Col md={4}>
                                    {/* Shipping Agent Code */}
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Agent Code <span className='error-message'>*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="fobValueInDollar"
                                            value={agentCode}
                                            onChange={(e) => { setAgentCode(e.target.value); getSingleAgentData(e.target.value) }}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                    <Row >
                        {/* First Row */}
                        <Col md={8}>
                            <Row>
                                <Col md={3}>
                                    {/* Vessel Arv Date */}
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Vessel Arv Date
                                        </label>
                                        <div className='datepicker' style={{ position: 'relative', height: 30 }}>
                                            <DatePicker
                                                selected={igmData.vesselArvDate}
                                                onChange={handleVesselArvDate}
                                                id='vesselArvDate'
                                                name='vesselArvDate'
                                                dateFormat="dd/MM/yyyy HH:mm"
                                                className="form-control border-right-0 inputField datepicker"
                                                customInput={<input style={{ width: '100%', height: 30 }} />}
                                                wrapperClassName="custom-react-datepicker-wrapper"
                                                showTimeInput
                                            />
                                            <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                        </div>
                                    </FormGroup>
                                </Col>

                                <Col md={3}>
                                    {/* Vessel Berthing Date */}
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Vessel Berthing Date <span className='error-message'>*</span>
                                        </label>
                                        <div style={{ position: 'relative' }}>
                                            <DatePicker
                                                showTimeInput
                                                selected={igmData.vesselEta}
                                                onChange={handleVesselBerthDate}
                                                id='vesselBerthDate'
                                                name='vesselBerthDate'
                                                dateFormat="dd/MM/yyyy HH:mm"
                                                className="form-control border-right-0 inputField"
                                                customInput={<input style={{ width: '100%' }} />}
                                                wrapperClassName="custom-react-datepicker-wrapper"
                                            />
                                            <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                        </div>
                                        <div style={{ color: 'red' }} className="error-message">{igmErrors.vesselBerthDate}</div>
                                    </FormGroup>
                                </Col>

                                <Col md={3}>
                                    {/* Scanning List Date */}
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Scanning List Date
                                        </label>
                                        <div style={{ position: 'relative' }}>
                                            <DatePicker
                                                showTimeInput
                                                selected={igmData.scanningDate}
                                                onChange={handleScanningDate}
                                                id='scanningDate'
                                                name='scanningDate'
                                                dateFormat="dd/MM/yyyy HH:mm"
                                                className="form-control border-right-0 inputField"
                                                customInput={<input style={{ width: '100%' }} />}
                                                wrapperClassName="custom-react-datepicker-wrapper"
                                            />
                                            <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                        </div>
                                    </FormGroup>
                                </Col>


                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Created By
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="createdBy"
                                            maxLength={15}
                                            readOnly
                                            style={{ backgroundColor: '#E0E0E0' }}
                                            name='createdBy'
                                            value={igmData.createdBy}
                                            onChange={handleIgmDataChange}
                                        />

                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    {/* Port Code */}
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Port Code <span className='error-message'>*</span>
                                        </label>
                                        <Select
                                            value={{ value: portId, label: portId }}
                                            onChange={handlePortChange}
                                            onInputChange={getPortData}
                                            options={portData}
                                            placeholder="Select Port"
                                            isClearable
                                            id="port"
                                            name="port"
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
                                        <div style={{ color: 'red' }} className="error-message">{igmErrors.port}</div>
                                    </FormGroup>
                                </Col>

                                <Col md={3}>
                                    {/* Port Desc */}
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Port Desc
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={portName}
                                            id="fobValueInDollar"
                                            maxLength={15}
                                            readOnly
                                            style={{ backgroundColor: "#E0E0E0" }}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    {/* Profitcentre */}
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Profitcentre <span className='error-message'>*</span>
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="profitcentreId"
                                            maxLength={15}
                                            name='profitcentreId'
                                            value={profitCenterData.profitcentreDesc}
                                            readOnly
                                            style={{ backgroundColor: "#E0E0E0" }}
                                        />
                                    </FormGroup>
                                </Col>


                                <Col md={3}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Created Date <span className='error-message'>*</span>
                                        </label>
                                        <div style={{ position: 'relative' }}>
                                            <DatePicker
                                                selected={igmData.createdDate}
                                                onChange={handleIgmDate}
                                                id='createdDate'
                                                name='createdDate'
                                                disabled
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control border-right-0 inputField"
                                                customInput={<input style={{ width: '100%', backgroundColor: '#E0E0E0' }} />}
                                                wrapperClassName="custom-react-datepicker-wrapper"
                                            />
                                            <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                        </div>
                                        <div style={{ color: 'red' }} className="error-message">{igmErrors.igmDate}</div>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>

                        {/* Second Row */}



                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Comments
                                </label>
                                <Input
                                    className="form-control"
                                    type="textarea"
                                    id="comments"
                                    name='comments'
                                    maxLength={150}
                                    value={igmData.comments}
                                    onChange={handleIgmDataChange}
                                    style={{ minHeight: '6.4rem' }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>


                    <Row className='text-center'>
                        <Col>
                            {/* <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={handleIgmSave}
                                disabled={igmData.igmTransId != ''}

                            >
                                <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                Save
                            </button> */}

                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={handleIGMClear}
                            >
                                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                Clear
                            </button>
                        </Col>
                    </Row>
                    <hr />
                    <Row>

                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    IGM Type
                                </label>
                                <Input
                                    className="form-control"
                                    type="select"
                                    name='igmType'
                                    id='igmType'
                                    value={igmType}
                                    onChange={(e) => setIgmType(e.target.value)}

                                >
                                    <option value="IMPORT IGM">IMPORT IGM</option>
                                    <option value="CONSOLE IGM">CONSOLE IGM</option>
                                </Input>

                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Text Path
                                </label>
                                <Input
                                    className="form-control"
                                    type="file"
                                    id="fileUpload"
                                    accept=".igm, .txt, .cgm"
                                    onChange={handleFileChange1}
                                    innerRef={fileInputRef1} // Attach the ref to the input
                                />



                            </FormGroup>
                        </Col>
                        <Col md={6} style={{ marginTop: 22 }}>

                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={handleUpload1}
                            >
                                <FontAwesomeIcon icon={faUpload} style={{ marginRight: "5px" }} />
                                Import IGM
                            </button>
                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={handleClearFile1}
                            >
                                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                Clear
                            </button>

                        </Col>
                    </Row>
                    {errorMessage1.length > 0 && (
                        <div className="mt-3 table-responsive" style={{ fontSize: 14, marginTop: 20, color: 'red' }}>
                            <table className="table table-bordered table-hover tableHeader dynamic-table">
                                <thead className="tableHeader">
                                    <tr>
                                        <th scope="col" className="text-center" style={{ color: 'red' }}>Fields</th>
                                        <th scope="col" className="text-center" style={{ color: 'red' }}>Message</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {errorMessage1.map((item, index) => {
                                        const [message1, message2] = item.split(' - '); // Split by ' - '
                                        return (
                                            <tr key={index}>
                                                <td style={{ color: 'red' }}>{message1}</td>
                                                <td style={{ color: 'red' }}>{message2}</td>
                                            </tr>
                                        );
                                    })}

                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            ) : selectUploadType === 'Scanning List Upload' ? (
                <>
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Company Id
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={companyid}
                                    readOnly
                                    style={{ backgroundColor: "#E0E0E0" }}
                                    id="fobValueInDollar"
                                    maxLength={15}
                                />


                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Branch Id
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={branchId}
                                    readOnly
                                    style={{ backgroundColor: "#E0E0E0" }}
                                    id="fobValueInDollar"
                                    maxLength={15}
                                />


                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Text Path
                                </label>
                                <Input
                                    className="form-control"
                                    type="file"
                                    id="fobValueInDollar"
                                    accept=".txt"
                                    onChange={handleFileChange2}
                                    innerRef={fileInputRef2}
                                />


                            </FormGroup>
                        </Col>


                        <Col md={3} style={{ marginTop: 21 }}>

                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10, fontSize: 13 }}
                                id="submitbtn2"
                                onClick={handleUpload2}
                            >
                                <FontAwesomeIcon icon={faUpload} style={{ marginRight: "5px" }} />
                                Upload
                            </button>
                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ marginRight: 10, fontSize: 13 }}
                                id="submitbtn2"
                                onClick={handleClearFile2}
                            >
                                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                Clear
                            </button>
                        </Col>

                    </Row>
                    <hr />
                    <Row style={{ marginTop: 20 }}>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Scan Trans Id
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="fobValueInDollar"
                                    value={scanTransId}
                                    maxLength={15}
                                    disabled
                                />


                            </FormGroup>
                        </Col>
                        <Col md={2} style={{ marginTop: 21 }}>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10, fontSize: 13 }}
                                id="submitbtn2"
                                onClick={openScanData}

                            >
                                <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                Search
                            </button>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    IGM No
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="fobValueInDollar"
                                    maxLength={15}
                                    disabled
                                    value={igm}
                                />


                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    File Name
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="fobValueInDollar"
                                    maxLength={15}
                                    disabled
                                    value={fileName}
                                />


                            </FormGroup>
                        </Col>

                    </Row>
                    <Modal Modal isOpen={isModalOpenForScanData} onClose={closeScanData} toggle={closeScanData} style={{ maxWidth: '1200px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                        <ModalHeader toggle={closeScanData} style={{
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
                            /> Search Scanning Data</h5>



                        </ModalHeader>
                        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                            <Row>
                                <Col md={4}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Search by Trans Id / Ref No
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="searchId"
                                            name='searchId'
                                            value={searchId}
                                            onChange={(e) => setSearchId(e.target.value)}
                                        />

                                    </FormGroup>
                                </Col>
                                <Col md={4} style={{ marginTop: 24 }}>
                                    <button
                                        className="btn btn-outline-primary btn-margin newButton"
                                        style={{ marginRight: 10 }}
                                        id="submitbtn2"
                                        onClick={() => searchScanningData(searchId)}
                                    >
                                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                        Search
                                    </button>
                                    <button
                                        className="btn btn-outline-danger btn-margin newButton"
                                        style={{ marginRight: 10 }}
                                        id="submitbtn2"
                                        onClick={clearScanningData}
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
                                            <th scope="col">Trans Id</th>
                                            <th scope="col">Ref No</th>
                                            <th scope="col">File Name</th>
                                        </tr>
                                        <tr >
                                            <th scope="col"></th>
                                            <th scope="col">{searchedData.length}</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems1.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <input type="radio" name="radioGroup" onChange={() => getSelectedData(item[0])} value={item[0]} />
                                                </td>
                                                <td>{item[0]}</td>
                                                <td>{item[1]}</td>
                                                <td>{item[2]}</td>
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
                    {scanData.length > 0 && (
                        <div className='mt-1 table-responsive'>
                            <table className="table table-bordered table-hover tableHeader">
                                <thead className="tableHeader">
                                    <tr>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Sr No.</th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>IGM No</th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Container No</th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Reference Type</th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Scanner Type</th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Updated(Y/N)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scanData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.refNo}</td>
                                            <td>{item.containerNo}</td>
                                            <td>{item.scanType}</td>
                                            <td>{item.scannerType}</td>
                                            <td>{item.scanningUpdated}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            ) : (
                <></>
            )}

            {selectUploadType === 'BL wise tariff excel upload' && (
                <>
                    <Row>

                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Text Path
                                </label>
                                <Input
                                    className="form-control"
                                    type="file"
                                    id="fileUpload"
                                    accept=".xlsx, .xls"
                                    onChange={handleFileChange3}
                                    innerRef={fileInputRef3} // Attach the ref to the input
                                />

                            </FormGroup>
                        </Col>


                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Forwarders <span className='error-message'>*</span>
                                </label>
                                <Select
                                    value={{ value: fwdId, label: fwdName }}
                                    onChange={handleFwdChange}
                                    onInputChange={getFwdData}
                                    options={fwdData}
                                    placeholder="Select Forwarder"
                                    isClearable
                                    id="fwdId"
                                    name="fwdId"
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
                                <div style={{ color: 'red' }} className="error-message">{igmErrors.shippingLine}</div>

                            </FormGroup>

                        </Col>
                        {/* <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Base Rate Applicable
                                </label>
                                <Input
                                    className="form-control"
                                    type="checkbox"
                                    checked={checkBaseRate === 'Y'}
                                    onChange={(e) => setCheckBaseRate(e.target.checked ? 'Y' : 'N')}
                                    id="fileUpload"
                                    style={{ height: 25 }}
                                />

                            </FormGroup>
                        </Col> */}

                        <Col md={5} className='text-center' style={{ marginTop: 22 }}>

                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={handleUpload3}
                            >
                                <FontAwesomeIcon icon={faUpload} style={{ marginRight: "5px" }} />
                                Upload Tariff
                            </button>
                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={handleClearFile3}
                            >
                                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                Clear
                            </button>
                            <button
                                className="btn btn-outline-success btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={downloadBlTariffTemplateFile}

                            >
                                <FontAwesomeIcon icon={faFileExcel} style={{ marginRight: "5px" }} />
                                Download Excel Template
                            </button>
                        </Col>
                    </Row>
                    {errorMessage3.length > 0 && (
                        <div className="mt-3 table-responsive" style={{ fontSize: 14, marginTop: 20, color: 'red' }}>
                            <table className="table table-bordered table-hover tableHeader dynamic-table">
                                <thead className="tableHeader">
                                    <tr>
                                        <th scope="col" className="text-center" style={{ color: 'red' }}>Fields</th>
                                        <th scope="col" className="text-center" style={{ color: 'red' }}>Message</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {errorMessage3.map((item, index) => {
                                        const [message1, message2] = item.split(' ~ '); // Split by ' - '
                                        return (
                                            <tr key={index}>
                                                <td style={{ color: 'red' }}>{message1}</td>
                                                <td style={{ color: 'red' }}>{message2}</td>
                                            </tr>
                                        );
                                    })}

                                </tbody>
                            </table>
                        </div>
                    )}
                    <hr />

                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    BL Upload Trans Id
                                </label>
                                <Input
                                    className="form-control"
                                    type="text"
                                    id="blUploadTransId"
                                    name="blUploadTransId"
                                    value={blUploadTransId}
                                    disabled
                                />

                            </FormGroup>
                        </Col>
                        <Col md={2} style={{ marginTop: 21 }}>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10, fontSize: 13 }}
                                id="submitbtn2"
                                onClick={openGateInSearchModal}

                            >
                                <FontAwesomeIcon icon={faSearch} />

                            </button>
                        </Col>
                    </Row>

                    {blTransData.length > 0 && (
                        <div className="mt-3 table-responsive" style={{ fontSize: 14, marginTop: 20, color: 'red' }}>
                            <table className="table table-bordered table-hover tableHeader dynamic-table">
                                <thead className="tableHeader">
                                    <tr>
                                        <th scope="col" className="text-center">Sr No</th>
                                        <th scope="col" className="text-center">IGM No</th>
                                        <th scope="col" className="text-center">Item No</th>
                                        <th scope="col" className="text-center">Cont No</th>
                                        <th scope="col" className="text-center">Size</th>
                                        <th scope="col" className="text-center">Delivery Mode</th>
                                        <th scope="col" className="text-center">Special Delivery</th>
                                        <th scope="col" className="text-center">Forwarders</th>
                                        <th scope="col" className="text-center">Service Desc</th>
                                        <th scope="col" className="text-center">Amount</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {blTransData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item[1]}</td>
                                            <td>{item[2]}</td>
                                            <td>{item[3]}</td>
                                            <td>{item[4]}</td>
                                            <td>{item[5]}</td>
                                            <td>{item[6]}</td>
                                            <td>{item[7]}</td>
                                            <td>{item[8]}</td>
                                            <td>{item[9]}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
            {selectUploadType === 'SSR Upload By Excel' && (
                <>
                    <Row>

                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Text Path
                                </label>
                                <Input
                                    className="form-control"
                                    type="file"
                                    id="fileUpload"
                                    accept=".xlsx, .xls"
                                    onChange={handleFileChange4}
                                    innerRef={fileInputRef4} // Attach the ref to the input
                                />

                            </FormGroup>
                        </Col>


                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Forwarders <span className='error-message'>*</span>
                                </label>
                                <Select
                                    value={{ value: fwdId1, label: fwdName1 }}
                                    onChange={handleFwdChange1}
                                    onInputChange={getFwdData1}
                                    options={fwdData1}
                                    placeholder="Select Forwarder"
                                    isClearable
                                    id="fwdId"
                                    name="fwdId"
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
                                <div style={{ color: 'red' }} className="error-message">{igmErrors.shippingLine}</div>

                            </FormGroup>

                        </Col>
                        {/* <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Base Rate Applicable
                                </label>
                                <Input
                                    className="form-control"
                                    type="checkbox"
                                    checked={checkBaseRate === 'Y'}
                                    onChange={(e) => setCheckBaseRate(e.target.checked ? 'Y' : 'N')}
                                    id="fileUpload"
                                    style={{ height: 25 }}
                                />

                            </FormGroup>
                        </Col> */}

                        <Col md={5} className='text-center' style={{ marginTop: 22 }}>

                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={handleUpload4}
                            >
                                <FontAwesomeIcon icon={faUpload} style={{ marginRight: "5px" }} />
                                Upload SSR
                            </button>
                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={handleClearFile4}
                            >
                                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                Clear
                            </button>
                            <button
                                className="btn btn-outline-success btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={downloadBlTariffTemplateFile1}

                            >
                                <FontAwesomeIcon icon={faFileExcel} style={{ marginRight: "5px" }} />
                                Download Excel Template
                            </button>
                        </Col>
                    </Row>
                    {errorMessage4.length > 0 && (
                        <div className="mt-3 table-responsive" style={{ fontSize: 14, marginTop: 20, color: 'red' }}>
                            <table className="table table-bordered table-hover tableHeader dynamic-table">
                                <thead className="tableHeader">
                                    <tr>
                                        <th scope="col" className="text-center" style={{ color: 'red' }}>Fields</th>
                                        <th scope="col" className="text-center" style={{ color: 'red' }}>Message</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {errorMessage4.map((item, index) => {
                                        const [message1, message2] = item.split(' ~ '); // Split by ' - '
                                        return (
                                            <tr key={index}>
                                                <td style={{ color: 'red' }}>{message1}</td>
                                                <td style={{ color: 'red' }}>{message2}</td>
                                            </tr>
                                        );
                                    })}

                                </tbody>
                            </table>
                        </div>
                    )}
                    <hr />

                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    SSR Trans Id
                                </label>
                                <Input
                                    className="form-control"
                                    type="text"
                                    id="blUploadTransId1"
                                    name="blUploadTransId1"
                                    value={blUploadTransId1}
                                    disabled
                                />

                            </FormGroup>
                        </Col>
                        <Col md={2} style={{ marginTop: 21 }}>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10, fontSize: 13 }}
                                id="submitbtn2"
                                onClick={openGateInSearchModal1}

                            >
                                <FontAwesomeIcon icon={faSearch} />

                            </button>
                        </Col>
                    </Row>

                    {blTransData1.length > 0 && (
                        <div className="mt-3 table-responsive" style={{ fontSize: 14, marginTop: 20, color: 'red' }}>
                            <table className="table table-bordered table-hover tableHeader dynamic-table">
                                <thead className="tableHeader">
                                    <tr>
                                        <th scope="col" className="text-center">Sr No</th>
                                        <th scope="col" className="text-center">IGM No</th>
                                        <th scope="col" className="text-center">Item No</th>
                                        <th scope="col" className="text-center">Cont No</th>
                                        <th scope="col" className="text-center">Size / Type</th>
                                        <th scope="col" className="text-center">Service Desc</th>
                                        <th scope="col" className="text-center">Amount</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {blTransData1.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item[1]}</td>
                                            <td>{item[2]}</td>
                                            <td>{item[3]}</td>
                                            <td>{item[4]}{item[5]}</td>
                                            <td>{item[6]}</td>
                                            <td>{item[7]}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
            {selectUploadType === 'LCL Tariff Excel Upload' && (
                <>
                    <Row>

                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Text Path
                                </label>
                                <Input
                                    className="form-control"
                                    type="file"
                                    id="fileUpload"
                                    accept=".xlsx, .xls"
                                    onChange={handleFileChange5}
                                    innerRef={fileInputRef5} // Attach the ref to the input
                                />

                            </FormGroup>
                        </Col>


                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Forwarders <span className='error-message'>*</span>
                                </label>
                                <Select
                                    value={{ value: fwdId2, label: fwdName2 }}
                                    onChange={handleFwdChange2}
                                    onInputChange={getFwdData2}
                                    options={fwdData2}
                                    placeholder="Select Forwarder"
                                    isClearable
                                    id="fwdId"
                                    name="fwdId"
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
                                <div style={{ color: 'red' }} className="error-message">{igmErrors.shippingLine}</div>

                            </FormGroup>

                        </Col>
                        {/* <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Base Rate Applicable
                                </label>
                                <Input
                                    className="form-control"
                                    type="checkbox"
                                    checked={checkBaseRate === 'Y'}
                                    onChange={(e) => setCheckBaseRate(e.target.checked ? 'Y' : 'N')}
                                    id="fileUpload"
                                    style={{ height: 25 }}
                                />

                            </FormGroup>
                        </Col> */}

                        <Col md={5} className='text-center' style={{ marginTop: 22 }}>

                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={handleUpload5}
                            >
                                <FontAwesomeIcon icon={faUpload} style={{ marginRight: "5px" }} />
                                Upload Tariff
                            </button>
                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={handleClearFile5}
                            >
                                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                Clear
                            </button>
                            <button
                                className="btn btn-outline-success btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={downloadBlTariffTemplateFile2}

                            >
                                <FontAwesomeIcon icon={faFileExcel} style={{ marginRight: "5px" }} />
                                Download Excel Template
                            </button>
                        </Col>
                    </Row>
                    {errorMessage5.length > 0 && (
                        <div className="mt-3 table-responsive" style={{ fontSize: 14, marginTop: 20, color: 'red' }}>
                            <table className="table table-bordered table-hover tableHeader dynamic-table">
                                <thead className="tableHeader">
                                    <tr>
                                        <th scope="col" className="text-center" style={{ color: 'red' }}>Fields</th>
                                        <th scope="col" className="text-center" style={{ color: 'red' }}>Message</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {errorMessage5.map((item, index) => {
                                        const [message1, message2] = item.split(' ~ '); // Split by ' - '
                                        return (
                                            <tr key={index}>
                                                <td style={{ color: 'red' }}>{message1}</td>
                                                <td style={{ color: 'red' }}>{message2}</td>
                                            </tr>
                                        );
                                    })}

                                </tbody>
                            </table>
                        </div>
                    )}
                    <hr />

                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">

                                    LCL Upload Trans Id
                                </label>
                                <Input
                                    className="form-control"
                                    type="text"
                                    id="blUploadTransId2"
                                    name="blUploadTransId2"
                                    value={blUploadTransId2}
                                    disabled
                                />

                            </FormGroup>
                        </Col>
                        <Col md={2} style={{ marginTop: 21 }}>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10, fontSize: 13 }}
                                id="submitbtn2"
                                onClick={openGateInSearchModal2}

                            >
                                <FontAwesomeIcon icon={faSearch} />

                            </button>
                        </Col>
                    </Row>

                    {blTransData2.length > 0 && (
                        <div className="mt-3 table-responsive" style={{ fontSize: 14, marginTop: 20, color: 'red' }}>
                            <table className="table table-bordered table-hover tableHeader dynamic-table">
                                <thead className="tableHeader">
                                    <tr>
                                        <th scope="col" className="text-center">Sr No</th>
                                        <th scope="col" className="text-center">IGM No</th>
                                        <th scope="col" className="text-center">Item No</th>
                                        <th scope="col" className="text-center">Sub Line No</th>
                                        <th scope="col" className="text-center">LCL Validity</th>
                                        <th scope="col" className="text-center">Tariff Code</th>
                                        <th scope="col" className="text-center">Service Desc</th>
                                        <th scope="col" className="text-center">Amount</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {blTransData2.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item[1]}</td>
                                            <td>{item[2]}</td>
                                            <td>{item[3]}</td>
                                            <td>{item[4]}</td>
                                            <td>{item[5]}</td>
                                            <td>{item[6]}</td>
                                            <td>{item[7]}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}

            {selectUploadType === 'Upload Advance Hold Container Using Excel' && (
                <>
                    <Row>

                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Text Path
                                </label>
                                <Input
                                    className="form-control"
                                    type="file"
                                    id="fileUpload"
                                    accept=".xlsx, .xls"
                                    onChange={handleFileChange6}
                                    innerRef={fileInputRef6} // Attach the ref to the input
                                />

                            </FormGroup>
                        </Col>


                        <Col md={8} style={{ marginTop: 22 }}>

                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={handleUpload6}
                            >
                                <FontAwesomeIcon icon={faUpload} style={{ marginRight: "5px" }} />
                                Upload Hold Containers
                            </button>
                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={handleClearFile6}
                            >
                                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                Clear
                            </button>
                            <button
                                className="btn btn-outline-success btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={downloadBlTariffTemplateFile3}

                            >
                                <FontAwesomeIcon icon={faFileExcel} style={{ marginRight: "5px" }} />
                                Download Excel Template
                            </button>
                        </Col>
                    </Row>
                    {errorMessage6.length > 0 && (
                        <div className="mt-3 table-responsive" style={{ fontSize: 14, marginTop: 20, color: 'red' }}>
                            <table className="table table-bordered table-hover tableHeader dynamic-table">
                                <thead className="tableHeader">
                                    <tr>
                                        <th scope="col" className="text-center" style={{ color: 'red' }}>Fields</th>
                                        <th scope="col" className="text-center" style={{ color: 'red' }}>Message</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {errorMessage6.map((item, index) => {
                                        const [message1, message2] = item.split(' ~ '); // Split by ' - '
                                        return (
                                            <tr key={index}>
                                                <td style={{ color: 'red' }}>{message1}</td>
                                                <td style={{ color: 'red' }}>{message2}</td>
                                            </tr>
                                        );
                                    })}

                                </tbody>
                            </table>
                        </div>
                    )}
                    <hr />



                    {blTransData3.length > 0 && (
                        <div className="mt-3 table-responsive" style={{ fontSize: 14, marginTop: 20, color: 'red' }}>
                            <table className="table table-bordered table-hover tableHeader dynamic-table">
                                <thead className="tableHeader">
                                    <tr>
                                        <th scope="col" className="text-center">Sr No</th>
                                        <th scope="col" className="text-center">Container No</th>
                                        <th scope="col" className="text-center">Hold Status</th>
                                        <th scope="col" className="text-center">Agency</th>
                                        <th scope="col" className="text-center">Remarks</th>
                                        <th scope="col" className="text-center">Holding Agent</th>
                                        <th scope="col" className="text-center">Created By</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems4.map((item, index) => (
                                        <tr key={index}>
                                            <td>{((currentPage4 - 1) * itemsPerPage4) + index + 1}</td>
                                            <td>{item[0]}</td>
                                            <td>{item[1]}</td>
                                            <td>{item[2]}</td>
                                            <td>{item[3]}</td>
                                            <td>{item[4]}</td>
                                            <td>{item[5]}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                                <Pagination.First onClick={() => handlePageChange4(1)} />
                                <Pagination.Prev
                                    onClick={() => handlePageChange4(currentPage4 - 1)}
                                    disabled={currentPage4 === 1}
                                />
                                <Pagination.Ellipsis />

                                {displayPages4().map((pageNumber) => (
                                    <Pagination.Item
                                        key={pageNumber}
                                        active={pageNumber === currentPage4}
                                        onClick={() => handlePageChange4(pageNumber)}
                                    >
                                        {pageNumber}
                                    </Pagination.Item>
                                ))}

                                <Pagination.Ellipsis />
                                <Pagination.Next
                                    onClick={() => handlePageChange4(currentPage4 + 1)}
                                    disabled={currentPage4 === totalPages4}
                                />
                                <Pagination.Last onClick={() => handlePageChange4(totalPages4)} />
                            </Pagination>
                        </div>
                    )}
                </>
            )}

            {selectUploadType === 'SSR Upload By Excel Without Job Order' && (
                <>
                    <Row>

                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Text Path
                                </label>
                                <Input
                                    className="form-control"
                                    type="file"
                                    id="fileUpload"
                                    accept=".xlsx, .xls"
                                    onChange={handleFileChange7}
                                    innerRef={fileInputRef7} // Attach the ref to the input
                                />

                            </FormGroup>
                        </Col>


                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Forwarders <span className='error-message'>*</span>
                                </label>
                                <Select
                                    value={{ value: fwdId4, label: fwdName4 }}
                                    onChange={handleFwdChange4}
                                    onInputChange={getFwdData4}
                                    options={fwdData4}
                                    placeholder="Select Forwarder"
                                    isClearable
                                    id="fwdId"
                                    name="fwdId"
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
                                <div style={{ color: 'red' }} className="error-message">{igmErrors.shippingLine}</div>

                            </FormGroup>

                        </Col>
                        {/* <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Base Rate Applicable
                                </label>
                                <Input
                                    className="form-control"
                                    type="checkbox"
                                    checked={checkBaseRate === 'Y'}
                                    onChange={(e) => setCheckBaseRate(e.target.checked ? 'Y' : 'N')}
                                    id="fileUpload"
                                    style={{ height: 25 }}
                                />

                            </FormGroup>
                        </Col> */}

                        <Col md={5} className='text-center' style={{ marginTop: 22 }}>

                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={handleUpload7}
                            >
                                <FontAwesomeIcon icon={faUpload} style={{ marginRight: "5px" }} />
                                Upload SSR
                            </button>
                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={handleClearFile7}
                            >
                                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                Clear
                            </button>
                            <button
                                className="btn btn-outline-success btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={downloadBlTariffTemplateFile4}

                            >
                                <FontAwesomeIcon icon={faFileExcel} style={{ marginRight: "5px" }} />
                                Download Excel Template
                            </button>
                        </Col>
                    </Row>
                    {errorMessage7.length > 0 && (
                        <div className="mt-3 table-responsive" style={{ fontSize: 14, marginTop: 20, color: 'red' }}>
                            <table className="table table-bordered table-hover tableHeader dynamic-table">
                                <thead className="tableHeader">
                                    <tr>
                                        <th scope="col" className="text-center" style={{ color: 'red' }}>Fields</th>
                                        <th scope="col" className="text-center" style={{ color: 'red' }}>Message</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {errorMessage7.map((item, index) => {
                                        const [message1, message2] = item.split(' ~ '); // Split by ' - '
                                        return (
                                            <tr key={index}>
                                                <td style={{ color: 'red' }}>{message1}</td>
                                                <td style={{ color: 'red' }}>{message2}</td>
                                            </tr>
                                        );
                                    })}

                                </tbody>
                            </table>
                        </div>
                    )}
                    <hr />

                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    SSR Trans Id
                                </label>
                                <Input
                                    className="form-control"
                                    type="text"
                                    id="blUploadTransId7"
                                    name="blUploadTransId7"
                                    value={blUploadTransId7}
                                    disabled
                                />

                            </FormGroup>
                        </Col>
                        <Col md={2} style={{ marginTop: 21 }}>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10, fontSize: 13 }}
                                id="submitbtn2"
                                onClick={openGateInSearchModal7}

                            >
                                <FontAwesomeIcon icon={faSearch} />

                            </button>
                        </Col>
                    </Row>

                    {blTransData7.length > 0 && (
                        <div className="mt-3 table-responsive" style={{ fontSize: 14, marginTop: 20, color: 'red' }}>
                            <table className="table table-bordered table-hover tableHeader dynamic-table">
                                <thead className="tableHeader">
                                    <tr>
                                        <th scope="col" className="text-center">Sr No</th>
                                        <th scope="col" className="text-center">IGM No</th>
                                        <th scope="col" className="text-center">Item No</th>
                                        <th scope="col" className="text-center">Cont No</th>
                                        <th scope="col" className="text-center">Size</th>
                                        <th scope="col" className="text-center">Service Desc</th>
                                        <th scope="col" className="text-center">Amount</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {blTransData7.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item[1]}</td>
                                            <td>{item[2]}</td>
                                            <td>{item[3]}</td>
                                            <td>{item[4]}</td>
                                            <td>{item[5]}</td>
                                            <td>{item[6]}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
