
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


export default function ImportGatePass({ igm, igmTrans, item, cont, sealStatus, process, onRequest }) {
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
    const [activeTab, setActiveTab] = useState('home-1');
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };
    const [sealCuttingData, setSealCuttingData] = useState([
        { label: 'ItemWise', value: 'itemwise' },
        { label: 'Containerwise', value: 'containerwise' }
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


    useEffect(() => {
        if (sealStatus !== '' && process === 'P00208') {
            setSelectSealCuttingType(sealStatus);

            if (sealStatus === 'itemwise') {
                ckeckByItemWise(igm, item)
                setItemIgm(igm);
                setItemLine(item);
                setigmSearchList([]);
                setconSearchList([]);
            }
            else {
                setcontainerWiseIgm(igm);
                setcontainerWiseCon(cont);
                ckeckByConWise(igm, cont);
                setigmSearchList([]);
                setconSearchList([]);
            }
            console.log('data');
        }
        else if (sealStatus === '' && process === 'P00208') {
            setSelectSealCuttingType('itemwise');


            console.log('itemwise itemwise ');

            setItemIgm(igm);
            getItems(igm);
            getCons(igm);
            setcontainerWiseIgm(igm);
        }
    }, [igm, item, cont, sealStatus, process])

    const [igmSearchList, setigmSearchList] = useState([]);

    console.log('igm  igmTrans', igm, ' ', igmTrans);


    const getItems = (igm) => {
        axios.get(`${ipaddress}importGatePass/getItems?cid=${companyid}&bid=${branchId}&igm=${igm}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {

                console.log('setigmSearchList ', response.data);


                setigmSearchList(response.data);
                if (response.data.length > 0) {
                    setItemLine(response.data[0]);
                    searchItemWiseData(igm, response.data[0]);
                }
                else {
                    selectItemWiseSearch1(igm, igmTrans, item);
                }

            })
            .catch((error) => {
                selectItemWiseSearch1(igm, igmTrans, item);
                setigmSearchList([]);
            })
    }

    const [conSearchList, setconSearchList] = useState([]);

    const getCons = (igm) => {
        axios.get(`${ipaddress}importGatePass/getContainers?cid=${companyid}&bid=${branchId}&igm=${igm}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {


                setconSearchList(response.data);
            })
            .catch((error) => {
                setconSearchList([]);
            })
    }


    const ckeckByItemWise = (igm, line) => {
        if (!igm || !line) {
            return;
        }
        axios.get(`${ipaddress}importGatePass/getExistingItemWiseData?cid=${companyid}&bid=${branchId}&igm=${igm}&item=${line}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                console.log('ckeckByItemWise');

                selectItemWiseSearch(igm, line, response.data);
            })
            .catch((error) => {
                console.log('ckeckByItemWise1');

                searchItemWiseData(igm, line)
            })
    }

    const ckeckByConWise = (igm, cont) => {
        if (!igm || !cont) {
            return;
        }
        axios.get(`${ipaddress}importGatePass/getExistingContWiseData?cid=${companyid}&bid=${branchId}&igm=${igm}&con=${cont}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                selectContWiseSearch(igm, response.data);
            })
            .catch((error) => {
                getContainerWiseData(igm, cont);
            })
    }


    const [errors, setErrors] = useState({});
    const [examTallyIds, setExamTallyIds] = useState([]);
    const [examTallyId, setExamTallyId] = useState(null);

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


    const handleKeyDown = (event, name) => {
        if (event.key === 'Enter') {
            alert('Hii : ' + name + ' ' + new Date());
        }
    };

    const [itemIgm, setItemIgm] = useState('');
    const [itemLine, setItemLine] = useState('');
    const [outType, setOutType] = useState('CON');

    const [gatePassData, setGatePassData] = useState({
        companyId: '',
        branchId: '',
        finYear: '',
        gatePassId: '',
        srNo: 0,
        vehicleGatePassId: '',
        conSrNo: 0,
        profitcentreId: '',
        invoiceNo: '',
        invoiceDate: null,
        gatePassDate: new Date(),
        igmNo: '',
        igmLineNo: '',
        igmTransId: '',
        nocNo: '',
        nocValidityDate: null,
        shift: 'Day',
        transType: '',
        importerName: '',
        importerAddress1: '',
        importerAddress2: '',
        importerAddress3: '',
        cha: '',
        containerNo: '',
        containerSize: '',
        containerType: '',
        boe: '',
        beDate: null,
        cargoValue: 0.000,
        cargoDuty: 0.000,
        blNo: '',
        blDate: null,
        viaNo: '',
        commodity: '',
        grossWt: 0.000,
        noOfPackage: 0,
        qtyTakenOut: 0,
        vehicleQtyTakenOut: 0,
        gwTakenOut: 0.000,
        yardPackages: 0.000,
        cellAreaAllocated: 0.000,
        areaReleased: 0.000,
        transporterStatus: '',
        transporter: '',
        transporterName: '',
        vehicleNo: '',
        driverName: '',
        comments: '',
        remarks: '',
        gateOutId: '',
        gateOutDate: null,
        sl: '',
        destuffLineId: '',
        destuffId: '',
        drt: 'N',
        grnNo: '',
        grnDate: null,
        cinNo: '',
        cinDate: null,
        stampDuty: 0.00,
        splGateOutFlag: 'N',
        dpdFlag: 'N',
        doNo: '',
        doDate: null,
        doValidityDate: null,
        oocNo: '',
        oocDate: null,
        loadingStartDate: null,
        loadingEndDate: null,
        status: '',
        createdBy: '',
        createdDate: null,
        editedBy: '',
        editedDate: null,
        approvedBy: '',
        approvedDate: null,
        yardLocation: '',
        yardBlock: '',
        blockCellNo: '',
        yardLocation1: '',
        yardBlock1: '',
        blockCellNo1: '',
        vehStatus: '',
        gatePassType: '',
        othPartyId: '',
        webCamPath: '',
        scannerType: '',
        iso: '',
        actualSealNo: '',
        mtyYardLocation: 'K00898',
        gateOutQty: 0,
        holdStatus: ''
    })

    const handleGatePassChange = (e) => {
        const { name, value } = e.target;
        let sanitizedValue = value;

        // Sanitize input for specific fields
        if (['stampDuty', 'cargoValue', 'cargoDuty'].includes(name)) {
            sanitizedValue = handleInputChange(value);
        }
        setGatePassData(prevState => ({
            ...prevState,
            [name]: sanitizedValue
        }));

        setItemWiseError(prevState => ({
            ...prevState,
            [name]: ""
        }));
        document.getElementById(name).classList.remove('error-border');
    };

    const [containerData, setContainerData] = useState([{
        companyId: '',
        branchId: '',
        finYear: '',
        gatePassId: '',
        srNo: 0,
        vehicleGatePassId: '',
        conSrNo: 0,
        profitcentreId: '',
        invoiceNo: '',
        invoiceDate: null,
        gatePassDate: new Date(),
        igmNo: '',
        igmLineNo: '',
        igmTransId: '',
        nocNo: '',
        nocValidityDate: null,
        shift: 'Day',
        transType: '',
        importerName: '',
        importerAddress1: '',
        importerAddress2: '',
        importerAddress3: '',
        cha: '',
        containerNo: '',
        containerSize: '',
        containerType: '',
        boe: '',
        beDate: null,
        cargoValue: 0.000,
        cargoDuty: 0.000,
        blNo: '',
        blDate: null,
        viaNo: '',
        commodity: '',
        grossWt: 0.000,
        noOfPackage: 0,
        qtyTakenOut: 0,
        vehicleQtyTakenOut: 0,
        gwTakenOut: 0.000,
        yardPackages: 0.000,
        cellAreaAllocated: 0.000,
        areaReleased: 0.000,
        transporterStatus: '',
        transporter: '',
        transporterName: '',
        vehicleNo: '',
        driverName: '',
        comments: '',
        remarks: '',
        gateOutId: '',
        gateOutDate: null,
        sl: '',
        destuffLineId: '',
        destuffId: '',
        drt: 'N',
        grnNo: '',
        grnDate: null,
        cinNo: '',
        cinDate: null,
        stampDuty: 0.00,
        splGateOutFlag: 'N',
        dpdFlag: 'N',
        doNo: '',
        doDate: null,
        doValidityDate: null,
        oocNo: '',
        oocDate: null,
        loadingStartDate: null,
        loadingEndDate: null,
        status: '',
        createdBy: '',
        createdDate: null,
        editedBy: '',
        editedDate: null,
        approvedBy: '',
        approvedDate: null,
        yardLocation: '',
        yardBlock: '',
        blockCellNo: '',
        yardLocation1: '',
        yardBlock1: '',
        blockCellNo1: '',
        vehStatus: '',
        gatePassType: '',
        othPartyId: '',
        webCamPath: '',
        scannerType: '',
        iso: '',
        actualSealNo: '',
        mtyYardLocation: 'K00898',
        gateOutQty: 0,
        holdStatus: ''
    }])

    const [vehicleStatus, setvehicleStatus] = useState('Y');

    const handleContainerChange = (e, index) => {
        const { name, value } = e.target;
        let sanitizedValue = value;

        // Sanitize input for specific fields
        if (name === 'qtyTakenOut' || name === 'gwTakenOut') {
            sanitizedValue = handleInputChange(value);  // Ensure sanitized input for qtyTakenOut
        }

        setContainerData(prevState => {
            const updatedData = [...prevState];
            const container = updatedData[index];

            if (name === 'qtyTakenOut') {
                const remainingQty = (container.yardPackages - container.gateOutQty) - sanitizedValue;
                console.log('remainingQty ', remainingQty, ' ',);


                // Ensure no value is set if remainingQty is negative
                if (remainingQty >= 0) {
                    updatedData[index] = {
                        ...container,
                        [name]: sanitizedValue,
                        gwTakenOut: parseFloat(((container.grossWt * sanitizedValue) / container.yardPackages).toFixed(3)),  // 3 decimal places
                        areaReleased: parseFloat(((container.cellAreaAllocated * sanitizedValue) / container.yardPackages).toFixed(3)),  // 3 decimal places
                    };
                } else {
                    updatedData[index] = {
                        ...container,
                        [name]: '',           // Clear the value if invalid
                        gwTakenOut: '',        // Clear dependent fields if invalid
                        areaReleased: '',      // Clear dependent fields if invalid
                    };
                }

                if (gatePassData.transType !== 'LCL') {
                    updatedData[index] = {
                        ...container,
                        [name]: sanitizedValue,
                        gwTakenOut: parseFloat(((container.grossWt * sanitizedValue) / container.noOfPackage).toFixed(3))
                    };
                }

            } else {
                updatedData[index] = {
                    ...container,
                    [name]: sanitizedValue
                };
            }

            return updatedData;
        });

        // Handle item error removal
        setItemError(prevErrors => {
            const updatedErrors = [...prevErrors];

            if (updatedErrors[index]) {
                delete updatedErrors[index][name];  // Remove error for the specific field
                if (Object.keys(updatedErrors[index]).length === 0) {
                    updatedErrors.splice(index, 1);  // Remove error object if no errors left
                }
            }

            return updatedErrors;
        });

        // Remove error-border class from the input
        document.getElementById(`${name}${index}`).classList.remove('error-border');
    };



    const [vehicleData, setVehicleData] = useState([]);

    const getVehicleData = (veh) => {

        if (!veh) {
            setVehicleData([]);
            return;
        }

        axios.get(`${ipaddress}importGatePass/getEmptyVehicle?cid=${companyid}&bid=${branchId}&veh=${veh}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const portOptions = data.map(port => ({
                    value: port[1],
                    label: port[0],
                    driver: port[2]
                }))
                setVehicleData(portOptions);
            })
            .catch((error) => {
                setVehicleData([]);
            })
    }

    const getVehicleData1 = (veh) => {

        if (!veh) {
            setVehicleData([]);
            return;
        }

        axios.get(`${ipaddress}importGatePass/getEmptyVehicle1?cid=${companyid}&bid=${branchId}&veh=${veh}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const portOptions = data.map(port => ({
                    value: port[1],
                    label: port[0],

                }))
                setVehicleData(portOptions);
            })
            .catch((error) => {
                setVehicleData([]);
            })
    }

    const handleChangeVeh = async (selectedOption, { action }, index) => {
        if (action === 'clear') {
            setContainerData(prevState => {
                const updatedData = [...prevState];
                updatedData[index] = {
                    ...updatedData[index],
                    vehicleNo: '',
                    vehicleGatePassId: '',
                    driverName: ''
                };
                return updatedData;
            });
            setVehicleData([]);
        }
        else {
            setContainerData(prevState => {
                const updatedData = [...prevState];
                updatedData[index] = {
                    ...updatedData[index],
                    vehicleNo: selectedOption.label || '',
                    vehicleGatePassId: selectedOption.value || '',
                    driverName: selectedOption.driver || ''
                };
                return updatedData;
            });
            setItemError(prevErrors => {
                const updatedErrors = [...prevErrors];

                if (updatedErrors[index]) {
                    delete updatedErrors[index]['vehicleNo'];  // Remove error for the specific field
                    if (Object.keys(updatedErrors[index]).length === 0) {
                        updatedErrors.splice(index, 1);  // Remove error object if no errors left
                    }
                }

                return updatedErrors;
            });

            // Remove error-border class from the input

        }
    }



    const handleChangeSingleVeh = async (selectedOption, { action }) => {
        if (action === 'clear') {
            setGatePassContainerData({
                ...gatePassContainerData,
                vehicleNo: '',
                vehicleGatePassId: '',
                driverName: ''
            })
            setVehicleData([]);
        }
        else {
            setGatePassContainerData({
                ...gatePassContainerData,
                vehicleNo: selectedOption.label || '',
                vehicleGatePassId: selectedOption.value || '',
                driverName: selectedOption.driver || ''
            })
        }
    }


    const handleItemWiseClear = () => {
        setvehicleStatus('Y');
        setOutType('CON');
        setChaName('');
        setContainerData([{
            companyId: '',
            branchId: '',
            finYear: '',
            gatePassId: '',
            srNo: 0,
            vehicleGatePassId: '',
            conSrNo: 0,
            profitcentreId: '',
            invoiceNo: '',
            invoiceDate: null,
            gatePassDate: new Date(),
            igmNo: '',
            igmLineNo: '',
            igmTransId: '',
            nocNo: '',
            nocValidityDate: null,
            shift: 'Day',
            transType: '',
            importerName: '',
            importerAddress1: '',
            importerAddress2: '',
            importerAddress3: '',
            cha: '',
            containerNo: '',
            containerSize: '',
            containerType: '',
            boe: '',
            beDate: null,
            cargoValue: 0.000,
            cargoDuty: 0.000,
            blNo: '',
            blDate: null,
            viaNo: '',
            commodity: '',
            grossWt: 0.000,
            noOfPackage: 0,
            qtyTakenOut: 0,
            vehicleQtyTakenOut: 0,
            gwTakenOut: 0.000,
            yardPackages: 0.000,
            cellAreaAllocated: 0.000,
            areaReleased: 0.000,
            transporterStatus: '',
            transporter: '',
            transporterName: '',
            vehicleNo: '',
            driverName: '',
            comments: '',
            remarks: '',
            gateOutId: '',
            gateOutDate: null,
            sl: '',
            destuffLineId: '',
            destuffId: '',
            drt: 'N',
            grnNo: '',
            grnDate: null,
            cinNo: '',
            cinDate: null,
            stampDuty: 0.00,
            splGateOutFlag: 'N',
            dpdFlag: 'N',
            doNo: '',
            doDate: null,
            doValidityDate: null,
            oocNo: '',
            oocDate: null,
            loadingStartDate: null,
            loadingEndDate: null,
            status: '',
            createdBy: '',
            createdDate: null,
            editedBy: '',
            editedDate: null,
            approvedBy: '',
            approvedDate: null,
            yardLocation: '',
            yardBlock: '',
            blockCellNo: '',
            yardLocation1: '',
            yardBlock1: '',
            blockCellNo1: '',
            vehStatus: '',
            gatePassType: '',
            othPartyId: '',
            webCamPath: '',
            scannerType: '',
            iso: '',
            actualSealNo: '',
            mtyYardLocation: 'K00898',
            gateOutQty: 0,
            holdStatus: ''
        }])
        setGatePassData({
            companyId: '',
            branchId: '',
            finYear: '',
            gatePassId: '',
            srNo: 0,
            vehicleGatePassId: '',
            conSrNo: 0,
            profitcentreId: '',
            invoiceNo: '',
            invoiceDate: null,
            gatePassDate: new Date(),
            igmNo: '',
            igmLineNo: '',
            igmTransId: '',
            nocNo: '',
            nocValidityDate: null,
            shift: 'Day',
            transType: '',
            importerName: '',
            importerAddress1: '',
            importerAddress2: '',
            importerAddress3: '',
            cha: '',
            containerNo: '',
            containerSize: '',
            containerType: '',
            boe: '',
            beDate: null,
            cargoValue: 0.000,
            cargoDuty: 0.000,
            blNo: '',
            blDate: null,
            viaNo: '',
            commodity: '',
            grossWt: 0.000,
            noOfPackage: 0,
            qtyTakenOut: 0,
            vehicleQtyTakenOut: 0,
            gwTakenOut: 0.000,
            yardPackages: 0.000,
            cellAreaAllocated: 0.000,
            areaReleased: 0.000,
            transporterStatus: '',
            transporter: '',
            transporterName: '',
            vehicleNo: '',
            driverName: '',
            comments: '',
            remarks: '',
            gateOutId: '',
            gateOutDate: null,
            sl: '',
            destuffLineId: '',
            destuffId: '',
            drt: 'N',
            grnNo: '',
            grnDate: null,
            cinNo: '',
            cinDate: null,
            stampDuty: 0.00,
            splGateOutFlag: 'N',
            dpdFlag: 'N',
            doNo: '',
            doDate: null,
            doValidityDate: null,
            oocNo: '',
            oocDate: null,
            loadingStartDate: null,
            loadingEndDate: null,
            status: '',
            createdBy: '',
            createdDate: null,
            editedBy: '',
            editedDate: null,
            approvedBy: '',
            approvedDate: null,
            yardLocation: '',
            yardBlock: '',
            blockCellNo: '',
            yardLocation1: '',
            yardBlock1: '',
            blockCellNo1: '',
            vehStatus: '',
            gatePassType: '',
            othPartyId: '',
            webCamPath: '',
            scannerType: '',
            iso: '',
            actualSealNo: '',
            mtyYardLocation: 'K00898',
            gateOutQty: 0,
            holdStatus: ''
        })
        setItemIgm('');
        setItemLine('');
        setItemWiseError({
            shift: "",
            stampDuty: "",
            oocNo: "",
            oocDate: "",
            doDate: "",
            doValidityDate: "",
            cha: "",
            boe: "",
            beDate: "",
            cargoValue: "",
            cargoDuty: "",
        })
        setItemError([]);
        document.getElementById('shift').classList.remove('error-border');
        document.getElementById('stampDuty').classList.remove('error-border');
        document.getElementById('oocNo').classList.remove('error-border');
        document.getElementById('oocDate').classList.remove('error-border');
        document.getElementById('doDate').classList.remove('error-border');
        document.getElementById('doValidityDate').classList.remove('error-border');
    }


    const handleItemWiseSearchClear = () => {
        setvehicleStatus('Y');
        setChaName('');
        setContainerData([{
            companyId: '',
            branchId: '',
            finYear: '',
            gatePassId: '',
            srNo: 0,
            vehicleGatePassId: '',
            conSrNo: 0,
            profitcentreId: '',
            invoiceNo: '',
            invoiceDate: null,
            gatePassDate: new Date(),
            igmNo: '',
            igmLineNo: '',
            igmTransId: '',
            nocNo: '',
            nocValidityDate: null,
            shift: 'Day',
            transType: '',
            importerName: '',
            importerAddress1: '',
            importerAddress2: '',
            importerAddress3: '',
            cha: '',
            containerNo: '',
            containerSize: '',
            containerType: '',
            boe: '',
            beDate: null,
            cargoValue: 0.000,
            cargoDuty: 0.000,
            blNo: '',
            blDate: null,
            viaNo: '',
            commodity: '',
            grossWt: 0.000,
            noOfPackage: 0,
            qtyTakenOut: 0,
            vehicleQtyTakenOut: 0,
            gwTakenOut: 0.000,
            yardPackages: 0.000,
            cellAreaAllocated: 0.000,
            areaReleased: 0.000,
            transporterStatus: '',
            transporter: '',
            transporterName: '',
            vehicleNo: '',
            driverName: '',
            comments: '',
            remarks: '',
            gateOutId: '',
            gateOutDate: null,
            sl: '',
            destuffLineId: '',
            destuffId: '',
            drt: 'N',
            grnNo: '',
            grnDate: null,
            cinNo: '',
            cinDate: null,
            stampDuty: 0.00,
            splGateOutFlag: 'N',
            dpdFlag: 'N',
            doNo: '',
            doDate: null,
            doValidityDate: null,
            oocNo: '',
            oocDate: null,
            loadingStartDate: null,
            loadingEndDate: null,
            status: '',
            createdBy: '',
            createdDate: null,
            editedBy: '',
            editedDate: null,
            approvedBy: '',
            approvedDate: null,
            yardLocation: '',
            yardBlock: '',
            blockCellNo: '',
            yardLocation1: '',
            yardBlock1: '',
            blockCellNo1: '',
            vehStatus: '',
            gatePassType: '',
            othPartyId: '',
            webCamPath: '',
            scannerType: '',
            iso: '',
            actualSealNo: '',
            mtyYardLocation: 'K00898',
            gateOutQty: 0,
            holdStatus: ''
        }])
        setGatePassData({
            companyId: '',
            branchId: '',
            finYear: '',
            gatePassId: '',
            srNo: 0,
            vehicleGatePassId: '',
            conSrNo: 0,
            profitcentreId: '',
            invoiceNo: '',
            invoiceDate: null,
            gatePassDate: new Date(),
            igmNo: '',
            igmLineNo: '',
            igmTransId: '',
            nocNo: '',
            nocValidityDate: null,
            shift: 'Day',
            transType: '',
            importerName: '',
            importerAddress1: '',
            importerAddress2: '',
            importerAddress3: '',
            cha: '',
            containerNo: '',
            containerSize: '',
            containerType: '',
            boe: '',
            beDate: null,
            cargoValue: 0.000,
            cargoDuty: 0.000,
            blNo: '',
            blDate: null,
            viaNo: '',
            commodity: '',
            grossWt: 0.000,
            noOfPackage: 0,
            qtyTakenOut: 0,
            vehicleQtyTakenOut: 0,
            gwTakenOut: 0.000,
            yardPackages: 0.000,
            cellAreaAllocated: 0.000,
            areaReleased: 0.000,
            transporterStatus: '',
            transporter: '',
            transporterName: '',
            vehicleNo: '',
            driverName: '',
            comments: '',
            remarks: '',
            gateOutId: '',
            gateOutDate: null,
            sl: '',
            destuffLineId: '',
            destuffId: '',
            drt: 'N',
            grnNo: '',
            grnDate: null,
            cinNo: '',
            cinDate: null,
            stampDuty: 0.00,
            splGateOutFlag: 'N',
            dpdFlag: 'N',
            doNo: '',
            doDate: null,
            doValidityDate: null,
            oocNo: '',
            oocDate: null,
            loadingStartDate: null,
            loadingEndDate: null,
            status: '',
            createdBy: '',
            createdDate: null,
            editedBy: '',
            editedDate: null,
            approvedBy: '',
            approvedDate: null,
            yardLocation: '',
            yardBlock: '',
            blockCellNo: '',
            yardLocation1: '',
            yardBlock1: '',
            blockCellNo1: '',
            vehStatus: '',
            gatePassType: '',
            othPartyId: '',
            webCamPath: '',
            scannerType: '',
            iso: '',
            actualSealNo: '',
            mtyYardLocation: 'K00898',
            gateOutQty: 0,
            holdStatus: ''
        })
        setItemWiseError({
            shift: "",
            stampDuty: "",
            oocNo: "",
            oocDate: "",
            doDate: "",
            doValidityDate: "",
            cha: "",
            boe: "",
            beDate: "",
            cargoValue: "",
            cargoDuty: "",
        })
        setItemError([]);
        document.getElementById('shift').classList.remove('error-border');
        document.getElementById('stampDuty').classList.remove('error-border');
        document.getElementById('oocNo').classList.remove('error-border');
        document.getElementById('oocDate').classList.remove('error-border');
        document.getElementById('doDate').classList.remove('error-border');
        document.getElementById('doValidityDate').classList.remove('error-border');
    }



    const searchItemWiseData = (igm, item) => {
        setLoading(true);
        if (!igm) {
            toast.error("IGM No is required", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }

        if (!item) {
            toast.error("Item No is required", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }

        axios.get(`${ipaddress}importGatePass/getItemWiseData?cid=${companyid}&bid=${branchId}&igm=${igm}&item=${item}&type=${outType}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data.container;
                const crg = response.data.crg;
                const singleData = response.data.container[0];


                if (response.data.containerStatus === 'FCL') {
                    setGatePassData({
                        companyId: '',
                        branchId: '',
                        finYear: new Date().getFullYear,
                        gatePassId: '',
                        srNo: 0,
                        vehicleGatePassId: '',
                        conSrNo: 0,
                        profitcentreId: '',
                        invoiceNo: '',
                        invoiceDate: null,
                        gatePassDate: new Date(),
                        igmNo: singleData.igmNo || '',
                        igmLineNo: singleData.igmLineNo || '',
                        igmTransId: singleData.igmTransId || '',
                        nocNo: '',
                        nocValidityDate: null,
                        shift: singleData.shift || 'Day',
                        transType: singleData.containerStatus === 'LCL' ? singleData.containerStatus : singleData.gateOutType === 'CRG' ? 'FCL' : 'CONT' || '',
                        importerName: singleData.importerName || '',
                        importerAddress1: singleData.importerAddress1 || '',
                        importerAddress2: singleData.importerAddress2 || '',
                        importerAddress3: singleData.importerAddress3 || '',
                        cha: crg.chaCode || '',
                        containerNo: '',
                        containerSize: '',
                        containerType: '',
                        boe: '',
                        beDate: null,
                        cargoValue: 0.000,
                        cargoDuty: 0.000,
                        blNo: '',
                        blDate: null,
                        viaNo: '',
                        commodity: '',
                        grossWt: 0.000,
                        noOfPackage: 0,
                        qtyTakenOut: 0,
                        vehicleQtyTakenOut: 0,
                        gwTakenOut: 0.000,
                        yardPackages: 0.000,
                        cellAreaAllocated: 0.000,
                        areaReleased: 0.000,
                        transporterStatus: '',
                        transporter: '',
                        transporterName: '',
                        vehicleNo: '',
                        driverName: '',
                        comments: '',
                        remarks: '',
                        gateOutId: '',
                        gateOutDate: null,
                        sl: '',
                        destuffLineId: '',
                        destuffId: '',
                        drt: 'N',
                        grnNo: '',
                        grnDate: null,
                        cinNo: '',
                        cinDate: null,
                        stampDuty: 0.00,
                        splGateOutFlag: 'N',
                        dpdFlag: 'N',
                        doNo: singleData.doNo || '',
                        doDate: singleData.doDate || null,
                        doValidityDate: singleData.doValidityDate || null,
                        oocNo: singleData.oocNo || '',
                        oocDate: singleData.oocDate || null,
                        loadingStartDate: null,
                        loadingEndDate: null,
                        status: '',
                        createdBy: '',
                        createdDate: null,
                        editedBy: '',
                        editedDate: null,
                        approvedBy: '',
                        approvedDate: null,
                        yardLocation: '',
                        yardBlock: '',
                        blockCellNo: '',
                        yardLocation1: '',
                        yardBlock1: '',
                        blockCellNo1: '',
                        vehStatus: '',
                        gatePassType: '',
                        othPartyId: '',
                        webCamPath: '',
                        scannerType: '',
                        iso: '',
                        actualSealNo: '',
                        mtyYardLocation: 'K00898',
                        gateOutQty: 0,
                        holdStatus: '',

                    })

                    const trans = singleData.containerStatus === 'LCL' ? singleData.containerStatus : singleData.gateOutType || '';
                    setContainerData(data.map(item => ({
                        companyId: '',
                        branchId: '',
                        finYear: new Date().getFullYear(),
                        gatePassId: '',
                        srNo: 0,
                        vehicleGatePassId: '',
                        conSrNo: 0,
                        profitcentreId: item.profitcentreId || '',
                        invoiceNo: '',
                        invoiceDate: null,
                        gatePassDate: new Date(),
                        igmNo: item.igmNo || '',
                        igmLineNo: item.igmLineNo || '',
                        igmTransId: item.igmTransId || '',
                        nocNo: '',
                        nocValidityDate: null,
                        shift: item.shift || 'Day',
                        transType: singleData.containerStatus === 'LCL' ? singleData.containerStatus : singleData.gateOutType === 'CRG' ? 'FCL' : 'CONT' || '',
                        importerName: crg.importerName || '',
                        importerAddress1: crg.importerAddress1 || '',
                        importerAddress2: crg.importerAddress2 || '',
                        importerAddress3: crg.importerAddress3 || '',
                        cha: crg.chaName || '',
                        containerNo: item.containerNo || '',
                        containerSize: item.containerSize || '',
                        containerType: item.containerType || '',
                        boe: crg.beNo || '',
                        beDate: crg.beDate || null,
                        cargoValue: crg.cargoValue || 0.000,
                        cargoDuty: crg.cargoDuty || 0.000,
                        blNo: crg.blNo || '',
                        blDate: crg.blDate || null,
                        viaNo: crg.viaNo || '',
                        commodity: crg.commodityDescription || '',
                        grossWt: item.grossWt || 0.000,
                        noOfPackage: trans !== 'CON' ? item.actualNoOfPackages || 0 : item.noOfPackages || 0,
                        qtyTakenOut: trans !== 'CON' ? (item.actualNoOfPackages - item.oldActualNoOfPackages) || 0 : item.noOfPackages || 0,
                        vehicleQtyTakenOut: trans !== 'CON' ? item.actualNoOfPackages || 0 : item.noOfPackages || 0,
                        gwTakenOut: trans !== 'CON' ? parseFloat(((item.grossWt * (item.actualNoOfPackages - item.oldActualNoOfPackages)) / item.actualNoOfPackages).toFixed(3)) || 0.000 : item.grossWt,
                        yardPackages: 0.000,
                        cellAreaAllocated: 0.000,
                        areaReleased: 0.000,
                        transporterStatus: '',
                        transporter: '',
                        transporterName: '',
                        vehicleNo: '',
                        driverName: '',
                        comments: '',
                        remarks: '',
                        gateOutId: item.gateOutId || '',
                        gateOutDate: item.gateOutDate || null,
                        sl: '',
                        destuffLineId: '',
                        destuffId: item.destuffId || '',
                        drt: item.drt || 'N',
                        grnNo: '',
                        grnDate: null,
                        cinNo: '',
                        cinDate: null,
                        stampDuty: 0.00,
                        splGateOutFlag: 'N',
                        dpdFlag: 'N',
                        doNo: singleData.doNo || '',
                        doDate: singleData.doDate || null,
                        doValidityDate: singleData.doValidityDate || null,
                        oocNo: singleData.oocNo || '',
                        oocDate: singleData.oocDate || null,
                        loadingStartDate: null,
                        loadingEndDate: null,
                        status: '',
                        createdBy: '',
                        createdDate: null,
                        editedBy: '',
                        editedDate: null,
                        approvedBy: '',
                        approvedDate: null,
                        yardLocation: item.yardLocation || '',
                        yardBlock: item.yardBlock || '',
                        blockCellNo: item.blockCellNo || '',
                        yardLocation1: item.yardLocation1 || '',
                        yardBlock1: item.yardBlock1 || '',
                        blockCellNo1: item.blockCellNo1 || '',
                        vehStatus: '',
                        gatePassType: 'ITEM',
                        othPartyId: '',
                        webCamPath: '',
                        scannerType: '',
                        iso: item.iso || '',
                        actualSealNo: item.actualSealNo || '',
                        mtyYardLocation: 'K00898',
                        gateOutQty: trans !== 'CON' ? item.oldActualNoOfPackages || 0 : item.noOfPackages || 0,
                        holdStatus: item.holdStatus || ''
                    })))
                }
                else {
                    const destuffData = response.data.crgData;
                    setvehicleStatus('Y');
                    setGatePassData({
                        companyId: '',
                        branchId: '',
                        finYear: new Date().getFullYear,
                        gatePassId: '',
                        srNo: 0,
                        vehicleGatePassId: '',
                        conSrNo: 0,
                        profitcentreId: '',
                        invoiceNo: '',
                        invoiceDate: null,
                        gatePassDate: new Date(),
                        igmNo: crg.igmNo || '',
                        igmLineNo: crg.igmLineNo || '',
                        igmTransId: crg.igmTransId || '',
                        nocNo: '',
                        nocValidityDate: null,
                        shift: 'Day',
                        transType: 'LCL' || '',
                        importerName: crg.importerName || '',
                        importerAddress1: crg.importerAddress1 || '',
                        importerAddress2: crg.importerAddress2 || '',
                        importerAddress3: crg.importerAddress3 || '',
                        cha: crg.chaCode || '',
                        containerNo: '',
                        containerSize: '',
                        containerType: '',
                        boe: '',
                        beDate: null,
                        cargoValue: 0.000,
                        cargoDuty: 0.000,
                        blNo: crg.blNo || '',
                        blDate: new Date(crg.blDate) || null,
                        viaNo: crg.viaNo || '',
                        commodity: crg.commodityDescription || '',
                        grossWt: crg.actualGrossWeight || 0.000,
                        noOfPackage: crg.noOfPackage || 0,
                        qtyTakenOut: crg.noOfPackage || 0,
                        vehicleQtyTakenOut: 0,
                        gwTakenOut: crg.actualGrossWeight || 0.000,
                        yardPackages: 0.000,
                        cellAreaAllocated: 0.000,
                        areaReleased: 0.000,
                        transporterStatus: '',
                        transporter: '',
                        transporterName: '',
                        vehicleNo: '',
                        driverName: '',
                        comments: '',
                        remarks: '',
                        gateOutId: '',
                        gateOutDate: null,
                        sl: '',
                        destuffLineId: '',
                        destuffId: '',
                        drt: 'N',
                        grnNo: '',
                        grnDate: null,
                        cinNo: '',
                        cinDate: null,
                        stampDuty: 0.00,
                        splGateOutFlag: 'N',
                        dpdFlag: 'N',
                        doNo: singleData.doNo || '',
                        doDate: singleData.doDate || null,
                        doValidityDate: singleData.doValidityDate || null,
                        oocNo: singleData.oocNo || '',
                        oocDate: singleData.oocDate || null,
                        loadingStartDate: null,
                        loadingEndDate: null,
                        status: '',
                        createdBy: '',
                        createdDate: null,
                        editedBy: '',
                        editedDate: null,
                        approvedBy: '',
                        approvedDate: null,
                        yardLocation: '',
                        yardBlock: '',
                        blockCellNo: '',
                        yardLocation1: '',
                        yardBlock1: '',
                        blockCellNo1: '',
                        vehStatus: '',
                        gatePassType: '',
                        othPartyId: '',
                        webCamPath: '',
                        scannerType: '',
                        iso: '',
                        actualSealNo: '',
                        mtyYardLocation: 'K00898',
                        gateOutQty: 0,
                        holdStatus: ''
                    })

                    setContainerData(destuffData.map((item)=>({
                        companyId: '',
                        branchId: '',
                        finYear: new Date().getFullYear(),
                        gatePassId: '',
                        srNo: 0,
                        vehicleGatePassId: '',
                        conSrNo: 0,
                        profitcentreId: item.profitcentreId || '',
                        invoiceNo: '',
                        invoiceDate: null,
                        gatePassDate: new Date(),
                        igmNo: crg.igmNo || '',
                        igmLineNo: crg.igmLineNo || '',
                        igmTransId: crg.igmTransId || '',
                        nocNo: '',
                        nocValidityDate: null,
                        shift: 'Day',
                        transType: 'LCL' || '',
                        importerName: crg.importerName || '',
                        importerAddress1: crg.importerAddress1 || '',
                        importerAddress2: crg.importerAddress2 || '',
                        importerAddress3: crg.importerAddress3 || '',
                        cha: '',
                        containerNo: '',
                        containerSize: '',
                        containerType: '',
                        boe: crg.beNo || '',
                        beDate: crg.beDate || null,
                        cargoValue: crg.cargoValue || 0.000,
                        cargoDuty: crg.cargoDuty || 0.000,
                        blNo: crg.blNo || '',
                        blDate: crg.blDate || null,
                        viaNo: crg.viaNo || '',
                        commodity: crg.commodityDescription || '',
                        grossWt: crg.actualGrossWeight || 0.000,
                        noOfPackage: crg.noOfPackages || 0,
                        qtyTakenOut: 0,
                        vehicleQtyTakenOut: 0,
                        gwTakenOut: 0.000,
                        yardPackages: item.yardPackages || 0.000,
                        cellAreaAllocated: item.areaOccupied || 0.000,
                        areaReleased: 0.000,
                        transporterStatus: '',
                        transporter: '',
                        transporterName: '',
                        vehicleNo: '',
                        driverName: '',
                        comments: '',
                        remarks: '',
                        gateOutId: item.gateOutId || '',
                        gateOutDate: item.gateOutDate || null,
                        sl: '',
                        destuffLineId: item.deStuffLineId || '',
                        destuffId: item.deStuffId || '',
                        drt: 'N',
                        grnNo: '',
                        grnDate: null,
                        cinNo: '',
                        cinDate: null,
                        stampDuty: 0.00,
                        splGateOutFlag: 'N',
                        dpdFlag: 'N',
                        doNo: singleData.doNo || '',
                        doDate: singleData.doDate || null,
                        doValidityDate: singleData.doValidityDate || null,
                        oocNo: singleData.oocNo || '',
                        oocDate: singleData.oocDate || null,
                        loadingStartDate: null,
                        loadingEndDate: null,
                        status: '',
                        createdBy: '',
                        createdDate: null,
                        editedBy: '',
                        editedDate: null,
                        approvedBy: '',
                        approvedDate: null,
                        yardLocation: item.yardLocation || '',
                        yardBlock: item.yardBlock || '',
                        blockCellNo: item.blockCellNo || '',
                        yardLocation1: item.yardLocation1 || '',
                        yardBlock1: item.yardBlock1 || '',
                        blockCellNo1: item.blockCellNo1 || '',
                        vehStatus: '',
                        gatePassType: 'ITEM',
                        othPartyId: '',
                        webCamPath: '',
                        scannerType: '',
                        iso: '',
                        actualSealNo: '',
                        mtyYardLocation: 'K00898',
                        gateOutQty: item.qtyTakenOut || 0,
                        holdStatus: ''
                    })))
                }



                toast.success("Data found successfully!!", {
                    autoClose: 800
                })

                setLoading(false);


            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                handleItemWiseSearchClear();
                setLoading(false);
            })
    }

    const [itemWiseError, setItemWiseError] = useState({
        shift: "",
        stampDuty: "",
        oocNo: "",
        oocDate: "",
        doDate: "",
        doValidityDate: "",
        cha: "",
        boe: "",
        beDate: "",
        cargoValue: "",
        cargoDuty: "",
    })

    const [itemError, setItemError] = useState([])

    const saveItemWise = () => {
        setLoading(true);

        let errors = {};

        if (!gatePassData.shift) {
            errors.shift = "Shift is required."
            document.getElementById("shift").classList.add('error-border')
        }
        if (!gatePassData.stampDuty || gatePassData.stampDuty <= 0) {
            errors.stampDuty = "Stamp Duty is required."
            document.getElementById("stampDuty").classList.add('error-border')
        }
        if (!gatePassData.oocNo) {
            errors.oocNo = "OOC No is required."
            document.getElementById("oocNo").classList.add('error-border')
        }
        if (!gatePassData.oocDate) {
            errors.oocDate = "OOC Date is required."
            document.getElementById("oocDate").classList.add('error-border')
        }
        if (!gatePassData.doDate) {
            errors.doDate = "DO Date is required."
            document.getElementById("doDate").classList.add('error-border')
        }
        if (!gatePassData.doValidityDate) {
            errors.doValidityDate = "DO Validity Date is required."
            document.getElementById("doValidityDate").classList.add('error-border')
        }

        if (Object.keys(errors).length > 0) {
            setLoading(false);
            setItemWiseError(errors);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            })
            return;
        }


        // containerData.forEach((data, index) => {
        //     let rowErrors = {};
        //     if (!data.vehicleNo && vehicleStatus === 'Y') rowErrors.vehicleNo = "Vehicle no is required.";
        //     if (!data.driverName && vehicleStatus === 'Y') rowErrors.driverName = "Driver name is required.";


        //     if (Object.keys(rowErrors).length > 0) {
        //         newErrors[index] = rowErrors;
        //     }
        // });

        // // Check if any errors exist
        // const hasErrors = newErrors.some(errorObj => Object.keys(errorObj).length > 0);

        // if (hasErrors) {
        //     console.log('newErrors ', newErrors);
        //     setItemError(newErrors);
        //     setLoading(false);
        //     toast.error("Please fill in the required fields.", {
        //         autoClose: 1000
        //     });
        //     console.log('errors ', errors);
        //     return;
        // }

        if (vehicleStatus === 'Y') {
            const isVeh = containerData.every(item => item.vehicleNo === '');


            if (isVeh) {
                toast.error("Please enter vehicle no.", {
                    autoClose: 800
                })
                setLoading(false);
                return;
            }
        }


        if (!gatePassData.igmNo) {
            toast.error("IGM Data not found", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }

        const nonHoldData = containerData.filter(item => item.holdStatus !== 'H');

        if (nonHoldData.length === 0) {
            toast.error("All containers is currently on hold.", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }


        let newErrors = nonHoldData.map(() => ({}));
        setItemError([]);


        nonHoldData.forEach((data, index) => {
            let rowErrors = {};
            if (!data.qtyTakenOut || data.qtyTakenOut <= 0) rowErrors.qtyTakenOut = "Qty taken out is required.";
            if (!data.gwTakenOut || data.gwTakenOut <= 0) rowErrors.gwTakenOut = "Gross wt is required.";


            if (Object.keys(rowErrors).length > 0) {
                newErrors[index] = rowErrors;
            }
        });

        // Check if any errors exist
        const hasErrors = newErrors.some(errorObj => Object.keys(errorObj).length > 0);

        if (hasErrors) {
            setItemError(newErrors);
            setLoading(false);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            });
            console.log('errors ', errors);
            return;
        }

        const formData = {
            crg: gatePassData,
            container: nonHoldData
        }

        axios.post(`${ipaddress}importGatePass/saveItemwiseData?cid=${companyid}&bid=${branchId}&user=${userId}&vehicleStatus=${vehicleStatus}`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const singleData = response.data[0];

                setItemIgm(singleData.igmNo);
                setItemLine(singleData.igmLineNo);
                setvehicleStatus(singleData.vehStatus);
                setContainerData(data);
                setGatePassData(singleData);

                toast.success('Data save successfully!!', {
                    autoClose: 800
                })
                onRequest();

                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })

    }

    const [selectedData, setSelectedData] = useState([]);
    const [selectAllChecked, setSelectAllChecked] = useState(false);

    // Handler for individual checkbox
    const handleCheckboxChange = (item) => {
        const isChecked = selectedData.some(selectedItem => selectedItem.containerNo === item.containerNo);

        if (isChecked) {
            // Remove item from selectedData
            const updatedSelection = selectedData.filter(selectedItem => selectedItem.containerNo !== item.containerNo);
            setSelectedData(updatedSelection);

            // Uncheck the header checkbox if not all individual checkboxes are checked
            if (updatedSelection.length !== containerData.length) {
                setSelectAllChecked(false);
            }
        } else {
            // Add item to selectedData
            const updatedSelection = [...selectedData, item];
            setSelectedData(updatedSelection);

            // Check the header checkbox if all individual checkboxes are checked
            if (updatedSelection.length === containerData.length) {
                setSelectAllChecked(true);
            }
        }
    };

    // Header checkbox handler
    const handleSelectAll = () => {
        if (selectAllChecked) {
            // Unselect all
            setSelectedData([]);
        } else {
            // Select all data whose holdStatus is not 'H'
            const nonHoldData = containerData.filter(item => item.holdStatus !== 'H');
            setSelectedData(nonHoldData);
        }
        setSelectAllChecked(!selectAllChecked);
    };


    // Effect to check if all rows are selected
    useEffect(() => {
        if (activeTab === 'P00208') {
            if (selectedData.length === containerData.length && containerData.length > 0) {
                setSelectAllChecked(true);
            } else {
                setSelectAllChecked(false);
            }
        }
    }, [selectedData, containerData]);


    const saveItemWiseDestuff = () => {
        setLoading(true);

        let errors = {};

        if (!gatePassData.shift) {
            errors.shift = "Shift is required."
            document.getElementById("shift").classList.add('error-border')
        }
        if (!gatePassData.stampDuty || gatePassData.stampDuty <= 0) {
            errors.stampDuty = "Stamp Duty is required."
            document.getElementById("stampDuty").classList.add('error-border')
        }
        if (!gatePassData.oocNo) {
            errors.oocNo = "OOC No is required."
            document.getElementById("oocNo").classList.add('error-border')
        }
        if (!gatePassData.oocDate) {
            errors.oocDate = "OOC Date is required."
            document.getElementById("oocDate").classList.add('error-border')
        }
        if (!gatePassData.doDate) {
            errors.doDate = "DO Date is required."
            document.getElementById("doDate").classList.add('error-border')
        }
        if (!gatePassData.doValidityDate) {
            errors.doValidityDate = "DO Validity Date is required."
            document.getElementById("doValidityDate").classList.add('error-border')
        }

        if (Object.keys(errors).length > 0) {
            setLoading(false);
            setItemWiseError(errors);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            })
            return;
        }

        const updatedSelectedData = selectedData.map((selectedItem) => {
            const matchingItem = containerData.find(
                (tallyItem) => tallyItem.containerNo === selectedItem.containerNo
            );
            return matchingItem ? { ...matchingItem } : { ...selectedItem };
        });

        const conData = gatePassData.gatePassId === '' ? updatedSelectedData : containerData;

        let newErrors = conData.map(() => ({}));
        setItemError([]);

        conData.forEach((data, index) => {
            let rowErrors = {};
            if (!data.qtyTakenOut || data.qtyTakenOut <= 0) rowErrors.qtyTakenOut = "Qty taken out is required.";
            if (!data.gwTakenOut || data.gwTakenOut <= 0) rowErrors.gwTakenOut = "Gw taken out is required.";


            if (Object.keys(rowErrors).length > 0) {
                newErrors[index] = rowErrors;
            }
        });

        // Check if any errors exist
        const hasErrors = newErrors.some(errorObj => Object.keys(errorObj).length > 0);

        if (hasErrors) {
            console.log('newErrors ', newErrors);
            setItemError(newErrors);
            setLoading(false);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            });
            console.log('errors ', errors);
            return;
        }

        // const isVeh = containerData.every(item => item.vehicleNo === '');


        // if (isVeh) {
        //     toast.error("Please enter vehicle no.", {
        //         autoClose: 800
        //     })
        //     setLoading(false);
        //     return;
        // }

        if (!gatePassData.igmNo) {
            toast.error("IGM Data not found", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }

        if (gatePassData.gatePassId === '') {
            if (selectedData.length === 0) {
                toast.error("Please select at least one container", {
                    autoClose: 800
                })
                setLoading(false);
                return;
            }
        }

        const formData = {
            crg: gatePassData,
            container: gatePassData.gatePassId === '' ? selectedData : containerData
        }

        axios.post(`${ipaddress}importGatePass/saveItemwiseCRGData?cid=${companyid}&bid=${branchId}&user=${userId}&vehicleStatus=${vehicleStatus}`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const singleData = response.data[0];

                setItemIgm(singleData.igmNo);
                setItemLine(singleData.igmLineNo);
                setvehicleStatus(singleData.vehStatus);
                setContainerData(data);
                setGatePassData(singleData);

                toast.success('Data save successfully!!', {
                    autoClose: 800
                })
                onRequest();

                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })

    }



    const saveLCLItemWise = () => {
        setLoading(true);

        let errors = {};

        if (!gatePassData.shift) {
            errors.shift = "Shift is required."
            document.getElementById("shift").classList.add('error-border')
        }
        if (!gatePassData.stampDuty || gatePassData.stampDuty <= 0) {
            errors.stampDuty = "Stamp Duty is required."
            document.getElementById("stampDuty").classList.add('error-border')
        }
        if (!gatePassData.oocNo) {
            errors.oocNo = "OOC No is required."
            document.getElementById("oocNo").classList.add('error-border')
        }
        if (!gatePassData.oocDate) {
            errors.oocDate = "OOC Date is required."
            document.getElementById("oocDate").classList.add('error-border')
        }
        if (!gatePassData.doDate) {
            errors.doDate = "DO Date is required."
            document.getElementById("doDate").classList.add('error-border')
        }
        if (!gatePassData.doValidityDate) {
            errors.doValidityDate = "DO Validity Date is required."
            document.getElementById("doValidityDate").classList.add('error-border')
        }
        if (!gatePassData.cha) {
            errors.cha = "Cha is required."
            document.getElementById("cha").classList.add('error-border')
        }
        if (!gatePassData.boe) {
            errors.boe = "BE No is required."
            document.getElementById("boe").classList.add('error-border')
        }
        if (!gatePassData.beDate) {
            errors.beDate = "BE Date is required."
            document.getElementById("beDate").classList.add('error-border')
        }
        if (!gatePassData.cargoValue) {
            errors.cargoValue = "Cargo Value is required."
            document.getElementById("cargoValue").classList.add('error-border')
        }
        if (!gatePassData.cargoDuty) {
            errors.cargoDuty = "Cargo Duty is required."
            document.getElementById("cargoDuty").classList.add('error-border')
        }

        if (Object.keys(errors).length > 0) {
            setLoading(false);
            setItemWiseError(errors);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            })
            return;
        }

        let newErrors = containerData.map(() => ({}));
        setItemError([]);

        containerData.forEach((data, index) => {
            let rowErrors = {};
            //  if (!data.vehicleNo && vehicleStatus === 'Y') rowErrors.vehicleNo = "Vehicle no is required.";
            // if (!data.driverName && vehicleStatus === 'Y') rowErrors.driverName = "Driver name is required.";
            if (!data.qtyTakenOut) rowErrors.qtyTakenOut = "Qty taken out is required.";
            if (!data.gwTakenOut) rowErrors.gwTakenOut = "GW tken out is required.";
            if (Object.keys(rowErrors).length > 0) {
                newErrors[index] = rowErrors;
            }
        });

        // Check if any errors exist
        const hasErrors = newErrors.some(errorObj => Object.keys(errorObj).length > 0);

        if (hasErrors) {
            console.log('newErrors ', newErrors);
            setItemError(newErrors);
            setLoading(false);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            });
            console.log('errors ', errors);
            return;
        }

        if (!gatePassData.igmNo) {
            toast.error("IGM Data not found", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }

        const formData = {
            crg: gatePassData,
            container: containerData
        }

        axios.post(`${ipaddress}importGatePass/saveLCLGatePass?cid=${companyid}&bid=${branchId}&user=${userId}&vehicleStatus=${vehicleStatus}`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data.gatepass;
                console.log('gate pass data ', data);

                const singleData = data[0];
                setChaName(response.data.cha);

                setItemIgm(singleData.igmNo);
                setItemLine(singleData.igmLineNo);
                setvehicleStatus(singleData.vehStatus);
                // setContainerData(data);
                setGatePassData(singleData);

                setContainerData(data);

                toast.success('Data save successfully!!', {
                    autoClose: 800
                })

                onRequest();
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })

    }

    const [isModalForOpenItemwiseSearch, setisModalForOpenItemwiseSearch] = useState(false);

    const [searchVal, setSearchVal] = useState('');
    const [itemSearchData, setitemSearchData] = useState([]);

    const openItemwiseSearchModal = () => {
        setisModalForOpenItemwiseSearch(true);
        searchByItemWise('');
    }

    const closeItemwiseSearchModal = () => {
        setisModalForOpenItemwiseSearch(false);
        setitemSearchData([]);
        setSearchVal('');
    }



    const searchByItemWise = (val) => {
        setLoading(true);
        axios.get(`${ipaddress}importGatePass/searchByItemwise?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {

                setitemSearchData(response.data);
                toast.success("Data found successfully!!!", {
                    autoClose: 800
                })
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setitemSearchData([]);
                setLoading(false);
            })
    }

    const clearItemWise = () => {
        setSearchVal('');
        searchByItemWise('');
    }

    const selectItemWiseSearch1 = (igm, trans, line) => {


        if (!igm || !trans) {
            return;
        }

        setLoading(true);
        axios.get(`${ipaddress}importGatePass/selectSearchedItemWiseData1?cid=${companyid}&bid=${branchId}&igm=${igm}&trans=${trans}&igmline=${line}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data.gatepass;
                const singleData = data[0];

                setChaName(response.data.cha);


                setItemIgm(singleData.igmNo);
                setItemLine(singleData.igmLineNo);
                setvehicleStatus(singleData.vehStatus);
                setContainerData(data);
                setGatePassData(singleData);

                toast.success('Data found successfully!!', {
                    autoClose: 800
                })


                setLoading(false);
                closeItemwiseSearchModal();
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })
    }

    const selectItemWiseSearch = (igm, line, gatepassid, type) => {
        setLoading(true);
        console.log('igm, line, gatepassid ', igm, line, gatepassid);

        axios.get(`${ipaddress}importGatePass/selectSearchedItemWiseData?cid=${companyid}&bid=${branchId}&igm=${igm}&igmline=${line}&gatepassid=${gatepassid}&type=${type}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data.gatepass;
                const singleData = data[0];

                setChaName(response.data.cha);


                setItemIgm(singleData.igmNo);
                setItemLine(singleData.igmLineNo);
                setvehicleStatus(singleData.vehStatus);
                setContainerData(data);
                setGatePassData(singleData);

                toast.success('Data found successfully!!', {
                    autoClose: 800
                })


                setLoading(false);
                closeItemwiseSearchModal();
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                selectItemWiseSearch1(igm, igmTrans, item);
                setLoading(false);
            })
    }

    const [isModalForOpenContwiseSearch, setisModalForOpenContwiseSearch] = useState(false);
    const openContwiseSearchModal = () => {
        setisModalForOpenContwiseSearch(true);
        searchByContWise('');
    }

    const closeContwiseSearchModal = () => {
        setisModalForOpenContwiseSearch(false);
        setitemSearchData([]);
        setSearchVal('');
    }

    const searchByContWise = (val) => {
        setLoading(true);
        axios.get(`${ipaddress}importGatePass/searchByContwise?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {

                setitemSearchData(response.data);
                toast.success("Data found successfully!!!", {
                    autoClose: 800
                })
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setitemSearchData([]);
                setLoading(false);
            })
    }

    const selectContWiseSearch = (igm, gatepassid) => {
        setLoading(true);
        axios.get(`${ipaddress}importGatePass/selectSearchedContWiseData?cid=${companyid}&bid=${branchId}&igm=${igm}&gatepassid=${gatepassid}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const singleData = response.data[0];

                setcontainerWiseIgm(singleData.igmNo);
                setcontainerWiseCon(singleData.containerNo);
                setGatePassContainerData(singleData);
                setGatePassItemData(data);

                toast.success('Data found successfully!!', {
                    autoClose: 800
                })


                setLoading(false);
                closeContwiseSearchModal();
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })
    }

    const [currentPage2, setCurrentPage2] = useState(1);
    const [itemsPerPage2] = useState(5);

    const indexOfLastItem2 = currentPage2 * itemsPerPage2;
    const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;
    const currentItems2 = itemSearchData.slice(indexOfFirstItem2, indexOfLastItem2);
    const totalPages2 = Math.ceil(itemSearchData.length / itemsPerPage2);

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

    const [isModalOpenForCamera, setisModalOpenForCamera] = useState(false);

    const openCameraModal = () => {
        setisModalOpenForCamera(true);
        startCamera();
        fetchImage();
    }
    const openCameraModal1 = () => {
        setisModalOpenForCamera(true);
        startCamera();
        fetchImage1();
    }
    const closeCameraModal = () => {
        setisModalOpenForCamera(false);
        stopCamera();
        setPhoto(null);
    }

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [photo, setPhoto] = useState(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsCameraOn(true);
            }
        } catch (err) {
            console.error("Error accessing camera: ", err);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setIsCameraOn(false);
        }
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const width = videoRef.current.videoWidth;
            const height = videoRef.current.videoHeight;

            canvasRef.current.width = width;
            canvasRef.current.height = height;

            const context = canvasRef.current.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, width, height);

            const imageData = canvasRef.current.toDataURL('image/png');
            setPhoto(imageData);
        }
    };

    const uploadPhoto = async () => {
        setLoading(true);
        const blob = await fetch(photo).then(res => res.blob());

        // Create a FormData object
        const formData = new FormData();
        formData.append('file', blob, 'captured.png');

        // Send the photo to the backend
        try {
            const response = await axios.post(`${ipaddress}importGatePass/uploadItemwiseImage?cid=${companyid}&bid=${branchId}&igm=${gatePassData.igmNo}&igmline=${gatePassData.igmLineNo}&gatePassId=${gatePassData.gatePassId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success("Image uploaded successfully!!!", {
                autoClose: 800
            })


            setLoading(false);
        } catch (err) {
            toast.error("Something went wrong!!!", {
                autoClose: 800
            })

            setLoading(false);
        }
    };

    const fetchImage = async () => {
        try {
            const response = await axios.get(`${ipaddress}importGatePass/getItemwiseImage?cid=${companyid}&bid=${branchId}&igm=${gatePassData.igmNo}&igmline=${gatePassData.igmLineNo}&gatePassId=${gatePassData.gatePassId}&sr=${gatePassData.srNo}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                responseType: 'blob'
            });

            // Create a URL for the image blob
            const url = URL.createObjectURL(response.data);
            setPhoto(url);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching image", error);
            setLoading(false);
        }
    };


    const uploadPhoto1 = async () => {
        setLoading(true);
        const blob = await fetch(photo).then(res => res.blob());

        // Create a FormData object
        const formData = new FormData();
        formData.append('file', blob, 'captured.png');

        // Send the photo to the backend
        try {
            const response = await axios.post(`${ipaddress}importGatePass/uploadConwiseImage?cid=${companyid}&bid=${branchId}&igm=${gatePassContainerData.igmNo}&gatePassId=${gatePassContainerData.gatePassId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success("Image uploaded successfully!!!", {
                autoClose: 800
            })


            setLoading(false);
        } catch (err) {
            toast.error("Something went wrong!!!", {
                autoClose: 800
            })

            setLoading(false);
        }
    };

    const fetchImage1 = async () => {
        try {
            const response = await axios.get(`${ipaddress}importGatePass/getItemwiseImage?cid=${companyid}&bid=${branchId}&igm=${gatePassContainerData.igmNo}&igmline=${gatePassContainerData.igmLineNo}&gatePassId=${gatePassContainerData.gatePassId}&sr=${gatePassContainerData.srNo}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                responseType: 'blob'
            });

            // Create a URL for the image blob
            const url = URL.createObjectURL(response.data);
            setPhoto(url);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching image", error);
            setLoading(false);
        }
    };


    const [gatePassContainerData, setGatePassContainerData] = useState({
        companyId: '',
        branchId: '',
        finYear: new Date().getFullYear(),
        gatePassId: '',
        srNo: 0,
        vehicleGatePassId: '',
        conSrNo: 0,
        profitcentreId: '',
        invoiceNo: '',
        invoiceDate: null,
        gatePassDate: new Date(),
        igmNo: '',
        igmLineNo: '',
        igmTransId: '',
        nocNo: '',
        nocValidityDate: null,
        shift: 'Day',
        transType: '',
        importerName: '',
        importerAddress1: '',
        importerAddress2: '',
        importerAddress3: '',
        cha: '',
        containerNo: '',
        containerSize: '',
        containerType: '',
        boe: '',
        beDate: null,
        cargoValue: 0.000,
        cargoDuty: 0.000,
        blNo: '',
        blDate: null,
        viaNo: '',
        commodity: '',
        grossWt: 0.000,
        noOfPackage: 0,
        qtyTakenOut: 0,
        vehicleQtyTakenOut: 0,
        gwTakenOut: 0.000,
        yardPackages: 0.000,
        cellAreaAllocated: 0.000,
        areaReleased: 0.000,
        transporterStatus: '',
        transporter: '',
        transporterName: '',
        vehicleNo: '',
        driverName: '',
        comments: '',
        remarks: '',
        gateOutId: '',
        gateOutDate: null,
        sl: '',
        destuffLineId: '',
        destuffId: '',
        drt: 'N',
        grnNo: '',
        grnDate: null,
        cinNo: '',
        cinDate: null,
        stampDuty: 0.00,
        splGateOutFlag: 'N',
        dpdFlag: 'N',
        doNo: '',
        doDate: null,
        doValidityDate: null,
        oocNo: '',
        oocDate: null,
        loadingStartDate: null,
        loadingEndDate: null,
        status: '',
        createdBy: '',
        createdDate: null,
        editedBy: '',
        editedDate: null,
        approvedBy: '',
        approvedDate: null,
        yardLocation: '',
        yardBlock: '',
        blockCellNo: '',
        yardLocation1: '',
        yardBlock1: '',
        blockCellNo1: '',
        vehStatus: '',
        gatePassType: '',
        othPartyId: '',
        webCamPath: '',
        scannerType: '',
        iso: '',
        actualSealNo: '',
        mtyYardLocation: 'K00898',
        gateOutQty: 0
    })

    const [gatePassItemData, setGatePassItemData] = useState([{
        companyId: '',
        branchId: '',
        finYear: new Date().getFullYear(),
        gatePassId: '',
        srNo: 0,
        vehicleGatePassId: '',
        conSrNo: 0,
        profitcentreId: '',
        invoiceNo: '',
        invoiceDate: null,
        gatePassDate: new Date(),
        igmNo: '',
        igmLineNo: '',
        igmTransId: '',
        nocNo: '',
        nocValidityDate: null,
        shift: 'Day',
        transType: '',
        importerName: '',
        importerAddress1: '',
        importerAddress2: '',
        importerAddress3: '',
        cha: '',
        containerNo: '',
        containerSize: '',
        containerType: '',
        boe: '',
        beDate: null,
        cargoValue: 0.000,
        cargoDuty: 0.000,
        blNo: '',
        blDate: null,
        viaNo: '',
        commodity: '',
        grossWt: 0.000,
        noOfPackage: 0,
        qtyTakenOut: 0,
        vehicleQtyTakenOut: 0,
        gwTakenOut: 0.000,
        yardPackages: 0.000,
        cellAreaAllocated: 0.000,
        areaReleased: 0.000,
        transporterStatus: '',
        transporter: '',
        transporterName: '',
        vehicleNo: '',
        driverName: '',
        comments: '',
        remarks: '',
        gateOutId: '',
        gateOutDate: null,
        sl: '',
        destuffLineId: '',
        destuffId: '',
        drt: 'N',
        grnNo: '',
        grnDate: null,
        cinNo: '',
        cinDate: null,
        stampDuty: 0.00,
        splGateOutFlag: 'N',
        dpdFlag: 'N',
        doNo: '',
        doDate: null,
        doValidityDate: null,
        oocNo: '',
        oocDate: null,
        loadingStartDate: null,
        loadingEndDate: null,
        status: '',
        createdBy: '',
        createdDate: null,
        editedBy: '',
        editedDate: null,
        approvedBy: '',
        approvedDate: null,
        yardLocation: '',
        yardBlock: '',
        blockCellNo: '',
        yardLocation1: '',
        yardBlock1: '',
        blockCellNo1: '',
        vehStatus: '',
        gatePassType: '',
        othPartyId: '',
        webCamPath: '',
        scannerType: '',
        iso: '',
        actualSealNo: '',
        mtyYardLocation: 'K00898',
        gateOutQty: 0
    }])

    const handleContainerGatePassChange = (e) => {
        const { name, value } = e.target;
        let sanitizedValue = value;

        // Sanitize input for specific fields
        // if (['stampDuty'].includes(name)) {
        //     sanitizedValue = handleInputChange(value);
        // }
        setGatePassContainerData(prevState => ({
            ...prevState,
            [name]: sanitizedValue
        }));

        setcontainerWiseError(prevState => ({
            ...prevState,
            [name]: ""
        }));
        document.getElementById(name).classList.remove('error-border');
    };

    const handleItemChange = (e, index) => {
        const { name, value } = e.target;
        let sanitizedValue = value;

        // Sanitize input for specific fields
        if (['stampDuty'].includes(name)) {
            sanitizedValue = handleInputChange(value);
        }
        // Update igmCrgData state
        setGatePassItemData(prevState => {
            const updatedData = [...prevState];
            updatedData[index] = {
                ...updatedData[index],
                [name]: sanitizedValue
            };
            return updatedData;
        });

        setcontainerErrors(prevErrors => {
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

    const handleItemDateChange = (date, name, index) => {

        setGatePassItemData(prevState => {
            const updatedData = [...prevState];
            updatedData[index] = {
                ...updatedData[index],
                [name]: date
            };
            return updatedData;
        });

        // setItemError(prevErrors => {
        //     const updatedErrors = [...prevErrors];
        //     if (updatedErrors[index]) {
        //         delete updatedErrors[index][name]; // Corrected field access
        //         if (Object.keys(updatedErrors[index]).length === 0) {
        //             updatedErrors.splice(index, 1);
        //         }
        //     }
        //     return updatedErrors;
        // });

        // // Remove error-border class
        // document.getElementById(`${name}${index}`).classList.remove('error-border');
    };

    const [containerWiseIgm, setcontainerWiseIgm] = useState('');
    const [containerWiseCon, setcontainerWiseCon] = useState('');

    const getContainerWiseData = (igm, con) => {
        setLoading(true);
        if (!igm) {
            toast.error("IGM No is required", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }

        if (!con) {
            toast.error("Container No is required", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }

        axios.get(`${ipaddress}importGatePass/getContWiseData?cid=${companyid}&bid=${branchId}&igm=${igm}&cont=${con}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                console.log('con data ', response.data);

                const data = response.data.container;
                const crg = response.data.crg[0];
                const crg1 = response.data.crg;
                const con = response.data.container[0];



                setGatePassContainerData({
                    companyId: '',
                    branchId: '',
                    finYear: new Date().getFullYear(),
                    gatePassId: '',
                    srNo: 0,
                    vehicleGatePassId: '',
                    conSrNo: 0,
                    profitcentreId: con.profitcentreId || '',
                    invoiceNo: '',
                    invoiceDate: null,
                    gatePassDate: new Date(),
                    igmNo: con.igmNo || '',
                    igmLineNo: con.igmLineNo || '',
                    igmTransId: con.igmTransId || '',
                    nocNo: '',
                    nocValidityDate: null,
                    shift: con.shift || 'Day',
                    transType: con.gateOutType === 'CRG' ? 'FCL' : 'CONT' || '',
                    importerName: crg.importerName || '',
                    importerAddress1: crg.importerAddress1 || '',
                    importerAddress2: crg.importerAddress2 || '',
                    importerAddress3: crg.importerAddress3 || '',
                    cha: crg.chaName || '',
                    containerNo: con.containerNo || '',
                    containerSize: con.containerSize || '',
                    containerType: con.containerType || '',
                    boe: con.beNo || '',
                    beDate: con.beDate || null,
                    cargoValue: con.cargoValue || 0.000,
                    cargoDuty: con.cargoDuty || 0.000,
                    blNo: crg.blNo || '',
                    blDate: crg.blDate || null,
                    viaNo: crg.viaNo || '',
                    commodity: crg.commodityDescription || '',
                    grossWt: con.grossWt || 0.000,
                    noOfPackage: con.noOfPackages || 0,
                    qtyTakenOut: con.noOfPackages || 0,
                    vehicleQtyTakenOut: con.noOfPackages || 0,
                    gwTakenOut: con.grossWt || 0.000,
                    yardPackages: 0.000,
                    cellAreaAllocated: 0.000,
                    areaReleased: 0.000,
                    transporterStatus: '',
                    transporter: '',
                    transporterName: '',
                    vehicleNo: '',
                    driverName: '',
                    comments: '',
                    remarks: '',
                    gateOutId: con.gateOutId || '',
                    gateOutDate: con.gateOutDate || null,
                    sl: '',
                    destuffLineId: '',
                    destuffId: con.destuffId || '',
                    drt: con.drt || 'N',
                    grnNo: '',
                    grnDate: null,
                    cinNo: '',
                    cinDate: null,
                    stampDuty: 0.00,
                    splGateOutFlag: 'N',
                    dpdFlag: 'N',
                    doNo: con.doNo || '',
                    doDate: con.doDate || null,
                    doValidityDate: con.doValidityDate || null,
                    oocNo: con.oocNo || '',
                    oocDate: con.oocDate || null,
                    loadingStartDate: null,
                    loadingEndDate: null,
                    status: '',
                    createdBy: '',
                    createdDate: null,
                    editedBy: '',
                    editedDate: null,
                    approvedBy: crg.chaCode,
                    approvedDate: null,
                    yardLocation: con.yardLocation || '',
                    yardBlock: con.yardBlock || '',
                    blockCellNo: con.blockCellNo || '',
                    yardLocation1: con.yardLocation1 || '',
                    yardBlock1: con.yardBlock1 || '',
                    blockCellNo1: con.blockCellNo1 || '',
                    vehStatus: 'Y',
                    gatePassType: 'ITEM',
                    othPartyId: '',
                    webCamPath: '',
                    scannerType: '',
                    iso: con.iso || '',
                    actualSealNo: con.actualSealNo || '',
                    mtyYardLocation: 'K00898',
                    gateOutQty: 0
                })

                setGatePassItemData(crg1.map(item => ({
                    companyId: '',
                    branchId: '',
                    finYear: new Date().getFullYear(),
                    gatePassId: '',
                    srNo: 0,
                    vehicleGatePassId: '',
                    conSrNo: 0,
                    profitcentreId: con.profitcentreId || '',
                    invoiceNo: '',
                    invoiceDate: null,
                    gatePassDate: new Date(),
                    igmNo: item.igmNo || '',
                    igmLineNo: item.igmLineNo || '',
                    igmTransId: item.igmTransId || '',
                    nocNo: '',
                    nocValidityDate: null,
                    shift: con.shift || 'Day',
                    transType: con.gateOutType === 'CRG' ? 'FCL' : 'CONT' || '',
                    importerName: item.importerName || '',
                    importerAddress1: item.importerAddress1 || '',
                    importerAddress2: item.importerAddress2 || '',
                    importerAddress3: item.importerAddress3 || '',
                    cha: item.chaName || '',
                    containerNo: con.containerNo || '',
                    containerSize: con.containerSize || '',
                    containerType: con.containerType || '',
                    boe: crg.beNo || '',
                    beDate: crg.beDate || null,
                    cargoValue: crg.cargoValue || 0.000,
                    cargoDuty: crg.cargoDuty || 0.000,
                    blNo: crg.blNo || '',
                    blDate: crg.blDate || null,
                    viaNo: crg.viaNo || '',
                    commodity: crg.commodityDescription || '',
                    grossWt: con.grossWt || 0.000,
                    noOfPackage: con.noOfPackages || 0,
                    qtyTakenOut: con.noOfPackages || 0,
                    vehicleQtyTakenOut: con.noOfPackages || 0,
                    gwTakenOut: con.grossWt || 0.000,
                    yardPackages: 0.000,
                    cellAreaAllocated: 0.000,
                    areaReleased: 0.000,
                    transporterStatus: '',
                    transporter: '',
                    transporterName: '',
                    vehicleNo: '',
                    driverName: '',
                    comments: '',
                    remarks: '',
                    gateOutId: con.gateOutId || '',
                    gateOutDate: con.gateOutDate || null,
                    sl: '',
                    destuffId: con.destuffId || '',
                    drt: con.drt || 'N',
                    drt: 'N',
                    grnNo: '',
                    grnDate: null,
                    cinNo: '',
                    cinDate: null,
                    stampDuty: 0.00,
                    splGateOutFlag: 'N',
                    dpdFlag: 'N',
                    doNo: con.doNo || '',
                    doDate: companyid.doDate || null,
                    doValidityDate: con.doValidityDate || null,
                    oocNo: con.oocNo || '',
                    oocDate: con.oocDate || null,
                    loadingStartDate: null,
                    loadingEndDate: null,
                    status: '',
                    createdBy: '',
                    createdDate: null,
                    editedBy: '',
                    editedDate: null,
                    approvedBy: '',
                    approvedDate: null,
                    yardLocation: con.yardLocation || '',
                    yardBlock: con.yardBlock || '',
                    blockCellNo: con.blockCellNo || '',
                    yardLocation1: con.yardLocation1 || '',
                    yardBlock1: con.yardBlock1 || '',
                    blockCellNo1: con.blockCellNo1 || '',
                    vehStatus: '',
                    gatePassType: '',
                    othPartyId: '',
                    webCamPath: '',
                    scannerType: '',
                    iso: '',
                    actualSealNo: con.actualSealNo || '',
                    mtyYardLocation: 'K00898',
                    gateOutQty: 0
                })))

                toast.success("Data found successfully!!", {
                    autoClose: 800
                })

                setLoading(false);


            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })


    }

    const [containerWiseError, setcontainerWiseError] = useState({
        vehicleNo: "",
        driverName: "",
        oocDate: "",
        doDate: "",
        doValidityDate: ""
    })

    const [containerErrors, setcontainerErrors] = useState([]);
    const saveContainerWiseData = () => {
        setLoading(true);

        let errors = {};

        if (!gatePassContainerData.vehicleNo && gatePassContainerData.vehStatus === 'Y') {
            errors.vehicleNo = "Vehicle no is required."
        }
        if (!gatePassContainerData.driverName && gatePassContainerData.vehStatus === 'Y') {
            errors.driverName = "Driver is required."
        }
        if (!gatePassContainerData.oocNo) {
            errors.oocNo = "OOC No is required."
        }
        if (!gatePassContainerData.oocDate) {
            errors.oocDate = "OOC Date is required."
        }
        if (!gatePassContainerData.doDate) {
            errors.doDate = "DO Date is required."
        }
        if (!gatePassContainerData.doValidityDate) {
            errors.doValidityDate = "DO Validity Date is required."
        }

        if (Object.keys(errors).length > 0) {
            setLoading(false);
            setcontainerWiseError(errors);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            })
            return;
        }

        let newErrors = gatePassItemData.map(() => ({}));
        setItemError([]);

        gatePassItemData.forEach((data, index) => {
            let rowErrors = {};
            if (!data.stampDuty) rowErrors.stampDuty = "Stamp Duty is required.";

            if (Object.keys(rowErrors).length > 0) {
                newErrors[index] = rowErrors;
            }
        });

        // Check if any errors exist
        const hasErrors = newErrors.some(errorObj => Object.keys(errorObj).length > 0);

        if (hasErrors) {
            console.log('newErrors ', newErrors);
            setcontainerErrors(newErrors);
            setLoading(false);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            });
            console.log('errors ', errors);
            return;
        }

        if (!gatePassContainerData.igmNo) {
            toast.error("Container Data not found", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }

        const formData = {
            crg: gatePassContainerData,
            container: gatePassItemData
        }

        console.log('formData formData ', formData);


        axios.post(`${ipaddress}importGatePass/saveContainerwiseData?cid=${companyid}&bid=${branchId}&user=${userId}`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {


                const data = response.data;
                const singleData = response.data[0];

                console.log('gatepassdata ', data);


                setGatePassContainerData(singleData);
                setGatePassItemData(data);

                toast.success('Data save successfully!!', {
                    autoClose: 800
                })

                onRequest();
                setLoading(false);
            })
            .catch((error) => {
                console.log('error ', error);

                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })

    }

    const handleContainerWiseError = () => {
        setGatePassContainerData({
            companyId: '',
            branchId: '',
            finYear: new Date().getFullYear(),
            gatePassId: '',
            srNo: 0,
            vehicleGatePassId: '',
            conSrNo: 0,
            profitcentreId: '',
            invoiceNo: '',
            invoiceDate: null,
            gatePassDate: new Date(),
            igmNo: '',
            igmLineNo: '',
            igmTransId: '',
            nocNo: '',
            nocValidityDate: null,
            shift: 'Day',
            transType: '',
            importerName: '',
            importerAddress1: '',
            importerAddress2: '',
            importerAddress3: '',
            cha: '',
            containerNo: '',
            containerSize: '',
            containerType: '',
            boe: '',
            beDate: null,
            cargoValue: 0.000,
            cargoDuty: 0.000,
            blNo: '',
            blDate: null,
            viaNo: '',
            commodity: '',
            grossWt: 0.000,
            noOfPackage: 0,
            qtyTakenOut: 0,
            vehicleQtyTakenOut: 0,
            gwTakenOut: 0.000,
            yardPackages: 0.000,
            cellAreaAllocated: 0.000,
            areaReleased: 0.000,
            transporterStatus: '',
            transporter: '',
            transporterName: '',
            vehicleNo: '',
            driverName: '',
            comments: '',
            remarks: '',
            gateOutId: '',
            gateOutDate: null,
            sl: '',
            destuffLineId: '',
            destuffId: '',
            drt: 'N',
            grnNo: '',
            grnDate: null,
            cinNo: '',
            cinDate: null,
            stampDuty: 0.00,
            splGateOutFlag: 'N',
            dpdFlag: 'N',
            doNo: '',
            doDate: null,
            doValidityDate: null,
            oocNo: '',
            oocDate: null,
            loadingStartDate: null,
            loadingEndDate: null,
            status: '',
            createdBy: '',
            createdDate: null,
            editedBy: '',
            editedDate: null,
            approvedBy: '',
            approvedDate: null,
            yardLocation: '',
            yardBlock: '',
            blockCellNo: '',
            yardLocation1: '',
            yardBlock1: '',
            blockCellNo1: '',
            vehStatus: 'Y',
            gatePassType: '',
            othPartyId: '',
            webCamPath: '',
            scannerType: '',
            iso: '',
            actualSealNo: '',
            mtyYardLocation: 'K00898',
            gateOutQty: 0
        })

        setGatePassItemData([{
            companyId: '',
            branchId: '',
            finYear: new Date().getFullYear(),
            gatePassId: '',
            srNo: 0,
            vehicleGatePassId: '',
            conSrNo: 0,
            profitcentreId: '',
            invoiceNo: '',
            invoiceDate: null,
            gatePassDate: new Date(),
            igmNo: '',
            igmLineNo: '',
            igmTransId: '',
            nocNo: '',
            nocValidityDate: null,
            shift: 'Day',
            transType: '',
            importerName: '',
            importerAddress1: '',
            importerAddress2: '',
            importerAddress3: '',
            cha: '',
            containerNo: '',
            containerSize: '',
            containerType: '',
            boe: '',
            beDate: null,
            cargoValue: 0.000,
            cargoDuty: 0.000,
            blNo: '',
            blDate: null,
            viaNo: '',
            commodity: '',
            grossWt: 0.000,
            noOfPackage: 0,
            qtyTakenOut: 0,
            vehicleQtyTakenOut: 0,
            gwTakenOut: 0.000,
            yardPackages: 0.000,
            cellAreaAllocated: 0.000,
            areaReleased: 0.000,
            transporterStatus: '',
            transporter: '',
            transporterName: '',
            vehicleNo: '',
            driverName: '',
            comments: '',
            remarks: '',
            gateOutId: '',
            gateOutDate: null,
            sl: '',
            destuffLineId: '',
            destuffId: '',
            drt: 'N',
            grnNo: '',
            grnDate: null,
            cinNo: '',
            cinDate: null,
            stampDuty: 0.00,
            splGateOutFlag: 'N',
            dpdFlag: 'N',
            doNo: '',
            doDate: null,
            doValidityDate: null,
            oocNo: '',
            oocDate: null,
            loadingStartDate: null,
            loadingEndDate: null,
            status: '',
            createdBy: '',
            createdDate: null,
            editedBy: '',
            editedDate: null,
            approvedBy: '',
            approvedDate: null,
            yardLocation: '',
            yardBlock: '',
            blockCellNo: '',
            yardLocation1: '',
            yardBlock1: '',
            blockCellNo1: '',
            vehStatus: '',
            gatePassType: '',
            othPartyId: '',
            webCamPath: '',
            scannerType: '',
            iso: '',
            actualSealNo: '',
            mtyYardLocation: 'K00898',
            gateOutQty: 0
        }])
        setcontainerWiseIgm('');
        setcontainerWiseCon('');
        setcontainerWiseError({
            vehicleNo: "",
            driverName: "",
            oocDate: "",
            doDate: "",
            doValidityDate: ""
        })
        setcontainerErrors([]);
        document.getElementById('vehicleNo').classList.remove('error-border');
        document.getElementById('driverName').classList.remove('error-border');
        document.getElementById('oocDate').classList.remove('error-border');
        document.getElementById('doDate').classList.remove('error-border');
        document.getElementById('doValidityDate').classList.remove('error-border');
    }


    const [chaList, setChaList] = useState([]);
    const [chaName, setChaName] = useState('');

    const handleCHAList = (val) => {
        if (val === '') {
            setChaList([]);
            return;
        }

        axios.get(`${ipaddress}party/getCha1?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const portOptions = data.map(port => ({
                    value: port[2],
                    label: port[1]
                }))
                setChaList(portOptions);
            })
            .catch((error) => {
                setChaList([]);
            })
    }

    const handleChaSelect = async (selectedOption, { action }) => {
        if (action === 'clear') {
            setGatePassData({
                ...gatePassData,
                cha: ''
            });
            setChaName('');
        }
        else {
            setGatePassData({
                ...gatePassData,
                cha: selectedOption.value
            });
            setChaName(selectedOption.label);
            setItemWiseError({ ...itemWiseError, cha: '' });
            document.getElementById('cha').classList.remove('error-border')
        }

    }

    const [isModalOpenForAddVehicle, setIsModalForAddVehicle] = useState(false);
    const [vehData, setVehData] = useState([]);

    const [addVehicleData, setAddVehicleData] = useState([{
        vehId: '',
        vehicleNo: '',
        vehicleGatePassId: '',
        qtyTakenOut: 0,
        gwTakenOut: 0.000
    }])
    const [error, setError] = useState([]);

    const handleAddRow = () => {
        let newErrors = containerData.map(() => ({}));
        setError([]);

        const vehicleNoCounts = {};

        // First pass: Count occurrences of each vehicleNo
        addVehicleData.forEach((data) => {
            if (data.vehicleNo) {
                vehicleNoCounts[data.vehicleNo] = (vehicleNoCounts[data.vehicleNo] || 0) + 1;
            }
        });

        addVehicleData.forEach((data, index) => {
            let rowErrors = {};
            if (!data.vehicleNo) rowErrors.vehicleNo = "Vehicle no is required.";
            if (vehicleNoCounts[data.vehicleNo] > 1) {
                rowErrors.vehicleNo = `Duplicate vehicle no.`;
            }
            if (!data.qtyTakenOut) rowErrors.qtyTakenOut = "Qty taken out is required.";
            if (!data.gwTakenOut) rowErrors.gwTakenOut = "GW tken out is required.";
            if (Object.keys(rowErrors).length > 0) {
                newErrors[index] = rowErrors;
            }
        });

        // Check if any errors exist
        const hasErrors = newErrors.some(errorObj => Object.keys(errorObj).length > 0);

        if (hasErrors) {
            console.log('newErrors ', newErrors);
            setError(newErrors);
            setLoading(false);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            });
            console.log('errors ', errors);
            return;
        }
        const checkQty = addVehicleData.reduce((total, item) => total + (item.qtyTakenOut ? parseFloat(item.qtyTakenOut) : 0), 0);
        const checkWt = addVehicleData.reduce((total, item) => total + (item.gwTakenOut ? parseFloat(item.gwTakenOut) : 0), 0)

        if (checkQty > vehData[0].qtyTakenOut) {
            toast.error("Qty taken out must be same with out Qty", {
                autoClose: 800
            })
            return;
        }
        if (checkWt > vehData[0].gwTakenOut) {
            toast.error("Gw taken out must be same with out gw", {
                autoClose: 800
            })
            return;
        }

        setAddVehicleData(prevData => [
            ...prevData,
            {
                vehId: '',
                vehicleNo: '',
                vehicleGatePassId: '',
                qtyTakenOut: 0,
                gwTakenOut: 0.000
            }
        ]);
    };

    const openAddVehicleModal = (igm, line, gatepassid) => {
        setIsModalForAddVehicle(true);
        getVehicleDataForAddVehicle(igm, line, gatepassid);
    }

    const closeAddVehicleModal = () => {
        setIsModalForAddVehicle(false);
        setVehData([]);
        setAddVehicleData([{
            vehId: '',
            vehicleNo: '',
            vehicleGatePassId: '',
            qtyTakenOut: 0,
            gwTakenOut: 0.000
        }])
        setErrors([]);
    }

    const handleChangeAddVeh = async (selectedOption, { action }, index) => {
        if (action === 'clear') {
            setAddVehicleData(prevState => {
                const updatedData = [...prevState];
                updatedData[index] = {
                    ...updatedData[index],
                    vehicleNo: '',
                    vehicleGatePassId: ''
                };
                return updatedData;
            });
            setVehicleData([]);
        }
        else {
            setAddVehicleData(prevState => {
                const updatedData = [...prevState];
                updatedData[index] = {
                    ...updatedData[index],
                    vehicleNo: selectedOption.label || '',
                    vehicleGatePassId: selectedOption.value || ''
                };
                return updatedData;
            });
            setError(prevErrors => {
                const updatedErrors = [...prevErrors];
                if (updatedErrors[index]) {
                    delete updatedErrors[index]['vehicleNo']; // Corrected field access
                    if (Object.keys(updatedErrors[index]).length === 0) {
                        updatedErrors.splice(index, 1);
                    }
                }
                return updatedErrors;
            });

        }
    }


    const getVehicleDataForAddVehicle = (igm, line, gatepassid) => {
        console.log('igm, line, gatepassid ', igm, line, gatepassid);

        axios.get(`${ipaddress}importGatePass/getDataByGatePassId?cid=${companyid}&bid=${branchId}&igm=${igm}&line=${line}&gatepassid=${gatepassid}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                console.log('gatepassdata ', data);

                setVehData(data.gatePassId);

                if (data.vehData.length > 0) {
                    setAddVehicleData(data.vehData);
                }


            })
            .catch((error) => {
                console.log(error.response.data);

            })

    }

    const updateVehDetails = (e, index) => {
        const { name, value } = e.target;
        let sanitizedValue = value;
        if (['qtyTakenOut', 'gwTakenOut'].includes(name)) {
            sanitizedValue = handleInputChange(value);
        }
        setAddVehicleData(prevState => {
            const updatedData = [...prevState];
            updatedData[index] = {
                ...updatedData[index],
                [name]: sanitizedValue
            };
            return updatedData;
        });

        setError(prevErrors => {
            const updatedErrors = [...prevErrors];
            if (updatedErrors[index]) {
                delete updatedErrors[index][name]; // Corrected field access
                if (Object.keys(updatedErrors[index]).length === 0) {
                    updatedErrors.splice(index, 1);
                }
            }
            return updatedErrors;
        });




    };

    const handleRemoveRow = (index) => {
        setAddVehicleData(prevData => prevData.filter((_, i) => i !== index));
    };

    const handleSaveVehData = () => {
        setLoading(true);
        let newErrors = containerData.map(() => ({}));
        setError([]);

        const vehicleNoCounts = {};

        // First pass: Count occurrences of each vehicleNo
        addVehicleData.forEach((data) => {
            if (data.vehicleNo) {
                vehicleNoCounts[data.vehicleNo] = (vehicleNoCounts[data.vehicleNo] || 0) + 1;
            }
        });

        addVehicleData.forEach((data, index) => {
            let rowErrors = {};
            if (!data.vehicleNo) rowErrors.vehicleNo = "Vehicle no is required.";
            if (vehicleNoCounts[data.vehicleNo] > 1) {
                rowErrors.vehicleNo = `Duplicate vehicle no.`;
            }
            if (!data.qtyTakenOut) rowErrors.qtyTakenOut = "Qty taken out is required.";
            if (!data.gwTakenOut) rowErrors.gwTakenOut = "GW tken out is required.";
            if (Object.keys(rowErrors).length > 0) {
                newErrors[index] = rowErrors;
            }
        });

        // Check if any errors exist
        const hasErrors = newErrors.some(errorObj => Object.keys(errorObj).length > 0);

        if (hasErrors) {
            console.log('newErrors ', newErrors);
            setError(newErrors);
            setLoading(false);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            });
            console.log('errors ', errors);
            return;
        }
        const checkQty = addVehicleData.reduce((total, item) => total + (item.qtyTakenOut ? parseFloat(item.qtyTakenOut) : 0), 0);
        const checkWt = addVehicleData.reduce((total, item) => total + (item.gwTakenOut ? parseFloat(item.gwTakenOut) : 0), 0)

        if (checkQty > vehData[0].qtyTakenOut) {
            toast.error("Qty taken out must be same with out Qty", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }
        if (checkWt > vehData[0].gwTakenOut) {
            toast.error("Gw taken out must be same with out gw", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }

        const formData = {
            crg: vehData[0],
            vehData: addVehicleData
        }

        axios.post(`${ipaddress}importGatePass/saveImportGatePassVeh?cid=${companyid}&bid=${branchId}&userId=${userId}`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;

                setAddVehicleData(data);
                toast.success("Data save successfully", {
                    autoClose: 800
                })
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                });
                setLoading(false);
            })
    }


    const downloadItemWiseFCLReport = () => {

        let api = '';
        if (gatePassData.transType === 'CONT') {
            api = 'importReports/importGatePassItemWiseReport';
        }
        else {
            api = "importReports/importGatePassItemWiseDestuffReport"
        }

        setLoading(true);
        axios
            .post(
                `${ipaddress}${api}?cid=${companyid}&bid=${branchId}&gate=${gatePassData.gatePassId}`,
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


    const downloadContWiseFCLReport = () => {


        setLoading(true);
        axios
            .post(
                `${ipaddress}importReports/importGatePassItemWiseReport?cid=${companyid}&bid=${branchId}&gate=${gatePassContainerData.gatePassId}`,
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


    const downloadItemWiseLCLReport = () => {


        setLoading(true);
        axios
            .post(
                `${ipaddress}importReports/importGatePassItemWiseLCLReport?cid=${companyid}&bid=${branchId}&gate=${gatePassData.gatePassId}`,
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
            <Row>
                <Col md={3}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            GatePass Type
                        </label>
                        <Select
                            options={sealCuttingData}
                            isClearable
                            id="nameOfExporter"
                            value={{ value: selectSealCuttingType, label: selectSealCuttingType }}
                            onChange={handleSealCuttingChange}
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

                {selectSealCuttingType === 'itemwise' && (
                    <>

                        <Modal Modal isOpen={isModalForOpenItemwiseSearch} onClose={closeItemwiseSearchModal} toggle={closeItemwiseSearchModal} style={{ maxWidth: '1200px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                            <ModalHeader toggle={closeItemwiseSearchModal} style={{
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
                                /> Search Gate Pass Data</h5>



                            </ModalHeader>
                            <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                                <Row>
                                    <Col md={5}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Search By Container No/Gate Pass Id/IGM No/IGM Line No
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="fobValueInDollar"
                                                value={searchVal}
                                                onChange={(e) => setSearchVal(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6} style={{ marginTop: 25 }}>
                                        <button
                                            className="btn btn-outline-primary btn-margin newButton"
                                            style={{ marginRight: 10 }}

                                            id="submitbtn2"
                                            onClick={() => { searchByItemWise(searchVal); setCurrentPage2(1); }}
                                        >
                                            <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                            Search
                                        </button>
                                        <button
                                            className="btn btn-outline-danger btn-margin newButton"
                                            id="submitbtn2"
                                            onClick={() => { clearItemWise() }}
                                        >
                                            <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
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
                                                <th scope="col">Container No</th>
                                                <th scope="col">Gate Pass Id</th>
                                                <th scope="col">Gate Pass Date</th>
                                                <th scope="col">IGM No</th>
                                                <th scope="col">IGM Line No</th>
                                                <th scope="col">Trans Type</th>
                                                <th scope="col">Invoice No</th>
                                                <th scope="col">Party Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* <tr>
                                                <td><input type="radio" name="radioGroup" value="" /></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr> */}
                                            {currentItems2.map((item, index) => (
                                                <tr key={index}>
                                                    <td><input type="radio" onChange={() => selectItemWiseSearch(item[4], item[5], item[0], item[8])} name="radioGroup" value="" /></td>
                                                    <td>{item[10]}</td>
                                                    <td>{item[0]}</td>
                                                    <td>{item[7]}</td>
                                                    <td>{item[4]}</td>
                                                    <td>{item[5]}</td>
                                                    <td>{item[8]}</td>
                                                    <td>{item[3]}</td>
                                                    <td>{item[9]}</td>
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
                            </ModalBody>
                        </Modal>


                        <Modal Modal isOpen={isModalOpenForCamera} onClose={closeCameraModal} toggle={closeCameraModal} style={{ maxWidth: '1000px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                            <ModalHeader toggle={closeCameraModal} style={{
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
                                    icon={faCameraAlt}
                                    style={{
                                        marginRight: '8px',
                                        color: 'white', // Set the color to golden
                                    }}
                                /> Capture Visitor Photo</h5>



                            </ModalHeader>
                            <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                                <div className='container'>
                                    <div>
                                        <Row>
                                            <Col md={6}>

                                                <div style={{ marginTop: '20px' }}>
                                                    <div style={{ fontSize: 18, fontWeight: 800 }}>Live Camera</div>
                                                    <video ref={videoRef} autoPlay style={{ width: '100%', maxWidth: '600px' }} />
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                {photo && (
                                                    <div style={{ marginTop: '20px' }}>
                                                        <div style={{ fontSize: 18, fontWeight: 800 }}>Captured Image</div>
                                                        <img src={photo} alt="Captured" style={{ width: '100%', maxWidth: '600px' }} />
                                                    </div>
                                                )}
                                            </Col>
                                        </Row>

                                        <Row className='text-center'>
                                            <Col md={6}>
                                                <Button
                                                    type="button"
                                                    className="newButton"
                                                    variant="outline-success"
                                                    style={{ marginTop: '27px' }}
                                                    onClick={isCameraOn ? closeCameraModal : startCamera}
                                                >
                                                    <FontAwesomeIcon icon={faCamera} style={{ marginRight: '5px' }} />
                                                    {isCameraOn ? "Stop Camera" : "Start Camera"}
                                                </Button>

                                                {isCameraOn && <Button type="button"
                                                    className="newButton"
                                                    variant="outline-danger"
                                                    style={{ marginTop: '27px', marginLeft: 10 }} onClick={capturePhoto}>
                                                    <FontAwesomeIcon icon={faCameraRotate} style={{ marginRight: '5px' }} />
                                                    Capture Photo</Button>}
                                            </Col>
                                            <Col md={6}>
                                                {photo && (
                                                    <Button
                                                        type="button"
                                                        className="newButton"
                                                        variant="outline-success"
                                                        style={{ marginTop: '27px' }}
                                                        onClick={uploadPhoto}
                                                    >
                                                        <FontAwesomeIcon icon={faUpload} style={{ marginRight: '5px' }} />
                                                        Upload Image
                                                    </Button>
                                                )}
                                            </Col>
                                        </Row>

                                        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

                                    </div>


                                </div>
                            </ModalBody>
                        </Modal>

                        <Modal Modal isOpen={isModalOpenForAddVehicle} onClose={closeAddVehicleModal} toggle={closeAddVehicleModal} style={{ maxWidth: '800px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                            <ModalHeader toggle={closeAddVehicleModal} style={{
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
                                    icon={faAdd}
                                    style={{
                                        marginRight: '8px',
                                        color: 'white', // Set the color to golden
                                    }}
                                /> Gate Vehicle Details</h5>



                            </ModalHeader>
                            <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >

                                {vehData.length > 0 && (
                                    <div className="mt-1 table-responsive ">
                                        <table className="table table-bordered table-hover tableHeader">
                                            <thead className='tableHeader'>
                                                <tr>

                                                    <th scope="col">Igm No / Igm Line No</th>
                                                    <td scope="col">{vehData[0].igmNo} / {vehData[0].igmLineNo}</td>
                                                    <th scope="col">Trans Type / Gate Pass Id</th>
                                                    <td scope="col">{vehData[0].transType} / {vehData[0].gatePassId}</td>

                                                </tr>
                                                <tr>

                                                    <th scope="col">Nop/Qty Taken Out</th>
                                                    <td scope="col">{vehData[0].noOfPackage} / {vehData[0].qtyTakenOut}</td>
                                                    <th scope="col">Gross Wt / Gross Wt taken out</th>
                                                    <td scope="col">{vehData[0].grossWt} / {vehData[0].gwTakenOut}</td>

                                                </tr>
                                                <tr>

                                                    <th scope="col">Vehicle Packages</th>
                                                    <td scope="col">{addVehicleData.reduce((total, item) => total + (item.qtyTakenOut ? parseFloat(item.qtyTakenOut) : 0), 0)}</td>
                                                    <th scope="col">Vehicle Weight</th>
                                                    <td scope="col">{addVehicleData.reduce((total, item) => total + (item.gwTakenOut ? parseFloat(item.gwTakenOut) : 0), 0)}</td>

                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                )}
                                <Row>
                                    <Col>
                                        <button
                                            className="btn btn-outline-primary btn-margin newButton"
                                            style={{ marginRight: 10, fontSize: 12 }}
                                            onClick={handleAddRow}
                                            id="submitbtn2"
                                        >
                                            <FontAwesomeIcon icon={faAdd} style={{ marginRight: "5px" }} />
                                            Add Details
                                        </button>
                                    </Col>
                                </Row>
                                <div className="mt-1  ">
                                    <table className="table table-bordered table-hover tableHeader">
                                        <thead className='tableHeader'>
                                            <tr>
                                                <th scope="col">Sr No</th>
                                                <th scope="col">Vehicle No</th>
                                                <th scope="col">Qty Taken Out</th>
                                                <th scope="col">GWTaken Out</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {addVehicleData.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <Select
                                                            value={{ value: item.vehicleGatePassId, label: item.vehicleNo }}
                                                            onChange={(option, actionMeta) => handleChangeAddVeh(option, actionMeta, index)}
                                                            onInputChange={getVehicleData1}
                                                            options={vehicleData}
                                                            placeholder="Select Account Holder"
                                                            isClearable
                                                            isDisabled={item.vehId !== ''}
                                                            id="vehicleNo"
                                                            name="vehicleNo"
                                                            className={`${error[index]?.vehicleNo ? 'error-border' : ''}`}
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
                                                                    width: 170,
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
                                                                // Position the dropdown menu on top
                                                                menu: (provided) => ({
                                                                    ...provided,
                                                                    top: 'auto',
                                                                    bottom: '100%', // Set dropdown to appear above the select input
                                                                    marginBottom: 8, // Adjust spacing between the dropdown and input
                                                                }),
                                                            }}
                                                            menuPlacement="top" // Explicitly set dropdown to appear on top
                                                        />
                                                        <div style={{ color: 'red' }} className="error-message">{error[index]?.vehicleNo}</div>

                                                    </td>
                                                    <td>
                                                        <Input
                                                            type="text"
                                                            name="qtyTakenOut"
                                                            className={`form-control inputField ${error[index]?.qtyTakenOut ? 'error-border' : ''}`}
                                                            value={item.qtyTakenOut}
                                                            maxLength={10}
                                                            onChange={(e) => updateVehDetails(e, index)}
                                                            disabled={item.vehId !== ''}
                                                        />
                                                        <div style={{ color: 'red' }} className="error-message">{error[index]?.qtyTakenOut}</div>

                                                    </td>
                                                    <td>
                                                        <Input
                                                            type="text"
                                                            name="gwTakenOut"
                                                            className={`form-control inputField ${error[index]?.gwTakenOut ? 'error-border' : ''}`}
                                                            value={item.gwTakenOut}
                                                            maxLength={10}
                                                            disabled={item.vehId !== ''}
                                                            onChange={(e) => updateVehDetails(e, index)}
                                                        />
                                                        <div style={{ color: 'red' }} className="error-message">{error[index]?.gwTakenOut}</div>

                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-outline-danger btn-margin newButton"
                                                            style={{ marginRight: 10, fontSize: 12 }}
                                                            onClick={() => handleRemoveRow(index)}
                                                            id="submitbtn2"
                                                            disabled={item.vehId}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} />

                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                                <Row className='text-center'>
                                    <Col>
                                        <button
                                            className="btn btn-outline-primary btn-margin newButton"
                                            style={{ marginRight: 10, fontSize: 12 }}
                                            onClick={handleSaveVehData}
                                            id="submitbtn2"
                                        >
                                            <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                            Save
                                        </button>
                                    </Col>
                                </Row>
                            </ModalBody>
                        </Modal>

                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label">IGM No</label>
                                <Input
                                    type="text"
                                    name="IGM No"
                                    className="form-control inputField"
                                    value={itemIgm}
                                    onChange={(e) => setItemIgm(e.target.value)}
                                />
                            </FormGroup>
                        </Col>



                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel">Item No</label>
                                {(igm && !item && !cont) ? (
                                    <Input
                                        className="form-control"
                                        type="select"
                                        id="fobValueInDollar"
                                        value={itemLine}
                                        onChange={(e) => setItemLine(e.target.value)}
                                    >
                                        <option value=""> Select Item No</option>
                                        {igmSearchList.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}
                                    </Input>
                                )
                                    :
                                    (
                                        <Input
                                            type="text"
                                            name="Item No"
                                            className="form-control inputField"
                                            value={itemLine}
                                            onChange={(e) => setItemLine(e.target.value)}
                                        />)}
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel">Gate Out Type</label>
                                <Input
                                    type="select"
                                    name="IGM No"
                                    className="form-control inputField"
                                    value={outType}
                                    onChange={(e) => setOutType(e.target.value)}
                                >
                                    <option value="CON">Loaded</option>
                                    <option value="CRG">Destuff</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={2}>

                            <Button
                                type="button"
                                className="newButton"
                                variant="outline-success"
                                style={{ marginTop: '21px' }}
                                onClick={() => searchItemWiseData(itemIgm, itemLine)}
                            >
                                <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                                Search
                            </Button>
                        </Col>

                        {gatePassData.transType === 'LCL' ? (
                            <>
                                <Row className='mt-4'>
                                    <Col md={2} >
                                        <FormGroup>
                                            <label className="forlabel" for="branchId">Gate Pass Id</label><span className='error'>*</span>
                                            <Row>
                                                <Col md={8}>
                                                    <Input
                                                        type="text"
                                                        name="gatePassId"
                                                        className="form-control inputField"
                                                        value={gatePassData.gatePassId}
                                                        onChange={handleGatePassChange}
                                                        disabled
                                                        id="gatePassId"
                                                    />
                                                </Col>
                                                <Col md={4}>
                                                    <Button
                                                        type="button"
                                                        className="newButton"
                                                        variant="outline-primary"
                                                        onClick={openItemwiseSearchModal}
                                                    >
                                                        <FontAwesomeIcon icon={faSearch} />

                                                    </Button>
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">Gate Pass Date</label>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={gatePassData.gatePassDate}
                                                    onChange={(date) => setGatePassData(prevState => ({
                                                        ...prevState,
                                                        ['gatePassDate']: date
                                                    }))}
                                                    id='gatePassDate'
                                                    name='gatePassDate'
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
                                        <label className="forlabel">Gate Out Type</label>
                                        <Input
                                            type="select"
                                            name="transType"
                                            className="form-control"
                                            id='transType'
                                            value={gatePassData.transType}
                                            onChange={handleGatePassChange}
                                            disabled
                                        >
                                            <option value="">Select Type</option>
                                            <option value="CONT">Container</option>
                                            <option value="FCL">Destuff</option>
                                            <option value="LCL">LCL Cargo</option>
                                        </Input>

                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">Shift</label><span className='error'>*</span>

                                            <Input
                                                type="select"
                                                name="shift"
                                                className="form-control"
                                                value={gatePassData.shift}
                                                id='shift'
                                                onChange={handleGatePassChange}
                                            >
                                                <option value="Day">Day</option>
                                                <option value="Second">Second</option>
                                                <option value="Third">Third</option>
                                            </Input>
                                            <div style={{ color: 'red' }} className="error-message">{itemWiseError.shift}</div>
                                        </FormGroup>

                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">Status</label>
                                            <Input
                                                type="text"
                                                name="status"
                                                className="form-control inputField"
                                                value={gatePassData.status === 'A' ? 'Approved' : ''}
                                                onChange={handleGatePassChange}
                                                disabled
                                                id="status"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">Created By</label>
                                            <Input
                                                type="text"
                                                name="createdBy"
                                                className="form-control inputField"
                                                value={gatePassData.createdBy}
                                                id='createdBy'
                                                disabled
                                                onChange={handleGatePassChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>


                                <Row>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">GRN No</label>
                                            <Input
                                                type="text"
                                                name="grnNo"
                                                className="form-control inputField"
                                                value={gatePassData.grnNo}
                                                id='grnNo'
                                                onChange={handleGatePassChange}
                                                maxLength={25}

                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">GRN Date</label>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={gatePassData.grnDate}
                                                    onChange={(date) => setGatePassData(prevState => ({
                                                        ...prevState,
                                                        ['grnDate']: date
                                                    }))}
                                                    id='grnDate'
                                                    name='grnDate'
                                                    dateFormat="dd/MM/yyyy"
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
                                            <label className="forlabel">Stamp Duty</label><span className='error'>*</span>
                                            <Input
                                                type="text"
                                                name="stampDuty"
                                                className="form-control inputField"
                                                value={gatePassData.stampDuty}
                                                id='stampDuty'
                                                onChange={handleGatePassChange}
                                                maxLength={16}
                                            />
                                            <div style={{ color: 'red' }} className="error-message">{itemWiseError.stampDuty}</div>
                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">CIN No</label>
                                            <Input
                                                type="text"
                                                name="cinNo"
                                                className="form-control inputField"
                                                value={gatePassData.cinNo}
                                                id='cinNo'
                                                onChange={handleGatePassChange}
                                                maxLength={25}
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">CIN Date</label>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={gatePassData.cinDate}
                                                    onChange={(date) => setGatePassData(prevState => ({
                                                        ...prevState,
                                                        ['cinDate']: date
                                                    }))}
                                                    id='cinDate'
                                                    name='cinDate'
                                                    dateFormat="dd/MM/yyyy"
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
                                            <label className="forlabel">Commodity</label>
                                            <Input
                                                type="textarea"
                                                name="commodity"
                                                className="form-control inputField"
                                                value={gatePassData.commodity}
                                                id='commodity'
                                                disabled
                                                onChange={handleGatePassChange}
                                                maxLength={150}
                                            />
                                        </FormGroup>
                                    </Col>



                                </Row>

                                <Row>


                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">Do No</label>
                                            <Input
                                                type="text"
                                                name="doNo"
                                                className="form-control inputField"
                                                value={gatePassData.doNo}
                                                id='doNo'
                                                onChange={handleGatePassChange}
                                                maxLength={30}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">OOC No</label><span className='error'>*</span>
                                            <Input
                                                type="text"
                                                name="oocNo"
                                                className="form-control inputField"
                                                value={gatePassData.oocNo}
                                                id='oocNo'
                                                onChange={handleGatePassChange}
                                                maxLength={20}
                                            />
                                            <div style={{ color: 'red' }} className="error-message">{itemWiseError.oocNo}</div>
                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">OOC Date</label><span className='error'>*</span>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={gatePassData.oocDate}
                                                    onChange={(date) => {
                                                        setGatePassData(prevState => ({
                                                            ...prevState,
                                                            oocDate: date
                                                        }));
                                                        setItemWiseError(prevState => ({
                                                            ...prevState,
                                                            oocDate: ""
                                                        }));
                                                        document.getElementById('oocDate').classList.remove('error-border');
                                                    }}
                                                    id='oocDate'
                                                    name='oocDate'
                                                    showTimeInput
                                                    dateFormat="dd/MM/yyyy HH:mm"
                                                    className="form-control border-right-0 InputField"
                                                    customInput={<Input style={{ width: '100%' }} />}
                                                    wrapperClassName="custom-react-datepicker-wrapper"
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
                                            <div style={{ color: 'red' }} className="error-message">
                                                {itemWiseError.oocDate}
                                            </div>
                                        </FormGroup>

                                    </Col>


                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">DO Date</label><span className='error'>*</span>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={gatePassData.doDate}
                                                    onChange={(date) => {
                                                        setGatePassData(prevState => ({
                                                            ...prevState,
                                                            doDate: date,
                                                            doValidityDate: date >= prevState.doValidityDate ? null : prevState.doValidityDate,
                                                        }));
                                                        setItemWiseError(prevState => ({
                                                            ...prevState,
                                                            doDate: ""
                                                        }));
                                                        document.getElementById('doDate').classList.remove('error-border');
                                                    }}

                                                    id='doDate'
                                                    name='doDate'
                                                    showTimeInput
                                                    dateFormat="dd/MM/yyyy HH:mm"
                                                    className="form-control border-right-0 InputField"
                                                    customInput={<Input style={{ width: '100%' }} />}
                                                    wrapperClassName="custom-react-datepicker-wrapper"
                                                />
                                                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                            </div>
                                            <div style={{ color: 'red' }} className="error-message">{itemWiseError.doDate}</div>
                                        </FormGroup>
                                    </Col>


                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">DO Validity Date</label><span className='error'>*</span>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={gatePassData.doValidityDate}
                                                    onChange={(date) => {
                                                        setGatePassData(prevState => ({
                                                            ...prevState,
                                                            doValidityDate: date
                                                        }));
                                                        setItemWiseError(prevState => ({
                                                            ...prevState,
                                                            doValidityDate: ""
                                                        }));
                                                        document.getElementById('doValidityDate').classList.remove('error-border');
                                                    }}
                                                    minDate={(() => {
                                                        const date = new Date(gatePassData.doDate);
                                                        date.setDate(date.getDate() + 1);
                                                        return date;
                                                    })()}
                                                    id='doValidityDate'
                                                    name='doValidityDate'

                                                    dateFormat="dd/MM/yyyy"
                                                    className="form-control border-right-0 InputField"
                                                    customInput={<Input style={{ width: '100%' }} />}
                                                    wrapperClassName="custom-react-datepicker-wrapper"
                                                />
                                                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                            </div>
                                            <div style={{ color: 'red' }} className="error-message">{itemWiseError.doValidityDate}</div>
                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">BL No</label>
                                            <Input
                                                type="text"
                                                name="blNo"
                                                className="form-control inputField"
                                                value={gatePassData.blNo}
                                                id='blNo'
                                                disabled
                                                onChange={handleGatePassChange}
                                            />

                                        </FormGroup>
                                    </Col>
                                    {/* <Col md={2}>
                                <Label className="inputHeader">Empty Return Yard</Label>
                                <Input
                                    type="select"
                                    name="mtyYardLocation"
                                    className="form-control"
                                    value={gatePassData.mtyYardLocation}
                                    id='mtyYardLocation'
                                    onChange={handleGatePassChange}
                                >
                                    <option value="K00898">STARMUMBAI</option>
                                    <option value="K00899">STARPIPVV</option>
                                </Input>

                            </Col> */}

                                </Row>

                                <Row>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">Importer Name</label>
                                            <Input
                                                type="text"
                                                name="importerName"
                                                className="form-control inputField"
                                                value={gatePassData.importerName}
                                                id='importerName'
                                                disabled
                                                onChange={handleGatePassChange}
                                            />

                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">CHA</label> <span className='error'>*</span>
                                            <Select

                                                value={{ value: gatePassData.cha, label: chaName }}
                                                onChange={handleChaSelect}
                                                onInputChange={handleCHAList}
                                                options={chaList}
                                                placeholder="Select CHA"
                                                isClearable
                                                id="cha"
                                                name="cha"
                                                //   className={`autocompleteHeight ${formErrors.chaCode ? 'error-border' : ''}`}

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
                                            <div style={{ color: 'red' }} className="error-message">{itemWiseError.cha}</div>
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">BE No</label> <span className='error'>*</span>
                                            <Input
                                                type="text"
                                                name="boe"
                                                className="form-control inputField"
                                                value={gatePassData.boe}
                                                id='boe'
                                                maxLength={20}
                                                onChange={handleGatePassChange}
                                            />
                                            <div style={{ color: 'red' }} className="error-message">{itemWiseError.boe}</div>
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">BE Date</label> <span className='error'>*</span>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={gatePassData.beDate}
                                                    onChange={(date) => {
                                                        setGatePassData(prevState => ({
                                                            ...prevState,
                                                            ['beDate']: date
                                                        }));
                                                        setItemWiseError(prevState => ({
                                                            ...prevState,
                                                            beDate: ""
                                                        }));
                                                        document.getElementById('beDate').classList.remove('error-border');
                                                    }}
                                                    id='beDate'
                                                    name='beDate'
                                                    dateFormat="dd/MM/yyyy"
                                                    className="form-control border-right-0 InputField"
                                                    customInput={<Input style={{ width: '100%' }} />}
                                                    wrapperClassName="custom-react-datepicker-wrapper"
                                                />
                                                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                            </div>
                                            <div style={{ color: 'red' }} className="error-message">{itemWiseError.beDate}</div>
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">Cargo Value</label> <span className='error'>*</span>
                                            <Input
                                                type="text"
                                                name="cargoValue"
                                                className="form-control inputField"
                                                value={gatePassData.cargoValue}
                                                id='cargoValue'
                                                onChange={handleGatePassChange}
                                                maxLength={20}
                                            />
                                            <div style={{ color: 'red' }} className="error-message">{itemWiseError.cargoValue}</div>
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">BL Date</label>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={gatePassData.blDate}
                                                    onChange={(date) => setGatePassData(prevState => ({
                                                        ...prevState,
                                                        ['blDate']: date
                                                    }))}
                                                    id='blDate'
                                                    name='blDate'
                                                    disabled
                                                    dateFormat="dd/MM/yyyy"
                                                    className="form-control border-right-0 InputField"
                                                    customInput={<Input style={{ width: '100%' }} />}
                                                    wrapperClassName="custom-react-datepicker-wrapper"
                                                />
                                                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                            </div>


                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">Cargo Duty</label> <span className='error'>*</span>
                                            <Input
                                                type="text"
                                                name="cargoDuty"
                                                className="form-control inputField"
                                                value={gatePassData.cargoDuty}
                                                id='cargoDuty'
                                                maxLength={20}
                                                onChange={handleGatePassChange}
                                            />
                                            <div style={{ color: 'red' }} className="error-message">{itemWiseError.cargoDuty}</div>
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">Loading Start Date</label>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={gatePassData.loadingStartDate}
                                                    onChange={(date) => {
                                                        setGatePassData(prevState => ({
                                                            ...prevState,
                                                            loadingStartDate: date,
                                                            loadingEndDate: date >= prevState.loadingEndDate ? null : prevState.loadingEndDate,
                                                        }));
                                                        // setItemWiseError(prevState => ({
                                                        //     ...prevState,
                                                        //     doDate: ""
                                                        // }));
                                                        // document.getElementById('doDate').classList.remove('error-border');
                                                    }}

                                                    id='loadingStartDate'
                                                    name='loadingStartDate'
                                                    showTimeInput
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
                                            <label className="forlabel">Loading End Date</label>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={gatePassData.loadingEndDate}
                                                    onChange={(date) => {
                                                        setGatePassData(prevState => ({
                                                            ...prevState,
                                                            loadingEndDate: date
                                                        }));
                                                        // setItemWiseError(prevState => ({
                                                        //     ...prevState,
                                                        //     doValidityDate: ""
                                                        // }));
                                                        // document.getElementById('doValidityDate').classList.remove('error-border');
                                                    }}
                                                    minDate={(() => {
                                                        const date = new Date(gatePassData.loadingStartDate);
                                                        date.setDate(date.getDate() + 1);
                                                        return date;
                                                    })()}
                                                    id='loadingEndDate'
                                                    name='loadingEndDate'
                                                    showTimeInput
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
                                            <label className="forlabel">Remarks</label>
                                            <Input
                                                type="textarea"
                                                name="comments"
                                                className="form-control inputField"
                                                value={gatePassData.comments}
                                                id='comments'
                                                onChange={handleGatePassChange}
                                                maxLength={150}
                                            />

                                        </FormGroup>
                                    </Col>
                                </Row>


                                <div className="text-center mb-3 mt-2">


                                    <Button
                                        type="submit"
                                        className="newButton"
                                        variant="outline-primary"
                                        onClick={saveLCLItemWise}
                                    >
                                        <FontAwesomeIcon
                                            icon={faSave}
                                            style={{ marginRight: "5px" }}
                                        />
                                        Save
                                    </Button>



                                    <Button
                                        type="button"
                                        className="newButton"
                                        variant="outline-danger"
                                        style={{ marginLeft: '10px' }}
                                        onClick={handleItemWiseClear}
                                    >
                                        <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
                                        Clear
                                    </Button>
                                    <Button
                                        type="button"
                                        className="newButton"
                                        variant="outline-success"
                                        style={{ marginLeft: '10px', marginRight: 10 }}
                                        onClick={openCameraModal}
                                        disabled={gatePassData.gatePassId == ''}
                                    >
                                        <FontAwesomeIcon icon={faCamera} style={{ marginRight: '5px' }} />
                                        Vehicle Photo
                                    </Button>

                                    <button
                                        className="btn btn-outline-success btn-margin newButton"
                                        style={{ marginRight: 10 }}
                                        id="submitbtn2"
                                        disabled={gatePassData.gatePassId === ''}
                                        onClick={downloadItemWiseLCLReport}
                                    >
                                        <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
                                        Print Report
                                    </button>

                                </div>



                                <hr />
                                <>
                                    <h5>Import Gate Pass - Containers/Cargo</h5>
                                    <div className="table-responsive mt-2">
                                        <Table className="table table-bordered table-hover tableHeader">
                                            <thead className="thead-dark bg-dark"  >
                                                <tr className='tableHeader' style={{ fontWeight: 'bold', fontSize: '16px' }}>
                                                    <th className="text-center" style={{ height: '50px' }}>Sr No</th>
                                                    <th className="text-center">Location</th>

                                                    <th className="text-center">Gross Wt</th>
                                                    <th className="text-center">NOP</th>
                                                    <th className="text-center">Yard Packages</th>
                                                    <th className="text-center">Area Allocated</th>
                                                    <th className="text-center">Gate Out Qty</th>
                                                    <th className="text-center">Qty Taken Out <span className='error'>*</span></th>
                                                    <th className="text-center">GW Taken Out <span className='error'>*</span></th>
                                                    <th className="text-center">Area Released</th>
                                                    <th className="text-center">Vehicle No<span style={{ color: 'red' }}>*</span></th>
                                                    {/*  <th className="text-center">Select
                                                        <Input
                                                            type="checkbox"
                                                            name="vehicleStatus"
                                                            id='vehicleStatus'
                                                            className="form-control inputField"
                                                            checked={vehicleStatus === 'N' ? true : false}
                                                            disabled={gatePassData.gatePassId === ''}
                                                            onChange={(e) => setvehicleStatus(e.target.checked ? 'N' : 'Y')}
                                                            style={{ height: 25 }}
                                                        />
                                                    </th>

                                                    <th className="text-center">Driver</th> */}
                                                </tr>

                                            </thead>
                                            <tbody>
                                                {containerData.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.yardLocation}-{item.yardBlock}-{item.blockCellNo}</td>

                                                        <td>{item.grossWt}</td>
                                                        <td>{item.noOfPackage}</td>
                                                        <td>{item.yardPackages}</td>
                                                        <td>{item.cellAreaAllocated}</td>
                                                        <td>{item.gateOutQty}</td>
                                                        <td>
                                                            <Input
                                                                type="text"
                                                                name="qtyTakenOut"
                                                                className={`form-control InputField ${itemError[index]?.qtyTakenOut ? 'error-border' : ''}`}
                                                                value={item.qtyTakenOut}
                                                                maxLength={8}
                                                                id={`qtyTakenOut${index}`}
                                                                style={{ width: 170 }}
                                                                onChange={(e) => handleContainerChange(e, index)}

                                                            />
                                                        </td>
                                                        <td>
                                                            <Input
                                                                type="text"
                                                                name="gwTakenOut"
                                                                className={`form-control InputField ${itemError[index]?.gwTakenOut ? 'error-border' : ''}`}
                                                                value={item.gwTakenOut}
                                                                maxLength={16}
                                                                id={`gwTakenOut${index}`}
                                                                style={{ width: 170 }}
                                                                onChange={(e) => handleContainerChange(e, index)}

                                                            />
                                                        </td>
                                                        <td>{item.areaReleased}</td>
                                                        <td className='text-center'>
                                                            {/* <Input
                                                    type="text"
                                                    name="vehicleNo"
                                                    className={`form-control InputField ${itemError[index]?.vehicleNo ? 'error-border' : ''}`}
                                                    value={vehicleStatus === 'Y' ? item.vehicleNo : ''}
                                                    id={`vehicleNo${index}`}
                                                    disabled={vehicleStatus === 'N'}
                                                    style={{ width: 170 }}
                                                    maxLength={15}
                                                    onChange={(e) => handleContainerChange(e, index)}

                                                /> */}

                                                            <Button
                                                                type="button"
                                                                className="newButton"
                                                                variant="outline-success"
                                                                disabled={gatePassData.gatePassId === ''}
                                                                onClick={() => openAddVehicleModal(item.igmNo, item.igmLineNo, item.gatePassId)}
                                                            >
                                                                <FontAwesomeIcon icon={faPlus} />

                                                            </Button>


                                                            {/* <Select

                                                                value={{ value: vehicleStatus === 'Y' ? item.vehicleGatePassId : '', label: vehicleStatus === 'Y' ? item.vehicleNo : '' }}
                                                                onChange={(option, actionMeta) => handleChangeVeh(option, actionMeta, index)}
                                                                onInputChange={getVehicleData}
                                                                options={vehicleData}
                                                                placeholder="Select Account Holder"
                                                                isClearable
                                                                id="vehicleNo"
                                                                isDisabled={vehicleStatus === 'N'}
                                                                name="vehicleNo"
                                                                className={`${itemError[index]?.vehicleNo ? 'error-border' : ''}`}
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
                                                                        width: 170
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
                                                            /> */}

                                                        </td>
                                                        {/* <td>No</td>


                                                        <td>
                                                            <Input
                                                                type="text"
                                                                name="driverName"
                                                                className={`form-control InputField ${itemError[index]?.driverName ? 'error-border' : ''}`}
                                                                value={vehicleStatus === 'Y' ? item.driverName : ''}
                                                                maxLength={50}
                                                                id={`driverName${index}`}
                                                                style={{ width: 170 }}
                                                                disabled={vehicleStatus === 'N'}
                                                                onChange={(e) => handleContainerChange(e, index)}

                                                            />
                                                        </td> */}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                </>
                            </>
                        ) : (
                            <>
                                <Row className='mt-4'>
                                    <Col md={2} >
                                        <FormGroup>
                                            <label className="forlabel" for="branchId">Gate Pass Id</label><span className='error'>*</span>
                                            <Row>
                                                <Col md={8}>
                                                    <Input
                                                        type="text"
                                                        name="gatePassId"
                                                        className="form-control inputField"
                                                        value={gatePassData.gatePassId}
                                                        onChange={handleGatePassChange}
                                                        disabled
                                                        id="gatePassId"
                                                    />
                                                </Col>
                                                <Col md={4}>
                                                    <Button
                                                        type="button"
                                                        className="newButton"
                                                        variant="outline-primary"
                                                        onClick={openItemwiseSearchModal}
                                                    >
                                                        <FontAwesomeIcon icon={faSearch} />

                                                    </Button>
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">Gate Pass Date</label>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={gatePassData.gatePassDate}
                                                    onChange={(date) => setGatePassData(prevState => ({
                                                        ...prevState,
                                                        ['gatePassDate']: date
                                                    }))}
                                                    id='gatePassDate'
                                                    name='gatePassDate'
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
                                        <label className="forlabel">Gate Out Type</label>
                                        <Input
                                            type="select"
                                            name="transType"
                                            className="form-control"
                                            id='transType'
                                            value={gatePassData.transType}
                                            onChange={handleGatePassChange}
                                            disabled
                                        >
                                            <option value="">Select Type</option>
                                            <option value="CONT">Container</option>
                                            <option value="FCL">Destuff</option>
                                            <option value="LCL">LCL Cargo</option>
                                        </Input>

                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">Shift</label><span className='error'>*</span>

                                            <Input
                                                type="select"
                                                name="shift"
                                                className="form-control"
                                                value={gatePassData.shift}
                                                id='shift'
                                                onChange={handleGatePassChange}
                                            >
                                                <option value="Day">Day</option>
                                                <option value="Second">Second</option>
                                                <option value="Third">Third</option>
                                            </Input>
                                            <div style={{ color: 'red' }} className="error-message">{itemWiseError.shift}</div>
                                        </FormGroup>

                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">Status</label>
                                            <Input
                                                type="text"
                                                name="status"
                                                className="form-control inputField"
                                                value={gatePassData.status === 'A' ? 'Approved' : ''}
                                                onChange={handleGatePassChange}
                                                disabled
                                                id="status"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">Created By</label>
                                            <Input
                                                type="text"
                                                name="createdBy"
                                                className="form-control inputField"
                                                value={gatePassData.createdBy}
                                                id='createdBy'
                                                disabled
                                                onChange={handleGatePassChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>


                                <Row>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">GRN No</label>
                                            <Input
                                                type="text"
                                                name="grnNo"
                                                className="form-control inputField"
                                                value={gatePassData.grnNo}
                                                id='grnNo'
                                                onChange={handleGatePassChange}
                                                maxLength={25}

                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">GRN Date</label>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={gatePassData.grnDate}
                                                    onChange={(date) => setGatePassData(prevState => ({
                                                        ...prevState,
                                                        ['grnDate']: date
                                                    }))}
                                                    id='grnDate'
                                                    name='grnDate'
                                                    dateFormat="dd/MM/yyyy"
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
                                            <label className="forlabel">Stamp Duty</label><span className='error'>*</span>
                                            <Input
                                                type="text"
                                                name="stampDuty"
                                                className="form-control inputField"
                                                value={gatePassData.stampDuty}
                                                id='stampDuty'
                                                onChange={handleGatePassChange}
                                                maxLength={16}
                                            />
                                            <div style={{ color: 'red' }} className="error-message">{itemWiseError.stampDuty}</div>
                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">CIN No</label>
                                            <Input
                                                type="text"
                                                name="cinNo"
                                                className="form-control inputField"
                                                value={gatePassData.cinNo}
                                                id='cinNo'
                                                onChange={handleGatePassChange}
                                                maxLength={25}
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">CIN Date</label>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={gatePassData.cinDate}
                                                    onChange={(date) => setGatePassData(prevState => ({
                                                        ...prevState,
                                                        ['cinDate']: date
                                                    }))}
                                                    id='cinDate'
                                                    name='cinDate'
                                                    dateFormat="dd/MM/yyyy"
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
                                            <label className="forlabel">Do No</label>
                                            <Input
                                                type="text"
                                                name="doNo"
                                                className="form-control inputField"
                                                value={gatePassData.doNo}
                                                id='doNo'
                                                onChange={handleGatePassChange}
                                                maxLength={30}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">OOC No</label><span className='error'>*</span>
                                            <Input
                                                type="text"
                                                name="oocNo"
                                                className="form-control inputField"
                                                value={gatePassData.oocNo}
                                                id='oocNo'
                                                onChange={handleGatePassChange}
                                                maxLength={20}
                                            />
                                            <div style={{ color: 'red' }} className="error-message">{itemWiseError.oocNo}</div>
                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">OOC Date</label><span className='error'>*</span>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={gatePassData.oocDate}
                                                    onChange={(date) => {
                                                        setGatePassData(prevState => ({
                                                            ...prevState,
                                                            oocDate: date
                                                        }));
                                                        setItemWiseError(prevState => ({
                                                            ...prevState,
                                                            oocDate: ""
                                                        }));
                                                        document.getElementById('oocDate').classList.remove('error-border');
                                                    }}
                                                    id='oocDate'
                                                    name='oocDate'
                                                    showTimeInput
                                                    dateFormat="dd/MM/yyyy HH:mm"
                                                    className="form-control border-right-0 InputField"
                                                    customInput={<Input style={{ width: '100%' }} />}
                                                    wrapperClassName="custom-react-datepicker-wrapper"
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
                                            <div style={{ color: 'red' }} className="error-message">
                                                {itemWiseError.oocDate}
                                            </div>
                                        </FormGroup>

                                    </Col>


                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">DO Date</label><span className='error'>*</span>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={gatePassData.doDate}
                                                    onChange={(date) => {
                                                        setGatePassData(prevState => ({
                                                            ...prevState,
                                                            doDate: date,
                                                            doValidityDate: date >= prevState.doValidityDate ? null : prevState.doValidityDate,
                                                        }));
                                                        setItemWiseError(prevState => ({
                                                            ...prevState,
                                                            doDate: ""
                                                        }));
                                                        document.getElementById('doDate').classList.remove('error-border');
                                                    }}

                                                    id='doDate'
                                                    name='doDate'
                                                    showTimeInput
                                                    dateFormat="dd/MM/yyyy HH:mm"
                                                    className="form-control border-right-0 InputField"
                                                    customInput={<Input style={{ width: '100%' }} />}
                                                    wrapperClassName="custom-react-datepicker-wrapper"
                                                />
                                                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                            </div>
                                            <div style={{ color: 'red' }} className="error-message">{itemWiseError.doDate}</div>
                                        </FormGroup>
                                    </Col>


                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel">DO Validity Date</label><span className='error'>*</span>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={gatePassData.doValidityDate}
                                                    onChange={(date) => {
                                                        setGatePassData(prevState => ({
                                                            ...prevState,
                                                            doValidityDate: date
                                                        }));
                                                        setItemWiseError(prevState => ({
                                                            ...prevState,
                                                            doValidityDate: ""
                                                        }));
                                                        document.getElementById('doValidityDate').classList.remove('error-border');
                                                    }}
                                                    minDate={(() => {
                                                        const date = new Date(gatePassData.doDate);
                                                        date.setDate(date.getDate() + 1);
                                                        return date;
                                                    })()}
                                                    id='doValidityDate'
                                                    name='doValidityDate'

                                                    dateFormat="dd/MM/yyyy"
                                                    className="form-control border-right-0 InputField"
                                                    customInput={<Input style={{ width: '100%' }} />}
                                                    wrapperClassName="custom-react-datepicker-wrapper"
                                                />
                                                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                            </div>
                                            <div style={{ color: 'red' }} className="error-message">{itemWiseError.doValidityDate}</div>
                                        </FormGroup>
                                    </Col>


                                    {/* <Col md={2}>
                                <Label className="inputHeader">Empty Return Yard</Label>
                                <Input
                                    type="select"
                                    name="mtyYardLocation"
                                    className="form-control"
                                    value={gatePassData.mtyYardLocation}
                                    id='mtyYardLocation'
                                    onChange={handleGatePassChange}
                                >
                                    <option value="K00898">STARMUMBAI</option>
                                    <option value="K00899">STARPIPVV</option>
                                </Input>

                            </Col> */}

                                    <Col md={2}>

                                        <FormGroup>
                                            <label className="forlabel">Comments</label>
                                            <Input
                                                type="textarea"
                                                name="comments"
                                                className="form-control inputField"
                                                value={gatePassData.comments}
                                                id='comments'
                                                onChange={handleGatePassChange}
                                                maxLength={150}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>


                                <div className="text-center mb-3 mt-2">


                                    <Button
                                        type="submit"
                                        className="newButton"
                                        variant="outline-primary"
                                        onClick={gatePassData.transType === 'CONT' ? saveItemWise : saveItemWiseDestuff}
                                    >
                                        <FontAwesomeIcon
                                            icon={faSave}
                                            style={{ marginRight: "5px" }}
                                        />
                                        Save
                                    </Button>



                                    <Button
                                        type="button"
                                        className="newButton"
                                        variant="outline-danger"
                                        style={{ marginLeft: '10px' }}
                                        onClick={handleItemWiseClear}
                                    >
                                        <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
                                        Clear
                                    </Button>
                                    <Button
                                        type="button"
                                        className="newButton"
                                        variant="outline-success"
                                        style={{ marginLeft: '10px', marginRight: 10 }}
                                        onClick={openCameraModal}
                                        disabled={gatePassData.gatePassId == ''}
                                    >
                                        <FontAwesomeIcon icon={faCamera} style={{ marginRight: '5px' }} />
                                        Vehicle Photo
                                    </Button>
                                    <button
                                        className="btn btn-outline-success btn-margin newButton"
                                        style={{ marginRight: 10 }}
                                        id="submitbtn2"
                                        disabled={gatePassData.gatePassId === ''}
                                        onClick={downloadItemWiseFCLReport}
                                    >
                                        <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
                                        Print Report
                                    </button>

                                </div>



                                <hr />
                                <>
                                    <h5>Import Gate Pass - Containers/Cargo</h5>
                                    {gatePassData.transType === 'CONT' ? (
                                        <div className="table-responsive mt-2">
                                            <Table className="table table-bordered table-hover tableHeader">
                                                <thead className="thead-dark bg-dark"  >
                                                    <tr className='tableHeader' style={{ fontWeight: 'bold', fontSize: '16px' }}>
                                                        <th className="text-center" style={{ height: '50px' }}>Sr No</th>
                                                        <th className="text-center">Container No</th>
                                                        <th className="text-center">Size/Type</th>
                                                        <th className="text-center">Vehicle No<span style={{ color: 'red' }}>*</span></th>
                                                        <th className="text-center">Select
                                                            <Input
                                                                type="checkbox"
                                                                name="vehicleStatus"
                                                                id='vehicleStatus'
                                                                className="form-control inputField"
                                                                checked={vehicleStatus === 'N' ? true : false}
                                                                onChange={(e) => setvehicleStatus(e.target.checked ? 'N' : 'Y')}
                                                                disabled={gatePassData.gatePassId !== ''}
                                                                style={{ height: 25 }}
                                                            />
                                                        </th>
                                                        <th className="text-center">VIA No</th>
                                                        <th className="text-center">BL No</th>
                                                        <th className="text-center">Impoter name</th>
                                                        <th className="text-center">CHA</th>
                                                        <th className="text-center">BE No</th>
                                                        <th className="text-center">Location</th>

                                                        <th className="text-center">NOP</th>
                                                        <th className="text-center">Gross Wt</th>
                                                        {gatePassData.transType === 'FCL' && (<th className="text-center">Gate Out Qty</th>)}
                                                        {gatePassData.transType === 'FCL' && (<th className="text-center">Qty Taken Out</th>)}
                                                        {gatePassData.transType === 'FCL' && (<th className="text-center">GW Taken Out</th>)}
                                                        <th className="text-center">Driver<span style={{ color: 'red' }}>*</span></th>
                                                    </tr>

                                                </thead>
                                                <tbody>
                                                    {containerData.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.containerNo}
                                                                {item.holdStatus === 'H' ? <><br /><span style={{ color: 'red' }}>Container is hold</span></> : ''}
                                                            </td>
                                                            <td>{item.containerSize}/{item.containerType}</td>
                                                            <td>
                                                                {/* <Input
             type="text"
             name="vehicleNo"
             className={`form-control InputField ${itemError[index]?.vehicleNo ? 'error-border' : ''}`}
             value={vehicleStatus === 'Y' ? item.vehicleNo : ''}
             id={`vehicleNo${index}`}
             disabled={vehicleStatus === 'N'}
             style={{ width: 170 }}
             maxLength={15}
             onChange={(e) => handleContainerChange(e, index)}

         /> */}


                                                                <Select

                                                                    value={{ value: vehicleStatus === 'Y' ? item.vehicleGatePassId : '', label: vehicleStatus === 'Y' ? item.vehicleNo : '' }}
                                                                    onChange={(option, actionMeta) => handleChangeVeh(option, actionMeta, index)}
                                                                    onInputChange={getVehicleData}
                                                                    options={vehicleData}
                                                                    placeholder="Select Account Holder"
                                                                    isClearable
                                                                    id="vehicleNo"
                                                                    isDisabled={vehicleStatus === 'N' || gatePassData.gatePassId !== ''}
                                                                    name="vehicleNo"
                                                                    className={`${itemError[index]?.vehicleNo ? 'error-border' : ''}`}
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
                                                                            width: 170
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
                                                                {/* <Button
                         type="button"
                         className="newButton"
                         variant="outline-success"
                         disabled={!item.qtyTakenOut}
                         onClick={() => openAddVehicleModal(item.igmNo, item.igmLineNo, item.gatePassId)}
                     >
                         <FontAwesomeIcon icon={faPlus} />

                     </Button> */}
                                                            </td>
                                                            <td>No</td>
                                                            <td>{item.viaNo}</td>
                                                            <td>{item.blNo}</td>
                                                            <td>{item.importerName}</td>
                                                            <td>{item.cha}</td>
                                                            <td>{item.boe}</td>
                                                            <td>{item.yardLocation}-{item.yardBlock}-{item.blockCellNo}</td>
                                                            <td>{item.noOfPackage}</td>
                                                            <td>{item.grossWt}</td>
                                                            {gatePassData.transType === 'FCL' ? (<td>{item.gateOutQty}</td>) : (<></>)}
                                                            {gatePassData.transType === 'FCL' ? (<td>
                                                                <Input
                                                                    type="text"
                                                                    name="qtyTakenOut"
                                                                    className={`form-control InputField ${itemError[index]?.qtyTakenOut ? 'error-border' : ''}`}
                                                                    value={item.qtyTakenOut}
                                                                    maxLength={8}
                                                                    id={`qtyTakenOut${index}`}
                                                                    style={{ width: 170 }}
                                                                    onChange={(e) => handleContainerChange(e, index)}

                                                                />
                                                            </td>) : (<></>)}
                                                            {gatePassData.transType === 'FCL' ? (<td>
                                                                <Input
                                                                    type="text"
                                                                    name="gwTakenOut"
                                                                    className={`form-control InputField ${itemError[index]?.gwTakenOut ? 'error-border' : ''}`}
                                                                    value={item.gwTakenOut}
                                                                    maxLength={16}
                                                                    id={`gwTakenOut${index}`}
                                                                    style={{ width: 170 }}
                                                                    onChange={(e) => handleContainerChange(e, index)}

                                                                />
                                                            </td>) : (<></>)}
                                                            <td>
                                                                <Input
                                                                    type="text"
                                                                    name="driverName"
                                                                    className={`form-control InputField ${itemError[index]?.driverName ? 'error-border' : ''}`}
                                                                    value={vehicleStatus === 'Y' ? item.driverName : ''}
                                                                    maxLength={50}
                                                                    id={`driverName${index}`}
                                                                    style={{ width: 170 }}
                                                                    disabled={vehicleStatus === 'N' || gatePassData.gatePassId !== ''}
                                                                    onChange={(e) => handleContainerChange(e, index)}

                                                                />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    )
                                        :
                                        (
                                            <div className="table-responsive mt-2">
                                                <Table className="table table-bordered table-hover tableHeader">
                                                    <thead className="thead-dark bg-dark"  >
                                                        <tr className='tableHeader' style={{ fontWeight: 'bold', fontSize: '16px' }}>

                                                            {gatePassData.gatePassId === '' && (
                                                                <th scope="col" className="text-center" style={{ color: 'black' }}>
                                                                    <Input
                                                                        type="checkbox"
                                                                        className="form-check-Input radios"
                                                                        style={{ width: 25, height: 25 }}
                                                                        name='selectAll'
                                                                        id='selectAll'
                                                                        checked={selectAllChecked}
                                                                        onChange={handleSelectAll}
                                                                        onKeyDown={(e) => e.key === "Enter" && handleSelectAll()}
                                                                    />
                                                                </th>
                                                            )}


                                                            <th className="text-center">Container No</th>
                                                            <th className="text-center">Size/Type</th>
                                                            <th className="text-center">Vehicle No<span style={{ color: 'red' }}>*</span></th>

                                                            <th className="text-center">VIA No</th>
                                                            <th className="text-center">BL No</th>
                                                            <th className="text-center">Impoter name</th>
                                                            <th className="text-center">CHA</th>
                                                            <th className="text-center">BE No</th>
                                                            <th className="text-center">Location</th>

                                                            <th className="text-center">NOP</th>
                                                            <th className="text-center">Gross Wt</th>
                                                            {gatePassData.transType === 'FCL' && (<th className="text-center">Gate Out Qty</th>)}
                                                            {gatePassData.transType === 'FCL' && (<th className="text-center">Qty Taken Out<span style={{ color: 'red' }}>*</span></th>)}
                                                            {gatePassData.transType === 'FCL' && (<th className="text-center">GW Taken Out<span style={{ color: 'red' }}>*</span></th>)}

                                                        </tr>

                                                    </thead>
                                                    <tbody>
                                                        {containerData.map((item, index) => (
                                                            <tr key={index}>
                                                                {gatePassData.gatePassId === '' && (
                                                                    <td>
                                                                        <input
                                                                            type="checkbox"
                                                                            className="form-check-input radios"
                                                                            style={{ width: 25, height: 25 }}
                                                                            checked={selectedData.some(selectedItem => selectedItem.containerNo === item.containerNo)}
                                                                            onChange={() => handleCheckboxChange(item)}
                                                                            disabled={item.holdStatus === 'H'}
                                                                            onKeyDown={(e) => e.key === "Enter" && handleCheckboxChange(item)}
                                                                        />
                                                                    </td>)}
                                                                <td>{item.containerNo}
                                                                    {item.holdStatus === 'H' ? <><br /><span style={{ color: 'red' }}>Container is hold</span></> : ''}
                                                                </td>
                                                                <td>{item.containerSize}/{item.containerType}</td>
                                                                <td>
                                                                    {/* <Input
                                                type="text"
                                                name="vehicleNo"
                                                className={`form-control InputField ${itemError[index]?.vehicleNo ? 'error-border' : ''}`}
                                                value={vehicleStatus === 'Y' ? item.vehicleNo : ''}
                                                id={`vehicleNo${index}`}
                                                disabled={vehicleStatus === 'N'}
                                                style={{ width: 170 }}
                                                maxLength={15}
                                                onChange={(e) => handleContainerChange(e, index)}

                                            /> */}


                                                                    {/* <Select

                                                                        value={{ value: vehicleStatus === 'Y' ? item.vehicleGatePassId : '', label: vehicleStatus === 'Y' ? item.vehicleNo : '' }}
                                                                        onChange={(option, actionMeta) => handleChangeVeh(option, actionMeta, index)}
                                                                        onInputChange={getVehicleData}
                                                                        options={vehicleData}
                                                                        placeholder="Select Account Holder"
                                                                        isClearable
                                                                        id="vehicleNo"
                                                                        isDisabled={vehicleStatus === 'N'}
                                                                        name="vehicleNo"
                                                                        className={`${itemError[index]?.vehicleNo ? 'error-border' : ''}`}
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
                                                                                width: 170
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
                                                                    /> */}
                                                                    <Button
                                                                        type="button"
                                                                        className="newButton"
                                                                        variant="outline-success"
                                                                        disabled={gatePassData.gatePassId === ''}
                                                                        onClick={() => openAddVehicleModal(item.igmNo, item.igmLineNo, item.gatePassId)}
                                                                    >
                                                                        <FontAwesomeIcon icon={faPlus} />

                                                                    </Button>
                                                                </td>

                                                                <td>{item.viaNo}</td>
                                                                <td>{item.blNo}</td>
                                                                <td>{item.importerName}</td>
                                                                <td>{item.cha}</td>
                                                                <td>{item.boe}</td>
                                                                <td>{item.yardLocation}-{item.yardBlock}-{item.blockCellNo}</td>
                                                                <td>{item.noOfPackage}</td>
                                                                <td>{item.grossWt}</td>
                                                                {gatePassData.transType === 'FCL' ? (<td>{item.gateOutQty}</td>) : (<></>)}
                                                                {gatePassData.transType === 'FCL' ? (<td>
                                                                    <Input
                                                                        type="text"
                                                                        name="qtyTakenOut"
                                                                        className={`form-control InputField ${itemError[index]?.qtyTakenOut ? 'error-border' : ''}`}
                                                                        value={item.qtyTakenOut}
                                                                        maxLength={8}
                                                                        id={`qtyTakenOut${index}`}
                                                                        disabled={gatePassData.gatePassId !== ''}
                                                                        style={{ width: 170 }}
                                                                        onChange={(e) => handleContainerChange(e, index)}

                                                                    />
                                                                </td>) : (<></>)}
                                                                {gatePassData.transType === 'FCL' ? (<td>
                                                                    <Input
                                                                        type="text"
                                                                        name="gwTakenOut"
                                                                        className={`form-control InputField ${itemError[index]?.gwTakenOut ? 'error-border' : ''}`}
                                                                        value={item.gwTakenOut}
                                                                        maxLength={16}
                                                                        disabled={gatePassData.gatePassId !== ''}
                                                                        id={`gwTakenOut${index}`}
                                                                        style={{ width: 170 }}
                                                                        onChange={(e) => handleContainerChange(e, index)}

                                                                    />
                                                                </td>) : (<></>)}

                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        )

                                    }
                                </>
                            </>
                        )}


                    </>
                )}

                {selectSealCuttingType === 'containerwise' && (
                    <>
                        <Modal Modal isOpen={isModalForOpenContwiseSearch} onClose={closeContwiseSearchModal} toggle={closeContwiseSearchModal} style={{ maxWidth: '1200px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                            <ModalHeader toggle={closeContwiseSearchModal} style={{
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
                                /> Search Gate Pass Data</h5>



                            </ModalHeader>
                            <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                                <Row>
                                    <Col md={5}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Search By Container No/Gate Pass Id/IGM No/IGM Line No
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="fobValueInDollar"
                                                value={searchVal}
                                                onChange={(e) => setSearchVal(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6} style={{ marginTop: 25 }}>
                                        <button
                                            className="btn btn-outline-primary btn-margin newButton"
                                            style={{ marginRight: 10 }}

                                            id="submitbtn2"
                                            onClick={() => { searchByContWise(searchVal); setCurrentPage2(1); }}
                                        >
                                            <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                            Search
                                        </button>
                                        <button
                                            className="btn btn-outline-danger btn-margin newButton"
                                            id="submitbtn2"
                                            onClick={() => { clearItemWise() }}
                                        >
                                            <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
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
                                                <th scope="col">Container No</th>
                                                <th scope="col">Gate Pass Id</th>
                                                <th scope="col">Gate Pass Date</th>
                                                <th scope="col">IGM No</th>
                                                <th scope="col">IGM Line No</th>
                                                <th scope="col">Trans Type</th>
                                                <th scope="col">Invoice No</th>
                                                <th scope="col">Party Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* <tr>
                    <td><input type="radio" name="radioGroup" value="" /></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr> */}
                                            {currentItems2.map((item, index) => (
                                                <tr key={index}>
                                                    <td><input type="radio" onChange={() => selectContWiseSearch(item[4], item[0])} name="radioGroup" value="" /></td>
                                                    <td>{item[10]}</td>
                                                    <td>{item[0]}</td>
                                                    <td>{item[7]}</td>
                                                    <td>{item[4]}</td>
                                                    <td>{item[5]}</td>
                                                    <td>{item[8]}</td>
                                                    <td>{item[3]}</td>
                                                    <td>{item[9]}</td>
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
                            </ModalBody>
                        </Modal>
                        <Modal Modal isOpen={isModalOpenForCamera} onClose={closeCameraModal} toggle={closeCameraModal} style={{ maxWidth: '1000px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                            <ModalHeader toggle={closeCameraModal} style={{
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
                                    icon={faCameraAlt}
                                    style={{
                                        marginRight: '8px',
                                        color: 'white', // Set the color to golden
                                    }}
                                /> Capture Visitor Photo</h5>



                            </ModalHeader>
                            <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                                <div className='container'>
                                    <div>
                                        <Row>
                                            <Col md={6}>

                                                <div style={{ marginTop: '20px' }}>
                                                    <div style={{ fontSize: 18, fontWeight: 800 }}>Live Camera</div>
                                                    <video ref={videoRef} autoPlay style={{ width: '100%', maxWidth: '600px' }} />
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                {photo && (
                                                    <div style={{ marginTop: '20px' }}>
                                                        <div style={{ fontSize: 18, fontWeight: 800 }}>Captured Image</div>
                                                        <img src={photo} alt="Captured" style={{ width: '100%', maxWidth: '600px' }} />
                                                    </div>
                                                )}
                                            </Col>
                                        </Row>

                                        <Row className='text-center'>
                                            <Col md={6}>
                                                <Button
                                                    type="button"
                                                    className="newButton"
                                                    variant="outline-success"
                                                    style={{ marginTop: '27px' }}
                                                    onClick={isCameraOn ? closeCameraModal : startCamera}
                                                >
                                                    <FontAwesomeIcon icon={faCamera} style={{ marginRight: '5px' }} />
                                                    {isCameraOn ? "Stop Camera" : "Start Camera"}
                                                </Button>

                                                {isCameraOn && <Button type="button"
                                                    className="newButton"
                                                    variant="outline-danger"
                                                    style={{ marginTop: '27px', marginLeft: 10 }} onClick={capturePhoto}>
                                                    <FontAwesomeIcon icon={faCameraRotate} style={{ marginRight: '5px' }} />
                                                    Capture Photo</Button>}
                                            </Col>
                                            <Col md={6}>
                                                {photo && (
                                                    <Button
                                                        type="button"
                                                        className="newButton"
                                                        variant="outline-success"
                                                        style={{ marginTop: '27px' }}
                                                        onClick={uploadPhoto1}
                                                    >
                                                        <FontAwesomeIcon icon={faUpload} style={{ marginRight: '5px' }} />
                                                        Upload Image
                                                    </Button>
                                                )}
                                            </Col>
                                        </Row>

                                        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

                                    </div>


                                </div>
                            </ModalBody>
                        </Modal>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label">IGM No</label>
                                <Input
                                    type="text"
                                    name="IGM No"
                                    className="form-control inputField"
                                    value={containerWiseIgm}
                                    onChange={(e) => setcontainerWiseIgm(e.target.value)}
                                />
                            </FormGroup>
                        </Col>



                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel">Container No</label>
                                {(igm && !item && !cont) ? (
                                    <Input
                                        className="form-control"
                                        type="select"
                                        id="fobValueInDollar"
                                        value={containerWiseCon}
                                        onChange={(e) => setcontainerWiseCon(e.target.value)}
                                    >
                                        <option value="">Select Container</option>
                                        {conSearchList.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}

                                    </Input>
                                )
                                    :
                                    (
                                        <Input
                                            type="text"
                                            name="Item No"
                                            className="form-control inputField"
                                            value={containerWiseCon}
                                            onChange={(e) => setcontainerWiseCon(e.target.value)}
                                        />
                                    )}
                            </FormGroup>
                        </Col>

                        <Col md={2}>

                            <Button
                                type="button"
                                className="newButton"
                                variant="outline-success"
                                style={{ marginTop: '27px' }}
                                onClick={() => getContainerWiseData(containerWiseIgm, containerWiseCon)}
                            >
                                <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                                Search
                            </Button>
                        </Col>


                        <Row className='mt-4'>
                            <Col md={2} >
                                <FormGroup>
                                    <label className="forlabel" for="branchId">Gate Pass Id</label><span className='error'>*</span>
                                    <Row>
                                        <Col md={8}>
                                            <Input
                                                type="text"
                                                name="gatePassId"
                                                className="form-control inputField"
                                                id="gatePassId"
                                                value={gatePassContainerData.gatePassId}
                                                onChange={handleContainerGatePassChange}
                                                disabled
                                            />
                                        </Col>
                                        <Col md={4}>

                                            <Button
                                                type="button"
                                                className="newButton"
                                                variant="outline-primary"
                                                style={{ marginTop: '0px' }}
                                                onClick={openContwiseSearchModal}
                                            >
                                                <FontAwesomeIcon icon={faSearch} />
                                            </Button>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>

                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel">Gate Pass Date</label>
                                    <div style={{ position: 'relative' }}>
                                        <DatePicker
                                            selected={gatePassContainerData.gatePassDate}
                                            id='gatePassDate'
                                            name='gatePassDate'
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
                                <label className="forlabel">Gate Out Type</label>
                                <Input
                                    type="select"
                                    name="transType"
                                    className="form-control"
                                    value={gatePassContainerData.transType}
                                    onChange={handleContainerGatePassChange}
                                    id='transType'
                                    disabled
                                >

                                    <option value="CONT">Container</option>
                                </Input>

                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel">Shift</label>

                                    <Input
                                        type="select"
                                        name="shift"
                                        className="form-control"
                                        value={gatePassContainerData.shift}
                                        id='shift'
                                        onChange={handleContainerGatePassChange}
                                    >
                                        <option value="Day">Day</option>
                                        <option value="Second">Second</option>
                                        <option value="Third">Third</option>
                                    </Input>

                                </FormGroup>

                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel">Status</label>
                                    <Input
                                        type="text"
                                        name="status"
                                        className="form-control inputField"
                                        value={gatePassContainerData.status === 'A' ? 'Approved' : ''}
                                        onChange={handleContainerGatePassChange}
                                        disabled
                                        id="status"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel">Created By</label>
                                    <Input
                                        type="text"
                                        name="createdBy"
                                        className="form-control inputField"
                                        value={gatePassContainerData.createdBy}
                                        onChange={handleContainerGatePassChange}
                                        disabled
                                        id="createdBy"
                                    />
                                </FormGroup>
                            </Col>

                        </Row>


                        <Row>


                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel">Vehicle No</label><span className='error'>*</span>
                                    <Row>
                                        <Col md={9}>
                                            {/* <Input
                                                type="text"
                                                name="vehicleNo"
                                                disabled={gatePassContainerData.vehStatus === 'Y'}
                                                className={`form-control InputField ${containerWiseError.vehicleNo ? 'error-border' : ''}`}
                                                value={gatePassContainerData.vehStatus === 'Y' ? gatePassContainerData.vehicleNo : ''}
                                                onChange={handleContainerGatePassChange}
                                                id='vehicleNo'
                                            /> */}
                                            <Select
                                                value={{ value: gatePassContainerData.vehStatus === 'Y' ? gatePassContainerData.vehicleGatePassId : '', label: gatePassContainerData.vehStatus === 'Y' ? gatePassContainerData.vehicleNo : '' }}
                                                onChange={handleChangeSingleVeh}
                                                onInputChange={getVehicleData}
                                                options={vehicleData}
                                                placeholder="Select Vehicle No"
                                                isClearable
                                                id="vehicleNo"
                                                isDisabled={gatePassContainerData.vehStatus === 'N'}
                                                name="vehicleNo"
                                                className={`autocompleteHeight ${containerWiseError.vehicleNo ? 'error-border' : ''}`}

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
                                            <div style={{ color: 'red' }} className="error-message">{containerWiseError.vehicleNo}</div>
                                        </Col>
                                        <Col md={1}>
                                            <Input
                                                type="checkbox"
                                                name="vehStatus"
                                                style={{ height: 25 }}

                                                className={`form-control InputField `}
                                                checked={gatePassContainerData.vehStatus === 'N'}
                                                onChange={(e) => setGatePassContainerData({
                                                    ...gatePassContainerData,
                                                    vehStatus: e.target.checked ? 'N' : 'Y'
                                                })}
                                                id='vehStatus'
                                            />

                                        </Col>
                                    </Row>
                                </FormGroup>
                            </Col>


                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel">Driver</label><span className='error'>*</span>
                                    <Input
                                        type="text"
                                        name="driverName"
                                        id='driverName'
                                        disabled={gatePassContainerData.vehStatus === 'N'}
                                        className={`form-control InputField ${containerWiseError.driverName ? 'error-border' : ''}`}
                                        value={gatePassContainerData.vehStatus === 'Y' ? gatePassContainerData.driverName : ''}
                                        onChange={handleContainerGatePassChange}

                                    />
                                    <div style={{ color: 'red' }} className="error-message">{containerWiseError.driverName}</div>
                                </FormGroup>
                            </Col>








                            <Col md={2}>

                                <label className="forlabel">DPD Status</label>
                                <Input
                                    type="select"
                                    name="dpdFlag"
                                    id='dpdFlag'
                                    className="form-control"
                                    value={gatePassContainerData.dpdFlag}
                                    onChange={handleContainerGatePassChange}
                                >
                                    <option value="N">No</option>
                                    <option value="Y">Yes</option>

                                </Input>


                            </Col>


                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel">OOC No</label><span className='error'>*</span>
                                    <Input
                                        type="text"
                                        name="oocNo"
                                        className={`form-control InputField ${containerWiseError.oocNo ? 'error-border' : ''}`}
                                        id='oocNo'
                                        value={gatePassContainerData.oocNo}
                                        onChange={handleContainerGatePassChange}

                                    />
                                    <div style={{ color: 'red' }} className="error-message">{containerWiseError.oocNo}</div>
                                </FormGroup>
                            </Col>

                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel">OOC Date</label><span className='error'>*</span>
                                    <div style={{ position: 'relative' }}>
                                        <DatePicker
                                            selected={gatePassContainerData.oocDate}
                                            onChange={(date) => {
                                                setGatePassContainerData(prevState => ({
                                                    ...prevState,
                                                    oocDate: date,
                                                }));
                                                setcontainerWiseError(prevState => ({
                                                    ...prevState,
                                                    oocDate: ""
                                                }));
                                                document.getElementById('oocDate').classList.remove('error-border');
                                            }}
                                            id='oocDate'
                                            name='oocDate'
                                            showTimeInput
                                            dateFormat="dd/MM/yyyy HH:mm"
                                            className={`form-control border-right-0 InputField ${containerWiseError.oocDate ? 'error-border' : ''}`}

                                            customInput={<Input style={{ width: '100%' }} />}
                                            wrapperClassName="custom-react-datepicker-wrapper"
                                        />
                                        <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                    </div>
                                    <div style={{ color: 'red' }} className="error-message">{containerWiseError.oocDate}</div>
                                </FormGroup>
                            </Col>





                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel">Do No</label>
                                    <Input
                                        type="text"
                                        name="doNo"
                                        id='doNo'
                                        className="form-control inputField"
                                        value={gatePassContainerData.doNo}
                                        onChange={handleContainerGatePassChange}

                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel">DO Date</label><span className='error'>*</span>
                                    <div style={{ position: 'relative' }}>
                                        <DatePicker
                                            selected={gatePassContainerData.doDate}
                                            onChange={(date) => {
                                                setGatePassContainerData(prevState => ({
                                                    ...prevState,
                                                    doDate: date,
                                                    doValidityDate: date >= prevState.doValidityDate ? null : prevState.doValidityDate,
                                                }));
                                                setcontainerWiseError(prevState => ({
                                                    ...prevState,
                                                    doDate: ""
                                                }));
                                                document.getElementById('doDate').classList.remove('error-border');
                                            }}
                                            showTimeInput
                                            id='doDate'
                                            name='doDate'
                                            dateFormat="dd/MM/yyyy HH:mm"
                                            className={`form-control border-right-0 InputField ${containerWiseError.doDate ? 'error-border' : ''}`}
                                            customInput={<Input style={{ width: '100%' }} />}
                                            wrapperClassName="custom-react-datepicker-wrapper"
                                        />
                                        <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                    </div>
                                    <div style={{ color: 'red' }} className="error-message">{containerWiseError.doDate}</div>
                                </FormGroup>
                            </Col>


                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel">DO Validity Date</label><span className='error'>*</span>
                                    <div style={{ position: 'relative' }}>
                                        <DatePicker
                                            selected={gatePassContainerData.doValidityDate}
                                            onChange={(date) => {
                                                setGatePassContainerData(prevState => ({
                                                    ...prevState,
                                                    doValidityDate: date
                                                }));
                                                setcontainerWiseError(prevState => ({
                                                    ...prevState,
                                                    doValidityDate: ""
                                                }));
                                                document.getElementById('doValidityDate').classList.remove('error-border');
                                            }}
                                            minDate={(() => {
                                                const date = new Date(gatePassContainerData.doDate);
                                                date.setDate(date.getDate() + 1);
                                                return date;
                                            })()}
                                            id='doValidityDate'
                                            name='doValidityDate'
                                            dateFormat="dd/MM/yyyy"
                                            className={`form-control border-right-0 InputField ${containerWiseError.doValidityDate ? 'error-border' : ''}`}
                                            customInput={<Input style={{ width: '100%' }} />}
                                            wrapperClassName="custom-react-datepicker-wrapper"
                                        />
                                        <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                    </div>
                                    <div style={{ color: 'red' }} className="error-message">{containerWiseError.doValidityDate}</div>
                                </FormGroup>
                            </Col>

                            <Col md={2}>

                                <FormGroup>
                                    <label className="forlabel">Comments</label>
                                    <Input
                                        type="textarea"
                                        name="comments"
                                        className="form-control inputField"
                                        value={gatePassContainerData.comments}
                                        onChange={handleContainerGatePassChange}
                                        id='comments'
                                    />
                                </FormGroup>
                            </Col>
                            {/* <Col md={2}>
                                <Label className="inputHeader">Empty Return Yard</Label>
                                <Input
                                    type="select"
                                    name="mtyYardLocation"
                                    id='mtyYardLocation'
                                    className="form-control"
                                    value={gatePassContainerData.mtyYardLocation}
                                    onChange={handleContainerGatePassChange}
                                >
                                    <option value="K00898">STARMUMBAI</option>
                                    <option value="K00899">STARPIPVV</option>
                                </Input>

                            </Col> */}

                        </Row>



                        <div className="text-center mb-3 mt-2">


                            <Button
                                type="submit"
                                className="newButton"
                                variant="outline-primary"
                                onClick={saveContainerWiseData}
                            >
                                <FontAwesomeIcon
                                    icon={faSave}
                                    style={{ marginRight: "5px" }}
                                />
                                Save
                            </Button>



                            <Button
                                type="button"
                                className="newButton"
                                variant="outline-danger"
                                onClick={handleContainerWiseError}
                                style={{ marginLeft: '10px' }}
                            >
                                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
                                Clear
                            </Button>

                            <Button
                                type="button"
                                className="newButton"
                                variant="outline-success"
                                style={{ marginLeft: '10px', marginRight: 10 }}
                                onClick={openCameraModal1}
                                disabled={gatePassContainerData.gatePassId == ''}
                            >
                                <FontAwesomeIcon icon={faCamera} style={{ marginRight: '5px' }} />
                                Vehicle Photo
                            </Button>
                            <button
                                className="btn btn-outline-success btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                disabled={gatePassContainerData.gatePassId === ''}
                                onClick={downloadContWiseFCLReport}
                            >
                                <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
                                Print Report
                            </button>
                        </div>


                        <hr />
                        <>
                            <h5>Import Gate Pass - Containers</h5>
                            <div className="table-responsive mt-2">
                                <Table className="table table-bordered table-hover tableHeader">
                                    <thead className="thead-dark bg-dark"  >
                                        <tr className='tableHeader' style={{ fontWeight: 'bold', fontSize: '16px' }}>
                                            <th className="text-center" style={{ height: '50px' }}>Sr No</th>
                                            <th className="text-center">Item No</th>
                                            <th className="text-center">Size/Type</th>
                                            <th className="text-center">VIA No</th>
                                            <th className="text-center">BL No</th>
                                            <th className="text-center">Impoter name</th>
                                            <th className="text-center">CHA</th>
                                            <th className="text-center">BE No</th>
                                            <th className="text-center">Location</th>
                                            <th className="text-center">NOP</th>
                                            <th className="text-center">Gross Wt</th>

                                            <th className="text-center">GRN No</th>
                                            <th className="text-center">GRN Date</th>


                                            <th className="text-center">Stamp Duty <span className='error'>*</span></th>
                                            <th className="text-center">CIN No</th>
                                            <th className="text-center">CIN Date</th>
                                        </tr>

                                    </thead>
                                    <tbody>

                                        {gatePassItemData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.igmLineNo}</td>
                                                <td>{item.containerSize}/{item.containerType}</td>
                                                <td>{item.viaNo}</td>
                                                <td>{item.blNo}</td>
                                                <td>{item.importerName}</td>
                                                <td>{item.cha}</td>
                                                <td>{item.boe}</td>
                                                <td>{item.yardLocation}</td>
                                                <td>{item.noOfPackage}</td>
                                                <td>{item.grossWt}</td>

                                                <td>
                                                    <Input
                                                        type="text"
                                                        name="grnNo"
                                                        className="form-control inputField"
                                                        value={item.grnNo}
                                                        id={`grnNo${index}`}
                                                        onChange={(e) => handleItemChange(e, index)}
                                                        style={{ width: 170 }}
                                                        maxLength={25}
                                                    />
                                                </td>
                                                <td>
                                                    <div style={{ position: 'relative', width: 170 }}>
                                                        <DatePicker
                                                            selected={item.grnDate}
                                                            id='grnDate'
                                                            name='grnDate'
                                                            onChange={(date) => handleItemDateChange(date, 'grnDate', index)}
                                                            dateFormat="dd/MM/yyyy"
                                                            className="form-control border-right-0 InputField"
                                                            customInput={<Input style={{ width: '100%' }} />}
                                                            wrapperClassName="custom-react-datepicker-wrapper"
                                                        />
                                                        <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                                    </div>
                                                </td>
                                                <td>
                                                    <Input
                                                        type="text"
                                                        name="stampDuty"
                                                        className={`form-control InputField ${containerErrors[index]?.stampDuty ? 'error-border' : ''}`}
                                                        value={item.stampDuty}
                                                        id={`stampDuty${index}`}
                                                        onChange={(e) => handleItemChange(e, index)}
                                                        style={{ width: 170 }}
                                                        maxLength={16}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        type="text"
                                                        name="cinNo"
                                                        className="form-control inputField"
                                                        value={item.cinNo}
                                                        id={`cinNo${index}`}
                                                        onChange={(e) => handleItemChange(e, index)}
                                                        style={{ width: 170 }}
                                                        maxLength={25}
                                                    />
                                                </td>
                                                <td>
                                                    <div style={{ position: 'relative', width: 170 }}>
                                                        <DatePicker
                                                            selected={item.cinDate}
                                                            id='cinDate'
                                                            name='cinDate'
                                                            onChange={(date) => handleItemDateChange(date, 'cinDate', index)}
                                                            dateFormat="dd/MM/yyyy"
                                                            className="form-control border-right-0 InputField"
                                                            customInput={<Input style={{ width: '100%' }} />}
                                                            wrapperClassName="custom-react-datepicker-wrapper"
                                                        />
                                                        <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </Table>
                            </div>
                        </>
                    </>
                )}

            </Row>


        </div >
    )
}
