
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
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faCalendarAlt, faAdd, faCancel, faXmark, faArrowDown, faPlus, faArrowUp, faEdit, faPrint } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import useAxios from '../Components/useAxios';
import { dark } from '@mui/material/styles/createPalette';
import { toast } from 'react-toastify';

export default function SealCutting({ igm, item, cont, sealStatus, process, onRequest }) {
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
    const [activeTab, setActiveTab] = useState('home-1');
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };
    const [sealCuttingData, setSealCuttingData] = useState([
        { label: 'ItemWise SealCutting', value: 'itemwise' },
        { label: 'Containerwise Cutting', value: 'containerwise' }
    ]);
    const [selectSealCuttingType, setSelectSealCuttingType] = useState('itemwise');

    const [igmSearchList, setigmSearchList] = useState([]);

    const getItems = (igm) => {
        axios.get(`${ipaddress}cfigm/getItemsList?cid=${companyid}&bid=${branchId}&igm=${igm}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                console.log("jhhjhj ", response.data);

                setigmSearchList(response.data);
                getData(igm, response.data[0]);
                setItemId(response.data[0]);
            })
            .catch((error) => {
                setigmSearchList([]);
            })
    }

    const [conSearchList, setconSearchList] = useState([]);

    const getCons = (igm) => {
        axios.get(`${ipaddress}cfigm/getContainerList?cid=${companyid}&bid=${branchId}&igm=${igm}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {


                setconSearchList(response.data);
            })
            .catch((error) => {
                setconSearchList([]);
            })
    }

    console.log('sealStatus ', sealStatus);

    useEffect(() => {
        if (sealStatus !== '' && process === 'P00204') {
            setSelectSealCuttingType(sealStatus);

            if (sealStatus === 'itemwise') {
                getData(igm, item)
                setIgmId(igm);
                setItemId(item);
                setigmSearchList([]);
                setconSearchList([]);
            }
            else if (sealStatus === 'containerwise') {
                setSearchIgmId(igm);
                setSearchContainerId(cont);
                getContainerWiseData(igm, cont);
                setigmSearchList([]);
                setconSearchList([]);
            }
            else {
                if (igm && !item && !cont) {
                    setSelectSealCuttingType('itemwise');
                    setIgmId(igm);
                    getItems(igm);
                    getCons(igm);
                    setSearchIgmId(igm);
                }
            }
        }
        else if (sealStatus === '' && process === 'P00204') {
            if (igm && !item && !cont) {
                setSelectSealCuttingType('itemwise');
                setSearchIgmId(igm);
                setIgmId(igm);
                getItems(igm);
                getCons(igm);
            }
        }
    }, [igm, item, cont, sealStatus, process])


    const handleSealCuttingChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setSelectSealCuttingType('');
        }
        else {


            setSelectSealCuttingType(selectedOption ? selectedOption.value : '')
        }
    };

    const [cfigmcrg, setCfigmcrg] = useState({
        igmTransId: '',
        igmCrgTransId: '',
        profitcentreId: '',
        igmLineNo: '',
        igmNo: '',
        cycle: '',
        viaNo: '',
        blNo: '',
        blDate: null,  // Use null for Date or a default date value if preferred
        importerName: '',
        commodityDescription: '',
        cargoValue: 0, // Use 0 or another default value for BigDecimal
        cargoDuty: 0,  // Use 0 or another default value for BigDecimal
        beNo: '',
        beDate: null,  // Use null for Date or a default date value if preferred
        chaCode: '',
        chaName: '',
        mobileNo: '',
        sealCuttingType: 'General',
        sealCuttingRemarks: '',
        blType: 'ORIGIN',
        beWt: 0,      // Use 0 or another default value for BigDecimal
        notifyPartyName: ''
    });

    // Example function to update a field
    const handleChange = (e) => {
        const { name, value } = e.target;
        let sanitizedValue = value;

        // Sanitize input for specific fields
        if (['cargoValue', 'cargoDuty', 'beWt', 'mobileNo'].includes(name)) {
            sanitizedValue = handleInputChange(value);
        }
        setCfigmcrg(prevState => ({
            ...prevState,
            [name]: sanitizedValue
        }));
    };


    const [cfigmcnList, setCfigmcnList] = useState([{
        igmTransId: '',
        profitcentreId: '',
        igmNo: '',
        igmLineNo: '',
        containerNo: '',
        containerTransId: '',
        containerSize: '',
        containerType: '',
        containerWeight: 0, // Use 0 or another default value for BigDecimal
        containerSealNo: '',
        customsSealNo: '',
        sealCutTransId: '',
        sealCutReqDate: null, // Use null for Date or a default date value if preferred
        gateInDate: null,    // Use null for Date or a default date value if preferred
        gateOutType: '',
        cargoWt: 0,         // Use 0 or another default value for BigDecimal
        grossWt: 0,         // Use 0 or another default value for BigDecimal
        noOfPackages: 0,
        scanningDoneStatus: '',
        sealCutWoTransId: '',
        sealCutWoTransDate: null, // Use null for Date or a default date value if preferred
        weighmentWt: 0,    // Use 0 or another default value for BigDecimal
        odcStatus: ' ',    // Use ' ' or another default value for char
        lowBed: ' ',
        sealCuttingStatus: 'N',
        holdStatus: ''
    }]);

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


    const updateCfigmcn = (e, index) => {
        const { name, value } = e.target;
        let sanitizedValue = value;

        // Sanitize input for specific fields
        if (['cargoValue', 'cargoDuty', 'beWt', 'mobileNo'].includes(name)) {
            sanitizedValue = handleInputChange(value);
        }
        // Update igmCrgData state
        setCfigmcnList(prevState => {
            const updatedData = [...prevState];
            updatedData[index] = {
                ...updatedData[index],
                [name]: sanitizedValue
            };
            return updatedData;
        });
    };


    const handleIgmCrgChange = (e, index) => {
        const { name, checked } = e.target;


        // Update igmCrgData state
        setCfigmcnList(prevState => {
            const updatedData = [...prevState];
            updatedData[index] = {
                ...updatedData[index],
                [name]: checked ? 'Y' : 'N'
            };
            return updatedData;
        });

        // Remove error for the specific field
        // setErrors(prevErrors => {
        //     const updatedErrors = [...prevErrors];
        //     if (updatedErrors[index]) {
        //         delete updatedErrors[index][name]; // Corrected field access
        //         if (Object.keys(updatedErrors[index]).length === 0) {
        //             updatedErrors.splice(index, 1);
        //         }
        //     }
        //     return updatedErrors;
        // });

        // // Remove error-border class
        // document.getElementById(`${name}${index}`).classList.remove('error-border');
    };

    const [igmId, setIgmId] = useState('');
    const [itemId, setItemId] = useState('');
    const [shippingLine, setShippingLine] = useState('');


    const [searchCha, setsearchCha] = useState('');
    const [chaData, setChaData] = useState([]);
    const [isModalOpenForCha, setisModalOpenForCha] = useState(false);

    const openModalForCha = () => {
        setisModalOpenForCha(true);
        searchChaData('');
    }

    const closeModalForCha = () => {
        setisModalOpenForCha(false);
        setsearchCha('');
    }

    const searchChaData = (id) => {
        axios.get(`${ipaddress}party/getCha?cid=${companyid}&bid=${branchId}&val=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setChaData(response.data);
            })
            .catch((error) => {

            })
    }

    const selectCha = (id, name) => {
        console.log(id, ' ', name);

        setCfigmcrg({
            ...cfigmcrg,
            chaCode: id,
            chaName: name
        })
        setFormErrors({ ...formErrors, chaCode: '' });
        closeModalForCha();

    }

    const [currentPage2, setCurrentPage2] = useState(1);
    const [itemsPerPage2] = useState(5);

    const indexOfLastItem2 = currentPage2 * itemsPerPage2;
    const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;
    const currentItems2 = chaData.slice(indexOfFirstItem2, indexOfLastItem2);
    const totalPages2 = Math.ceil(chaData.length / itemsPerPage2);

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

    const clearCha = () => {
        searchChaData('');
        setsearchCha('');
    }

    const [disabledbtn, setdisabledbtn] = useState(false);
    const getData = (igmid, itemid) => {
        setLoading(true);

        if (!igmid) {
            toast.error("IGM number is required.", {
                autoClose: 800
            });
            setLoading(false);
            return;
        }

        if (!itemid) {
            toast.error("Item number is required.", {
                autoClose: 800
            });
            setLoading(false);
            return;
        }

        axios.get(`${ipaddress}cfigm/getDataForSealCutting?cid=${companyid}&bid=${branchId}&igm=${igmid}&line=${itemid}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;

                console.log('data ', data);

                // Assuming data.crg and data.cn match the initial state structure
                setCfigmcrg({
                    igmTransId: data.crg.igmTransId || '',
                    igmCrgTransId: data.crg.igmCrgTransId || '',
                    profitcentreId: data.crg.profitcentreId || '',
                    igmLineNo: data.crg.igmLineNo || '',
                    igmNo: data.crg.igmNo || '',
                    cycle: data.crg.cycle || '',
                    viaNo: data.crg.viaNo || '',
                    blNo: data.crg.blNo || '',
                    blDate: data.crg.blDate || null,
                    importerName: data.crg.importerName || '',
                    commodityDescription: data.crg.commodityDescription || '',
                    cargoValue: data.crg.cargoValue || 0,
                    cargoDuty: data.crg.cargoDuty || 0,
                    beNo: data.crg.beNo || '',
                    beDate: data.crg.beDate || null,
                    chaCode: data.crg.chaCode || '',
                    chaName: data.crg.chaName || '',
                    mobileNo: data.crg.mobileNo || '',
                    sealCuttingType: data.crg.sealCuttingType || 'General',
                    sealCuttingRemarks: data.crg.sealCuttingRemarks || '',
                    blType: data.crg.blType || 'ORIGIN',
                    beWt: data.cn.reduce((total, item) => total + item.cargoWt, 0) || 0,
                    notifyPartyName: data.crg.notifyPartyName || '',

                });

                setShippingLine(data.crg.createdBy || '');

                // Update `cfigmcnList` with validated data
                setCfigmcnList(data.cn.map(item => ({
                    igmTransId: item.igmTransId || '',
                    profitcentreId: item.profitcentreId || '',
                    igmNo: item.igmNo || '',
                    igmLineNo: item.igmLineNo || '',
                    containerNo: item.containerNo || '',
                    containerTransId: item.containerTransId || '',
                    containerSize: item.containerSize || '',
                    containerType: item.containerType || '',
                    containerWeight: item.containerWeight || 0,
                    containerSealNo: item.containerSealNo || '',
                    customsSealNo: item.customsSealNo || '',
                    sealCutTransId: item.sealCutTransId || '',
                    sealCutReqDate: item.sealCutReqDate || new Date(),
                    gateInDate: item.gateInDate || null,
                    gateOutType: item.gateOutType || '',
                    cargoWt: item.cargoWt || 0,
                    grossWt: item.grossWt || 0,
                    noOfPackages: item.noOfPackages || 0,
                    scanningDoneStatus: item.scanningDoneStatus || '',
                    sealCutWoTransId: item.sealCutWoTransId || '',
                    sealCutWoTransDate: item.sealCutWoTransDate || null,
                    weighmentWt: item.weighmentWt || 0,
                    odcStatus: item.odcStatus || ' ',
                    lowBed: item.lowBed || ' ',
                    sealCuttingStatus: item.sealCuttingStatus || 'N',
                    holdStatus: item.holdStatus || ''
                })));

                const allHaveSealCutWoTransId = data.cn.every(item => item.sealCutWoTransId !== '');
                setdisabledbtn(allHaveSealCutWoTransId);

                toast.success("Data found successfully", {
                    autoClose: 800
                });
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data || "An error occurred", {
                    autoClose: 800
                });
                setLoading(false);
            });
    };


    const handleClear = () => {
        setShippingLine('');
        setFormErrors({
            beNo: "",
            beDate: "",
            chaCode: "",
            cargoValue: "",
            cargoDuty: ""
        })
        setErrors([]);
        setSelectJobOrder('');
        if (igm && !item && !cont) {
            setIgmId(igm);
        }
        else {
            setIgmId('');
        }
        setItemId('');
        setCfigmcnList([{
            igmTransId: '',
            profitcentreId: '',
            igmNo: '',
            igmLineNo: '',
            containerNo: '',
            containerTransId: '',
            containerSize: '',
            containerType: '',
            containerWeight: 0, // Use 0 or another default value for BigDecimal
            containerSealNo: '',
            customsSealNo: '',
            sealCutTransId: '',
            sealCutReqDate: null, // Use null for Date or a default date value if preferred
            gateInDate: null,    // Use null for Date or a default date value if preferred
            gateOutType: '',
            cargoWt: 0,         // Use 0 or another default value for BigDecimal
            grossWt: 0,         // Use 0 or another default value for BigDecimal
            noOfPackages: 0,
            scanningDoneStatus: '',
            sealCutWoTransId: '',
            sealCutWoTransDate: null, // Use null for Date or a default date value if preferred
            weighmentWt: 0,    // Use 0 or another default value for BigDecimal
            odcStatus: ' ',    // Use ' ' or another default value for char
            lowBed: ' ',
            sealCuttingStatus: 'N',
            holdStatus: ''
        }]);
        setdisabledbtn(false);
        setCfigmcrg({
            igmTransId: '',
            igmCrgTransId: '',
            profitcentreId: '',
            igmLineNo: '',
            igmNo: '',
            cycle: '',
            viaNo: '',
            blNo: '',
            blDate: null,  // Use null for Date or a default date value if preferred
            importerName: '',
            commodityDescription: '',
            cargoValue: 0, // Use 0 or another default value for BigDecimal
            cargoDuty: 0,  // Use 0 or another default value for BigDecimal
            beNo: '',
            beDate: null,  // Use null for Date or a default date value if preferred
            chaCode: '',
            chaName: '',
            mobileNo: '',
            sealCuttingType: 'General',
            sealCuttingRemarks: '',
            blType: 'ORIGIN',
            beWt: 0,      // Use 0 or another default value for BigDecimal
            notifyPartyName: ''
        })
    }
    const [formErrors, setFormErrors] = useState({
        beNo: "",
        beDate: "",
        chaCode: "",
        cargoValue: "",
        cargoDuty: ""
    })


    const validateMobileNumber = (number) => {
        // Regular expression for a 10-digit mobile number
        const regex = /^\d{10}$/;
        return regex.test(number);
    }

    const [errors, setErrors] = useState([]);

    const handleSave = () => {
        setLoading(true);
        let errors = {};

        if (!cfigmcrg.beNo) {
            errors.beNo = "BE no is required."
        }

        if (!cfigmcrg.beDate) {
            errors.beDate = "BE date is required."
        }

        if (!cfigmcrg.chaCode) {
            errors.chaCode = "CHA is required."
        }

        if (!cfigmcrg.cargoValue || cfigmcrg.cargoValue <= 0) {
            errors.cargoValue = "Cargo value is required."
        }

        if (!cfigmcrg.cargoDuty || cfigmcrg.cargoDuty <= 0) {
            errors.cargoDuty = "Cargo duty is required."
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setLoading(false);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            })
            return;
        }

        const filteredItems = cfigmcnList.filter(item => item.sealCuttingStatus === 'Y');
        let newErrors = filteredItems.map(() => ({}));
        setErrors([]);

        filteredItems.forEach((data, index) => {
            let rowErrors = {};
            if (!data.sealCutReqDate) rowErrors.sealCutReqDate = "Seal Cut Date is required.";
            if (!data.gateOutType) rowErrors.gateOutType = "Gate out type is required.";


            if (Object.keys(rowErrors).length > 0) {
                newErrors[index] = rowErrors;
            }
        });

        // Check if any errors exist
        const hasErrors = newErrors.some(errorObj => Object.keys(errorObj).length > 0);

        if (hasErrors) {
            console.log('newErrors ', newErrors);
            setErrors(newErrors);
            setLoading(false);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            });
            console.log('errors ', errors);
            return;
        }


        if (cfigmcrg.mobileNo) {
            if (!validateMobileNumber(cfigmcrg.mobileNo)) {
                toast.error("Invalid mobile no.", {
                    autoClose: 1000
                })
                setLoading(false);
                return;
            }
        }

        const checkSealCutting = cfigmcnList.some(item => item.sealCuttingStatus === 'Y');
        if (!checkSealCutting) {
            toast.error("Please select atleast one checkbox.", {
                autoClose: 1000
            })
            setLoading(false);
            return;
        }

        const formData = {
            crg: cfigmcrg,
            cn: cfigmcnList
        }

        axios.post(`${ipaddress}cfigm/saveSealCutting?cid=${companyid}&bid=${branchId}&user=${userId}`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                toast.success("Data save successfully..", {
                    autoClose: 800
                })
                setLoading(false);
                const data = response.data;

                // Assuming data.crg and data.cn match the initial state structure
                setCfigmcrg({
                    igmTransId: data.crg.igmTransId || '',
                    igmCrgTransId: data.crg.igmCrgTransId || '',
                    profitcentreId: data.crg.profitcentreId || '',
                    igmLineNo: data.crg.igmLineNo || '',
                    igmNo: data.crg.igmNo || '',
                    cycle: data.crg.cycle || '',
                    viaNo: data.crg.viaNo || '',
                    blNo: data.crg.blNo || '',
                    blDate: data.crg.blDate || null,
                    importerName: data.crg.importerName || '',
                    commodityDescription: data.crg.commodityDescription || '',
                    cargoValue: data.crg.cargoValue || 0,
                    cargoDuty: data.crg.cargoDuty || 0,
                    beNo: data.crg.beNo || '',
                    beDate: data.crg.beDate || null,
                    chaCode: data.crg.chaCode || '',
                    chaName: data.crg.chaName || '',
                    mobileNo: data.crg.mobileNo || '',
                    sealCuttingType: data.crg.sealCuttingType || 'General',
                    sealCuttingRemarks: data.crg.sealCuttingRemarks || '',
                    blType: data.crg.blType || 'ORIGIN',
                    beWt: data.crg.beWt || 0,
                    notifyPartyName: data.crg.notifyPartyName || ''
                });

                setShippingLine(data.crg.createdBy || '');

                // Update `cfigmcnList` with validated data
                setCfigmcnList(data.cn.map(item => ({
                    igmTransId: item.igmTransId || '',
                    profitcentreId: item.profitcentreId || '',
                    igmNo: item.igmNo || '',
                    igmLineNo: item.igmLineNo || '',
                    containerNo: item.containerNo || '',
                    containerTransId: item.containerTransId || '',
                    containerSize: item.containerSize || '',
                    containerType: item.containerType || '',
                    containerWeight: item.containerWeight || 0,
                    containerSealNo: item.containerSealNo || '',
                    customsSealNo: item.customsSealNo || '',
                    sealCutTransId: item.sealCutTransId || '',
                    sealCutReqDate: item.sealCutReqDate || new Date(),
                    gateInDate: item.gateInDate || null,
                    gateOutType: item.gateOutType || '',
                    cargoWt: item.cargoWt || 0,
                    grossWt: item.grossWt || 0,
                    noOfPackages: item.noOfPackages || 0,
                    scanningDoneStatus: item.scanningDoneStatus || '',
                    sealCutWoTransId: item.sealCutWoTransId || '',
                    sealCutWoTransDate: item.sealCutWoTransDate || null,
                    weighmentWt: item.weighmentWt || 0,
                    odcStatus: item.odcStatus || ' ',
                    lowBed: item.lowBed || ' ',
                    sealCuttingStatus: item.sealCuttingStatus || 'N',
                    holdStatus: item.holdStatus || ''
                })));

                const allHaveSealCutWoTransId = data.cn.every(item => item.sealCutWoTransId !== '');
                setdisabledbtn(allHaveSealCutWoTransId);
                onRequest();
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })

    }


    // -----------------------------------------------------------------------------------------------------------------




    // -------------------------------------- Container Wise ------------------------------------------------------------


    const [searchIgmId, setSearchIgmId] = useState('');
    const [searchContainerId, setSearchContainerId] = useState('');


    const [containerWiseData, setcontainerWiseData] = useState({
        igmNo: '',
        igmTransId: '',
        igmLineNo: '',
        containerNo: '',
        gateInId: '',
        containerTransId: '',
        partyName: '',
        viaNo: '',
        mobileNo: '',
        gateOutType: '',
        containerSize: '',
        containerType: '',
        customsSealNo: '',
        grossWt: 0, // BigDecimal can be managed as a number in JS
        gateInDate: null, // Use Date object or null
        sealCutWoTransDate: new Date(), // Use Date object or null
        weighmentWeight: 0, // BigDecimal can be managed as a number in JS
        sealCuttingType: 'General',
        sealCuttingStatus: '',
        sealCutWoTransId: '',
        cycle: '',
        vehicleType: 'Normal',
        sealCutRemarks: '',
        notifyPartyName: '',
        scanningDoneStatus: '',
        odcStatus: '',
        lowBed: '',
        status: ''
    });


    const [cargoMultipleDta, setcargoMultipleData] = useState([{
        igmNo: '',
        igmTransId: '',
        igmLineNo: '',
        importerName: '',
        blNo: '',
        blDate: null, // Use Date object or null
        noOfPackages: 0,
        grossWeight: 0, // BigDecimal can be managed as a number in JS
        beNo: '',
        beDate: null, // Use Date object or null
        cargoValue: 0, // BigDecimal can be managed as a number in JS
        cargoDuty: 0, // BigDecimal can be managed as a number in JS
        blType: 'ORIGIN',
        commodityDescription: '',
        chaCode: '',
        chaName: '',
    }])

    const getContainerWiseData = (igmId, conId) => {
        setLoading(true);
        axios.get(`${ipaddress}cfigm/getSingleContainerForSealCutting?cid=${companyid}&bid=${branchId}&igm=${igmId}&container=${conId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                console.log('data ', response.data);

                const data = response.data;

                // Update `containerWiseData` with the data from response
                setcontainerWiseData({
                    igmNo: data.singleResult[0] || '',
                    igmTransId: data.singleResult[1] || '',
                    igmLineNo: data.singleResult[2] || '',
                    containerNo: data.singleResult[3] || '',
                    gateInId: data.singleResult[4] || '',
                    containerTransId: data.singleResult[5] || '',
                    partyName: data.singleResult[6] || '',
                    viaNo: data.singleResult[7] || '',
                    mobileNo: data.singleResult[8] || '',
                    gateOutType: data.singleResult[9] || '',
                    containerSize: data.singleResult[10] || '',
                    containerType: data.singleResult[11] || '',
                    customsSealNo: data.singleResult[12] || '',
                    grossWt: data.singleResult[13] || 0,
                    gateInDate: data.singleResult[14] === null ? null : new Date(data.singleResult[14]) || null,
                    sealCutWoTransDate: (data.singleResult[15] === null ? null : new Date(data.singleResult[15])) || new Date(),
                    weighmentWeight: data.singleResult[16] || 0,
                    sealCuttingType: data.singleResult[17] || 'General',
                    sealCuttingStatus: data.singleResult[18] || '',
                    sealCutWoTransId: data.singleResult[19] || '',
                    cycle: data.singleResult[20] || '',
                    vehicleType: data.singleResult[21] || 'Normal',
                    sealCutRemarks: data.singleResult[22] || '',
                    notifyPartyName: data.singleResult[23] || '',
                    scanningDoneStatus: data.singleResult[24] || '',
                    odcStatus: data.singleResult[25] || '',
                    lowBed: data.singleResult[26] || '',
                    status: data.singleResult[27] || '',
                });

                // Update `cargoMultipleData` with the data from response
                setcargoMultipleData(data.crg.map(item => ({
                    igmNo: item[0] || '',
                    igmTransId: item[1] || '',
                    igmLineNo: item[2] || '',
                    importerName: item[3] || '',
                    blNo: item[4] || '',
                    blDate: new Date(item[5]) || null,
                    noOfPackages: item[6] || 0,
                    grossWeight: item[7] || 0,
                    beNo: item[8] || '',
                    beDate: (item[9] === null ? null : new Date(item[9])) || null,
                    cargoValue: item[10] || 0,
                    cargoDuty: item[11] || 0,
                    blType: item[12] || 'ORIGIN',
                    commodityDescription: item[13] || '',
                    chaCode: item[14] || '',
                    chaName: item[15] || '',
                })));
                toast.success('Data found successfully!!!', {
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

    console.log('cargoMultipleDta ', cargoMultipleDta);


    const handleContainerChange = (e) => {
        const { name, value } = e.target;
        let sanitizedValue = value;

        // Sanitize input for specific fields
        if (['mobileNo'].includes(name)) {
            sanitizedValue = handleInputChange(value);
        }
        setcontainerWiseData(prevState => ({
            ...prevState,
            [name]: sanitizedValue
        }));
    };

    const handleContainerCheckChange = (e) => {
        const { name, checked } = e.target;

        setcontainerWiseData(prevState => ({
            ...prevState,
            [name]: checked ? 'Y' : 'N'
        }));
    };

    const handleChangeCargo = (e, index) => {
        const { name, value } = e.target;
        let sanitizedValue = value;

        // Sanitize input for specific fields
        if (['cargoValue', 'cargoDuty'].includes(name)) {
            sanitizedValue = handleInputChange(value);
        }
        // Update igmCrgData state
        setcargoMultipleData(prevState => {
            const updatedData = [...prevState];
            updatedData[index] = {
                ...updatedData[index],
                [name]: sanitizedValue
            };
            return updatedData;
        });

        setFormErrors1(prevErrors => {
            const updatedErrors = [...prevErrors];
            if (updatedErrors[index]) {
                delete updatedErrors[index][name]; // Corrected field access
                if (Object.keys(updatedErrors[index]).length === 0) {
                    updatedErrors.splice(index, 1);
                }
            }
            return updatedErrors;
        });

        // Remove error-border class
        document.getElementById(`${name}${index}`).classList.remove('error-border');
    };

    const [ind, setInd] = useState('');
    const openModalForCha1 = (index) => {
        setisModalOpenForCha(true);
        searchChaData('');
        setInd(index);
    }

    const closeModalForCha1 = () => {
        setisModalOpenForCha(false);
        setsearchCha('');
        setInd('');
    }

    const selectCha1 = (id, name, index) => {
        console.log(id, ' ', name);

        setcargoMultipleData(prevState => {
            const updatedData = [...prevState];
            updatedData[index] = {
                ...updatedData[index],
                ['chaCode']: id,
                ['chaName']: name,
            };
            return updatedData;
        });
        setFormErrors1(prevErrors => {
            const updatedErrors = [...prevErrors];
            if (updatedErrors[index]) {
                delete updatedErrors[index]['chaCode']; // Corrected field access
                if (Object.keys(updatedErrors[index]).length === 0) {
                    updatedErrors.splice(index, 1);
                }
            }
            return updatedErrors;
        });

        // Remove error-border class
        document.getElementById(`chaCode${index}`).classList.remove('error-border');
        closeModalForCha();

    }

    const handleContainerClear = () => {
        setErrors([]);
        if (igm && !item && !cont) {
            setSearchIgmId(igm);
        }
        else {
            setSearchIgmId('');
        }
        // setSearchIgmId('');
        setSearchContainerId('');
        setcontainerWiseData({
            igmNo: '',
            igmTransId: '',
            igmLineNo: '',
            containerNo: '',
            gateInId: '',
            containerTransId: '',
            partyName: '',
            viaNo: '',
            mobileNo: '',
            gateOutType: '',
            containerSize: '',
            containerType: '',
            customsSealNo: '',
            grossWt: 0, // BigDecimal can be managed as a number in JS
            gateInDate: null, // Use Date object or null
            sealCutWoTransDate: new Date(), // Use Date object or null
            weighmentWeight: 0, // BigDecimal can be managed as a number in JS
            sealCuttingType: 'General',
            sealCuttingStatus: '',
            sealCutWoTransId: '',
            cycle: '',
            vehicleType: 'Normal',
            sealCutRemarks: '',
            notifyPartyName: '',
            scanningDoneStatus: '',
            odcStatus: '',
            lowBed: '',
            status: ''
        })

        setcargoMultipleData([{
            igmNo: '',
            igmTransId: '',
            igmLineNo: '',
            importerName: '',
            blNo: '',
            blDate: null, // Use Date object or null
            noOfPackages: 0,
            grossWeight: 0, // BigDecimal can be managed as a number in JS
            beNo: '',
            beDate: null, // Use Date object or null
            cargoValue: 0, // BigDecimal can be managed as a number in JS
            cargoDuty: 0, // BigDecimal can be managed as a number in JS
            blType: 'ORIGIN',
            commodityDescription: '',
            chaCode: '',
            chaName: '',
        }])
    }

    const [formErrors1, setFormErrors1] = useState([]);

    const saveContainerWiseSealCutting = () => {
        setLoading(true);
        let newErrors = cargoMultipleDta.map(() => ({}));
        setErrors([]);

        cargoMultipleDta.forEach((data, index) => {
            let rowErrors = {};
            if (!data.beNo) rowErrors.beNo = "BE no is required.";
            if (!data.beDate) rowErrors.beDate = "BE date is required.";
            if (!data.cargoValue || data.cargoValue <= 0) rowErrors.cargoValue = "Cargo value is required.";
            if (!data.cargoDuty || data.cargoDuty <= 0) rowErrors.cargoDuty = "Cargo duty is required.";
            if (!data.chaCode) rowErrors.chaCode = "CHA is required.";

            if (Object.keys(rowErrors).length > 0) {
                newErrors[index] = rowErrors;
            }
        });

        // Check if any errors exist
        const hasErrors = newErrors.some(errorObj => Object.keys(errorObj).length > 0);

        if (hasErrors) {
            console.log('newErrors ', newErrors);
            setFormErrors1(newErrors);
            setLoading(false);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            });
            console.log('errors ', errors);
            return;
        }


        if (containerWiseData.mobileNo) {
            if (!validateMobileNumber(containerWiseData.mobileNo)) {
                toast.error("Invalid mobile no.", {
                    autoClose: 1000
                })
                setLoading(false);
                return;
            }
        }


        const formData = {
            con: containerWiseData,
            cargo: cargoMultipleDta
        }

        console.log('formData ', formData);

        axios.post(`${ipaddress}cfigm/saveContainerWiseSealCutting?cid=${companyid}&bid=${branchId}&user=${userId}`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;

                // Update `containerWiseData` with the data from response
                setcontainerWiseData({
                    igmNo: data.singleResult[0] || '',
                    igmTransId: data.singleResult[1] || '',
                    igmLineNo: data.singleResult[2] || '',
                    containerNo: data.singleResult[3] || '',
                    gateInId: data.singleResult[4] || '',
                    containerTransId: data.singleResult[5] || '',
                    partyName: data.singleResult[6] || '',
                    viaNo: data.singleResult[7] || '',
                    mobileNo: data.singleResult[8] || '',
                    gateOutType: data.singleResult[9] || '',
                    containerSize: data.singleResult[10] || '',
                    containerType: data.singleResult[11] || '',
                    customsSealNo: data.singleResult[12] || '',
                    grossWt: data.singleResult[13] || 0,
                    gateInDate: data.singleResult[14] === null ? null : new Date(data.singleResult[14]) || null,
                    sealCutWoTransDate: (data.singleResult[15] === null ? null : new Date(data.singleResult[15])) || new Date(),
                    weighmentWeight: data.singleResult[16] || 0,
                    sealCuttingType: data.singleResult[17] || 'General',
                    sealCuttingStatus: data.singleResult[18] || '',
                    sealCutWoTransId: data.singleResult[19] || '',
                    cycle: data.singleResult[20] || '',
                    vehicleType: data.singleResult[21] || 'Normal',
                    sealCutRemarks: data.singleResult[22] || '',
                    notifyPartyName: data.singleResult[23] || '',
                    scanningDoneStatus: data.singleResult[24] || '',
                    odcStatus: data.singleResult[25] || '',
                    lowBed: data.singleResult[26] || '',
                    status: data.singleResult[27] || '',
                });

                // Update `cargoMultipleData` with the data from response
                setcargoMultipleData(data.crg.map(item => ({
                    igmNo: item[0] || '',
                    igmTransId: item[1] || '',
                    igmLineNo: item[2] || '',
                    importerName: item[3] || '',
                    blNo: item[4] || '',
                    blDate: new Date(item[5]) || null,
                    noOfPackages: item[6] || 0,
                    grossWeight: item[7] || 0,
                    beNo: item[8] || '',
                    beDate: (item[9] === null ? null : new Date(item[9])) || new Date(),
                    cargoValue: item[10] || 0,
                    cargoDuty: item[11] || 0,
                    blType: item[12] || 'ORIGIN',
                    commodityDescription: item[13] || '',
                    chaCode: item[14] || '',
                    chaName: item[15] || '',
                })));
                toast.success('Data save successfully!!!', {
                    autoClose: 800
                })
                setLoading(false);
                onRequest();
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })
    }



    const handleBEDateChange = (date, index) => {
        // Update cargoMultipleData state
        setcargoMultipleData(prevState => {
            const updatedData = [...prevState];
            updatedData[index] = {
                ...updatedData[index],
                beDate: date
            };
            return updatedData;
        });

        // Update formErrors1 state
        setFormErrors1(prevErrors => {
            const updatedErrors = [...prevErrors];
            if (updatedErrors[index]) {
                delete updatedErrors[index].beDate; // Remove the error for this field
                if (Object.keys(updatedErrors[index]).length === 0) {
                    updatedErrors.splice(index, 1); // Remove the entry if no errors left
                }
            }
            return updatedErrors;
        });

        // Remove error border class if present
        const dateInput = document.getElementById(`beDate${index}`);
        if (dateInput) {
            dateInput.classList.remove('error-border');
        }
    };

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
                    label: port[2] + '-' + port[1],
                    cname: port[1]
                }))
                setChaList(portOptions);
            })
            .catch((error) => {
                setChaList([]);
            })
    }

    const handleChaSelect = async (selectedOption, { action }) => {
        if (action === 'clear') {
            setCfigmcrg({
                ...cfigmcrg,
                chaCode: '',
                chaName: ''
            });
        }
        else {
            setCfigmcrg({
                ...cfigmcrg,
                chaCode: selectedOption.value,
                chaName: selectedOption.cname
            });
        }
        setFormErrors({ ...formErrors, chaCode: '' });
    }

    const CustomOption = (props) => {
        return (
            <components.Option {...props}>
                <span style={{ fontWeight: 'bold' }}>{props.data.value}</span>
                {"-" + props.data.cname}
            </components.Option>
        );


    };


    const handleChaSelect1 = async (selectedOption, { action }, index) => {

        if (action === 'clear') {
            setcargoMultipleData(prevState => {
                const updatedData = [...prevState];
                updatedData[index] = {
                    ...updatedData[index],
                    ['chaCode']: '',
                    ['chaName']: '',
                };
                return updatedData;
            });
        }
        else {
            setcargoMultipleData(prevState => {
                const updatedData = [...prevState];
                updatedData[index] = {
                    ...updatedData[index],
                    ['chaCode']: selectedOption.value,
                    ['chaName']: selectedOption.cname,
                };
                return updatedData;
            });
        }


        setFormErrors1(prevErrors => {
            const updatedErrors = [...prevErrors];
            if (updatedErrors[index]) {
                delete updatedErrors[index]['chaCode']; // Corrected field access
                if (Object.keys(updatedErrors[index]).length === 0) {
                    updatedErrors.splice(index, 1);
                }
            }
            return updatedErrors;
        });

        // Remove error-border class
        document.getElementById(`chaCode${index}`).classList.remove('error-border');


    }


    const [selectJobOrder, setSelectJobOrder] = useState('');


    const downloadItemWiseReport = () => {

        if (selectJobOrder === '') {
            toast.error("Please select job order id", {
                autoClose: 800
            })
            return;
        }


        setLoading(true);
        axios
            .post(
                `${ipaddress}importReports/importSealCuttingItemwiseReport?cid=${companyid}&bid=${branchId}&igm=${cfigmcrg.igmNo}&item=${cfigmcrg.igmLineNo}&jobOrder=${selectJobOrder}`,
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
                setLoading(false);
            });
    };


    const downloadConWiseReport = () => {

        // if (selectJobOrder === '') {
        //     toast.error("Please select job order id", {
        //         autoClose: 800
        //     })
        //     return;
        // }


        setLoading(true);
        axios
            .post(
                `${ipaddress}importReports/importSealCuttingContainerwiseReport?cid=${companyid}&bid=${branchId}&igm=${containerWiseData.igmNo}&con=${containerWiseData.containerNo}&jobOrder=${containerWiseData.sealCutWoTransId}`,
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
                setLoading(false);
            });
    };


    return (
        <div>
            <Row>
                <Col md={3}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            SealCutting Type
                        </label>
                        <Select
                            options={sealCuttingData}
                            placeholder="Select SealCutting type"
                            isClearable
                            id="nameOfExporter"
                            value={{ value: selectSealCuttingType, label: selectSealCuttingType }}
                            onChange={handleSealCuttingChange}
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

                {selectSealCuttingType === 'itemwise' && (
                    <>
                        <Modal Modal isOpen={isModalOpenForCha} onClose={closeModalForCha} toggle={closeModalForCha} style={{ maxWidth: '800px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                            <ModalHeader toggle={closeModalForCha} style={{
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
                                /> Search CHA</h5>



                            </ModalHeader>
                            <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                                <Row>
                                    <Col md={5}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Search By CHA name
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="fobValueInDollar"
                                                value={searchCha}
                                                onChange={(e) => setsearchCha(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6} style={{ marginTop: 25 }}>
                                        <button
                                            className="btn btn-outline-primary btn-margin newButton"
                                            style={{ marginRight: 10 }}

                                            id="submitbtn2"
                                            onClick={() => { searchChaData(searchCha); setCurrentPage2(1); }}
                                        >
                                            <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                            Search
                                        </button>
                                        <button
                                            className="btn btn-outline-danger btn-margin newButton"
                                            id="submitbtn2"
                                            onClick={() => { clearCha() }}
                                        >
                                            <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                            Reset
                                        </button>
                                    </Col>

                                </Row>
                                <hr />
                                <div className="mt-1 table-responsive ">
                                    <table className="table table-bordered table-hover tableHeader">
                                        <thead className='tableHeader'>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Party Id</th>
                                                <th scope="col">Party Name</th>
                                                <th scope="col">Customer Code</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><input type="radio" onChange={() => selectCha('', '')} name="radioGroup" value="" /></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            {currentItems2.map((item, index) => (
                                                <tr key={index}>
                                                    <td><input type="radio" name="radioGroup" onChange={() => selectCha(item[2], item[1])} value="" /></td>
                                                    <td>{item[0]}</td>
                                                    <td>{item[1]}</td>
                                                    <td>{item[2]}</td>
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

                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    IGM No
                                </label>
                                <Input
                                    className="form-control"
                                    type="text"
                                    id="fobValueInDollar"
                                    value={igmId}
                                    onChange={(e) => setIgmId(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Item No
                                </label>
                                {(igm && !item && !cont) ? (
                                    <Input
                                        className="form-control"
                                        type="select"
                                        id="fobValueInDollar"
                                        value={itemId}
                                        onChange={(e) => setItemId(e.target.value)}
                                    >
                                        <option value=""> Select Item No</option>
                                        {igmSearchList.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}
                                    </Input>
                                )
                                    :
                                    (
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="fobValueInDollar"
                                            value={itemId}
                                            onChange={(e) => setItemId(e.target.value)}
                                        />
                                    )
                                }
                                {/* <Input
                                    className="form-control"
                                    type="text"
                                    id="fobValueInDollar"
                                    value={itemId}
                                    onChange={(e) => setItemId(e.target.value)}
                                /> */}
                            </FormGroup>
                        </Col>
                        <Col md={3} style={{ marginTop: 25 }}>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={() => getData(igmId, itemId)}
                            >
                                <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                Search
                            </button>
                        </Col>

                        <hr />
                        {cfigmcrg.igmNo != '' && (
                            <>
                                <Row>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                BE No <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="beNo"
                                                name="beNo"
                                                value={cfigmcrg.beNo}
                                                style={{ borderColor: formErrors.beNo ? 'red' : '' }}
                                                onChange={(e) => {
                                                    handleChange(e); // Ensure handleChange updates the state based on event
                                                    setFormErrors({ ...formErrors, beNo: '' });
                                                }}
                                                maxLength={20}
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
                                                    selected={cfigmcrg.beDate}
                                                    onChange={(date) => {
                                                        setCfigmcrg({
                                                            ...cfigmcrg,
                                                            beDate: date
                                                        }); setFormErrors({ ...formErrors, beDate: '' });
                                                    }}
                                                    id='beDate'
                                                    maxDate={new Date()}
                                                    name='beDate'
                                                    dateFormat="dd/MM/yyyy"
                                                    className="form-control border-right-0 InputField"
                                                    customInput={<Input style={{ width: '100%', borderColor: formErrors.beDate ? 'red' : '' }} />}
                                                    wrapperClassName="custom-react-datepicker-wrapper"
                                                />
                                                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                            </div>
                                            <div style={{ color: 'red' }} className="error-message">{formErrors.beDate}</div>

                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                CHA Code <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            {/* <Input
                                                className="form-control"
                                                type="text"
                                                id="chaCode"
                                                name='chaCode'
                                                value={cfigmcrg.chaCode}
                                                style={{ borderColor: formErrors.chaCode ? 'red' : '' }}
                                                onChange={(e) => {
                                                    handleChange(e); // Ensure handleChange updates the state based on event
                                                    setFormErrors({ ...formErrors, chaCode: '' });
                                                }}
                                                disabled
                                            /> */}
                                            <Select

                                                value={{ value: cfigmcrg.chaCode, label: cfigmcrg.chaCode }}
                                                onChange={handleChaSelect}
                                                onInputChange={handleCHAList}
                                                options={chaList}
                                                placeholder="Select CHA"
                                                isClearable
                                                id="chaCode"
                                                name="chaCode"
                                                className={`autocompleteHeight}`}
                                                components={{ Option: CustomOption }}
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
                                                CHA
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="chaName"
                                                name='chaName'
                                                value={cfigmcrg.chaName}
                                                onChange={handleChange}
                                                disabled
                                            />


                                        </FormGroup>
                                    </Col>
                                    {/* <Col md={1} style={{ marginTop: 25 }}>
                                        <button
                                            className="btn btn-outline-primary btn-margin newButton"
                                            style={{ marginRight: 10 }}
                                            id="submitbtn2"
                                            onClick={openModalForCha}
                                        >
                                            <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />

                                        </button>
                                    </Col> */}
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                VIA No
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="viaNo"
                                                name='viaNo'
                                                value={cfigmcrg.viaNo}
                                                onChange={handleChange}
                                                maxLength={15}
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
                                                type="text"
                                                id="commodityDescription"
                                                name='commodityDescription'
                                                value={cfigmcrg.commodityDescription}
                                                onChange={handleChange}
                                                maxLength={15}
                                                disabled
                                            />


                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Shipping Line
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="fobValueInDollar"
                                                value={shippingLine}
                                                disabled
                                            />


                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Importer Name
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="importerName"
                                                name='importerName'
                                                value={cfigmcrg.importerName}
                                                onChange={handleChange}
                                                disabled
                                            />


                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                BL No
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="blNo"
                                                name='blNo'
                                                value={cfigmcrg.blNo}
                                                onChange={handleChange}
                                                maxLength={15}
                                                disabled
                                            />


                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                BL Date
                                            </label>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={cfigmcrg.blDate}
                                                    id='blDate'
                                                    name='blDate'
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
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                BL Type
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="select"
                                                id="blType"
                                                name='blType'
                                                value={cfigmcrg.blType}
                                                onChange={handleChange}

                                            >

                                                <option value="ORIGIN">Original</option>

                                                <option value="NEGOTI">Negotiable</option>

                                                <option value="DO">DO</option>

                                            </Input>


                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Cycle Type
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="cycle"
                                                name='cycle'
                                                value={cfigmcrg.cycle}
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
                                                Notify Party Name
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="notifyPartyName"
                                                name='notifyPartyName'
                                                value={cfigmcrg.notifyPartyName}
                                                onChange={handleChange}
                                                disabled
                                            />


                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Cargo Value <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="cargoValue"
                                                name='cargoValue'
                                                value={cfigmcrg.cargoValue}
                                                style={{ borderColor: formErrors.cargoValue ? 'red' : '' }}
                                                onChange={(e) => {
                                                    handleChange(e); // Ensure handleChange updates the state based on event
                                                    setFormErrors({ ...formErrors, cargoValue: '' });
                                                }}
                                                maxLength={16}
                                            />
                                            <div style={{ color: 'red' }} className="error-message">{formErrors.cargoValue}</div>

                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Cargo Duty <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="cargoDuty"
                                                name='cargoDuty'
                                                value={cfigmcrg.cargoDuty}
                                                style={{ borderColor: formErrors.cargoDuty ? 'red' : '' }}
                                                onChange={(e) => {
                                                    handleChange(e); // Ensure handleChange updates the state based on event
                                                    setFormErrors({ ...formErrors, cargoDuty: '' });
                                                }}
                                                maxLength={16}
                                            />
                                            <div style={{ color: 'red' }} className="error-message">{formErrors.cargoDuty}</div>


                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Mobile No
                                            </label>
                                            <Input
                                                className={`form-control ${(!validateMobileNumber(cfigmcrg.mobileNo) && cfigmcrg.mobileNo !== '') ? 'error-border' : ''} `}
                                                type="text"
                                                id="mobileNo"
                                                name='mobileNo'
                                                maxLength={10}
                                                value={cfigmcrg.mobileNo}
                                                onChange={handleChange}

                                            />
                                            {(!validateMobileNumber(cfigmcrg.mobileNo) && cfigmcrg.mobileNo !== '') && (
                                                <div style={{ color: 'red' }} className="error-message">Invalid Mobile No</div>
                                            )}


                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Seal Cutting Type
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="select"
                                                id="sealCuttingType"
                                                name='sealCuttingType'
                                                value={cfigmcrg.sealCuttingType}
                                                onChange={handleChange}

                                            >


                                                <option value="General" selected>General</option>

                                                <option value="SEZ">SEZ</option>

                                                <option value="RMS">RMS</option>


                                            </Input>


                                        </FormGroup>
                                    </Col>



                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                BE Weight
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="beWt"
                                                name='beWt'
                                                value={cfigmcrg.beWt}
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
                                                IGM Total PKG
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="fobValueInDollar"
                                                value={cfigmcnList.reduce((total, item) => total + item.noOfPackages, 0)}
                                                disabled
                                            />


                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                IGM Total Weight
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="fobValueInDollar"
                                                value={cfigmcnList.reduce((total, item) => total + item.grossWt, 0)}
                                                disabled
                                            />


                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Remarks
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="textarea"
                                                id="sealCuttingRemarks"
                                                name='sealCuttingRemarks'
                                                value={cfigmcrg.sealCuttingRemarks}
                                                onChange={handleChange}
                                                maxLength={150}

                                            />


                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Select Job Order
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="select"
                                                id="selectJobOrder"
                                                name='selectJobOrder'
                                                value={selectJobOrder}
                                                onChange={(e) => setSelectJobOrder(e.target.value)}
                                            >
                                                <option value="">Select Job Order</option>
                                                {[...new Set(
                                                    cfigmcnList
                                                        .filter(item => item.sealCutWoTransId && item.sealCutWoTransId.trim() !== '') // Exclude null, undefined, and empty strings
                                                        .map(item => item.sealCutWoTransId) // Extract only sealCutWoTransId
                                                )].map((distinctId, index) => (
                                                    <option key={index} value={distinctId}>
                                                        {distinctId}
                                                    </option>
                                                ))}

                                            </Input>


                                        </FormGroup>
                                    </Col>

                                </Row>


                                <Row>
                                    <Col className='text-center'>
                                        <button
                                            className="btn btn-outline-primary btn-margin newButton"
                                            style={{ marginRight: 10 }}
                                            id="submitbtn2"
                                            onClick={handleSave}
                                            disabled={disabledbtn}
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
                                            className="btn btn-outline-success btn-margin newButton"
                                            style={{ marginRight: 10 }}
                                            id="submitbtn2"
                                            onClick={downloadItemWiseReport}
                                            disabled={selectJobOrder === ''}
                                        >
                                            <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
                                            Print Report
                                        </button>
                                    </Col>
                                </Row>
                                <div id="datepicker-portal1"></div>
                                <div className="mt-3 table-responsive ">
                                    <table className="table table-bordered table-hover tableHeader">
                                        <thead className='tableHeader'>
                                            <tr>
                                                <th scope="col">Select</th>
                                                <th scope="col">Sr No</th>
                                                <th scope="col">Seal Cutting Id</th>
                                                <th scope="col">Seal Cutting Date</th>
                                                <th scope="col">Container No</th>
                                                <th scope="col">Size/Type</th>
                                                <th scope="col">Agent Seal No</th>
                                                <th scope="col">Gate In Date</th>
                                                <th scope="col">Seal Cut Date</th>
                                                <th scope="col">Pkgs</th>
                                                <th scope="col">Gross Wt</th>
                                                <th scope="col">Cargo Wt</th>
                                                <th scope="col">Gate Out Type</th>
                                                <th scope="col">ODC Status</th>
                                                <th scope="col">Low Bed</th>
                                                <th scope="col">Weightment Wt</th>
                                                <th scope="col">Weightment Cargo Wt</th>
                                                <th scope="col">Scan Status</th>
                                                <th scope="col">Status</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{ fontWeight: 800 }}>Total</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td style={{ fontWeight: 800 }}>{cfigmcnList.reduce((total, item) => total + item.noOfPackages, 0)}</td>
                                                <td style={{ fontWeight: 800 }}>{cfigmcnList.reduce((total, item) => total + item.grossWt, 0)}</td>
                                                <td style={{ fontWeight: 800 }}>{cfigmcnList.reduce((total, item) => total + item.cargoWt, 0)}</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td style={{ fontWeight: 800 }}>{cfigmcnList.reduce((total, item) => total + item.containerWeight, 0)}</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            {cfigmcnList.map((item, index) => (
                                                <tr key={index}>
                                                    <td className='text-center'>
                                                        <Col>
                                                            {/* <Input
                                                            className="form-control radios"
                                                            type="checkbox"
                                                            id={`sealCuttingStatus${index}`} // Ensure unique ID
                                                            checked={item.sealCuttingStatus === 'Y' ? true : false}
                                                            style={{ height: 25, width: 15 }}
                                                            name='sealCuttingStatus'
                                                            onChange={(e) => handleIgmCrgChange(e, index)}
                                                        /> */}

                                                            <Input
                                                                type="checkbox"
                                                                className="form-check-Input radios"
                                                                style={{ width: 25, height: 25 }}
                                                                name='sealCuttingStatus'
                                                                disabled={item.sealCutWoTransId != '' || item.holdStatus === 'H'}
                                                                id={`sealCuttingStatus${index}`}
                                                                onChange={(e) => handleIgmCrgChange(e, index)}
                                                                checked={item.sealCuttingStatus === 'Y' ? true : false}
                                                            />
                                                        </Col>
                                                    </td>
                                                    <td>{index + 1}</td>
                                                    <td>{item.sealCutWoTransId}</td>
                                                    <td>
                                                        <div style={{ position: 'relative', width: 170 }}>
                                                            <DatePicker
                                                                selected={item.sealCutWoTransDate}
                                                                id='gateInDate'
                                                                name='gateInDate'
                                                                disabled
                                                                dateFormat="dd/MM/yyyy HH:mm"
                                                                className="form-control border-right-0 InputField"
                                                                customInput={<Input style={{ width: '100%' }} />}
                                                                wrapperClassName="custom-react-datepicker-wrapper"
                                                            />
                                                            <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {item.containerNo}
                                                        {item.holdStatus === 'H' ? <><br /><span style={{ color: 'red' }}>Container is hold</span></> : ''}
                                                    </td>

                                                    <td>{item.containerSize}/{item.containerType}</td>
                                                    <td>{item.containerSealNo}</td>
                                                    <td>
                                                        <div style={{ position: 'relative', width: 170 }}>
                                                            <DatePicker
                                                                selected={item.gateInDate}
                                                                id='gateInDate'
                                                                name='gateInDate'
                                                                disabled
                                                                dateFormat="dd/MM/yyyy HH:mm"
                                                                className="form-control border-right-0 InputField"
                                                                customInput={<Input style={{ width: '100%' }} />}
                                                                wrapperClassName="custom-react-datepicker-wrapper"
                                                            />
                                                            <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div style={{ position: 'relative', width: 170 }}>
                                                            <DatePicker
                                                                selected={item.sealCutReqDate}
                                                                id='sealCutReqDate'
                                                                onChange={(date) => setCfigmcnList(prevState => {
                                                                    const updatedData = [...prevState];
                                                                    updatedData[index] = {
                                                                        ...updatedData[index],
                                                                        'sealCutReqDate': date
                                                                    };
                                                                    return updatedData;
                                                                })}
                                                                portalId="datepicker-portal1" // Ensure it renders outside the table
                                                                popperClassName="custom-react-datepicker-popper"
                                                                name='sealCutReqDate'
                                                                disabled={item.sealCutWoTransId != ''}
                                                                dateFormat="dd/MM/yyyy HH:mm"
                                                                className={`form-control ${errors[index]?.sealCutReqDate ? 'error-border' : ''}`}
                                                                wrapperClassName="custom-react-datepicker-wrapper"
                                                                customInput={
                                                                    <input
                                                                        style={{
                                                                            height: "38px",
                                                                            width: "100%",
                                                                        }}
                                                                    />
                                                                }
                                                            />

                                                        </div>
                                                    </td>
                                                    <td>{item.noOfPackages}</td>
                                                    <td>{item.grossWt}</td>
                                                    <td>{item.cargoWt}</td>
                                                    <td>
                                                        <Col style={{ height: 25, width: 150 }}>
                                                            <Input
                                                                className={`form-control ${errors[index]?.gateOutType ? 'error-border' : ''}`}
                                                                type="select"
                                                                id={`gateOutType${index}`}
                                                                name='gateOutType'
                                                                value={item.gateOutType}
                                                                disabled={item.sealCutWoTransId != ''}
                                                                onChange={(e) => updateCfigmcn(e, index)}

                                                            >
                                                                <option value=""></option>
                                                                <option value="CON">Loaded</option>
                                                                <option value="CRG">Destuff</option>


                                                            </Input>
                                                        </Col>
                                                    </td>
                                                    <td>{item.odcStatus === 'Y' ? 'Y' : 'N'}</td>
                                                    <td>{item.lowBed === 'Y' ? 'Y' : 'N'}</td>
                                                    <td>{item.weighmentWt}</td>
                                                    <td>{item.containerWeight}</td>
                                                    <td>{item.scanningDoneStatus === 'Y' ? 'Y' : 'N'}</td>
                                                    <td>{item.sealCutTransId === 'A' ? 'Approved' : ''}</td>
                                                </tr>
                                            ))

                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}


                    </>
                )}


                {selectSealCuttingType === 'containerwise' && (
                    <>

                        <Modal Modal isOpen={isModalOpenForCha} onClose={closeModalForCha1} toggle={closeModalForCha1} style={{ maxWidth: '800px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                            <ModalHeader toggle={closeModalForCha1} style={{
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
                                /> Search CHA</h5>



                            </ModalHeader>
                            <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                                <Row>
                                    <Col md={5}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Search By CHA name
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="fobValueInDollar"
                                                value={searchCha}
                                                onChange={(e) => setsearchCha(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6} style={{ marginTop: 25 }}>
                                        <button
                                            className="btn btn-outline-primary btn-margin newButton"
                                            style={{ marginRight: 10 }}

                                            id="submitbtn2"
                                            onClick={() => { searchChaData(searchCha); setCurrentPage2(1); }}
                                        >
                                            <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                            Search
                                        </button>
                                        <button
                                            className="btn btn-outline-danger btn-margin newButton"
                                            id="submitbtn2"
                                            onClick={() => { clearCha() }}
                                        >
                                            <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                            Reset
                                        </button>
                                    </Col>

                                </Row>
                                <hr />
                                <div className="mt-1 table-responsive ">
                                    <table className="table table-bordered table-hover tableHeader">
                                        <thead className='tableHeader'>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Party Id</th>
                                                <th scope="col">Party Name</th>
                                                <th scope="col">Customer Code</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><input type="radio" onChange={() => selectCha1('', '', ind)} name="radioGroup" value="" /></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            {currentItems2.map((item, index) => (
                                                <tr key={index}>
                                                    <td><input type="radio" name="radioGroup" onChange={() => selectCha1(item[2], item[1], ind)} value="" /></td>
                                                    <td>{item[0]}</td>
                                                    <td>{item[1]}</td>
                                                    <td>{item[2]}</td>
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

                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    IGM No
                                </label>
                                <Input
                                    className="form-control"
                                    type="text"
                                    id="fobValueInDollar"
                                    value={searchIgmId}
                                    onChange={(e) => setSearchIgmId(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Container No
                                </label>
                                {(igm && !item && !cont) ? (
                                    <Input
                                        className="form-control"
                                        type="select"
                                        id="fobValueInDollar"
                                        value={searchContainerId}
                                        onChange={(e) => setSearchContainerId(e.target.value)}
                                    >
                                        <option value="">Select Container</option>
                                        {conSearchList.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}

                                    </Input>
                                )
                                    :
                                    (
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="fobValueInDollar"
                                            value={searchContainerId}
                                            onChange={(e) => setSearchContainerId(e.target.value)}
                                        />
                                    )}

                            </FormGroup>
                        </Col>
                        <Col md={3} style={{ marginTop: 25 }}>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={() => getContainerWiseData(searchIgmId, searchContainerId)}
                            >
                                <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                Search
                            </button>
                        </Col>

                        {containerWiseData.containerTransId !== '' && (
                            <>
                                <hr />
                                <Row>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Shipping Line
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="partyName"
                                                name='partyName'
                                                value={containerWiseData.partyName}
                                                onChange={handleContainerChange}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Via No
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="viaNo"
                                                name='viaNo'
                                                value={containerWiseData.viaNo}
                                                onChange={handleContainerChange}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Mobile No
                                            </label>
                                            <Input
                                                className={`form-control ${(!validateMobileNumber(containerWiseData.mobileNo) && containerWiseData.mobileNo !== '') ? 'error-border' : ''} `}
                                                type="text"
                                                id="mobileNo"
                                                name='mobileNo'
                                                maxLength={10}
                                                value={containerWiseData.mobileNo}
                                                onChange={handleContainerChange}
                                            />
                                            {(!validateMobileNumber(containerWiseData.mobileNo) && containerWiseData.mobileNo !== '') && (
                                                <div style={{ color: 'red' }} className="error-message">Invalid Mobile No</div>
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Gate Out Type
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="select"
                                                id="gateOutType"
                                                name='gateOutType'
                                                value={containerWiseData.gateOutType}
                                                onChange={handleContainerChange}
                                            >
                                                <option value="NA"></option>
                                                <option value="CON">Loaded</option>
                                                <option value="CRG">Destuff</option>

                                            </Input>
                                        </FormGroup>
                                    </Col>


                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Size/Type
                                            </label>
                                            <Row>
                                                <Col md={6}>
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        id="containerSize"
                                                        name='containerSize'
                                                        value={containerWiseData.containerSize}
                                                        onChange={handleContainerChange}
                                                        disabled
                                                    />
                                                </Col>
                                                <Col md={6}>
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        id="containerType"
                                                        name='containerType'
                                                        value={containerWiseData.containerType}
                                                        onChange={handleContainerChange}
                                                        disabled
                                                    />
                                                </Col>
                                            </Row>
                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                SealCutting Status
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="status"
                                                name='status'
                                                value={containerWiseData.status === 'N' ? 'No' : containerWiseData.status === 'Y' ? 'Yes' : containerWiseData.status}
                                                onChange={handleContainerChange}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Gross Wt
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="grossWt"
                                                name='grossWt'
                                                value={containerWiseData.grossWt}
                                                onChange={handleContainerChange}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Gate In Date
                                            </label>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={containerWiseData.gateInDate}
                                                    id='gateInDate'
                                                    name='gateInDate'
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
                                                SealCutting Date
                                            </label>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={containerWiseData.sealCutWoTransDate}
                                                    id='sealCutWoTransDate'
                                                    onChange={(date) => setcontainerWiseData(prevState => ({
                                                        ...prevState,
                                                        sealCutWoTransDate: date
                                                    }))}
                                                    maxDate={new Date()}
                                                    name='sealCutWoTransDate'
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
                                                Weightment Wt
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="weighmentWeight"
                                                name='weighmentWeight'
                                                value={containerWiseData.weighmentWeight}
                                                onChange={handleContainerChange}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Seal Cutting Type
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="select"
                                                id="sealCuttingType"
                                                name='sealCuttingType'
                                                value={containerWiseData.sealCuttingType}
                                                onChange={handleContainerChange}
                                            >
                                                <option value="General" selected>General</option>

                                                <option value="SEZ">SEZ</option>

                                                <option value="RMS">RMS</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Agent Seal No
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="customsSealNo"
                                                name='customsSealNo'
                                                value={containerWiseData.customsSealNo}
                                                onChange={handleContainerChange}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Job Order
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="sealCutWoTransId"
                                                name='sealCutWoTransId'
                                                value={containerWiseData.sealCutWoTransId}
                                                onChange={handleContainerChange}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Cycle Type
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="cycle"
                                                name='cycle'
                                                value={containerWiseData.cycle}
                                                onChange={handleContainerChange}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Vehicle Type
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="select"
                                                id="vehicleType"
                                                name='vehicleType'
                                                value={containerWiseData.vehicleType}
                                                onChange={handleContainerChange}
                                            >


                                                <option value="Normal">Normal</option>

                                                <option value="Lowbed">Low Bed</option>

                                                <option value="Slowbed">Semi Low Bed</option>

                                                <option value="Genset">Gen Set</option>
                                            </Input>

                                        </FormGroup>
                                    </Col>





                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                IGM Total PKG
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="fobValueInDollar"
                                                value={cargoMultipleDta.reduce((total, item) => total + item.noOfPackages, 0)}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                IGM Total Weight
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="fobValueInDollar"
                                                value={cargoMultipleDta.reduce((total, item) => total + item.grossWeight, 0)}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Notify Party Name
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="notifyPartyName"
                                                name='notifyPartyName'
                                                value={containerWiseData.notifyPartyName}
                                                onChange={handleContainerChange}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Scan Status
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="scanningDoneStatus"
                                                name='scanningDoneStatus'
                                                value={containerWiseData.scanningDoneStatus}
                                                onChange={handleContainerChange}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                ODC Status
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="checkbox"
                                                id="odcStatus"
                                                name='odcStatus'
                                                checked={containerWiseData.odcStatus === 'Y' ? true : false}
                                                style={{ height: 25 }}
                                                onChange={handleContainerCheckChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Low Bed
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="checkbox"
                                                id="lowBed"
                                                name='lowBed'
                                                checked={containerWiseData.lowBed === 'Y' ? true : false}
                                                style={{ height: 25 }}
                                                onChange={handleContainerCheckChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Remarks
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="textarea"
                                                id="sealCutRemarks"
                                                name='sealCutRemarks'
                                                value={containerWiseData.sealCutRemarks}
                                                onChange={handleContainerChange}
                                                maxLength={150}
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
                                            onClick={saveContainerWiseSealCutting}
                                            disabled={containerWiseData.sealCutWoTransId != ''}
                                        >
                                            <FontAwesomeIcon icon={faSave} style={{ marginRight: 5 }} />
                                            Save

                                        </button>
                                        <button
                                            className="btn btn-outline-danger btn-margin newButton"
                                            style={{ marginRight: 10 }}
                                            id="submitbtn2"
                                            onClick={handleContainerClear}

                                        >
                                            <FontAwesomeIcon icon={faRefresh} style={{ marginRight: 5 }} />
                                            Clear
                                        </button>
                                        <button
                                            className="btn btn-outline-success btn-margin newButton"
                                            style={{ marginRight: 10 }}
                                            id="submitbtn2"
                                            onClick={downloadConWiseReport}
                                            disabled={containerWiseData.sealCutWoTransId === ''}
                                        >
                                            <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
                                            Print Report
                                        </button>
                                    </Col>
                                </Row>
                                <div id="datepicker-portal2"></div>
                                <div className="mt-3 table-responsive">
                                    <table className="table table-bordered table-hover tableHeader">
                                        <thead className="tableHeader">
                                            <tr>
                                                <th scope="col">Sr No</th>
                                                <th scope="col">Item No</th>
                                                <th scope="col">Importer Name</th>
                                                <th scope="col">BL No</th>
                                                <th scope="col">BL Date</th>
                                                <th scope="col">Pkgs</th>
                                                <th scope="col">Cargo Wt</th>
                                                <th scope="col">BE No <span style={{ color: 'red' }}>*</span></th>
                                                <th scope="col">BE Date <span style={{ color: 'red' }}>*</span></th>
                                                <th scope="col">Cargo value <span style={{ color: 'red' }}>*</span></th>
                                                <th scope="col">Cargo Duty <span style={{ color: 'red' }}>*</span></th>
                                                <th scope="col">BL Type</th>
                                                <th scope="col">Commodity</th>
                                                <th scope="col">CHA Code</th>
                                                <th scope="col">CHA</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{ fontWeight: 800 }}>Total</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td style={{ fontWeight: 800 }}>{cargoMultipleDta.reduce((total, item) => total + item.noOfPackages, 0)}</td>
                                                <td style={{ fontWeight: 800 }}>{cargoMultipleDta.reduce((total, item) => total + item.grossWeight, 0)}</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            {cargoMultipleDta.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.igmLineNo}</td>
                                                    <td>{item.importerName}</td>
                                                    <td>{item.blNo}</td>
                                                    <td>
                                                        <div style={{ position: 'relative' }}>
                                                            <DatePicker
                                                                selected={item.blDate}
                                                                id={`blDate${index}`}
                                                                name='blDate'
                                                                disabled

                                                                dateFormat="dd/MM/yyyy"
                                                                className="form-control border-right-0 InputField"
                                                                customInput={<Input style={{ width: 150 }} />}
                                                                wrapperClassName="custom-react-datepicker-wrapper"
                                                            />
                                                            <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                                        </div>
                                                    </td>
                                                    <td>{item.noOfPackages}</td>
                                                    <td>{item.grossWeight}</td>
                                                    <td>
                                                        <Input
                                                            className={`form-control ${formErrors1[index]?.beNo ? 'error-border' : ''}`}
                                                            type="text"
                                                            style={{ width: 150 }}
                                                            name='beNo'
                                                            id={`beNo${index}`}
                                                            onChange={(e) => handleChangeCargo(e, index)}
                                                            value={item.beNo}
                                                            maxLength={15}
                                                        />
                                                    </td>
                                                    <td>
                                                        <div style={{ position: 'relative' }}>
                                                            <DatePicker
                                                                selected={item.beDate}
                                                                id={`beDate${index}`}
                                                                onChange={(date) => handleBEDateChange(date, index)}
                                                                name='beDate'
                                                                portalId="datepicker-portal2"
                                                                dateFormat="dd/MM/yyyy"
                                                                className={`form-control border-right-0 InputField ${formErrors1[index]?.beDate ? 'error-border' : ''}`}
                                                                customInput={<Input style={{ width: 150 }} />}
                                                                wrapperClassName="custom-react-datepicker-wrapper"
                                                            />

                                                            <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Input
                                                            className={`form-control ${formErrors1[index]?.cargoValue ? 'error-border' : ''}`}
                                                            type="text"
                                                            style={{ width: 150 }}
                                                            name='cargoValue'
                                                            id={`cargoValue${index}`}
                                                            onChange={(e) => handleChangeCargo(e, index)}
                                                            value={item.cargoValue}
                                                            maxLength={16}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Input
                                                            className={`form-control ${formErrors1[index]?.cargoDuty ? 'error-border' : ''}`}
                                                            type="text"
                                                            style={{ width: 150 }}
                                                            name='cargoDuty'
                                                            id={`cargoDuty${index}`}
                                                            onChange={(e) => handleChangeCargo(e, index)}
                                                            value={item.cargoDuty}
                                                            maxLength={16}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Input
                                                            className="form-control"
                                                            type="select"
                                                            style={{ width: 180 }}
                                                            id={`blType${index}`}
                                                            onChange={(e) => handleChangeCargo(e, index)}
                                                            value={item.blType}
                                                            name='blType'
                                                        >
                                                            <option value="ORIGIN">Original</option>
                                                            <option value="NEGOTI">Negotiable</option>
                                                            <option value="DO">DO</option>
                                                        </Input>
                                                    </td>
                                                    <td>{item.commodityDescription}</td>
                                                    <td >
                                                        {/* <Row style={{ width: 220 }}>
                                                            <Col md={8}>
                                                                <FormGroup>
                                                                    <Input
                                                                        className={`form-control ${formErrors1[index]?.chaCode ? 'error-border' : ''}`}
                                                                        type="text"
                                                                        id={`chaCode${index}`}
                                                                        onChange={(e) => handleChangeCargo(e, index)}
                                                                        value={item.chaCode}
                                                                        name='chaCode'
                                                                        style={{ width: 140 }}
                                                                        disabled
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={4}>
                                                                <button
                                                                    className="btn btn-outline-primary btn-margin newButton"
                                                                    id="submitbtn2"
                                                                    onClick={() => openModalForCha1(index)}
                                                                >
                                                                    <FontAwesomeIcon icon={faSearch} />
                                                                </button>
                                                            </Col>
                                                        </Row> */}
                                                        <Select

                                                            value={{ value: item.chaCode, label: item.chaCode }}
                                                            onChange={(option, actionMeta) => handleChaSelect1(option, actionMeta, index)}
                                                            onInputChange={handleCHAList}
                                                            options={chaList}
                                                            placeholder="Select CHA"
                                                            isClearable
                                                            id={`chaCode${index}`}
                                                            name="chaCode"
                                                            className={`${formErrors1[index]?.chaCode ? 'error-border' : ''} autocompleteHeight}`}
                                                            components={{ Option: CustomOption }}
                                                            styles={{
                                                                control: (provided, state) => ({
                                                                    ...provided,
                                                                    height: 32, // Set height
                                                                    minHeight: 32, // Set minimum height
                                                                    border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
                                                                    boxShadow: "none",
                                                                    width: 170,
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
                                                    </td>
                                                    <td>
                                                        <Input
                                                            className="form-control"
                                                            type="textarea"
                                                            id={`chaName${index}`}
                                                            onChange={(e) => handleChangeCargo(e, index)}
                                                            value={item.chaName}
                                                            name='chaName'
                                                            style={{ width: 160 }}
                                                            disabled
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}

                    </>
                )}
            </Row>

        </div>



    )
}
