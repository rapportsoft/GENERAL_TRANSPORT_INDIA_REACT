import AuthContext from "../Components/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faRefresh,
    faSave,
    faCalendarAlt,
    faAdd,
    faPrint,
    faTruck,
    faBraille,
    faTicket,
    faTruckFast,
    faLocation,
    faXmark,
    faPlus,
    faTrash,
    faGavel,
    faPercent,
    faHandHoldingDollar,
    faFileContract,
    faShieldAlt,
    faStamp,
    faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/style.css";
import "../Components/Style.css";
import useAxios from "../Components/useAxios";
import CFSService from "../service/CFSService";
import { toast } from "react-toastify";
import moment from "moment";
import ipaddress from "../Components/IpAddress";
import {
    Card,
    CardBody,
    Row,
    Col,
    FormGroup,
    Modal,
    ModalHeader,
    ModalBody,
    Input,
    FormFeedback,
    Table,
    Label,
} from "reactstrap";
import { Button, Pagination } from "react-bootstrap";
import { format } from "date-fns";
import { CatchingPokemonSharp } from "@mui/icons-material";
import Swal from "sweetalert2";

export default function CustomValuation({ igm, igmLineNo, igmTrans, blNo, id1, id2, id3, acttab, listOfData, flag, onRequest, aucData, searchFlag }) {
    const navigate = useNavigate();
    const axios = useAxios();
    const { isAuthenticated } = useContext(AuthContext);

    // If the user is not authenticated, redirect to the login page
    useEffect(() => {
        if (!isAuthenticated) {
            navigate(
                "/login?message=You need to be authenticated to access this page."
            );
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
        userRights,
    } = useContext(AuthContext);

    const styles = {
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
        },
    };

    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const queryParams = new URLSearchParams(location.search);
    const processId = queryParams.get("process_id");

    const foundRights =
        role !== "ROLE_ADMIN"
            ? userRights.find((item) => item.process_Id === processId)
            : null;
    const allowCreate = foundRights?.allow_Create === "Y";
    const allowRead = foundRights?.allow_Read === "Y";
    const allowEdit = foundRights?.allow_Update === "Y";
    const allowDelete = foundRights?.allow_Delete === "Y";

    const [formData, setFormData] = useState({
        companyId: "",
        branchId: "",
        profitcentreId: "",
        noticeId: "",
        noticeAmndNo: "",
        finalNoticeId: "",
        noticeType: "",
        transType: "",
        noticeDate: null,
        igmTransId: "",
        igmTransDate: null,
        igmNo: "",
        igmDate: null,
        igmLineNo: "",
        viaNo: "",
        shift: "Day",
        source: "",
        boeNo: "",
        boeDate: null,
        vessel: "",
        sa: "",
        importerName: "",
        importerAddress1: "",
        importerAddress2: "",
        importerAddress3: "",
        notifyParty: "",
        notifyPartyAddress1: "",
        notifyPartyAddress2: "",
        notifyPartyAddress3: "",
        commodityDescription: "",
        noOfPackages: 0,
        actualNoOfPackages: 0,
        typeOfPackage: "",
        grossWt: 0,
        uom: "",
        blNo: "",
        blDate: null,
        assessiableAvailable: "",
        accessableValueAsValuation: 0,
        rateOfDuty: 0,
        amtOfDuty: 0,
        duty: 0,
        mop: 0,
        pmv: 0,
        fairValueOfGoods: 0,
        bidId: "",
        bidDate: null,
        comments: "",
        cvStatus: "",
        cvCreatedBy: "",
        cvCreatedDate: null,
        cvApprovedBy: "",
        cvApprovedDate: null,
        createdBy: "",
        createdDate: null,
        editedBy: "",
        editedDate: null,
        approvedBy: "",
        approvedDate: null,
        status: "",
        pol: "",
        fileNo: "",
        lotNo: "",
        hsnNo: "",
        auctionStatus: "",
        fileStatus: "",
        tcs: 0,
        igst: 0,
        sgst: 0,
        cgst: 0,
        auctionType: "",
        bidAmt: 0,
        stcStatus: "",
        acceptRejectStatus: "",
        gstApprovedDate: null,
        cmdApprovedDate: null,
        bidamtApprovedDate: null,
        stcApprovedDate: null,
        customeAcceptRejectDate: null,
        customeOutOfChargeDate: null,
    });

    const [containerData, setContainerData] = useState([{
        containerNo: "",
        containerSize: "",
        containerType: "",
        gateInDate: null,
        noOfPackages: "",
        grossWt: ""
    }])

    const [dutyUpdation, setDutyUpdation] = useState([{
        finalNoticeId: "",
        dutyType: "",
        dutyRate: "",
        dutyValue: "",
    }])

    const handleClear = () => {
        setDutyUpdation([{
            finalNoticeId: "",
            dutyType: "",
            dutyRate: "",
            dutyValue: "",
        }])
        setErrors([]);
        setContainerData([{
            containerNo: "",
            containerSize: "",
            containerType: "",
            gateInDate: null,
            noOfPackages: "",
            grossWt: ""
        }])

        setFormData({
            companyId: "",
            branchId: "",
            profitcentreId: "",
            noticeId: "",
            noticeAmndNo: "",
            finalNoticeId: "",
            noticeType: "",
            transType: "",
            noticeDate: null,
            igmTransId: "",
            igmTransDate: null,
            igmNo: "",
            igmDate: null,
            igmLineNo: "",
            viaNo: "",
            shift: "Day",
            source: "",
            boeNo: "",
            boeDate: null,
            vessel: "",
            sa: "",
            importerName: "",
            importerAddress1: "",
            importerAddress2: "",
            importerAddress3: "",
            notifyParty: "",
            notifyPartyAddress1: "",
            notifyPartyAddress2: "",
            notifyPartyAddress3: "",
            commodityDescription: "",
            noOfPackages: 0,
            actualNoOfPackages: 0,
            typeOfPackage: "",
            grossWt: 0,
            uom: "",
            blNo: "",
            blDate: null,
            assessiableAvailable: "",
            accessableValueAsValuation: 0,
            rateOfDuty: 0,
            amtOfDuty: 0,
            duty: 0,
            mop: 0,
            pmv: 0,
            fairValueOfGoods: 0,
            bidId: "",
            bidDate: null,
            comments: "",
            cvStatus: "",
            cvCreatedBy: "",
            cvCreatedDate: null,
            cvApprovedBy: "",
            cvApprovedDate: null,
            createdBy: "",
            createdDate: null,
            editedBy: "",
            editedDate: null,
            approvedBy: "",
            approvedDate: null,
            status: "",
            pol: "",
            fileNo: "",
            lotNo: "",
            hsnNo: "",
            auctionStatus: "",
            fileStatus: "",
            tcs: 0,
            igst: 0,
            sgst: 0,
            cgst: 0,
            auctionType: "",
            bidAmt: 0,
            stcStatus: "",
            acceptRejectStatus: "",
            gstApprovedDate: null,
            cmdApprovedDate: null,
            bidamtApprovedDate: null,
            stcApprovedDate: null,
            customeAcceptRejectDate: null,
            customeOutOfChargeDate: null,
        })
    }

    const handleDutyChange = (e, index, val1, val2) => {
        const { name, value } = e.target;
        let sanitizedValue = value;

        // Sanitize input for specific fields
        if (['dutyRate', 'dutyValue'].includes(name)) {
            sanitizedValue = handleInputChange(value, val1, val2);
        }

        setDutyUpdation(prevState => {
            const updatedData = [...prevState];

            // Check if dutyType already exists in the state
            if (name === 'dutyType') {
                const isDuplicate = updatedData.some(
                    (item, idx) => item.dutyType === sanitizedValue && idx !== index
                );

                if (isDuplicate) {
                    // toast.error('This duty type already exists!', {
                    //     autoClose: 800
                    // });
                    return prevState; // Do not update state
                }
            }

            updatedData[index] = {
                ...updatedData[index],
                [name]: sanitizedValue
            };
            return updatedData;
        });

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

    const handleChange = (e, val1, val2) => {
        const { name, value } = e.target;

        let sanitizeValue = value;

        if (['accessableValueAsValuation', 'mop', 'rateOfDuty', 'amtOfDuty', 'duty', 'fairValueOfGoods', 'pmv', 'tcs', 'igst', 'cgst', 'sgst', 'bidAmt'].includes(name)) {
            sanitizeValue = handleInputChange(value, val1, val2);
        }

        setFormData((prevState) => ({
            ...prevState,
            [name]: sanitizeValue,
        }));
    };

    const [dutyType, setDutyType] = useState([]);
    const getDutyType = () => {
        const id = 'J00072';
        axios.get(`${ipaddress}jardetail/getJarDetail?companyId=${companyid}&jarId=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setDutyType(response.data);
            })
            .catch((error) => {

            })
    }

    useEffect(() => {
        if (acttab === 'P01404') {
            getDutyType();


            if (flag) {
                handleClear();
            }

            if (aucData !== null && aucData != {} && searchFlag === 'Y') {
                getSelectedData(aucData.noticeId, "search");
            }



        }

    }, [acttab, flag, aucData, searchFlag])

    const addDutyType = () => {
        const newRow = {
            finalNoticeId: "",
            dutyType: "",
            dutyRate: "",
            dutyValue: "",
        }

        setDutyUpdation([...dutyUpdation, newRow]); // Add the new row to the array

    }

    const removeDutyType = (index) => {
        setDutyUpdation(prevState => prevState.filter((_, i) => i !== index));

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
        axios.get(`${ipaddress}customValuation/getData?cid=${companyid}&bid=${branchId}&id=${id}`, {
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


    const getSelectedData = (id, searchFlag) => {
        axios.get(`${ipaddress}customValuation/getDataByNoticeId?cid=${companyid}&bid=${branchId}&id=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {

                const data = response.data;

                console.log('auction data ', data);

                const headerData = data.auctionData[0];

                setFormData({
                    companyId: "",
                    branchId: "",
                    profitcentreId: headerData[24] || "",
                    noticeId: headerData[0] || "",
                    noticeAmndNo: "",
                    finalNoticeId: headerData[0] || "",
                    noticeType: "",
                    transType: "",
                    noticeDate: headerData[1] === null ? null : new Date(headerData[1]),
                    igmTransId: headerData[6] || "",
                    igmTransDate: null,
                    igmNo: headerData[2] || "",
                    igmDate: headerData[3] === null ? null : new Date(headerData[3]),
                    igmLineNo: headerData[7] || "",
                    viaNo: headerData[10] || "",
                    shift: headerData[33] || "Day",
                    source: "",
                    boeNo: "",
                    boeDate: null,
                    vessel: headerData[11] || "",
                    sa: "",
                    importerName: headerData[12] || "",
                    importerAddress1: headerData[13] || "",
                    importerAddress2: headerData[14] || "",
                    importerAddress3: headerData[15] || "",
                    notifyParty: headerData[18] || "",
                    notifyPartyAddress1: headerData[19] || "",
                    notifyPartyAddress2: headerData[20] || "",
                    notifyPartyAddress3: headerData[21] || "",
                    commodityDescription: "",
                    noOfPackages: headerData[16] || 0,
                    actualNoOfPackages: 0,
                    typeOfPackage: headerData[17] || "",
                    grossWt: headerData[22] || 0,
                    uom: headerData[23] || "",
                    blNo: headerData[8] || "",
                    blDate: headerData[9] === null ? null : new Date(headerData[9]),
                    assessiableAvailable: headerData[29] || "",
                    accessableValueAsValuation: headerData[25] || 0,
                    rateOfDuty: headerData[27] || 0,
                    amtOfDuty: headerData[28] || 0,
                    duty: headerData[30] || 0,
                    mop: headerData[26] || 0,
                    pmv: headerData[32] || 0,
                    fairValueOfGoods: headerData[31] || 0,
                    bidId: "",
                    bidDate: null,
                    comments: "",
                    cvStatus: headerData[4] || "",
                    cvCreatedBy: headerData[5] || "",
                    cvCreatedDate: null,
                    cvApprovedBy: "",
                    cvApprovedDate: null,
                    createdBy: "",
                    createdDate: null,
                    editedBy: "",
                    editedDate: null,
                    approvedBy: "",
                    approvedDate: null,
                    status: "",
                    pol: "",
                    fileNo: headerData[34] || "",
                    lotNo: headerData[35] || "",
                    hsnNo: headerData[37] || "",
                    auctionStatus: headerData[36] || "",
                    fileStatus: headerData[38] || "",
                    tcs: headerData[45] || 0,
                    igst: headerData[46] || 0,
                    sgst: headerData[48] || 0,
                    cgst: headerData[47] || 0,
                    auctionType: headerData[49] || "",
                    bidAmt: headerData[50] || 0,
                    stcStatus: headerData[51] || "",
                    acceptRejectStatus: headerData[52] || "",
                    gstApprovedDate: null,
                    cmdApprovedDate: null,
                    bidamtApprovedDate: null,
                    stcApprovedDate: null,
                    customeAcceptRejectDate: null,
                    customeOutOfChargeDate: headerData[53] === null ? null : new Date(headerData[53]),
                });

                setContainerData(data.auctionData.map((item) => ({
                    containerNo: item[39] || "",
                    containerSize: item[40] || "",
                    containerType: item[41] || "",
                    gateInDate: item[42] === null ? null : new Date(item[42]),
                    noOfPackages: item[43] || "",
                    grossWt: item[44] || ""
                })))

                if (data.auctionDuty.length > 0) {
                    setDutyUpdation(data.auctionDuty.map((item) => ({
                        finalNoticeId: item[0] || "",
                        dutyType: item[1] || "",
                        dutyRate: item[2] || "",
                        dutyValue: item[3] || "",
                    })))
                }


                closeGateInModal();
            })
            .catch((error) => {

                if (searchFlag !== "search") {
                    toast.error(error.response.data, {
                        autoClose: 800
                    })
                }


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

    const saveCustomValuation = () => {


        if (formData.noticeId === '') {
            toast.error("Notice id is required.", {
                autoClose: 800
            })
            return;
        }

        if (formData.duty === '' || formData.duty <= 0) {
            toast.error("Duty is required.", {
                autoClose: 800
            })
            return;
        }

        if (formData.fairValueOfGoods === '' || formData.fairValueOfGoods <= 0) {
            toast.error("Fair value of goods is required.", {
                autoClose: 800
            })
            return;
        }

        setLoading(true);

        axios.post(`${ipaddress}customValuation/saveCustomValuation?cid=${companyid}&bid=${branchId}&user=${userId}`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setLoading(false);

                const data = response.data;

                console.log('auction data ', data);

                const headerData = data.auctionData[0];

                setFormData({
                    companyId: "",
                    branchId: "",
                    profitcentreId: headerData[24] || "",
                    noticeId: headerData[0] || "",
                    noticeAmndNo: "",
                    finalNoticeId: headerData[0] || "",
                    noticeType: "",
                    transType: "",
                    noticeDate: headerData[1] === null ? null : new Date(headerData[1]),
                    igmTransId: headerData[6] || "",
                    igmTransDate: null,
                    igmNo: headerData[2] || "",
                    igmDate: headerData[3] === null ? null : new Date(headerData[3]),
                    igmLineNo: headerData[7] || "",
                    viaNo: headerData[10] || "",
                    shift: headerData[33] || "Day",
                    source: "",
                    boeNo: "",
                    boeDate: null,
                    vessel: headerData[11] || "",
                    sa: "",
                    importerName: headerData[12] || "",
                    importerAddress1: headerData[13] || "",
                    importerAddress2: headerData[14] || "",
                    importerAddress3: headerData[15] || "",
                    notifyParty: headerData[18] || "",
                    notifyPartyAddress1: headerData[19] || "",
                    notifyPartyAddress2: headerData[20] || "",
                    notifyPartyAddress3: headerData[21] || "",
                    commodityDescription: "",
                    noOfPackages: headerData[16] || 0,
                    actualNoOfPackages: 0,
                    typeOfPackage: headerData[17] || "",
                    grossWt: headerData[22] || 0,
                    uom: headerData[23] || "",
                    blNo: headerData[8] || "",
                    blDate: headerData[9] === null ? null : new Date(headerData[9]),
                    assessiableAvailable: headerData[29] || "",
                    accessableValueAsValuation: headerData[25] || 0,
                    rateOfDuty: headerData[27] || 0,
                    amtOfDuty: headerData[28] || 0,
                    duty: headerData[30] || 0,
                    mop: headerData[26] || 0,
                    pmv: headerData[32] || 0,
                    fairValueOfGoods: headerData[31] || 0,
                    bidId: "",
                    bidDate: null,
                    comments: "",
                    cvStatus: headerData[4] || "",
                    cvCreatedBy: headerData[5] || "",
                    cvCreatedDate: null,
                    cvApprovedBy: "",
                    cvApprovedDate: null,
                    createdBy: "",
                    createdDate: null,
                    editedBy: "",
                    editedDate: null,
                    approvedBy: "",
                    approvedDate: null,
                    status: "",
                    pol: "",
                    fileNo: headerData[34] || "",
                    lotNo: headerData[35] || "",
                    hsnNo: headerData[37] || "",
                    auctionStatus: headerData[36] || "",
                    fileStatus: headerData[38] || "",
                    tcs: headerData[45] || 0,
                    igst: headerData[46] || 0,
                    sgst: headerData[48] || 0,
                    cgst: headerData[47] || 0,
                    auctionType: headerData[49] || "",
                    bidAmt: headerData[50] || 0,
                    stcStatus: headerData[51] || "",
                    acceptRejectStatus: headerData[52] || "",
                    gstApprovedDate: null,
                    cmdApprovedDate: null,
                    bidamtApprovedDate: null,
                    stcApprovedDate: null,
                    customeAcceptRejectDate: null,
                    customeOutOfChargeDate: headerData[53] === null ? null : new Date(headerData[53]),
                });

                setContainerData(data.auctionData.map((item) => ({
                    containerNo: item[39] || "",
                    containerSize: item[40] || "",
                    containerType: item[41] || "",
                    gateInDate: item[42] === null ? null : new Date(item[42]),
                    noOfPackages: item[43] || "",
                    grossWt: item[44] || ""
                })))

                if (data.auctionDuty.length > 0) {
                    setDutyUpdation(data.auctionDuty.map((item) => ({
                        finalNoticeId: item[0] || "",
                        dutyType: item[1] || "",
                        dutyRate: item[2] || "",
                        dutyValue: item[3] || "",
                    })))
                }

                toast.success('Data save successfully!!', {
                    autoClose: 800
                })

                onRequest();

            })
            .catch((error) => {
                setLoading(false);

                toast.error(error.response.data, {
                    autoClose: 800
                })
            })
    }

    const saveCustomValuationByStatus = (status) => {


        if (formData.noticeId === '') {
            toast.error("Notice id is required.", {
                autoClose: 800
            })
            return;
        }

        if (status === 'GST_PERCENT') {

            if (formData.tcs === '') {
                toast.error("TCS is required.", {
                    autoClose: 800
                })
                return;
            }
            if (formData.cgst === '') {
                toast.error("CGST is required.", {
                    autoClose: 800
                })
                return;
            }
            if (formData.sgst === '') {
                toast.error("SGST is required.", {
                    autoClose: 800
                })
                return;
            }
            if (formData.igst === '') {
                toast.error("IGST is required.", {
                    autoClose: 800
                })
                return;
            }
        }
        else if (status === 'AUCTION_CMD') {
            if (formData.auctionType === '') {
                toast.error("Auction type is required.", {
                    autoClose: 800
                })
                return;
            }
        }
        else if (status === 'HIGH_BID') {
            if (formData.bidAmt === '') {
                toast.error("Bid amount is required.", {
                    autoClose: 800
                })
                return;
            }
        }
        else if (status === 'STC_CONFIRMATION') {
            if (formData.stcStatus === '') {
                toast.error("STC status is required.", {
                    autoClose: 800
                })
                return;
            }
        }
        else if (status === 'CUSTOM_APPROVE') {
            if (formData.acceptRejectStatus === '') {
                toast.error("Accept/Reject is required.", {
                    autoClose: 800
                })
                return;
            }
        }
        else if (status === 'CUSTOM_OOC') {
            if (formData.customeOutOfChargeDate === null) {
                toast.error("Custom OOC date is required.", {
                    autoClose: 800
                })
                return;
            }
        }

        setLoading(true);

        axios.post(`${ipaddress}customValuation/saveCustomValuationAsPerStatus?cid=${companyid}&bid=${branchId}&user=${userId}&status=${status}`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setLoading(false);

                const data = response.data;

                console.log('auction data ', data);

                const headerData = data.auctionData[0];

                setFormData({
                    companyId: "",
                    branchId: "",
                    profitcentreId: headerData[24] || "",
                    noticeId: headerData[0] || "",
                    noticeAmndNo: "",
                    finalNoticeId: headerData[0] || "",
                    noticeType: "",
                    transType: "",
                    noticeDate: headerData[1] === null ? null : new Date(headerData[1]),
                    igmTransId: headerData[6] || "",
                    igmTransDate: null,
                    igmNo: headerData[2] || "",
                    igmDate: headerData[3] === null ? null : new Date(headerData[3]),
                    igmLineNo: headerData[7] || "",
                    viaNo: headerData[10] || "",
                    shift: headerData[33] || "Day",
                    source: "",
                    boeNo: "",
                    boeDate: null,
                    vessel: headerData[11] || "",
                    sa: "",
                    importerName: headerData[12] || "",
                    importerAddress1: headerData[13] || "",
                    importerAddress2: headerData[14] || "",
                    importerAddress3: headerData[15] || "",
                    notifyParty: headerData[18] || "",
                    notifyPartyAddress1: headerData[19] || "",
                    notifyPartyAddress2: headerData[20] || "",
                    notifyPartyAddress3: headerData[21] || "",
                    commodityDescription: "",
                    noOfPackages: headerData[16] || 0,
                    actualNoOfPackages: 0,
                    typeOfPackage: headerData[17] || "",
                    grossWt: headerData[22] || 0,
                    uom: headerData[23] || "",
                    blNo: headerData[8] || "",
                    blDate: headerData[9] === null ? null : new Date(headerData[9]),
                    assessiableAvailable: headerData[29] || "",
                    accessableValueAsValuation: headerData[25] || 0,
                    rateOfDuty: headerData[27] || 0,
                    amtOfDuty: headerData[28] || 0,
                    duty: headerData[30] || 0,
                    mop: headerData[26] || 0,
                    pmv: headerData[32] || 0,
                    fairValueOfGoods: headerData[31] || 0,
                    bidId: "",
                    bidDate: null,
                    comments: "",
                    cvStatus: headerData[4] || "",
                    cvCreatedBy: headerData[5] || "",
                    cvCreatedDate: null,
                    cvApprovedBy: "",
                    cvApprovedDate: null,
                    createdBy: "",
                    createdDate: null,
                    editedBy: "",
                    editedDate: null,
                    approvedBy: "",
                    approvedDate: null,
                    status: "",
                    pol: "",
                    fileNo: headerData[34] || "",
                    lotNo: headerData[35] || "",
                    hsnNo: headerData[37] || "",
                    auctionStatus: headerData[36] || "",
                    fileStatus: headerData[38] || "",
                    tcs: headerData[45] || 0,
                    igst: headerData[46] || 0,
                    sgst: headerData[48] || 0,
                    cgst: headerData[47] || 0,
                    auctionType: headerData[49] || "",
                    bidAmt: headerData[50] || 0,
                    stcStatus: headerData[51] || "",
                    acceptRejectStatus: headerData[52] || "",
                    gstApprovedDate: null,
                    cmdApprovedDate: null,
                    bidamtApprovedDate: null,
                    stcApprovedDate: null,
                    customeAcceptRejectDate: null,
                    customeOutOfChargeDate: headerData[53] === null ? null : new Date(headerData[53]),
                });

                setContainerData(data.auctionData.map((item) => ({
                    containerNo: item[39] || "",
                    containerSize: item[40] || "",
                    containerType: item[41] || "",
                    gateInDate: item[42] === null ? null : new Date(item[42]),
                    noOfPackages: item[43] || "",
                    grossWt: item[44] || ""
                })))

                if (data.auctionDuty.length > 0) {
                    setDutyUpdation(data.auctionDuty.map((item) => ({
                        finalNoticeId: item[0] || "",
                        dutyType: item[1] || "",
                        dutyRate: item[2] || "",
                        dutyValue: item[3] || "",
                    })))
                }

                toast.success('Data save successfully!!', {
                    autoClose: 800
                })

            })
            .catch((error) => {
                setLoading(false);

                toast.error(error.response.data, {
                    autoClose: 800
                })
            })
    }

    const saveDutyUpdation = () => {
        if (formData.noticeId === '') {
            toast.error("Notice id is required.", {
                autoClose: 800
            })
            return;
        }

        setErrors([]);

        let newErrors = dutyUpdation.map(() => ({}));

        dutyUpdation.forEach((data, index) => {
            let rowErrors = {};
            if (!data.dutyType) rowErrors.dutyType = "Duty type is required.";
            if (!data.dutyValue || data.dutyValue <= 0) rowErrors.dutyValue = "Duty value is required.";
            if (!data.dutyRate || data.dutyRate <= 0) rowErrors.dutyRate = "Duty rate is required.";

            if (Object.keys(rowErrors).length > 0) {
                newErrors[index] = rowErrors;
            }
        });

        // Check if any errors exist
        const hasErrors = newErrors.some(errorObj => Object.keys(errorObj).length > 0);

        if (hasErrors) {
            setErrors(newErrors);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            });
            return;
        }

        setLoading(true);

        axios.post(`${ipaddress}customValuation/saveDutyUpdation?cid=${companyid}&bid=${branchId}&user=${userId}&noticeId=${formData.noticeId}`, dutyUpdation, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setLoading(false);

                const data = response.data;

                console.log('auction data ', data);

                const headerData = data.auctionData[0];

                setFormData({
                    companyId: "",
                    branchId: "",
                    profitcentreId: headerData[24] || "",
                    noticeId: headerData[0] || "",
                    noticeAmndNo: "",
                    finalNoticeId: headerData[0] || "",
                    noticeType: "",
                    transType: "",
                    noticeDate: headerData[1] === null ? null : new Date(headerData[1]),
                    igmTransId: headerData[6] || "",
                    igmTransDate: null,
                    igmNo: headerData[2] || "",
                    igmDate: headerData[3] === null ? null : new Date(headerData[3]),
                    igmLineNo: headerData[7] || "",
                    viaNo: headerData[10] || "",
                    shift: headerData[33] || "Day",
                    source: "",
                    boeNo: "",
                    boeDate: null,
                    vessel: headerData[11] || "",
                    sa: "",
                    importerName: headerData[12] || "",
                    importerAddress1: headerData[13] || "",
                    importerAddress2: headerData[14] || "",
                    importerAddress3: headerData[15] || "",
                    notifyParty: headerData[18] || "",
                    notifyPartyAddress1: headerData[19] || "",
                    notifyPartyAddress2: headerData[20] || "",
                    notifyPartyAddress3: headerData[21] || "",
                    commodityDescription: "",
                    noOfPackages: headerData[16] || 0,
                    actualNoOfPackages: 0,
                    typeOfPackage: headerData[17] || "",
                    grossWt: headerData[22] || 0,
                    uom: headerData[23] || "",
                    blNo: headerData[8] || "",
                    blDate: headerData[9] === null ? null : new Date(headerData[9]),
                    assessiableAvailable: headerData[29] || "",
                    accessableValueAsValuation: headerData[25] || 0,
                    rateOfDuty: headerData[27] || 0,
                    amtOfDuty: headerData[28] || 0,
                    duty: headerData[30] || 0,
                    mop: headerData[26] || 0,
                    pmv: headerData[32] || 0,
                    fairValueOfGoods: headerData[31] || 0,
                    bidId: "",
                    bidDate: null,
                    comments: "",
                    cvStatus: headerData[4] || "",
                    cvCreatedBy: headerData[5] || "",
                    cvCreatedDate: null,
                    cvApprovedBy: "",
                    cvApprovedDate: null,
                    createdBy: "",
                    createdDate: null,
                    editedBy: "",
                    editedDate: null,
                    approvedBy: "",
                    approvedDate: null,
                    status: "",
                    pol: "",
                    fileNo: headerData[34] || "",
                    lotNo: headerData[35] || "",
                    hsnNo: headerData[37] || "",
                    auctionStatus: headerData[36] || "",
                    fileStatus: headerData[38] || "",
                    tcs: headerData[45] || 0,
                    igst: headerData[46] || 0,
                    sgst: headerData[48] || 0,
                    cgst: headerData[47] || 0,
                    auctionType: headerData[49] || "",
                    bidAmt: headerData[50] || 0,
                    stcStatus: headerData[51] || "",
                    acceptRejectStatus: headerData[52] || "",
                    gstApprovedDate: null,
                    cmdApprovedDate: null,
                    bidamtApprovedDate: null,
                    stcApprovedDate: null,
                    customeAcceptRejectDate: null,
                    customeOutOfChargeDate: headerData[53] === null ? null : new Date(headerData[53]),
                });

                setContainerData(data.auctionData.map((item) => ({
                    containerNo: item[39] || "",
                    containerSize: item[40] || "",
                    containerType: item[41] || "",
                    gateInDate: item[42] === null ? null : new Date(item[42]),
                    noOfPackages: item[43] || "",
                    grossWt: item[44] || ""
                })))

                if (data.auctionDuty.length > 0) {
                    setDutyUpdation(data.auctionDuty.map((item) => ({
                        finalNoticeId: item[0] || "",
                        dutyType: item[1] || "",
                        dutyRate: item[2] || "",
                        dutyValue: item[3] || "",
                    })))
                }

                toast.success('Data save successfully!!', {
                    autoClose: 800
                })

            })
            .catch((error) => {
                setLoading(false);

                toast.error(error.response.data, {
                    autoClose: 800
                })
            })
    }

    return (
        <div>
            {loading && (
                <div className="loader" style={styles.overlay}>
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
            )}

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
                    /> Search Auction Data</h5>



                </ModalHeader>
                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Search By All Fields
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
                                    <th scope="col">Auction Notice Id</th>
                                    <th scope="col">Auction Notice Date	</th>
                                    <th scope="col">IGM No</th>
                                    <th scope="col">IGM Date</th>
                                    <th scope="col">IGM Trans Id</th>
                                    <th scope="col">IGM Line No</th>
                                    <th scope="col">Vessel</th>
                                    <th scope="col">Profitcentre</th>
                                    <th scope="col">Importer Name</th>
                                    <th scope="col">BL No</th>

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
                                    <th scope="col"></th>
                                    <th scope="col"></th>

                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input type="radio" onChange={() => getSelectedData(item[0])} name="radioGroup" />
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
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Auction Notice Id</label>
                        <Row>
                            <Col md={9}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    id="noticeId"
                                    name='noticeId'
                                    value={formData.noticeId}
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
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Auction Notice date</label>
                        <div style={{ position: 'relative' }}>
                            <DatePicker
                                selected={formData.noticeDate}
                                disabled
                                id='noticeDate'
                                name='noticeDate'
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
                        <label className="forlabel bold-label" htmlFor="igmLineNo">IGM No</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="igmNo"
                            name='igmNo'
                            value={formData.igmNo}
                            disabled
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">IGM Date</label>
                        <div style={{ position: 'relative' }}>
                            <DatePicker
                                selected={formData.igmDate}
                                disabled
                                id='igmDate'
                                name='igmDate'
                                showTimeInput
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
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Status</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="cvStatus"
                            name='cvStatus'
                            value={formData.cvStatus === 'N' ? 'New' : formData.cvStatus === 'A' ? 'Approved' : formData.cvStatus}
                            disabled
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Created By</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="cvCreatedBy"
                            name='cvCreatedBy'
                            value={formData.cvCreatedBy}
                            disabled
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">IGM Trans Id</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="igmTransId"
                            name='igmTransId'
                            value={formData.igmTransId}
                            disabled
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">IGM Line No</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="igmLineNo"
                            name='igmLineNo'
                            value={formData.igmLineNo}
                            disabled
                        />
                    </FormGroup>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">BL No</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="blNo"
                            name='blNo'
                            value={formData.blNo}
                            disabled
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">BL Date</label>
                        <div style={{ position: 'relative' }}>
                            <DatePicker
                                selected={formData.blDate}
                                disabled
                                id='blDate'
                                name='blDate'
                                showTimeInput
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
                        <label className="forlabel bold-label" htmlFor="igmLineNo">VIA No</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="viaNo"
                            name='viaNo'
                            value={formData.viaNo}
                            disabled
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Vessel</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="vessel"
                            name='vessel'
                            value={formData.vessel}
                            disabled
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Importer Name</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="importerName"
                            name='importerName'
                            value={formData.importerName}
                            disabled
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Importer Address1</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="importerAddress1"
                            name='importerAddress1'
                            value={formData.importerAddress1}
                            disabled
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Importer Address2</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="importerAddress2"
                            name='importerAddress2'
                            value={formData.importerAddress2}
                            disabled
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Importer Address3</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="importerAddress3"
                            name='importerAddress3'
                            value={formData.importerAddress3}
                            disabled
                        />
                    </FormGroup>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">No Of Packages</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="noOfPackages"
                            name='noOfPackages'
                            value={formData.noOfPackages}
                            disabled
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Package Type</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="typeOfPackage"
                            name='typeOfPackage'
                            value={formData.typeOfPackage}
                            disabled
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Notify Party Name</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="notifyParty"
                            name='notifyParty'
                            value={formData.notifyParty}
                            disabled
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Notify Party Address1</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="notifyPartyAddress1"
                            name='notifyPartyAddress1'
                            value={formData.notifyPartyAddress1}
                            disabled
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Notify Party Address2</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="notifyPartyAddress2"
                            name='notifyPartyAddress2'
                            value={formData.notifyPartyAddress2}

                            disabled
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Notify Party Address3</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="notifyPartyAddress3"
                            name='notifyPartyAddress3'
                            value={formData.notifyPartyAddress3}

                            disabled
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Gross Wt</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="grossWt"
                            name='grossWt'
                            value={formData.grossWt}

                            disabled
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">UOM</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="uom"
                            name='uom'
                            value={formData.uom}

                            disabled
                        />
                    </FormGroup>
                </Col>


            </Row>

            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Profitcentre</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="profitcentreId"
                            name='profitcentreId'
                            value={formData.profitcentreId}

                            disabled
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Accessable Value</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="accessableValueAsValuation"
                            name='accessableValueAsValuation'
                            value={formData.accessableValueAsValuation}
                            onChange={(e) => handleChange(e, 13, 2)}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">MOP</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="mop"
                            name='mop'
                            value={formData.mop}
                            onChange={(e) => handleChange(e, 13, 2)}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Rate Of Duty</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="rateOfDuty"
                            name='rateOfDuty'
                            value={formData.rateOfDuty}
                            onChange={(e) => handleChange(e, 13, 2)}

                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Amt Of Duty</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="amtOfDuty"
                            name='amtOfDuty'
                            value={formData.amtOfDuty}
                            onChange={(e) => handleChange(e, 13, 2)}

                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Assessiable/Available</label>
                        <Input
                            className="form-control"
                            type="checkbox"
                            id="assessiableAvailable"
                            name='assessiableAvailable'
                            style={{ height: 25 }}
                            checked={formData.assessiableAvailable === 'Y'}
                            onChange={(e) => setFormData({
                                ...formData,
                                assessiableAvailable: e.target.checked ? 'Y' : 'N'
                            })}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Duty <span style={{ color: 'red' }}>*</span></label>
                        <Input
                            className="form-control"
                            type="text"
                            id="duty"
                            name='duty'
                            value={formData.duty}
                            onChange={(e) => handleChange(e, 13, 2)}


                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Fair Value Of Goods <span style={{ color: 'red' }}>*</span></label>
                        <Input
                            className="form-control"
                            type="text"
                            id="fairValueOfGoods"
                            name='fairValueOfGoods'
                            value={formData.fairValueOfGoods}
                            onChange={(e) => handleChange(e, 13, 2)}

                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">PMV</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="pmv"
                            name='pmv'
                            value={formData.pmv}
                            onChange={(e) => handleChange(e, 13, 2)}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Shift</label>
                        <Input
                            className="form-control"
                            type="select"
                            id="shift"
                            name='shift'
                            value={formData.shift}
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
                        <label className="forlabel bold-label" htmlFor="igmLineNo">File No</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="fileNo"
                            name='fileNo'
                            value={formData.fileNo}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Lot No</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="lotNo"
                            name='lotNo'
                            value={formData.lotNo}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Ready for Auction</label>
                        <Input
                            className="form-control"
                            type="select"
                            id="auctionStatus"
                            name='auctionStatus'
                            value={formData.auctionStatus}
                            onChange={handleChange}
                        >
                            <option value=""></option>
                            <option value="Y">Yes</option>
                            <option value="N">No</option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">CTH No</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="hsnNo"
                            name='hsnNo'
                            value={formData.hsnNo}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">File Status</label>
                        <Input
                            className="form-control"
                            type="select"
                            id="fileStatus"
                            name='fileStatus'
                            value={formData.fileStatus}
                            onChange={handleChange}
                        >
                            <option value=""></option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </Input>
                    </FormGroup>
                </Col>
                {formData.cvStatus === 'A' && (
                    <>
                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="igmLineNo">TCS <span style={{ color: 'red' }}>*</span></label>
                                <Input
                                    className="form-control"
                                    type="text"
                                    id="tcs"
                                    name='tcs'
                                    value={formData.tcs}
                                    onChange={(e) => handleChange(e, 10, 2)}

                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="igmLineNo">IGST <span style={{ color: 'red' }}>*</span></label>
                                <Input
                                    className="form-control"
                                    type="text"
                                    id="igst"
                                    name='igst'
                                    value={formData.igst}
                                    onChange={(e) => handleChange(e, 10, 2)}

                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="igmLineNo">CGST <span style={{ color: 'red' }}>*</span></label>
                                <Input
                                    className="form-control"
                                    type="text"
                                    id="cgst"
                                    name='cgst'
                                    value={formData.cgst}
                                    onChange={(e) => handleChange(e, 10, 2)}

                                />
                            </FormGroup>
                        </Col>
                    </>
                )}
            </Row>
            {formData.cvStatus === 'A' && (
                <Row>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="igmLineNo">SGST <span style={{ color: 'red' }}>*</span></label>
                            <Input
                                className="form-control"
                                type="text"
                                id="sgst"
                                name='sgst'
                                value={formData.sgst}
                                onChange={(e) => handleChange(e, 10, 2)}

                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="igmLineNo">Auction Type <span style={{ color: 'red' }}>*</span></label>
                            <Input
                                className="form-control"
                                type="select"
                                id="auctionType"
                                name='auctionType'
                                value={formData.auctionType}
                                onChange={handleChange}
                            >
                                <option value=""></option>
                                <option value="E-auction">E-auction</option>
                                <option value="Tender">Tender</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="igmLineNo">Bid Amount <span style={{ color: 'red' }}>*</span></label>
                            <Input
                                className="form-control"
                                type="text"
                                id="bidAmt"
                                name='bidAmt'
                                value={formData.bidAmt}
                                onChange={(e) => handleChange(e, 13, 2)}

                            />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="igmLineNo">STC Status <span style={{ color: 'red' }}>*</span></label>
                            <Input
                                className="form-control"
                                type="select"
                                id="stcStatus"
                                name='stcStatus'
                                value={formData.stcStatus}
                                onChange={handleChange}
                            >
                                <option value=""></option>
                                <option value="Y">Yes</option>
                                <option value="N">No</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="igmLineNo">Accept/Reject <span style={{ color: 'red' }}>*</span></label>
                            <Input
                                className="form-control"
                                type="select"
                                id="acceptRejectStatus"
                                name='acceptRejectStatus'
                                value={formData.acceptRejectStatus}
                                onChange={handleChange}
                            >
                                <option value=""></option>
                                <option value="Y">Yes</option>
                                <option value="N">No</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="igmLineNo">Custom OOC Date <span style={{ color: 'red' }}>*</span></label>
                            <div style={{ position: 'relative' }}>
                                <DatePicker
                                    selected={formData.customeOutOfChargeDate}
                                    onChange={(date) => setFormData({
                                        ...formData,
                                        customeOutOfChargeDate: date
                                    })}
                                    id='customeOutOfChargeDate'
                                    name='customeOutOfChargeDate'
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
                </Row>
            )}
            <Row>
                <Col className="text-center">
                    <button
                        className="btn btn-outline-primary btn-margin newButton"
                        style={{ marginRight: 10 }}
                        id="submitbtn2"
                        onClick={saveCustomValuation}
                        disabled={formData.cvStatus === 'A'}
                    >
                        <FontAwesomeIcon icon={faSave} style={{ marginRight: 5 }} />
                        Save

                    </button>
                    <button
                        className="btn btn-outline-danger btn-margin newButton"
                        style={{ marginRight: 10 }}
                        onClick={handleClear}
                        id="submitbtn2"
                    >
                        <FontAwesomeIcon icon={faRefresh} style={{ marginRight: 5 }} />
                        Clear
                    </button>
                    {formData.cvStatus === 'A' && (
                        <>
                            <button
                                className="btn btn-outline-secondary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={() => saveCustomValuationByStatus('GST_PERCENT')}
                            >
                                <FontAwesomeIcon icon={faPercent} style={{ marginRight: 5 }} />
                                GST PERCENT
                            </button>
                            <button
                                className="btn btn-outline-secondary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={() => saveCustomValuationByStatus('AUCTION_CMD')}

                            >
                                <FontAwesomeIcon icon={faGavel} style={{ marginRight: 5 }} />
                                Auction CMD Collection
                            </button>
                            <button
                                className="btn btn-outline-secondary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={() => saveCustomValuationByStatus('HIGH_BID')}
                            >
                                <FontAwesomeIcon icon={faHandHoldingDollar} style={{ marginRight: 5 }} />
                                High Bid Amount
                            </button>
                            <button
                                className="btn btn-outline-secondary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={() => saveCustomValuationByStatus('STC_CONFIRMATION')}

                            >
                                <FontAwesomeIcon icon={faFileContract} style={{ marginRight: 5 }} />
                                STC Confirmation
                            </button>
                            <button
                                className="btn btn-outline-secondary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={() => saveCustomValuationByStatus('CUSTOM_APPROVE')}

                            >
                                <FontAwesomeIcon icon={faStamp} style={{ marginRight: 5 }} />
                                Custom Approve
                            </button>
                            <button
                                className="btn btn-outline-secondary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={() => saveCustomValuationByStatus('CUSTOM_OOC')}

                            >
                                <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: 5 }} />
                                Custom Out Of Charge
                            </button>
                        </>
                    )}
                </Col>
            </Row>

            <div className="mt-3 table-responsive">
                <table className="table table-bordered table-hover tableHeader">
                    <thead className="tableHeader">
                        <tr className="text-center">
                            <th scope="col" colSpan={6}>Custom Valuation</th>
                        </tr>
                        <tr className="text-center">
                            <th scope="col">Container No</th>
                            <th scope="col">Size</th>
                            <th scope="col">Type</th>
                            <th scope="col" style={{ width: 250 }}>Gate In Date</th>
                            <th scope="col">No Of Packages</th>
                            <th scope="col">Gross Wt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {containerData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.containerNo}</td>
                                <td>{item.containerSize}</td>
                                <td>{item.containerType}</td>
                                <td>
                                    <div style={{ position: 'relative' }}>
                                        <DatePicker
                                            selected={item.gateInDate}
                                            disabled
                                            id='gateInDate'
                                            name='gateInDate'
                                            showTimeInput
                                            dateFormat="dd/MM/yyyy"
                                            className="form-control border-right-0 InputField"
                                            customInput={<Input style={{ width: '100%' }} />}
                                            wrapperClassName="custom-react-datepicker-wrapper"
                                        />
                                        <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                    </div>
                                </td>
                                <td>{item.noOfPackages}</td>
                                <td>{item.grossWt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {formData.cvStatus === 'A' && (


                <>
                    <Row className="text-center" style={{ marginTop: 25 }}>
                        <Col>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={saveDutyUpdation}
                            >
                                <FontAwesomeIcon icon={faSave} style={{ marginRight: 5 }} />
                                Save Duty Data

                            </button>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                onClick={addDutyType}
                                id="submitbtn2"

                            >
                                <FontAwesomeIcon icon={faAdd} style={{ marginRight: 5 }} />
                                Add Duty Type
                            </button>
                        </Col>
                    </Row>

                    <div className="mt-3 table-responsive">
                        <table className="table table-bordered table-hover tableHeader">
                            <thead className="tableHeader">
                                <tr className="text-center">
                                    <th scope="col" colSpan={4}>BE/Duty Updation</th>
                                </tr>
                                <tr className="text-center">
                                    <th scope="col" style={{ width: 320 }}>Duty Type <span style={{ color: 'red' }}>*</span></th>
                                    <th scope="col">Duty Rate <span style={{ color: 'red' }}>*</span></th>
                                    <th scope="col">Duty Value <span style={{ color: 'red' }}>*</span></th>
                                    <th scope="col">Action </th>
                                </tr>
                                <tr className="text-center">
                                    <th scope="col"></th>
                                    <th scope="col">{dutyUpdation.reduce((total, item) => total + (parseFloat(item.dutyRate) || 0), 0)}                                    </th>
                                    <th scope="col">{dutyUpdation.reduce((total, item) => total + (parseFloat(item.dutyValue) || 0), 0)}</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {dutyUpdation.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Input
                                                className={`form-control  ${errors[index]?.dutyType ? 'error-border' : ''}`}
                                                type="select"
                                                id={`dutyType${index}`}
                                                name='dutyType'
                                                value={item.dutyType}
                                                onChange={(e) => handleDutyChange(e, index)}
                                                disabled={item.finalNoticeId !== ''}
                                            >
                                                <option value="">Select Duty Type</option>
                                                {dutyType.map((item, index) => (
                                                    <option key={index} value={item[0]}>{item[1]}</option>
                                                ))}
                                            </Input>
                                        </td>
                                        <td>
                                            <Input
                                                className={`form-control  ${errors[index]?.dutyRate ? 'error-border' : ''}`}
                                                type="text"
                                                id={`dutyRate${index}`}
                                                name='dutyRate'
                                                value={item.dutyRate}
                                                onChange={(e) => handleDutyChange(e, index, 13, 2)}

                                            />
                                        </td>
                                        <td>
                                            <Input
                                                className={`form-control  ${errors[index]?.dutyValue ? 'error-border' : ''}`}
                                                type="text"
                                                id={`dutyValue${index}`}
                                                name='dutyValue'
                                                value={item.dutyValue}
                                                onChange={(e) => handleDutyChange(e, index, 13, 2)}

                                            />
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-outline-danger btn-margin newButton"
                                                style={{ marginRight: 10 }}
                                                id="submitbtn2"
                                                onClick={() => removeDutyType(index)}
                                                disabled={item.finalNoticeId !== ''}

                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </>

            )}
        </div>
    )
}
