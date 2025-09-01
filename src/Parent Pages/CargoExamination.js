
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
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faCalendarAlt, faAdd, faCancel, faXmark, faArrowDown, faPlus, faArrowUp, faEdit, faA } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import useAxios from '../Components/useAxios';
import { dark } from '@mui/material/styles/createPalette';
import { toast } from 'react-toastify';
import { error } from 'jquery';

export default function CargoExamination({ igm, igmTrans, item, cont, sealStatus, process, onRequest }) {
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
        if (process === 'P00210') {
            getLCLDestuffData1(igm);
        }

    }, [igm, igmTrans, item, cont, sealStatus, process])

    const [singleExamCrgData, setSingleExamCrgData] = useState({
        companyId: "",
        branchId: "",
        finYear: new Date().getFullYear(),
        examTallyId: "",
        examTallyLineId: "",
        deStuffId: "",
        deStuffLineId: "",
        deStuffDate: null,
        areaOccupied: null,
        onAccountOf: "",
        examTallyDate: new Date(),
        igmTransId: "",
        igmNo: "",
        profitCentreId: "",
        igmLineNo: "",
        shift: "Day",
        commodityDescription: "",
        periodicBill: "",
        noOfPackages: null,
        actualNoOfPackages: null,
        grossWeight: null,
        gateOutPackages: null,
        importerName: "",
        importerAddress1: "",
        importerAddress2: "",
        importerAddress3: "",
        sampleQty: 0,
        beNo: "",
        beDate: null,
        blNo: "",
        blDate: null,
        examiner: "",
        examinedPercentage: 0,
        typeOfCargo: "General",
        purpose: "",
        destuffCharges: null,
        chaCode: "",
        chaName: "",
        status: "",
        createdBy: "",
        createdDate: null,
        editedBy: "",
        editedDate: null,
        approvedBy: "",
        approvedDate: null
    })

    const [examCrgData, setExamCrgData] = useState([{
        companyId: "",
        branchId: "",
        finYear: new Date().getFullYear(),
        examTallyId: "",
        examTallyLineId: "",
        deStuffId: "",
        deStuffLineId: "",
        deStuffDate: null,
        areaOccupied: null,
        onAccountOf: "",
        examTallyDate: new Date(),
        igmTransId: "",
        igmNo: "",
        profitCentreId: "",
        igmLineNo: "",
        shift: "Day",
        commodityDescription: "",
        periodicBill: "",
        noOfPackages: null,
        actualNoOfPackages: null,
        grossWeight: null,
        gateOutPackages: null,
        importerName: "",
        importerAddress1: "",
        importerAddress2: "",
        importerAddress3: "",
        sampleQty: 0,
        beNo: "",
        beDate: null,
        blNo: "",
        blDate: null,
        examiner: "",
        examinedPercentage: 0,
        typeOfCargo: "General",
        purpose: "",
        destuffCharges: null,
        chaCode: "",
        chaName: "",
        status: "",
        createdBy: "",
        createdDate: null,
        editedBy: "",
        editedDate: null,
        approvedBy: "",
        approvedDate: null
    }])

    function handleInputChange(e) {
        const inputValue = e;
        const numericInput = inputValue.replace(/[^0-9.]/g, '');
        const parts = numericInput.split('.');
        const integerPart = parts[0].slice(0,12);
        let decimalPart = parts[1];

        // Limit decimal places if needed
        if (decimalPart !== undefined) {
            decimalPart = `.${decimalPart.slice(0, 3)}`;
        }

        const sanitizedInput = decimalPart !== undefined ? `${integerPart}${decimalPart}` : integerPart;
        return sanitizedInput;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let sanitizedValue = value;
        // if (['cargoValue', 'cargoDuty', 'beWt', 'mobileNo'].includes(name)) {
        //     sanitizedValue = handleInputChange(value);
        // }
        setSingleExamCrgData(prevState => ({
            ...prevState,
            [name]: sanitizedValue
        }));

    };

    const [error, setError] = useState([]);

    const updateExamCrg = (e, index) => {
        const { name, value } = e.target;
        let sanitizedValue = value;
        if (['sampleQty'].includes(name)) {
            sanitizedValue = handleInputChange(value);
        }
        setExamCrgData(prevState => {
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

    const [formErrors, setFormErrors] = useState({
        igmTransId: "",
        beNo: "",
        beDate: "",
        chaCode: "",
    })

    const [chaList, setChaList] = useState([]);

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
            setSingleExamCrgData({
                ...singleExamCrgData,
                chaCode: '',
                chaName: ''
            });
        }
        else {
            setSingleExamCrgData({
                ...singleExamCrgData,
                chaCode: selectedOption.value,
                chaName: selectedOption.label
            });
        }
        setFormErrors({ ...formErrors, chaCode: '' });
    }


    const handleClear = () => {
        setProfit('');
        setdestName('');
        setDestId('');
        setDestIgm('');
        setDestuffItems([]);
        setDestLineNo('');
        setSingleExamCrgData({
            companyId: "",
            branchId: "",
            finYear: new Date().getFullYear(),
            examTallyId: "",
            examTallyLineId: "",
            deStuffId: "",
            deStuffLineId: "",
            deStuffDate: null,
            areaOccupied: null,
            onAccountOf: "",
            examTallyDate: new Date(),
            igmTransId: "",
            igmNo: "",
            profitCentreId: "",
            igmLineNo: "",
            shift: "Day",
            commodityDescription: "",
            periodicBill: "",
            noOfPackages: null,
            actualNoOfPackages: null,
            grossWeight: null,
            gateOutPackages: null,
            importerName: "",
            importerAddress1: "",
            importerAddress2: "",
            importerAddress3: "",
            sampleQty: 0,
            beNo: "",
            beDate: null,
            blNo: "",
            blDate: null,
            examiner: "",
            examinedPercentage: 0,
            typeOfCargo: "General",
            purpose: "",
            destuffCharges: null,
            chaCode: "",
            chaName: "",
            status: "",
            createdBy: "",
            createdDate: null,
            editedBy: "",
            editedDate: null,
            approvedBy: "",
            approvedDate: null
        })

        setExamCrgData([{
            companyId: "",
            branchId: "",
            finYear: new Date().getFullYear(),
            examTallyId: "",
            examTallyLineId: "",
            deStuffId: "",
            deStuffLineId: "",
            deStuffDate: null,
            areaOccupied: null,
            onAccountOf: "",
            examTallyDate: new Date(),
            igmTransId: "",
            igmNo: "",
            profitCentreId: "",
            igmLineNo: "",
            shift: "Day",
            commodityDescription: "",
            periodicBill: "",
            noOfPackages: null,
            actualNoOfPackages: null,
            grossWeight: null,
            gateOutPackages: null,
            importerName: "",
            importerAddress1: "",
            importerAddress2: "",
            importerAddress3: "",
            sampleQty: 0,
            beNo: "",
            beDate: null,
            blNo: "",
            blDate: null,
            examiner: "",
            examinedPercentage: 0,
            typeOfCargo: "General",
            purpose: "",
            destuffCharges: null,
            chaCode: "",
            chaName: "",
            status: "",
            createdBy: "",
            createdDate: null,
            editedBy: "",
            editedDate: null,
            approvedBy: "",
            approvedDate: null
        }])

        setFormErrors({
            igmTransId: "",
            beNo: "",
            beDate: "",
            chaCode: "",
        })
    }


    const handleSave = () => {
        setLoading(true);

        let errors = {}

        if (!singleExamCrgData.igmTransId) {
            errors.igmTransId = "IGM Data not found."
        }

        if (!singleExamCrgData.chaCode) {
            errors.chaCode = "CHA is required."
        }

        if (!singleExamCrgData.beNo) {
            errors.beNo = "BE No is required."
        }

        if (!singleExamCrgData.beDate) {
            errors.beDate = "BE Date is required."
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setLoading(false);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            })
            return;
        }

        const formData = {
            crg: singleExamCrgData,
            crgs: examCrgData
        }

        axios.post(`${ipaddress}destuff/saveCargoExaminationData?cid=${companyid}&bid=${branchId}&user=${userId}`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                console.log("Examination data ", data);

                const singleData = response.data[0];

                if (data.length > 0) {
                    setSingleExamCrgData(singleData);
                    setExamCrgData(data);
                    getProfitCenter(singleData.profitCentreId);
                    toast.success("Data save successfully!!", {
                        autoClose: 800
                    })
                }
                else {
                    toast.error("Data not found", {
                        autoClose: 800
                    })
                }
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
            })
    }

    const [getDestuffData, setGetDestuffData] = useState([]);

    const [destId, setDestId] = useState('');
    const [destIgm, setDestIgm] = useState('');
    const [destName, setdestName] = useState('');
    const [destLineNo, setDestLineNo] = useState('');

    const getLCLDestuffData = (val) => {
        setGetDestuffData([]);
        if (!val) {


            return;
        }

        axios.get(`${ipaddress}cfigm/getDataOfLCLDestuff?cid=${companyid}&bid=${branchId}&con=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                console.log('dstuff data ', data);

                const portOptions = data.map(port => ({
                    value: port[1],
                    label: port[1] + '-' + port[0] + '-' + port[2],
                    igm: port[0],
                    con: port[2]
                }))
                setGetDestuffData(portOptions);
            })
            .catch((error) => {
                setGetDestuffData([]);
            })
    }

    const getLCLDestuffData1 = (val) => {
        console.log('examination data ', val);
        setGetDestuffData([]);
        if (!val) {


            return;
        }

        axios.get(`${ipaddress}cfigm/getDataOfLCLDestuff?cid=${companyid}&bid=${branchId}&con=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data[0];
                console.log('examination data ', response.data);


                setDestId(data[1]);
                setDestIgm(data[0]);
                setdestName(data[1] + '-' + data[0] + '-' + data[2]);
                getExistingDestuffLineData1(data[0], data[1]);
            })
            .catch((error) => {
                setGetDestuffData([]);
                getExistingDestuffLineData1(igm,igmTrans);
            })
    }

    const handlDestuffSelect = async (selectedOption, { action }) => {
        if (action === 'clear') {
            setdestName('');
            setDestId('');
            handleClear();
            setDestIgm('');
            setDestuffItems([]);
            setDestLineNo('');
        }
        else {
            setdestName(selectedOption.label);
            setDestId(selectedOption.value);
            setDestIgm(selectedOption.igm);
            getExistingDestuffLineData(selectedOption.igm, selectedOption.value);
        }

    }

    const [destuffItems, setDestuffItems] = useState([]);

    const getExistingDestuffLineData = (igm, igmtrans) => {

        axios.get(`${ipaddress}destuff/getLineDataFromIgmAndTrans?cid=${companyid}&bid=${branchId}&igm=${igm}&igmtrans=${igmtrans}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setDestuffItems(response.data);


            })
            .catch((error) => {
                setDestuffItems([]);
            })
    }

    const getExistingDestuffLineData1 = (igm, igmtrans) => {
        console.log('error data1 ',igm,' ',igmtrans,' ',item);
        axios.get(`${ipaddress}destuff/getLineDataFromIgmAndTrans?cid=${companyid}&bid=${branchId}&igm=${igm}&igmtrans=${igmtrans}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setDestuffItems(response.data);
                setDestLineNo(item ? item : response.data[0]);
                console.log('response.data[0] ', response.data[0]);
                console.log('destIgm, destId, item ? item : response.data[0] ',destIgm, ' ',destId, ' ',item ? item : response.data[0]);
                

                getExistingDestuffData1(igm, igmtrans, item ? item : response.data[0]);
            })
            .catch((error) => {
                console.log('error data ',igm,' ',igmtrans,' ',item);
                console.log('error data ',error.response.data);
                
                setDestuffItems([]);
                getLatestExaminationCargoId(igm, igmtrans, item);
            })
    }

    const getLatestExaminationCargoId = (igm,igmtrans,item) =>{
        console.log('getLatestExamCargoId ',igm,' ',igmtrans,' ',item);
        
        axios.get(`${ipaddress}destuff/getLatestExamCargoId?cid=${companyid}&bid=${branchId}&igm=${igm}&igmtrans=${igmtrans}&line=${item}`,{
            headers:{
                Authorization: `Bearer ${jwtToken}`
            }
        })
        .then((response)=>{
            const data = response.data;
            console.log('examtallyId ',data);
            
            getSearchedData(igm,igmtrans,data);
        })
        .catch((error)=>{
            toast.error(error.response.data,{
                autoClose:800
            })
        })
    }

    const [profit, setProfit] = useState('');

    const getProfitCenter = (id) => {
        console.log('id1 id ', id);

        axios.get(`${ipaddress}api/profitcentres/getDataByProfitCenterId1?companyId=${companyid}&branchId=${branchId}&profit=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                console.log('profit ', response.data);

                if (response.data == null) {
                    setProfit('');
                }
                else {
                    setProfit(response.data.profitcentreDesc);
                }
            })
            .catch((error) => {
                setProfit('');
            })
    }

    const getExistingDestuffData = () => {
        console.log('destIgm ', destIgm, ' ', destId, ' ', destLineNo);

        if (!destIgm || !destId || !destLineNo) {
            toast.error("IGM No and Item no is requuired.", {
                autoClose: 800
            })
            return;
        }

        axios.get(`${ipaddress}destuff/getDataFromIgmAndTrans?cid=${companyid}&bid=${branchId}&igm=${destIgm}&igmtrans=${destId}&igmLineNo=${destLineNo}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {

                const data = response.data;
                const item = data[0]
                getProfitCenter(item.profitcentreId);

                setSingleExamCrgData({
                    companyId: companyid,
                    branchId: branchId,
                    finYear: new Date().getFullYear(),
                    examTallyId: "",
                    examTallyLineId: "",
                    deStuffId: item.deStuffId || "",
                    deStuffLineId: item.deStuffLineId || "",
                    deStuffDate: new Date(item.deStuffDate) || null,
                    areaOccupied: item.areaOccupied || null,
                    onAccountOf: "",
                    examTallyDate: new Date(),
                    igmTransId: item.igmTransId || "",
                    igmNo: item.igmNo || "",
                    profitCentreId: item.profitcentreId || "",
                    igmLineNo: item.igmLineNo || "",
                    shift: "Day",
                    commodityDescription: item.commodityDescription || "",
                    periodicBill: "",
                    noOfPackages: item.noOfPackages || null,
                    actualNoOfPackages: null,
                    grossWeight: item.grossWeight || null,
                    gateOutPackages: null,
                    importerName: item.importerName || "",
                    importerAddress1: item.importerAddress1 || "",
                    importerAddress2: item.importerAddress2 || "",
                    importerAddress3: item.importerAddress3 || "",
                    sampleQty: 0,
                    beNo: item.beNo || "",
                    beDate: item.beDate || null,
                    blNo: "",
                    blDate: null,
                    examiner: "",
                    examinedPercentage: 0,
                    typeOfCargo: "General",
                    purpose: "",
                    destuffCharges: null,
                    chaCode: "",
                    chaName: "",
                    status: "",
                    createdBy: "",
                    createdDate: null,
                    editedBy: "",
                    editedDate: null,
                    approvedBy: "",
                    approvedDate: null

                })

                setExamCrgData(data.map(item => ({
                    companyId: companyid,
                    branchId: branchId,
                    finYear: new Date().getFullYear(),
                    examTallyId: "",
                    examTallyLineId: "",
                    deStuffId: item.deStuffId || "",
                    deStuffLineId: item.deStuffLineId || "",
                    deStuffDate: new Date(item.deStuffDate) || null,
                    areaOccupied: item.areaOccupied || null,
                    onAccountOf: "",
                    examTallyDate: new Date(),
                    igmTransId: item.igmTransId || "",
                    igmNo: item.igmNo || "",
                    profitCentreId: item.profitcentreId || "",
                    igmLineNo: item.igmLineNo || "",
                    shift: "Day",
                    commodityDescription: item.commodityDescription || "",
                    periodicBill: "",
                    noOfPackages: item.noOfPackages || null,
                    actualNoOfPackages: null,
                    grossWeight: item.grossWeight || null,
                    gateOutPackages: null,
                    importerName: item.importerName || "",
                    importerAddress1: item.importerAddress1 || "",
                    importerAddress2: item.importerAddress2 || "",
                    importerAddress3: item.importerAddress3 || "",
                    sampleQty: 0,
                    beNo: item.beNo || "",
                    beDate: item.beDate || null,
                    blNo: "",
                    blDate: null,
                    examiner: "",
                    examinedPercentage: 0,
                    typeOfCargo: "General",
                    purpose: "",
                    destuffCharges: null,
                    chaCode: "",
                    chaName: "",
                    status: "",
                    createdBy: "",
                    createdDate: null,
                    editedBy: "",
                    editedDate: null,
                    approvedBy: "",
                    approvedDate: null
                })));

            })
            .catch((error) => {

            })
    }



    const getExistingDestuffData1 = (destIgm1, destId1, destLineNo1) => {
        console.log('destIgm1 ', destIgm1, ' ', destId1, ' ', destLineNo1);

        if (!destIgm1 || !destId1 || !destLineNo1) {
            toast.error("IGM No and Item no is requuired.", {
                autoClose: 800
            })
            return;
        }

        axios.get(`${ipaddress}destuff/getDataFromIgmAndTrans?cid=${companyid}&bid=${branchId}&igm=${destIgm1}&igmtrans=${destId1}&igmLineNo=${destLineNo1}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {

                const data = response.data;
                const item = data[0]
                getProfitCenter(item.profitcentreId);

                setSingleExamCrgData({
                    companyId: companyid,
                    branchId: branchId,
                    finYear: new Date().getFullYear(),
                    examTallyId: "",
                    examTallyLineId: "",
                    deStuffId: item.deStuffId || "",
                    deStuffLineId: item.deStuffLineId || "",
                    deStuffDate: new Date(item.deStuffDate) || null,
                    areaOccupied: item.areaOccupied || null,
                    onAccountOf: "",
                    examTallyDate: new Date(),
                    igmTransId: item.igmTransId || "",
                    igmNo: item.igmNo || "",
                    profitCentreId: item.profitcentreId || "",
                    igmLineNo: item.igmLineNo || "",
                    shift: "Day",
                    commodityDescription: item.commodityDescription || "",
                    periodicBill: "",
                    noOfPackages: item.noOfPackages || null,
                    actualNoOfPackages: null,
                    grossWeight: item.grossWeight || null,
                    gateOutPackages: null,
                    importerName: item.importerName || "",
                    importerAddress1: item.importerAddress1 || "",
                    importerAddress2: item.importerAddress2 || "",
                    importerAddress3: item.importerAddress3 || "",
                    sampleQty: 0,
                    beNo: item.beNo || "",
                    beDate: item.beDate || null,
                    blNo: "",
                    blDate: null,
                    examiner: "",
                    examinedPercentage: 0,
                    typeOfCargo: "General",
                    purpose: "",
                    destuffCharges: null,
                    chaCode: "",
                    chaName: "",
                    status: "",
                    createdBy: "",
                    createdDate: null,
                    editedBy: "",
                    editedDate: null,
                    approvedBy: "",
                    approvedDate: null

                })

                setExamCrgData(data.map(item => ({
                    companyId: companyid,
                    branchId: branchId,
                    finYear: new Date().getFullYear(),
                    examTallyId: "",
                    examTallyLineId: "",
                    deStuffId: item.deStuffId || "",
                    deStuffLineId: item.deStuffLineId || "",
                    deStuffDate: new Date(item.deStuffDate) || null,
                    areaOccupied: item.areaOccupied || null,
                    onAccountOf: "",
                    examTallyDate: new Date(),
                    igmTransId: item.igmTransId || "",
                    igmNo: item.igmNo || "",
                    profitCentreId: item.profitcentreId || "",
                    igmLineNo: item.igmLineNo || "",
                    shift: "Day",
                    commodityDescription: item.commodityDescription || "",
                    periodicBill: "",
                    noOfPackages: item.noOfPackages || null,
                    actualNoOfPackages: null,
                    grossWeight: item.grossWeight || null,
                    gateOutPackages: null,
                    importerName: item.importerName || "",
                    importerAddress1: item.importerAddress1 || "",
                    importerAddress2: item.importerAddress2 || "",
                    importerAddress3: item.importerAddress3 || "",
                    sampleQty: 0,
                    beNo: item.beNo || "",
                    beDate: item.beDate || null,
                    blNo: "",
                    blDate: null,
                    examiner: "",
                    examinedPercentage: 0,
                    typeOfCargo: "General",
                    purpose: "",
                    destuffCharges: null,
                    chaCode: "",
                    chaName: "",
                    status: "",
                    createdBy: "",
                    createdDate: null,
                    editedBy: "",
                    editedDate: null,
                    approvedBy: "",
                    approvedDate: null
                })));

            })
            .catch((error) => {

            })
    }


    const [isModalOpenForExamination, setisModalOpenForExamination] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchData, setSearchData] = useState([]);

    const search = (val) => {
        setLoading(true);
        // if(!val){
        //     setSearchData([]);
        //     setLoading(false);

        //     toast.error("Please enter input value!!",{
        //         autoClose:800
        //     })
        //     return;
        // }

        axios.get(`${ipaddress}destuff/searchExaminationData?cid=${companyid}&bid=${branchId}&value=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setSearchData(response.data);
                toast.success("Data found successfully!!", {
                    autoClose: 800
                })
                setCurrentPage2(1);
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })
    }

    const openExaminationModal = () => {
        setisModalOpenForExamination(true);
        search('');
    }

    const closeExaminationModal = () => {
        setSearchValue('');
        setSearchData([]);
        setisModalOpenForExamination(false);
    }


    const handleSerchClear = () => {
        setSearchValue('');
        search('');
    }

    const [currentPage2, setCurrentPage2] = useState(1);
    const [itemsPerPage2] = useState(5);

    const indexOfLastItem2 = currentPage2 * itemsPerPage2;
    const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;
    const currentItems2 = searchData.slice(indexOfFirstItem2, indexOfLastItem2);
    const totalPages2 = Math.ceil(searchData.length / itemsPerPage2);

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

    const getSearchedData = (igm, igmtrans, examtally) => {
        axios.get(`${ipaddress}destuff/getSearchedData?cid=${companyid}&bid=${branchId}&igm=${igm}&igmtrans=${igmtrans}&examTallyId=${examtally}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                console.log("Examination data ", data);

                const singleData = response.data[0];

                if (data.length > 0) {
                    setSingleExamCrgData(singleData);
                    setExamCrgData(data);
                    getProfitCenter(singleData.profitCentreId);
                    toast.success("Data found successfully!!", {
                        autoClose: 800
                    })
                    closeExaminationModal();
                }
                else {
                    toast.error("Data not found", {
                        autoClose: 800
                    })
                }
            })
            .catch((error) => {

            })
    }


    return (
        <div>
            <Modal Modal isOpen={isModalOpenForExamination} onClose={closeExaminationModal} toggle={closeExaminationModal} style={{ maxWidth: '900px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                <ModalHeader toggle={closeExaminationModal} style={{
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
                    /> Search Examination Data </h5>



                </ModalHeader>
                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Search By Exam Tally Id / IGM No / IGM Trans Id / BE No
                                </label>
                                <Input
                                    className="form-control"
                                    type="text"
                                    id="searchValue"
                                    name='searchValue'
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                />

                            </FormGroup>
                        </Col>
                        <Col md={3} style={{ marginTop: 19 }}>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ height: 33, fontSize: 14, marginRight: 5 }}
                                id="submitbtn2"
                                onClick={() => { search(searchValue); setCurrentPage2(1) }}
                            >
                                <FontAwesomeIcon icon={faSearch} style={{ marginRight: 5 }} />
                                Search

                            </button>
                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ height: 33, fontSize: 14 }}
                                id="submitbtn2"
                                onClick={() => handleSerchClear()}
                            >
                                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: 5 }} />
                                Clear

                            </button>

                        </Col>
                    </Row>
                    <div className="mt-3 table-responsive">
                        <table className="table table-bordered table-hover tableHeader">
                            <thead className="tableHeader">
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Exam Tally Id</th>
                                    <th scope="col">Exam Tally Date</th>
                                    <th scope="col">IGM No</th>
                                    <th scope="col">IGM Trans Id</th>
                                    <th scope="col">Profitcentre</th>
                                    <th scope="col">BE No</th>
                                    <th scope="col">BE Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems2.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input onChange={() => getSearchedData(item[2], item[3], item[0])} type="radio" name="radioGroup" value={item[0]} />
                                        </td>
                                        <td>{item[0]}</td>
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
            <Row>
                <Col md={3}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Search By IGM No / Container No
                        </label>
                        <Select

                            value={{ value: destId, label: destName }}
                            onChange={handlDestuffSelect}
                            onInputChange={getLCLDestuffData}
                            options={getDestuffData}
                            placeholder="Select CHA"
                            isClearable
                            id="destId"
                            name="destId"


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
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Item No
                        </label>
                        <Input
                            className="form-control"
                            type="select"
                            id="destLineNo"
                            name='destLineNo'
                            value={destLineNo}
                            onChange={(e) => setDestLineNo(e.target.value)}

                        >
                            <option value="">Select Item No</option>
                            {destuffItems.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}

                        </Input>
                    </FormGroup>
                </Col>
                <Col md={3} style={{ marginTop: 15 }}>
                    <button
                        className="btn btn-outline-primary btn-margin newButton"
                        style={{ marginRight: 10 }}
                        id="submitbtn2"
                        onClick={getExistingDestuffData}
                    >
                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: 5 }} />
                        Search

                    </button>

                </Col>
            </Row>
            <hr />
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Exam Tally Id
                        </label>
                        <Row>
                            <Col md={9}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    id="examTallyId"
                                    name='examTallyId'
                                    value={singleExamCrgData.examTallyId}
                                    onChange={handleChange}
                                    disabled
                                />
                            </Col>
                            <Col md={3}>
                                <button
                                    className="btn btn-outline-primary btn-margin newButton"
                                    id="submitbtn2"
                                    onClick={openExaminationModal}
                                    style={{ height: 33 }}
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
                            Exam Tally Date
                        </label>
                        <div style={{ position: 'relative' }}>
                            <DatePicker

                                id="examTallyDate"
                                name='examTallyDate'
                                selected={singleExamCrgData.examTallyDate}
                                dateFormat="dd/MM/yyyy HH:mm"
                                timeInputLabel="Time:"
                                showTimeInput
                                disabled
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                className="form-control border-right-0 inputField"
                                wrapperClassName="custom-react-datepicker-wrapper"
                            />
                            <FontAwesomeIcon
                                icon={faCalendarAlt}
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    pointerEvents: "none",
                                    color: "#6c757d",
                                }}
                            />

                        </div>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            IGM Trans Id <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Input
                            className="form-control"
                            type="text"
                            id="igmTransId"
                            name='igmTransId'
                            style={{ borderColor: formErrors.igmTransId ? 'red' : '' }}
                            value={singleExamCrgData.igmTransId}
                            onChange={handleChange}
                            disabled
                        />
                        <div style={{ color: 'red' }} className="error-message">{formErrors.igmTransId}</div>
                    </FormGroup>
                </Col>
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
                            value={singleExamCrgData.igmNo}
                            onChange={handleChange}
                            disabled
                        />
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
                            value={singleExamCrgData.status === 'A' ? 'Approved' : ""}
                            onChange={handleChange}
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
                            value={singleExamCrgData.createdBy}
                            onChange={handleChange}
                            disabled
                        />
                    </FormGroup>
                </Col>

            </Row>

            <Row>

                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Shift
                        </label>
                        <Input
                            className="form-control"
                            type="select"
                            id="shift"
                            name='shift'
                            value={singleExamCrgData.shift}
                            onChange={handleChange}

                        >
                            <option value="Day">Day</option>
                            <option value="Second">Second</option>
                            <option value="Third">Third</option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            CHA <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Select

                            value={{ value: singleExamCrgData.chaCode, label: singleExamCrgData.chaName }}
                            onChange={handleChaSelect}
                            onInputChange={handleCHAList}
                            options={chaList}
                            placeholder="Select CHA"
                            isClearable
                            id="chaCode"
                            name="chaCode"
                            className={`autocompleteHeight ${formErrors.chaCode ? 'error-border' : ''}`}

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
                        <div style={{ color: 'red' }} className="error-message">{formErrors.chaCode}</div>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            BE No <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Input
                            className="form-control"
                            type="text"
                            id="beNo"
                            name='beNo'
                            value={singleExamCrgData.beNo}
                            maxLength={15}
                            onChange={(e) => { handleChange(e); setFormErrors({ ...formErrors, beNo: '' }); }}
                            style={{ borderColor: formErrors.beNo ? 'red' : '' }}
                        />
                        <div style={{ color: 'red' }} className="error-message">{formErrors.beNo}</div>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            BE Date <span style={{ color: 'red' }}>*</span>
                        </label>
                        <div style={{ position: 'relative' }}>
                            <DatePicker
                                selected={singleExamCrgData.beDate}
                                onChange={(date) => {
                                    setSingleExamCrgData({
                                        ...singleExamCrgData,
                                        beDate: date
                                    }); setFormErrors({ ...formErrors, beDate: '' })
                                }}
                                id="beDate"
                                name="beDate"
                                dateFormat="dd/MM/yyyy"
                                timeInputLabel="Time:"
                                timeFormat="HH:mm"

                                timeIntervals={15}
                                className={`form-control border-right-0 inputField ${formErrors.beDate ? 'error-border' : ''}`}
                                wrapperClassName="custom-react-datepicker-wrapper"
                            />
                            <FontAwesomeIcon
                                icon={faCalendarAlt}
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    pointerEvents: "none",
                                    color: "#6c757d",
                                }}
                            />

                        </div>
                        <div style={{ color: 'red' }} className="error-message">{formErrors.beDate}</div>
                    </FormGroup>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Profitcentre
                        </label>
                        <Input
                            className="form-control"
                            type="text"
                            id="profitCentreId"
                            name='profitCentreId'
                            value={profit}
                            onChange={handleChange}
                            disabled

                        />
                    </FormGroup>
                </Col>


            </Row>
            <hr />
            <Row>
                <Col className='text-center'>
                    <button
                        className="btn btn-outline-primary btn-margin newButton"
                        style={{ marginRight: 10 }}
                        id="submitbtn2"
                        onClick={handleSave}
                    >
                        <FontAwesomeIcon icon={faSave} style={{ marginRight: 5 }} />
                        Save

                    </button>
                    <button
                        className="btn btn-outline-danger btn-margin newButton"
                        style={{ marginRight: 10 }}
                        id="submitbtn2"
                        onClick={handleClear}
                    >
                        <FontAwesomeIcon icon={faRefresh} style={{ marginRight: 5 }} />
                        Clear
                    </button>
                </Col>
            </Row>
            <div className="mt-3 table-responsive">
                <table className="table table-bordered table-hover tableHeader">
                    <thead className="tableHeader">
                        <tr>
                            <th scope="col">Item No</th>
                            <th scope="col">Commodity Desc</th>
                            <th scope="col">No Of Pkgs</th>
                            <th scope="col">DeStuff Id</th>
                            <th scope="col">DeStuff Date</th>
                            <th scope="col">Area Occupied</th>
                            <th scope="col">Gross Weight</th>
                            <th scope="col">Examined Qty</th>
                            <th scope="col">Exam Percentage</th>
                            <th scope="col">Type of Cargo</th>
                            <th scope="col">Importer Name</th>
                            <th scope="col">Examiner</th>
                            <th scope="col">Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        {examCrgData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.igmLineNo}</td>
                                <td>{item.commodityDescription}</td>
                                <td>{item.noOfPackages}</td>
                                <td>{item.deStuffId}</td>
                                <td>
                                    <div style={{ position: 'relative', width: 150 }}>
                                        <DatePicker
                                            selected={item.deStuffDate}
                                            id="deStuffDate"
                                            name="deStuffDate"
                                            dateFormat="dd/MM/yyyy HH:mm"
                                            timeInputLabel="Time:"
                                            disabled
                                            showTimeInput
                                            popperPlacement="right-start"
                                            timeFormat="HH:mm"
                                            timeIntervals={15}
                                            className="form-control border-right-0 inputField"
                                            wrapperClassName="custom-react-datepicker-wrapper"
                                        />
                                        <FontAwesomeIcon
                                            icon={faCalendarAlt}
                                            style={{
                                                position: "absolute",
                                                right: "10px",
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                pointerEvents: "none",
                                                color: "#6c757d",
                                            }}
                                        />

                                    </div>
                                </td>
                                <td>{item.areaOccupied}</td>
                                <td>{item.grossWeight}</td>
                                <td>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        id="sampleQty"
                                        name='sampleQty'
                                        value={item.sampleQty <= item.noOfPackages ? item.sampleQty : ''}
                                        onChange={(e) => updateExamCrg(e, index)}
                                    />
                                </td>
                                <td>
                                    <Input
                                        className="form-control"
                                        type="select"
                                        id="examinedPercentage"
                                        name='examinedPercentage'
                                        value={item.examinedPercentage}
                                        onChange={(e) => updateExamCrg(e, index)}

                                    >
                                        <option value="0">0</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </Input>
                                </td>
                                <td>
                                    <Input
                                        className="form-control"
                                        type="select"
                                        id="typeOfCargo"
                                        name='typeOfCargo'
                                        value={item.typeOfCargo}
                                        onChange={(e) => updateExamCrg(e, index)}
                                        style={{ width: 120 }}

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
                                </td>
                                <td>{item.importerName}</td>
                                <td>
                                    <Input
                                        className="form-control"
                                        type="textarea"
                                        id="examiner"
                                        name='examiner'
                                        value={item.examiner}
                                        onChange={(e) => updateExamCrg(e, index)}
                                        style={{ width: 150 }}
                                    />
                                </td>
                                <td>
                                    <Input
                                        className="form-control"
                                        type="textarea"
                                        id="purpose"
                                        name='purpose'
                                        value={item.purpose}
                                        onChange={(e) => updateExamCrg(e, index)}
                                        style={{ width: 150 }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
