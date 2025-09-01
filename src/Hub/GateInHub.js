import AuthContext from "../Components/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import Select, { components } from 'react-select';
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
  Button,
  Input,
  Table,
} from "reactstrap";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdBadge,
  faChartGantt,
  faBold,
  faBox,
  faArrowAltCircleLeft,
  faSearch,
  faRefresh,
  faUpload,
  faFileExcel,
  faSave,
  faCheck,
  faDownload,
  faTrash,
  faShip,
  faBackward,
  faCalendarAlt,
  faAdd,
  faGroupArrowsRotate,
  faPlaneDeparture,
  faTimesCircle,
  faEdit,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/style.css";
import "../Components/Style.css";
import useAxios from "../Components/useAxios";
import cfsService from "../service/CFSService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import movementService from "../service/MovementService";


function GateInHub({ searchData, resetFlag, updatePagesList }) {
  const navigate = useNavigate();
  const axios = useAxios();
  const { isAuthenticated } = useContext(AuthContext);

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
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
    userRights,
  } = useContext(AuthContext);

  const axiosInstance = useAxios();
  const CFSService = new cfsService(axiosInstance);
  const MovementService = new movementService(axiosInstance);


  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    },
  };

  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const processId = 'P00102';


  const [profitcentre, setProfitcentre] = useState({
    profitcentreId: '',
    profitcentreDesc: ''
  });



  useEffect(() => {
    if (searchData && searchData.activeTab === processId && searchData.gateInId && searchData.sbTransId && searchData.sbNo && searchData.profitCenterId) {
      getSelectedGateInSearch(searchData.gateInId, searchData.sbTransId, searchData.sbNo, searchData.profitCenterId);
    }
  }, [searchData]);


  useEffect(() => {

    if (resetFlag) {
      handleReset();
    }
  }, [resetFlag]);


  // // console.log('Cargo Gate In resetFlag ', resetFlag);
  const foundRights =
    role !== "ROLE_ADMIN"
      ? userRights.find((item) => item.process_Id === processId)
      : null;
  const allowCreate = foundRights?.allow_Create === "Y";
  const allowRead = foundRights?.allow_Read === "Y";
  const allowEdit = foundRights?.allow_Update === "Y";
  const allowDelete = foundRights?.allow_Delete === "Y";




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
    invoiceDate: new Date(0),
    nocNo: '',
    nocDate: new Date(0),
    gateInType: 'EXP',
    profitcentreId: 'N00005',
    processId: processId,
    cartingTransId: '',
    cartedPackages: 0,
    viaNo: '',
    containerNo: '',
    containerSize: '',
    containerType: '',
    containerStatus: '',
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
    weightTakenIn: 0,
    weighmentWeight: 0.000,
    weighmentPassNo: '',
    weighmentWtUser: '',
    weighmentWtDate: new Date(0),
    weighmentDone: 'N',
    overDimension: '',
    hazardous: '',
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
    deliveryOrderDate: new Date(0),
    doValidityDate: new Date(0),
    shift: 'Day',
    portExitNo: '',
    portExitDate: new Date(0),
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
    jobOrderId: '',
    jobDate: null,
    gateInWt: 0,
    area: '',
    shippingLineName: ''
  };




  const [profitCenters, setProfitCenters] = useState([]);
  const [selectedProfitCenter, setSelectedProfitCenter] = useState(null);

  const [gateNos, setGateNos] = useState([]);
  const [selectedGateNo, setSelectedGateNo] = useState({ value: 'Gate01', label: 'Gate 01' });





  const [exportGateIn, setExportGateIn] = useState([initialGateIn]);
  const [preExportGateIn, setPreExportGateIn] = useState([]);

  const [isModalOpenForGateInSearch, setIsModalOpenForGateInSearch] = useState(false);

  const [searchGateInvalues, setSearchGateInvalues] = useState('');
  const [gateInSearchData, setGateInSearchData] = useState([]);





  useEffect(() => {
    const fetchData = async () => {
      await getGateNos('J00015');
      await getProgitCenterById('N00005');
    };
    fetchData();
  }, []);


  const getGateNos = async (jarId) => {
    const portType = await getjarByJarId(jarId);
    setGateNos(portType);
  };

  const getProgitCenters = async () => {
    try {
      const response = await CFSService.getProgitCenters(companyid, branchId, jwtToken);


      setProfitCenters(response.data);

    } catch (error) {
      console.error('Error fetching port data:', error);
    }
  };


  const getjarByJarId = async (jarId) => {
    try {
      const response = await CFSService.getjarByJarId(companyid, jarId, jwtToken);
      const result = response.data;
      const resultSet = result.map(port => ({
        value: port[0],
        label: port[1]
      }));

      return resultSet;
    } catch (error) {
      console.error('Error fetching port data:', error);
    }
  };




  const getProgitCenterById = async (profitCenterId) => {
    try {
      const response = await CFSService.getProgitCenterById(companyid, branchId, profitCenterId, jwtToken);
      setProfitcentre(response.data);
      // Update exportSbEntry with the profitcentreId
      // setExportGateIn(prevState =>
      //   prevState.map(item => ({
      //     ...item,
      //     profitcentreId: response.data.profitcentreId
      //   }))
      // );
    } catch (error) {
      console.error('Error fetching port data:', error);
    }
  };


  const getSelectedGateInSearch = async (gateInId, igmNo, hubTransId, profitCenter) => {
    setValidationErrors([]);
    setLoading(true);
    try {
      const response = await MovementService.getSelectedGateInEntryHub(companyid, branchId, gateInId, hubTransId, igmNo, profitCenter, jwtToken);

      const initialSelectedSbNos = response.data.map(entry => ({
        label: entry.docRefNo,
        value: entry.docRefNo,
      }));
      setSelectedSbNos(initialSelectedSbNos);

      // Set the selectedSbNos state to the array of sbNos
      setSelectedSbNos(initialSelectedSbNos);
      setPreExportGateIn(response.data);
      setExportGateIn(response.data);
    } catch (error) {
      console.error("Error fetching SB entries:", error);
    } finally {
      setLoading(false);
    }
  };





  const selectGateInSearchRadio = async (gateInId, igmNo, hubTransId, profitCenter) => {
    await getSelectedGateInSearch(gateInId, igmNo, hubTransId, profitCenter);
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



  const handleGateNoChange = selectedOption => {
    setSelectedGateNo(selectedOption);

    // Update only the last entry in exportGateIn
    setExportGateIn(prevExportGateIn => {
      if (prevExportGateIn.length === 0) return prevExportGateIn;

      const updatedGateIn = [...prevExportGateIn];
      updatedGateIn[updatedGateIn.length - 1] = {
        ...updatedGateIn[updatedGateIn.length - 1],
        gateNo: selectedOption ? selectedOption.value : ''
      };

      return updatedGateIn;
    });

    // Clear validation errors for gateNo in the last entry
    setValidationErrors(prevErrors => {
      const updatedErrors = [...prevErrors];

      if (updatedErrors.length > 0) {
        const lastIndex = updatedErrors.length - 1;
        if (updatedErrors[lastIndex]) {
          delete updatedErrors[lastIndex].gateNo;
        }
      }
      return updatedErrors;
    });
  };

  const [sbNos, setSbNos] = useState([]);
  const [selectedSbNos, setSelectedSbNos] = useState([]);



  const handleSbNoChange = async (selectedOption, index, srNo, hubTransId, gateInId, status) => {
    const updatedSbNos = [...selectedSbNos];
    updatedSbNos[index] = selectedOption;
    // Clear validation error for the field if valid
    setValidationErrors(prevErrors => {
      const updatedErrors = [...prevErrors];
      updatedErrors.splice(index, 1);
      return updatedErrors;
    });

    setSelectedSbNos(updatedSbNos);
    await handleGetSbCargoEntry(srNo, hubTransId, gateInId, status, selectedOption ? selectedOption.label : '');
    setSbNos([]);
  };



  const CustomOption = (props) => {
    return (
      <components.Option {...props}>
        <span style={{ fontWeight: 'bold' }}>{props.data.label}</span>
        {" - " + props.data.igmLine}
      </components.Option>
    );
  };


  const searchIgmNos = async (searchvalue, gateInId) => {
    try {
      const response = await MovementService.searchIgmNoToGateIn(companyid, branchId, 'N00005', searchvalue, gateInId, jwtToken);
      setSbNos(response.data);
    } catch (error) {
      console.error("Error fetching IGM entries:", error);
    }
  };


  // PAGINATION FOR SELECT EXPORTER
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
      const response = await MovementService.getGateInEntriesToSelectHub(companyid, branchId, searchvalue, processId, 'N00005', jwtToken);

      setGateInSearchData(response.data);

    } catch (error) {
      console.error("Error fetching SB entries:", error);
      // Optionally handle the error further, e.g., show a notification to the user
    } finally {
      setLoading(false);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear the validation error for the field
    setValidationErrors(prevErrors => {
      const updatedErrors = [...prevErrors];
      if (updatedErrors.length > 0) {
        const lastIndex = updatedErrors.length - 1;
        if (updatedErrors[lastIndex]) {
          delete updatedErrors[lastIndex][name];
        }
      }
      return updatedErrors;
    });

    setExportGateIn((prevExportGateIn) => {
      // Ensure there is at least one entry
      if (prevExportGateIn.length === 0) return prevExportGateIn;

      // Update the last entry
      const updatedGateIn = [...prevExportGateIn];
      updatedGateIn[updatedGateIn.length - 1] = {
        ...updatedGateIn[updatedGateIn.length - 1],
        [name]: value
      };

      return updatedGateIn;
    });
  };



  const [validationErrors, setValidationErrors] = useState([]);


  const validateExportGateIn = (exportGateIn) => {
    let errors = [];

    exportGateIn.forEach((detail, index) => {
      const { gateInId, gateNo, profitcentreId, vehicleNo, docRefNo, weightTakenIn, qtyTakenIn, fob, actualNoOfPackages, grossWeight, cargoWeight, gateInWt } = detail;
      let error = {};

      if (!weightTakenIn || weightTakenIn <= 0) {
        error.weightTakenIn = 'weightTakenIn is required';
      }

      if (!qtyTakenIn || qtyTakenIn <= 0) {
        error.qtyTakenIn = 'Quantity is required';
      }
      if (!docRefNo) error.docRefNo = 'sbNo is required.';
      if (!gateNo) error.gateNo = 'Gate No is required.';
      if (!profitcentreId) error.profitcentreId = 'ProfitCenter is required.';
      if (!vehicleNo) error.vehicleNo = 'Vehicle No is required.';




      const currentPreEntry = preExportGateIn[index];

      const maxWeight = parseFloat(cargoWeight - gateInWt) + (gateInId ? parseFloat(currentPreEntry ? currentPreEntry.weightTakenIn : 0) : 0);

      const maxQty = parseFloat(actualNoOfPackages - fob) + (gateInId ? parseFloat(currentPreEntry ? currentPreEntry.qtyTakenIn : 0) : 0);; // Calculate maximum allowable quantity


      if (qtyTakenIn > maxQty) {
        error.qtyTakenIn = `Quantity cannot exceed the maximum of ${maxQty}`;
      }

      if (weightTakenIn > weightTakenIn) {
        error.weightTakenIn = `Cargo weight cannot exceed the maximum of ${maxWeight}`;
      }

      errors.push(error);
    });

    setValidationErrors(errors);

    // Check if there are any errors
    return errors.every(error => Object.keys(error).length === 0);
  };


  const handleFieldChange = (e, index, fieldName, type, maxIntegerDigits, maxDecimalDigits) => {
    let { value } = e.target;

    // Get the current entry
    const currentEntry = exportGateIn[index];
    const noOfPackages = parseInt(currentEntry?.actualNoOfPackages || 0);
    const grossWeight = parseFloat(currentEntry?.cargoWeight || 0);

    if (type === 'decimal') {
      // Allow digits and decimal points
      value = value.replace(/[^0-9.]/g, '');

      // Ensure only one decimal point
      const parts = value.split('.');
      if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
      }

      // Limit integer part
      if (parts[0].length > maxIntegerDigits) {
        parts[0] = parts[0].slice(0, maxIntegerDigits);
      }

      // Limit decimal part to specified digits
      if (parts[1]) {
        parts[1] = parts[1].slice(0, maxDecimalDigits);
      }

      // Combine integer and decimal parts
      value = parts.join('.');
    } else if (type === 'number') {
      // Allow only digits
      value = value.replace(/[^0-9]/g, '');
    }

    // Update the state for the field
    setExportGateIn(prevState => {
      const updatedTransDtl = [...prevState];
      updatedTransDtl[index] = {
        ...updatedTransDtl[index],
        [fieldName]: value,
      };

      // Calculate average cargo weight if fieldName is 'qtyTakenIn'
      if (fieldName === 'qtyTakenIn') {
        console.log(grossWeight, ' grossWeight ', noOfPackages, ' noOfPackages');

        if (noOfPackages > 0) {
          const weightPerPackage = grossWeight / noOfPackages;
          const noOfPackagesStuffed = parseInt(value || 0);
          const averageCargoWeight = (weightPerPackage * noOfPackagesStuffed).toFixed(2);

          updatedTransDtl[index].weightTakenIn = parseFloat(averageCargoWeight);
        } else {
          updatedTransDtl[index].weightTakenIn = 0;
        }
      }
      return updatedTransDtl;
    });

    // Clear validation errors
    setValidationErrors(prevErrors => {
      const updatedErrors = [...prevErrors];

      if (updatedErrors[index]) {
        delete updatedErrors[index][fieldName]; // Remove error for the current field

        if (fieldName === 'qtyTakenIn') {
          delete updatedErrors[index].weightTakenIn; // Also remove error for cargoWeight
        }
      }

      return updatedErrors;
    });
  };




  const checkMaxQuantity = (index) => {
    const currentEntry = exportGateIn[index];

    const currentPreEntry = preExportGateIn[index];
    const maxQty = currentEntry?.actualNoOfPackages - currentEntry?.gateInPackages +
      (currentEntry?.gateInId ? parseFloat(currentPreEntry ? currentPreEntry.qtyTakenIn : 0) : 0);

    const qtyTakenIn = parseFloat(currentEntry.qtyTakenIn);

    if (qtyTakenIn > maxQty) {

      toast.warning(<div dangerouslySetInnerHTML={{ __html: `Enter Valid Quantity:: Remaining Qty:<strong> ${maxQty} </strong>` }} />, {
        position: 'top-center',
        autoClose: 1000,
        style: { width: '29vw' },
      });
      setValidationErrors(prevErrors => {
        const updatedErrors = [...prevErrors];
        if (!updatedErrors[index]) updatedErrors[index] = {};
        updatedErrors[index]['qtyTakenIn'] = 'Exceeds maximum quantity';
        return updatedErrors;
      });
    }
  };

  const checkMaxWeight = (index) => {
    const currentEntry = exportGateIn[index];

    const currentPreEntry = preExportGateIn[index];


    const maxWeight = currentEntry?.cargoWeight - currentEntry?.gateInWt +
      (currentEntry?.gateInId ? parseFloat(currentPreEntry ? currentPreEntry.qtyTakenIn : 0) : 0);

    // const maxWeight = currentEntry?.cargoWeight + (currentEntry?.gateInId ? parseFloat(currentPreEntry ? currentPreEntry.weightTakenIn : 0) : 0);
    const cargoWeight = parseFloat(currentEntry.weightTakenIn);

    if (cargoWeight > maxWeight) {

      toast.warning(<div dangerouslySetInnerHTML={{ __html: `Enter Valid Weight:: Remaining weight:<strong> ${maxWeight} </strong>` }} />, {
        position: 'top-center',
        autoClose: 1000,
        style: { width: '29vw' },
      });

      // Set validation error
      setValidationErrors(prevErrors => {
        const updatedErrors = [...prevErrors];
        if (!updatedErrors[index]) updatedErrors[index] = {};
        updatedErrors[index]['weightTakenIn'] = 'Exceeds maximum weight';
        return updatedErrors;
      });
    }
  };


  const lastEntryWithId = exportGateIn.slice().reverse().find(entry => entry.gateInId && entry.gateInId.trim().length > 0);

  // If found, use it as lastEntry; otherwise, use the last entry in the array
  const lastEntry = lastEntryWithId || exportGateIn[exportGateIn.length - 1];



  const handleGetSbCargoEntry = async (srNo, hubTransId, gateInId, status, igmNo) => {

    if (status) {
      return;
    }
    try {
      const response = await MovementService.checkDuplicateIgmNoCargoGateIn(companyid, branchId, hubTransId, gateInId, igmNo, 'N00005', jwtToken);

      if (response.data && Array.isArray(response.data) && response.data.length > 0) {

        const data = response.data[0];
        setExportGateIn(prevState =>
          prevState.map(entry =>
            entry.srNo === srNo
              ? {
                ...entry,
                docRefNo: data[0],
                erpDocRefNo: data[2],
                docRefDate: data[3],
                sl: data[4],
                shippingLineName: data[5],
                commodityDescription: data[6],
                actualNoOfPackages: data[7],
                gateInPackages: data[8],
                cargoType: data[9],
                importerName: data[10],
                area: data[11],
                grossWeight: data[12],
                cargoWeight: data[13],
                lineNo: data[1],
                gateInWt: data[14]
              }
              : entry
          )
        );

        toast.success('Data Found', {
          position: 'top-center',
          autoClose: 1000,
        });
      }
      else {
        setExportGateIn(prevState =>
          prevState.map(entry =>
            entry.srNo === srNo
              ? {
                ...entry,
                docRefNo: '',
                erpDocRefNo: '',
                docRefDate: '',
                sl: '',
                shippingLineName: '',
                commodityDescription: '',
                actualNoOfPackages: '',
                gateInPackages: '',
                cargoType: '',
                importerName: '',
                area: '',
                grossWeight: '',
                cargoWeight: '',
                lineNo: '',
                weightTakenIn: '',
                qtyTakenIn: '',
                gateInWt: 0
              }
              : entry
          )
        );
        toast.error('No Data Found', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error('An error occurred while checking for duplicate IGM No.', {
        position: 'top-center',
        autoClose: 3000,
      });
      console.error('Error checking duplicate IGM No:', error);
    }
  };






  const handleAddRow = async () => {

    const { success, cargoGateIns } = await handleSave();
    if (!success) {
      return;
    }

    const newSrNo = cargoGateIns.length + 1;

    const lastEntryNew = cargoGateIns[cargoGateIns.length - 1];
    // Create a new entry with the incremented srNo
    const newCargoGateIn = {
      ...initialGateIn,
      srNo: newSrNo,
      gateInId: lastEntryNew.gateInId,
      inGateInDate: lastEntryNew.inGateInDate,
      gateNo: lastEntry.gateNo,
      finYear: lastEntryNew.finYear,
      vehicleNo: lastEntryNew.vehicleNo,
      transporterStatus: lastEntryNew.transporterStatus,
      shift: lastEntryNew.shift,
      createdBy: lastEntryNew.createdBy,
      profitcentreId: lastEntryNew.profitcentreId,
      transporterName: lastEntryNew.transporterName,
      driverName: lastEntryNew.driverName,
      jobOrderId: lastEntry.jobOrderId,
      jobDate: lastEntry.jobDate
    };

    setExportGateIn([...cargoGateIns, newCargoGateIn]);

  };




  const handleSave = async () => {

    if (!validateExportGateIn(exportGateIn)) {
      toast.warning("Plase check the values entered...", {
        position: 'top-center',
        autoClose: 1000,
      });
      return false;
    }
    setLoading(true);
    try {
      const response = await MovementService.addHubGateIn(companyid, branchId, exportGateIn, jwtToken, userId);

      setExportGateIn(response.data);
      setPreExportGateIn(response.data);



      if (searchData && (searchData.sbNo && searchData.sbLineNo)
      ) {
        updatePagesList("P00102");
      }


      toast.success('Data added Successfully!', {
        position: 'top-center',
        autoClose: 700,
      });

      return { success: true, cargoGateIns: response.data };
    } catch (error) {

      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data;


        // Extract SrNo and sbNo from the error message for targeted validation
        const match = errorMessage.match(/SrNo: (\d+) and SB No: (\d+)/);
        if (match) {


          const srNo = parseInt(match[1], 10);
          const sbNo = match[2];

          const errorMessageNew = `Duplicate IGM No found for SrNo: <strong>${srNo}</strong> and SB No: <strong>${sbNo}</strong>`;
          const contentWidth = errorMessageNew.length * 6;

          toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessageNew }} />, {
            position: 'top-center',
            autoClose: 3000,
            style: { width: `${contentWidth}px` },
          });


          // Find the index of the cargo entry based on SrNo
          const errorIndex = exportGateIn.findIndex(entry => entry.srNo === srNo);
          if (errorIndex !== -1) {
            const newErrors = [...validationErrors];
            newErrors[errorIndex] = { ...newErrors[errorIndex], sbNo: `Duplicate SB No: ${sbNo}` };
            setValidationErrors(newErrors);
          }
        }
        else {
          toast.error(errorMessage, {
            position: 'top-center',
            autoClose: 3000,
          });
        }

        return { success: false, cargoGateIns: null };
      }

      toast.error('Oops something went wrong!', {
        position: 'top-center',
        autoClose: 700,
      });

      return { success: false, cargoEntries: null }; // Return false if an error occurs
    } finally {
      setLoading(false);
    }
  };




  const handleReset = async () => {
    const clearedSbNos = selectedSbNos.map(() => null); // Reset each selected SB No to null
    setSelectedSbNos(clearedSbNos);

    // setSelectedSbNos([]);
    setSbNos([]);
    setSelectedGateNo({ value: 'Gate01', label: 'Gate 01' });
    setSelectedProfitCenter(null);
    setExportGateIn([initialGateIn]);
    setValidationErrors([]);

  };



  const [isModalOpenForEquipmentCommon, setIsModalOpenForEquipmentCommon] = useState(false);










  const [vendors, setVendors] = useState([]);
  const [isModalOpenForEquipment, setIsModalOpenForEquipment] = useState(false);
  const [equipmentActivityArray, setEquipmentActivityArray] = useState([]);
  const [allEquipments, setAllEquipments] = useState([]);


  const initialEquipment = {
    srNo: 1,
    companyId: companyid,
    branchId: branchId,
    finYear: '',
    profitCenterId: 'N00004',
    processId: processId,
    erpDocRefNo: '',
    docRefNo: '',
    containerNo: '',
    deStuffId: '',
    subDocRefNo: '',
    containerSize: '',
    containerType: '',
    equipment: '',
    equipmentNm: '',
    vendorId: '',
    vendorNm: '',
    createdBy: '',
    createdDate: null,
    editedBy: '',
    editedDate: null,
    approvedBy: '',
    approvedDate: null,
    status: ''
  };
  const [equipmentActivity, setEquipmentActivity] = useState(initialEquipment);


  // PAGINATION FOR SELECT EXPORTER
  const [currentPageEquipment, setCurrentPageEquipment] = useState(1);
  const [itemsPerPageEquipment] = useState(10);

  const indexOfLastItemEquipment = currentPageEquipment * itemsPerPageEquipment;
  const indexOfFirstItemEquipment = indexOfLastItemEquipment - itemsPerPageEquipment;
  const currentItemsEquipment = equipmentActivityArray.slice(indexOfFirstItemEquipment, indexOfLastItemEquipment);
  const totalPagesEquipment = Math.ceil(equipmentActivityArray.length / itemsPerPageEquipment);




  const getAllEquipMents = async (gateInId, docRefNo, erpDocRefNo, profitCenterId) => {
    try {
      // Attempt to fetch the data from the service
      const response = await CFSService.getAllEquipments(companyid, branchId, processId, profitCenterId, gateInId, erpDocRefNo, docRefNo, jwtToken);

      // // console.log('getAllEquipMents : \n', response.data);
      // Update the state with the fetched data
      setEquipmentActivityArray(response.data);

      return response.data;
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error("Error fetching equipment data:", error);
      // Optionally, set an error state or show an error message to the user
    }
  };


  const getAllEquipMentsCommon = async (gateInId, profitCenterId) => {
    try {
      // Attempt to fetch the data from the service
      const response = await CFSService.getAllEquipmentsCommon(companyid, branchId, processId, profitCenterId, gateInId, jwtToken);

      // // console.log('getAllEquipMents : \n', response.data);
      // Update the state with the fetched data
      setEquipmentActivityArray(response.data);

      return response.data;
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error("Error fetching equipment data:", error);
      // Optionally, set an error state or show an error message to the user
    }
  };



  const handleOpenEquipment = async (srNo, gateInId, docRefNo, erpDocRefNo, vehicleNo, profitCenterId) => {

    if (!gateInId) {
      toast.error('Please first save the gate in', {
        position: 'top-center',
        style: { width: '25vw' },
        autoClose: 1200,
      });
      return;
    }


    const response = await getAllEquipMents(gateInId, docRefNo, erpDocRefNo, profitCenterId);
    const getVendors = await CFSService.getEquipmentVendor(companyid, branchId, jwtToken);

    const newSrNo = (response && response.length > 0) ? response.length + 1 : 1;

    setEquipmentActivity({
      ...equipmentActivity,
      srNo: newSrNo,
      erpDocRefNo: erpDocRefNo,
      docRefNo: docRefNo,
      containerNo: vehicleNo,
      deStuffId: gateInId,
      subDocRefNo: "1"
    });

    setAllEquipments(getVendors.data.jar)
    setVendors([getVendors.data.party]);
    setIsModalOpenForEquipment(true);
  };


  const handleCloseEquipment = (val) => {
    setIsModalOpenForEquipment(false);
    setGateInSearchData([]);
    setEquipmentActivity(initialEquipment);
    setErrors([]);
    setEquipmentActivity(initialEquipment);
  }


  const clearEquipMent = () => {
    setEquipmentActivity({
      ...equipmentActivity,
      srNo: equipmentActivity.srNo + 1,
      equipment: '',
      equipmentNm: '',
      vendorId: '',
      vendorNm: '',
      createdBy: '',
      createdDate: null,
      editedBy: '',
      editedDate: null,
      approvedBy: '',
      approvedDate: null,
      status: ''
    });
    setErrors([]);
  }


  const saveEquipMent = async () => {

    const newError = {};

    if (!equipmentActivity.equipment) {
      newError.equipment = 'Please select equipment';
    }

    if (!equipmentActivity.vendorId) {
      newError.vendorId = 'Please select Vendor';
    }

    // Set the errors in state
    setErrors(newError);

    // Check if there are any errors and return if so
    if (Object.keys(newError).length > 0) {
      return; // Return early if errors exist
    }

    setLoading(true);  // Indicate loading state
    try {
      // Attempt to save the equipment using the CFSService
      const response = await CFSService.saveEquipMent(equipmentActivity, userId, jwtToken);
      await getAllEquipMents(response.data.deStuffId, response.data.docRefNo, response.data.erpDocRefNo, response.data.profitCenterId);
      toast.success("Record added successfully", {
        position: 'top-center',
        autoClose: 3000,
      });
    } catch (error) {
      if (error.response && error.response.status === 400) { // Check if error response exists
        const errorMessage = error.response.data;

        // Attempt to extract SB No and Equipment from the error message using a regular expression
        const match = errorMessage.match(/SB No: (\d+) and Equipment: ([\w\s]+)/);

        if (match) {
          const sbNo = match[1]; // SB No as a string
          const equipMentName = match[2]; // Equipment name

          // Construct the new error message with SB No and Equipment highlighted
          const errorMessageNew = `Duplicate Equipment found for SB No: <strong>${sbNo}</strong> and Equipment: <strong>${equipMentName}</strong>`;

          // Determine content width based on the length of the error message
          const contentWidth = errorMessageNew.length * 6; // Adjust multiplier as needed for better sizing

          // Display the toast with the error message
          toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessageNew }} />, {
            position: 'top-center',
            autoClose: 3000,
            style: { width: `${contentWidth}px` },
          });
        } else {
          // Fallback if the message does not match the expected pattern
          toast.error(errorMessage, {
            position: 'top-center',
            autoClose: 3000,
          });
        }
      } else {
        // Handle other error cases if needed
        console.error("An unexpected error occurred:", error);
      }
    }
    finally {
      // Ensure the loading state is reset regardless of success or failure
      setLoading(false);
    }
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


  const formatDateOnly = (value) => {
    if (!value) {
      return "";
    }

    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year} `;
  };



  const downLoadReport = async (type) => {
    setLoading(true);

    const dataTosend = {
      companyId: companyid,
      branchId: branchId,
      profitCenterId: lastEntry.profitcentreId,
      gateInId: lastEntry.gateInId,
      userId: userId,
      type: type
    }
    try {
      const response = await MovementService.downLoadHubReport(dataTosend, jwtToken);

      if (response.status === 200) {
        const pdfData = response.data;
        const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(pdfBlob);

        window.open(blobUrl, '_blank');

        toast.success("Downloading Pdf!", {
          position: 'top-center',
          autoClose: 800,
        });
      } else {
        toast.error("error downLoading file!", {
          position: 'top-center',
          autoClose: 800,
        });
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Handle the error, show an error message, etc.
    }
    finally {
      setLoading(false);
    }
  };






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
                      Gate In No
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="service"
                      maxLength={15}
                      name="igmTransId"
                      tabIndex={-1}
                      readOnly
                      value={lastEntry.gateInId}
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
                /> Search Hub Entries</h5>

              </ModalHeader>
              <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <label className="forlabel bold-label" htmlFor="sbRequestId">
                        Search by Gate In No / IGM No / Vehicle No
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
                      style={{ marginRight: 10, fontWeight: 'bold' }}
                      id="submitbtn2"
                      onClick={() => searchGateInSearch(searchGateInvalues)}
                    >
                      <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                      Search
                    </button>
                    <button
                      className="btn btn-outline-danger btn-margin newButton"
                      style={{ marginRight: 10, fontWeight: 'bold' }}
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
                        <th scope="col">IGM No</th>
                        <th scope="col">Profitcentre</th>
                        <th scope="col">Transporter Status</th>

                        <th scope="col">Transporter Name</th>
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
                      </tr>
                    </thead>
                    <tbody>

                      {currentItemsGateInSearch.map((item, index) => (
                        <>
                          <tr key={index} className='text-center'>
                            <td>
                              <input type="radio" name="radioGroup" onChange={() => selectGateInSearchRadio(item[0], item[2], item[3], item[4])} value={item[0]} />
                            </td>
                            <td>{item[0]}</td>
                            <td>{formatDate(item[1])}</td>
                            <td>{item[2]}</td>
                            <td>{item[5]}</td>
                            <td>{item[6] === 'P' ? 'Private' : item[6]}</td>
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
                <label className="forlabel" for="HazardousHazardous">Gate In Shift</label>
                <div style={{ position: 'relative' }}>
                  <Input
                    type="select"
                    name="shift"
                    className={`form-control ${validationErrors.length > 0 && validationErrors[validationErrors.length - 1]?.shift ? 'error-border' : ''}`}
                    value={lastEntry.shift}
                    onChange={handleChange}
                    disabled={lastEntry.gateInId}
                    id={lastEntry.gateInId ? 'service' : ''}
                  >
                    <option value="Day">Day</option>
                    <option value="Second">Second</option>
                    <option value="Third">Third</option>
                  </Input>

                  {errors.shift && (
                    <div className="error-messageNew">
                      {errors.shift}
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
                  Gate In Date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={lastEntry.inGateInDate}
                    // onChange={(date) => handleDateChange('inGateInDate', date)}
                    id="service"
                    name="inGateInDate"
                    placeholderText="Enter Gate In Date"
                    dateFormat="dd/MM/yyyy HH:mm" // Updated format
                    timeInputLabel="Time:"
                    showTimeInput
                    timeFormat="HH:mm" // 24-hour format for time
                    timeIntervals={15}
                    className={`form-control ${errors.inGateInDate ? 'error-border' : ''}`}
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
                  value={lastEntry.status === 'A' ? 'Approved' : lastEntry.status}
                  tabIndex={-1}
                />
              </FormGroup>
            </Col>


            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Created By
                  {/* <span className="error-message">*</span> */}
                </label>
                <input
                  className="form-control"
                  type="text"
                  readOnly
                  id="service"
                  maxLength={15}
                  name="createdBy"
                  value={lastEntry.createdBy}
                  tabIndex={-1}
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
                    className={`${validationErrors.length > 0 && validationErrors[validationErrors.length - 1]?.gateNo ? 'error-border' : ''}`}
                    isDisabled={lastEntry.gateInId}
                    id={lastEntry.gateInId ? 'service' : ''}
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
                  {errors.gateNo && (
                    <div className="error-messageNew">
                      {errors.gateNo}
                    </div>
                  )}

                </div>
              </FormGroup>
            </Col>



            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Vehicle No<span className="error-message">*</span>
                </label>
                <input
                  className={`form-control ${validationErrors.length > 0 && validationErrors[validationErrors.length - 1]?.vehicleNo ? 'error-border' : ''}`}
                  type="text"
                  maxLength={15}
                  name="vehicleNo"
                  onChange={handleChange}
                  value={lastEntry.vehicleNo}
                  disabled={lastEntry.gateInId}
                  id={lastEntry.gateInId ? 'service' : ''}
                />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Driver
                </label>
                <input
                  className="form-control"
                  type="text"
                  maxLength={50}
                  name="driverName"
                  value={lastEntry.driverName}
                  onChange={handleChange}
                  disabled={lastEntry.gateInId}
                  id={lastEntry.gateInId ? 'service' : ''}
                />
              </FormGroup>
            </Col>


            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Transporter Status
                  {/* <span className="error-message">*</span> */}
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  disabled
                  maxLength={15}
                  name="transporterStatus"
                  value={lastEntry.transporterStatus === 'P' ? 'Private' : lastEntry.transporterStatus}
                  tabIndex={-1}
                />
              </FormGroup>
            </Col>


            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Transporter Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  disabled={lastEntry.gateInId}
                  id={lastEntry.gateInId ? 'service' : ''}
                  maxLength={50}
                  name="transporterName"
                  value={lastEntry.transporterName}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>

          </Row>

          <Row className="text-center mt-1 mb-1 justify-content-center">
            <Col xs="auto" className="d-flex justify-content-center align-items-center">
              <button
                className="btn btn-outline-primary btn-margin newButton"
                style={{ marginRight: 10, fontSize: 13 }}
                id="submitbtn2"
                onClick={handleSave}
              >
                <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                Save
              </button>

              <button
                className="btn btn-outline-danger btn-margin newButton"
                style={{ marginRight: 10, fontSize: 13 }}
                id="submitbtn2"
                onClick={handleReset}
              >
                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                Clear
              </button>

              <button
                className="btn btn-outline-primary btn-margin newButton"
                style={{ marginRight: 10, fontSize: 13 }}
                id="submitbtn2"
                onClick={handleAddRow}
              >
                <FontAwesomeIcon icon={faAdd} style={{ marginRight: "5px" }} />
                Add Details
              </button>



              {lastEntry.gateInId && (
                <button
                  className="btn btn-outline-primary btn-margin newButton"
                  style={{ marginRight: 10, fontSize: 13 }}
                  id="submitbtn2"
                  onClick={(e) => downLoadReport('GateIn')}
                >
                  <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                  Report
                </button>
              )}


            </Col>
          </Row>

          <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
            <Table className="table table-bordered" style={{ border: '2px solid black' }}>
              <thead>
                <tr>
                  <th scope="col" className="text-center" style={{ color: "black", width: "100px" }}>
                    Igm No
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black", width: "100px" }}>
                    Igm Trans Id
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Cargo Description
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Cargo Type
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Cargo Weight
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    No Of Pack
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Gate In Pack
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Qty Taken In
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Wt Taken In
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Area
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Importer Name
                  </th>

                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Shipping_Line
                  </th>

                </tr>
              </thead>
              <tbody>
                {exportGateIn.map((cargoEntry, index) => (



                  <tr key={index} className="text-center">
                    <td>
                      <FormGroup>
                        <Select
                          options={sbNos}
                          value={selectedSbNos[index]}
                          onChange={(selectedOption) => handleSbNoChange(selectedOption, index, cargoEntry.srNo, selectedOption ? selectedOption.value : '', cargoEntry.gateInId, cargoEntry.status)}
                          onInputChange={(inputValue, { action }) => {
                            if (action === 'input-change') {
                              searchIgmNos(inputValue, cargoEntry.gateInId);
                            }
                          }}
                          className={`inputwidthTuka ${validationErrors[index]?.docRefNo ? 'error-border' : ''}`}
                          placeholder="Select IGM No"
                          isDisabled={cargoEntry.status}
                          id={cargoEntry.status ? 'service' : ''}
                          components={{ Option: CustomOption }}
                          isClearable
                          menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                          menuPosition="fixed" // Sets the dropdown menu position to fixed    
                          menuPlacement="top"
                          styles={{
                            control: (provided, state) => ({
                              ...provided,
                              height: 32,  // Set the height of the select input
                              minHeight: 32,
                              border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                            }),

                            valueContainer: (provided) => ({
                              ...provided,
                              // display: 'flex',
                              alignItems: 'center',  // Vertically center the text
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
                      </FormGroup>
                    </td>

                    <td>
                      <FormGroup>
                        <Input
                          type="text"
                          value={cargoEntry.erpDocRefNo}
                          className={`inputwidthTuka form-control`}
                          readOnly
                          id="service"
                          tabIndex={-1}
                        />
                      </FormGroup>
                    </td>



                    <td>
                      <FormGroup>
                        <Input
                          type="text"
                          value={cargoEntry.commodityDescription}
                          className={`inputwidthTuka form-control`}
                          readOnly
                          id="service"
                          tabIndex={-1}
                        />
                      </FormGroup>
                    </td>

                    <td>
                      <FormGroup>
                        <Input
                          type="text"
                          value={cargoEntry.cargoType}
                          className={`inputwidthTuka form-control`}
                          readOnly
                          id="service"
                          tabIndex={-1}
                        />
                      </FormGroup>
                    </td>

                    <td>
                      <FormGroup>
                        <Input
                          type="text"
                          value={cargoEntry.cargoWeight}
                          className={`inputwidthTuka form-control`}
                          readOnly
                          id="service"
                          tabIndex={-1}
                        />
                      </FormGroup>
                    </td>



                    <td>
                      <FormGroup>
                        <Input
                          type="text"
                          value={cargoEntry.actualNoOfPackages}
                          className={`inputwidthTuka form-control`}
                          readOnly
                          id="service"
                          tabIndex={-1}
                        />
                      </FormGroup>
                    </td>

                    <td>
                      <FormGroup>
                        <Input
                          type="text"
                          value={cargoEntry.gateInPackages}
                          className={`inputwidthTuka form-control`}
                          readOnly
                          id="service"
                          tabIndex={-1}
                        />
                      </FormGroup>
                    </td>

                    <td>

                      <FormGroup>
                        <Input
                          type="text"
                          name='qtyTakenIn'
                          value={cargoEntry.qtyTakenIn}
                          className={`inputwidthTuka form-control ${validationErrors[index]?.qtyTakenIn ? 'error-border' : ''}`}
                          maxLength={8}
                          onChange={(e) => handleFieldChange(e, index, 'qtyTakenIn', 'number')}
                          onBlur={() => checkMaxQuantity(index)}
                        />
                      </FormGroup>
                    </td>



                    <td>
                      <FormGroup>
                        <Input
                          type="text"
                          name='noOfPackages'
                          value={cargoEntry.weightTakenIn}
                          className={`inputwidthTuka form-control ${validationErrors[index]?.weightTakenIn ? 'error-border' : ''}`}
                          maxLength={15}
                          onChange={(e) => handleFieldChange(e, index, 'weightTakenIn', 'decimal', 12, 2)}
                          onBlur={() => checkMaxWeight(index)}
                        />
                      </FormGroup>
                    </td>




                    <td>
                      <FormGroup>
                        <Input
                          type="text"
                          value={cargoEntry.area}
                          className={`inputwidthTuka form-control`}
                          readOnly
                          id="service"
                          tabIndex={-1}
                        />
                      </FormGroup>
                    </td>

                    <td>
                      <FormGroup>
                        <Input
                          type="text"
                          value={cargoEntry.importerName}
                          className={`inputwidthTuka form-control`}
                          readOnly
                          id="service"
                          tabIndex={-1}
                        />
                      </FormGroup>
                    </td>


                    <td>
                      <FormGroup>
                        <Input
                          type="text"
                          value={cargoEntry.shippingLineName}
                          className={`inputwidthTuka form-control`}
                          readOnly
                          id="service"
                          tabIndex={-1}
                        />
                      </FormGroup>
                    </td>





                  </tr>
                ))}
              </tbody>
            </Table>


          </div>

        </div>

      </div>
    </>
  );
}

export default GateInHub;
