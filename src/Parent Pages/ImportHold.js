
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
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faCalendarAlt, faAdd, faCancel, faXmark, faArrowDown, faPlus, faArrowUp, faEdit, faChevronUp, faChevronDown, faMagnifyingGlassChart, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import useAxios from '../Components/useAxios';
import { dark } from '@mui/material/styles/createPalette';
import { toast } from 'react-toastify';
import { CSSTransition } from 'react-transition-group';
import { error } from 'jquery';

export default function ImportHold({ process }) {
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


    const [igmData, setIgmData] = useState({

        companyId: '',
        branchId: '',
        finYear: new Date().getFullYear(),
        igmTransId: '',
        profitcentreId: '',
        igmNo: '',
        docDate: new Date(),
        igmDate: null,
        viaNo: '',
        vesselId: '',
        voyageNo: '',
        port: '',
        vesselEta: null,
        vesselArvDate: null,
        vesselArvTime: '',
        shippingLine: '',
        shippingAgent: '',
        comments: '',
        portJo: '',
        portJoDate: null,
        partyId: '',
        dataInputStatus: 'N',
        exportJoFileName: '',
        entryStatus: '',
        status: '',
        createdBy: '',
        createdDate: null,
        editedBy: '',
        editedDate: null,
        approvedBy: '',
        approvedDate: null,
        scanningDate: null,
        manualLinkFlag: 'N'

    })

    const [igmCrgData, setIgmCrgData] = useState({
        companyId: '',
        branchId: '',
        finYear: new Date().getFullYear(),
        igmTransId: '',
        igmCrgTransId: '',
        profitcentreId: '',
        igmLineNo: '',
        igmNo: '',
        cycle: 'IMP',
        viaNo: '',
        blNo: '',
        blDate: null,
        cargoMovement: '',
        sampleQty: 0,
        importerId: '',
        importerName: '',
        importerSr: '',
        importerAddress1: '',
        importerAddress2: '',
        importerAddress3: '',
        notifyPartyId: '',
        notifyPartyName: '',
        notifySr: '',
        notifiedAddress1: '',
        notifiedAddress2: '',
        notifiedAddress3: '',
        chaName: '',
        origin: '',
        destination: '',
        commodityDescription: '',
        commodityCode: '',
        areaUsed: 0,
        noOfPackages: "",
        qtyTakenOut: 0,
        qtyTakenOutWeight: 0,
        grossWeight: "",
        weighmentWeight: 0,
        unitOfWeight: 'KG',
        typeOfPackage: '',
        cargoType: 'NAGRO',
        imoCode: '',
        unNo: '',
        dataInputStatus: '',
        entryStatus: '',
        actualNoOfPackages: 0,
        damagedNoOfPackages: 0,
        gainLossPackage: '0',
        yardLocation: '',
        yardBlock: '',
        blockCellNo: '',
        noOfDestuffContainers: 0,
        noOfContainers: 0,
        examTallyId: '',
        examTallyDate: null,
        blTariffNo: '',
        destuffId: '',
        destuffCharges: 0,
        destuffDate: null,
        cargoValue: 0,
        cargoDuty: 0,
        gateOutNo: '',
        gateOutDate: null,
        marksOfNumbers: '',
        holdingAgent: '',
        holdingAgentName: '',
        holdDate: null,
        releaseDate: null,
        holdRemarks: '',
        holdStatus: '',
        releaseAgent: '',
        releaseRemarks: '',
        status: '',
        createdBy: '',
        createdDate: null,
        editedBy: '',
        editedDate: null,
        approvedBy: '',
        approvedDate: null,
        hazReeferRemarks: '',
        smtpFlag: 'N',
        smtpStatusBy: '',
        smtpStatusDate: null,
        newFwdId: '',
        primaryItem: 'Y',
        igmSendStatus: 'N',
        igmSendDate: null,
        partDeStuffId: '',
        partDeStuffDate: null,
        accountHolderId: "",
        accountHolderName: "",
        beNo: "",
        beDate: null
    });

    const [igmCnData, setIgmCnData] = useState([{
        companyId: '',
        branchId: '',
        finYear: new Date().getFullYear(),
        igmTransId: '',
        profitcentreId: '',
        containerTransId: '',
        igmNo: '',
        igmLineNo: '',
        containerNo: '',
        containerSize: '',
        containerType: '',
        typeOfContainer: 'General',
        iso: '',
        containerWeight: '',
        containerStatus: 'FCL',
        customsSealNo: '',
        scannerType: '',
        gateInDate: null,
        gateOutDate: null,
        holdRemarks: '',
        holdStatus: '',
        cargoWt: '',
        grossWt: '',
        noOfPackages: '',
        scanningDoneStatus: '',
        temperature: '',
        status: '',
        upTariffDelMode: '',
        odcStatus: 'N',
        lowBed: 'N'
    }])

    const [searchIgm, setSearchIgm] = useState('');
    const [searchItem, setSearchItem] = useState('');
    const [searchContainer, setSearchContainer] = useState('');

    const handleClear = () => {
        setSearchIgm('');
        setSearchItem('');
        setSearchContainer('');
        setIgmCnData([{
            companyId: '',
            branchId: '',
            finYear: new Date().getFullYear(),
            igmTransId: '',
            profitcentreId: '',
            containerTransId: '',
            igmNo: '',
            igmLineNo: '',
            containerNo: '',
            containerSize: '',
            containerType: '',
            typeOfContainer: 'General',
            iso: '',
            containerWeight: '',
            containerStatus: 'FCL',
            customsSealNo: '',
            scannerType: '',
            gateInDate: null,
            gateOutDate: null,
            holdRemarks: '',
            holdStatus: '',
            cargoWt: '',
            grossWt: '',
            noOfPackages: '',
            scanningDoneStatus: '',
            temperature: '',
            status: '',
            upTariffDelMode: '',
            odcStatus: 'N',
            lowBed: 'N'
        }])

        setIgmData({
            companyId: '',
            branchId: '',
            finYear: new Date().getFullYear(),
            igmTransId: '',
            profitcentreId: '',
            igmNo: '',
            docDate: new Date(),
            igmDate: null,
            viaNo: '',
            vesselId: '',
            voyageNo: '',
            port: '',
            vesselEta: null,
            vesselArvDate: null,
            vesselArvTime: '',
            shippingLine: '',
            shippingAgent: '',
            comments: '',
            portJo: '',
            portJoDate: null,
            partyId: '',
            dataInputStatus: 'N',
            exportJoFileName: '',
            entryStatus: '',
            status: '',
            createdBy: '',
            createdDate: null,
            editedBy: '',
            editedDate: null,
            approvedBy: '',
            approvedDate: null,
            scanningDate: null,
            manualLinkFlag: 'N'
        })

        setIgmCrgData({
            companyId: '',
            branchId: '',
            finYear: new Date().getFullYear(),
            igmTransId: '',
            igmCrgTransId: '',
            profitcentreId: '',
            igmLineNo: '',
            igmNo: '',
            cycle: 'IMP',
            viaNo: '',
            blNo: '',
            blDate: null,
            cargoMovement: '',
            sampleQty: 0,
            importerId: '',
            importerName: '',
            importerSr: '',
            importerAddress1: '',
            importerAddress2: '',
            importerAddress3: '',
            notifyPartyId: '',
            notifyPartyName: '',
            notifySr: '',
            notifiedAddress1: '',
            notifiedAddress2: '',
            notifiedAddress3: '',
            chaName: '',
            origin: '',
            destination: '',
            commodityDescription: '',
            commodityCode: '',
            areaUsed: 0,
            noOfPackages: "",
            qtyTakenOut: 0,
            qtyTakenOutWeight: 0,
            grossWeight: "",
            weighmentWeight: 0,
            unitOfWeight: 'KG',
            typeOfPackage: '',
            cargoType: 'NAGRO',
            imoCode: '',
            unNo: '',
            dataInputStatus: '',
            entryStatus: '',
            actualNoOfPackages: 0,
            damagedNoOfPackages: 0,
            gainLossPackage: '0',
            yardLocation: '',
            yardBlock: '',
            blockCellNo: '',
            noOfDestuffContainers: 0,
            noOfContainers: 0,
            examTallyId: '',
            examTallyDate: null,
            blTariffNo: '',
            destuffId: '',
            destuffCharges: 0,
            destuffDate: null,
            cargoValue: 0,
            cargoDuty: 0,
            gateOutNo: '',
            gateOutDate: null,
            marksOfNumbers: '',
            holdingAgent: '',
            holdingAgentName: '',
            holdDate: null,
            releaseDate: null,
            holdRemarks: '',
            holdStatus: '',
            releaseAgent: '',
            releaseRemarks: '',
            status: '',
            createdBy: '',
            createdDate: null,
            editedBy: '',
            editedDate: null,
            approvedBy: '',
            approvedDate: null,
            hazReeferRemarks: '',
            smtpFlag: 'N',
            smtpStatusBy: '',
            smtpStatusDate: null,
            newFwdId: '',
            primaryItem: 'Y',
            igmSendStatus: 'N',
            igmSendDate: null,
            partDeStuffId: '',
            partDeStuffDate: null,
            accountHolderId: "",
            accountHolderName: "",
            beNo: "",
            beDate: null
        })
    }

    const formatDate = (timestamp) => {
        if (!timestamp) return null;
        const date = new Date(timestamp);
        return date.toISOString().split('T')[0]; // Returns 'YYYY-MM-DD'
    };


    const handleSearch = () => {
        setLoading(true);

        if (!searchContainer && !searchIgm && !searchItem) {
            toast.error("The search field is empty.", {
                autoClose: 800
            })

            setLoading(false);
            return;
        }

        if (searchIgm && !searchItem) {
            toast.error("Item no is required.", {
                autoClose: 800
            })

            setLoading(false);
            return;
        }

        if (!searchIgm && searchItem) {
            toast.error("Igm no is required.", {
                autoClose: 800
            })

            setLoading(false);
            return;
        }

        axios.get(`${ipaddress}holdDetail/search?cid=${companyid}&bid=${branchId}&igm=${searchIgm}&item=${searchItem}&container=${searchContainer}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const igmData = data.igm;
                const crgData = data.igmCrg;
                const conData = data.con;

                console.log('igmData ', igmData);
                console.log('crgData ', crgData);



                setIgmData(igmData);



                setIgmCrgData(crgData);

                setIgmCnData(conData);

                toast.success("Data found successfully!!!", {
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

    const [isModalOpenForHold, setIsModalOpenForHold] = useState(false);
    const [holdData, setHoldData] = useState([]);

    const [hold, setHold] = useState({
        igmNo: '',
        igmLineNo: '',
        igmTransId: '',
        gateInId: '',
        containerNo: '',
        holdId: '',
        holdingAgency: '',
        holdDate: new Date(),
        holdRemarks: '',
        holdBy: ''
    })

    const [holdErrors, setHoldErrors] = useState({
        holdingAgency: '',
        holdDate: '',
        holdRemarks: '',
    })

    const [agency, setAgency] = useState([]);
    const getAgency = () => {
        const id = 'J00064';
        axios.get(`${ipaddress}jardetail/getJarDetail?companyId=${companyid}&jarId=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setAgency(response.data);
            })
            .catch((error) => {

            })
    }

    const openHoldModal = (igm, trans, line, con, gate) => {
        setHoldErrors({
            holdingAgency: '',
            holdDate: '',
            holdRemarks: '',
        })
        setIsModalOpenForHold(true);
        setHold({
            ...hold,
            igmNo: igm,
            igmTransId: trans,
            igmLineNo: line,
            containerNo: con,
            holdBy: userId,
            gateInId: gate
        })
        getAgency();
        getHoldData(igm, trans, line, con, gate);
    }

    const getHoldData = (igm, trans, line, con, gate) => {
        const formData = {
            igmNo: igm,
            igmTransId: trans,
            igmLineNo: line,
            containerNo: con,
            gateInId: gate,
            holdId: '',
            holdingAgency: '',
            holdDate: new Date(),
            holdRemarks: '',
            holdBy: ''
        }

        axios.post(`${ipaddress}holdDetail/getData?cid=${companyid}&bid=${branchId}`, formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {

                const updatedData = response.data.map(item => ({
                    ...item,
                    releaseDate: item.releaseDate === null ? new Date() : new Date(item.releaseDate)
                }));

                setHoldData(updatedData);
            })
            .catch((error) => {

                setHoldData([]);
            })
    }

    const closeHoldModal = () => {
        setIsModalOpenForHold(false);
        setHold({
            igmNo: '',
            igmLineNo: '',
            igmTransId: '',
            containerNo: '',
            gateInId: '',
            holdId: '',
            holdingAgency: '',
            holdDate: new Date(),
            holdRemarks: '',
            holdBy: ''
        })
        setHoldData([]);
        handleSearch();
        setAgency([]);
        setHoldErrors({
            holdingAgency: '',
            holdDate: '',
            holdRemarks: '',
        })
    }

    const holdClear = () => {
        setHold({
            ...hold,
            holdId: '',
            holdingAgency: '',
            holdDate: new Date(),
            holdRemarks: '',
        })
        setHoldErrors({
            holdingAgency: '',
            holdDate: '',
            holdRemarks: '',
        })
    }

    const handleSaveHold = () => {
        setLoading(true);
        setHoldErrors({
            holdingAgency: '',
            holdDate: '',
            holdRemarks: '',
        })
        let errors = {};

        if (!hold.holdingAgency) {
            errors.holdingAgency = "Holding agency is required."
        }

        if (!hold.holdDate) {
            errors.holdDate = "Hold date is required."
        }

        if (!hold.holdRemarks) {
            errors.holdRemarks = "Hold remarks is required."
        }
        else {
            if (hold.holdRemarks.length < 5) {
                errors.holdRemarks = "The hold remarks must contain at least 5 characters."
            }
        }

        if (Object.keys(errors).length > 0) {
            setHoldErrors(errors);
            setLoading(false);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            })
            return;
        }

        axios.post(`${ipaddress}holdDetail/saveData?cid=${companyid}&bid=${branchId}&user=${userId}`, hold, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                setHoldData(data);

                toast.success("Data save successfully!!", {
                    autoClose: 800
                })

                setLoading(false);
                holdClear();
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })
    }


    const [isModalOpenForRelease, setIsModalOpenForRelease] = useState(false);


    const openReleaseModal = (igm, trans, line, con, gate) => {
        getAgency();
        getHoldData(igm, trans, line, con, gate);
        setIsModalOpenForRelease(true);
        setHold({
            ...hold,
            igmNo: igm,
            igmTransId: trans,
            igmLineNo: line,
            containerNo: con,
            holdBy: userId,
            gateInId: gate
        })
    }

    const closeReleaseModal = () => {
        setHoldData([]);
        setIsModalOpenForRelease(false);
        setSelectedRows([]);
        setErrors([]);
        handleSearch();
    }


    const [selectedRows, setSelectedRows] = useState([]);

    // Handle checkbox change
    const handleCheckboxChange = (item, index) => {
        setSelectedRows(prevSelectedRows => {
            if (prevSelectedRows.some(selectedItem => selectedItem.holdingAgency === item.holdingAgency)) {
                // If the row is already selected, remove it
                return prevSelectedRows.filter((selectedItem) => selectedItem.holdingAgency !== item.holdingAgency);
            } else {
                // If not selected, add it to the selectedRows
                return [...prevSelectedRows, item];
            }
        });

        // Optionally, update holdData state with the new status
        setHoldData(prevState => {
            const updatedData = [...prevState];
            updatedData[index] = {
                ...updatedData[index],
                holdStatus: updatedData[index].holdStatus === 'R' ? 'H' : 'R', // toggle status
            };
            return updatedData;
        });
    };

    const [errors, setErrors] = useState([]);
    const releaseContainers = () => {
        setLoading(true);

        if (selectedRows.length === 0) {
            toast.error("Please select at least one release checkbox.", {
                autoClose: 800
            })
            setLoading(false);
            return;
        }

        let newErrors = selectedRows.map(() => ({}));
        setErrors([]);

        selectedRows.forEach((data, index) => {
            let rowErrors = {};

            console.log('data.releaseRemarks ', data);


            if (!data.releaseDate) rowErrors.releaseDate = "Release date is required.";
            if (!data.releaseRemarks) rowErrors.releaseRemarks = "Release remarks is required.";

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

        axios.post(`${ipaddress}holdDetail/saveReleaseData?cid=${companyid}&bid=${branchId}&user=${userId}`, selectedRows, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                toast.success("Data save successfully!!!", {
                    autoClose: 800
                })
                setLoading(false);
                setErrors([]);
                setSelectedRows([]);

                const updatedData = response.data.map(item => ({
                    ...item,
                    releaseDate: item.releaseDate === null ? new Date() : new Date(item.releaseDate)
                }));

                setHoldData(updatedData);
            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 800
                })
                setLoading(false);
            })

    }

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
                            IGM No
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            id="searchIgm"
                            name='searchIgm'
                            disabled={searchContainer !== '' || igmData.igmTransId !== ''}
                            onChange={(e) => setSearchIgm(e.target.value)}
                            value={searchIgm}
                        />
                    </FormGroup>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Item No
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            id="searchItem"
                            name='searchItem'
                            disabled={searchContainer !== '' || igmData.igmTransId !== ''}
                            onChange={(e) => setSearchItem(e.target.value)}
                            value={searchItem}
                        />
                    </FormGroup>
                </Col>

                <Col md={2} className='text-center' style={{ paddingTop: 25 }}>
                    <span style={{ fontSize: 16, fontWeight: 800 }}>OR</span>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Container No
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            id="searchContainer"
                            name='searchContainer'
                            disabled={searchIgm !== '' || searchItem != '' || igmData.igmTransId !== ''}
                            value={searchContainer}
                            onChange={(e) => setSearchContainer(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <button
                        className="btn btn-outline-primary btn-margin newButton"
                        style={{ height: 33, fontSize: 14, marginTop: 19 }}
                        id="submitbtn2"
                        onClick={handleSearch}
                    >
                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: 5 }} />
                        Search

                    </button>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            IGM Trans Id
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="igmTransId"
                            name='igmTransId'
                            value={igmData.igmTransId}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            IGM No
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="igmNo"
                            name='igmNo'
                            value={igmData.igmNo}
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
                                selected={igmData.igmDate}
                                id="igmDate"
                                disabled
                                name="igmDate"
                                dateFormat="dd/MM/yyyy"
                                timeInputLabel="Time:"
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                className={`form-control border-right-0 inputField`}
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
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            DOC Date
                        </label>
                        <div style={{ position: 'relative' }}>
                            <DatePicker
                                selected={igmData.docDate}
                                id="docDate"
                                disabled
                                name="docDate"
                                dateFormat="dd/MM/yyyy HH:mm"
                                timeInputLabel="Time:"
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                className={`form-control border-right-0 inputField`}
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
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Status
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="status"
                            name='status'
                            value={igmData.status === 'A' ? 'Approved' : igmData.status}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Created By
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="createdBy"
                            name='createdBy'
                            value={igmData.createdBy}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            VIA No
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="viaNo"
                            name='viaNo'
                            value={igmData.viaNo}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Profitcentre
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="profitcentreId"
                            name='profitcentreId'
                            value={igmData.profitcentreId}
                        />
                    </FormGroup>
                </Col>

            </Row>
            <hr />
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Cycle Type / Item no
                        </label>
                        <Row>
                            <Col md={7}>
                                <Input
                                    className={`form-contro`}
                                    type="text"
                                    disabled
                                    id="cycle"
                                    name='cycle'
                                    value={igmCrgData.cycle}
                                />
                            </Col>
                            <Col md={5}>
                                <Input
                                    className={`form-contro`}
                                    type="text"
                                    disabled
                                    id="igmLineNo"
                                    name='igmLineNo'
                                    value={igmCrgData.igmLineNo}
                                />
                            </Col>
                        </Row>
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            BL No
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="blNo"
                            name='blNo'
                            value={igmCrgData.blNo}
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
                                selected={igmCrgData.blDate}
                                id="blDate"
                                disabled
                                name="blDate"
                                dateFormat="dd/MM/yyyy"
                                timeInputLabel="Time:"
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                className={`form-control border-right-0 inputField`}
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
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Cargo Movement
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="cargoMovement"
                            name='cargoMovement'
                            value={igmCrgData.cargoMovement}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Commodity
                        </label>
                        <Input
                            className={`form-contro`}
                            type="textarea"
                            disabled
                            id="commodityDescription"
                            name='commodityDescription'
                            value={igmCrgData.commodityDescription}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Marks & Numbers
                        </label>
                        <Input
                            className={`form-contro`}
                            type="textarea"
                            disabled
                            id="marksOfNumbers"
                            name='marksOfNumbers'
                            value={igmCrgData.marksOfNumbers}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Cargo Weight
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="grossWeight"
                            name='grossWeight'
                            value={igmCrgData.grossWeight}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            No Of Package
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="noOfPackages"
                            name='noOfPackages'
                            value={igmCrgData.noOfPackages}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Unit Of Weight
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="unitOfWeight"
                            name='unitOfWeight'
                            value={igmCrgData.unitOfWeight}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Type Of Package
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="typeOfPackage"
                            name='typeOfPackage'
                            value={igmCrgData.typeOfPackage}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Account Holder
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="accountHolderName"
                            name='accountHolderName'
                            value={igmCrgData.accountHolderName}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Cargo Type
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="cargoType"
                            name='cargoType'
                            value={igmCrgData.cargoType}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Importer Name
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="importerName"
                            name='importerName'
                            value={igmCrgData.importerName}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Importer Address1
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="importerAddress1"
                            name='importerAddress1'
                            value={igmCrgData.importerAddress1}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Importer Address2
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="importerAddress2"
                            name='importerAddress2'
                            value={igmCrgData.importerAddress2}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Importer Address3
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="importerAddress3"
                            name='importerAddress3'
                            value={igmCrgData.importerAddress3}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Origin
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="origin"
                            name='origin'
                            value={igmCrgData.origin}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Destination
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="destination"
                            name='destination'
                            value={igmCrgData.destination}
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
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="notifyPartyName"
                            name='notifyPartyName'
                            value={igmCrgData.notifyPartyName}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Notified Address1
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="notifiedAddress1"
                            name='notifiedAddress1'
                            value={igmCrgData.notifiedAddress1}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Notified Address2
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="notifiedAddress2"
                            name='notifiedAddress2'
                            value={igmCrgData.notifiedAddress2}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Notified Address3
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="notifiedAddress3"
                            name='notifiedAddress3'
                            value={igmCrgData.notifiedAddress3}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            IMO Code
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="imoCode"
                            name='imoCode'
                            value={igmCrgData.imoCode}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            UN No
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="unNo"
                            name='unNo'
                            value={igmCrgData.unNo}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Haz/Reefer Remarks
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="hazReeferRemarks"
                            name='hazReeferRemarks'
                            value={igmCrgData.hazReeferRemarks}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            DO No
                        </label>
                        <Input
                            className={`form-control`}
                            value={igmCnData[0].doNo}
                            type="text"
                            disabled
                            id="gatePassNo"
                            name='gatePassNo'
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
                                selected={igmCnData[0].doDate}
                                id="beDate"
                                disabled
                                name="beDate"
                                dateFormat="dd/MM/yyyy"
                                timeInputLabel="Time:"
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                className={`form-control border-right-0 inputField`}
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
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            DO Validity Date
                        </label>
                        <div style={{ position: 'relative' }}>
                            <DatePicker
                                selected={igmCnData[0].doValidityDate}
                                id="beDate"
                                disabled
                                name="beDate"
                                dateFormat="dd/MM/yyyy"
                                timeInputLabel="Time:"
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                className={`form-control border-right-0 inputField`}
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
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            BOE No
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="beNo"
                            name='beNo'
                            value={igmCrgData.beNo}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            BOE Date
                        </label>
                        <div style={{ position: 'relative' }}>
                            <DatePicker
                                selected={igmCrgData.beDate}
                                id="beDate"
                                disabled
                                name="beDate"
                                dateFormat="dd/MM/yyyy"
                                timeInputLabel="Time:"
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                className={`form-control border-right-0 inputField`}
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
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Assessable Value
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="cargoValue"
                            name='cargoValue'
                            value={igmCrgData.cargoValue}
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Cargo Duty
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="cargoDuty"
                            name='cargoDuty'
                            value={igmCrgData.cargoDuty}
                        />
                    </FormGroup>
                </Col>

                <Col md={2}>
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            CHA
                        </label>
                        <Input
                            className={`form-contro`}
                            type="text"
                            disabled
                            id="chaName"
                            name='chaName'
                            value={igmCrgData.chaName}
                        />
                    </FormGroup>
                </Col>


            </Row>
            <hr />
            <Row className='text-center'>
                <Col>


                    <button
                        className="btn btn-outline-danger btn-margin newButton"
                        style={{ marginRight: 10 }}
                        id="submitbtn2"
                        onClick={handleClear}
                    >
                        <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                        Clear
                    </button>


                </Col>
            </Row>


            <div className="mt-5 table-responsive">
                <table className="table table-bordered table-hover tableHeader dynamic-table">
                    <thead className="tableHeader">
                        <tr>

                            <th scope="col" className="text-center" style={{ color: 'black' }}>Container No</th>
                            <th scope="col" className="text-center" style={{ color: 'black' }}>Size/Type</th>
                            <th scope="col" className="text-center" style={{ color: 'black' }}>Type Of Container</th>
                            <th scope="col" className="text-center" style={{ color: 'black' }}>Weight</th>
                            <th scope="col" className="text-center" style={{ color: 'black' }}>No Of Pkgs</th>
                            <th scope="col" className="text-center" style={{ color: 'black' }}>Agent Seal No</th>
                            <th scope="col" className="text-center" style={{ color: 'black' }}>Delivery Mode</th>
                            <th scope="col" className="text-center" style={{ color: 'black' }}>Scan Type</th>
                            <th scope="col" className="text-center" style={{ color: 'black' }}>Scan Document Status</th>
                            <th scope="col" className="text-center" style={{ color: 'black', minWidth: 150 }}>Hold</th>
                            <th scope="col" className="text-center" style={{ color: 'black' }}>Hold Status</th>
                            <th scope="col" className="text-center" style={{ color: 'black' }}>Release Status</th>
                            <th scope="col" className="text-center" style={{ color: 'black' }}>ODC Status</th>
                            <th scope="col" className="text-center" style={{ color: 'black' }}>Low Bed</th>
                            <th scope="col" className="text-center" style={{ color: 'black' }}>Gate In Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {igmCnData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.containerNo}</td>
                                <td>{item.containerSize}{item.containerType}</td>
                                <td>{item.typeOfContainer}</td>
                                <td>{item.grossWt}</td>
                                <td>{item.noOfPackages}</td>
                                <td>{item.customsSealNo}</td>
                                <td>{item.upTariffDelMode}</td>
                                <td>{item.scannerType}</td>
                                <td>{item.scanningDoneStatus}</td>
                                <td style={{ color: item.holdStatus === 'H' ? 'red' : item.holdStatus === 'R' ? 'inherit' : 'inherit'}}>
                                    {item.holdStatus === 'H' ? 'Hold' : item.holdStatus === 'R' ? 'Release' : item.holdStatus}
                                </td>

                                <td>
                                    <button
                                        className="btn btn-outline-primary btn-margin newButton"

                                        id="submitbtn2"
                                        disabled={item.containerNo === ''}
                                        onClick={() => openHoldModal(item.igmNo, item.igmTransId, item.igmLineNo, item.containerNo, item.gateInId)}
                                    >
                                        <FontAwesomeIcon icon={faAdd} />

                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-outline-primary btn-margin newButton"

                                        id="submitbtn2"
                                        disabled={item.containerNo === ''}
                                        onClick={() => openReleaseModal(item.igmNo, item.igmTransId, item.igmLineNo, item.containerNo, item.gateInId)}
                                    >
                                        <FontAwesomeIcon icon={faAdd} />

                                    </button>
                                </td>
                                <td>{item.odcStatus === 'Y' ? 'Yes' : 'No'}</td>
                                <td>{item.lowBed === 'Y' ? 'Yes' : 'No'}</td>
                                <td >
                                    <div style={{ position: 'relative', width: 150 }}>
                                        <DatePicker
                                            selected={item.gateInDate}
                                            id="igmDate"
                                            disabled
                                            name="igmDate"
                                            dateFormat="dd/MM/yyyy"
                                            timeInputLabel="Time:"
                                            timeFormat="HH:mm"
                                            timeIntervals={15}
                                            className={`form-control border-right-0 inputField`}
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal Modal isOpen={isModalOpenForHold} onClose={closeHoldModal} toggle={closeHoldModal} style={{ maxWidth: '1100px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                <ModalHeader toggle={closeHoldModal} style={{
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
                        icon={faStopCircle}
                        style={{
                            marginRight: '8px',
                            color: 'white', // Set the color to golden
                        }}
                    /> Hold Containers</h5>



                </ModalHeader>
                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    IGM No
                                </label>
                                <Input
                                    className={`form-contro`}
                                    type="text"
                                    disabled
                                    id="igm"
                                    name='igm'
                                    value={hold.igmNo}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    IGM No
                                </label>
                                <Input
                                    className={`form-contro`}
                                    type="text"
                                    disabled
                                    id="igmLineNo"
                                    name='igmLineNo'
                                    value={hold.igmLineNo}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Container No
                                </label>
                                <Input
                                    className={`form-contro`}
                                    type="text"
                                    disabled
                                    id="containerNo"
                                    name='containerNo'
                                    value={hold.containerNo}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Holding Agency <span style={{ color: 'red' }}>*</span>
                                </label>
                                <Input
                                    className={`form-control ${holdErrors.holdingAgency ? 'error-border' : ''}`}
                                    type="select"
                                    id="holdingAgency"
                                    name='holdingAgency'
                                    value={hold.holdingAgency}
                                    onChange={(e) => {
                                        setHold({
                                            ...hold,
                                            holdingAgency: e.target.value
                                        }); setHoldErrors({
                                            ...holdErrors,
                                            holdingAgency: ''
                                        })
                                    }}
                                >
                                    <option value="">Select Agency</option>
                                    {agency.map((item, index) => (
                                        <option key={index} value={item[0]}>{item[1]}</option>
                                    ))}
                                </Input>
                                <div style={{ color: 'red' }} className="error-message">{holdErrors.holdingAgency}</div>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Hold Date <span style={{ color: 'red' }}>*</span>
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <DatePicker
                                        selected={hold.holdDate}
                                        id="holdDate"
                                        onChange={(date) => {
                                            setHold({
                                                ...hold,
                                                holdDate: date
                                            }); setHoldErrors({
                                                ...holdErrors,
                                                holdDate: ''
                                            })
                                        }}
                                        maxDate={new Date()}
                                        name="holdDate"
                                        dateFormat="dd/MM/yyyy HH:mm"
                                        timeInputLabel="Time:"
                                        timeFormat="HH:mm"
                                        showTimeInput
                                        timeIntervals={15}
                                        className={`form-control border-right-0 inputField ${holdErrors.holdDate ? 'error-border' : ''}`}
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
                                <div style={{ color: 'red' }} className="error-message">{holdErrors.holdDate}</div>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Holding Remarks <span style={{ color: 'red' }}>*</span>
                                </label>
                                <Input
                                    className={`form-control ${holdErrors.holdRemarks ? 'error-border' : ''}`}
                                    type="textarea"
                                    id="holdRemarks"
                                    name='holdRemarks'
                                    onChange={(e) => {
                                        setHold({
                                            ...hold,
                                            holdRemarks: e.target.value
                                        }); setHoldErrors({
                                            ...holdErrors,
                                            holdRemarks: ''
                                        })
                                    }}
                                    value={hold.holdRemarks}
                                />
                                <div style={{ color: 'red' }} className="error-message">{holdErrors.holdRemarks}</div>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Hold By
                                </label>
                                <Input
                                    className={`form-contro`}
                                    type="text"
                                    id="holdBy"
                                    name='holdBy'
                                    disabled
                                    value={hold.holdBy}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Row className='text-center'>
                            <Col>
                                <button
                                    className="btn btn-outline-primary btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    onClick={handleSaveHold}
                                >
                                    <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                    Save
                                </button>

                                <button
                                    className="btn btn-outline-danger btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    onClick={holdClear}
                                >
                                    <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                    Clear
                                </button>

                                <div className="mt-3 table-responsive">
                                    <table className="table table-bordered table-hover tableHeader dynamic-table">
                                        <thead className="tableHeader">
                                            <tr>

                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Holding Agency</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Hold Date</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Holding Remarks</th>
                                                <th scope="col" className="text-center" style={{ color: 'black' }}>Hold By</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {holdData.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.holdingAgency}</td>
                                                    <td className='text-center' style={{ width: 200 }}>
                                                        <div className='text-center' style={{ position: 'relative', width: 150 }}>
                                                            <DatePicker
                                                                selected={new Date(item.holdDate)}
                                                                id="holdDate"
                                                                disabled
                                                                name="holdDate"
                                                                dateFormat="dd/MM/yyyy HH:mm"
                                                                timeInputLabel="Time:"
                                                                timeFormat="HH:mm"
                                                                timeIntervals={15}
                                                                className={`form-control border-right-0 inputField`}
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
                                                    </td>
                                                    <td>{item.holdRemarks}</td>
                                                    <td>{item.holdUser}</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Col>
                        </Row>
                    </Row>
                </ModalBody>
            </Modal>

            <Modal Modal isOpen={isModalOpenForRelease} onClose={closeReleaseModal} toggle={closeReleaseModal} style={{ maxWidth: '1100px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                <ModalHeader toggle={closeReleaseModal} style={{
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
                        icon={faStopCircle}
                        style={{
                            marginRight: '8px',
                            color: 'white', // Set the color to golden
                        }}
                    /> Release Containers</h5>



                </ModalHeader>
                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    IGM No
                                </label>
                                <Input
                                    className={`form-contro`}
                                    type="text"
                                    disabled
                                    id="igm"
                                    name='igm'
                                    value={hold.igmNo}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    IGM No
                                </label>
                                <Input
                                    className={`form-contro`}
                                    type="text"
                                    disabled
                                    id="igmLineNo"
                                    name='igmLineNo'
                                    value={hold.igmLineNo}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Container No
                                </label>
                                <Input
                                    className={`form-contro`}
                                    type="text"
                                    disabled
                                    id="containerNo"
                                    name='containerNo'
                                    value={hold.containerNo}
                                />
                            </FormGroup>
                        </Col>
                    </Row>


                    <div className="mt-3 table-responsive">
                        <table className="table table-bordered table-hover tableHeader dynamic-table">
                            <thead className="tableHeader">
                                <tr>

                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Holding Agency</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Hold Date</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Holding Remarks</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Hold By</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Released</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Release Date <span style={{ color: 'red' }}>*</span></th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Release Remarks <span style={{ color: 'red' }}>*</span></th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Release By</th>

                                </tr>
                            </thead>
                            <tbody>
                                {holdData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.holdingAgency}</td>
                                        <td className='text-center' style={{ width: 200 }}>
                                            <div className='text-center' style={{ position: 'relative', width: 150 }}>
                                                <DatePicker
                                                    selected={new Date(item.holdDate)}
                                                    id="holdDate"
                                                    disabled
                                                    name="holdDate"
                                                    dateFormat="dd/MM/yyyy HH:mm"
                                                    timeInputLabel="Time:"
                                                    timeFormat="HH:mm"
                                                    timeIntervals={15}
                                                    className={`form-control border-right-0 inputField`}
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
                                        </td>
                                        <td>{item.holdRemarks}</td>
                                        <td>{item.holdUser}</td>
                                        <td>
                                            <Input
                                                className="form-check-Input radios"
                                                style={{ width: 25, height: 25 }}
                                                type="checkbox"
                                                id={`holdStatus${index}`}
                                                name='holdStatus'
                                                disabled={item.holdStatus === 'R'}
                                                checked={selectedRows.some(selectedItem => selectedItem.holdingAgency === item.holdingAgency) || item.holdStatus === 'R'}
                                                onChange={() => handleCheckboxChange(item, index)}
                                            />
                                        </td>
                                        <td className='text-center' style={{ width: 200 }}>
                                            <div className='text-center' style={{ position: 'relative', width: 150 }}>
                                                <DatePicker
                                                    selected={item.releaseDate}
                                                    
                                                    id={`releaseDate${index}`}
                                                    onChange={(date) => {
                                                        // Update holdData
                                                        setHoldData(prevState => {
                                                            const updatedData = [...prevState];
                                                            updatedData[index] = {
                                                                ...updatedData[index],
                                                                releaseDate: date
                                                            };
                                                            return updatedData;
                                                        });

                                                        // Update selectedRows
                                                        setSelectedRows(prevState => {
                                                            const updatedRows = [...prevState];
                                                            const updatedRowIndex = updatedRows.findIndex(row => row.holdingAgency === item.holdingAgency); // Assuming 'id' is unique for each row

                                                            if (updatedRowIndex !== -1) {
                                                                updatedRows[updatedRowIndex] = {
                                                                    ...updatedRows[updatedRowIndex],
                                                                    releaseDate: date
                                                                };
                                                            }
                                                            return updatedRows;
                                                        });

                                                        // Update errors
                                                        setErrors(prevErrors => {
                                                            const updatedErrors = [...prevErrors];
                                                            if (updatedErrors[index]) {
                                                                delete updatedErrors[index]['releaseDate']; // Corrected field access
                                                                if (Object.keys(updatedErrors[index]).length === 0) {
                                                                    updatedErrors.splice(index, 1);
                                                                }
                                                            }
                                                            return updatedErrors;
                                                        });
                                                    }}
                                                    name="releaseDate"
                                                    maxDate={new Date()}
                                                    dateFormat="dd/MM/yyyy HH:mm"
                                                    popperPlacement="right-start"
                                                    timeInputLabel="Time:"
                                                    showTimeInput
                                                    timeFormat="HH:mm"
                                                    timeIntervals={15}
                                                    className={`form-control border-right-0 inputField ${errors[index]?.releaseDate ? 'error-border' : ''}`}
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
                                        </td>

                                        <td>
                                            <Input
                                                className={`form-control ${errors[index]?.releaseRemarks ? 'error-border' : ''}`}
                                                type="textarea"
                                                id={`releaseRemarks${index}`}
                                                name='releaseRemarks'
                                                value={item.releaseRemarks}
                                                maxLength={150}
                                                onChange={(e) => {
                                                    // Update holdData
                                                    setHoldData(prevState => {
                                                        const updatedData = [...prevState];
                                                        updatedData[index] = {
                                                            ...updatedData[index],
                                                            releaseRemarks: e.target.value
                                                        };
                                                        return updatedData;
                                                    });

                                                    // Update selectedRows
                                                    setSelectedRows(prevState => {
                                                        const updatedRows = [...prevState];
                                                        const updatedRowIndex = updatedRows.findIndex(row => row.holdingAgency === item.holdingAgency); // Assuming 'id' is unique for each row

                                                        if (updatedRowIndex !== -1) {
                                                            updatedRows[updatedRowIndex] = {
                                                                ...updatedRows[updatedRowIndex],
                                                                releaseRemarks: e.target.value
                                                            };
                                                        }
                                                        return updatedRows;
                                                    });

                                                    // Update errors
                                                    setErrors(prevErrors => {
                                                        const updatedErrors = [...prevErrors];
                                                        if (updatedErrors[index]) {
                                                            delete updatedErrors[index]['releaseRemarks']; // Corrected field access
                                                            if (Object.keys(updatedErrors[index]).length === 0) {
                                                                updatedErrors.splice(index, 1);
                                                            }
                                                        }
                                                        return updatedErrors;
                                                    });
                                                }}
                                            />
                                        </td>

                                        <td>{!item.releaseUser ? userId : item.releaseUser}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Row>
                        <Col>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={releaseContainers}
                            >
                                <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                Release Containers
                            </button>
                        </Col>
                    </Row>
                </ModalBody >
            </Modal >
        </div >
    )
}
