
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
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faCalendarAlt, faAdd, faCancel, faXmark, faArrowDown, faPlus, faArrowUp, faEdit, faA, faPrint } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import useAxios from '../Components/useAxios';
import { dark } from '@mui/material/styles/createPalette';
import { toast } from 'react-toastify';


export default function Examination({ igm, item, cont, sealStatus, process, onRequest }) {
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
        { label: 'ItemWise', value: 'itemwise' },
        { label: 'Containerwise', value: 'containerwise' }
    ]);
    const [selectSealCuttingType, setSelectSealCuttingType] = useState('');

    const [igmSearchList, setigmSearchList] = useState([]);

    const getItems = (igm) => {
        axios.get(`${ipaddress}cfigm/getItemsList1?cid=${companyid}&bid=${branchId}&igm=${igm}`, {
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
        axios.get(`${ipaddress}cfigm/getContainerList1?cid=${companyid}&bid=${branchId}&igm=${igm}`, {
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

    const handleSealCuttingChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setSelectSealCuttingType('');
        }
        else {


            setSelectSealCuttingType(selectedOption ? selectedOption.value : '')
        }
    };
    useEffect(() => {
        if (sealStatus !== '' && process === 'P00205') {
            setSelectSealCuttingType(sealStatus);

            if (sealStatus === 'itemwise') {
                getData(igm, item)
                setIgmId(igm);
                setItemId(item);
            }
            else {
                setSearchIgmId(igm);
                setSearchContainerId(cont);
                getContainerWiseData(igm, cont);
            }
        }
        else if (sealStatus === '' && process === 'P00205') {
            setSelectSealCuttingType('itemwise');
            setIgmId(igm);
            getItems(igm);
            getCons(igm);
            setSearchIgmId(igm);
        }
    }, [igm, item, cont, sealStatus, process])

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
        notifyPartyName: '',
        examinationRemarks: ''
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
        gateOutType: 'CON',
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
        holdStatus: '',
        containerExamWoTransId: '',
        containerExamWoTransDate: null,
        containerExamDate: new Date(),
        examinedPackages: '0',
        packagesDeStuffed: 0,
        packagesStuffed: 0,
        typeOfContainer: 'General',
        containerExamRemarks: '',
        specialDelivery: 'NA',
        scannerType: ''
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
        if (['cargoValue', 'cargoDuty', 'beWt', 'mobileNo', 'packagesDeStuffed', 'packagesStuffed'].includes(name)) {
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

        axios.get(`${ipaddress}cfigm/getDataForExamination?cid=${companyid}&bid=${branchId}&igm=${igmid}&line=${itemid}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
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
                    blDate: data.crg.blDate === null ? null : new Date(data.crg.blDate) || null,
                    importerName: data.crg.importerName || '',
                    commodityDescription: data.crg.commodityDescription || '',
                    cargoValue: data.crg.cargoValue || 0,
                    cargoDuty: data.crg.cargoDuty || 0,
                    beNo: data.crg.beNo || '',
                    beDate: data.crg.beDate === null ? null : new Date(data.crg.beDate) || null,
                    chaCode: data.crg.chaCode || '',
                    chaName: data.crg.chaName || '',
                    mobileNo: data.crg.mobileNo || '',
                    sealCuttingType: data.crg.sealCuttingType || 'General',
                    sealCuttingRemarks: data.crg.sealCuttingRemarks || '',
                    blType: data.crg.blType || 'ORIGIN',
                    beWt: data.crg.beWt || 0,
                    notifyPartyName: data.crg.notifyPartyName || '',
                    examinationRemarks: data.crg.examinationRemarks || ''

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
                    sealCutReqDate: item.sealCutReqDate === null ? null : new Date(item.sealCutReqDate) || new Date(),
                    gateInDate: item.gateInDate === null ? null : new Date(item.gateInDate) || null,
                    gateOutType: item.gateOutType || 'CON',
                    cargoWt: item.cargoWt || 0,
                    grossWt: item.grossWt || 0,
                    noOfPackages: item.noOfPackages || 0,
                    scanningDoneStatus: item.scanningDoneStatus || '',
                    sealCutWoTransId: item.sealCutWoTransId || '',
                    sealCutWoTransDate: item.sealCutWoTransDate === null ? null : new Date(item.sealCutWoTransDate) || null,
                    weighmentWt: item.weighmentWt || 0,
                    odcStatus: item.odcStatus || ' ',
                    lowBed: item.lowBed || ' ',
                    sealCuttingStatus: item.sealCuttingStatus || 'N',
                    holdStatus: item.holdStatus || '',
                    containerExamWoTransId: item.containerExamWoTransId || '',
                    containerExamWoTransDate: item.containerExamWoTransDate === null ? null : new Date(item.containerExamWoTransDate) || null,
                    containerExamDate: item.containerExamDate === null ? null : new Date(item.containerExamDate) || new Date(),
                    examinedPackages: item.examinedPackages || '0',
                    packagesDeStuffed: item.packagesDeStuffed || 0,
                    packagesStuffed: item.packagesStuffed || 0,
                    typeOfContainer: item.typeOfContainer || 'General',
                    containerExamRemarks: item.containerExamRemarks || '',
                    specialDelivery: item.specialDelivery || 'NA',
                    scannerType: item.scannerType || ''
                })));
                setItemDoDate(data.doDate === null ? null : new Date(data.doDate));
                setItemDoNo(data.doNo);
                setItemDoValidityDate(data.doValidityDate === null ? null : new Date(data.doValidityDate))
                setItemOocDate(data.oocDate === null ? null : new Date(data.oocDate));
                setItemOocno(data.oocNo);

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
        if (igm && !item && !cont) {
            setIgmId(igm);
        }
        else {
            setIgmId('');
        }
        setItemDoDate(null);
        setItemDoNo('');
        setItemDoValidityDate(null);
        setItemOocDate(null);
        setItemOocno('');
        setFormErrors({
            beNo: "",
            beDate: "",
            chaCode: "",
            cargoValue: "",
            cargoDuty: ""
        })
        setErrors([]);
        setSelectJobOrder('');
        //   setIgmId('');
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
            gateOutType: 'CON',
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
            holdStatus: '',
            containerExamWoTransId: '',
            containerExamWoTransDate: null,
            containerExamDate: new Date(),
            examinedPackages: '0',
            packagesDeStuffed: 0,
            packagesStuffed: 0,
            typeOfContainer: 'General',
            containerExamRemarks: '',
            specialDelivery: 'NA',
            scannerType: ''
        }]);

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
            notifyPartyName: '',
            examinationRemarks: ''
        })
    }
    const [formErrors, setFormErrors] = useState({
        beNo: "",
        beDate: "",
        chaCode: "",
        cargoValue: "",
        cargoDuty: ""
    })

    const [itemOocNo, setItemOocno] = useState('');
    const [itemOocDate, setItemOocDate] = useState(null);
    const [itemDoNo, setItemDoNo] = useState('')
    const [itemDoDate, setItemDoDate] = useState(null)
    const [itemDoValidityDate, setItemDoValidityDate] = useState(null)



    const validateMobileNumber = (number) => {
        // Regular expression for a 10-digit mobile number
        const regex = /^\d{10}$/;
        return regex.test(number);
    }

    const [errors, setErrors] = useState([]);

    const handleSave = () => {
        setLoading(true);


        const checkSealCutting = cfigmcnList.some(item => item.holdStatus === 'H');
        if (checkSealCutting) {
            toast.error("Records Cannot be Saved due to Conatiner is in hold status.", {
                autoClose: 1000
            })
            setLoading(false);
            return;
        }

        const formData = {
            crg: cfigmcrg,
            cn: cfigmcnList,
            doNo: itemDoNo,
            oocNo: itemOocNo,
            oocDate: itemOocDate,
            doDate: itemDoDate,
            doValidityDate: itemDoValidityDate
        }

        axios.post(`${ipaddress}cfigm/saveExamination?cid=${companyid}&bid=${branchId}&user=${userId}`, formData, {
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
                    blDate: data.crg.blDate === null ? null : new Date(data.crg.blDate) || null,
                    importerName: data.crg.importerName || '',
                    commodityDescription: data.crg.commodityDescription || '',
                    cargoValue: data.crg.cargoValue || 0,
                    cargoDuty: data.crg.cargoDuty || 0,
                    beNo: data.crg.beNo || '',
                    beDate: data.crg.beDate === null ? null : new Date(data.crg.beDate) || null,
                    chaCode: data.crg.chaCode || '',
                    chaName: data.crg.chaName || '',
                    mobileNo: data.crg.mobileNo || '',
                    sealCuttingType: data.crg.sealCuttingType || 'General',
                    sealCuttingRemarks: data.crg.sealCuttingRemarks || '',
                    blType: data.crg.blType || 'ORIGIN',
                    beWt: data.crg.beWt || 0,
                    notifyPartyName: data.crg.notifyPartyName || '',
                    examinationRemarks: data.crg.examinationRemarks || ''
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
                    sealCutReqDate: item.sealCutReqDate === null ? null : new Date(item.sealCutReqDate) || new Date(),
                    gateInDate: item.gateInDate === null ? null : new Date(item.gateInDate) || null,
                    gateOutType: item.gateOutType || 'CON',
                    cargoWt: item.cargoWt || 0,
                    grossWt: item.grossWt || 0,
                    noOfPackages: item.noOfPackages || 0,
                    scanningDoneStatus: item.scanningDoneStatus || '',
                    sealCutWoTransId: item.sealCutWoTransId || '',
                    sealCutWoTransDate: item.sealCutWoTransDate === null ? null : new Date(item.sealCutWoTransDate) || null,
                    weighmentWt: item.weighmentWt || 0,
                    odcStatus: item.odcStatus || ' ',
                    lowBed: item.lowBed || ' ',
                    sealCuttingStatus: item.sealCuttingStatus || 'N',
                    holdStatus: item.holdStatus || '',
                    containerExamWoTransId: item.containerExamWoTransId || '',
                    containerExamWoTransDate: item.containerExamWoTransDate === null ? null : new Date(item.containerExamWoTransDate) || null,
                    containerExamDate: item.containerExamDate || new Date(),
                    examinedPackages: item.examinedPackages || '0',
                    packagesDeStuffed: item.packagesDeStuffed || 0,
                    packagesStuffed: item.packagesStuffed || 0,
                    typeOfContainer: item.typeOfContainer || 'General',
                    containerExamRemarks: item.containerExamRemarks || '',
                    specialDelivery: item.specialDelivery || 'NA',
                    scannerType: item.scannerType || ''
                })));

                setItemDoDate(data.doDate === null ? null : new Date(data.doDate));
                setItemDoNo(data.doNo);
                setItemDoValidityDate(data.doValidityDate === null ? null : new Date(data.doValidityDate))
                setItemOocDate(data.oocDate === null ? null : new Date(data.oocDate));
                setItemOocno(data.oocNo);

                onRequest();
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })

    }

    const [isModalOpenForWorkOrder, setisModalOpenForWorkOrder] = useState(false);

    const openWorkOrderModal = () => {
        setisModalOpenForWorkOrder(true);
        getVendorAndEquipment();
        getEquipmentData();
    }

    const closeWorkOrderModal = () => {
        setisModalOpenForWorkOrder(false);
        handleEquipmentClear();
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
        gateOutType: 'CON',
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
        status: '',
        noOfPackages: 0,
        containerExamWoTransId: '',
        containerExamWoTransDate: null,
        containerExamDate: new Date(),
        examinedPackages: '0',
        packagesDeStuffed: 0,
        packagesStuffed: 0,
        typeOfContainer: 'General',
        containerExamRemarks: '',
        specialDelivery: 'NA',
        scannerType: '',
        containerExamStatus: ''
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

    const [contOocNo, setContOocno] = useState('');
    const [contOocDate, setContOocDate] = useState(null);
    const [contDoNo, setContDoNo] = useState('')
    const [contDoDate, setContDoDate] = useState(null)
    const [contDoValidityDate, setContDoValidityDate] = useState(null)

    const getContainerWiseData = (igmId, conId) => {
        setLoading(true);
        axios.get(`${ipaddress}cfigm/getSingleContainerForExamination?cid=${companyid}&bid=${branchId}&igm=${igmId}&container=${conId}`, {
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
                    gateOutType: data.singleResult[9] || 'CON',
                    containerSize: data.singleResult[10] || '',
                    containerType: data.singleResult[11] || '',
                    customsSealNo: data.singleResult[12] || '',
                    grossWt: data.singleResult[13] || 0,
                    gateInDate: new Date(data.singleResult[14]) || null,
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
                    containerExamWoTransId: data.singleResult[28] || '',
                    containerExamWoTransDate: data.singleResult[29] === null ? null : new Date(data.singleResult[29]) || null,
                    containerExamDate: data.singleResult[30] === null ? null : new Date(data.singleResult[30]) || new Date(),
                    examinedPackages: data.singleResult[31] || '0',
                    packagesDeStuffed: data.singleResult[32] || 0,
                    packagesStuffed: data.singleResult[33] || 0,
                    typeOfContainer: data.singleResult[34] || 'General',
                    containerExamRemarks: data.singleResult[35] || '',
                    specialDelivery: data.singleResult[36] || 'NA',
                    scannerType: data.singleResult[37] || '',
                    noOfPackages: data.singleResult[38] || '',
                    containerExamStatus: data.singleResult[39] || ''
                });

                setContDoDate(data.singleResult[42] === null ? null : new Date(data.singleResult[42]));
                setContDoNo(data.singleResult[41] || '');
                setContDoValidityDate(data.singleResult[43] === null ? null : new Date(data.singleResult[43]));
                setContOocDate(data.singleResult[45] === null ? null : new Date(data.singleResult[45]));
                setContOocno(data.singleResult[44] || '');

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
        if (igm && !item && !cont) {
            setSearchIgmId(igm);
        }
        else {
            setSearchIgmId('');
        }
        setContDoDate(null);
        setContDoNo('');
        setContDoValidityDate(null);
        setContOocDate(null);
        setContOocno('');
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
            gateOutType: 'CON',
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
            status: '',
            noOfPackages: 0,
            containerExamWoTransId: '',
            containerExamWoTransDate: null,
            containerExamDate: new Date(),
            examinedPackages: '0',
            packagesDeStuffed: 0,
            packagesStuffed: 0,
            typeOfContainer: 'General',
            containerExamRemarks: '',
            specialDelivery: 'NA',
            scannerType: '',
            containerExamStatus: ''
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



        const formData = {
            con: containerWiseData,
            cargo: cargoMultipleDta,
            doNo: contDoNo,
            oocNo: contOocNo,
            oocDate: contOocDate,
            doDate: contDoDate,
            doValidityDate: contDoValidityDate
        }

        console.log('formData ', formData);

        axios.post(`${ipaddress}cfigm/saveContainerWiseExamintion?cid=${companyid}&bid=${branchId}&user=${userId}`, formData, {
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
                    gateOutType: data.singleResult[9] || 'CON',
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
                    containerExamWoTransId: data.singleResult[28] || '',
                    containerExamWoTransDate: data.singleResult[29] === null ? null :  new Date(data.singleResult[29]) || null,
                    containerExamDate: data.singleResult[30] === null ? null : new Date(data.singleResult[30]) || new Date(),
                    examinedPackages: data.singleResult[31] || '0',
                    packagesDeStuffed: data.singleResult[32] || 0,
                    packagesStuffed: data.singleResult[33] || 0,
                    typeOfContainer: data.singleResult[34] || 'General',
                    containerExamRemarks: data.singleResult[35] || '',
                    specialDelivery: data.singleResult[36] || 'NA',
                    scannerType: data.singleResult[37] || '',
                    noOfPackages: data.singleResult[38] || '',
                    containerExamStatus: data.singleResult[39] || ''
                });
                setContDoDate(data.singleResult[42] === null ? null : new Date(data.singleResult[42]) || null);
                setContDoNo(data.singleResult[41] || '');
                setContDoValidityDate(data.singleResult[43] === null ? null : new Date(data.singleResult[43]) || null);
                setContOocDate(data.singleResult[45] === null ? null : new Date(data.singleResult[45]) || null);
                setContOocno(data.singleResult[44] || '');
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

    const [getVendor, setGetVendor] = useState({});
    const [getEquipment, setGetEquipment] = useState([]);

    const getVendorAndEquipment = () => {
        axios.get(`${ipaddress}equipmentActivity/getVendor?cid=${companyid}&bid=${branchId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                console.log('vendor ', response.data);

                setGetVendor(response.data.party);
                setGetEquipment(response.data.jar);
            })
            .catch((error) => {

            })
    }

    const [selectVendor, setSelectVendor] = useState('');
    const [selectEquipmend, setSelectEquipmend] = useState('');

    const [selectedItems, setSelectedItems] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);

    const handleSelectAll = (isChecked) => {
        if (isChecked) {
            // Select all items
            setSelectedItems(cfigmcnList.map(item => item.containerNo));
        } else {
            // Deselect all items
            setSelectedItems([]);
        }
        setIsAllSelected(isChecked);
    };

    const handleCheckboxChange = (itemId, isChecked) => {
        setSelectedItems(prevSelectedItems => {
            let updatedSelectedItems;
            if (isChecked) {
                updatedSelectedItems = [...prevSelectedItems, itemId];
            } else {
                updatedSelectedItems = prevSelectedItems.filter(id => id !== itemId);
            }
            // Check if all items are selected to update the header checkbox state
            const allSelected = cfigmcnList.every(item => updatedSelectedItems.includes(item.containerNo));
            setIsAllSelected(allSelected);
            return updatedSelectedItems;
        });
    };

    const handleSaveEquipment = (ven, equi) => {
        setLoading(true);
        if (!ven) {
            toast.error("Please select vendor", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }

        if (!equi) {
            toast.error("Please select equipment", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }

        if (selectedItems.length === 0) {
            toast.error("Please at least select one checkbox", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }

        console.log('selectedItems ', selectedItems);


        const params = new URLSearchParams({
            cid: companyid,
            bid: branchId,
            user: userId,
            equipment: equi,
            vendor: ven,
            igm: cfigmcrg.igmNo,
            igmLine: cfigmcrg.igmLineNo,
            igmTransId: cfigmcrg.igmTransId,
            finYear: new Date().getFullYear(),
        }).toString();

        // Send the POST request with query parameters and body
        axios.post(`${ipaddress}equipmentActivity/saveEquipment?${params}`, selectedItems, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'application/json' // Ensure the content type is set to JSON
            }
        })
            .then((response) => {
                toast.success(response.data, {
                    autoClose: 800
                })
                setLoading(false);
                getEquipmentData();
                handleEquipmentClear();
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })
    }

    const handleEquipmentClear = () => {
        setSelectVendor('');
        setSelectEquipmend('');
        setSelectedItems([]);
        setIsAllSelected(false);
    }

    const [equipmentData, setEquipmentData] = useState([]);

    const getEquipmentData = () => {
        const params = new URLSearchParams({
            cid: companyid,
            bid: branchId,
            igm: cfigmcrg.igmNo,
            igmLine: cfigmcrg.igmLineNo,
            igmTransId: cfigmcrg.igmTransId,
        }).toString();
        axios.get(`${ipaddress}equipmentActivity/getData?${params}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setEquipmentData(response.data);
            })
            .catch((error) => {

            })
    }


    const deleteEquipments = (equi, ven) => {
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
                const params = new URLSearchParams({
                    cid: companyid,
                    bid: branchId,
                    user: userId,
                    igm: cfigmcrg.igmNo,
                    igmLine: cfigmcrg.igmLineNo,
                    igmTransId: cfigmcrg.igmTransId,
                    equipment: equi,
                    vendor: ven
                }).toString();
                axios.post(`${ipaddress}equipmentActivity/deleteEquipments?${params}`, null, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                })
                    .then((response) => {
                        toast.error(response.data, {
                            autoClose: 800
                        })
                        getEquipmentData();
                    })
                    .catch((error) => {
                        toast.error(error.response.data, {
                            autoClose: 800
                        })
                    })

            }
        });
    }

    const [tooltip, setTooltip] = useState({ visible: false, content: '' });
    const handleMouseEnter = (content) => {
        setTooltip({ visible: true, content });
    };

    const handleMouseLeave = () => {
        setTooltip({ visible: false, content: '' });
    };


    const [isModalOpenForCotainerWorkOrder, setisModalOpenForCotainerWorkOrder] = useState(false);

    const openContainerWiseModal = () => {
        setisModalOpenForCotainerWorkOrder(true);
        getVendorAndEquipment();
        getContainerWiseEquipmentData();
    }

    const closeContainerWiseModal = () => {
        setisModalOpenForCotainerWorkOrder(false);
        handleContainerEquipmentClear('');
    }

    const handleContainerEquipmentClear = () => {
        setSelectVendor('');
        setSelectEquipmend('');

    }

    const [conEquipmentData, setConEquipmentData] = useState([]);

    const getContainerWiseEquipmentData = () => {
        const params = new URLSearchParams({
            cid: companyid,
            bid: branchId,
            igm: containerWiseData.igmNo,
            igmLine: containerWiseData.igmLineNo,
            igmTransId: containerWiseData.igmTransId,
            container: containerWiseData.containerNo
        }).toString();
        axios.get(`${ipaddress}equipmentActivity/getContainerData?${params}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setConEquipmentData(response.data);
            })
            .catch((error) => {

            })
    }


    const handleContainerSaveEquipment = (ven, equi) => {
        setLoading(true);
        if (!ven) {
            toast.error("Please select vendor", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }

        if (!equi) {
            toast.error("Please select equipment", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }


        const params = new URLSearchParams({
            cid: companyid,
            bid: branchId,
            user: userId,
            equipment: equi,
            vendor: ven,
            igm: containerWiseData.igmNo,
            igmLine: containerWiseData.igmLineNo,
            igmTransId: containerWiseData.igmTransId,
            finYear: new Date().getFullYear(),
            container: containerWiseData.containerNo
        }).toString();

        // Send the POST request with query parameters and body
        axios.post(`${ipaddress}equipmentActivity/saveContainerEquipment?${params}`, null, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'application/json' // Ensure the content type is set to JSON
            }
        })
            .then((response) => {
                toast.success(response.data, {
                    autoClose: 800
                })
                setLoading(false);
                getContainerWiseEquipmentData();
                handleContainerEquipmentClear();
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })
    }

    const deleteContainerEquipments = (equi, ven) => {
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
                const params = new URLSearchParams({
                    cid: companyid,
                    bid: branchId,
                    user: userId,
                    igm: containerWiseData.igmNo,
                    igmLine: containerWiseData.igmLineNo,
                    igmTransId: containerWiseData.igmTransId,
                    equipment: equi,
                    vendor: ven,
                    container: containerWiseData.containerNo
                }).toString();
                axios.post(`${ipaddress}equipmentActivity/deleteContainerEquipments?${params}`, null, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                })
                    .then((response) => {
                        toast.error(response.data, {
                            autoClose: 800
                        })
                        getContainerWiseEquipmentData();
                    })
                    .catch((error) => {
                        toast.error(error.response.data, {
                            autoClose: 800
                        })
                    })

            }
        });
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
                `${ipaddress}importReports/importExaminationItemwiseReport?cid=${companyid}&bid=${branchId}&igm=${cfigmcrg.igmNo}&item=${cfigmcrg.igmLineNo}&jobOrder=${selectJobOrder}&trans=${cfigmcrg.igmTransId}`,
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


    const downloadContainerWiseReport = () => {


        setLoading(true);
        axios
            .post(
                `${ipaddress}importReports/importExaminationContainerwiseReport?cid=${companyid}&bid=${branchId}&igm=${containerWiseData.igmNo}&con=${containerWiseData.containerNo}&trans=${containerWiseData.igmTransId}`,
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
                            Container Examination Type
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


                        <Modal Modal isOpen={isModalOpenForWorkOrder} onClose={closeWorkOrderModal} toggle={closeWorkOrderModal} style={{ maxWidth: '900px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                            <ModalHeader toggle={closeWorkOrderModal} style={{
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
                                /> Add Equipment & Generate Work Order</h5>



                            </ModalHeader>
                            <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                                <Row>
                                    <Col md={4}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                IGM Trans Id
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="examinationRemarks"
                                                name='examinationRemarks'
                                                value={cfigmcrg.igmTransId}
                                                disabled
                                            />


                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                IGM No
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="examinationRemarks"
                                                name='examinationRemarks'
                                                value={cfigmcrg.igmNo}
                                                disabled
                                            />


                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Line No
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="examinationRemarks"
                                                name='examinationRemarks'
                                                value={cfigmcrg.igmLineNo}
                                                disabled
                                            />


                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Vendor
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="select"
                                                id="selectVendor"
                                                name='selectVendor'
                                                value={selectVendor}
                                                onChange={(e) => setSelectVendor(e.target.value)}

                                            >
                                                <option value="">Select Vendor</option>

                                                <option value={getVendor.partyId}>{getVendor.partyName}</option>


                                            </Input>


                                        </FormGroup>
                                    </Col>
                                    <Col md={8}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Equipment
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="select"
                                                id="selectEquipmend"
                                                name='selectEquipmend'
                                                value={selectEquipmend}
                                                onChange={(e) => setSelectEquipmend(e.target.value)}

                                            >
                                                <option value="">Select Equipment</option>
                                                {getEquipment.map((item, index) => (
                                                    <option key={index} value={item.jarDtlId}>{item.jarDtlDesc}</option>
                                                ))}

                                            </Input>

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
                                            onClick={() => handleSaveEquipment(selectVendor, selectEquipmend)}
                                        >
                                            <FontAwesomeIcon icon={faSave} style={{ marginRight: 5 }} />
                                            Save

                                        </button>
                                        <button
                                            className="btn btn-outline-danger btn-margin newButton"
                                            style={{ marginRight: 10 }}
                                            id="submitbtn2"
                                            onClick={handleEquipmentClear}

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
                                                <th scope="col">
                                                    <Input
                                                        className="form-control"
                                                        type="checkbox"
                                                        id="selectAll"
                                                        name="selectAll"
                                                        checked={isAllSelected}
                                                        onChange={(e) => handleSelectAll(e.target.checked)}
                                                        style={{ width: 15, height: 25, borderColor: 'black' }}
                                                    />
                                                </th>
                                                <th scope="col">Sr No</th>
                                                <th scope="col">Container No</th>
                                                <th scope="col">Container Size</th>
                                                <th scope="col">Container Type</th>

                                                <th scope="col">Status</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cfigmcnList.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <Input
                                                            className="form-control"
                                                            type="checkbox"
                                                            id={`checkbox-${index}`}
                                                            name={`checkbox-${index}`}
                                                            checked={selectedItems.includes(item.containerNo)}
                                                            onChange={(e) => handleCheckboxChange(item.containerNo, e.target.checked)}
                                                            style={{ width: 15, height: 25, borderColor: 'black' }}
                                                        />
                                                    </td>
                                                    <td>{index + 1}</td>
                                                    <td>{item.containerNo}</td>
                                                    <td>{item.containerSize}</td>
                                                    <td>{item.containerType}</td>

                                                    <td>A</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-3 table-responsive ">
                                    <table className="table table-bordered table-hover tableHeader">
                                        <thead className='tableHeader'>
                                            <tr>

                                                <th scope="col">Sr No</th>
                                                <th scope="col">Equipment</th>
                                                <th scope="col">Vendor</th>
                                                <th scope="col">Count</th>

                                                <th scope="col">Container No</th>
                                                <th scope="col">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {equipmentData.map((item, index) => (
                                                <tr
                                                    key={index}
                                                    onMouseEnter={() => handleMouseEnter(item[5])}
                                                    onMouseLeave={handleMouseLeave}
                                                >
                                                    <td>{index + 1}</td>
                                                    <td>{item[0]}</td>
                                                    <td>{item[1]}</td>
                                                    <td>{item[2]}</td>

                                                    <td>{item[5]}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-outline-danger btn-margin newButton"
                                                            style={{ marginRight: 10 }}
                                                            id="submitbtn2"
                                                            onClick={() => deleteEquipments(item[3], item[4])}

                                                        >
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                    {tooltip.visible && (
                                        <div className="tooltip" style={{ position: 'absolute', top: '50px', left: '50px' }}>
                                            {tooltip.content}
                                        </div>
                                    )}
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
                                                disabled
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
                                                    disabled
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
                                </Row>
                                <Row>
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
                                                value={cfigmcrg.commodityDescription}
                                                onChange={handleChange}
                                                maxLength={15}
                                                disabled
                                            />


                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <Label className="inputHeader">Do No</Label>
                                            <Input
                                                type="text"
                                                name="itemDoNo"
                                                className="form-control inputField"
                                                value={itemDoNo}
                                                id='itemDoNo'
                                                onChange={(e) => setItemDoNo(e.target.value)}
                                                maxLength={30}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <Label className="inputHeader">OOC No</Label>
                                            <Input
                                                type="text"
                                                name="itemOocNo"
                                                className="form-control inputField"
                                                value={itemOocNo}
                                                id='itemOocNo'
                                                onChange={(e) => setItemOocno(e.target.value)}
                                                maxLength={20}
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <Label className="inputHeader">OOC Date</Label>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={itemOocDate}
                                                    onChange={(date) => {
                                                        setItemOocDate(date);

                                                    }}
                                                    id='itemOocDate'
                                                    name='itemOocDate'
                                                    showTimeInput
                                                    dateFormat="dd/MM/yyyy HH:mm"
                                                    className="form-control border-right-0 InputField"
                                                    customInput={<Input style={{ width: '100%' }} />}
                                                    wrapperClassName="custom-react-datepicker-wrapper"
                                                />
                                                <FontAwesomeIcon
                                                    icon={faCalendarAlt}
                                                    style={{
                                                        position: 'absolute',
                                                        right: '10px',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        pointerEvents: 'none',
                                                        color: '#6c757d'
                                                    }}
                                                />
                                            </div>

                                        </FormGroup>

                                    </Col>


                                    <Col md={2}>
                                        <FormGroup>
                                            <Label className="inputHeader">DO Date</Label>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={itemDoDate}
                                                    onChange={(date) => {
                                                        setItemDoDate(date);
                                                        if (date >= itemDoValidityDate) {
                                                            setItemDoValidityDate(null);
                                                        };
                                                    }}
                                                    id='itemDoDate'
                                                    name='itemDoDate'
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
                                            <Label className="inputHeader">DO Validity Date</Label>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={itemDoValidityDate}
                                                    onChange={(date) => {
                                                        setItemDoValidityDate(date);

                                                    }}
                                                    minDate={(() => {
                                                        const date = new Date(itemDoDate);
                                                        date.setDate(date.getDate() + 1);
                                                        return date;
                                                    })()}
                                                    id='doValidityDate'
                                                    name='doValidityDate'

                                                    dateFormat="dd/MM/yyyy"
                                                    className="form-control border-right-0 InputField"
                                                    customInput={<Input style={{ width: '100%' }} />}
                                                    wrapperClassName="custom-react-datepicker-wrapper"
                                                />
                                                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                            </div>

                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Order No
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
                                                        .filter(item => item.containerExamWoTransId && item.containerExamWoTransId.trim() !== '') // Exclude null, undefined, and empty strings
                                                        .map(item => item.containerExamWoTransId) // Extract only sealCutWoTransId
                                                )].map((distinctId, index) => (
                                                    <option key={index} value={distinctId}>
                                                        {distinctId}
                                                    </option>
                                                ))}

                                            </Input>


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
                                                id="examinationRemarks"
                                                name='examinationRemarks'
                                                value={cfigmcrg.examinationRemarks}
                                                onChange={handleChange}
                                                maxLength={150}

                                            />


                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row style={{ marginBottom: 10 }}>
                                    <Col md={4}>
                                        <button
                                            className="btn btn-outline-success btn-margin newButton"
                                            style={{ marginRight: 10 }}
                                            id="submitbtn2"
                                            onClick={openWorkOrderModal}
                                        >
                                            <FontAwesomeIcon icon={faAdd} style={{ marginRight: 5 }} />
                                            Add Equipment & Generate WorkOrder

                                        </button>
                                    </Col>

                                    <Col md={4} className='text-center'>
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
                                <hr />
                                <div className="mt-1 table-responsive ">
                                    <table className="table table-bordered table-hover tableHeader">
                                        <thead className='tableHeader'>
                                            <tr>

                                                <th scope="col">Sr No</th>
                                                <th scope="col">Examination Id</th>
                                                <th scope="col">Examination Date</th>
                                                <th scope="col">Container No</th>
                                                <th scope="col">Size/Type</th>
                                                <th scope="col">Scanner type</th>
                                                <th scope="col">Gate In Date</th>
                                                <th scope="col">Seal Cut Date</th>
                                                <th scope="col">Pkgs</th>
                                                <th scope="col">Gross Wt</th>
                                                <th scope="col">Exam Date</th>
                                                <th scope="col">Exam Percentage</th>
                                                <th scope="col">Pkgs DeStuffed</th>
                                                <th scope="col">Pkgs stuffed</th>
                                                <th scope="col">Type of Container</th>
                                                <th scope="col">Gate Out Type</th>
                                                <th scope="col">Special Delivery</th>
                                                <th scope="col">Remark</th>

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
                                                <td style={{ fontWeight: 800 }}>{cfigmcnList.reduce((total, item) => total + item.noOfPackages, 0)}</td>
                                                <td style={{ fontWeight: 800 }}>{cfigmcnList.reduce((total, item) => total + item.grossWt, 0)}</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td ></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            {cfigmcnList.map((item, index) => (
                                                <tr key={index}>

                                                    <td>{index + 1}</td>
                                                    <td>{item.containerExamWoTransId}</td>
                                                    <td>
                                                        <div style={{ position: 'relative', width: 170 }}>
                                                            <DatePicker
                                                                selected={item.containerExamWoTransDate}
                                                                id='containerExamWoTransDate'
                                                                name='containerExamWoTransDate'
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
                                                    <td>{item.scannerType}</td>
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
                                                                name='sealCutReqDate'
                                                                disabled
                                                                dateFormat="dd/MM/yyyy HH:mm"
                                                                className="form-control border-right-0 InputField"
                                                                customInput={<Input style={{ width: '100%' }} />}
                                                                wrapperClassName="custom-react-datepicker-wrapper"
                                                            />
                                                            <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                                        </div>
                                                    </td>
                                                    <td>{item.noOfPackages}</td>
                                                    <td>{item.grossWt}</td>
                                                    <td>
                                                        <div style={{ position: 'relative', width: 170 }}>
                                                            <DatePicker
                                                                selected={item.containerExamDate}
                                                                id='containerExamDate'
                                                                onChange={(date) => setCfigmcnList(prevState => {
                                                                    const updatedData = [...prevState];
                                                                    updatedData[index] = {
                                                                        ...updatedData[index],
                                                                        'containerExamDate': date
                                                                    };
                                                                    return updatedData;
                                                                })}
                                                                name='containerExamDate'
                                                                disabled
                                                                dateFormat="dd/MM/yyyy HH:mm"
                                                                className={`form-control border-right-0 InputField ${errors[index]?.containerExamDate ? 'error-border' : ''}`}

                                                                customInput={<Input style={{ width: '100%' }} />}
                                                                wrapperClassName="custom-react-datepicker-wrapper"
                                                            />
                                                            <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <Input
                                                            className={`form-control ${errors[index]?.examinedPackages ? 'error-border' : ''}`}
                                                            type="select"
                                                            id={`examinedPackages${index}`}
                                                            name='examinedPackages'
                                                            disabled={item.containerExamWoTransId != ''}
                                                            value={item.examinedPackages}
                                                            onChange={(e) => updateCfigmcn(e, index)}

                                                        >
                                                            <option value="0">0</option>
                                                            <option value="25">25</option>
                                                            <option value="50">50</option>
                                                            <option value="100">100</option>

                                                        </Input>
                                                    </td>
                                                    <td>
                                                        <Input
                                                            className={`form-control ${errors[index]?.packagesDeStuffed ? 'error-border' : ''}`}
                                                            type="text"
                                                            id={`packagesDeStuffed${index}`}
                                                            name='packagesDeStuffed'
                                                            disabled={item.containerExamWoTransId != ''}
                                                            value={item.packagesDeStuffed <= item.noOfPackages ? item.packagesDeStuffed : 0}
                                                            onChange={(e) => updateCfigmcn(e, index)}
                                                            maxLength={12}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Input
                                                            className={`form-control ${errors[index]?.packagesStuffed ? 'error-border' : ''}`}
                                                            type="text"
                                                            id={`packagesStuffed${index}`}
                                                            name='packagesStuffed'
                                                            disabled={item.containerExamWoTransId != ''}
                                                            value={item.packagesStuffed <= item.noOfPackages ? item.packagesStuffed : 0}
                                                            onChange={(e) => updateCfigmcn(e, index)}
                                                            maxLength={12}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Col style={{ height: 25, width: 150 }}>
                                                            <Input
                                                                className={`form-control ${errors[index]?.typeOfContainer ? 'error-border' : ''}`}
                                                                type="select"
                                                                id={`typeOfContainer${index}`}
                                                                name='typeOfContainer'
                                                                disabled={item.containerExamWoTransId != ''}
                                                                value={item.typeOfContainer}
                                                                onChange={(e) => updateCfigmcn(e, index)}

                                                            >


                                                                <option value="General" selected="">General	</option>

                                                                <option value="Hazardous">Hazardous</option>

                                                                <option value="ODC">ODC</option>

                                                                <option value="Reefer">Reefer</option>

                                                                <option value="Tank">Tank</option>

                                                                <option value="TankHaz">Tank_Haz</option>

                                                                <option value="ReeferHaz">Reefer_Haz</option>

                                                                <option value="FlatTrack">FlatTrack</option>


                                                            </Input>
                                                        </Col>
                                                    </td>
                                                    <td>
                                                        <Col style={{ height: 25, width: 150 }}>
                                                            <Input
                                                                className={`form-control ${errors[index]?.gateOutType ? 'error-border' : ''}`}
                                                                type="select"
                                                                id={`gateOutType${index}`}
                                                                name='gateOutType'
                                                                disabled={item.containerExamWoTransId != ''}
                                                                value={item.gateOutType}
                                                                onChange={(e) => updateCfigmcn(e, index)}

                                                            >
                                                                <option value="CON">Loaded</option>
                                                                <option value="CRG">Destuff</option>


                                                            </Input>
                                                        </Col>
                                                    </td>

                                                    <td>
                                                        <Col style={{ height: 25, width: 150 }}>
                                                            <Input
                                                                className={`form-control ${errors[index]?.specialDelivery ? 'error-border' : ''}`}
                                                                type="select"
                                                                id={`specialDelivery${index}`}
                                                                name='specialDelivery'
                                                                disabled={item.containerExamWoTransId != ''}
                                                                value={item.specialDelivery}
                                                                onChange={(e) => updateCfigmcn(e, index)}

                                                            >

                                                                <option value="NA" selected="">Normal</option>

                                                                <option value="SCON">Special Delivery</option>


                                                            </Input>
                                                        </Col>
                                                    </td>
                                                    <td>
                                                        <Input
                                                            className={`form-control ${errors[index]?.containerExamRemarks ? 'error-border' : ''}`}
                                                            type="textarea"
                                                            id={`containerExamRemarks${index}`}
                                                            name='containerExamRemarks'
                                                            style={{ width: 200 }}
                                                            disabled={item.containerExamWoTransId != ''}
                                                            value={item.containerExamRemarks}
                                                            onChange={(e) => updateCfigmcn(e, index)}

                                                        />
                                                    </td>
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

                        <Modal Modal isOpen={isModalOpenForCotainerWorkOrder} onClose={closeContainerWiseModal} toggle={closeContainerWiseModal} style={{ maxWidth: '900px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                            <ModalHeader toggle={closeContainerWiseModal} style={{
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
                                /> Add Equipment & Generate Work Order</h5>



                            </ModalHeader>
                            <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                                <Row>
                                    <Col md={4}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                IGM Trans Id
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="examinationRemarks"
                                                name='examinationRemarks'
                                                value={containerWiseData.igmTransId}
                                                disabled
                                            />


                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                IGM No
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="examinationRemarks"
                                                name='examinationRemarks'
                                                value={containerWiseData.igmNo}
                                                disabled
                                            />


                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Line No
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="examinationRemarks"
                                                name='examinationRemarks'
                                                value={containerWiseData.igmLineNo}
                                                disabled
                                            />


                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Vendor
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="select"
                                                id="selectVendor"
                                                name='selectVendor'
                                                value={selectVendor}
                                                onChange={(e) => setSelectVendor(e.target.value)}

                                            >
                                                <option value="">Select Vendor</option>

                                                <option value={getVendor.partyId}>{getVendor.partyName}</option>


                                            </Input>


                                        </FormGroup>
                                    </Col>
                                    <Col md={8}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Equipment
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="select"
                                                id="selectEquipmend"
                                                name='selectEquipmend'
                                                value={selectEquipmend}
                                                onChange={(e) => setSelectEquipmend(e.target.value)}

                                            >
                                                <option value="">Select Equipment</option>
                                                {getEquipment.map((item, index) => (
                                                    <option key={index} value={item.jarDtlId}>{item.jarDtlDesc}</option>
                                                ))}

                                            </Input>

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
                                            onClick={() => handleContainerSaveEquipment(selectVendor, selectEquipmend)}
                                        >
                                            <FontAwesomeIcon icon={faSave} style={{ marginRight: 5 }} />
                                            Save

                                        </button>
                                        <button
                                            className="btn btn-outline-danger btn-margin newButton"
                                            style={{ marginRight: 10 }}
                                            id="submitbtn2"
                                            onClick={handleContainerEquipmentClear}

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

                                                <th scope="col">Sr No</th>
                                                <th scope="col">Container No</th>
                                                <th scope="col">Container Size</th>
                                                <th scope="col">Container Type</th>

                                                <th scope="col">Status</th>

                                            </tr>
                                        </thead>
                                        <tbody>

                                            <tr >

                                                <td>1</td>
                                                <td>{containerWiseData.containerNo}</td>
                                                <td>{containerWiseData.containerSize}</td>
                                                <td>{containerWiseData.containerType}</td>

                                                <td>A</td>

                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-3 table-responsive ">
                                    <table className="table table-bordered table-hover tableHeader">
                                        <thead className='tableHeader'>
                                            <tr>

                                                <th scope="col">Sr No</th>
                                                <th scope="col">Equipment</th>
                                                <th scope="col">Vendor</th>

                                                <th scope="col">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {conEquipmentData.map((item, index) => (
                                                <tr
                                                    key={index}
                                                    onMouseEnter={() => handleMouseEnter(item[5])}
                                                    onMouseLeave={handleMouseLeave}
                                                >
                                                    <td>{index + 1}</td>
                                                    <td>{item[0]}</td>
                                                    <td>{item[1]}</td>

                                                    <td>
                                                        <button
                                                            className="btn btn-outline-danger btn-margin newButton"
                                                            style={{ marginRight: 10 }}
                                                            id="submitbtn2"
                                                            onClick={() => deleteContainerEquipments(item[2], item[3])}

                                                        >
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                    {tooltip.visible && (
                                        <div className="tooltip" style={{ position: 'absolute', top: '50px', left: '50px' }}>
                                            {tooltip.content}
                                        </div>
                                    )}
                                </div>
                            </ModalBody>
                        </Modal>


                        <Col md={2}>
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
                        <Col md={2} style={{ marginTop: 25 }}>
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
                                                Scanner type
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="scannerType"
                                                name='scannerType'
                                                disabled
                                                value={containerWiseData.scannerType}
                                                onChange={handleContainerChange}
                                            />
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
                                                <option value="CON">Loaded</option>
                                                <option value="CRG">Destuff</option>

                                            </Input>
                                        </FormGroup>
                                    </Col>



                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                No Of Packages
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="noOfPackages"
                                                name='noOfPackages'
                                                value={cargoMultipleDta.reduce((total, item) => total + item.noOfPackages, 0)}
                                                onChange={handleContainerChange}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>
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
                                                value={cargoMultipleDta.reduce((total, item) => total + item.grossWeight, 0)}
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
                                                    maxDate={new Date()}
                                                    name='sealCutWoTransDate'
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
                                                Exam Date
                                            </label>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={containerWiseData.containerExamDate}
                                                    id='containerExamDate'
                                                    onChange={(date) => setcontainerWiseData({
                                                        ...containerWiseData,
                                                        containerExamDate: date
                                                    })}
                                                    maxDate={new Date()}
                                                    disabled
                                                    name='containerExamDate'
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
                                                Exam Percentage
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="select"
                                                id="examinedPackages"
                                                name='examinedPackages'
                                                value={containerWiseData.examinedPackages}
                                                onChange={handleContainerChange}
                                            >
                                                <option value="0">0</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Pkgs DeStuffed
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="packagesDeStuffed"
                                                name='packagesDeStuffed'
                                                value={containerWiseData.packagesDeStuffed <= cargoMultipleDta.reduce((total, item) => total + item.noOfPackages, 0) ? containerWiseData.packagesDeStuffed : 0}
                                                onChange={handleContainerChange}
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
                                                id="containerExamStatus"
                                                name='containerExamStatus'
                                                value={containerWiseData.containerExamStatus === 'Y' ? 'Approved' : ''}
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
                                                id="containerExamWoTransId"
                                                name='containerExamWoTransId'
                                                value={containerWiseData.containerExamWoTransId}
                                                onChange={handleContainerChange}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Pkgs Stuffed
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="packagesStuffed"
                                                name='packagesStuffed'
                                                value={containerWiseData.packagesStuffed <= cargoMultipleDta.reduce((total, item) => total + item.noOfPackages, 0) ? containerWiseData.packagesStuffed : 0}
                                                onChange={handleContainerChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Type of Container
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="select"
                                                id="typeOfContainer"
                                                name='typeOfContainer'
                                                value={containerWiseData.typeOfContainer}
                                                onChange={handleContainerChange}
                                            >


                                                <option value="General" selected="">General	</option>

                                                <option value="Hazardous">Hazardous</option>

                                                <option value="ODC">ODC</option>

                                                <option value="Reefer">Reefer</option>

                                                <option value="Tank">Tank</option>

                                                <option value="TankHaz">Tank_Haz</option>

                                                <option value="ReeferHaz">Reefer_Haz</option>

                                                <option value="FlatTrack">FlatTrack</option>
                                            </Input>

                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Special Delivery
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="select"
                                                id="specialDelivery"
                                                name='specialDelivery'
                                                value={containerWiseData.specialDelivery}
                                                onChange={handleContainerChange}
                                            >


                                                <option value="NA" selected="">Normal</option>

                                                <option value="SCON">Special Delivery</option>
                                            </Input>

                                        </FormGroup>
                                    </Col>




                                    <Col md={2}>
                                        <FormGroup>
                                            <Label className="inputHeader">OOC No</Label>
                                            <Input
                                                type="text"
                                                name="contOocNo"
                                                className="form-control inputField"
                                                value={contOocNo}
                                                id='contOocNo'
                                                onChange={(e) => setContOocno(e.target.value)}
                                                maxLength={20}
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <Label className="inputHeader">OOC Date</Label>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={contOocDate}
                                                    onChange={(date) => {
                                                        setContOocDate(date);

                                                    }}
                                                    id='contOocDate'
                                                    name='contOocDate'
                                                    showTimeInput
                                                    dateFormat="dd/MM/yyyy HH:mm"
                                                    className="form-control border-right-0 InputField"
                                                    customInput={<Input style={{ width: '100%' }} />}
                                                    wrapperClassName="custom-react-datepicker-wrapper"
                                                />
                                                <FontAwesomeIcon
                                                    icon={faCalendarAlt}
                                                    style={{
                                                        position: 'absolute',
                                                        right: '10px',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        pointerEvents: 'none',
                                                        color: '#6c757d'
                                                    }}
                                                />
                                            </div>

                                        </FormGroup>

                                    </Col>


                                </Row>
                                <Row>
                                    <Col md={2}>
                                        <FormGroup>
                                            <Label className="inputHeader">Do No</Label>
                                            <Input
                                                type="text"
                                                name="contDoNo"
                                                className="form-control inputField"
                                                value={contDoNo}
                                                id='contDoNo'
                                                onChange={(e) => setContDoNo(e.target.value)}
                                                maxLength={30}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <Label className="inputHeader">DO Date</Label>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={contDoDate}
                                                    onChange={(date) => {
                                                        setContDoDate(date);
                                                        if (date >= contDoValidityDate) {
                                                            setContDoValidityDate(null);
                                                        };
                                                    }}
                                                    id='contDoDate'
                                                    name='contDoDate'
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
                                            <Label className="inputHeader">DO Validity Date</Label>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={contDoValidityDate}
                                                    onChange={(date) => {
                                                        setContDoValidityDate(date);

                                                    }}
                                                    minDate={(() => {
                                                        const date = new Date(contDoDate);
                                                        date.setDate(date.getDate() + 1);
                                                        return date;
                                                    })()}
                                                    id='doValidityDate'
                                                    name='doValidityDate'

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
                                                Remarks
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="textarea"
                                                id="containerExamRemarks"
                                                name='containerExamRemarks'
                                                value={containerWiseData.containerExamRemarks}
                                                onChange={handleContainerChange}
                                                maxLength={150}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <hr />

                                <Row style={{ marginBottom: 10 }}>
                                    <Col md={4}>
                                        <button
                                            className="btn btn-outline-success btn-margin newButton"
                                            style={{ marginRight: 10 }}
                                            id="submitbtn2"
                                            onClick={openContainerWiseModal}
                                        >
                                            <FontAwesomeIcon icon={faAdd} style={{ marginRight: 5 }} />
                                            Add Equipment & Generate WorkOrder

                                        </button>
                                    </Col>
                                    <Col md={4} className='text-center'>
                                        <button
                                            className="btn btn-outline-primary btn-margin newButton"
                                            style={{ marginRight: 10 }}
                                            id="submitbtn2"
                                            onClick={saveContainerWiseSealCutting}
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
                                            onClick={downloadContainerWiseReport}
                                            disabled={containerWiseData.containerExamWoTransId === ''}
                                        >
                                            <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
                                            Print Report
                                        </button>
                                    </Col>
                                </Row>

                                <div className="mt-3 table-responsive">
                                    <table className="table table-bordered table-hover tableHeader">
                                        <thead className="tableHeader">
                                            <tr>
                                                <th scope="col">Sr No</th>
                                                <th scope="col">Item No</th>
                                                <th scope="col">Importer Name</th>
                                                <th scope="col">BL No</th>
                                                <th scope="col">Pkgs</th>

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
                                                <td style={{ fontWeight: 800 }}>{cargoMultipleDta.reduce((total, item) => total + item.noOfPackages, 0)}</td>

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

                                                    <td>{item.noOfPackages}</td>

                                                    <td>{item.commodityDescription}</td>
                                                    <td >

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
                                                    </td>
                                                    <td>
                                                        <Input
                                                            className="form-control"
                                                            type="textarea"
                                                            id={`chaName${index}`}
                                                            onChange={(e) => handleChangeCargo(e, index)}
                                                            value={item.chaName}
                                                            name='chaName'
                                                            style={{ width: 190 }}
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
