
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

export default function ImportGateOut({ igm, igmTrans, item, cont, sealStatus, process, onRequest }) {
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

    useEffect(() => {
        if (process === 'P00209') {
            getGateNo();
            console.log('sealStatus1 ', sealStatus);


            if (sealStatus === 'itemwise') {
                setSearchedItems([]);
                getItems();
                setSearchigm(igm);

            }

            if (sealStatus === 'containerwise') {
                setSearchedItems([]);
                getGatePassId();
            }

            if (!sealStatus && (igm || cont)) {
                setSearchedItems([]);
                getItems();
                setSearchigm(igm);
            }
        }
    }, [igm, igmTrans, item, cont, sealStatus, process])

    const [searchedItems, setSearchedItems] = useState([]);

    const getItems = () => {
        console.log('igmtrans1 ', igmTrans);
        setSearchedItems([]);
        axios.get(`${ipaddress}importGateOut/getItems?cid=${companyid}&bid=${branchId}&igm=${igm}&igmtrans=${igmTrans}&line=${item}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;

                setSearchedItems(data);
                setSearchItem(item ? item : data[0]);
                handleSearch1(igm, item ? item : data[0]);
            })
            .catch((error) => {
                console.log("Hiii");

                getLatestRecord();
            })
    }

    const getLatestRecord = () => {
        setLoading(true);
        setSearchedItems([]);
        axios.get(`${ipaddress}importGateOut/getLatestRecord?cid=${companyid}&bid=${branchId}&igm=${igm}&igmtrans=${igmTrans}&line=${item}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data.gatePassData;
                const singleData = data[0];

                setSinglegateOutData({
                    companyId: singleData.companyId || '',
                    branchId: singleData.branchId || '',
                    finYear: singleData.finYear || new Date().getFullYear(),
                    gateOutId: singleData.gateOutId || '',
                    erpDocRefNo: singleData.erpDocRefNo || '',
                    docRefNo: singleData.docRefNo || '',
                    srNo: singleData.srNo || '1',
                    profitcentreId: response.data.profit || '',
                    transType: singleData.transType || '',
                    gateOutDate: new Date(singleData.gateOutDate) || new Date(),
                    shift: singleData.shift || 'Day',
                    gateNoOut: singleData.gateNoOut || '',
                    igmLineNo: singleData.igmLineNo || '',
                    containerNo: singleData.containerNo || '',
                    containerSize: singleData.containerSize || '',
                    containerType: singleData.containerType || '',
                    sl: response.data.sl || '',
                    commodityDescription: singleData.commodityDescription || '',
                    grossWt: singleData.grossWt || '',
                    actualNoOfPackages: singleData.actualNoOfPackages || 0,
                    qtyTakenOut: singleData.qtyTakenOut || 0,
                    vehicleNo: singleData.vehicleNo || '',
                    driverName: singleData.driverName || '',
                    deliveryOrderNo: singleData.deliveryOrderNo || '',
                    deliveryOrderDate: new Date(singleData.deliveryOrderDate) || null,
                    doValidityDate: new Date(singleData.doValidityDate) || null,
                    comments: singleData.comments || '',
                    gatePassNo: singleData.gatePassNo || '',
                    gatePassDate: new Date(singleData.gatePassDate) || null,
                    status: singleData.status || '',
                    createdBy: singleData.createdBy || '',
                    createdDate: new Date(singleData.createdDate) || null,
                })
                setGateOutData(data.map(item => ({
                    companyId: item.companyId || '',
                    branchId: item.branchId || '',
                    finYear: item.finYear || new Date().getFullYear(),
                    gateOutId: item.gateOutId || '',
                    erpDocRefNo: item.erpDocRefNo || '',
                    docRefNo: item.docRefNo || '',
                    srNo: item.srNo || '1',
                    profitcentreId: response.data.profit || '',
                    transType: item.transType || '',
                    gateOutDate: new Date(item.gateOutDate) || new Date(),
                    shift: item.shift || 'Day',
                    gateNoOut: item.gateNoOut || '',
                    igmLineNo: item.igmLineNo || '',
                    containerNo: item.containerNo || '',
                    containerSize: item.containerSize || '',
                    containerType: item.containerType || '',
                    sl: response.data.sl || '',
                    commodityDescription: item.commodityDescription || '',
                    grossWt: item.grossWt || '',
                    actualNoOfPackages: item.actualNoOfPackages || 0,
                    qtyTakenOut: item.qtyTakenOut || 0,
                    vehicleNo: item.vehicleNo || '',
                    driverName: item.driverName || '',
                    deliveryOrderNo: item.deliveryOrderNo || '',
                    deliveryOrderDate: new Date(item.deliveryOrderDate) || null,
                    doValidityDate: new Date(item.doValidityDate) || null,
                    comments: item.comments || '',
                    gatePassNo: item.gatePassNo || '',
                    gatePassDate: new Date(item.gatePassDate) || null,
                    status: item.status || '',
                    createdBy: item.createdBy || '',
                    createdDate: new Date(item.createdDate) || null,
                })))

                setSelectedRows(data.map(item => ({
                    companyId: item.companyId || '',
                    branchId: item.branchId || '',
                    finYear: item.finYear || new Date().getFullYear(),
                    gateOutId: item.gateOutId || '',
                    erpDocRefNo: item.erpDocRefNo || '',
                    docRefNo: item.docRefNo || '',
                    srNo: item.srNo || '1',
                    profitcentreId: response.data.profit || '',
                    transType: item.transType || '',
                    gateOutDate: new Date(item.gateOutDate) || new Date(),
                    shift: item.shift || 'Day',
                    gateNoOut: item.gateNoOut || '',
                    igmLineNo: item.igmLineNo || '',
                    containerNo: item.containerNo || '',
                    containerSize: item.containerSize || '',
                    containerType: item.containerType || '',
                    sl: response.data.sl || '',
                    commodityDescription: item.commodityDescription || '',
                    grossWt: item.grossWt || '',
                    actualNoOfPackages: item.actualNoOfPackages || 0,
                    qtyTakenOut: item.qtyTakenOut || 0,
                    vehicleNo: item.vehicleNo || '',
                    driverName: item.driverName || '',
                    deliveryOrderNo: item.deliveryOrderNo || '',
                    deliveryOrderDate: new Date(item.deliveryOrderDate) || null,
                    doValidityDate: new Date(item.doValidityDate) || null,
                    comments: item.comments || '',
                    gatePassNo: item.gatePassNo || '',
                    gatePassDate: new Date(item.gatePassDate) || null,
                    status: item.status || '',
                    createdBy: item.createdBy || '',
                    createdDate: new Date(item.createdDate) || null,
                })))
                setLoading(false);
                setSelectAll(true);
                toast.success("Data found successfully!!", {
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

    const getGatePassId = () => {

        if (!cont) {
            return;
        }
        setSearchedItems([]);
        axios.get(`${ipaddress}importGateOut/getGatePassIdFromContainerNo?cid=${companyid}&bid=${branchId}&igm=${igm}&igmtrans=${igmTrans}&con=${cont}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                getGatePassDataById(data);
            })
            .catch((error) => {
                console.log('cont');

                getLatestRecordByContainer();
            })
    }

    const getLatestRecordByContainer = () => {
        setLoading(true);
        setSearchedItems([]);
        if (!cont) {
            return;
        }
        axios.get(`${ipaddress}importGateOut/getLatestRecordFromContainer?cid=${companyid}&bid=${branchId}&igm=${igm}&igmtrans=${igmTrans}&con=${cont}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data.gatePassData;
                const singleData = data[0];

                setSinglegateOutData({
                    companyId: singleData.companyId || '',
                    branchId: singleData.branchId || '',
                    finYear: singleData.finYear || new Date().getFullYear(),
                    gateOutId: singleData.gateOutId || '',
                    erpDocRefNo: singleData.erpDocRefNo || '',
                    docRefNo: singleData.docRefNo || '',
                    srNo: singleData.srNo || '1',
                    profitcentreId: response.data.profit || '',
                    transType: singleData.transType || '',
                    gateOutDate: new Date(singleData.gateOutDate) || new Date(),
                    shift: singleData.shift || 'Day',
                    gateNoOut: singleData.gateNoOut || '',
                    igmLineNo: singleData.igmLineNo || '',
                    containerNo: singleData.containerNo || '',
                    containerSize: singleData.containerSize || '',
                    containerType: singleData.containerType || '',
                    sl: response.data.sl || '',
                    commodityDescription: singleData.commodityDescription || '',
                    grossWt: singleData.grossWt || '',
                    actualNoOfPackages: singleData.actualNoOfPackages || 0,
                    qtyTakenOut: singleData.qtyTakenOut || 0,
                    vehicleNo: singleData.vehicleNo || '',
                    driverName: singleData.driverName || '',
                    deliveryOrderNo: singleData.deliveryOrderNo || '',
                    deliveryOrderDate: new Date(singleData.deliveryOrderDate) || null,
                    doValidityDate: new Date(singleData.doValidityDate) || null,
                    comments: singleData.comments || '',
                    gatePassNo: singleData.gatePassNo || '',
                    gatePassDate: new Date(singleData.gatePassDate) || null,
                    status: singleData.status || '',
                    createdBy: singleData.createdBy || '',
                    createdDate: new Date(singleData.createdDate) || null,
                })
                setGateOutData(data.map(item => ({
                    companyId: item.companyId || '',
                    branchId: item.branchId || '',
                    finYear: item.finYear || new Date().getFullYear(),
                    gateOutId: item.gateOutId || '',
                    erpDocRefNo: item.erpDocRefNo || '',
                    docRefNo: item.docRefNo || '',
                    srNo: item.srNo || '1',
                    profitcentreId: response.data.profit || '',
                    transType: item.transType || '',
                    gateOutDate: new Date(item.gateOutDate) || new Date(),
                    shift: item.shift || 'Day',
                    gateNoOut: item.gateNoOut || '',
                    igmLineNo: item.igmLineNo || '',
                    containerNo: item.containerNo || '',
                    containerSize: item.containerSize || '',
                    containerType: item.containerType || '',
                    sl: response.data.sl || '',
                    commodityDescription: item.commodityDescription || '',
                    grossWt: item.grossWt || '',
                    actualNoOfPackages: item.actualNoOfPackages || 0,
                    qtyTakenOut: item.qtyTakenOut || 0,
                    vehicleNo: item.vehicleNo || '',
                    driverName: item.driverName || '',
                    deliveryOrderNo: item.deliveryOrderNo || '',
                    deliveryOrderDate: new Date(item.deliveryOrderDate) || null,
                    doValidityDate: new Date(item.doValidityDate) || null,
                    comments: item.comments || '',
                    gatePassNo: item.gatePassNo || '',
                    gatePassDate: new Date(item.gatePassDate) || null,
                    status: item.status || '',
                    createdBy: item.createdBy || '',
                    createdDate: new Date(item.createdDate) || null,
                })))

                setSelectedRows(data.map(item => ({
                    companyId: item.companyId || '',
                    branchId: item.branchId || '',
                    finYear: item.finYear || new Date().getFullYear(),
                    gateOutId: item.gateOutId || '',
                    erpDocRefNo: item.erpDocRefNo || '',
                    docRefNo: item.docRefNo || '',
                    srNo: item.srNo || '1',
                    profitcentreId: response.data.profit || '',
                    transType: item.transType || '',
                    gateOutDate: new Date(item.gateOutDate) || new Date(),
                    shift: item.shift || 'Day',
                    gateNoOut: item.gateNoOut || '',
                    igmLineNo: item.igmLineNo || '',
                    containerNo: item.containerNo || '',
                    containerSize: item.containerSize || '',
                    containerType: item.containerType || '',
                    sl: response.data.sl || '',
                    commodityDescription: item.commodityDescription || '',
                    grossWt: item.grossWt || '',
                    actualNoOfPackages: item.actualNoOfPackages || 0,
                    qtyTakenOut: item.qtyTakenOut || 0,
                    vehicleNo: item.vehicleNo || '',
                    driverName: item.driverName || '',
                    deliveryOrderNo: item.deliveryOrderNo || '',
                    deliveryOrderDate: new Date(item.deliveryOrderDate) || null,
                    doValidityDate: new Date(item.doValidityDate) || null,
                    comments: item.comments || '',
                    gatePassNo: item.gatePassNo || '',
                    gatePassDate: new Date(item.gatePassDate) || null,
                    status: item.status || '',
                    createdBy: item.createdBy || '',
                    createdDate: new Date(item.createdDate) || null,
                })))
                setLoading(false);
                setSelectAll(true);
                toast.success("Data found successfully!!", {
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

    const [gateData, setGateData] = useState([]);

    const getGateNo = () => {
        const jarId = 'J00063';
        axios.get(`${ipaddress}jardetail/getJarDetail?companyId=${companyid}&jarId=${jarId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {

                if (response.data.length === 0) {
                    setGateData([]);
                }
                else {
                    setGateData(response.data);
                }

            })
            .catch((error) => {
                setGateData([]);
            })
    }


    const [singleGateOutData, setSinglegateOutData] = useState({
        companyId: '',
        branchId: '',
        finYear: new Date().getFullYear(),
        gateOutId: '',
        erpDocRefNo: '',
        docRefNo: '',
        srNo: '',
        profitcentreId: '',
        transType: '',
        gateOutDate: new Date(),
        shift: 'Day',
        gateNoOut: '',
        igmLineNo: '',
        containerNo: '',
        containerSize: '',
        containerType: '',
        sl: '',
        commodityDescription: '',
        grossWt: '',
        actualNoOfPackages: 0,
        qtyTakenOut: 0,
        vehicleNo: '',
        driverName: '',
        deliveryOrderNo: '',
        deliveryOrderDate: null,
        doValidityDate: null,
        comments: '',
        gatePassNo: '',
        gatePassDate: null,
        status: '',
        createdBy: '',
        createdDate: null,
    })

    const [gateOutData, setGateOutData] = useState([{
        companyId: '',
        branchId: '',
        finYear: new Date().getFullYear(),
        gateOutId: '',
        erpDocRefNo: '',
        docRefNo: '',
        srNo: '',
        profitcentreId: '',
        transType: '',
        gateOutDate: new Date(),
        shift: 'Day',
        gateNoOut: '',
        igmLineNo: '',
        containerNo: '',
        containerSize: '',
        containerType: '',
        sl: '',
        commodityDescription: '',
        grossWt: '',
        actualNoOfPackages: 0,
        qtyTakenOut: 0,
        vehicleNo: '',
        driverName: '',
        deliveryOrderNo: '',
        deliveryOrderDate: null,
        doValidityDate: null,
        comments: '',
        gatePassNo: '',
        gatePassDate: null,
        status: '',
        createdBy: '',
        createdDate: null,
        holdStatus: ''
    }])

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


    const handleGateOutChange = (e) => {
        const { name, value } = e.target;
        let sanitizedValue = value;

        // Sanitize input for specific fields
        // if (['stampDuty', 'cargoValue', 'cargoDuty'].includes(name)) {
        //     sanitizedValue = handleInputChange(value);
        // }
        setSinglegateOutData(prevState => ({
            ...prevState,
            [name]: sanitizedValue
        }));

        setFormErrors(prevState => ({
            ...prevState,
            [name]: ""
        }));
        // document.getElementById(name).classList.remove('error-border');
    };

    const [searchIgm, setSearchigm] = useState('');
    const [searchItem, setSearchItem] = useState('');


    const handleClear = () => {
        setFormErrors({
            gateNoOut: '',
            gatePassNo: ''
        })
        setSelectAll(false);
        setSelectedRows([]);
        setSinglegateOutData({
            companyId: '',
            branchId: '',
            finYear: new Date().getFullYear(),
            gateOutId: '',
            erpDocRefNo: '',
            docRefNo: '',
            srNo: '',
            profitcentreId: '',
            transType: '',
            gateOutDate: new Date(),
            shift: 'Day',
            gateNoOut: '',
            igmLineNo: '',
            containerNo: '',
            containerSize: '',
            containerType: '',
            sl: '',
            commodityDescription: '',
            grossWt: '',
            actualNoOfPackages: 0,
            qtyTakenOut: 0,
            vehicleNo: '',
            driverName: '',
            deliveryOrderNo: '',
            deliveryOrderDate: null,
            doValidityDate: null,
            comments: '',
            gatePassNo: '',
            gatePassDate: null,
            status: '',
            createdBy: '',
            createdDate: null,
        })
        setGateOutData([{
            companyId: '',
            branchId: '',
            finYear: new Date().getFullYear(),
            gateOutId: '',
            erpDocRefNo: '',
            docRefNo: '',
            srNo: '',
            profitcentreId: '',
            transType: '',
            gateOutDate: new Date(),
            shift: 'Day',
            gateNoOut: '',
            igmLineNo: '',
            containerNo: '',
            containerSize: '',
            containerType: '',
            sl: '',
            commodityDescription: '',
            grossWt: '',
            actualNoOfPackages: 0,
            qtyTakenOut: 0,
            vehicleNo: '',
            driverName: '',
            deliveryOrderNo: '',
            deliveryOrderDate: null,
            doValidityDate: null,
            comments: '',
            gatePassNo: '',
            gatePassDate: null,
            status: '',
            createdBy: '',
            createdDate: null,
            holdStatus: ''
        }])
        setSearchItem('');
        setSearchigm('');
        setSearchGatePassId('');
        setSearchGatePassName('');
        setSearchedGatePassData([]);
    }

    const handleSearch1 = (igm, item) => {
        setLoading(true);

        if (!igm) {
            toast.error("IGM no is required.", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }

        if (!item) {
            toast.error("Item no is required.", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }

        axios.get(`${ipaddress}importGateOut/searchGatePassData?cid=${companyid}&bid=${branchId}&igm=${igm}&igmline=${item}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setFormErrors({
                    gateNoOut: '',
                    gatePassNo: ''
                })
                const data = response.data.gatePassData;
                const singleData = data[0];

                const today = new Date();
                today.setHours(0, 0, 0, 0); // Set the time to midnight (00:00:00)

                const validityDate = new Date(singleData.doValidityDate);
                validityDate.setHours(0, 0, 0, 0); // Set the time to midnight (00:00:00)

                if (validityDate < today) {
                    toast.error("The do validity date has already expired.", {
                        autoClose: 800
                    });
                    setLoading(false);
                    return;
                }

                setSinglegateOutData({
                    companyId: '',
                    branchId: '',
                    finYear: new Date().getFullYear(),
                    gateOutId: '',
                    erpDocRefNo: singleData.igmTransId || '',
                    docRefNo: singleData.igmNo || '',
                    srNo: '1',
                    profitcentreId: response.data.profit || '',
                    transType: singleData.transType,
                    gateOutDate: new Date(),
                    shift: 'Day',
                    gateNoOut: '',
                    igmLineNo: singleData.igmLineNo || '',
                    containerNo: '',
                    sl: response.data.sl || '',
                    commodityDescription: singleData.commodity || '',
                    grossWt: '',
                    actualNoOfPackages: 0,
                    qtyTakenOut: 0,
                    vehicleNo: '',
                    driverName: '',
                    deliveryOrderNo: singleData.doNo || '',
                    deliveryOrderDate: singleData.doDate || null,
                    doValidityDate: singleData.doValidityDate || null,
                    comments: '',
                    gatePassNo: singleData.gatePassId || '',
                    gatePassDate: singleData.gatePassDate || null,
                    status: '',
                    createdBy: '',
                    createdDate: null,
                })
                setGateOutData(data.map(item => ({
                    companyId: '',
                    branchId: '',
                    finYear: new Date().getFullYear(),
                    gateOutId: '',
                    erpDocRefNo: item.igmTransId || '',
                    docRefNo: item.igmNo || '',
                    srNo: item.srNo || '',
                    profitcentreId: item.profitcentreId || '',
                    transType: item.transType,
                    gateOutDate: new Date(),
                    shift: 'Day',
                    gateNoOut: '',
                    igmLineNo: item.igmLineNo || '',
                    containerNo: item.containerNo || '',
                    sl: item.sl || '',
                    commodityDescription: item.commodity || '',
                    grossWt: item.gwTakenOut || '',
                    actualNoOfPackages: item.noOfPackage || 0,
                    qtyTakenOut: item.qtyTakenOut || 0,
                    vehicleNo: item.vehicleNo || '',
                    driverName: item.driverName || '',
                    deliveryOrderNo: item.doNo || '',
                    deliveryOrderDate: item.doDate || null,
                    doValidityDate: item.doValidityDate || null,
                    comments: '',
                    gatePassNo: item.gatePassId || '',
                    gatePassDate: item.gatePassDate || null,
                    status: '',
                    createdBy: '',
                    createdDate: null,
                    holdStatus: item.holdStatus || 'N'
                })))
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })
    }

    const handleSearch = () => {
        setLoading(true);

        if (!searchIgm) {
            toast.error("IGM no is required.", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }

        if (!searchItem) {
            toast.error("Item no is required.", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }

        axios.get(`${ipaddress}importGateOut/searchGatePassData?cid=${companyid}&bid=${branchId}&igm=${searchIgm}&igmline=${searchItem}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setFormErrors({
                    gateNoOut: '',
                    gatePassNo: ''
                })
                const data = response.data.gatePassData;
                const singleData = data[0];

                const today = new Date();
                today.setHours(0, 0, 0, 0); // Set the time to midnight (00:00:00)

                const validityDate = new Date(singleData.doValidityDate);
                validityDate.setHours(0, 0, 0, 0); // Set the time to midnight (00:00:00)

                if (validityDate < today) {
                    toast.error("The do validity date has already expired.", {
                        autoClose: 800
                    });
                    setLoading(false);
                    return;
                }

                setSinglegateOutData({
                    companyId: '',
                    branchId: '',
                    finYear: new Date().getFullYear(),
                    gateOutId: '',
                    erpDocRefNo: singleData.igmTransId || '',
                    docRefNo: singleData.igmNo || '',
                    srNo: '1',
                    profitcentreId: response.data.profit || '',
                    transType: singleData.transType,
                    gateOutDate: new Date(),
                    shift: 'Day',
                    gateNoOut: '',
                    igmLineNo: singleData.igmLineNo || '',
                    containerNo: '',
                    sl: response.data.sl || '',
                    commodityDescription: singleData.commodity || '',
                    grossWt: '',
                    actualNoOfPackages: 0,
                    qtyTakenOut: 0,
                    vehicleNo: '',
                    driverName: '',
                    deliveryOrderNo: singleData.doNo || '',
                    deliveryOrderDate: singleData.doDate || null,
                    doValidityDate: singleData.doValidityDate || null,
                    comments: '',
                    gatePassNo: singleData.gatePassId || '',
                    gatePassDate: singleData.gatePassDate || null,
                    status: '',
                    createdBy: '',
                    createdDate: null,
                })
                setGateOutData(data.map(item => ({
                    companyId: '',
                    branchId: '',
                    finYear: new Date().getFullYear(),
                    gateOutId: '',
                    erpDocRefNo: item.igmTransId || '',
                    docRefNo: item.igmNo || '',
                    srNo: item.srNo || '',
                    profitcentreId: item.profitcentreId || '',
                    transType: item.transType,
                    gateOutDate: new Date(),
                    shift: 'Day',
                    gateNoOut: '',
                    igmLineNo: item.igmLineNo || '',
                    containerNo: item.containerNo || '',
                    sl: item.sl || '',
                    commodityDescription: item.commodity || '',
                    grossWt: item.gwTakenOut || '',
                    actualNoOfPackages: item.noOfPackage || 0,
                    qtyTakenOut: item.qtyTakenOut || 0,
                    vehicleNo: item.vehicleNo || '',
                    driverName: item.driverName || '',
                    deliveryOrderNo: item.doNo || '',
                    deliveryOrderDate: item.doDate || null,
                    doValidityDate: item.doValidityDate || null,
                    comments: '',
                    gatePassNo: item.gatePassId || '',
                    gatePassDate: item.gatePassDate || null,
                    status: '',
                    createdBy: '',
                    createdDate: null,
                    holdStatus: item.holdStatus || 'N'
                })))
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })
    }

    const [searchGatePassId, setSearchGatePassId] = useState('');
    const [searchGatePassName, setSearchGatePassName] = useState('');
    const [searchedGatePassData, setSearchedGatePassData] = useState([]);

    const getDataFromGatePassId = (val) => {
        if (!val) {
            setSearchedGatePassData([]);
            return;
        }

        axios.get(`${ipaddress}importGateOut/getGatePassDataByGatePassIdAndVehicleNo?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: `Bearer ${jwtToken}`
        })
            .then((response) => {
                const data = response.data;
                const portOptions = data.map(port => ({
                    value: port[0],
                    label: port[0] + ' - ' + (port[1] === null ? '' : port[1])
                }))
                setSearchedGatePassData(portOptions);
            })
            .catch((error) => {
                setSearchedGatePassData([]);
            })
    }

    const handleGatePassIdSelect = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setSearchGatePassId('');
            setSearchGatePassName('');
            handleClear();
        }
        else {
            handleClear();
            setSearchGatePassId(selectedOption.value);
            setSearchGatePassName(selectedOption.label);
            getGatePassDataById(selectedOption.value);
        }
    }

    const getGatePassDataById = (val) => {
        setLoading(true);



        axios.get(`${ipaddress}importGateOut/getGatePassDataById?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data.gatePassData;
                const singleData = data[0];

                console.log('gatepassdata ', data);

                const today = new Date();
                today.setHours(0, 0, 0, 0); // Set the time to midnight (00:00:00)

                const validityDate = new Date(singleData.doValidityDate);
                validityDate.setHours(0, 0, 0, 0); // Set the time to midnight (00:00:00)

                if (validityDate < today) {
                    toast.error("The do validity date has already expired.", {
                        autoClose: 800
                    });
                    setLoading(false);
                    return;
                }


                setSinglegateOutData({
                    companyId: '',
                    branchId: '',
                    finYear: new Date().getFullYear(),
                    gateOutId: '',
                    erpDocRefNo: singleData.igmTransId || '',
                    docRefNo: singleData.igmNo || '',
                    srNo: '1',
                    profitcentreId: response.data.profit || '',
                    transType: singleData.transType,
                    gateOutDate: new Date(),
                    shift: 'Day',
                    gateNoOut: '',
                    igmLineNo: singleData.igmLineNo || '',
                    containerNo: '',
                    containerSize: '',
                    containerType: '',
                    sl: response.data.sl || '',
                    commodityDescription: singleData.commodity || '',
                    grossWt: '',
                    actualNoOfPackages: 0,
                    qtyTakenOut: 0,
                    vehicleNo: '',
                    driverName: '',
                    deliveryOrderNo: singleData.doNo || '',
                    deliveryOrderDate: singleData.doDate || null,
                    doValidityDate: singleData.doValidityDate || null,
                    comments: '',
                    gatePassNo: singleData.gatePassId || '',
                    gatePassDate: singleData.gatePassDate || null,
                    status: '',
                    createdBy: '',
                    createdDate: null,
                })
                setGateOutData(data.map(item => ({
                    companyId: '',
                    branchId: '',
                    finYear: new Date().getFullYear(),
                    gateOutId: '',
                    erpDocRefNo: item.igmTransId || '',
                    docRefNo: item.igmNo || '',
                    srNo: item.srNo || '',
                    profitcentreId: item.profitcentreId || '',
                    transType: item.transType,
                    gateOutDate: new Date(),
                    shift: 'Day',
                    gateNoOut: '',
                    igmLineNo: item.igmLineNo || '',
                    containerNo: item.containerNo || '',
                    containerSize: item.containerSize || '',
                    containerType: item.containerType || '',
                    sl: item.sl || '',
                    commodityDescription: item.commodity || '',
                    grossWt: item.gwTakenOut || '',
                    actualNoOfPackages: item.noOfPackage || 0,
                    qtyTakenOut: item.qtyTakenOut || 0,
                    vehicleNo: item.vehicleNo || '',
                    driverName: item.driverName || '',
                    deliveryOrderNo: item.doNo || '',
                    deliveryOrderDate: item.doDate || null,
                    doValidityDate: item.doValidityDate || null,
                    comments: '',
                    gatePassNo: item.gatePassId || '',
                    gatePassDate: item.gatePassDate || null,
                    status: '',
                    createdBy: '',
                    createdDate: null,
                    holdStatus: item.holdStatus || 'N'
                })))
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })
    }

    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const handleRowCheckboxChange = (e, index) => {
        let newSelectedRows = [...selectedRows];

        if (e.target.checked) {
            // Add the full object instead of just the index
            if (!newSelectedRows.some(row => row === gateOutData[index])) {
                newSelectedRows.push(gateOutData[index]);
            }
            setSelectedRows(newSelectedRows);

            // Check if all rows are selected
            if (newSelectedRows.length === gateOutData.length) {
                setSelectAll(true);
            } else {
                setSelectAll(false);
            }
        } else {
            // Remove the object if the checkbox is unchecked
            const filteredRows = newSelectedRows.filter(row => row !== gateOutData[index]);
            setSelectedRows(filteredRows);

            // Update selectAll based on the number of selected rows
            if (filteredRows.length === gateOutData.length) {
                setSelectAll(true);
            } else {
                setSelectAll(false);
            }

            // Uncheck "select all" if no rows are selected
            if (filteredRows.length === 0) {
                setSelectAll(false);
            }
        }
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedRows(gateOutData.filter(item => item.gateOutId !== '').map(item => item));
            //  setSelectedRows([]);
        } else {
            // Select all objects from gateOutData
            setSelectedRows(gateOutData.filter(item => item.holdStatus !== 'H').map(item => item));
        }
        setSelectAll(!selectAll);
    };


    const [formErrors, setFormErrors] = useState({
        gateNoOut: '',
        gatePassNo: ''
    });

    const handleSave = () => {
        setLoading(true);

        let errors = {};

        if (!singleGateOutData.gateNoOut) {
            errors.gateNoOut = "Gate no is required."
        }
        if (!singleGateOutData.gatePassNo) {
            errors.gatePassNo = "Gate pass id is required."
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setLoading(false);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            })
            return;
        }

        if (selectedRows.length === 0) {
            toast.error("Please select atleast one record.", {
                autoClose: 800
            })

            setLoading(false);
            return;
        }
        console.log('selectedRows ', selectedRows);

        const formData = {
            singleGateOut: singleGateOutData,
            gateOutData: selectedRows
        }

        axios.post(`${ipaddress}importGateOut/saveImportGateOut?cid=${companyid}&bid=${branchId}&user=${userId}`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data.gatePassData;
                const singleData = data[0];

                setSinglegateOutData({
                    companyId: singleData.companyId || '',
                    branchId: singleData.branchId || '',
                    finYear: singleData.finYear || new Date().getFullYear(),
                    gateOutId: singleData.gateOutId || '',
                    erpDocRefNo: singleData.erpDocRefNo || '',
                    docRefNo: singleData.docRefNo || '',
                    srNo: singleData.srNo || '1',
                    profitcentreId: response.data.profit || '',
                    transType: singleData.transType || '',
                    gateOutDate: new Date(singleData.gateOutDate) || new Date(),
                    shift: singleData.shift || 'Day',
                    gateNoOut: singleData.gateNoOut || '',
                    igmLineNo: singleData.igmLineNo || '',
                    containerNo: singleData.containerNo || '',
                    containerSize: singleData.containerSize || '',
                    containerType: singleData.containerType || '',
                    sl: response.data.sl || '',
                    commodityDescription: singleData.commodityDescription || '',
                    grossWt: singleData.grossWt || '',
                    actualNoOfPackages: singleData.actualNoOfPackages || 0,
                    qtyTakenOut: singleData.qtyTakenOut || 0,
                    vehicleNo: singleData.vehicleNo || '',
                    driverName: singleData.driverName || '',
                    deliveryOrderNo: singleData.deliveryOrderNo || '',
                    deliveryOrderDate: new Date(singleData.deliveryOrderDate) || null,
                    doValidityDate: new Date(singleData.doValidityDate) || null,
                    comments: singleData.comments || '',
                    gatePassNo: singleData.gatePassNo || '',
                    gatePassDate: new Date(singleData.gatePassDate) || null,
                    status: singleData.status || '',
                    createdBy: singleData.createdBy || '',
                    createdDate: new Date(singleData.createdDate) || null,
                })
                setGateOutData(data.map(item => ({
                    companyId: item.companyId || '',
                    branchId: item.branchId || '',
                    finYear: item.finYear || new Date().getFullYear(),
                    gateOutId: item.gateOutId || '',
                    erpDocRefNo: item.erpDocRefNo || '',
                    docRefNo: item.docRefNo || '',
                    srNo: item.srNo || '1',
                    profitcentreId: response.data.profit || '',
                    transType: item.transType || '',
                    gateOutDate: new Date(item.gateOutDate) || new Date(),
                    shift: item.shift || 'Day',
                    gateNoOut: item.gateNoOut || '',
                    igmLineNo: item.igmLineNo || '',
                    containerNo: item.containerNo || '',
                    containerSize: item.containerSize || '',
                    containerType: item.containerType || '',
                    sl: response.data.sl || '',
                    commodityDescription: item.commodityDescription || '',
                    grossWt: item.grossWt || '',
                    actualNoOfPackages: item.actualNoOfPackages || 0,
                    qtyTakenOut: item.qtyTakenOut || 0,
                    vehicleNo: item.vehicleNo || '',
                    driverName: item.driverName || '',
                    deliveryOrderNo: item.deliveryOrderNo || '',
                    deliveryOrderDate: new Date(item.deliveryOrderDate) || null,
                    doValidityDate: new Date(item.doValidityDate) || null,
                    comments: item.comments || '',
                    gatePassNo: item.gatePassNo || '',
                    gatePassDate: new Date(item.gatePassDate) || null,
                    status: item.status || '',
                    createdBy: item.createdBy || '',
                    createdDate: new Date(item.createdDate) || null,
                })))

                setSelectedRows(data.map(item => ({
                    companyId: item.companyId || '',
                    branchId: item.branchId || '',
                    finYear: item.finYear || new Date().getFullYear(),
                    gateOutId: item.gateOutId || '',
                    erpDocRefNo: item.erpDocRefNo || '',
                    docRefNo: item.docRefNo || '',
                    srNo: item.srNo || '1',
                    profitcentreId: response.data.profit || '',
                    transType: item.transType || '',
                    gateOutDate: new Date(item.gateOutDate) || new Date(),
                    shift: item.shift || 'Day',
                    gateNoOut: item.gateNoOut || '',
                    igmLineNo: item.igmLineNo || '',
                    containerNo: item.containerNo || '',
                    containerSize: item.containerSize || '',
                    containerType: item.containerType || '',
                    sl: response.data.sl || '',
                    commodityDescription: item.commodityDescription || '',
                    grossWt: item.grossWt || '',
                    actualNoOfPackages: item.actualNoOfPackages || 0,
                    qtyTakenOut: item.qtyTakenOut || 0,
                    vehicleNo: item.vehicleNo || '',
                    driverName: item.driverName || '',
                    deliveryOrderNo: item.deliveryOrderNo || '',
                    deliveryOrderDate: new Date(item.deliveryOrderDate) || null,
                    doValidityDate: new Date(item.doValidityDate) || null,
                    comments: item.comments || '',
                    gatePassNo: item.gatePassNo || '',
                    gatePassDate: new Date(item.gatePassDate) || null,
                    status: item.status || '',
                    createdBy: item.createdBy || '',
                    createdDate: new Date(item.createdDate) || null,
                })))
                setLoading(false);
                setSelectAll(true);
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

    const [isModalOpenForGateOut, setIsModalOpenForGateOut] = useState(false);
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

        axios.get(`${ipaddress}importGateOut/searchGateOutData?cid=${companyid}&bid=${branchId}&val=${val}`, {
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



    const openGateOutModal = () => {
        setIsModalOpenForGateOut(true);
        search('');
    }

    const closeGateOutModal = () => {
        setIsModalOpenForGateOut(false);
        setSearchId('');
        setSearchData([]);
    }



    const handleSearchReset = () => {
        setSearchId('');
        setSearchData([]);
        search('');
    }


    const getSelectedData = (gateout, gatepass) => {
        setLoading(true);
        axios.get(`${ipaddress}importGateOut/getSelectedGateOutData?cid=${companyid}&bid=${branchId}&gateout=${gateout}&gatepass=${gatepass}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {

                const data = response.data.gatePassData;
                const singleData = data[0];

                setSinglegateOutData({
                    companyId: singleData.companyId || '',
                    branchId: singleData.branchId || '',
                    finYear: singleData.finYear || new Date().getFullYear(),
                    gateOutId: singleData.gateOutId || '',
                    erpDocRefNo: singleData.erpDocRefNo || '',
                    docRefNo: singleData.docRefNo || '',
                    srNo: singleData.srNo || '1',
                    profitcentreId: response.data.profit || '',
                    transType: singleData.transType || '',
                    gateOutDate: new Date(singleData.gateOutDate) || new Date(),
                    shift: singleData.shift || 'Day',
                    gateNoOut: singleData.gateNoOut || '',
                    igmLineNo: singleData.igmLineNo || '',
                    containerNo: singleData.containerNo || '',
                    containerSize: singleData.containerSize || '',
                    containerType: singleData.containerType || '',
                    sl: response.data.sl || '',
                    commodityDescription: singleData.commodityDescription || '',
                    grossWt: singleData.grossWt || '',
                    actualNoOfPackages: singleData.actualNoOfPackages || 0,
                    qtyTakenOut: singleData.qtyTakenOut || 0,
                    vehicleNo: singleData.vehicleNo || '',
                    driverName: singleData.driverName || '',
                    deliveryOrderNo: singleData.deliveryOrderNo || '',
                    deliveryOrderDate: new Date(singleData.deliveryOrderDate) || null,
                    doValidityDate: new Date(singleData.doValidityDate) || null,
                    comments: singleData.comments || '',
                    gatePassNo: singleData.gatePassNo || '',
                    gatePassDate: new Date(singleData.gatePassDate) || null,
                    status: singleData.status || '',
                    createdBy: singleData.createdBy || '',
                    createdDate: new Date(singleData.createdDate) || null,
                })
                setGateOutData(data.map(item => ({
                    companyId: item.companyId || '',
                    branchId: item.branchId || '',
                    finYear: item.finYear || new Date().getFullYear(),
                    gateOutId: item.gateOutId || '',
                    erpDocRefNo: item.erpDocRefNo || '',
                    docRefNo: item.docRefNo || '',
                    srNo: item.srNo || '1',
                    profitcentreId: response.data.profit || '',
                    transType: item.transType || '',
                    gateOutDate: new Date(item.gateOutDate) || new Date(),
                    shift: item.shift || 'Day',
                    gateNoOut: item.gateNoOut || '',
                    igmLineNo: item.igmLineNo || '',
                    containerNo: item.containerNo || '',
                    containerSize: item.containerSize || '',
                    containerType: item.containerType || '',
                    sl: response.data.sl || '',
                    commodityDescription: item.commodityDescription || '',
                    grossWt: item.grossWt || '',
                    actualNoOfPackages: item.actualNoOfPackages || 0,
                    qtyTakenOut: item.qtyTakenOut || 0,
                    vehicleNo: item.vehicleNo || '',
                    driverName: item.driverName || '',
                    deliveryOrderNo: item.deliveryOrderNo || '',
                    deliveryOrderDate: new Date(item.deliveryOrderDate) || null,
                    doValidityDate: new Date(item.doValidityDate) || null,
                    comments: item.comments || '',
                    gatePassNo: item.gatePassNo || '',
                    gatePassDate: new Date(item.gatePassDate) || null,
                    status: item.status || '',
                    createdBy: item.createdBy || '',
                    createdDate: new Date(item.createdDate) || null,
                })))

                setSelectedRows(data.map(item => ({
                    companyId: item.companyId || '',
                    branchId: item.branchId || '',
                    finYear: item.finYear || new Date().getFullYear(),
                    gateOutId: item.gateOutId || '',
                    erpDocRefNo: item.erpDocRefNo || '',
                    docRefNo: item.docRefNo || '',
                    srNo: item.srNo || '1',
                    profitcentreId: response.data.profit || '',
                    transType: item.transType || '',
                    gateOutDate: new Date(item.gateOutDate) || new Date(),
                    shift: item.shift || 'Day',
                    gateNoOut: item.gateNoOut || '',
                    igmLineNo: item.igmLineNo || '',
                    containerNo: item.containerNo || '',
                    containerSize: item.containerSize || '',
                    containerType: item.containerType || '',
                    sl: response.data.sl || '',
                    commodityDescription: item.commodityDescription || '',
                    grossWt: item.grossWt || '',
                    actualNoOfPackages: item.actualNoOfPackages || 0,
                    qtyTakenOut: item.qtyTakenOut || 0,
                    vehicleNo: item.vehicleNo || '',
                    driverName: item.driverName || '',
                    deliveryOrderNo: item.deliveryOrderNo || '',
                    deliveryOrderDate: new Date(item.deliveryOrderDate) || null,
                    doValidityDate: new Date(item.doValidityDate) || null,
                    comments: item.comments || '',
                    gatePassNo: item.gatePassNo || '',
                    gatePassDate: new Date(item.gatePassDate) || null,
                    status: item.status || '',
                    createdBy: item.createdBy || '',
                    createdDate: new Date(item.createdDate) || null,
                })))
                setLoading(false);
                setSelectAll(true);
                toast.success("Data found successfully!!", {
                    autoClose: 800
                })

                closeGateOutModal();
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })
    }


    const downloadGateOutReport = () => {


        setLoading(true);
        axios
            .post(
                `${ipaddress}importReports/importGateOutReport?cid=${companyid}&bid=${branchId}&gate=${singleGateOutData.gateOutId}`,
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
            <div>
                <Modal Modal isOpen={isModalOpenForGateOut} onClose={closeGateOutModal} toggle={closeGateOutModal} style={{ maxWidth: '1000px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                    <ModalHeader toggle={closeGateOutModal} style={{
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
                        /> Search Gate Out Records</h5>



                    </ModalHeader>
                    <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                        <Row>
                            <Col md={5}>
                                <FormGroup>
                                    <label className="forlabel" htmlFor="sbRequestId">Search By Gate Out No / Gate Pass No / Vehicle No</label>
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
                                        <th scope="col">Gate Out No</th>
                                        <th scope="col">Gate Out Date</th>
                                        <th scope="col">Gate Pass No</th>
                                        <th scope="col">Gate Pass Date</th>
                                        <th scope="col">Gate Out Shift</th>
                                        <th scope="col">Vehicle No</th>
                                        <th scope="col">Driver</th>
                                        <th scope="col">Trip Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input type="radio" onChange={() => getSelectedData(item[0], item[2])} name="radioGroup" />
                                            </td>
                                            <td>{item[0]}</td>
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
                    {/* <Col md={2}>
                        <FormGroup>
                            <label className="inputHeader">IGM No</label>
                            <Input
                                type="text"
                                name="stampDuty"
                                className="form-control inputField"
                                id='stampDuty'
                                value={searchIgm}
                                onChange={(e) => setSearchigm(e.target.value)}

                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="inputHeader">Item No</label>

                            {searchedItems.length > 0 ? (
                                <Input
                                    type="select"
                                    name="stampDuty"
                                    className="form-control inputField"
                                    id='stampDuty'
                                    value={searchItem}
                                    onChange={(e) => setSearchItem(e.target.value)}
                                >
                                    <option value=""></option>
                                    {searchedItems.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}

                                </Input>
                            ) :
                                (
                                    <Input
                                        type="text"
                                        name="stampDuty"
                                        className="form-control inputField"
                                        id='stampDuty'
                                        value={searchItem}
                                        onChange={(e) => setSearchItem(e.target.value)}
                                    />
                                )}

                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <Button
                            type="submit"
                            className="newButton"
                            variant="outline-primary"
                            style={{ marginTop: 23, fontSize: 12 }}
                            onClick={handleSearch}
                        >
                            <FontAwesomeIcon
                                icon={faSearch}
                                style={{ marginRight: "5px" }}
                            />
                            Search
                        </Button>
                    </Col>
                    <Col md={2}>
                        <div style={{ fontSize: 18, marginTop: 24, fontWeight: 700 }}>OR</div>
                    </Col> */}
                    <Col md={3}>
                        <FormGroup>
                            <label className="forlabel">Gate Pass Id / Vehicle No</label>
                            <Select

                                value={{ value: searchGatePassId, label: searchGatePassName }}
                                onChange={handleGatePassIdSelect}
                                onInputChange={getDataFromGatePassId}
                                options={searchedGatePassData}
                                placeholder="Select Gate Pass Id / Vehicle No"
                                isClearable
                                id="searchGatePassId"
                                name="searchGatePassId"
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

                <hr />
                <Row>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel">Gate Out No</label>
                            <Row>
                                <Col md={8}>
                                    <Input
                                        type="text"
                                        name="gateOutId"
                                        className="form-control inputField"
                                        id='gateOutId'
                                        value={singleGateOutData.gateOutId}
                                        onChange={handleGateOutChange}
                                        disabled
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button
                                        type="submit"
                                        className="newButton"
                                        variant="outline-primary"
                                        style={{ fontSize: 12 }}
                                        onClick={openGateOutModal}
                                    >
                                        <FontAwesomeIcon
                                            icon={faSearch}
                                        />

                                    </Button>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel">Gate Out Date</label>
                            <div style={{ position: 'relative' }}>
                                <DatePicker
                                    selected={singleGateOutData.gateOutDate}
                                    id='gateOutDate'
                                    name='gateOutDate'
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
                            <label className="forlabel">Gate Out Shift</label>
                            <Input
                                type="select"
                                name="shift"
                                className="form-control inputField"
                                id='shift'
                                value={singleGateOutData.shift}
                                onChange={handleGateOutChange}
                            >
                                <option value="Day">Day</option>
                                <option value="Night">Night</option>
                                <option value="Third">Third</option>

                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel">Gate No</label> <span style={{ color: 'red' }}>*</span>
                            <Input
                                type="select"
                                name="gateNoOut"
                                className={`form-control inputField ${formErrors.gateNoOut ? 'error-border' : ''}`}
                                id='gateNoOut'
                                value={singleGateOutData.gateNoOut}
                                onChange={handleGateOutChange}
                            >
                                <option value="">Select Gate No</option>
                                {gateData.map((item, index) => (
                                    <option key={index} value={item[0]}>{item[1]}</option>
                                ))}
                            </Input>
                            <div style={{ color: 'red' }} className="error-message">{formErrors.gateNoOut}</div>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel">Status</label>
                            <Input
                                type="text"
                                name="status"
                                className="form-control inputField"
                                id='status'
                                value={singleGateOutData.status === 'A' ? 'Approved' : singleGateOutData.status}
                                onChange={handleGateOutChange}
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
                                className="form-control inputField"
                                id='createdBy'
                                value={singleGateOutData.createdBy}
                                onChange={handleGateOutChange}
                                disabled
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel">Gate Pass Id</label> <span style={{ color: 'red' }}>*</span>
                            <Input
                                type="text"
                                name="gatePassNo"
                                className={`form-control inputField ${formErrors.gatePassNo ? 'error-border' : ''}`}
                                id='gatePassNo'
                                value={singleGateOutData.gatePassNo}
                                onChange={handleGateOutChange}
                                disabled
                            />
                            <div style={{ color: 'red' }} className="error-message">{formErrors.gatePassNo}</div>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel">Gate Pass Date</label>
                            <div style={{ position: 'relative' }}>
                                <DatePicker
                                    selected={singleGateOutData.gatePassDate}
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
                        <FormGroup>
                            <label className="forlabel">Do No</label>
                            <Input
                                type="text"
                                name="deliveryOrderNo"
                                className="form-control inputField"
                                id='deliveryOrderNo'
                                value={singleGateOutData.deliveryOrderNo}
                                onChange={handleGateOutChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel">Do Date</label>
                            <div style={{ position: 'relative' }}>
                                <DatePicker
                                    selected={singleGateOutData.deliveryOrderDate}
                                    id='deliveryOrderDate'
                                    name='deliveryOrderDate'
                                    onChange={(date) => setSinglegateOutData(prevState => ({
                                        ...prevState,
                                        deliveryOrderDate: date,
                                        doValidityDate: date >= prevState.doValidityDate ? null : prevState.doValidityDate,
                                    }))}
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
                            <label className="forlabel">Do Validity Date</label>
                            <div style={{ position: 'relative' }}>
                                <DatePicker
                                    selected={singleGateOutData.doValidityDate}
                                    onChange={(date) => setSinglegateOutData({
                                        ...singleGateOutData,
                                        doValidityDate: date
                                    })}
                                    minDate={(() => {
                                        const date = new Date(singleGateOutData.deliveryOrderDate);
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
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel">Profitcentre Id</label>
                            <Input
                                type="text"
                                name="profitcentreId"
                                className="form-control inputField"
                                id='profitcentreId'
                                value={singleGateOutData.profitcentreId}
                                onChange={handleGateOutChange}
                                disabled
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel">Shipping Line</label>
                            <Input
                                type="text"
                                name="sl"
                                className="form-control inputField"
                                id='sl'
                                value={singleGateOutData.sl}
                                onChange={handleGateOutChange}
                                disabled
                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel">Trans Type</label>
                            <Input
                                type="text"
                                name="transType"
                                className="form-control inputField"
                                id='transType'
                                value={singleGateOutData.transType}
                                onChange={handleGateOutChange}
                                disabled
                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel">Remarks</label>
                            <Input
                                type="textarea"
                                name="comments"
                                className="form-control inputField"
                                id='comments'
                                value={singleGateOutData.comments}
                                onChange={handleGateOutChange}
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
                            disabled={singleGateOutData.gateOutId === ''}
                            onClick={downloadGateOutReport}
                        >
                            <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
                            Print Report
                        </button>
                    </Col>
                </Row>

                {singleGateOutData.transType === 'FCL' && (
                    <div className="mt-3 table-responsive ">
                        <table className="table table-bordered table-hover tableHeader">
                            <thead className='tableHeader'>
                                <tr className='text-center'>
                                    <th scope="col">
                                        <Input
                                            type="checkbox"
                                            className="form-check-input radios"
                                            style={{ width: 25, height: 25 }}
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                        />

                                    </th>
                                    <th scope="col">IGM No</th>
                                    <th scope="col">Item No</th>
                                    <th scope="col">Container No</th>
                                    <th scope="col">Gross Wt</th>
                                    <th scope="col">No Of Package</th>
                                    <th scope="col">Qty Taken Out</th>
                                    <th scope="col">Vehicle No</th>
                                    <th scope="col">Driver</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gateOutData.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Input
                                                type="checkbox"
                                                className="form-check-input radios"
                                                style={{ width: 25, height: 25 }}
                                                // Check if the object for this index exists in selectedRows
                                                checked={selectedRows.some(row => row === gateOutData[index]) || item.gateOutId}
                                                disabled={item.gateOutId || item.holdStatus === 'H'} // Disable the checkbox if gateOutId is present
                                                onChange={(e) => handleRowCheckboxChange(e, index)}
                                            />

                                        </td>
                                        <td>{item.docRefNo}</td>
                                        <td>{item.igmLineNo}</td>
                                        <td>{item.containerNo}
                                            {item.holdStatus === 'H' ? <><br /><span style={{ color: 'red' }}>Container is hold</span></> : ''}
                                        </td>
                                        <td>{item.grossWt}</td>
                                        <td>{item.actualNoOfPackages}</td>
                                        <td>{item.qtyTakenOut}</td>
                                        <td>{item.vehicleNo}</td>
                                        <td>{item.driverName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {singleGateOutData.transType === 'LCL' && (
                    <div className="mt-3 table-responsive ">
                        <table className="table table-bordered table-hover tableHeader">
                            <thead className='tableHeader'>
                                <tr className='text-center'>
                                    <th scope="col">
                                        <Input
                                            type="checkbox"
                                            className="form-check-input radios"
                                            style={{ width: 25, height: 25 }}
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                        />

                                    </th>
                                    <th scope="col">IGM No</th>
                                    <th scope="col">Item No</th>
                                    <th scope="col">Cargo</th>
                                    <th scope="col">Gross Wt</th>
                                    <th scope="col">No Of Package</th>
                                    <th scope="col">Qty Taken Out</th>
                                    <th scope="col">Vehicle No</th>
                                    <th scope="col">Driver</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gateOutData.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Input
                                                type="checkbox"
                                                className="form-check-input radios"
                                                style={{ width: 25, height: 25 }}
                                                // Check if the object for this index exists in selectedRows
                                                checked={selectedRows.some(row => row === gateOutData[index]) || item.gateOutId}
                                                disabled={item.gateOutId || item.holdStatus === 'H'} // Disable the checkbox if gateOutId is present
                                                onChange={(e) => handleRowCheckboxChange(e, index)}
                                            />

                                        </td>
                                        <td>{item.docRefNo}</td>
                                        <td>{item.igmLineNo}
                                            {item.holdStatus === 'H' ? <><br /><span style={{ color: 'red' }}>Item is hold</span></> : ''}
                                        </td>
                                        <td>{item.commodityDescription}</td>
                                        <td>{item.grossWt}</td>
                                        <td>{item.actualNoOfPackages}</td>
                                        <td>{item.qtyTakenOut}</td>
                                        <td>{item.vehicleNo}</td>
                                        <td>{item.driverName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {singleGateOutData.transType === 'CONT' && (
                    <div className="mt-3 table-responsive ">
                        <table className="table table-bordered table-hover tableHeader">
                            <thead className='tableHeader'>
                                <tr className='text-center'>
                                    <th scope="col">
                                        <Input
                                            type="checkbox"
                                            className="form-check-input radios"
                                            style={{ width: 25, height: 25 }}
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                        />

                                    </th>
                                    <th scope="col">IGM No</th>
                                    <th scope="col">Item No</th>
                                    <th scope="col">Container No</th>
                                    <th scope="col">Cont Size&Type</th>
                                    <th scope="col">Gross Wt</th>
                                    <th scope="col">Vehicle No</th>
                                    <th scope="col">Driver</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gateOutData.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Input
                                                type="checkbox"
                                                className="form-check-input radios"
                                                style={{ width: 25, height: 25 }}
                                                // Check if the object for this index exists in selectedRows
                                                checked={selectedRows.some(row => row === gateOutData[index]) || item.gateOutId}
                                                disabled={item.gateOutId || item.holdStatus === 'H'} // Disable the checkbox if gateOutId is present
                                                onChange={(e) => handleRowCheckboxChange(e, index)}
                                            />

                                        </td>
                                        <td>{item.docRefNo}</td>
                                        <td>{item.igmLineNo}</td>
                                        <td>{item.containerNo}
                                            {item.holdStatus === 'H' ? <><br /><span style={{ color: 'red' }}>Container is hold</span></> : ''}
                                        </td>
                                        <td>{item.containerSize}{item.containerType}</td>
                                        <td>{item.grossWt}</td>
                                        <td>{item.vehicleNo}</td>
                                        <td>{item.driverName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}


            </div>
        </div>
    )
}
