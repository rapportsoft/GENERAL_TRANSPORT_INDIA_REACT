
import AuthContext from '../Components/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import ipaddress from "../Components/IpAddress";
import useAxios from '../Components/useAxios';
import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts';
import Select from 'react-select';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import {
    Card,
    CardBody,
    Container,
    Row,
    Col,
    Form,
    Modal,
    ModalBody,
    ModalHeader,
    FormGroup,
    Label,
    Input,
    Table,
} from "reactstrap";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faGroupArrowsRotate, faPlus, faClose, faAdd, faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import { error } from 'jquery';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';


export default function AddParty() {

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
    const navigate = useNavigate();
    const axios = useAxios();
    const { isAuthenticated } = useContext(AuthContext);

    // If the user is not authenticated, redirect to the login page
    useEffect(() => {
        if (!isAuthenticated) {

            navigate('/login?message=You need to be authenticated to access this page.');
        }
    }, [isAuthenticated, navigate]);

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

    const [flag, setFlag] = useState(location.state?.flag);
    const [pid, setPid] = useState(location.state?.partyId);
    const search = location.state?.search;
    const flag2 = location.state?.flag;

    const getPartyData = () => {
        const flag1 = location.state?.flag;
        const id = location.state?.partyId;

        if (flag1 === 'edit') {
            axios.get(`${ipaddress}party/getPartyData?cid=${companyid}&bid=${branchId}&partyId=${id}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            })
                .then((response) => {
                    setPartyData(response.data);
                    getAddreses(id);
                    getCountry(response.data.country, flag1);
                })
                .catch((error) => {

                })
        }
    }

    useEffect(() => {
        getPartyData();
    }, [])

    const [partyTypes, setPartyTypes] = useState([]);
    const [vendorTypes, setVendorTypes] = useState([]);
    const [country, setCountry] = useState([]);

    const getPartyTypes = () => {
        axios.get(`${ipaddress}jardetail/partyTypes?cid=${companyid}`, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setPartyTypes(response.data)
            })
            .catch((error) => {

            })
    }

    const getVendorTypes = () => {
        axios.get(`${ipaddress}jardetail/vendorTypes?cid=${companyid}`, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setVendorTypes(response.data)
            })
            .catch((error) => {

            })
    }

    const [countryId, setCountryId] = useState('IN');
    const [countryName, setCountryName] = useState('India');

    const getCountry = (id, flag1) => {
        axios.get(`${ipaddress}jardetail/getCountry?cid=${companyid}`, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const partyOptions = data.map(party => ({
                    value: party.jarDtlId,
                    label: party.jarDtlDesc
                }));
                setCountry(partyOptions)

                if (flag1 === 'edit') {
                    const pname = partyOptions.find(item => item.value === id);
                    setCountryId(id);
                    setCountryName(pname.label);
                }
            })
            .catch((error) => {

            })
    }

    const handleCountryChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setCountryName('India');
            setCountryId('IN');
        }
        else {
            setCountryName(selectedOption ? selectedOption.label : '');
            setCountryId(selectedOption ? selectedOption.value : '');
        }
    };

    const [branches, setBranches] = useState([]);
    const [branchid, setBranchid] = useState('');
    const [branchName, setBranchname] = useState('');

    const getBranch = () => {
        axios.get(`${ipaddress}jardetail/getBranch?cid=${companyid}`, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const partyOptions = data.map(party => ({
                    value: party.jarDtlId,
                    label: party.jarDtlDesc,
                    code: party.comments
                }));
                setBranches(partyOptions)
            })
            .catch((error) => {

            })
    }

    const handleBranchChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setBranchname('');
            setBranchid('');
        }
        else {
            setBranchname(selectedOption ? selectedOption.label : '');
            setBranchid(selectedOption ? selectedOption.value : '');
        }
    };

    const [defaultBranches, setDefaultBranches] = useState([]);

    const getDefaultBranches = () => {
        axios.get(`${ipaddress}party/getDefaultBranch?cid=${companyid}`, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setDefaultBranches(response.data);
            })
            .catch((error) => {

            })
    }

    const [termId, setTermId] = useState([]);

    const getTermId = () => {
        axios.get(`${ipaddress}jardetail/getTermId?cid=${companyid}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setTermId(response.data);
            })
            .catch((error) => {

            })
    }

    useEffect(() => {
        getPartyTypes();
        getVendorTypes();
        getCountry();
        getDefaultBranches();
        getTermId();
        getBranch();
    }, [])

    function isValidatePAN(panNumber) {
        // Define the regular expression for PAN validation
        var companyPanRegex = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]$/;

        // Check if the PAN number matches the regular expression
        if (companyPanRegex.test(panNumber)) {
            return true; // Company PAN is valid
        } else {
            return false; // Company PAN is not valid
        }
    }

    const validateEmail = (email) => {
        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateMobileNumber = (number) => {
        // Regular expression for a 10-digit mobile number
        const regex = /^\d{10}$/;
        return regex.test(number);
    }


    const validateGSTNumber = (gstNumber) => {
        // Regular expression for GST number validation
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        return gstRegex.test(gstNumber);
    };

    const [isModalOpenForAddress, setIsModalOpenForAddress] = useState(false);
    const [addressStatus, setAddressStatus] = useState('');

    const handleOpenAddressModal = () => {
        setLoading(true);
        setFormErrors({
            partyName: '',
            customerCode: '',
            custLedgerCode: '',
            panNo: '',
            operationalMail: '',
            financeMail: '',
            codecoMail: '',
            operationalMailCc: '',
            operationalMailBcc: '',
            agtOperationalMailTo: '',
            contactEmail: '',
            phoneNo: '',
            contactPhone: '',
            tdsPercentage: '',
        })
        document.getElementById('partyName').classList.remove('error-border');
        // document.getElementById('customerCode').classList.remove('error-border');
        // document.getElementById('custLedgerCode').classList.remove('error-border');
        document.getElementById('panNo').classList.remove('error-border');
        document.getElementById('operationalMail').classList.remove('error-border');
        document.getElementById('financeMail').classList.remove('error-border');
        // document.getElementById('codecoMail').classList.remove('error-border');
        document.getElementById('operationalMailCc').classList.remove('error-border');
        document.getElementById('operationalMailBcc').classList.remove('error-border');
        // document.getElementById('agtOperationalMailTo').classList.remove('error-border');
        document.getElementById('contactEmail').classList.remove('error-border');
        document.getElementById('phoneNo').classList.remove('error-border');
        document.getElementById('contactPhone').classList.remove('error-border');
        let errors = {};
        if (!partyData.partyName) {
            errors.partyName = "Party name is required"
            document.getElementById('partyName').classList.add('error-border');
        }
        if (partyData.tanNoId !== '' && (partyData.tdsPercentage === '' || partyData.tdsPercentage <= 0)) {
            errors.tdsPercentage = "Tds percentage is required"
            document.getElementById('tdsPercentage').classList.add('error-border');
        }
        // if (!partyData.customerCode) {
        //     errors.customerCode = "Customer code is required"
        //     document.getElementById('customerCode').classList.add('error-border');
        // }
        // if (!partyData.custLedgerCode) {
        //     errors.custLedgerCode = "Customer ledger code is required"
        //     document.getElementById('custLedgerCode').classList.add('error-border');
        // }
        if (!partyData.panNo) {
            errors.panNo = "PAN no is required"
            document.getElementById('panNo').classList.add('error-border');
        }
        else {
            if (!isValidatePAN(partyData.panNo)) {
                errors.panNo = "Invalid PAN No"
                document.getElementById('panNo').classList.add('error-border');
            }
        }
        // if (partyData.operationalMail) {
        //     if (!validateEmail(partyData.operationalMail)) {
        //         errors.operationalMail = "Invalid Operation Mail CC"
        //         document.getElementById('operationalMail').classList.add('error-border');
        //     }

        // }
        // if (partyData.financeMail) {
        //     if (!validateEmail(partyData.financeMail)) {
        //         errors.financeMail = "Invalid Finance Mail Id"
        //         document.getElementById('financeMail').classList.add('error-border');
        //     }

        // }
        // if (partyData.codecoMail) {
        //     if (!validateEmail(partyData.codecoMail)) {
        //         errors.codecoMail = "Invalid Codeco Mail Id"
        //         document.getElementById('codecoMail').classList.add('error-border');
        //     }

        // }
        if (partyData.operationalMailCc) {
            if (!validateEmail(partyData.operationalMailCc)) {
                errors.operationalMailCc = "Invalid Operation CC"
                document.getElementById('operationalMailCc').classList.add('error-border');
            }

        }
        if (partyData.operationalMailBcc) {
            if (!validateEmail(partyData.operationalMailBcc)) {
                errors.operationalMailBcc = "Invalid Operation BCC"
                document.getElementById('operationalMailBcc').classList.add('error-border');
            }

        }
        // if (partyData.agtOperationalMailTo) {
        //     if (!validateEmail(partyData.agtOperationalMailTo)) {
        //         errors.agtOperationalMailTo = "Invalid Auction Mail Id"
        //         document.getElementById('agtOperationalMailTo').classList.add('error-border');
        //     }

        // }
        if (partyData.contactEmail) {
            if (!validateEmail(partyData.contactEmail)) {
                errors.contactEmail = "Invalid Contact Email Id"
                document.getElementById('contactEmail').classList.add('error-border');
            }

        }
        if (partyData.phoneNo) {
            if (!validateMobileNumber(partyData.phoneNo)) {
                errors.phoneNo = "Invalid Phone No"
                document.getElementById('phoneNo').classList.add('error-border');
            }

        }
        if (partyData.contactPhone) {
            if (!validateMobileNumber(partyData.contactPhone)) {
                errors.contactPhone = "Invalid Contact Phone No"
                document.getElementById('contactPhone').classList.add('error-border');
            }

        }
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setLoading(false);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            })
            return;
        }





        if (partyData.agt !== 'Y' && partyData.biddr !== 'Y' && partyData.cha !== 'Y' && partyData.exp !== 'Y' && partyData.frw !== 'Y' && partyData.imp !== 'Y' && partyData.lin !== 'Y' && partyData.vnd !== 'Y') {
            toast.error("Please atleast select one party type", {
                autoClose: 1000
            })
            setLoading(false);
            return;
        }

        if (partyData.vnd === 'Y') {
            if (partyData.acton !== 'Y' && partyData.crtlbr !== 'Y' && partyData.dstlbr !== 'Y' && partyData.dstrct !== 'Y' &&
                partyData.eqpmsp !== 'Y' && partyData.fmgtN !== 'Y' && partyData.scnopr !== 'Y' && partyData.stuflb !== 'Y' && partyData.subctr &&
                partyData.survey !== 'Y' && partyData.trns !== 'Y' && partyData.valer !== 'Y') {
                toast.error("Please atleast select one vendor type", {
                    autoClose: 1000
                })
                setLoading(false);
                return;
            }
        }

        addressDetails.srNo = addresses.length + 1;
        setIsModalOpenForAddress(true);
        setAddressStatus('add');
        setLoading(false);
    }

    const closeModalOpenForAddress = () => {
        setIsModalOpenForAddress(false);
        setAddressStatus('');
        document.getElementById('address1').classList.remove('error-border');
        document.getElementById('pin').classList.remove('error-border');
        document.getElementById('state').classList.remove('error-border');
        document.getElementById('gstNo').classList.remove('error-border');

        setFormErrors1({
            address1: '',
            pin: '',
            state: '',
            gstNo: ''
        })

        setaddressDetails({
            srNo: '',
            address1: '',
            address2: '',
            address3: '',
            city: '',
            pin: '',
            state: '',
            gstNo: '',
            customerType: 'Registered',
            defaultChk: 'N',
        })
        setBranchid('');
        setBranchname('');
    }

    const back = () => {
        navigate(`/master/party`, { state: { search: search, flag: 'back' } });
    }


    const [partyData, setPartyData] = useState({
        companyId: "",
        branchId: "",
        partyId: "",
        masterPartyId: "",
        partyName: "",
        partyType: "CHA",
        address1: "",
        address2: "",
        address3: "",
        city: "",
        pin: "",
        state: "",
        country: "",
        movementBlock: "ACT",
        crAmtLmt: "0.000",
        phoneNo: "",
        faxNo: "",
        partyAcCode: "",
        partyTermId: "0",
        bankId: "",
        panNo: "",
        panAppliedRefNo: "",
        tdsApplicable: "",
        tdsPercentage: "",
        currency: "",
        tariffType: "",
        discountDays: "0",
        freeDays: "0",
        serviceTaxApplicable: "",
        contactPerson: "",
        contactDesignation: "",
        contactPhone: "",
        contactFaxNo: "",
        contactEmail: "",
        portPartyId: "",
        tanNoId: "",
        tdsRange: "",
        defaultBranch: branchId,
        shippingLineCode: "",
        customsExporterId: "",
        stdCode: "",
        hide: "N",
        marketingPerson: "",
        movementType: "",
        facilitationCharge: "N",
        facilitationUnit: "",
        facilitationRate: "0",
        facilitationRate1: "0",
        internalShifting: "N",
        internalShiftingUnit: "",
        internalShiftingRate: "0",
        internalShiftingRate1: "0",
        additionalRemarks: "",
        freeDaysTariff: "",
        extraServices: "",
        tariffActiveFlag: "Y",
        onlineFlag: "Y",
        movementCharge: "N",
        truckHandling: "Y",
        cfsTariffNo: "",
        gstNo: "UNREGISTER",
        iecCode: "",
        monthlyReport: "N",
        blUserId: "",
        createdBy: "",
        createdDate: new Date(),
        editedBy: "",
        editedDate: new Date(),
        approvedBy: "",
        approvedDate: new Date(),
        dpdDailyReport: "N",
        dailyReport: "N",
        dsrprtType: "LIN",
        linDailyReport: "N",
        agtDailyReport: "N",
        chaDailyReport: "N",
        impDailyReport: "N",
        frwDailyReport: "N",
        dsrxlsType: "Standard",
        excelToMail: "",
        excelCcMail: "",
        sentStatus: "N",
        reportTime: new Date(),
        activationRemarks: "",
        deactivationRemarks: "",
        status: "",
        exportMarketingPerson: "",
        exportToMail: "",
        exportCcMail: "",
        importToMail: "",
        importCcMail: "",
        codacoCcMail: "",
        codacoToMail: "",
        ediFlag: "N",
        agt: "N",
        cha: "N",
        frw: "N",
        imp: "N",
        lin: "N",
        exp: "N",
        biddr: "N",
        customerType: "Registered",
        accountType: "General",
        customerCode: "",
        operationalMail: "",
        linOperationalMailTo: "",
        agtOperationalMailTo: "",
        chaOperationalMailTo: "",
        impOperationalMailTo: "",
        frwOperationalMailTo: "",
        operationalMailCc: "",
        operationalMailBcc: "",
        financeMail: "",
        codecoMail: "",
        impGrdrentFrm: "CFS Gate In Date",
        impMtgrdrentFrm: "Destuff Date",
        impCrgStorage: "Week Wise",
        expCrgStorage: "Week Wise",
        expCrgStoFactor: "Area Wise",
        expCrgFrDays: "",
        importerMail: "",
        shippingTypeLine: "Non Panel",
        inbondInvoiceCheck: "N",
        bondnocWeek: "4",
        cartingInvoice: "N",
        custLedgerCode: "",
        checkDeposite: "Y",
        crAmtLmt: "0.000",
        crPeriod: "0.000",
        currentBal: "0.000",
        lclSpaceOccupied: "General",
        impHubOccupied: "General",
        expHubOccupied: "General",
        bondHubOccupied: "General",
        lclAreaOccupied: "0.000",
        imphAreaOccupied: "0.000",
        exphAreaOccupied: "0.000",
        bondhAreaOccupied: "0.000",
        slType: "N",
        upDockType: "N",
        vnd: "N",
        acton: "N",
        crtlbr: "N",
        dstlbr: "N",
        dstrct: "N",
        eqpmsp: "N",
        fmgtN: "N",
        scnopr: "N",
        stuflb: "N",
        subctr: "N",
        survey: "N",
        trns: "N",
        valer: "N",
        resendFlag: "N",
        uiFlag: "N",
        doSubmitReqFlag: "N",
        nvoccTariff: "N",
        offdocTariff: "N",
        leschaco: "N",
        crAmtLmtUse: "0",
        monthlyAgentReportFlag: "N",
        weeklyLclAgentReportFlag: "N",
        invoiceFromMail: "",
        cycle: "",
        dmrInterval: "Y",
        accountName: "",
        bankName: "",
        bankAddress: "",
        ifscCode: "",
        accountNo: ""
    });


    const handlePartyChange = (event) => {
        const { name, value } = event.target;
        let sanitizedValue = value;

        if (['phoneNo', 'crAmtLmt', 'crPeriod', 'currentBal', 'contactPhone', 'tdsPercentage', 'lclAreaOccupied', 'imphAreaOccupied', 'exphAreaOccupied', 'bondhAreaOccupied', 'expCrgFrDays'].includes(name)) {
            sanitizedValue = handleInputChange(value);
        }

        if (name === 'tdsPercentage' && sanitizedValue > 100) {
            sanitizedValue = '';
        }

        if (['codecoMail', 'operationalMailCc', 'operationalMailBcc', 'agtOperationalMailTo', 'contactEmail'].includes(name)) {

            if (sanitizedValue.length > 0) {
                if (!validateEmail(sanitizedValue)) {
                    document.getElementById(name).classList.add('error-border');
                    setFormErrors((prevErrors) => ({
                        ...prevErrors,
                        [name]: "Invalid Mail Id",
                    }));
                }
                else {
                    document.getElementById(name).classList.remove('error-border');
                    setFormErrors((prevErrors) => ({
                        ...prevErrors,
                        [name]: "",
                    }));
                }
            }
            else {
                document.getElementById(name).classList.remove('error-border');
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "",
                }));
            }
        }
        else if (['phoneNo', 'contactPhone'].includes(name)) {
            if (sanitizedValue.length > 0) {
                if (!validateMobileNumber(sanitizedValue)) {
                    document.getElementById(name).classList.add('error-border');
                    setFormErrors((prevErrors) => ({
                        ...prevErrors,
                        [name]: "Invalid Phone No.",
                    }));
                }
                else {
                    document.getElementById(name).classList.remove('error-border');
                    setFormErrors((prevErrors) => ({
                        ...prevErrors,
                        [name]: "",
                    }));
                }
            }
            else {
                document.getElementById(name).classList.remove('error-border');
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "",
                }));
            }
        }
        else if (['panNo'].includes(name)) {
            if (sanitizedValue.length > 0) {
                if (!isValidatePAN(sanitizedValue)) {
                    document.getElementById(name).classList.add('error-border');
                    setFormErrors((prevErrors) => ({
                        ...prevErrors,
                        [name]: "Invalid PAN No",
                    }));
                }
                else {
                    document.getElementById(name).classList.remove('error-border');
                    setFormErrors((prevErrors) => ({
                        ...prevErrors,
                        [name]: "",
                    }));
                }
            }
            else {
                document.getElementById(name).classList.remove('error-border');
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "",
                }));
            }
        }
        else {
            document.getElementById(name).classList.remove('error-border');
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "",
            }));
        }

        setPartyData((prevFilters) => ({
            ...prevFilters,
            [name]: sanitizedValue,
        }));


    };

    const [formErrors, setFormErrors] = useState({
        partyName: '',
        customerCode: '',
        custLedgerCode: '',
        panNo: '',
        operationalMail: '',
        financeMail: '',
        codecoMail: '',
        operationalMailCc: '',
        operationalMailBcc: '',
        agtOperationalMailTo: '',
        contactEmail: '',
        phoneNo: '',
        contactPhone: '',
        tdsPercentage: '',
    })


    const [formErrors1, setFormErrors1] = useState({
        address1: '',
        pin: '',
        state: '',
        gstNo: ''

    })


    const handlePartyCheckChange = (event) => {
        const { name, checked } = event.target;
        setPartyData((prevFilters) => ({
            ...prevFilters,
            [name]: checked ? 'Y' : 'N',

        }));

        if (name === 'vnd' && !checked) {
            setPartyData((prevFilters) => ({
                ...prevFilters,
                acton: 'N',
                crtlbr: 'N',
                dstlbr: 'N',
                dstrct: 'N',
                eqpmsp: 'N',
                fmgtN: 'N',
                scnopr: 'N',
                stuflb: 'N',
                subctr: 'N',
                survey: 'N',
                trns: 'N',
                valer: 'N',

            }));
        }
    };

    const [addressDetails, setaddressDetails] = useState({
        address1: '',
        address2: '',
        address3: '',
        city: '',
        pin: '',
        state: '',
        gstNo: '',
        srNo: 0,
        defaultChk: 'N',
        customerType: 'Registered'
    })

    const handleAddressChange = (event) => {
        const { name, value } = event.target;

        let val = value;

        if (name === 'pin') {
            val = handleInputChange(value);
        }

        setaddressDetails((prevFilters) => ({
            ...prevFilters,
            [name]: val,

        }));



        document.getElementById(name).classList.remove('error-border');
        setFormErrors1(
            {
                name: ""
            }
        )
    };

    const handleAddressCheckChange = (event) => {
        const { name, checked } = event.target;
        setaddressDetails((prevFilters) => ({
            ...prevFilters,
            [name]: checked ? 'Y' : 'N',

        }));


    };


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

    const [addresses, setAddresses] = useState([]);

    const getAddreses = (id) => {
        axios.get(`${ipaddress}party/getAddresses?cid=${companyid}&bid=${branchId}&id=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setAddresses(response.data);
            })
            .catch((error) => {

            })
    }

    const handleClear = () => {
        setFormErrors({
            partyName: '',
            customerCode: '',
            custLedgerCode: '',
            panNo: '',
            operationalMail: '',
            financeMail: '',
            codecoMail: '',
            operationalMailCc: '',
            operationalMailBcc: '',
            agtOperationalMailTo: '',
            contactEmail: '',
            phoneNo: '',
            contactPhone: '',
            tdsPercentage: '',
        })
        document.getElementById('partyName').classList.remove('error-border');
        // document.getElementById('customerCode').classList.remove('error-border');
        // document.getElementById('custLedgerCode').classList.remove('error-border');
        document.getElementById('panNo').classList.remove('error-border');
        document.getElementById('operationalMail').classList.remove('error-border');
        document.getElementById('financeMail').classList.remove('error-border');
        // document.getElementById('codecoMail').classList.remove('error-border');
        document.getElementById('operationalMailCc').classList.remove('error-border');
        document.getElementById('operationalMailBcc').classList.remove('error-border');
        // document.getElementById('agtOperationalMailTo').classList.remove('error-border');
        document.getElementById('contactEmail').classList.remove('error-border');
        document.getElementById('phoneNo').classList.remove('error-border');
        document.getElementById('contactPhone').classList.remove('error-border');
        setFlag('add')
        setAddresses([]);
        setCountryId('IN')
        setCountryName('India');

        setPartyData({
            companyId: "",
            branchId: "",
            partyId: "",
            masterPartyId: "",
            partyName: "",
            partyType: "CHA",
            address1: "",
            address2: "",
            address3: "",
            city: "",
            pin: "",
            state: "",
            country: "",
            movementBlock: "ACT",
            crAmtLmt: "0.000",
            tdsPercentage: '',
            phoneNo: "",
            faxNo: "",
            partyAcCode: "",
            partyTermId: "0",
            bankId: "",
            panNo: "",
            panAppliedRefNo: "",
            tdsApplicable: "",
            currency: "",
            tariffType: "",
            discountDays: "0",
            freeDays: "0",
            serviceTaxApplicable: "",
            contactPerson: "",
            contactDesignation: "",
            contactPhone: "",
            contactFaxNo: "",
            contactEmail: "",
            portPartyId: "",
            tanNoId: "",
            tdsRange: "",
            defaultBranch: branchId,
            shippingLineCode: "",
            customsExporterId: "",
            stdCode: "",
            hide: "N",
            marketingPerson: "",
            movementType: "",
            facilitationCharge: "N",
            facilitationUnit: "",
            facilitationRate: "0",
            facilitationRate1: "0",
            internalShifting: "N",
            internalShiftingUnit: "",
            internalShiftingRate: "0",
            internalShiftingRate1: "0",
            additionalRemarks: "",
            freeDaysTariff: "",
            extraServices: "",
            tariffActiveFlag: "Y",
            onlineFlag: "Y",
            movementCharge: "N",
            truckHandling: "Y",
            cfsTariffNo: "",
            gstNo: "UNREGISTER",
            iecCode: "",
            monthlyReport: "N",
            blUserId: "",
            createdBy: "",
            createdDate: new Date(),
            editedBy: "",
            editedDate: new Date(),
            approvedBy: "",
            approvedDate: new Date(),
            dpdDailyReport: "N",
            dailyReport: "N",
            dsrprtType: "LIN",
            linDailyReport: "N",
            agtDailyReport: "N",
            chaDailyReport: "N",
            impDailyReport: "N",
            frwDailyReport: "N",
            dsrxlsType: "Standard",
            excelToMail: "",
            excelCcMail: "",
            sentStatus: "N",
            reportTime: new Date(),
            activationRemarks: "",
            deactivationRemarks: "",
            status: "",
            exportMarketingPerson: "",
            exportToMail: "",
            exportCcMail: "",
            importToMail: "",
            importCcMail: "",
            codacoCcMail: "",
            codacoToMail: "",
            ediFlag: "N",
            agt: "N",
            cha: "N",
            frw: "N",
            imp: "N",
            lin: "N",
            exp: "N",
            biddr: "N",
            customerType: "Registered",
            accountType: "General",
            customerCode: "",
            operationalMail: "",
            linOperationalMailTo: "",
            agtOperationalMailTo: "",
            chaOperationalMailTo: "",
            impOperationalMailTo: "",
            frwOperationalMailTo: "",
            operationalMailCc: "",
            operationalMailBcc: "",
            financeMail: "",
            codecoMail: "",
            impGrdrentFrm: "CFS Gate In Date",
            impMtgrdrentFrm: "Destuff Date",
            impCrgStorage: "Week Wise",
            expCrgStorage: "Week Wise",
            expCrgStoFactor: "Area Wise",
            expCrgFrDays: "",
            importerMail: "",
            shippingTypeLine: "Non Panel",
            inbondInvoiceCheck: "N",
            bondnocWeek: "4",
            cartingInvoice: "N",
            custLedgerCode: "",
            checkDeposite: "Y",
            crAmtLmt: "0.000",
            crPeriod: "0.000",
            currentBal: "0.000",
            lclSpaceOccupied: "General",
            impHubOccupied: "General",
            expHubOccupied: "General",
            bondHubOccupied: "General",
            lclAreaOccupied: "0.000",
            imphAreaOccupied: "0.000",
            exphAreaOccupied: "0.000",
            bondhAreaOccupied: "0.000",
            slType: "N",
            upDockType: "N",
            vnd: "N",
            acton: "N",
            crtlbr: "N",
            dstlbr: "N",
            dstrct: "N",
            eqpmsp: "N",
            fmgtN: "N",
            scnopr: "N",
            stuflb: "N",
            subctr: "N",
            survey: "N",
            trns: "N",
            valer: "N",
            resendFlag: "N",
            uiFlag: "N",
            doSubmitReqFlag: "N",
            nvoccTariff: "N",
            offdocTariff: "N",
            leschaco: "N",
            crAmtLmtUse: "0",
            monthlyAgentReportFlag: "N",
            weeklyLclAgentReportFlag: "N",
            invoiceFromMail: "",
            cycle: "",
            dmrInterval: "Y",
            accountName: "",
            bankName: "",
            bankAddress: "",
            ifscCode: "",
            accountNo: ""
        })

    }

    const handleAddressClear = () => {
        setBranchid('');
        setBranchname('');
        document.getElementById('address1').classList.remove('error-border');
        document.getElementById('pin').classList.remove('error-border');
        document.getElementById('state').classList.remove('error-border');
        document.getElementById('gstNo').classList.remove('error-border');

        setFormErrors1({
            address1: '',
            pin: '',
            state: '',
            gstNo: ''
        })

        setaddressDetails({
            address1: '',
            address2: '',
            address3: '',
            city: '',
            pin: '',
            state: '',
            gstNo: '',
            customerType: 'Registered',
            defaultChk: 'N',
        })

    }

    const saveAddress = () => {
        setLoading(true);
        document.getElementById('address1').classList.remove('error-border');
        document.getElementById('pin').classList.remove('error-border');
        document.getElementById('state').classList.remove('error-border');
        document.getElementById('gstNo').classList.remove('error-border');

        setFormErrors1({
            address1: '',
            pin: '',
            state: '',
            gstNo: ''
        })
        let errors = {};
        if (!addressDetails.address1) {
            errors.address1 = "Address1 is required"
            document.getElementById('address1').classList.add('error-border');
        }

        if (!addressDetails.pin) {
            errors.pin = "Pin is required"
            document.getElementById('pin').classList.add('error-border');
        }

        if (!branchid) {
            errors.state = "State is required"
            document.getElementById('state').classList.add('error-border');
        }

        if (addressDetails.customerType !== 'NA') {
            if (!addressDetails.gstNo) {
                errors.gstNo = "GST No is required"
                document.getElementById('gstNo').classList.add('error-border');
            }
            if (addressDetails.gstNo && branchid) {
                const gstCheck = branches.find(item => item.value === branchid);
                console.log("hhjghjghj ", gstCheck.code, " ", addressDetails.gstNo.substring(0, 2));
                if (gstCheck.code !== addressDetails.gstNo.substring(0, 2)) {
                    errors.gstNo = "GST No not matched with state"
                    document.getElementById('gstNo').classList.add('error-border');
                }
            }
        }


        if (Object.keys(errors).length > 0) {
            setLoading(false);
            setFormErrors1(errors);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            })
            return;
        }



        partyData.country = countryId;
        addressDetails.state = branchid

        const formData = {
            party: partyData,
            address: addressDetails
        }




        axios.post(`${ipaddress}party/savePartyWithAddress?cid=${companyid}&bid=${branchId}&flag=${flag}&user=${userId}`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setLoading(false);
                toast.success("Data save successfully!!", {
                    autoClose: 800
                })
                const data = response.data;
                setPartyData(response.data);
                setFlag('edit')
                getAddreses(data.partyId);
                closeModalOpenForAddress();
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.response.data, {
                    autoClose: 1000
                })
            })
    }


    const saveWtAddress = () => {
        setLoading(true);
        setFormErrors({
            partyName: '',
            customerCode: '',
            custLedgerCode: '',
            panNo: '',
            operationalMail: '',
            financeMail: '',
            codecoMail: '',
            operationalMailCc: '',
            operationalMailBcc: '',
            agtOperationalMailTo: '',
            contactEmail: '',
            phoneNo: '',
            contactPhone: '',
            tdsPercentage: '',
        })
        document.getElementById('partyName').classList.remove('error-border');
        // document.getElementById('customerCode').classList.remove('error-border');
        // document.getElementById('custLedgerCode').classList.remove('error-border');
        document.getElementById('panNo').classList.remove('error-border');
        document.getElementById('operationalMail').classList.remove('error-border');
        document.getElementById('financeMail').classList.remove('error-border');
        // document.getElementById('codecoMail').classList.remove('error-border');
        document.getElementById('operationalMailCc').classList.remove('error-border');
        document.getElementById('operationalMailBcc').classList.remove('error-border');
        // document.getElementById('agtOperationalMailTo').classList.remove('error-border');
        document.getElementById('contactEmail').classList.remove('error-border');
        document.getElementById('phoneNo').classList.remove('error-border');
        document.getElementById('contactPhone').classList.remove('error-border');
        let errors = {};
        if (!partyData.partyName) {
            errors.partyName = "Party name is required"
            document.getElementById('partyName').classList.add('error-border');
        }
        // if (!partyData.customerCode) {
        //     errors.customerCode = "Customer code is required"
        //     document.getElementById('customerCode').classList.add('error-border');
        // }
        if (partyData.tanNoId !== '' && (partyData.tdsPercentage === '' || partyData.tdsPercentage <= 0)) {
            errors.tdsPercentage = "Tds percentage is required"
            document.getElementById('tdsPercentage').classList.add('error-border');
        }
        // if (!partyData.custLedgerCode) {
        //     errors.custLedgerCode = "Customer ledger code is required"
        //     document.getElementById('custLedgerCode').classList.add('error-border');
        // }
        if (!partyData.panNo) {
            errors.panNo = "PAN no is required"
            document.getElementById('panNo').classList.add('error-border');
        }

        else {
            if (!isValidatePAN(partyData.panNo)) {
                errors.panNo = "Invalid PAN No"
                document.getElementById('panNo').classList.add('error-border');
            }
        }
        // if (partyData.operationalMail) {
        //     if (!validateEmail(partyData.operationalMail)) {
        //         errors.operationalMail = "Invalid Operation Mail CC"
        //         document.getElementById('operationalMail').classList.add('error-border');
        //     }

        // }
        // if (partyData.financeMail) {
        //     if (!validateEmail(partyData.financeMail)) {
        //         errors.financeMail = "Invalid Finance Mail Id"
        //         document.getElementById('financeMail').classList.add('error-border');
        //     }

        // }
        // if (partyData.codecoMail) {
        //     if (!validateEmail(partyData.codecoMail)) {
        //         errors.codecoMail = "Invalid Codeco Mail Id"
        //         document.getElementById('codecoMail').classList.add('error-border');
        //     }

        // }
        if (partyData.operationalMailCc) {
            if (!validateEmail(partyData.operationalMailCc)) {
                errors.operationalMailCc = "Invalid Operation CC"
                document.getElementById('operationalMailCc').classList.add('error-border');
            }

        }
        if (partyData.operationalMailBcc) {
            if (!validateEmail(partyData.operationalMailBcc)) {
                errors.operationalMailBcc = "Invalid Operation BCC"
                document.getElementById('operationalMailBcc').classList.add('error-border');
            }

        }
        // if (partyData.agtOperationalMailTo) {
        //     if (!validateEmail(partyData.agtOperationalMailTo)) {
        //         errors.agtOperationalMailTo = "Invalid Auction Mail Id"
        //         document.getElementById('agtOperationalMailTo').classList.add('error-border');
        //     }

        // }
        if (partyData.contactEmail) {
            if (!validateEmail(partyData.contactEmail)) {
                errors.contactEmail = "Invalid Contact Email Id"
                document.getElementById('contactEmail').classList.add('error-border');
            }

        }
        if (partyData.phoneNo) {
            if (!validateMobileNumber(partyData.phoneNo)) {
                errors.phoneNo = "Invalid Phone No"
                document.getElementById('phoneNo').classList.add('error-border');
            }

        }
        if (partyData.contactPhone) {
            if (!validateMobileNumber(partyData.contactPhone)) {
                errors.contactPhone = "Invalid Contact Phone No"
                document.getElementById('contactPhone').classList.add('error-border');
            }

        }
        if (Object.keys(errors).length > 0) {
            setLoading(false);
            setFormErrors(errors);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            })
            return;
        }



        if (partyData.agt !== 'Y' && partyData.biddr !== 'Y' && partyData.cha !== 'Y' && partyData.exp !== 'Y' && partyData.frw !== 'Y' && partyData.imp !== 'Y' && partyData.lin !== 'Y' && partyData.vnd !== 'Y') {
            toast.error("Please atleast select one party type", {
                autoClose: 1000
            })
            setLoading(false);
            return;
        }

        if (partyData.vnd === 'Y') {
            if (partyData.acton !== 'Y' && partyData.crtlbr !== 'Y' && partyData.dstlbr !== 'Y' && partyData.dstrct !== 'Y' &&
                partyData.eqpmsp !== 'Y' && partyData.fmgtN !== 'Y' && partyData.scnopr !== 'Y' && partyData.stuflb !== 'Y' && partyData.subctr &&
                partyData.survey !== 'Y' && partyData.trns !== 'Y' && partyData.valer !== 'Y') {
                toast.error("Please atleast select one vendor type", {
                    autoClose: 1000
                })
                setLoading(false);
                return;
            }
        }

        if (addresses.length === 0) {
            toast.error("Please add atleast one address", {
                autoClose: 1000
            })
            setLoading(false);
            return;
        }


        partyData.country = countryId;
        console.log('partyData ', partyData);

        axios.post(`${ipaddress}party/saveParty?cid=${companyid}&bid=${branchId}&flag=${flag}&user=${userId}`, partyData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setLoading(false);
                toast.success("Data save successfully!!", {
                    autoClose: 800
                })
                const data = response.data;
                setPartyData(response.data);
                setFlag('edit')
                getAddreses(data.partyId);
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.response.data, {
                    autoClose: 1000
                })
            })
    }

    const handleEdit = (item) => {
        setaddressDetails({
            address1: item.address1,
            address2: item.address2,
            address3: item.address3,
            city: item.city,
            pin: item.pin,
            state: item.state,
            gstNo: item.gstNo,
            srNo: item.srNo,
            defaultChk: item.defaultChk,
            customerType: item.partyType
        })
        setIsModalOpenForAddress(true);
        setBranchid(item.state);
        setAddressStatus('edit');
        const name = branches.find(item1 => item1.value === item.state);
        setBranchname(name.label);
    }

    const deleteAddress = (id) => {
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
                axios.post(`${ipaddress}party/deleteAddress?cid=${companyid}&bid=${branchId}&partyId=${partyData.partyId}&sr=${id}`, null, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                })
                    .then((response) => {
                        getAddreses(partyData.partyId);
                        if (response.data === 'success') {
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

    return (
        <div className='Container partyFontSize' >
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
            <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
                icon={faPlus}
                style={{
                    marginRight: '8px',
                    color: 'black', // Set the color to golden
                }}
            />Add Party</h5>
            <Card style={{ backgroundColor: "#F8F8F8" }}>
                <CardBody>

                    <div style={{ border: '1px solid black' }}>
                        <div style={{ fontWeight: 800 }} className="text-center">
                            Add Party Types
                        </div>

                        <div style={{ paddingLeft: 10, paddingRight: 10 }}>

                            {/* <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    name='agt'
                                    onChange={handlePartyCheckChange}
                                    checked={partyData.agt === 'Y' ? true : false}
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">Agent</Label>
                            </span>
                            <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    name='biddr'
                                    onChange={handlePartyCheckChange}
                                    checked={partyData.biddr === 'Y' ? true : false}
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">Bidder</Label>
                            </span> */}
                            <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    name='cha'
                                    onChange={handlePartyCheckChange}
                                    checked={partyData.cha === 'Y' ? true : false}
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">CHA</Label>
                            </span>
                            {/* <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    name='exp'
                                    onChange={handlePartyCheckChange}
                                    checked={partyData.exp === 'Y' ? true : false}
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">Exporter</Label>
                            </span> */}
                            <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    name='frw'
                                    onChange={handlePartyCheckChange}
                                    checked={partyData.frw === 'Y' ? true : false}
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">Forwarders</Label>
                            </span>
                            <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    name='imp'
                                    onChange={handlePartyCheckChange}
                                    checked={partyData.imp === 'Y' ? true : false}
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">Importer</Label>
                            </span>
                            {/* <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    name='lin'
                                    onChange={handlePartyCheckChange}
                                    checked={partyData.lin === 'Y' ? true : false}
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">Liner</Label>
                            </span>
                            <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    name='vnd'
                                    onChange={handlePartyCheckChange}
                                    checked={partyData.vnd === 'Y' ? true : false}
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">Vendor</Label>
                            </span>
 */}


                        </div>
                    </div>
                    {/* <div style={{ border: '1px solid black', marginTop: 10 }}>
                        <div style={{ fontWeight: 800 }} className="text-center">
                            Add Vendor Types
                        </div>
                        <div style={{ paddingLeft: 10, paddingRight: 10 }}>
                            <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    disabled={partyData.vnd != 'Y'}
                                    name='acton'
                                    onChange={handlePartyCheckChange}
                                    checked={partyData.acton === 'Y' ? true : false}
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">Auctioneer</Label>
                            </span>
                            <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    disabled={partyData.vnd != 'Y'}
                                    name='crtlbr'
                                    onChange={handlePartyCheckChange}
                                    checked={partyData.crtlbr === 'Y' ? true : false}
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">Cart Labour</Label>
                            </span>
                            <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    disabled={partyData.vnd != 'Y'}
                                    name='dstlbr'
                                    onChange={handlePartyCheckChange}
                                    checked={partyData.dstlbr === 'Y' ? true : false}
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">Destuff Labour</Label>
                            </span>
                            <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    disabled={partyData.vnd != 'Y'}
                                    name='dstrct'
                                    onChange={handlePartyCheckChange}
                                    checked={partyData.dstrct === 'Y' ? true : false}
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">Destructer</Label>
                            </span>
                            <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    disabled={partyData.vnd != 'Y'}
                                    name='eqpmsp'
                                    onChange={handlePartyCheckChange}
                                    checked={partyData.eqpmsp === 'Y' ? true : false}
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">Equipment Supplier</Label>
                            </span>
                            <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    disabled={partyData.vnd != 'Y'}
                                    name='fmgtN'
                                    onChange={handlePartyCheckChange}
                                    checked={partyData.fmgtN === 'Y' ? true : false}
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">Fumigation</Label>
                            </span>
                            <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    disabled={partyData.vnd != 'Y'}
                                    name='scnopr'
                                    onChange={handlePartyCheckChange}
                                    checked={partyData.scnopr === 'Y' ? true : false}
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">Scan Operator</Label>
                            </span>
                            <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    disabled={partyData.vnd != 'Y'}
                                    name='stuflb'
                                    onChange={handlePartyCheckChange}
                                    checked={partyData.stuflb === 'Y' ? true : false}
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">Stuff Labour</Label>
                            </span>
                            <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    disabled={partyData.vnd != 'Y'}
                                    name='subctr'
                                    onChange={handlePartyCheckChange}
                                    checked={partyData.subctr === 'Y' ? true : false}
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">Sub Contracter</Label>
                            </span>
                            <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    disabled={partyData.vnd != 'Y'}
                                    name='survey'
                                    onChange={handlePartyCheckChange}
                                    checked={partyData.survey === 'Y' ? true : false}
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">Survey</Label>
                            </span>
                            <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    disabled={partyData.vnd != 'Y'}
                                    name='trns'
                                    onChange={handlePartyCheckChange}
                                    checked={partyData.trns === 'Y' ? true : false}
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">Transporter</Label>
                            </span>
                            <span style={{ marginRight: 8 }}>


                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 18, marginRight: 1 }}
                                    disabled={partyData.vnd != 'Y'}
                                    name='valer'
                                    onChange={handlePartyCheckChange}
                                    checked={partyData.valer === 'Y' ? true : false}
                                />
                                <Label style={{ paddingLeft: 10 }} className="me-2">Valuer</Label>
                            </span>
                        </div>
                    </div> */}
                    <Row style={{ marginTop: 20 }}>
                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">Party ID</Label>
                                <Input
                                    type="text"
                                    name="partyId"
                                    id='partyId'
                                    className="form-control inputField"
                                    disabled
                                    value={partyData.partyId}
                                    onChange={handlePartyChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">	Party Name</Label><span style={{ color: 'red' }}>*</span>
                                <Input
                                    type="text"
                                    name="partyName"
                                    id='partyName'
                                    className="form-control inputField"
                                    value={partyData.partyName}
                                    onChange={handlePartyChange}
                                    maxLength={100}
                                />
                                <div style={{ color: 'red' }} className="error-message">{formErrors.partyName}</div>
                            </FormGroup>
                        </Col>


                        {/* <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">Party Term ID</Label><span style={{ color: 'red' }}>*</span>
                                <Input
                                    type="select"
                                    name="partyTermId"
                                    id='partyTermId'
                                    className="form-control"
                                    value={partyData.partyTermId}
                                    onChange={handlePartyChange}
                                >
                                    {termId.map((item, index) => (
                                        <option key={index} value={item.jarDtlId}>{item.jarDtlDesc}</option>
                                    ))}


                                </Input>
                            </FormGroup>
                        </Col> */}
                        {/* <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">	Customer Code</Label><span style={{ color: 'red' }}>*</span>
                                <Input
                                    type="text"
                                    name="customerCode"
                                    id='customerCode'
                                    className="form-control inputField"
                                    value={partyData.customerCode}
                                    onChange={handlePartyChange}
                                    maxLength={25}
                                />
                                <div style={{ color: 'red' }} className="error-message">{formErrors.customerCode}</div>
                            </FormGroup>
                        </Col> */}
                        {/* <Col md={4}>
                            <FormGroup>
                                <Label className="partyFontSize">Party AC Code</Label><span style={{ color: 'red' }}>*</span>
                                <Select
                                    placeholder="Select Country"
                                    isClearable
                                    className

                                />
                            </FormGroup>
                        </Col> */}



                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">IEC Code</Label>
                                <Input
                                    type="text"
                                    name="iecCode"
                                    id='iecCode'
                                    className="form-control inputField"
                                    value={partyData.iecCode}
                                    onChange={handlePartyChange}
                                    maxLength={20}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">Country</Label><span style={{ color: 'red' }}>*</span>
                                <Select
                                    options={country}
                                    //  options={{ value: importerData.iecCode, label: importerData.importerName }}
                                    value={{ value: countryId, label: countryName }}
                                    onChange={handleCountryChange}
                                    id="country"
                                    name="country"
                                    isClearable
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
                                <Label className="partyFontSize">Status</Label>
                                <Input
                                    type="text"
                                    name="status"
                                    id='status'
                                    className="form-control inputField"
                                    value={partyData.status === 'A' ? 'Approved' : ''}
                                    onChange={handlePartyChange}
                                    readOnly
                                    style={{ backgroundColor: '#E0E0E0' }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">Approved By</Label>
                                <Input
                                    type="text"
                                    name="approvedBy"
                                    id='approvedBy'
                                    className="form-control inputField"
                                    value={partyData.approvedBy}
                                    onChange={handlePartyChange}
                                    readOnly
                                    style={{ backgroundColor: '#E0E0E0' }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        {/* <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">Customer Ledger Code</Label><span style={{ color: 'red' }}>*</span>
                                <Input
                                    type="text"
                                    name="custLedgerCode"
                                    id='custLedgerCode'
                                    className="form-control inputField"
                                    value={partyData.custLedgerCode}
                                    onChange={handlePartyChange}
                                    maxLength={25}
                                />
                                <div style={{ color: 'red' }} className="error-message">{formErrors.custLedgerCode}</div>
                            </FormGroup>
                        </Col> */}




                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">Default Branch</Label><span style={{ color: 'red' }}>*</span>
                                <Input
                                    type="select"
                                    name="defaultBranch"
                                    className="form-control"
                                    id='defaultBranch'
                                    value={partyData.defaultBranch}
                                    onChange={handlePartyChange}
                                    readOnly
                                    disabled
                                    style={{ backgroundColor: '#E0E0E0' }}
                                >
                                    {defaultBranches.map((item, index) => (
                                        <option key={index} value={item.branchId}>{item.branchName}</option>
                                    ))}


                                </Input>
                            </FormGroup>
                        </Col>

                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">Phone No</Label>
                                <Input
                                    type="text"
                                    name="phoneNo"
                                    id='phoneNo'
                                    className="form-control inputField"
                                    value={partyData.phoneNo}
                                    onChange={handlePartyChange}
                                    maxLength={15}
                                />
                                <div style={{ color: 'red' }} className="error-message">{formErrors.phoneNo}</div>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">FAX No</Label>
                                <Input
                                    type="text"
                                    name="faxNo"
                                    id='faxNo'
                                    className="form-control inputField"
                                    value={partyData.faxNo}
                                    onChange={handlePartyChange}
                                    maxLength={15}
                                />
                            </FormGroup>
                        </Col>





                  
                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">PAN No</Label><span style={{ color: 'red' }}>*</span>
                                <Input
                                    type="text"
                                    name="panNo"
                                    id='panNo'
                                    className="form-control inputField"
                                    value={partyData.panNo}
                                    onChange={handlePartyChange}
                                    maxLength={25}
                                />
                                <div style={{ color: 'red' }} className="error-message">{formErrors.panNo}</div>
                            </FormGroup>
                        </Col>

                        {/* <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">PAN Applied Ref No</Label>
                                <Input
                                    type="text"
                                    name="panAppliedRefNo"
                                    id='panAppliedRefNo'
                                    className="form-control inputField"
                                    value={partyData.panAppliedRefNo}
                                    onChange={handlePartyChange}
                                    maxLength={10}
                                />
                            </FormGroup>
                        </Col> */}
                        {/* <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">	Customs Exporter Id</Label>
                                <Input
                                    type="text"
                                    name="customsExporterId"
                                    id='customsExporterId'
                                    className="form-control inputField"
                                    value={partyData.customsExporterId}
                                    onChange={handlePartyChange}
                                    maxLength={10}
                                />
                            </FormGroup>
                        </Col> */}

                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">STD Code</Label>
                                <Input
                                    type="text"
                                    name="stdCode"
                                    id='stdCode'
                                    className="form-control inputField"
                                    value={partyData.stdCode}
                                    onChange={handlePartyChange}
                                    maxLength={5}
                                />
                            </FormGroup>
                        </Col>

   <Col md={2}>
                            <Label className="partyFontSize">Account Type</Label>
                            <Input
                                type="select"
                                name="accountType"
                                id='accountType'
                                className="form-control"
                                value={partyData.accountType}
                                onChange={handlePartyChange}
                            >
                                <option value="General">General</option>
                                <option value="Credit">Credit</option>
                            </Input>

                        </Col>

                          </Row>
                    <Row>

                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">Tan No Id</Label>
                                <Input
                                    type="text"
                                    name="tanNoId"
                                    id='tanNoId'
                                    className="form-control inputField"
                                    value={partyData.tanNoId}
                                    onChange={handlePartyChange}
                                    maxLength={10}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">TDS Percentage</Label>
                                <Input
                                    type="text"
                                    name="tdsPercentage"
                                    id='tdsPercentage'
                                    className="form-control inputField"
                                    value={partyData.tdsPercentage}
                                    onChange={handlePartyChange}
                                    maxLength={3}
                                />
                                <div style={{ color: 'red' }} className="error-message">{formErrors.tdsPercentage}</div>
                            </FormGroup>
                        </Col>


                     
                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">Operational Mail ID</Label>
                                <Input
                                    type="textarea"
                                    name="operationalMail"
                                    id='operationalMail'
                                    className="form-control inputField"
                                    value={partyData.operationalMail}
                                    onChange={handlePartyChange}
                                    maxLength={600}
                                />
                                <div style={{ color: 'red' }} className="error-message">{formErrors.operationalMail}</div>
                            </FormGroup>

                        </Col>
                   
                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">Finance Mail ID</Label>
                                <Input
                                    type="textarea"
                                    name="financeMail"
                                    id='financeMail'
                                    className="form-control inputField"
                                    value={partyData.financeMail}
                                    onChange={handlePartyChange}
                                    maxLength={250}
                                />
                                <div style={{ color: 'red' }} className="error-message">{formErrors.financeMail}</div>
                            </FormGroup>
                        </Col>
                       
                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">Operation CC</Label>
                                <Input
                                    type="text"
                                    name="operationalMailCc"
                                    id='operationalMailCc'
                                    className="form-control inputField"
                                    value={partyData.operationalMailCc}
                                    onChange={handlePartyChange}
                                    maxLength={600}
                                />
                                <div style={{ color: 'red' }} className="error-message">{formErrors.operationalMailCc}</div>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">Operation BCC</Label>
                                <Input
                                    type="text"
                                    name="operationalMailBcc"
                                    id='operationalMailBcc'
                                    className="form-control inputField"
                                    value={partyData.operationalMailBcc}
                                    onChange={handlePartyChange}
                                    maxLength={600}
                                />
                                <div style={{ color: 'red' }} className="error-message">{formErrors.operationalMailBcc}</div>
                            </FormGroup>
                        </Col>


                         </Row>
                    {/* <Row>

                        <Col md={4}>
                            <FormGroup style={{ paddingTop: 20 }}>
                                <span style={{ marginRight: 8 }}>

                                    <Label style={{ paddingLeft: 10 }} className="me-2">Line</Label>
                                    <Input
                                        type="checkbox"
                                        className="form-check-input radios"
                                        style={{ width: 20, height: 18, }}
                                        name='linDailyReport'
                                        onChange={handlePartyCheckChange}
                                        checked={partyData.linDailyReport === 'Y' ? true : false}
                                    />

                                </span>
                                <span style={{ marginRight: 8 }}>

                                    <Label style={{ paddingLeft: 10 }} className="me-2">Agent</Label>
                                    <Input
                                        type="checkbox"
                                        className="form-check-input radios"
                                        style={{ width: 20, height: 18, }}
                                        name='agtDailyReport'
                                        onChange={handlePartyCheckChange}
                                        checked={partyData.agtDailyReport === 'Y' ? true : false}
                                    />

                                </span>
                                <span style={{ marginRight: 8 }}>

                                    <Label style={{ paddingLeft: 10 }} className="me-2">Forwarder</Label>
                                    <Input
                                        type="checkbox"
                                        className="form-check-input radios"
                                        style={{ width: 20, height: 18, }}
                                        name='frwDailyReport'
                                        onChange={handlePartyCheckChange}
                                        checked={partyData.frwDailyReport === 'Y' ? true : false}
                                    />

                                </span>
                                <span style={{ marginRight: 8 }}>

                                    <Label style={{ paddingLeft: 10 }} className="me-2">CHA</Label>
                                    <Input
                                        type="checkbox"
                                        className="form-check-input radios"
                                        style={{ width: 20, height: 18, }}
                                        name='chaDailyReport'
                                        onChange={handlePartyCheckChange}
                                        checked={partyData.chaDailyReport === 'Y' ? true : false}
                                    />

                                </span>
                                <span style={{ marginRight: 8 }}>

                                    <Label style={{ paddingLeft: 10 }} className="me-2">Importer</Label>
                                    <Input
                                        type="checkbox"
                                        className="form-check-input radios"
                                        style={{ width: 20, height: 18, }}
                                        name='impDailyReport'
                                        onChange={handlePartyCheckChange}
                                        checked={partyData.impDailyReport === 'Y' ? true : false}
                                    />

                                </span>
                            </FormGroup>
                        </Col>






                    </Row>
                    <Row>

                        <Col md={2}>
                            <Label className="partyFontSize">Imp Loaded Ground Rent From</Label>
                            <Input
                                type="select"
                                name="impGrdrentFrm"
                                id='impGrdrentFrm'
                                className="form-control"
                                value={partyData.impGrdrentFrm}
                                onChange={handlePartyChange}
                            >
                                <option value="CFS Gate In Date">CFS Gate In Date</option>
                                <option value="Vessel Berth Date">Vessel Berth Date</option>
                                <option value="Train Arrival Date">Train Arrival Date</option>
                            </Input>

                        </Col>

                        <Col md={2}>
                            <Label className="partyFontSize">	(Imp) Empty Ground Rent From</Label>
                            <Input
                                type="select"
                                name="impMtgrdrentFrm"
                                id='impMtgrdrentFrm'
                                className="form-control"
                                value={partyData.impMtgrdrentFrm}
                                onChange={handlePartyChange}
                            >
                                <option value="Destuff Date">Destuff Date</option>
                            </Input>

                        </Col>

                        <Col md={2}>
                            <Label className="partyFontSize">Imp Cargo Storage</Label>
                            <Input
                                type="select"
                                name="impCrgStorage"
                                id='impCrgStorage'
                                className="form-control"
                                value={partyData.impCrgStorage}
                                onChange={handlePartyChange}
                            >
                                <option value="Week Wise">Week Wise</option>
                                <option value="Day Wise">Day Wise</option>
                            </Input>

                        </Col>



                        <Col md={2}>
                            <Label className="partyFontSize">Exp Cargo Storage(W/D)</Label>
                            <Input
                                type="select"
                                name="expCrgStorage"
                                id='expCrgStorage'
                                className="form-control"
                                value={partyData.expCrgStorage}
                                onChange={handlePartyChange}
                            >
                                <option value="Week Wise">Week Wise</option>
                                <option value="Day Wise">Day Wise</option>
                            </Input>

                        </Col>

                        <Col md={2}>
                            <Label className="partyFontSize">Exp Cargo Storage Factor(A/W)</Label>
                            <Input
                                type="select"
                                name="expCrgStoFactor"
                                id='expCrgStoFactor'
                                className="form-control"
                                value={partyData.expCrgStoFactor}
                                onChange={handlePartyChange}
                            >
                                <option value="Area Wise">Area Wise</option>
                                <option value="Weight Wise">Weight Wise</option>
                            </Input>

                        </Col>

                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">Exp Cargo Free Days</Label>
                                <Input
                                    type="text"
                                    name="expCrgFrDays"
                                    id='expCrgFrDays'
                                    className="form-control inputField"
                                    value={partyData.expCrgFrDays}
                                    onChange={handlePartyChange}
                                    maxLength={5}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={2}>
                            <Label className="partyFontSize">Shipping Line Type</Label>
                            <Input
                                type="select"
                                name="shippingTypeLine"
                                id='shippingTypeLine'
                                className="form-control"
                                value={partyData.shippingTypeLine}
                                onChange={handlePartyChange}
                            >
                                <option value="Non Panel">Non Panel</option>
                                <option value="Panel">Panel</option>
                                <option value="NVOCC">NVOCC</option>
                            </Input>

                        </Col>

                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">	Auction mail ID</Label>
                                <Input
                                    type="text"
                                    name="agtOperationalMailTo"
                                    id='agtOperationalMailTo'
                                    className="form-control inputField"
                                    value={partyData.agtOperationalMailTo}
                                    onChange={handlePartyChange}
                                    maxLength={600}
                                />
                                <div style={{ color: 'red' }} className="error-message">{formErrors.agtOperationalMailTo}</div>
                            </FormGroup>
                        </Col>


                        <Col md={2}>
                            <Label className="partyFontSize">	Bond NOC Weeks</Label>
                            <Input
                                type="select"
                                name="bondnocWeek"
                                id='bondnocWeek'
                                className="form-control"
                                value={partyData.bondnocWeek}
                                onChange={handlePartyChange}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </Input>

                        </Col>


                        <Col md={2}>
                            <FormGroup>

                                <Label className="partyFontSize">Cheque Facility Allowed</Label><br />
                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 20, }}
                                    name='checkDeposite'
                                    id='checkDeposite'
                                    onChange={handlePartyCheckChange}
                                    checked={partyData.checkDeposite === 'Y' ? true : false}
                                />

                            </FormGroup>
                        </Col>

                        <Col md={2}>
                            <FormGroup>

                                <Label className="partyFontSize">Carting Invoice Not Required</Label><br />
                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 20, }}
                                    name='cartingInvoice'
                                    onChange={handlePartyCheckChange}
                                    checked={partyData.cartingInvoice === 'Y' ? true : false}
                                />

                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>

                                <Label className="partyFontSize">	InBond Invoice Not Required</Label><br />
                                <Input
                                    type="checkbox"
                                    className="form-check-input radios"
                                    style={{ width: 20, height: 20, }}
                                    name='inbondInvoiceCheck'
                                    onChange={handlePartyCheckChange}
                                    checked={partyData.inbondInvoiceCheck === 'Y' ? true : false}
                                />

                            </FormGroup>
                        </Col>
                    </Row> */}
                    <Row>
                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">Credit Amount Limit</Label>
                                <Input
                                    type="text"
                                    name="crAmtLmt"
                                    id='crAmtLmt'
                                    className="form-control inputField"
                                    value={partyData.crAmtLmt}
                                    onChange={handlePartyChange}

                                    maxLength={16}
                                />
                            </FormGroup>
                        </Col>

                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">	Credit Period</Label>
                                <Input
                                    type="text"
                                    name="crPeriod"
                                    id='crPeriod'
                                    className="form-control inputField"
                                    value={partyData.crPeriod}
                                    onChange={handlePartyChange}
                                    maxLength={3}
                                />
                            </FormGroup>
                        </Col>

                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">Current Balance</Label>
                                <Input
                                    type="text"
                                    name="currentBal"
                                    id='currentBal'
                                    className="form-control inputField"
                                    value={partyData.currentBal}
                                    onChange={handlePartyChange}
                                    maxLength={16}
                                />
                            </FormGroup>
                        </Col>


                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize" style={{ color: 'red' }}>Opening Balance</Label>
                                <Input
                                    type="text"
                                    name="BE No"
                                    className="form-control inputField"
                                    readOnly
                                    style={{ backgroundColor: '#E0E0E0' }}
                                />
                            </FormGroup>
                        </Col>

                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize" style={{ color: 'red' }}>Closing Balance</Label>
                                <Input
                                    type="text"
                                    name="BE No"
                                    readOnly
                                    style={{ backgroundColor: '#E0E0E0' }}
                                    className="form-control inputField"
                                />
                            </FormGroup>
                        </Col>

                        <Col md={2}>
                            <Label className="partyFontSize">Customer Type</Label>
                            <Input
                                type="select"
                                name="customerType"
                                id='customerType'
                                className="form-control"
                                value={partyData.customerType}
                                onChange={handlePartyChange}
                            >
                                <option value="Registered">Registered</option>
                                <option value="NA">NA</option>
                                <option value="Export">Export</option>
                                <option value="SEZ Without Payment">SEZ Without Payment</option>
                                <option value="Exempted">Exempted</option>
                                <option value="SEZ With Payment">SEZ With Payment</option>
                            </Input>

                        </Col>
                    </Row>
                    <div style={{ fontSize: 16, fontWeight: 800 }}>
                        Contact Details
                    </div>
                    <hr />
                    <Row>
                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">Contact Person</Label>
                                <Input
                                    type="text"
                                    name="contactPerson"
                                    id='contactPerson'
                                    className="form-control inputField"
                                    value={partyData.contactPerson}
                                    onChange={handlePartyChange}
                                    maxLength={25}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">Contact Designation</Label>
                                <Input
                                    type="text"
                                    name="contactDesignation"
                                    id='contactDesignation'
                                    className="form-control inputField"
                                    value={partyData.contactDesignation}
                                    onChange={handlePartyChange}
                                    maxLength={25}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">	Contact Email</Label>
                                <Input
                                    type="text"
                                    name="contactEmail"
                                    id='contactEmail'
                                    className="form-control inputField"
                                    value={partyData.contactEmail}
                                    onChange={handlePartyChange}
                                    maxLength={100}
                                />
                                <div style={{ color: 'red' }} className="error-message">{formErrors.contactEmail}</div>
                            </FormGroup>
                        </Col>

                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">Contact Phone</Label>
                                <Input
                                    type="text"
                                    name="contactPhone"
                                    id='contactPhone'
                                    className="form-control inputField"
                                    value={partyData.contactPhone}
                                    onChange={handlePartyChange}
                                    maxLength={15}
                                />
                                <div style={{ color: 'red' }} className="error-message">{formErrors.contactPhone}</div>
                            </FormGroup>
                        </Col>
                        {/* <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">Contact Fax No</Label>
                                <Input
                                    type="text"
                                    name="contactFaxNo"
                                    id='contactFaxNo'
                                    className="form-control inputField"
                                    value={partyData.contactFaxNo}
                                    onChange={handlePartyChange}
                                    maxLength={15}
                                />
                            </FormGroup>
                        </Col> */}
                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">	Import Marketing Person</Label>
                                <Input
                                    type="text"
                                    name="marketingPerson"
                                    id='marketingPerson'
                                    className="form-control inputField"
                                    value={partyData.marketingPerson}
                                    onChange={handlePartyChange}
                                    maxLength={20}
                                />
                            </FormGroup>
                        </Col>

                        {/* <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">Export To Mail</Label>
                                <Input
                                    type="text"
                                    name="exportToMail"
                                    id='exportToMail'
                                    className="form-control inputField"
                                    value={partyData.exportToMail}
                                    onChange={handlePartyChange}
                                    maxLength={600}
                                />
                            </FormGroup>
                        </Col> */}
                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">Export Marketing Person</Label>
                                <Input
                                    type="text"
                                    name="exportMarketingPerson"
                                    id='exportMarketingPerson'
                                    className="form-control inputField"
                                    value={partyData.exportMarketingPerson}
                                    onChange={handlePartyChange}
                                    maxLength={20}
                                />
                            </FormGroup>
                        </Col>

                    </Row>
                    <div style={{ fontSize: 16, fontWeight: 800 }}>
                        Bank Details
                    </div>
                    <hr />
                    <Row>
                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">Account Holder Name</Label>
                                <Input
                                    type="text"
                                    name="accountName"
                                    id='accountName'
                                    className="form-control inputField"
                                    value={partyData.accountName}
                                    onChange={handlePartyChange}
                                    maxLength={50}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">Account No</Label>
                                <Input
                                    type="text"
                                    name="accountNo"
                                    id='accountNo'
                                    className="form-control inputField"
                                    value={partyData.accountNo}
                                    onChange={handlePartyChange}
                                    maxLength={20}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">Bank Name</Label>
                                <Input
                                    type="text"
                                    name="bankName"
                                    id='bankName'
                                    className="form-control inputField"
                                    value={partyData.bankName}
                                    onChange={handlePartyChange}
                                    maxLength={50}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">Bank Address</Label>
                                <Input
                                    type="textarea"
                                    name="bankAddress"
                                    id='bankAddress'
                                    className="form-control inputField"
                                    value={partyData.bankAddress}
                                    onChange={handlePartyChange}
                                    maxLength={150}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">IFSC Code</Label>
                                <Input
                                    type="text"
                                    name="ifscCode"
                                    id='ifscCode'
                                    className="form-control inputField"
                                    value={partyData.ifscCode}
                                    onChange={handlePartyChange}
                                    maxLength={15}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    {/* <div style={{ fontSize: 16, fontWeight: 800 }}>
                        Party Activation/Deactivation Details
                    </div>
                    <hr />
                    <Row>
                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">&nbsp;</Label><br />
                                <button
                                    className="btn btn-outline-danger btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                >
                                    <FontAwesomeIcon icon={faClose} style={{ marginRight: "5px" }} />
                                    Deactivate Party
                                </button>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label className="partyFontSize">Deactivation Remarks</Label>
                                <Input
                                    type="text"
                                    name="deactivationRemarks"
                                    id='deactivationRemarks'
                                    className="form-control inputField"
                                    value={partyData.deactivationRemarks}
                                    onChange={handlePartyChange}
                                    maxLength={150}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <div className="mt-1 table-responsive ">
                        <table className="table table-bordered table-hover tableHeader">
                            <thead className='tableHeader'>
                                <tr>
                                    <th scope="col">Area Occupied</th>

                                </tr>
                                <tr>
                                    <th scope="col">&nbsp;</th>
                                    <th scope="col">Space Occupied</th>
                                    <th scope="col">Area</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>LCL WH Config</td>
                                    <td>
                                        <Input
                                            type="select"
                                            name="lclSpaceOccupied"
                                            id='lclSpaceOccupied'
                                            className="form-control"
                                            value={partyData.lclSpaceOccupied}
                                            onChange={handlePartyChange}
                                        >
                                            <option value="General">General</option>
                                            <option value="Reserve">Reserve</option>
                                        </Input></td>
                                    <td>
                                        <Row>
                                            <Col md={6}>
                                                <Input
                                                    type="text"
                                                    name="lclAreaOccupied"
                                                    id='lclAreaOccupied'
                                                    className="form-control inputField"
                                                    value={partyData.lclAreaOccupied}
                                                    onChange={handlePartyChange}
                                                    maxLength={16}
                                                />
                                            </Col>
                                            <Col md={2} style={{ paddingTop: 5 }}>
                                                Sq.Mtr
                                            </Col>
                                        </Row>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Import Hub WH Config</td>
                                    <td>
                                        <Input
                                            type="select"
                                            name="impHubOccupied"
                                            id='impHubOccupied'
                                            className="form-control"
                                            value={partyData.impHubOccupied}
                                            onChange={handlePartyChange}
                                        >
                                            <option value="General">General</option>
                                            <option value="Reserve">Reserve</option>
                                        </Input></td>
                                    <td>
                                        <Row>
                                            <Col md={6}>
                                                <Input
                                                    type="text"
                                                    name="imphAreaOccupied"
                                                    id='imphAreaOccupied'
                                                    className="form-control inputField"
                                                    value={partyData.imphAreaOccupied}
                                                    onChange={handlePartyChange}
                                                    maxLength={16}
                                                />
                                            </Col>
                                            <Col md={2} style={{ paddingTop: 5 }}>
                                                Sq.Mtr
                                            </Col>
                                        </Row>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Export WH Config</td>
                                    <td>
                                        <Input
                                            type="select"
                                            name="expHubOccupied"
                                            id='expHubOccupied'
                                            className="form-control"
                                            value={partyData.expHubOccupied}
                                            onChange={handlePartyChange}
                                        >
                                            <option value="General">General</option>
                                            <option value="Reserve">Reserve</option>
                                        </Input></td>
                                    <td>
                                        <Row>
                                            <Col md={6}>
                                                <Input
                                                    type="text"
                                                    name="exphAreaOccupied"
                                                    id='exphAreaOccupied'
                                                    className="form-control inputField"
                                                    value={partyData.exphAreaOccupied}
                                                    onChange={handlePartyChange}
                                                    maxLength={16}
                                                />
                                            </Col>
                                            <Col md={2} style={{ paddingTop: 5 }}>
                                                Sq.Mtr
                                            </Col>
                                        </Row>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Bond WH Config</td>
                                    <td>
                                        <Input
                                            type="select"
                                            name="bondHubOccupied"
                                            id='bondHubOccupied'
                                            className="form-control"
                                            value={partyData.bondHubOccupied}
                                            onChange={handlePartyChange}
                                        >
                                            <option value="General">General</option>
                                            <option value="Reserve">Reserve</option>
                                        </Input></td>
                                    <td>
                                        <Row>
                                            <Col md={6}>
                                                <Input
                                                    type="text"
                                                    name="bondhAreaOccupied"
                                                    id='bondhAreaOccupied'
                                                    className="form-control inputField"
                                                    value={partyData.bondhAreaOccupied}
                                                    onChange={handlePartyChange}
                                                    maxLength={16}
                                                />
                                            </Col>
                                            <Col md={2} style={{ paddingTop: 5 }}>
                                                Sq.Mtr
                                            </Col>
                                        </Row>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div> */}


                    <hr />
                    <Row className="justify-content-end">
                        <Col xs="auto">
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={handleOpenAddressModal}
                            >
                                <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
                                Add Address Details
                            </button>
                        </Col>
                    </Row>
                    <hr />
                    <div className="mt-1 table-responsive ">
                        <table className="table table-bordered table-hover tableHeader text-center">
                            <thead className='tableHeader'>
                                <tr>
                                    <th scope="col">Sr No</th>
                                    <th scope="col">Address1</th>
                                    <th scope="col">Address2</th>
                                    <th scope="col">Address3</th>
                                    <th scope="col">City</th>
                                    <th scope="col">Pin</th>
                                    <th scope="col">State</th>
                                    <th scope="col">GST No</th>
                                    <th scope="col">Created By</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Customer Type</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {addresses.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.address1}</td>
                                        <td>{item.address2}</td>
                                        <td>{item.address3}</td>
                                        <td>{item.city}</td>
                                        <td>{item.pin}</td>
                                        <td>{item.state}</td>
                                        <td>{item.gstNo}</td>
                                        <td>{item.approvedBy}</td>
                                        <td>{item.status === 'A' ? 'Approved' : ''}</td>
                                        <td>{item.partyType}</td>
                                        <td>

                                            <button
                                                className="btn btn-outline-primary btn-margin newButton"
                                                style={{ marginRight: 10 }}
                                                id="submitbtn2"
                                                onClick={() => handleEdit(item)}
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                            {/* <button
                                                className="btn btn-outline-danger btn-margin newButton"
                                                style={{ marginRight: 10 }}
                                                id="submitbtn2"
                                                onClick={() => deleteAddress(item.srNo)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} style={{ marginRight: "5px" }} />
                                            </button> */}
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                    <hr />
                    <Row>
                        <Col className='text-center'>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={saveWtAddress}
                            >
                                <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                Save
                            </button>
                            {flag2 !== 'edit' && (
                                <button
                                    className="btn btn-outline-danger btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    onClick={handleClear}
                                >
                                    <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                    Clear
                                </button>
                            )}
                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={back}
                            >
                                <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: "5px" }} />
                                Back
                            </button>
                        </Col>
                    </Row>



                    <Modal Modal isOpen={isModalOpenForAddress} onClose={closeModalOpenForAddress} toggle={closeModalOpenForAddress} style={{ maxWidth: '900px', wioverflow: '-moz-hidden-unscrollable' }}>

                        <ModalHeader toggle={closeModalOpenForAddress} style={{
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
                            /> Add Address</h5>

                        </ModalHeader>
                        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                            <Row>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label className="partyFontSize">Address1</Label><span style={{ color: 'red' }}>*</span>
                                        <Input
                                            type="text"
                                            name="address1"
                                            id='address1'
                                            className="form-control inputField"
                                            maxLength={100}
                                            value={addressDetails.address1}
                                            onChange={handleAddressChange}
                                        />
                                        <div style={{ color: 'red' }} className="error-message">{formErrors1.address1}</div>
                                    </FormGroup>
                                </Col>

                                <Col md={4}>
                                    <FormGroup>
                                        <Label className="partyFontSize">Address2</Label>
                                        <Input
                                            type="text"
                                            name="address2"
                                            id='address2'
                                            className="form-control inputField"
                                            maxLength={100}
                                            value={addressDetails.address2}
                                            onChange={handleAddressChange}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md={4}>
                                    <FormGroup>
                                        <Label className="partyFontSize">Address3</Label>
                                        <Input
                                            type="text"
                                            name="address3"
                                            id='address3'
                                            className="form-control inputField"
                                            maxLength={100}
                                            value={addressDetails.address3}
                                            onChange={handleAddressChange}
                                        />
                                    </FormGroup>
                                </Col>

                            </Row>
                            <Row>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label className="partyFontSize">City</Label>
                                        <Input
                                            type="text"
                                            name="city"
                                            id='city'
                                            className="form-control inputField"
                                            maxLength={50}
                                            value={addressDetails.city}
                                            onChange={handleAddressChange}
                                        />

                                    </FormGroup>
                                </Col>

                                <Col md={4}>
                                    <FormGroup>
                                        <Label className="partyFontSize">Pin</Label><span style={{ color: 'red' }}>*</span>
                                        <Input
                                            type="text"
                                            name="pin"
                                            id='pin'
                                            className="form-control inputField"
                                            maxLength={6}
                                            value={addressDetails.pin}
                                            onChange={handleAddressChange}
                                        />
                                        <div style={{ color: 'red' }} className="error-message">{formErrors1.pin}</div>
                                    </FormGroup>
                                </Col>

                                <Col md={4}>
                                    <FormGroup>
                                        <Label className="partyFontSize">State</Label><span style={{ color: 'red' }}>*</span>
                                        <Select
                                            options={branches}
                                            //  options={{ value: importerData.iecCode, label: importerData.importerName }}
                                            value={{ value: branchid, label: branchName }}
                                            onChange={handleBranchChange}
                                            id="state"
                                            name="state"
                                            isClearable
                                            styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                                                    boxShadow: 'none',
                                                    '&:hover': {
                                                        border: '1px solid #ccc',
                                                    },
                                                }),
                                                indicatorSeparator: () => ({
                                                    display: 'none',
                                                }),
                                                dropdownIndicator: () => ({
                                                    display: 'none',
                                                }),
                                            }}

                                        />
                                        <div style={{ color: 'red' }} className="error-message">{formErrors1.state}</div>
                                    </FormGroup>
                                </Col>

                            </Row>
                            <Row>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label className="partyFontSize">GST No</Label><span style={{ color: 'red' }}>*</span>
                                        <Input
                                            type="text"
                                            name="gstNo"
                                            id='gstNo'
                                            className="form-control inputField"
                                            maxLength={30}
                                            value={addressDetails.gstNo}
                                            onChange={handleAddressChange}
                                        />
                                        <div style={{ color: 'red' }} className="error-message">{formErrors1.gstNo}</div>
                                    </FormGroup>
                                </Col>

                                <Col md={4}>
                                    <FormGroup>
                                        <Label className="partyFontSize">Customer Type</Label>
                                        <Input
                                            type="select"
                                            name="customerType"
                                            id='customerType'
                                            className="form-control"
                                            value={addressDetails.customerType}
                                            onChange={handleAddressChange}
                                        >
                                            <option value="Registered">Registered</option>
                                            <option value="NA">NA</option>
                                            <option value="Export">Export</option>
                                            <option value="SEZ Without Payment">SEZ Without Payment</option>
                                            <option value="Exempted">Exempted</option>
                                            <option value="SEZ With Payment">SEZ With Payment</option>
                                        </Input>
                                    </FormGroup>
                                </Col>

                                <Col md={4}>
                                    <FormGroup>

                                        <Label className="partyFontSize">Default</Label><br />
                                        <Input
                                            type="checkbox"
                                            className="form-check-input radios"
                                            style={{ width: 20, height: 20, }}
                                            name='defaultChk'
                                            id='defaultChk'
                                            onChange={handleAddressCheckChange}
                                            checked={addressDetails.defaultChk === 'Y' ? true : false}
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
                                        onClick={saveAddress}
                                    >
                                        <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                        Save
                                    </button>
                                    {addressStatus !== 'edit' && (
                                        <button
                                            className="btn btn-outline-danger btn-margin newButton"
                                            style={{ marginRight: 10 }}
                                            id="submitbtn2"
                                            onClick={handleAddressClear}
                                        >
                                            <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                            Clear
                                        </button>
                                    )}
                                </Col>
                            </Row>
                        </ModalBody>
                    </Modal>
                </CardBody>
            </Card>

        </div>
    )
}
