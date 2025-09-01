
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
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faCalendarAlt, faAdd, faCancel, faXmark, faArrowDown, faPlus, faArrowUp, faEdit, faChevronUp, faChevronDown, faMagnifyingGlassChart, faProcedures, faSpinner, faPrint } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import useAxios from '../Components/useAxios';
import { dark } from '@mui/material/styles/createPalette';
import { toast } from 'react-toastify';
import { CSSTransition } from 'react-transition-group';
import { error } from 'jquery';
import financeService from '../service/financeService';

export default function GeneralInvoice({ activeTab }) {
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

    const [commodityData, setCommodityData] = useState([]);

    const getCommodityData = () => {

        const id = 'J00006';

        axios.get(`${ipaddress}jardetail/getJarDetail?companyId=${companyid}&jarId=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setCommodityData(response.data);
            })
            .catch((error) => {

            })
    }


    useEffect(() => {
        if (activeTab === 'P01112') {
            getCommodityData();
        }
    }, [activeTab])


    const [assessmentData, setAssessmentData] = useState({
        companyId: "",
        branchId: "",
        assesmentId: "",
        assesmentLineNo: "",
        transType: "",
        assesmentDate: null,
        igmTransId: "",
        status: "",
        igmNo: "",
        igmLineNo: "",
        viaNo: "",
        igmDate: null,
        createdBy: "",
        blNo: "",
        blDate: null,
        profitcentreId: "",
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

    const [containerData, setContainerData] = useState([{
        assesmentId: '',
        assesmentLineNo: '',
        containerNo: '',
        containerSize: '',
        containerType: '',
        gateInDate: null,
        destuffDate: null,
        gateoutDate: null,
        examPercentage: '',
        typeOfContainer: '',
        scannerType: '',
        gateOutType: '',
        checkDate: 'N',
        invoiceDate: null,
        lastInvoiceUptoDate: null,
        upTariffNo: "",
        profitcentreId: "",
        grossWt: "",
        cargoWt: "",
        ssrTransId: "",
        serviceId: "",
        serviceName: "",
        rates: "",
        containerStatus: "",
        gatePassNo: "",
        gateOutId: "",
        area: ""
    }])
    const [advanceAmt, setAdvanceAmt] = useState('');

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

        axios.get(`${ipaddress}party/getImp?cid=${companyid}&bid=${branchId}&val=${val}`, {
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

    const [checkInvDate, setCheckInvDate] = useState('N');
    const [checkInvDate1, setCheckInvDate1] = useState('N');
    const [invDate, setInvDate] = useState(null);

    const [searchval, setSearchVal] = useState('');

    const [searchData, setSearchData] = useState([]);

    const getSearchData = (val) => {
        console.log('val ', val);

        if (!val) {
            setSearchData([]);
            return;
        }

        axios.get(`${ipaddress}assessment/searchGeneralJobBeforeSaveAssessmentData?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {

                const data = response.data;

                console.log("General data ", data);


                const searchOptions = data.map(port => ({
                    value: port[2],
                    label: port[2],
                    jobNo: port[1] === null ? "" : port[1],
                    jobTransId: port[0]
                }))
                setSearchData(searchOptions);
            })
            .catch((error) => {
                setSearchData([]);
            })
    }

    const handleSearchChange = async (selectedOption, { action }) => {

        if (action === 'clear') {

            setSearchVal('');

            handleClear();

        }
        else {
            setSearchVal(selectedOption.label);

            getSelectedBeforeSearchData(selectedOption.jobTransId, selectedOption.value);
        }
    };


    const getSelectedBeforeSearchData = (igmtrans, igm) => {
        setLoading(true);
        axios.get(`${ipaddress}assessment/getGeneralJobBeforeSaveAssessmentData?cid=${companyid}&bid=${branchId}&trans=${igmtrans}&boe=${igm}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const singleData = data[0];

                console.log('data ', data);

                const oldNop = singleData[22];
                const remainingNop = singleData[22] - singleData[37];
                const area = singleData[23];

                const finalArea = (area * remainingNop) / oldNop;

                // if (remainingNop <= 0) {
                //     toast.error("All packages associated with NOC No. ", singleData[3], " have been gated out.", {
                //         autoClose: 800
                //     })
                //     setLoading(false);
                //     return;
                // }


                setAssessmentData({
                    companyId: "",
                    branchId: "",
                    assesmentId: "",
                    assesmentLineNo: "",
                    transType: "",
                    assesmentDate: null,
                    igmTransId: singleData[0] || "",
                    status: "",
                    igmNo: singleData[3] || "",
                    igmLineNo: "",
                    viaNo: "",
                    igmDate: singleData[4] === null ? null : new Date(singleData[4]),
                    createdBy: "",
                    blNo: "",
                    blDate: null,
                    profitcentreId: singleData[2] || "",
                    sl: "",
                    sa: "",
                    insuranceValue: singleData[5] || "",
                    dutyValue: singleData[6] || "",
                    commodityDescription: singleData[16] || "",
                    commodityCode: "",
                    importerId: singleData[7] === null ? '' : singleData[7] || "",
                    importerName: singleData[8] === null ? '' : singleData[8] || "",
                    impSrNo: singleData[9] === null ? '' : singleData[9] || "",
                    cha: singleData[14] === null ? '' : singleData[14] || '',
                    chaSrNo: '',
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
                    impAddress: (singleData[10] === null ? '' : singleData[10]) || '' + ' - ' + (singleData[11] === null ? '' : singleData[11]) || '' + ' - ' + (singleData[12] === null ? '' : singleData[12]) || '',
                    impGst: singleData[13] === null ? '' : singleData[13] || '',
                    chaAddress: '',
                    chaName: singleData[15] === null ? '' : singleData[15] || '',
                    chaGst: '',
                    fwdGst: "",
                    fwdName: "",
                    fwdState: "",
                    accHolderGst: "",
                    accHolderName: "",
                    accHolderState: "",
                    creditAllowed: "",
                    saId: "",
                    slId: "",
                    lastAssesmentId: singleData[23] || '',
                    lastAssesmentDate: singleData[25] === null ? null : new Date(singleData[25]),
                    lastInvoiceNo: singleData[24] || '',
                    lastInvoiceDate: singleData[26] === null ? null : new Date(singleData[26]),

                })

                setContainerData(data.map((item) => ({
                    assesmentId: item[0] || '',
                    assesmentLineNo: item[1] || '',
                    containerNo: '',
                    containerSize: item[18] || '',
                    containerType: item[19] || '',
                    gateInDate: item[4] === null ? null : new Date(item[4]),
                    destuffDate: null,
                    gateoutDate: null,
                    examPercentage: item[17] || '0',
                    typeOfContainer: '',
                    scannerType: '',
                    gateOutType: '',
                    checkDate: 'N',
                    invoiceDate: null,
                    lastInvoiceUptoDate: item[22] === null ? null : new Date(item[22]),
                    upTariffNo: "",
                    profitcentreId: item[1] || '',
                    grossWt: item[21] ? (item[21] / 1000).toFixed(3) : '',
                    cargoWt: item[20] || 0,
                    ssrTransId: '',
                    serviceId: "",
                    serviceName: "",
                    rates: "",
                    containerStatus: "",
                    gatePassNo: "",
                    gateOutId: "",
                    area: item[20] || '0',
                })));

                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })
    }




    const handleClear = () => {
        setAssessmentData({
            companyId: "",
            branchId: "",
            assesmentId: "",
            assesmentLineNo: "",
            transType: "",
            assesmentDate: null,
            igmTransId: "",
            status: "",
            igmNo: "",
            igmLineNo: "",
            viaNo: "",
            igmDate: null,
            createdBy: "",
            blNo: "",
            blDate: null,
            profitcentreId: "",
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
        setCheckInvDate('N');
        setCheckInvDate1('N');
        setInvDate(null);
        setTdsDeductee('');
        setTanNo('');
        setBeforeTax('');
        setInvoiceAmt('');
        setReceiptAmt('');
        setBalanceAmt('');
        setTdsPerc('');
        setAdvanceAmt('');
        setPaymentMode([{
            payMode: '',
            chequeNo: '',
            chequeDate: null,
            bankDetails: '',
            amount: '',
            status: ''
        }])

        setContainerData([{
            assesmentId: '',
            assesmentLineNo: '',
            containerNo: '',
            containerSize: '',
            containerType: '',
            gateInDate: null,
            destuffDate: null,
            gateoutDate: null,
            examPercentage: '',
            typeOfContainer: '',
            scannerType: '',
            gateOutType: '',
            checkDate: 'N',
            invoiceDate: null,
            lastInvoiceUptoDate: null,
            upTariffNo: "",
            profitcentreId: "",
            grossWt: "",
            cargoWt: "",
            ssrTransId: "",
            serviceId: "",
            serviceName: "",
            rates: "",
            containerStatus: "",
            gatePassNo: "",
            gateOutId: "",
            area: ""
        }])
        setSearchData([]);
        setSearchVal('');
    }


    const handleCurrentDateCheckBox = (e) => {
        const isChecked = e.target.checked;
        setCheckInvDate1(isChecked ? 'Y' : 'N');

        // Get the current date in the desired format

        setContainerData((prevData) =>
            prevData.map((item) => ({
                ...item,
                checkDate: isChecked ? 'Y' : 'N',
                invoiceDate: isChecked ? new Date() : null,
            }))
        );
    };

    const handleSelectedDateCheckBox = (e) => {
        const isChecked = e.target.checked;
        setCheckInvDate(isChecked ? 'Y' : 'N');

        // Get the current date in the desired format

        setContainerData((prevData) =>
            prevData.map((item) => ({
                ...item,
                checkDate: isChecked ? 'Y' : 'N',
                invoiceDate: isChecked ? invDate : null,
            }))
        );
    };


    const handleInvDate = (date) => {
        setInvDate(date);

        if (checkInvDate === 'Y') {
            setContainerData((prevData) =>
                prevData.map((item) => ({
                    ...item,
                    checkDate: 'Y',
                    invoiceDate: date,
                }))
            );
        }
    }

    const handleSelectDateCheckBox = (e, index) => {

        const checked = e.target.checked;

        setContainerData(prevState => {
            const updatedData = [...prevState];
            updatedData[index] = {
                ...updatedData[index],
                checkDate: checked ? 'Y' : 'N',
                invoiceDate: checked ? (checkInvDate === 'Y' ? invDate : checkInvDate1 === 'Y' ? new Date() : null) : null
            };
            return updatedData;
        });
    }

    const handleSelectInvDate = (date, index) => {
        setContainerData(prevState => {
            const updatedData = [...prevState];

            const gateInDate = updatedData[index]?.gateInDate ? new Date(updatedData[index].gateInDate) : null;
            const lastInvoiceDate = updatedData[index]?.lastInvoiceUptoDate ? new Date(updatedData[index].lastInvoiceUptoDate) : null;
            const invoiceDate = date ? new Date(date) : null;

            let baseDate = lastInvoiceDate || gateInDate;
            let weeks = '';

            if (invoiceDate && baseDate) {
                const diffInMilliseconds = invoiceDate - baseDate;
                const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
                weeks = Math.ceil(diffInDays / 7);
            }

            updatedData[index] = {
                ...updatedData[index],
                invoiceDate: date,
                gateOutType: weeks
            };

            return updatedData;
        });
    };

    const handleSelectInvDate1 = (date, index) => {
        setContainerData(prevState => {
            const updatedData = [...prevState];

            const gateInDate = updatedData[index]?.gateInDate ? new Date(updatedData[index].gateInDate) : null;
            const lastInvoiceDate = updatedData[index]?.lastInvoiceUptoDate ? new Date(updatedData[index].lastInvoiceUptoDate) : null;
            const invoiceDate = date ? new Date(date) : null;

            let baseDate = gateInDate || lastInvoiceDate;
            let weeks = '';

            if (invoiceDate && baseDate) {
                const diffInMilliseconds = invoiceDate - baseDate;
                const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
                weeks = Math.ceil(diffInDays / 7);
            }

            updatedData[index] = {
                ...updatedData[index],
                invoiceDate: date,
                gateOutType: weeks
            };

            return updatedData;
        });
    };


    const handleSave = () => {
        if (!assessmentData.igmTransId) {
            toast.error("NOC data not found", {
                autoClose: 800
            })
            return;
        }


        if (!assessmentData.insuranceValue) {
            toast.error("Asset Value is required", {
                autoClose: 800
            })
            return;
        }

        if (!assessmentData.insuranceValue) {
            toast.error("Duty is required", {
                autoClose: 800
            })
            return;
        }

        if (!assessmentData.billingParty) {
            toast.error("Billing Party is required", {
                autoClose: 800
            })
            return;
        }
        else {
            if (assessmentData.billingParty === 'CHA') {
                if (!assessmentData.cha) {
                    toast.error("CHA is required", {
                        autoClose: 800
                    })
                    return;
                }


                if (!assessmentData.chaGst) {
                    toast.error("GstNo not found, please select another address", {
                        autoClose: 1000,
                        style: { width: '29vw' }
                    });
                    setLoading(false);
                    return;
                }



            }

            if (assessmentData.billingParty === 'IMP') {
                if (!assessmentData.importerId) {
                    toast.error("Importer is required", {
                        autoClose: 800
                    })
                    return;
                }

                if (!assessmentData.impGst) {
                    toast.error("GstNo not found, please select another address", {
                        autoClose: 1000,
                        style: { width: '33vw' }
                    });
                    setLoading(false);
                    return;
                }



            }

            if (assessmentData.billingParty === 'FWR') {
                if (!assessmentData.onAccountOf) {
                    toast.error("Forwarder is required", {
                        autoClose: 800
                    })
                    return;
                }


                if (!assessmentData.fwdGst) {
                    toast.error("GstNo not found, please select another address", {
                        autoClose: 1000,
                        style: { width: '33vw' }
                    });
                    setLoading(false);
                    return;
                }


            }

            if (assessmentData.billingParty === 'OTH') {
                if (!assessmentData.othPartyId) {
                    toast.error("Account holder is required", {
                        autoClose: 800
                    });
                    return;
                }

                if (!assessmentData.accHolderGst) {
                    toast.error("GstNo not found, please select another address", {
                        autoClose: 1000,
                        style: { width: '33vw' }
                    });
                    setLoading(false);
                    return;
                }


            }




        }


        // const data = containerData.filter(item => item.containerNo !== '');

        // if (data.length === 0) {
        //     toast.error("Container data not found", {
        //         autoClose: 800
        //     })
        //     return;
        // }

        const findNullInvDate = containerData.filter(item => item.invoiceDate === null);

        if (findNullInvDate.length > 0) {
            toast.error("Please select invoice validity date", {
                autoClose: 800
            })
            return;
        }

        const formData = {
            assessmentData: assessmentData,
            containerData: containerData
        }


        console.log('containerData ', containerData);

        setLoading(true);

        axios.post(`${ipaddress}assessment/saveGeneralReceivingAssessmentData?cid=${companyid}&bid=${branchId}&user=${userId}`, formData, {
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

                console.log('assessmentData ', data);

                const singleData = data[0];

                setAssessmentData({
                    companyId: "",
                    branchId: "",
                    assesmentId: singleData[0] || "",
                    assesmentLineNo: singleData[1] || "",
                    transType: singleData[2] || "",
                    assesmentDate: singleData[3] == null ? null : new Date(singleData[3]),
                    igmTransId: singleData[4] || "",
                    status: singleData[5] || "",
                    igmNo: singleData[6] || "",
                    igmLineNo: singleData[7] || "",
                    viaNo: singleData[8] || "",
                    igmDate: singleData[9] === null ? null : new Date(singleData[9]),
                    createdBy: singleData[10] || "",
                    blNo: singleData[11] || "",
                    blDate: singleData[12] === null ? null : new Date(singleData[12]),
                    profitcentreId: singleData[14] || "",
                    sl: singleData[16] || "",
                    sa: singleData[18] || "",
                    insuranceValue: singleData[23] || "",
                    dutyValue: singleData[24] || "",
                    commodityDescription: singleData[25] || "",
                    commodityCode: singleData[26] || "",
                    importerId: singleData[27] || "",
                    importerName: singleData[28] || "",
                    impSrNo: singleData[29] || "",
                    cha: singleData[30] || "",
                    chaSrNo: singleData[31] || "",
                    sez: singleData[36] || "N",
                    taxApplicable: singleData[37] || "Y",
                    onAccountOf: singleData[38] || "",
                    accSrNo: singleData[40] || "",
                    comments: singleData[43] || "",
                    othPartyId: singleData[44] || "",
                    othSrNo: singleData[46] || "",
                    billingParty: singleData[49] || "",
                    invoiceNo: singleData[50] || "",
                    creditType: singleData[51] || "N",
                    invoiceCategory: singleData[52] || "SINGLE",
                    isAncillary: singleData[53] || "N",
                    invoiceDate: singleData[54] === null ? null : new Date(singleData[54]),
                    irn: singleData[55] || "",
                    receiptNo: singleData[56] || "",
                    intComments: singleData[57] || "",
                    impAddress: singleData[19] + ' - ' + singleData[20] + ' - ' + singleData[21],
                    impGst: singleData[22] || "",
                    chaAddress: singleData[32] + ' - ' + singleData[33] + ' - ' + singleData[34],
                    chaName: singleData[71] || "",
                    chaGst: singleData[35] || "",
                    fwdGst: singleData[41] || "",
                    fwdName: singleData[39] || "",
                    fwdState: singleData[42] || "",
                    accHolderGst: singleData[47] || "",
                    accHolderName: singleData[45] || "",
                    accHolderState: singleData[48] || "",
                    creditAllowed: singleData[51] === 'Y' ? response.data.creditAllowed : "",
                    saId: singleData[17] || "",
                    slId: singleData[15] || "",
                    lastAssesmentId: singleData[74] || "",
                    lastAssesmentDate: singleData[75] === null ? null : new Date(singleData[76]),
                    lastInvoiceNo: singleData[76] || "",
                    lastInvoiceDate: singleData[77] === null ? null : new Date(singleData[78])
                })

                setContainerData(data.map((item) => ({
                    assesmentId: item[0] || '',
                    assesmentLineNo: item[1] || '',
                    containerNo: item[61] || '',
                    containerSize: item[62] || '',
                    containerType: item[63] || '',
                    gateInDate: item[64] === null ? null : new Date(item[64]),
                    destuffDate: null,
                    gateoutDate: item[65] === null ? null : new Date(item[65]),
                    examPercentage: item[58] || '',
                    typeOfContainer: '',
                    scannerType: '',
                    gateOutType: item[66] || '',
                    checkDate: 'N',
                    invoiceDate: item[67] === null ? null : new Date(item[67]),
                    lastInvoiceUptoDate: item[78] === null ? null : new Date(item[78]),
                    upTariffNo: "",
                    profitcentreId: "",
                    grossWt: item[60] || '',
                    cargoWt: item[59] || '',
                    ssrTransId: "",
                    serviceId: item[68] || '',
                    serviceName: item[69] || '',
                    rates: item[70] || '0.00',
                    containerStatus: "",
                    gatePassNo: "",
                    gateOutId: "",
                    area: ""
                })))

                if (singleData[51] === "Y") {
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


                if (singleData[51] === "P") {
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

                setCheckInvDate1('N')
                setCheckInvDate('N');
                setInvDate(null);
                setTdsDeductee(singleData[49]);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })

    }


    const handleSave1 = () => {
        if (!assessmentData.igmTransId) {
            toast.error("NOC data not found", {
                autoClose: 800
            })
            return;
        }


        if (!assessmentData.insuranceValue) {
            toast.error("Asset Value is required", {
                autoClose: 800
            })
            return;
        }

        if (!assessmentData.insuranceValue) {
            toast.error("Duty is required", {
                autoClose: 800
            })
            return;
        }

        if (!assessmentData.billingParty) {
            toast.error("Billing Party is required", {
                autoClose: 800
            })
            return;
        }



        else {
            if (assessmentData.billingParty === 'CHA') {
                if (!assessmentData.cha) {
                    toast.error("CHA is required", {
                        autoClose: 800
                    })
                    return;
                }


                if (!assessmentData.chaGst) {
                    toast.error("GstNo not found, please select another address", {
                        autoClose: 1000,
                        style: { width: '29vw' }
                    });
                    setLoading(false);
                    return;
                }


            }

            if (assessmentData.billingParty === 'IMP') {
                if (!assessmentData.importerId) {
                    toast.error("Importer is required", {
                        autoClose: 800
                    })
                    return;
                }


                if (!assessmentData.impGst) {
                    toast.error("GstNo not found, please select another address", {
                        autoClose: 1000,
                        style: { width: '33vw' }
                    });
                    setLoading(false);
                    return;
                }
            }

            if (assessmentData.billingParty === 'FWR') {
                if (!assessmentData.onAccountOf) {
                    toast.error("Forwarder is required", {
                        autoClose: 800
                    })
                    return;
                }


                if (!assessmentData.fwdGst) {
                    toast.error("GstNo not found, please select another address", {
                        autoClose: 1000,
                        style: { width: '33vw' }
                    });
                    setLoading(false);
                    return;
                }
            }

            if (assessmentData.billingParty === 'OTH') {
                if (!assessmentData.othPartyId) {
                    toast.error("Account holder is required", {
                        autoClose: 800
                    })
                    return;
                }
            }

            if (!assessmentData.accHolderGst) {
                toast.error("GstNo not found, please select another address", {
                    autoClose: 1000,
                    style: { width: '33vw' }
                });
                setLoading(false);
                return;
            }
        }





        // const data = containerData.filter(item => item.containerNo !== '');

        // if (data.length === 0) {
        //     toast.error("Container data not found", {
        //         autoClose: 800
        //     })
        //     return;
        // }

        const findNullInvDate = containerData.filter(item => item.invoiceDate === null);

        if (findNullInvDate.length > 0) {
            toast.error("Please select invoice validity date", {
                autoClose: 800
            })
            return;
        }

        const formData = {
            assessmentData: assessmentData,
            containerData: containerData
        }



        setLoading(true);

        axios.post(`${ipaddress}assessment/saveGeneralDeliveryAssessmentData?cid=${companyid}&bid=${branchId}&user=${userId}`, formData, {
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

                console.log('assessmentData ', data);

                const singleData = data[0];

                setAssessmentData({
                    companyId: "",
                    branchId: "",
                    assesmentId: singleData[0] || "",
                    assesmentLineNo: singleData[1] || "",
                    transType: singleData[2] || "",
                    assesmentDate: singleData[3] == null ? null : new Date(singleData[3]),
                    igmTransId: singleData[4] || "",
                    status: singleData[5] || "",
                    igmNo: singleData[6] || "",
                    igmLineNo: singleData[7] || "",
                    viaNo: singleData[8] || "",
                    igmDate: singleData[9] === null ? null : new Date(singleData[9]),
                    createdBy: singleData[10] || "",
                    blNo: singleData[11] || "",
                    blDate: singleData[12] === null ? null : new Date(singleData[12]),
                    profitcentreId: singleData[14] || "",
                    sl: singleData[16] || "",
                    sa: singleData[18] || "",
                    insuranceValue: singleData[23] || "",
                    dutyValue: singleData[24] || "",
                    commodityDescription: singleData[25] || "",
                    commodityCode: singleData[26] || "",
                    importerId: singleData[27] || "",
                    importerName: singleData[28] || "",
                    impSrNo: singleData[29] || "",
                    cha: singleData[30] || "",
                    chaSrNo: singleData[31] || "",
                    sez: singleData[36] || "N",
                    taxApplicable: singleData[37] || "Y",
                    onAccountOf: singleData[38] || "",
                    accSrNo: singleData[40] || "",
                    comments: singleData[43] || "",
                    othPartyId: singleData[44] || "",
                    othSrNo: singleData[46] || "",
                    billingParty: singleData[49] || "",
                    invoiceNo: singleData[50] || "",
                    creditType: singleData[51] || "N",
                    invoiceCategory: singleData[52] || "SINGLE",
                    isAncillary: singleData[53] || "N",
                    invoiceDate: singleData[54] === null ? null : new Date(singleData[54]),
                    irn: singleData[55] || "",
                    receiptNo: singleData[56] || "",
                    intComments: singleData[57] || "",
                    impAddress: singleData[19] + ' - ' + singleData[20] + ' - ' + singleData[21],
                    impGst: singleData[22] || "",
                    chaAddress: singleData[32] + ' - ' + singleData[33] + ' - ' + singleData[34],
                    chaName: singleData[71] || "",
                    chaGst: singleData[35] || "",
                    fwdGst: singleData[41] || "",
                    fwdName: singleData[39] || "",
                    fwdState: singleData[42] || "",
                    accHolderGst: singleData[47] || "",
                    accHolderName: singleData[45] || "",
                    accHolderState: singleData[48] || "",
                    creditAllowed: singleData[51] === 'Y' ? response.data.creditAllowed : "",
                    saId: singleData[17] || "",
                    slId: singleData[15] || "",
                    lastAssesmentId: singleData[74] || "",
                    lastAssesmentDate: singleData[75] === null ? null : new Date(singleData[76]),
                    lastInvoiceNo: singleData[76] || "",
                    lastInvoiceDate: singleData[77] === null ? null : new Date(singleData[78])
                })

                setContainerData(data.map((item) => ({
                    assesmentId: item[0] || '',
                    assesmentLineNo: item[1] || '',
                    containerNo: item[61] || '',
                    containerSize: item[62] || '',
                    containerType: item[63] || '',
                    gateInDate: item[65] === null ? null : new Date(item[65]),
                    destuffDate: null,
                    gateoutDate: null,
                    examPercentage: item[58] || '',
                    typeOfContainer: '',
                    scannerType: '',
                    gateOutType: item[66] || '',
                    checkDate: 'N',
                    invoiceDate: item[67] === null ? null : new Date(item[67]),
                    lastInvoiceUptoDate: item[64] === null ? null : new Date(item[64]),
                    upTariffNo: "",
                    profitcentreId: "",
                    grossWt: item[60] || '',
                    cargoWt: item[59] || '',
                    ssrTransId: "",
                    serviceId: item[68] || '',
                    serviceName: item[69] || '',
                    rates: item[70] || '0.00',
                    containerStatus: "",
                    gatePassNo: "",
                    gateOutId: "",
                    area: ""
                })))

                setCheckInvDate1('N')
                setCheckInvDate('N');
                setInvDate(null);
                setTdsDeductee(singleData[49]);

                if (singleData[51] === "Y") {
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


                if (singleData[51] === "P") {
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
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })

    }


    const [paymentMode, setPaymentMode] = useState([{
        payMode: '',
        chequeNo: '',
        chequeDate: null,
        bankDetails: '',
        amount: '',
        status: ''
    }])

    const [tdsDeductee, setTdsDeductee] = useState('');


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
            containerData: containerData,
            paymentDto: paymentMode,
            tdsDeductee: tdsDeductee,
            tdsPerc: tdsPerc,
        }

        setLoading(true);

        axios.post(`${ipaddress}assessment/saveGeneralJobInvoiceReceipt?cid=${companyid}&bid=${branchId}&user=${userId}&creditStatus=${assessmentData.creditType}`, formData, {
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
                    assesmentDate: singleData[3] == null ? null : new Date(singleData[3]),
                    igmTransId: singleData[4] || "",
                    status: singleData[5] || "",
                    igmNo: singleData[6] || "",
                    igmLineNo: singleData[7] || "",
                    viaNo: singleData[8] || "",
                    igmDate: singleData[9] === null ? null : new Date(singleData[9]),
                    createdBy: singleData[10] || "",
                    blNo: singleData[11] || "",
                    blDate: singleData[12] === null ? null : new Date(singleData[12]),
                    profitcentreId: singleData[14] || "",
                    sl: singleData[16] || "",
                    sa: singleData[18] || "",
                    insuranceValue: singleData[23] || "",
                    dutyValue: singleData[24] || "",
                    commodityDescription: singleData[25] || "",
                    commodityCode: singleData[26] || "",
                    importerId: singleData[27] || "",
                    importerName: singleData[28] || "",
                    impSrNo: singleData[29] || "",
                    cha: singleData[30] || "",
                    chaSrNo: singleData[31] || "",
                    sez: singleData[36] || "N",
                    taxApplicable: singleData[37] || "Y",
                    onAccountOf: singleData[38] || "",
                    accSrNo: singleData[40] || "",
                    comments: singleData[43] || "",
                    othPartyId: singleData[44] || "",
                    othSrNo: singleData[46] || "",
                    billingParty: singleData[49] || "",
                    invoiceNo: singleData[50] || "",
                    creditType: singleData[51] || "N",
                    invoiceCategory: singleData[52] || "SINGLE",
                    isAncillary: singleData[53] || "N",
                    invoiceDate: singleData[54] === null ? null : new Date(singleData[54]),
                    irn: singleData[55] || "",
                    receiptNo: singleData[56] || "",
                    intComments: singleData[57] || "",
                    impAddress: singleData[19] + ' - ' + singleData[20] + ' - ' + singleData[21],
                    impGst: singleData[22] || "",
                    chaAddress: singleData[32] + ' - ' + singleData[33] + ' - ' + singleData[34],
                    chaName: singleData[71] || "",
                    chaGst: singleData[35] || "",
                    fwdGst: singleData[41] || "",
                    fwdName: singleData[39] || "",
                    fwdState: singleData[42] || "",
                    accHolderGst: singleData[47] || "",
                    accHolderName: singleData[45] || "",
                    accHolderState: singleData[48] || "",
                    creditAllowed: singleData[51] === 'Y' ? response.data.creditAllowed : "",
                    saId: singleData[17] || "",
                    slId: singleData[15] || "",
                    lastAssesmentId: singleData[74] || "",
                    lastAssesmentDate: singleData[75] === null ? null : new Date(singleData[76]),
                    lastInvoiceNo: singleData[76] || "",
                    lastInvoiceDate: singleData[77] === null ? null : new Date(singleData[78])
                })

                setContainerData(data.map((item) => ({
                    assesmentId: item[0] || '',
                    assesmentLineNo: item[1] || '',
                    containerNo: item[61] || '',
                    containerSize: item[62] || '',
                    containerType: item[63] || '',
                    gateInDate: item[64] === null ? null : new Date(item[64]),
                    destuffDate: null,
                    gateoutDate: item[65] === null ? null : new Date(item[65]),
                    examPercentage: item[58] || '',
                    typeOfContainer: '',
                    scannerType: '',
                    gateOutType: item[66] || '',
                    checkDate: 'N',
                    invoiceDate: item[67] === null ? null : new Date(item[67]),
                    lastInvoiceUptoDate: item[78] === null ? null : new Date(item[78]),
                    upTariffNo: "",
                    profitcentreId: "",
                    grossWt: item[60] || '',
                    cargoWt: item[59] || '',
                    ssrTransId: "",
                    serviceId: item[68] || '',
                    serviceName: item[69] || '',
                    rates: item[70] || '0.00',
                    containerStatus: "",
                    gatePassNo: "",
                    gateOutId: "",
                    area: ""
                })))

                setCheckInvDate1('N')
                setCheckInvDate('N');

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

                if (singleData[51] === "P") {
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



    const saveProcess1 = () => {

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
            containerData: containerData,
            paymentDto: paymentMode,
            tdsDeductee: tdsDeductee,
            tdsPerc: tdsPerc,
        }

        setLoading(true);

        axios.post(`${ipaddress}assessment/saveGeneralDeliveryInvoiceReceipt?cid=${companyid}&bid=${branchId}&user=${userId}&creditStatus=${assessmentData.creditType}`, formData, {
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
                    assesmentDate: singleData[3] == null ? null : new Date(singleData[3]),
                    igmTransId: singleData[4] || "",
                    status: singleData[5] || "",
                    igmNo: singleData[6] || "",
                    igmLineNo: singleData[7] || "",
                    viaNo: singleData[8] || "",
                    igmDate: singleData[9] === null ? null : new Date(singleData[9]),
                    createdBy: singleData[10] || "",
                    blNo: singleData[11] || "",
                    blDate: singleData[12] === null ? null : new Date(singleData[12]),
                    profitcentreId: singleData[14] || "",
                    sl: singleData[16] || "",
                    sa: singleData[18] || "",
                    insuranceValue: singleData[23] || "",
                    dutyValue: singleData[24] || "",
                    commodityDescription: singleData[25] || "",
                    commodityCode: singleData[26] || "",
                    importerId: singleData[27] || "",
                    importerName: singleData[28] || "",
                    impSrNo: singleData[29] || "",
                    cha: singleData[30] || "",
                    chaSrNo: singleData[31] || "",
                    sez: singleData[36] || "N",
                    taxApplicable: singleData[37] || "Y",
                    onAccountOf: singleData[38] || "",
                    accSrNo: singleData[40] || "",
                    comments: singleData[43] || "",
                    othPartyId: singleData[44] || "",
                    othSrNo: singleData[46] || "",
                    billingParty: singleData[49] || "",
                    invoiceNo: singleData[50] || "",
                    creditType: singleData[51] || "N",
                    invoiceCategory: singleData[52] || "SINGLE",
                    isAncillary: singleData[53] || "N",
                    invoiceDate: singleData[54] === null ? null : new Date(singleData[54]),
                    irn: singleData[55] || "",
                    receiptNo: singleData[56] || "",
                    intComments: singleData[57] || "",
                    impAddress: singleData[19] + ' - ' + singleData[20] + ' - ' + singleData[21],
                    impGst: singleData[22] || "",
                    chaAddress: singleData[32] + ' - ' + singleData[33] + ' - ' + singleData[34],
                    chaName: singleData[71] || "",
                    chaGst: singleData[35] || "",
                    fwdGst: singleData[41] || "",
                    fwdName: singleData[39] || "",
                    fwdState: singleData[42] || "",
                    accHolderGst: singleData[47] || "",
                    accHolderName: singleData[45] || "",
                    accHolderState: singleData[48] || "",
                    creditAllowed: singleData[51] === 'Y' ? response.data.creditAllowed : "",
                    saId: singleData[17] || "",
                    slId: singleData[15] || "",
                    lastAssesmentId: singleData[74] || "",
                    lastAssesmentDate: singleData[75] === null ? null : new Date(singleData[76]),
                    lastInvoiceNo: singleData[76] || "",
                    lastInvoiceDate: singleData[77] === null ? null : new Date(singleData[78])
                })

                setContainerData(data.map((item) => ({
                    assesmentId: item[0] || '',
                    assesmentLineNo: item[1] || '',
                    containerNo: item[61] || '',
                    containerSize: item[62] || '',
                    containerType: item[63] || '',
                    gateInDate: item[65] === null ? null : new Date(item[65]),
                    destuffDate: null,
                    gateoutDate: null,
                    examPercentage: item[58] || '',
                    typeOfContainer: '',
                    scannerType: '',
                    gateOutType: item[66] || '',
                    checkDate: 'N',
                    invoiceDate: item[67] === null ? null : new Date(item[67]),
                    lastInvoiceUptoDate: item[64] === null ? null : new Date(item[64]),
                    upTariffNo: "",
                    profitcentreId: "",
                    grossWt: item[60] || '',
                    cargoWt: item[59] || '',
                    ssrTransId: "",
                    serviceId: item[68] || '',
                    serviceName: item[69] || '',
                    rates: item[70] || '0.00',
                    containerStatus: "",
                    gatePassNo: "",
                    gateOutId: "",
                    area: ""
                })))

                setCheckInvDate1('N')
                setCheckInvDate('N');

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

                if (singleData[51] === "P") {
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
        axios.get(`${ipaddress}assessment/searchGeneralInvoiceData?cid=${companyid}&bid=${branchId}&val=${id}&type=${selectedInvoice}`, {
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
        axios.get(`${ipaddress}assessment/getSelectedBondNOCInvoiceData?cid=${companyid}&bid=${branchId}&assId=${assId}&invId=${invId}&type=${selectedInvoice}`, {
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
                    assesmentDate: singleData[3] == null ? null : new Date(singleData[3]),
                    igmTransId: singleData[4] || "",
                    status: singleData[5] || "",
                    igmNo: singleData[6] || "",
                    igmLineNo: singleData[7] || "",
                    viaNo: singleData[8] || "",
                    igmDate: singleData[9] === null ? null : new Date(singleData[9]),
                    createdBy: singleData[10] || "",
                    blNo: singleData[11] || "",
                    blDate: singleData[12] === null ? null : new Date(singleData[12]),
                    profitcentreId: singleData[14] || "",
                    sl: singleData[16] || "",
                    sa: singleData[18] || "",
                    insuranceValue: singleData[23] || "",
                    dutyValue: singleData[24] || "",
                    commodityDescription: singleData[25] || "",
                    commodityCode: singleData[26] || "",
                    importerId: singleData[27] || "",
                    importerName: singleData[28] || "",
                    impSrNo: singleData[29] || "",
                    cha: singleData[30] || "",
                    chaSrNo: singleData[31] || "",
                    sez: singleData[36] || "N",
                    taxApplicable: singleData[37] || "Y",
                    onAccountOf: singleData[38] || "",
                    accSrNo: singleData[40] || "",
                    comments: singleData[43] || "",
                    othPartyId: singleData[44] || "",
                    othSrNo: singleData[46] || "",
                    billingParty: singleData[49] || "",
                    invoiceNo: singleData[50] || "",
                    creditType: singleData[51] || "N",
                    invoiceCategory: singleData[52] || "SINGLE",
                    isAncillary: singleData[53] || "N",
                    invoiceDate: singleData[54] === null ? null : new Date(singleData[54]),
                    irn: singleData[55] || "",
                    receiptNo: singleData[56] || "",
                    intComments: singleData[57] || "",
                    impAddress: singleData[19] + ' - ' + singleData[20] + ' - ' + singleData[21],
                    impGst: singleData[22] || "",
                    chaAddress: singleData[32] + ' - ' + singleData[33] + ' - ' + singleData[34],
                    chaName: singleData[71] || "",
                    chaGst: singleData[35] || "",
                    fwdGst: singleData[41] || "",
                    fwdName: singleData[39] || "",
                    fwdState: singleData[42] || "",
                    accHolderGst: singleData[47] || "",
                    accHolderName: singleData[45] || "",
                    accHolderState: singleData[48] || "",
                    creditAllowed: "",
                    saId: singleData[17] || "",
                    slId: singleData[15] || "",
                    lastAssesmentId: singleData[74] || "",
                    lastAssesmentDate: singleData[75] === null ? null : new Date(singleData[76]),
                    lastInvoiceNo: singleData[76] || "",
                    lastInvoiceDate: singleData[77] === null ? null : new Date(singleData[78])
                })


                if (selectedInvoice === "noc") {
                    setContainerData(data.map((item) => ({
                        assesmentId: item[0] || '',
                        assesmentLineNo: item[1] || '',
                        containerNo: item[61] || '',
                        containerSize: item[62] || '',
                        containerType: item[63] || '',
                        gateInDate: item[64] === null ? null : new Date(item[64]),
                        destuffDate: null,
                        gateoutDate: item[65] === null ? null : new Date(item[65]),
                        examPercentage: item[58] || '',
                        typeOfContainer: '',
                        scannerType: '',
                        gateOutType: item[66] || '',
                        checkDate: 'N',
                        invoiceDate: item[67] === null ? null : new Date(item[67]),
                        lastInvoiceUptoDate: item[78] === null ? null : new Date(item[78]),
                        upTariffNo: "",
                        profitcentreId: "",
                        grossWt: item[60] || '',
                        cargoWt: item[59] || '',
                        ssrTransId: "",
                        serviceId: item[68] || '',
                        serviceName: item[69] || '',
                        rates: item[70] || '0.00',
                        containerStatus: "",
                        gatePassNo: "",
                        gateOutId: "",
                        area: ""
                    })))
                }
                else {
                    setContainerData(data.map((item) => ({
                        assesmentId: item[0] || '',
                        assesmentLineNo: item[1] || '',
                        containerNo: item[61] || '',
                        containerSize: item[62] || '',
                        containerType: item[63] || '',
                        gateInDate: item[65] === null ? null : new Date(item[65]),
                        destuffDate: null,
                        gateoutDate: null,
                        examPercentage: item[58] || '',
                        typeOfContainer: '',
                        scannerType: '',
                        gateOutType: item[66] || '',
                        checkDate: 'N',
                        invoiceDate: item[67] === null ? null : new Date(item[67]),
                        lastInvoiceUptoDate: item[64] === null ? null : new Date(item[64]),
                        upTariffNo: "",
                        profitcentreId: "",
                        grossWt: item[60] || '',
                        cargoWt: item[59] || '',
                        ssrTransId: "",
                        serviceId: item[68] || '',
                        serviceName: item[69] || '',
                        rates: item[70] || '0.00',
                        containerStatus: "",
                        gatePassNo: "",
                        gateOutId: "",
                        area: ""
                    })))
                }




                setCheckInvDate1('N')
                setCheckInvDate('N');

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

                if (singleData[51] === "P") {
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

    const [selectedInvoice, setSelectedInvoice] = useState("noc");

    // Handle change in radio button selection
    const handleSelectInvoice = (value) => {


        if (selectedInvoice !== value) {
            handleClear();
        }

        setSelectedInvoice(value);
    };



    //Exbond


    const [exBoeData, setExBoeData] = useState([]);
    const [selectExBoeData, setSelectExBoeData] = useState('');


    const getExBoeSearchData = (val) => {
        console.log('val ', val);

        if (!val) {
            setSearchData([]);
            return;
        }

        axios.get(`${ipaddress}assessment/getBeforeAssessmentDeliveryData?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {

                const data = response.data;

                const searchOptions = data.map(port => ({
                    value: port[0],
                    label: port[3] + ' - ' + port[0],
                    jobNo: port[1],
                    jobTransId: port[2],
                    boeNo: port[3]
                }))
                setExBoeData(searchOptions);
            })
            .catch((error) => {
                setExBoeData([]);
            })
    }

    const handleExBondBoeSearchChange = async (selectedOption, { action }) => {

        if (action === 'clear') {

            setSelectExBoeData('');

            handleClear();

        }
        else {
            setSelectExBoeData(selectedOption.label);

            getSelectedBeforeSearchDataForExBond(selectedOption.value);
        }
    };


    const handlePrint1 = async (type) => {

        const invoiceNo = assessmentData.invoiceNo;
        const assesmentId = assessmentData.assesmentId;
        const igmTransId = assessmentData.igmTransId;


        axios.post(`${ipaddress}importinvoiceprint/printGeneralInvoicepdf/${companyid}/${branchId}/${invoiceNo}/${assesmentId}/${igmTransId}/${selectedInvoice}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then(response => {
                const pdfBase64 = response.data;
                const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
                const blobUrl = URL.createObjectURL(pdfBlob);
                window.open(blobUrl, '_blank');
            })
            .catch(error => {
                console.error('Error in handlePrint:', error.message);
            });
    }


    const getSelectedBeforeSearchDataForExBond = (val) => {
        setLoading(true);
        axios.get(`${ipaddress}assessment/getGeneralDeliveryBeforeSaveAssessmentData?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const singleData = data[0];

                console.log('exbond ', data);


                setAssessmentData({
                    companyId: "",
                    branchId: "",
                    assesmentId: "",
                    assesmentLineNo: "",
                    transType: "",
                    assesmentDate: null,
                    igmTransId: singleData[0] || "",
                    status: "",
                    igmNo: singleData[3] || "",
                    igmLineNo: singleData[23] || "",
                    viaNo: "",
                    igmDate: singleData[4] === null ? null : new Date(singleData[4]),
                    createdBy: "",
                    blNo: "",
                    blDate: null,
                    profitcentreId: singleData[2] || "",
                    sl: "",
                    sa: "",
                    insuranceValue: singleData[5] || "",
                    dutyValue: singleData[6] || "",
                    commodityDescription: singleData[16] || "",
                    commodityCode: "",
                    importerId: singleData[7] === null ? '' : singleData[7] || "",
                    importerName: singleData[8] === null ? '' : singleData[8] || "",
                    impSrNo: singleData[9] === null ? '' : singleData[9] || "",
                    cha: singleData[14] === null ? '' : singleData[14] || '',
                    chaSrNo: '',
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
                    impAddress: (singleData[10] === null ? '' : singleData[10]) || '' + ' - ' + (singleData[11] === null ? '' : singleData[11]) || '' + ' - ' + (singleData[12] === null ? '' : singleData[12]) || '',
                    impGst: singleData[13] === null ? '' : singleData[13] || '',
                    chaAddress: '',
                    chaName: singleData[15] === null ? '' : singleData[15] || '',
                    chaGst: '',
                    fwdGst: "",
                    fwdName: "",
                    fwdState: "",
                    accHolderGst: "",
                    accHolderName: "",
                    accHolderState: "",
                    creditAllowed: "",
                    saId: "",
                    slId: "",
                    lastAssesmentId: '',
                    lastAssesmentDate: null,
                    lastInvoiceNo: '',
                    lastInvoiceDate: null,

                })

                setContainerData(data.map((item) => ({
                    assesmentId: item[0] || '',
                    assesmentLineNo: item[1] || '',
                    containerNo: '',
                    containerSize: item[18] || '',
                    containerType: item[19] || '',
                    gateInDate: item[22] === null ? null : new Date(item[22]),
                    destuffDate: null,
                    gateoutDate: null,
                    examPercentage: item[17] || '',
                    typeOfContainer: '',
                    scannerType: '',
                    gateOutType: '',
                    checkDate: 'N',
                    invoiceDate: null,
                    lastInvoiceUptoDate: item[22] === null ? null : new Date(new Date(item[22]).setDate(new Date(item[22]).getDate() + 1)),
                    upTariffNo: "",
                    profitcentreId: item[1] || '',
                    grossWt: item[21] ? (item[21] / 1000).toFixed(3) : '',
                    cargoWt: item[20] || 0,
                    ssrTransId: '',
                    serviceId: "",
                    serviceName: "",
                    rates: "",
                    containerStatus: "",
                    gatePassNo: "",
                    gateOutId: "",
                    area: item[20] || '0',
                })));

                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })
    }

    const handleInvoiceWeeks = (e, index) => {
        let { name, value } = e.target;

        value = handleInputChange(value, 8, 0);

        setContainerData(prevState => {
            let updatedData = [...prevState];
            updatedData[index] = {
                ...updatedData[index],
                [name]: value,
                invoiceDate: (updatedData[index].gateInDate && value && value > 0)
                    ? new Date(new Date(updatedData[index].gateInDate).setDate(new Date(updatedData[index].gateInDate).getDate() + (value * 7)))
                    : null // Handle null or invalid gateInDate
            };
            return updatedData;
        });



    }


    //Add service

    const [showModalforPrintInvoice, setShowModalforPrintInvoice] = useState(false);
    const handleCloseModalPrintInvoice = () => {

        setShowModalforPrintInvoice(false);
    };
    const handleModelOPenForPrintInvoice = () => {
        setShowModalforPrintInvoice(true);

    }

    const initialCfinvsrvanx = {
        companyId: companyid, // String for companyId
        branchId: branchId,  // String for branchId
        processTransId: assessmentData.assesmentId, // String for processTransId
        serviceId: '', // String for serviceId
        taxId: '', // String for taxId
        erpDocRefNo: assessmentData.igmTransId, // String for ERP Doc Ref No
        srlNo: 0, // BigDecimal equivalent (can be treated as number in JS)
        finPeriod: '', // String for finPeriod
        docRefNo: assessmentData.igmNo, // String for docRefNo
        igmLineNo: '', // String for IGM Line No
        profitcentreId: "N00002", // String for profitcentreId
        invoiceNo: '', // String for invoiceNo
        invoiceDate: null, // Date for invoiceDate (use null or Date object)
        invoiceType: '', // String for invoiceType
        invoiceSubType: '', // String for invoiceSubType
        serviceUnit: '', // String for serviceUnit
        executionUnit: '', // String for executionUnit
        serviceUnit1: '', // String for serviceUnit1
        executionUnit1: '', // String for executionUnit1
        rate: 0, // BigDecimal for rate (use number in JS)
        currencyId: 'INR', // String for currencyId
        periodFrom: null, // Date for periodFrom
        periodTo: null, // Date for periodTo
        foreignAmt: 0, // BigDecimal for foreignAmt (use number in JS)
        exRate: 0, // BigDecimal for exRate (use number in JS)
        localAmtForeign: 0, // BigDecimal for localAmtForeign (use number in JS)
        localAmt: 0, // BigDecimal for localAmt (use number in JS)
        taxPerc: 0, // BigDecimal for taxPerc (use number in JS)
        discDays: 0, // BigDecimal for discDays (use number in JS)
        discPercentage: 0, // BigDecimal for discPercentage (use number in JS)
        discValue: 0, // BigDecimal for discValue (use number in JS)
        mPercentage: 0, // BigDecimal for mPercentage (use number in JS)
        mAmount: 0, // BigDecimal for mAmount (use number in JS)
        invoiceAmt: 0, // BigDecimal for invoiceAmt (use number in JS)
        contractor: '', // String for contractor
        acCode: '', // String for acCode
        processTransDate: null, // Date for processTransDate
        processId: '', // String for processId
        partyId: '', // String for partyId
        woNo: '', // String for woNo
        woAmndNo: '', // String for woAmndNo
        lineNo: '', // String for lineNo
        beNo: '', // String for beNo
        beDate: null, // Date for beDate
        criteria: '', // String for criteria
        rangeFrom: 0, // BigDecimal for rangeFrom (use number in JS)
        rangeTo: 0, // BigDecimal for rangeTo (use number in JS)
        rangeType: '', // String for rangeType
        negeotiable: '', // String for negeotiable
        containerNo: '', // String for containerNo
        containerStatus: '', // String for containerStatus
        commodityDescription: '', // String for commodityDescription
        actualNoOfPackages: 0, // BigDecimal for actualNoOfPackages (use number in JS)
        gateOutId: '', // String for gateOutId
        gatePassNo: '', // String for gatePassNo
        addServices: '', // String for addServices
        gateOutDate: null, // Date for gateOutDate
        startDate: null, // Date for startDate
        invoiceUptoDate: null, // Date for invoiceUptoDate
        invoiceUptoWeek: null, // Date for invoiceUptoWeek
        debitNoteExe: 0, // BigDecimal for debitNoteExe (use number in JS)
        debitNoteAmt: 0, // BigDecimal for debitNoteAmt (use number in JS)
        cfsBaseRate: 0, // BigDecimal for cfsBaseRate (use number in JS)
        partyBaseRate: 0, // BigDecimal for partyBaseRate (use number in JS)
        rebate: 0, // BigDecimal for rebate (use number in JS)
        profitability: 0, // BigDecimal for profitability (use number in JS)
        status: '', // String for status
        createdBy: '', // String for createdBy
        createdDate: null, // Date for createdDate
        editedBy: '', // String for editedBy
        editedDate: null, // Date for editedDate
        approvedBy: '', // String for approvedBy
        approvedDate: null, // Date for approvedDate
        billAmt: 0, // BigDecimal for billAmt (use number in JS)
        joServiceId: '', // String for joServiceId
        joNo: '', // String for joNo
        joAmndNo: '', // String for joAmndNo
        taxApp: '', // String for taxApp
        taxIdN: '', // String for taxIdN
        taxPercN: 0, // BigDecimal for taxPercN (use number in JS)
        taxAmt: 0, // BigDecimal for taxAmt (use number in JS)
        acCodeN: '', // String for acCodeN
        hsnCode: '', // String for hsnCode
        dutyRate: 0, // BigDecimal for dutyRate (use number in JS)
        lotNo: '', // String for lotNo
        fileNo: '', // String for fileNo
        tcsRate: 0, // BigDecimal for tcsRate (use number in JS)
        tcsAmount: 0, // BigDecimal for tcsAmount (use number in JS)
        invoiceDaysOld: 0, // BigDecimal for invoiceDaysOld (use number in JS)
        invoiceAmtOld: 0, // BigDecimal for invoiceAmtOld (use number in JS)
        addOnRate: 0, // BigDecimal for addOnRate (use number in JS)
        prevRate: 0, // BigDecimal for prevRate (use number in JS)
        cargoSBNo: '', // String for cargoSBNo
        srvManualFlag: '', // String for srvManualFlag
        chargableDays: 0, // BigDecimal for chargableDays (use number in JS)
        freeDays: 0, // BigDecimal for freeDays (use number in JS)
    };

    const axiosInstance = useAxios();
    const FinanceService = new financeService(axiosInstance);
    const [Cfinvsrvanx, setCfinvsrvanx] = useState(initialCfinvsrvanx);
    const [CfinvsrvanxData, setCfinvsrvanxData] = useState([]);
    const [isModalOpenForAddService, setIsModalOpenForAddService] = useState(false);


    const getAllCfInvSrvAnxList = async (companyId, branchId, assesmentId, assesmentLineNo, containerNo, profitcentreId) => {
        try {
            const response = await FinanceService.getAllCfInvSrvAnxList(companyId, branchId, assesmentId, assesmentLineNo, containerNo, profitcentreId, jwtToken);

            setCfinvsrvanxData(response.data);
        } catch {
            setCfinvsrvanxData([]);
        }
    }



    const openAddServiceModal = async (item) => {
        await getAllCfInvSrvAnxList(companyid, branchId, item.assesmentId, item.assesmentLineNo, item.containerNo, "N00002");

        console.log("service ", item.assesmentId, ' ', item.assesmentLineNo, ' ', item.containerNo);


        setCfinvsrvanx(prevState => ({
            ...prevState,
            processTransId: item.assesmentId,
            containerNo: item.containerNo,
            containerSize: item.containerSize,
            containerType: item.containerType,
            gateOutDate: item.gateOutDate,
            gateOutId: item.gateOutId,
            gatePassNo: item.gatePassNo,
            invoiceUptoDate: item.invoiceDate,
            invoiceUptoWeek: item.invoiceDate,
            partyId: assessmentData.partyId,
            startDate: item.gateInDate
        }));
        setIsModalOpenForAddService(true);
    }

    const handleClosAddService = async () => {
        setIsModalOpenForAddService(false);
        setCfinvsrvanxData([]);
        getAllContainerDetailsOfAssesmentId();
        setSelectedServices([]);
    }



    // Pagination

    const [currentPagAddService, setCurrentPageAddService] = useState(1);
    const indexOfLastItemAddService = currentPagAddService * itemsPerPage;
    const indexOfFirstItemAddService = indexOfLastItemAddService - itemsPerPage;
    const currentItemsAddService = CfinvsrvanxData.slice(indexOfFirstItemAddService, indexOfLastItemAddService);
    const totalPagesAddService = Math.ceil(CfinvsrvanxData.length / itemsPerPage);




    // Function to handle page change
    const handlePageChangeAddService = (page) => {
        if (page >= 1 && page <= totalPagesAddService) {
            setCurrentPageAddService(page);
        }
    };
    const displayPagesAddService = () => {
        const centerPageCount = 5;
        const middlePage = Math.floor(centerPageCount / 2);
        let startPage = currentPagAddService - middlePage;
        let endPage = currentPagAddService + middlePage;

        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(totalPagesAddService, centerPageCount);
        }

        if (endPage > totalPagesAddService) {
            endPage = totalPagesAddService;
            startPage = Math.max(1, totalPagesAddService - centerPageCount + 1);
        }
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };





    const addServiePlus = async () => {
        // Determine the highest srlNo in the current list
        const highestSrlNo = CfinvsrvanxData.length > 0
            ? Math.max(...CfinvsrvanxData.map(item => item.srlNo))
            : 0;




        // Create a new object with incremented srlNo
        const newCfinvsrvanx = {
            ...Cfinvsrvanx,
            srlNo: highestSrlNo + 1,
            addServices: 'Y',
            companyId: companyid,
            branchId: branchId,
            processTransId: assessmentData.assesmentId,
            erpDocRefNo: assessmentData.igmTransId,
            docRefNo: assessmentData.igmNo,
            profitcentreId: "N00002",
            serviceUnit: '',
            serviceUnit1: '',
            executionUnit: '',
            executionUnit1: '',
            rate: '',
            actualNoOfPackages: '',
            rangeFrom: '',
            rangeTo: '',
            rangeType: '',
        };

        // Update the list and ensure the new entry is at the top
        setCfinvsrvanxData([newCfinvsrvanx, ...CfinvsrvanxData]);
    };



    const CustomOptionService = (props) => {
        return (
            <components.Option {...props}>
                <span style={{ fontWeight: 'bold' }}>{props.data.serviceName}</span>
                {" - " + props.data.rate}
            </components.Option>
        );
    };



    const [selectedServices, setSelectedServices] = useState([]);
    const [services, setServices] = useState([]);
    const [validationErrors, setValidationErrors] = useState([]);


    const searchServices = async (searchvalue, containerSize, containerType) => {
        try {
            const response = await FinanceService.searchServicesForAddService(companyid, branchId, searchvalue, assessmentData.commodityCode, containerSize, containerType, assessmentData, jwtToken);

            console.log('services', response.data);

            setServices(response.data);
        } catch (error) {
            console.error("Error fetching Gate In entries:", error);
        }
    };




    const handleServiceChange = async (selectedOption, srlNo) => {
        // Update only the specific srlNo in selectedServices
        setSelectedServices((prevServices) => {
            const existingService = prevServices.find((service) => service.srlNo === srlNo);

            if (existingService) {
                // Update the existing service
                return prevServices.map((service) =>
                    service.srlNo === srlNo
                        ? { ...service, selectedOption } // Update the selected option for this srlNo
                        : service // Keep the rest unchanged
                );
            } else {
                // Add a new service if it doesn't exist
                return [
                    ...prevServices,
                    {
                        srlNo, // New service srlNo
                        selectedOption, // New selected option
                    },
                ];
            }
        });



        setCfinvsrvanxData((prevData) =>
            prevData.map((entry) =>
                entry.srlNo === srlNo
                    ? {
                        ...entry, serviceId: selectedOption ? selectedOption.value : '',
                        serviceName: selectedOption ? selectedOption.label : '',
                        executionUnit: selectedOption ? selectedOption.executionUnit : '',
                        executionUnit1: selectedOption ? selectedOption.executionUnit1 : '',
                        actualNoOfPackages: selectedOption ? selectedOption.actualNoOfPackages : '',
                        serviceUnit: selectedOption ? selectedOption.serviceUnit : '',
                        serviceUnit1: selectedOption ? selectedOption.serviceUnit1 : '',
                        rate: selectedOption ? selectedOption.rate : 0,
                        currencyId: selectedOption ? selectedOption.currencyId : '',
                        woNo: selectedOption ? selectedOption.woNo : '',
                        woAmndNo: selectedOption ? selectedOption.woAmndNo : '',
                        lineNo: selectedOption ? selectedOption.lineNo : '0',
                        rangeType: selectedOption ? selectedOption.rangeType : '',
                        taxId: selectedOption ? selectedOption.taxId : '',
                        taxPerc: selectedOption ? selectedOption.taxPerc : 0,
                        acCode: selectedOption ? selectedOption.acCode : '',
                        executionUnit: 0,
                        executionUnit1: 0,
                        actualNoOfPackages: 0
                    }
                    : entry
            )
        );
        setValidationErrors(prevErrors => {
            const updatedErrors = { ...prevErrors };
            if (updatedErrors[srlNo]) {
                delete updatedErrors[srlNo];
            }
            return updatedErrors;
        });

    };




    const handleFieldChangeService = async (e, fieldName, type, srlNo, maxIntegerDigits, maxDecimalDigits) => {
        let { value } = e.target;

        // Validate input based on the type
        if (type === 'decimal') {
            value = value.replace(/[^0-9.]/g, ''); // Remove invalid characters

            const parts = value.split('.');
            if (parts.length > 2) {
                value = parts[0] + '.' + parts.slice(1).join('');
            }

            if (parts[0].length > maxIntegerDigits) {
                parts[0] = parts[0].slice(0, maxIntegerDigits);
            }

            if (parts[1]) {
                parts[1] = parts[1].slice(0, maxDecimalDigits);
            }

            value = parts.join('.');
        } else if (type === 'number') {
            value = value.replace(/[^0-9]/g, ''); // Allow only numbers
        }

        setCfinvsrvanxData(prevState => {
            const updatedServices = prevState.map(service => {
                if (service.srlNo === srlNo) {
                    const updatedService = {
                        ...service,
                        [fieldName]: value, // Update the specific field
                    };

                    // Calculate actualNoOfPackages if fieldName is one of the specified fields
                    if (
                        ['rate', 'executionUnit', 'executionUnit1'].includes(fieldName)
                    ) {
                        updatedService.actualNoOfPackages = (
                            parseFloat(updatedService.rate || 0) *
                            parseFloat(updatedService.executionUnit || 0) *
                            parseFloat(
                                updatedService.executionUnit1 && updatedService.serviceUnit1 !== 'NA' && updatedService.serviceUnit1.trim() !== ''
                                    ? updatedService.executionUnit1
                                    : 1
                            )
                        ).toFixed(2);
                    }

                    return updatedService;
                }
                return service; // Keep the rest unchanged
            });
            return updatedServices;
        });

        // Clear validation errors for the specific field by matching srlNo
        setValidationErrors(prevErrors => {
            const updatedErrors = { ...prevErrors };
            if (updatedErrors[srlNo]) {
                delete updatedErrors[srlNo][fieldName]; // Remove the field error for the matched srlNo
                if (Object.keys(updatedErrors[srlNo]).length === 0) {
                    delete updatedErrors[srlNo]; // Remove the srlNo key if no errors remain
                }
            }
            return updatedErrors;
        });
    };





    const validateServiceData = (filteredData) => {
        let errors = {}; // Use an object to store errors by srlNo

        filteredData.forEach((detail) => {
            const { serviceId, executionUnit, executionUnit1, rate, actualNoOfPackages, srlNo, serviceUnit1 } = detail;
            let error = {};

            // Required field validations
            if (!executionUnit || executionUnit <= 0) {
                error.executionUnit = 'executionUnit is required';
            }

            console.log('serviceUnit1, ', serviceUnit1.trim(), ' executionUnit1 ', executionUnit1);
            if (serviceUnit1 && serviceUnit1.trim() !== 'NA' && serviceUnit1.trim() !== '') {
                if (!executionUnit1 || executionUnit1 <= 0) {
                    error.executionUnit1 = 'executionUnit1 is required';
                }
            }


            if (!rate || rate <= 0) {
                error.rate = 'rate is required';
            }

            if (!actualNoOfPackages || actualNoOfPackages <= 0) {
                error.actualNoOfPackages = 'actualNoOfPackages is required';
            }

            if (!srlNo || srlNo <= 0) {
                error.srlNo = 'srlNo is required';
            }

            if (!serviceId) {
                error.serviceId = 'serviceId is required';
            }

            // Add the error to the errors object, keyed by srlNo
            if (Object.keys(error).length > 0) {
                errors[srlNo] = error;
            }
        });

        setValidationErrors(errors);

        // Return true if no errors exist
        return Object.keys(errors).length === 0;
    };




    const saveAddService = async (serviceData) => {

        const filteredData = serviceData?.filter((detail) => detail.addServices === 'Y') || [];

        // Check if filteredData is empty
        if (filteredData.length === 0) {
            toast.warning("Please add the service first", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
            });
            return;
        }

        if (!validateServiceData(filteredData)) {
            toast.warning("Plase check the values entered...", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
            });
            return false;
        }


        setLoading(true);
        try {
            const response = await FinanceService.addServiceImportInvoice(companyid, branchId, userId, assessmentData, serviceData, jwtToken);

            console.log('response.data ' + response.data);

            setCfinvsrvanxData(response.data);

            toast.success('Services added successfully!', {
                autoClose: 1000,
            });
        } catch {
            toast.error('Oops something went wrong!', {
                autoClose: 1000,
            });
        }
        finally {
            setLoading(false);
        }

    }
    const initialPaymentMode = {
        payMode: '',
        chequeNo: '',
        chequeDate: null,
        bankDetails: '',
        amount: '',
        status: ''
    }

    // const [Cfinvsrvanx, setCfinvsrvanx] = useState(initialCfinvsrvanx);
    const [containerDataServiceWise, setContainerDataServiceWise] = useState([]);
    const [isModalOpenForAddServiceServiceWise, setIsModalOpenForAddServiceServiceWise] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [validationContainer, setValidationContainerErrors] = useState([]);



    const openModelForAddServiceServiceWise = async () => {
        //  await getAllContainerListOfAssessMentSheet(companyid, branchId, assessmentData.assesmentId, "N00003");
        setIsModalOpenForAddServiceServiceWise(true);

        const commodityData = containerData[0];

        setContainerDataServiceWise([commodityData]);
    }


    const getAllContainerListOfAssessMentSheet = async (companyId, branchId, assesmentId, profitcentreId) => {
        try {
            const response = await FinanceService.getAllContainerListOfAssessMentSheet1(companyId, branchId, assesmentId, profitcentreId, jwtToken);
            setContainerDataServiceWise(response.data);
        } catch {
            setContainerDataServiceWise([]);
        }
    }


    const handleClosAddServiceServiceWise = async () => {
        setIsModalOpenForAddServiceServiceWise(false);
        setCfinvsrvanxData([]);
        handleReset();
        getAllContainerDetailsOfAssesmentId();
    }





    const getAllContainerDetailsOfAssesmentId = () => {
        try {

            let partyId = "";

            if (assessmentData.billingParty === "CHA") {
                partyId = assessmentData.cha;
            }

            else if (assessmentData.billingParty === "IMP") {
                partyId = assessmentData.importerId;
            }
            else if (assessmentData.billingParty === "FWR") {
                partyId = assessmentData.onAccountOf;
            }

            else if (assessmentData.billingParty === "OTH") {
                partyId = assessmentData.othPartyId;
            }
            axios.get(`${ipaddress}assessment/getDataByAfterAssessmentForBond?cid=${companyid}&bid=${branchId}&id=${assessmentData.assesmentId}&partyId=${partyId}&creditType=${assessmentData.creditType}&type=${selectedInvoice}`, {
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



                    console.log('assessmentData ', response.data);

                    const singleData = data[0];

                    if (selectedInvoice === "noc") {
                        setContainerData(data.map((item) => ({
                            assesmentId: item[0] || '',
                            assesmentLineNo: item[1] || '',
                            containerNo: item[61] || '',
                            containerSize: item[62] || '',
                            containerType: item[63] || '',
                            gateInDate: item[64] === null ? null : new Date(item[64]),
                            destuffDate: null,
                            gateoutDate: item[65] === null ? null : new Date(item[65]),
                            examPercentage: item[58] || '',
                            typeOfContainer: '',
                            scannerType: '',
                            gateOutType: item[66] || '',
                            checkDate: 'N',
                            invoiceDate: item[67] === null ? null : new Date(item[67]),
                            lastInvoiceUptoDate: item[78] === null ? null : new Date(item[78]),
                            upTariffNo: "",
                            profitcentreId: "",
                            grossWt: item[60] || '',
                            cargoWt: item[59] || '',
                            ssrTransId: "",
                            serviceId: item[68] || '',
                            serviceName: item[69] || '',
                            rates: item[70] || '0.00',
                            containerStatus: "",
                            gatePassNo: "",
                            gateOutId: "",
                            area: ""
                        })))

                        if (singleData[51] === "Y") {
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


                        if (singleData[51] === "P") {
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

                        setCheckInvDate1('N')
                        setCheckInvDate('N');
                        setInvDate(null);
                        setTdsDeductee(singleData[49]);
                    }
                    else {
                        setContainerData(data.map((item) => ({
                            assesmentId: item[0] || '',
                            assesmentLineNo: item[1] || '',
                            containerNo: item[61] || '',
                            containerSize: item[62] || '',
                            containerType: item[63] || '',
                            gateInDate: item[65] === null ? null : new Date(item[65]),
                            destuffDate: null,
                            gateoutDate: null,
                            examPercentage: item[58] || '',
                            typeOfContainer: '',
                            scannerType: '',
                            gateOutType: item[66] || '',
                            checkDate: 'N',
                            invoiceDate: item[67] === null ? null : new Date(item[67]),
                            lastInvoiceUptoDate: item[64] === null ? null : new Date(item[64]),
                            upTariffNo: "",
                            profitcentreId: "",
                            grossWt: item[60] || '',
                            cargoWt: item[59] || '',
                            ssrTransId: "",
                            serviceId: item[68] || '',
                            serviceName: item[69] || '',
                            rates: item[70] || '0.00',
                            containerStatus: "",
                            gatePassNo: "",
                            gateOutId: "",
                            area: ""
                        })))

                        setCheckInvDate1('N')
                        setCheckInvDate('N');
                        setInvDate(null);
                        setTdsDeductee(singleData[49]);

                        if (singleData[51] === "Y") {
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


                        if (singleData[51] === "P") {
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
                    }




                })
                .catch((error) => {

                })

        } catch {
            console.log('error in getAllContainerDetailsOfAssesmentId...');
        }
    };

    const handleServiceChangeContainer = (selectedOption) => {
        setSelectedService(selectedOption ? { value: selectedOption.value, label: selectedOption.label } : null);

        setCfinvsrvanx(prevState => {
            return {
                ...prevState,
                serviceId: selectedOption ? selectedOption.value : '',
                serviceName: selectedOption ? selectedOption.label : '',
                executionUnit: selectedOption ? selectedOption.executionUnit : '',
                executionUnit1: selectedOption ? selectedOption.executionUnit1 : '',
                actualNoOfPackages: selectedOption ? selectedOption.actualNoOfPackages : '',
                serviceUnit: selectedOption ? selectedOption.serviceUnit : '',
                serviceUnit1: selectedOption ? selectedOption.serviceUnit1 : '',
                rate: selectedOption ? selectedOption.rate : 0,
                currencyId: selectedOption ? selectedOption.currencyId : '',
                woNo: selectedOption ? selectedOption.woNo : '',
                woAmndNo: selectedOption ? selectedOption.woAmndNo : '',
                lineNo: selectedOption ? selectedOption.lineNo : '0',
                rangeType: selectedOption ? selectedOption.rangeType : '',
                taxId: selectedOption ? selectedOption.taxId : '',
                taxPerc: selectedOption ? selectedOption.taxPerc : 0,
                acCode: selectedOption ? selectedOption.acCode : '',
                executionUnit: 0,
                executionUnit1: 0,
                actualNoOfPackages: 0
            };
        });

        setSelectedContainers(prevContainers => {
            return prevContainers.map(container => {
                // Update the container object with selectedOption values
                return {
                    ...container,
                    serviceId: selectedOption ? selectedOption.value : '',
                    serviceName: selectedOption ? selectedOption.label : '',
                    executionUnit: selectedOption ? selectedOption.executionUnit : '',
                    executionUnit1: selectedOption ? selectedOption.executionUnit1 : '',
                    actualNoOfPackages: selectedOption ? selectedOption.actualNoOfPackages : '',
                    serviceUnit: selectedOption ? selectedOption.serviceUnit : '',
                    serviceUnit1: selectedOption ? selectedOption.serviceUnit1 : '',
                    rate: selectedOption ? selectedOption.rate : 0,
                    currencyId: selectedOption ? selectedOption.currencyId : '',
                    woNo: selectedOption ? selectedOption.woNo : '',
                    woAmndNo: selectedOption ? selectedOption.woAmndNo : '',
                    lineNo: selectedOption ? selectedOption.lineNo : '0',
                    rangeType: selectedOption ? selectedOption.rangeType : '',
                    taxId: selectedOption ? selectedOption.taxId : '',
                    taxPerc: selectedOption ? selectedOption.taxPerc : 0,
                    acCode: selectedOption ? selectedOption.acCode : '',
                };
            });
        });


        setContainerDataServiceWise(prevContainers => {
            return prevContainers.map(container => {
                // Update the container object with selectedOption values
                return {
                    ...container,
                    serviceId: selectedOption ? selectedOption.value : '',
                    serviceName: selectedOption ? selectedOption.label : '',
                    executionUnit: selectedOption ? selectedOption.executionUnit : '',
                    executionUnit1: selectedOption ? selectedOption.executionUnit1 : '',
                    actualNoOfPackages: selectedOption ? selectedOption.actualNoOfPackages : '',
                    serviceUnit: selectedOption ? selectedOption.serviceUnit : '',
                    serviceUnit1: selectedOption ? selectedOption.serviceUnit1 : '',
                    rate: selectedOption ? selectedOption.rate : 0,
                    currencyId: selectedOption ? selectedOption.currencyId : '',
                    woNo: selectedOption ? selectedOption.woNo : '',
                    woAmndNo: selectedOption ? selectedOption.woAmndNo : '',
                    lineNo: selectedOption ? selectedOption.lineNo : '0',
                    rangeType: selectedOption ? selectedOption.rangeType : '',
                    taxId: selectedOption ? selectedOption.taxId : '',
                    taxPerc: selectedOption ? selectedOption.taxPerc : 0,
                    acCode: selectedOption ? selectedOption.acCode : '',
                };
            });
        });

    };


    const validateServiceDataContainer = (filteredData) => {
        const { serviceId, executionUnit, executionUnit1, rate, actualNoOfPackages, serviceUnit1 } = filteredData;
        let error = {};

        // Convert values to numbers if necessary
        const executionUnitNum = Number(executionUnit);
        const executionUnit1Num = Number(executionUnit1);
        const rateNum = Number(rate);
        const actualNoOfPackagesNum = Number(actualNoOfPackages);

        // Required field validations
        if (!executionUnitNum || executionUnitNum <= 0) {
            error.executionUnit = 'Execution Unit is required';
        }

        if (serviceUnit1 && serviceUnit1.trim() !== 'NA' && serviceUnit1.trim() !== '') {
            if (!executionUnit1Num || executionUnit1Num <= 0) {
                error.executionUnit1 = 'Execution Unit1 is required';
            }
        }

        if (!rateNum || rateNum <= 0) {
            error.rate = 'Rate is required';
        }

        if (!actualNoOfPackagesNum || actualNoOfPackagesNum <= 0) {
            error.actualNoOfPackages = 'Actual No. of Packages is required';
        }

        if (!serviceId) {
            error.serviceId = 'Service ID is required';
        }

        setValidationContainerErrors(error);

        // Return true if no errors exist
        return Object.keys(error).length === 0;
    };








    const saveAddServiceContainerWise = async (selectedContainers) => {

        setLoading(true);

        // if (!selectedContainers || selectedContainers.length === 0) {
        //     toast.warning("Please select containers", {
        //         autoClose: 1000,
        //     });
        //     setLoading(false);
        //     return;
        // }

        if (!validateServiceDataContainer(Cfinvsrvanx)) {
            toast.warning("Plase check the values entered...", {
                autoClose: 1000,
            });
            setLoading(false);
            return false;
        }


        try {
            const response = await FinanceService.addServiceExportInvoiceServiceWiseGen(companyid, branchId, userId, assessmentData, Cfinvsrvanx, jwtToken, selectedInvoice);

            handleReset();
            toast.success('Services added successfully!', {
                autoClose: 1000,
            });
        } catch {
            toast.error('Oops something went wrong!', {
                autoClose: 1000,
            });
        }
        finally {
            setLoading(false);
        }
    }
    const handleReset = () => {
        setCfinvsrvanx(initialCfinvsrvanx);
        setSelectedContainers([]);
        setSelectedContainersAll(false);
        setSelectedService(null);


        setContainerDataServiceWise(prevContainers => {
            return prevContainers.map(container => {
                return {
                    ...container,
                    serviceId: '',
                    serviceName: '',
                    executionUnit: '',
                    executionUnit1: '',
                    actualNoOfPackages: '',
                    serviceUnit: '',
                    serviceUnit1: '',
                    rate: 0,
                    currencyId: '',
                    woNo: '',
                    woAmndNo: '',
                    lineNo: '0',
                    rangeType: '',
                    taxId: '',
                    taxPerc: 0,
                    acCode: '',
                };
            });
        });



    }


    const handleFieldChangeContainer = async (e, fieldName, type) => {
        let { value } = e.target;

        if (type === 'number') {
            value = value.replace(/[^0-9]/g, '');
        }

        setCfinvsrvanx(prevState => {
            const updatedService = {
                ...prevState,
                [fieldName]: value,
            };

            if (
                ['rate', 'executionUnit', 'executionUnit1'].includes(fieldName)
            ) {
                updatedService.actualNoOfPackages = (
                    parseFloat(updatedService.rate || 0) *
                    parseFloat(updatedService.executionUnit || 0) *
                    parseFloat(
                        updatedService.executionUnit1 && updatedService.serviceUnit1 !== 'NA' && updatedService.serviceUnit1.trim() !== ''
                            ? updatedService.executionUnit1
                            : 1
                    )
                ).toFixed(2);
            }

            return updatedService;
        });

        // Update the selectedContainers array
        setSelectedContainers(prevContainers => {
            return prevContainers.map(container => {
                const updatedContainer = {
                    ...container,
                    [fieldName]: value, // Update the specific field
                };

                // If the field is rate, executionUnit, or executionUnit1, calculate actualNoOfPackages
                if (['rate', 'executionUnit', 'executionUnit1'].includes(fieldName)) {
                    updatedContainer.actualNoOfPackages = (
                        parseFloat(updatedContainer.rate || 0) *
                        parseFloat(updatedContainer.executionUnit || 0) *
                        parseFloat(
                            updatedContainer.executionUnit1 && updatedContainer.serviceUnit1 !== 'NA' && updatedContainer.serviceUnit1.trim() !== ''
                                ? updatedContainer.executionUnit1
                                : 1
                        )
                    ).toFixed(2);
                }

                return updatedContainer;
            });
        });


        setContainerDataServiceWise(prevContainers => {
            return prevContainers.map(container => {
                const updatedContainer = {
                    ...container,
                    [fieldName]: value, // Update the specific field
                };

                // If the field is rate, executionUnit, or executionUnit1, calculate actualNoOfPackages
                if (['rate', 'executionUnit', 'executionUnit1'].includes(fieldName)) {
                    updatedContainer.actualNoOfPackages = (
                        parseFloat(updatedContainer.rate || 0) *
                        parseFloat(updatedContainer.executionUnit || 0) *
                        parseFloat(
                            updatedContainer.executionUnit1 && updatedContainer.serviceUnit1 !== 'NA' && updatedContainer.serviceUnit1.trim() !== ''
                                ? updatedContainer.executionUnit1
                                : 1
                        )
                    ).toFixed(2);
                }

                return updatedContainer;
            });
        });


        setValidationContainerErrors(prevErrors => {
            const updatedErrors = { ...prevErrors };
            // Remove the error for the specific field
            delete updatedErrors[fieldName];
            return updatedErrors;
        });

    };



    function convertToCustomDateTime(value) {
        if (!value) {
            return;
        }

        const date = new Date(value);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    const [selectedContainersAll, setSelectedContainersAll] = useState(false);
    const [selectedContainers, setSelectedContainers] = useState([]);


    useEffect(() => {
        setSelectedContainersAll(selectedContainers.length === containerDataServiceWise.length);
    }, [selectedContainers, containerDataServiceWise]);

    const handleSelectAllToggleContainer = () => {
        if (selectedContainersAll) {
            setSelectedContainers([]);
        } else {
            setSelectedContainers(containerDataServiceWise);
        }
        setSelectedContainersAll(!selectedContainersAll);
    };

    const handleRowCheckboxChangeContainer = (index) => {
        const selectedItemPartyOrCHA = containerDataServiceWise[index];

        if (selectedItemPartyOrCHA) {
            const selectedIndex = selectedContainers.findIndex((item) => item.containerNo === selectedItemPartyOrCHA.containerNo);

            if (selectedIndex !== -1) {
                // Remove the item from the selected items
                const updatedSelectedItems = [...selectedContainers];
                updatedSelectedItems.splice(selectedIndex, 1);
                setSelectedContainers(updatedSelectedItems);
            } else {
                // Add the item to the selected items
                setSelectedContainers([...selectedContainers, selectedItemPartyOrCHA]);
            }
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



            <Modal Modal isOpen={isModalOpenForAddService} onClose={handleClosAddService} toggle={handleClosAddService} style={{ maxWidth: '1200px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>
                <ModalHeader toggle={handleClosAddService} style={{
                    backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
                    boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    borderRadius: '0',
                    backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }} >


                    <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', color: 'white' }} > <FontAwesomeIcon
                        icon={faSearch}
                        style={{
                            marginRight: '8px',
                            color: 'white',
                        }}
                    /> Add Service </h5>

                </ModalHeader>
                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Assesment Id
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="service"
                                    disabled
                                    name='processTransId'
                                    value={Cfinvsrvanx.processTransId}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Container No
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="service"
                                    disabled
                                    name='containerNo'
                                    value={Cfinvsrvanx.containerNo}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row className="text-center mt-1 mb-1">
                        <Col>
                            <button
                                className="btn btn-outline-success btn-margin newButton"
                                style={{ marginRight: 10, fontWeight: 'bold' }}
                                id="submitbtn2"
                                onClick={(e) => saveAddService(CfinvsrvanxData)}
                            >
                                <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                Save
                            </button>

                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10, fontWeight: 'bold' }}
                                id="submitbtn2"
                                onClick={addServiePlus}
                            >
                                <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
                                Add Row
                            </button>



                        </Col>
                    </Row>


                    <hr style={{ margin: 4 }} />
                    <div className="mt-2 table-responsive ">
                        <Table className="table table-bordered tableHeader">
                            <thead className='tableHeader'>
                                <tr className='text-center'>
                                    <th scope="col">Sr No</th>
                                    <th scope="col">Service</th>
                                    <th scope="col">Service Unit</th>
                                    <th scope="col">Execution Unit</th>
                                    <th scope="col">Service Unit1</th>
                                    <th scope="col">Execution Unit1</th>
                                    <th scope="col">From Range</th>
                                    <th scope="col">To Range</th>
                                    <th scope="col">Rate</th>
                                    <th scope="col">Actual</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItemsAddService.map((item, index) => (
                                    <>
                                        <tr key={index} className='text-center'>
                                            <td>{((currentPagAddService - 1) * itemsPerPage) + index + 1}</td>
                                            <td>
                                                <FormGroup>
                                                    {item.alreadySaved !== 'Y' ? (
                                                        <Select
                                                            options={services}
                                                            value={selectedServices.find((service) => service.srlNo === item.srlNo)?.selectedOption || null}
                                                            onChange={(selectedOption) => handleServiceChange(selectedOption, item.srlNo)}
                                                            onInputChange={(inputValue, { action }) => {
                                                                if (action === 'input-change') {
                                                                    searchServices(inputValue, item.containerSize, item.containerType);
                                                                }
                                                            }}
                                                            components={{ Option: CustomOptionService }}
                                                            className={`inputwidthTukaMax ${validationErrors[item.srlNo]?.serviceId ? 'error-border' : ''}`}
                                                            placeholder="Select Service"
                                                            isDisabled={assessmentData.invoiceNo || (!assessmentData.invoiceNo && item.addServices !== 'Y')}
                                                            id={assessmentData.invoiceNo || (!assessmentData.invoiceNo && item.addServices !== 'Y') ? 'service' : ''}
                                                            isClearable
                                                            styles={{
                                                                control: (provided, state) => ({
                                                                    ...provided,
                                                                    height: 32,
                                                                    minHeight: 32,
                                                                    border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                                                                }),

                                                                valueContainer: (provided) => ({
                                                                    ...provided,
                                                                    alignItems: 'center',
                                                                    padding: '0 8px',
                                                                    height: '100%',
                                                                    whiteSpace: 'nowrap',
                                                                    textOverflow: 'ellipsis',
                                                                    lineHeight: '28px',
                                                                    maxWidth: 'calc(100% - 20px)',
                                                                    position: 'relative',
                                                                    overflow: 'visible',
                                                                }),

                                                                input: (provided) => ({
                                                                    ...provided,
                                                                    width: '100%',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    whiteSpace: 'nowrap',
                                                                    outline: 'none', // Avoid outline clashes
                                                                }),

                                                                singleValue: (provided) => ({
                                                                    ...provided,
                                                                    lineHeight: '32px',
                                                                    overflow: 'hidden',
                                                                    whiteSpace: 'nowrap',
                                                                    textOverflow: 'ellipsis',
                                                                }),

                                                                clearIndicator: (provided) => ({
                                                                    ...provided,
                                                                    padding: 2,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    position: 'absolute',
                                                                    right: 5,
                                                                    top: '50%',
                                                                    transform: 'translateY(-50%)', // Vertically center the clear indicator
                                                                }),

                                                                indicatorSeparator: () => ({
                                                                    display: 'none', // Remove the separator between indicators
                                                                }),

                                                                dropdownIndicator: () => ({
                                                                    display: 'none', // Remove the dropdown arrow
                                                                }),

                                                                placeholder: (provided) => ({
                                                                    ...provided,
                                                                    lineHeight: '32px',
                                                                    color: 'gray',
                                                                }),
                                                            }}
                                                        />

                                                    ) : (
                                                        // Render Input field for all other rows or if status exists
                                                        <Input
                                                            type="text"
                                                            value={item.serviceName}
                                                            className={`inputwidthTukaMax form-control`}
                                                            disabled
                                                            id="service"
                                                        />
                                                    )}


                                                </FormGroup>
                                            </td>
                                            <td>
                                                <FormGroup>
                                                    <input
                                                        className={`form-control inputwidthTukaMin`}
                                                        type="text"
                                                        maxLength={10}
                                                        value={item.serviceUnit}
                                                        disabled
                                                        id='service'
                                                    />
                                                </FormGroup>
                                            </td>
                                            <td>
                                                <FormGroup>
                                                    <input
                                                        className={`form-control inputwidthTukaMin ${validationErrors[item.srlNo]?.executionUnit ? 'error-border' : ''}`}
                                                        type="text"
                                                        maxLength={4}
                                                        value={item.executionUnit}
                                                        disabled={assessmentData.invoiceNo || (!assessmentData.invoiceNo && item.addServices !== 'Y')}
                                                        id={assessmentData.invoiceNo || (!assessmentData.invoiceNo && item.addServices !== 'Y') ? 'service' : ''}
                                                        onChange={(e) => handleFieldChangeService(e, 'executionUnit', 'number', item.srlNo)}
                                                    />
                                                </FormGroup>
                                            </td>
                                            <td>
                                                <FormGroup>
                                                    <input
                                                        className={`form-control inputwidthTukaMin`}
                                                        type="text"
                                                        maxLength={10}
                                                        value={item.serviceUnit1}
                                                        disabled
                                                        id='service'
                                                    />
                                                </FormGroup>
                                            </td>
                                            <td>
                                                <FormGroup>
                                                    <input
                                                        className={`form-control inputwidthTukaMin ${validationErrors[item.srlNo]?.executionUnit ? 'error-border' : ''}`}
                                                        type="text"
                                                        maxLength={4}
                                                        value={item.executionUnit1}
                                                        onChange={(e) => handleFieldChangeService(e, 'executionUnit1', 'number', item.srlNo)}
                                                        disabled={assessmentData.invoiceNo || (!assessmentData.invoiceNo && item.addServices !== 'Y') || (item.serviceUnit1 === '' || !item.serviceUnit1 || item.serviceUnit1 === 'NA')}
                                                        id={assessmentData.invoiceNo || (!assessmentData.invoiceNo && item.addServices !== 'Y') ? 'service' : ''}
                                                    />
                                                </FormGroup>
                                            </td>

                                            <td>
                                                <FormGroup>
                                                    <input
                                                        className={`form-control inputwidthTukaMin`}
                                                        type="text"
                                                        maxLength={10}
                                                        value={item.rangeFrom}
                                                        disabled
                                                        id='service'
                                                    />
                                                </FormGroup>
                                            </td>
                                            <td>
                                                <FormGroup>
                                                    <input
                                                        className={`form-control inputwidthTukaMin`}
                                                        type="text"
                                                        maxLength={10}
                                                        value={item.rangeTo}
                                                        disabled
                                                        id='service'
                                                    />
                                                </FormGroup>
                                            </td>

                                            <td>
                                                <FormGroup>
                                                    <input
                                                        className={`form-control inputwidthTuka ${validationErrors[item.srlNo]?.rate ? 'error-border' : ''}`}
                                                        type="text"
                                                        maxLength={10}
                                                        value={item.rate}
                                                        onChange={(e) => handleFieldChangeService(e, 'rate', 'number', item.srlNo)}
                                                        disabled={assessmentData.invoiceNo || (!assessmentData.invoiceNo && item.addServices !== 'Y')}
                                                        id={assessmentData.invoiceNo || (!assessmentData.invoiceNo && item.addServices !== 'Y') ? 'service' : ''}
                                                    />
                                                </FormGroup>
                                            </td>
                                            <td>
                                                <FormGroup>
                                                    <input
                                                        className={`form-control inputwidthTuka`}
                                                        type="text"
                                                        maxLength={10}
                                                        value={item.actualNoOfPackages}
                                                        disabled
                                                        id='service'
                                                    />
                                                </FormGroup>

                                            </td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </Table>


                        <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                            <Pagination.First onClick={() => handlePageChangeAddService(1)} />
                            <Pagination.Prev
                                onClick={() => handlePageChangeAddService(currentPagAddService - 1)}
                                disabled={currentPagAddService === 1}
                            />
                            <Pagination.Ellipsis />

                            {displayPagesAddService().map((pageNumber) => (
                                <Pagination.Item
                                    key={pageNumber}
                                    active={pageNumber === currentPagAddService}
                                    onClick={() => handlePageChangeAddService(pageNumber)}
                                >
                                    {pageNumber}
                                </Pagination.Item>
                            ))}

                            <Pagination.Ellipsis />
                            <Pagination.Next
                                onClick={() => handlePageChangeAddService(currentPagAddService + 1)}
                                disabled={currentPagAddService === totalPagesAddService}
                            />
                            <Pagination.Last onClick={() => handlePageChangeAddService(totalPagesAddService)} />
                        </Pagination>


                    </div>
                </ModalBody>
            </Modal>






            {/* Add Service ContainerWise*/}

            <Modal Modal isOpen={isModalOpenForAddServiceServiceWise} onClose={handleClosAddServiceServiceWise} toggle={handleClosAddServiceServiceWise} style={{ maxWidth: '1200px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>
                <ModalHeader toggle={handleClosAddServiceServiceWise} style={{
                    backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
                    boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    borderRadius: '0',
                    backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }} >


                    <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', color: 'white' }} > <FontAwesomeIcon
                        icon={faSearch}
                        style={{
                            marginRight: '8px',
                            color: 'white',
                        }}
                    /> Add Service </h5>

                </ModalHeader>
                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Select Service
                                </label>

                                <Select
                                    options={services}
                                    value={selectedService}
                                    onChange={handleServiceChangeContainer}
                                    onInputChange={(inputValue, { action }) => {
                                        if (action === 'input-change') {
                                            searchServices(inputValue, "ALL", "ALL");
                                        }
                                    }}
                                    components={{ Option: CustomOptionService }}
                                    className={`${validationContainer?.serviceId ? 'error-border' : ''}`}
                                    placeholder="Select Service"
                                    isClearable
                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            height: 32,
                                            minHeight: 32,
                                            border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                                        }),

                                        valueContainer: (provided) => ({
                                            ...provided,
                                            alignItems: 'center',
                                            padding: '0 8px',
                                            height: '100%',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            lineHeight: '28px',
                                            maxWidth: 'calc(100% - 20px)',
                                            position: 'relative',
                                            overflow: 'visible',
                                        }),

                                        input: (provided) => ({
                                            ...provided,
                                            width: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            outline: 'none', // Avoid outline clashes
                                        }),

                                        singleValue: (provided) => ({
                                            ...provided,
                                            lineHeight: '32px',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                        }),

                                        clearIndicator: (provided) => ({
                                            ...provided,
                                            padding: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'absolute',
                                            right: 5,
                                            top: '50%',
                                            transform: 'translateY(-50%)', // Vertically center the clear indicator
                                        }),

                                        indicatorSeparator: () => ({
                                            display: 'none', // Remove the separator between indicators
                                        }),

                                        dropdownIndicator: () => ({
                                            display: 'none', // Remove the dropdown arrow
                                        }),

                                        placeholder: (provided) => ({
                                            ...provided,
                                            lineHeight: '32px',
                                            color: 'gray',
                                        }),
                                    }}
                                />
                            </FormGroup>
                        </Col>

                        <Col md={9}>
                            <Row>




                                <Col md={2}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Service Unit
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="service"
                                            disabled
                                            name='containerNo'
                                            value={Cfinvsrvanx.serviceUnit}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Execution Unit
                                        </label>
                                        <input
                                            className={`form-control ${validationContainer?.executionUnit ? 'error-border' : ''}`}
                                            type="text"
                                            name='executionUnit'
                                            maxLength={4}
                                            value={Cfinvsrvanx.executionUnit}
                                            onChange={(e) => handleFieldChangeContainer(e, 'executionUnit', 'number')}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md={2}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Service Unit1
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="service"
                                            disabled
                                            name='containerNo'
                                            value={Cfinvsrvanx.serviceUnit1}
                                        />
                                    </FormGroup>
                                </Col>


                                <Col md={2}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Execution Unit1
                                        </label>
                                        <input
                                            className={`form-control ${validationContainer?.executionUnit1 ? 'error-border' : ''}`}
                                            disabled
                                            type="text"
                                            maxLength={4}
                                            name='executionUnit1'
                                            value={Cfinvsrvanx.executionUnit1}
                                            onChange={(e) => handleFieldChangeContainer(e, 'executionUnit1', 'number')}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md={2}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Rate
                                        </label>
                                        <input
                                            className={`form-control ${validationContainer?.rate ? 'error-border' : ''}`}
                                            type="text"
                                            name='rate'
                                            value={Cfinvsrvanx.rate}
                                            maxLength={7}
                                            onChange={(e) => handleFieldChangeContainer(e, 'rate', 'number')}
                                        />
                                    </FormGroup>
                                </Col>


                                <Col md={2}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Actual Amount
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="service"
                                            disabled
                                            name='actualNoOfPackages'
                                            value={Cfinvsrvanx.actualNoOfPackages}
                                        />
                                    </FormGroup>
                                </Col>

                            </Row>
                        </Col>






                    </Row>

                    <Row className="text-center mt-1 mb-1">
                        <Col>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10, fontWeight: 'bold' }}
                                id="submitbtn2"
                                onClick={(e) => saveAddServiceContainerWise(selectedContainers)}
                            >
                                <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                Save
                            </button>

                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ marginRight: 10, fontWeight: 'bold' }}
                                id="submitbtn2"
                                onClick={handleReset}
                            >
                                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                Clear
                            </button>



                        </Col>
                    </Row>


                    <hr style={{ margin: 4, }} />
                    <div className="mt-2 table-responsive ">
                        <Table className="table table-bordered tableHeader">
                            <thead className='tableHeader'>
                                <tr className='text-center'>

                                    <th scope="col">Sr No</th>
                                    <th scope="col">Commodity</th>
                                    <th scope="col">NOP</th>
                                    <th scope="col">Area</th>
                                </tr>
                            </thead>
                            <tbody>
                                {containerDataServiceWise.map((item, index) => (
                                    <>
                                        <tr key={index} className='text-center'>

                                            <td>{index + 1}</td>
                                            <td>
                                                {assessmentData.commodityDescription}
                                            </td>
                                            <td>
                                                {item.examPercentage}
                                            </td>

                                            <td>
                                                {item.cargoWt}
                                            </td>






                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </Table>


                    </div>
                </ModalBody>
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
                                    Search by Invoice No / Assessment Id / Job trans Id / Job No / BOE No
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
                        <Col md={4} style={{ marginTop: 20 }}>
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
                                    <th scope="col">Assessment Id</th>
                                    <th scope="col">Assessment Date</th>
                                    <th scope="col">Job Trans Id</th>
                                    <th scope="col">Job No</th>
                                    <th scope="col">Job Date</th>
                                    <th scope="col">Importer Name</th>
                                    <th scope="col">BOE No</th>
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
                                            <input type="radio" onChange={() => getSelectedInvoiceData(item[1], item[0])} name="radioGroup" value={item[0]} />
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





            <div>
                <Row>
                    <Col md={4}>
                        <div className="container1">
                            <div className="radio-tile-group">
                                <div className="input-container" style={{ width: 150 }}>
                                    <input
                                        id="noc"
                                        className="radio-button"
                                        type="radio"
                                        name="radio"
                                        value="noc"
                                        checked={selectedInvoice === "noc"}
                                        onChange={() => handleSelectInvoice("noc")}
                                    />
                                    <div className="radio-tile">
                                        <div className="icon walk-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-truck" viewBox="0 0 16 16">
                                                <path d="M0 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3h2a1 1 0 0 1 .894.553l1.382 2.763A.5.5 0 0 1 16 7v4.5a.5.5 0 0 1-.5.5h-.541a2 2 0 0 1-3.918 0H4.959a2 2 0 0 1-3.918 0H1a1 1 0 0 1-1-1V1zm12 3V1H1v10h.041a2 2 0 0 1 3.918 0h6.082a2 2 0 0 1 3.918 0H15V7.118l-1.276-2.552A.5.5 0 0 0 13.5 4H12zm-1 6H3a1 1 0 0 1-1-1V5h9v5z" />
                                            </svg>


                                            <label htmlFor="noc" className="radio-tile-label">
                                                Receiving
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="input-container" style={{ width: 150 }}>
                                    <input
                                        id="exbond"
                                        className="radio-button"
                                        type="radio"
                                        name="radio"
                                        value="exbond"
                                        checked={selectedInvoice === "exbond"}
                                        onChange={() => handleSelectInvoice("exbond")}
                                    />
                                    <div className="radio-tile">
                                        <div className="icon bike-icon">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="48"
                                                height="48"
                                                fill="currentColor"
                                                className="bi bi-truck"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                                            </svg>
                                            <label htmlFor="exbond" className="radio-tile-label">
                                                Delivery
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>

                    {selectedInvoice === "noc" && (
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Search By BOE No
                                </label>
                                <Select
                                    value={{ value: searchval, label: searchval }}
                                    onChange={handleSearchChange}
                                    onInputChange={getSearchData}
                                    options={searchData}
                                    placeholder="Select Account Holder"
                                    isClearable
                                    menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                                    menuPosition="fixed" // Sets the dropdown menu position to fixed    
                                    id="searchval"
                                    name="searchval"
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
                    )}

                    {selectedInvoice === "exbond" && (
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Search BOE No / Delivery Id
                                </label>
                                <Select
                                    value={{ value: selectExBoeData, label: selectExBoeData }}
                                    onChange={handleExBondBoeSearchChange}
                                    onInputChange={getExBoeSearchData}
                                    options={exBoeData}
                                    placeholder="Select Account Holder"
                                    isClearable
                                    menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                                    menuPosition="fixed" // Sets the dropdown menu position to fixed    
                                    id="searchval"
                                    name="searchval"
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
                    )}


                </Row>

                <div>
                    <hr />
                    <Row>
                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Assesment Id
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
                                    Assesment Date
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
                                    Job Trans Id <span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="igmTransId"
                                    name='igmTransId'
                                    value={assessmentData.igmTransId}
                                    disabled
                                />

                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Profitcentre
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="profitcentreId"
                                    name='profitcentreId'
                                    value={assessmentData.profitcentreId}
                                    disabled
                                />

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
                                    Job NO <span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="igmNo"
                                    name='igmNo'
                                    value={assessmentData.igmNo}
                                    disabled
                                />

                            </FormGroup>
                        </Col>

                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Job Date
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <DatePicker
                                        selected={assessmentData.igmDate}
                                        disabled
                                        id='igmDate'
                                        name='igmDate'
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
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Asset Value <span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="insuranceValue"
                                    name='insuranceValue'
                                    onChange={(e) => handleAssessmentChange(e, 12, 3)}
                                    value={assessmentData.insuranceValue}
                                    disabled={assessmentData.assesmentId !== ''}
                                />

                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Duty <span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="dutyValue"
                                    name='dutyValue'
                                    value={assessmentData.dutyValue}
                                    onChange={(e) => handleAssessmentChange(e, 12, 3)}
                                    disabled={assessmentData.assesmentId !== ''}
                                />

                            </FormGroup>
                        </Col>
                        {/* <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Commodity
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="commodityDescription"
                                    name='commodityDescription'
                                    value={assessmentData.commodityDescription}
                                    disabled
                                />

                            </FormGroup>
                        </Col> */}
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
                                    Billing Party <span style={{ color: 'red' }}>*</span>
                                </label>
                                <Input
                                    className="form-control"
                                    type="select"
                                    id="billingParty"
                                    name='billingParty'
                                    value={assessmentData.billingParty}
                                    onChange={handleAssessmentChange}
                                    disabled={assessmentData.assesmentId !== ''}
                                >

                                    <option value="" selected=""></option>

                                    <option value="CHA">CHA-Billing</option>

                                    <option value="IMP">Importer-Billing</option>

                                    <option value="FWR">Forwarder-Billing</option>

                                    <option value="OTH">Other-Billing</option>
                                </Input>

                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Importer Name
                                </label>
                                <Select
                                    value={assessmentData.importerId ? { value: assessmentData.importerId, label: assessmentData.importerName } : null}
                                    onChange={handleImpChange}
                                    onInputChange={getImpData}
                                    options={impData}
                                    isDisabled={assessmentData.assesmentId !== ''}
                                    placeholder="Select Importer"
                                    isClearable
                                    menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                                    menuPosition="fixed" // Sets the dropdown menu position to fixed    
                                    id="importerId"
                                    name="importerId"
                                    className="autocompleteHeight"
                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            height: 32,  // Set the height of the select input
                                            minHeight: 32,
                                            border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc'
                                        }),

                                        valueContainer: (provided) => ({
                                            ...provided,
                                            // display: 'flex',
                                            alignItems: 'center',  // Vertically center the text
                                            padding: '0 8px',
                                            height: '100%',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            lineHeight: '28px',
                                            maxWidth: 'calc(100% - 20px)',
                                            position: 'relative',
                                            overflow: 'visible',
                                        }),

                                        input: (provided) => ({
                                            ...provided,
                                            width: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            outline: 'none', // Avoid outline clashes
                                        }),

                                        singleValue: (provided) => ({
                                            ...provided,
                                            lineHeight: '32px',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                        }),

                                        clearIndicator: (provided) => ({
                                            ...provided,
                                            padding: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'absolute',
                                            right: 5,
                                            top: '50%',
                                            transform: 'translateY(-50%)', // Vertically center the clear indicator
                                        }),

                                        indicatorSeparator: () => ({
                                            display: 'none', // Remove the separator between indicators
                                        }),

                                        dropdownIndicator: () => ({
                                            display: 'none', // Remove the dropdown arrow
                                        }),

                                        placeholder: (provided) => ({
                                            ...provided,
                                            lineHeight: '32px',
                                            color: 'gray',
                                        }),
                                    }}
                                />

                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Importer GSTIN
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
                                    Importer Add
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
                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    CHA
                                </label>
                                <Select
                                    value={assessmentData.cha ? { value: assessmentData.cha, label: assessmentData.chaName } : null}
                                    onChange={handleChaChange}
                                    onInputChange={getChaData}
                                    options={chaData}
                                    isDisabled={assessmentData.assesmentId !== ''}
                                    placeholder="Select CHA"
                                    isClearable
                                    menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                                    menuPosition="fixed" // Sets the dropdown menu position to fixed    
                                    id="cha"
                                    name="cha"
                                    className="autocompleteHeight"
                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            height: 32,  // Set the height of the select input
                                            minHeight: 32,
                                            border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc'
                                        }),

                                        valueContainer: (provided) => ({
                                            ...provided,
                                            // display: 'flex',
                                            alignItems: 'center',  // Vertically center the text
                                            padding: '0 8px',
                                            height: '100%',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            lineHeight: '28px',
                                            maxWidth: 'calc(100% - 20px)',
                                            position: 'relative',
                                            overflow: 'visible',
                                        }),

                                        input: (provided) => ({
                                            ...provided,
                                            width: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            outline: 'none', // Avoid outline clashes
                                        }),

                                        singleValue: (provided) => ({
                                            ...provided,
                                            lineHeight: '32px',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                        }),

                                        clearIndicator: (provided) => ({
                                            ...provided,
                                            padding: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'absolute',
                                            right: 5,
                                            top: '50%',
                                            transform: 'translateY(-50%)', // Vertically center the clear indicator
                                        }),

                                        indicatorSeparator: () => ({
                                            display: 'none', // Remove the separator between indicators
                                        }),

                                        dropdownIndicator: () => ({
                                            display: 'none', // Remove the dropdown arrow
                                        }),

                                        placeholder: (provided) => ({
                                            ...provided,
                                            lineHeight: '32px',
                                            color: 'gray',
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
                    </Row>
                    <Row>
                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Forwarder
                                </label>
                                <Select
                                    value={assessmentData.onAccountOf ? { value: assessmentData.onAccountOf, label: assessmentData.fwdName } : null}
                                    onChange={handleFwdChange}
                                    onInputChange={getFwdData}
                                    options={fwdData}
                                    placeholder="Select Forwarder"
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
                                            height: 32,  // Set the height of the select input
                                            minHeight: 32,
                                            border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc'
                                        }),

                                        valueContainer: (provided) => ({
                                            ...provided,
                                            // display: 'flex',
                                            alignItems: 'center',  // Vertically center the text
                                            padding: '0 8px',
                                            height: '100%',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            lineHeight: '28px',
                                            maxWidth: 'calc(100% - 20px)',
                                            position: 'relative',
                                            overflow: 'visible',
                                        }),

                                        input: (provided) => ({
                                            ...provided,
                                            width: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            outline: 'none', // Avoid outline clashes
                                        }),

                                        singleValue: (provided) => ({
                                            ...provided,
                                            lineHeight: '32px',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                        }),

                                        clearIndicator: (provided) => ({
                                            ...provided,
                                            padding: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'absolute',
                                            right: 5,
                                            top: '50%',
                                            transform: 'translateY(-50%)', // Vertically center the clear indicator
                                        }),

                                        indicatorSeparator: () => ({
                                            display: 'none', // Remove the separator between indicators
                                        }),

                                        dropdownIndicator: () => ({
                                            display: 'none', // Remove the dropdown arrow
                                        }),

                                        placeholder: (provided) => ({
                                            ...provided,
                                            lineHeight: '32px',
                                            color: 'gray',
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
                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Account Holder
                                </label>
                                <Select
                                    value={assessmentData.othPartyId ? { value: assessmentData.othPartyId, label: assessmentData.accHolderName } : null}
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
                                            height: 32,  // Set the height of the select input
                                            minHeight: 32,
                                            border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc'
                                        }),

                                        valueContainer: (provided) => ({
                                            ...provided,
                                            // display: 'flex',
                                            alignItems: 'center',  // Vertically center the text
                                            padding: '0 8px',
                                            height: '100%',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            lineHeight: '28px',
                                            maxWidth: 'calc(100% - 20px)',
                                            position: 'relative',
                                            overflow: 'visible',
                                        }),

                                        input: (provided) => ({
                                            ...provided,
                                            width: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            outline: 'none', // Avoid outline clashes
                                        }),

                                        singleValue: (provided) => ({
                                            ...provided,
                                            lineHeight: '32px',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                        }),

                                        clearIndicator: (provided) => ({
                                            ...provided,
                                            padding: 2,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'absolute',
                                            right: 5,
                                            top: '50%',
                                            transform: 'translateY(-50%)', // Vertically center the clear indicator
                                        }),

                                        indicatorSeparator: () => ({
                                            display: 'none', // Remove the separator between indicators
                                        }),

                                        dropdownIndicator: () => ({
                                            display: 'none', // Remove the dropdown arrow
                                        }),

                                        placeholder: (provided) => ({
                                            ...provided,
                                            lineHeight: '32px',
                                            color: 'gray',
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
                                        id='invoiceDate'
                                        name='invoiceDate'
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
                                    Invoice Category
                                </label>

                                <Input
                                    className="form-control"
                                    type="select"
                                    id="invoiceCategory"
                                    name='invoiceCategory'
                                    value={assessmentData.invoiceCategory}
                                    onChange={handleAssessmentChange}
                                    disabled={assessmentData.assesmentId !== ''}
                                >

                                    <option value="SINGLE">All(Single Bill)</option>

                                    <option value="STORAGE">Storage</option>

                                    <option value="HANDLING">Handling</option>

                                </Input>
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
                    </Row>
                    <Row>
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
                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Commodity
                                </label>
                                <Input
                                    className="form-control"
                                    type="textarea"
                                    id="commodityDescription"
                                    name='commodityDescription'
                                    value={assessmentData.commodityDescription}
                                    disabled
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
                                    Agri/Non Agri
                                </label>
                                <Input
                                    className="form-control"
                                    type="select"
                                    id="commodityCode"
                                    name='commodityCode'
                                    value={assessmentData.commodityCode}
                                    onChange={handleAssessmentChange}
                                    disabled={assessmentData.assesmentId !== ''}
                                >
                                    <option value="">Select Commodity</option>
                                    {commodityData.map((item, index) => (
                                        <option key={index} value={item[0]}>{item[1]}</option>
                                    ))}
                                </Input>

                            </FormGroup>
                        </Col>


                        {/* <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Is Ancillary Charges
                                </label>

                                <Input
                                    className="form-control"
                                    type="select"
                                    id="isAncillary"
                                    name='isAncillary'
                                    value={assessmentData.isAncillary}
                                    onChange={handleAssessmentChange}
                                    disabled={assessmentData.assesmentId !== ''}
                                >
                                    <option value="N">No</option>
                                    <option value="Y">Yes</option>
                                </Input>


                            </FormGroup>
                        </Col> */}



                    </Row>
                    <Row>
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
                        {/* {assessmentData.lastInvoiceNo !== "" && (
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Old Assessment Id
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="lastAssesmentId"
                                        name='lastAssesmentId'
                                        value={assessmentData.lastAssesmentId}
                                        disabled
                                    />

                                </FormGroup>
                            </Col>
                        )} */}
                        {/* {assessmentData.lastInvoiceNo !== "" && (
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Old Assessment Date
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <DatePicker
                                            selected={assessmentData.lastAssesmentDate}
                                            disabled
                                            id='lastAssesmentDate'
                                            name='lastAssesmentDate'
                                            dateFormat="dd/MM/yyyy"
                                            className="form-control border-right-0 InputField"
                                            customInput={<Input style={{ width: '100%' }} />}
                                            wrapperClassName="custom-react-datepicker-wrapper"
                                        />
                                        <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                    </div>

                                </FormGroup>
                            </Col>
                        )} */}
                        {/* 
                        {assessmentData.lastInvoiceNo !== "" && (
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Old Invoice Id
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="lastInvoiceNo"
                                        name='lastInvoiceNo'
                                        value={assessmentData.lastInvoiceNo}
                                        disabled
                                    />

                                </FormGroup>
                            </Col>
                        )} */}

                        {/* {assessmentData.lastInvoiceNo !== "" && (
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Old Invoice Date
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <DatePicker
                                            selected={assessmentData.lastInvoiceDate}
                                            disabled
                                            id='lastInvoiceDate'
                                            name='lastInvoiceDate'
                                            dateFormat="dd/MM/yyyy"
                                            className="form-control border-right-0 InputField"
                                            customInput={<Input style={{ width: '100%' }} />}
                                            wrapperClassName="custom-react-datepicker-wrapper"
                                        />
                                        <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                    </div>

                                </FormGroup>
                            </Col>
                        )} */}

                    </Row>
                    <Row className="justify-content-center">
                        <Col xs={12} className="d-flex flex-wrap justify-content-center gap-2">
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10, fontSize: 13 }}
                                id="submitbtn2"
                                onClick={selectedInvoice === "noc" ? handleSave : selectedInvoice === "exbond" ? handleSave1 : ""}
                                disabled={assessmentData.invoiceNo !== ''}
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
                                onClick={selectedInvoice === "noc" ? saveProcess : selectedInvoice === "exbond" ? saveProcess1 : ""}
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
                                className="btn btn-outline-success btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                disabled={assessmentData.invoiceNo || !assessmentData.assesmentId}
                                onClick={openModelForAddServiceServiceWise}
                            >
                                <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
                                Add Service
                            </button>

                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10, fontSize: 13 }}
                                id="submitbtn2"
                                onClick={() => handlePrint1("PRINT")}
                                disabled={assessmentData.invoiceNo === ''}
                            >
                                <FontAwesomeIcon
                                    icon={faPrint}
                                    style={{ marginRight: "5px" }}
                                />
                                Print
                            </button>




                        </Col>
                    </Row>
                    <div id="datepicker-portal9"></div>


                    {selectedInvoice === "noc" && (
                        <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
                            <Table className="table table-bordered" style={{ border: '2px solid black' }}>
                                <thead>
                                    <tr>
                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                            Sr No
                                        </th>
                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                            NOP
                                        </th>
                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                            Area
                                        </th>
                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                            Gross Wt (in MT)
                                        </th>
                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                            20FT
                                        </th>
                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                            40FT
                                        </th>
                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                            Job Date
                                        </th>

                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                            Job Weeks
                                        </th>
                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                            Last Invoice UpTo Date
                                        </th>
                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                            Validity Date
                                        </th>


                                        {assessmentData.assesmentId !== '' && (
                                            <>
                                                <th scope="col" className="text-center" style={{ color: "black", minWidth: 300 }}>
                                                    Service Name
                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black", minWidth: 150 }}>
                                                    Amount
                                                </th>
                                            </>
                                        )}
                                    </tr>

                                </thead>
                                <tbody className='text-center'>
                                    {containerData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.examPercentage}</td>
                                            <td>{item.cargoWt}</td>
                                            <td style={{ width: 130 }}>
                                                {item.grossWt}
                                            </td>
                                            {/* <td style={{ width: 130 }}>
                                                {item.containerNo}
                                            </td> */}
                                            <td>
                                                {item.containerSize}
                                            </td>
                                            <td> {item.containerType}</td>
                                            <td style={{ width: 150 }}>
                                                <div style={{ position: 'relative', width: 150 }}>
                                                    <DatePicker
                                                        selected={item.gateInDate}
                                                        id='gateInDate'
                                                        name='gateInDate'
                                                        dateFormat="dd/MM/yyyy"
                                                        showTimeInput
                                                        disabled
                                                        className="form-control border-right-0 InputField"
                                                        customInput={<Input style={{ width: '100%' }} />}
                                                        wrapperClassName="custom-react-datepicker-wrapper"
                                                    />
                                                    <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                                </div>
                                            </td>
                                            {/* <td style={{ width: 150 }}>
                                                <div style={{ position: 'relative', width: 150 }}>
                                                    <DatePicker
                                                        selected={item.gateoutDate}
                                                        id='gateoutDate'
                                                        name='gateoutDate'
                                                        dateFormat="dd/MM/yyyy"
                                                        showTimeInput
                                                        disabled
                                                        className="form-control border-right-0 InputField"
                                                        customInput={<Input style={{ width: '100%' }} />}
                                                        wrapperClassName="custom-react-datepicker-wrapper"
                                                    />
                                                    <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                                </div>
                                            </td> */}
                                            <td style={{ width: 130 }}>{item.gateOutType}</td>
                                            <td>
                                                <div style={{ position: 'relative', width: 150 }}>
                                                    <DatePicker
                                                        selected={assessmentData.lastInvoiceNo !== "" ? item.lastInvoiceUptoDate : null}
                                                        id='lastInvoiceUptoDate'
                                                        name='lastInvoiceUptoDate'
                                                        dateFormat="dd/MM/yyyy HH:mm"
                                                        showTimeInput
                                                        disabled
                                                        className="form-control border-right-0 InputField"
                                                        customInput={<Input style={{ width: '100%' }} />}
                                                        wrapperClassName="custom-react-datepicker-wrapper"
                                                    />
                                                    <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                                </div>
                                            </td>
                                            <td style={{ width: 180 }}>
                                                <div style={{ position: 'relative', width: 150 }}>
                                                    <DatePicker
                                                        selected={item.invoiceDate}
                                                        id='invoiceDate'
                                                        name='invoiceDate'
                                                        onChange={(date) => handleSelectInvDate(date, index)}
                                                        dateFormat="dd/MM/yyyy HH:mm"
                                                        portalId="datepicker-portal9" // Add this line

                                                        minDate={(() => {
                                                            const date = new Date(item.lastInvoiceUptoDate === null ? item.gateInDate : item.lastInvoiceUptoDate);
                                                            date.setDate(date.getDate() + 1);
                                                            return date;
                                                        })()}
                                                        showTimeInput
                                                        disabled={assessmentData.assesmentId !== ''}
                                                        className="form-control border-right-0 InputField"
                                                        customInput={<Input style={{ width: '100%' }} />}
                                                        wrapperClassName="custom-react-datepicker-wrapper"
                                                        popperPlacement="left"

                                                    />
                                                    <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                                </div>
                                            </td>

                                            {assessmentData.assesmentId !== '' && (
                                                <>
                                                    <td>{item.serviceName}</td>
                                                    <td>{item.rates}</td>
                                                </>
                                            )}
                                        </tr>
                                    ))}

                                </tbody>
                            </Table>
                        </div>
                    )}

                    {selectedInvoice === "exbond" && (
                        <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
                            <Table className="table table-bordered" style={{ border: '2px solid black' }}>
                                <thead>
                                    <tr>
                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                            Sr No
                                        </th>
                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                            NOP
                                        </th>
                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                            Area
                                        </th>
                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                            Gross Wt (in MT)
                                        </th>

                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                            20FT
                                        </th>
                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                            40FT
                                        </th>
                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                            Last Invoice Up to Date
                                        </th>
                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                            Invoice Start Date
                                        </th>

                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                            Invoice Weeks
                                        </th>
                                        {/* <th scope="col" className="text-center" style={{ color: "black" }}>
                                            Last Invoice UpTo Date
                                        </th> */}
                                        <th scope="col" className="text-center" style={{ color: "black" }}>
                                            Validity Date
                                        </th>


                                        {assessmentData.assesmentId !== '' && (
                                            <>
                                                <th scope="col" className="text-center" style={{ color: "black", minWidth: 300 }}>
                                                    Service Name
                                                </th>
                                                <th scope="col" className="text-center" style={{ color: "black", minWidth: 150 }}>
                                                    Amount
                                                </th>
                                            </>
                                        )}
                                    </tr>

                                </thead>
                                <tbody className='text-center'>
                                    {containerData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.examPercentage}</td>
                                            <td>{item.cargoWt}</td>
                                            <td style={{ width: 130 }}>
                                                {item.grossWt}
                                            </td>

                                            <td>
                                                {item.containerSize}
                                            </td>
                                            <td> {item.containerType}</td>
                                            <td style={{ width: 150 }}>
                                                <div style={{ position: 'relative', width: 150 }}>
                                                    <DatePicker
                                                        selected={item.lastInvoiceUptoDate}
                                                        id='lastInvoiceUptoDate'
                                                        name='lastInvoiceUptoDate'
                                                        dateFormat="dd/MM/yyyy HH:mm"
                                                        showTimeInput
                                                        disabled
                                                        className="form-control border-right-0 InputField"
                                                        customInput={<Input style={{ width: '100%' }} />}
                                                        wrapperClassName="custom-react-datepicker-wrapper"
                                                    />
                                                    <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                                </div>
                                            </td>
                                            <td style={{ width: 150 }}>
                                                <div style={{ position: 'relative', width: 150 }}>
                                                    <DatePicker
                                                        selected={item.gateInDate}
                                                        id='gateInDate'
                                                        name='gateInDate'
                                                        dateFormat="dd/MM/yyyy HH:mm"
                                                        showTimeInput
                                                        disabled
                                                        className="form-control border-right-0 InputField"
                                                        customInput={<Input style={{ width: '100%' }} />}
                                                        wrapperClassName="custom-react-datepicker-wrapper"
                                                    />
                                                    <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                                </div>
                                            </td>
                                            <td style={{ width: 130 }}>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    id={`gateOutType${index}`} // Corrected use of backticks for template literals
                                                    name="gateOutType"
                                                    value={item.gateOutType}
                                                    onChange={(e) => handleInvoiceWeeks(e, index)}

                                                />

                                            </td>
                                            {/* <td>
                                                <div style={{ position: 'relative', width: 150 }}>
                                                    <DatePicker
                                                        selected={assessmentData.lastInvoiceNo !== "" ? item.lastInvoiceUptoDate : null}
                                                        id='lastInvoiceUptoDate'
                                                        name='lastInvoiceUptoDate'
                                                        dateFormat="dd/MM/yyyy HH:mm"
                                                        showTimeInput
                                                        disabled
                                                        className="form-control border-right-0 InputField"
                                                        customInput={<Input style={{ width: '100%' }} />}
                                                        wrapperClassName="custom-react-datepicker-wrapper"
                                                    />
                                                    <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                                </div>
                                            </td> */}
                                            <td style={{ width: 180 }}>
                                                <div style={{ position: 'relative', width: 150 }}>
                                                    <DatePicker
                                                        selected={item.invoiceDate}
                                                        id='invoiceDate'
                                                        name='invoiceDate'
                                                        onChange={(date) => handleSelectInvDate1(date, index)}
                                                        dateFormat="dd/MM/yyyy HH:mm"
                                                        portalId="datepicker-portal9" // Add this line
                                                        minDate={(() => {
                                                            const date = new Date(item.gateInDate);
                                                            date.setDate(date.getDate() + 1);
                                                            return date;
                                                        })()}
                                                        showTimeInput
                                                        disabled={assessmentData.assesmentId !== ''}
                                                        className="form-control border-right-0 InputField"
                                                        customInput={<Input style={{ width: '100%' }} />}
                                                        wrapperClassName="custom-react-datepicker-wrapper"
                                                        popperPlacement="left"

                                                    />
                                                    <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                                </div>
                                            </td>

                                            {assessmentData.assesmentId !== '' && (
                                                <>
                                                    <td>{item.serviceName}</td>
                                                    <td>{item.rates}</td>
                                                </>
                                            )}
                                        </tr>
                                    ))}

                                </tbody>
                            </Table>
                        </div>
                    )}


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
                                {tanNo !== '' && (
                                    <Row>
                                        <span style={{ color: 'red' }}>The TDS will be deducted as per the applicable TDS percentage.</span>
                                    </Row>
                                )}
                                <Row className='text-center'>
                                    <Col>
                                        <button
                                            className="btn btn-outline-primary btn-margin newButton"
                                            style={{ marginRight: 10, fontSize: 13 }}
                                            id="submitbtn2"
                                            onClick={addPaymentMode}
                                            disabled={balanceAmt === '' || balanceAmt === 0 || assessmentData.invoiceNo !== ''}
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
                                                                    portalId="datepicker-portal9"
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
                                                                    portalId="datepicker-portal9"
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

            </div>

        </div >
    )
}


