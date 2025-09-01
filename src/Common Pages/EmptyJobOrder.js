
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
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faCalendarAlt, faAdd, faCancel, faXmark, faArrowDown, faPlus, faArrowUp, faEdit, faChevronUp, faChevronDown, faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import useAxios from '../Components/useAxios';
import { dark } from '@mui/material/styles/createPalette';
import { toast } from 'react-toastify';
import { CSSTransition } from 'react-transition-group';
import { error } from 'jquery';

export default function EmptyJobOrder({ activeTab }) {
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

    const [jobData, setJobData] = useState({
        companyId: "",
        branchId: "",
        jobTransId: "",
        erpDocRefNo: "",
        docRefNo: "",
        docRefDate: null,
        srNo: 0,
        jobTransDate: new Date(),
        sa: "",
        sl: "",
        onAccountOf: "",
        bookingNo: "",
        doNo: "",
        doDate: null,
        doValidityDate: null,
        shipper: "",
        cha: "",
        profitcentreId: "",
        movementType: "",
        gateInId: "",
        gateInDate: null,
        deStuffId: "",
        containerNo: "",
        containerSize: "",
        containerType: "",
        iso: "",
        containerStatus: "",
        tareWt: 0,
        containerHealth: "",
        fromLocation: "",
        movementCode: "",
        toLocation: "",
        status: "",
        createdBy: "",
        createdDate: null
    });

    const [multipleJobData, setMultipleJobData] = useState([{
        companyId: "",
        branchId: "",
        jobTransId: "",
        erpDocRefNo: "",
        docRefNo: "",
        docRefDate: null,
        srNo: 0,
        jobTransDate: new Date(),
        sa: "",
        sl: "",
        onAccountOf: "",
        bookingNo: "",
        doNo: "",
        doDate: null,
        doValidityDate: null,
        shipper: "",
        cha: "",
        profitcentreId: "",
        movementType: "",
        gateInId: "",
        gateInDate: null,
        deStuffId: "",
        containerNo: "",
        containerSize: "",
        containerType: "",
        iso: "",
        containerStatus: "",
        tareWt: 0,
        containerHealth: "",
        fromLocation: "",
        movementCode: "",
        toLocation: "",
        status: "",
        createdBy: "",
        createdDate: null
    }]);

    const [searchSlId, setSearchSlId] = useState('');
    const [searchSlName, setSearchSlName] = useState('');
    const [searchChaId, setSearchChaId] = useState('');
    const [searchChaName, setSearchChaName] = useState('');

    const [slName, setSlName] = useState('');
    const [accountName, setAccountName] = useState('');
    const [shipperName, setShipperName] = useState('');
    const [chaName, setChaName] = useState('');

    const [formErrors, setFormErrors] = useState({
        sl: '',
        onAccountOf: '',
        bookingNo: '',
        toLocation: '',
        profitcentreId: '',
        movementType: '',
        containerHealth: ''
    })


    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData((prevState) => ({
            ...prevState,
            [name]: value
        }));

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    }

    const handleClear = () => {
        setFormErrors({
            sl: '',
            onAccountOf: '',
            bookingNo: '',
            toLocation: '',
            profitcentreId: '',
            movementType: '',
            containerHealth: ''
        })
        setSearchSlId('');
        setSearchSlName('');
        setSearchChaId('');
        setSearchChaName('');
        setSlName('');
        setAccountName('');
        setShipperName('');
        setChaName('');

        setJobData({
            companyId: "",
            branchId: "",
            jobTransId: "",
            erpDocRefNo: "",
            docRefNo: "",
            docRefDate: null,
            srNo: 0,
            jobTransDate: new Date(),
            sa: "",
            sl: "",
            onAccountOf: "",
            bookingNo: "",
            doNo: "",
            doDate: null,
            doValidityDate: null,
            shipper: "",
            cha: "",
            profitcentreId: "",
            movementType: "",
            gateInId: "",
            gateInDate: null,
            deStuffId: "",
            containerNo: "",
            containerSize: "",
            containerType: "",
            iso: "",
            containerStatus: "",
            tareWt: 0,
            containerHealth: "",
            fromLocation: "",
            movementCode: "",
            toLocation: "",
            status: "",
            createdBy: "",
            createdDate: null
        })

        setMultipleJobData([{
            companyId: "",
            branchId: "",
            jobTransId: "",
            erpDocRefNo: "",
            docRefNo: "",
            docRefDate: null,
            srNo: 0,
            jobTransDate: new Date(),
            sa: "",
            sl: "",
            onAccountOf: "",
            bookingNo: "",
            doNo: "",
            doDate: null,
            doValidityDate: null,
            shipper: "",
            cha: "",
            profitcentreId: "",
            movementType: "",
            gateInId: "",
            gateInDate: null,
            deStuffId: "",
            containerNo: "",
            containerSize: "",
            containerType: "",
            iso: "",
            containerStatus: "",
            tareWt: 0,
            containerHealth: "",
            fromLocation: "",
            movementCode: "",
            toLocation: "",
            status: "",
            createdBy: "",
            createdDate: null
        }])
    }



    const [linerData, setLinerData] = useState([]);

    const getLinerData = (val) => {
        if (val === '') {
            setLinerData([]);
            return;
        }

        axios.get(`${ipaddress}party/getLiner?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const portOptions = data.map(port => ({
                    value: port[0],
                    label: port[1],
                    code: port[2]
                }))
                setLinerData(portOptions);
            })
            .catch((error) => {

            })
    }

    const handleSearchLinerChange = async (selectedOption, { action }) => {

        if (action === 'clear') {

            if (searchSlId != '') {
                setSlName('');
                setJobData({
                    ...jobData,
                    sl: ''
                })
            }

            setSearchSlName('');
            setSearchSlId('');
        }
        else {
            setSearchSlName(selectedOption ? selectedOption.label : '');
            setSearchSlId(selectedOption ? selectedOption.value : '');

            setSlName(selectedOption ? selectedOption.label : '');
            setJobData({
                ...jobData,
                sl: selectedOption ? selectedOption.value : ''
            })

        }
    };

    const handleLinerChange = async (selectedOption, { action }) => {

        if (action === 'clear') {


            setSlName('');
            setJobData({
                ...jobData,
                sl: ''
            })


        }
        else {


            setSlName(selectedOption ? selectedOption.label : '');
            setJobData({
                ...jobData,
                sl: selectedOption ? selectedOption.value : ''
            })
            setFormErrors({
                ...formErrors,
                sl: ''
            })

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
                    value: port[0],
                    label: port[1],
                }))
                setChaList(portOptions);
            })
            .catch((error) => {
                setChaList([]);
            })
    }

    const handleSearchChaChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            if (searchChaId != '') {
                setChaName('');
                setJobData({
                    ...jobData,
                    cha: ''
                });
            }

            setSearchChaName('');
            setSearchChaId('');
        }
        else {
            setSearchChaName(selectedOption ? selectedOption.label : '');
            setSearchChaId(selectedOption ? selectedOption.value : '');

            setChaName(selectedOption ? selectedOption.label : '');
            setJobData({
                ...jobData,
                cha: selectedOption ? selectedOption.value : ''
            });

        }
    };

    const handleChaChange = async (selectedOption, { action }) => {

        if (action === 'clear') {

            setChaName('');
            setJobData({
                ...jobData,
                cha: ''
            });

        }
        else {

            setChaName(selectedOption ? selectedOption.label : '');
            setJobData({
                ...jobData,
                cha: selectedOption ? selectedOption.value : ''
            });

        }
    };

    const [onAccountOfData, setOnAccountOfData] = useState([])

    const handleGetOnAccountOfData = (id) => {
        if (id === '') {
            setOnAccountOfData([]);
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
                setOnAccountOfData(portOptions);
            })
            .catch((error) => {
                setOnAccountOfData([]);
            })
    }

    const handleOnAccountChange = async (selectedOption, { action }) => {

        if (action === 'clear') {

            setAccountName('');
            setJobData({
                ...jobData,
                onAccountOf: ''
            });

        }
        else {

            setAccountName(selectedOption ? selectedOption.label : '');
            setJobData({
                ...jobData,
                onAccountOf: selectedOption ? selectedOption.value : ''
            });
            setFormErrors({
                ...formErrors,
                onAccountOf: ''
            })
        }
    };

    const [shipperData, setShipperData] = useState([])

    const getShipperData = (id) => {
        if (id === '') {
            setShipperData([]);
            return;
        }
        axios.get(`${ipaddress}emptyOrder/getShipperRecords?cid=${companyid}&bid=${branchId}&val=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const portOptions = response.data.map(port => ({
                    value: port[0],
                    label: port[1],
                }))
                setShipperData(portOptions);
            })
            .catch((error) => {
                setShipperData([]);
            })
    }

    const handleShipperChange = async (selectedOption, { action }) => {

        if (action === 'clear') {

            setShipperName('');
            setJobData({
                ...jobData,
                shipper: ''
            });

        }
        else {

            setShipperName(selectedOption ? selectedOption.label : '');
            setJobData({
                ...jobData,
                shipper: selectedOption ? selectedOption.value : ''
            });

        }
    };

    const [profitData, setProfitData] = useState([]);

    const getProfitCenters = () => {
        axios.get(`${ipaddress}api/profitcentres/getAllProfitCenters?companyId=${companyid}&branchId=${branchId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                console.log('Profitcentre data ', response.data);

                if (response.data.length === 0) {
                    setProfitData([]);
                }
                else {
                    setProfitData(response.data);
                }

            })
            .catch((error) => {
                setProfitData([]);
            })
    }

    useEffect(() => {
        if (activeTab === 'P00603') {

            getProfitCenters();
        }
    }, [activeTab])


    const handleSave = () => {
        setFormErrors({
            sl: '',
            onAccountOf: '',
            bookingNo: '',
            toLocation: '',
            profitcentreId: '',
            movementType: '',
            containerHealth: ''
        })
        setLoading(true);

        let errors = {};

        if (!jobData.sl) {
            errors.sl = "Shipping line is required."
        }

        if (!jobData.onAccountOf) {
            errors.onAccountOf = "On account of is required."
        }

        if (!jobData.bookingNo) {
            errors.bookingNo = "Booking no is required."
        }

        if (!jobData.profitcentreId) {
            errors.profitcentreId = "Profitcentre is required."
        }
        if (!jobData.toLocation) {
            errors.toLocation = "To location is required."
        }
        if (!jobData.movementType) {
            errors.movementType = "Type is required."
        }

        if (!jobData.containerHealth) {
            errors.containerHealth = "Container health is required."
        }


        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setLoading(false);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            })
            return;
        }

        const filteredMultipleJobData = multipleJobData.filter(item => item.containerNo !== '');

        if (filteredMultipleJobData.length === 0) {
            toast.error("Please add at least one container.", {
                autoClose: 1000
            });
            setLoading(false);
            return;
        }

        const formData = {
            jobData: jobData,
            multipleJobData: multipleJobData
        }

        axios.post(`${ipaddress}emptyOrder/saveData?cid=${companyid}&bid=${branchId}&user=${userId}`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const singleData = data[0];

                setJobData({
                    companyId: "",
                    branchId: "",
                    jobTransId: singleData[0] || "",
                    erpDocRefNo: singleData[29] || "",
                    docRefNo: singleData[30] || "",
                    docRefDate: singleData[22] === null ? null : new Date(singleData[22]) || null,
                    srNo: singleData[31] || 0,
                    jobTransDate: new Date(singleData[1]) || new Date(),
                    sa: singleData[23] || "",
                    sl: singleData[2] || "",
                    onAccountOf: singleData[4] || "",
                    bookingNo: singleData[6] || "",
                    doNo: singleData[11] || "",
                    doDate: singleData[12] === null ? null : new Date(singleData[12]) || null,
                    doValidityDate: singleData[13] === null ? null : new Date(singleData[13]) || null,
                    shipper: singleData[7] || "",
                    cha: singleData[9] || "",
                    profitcentreId: singleData[15] || "",
                    movementType: singleData[32] || "",
                    gateInId: singleData[26] || "",
                    gateInDate: new Date(singleData[27]) || null,
                    deStuffId: "",
                    containerNo: singleData[18] || "",
                    containerSize: singleData[19] || "",
                    containerType: singleData[20] || "",
                    iso: singleData[21] || "",
                    containerStatus: "",
                    tareWt: singleData[28] || 0,
                    containerHealth: singleData[16] || "",
                    fromLocation: singleData[25] || "",
                    movementCode: "",
                    toLocation: singleData[14] || "",
                    status: "",
                    createdBy: "",
                    createdDate: null
                })

                setSlName(singleData[3]);
                setAccountName(singleData[5]);
                setShipperName(singleData[8]);
                setChaName(singleData[10]);

                setMultipleJobData(data.map(item => ({
                    companyId: "",
                    branchId: "",
                    jobTransId: item[0] || "",
                    erpDocRefNo: item[29] || "",
                    docRefNo: item[30] || "",
                    docRefDate: item[22] === null ? null : new Date(item[22]) || null,
                    srNo: item[31] || 0,
                    jobTransDate: new Date(item[1]) || new Date(),
                    sa: item[24] || "",
                    sl: item[2] || "",
                    onAccountOf: item[4] || "",
                    bookingNo: item[6] || "",
                    doNo: item[11] || "",
                    doDate: item[12] === null ? null : new Date(item[12]) || null,
                    doValidityDate: item[13] === null ? null : new Date(item[13]) || null,
                    shipper: item[7] || "",
                    cha: item[9] || "",
                    profitcentreId: item[15] || "",
                    movementType: item[32] || "",
                    gateInId: item[26] || "",
                    gateInDate: new Date(item[27]) || null,
                    deStuffId: "",
                    containerNo: item[18] || "",
                    containerSize: item[19] || "",
                    containerType: item[20] || "",
                    iso: item[21] || "",
                    containerStatus: "",
                    tareWt: item[28] || 0,
                    containerHealth: item[16] || "",
                    fromLocation: item[25] || "",
                    movementCode: "",
                    toLocation: item[14] || "",
                    status: "",
                    createdBy: "",
                    createdDate: null
                })))

                toast.success("Data save successfully!!", {
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

    const [isModalOpenForAddContainer, setIsModalOpenForAddContainer] = useState(false);
    const [containerSearchId, setContainerSearchId] = useState('');
    const [conData, setConData] = useState([]);
    const [originalConData, setOriginalConData] = useState([]);


    const handleContainerSearchClear = () => {
        setContainerSearchId('');
        handleChangeContainerNo('');
    }

    const openAddContainerModal = () => {
        setIsModalOpenForAddContainer(true);
        setContainerSearchId('');

        if (searchChaId) {
            handleContainerSearch(searchChaId);
        }

        if (searchSlId) {
            handleContainerSearch(searchSlId);
        }
    }

    const closeAddContainerModal = () => {
        setIsModalOpenForAddContainer(false);
        setContainerSearchId('');
        setConData([]);
        setOriginalConData([]);
        setSelectAllChecked(false);
        setSelectedData([]);
    }

    const handleContainerSearch = (id) => {
        if (!id) {
            return;
        }

        axios.get(`${ipaddress}emptyOrder/getEmptyInventoryData?cid=${companyid}&bid=${branchId}&val=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;

                if (multipleJobData.length > 0) {
                    const filteredData = data.filter(item =>
                        !multipleJobData.some(job => job.containerNo === item[0])
                    );

                    setConData(filteredData);
                    setOriginalConData(filteredData);
                }
                else {
                    setConData(data);
                    setOriginalConData(data);
                }

                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })
    }

    const handleChangeContainerNo = (val) => {


        setContainerSearchId(val);

        // If the input is empty, show all data
        if (val === '') {
            setConData(originalConData); // 'originalConData' holds the full data set
        } else {
            const filteredConData = originalConData.filter(item =>
                item[0] && item[0].toLowerCase().includes(val.toLowerCase())
            );
            setConData(filteredConData);
        }
    };

    const [selectedData, setSelectedData] = useState([]);
    const [selectAllChecked, setSelectAllChecked] = useState(false);

    // Handler for individual checkbox
    const handleCheckboxChange = (item) => {
        const isChecked = selectedData.some(selectedItem => selectedItem[0] === item[0]);

        if (isChecked) {
            // Remove item from selectedData
            setSelectedData(selectedData.filter(selectedItem => selectedItem[0] !== item[0]));
        } else {
            // Add item to selectedData
            setSelectedData([...selectedData, item]);
        }
    };

    // Handler for header checkbox
    const handleSelectAll = () => {
        if (selectAllChecked) {
            // Unselect all
            setSelectedData([]);
        } else {
            // Select all data
            setSelectedData(conData);
        }
        setSelectAllChecked(!selectAllChecked);
    };

    // Effect to check if all rows are selected
    useEffect(() => {
        if (activeTab === 'P00603') {
            if (selectedData.length === conData.length && conData.length > 0) {
                setSelectAllChecked(true);
            } else {
                setSelectAllChecked(false);
            }
        }
    }, [selectedData, conData]);

    const handleAddContainers = () => {
        setMultipleJobData(prevMultipleJobData => [
            ...prevMultipleJobData.filter(prevItem => prevItem.containerNo),  // Spread the existing data
            ...selectedData.map(item => ({
                companyId: "",
                branchId: "",
                jobTransId: "",
                erpDocRefNo: item[4] || "",
                docRefNo: item[5] || "",
                docRefDate: item[13] === null ? null : new Date(item[13]) || null,
                srNo: 0,
                jobTransDate: new Date(),
                sa: item[6] || "",
                sl: "",
                onAccountOf: "",
                bookingNo: "",
                doNo: "",
                doDate: null,
                doValidityDate: null,
                shipper: "",
                cha: "",
                profitcentreId: "",
                movementType: "",
                gateInId: item[7] || "",
                gateInDate: item[8] ? new Date(item[8]) : null,
                deStuffId: item[14] || "",
                containerNo: item[0] || "",
                containerSize: item[1] || "",
                containerType: item[2] || "",
                iso: item[3] || "",
                containerStatus: item[11] || "",
                tareWt: item[12] || 0,
                containerHealth: "",
                fromLocation: item[9] || "",
                movementCode: item[15] || "",
                toLocation: "",
                status: "",
                createdBy: "",
                createdDate: null
            }))
        ]);


        closeAddContainerModal();
    }

    const handleRemove = (index) => {

        const updatedMultipleJobData = multipleJobData.filter((_, i) => i !== index);

        setMultipleJobData(updatedMultipleJobData);
    };

    const [isModalOpenForSearchEmptyRecord, setIsModalOpenForSearchEmptyRecord] = useState(false);
    const [searchId, setSearchId] = useState('');
    const [searchData, setSearchData] = useState([]);

    const openSearchModal = () => {
        setIsModalOpenForSearchEmptyRecord(true);
        search('');
    }

    const closeSearchModal = () => {
        setIsModalOpenForSearchEmptyRecord(false);
        setSearchData([]);
        setSearchId('');
    }

    const searchClear = () => {
        setSearchId('');
        search('');
    }

    const search = (val) => {
        setLoading(true);
        axios.get(`${ipaddress}emptyOrder/search?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setSearchData(response.data);

                toast.success("Data found successfully", {
                    autoClose: 800
                })
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setSearchChaId([]);
                setLoading(false);
            })
    }

    const selectData = (val) => {
        axios.get(`${ipaddress}emptyOrder/getDataByJobTransId?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const singleData = data[0];

                setJobData({
                    companyId: "",
                    branchId: "",
                    jobTransId: singleData[0] || "",
                    erpDocRefNo: singleData[29] || "",
                    docRefNo: singleData[30] || "",
                    docRefDate: singleData[22] === null ? null : new Date(singleData[22]) || null,
                    srNo: singleData[31] || 0,
                    jobTransDate: new Date(singleData[1]) || new Date(),
                    sa: singleData[23] || "",
                    sl: singleData[2] || "",
                    onAccountOf: singleData[4] || "",
                    bookingNo: singleData[6] || "",
                    doNo: singleData[11] || "",
                    doDate: singleData[12] === null ? null : new Date(singleData[12]) || null,
                    doValidityDate: singleData[13] === null ? null : new Date(singleData[13]) || null,
                    shipper: singleData[7] || "",
                    cha: singleData[9] || "",
                    profitcentreId: singleData[15] || "",
                    movementType: singleData[32] || "",
                    gateInId: singleData[26] || "",
                    gateInDate: new Date(singleData[27]) || null,
                    deStuffId: "",
                    containerNo: singleData[18] || "",
                    containerSize: singleData[19] || "",
                    containerType: singleData[20] || "",
                    iso: singleData[21] || "",
                    containerStatus: "",
                    tareWt: singleData[28] || 0,
                    containerHealth: singleData[16] || "",
                    fromLocation: singleData[25] || "",
                    movementCode: "",
                    toLocation: singleData[14] || "",
                    status: "",
                    createdBy: "",
                    createdDate: null
                })

                setSlName(singleData[3]);
                setAccountName(singleData[5]);
                setShipperName(singleData[8]);
                setChaName(singleData[10]);

                setMultipleJobData(data.map(item => ({
                    companyId: "",
                    branchId: "",
                    jobTransId: item[0] || "",
                    erpDocRefNo: item[29] || "",
                    docRefNo: item[30] || "",
                    docRefDate: item[22] === null ? null : new Date(item[22]) || null,
                    srNo: item[31] || 0,
                    jobTransDate: new Date(item[1]) || new Date(),
                    sa: item[24] || "",
                    sl: item[2] || "",
                    onAccountOf: item[4] || "",
                    bookingNo: item[6] || "",
                    doNo: item[11] || "",
                    doDate: item[12] === null ? null : new Date(item[12]) || null,
                    doValidityDate: item[13] === null ? null : new Date(item[13]) || null,
                    shipper: item[7] || "",
                    cha: item[9] || "",
                    profitcentreId: item[15] || "",
                    movementType: item[32] || "",
                    gateInId: item[26] || "",
                    gateInDate: new Date(item[27]) || null,
                    deStuffId: "",
                    containerNo: item[18] || "",
                    containerSize: item[19] || "",
                    containerType: item[20] || "",
                    iso: item[21] || "",
                    containerStatus: "",
                    tareWt: item[28] || 0,
                    containerHealth: item[16] || "",
                    fromLocation: item[25] || "",
                    movementCode: "",
                    toLocation: item[14] || "",
                    status: "",
                    createdBy: "",
                    createdDate: null
                })))

                closeSearchModal();
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
            })
    }

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(searchData.length / itemsPerPage);

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

            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Search By Shipping Line
                        </label>
                        <Select
                            value={{ value: searchSlId, label: searchSlName }}
                            onChange={handleSearchLinerChange}
                            onInputChange={getLinerData}
                            options={linerData}
                            isDisabled={searchChaId != ''}
                            placeholder="Select Shipping Line No"
                            isClearable
                            id="vehicleNo"
                            name="vehicleNo"
                            className={`autocompleteHeight }`}

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
                <Col md={2} className='text-center' style={{ marginTop: 20 }}>
                    <span style={{ fontSize: 16, fontWeight: 800 }}>OR</span>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Search By CHA
                        </label>
                        <Select
                            value={{ value: searchChaId, label: searchChaName }}
                            onChange={handleSearchChaChange}
                            onInputChange={handleCHAList}
                            options={chaList}
                            isDisabled={searchSlId != ''}
                            placeholder="Select CHA"
                            isClearable
                            id="vehicleNo"
                            name="vehicleNo"
                            className={`autocompleteHeight }`}

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
            </Row>
            <hr />
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Job Trans Id
                        </label>
                        <Row>
                            <Col md={9}>
                                <Input
                                    className="form-control"
                                    type="text"
                                    id="jobTransId"
                                    name='jobTransId'
                                    value={jobData.jobTransId}
                                    disabled
                                />
                            </Col>
                            <Col md={3}>
                                <button
                                    className="btn btn-outline-primary btn-margin newButton"
                                    style={{ marginRight: 10, fontSize: 12 }}
                                    id="submitbtn2"
                                    onClick={openSearchModal}
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
                            Job Trans Date
                        </label>
                        <div style={{ position: 'relative' }}>
                            <DatePicker
                                selected={jobData.jobTransDate}
                                id='jobTransDate'
                                disabled
                                name='jobTransDate'
                                dateFormat="dd/MM/yyyy HH:mm"
                                className="form-control border-right-0 inputField"
                                customInput={<input style={{ width: '100%' }} />}
                                wrapperClassName="custom-react-datepicker-wrapper"
                            />
                            <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                        </div>

                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Shipping Line <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Select
                            value={{ value: jobData.sl, label: slName }}
                            onChange={handleLinerChange}
                            onInputChange={getLinerData}
                            options={linerData}
                            placeholder="Select Shipping Line No"
                            isClearable
                            id="vehicleNo"
                            name="vehicleNo"
                            className={`autocompleteHeight ${formErrors.sl ? 'error-border' : ''} }`}

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
                        <div style={{ color: 'red' }} className="error-message">{formErrors.sl}</div>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            On Account Of <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Select
                            value={{ value: jobData.onAccountOf, label: accountName }}
                            onChange={handleOnAccountChange}
                            onInputChange={handleGetOnAccountOfData}
                            options={onAccountOfData}
                            placeholder="Select On Account Of"
                            isClearable
                            id="vehicleNo"
                            name="vehicleNo"
                            className={`autocompleteHeight ${formErrors.onAccountOf ? 'error-border' : ''} }`}

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
                        <div style={{ color: 'red' }} className="error-message">{formErrors.onAccountOf}</div>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Booking No <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Input
                            className={`form-control ${formErrors.bookingNo ? 'error-border' : ''}`}
                            type="text"
                            id="bookingNo"
                            name='bookingNo'
                            maxLength={15}
                            value={jobData.bookingNo}
                            onChange={handleChange}
                        />
                        <div style={{ color: 'red' }} className="error-message">{formErrors.bookingNo}</div>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Shipper
                        </label>
                        <Select
                            value={{ value: jobData.shipper, label: shipperName }}
                            onChange={handleShipperChange}
                            onInputChange={getShipperData}
                            options={shipperData}
                            placeholder="Select Shipper"
                            isClearable
                            id="vehicleNo"
                            name="vehicleNo"
                            className={`autocompleteHeight }`}

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
            </Row>

            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            CHA
                        </label>
                        <Select
                            value={{ value: jobData.cha, label: chaName }}
                            onChange={handleChaChange}
                            onInputChange={handleCHAList}
                            options={chaList}
                            placeholder="Select CHA"
                            isClearable
                            id="vehicleNo"
                            name="vehicleNo"
                            className={`autocompleteHeight }`}

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
                            Do No
                        </label>
                        <Input
                            className="form-control"
                            type="text"
                            id="doNo"
                            name='doNo'
                            maxLength={31}
                            value={jobData.doNo}
                            onChange={handleChange}
                        />

                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Do Date
                        </label>
                        <div style={{ position: 'relative' }}>
                            <DatePicker
                                selected={jobData.doDate}
                                onChange={(date) => {
                                    setJobData(prevJobData => ({
                                        ...prevJobData,
                                        doDate: date,
                                        doValidityDate: date >= prevJobData.doValidityDate ? null : prevJobData.doValidityDate
                                    }));
                                }}
                                id='doDate'
                                name='doDate'
                                dateFormat="dd/MM/yyyy"
                                className="form-control border-right-0 inputField"
                                customInput={<input style={{ width: '100%' }} />}
                                wrapperClassName="custom-react-datepicker-wrapper"
                            />
                            <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                        </div>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Do Validity Date
                        </label>
                        <div style={{ position: 'relative' }}>
                            <DatePicker
                                selected={jobData.doValidityDate}
                                onChange={(date) => {
                                    setJobData(prevJobData => ({
                                        ...prevJobData,
                                        doValidityDate: date,

                                    }));
                                }}
                                minDate={(() => {
                                    const date = new Date(jobData.doDate);
                                    date.setDate(date.getDate() + 1);
                                    return date;
                                })()}
                                id='gateOutDate'
                                name='gateOutDate'
                                dateFormat="dd/MM/yyyy"
                                className="form-control border-right-0 inputField"
                                customInput={<input style={{ width: '100%' }} />}
                                wrapperClassName="custom-react-datepicker-wrapper"
                            />
                            <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                        </div>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            To Location <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Input
                            className={`form-control ${formErrors.toLocation ? 'error-border' : ''}`}
                            type="text"
                            id="toLocation"
                            name='toLocation'
                            value={jobData.toLocation}
                            maxLength={50}
                            onChange={handleChange}
                        />
                        <div style={{ color: 'red' }} className="error-message">{formErrors.toLocation}</div>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Profitcentre <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Input
                            className={`form-control ${formErrors.profitcentreId ? 'error-border' : ''}`}
                            type="select"
                            id="profitcentreId"
                            name='profitcentreId'
                            value={jobData.profitcentreId}
                            onChange={handleChange}
                        >
                            <option value="">Select Profitcentre</option>
                            {profitData.map((item, index) => (
                                <option key={index} value={item.profitcentreId}>{item.profitcentreDesc}</option>
                            ))}
                        </Input>
                        <div style={{ color: 'red' }} className="error-message">{formErrors.profitcentreId}</div>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Container Health <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Input
                            className={`form-control ${formErrors.containerHealth ? 'error-border' : ''}`}
                            type="select"
                            id="containerHealth"
                            name='containerHealth'
                            value={jobData.containerHealth}
                            onChange={handleChange}

                        >
                            <option value="" selected="">	</option>

                            <option value="HDEMAG">Heavy Damage</option>

                            <option value="LDEMAG">Light Damage</option>

                            <option value="MDEMAG">Medium Damage</option>

                            <option value="OK">Healthy</option>
                        </Input>
                        <div style={{ color: 'red' }} className="error-message">{formErrors.containerHealth}</div>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Type <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Input
                            className={`form-control ${formErrors.movementType ? 'error-border' : ''}`}
                            type="select"
                            id="movementType"
                            name='movementType'
                            value={jobData.movementType}
                            onChange={handleChange}
                        >
                            <option value="">Select Type</option>
                            <option value="REEXPORT">Shipper Export</option>
                            <option value="REPO">Empty Repo</option>
                        </Input>
                        <div style={{ color: 'red' }} className="error-message">{formErrors.movementType}</div>
                    </FormGroup>
                </Col>
            </Row>
            <hr />
            <Row className='text-center'>
                <Col>
                    <button
                        className="btn btn-outline-primary btn-margin newButton"
                        style={{ marginRight: 10 }}
                        id="submitbtn2"
                        onClick={handleSave}
                    >
                        <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                        Save
                    </button>

                    <button
                        className="btn btn-outline-danger btn-margin newButton"
                        style={{ marginRight: 10 }}
                        id="submitbtn2"
                        onClick={handleClear}
                    >
                        <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                        Clear
                    </button>

                    <button
                        className="btn btn-outline-success btn-margin newButton"
                        style={{ marginRight: 10 }}
                        id="submitbtn2"
                        disabled={(!searchChaId && !searchSlId) || jobData.jobTransId !== ''}
                        onClick={openAddContainerModal}
                    >
                        <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
                        Add Containers
                    </button>
                </Col>
            </Row>
            <div className="mt-5 table-responsive">
                <table className="table table-bordered table-hover tableHeader dynamic-table">
                    <thead className="tableHeader">
                        <tr>
                            <th scope="col" className="text-center" style={{ color: 'black' }}>#</th>
                            <th scope="col" className="text-center" style={{ color: 'black' }}>Container No</th>
                            <th scope="col" className="text-center" style={{ color: 'black' }}>Size/Type</th>
                            <th scope="col" className="text-center" style={{ color: 'black' }}>ISO</th>
                            <th scope="col" className="text-center" style={{ color: 'black' }}>IGM Date</th>
                            <th scope="col" className="text-center" style={{ color: 'black' }}>Shipping Agent</th>
                            <th scope="col" className="text-center" style={{ color: 'black' }}>From Location</th>
                            <th scope="col" className="text-center" style={{ color: 'black' }}>Gate in Date</th>
                            <th scope="col" className="text-center" style={{ color: 'black' }}>Tare Wt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {multipleJobData.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <button
                                        className="btn btn-outline-danger btn-margin newButton"
                                        style={{ marginRight: 10 }}
                                        id="submitbtn2"
                                        onClick={() => handleRemove(index)}
                                        disabled={jobData.jobTransId !== ''}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                                <td>{item.containerNo}</td>
                                <td>{item.containerSize}{item.containerType}</td>
                                <td>{item.iso}</td>
                                <td style={{ width: 200 }}>
                                    <div style={{ position: 'relative' }}>
                                        <DatePicker
                                            selected={item.docRefDate}
                                            disabled
                                            id='docRefDate'
                                            name='docRefDate'
                                            dateFormat="dd/MM/yyyy"
                                            className="form-control border-right-0 inputField"
                                            customInput={<input style={{ width: '100%' }} />}
                                            wrapperClassName="custom-react-datepicker-wrapper"
                                        />
                                        <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                    </div>
                                </td>
                                <td style={{ width: 300 }}>{item.sa}</td>
                                <td>{item.fromLocation}</td>
                                <td style={{ width: 200 }}>
                                    <div style={{ position: 'relative' }}>
                                        <DatePicker
                                            selected={item.gateInDate}
                                            disabled
                                            id='gateInDate'
                                            name='gateInDate'
                                            dateFormat="dd/MM/yyyy"
                                            className="form-control border-right-0 inputField"
                                            customInput={<input style={{ width: '100%' }} />}
                                            wrapperClassName="custom-react-datepicker-wrapper"
                                        />
                                        <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                                    </div>
                                </td>
                                <td>{item.tareWt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>






            <Modal Modal isOpen={isModalOpenForAddContainer} onClose={closeAddContainerModal} toggle={closeAddContainerModal} style={{ maxWidth: '1000px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                <ModalHeader toggle={closeAddContainerModal} style={{
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
                    /> Add Containers</h5>



                </ModalHeader>
                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Search By Container No
                                </label>
                                <Input
                                    className={`form-control`}
                                    type="text"
                                    id="containerSearchId"
                                    name='containerSearchId'
                                    value={containerSearchId}
                                    maxLength={15}
                                    onChange={(e) => handleChangeContainerNo(e.target.value)}
                                />

                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ marginRight: 10, marginTop: 20, fontSize: 12 }}
                                id="submitbtn2"
                                onClick={handleContainerSearchClear}
                            >
                                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                Clear
                            </button>
                        </Col>
                    </Row>
                    <hr />
                    <div className="mt-2 table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <table className="table table-bordered table-hover tableHeader dynamic-table">
                            <thead className="tableHeader">
                                <tr>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>
                                        <Input
                                            type="checkbox"
                                            className="form-check-Input radios"
                                            style={{ width: 25, height: 25 }}
                                            name='selectAll'
                                            id='selectAll'
                                            checked={selectAllChecked}
                                            onChange={handleSelectAll}
                                            onKeyDown={(e) => e.key === "Enter" && handleSelectAll()}
                                        />
                                    </th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Container No</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Size/Type</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>ISO</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>IGM No</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Gate In Id</th>
                                </tr>
                            </thead>
                            <tbody>
                                {conData.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Input
                                                type="checkbox"
                                                className="form-check-Input radios"
                                                style={{ width: 25, height: 25 }}
                                                name={`checkbox${index}`}
                                                id={`checkbox${index}`}
                                                checked={selectedData.some(selectedItem => selectedItem[0] === item[0])}
                                                onChange={() => handleCheckboxChange(item)}
                                                onKeyDown={(e) => e.key === "Enter" && handleCheckboxChange(item)}
                                            />
                                        </td>
                                        <td>{item[0]}</td>
                                        <td>{item[1]}{item[2]}</td>
                                        <td>{item[3]}</td>
                                        <td>{item[5]}</td>
                                        <td>{item[7]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Row>
                        <Col>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10, marginTop: 20 }}
                                id="submitbtn2"
                                onClick={handleAddContainers}
                            >
                                <FontAwesomeIcon icon={faAdd} style={{ marginRight: "5px" }} />
                                Add Containers
                            </button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>


            <Modal Modal isOpen={isModalOpenForSearchEmptyRecord} onClose={closeSearchModal} toggle={closeSearchModal} style={{ maxWidth: '1000px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                <ModalHeader toggle={closeSearchModal} style={{
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
                    /> Search Empty Job Order Records</h5>



                </ModalHeader>
                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Search
                                </label>
                                <Input
                                    className={`form-control`}
                                    type="text"
                                    id="searchId"
                                    name='searchId'
                                    value={searchId}
                                    maxLength={15}
                                    onChange={(e) => setSearchId(e.target.value)}
                                />

                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10, marginTop: 20, fontSize: 12 }}
                                id="submitbtn2"
                                onClick={() => search(searchId)}
                            >
                                <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                Search
                            </button>
                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ marginRight: 10, marginTop: 20, fontSize: 12 }}
                                id="submitbtn2"
                                onClick={searchClear}
                            >
                                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                Clear
                            </button>
                        </Col>
                    </Row>
                    <hr />
                    <div className="mt-2 table-responsive">
                        <table className="table table-bordered table-hover tableHeader dynamic-table">
                            <thead className="tableHeader">
                                <tr>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>#</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Job Trans Id</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Job Trans Date</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Container No</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Shipping Line</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>CHA</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Booking No</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Do No</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, index) => (
                                    <tr key={index}>
                                        <td><input type="radio" onChange={() => selectData(item[0])} name="radioGroup" /></td>
                                        <td>{item[0]}</td>
                                        <td>{item[1]}</td>
                                        <td>{item[2]}</td>
                                        <td>{item[3]}</td>
                                        <td style={{ width: 200 }}>{item[4]}</td>
                                        <td>{item[5]}</td>
                                        <td>{item[6]}</td>
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
        </div>
    )
}
