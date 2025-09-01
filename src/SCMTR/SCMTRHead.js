import AuthContext from '../Components/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import ipaddress from "../Components/IpAddress";
import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts';
import Select from 'react-select';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { Pagination } from 'react-bootstrap';
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
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faCalendarAlt, faAdd, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import useAxios from '../Components/useAxios';
import { dark } from '@mui/material/styles/createPalette';
import { toast } from 'react-toastify';
import { CSSTransition } from 'react-transition-group';
import "../Components/RowAnimation.css"
import GenerateStuffingMessage from './GenerateStuffingMessage';
import GenerateASRMessage from './GenerateASRMessage';

export default function SCMTRHead() {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

    // If the user is not authenticated, redirect to the login page
    useEffect(() => {
        if (!isAuthenticated) {

            navigate('/login?message=You need to be authenticated to access this page.');
        }
    }, [isAuthenticated, navigate]);

    const axios = useAxios();
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




    const searchParams = new URLSearchParams(location.search);
    const processId = searchParams.get('process_id');


    const [activeTab, setActiveTab] = useState('P00201');



    // const renderTabs = () => {
    //     const hasRights = (tab) => {
    //         const userRight = userRights.find((right) => right.process_Id === tab.processId);
    //         return userRight && userRight.allow_Read === "Y";
    //     };

    //     const isAdmin = role === "ROLE_ADMIN";

    //     // Filter tabs based on pagesList, admin rights, and user rights
    //     const filteredTabMenus = tabMenus.filter((tab) => {
    //         const isEnabled = pagesList.length === 0 || pagesList.includes(tab.processId);
    //         return tab.pprocess_Id === processId && isEnabled && (isAdmin || hasRights(tab));
    //     });

    //     return (
    //         <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', width: '100%', height: '54px' }}>
    //             <ul className="nav nav-tabs" style={{ display: 'flex', flexWrap: 'nowrap' }}>
    //                 {filteredTabMenus.map((tab) => {
    //                     const isEnabled = pagesList.length === 0 || pagesList.includes(tab.processId);
    //                     const hasUserRights = hasRights(tab);
    //                     const isTabDisabled = !isEnabled || (!isAdmin && !hasUserRights);

    //                     console.log('isTabDisabled ', isTabDisabled, ' ', tab.processId, ' ', isEnabled, ' ', isAdmin);

    //                     const tabStyle = {
    //                         whiteSpace: 'nowrap',
    //                         backgroundColor: isTabDisabled ? '#E0E0E0' : '', // Change to your desired color
    //                     };

    //                     return (
    //                         <li className="nav-item flex-fill" key={tab.processId} role="presentation" style={{ flex: '0 0 auto' }}>
    //                             <button
    //                                 className={`nav-link border ${activeTab === tab.processId ? "active" : ""}`}
    //                                 id={tab.processId}
    //                                 data-bs-toggle="tab"
    //                                 data-bs-target={`#bordered-justified-${tab.processId}`}
    //                                 type="button"
    //                                 role="tab"
    //                                 aria-controls={`bordered-justified-${tab.processId}`}
    //                                 aria-selected={activeTab === tab.processId}
    //                                 onClick={() => handleTabClick(tab.processId)}
    //                                 disabled={isTabDisabled}
    //                                 style={tabStyle}
    //                             >
    //                                 {tab.child_Menu_Name}
    //                             </button>
    //                         </li>
    //                     );
    //                 })}
    //             </ul>
    //         </div>
    //     );
    // };




    // const renderTabs = () => {
    //     const hasRights = (tab) => {
    //         const userRight = userRights.find((right) => right.process_Id === tab.processId);
    //         return userRight && userRight.allow_Read === "Y";
    //     };

    //    // const isAdmin = role === "ROLE_ADMIN";
    //     const filteredTabMenus = tabMenus.filter((tab) => tab.pprocess_Id === processId);

    //     return (
    //         <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', width: '100%', height: '54px' }}>
    //             <ul className="nav nav-tabs" style={{ display: 'flex', flexWrap: 'nowrap' }}>
    //                 {filteredTabMenus.map((tab) => {
    //                     const isEnabled = pagesList.length === 0 || pagesList.includes(tab.processId);
    //                     const isTabDisabled = !isEnabled;

    //                     const tabStyle = {
    //                         whiteSpace: 'nowrap',
    //                         backgroundColor: isTabDisabled ? '#E0E0E0' : '', // Change to your desired color
    //                     };

    //                     return (
    //                         <li className="nav-item flex-fill" key={tab.processId} role="presentation" style={{ flex: '0 0 auto' }}>
    //                             <button
    //                                 className={`nav-link border ${activeTab === tab.processId ? "active" : ""}`}
    //                                 id={tab.processId}
    //                                 data-bs-toggle="tab"
    //                                 data-bs-target={`#bordered-justified-${tab.processId}`}
    //                                 type="button"
    //                                 role="tab"
    //                                 aria-controls={`bordered-justified-${tab.processId}`}
    //                                 aria-selected={activeTab === tab.processId}
    //                                 onClick={() => handleTabClick(tab.processId)}
    //                                 disabled={isTabDisabled}
    //                                 style={tabStyle}
    //                             >
    //                                 {tab.child_Menu_Name}
    //                             </button>
    //                         </li>
    //                     );
    //                 })}
    //             </ul>
    //         </div>
    //     );
    // };

    const renderTabs = () => {
        const hasRights = (tab) => {
            const userRight = userRights.find((right) => right.process_Id === tab.processId);
            return userRight && userRight.allow_Read === "Y";
        };

        let filteredTabMenus; // Further filter based on user rights

        const isAdmin = role === "ROLE_ADMIN";

        if (isAdmin) {
            filteredTabMenus = tabMenus.filter((tab) => tab.pprocess_Id === processId);
        }
        else {
            filteredTabMenus = tabMenus
                .filter((tab) => tab.pprocess_Id === processId) // Filter based on processId
                .filter((tab) => hasRights(tab));
        }

        return (
            // <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', width: '100%', height: '54px' }}>
            <div
                className="tab-container"
            >
                <ul className="nav nav-tabs" style={{ display: 'flex', flexWrap: 'nowrap' }}>
                    {filteredTabMenus.map((tab) => {
                        const isEnabled = pagesList.length === 0 || pagesList.includes(tab.processId);
                        const isTabDisabled = !isEnabled;

                        const tabStyle = {
                            whiteSpace: 'nowrap',
                            color: activeTab === tab.processId ? "#0d6efd" : "#333",
                            backgroundColor: isTabDisabled ? '#E0E0E0' : '', // Change to your desired color
                        };

                        return (
                            <li className="nav-item flex-fill" key={tab.processId} role="presentation" style={{ flex: '0 0 auto' }}>
                                <button
                                    className={`nav-link neumorphic-button ${activeTab === tab.processId ? "active" : ""}`}
                                    id={tab.processId}
                                    data-bs-toggle="tab"
                                    data-bs-target={`#bordered-justified-${tab.processId}`}
                                    type="button"
                                    role="tab"
                                    aria-controls={`bordered-justified-${tab.processId}`}
                                    aria-selected={activeTab === tab.processId}
                                    onClick={() => handleTabClick(tab.processId)}
                                    disabled={isTabDisabled}
                                    style={tabStyle}
                                >
                                    {tab.child_Menu_Name}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    };




    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };
    const [sealCuttingData, setSealCuttingData] = useState([
        { label: 'ItemWise SealCutting', value: 'itemwise' },
        { label: 'Containerwise Cutting', value: 'containerwise' }
    ]);
    const [selectSealCuttingType, setSelectSealCuttingType] = useState('');



    const handleSealCuttingChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setSelectSealCuttingType('');
        }
        else {


            setSelectSealCuttingType(selectedOption ? selectedOption.value : '')
        }
    };





    // CARGO EXAMINATION
    const [errors, setErrors] = useState({});
    const [examTallyIds, setExamTallyIds] = useState([]);
    const [examTallyId, setExamTallyId] = useState(null);




    const handleKeyDown = (event, name) => {
        if (event.key === 'Enter') {
            alert('Hii : ' + name + ' ' + new Date());
        }
    };

    const [selectedGatePassType, setSelectedGatePassType] = useState('');

    const handleSelectChange = (event) => {
        setSelectedGatePassType(event.target.value);
    };



    const [uploadData, setUploadData] = useState([
        { label: 'IGM File Upload', value: 'IGM File Upload' },
        { label: 'IGM Excel Upload', value: 'IGM Excel Upload' },
        { label: 'Scanning List Upload', value: 'Scanning List Upload' }
    ])

    const [selectUploadType, setSelectUploadType] = useState('');

    const handleUploadTypeChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setSelectUploadType('');
        }
        else {


            setSelectUploadType(selectedOption ? selectedOption.value : '')
        }
    };




    //-----------------------------IGM Entry Start
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
        docDate: null,
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
                    label: port[1],

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
            setPortName(selectedOption ? selectedOption.label : '');
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
                setIgmData(response.data);
                toast.success("Data save successfully!!", {
                    autoClose: 800
                })
                handleTabClick('P00211');
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
            docDate: null,
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

    const selectIGMSearchRadio = (trans, igm, portName, vesselName, shippingLineName, shippingLineCode, shippingAgentName, shippingAgentCode) => {
        closeIGMSearchModal();
        axios.get(`${ipaddress}cfigm/getDataByTransAndIGM?cid=${companyid}&bid=${branchId}&transId=${trans}&igm=${igm}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
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

            })
            .catch((error) => {

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







    //-----------------------------IGM Entry End


    const [igm, setigm] = useState('');
    const [item, setitem] = useState('');
    const [bl, setBl] = useState('');
    const [be, setBe] = useState('');
    const [con, setCon] = useState('');

    const [searchedIgm, setsearchedIgm] = useState('');
    const [searchIgmTrans, setsearchIgmTrans] = useState('');
    const [searchCon, setSearchCon] = useState('');
    const [searchConList, setSearchConList] = useState([]);
    const [searchSealCutStatus, setsearchSealCutStatus] = useState('');
    const [sealcitigm, setsealcitigm] = useState('');
    const [sealcutitem, setsealcutitem] = useState('');
    const [gateInId, setgateInId] = useState({});

    const [pagesList, setpagesList] = useState([]);
    const search = (igm, item, bl, be, con) => {
        setLoading(true);

        if (!igm && !item && !bl && !be && !con) {

            setLoading(false);
            return;
        }

        if (!igm && item && !bl && !be && !con) {
            toast.error("IGM No is required", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }

        axios.get(`${ipaddress}cfigm/searchMainHeader?cid=${companyid}&bid=${branchId}&igm=${igm}&item=${item}&blNo=${bl}&beNo=${be}&container=${con}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setpagesList(response.data.list);
                console.log('pages ', response.data.list);
                setsearchedIgm(response.data.igm);
                setsearchIgmTrans(response.data.igmtrans);
                setSearchCon(response.data.con);
                setSearchConList(response.data.cnlist);
                setgateInId(response.data.gateInId[0]);

                console.log('response.data.sealData[0] ', response.data);
                console.log('response.data.sealData.length ', response.data.sealData.length);
                if (!response.data.sealData[0] || response.data.sealData[0] === null || response.data.sealData[0] === undefined) {
                    setsealcitigm('');
                    setsealcutitem('');
                    setsearchSealCutStatus('');
                }
                else {
                    if (response.data.sealData.length === 1) {
                        setsealcitigm(response.data.sealData[0][0]);
                        setsealcutitem(response.data.sealData[0][1]);
                        setsearchSealCutStatus(response.data.sealCutStatus);
                    }
                    else {
                        setsealcitigm(response.data.sealData[0][0]);
                        setsealcutitem('');
                        setsearchSealCutStatus('');
                    }
                }

                setLoading(false);
                toast.success("Data found successfully!!!", {
                    autoClose: 800
                })
                setActiveTab('home-1');
            })
            .catch((error) => {
                console.log('error error ', error);

                toast.error(
                    error?.response?.data || "An unknown error occurred.",
                    {
                        autoClose: 800
                    }
                );
                setgateInId({});
                setsearchedIgm('');
                setsearchIgmTrans('');
                setSearchCon('');
                setpagesList([]);
                setActiveTab('home-1');
                setSearchConList([]);
                setLoading(false);
                setsealcitigm('');
                setsealcutitem('');
                setsearchSealCutStatus('');
            })
    }

    const reset = () => {
        setigm('');
        setitem('');
        setBl('');
        setBe('');
        setCon('');
        setgateInId({});
        setpagesList([]);
        setActiveTab('home-1');
        setsearchedIgm('');
        setsearchIgmTrans('');
        setSearchCon('');
        setSearchConList([]);
        setsealcitigm('');
        setsealcutitem('');
        setsearchSealCutStatus('');
    }

    const [isRowVisible, setIsRowVisible] = useState(true);

    const toggleRowVisibility = () => {
        setIsRowVisible(!isRowVisible);
    };

    const hndleRequest = () => {
        search1(igm, item, bl, be, con);
    }


    const search1 = (igm, item, bl, be, con) => {
        setLoading(true);

        if (!igm && !item && !bl && !be && !con) {

            setLoading(false);
            return;
        }

        if (!igm && item && !bl && !be && !con) {
            toast.error("IGM No is required", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }

        axios.get(`${ipaddress}cfigm/searchMainHeader?cid=${companyid}&bid=${branchId}&igm=${igm}&item=${item}&blNo=${bl}&beNo=${be}&container=${con}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setpagesList(response.data.list);
                console.log('pages ', response.data.list);
                setsearchedIgm(response.data.igm);
                setsearchIgmTrans(response.data.igmtrans);
                setSearchCon(response.data.con);
                setSearchConList(response.data.cnlist);


                console.log('response.data.sealData[0] ', response.data, ' ', response.data.sealData.length);
                console.log('response.data.sealData.length ', response.data.sealData.length);

                if (!response.data.sealData[0] || response.data.sealData[0] === null || response.data.sealData[0] === undefined) {
                    setsealcitigm('');
                    setsealcutitem('');
                    setsearchSealCutStatus('');
                }
                else {
                    if (response.data.sealData.length === 1) {
                        setsealcitigm(response.data.sealData[0][0]);
                        setsealcutitem(response.data.sealData[0][1]);
                        setsearchSealCutStatus(response.data.sealCutStatus);
                    }
                    else {
                        setsealcitigm(response.data.sealData[0][0]);
                        setsealcutitem('');
                        setsearchSealCutStatus('');
                    }
                }

                setLoading(false);
                // toast.success("Data found successfully!!!", {
                //     autoClose: 800
                // })
                //   setActiveTab('home-1');
            })
            .catch((error) => {


                // toast.error(
                //     error?.response?.data || "An unknown error occurred.", 
                //     {
                //       autoClose: 800
                //     }
                //   );

                setsearchedIgm('');
                setsearchIgmTrans('');
                setSearchCon('');
                setpagesList([]);
                setActiveTab('home-1');
                setSearchConList([]);
                setLoading(false);
                setsealcitigm('');
                setsealcutitem('');
                setsearchSealCutStatus('');
            })
    }

    return (
        <>
            <div className='Container'>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '2%', paddingRight: '2%' }}>
                    <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }}>
                        <FontAwesomeIcon
                            icon={faArrowAltCircleLeft}
                            style={{
                                marginRight: '8px',
                                color: 'black',
                            }}
                        />
                        SCMTR
                    </h5>
                    <div onClick={toggleRowVisibility} style={{ cursor: 'pointer', textAlign: 'right' }}>
                        <FontAwesomeIcon icon={isRowVisible ? faChevronUp : faChevronDown} />
                    </div>
                </div>

                <Card style={{ backgroundColor: "#F8F8F8" }}>
                    <CardBody>


                        {/* <CSSTransition
                            in={isRowVisible}
                            timeout={300}
                            classNames="row-animation"
                            unmountOnExit
                        >
                            <Row>
                                <Col md={2}>
                                    <FormGroup>
                                        <label className="forlabel" htmlFor="sbRequestId">IGM No</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="fobValueInDollar"
                                            value={igm}
                                            onChange={(e) => setigm(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <label className="inputHeader" htmlFor="sbRequestId">Item No</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="fobValueInDollar"
                                            value={item}
                                            onChange={(e) => setitem(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <label className="inputHeader" htmlFor="sbRequestId">BL No</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="fobValueInDollar"
                                            value={bl}
                                            onChange={(e) => setBl(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <label className="inputHeader" htmlFor="sbRequestId">BE No</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="fobValueInDollar"
                                            value={be}
                                            onChange={(e) => setBe(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <label className="inputHeader" htmlFor="sbRequestId">Container No</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="fobValueInDollar"
                                            value={con}
                                            onChange={(e) => setCon(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={2} style={{ marginTop: 24 }}>
                                    <button
                                        className="btn btn-outline-success btn-margin newButton"
                                        id="submitbtn2"
                                        style={{ fontSize: 13, marginRight: 5 }}
                                        onClick={() => search(igm, item, bl, be, con)}
                                    >
                                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: "1px" }} />
                                        Search
                                    </button>
                                    <button
                                        className="btn btn-outline-danger btn-margin newButton"
                                        style={{ fontSize: 13 }}
                                        id="submitbtn2"
                                        onClick={reset}
                                    >
                                        <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "1px" }} />
                                        Reset
                                    </button>
                                </Col>
                            </Row>
                        </CSSTransition> */}

                        <Row>


                            <div className="tabs-container">

                                <ul className="nav nav-tabs nav-tabs-bordered d-flex" id="borderedTabJustified" role="tablist">
                                    {renderTabs()}
                                </ul>

                            </div>







                            <div
                                className="tab-content"
                                style={{
                                    background: activeTab
                                        ? "linear-gradient(to bottom, #e6ffff 0%, #ffffff 36%)"
                                        : " ",  // Fades out to white after a few rows
                                    transition: "background 0.1s ease-in-out",
                                    minHeight: "100vh",
                                    padding: "20px",
                                    paddingBottom: 0,
                                    marginBottom: 0,
                                }}
                                id="borderedTabJustifiedContent"
                            >
                                <div className={`tab-pane fade ${activeTab === 'P01901' ? 'show active' : ''}`} id="bordered-justified-home-1" role="tabpanel" aria-labelledby="1">

                                    <GenerateStuffingMessage activeTab={activeTab} />

                                </div>
                                <div className={`tab-pane fade ${activeTab === 'P01902' ? 'show active' : ''}`} id="bordered-justified-home-1" role="tabpanel" aria-labelledby="1">

                                    <GenerateASRMessage activeTab={activeTab} />

                                </div>



                            </div>


                        </Row>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

