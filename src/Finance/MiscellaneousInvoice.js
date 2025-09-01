
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
    CardTitle,
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Label,
    Input,
    Table,
} from "reactstrap";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faChartGantt, faUsersViewfinder, faBackward, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faCalendarAlt, faAdd, faCancel, faXmark, faArrowDown, faPlus, faArrowUp, faEdit, faChevronUp, faChevronDown, faMagnifyingGlassChart, faProcedures, faSpinner, faPrint, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import useAxios from '../Components/useAxios';
import { dark } from '@mui/material/styles/createPalette';
import { toast } from 'react-toastify';
import { CSSTransition } from 'react-transition-group';
import { error } from 'jquery';
import financeService from '../service/financeService';
import { parse } from '@fortawesome/fontawesome-svg-core';
import printformat1 from '../Images/printformat1.png';
import printformat2 from '../Images/printformat2.png';


export default function MiscellaneousInvoice({ activeTab }) {
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

    const [profitData, setProfitData] = useState([]);

    const getProfitCenters = () => {
        axios.get(`${ipaddress}api/profitcentres/getAllProfitCenters?companyId=${companyid}&branchId=${branchId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                console.log('Profitcentre data ', response.data);

                if (response.data.length === 0) {
                    setProfitData([]);
                }
                else {
                    setProfitData(response.data);
                }

            })
            .catch((error) => {
                setProfitData([]);
            })
    }

    const [services, setServices] = useState([]);

    const getServices = () => {
        axios.get(`${ipaddress}assessment/getServices?cid=${companyid}&bid=${branchId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const portOptions = data.map(port => ({
                    value: port[0],
                    label: port[1],
                    unit: port[2],
                    unit1: port[4],
                    rate: port[3],
                    tariffNo: port[5],
                    amdNo: port[6]
                }))
                setServices(portOptions);
            })
            .catch((error) => {

            })
    }

    const [taxData, setTaxData] = useState([]);

    const getTaxData = () => {
        axios.get(`${ipaddress}assessment/getTax?cid=${companyid}&bid=${branchId}`)
            .then((response) => {
                setTaxData(response.data);
            })
            .catch((error) => {

            })
    }

    const [sacCodeData, setSacCodeData] = useState([]);

    const getSacCodeData = () => {
        axios.get(`${ipaddress}jardetail/jarIdList/J00024/${companyid}`)
            .then((response) => {
                setSacCodeData(response.data);
            })
            .catch((error) => {

            })
    }

    useEffect(() => {
        if (activeTab === 'P01109') {
            getSacCodeData();
            getProfitCenters();
            getServices();
            getTaxData();
        }
    }, [activeTab])

    const handleChangeServices = async (selectedOption, { action }, index) => {
        if (action === 'clear') {
            setServiceData(prevState => {
                const updatedData = [...prevState];
                updatedData[index] = {
                    ...updatedData[index],
                    serviceId: '',
                    serviceDesc: '',
                    serviceUnit: '',
                    serviceUnit1: '',
                    rate: '',
                    executionUnit: "",
                    executionUnit1: "",
                    rate: "",
                    totalRate: "",
                    tariffNo: "",
                    amdNo: "",
                    taxId: ""
                };
                return updatedData;
            });
        } else {
            // Check if the selectedOption.value already exists in addService
            setServiceData(prevState => {
                // Check if selectedOption.value already exists in the previous state
                const exists = prevState.some(service => service.serviceId === selectedOption.value);

                if (!exists) {
                    const updatedData = [...prevState];

                    // Update the specific index with the selected values
                    updatedData[index] = {
                        ...updatedData[index],
                        serviceId: selectedOption.value,
                        serviceDesc: selectedOption.label,
                        serviceUnit: selectedOption.unit,
                        serviceUnit1: selectedOption.unit1,
                        rate: selectedOption.rate,
                        executionUnit: "",
                        executionUnit1: "",
                        totalRate: "",
                        tariffNo: selectedOption.tariffNo,
                        amdNo: selectedOption.amdNo,
                    };

                    // Check if there's an empty row (serviceId is empty) in the updated data
                    const emptyRowExists = updatedData.some(service => service.serviceId === '');

                    // If no empty row exists, add a new empty row
                    if (!emptyRowExists) {
                        updatedData.push({
                            assesmentId: "",
                            serviceId: "",
                            serviceDesc: "",
                            sacCode: "",
                            taxPerc: "",
                            serviceUnit: "",
                            executionUnit: "",
                            serviceUnit1: "",
                            executionUnit1: "",
                            rate: "",
                            totalRate: "",
                            tariffNo: "",
                            amdNo: ""
                        });
                    }

                    return updatedData;
                }

                // If the value already exists, return the previous state without any modification
                return prevState;
            });
        }
    };

    const handleServiceChange = (e, index) => {
        const { name, value } = e.target;

        // Sanitize the input value if necessary
        let sanitizeValue = value;

        // If the field is 'executionUnit', 'executionUnit1', or 'rate', sanitize it
        if (['executionUnit', 'executionUnit1', 'rate'].includes(name)) {
            sanitizeValue = handleInputChange(value, 8, 3); // Assuming `handleInputChange` is a sanitization function
        }

        // Create a copy of the current state
        const updatedData = [...serviceData];

        // Update the specific field in the row
        updatedData[index][name] = sanitizeValue;

        if (name === 'taxPerc') {
            const selectedOption = e.target.options[e.target.selectedIndex];
            const value1 = selectedOption.value; // Standard value
            const value2 = selectedOption.getAttribute('data-value2'); // Custom value
            console.log('value2 ', value2);

            updatedData[index]['taxId'] = value2;
        }

        // Calculate totalRate if any of the relevant fields are updated
        if (['executionUnit', 'executionUnit1', 'rate'].includes(name)) {
            const exe = parseFloat(updatedData[index].executionUnit) || 1; // Default to 1 if empty or invalid
            const exe1 = parseFloat(updatedData[index].executionUnit1) || 1; // Default to 1 if empty or invalid
            const rate = parseFloat(updatedData[index].rate) || 0; // Default to 0 if empty or invalid

            // Calculate totalRate
            const totalrate = (exe * exe1 * rate).toFixed(3); // Limit to 3 decimal places
            updatedData[index].totalRate = totalrate; // Update totalRate in the row
        }

        // Update the state
        setServiceData(updatedData);
    };


    const [assessmentData, setAssessmentData] = useState({
        companyId: "",
        branchId: "",
        assesmentId: "",
        assesmentLineNo: "",
        transType: "",
        assesmentDate: new Date(),
        igmTransId: "",
        invType: "PD",
        status: "",
        igmNo: "",
        igmLineNo: "",
        viaNo: "",
        igmDate: null,
        createdBy: "",
        blNo: "",
        blDate: null,
        profitcentreId: "N00001",
        sl: "",
        sa: "",
        insuranceValue: "",
        dutyValue: "",
        commodityDescription: "",
        commodityCode: "",
        importerId: "",
        importerName: "",
        impSrNo: "",
        cha: "",
        chaSrNo: "",
        sez: "N",
        taxApplicable: "Y",
        onAccountOf: "",
        accSrNo: "",
        comments: "",
        othPartyId: "",
        othSrNo: "",
        billingParty: "",
        invoiceNo: "",
        creditType: "N",
        invoiceCategory: "SINGLE",
        isAncillary: "N",
        invoiceDate: null,
        irn: "",
        receiptNo: "",
        intComments: "",
        impAddress: "",
        impGst: "",
        chaAddress: "",
        chaName: "",
        chaGst: "",
        fwdGst: "",
        fwdName: "",
        fwdState: "",
        accHolderGst: "",
        accHolderName: "",
        accHolderState: "",
        creditAllowed: "",
        saId: "",
        slId: "",
        lastAssesmentId: "",
        lastAssesmentDate: null,
        lastInvoiceNo: "",
        lastInvoiceDate: null

    })

    const [serviceData, setServiceData] = useState([{
        assesmentId: "",
        serviceId: "",
        serviceDesc: "",
        sacCode: "",
        taxPerc: "",
        serviceUnit: "",
        executionUnit: "",
        serviceUnit1: "",
        executionUnit1: "",
        rate: "",
        totalRate: "",
        tariffNo: "",
        amdNo: "",
        taxId: ""
    }])

    const handleAddRow = () => {
        const newRow = {
            assesmentId: "",
            serviceId: "",
            serviceDesc: "",
            sacCode: "",
            taxPerc: "",
            serviceUnit: "",
            executionUnit: "",
            serviceUnit1: "",
            executionUnit1: "",
            rate: "",
            totalRate: "",
            tariffNo: "",
            amdNo: "",
            taxId: ""
        };

        // Update state by adding the new row
        setServiceData([...serviceData, newRow]);
    };
    function handleInputChange(e, val1, val2) {
        const inputValue = e.toString(); // Convert e to string
        const numericInput = inputValue.replace(/[^0-9.]/g, ''); // Remove non-numeric characters
        const parts = numericInput.split('.'); // Split on decimal point
        const integerPart = parts[0].slice(0, val1); // Limit integer part to val1 digits

        let decimalPart = parts[1]; // Get decimal part

        // If val2 is 0, do not allow any decimal point
        if (val2 === 0) {
            return integerPart; // Return only the integer part
        }

        // Limit decimal places if val2 > 0
        if (decimalPart !== undefined) {
            decimalPart = `.${decimalPart.slice(0, val2)}`; // Limit decimal part to val2 digits
        }

        // Combine integer and decimal parts
        const sanitizedInput = decimalPart !== undefined ? `${integerPart}${decimalPart}` : integerPart;
        return sanitizedInput; // Return sanitized input
    }

    const handleAssessmentChange = (e, val1, val2) => {
        const { name, value } = e.target;
        let sanitizeValue = value

        if (['insuranceValue', 'dutyValue'].includes(name)) {
            sanitizeValue = handleInputChange(value, val1, val2)
        }
        console.log('sanitizeValue ', sanitizeValue);

        if (name === 'commodityCode') {
            setAssessmentData(prevState => ({
                ...prevState,
                [name]: sanitizeValue,
                sez: (sanitizeValue === 'AGRO') ? 'N' : assessmentData.sez,
                taxApplicable: (sanitizeValue === 'AGRO') ? 'N' : assessmentData.taxApplicable

            }));
        }
        else {
            setAssessmentData(prevState => ({
                ...prevState,
                [name]: sanitizeValue

            }));
        }


    };

    const [impData, setImpData] = useState([]);

    const getImpData = (val) => {
        if (!val) {
            setImpData([]);
            return;
        }

        axios.get(`${ipaddress}party/getImpExp?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;

                const partyOptions = data.map(port => ({
                    value: port[0],
                    label: port[1] + ' - ' + port[2] + ' ' + port[3] + ' ' + port[4],
                    impName: port[1],
                    gst: port[6],
                    address: port[2] + ' ' + port[3] + ' ' + port[4],
                    srNo: port[5]
                }))

                setImpData(partyOptions);
            })
            .catch((error) => {
                setImpData([]);
            })
    }


    const handleImpChange = async (selectedOption, { action }) => {

        if (action === 'clear') {

            setAssessmentData((prev) => ({
                ...prev,
                impAddress: "",
                impGst: "",
                importerId: "",
                importerName: "",
                impSrNo: ""
            }));
        }
        else {
            setAssessmentData((prev) => ({
                ...prev,
                impAddress: selectedOption.address,
                impGst: selectedOption.gst,
                importerId: selectedOption.value,
                importerName: selectedOption.impName,
                impSrNo: selectedOption.srNo
            }));
        }
    };


    const [chaData, setChaData] = useState([]);

    const getChaData = (val) => {
        if (!val) {
            setChaData([]);
            return;
        }

        axios.get(`${ipaddress}party/getChaWithAdd?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;

                const partyOptions = data.map(port => ({
                    value: port[0],
                    label: port[1] + ' - ' + port[2] + ' ' + port[3] + ' ' + port[4],
                    impName: port[1],
                    gst: port[6],
                    address: port[2] + ' ' + port[3] + ' ' + port[4],
                    srNo: port[5]
                }))

                setChaData(partyOptions);
            })
            .catch((error) => {
                setChaData([]);
            })
    }


    const handleChaChange = async (selectedOption, { action }) => {

        if (action === 'clear') {

            setAssessmentData((prev) => ({
                ...prev,
                chaAddress: "",
                chaGst: "",
                cha: "",
                chaName: "",
                chaSrNo: ""
            }));
        }
        else {
            setAssessmentData((prev) => ({
                ...prev,
                chaAddress: selectedOption.address,
                chaGst: selectedOption.gst,
                cha: selectedOption.value,
                chaName: selectedOption.impName,
                chaSrNo: selectedOption.srNo
            }));
        }
    };



    const [accData, setAccData] = useState([]);

    const getAccData = (val) => {
        if (!val) {
            setAccData([]);
            return;
        }

        axios.get(`${ipaddress}party/getAllWithAdd?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;

                const partyOptions = data.map(port => ({
                    value: port[0],
                    label: port[1] + ' - ' + port[2] + ' ' + port[3] + ' ' + port[4],
                    impName: port[1],
                    gst: port[6],
                    address: port[2] + ' ' + port[3] + ' ' + port[4],
                    srNo: port[5],
                    state: port[7]
                }))

                setAccData(partyOptions);
            })
            .catch((error) => {
                setAccData([]);
            })
    }


    const handleAccChange = async (selectedOption, { action }) => {

        if (action === 'clear') {

            setAssessmentData((prev) => ({
                ...prev,
                accHolderGst: "",
                othPartyId: "",
                accHolderName: "",
                othSrNo: "",
                accHolderState: ""
            }));
        }
        else {
            setAssessmentData((prev) => ({
                ...prev,
                accHolderGst: selectedOption.gst,
                othPartyId: selectedOption.value,
                accHolderName: selectedOption.impName,
                othSrNo: selectedOption.srNo,
                accHolderState: selectedOption.state
            }));
        }
    };


    const [fwdData, setFwdData] = useState([]);

    const getFwdData = (val) => {
        if (!val) {
            setFwdData([]);
            return;
        }

        axios.get(`${ipaddress}party/getForwarder?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;

                const partyOptions = data.map(port => ({
                    value: port[0],
                    label: port[1] + ' - ' + port[2] + ' ' + port[3] + ' ' + port[4],
                    impName: port[1],
                    gst: port[6],
                    address: port[2] + ' ' + port[3] + ' ' + port[4],
                    srNo: port[5],
                    state: port[7]
                }))

                setFwdData(partyOptions);
            })
            .catch((error) => {
                setFwdData([]);
            })
    }


    const handleFwdChange = async (selectedOption, { action }) => {

        if (action === 'clear') {

            setAssessmentData((prev) => ({
                ...prev,
                fwdGst: "",
                onAccountOf: "",
                fwdName: "",
                accSrNo: "",
                fwdState: ""
            }));
        }
        else {
            setAssessmentData((prev) => ({
                ...prev,
                fwdGst: selectedOption.gst,
                onAccountOf: selectedOption.value,
                fwdName: selectedOption.impName,
                accSrNo: selectedOption.srNo,
                fwdState: selectedOption.state
            }));
        }
    };

    const handleClear = () => {
        setAssessmentData({
            companyId: "",
            branchId: "",
            assesmentId: "",
            assesmentLineNo: "",
            transType: "",
            assesmentDate: new Date(),
            igmTransId: "",
            invType: "PD",
            status: "",
            igmNo: "",
            igmLineNo: "",
            viaNo: "",
            igmDate: null,
            createdBy: "",
            blNo: "",
            blDate: null,
            profitcentreId: "N00001",
            sl: "",
            sa: "",
            insuranceValue: "",
            dutyValue: "",
            commodityDescription: "",
            commodityCode: "",
            importerId: "",
            importerName: "",
            impSrNo: "",
            cha: "",
            chaSrNo: "",
            sez: "N",
            taxApplicable: "Y",
            onAccountOf: "",
            accSrNo: "",
            comments: "",
            othPartyId: "",
            othSrNo: "",
            billingParty: "",
            invoiceNo: "",
            creditType: "N",
            invoiceCategory: "SINGLE",
            isAncillary: "N",
            invoiceDate: null,
            irn: "",
            receiptNo: "",
            intComments: "",
            impAddress: "",
            impGst: "",
            chaAddress: "",
            chaName: "",
            chaGst: "",
            fwdGst: "",
            fwdName: "",
            fwdState: "",
            accHolderGst: "",
            accHolderName: "",
            accHolderState: "",
            creditAllowed: "",
            saId: "",
            slId: "",
            lastAssesmentId: "",
            lastAssesmentDate: null,
            lastInvoiceNo: "",
            lastInvoiceDate: null
        })

        setServiceData([{
            assesmentId: "",
            serviceId: "",
            serviceDesc: "",
            sacCode: "",
            taxPerc: "",
            serviceUnit: "",
            executionUnit: "",
            serviceUnit1: "",
            executionUnit1: "",
            rate: "",
            totalRate: "",
            tariffNo: "",
            amdNo: "",
            taxId: ""
        }])

        setAdvanceAmt('');
        setTdsDeductee('');
        setTanNo('');
        setBeforeTax('');
        setInvoiceAmt('');
        setReceiptAmt('');
        setBalanceAmt('');
        setTdsPerc('');

        setPaymentMode([{
            payMode: '',
            chequeNo: '',
            chequeDate: null,
            bankDetails: '',
            amount: '',
            status: ''
        }])

    }

    const handleDeleteRow = (index) => {
        const updatedData = serviceData.filter((_, i) => i !== index); // Remove the row at the specified index
        setServiceData(updatedData); // Update the state
    };


    const [paymentMode, setPaymentMode] = useState([{
        payMode: '',
        chequeNo: '',
        chequeDate: null,
        bankDetails: '',
        amount: '',
        status: ''
    }])

    const [tdsDeductee, setTdsDeductee] = useState('');
    const [advanceAmt, setAdvanceAmt] = useState('');


    const handleTdsDeductee = (e) => {
        setTdsDeductee(e.target.value);


        if (e.target.value === 'CHA') {
            getTds(assessmentData.cha);
        }
        else if (e.target.value === 'IMP') {
            getTds(assessmentData.importerId);
        }
        else if (e.target.value === 'FWR') {
            getTds(assessmentData.onAccountOf);
        }
        else if (e.target.value === 'OTH') {
            getTds(assessmentData.othPartyId);
        }
        else {
            setTdsPerc("");
        }
    }

    const getTds = (val) => {

        if (val === '') {
            setTdsPerc("");
            return;
        }

        axios.get(`${ipaddress}assessment/getTdsPerc?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {

                if (response.data[1] !== null && response.data[1] !== "") {
                    setTdsPerc(response.data[0]);
                    setTanNo(response.data[1])
                }
                else {
                    setTdsPerc("");
                    setTanNo("")
                }

            })
            .catch((error) => {
                setTdsPerc("");
                setTanNo("")
            })
    }

    const [tanNo, setTanNo] = useState('');
    const [tdsPerc, setTdsPerc] = useState('');
    const [beforeTax, setBeforeTax] = useState('');
    const [invoiceAmt, setInvoiceAmt] = useState('');
    const [receiptAmt, setReceiptAmt] = useState('');
    const [balanceAmt, setBalanceAmt] = useState('');

    const handlePaymentModeChange = (e, index) => {
        const { name, value } = e.target;
        let sanitizeValue = value;

        if (name === 'amount') {
            sanitizeValue = handleInputChange(value, 13, 2)
        }

        // Function to round values to 3 decimal places
        const roundToThree = (num) => Math.round(num * 1000) / 1000;

        if (name === 'payMode') {
            if (tdsPerc === '') {
                if (tdsPerc === '' && value !== 'TDS') {

                    const totalAmount = paymentMode.reduce((total, item, idx) => {
                        if (idx !== index) { // Exclude the current row
                            const amount = parseFloat(item.amount) || 0;
                            return total + amount;
                        }
                        return total;
                    }, 0);

                    const amt = roundToThree(receiptAmt - totalAmount);

                    setBalanceAmt(roundToThree(balanceAmt - amt) < 0 ? 0 : roundToThree(balanceAmt - amt));
                    setInvoiceAmt(roundToThree(totalAmount + amt));
                    setPaymentMode((prevState) => {
                        const updatedRows = [...prevState];
                        updatedRows[index] = {
                            ...updatedRows[index],
                            amount: amt,
                        };
                        return updatedRows;
                    });
                }
            }
            else {
                const tdsAmt = roundToThree((beforeTax * tdsPerc) / 100);

                if (value !== 'TDS') {
                    const existingValue = paymentMode[index];

                    console.log('existingValue ', existingValue);


                    if ((!existingValue) || (existingValue.amount === '' || existingValue === 0)) {
                        const totalAmount = paymentMode.reduce((total, item, idx) => {
                            if (idx !== index && item.payMode !== 'TDS') { // Exclude the current row
                                const amount = parseFloat(item.amount) || 0;
                                return total + amount;
                            }
                            return total;
                        }, 0);

                        const amt = roundToThree((receiptAmt - totalAmount) - tdsAmt);
                        setBalanceAmt(roundToThree(receiptAmt - (invoiceAmt + amt)));
                        setInvoiceAmt(roundToThree(invoiceAmt + amt));
                        setPaymentMode((prevState) => {
                            const updatedRows = [...prevState];
                            updatedRows[index] = {
                                ...updatedRows[index],
                                amount: amt,
                                chequeNo: '',
                                chequeDate: null,
                            };
                            return updatedRows;
                        });
                    }
                }
                else {

                    const tdsExist = paymentMode.find(item => item.payMode === 'TDS');
                    console.log('tdsExist ', tdsExist);

                    if (tdsExist) {
                        toast.error("TDS amount already present!!", {
                            autoClose: 800
                        })
                        return;
                    }

                    const totalAmount = paymentMode.reduce((total, item, idx) => {
                        if (idx !== index) { // Exclude the current row
                            const amount = parseFloat(item.amount) || 0;
                            return total + amount;
                        }
                        return total;
                    }, 0);
                    setBalanceAmt(roundToThree((receiptAmt - totalAmount) - tdsAmt));
                    setPaymentMode((prevState) => {
                        const updatedRows = [...prevState];
                        updatedRows[index] = {
                            ...updatedRows[index],
                            amount: tdsAmt,
                            chequeNo: '',
                            chequeDate: null,
                        };
                        return updatedRows;
                    });
                    setInvoiceAmt(roundToThree(invoiceAmt + tdsAmt));
                }
            }
        }

        if (name === 'amount') {
            sanitizeValue = handleInputChange(value, 10, 3);

            if (parseFloat(receiptAmt) < parseFloat(sanitizeValue)) {
                setInvoiceAmt(invoiceAmt); // Retain the current invoice amount
                // Calculate the total of all rows except the current row (index)
                const totalAmount = paymentMode.reduce((total, item, idx) => {
                    if (idx !== index) { // Exclude the current row
                        const amount = parseFloat(item.amount) || 0;
                        return total + amount;
                    }
                    return total;
                }, 0);

                // Add the sanitized value of the current row to the totalAmount
                const newTotalAmount = totalAmount;

                // Set the balance amount by subtracting the totalAmount from receiptAmt
                setBalanceAmt(roundToThree(receiptAmt - newTotalAmount));
                sanitizeValue = ''; // Reset the input value
            }

            else {
                // Calculate totalAmount with proper rounding
                const totalAmount = paymentMode.reduce((total, item, idx) => {
                    const amount = idx === index
                        ? parseFloat(sanitizeValue) || 0
                        : parseFloat(item.amount) || 0;
                    return total + amount;
                }, 0);

                const roundedTotalAmount = roundToThree(totalAmount);

                if (parseFloat(receiptAmt) < roundedTotalAmount) {
                    const totalAmount = paymentMode.reduce((total, item, idx) => {
                        if (idx !== index) { // Exclude the current row
                            const amount = parseFloat(item.amount) || 0;
                            return total + amount;
                        }
                        return total;
                    }, 0);

                    // Add the sanitized value of the current row to the totalAmount
                    const newTotalAmount = totalAmount;

                    // Set the balance amount by subtracting the totalAmount from receiptAmt
                    setBalanceAmt(roundToThree(receiptAmt - newTotalAmount));
                    setInvoiceAmt(roundToThree(newTotalAmount));
                    sanitizeValue = '';
                } else {
                    setInvoiceAmt(roundedTotalAmount);
                    setBalanceAmt(roundToThree(receiptAmt - roundedTotalAmount));
                }
            }
        }

        setPaymentMode((prevState) => {
            const updatedRows = [...prevState];
            updatedRows[index] = {
                ...updatedRows[index],
                [name]: sanitizeValue,
            };
            return updatedRows;
        });
    };




    const addPaymentMode = () => {
        setPaymentMode([...paymentMode, {
            payMode: '',
            chequeNo: '',
            chequeDate: null,
            bankDetails: '',
            amount: '',
            status: ''
        }]);
    };

    const removePaymentMode = (index, amount) => {
        setPaymentMode((prevState) => prevState.filter((_, i) => i !== index));
        const roundToThree = (num) => Math.round(num * 1000) / 1000;

        const totalAmount = paymentMode.reduce((total, item, idx) => {
            if (idx !== index) { // Exclude the current row
                const amount = parseFloat(item.amount) || 0;
                return total + amount;
            }
            return total;
        }, 0);
        setBalanceAmt(roundToThree(receiptAmt - totalAmount));
        setInvoiceAmt(roundToThree(invoiceAmt - amount));
    };


    const handleSave = () => {
        if (!assessmentData.profitcentreId) {
            toast.error("Profitcentre is required.", {
                autoClose: 800
            })
            return;
        }


        if (!assessmentData.othPartyId) {
            toast.error("Account holder is required", {
                autoClose: 800
            })
            return;
        }



        const data = serviceData.filter(item => item.serviceId !== '');

        if (data.length === 0) {
            toast.error("Service data not found", {
                autoClose: 800
            })
            return;
        }

        for (let i = 0; i < serviceData.length; i++) {
            const { serviceId, sacCode, taxPerc, executionUnit, rate } = serviceData[i];

            if (serviceId !== "") {
                if (sacCode === "") {
                    toast.error(`SAC Code is required for service id ${serviceId}.`, {
                        autoClose: 800,
                    });
                    return; // Stop the process if validation fails
                }

                if (sacCode === "") {
                    toast.error(`SAC Code is required for service id ${serviceId}.`, {
                        autoClose: 800,
                    });
                    return; // Stop the process if validation fails
                }

                if (taxPerc === "" && assessmentData.taxApplicable === "Y") {
                    toast.error(`Tax perc is required for service id ${serviceId}.`, {
                        autoClose: 800,
                    });
                    return; // Stop the process if validation fails
                }

                if (executionUnit === "" || executionUnit <= 0) {
                    toast.error(`Execution unit is required for service id ${serviceId}.`, {
                        autoClose: 800,
                    });
                    return; // Stop the process if validation fails
                }

                if (rate === "" || rate <= 0) {
                    toast.error(`Rate is required for service id ${serviceId}.`, {
                        autoClose: 800,
                    });
                    return; // Stop the process if validation fails
                }
            }
        }




        const formData = {
            assessmentData: assessmentData,
            serviceData: data
        }



        setLoading(true);

        axios.post(`${ipaddress}assessment/saveMISCAssessmentData?cid=${companyid}&bid=${branchId}&user=${userId}`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {

                setLoading(false);

                const data = response.data.result;

                setBeforeTax(response.data.finaltotalRateWithoutTax);
                setReceiptAmt(response.data.finaltotalRateWithTax);
                setBalanceAmt(response.data.finaltotalRateWithTax);
                setTanNo(response.data.tanNo);
                setTdsPerc(response.data.tdsPerc);

                toast.success("Assessment save successfully!!", {
                    autoClose: 800
                })

                console.log('assessmentData ', response.data);

                const singleData = data[0];

                setAssessmentData({
                    companyId: "",
                    branchId: "",
                    assesmentId: singleData[0] || "",
                    assesmentLineNo: singleData[1] || "",
                    transType: singleData[2] || "",
                    assesmentDate: new Date(singleData[3]) || new Date(),
                    igmTransId: "",
                    invType: singleData[37] || "PD",
                    status: singleData[4] || "",
                    igmNo: "",
                    igmLineNo: "",
                    viaNo: "",
                    igmDate: null,
                    createdBy: singleData[5] || "",
                    blNo: "",
                    blDate: null,
                    profitcentreId: singleData[6] || "N00001",
                    sl: "",
                    sa: "",
                    insuranceValue: "",
                    dutyValue: "",
                    commodityDescription: "",
                    commodityCode: "",
                    importerId: singleData[11] || "",
                    importerName: singleData[12] || "",
                    impSrNo: singleData[13] || "",
                    cha: singleData[14] || "",
                    chaSrNo: singleData[16] || "",
                    sez: singleData[21] || "N",
                    taxApplicable: singleData[22] || "Y",
                    onAccountOf: singleData[23] || "",
                    accSrNo: singleData[25] || "",
                    comments: singleData[28] || "",
                    othPartyId: singleData[29] || "",
                    othSrNo: singleData[31] || "",
                    billingParty: singleData[34] || "",
                    invoiceNo: singleData[35] || "",
                    creditType: singleData[36] || "N",
                    invoiceCategory: "SINGLE",
                    isAncillary: "N",
                    invoiceDate: singleData[38] === null ? null : new Date(singleData[38]),
                    irn: singleData[39] || "",
                    receiptNo: singleData[40] || "",
                    intComments: singleData[41] || "",
                    impAddress: (singleData[7] === null ? "" : singleData[7]) + ' - ' + (singleData[8] === null ? "" : singleData[8]) + ' - ' + (singleData[9] === null ? "" : singleData[9]),
                    impGst: singleData[10] || "",
                    chaAddress: (singleData[17] === null ? "" : singleData[17]) + ' - ' + (singleData[18] === null ? "" : singleData[18]) + ' - ' + (singleData[19] === null ? "" : singleData[19]),
                    chaName: singleData[15] || "",
                    chaGst: singleData[20] || "",
                    fwdGst: singleData[26] || "",
                    fwdName: singleData[24] || "",
                    fwdState: singleData[27] || "",
                    accHolderGst: singleData[32] || "",
                    accHolderName: singleData[30] || "",
                    accHolderState: singleData[33] || "",
                    creditAllowed: singleData[36] === 'Y' ? response.data.creditAllowed : "",
                    saId: "",
                    slId: "",
                    lastAssesmentId: "",
                    lastAssesmentDate: null,
                    lastInvoiceNo: "",
                    lastInvoiceDate: null

                })

                setServiceData(data.map((item) => ({
                    assesmentId: item[0] || "",
                    serviceId: item[42] || "",
                    serviceDesc: item[43] || "",
                    sacCode: item[44] || "",
                    taxPerc: item[46] || "",
                    serviceUnit: item[47] || "",
                    executionUnit: item[48] || "",
                    serviceUnit1: item[49] || "",
                    executionUnit1: item[50] || "",
                    rate: item[51] || "",
                    totalRate: item[52] || "",
                    tariffNo: "",
                    amdNo: "",
                    taxId: item[45] || "",
                })))


                setTdsDeductee("OTH");


                if (singleData[36] === "Y") {
                    setPaymentMode([{
                        payMode: 'CREDIT',
                        chequeNo: '',
                        chequeDate: null,
                        bankDetails: '',
                        amount: response.data.finaltotalRateWithTax,
                        status: ''
                    }])

                    setInvoiceAmt(response.data.finaltotalRateWithTax);
                    setBalanceAmt('');
                }


                if (singleData[36] === "P") {
                    const advance = response.data.advanceData;

                    if (advance !== null && advance !== undefined) {
                        setAdvanceAmt(advance[4]);
                    }

                    setPaymentMode([{
                        payMode: 'ADVANCE',
                        chequeNo: '',
                        chequeDate: null,
                        bankDetails: '',
                        amount: response.data.finaltotalRateWithTax,
                        status: ''
                    }])
                    setBalanceAmt('');

                    setInvoiceAmt(response.data.finaltotalRateWithTax);
                }
            })
            .catch((error) => {
                // toast.error(error.response.data, {
                //     autoClose: 800
                // })
                console.log('log ', error);

                setLoading(false);
            })

    }

    const saveProcess = () => {

        for (let i = 0; i < paymentMode.length; i++) {
            const { chequeNo, chequeDate, amount, payMode } = paymentMode[i];



            // Check if chequeNo and chequeDate are missing for modes other than CASH and TDS
            if ((!chequeNo || !chequeDate) && payMode !== 'CASH' && payMode !== 'ADVANCE' && payMode !== 'CREDIT' && payMode !== 'TDS') {
                toast.error(`Error: Cheque details are missing for payment mode entry ${i + 1}.`, {
                    autoClose: 800,
                });
                return; // Stop the process if validation fails
            }


            if (!amount) {
                toast.error(`Error: Amount is required for payment mode entry ${i + 1}.`, {
                    autoClose: 800,
                });
                return; // Stop the process if validation fails
            }
        }


        if (receiptAmt !== invoiceAmt) {
            toast.error(`Receipt Amount and Invoice Amount do not match.`, {
                autoClose: 800,
            });
            return; // Stop the process if validation fails
        }

        if (assessmentData.creditType === 'Y') {
            const creditRed = paymentMode.filter(item => item.payMode === "CREDIT");

            const creditAmt = creditRed.reduce((total, item) => total + parseFloat(item.amount), 0);

            if (assessmentData.creditAllowed < creditAmt) {
                toast.error(`The credit amount exceeds the allowed credit limit.`, {
                    autoClose: 800,
                });
                return; // Stop the process if validation fails
            }
        }

        if (assessmentData.creditType === 'P') {
            const creditRed = paymentMode.filter(item => item.payMode === "ADVANCE");

            const creditAmt = creditRed.reduce((total, item) => total + parseFloat(item.amount), 0);

            if (advanceAmt < creditAmt) {
                toast.error(`The advance amount exceeds the remaining advance balance of the billing party.`, {
                    autoClose: 800,
                });
                return; // Stop the process if validation fails
            }
        }



        const formData = {
            assessmentData: assessmentData,
            containerData: serviceData,
            paymentDto: paymentMode,
            tdsDeductee: tdsDeductee,
            tdsPerc: tdsPerc,
        }

        setLoading(true);

        axios.post(`${ipaddress}assessment/saveMISCInvoiceReceipt?cid=${companyid}&bid=${branchId}&user=${userId}&creditStatus=${assessmentData.creditType}`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data.result;

                console.log('data ', data);

                const singleData = data[0];

                setAssessmentData({
                    companyId: "",
                    branchId: "",
                    assesmentId: singleData[0] || "",
                    assesmentLineNo: singleData[1] || "",
                    transType: singleData[2] || "",
                    assesmentDate: new Date(singleData[3]) || new Date(),
                    igmTransId: "",
                    invType: singleData[37] || "PD",
                    status: singleData[4] || "",
                    igmNo: "",
                    igmLineNo: "",
                    viaNo: "",
                    igmDate: null,
                    createdBy: singleData[5] || "",
                    blNo: "",
                    blDate: null,
                    profitcentreId: singleData[6] || "N00001",
                    sl: "",
                    sa: "",
                    insuranceValue: "",
                    dutyValue: "",
                    commodityDescription: "",
                    commodityCode: "",
                    importerId: singleData[11] || "",
                    importerName: singleData[12] || "",
                    impSrNo: singleData[13] || "",
                    cha: singleData[14] || "",
                    chaSrNo: singleData[16] || "",
                    sez: singleData[21] || "N",
                    taxApplicable: singleData[22] || "Y",
                    onAccountOf: singleData[23] || "",
                    accSrNo: singleData[25] || "",
                    comments: singleData[28] || "",
                    othPartyId: singleData[29] || "",
                    othSrNo: singleData[31] || "",
                    billingParty: singleData[34] || "",
                    invoiceNo: singleData[35] || "",
                    creditType: singleData[36] || "N",
                    invoiceCategory: "SINGLE",
                    isAncillary: "N",
                    invoiceDate: singleData[38] === null ? null : new Date(singleData[38]),
                    irn: singleData[39] || "",
                    receiptNo: singleData[40] || "",
                    intComments: singleData[41] || "",
                    impAddress: (singleData[7] === null ? "" : singleData[7]) + ' - ' + (singleData[8] === null ? "" : singleData[8]) + ' - ' + (singleData[9] === null ? "" : singleData[9]),
                    impGst: singleData[10] || "",
                    chaAddress: (singleData[17] === null ? "" : singleData[17]) + ' - ' + (singleData[18] === null ? "" : singleData[18]) + ' - ' + (singleData[19] === null ? "" : singleData[19]),
                    chaName: singleData[15] || "",
                    chaGst: singleData[20] || "",
                    fwdGst: singleData[26] || "",
                    fwdName: singleData[24] || "",
                    fwdState: singleData[27] || "",
                    accHolderGst: singleData[32] || "",
                    accHolderName: singleData[30] || "",
                    accHolderState: singleData[33] || "",
                    creditAllowed: singleData[36] === 'Y' ? response.data.creditAllowed : "",
                    saId: "",
                    slId: "",
                    lastAssesmentId: "",
                    lastAssesmentDate: null,
                    lastInvoiceNo: "",
                    lastInvoiceDate: null

                })

                setServiceData(data.map((item) => ({
                    assesmentId: item[0] || "",
                    serviceId: item[42] || "",
                    serviceDesc: item[43] || "",
                    sacCode: item[44] || "",
                    taxPerc: item[46] || "",
                    serviceUnit: item[47] || "",
                    executionUnit: item[48] || "",
                    serviceUnit1: item[49] || "",
                    executionUnit1: item[50] || "",
                    rate: item[51] || "",
                    totalRate: item[52] || "",
                    tariffNo: "",
                    amdNo: "",
                    taxId: item[45] || "",
                })))

                const totalData = response.data.existingSrv;

                setTdsDeductee(response.data.tdsDeductee);
                setTdsPerc(response.data.tdsperc);
                setTanNo(response.data.tanNo);
                setBeforeTax(totalData.billAmt);
                setInvoiceAmt(totalData.invoiceAmt);
                setReceiptAmt(totalData.receiptAmt);
                setBalanceAmt(0);

                const payData = response.data.existingSrvFin;

                setPaymentMode(payData.map((item) => ({
                    payMode: item.paymentMode || '',
                    chequeNo: item.chequeNo || '',
                    chequeDate: item.chequeDate === null ? null : new Date(item.chequeDate),
                    bankDetails: item.bankName || '',
                    amount: item.paymentMode !== "CREDIT" ? item.documentAmt : item.creditAmount || '',
                    status: item.status || ''
                })))

                if (singleData[36] === "P") {
                    const advance = response.data.advanceData;

                    if (advance !== null && advance !== undefined) {
                        setAdvanceAmt(advance[4]);
                    }
                }

                toast.success('Data save successfully!!', {
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

    const [isModalOpenForSearchGateInData, setIsModalOpenForGateInData] = useState(false);
    const [searchId, setSearchId] = useState('');
    const [gateInSearchData, setGateInSearchData] = useState([]);

    const openGateInModal = () => {
        setIsModalOpenForGateInData(true);
        searchExportEmptyContainerGateIn('');
        setSearchId('');
    }

    const closeGateInModal = () => {
        setIsModalOpenForGateInData(false);
        setSearchId('');
        setGateInSearchData([]);
    }

    const searchExportEmptyContainerGateIn = (id) => {
        setLoading(true);
        axios.get(`${ipaddress}assessment/searchMISCInvoiceData1?cid=${companyid}&bid=${branchId}&val=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setGateInSearchData(response.data);
                setLoading(false);
                toast.success("Data found successfully!!", {
                    autoClose: 800
                })
            })
            .catch((error) => {
                setGateInSearchData([]);
                setLoading(false);
                toast.error(error.response.data, {
                    autoClose: 800
                })
            })
    }


    const getSelectedInvoiceData = (assId, invId) => {
        axios.get(`${ipaddress}assessment/getSelectedMISCInvoiceData1?cid=${companyid}&bid=${branchId}&assId=${assId}&invId=${invId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data.result;

                const singleData = data[0];

                setAssessmentData({
                    companyId: "",
                    branchId: "",
                    assesmentId: singleData[0] || "",
                    assesmentLineNo: singleData[1] || "",
                    transType: singleData[2] || "",
                    assesmentDate: new Date(singleData[3]) || new Date(),
                    igmTransId: "",
                    invType: singleData[37] || "PD",
                    status: singleData[4] || "",
                    igmNo: "",
                    igmLineNo: "",
                    viaNo: "",
                    igmDate: null,
                    createdBy: singleData[5] || "",
                    blNo: "",
                    blDate: null,
                    profitcentreId: singleData[6] || "N00001",
                    sl: "",
                    sa: "",
                    insuranceValue: "",
                    dutyValue: "",
                    commodityDescription: "",
                    commodityCode: "",
                    importerId: singleData[11] || "",
                    importerName: singleData[12] || "",
                    impSrNo: singleData[13] || "",
                    cha: singleData[14] || "",
                    chaSrNo: singleData[16] || "",
                    sez: singleData[21] || "N",
                    taxApplicable: singleData[22] || "Y",
                    onAccountOf: singleData[23] || "",
                    accSrNo: singleData[25] || "",
                    comments: singleData[28] || "",
                    othPartyId: singleData[29] || "",
                    othSrNo: singleData[31] || "",
                    billingParty: singleData[34] || "",
                    invoiceNo: singleData[35] || "",
                    creditType: singleData[36] || "N",
                    invoiceCategory: "SINGLE",
                    isAncillary: "N",
                    invoiceDate: singleData[38] === null ? null : new Date(singleData[38]),
                    irn: singleData[39] || "",
                    receiptNo: singleData[40] || "",
                    intComments: singleData[41] || "",
                    impAddress: (singleData[7] === null ? "" : singleData[7]) + ' - ' + (singleData[8] === null ? "" : singleData[8]) + ' - ' + (singleData[9] === null ? "" : singleData[9]),
                    impGst: singleData[10] || "",
                    chaAddress: (singleData[17] === null ? "" : singleData[17]) + ' - ' + (singleData[18] === null ? "" : singleData[18]) + ' - ' + (singleData[19] === null ? "" : singleData[19]),
                    chaName: singleData[15] || "",
                    chaGst: singleData[20] || "",
                    fwdGst: singleData[26] || "",
                    fwdName: singleData[24] || "",
                    fwdState: singleData[27] || "",
                    accHolderGst: singleData[32] || "",
                    accHolderName: singleData[30] || "",
                    accHolderState: singleData[33] || "",
                    creditAllowed: singleData[36] === 'Y' ? response.data.creditAllowed : "",
                    saId: "",
                    slId: "",
                    lastAssesmentId: "",
                    lastAssesmentDate: null,
                    lastInvoiceNo: "",
                    lastInvoiceDate: null

                })

                setServiceData(data.map((item) => ({
                    assesmentId: item[0] || "",
                    serviceId: item[42] || "",
                    serviceDesc: item[43] || "",
                    sacCode: item[44] || "",
                    taxPerc: item[46] || "",
                    serviceUnit: item[47] || "",
                    executionUnit: item[48] || "",
                    serviceUnit1: item[49] || "",
                    executionUnit1: item[50] || "",
                    rate: item[51] || "",
                    totalRate: item[52] || "",
                    tariffNo: "",
                    amdNo: "",
                    taxId: item[45] || "",
                })))

                const totalData = response.data.existingSrv;

                setTdsDeductee(response.data.tdsDeductee);
                setTdsPerc(response.data.tdsperc);
                setTanNo(response.data.tanNo);
                setBeforeTax(totalData.billAmt);
                setInvoiceAmt(totalData.invoiceAmt);
                setReceiptAmt(totalData.receiptAmt);
                setBalanceAmt(0);

                const payData = response.data.existingSrvFin;

                setPaymentMode(payData.map((item) => ({
                    payMode: item.paymentMode || '',
                    chequeNo: item.chequeNo || '',
                    chequeDate: item.chequeDate === null ? null : new Date(item.chequeDate),
                    bankDetails: item.bankName || '',
                    amount: item.paymentMode !== "CREDIT" ? item.documentAmt : item.creditAmount || '',
                    status: item.status || ''
                })))

                if (singleData[36] === "P") {
                    const advance = response.data.advanceData;

                    if (advance !== null && advance !== undefined) {
                        setAdvanceAmt(advance[4]);
                    }
                }


                toast.success('Data found successfully!!', {
                    autoClose: 800
                })
                closeGateInModal();
            })
            .catch((error) => {

            })
    }

    const handleSearchClear = () => {
        searchExportEmptyContainerGateIn('');
        setSearchId('');
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = gateInSearchData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(gateInSearchData.length / itemsPerPage);

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

    const handlePrint1 = async (type) => {

        const invoiceNo = assessmentData.invoiceNo;

        // const assesmentId = assessmentSheet.assesmentId;

        // const sbTransID = assessmentSheet.sbTransId;

        setLoading(true);

        axios.post(`${ipaddress}miscellaneousInvPrint/miscellaneousInvPrintpdf/${companyid}/${branchId}/${invoiceNo}`, null, {
            headers: {

                Authorization: `Bearer ${jwtToken}`,
                "Content-Type": "application/json",
            }
        })
            .then(response => {
                // console.log('Response:', response.data); // Handle success
                const pdfBase64 = response.data;
                const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
                const blobUrl = URL.createObjectURL(pdfBlob);
                window.open(blobUrl, '_blank');
                setLoading(false);


            })
            .catch(error => {
                console.error('Error in handlePrint:', error.message);
                setLoading(false);
            });




    }







    const [showModalforPrintInvoice, setShowModalforPrintInvoice] = useState(false);
    const handleCloseModalPrintInvoice = () => {

        setShowModalforPrintInvoice(false);
    };
    const handleModelOPenForPrintInvoice = () => {
        setShowModalforPrintInvoice(true);

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

            <Modal
                isOpen={showModalforPrintInvoice}
                toggle={handleCloseModalPrintInvoice}
                style={{ maxWidth: 600 }}
            >
                <ModalHeader
                    toggle={handleCloseModalPrintInvoice}
                    style={{
                        backgroundColor: "#80cbc4",
                        color: "black",
                        fontFamily: "Your-Heading-Font",
                        textAlign: "center",
                        background: "#26a69a",
                        boxShadow: "0px 5px 10px rgba(0, 77, 64, 0.3)",
                        border: "1px solid rgba(0, 0, 0, 0.3)",
                        borderRadius: "0",
                        backgroundColor: "#85144b",
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        backgroundImage:
                            'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        //backgroundPosition: 'center',
                        backgroundPosition: "center",
                    }}
                >
                    <FontAwesomeIcon icon={faArrowUpFromBracket}
                        style={{ marginRight: "9px" }}
                    />
                    View Invoice
                </ModalHeader>
                <ModalBody
                    style={{
                        backgroundImage:
                            "url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)",
                        backgroundSize: "cover",
                    }}
                >


                    <Form>


                        <Row>
                            <Col md={6}>
                                <Card
                                    style={{
                                        width: '95%'
                                    }}
                                >
                                    <img
                                        alt="Sample"
                                        style={{ width: '100%', height: '300px', objectFit: 'contain' }}
                                        src={printformat1}

                                    />
                                    <CardBody>
                                        <CardTitle tag="h5">
                                            Invoice Format 1
                                        </CardTitle>
                                        {/* <CardSubtitle
                      className="mb-2 text-muted"
                      tag="h6"
                    >
                      Set Default
                      <Input type="radio" name="radio1" style={{ marginLeft: "10px" }} />

                    </CardSubtitle> */}

                                        <Button color="primary" outline
                                        // onClick={() => handlePrint("PRINT")}
                                        >
                                            <FontAwesomeIcon
                                                icon={faUsersViewfinder}
                                                style={{ marginRight: "5px" }}
                                            />
                                            View
                                        </Button>

                                    </CardBody>
                                </Card>
                            </Col>

                            <Col md={6}>
                                <Card
                                    style={{
                                        width: '95%'
                                    }}
                                >
                                    <img
                                        alt="Sample"
                                        style={{ width: '100%', height: '300px', objectFit: 'contain' }}
                                        src={printformat2}

                                    />
                                    <CardBody>
                                        <CardTitle tag="h5">
                                            Invoice Format 2
                                        </CardTitle>
                                        {/* <CardSubtitle
                      className="mb-2 text-muted"
                      tag="h6"
                    >
                      Set Default
                      <Input type="radio" name="radio1" style={{ marginLeft: "10px" }} />
                    </CardSubtitle> */}

                                        <Button color="primary" outline
                                            onClick={() => handlePrint1("PRINT")}
                                        >
                                            <FontAwesomeIcon
                                                icon={faUsersViewfinder}
                                                style={{ marginRight: "5px" }}
                                            />
                                            View
                                        </Button>
                                    </CardBody>
                                </Card>
                            </Col>
                            {/* <Col md={4}>
                <Card
                  style={{
                    width: '95%'
                  }}
                >
                  <img
                    alt="Sample"
                    src="https://raw.githubusercontent.com/ShubhamDeshmukh18/AshteLogistics/main/assets/img/testimonials/Receipt01.jpg"
                  />
                  <CardBody>
                    <CardTitle tag="h5">
                      Receipt Format 1
                    </CardTitle>
                    <CardSubtitle
                      className="mb-2 text-muted"
                      tag="h6"
                    >
                      Default Format
                    
                    </CardSubtitle>

                    <Button color="primary" outline>
                      <FontAwesomeIcon
                        icon={faUsersViewfinder}
                        style={{ marginRight: "5px" }}
                      />
                      View
                    </Button>
                  </CardBody>
                </Card>
              </Col> */}
                        </Row>




                    </Form>
                </ModalBody>
                <ModalFooter
                    style={{
                        backgroundImage:
                            "url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)",
                        backgroundSize: "cover",
                        display: "flex",
                        justifyContent: "center",

                    }}
                >

                    <div className="d-flex justify-content-center">
                        <Button color="danger" outline onClick={handleCloseModalPrintInvoice}>
                            <FontAwesomeIcon
                                icon={faBackward}
                                style={{ marginRight: "5px" }}
                            />
                            Back
                        </Button>

                    </div>
                </ModalFooter>
            </Modal>


            <Modal Modal isOpen={isModalOpenForSearchGateInData} onClose={closeGateInModal} toggle={closeGateInModal} style={{ maxWidth: '1200px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

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
                    /> Search Invoice Data</h5>



                </ModalHeader>
                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                    <Row>
                        <Col md={5}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Search by Invoice No / Assessment Id / Profitcentre desc / Party Name / Receipt No
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
                        <Col md={4} style={{ marginTop: 40 }}>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10, fontSize: 12 }}
                                id="submitbtn2"
                                onClick={() => searchExportEmptyContainerGateIn(searchId)}

                            >
                                <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                Search
                            </button>
                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ marginRight: 10, fontSize: 12 }}
                                id="submitbtn2"
                                onClick={handleSearchClear}
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
                                <tr className='text-center'>
                                    <th scope="col">#</th>
                                    <th scope="col">Invoice No</th>
                                    <th scope="col">Invoice Date</th>
                                    <th scope="col">Assessment Id</th>
                                    <th scope="col">Assessment Date</th>
                                    <th scope="col">Trans Type</th>
                                    <th scope="col">Party Name</th>
                                    <th scope="col">Profitcentre Desc</th>
                                    <th scope="col">Receipt No</th>
                                </tr>
                                <tr className='text-center'>
                                    <th scope="col"></th>
                                    <th scope="col">{gateInSearchData.length}</th>
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
                                            <input type="radio" onChange={() => getSelectedInvoiceData(item[2], item[0])} name="radioGroup" value={item[0]} />
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
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Process Trans Id
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            id="assesmentId"
                            name='assesmentId'
                            value={assessmentData.assesmentId}
                            onChange={handleAssessmentChange}
                            disabled
                        />

                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Process Trans Date
                        </label>
                        <div style={{ position: 'relative' }}>
                            <DatePicker
                                selected={assessmentData.assesmentDate}
                                id='assesmentDate'
                                name='assesmentDate'
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
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Invoice Type <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Input
                            className="form-control"
                            type="select"
                            id="invType"
                            name='invType'
                            value={assessmentData.invType}
                            disabled
                        >
                            <option value="PD">Party Billing</option>
                        </Input>

                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Profitcentre <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Input
                            className={`form-control`}
                            type="select"
                            id="profitcentreId"
                            name='profitcentreId'
                            value={assessmentData.profitcentreId}
                            onChange={handleAssessmentChange}
                        >
                            <option value="">Select Profitcentre</option>
                            {profitData.map((item, index) => (
                                <option key={index} value={item.profitcentreId}>{item.profitcentreDesc}</option>
                            ))}
                        </Input>

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
                            name='status'
                            value={assessmentData.status === 'A' ? 'Approved' : assessmentData.status}
                            disabled
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
                            name='createdBy'
                            value={assessmentData.createdBy}
                            disabled
                        />

                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Invoice No
                        </label>
                        <Row>
                            <Col md={9}>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="invoiceNo"
                                    name='invoiceNo'
                                    value={assessmentData.invoiceNo}
                                    disabled
                                />
                            </Col>

                            <Col md={3} className="d-flex justify-content-end" >
                                <button
                                    className="btn btn-outline-primary btn-margin newButton"
                                    style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    id="submitbtn2"
                                    onClick={openGateInModal}
                                >
                                    <FontAwesomeIcon icon={faSearch} size="sm" s />
                                </button>
                            </Col>
                        </Row>

                    </FormGroup>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Invoice Date
                        </label>
                        <div style={{ position: 'relative' }}>
                            <DatePicker
                                selected={assessmentData.invoiceDate}
                                disabled
                                id='invoiceDate'
                                name='invoiceDate'
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

                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    SEZ
                                </label>
                                <Input
                                    className="form-control"
                                    type="select"
                                    id="sez"
                                    name='sez'
                                    value={assessmentData.sez}
                                    onChange={handleAssessmentChange}
                                    disabled={assessmentData.assesmentId !== ''}
                                >
                                    <option value="N">No</option>
                                    <option value="Y">Yes</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    TAX
                                </label>
                                <Input
                                    className="form-control"
                                    type="select"
                                    id="taxApplicable"
                                    name='taxApplicable'
                                    value={assessmentData.taxApplicable}
                                    onChange={handleAssessmentChange}
                                    disabled={assessmentData.assesmentId !== ''}
                                >
                                    <option value="N">No</option>
                                    <option value="Y">Yes</option>
                                </Input>
                            </FormGroup>
                        </Col>

                    </Row>


                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Credit Type <span style={{ color: 'red' }}>*</span>
                        </label>

                        <Input
                            className="form-control"
                            type="select"
                            id="creditType"
                            name='creditType'
                            value={assessmentData.creditType}
                            onChange={handleAssessmentChange}
                            disabled={assessmentData.assesmentId !== ''}
                        >
                            <option value="N">Cash</option>
                            <option value="Y">Credit</option>
                            <option value="P">PDA</option>
                        </Input>


                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Credit Allowed.
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            id="creditAllowed"
                            name='creditAllowed'
                            value={assessmentData.creditAllowed}
                            disabled
                        />

                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Receipt No
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            id="receiptNo"
                            name='receiptNo'
                            value={assessmentData.receiptNo}
                            onChange={handleAssessmentChange}
                            disabled
                        />

                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Account Holder <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Select
                            value={{ value: assessmentData.othPartyId, label: assessmentData.accHolderName }}
                            onChange={handleAccChange}
                            onInputChange={getAccData}
                            options={accData}
                            placeholder="Select Account Holder"
                            isClearable
                            isDisabled={assessmentData.assesmentId !== ''}
                            menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                            menuPosition="fixed" // Sets the dropdown menu position to fixed    
                            id="othPartyId"
                            name="othPartyId"
                            className="autocompleteHeight"
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
                            Account GST No
                        </label>
                        <input
                            className="form-control"
                            value={assessmentData.accHolderGst}
                            type="text"
                            id="accHolderGst"
                            name='accHolderGst'
                            disabled
                        />

                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Account State Code
                        </label>
                        <input
                            className="form-control"
                            value={assessmentData.accHolderState}
                            type="text"
                            id="accHolderState"
                            name='accHolderState'
                            disabled
                        />

                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Importer / Exporter Name
                        </label>
                        <Select
                            value={{ value: assessmentData.importerId, label: assessmentData.importerName }}
                            onChange={handleImpChange}
                            onInputChange={getImpData}
                            options={impData}
                            isDisabled={assessmentData.assesmentId !== ''}
                            placeholder="Select Account Holder"
                            isClearable
                            menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                            menuPosition="fixed" // Sets the dropdown menu position to fixed    
                            id="importerId"
                            name="importerId"
                            className="autocompleteHeight"
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
                            Importer / Exporter GSTIN
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            id="impGst"
                            name='impGst'
                            value={assessmentData.impGst}
                            disabled
                        />

                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Importer / Exporter Add
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            id="impAddress"
                            name='impAddress'
                            value={assessmentData.impAddress}
                            disabled
                        />

                    </FormGroup>
                </Col>

            </Row>
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            CHA
                        </label>
                        <Select
                            value={{ value: assessmentData.cha, label: assessmentData.chaName }}
                            onChange={handleChaChange}
                            onInputChange={getChaData}
                            options={chaData}
                            isDisabled={assessmentData.assesmentId !== ''}
                            placeholder="Select Account Holder"
                            isClearable
                            menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                            menuPosition="fixed" // Sets the dropdown menu position to fixed    
                            id="cha"
                            name="cha"
                            className="autocompleteHeight"
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
                            CHA GSTIN
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            id="chaGst"
                            name='chaGst'
                            value={assessmentData.chaGst}
                            disabled
                        />

                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            CHA Add
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            id="chaAddress"
                            name='chaAddress'
                            value={assessmentData.chaAddress}
                            disabled
                        />

                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Forwarder
                        </label>
                        <Select
                            value={{ value: assessmentData.onAccountOf, label: assessmentData.fwdName }}
                            onChange={handleFwdChange}
                            onInputChange={getFwdData}
                            options={fwdData}
                            placeholder="Select Account Holder"
                            isClearable
                            isDisabled={assessmentData.assesmentId !== ''}
                            menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                            menuPosition="fixed" // Sets the dropdown menu position to fixed    
                            id="onAccountOf"
                            name="onAccountOf"
                            className="autocompleteHeight"
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
                            Forwarder GST No
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            id="fwdGst"
                            name='fwdGst'
                            value={assessmentData.fwdGst}
                            disabled
                        />

                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Forwarder State Code
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            id="fwdState"
                            name='fwdState'
                            value={assessmentData.fwdState}
                            disabled
                        />

                    </FormGroup>
                </Col>

            </Row>
            <Row>





                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            IRN
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            id="irn"
                            name='irn'
                            value={assessmentData.irn}
                            onChange={handleAssessmentChange}
                            disabled
                        />

                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Print Remarks
                        </label>
                        <Input
                            className="form-control"
                            type="textarea"
                            id="comments"
                            name='comments'
                            maxLength={250}
                            value={assessmentData.comments}
                            onChange={handleAssessmentChange}
                        />

                    </FormGroup>
                </Col>


                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Internal Remarks
                        </label>
                        <Input
                            className="form-control"
                            type="textarea"
                            id="intComments"
                            name='intComments'
                            maxLength={250}
                            value={assessmentData.intComments}
                            onChange={handleAssessmentChange}
                        />

                    </FormGroup>
                </Col>

                {(assessmentData.creditType === "P" && assessmentData.assesmentId !== "") && (
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Advance Amt
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                id="advanceAmt"
                                name='advanceAmt'
                                value={advanceAmt}
                                disabled
                            />

                        </FormGroup>
                    </Col>
                )}




            </Row>

            <Row className="justify-content-center">
                <Col xs={12} className="d-flex flex-wrap justify-content-center gap-2">
                    <button
                        className="btn btn-outline-primary btn-margin newButton"
                        style={{ marginRight: 10, fontSize: 13 }}
                        id="submitbtn2"
                        disabled={assessmentData.invoiceNo !== ''}
                        onClick={handleSave}
                    >
                        <FontAwesomeIcon
                            icon={faSave}
                            style={{ marginRight: "5px" }}
                        />
                        Save
                    </button>
                    <button
                        className="btn btn-outline-success btn-margin newButton"
                        style={{ marginRight: 10, fontSize: 13 }}
                        id="submitbtn2"
                        onClick={saveProcess}
                        disabled={assessmentData.invoiceNo !== '' || assessmentData.assesmentId === ''}
                    >
                        <FontAwesomeIcon
                            icon={faSpinner}
                            style={{ marginRight: "5px" }}
                        />
                        Process
                    </button>

                    <button
                        className="btn btn-outline-danger btn-margin newButton"
                        style={{ marginRight: 10, fontSize: 13 }}
                        id="submitbtn2"
                        onClick={handleClear}
                    >
                        <FontAwesomeIcon
                            icon={faRefresh}
                            style={{ marginRight: "5px" }}
                        />
                        Clear
                    </button>
                    <button
                        className="btn btn-outline-primary btn-margin newButton"
                        style={{ marginRight: 10, fontSize: 13 }}
                        id="submitbtn2"
                        disabled={assessmentData.assesmentId !== ''}
                        onClick={handleAddRow}
                    >
                        <FontAwesomeIcon
                            icon={faAdd}
                            style={{ marginRight: "5px" }}
                        />
                        Add Service
                    </button>
                    <button
                        className="btn btn-outline-primary btn-margin newButton"
                        style={{ marginRight: 10, fontSize: 13 }}
                        id="submitbtn2"
                        onClick={() => handlePrint1("PRINT")}
                    >
                        <FontAwesomeIcon
                            icon={faPrint}
                            style={{ marginRight: "5px" }}
                        />
                        Print
                    </button>
                </Col>
            </Row>
            <div id="datepicker-portal3"></div>
            <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
                <Table className="table table-bordered" style={{ border: '2px solid black' }}>
                    <thead>
                        <tr>
                            <th scope="col" className="text-center" style={{ color: "black" }}>
                                Sr No
                            </th>
                            <th scope="col" className="text-center" style={{ color: "black", minWidth: 250 }}>
                                Service Id <span style={{ color: 'red' }}>*</span>
                            </th>
                            <th scope="col" className="text-center" style={{ color: "black", minWidth: 200 }}>
                                SAC Code <span style={{ color: 'red' }}>*</span>
                            </th>
                            <th scope="col" className="text-center" style={{ color: "black", minWidth: 200 }}>
                                Tax Per <span style={{ color: 'red' }}>*</span>
                            </th>
                            <th scope="col" className="text-center" style={{ color: "black" }}>
                                Service Unit
                            </th>
                            <th scope="col" className="text-center" style={{ color: "black", minWidth: 100 }}>
                                Execution Unit <span style={{ color: 'red' }}>*</span>
                            </th>
                            <th scope="col" className="text-center" style={{ color: "black" }}>
                                Service Unit1
                            </th>
                            <th scope="col" className="text-center" style={{ color: "black", minWidth: 100 }}>
                                Execution Unit1
                            </th>
                            <th scope="col" className="text-center" style={{ color: "black", minWidth: 150 }}>
                                Rate <span style={{ color: 'red' }}>*</span>
                            </th>
                            <th scope="col" className="text-center" style={{ color: "black", minWidth: 150 }}>
                                Amount
                            </th>
                            <th scope="col" className="text-center" style={{ color: "black" }}>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {serviceData.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td >
                                    <Select

                                        value={{ value: item.serviceId, label: item.serviceDesc }}
                                        options={services}
                                        onChange={(option, actionMeta) => handleChangeServices(option, actionMeta, index)}
                                        placeholder="Select Service"
                                        isClearable
                                        isDisabled={assessmentData.assesmentId !== ""}
                                        id={`serviceId${index}`}
                                        name="serviceId"
                                        className={`autocompleteHeight`}
                                        menuPlacement="top"
                                        menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                                        menuPosition="fixed"
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
                                </td>
                                <td >
                                    <Input
                                        className="form-control"
                                        type="select"
                                        id="sacCode"
                                        name='sacCode'
                                        value={item.sacCode}
                                        disabled={assessmentData.assesmentId !== ""}
                                        onChange={(e) => handleServiceChange(e, index)}
                                    >
                                        <option value="">Select</option>
                                        {sacCodeData.map((item, index) => (
                                            <option key={index} value={item.jarDtlId}>{`${item.jarDtlId} - ${item.comments}`}</option>
                                        ))}
                                    </Input>
                                </td>
                                <td>
                                    <Input
                                        className="form-control"
                                        type="select"
                                        id="taxPerc"
                                        name='taxPerc'
                                        value={item.taxPerc}
                                        disabled={assessmentData.assesmentId !== ""}
                                        onChange={(e) => handleServiceChange(e, index)}

                                    >
                                        <option value="">Select</option>
                                        {taxData.map((item, index) => (
                                            <option key={index} value={item[1]} data-value2={item[2]}>{item[0]}</option>
                                        ))}
                                    </Input>
                                </td>
                                <td>{item.serviceUnit}</td>
                                <td>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        id="executionUnit"
                                        name='executionUnit'
                                        value={item.executionUnit}
                                        disabled={assessmentData.assesmentId !== ""}
                                        onChange={(e) => handleServiceChange(e, index)}
                                    />
                                </td>
                                <td>{item.serviceUnit1}</td>
                                <td>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        id="executionUnit1"
                                        name='executionUnit1'
                                        value={item.executionUnit1}
                                        disabled={item.serviceUnit1 === "NA" || item.serviceUnit1 === "" || assessmentData.assesmentId !== ""}
                                        onChange={(e) => handleServiceChange(e, index)}
                                    />
                                </td>
                                <td>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        id="rate"
                                        name='rate'
                                        value={item.rate}
                                        disabled={assessmentData.assesmentId !== ""}
                                        onChange={(e) => handleServiceChange(e, index)}
                                    />
                                </td>
                                <td>{item.totalRate}</td>
                                <td>
                                    <button
                                        className="btn btn-outline-danger btn-margin newButton"
                                        style={{ marginRight: 0, fontSize: 13 }}
                                        id="submitbtn2"
                                        disabled={item.assesmentId !== ''}
                                        onClick={() => handleDeleteRow(index)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                        />
                                    </button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </Table>
            </div>


            {assessmentData.assesmentId !== '' && (
                <>
                    <div style={{ marginTop: 20 }}>
                        <div style={{ fontWeight: 800, fontSize: 20 }}>
                            <span>Payment Details</span>
                        </div>
                        <hr />

                        <Row>
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        TDS Deductee / Perc
                                    </label>
                                    <Row>
                                        <Col md={8}>
                                            <Input
                                                className="form-control"
                                                type="select"
                                                id="tdsDeductee"
                                                name='tdsDeductee'
                                                value={tdsDeductee}
                                                disabled={assessmentData.invoiceNo !== ''}
                                                onChange={handleTdsDeductee}
                                            >
                                                <option value=""></option>
                                                {assessmentData.cha !== '' && (<option value="CHA">CHA</option>)}
                                                {assessmentData.importerId !== '' && (<option value="IMP">Importer</option>)}
                                                {assessmentData.onAccountOf !== '' && (<option value="FWR">Forwarder</option>)}
                                                {assessmentData.othPartyId !== '' && (<option value="OTH">Other</option>)}
                                            </Input>
                                        </Col>
                                        <Col md={4}>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="tdsPerc"
                                                name='tdsPerc'
                                                value={tdsPerc}
                                                onChange={(e) => setTdsPerc(e.target.value)}
                                                maxLength={10}
                                                disabled
                                            />
                                        </Col>
                                    </Row>

                                </FormGroup>
                            </Col>

                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Tan No
                                    </label>

                                    <Input
                                        className="form-control"
                                        type="text"
                                        id="tanNo"
                                        name='tanNo'
                                        value={tanNo}
                                        onChange={(e) => setTanNo(e.target.value)}
                                        maxLength={10}
                                        disabled
                                    />


                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Before Tax
                                    </label>

                                    <Input
                                        className="form-control"
                                        type="text"
                                        id="beforeTax"
                                        name='beforeTax'
                                        value={beforeTax}
                                        disabled
                                    />


                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Invoice Amt
                                    </label>

                                    <Input
                                        className="form-control"
                                        type="text"
                                        id="invoiceAmt"
                                        name='invoiceAmt'
                                        value={invoiceAmt}
                                        disabled
                                    />


                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Receipt Amt
                                    </label>


                                    <Input
                                        className="form-control"
                                        type="text"
                                        id="receiptAmt"
                                        name='receiptAmt'
                                        value={receiptAmt}
                                        disabled
                                    />

                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Balance For Payment
                                    </label>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        id="balanceAmt"
                                        name='balanceAmt'
                                        value={balanceAmt}
                                        disabled
                                    />

                                </FormGroup>
                            </Col>
                        </Row>
                        {(tanNo !== '' && assessmentData.creditType !== "Y") && (
                            <Row>
                                <span style={{ color: 'red' }}>The TDS will be deducted as per the applicable TDS percentage.</span>
                            </Row>
                        )}
                        {(tanNo !== '' && assessmentData.creditType === "Y") && (
                            <Row>
                                <span style={{ color: 'red' }}>During receipt the TDS will be deducted as per the applicable TDS percentage.</span>
                            </Row>
                        )}
                        <Row className='text-center'>
                            <Col>
                                <button
                                    className="btn btn-outline-primary btn-margin newButton"
                                    style={{ marginRight: 10, fontSize: 13 }}
                                    id="submitbtn2"
                                    onClick={addPaymentMode}
                                    disabled={balanceAmt === '' || balanceAmt === 0 || assessmentData.invoiceNo !== '' || assessmentData.creditType === 'Y'}
                                >
                                    <FontAwesomeIcon
                                        icon={faAdd}
                                        style={{ marginRight: "5px" }}
                                    />
                                    Add Payment Mode
                                </button>
                            </Col>
                        </Row>

                        {assessmentData.creditType === 'N' ? (
                            <div className="mt-3 table-responsive" style={{ maxHeight: "400px" }}>
                                <Table className="table table-bordered table-responsive" style={{ border: '2px solid black' }}>
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-center" style={{ color: "black", width: 50 }}>
                                                Sr No
                                            </th>
                                            <th scope="col" className="text-center" style={{ color: "black", width: 150 }}>
                                                Payment Mode
                                            </th>
                                            <th scope="col" className="text-center" style={{ color: "black", width: 200 }}>
                                                Cheque/Transaction No <span style={{ color: 'red' }}>*</span>
                                            </th>
                                            <th scope="col" className="text-center" style={{ color: "black", width: 210 }}>
                                                Cheque/Transaction Date <span style={{ color: 'red' }}>*</span>
                                            </th>
                                            <th scope="col" className="text-center" style={{ color: "black" }}>
                                                Bank Details
                                            </th>
                                            <th scope="col" className="text-center" style={{ color: "black", width: 150 }}>
                                                Amount
                                            </th>
                                            <th scope="col" className="text-center" style={{ color: "black", width: 100 }}>
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paymentMode.map((item, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <Input
                                                        className="form-control"
                                                        type="select"
                                                        id="payMode"
                                                        name='payMode'
                                                        value={item.payMode}
                                                        disabled={assessmentData.invoiceNo !== ''}
                                                        onChange={(e) => handlePaymentModeChange(e, index)}
                                                        style={{ width: 150 }}
                                                    >
                                                        <option value=""></option>
                                                        <option value="EFT">EFT</option>
                                                        <option value="RTGS">RTGS</option>
                                                        <option value="CASH">CASH</option>
                                                        <option value="CHEQUE">CHEQUE</option>
                                                        {(tanNo !== "" && tdsDeductee !== "") && (<option value="TDS">TDS</option>)}
                                                    </Input>

                                                </td>
                                                <td>
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        id="chequeNo"
                                                        name='chequeNo'
                                                        maxLength={25}
                                                        value={item.chequeNo}
                                                        onChange={(e) => handlePaymentModeChange(e, index)}
                                                        style={{ width: 180 }}
                                                        disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || assessmentData.invoiceNo !== ''}
                                                    />
                                                </td>
                                                <td>
                                                    <div style={{ position: 'relative', width: 210 }}>
                                                        <DatePicker
                                                            selected={item.chequeDate} // The currently selected date for the row
                                                            onChange={(date) => {
                                                                // Update the chequeDate for the specific row by index
                                                                setPaymentMode((prevState) => {
                                                                    const updatedRows = [...prevState];
                                                                    updatedRows[index] = {
                                                                        ...updatedRows[index],
                                                                        chequeDate: date,
                                                                    };
                                                                    return updatedRows;
                                                                });
                                                            }}
                                                            portalId="datepicker-portal3"
                                                            disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || assessmentData.invoiceNo !== ''}
                                                            popperPlacement="top-start"
                                                            id="chequeDate" // Unique identifier
                                                            name="chequeDate" // Name of the field
                                                            dateFormat="dd/MM/yyyy HH:mm" // Display format for the date and time
                                                            showTimeInput // Enables time input in the date picker
                                                            className="form-control border-right-0 InputField" // Custom class names for styling
                                                            customInput={<Input style={{ width: '100%' }} />} // Custom input element for styling
                                                            wrapperClassName="custom-react-datepicker-wrapper" // Custom wrapper for date picker
                                                        />

                                                        <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                                    </div>
                                                </td>
                                                <td>
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        id="bankDetails"
                                                        name='bankDetails'
                                                        value={item.bankDetails}
                                                        maxLength={50}
                                                        disabled={item.payMode === '' || item.payMode === 'CASH' || item.payMode === 'TDS' || assessmentData.invoiceNo !== ''}
                                                        onChange={(e) => handlePaymentModeChange(e, index)}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        id="amount"
                                                        name='amount'
                                                        value={item.amount}
                                                        disabled={item.payMode === '' || item.payMode === 'TDS' || assessmentData.invoiceNo !== ''}
                                                        onChange={(e) => handlePaymentModeChange(e, index)}
                                                        style={{ width: 180 }}

                                                    />
                                                </td>
                                                <td className='text-center'>

                                                    {item.status === '' ? (
                                                        <button
                                                            className="btn btn-outline-danger btn-margin newButton"
                                                            style={{ marginRight: 10, fontSize: 13 }}
                                                            id="submitbtn2"
                                                            onClick={() => removePaymentMode(index, item.amount)}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faTrash}
                                                            />
                                                        </button>
                                                    ) : (
                                                        <span>{item.status}</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        ) : (
                            <div className="mt-3 table-responsive" style={{ maxHeight: "400px" }}>
                                <Table className="table table-bordered table-responsive" style={{ border: '2px solid black' }}>
                                    <thead>
                                        <tr>
                                            <th scope="col" className="text-center" style={{ color: "black", width: 50 }}>
                                                Sr No
                                            </th>
                                            <th scope="col" className="text-center" style={{ color: "black", width: 150 }}>
                                                Payment Mode
                                            </th>
                                            <th scope="col" className="text-center" style={{ color: "black", width: 200 }}>
                                                Cheque/Transaction No <span style={{ color: 'red' }}>*</span>
                                            </th>
                                            <th scope="col" className="text-center" style={{ color: "black", width: 210 }}>
                                                Cheque/Transaction Date <span style={{ color: 'red' }}>*</span>
                                            </th>
                                            <th scope="col" className="text-center" style={{ color: "black" }}>
                                                Bank Details
                                            </th>
                                            <th scope="col" className="text-center" style={{ color: "black", width: 150 }}>
                                                Amount
                                            </th>
                                            <th scope="col" className="text-center" style={{ color: "black", width: 100 }}>
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paymentMode.map((item, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <Input
                                                        className="form-control"
                                                        type="select"
                                                        id="payMode"
                                                        name='payMode'
                                                        value={item.payMode}
                                                        disabled={assessmentData.invoiceNo !== '' || item.payMode === 'CREDIT' || item.payMode === 'ADVANCE'}
                                                        onChange={(e) => handlePaymentModeChange(e, index)}
                                                        style={{ width: 150 }}
                                                    >
                                                        <option value=""></option>
                                                        {assessmentData.creditType === "Y" && (<option value="CREDIT">CREDIT</option>)}
                                                        {assessmentData.creditType === "P" && (<option value="ADVANCE">ADVANCE</option>)}

                                                        {assessmentData.creditType === "P" && (<option value="TDS">TDS</option>)}

                                                    </Input>

                                                </td>
                                                <td>
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        id="chequeNo"
                                                        name='chequeNo'
                                                        maxLength={25}
                                                        value={item.chequeNo}
                                                        onChange={(e) => handlePaymentModeChange(e, index)}
                                                        style={{ width: 180 }}
                                                        disabled={item.payMode === '' || item.payMode === 'ADVANCE' || item.payMode === 'CASH' || item.payMode === 'TDS' || item.payMode === 'CREDIT' || assessmentData.invoiceNo !== ''}
                                                    />
                                                </td>
                                                <td>
                                                    <div style={{ position: 'relative', width: 210 }}>
                                                        <DatePicker
                                                            selected={item.chequeDate} // The currently selected date for the row
                                                            onChange={(date) => {
                                                                // Update the chequeDate for the specific row by index
                                                                setPaymentMode((prevState) => {
                                                                    const updatedRows = [...prevState];
                                                                    updatedRows[index] = {
                                                                        ...updatedRows[index],
                                                                        chequeDate: date,
                                                                    };
                                                                    return updatedRows;
                                                                });
                                                            }}
                                                            portalId="datepicker-portal3"
                                                            disabled={item.payMode === '' || item.payMode === 'ADVANCE' || item.payMode === 'CREDIT' || item.payMode === 'CASH' || item.payMode === 'TDS' || assessmentData.invoiceNo !== ''}
                                                            popperPlacement="top-start"
                                                            id="chequeDate" // Unique identifier
                                                            name="chequeDate" // Name of the field
                                                            dateFormat="dd/MM/yyyy HH:mm" // Display format for the date and time
                                                            showTimeInput // Enables time input in the date picker
                                                            className="form-control border-right-0 InputField" // Custom class names for styling
                                                            customInput={<Input style={{ width: '100%' }} />} // Custom input element for styling
                                                            wrapperClassName="custom-react-datepicker-wrapper" // Custom wrapper for date picker
                                                        />

                                                        <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                                    </div>
                                                </td>
                                                <td>
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        id="bankDetails"
                                                        name='bankDetails'
                                                        value={item.bankDetails}
                                                        maxLength={50}
                                                        disabled={item.payMode === '' || item.payMode === 'ADVANCE' || item.payMode === 'CREDIT' || item.payMode === 'CASH' || item.payMode === 'TDS' || assessmentData.invoiceNo !== ''}
                                                        onChange={(e) => handlePaymentModeChange(e, index)}
                                                    />
                                                </td>
                                                <td>
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        id="amount"
                                                        name='amount'
                                                        value={item.amount}
                                                        disabled={item.payMode === '' || item.payMode === 'CREDIT' || item.payMode === 'TDS' || assessmentData.invoiceNo !== ''}
                                                        onChange={(e) => handlePaymentModeChange(e, index)}
                                                        style={{ width: 180 }}

                                                    />
                                                </td>
                                                <td className='text-center'>

                                                    {item.status === '' ? (
                                                        <button
                                                            className="btn btn-outline-danger btn-margin newButton"
                                                            style={{ marginRight: 10, fontSize: 13 }}
                                                            id="submitbtn2"
                                                            disabled={item.payMode === 'CREDIT' || item.payMode === 'ADVANCE'}
                                                            onClick={() => removePaymentMode(index, item.amount)}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faTrash}
                                                            />
                                                        </button>
                                                    ) : (
                                                        <span>{item.status}</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        )}
                    </div>
                </>

            )}

        </div>
    )
}
