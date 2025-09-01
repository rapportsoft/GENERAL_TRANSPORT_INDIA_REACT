import AuthContext from '../Components/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import Select from 'react-select';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faChevronUp, faChevronDown, faMoneyBill, faCalendarAlt, faEdit, faSave, faPrint, faUpload, faDownload, faFileInvoiceDollar, faHistory } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import useAxios from '../Components/useAxios';
import vendorTariffService from "../service/vendorTariffService";
import { toast } from 'react-toastify';
import moment from 'moment';
import { FaTags } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';

export default function VendorTariff() {
    const navigate = useNavigate();
    const axios = useAxios();
    const { isAuthenticated } = useContext(AuthContext);

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
        userRights
    } = useContext(AuthContext);


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
    };

    const [loading, setLoading] = useState(false);
    const axiosInstance = useAxios();
    const FinanceService = new vendorTariffService(axiosInstance);


    useEffect(() => {
        const fetchData = async () => {
            getAllActiveServices();
            await searchSavedTariff('L');
        };
        fetchData();
    }, []);



    const getAllActiveServices = async () => {
        try {
            const response = await FinanceService.getAllServices(companyid, branchId, jwtToken);
            const { commodity, container, cargo, services } = response.data;

            console.log('All Services : ', response.data);


            setContainerSize(container ? container : []);
            setCargoType(cargo ? cargo : []);
            setCommodity(commodity ? commodity : []);
            setServices(services ? services : services);
        } catch (error) {
            console.error("Error fetching active services:", error);
            setContainerSize([]);
            setCargoType([]);
            setCommodity([]);
            setServices([]);
        }
    };






    // Main Search
    const initialSearchValue = {
        companyId: companyid,
        branchId: branchId,
        tarrifType: 'L',
        tariffNo: '',
        cfsAmndNo: ''
    };

    const [mainSearch, setMainSearch] = useState(initialSearchValue);

    const [searchTariffs, setSearchTariffs] = useState([]);
    const [selectedSearchTariff, setSelectedSearchTariff] = useState(null);



    const handleMainSearchChange = (e) => {
        const { name, value } = e.target;
        searchSavedTariff(value);
        setMainSearch((prev) => {
            const updatedSearch = {
                ...prev,
                [name]: value,
            };
            return updatedSearch;
        });
    };

    const searchSavedTariff = async (type) => {
        try {
            const response = await FinanceService.searchSavedTariff(companyid, branchId, type, jwtToken);
            setSearchTariffs(response.data);
            if (type === 'L') {
                setApplyRatesOfData(response.data);
            }
        } catch (error) {
            console.error("Error while searching saved tariff:", error);
            setSearchTariffs([]);
            setApplyRatesOfData([]);
        }
    };


    const handleSearchHeaderChange = (selectedOption) => {
        const updatedSearch = {
            companyId: mainSearch.companyId,
            branchId: mainSearch.branchId,
            tarrifType: mainSearch.tarrifType,
            tariffNo: selectedOption?.value || '',
            cfsAmndNo: selectedOption?.cfsAmndNo || ''
        };
        setSelectedSearchTariff(selectedOption);

        if (selectedOption) {
            setMainSearch(updatedSearch);
            searchTarrifMain(updatedSearch);
        }
        else {
            handleReset();
        }

    };






    const searchTarrifMain = async (searchCriteria) => {
        try {
            const response = await FinanceService.getSavedTariff(searchCriteria, jwtToken);
            console.log('response.data ', response.data);

            setCfsTarrif(response.data);
            updateSelectTags(response.data);
        } catch (error) {
            console.error("Error while fetching tariff:", error);
        }
    };




    const handleReset = async () => {
        setMainSearch(initialSearchValue);
        setselectedAgent(null);
        setselectedLine(null);
        setSelectedCha(null);
        setselectedCustomer(null);
        setSelectedImpExp(null);
        setSelectedApplyRatesOf(null);
        setSelectedForwarder(null);
        setCfsTarrif(initialCfsTariff);
        setCfsTariffService([initialCFSTariffService]);
        setSelectedSearchTariff(null);
        setvalidationErrorsCfsTariffService([]);
        setValidationErrorsCfsTariff([]);
        setService({});
    }

    //////////////////////////////////////////////////////


    // Objects cfsTarrif
    const initialCfsTariff = {
        companyId: companyid,             // String, length 6
        branchId: branchId,              // String, length 6
        finYear: '',               // String, length 4
        profitCentreId: '',        // String, length 10
        cfsTariffNo: '',           // String, length 10
        cfsAmndNo: '',             // String, length 3
        partyId: '',               // String, length 50
        status: '',                // String, length 1
        contractName: '',          // String, length 250
        shippingLine: '',          // String, length 6
        cha: '',                   // String, length 6
        importerId: '',            // String, length 6
        exporterId: '',            // String, length 6
        shippingAgent: '',         // String, length 6
        forwarderId: '',           // String, length 6
        consolerId: '',            // String, length 6
        cfsTariffDate: null,       // Date, use null for default
        cfsFromDate: null,         // Date, use null for default
        cfsValidateDate: null,     // Date, use null for default
        filePath: '',              // String, length 140
        refTariffNo: '',           // String, length 10
        comments: '',              // String, length 150
        createdBy: '',             // String, length 10
        createdDate: null,         // Date, use null for default
        editedBy: '',              // String, length 10
        editedDate: null,          // Date, use null for default
        approvedBy: '',            // String, length 10
        approvedDate: null,        // Date, use null for default
        ammendStatus: '',          // String, length 1
        nvoccTariff: 'N',          // String, length 1, default "N"
        offdocTariff: 'N',         // String, length 1, default "N"
        tariffType: 'Standard',    // String, length 12, default "Standard"
        refTariffId: '',           // String, length 10
        refTariffAmndId: '',       // String, length 3
        partyName: '',
        shippingAgentName: '',
        shippingLineName: '',
        chaName: '',
        importerName: '',
        forwarderName: '',
        applyTariffNo: '',
        applyAmendNo: '',
        selectedFile: ''
    };


    const initialCFSTariffService = {
        companyId: companyid,          // String, length 10
        branchId: branchId,           // String, length 10
        finYear: '',            // String, length 6
        cfsTariffNo: '',        // String, length 10
        cfsAmendNo: '',         // String, length 10
        serviceId: '',          // String, length 10
        srNo: 0,             // BigDecimal (use null for initial state)
        containerSize: '',      // String, length 5
        commodityCode: '',      // String, length 7
        cargoType: '',          // String, length 10
        status: '',             // String, length 1
        rangeType: '',          // String, length 10
        profitCentreId: '',     // String, length 10
        serviceUnit: '',        // String, length 10
        serviceUnitI: '',       // String, length 10
        fromRange: null,        // BigDecimal (use null for initial state)
        toRange: null,          // BigDecimal (use null for initial state)
        rate: null,             // BigDecimal (use null for initial state)
        minimumRate: null,      // BigDecimal (use null for initial state)
        createdBy: '',          // String, length 10
        createdDate: null,      // Date (use null for initial state)
        editedBy: '',           // String, length 10
        editedDate: null,       // Date (use null for initial state)
        approvedBy: '',         // String, length 10
        approvedDate: null,     // Date (use null for initial state)
        currencyId: 'INR',      // String, length 10
        ammendStatus: '',       // String, length 1
        defaultChk: 'N'         // String, length 1, default 'N'
    };



    const [validationErrorsCfsTariff, setValidationErrorsCfsTariff] = useState([]);
    const [validationErrorsCfsTariffService, setvalidationErrorsCfsTariffService] = useState([]);
    const [service, setService] = useState({});
    const [cfsTariff, setCfsTarrif] = useState(initialCfsTariff);
    const [cfsTariffService, setCfsTariffService] = useState([initialCFSTariffService]);

    const [customerData, setCustomerData] = useState([]);
    const [impExpData, setImpExpData] = useState([]);
    const [chaData, setChaData] = useState([]);
    const [agentData, setAgentData] = useState([]);
    const [consolerData, setConsolerData] = useState([]);
    const [lineData, setLineData] = useState([]);
    const [forwarderData, setForwarderData] = useState([]);
    const [applyRatesOfData, setApplyRatesOfData] = useState([]);

    const [selectedForwarder, setSelectedForwarder] = useState(null);
    const [selectedCha, setSelectedCha] = useState(null);
    const [selectedAgent, setselectedAgent] = useState(null);
    const [selectedImpExp, setSelectedImpExp] = useState(null);
    const [selectedLine, setselectedLine] = useState(null);
    const [selectedCustomer, setselectedCustomer] = useState(null);
    const [selectedConsole, setselectedConsole] = useState(null);
    const [selectedApplyRatesOf, setSelectedApplyRatesOf] = useState(null);

    const [services, setServices] = useState([]);
    const [containerSize, setContainerSize] = useState([]);
    const [cargoType, setCargoType] = useState([]);
    const [commodity, setCommodity] = useState([]);









    const handleDateChangeCfsTariff = (inputField, date) => {
        setCfsTarrif(prevState => ({
            ...prevState,
            [inputField]: date
        }));

        setValidationErrorsCfsTariff((prevErrors) => ({
            ...prevErrors,
            [inputField]: '',
        }));
    };


    const handleChangeCfsTarrif = (e) => {
        const { name } = e.target;
        const value = e.target.type === 'checkbox' ? (e.target.checked ? 'Y' : 'N') : e.target.value;

        setValidationErrorsCfsTariff((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));

        setCfsTarrif({
            ...cfsTariff,
            [name]: value
        });
    };


    const searchExporter = async (searchValue, type) => {

        try {
            const response = await FinanceService.searchExporter(companyid, branchId, searchValue, type, jwtToken);

            const selectedOption = response.data;
            if (type === 'cha') {
                setChaData(selectedOption);
            }
            else if (type === 'forwarderId') {
                setForwarderData(selectedOption);
            }
            else if (type === 'shippingAgent') {
                setAgentData(selectedOption);
            }
            else if (type === 'shippingLine') {
                setLineData(selectedOption);
            }
            else if (type === 'partyId') {
                setCustomerData(selectedOption);
            }
            // else if (type === 'consolerId') {
            //     setConsolerData(selectedOption);
            // }
            else if (type === 'impExp') {
                setImpExpData(selectedOption);
            }
        } catch (error) {
            toast.error('Oops something went wrong!', {
                position: 'top-center',
                autoClose: 700,
            });
        }

    };







    const handleSelectChange = async (selectedOption, type) => {
        if (type === 'cha') {
            setSelectedCha(selectedOption);
            updateExportGateIn('cha', selectedOption ? selectedOption.value : '');
            updateValidationErrors('cha');
        }
        else if (type === 'forwarderId') {
            setSelectedForwarder(selectedOption);
            updateExportGateIn('forwarderId', selectedOption ? selectedOption.value : '');
            updateValidationErrors('forwarderId');
        }
        else if (type === 'shippingAgent') {
            setselectedAgent(selectedOption);
            updateExportGateIn('shippingAgent', selectedOption ? selectedOption.value : '');
        }
        else if (type === 'shippingLine') {
            setselectedLine(selectedOption);
            updateExportGateIn('shippingLine', selectedOption ? selectedOption.value : '');
        }
        else if (type === 'partyId') {
            setselectedCustomer(selectedOption);
            updateExportGateIn('partyId', selectedOption ? selectedOption.value : '');
        }
        else if (type === 'consolerId') {
            setselectedConsole(selectedOption);
            updateExportGateIn('consolerId', selectedOption ? selectedOption.value : '');
        }
        else if (type === 'impExp') {
            setSelectedImpExp(selectedOption);
            updateExportGateIn('importerId', selectedOption ? selectedOption.value : '');
            updateExportGateIn('exporterId', selectedOption ? selectedOption.value : '');
        }
        else if (type === 'apply') {
            setSelectedApplyRatesOf(selectedOption);
            updateExportGateIn('applyTariffNo', selectedOption ? selectedOption.value : '');
            updateExportGateIn('applyAmendNo', selectedOption ? selectedOption.cfsAmndNo : '');
        }

    }

    const updateExportGateIn = (field, value) => {
        setCfsTarrif((prevExportSbEntry) => ({
            ...prevExportSbEntry,
            [field]: value,
        }));
    };

    const updateValidationErrors = (field) => {
        setValidationErrorsCfsTariff((prevErrors) => ({
            ...prevErrors,
            [field]: '',
        }));
    };



    const handleServiceClick = async (service) => {

        if (!cfsTariff.cfsTariffNo) {
            toast.warning("Save the tariff First...", {
                position: 'top-center',
                autoClose: 1000,
            });
            return;
        }

        try {
            const response = await FinanceService.getSingleService(companyid, branchId, service.serviceId, cfsTariff.cfsTariffNo, cfsTariff.cfsAmndNo, jwtToken);
            setService(service);
            setCfsTariffService(response.data);
            console.log('selectedService : ', response.data);
        } catch (error) {
            console.error("Error fetching active services:", error);
        }
    };





    // const handleFieldChange = (e, index, fieldName, type, maxIntegerDigits, maxDecimalDigits) => {
    //     let { value, checked, type: inputType } = e.target;

    //     // Handle checkbox input
    //     if (inputType === 'checkbox') {
    //         value = checked ? 'Y' : 'N';
    //     } else {
    //         // Process other types of inputs
    //         if (type === 'decimal') {
    //             // Remove invalid characters
    //             value = value.replace(/[^0-9.]/g, '');

    //             const parts = value.split('.');

    //             // If there are more than 2 parts, combine them correctly
    //             if (parts.length > 2) {
    //                 value = parts[0] + '.' + parts.slice(1).join('');
    //             }

    //             // Limit the integer part
    //             if (parts[0].length > maxIntegerDigits) {
    //                 parts[0] = parts[0].slice(0, maxIntegerDigits);
    //             }

    //             // Limit the decimal part
    //             if (parts[1]) {
    //                 parts[1] = parts[1].slice(0, maxDecimalDigits);
    //             }

    //             value = parts.join('.');
    //         } else if (type === 'number') {
    //             value = value.replace(/[^0-9]/g, '');
    //         }
    //     }

    //     setCfsTariffService(prevState => {
    //         const updatedTransDtl = [...prevState];
    //         updatedTransDtl[index] = {
    //             ...updatedTransDtl[index],
    //             [fieldName]: value,
    //         };

    //         return updatedTransDtl;
    //     });

    //     // Clear the validation error for the field
    //     setvalidationErrorsCfsTariffService(prevErrors => {
    //         const updatedErrors = [...prevErrors];
    //         if (updatedErrors[index]) {
    //             delete updatedErrors[index][fieldName];
    //         }
    //         return updatedErrors;
    //     });
    // };


    const handleFieldChange = (e, index, fieldName, type, maxIntegerDigits, maxDecimalDigits) => {
        let { value, checked, type: inputType } = e.target;

        // Handle input based on type
        if (inputType === 'checkbox') {
            value = checked ? 'Y' : 'N';
        } else {
            value = handleInputByType(type, value, maxIntegerDigits, maxDecimalDigits);
        }

        // Update state
        setCfsTariffService(prevState => {
            const updatedTransDtl = [...prevState];
            updatedTransDtl[index] = {
                ...updatedTransDtl[index],
                [fieldName]: value
            };

            // Sync "Select All" checkbox if necessary
            if (fieldName === 'defaultChk') {
                const allChecked = updatedTransDtl.every(item => item[fieldName] === 'Y');
                setSelectAll(allChecked);
            }

            return updatedTransDtl;
        });

        // Clear validation errors for the field
        setvalidationErrorsCfsTariffService(prevErrors => {
            const updatedErrors = [...prevErrors];
            if (updatedErrors[index]) {
                updatedErrors[index] = { ...updatedErrors[index] };
                delete updatedErrors[index][fieldName];
                if (Object.keys(updatedErrors[index]).length === 0) {
                    updatedErrors[index] = undefined;
                }
            }
            return updatedErrors;
        });
    };

    // Helper function to process input based on its type
    const handleInputByType = (type, value, maxIntegerDigits, maxDecimalDigits) => {
        if (type === 'decimal') {
            const regex = new RegExp(`^\\d{0,${maxIntegerDigits}}(\\.\\d{0,${maxDecimalDigits}})?`);
            return value.match(regex)?.[0] || '';
        }
        if (type === 'number') {
            return value.replace(/[^0-9]/g, '');
        }
        return value;
    };



    const updateSelectTags = async (cfsTariff) => {
        const initialSA = { value: cfsTariff.shippingAgent, label: cfsTariff.shippingAgentName }; cfsTariff.shippingAgent ? setselectedAgent(initialSA) : setselectedAgent(null);
        const initialSL = { value: cfsTariff.shippingLine, label: cfsTariff.shippingLineName }; cfsTariff.shippingLine ? setselectedLine(initialSL) : setselectedLine(null);
        const initialcha = { value: cfsTariff.cha, label: cfsTariff.chaName }; cfsTariff.cha ? setSelectedCha(initialcha) : setSelectedCha(null);
        const initialCustomer = { value: cfsTariff.partyId, label: cfsTariff.partyName }; cfsTariff.partyId ? setselectedCustomer(initialCustomer) : setselectedCustomer(null);
        const initialImporter = { value: cfsTariff.importerId, label: cfsTariff.importerName }; cfsTariff.importerId ? setSelectedImpExp(initialImporter) : setSelectedImpExp(null);
        const initialForwarder = { value: cfsTariff.forwarderId, label: cfsTariff.forwarderName }; cfsTariff.forwarderId ? setSelectedForwarder(initialForwarder) : setSelectedForwarder(null);
    }











    const validateCfsTariffMain = (cfsTariff) => {
        let errors = {};

        const { cfsFromDate, cfsValidateDate, contractName } = cfsTariff;

        // Validate required fields
        if (!cfsFromDate) errors.cfsFromDate = 'CFSFromDate is required.';
        if (!cfsValidateDate) errors.cfsValidateDate = 'CFSValidateDate is required.';
        if (!contractName) errors.contractName = 'ContractName is required.';

        // Set the merged errors
        setValidationErrorsCfsTariff(errors);

        // Check if there are any errors and return validation result
        return Object.keys(errors).length === 0;
    };










    const validateCfsTariffDetail = (cfsTariffService) => {
        let errors = [];
        let checkedDetails = []; // To include all checked rows (valid/invalid)

        cfsTariffService.forEach((detail) => {
            const { containerSize, commodityCode, cargoType, fromRange, toRange, rate, defaultChk, minimumRate, rangeType } = detail;

            // Check if the row is empty (skip completely empty rows only)
            const isRowEmpty = !containerSize && !commodityCode && !cargoType && !fromRange && !toRange && !rate && !minimumRate && defaultChk === 'N';
            if (isRowEmpty) {
                return;
            }

            // Initialize error object for the current row
            let error = {};

            // Perform validations
            if (!containerSize) error.containerSize = 'Container Size is required.';
            if (!commodityCode) error.commodityCode = 'Commodity Code is required.';
            if (!cargoType) error.cargoType = 'Cargo Type is required.';

            if (rate == null || rate === '') {
                error.rate = 'Rate is required and should be greater than 0.';
            }
            if (rangeType !== 'NA') {

                if (fromRange == null || fromRange === '') {
                    error.fromRange = 'From Range is required';
                }

                if (!toRange || toRange <= 0) {
                    error.toRange = 'To Range is required and should be greater than 0.';
                }
            }


            // Capture errors
            errors.push(error);

            // Add row to the checked data array regardless of validity
            checkedDetails.push({ ...detail, errors });
        });

        // Set errors in state
        setvalidationErrorsCfsTariffService(errors);

        // Check if all rows are completely valid
        const allRowsAreValid = errors.every((error) => Object.keys(error).length === 0);


        // Return both the checked rows and the boolean flag
        return { checkedDetails, allRowsAreValid };
    };










    const handleSaveMainTariff = async (type) => {

        if (type === 'A' && (!cfsTariff?.cfsTariffNo && isReadOnlyDisabled)) {
            toast.warning('First save the tariff!', {
                position: 'top-center',
                autoClose: 1000,
            });
            return false;
        }


        if (!validateCfsTariffMain(cfsTariff)) {
            toast.warning('Please enter required fields!', {
                position: 'top-center',
                autoClose: 1000,
            });
            return false;
        }


        if (
            !cfsTariff.partyId &&
            !cfsTariff.forwarderId &&
            !cfsTariff.cha &&
            !cfsTariff.shippingAgent &&
            !cfsTariff.shippingLine &&
            !cfsTariff.importerId
        ) {
            toast.warning('Select at least one party!', {
                position: 'top-center',
                autoClose: 1000,
            });
            return;
        }

        setLoading(true);
        try {
            const response = await FinanceService.addHeaderCfsTariff(companyid, branchId, userId, cfsTariff, type, jwtToken);
            setCfsTarrif(response.data);
            let successMessege;

            type === 'A' ? successMessege = 'Tariff Approved Successfully' : successMessege = 'Tariff Saved Successfully';

            toast.success(<div dangerouslySetInnerHTML={{ __html: successMessege }} />, {
                position: 'top-center',
                autoClose: 1500,
            });
            setCfsTariffService([]);
            searchSavedTariff(mainSearch.tarrifType);
            setService({});
            updateSelectTags(response.data);

        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data;

                if (typeof errorMessage === 'object' && errorMessage.details) {
                    const { field, details } = errorMessage;

                    if (field === 'contractName') {
                        // Handle Duplicate Container No
                        const { contractName } = details;

                        const errorMessageNew = `Duplicate ContractName: <strong>${contractName}</strong>`;

                        const contentWidth = errorMessageNew.length * 8;
                        toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessageNew }} />, {
                            position: 'top-center',
                            autoClose: 3000,
                            style: { width: `${contentWidth}px` },
                        });

                        const newErrors = { ...validationErrorsCfsTariff };
                        newErrors.contractName = `Duplicate: ${contractName}`;
                        setValidationErrorsCfsTariff(newErrors);

                    } else if (field === 'combination') {

                        const errorMessageNew = `Selected combination already exist`;
                        toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessageNew }} />, {
                            position: 'top-center',
                            autoClose: 3000,
                        });

                    }
                } else {
                    toast.error(errorMessage.message || errorMessage, {
                        position: 'top-center',
                        autoClose: 3000,
                    });
                }
            }

        } finally {
            setLoading(false);
        }
    };






    const handleSaveDetailTariff = async (cfsTariffService) => {

        const { checkedDetails, allRowsAreValid } = validateCfsTariffDetail(cfsTariffService);
        if (!allRowsAreValid) {
            toast.warning('Please enter required fields!', {
                position: 'top-center',
                autoClose: 1000,
            });
            return;
        }

        if (!cfsTariff?.cfsTariffNo || checkedDetails?.length <= 0) {
            return;
        }

        setLoading(true);
        try {
            const response = await FinanceService.addDetailCfsTariffService(companyid, branchId, cfsTariff, checkedDetails, userId, jwtToken);

            const { list, cfsTariffServer } = response.data;

            toast.success('Detail Added sucessfully', {
                position: 'top-center',
                autoClose: 1500,
            });


            setCfsTarrif(cfsTariffServer);
            setCfsTariffService(list);
            updateSelectTags(cfsTariffServer);
        } catch (error) {
            const errorMessage = error.response?.data || 'Oops something went wrong!';
            toast.error(errorMessage, {
                position: 'top-center',
                autoClose: 700,
            });
        } finally {
            setLoading(false);
        }
    };























    const handleAmmend = async () => {

        if (!cfsTariff?.cfsTariffNo || !isReadOnlyDisabled) {
            return;
        }
        setLoading(true);

        try {
            const response = await FinanceService.ammendTariff(companyid, branchId, userId, cfsTariff, jwtToken);

            setCfsTarrif(response.data);
            setCfsTariffService([]);
            searchSavedTariff(mainSearch.tarrifType);
            setService({});
            toast.success("Tariff ammended successfully", {
                position: 'top-center',
                autoClose: 900,
            });
        }
        catch (error) {

            console.log('error ', error);
            const errorMessage = error.response?.data || 'Oops something went wrong!';
            toast.error(errorMessage, {
                position: 'top-center',
                autoClose: 700,
            });
        }
        finally {
            setLoading(false);
        }
    }




    const downLoadReport = async (type) => {
        setLoading(true);

        const dataTosend = {
            companyId: companyid,
            branchId: branchId,
            cfsTariffNo: cfsTariff.cfsTariffNo,
            cfsAmendNo: cfsTariff.cfsAmndNo,
            contractName: cfsTariff.contractName,
            userId: userId,
            type: type
        }
        try {
            const response = await FinanceService.downLoadTariffReport(dataTosend, jwtToken);

            if (response.status === 200) {
                const blob = new Blob([response.data], { type: response.headers['content-type'] });

                // Create a temporary URL for the blob
                const url = window.URL.createObjectURL(blob);

                // Create a link element to trigger the download
                const a = document.createElement("a");
                a.href = url;
                type === 'tariff' ? a.download = 'Tarff_Report.xlsx' : a.download = 'AuditTrail_Report.xlsx'

                // a.download = 'Monthly_Receipt.xlsx';
                document.body.appendChild(a);
                a.click();

                // Clean up
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }
        } catch (error) {
            toast.error("error downLoading file!", {
                position: 'top-center',
                autoClose: 800,
            });
        }
        finally {
            setLoading(false);
        }
    };



    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileName = file.name.toLowerCase();
            const validExtensions = ['.xls', '.xlsx', '.xlsm', '.xltx', '.xltm'];
            if (validExtensions.some(ext => fileName.endsWith(ext))) {
                setCfsTarrif((prevState) => ({
                    ...prevState,
                    selectedFile: file,
                }));
            } else {
                console.error('Invalid file type. Please upload a valid Excel file.');
                alert('Invalid file type. Please upload a valid Excel file.');
                event.target.value = '';
            }
        }
    };


    const handleUploadTariff = async () => {
        setLoading(true);
        try {
            const response = await FinanceService.uploadTariff(companyid, branchId, userId, cfsTariff, jwtToken);
            setCfsTarrif(response.data);
            toast.success('File uploaded sucessfully', {
                position: 'top-center',
                autoClose: 1500,
            });

        }
        catch (error) {
            console.log('error ', error);
            const errorMessage = error.response?.data || 'Oops something went wrong!';
            toast.error(errorMessage, {
                position: 'top-center',
                autoClose: 700,
            });
        }
        finally {
            setLoading(false);
        }
    }

    const handleDownLoadTemplate = async () => {
        const dataTosend = {
            companyId: companyid,
            branchId: branchId,
            userId: userId
        }
        setLoading(true);
        try {
            const response = await FinanceService.downLoadTariffTemplate(dataTosend, jwtToken);

            if (response.status === 200) {
                const blob = new Blob([response.data], { type: response.headers['content-type'] });

                // Create a temporary URL for the blob
                const url = window.URL.createObjectURL(blob);

                // Create a link element to trigger the download
                const a = document.createElement("a");
                a.href = url;

                a.download = 'Tarff_Template.xlsx';

                // a.download = 'Monthly_Receipt.xlsx';
                document.body.appendChild(a);
                a.click();

                // Clean up
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }
        } catch (error) {
            toast.error("error downLoading file!", {
                position: 'top-center',
                autoClose: 800,
            });
        }
        finally {
            setLoading(false);
        }


    }


    const [filter, setFilter] = useState("");

    // Function to handle input change
    const handleFilterChange = (e) => {
        setFilter(e.target.value.toLowerCase());
    };

    // Filtered and sorted services
    const filteredServices = services
        .filter((service) =>
            service.serviceShortDesc.toLowerCase().includes(filter)
        )
        .sort((a, b) => {
            const aMatch = a.serviceShortDesc.toLowerCase().startsWith(filter) ? 0 : 1;
            const bMatch = b.serviceShortDesc.toLowerCase().startsWith(filter) ? 0 : 1;
            return aMatch - bMatch;
        });




    const [selectAll, setSelectAll] = useState(false);

    // Function to handle select all checkbox change
    const handleSelectAllChange = () => {
        const newDefaultChk = selectAll ? 'N' : 'Y';
        const updatedServices = cfsTariffService.map(service => ({
            ...service,
            defaultChk: newDefaultChk,
        }));

        setCfsTariffService(updatedServices);
        setSelectAll(!selectAll);
    };
    useEffect(() => {
        const allSelected = cfsTariffService.length > 0 && cfsTariffService.every(service => service.defaultChk === 'Y');
        setSelectAll(allSelected);
    }, [cfsTariffService]);










    const isReadOnlyDisabled = cfsTariff?.status === 'A' && cfsTariff?.ammendStatus === 'A';
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

            <div className='Container'>


                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '2%', paddingRight: '2%' }}>
                    <h5 className="pageHead" >
                        <FontAwesomeIcon icon={faMoneyBill}
                            style={{
                                marginRight: '8px',
                                color: 'black',
                            }}
                        />Vendor Tariff</h5>


                </div>

                <Card style={{ backgroundColor: "#F8F8F8", marginLeft: 0, marginRight: 0, paddingLeft: 0, paddingRight: 0 }}>
                    <CardBody style={{ margin: 0, padding: 0 }}>



                        <div className='mainHeader'>

                            <div className='searchtariff'>

                                <div class="search-tariff-header">
                                    <h6><strong>Validity Selection</strong></h6>
                                </div>



                                <Row style={{ marginLeft: '5px' }}>
                                    <Col md={12}>
                                        <Row>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <label className="forlabel bold-label">
                                                        Live
                                                    </label><br />
                                                    <input
                                                        type="radio"
                                                        className="form-check-input radios"
                                                        style={{ width: 20, height: 20 }}
                                                        name='tarrifType'
                                                        value='L'
                                                        checked={mainSearch.tarrifType === 'L'}
                                                        onChange={handleMainSearchChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <label className="forlabel bold-label">
                                                        Expired
                                                    </label><br />
                                                    <input
                                                        type="radio"
                                                        className="form-check-input radios"
                                                        style={{ width: 20, height: 20 }}
                                                        name='tarrifType'
                                                        value='E'
                                                        checked={mainSearch.tarrifType === 'E'}
                                                        onChange={handleMainSearchChange}
                                                    />
                                                </FormGroup>
                                            </Col>

                                            <Col md={4}>
                                                <FormGroup>
                                                    <label className="forlabel bold-label">
                                                        ALL
                                                    </label><br />
                                                    <input
                                                        type="radio"
                                                        className="form-check-input radios"
                                                        style={{ width: 20, height: 20 }}
                                                        name='tarrifType'
                                                        value='A'
                                                        checked={mainSearch.tarrifType === 'A'}
                                                        onChange={handleMainSearchChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>

                                <Row style={{ marginLeft: '5px', marginRight: '5px' }}>
                                    <Col md={12}>
                                        <FormGroup>
                                            <label
                                                className="forlabel bold-label"
                                                htmlFor="sbRequestId"
                                            >
                                                Select Tariff
                                            </label>

                                            <Select
                                                options={searchTariffs}
                                                value={selectedSearchTariff}
                                                onChange={handleSearchHeaderChange}
                                                // placeholder="Select Tariff"
                                                isClearable

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
                                </Row>


                            </div>




                            <div className='validaity'>

                                <div class="search-tariff-header">
                                    <h6><strong>Tariff Rates Validity</strong></h6>
                                </div>



                                <Row style={{ marginLeft: '5px', marginRight: '5px' }}>
                                    <Col md={3}>
                                        <FormGroup>
                                            <label
                                                className="forlabel bold-label"
                                                htmlFor="sbRequestId"
                                            >
                                                Validity Period From <span className="error-message">*</span>
                                            </label>
                                            <div style={{ position: "relative" }}>
                                                <DatePicker
                                                    selected={cfsTariff.cfsFromDate}
                                                    onChange={(date) => handleDateChangeCfsTariff('cfsFromDate', date)}
                                                    id={isReadOnlyDisabled ? 'service' : ''}
                                                    disabled={isReadOnlyDisabled}
                                                    name="sbTransDate"
                                                    placeholderText="Enter From Date"
                                                    dateFormat="dd/MM/yyyy"
                                                    className={`form-control ${validationErrorsCfsTariff.cfsFromDate ? 'error-border' : ''}`}
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

                                                {validationErrorsCfsTariff.cfsFromDate && (
                                                    <div className="error-messageNew">
                                                        {validationErrorsCfsTariff.cfsFromDate}
                                                    </div>
                                                )}

                                            </div>
                                        </FormGroup>
                                    </Col>


                                    <Col md={3}>
                                        <FormGroup>
                                            <label
                                                className="forlabel bold-label"
                                                htmlFor="sbRequestId"
                                            >
                                                Valid Up To <span className="error-message">*</span>
                                            </label>
                                            <div style={{ position: "relative" }}>
                                                <DatePicker
                                                    selected={cfsTariff.cfsValidateDate}
                                                    onChange={(date) => handleDateChangeCfsTariff('cfsValidateDate', date)}
                                                    id={isReadOnlyDisabled ? 'service' : ''}
                                                    disabled={isReadOnlyDisabled}
                                                    name="cfsValidateDate"
                                                    placeholderText="Enter To Date"
                                                    dateFormat="dd/MM/yyyy"
                                                    className={`form-control ${validationErrorsCfsTariff.cfsValidateDate ? 'error-border' : ''}`}
                                                    wrapperClassName="custom-react-datepicker-wrapper"
                                                    minDate={cfsTariff.cfsFromDate ? new Date(cfsTariff.cfsFromDate) : new Date()}
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
                                                {validationErrorsCfsTariff.cfsValidateDate && (
                                                    <div className="error-messageNew">
                                                        {validationErrorsCfsTariff.cfsValidateDate}
                                                    </div>
                                                )}
                                            </div>
                                        </FormGroup>
                                    </Col>




                                    <Col md={3}>
                                        <FormGroup>
                                            <label
                                                className="forlabel bold-label"
                                                htmlFor="sbRequestId"
                                            >
                                                Contract Name <span className="error-message">*</span>
                                            </label>
                                            <div style={{ position: "relative" }}>
                                                <input
                                                    className={`form-control ${validationErrorsCfsTariff.contractName ? 'error-border' : ''}`}
                                                    type="text"
                                                    maxLength={250}
                                                    name="contractName"
                                                    value={cfsTariff.contractName}
                                                    onChange={handleChangeCfsTarrif}
                                                    id={isReadOnlyDisabled ? 'service' : ''}
                                                    readOnly={isReadOnlyDisabled}
                                                />
                                                {validationErrorsCfsTariff.contractName && (
                                                    <div className="error-messageNew">
                                                        {validationErrorsCfsTariff.contractName}
                                                    </div>
                                                )}

                                            </div>
                                        </FormGroup>
                                    </Col>




                                    <Col md={3}>
                                        <FormGroup>
                                            <label
                                                className="forlabel bold-label"
                                                htmlFor="sbRequestId"
                                            >
                                                Select Customer
                                            </label>

                                            <Select
                                                options={customerData}
                                                value={selectedCustomer}
                                                onInputChange={(inputValue, { action }) => {
                                                    if (action === 'input-change') {
                                                        searchExporter(inputValue, 'partyId');
                                                    }
                                                }}
                                                onChange={(selectedOption) => handleSelectChange(selectedOption, 'partyId')}
                                                // placeholder="Select Customer"
                                                isClearable
                                                id={isReadOnlyDisabled ? 'service' : ''}
                                                isDisabled={isReadOnlyDisabled}
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



                                </Row>

                                <Row style={{ marginLeft: '5px', marginRight: '5px' }}>
                                    <Col md={3}>
                                        <FormGroup>
                                            <label
                                                className="forlabel bold-label"
                                                htmlFor="sbRequestId"
                                            >
                                                Select Importer/Exporter
                                            </label>

                                            <Select
                                                options={impExpData}
                                                value={selectedImpExp}
                                                onInputChange={(inputValue, { action }) => {
                                                    if (action === 'input-change') {
                                                        searchExporter(inputValue, 'impExp');
                                                    }
                                                }}
                                                onChange={(selectedOption) => handleSelectChange(selectedOption, 'impExp')}
                                                // placeholder="Select Importer/Exporter"
                                                isClearable
                                                id={isReadOnlyDisabled ? 'service' : ''}
                                                isDisabled={isReadOnlyDisabled}
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




                                    <Col md={3}>
                                        <FormGroup>
                                            <label
                                                className="forlabel bold-label"
                                                htmlFor="sbRequestId"
                                            >
                                                Select Shipping Line
                                            </label>

                                            <Select
                                                options={lineData}
                                                value={selectedLine}
                                                onInputChange={(inputValue, { action }) => {
                                                    if (action === 'input-change') {
                                                        searchExporter(inputValue, 'shippingLine');
                                                    }
                                                }}
                                                onChange={(selectedOption) => handleSelectChange(selectedOption, 'shippingLine')}
                                                // placeholder="Select ShippingLine"
                                                isClearable
                                                id={isReadOnlyDisabled ? 'service' : ''}
                                                isDisabled={isReadOnlyDisabled}
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

                                    <Col md={3}>
                                        <FormGroup>
                                            <label
                                                className="forlabel bold-label"
                                                htmlFor="sbRequestId"
                                            >
                                                Select Shipping Agent
                                            </label>
                                            <Select
                                                options={agentData}
                                                value={selectedAgent}
                                                onInputChange={(inputValue, { action }) => {
                                                    if (action === 'input-change') {
                                                        searchExporter(inputValue, 'shippingAgent');
                                                    }
                                                }}
                                                onChange={(selectedOption) => handleSelectChange(selectedOption, 'shippingAgent')}
                                                // placeholder="Select ShippingAgent"
                                                isClearable
                                                id={isReadOnlyDisabled ? 'service' : ''}
                                                isDisabled={isReadOnlyDisabled}
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




                                    <Col md={3}>
                                        <FormGroup>
                                            <label
                                                className="forlabel bold-label"
                                                htmlFor="sbRequestId"
                                            >
                                                Select Cha
                                            </label>

                                            <Select
                                                options={chaData}
                                                value={selectedCha}
                                                onInputChange={(inputValue, { action }) => {
                                                    if (action === 'input-change') {
                                                        searchExporter(inputValue, 'cha');
                                                    }
                                                }}
                                                onChange={(selectedOption) => handleSelectChange(selectedOption, 'cha')}
                                                // placeholder="Select Cha"
                                                isClearable
                                                id={isReadOnlyDisabled ? 'service' : ''}
                                                isDisabled={isReadOnlyDisabled}
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





                                </Row>


                                <Row style={{ marginLeft: '5px', marginRight: '5px' }}>



                                    <Col md={3}>
                                        <FormGroup>
                                            <label
                                                className="forlabel bold-label"
                                                htmlFor="sbRequestId"
                                            >
                                                Select Forwarder
                                            </label>

                                            <Select
                                                options={forwarderData}
                                                value={selectedForwarder}
                                                onInputChange={(inputValue, { action }) => {
                                                    if (action === 'input-change') {
                                                        searchExporter(inputValue, 'forwarderId');
                                                    }
                                                }}
                                                onChange={(selectedOption) => handleSelectChange(selectedOption, 'forwarderId')}
                                                // placeholder="Select Forwarder"
                                                isClearable
                                                id={isReadOnlyDisabled ? 'service' : ''}
                                                isDisabled={isReadOnlyDisabled}
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



                                    <Col md={3}>
                                        <FormGroup>
                                            <label
                                                className="forlabel bold-label"
                                                htmlFor="sbRequestId"
                                            >
                                                Apply Rates Of
                                            </label>

                                            <Select
                                                options={applyRatesOfData}
                                                value={selectedApplyRatesOf}

                                                onChange={(selectedOption) => handleSelectChange(selectedOption, 'apply')}
                                                // placeholder="Select Existing Tariff"
                                                isClearable
                                                id={cfsTariff?.cfsTariffNo ? 'service' : ''}
                                                isDisabled={cfsTariff?.cfsTariffNo}
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

                                    <Col md={3}>

                                        <Row>


                                            <Col md={6}>
                                                <FormGroup>
                                                    <label className="forlabel bold-label" htmlFor="outOfCharge">
                                                        NVOCC
                                                    </label>
                                                    <Input
                                                        className={`form-control`}
                                                        type="checkbox"
                                                        name='nvoccTariff'
                                                        checked={cfsTariff.nvoccTariff === 'Y'}
                                                        onChange={handleChangeCfsTarrif}
                                                        style={{ width: '20px', height: '24px', cursor: 'pointer', margin: '0' }}
                                                        id={isReadOnlyDisabled ? 'service' : ''}
                                                        readOnly={isReadOnlyDisabled}
                                                    />
                                                </FormGroup>
                                            </Col>


                                            <Col md={6}>
                                                <FormGroup>
                                                    <label className="forlabel bold-label" htmlFor="outOfCharge">
                                                        OFFDOC
                                                    </label>
                                                    <Input
                                                        className={`form-control`}
                                                        type="checkbox"
                                                        name='offdocTariff'
                                                        checked={cfsTariff.offdocTariff === 'Y'}
                                                        onChange={handleChangeCfsTarrif}
                                                        style={{ width: '20px', height: '24px', cursor: 'pointer', margin: '0' }}
                                                        id={isReadOnlyDisabled ? 'service' : ''}
                                                        readOnly={isReadOnlyDisabled}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </Col>

                                    {cfsTariff?.cfsTariffNo && !isReadOnlyDisabled && (
                                        <Col md={3}>
                                            <FormGroup>
                                                <label
                                                    className="forlabel bold-label"
                                                    htmlFor="sbRequestId"
                                                >
                                                    Upload Tariff
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="file"
                                                    accept=".xls,.xlsx,.xlsm,.xltx,.xltm"
                                                    name="selectedFile"
                                                    onChange={handleFileChange}
                                                    id={isReadOnlyDisabled ? 'service' : ''}
                                                    disabled={isReadOnlyDisabled}
                                                />
                                            </FormGroup>
                                        </Col>
                                    )}


                                </Row>



                                <Row className="justify-content-center">
  <Col xs={12} className="d-flex flex-wrap justify-content-center gap-2">


                                        {!isReadOnlyDisabled && (
                                            <button
                                                className="btn btn-outline-primary btn-margin newButton"
                                                style={{ marginRight: 10 }}
                                                id="submitbtn2"
                                                onClick={(e) => handleSaveMainTariff('S')}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faSave}
                                                    style={{ marginRight: "5px" }}
                                                />
                                                Save
                                            </button>
                                        )}


                                        {cfsTariff?.cfsTariffNo && !isReadOnlyDisabled && (
                                            <button
                                                className="btn btn-outline-primary btn-margin newButton"
                                                style={{ marginRight: 10 }}
                                                id="submitbtn2"
                                                onClick={(e) => handleSaveMainTariff('A')}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faSave}
                                                    style={{ marginRight: "5px" }}
                                                />
                                                Submit
                                            </button>
                                        )}


                                        {cfsTariff?.cfsTariffNo && !isReadOnlyDisabled && (
                                            <button
                                                className="btn btn-outline-primary btn-margin newButton"
                                                style={{ marginRight: 10 }}
                                                id="submitbtn2"
                                                onClick={() => handleSaveDetailTariff(cfsTariffService)}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faSave}
                                                    style={{ marginRight: "5px" }}
                                                />
                                                Add Range
                                            </button>
                                        )}

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

                                        {cfsTariff?.cfsTariffNo && isReadOnlyDisabled && (
                                            <button
                                                className="btn btn-outline-primary btn-margin newButton"
                                                style={{ marginRight: 10 }}
                                                id="submitbtn2"
                                                onClick={handleAmmend}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEdit}
                                                    style={{ marginRight: "5px" }}
                                                />
                                                Ammend Tarrif
                                            </button>
                                        )}





                                        {cfsTariff?.cfsTariffNo && (

                                            <div className="dropdown">
                                                <button
                                                    className="btn btn-outline-primary dropdown-toggle btn-margin newButton"
                                                    style={{ marginRight: 10, fontSize: 13 }}
                                                    type="button"
                                                    id="reportsDropdown"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    Reports
                                                </button>
                                                <ul className="dropdown-menu" aria-labelledby="reportsDropdown">
                                                    <li>
                                                        <button
                                                            className="dropdown-item"
                                                            onClick={(e) => downLoadReport('tariff')}
                                                        >
                                                            <FontAwesomeIcon icon={faFileInvoiceDollar} style={{ marginRight: "5px" }} />
                                                            Tariff Report
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="dropdown-item"
                                                            onClick={(e) => downLoadReport('audittrail')}
                                                        >
                                                            <FontAwesomeIcon icon={faHistory} style={{ marginRight: "5px" }} />
                                                            AuditTrail Report
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>

                                        )}



                                        {!isReadOnlyDisabled && (
                                            <button
                                                className="btn btn-outline-primary btn-margin newButton"
                                                style={{ marginRight: 10 }}
                                                id="submitbtn2"
                                                onClick={handleDownLoadTemplate}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faDownload}
                                                    style={{ marginRight: "5px" }}
                                                />
                                                Template Tarrif
                                            </button>
                                        )}

                                        {cfsTariff?.cfsTariffNo && !isReadOnlyDisabled && cfsTariff?.selectedFile && (
                                            <button
                                                className="btn btn-outline-primary btn-margin newButton"
                                                style={{ marginRight: 10 }}
                                                id="submitbtn2"
                                                onClick={handleUploadTariff}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faUpload}
                                                    style={{ marginRight: "5px" }}
                                                />
                                                Upload Tarrif
                                            </button>
                                        )}








                                    </Col>
                                </Row>





                            </div>


                        </div>





                        <div className="custom-hr"></div>

                        <div className="revenueAndService">
                            {/* Horizontal rule at the top */}

                            <div className="containerBody">



                                {/* <div className="serviceGroup">
                                    <div class="search-tariff-headerService">
                                        <h6 className='mt-2'><strong>Service Groups</strong></h6>
                                    </div>

                                    <input
                                        type="text"
                                        className="form-control my-2"
                                        placeholder="Search Services"
                                        value={filter}
                                        onChange={handleFilterChange}
                                    />                                

                                    {filteredServices.map((serviceLoop, index) => (
                                        <div
                                            key={index}
                                            className={`serviceItem ${service.serviceId === serviceLoop.serviceId ? "selectedService" : ""}`}
                                            onClick={() => handleServiceClick(serviceLoop)}
                                        >
                                            {serviceLoop.serviceShortDesc}
                                        </div>
                                    ))}
                                </div> */}




                                <div className="serviceGroup">
                                    <div className="search-tariff-headerService">
                                        <h6 className="mt-2">
                                            <strong>Service Groups</strong>
                                        </h6>
                                    </div>

                                    <input
                                        type="text"
                                        className="form-control my-1"
                                        placeholder="Search Services"
                                        value={filter}
                                        onChange={handleFilterChange}
                                    />

                                    {/* Scrollable services list */}
                                    <div className="serviceList">
                                        {filteredServices.map((serviceLoop, index) => (
                                            <div
                                                key={index}
                                                className={`serviceItem ${service.serviceId === serviceLoop.serviceId ? "selectedService" : ""}`}
                                                onClick={() => handleServiceClick(serviceLoop)}
                                            >
                                                <span className="serviceText">
                                                    {serviceLoop.serviceShortDesc}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>






                                {/* {services.map((serviceLoop, index) => (
                                        <div
                                            key={index}
                                            className={`serviceItem ${service.serviceId === serviceLoop.serviceId ? "selectedService" : ""}`}
                                            onClick={() => handleServiceClick(serviceLoop)}
                                        >
                                            {serviceLoop.serviceShortDesc}
                                        </div>
                                    ))} */}


                                <div className="revenue">
                                    <div class="search-tariff-headerService">
                                        <h6 className='mt-2'><strong>Revenue Tariff Rates</strong></h6>
                                    </div>

                                    <Row className="align-items-center mt-2" style={{ marginLeft: '5px', marginRight: '5px' }}>

                                        <Col md={6} className="d-flex align-items-center justify-content-start">
                                            <h6 className="mb-0">
                                                <strong>Tax Group : </strong> {cfsTariffService?.[0]?.sacCode || ''}
                                            </h6>
                                        </Col>


                                        <Col md={6} className="d-flex align-items-center justify-content-start">
                                            <h6 className="mb-0">
                                                <strong>Service : </strong> {service.serviceShortDesc}
                                            </h6>
                                        </Col>
                                    </Row>


                                    {/* HEADERS */}
                                    {/* PLAIN */}

                                    <div className="tableWrapper">
                                        {service.criteriaType === "CNTR" && (


                                            <div className="table-responsive mt-3" style={{ maxHeight: "1000px", overflowY: "auto" }}>
                                                <Table className="table table-bordered tariffTable" style={{ border: '2px solid black' }}>
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" className="text-center tableheadNew" style={{ color: "black" }}>
                                                                Cont Size
                                                            </th>
                                                            <th scope="col" className="text-center tableheadNew" style={{ color: "black" }}>
                                                                Cargo Type
                                                            </th>
                                                            <th scope="col" className="text-center tableheadNew" style={{ color: "black" }}>
                                                                Commodity
                                                            </th>
                                                            <th scope="col" className="text-center tableheadNew" style={{ color: "black" }}>
                                                                Currency
                                                            </th>
                                                            <th scope="col" className="text-center tableheadNew" style={{ color: "black" }}>
                                                                Rate
                                                            </th>
                                                            <th scope="col" className="text-center tableheadNew" style={{ color: "black" }}>
                                                                Min Rate
                                                            </th>
                                                            <th scope="col" className="text-center tableheadNew" style={{ color: "black" }}>
                                                                Default Check

                                                                <Input
                                                                    className="form-check-input radios"
                                                                    type="checkbox"
                                                                    style={{ width: '22px', height: '22px', cursor: 'pointer', margin: '0', marginLeft: '6px' }}
                                                                    checked={selectAll}
                                                                    onChange={() => handleSelectAllChange()}
                                                                />

                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {cfsTariffService.map((cargoEntry, index) => (
                                                            <tr key={index} className="text-center">
                                                                <td className="text-center">
                                                                    {/* <FormGroup> */}
                                                                    <Input
                                                                        type="select"
                                                                        value={cargoEntry.containerSize}
                                                                        className={`inputwidthTuka form-control ${validationErrorsCfsTariffService[index]?.containerSize ? 'error-border' : ''}`}
                                                                        onChange={(e) => handleFieldChange(e, index, 'containerSize')}
                                                                    >
                                                                        <option value="">---Select---</option>
                                                                        {containerSize.map((type, idx) => (
                                                                            <option key={idx} value={type.value}>
                                                                                {type.label}
                                                                            </option>
                                                                        ))}
                                                                    </Input>
                                                                    {/* </FormGroup> */}
                                                                </td>

                                                                <td className="text-center align-center">

                                                                    <Input
                                                                        type="select"
                                                                        value={cargoEntry.cargoType}
                                                                        className={`inputwidthTuka form-control ${validationErrorsCfsTariffService[index]?.cargoType ? 'error-border' : ''}`}
                                                                        onChange={(e) => handleFieldChange(e, index, 'cargoType')}
                                                                    >
                                                                        <option value="">---Select---</option>
                                                                        {cargoType.map((type, idx) => (
                                                                            <option key={idx} value={type.value}>
                                                                                {type.label}
                                                                            </option>
                                                                        ))}
                                                                    </Input>

                                                                </td>

                                                                <td>

                                                                    <Input
                                                                        type="select"
                                                                        value={cargoEntry.commodityCode}
                                                                        className={`inputwidthTukaMax form-control ${validationErrorsCfsTariffService[index]?.commodityCode ? 'error-border' : ''}`}
                                                                        onChange={(e) => handleFieldChange(e, index, 'commodityCode')}
                                                                    >
                                                                        <option value="">---Select---</option>
                                                                        {commodity.map((type, idx) => (
                                                                            <option key={idx} value={type.value}>
                                                                                {type.label}
                                                                            </option>
                                                                        ))}
                                                                    </Input>

                                                                </td>



                                                                <td>

                                                                    <Input
                                                                        type="select"
                                                                        value={cargoEntry.currencyId}
                                                                        className={`inputwidthTukaMin form-control ${validationErrorsCfsTariffService[index]?.currencyId ? 'error-border' : ''}`}
                                                                        onChange={(e) => handleFieldChange(e, index, 'currencyId')}
                                                                    >
                                                                        <option value="INR">INR</option>
                                                                        <option value="USD">USD</option>
                                                                    </Input>

                                                                </td>

                                                                <td>

                                                                    <Input
                                                                        type="text"
                                                                        name='rate'
                                                                        value={cargoEntry.rate}
                                                                        className={`inputwidthTukaTariff form-control ${validationErrorsCfsTariffService[index]?.rate ? 'error-border' : ''}`}
                                                                        maxLength={17}
                                                                        onChange={(e) => handleFieldChange(e, index, 'rate', 'decimal', 13, 3)}
                                                                    />

                                                                </td>
                                                                <td>

                                                                    <Input
                                                                        type="text"
                                                                        name='minimumRate'
                                                                        value={cargoEntry.minimumRate}
                                                                        className={`inputwidthTukaTariff form-control ${validationErrorsCfsTariffService[index]?.minimumRate ? 'error-border' : ''}`}
                                                                        maxLength={17}
                                                                        onChange={(e) => handleFieldChange(e, index, 'minimumRate', 'decimal', 13, 3)}
                                                                    />

                                                                </td>
                                                                <td className="text-center">

                                                                    <Input
                                                                        className={`form-control`}
                                                                        type="checkbox"
                                                                        name='defaultChk'
                                                                        checked={cargoEntry.defaultChk === 'Y'}
                                                                        onChange={(e) => handleFieldChange(e, index, 'defaultChk')}
                                                                        style={{ width: '20px', height: '24px', cursor: 'pointer', margin: '0' }}
                                                                    />

                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>


                                            </div>





                                        )}




                                        {/* RANGE/SLAB */}


                                        {(service.criteriaType === "DW" || service.criteriaType === "WT") && (



                                            <div className="table-responsive mt-3" style={{ maxHeight: "1000px", overflowY: "auto" }}>
                                                <Table className="table table-bordered" style={{ border: '2px solid black' }}>
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" className="text-center tableheadNew" style={{ color: "black" }}                                                   >
                                                                From {service.criteriaType === "WT" ? "Weight" : "Range"}
                                                            </th>
                                                            <th scope="col" className="text-center tableheadNew" style={{ color: "black", width: "100px" }}                                                        >
                                                                To {service.criteriaType === "WT" ? "Weight" : "Range"}
                                                            </th>
                                                            <th scope="col" className="text-center tableheadNew" style={{ color: "black" }}>
                                                                Cont Size
                                                            </th>
                                                            <th scope="col" className="text-center tableheadNew" style={{ color: "black", width: "100px" }}>
                                                                Cargo Type
                                                            </th>
                                                            <th scope="col" className="text-center tableheadNew" style={{ color: "black" }}>
                                                                Commodity
                                                            </th>
                                                            <th scope="col" className="text-center tableheadNew" style={{ color: "black" }}>
                                                                Currency
                                                            </th>
                                                            <th scope="col" className="text-center tableheadNew" style={{ color: "black" }}>
                                                                Rate
                                                            </th>
                                                            <th scope="col" className="text-center tableheadNew" style={{ color: "black" }}>
                                                                Min Rate
                                                            </th>
                                                            <th scope="col" className="text-center tableheadNew" style={{ color: "black" }}>
                                                                Default Check
                                                                <Input
                                                                    className="form-check-input radios"
                                                                    type="checkbox"
                                                                    style={{ width: '22px', height: '22px', cursor: 'pointer', margin: '0', marginLeft: '6px' }}
                                                                    checked={selectAll}
                                                                    onChange={() => handleSelectAllChange()}
                                                                />
                                                            </th>
                                                        </tr>
                                                    </thead>




                                                    <tbody>
                                                        {cfsTariffService.map((cargoEntry, index) => (
                                                            <tr key={index} className="text-center">





                                                                <td>

                                                                    <Input
                                                                        type="text"
                                                                        name='fromRange'
                                                                        value={cargoEntry.fromRange}
                                                                        className={`inputwidthTukaTariff form-control ${validationErrorsCfsTariffService[index]?.fromRange ? 'error-border' : ''}`}
                                                                        maxLength={17}
                                                                        onChange={(e) => handleFieldChange(e, index, 'fromRange', 'decimal', 13, 3)}
                                                                    />

                                                                </td>
                                                                <td>

                                                                    <Input
                                                                        type="text"
                                                                        name='toRange'
                                                                        value={cargoEntry.toRange}
                                                                        className={`inputwidthTukaTariff form-control ${validationErrorsCfsTariffService[index]?.toRange ? 'error-border' : ''}`}
                                                                        maxLength={17}
                                                                        onChange={(e) => handleFieldChange(e, index, 'toRange', 'decimal', 13, 3)}
                                                                    />

                                                                </td>





                                                                <td className="text-center">

                                                                    <Input
                                                                        type="select"
                                                                        value={cargoEntry.containerSize}
                                                                        className={`inputwidthTuka form-control ${validationErrorsCfsTariffService[index]?.containerSize ? 'error-border' : ''}`}
                                                                        onChange={(e) => handleFieldChange(e, index, 'containerSize')}
                                                                    >
                                                                        <option value="">---Select---</option>
                                                                        {containerSize.map((type, idx) => (
                                                                            <option key={idx} value={type.value}>
                                                                                {type.label}
                                                                            </option>
                                                                        ))}
                                                                    </Input>

                                                                </td>

                                                                <td className="text-center align-center">

                                                                    <Input
                                                                        type="select"
                                                                        value={cargoEntry.cargoType}
                                                                        className={`inputwidthTuka form-control ${validationErrorsCfsTariffService[index]?.cargoType ? 'error-border' : ''}`}
                                                                        onChange={(e) => handleFieldChange(e, index, 'cargoType')}
                                                                    >
                                                                        <option value="">---Select---</option>
                                                                        {cargoType.map((type, idx) => (
                                                                            <option key={idx} value={type.value}>
                                                                                {type.label}
                                                                            </option>
                                                                        ))}
                                                                    </Input>

                                                                </td>

                                                                <td>

                                                                    <Input
                                                                        type="select"
                                                                        value={cargoEntry.commodityCode}
                                                                        className={`inputwidthTukaMax form-control ${validationErrorsCfsTariffService[index]?.commodityCode ? 'error-border' : ''}`}
                                                                        onChange={(e) => handleFieldChange(e, index, 'commodityCode')}
                                                                    >
                                                                        <option value="">---Select---</option>
                                                                        {commodity.map((type, idx) => (
                                                                            <option key={idx} value={type.value}>
                                                                                {type.label}
                                                                            </option>
                                                                        ))}
                                                                    </Input>

                                                                </td>



                                                                <td>

                                                                    <Input
                                                                        type="select"
                                                                        value={cargoEntry.currencyId}
                                                                        className={`inputwidthTukaMin form-control ${validationErrorsCfsTariffService[index]?.currencyId ? 'error-border' : ''}`}
                                                                        onChange={(e) => handleFieldChange(e, index, 'currencyId')}
                                                                    >
                                                                        <option value="INR">INR</option>
                                                                        <option value="USD">USD</option>
                                                                    </Input>

                                                                </td>

                                                                <td>

                                                                    <Input
                                                                        type="text"
                                                                        name='rate'
                                                                        value={cargoEntry.rate}
                                                                        className={`inputwidthTukaTariff form-control ${validationErrorsCfsTariffService[index]?.rate ? 'error-border' : ''}`}
                                                                        maxLength={17}
                                                                        onChange={(e) => handleFieldChange(e, index, 'rate', 'decimal', 13, 3)}
                                                                    />

                                                                </td>
                                                                <td>

                                                                    <Input
                                                                        type="text"
                                                                        name='minimumRate'
                                                                        value={cargoEntry.minimumRate}
                                                                        className={`inputwidthTukaTariff form-control ${validationErrorsCfsTariffService[index]?.minimumRate ? 'error-border' : ''}`}
                                                                        maxLength={17}
                                                                        onChange={(e) => handleFieldChange(e, index, 'minimumRate', 'decimal', 13, 3)}
                                                                    />

                                                                </td>
                                                                <td className="text-center">

                                                                    <Input
                                                                        className={`form-control`}
                                                                        type="checkbox"
                                                                        name='defaultChk'
                                                                        checked={cargoEntry.defaultChk === 'Y'}
                                                                        onChange={(e) => handleFieldChange(e, index, 'defaultChk')}
                                                                        style={{ width: '20px', height: '24px', cursor: 'pointer', margin: '0' }}
                                                                    />

                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>

                                                </Table>
                                            </div>




                                        )}


                                    </div>



                                </div>
                            </div>
                        </div>




                    </CardBody>

                </Card>
            </div>

        </>
    )
}