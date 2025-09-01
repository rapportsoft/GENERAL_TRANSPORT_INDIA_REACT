
import AuthContext from '../Components/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
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
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faCalendarAlt, faAdd, faCancel, faXmark, faArrowDown, faPlus, faArrowUp, faEdit, faChevronUp, faChevronDown, faMagnifyingGlassChart, faFileEdit } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import useAxios from '../Components/useAxios';
import { dark } from '@mui/material/styles/createPalette';
import { toast } from 'react-toastify';
import { CSSTransition } from 'react-transition-group';

export default function IGMEntry({ igm, igm1 }) {
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

    const [impCargoFlag, setImpCargoFlag] = useState('add');

    const handleAddDetails = () => {
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
                navigate("/master/importCargoDtls", { state: { igmData: igmData, flag: 'add', profitCenterData: profitCenterData } })
                setIgmData(response.data);
                toast.success("Data save successfully!!", {
                    autoClose: 800
                })
                setLoading(false);
                setIgmFlag('edit');
                setImpCargoFlag('add')
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.response.data, {
                    autoClose: 800
                })
            })


    }


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
                getIgmCrgData(data.igmTransId, data.igmNo);
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

    const handleUpdateIgm = () => {
        setLoading(true);
        let errors = {};


        if (!vesselId) {
            errors.vessel = "Vessel is required."
            document.getElementById("vessel").classList.add("error-border");
        }
        if (!linerId) {
            errors.shippingLine = "Shipping line is required."
            document.getElementById("shippingLine").classList.add("error-border");
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

        axios.post(`${ipaddress}cfigm/updateIgmHead?cid=${companyid}&bid=${branchId}&user=${userId}`, igmData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                getIgmCrgData(data.igmTransId, data.igmNo);
                setIgmData(response.data);
                toast.success("Data Update successfully!!", {
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
        setisHeaderCheck(false);
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

    const getIgmCrgData = (trans, igm) => {
        axios.get(`${ipaddress}cfigm/getDatabyIgmNoAndTrans?cid=${companyid}&bid=${branchId}&trans=${trans}&igm=${igm}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {


                console.log("response.data.crg " + response.data);

                setIgmCrgData(response.data);

                const data = response.data;

                setisHeaderCheck(data.every(item => item.importerId === item.notifyPartyId));
            })
            .catch((error) => {
                setisHeaderCheck(false);
            })
    }

    const selectIGMSearchRadio = (trans, igm, vesselName, portName, shippingLineName, shippingLineCode, shippingAgentName, shippingAgentCode) => {
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
                    getIgmCrgData(data.igmTransId, data.igmNo);
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


    useEffect(() => {
        if (igm) {
            igmSearch(igm, igm1);
        }
    }, [igm, igm1])

    const igmSearch = (igm, igm1) => {
        axios.get(`${ipaddress}cfigm/getDataByIGM?cid=${companyid}&bid=${branchId}&igm=${igm1}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data.igm;
                const data1 = response.data.igm1;
                console.log('data data ', data);

                setPortId(data.port);
                setVesselId(data.vesselId);
                setLinerId(data.shippingLine);
                setAgentId(data.shippingAgent);
                setPortName(data1[0][10]);
                setVesselName(data1[0][6]);
                setLinerName(data1[0][12]);
                setLinerCode(data1[0][13]);
                setAgentName(data1[0][14]);
                setAgentCode(data1[0][15]);
                setIgmFlag('edit');
                getIgmCrgData(data.igmTransId, data.igmNo);
                setIgmData(data);


            })
            .catch((error) => {
                handleIGMClear();
            })
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




    //

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

    const [hsnData, setHsnData] = useState([]);
    const getHsnData = () => {
        const id = 'J00071';
        axios.get(`${ipaddress}jardetail/getJarDetail?companyId=${companyid}&jarId=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setHsnData(response.data);
            })
            .catch((error) => {

            })
    }

    useEffect(() => {
        getTypeOfPack();
        getHsnData();
    }, [])

    const [igmCrgData, setIgmCrgData] = useState([{
        companyId: '',
        branchId: '',
        finYear: new Date().getFullYear(),
        igmTransId: '',
        igmCrgTransId: '',
        profitcentreId: profitCenterData.profitcentreId,
        igmLineNo: '',
        igmNo: '',
        cycle: 'IMP',
        viaNo: '',
        blNo: '',
        blDate: null,
        hsnCode: '',
        cargoMovement: '',
        sampleQty: 0,
        importerId: '',
        importerName: '',
        importerSr: '',
        importerAddress1: '',
        importerAddress2: '',
        importerAddress3: '',
        importerType: '',
        notifyPartyId: '',
        notifyPartyName: '',
        notifySr: '',
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
        noOfPackages: "",
        qtyTakenOut: 0,
        qtyTakenOutWeight: 0,
        grossWeight: "",
        weighmentWeight: 0,
        unitOfWeight: 'KG',
        typeOfPackage: '',
        cargoType: 'NAGRO',
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
        igmImporterAddress3: '',
        accountHolderId: "",
        accountHolderName: "",
        invoiceDone: ''
    }]);


    function handleInputChange(e) {
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



    const handleIgmCrgChange = (e, index) => {
        const { name, value } = e.target;
        let sanitizedValue = value;

        // Sanitize input for specific fields
        if (['grossWeight', 'noOfPackages'].includes(name)) {
            sanitizedValue = handleInputChange(value);
        }

        // Update igmCrgData state
        setIgmCrgData(prevState => {
            const updatedData = [...prevState];
            updatedData[index] = {
                ...updatedData[index],
                [name]: sanitizedValue
            };
            return updatedData;
        });

        // Remove error for the specific field
        setErrors(prevErrors => {
            const updatedErrors = [...prevErrors];
            if (updatedErrors[index]) {
                delete updatedErrors[index][name]; // Corrected field access
                if (Object.keys(updatedErrors[index]).length === 0) {
                    updatedErrors.splice(index, 1);
                }
            }
            return updatedErrors;
        });

        // Remove error-border class
        document.getElementById(`${name}${index}`).classList.remove('error-border');
    };
    const handleBLDate = (date, index) => {
        // Remove the error for the specific index and field
        setErrors(prevErrors => {
            const updatedErrors = [...prevErrors];
            if (updatedErrors[index]) {
                delete updatedErrors[index].blDate;
                if (Object.keys(updatedErrors[index]).length === 0) {
                    updatedErrors.splice(index, 1);
                }
            }
            return updatedErrors;
        });

        // Update the state with the new date for the specific index
        setIgmCrgData(prevState => {
            const updatedData = [...prevState];
            updatedData[index] = {
                ...updatedData[index],
                blDate: date
            };
            return updatedData;
        });
    };



    const [igmCnData, setIgmCnData] = useState({
        companyId: '',
        branchId: '',
        finYear: new Date().getFullYear(),
        igmTransId: '',
        profitcentreId: '',
        containerTransId: '',
        igmNo: '',
        igmLineNo: '',
        containerNo: '',
        containerSize: '',
        containerType: '',
        typeOfContainer: 'General',
        iso: '',
        containerWeight: '',
        containerStatus: 'FCL',
        containerSealNo: '',
        scannerType: '',
        gateInDate: null,
        gateOutDate: null,
        holdRemarks: '',
        holdStatus: '',
        cargoWt: '',
        grossWt: '',
        noOfPackages: '',
        scanningDoneStatus: '',
        temperature: '',
        status: '',
        upTariffDelMode: '',
        odcStatus: 'N',
        lowBed: 'N',
        invoiceAssesed: 'N'
    }
    )

    const handleIGMCNChange = (event) => {
        const { name, value } = event.target;
        let sanitizedValue = value;

        if (['noOfPackages', 'grossWt', 'cargoWt'].includes(name)) {
            sanitizedValue = handleInputChange(value);
        }

        if (name === 'iso') {
            console.log('name ', name);
            getIso(sanitizedValue);
        }

        if (name === 'containerNo') {
            if (!handleContainerNoValidation1(value)) {
                setContainerErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "Invalid Container No.",
                }));
                document.getElementById('containerNo').classList.add('error-border');
            }
            else {
                document.getElementById(name).classList.remove('error-border');
                setContainerErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "",
                }));
            }
        }
        else {
            document.getElementById(name).classList.remove('error-border');
            setContainerErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "",
            }));
        }


        setIgmCnData((prevFilters) => ({
            ...prevFilters,
            [name]: sanitizedValue,
        }));

        if (name === 'typeOfContainer' && sanitizedValue !== 'Reefer') {
            setIgmCnData((prevFilters) => ({
                ...prevFilters,
                temperature: '',
            }));
        }




    };

    const handleContainerCheckChange = (event) => {
        const { name, checked } = event.target;
        setIgmCnData((prevFilters) => {
            const updatedFilters = {
                ...prevFilters,
                [name]: checked ? 'Y' : 'N',
            };

            // Check if holdStatus is 'Y' and holdRemarks is empty
            if (name === 'holdStatus' && checked && !prevFilters.holdRemarks) {
                updatedFilters.holdRemarks = 'Not_SCAN';
            }

            return updatedFilters;
        });
    };



    const getIso = (val) => {
        axios.get(`${ipaddress}IsoContainer/getIso?cid=${companyid}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                console.log('iso ', data);

                setIgmCnData((prevFilters) => ({
                    ...prevFilters,
                    ['containerSize']: data.containerSize,
                    ['containerType']: data.containerType,
                    ['containerWeight']: data.tareWeight,
                }));
            })
            .catch((error) => {
                setIgmCnData((prevFilters) => ({
                    ...prevFilters,
                    ['containerSize']: '',
                    ['containerType']: '',
                    ['containerWeight']: '',
                }));
            })
    }




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
        searchIGM2('');
    }


    const handleCloseImp = (val) => {
        setIsModalOpenForimp(false);
        setIgmSearchId('');
        setIgmSearchedData([]);
    }






    const [igmSearchId2, setIgmSearchId2] = useState('');
    const [igmSearchedData2, setIgmSearchedData2] = useState([]);
    const [impAddresses, setimpAddresses] = useState([]);
    const [importers, setImporters] = useState([]);

    const getImp = (val) => {
        if (val === '') {
            setImporters([]);
            setimpAddresses([]);

            return;
        }
        axios.get(`${ipaddress}party/getImp?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const portOptions = data.map(port => ({
                    value: port[0],
                    label: port[1] + ' - ' + port[2] + ' ' + port[3] + ' ' + port[4],
                    valName: port[1],
                    add1: port[2],
                    add2: port[3],
                    add3: port[4],
                    sr: port[5]
                }))
                setImporters(portOptions);
            })
            .catch((error) => {
            })

    }

    const CustomOption = (props) => {
        return (
            <components.Option {...props}>
                <span style={{ fontWeight: 'bold' }}>{props.data.valName}</span>
                {" - " + props.data.add1 + " " + props.data.add2 + " " + props.data.add3}
            </components.Option>
        );
    };

    const handleChangeImp = async (selectedOption, { action }, index) => {
        if (action === 'clear') {
            setIgmCrgData(prevState => {
                const updatedData = [...prevState];
                updatedData[index] = {
                    ...updatedData[index],
                    importerId: '',
                    importerName: '',
                    importerAddress1: '',
                    importerAddress2: '',
                    importerAddress3: '',
                    importerSr: '',
                    notifyPartyId: isHeaderCheck ? '' : updatedData[index].notifyPartyId,
                    notifySr: isHeaderCheck ? '' : updatedData[index].notifySr,
                    notifyPartyName: isHeaderCheck ? '' : updatedData[index].notifyPartyName,
                    notifiedAddress1: isHeaderCheck ? '' : updatedData[index].notifiedAddress1,
                    notifiedAddress2: isHeaderCheck ? '' : updatedData[index].notifiedAddress2,
                    notifiedAddress3: isHeaderCheck ? '' : updatedData[index].notifiedAddress3,
                };
                return updatedData;
            });
            setImporters([]);
            setimpAddresses([]);
        } else {
            setIgmCrgData(prevState => {
                const updatedData = [...prevState];
                updatedData[index] = {
                    ...updatedData[index],
                    importerId: selectedOption.value,
                    importerName: selectedOption.valName,
                    importerAddress1: selectedOption.add1,
                    importerAddress2: selectedOption.add2,
                    importerAddress3: selectedOption.add3,
                    importerSr: selectedOption.sr,
                    notifyPartyId: isHeaderCheck ? selectedOption.value : '',
                    notifySr: isHeaderCheck ? selectedOption.sr : '',
                    notifyPartyName: isHeaderCheck ? selectedOption.valName : '',
                    notifiedAddress1: isHeaderCheck ? selectedOption.add1 : '',
                    notifiedAddress2: isHeaderCheck ? selectedOption.add2 : '',
                    notifiedAddress3: isHeaderCheck ? selectedOption.add3 : '',
                };
                return updatedData;
            });
            selectImpAddress(selectedOption.value);
            setErrors(prevErrors => {
                const updatedErrors = [...prevErrors];
                if (updatedErrors[index]) {
                    delete updatedErrors[index]['importerName']; // Corrected field access
                    delete updatedErrors[index]['importerAddress1']; // Corrected field access
                    if (Object.keys(updatedErrors[index]).length === 0) {
                        updatedErrors.splice(index, 1);
                    }
                }
                return updatedErrors;
            });

            // Remove error-border class
            document.getElementById(`importerAddress1${index}`).classList.remove('error-border');
        }
    };


    const handleChangeNotifiedImp = async (selectedOption, { action }, index) => {
        if (action === 'clear') {
            setIgmCrgData(prevState => {
                const updatedData = [...prevState];
                updatedData[index] = {
                    ...updatedData[index],
                    notifyPartyId: '',
                    notifyPartyName: '',
                    notifiedAddress1: '',
                    notifiedAddress2: '',
                    notifiedAddress3: '',
                    notifySr: ''
                };
                return updatedData;
            });
            setImporters([]);
            setimpAddresses([]);
        } else {
            setIgmCrgData(prevState => {
                const updatedData = [...prevState];
                updatedData[index] = {
                    ...updatedData[index],
                    notifyPartyId: selectedOption.value,
                    notifyPartyName: selectedOption.valName,
                    notifiedAddress1: selectedOption.add1,
                    notifiedAddress2: selectedOption.add2,
                    notifiedAddress3: selectedOption.add3,
                    notifySr: selectedOption.sr
                };
                return updatedData;
            });
            selectImpAddress(selectedOption.value);
        }
    };

    const checkNotify = (i, e) => {
        if (e.target.checked) {
            setIgmCrgData(prevState => {
                const updatedData = [...prevState];
                updatedData[i] = {
                    ...updatedData[i],
                    notifyPartyId: updatedData[i].importerId, // Set notifyPartyId same as importerId
                    notifyPartyName: updatedData[i].importerName, // Set notifyPartyName same as importerName
                    notifiedAddress1: updatedData[i].importerAddress1, // Set notifiedAddress1 same as importerAddress1
                    notifiedAddress2: updatedData[i].importerAddress2, // Set notifiedAddress2 same as importerAddress2
                    notifiedAddress3: updatedData[i].importerAddress3  // Set notifiedAddress3 same as importerAddress3
                };
                return updatedData;
            });
        }
        else {
            setIgmCrgData(prevState => {
                const updatedData = [...prevState];
                updatedData[i] = {
                    ...updatedData[i],
                    notifyPartyId: '',
                    notifyPartyName: '',
                    notifiedAddress1: '',
                    notifiedAddress2: '',
                    notifiedAddress3: ''
                };
                return updatedData;
            });
        }
    }


    const [isHeaderCheck, setisHeaderCheck] = useState(false);

    const handleHeaderCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setisHeaderCheck(isChecked ? true : false);
        setIgmCrgData(prevState => {
            return prevState.map(item => ({
                ...item,
                notifyPartyId: isChecked ? item.importerId : item.notifyPartyId,
                notifyPartyName: isChecked ? item.importerName : item.notifyPartyName,
                notifiedAddress1: isChecked ? item.importerAddress1 : item.notifiedAddress1,
                notifiedAddress2: isChecked ? item.importerAddress2 : item.notifiedAddress2,
                notifiedAddress3: isChecked ? item.importerAddress3 : item.importerAddress3,
                notifySr: isChecked ? item.importerSr : item.notifySr,
            }));
        });
    };

    const selectImpAddress = (val) => {
        console.log('val ', val);

        if (val === '') {

            setimpAddresses([]);

            return;
        }
        axios.get(`${ipaddress}party/getImpAddress?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                console.log('Add ', data);

                const portOptions = data.map(port => ({
                    value: port[0],
                    label: port[0],
                    // add2: port[1],
                    // add3: port[2],
                }))
                console.log('portOptions ', portOptions);

                setimpAddresses(portOptions);
            })
            .catch((error) => {
            })
    }

    console.log(impAddresses);


    const handleChangeImpAdd = async (selectedOption, { action }, index) => {
        if (action === 'clear') {
            setIgmCrgData(prevState => {
                const updatedData = [...prevState];
                updatedData[index] = {
                    ...updatedData[index],
                    importerAddress1: '',
                    importerAddress2: '',
                    importerAddress3: ''
                };
                return updatedData;
            });
            setimpAddresses([]);
        } else {
            setIgmCrgData(prevState => {
                const updatedData = [...prevState];
                updatedData[index] = {
                    ...updatedData[index],
                    importerAddress1: selectedOption.value,
                    // importerAddress2: selectedOption.add2,
                    // importerAddress3: selectedOption.add3
                };
                return updatedData;
            });
        }
    };


    const searchIGM2 = (id) => {
        setLoading(true);
        axios.get(`${ipaddress}party/getImp?cid=${companyid}&bid=${branchId}&val=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setIgmSearchedData2(response.data);
                setLoading(false);
                setCurrentPage2(1);
            })
            .catch((error) => {
                setLoading(false);
            })
    }


    const clearSearch2 = () => {
        setIgmSearchId2('');
        searchIGM2('');
    }

    const selectIGMSearchRadio2 = (id, name, ad1, ad2, ad3, index) => {
        console.log('id ', id === ' ');
        igmCrgData[index].importerId = id;
        igmCrgData[index].importerName = name;
        igmCrgData[index].importerAddress1 = ad1;
        igmCrgData[index].importerAddress2 = ad2;
        igmCrgData[index].importerAddress3 = ad3;

        document.getElementById(`importerName${index}`).classList.remove('error-border');
        document.getElementById(`importerAddress1${index}`).classList.remove('error-border');

        setErrors(prevErrors => {
            const updatedErrors = [...prevErrors];
            if (updatedErrors[index]) {
                delete updatedErrors[index].importerName;
                if (Object.keys(updatedErrors[index]).length === 0) {
                    updatedErrors.splice(index, 1);
                }
            }
            return updatedErrors;
        });


        handleCloseImp();
    }

    const [currentPage2, setCurrentPage2] = useState(1);
    const [itemsPerPage2] = useState(5);

    const indexOfLastItem2 = currentPage2 * itemsPerPage2;
    const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;
    const currentItems2 = igmSearchedData2.slice(indexOfFirstItem2, indexOfLastItem2);
    const totalPages2 = Math.ceil(igmSearchedData2.length / itemsPerPage2);

    // Function to handle page change
    const handlePageChange2 = (page) => {
        if (page >= 1 && page <= totalPages2) {
            setCurrentPage2(page);
        }
    };
    const displayPages2 = () => {
        const centerPageCount = 5;
        const middlePage = Math.floor(centerPageCount / 2);
        let startPage = currentPage - middlePage;
        let endPage = currentPage + middlePage;

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
        axios.get(`${ipaddress}party/getImp?cid=${companyid}&bid=${branchId}&val=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setIgmSearchedData1(response.data);
                setLoading(false);
                console.log('party ', response.data);
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

    const selectIGMSearchRadio1 = (id, name, ad1, ad2, ad3, index) => {
        igmCrgData[index].notifyPartyId = id;
        igmCrgData[index].notifyPartyName = name;
        igmCrgData[index].notifiedAddress1 = ad1;
        igmCrgData[index].notifiedAddress2 = ad2;
        igmCrgData[index].notifiedAddress3 = ad3;
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
            endPage = Math.min(totalPages1, centerPageCount);
        }

        if (endPage > totalPages1) {
            endPage = totalPages1;
            startPage = Math.max(1, totalPages1 - centerPageCount + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };


    const [isModalOpenForAccHolder, setisModalOpenForAccHolder] = useState(false);

    const handleOpenAccModal = () => {
        setisModalOpenForAccHolder(true);
        searchIGM3('');
    }
    const handleCloseAccModal = () => {
        setisModalOpenForAccHolder(false);
        setIgmSearchId3('');
        setIgmSearchedData3([]);
    }


    const [igmSearchId3, setIgmSearchId3] = useState('');
    const [igmSearchedData3, setIgmSearchedData3] = useState([]);

    const getAccountHolderData = (val) => {
        if (val === '') {
            setIgmSearchedData3([]);
            return;
        }

        axios.get(`${ipaddress}party/getAcc?cid=${companyid}&bid=${branchId}&val=${val}`, {
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
                setIgmSearchedData3(portOptions);
            })
            .catch((error) => {
            })
    }

    const handleChangeAccountHolder = async (selectedOption, { action }, index) => {
        if (action === 'clear') {
            setIgmCrgData(prevState => {
                const updatedData = [...prevState];
                updatedData[index] = {
                    ...updatedData[index],
                    accountHolderId: '',
                    accountHolderName: ''
                };
                return updatedData;
            });
        } else {
            setIgmCrgData(prevState => {
                const updatedData = [...prevState];
                updatedData[index] = {
                    ...updatedData[index],
                    accountHolderId: selectedOption.value,
                    accountHolderName: selectedOption.label
                };
                return updatedData;
            });
        }
    };

    const searchIGM3 = (id) => {
        setLoading(true);
        axios.get(`${ipaddress}party/getAcc?cid=${companyid}&bid=${branchId}&val=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setIgmSearchedData3(response.data);
                setLoading(false);
                setCurrentPage3(1);
            })
            .catch((error) => {
                setLoading(false);
            })
    }


    const clearSearch3 = () => {
        setIgmSearchId3('');
        searchIGM3('');
    }

    const selectIGMSearchRadio3 = (id, name, index) => {
        console.log('igmCrgData igmCrgData ', igmCrgData, ' ', index);
        igmCrgData[index].accountHolderId = id;
        igmCrgData[index].accountHolderName = name;
        handleCloseAccModal();
    }

    const [currentPage3, setCurrentPage3] = useState(1);
    const [itemsPerPage3] = useState(5);

    const indexOfLastItem3 = currentPage3 * itemsPerPage3;
    const indexOfFirstItem3 = indexOfLastItem3 - itemsPerPage3;
    const currentItems3 = igmSearchedData3.slice(indexOfFirstItem3, indexOfLastItem3);
    const totalPages3 = Math.ceil(igmSearchedData3.length / itemsPerPage3);

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


    const [errors, setErrors] = useState([]);

    const saveCrgData = () => {
        setLoading(true);
        let newErrors = igmCrgData.map(() => ({}));
        setErrors([]);

        igmCrgData.forEach((data, index) => {
            let rowErrors = {};
            console.log("data.importerName === '' ", data.importerName === ' ');
            if (!data.igmLineNo) rowErrors.igmLineNo = "IGM line no is required.";
            if (!data.blNo) rowErrors.blNo = "BL no is required.";
            if (!data.blDate) rowErrors.blDate = "BL Date is required.";
            if (!data.commodityDescription) rowErrors.commodityDescription = "Commodity desc. is required.";
            if (!data.cargoMovement) rowErrors.cargoMovement = "Cargo movement is required.";
            if (!data.grossWeight) rowErrors.grossWeight = "Cargo Wt. is required.";
            if (!data.unitOfWeight) rowErrors.unitOfWeight = "Unit of wt. is required.";
            if (!data.noOfPackages) rowErrors.noOfPackages = "No Of pack. is required.";
            if (!data.hsnCode) rowErrors.hsnCode = "HSN Code is required.";
            if (!data.typeOfPackage) rowErrors.typeOfPackage = "Type of pack. is required.";
            if (data.importerName === ' ' || !data.importerName) rowErrors.importerName = "Importer name is required.";
            if (!data.importerAddress1 || data.importerAddress1 === ' ') rowErrors.importerAddress1 = "Importer address1 is required.";
            if (!data.destination) rowErrors.destination = "Destination is required.";
            // if (!data.importerType) rowErrors.importerType = "Importer type is required.";
            if (Object.keys(rowErrors).length > 0) {
                newErrors[index] = rowErrors;
            }
        });

        // Check if any errors exist
        const hasErrors = newErrors.some(errorObj => Object.keys(errorObj).length > 0);

        if (hasErrors) {
            console.log('newErrors ', newErrors);
            setErrors(newErrors);
            setLoading(false);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            });
            console.log('errors ', errors);
            return;
        }


        console.log('igmCrgData ', igmCrgData);

        axios.post(`${ipaddress}cfigm/saveCrgData?cid=${companyid}&bid=${branchId}&user=${userId}&igmTransId=${igmData.igmTransId}`, igmCrgData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                toast.success("Data added successfully", {
                    autoClose: 800
                });

                console.log("Crg Dataaaaa ", response.data);

                getIgmCrgData(response.data[0].igmTransId, response.data[0].igmNo);
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                });
                setLoading(false);
            });
    };


    const addRow = () => {
        let newErrors = igmCrgData.map(() => ({}));
        setErrors([]);

        igmCrgData.forEach((data, index) => {
            let rowErrors = {};
            console.log("data.importerName === '' ", data.importerName === ' ');
            if (!data.igmLineNo) rowErrors.igmLineNo = "IGM line no is required.";
            if (!data.blNo) rowErrors.blNo = "BL no is required.";
            if (!data.blDate) rowErrors.blDate = "BL Date is required.";
            if (!data.commodityDescription) rowErrors.commodityDescription = "Commodity desc. is required.";
            if (!data.cargoMovement) rowErrors.cargoMovement = "Cargo movement is required.";
            if (!data.grossWeight) rowErrors.grossWeight = "Cargo Wt. is required.";
            if (!data.unitOfWeight) rowErrors.unitOfWeight = "Unit of wt. is required.";
            if (!data.noOfPackages) rowErrors.noOfPackages = "No Of pack. is required.";
            if (!data.typeOfPackage) rowErrors.typeOfPackage = "Type of pack. is required.";
            if (data.importerName === ' ' || !data.importerName) rowErrors.importerName = "Importer name is required.";
            if (!data.importerAddress1 || data.importerAddress1 === ' ') rowErrors.importerAddress1 = "Importer address1 is required.";
            if (!data.destination) rowErrors.destination = "Destination is required.";
            // if (!data.importerType) rowErrors.importerType = "Importer type is required.";

            if (Object.keys(rowErrors).length > 0) {
                newErrors[index] = rowErrors;
            }
        });

        // Check if any errors exist
        const hasErrors = newErrors.some(errorObj => Object.keys(errorObj).length > 0);

        if (hasErrors) {
            console.log('newErrors ', newErrors);
            setErrors(newErrors);
            setLoading(false);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            });
            console.log('errors ', errors);
            return;
        }

        const newRow = {
            companyId: '',
            branchId: '',
            finYear: new Date().getFullYear(),
            igmTransId: '',
            igmCrgTransId: '',
            profitcentreId: profitCenterData.profitcentreId,
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
            importerSr: '',
            importerAddress1: '',
            importerAddress2: '',
            importerAddress3: '',
            importerType: '',
            notifyPartyId: '',
            notifySr: '',
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
            noOfPackages: "",
            qtyTakenOut: 0,
            qtyTakenOutWeight: 0,
            grossWeight: "",
            weighmentWeight: 0,
            unitOfWeight: 'KG',
            typeOfPackage: '',
            cargoType: 'NAGRO',
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
            igmImporterAddress3: '',
            accountHolderId: "",
            accountHolderName: "",
            invoiceDone: ''
        };
        setIgmCrgData(prevState => [...prevState, newRow]);




    };

    const removeRow = (index, trans, igm, crgtrans) => {

        if (crgtrans != "") {
            Swal.fire({
                title: 'Are you sure?',
                html: `Are you sure you want to delete the record?`,
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
                    axios.post(`${ipaddress}cfigm/deleteCrg?cid=${companyid}&bid=${branchId}&trans=${trans}&igm=${igm}&igmCrgTrans=${crgtrans}`, null, {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`
                        }
                    })
                        .then((response) => {
                            getIgmCrgData(trans, igm);
                            if (response.data === 'successfully deleted') {
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
        else {
            setIgmCrgData(prevState => prevState.filter((_, i) => i !== index));
        }




    };


    const [isModalForAddContainers, setIsModalForAddContainers] = useState(false);

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

    const [containerFlag, setContainerFlag] = useState('add');
    const [containerData, setContainerData] = useState([]);
    const [igmLineNo, setIgmLineNo] = useState('');
    const [isoCodes, setIsoCodes] = useState([]);


    const openContainerModal = async (lineNo) => {
        setIsModalForAddContainers(true);
        setIgmLineNo(lineNo);
        getContainerData(lineNo);
        getScanDocStatus();
        getIsoContainers();
    }

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

    const handleIsoChange = async (selectedOption, { action }) => {
        if (action === 'clear') {
            setIgmCnData({
                ...igmCnData,
                iso: '',
                containerSize: '',
                containerType: '',
                containerWeight: ''
            })
        }
        else {
            setIgmCnData({
                ...igmCnData,
                iso: selectedOption.value,
                containerSize: selectedOption.size,
                containerType: selectedOption.type,
                containerWeight: selectedOption.wt
            })
            document.getElementById('iso').classList.remove('error-border');
            setContainerErrors((prevErrors) => ({
                ...prevErrors,
                iso: "",
            }));
        }
    }



    const getContainerData = (lineNo) => {
        axios.get(`${ipaddress}cfigm/getContainerData?cid=${companyid}&bid=${branchId}&igmTrans=${igmData.igmTransId}&profit=${igmData.profitcentreId}&igm=${igmData.igmNo}&igmLineNo=${lineNo}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setContainerData(response.data);
            })
            .catch((error) => {

            })
    }

    const [currentPage4, setCurrentPage4] = useState(1);
    const [itemsPerPage4] = useState(5);

    const indexOfLastItem4 = currentPage4 * itemsPerPage4;
    const indexOfFirstItem4 = indexOfLastItem4 - itemsPerPage4;
    const currentItems4 = containerData.slice(indexOfFirstItem4, indexOfLastItem4);
    const totalPages4 = Math.ceil(containerData.length / itemsPerPage4);

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


    const [containerErrors, setContainerErrors] = useState({
        containerNo: '',
        iso: '',
        containerStatus: '',
        grossWt: '',
        noOfPackages: '',
    })


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

    const saveContainer = () => {
        setContainerErrors({
            containerNo: '',
            iso: '',
            containerStatus: '',
            grossWt: '',
            noOfPackages: '',
        })
        document.getElementById("containerNo").classList.remove('error-border');
        document.getElementById("iso").classList.remove('error-border');
        document.getElementById("containerStatus").classList.remove('error-border');
        document.getElementById("grossWt").classList.remove('error-border');
        document.getElementById("noOfPackages").classList.remove('error-border');
        setLoading(true);

        let errors = {};

        if (!igmCnData.containerNo) {
            errors.containerNo = "Container no is required."
            document.getElementById('containerNo').classList.add('error-border');
        }
        else {
            if (!handleContainerNoValidation1(igmCnData.containerNo)) {
                errors.containerNo = "Invalid container no."
                document.getElementById('containerNo').classList.add('error-border');
            }
        }
        if (!igmCnData.iso) {
            errors.iso = "ISO is required."
            document.getElementById("iso").classList.add('error-border');
        }
        else {
            if (!igmCnData.containerSize || !igmCnData.containerType) {
                errors.iso = "Enter correct ISO Code."
                document.getElementById("iso").classList.add('error-border');
            }
        }
        if (!igmCnData.containerStatus) {
            errors.containerStatus = "Container status is required."
            document.getElementById("containerStatus").classList.add('error-border');
        }
        if (!igmCnData.grossWt) {
            errors.grossWt = "Weight is required."
            document.getElementById("grossWt").classList.add('error-border');
        }
        if (!igmCnData.noOfPackages) {
            errors.noOfPackages = "No Of Packages is required."
            document.getElementById("noOfPackages").classList.add('error-border');
        }

        if (Object.keys(errors).length > 0) {
            setLoading(false);
            setContainerErrors(errors);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            })
            return;
        }

        if (igmCnData.containerWeight > igmCnData.grossWt) {
            toast.error("Gross wt must be greater than tare wt.")
            setLoading(false);
            return;
        }

        igmCnData.igmTransId = igmData.igmTransId;
        igmCnData.igmNo = igmData.igmNo;
        igmCnData.igmLineNo = igmLineNo;
        igmCnData.profitcentreId = igmData.profitcentreId;

        axios.post(`${ipaddress}cfigm/saveContainer?cid=${companyid}&bid=${branchId}&user=${userId}&flag=${containerFlag}&oldContainer=${oldContainer}`, igmCnData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                containerClear();
                toast.success("Data save successfully!!", {
                    autoClose: 800
                })
                getContainerData(igmLineNo);
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })
    }


    const [oldContainer, setOldContainer] = useState('');
    const getSingleContainer = (container) => {
        setIgmCnData({
            companyId: '',
            branchId: '',
            finYear: new Date().getFullYear(),
            igmTransId: '',
            profitcentreId: '',
            containerTransId: '',
            igmNo: '',
            igmLineNo: '',
            containerNo: '',
            containerSize: '',
            containerType: '',
            typeOfContainer: 'General',
            iso: '',
            containerWeight: '',
            containerStatus: 'FCL',
            containerSealNo: '',
            scannerType: '',
            gateInDate: null,
            gateOutDate: null,
            holdRemarks: '',
            holdStatus: '',
            cargoWt: '',
            grossWt: '',
            noOfPackages: '',
            scanningDoneStatus: '',
            temperature: '',
            status: '',
            upTariffDelMode: '',
            odcStatus: 'N',
            lowBed: 'N',
            invoiceAssesed: 'N'
        })
        axios.get(`${ipaddress}cfigm/getSingleContainer?cid=${companyid}&bid=${branchId}&igmTrans=${igmData.igmTransId}&profit=${igmData.profitcentreId}&igm=${igmData.igmNo}&igmLineNo=${igmLineNo}&containerNo=${container}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const { companyId, branchId, finYear, igmTransId, profitcentreId, containerTransId, igmNo, igmLineNo, containerNo, containerSize, containerType, typeOfContainer, iso, containerWeight, containerStatus, containerSealNo, scannerType, gateInDate, gateOutDate, holdRemarks, holdStatus, cargoWt, grossWt, noOfPackages, scanningDoneStatus, temperature, status, upTariffDelMode, odcStatus, lowBed, invoiceAssesed } = response.data;
                setOldContainer(container);
                setIgmCnData((prevState) => ({
                    ...prevState,
                    companyId: companyId || prevState.companyId,
                    branchId: branchId || prevState.branchId,
                    finYear: finYear || prevState.finYear,
                    igmTransId: igmTransId || prevState.igmTransId,
                    profitcentreId: profitcentreId || prevState.profitcentreId,
                    igmNo: igmNo || prevState.igmNo,
                    igmLineNo: igmLineNo || prevState.igmLineNo,
                    containerNo: containerNo || prevState.containerNo,
                    containerSize: containerSize || prevState.containerSize,
                    containerType: containerType || prevState.containerType,
                    typeOfContainer: typeOfContainer || prevState.typeOfContainer,
                    iso: iso || prevState.iso,
                    containerWeight: containerWeight || prevState.containerWeight,
                    containerStatus: containerStatus || prevState.containerStatus,
                    containerSealNo: containerSealNo || prevState.containerSealNo,
                    scannerType: scannerType || prevState.scannerType,
                    gateInDate: gateInDate || prevState.gateInDate,
                    gateOutDate: gateOutDate || prevState.gateOutDate,
                    holdRemarks: holdRemarks || prevState.holdRemarks,
                    holdStatus: holdStatus || prevState.holdStatus,
                    cargoWt: cargoWt || prevState.cargoWt,
                    grossWt: grossWt || prevState.grossWt,
                    noOfPackages: noOfPackages || prevState.noOfPackages,
                    scanningDoneStatus: scanningDoneStatus || prevState.scanningDoneStatus,
                    temperature: temperature || prevState.temperature,
                    status: status || prevState.status,
                    upTariffDelMode: upTariffDelMode || prevState.upTariffDelMode,
                    odcStatus: odcStatus || prevState.odcStatus,
                    lowBed: lowBed || prevState.lowBed,
                    containerTransId: containerTransId || prevState.containerTransId,
                    invoiceAssesed: invoiceAssesed || prevState.invoiceAssesed
                }));
                setContainerFlag('edit');
                setIsRowVisible(true);
            })
            .catch((error) => {
                console.error("Error fetching container data: ", error);
            });
    };


    const containerClear = () => {
        setOldContainer('');
        setContainerFlag('add');
        setContainerErrors({
            containerNo: '',
            iso: '',
            containerStatus: '',
            grossWt: '',
            noOfPackages: '',
        })
        document.getElementById("containerNo").classList.remove('error-border');
        document.getElementById("iso").classList.remove('error-border');
        document.getElementById("containerStatus").classList.remove('error-border');
        document.getElementById("grossWt").classList.remove('error-border');
        document.getElementById("noOfPackages").classList.remove('error-border');

        setIgmCnData({
            companyId: '',
            branchId: '',
            finYear: new Date().getFullYear(),
            igmTransId: '',
            profitcentreId: '',
            igmNo: '',
            igmLineNo: '',
            containerNo: '',
            containerTransId: '',
            containerSize: '',
            containerType: '',
            typeOfContainer: 'General',
            iso: '',
            containerWeight: '',
            containerStatus: 'FCL',
            containerSealNo: '',
            scannerType: '',
            gateInDate: null,
            gateOutDate: null,
            holdRemarks: '',
            holdStatus: '',
            cargoWt: '',
            grossWt: '',
            noOfPackages: '',
            scanningDoneStatus: '',
            temperature: '',
            status: '',
            upTariffDelMode: '',
            odcStatus: 'N',
            lowBed: 'N',
            invoiceAssesed: 'N'
        })
    }

    const containerClear1 = () => {
        setOldContainer('');
        setContainerFlag('add');
        setContainerErrors({
            containerNo: '',
            iso: '',
            containerStatus: '',
            grossWt: '',
            noOfPackages: '',
        })

        setIgmCnData({
            companyId: '',
            branchId: '',
            finYear: new Date().getFullYear(),
            igmTransId: '',
            profitcentreId: '',
            igmNo: '',
            igmLineNo: '',
            containerNo: '',
            containerTransId: '',
            containerSize: '',
            containerType: '',
            typeOfContainer: 'General',
            iso: '',
            containerWeight: '',
            containerStatus: 'FCL',
            containerSealNo: '',
            scannerType: '',
            gateInDate: null,
            gateOutDate: null,
            holdRemarks: '',
            holdStatus: '',
            cargoWt: '',
            grossWt: '',
            noOfPackages: '',
            scanningDoneStatus: '',
            temperature: '',
            status: '',
            upTariffDelMode: '',
            odcStatus: 'N',
            lowBed: 'N',
            invoiceAssesed: 'N'
        })
    }


    const closeContainerModal = () => {
        setIsModalForAddContainers(false);
        containerClear1();
        setIgmLineNo('');
        setIsRowVisible(false);
        setscanDocStatus([]);
        setIsoCodes([]);
    }


    const deleteContainer = (igmtrans, profit, igm, igmLineNo, containerNo) => {
        Swal.fire({
            title: 'Are you sure?',
            html: `Are you sure you want to delete the record?`,
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
                axios.get(`${ipaddress}cfigm/deleteContainer?cid=${companyid}&bid=${branchId}&user=${userId}&igmTrans=${igmtrans}&profit=${profit}&igm=${igm}&igmLineNo=${igmLineNo}&containerNo=${containerNo}`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                })
                    .then((response) => {
                        toast.error(response.data, {
                            autoClose: 800
                        })
                        getContainerData(igmLineNo);
                    })
                    .catch((error) => {
                        toast.error(error.response.data, {
                            autoClose: 800
                        })
                    })
            }
        })
    }

    const [container, setContainer] = useState('');

    const searchByContainer = (container) => {
        axios.get(`${ipaddress}cfigm/getDataByContainer?cid=${companyid}&bid=${branchId}&container=${container}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {

                const item = response.data;
                console.log('item ', item);
                if (item[0][0] != '') {
                    selectIGMSearchRadio(item[0][0], item[0][2], item[0][6], item[0][10], item[0][12], item[0][13], item[0][14], item[0][15]);
                }

                else {
                    handleIGMClear();
                }
            })
            .catch((error) => {
                handleIGMClear();
            })
    }

    const [isRowVisible, setIsRowVisible] = useState(false);

    const toggleRowVisibility = () => {
        setIsRowVisible(!isRowVisible);
    };


    const [isModalOpenForUploadDocument, setIsModalOpenForUploadDocument] = useState(false);
    const [uploadIgm, setUploadIgm] = useState('');
    const [uploadIgmTransId, setUploadIgmTransId] = useState('');
    const [uploadItem, setUploadItem] = useState('');
    const [uploadBlNo, setUploadBlNo] = useState('');
    const [docType, setDocType] = useState([]);

    const [uploadDtls, setUploadDtls] = useState([
        {
            companyId: '',
            branchId: '',
            igmTransId: '',
            igmNo: '',
            igmLineNo: '',
            srNo: 1,
            docType: 'K00898',
            docPath: '',
            status: '',
            createdBy: '',
            createdDate: null
        }
    ])

    const [uploadedDtls, setUploadedDtls] = useState([
        {
            companyId: '',
            branchId: '',
            igmTransId: '',
            igmNo: '',
            igmLineNo: '',
            srNo: 1,
            docType: '',
            docPath: '',
            status: '',
            createdBy: '',
            createdDate: null
        }
    ])

    const openUploadDocumentModal = (igm, line, bl, trans) => {
        setIsModalOpenForUploadDocument(true);
        setUploadBlNo(bl);
        setUploadIgm(igm);
        setUploadIgmTransId(trans);
        setUploadItem(line);
        getDocType();
        getDocumentData(trans, igm, line);
    }

    const addNewRow = () => {
        const newRow = {
            companyId: '',
            branchId: '',
            igmTransId: '',
            igmNo: '',
            igmLineNo: '',
            srNo: uploadDtls.length + 1, // Increment srNo for each new row
            docType: 'K00898',
            docPath: '',
            status: '',
            createdBy: '',
            createdDate: null
        };

        setUploadDtls([...uploadDtls, newRow]); // Add the new row to the array
    };

    const closeUploadDocumentModal = () => {
        setIsModalOpenForUploadDocument(false);
        setUploadIgm('');
        setUploadIgmTransId('');
        setUploadItem('');
        setUploadBlNo('');
        setDocType([]);
        setUploadDtls([{
            companyId: '',
            branchId: '',
            igmTransId: '',
            igmNo: '',
            igmLineNo: '',
            srNo: 1,
            docType: 'K00898',
            docPath: '',
            status: '',
            createdBy: '',
            createdDate: null
        }]);

        setUploadedDtls([{
            companyId: '',
            branchId: '',
            igmTransId: '',
            igmNo: '',
            igmLineNo: '',
            srNo: 1,
            docType: '',
            docPath: '',
            status: '',
            createdBy: '',
            createdDate: null
        }]);
    }


    const getDocType = () => {
        const id = 'J00010';
        axios.get(`${ipaddress}jardetail/getJarDetail?companyId=${companyid}&jarId=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setDocType(response.data);
            })
            .catch((error) => {

            })
    }

    const getDocumentData = (trans, igm, line) => {
        let formData = new FormData();
        formData.append('cid', companyid);
        formData.append('bid', branchId);
        formData.append('igmtrans', trans);
        formData.append('igm', igm);
        formData.append('igmLine', line);

        const params = new URLSearchParams(formData);

        axios.get(`${ipaddress}excelUpload/getData?${params}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                setUploadedDtls(data.map((item) => ({
                    companyId: item.companyId || '',
                    branchId: item.branchId || '',
                    igmTransId: item.igmTransId || '',
                    igmNo: item.igmNo || '',
                    igmLineNo: item.igmLineNo || '',
                    srNo: item.srNo || 1,
                    docType: item.docType || '',
                    docPath: item.docPath || '',
                    status: item.status || '',
                    createdBy: item.createdBy || '',
                    createdDate: item.createdDate !== null ? new Date(item.createdDate) : null
                })))

                setUploadDtls([{
                    companyId: '',
                    branchId: '',
                    igmTransId: '',
                    igmNo: '',
                    igmLineNo: '',
                    srNo: 1,
                    docType: 'K00898',
                    docPath: '',
                    status: '',
                    createdBy: '',
                    createdDate: null
                }])
                const fileInputs = document.querySelectorAll('input[type="file"]');
                fileInputs.forEach(input => {
                    input.value = ''; // Clear the file input
                });
            })
            .catch((error) => {

            })
    }



    // Handle change for docType
    const handleDocTypeChange = (index, event) => {
        const newUploadDtls = [...uploadDtls];
        newUploadDtls[index].docType = event.target.value;
        setUploadDtls(newUploadDtls);
    };

    // Handle change for docPath (file input)
    const handleFileChange = (index, event) => {
        const file = event.target.files[0]; // Get the selected file

        // Convert 10 MB to bytes
        const maxSizeInBytes = 10 * 1024 * 1024;

        // Check if the file size exceeds the limit
        if (file.size > maxSizeInBytes) {
            toast.error('File size must be less than or equal to 10 MB.', {
                autoClose: 800
            });
            event.target.value = ''; // Clear the input
            return; // Exit the function
        }


        const newUploadDtls = [...uploadDtls];
        newUploadDtls[index].docPath = event.target.files[0]; // Store the selected file
        setUploadDtls(newUploadDtls);

    };


    const saveFiles = () => {
        setLoading(true);
        let formData = new FormData();
        formData.append('cid', companyid);
        formData.append('bid', branchId);
        formData.append('user', userId);
        formData.append('igmtrans', uploadIgmTransId);
        formData.append('igm', uploadIgm);
        formData.append('igmLine', uploadItem);

        let finalData = uploadDtls.filter(item => item.docPath);

        if (finalData.length === 0) {
            toast.error("Please select atleast one file!!", {
                autoClose: 800
            })
            setLoading(false);
        }

        finalData.forEach((item, index) => {

            formData.append('files', item.docPath);
            formData.append('docType', item.docType);

        });

        axios.post(`${ipaddress}excelUpload/igmUpload`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                setUploadedDtls(data.map((item) => ({
                    companyId: item.companyId || '',
                    branchId: item.branchId || '',
                    igmTransId: item.igmTransId || '',
                    igmNo: item.igmNo || '',
                    igmLineNo: item.igmLineNo || '',
                    srNo: item.srNo || 1,
                    docType: item.docType || '',
                    docPath: item.docPath || '',
                    status: item.status || '',
                    createdBy: item.createdBy || '',
                    createdDate: item.createdDate !== null ? new Date(item.createdDate) : null
                })))

                setUploadDtls([{
                    companyId: '',
                    branchId: '',
                    igmTransId: '',
                    igmNo: '',
                    igmLineNo: '',
                    srNo: 1,
                    docType: 'K00898',
                    docPath: '',
                    status: '',
                    createdBy: '',
                    createdDate: null
                }])
                setLoading(false);
                toast.success("Files uploades successfully!!", {
                    autoClose: 800
                })
                const fileInputs = document.querySelectorAll('input[type="file"]');
                fileInputs.forEach(input => {
                    input.value = ''; // Clear the file input
                });
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.response.data, {
                    autoClose: 800
                })
            })



    }

    const downloadFile = async (sr, fileName) => {
        try {


            let formData = new FormData();
            formData.append('cid', companyid);
            formData.append('bid', branchId);
            formData.append('igmtrans', uploadIgmTransId);
            formData.append('igm', uploadIgm);
            formData.append('igmLine', uploadItem);
            formData.append('sr', sr);

            const params = new URLSearchParams(formData);

            const response = await axios.get(`${ipaddress}excelUpload/downloadExistingFile?${params}`, {
                responseType: 'blob', // Important for file download
            });

            // Get the file name from the response headers, or use the passed fileName
            const downloadedFileName = response.headers['content-disposition']
                ? response.headers['content-disposition'].split('filename=')[1].replace(/"/g, '')
                : fileName; // Fallback to passed fileName if not found

            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create a temporary anchor element to trigger the download
            const link = document.createElement('a');
            link.href = url;

            // Set the file name for download (you can change this to be dynamic based on the response)
            link.setAttribute('download', downloadedFileName);

            // Append the anchor to the document and trigger a click event
            document.body.appendChild(link);
            link.click();

            // Clean up by removing the anchor element from the document
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
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
            <div >
                <div >

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
                                    <Col md={8}>
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
                                    <Col md={3}>
                                        <button
                                            className="btn btn-outline-primary btn-margin newButton"
                                            style={{ fontSize: 13 }}
                                            id="submitbtn2"
                                            onClick={openIGMSearchModal}

                                        >
                                            <FontAwesomeIcon icon={faSearch} />

                                        </button>
                                    </Col>
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
                        <Col md={2}>
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


                        <Col md={2}>
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

                    </Row>

                    <Row>
                        <Col md={2}>
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

                        <Col md={2}>
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

                        <Col md={2}>
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

                        <Col md={2}>
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

                        <Col md={2}>
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

                        <Col md={2}>
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
                    </Row>
                    <Row>

                        <Col md={2}>
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

                        <Col md={2}>
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
                                />
                            </FormGroup>
                        </Col>


                        {/* <Col md={3}>
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
                                </Col> */}
                    </Row>


                    {/* Second Row */}







                    <hr />
                    <Row className='text-center'>
                        <Col>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={handleIgmSave}
                                disabled={igmData.igmTransId != ''}

                            >
                                <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                Save
                            </button>

                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={handleIGMClear}
                            >
                                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                Clear
                            </button>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={handleUpdateIgm}
                                disabled={!igmData.igmTransId}
                            >
                                <FontAwesomeIcon icon={faFileEdit} style={{ marginRight: "5px" }} />
                                Update SA / SL / Vessel
                            </button>
                        </Col>
                    </Row>
                </div>
                {igmData.igmTransId != '' && (
                    <>
                        <hr />
                        <Row className='text-end' style={{ marginBottom: 10 }}>

                            <Col>
                                <button
                                    className="btn btn-outline-success btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    onClick={saveCrgData}

                                >
                                    <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                    Save
                                </button>
                                <button
                                    className="btn btn-outline-primary btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    onClick={addRow}

                                >
                                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
                                    Add Details
                                </button>


                            </Col>
                        </Row>
                        <Modal Modal isOpen={isModalForAddContainers} onClose={closeContainerModal} toggle={closeContainerModal} style={{ maxWidth: '1100px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

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
                                    icon={faPlus}
                                    style={{
                                        marginRight: '8px',
                                        color: 'white', // Set the color to golden
                                    }}
                                /> Add Containers</h5>



                            </ModalHeader>


                            <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                                <div onClick={toggleRowVisibility} style={{ cursor: 'pointer', marginBottom: 10, textAlign: 'right', borderBottom: '1px solid black' }}>
                                    <span style={{ fontSize: 14, marginRight: 8, fontWeight: 800 }}>Add Container</span>
                                    <FontAwesomeIcon icon={isRowVisible ? faChevronUp : faChevronDown} />
                                </div>
                                <CSSTransition
                                    in={isRowVisible}
                                    timeout={100}
                                    classNames="row-animation"
                                    unmountOnExit
                                >
                                    <>
                                        <Row>
                                            <Col md={3}>
                                                <Label>Container No</Label> <span style={{ color: 'red' }}>*</span>
                                                <FormGroup>
                                                    <Input
                                                        className={`form-control ${containerErrors?.containerNo ? 'error-border' : ''}`}
                                                        type="text"
                                                        name='containerNo'
                                                        id='containerNo'
                                                        value={igmCnData.containerNo}
                                                        onChange={handleIGMCNChange}
                                                        disabled={igmCnData.status !== ''}
                                                        maxLength={11}
                                                    />
                                                    <div style={{ color: 'red' }} className="error-message">{containerErrors.containerNo}</div>
                                                </FormGroup>
                                            </Col>
                                            <Col md={3}>
                                                <Row>
                                                    <Col md={6}>
                                                        <Label>ISO</Label> <span style={{ color: 'red' }}>*</span>
                                                        <FormGroup>
                                                            {/* <Input
                                    className={`form-control ${containerErrors?.iso ? 'error-border' : ''}`}

                                    type="text"
                                    name='iso'
                                    id='iso'
                                    value={igmCnData.iso}
                                    onChange={handleIGMCNChange}
                                    maxLength={4}
                                /> */}
                                                            <Select

                                                                value={{ value: igmCnData.iso, label: igmCnData.iso }}
                                                                onChange={handleIsoChange}
                                                                options={isoCodes}
                                                                placeholder="Select Container"
                                                                isClearable
                                                                id="iso"
                                                                name="iso"
                                                                className={`autocompleteHeight ${containerErrors.iso ? 'error-border' : ''}`}

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
                                                            <div style={{ color: 'red' }} className="error-message">{containerErrors.iso}</div>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Label>FCL/LCL</Label> <span style={{ color: 'red' }}>*</span>
                                                        <FormGroup>
                                                            <Input
                                                                className={`form-control ${containerErrors?.containerStatus ? 'error-border' : ''}`}

                                                                type="select"
                                                                name='containerStatus'
                                                                id='containerStatus'
                                                                value={igmCnData.containerStatus}
                                                                onChange={handleIGMCNChange}
                                                            >
                                                                <option value="FCL">FCL</option>
                                                                <option value="LCL">LCL</option>
                                                            </Input>
                                                            <div style={{ color: 'red' }} className="error-message">{containerErrors.containerStatus}</div>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col md={3}>
                                                <Row>
                                                    <Col md={5}>
                                                        <Label>No Of Pkgs</Label> <span style={{ color: 'red' }}>*</span>
                                                        <FormGroup>
                                                            <Input
                                                                className={`form-control ${containerErrors?.noOfPackages ? 'error-border' : ''}`}

                                                                type="text"
                                                                name='noOfPackages'
                                                                id='noOfPackages'
                                                                maxLength={8}
                                                                value={igmCnData.noOfPackages}
                                                                onChange={handleIGMCNChange}
                                                            />
                                                            <div style={{ color: 'red' }} className="error-message">{containerErrors.noOfPackages}</div>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={7}>

                                                        <Row>
                                                            <Col md={7} style={{ paddingRight: 0 }}>
                                                                <Label>ODC Status</Label>
                                                                <FormGroup>
                                                                    <Input
                                                                        className="form-control"
                                                                        type="checkbox"
                                                                        style={{ height: 25 }}
                                                                        name='odcStatus'
                                                                        id='odcStatus'
                                                                        checked={igmCnData.odcStatus === 'Y' ? true : false}
                                                                        value={igmCnData.odcStatus}
                                                                        onChange={handleContainerCheckChange}
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={5} className='pl2'>
                                                                <Label>Low Bed</Label>
                                                                <FormGroup>
                                                                    <Input
                                                                        className="form-control"
                                                                        type="checkbox"
                                                                        style={{ height: 25 }}
                                                                        name='lowBed'
                                                                        id='lowBed'
                                                                        checked={igmCnData.lowBed === 'Y' ? true : false}
                                                                        value={igmCnData.lowBed}
                                                                        onChange={handleContainerCheckChange}
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>

                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col md={3}>
                                                <Row>
                                                    <Col md={6}>
                                                        <Label>Delivery Mode</Label>
                                                        <FormGroup>
                                                            <Input
                                                                className="form-control"
                                                                type="select"
                                                                name='upTariffDelMode'
                                                                id='upTariffDelMode'
                                                                value={igmCnData.upTariffDelMode}
                                                                onChange={handleIGMCNChange}
                                                            >
                                                                <option value=""></option>
                                                                <option value="CON">Loaded</option>
                                                                <option value="CRG">Destuff</option>
                                                            </Input>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Label>Status</Label>
                                                        <FormGroup>
                                                            <Input
                                                                className="form-control"
                                                                type="text"
                                                                name='status'
                                                                id='status'
                                                                value={igmCnData.status === 'A' ? 'Approved' : ''}
                                                                onChange={handleIGMCNChange}
                                                                readOnly
                                                                style={{ backgroundColor: '#E0E0E0' }}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col md={3}>
                                                <Row>
                                                    <Col md={7}>
                                                        <Label>Type Of Container</Label>
                                                        <FormGroup>
                                                            <Input
                                                                className="form-control"
                                                                type="select"
                                                                name='typeOfContainer'
                                                                id='typeOfContainer'
                                                                value={igmCnData.typeOfContainer}
                                                                onChange={handleIGMCNChange}
                                                            >
                                                                <option value="General"> General</option>
                                                                <option value="Hazardous"> Hazardous</option>
                                                                <option value="ODC"> ODC</option>
                                                                <option value="Reefer"> Reefer</option>

                                                                <option value="Tank"> Tank</option>
                                                                <option value="TankHaz"> Tank_Haz</option>
                                                                {/* <option value="ReeferHaz"> Reefer_Haz</option> */}
                                                                <option value="FlatTrack"> FlatTrack</option>
                                                            </Input>

                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={5}>
                                                        <Label>Temp.</Label>
                                                        <FormGroup>
                                                            <Input
                                                                className="form-control"
                                                                type="text"
                                                                name='temperature'
                                                                id='temperature'
                                                                disabled={igmCnData.typeOfContainer != 'Reefer'}
                                                                maxLength={5}
                                                                value={igmCnData.temperature}
                                                                onChange={handleIGMCNChange}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col md={3}>
                                                <Label>Size/Type</Label>
                                                <FormGroup>

                                                    <Row>
                                                        <Col md={6}>
                                                            <Input
                                                                className="form-control"
                                                                type="text"
                                                                name='containerSize'
                                                                id='containerSize'
                                                                readOnly
                                                                style={{ backgroundColor: '#E0E0E0' }}
                                                                value={igmCnData.containerSize}
                                                                onChange={handleIGMCNChange}
                                                            />

                                                        </Col>
                                                        <Col md={6}>
                                                            <Input
                                                                className="form-control"
                                                                type="text"
                                                                name='containerType'
                                                                id='containerType'
                                                                readOnly
                                                                style={{ backgroundColor: '#E0E0E0' }}
                                                                value={igmCnData.containerType}
                                                                onChange={handleIGMCNChange}
                                                            />

                                                        </Col>
                                                    </Row>

                                                </FormGroup>

                                            </Col>


                                            <Col md={3}>
                                                <Row>
                                                    <Col md={6}>
                                                        <Label>Tare Wt.</Label>
                                                        <FormGroup>
                                                            <Input
                                                                className="form-control"
                                                                type="text"
                                                                name='containerWeight'
                                                                id='containerWeight'
                                                                maxLength={14}
                                                                value={igmCnData.containerWeight}
                                                                onChange={handleIGMCNChange}
                                                                readOnly
                                                                style={{ backgroundColor: '#E0E0E0' }}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Label>Gross Weight</Label> <span style={{ color: 'red' }}>*</span>
                                                        <FormGroup>
                                                            <Input
                                                                className={`form-control ${containerErrors?.grossWt ? 'error-border' : ''}`}

                                                                type="text"
                                                                name='grossWt'
                                                                id='grossWt'
                                                                maxLength={16}
                                                                value={igmCnData.grossWt}
                                                                onChange={handleIGMCNChange}
                                                            />
                                                            <div style={{ color: 'red' }} className="error-message">{containerErrors.grossWt}</div>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col md={3}>
                                                <Row>
                                                    <Col md={6}>
                                                        <Label>Scan type</Label>
                                                        <FormGroup>
                                                            <Input
                                                                className="form-control"
                                                                type="select"
                                                                name='scannerType'
                                                                id='scannerType'
                                                                value={igmCnData.scannerType}
                                                                onChange={handleIGMCNChange}
                                                            >
                                                                <option value="" selected=""> </option>
                                                                <option value="Mobile"> Mobile</option>
                                                                <option value="Relocatable"> Relocatable</option>
                                                                <option value="DTS"> DTS</option>
                                                            </Input>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Label>Hold Status</Label>
                                                        <FormGroup className='text-center'>
                                                            <Input
                                                                className="form-control"
                                                                type="text"
                                                                name='holdStatus'
                                                                id='holdStatus'
                                                                value={igmCnData.holdStatus === 'H' ? 'Hold' : igmCnData.holdStatus === 'R' ? 'Release' : 'Not Hold'}
                                                                onChange={handleIGMCNChange}
                                                                readOnly
                                                                style={{ backgroundColor: '#E0E0E0' }}
                                                            />
                                                            {/* <Col md={12}>
                    <Input
                        className="form-control"
                        type="checkbox"
                        style={{ height: 25 }}
                        name='holdStatus'
                        id='holdStatus'
                        checked={igmCnData.holdStatus === 'H' ? true : false}
                        value={igmCnData.holdStatus}
                        onChange={handleContainerCheckChange}
                    />
                </Col>
                <Col md={12}>
                    <Input
                        className="form-control"
                        type="select"
                        name='holdRemarks'
                        id='holdRemarks'
                        value={igmCnData.holdRemarks}
                        onChange={handleIGMCNChange}
                    >
                        <option value="" selected=""> </option>
                        <option value="CSD"> CSD</option>
                        <option value="DC"> DC</option>
                        <option value="CIU"> CIU</option>
                        <option value="DRI"> DRI</option>
                        <option value="MPIU"> MPIU</option>
                        <option value="R_And_I"> R &amp; I</option>
                        <option value="SIIB_I"> SIIB_I</option>
                        <option value="Not_SCAN"> Not_SCAN</option>
                        <option value="Other_Hold"> Other_Hold</option>
                    </Input>
                </Col> */}

                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={3}>
                                                <Label>Gate In Date</Label>
                                                <FormGroup>
                                                    <div style={{ position: 'relative' }}>
                                                        <DatePicker
                                                            selected={igmCnData.gateInDate}
                                                            id='gateInDate'
                                                            name='gateInDate'
                                                            dateFormat="dd/MM/yyyy"
                                                            disabled
                                                            className="form-control border-right-0 inputField"
                                                            customInput={<input style={{ width: '100%' }} />}
                                                            wrapperClassName="custom-react-datepicker-wrapper"
                                                        />
                                                        <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                                    </div>

                                                </FormGroup>
                                            </Col>
                                            <Col md={3}>
                                                <Label>Gate Out</Label>
                                                <FormGroup>
                                                    <div style={{ position: 'relative' }}>
                                                        <DatePicker
                                                            selected={igmCnData.gateOutDate}
                                                            id='gateOutDate'
                                                            name='gateOutDate'
                                                            dateFormat="dd/MM/yyyy"
                                                            disabled
                                                            className="form-control border-right-0 inputField"
                                                            customInput={<input style={{ width: '100%' }} />}
                                                            wrapperClassName="custom-react-datepicker-wrapper"
                                                        />
                                                        <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                                    </div>
                                                </FormGroup>
                                            </Col>




                                            <Col md={3}>
                                                <Label>Agent Seal No</Label>
                                                <FormGroup>
                                                    <Input
                                                        className="form-control"
                                                        maxLength={15}
                                                        type="text"
                                                        name='containerSealNo'
                                                        id='containerSealNo'
                                                        value={igmCnData.containerSealNo}
                                                        onChange={handleIGMCNChange}
                                                    />
                                                </FormGroup>
                                            </Col>

                                            <Col md={3}>
                                                <Label>Scan Doc. Status</Label>
                                                <FormGroup>
                                                    <Input
                                                        className="form-control"
                                                        type="select"
                                                        name='scanningDoneStatus'
                                                        id='scanningDoneStatus'
                                                        value={igmCnData.scanningDoneStatus}
                                                        onChange={handleIGMCNChange}
                                                        disabled
                                                    >
                                                        <option value="" selected=""> </option>
                                                        {scanDocStatus.map((item, index) => (
                                                            <option key={index} value={item.jarDtlId}>{item.jarDtlDesc}</option>
                                                        ))}

                                                        {/* <option value="Not Scan Need to be Scan"> Not Scan Need to be Scan</option>
                            <option value="Scan Cleared"> Scan Cleared</option>
                            <option value="Not Scan due to ODC"> Not Scan due to ODC</option>
                            <option value="Subject to Clearance from DC/CSD"> Subject to Clearance from DC/CSD</option>
                            <option value="not scanned due to scanner failure"> not scanned due to scanner failure</option>
                            <option value="Scanning List Unavailable"> Scanning List Unavailable</option>
                            <option value="Red Stamp on EIR"> Red Stamp on EIR</option> */}
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <hr />
                                        <Row className='text-center'>
                                            <Col>
                                                <button

                                                    className="btn btn-outline-success btn-margin newButton"
                                                    style={{ marginRight: 10 }}
                                                    id="submitbtn2"
                                                    disabled={igmCnData.invoiceAssesed === 'Y'}
                                                    onClick={saveContainer}
                                                >
                                                    <FontAwesomeIcon icon={faSave} style={{ marginRight: 5 }} />
                                                    Save
                                                </button>
                                                <button

                                                    className="btn btn-outline-danger btn-margin newButton"
                                                    style={{ marginRight: 10 }}
                                                    id="submitbtn2"
                                                    onClick={containerClear}

                                                >
                                                    <FontAwesomeIcon icon={faRefresh} style={{ marginRight: 5 }} />
                                                    Clear
                                                </button>
                                            </Col>
                                        </Row>
                                    </>
                                </CSSTransition>


                                <div className="mt-3 table-responsive" style={{ fontSize: 14, marginTop: 20 }}>
                                    <table className="table table-bordered table-hover tableHeader dynamic-table">
                                        <thead className="tableHeader">
                                            <tr>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Container No</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>ISO/Size Type</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Tare Wt</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Gross Wt</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>NOP</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Type Of Container</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>FCL/LCL</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Scan Type</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Hold</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems4.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.containerNo}</td>
                                                    <td>{item.iso}/{item.containerSize}{item.containerType}</td>
                                                    <td>{item.containerWeight}</td>
                                                    <td>{item.grossWt}</td>
                                                    <td>{item.noOfPackages}</td>
                                                    <td>{item.typeOfContainer}</td>
                                                    <td>{item.containerStatus}</td>
                                                    <td>{item.scannerType}</td>
                                                    <td>{item.holdStatus === 'H' ? 'Hold' : item.holdStatus === 'R' ? 'Release' : 'Not Hold'}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-outline-primary btn-margin newButton"
                                                            style={{ marginRight: 10 }}
                                                            id="submitbtn2"
                                                            // disabled={item.gateInId != ''}
                                                            onClick={() => getSingleContainer(item.containerNo)}
                                                        >
                                                            <FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />
                                                        </button>
                                                        {/* <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={() => deleteContainer(item.igmTransId, item.profitcentreId, item.igmNo, item.igmLineNo, item.containerNo)}
                            >
                                <FontAwesomeIcon icon={faTrash} style={{ marginRight: "5px" }} />
                            </button> */}
                                                    </td>
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
                                            disabled={setCurrentPage4 === totalPages4}
                                        />
                                        <Pagination.Last onClick={() => handlePageChange4(totalPages4)} />
                                    </Pagination>
                                </div>
                            </ModalBody>
                        </Modal>




                        <Modal Modal isOpen={isModalOpenForUploadDocument} onClose={closeUploadDocumentModal} toggle={closeUploadDocumentModal} style={{ maxWidth: '1100px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                            <ModalHeader toggle={closeUploadDocumentModal} style={{
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
                                    icon={faUpload}
                                    style={{
                                        marginRight: '8px',
                                        color: 'white', // Set the color to golden
                                    }}
                                />Upload IGM Wise Document</h5>



                            </ModalHeader>


                            <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                                <Row>
                                    <Col md={3}>
                                        <Label>IGM No</Label>
                                        <FormGroup>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                name='uploadIgm'
                                                id='uploadIgm'
                                                value={uploadIgm}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <Label>Item No</Label>
                                        <FormGroup>
                                            <Input
                                                className="form-control"
                                                disabled
                                                type="text"
                                                name='uploadItem'
                                                value={uploadItem}
                                                id='uploadItem'
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={3}>
                                        <Label>BL No</Label>
                                        <FormGroup>
                                            <Input
                                                className="form-control"
                                                disabled
                                                type="text"
                                                value={uploadBlNo}
                                                name='uploadBlNo'
                                                id='uploadBlNo'
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <hr />
                                <Row className='text-end' style={{ marginBottom: 10 }}>

                                    <Col>

                                        <button
                                            className="btn btn-outline-primary btn-margin newButton"
                                            style={{ marginRight: 10 }}
                                            id="submitbtn2"
                                            onClick={addNewRow}

                                        >
                                            <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
                                            Add Documents
                                        </button>


                                    </Col>
                                </Row>
                                <div className="mt-1 table-responsive " style={{ fontSize: 14, overflowX: 'auto' }}>
                                    <table className="table table-bordered table-hover tableHeader dynamic-table">
                                        <thead className="tableHeader">
                                            <tr>
                                                <th scope="col" className="text-center" style={{ color: 'black', width: 250 }}>Document Type</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Browse</th>
                                                <th scope="col" className="text-center" style={{ color: 'black', width: 200 }}>Upload Date</th>
                                                <th scope="col" className="text-center" style={{ color: 'black', width: 200 }}>Download</th>


                                            </tr>
                                        </thead>
                                        <tbody>
                                            {uploadedDtls.filter(item => item.docType !== '').length > 0 && (
                                                <>
                                                    {
                                                        uploadedDtls.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <Input
                                                                        className="form-control"
                                                                        type="select"
                                                                        value={item.docType}
                                                                        name='docType'
                                                                        id={`docType${index}`}
                                                                        disabled
                                                                    >

                                                                        {docType.map((item, index) => (
                                                                            <option key={index} value={item[0]}>{item[1]}</option>
                                                                        ))}
                                                                    </Input>
                                                                </td>
                                                                <td>
                                                                    {item.docPath.split('\\').pop().split('/').pop()}
                                                                </td>
                                                                <td>
                                                                    <div style={{ position: 'relative' }}>
                                                                        <DatePicker
                                                                            selected={item.createdDate}
                                                                            disabled
                                                                            id={`createdDate${index}`}
                                                                            dateFormat="dd/MM/yyyy"
                                                                            className={`form-control`}
                                                                            name="blDate"
                                                                            popperPlacement="right-start"
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
                                                                </td>
                                                                <td>
                                                                    <Button
                                                                        outline
                                                                        color="success"
                                                                        className="btn-margin newButton"
                                                                        style={{ marginRight: 10 }}
                                                                        id="submitbtn2"
                                                                        onClick={() => downloadFile(item.srNo, item.docPath.split('\\').pop().split('/').pop())}

                                                                    >
                                                                        <FontAwesomeIcon icon={faUpload} />
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </>
                                            )}
                                            {uploadDtls.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <Input
                                                            className="form-control"
                                                            type="select"
                                                            value={item.docType}
                                                            name='docType'
                                                            id={`docType${index}`}
                                                            onChange={(event) => handleDocTypeChange(index, event)}
                                                        >

                                                            {docType.map((item, index) => (
                                                                <option key={index} value={item[0]}>{item[1]}</option>
                                                            ))}
                                                        </Input>
                                                    </td>
                                                    <td>
                                                        <Input
                                                            className="form-control"
                                                            type="file"
                                                            name='docPath'
                                                            id={`docPath${index}`}
                                                            onChange={(event) => handleFileChange(index, event)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <div style={{ position: 'relative' }}>
                                                            <DatePicker
                                                                selected={item.createdDate}
                                                                disabled
                                                                id={`createdDate${index}`}
                                                                dateFormat="dd/MM/yyyy"
                                                                className={`form-control`}
                                                                name="blDate"
                                                                popperPlacement="right-start"
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
                                                    </td>
                                                    <td>
                                                        <Button
                                                            outline
                                                            color="success"
                                                            className="btn-margin newButton"
                                                            style={{ marginRight: 10 }}
                                                            id="submitbtn2"
                                                            disabled

                                                        >
                                                            <FontAwesomeIcon icon={faUpload} />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                                <Row className='text-center' style={{ marginBottom: 10 }}>

                                    <Col>
                                        <button
                                            className="btn btn-outline-success btn-margin newButton"
                                            style={{ marginRight: 10 }}
                                            id="submitbtn2"
                                            onClick={saveFiles}

                                        >
                                            <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                            Save
                                        </button>


                                    </Col>
                                </Row>
                            </ModalBody>
                        </Modal>
                        <div id="datepicker-portal"></div>
                        <div className="mt-1 table-responsive " style={{ fontSize: 14, overflowX: 'auto' }}>
                            <table className="table table-bordered table-hover tableHeader dynamic-table">
                                <thead className="tableHeader">
                                    <tr>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>#</th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Add</th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Upload</th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Cycle Type/IGM Line No<span style={{ color: 'red' }}>*</span></th>
                                        <th scope="col" className="text-center" style={{ color: 'black', width: '10%' }}>BL No<span style={{ color: 'red' }}>*</span></th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>BL Date<span style={{ color: 'red' }}>*</span></th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>HSN Code<span style={{ color: 'red' }}>*</span></th>

                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Commodity<span style={{ color: 'red' }}>*</span></th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Marks & Nos.</th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Cargo Movement<span style={{ color: 'red' }}>*</span></th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Cargo Weight<span style={{ color: 'red' }}>*</span></th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Unit<span style={{ color: 'red' }}>*</span></th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>NOP<span style={{ color: 'red' }}>*</span></th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Type Of Pack<span style={{ color: 'red' }}>*</span></th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Acc. Holder</th>
                                        {/* <th scope="col" className="text-center" style={{ color: 'black' }}>Importer Type<span style={{ color: 'red' }}>*</span></th> */}
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Importer<span style={{ color: 'red' }}>*</span></th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Imp Address1<span style={{ color: 'red' }}>*</span></th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Imp Address2</th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Imp Address3</th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Notify Party Name
                                            <Input
                                                type="checkbox"
                                                style={{ marginLeft: '8px', width: 20, height: 20, borderColor: 'black' }} // Add some spacing between the checkbox and the select
                                                onChange={(e) => handleHeaderCheckboxChange(e)}
                                                checked={isHeaderCheck}
                                            />
                                        </th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Notified Address1</th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Notified Address2</th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Notified Address3</th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Origin</th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Destination<span style={{ color: 'red' }}>*</span></th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Cargo Type</th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>IMO Code</th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>UN No</th>
                                        <th scope="col" className="text-center" style={{ color: 'black' }}>Haz/Reefer Remarks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {igmCrgData.map((item, index) => (
                                        <>
                                            <tr key={index} className="text-center">
                                                <td>
                                                    <button
                                                        className="btn btn-outline-danger btn-margin newButton"
                                                        style={{ marginRight: 10 }}
                                                        id="submitbtn2"
                                                        disabled={item.igmCrgTransId != ''}
                                                        onClick={() => removeRow(index, igmData.igmTransId, item.igmNo, item.igmCrgTransId)}

                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>

                                                </td>
                                                <td>
                                                    <Button
                                                        outline
                                                        color="primary"
                                                        className="btn-margin newButton"
                                                        style={{ marginRight: 10 }}
                                                        id="submitbtn2"
                                                        disabled={item.igmCrgTransId == ''}
                                                        onClick={() => openContainerModal(item.igmLineNo)}

                                                    >
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </Button>




                                                </td>
                                                <td>
                                                    <Button
                                                        outline
                                                        color="success"
                                                        className="btn-margin newButton"
                                                        style={{ marginRight: 10 }}
                                                        id="submitbtn2"
                                                        disabled={item.igmCrgTransId == ''}
                                                        onClick={() => openUploadDocumentModal(item.igmNo, item.igmLineNo, item.blNo, item.igmTransId)}

                                                    >
                                                        <FontAwesomeIcon icon={faUpload} />
                                                    </Button>




                                                </td>
                                                <td style={{ paddingLeft: 13 }}>

                                                    <Row>
                                                        <Input
                                                            className="form-control"
                                                            type="select"
                                                            id={`cycle${index}`}
                                                            name='cycle'
                                                            disabled={item.invoiceDone === 'Y'}
                                                            value={item.cycle}
                                                            style={{ width: 85 }}
                                                            onChange={(e) => handleIgmCrgChange(e, index)}
                                                        >
                                                            <option value="IMP">IMP</option>
                                                            <option value="DPD">DPD</option>
                                                            <option value="FREE_HAND">FREE_HAND</option>
                                                            <option value="REQUEST">REQUEST</option>
                                                        </Input>

                                                        <Input
                                                            className={`form-control ${errors[index]?.igmLineNo ? 'error-border' : ''}`}
                                                            type="text"
                                                            id={`igmLineNo${index}`}
                                                            onChange={(e) => handleIgmCrgChange(e, index)}
                                                            name='igmLineNo'
                                                            style={{ width: 90 }}
                                                            disabled={item.igmCrgTransId != ''}
                                                            maxLength={7}
                                                            value={item.igmLineNo}
                                                        />
                                                    </Row>


                                                </td>
                                                <td>
                                                    <Col style={{ width: 150 }}>
                                                        <Input
                                                            className={`form-control ${errors[index]?.blNo ? 'error-border' : ''}`}
                                                            type="text"
                                                            id={`blNo${index}`}
                                                            name='blNo'
                                                            disabled={item.invoiceDone === 'Y'}
                                                            onChange={(e) => handleIgmCrgChange(e, index)}
                                                            value={item.blNo}
                                                            maxLength={20}
                                                        />
                                                    </Col>
                                                </td>
                                                <td>
                                                    <Col style={{ width: 150 }}>
                                                        <div style={{ position: 'relative' }}>
                                                            <DatePicker
                                                                selected={item.blDate}
                                                                disabled={item.invoiceDone === 'Y'}
                                                                id={`blDate${index}`}
                                                                onChange={(date) => handleBLDate(date, index)}
                                                                dateFormat="dd/MM/yyyy"
                                                                className={`form-control ${errors[index]?.blDate ? 'error-border' : ''}`}
                                                                name="blDate"
                                                                popperPlacement="right-start"
                                                                wrapperClassName="custom-react-datepicker-wrapper"
                                                                popperClassName="custom-react-datepicker-popper"
                                                                portalId="datepicker-portal" // Add this line
                                                                customInput={
                                                                    <input
                                                                        style={{
                                                                            height: "38px",
                                                                            width: "100%",
                                                                        }}
                                                                    />
                                                                }
                                                            />
                                                            <FontAwesomeIcon
                                                                icon={faCalendarAlt}
                                                                style={{
                                                                    position: 'absolute',
                                                                    right: '10px',
                                                                    top: '50%',
                                                                    transform: 'translateY(-50%)',
                                                                    pointerEvents: 'none',
                                                                    color: '#6c757d'
                                                                }}
                                                            />
                                                        </div>
                                                    </Col>
                                                </td>
                                                <td>
                                                    <Col style={{ width: 180 }}>
                                                        <Input
                                                            className={`form-control ${errors[index]?.hsnCode ? 'error-border' : ''}`}
                                                            type="select"
                                                            id={`hsnCode${index}`}
                                                            onChange={(e) => handleIgmCrgChange(e, index)}
                                                            name='hsnCode'
                                                            value={item.hsnCode}
                                                            disabled={item.invoiceDone === 'Y'}
                                                        >
                                                            <option value="">Select HSN Code</option>
                                                            {hsnData.map((item, index) => (
                                                                <option key={index} value={item[0]}>{item[1]}</option>
                                                            ))}
                                                        </Input>
                                                    </Col>
                                                </td>
                                                <td>
                                                    <Col style={{ width: 150 }}>
                                                        <Input
                                                            className={`form-control ${errors[index]?.commodityDescription ? 'error-border' : ''}`}
                                                            type="textarea"
                                                            id={`commodityDescription${index}`}
                                                            name='commodityDescription'
                                                            disabled={item.invoiceDone === 'Y'}
                                                            onChange={(e) => handleIgmCrgChange(e, index)}
                                                            value={item.commodityDescription}
                                                            maxLength={250}
                                                        />
                                                    </Col>
                                                </td>
                                                <td>
                                                    <Col style={{ width: 180 }}>
                                                        <Input
                                                            className="form-control"
                                                            type="textarea"
                                                            id={`marksOfNumbers${index}`}
                                                            name='marksOfNumbers'
                                                            disabled={item.invoiceDone === 'Y'}
                                                            onChange={(e) => handleIgmCrgChange(e, index)}
                                                            value={item.marksOfNumbers}
                                                            maxLength={250}
                                                        />
                                                    </Col>
                                                </td>
                                                <td>
                                                    <Col style={{ width: 150 }}>
                                                        <Input
                                                            className={`form-control ${errors[index]?.cargoMovement ? 'error-border' : ''}`}
                                                            type="select"
                                                            id={`cargoMovement${index}`}
                                                            onChange={(e) => handleIgmCrgChange(e, index)}
                                                            name='cargoMovement'
                                                            disabled={item.invoiceDone === 'Y'}
                                                            value={item.cargoMovement}
                                                        >
                                                            <option value="">Select Cargo Movement</option>
                                                            <option value="LC">Local Cargo</option>
                                                            <option value="TI">Transhipment to ICD-SMTP</option>
                                                            <option value="TC">Transhipment Cargo</option>
                                                        </Input>
                                                    </Col>
                                                </td>
                                                <td>
                                                    <Col style={{ width: 150 }}>
                                                        <Input
                                                            className={`form-control ${errors[index]?.grossWeight ? 'error-border' : ''}`}
                                                            type="text"
                                                            id={`grossWeight${index}`}
                                                            onChange={(e) => handleIgmCrgChange(e, index)}
                                                            name='grossWeight'
                                                            value={item.grossWeight}
                                                            disabled={item.invoiceDone === 'Y'}
                                                            maxLength={16}
                                                        />
                                                    </Col>
                                                </td>
                                                <td>
                                                    <Col style={{ width: 150 }}>
                                                        <Input
                                                            className={`form-control ${errors[index]?.unitOfWeight ? 'error-border' : ''}`}
                                                            type="text"
                                                            id={`unitOfWeight${index}`}
                                                            onChange={(e) => handleIgmCrgChange(e, index)}
                                                            name='unitOfWeight'
                                                            value={item.unitOfWeight}
                                                            disabled={item.invoiceDone === 'Y'}
                                                            maxLength={3}
                                                        />
                                                    </Col>
                                                </td>
                                                <td>
                                                    <Col style={{ width: 150 }}>
                                                        <Input
                                                            className={`form-control ${errors[index]?.noOfPackages ? 'error-border' : ''}`}
                                                            type="text"
                                                            id={`noOfPackages${index}`}
                                                            onChange={(e) => handleIgmCrgChange(e, index)}
                                                            name='noOfPackages'
                                                            value={item.noOfPackages}
                                                            disabled={item.invoiceDone === 'Y'}
                                                            maxLength={8}
                                                        />

                                                    </Col>
                                                </td>
                                                <td>
                                                    <Col style={{ width: 150 }}>
                                                        <Input
                                                            className={`form-control ${errors[index]?.typeOfPackage ? 'error-border' : ''}`}
                                                            type="select"
                                                            id={`typeOfPackage${index}`}
                                                            onChange={(e) => handleIgmCrgChange(e, index)}
                                                            name='typeOfPackage'
                                                            value={item.typeOfPackage}
                                                            disabled={item.invoiceDone === 'Y'}
                                                        >
                                                            <option value="">Select Type Of Package</option>
                                                            {packages.map((item, index) => (
                                                                <option key={index} value={item[0]}>{item[1]}</option>
                                                            ))}
                                                        </Input>
                                                    </Col>
                                                </td>
                                                <td>


                                                    <Col md={12} style={{ width: 250 }}>
                                                        <FormGroup>

                                                            <Select
                                                                value={{ value: item.accountHolderId, label: item.accountHolderName }}
                                                                onChange={(option, actionMeta) => handleChangeAccountHolder(option, actionMeta, index)}
                                                                onInputChange={getAccountHolderData}
                                                                options={igmSearchedData3}
                                                                placeholder="Select Account Holder"
                                                                isClearable
                                                                menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                                                                menuPosition="fixed" // Sets the dropdown menu position to fixed    
                                                                id="accountHolderName"
                                                                isDisabled={item.invoiceDone === 'Y'}

                                                                name="accountHolderName"
                                                                className="autocompleteHeight"
                                                                menuPlacement="top"
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
                                                                        color: 'gray'
                                                                    }),
                                                                    menu: (provided) => ({
                                                                        ...provided,
                                                                        zIndex: 9999 // Ensure the dropdown renders on top of other elements
                                                                    }),
                                                                    menuPortal: (base) => ({
                                                                        ...base,
                                                                        zIndex: 9999 // Ensure the dropdown renders on top of other elements
                                                                    }),
                                                                }}

                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    {/* <Col md={4} >
                                                                <button
                                                                    className="btn btn-outline-primary btn-margin newButton"
                                                                    style={{ marginRight: 10 }}
                                                                    id="submitbtn2"
                                                                    onClick={handleOpenAccModal}
                                                                    disabled={item.igmCrgTransId != ''}
                                                                >
                                                                    <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                                                </button>
                                                            </Col> */}

                                                    {/* <Modal Modal isOpen={isModalOpenForAccHolder} onClose={handleCloseAccModal} toggle={handleCloseAccModal} style={{ maxWidth: '700px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                                                        <ModalHeader toggle={handleCloseAccModal} style={{
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
                                                            /> Search Acc. Holder</h5>



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
                                                                            value={igmSearchId3}
                                                                            onChange={(e) => setIgmSearchId3(e.target.value)}
                                                                        />

                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md={6} style={{ marginTop: 24 }}>
                                                                    <button
                                                                        className="btn btn-outline-primary btn-margin newButton"
                                                                        style={{ marginRight: 10 }}
                                                                        id="submitbtn2"
                                                                        onClick={() => searchIGM3(igmSearchId3)}
                                                                    >
                                                                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                                                        Search
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-outline-danger btn-margin newButton"
                                                                        style={{ marginRight: 10 }}
                                                                        id="submitbtn2"
                                                                        onClick={clearSearch3}
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
                                                                            <th scope="col">Party Id</th>
                                                                            <th scope="col">Party Name</th>

                                                                        </tr>
                                                                        <tr className='text-center'>
                                                                            <th scope="col"></th>
                                                                            <th scope="col">{igmSearchedData3.length}</th>
                                                                            <th scope="col"></th>

                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr >
                                                                            <td>
                                                                                <input type="radio" name="radioGroup" onChange={() => selectIGMSearchRadio3('', '', index)} value={''} />
                                                                            </td>
                                                                            <td></td>
                                                                            <td></td>

                                                                        </tr>
                                                                        {currentItems3.map((item, index1) => (
                                                                            <tr key={index1}>
                                                                                <td>
                                                                                    <input type="radio" name="radioGroup" onChange={() => selectIGMSearchRadio3(item[0], item[1], index)} value={item[0]} />
                                                                                </td>
                                                                                <td>{item[0]}</td>
                                                                                <td>{item[1]}</td>

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
                                                                        disabled={currentPage3 === totalPages1}
                                                                    />
                                                                    <Pagination.Last onClick={() => handlePageChange3(totalPages3)} />
                                                                </Pagination>
                                                            </div>
                                                        </ModalBody>
                                                    </Modal> */}

                                                </td>

                                                {/* <td>
                                                    <Col style={{ width: 150 }}>
                                                        <Input
                                                            className={`form-control ${errors[index]?.importerType ? 'error-border' : ''}`}
                                                            type="text"
                                                            id={`importerType${index}`}
                                                            name='importerType'
                                                            disabled={item.igmCrgTransId != ''}
                                                            onChange={(e) => handleIgmCrgChange(e, index)}
                                                            value={item.importerType}
                                                            maxLength={30}
                                                        />
                                                    </Col>
                                                </td> */}
                                                <td>
                                                    <Col md={12} style={{ width: 300 }}>
                                                        <FormGroup>

                                                            <Select

                                                                value={{ value: item.importerId, label: item.importerName }}
                                                                onChange={(option, actionMeta) => handleChangeImp(option, actionMeta, index)}
                                                                onInputChange={getImp}
                                                                options={importers}
                                                                placeholder="Select Account Holder"
                                                                isClearable
                                                                id="importerName"
                                                                isDisabled={item.invoiceDone === 'Y'}
                                                                name="importerName"
                                                                className={`autocompleteHeight ${errors[index]?.importerName ? 'error-border' : ''}`}
                                                                components={{ Option: CustomOption }}
                                                                menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                                                                menuPosition="fixed" // Sets the dropdown menu position to fixed    
                                                                menuPlacement="top"
                                                                styles={{
                                                                    control: (provided, state) => ({
                                                                        ...provided,
                                                                        border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                                                                        boxShadow: 'none',
                                                                        '&:hover': {
                                                                            border: '1px solid #ccc'
                                                                        },
                                                                        minHeight: '32px',
                                                                        height: 'auto', // Allow height to auto-adjust
                                                                    }),
                                                                    valueContainer: (provided) => ({
                                                                        ...provided,
                                                                        padding: '8px', // Add padding for better appearance
                                                                        whiteSpace: 'pre-wrap', // Preserve whitespace and allow text to wrap
                                                                        overflowWrap: 'break-word', // Break long words
                                                                    }),
                                                                    singleValue: (provided) => ({
                                                                        ...provided,
                                                                        whiteSpace: 'pre-wrap', // Preserve whitespace
                                                                        overflowWrap: 'break-word', // Break long words
                                                                    }),
                                                                    indicatorsContainer: (provided) => ({
                                                                        ...provided,
                                                                        height: 'auto', // Adjust to match the dynamic height
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
                                                                        alignItems: 'center', // Align placeholder text vertically
                                                                    }),
                                                                    menu: (provided) => ({
                                                                        ...provided,
                                                                        zIndex: 9999 // Ensure the dropdown renders on top of other elements
                                                                    }),
                                                                    menuPortal: (base) => ({
                                                                        ...base,
                                                                        zIndex: 9999 // Ensure the dropdown renders on top of other elements
                                                                    }),
                                                                }}

                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    {/* <Modal Modal isOpen={isModalOpenForImp} onClose={handleCloseImp} toggle={handleCloseImp} style={{ maxWidth: '700px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

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
                                                                            value={igmSearchId2}
                                                                            onChange={(e) => setIgmSearchId2(e.target.value)}
                                                                        />

                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md={6} style={{ marginTop: 24 }}>
                                                                    <button
                                                                        className="btn btn-outline-primary btn-margin newButton"
                                                                        style={{ marginRight: 10 }}
                                                                        id="submitbtn2"
                                                                        onClick={() => searchIGM2(igmSearchId2)}
                                                                    >
                                                                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                                                        Search
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-outline-danger btn-margin newButton"
                                                                        style={{ marginRight: 10 }}
                                                                        id="submitbtn2"
                                                                        onClick={clearSearch2}
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
                                                                            <th scope="col">{igmSearchedData2.length}</th>
                                                                            <th scope="col"></th>
                                                                            <th scope="col"></th>
                                                                            <th scope="col"></th>

                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr >
                                                                            <td>
                                                                                <input type="radio" name="radioGroup" onChange={() => selectIGMSearchRadio2(' ', ' ', ' ', ' ', ' ', index)} value="" />
                                                                            </td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>

                                                                        </tr>
                                                                        {currentItems2.map((item, index1) => (
                                                                            <>

                                                                                <tr key={index1}>
                                                                                    <td>
                                                                                        <input type="radio" name="radioGroup" onChange={() => selectIGMSearchRadio2(item[0], item[1], item[2], item[3], item[4], index)} value={item[0]} />
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
                                                        </ModalBody>
                                                    </Modal> */}
                                                </td>

                                                <td>

                                                    <Col md={12} style={{ width: 250 }}>
                                                        {/* <FormGroup>

                                                            <Select
                                                                value={{
                                                                    value: item.importerAddress1,
                                                                    label: item.importerAddress1,
                                                                }}
                                                                onChange={(option, actionMeta) => handleChangeImpAdd(option, actionMeta, index)}
                                                                options={impAddresses} // This should contain data
                                                                placeholder="Select Account Holder"
                                                                isClearable
                                                                id="importerAddress1"
                                                                name="importerAddress1"
                                                                className='autocompleteHeight'
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

                                                        </FormGroup> */}

                                                        <Input
                                                            className={`form-control ${errors[index]?.importerAddress1 ? 'error-border' : ''}`}
                                                            type="textarea"
                                                            id={`importerAddress1${index}`}
                                                            name='importerAddress1'
                                                            value={item.importerAddress1}
                                                            onChange={(e) => handleIgmCrgChange(e, index)}
                                                            maxLength={250}
                                                            disabled={item.invoiceDone === 'Y'}
                                                        />
                                                    </Col>
                                                </td>
                                                <td>
                                                    <Col style={{ width: 200 }}>
                                                        <Input
                                                            className="form-control"
                                                            type="textarea"
                                                            id={`importerAddress2${index}`}
                                                            name='importerAddress2'
                                                            disabled={item.invoiceDone === 'Y'}
                                                            value={item.importerAddress2}
                                                            onChange={(e) => handleIgmCrgChange(e, index)}
                                                            maxLength={250}
                                                        />
                                                    </Col>
                                                </td>
                                                <td>
                                                    <Col style={{ width: 200 }}>
                                                        <Input
                                                            className="form-control"
                                                            type="textarea"
                                                            disabled={item.invoiceDone === 'Y'}
                                                            id={`importerAddress3${index}`}
                                                            name='importerAddress3'
                                                            value={item.importerAddress3}
                                                            onChange={(e) => handleIgmCrgChange(e, index)}
                                                            maxLength={250}
                                                        />
                                                    </Col>
                                                </td>
                                                <td>
                                                    <Col md={12} style={{ width: 300 }}>
                                                        <FormGroup>
                                                            {/* <Label>Same as Importer</Label>
                                                            <Input
                                                                type="checkbox"
                                                                id={`checkbox-${index}`}
                                                                disabled={item.igmCrgTransId != ''}
                                                                checked={item.notifyPartyId === item.importerId}
                                                                style={{ marginLeft: '8px', width: 20, height: 20,borderColor:'black' }} // Add some spacing between the checkbox and the select
                                                                onChange={(e) => checkNotify(index, e)} // Add your checkbox change handler here
                                                            /> */}
                                                            <Select

                                                                value={{ value: item.notifyPartyId, label: item.notifyPartyName }}
                                                                onChange={(option, actionMeta) => handleChangeNotifiedImp(option, actionMeta, index)}
                                                                onInputChange={getImp}
                                                                options={importers}
                                                                placeholder="Select Account Holder"
                                                                isClearable
                                                                id="notifyPartyName"
                                                                name="notifyPartyName"
                                                                menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                                                                menuPosition="fixed" // Sets the dropdown menu position to fixed    
                                                                isDisabled={item.invoiceDone === 'Y' || isHeaderCheck}
                                                                className='autocompleteHeight'
                                                                components={{ Option: CustomOption }}
                                                                styles={{
                                                                    control: (provided, state) => ({
                                                                        ...provided,
                                                                        border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                                                                        boxShadow: 'none',
                                                                        '&:hover': {
                                                                            border: '1px solid #ccc'
                                                                        },
                                                                        minHeight: '32px',
                                                                        height: 'auto', // Allow height to auto-adjust
                                                                    }),
                                                                    valueContainer: (provided) => ({
                                                                        ...provided,
                                                                        padding: '8px', // Add padding for better appearance
                                                                        whiteSpace: 'pre-wrap', // Preserve whitespace and allow text to wrap
                                                                        overflowWrap: 'break-word', // Break long words
                                                                    }),
                                                                    singleValue: (provided) => ({
                                                                        ...provided,
                                                                        whiteSpace: 'pre-wrap', // Preserve whitespace
                                                                        overflowWrap: 'break-word', // Break long words
                                                                    }),
                                                                    indicatorsContainer: (provided) => ({
                                                                        ...provided,
                                                                        height: 'auto', // Adjust to match the dynamic height
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
                                                                        alignItems: 'center', // Align placeholder text vertically
                                                                    }),
                                                                    menu: (provided) => ({
                                                                        ...provided,
                                                                        top: 'auto',
                                                                        bottom: '100%', // Set dropdown to appear above the select input
                                                                        marginBottom: 8, // Adjust spacing between the dropdown and input
                                                                    }),
                                                                    menu: (provided) => ({
                                                                        ...provided,
                                                                        zIndex: 9999 // Ensure the dropdown renders on top of other elements
                                                                    }),
                                                                    menuPortal: (base) => ({
                                                                        ...base,
                                                                        zIndex: 9999 // Ensure the dropdown renders on top of other elements
                                                                    }),
                                                                }}

                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    {/* <Modal Modal isOpen={isModalOpenForImp1} onClose={handleCloseImp1} toggle={handleCloseImp1} style={{ maxWidth: '700px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

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
                                                                        onClick={() => searchIGM1(igmSearchId1)}
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
                                                                                <input type="radio" name="radioGroup" onChange={() => selectIGMSearchRadio1('', '', '', '', '', index)} value={''} />
                                                                            </td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>

                                                                        </tr>
                                                                        {currentItems1.map((item, index1) => (
                                                                            <tr key={index1}>
                                                                                <td>
                                                                                    <input type="radio" name="radioGroup" onChange={() => selectIGMSearchRadio1(item[0], item[1], item[2], item[3], item[4], index)} value={item[0]} />
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
                                                    </Modal> */}
                                                </td>
                                                <td>
                                                    <Col style={{ width: 250 }}>
                                                        <Input
                                                            className="form-control"
                                                            type="textarea"
                                                            id={`notifiedAddress1${index}`}
                                                            name='notifiedAddress1'
                                                            value={item.notifiedAddress1}
                                                            disabled={item.invoiceDone === 'Y'}
                                                            onChange={(e) => handleIgmCrgChange(e, index)}
                                                            maxLength={250}
                                                        />
                                                    </Col>
                                                </td>
                                                <td>
                                                    <Col style={{ width: 200 }}>
                                                        <Input
                                                            className="form-control"
                                                            type="textarea"
                                                            id={`notifiedAddress2${index}`}
                                                            name='notifiedAddress2'
                                                            disabled={item.invoiceDone === 'Y'}
                                                            value={item.notifiedAddress2}
                                                            onChange={(e) => handleIgmCrgChange(e, index)}
                                                            maxLength={250}
                                                        />
                                                    </Col>
                                                </td>
                                                <td>
                                                    <Col style={{ width: 200 }}>
                                                        <Input
                                                            className="form-control"
                                                            type="textarea"
                                                            id={`notifiedAddress3${index}`}
                                                            name='notifiedAddress3'
                                                            value={item.notifiedAddress3}
                                                            disabled={item.invoiceDone === 'Y'}
                                                            onChange={(e) => handleIgmCrgChange(e, index)}
                                                            maxLength={250}
                                                        />
                                                    </Col>
                                                </td>
                                                <td>
                                                    <Col style={{ width: 150 }}>
                                                        <Input
                                                            className="form-control"
                                                            type="text"
                                                            id={`origin${index}`}
                                                            name='origin'
                                                            disabled={item.invoiceDone === 'Y'}
                                                            value={item.origin}
                                                            onChange={(e) => handleIgmCrgChange(e, index)}
                                                            maxLength={50}
                                                        />
                                                    </Col>
                                                </td>
                                                <td>
                                                    <Col style={{ width: 150 }}>
                                                        <Input
                                                            className={`form-control ${errors[index]?.destination ? 'error-border' : ''}`}
                                                            type="text"
                                                            id={`destination${index}`}
                                                            name='destination'
                                                            disabled={item.invoiceDone === 'Y'}
                                                            onChange={(e) => handleIgmCrgChange(e, index)}
                                                            value={item.destination}
                                                            maxLength={50}
                                                        />
                                                    </Col>
                                                </td>
                                                <td>
                                                    <Col style={{ width: 150 }}>
                                                        <Input
                                                            className="form-control"
                                                            type="select"
                                                            id={`cargoType${index}`}
                                                            value={item.cargoType}
                                                            name='cargoType'
                                                            disabled={item.invoiceDone === 'Y'}
                                                            onChange={(e) => handleIgmCrgChange(e, index)}
                                                        >
                                                            <option value="NAGRO">Non Agro</option>
                                                            <option value="Agro">Agro</option>
                                                            <option value="Haz">Haz</option>
                                                        </Input>
                                                    </Col>
                                                </td>
                                                <td>
                                                    <Col style={{ width: 150 }}>
                                                        <Input
                                                            className="form-control"
                                                            type="text"
                                                            id={`imoCode${index}`}
                                                            name='imoCode'
                                                            onChange={(e) => handleIgmCrgChange(e, index)}
                                                            value={item.imoCode}
                                                            disabled={item.invoiceDone === 'Y'}
                                                            maxLength={3}
                                                        />
                                                    </Col>
                                                </td>
                                                <td>
                                                    <Col style={{ width: 150 }}>
                                                        <Input
                                                            className="form-control"
                                                            type="text"
                                                            id={`unNo${index}`}
                                                            name='unNo'
                                                            onChange={(e) => handleIgmCrgChange(e, index)}
                                                            value={item.unNo}
                                                            disabled={item.invoiceDone === 'Y'}
                                                            maxLength={10}
                                                        />
                                                    </Col>
                                                </td>
                                                <td>
                                                    <Col style={{ width: 150 }}>
                                                        <Input
                                                            className="form-control"
                                                            type="text"
                                                            id={`hazReeferRemarks${index}`}
                                                            disabled={item.invoiceDone === 'Y'}
                                                            name='hazReeferRemarks'
                                                            onChange={(e) => handleIgmCrgChange(e, index)}
                                                            value={item.hazReeferRemarks}
                                                            maxLength={10}
                                                        />
                                                    </Col>
                                                </td>
                                            </tr>

                                        </>
                                    ))}

                                </tbody>
                            </table>
                        </div>



                    </>
                )}
            </div >
        </div >
    )
}
