
import AuthContext from '../Components/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext, useRef } from 'react';
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
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faCalendarAlt, faAdd, faCancel, faXmark, faArrowDown, faPlus, faArrowUp, faEdit, faA, faCamera, faCameraAlt, faPhoneAlt, faCameraRotate } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import useAxios from '../Components/useAxios';
import { dark } from '@mui/material/styles/createPalette';
import { toast } from 'react-toastify';
import { error } from 'jquery';
import { Collapse } from 'bootstrap';

export default function BondWaiverEntry({ acttab }) {
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

    const [selectedInvoice, setSelectedInvoice] = useState("NOC");

    // Handle change in radio button selection
    const handleSelectInvoice = (value) => {


        if (selectedInvoice !== value) {
            handleClear();
        }

        setSelectedInvoice(value);
    };

    const [exBoeData, setExBoeData] = useState([]);
    const [selectExBoeData, setSelectExBoeData] = useState('');


    const getExBoeSearchData = (val) => {
        console.log('val ', val);

        if (!val) {
            setSearchData([]);
            return;
        }

        axios.get(`${ipaddress}waiver/searchExbondBeforeData?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {

                const data = response.data;

                const searchOptions = data.map(port => ({
                    value: port[0],
                    label: port[0],
                    nocTransId: port[1],
                    exbondId: port[2]
                }))
                setExBoeData(searchOptions);
            })
            .catch((error) => {
                setExBoeData([]);
            })
    }

    const handleExBondBoeSearchChange = async (selectedOption, { action }) => {

        if (action === 'clear') {

            setSelectExBoeData('');

            handleClear();

        }
        else {
            setSelectExBoeData(selectedOption.value);

            setIgmDtl({
                igmNo: selectedOption.exbondId,
                igmTransId: selectedOption.nocTransId,
                igmLineNo: ""
            })

            getSelectedNocData(selectedOption.exbondId, selectedOption.nocTransId);
        }
    };






    const [searchval, setSearchVal] = useState('');

    const [searchData, setSearchData] = useState([]);

    const getSearchData = (val) => {
        console.log('val ', val);

        if (!val) {
            setSearchData([]);
            return;
        }

        axios.get(`${ipaddress}waiver/searchBeforeWaiverData?cid=${companyid}&bid=${branchId}&val=${val}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {

                const data = response.data;




                const searchOptions = data.map(port => ({
                    value: port[0],
                    label: port[0] + ' - ' + (port[1] === null ? "" : port[1]),
                    bondingNo: port[1] === null ? "" : port[1],
                    nocTransId: port[2],
                    nocNo: port[3]
                }))
                setSearchData(searchOptions);
            })
            .catch((error) => {
                setSearchData([]);
            })
    }

    const handleSearchChange = async (selectedOption, { action }) => {

        if (action === 'clear') {

            setSearchVal('');

            handleClear();

        }
        else {
            setSearchVal(selectedOption.label);

            setIgmDtl({
                igmNo: selectedOption.nocNo,
                igmTransId: selectedOption.nocTransId,
                igmLineNo: ""
            })

            getSelectedNocData(selectedOption.nocTransId, selectedOption.nocNo);
        }
    };


    const getSelectedNocData = (noctrans, noc) => {

        try {
            setLoading(true);

            axios.get(`${ipaddress}waiver/checkNocNo?cid=${companyid}&bid=${branchId}&noc=${noc}&nocTransId=${noctrans}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            })
                .then((response) => {
                    setLoading(false);

                    const data = response.data;

                    const docData = data.docData;
                    const servicData = data.servicData;


                    if (docData.length > 0) {
                        setDocDtl(docData.map((item) => ({
                            igmTransId: item[1] || "",
                            igmNo: item[0] || "",
                            igmLineNo: item[2] || "",
                            srNo: item[3] || "",
                            docPath: item[4] || "",
                            file: null,
                        })))
                    }
                    if (fileInputRef.current) {
                        fileInputRef.current.value = null; // Safely reset the file input field
                    }

                    if (servicData.length > 0) {
                        setServiceDtl(servicData.map((item) => ({
                            igmTransId: item[0] || "",
                            igmNo: item[1] || "",
                            igmLineNo: item[2] || "",
                            serviceId: item[3] || "",
                            serviceDesc: item[4] || "",
                            percentage: item[5] || "",
                            amount: item[6] || "",
                            remark: item[7] || "",
                            cfsTariffNo: "",
                            cfsAmndNo: ""
                        })))

                    }



                    toast.success("Data found successfully!!", {
                        autoClose: 800
                    })

                })
                .catch((error) => {
                    setLoading(false);

                    toast.error(error.response.data, {
                        autoClose: 800
                    });


                    handleClear();
                })
        } catch (error) {
            setLoading(false);

        }
    }


    const [igmDtl, setIgmDtl] = useState({
        igmNo: "",
        igmTransId: "",
        igmLineNo: ""
    })

    const [docDtl, setDocDtl] = useState([{
        igmTransId: "",
        igmNo: "",
        igmLineNo: "",
        srNo: "",
        docPath: "",
        file: null,
    }])

    const [serviceDtl, setServiceDtl] = useState([{
        igmTransId: "",
        igmNo: "",
        igmLineNo: "",
        serviceId: "",
        serviceDesc: "",
        percentage: "",
        amount: "",
        remark: "",
        cfsTariffNo: "",
        cfsAmndNo: ""
    }])

    const [errors, setErrors] = useState([]);

    const handleClear = () => {
        setExBoeData([]);
        setSelectExBoeData('');
        setSearchVal('');
        setSearchData([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = null; // Safely reset the file input field
        }
        setIgmDtl({
            igmNo: "",
            igmTransId: "",
            igmLineNo: ""
        })
        setErrors([]);
        setDocDtl([{
            igmTransId: "",
            igmNo: "",
            igmLineNo: "",
            srNo: "",
            docPath: "",
            file: null,
        }])

        setServiceDtl([{
            igmTransId: "",
            igmNo: "",
            igmLineNo: "",
            serviceId: "",
            serviceDesc: "",
            percentage: "",
            amount: "",
            remark: "",
            cfsTariffNo: "",
            cfsAmndNo: ""
        }])
    }

    const fileInputRef = useRef(null); // Ref for the file input


    const handleFileChange = (index, event) => {
        const file = event.target.files[0]; // Get the selected file

        // Convert 10 MB to bytes
        const maxSizeInBytes = 10 * 1024 * 1024;

        // Check if the file size exceeds the limit
        if (file.size > maxSizeInBytes) {
            toast.error('File size must be less than or equal to 10 MB.', {
                autoClose: 800
            });
            event.target.value = ''; // Clear the input
            return; // Exit the function
        }


        const newUploadDtls = [...docDtl];
        newUploadDtls[index].file = event.target.files[0]; // Store the selected file
        setDocDtl(newUploadDtls);

    };

    const addDoc = () => {
        const newRow = {
            igmTransId: "",
            igmNo: "",
            igmLineNo: "",
            srNo: "",
            docPath: "",
            file: null,
        }

        setDocDtl([...docDtl, newRow]); // Add the new row to the array

    }


    const removeDoc = (index) => {
        setDocDtl(prevState => prevState.filter((_, i) => i !== index));

    }

    const addService = () => {
        const newRow = {
            igmTransId: "",
            igmNo: "",
            igmLineNo: "",
            serviceId: "",
            serviceDesc: "",
            percentage: "",
            amount: "",
            remark: ""
        }

        setServiceDtl([...serviceDtl, newRow]); // Add the new row to the array

    }

    const removeService = (index) => {
        setServiceDtl(prevState => prevState.filter((_, i) => i !== index));

    }

    const [services, setServices] = useState([]);

    const getServices = () => {
        axios.get(`${ipaddress}waiver/getServices?cid=${companyid}&bid=${branchId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                const data = response.data;
                const portOptions = data.map(port => ({
                    value: port[0],
                    label: port[1],
                    unit: port[2],
                    rate: port[3],
                    tariffNo: port[4],
                    amndNo: port[5],
                }))
                setServices(portOptions);
            })
            .catch((error) => {

            })
    }

    useEffect(() => {
        if (acttab === 'P00255') {
            getServices();
        }
    }, [acttab])

    const handleChangeServices = async (selectedOption, { action }, index) => {
        if (action === 'clear') {
            setServiceDtl(prevState => {
                const updatedData = [...prevState];
                updatedData[index] = {
                    ...updatedData[index],
                    igmTransId: "",
                    igmNo: "",
                    igmLineNo: "",
                    serviceId: "",
                    serviceDesc: "",
                    percentage: "",
                    amount: "",
                    remark: "",
                    cfsTariffNo: "",
                    cfsAmndNo: ""
                };
                return updatedData;
            });
        } else {
            // Check if the selectedOption.value already exists in addService
            setServiceDtl(prevState => {
                // Check if selectedOption.value already exists in the previous state
                const exists = prevState.some(service => service.serviceId === selectedOption.value);

                if (!exists) {
                    const updatedData = [...prevState];

                    // Update the specific index with the selected values
                    updatedData[index] = {
                        ...updatedData[index],
                        igmTransId: "",
                        igmNo: "",
                        igmLineNo: "",
                        serviceId: selectedOption.value,
                        serviceDesc: selectedOption.label,
                        percentage: "",
                        amount: "",
                        remark: "",
                        cfsTariffNo: selectedOption.tariffNo,
                        cfsAmndNo: selectedOption.amndNo
                    };

                    // Check if there's an empty row (serviceId is empty) in the updated data
                    const emptyRowExists = updatedData.some(service => service.serviceId === '');

                    // If no empty row exists, add a new empty row
                    if (!emptyRowExists) {
                        updatedData.push({
                            igmTransId: "",
                            igmNo: "",
                            igmLineNo: "",
                            serviceId: "",
                            serviceDesc: "",
                            percentage: "",
                            amount: "",
                            remark: "",
                            cfsTariffNo: "",
                            cfsAmndNo: ""
                        });
                    }

                    return updatedData;
                }

                // If the value already exists, return the previous state without any modification
                return prevState;
            });
        }
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

    const handleChangeAddService = (e, index, val1, val2) => {
        const { name, value } = e.target;
        let sanitizedValue = value;

        // Sanitize input for specific fields
        if (['percentage', 'amount'].includes(name)) {
            sanitizedValue = handleInputChange(value, val1, val2);
        }

        if (['percentage'].includes(name)) {
            if (sanitizedValue > 100) {
                sanitizedValue = '';
            }
        }

        setServiceDtl(prevState => {
            const updatedData = [...prevState];
            updatedData[index] = {
                ...updatedData[index],
                [name]: sanitizedValue
            };
            return updatedData;
        });

        if (['percentage', 'amount',].includes(name)) {
            setErrors(prevErrors => {
                const updatedErrors = [...prevErrors];
                if (updatedErrors[index]) {
                    delete updatedErrors[index]['amount']; // Corrected field access
                    if (Object.keys(updatedErrors[index]).length === 0) {
                        updatedErrors.splice(index, 1);
                    }
                }
                return updatedErrors;
            });
        }
        else {
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
        }
    }





    const handleSave = () => {
        setErrors([]);


        if (selectedInvoice === 'NOC') {
            if (igmDtl.igmTransId === '') {
                toast.error("NOC data not found.", {
                    autoClose: 800
                })
                return;
            }
        }
        else {
            if (igmDtl.igmTransId === '') {
                toast.error("Ex bond data not found.", {
                    autoClose: 800
                })
                return;
            }
        }

        const ser = serviceDtl.filter(item => item.serviceId !== '');

        if (ser.length === 0) {
            toast.error("Please add atleast one service.", {
                autoClose: 800
            })
            return;
        }

        let newErrors = serviceDtl.map(() => ({}));

        serviceDtl.forEach((data, index) => {

            if (data.serviceId !== '') {
                let rowErrors = {};

                if (!data.remark) rowErrors.remark = "remark is required.";
                if ((data.amount === '' || data.amount <= 0) && (data.percentage === '' || data.percentage <= 0)) rowErrors.amount = "Amount is required.";

                if (Object.keys(rowErrors).length > 0) {
                    newErrors[index] = rowErrors;
                }
            }
        });

        const hasErrors = newErrors.some(errorObj => Object.keys(errorObj).length > 0);

        if (hasErrors) {
            setErrors(newErrors);
            toast.error("Please fill in the required fields.", {
                autoClose: 1000
            });

            return;
        }

        setLoading(true);
        const formData = new FormData();
        const requestData = {
            docData: docDtl,
            serviceData: serviceDtl
        };
        formData.append("data", JSON.stringify(requestData));
        docDtl.forEach((doc, index) => {
            if (doc.file) {

                formData.append("files", doc.file);
            }

        });

        let ip = "";

        if(selectedInvoice === "NOC"){
           ip = `${ipaddress}waiver/saveNOCData?cid=${companyid}&bid=${branchId}&igm=${igmDtl.igmNo}&igmTransId=${igmDtl.igmTransId}&lineNo=${igmDtl.igmLineNo}&user=${userId}`;
        }
        else{
           ip = `${ipaddress}waiver/saveExbondData?cid=${companyid}&bid=${branchId}&igm=${igmDtl.igmNo}&igmTransId=${igmDtl.igmTransId}&lineNo=${igmDtl.igmLineNo}&user=${userId}`;
        }

        axios.post(ip,
            formData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response) => {
                setLoading(false);

                const data = response.data;

                console.log('data ', data);


                const docData = data.docData;
                const servicData = data.servicData;

                setIgmDtl({
                    igmNo: servicData[0][1],
                    igmTransId: servicData[0][0],
                    igmLineNo: servicData[0][2]
                })

                if (docData.length > 0) {
                    setDocDtl(docData.map((item) => ({
                        igmTransId: item[1] || "",
                        igmNo: item[0] || "",
                        igmLineNo: item[2] || "",
                        srNo: item[3] || "",
                        docPath: item[4] || "",
                        file: null,
                    })))
                }
                if (fileInputRef.current) {
                    fileInputRef.current.value = null; // Safely reset the file input field
                }
                setServiceDtl(servicData.map((item) => ({
                    igmTransId: item[0] || "",
                    igmNo: item[1] || "",
                    igmLineNo: item[2] || "",
                    serviceId: item[3] || "",
                    serviceDesc: item[4] || "",
                    percentage: item[5] || "",
                    amount: item[6] || "",
                    remark: item[7] || "",
                    cfsTariffNo: "",
                    cfsAmndNo: ""
                })))

                toast.success("Data save successfully!!", {
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

    const downloadFile = async (sr, fileName) => {
        try {


            let formData = new FormData();
            formData.append('cid', companyid);
            formData.append('bid', branchId);
            formData.append('igmtrans', igmDtl.igmTransId);
            formData.append('igm', igmDtl.igmNo);
            formData.append('igmLine', igmDtl.igmLineNo);
            formData.append('sr', sr);

            const params = new URLSearchParams(formData);

            const response = await axios.get(`${ipaddress}waiver/downloadFile?${params}`, {
                responseType: 'blob', // Important for file download
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });

            // Get the file name from the response headers, or use the passed fileName
            const downloadedFileName = response.headers['content-disposition']
                ? response.headers['content-disposition'].split('filename=')[1].replace(/"/g, '')
                : fileName; // Fallback to passed fileName if not found

            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create a temporary anchor element to trigger the download
            const link = document.createElement('a');
            link.href = url;

            // Set the file name for download (you can change this to be dynamic based on the response)
            link.setAttribute('download', downloadedFileName);

            // Append the anchor to the document and trigger a click event
            document.body.appendChild(link);
            link.click();

            // Clean up by removing the anchor element from the document
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
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
                    {/* <div className="container">
                        <div className="radio-tile-group">
                            <div className="input-container">
                                <input
                                    id="noc1"
                                    className="radio-button"
                                    type="radio"
                                    name="radio"
                                    value="noc1"
                                    checked={selectedInvoice === "NOC"}
                                    onChange={() => handleSelectInvoice("NOC")}
                                />
                                <div className="radio-tile">
                                    <div className="icon walk-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="48"
                                            height="48"
                                            fill="currentColor"
                                            className="bi bi-file-earmark-text-fill"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1z" />
                                        </svg>
                                        <label htmlFor="noc1" className="radio-tile-label">
                                            NOC
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="input-container">
                                <input
                                    id="exbond1"
                                    className="radio-button"
                                    type="radio"
                                    name="radio"
                                    value="exbond1"
                                    checked={selectedInvoice === "EXBOND"}
                                    onChange={() => handleSelectInvoice("EXBOND")}
                                />
                                <div className="radio-tile">
                                    <div className="icon bike-icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="48"
                                            height="48"
                                            fill="currentColor"
                                            className="bi bi-truck"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                                        </svg>
                                        <label htmlFor="exbond1" className="radio-tile-label">
                                            ExBond
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            Select Waiver Type
                        </label>
                        <Input
                            className={`form-control`}
                            type="select"
                            id="selectedInvoice"
                            name='selectedInvoice'
                            value={selectedInvoice}
                            onChange={(e) => handleSelectInvoice(e.target.value)}
                        >
                            <option value="NOC">NOC</option>
                            <option value="EXBOND">EXBOND</option>
                        </Input>
                    </FormGroup>
                </Col>

                {selectedInvoice === "NOC" && (
                    <Col md={4}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Search BOE No / Bond No
                            </label>
                            <Select
                                value={{ value: searchval, label: searchval }}
                                onChange={handleSearchChange}
                                onInputChange={getSearchData}
                                options={searchData}
                                placeholder="Select Account Holder"
                                isClearable
                                menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                                menuPosition="fixed" // Sets the dropdown menu position to fixed    
                                id="searchval"
                                name="searchval"
                                className="autocompleteHeight"
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
                )}

                {selectedInvoice === "EXBOND" && (
                    <Col md={4}>
                        <FormGroup>
                            <label className="forlabel bold-label" htmlFor="sbRequestId">
                                Search Ex BOE No
                            </label>
                            <Select
                                value={{ value: selectExBoeData, label: selectExBoeData }}
                                onChange={handleExBondBoeSearchChange}
                                onInputChange={getExBoeSearchData}
                                options={exBoeData}
                                placeholder="Select Account Holder"
                                isClearable
                                menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                                menuPosition="fixed" // Sets the dropdown menu position to fixed    
                                id="searchval"
                                name="searchval"
                                className="autocompleteHeight"
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
                )}


            </Row>


            {igmDtl.igmTransId !== '' && (
                <>
                    <hr />

                    <Row>
                        <Col className='text-center'>
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
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={addDoc}
                            >
                                <FontAwesomeIcon icon={faAdd} style={{ marginRight: "5px" }} />
                                Add Documents
                            </button>
                        </Col>
                    </Row>

                    <div className="mt-3 table-responsive " style={{ fontSize: 14, overflowX: 'auto' }}>
                        <table className="table table-bordered table-hover tableHeader dynamic-table">
                            <thead className="tableHeader">
                                <tr>
                                    <th scope="col" className="text-center" colSpan={5} style={{ color: 'black', width: 70 }}>Upload Details</th>
                                </tr>
                                <tr>
                                    <th scope="col" className="text-center" style={{ color: 'black', width: 70 }}>Sr No</th>
                                    <th scope="col" className="text-center" style={{ color: 'black', width: 400 }}>Browse</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>File Name</th>
                                    <th scope="col" className="text-center" style={{ color: 'black', width: 100 }}>Download</th>
                                    <th scope="col" className="text-center" style={{ color: 'black', width: 100 }}>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {docDtl.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Input
                                                className="form-control"
                                                type="file"
                                                name='file'
                                                id={`file${index}`}
                                                onChange={(event) => handleFileChange(index, event)}
                                                innerRef={fileInputRef} // Attach the ref to the input
                                                disabled={item.igmTransId !== ''}
                                            />
                                        </td>
                                        <td>{item.docPath.split('\\').pop().split('/').pop()}</td>
                                        <td>
                                            <Button
                                                outline
                                                color="success"
                                                className="btn-margin newButton"
                                                style={{ marginRight: 10 }}
                                                id="submitbtn2"
                                                disabled={item.igmTransId === ''}
                                                onClick={() => downloadFile(item.srNo, item.docPath.split('\\').pop().split('/').pop())}

                                            >
                                                <FontAwesomeIcon icon={faDownload} />
                                            </Button>

                                        </td>
                                        <td>
                                            <Button
                                                outline
                                                className="btn btn-danger btn-margin newButton"
                                                style={{ marginRight: 10 }}
                                                id="submitbtn2"
                                                disabled={item.igmTransId !== ''}
                                                onClick={() => removeDoc(index)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <Row>
                        <Col md={4}>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={addService}
                            >
                                <FontAwesomeIcon icon={faAdd} style={{ marginRight: "5px" }} />
                                Add Service
                            </button>
                        </Col>
                    </Row>
                    <div className="mt-3 table-responsive " style={{ fontSize: 14, overflowX: 'auto' }}>
                        <table className="table table-bordered table-hover tableHeader dynamic-table">
                            <thead className="tableHeader">
                                <tr>
                                    <th scope="col" className="text-center" colSpan={6} style={{ color: 'black', width: 70 }}>IGM Waiver Service Details</th>
                                </tr>
                                <tr>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Sr No</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Service Desc</th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Percentage <span style={{ color: 'red' }}>*</span></th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Amount <span style={{ color: 'red' }}>*</span></th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Remarks <span style={{ color: 'red' }}>*</span></th>
                                    <th scope="col" className="text-center" style={{ color: 'black' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serviceDtl.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td style={{ width: 300 }}>
                                            <Select

                                                value={{ value: item.serviceId, label: item.serviceDesc }}
                                                options={services}
                                                onChange={(option, actionMeta) => handleChangeServices(option, actionMeta, index)}
                                                placeholder="Select Service"
                                                isClearable
                                                id={`serviceId${index}`}
                                                name="serviceId"
                                                className={`autocompleteHeight`}
                                                menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                                                menuPosition="fixed"
                                                menuPlacement="top"
                                                isDisabled={item.igmTransId !== ''}

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
                                        </td>
                                        <td>
                                            <Input
                                                className={`form-control ${errors[index]?.amount ? 'error-border' : ''}`}
                                                type="text"
                                                id={`percentage${index}`}
                                                name='percentage'
                                                onChange={(e) => handleChangeAddService(e, index, 3, 2)}
                                                disabled={item.serviceId === '' || item.igmTransId !== '' || item.amount !== ''}
                                                value={item.percentage}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                className={`form-control ${errors[index]?.amount ? 'error-border' : ''}`}
                                                type="text"
                                                id={`amount${index}`}
                                                name='amount'
                                                onChange={(e) => handleChangeAddService(e, index, 13, 3)}
                                                disabled={item.serviceId === '' || item.igmTransId !== '' || item.percentage !== ''}
                                                value={item.amount}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                className={`form-control ${errors[index]?.remark ? 'error-border' : ''}`}
                                                type="textarea"
                                                id={`remark${index}`}
                                                name='remark'
                                                onChange={(e) => handleChangeAddService(e, index)}
                                                disabled={item.serviceId === '' || item.igmTransId !== ''}
                                                value={item.remark}
                                                maxLength={200}
                                            />
                                        </td>
                                        <td>
                                            <Button
                                                outline
                                                className="btn btn-danger btn-margin newButton"
                                                style={{ marginRight: 10 }}
                                                id="submitbtn2"
                                                disabled={item.igmTransId !== ''}
                                                onClick={() => removeService(index)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
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
