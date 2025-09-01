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
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faCalendarAlt, faAdd, faCancel, faXmark, faArrowDown, faPlus, faArrowUp, faEdit, faPrint, faUsersViewfinder, faEye, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import useAxios from '../Components/useAxios';
import { dark } from '@mui/material/styles/createPalette';
import { toast } from 'react-toastify';
import { error } from 'jquery';
import { format, set } from 'date-fns';
import { saveAs } from 'file-saver';

export default function GenerateASRMessage({ activeTab }) {
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

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [checkAll, setCheckAll] = useState('N');
    const [checkAll1, setCheckAll1] = useState('N');
    const [tallyData, setTallyData] = useState([]);

    const [packages, setpackages] = useState([]);
    const getTypeOfPack = () => {
        const id = 'J00060';
        axios.get(`${ipaddress}jardetail/getJarDetail?companyId=${companyid}&jarId=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setpackages(response.data);
            })
            .catch((error) => {

            })
    }

    useEffect(() => {

        if (activeTab === 'P01902') {
            getTypeOfPack();
        }
    }, [activeTab])

    const handleClear = () => {
        setStartDate(null);
        setEndDate(null);
        setCheckAll('N');
        setCheckAll1('N');
        setTallyData([]);
    }
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };
    const handleEndDateChange = (date) => {
        setEndDate(date);
    };
    const handleSearch = () => {
        if (!startDate || !endDate) {
            toast.error("Please select both start and end dates.", { autoClose: 800 });
            setLoading(false);
            return;
        }
        setLoading(true);

        const startDateFormatted = startDate ? format(startDate, 'dd/MM/yyyy HH:mm') : null;
        const endDateFormatted = endDate ? format(endDate, 'dd/MM/yyyy HH:mm') : null;

        axios.get(`${ipaddress}scmtr/getASRBulkSearchData`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
            },
            params: {
                startDate: startDateFormatted,
                endDate: endDateFormatted,
                bid: branchId,
                cid: companyid,
            },
        })
            .then((response) => {
                setLoading(false);
                if (response.status === 200) {
                    const tallyData = response.data;

                    console.log('tallyData ', tallyData);

                    if (tallyData.length > 0) {
                        setTallyData(tallyData);
                    }
                    else {
                        setTallyData([]);
                    }

                   
                } else {
                    toast.error("Error fetching data.", { autoClose: 800 });
                }


            })
            .catch((error) => {
                setLoading(false);
                console.error("Error fetching data:", error);
                toast.error("Error fetching data.", { autoClose: 800 });
            });
    }


    const handleCheckAll1 = (checked) => {
        setCheckAll1(checked ? 'Y' : 'N');

        console.log('tallyData ', tallyData);


        setTallyData((prevData) =>
            prevData.map((item) => {
                return {
                    ...item, // Clone the object instead of using [...item]
                    18: (!item[15] && item[19]) ? (checked ? 'Y' : 'N') : item[18] // Update index 18
                };
            })
        );

    };



    const handleDownload = async (sbData) => {
        try {

            console.log('sbData ', sbData);


            if (parseFloat(sbData[12]) <= 0 || !sbData[12]) {
                toast.error("Please enter from pkg for sb no " + sbData[0], {
                    autoClose: 800
                })
                return;
            }

            if (parseFloat(sbData[13]) <= 0 || !sbData[13]) {
                toast.error("Please enter to pkg for sb no " + sbData[0], {
                    autoClose: 800
                })
                return;
            }
            const sbDataArray = Object.values(sbData);
            setLoading(true);
            const response = await axios.post(`${ipaddress}scmtr/downloadASRJson`, sbDataArray, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                params: {
                    cid: companyid,
                    bid: branchId,
                    user: userId
                }
            });

            console.log('response.data ', response.data);

            setLoading(false);
            const { fileName, fileContent } = response.data;
            if (!fileName || !fileContent) {
                throw new Error("Invalid file data received");
            }

            // Decode Base64 back to binary
            const byteCharacters = atob(fileContent);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: "application/json" });

            saveAs(blob, fileName);
            handleSearch();
        } catch (error) {
            setLoading(false);
            console.error("Error downloading JSON:", error);
        }
    };

    const handleView = async (sbData) => {
        try {
            setLoading(true);
            const sbDataArray = Object.values(sbData);
            const response = await axios.post(`${ipaddress}scmtr/downloadASRJson`, sbDataArray, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                params: {
                    cid: companyid,
                    bid: branchId,
                    user: userId
                }
            });

            console.log('response.data ', response.data);

            setLoading(false);
            const { fileName, fileContent } = response.data;
            if (!fileName || !fileContent) {
                throw new Error("Invalid file data received");
            }

            // Decode Base64 back to JSON string
            const jsonString = atob(fileContent);

            // Parse and Pretty Print JSON
            const jsonObject = JSON.parse(jsonString);
            console.log("JSON File Content:", jsonObject); // Logs JSON in console

            // Open JSON in a new tab as pretty-printed text
            const newTab = window.open();
            newTab.document.write(`<pre>${JSON.stringify(jsonObject, null, 2)}</pre>`);

        } catch (error) {
            setLoading(false);
            console.error("Error downloading JSON:", error);
        }
    };


    const handleCheckboxChange = (e, index) => {
        const newValue = e.target.checked ? 'Y' : 'N';

        // Update the state for the corresponding item
        const updatedData = [...tallyData]; // Assuming `data` is the array storing the table rows
        updatedData[index][18] = newValue;

        setTallyData(updatedData); // Update state
    };


    const handleTallyChange = (e, index) => {
        const newValue = e.target.value;

        // Update the state for the corresponding item
        const updatedData = [...tallyData]; // Assuming `data` is the array storing the table rows
        updatedData[index][14] = newValue;

        setTallyData(updatedData); // Update state
    };

    const handleTallyChange2 = (e, index, i) => {
        const newValue = e.target.value;

        // Update the state for the corresponding item
        const updatedData = [...tallyData]; // Assuming `data` is the array storing the table rows
        updatedData[index][i] = newValue;

        setTallyData(updatedData); // Update state
    };

    const handleTallyChange1 = (e, index, field) => {
        const newValue = parseInt(e.target.value) || 0; // Ensure numeric value
        console.log('newValue:', newValue);

        setTallyData((prevData) =>
            prevData.map((item, i) => {
                if (i !== index) return item; // Skip other rows

                const totalQty = parseInt(item[9]) || 0; // Max allowed value
                const maxDifference = parseInt(item[10]) || 0; // Maximum allowed difference
                let updatedItem = { ...item, [field]: newValue };

                if (field === 12) {
                    // Ensure `fromPkg (12)` is not above `toPkg (13)` or totalQty
                    if (newValue > totalQty) {
                        updatedItem[12] = ""; // Limit to max totalQty
                    }
                    if (newValue > (item[13] || 0)) {
                        updatedItem[13] = ""; // Clear `toPkg (13)` if 12 > 13
                    }
                }

                if (field === 13) {
                    // Ensure `toPkg (13)` is not greater than totalQty or `fromPkg (12)`
                    if (newValue > totalQty) {
                        updatedItem[13] = "";
                    }
                    // else if (newValue < (item[12] || 0)) {
                    //     updatedItem[13] = item[12]; // Ensure `toPkg` is not less than `fromPkg`
                    // }
                }

                // 🛑 NEW CONDITION: Ensure difference between `fromPkg (12)` & `toPkg (13)` is within `maxDifference (10)`
                const fromPkg = parseInt(updatedItem[12]) || 0;
                const toPkg = parseInt(updatedItem[13]) || 0;
                if ((toPkg - fromPkg) + 1 > maxDifference) {
                    updatedItem[13] = ''; // Adjust `toPkg` to respect `maxDifference`
                }

                return updatedItem;
            })
        );

    };



    const updateSingleSfStatus = (job, tallyId, con, sfStatus) => {


        if (!sfStatus) {
            toast.error("Please select SF status", {
                autoClose: 800
            })
            return;
        }

        const startDateFormatted = startDate ? format(startDate, 'dd/MM/yyyy HH:mm') : null;
        const endDateFormatted = endDate ? format(endDate, 'dd/MM/yyyy HH:mm') : null;
        setLoading(true);

        try {

            axios.post(`${ipaddress}scmtr/updateASRStatus`, null, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                params: {
                    cid: companyid,
                    bid: branchId,
                    job: job,
                    stuffTally: tallyId,
                    con: con,
                    status: sfStatus,
                    startDate: startDateFormatted,
                    endDate: endDateFormatted
                }
            })
                .then((response) => {
                    toast.success("Data Update successfully!!", {
                        autoClose: 800
                    });

                    setLoading(false);

                    const tallyData = response.data;

                    if (tallyData.length > 0) {
                        setTallyData(tallyData);
                    }
                    else {
                        setTallyData([]);
                    }

                   

                    setCheckAll1('N');
                    setCheckAll('N');

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


    const updateMultipleSfStatus = () => {




        const checkedData = tallyData.filter(item => (item[18] === 'Y'));

        if (checkedData.length === 0) {
            toast.error("Please select the sb no", {
                autoClose: 800
            });
            return;
        }

        for (let i = 0; i < checkedData.length; i++) {
            const item = checkedData[i];
            if (!item[14]) {
                toast.error("SF status is required for sb no " + item[0], {
                    autoClose: 800
                });
                return; // Exit the function if validation fails
            }
        }


        const startDateFormatted = startDate ? format(startDate, 'dd/MM/yyyy HH:mm') : null;
        const endDateFormatted = endDate ? format(endDate, 'dd/MM/yyyy HH:mm') : null;
        setLoading(true);

        const checkedDataArray = Object.values(checkedData);

        console.log('checkedData ', checkedData);

        console.log('checkedDataArray ', checkedDataArray);

        try {

            axios.post(`${ipaddress}scmtr/updateMultipleASRStatus`, checkedDataArray, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                params: {
                    cid: companyid,
                    bid: branchId,
                    startDate: startDateFormatted,
                    endDate: endDateFormatted
                }
            })
                .then((response) => {
                    toast.success("Data Update successfully!!", {
                        autoClose: 800
                    });

                    setLoading(false);
                    const tallyData = response.data;

                    if (tallyData.length > 0) {
                        setTallyData(tallyData);
                    }
                    else {
                        setTallyData([]);
                    }

                   

                    setCheckAll1('N');
                    setCheckAll('N');

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
                            Start Date
                        </label>
                        <div style={{ position: 'relative' }}>
                            <DatePicker
                                selected={startDate}
                                onChange={handleStartDateChange}
                                name='startDate'
                                id="startDate"
                                dateFormat="dd/MM/yyyy HH:mm"
                                className="form-control"
                                showTimeInput
                                wrapperClassName="custom-react-datepicker-wrapper"
                                customInput={
                                    <input
                                        style={{
                                            height: "30px",
                                            width: "100%",
                                        }}
                                    />

                                }

                            />
                            <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                        </div>
                    </FormGroup>
                </Col>
                <Col md={2} >
                    <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                            End Date
                        </label>
                        <div style={{ position: 'relative' }}>
                            <DatePicker
                                selected={endDate}
                                onChange={handleEndDateChange}
                                name='endDate'
                                id="endDate"
                                dateFormat="dd/MM/yyyy HH:mm"
                                className="form-control"
                                showTimeInput
                                wrapperClassName="custom-react-datepicker-wrapper"
                                customInput={
                                    <input
                                        style={{
                                            height: "30px",
                                            width: "100%",
                                        }}
                                    />

                                }

                            />
                            <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                        </div>
                    </FormGroup>
                </Col>
                <Col md={4} style={{ marginTop: 20 }}>
                    <button
                        className="btn btn-outline-primary btn-margin newButton"
                        style={{ marginRight: 10 }}
                        id="submitbtn2"
                        onClick={handleSearch}
                    >
                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                        Search
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
                </Col>
            </Row>
            <hr />



            <div className="mt-3 table-responsive" style={{ fontSize: 14, marginTop: 20, color: 'red' }}>
                <table className="table table-bordered table-hover tableHeader dynamic-table">
                    <thead className="tableHeader">
                        <tr className="table-header">
                            <th colSpan={18} scope="col" className="text-center">Shipping Bill Details</th>

                        </tr>
                        <tr className="table-header">
                            <th scope="col" className="text-center">SB No</th>
                            <th scope="col" className="text-center">SB Date</th>
                            <th scope="col" className="text-center">Container No</th>
                            <th scope="col" className="text-center">Container Size</th>
                            <th scope="col" className="text-center">Stuffing Date</th>
                            <th scope="col" className="text-center">MPCIN No</th>
                            <th scope="col" className="text-center">POL</th>
                            <th scope="col" className="text-center">Terminal Code</th>
                            <th scope="col" className="text-center">SB Qty</th>
                            <th scope="col" className="text-center">Container Qty</th>
                            <th scope="col" className="text-center" style={{ minWidth: 200 }}>Type Of Pkg</th>
                            <th scope="col" className="text-center">From Pkg</th>
                            <th scope="col" className="text-center">To PKG</th>
                            <th scope="col" className="text-center">Download / View ASR JSON</th>
                            <th scope="col" className="text-center">
                                <Input
                                    className="form-control"
                                    type="checkbox"
                                    style={{ width: 20, height: 23, borderColor: 'black' }}
                                    id="checkAll1"
                                    name='checkAll1'
                                    checked={checkAll1 === 'Y'}
                                    onChange={(e) => handleCheckAll1(e.target.checked)}
                                />
                            </th>
                            <th scope="col" className="text-center">Update SF Status</th>
                            <th scope="col" className="text-center">
                                <button
                                    className="btn btn-outline-primary btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    onClick={updateMultipleSfStatus}
                                >
                                    <FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />
                                    Update All
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tallyData.map((item, index) => {
                           

                            return (
                                <tr key={index}>
                                    <td>{item[0]}</td>  {/* sbNo */}
                                    <td>{item[2]}</td>  {/* containerNo */}
                                    <td>{item[3]}</td>
                                    <td>{item[4]}</td>
                                    <td>{item[5]}</td>
                                    <td>{item[6]}</td>
                                    <td>{item[7]}</td>
                                    <td>{item[8]}</td>
                                    <td>{item[9]}</td>
                                    <td>{item[10]}</td>  {/* totalQty */}
                                    <td>
                                        <Input
                                            className={`form-control`}
                                            type="select"
                                            id={`typeOfPackage${index}`}
                                            onChange={(e) => handleTallyChange2(e, index, 11)}
                                            name='typeOfPackage'
                                            value={item[11]}
                                            disabled
                                        >
                                            <option value="">Select Type Of Package</option>
                                            {packages.map((item, index) => (
                                                <option key={index} value={item[0]}>{item[1]}</option>
                                            ))}
                                        </Input>
                                    </td>  {/* conQty */}
                                    <td>{item[12]}</td>
                                    <td>{item[13]}</td>
                                    <td>
                                        <Row>
                                            <Col>
                                                <button
                                                    className="btn btn-outline-primary btn-margin newButton"
                                                    style={{ marginRight: 10 }}
                                                    id="submitbtn2"
                                                    disabled={item[0] === ''}
                                                    onClick={() => handleDownload(item)}
                                                >
                                                    <FontAwesomeIcon icon={faDownload} />
                                                </button>
                                                <button
                                                    className="btn btn-outline-primary btn-margin newButton"
                                                    style={{ marginRight: 10 }}
                                                    id="submitbtn2"
                                                    disabled={!item[15]}
                                                    onClick={() => handleView(item)}
                                                >
                                                    <FontAwesomeIcon icon={faEye} />
                                                </button>
                                            </Col>
                                        </Row>
                                    </td>
                                    <td>
                                        <Input
                                            className="form-control"
                                            type="checkbox"
                                            style={{ width: 20, height: 23, borderColor: 'black' }}
                                            id={`check${index}`}
                                            checked={item[18] === 'Y'}
                                            name="check"
                                            disabled={!item[19] || item[15]}
                                            onChange={(e) => handleCheckboxChange(e, index)}
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            className="form-control"
                                            type="select"
                                            id="statusSelect"
                                            name="statusSelect"
                                            value={item[14]}
                                            onChange={(e) => handleTallyChange(e, index)}
                                            disabled={!item[19] || item[15]}
                                        >
                                            <option value=""></option>
                                            <option value="S">SUCCESS</option>
                                            <option value="F">FAIL</option>
                                        </Input>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-outline-primary btn-margin newButton"
                                            style={{ marginRight: 10 }}
                                            id="submitbtn2"
                                            disabled={!item[19] || item[15]}
                                            onClick={() => updateSingleSfStatus(item[19], item[16], item[3], item[14])}
                                        >
                                            <FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>

        </div>
    )
}
