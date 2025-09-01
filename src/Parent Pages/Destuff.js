
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
import { error } from 'jquery';

export default function Destuff({ igm1, item1, cont, sealStatus, process, onRequest }) {
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
        axios.get(`${ipaddress}cfigm/getItemsList2?cid=${companyid}&bid=${branchId}&igm=${igm}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                console.log("jhhjhj ", response.data);

                setigmSearchList(response.data);
                searchDestuffItemWiseData(igm, response.data[0]);
                setItem(response.data[0]);
            })
            .catch((error) => {
                setigmSearchList([]);
            })
    }

    const [conSearchList, setconSearchList] = useState([]);

    const getCons = (igm) => {
        axios.get(`${ipaddress}cfigm/getContainerList2?cid=${companyid}&bid=${branchId}&igm=${igm}`, {
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

    console.log('sealStatus ', sealStatus);

    useEffect(() => {
        if (sealStatus !== '' && process === 'P00206') {
            setSelectSealCuttingType(sealStatus);

            if (sealStatus === 'itemwise') {
                searchDestuffItemWiseData(igm1, item1)
                setIgm(igm1);
                setItem(item1);

            }
            else {
                // setSearchIgmId(igm1);
                // setSearchContainerId(cont);

                getSingleCon(cont);



            }
        }
        else if (sealStatus === '' && process === 'P00206') {
            setSelectSealCuttingType('itemwise');
            setIgm(igm1);
            getItems(igm1);
            getCons(igm1);
            // setSearchIgmId(igm1);
        }
    }, [igm1, item1, cont, sealStatus, process])

    const getSingleCon = (con) => {

        if (!con) {
            return;
        }

        axios.get(`${ipaddress}cfigm/getSingleCon?cid=${companyid}&bid=${branchId}&con=${con}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;

                if (data.deStuffId) {
                    selectSearchDestuff(data.igmNo, data.igmTransId, data.igmLineNo, data.deStuffId);
                }
                else {
                    getDataFromContainerNo(cont);
                }


            })
            .catch((error) => {
                getDataFromContainerNo(cont);
            })
    }

    const [conHaz, setConHaz] = useState('N');
    const [destuff, setDestuff] = useState({
        companyId: '',
        branchId: '',
        finYear: '',
        deStuffId: '',
        deStuffDate: null, // or a default date if needed
        profitcentreId: '',
        igmTransId: '',
        igmNo: '',
        igmLineNo: '',
        igmDate: null, // or a default date if needed
        transType: '',
        drt: '',
        viaNo: '',
        shippingAgent: '',
        shippingLine: '',
        containerNo: '',
        containerType: '',
        containerSize: '',
        containerStatus: '',
        haz: '',
        periodicBill: '',
        grossWeight: 0.0, // or a default BigDecimal value if needed
        containerSealNo: '',
        customSealNo: '',
        saSealNo: '',
        onAccountOf: '',
        gateInId: '',
        gateInDate: null, // or a default date if needed
        yardLocation: '',
        yardBlock: '',
        blockCellNo: '',
        yardLocation1: '',
        yardBlock1: '',
        blockCellNo1: '',
        areaOccupied: 0.0, // or a default BigDecimal value if needed
        yardPackages: 0, // or a default BigDecimal value if needed
        pod: '',
        invoiceType: 'CHA',
        gateInType: '',
        shift: 'Day',
        blGainLossId: '',
        mtyStatus: '',
        mtyDate: null, // or a default date if needed
        doEntryFlag: '',
        doEntryDate: null, // or a default date if needed
        status: '',
        createdBy: '',
        createdDate: null, // or a default date if needed
        editedBy: '',
        editedDate: null, // or a default date if needed
        approvedBy: '',
        approvedDate: null, // or a default date if needed
        destuffType: 'DSTF',
        destuffFromDate: null, // or a default date if needed
        destuffToDate: null, // or a default date if needed
        workOrderNo: ''
    });

    // Function to update the state
    const handleChange = (e) => {
        const { name, value } = e.target;
        let sanitizedValue = value;
        // if (['cargoValue', 'cargoDuty', 'beWt', 'mobileNo'].includes(name)) {
        //     sanitizedValue = handleInputChange(value);
        // }
        setDestuff(prevState => ({
            ...prevState,
            [name]: sanitizedValue
        }));


        if (igm1 && !item1 && !cont && conSearchList.length > 0 && name === 'containerNo') {
            getDataFromContainerNo(sanitizedValue)
        }
    };


    const [destuffCrgs, setDestuffCrgs] = useState([
        {
            companyId: '',
            branchId: '',
            finYear: '',
            deStuffId: '',
            deStuffLineId: '',
            deStuffDate: null, // or a default date if needed
            igmTransId: '',
            igmNo: '',
            profitcentreId: '',
            igmLineNo: '',
            commodityDescription: '',
            comments: '',
            marksOfNumbers: '',
            grossWeight: "0.0", // Use BigNumber for precision
            typeOfPackages: '',
            noOfPackages: 0,
            actualNoOfPackages: 0,
            oldActualNoOfPackages: 0,
            oldYardPackages: 0,
            onAccountOf: '',
            gainLossPackages: '',
            damagedPackages: 0,
            blGainLoss: 'O',
            importerName: '',
            importerAddress1: '',
            importerAddress2: '',
            importerAddress3: '',
            yardLocation: '',
            yardBlock: '',
            blockCellNo: '',
            areaOccupied: 0.0,
            yardPackages: 0.0,
            examTallyId: '',
            examDate: null, // or a default date if needed
            examTallyLineId: '',
            qtyTakenOut: 0,
            invoiceType: '',
            gateInType: '',
            destuffCharges: "0.0",
            fob: "0.0",
            sampleSlipId: '',
            forceEntryFlag: '',
            forceEntryDate: null, // or a default date if needed
            forceEntryApproval: '',
            forceEntryRemarks: '',
            status: '',
            createdBy: '',
            createdDate: null, // or a default date if needed
            editedBy: '',
            editedDate: null, // or a default date if needed
            approvedBy: '',
            approvedDate: null, // or a default date if needed
            destuffType: '',
            lclZeroEntryFlag: '',
            lclZeroEntryDate: null, // or a default date if needed
            lclZeroEntryValidityDate: null, // or a default date if needed
            lclZeroEntryCreatedBy: '',
            lclZeroEntryApproval: '',
            lclZeroEntryRemarks: '',
            actualWeight: "0.0",
            oldActualWeight: "0.0",
            cargoType: 'General',
            warehouseLocation: '',
            movementType: '',
            excessPackages: "0.0",
            shortagePackages: "0.0",
            forceEntryFlagInv: '',
            length: '',
            height: '',
            weight: '',
            odcType: '',
            typeOfCargo: ''
        }
        // Add more objects as needed
    ]);


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


    const updateDestuffCrg = (e, index) => {
        const { name, value } = e.target;
        let sanitizedValue = value;
        if (['actualNoOfPackages', 'actualWeight', 'areaOccupied', 'damagedPackages', 'gainLossPackages', 'yardPackages', 'excessPackages', 'shortagePackages'].includes(name)) {
            sanitizedValue = handleInputChange(value);

            if (name === 'actualNoOfPackages') {
                const oldPack = destuffCrgs[index].oldActualNoOfPackages || 0;
                const nop = destuffCrgs[index].noOfPackages || 0;

                if ((nop - oldPack) < sanitizedValue) {
                    sanitizedValue = 0;
                }
            }
        }

        if (['length', 'height', 'weight'].includes(name)) {
            sanitizedValue = handleInputChange1(value, 13, 3);
        }
        setDestuffCrgs(prevState => {
            const updatedData = [...prevState];
            updatedData[index] = {
                ...updatedData[index],
                [name]: sanitizedValue,

            };
            return updatedData;
        });

        if (name === 'actualNoOfPackages') {
            setDestuffCrgs(prevState => {
                const updatedData = [...prevState];
                updatedData[index] = {
                    ...updatedData[index],
                    yardPackages: sanitizedValue,

                };
                return updatedData;
            });
        }

        if (name === 'typeOfCargo' && sanitizedValue !== 'ODC') {
            setDestuffCrgs(prevState => {
                const updatedData = [...prevState];
                updatedData[index] = {
                    ...updatedData[index],
                    odcType: '',
                    length: '',
                    height: '',
                    weight: ''

                };
                return updatedData;
            });
        }

        setError(prevErrors => {
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

    const [flag, setFlag] = useState('add');
    const [contOocNo, setContOocno] = useState('');
    const [contOocDate, setContOocDate] = useState(null);
    const [contDoNo, setContDoNo] = useState('')
    const [contDoDate, setContDoDate] = useState(null)
    const [contDoValidityDate, setContDoValidityDate] = useState(null)

    const getDataFromContainerNo = (con) => {
        setLoading(true);
        if (!con) {
            toast.error("Container no is required", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }

        axios.get(`${ipaddress}cfigm/searchContainerForDestuff?cid=${companyid}&bid=${branchId}&container=${con}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                setDestuff({
                    companyId: '',
                    branchId: '',
                    finYear: new Date().getFullYear(),
                    deStuffId: '',
                    deStuffDate: null, // or a default date if needed
                    profitcentreId: data.igm.profitcentreId || '',
                    igmTransId: data.container.igmTransId || '',
                    igmNo: data.container.igmNo || '',
                    igmLineNo: data.container.igmLineNo || '',
                    igmDate: data.igm.igmDate === null ? null : data.igm.igmDate || null, // or a default date if needed
                    transType: data.container.containerStatus || '',
                    drt: data.container.drt || '',
                    viaNo: data.cargo[0].viaNo || '',
                    shippingAgent: data.igm.shippingAgent || '',
                    shippingLine: data.igm.shippingLine || '',
                    containerNo: data.container.containerNo || '',
                    containerType: data.container.containerType || '',
                    containerSize: data.container.containerSize || '',
                    containerStatus: data.container.containerStatus || '',
                    haz: data.container.haz || '',
                    periodicBill: '',
                    grossWeight: data.cargo.reduce((total, item) => total + item.grossWeight, 0) || 0.0, // or a default BigDecimal value if needed
                    containerSealNo: data.container.containerSealNo || '',
                    customSealNo: data.container.customsSealNo || '',
                    saSealNo: '',
                    onAccountOf: '',
                    gateInId: data.container.gateInId || '',
                    gateInDate: data.container.gateInDate === null ? null : data.container.gateInDate || null, // or a default date if needed
                    yardLocation: data.container.yardLocation || '',
                    yardBlock: data.container.yardBlock || '',
                    blockCellNo: data.container.blockCellNo || '',
                    yardLocation1: data.container.yardLocation1 || '',
                    yardBlock1: data.container.yardBlock1 || '',
                    blockCellNo1: data.container.blockCellNo1 || '',
                    areaOccupied: 0.0, // or a default BigDecimal value if needed
                    yardPackages: 0, // or a default BigDecimal value if needed
                    pod: '',
                    invoiceType: 'CHA',
                    gateInType: '',
                    shift: 'Day',
                    blGainLossId: '',
                    mtyStatus: '',
                    mtyDate: null, // or a default date if needed
                    doEntryFlag: '',
                    doEntryDate: null, // or a default date if needed
                    status: '',
                    createdBy: '',
                    createdDate: null, // or a default date if needed
                    editedBy: '',
                    editedDate: null, // or a default date if needed
                    approvedBy: '',
                    approvedDate: null, // or a default date if needed
                    destuffType: 'DSTF',
                    destuffFromDate: null, // or a default date if needed
                    destuffToDate: null, // or a default date if needed
                    workOrderNo: ''
                })
                setContDoDate(data.container.doDate === null ? null : new Date(data.container.doDate));
                setContDoNo(data.container.doNo || '');
                setContDoValidityDate(data.container.doValidityDate === null ? null : new Date(data.container.doValidityDate) || null);
                setContOocDate(data.container.oocDate === null ? null : new Date(data.container.oocDate) || null);
                setContOocno(data.container.oocNo || '');
                setConHaz(data.container.haz);

                setDestuffCrgs(data.cargo.map(item => ({
                    companyId: '',
                    branchId: '',
                    finYear: new Date().getFullYear(),
                    deStuffId: '',
                    deStuffLineId: '',
                    deStuffDate: null, // or a default date if needed
                    igmTransId: item.igmTransId,
                    igmNo: item.igmNo,
                    profitcentreId: item.profitcentreId,
                    igmLineNo: item.igmLineNo,
                    commodityDescription: item.commodityDescription,
                    comments: '',
                    marksOfNumbers: item.marksOfNumbers || '',
                    grossWeight: item.grossWeight || '', // Use BigNumber for precision
                    typeOfPackages: item.typeOfPackage || '',
                    noOfPackages: item.noOfPackages || '',
                    actualNoOfPackages: 0,
                    oldActualNoOfPackages: 0,
                    oldYardPackages: 0,
                    onAccountOf: '',
                    gainLossPackages: 0,
                    damagedPackages: 0,
                    blGainLoss: 'O',
                    importerName: item.importerName || '',
                    importerAddress1: item.importerAddress1 || '',
                    importerAddress2: item.importerAddress2 || '',
                    importerAddress3: item.importerAddress3 || '',
                    yardLocation: item.yardLocation || '',
                    yardBlock: item.yardBlock || '',
                    blockCellNo: item.blockCellNo || '',
                    areaOccupied: "0.0",
                    yardPackages: 0,
                    examTallyId: '',
                    examDate: null, // or a default date if needed
                    examTallyLineId: '',
                    qtyTakenOut: 0,
                    invoiceType: '',
                    gateInType: '',
                    destuffCharges: "0.0",
                    fob: "0.0",
                    sampleSlipId: '',
                    forceEntryFlag: '',
                    forceEntryDate: null, // or a default date if needed
                    forceEntryApproval: '',
                    forceEntryRemarks: '',
                    status: '',
                    createdBy: '',
                    createdDate: null, // or a default date if needed
                    editedBy: '',
                    editedDate: null, // or a default date if needed
                    approvedBy: '',
                    approvedDate: null, // or a default date if needed
                    destuffType: '',
                    lclZeroEntryFlag: '',
                    lclZeroEntryDate: null, // or a default date if needed
                    lclZeroEntryValidityDate: null, // or a default date if needed
                    lclZeroEntryCreatedBy: '',
                    lclZeroEntryApproval: '',
                    lclZeroEntryRemarks: '',
                    actualWeight: 0.0,
                    oldActualWeight: 0.0,
                    cargoType: item.cargoType || '',
                    warehouseLocation: '',
                    movementType: item.cargoMovement || '',
                    excessPackages: "0.0",
                    shortagePackages: "0.0",
                    forceEntryFlagInv: '',
                    length: '',
                    height: '',
                    weight: '',
                    odcType: '',
                    typeOfCargo: ''
                })));
                setFlag('add');

                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                handleClear();
                setLoading(false);


            })
    }



    const [searchCha, setsearchCha] = useState('');
    const [partyName, setpartyName] = useState('');
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
        if (id === '') {
            setChaData([]);
            return;
        }
        axios.get(`${ipaddress}party/getAll?cid=${companyid}&bid=${branchId}&val=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const portOptions = response.data.map(port => ({
                    value: port[0],
                    label: port[1],
                    code: port[2]
                }))
                setChaData(portOptions);
            })
            .catch((error) => {
                setChaData([]);
            })
    }

    const handleAgentChange = async (selectedOption, { action }) => {
        if (action === 'clear') {
            setDestuff({
                ...destuff,
                onAccountOf: ''
            })
            setpartyName('');
        }
        else {
            setDestuff({
                ...destuff,
                onAccountOf: selectedOption.value
            })
            setpartyName(selectedOption.label);
        }
    }

    // useEffect(()=>{
    //    searchChaData();
    // },[])

    const selectCha = (id, name) => {
        console.log(id, ' ', name);

        setDestuff({
            ...destuff,
            onAccountOf: id,
        })
        setpartyName(name);

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
        setpartyName('');
    }

    const [formErrors, setFormErrors] = useState({
        destuffFromDate: '',
        destuffToDate: '',
        contOocNo: '',
        contOocDate: ''
    })

    const [error, setError] = useState([]);

    const saveData = () => {
        setLoading(true);
        let errors = {};

        if (!destuff.gateInId) {
            toast.error("Container data not found.", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }

        if (destuff.containerStatus === 'LCL') {
            if (!destuff.destuffFromDate) {
                errors.destuffFromDate = "Destuff from date is required.";
            }

            if (!destuff.destuffToDate) {
                errors.destuffToDate = "Destuff to date is required.";
            }

            // if (!contOocNo) {
            //     errors.contOocNo = "OOC No is required."
            // }
            // if (!contOocDate) {
            //     errors.contOocDate = "OOC Date is required."
            // }

        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setLoading(false);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            })
            return;
        }

        let newErrors = destuffCrgs.map(() => ({}));
        setError([]);
        destuffCrgs.forEach((data, index) => {
            let rowErrors = {};
            if (!data.commodityDescription) rowErrors.commodityDescription = "Commodity description is required.";
            if (!data.actualNoOfPackages && !data.oldActualNoOfPackages) rowErrors.actualNoOfPackages = "Destuff pkgs is required.";
            if (!data.actualWeight && destuff.containerStatus === 'LCL' && !data.oldActualWeight) rowErrors.actualWeight = "Destuff wt. is required.";
            if (!data.yardPackages && !data.oldYardPackages) rowErrors.yardPackages = "Yard pkgs is required.";
            if (data.typeOfCargo === 'ODC' && !data.odcType) rowErrors.odcType = "ODC type is required.";
            if (data.typeOfCargo === 'ODC' && (!data.length || data.length <= 0)) rowErrors.length = "Length is required.";
            if (data.typeOfCargo === 'ODC' && (!data.height || data.height <= 0)) rowErrors.height = "Height is required.";
            if (data.typeOfCargo === 'ODC' && (!data.weight || data.weight <= 0)) rowErrors.weight = "Weight is required.";

            if (Object.keys(rowErrors).length > 0) {
                newErrors[index] = rowErrors;
            }
        });

        // Check if any errors exist
        const hasErrors = newErrors.some(errorObj => Object.keys(errorObj).length > 0);

        if (hasErrors) {
            console.log('newErrors ', newErrors);
            setError(newErrors);
            setLoading(false);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            });
            console.log('errors ', errors);
            return;
        }
        const formData = {
            destuff: destuff,
            crg: destuffCrgs,
            oocNo: contOocNo,
            oocDate: contOocDate,
            doNo: contDoNo,
            doDate: contDoDate,
            doValidityDate: contDoValidityDate
        }

        axios.post(`${ipaddress}destuff/saveData?cid=${companyid}&bid=${branchId}&user=${userId}&flag=${flag}&haz=${conHaz}`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                setContDoDate(data.doDate === null ? null : new Date(data.doDate) || null);
                setContDoNo(data.doNo || '');
                setContDoValidityDate(data.doValidityDate === null ? null : new Date(data.doValidityDate) || null);
                setContOocDate(data.oocDate === null ? null : new Date(data.oocDate) || null);
                setContOocno(data.oocNo || '');
                setDestuff({
                    companyId: data.destuff.companyId || '',
                    branchId: data.destuff.branchId || '',
                    finYear: data.destuff.finYear || '',
                    deStuffId: data.destuff.deStuffId || '',
                    deStuffDate: new Date(data.destuff.deStuffDate) || null,
                    profitcentreId: data.destuff.profitcentreId || '',
                    igmTransId: data.destuff.igmTransId || '',
                    igmNo: data.destuff.igmNo || '',
                    igmLineNo: data.destuff.igmLineNo || '',
                    igmDate: data.destuff.igmDate === null ? null : new Date(data.destuff.igmDate) || null,
                    transType: data.destuff.transType || '',
                    drt: data.destuff.drt || '',
                    viaNo: data.destuff.viaNo || '',
                    shippingAgent: data.destuff.shippingAgent || '',
                    shippingLine: data.destuff.shippingLine || '',
                    containerNo: data.destuff.containerNo || '',
                    containerType: data.destuff.containerType || '',
                    containerSize: data.destuff.containerSize || '',
                    containerStatus: data.destuff.containerStatus || '',
                    haz: data.destuff.haz || '',
                    periodicBill: data.destuff.periodicBill || '',
                    grossWeight: data.destuff.grossWeight || 0.0,
                    containerSealNo: data.destuff.containerSealNo || '',
                    customSealNo: data.destuff.customSealNo || '',
                    saSealNo: data.destuff.saSealNo || '',
                    onAccountOf: data.destuff.onAccountOf || '',
                    gateInId: data.destuff.gateInId || '',
                    gateInDate: data.destuff.gateInDate === null ? null : new Date(data.destuff.gateInDate) || null,
                    yardLocation: data.destuff.yardLocation || '',
                    yardBlock: data.destuff.yardBlock || '',
                    blockCellNo: data.destuff.blockCellNo || '',
                    yardLocation1: data.destuff.yardLocation1 || '',
                    yardBlock1: data.destuff.yardBlock1 || '',
                    blockCellNo1: data.destuff.blockCellNo1 || '',
                    areaOccupied: data.destuff.areaOccupied || 0.0,
                    yardPackages: data.destuff.yardPackages || 0.0,
                    pod: data.destuff.pod || '',
                    invoiceType: data.destuff.invoiceType || '',
                    gateInType: data.destuff.gateInType || '',
                    shift: data.destuff.shift || 'Day',
                    blGainLossId: data.destuff.blGainLossId || '',
                    mtyStatus: data.destuff.mtyStatus || '',
                    mtyDate: data.destuff.mtyDate || null,
                    doEntryFlag: data.destuff.doEntryFlag || '',
                    doEntryDate: data.destuff.doEntryDate === null ? null : new Date(data.destuff.doEntryDate) || null,
                    status: data.destuff.status || '',
                    createdBy: data.destuff.createdBy || '',
                    createdDate: new Date(data.destuff.createdDate) || null,
                    editedBy: data.destuff.editedBy || '',
                    editedDate: new Date(data.destuff.editedDate) || null,
                    approvedBy: data.destuff.approvedBy || '',
                    approvedDate: new Date(data.destuff.approvedDate) || null,
                    destuffType: data.destuff.destuffType || 'DSTF',
                    destuffFromDate: data.destuff.destuffFromDate === null ? null : new Date(data.destuff.destuffFromDate) || null,
                    destuffToDate: data.destuff.destuffToDate === null ? null : new Date(data.destuff.destuffToDate) || null,
                    workOrderNo: data.destuff.workOrderNo || ''

                });
                setConHaz(data.destuff.haz);
                setpartyName(data.destuff.approvedBy || '',);
                setDestuffCrgs(data.crg.map(item => ({
                    companyId: item.companyId || '',
                    branchId: item.branchId || '',
                    finYear: new Date().getFullYear(),
                    deStuffId: item.deStuffId || '',
                    deStuffLineId: item.deStuffLineId || '',
                    deStuffDate: item.deStuffDate === null ? null : new Date(item.deStuffDate) || null,
                    igmTransId: item.igmTransId || '',
                    igmNo: item.igmNo || '',
                    profitcentreId: item.profitcentreId || '',
                    igmLineNo: item.igmLineNo || '',
                    commodityDescription: item.commodityDescription || '',
                    comments: item.comments || '',
                    marksOfNumbers: item.marksOfNumbers || '',
                    grossWeight: item.grossWeight || '',
                    typeOfPackages: item.typeOfPackages || '',
                    noOfPackages: item.noOfPackages || '',
                    actualNoOfPackages: 0,
                    oldActualNoOfPackages: item.oldActualNoOfPackages || '',
                    oldYardPackages: item.oldYardPackages || '',
                    onAccountOf: item.onAccountOf || '',
                    gainLossPackages: item.gainLossPackages || 0,
                    damagedPackages: item.damagedPackages || 0,
                    blGainLoss: item.blGainLoss || 'O',
                    importerName: item.importerName || '',
                    importerAddress1: item.importerAddress1 || '',
                    importerAddress2: item.importerAddress2 || '',
                    importerAddress3: item.importerAddress3 || '',
                    yardLocation: item.yardLocation || '',
                    yardBlock: item.yardBlock || '',
                    blockCellNo: item.blockCellNo || '',
                    areaOccupied: item.areaOccupied || "0.0",
                    yardPackages: "0.0",
                    examTallyId: item.examTallyId || '',
                    examDate: item.examDate || null,
                    examTallyLineId: item.examTallyLineId || '',
                    qtyTakenOut: item.qtyTakenOut || 0,
                    invoiceType: item.invoiceType || '',
                    gateInType: item.gateInType || '',
                    destuffCharges: item.destuffCharges || "0.0",
                    fob: item.fob || "0.0",
                    sampleSlipId: item.sampleSlipId || '',
                    forceEntryFlag: item.forceEntryFlag || '',
                    forceEntryDate: item.forceEntryDate || null,
                    forceEntryApproval: item.forceEntryApproval || '',
                    forceEntryRemarks: item.forceEntryRemarks || '',
                    status: item.status || '',
                    createdBy: item.createdBy || '',
                    createdDate: item.createdDate || null,
                    editedBy: item.editedBy || '',
                    editedDate: item.editedDate || null,
                    approvedBy: item.approvedBy || '',
                    approvedDate: item.approvedDate || null,
                    destuffType: item.destuffType || '',
                    lclZeroEntryFlag: item.lclZeroEntryFlag || '',
                    lclZeroEntryDate: item.lclZeroEntryDate || null,
                    lclZeroEntryValidityDate: item.lclZeroEntryValidityDate || null,
                    lclZeroEntryCreatedBy: item.lclZeroEntryCreatedBy || '',
                    lclZeroEntryApproval: item.lclZeroEntryApproval || '',
                    lclZeroEntryRemarks: item.lclZeroEntryRemarks || '',
                    actualWeight: 0.0,
                    oldActualWeight: item.oldActualWeight || 0.0,
                    cargoType: item.cargoType || '',
                    warehouseLocation: item.warehouseLocation || '',
                    movementType: item.movementType || '',
                    excessPackages: item.excessPackages || "0.0",
                    shortagePackages: item.shortagePackages || "0.0",
                    forceEntryFlagInv: item.forceEntryFlagInv || '',
                    length: item.length || '',
                    height: item.height || '',
                    weight: item.weight || '',
                    odcType: item.odcType || '',
                    typeOfCargo: item.typeOfCargo || '',
                })));
                setLoading(false);
                setFlag('edit');
                toast.success("Data save successfully", {
                    autoClose: 800
                })
                onRequest();

            })
            .catch((error) => {
                console.log('error ', error);

                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })
    }


    const handleClear = () => {
        setContDoDate(null);
        setContDoNo('');
        setContDoValidityDate(null);
        setContOocDate(null);
        setContOocno('');
        setDestuff({
            companyId: '',
            branchId: '',
            finYear: '',
            deStuffId: '',
            deStuffDate: null, // or a default date if needed
            profitcentreId: '',
            igmTransId: '',
            igmNo: '',
            igmLineNo: '',
            igmDate: null, // or a default date if needed
            transType: '',
            drt: '',
            viaNo: '',
            shippingAgent: '',
            shippingLine: '',
            containerNo: '',
            containerType: '',
            containerSize: '',
            containerStatus: '',
            haz: '',
            periodicBill: '',
            grossWeight: 0.0, // or a default BigDecimal value if needed
            containerSealNo: '',
            customSealNo: '',
            saSealNo: '',
            onAccountOf: '',
            gateInId: '',
            gateInDate: null, // or a default date if needed
            yardLocation: '',
            yardBlock: '',
            blockCellNo: '',
            yardLocation1: '',
            yardBlock1: '',
            blockCellNo1: '',
            areaOccupied: 0.0, // or a default BigDecimal value if needed
            yardPackages: 0, // or a default BigDecimal value if needed
            pod: '',
            invoiceType: 'CHA',
            gateInType: '',
            shift: 'Day',
            blGainLossId: '',
            mtyStatus: '',
            mtyDate: null, // or a default date if needed
            doEntryFlag: '',
            doEntryDate: null, // or a default date if needed
            status: '',
            createdBy: '',
            createdDate: null, // or a default date if needed
            editedBy: '',
            editedDate: null, // or a default date if needed
            approvedBy: '',
            approvedDate: null, // or a default date if needed
            destuffType: 'DSTF',
            destuffFromDate: null, // or a default date if needed
            destuffToDate: null, // or a default date if needed
            workOrderNo: ''
        })
        setpartyName('');
        setConHaz('N');
        setDestuffCrgs([{
            companyId: '',
            branchId: '',
            finYear: '',
            deStuffId: '',
            deStuffLineId: '',
            deStuffDate: null, // or a default date if needed
            igmTransId: '',
            igmNo: '',
            profitcentreId: '',
            igmLineNo: '',
            commodityDescription: '',
            comments: '',
            marksOfNumbers: '',
            grossWeight: "0.0", // Use BigNumber for precision
            typeOfPackages: '',
            noOfPackages: 0,
            actualNoOfPackages: 0,
            oldActualNoOfPackages: 0,
            oldYardPackages: 0,
            onAccountOf: '',
            gainLossPackages: '',
            damagedPackages: 0,
            blGainLoss: 'O',
            importerName: '',
            importerAddress1: '',
            importerAddress2: '',
            importerAddress3: '',
            yardLocation: '',
            yardBlock: '',
            blockCellNo: '',
            areaOccupied: "0.0",
            yardPackages: "0.0",
            examTallyId: '',
            examDate: null, // or a default date if needed
            examTallyLineId: '',
            qtyTakenOut: 0,
            invoiceType: '',
            gateInType: '',
            destuffCharges: "0.0",
            fob: "0.0",
            sampleSlipId: '',
            forceEntryFlag: '',
            forceEntryDate: null, // or a default date if needed
            forceEntryApproval: '',
            forceEntryRemarks: '',
            status: '',
            createdBy: '',
            createdDate: null, // or a default date if needed
            editedBy: '',
            editedDate: null, // or a default date if needed
            approvedBy: '',
            approvedDate: null, // or a default date if needed
            destuffType: '',
            lclZeroEntryFlag: '',
            lclZeroEntryDate: null, // or a default date if needed
            lclZeroEntryValidityDate: null, // or a default date if needed
            lclZeroEntryCreatedBy: '',
            lclZeroEntryApproval: '',
            lclZeroEntryRemarks: '',
            actualWeight: "0.0",
            oldActualWeight: 0.0,
            cargoType: 'General',
            warehouseLocation: '',
            movementType: '',
            excessPackages: "0.0",
            shortagePackages: "0.0",
            forceEntryFlagInv: '',
            length: '',
            height: '',
            weight: '',
            odcType: '',
            typeOfCargo: ''
        }])

        setFormErrors({
            destuffFromDate: '',
            destuffToDate: '',
            contOocNo: '',
            contOocDate: ''
        })

        setError([]);
    }


    const [isModalOpenForSearchDestuff, setisModalOpenForSearchDestuff] = useState(false);

    const openModalForSearchDestuff = () => {
        setisModalOpenForSearchDestuff(true);
        search1('');
    }

    const closeModalForSearchDestuff = () => {
        setisModalOpenForSearchDestuff(false);
        setSearch('');
    }

    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState([]);

    const search1 = (val) => {
        axios.get(`${ipaddress}destuff/searchData?cid=${companyid}&bid=${branchId}&search=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setSearchData(response.data);
            })
            .catch((error) => {

            })
    }

    const clearDestuffSearch = () => {
        setSearch('');
        search1('');
    }


    const [currentPage3, setCurrentPage3] = useState(1);
    const [itemsPerPage3] = useState(5);

    const indexOfLastItem3 = currentPage3 * itemsPerPage3;
    const indexOfFirstItem3 = indexOfLastItem3 - itemsPerPage3;
    const currentItems3 = searchData.slice(indexOfFirstItem3, indexOfLastItem3);
    const totalPages3 = Math.ceil(searchData.length / itemsPerPage3);

    // Function to handle page change
    const handlePageChange3 = (page) => {
        console.log("Requested Page:", page);
        if (page >= 1 && page <= totalPages3) {
            setCurrentPage3(page);
        }
    };
    const displayPages3 = () => {
        const centerPageCount = 5;
        const middlePage = Math.floor(centerPageCount / 2);
        let startPage = currentPage3 - middlePage;
        let endPage = currentPage3 + middlePage;

        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(totalPages3, centerPageCount);
        }

        if (endPage > totalPages3) {
            endPage = totalPages3;
            startPage = Math.max(1, totalPages3 - centerPageCount + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    const selectSearchDestuff = (igm, igmTransId, line, destuffid) => {
        console.log('igm, igmTransId, line, destuffid ', igm, igmTransId, line, destuffid);

        setLoading(true);
        const params = new URLSearchParams({
            cid: companyid,
            bid: branchId,
            igm: igm,
            igmTransId: igmTransId,
            line: line,
            destuffid: destuffid,
        }).toString();
        axios.get(`${ipaddress}destuff/selectSearchedData?${params}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                console.log('data for destuff ', data);

                setDestuff({
                    companyId: data.destuff.companyId || '',
                    branchId: data.destuff.branchId || '',
                    finYear: data.destuff.finYear || '',
                    deStuffId: data.destuff.deStuffId || '',
                    deStuffDate: new Date(data.destuff.deStuffDate) || null,
                    profitcentreId: data.destuff.profitcentreId || '',
                    igmTransId: data.destuff.igmTransId || '',
                    igmNo: data.destuff.igmNo || '',
                    igmLineNo: data.destuff.igmLineNo || '',
                    igmDate: data.destuff.igmDate === null ? null : new Date(data.destuff.igmDate) || null,
                    transType: data.destuff.transType || '',
                    drt: data.destuff.drt || '',
                    viaNo: data.destuff.viaNo || '',
                    shippingAgent: data.destuff.shippingAgent || '',
                    shippingLine: data.destuff.shippingLine || '',
                    containerNo: data.destuff.containerNo || '',
                    containerType: data.destuff.containerType || '',
                    containerSize: data.destuff.containerSize || '',
                    containerStatus: data.destuff.containerStatus || '',
                    haz: data.destuff.haz || '',
                    periodicBill: data.destuff.periodicBill || '',
                    grossWeight: data.destuff.grossWeight || 0.0,
                    containerSealNo: data.destuff.containerSealNo || '',
                    customSealNo: data.destuff.customSealNo || '',
                    saSealNo: data.destuff.saSealNo || '',
                    onAccountOf: data.destuff.onAccountOf || '',
                    gateInId: data.destuff.gateInId || '',
                    gateInDate: data.destuff.gateInDate === null ? null : new Date(data.destuff.gateInDate) || null,
                    yardLocation: data.destuff.yardLocation || '',
                    yardBlock: data.destuff.yardBlock || '',
                    blockCellNo: data.destuff.blockCellNo || '',
                    yardLocation1: data.destuff.yardLocation1 || '',
                    yardBlock1: data.destuff.yardBlock1 || '',
                    blockCellNo1: data.destuff.blockCellNo1 || '',
                    areaOccupied: data.destuff.areaOccupied || 0.0,
                    yardPackages: data.destuff.yardPackages || 0.0,
                    pod: data.destuff.pod || '',
                    invoiceType: data.destuff.invoiceType || '',
                    gateInType: data.destuff.gateInType || '',
                    shift: data.destuff.shift || 'Day',
                    blGainLossId: data.destuff.blGainLossId || '',
                    mtyStatus: data.destuff.mtyStatus || '',
                    mtyDate: data.destuff.mtyDate || null,
                    doEntryFlag: data.destuff.doEntryFlag || '',
                    doEntryDate: data.destuff.doEntryDate || null,
                    status: data.destuff.status || '',
                    createdBy: data.destuff.createdBy || '',
                    createdDate: new Date(data.destuff.createdDate) || null,
                    editedBy: data.destuff.editedBy || '',
                    editedDate: new Date(data.destuff.editedDate) || null,
                    approvedBy: data.destuff.approvedBy || '',
                    approvedDate: new Date(data.destuff.approvedDate) || null,
                    destuffType: data.destuff.destuffType || 'DSTF',
                    destuffFromDate: data.destuff.destuffFromDate === null ? null : new Date(data.destuff.destuffFromDate) || null,
                    destuffToDate: data.destuff.destuffToDate === null ? null : new Date(data.destuff.destuffToDate) || null,
                    workOrderNo: data.destuff.workOrderNo || ''

                });
                setContDoDate(new Date(data.doDate === null ? null : data.doDate) || null);
                setContDoNo(data.doNo || '');
                setContDoValidityDate(new Date(data.doValidityDate === null ? null : data.doValidityDate) || null);
                setContOocDate(new Date(data.oocDate === null ? null : data.oocDate) || null);
                setContOocno(data.oocNo || '');
                setConHaz(data.destuff.haz);
                setpartyName(data.destuff.approvedBy || '',);
                setDestuffCrgs(data.crg.map(item => ({
                    companyId: item.companyId || '',
                    branchId: item.branchId || '',
                    finYear: new Date().getFullYear(),
                    deStuffId: item.deStuffId || '',
                    deStuffLineId: item.deStuffLineId || '',
                    deStuffDate: item.deStuffDate === null ? null : new Date(item.deStuffDate) || null,
                    igmTransId: item.igmTransId || '',
                    igmNo: item.igmNo || '',
                    profitcentreId: item.profitcentreId || '',
                    igmLineNo: item.igmLineNo || '',
                    commodityDescription: item.commodityDescription || '',
                    comments: item.comments || '',
                    marksOfNumbers: item.marksOfNumbers || '',
                    grossWeight: item.grossWeight || '',
                    typeOfPackages: item.typeOfPackages || '',
                    noOfPackages: item.noOfPackages || '',
                    actualNoOfPackages: 0,
                    oldActualNoOfPackages: item.oldActualNoOfPackages || '',
                    oldYardPackages: item.oldYardPackages || '',
                    onAccountOf: item.onAccountOf || '',
                    gainLossPackages: item.gainLossPackages || 0,
                    damagedPackages: item.damagedPackages || 0,
                    blGainLoss: item.blGainLoss || 'O',
                    importerName: item.importerName || '',
                    importerAddress1: item.importerAddress1 || '',
                    importerAddress2: item.importerAddress2 || '',
                    importerAddress3: item.importerAddress3 || '',
                    yardLocation: item.yardLocation || '',
                    yardBlock: item.yardBlock || '',
                    blockCellNo: item.blockCellNo || '',
                    areaOccupied: item.areaOccupied || "0.0",
                    yardPackages: item.yardPackages || "0.0",
                    examTallyId: item.examTallyId || '',
                    examDate: item.examDate || null,
                    examTallyLineId: item.examTallyLineId || '',
                    qtyTakenOut: item.qtyTakenOut || 0,
                    invoiceType: item.invoiceType || '',
                    gateInType: item.gateInType || '',
                    destuffCharges: item.destuffCharges || "0.0",
                    fob: item.fob || "0.0",
                    sampleSlipId: item.sampleSlipId || '',
                    forceEntryFlag: item.forceEntryFlag || '',
                    forceEntryDate: item.forceEntryDate || null,
                    forceEntryApproval: item.forceEntryApproval || '',
                    forceEntryRemarks: item.forceEntryRemarks || '',
                    status: item.status || '',
                    createdBy: item.createdBy || '',
                    createdDate: item.createdDate || null,
                    editedBy: item.editedBy || '',
                    editedDate: item.editedDate || null,
                    approvedBy: item.approvedBy || '',
                    approvedDate: item.approvedDate || null,
                    destuffType: item.destuffType || '',
                    lclZeroEntryFlag: item.lclZeroEntryFlag || '',
                    lclZeroEntryDate: item.lclZeroEntryDate || null,
                    lclZeroEntryValidityDate: item.lclZeroEntryValidityDate || null,
                    lclZeroEntryCreatedBy: item.lclZeroEntryCreatedBy || '',
                    lclZeroEntryApproval: item.lclZeroEntryApproval || '',
                    lclZeroEntryRemarks: item.lclZeroEntryRemarks || '',
                    actualWeight: 0.0,
                    oldActualWeight: item.oldActualWeight || 0.0,
                    cargoType: item.cargoType || '',
                    warehouseLocation: item.warehouseLocation || '',
                    movementType: item.movementType || '',
                    excessPackages: item.excessPackages || "0.0",
                    shortagePackages: item.shortagePackages || "0.0",
                    forceEntryFlagInv: item.forceEntryFlagInv || '',
                    length: item.length || '',
                    height: item.height || '',
                    weight: item.weight || '',
                    odcType: item.odcType || '',
                    typeOfCargo: item.typeOfCargo || '',
                })));
                closeModalForSearchDestuff();
                setFlag('edit');
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
            })
    }



    const [destuffCon, setDestuffCon] = useState([{
        companyId: '',
        branchId: '',
        finYear: '',
        igmTransId: '',
        profitcentreId: '',
        igmNo: '',
        shift: '',
        igmLineNo: '',
        containerNo: '',
        containerTransId: '',
        containerSize: '',
        containerType: '',
        haz: '',
        containerWeight: 0.0,
        containerSealNo: '',
        actualNoOfPackages: 0.0,
        damagedNoOfPackages: 0.0,
        oldActualNoOfPackages: 0.0,
        gainOrLossPkgs: 0.0,
        yardLocation: '',
        yardBlock: '',
        blockCellNo: '',
        deStuffId: '',
        destuffStatus: 'N',
        deStuffDate: null, // Use null for Date fields, or use a default date value like new Date()
        gateInId: '',
        gateInDate: null, // Use null for Date fields, or use a default date value like new Date()
        cargoWt: 0.0,
        grossWt: 0.0,
        noOfPackages: 0,
        status: '',
        holdStatus: '',
    }]);

    // Function to update the state
    const handleDestuffCrgChange = (e) => {



        const { name, value } = e.target;
        let sanitizedValue = value;
        // if (['cargoValue', 'cargoDuty', 'beWt', 'mobileNo'].includes(name)) {
        //     sanitizedValue = handleInputChange(value);
        // }
        setDestuffCrgs(prevState => ({
            ...prevState,
            [name]: sanitizedValue

        }));



    };

    function handleInputChange1(e, val1, val2) {
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

    const handleDestuffCrgChangeItemWise = (e) => {



        const { name, value } = e.target;
        let sanitizedValue = value;
        if (['length', 'height', 'weight'].includes(name)) {
            sanitizedValue = handleInputChange1(value, 13, 3);
        }
        setDestuffCrg(prevState => ({
            ...prevState,
            [name]: sanitizedValue

        }));

        setFormErrors1(prevState => ({
            ...prevState,
            [name]: '',

        }));


        if (name === 'typeOfCargo' && sanitizedValue !== 'ODC') {
            setDestuffCrg(prevState => ({
                ...prevState,
                odcType: '',
                length: '',
                height: '',
                weight: ''

            }));
            setFormErrors1(prevState => ({
                ...prevState,
                odcType: '',
                length: '',
                height: '',
                weight: ''

            }));
        }



    };


    const [destuffCrg, setDestuffCrg] = useState(
        {
            companyId: '',
            branchId: '',
            finYear: '',
            igmTransId: '',
            igmCrgTransId: '',
            profitcentreId: '',
            igmLineNo: '',
            igmNo: '',
            viaNo: '',
            importerName: '',
            importerAddress1: '',
            importerAddress2: '',
            importerAddress3: '',
            commodityDescription: '',
            marksOfNumbers: '',
            length: '',
            height: '',
            weight: '',
            odcType: '',
            typeOfCargo: ''
        }
        // Add more objects as needed
    );

    const [sl, setSl] = useState('');
    const [cha, setCha] = useState('');
    const [igmDate, setIgmDate] = useState(null);
    const [shift, setShift] = useState('Day');
    const [haz, setHaz] = useState('N');


    const handleDestuffCon = (e, index) => {

        const { name, value } = e.target;
        let sanitizedValue = value;
        if (['actualNoOfPackages', 'damagedNoOfPackages'].includes(name)) {
            sanitizedValue = handleInputChange(value);

            if (name === 'actualNoOfPackages') {
                const oldPack = destuffCon[index].oldActualNoOfPackages || 0;
                const nop = destuffCon[index].noOfPackages || 0;

                if ((nop - oldPack) < sanitizedValue) {
                    sanitizedValue = 0;
                }
            }
        }
        setDestuffCon(prevState => {
            const updatedData = [...prevState];
            updatedData[index] = {
                ...updatedData[index],
                [name]: sanitizedValue
            };
            return updatedData;
        });


        // Remove error for the specific field
        setItemWiseError(prevErrors => {
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

    const [igm, setIgm] = useState('');
    const [item, setItem] = useState('');

    const [itemOocNo, setItemOocno] = useState('');
    const [itemOocDate, setItemOocDate] = useState(null);
    const [itemDoNo, setItemDoNo] = useState('')
    const [itemDoDate, setItemDoDate] = useState(null)
    const [itemDoValidityDate, setItemDoValidityDate] = useState(null)

    const searchDestuffItemWiseData = (igm, item) => {
        setFormErrors1({
            odcType: '',
            length: '',
            height: '',
            weight: ''
        })
        setLoading(true);
        if (!igm) {
            toast.error("IGM No is required", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }

        if (!item) {
            toast.error("Item No is required", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }

        axios.get(`${ipaddress}destuff/getDataForDestuffItemWise?cid=${companyid}&bid=${branchId}&igmNo=${igm}&itemNo=${item}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                console.log('data data ', data);

                setDestuffCrg({
                    companyId: '',
                    branchId: '',
                    finYear: '',
                    igmTransId: data.crg[0][1] || '',
                    igmCrgTransId: '',
                    profitcentreId: '',
                    igmLineNo: data.crg[0][2] || '',
                    igmNo: data.crg[0][0] || '',
                    viaNo: data.crg[0][12] || '',
                    importerName: data.crg[0][7] || '',
                    importerAddress1: data.crg[0][8] || '',
                    importerAddress2: data.crg[0][9] || '',
                    importerAddress3: data.crg[0][10] || '',
                    commodityDescription: data.crg[0][11] || '',
                    marksOfNumbers: data.crg[0][14] || '',
                    length: data.crg[0][25] || '',
                    height: data.crg[0][26] || '',
                    weight: data.crg[0][27] || '',
                    odcType: data.crg[0][24] || '',
                    typeOfCargo: data.crg[0][23] || '',
                });
                setSl(data.crg[0][5]);
                setCha(data.crg[0][6]);
                setIgmDate(data.crg[0][13] === null ? null : new Date(data.crg[0][13]));
                setShift(data.container[0].shift || 'Day')
                setHaz(data.container[0].haz || 'N')

                setItemDoDate(data.container[0].doDate === null ? null : new Date(data.container[0].doDate));
                setItemDoNo(data.container[0].doNo);
                setItemDoValidityDate(data.container[0].doValidityDate === null ? null : new Date(data.container[0].doValidityDate))
                setItemOocDate(data.container[0].oocDate === null ? null : new Date(data.container[0].oocDate));
                setItemOocno(data.container[0].oocNo);

                setDestuffCon(data.container.map(item => ({
                    companyId: item.companyId || '',
                    branchId: item.branchId || '',
                    finYear: item.finYear || '',
                    igmTransId: item.igmTransId || '',
                    profitcentreId: item.profitcentreId || '',
                    igmNo: item.igmNo || '',
                    shift: item.shift || '',
                    igmLineNo: item.igmLineNo || '',
                    containerNo: item.containerNo || '',
                    containerTransId: item.containerTransId || '',
                    containerSize: item.containerSize || '',
                    containerType: item.containerType || '',
                    haz: item.haz || '',
                    containerWeight: item.containerWeight || 0.0,
                    containerSealNo: item.containerSealNo || '',
                    actualNoOfPackages: 0.0,
                    damagedNoOfPackages: item.damagedNoOfPackages || 0.0,
                    gainOrLossPkgs: item.gainOrLossPkgs || 0.0,
                    oldActualNoOfPackages: item.oldActualNoOfPackages || 0.0,
                    yardLocation: item.yardLocation || '',
                    yardBlock: item.yardBlock || '',
                    blockCellNo: item.blockCellNo || '',
                    deStuffId: item.deStuffId || '',
                    deStuffDate: item.deStuffDate === null ? null : new Date(item.deStuffDate), // Use null for Date fields, or use a default date value like new Date()
                    destuffStatus: item.destuffStatus || 'N',
                    gateInId: item.gateInId || '',
                    gateInDate: item.gateInDate === null ? null : new Date(item.gateInDate) || null, // Use null for Date fields, or use a default date value like new Date()
                    cargoWt: item.containerWeight || 0.0,
                    grossWt: item.grossWt || 0.0,
                    noOfPackages: item.noOfPackages || 0,
                    status: item.status || '',
                    holdStatus: item.holdStatus || ''
                })));

                setLoading(false);

                const allHaveSealCutWoTransId = data.container.every(item => item.deStuffId !== '');
                setSelectAll(allHaveSealCutWoTransId);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                handleItemWiseClear();
                setLoading(false);
            })
    }

    const handleItemWiseClear = () => {
        if (igm1 && !item1 && !cont) {
            setIgm(igm);
        }
        else {
            setIgm('');
        }

        setFormErrors1({
            odcType: '',
            length: '',
            height: '',
            weight: ''
        })


        setSelectJobOrder('');
        setItemDoDate(null);
        setItemDoNo('');
        setItemDoValidityDate(null);
        setItemOocDate(null);
        setItemOocno('');
        setItem('');
        setSelectAll(false);
        setDestuffCon([{
            companyId: '',
            branchId: '',
            finYear: '',
            igmTransId: '',
            profitcentreId: '',
            igmNo: '',
            shift: '',
            igmLineNo: '',
            containerNo: '',
            containerTransId: '',
            containerSize: '',
            containerType: '',
            haz: '',
            containerWeight: 0.0,
            containerSealNo: '',
            actualNoOfPackages: 0.0,
            damagedNoOfPackages: 0.0,
            gainOrLossPkgs: 0.0,
            oldActualNoOfPackages: 0.0,
            yardLocation: '',
            yardBlock: '',
            blockCellNo: '',
            deStuffId: '',
            deStuffDate: null, // Use null for Date fields, or use a default date value like new Date()
            destuffStatus: 'N',
            gateInId: '',
            gateInDate: null, // Use null for Date fields, or use a default date value like new Date()
            cargoWt: 0.0,
            grossWt: 0.0,
            noOfPackages: 0,
            status: '',
            holdStatus: ''
        }])
        setItemWiseError([]);

        setDestuffCrg({
            companyId: '',
            branchId: '',
            finYear: '',
            igmTransId: '',
            igmCrgTransId: '',
            profitcentreId: '',
            igmLineNo: '',
            igmNo: '',
            viaNo: '',
            importerName: '',
            importerAddress1: '',
            importerAddress2: '',
            importerAddress3: '',
            commodityDescription: '',
            marksOfNumbers: '',
            length: '',
            height: '',
            weight: '',
            odcType: '',
            typeOfCargo: ''
        })
        setSl('');
        setCha('');
        setIgmDate(null);
        setShift('Day');
        setHaz('N');
    }




    const [itemWiseError, setItemWiseError] = useState([]);

    const [selectAll, setSelectAll] = useState(false);

    const handleSelectAllRows = (e) => {
        const { checked } = e.target;
        setSelectAll(checked);

        const updatedData = destuffCon.map((item) => ({
            ...item,
            destuffStatus: item.deStuffId === '' ? (checked ? 'Y' : 'N') : 'Y',
        }));


        setDestuffCon(updatedData);
    };

    const handleDestuffConChange = (e, index) => {
        const { name, checked } = e.target;

        setDestuffCon((prevState) => {
            const updatedData = [...prevState];
            updatedData[index] = {
                ...updatedData[index],
                [name]: checked ? 'Y' : 'N',
            };

            // Check if all rows are selected
            const allSelected = updatedData.every((item) => item.destuffStatus === 'Y');
            setSelectAll(allSelected);

            return updatedData;
        });
    };

    const [formErrors1, setFormErrors1] = useState({
        odcType: '',
        length: '',
        height: '',
        weight: ''
    })

    const saveItemWiseDestuff = () => {

        setFormErrors1({
            odcType: '',
            length: '',
            height: '',
            weight: ''
        })

        let errors = {};

        if (!destuffCrg.odcType) {
            errors.odcType = "Odc type is required."
        }

        if (!destuffCrg.length || destuffCrg.length <= 0) {
            errors.length = "Length is required."
        }

        if (!destuffCrg.height || destuffCrg.height <= 0) {
            errors.height = "Height is required."
        }

        if (!destuffCrg.weight || destuffCrg.weight <= 0) {
            errors.weight = "Weight is required."
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors1(errors);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            })
            return;
        }

        setLoading(true);
        const checkSealCutting = destuffCon.some(item => item.destuffStatus === 'Y');
        if (!checkSealCutting) {
            toast.error("Please select atleast one checkbox.", {
                autoClose: 1000
            })
            setLoading(false);
            return;
        }
        let newErrors = destuffCon.map(() => ({}));
        setItemWiseError([]);

        destuffCon.forEach((data, index) => {
            if (data.destuffStatus === "Y") {
                let rowErrors = {};
                if (!data.actualNoOfPackages && !data.oldActualNoOfPackages) rowErrors.actualNoOfPackages = "Actual No. Of Packages is required.";
                if (data.actualNoOfPackages && data.actualNoOfPackages > data.noOfPackages) rowErrors.actualNoOfPackages = "Actual No. Of Packages cannot be greater than no. of packages";
                if (data.damagedNoOfPackages > data.noOfPackages) rowErrors.damagedNoOfPackages = "Damaged No. Of Packages cannot be greater than no. of packages";


                if (Object.keys(rowErrors).length > 0) {
                    newErrors[index] = rowErrors;
                }
            }
        });

        // Check if any errors exist
        const hasErrors = newErrors.some(errorObj => Object.keys(errorObj).length > 0);

        if (hasErrors) {
            console.log('newErrors ', newErrors);
            setItemWiseError(newErrors);
            setLoading(false);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            });

            return;
        }

        const destuffRecords = destuffCon.filter(item => item.destuffStatus === 'Y');

        const formData = {
            crg: destuffCrg,
            container: destuffRecords
        }

        axios.post(`${ipaddress}destuff/saveItemWiseDestuff?cid=${companyid}&bid=${branchId}&user=${userId}&shift=${shift}&haz=${haz}`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                console.log('data data ', data);

                setDestuffCrg({
                    companyId: '',
                    branchId: '',
                    finYear: '',
                    igmTransId: data.crg[0][1] || '',
                    igmCrgTransId: '',
                    profitcentreId: '',
                    igmLineNo: data.crg[0][2] || '',
                    igmNo: data.crg[0][0] || '',
                    viaNo: data.crg[0][12] || '',
                    importerName: data.crg[0][7] || '',
                    importerAddress1: data.crg[0][8] || '',
                    importerAddress2: data.crg[0][9] || '',
                    importerAddress3: data.crg[0][10] || '',
                    commodityDescription: data.crg[0][11] || '',
                    marksOfNumbers: data.crg[0][14] || '',
                    length: data.crg[0][25] || '',
                    height: data.crg[0][26] || '',
                    weight: data.crg[0][27] || '',
                    odcType: data.crg[0][24] || '',
                    typeOfCargo: data.crg[0][23] || '',
                });
                setSl(data.crg[0][5]);
                setCha(data.crg[0][6]);
                setIgmDate(data.crg[0][13] === null ? null : new Date(data.crg[0][13]));
                setShift(data.container[0].shift || 'Day')
                setHaz(data.container[0].haz || 'N')

                setDestuffCon(data.container.map(item => ({
                    companyId: item.companyId || '',
                    branchId: item.branchId || '',
                    finYear: item.finYear || '',
                    igmTransId: item.igmTransId || '',
                    profitcentreId: item.profitcentreId || '',
                    igmNo: item.igmNo || '',
                    shift: item.shift || '',
                    igmLineNo: item.igmLineNo || '',
                    containerNo: item.containerNo || '',
                    containerTransId: item.containerTransId || '',
                    containerSize: item.containerSize || '',
                    containerType: item.containerType || '',
                    haz: item.haz || '',
                    containerWeight: item.containerWeight || 0.0,
                    containerSealNo: item.containerSealNo || '',
                    actualNoOfPackages: 0.0,
                    damagedNoOfPackages: item.damagedNoOfPackages || 0.0,
                    gainOrLossPkgs: item.gainOrLossPkgs || 0.0,
                    oldActualNoOfPackages: item.oldActualNoOfPackages || 0.0,
                    yardLocation: item.yardLocation || '',
                    yardBlock: item.yardBlock || '',
                    blockCellNo: item.blockCellNo || '',
                    deStuffId: item.deStuffId || '',
                    deStuffDate: item.deStuffDate === null ? null : new Date(item.deStuffDate) || null, // Use null for Date fields, or use a default date value like new Date()
                    destuffStatus: item.destuffStatus || 'N',
                    gateInId: item.gateInId || '',
                    gateInDate: item.gateInDate === null ? null : new Date(item.gateInDate) || null, // Use null for Date fields, or use a default date value like new Date()
                    cargoWt: item.containerWeight || 0.0,
                    grossWt: item.grossWt || 0.0,
                    noOfPackages: item.noOfPackages || 0,
                    status: item.status || '',
                })));
                toast.success("Data save successfully!!!", {
                    autoClose: 800
                })
                setLoading(false);
                onRequest();
                const allHaveSealCutWoTransId = data.container.every(item => item.deStuffId !== '');
                setSelectAll(allHaveSealCutWoTransId);
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
            setSelectedItems(destuffCon.map(item => item.containerNo));
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
            const allSelected = destuffCon.every(item => updatedSelectedItems.includes(item.containerNo));
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
            igm: destuffCrg.igmNo,
            igmLine: destuffCrg.igmLineNo,
            igmTransId: destuffCrg.igmTransId,
            finYear: new Date().getFullYear(),
        }).toString();

        // Send the POST request with query parameters and body
        axios.post(`${ipaddress}equipmentActivity/saveDestuffEquipment?${params}`, selectedItems, {
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
            igm: destuffCrg.igmNo,
            igmLine: destuffCrg.igmLineNo,
            igmTransId: destuffCrg.igmTransId,
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
                    igm: destuffCrg.igmNo,
                    igmLine: destuffCrg.igmLineNo,
                    igmTransId: destuffCrg.igmTransId,
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
            igm: destuff.igmNo,
            igmLine: destuff.igmLineNo,
            igmTransId: destuff.igmTransId,
            container: destuff.containerNo
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
            igm: destuff.igmNo,
            igmLine: destuff.igmLineNo,
            igmTransId: destuff.igmTransId,
            finYear: new Date().getFullYear(),
            container: destuff.containerNo
        }).toString();

        // Send the POST request with query parameters and body
        axios.post(`${ipaddress}equipmentActivity/saveDestuffContainerEquipment?${params}`, null, {
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
                    igm: destuff.igmNo,
                    igmLine: destuff.igmLineNo,
                    igmTransId: destuff.igmTransId,
                    equipment: equi,
                    vendor: ven,
                    container: destuff.containerNo
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

    // useEffect(() => {
    //     if (selectSealCuttingType === 'containerwise') {
    //         const updatedGrossWeight = destuff.transType === 'LCL'
    //             ? destuffCrgs.reduce((total, item) => {
    //                 const weight = Number(item.actualWeight) || 0;
    //                 return total + weight;
    //             }, 0)
    //             : destuff.grossWeight;

    //         const updatedYardPackages = destuffCrgs.reduce((total, item) => {
    //             const packages = Number(item.yardPackages) || 0;
    //             return total + packages;
    //         }, 0);

    //         const updatedAreaOccupied = destuffCrgs.reduce((total, item) => {
    //             const area = Number(item.areaOccupied) || 0;
    //             return total + area;
    //         }, 0.0);

    //         setDestuff({
    //             ...destuff,
    //             grossWeight: updatedGrossWeight,
    //             yardPackages: updatedYardPackages,
    //             areaOccupied: updatedAreaOccupied,
    //         });
    //     }
    // }, [selectSealCuttingType, destuffCrgs, destuff.transType]);

    const [selectJobOrder, setSelectJobOrder] = useState('');

    const downloadItemWiseReport = () => {

        // if (selectJobOrder === '') {
        //     toast.error("Please select job order id", {
        //         autoClose: 800
        //     })
        //     return;
        // }


        setLoading(true);
        axios
            .post(
                `${ipaddress}importReports/importDestuffItemwiseReport?cid=${companyid}&bid=${branchId}&igm=${destuffCrg.igmNo}&line=${destuffCrg.igmLineNo}&trans=${destuffCrg.igmTransId}`,
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


    const downloadContWiseFCLReport = () => {

        // if (selectJobOrder === '') {
        //     toast.error("Please select job order id", {
        //         autoClose: 800
        //     })
        //     return;
        // }

        console.log('destuff ', destuff);


        setLoading(true);
        axios
            .post(
                `${ipaddress}importReports/importDestuffContwiseFCLReport?cid=${companyid}&bid=${branchId}&igm=${destuff.igmNo}&con=${destuff.containerNo}&trans=${destuff.igmTransId}&transType=${destuff.transType}`,
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
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            });
    };



    return (
        <div>
            <Row>
                <Col md={3}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Destuff Type
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
                                /> Add Equipment</h5>



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
                                                value={destuffCrg.igmTransId}
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
                                                value={destuffCrg.igmNo}
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
                                                value={destuffCrg.igmLineNo}
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
                                                <th scope="col">Destuff Id</th>
                                                <th scope="col">Container No</th>
                                                <th scope="col">Container Size</th>
                                                <th scope="col">Container Type</th>

                                                <th scope="col">Status</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {destuffCon
                                                .filter(item => item.deStuffId !== '').map((item, index) => (
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
                                                        <td>{item.deStuffId}</td>
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
                                    value={igm}
                                    onChange={(e) => setIgm(e.target.value)}

                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Item No
                                </label>
                                {(igm1 && !item1 && !cont) ? (
                                    <Input
                                        className="form-control"
                                        type="select"
                                        id="fobValueInDollar"
                                        value={item}
                                        onChange={(e) => setItem(e.target.value)}
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
                                            value={item}
                                            onChange={(e) => setItem(e.target.value)}
                                        />
                                    )
                                }
                                {/* <Input
                                    className="form-control"
                                    type="text"
                                    id="fobValueInDollar"
                                    value={item}
                                    onChange={(e) => setItem(e.target.value)}
                                /> */}
                            </FormGroup>
                        </Col>
                        <Col md={3} style={{ marginTop: 25 }}>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={() => searchDestuffItemWiseData(igm, item)}
                            >
                                <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                Search
                            </button>
                        </Col>
                        {destuffCrg.igmTransId != '' && (
                            <>
                                <Row>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Shipping Line
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="sl"
                                                name='sl'
                                                value={sl}
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
                                                id="cha"
                                                name='cha'
                                                value={cha}
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
                                                onChange={handleDestuffCrgChangeItemWise}
                                                value={destuffCrg.importerName}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Importer Address1
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="importerAddress1"
                                                name='importerAddress1'
                                                onChange={handleDestuffCrgChangeItemWise}
                                                value={destuffCrg.importerAddress1}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Importer Address2
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="importerAddress2"
                                                name='importerAddress2'
                                                onChange={handleDestuffCrgChangeItemWise}
                                                value={destuffCrg.importerAddress2}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Importer Address3
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="importerAddress3"
                                                name='importerAddress3'
                                                onChange={handleDestuffCrgChangeItemWise}
                                                value={destuffCrg.importerAddress3}
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
                                                onChange={handleDestuffCrgChangeItemWise}
                                                value={destuffCrg.commodityDescription}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Trans Type
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="fobValueInDollar"
                                                value="FCL"

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
                                                id='viaNo'
                                                name='viaNo'
                                                value={destuffCrg.viaNo}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                IGM Trans Id
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="igmTransId"
                                                name='igmTransId'
                                                onChange={handleDestuffCrgChangeItemWise}
                                                value={destuffCrg.igmTransId}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                IGM Date
                                            </label>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={igmDate}
                                                    onChange={(date) => setIgmDate(date)}

                                                    id="igmDate"
                                                    name="igmDate"
                                                    dateFormat="dd/MM/yyyy"
                                                    timeInputLabel="Time:"
                                                    showTimeInput
                                                    disabled
                                                    timeFormat="HH:mm"
                                                    timeIntervals={15}
                                                    className="form-control border-right-0 inputField"
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
                                                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Marks Nos
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="textarea"
                                                id="marksOfNumbers"
                                                name='marksOfNumbers'
                                                onChange={handleDestuffCrgChangeItemWise}
                                                value={destuffCrg.marksOfNumbers}
                                                disabled
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={2}>
                                        <Row>
                                            <Col md={7}>
                                                <FormGroup>
                                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                        Shift Id
                                                    </label>
                                                    <Input
                                                        className="form-control"
                                                        type="select"
                                                        id="shift"
                                                        name='shift'
                                                        value={shift}
                                                        onChange={(e) => setShift(e.target.value)}
                                                    >
                                                        <option value="Day">Day</option>
                                                        <option value="Second">Second</option>
                                                        <option value="Third">Third</option>

                                                    </Input>


                                                </FormGroup>
                                            </Col>
                                            <Col md={5}>
                                                <FormGroup>
                                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                        HAZ
                                                    </label>
                                                    <Input
                                                        className="form-control"
                                                        type="select"
                                                        id="haz"
                                                        name='haz'
                                                        value={haz}
                                                        onChange={(e) => setHaz(e.target.value)}
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

                                            <label className="forlabel bold-label">Do No</label>
                                            <Input
                                                type="text"
                                                name="itemDoNo"
                                                className="form-control inputField"
                                                value={itemDoNo}
                                                id='itemDoNo'

                                                disabled
                                                onChange={(e) => setItemDoNo(e.target.value)}
                                                maxLength={30}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label">OOC No</label>
                                            <Input
                                                type="text"
                                                name="itemOocNo"
                                                className="form-control inputField"
                                                value={itemOocNo}
                                                id='itemOocNo'
                                                disabled
                                                onChange={(e) => setItemOocno(e.target.value)}
                                                maxLength={20}
                                            />
                                            {/* <div style={{ color: 'red' }} className="error-message">{!itemOocNo ? 'OOC No is required.' : ''}</div> */}
                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label">OOC Date</label>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={itemOocDate}
                                                    onChange={(date) => {
                                                        setItemOocDate(date);

                                                    }}
                                                    id='itemOocDate'
                                                    name='itemOocDate'
                                                    showTimeInput
                                                    disabled
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
                                            <label className="forlabel bold-label">DO Date</label>
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
                                                    disabled
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
                                            <label className="forlabel bold-label">DO Validity Date</label>
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
                                </Row>
                                <Row>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label">Type Of Cargo</label>
                                            <Input
                                                type="select"
                                                name="typeOfCargo"
                                                className="form-control inputField"
                                                value={destuffCrg.typeOfCargo}
                                                id='typeOfCargo'
                                                onChange={handleDestuffCrgChangeItemWise}
                                            >
                                                <option value=""> Select Type Of Cargo</option>
                                                <option value="General"> General</option>
                                                <option value="Hazardous"> Hazardous</option>
                                                <option value="ODC"> ODC</option>
                                                <option value="Reefer"> Reefer</option>

                                                <option value="Tank"> Tank</option>
                                                <option value="TankHaz"> Tank_Haz</option>
                                                {/* <option value="ReeferHaz"> Reefer_Haz</option> */}
                                                <option value="FlatTrack"> FlatTrack</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label">Type Of ODC <span style={{ color: 'red' }}>*</span></label>
                                            <Input
                                                type="select"
                                                name="odcType"
                                                className={`form-control inputField  ${formErrors1.odcType ? 'error-border' : ''}`}
                                                value={destuffCrg.odcType}
                                                id='odcType'
                                                disabled={destuffCrg.typeOfCargo !== 'ODC'}
                                                onChange={handleDestuffCrgChangeItemWise}
                                            >
                                                <option value=""> Select ODC Type</option>
                                                <option value="Heavy Machinery and Equipment"> Heavy Machinery and Equipment</option>
                                                <option value="Large Structures and Components"> Large Structures and Components</option>
                                                <option value="Offshore and Energy Equipment"> Offshore and Energy Equipment</option>
                                            </Input>
                                            <div style={{ color: 'red' }} className="error-message">{formErrors1.odcType}</div>
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label">Length <span style={{ color: 'red' }}>*</span></label>
                                            <Input
                                                type="text"
                                                name="length"
                                                className={`form-control inputField  ${formErrors1.length ? 'error-border' : ''}`}
                                                value={destuffCrg.length}
                                                disabled={destuffCrg.typeOfCargo !== 'ODC'}

                                                id='length'
                                                onChange={handleDestuffCrgChangeItemWise}
                                            />
                                            <div style={{ color: 'red' }} className="error-message">{formErrors1.length}</div>
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label">Height <span style={{ color: 'red' }}>*</span></label>
                                            <Input
                                                type="text"
                                                name="height"
                                                className={`form-control inputField  ${formErrors1.height ? 'error-border' : ''}`}
                                                value={destuffCrg.height}
                                                disabled={destuffCrg.typeOfCargo !== 'ODC'}

                                                id='height'
                                                onChange={handleDestuffCrgChangeItemWise}
                                            />
                                            <div style={{ color: 'red' }} className="error-message">{formErrors1.height}</div>
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label">Weight <span style={{ color: 'red' }}>*</span></label>
                                            <Input
                                                type="text"
                                                name="weight"
                                                className={`form-control inputField  ${formErrors1.weight ? 'error-border' : ''}`}
                                                value={destuffCrg.weight}
                                                disabled={destuffCrg.typeOfCargo !== 'ODC'}
                                                id='weight'
                                                onChange={handleDestuffCrgChangeItemWise}
                                            />
                                            <div style={{ color: 'red' }} className="error-message">{formErrors1.weight}</div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                {/* <Row>
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
                                                    destuffCon
                                                        .filter(item => item.deStuffId && item.deStuffId.trim() !== '') // Exclude null, undefined, and empty strings
                                                        .map(item => item.deStuffId) // Extract only sealCutWoTransId
                                                )].map((distinctId, index) => (
                                                    <option key={index} value={distinctId}>
                                                        {distinctId}
                                                    </option>
                                                ))}

                                            </Input>


                                        </FormGroup>
                                    </Col>
                                </Row> */}
                                <Row style={{ marginBottom: 10 }}>
                                    <Col md={4}>
                                        <button
                                            className="btn btn-outline-success btn-margin newButton"
                                            style={{ marginRight: 10 }}
                                            id="submitbtn2"
                                            onClick={openWorkOrderModal}
                                            disabled={!itemOocNo}
                                        >
                                            <FontAwesomeIcon icon={faAdd} style={{ marginRight: 5 }} />
                                            Add Equipment

                                        </button>
                                    </Col>
                                    <Col md={4} className='text-center'>
                                        <button
                                            className="btn btn-outline-primary btn-margin newButton"
                                            style={{ marginRight: 10 }}
                                            id="submitbtn2"
                                            onClick={saveItemWiseDestuff}
                                        // disabled={!itemOocNo}
                                        >
                                            <FontAwesomeIcon icon={faSave} style={{ marginRight: 5 }} />
                                            Save

                                        </button>
                                        <button
                                            className="btn btn-outline-danger btn-margin newButton"
                                            style={{ marginRight: 10 }}
                                            id="submitbtn2"
                                            onClick={handleItemWiseClear}
                                        >
                                            <FontAwesomeIcon icon={faRefresh} style={{ marginRight: 5 }} />
                                            Clear
                                        </button>
                                        <button
                                            className="btn btn-outline-success btn-margin newButton"
                                            style={{ marginRight: 10 }}
                                            id="submitbtn2"
                                            onClick={downloadItemWiseReport}
                                        // disabled={selectJobOrder === ''}
                                        >
                                            <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
                                            Print Report
                                        </button>
                                    </Col>
                                </Row>
                                <hr />
                                <div className="mt-3 table-responsive">
                                    <table className="table table-bordered table-hover tableHeader">
                                        <thead className="tableHeader">
                                            <tr>
                                                <th scope="col">
                                                    <Input
                                                        type="checkbox"
                                                        className="form-check-input radios"
                                                        style={{ width: 25, height: 25 }}
                                                        checked={selectAll}
                                                        onChange={handleSelectAllRows}
                                                    />
                                                </th>
                                                <th scope="col">Sr No</th>
                                                <th scope="col">Destuff Id</th>
                                                <th scope="col">Destuff Date</th>
                                                <th scope="col">Container No</th>
                                                <th scope="col">Size/Type</th>
                                                <th scope="col">Seal No</th>
                                                <th scope="col">Gate In Id</th>
                                                <th scope="col">Gate In Date</th>
                                                <th scope="col">Cargo Weight</th>
                                                <th scope="col">Gross Weight</th>
                                                <th scope="col">Yard CellNo</th>
                                                <th scope="col">No Of Pack</th>
                                                <th scope="col">Old Actual Qty</th>
                                                <th scope="col">Actual Qty</th>
                                                <th scope="col">Damaged Qty</th>
                                                <th scope="col">Gain Or Loss Pkgs</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {destuffCon.map((item, index) => (
                                                <tr>
                                                    <td>
                                                        <Input
                                                            type="checkbox"
                                                            className="form-check-input radios"
                                                            style={{ width: 25, height: 25 }}
                                                            checked={item.destuffStatus === 'Y' ? true : false}
                                                            disabled={(item.deStuffId !== '' ? true : false) || item.holdStatus === 'H'}
                                                            onChange={(e) => handleDestuffConChange(e, index)}
                                                            id={`destuffStatus${index}`}
                                                            name='destuffStatus'
                                                        />
                                                    </td>
                                                    <td>{index + 1}</td>
                                                    <td>{item.deStuffId}</td>
                                                    <td>
                                                        <div style={{ position: 'relative', width: 170 }}>
                                                            <DatePicker
                                                                selected={item.deStuffDate}

                                                                id="sbTransDate"
                                                                name="sbTransDate"
                                                                dateFormat="dd/MM/yyyy"
                                                                timeInputLabel="Time:"
                                                                showTimeInput
                                                                disabled
                                                                timeFormat="HH:mm"
                                                                timeIntervals={15}
                                                                className="form-control border-right-0 inputField"
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
                                                            <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                                        </div>
                                                    </td>
                                                    <td>{item.containerNo}  {item.holdStatus === 'H' ? <><br /><span style={{ color: 'red' }}>Container is hold</span></> : ''}</td>
                                                    <td>{item.containerSize}/{item.containerType}</td>
                                                    <td>{item.containerSealNo}</td>
                                                    <td>{item.gateInId}</td>
                                                    <td>
                                                        <div style={{ position: 'relative', width: 170 }}>
                                                            <DatePicker
                                                                selected={item.gateInDate}

                                                                id="sbTransDate"
                                                                name="sbTransDate"
                                                                dateFormat="dd/MM/yyyy HH:mm"
                                                                timeInputLabel="Time:"
                                                                showTimeInput
                                                                disabled
                                                                timeFormat="HH:mm"
                                                                timeIntervals={15}
                                                                className="form-control border-right-0 inputField"
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
                                                            <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                                        </div>
                                                    </td>
                                                    <td>{item.cargoWt}</td>
                                                    <td>{item.grossWt}</td>
                                                    <td>{item.blockCellNo}</td>
                                                    <td>{item.noOfPackages}</td>
                                                    <td>
                                                        <FormGroup>
                                                            <Input
                                                                className={`form-control  ${itemWiseError[index]?.oldActualNoOfPackages ? 'error-border' : ''}`}
                                                                type="text"
                                                                id={`oldActualNoOfPackages${index}`}
                                                                name='oldActualNoOfPackages'
                                                                disabled
                                                                style={{ width: 150 }}
                                                                value={item.oldActualNoOfPackages}
                                                                onChange={(e) => handleDestuffCon(e, index)}
                                                            />
                                                            <div style={{ color: 'red' }} className="error-message">{itemWiseError[index]?.oldActualNoOfPackages}</div>
                                                        </FormGroup>
                                                    </td>
                                                    <td>
                                                        <FormGroup>
                                                            <Input
                                                                className={`form-control  ${itemWiseError[index]?.actualNoOfPackages ? 'error-border' : ''}`}
                                                                type="text"
                                                                id={`actualNoOfPackages${index}`}
                                                                name='actualNoOfPackages'
                                                                style={{ width: 150 }}
                                                                value={item.actualNoOfPackages}
                                                                onChange={(e) => handleDestuffCon(e, index)}
                                                                maxLength={8}
                                                            />
                                                            <div style={{ color: 'red' }} className="error-message">{itemWiseError[index]?.actualNoOfPackages}</div>
                                                        </FormGroup>
                                                    </td>
                                                    <td>
                                                        <FormGroup>
                                                            <Input
                                                                className={`form-control  ${itemWiseError[index]?.damagedNoOfPackages ? 'error-border' : ''}`}
                                                                type="text"
                                                                id={`damagedNoOfPackages${index}`}
                                                                name='damagedNoOfPackages'
                                                                style={{ width: 150 }}
                                                                value={item.damagedNoOfPackages}
                                                                onChange={(e) => handleDestuffCon(e, index)}
                                                                maxLength={8}
                                                            />
                                                            <div style={{ color: 'red' }} className="error-message">{itemWiseError[index]?.damagedNoOfPackages}</div>
                                                        </FormGroup>
                                                    </td>
                                                    <td>
                                                        <FormGroup>
                                                            <Input
                                                                className={`form-control  ${itemWiseError[index]?.gainOrLossPkgs ? 'error-border' : ''}`}
                                                                type="text"
                                                                id={`gainOrLossPkgs${index}`}
                                                                name='gainOrLossPkgs'
                                                                style={{ width: 150 }}
                                                                value={item.gainOrLossPkgs}
                                                                onChange={(e) => handleDestuffCon(e, index)}
                                                                maxLength={8}
                                                            />
                                                            <div style={{ color: 'red' }} className="error-message">{itemWiseError[index]?.gainOrLossPkgs}</div>
                                                        </FormGroup>
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
                {selectSealCuttingType === 'containerwise' && (
                    <>
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
                                /> Add Equipment</h5>



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
                                                value={destuff.igmTransId}
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
                                                value={destuff.igmNo}
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
                                                value={destuff.igmLineNo}
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
                                                <td>{destuff.containerNo}</td>
                                                <td>{destuff.containerSize}</td>
                                                <td>{destuff.containerType}</td>

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

                                </div>
                            </ModalBody>
                        </Modal>

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
                                                    <td><input type="radio" name="radioGroup" onChange={() => selectCha(item[0], item[1])} value="" /></td>
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

                        <Modal Modal isOpen={isModalOpenForSearchDestuff} onClose={closeModalForSearchDestuff} toggle={closeModalForSearchDestuff} style={{ maxWidth: '1000px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                            <ModalHeader toggle={closeModalForSearchDestuff} style={{
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
                                /> Search Destuff Data</h5>



                            </ModalHeader>
                            <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                                <Row>
                                    <Col md={5}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Search By Destuff Id/Container No/IGM No
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="fobValueInDollar"
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6} style={{ marginTop: 25 }}>
                                        <button
                                            className="btn btn-outline-primary btn-margin newButton"
                                            style={{ marginRight: 10 }}

                                            id="submitbtn2"
                                            onClick={() => { search1(search); setCurrentPage3(1); }}
                                        >
                                            <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                            Search
                                        </button>
                                        <button
                                            className="btn btn-outline-danger btn-margin newButton"
                                            id="submitbtn2"
                                            onClick={() => { clearDestuffSearch() }}
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
                                                <th scope="col">Destuff Id</th>
                                                <th scope="col">Destuff Date</th>
                                                <th scope="col">Trans Type</th>
                                                <th scope="col">Gate In Id</th>
                                                <th scope="col">Gate In Date</th>
                                                <th scope="col">Container No</th>
                                                <th scope="col">IGM No</th>
                                                <th scope="col">IGM Trans Id</th>
                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* <tr>
                                    <td><input type="radio" onChange={() => selectCha('', '')} name="radioGroup" value="" /></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr> */}
                                            {currentItems3.map((item, index) => (
                                                <tr key={index}>
                                                    <td><input type="radio" name="radioGroup" onChange={() => selectSearchDestuff(item[4], item[3], item[10], item[0])} value="" /></td>
                                                    <td>{item[0]}</td>
                                                    <td>{item[1]}</td>
                                                    <td>{item[5]}</td>
                                                    <td>{item[7]}</td>
                                                    <td>{item[8]}</td>
                                                    <td>{item[6]}</td>
                                                    <td>{item[4]}</td>
                                                    <td>{item[3]}</td>
                                                    <td>{item[9]}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                                        <Pagination.First onClick={() => handlePageChange3(1)} />
                                        <Pagination.Prev
                                            onClick={() => handlePageChange3(currentPage3 - 1)}
                                            disabled={currentPage3 === 1}
                                        />
                                        <Pagination.Ellipsis />

                                        {displayPages3().map((pageNumber) => (
                                            <Pagination.Item
                                                key={pageNumber}
                                                active={pageNumber === currentPage3}
                                                onClick={() => handlePageChange3(pageNumber)}
                                            >
                                                {pageNumber}
                                            </Pagination.Item>
                                        ))}

                                        <Pagination.Ellipsis />
                                        <Pagination.Next
                                            onClick={() => handlePageChange3(currentPage3 + 1)}
                                            disabled={currentPage3 === totalPages3}
                                        />
                                        <Pagination.Last onClick={() => handlePageChange3(totalPages3)} />
                                    </Pagination>
                                </div>
                            </ModalBody>
                        </Modal>

                        <Row>
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Destuff Id
                                    </label>
                                    <Row>
                                        <Col md={8}>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="deStuffId"
                                                name='deStuffId'
                                                value={destuff.deStuffId}
                                                onChange={handleChange}
                                                disabled
                                            />

                                        </Col>
                                        <Col md={4}>
                                            <button
                                                className="btn btn-outline-primary btn-margin newButton"
                                                style={{ marginRight: 10 }}
                                                id="submitbtn2"
                                                onClick={() => openModalForSearchDestuff()}

                                            >
                                                <FontAwesomeIcon icon={faSearch} />
                                            </button>
                                        </Col>
                                    </Row>

                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Destuff Date
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <DatePicker
                                            selected={destuff.deStuffDate}

                                            id="sbTransDate"
                                            name="sbTransDate"
                                            dateFormat="dd/MM/yyyy HH:mm"
                                            timeInputLabel="Time:"
                                            showTimeInput
                                            disabled
                                            timeFormat="HH:mm"
                                            timeIntervals={15}
                                            className="form-control border-right-0 inputField"
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
                                        <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                    </div>


                                </FormGroup>
                            </Col>


                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        IGM No
                                    </label>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        disabled
                                        id="igmNo"
                                        name='igmNo'
                                        value={destuff.igmNo}
                                        onChange={handleChange}
                                    />


                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        IGM Date
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <DatePicker
                                            selected={destuff.igmDate}
                                            id='igmDate'
                                            name='igmDate'
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
                                        Status
                                    </label>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        id="status"
                                        name='status'
                                        value={destuff.status === 'A' ? 'Approved' : ''}
                                        onChange={handleChange}
                                        disabled
                                    />


                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Created By
                                    </label>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        id="createdBy"
                                        name='createdBy'
                                        value={destuff.createdBy}
                                        onChange={handleChange}
                                        disabled
                                    />


                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            {destuff.deStuffId != '' ? (
                                <Col md={2}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Container No
                                        </label>
                                        <Row>
                                            <Col md={12}>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    id="containerNo"
                                                    name='containerNo'
                                                    value={destuff.containerNo}
                                                    onChange={handleChange}
                                                    disabled
                                                />

                                            </Col>

                                        </Row>

                                    </FormGroup>
                                </Col>
                            ) : (
                                <Col md={2}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Container No
                                        </label>
                                        {(igm1 && !item1 && !cont && conSearchList.length > 0) ? (
                                            <Input
                                                className="form-control"
                                                type="select"
                                                id="containerNo"
                                                name='containerNo'
                                                value={destuff.containerNo}
                                                onChange={handleChange}
                                            //   onBlur={() => getDataFromContainerNo(destuff.containerNo)}
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
                                                    id="containerNo"
                                                    name='containerNo'
                                                    value={destuff.containerNo}
                                                    onChange={handleChange}
                                                    onBlur={() => getDataFromContainerNo(destuff.containerNo)}
                                                />
                                            )}
                                        {/* <Input
                                                    className="form-control"
                                                    type="text"
                                                    id="containerNo"
                                                    name='containerNo'
                                                    value={destuff.containerNo}
                                                    onChange={handleChange}
                                                    onBlur={() => getDataFromContainerNo(destuff.containerNo)}
                                                /> */}


                                        {/* <Col md={4}>
                                                <button
                                                    className="btn btn-outline-primary btn-margin newButton"
                                                    style={{ marginRight: 10 }}
                                                    id="submitbtn2"
                                                    onClick={() => getDataFromContainerNo(destuff.containerNo)}

                                                >
                                                    <FontAwesomeIcon icon={faSearch} />
                                                </button>
                                            </Col> */}


                                    </FormGroup>
                                </Col>
                            )}

                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Profitcentre
                                    </label>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        id="profitcentreId"
                                        name='profitcentreId'
                                        value={destuff.profitcentreId}
                                        onChange={handleChange}
                                        disabled
                                    />


                                </FormGroup>
                            </Col>

                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Destuff Shift
                                    </label>
                                    <Input
                                        className="form-control"
                                        type="select"
                                        id="shift"
                                        name='shift'
                                        value={destuff.shift}
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
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Destuff Type
                                    </label>
                                    <Input
                                        className="form-control"
                                        type="select"
                                        id="destuffType"
                                        name='destuffType'
                                        value={destuff.destuffType}
                                        onChange={handleChange}
                                    >
                                        <option value="DSTF">Warehouse De-Stuffing</option>

                                    </Input>


                                </FormGroup>
                            </Col>

                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Gate In Id
                                    </label>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        id="gateInId"
                                        name='gateInId'
                                        value={destuff.gateInId}
                                        onChange={handleChange}
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
                                            selected={destuff.gateInDate}
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

                        </Row>
                        <Row>
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        IGM Trans Id
                                    </label>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        disabled
                                        id="igmTransId"
                                        name='igmTransId'
                                        value={destuff.igmTransId}
                                        onChange={handleChange}
                                    />


                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Container Seal No
                                    </label>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        disabled
                                        id="containerSealNo"
                                        name='containerSealNo'
                                        value={destuff.containerSealNo}
                                        onChange={handleChange}
                                    />


                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        VIA No
                                    </label>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        disabled
                                        id="viaNo"
                                        name='viaNo'
                                        value={destuff.viaNo}
                                        onChange={handleChange}
                                    />


                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        SA/SL
                                    </label>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        id="shippingAgent"
                                        disabled
                                        name='shippingAgent'
                                    // value={destuff.shippingAgent}
                                    // onChange={handleChange}
                                    />


                                </FormGroup>
                            </Col>

                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        On Account Of
                                    </label>
                                    {/* <Row>
                                        <Col md={8}>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="onAccountOf"
                                                name='onAccountOf'
                                                value={partyName}
                                                onChange={handleChange}
                                                disabled
                                            />

                                        </Col>
                                        <Col md={4}>
                                            <button
                                                className="btn btn-outline-primary btn-margin newButton"
                                                style={{ marginRight: 10 }}
                                                id="submitbtn2"
                                                onClick={openModalForCha}

                                            >
                                                <FontAwesomeIcon icon={faSearch} />
                                            </button>
                                        </Col>
                                    </Row> */}
                                    <Select
                                        value={{ value: destuff.onAccountOf, label: partyName }}
                                        onChange={handleAgentChange}
                                        onInputChange={searchChaData}
                                        options={chaData}
                                        placeholder="Select Party"
                                        isClearable
                                        id="onAccountOf"
                                        name='onAccountOf'
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
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Trans Type
                                    </label>
                                    <Input
                                        className="form-control"
                                        type="select"
                                        id="transType"
                                        name='transType'
                                        value={destuff.transType}
                                        onChange={handleChange}
                                        disabled
                                    >
                                        <option value="FCL">FCL</option>
                                        <option value="LCL">LCL</option>

                                    </Input>


                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Container Status
                                    </label>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        id="containerStatus"
                                        name='containerStatus'
                                        value={destuff.containerStatus}
                                        onChange={handleChange}
                                        disabled
                                    />


                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Type Size
                                    </label>
                                    <Row>
                                        <Col md={6}>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="containerType"
                                                name='containerType'
                                                value={destuff.containerType}
                                                onChange={handleChange}
                                                disabled
                                            />

                                        </Col>
                                        <Col md={6}>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="containerSize"
                                                name='containerSize'
                                                value={destuff.containerSize}
                                                onChange={handleChange}
                                                disabled
                                            />

                                        </Col>
                                    </Row>

                                </FormGroup>
                            </Col>

                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Yard Cell No
                                    </label>
                                    <Row>
                                        <Col md={4}>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="yardLocation"
                                                name='yardLocation'
                                                value={destuff.yardLocation}
                                                onChange={handleChange}
                                                disabled
                                            />

                                        </Col>
                                        <Col md={4}>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="yardBlock"
                                                name='yardBlock'
                                                value={destuff.yardBlock}
                                                onChange={handleChange}
                                                disabled
                                            />

                                        </Col>
                                        <Col md={4}>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="blockCellNo"
                                                name='blockCellNo'
                                                value={destuff.blockCellNo}
                                                onChange={handleChange}
                                                disabled
                                            />

                                        </Col>
                                    </Row>


                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Gross Weight
                                    </label>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        id="grossWeight"
                                        name='grossWeight'
                                        value={destuff.grossWeight}
                                        onChange={handleChange}
                                        disabled
                                    />


                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Area Occupied
                                    </label>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        id="areaOccupied"
                                        name='areaOccupied'
                                        value={destuff.areaOccupied}
                                        onChange={handleChange}
                                        disabled
                                    />


                                </FormGroup>
                            </Col>
                            <Col md={2}>
                                <FormGroup>
                                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Yard Packages
                                    </label>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        id="yardPackages"
                                        name='yardPackages'
                                        value={destuff.yardPackages}
                                        onChange={handleChange}
                                        disabled
                                    />


                                </FormGroup>
                            </Col>
                        </Row>
                        {destuff.transType === 'FCL' && (
                            <Row>
                                <Col md={2}>
                                    <FormGroup>
                                        <Label className="inputHeader">OOC No</Label>
                                        <Input
                                            type="text"
                                            name="contOocNo"
                                            className="form-control inputField"
                                            value={contOocNo}
                                            id='contOocNo'
                                            disabled={destuff.transType === 'FCL'}
                                            onChange={(e) => setContOocno(e.target.value)}
                                            maxLength={20}
                                        />
                                        {/* <div style={{ color: 'red' }} className="error-message">{(!contOocNo && destuff.transType === 'FCL') ? 'OOC No is required.' : ''}</div> */}
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
                                                disabled={destuff.transType === 'FCL'}
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
                                <Col md={2}>
                                    <FormGroup>
                                        <Label className="inputHeader">Do No</Label>
                                        <Input
                                            type="text"
                                            name="contDoNo"
                                            className="form-control inputField"
                                            value={contDoNo}
                                            id='contDoNo'
                                            disabled={destuff.transType === 'FCL'}
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
                                                disabled={destuff.transType === 'FCL'}
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
                                                disabled={destuff.transType === 'FCL'}
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
                        )}
                        {destuff.containerStatus === 'LCL' && (
                            <>
                                <Row>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Invoice Type
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="select"
                                                id="invoiceType"
                                                name='invoiceType'
                                                value={destuff.invoiceType}
                                                onChange={handleChange}
                                            >
                                                <option value="CHA">CHA</option>
                                            </Input>


                                        </FormGroup>
                                    </Col>
                                    {/* <Col md={2}>
<FormGroup>
<label className="forlabel bold-label" htmlFor="sbRequestId">
CHA
</label>
<Row>
<Col md={8}>
  <Input
      className="form-control"
      type="text"
      id="examinationRemarks"
      name='examinationRemarks'
      value={destuff.invoiceType}
      onChange={handleChange}
      disabled
  />

</Col>
<Col md={4}>
  <button
      className="btn btn-outline-primary btn-margin newButton"
      style={{ marginRight: 10 }}
      id="submitbtn2"


  >
      <FontAwesomeIcon icon={faSearch} />
  </button>
</Col>
</Row>


</FormGroup>
</Col> */}
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Destuff From Date
                                            </label>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={destuff.destuffFromDate}
                                                    onChange={(date) => {
                                                        setDestuff(prevDestuff => ({
                                                            ...prevDestuff,
                                                            destuffFromDate: date
                                                        }));
                                                        setFormErrors({
                                                            ...formErrors,
                                                            destuffFromDate: ''
                                                        })
                                                    }}
                                                    id="destuffFromDate"
                                                    name="destuffFromDate"
                                                    dateFormat="dd/MM/yyyy HH:mm"
                                                    timeInputLabel="Time:"
                                                    showTimeInput
                                                    timeFormat="HH:mm"
                                                    timeIntervals={15}
                                                    className={`form-control border-right-0 inputField ${formErrors.destuffFromDate ? 'error-border' : ''}`}
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
                                                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                            </div>
                                            <div style={{ color: 'red' }} className="error-message">{formErrors.destuffFromDate}</div>


                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Destuff To Date
                                            </label>
                                            <div style={{ position: "relative" }}>
                                                <DatePicker
                                                    selected={destuff.destuffToDate}
                                                    onChange={(date) => {
                                                        setDestuff(prevDestuff => ({
                                                            ...prevDestuff,
                                                            destuffToDate: date
                                                        }));
                                                        setFormErrors({
                                                            ...formErrors,
                                                            destuffToDate: ''
                                                        })
                                                    }}
                                                    id="destuffToDate"
                                                    name="destuffToDate"
                                                    dateFormat="dd/MM/yyyy HH:mm"
                                                    timeInputLabel="Time:"
                                                    showTimeInput
                                                    timeFormat="HH:mm"
                                                    timeIntervals={15}
                                                    className={`form-control border-right-0 inputField ${formErrors.destuffToDate ? 'error-border' : ''}`}
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
                                            </div>
                                            <div style={{ color: 'red' }} className="error-message">{formErrors.destuffToDate}</div>


                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                                Work Order No
                                            </label>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                id="workOrderNo"
                                                name='workOrderNo'
                                                value={destuff.workOrderNo}
                                                onChange={handleChange}
                                                disabled
                                            />


                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="inputHeader">OOC No</label> <span style={{ color: 'red' }}>*</span>
                                            <Input
                                                type="text"
                                                name="contOocNo"
                                                className={`form-control inputField`}
                                                value={contOocNo}
                                                id='contOocNo'
                                                disabled={destuff.transType === 'FCL'}
                                                onChange={(e) => {
                                                    setContOocno(e.target.value); setFormErrors({
                                                        ...formErrors,
                                                        contOocNo: ''
                                                    })
                                                }}
                                                maxLength={20}
                                            />
                                            <div style={{ color: 'red' }} className="error-message">{formErrors.contOocNo}</div>
                                        </FormGroup>
                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="inputHeader">OOC Date</label> <span style={{ color: 'red' }}>*</span>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={contOocDate}
                                                    onChange={(date) => {
                                                        setContOocDate(date);
                                                        setFormErrors({
                                                            ...formErrors,
                                                            contOocDate: ''
                                                        })
                                                    }}
                                                    disabled={destuff.transType === 'FCL'}
                                                    id='contOocDate'
                                                    name='contOocDate'
                                                    showTimeInput
                                                    dateFormat="dd/MM/yyyy HH:mm"
                                                    className={`form-control border-right-0 InputField ${formErrors.contOocDate ? 'error-border' : ''}`}
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
                                            <div style={{ color: 'red' }} className="error-message">{formErrors.contOocDate}</div>
                                        </FormGroup>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="inputHeader">Do No</label>
                                            <Input
                                                type="text"
                                                name="contDoNo"
                                                className="form-control inputField"
                                                value={contDoNo}
                                                id='contDoNo'
                                                disabled={destuff.transType === 'FCL'}
                                                onChange={(e) => setContDoNo(e.target.value)}
                                                maxLength={30}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <FormGroup>
                                            <label className="inputHeader">DO Date</label>
                                            <div style={{ position: 'relative' }}>
                                                <DatePicker
                                                    selected={contDoDate}
                                                    onChange={(date) => {
                                                        setContDoDate(date);
                                                        if (date >= contDoValidityDate) {
                                                            setContDoValidityDate(null);
                                                        };
                                                    }}
                                                    disabled={destuff.transType === 'FCL'}
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
                                            <label className="inputHeader">DO Validity Date</label>
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
                                                    disabled={destuff.transType === 'FCL'}
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
                            </>
                        )}
                        <Row style={{ marginBottom: 10 }}>
                            <Col md={4}>
                                <button
                                    className="btn btn-outline-success btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    disabled={destuff.deStuffId === ''}
                                    onClick={openContainerWiseModal}
                                >
                                    <FontAwesomeIcon icon={faAdd} style={{ marginRight: 5 }} />
                                    Add Equipment

                                </button>
                            </Col>
                            <Col md={4} className='text-center'>
                                <button
                                    className="btn btn-outline-primary btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    onClick={saveData}
                                // disabled={(!contOocNo && destuff.transType === 'FCL')}

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
                                    onClick={downloadContWiseFCLReport}
                                    disabled={destuff.deStuffId === ''}
                                >
                                    <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
                                    Print Report
                                </button>
                            </Col>
                        </Row>
                        <hr />

                        <Row>
                            <Col>    <span style={{ marginTop: 5 }}>HAZ</span> &nbsp;
                                <Input
                                    //   className="form-control"
                                    type="checkbox"
                                    id="conHaz"
                                    name='conHaz'
                                    checked={conHaz === 'Y'}
                                    onChange={(e) => setConHaz(e.target.checked ? 'Y' : 'N')}
                                    style={{ width: 25, height: 25, borderColor: 'black' }}

                                /></Col>
                        </Row>



                        <div className="mt-3 table-responsive">
                            <table className="table table-bordered table-hover tableHeader">
                                <thead className="tableHeader">
                                    <tr>
                                        <th scope="col">Sr No</th>
                                        <th scope="col">IGM Line No</th>
                                        <th scope="col">Commodity Description <span style={{ color: 'red' }}>*</span></th>
                                        <th scope="col">Marks Nos</th>
                                        <th scope="col">Cargo Wt</th>
                                        <th scope="col">No Of Pack</th>
                                        <th scope="col">Old Destuff Pkg</th>
                                        <th scope="col">Destuff Pkg <span style={{ color: 'red' }}>*</span></th>
                                        {destuff.containerStatus === 'LCL' && (<th scope="col">Old Destuff Weight <span style={{ color: 'red' }}>*</span></th>)}
                                        {destuff.containerStatus === 'LCL' && (<th scope="col">Destuff Weight <span style={{ color: 'red' }}>*</span></th>)}
                                        <th scope="col">Area Occupied </th>
                                        {destuff.containerStatus === 'LCL' && (<th scope="col">WareHouse Location</th>)}
                                        <th scope="col">Damaged Qty</th>
                                        <th scope="col">Gain/Loss Pack</th>
                                        <th scope="col">BL Gain Loss</th>
                                        {destuff.containerStatus === 'LCL' && (<th scope="col">Cargo Type</th>)}
                                        {destuff.containerStatus === 'LCL' && (<th scope="col">Movement Type</th>)}
                                        <th scope="col">Importer Name</th>
                                        <th scope="col">Importer Address</th>
                                        <th scope="col">Old Yard Packages</th>
                                        <th scope="col">Yard Packages <span style={{ color: 'red' }}>*</span></th>
                                        {destuff.containerStatus === 'LCL' && (<th scope="col">Block Cell No</th>)}
                                        {destuff.containerStatus === 'LCL' && (<th scope="col">Excess Packages</th>)}
                                        {destuff.containerStatus === 'LCL' && (<th scope="col">Shortage Packages</th>)}
                                        <th scope="col">Type Of Cargo</th>
                                        <th scope="col">Type Of ODC</th>
                                        <th scope="col">Length</th>
                                        <th scope="col">Height</th>
                                        <th scope="col">Weight</th>
                                        <th scope="col">Comments</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {destuffCrgs.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.igmLineNo}</td>
                                            <td>
                                                <Input
                                                    className={`form-control  ${error[index]?.commodityDescription ? 'error-border' : ''}`}
                                                    type="textarea"
                                                    id={`commodityDescription${index}`}
                                                    name='commodityDescription'
                                                    value={item.commodityDescription}
                                                    onChange={(e) => updateDestuffCrg(e, index)}
                                                    style={{ width: 180 }}
                                                    maxLength={250}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control"
                                                    type="textarea"
                                                    id={`marksOfNumbers${index}`}
                                                    name='marksOfNumbers'
                                                    value={item.marksOfNumbers}
                                                    onChange={(e) => updateDestuffCrg(e, index)}
                                                    style={{ width: 180 }}
                                                    maxLength={250}
                                                />
                                            </td>
                                            <td>{item.grossWeight}</td>
                                            <td>{item.noOfPackages}</td>
                                            <td>{item.oldActualNoOfPackages}</td>
                                            <td>
                                                <Input
                                                    className={`form-control  ${error[index]?.actualNoOfPackages ? 'error-border' : ''}`}
                                                    type="text"
                                                    id={`actualNoOfPackages${index}`}
                                                    name='actualNoOfPackages'
                                                    value={item.actualNoOfPackages <= item.noOfPackages ? item.actualNoOfPackages : ''}
                                                    onChange={(e) => updateDestuffCrg(e, index)}
                                                    style={{ width: 150 }}
                                                    maxLength={8}
                                                />
                                            </td>
                                            {destuff.containerStatus === 'LCL' && (
                                                <td>{item.oldActualWeight}</td>)}
                                            {destuff.containerStatus === 'LCL' && (
                                                <td>
                                                    <Input
                                                        className={`form-control  ${error[index]?.actualWeight ? 'error-border' : ''}`}
                                                        type="text"
                                                        id={`actualWeight${index}`}
                                                        name='actualWeight'
                                                        value={item.actualWeight}
                                                        onChange={(e) => updateDestuffCrg(e, index)}
                                                        style={{ width: 150 }}
                                                        maxLength={16}
                                                    />
                                                </td>)}
                                            <td>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    id={`areaOccupied${index}`}
                                                    name='areaOccupied'
                                                    value={item.areaOccupied}
                                                    onChange={(e) => updateDestuffCrg(e, index)}
                                                    style={{ width: 150 }}
                                                    maxLength={16}
                                                />
                                            </td>
                                            {destuff.containerStatus === 'LCL' && (
                                                <td>
                                                    <Input
                                                        className="form-control"
                                                        type="textarea"
                                                        id={`warehouseLocation${index}`}
                                                        name='warehouseLocation'
                                                        value={item.warehouseLocation}
                                                        onChange={(e) => updateDestuffCrg(e, index)}
                                                        style={{ width: 150 }}
                                                        maxLength={10}

                                                    />
                                                </td>
                                            )}
                                            <td>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    id={`damagedPackages${index}`}
                                                    name='damagedPackages'
                                                    value={item.damagedPackages}
                                                    onChange={(e) => updateDestuffCrg(e, index)}
                                                    style={{ width: 150 }}
                                                    maxLength={8}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    id={`gainLossPackages${index}`}
                                                    name='gainLossPackages'
                                                    value={item.gainLossPackages}
                                                    onChange={(e) => updateDestuffCrg(e, index)}
                                                    style={{ width: 150 }}
                                                    maxLength={8}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control"
                                                    type="select"
                                                    id={`blGainLoss${index}`}
                                                    name='blGainLoss'
                                                    value={item.blGainLoss}
                                                    onChange={(e) => updateDestuffCrg(e, index)}
                                                    style={{ width: 100 }}
                                                >


                                                    <option value="O">OK</option>
                                                    <option value="G">Gain</option>
                                                    <option value="L">Loss</option>




                                                </Input>
                                            </td>
                                            {destuff.containerStatus === 'LCL' && (
                                                <td>
                                                    <Input
                                                        className="form-control"
                                                        type="select"
                                                        id={`cargoType${index}`}
                                                        name='cargoType'
                                                        value={item.cargoType}
                                                        onChange={(e) => updateDestuffCrg(e, index)}
                                                        style={{ width: 100 }}
                                                    >

                                                        <option value="General">Gen</option>

                                                        <option value="Haz">Haz</option>


                                                    </Input>
                                                </td>)}
                                            {destuff.containerStatus === 'LCL' && (<td>{item.movementType}</td>)}
                                            <td>{item.importerName}</td>
                                            <td>{item.importerAddress1 + ' ' + item.importerAddress2 + ' ' + item.importerAddress3}</td>
                                            <td>{item.oldYardPackages}</td>
                                            <td>
                                                <Input
                                                    className={`form-control  ${error[index]?.yardPackages ? 'error-border' : ''}`}
                                                    type="text"
                                                    id={`yardPackages${index}`}
                                                    name='yardPackages'
                                                    value={item.yardPackages <= item.noOfPackages ? item.yardPackages : ''}
                                                    onChange={(e) => updateDestuffCrg(e, index)}
                                                    style={{ width: 150 }}
                                                    maxLength={8}
                                                />
                                            </td>
                                            {destuff.containerStatus === 'LCL' && (
                                                <td>
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        id={`blockCellNo${index}`}
                                                        name='blockCellNo'
                                                        value={item.blockCellNo}
                                                        onChange={(e) => updateDestuffCrg(e, index)}
                                                        style={{ width: 150 }}
                                                        maxLength={10}
                                                    />
                                                </td>)}
                                            {destuff.containerStatus === 'LCL' && (<td>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    id={`excessPackages${index}`}
                                                    name='excessPackages'
                                                    value={item.excessPackages}
                                                    onChange={(e) => updateDestuffCrg(e, index)}
                                                    style={{ width: 150 }}
                                                    maxLength={16}
                                                />
                                            </td>)}
                                            {destuff.containerStatus === 'LCL' && (<td>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    id={`shortagePackages${index}`}
                                                    name='shortagePackages'
                                                    value={item.shortagePackages}
                                                    onChange={(e) => updateDestuffCrg(e, index)}
                                                    style={{ width: 150 }}
                                                    maxLength={16}
                                                />
                                            </td>)}
                                            <td>
                                                <Input
                                                    className="form-control"
                                                    type="select"
                                                    id={`typeOfCargo${index}`}
                                                    name='typeOfCargo'
                                                    value={item.typeOfCargo}
                                                    onChange={(e) => updateDestuffCrg(e, index)}
                                                    style={{ width: 180 }}
                                                >
                                                    <option value=""> Select Type Of Cargo</option>
                                                    <option value="General"> General</option>
                                                    <option value="Hazardous"> Hazardous</option>
                                                    <option value="ODC"> ODC</option>
                                                    <option value="Reefer"> Reefer</option>

                                                    <option value="Tank"> Tank</option>
                                                    <option value="TankHaz"> Tank_Haz</option>
                                                    {/* <option value="ReeferHaz"> Reefer_Haz</option> */}
                                                    <option value="FlatTrack"> FlatTrack</option>
                                                </Input>
                                            </td>
                                            <td>
                                                <Input
                                                    className={`form-control  ${error[index]?.odcType ? 'error-border' : ''}`}
                                                    type="select"
                                                    id={`odcType${index}`}
                                                    name='odcType'
                                                    value={item.odcType}
                                                    disabled={item.typeOfCargo !== 'ODC'}
                                                    onChange={(e) => updateDestuffCrg(e, index)}
                                                    style={{ width: 180 }}

                                                >
                                                    <option value=""> Select ODC Type</option>
                                                    <option value="Heavy Machinery and Equipment"> Heavy Machinery and Equipment</option>
                                                    <option value="Large Structures and Components"> Large Structures and Components</option>
                                                    <option value="Offshore and Energy Equipment"> Offshore and Energy Equipment</option>
                                                </Input>
                                            </td>
                                            <td>
                                                <Input
                                                    className={`form-control  ${error[index]?.length ? 'error-border' : ''}`}
                                                    type="text"
                                                    id={`length${index}`}
                                                    name='length'
                                                    value={item.length}
                                                    disabled={item.typeOfCargo !== 'ODC'}

                                                    onChange={(e) => updateDestuffCrg(e, index)}
                                                    style={{ width: 180 }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className={`form-control  ${error[index]?.height ? 'error-border' : ''}`}
                                                    type="text"
                                                    id={`height${index}`}
                                                    name='height'
                                                    value={item.height}
                                                    disabled={item.typeOfCargo !== 'ODC'}

                                                    onChange={(e) => updateDestuffCrg(e, index)}
                                                    style={{ width: 180 }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className={`form-control  ${error[index]?.weight ? 'error-border' : ''}`}
                                                    type="text"
                                                    id={`weight${index}`}
                                                    name='weight'
                                                    value={item.weight}
                                                    disabled={item.typeOfCargo !== 'ODC'}

                                                    onChange={(e) => updateDestuffCrg(e, index)}
                                                    style={{ width: 180 }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control"
                                                    type="textarea"
                                                    id={`comments${index}`}
                                                    name='comments'
                                                    value={item.comments}
                                                    onChange={(e) => updateDestuffCrg(e, index)}
                                                    style={{ width: 180 }}
                                                    maxLength={250}
                                                />
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </Row>
        </div>
    )
}
