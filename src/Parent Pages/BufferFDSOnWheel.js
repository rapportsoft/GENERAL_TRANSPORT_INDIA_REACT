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
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faPrint, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faShip, faBackward, faCalendarAlt, faAdd, faPlaneDeparture, faCalculator, faTired, faWheatAwnCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import useAxios from '../Components/useAxios';
import cfsService from "../service/CFSService";
import movementService from "../service/MovementService";
import { toast } from 'react-toastify';
import moment from 'moment';
import { SignalWifiStatusbarNullTwoTone } from '@mui/icons-material';
import ipaddress from '../Components/IpAddress';

function BufferFDSOnWheel({ searchData, resetFlag, updatePagesList }) {

  const navigate = useNavigate();
  const axios = useAxios();
  const { isAuthenticated } = useContext(AuthContext);

  // If the user is not authenticated, redirect to the login page
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

  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxios();
  const CFSService = new cfsService(axiosInstance);
  const MovementService = new movementService(axiosInstance);

  const [profitcentre, setProfitcentre] = useState({
    profitcentreId: '',
    profitcentreDesc: ''
  });

  const queryParams = new URLSearchParams(location.search);
  const processId = 'P00234';

  const foundRights = role !== 'ROLE_ADMIN' ? userRights.find(item => item.process_Id === processId) : null;
  const allowCreate = foundRights?.allow_Create === 'Y';
  const allowRead = foundRights?.allow_Read === 'Y';
  const allowEdit = foundRights?.allow_Update === 'Y';
  const allowDelete = foundRights?.allow_Delete === 'Y';




  useEffect(() => {
    if (searchData && searchData.activeTab === processId && searchData.profitCenterId && searchData.containerGateInId && searchData.containerNo) {
      getSelectedGateInSearch(searchData.containerGateInId, searchData.containerNo, searchData.profitCenterId);
    }
  }, [searchData]);
  useEffect(() => {

    if (resetFlag) {
      handleReset();
    }
  }, [resetFlag]);






  const initialGateIn = {
    companyId: companyid,
    branchId: branchId,
    gateInId: '',
    inGateInDate: new Date(),
    gateNo: 'Gate01',
    finYear: '',
    erpDocRefNo: '',
    docRefNo: '',
    lineNo: '',
    srNo: 1,
    inBondingId: '',
    docRefDate: null,
    boeNo: '',
    boeDate: null,
    invoiceNo: '',
    invoiceDate: null,
    nocNo: '',
    nocDate: new Date(0),
    gateInType: '',
    profitcentreId: profitcentre.profitcentreId,
    processId: processId,
    cartingTransId: '',
    cartedPackages: 0,
    viaNo: '',
    containerNo: '',
    containerSize: '',
    containerType: '',
    containerStatus: 'FCL',
    containerSealNo: '',
    customsSealNo: '',
    actualSealNo: '',
    sealMismatch: 'N',
    vehicleType: '',
    isoCode: '',
    grossWeight: 0.0000,
    eirGrossWeight: 0.000,
    tareWeight: 0,
    cargoWeight: 0,
    weighmentWeight: 0.000,
    weighmentPassNo: '',
    weighmentWtUser: '',
    weighmentWtDate: new Date(0),
    weighmentDone: 'N',
    overDimension: '',
    hazardous: 'N',
    hazClass: '',
    sa: '',
    sl: '',
    onAccountOf: '',
    cha: '',
    chaCode: '',
    importerName: '',
    commodityDescription: '',
    actualNoOfPackages: 0,
    fob: null,
    qtyTakenIn: 0,
    transferPackages: 0,
    nilPackages: 0,
    deliveryOrderNo: '',
    deliveryOrderDate: null,
    doValidityDate: null,
    shift: 'Day',
    portExitNo: '',
    portExitDate: null,
    terminal: '',
    origin: '',
    refer: '',
    temperature: '',
    containerHealth: '',
    yardLocation: '',
    yardBlock: '',
    yardCell: null,
    yardLocation1: '',
    yardBlock1: '',
    yardCell1: null,
    transporterStatus: 'P',
    transporterName: '',
    transporter: '',
    vehicleNo: '',
    driverName: '',
    damageDetails: '',
    comments: '',
    specialRemarks: '',
    bookingNo: '',
    scanningDoneStatus: '',
    scanningEditedBy: '',
    scanningDoneDate: new Date(0),
    weighmentFlag: 'N',
    damageReportFlag: 'N',
    eqId: '',
    eqDate: new Date(0),
    eqIdIn: '',
    eqDateIn: new Date(0),
    eqIdOut: '',
    eqDateOut: new Date(0),
    status: '',
    createdBy: '',
    createdDate: new Date(0),
    editedBy: '',
    editedDate: new Date(0),
    approvedBy: '',
    approvedDate: new Date(0),
    onAccountOfName: '',
    chaName: '',
    gateInPackages: 0,
    fob: '',
    remarks: '',
    shippingAgentName: '',
    shippingLineName: '',
    onAccountOfName: '',
    commodity: '',
    unNo: ''
  };


  const [exportGateIn, setExportGateIn] = useState(initialGateIn);

  const [validationErrors, setValidationErrors] = useState([]);
  const [gateNos, setGateNos] = useState([]);
  const [selectedGateNo, setSelectedGateNo] = useState({ value: 'Gate01', label: 'Gate 01' });
  const [checkDigit, setCheckDigit] = useState('N');

  const [isoCodes, setIsoCodes] = useState([]);
  const [selectedIsoCode, setSelectedIsoCode] = useState(SignalWifiStatusbarNullTwoTone);

  const [commodityData, setCommodityData] = useState([]);



  const [isModalOpenForGateInSearch, setIsModalOpenForGateInSearch] = useState(false);

  const [searchGateInvalues, setSearchGateInvalues] = useState('');
  const [gateInSearchData, setGateInSearchData] = useState([]);






  const getSelectedGateInSearch = async (gateInId, containerNo, profitCenter) => {
    setValidationErrors([]);
    setLoading(true);
    try {
      const response = await MovementService.getSelectedGateInEntry(companyid, branchId, gateInId, profitCenter, processId, jwtToken);

      updateSelectTags(response.data);
      setExportGateIn(response.data);
    } catch (error) {
      console.error("Error fetching SB entries:", error);
      // Optionally handle the error further, e.g., show a notification to the user
    } finally {
      setLoading(false);
    }
  };



  const selectGateInSearchRadio = async (gateInId, containerNo, profitCenter) => {
    await getSelectedGateInSearch(gateInId, containerNo, profitCenter);
    handleCloseGateInSearch();
  }

  const handleCloseGateInSearch = (val) => {
    setIsModalOpenForGateInSearch(false);
    setSearchGateInvalues('');
    setGateInSearchData([]);
  }


  const clearGateInSearchSearch = (val) => {
    setSearchGateInvalues('');
    searchGateInSearch();
  }

  const handleOpenGateInSearch = async () => {
    setIsModalOpenForGateInSearch(true);
    setSearchGateInvalues('');
    searchGateInSearch();
  };


  const formatDate = (value) => {
    if (!value) {
      return "";
    }

    const date = new Date(value);

    // Extract date components
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    // Extract time components
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Determine AM/PM and adjust hours
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours || 12; // Adjust 0 hours to 12

    // Format time
    const formattedHours = String(hours).padStart(2, "0");

    return `${day}/${month}/${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
  };


  const [currentPageGateInSearch, setCurrentPageGateInSearch] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItemGateInSearch = currentPageGateInSearch * itemsPerPage;
  const indexOfFirstItemGateInSearch = indexOfLastItemGateInSearch - itemsPerPage;
  const currentItemsGateInSearch = gateInSearchData.slice(indexOfFirstItemGateInSearch, indexOfLastItemGateInSearch);
  const totalPagesGateInSearch = Math.ceil(gateInSearchData.length / itemsPerPage);

  // Function to handle page change
  const handlePageChangeGateIn = (page) => {
    if (page >= 1 && page <= totalPagesGateInSearch) {
      setCurrentPageGateInSearch(page);
    }
  };


  const displayPagesGateIn = () => {
    const centerPageCount = 5;
    const middlePage = Math.floor(centerPageCount / 2);
    let startPage = currentPageGateInSearch - middlePage;
    let endPage = currentPageGateInSearch + middlePage;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPagesGateInSearch, centerPageCount);
    }

    if (endPage > totalPagesGateInSearch) {
      endPage = totalPagesGateInSearch;
      startPage = Math.max(1, totalPagesGateInSearch - centerPageCount + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };


  const searchGateInSearch = async (searchvalue) => {
    setCurrentPageGateInSearch(1);
    setLoading(true);
    try {
      const response = await MovementService.getGateInEntriesToSelect(companyid, branchId, searchvalue, processId, jwtToken);
      setGateInSearchData(response.data);
    } catch (error) {
      console.error("Error fetching GateIn entries:", error);
    } finally {
      setLoading(false);
    }
  };








  useEffect(() => {
    const fetchData = async () => {
      await getGateNos('J00015');
      await getIsoContainerList();
      await getContainerHealth('J00001');
      await getProgitCenterById('N00004');
      await getCommodity('J00006');
    };
    fetchData();
  }, []);


  const getProgitCenterById = async (profitCenterId) => {
    try {
      const response = await CFSService.getProgitCenterById(companyid, branchId, profitCenterId, jwtToken);
      setProfitcentre(response.data || {});
      setExportGateIn(prevState => ({
        ...prevState,
        profitcentreId: response.data?.profitcentreId || null
      }));

    } catch (error) {
      console.error('Error fetching profit center data:', error);
      setProfitcentre({});
      setExportGateIn(prevState => ({
        ...prevState,
        profitcentreId: null
      }));
    }
  };




  const getIsoContainerList = async () => {
    try {
      const response = await MovementService.searchByIsoCodeList(companyid, jwtToken);
      setIsoCodes(response.data || []);
    } catch (error) {
      console.error('Error fetching port data:', error);
      setIsoCodes([]);
    }
  };


  const getContainerHealth = async (jarId) => {
    const cargoType = await getjarByJarId(jarId);

    if (cargoType && Array.isArray(cargoType) && cargoType.length > 0) {
      setContainerHealthData(cargoType);
    } else {
      setContainerHealthData([]);
    }

  };

  const getCommodity = async (jarId) => {
    const cargoType = await getjarByJarId(jarId);
    if (cargoType && Array.isArray(cargoType) && cargoType.length > 0) {
      setCommodityData(cargoType);
    } else {
      setCommodityData([]);
    }
  };


  const getGateNos = async (jarId) => {
    const containerNos = await getjarByJarId(jarId);
    setGateNos(containerNos);
  };
  // console.log('gateNos  ', gateNos);


  const getjarByJarId = async (jarId) => {
    try {
      const response = await CFSService.getJarDetailSelect(companyid, jarId, jwtToken);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching port data:', error);
      return [];
    }
  };




  const handleGateNoChange = selectedOption => {
    setSelectedGateNo(selectedOption);

    // Update the gateNo property in the exportGateIn object
    setExportGateIn(prevExportGateIn => ({
      ...prevExportGateIn,
      gateNo: selectedOption ? selectedOption.value : ''
    }));

    // Clear the validation error for gateNo in validationErrors
    setValidationErrors(prevErrors => {
      const updatedErrors = { ...prevErrors };
      if (updatedErrors.gateNo) {
        delete updatedErrors.gateNo;
      }
      return updatedErrors;
    });
  };

  const handleIsoNoChange = selectedOption => {
    setSelectedIsoCode(selectedOption);

    // Update the gateNo property in the exportGateIn object
    setExportGateIn(prevExportGateIn => ({
      ...prevExportGateIn,
      isoCode: selectedOption ? selectedOption.value : '',
      containerSize: selectedOption ? selectedOption.containerSize : '',
      containerType: selectedOption ? selectedOption.containerType : '',
      tareWeight: selectedOption ? selectedOption.tareWeight : ''
    }));

    // Clear the validation error for gateNo in validationErrors
    setValidationErrors(prevErrors => {
      const updatedErrors = { ...prevErrors };
      if (updatedErrors.isoCode) {
        delete updatedErrors.isoCode;
        delete updatedErrors.tareWeight;
      }
      return updatedErrors;
    });
  };




  const handleContainerNoValidation = (containerNo, checkDigit) => {


    if (checkDigit === 'N') {
      const containerNoUpper = containerNo.toUpperCase();

      let s = 0;
      let x = 0;

      // Char values mapping
      const charVal = {
        A: "10", B: "12", C: "13", D: "14", E: "15", F: "16", G: "17",
        H: "18", I: "19", J: "20", K: "21", L: "23", M: "24", N: "25",
        O: "26", P: "27", Q: "28", R: "29", S: "30", T: "31", U: "32",
        V: "34", W: "35", X: "36", Y: "37", Z: "38"
      };

      const len = containerNoUpper.length;

      // Validate length
      if (len !== 11) {
        setValidationErrors(prevErrors => ({
          ...prevErrors,
          containerNo: 'Must be 11 character.'
        }));
        return 'Must be 11 characters.';;
      } else {
        for (let i = 0; i < len - 1; i++) {
          const asciiVal = containerNoUpper.charCodeAt(i);
          if (asciiVal >= 65 && asciiVal <= 90) { // A-Z
            s += Math.pow(2, i) * parseInt(charVal[containerNoUpper.charAt(i)]);
          } else {
            s += Math.pow(2, i) * parseInt(containerNoUpper.charAt(i));
          }
        }

        x = s % 11;

        // Check the computed value against the last character
        if (
          x === parseInt(containerNoUpper.charAt(len - 1)) ||
          (x === 10 && containerNoUpper.charAt(len - 1) === "0")
        ) {
          // Valid container number, clear any previous error
          setValidationErrors(prevErrors => {
            const updatedErrors = { ...prevErrors };
            delete updatedErrors.containerNo;
            return updatedErrors;
          });
          return '';
        } else {
          // Invalid container number, set error
          setValidationErrors(prevErrors => ({
            ...prevErrors,
            containerNo: 'Invalid container format.'
          }));
          return 'Invalid container format.';
        }
      }
    }
    else {
      setValidationErrors(prevErrors => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors.containerNo;
        return updatedErrors;
      });
      return '';
    }
  };


  //   const handleFieldChange = (e, fieldName, type, maxIntegerDigits, maxDecimalDigits) => {
  //     let { value } = e.target;

  // // console.log(e, fieldName, 'type',type, 'maxIntegerDigits', maxIntegerDigits, 'maxDecimalDigits ',maxDecimalDigits);


  //   // Process input based on type
  //   if (type === 'decimal') {
  //     // Remove any invalid characters
  //     value = value.replace(/[^0-9.]/g, '');

  //     const parts = value.split('.');

  //     // If there are more than 2 parts, combine them correctly
  //     if (parts.length > 2) {
  //         value = parts[0] + '.' + parts.slice(1).join('');
  //     }

  //     // Limit the integer part
  //     if (parts[0].length > maxIntegerDigits) {
  //         parts[0] = parts[0].slice(0, maxIntegerDigits);
  //     }

  //     // Limit the decimal part
  //     if (parts[1]) {
  //         parts[1] = parts[1].slice(0, maxDecimalDigits);
  //     }

  //     value = parts.join('.');
  // } else if (type === 'number') {
  //     value = value.replace(/[^0-9]/g, '');
  // }



  // // console.log('value ',value);


  //     if (fieldName === 'containerNo') {
  //       handleContainerNoValidation(value, checkDigit);
  //     }

  //     // Update the exportSbCargoEntry object
  //     setExportGateIn(prevEntry => ({
  //       ...prevEntry,
  //       [fieldName]: value,
  //     }));

  //    // Clear the validation error for the field, except for 'containerNo'
  // setValidationErrors(prevErrors => {
  //   // Return the current errors unchanged if fieldName is 'containerNo'
  //   if (fieldName === 'containerNo') {
  //     return prevErrors;
  //   }

  //   // Otherwise, create a copy of the errors and delete the specific field error
  //   const updatedErrors = { ...prevErrors };
  //   if (updatedErrors[fieldName]) {
  //     delete updatedErrors[fieldName];
  //   }
  //   return updatedErrors;
  // });

  //   };



  const handleFieldChange = (e, fieldName, type, maxIntegerDigits, maxDecimalDigits) => {
    let { value } = e.target;

    // Process input based on type
    if (type === 'decimal') {
      // Remove any invalid characters
      value = value.replace(/[^0-9.]/g, '');

      const parts = value.split('.');

      // If there are more than 2 parts, combine them correctly
      if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
      }

      // Limit the integer part
      if (parts[0].length > maxIntegerDigits) {
        parts[0] = parts[0].slice(0, maxIntegerDigits);
      }

      // Limit the decimal part
      if (parts[1]) {
        parts[1] = parts[1].slice(0, maxDecimalDigits);
      }

      value = parts.join('.');
    } else if (type === 'number') {
      value = value.replace(/[^0-9]/g, '');
    }

    if (fieldName === 'containerNo') {
      handleContainerNoValidation(value, checkDigit);
    }

    // Update the exportSbCargoEntry object
    setExportGateIn(prevEntry => ({
      ...prevEntry,
      [fieldName]: value,
    }));

    // Clear the validation error for the field, except for 'containerNo'
    setValidationErrors(prevErrors => {
      // Keep errors for 'containerNo' unchanged
      if (fieldName === 'containerNo') {
        return prevErrors;
      }

      // Otherwise, remove the error for the current field
      const updatedErrors = { ...prevErrors };
      if (updatedErrors[fieldName]) {
        delete updatedErrors[fieldName];
      }
      return updatedErrors;
    });
  };


  const handleDateChange = (inputField, date) => {
    setExportGateIn(prevState => ({
      ...prevState,
      [inputField]: date
    }));

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [inputField]: '',
    }));
  };



  const [chaData, setChaData] = useState([]);
  const [agentData, setAgentData] = useState([]);
  const [onAccountData, setOnAccountData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [containerHealthData, setContainerHealthData] = useState([]);

  const [selectedContainerHealth, setSelectedContainerHealth] = useState(null);
  const [selectedCha, setSelectedCha] = useState([]);
  const [selectedAgent, setselectedAgent] = useState([]);
  const [selectedOnAccount, setSelectedOnAccount] = useState([]);
  const [selectedLine, setselectedLine] = useState([]);



  const searchExporter = async (searchValue, type) => {
    if (!searchValue) {
      return;
    }

    try {
      const response = await MovementService.searchExporter(companyid, branchId, searchValue, jwtToken, type);

      if (type === 'sa') {
        setAgentData(response.data);
      }
      if (type === 'sl') {
        setLineData(response.data);
      } if (type === 'cha') {
        setChaData(response.data);
      }
      if (type === 'on') {
        setOnAccountData(response.data);
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

    if (type === 'on') {
      setSelectedOnAccount(selectedOption);
      updateExportGateIn('onAccountOf', selectedOption ? selectedOption.value : '');
      // updateExportGateIn('onAccountOfName', selectedOption ? selectedOption.label : '');
      updateValidationErrors('onAccountOf');
    }

    if (type === 'sa') {
      setselectedAgent(selectedOption);
      updateExportGateIn('sa', selectedOption ? selectedOption.value : '');
      updateValidationErrors('sa');
    }

    if (type === 'sl') {
      setselectedLine(selectedOption);
      updateExportGateIn('sl', selectedOption ? selectedOption.value : '');
      updateValidationErrors('sl');
    }



  }

  const updateExportGateIn = (field, value) => {
    setExportGateIn((prevExportSbEntry) => ({
      ...prevExportSbEntry,
      [field]: value,
    }));
  };

  const updateValidationErrors = (field) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [field]: '',
    }));
  };







  const validateExportGateIn = (exportStuffRequest) => {
    let errors = {};  // Start with the existing errors

    const {
      gateNo,
      gateInType,
      vehicleNo,
      containerNo,
      isoCode,
      customsSealNo,
      grossWeight,
      cha,
      sl,
      onAccountOf,
      tareWeight
    } = exportStuffRequest;

    // Validation checks for each field
    if (!gateNo) { errors.gateNo = 'GateNo is required'; }
    if (!vehicleNo) { errors.vehicleNo = 'VehicleNo is required'; }
    if (!gateInType) errors.gateInType = 'GateInType is required.';
    if (!isoCode) errors.isoCode = 'IsoCode is required.';
    if (!customsSealNo) errors.customsSealNo = 'CustomsSealNo is required.';

    // Check if grossWeight and tareWeight are present and greater than zero
    if (!grossWeight || grossWeight <= 0) {
      errors.grossWeight = 'GrossWeight greater than zero.';
    }

    if (!tareWeight || tareWeight <= 0) {
      errors.tareWeight = 'TareWeight greater than zero.';
    }

    if (!cha) errors.cha = 'Cha is required.';
    if (!sl) errors.sl = 'Sl is required.';
    if (!onAccountOf) errors.onAccountOf = 'OnAccountOf is required.';

    const containerNoError = handleContainerNoValidation(containerNo, checkDigit);
    if (containerNoError) {
      errors.containerNo = containerNoError;
    }

    // Set the merged errors
    setValidationErrors(errors);

    // Check if there are any errors and return validation result
    return Object.keys(errors).length === 0;
  };



  const handleContainerNoValidationBasic = (containerNo) => {
    const containerNoUpper = containerNo.toUpperCase();
    let s = 0;
    let x = 0;

    // Char values mapping
    const charVal = {
      A: "10", B: "12", C: "13", D: "14", E: "15", F: "16", G: "17",
      H: "18", I: "19", J: "20", K: "21", L: "23", M: "24", N: "25",
      O: "26", P: "27", Q: "28", R: "29", S: "30", T: "31", U: "32",
      V: "34", W: "35", X: "36", Y: "37", Z: "38"
    };

    const len = containerNoUpper.length;

    // Validate length
    if (len !== 11) {
      return false;
    } else {
      for (let i = 0; i < len - 1; i++) {
        const asciiVal = containerNoUpper.charCodeAt(i);
        if (asciiVal >= 65 && asciiVal <= 90) { // A-Z
          s += Math.pow(2, i) * parseInt(charVal[containerNoUpper.charAt(i)]);
        } else {
          s += Math.pow(2, i) * parseInt(containerNoUpper.charAt(i));
        }
      }

      x = s % 11;

      // Check the computed value against the last character
      if (
        x === parseInt(containerNoUpper.charAt(len - 1)) ||
        (x === 10 && containerNoUpper.charAt(len - 1) === "0")
      ) {

        return true;
      } else {

        return false;
      }
    }

  };



  const updateSelectTags = async (exportGateIn) => {
    const initialSA = { value: exportGateIn.sa, label: exportGateIn.shippingAgentName }; setselectedAgent(initialSA);
    const initialSL = { value: exportGateIn.sl, label: exportGateIn.shippingLineName }; setselectedLine(initialSL);
    const initialcha = { value: exportGateIn.cha, label: exportGateIn.chaName }; setSelectedCha(initialcha);
    const initialOn = { value: exportGateIn.onAccountOf, label: exportGateIn.onAccountName }; setSelectedOnAccount(initialOn);
    const initialIso = { value: exportGateIn.isoCode, label: exportGateIn.isoCode }; setSelectedIsoCode(initialIso);
    const initialGateNo = { value: exportGateIn.gateNo, label: exportGateIn.gateNo }; setSelectedGateNo(initialGateNo);

    const isValidContainerNo = handleContainerNoValidationBasic(exportGateIn.containerNo);
    setCheckDigit(isValidContainerNo ? 'N' : 'Y');
  }





  const handleSave = async (exportStuffRequest) => {

    // console.log('container Export : \n', exportGateIn);

    if (!validateExportGateIn(exportStuffRequest)) {
      toast.warning('Please enter required fields!', {
        position: 'top-center',
        autoClose: 1000,
      });
      // console.log('validationErrorsContainer : \n', validationErrors);
      return false;
    }
    setLoading(true);
    try {
      const response = await MovementService.saveExportGateInBuffer(companyid, branchId, userId, exportStuffRequest, jwtToken, woNo);

      setExportGateIn(response.data);
      updateSelectTags(response.data);
      if (searchData && (searchData.sbNo || searchData.container)
      ) {
        updatePagesList("P00234");
      }

      // console.log('saveExportGateIn : \n', response.data);
      toast.success('Data added Successfully!', {
        position: 'top-center',
        autoClose: 700,
      });

    } catch (error) {
      // Check if the error response contains a message
      const errorMessage = error.response ? error.response.data : 'Oops, something went wrong!';

      // Set the width based on the length of the error message
      const toastWidth = Math.min(600, errorMessage.length * 10);  // Adjust width based on the length of the message (max width 600px)

      if (errorMessage === 'The container is already in the inventory.') {

        setValidationErrors(prevErrors => ({
          ...prevErrors,
          containerNo: 'Already in inventory.'
        }));

      }

      toast.error(errorMessage, {
        position: 'top-center',
        autoClose: 7000, // Increased autoClose time to allow reading longer messages
        style: {
          width: `${toastWidth}px`,  // Dynamically set the width
          textAlign: 'center' // Optional: Center the text
        }
      });
    } finally {
      setLoading(false);
    }
  };



  const handleReset = async () => {
    setValidationErrors([]);
    setExportGateIn(initialGateIn);
    setselectedAgent(null);
    setselectedLine(null);
    setSelectedCha(null);
    setSelectedContainerHealth(null);
    setSelectedOnAccount(null);
    setSelectedIsoCode(null);
    setCheckDigit('N');
    setWoNo('');
  };


  const downloadBufferGateInReport = () => {


    setLoading(true);
    axios
      .post(
        `${ipaddress}exportReport/exportBufferGateInReport?cid=${companyid}&bid=${branchId}&id=${exportGateIn.gateInId}`,
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


  const [conData, setConData] = useState([]);
  const [woNo, setWoNo] = useState('');
  const getConData = (val) => {
    if (val === '') {
      setConData([]);
      return;
    }

    axios.get(`${ipaddress}bufferWO/searchContainer?cid=${companyid}&bid=${branchId}&val=${val}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;
        const portOptions = data.map(port => ({
          value: port[1],
          label: port[1],
          woNo: port[0]
        }))
        setConData(portOptions);
      })
      .catch((error) => {
        setConData([]);

      })
  }

  const handleContainerChange = async (selectedOption, { action }) => {

    if (action === 'clear') {


      setExportGateIn((prev) => ({
        ...prev,
        containerNo: '',
        isoCode: '',
        containerSize: '',
        containerType: '',
        sl: '',
        onAccountOf: '',
        cha: '',
        importerName: '',
        chaName: '',
        shippingLineName: '',
        onAccountOfName: '',
        tareWeight: '',
        commodity: ''
      }))

      setSelectedIsoCode([]);
      setSelectedCha([]);
      setSelectedOnAccount([]);
      setselectedLine([]);
    }
    else {
      setExportGateIn({
        ...exportGateIn,
        containerNo: selectedOption.value,
      });

      setWoNo(selectedOption.woNo);

      getConDataByWoNo(selectedOption.woNo, selectedOption.value);
    }
  };


  const getConDataByWoNo = (val, con) => {


    axios.get(`${ipaddress}bufferWO/getSelectedContainer?cid=${companyid}&bid=${branchId}&val=${val}&con=${con}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;

        setExportGateIn((prev) => ({
          ...prev,
          containerNo: data[14] || '',
          isoCode: data[15] || '',
          containerSize: data[16] || '',
          containerType: data[17] || '',
          sl: data[8] || '',
          onAccountOf: data[4] || '',
          cha: data[2] || '',
          importerName: data[10] || '',
          chaName: data[3] || '',
          shippingLineName: data[9] || '',
          onAccountOfName: data[5] || '',
          tareWeight: data[18] || '',
          commodity: data[19] || ''
        }))

        setSelectedIsoCode({
          value: data[15] || '',
          label: data[15] || '',
          containerType: data[17] || '',
          containerSize: data[16] || '',
          tareWeight: data[18] || '',
        })

        setSelectedCha({
          value: data[2] || '',
          label: data[3] || '',
        })


        setselectedLine({
          value: data[8] || '',
          label: data[9] || '',
        })

        setSelectedOnAccount({
          value: data[4] || '',
          label: data[5] || '',
        })


      })
      .catch((error) => {

      })
  }

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

      <div>
        <div>
          <Row>
            <Col md={2}>
              <Row>
                <Col md={9}>

                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="sbRequestId"
                    >
                      GateIn No
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="service"
                      readOnly
                      maxLength={15}
                      value={exportGateIn.gateInId}
                    />
                  </FormGroup>
                </Col>

                <Col md={3} className="d-flex justify-content-end" style={{ marginTop: 21 }}>
                  <button
                    className="btn btn-outline-primary btn-margin newButton"
                    style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    id="submitbtn2"
                    onClick={handleOpenGateInSearch}
                  >
                    <FontAwesomeIcon icon={faSearch} size="sm" s />
                  </button>
                </Col>


              </Row>
            </Col>







            <Modal Modal isOpen={isModalOpenForGateInSearch} onClose={handleCloseGateInSearch} toggle={handleCloseGateInSearch} style={{ maxWidth: '1100px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>

              <ModalHeader toggle={handleCloseGateInSearch} style={{
                backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
                boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
                border: '1px solid rgba(0, 0, 0, 0.3)',
                borderRadius: '0',
                backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }} >


                <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', color: 'white' }} > <FontAwesomeIcon
                  icon={faSearch}
                  style={{
                    marginRight: '8px',
                    color: 'white',
                  }}
                /> Search GateIn Entries</h5>

              </ModalHeader>
              <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <label className="forlabel bold-label" htmlFor="sbRequestId">
                        Search by Gate In No / Container No / Container Type / Size
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="searchGateInvalues"
                        maxLength={15}
                        name='searchGateInvalues'
                        value={searchGateInvalues}
                        onChange={(e) => setSearchGateInvalues(e.target.value)}
                      />

                    </FormGroup>
                  </Col>
                  <Col md={6} style={{ marginTop: 24 }}>
                    <button
                      className="btn btn-outline-primary btn-margin newButton"
                      // style={{ marginRight: 10, fontWeight: 'bold' }}
                      style={{ fontSize: 12, marginRight: 10 }}
                      id="submitbtn2"
                      onClick={() => searchGateInSearch(searchGateInvalues)}
                    >
                      <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                      Search
                    </button>
                    <button
                      className="btn btn-outline-danger btn-margin newButton"
                      // style={{ marginRight: 10, fontWeight: 'bold' }}
                      style={{ fontSize: 12, marginRight: 10 }}
                      id="submitbtn2"
                      onClick={clearGateInSearchSearch}
                    >
                      <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                      Reset
                    </button>
                  </Col>
                </Row>
                <hr />
                <div className="mt-1 table-responsive ">
                  <table className="table table-bordered table-hover tableHeader">
                    <thead className='tableHeader'>
                      <tr className='text-center'>
                        <th scope="col">#</th>
                        <th scope="col">Gate In No</th>
                        <th scope="col">Gate In Date</th>
                        <th scope="col">Gate No</th>
                        <th scope="col">Shift</th>
                        <th scope="col">Container No</th>
                        <th scope="col">Container Size</th>
                        <th scope="col">Container Type</th>
                        <th scope="col">Driver</th>
                        <th scope="col">Vehicle No</th>
                        <th scope="col">Status</th>

                      </tr>
                      <tr className='text-center'>
                        <th scope="col"></th>
                        <th scope="col">{gateInSearchData.length}</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>

                      {currentItemsGateInSearch.map((item, index) => (
                        <>
                          <tr key={index} className='text-center'>
                            <td>
                              <input type="radio" name="radioGroup" onChange={() => selectGateInSearchRadio(item[0], item[5], item[2],)} value={item[0]} />
                            </td>
                            <td>{item[0]}</td>
                            <td>{formatDate(item[1])}</td>
                            <td>{item[3]}</td>
                            <td>{item[4]}</td>
                            <td>{item[5]}</td>
                            <td>{item[6]}</td>
                            <td>{item[7]}</td>
                            <td>{item[8]}</td>
                            <td>{item[9]}</td>
                            <td>{item[10] === 'A' ? 'Approved' : ''}</td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                  <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                    <Pagination.First onClick={() => handlePageChangeGateIn(1)} />
                    <Pagination.Prev
                      onClick={() => handlePageChangeGateIn(currentPageGateInSearch - 1)}
                      disabled={currentPageGateInSearch === 1}
                    />
                    <Pagination.Ellipsis />

                    {displayPagesGateIn().map((pageNumber) => (
                      <Pagination.Item
                        key={pageNumber}
                        active={pageNumber === currentPageGateInSearch}
                        onClick={() => handlePageChangeGateIn(pageNumber)}
                      >
                        {pageNumber}
                      </Pagination.Item>
                    ))}

                    <Pagination.Ellipsis />
                    <Pagination.Next
                      onClick={() => handlePageChangeGateIn(currentPageGateInSearch + 1)}
                      disabled={currentPageGateInSearch === totalPagesGateInSearch}
                    />
                    <Pagination.Last onClick={() => handlePageChangeGateIn(totalPagesGateInSearch)} />
                  </Pagination>
                </div>
              </ModalBody>
            </Modal>




























            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Gate In Date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={exportGateIn.inGateInDate}
                    // onChange={(date) => handleDateChange('inGateInDate', date)}
                    id="service"
                    name="inGateInDate"
                    placeholderText="Enter Gate In Date"
                    dateFormat="dd/MM/yyyy HH:mm" // Updated format
                    timeInputLabel="Time:"
                    showTimeInput
                    timeFormat="HH:mm" // 24-hour format for time
                    timeIntervals={15}
                    className={`form-control ${validationErrors.inGateInDate ? 'error-border' : ''}`}
                    wrapperClassName="custom-react-datepicker-wrapper"
                    disabled
                    readOnly
                    tabIndex={-1}
                  /><FontAwesomeIcon
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
                <label className="forlabel" for="HazardousHazardous">Gate In Shift</label>
                <div style={{ position: 'relative' }}>
                  <Input
                    type="select"
                    name="shift"
                    className={`form-control`}
                    value={exportGateIn.shift}
                    onChange={(e) => handleFieldChange(e, 'shift')}
                    disabled={exportGateIn.gateInId}
                    id={exportGateIn.gateInId ? 'service' : ''}
                  >
                    <option value="Day">Day</option>
                    <option value="Second">Second</option>
                    <option value="Third">Third</option>
                  </Input>

                </div>
              </FormGroup>
            </Col>


            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Profit Centre Id
                  {/* <span className="error-message">*</span> */}
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  maxLength={20}
                  readOnly
                  value={profitcentre.profitcentreDesc}
                  tabIndex={-1}
                />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Status
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  maxLength={15}
                  readOnly
                  name="status"
                  value={exportGateIn.status === 'A' ? 'Approved' : exportGateIn.status}
                  tabIndex={-1}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Created By
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  maxLength={15}
                  readOnly
                  name="createdBy"
                  value={exportGateIn.createdBy}

                />
              </FormGroup>
            </Col>
          </Row>



          <Row>
            <Col md={2}>

              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Gate No<span className="error-message">*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Select
                    options={gateNos}
                    value={selectedGateNo}
                    onChange={handleGateNoChange}
                    className={`${validationErrors.gateNo ? 'error-border' : ''}`}
                    isDisabled={exportGateIn.gateInId}
                    id={exportGateIn.gateInId ? 'service' : ''}
                    placeholder="Select Gate No"
                    isClearable
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

                  {validationErrors.gateNo && (
                    <div className="error-messageNew">
                      {validationErrors.gateNo}
                    </div>
                  )}


                </div>
              </FormGroup>
            </Col>


            <Col md={2}>
              <FormGroup>
                <label className="forlabel" for="HazardousHazardous">Gate In Type</label><span className="error-message">*</span>
                <div style={{ position: 'relative' }}>
                  <Input
                    type="select"
                    name="gateInType"
                    className={`form-control ${validationErrors.gateInType ? 'error-border' : ''}`}
                    value={exportGateIn.gateInType}
                    onChange={(e) => handleFieldChange(e, 'gateInType')}
                    disabled={exportGateIn.gateInId}
                    id={exportGateIn.gateInId ? 'service' : ''}
                  >
                    <option value=""></option>
                    <option value="Buffer">Buffer</option>
                    <option value="ONWH">On Wheel</option>
                  </Input>


                  {validationErrors.gateInType && (
                    <div className="error-messageNew">
                      {validationErrors.gateInType}
                    </div>
                  )}

                </div>
              </FormGroup>
            </Col>


            <Col md={2}>
              <FormGroup>
                <label className="forlabel" for="HazardousHazardous">No Check Digit</label>
                <div style={{ position: 'relative' }}>
                  <Input
                    type="select"
                    name="checkDigit"
                    className={`form-control`}
                    value={checkDigit}
                    onChange={(e) => {
                      const value = e.target.value;
                      handleContainerNoValidation(exportGateIn.containerNo, value);
                      setCheckDigit(value);
                    }}
                    disabled={exportGateIn.gateInId}
                    id={exportGateIn.gateInId ? 'service' : ''}
                  >
                    <option value="N">No</option>
                    <option value="Y">Yes</option>
                  </Input>

                </div>
              </FormGroup>
            </Col>




            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Container No <span className="error-message">*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  {/* <input
                    className={`form-control ${validationErrors.containerNo ? 'error-border' : ''}`}
                    type="text"
                    readOnly={exportGateIn.gateInId}
                    id={exportGateIn.gateInId ? 'service' : ''}
                    maxLength={11}
                    name="containerNo"
                    // onChange={handleChange}
                    onChange={(e) => handleFieldChange(e, 'containerNo')}
                    value={exportGateIn.containerNo}
                  /> */}

                  <Select
                    value={{ value: exportGateIn.containerNo, label: exportGateIn.containerNo }}
                    onChange={handleContainerChange}
                    onInputChange={getConData}
                    options={conData}
                    isDisabled={exportGateIn.gateInId !== ''}
                    placeholder="Select Container No"
                    isClearable
                    id="shippingLine"
                    name="shippingLine"
                    className={`autocompleteHeight ${validationErrors.containerNo ? 'error-border' : ''}`}
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
                  {validationErrors.containerNo && (
                    <div className="error-messageNew">
                      {validationErrors.containerNo}
                    </div>
                  )}
                </div>
              </FormGroup>
            </Col>

            <Col md={2}>

              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Iso Code<span className="error-message">*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Select
                    options={isoCodes}
                    value={selectedIsoCode}
                    onChange={handleIsoNoChange}
                    className={`${validationErrors.isoCode ? 'error-border' : ''}`}
                    isDisabled={exportGateIn.gateInId}
                    id={exportGateIn.gateInId ? 'service' : ''}
                    placeholder="Select an Iso Code"
                    isClearable
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
                  {validationErrors.isoCode && (
                    <div className="error-messageNew">
                      {validationErrors.isoCode}
                    </div>
                  )}
                </div>
              </FormGroup>
            </Col>






            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="terminalInputs">
                  Container Size/Type
                </label>
                <div className="d-flex flex-wrap">
                  <input
                    className="form-control me-1" // Slight margin added to the right for spacing
                    style={{ flex: "1 1 0", minWidth: "0" }} // Ensure flexibility for both inputs
                    type="text"
                    id="service"
                    readOnly
                    maxLength={15}
                    name="containerSize"
                    value={exportGateIn.containerSize} // Adjust value as needed
                    tabIndex={-1}
                  />
                  <input
                    className="form-control"
                    style={{ flex: "1 1 0", minWidth: "0" }} // Ensure flexibility for both inputs
                    type="text"
                    id="service"
                    readOnly
                    maxLength={15}
                    name="containerType"
                    value={exportGateIn.containerType} // Adjust value as needed
                    tabIndex={-1}
                  />
                </div>
              </FormGroup>
            </Col>





          </Row>









          <Row>

            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="gateNo"
                >
                  Container Status
                </label>
                <Input
                  type="select"
                  name="checkDigit"
                  className={`form-control`}
                  value={exportGateIn.containerStatus}
                  // onChange={handleChange}
                  onChange={(e) => handleFieldChange(e, 'containerStatus')}
                  disabled={exportGateIn.gateInId}
                  id={exportGateIn.gateInId ? 'service' : ''}
                >
                  <option value="FCL">FCL</option>
                  <option value="LCL">LCL</option>
                  <option value="EMP">EMPTY</option>
                </Input>
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Custom Seal No<span className="error-message">*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    className={`form-control ${validationErrors.customsSealNo ? 'error-border' : ''}`}
                    type="text"
                    maxLength={15}
                    name="customsSealNo"
                    value={exportGateIn.customsSealNo}
                    onChange={(e) => handleFieldChange(e, 'customsSealNo')}
                    readOnly={exportGateIn.gateInId}
                    id={exportGateIn.gateInId ? 'service' : ''}
                  />
                  {validationErrors.customsSealNo && (
                    <div className="error-messageNew">
                      {validationErrors.customsSealNo}
                    </div>
                  )}

                </div>
              </FormGroup>
            </Col>


            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Container Seal No
                </label>
                <input
                  className="form-control"
                  type="text"
                  maxLength={15}
                  name="containerSealNo"
                  value={exportGateIn.containerSealNo}
                  //  onChange={handleChange}    
                  onChange={(e) => handleFieldChange(e, 'containerSealNo')}
                />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Invoice No
                </label>
                <input
                  className="form-control"
                  type="text"
                  maxLength={100}
                  name="invoiceNo"
                  value={exportGateIn.invoiceNo}
                  onChange={(e) => handleFieldChange(e, 'invoiceNo')}
                />
              </FormGroup>
            </Col>





            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Invoice Date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={exportGateIn.invoiceDate}
                    onChange={(date) => handleDateChange('invoiceDate', date)}
                    // id="service"
                    name="inGateInDate"
                    placeholderText="Enter Invoice Date"
                    dateFormat="dd/MM/yyyy HH:mm" // Updated format
                    timeInputLabel="Time:"
                    showTimeInput
                    timeFormat="HH:mm" // 24-hour format for time
                    timeIntervals={15}
                    className={`form-control ${validationErrors.invoiceDate ? 'error-border' : ''}`}
                    wrapperClassName="custom-react-datepicker-wrapper"
                  // disabled
                  // readOnly
                  // tabIndex={-1}
                  /><FontAwesomeIcon
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
                  {validationErrors.invoiceDate && (
                    <div className="error-messageNew">
                      {validationErrors.invoiceDate}
                    </div>
                  )}
                </div>
              </FormGroup>
            </Col>





            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Gross Weight
                  <span className="error-message">*</span>
                </label>

                <div style={{ position: "relative" }}>
                  <input
                    className={`form-control ${validationErrors.grossWeight ? 'error-border' : ''}`}
                    type="text"
                    id="grossWeight"
                    name="grossWeight"
                    value={exportGateIn.grossWeight}
                    maxLength={17}
                    onChange={(e) => handleFieldChange(e, 'grossWeight', 'decimal', 12, 4)}
                  />

                  {validationErrors.grossWeight && (
                    <div className="error-messageNew">
                      {validationErrors.grossWeight}
                    </div>
                  )}
                </div>
              </FormGroup>
            </Col>

          </Row>
          <Row>

            <Col md={2}>


              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Select Cha<span className="error-message">*</span>
                </label>


                <div style={{ position: "relative" }}>
                  <Select
                    options={chaData}
                    value={selectedCha}
                    onInputChange={(inputValue, { action }) => {
                      if (action === 'input-change') {
                        searchExporter(inputValue, 'cha');
                      }
                    }}
                    onChange={(selectedOption) => handleSelectChange(selectedOption, 'cha')}
                    className={validationErrors.cha ? 'error-border' : ''}
                    placeholder="Select Cha"
                    // components={{ Option: CustomOptionCha }}
                    isClearable
                    isDisabled={exportGateIn.gateInId}
                    id={exportGateIn.gateInId ? 'service' : ''}
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
                  {validationErrors.cha && (
                    <div className="error-messageNew">
                      {validationErrors.cha}
                    </div>
                  )}
                </div>
              </FormGroup>
            </Col>



            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Shipping Line<span className="error-message">*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <Select
                    options={lineData}
                    value={selectedLine}
                    onInputChange={(inputValue, { action }) => {
                      if (action === 'input-change') {
                        searchExporter(inputValue, 'sl');
                      }
                    }}
                    onChange={(selectedOption) => handleSelectChange(selectedOption, 'sl')}
                    className={validationErrors.sl ? 'error-border' : ''}
                    placeholder="Select Shipping Line"
                    isClearable
                    isDisabled={exportGateIn.gateInId}
                    id={exportGateIn.gateInId ? 'service' : ''}
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
                  {validationErrors.sl && (
                    <div className="error-messageNew">
                      {validationErrors.sl}
                    </div>
                  )}

                </div>
              </FormGroup>
            </Col>




            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Select Shipping Agent
                </label>
                <div style={{ position: "relative" }}>
                  <Select
                    options={agentData}
                    value={selectedAgent}
                    onInputChange={(inputValue, { action }) => {
                      if (action === 'input-change') {
                        searchExporter(inputValue, 'sa');
                      }
                    }}
                    onChange={(selectedOption) => handleSelectChange(selectedOption, 'sa')}
                    className={validationErrors.sa ? 'error-border' : ''}
                    placeholder="Select Shipping Agent"
                    isClearable
                    isDisabled={exportGateIn.gateInId}
                    id={exportGateIn.gateInId ? 'service' : ''}

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
                  {validationErrors.exporterId && (
                    <div className="error-messageNew">
                      {validationErrors.exporterId}
                    </div>
                  )}

                </div>
              </FormGroup>
            </Col>




            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Select Account Holder<span className="error-message">*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <Select
                    options={onAccountData}
                    value={selectedOnAccount}
                    onInputChange={(inputValue, { action }) => {
                      if (action === 'input-change') {
                        searchExporter(inputValue, 'on');
                      }
                    }}
                    onChange={(selectedOption) => handleSelectChange(selectedOption, 'on')}
                    className={validationErrors.onAccountOf ? 'error-border' : ''}
                    placeholder="Select Account Holder"
                    isClearable
                    isDisabled={exportGateIn.gateInId}
                    id={exportGateIn.gateInId ? 'service' : ''}
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
                  {validationErrors.onAccountOf && (
                    <div className="error-messageNew">
                      {validationErrors.onAccountOf}
                    </div>
                  )}

                </div>
              </FormGroup>
            </Col>




            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Container Health
                </label>


                <Input
                  type="select"
                  value={exportGateIn.containerHealth}
                  className={`form-control`}
                  // onChange={(e) => handleFieldChange(e, index, 'newCommodity')}
                  onChange={(e) => handleFieldChange(e, 'containerHealth')}
                >
                  <option value="">Select Container Health</option>
                  {containerHealthData.map((type, idx) => (
                    <option key={idx} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Input>

              </FormGroup>
            </Col>

            {/* <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Container Health
                </label>
                <div style={{ position: "relative" }}>
                  <Select
                    options={containerHealthData}
                    value={selectedContainerHealth}
                    onChange={handleContainerHealthSelect}
                    placeholder="Select Container Health"
                    isClearable
                    id="containerHealth"
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
                </div>
              </FormGroup>
            </Col> */}


            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Reefer
                </label>
                <Input
                  type="select"
                  name="checkDigit"
                  className={`form-control`}
                  value={exportGateIn.refer}
                  onChange={(e) => handleFieldChange(e, 'refer')}
                  disabled={exportGateIn.gateInId}
                  id={exportGateIn.gateInId ? 'service' : ''}
                >
                  <option value="N">No</option>
                  <option value="Y">Yes</option>
                </Input>
              </FormGroup>
            </Col>


          </Row>

          <Row>

            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  DO No
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="deliveryOrderNo"
                  name="deliveryOrderNo"
                  value={exportGateIn.deliveryOrderNo}
                  maxLength={10}
                  onChange={(e) => handleFieldChange(e, 'deliveryOrderNo')}
                />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  DO Date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={exportGateIn.deliveryOrderDate}
                    onChange={(date) => handleDateChange('deliveryOrderDate', date)}
                    name="deliveryOrderDate"
                    placeholderText="Enter Do Date"
                    dateFormat="dd/MM/yyyy HH:mm" // Updated format
                    timeInputLabel="Time:"
                    showTimeInput
                    timeFormat="HH:mm" // 24-hour format for time
                    timeIntervals={15}
                    className={`form-control ${validationErrors.deliveryOrderDate ? 'error-border' : ''}`}
                    wrapperClassName="custom-react-datepicker-wrapper"

                  /><FontAwesomeIcon
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
                  {validationErrors.deliveryOrderDate && (
                    <div className="error-messageNew">
                      {validationErrors.deliveryOrderDate}
                    </div>
                  )}
                </div>
              </FormGroup>
            </Col>








            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  DO Validity Date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={exportGateIn.doValidityDate}
                    onChange={(date) => handleDateChange('doValidityDate', date)}
                    name="doValidityDate"
                    placeholderText="Enter Do Validity Date"
                    dateFormat="dd/MM/yyyy HH:mm" // Updated format
                    timeInputLabel="Time:"
                    showTimeInput
                    timeFormat="HH:mm" // 24-hour format for time
                    timeIntervals={15}
                    className={`form-control ${validationErrors.doValidityDate ? 'error-border' : ''}`}
                    wrapperClassName="custom-react-datepicker-wrapper"

                  /><FontAwesomeIcon
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
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Transporter Status
                </label>
                <div style={{ position: "relative" }}>

                  <Input
                    type="select"
                    name="transporterStatus"
                    className={`form-control`}
                    value={exportGateIn.transporterStatus}
                    onChange={(e) => handleFieldChange(e, 'transporterStatus')}
                    disabled={exportGateIn.gateInId}
                    id={exportGateIn.gateInId ? 'service' : ''}
                  >
                    <option value="P">Private</option>
                    <option value="C">Contractor</option>
                  </Input>

                  {validationErrors.transporterStatus && (
                    <div className="error-messageNew">
                      {validationErrors.transporterStatus}
                    </div>
                  )}
                </div>
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Transporter Name
                </label>

                <input
                  className="form-control"
                  type="text"
                  disabled={exportGateIn.gateInId}
                  id={exportGateIn.gateInId ? 'service' : ''}
                  value={exportGateIn.transporterName}
                  maxLength={50}
                  onChange={(e) => handleFieldChange(e, 'transporterName')}
                />
              </FormGroup>
            </Col>


            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Vehicle No <span className="error-message">*</span>
                </label>

                <div style={{ position: "relative" }}>
                  <input
                    className={`form-control ${validationErrors.vehicleNo ? 'error-border' : ''}`}
                    type="text"
                    disabled={exportGateIn.gateInId}
                    id={exportGateIn.gateInId ? 'service' : ''}
                    maxLength={15}
                    name='vehicleNo'
                    value={exportGateIn.vehicleNo}
                    onChange={(e) => handleFieldChange(e, 'vehicleNo')}
                  />

                  {validationErrors.vehicleNo && (
                    <div className="error-messageNew">
                      {validationErrors.vehicleNo}
                    </div>
                  )}
                </div>
              </FormGroup>
            </Col>

          </Row>
          <Row>


            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="gateNo"
                >
                  Driver
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="profitcentreId"
                  maxLength={50}
                  name='vehicleNo'
                  value={exportGateIn.driverName}
                  onChange={(e) => handleFieldChange(e, 'driverName')}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Tare Weight <span className="error-message">*</span>
                </label>

                <div style={{ position: "relative" }}>
                  <input
                    className={`form-control ${validationErrors.tareWeight ? 'error-border' : ''}`}
                    type="text"
                    maxLength={19}
                    name='tareWeight'
                    value={exportGateIn.tareWeight}
                    // disabled={exportGateIn.gateInId}
                    readOnly
                    id='service'
                  // id={exportGateIn.gateInId ? 'service' : ''}
                  // onChange={(e) => handleFieldChange(e, 'tareWeight', 'decimal', 15, 3)}
                  />
                  {validationErrors.tareWeight && (
                    <div className="error-messageNew">
                      {validationErrors.tareWeight}
                    </div>
                  )}
                </div>
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Shipper Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  maxLength={100}
                  name='vehicleNo'
                  value={exportGateIn.importerName}
                  onChange={(e) => handleFieldChange(e, 'importerName')}
                  disabled={exportGateIn.gateInId}
                  id={exportGateIn.gateInId ? 'service' : ''}
                />
              </FormGroup>
            </Col>










            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Select Commodity
                </label>


                <Input
                  type="select"
                  value={exportGateIn.commodity}
                  className={`form-control`}
                  onChange={(e) => handleFieldChange(e, 'commodity')}
                  disabled={exportGateIn.gateInId}
                  id={exportGateIn.gateInId ? 'service' : ''}
                >
                  <option value="">Select Commodity</option>
                  {commodityData.map((type, idx) => (
                    <option key={idx} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Input>

              </FormGroup>
            </Col>





            {/* <div style={{ position: "relative" }}>
                 
                  <Select
                    options={commodityData}
                    value={selectedCommodity}
                    onChange={handleContainerCommodity}
                    placeholder="Select Container Health"
                    isClearable
                    id="containerHealth"
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
                </div> */}




            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Hazardous
                </label>
                <Input
                  type="select"
                  name="hazardous"
                  className={`form-control`}
                  value={exportGateIn.hazardous}
                  onChange={(e) => handleFieldChange(e, 'hazardous')}
                // disabled={exportGateIn.gateInId}
                // id={exportGateIn.gateInId ? 'service' : ''}
                >
                  <option value="N">No</option>
                  <option value="Y">Yes</option>
                </Input>
              </FormGroup>
            </Col>


            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Haz Class
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    className="form-control"
                    type="text"
                    id="hazClass"
                    maxLength={10}
                    name='hazClass'
                    value={exportGateIn.hazClass}
                    onChange={(e) => handleFieldChange(e, 'hazClass')}
                  />
                  {validationErrors.hazClass && (
                    <div className="error-messageNew">
                      {validationErrors.hazClass}
                    </div>
                  )}
                </div>
              </FormGroup>
            </Col>

          </Row>

          <Row>

            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="origin"
                >
                  From Location
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="origin"
                  maxLength={50}
                  name='origin'
                  value={exportGateIn.origin}
                  onChange={(e) => handleFieldChange(e, 'origin')}
                />
              </FormGroup>
            </Col>



            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  UN No
                </label>

                <input
                  className="form-control"
                  type="text"
                  id="profitcentreId"
                  maxLength={7}
                  name='unNo'
                  value={exportGateIn.unNo}
                  onChange={(e) => handleFieldChange(e, 'unNo')}
                />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Commodity Description
                </label>
                <textarea
                  className={`form-control`}
                  id="remarks"
                  name='remarks'
                  value={exportGateIn.commodityDescription}
                  onChange={(e) => handleFieldChange(e, 'commodityDescription')}
                  maxLength={250}
                  rows={2}
                ></textarea>
              </FormGroup>
            </Col>


            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Remarks
                </label>

                <textarea
                  className={`form-control`}
                  id="remarks"
                  name='remarks'
                  value={exportGateIn.remarks}
                  onChange={(e) => handleFieldChange(e, 'remarks')}
                  maxLength={100}
                  rows={2}
                ></textarea>
              </FormGroup>
            </Col>
          </Row>




          <Row className="text-center mt-1 mb-1">
            <Col>
              <button
                className="btn btn-outline-primary btn-margin newButton"
                style={{ fontSize: 14, marginRight: 10 }}
                id="submitbtn2"
                onClick={(e) => handleSave(exportGateIn)}
              >
                <FontAwesomeIcon
                  icon={faSave}
                  style={{ marginRight: "5px" }}
                />
                Save
              </button>

              <button
                className="btn btn-outline-danger btn-margin newButton"
                style={{ fontSize: 14, marginRight: 10 }}
                id="submitbtn2"
                onClick={handleReset}
              >
                <FontAwesomeIcon
                  icon={faRefresh}
                  style={{ marginRight: "5px" }}
                />
                Clear
              </button>
              <button
                className="btn btn-outline-success btn-margin newButton"
                style={{ marginRight: 10 }}
                id="submitbtn2"
                disabled={exportGateIn.gateInId === ''}
                onClick={downloadBufferGateInReport}
              >
                <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
                Print Report
              </button>

            </Col>
          </Row>









        </div>
        <div>
        </div>
      </div>
    </>
  );
}


export default BufferFDSOnWheel;