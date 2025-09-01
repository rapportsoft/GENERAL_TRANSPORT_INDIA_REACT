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

export default function AuctionRecording({ igm, igmLineNo, igmTrans, blNo, id1, id2, id3, acttab, listOfData, flag, onRequest, aucData, searchFlag }) {
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

    const [auctionData, setAuctionData] = useState({
        companyId: "",
        branchId: "",
        bidId: "",
        auctionNo: "",
        srNo: 0,
        auctionItemNo: "",
        auctionDate: null,
        bidDate: null,
        profitcentreId: "",
        igmTransId: "",
        igmTransDate: null,
        igmNo: "",
        igmDate: null,
        igmLineNo: "",
        shift: "Day",
        commodityDescription: "",
        actualNoOfPackages: 0,
        grossWt: 0,
        uom: "",
        duty: 0,
        cfsDues: 0,
        reservePrice: 0,
        bidderName: "",
        bidderAddress1: "",
        bidderAddress2: "",
        bidderAddress3: "",
        stc: 0,
        amountPaid: 0,
        bidderAmount: 0,
        confirmDate: null,
        createdBy: "",
        createdDate: null,
        editedBy: "",
        editedDate: null,
        approvedBy: "",
        approvedDate: null,
        status: "",
    });

    const [bidderData, setBidderData] = useState([
        {
            auctionNo: "",
            srNo: "",
            bidderName: "",
            bidderAddress1: "",
            bidderAddress2: "",
            bidderAddress3: "",
            stc: 0,
            bidderAmount: 0,
            amountPaid: 0,
            confirmDate: null,
        }
    ]);

    const [auctionBidData, setAuctionBidData] = useState([]);

    const getAuctionRecordingData = (val) => {
        if (val === '') {
            setAuctionBidData([]);
            return;
        }

        axios.get(`${ipaddress}auctionRecording/getBeforeSaveData?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const portOptions = data.map(port => ({
                    value: port,
                    label: port
                }))
                setAuctionBidData(portOptions);
            })
            .catch((error) => {

            })
    }

    const handleAuctionBidChange = async (selectedOption, { action }) => {

        if (action === 'clear') {

            setAuctionData((prevErrors) => ({
                ...prevErrors,
                bidId: "",
            }));

            handleClear();
        }
        else {
            setAuctionData((prevErrors) => ({
                ...prevErrors,
                bidId: selectedOption.value || '',
            }));

            getBidIdSelectedData(selectedOption.value);
        }
    };

    const getBidIdSelectedData = (id) => {
        if (id === '') {
            return;
        }

        axios.get(`${ipaddress}auctionRecording/getBeforeSaveSelectedData?cid=${companyid}&bid=${branchId}&id=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {

                const data = response.data;

                setAuctionData({
                    companyId: "",
                    branchId: "",
                    bidId: data.bidId || "",
                    auctionNo: "",
                    srNo: 0,
                    auctionItemNo: data.auctionItemNo || "",
                    auctionDate: null,
                    bidDate: data.bidDate === null ? null : new Date(data.bidDate),
                    profitcentreId: data.profitcentreId || "",
                    igmTransId: "",
                    igmTransDate: null,
                    igmNo: data.igmNo || "",
                    igmDate: data.igmDate === null ? null : new Date(data.igmDate),
                    igmLineNo: data.igmLineNo || "",
                    shift: "Day",
                    commodityDescription: data.commodityDescription || "",
                    actualNoOfPackages: data.actualNoOfPackages || 0,
                    grossWt: data.grossWt || 0,
                    uom: data.uom || "",
                    duty: data.duty || 0,
                    cfsDues: data.cfsDues || 0,
                    reservePrice: data.reservePrice || 0,
                    bidderName: "",
                    bidderAddress1: "",
                    bidderAddress2: "",
                    bidderAddress3: "",
                    stc: 0,
                    amountPaid: 0,
                    bidderAmount: 0,
                    confirmDate: null,
                    createdBy: "",
                    createdDate: null,
                    editedBy: "",
                    editedDate: null,
                    approvedBy: "",
                    approvedDate: null,
                    status: "",
                })

            })
            .catch((error) => {
                handleClear();
                toast.error(error.response.data, {
                    autoClose: 800
                })
            })
    }

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

        if (['cfsDues', 'reservePrice'].includes(name)) {
            sanitizeValue = handleInputChange(value, val1, val2);
        }

        setAuctionData((prevState) => ({
            ...prevState,
            [name]: sanitizeValue,
        }));
    };

    const handleBidderChange = (e, index, val1, val2) => {
        const { name, value } = e.target;
        let sanitizedValue = value;

        // Sanitize input for specific fields
        if (['stc', 'bidderAmount', 'amountPaid'].includes(name)) {
            sanitizedValue = handleInputChange(value, val1, val2);
        }

        if (name === 'amountPaid') {
            const bidAMt = parseFloat(bidderData[index].bidderAmount);

            if (sanitizedValue > bidAMt) {
                sanitizedValue = '';
            }
        }

        setBidderData(prevState => {
            const updatedData = [...prevState];
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

    const handleClear = () => {
        setAuctionData({
            companyId: "",
            branchId: "",
            bidId: "",
            auctionNo: "",
            srNo: 0,
            auctionItemNo: "",
            auctionDate: null,
            bidDate: null,
            profitcentreId: "",
            igmTransId: "",
            igmTransDate: null,
            igmNo: "",
            igmDate: null,
            igmLineNo: "",
            shift: "Day",
            commodityDescription: "",
            actualNoOfPackages: 0,
            grossWt: 0,
            uom: "",
            duty: 0,
            cfsDues: 0,
            reservePrice: 0,
            bidderName: "",
            bidderAddress1: "",
            bidderAddress2: "",
            bidderAddress3: "",
            stc: 0,
            bidderAmount: 0,
            amountPaid: 0,
            confirmDate: null,
            createdBy: "",
            createdDate: null,
            editedBy: "",
            editedDate: null,
            approvedBy: "",
            approvedDate: null,
            status: "",
        })

        setAuctionBidData([]);

        setBidderData([{
            auctionNo: "",
            srNo: "",
            bidderName: "",
            bidderAddress1: "",
            bidderAddress2: "",
            bidderAddress3: "",
            stc: 0,
            bidderAmount: 0,
            amountPaid: 0,
            confirmDate: null,
        }])

        setErrors([]);
    }

    const addAuctionRecording = () => {
        const newRow = {
            auctionNo: "",
            srNo: "",
            bidderName: "",
            bidderAddress1: "",
            bidderAddress2: "",
            bidderAddress3: "",
            stc: 0,
            bidderAmount: 0,
            amountPaid: 0,
            confirmDate: null,
        }

        setBidderData([...bidderData, newRow]); // Add the new row to the array

    }

    const removeBidderData = (index) => {
        setBidderData(prevState => prevState.filter((_, i) => i !== index));

    }

    const handleSave = () => {

        setErrors([]);

        if (auctionData.bidId === '') {
            toast.error("Bid id is required!", {
                autoClose: 800
            })
            return;
        }


        if (bidderData.length === 0) {
            toast.error("Please add atleast one bidder name!!", {
                autoClose: 800
            })
            return;
        }

        let newErrors = bidderData.map(() => ({}));

        bidderData.forEach((data, index) => {
            let rowErrors = {};
            if (!data.bidderName) rowErrors.bidderName = "Bidder name is required.";
            if (!data.bidderAddress1) rowErrors.bidderAddress1 = "Bidder address1 is required.";
            if (!data.bidderAddress2) rowErrors.bidderAddress2 = "Bidder address2 is required.";
            if (!data.bidderAmount || data.bidderAmount <= 0) rowErrors.bidderAmount = "Bidder amt is required.";
            if (!data.stc || data.stc <= 0) rowErrors.stc = "STC is required.";
            if (!data.amountPaid || data.amountPaid <= 0) rowErrors.amountPaid = "Amount paid is required.";
            if (!data.confirmDate || data.confirmDate === null) rowErrors.confirmDate = "Confirm date is required.";

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

        const formData = {
            recording: auctionData,
            bidderData: bidderData
        }

        try {
            axios.post(`${ipaddress}auctionRecording/saveRecordingData?cid=${companyid}&bid=${branchId}&user=${userId}`, formData, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            })
                .then((response) => {
                    setLoading(false);

                    const data = response.data;
                    const singleData = data[0];

                    toast.success("Data save successfully!!!", {
                        autoClose: 800
                    })

                    setAuctionData({
                        companyId: "",
                        branchId: "",
                        bidId: singleData.bidId || "",
                        auctionNo: singleData.auctionNo || "",
                        srNo: singleData.srNo || 0,
                        auctionItemNo: singleData.auctionItemNo || "",
                        auctionDate: singleData.auctionDate === null ? null : new Date(singleData.auctionDate),
                        bidDate: singleData.bidDate === null ? null : new Date(singleData.bidDate),
                        profitcentreId: singleData.profitcentreId || "",
                        igmTransId: "",
                        igmTransDate: null,
                        igmNo: singleData.igmNo || "",
                        igmDate: singleData.igmDate === null ? null : new Date(singleData.igmDate),
                        igmLineNo: singleData.igmLineNo || "",
                        shift: singleData.shift || "Day",
                        commodityDescription: singleData.commodityDescription || "",
                        actualNoOfPackages: singleData.actualNoOfPackages || 0,
                        grossWt: singleData.grossWt || 0,
                        uom: singleData.uom || "",
                        duty: singleData.duty || 0,
                        cfsDues: singleData.cfsDues || 0,
                        reservePrice: singleData.reservePrice || 0,
                        bidderName: "",
                        bidderAddress1: "",
                        bidderAddress2: "",
                        bidderAddress3: "",
                        stc: 0,
                        bidderAmount: 0,
                        amountPaid: 0,
                        confirmDate: null,
                        createdBy: singleData.createdBy || "",
                        createdDate: null,
                        editedBy: "",
                        editedDate: null,
                        approvedBy: "",
                        approvedDate: null,
                        status: singleData.status || "",
                    })

                    setBidderData(data.map((item) => (
                        {
                            auctionNo: item.auctionNo || "",
                            srNo: item.srNo || "",
                            bidderName: item.bidderName || "",
                            bidderAddress1: item.bidderAddress1 || "",
                            bidderAddress2: item.bidderAddress2 || "",
                            bidderAddress3: item.bidderAddress3 || "",
                            stc: item.stc || 0,
                            bidderAmount: item.bidderAmount || 0,
                            amountPaid: item.amountPaid || 0,
                            confirmDate: item.confirmDate === null ? null : new Date(item.confirmDate),
                        }
                    )))

                    onRequest();
                })
                .catch((error) => {
                    setLoading(false);

                    toast.error(error.response.data, {
                        autoClose: 800
                    })
                })
        } catch (error) {
            setLoading(false);

        }
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
        axios.get(`${ipaddress}auctionRecording/searchAuctionRecordingData?cid=${companyid}&bid=${branchId}&id=${id}`, {
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

    useEffect(() => {
        if (acttab === 'P01406') {


            if (flag) {
                handleClear();
            }

            if (aucData !== null && aucData.auctionId !== undefined && aucData != {} && searchFlag === 'Y') {
                getSelectedData1(aucData.auctionId);
            }



        }

    }, [acttab, flag, aucData, searchFlag])

    const getSelectedData = (id) => {
        axios.get(`${ipaddress}auctionRecording/getAuctionRecordingData?cid=${companyid}&bid=${branchId}&id=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {

                const data = response.data;
                const singleData = data[0];


                setAuctionData({
                    companyId: "",
                    branchId: "",
                    bidId: singleData.bidId || "",
                    auctionNo: singleData.auctionNo || "",
                    srNo: singleData.srNo || 0,
                    auctionItemNo: singleData.auctionItemNo || "",
                    auctionDate: singleData.auctionDate === null ? null : new Date(singleData.auctionDate),
                    bidDate: singleData.bidDate === null ? null : new Date(singleData.bidDate),
                    profitcentreId: singleData.profitcentreId || "",
                    igmTransId: "",
                    igmTransDate: null,
                    igmNo: singleData.igmNo || "",
                    igmDate: singleData.igmDate === null ? null : new Date(singleData.igmDate),
                    igmLineNo: singleData.igmLineNo || "",
                    shift: singleData.shift || "Day",
                    commodityDescription: singleData.commodityDescription || "",
                    actualNoOfPackages: singleData.actualNoOfPackages || 0,
                    grossWt: singleData.grossWt || 0,
                    uom: singleData.uom || "",
                    duty: singleData.duty || 0,
                    cfsDues: singleData.cfsDues || 0,
                    reservePrice: singleData.reservePrice || 0,
                    bidderName: "",
                    bidderAddress1: "",
                    bidderAddress2: "",
                    bidderAddress3: "",
                    stc: 0,
                    bidderAmount: 0,
                    amountPaid: 0,
                    confirmDate: null,
                    createdBy: singleData.createdBy || "",
                    createdDate: null,
                    editedBy: "",
                    editedDate: null,
                    approvedBy: "",
                    approvedDate: null,
                    status: singleData.status || "",
                })

                setBidderData(data.map((item) => (
                    {
                        auctionNo: item.auctionNo || "",
                        srNo: item.srNo || "",
                        bidderName: item.bidderName || "",
                        bidderAddress1: item.bidderAddress1 || "",
                        bidderAddress2: item.bidderAddress2 || "",
                        bidderAddress3: item.bidderAddress3 || "",
                        stc: item.stc || 0,
                        bidderAmount: item.bidderAmount || 0,
                        amountPaid: item.amountPaid || 0,
                        confirmDate: item.confirmDate === null ? null : new Date(item.confirmDate),
                    }
                )))
                closeGateInModal();
            })
            .catch((error) => {

                toast.error(error.response.data, {
                    autoClose: 800
                })
            })
    }


    const getSelectedData1 = (id) => {
        axios.get(`${ipaddress}auctionRecording/getAuctionRecordingData?cid=${companyid}&bid=${branchId}&id=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {

                const data = response.data;
                const singleData = data[0];


                setAuctionData({
                    companyId: "",
                    branchId: "",
                    bidId: singleData.bidId || "",
                    auctionNo: singleData.auctionNo || "",
                    srNo: singleData.srNo || 0,
                    auctionItemNo: singleData.auctionItemNo || "",
                    auctionDate: singleData.auctionDate === null ? null : new Date(singleData.auctionDate),
                    bidDate: singleData.bidDate === null ? null : new Date(singleData.bidDate),
                    profitcentreId: singleData.profitcentreId || "",
                    igmTransId: "",
                    igmTransDate: null,
                    igmNo: singleData.igmNo || "",
                    igmDate: singleData.igmDate === null ? null : new Date(singleData.igmDate),
                    igmLineNo: singleData.igmLineNo || "",
                    shift: singleData.shift || "Day",
                    commodityDescription: singleData.commodityDescription || "",
                    actualNoOfPackages: singleData.actualNoOfPackages || 0,
                    grossWt: singleData.grossWt || 0,
                    uom: singleData.uom || "",
                    duty: singleData.duty || 0,
                    cfsDues: singleData.cfsDues || 0,
                    reservePrice: singleData.reservePrice || 0,
                    bidderName: "",
                    bidderAddress1: "",
                    bidderAddress2: "",
                    bidderAddress3: "",
                    stc: 0,
                    bidderAmount: 0,
                    amountPaid: 0,
                    confirmDate: null,
                    createdBy: singleData.createdBy || "",
                    createdDate: null,
                    editedBy: "",
                    editedDate: null,
                    approvedBy: "",
                    approvedDate: null,
                    status: singleData.status || "",
                })

                setBidderData(data.map((item) => (
                    {
                        auctionNo: item.auctionNo || "",
                        srNo: item.srNo || "",
                        bidderName: item.bidderName || "",
                        bidderAddress1: item.bidderAddress1 || "",
                        bidderAddress2: item.bidderAddress2 || "",
                        bidderAddress3: item.bidderAddress3 || "",
                        stc: item.stc || 0,
                        bidderAmount: item.bidderAmount || 0,
                        amountPaid: item.amountPaid || 0,
                        confirmDate: item.confirmDate === null ? null : new Date(item.confirmDate),
                    }
                )))
                closeGateInModal();
            })
            .catch((error) => {
                getBidIdSelectedData(aucData.bidId);

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
                    /> Search Auction Recording Data</h5>



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
                                    <th scope="col">Auction No</th>
                                    <th scope="col">Auction Date</th>
                                    <th scope="col">Bid Id</th>
                                    <th scope="col">Bid Date</th>
                                    <th scope="col">Auction Item No</th>
                                    <th scope="col">Profitcentre</th>
                                    <th scope="col">IGM No</th>
                                    <th scope="col">IGM Date</th>
                                    <th scope="col">IGM Line No</th>

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
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Auction No</label>
                        <Row>
                            <Col md={9}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    id="auctionNo"
                                    name='auctionNo'
                                    value={auctionData.auctionNo}
                                    disabled
                                />
                            </Col>
                            <Col md={3} className="d-flex justify-content-end">
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
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Auction Date</label>
                        <div style={{ position: 'relative' }}>
                            <DatePicker
                                selected={auctionData.auctionDate}
                                // onChange={(date) => setFormData({
                                //     ...formData,
                                //     customeOutOfChargeDate: date
                                // })}
                                id='auctionDate'
                                name='auctionDate'
                                showTimeInput
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
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Profitcentre</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="profitcentreId"
                            name='profitcentreId'
                            value={auctionData.profitcentreId}
                            disabled
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
                            value={auctionData.shift}
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
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Status</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="status"
                            name='status'
                            value={auctionData.status === 'A' ? 'Approved' : auctionData.status === 'N' ? 'New' : auctionData.status}
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
                            id="createdBy"
                            name='createdBy'
                            value={auctionData.createdBy}
                            disabled
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">BID Id <span style={{ color: 'red' }}>*</span></label>
                        <Select
                            value={{ value: auctionData.bidId, label: auctionData.bidId }}
                            onChange={handleAuctionBidChange}
                            onInputChange={getAuctionRecordingData}
                            options={auctionBidData}
                            placeholder="Select Notice Id"
                            isDisabled={auctionData.auctionNo !== ''}
                            isClearable
                            id="bidId"
                            name="bidId"
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
                        <label className="forlabel bold-label" htmlFor="igmLineNo">BID Date</label>
                        <div style={{ position: 'relative' }}>
                            <DatePicker
                                selected={auctionData.bidDate}
                                // onChange={(date) => setFormData({
                                //     ...formData,
                                //     customeOutOfChargeDate: date
                                // })}
                                id='bidDate'
                                name='bidDate'
                                showTimeInput
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
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Auction Item No</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="auctionItemNo"
                            name='auctionItemNo'
                            value={auctionData.auctionItemNo}
                            disabled
                        />
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
                            value={auctionData.igmNo}
                            disabled
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">IGM Date</label>
                        <div style={{ position: 'relative' }}>
                            <DatePicker
                                selected={auctionData.igmDate}
                                // onChange={(date) => setFormData({
                                //     ...formData,
                                //     customeOutOfChargeDate: date
                                // })}
                                id='igmDate'
                                name='igmDate'
                                showTimeInput
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
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">IGM Line No</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="igmLineNo"
                            name='igmLineNo'
                            value={auctionData.igmLineNo}
                            disabled
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>

                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Actual No of Packages</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="actualNoOfPackages"
                            name='actualNoOfPackages'
                            value={auctionData.actualNoOfPackages}
                            disabled
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Duty</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="duty"
                            name='duty'
                            value={auctionData.duty}
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
                            value={auctionData.grossWt}
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
                            value={auctionData.uom}
                            disabled
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">CFS Dues</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="cfsDues"
                            name='cfsDues'
                            value={auctionData.cfsDues}
                            disabled
                        />
                    </FormGroup>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Reserve Price</label>
                        <Input
                            className="form-control"
                            type="text"
                            id="reservePrice"
                            name='reservePrice'
                            value={auctionData.reservePrice}
                            disabled
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="igmLineNo">Commodity Description</label>
                        <Input
                            className="form-control"
                            type="textarea"
                            id="commodityDescription"
                            name='commodityDescription'
                            value={auctionData.commodityDescription}
                            disabled
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
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
                    <button
                        className="btn btn-outline-primary btn-margin newButton"
                        style={{ marginRight: 10 }}
                        id="submitbtn2"
                        onClick={addAuctionRecording}
                    >
                        <FontAwesomeIcon icon={faAdd} style={{ marginRight: 5 }} />
                        Add Bidder
                    </button>
                </Col>
            </Row>
            <div id="datepicker-portal"></div>

            <div className="mt-3 table-responsive">
                <table className="table table-bordered table-hover tableHeader">
                    <thead className="tableHeader">
                        <tr className="text-center">
                            <th scope="col" colSpan={10}>Auction Recording</th>
                        </tr>
                        <tr className="text-center">
                            <th scope="col">Sr NO</th>
                            <th scope="col">Bidder Name <span style={{ color: 'red' }}>*</span></th>
                            <th scope="col">Bidder Address1 <span style={{ color: 'red' }}>*</span></th>
                            <th scope="col">Bidder Address2 <span style={{ color: 'red' }}>*</span></th>
                            <th scope="col">Bidder Address3</th>
                            <th scope="col">Bid Amt <span style={{ color: 'red' }}>*</span></th>
                            <th scope="col">STC % <span style={{ color: 'red' }}>*</span></th>
                            <th scope="col">Amount Paid <span style={{ color: 'red' }}>*</span></th>
                            <th scope="col">Confirm Date <span style={{ color: 'red' }}>*</span></th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bidderData.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <Input
                                        className={`form-control  ${errors[index]?.bidderName ? 'error-border' : ''}`}
                                        type="textarea"
                                        id={`bidderName${index}`}
                                        name='bidderName'
                                        value={item.bidderName}
                                        maxLength={35}
                                        onChange={(e) => handleBidderChange(e, index)}
                                    />
                                </td>
                                <td>
                                    <Input
                                        className={`form-control  ${errors[index]?.bidderAddress1 ? 'error-border' : ''}`}
                                        type="textarea"
                                        id={`bidderAddress1${index}`}
                                        name='bidderAddress1'
                                        value={item.bidderAddress1}
                                        maxLength={35}
                                        onChange={(e) => handleBidderChange(e, index)}
                                    />
                                </td>
                                <td>
                                    <Input
                                        className={`form-control  ${errors[index]?.bidderAddress2 ? 'error-border' : ''}`}
                                        type="textarea"
                                        id={`bidderAddress2${index}`}
                                        name='bidderAddress2'
                                        value={item.bidderAddress2}
                                        maxLength={35}
                                        onChange={(e) => handleBidderChange(e, index)}
                                    />
                                </td>
                                <td>
                                    <Input
                                        className="form-control"
                                        type="textarea"
                                        id={`bidderAddress3${index}`}
                                        name='bidderAddress3'
                                        value={item.bidderAddress3}
                                        maxLength={35}
                                        onChange={(e) => handleBidderChange(e, index)}
                                    />
                                </td>
                                <td>
                                    <Input
                                        className={`form-control  ${errors[index]?.bidderAmount ? 'error-border' : ''}`}
                                        type="text"
                                        id={`bidderAmount${index}`}
                                        name='bidderAmount'
                                        value={item.bidderAmount}
                                        onChange={(e) => handleBidderChange(e, index, 13, 2)}
                                    />
                                </td>
                                <td>
                                    <Input
                                        className={`form-control  ${errors[index]?.stc ? 'error-border' : ''}`}
                                        type="text"
                                        id={`stc${index}`}
                                        name='stc'
                                        value={item.stc}
                                        onChange={(e) => handleBidderChange(e, index, 3, 2)}
                                    />
                                </td>
                                <td>
                                    <Input
                                        className={`form-control  ${errors[index]?.amountPaid ? 'error-border' : ''}`}
                                        type="text"
                                        id={`amountPaid${index}`}
                                        name='amountPaid'
                                        value={item.amountPaid}
                                        onChange={(e) => handleBidderChange(e, index, 13, 2)}
                                    />
                                </td>
                                <td>
                                    <div style={{ position: 'relative' }}>
                                        <DatePicker
                                            selected={bidderData[index]?.confirmDate || null} // Ensure safe access
                                            onChange={(date) => {
                                                setBidderData((prevState) => {
                                                    return prevState.map((item, i) =>
                                                        i === index ? { ...item, confirmDate: date } : item
                                                    );
                                                });
                                                setErrors((prevState) => {
                                                    return prevState.map((item, i) =>
                                                        i === index ? { ...item, confirmDate: '' } : item
                                                    );
                                                });
                                            }}
                                            portalId="datepicker-portal"
                                            id={`confirmDate${index}`}
                                            name="confirmDate"
                                            dateFormat="dd/MM/yyyy"
                                            className={`form-control border-right-0 InputField  ${errors[index]?.confirmDate ? 'error-border' : ''}`}
                                            customInput={<Input style={{ width: "100%" }} />}
                                            wrapperClassName="custom-react-datepicker-wrapper"
                                        />

                                        <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                    </div>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-outline-danger btn-margin newButton"
                                        id="submitbtn2"
                                        onClick={() => removeBidderData(index)}
                                        disabled={item.auctionNo !== ''}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
