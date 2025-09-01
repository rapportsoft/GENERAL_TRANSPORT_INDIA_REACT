import React, { useEffect, useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Rate_Chart_Service from "../service/Rate_Chart_Service";
import Swal from "sweetalert2";
import serviceMaster from "../service/APService";
import { animateScroll as scroll } from "react-scroll";
import AuthContext from "../Components/AuthProvider";
import Pagination from "react-bootstrap/Pagination";
import { useNavigate } from "react-router-dom";
import "../Components/Style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxios from '../Components/useAxios';

import {
    Card,
    CardBody,
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBackward,
    faHandsHoldingCircle,
    faPlus,
    faRefresh,
    faSearch,
    faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
    faCheck,
    faSave,
    faTimes,
    faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import ipaddress from "../Components/IpAddress";
import axios from "axios";

export default function AddVendorBillingHeads() {
    const [loading, setLoading] = useState(false);
    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust the opacity and color as needed
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999, // Ensure the overlay is above other elements
        },
    };

    // const axios = useAxios();
    const [company_Id, setcompanyId] = useState("");
    const [branch_Id, setbranch_Id] = useState("");
    const [serviceId, setServiceId] = useState("");
    const [taxPercentage, setTaxPercentage] = useState("");
    const [rateCalculation, setRateCalculation] = useState("");
    const [discountAmount, setDiscountAmount] = useState("");
    const [serviceNewDescription, setServiceNewDescription] = useState("");
    const [errors, setErrors] = useState({});
    const [CreatedUser, setCreatedUser] = useState("");
    const [approvedUser, setApprovedUser] = useState("");
    const [isDefaultService, setIsDefaultService] = useState(false);
    const navigate = useNavigate();
    // useEffect(() => {
    //     if (!isAuthenticated) 
    //     {
    //       navigate('/login?message=You need to be authenticated to access this page.');
    //     }
    // }, [isAuthenticated, navigate]);

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

    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(
                "/login?message=You need to be authenticated to access this page."
            );
        }
    }, [isAuthenticated, navigate]);

    const location = useLocation();
    const [flag, setFlag] = useState(location.state?.flag);
    const [pid, setPid] = useState(location.state?.serviceId);

    const getPartyData = () => {
        const flag1 = location.state?.flag;
        const id = location.state?.serviceId;
        if (flag1 === 'edit') {
            axios.get(`${ipaddress}apservices/getServiceData?cid=${companyid}&bid=${branchId}&serviceId=${id}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            })
                .then((response) => {
                    setServices(response.data);
                    setSelectedServiceUnit(response.data.serviceUnit)
                    setSelectedServiceUnit1(response.data.serviceUnit1);
                    setSelectedSACCode(response.data.sacCode)
                    setSelectedTaxId(response.data.taxId);
                    setIsDefaultService(response.data.taxApplicable === "N" ? false : true)
                })
                .catch((error) => {

                })
        }
    }
    useEffect(() => {
        getPartyData();
    }, [])

    const [services, setServices] = useState({
        companyId: "",
        branchId: "",
        serviceId: "",
        serviceShortDesc: "",
        serviceLongDesc: "",
        serviceUnit: "",
        serviceUnit1: "",
        serviceType: "AP",
        typeOfCharges: "",
        acCode: "",
        taxApplicable: "N",
        taxId: "",
        calculatedOnService: "",
        itemType: "",
        movementCodeFrom: "",
        movementCodeTo: "",
        expenseItem: "",
        importExport: "",
        discountPercentage: "",
        discountDays: "",
        discountAmt: "",
        fixedRate: "",
        commodity: "",
        cargoWtVol: "",
        containerType: "",
        containerSize: "",
        containerStatus: "",
        sector: "",
        pol: "",
        pod: "",
        plod: "",
        grt: "",
        nrt: "",
        period: "",
        rangeType: "",
        criteriaType: "",
        financeLedgerCode: "",
        printSequence: 1,
        hazardous: "",
        placeFrom: "",
        placeTo: "",
        natureOfCargo: "",
        criteriaStatus: "",
        criteriaEditedBy: "",
        criteriaApprovedBy: "",
        sacCode: "",
        serviceNewDesc: "",
        serviceChangeDate: "",
        serviceGroup: "O",
        cfsBaseRate: 0,
        status: "",
        createdBy: "",
        createdDate: new Date(),
        editedBy: "",
        editedDate: "",
        approvedBy: "",
        approvedDate: new Date(),
        defaultChk: "N",
        hardCode: "N"
    });
    const {
        companyId,
        serviceShortDesc,
        serviceLongDesc,
        serviceUnit,
        serviceUnit1,
        serviceType,
        typeOfCharges,
        acCode,
        taxApplicable,
        taxId,
        calculatedOnService,
        itemType,
        movementCodeFrom,
        movementCodeTo,
        expenseItem,
        importExport,
        discountPercentage,
        discountDays,
        discountAmt,
        fixedRate,
        commodity,
        cargoWtVol,
        containerType,
        containerSize,
        containerStatus,
        sector,
        pol,
        pod,
        plod,
        grt,
        nrt,
        period,
        rangeType,
        criteriaType,
        financeLedgerCode,
        printSequence,
        hazardous,
        placeFrom,
        placeTo,
        natureOfCargo,
        criteriaStatus,
        criteriaEditedBy,
        criteriaApprovedBy,
        sacCode,
        serviceNewDesc,
        serviceChangeDate,
        serviceGroup,
        cfsBaseRate,
        status,
        createdBy,
        createdDate,
        editedBy,
        editedDate,
        approvedBy,
        approvedDate,
        defaultChk,
        hardCode,
    } = services;









    const queryParams = new URLSearchParams(location.search);
    const processId = queryParams.get('process_id');

    const foundRights = role !== 'ROLE_ADMIN' ? userRights.find(item => item.process_Id === processId) : null;
    const allowCreate = foundRights?.allow_Create === 'Y';
    const allowRead = foundRights?.allow_Read === 'Y';
    const allowEdit = foundRights?.allow_Update === 'Y';
    const allowDelete = foundRights?.allow_Delete === 'Y';

    const getCreatedUser = async (id3, companyid, branchId) => {
        if (id3) {
            await Rate_Chart_Service.getUserbyUserId(id3, companyid, branchId).then(
                (res) => {
                    setCreatedUser(res.data.user_Name);
                }
            );
        }
    };

    const getApprovedUser = async (id2, companyid, branchId) => {
        if (id2) {
            await Rate_Chart_Service.getUserbyUserId(id2, companyid, branchId).then(
                (res) => {
                    setApprovedUser(res.data.user_Name);
                    // alert(approvedUser);
                }
            );
        }
    };

    function scrollToSection() {
        scroll.scrollTo("target", {
            smooth: true,
            duration: 0,
            offset: -50,
        });
    }


    useEffect(() => {
        setcompanyId(companyid);
        setbranch_Id(branchId);
    }, []);

    //  take the values of approvedBy, editedBy ,Cid

    const handleValidation = () => {
        let formIsValid = true;
        const newErrors = {};

        // Validate serviceShortDesc
        if (!serviceShortDesc) {
            formIsValid = false;
            newErrors["serviceShortDesc"] = "Short description is required.";
        }

        // Validate serviceUnit
        if (!serviceUnit) {
            formIsValid = false;
            newErrors["serviceUnit"] = "Service unit is required.";
        }

        // Validate serviceType
        if (!serviceType) {
            formIsValid = false;
            newErrors["serviceType"] = "Service type is required.";
        }

        // Validate sacCode
        if (!sacCode) {
            formIsValid = false;
            newErrors["sacCode"] = "SAC code is required.";
        }

        // Validate rateCalculation
        // if (!typeOfCharges) {
        //   formIsValid = false;
        //   newErrors["typeOfCharges"] = "Please select Type of Charges";
        // }

        // Validate rateCalculation
        if (!rateCalculation) {
            formIsValid = false;
            newErrors["rateCalculation"] = "Please select Rate calculation";
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const makeFieldEmpty = () => {
        setServices({
            companyId: "",
            branchId: "",
            serviceId: "",
            serviceShortDesc: "",
            serviceLongDesc: "",
            serviceUnit: "",
            serviceUnit1: "",
            serviceType: "AP",
            typeOfCharges: "",
            acCode: "",
            taxApplicable: "N",
            taxId: "",
            calculatedOnService: "",
            itemType: "",
            movementCodeFrom: "",
            movementCodeTo: "",
            expenseItem: "",
            importExport: "",
            discountPercentage: "",
            discountDays: "",
            discountAmt: "",
            fixedRate: "",
            commodity: "",
            cargoWtVol: "",
            containerType: "",
            containerSize: "",
            containerStatus: "",
            sector: "",
            pol: "",
            pod: "",
            plod: "",
            grt: "",
            nrt: "",
            period: "",
            rangeType: "",
            criteriaType: "",
            financeLedgerCode: "",
            printSequence: 1,
            hazardous: "",
            placeFrom: "",
            placeTo: "",
            natureOfCargo: "",
            criteriaStatus: "",
            criteriaEditedBy: "",
            criteriaApprovedBy: "",
            sacCode: "",
            serviceNewDesc: "",
            serviceChangeDate: "",
            serviceGroup: "O",
            cfsBaseRate: 0,
            status: "",
            createdBy: "",
            createdDate: new Date(),
            editedBy: "",
            editedDate: "",
            approvedBy: "",
            approvedDate: new Date(),
            defaultChk: "N",
            hardCode: "N"
        })
        setSelectedServiceUnit('');
        setSelectedSACCode('');
        setSelectedTaxId('');
        setIsDefaultService(false);
        setSelectedServiceUnit1('');
        setFormErrors({
            serviceShortDesc: "",
            serviceUnit: "",
            sacCode: "",
            serviceLongDesc: "",
            taxPercentage: "",
            typeOfCharges: "",
        });
        setErrors("");
        const {
            companyId,
            serviceShortDesc,
            serviceLongDesc,
            serviceUnit,
            serviceUnit1,
            serviceType,
            typeOfCharges,
            acCode,
            taxApplicable,
            taxId,
            calculatedOnService,
            itemType,
            movementCodeFrom,
            movementCodeTo,
            expenseItem,
            importExport,
            discountPercentage,
            discountDays,
            discountAmt,
            fixedRate,
            commodity,
            cargoWtVol,
            containerType,
            containerSize,
            containerStatus,
            sector,
            pol,
            pod,
            plod,
            grt,
            nrt,
            period,
            rangeType,
            criteriaType,
            financeLedgerCode,
            printSequence,
            hazardous,
            placeFrom,
            placeTo,
            natureOfCargo,
            criteriaStatus,
            criteriaEditedBy,
            criteriaApprovedBy,
            sacCode,
            serviceNewDesc,
            serviceChangeDate,
            serviceGroup,
            cfsBaseRate,
            status,
            createdBy,
            createdDate,
            editedBy,
            editedDate,
            approvedBy,
            approvedDate,
            defaultChk,
            hardCode,
        } = services;
    };

    const updatdStatus = async () => {
        if (serviceId) {
            serviceMaster
                .updateServiceStatus(companyid, branchId, serviceId, userId, services, jwtToken)
                .then((res) => {
                    toast.success("Service Approved Successfully !", {
                        position: 'top-center',
                        autoClose: 600,
                    });
                });
        } else {
            toast.warning("First Save the Service !", {
                position: 'top-center',
                autoClose: 700,
            });
        }
    };




    const [formErrors, setFormErrors] = useState({
        serviceShortDesc: "",
        serviceLongDesc: "",
        taxPercentage: "",
        serviceUnit: "",
        serviceUnit1: "",
        sacCode: "",
        typeOfCharges: ""
    });


    const { serviceId: paramServiceId } = useParams();


    const [isViewMode, setIsViewMode] = useState(false);

    const saveorUpdateService = (e) => {
        // setFormErrors({
        //   profitcentreDesc: "",
        // });
        // document
        //   .getElementById("profitcentreDesc")
        //   .classList.remove("error-border");

        // let errors = {};
        // if (!profitData.profitcentreDesc) {
        //   errors.profitcentreDesc = "Profit Centre Desc is required";
        //   document.getElementById("profitcentreDesc").classList.add("error-border");
        // }

        // if (Object.keys(errors).length > 0) {
        //   setFormErrors(errors);
        //   toast.error("Please fill in the required fields.", {
        //     autoClose: 1000,
        //   });
        //   return;
        // }

        const isFormValid = handleValidation();

        e.preventDefault();
        const errors = {};
        // if (isDefaultService && !services.taxId) {
        //   errors.taxId = "Tax Group is required when Tax Applicable is checked";
        // }
        if (!serviceShortDesc) {
            errors.serviceShortDesc = "Service short desc is required.";
        }
        if (!serviceLongDesc) {
            errors.serviceLongDesc = "Service long desc is required.";
        }
        if (!serviceUnit) {
            errors.serviceUnit = "Service Unit is required";
        } else if (serviceUnit === serviceUnit1) {
            errors.serviceUnit1 =
                "Service Unit should be different than Service Unit 1";
        }
        if (!serviceUnit1) {
            errors.serviceUnit1 = "Service unit is required.";
        }

        if (!sacCode) {
            errors.sacCode = "Service unit is required.";
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        // if (isFormValid) 
        // {
        //   if (isDefaultService) {
        //     services.taxApplicable = isDefaultService ? "Y" : "N";
        //     services.taxId = taxId;
        //     services.taxPercentage = taxPercentage || getTaxId[taxId];
        //   } else {
        //     services.taxId = ""; // Store 0 when checkbox is unchecked
        //     services.taxPercentage = 0; // Store 0 when checkbox is unchecked
        //   }
        setLoading(true);
        console.log("profitData ", services);
        axios
            .post(
                `${ipaddress}apservices/saveService?cid=${companyid}&bid=${branchId}&flag=${flag}&user=${userId}`,
                services,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            )
            .then((response) => {
                toast.success("Data save successfully!!", {
                    autoClose: 800,
                });
                const data = response.data;
                setServices(response.data);
                setFlag("edit");

            })
            .catch((error) => {
                toast.error(error.response.data, {
                    autoClose: 1000,
                });
            }).finally(() => {
                setLoading(false);
            });
        // }
    };

    const [tax, setTaxs] = useState([]);
    const [getTaxId, setTaxIdTax] = useState({});
    const fetchTax = async () => {
        try {
            const response = await fetch(
                `${ipaddress}api/tax/getALlTaxes?compnayId=${companyid}&branchId=${branchId}`
            );
            const data = await response.json();
            const namesMap = {};
            data.forEach((tax) => {
                namesMap[tax.taxId] = tax.taxDesc;
            });
            setTaxIdTax(namesMap);
            setTaxs(data);
        } catch (error) {
            console.error("Error fetching party names:", error);
        }
    };
    useEffect(() => {
        fetchTax();
    }, []);

    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setIsDefaultService(isChecked);


        const taxPercentageField = document.getElementById("taxId");
        if (taxPercentageField) {
            if (!isChecked) {
                taxPercentageField.setAttribute("disabled", "true");
                setServices({
                    ...services,
                    taxApplicable: "N"
                })
            } else {
                taxPercentageField.removeAttribute("disabled");
                setServices({
                    ...services,
                    taxApplicable: "Y"
                })
            }
        }

        const databaseValue = isChecked ? "Y" : "N";
        setServices({
            ...services,
            taxApplicable: databaseValue
        })

        if (!isChecked) {
        }
    };

    const onChangeInputForTax = (e) => {
        const selectedTaxId = e.target.value;
        const selectedTaxPercentage = getTaxId[selectedTaxId];
        // Get tax percentage based on selected id
        if (isDefaultService) {
            setServices({
                ...services,
                taxId: selectedTaxPercentage
            })
            setTaxPercentage(selectedTaxPercentage);
        }
        else {
            setServices({
                ...services,
                taxId: " "
            })
            setTaxPercentage("");
        }

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            taxId: "",
        }));
    };

    const [selectedSACCode, setSelectedSACCode] = useState("");
    const [SACCODE, setSACCODE] = useState([]);
    const [allTax, setALlTax] = useState([]);
    const [selectedTaxId, setSelectedTaxId] = useState("");
    useEffect(() => {
        fetch(`${ipaddress}api/tax/getALlTaxes?compnayId=${companyid}&branchId=${branchId}`)
            .then((response) => response.json())
            .then((data) => setALlTax(data))
            .catch((error) => console.error("Error:", error));
    }, []);

    useEffect(() => {
        fetch(`${ipaddress}jardetail/jarIdList/J00024/${companyid}`)
            .then((response) => response.json())
            .then((data) => setSACCODE(data))
            .catch((error) => console.error("Error:", error));
    }, []);

    const [selectedServiceUnit, setSelectedServiceUnit] = useState("");
    const [selectedServiceUnit1, setSelectedServiceUnit1] = useState("");
    const [SERVICE, setSERVICE] = useState([]);
    useEffect(() => {
        fetch(`${ipaddress}jardetail/jarIdList/J00065/${companyid}`)
            .then((response) => response.json())
            .then((data) => setSERVICE(data))
            .catch((error) => console.error("Error:", error));
    }, []);

    const onChangeInputSACCODE = (e) => {
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "",
        }));
        setSelectedSACCode(e.target.value);
        setServices({
            ...services,
            sacCode: e.target.value
        })
        setErrors("");
    };


    const onChangeInputServiceUnit1 = (e) => {
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "",
        }));
        setSelectedServiceUnit1(e.target.value);
        setServices({
            ...services,
            serviceUnit1: e.target.value
        })
        setErrors("");
    };
    const onChangeInputTax = (e) => {
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "",
        }));
        if (isDefaultService) {
            setSelectedTaxId(e.target.value);
            setServices({
                ...services,
                taxId: e.target.value
            })
        }
        else {
            setServices({
                ...services,
                taxId: ""
            })
            setSelectedTaxId("");
        }
        setErrors("");
    };
    const onChangeInputServiceUnit = (e) => {
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "",
        }));
        setSelectedServiceUnit(e.target.value);
        setServices({
            ...services,
            serviceUnit: e.target.value
        })
        setErrors("");
    };

    const title = isViewMode
        ? "View Service"
        : paramServiceId
            ? "Modify Service"
            : "Service Entry";

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

            <div className="container">
                <h5
                    className="pageHead"
                    style={{
                        fontFamily: "Your-Heading-Font",
                        paddingLeft: "1%",
                        paddingRight: "-50px",
                    }}
                >
                    {" "}
                    <FontAwesomeIcon
                        icon={faHandsHoldingCircle}
                        style={{
                            marginRight: "8px",
                            color: "black", // Set the color to golden
                        }}
                    />{" "}
                    {title}
                </h5>

                <Card >




                    <CardBody>
                        {/* 1st */}
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <Label className="forlabel" for="branchId" id="target">
                                        Service Id
                                    </Label>
                                    <Input
                                        type="text"
                                        name="serviceId"
                                        id="service"
                                        readOnly
                                        style={{ backgroundColor: "#e3eefa", color: "black" }}
                                        value={services.serviceId}
                                        onChange={(e) => setServiceId(e.target.value)}
                                        className="form-control mb-3 read-only"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label className="forlabel" for="branchId" id="target">
                                        Status
                                    </Label>
                                    <Input
                                        readOnly
                                        style={{ backgroundColor: "#e3eefa", color: "black" }}
                                        type="text"
                                        name="status"
                                        id="status"
                                        value={
                                            services.status === "U" || services.status === "A" || services.status === "N" ? "Approved" : services.status
                                        }
                                        className="form-control mb-3 read-only"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={4}>

                                <FormGroup>
                                    <Label className="forlabel" for="branchId" id="target">
                                        Created By
                                    </Label>
                                    <Input
                                        readOnly
                                        style={{ backgroundColor: "#e3eefa", color: "black" }}
                                        type="text"
                                        name="createdBy"
                                        id="status"
                                        value={
                                            services.createdBy
                                        }
                                        className="form-control mb-3 read-only"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>

                            <Col md={4}>
                                <FormGroup>
                                    <Label className="forlabel" for="branchId">
                                        Service Short Desc<span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <Input
                                        readOnly={isViewMode}
                                        disabled={isViewMode}
                                        type="textarea"
                                        maxLength={75}
                                        name="serviceShortDesc"
                                        className="form-control"
                                        style={{
                                            borderColor: formErrors.serviceShortDesc ? "#f52b2b" : "", // Set border color based on formErrors
                                            backgroundColor: isViewMode ? "#e3eefa" : "inherit",
                                        }}
                                        placeholder="Service Short Desc"
                                        onChange={(e) => {
                                            setServices({
                                                ...services,
                                                serviceShortDesc: e.target.value,
                                            });
                                            // Clear formErrors.serviceShortDesc when there is input
                                            setFormErrors({
                                                ...formErrors,
                                                serviceShortDesc: "", // Set to empty string
                                            });
                                        }}
                                        value={services.serviceShortDesc}
                                    />
                                    <div style={{ color: "red" }} className="error-message">
                                        {formErrors.serviceShortDesc}
                                    </div>
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label className="forlabel" for="branchId">
                                        Service Long Desc
                                    </Label>
                                    <span style={{ color: "red" }}>*</span>
                                    <Input
                                        readOnly={isViewMode}
                                        disabled={isViewMode}
                                        type="textarea"
                                        maxLength={150}
                                        name="serviceLongDesc"
                                        className="form-control"
                                        style={{
                                            borderColor: errors.serviceLongDesc ? "#f52b2b" : "", // Set border color based on errors
                                            backgroundColor: isViewMode ? "#e3eefa" : "inherit",
                                        }}
                                        placeholder="Service Long Desc"
                                        onChange={(e) => {
                                            setServices({
                                                ...services,
                                                serviceLongDesc: e.target.value,
                                            });
                                            setFormErrors({
                                                ...formErrors,
                                                serviceLongDesc: "",
                                            });
                                        }}
                                        value={services.serviceLongDesc}
                                    />
                                    <div style={{ color: "red" }} className="error-message">
                                        {formErrors.serviceLongDesc}
                                    </div>
                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup>
                                    <Label className="forlabel" for="branchId" id="target">
                                        Approved By
                                    </Label>
                                    <Input
                                        readOnly
                                        style={{ backgroundColor: "#e3eefa", color: "black" }}
                                        type="text"
                                        name="status"
                                        id="status"
                                        value={
                                            services.approvedBy
                                        }
                                        className="form-control mb-3 read-only"
                                    />
                                </FormGroup>
                            </Col>

                        </Row>

                        <div className="row">
                            <Col>
                                <FormGroup>
                                    <Label className="forlabel" for="branchId">
                                        Service Type<span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <select
                                        readOnly={isViewMode}
                                        disabled
                                        className="form-select"
                                        name="serviceType"
                                        value={services.serviceType}
                                        onChange={(e) => setServices({
                                            ...services,
                                            serviceType: e.target.value
                                        })}
                                        style={{
                                            borderColor: errors.serviceType ? "#f52b2b" : "", backgroundColor: isViewMode ? "#e3eefa" : "inherit",
                                        }}
                                    >
                                        <option value="">Select Service Type</option>
                                        <option value="AR">Receivable</option>
                                        <option value="AP">Payables</option>
                                    </select>
                                </FormGroup>
                            </Col>



                            <Col md={4}>
                                <FormGroup>
                                    <Label className="forlabel" for="sacCode">
                                        Service Unit<span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <Input
                                        readOnly={isViewMode}
                                        disabled={isViewMode}
                                        type="select"
                                        name="serviceUnit"
                                        value={selectedServiceUnit}
                                        onChange={(e) => onChangeInputServiceUnit(e)}
                                        className="form-control inputField"
                                        style={{
                                            borderColor: "",
                                            backgroundColor: isViewMode ? "#e3eefa" : "inherit",
                                        }}
                                    >
                                        <option value="">Select</option>
                                        {SERVICE.map((sacCode, index) => (
                                            <option key={index} value={sacCode.jarDtlId}>
                                                {sacCode.jarDtlDesc}
                                            </option>
                                        ))}
                                    </Input>
                                    {/* {errors.sacCode && <div>{errors.sacCode}</div>} */}
                                    <div style={{ color: "red" }} className="error-message">
                                        {formErrors.serviceUnit}
                                    </div>
                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup>
                                    <Label className="forlabel" for="sacCode">
                                        Service Unit 1<span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <Input
                                        readOnly={isViewMode}
                                        disabled={isViewMode}
                                        type="select"
                                        name="serviceUnit1"
                                        value={selectedServiceUnit1}
                                        onChange={(e) => onChangeInputServiceUnit1(e)}
                                        className="form-control inputField"
                                        style={{
                                            borderColor: "",
                                            backgroundColor: isViewMode ? "#e3eefa" : "inherit",
                                        }}
                                    >
                                        <option value="">Select</option>
                                        {SERVICE.map((sacCode, index) => (
                                            <option key={index} value={sacCode.jarDtlId}>
                                                {sacCode.jarDtlDesc}
                                            </option>
                                        ))}
                                    </Input>
                                    {/* {errors.sacCode && <div>{errors.sacCode}</div>} */}
                                    <div style={{ color: "red" }} className="error-message">
                                        {formErrors.serviceUnit1}
                                    </div>
                                </FormGroup>
                            </Col>
                        </div>

                        {/* 3rd */}
                        <div className="row">
                            <div className="col-md-4">
                                <FormGroup>
                                    <Label className="forlabel" for="branchId">
                                        Activity Type<span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <select
                                        readOnly={isViewMode}
                                        disabled={isViewMode}
                                        className="form-select"
                                        name="containerType"
                                        value={services.containerType}
                                        //   onChange={(e) => setServiceType(e.target.value)}

                                        onChange={(e) => {
                                            setServices({
                                                ...services,
                                                containerType: e.target.value
                                            });

                                        }}
                                        style={{
                                            borderColor: errors.containerType ? "#f52b2b" : "", backgroundColor: isViewMode ? "#e3eefa" : "inherit",
                                        }}
                                    >
                                        <option value="">Select Activity Type</option>
                                        <option value="DW">Storage</option>
                                        <option value="CNTR">Unit base</option>
                                        <option value="WT">Weight base</option>
                                    </select>
                                </FormGroup>

                            </div>

                            <div className="col-md-4">

                            </div>

                            <Col md={4}>
                                <FormGroup>
                                    <Label className="forlabel" for="sacCode">
                                        SAC Code <span style={{ color: "red" }}>*</span>
                                    </Label>
                                    <Input
                                        readOnly={isViewMode}
                                        disabled={isViewMode}
                                        type="select"
                                        name="sacCode"
                                        value={selectedSACCode}
                                        onChange={(e) => onChangeInputSACCODE(e)}
                                        className="form-control inputField"
                                        style={{
                                            borderColor: "",
                                            backgroundColor: isViewMode ? "#e3eefa" : "inherit",
                                        }}
                                    >
                                        <option value="">Select</option>
                                        {SACCODE.map((sacCode, index) => (
                                            <option key={index} value={sacCode.jarDtlId}>
                                                {`${sacCode.jarDtlId} - ${sacCode.comments}`}
                                            </option>
                                        ))}
                                    </Input>
                                    {/* {errors.sacCode && <div>{errors.sacCode}</div>} */}
                                    <div style={{ color: "red" }} className="error-message">
                                        {/* {formErrors.sacCode} */}
                                        {errors.sacCode && <div>{errors.sacCode}</div>}
                                    </div>
                                </FormGroup>
                            </Col>
                        </div>
                        <div className="row">
                            <Col md={4}>
                                <FormGroup>
                                    <Label className="forlabel" for="sacCode">
                                        Tax
                                    </Label>
                                    <Input
                                        readOnly={isViewMode}
                                        disabled={isViewMode || !isDefaultService}
                                        type="select"
                                        name="taxId"
                                        value={selectedTaxId}
                                        onChange={(e) => onChangeInputTax(e)}
                                        className="form-control inputField"
                                        style={{
                                            borderColor: "",
                                            backgroundColor: !isDefaultService ? "#e3eefa" : "inherit",
                                        }}
                                    >
                                        <option value="">Select</option>
                                        {allTax.map((sacCode, index) => (
                                            <option key={index} value={sacCode.taxId}>
                                                {sacCode.taxDesc}
                                            </option>
                                        ))}
                                    </Input>
                                    {/* {errors.sacCode && <div>{errors.sacCode}</div>} */}
                                    <div style={{ color: "red" }} className="error-message">
                                        {formErrors.taxId}
                                    </div>
                                </FormGroup>
                            </Col>

                            <div className="col-md-4">
                                <FormGroup>
                                    <Label className="forlabel" for="branchId">
                                        Tax Applicable
                                    </Label>
                                    <Row>
                                        <Col md={3}>
                                            <input
                                                style={{
                                                    backgroundColor: isViewMode ? "#e3eefa" : "inherit",
                                                    width: "30px",   // Set the desired width
                                                    height: "30px",
                                                    marginLeft: "50px",  // Set the desired height
                                                }}
                                                readOnly={isViewMode}
                                                disabled={isViewMode}
                                                type="checkbox"
                                                name="taxApplicable"
                                                value={isDefaultService}
                                                checked={isDefaultService}
                                                onChange={handleCheckboxChange}
                                            />
                                        </Col>

                                    </Row>
                                </FormGroup>
                            </div>


                            <Col md={4}>
                                <FormGroup>
                                    <Label className="forlabel" for="branchId">
                                        Finance Ledger code
                                    </Label>
                                    <Input
                                        readOnly={isViewMode}
                                        disabled={isViewMode}
                                        type="text"
                                        maxLength={150}
                                        name="financeLedgerCode"
                                        className="form-control"
                                        style={{
                                            backgroundColor: isViewMode ? "#e3eefa" : "inherit",
                                        }}
                                        placeholder="Finance Ledger code"
                                        onChange={(e) => {
                                            setServices({
                                                ...services,
                                                financeLedgerCode: e.target.value,
                                            })
                                        }}
                                        value={services.financeLedgerCode}
                                    />
                                    {/* <div style={{ color: "red" }} className="error-message">
                    {formErrors.serviceLongDesc}
                  </div> */}
                                </FormGroup>
                            </Col>

                            <hr />
                            <div
                                style={{
                                    marginTop: 27,
                                    marginBottom: 10,
                                    display: "flex",
                                    justifyContent: "center", // Center buttons horizontally
                                }}
                            >
                                {!isViewMode && (
                                    <>
                                        <Button
                                            color="success"
                                            outline
                                            style={{ marginRight: "5px" }}
                                            onClick={(e) => saveorUpdateService(e)}
                                        >
                                            <FontAwesomeIcon
                                                icon={faSave}
                                                style={{ marginRight: "5px" }}
                                            />
                                            {paramServiceId ? "Save" : "Save"}
                                        </Button>


                                        {!(paramServiceId) && (
                                            <Button
                                                color="danger"
                                                outline
                                                disabled={flag === 'edit'}
                                                onClick={(e) => makeFieldEmpty()}
                                                style={{ marginRight: "5px" }}
                                            >
                                                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                                                Reset
                                            </Button>
                                        )}
                                    </>
                                )}

                                <Link to="/vendor/billingHeads">
                                    <Button color="primary" outline  >
                                        <FontAwesomeIcon
                                            icon={faBackward}
                                            style={{ marginRight: "5px" }}
                                        />
                                        Back
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardBody>


                </Card>
            </div>
        </>
    );
}
