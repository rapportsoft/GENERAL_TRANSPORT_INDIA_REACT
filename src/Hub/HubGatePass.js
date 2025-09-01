import AuthContext from "../Components/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import Select, { components } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Swal from "sweetalert2";
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
    faRefresh,
    faSave,
    faCheck,
    faDownload,
    faTrash,
    faShip,
    faBackward,
    faCalendarAlt,
    faAdd,
    faReceipt,
    faTruckPickup,
    faTruck,
    faEdit,
    faTimesCircle,
    faPrint, faSearch
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/style.css";
import "../Components/Style.css";
import { Button } from "react-bootstrap";
import useAxios from "../Components/useAxios";
import cfsService from '../service/CFSService';
import movementService from "../service/MovementService";
import { toast } from "react-toastify";
import ipaddress from "../Components/IpAddress";

function HubGatePass({ searchData, resetFlag, updatePagesList }) {
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

    const axiosInstance = useAxios();
    const CFSService = new cfsService(axiosInstance);
    const MovementService = new movementService(axiosInstance);

    const [profitcentre, setProfitcentre] = useState({
        profitcentreId: '',
        profitcentreDesc: ''
    });

    const processId = 'P00104';

    useEffect(() => {
        const fetchData = async () => {
            await getProgitCenterById('N00005');
            await getContainerHealth('J00001');
        };
        fetchData();
    }, []);





    useEffect(() => {

        if (searchData && searchData.activeTab === processId && searchData.gatepassId && searchData.sbTransId && searchData.sbNo && searchData.profitCenterId) {
            selectCSBSearchRadio(searchData.gatepassId);
        }
    }, [searchData]);




    useEffect(() => {
        if (resetFlag) {
            handleReset();
        }
    }, [resetFlag]);









    const getContainerHealth = async (jarId) => {
        const portType = await getjarByJarId(jarId);
        setContainerHealthData(portType);
    };

    const getProgitCenterById = async (profitCenterId) => {
        try {
            const response = await CFSService.getProgitCenterById(companyid, branchId, profitCenterId, jwtToken);
            setProfitcentre(response.data);
        } catch (error) {
            console.error('Error fetching port data:', error);
        }
    };



    const getjarByJarId = async (jarId) => {
        try {
            const response = await CFSService.getJarDetailSelect(companyid, jarId, jwtToken);
            return response.data;
        } catch (error) {
            console.error('Error fetching port data:', error);
            return [];
        }
    };



    const [loading, setLoading] = useState(false);




    const initialHubGatePass = {
        companyId: '', // Default value for Company_Id
        branchId: '',  // Default value for Branch_Id
        finYear: '',   // Default value for Fin_Year
        gatepassId: '', // Default value for Gatepass_Id
        sbTransId: '', // Default value for SB_Trans_Id
        stuffReqLineId: 0, // Default value for Stuff_Req_Line_Id
        sbLineNo: '', // Default value for SB_Line_No
        profitcentreId: 'N00005', // Default value for Profitcentre_Id
        gatepassDate: new Date(), // Default value for Gatepass_Date (use null for date fields)
        sbNo: '', // Default value for SB_No
        sbDate: null, // Default value for SB_Date
        shift: 'Day', // Default value for Shift
        stuffTally: 'Y', // Default value for stuff_tally
        cartingTransId: '', // Default value for Carting_Trans_Id
        cartingLineId: '', // Default value for Carting_Line_Id
        cartingTransDate: null, // Default value for Carting_Trans_Date
        totalCargoWeight: 0.00, // Default value for Total_Cargo_Weight
        shippingAgent: '', // Default value for Shipping_Agent
        shippingLine: '', // Default value for Shipping_Line
        exporterName: '', // Default value for Exporter_Name
        cargoDescription: '', // Default value for Cargo_Description
        onAccountOf: '', // Default value for On_Account_Of
        vesselId: '', // Default value for Vessel_Id
        viaNo: '', // Default value for VIA_No
        voyageNo: '', // Default value for Voyage_No
        terminal: '', // Default value for Terminal
        coverDetails: '', // Default value for Cover_Details
        coverDate: null, // Default value for Cover_Date
        berthingDate: null, // Default value for Berthing_Date
        gateOpenDate: null, // Default value for Gate_Open_Date
        gateInId: '', // Default value for Gate_In_Id
        agentSealNo: '', // Default value for Agent_Seal_No
        tareWeight: 0.000, // Default value for Tare_Weight
        containerSize: '', // Default value for Container_Size
        containerType: '', // Default value for Container_Type
        yardLocation: '', // Default value for Yard_Location
        yardBlock: '', // Default value for Yard_Block
        yardCellNo: '', // Default value for Yard_Cell_No
        yardLocation1: '', // Default value for Yard_Location1
        yardBlock1: '', // Default value for Yard_Block1
        blockCellNo1: '', // Default value for Block_Cell_No1
        yardPackages: 0.000, // Default value for Yard_Packages
        cellAreaAllocated: 0.000, // Default value for Cell_Area_Allocated
        areaReleased: 0.000, // Default value for Area_Released
        pod: '', // Default value for POD
        comments: '', // Default value for Comments
        typeOfPackage: '', // Default value for Type_Of_Package
        noOfPackages: 0, // Default value for No_Of_Packages
        noOfPackagesStuffed: 0, // Default value for No_Of_Packages_Stuffed
        contStuffPackages: 0, // Default value for Cont_Stuff_Packages
        cbm: '', // Default value for CBM
        containerNo: '', // Default value for Container_No
        currentLocation: '', // Default value for Current_Location
        periodFrom: null, // Default value for Period_From
        containerHealth: '', // Default value for container_health
        cargoWeight: 0.00, // Default value for Cargo_Weight
        status: '', // Default value for Status
        createdBy: '', // Default value for Created_By
        createdDate: null, // Default value for Created_Date
        editedBy: '', // Default value for Edited_By
        editedDate: null, // Default value for Edited_Date
        approvedBy: '', // Default value for Approved_By
        approvedDate: null, // Default value for Approved_Date
        labour: 'N', // Default value for Labour
        fk3MT: 'N', // Default value for Fk_3MT
        fk5MT: 'N', // Default value for Fk_5MT
        fk10MT: 'N', // Default value for Fk_10MT
        hydra12MT: 'N', // Default value for Hydra_12MT
        crane: 'N', // Default value for crane
        ssrTransId: '', // Default value for SSR_Trans_Id
        transporterName: '', // Default value for Transporter_Name
        vehicleNo: '', // Default value for Vehicle_No
        icdDestination: '', // Default value for ICD_Destination
        customSealNo: '', // Default value for Custom_Seal_No
        weightTakenIn: 0.000, // Default value for Weight_Taken_In
        grossWeight: 0.000, // Default value for Gross_Weight,
        shippingLineName: '',
        podDesc: '',
        stuffReqQty: '',
        driverName: ''
    };

    const [hubGatePass, setHubGatePass] = useState([initialHubGatePass]);
    const [validationErrors, setValidationErrors] = useState([]);
    const [containerHealthData, setContainerHealthData] = useState([]);
    const [selectedContainerNo, setSelectedContainerNo] = useState(null);
    const [containerData, setContainerData] = useState([]);
    const [errors, setErrors] = useState({});

    const [totals, setTotals] = useState({
        packages: 0,
        cargoWeight: 0
    });


    useEffect(() => {
        const totalStuffPackages = hubGatePass.reduce((acc, item) => acc + (Number(item.noOfPackagesStuffed) || 0), 0);
        const totalStuffWeight = hubGatePass.reduce((acc, item) => acc + (Number(item.cargoWeight) || 0), 0);

        setTotals({
            packages: totalStuffPackages,
            cargoWeight: totalStuffWeight
        });
    }, [hubGatePass]);







    const lastEntryWithId = hubGatePass.slice().reverse().find(entry => entry.gatepassId && entry.gatepassId.trim().length > 0);

    // If found, use it as lastEntry; otherwise, use the last entry in the array
    const lastEntry = lastEntryWithId || hubGatePass[hubGatePass.length - 1];

    console.log('hubGatePass \n', hubGatePass);






    // ContainerWise Stuffing request
    const handleContainerNoSearch = async (searchValue) => {
        if (!searchValue) {
            setContainerData([]);
            return;
        }
        try {
            const response = await MovementService.searchContainerNoForHubGatePass(companyid, branchId, searchValue, 'N00005', jwtToken);
            setContainerData(response.data);
        } catch (error) {
            setContainerData([]);
            console.error('Error searching ContainerData:', error);
        }
    };


    const handleContainerNoSelect = async (selectedOptionOld) => {
        setSelectedContainerNo(selectedOptionOld ? { value: selectedOptionOld.value, label: selectedOptionOld.value } : null);
        setContainerData([]);

        if (!selectedOptionOld) {
            setHubGatePass([initialHubGatePass]);
            setValidationErrors([]);
            return;
        }

        const response = await MovementService.searchContainerNoForHubGatePassSelect(
            companyid, branchId, selectedOptionOld.value, 'N00005', jwtToken
        );

        let selectedOptions = response.data; // Expecting an array

        if (!Array.isArray(selectedOptions) || selectedOptions.length === 0) {
            return; // No data received, avoid updating the state
        }

        // Get the first entry from hubGatePass (since it's a single object array)
        setHubGatePass((prevHubGatePass) => {
            const baseEntry = prevHubGatePass.length > 0 ? prevHubGatePass[0] : {};

            // Create a new array by merging received values into the initial structure
            return selectedOptions.map((selectedOption) => ({
                ...baseEntry, // Keep existing default fields
                containerNo: selectedOption.containerNo,
                containerSize: selectedOption.containerSize,
                containerType: selectedOption.containerType,
                shippingAgent: selectedOption.shippingAgent,
                shippingAgentName: selectedOption.shippingAgentName,
                shippingLine: selectedOption.shippingLine,
                shippingLineName: selectedOption.shippingLineName,
                onAccountOf: selectedOption.onAccountOf,
                containerHealth: selectedOption.containerHealth,
                tareWeight: selectedOption.tareWeight,
                inGateInDate: selectedOption.inGateInDate,
                deliveryOrderNo: selectedOption.deliveryOrderNo,
                gateInId: selectedOption.gateInId,
                stuffReqLineId: selectedOption.stuffReqLineId,
                sbTransId: selectedOption.sbTransId,
                sbLineNo: selectedOption.sbLineNo,
                sbNo: selectedOption.sbNo,
                sbDate: selectedOption.sbDate,
                exporterName: selectedOption.exporterName,
                cargoDescription: selectedOption.cargoDescription,
                noOfPackages: selectedOption.noOfPackages,
                pod: selectedOption.pod,
                podDesc: selectedOption.podDesc,
                stuffReqQty: selectedOption.stuffReqQty,
                noOfPackagesStuffed: selectedOption.noOfPackagesStuffed,
                cargoWeight: selectedOption.cargoWeight,
                grossWeight: selectedOption.grossWeight,
                cha: selectedOption.cha,
                terminal: selectedOption.terminal,
                vesselId: selectedOption.vesselId,
                viaNo: selectedOption.viaNo,
                periodFrom: selectedOption.periodFrom,
                customSealNo: selectedOption.customSealNo,
                agentSealNo: selectedOption.agentSealNo
            }));
        });

        // Update validationErrors state
        setValidationErrors((prevErrors) =>
            prevErrors.map(error => {
                const updatedError = { ...error };
                delete updatedError.containerNo;
                delete updatedError.containerHealth;
                return updatedError;
            })
        );
    };














    const handleHeaderChangeContainer = (fieldName, value, type, maxIntegerDigits, maxDecimalDigits) => {

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
        setHubGatePass(prevRequest =>
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




    const validateHubGatePass = (exportStuffRequest) => {
        let errors = [];

        exportStuffRequest.forEach((detail) => {
            const { vehicleNo, containerHealth, containerNo } = detail;
            let error = {};

            if (!vehicleNo) { error.vehicleNo = 'vehicleNo is required'; }
            if (!containerNo) { error.containerNo = 'containerNo is required'; }
            if (!containerHealth) error.containerHealth = 'containerHealth is required.';

            errors.push(error);
        });
        setValidationErrors(errors);
        return errors.every(error => Object.keys(error).length === 0);
    };










    const handleSaveHubGatePass = async (exportStuffRequest) => {
        if (!Array.isArray(exportStuffRequest) || exportStuffRequest.length === 0) {
            toast.warning('please select container!', {
                position: 'top-center',
                autoClose: 700,
            });
            return;
        }


        if (!validateHubGatePass(exportStuffRequest)) {
            toast.warning('Please enter required fields!', {
                position: 'top-center',
                autoClose: 1000,
            });
            return false;
        }
        setLoading(true);
        try {
            const response = await MovementService.saveHubGatePass(companyid, branchId, userId, exportStuffRequest, jwtToken);

            setHubGatePass(response.data);

            if (searchData && (searchData.sbNo || searchData.container)
            ) {
                updatePagesList("P00104");
            }
            toast.success('Data added Successfully!', {
                position: 'top-center',
                autoClose: 700,
            });


            return { success: true, cargoGateIns: response.data };
        } catch (error) {

            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data;

                // Extract SrNo and sbNo from the error message for targeted validation
                const match = errorMessage.match(/SrNo: (\d+) and IGM No: (\d+)/);
                if (match) {
                    const srNo = parseInt(match[1], 10);
                    const sbNo = match[2];

                    const errorMessageNew = `Duplicate IGM No found for SrNo: <strong>${srNo}</strong> and IGM No: <strong>${sbNo}</strong>`;
                    const contentWidth = errorMessageNew.length * 6;

                    toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessageNew }} />, {
                        position: 'top-center',
                        autoClose: 3000,
                        style: { width: `${contentWidth}px` },
                    });

                    // Find the index of the cargo entry based on SrNo
                    const errorIndex = hubGatePass.findIndex(entry => entry.stuffReqLineId === srNo);
                    if (errorIndex !== -1) {
                        const newErrors = [...validationErrors];
                        newErrors[errorIndex] = { ...newErrors[errorIndex], igmNo: `Duplicate Igm No: ${sbNo}` };
                        setValidationErrors(newErrors);
                    }
                }
                else {
                    toast.error(errorMessage, {
                        position: 'top-center',
                        autoClose: 3000,
                    });
                }
                return { success: false, cargoEntries: null };
            }

            toast.error('Oops something went wrong!', {
                position: 'top-center',
                autoClose: 700,
            });

            return { success: false, cargoGateIns: null };
        } finally {
            setLoading(false);
        }
    };









    const handleReset = async () => {
        setValidationErrors([]);
        setHubGatePass([initialHubGatePass]);
        setSelectedContainerNo(null);
    };



















    const searchSbSearch = async (searchvalue) => {
        setCurrentPageSbSearch(1);
        setLoading(true);
        try {
            const response = await MovementService.getGatePassEntriesToSelect(companyid, branchId, searchvalue, 'N00005', jwtToken);
            setSbSearchData(response.data);
        } catch (error) {
            console.error("Error fetching Stuffing entries:", error);
        } finally {
            setLoading(false);
        }
    };



    const getSelectedSbSearch = async (stuffReqId) => {

        setValidationErrors([]);
        setLoading(true);
        try {
            const response = await MovementService.getSelectedGatePassEntry(companyid, branchId, stuffReqId, jwtToken);
            setHubGatePass(response.data);
            const single = response.data[0];
            setSelectedContainerNo({ value: single.containerNo, label: single.containerNo });
        } catch (error) {
            console.error("Error fetching SB entries:", error);
        } finally {
            setLoading(false);
        }
    };



    const [isModalOpenForSbSearch, setIsModalOpenForSbSearch] = useState(false);

    const [searchSbvalues, setSearchSbvalues] = useState('');
    const [sbSearchData, setSbSearchData] = useState([]);



    const handleOpenSbSearch = (val) => {
        setIsModalOpenForSbSearch(true);
        setSearchSbvalues('');
        searchSbSearch();
    }


    const selectCSBSearchRadio = async (stuffReqId) => {
        await getSelectedSbSearch(stuffReqId);
        handleCloseSbSearch();
    }

    const handleCloseSbSearch = (val) => {
        setIsModalOpenForSbSearch(false);
        setSearchSbvalues('');
        setSbSearchData([]);
    }


    const clearSbSearchSearch = (val) => {
        setSearchSbvalues('');
        searchSbSearch();
    }

    // PAGINATION FOR SELECT EXPORTER
    const [currentPageSbSearch, setCurrentPageSbSearch] = useState(1);
    const [itemsPerPage] = useState(5);
    const indexOfLastItemSbSearch = currentPageSbSearch * itemsPerPage;
    const indexOfFirstItemSbSearch = indexOfLastItemSbSearch - itemsPerPage;
    const currentItemsSbSearch = sbSearchData.slice(indexOfFirstItemSbSearch, indexOfLastItemSbSearch);
    const totalPagesSbSearch = Math.ceil(sbSearchData.length / itemsPerPage);

    // Function to handle page change
    const handlePageChangeSbSearch = (page) => {
        if (page >= 1 && page <= totalPagesSbSearch) {
            setCurrentPageSbSearch(page);
        }
    };
    const displayPagesSbSearch = () => {
        const centerPageCount = 5;
        const middlePage = Math.floor(centerPageCount / 2);
        let startPage = currentPageSbSearch - middlePage;
        let endPage = currentPageSbSearch + middlePage;

        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(totalPagesSbSearch, centerPageCount);
        }

        if (endPage > totalPagesSbSearch) {
            endPage = totalPagesSbSearch;
            startPage = Math.max(1, totalPagesSbSearch - centerPageCount + 1);
        }
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };





    const formatDate = (value) => {
        if (!value) {
            return "";
        }

        const date = new Date(value);

        // Extract date components
        const day = String(date.getDate()).padStart(2, "0");
        const month = date.toLocaleString("en-US", { month: "short" }); // Get abbreviated month name
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    };






    const downLoadReport = async (type) => {
        setLoading(true);

        const dataTosend = {
            companyId: companyid,
            branchId: branchId,
            profitCenterId: lastEntry.profitcentreId,
            gateInId: lastEntry.gatepassId,
            userId: userId,
            type: type
        }
        try {
            const response = await MovementService.downLoadHubReport(dataTosend, jwtToken);

            if (response.status === 200) {
                const pdfData = response.data;
                const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
                const blobUrl = URL.createObjectURL(pdfBlob);

                window.open(blobUrl, '_blank');

                toast.success("Downloading Pdf!", {
                    position: 'top-center',
                    autoClose: 800,
                });
            } else {
                toast.error("error downLoading file!", {
                    position: 'top-center',
                    autoClose: 800,
                });
            }
        } catch (error) {
            console.error("Error downloading PDF:", error);
            // Handle the error, show an error message, etc.
        }
        finally {
            setLoading(false);
        }
    };















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
                {/* {mainSearch.operation === 'container' && ( */}

                <div className='ContainerWiseStuffingRequest'>


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
                                                Gate Pass No
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="service"
                                                maxLength={15}
                                                name="igmTransId"
                                                disabled
                                                value={lastEntry.gatepassId}
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col md={3} className="d-flex justify-content-end" style={{ marginTop: 21 }}>
                                        <button
                                            className="btn btn-outline-primary btn-margin newButton"
                                            style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            id="submitbtn2"
                                            onClick={handleOpenSbSearch}
                                        >
                                            <FontAwesomeIcon icon={faSearch} size="sm" />
                                        </button>

                                    </Col>
                                </Row>

                            </Col>



                            <Modal Modal isOpen={isModalOpenForSbSearch} onClose={handleCloseSbSearch} toggle={handleCloseSbSearch} style={{ maxWidth: '1100px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>

                                <ModalHeader toggle={handleCloseSbSearch} style={{
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
                                    /> Search Shipping Bill Entries</h5>

                                </ModalHeader>
                                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                    Search by Sb TransId / H_sb TransId / Sb No
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    id="searchSbvalues"
                                                    maxLength={15}
                                                    name='searchSbvalues'
                                                    value={searchSbvalues}
                                                    onChange={(e) => setSearchSbvalues(e.target.value)}
                                                />

                                            </FormGroup>
                                        </Col>
                                        <Col md={6} style={{ marginTop: 24 }}>
                                            <button
                                                className="btn btn-outline-primary btn-margin newButton"
                                                style={{ marginRight: 10, fontWeight: 'bold' }}
                                                id="submitbtn2"
                                                onClick={() => searchSbSearch(searchSbvalues)}
                                            >
                                                <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                                Search
                                            </button>
                                            <button
                                                className="btn btn-outline-danger btn-margin newButton"
                                                style={{ marginRight: 10, fontWeight: 'bold' }}
                                                id="submitbtn2"
                                                onClick={clearSbSearchSearch}
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
                                                    <th scope="col">Gate Pass No</th>
                                                    <th scope="col">Gate Pass Date</th>
                                                    <th scope="col">Profitcentre</th>
                                                    <th scope="col">Shipping Line</th>
                                                    <th scope="col">Container No</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                                <tr className='text-center'>
                                                    <th scope="col"></th>
                                                    <th scope="col">{sbSearchData.length}</th>
                                                    <th scope="col"></th>
                                                    <th scope="col"></th>
                                                    <th scope="col"></th>
                                                    <th scope="col"></th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentItemsSbSearch.map((item, index) => (
                                                    <>
                                                        <tr key={index} className='text-center'>
                                                            <td>
                                                                <input type="radio" name="radioGroup" onChange={() => selectCSBSearchRadio(item[0])} value={item[0]} />
                                                            </td>
                                                            <td>{item[0]}</td>
                                                            <td>{item[1]}</td>
                                                            <td>{item[3]}</td>
                                                            <td>{item[4]}</td>
                                                            <td>{item[5]}</td>
                                                            <td>{item[6] === 'A' ? 'Approved' : ''}</td>
                                                        </tr>
                                                    </>
                                                ))}
                                            </tbody>
                                        </table>
                                        <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                                            <Pagination.First onClick={() => handlePageChangeSbSearch(1)} />
                                            <Pagination.Prev
                                                onClick={() => handlePageChangeSbSearch(currentPageSbSearch - 1)}
                                                disabled={currentPageSbSearch === 1}
                                            />
                                            <Pagination.Ellipsis />

                                            {displayPagesSbSearch().map((pageNumber) => (
                                                <Pagination.Item
                                                    key={pageNumber}
                                                    active={pageNumber === currentPageSbSearch}
                                                    onClick={() => handlePageChangeSbSearch(pageNumber)}
                                                >
                                                    {pageNumber}
                                                </Pagination.Item>
                                            ))}

                                            <Pagination.Ellipsis />
                                            <Pagination.Next
                                                onClick={() => handlePageChangeSbSearch(currentPageSbSearch + 1)}
                                                disabled={currentPageSbSearch === totalPagesSbSearch}
                                            />
                                            <Pagination.Last onClick={() => handlePageChangeSbSearch(totalPagesSbSearch)} />
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
                                        Gate Pass Date
                                    </label>
                                    <div style={{ position: "relative" }}>
                                        <DatePicker
                                            selected={lastEntry.gatepassDate}
                                            name="stuffReqDate"
                                            // onChange={(date) => handlePaymentDateChangeHeaderContainer(date, 'stuffReqDate')}
                                            placeholderText="Gate Pass Date"
                                            dateFormat="dd/MM/yyyy HH:mm"
                                            timeInputLabel="Time:"
                                            showTimeInput
                                            timeFormat="HH:mm"
                                            timeIntervals={15}
                                            disabled
                                            className={`form-control ${validationErrors.length > 0 && validationErrors[validationErrors.length - 1]?.gatepassDate ? 'error-border' : ''}`}
                                            wrapperClassName="custom-react-datepicker-wrapper"
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
                                        Profit Centre Id
                                        {/* <span className="error-message">*</span> */}
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
                                    <label className="forlabel" for="HazardousHazardous">Shift</label>
                                    <div style={{ position: 'relative' }}>
                                        <Input
                                            type="select"
                                            name="shift"
                                            className={`form-control ${validationErrors.length > 0 && validationErrors[validationErrors.length - 1]?.shift ? 'error-border' : ''}`}
                                            value={lastEntry.shift}
                                            onChange={(e) => handleHeaderChangeContainer('shift', e.target.value)}
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
                                        Container No <span className="error-message">*</span>
                                    </label>
                                    <div style={{ position: "relative" }}>
                                        <Select
                                            options={containerData}
                                            value={selectedContainerNo}
                                            onInputChange={(inputValue, { action }) => {
                                                if (action === 'input-change') {
                                                    handleContainerNoSearch(inputValue);
                                                }
                                            }}
                                            onChange={handleContainerNoSelect}
                                            className={`${validationErrors.some(error => error.hasOwnProperty('containerNo')) ? 'error-border' : ''}`}
                                            placeholder="Select ContainerNo"
                                            isClearable
                                            isDisabled={lastEntry.gatepassId}
                                            id="containerNo"
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
                                    <label className="forlabel bold-label" htmlFor="terminalInputs">
                                        Container Size/Type
                                    </label>
                                    <div className="d-flex flex-wrap">
                                        <input
                                            className="form-control me-1" // Slight margin added to the right for spacing
                                            style={{ flex: "1 1 0", minWidth: "0" }} // Ensure flexibility for both inputs
                                            type="text"
                                            id="service"
                                            readOnly
                                            maxLength={15}
                                            name="containerSize"
                                            value={lastEntry.containerSize}
                                            tabIndex={-1}
                                        />
                                        <input
                                            className="form-control"
                                            style={{ flex: "1 1 0", minWidth: "0" }} // Ensure flexibility for both inputs
                                            type="text"
                                            id="service"
                                            readOnly
                                            maxLength={15}
                                            name="containerType"
                                            value={lastEntry.containerType}
                                            tabIndex={-1}
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
                                        Container Health <span className="error-message">*</span>
                                    </label>

                                    <Input
                                        type="select"
                                        value={lastEntry.containerHealth}
                                        className={`form-control ${validationErrors.some(error => error.hasOwnProperty('containerHealth')) ? 'error-border' : ''}`}
                                        onChange={(e) => handleHeaderChangeContainer('containerHealth', e.target.value)}
                                        disabled={lastEntry.gatepassId}
                                    >
                                        <option value="">Select Container Health</option>
                                        {containerHealthData.map((type, idx) => (
                                            <option key={idx} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </Input>

                                </FormGroup>
                            </Col>






                            <Col md={2}>
                                <FormGroup>
                                    <label
                                        className="forlabel bold-label"
                                        htmlFor="vehicleNo"
                                    >
                                        Vehicle No <span className="error-message">*</span>
                                    </label>

                                    <div style={{ position: "relative" }}>
                                        <input
                                            type="text"
                                            id="destination"
                                            maxLength={13}
                                            className={` form-control ${validationErrors.some(error => error.hasOwnProperty('vehicleNo')) ? 'error-border' : ''}`}
                                            name="vehicleNo"
                                            value={lastEntry.vehicleNo}
                                            onChange={(e) => handleHeaderChangeContainer('vehicleNo', e.target.value)}
                                            disabled={lastEntry.gatepassId}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>

                            <Col md={2}>
                                <FormGroup>
                                    <label
                                        className="forlabel bold-label"
                                        htmlFor="driverName"
                                    >
                                       Driver Name
                                    </label>

                                    <div style={{ position: "relative" }}>
                                        <input
                                            type="text"
                                            id="driverName"
                                            maxLength={100}
                                            className={` form-control ${validationErrors.some(error => error.hasOwnProperty('vehicleNo')) ? 'error-border' : ''}`}
                                            name="driverName"
                                            value={lastEntry.driverName}
                                            onChange={(e) => handleHeaderChangeContainer('driverName', e.target.value)}
                                            disabled={lastEntry.gatepassId}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>






                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Shipping Line
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        maxLength={15}
                                        id="service"
                                        readOnly
                                        name="igmNo"
                                        value={lastEntry.shippingLineName}
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
                                        Period From
                                    </label>
                                    <div style={{ position: "relative" }}>
                                        <DatePicker
                                            selected={lastEntry.gateOpenDate}
                                            name="stuffReqDate"
                                            // onChange={(date) => handlePaymentDateChangeHeaderContainer(date, 'stuffReqDate')}
                                            placeholderText="Period From"
                                            dateFormat="dd/MM/yyyy"
                                            showTimeInput
                                            disabled
                                            className={`form-control ${validationErrors.length > 0 && validationErrors[validationErrors.length - 1]?.stuffReqDate ? 'error-border' : ''}`}
                                            wrapperClassName="custom-react-datepicker-wrapper"
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
                                        Transporter Name
                                    </label>

                                    <div style={{ position: "relative" }}>
                                        <input
                                            type="text"
                                            id="customSealNo"
                                            maxLength={60}
                                            className={` form-control ${validationErrors.some(error => error.hasOwnProperty('transporterName')) ? 'error-border' : ''}`}
                                            name="customSealNo"
                                            value={lastEntry.transporterName}
                                            onChange={(e) => handleHeaderChangeContainer('transporterName', e.target.value)}
                                        />

                                    </div>
                                </FormGroup>
                            </Col>


                            <Col md={2}>
                                <FormGroup>
                                    <label
                                        className="forlabel bold-label"
                                        htmlFor="icdDestination"
                                    >
                                        ICD Destination
                                    </label>
                                    <div style={{ position: "relative" }}>
                                        <input
                                            type="text"
                                            id="icdDestination"
                                            maxLength={60}
                                            className={` form-control ${validationErrors.some(error => error.hasOwnProperty('icdDestination')) ? 'error-border' : ''}`}
                                            name="agentSealNo"
                                            value={lastEntry.icdDestination}
                                            onChange={(e) => handleHeaderChangeContainer('icdDestination', e.target.value)}
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
                                        Remarks
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="comments"
                                        name='comments'
                                        value={lastEntry.comments}
                                        onChange={(e) => handleHeaderChangeContainer('comments', e.target.value)}
                                        maxLength={150}
                                        rows={2}
                                    ></textarea>
                                </FormGroup>
                            </Col>


                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Total Gate Pass Packages
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="service"
                                        readOnly
                                        maxLength={15}
                                        name="viaNo"
                                        value={totals.packages}
                                        tabIndex={-1}
                                    />
                                </FormGroup>
                            </Col>



                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Total CargoWeight
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="service"
                                        readOnly
                                        maxLength={15}
                                        name="viaNo"
                                        value={totals.cargoWeight}
                                        tabIndex={-1}
                                    />
                                </FormGroup>
                            </Col>









                        </Row>

                        <Row className="text-center mt-1 mb-1">
                            <Col>
                                <button
                                    className="btn btn-outline-primary btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    onClick={(e) => handleSaveHubGatePass(hubGatePass)}
                                >
                                    <FontAwesomeIcon
                                        icon={faSave}
                                        style={{ marginRight: "5px" }}
                                    />
                                    Save
                                </button>

                                <button
                                    className="btn btn-outline-danger btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    onClick={handleReset}
                                >
                                    <FontAwesomeIcon
                                        icon={faRefresh}
                                        style={{ marginRight: "5px" }}
                                    />
                                    Clear
                                </button>


                                {lastEntry.gatepassId && (
                                    <button
                                        className="btn btn-outline-primary btn-margin newButton"
                                        style={{ marginRight: 10, fontSize: 13 }}
                                        id="submitbtn2"
                                        onClick={(e) => downLoadReport('GatePass')}
                                    >
                                        <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                        Report
                                    </button>
                                )}

                            </Col>
                        </Row>
                    </div>




                    <hr />

                    <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>

                        <h5>HUB Container Wise Details</h5>

                        <Table className="table table-bordered" style={{ border: '2px solid black' }}>
                            <thead className="tableHeader">
                                <tr>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Sr No
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        IGM Trans Id
                                    </th>

                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        IGM Line No
                                    </th>

                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        IGM No
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        IGM Date
                                    </th>

                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Cargo Description
                                    </th>

                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Exporter
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        No Of Pack
                                    </th>

                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        POD
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Stuffed Req Qty
                                    </th>

                                    <th scope="col" className="text-center" style={{ color: "black" }}>
                                        Gate Pass Qty
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {hubGatePass.map((cargoEntry, index) => (
                                    <tr key={index} className="text-center">
                                        <td>
                                            {index + 1}
                                        </td>


                                        <td>
                                            <FormGroup>
                                                <Input
                                                    type="text"
                                                    value={cargoEntry.sbTransId}
                                                    className={`inputwidthTuka form-control`}
                                                    readOnly
                                                    id="service"
                                                    tabIndex={-1}
                                                />
                                            </FormGroup>
                                        </td>

                                        <td>
                                            <FormGroup>
                                                <Input
                                                    type="text"
                                                    value={cargoEntry.sbLineNo}
                                                    className={`inputwidthTukaMin form-control`}
                                                    readOnly
                                                    id="service"
                                                    tabIndex={-1}
                                                />
                                            </FormGroup>
                                        </td>


                                        <td>
                                            <FormGroup>
                                                <Input
                                                    type="text"
                                                    value={cargoEntry.sbNo}
                                                    className={`inputwidthTuka form-control`}
                                                    readOnly
                                                    id="service"
                                                    tabIndex={-1}
                                                />
                                            </FormGroup>
                                        </td>

                                        <td>
                                            <FormGroup>
                                                <Input
                                                    type="text"
                                                    value={formatDate(cargoEntry.sbDate)}
                                                    className={`inputwidthTuka form-control`}
                                                    readOnly
                                                    id="service"
                                                    tabIndex={-1}
                                                />
                                            </FormGroup>
                                        </td>

                                        <td>
                                            <FormGroup>
                                                <Input
                                                    type="text"
                                                    value={cargoEntry.cargoDescription}
                                                    className={`inputwidthTukaMax form-control`}
                                                    readOnly
                                                    id="service"
                                                    tabIndex={-1}
                                                />
                                            </FormGroup>
                                        </td>



                                        <td>
                                            <FormGroup>
                                                <Input
                                                    type="text"
                                                    value={cargoEntry.exporterName}
                                                    className={`inputwidthTukaMax form-control`}
                                                    readOnly
                                                    id="service"
                                                    tabIndex={-1}
                                                />
                                            </FormGroup>
                                        </td>

                                        <td>
                                            <FormGroup>
                                                <Input
                                                    type="text"
                                                    value={cargoEntry.noOfPackages}
                                                    className={`inputwidthTuka form-control`}
                                                    readOnly
                                                    id="service"
                                                    tabIndex={-1}
                                                />
                                            </FormGroup>
                                        </td>


                                        <td>
                                            <FormGroup>
                                                <Input
                                                    type="text"
                                                    value={cargoEntry.podDesc}
                                                    className={`inputwidthTuka form-control`}
                                                    readOnly
                                                    id="service"
                                                    tabIndex={-1}
                                                />
                                            </FormGroup>
                                        </td>


                                        <td>
                                            <FormGroup>
                                                <Input
                                                    type="text"
                                                    value={cargoEntry.stuffReqQty}
                                                    className={`inputwidthTuka form-control`}
                                                    disabled
                                                    id="service"
                                                />
                                            </FormGroup>
                                        </td>



                                        <td>
                                            <FormGroup>
                                                <Input
                                                    type="text"
                                                    value={cargoEntry.noOfPackagesStuffed}
                                                    className={`inputwidthTuka form-control`}
                                                    disabled
                                                    id="service"
                                                />
                                            </FormGroup>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </Table>
                    </div>











                </div >
            </div >


        </>
    );
}

export default HubGatePass;
