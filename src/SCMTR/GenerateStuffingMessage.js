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

export default function GenerateStuffingMessage({ activeTab }) {
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
    const [mpcinData, setMpcinData] = useState([{
        sbNo: "",
        sbTrasnId: "",
        mpcinNo: "",
        check: 'N'
    }]);
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

        if (activeTab === 'P01901') {
            getTypeOfPack();
        }
    }, [activeTab])

    const handleClear = () => {
        setStartDate(null);
        setEndDate(null);
        setMpcinData([{
            sbNo: "",
            sbTrasnId: "",
            mpcinNo: "",
            check: 'N'
        }]);
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

        axios.get(`${ipaddress}scmtr/getStuffingBulkSearchData`, {
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
                    const data = response.data.mpcinData;
                    const tallyData = response.data.tallyData;

                    console.log('tallyData ', tallyData);

                    if (tallyData.length > 0) {
                        setTallyData(tallyData);
                        updateTallyData(tallyData);
                    }
                    else {
                        setTallyData([]);
                    }

                    if (data.length > 0) {
                        setMpcinData(data.map(item => ({
                            sbNo: item[0],
                            sbTrasnId: item[1],
                            mpcinNo: "",
                            check: 'N'
                        })));
                    }
                    else {
                        setMpcinData([{
                            sbNo: "",
                            sbTrasnId: "",
                            mpcinNo: "",
                            check: 'N'
                        }]);
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


    const handleMpcinChange = (index, value) => {
        const updatedData = [...mpcinData];
        updatedData[index].mpcinNo = value;
        setMpcinData(updatedData);
    }


    const handleMpcinCheckChange = (index, checked) => {
        const updatedData = [...mpcinData];
        updatedData[index].check = checked ? 'Y' : 'N';
        setMpcinData(updatedData);
    }

    const handleCheckAll = (checked) => {
        setCheckAll(checked ? 'Y' : 'N');

        setMpcinData((prevData) =>
            prevData.map((item) => ({
                ...item,
                check: checked ? 'Y' : 'N',
            }))
        );
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

    const handleSaveSingleMpcin = (item) => {

        if (item.mpcinNo === '') {
            toast.error("Mpcin no is required for sb no " + item.sbNo, {
                autoClose: 800
            })

            return;
        }

        const startDateFormatted = startDate ? format(startDate, 'dd/MM/yyyy HH:mm') : null;
        const endDateFormatted = endDate ? format(endDate, 'dd/MM/yyyy HH:mm') : null;
        setLoading(true);

        axios.post(`${ipaddress}scmtr/saveSingleMpcinNo`, item, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            },
            params: {
                startDate: startDateFormatted,
                endDate: endDateFormatted,
                bid: branchId,
                cid: companyid,
                user: userId
            },
        })
            .then((response) => {


                toast.success("Data save successfully!!", {
                    autoClose: 800
                })

                setLoading(false);

                const data = response.data.mpcinData;
                const tallyData = response.data.tallyData;

                if (tallyData.length > 0) {
                    setTallyData(tallyData);
                    updateTallyData(tallyData);
                }
                else {
                    setTallyData([]);
                }

                if (data.length > 0) {
                    setMpcinData(data.map(item => ({
                        sbNo: item[0],
                        sbTrasnId: item[1],
                        mpcinNo: "",
                        check: 'N'
                    })));
                }
                else {
                    setMpcinData([{
                        sbNo: "",
                        sbTrasnId: "",
                        mpcinNo: "",
                        check: 'N'
                    }]);
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
    }


    const handleSaveMpcin = () => {
        const checkedData = mpcinData.filter(item => (item.sbNo !== '' && item.check === 'Y'));

        if (checkedData.length === 0) {
            toast.error("Please select the sb no", {
                autoClose: 800
            });
            return;
        }

        for (let i = 0; i < checkedData.length; i++) {
            const item = checkedData[i];
            if (item.mpcinNo === '') {
                toast.error("Mpcin no is required for sb no " + item.sbNo, {
                    autoClose: 800
                });
                return; // Exit the function if validation fails
            }
        }

        const startDateFormatted = startDate ? format(startDate, 'dd/MM/yyyy HH:mm') : null;
        const endDateFormatted = endDate ? format(endDate, 'dd/MM/yyyy HH:mm') : null;
        setLoading(true);

        axios.post(`${ipaddress}scmtr/saveMpcinNo`, checkedData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            },
            params: {
                startDate: startDateFormatted,
                endDate: endDateFormatted,
                bid: branchId,
                cid: companyid,
                user: userId
            },
        })
            .then((response) => {


                toast.success("Data save successfully!!", {
                    autoClose: 800
                });

                setLoading(false);

                const data = response.data.mpcinData;
                const tallyData = response.data.tallyData;

                if (tallyData.length > 0) {
                    setTallyData(tallyData);
                    updateTallyData(tallyData);
                }
                else {
                    setTallyData([]);
                }

                if (data.length > 0) {
                    setMpcinData(data.map(item => ({
                        sbNo: item[0],
                        sbTrasnId: item[1],
                        mpcinNo: "",
                        check: 'N'
                    })));
                }
                else {
                    setMpcinData([{
                        sbNo: "",
                        sbTrasnId: "",
                        mpcinNo: "",
                        check: 'N'
                    }]);
                }

                setCheckAll1('N');
                setCheckAll('N');
            })
            .catch((error) => {
                setLoading(false);

                toast.error(error.response.data, {
                    autoClose: 800
                });
            });
    }

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
            const response = await axios.post(`${ipaddress}scmtr/downloadJson`, sbDataArray, {
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
            const response = await axios.post(`${ipaddress}scmtr/downloadJson`, sbDataArray, {
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

            axios.post(`${ipaddress}scmtr/updateSfStatus`, null, {
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

                    const data = response.data.mpcinData;
                    const tallyData = response.data.tallyData;

                    if (tallyData.length > 0) {
                        setTallyData(tallyData);
                        updateTallyData(tallyData);
                    }
                    else {
                        setTallyData([]);
                    }

                    if (data.length > 0) {
                        setMpcinData(data.map(item => ({
                            sbNo: item[0],
                            sbTrasnId: item[1],
                            mpcinNo: "",
                            check: 'N'
                        })));
                    }
                    else {
                        setMpcinData([{
                            sbNo: "",
                            sbTrasnId: "",
                            mpcinNo: "",
                            check: 'N'
                        }]);
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

            axios.post(`${ipaddress}scmtr/updateMultipleSfStatus`, checkedDataArray, {
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

                    const data = response.data.mpcinData;
                    const tallyData = response.data.tallyData;

                    if (tallyData.length > 0) {
                        setTallyData(tallyData);
                        updateTallyData(tallyData);
                    }
                    else {
                        setTallyData([]);
                    }

                    if (data.length > 0) {
                        setMpcinData(data.map(item => ({
                            sbNo: item[0],
                            sbTrasnId: item[1],
                            mpcinNo: "",
                            check: 'N'
                        })));
                    }
                    else {
                        setMpcinData([{
                            sbNo: "",
                            sbTrasnId: "",
                            mpcinNo: "",
                            check: 'N'
                        }]);
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

    const updateTallyData = (tallyData) => {
        const updatedTallyData = tallyData.map((row) => {
            // Find all rows with the same `sbNo`
            const sameSbItems = tallyData.filter((i) => i[0] === row[0]);
            const currentIndex = sameSbItems.findIndex((i) => JSON.stringify(i) === JSON.stringify(row));

            let cumulativeQty = 0;
            for (let i = 0; i < currentIndex; i++) {
                cumulativeQty += parseInt(sameSbItems[i][10]) || 0;
            }

            const totalQty = parseInt(row[9]) || 0;
            const conQty = parseInt(row[10]) || 0;

            // If row[19] is false, calculate new values; otherwise, keep the old values
            const fromPkg = !row[19] ? cumulativeQty + 1 : row[12];
            const toPkg = !row[19]
                ? (currentIndex === sameSbItems.length - 1 ? totalQty : cumulativeQty + conQty)
                : row[13];


            console.log('fromPkg ', fromPkg, ' ', toPkg);

            return {
                ...row,
                12: fromPkg, // fromPkg
                13: toPkg,   // toPkg
            };
        });

        setTallyData(updatedTallyData);
    };


    const [isModalOpenFOrSplitCargo, setIsModalOpenForSplitCargo] = useState(false);
    const [isSaveData, setIsSaveData] = useState(false);
    const [splitSbData, setSplitSbData] = useState(null);

    const [splitData, setSplitData] = useState([{
        stuffTallyId: '',
        sbTransId: '',
        sbNo: '',
        containerNo: '',
        fromPkg: '',
        toPkg: '',
        qty: ''
    }])

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

    const handleSplitDataChange = (index, field, value) => {
        setSplitData(prevData =>
            prevData.map((item, i) => {
                if (i !== index) return item;

                let updatedItem = { ...item, [field]: handleInputChange(value, 10000, 0) }; // Adjust max as needed

                if (field === "fromPkg") {
                    // Ensure `fromPkg` is not greater than `toPkg`
                    if (updatedItem.toPkg && updatedItem.fromPkg > updatedItem.toPkg) {
                        updatedItem.toPkg = updatedItem.fromPkg; // Adjust toPkg to match
                    }
                }

                if (field === "toPkg") {
                    // Ensure `toPkg` is not smaller than `fromPkg`
                    if (updatedItem.toPkg < updatedItem.fromPkg) {
                        updatedItem.fromPkg = updatedItem.toPkg; // Adjust fromPkg to match
                    }
                }

                // Calculate qty
                updatedItem.qty = updatedItem.toPkg - updatedItem.fromPkg + 1;

                return updatedItem;
            })
        );
    };

    // 🔹 Add New Row
    const addRow = () => {
        setSplitData(prevData => [...prevData, {
            fromPkg: "",
            toPkg: "",
            qty: "",
            stuffTallyId: splitSbData?.[16] || '',
            sbTransId: splitSbData?.[1] || '',
            sbNo: splitSbData?.[0] || '',
            containerNo: splitSbData?.[3] || '',
        }]);
    };

    // 🔹 Delete Row
    const deleteRow = (index) => {
        setSplitData(prevData => prevData.filter((_, i) => i !== index));
    };

    const openSplitCargoModal = (data) => {
        setIsModalOpenForSplitCargo(true);
        setSplitSbData(data);
        getSplitPkgData(data);
    }

    const closeSplitCargoModal = () => {
        setIsModalOpenForSplitCargo(false);
        setSplitSbData(null);
        setSplitData([{
            stuffTallyId: '',
            sbTransId: '',
            sbNo: '',
            containerNo: '',
            fromPkg: '',
            toPkg: '',
            qty: ''
        }])
        setIsSaveData(false);
    }

    const getSplitPkgData = (sbData) => {

        axios.get(`${ipaddress}scmtr/getSplitPkg`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            },
            params: {
                cid: companyid,
                bid: branchId,
                tallyId: sbData?.[16],
                sbNo: sbData?.[0],
                sbTransId: sbData?.[1],
                containerNo: sbData?.[3]
            }
        })
            .then((response) => {

                const data = response.data;

                if (data.length > 0) {
                    setIsSaveData(true);
                    setSplitData(data.map((item) => ({
                        stuffTallyId: item[0] || '',
                        sbTransId: item[1] || '',
                        sbNo: item[2] || '',
                        containerNo: item[3] || '',
                        fromPkg: item[4] || '',
                        toPkg: item[5] || '',
                        qty: item[6] || ''
                    })))

                }
                else {
                    setIsSaveData(false);

                    setSplitData([{
                        stuffTallyId: sbData?.[16] || '',
                        sbTransId: sbData?.[1] || '',
                        sbNo: sbData?.[0] || '',
                        containerNo: sbData?.[3] || '',
                        fromPkg: '',
                        toPkg: '',
                        qty: ''
                    }])
                }
            })
            .catch((error) => {
                setSplitData([{
                    stuffTallyId: sbData?.[16] || '',
                    sbTransId: sbData?.[1] || '',
                    sbNo: sbData?.[0] || '',
                    containerNo: sbData?.[3] || '',
                    fromPkg: '',
                    toPkg: '',
                    qty: ''
                }])
            })
    }


    const saveSplitPkg = () => {
        try {

            if (splitData.length === 0) {
                toast.error("Please enter container split details", {
                    autoClose: 800
                })
                return;
            }

            for (let i = 0; i < splitData.length; i++) {
                const item = splitData[i];
                if (!item.fromPkg || item.fromPkg <= 0) {
                    toast.error("From pkg is required for sr no " + (i + 1), {
                        autoClose: 800
                    });
                    return; // Exit the function if validation fails
                }
                if (!item.toPkg || item.toPkg <= 0) {
                    toast.error("To pkg is required for sr no " + (i + 1), {
                        autoClose: 800
                    });
                    return; // Exit the function if validation fails
                }
            }


            setLoading(true);

            axios.post(`${ipaddress}scmtr/saveSplitPkg`, splitData, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                params: {
                    cid: companyid,
                    bid: branchId,
                    user: userId
                }
            })
                .then((response) => {

                    const data = response.data;
                    setLoading(false);
                    if (data.length > 0) {
                        setIsSaveData(true);
                        setSplitData(data.map((item) => ({
                            stuffTallyId: item[0] || '',
                            sbTransId: item[1] || '',
                            sbNo: item[2] || '',
                            containerNo: item[3] || '',
                            fromPkg: item[4] || '',
                            toPkg: item[5] || '',
                            qty: item[6] || ''
                        })))

                    }
                })
                .catch((error) => {
                    toast.error(error.response.data, {
                        autoClose: 800
                    })
                    setLoading(false);
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


            <Modal Modal isOpen={isModalOpenFOrSplitCargo} onClose={closeSplitCargoModal} toggle={closeSplitCargoModal} style={{ maxWidth: '800px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

                <ModalHeader toggle={closeSplitCargoModal} style={{
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
                        icon={faPlus}
                        style={{
                            marginRight: '8px',
                            color: 'white', // Set the color to golden
                        }}
                    />Container Split Details</h5>



                </ModalHeader>


                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                    <Row>
                        <Col md={4}>
                            <Label>SB No</Label>
                            <FormGroup>
                                <Input
                                    className="form-control"
                                    type="text"
                                    name='SB'
                                    id='SB'
                                    disabled
                                    value={splitSbData?.[0]}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <Label>Container No</Label>
                            <FormGroup>
                                <Input
                                    className="form-control"
                                    type="text"
                                    name='CON'
                                    id='CON'
                                    disabled
                                    value={splitSbData?.[3]}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <Label>Container Qty</Label>
                            <FormGroup>
                                <Input
                                    className="form-control"
                                    type="text"
                                    name='QTY'
                                    id='QTY'
                                    disabled
                                    value={splitSbData?.[10]}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='text-center'>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={saveSplitPkg}
                                disabled={isSaveData}
                            >
                                <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                Save
                            </button>
                            <button
                                className="btn btn-outline-success btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={addRow}
                            >
                                <FontAwesomeIcon icon={faAdd} style={{ marginRight: "5px" }} />
                                Add Details
                            </button>
                        </Col>
                    </Row>

                    <div className="mt-3 table-responsive" style={{ fontSize: 14, marginTop: 20, color: 'red' }}>
                        <table className="table table-bordered table-hover tableHeader dynamic-table">
                            <thead className="tableHeader">
                                <tr className="table-header">
                                    <th scope="col" className="text-center">Sr No</th>
                                    <th scope="col" className="text-center">From Pkg</th>
                                    <th scope="col" className="text-center">To Pkg</th>
                                    <th scope="col" className="text-center">Qty</th>
                                    <th scope="col" className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {splitData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                name='fromPkg'
                                                id={`fromPkg${index}`}
                                                value={item.fromPkg}
                                                onChange={(e) => handleSplitDataChange(index, "fromPkg", e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                name='toPkg'
                                                id={`toPkg${index}`}
                                                value={item.toPkg}
                                                onChange={(e) => handleSplitDataChange(index, "toPkg", e.target.value)}

                                            />
                                        </td>
                                        <td>
                                            <Input
                                                className="form-control"
                                                type="text"
                                                name='qty'
                                                id={`qty${index}`}
                                                disabled
                                                value={item.qty}
                                            />
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-outline-danger btn-margin newButton"
                                                id="submitbtn2"
                                                onClick={() => deleteRow(index)}
                                                disabled={isSaveData}
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
            {(mpcinData.filter(item => item.sbNo !== '')).length > 0 && (<div className="mt-3 table-responsive" style={{ fontSize: 14, marginTop: 20, color: 'red' }}>
                <table className="table table-bordered table-hover tableHeader dynamic-table">
                    <thead className="tableHeader">

                        <tr className="table-header">
                            <th scope="col" className="text-center">Sr No</th>
                            <th scope="col" className="text-center">SB No</th>
                            <th scope="col" className="text-center" style={{ width: 300 }}>MPCIN No</th>
                            <th className="text-center" style={{ width: 50 }}>
                                <Input
                                    className="form-control"
                                    type="checkbox"
                                    style={{ width: 20, height: 23, marginLeft: 4, borderColor: 'black' }}
                                    id="checkAll"
                                    name='checkAll'
                                    checked={checkAll === 'Y'}
                                    onChange={(e) => handleCheckAll(e.target.checked)}
                                />
                            </th>
                            <th scope="col" className="text-center">
                                <button
                                    className="btn btn-outline-primary btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    onClick={handleSaveMpcin}
                                >
                                    <FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />
                                    Update All
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {mpcinData.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.sbNo}</td>
                                <td>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        id={`mpcinNo${index}`}
                                        name='mpcinNo'
                                        value={item.mpcinNo}
                                        disabled={item.sbNo === ''}
                                        onChange={(e) => handleMpcinChange(index, e.target.value)}
                                        maxLength={30}
                                    />
                                </td>
                                <td>
                                    <Input
                                        className="form-control"
                                        type="checkbox"
                                        style={{ width: 20, height: 23, borderColor: 'black' }}
                                        id={`check${index}`}
                                        name='check'
                                        checked={item.check === 'Y'}
                                        onChange={(e) => handleMpcinCheckChange(index, e.target.checked)}
                                    />
                                </td>
                                <td>
                                    <button
                                        className="btn btn-outline-primary btn-margin newButton"
                                        style={{ marginRight: 10 }}
                                        id="submitbtn2"
                                        disabled={item.sbNo === ''}
                                        onClick={() => handleSaveSingleMpcin(item)}
                                    >
                                        <FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>)}


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
                            <th scope="col" className="text-center" style={{ minWidth: 150 }}>Split Cargo</th>
                            <th scope="col" className="text-center">Download / View JSON</th>
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
                            // Extract necessary values
                            // const sameSbItems = tallyData.filter((i) => i[0] === item[0]);
                            // const currentIndex = sameSbItems.findIndex((i) => i === item);


                            // let cumulativeQty = 0;
                            // for (let i = 0; i < currentIndex; i++) {
                            //     cumulativeQty += parseInt(sameSbItems[i][10]) || 0;
                            // }



                            // const totalQty = parseInt(item[9]) || 0;
                            // const conQty = parseInt(item[10]) || 0;

                            // // Calculate fromPkg and toPkg
                            // const fromPkg = cumulativeQty + 1;
                            // const toPkg = currentIndex === sameSbItems.length - 1
                            //     ? totalQty
                            //     : cumulativeQty + conQty;

                            // item[12] = fromPkg;
                            // item[13] = toPkg


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
                                            disabled={tallyData[index]?.[19]}
                                        >
                                            <option value="">Select Type Of Package</option>
                                            {packages.map((item, index) => (
                                                <option key={index} value={item[0]}>{item[1]}</option>
                                            ))}
                                        </Input>
                                    </td>  {/* conQty */}
                                    <td>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="fromPkg"
                                            name="fromPkg"
                                            value={tallyData[index]?.[12] || ""} // Ensure no undefined error
                                            onChange={(e) => handleTallyChange1(e, index, 12)}
                                            disabled={tallyData[index]?.[19]}
                                        />

                                    </td>    {/* fromPkg */}
                                    <td>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            id="toPkg"
                                            name="toPkg"
                                            value={tallyData[index]?.[13] || ""} // Ensure no undefined error
                                            onChange={(e) => handleTallyChange1(e, index, 13)}
                                            disabled={tallyData[index]?.[19]}
                                        />
                                    </td>      {/* toPkg */}
                                    <td>
                                        <button
                                            className="btn btn-outline-primary btn-margin newButton"
                                            style={{ marginRight: 10 }}
                                            id="submitbtn2"
                                            disabled={item[19]}
                                            onClick={() => openSplitCargoModal(item)}
                                        >
                                            <FontAwesomeIcon icon={faAdd} style={{ marginRight: "5px" }} />
                                            Split Cargo
                                        </button>
                                    </td>
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
