import AuthContext from "../Components/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import { Pagination } from 'react-bootstrap';
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faRefresh,
    faUpload,
    faFileExcel,
    faSave,
    faCheck,
    faDownload,
    faTrash,
    faShip,
    faBackward,
    faCalendarAlt,
    faAdd,
    faPlaneDeparture,
    faCalculator,
    faTired,
    faWheatAwnCircleExclamation,
    faHandshake,
    faTimesCircle,
    faPrint
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/style.css";
import "../Components/Style.css";
import useAxios from "../Components/useAxios";
import cfsService from "../service/CFSService";
import movementService from "../service/MovementService";
import { toast } from "react-toastify";
import ipaddress from "../Components/IpAddress";

function ImportSpecialDelivery() {
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
    const [errors, setErrors] = useState({});

    const processId = 'P00219';

    const foundRights =
        role !== "ROLE_ADMIN"
            ? userRights.find((item) => item.process_Id === processId)
            : null;
    const allowCreate = foundRights?.allow_Create === "Y";
    const allowRead = foundRights?.allow_Read === "Y";
    const allowEdit = foundRights?.allow_Update === "Y";
    const allowDelete = foundRights?.allow_Delete === "Y";






    const axiosInstance = useAxios();
    const CFSService = new cfsService(axiosInstance);
    const MovementService = new movementService(axiosInstance);

    const [profitcentre, setProfitcentre] = useState({
        profitcentreId: '',
        profitcentreDesc: ''
    });



    const initialGateOutSpl = {
        companyId: companyid,         // Replace with actual company ID
        branchId: branchId,          // Replace with actual branch ID
        finYear: '2025',           // Financial year
        gateOutId: '',         // Unique identifier for Gate Out
        erpDocRefNo: '',       // ERP Document Reference Number
        docRefNo: '',          // Document Reference Number
        srNo: '',              // Serial Number
        profitcentreId: 'N00002',    // Profit Centre ID
        transType: '',         // Transaction Type
        gateOutDate: null,     // Date for Gate Out (use ISO string or Date object)
        processId: processId,         // Process ID
        shift: 'Day',             // Shift Identifier
        gateNo: 'Gate01',            // Gate Number
        igmLineNo: '',         // IGM Line Number
        containerNo: '',       // Container Number
        containerSize: '',     // Container Size
        containerType: '',     // Container Type
        containerStatus: '',   // Container Status
        sl: '',               // Shipping Line ID
        cha: '',              // Custom House Agent (CHA) ID
        destination: '',       // Destination
        transporterStatus: '', // Transporter Status
        transporter: '',       // Transporter ID
        transporterName: '',   // Transporter Name
        vehicleNo: '',         // Vehicle Number
        driverName: '',        // Driver Name
        gatePassNo: '',        // Gate Pass Number
        gatePassDate: null,    // Gate Pass Date
        comments: '',          // Additional Comments
        status: '',            // Status
        createdBy: '',         // Created By
        createdDate: null,     // Created Date
        editedBy: '',          // Edited By
        editedDate: null,      // Edited Date
        approvedBy: '',        // Approved By
        approvedDate: null,    // Approved Date
        outBookingType: '',    // Out Booking Type
        movementBy: '',        // Movement By
        shipperName: '',       // Shipper Name
        iso: '',               // ISO Code
        sa: '',                // SA Code
        importerName: '',      // Importer Name
        gateInDate: null,      // Gate In Date
        shippingLineName: '',  // Shipping Line Name (Transient)
        chaName: ''            // CHA Name (Transient)
    };



    const [gateOutSpl, setGateOutSpl] = useState([initialGateOutSpl]);


    const [gateNos, setGateNos] = useState([]);
    const [selectedGateNo, setSelectedGateNo] = useState({ value: 'Gate01', label: 'Gate 01' });





    const lastEntryWithId = gateOutSpl.slice().reverse().find(entry => entry.gateOutId && entry.gateOutId.trim().length > 0);

    const lastEntry = lastEntryWithId || gateOutSpl[gateOutSpl.length - 1];


    const [validationErrors, setValidationErrors] = useState([]);



    const [isModalOpenForGateInSearch, setIsModalOpenForGateInSearch] = useState(false);

    const [searchGateInvalues, setSearchGateInvalues] = useState('');
    const [gateInSearchData, setGateInSearchData] = useState([]);

    const [gatePassData, setGatePassData] = useState([]);
    const [selectedGatePassNo, setSelectedGatePassNo] = useState(null);


    const getSelectedGateInSearch = async (gateOutId) => {
        setValidationErrors([]);
        setLoading(true);
        try {
            const response = await MovementService.getSelectedSplOutEntry(companyid, branchId, gateOutId, 'N00002', jwtToken);
            if (Array.isArray(response.data)) {

                updateSelectTags(response.data[0]);
            }
            setGateOutSpl(response.data);
        } catch (error) {
            console.error("Error fetching Tally entries:", error);
            // Optionally handle the error further, e.g., show a notification to the user
        } finally {
            setLoading(false);
        }
    };




    const selectGateInSearchRadio = async (gateOutId) => {
        await getSelectedGateInSearch(gateOutId);
        handleCloseGateInSearch();
    }

    const handleCloseGateInSearch = (val) => {
        setIsModalOpenForGateInSearch(false);
        setSearchGateInvalues('');
        setGateInSearchData([]);
    }


    const clearGateInSearchSearch = (val) => {
        setSearchGateInvalues('');
        searchGateInSearch();
    }

    const handleOpenGateInSearch = async () => {
        setIsModalOpenForGateInSearch(true);
        setSearchGateInvalues('');
        searchGateInSearch();
    };


    const formatDate = (value) => {
        if (!value) {
            return "";
        }

        const date = new Date(value);

        // Extract date components
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };


    const [currentPageGateInSearch, setCurrentPageGateInSearch] = useState(1);
    const [itemsPerPage] = useState(5);

    const indexOfLastItemGateInSearch = currentPageGateInSearch * itemsPerPage;
    const indexOfFirstItemGateInSearch = indexOfLastItemGateInSearch - itemsPerPage;
    const currentItemsGateInSearch = gateInSearchData.slice(indexOfFirstItemGateInSearch, indexOfLastItemGateInSearch);
    const totalPagesGateInSearch = Math.ceil(gateInSearchData.length / itemsPerPage);

    // Function to handle page change
    const handlePageChangeGateIn = (page) => {
        if (page >= 1 && page <= totalPagesGateInSearch) {
            setCurrentPageGateInSearch(page);
        }
    };


    const displayPagesGateIn = () => {
        const centerPageCount = 5;
        const middlePage = Math.floor(centerPageCount / 2);
        let startPage = currentPageGateInSearch - middlePage;
        let endPage = currentPageGateInSearch + middlePage;

        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(totalPagesGateInSearch, centerPageCount);
        }

        if (endPage > totalPagesGateInSearch) {
            endPage = totalPagesGateInSearch;
            startPage = Math.max(1, totalPagesGateInSearch - centerPageCount + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };


    const searchGateInSearch = async (searchvalue) => {
        setCurrentPageGateInSearch(1);
        setLoading(true);
        try {
            const response = await MovementService.getSplOutToSelect(companyid, branchId, searchvalue, jwtToken);
            setGateInSearchData(response.data);
        } catch (error) {
            console.error("Error fetching GateIn entries:", error);
        } finally {
            setLoading(false);
        }
    };







    useEffect(() => {
        const fetchData = async () => {
            await getProgitCenterById('N00002');
            await getGateNos('J00015');
        };
        fetchData();
    }, []);


    const getGateNos = async (jarId) => {
        const portType = await getjarByJarId(jarId);
        setGateNos(portType);
    };




    const handleGateNoChange = selectedOption => {
        setSelectedGateNo(selectedOption);

        // Update only the last entry in exportGateIn
        setGateOutSpl(prevExportGateIn => {
            if (prevExportGateIn.length === 0) return prevExportGateIn;

            const updatedGateIn = [...prevExportGateIn];
            updatedGateIn[updatedGateIn.length - 1] = {
                ...updatedGateIn[updatedGateIn.length - 1],
                gateNo: selectedOption ? selectedOption.value : ''
            };

            return updatedGateIn;
        });

        setValidationErrors(prevErrors => {
            const updatedErrors = [...prevErrors];

            if (updatedErrors.length > 0) {
                const lastIndex = updatedErrors.length - 1;
                if (updatedErrors[lastIndex]) {
                    delete updatedErrors[lastIndex].gateNo;
                }
            }
            return updatedErrors;
        });
    };




    const getjarByJarId = async (jarId) => {
        try {
            const response = await CFSService.getjarByJarId(companyid, jarId, jwtToken);
            const result = response.data;
            const resultSet = result.map(port => ({
                value: port[0],
                label: port[1]
            }));

            return resultSet;
        } catch (error) {
            console.error('Error fetching port data:', error);
        }
    };


    const getProgitCenterById = async (profitCenterId) => {
        try {
            const response = await CFSService.getProgitCenterById(companyid, branchId, profitCenterId, jwtToken);
            setProfitcentre(response.data);
            setGateOutSpl(prevState =>
                prevState.map(item => ({
                    ...item,
                    profitcentreId: response.data.profitcentreId
                }))
            );
        } catch (error) {
            console.error('Error fetching port data:', error);
        }
    };


    const updateSelectTags = async (exportGateIn) => {
        const initialGatePassNo = exportGateIn.gatePassNo ? { value: exportGateIn.gatePassNo, label: exportGateIn.gatePassNo } : null; setSelectedGatePassNo(initialGatePassNo);
        const initialTransporter = exportGateIn.transporterName ? { value: exportGateIn.transporter ? exportGateIn.transporter : exportGateIn.transporterName, label: exportGateIn.transporterName } : null; setSelectedTransPorter(initialTransporter);
        const initialGateNo = exportGateIn.gateNo ? { value: exportGateIn.gateNo, label: exportGateIn.gateNo } : null; setSelectedGateNo(initialGateNo);

    }



    const handleGatePassNoSelect = async (searchValue) => {

        setSelectedGatePassNo(searchValue);
        setGatePassData([]);
        if (!searchValue) {
            handleReset();
            return;
        }
        try {
            const response = await MovementService.selectGatePassNoForSPLImport(companyid, branchId, searchValue.value, 'N00002', jwtToken);
            setGateOutSpl(response.data);
        } catch {
            toast.error('Oops something went wrong!', {
                position: 'top-center',
                autoClose: 700,
            });
        }
    };

    const handleHeaderChange = (fieldName, value, type, maxIntegerDigits, maxDecimalDigits) => {

        // Process input based on type
        if (type === 'decimal') {
            // Remove any invalid characters
            value = value.replace(/[^0-9.]/g, '');

            const parts = value.split('.');

            // If there are more than 2 parts, combine them correctly
            if (parts.length > 2) {
                value = parts[0] + '.' + parts.slice(1).join('');
            }

            // Limit the integer part
            if (parts[0].length > maxIntegerDigits) {
                parts[0] = parts[0].slice(0, maxIntegerDigits);
            }

            // Limit the decimal part
            if (parts[1]) {
                parts[1] = parts[1].slice(0, maxDecimalDigits);
            }

            value = parts.join('.');
        } else if (type === 'number') {
            value = value.replace(/[^0-9]/g, '');
        }


        // Update exportStuffRequest state
        setGateOutSpl(prevRequest =>
            prevRequest.map(item => ({
                ...item,
                [fieldName]: value
            }))
        );


        // Update validationErrors state
        setValidationErrors(prevErrors =>
            prevErrors.map(error => {
                const updatedError = { ...error }; // Copy the error object
                delete updatedError[fieldName]; // Remove the specific field error
                return updatedError; // Return the updated error object
            })
        );
    };




    // ContainerWise Stuffing request
    const handleGatePassNoNoSearch = async (searchValue) => {
        if (!searchValue) {
            setGatePassData([]);
            return;
        }
        try {
            const response = await MovementService.searchGatePassNoForSPLImport(companyid, branchId, searchValue, 'N00002', jwtToken);
            setGatePassData(response.data);
        } catch (error) {
            setGatePassData([]);
            console.error('Error searching gatePassData:', error);
        }
    };



    const validateExportStuffTally = (exportStuffRequest) => {
        let errors = [];

        exportStuffRequest.forEach((detail, index) => {
            const { gatePassNo, shift, comments, movementBy, outBookingType, shipperName, destination, vehicleNo, transporterName } = detail;
            let error = {};
            // console.log('vesselName ', vesselName);

            if (!gatePassNo) { error.gatePassNo = 'gatePassNo is required'; }
            // if (!gatePassDate) error.gatePassDate = 'gatePassDate is required.';
            if (!shift) error.shift = 'shift is required.';


            // if (!transporter) { error.transporter = 'transporter is required'; }
            if (!comments) error.comments = 'comments is required.';
            if (!movementBy) error.movementBy = 'movementBy is required.';

            if (!outBookingType) { error.outBookingType = 'outBookingType is required'; }
            if (!shipperName) error.shipperName = 'shipperName is required.';
            if (!destination) error.destination = 'destination is required.';
            if (!vehicleNo) error.vehicleNo = 'vehicleNo is required.';

            if (!transporterName) error.transporterName = 'transporterName is required.';
            if (!vehicleNo) error.vehicleNo = 'vehicleNo is required.';


            errors.push(error);
        });
        setValidationErrors(errors);
        // Check if there are any errors
        return errors.every(error => Object.keys(error).length === 0);
    };





    // lololol
    const handleSave = async (exportStuffRequest) => {


        const filteredRequest = exportStuffRequest.filter(item => item.selected === 'Y');

        if (!Array.isArray(filteredRequest) || filteredRequest.length === 0) {
            toast.warning('please select container!', {
                position: 'top-center',
                autoClose: 700,
            });
            return;
        }

        if (!validateExportStuffTally(filteredRequest)) {
            toast.warning('Please enter required fields!', {
                position: 'top-center',
                autoClose: 1000,
            });
            return false;
        }

        setLoading(true);
        try {
            const response = await MovementService.saveGateOutSPLImport(companyid, branchId, userId, filteredRequest, jwtToken);


            if (Array.isArray(response.data)) {
                updateSelectTags(response.data[0]);
            }

            setGateOutSpl(response.data);

            toast.success('Data added Successfully!', {
                position: 'top-center',
                autoClose: 700,
            });

            return { success: true, cargoGateIns: response.data };
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data;

                toast.error(errorMessage.message || errorMessage, {
                    position: 'top-center',
                    autoClose: 3000,
                });
            }

            // Fallback for other server errors
            toast.error('Oops something went wrong!', {
                position: 'top-center',
                autoClose: 700,
            });
        } finally {
            setLoading(false);
        }
    };


    const handleReset = async () => {
        setValidationErrors([]);
        setGateOutSpl([initialGateOutSpl]);
        setSelectedGatePassNo(null);
        setSelectedTransPorter(null);
        setSelectedGateNo({ value: 'Gate01', label: 'Gate 01' })
    };




    const searchExporter = async (searchValue, type) => {

        if (!searchValue) {
            return;
        }

        try {
            const response = await CFSService.searchExporter(companyid, branchId, searchValue, jwtToken, type);

            if (type === 'trans') {
                setTransPorterData(response.data);
            }
        } catch (error) {
            toast.error('Oops something went wrong!', {
                position: 'top-center',
                autoClose: 700,
            });
        }
    };

    const [transPorterData, setTransPorterData] = useState([]);
    const [selectedTransPorter, setSelectedTransPorter] = useState(null);

    const handleTransPorterChange = async (selectedOption, fieldName) => {
        setSelectedTransPorter(selectedOption);

        setGateOutSpl(prevRequest =>
            prevRequest.map(item => ({
                ...item,
                transporterName: selectedOption?.label || '',
                transporter: selectedOption?.value || ''
            }))
        );

        setValidationErrors(prevErrors =>
            prevErrors.map(error => {
                const updatedError = { ...error }; // Copy the error object
                delete updatedError.transporterName; // Remove the specific field error
                return updatedError; // Return the updated error object
            })
        );
    };


    const handleCreationTransSelect = async (inputValue) => {
        setSelectedTransPorter({ value: inputValue, label: inputValue });
        setGateOutSpl(prevRequest =>
            prevRequest.map(item => ({
                ...item,
                transporterName: inputValue || '',
            }))
        );
        // Update validationErrors state
        setValidationErrors(prevErrors =>
            prevErrors.map(error => {
                const updatedError = { ...error };
                delete updatedError.transporterName;
                return updatedError;
            })
        );
    };





    const handleFieldChangeContainer = (e, index, fieldName, type, maxIntegerDigits, maxDecimalDigits) => {
        let { value, type: inputType, checked } = e.target;

        if (inputType === 'checkbox') {
            value = checked ? 'Y' : 'N';
        } else if (type === 'decimal') {
            value = value.replace(/[^0-9.]/g, '');
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
            value = value.replace(/[^0-9]/g, '');
        }

        setValidationErrors(prevErrors => {
            const updatedErrors = [...prevErrors];
            if (updatedErrors[index]) {
                delete updatedErrors[index][fieldName];
            }
            return updatedErrors;
        });

        setGateOutSpl(prevState => {
            const updatedTransDtl = [...prevState];
            updatedTransDtl[index] = {
                ...updatedTransDtl[index],
                [fieldName]: value,
            };
            return updatedTransDtl;
        });
    };


    const [selectAll, setSelectAll] = useState(false);

    const handleSelectAllChange = () => {
        const newDefaultChk = selectAll ? 'N' : 'Y';
        const updatedServices = gateOutSpl.map(service => ({
            ...service,
            selected: newDefaultChk,
        }));

        setGateOutSpl(updatedServices);
        setSelectAll(!selectAll);
    };
    useEffect(() => {
        const allSelected = gateOutSpl.length > 0 && gateOutSpl.every(service => service.selected === 'Y');
        setSelectAll(allSelected);
    }, [gateOutSpl]);




    return (
        <>
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

            <div>

                <div>
                    <Row>
                        <Col md={2}>
                            <Row>
                                <Col md={9}>

                                    <FormGroup>
                                        <label
                                            className="forlabel bold-label"
                                            htmlFor="sbRequestId"
                                        >
                                            Gate Out No
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="service"
                                            readOnly
                                            maxLength={15}
                                            value={lastEntry.gateOutId}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md={3} className="d-flex justify-content-end" style={{ marginTop: 21 }}>
                                    <button
                                        className="btn btn-outline-primary btn-margin newButton"
                                        style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        id="submitbtn2"
                                        onClick={handleOpenGateInSearch}
                                    >
                                        <FontAwesomeIcon icon={faSearch} size="sm" s />
                                    </button>
                                </Col>


                            </Row>
                        </Col>







                        <Modal Modal isOpen={isModalOpenForGateInSearch} onClose={handleCloseGateInSearch} toggle={handleCloseGateInSearch} style={{ maxWidth: '1100px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>

                            <ModalHeader toggle={handleCloseGateInSearch} style={{
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
                                /> Search Special GateOut</h5>

                            </ModalHeader>
                            <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Search by Gate Out No / Gate Pass No / Container No / Vehicle No
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="searchGateInvalues"
                                                maxLength={15}
                                                name='searchGateInvalues'
                                                value={searchGateInvalues}
                                                onChange={(e) => setSearchGateInvalues(e.target.value)}
                                            />

                                        </FormGroup>
                                    </Col>
                                    <Col md={6} style={{ marginTop: 24 }}>
                                        <button
                                            className="btn btn-outline-primary btn-margin newButton"
                                            // style={{ marginRight: 10, fontWeight: 'bold' }}
                                            style={{ fontSize: 12, marginRight: 10 }}
                                            id="submitbtn2"
                                            onClick={() => searchGateInSearch(searchGateInvalues)}
                                        >
                                            <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                            Search
                                        </button>
                                        <button
                                            className="btn btn-outline-danger btn-margin newButton"
                                            // style={{ marginRight: 10, fontWeight: 'bold' }}
                                            style={{ fontSize: 12, marginRight: 10 }}
                                            id="submitbtn2"
                                            onClick={clearGateInSearchSearch}
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
                                                <th scope="col">Gate Out No</th>
                                                <th scope="col">Gate Out Date</th>
                                                <th scope="col">Gate Pass No</th>
                                                <th scope="col">Gate Pass Date</th>
                                                <th scope="col">Transporter Name</th>
                                                <th scope="col">Vehicle No</th>
                                                <th scope="col">Trans Type</th>
                                                <th scope="col">Container No</th>
                                                <th scope="col">Status</th>

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
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {currentItemsGateInSearch.map((item, index) => (
                                                <>
                                                    <tr key={index} className='text-center'>
                                                        <td>
                                                            <input type="radio" name="radioGroup" onChange={() => selectGateInSearchRadio(item[0])} value={item[0]} />
                                                        </td>
                                                        <td>{item[0]}</td>
                                                        <td>{formatDate(item[1])}</td>
                                                        <td>{item[2]}</td>
                                                        <td>{formatDate(item[3])}</td>
                                                        <td>{item[4]}</td>
                                                        <td>{item[5]}</td>
                                                        <td>{item[6]}</td>
                                                        <td>{item[7]}</td>
                                                        <td>{item[8] === 'A' ? 'Approved' : ''}</td>
                                                    </tr>
                                                </>
                                            ))}
                                        </tbody>
                                    </table>
                                    <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                                        <Pagination.First onClick={() => handlePageChangeGateIn(1)} />
                                        <Pagination.Prev
                                            onClick={() => handlePageChangeGateIn(currentPageGateInSearch - 1)}
                                            disabled={currentPageGateInSearch === 1}
                                        />
                                        <Pagination.Ellipsis />

                                        {displayPagesGateIn().map((pageNumber) => (
                                            <Pagination.Item
                                                key={pageNumber}
                                                active={pageNumber === currentPageGateInSearch}
                                                onClick={() => handlePageChangeGateIn(pageNumber)}
                                            >
                                                {pageNumber}
                                            </Pagination.Item>
                                        ))}

                                        <Pagination.Ellipsis />
                                        <Pagination.Next
                                            onClick={() => handlePageChangeGateIn(currentPageGateInSearch + 1)}
                                            disabled={currentPageGateInSearch === totalPagesGateInSearch}
                                        />
                                        <Pagination.Last onClick={() => handlePageChangeGateIn(totalPagesGateInSearch)} />
                                    </Pagination>
                                </div>
                            </ModalBody>
                        </Modal>




                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="sbRequestId"
                                >
                                    Gate Out Date
                                </label>
                                <div style={{ position: "relative" }}>
                                    <DatePicker
                                        selected={lastEntry.gateOutDate}
                                        name="gateOutDate"
                                        placeholderText="Gate Out Date"
                                        dateFormat="dd/MM/yyyy HH:mm"
                                        timeInputLabel="Time:"
                                        showTimeInput
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        className={`form-control ${validationErrors.length > 0 && validationErrors[validationErrors.length - 1]?.gateOutDate ? 'error-border' : ''}`}
                                        wrapperClassName="custom-react-datepicker-wrapper"
                                        disabled
                                        readOnly
                                        tabIndex={-1}
                                    /><FontAwesomeIcon
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
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="sbRequestId"
                                >
                                    Gate No <span className="error-message">*</span>
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <Select
                                        options={gateNos}
                                        value={selectedGateNo}
                                        onChange={handleGateNoChange}
                                        className={`${validationErrors.length > 0 && validationErrors[validationErrors.length - 1]?.gateNo ? 'error-border' : ''}`}
                                        isDisabled={lastEntry.gateInId}
                                        id={lastEntry.gateInId ? 'service' : ''}
                                        placeholder="Select Gate No"
                                        isClearable
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

                                </div>
                            </FormGroup>
                        </Col>


                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="sbRequestId"
                                >
                                    Profit Centre
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="service"
                                    maxLength={20}
                                    readOnly
                                    value={profitcentre.profitcentreDesc}
                                    tabIndex={-1}
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
                                    id="service"
                                    readOnly
                                    maxLength={15}
                                    value={lastEntry.status === 'A' ? 'Approved' : ''}
                                    tabIndex={-1}
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
                                    id="service"
                                    readOnly
                                    maxLength={15}
                                    name="viaNo"
                                    value={lastEntry.createdBy}
                                    tabIndex={-1}
                                />
                            </FormGroup>
                        </Col>

                    </Row>
                    <Row>


                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="sbRequestId"
                                >
                                    Gate Pass No <span className="error-message">*</span>
                                </label>
                                <div style={{ position: "relative" }}>
                                    <Select
                                        options={gatePassData}
                                        value={selectedGatePassNo}
                                        onInputChange={(inputValue, { action }) => {
                                            if (action === 'input-change') {
                                                handleGatePassNoNoSearch(inputValue);
                                            }
                                        }}
                                        onChange={handleGatePassNoSelect}
                                        className={`${validationErrors.some(error => error.hasOwnProperty('gatePassNo')) ? 'error-border' : ''}`}
                                        placeholder="Select GatePass No"
                                        isClearable
                                        id={lastEntry.gateOutId ? 'service' : ''}
                                        isDisabled={lastEntry.gateOutId}
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

                                </div>
                            </FormGroup>
                        </Col>






                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="sbRequestId"
                                >
                                    Gate Pass Date
                                </label>
                                <div style={{ position: "relative" }}>
                                    <DatePicker
                                        selected={lastEntry.gatePassDate}
                                        name="gatePassDate"
                                        placeholderText="Gate Pass Date"
                                        dateFormat="dd/MM/yyyy HH:mm"
                                        timeInputLabel="Time:"
                                        showTimeInput
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        className={`form-control ${validationErrors.length > 0 && validationErrors[validationErrors.length - 1]?.gatePassDate ? 'error-border' : ''}`}
                                        wrapperClassName="custom-react-datepicker-wrapper"
                                        disabled
                                        readOnly
                                        tabIndex={-1}
                                    /><FontAwesomeIcon
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
                                <label className="forlabel" for="HazardousHazardous">Gate Out Shift</label>
                                <div style={{ position: 'relative' }}>
                                    <Input
                                        type="select"
                                        name="shift"
                                        className={`form-control ${validationErrors.length > 0 && validationErrors[validationErrors.length - 1]?.shift ? 'error-border' : ''}`}
                                        value={lastEntry.shift}
                                        onChange={(e) => handleHeaderChange('shift', e.target.value)}
                                    >
                                        <option value="Day">Day</option>
                                        <option value="Second">Second</option>
                                        <option value="Third">Third</option>
                                    </Input>
                                </div>
                            </FormGroup>
                        </Col>



                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="shippingLineName">
                                    Shipping Line
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    maxLength={15}
                                    id="service"
                                    readOnly
                                    name="gatePassDate"
                                    value={lastEntry.shippingLineName}
                                    tabIndex={-1}
                                />
                            </FormGroup>
                        </Col>




                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="chaName">
                                    CHA
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    maxLength={15}
                                    id="service"
                                    readOnly
                                    name="chaName"
                                    value={lastEntry.chaName}
                                    tabIndex={-1}
                                />
                            </FormGroup>
                        </Col>


                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="transType">
                                    Trans Type
                                </label>
                                <Input
                                    className={`form-control`}
                                    type="text"
                                    id="transType"
                                    name='vetransTypesselName'
                                    maxLength={50}
                                    value={lastEntry.transType}
                                    disabled
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Transporter <span className="error-message">*</span>
                                </label>
                                <CreatableSelect
                                    value={selectedTransPorter}
                                    onChange={(selectedOption) => handleTransPorterChange(selectedOption, 'pol')}
                                    options={transPorterData}
                                    placeholder="Select Transporter"
                                    onInputChange={(inputValue, { action }) => {
                                        if (action === 'input-change') {
                                            searchExporter(inputValue, 'trans');
                                        }
                                    }}
                                    onCreateOption={(inputValue) => {
                                        const maxLength = 50;
                                        const truncatedInputValue = inputValue.slice(0, maxLength);
                                        handleCreationTransSelect(truncatedInputValue, 'transporter')
                                    }}
                                    isClearable
                                    id="pol"
                                    name='pol'
                                    className={`${validationErrors.some(error => error.hasOwnProperty('transporterName')) ? 'error-border' : ''}`}
                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            height: 32,  // Set the height of the select input
                                            minHeight: 32,
                                            border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',

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
                                <label className="forlabel bold-label" htmlFor="sbReqdestinationuestId">
                                    Destination <span className="error-message">*</span>
                                </label>
                                <input
                                    className={`form-control ${validationErrors.some(error => error.hasOwnProperty('destination')) ? 'error-border' : ''}`}
                                    type="text"
                                    maxLength={50}
                                    name="tareWeight"
                                    value={lastEntry.destination}
                                    onChange={(e) => handleHeaderChange('destination', e.target.value)}
                                />
                            </FormGroup>
                        </Col>

                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbReqdestinationuestId">
                                    Shipper Name <span className="error-message">*</span>
                                </label>
                                <input
                                    className={`form-control ${validationErrors.some(error => error.hasOwnProperty('shipperName')) ? 'error-border' : ''}`}
                                    type="text"
                                    maxLength={35}
                                    name="shipperName"
                                    value={lastEntry.shipperName}
                                    onChange={(e) => handleHeaderChange('shipperName', e.target.value)}
                                />
                            </FormGroup>
                        </Col>



                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel" for="HazardousHazardous">Movement By <span className="error-message">*</span></label>
                                <div style={{ position: 'relative' }}>
                                    <Input
                                        type="select"
                                        name="movementBy"
                                        className={`form-control ${validationErrors.length > 0 && validationErrors[validationErrors.length - 1]?.movementBy ? 'error-border' : ''}`}
                                        value={lastEntry.movementBy}
                                        onChange={(e) => handleHeaderChange('movementBy', e.target.value)}
                                    >
                                        <option value="">Select...</option>
                                        <option value="CFS">CFS</option>
                                        <option value="PARTY">PARTY</option>
                                    </Input>
                                </div>
                            </FormGroup>
                        </Col>









                        <Col md={2}>
                            <FormGroup>
                                <label className="forlabel" for="outBookingType">Out Booking Type</label>
                                <div style={{ position: 'relative' }}>
                                    <Input
                                        type="select"
                                        name="outBookingType"
                                        className={`form-control ${validationErrors.length > 0 && validationErrors[validationErrors.length - 1]?.outBookingType ? 'error-border' : ''}`}
                                        value={lastEntry.outBookingType}
                                        onChange={(e) => handleHeaderChange('outBookingType', e.target.value)}
                                    >
                                        <option value="">Select...</option>
                                        <option value="Shipper Pickup">Shipper Pickup</option>
                                        <option value="Empty Storage">Empty Storage</option>
                                    </Input>
                                </div>
                            </FormGroup>
                        </Col>


                        <Col md={2}>
                            <FormGroup>
                                <label
                                    className="forlabel bold-label"
                                    htmlFor="comments"
                                >
                                    Remarks <span className="error-message">*</span>
                                </label>
                                <textarea
                                    className={`form-control ${validationErrors.length > 0 && validationErrors[validationErrors.length - 1]?.comments ? 'error-border' : ''}`}
                                    value={lastEntry.comments}
                                    onChange={(e) => handleHeaderChange('comments', e.target.value)}
                                    maxLength={150}
                                    rows={2}
                                ></textarea>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                    </Row>



                    <Row className="text-center mt-1 mb-1">
                        <Col>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ fontSize: 14, marginRight: 10 }}
                                id="submitbtn2"
                                onClick={(e) => handleSave(gateOutSpl)}
                            >
                                <FontAwesomeIcon
                                    icon={faSave}
                                    style={{ marginRight: "5px" }}
                                />
                                Save
                            </button>

                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ fontSize: 14, marginRight: 10 }}
                                id="submitbtn2"
                                onClick={handleReset}
                            >
                                <FontAwesomeIcon
                                    icon={faRefresh}
                                    style={{ marginRight: "5px" }}
                                />
                                Clear
                            </button>



                        </Col>
                    </Row>
                </div>



                <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>

                    <h5>Special Delivery Empty Container Gate Out</h5>

                    <Table className="table table-bordered" style={{ border: '2px solid black' }}>
                        <thead className="tableHeader">
                            <tr>
                                <th scope="col" className="text-center" style={{ color: "black" }}>
                                    Sr No
                                </th>
                                <th scope="col" className="text-center" style={{ color: "black" }}>
                                    IGM No
                                </th>
                                <th scope="col" className="text-center" style={{ color: "black" }}>
                                    Container
                                </th>
                                <th scope="col" className="text-center" style={{ color: "black" }}>
                                    Cont Size&Type
                                </th>
                                <th scope="col" className="text-center" style={{ color: "black" }}>
                                    Vehicle No
                                </th>
                                <th scope="col" className="text-center" style={{ color: "black" }}>
                                    Driver
                                </th>

                                {!lastEntry.gateOutId &&
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        <Input
                                            className="form-check-input radios"
                                            type="checkbox"
                                            style={{ width: '22px', height: '22px', cursor: 'pointer', margin: '0' }}
                                            checked={selectAll}
                                            onChange={() => handleSelectAllChange()}
                                        />
                                    </th>
                                }

                            </tr>
                        </thead>
                        <tbody>
                            {gateOutSpl.map((cargoEntry, index) => (
                                <tr key={index} className="text-center">
                                    <td>
                                        {index + 1}
                                    </td>

                                    <td>
                                        <FormGroup>
                                            <Input
                                                type="text"
                                                value={`${cargoEntry.docRefNo} / ${cargoEntry.igmLineNo}`}
                                                className={`inputwidthTukaMax form-control`}
                                                disabled
                                            />
                                        </FormGroup>
                                    </td>




                                    <td>
                                        <FormGroup>
                                            <Input
                                                type="text"
                                                value={cargoEntry.containerNo}
                                                className={`inputwidthTukaMax form-control`}
                                                disabled
                                            />
                                        </FormGroup>
                                    </td>

                                    <td>
                                        <FormGroup>
                                            <Input
                                                type="text"
                                                value={`${cargoEntry.containerSize} / ${cargoEntry.containerType}`}
                                                className={`inputwidthTukaMax form-control`}
                                                disabled
                                            />
                                        </FormGroup>
                                    </td>

                                    <td>
                                        <FormGroup>
                                            <Input
                                                type="text"
                                                className={`inputwidthTukaMax form-control ${validationErrors[index]?.vehicleNo ? 'error-border' : ''}`}
                                                maxLength={15}
                                                value={cargoEntry.vehicleNo}
                                                onChange={(e) => handleFieldChangeContainer(e, index, 'vehicleNo')}
                                                disabled={cargoEntry.gateOutId}
                                            />
                                        </FormGroup>
                                    </td>


                                    <td>
                                        <FormGroup>
                                            <Input
                                                type="text"
                                                value={cargoEntry.driverName}
                                                className={`inputwidthTukaMax form-control`}
                                                disabled
                                            />
                                        </FormGroup>
                                    </td>

                                    {!cargoEntry.gateOutId &&
                                        <td className="text-center">
                                            <FormGroup>
                                                <Input
                                                    className={`form-control`}
                                                    type="checkbox"
                                                    name='selected'
                                                    checked={cargoEntry.selected === 'Y'}
                                                    onChange={(e) => handleFieldChangeContainer(e, index, 'selected')}
                                                    style={{ width: '20px', height: '24px', cursor: 'pointer', margin: '0' }}
                                                />
                                            </FormGroup>
                                        </td>
                                    }

                                </tr>
                            ))}
                        </tbody>

                    </Table>
                </div>




            </div>
        </>
    );
}

export default ImportSpecialDelivery;
