import AuthContext from "../Components/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
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
  faPlaneDeparture,
  faCalculator,
  faTired,
  faWheatAwnCircleExclamation,
  faHandshake,
  faTimesCircle,
  faPrint
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/style.css";
import "../Components/Style.css";
import { Button } from "react-bootstrap";
import useAxios from "../Components/useAxios";
import cfsService from "../service/CFSService";
import movementService from "../service/MovementService";
import { toast } from "react-toastify";
import moment from "moment";
import ipaddress from "../Components/IpAddress";

function BufferFDSOnWheelContainerCLP({ searchData, resetFlag, updatePagesList }) {
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

  const processId = 'P00236';

  const foundRights =
    role !== "ROLE_ADMIN"
      ? userRights.find((item) => item.process_Id === processId)
      : null;
  const allowCreate = foundRights?.allow_Create === "Y";
  const allowRead = foundRights?.allow_Read === "Y";
  const allowEdit = foundRights?.allow_Update === "Y";
  const allowDelete = foundRights?.allow_Delete === "Y";





  useEffect(() => {
    if (searchData && searchData.activeTab === processId && searchData.profitCenterId && searchData.bufferStuffTallyId && searchData.containerNo) {

      getSelectedGateInSearch(searchData.bufferStuffTallyId, "1", searchData.profitCenterId, searchData.containerNo);
    }
  }, [searchData]);
  useEffect(() => {

    if (resetFlag) {
      handleReset();
    }
  }, [resetFlag]);











  const axiosInstance = useAxios();
  const CFSService = new cfsService(axiosInstance);
  const MovementService = new movementService(axiosInstance);

  const [profitcentre, setProfitcentre] = useState({
    profitcentreId: '',
    profitcentreDesc: ''
  });


  const [totals, setTotals] = useState({
    packages: 0,
    cargoWeight: 0
  });

  const initialExportStuffTally = {
    companyId: companyid,           // replace with actual company ID variable or string
    branchId: branchId,             // replace with actual branch ID variable or string
    stuffTallyId: '',               // unique identifier for stuff tally
    sbTransId: '',                  // unique identifier for SB transaction
    stuffTallyLineId: 0,            // line ID for stuff tally
    profitcentreId: profitcentre.profitcentreId,             // profit center ID
    cartingTransId: '',             // unique identifier for carting transaction
    sbLineId: '',                   // line ID for SB
    cartingLineId: '',              // line ID for carting
    sbNo: '',                       // SB number
    movementReqId: '',              // movement request ID
    movementType: '',               // type of movement
    stuffTallyDate: new Date(),     // date of stuff tally
    stuffId: '',                    // ID for stuff item
    stuffDate: null,          // date of stuff
    sbDate: null,             // SB date
    shift: '',                      // shift information
    agentSealNo: '',                // agent seal number
    vesselId: '',                   // vessel ID for shipment
    voyageNo: '',                   // voyage number
    rotationNo: '',                 // rotation number
    rotationDate: null,       // rotation date
    pol: '',                        // port of loading
    terminal: '',                // terminal location
    pod: '',                     // port of discharge
    finalPod: '',                // final port of discharge
    containerNo: '',             // container number
    containerStatus: '',         // container status
    asrContainerStatus: '',      // ASR container status
    currentLocation: '',         // current location of the container
    periodFrom: null,      // period start date
    gateInId: '',                // gate in identifier
    containerSize: '',           // size of the container
    containerType: '',           // type of the container
    containerCondition: '',      // condition of the container
    crgYardLocation: '',         // cargo yard location
    crgYardBlock: '',            // cargo yard block
    crgBlockCellNo: '',          // cargo block cell number
    yardLocation: '',            // yard location
    yardBlock: '',               // yard block
    blockCellNo: '',             // yard block cell number
    yardLocation1: '',           // alternate yard location
    yardBlock1: '',              // alternate yard block
    blockCellNo1: '',            // alternate yard block cell number
    yardPackages: 0,          // number of packages in the yard
    cellAreaAllocated: 0,     // allocated cell area
    onAccountOf: '',             // account information
    cha: '',                     // CHA information
    stuffRequestQty: 0,       // requested quantity for stuffing
    stuffedQty: 0,            // quantity that has been stuffed
    prvStuffedQty: 0,         // previously stuffed quantity
    balanceQty: 0,            // balance quantity remaining
    cargoWeight: 0,           // weight of the cargo
    totalCargoWeight: 0,      // total cargo weight
    totalGrossWeight: 0,      // total gross weight
    grossWeight: 0,           // gross weight
    weighmentFlag: '',            // weighment flag (Y/N)
    weighmentDone: '',            // weighment done flag (Y/N)
    weighmentDate: 0,    // weighment date
    weighmentWeight: 0,        // weight after weighment
    weighmentPassNo: '',          // weighment pass number
    tareWeight: 0,             // tare weight of the container
    areaReleased: 0,           // area released
    genSetRequired: '',           // generator set required (Y/N)
    haz: '',                      // hazardous material flag (Y/N)
    imoCode: '',                  // IMO code
    containerInvoiceType: '',     // container invoice type
    item: '',                     // item number
    shippingAgent: '',            // shipping agent
    shippingLine: '',             // shipping line
    commodity: '',                // commodity description
    customsSealNo: '',            // customs seal number
    viaNo: '',                    // VIA number
    cartingDate: null,      // carting date
    icdHub: '',                   // ICD hub location
    exporterName: '',             // name of exporter
    consignee: '',                // consignee name
    fob: 0,                    // FOB value
    coverDetails: '',             // cover details
    coverDate: null,        // cover date
    holdingAgent: '',             // holding agent flag (Y/N)
    holdingAgentName: '',         // holding agent name
    holdDate: null,         // hold date
    releaseDate: null,      // release date
    holdRemarks: '',              // hold remarks
    clpStatus: '',                // CLP status (Y/N)
    clpCreatedBy: '',             // CLP created by (user ID)
    clpCreatedDate: null,           // Date when CLP was created
    clpApprovedBy: '',              // Who approved CLP
    clpApprovedDate: null,          // Date when CLP was approved
    gatePassNo: '',                 // Gate pass number
    gateOutId: '',                  // Gate out ID
    gateOutDate: null,              // Gate out date
    berthingDate: null,             // Berthing date
    gateOpenDate: null,             // Gate open date
    sealType: '',                   // Type of seal
    sealDev: '',                    // Seal device
    docType: '',                    // Document type
    docNo: '',                      // Document number
    status: '',                     // Status of the tally
    createdBy: '',                  // Who created the entry
    createdDate: null,              // Date when entry was created
    editedBy: '',                   // Who edited the entry
    editedDate: null,               // Date when the entry was edited
    approvedBy: '',                 // Who approved the entry
    approvedDate: null,             // Date when the entry was approved
    clpConfirmStatus: '',           // Confirmation status for CLP
    clpConfirmBy: '',               // Who confirmed the CLP
    clpConfirmDate: null,           // Date when CLP was confirmed
    clpPcsStatus: '',               // Status of CLP PCS
    clpPcsMsgCreStatus: '',         // Status of PCS message creation
    clpPcsMsgCreDate: null,         // Date when PCS message was created
    clpPcsMsgAmdCreDate: null,      // Date when PCS message was amended
    documentNumber: 0,              // Document number as BigDecimal
    commonReferenceNumber: 0,       // Common reference number as BigDecimal
    amdDocumentNumber: 0,           // Amendment document number as BigDecimal
    amdCommonReferenceNumber: 0,    // Amendment common reference number as BigDecimal
    sfJobNo: '',                    // SF job number
    sfJobDate: null,                // SF job date
    asrJobNo: '',                   // ASR job number
    asrJobDate: null,               // ASR job date
    cimNo: '',                      // CIM number
    cimDate: null,                  // CIM date
    bondNo: '',                     // Bond number
    dpJobNo: '',                    // DP job number
    dpJobDate: null,                // DP job date
    dtJobNo: '',                    // DT job number
    dtJobDate: null,                // DT job date
    fromPkg: 0,                     // From package number
    toPkg: 0,                       // To package number
    isSfAck: '',                    // SF acknowledgment status
    ackSfStatus: '',                // Acknowledgment SF status
    isAsrAck: '',                   // ASR acknowledgment status
    ackAsrStatus: '',               // Acknowledgment ASR status
    isDpAck: '',                    // DP acknowledgment status
    ackDpStatus: '',                // Acknowledgment DP status
    isDtAck: '',                    // DT acknowledgment status
    ackDtStatus: '',                // Acknowledgment DT status
    isSfCancelStatus: '',           // SF cancel status
    sfCancelCreatedDate: null,      // Date of SF cancel creation
    sfCancelAckDate: null,          // Date of SF cancel acknowledgment
    isSfCancelDesc: '',             // SF cancel description
    othPartyId: '',                 // Other party ID
    invoiceAssesed: '',             // Invoice assessed status
    assesmentId: '',                // Assessment ID
    invoiceNo: '',                  // Invoice number
    invoiceDate: null,              // Invoice date
    creditType: '',                 // Credit type
    invoiceCategory: '',            // Invoice category
    billAmt: 0,                     // Bill amount as BigDecimal
    invoiceAmt: 0,                  // Invoice amount as BigDecimal
    backToTownRemark: '',           // Remark for back to town
    stuffTallyFlag: '',             // Flag for stuff tally
    stuffTallyWoTransId: '',        // Stuff tally WO transaction ID
    stuffTallyCutWoTransDate: null, // Date of stuff tally cut WO transaction
    ssrTransId: '',                 // SSR transaction ID
    nopGrossWeight: 0,              // Gross weight for NOP
    deliveryOrderNo: '',            // Delivery order number
    reworkFlag: '',                 // Flag for rework
    reworkId: '',                   // Rework ID
    reworkDate: null,               // Rework date
    payLoad: 0,                     // Payload value
    stuffMode: '',                  // Stuffing mode
    formThirteenEntryFlag: '',      // Flag for Form 13 entry
    formThirteenEntryRemarks: '',   // Form 13 entry remarks
    formThirteenEntryDate: null,    // Date for Form 13 entry
    formThirteenEntryUser: '',      // User for Form 13 entry
    calGrossWt: 0,                  // Calculated gross weight
    stuffLineId: 0,                 // Stuff line ID
    eqActivityFlag: '',             // Equipment activity flag
    typeOfPackage: '',              // Type of package
    vesselName: '',                 // Vessel name (Transient)
    chaName: '',                    // CHA name (Transient)
    sbPackages: 0,                  // SB packages (Transient)
    stuffedQuantity: 0,             // Stuffed quantity (Transient)
    sbWt: 0,                        // SB weight (Transient)
    gateInDate: null,               // Gate in date (Transient)
    cargoType: '',                  // Cargo type (Transient)
    contStuffPackages: 0,           // Contained stuffed packages (Transient)
    balQty: 0                       // Balance quantity (Transient)
  };



  const [exportStuffTally, setExportStuffTally] = useState([initialExportStuffTally]);
  const [containerHealthData, setContainerHealthData] = useState([]);
  const [selectedViaNo, setSelectedViaNo] = useState(null);
  const [selectedVoyageNo, setSelectedVoyageNo] = useState(null);
  const [vesselData, setVesselData] = useState([]);
  const [preExportStuffTally, setPreExportStuffTally] = useState([]);




  useEffect(() => {
    const totalStuffPackages = exportStuffTally.reduce((acc, item) => acc + (Number(item.stuffedQty) || 0), 0);
    const totalStuffWeight = exportStuffTally.reduce((acc, item) => acc + (Number(item.cargoWeight) || 0), 0);
    const roundedTotalStuffWeight = parseFloat(totalStuffWeight.toFixed(4)); // Round to 4 decimal places

    setTotals({
      packages: totalStuffPackages,
      cargoWeight: roundedTotalStuffWeight
    });
  }, [exportStuffTally]);



  const lastEntryWithId = exportStuffTally.slice().reverse().find(entry => entry.stuffTallyId && entry.stuffTallyId.trim().length > 0);

  const lastEntry = lastEntryWithId || exportStuffTally[exportStuffTally.length - 1];


  const [validationErrors, setValidationErrors] = useState([]);
  const [selectedSbNos, setSelectedSbNos] = useState([]);
  const [sbNos, setSbNos] = useState([]);


  const [isModalOpenForGateInSearch, setIsModalOpenForGateInSearch] = useState(false);

  const [searchGateInvalues, setSearchGateInvalues] = useState('');
  const [gateInSearchData, setGateInSearchData] = useState([]);

  const [containerData, setContainerData] = useState([]);
  const [selectedContainerNo, setSelectedContainerNo] = useState(null);


  const getSelectedGateInSearch = async (stuffId, StuffLineId, profitCenter, ContainerNo) => {
    setValidationErrors([]);
    setLoading(true);
    try {
      const response = await MovementService.getSelectedBufferStuffingEntry(companyid, branchId, stuffId, profitCenter, ContainerNo, jwtToken);
      if (Array.isArray(response.data)) {
        const initialSelectedSbNos = response.data.map(entry => ({
          label: entry.sbNo,
          value: entry.sbNo,
        }));
        // Set the transformed data into the state
        setSelectedSbNos(initialSelectedSbNos);


        updateSelectTags(response.data[0]);
      }
      // updateSelectTags(response.data);
      setPreExportStuffTally(response.data);
      setExportStuffTally(response.data);
    } catch (error) {
      console.error("Error fetching Tally entries:", error);
      // Optionally handle the error further, e.g., show a notification to the user
    } finally {
      setLoading(false);
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

  const getjarByJarId = async (jarId) => {
    try {
      const response = await CFSService.getJarDetailSelect(companyid, jarId, jwtToken);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching port data:', error);
      return [];
    }
  };



  const selectGateInSearchRadio = async (stuffId, StuffLineId, profitCenter, ContainerNo) => {
    await getSelectedGateInSearch(stuffId, StuffLineId, profitCenter, ContainerNo);
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
    return `${day}/${month}/${year}`;
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
      const response = await MovementService.getBufferStuffingToSelect(companyid, branchId, searchvalue, jwtToken);
      setGateInSearchData(response.data);
    } catch (error) {
      console.error("Error fetching GateIn entries:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchVoyageAndVia = async (searchValue) => {
    if (!searchValue) {
      setVesselData([]);
      return;
    }
    try {
      const response = await CFSService.searchVessel(companyid, branchId, searchValue, jwtToken);
      setVesselData(response.data);
    } catch (error) {
      setVesselData([]);
      console.error('Error searching vessel:', error);
    }
  };




  const searchPortData = async (searchValue, fieldName) => {
    if (!searchValue) {
      setPodData([]);
      setTerminalData([]);
      setPolData([]);
      return;
    }
    try {
      const response = await MovementService.searchPortsData(companyid, branchId, searchValue, jwtToken);

      if (fieldName === 'finalPod') {
        setPodData(response.data);
      } else if (fieldName === 'terminal') {
        setTerminalData(response.data)
      } else {
        setPolData(response.data)
      }
      // console.log('port Data: ', response.data);
    } catch (error) {
      setPodData([]);
      setTerminalData([])
      console.error('Error searching vessel:', error);
    }
  };







  useEffect(() => {
    const fetchData = async () => {
      // await getGateNos('J00015');
      // await getIsoContainerList();
      await getContainerHealth('J00001');
      await getProgitCenterById('N00004');
      // await getCommodity('J00006');
    };
    fetchData();
  }, []);


  const getProgitCenterById = async (profitCenterId) => {
    try {
      const response = await CFSService.getProgitCenterById(companyid, branchId, profitCenterId, jwtToken);
      setProfitcentre(response.data);
      setExportStuffTally(prevState =>
        prevState.map(item => ({
          ...item,
          profitcentreId: response.data.profitcentreId
        }))
      );
    } catch (error) {
      console.error('Error fetching port data:', error);
    }
  };


  const updateSelectTags = async (exportGateIn) => {
    const initialSA = { value: exportGateIn.containerNo, label: exportGateIn.containerNo }; setSelectedContainerNo(initialSA);
    const initialTerminal = { value: exportGateIn.terminal, label: exportGateIn.terminalName }; setSelectedTerminal(initialTerminal);
    const initialPod = { value: exportGateIn.finalPod, label: exportGateIn.finalPodName }; setSelectedPod(initialPod);
    const initialPol = { value: exportGateIn.pol, label: exportGateIn.pol }; setSelectedPol(initialPol);
    const initialVia = { value: exportGateIn.viaNo, label: exportGateIn.viaNo }; setSelectedViaNo(initialVia);
    const initialVoyage = { value: exportGateIn.voyageNo, label: exportGateIn.voyageNo }; setSelectedVoyageNo(initialVoyage);
  }

  // console.log('exportStuffTally : ', exportStuffTally);

  const handlePaymentDateChangeHeader = async (date, fieldName) => {
    // console.log('date ', date, 'fieldName ', fieldName);

    setExportStuffTally(prevRequest =>
      prevRequest.map(item => ({
        ...item,
        [fieldName]: date
      }))
    );

    // Update validationErrors state
    setValidationErrors(prevErrors =>
      prevErrors.map(error => {
        const updatedError = { ...error }; // Copy the error object
        delete updatedError[fieldName]; // Remove the specific field error
        return updatedError; // Return the updated error object
      })
    );


  };



  const handleContainerNoSelect = async (selectedOption) => {
    // Update selected values
    setSelectedContainerNo(selectedOption ? { value: selectedOption.containerNo, label: selectedOption.containerNo } : null);

    if (selectedOption) {
      const updates =
      {
        containerNo: selectedOption.containerNo,
        containerSize: selectedOption.containerSize,
        containerType: selectedOption.containerType,
        shippingAgent: selectedOption.shippingAgent,
        shippingAgentName: selectedOption.shippingAgentName,
        shippingLine: selectedOption.shippingLine,
        shippingLineName: selectedOption.shippingLineName,
        onAccountOf: selectedOption.onAccountOf,
        tareWeight: selectedOption.tareWeight,
        inGateInDate: selectedOption.inGateInDate,
        deliveryOrderNo: selectedOption.deliveryOrderNo,
        gateInId: selectedOption.gateInId,
        movementType: selectedOption.gateInType,
        containerCondition: selectedOption.containerCondition,
        customsSealNo: selectedOption.customsSealNo
      }
      // Update exportStuffRequest state
      setExportStuffTally(exportStuffTally.map(item => ({ ...item, ...updates })));
    }
    else {
      handleReset();
    }

    // Update validationErrors state
    setValidationErrors(prevErrors =>
      prevErrors.map(error => {
        const updatedError = { ...error };
        // Remove specific field errors
        delete updatedError.containerNo;
        return updatedError; // Return the updated error object
      })
    );
  };

  const handleHeaderChange = (fieldName, value, type, maxIntegerDigits, maxDecimalDigits) => {

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


    // Update exportStuffRequest state
    setExportStuffTally(prevRequest =>
      prevRequest.map(item => ({
        ...item,
        [fieldName]: value
      }))
    );


    // Update validationErrors state
    setValidationErrors(prevErrors =>
      prevErrors.map(error => {
        const updatedError = { ...error }; // Copy the error object
        delete updatedError[fieldName]; // Remove the specific field error
        return updatedError; // Return the updated error object
      })
    );
  };


  const handleVoyageSelect = async (selectedOption, fieldName) => {
    // Update selected values
    setSelectedViaNo(selectedOption ? { value: selectedOption.viaNo, label: selectedOption.viaNo } : null);
    setSelectedVoyageNo(selectedOption ? { value: selectedOption.voyageNo, label: selectedOption.voyageNo } : null);

    // Prepare updates based on selected option
    const updates = selectedOption
      ? {
        vesselId: selectedOption.value,
        voyageNo: selectedOption.voyageNo,
        viaNo: selectedOption.viaNo,
        vesselName: selectedOption.vesselName,
        rotationDate: selectedOption.rotationDate ? selectedOption.rotationDate : null,
        gateOpenDate: selectedOption.gateOpenDate ? new Date(selectedOption.gateOpenDate) : null,
        berthingDate: selectedOption.berthDate ? new Date(selectedOption.berthDate) : null,
        rotationNo: selectedOption.rotationNo,
      }
      : { vesselId: '', voyageNo: '', viaNo: '', vesselName: '', rotationDate: null, gateOpenDate: null, berthingDate: null, rotationNo: '' };

    // Update exportStuffRequest state
    setExportStuffTally(exportStuffTally.map(item => ({ ...item, ...updates })));

    // Update validationErrors state
    setValidationErrors(prevErrors =>
      prevErrors.map(error => {
        const updatedError = { ...error }; // Copy the error object

        // Remove specific field errors
        delete updatedError.voyageNo;
        delete updatedError.viaNo;
        delete updatedError.vesselName;

        return updatedError; // Return the updated error object
      })
    );
  };






  const handleCreationSelect = async (inputValue, fieldName) => {
    const updates = { [fieldName]: inputValue }; // Dynamically set the field name

    if (fieldName === 'viaNo') {
      setSelectedViaNo({ value: inputValue, label: inputValue });
    } else {
      setSelectedVoyageNo({ value: inputValue, label: inputValue });
    }
    // Update exportStuffRequest
    setExportStuffTally(exportStuffTally.map(item => ({ ...item, ...updates })));

    // Update validationErrors state
    setValidationErrors(prevErrors =>
      prevErrors.map(error => {
        const updatedError = { ...error };
        delete updatedError[fieldName];
        return updatedError;
      })
    );
  };


  // ContainerWise Stuffing request
  const handleContainerNoSearch = async (searchValue) => {
    if (!searchValue) {
      setContainerData([]);
      return;
    }
    try {
      const response = await MovementService.searchContainerNoForStufingTallyBuffer(companyid, branchId, searchValue, profitcentre.profitcentreId, jwtToken);
      // console.log('ContainerData ', response.data);
      setContainerData(response.data);
    } catch (error) {
      setContainerData([]);
      console.error('Error searching ContainerData:', error);
    }
  };



  const validateExportStuffTally = (exportStuffRequest) => {
    let errors = [];

    exportStuffRequest.forEach((detail, index) => {
      const { sbNo, stuffedQty, cargoWeight, vesselName, viaNo, voyageNo, containerNo, pol, terminal, finalPod, tareWeight, agentSealNo, customsSealNo } = detail;
      let error = {};
      // console.log('vesselName ', vesselName);

      if (!vesselName) { error.vesselName = 'VesselName is required'; }
      if (!viaNo) error.viaNo = 'ViaNo is required.';
      if (!voyageNo) error.voyageNo = 'VoyageNo is required.';


      if (!sbNo) { error.sbNo = 'SbNo is required'; }
      if (!containerNo) error.containerNo = 'ContainerNo is required.';
      if (!pol) error.pol = 'Pol is required.';

      if (!terminal) { error.terminal = 'Terminal is required'; }
      if (!finalPod) error.finalPod = 'FinalPod is required.';
      if (!agentSealNo) error.agentSealNo = 'AgentSealNo is required.';
      if (!customsSealNo) error.customsSealNo = 'CustomsSealNo is required.';




      if (!tareWeight || tareWeight <= 0) {
        error.tareWeight = 'TareWeight is required and should be greater than 0.';
      }

      if (!cargoWeight || cargoWeight <= 0) {
        error.cargoWeight = 'Cargo weight is required and should be greater than 0.';
      }

      if (!stuffedQty || stuffedQty <= 0) {
        error.stuffedQty = 'Number of packages stuffed is required and should be greater than 0.';
      }
      const isValidPackage = checkMaxQuantityContainer(index);
      const isValidWeight = checkMaxWeightContainer(index);
      if (isValidPackage) {
        error.stuffedQty = 'Number of packages stuffed is required and should be greater than 0.';
      }
      if (isValidWeight) {
        error.cargoWeight = 'CargoWeight is required and should be greater than 0.';
      }


      errors.push(error);
    });
    setValidationErrors(errors);
    // Check if there are any errors
    return errors.every(error => Object.keys(error).length === 0);
  };





  // lololol
  const handleSave = async (exportStuffRequest) => {

    if (!Array.isArray(exportStuffRequest) || exportStuffRequest.length === 0) {
      toast.warning('please select container!', {
        position: 'top-center',
        autoClose: 700,
      });
      return;
    }

    if (!validateExportStuffTally(exportStuffRequest)) {
      toast.warning('Please enter required fields!', {
        position: 'top-center',
        autoClose: 1000,
        // style: { width: '29vw' },
      });
      return false;
    }

    setLoading(true);
    try {
      const response = await MovementService.saveExportTallyBuffer(companyid, branchId, userId, exportStuffRequest, jwtToken);


      if (Array.isArray(response.data)) {
        const initialSelectedSbNos = response.data.map(entry => ({
          label: entry.sbNo,
          value: entry.sbNo,
        }));

        if (searchData && (searchData.sbNo || searchData.container)
        ) {
          updatePagesList("P00236");
        }
  

        // Set the transformed data into the state
        setSelectedSbNos(initialSelectedSbNos);

        updateSelectTags(response.data[0]);
      }

      setExportStuffTally(response.data);
      setPreExportStuffTally(response.data);
      toast.success('Data added Successfully!', {
        position: 'top-center',
        autoClose: 700,
      });

      return { success: true, cargoGateIns: response.data };
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data;

        // Check for structured error response
        if (typeof errorMessage === 'object' && errorMessage.details) {
          const { field, details } = errorMessage;

          if (field === 'containerNo') {
            // Handle Duplicate Container No
            const { containerNo } = details;

            const errorMessageNew = `Duplicate Container No: <strong>${containerNo}</strong>`;

            const contentWidth = errorMessageNew.length * 6;
            toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessageNew }} />, {
              position: 'top-center',
              autoClose: 3000,
              style: { width: `${contentWidth}px` },
            });

            const errorIndex = exportStuffTally.findIndex(entry => entry.containerNo === containerNo);
            if (errorIndex !== -1) {
              const newErrors = [...validationErrors];
              newErrors[errorIndex] = { ...newErrors[errorIndex], containerNo: `Duplicate Container No: ${containerNo}` };
              setValidationErrors(newErrors);
            }
          } else if (field === 'sbNo') {
            // Handle Duplicate SB No
            const { sbNo, srNo } = details;

            const errorMessageNew = `Duplicate SB No found for SrNo: <strong>${srNo}</strong> and SB No: <strong>${sbNo}</strong>`;
            const contentWidth = errorMessageNew.length * 6;
            toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessageNew }} />, {
              position: 'top-center',
              autoClose: 3000,
              style: { width: `${contentWidth}px` },
            });

            const errorIndex = exportStuffTally.findIndex(entry => entry.stuffReqLineId === srNo);
            if (errorIndex !== -1) {
              const newErrors = [...validationErrors];
              newErrors[errorIndex] = { ...newErrors[errorIndex], sbNo: `Duplicate SB No: ${sbNo}` };
              setValidationErrors(newErrors);
            }
          }

          return { success: false, cargoEntries: null };
        }

        // Generic error handling for unstructured or other errors
        toast.error(errorMessage.message || errorMessage, {
          position: 'top-center',
          autoClose: 3000,
        });

        return { success: false, cargoEntries: null };
      }

      // Fallback for other server errors
      toast.error('Oops something went wrong!', {
        position: 'top-center',
        autoClose: 700,
      });
      return { success: false, cargoGateIns: null };
    } finally {
      setLoading(false);
    }
  };


  const handleReset = async () => {
    setValidationErrors([]);
    setExportStuffTally([initialExportStuffTally]);
    setSelectedContainerNo(null);
    const clearedSbNos = selectedSbNos.map(() => null);
    setSelectedSbNos(clearedSbNos);
    setSelectedTerminal(null);
    setSelectedPod(null);
    setSelectedPol(null);
    setSelectedViaNo(null);
    setSelectedVoyageNo(null);
    setTotals({});
  };


  const [terminalData, setTerminalData] = useState([]);
  const [podData, setPodData] = useState([]);
  const [selectedTerminal, setSelectedTerminal] = useState(null);
  const [selectedPod, setSelectedPod] = useState(null);
  const [polData, setPolData] = useState([]);
  const [selectedPol, setSelectedPol] = useState(null);

  const handlePODChange = async (selectedOption, fieldName) => {

    if (fieldName === 'finalPod') {
      setSelectedPod(selectedOption);
    } else if (fieldName === 'terminal') {
      setSelectedTerminal(selectedOption);
    } else {
      setSelectedPol(selectedOption);
    }
    // Update selected values
    // fieldName === 'finalPod' ? setSelectedPod(selectedOption) : setSelectedTerminal(selectedOption);

    setExportStuffTally(prevRequest =>
      prevRequest.map(item => ({
        ...item,
        [fieldName]: selectedOption ? selectedOption.value : ''
      }))
    );

    // Update validationErrors state
    setValidationErrors(prevErrors =>
      prevErrors.map(error => {
        const updatedError = { ...error }; // Copy the error object
        delete updatedError[fieldName]; // Remove the specific field error
        return updatedError; // Return the updated error object
      })
    );
  };


  const handleCreationPODSelect = async (inputValue, fieldName) => {
    const updates = { [fieldName]: inputValue }; // Dynamically set the field name

    if (fieldName === 'finalPod') {
      setSelectedPod({ value: inputValue, label: inputValue });
    } else if (fieldName === 'terminal') {
      setSelectedTerminal({ value: inputValue, label: inputValue });
    } else {
      setSelectedPol({ value: inputValue, label: inputValue });
    }
    // Update exportStuffRequest
    setExportStuffTally(exportStuffTally.map(item => ({ ...item, ...updates })));

    // Update validationErrors state
    setValidationErrors(prevErrors =>
      prevErrors.map(error => {
        const updatedError = { ...error };
        delete updatedError[fieldName];
        return updatedError;
      })
    );
  };




  const CustomInput = React.forwardRef(({ value, onClick, onKeyDown, className, id }, ref) => (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <input
        ref={ref}
        value={value}
        onClick={onClick}
        readOnly
        className={className} // Apply the passed className here
        id={id}
        style={{ width: '100%' }} // Adjust as needed
      />
      <FontAwesomeIcon
        icon={faCalendarAlt}
        style={{
          position: 'absolute',
          right: '10px',
          color: '#6c757d',
        }}
      />
    </div>
  ));










  const handleSbNoChange = (selectedOption, index) => {
    // Update selectedSbNos
    const updatedSbNos = [...selectedSbNos];
    updatedSbNos[index] = selectedOption; // Set the selected option for the specific index
    setSelectedSbNos(updatedSbNos); // Update the state

    setExportStuffTally((prevContainer) => {
      const newContainer = [...prevContainer];

      // Clear validation errors for this index
      const updatedValidationErrors = [...validationErrors];
      updatedValidationErrors[index] = {}; // Clear errors for the current index
      setValidationErrors(updatedValidationErrors);

      if (!selectedOption) {
        // If selectedOption is null, clear all values at the index
        newContainer[index] = {
          ...newContainer[index],
          sbNo: '',
          sbLineId: '',
          sbTransId: '',
          exporterId: '',
          exporterName: '',
          sbDate: null,
          commodity: '',
          sbPackages: 0,
          pod: '',
          grossWeight: 0,
          prvStuffedQty: 0,
          stuffedQty: 0,
          totalCargoWeight: 0,
          cargoWeight: 0,
          sbWt: 0,
          totalGrossWeight: 0,
          cha: ''
        };

      } else {
        // Extract values from the selected option
        const {
          sbNo,
          sbLineNo,
          sbTransId,
          exporterId,
          exporterName,
          sbDate,
          prvStuffedQty,
          commodity,
          noOfPackages,
          pod,
          grossWeight,
          stuffedWt,
          cha
        } = selectedOption;

        // Update the specific index with the new values
        newContainer[index] = {
          ...newContainer[index],
          sbNo: sbNo,
          sbLineId: sbLineNo,
          sbTransId: sbTransId,
          exporterId: exporterId,
          exporterName: exporterName,
          sbDate: new Date(sbDate),
          prvStuffedQty: prvStuffedQty,
          commodity: commodity,
          sbPackages: noOfPackages,
          pod: pod,
          grossWeight: grossWeight,
          cargoWeight: 0,
          stuffedQty: 0,
          sbWt: stuffedWt,
          totalGrossWeight: grossWeight,
          totalCargoWeight: grossWeight,
          cha: cha
        };
      }

      return newContainer; // Return the updated container
    });

    // Optionally, clear sbNos if needed
    setSbNos([]); // Clear the sbNos if that is intended
  };




  const handleRemoveRow = (index) => {
    if (exportStuffTally.length > 1) {
      setExportStuffTally(exportStuffTally.filter((_, i) => i !== index));
    }
  };






  const handleFieldChangeContainer = (e, index, fieldName, type, maxIntegerDigits, maxDecimalDigits) => {
    let { value } = e.target;

    // Allow digits and decimal points or only digits based on type
    if (type === 'decimal') {
      value = value.replace(/[^0-9.]/g, '');
      const parts = value.split('.');
      if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
      }
      if (parts[0].length > maxIntegerDigits) {
        parts[0] = parts[0].slice(0, maxIntegerDigits);
      }
      if (parts[1]) {
        parts[1] = parts[1].slice(0, maxDecimalDigits);
      }
      value = parts.join('.');
    } else if (type === 'number') {
      value = value.replace(/[^0-9]/g, '');
    }

    setValidationErrors(prevErrors => {
      const updatedErrors = [...prevErrors];
      if (updatedErrors[index]) {
        delete updatedErrors[index][fieldName];
      }
      return updatedErrors;
    });

    // Update the state without validation
    setExportStuffTally(prevState => {
      const updatedTransDtl = [...prevState];
      updatedTransDtl[index] = {
        ...updatedTransDtl[index],
        [fieldName]: value,
      };

      // Calculate average cargo weight if fieldName is noOfPackagesStuffed
      if (fieldName === 'stuffedQty') {

        const currentEntry = updatedTransDtl[index];

        const noOfPackages = parseInt(currentEntry.sbPackages || 0);
        const totalCargoWeight = parseFloat(currentEntry.grossWeight || 0);

        // console.log('noOfPackages ', noOfPackages, ' totalCargoWeight ', totalCargoWeight);

        if (noOfPackages > 0) {
          const weightPerPackage = totalCargoWeight / noOfPackages;
          const noOfPackagesStuffed = parseInt(value || 0);
          const averageCargoWeight = (weightPerPackage * noOfPackagesStuffed).toFixed(2);
          // console.log('averageCargoWeight Container', averageCargoWeight);
          updatedTransDtl[index].cargoWeight = parseFloat(averageCargoWeight); // Update cargoWeight for exportStuffRequest
        } else {
          updatedTransDtl[index].cargoWeight = 0; // or handle as needed
        }
      }

      // Update validation errors for cargoWeight
      setValidationErrors(prevErrors => {
        const updatedErrors = [...prevErrors];
        if (updatedErrors[index]) {
          delete updatedErrors[index].cargoWeight;
        }
        return updatedErrors;
      });

      return updatedTransDtl;
    });
  };

  const checkMaxQuantityContainer = (index) => {
    const currentEntry = exportStuffTally[index];

    const currentPreEntry = preExportStuffTally.find(
      (entry) => entry.sbNo == currentEntry.sbNo && entry.sbLineId == currentEntry.sbLineId
    );

    const maxQty = (currentEntry?.sbPackages - currentEntry?.prvStuffedQty) + (currentPreEntry?.stuffedQty || 0);

    // console.log('maxQty ',maxQty , ' currentEntry?.sbPackages ',currentEntry?.sbPackages, ' currentEntry?.prvStuffedQty ',currentEntry?.prvStuffedQty, ' currentPreEntry?.stuffedQty ',currentPreEntry?.stuffedQty);

    const qtyTakenIn = parseFloat(currentEntry.stuffedQty);

    // console.log('qtyTakenIn : ',qtyTakenIn);


    if (qtyTakenIn > maxQty) {
      toast.warning(<div dangerouslySetInnerHTML={{ __html: `Enter Valid Quantity:: Remaining Qty:<strong> ${maxQty} </strong>` }} />, {
        position: 'top-center',
        autoClose: 1000,
        style: { width: '29vw' },
      });
      setValidationErrors(prevErrors => {
        const updatedErrors = [...prevErrors];
        if (!updatedErrors[index]) updatedErrors[index] = {};
        updatedErrors[index]['stuffedQty'] = 'Exceeds maximum quantity';
        return updatedErrors;
      });
      return true;
    }
    return false;
  };

  const checkMaxWeightContainer = (index) => {
    const currentEntry = exportStuffTally[index];
    const currentPreEntry = preExportStuffTally.find(
      (entry) => entry.sbNo == currentEntry.sbNo && entry.sbLineId == currentEntry.sbLineId
    );

    const maxWeight = (currentEntry?.grossWeight - currentEntry?.sbWt) + (currentPreEntry?.cargoWeight || 0);

    // const maxWeight = parseFloat(currentEntry?.grossWeight);
    const cargoWeight = parseFloat(currentEntry.cargoWeight);

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
        updatedErrors[index]['cargoWeight'] = 'Exceeds maximum weight';
        return updatedErrors;
      });
      return true;
    }
    return false;
  };




  const searchSbNos = async (searchvalue) => {
    if (!searchvalue) {
      setSbNos([]);
      return;
    }
    try {
      const response = await MovementService.searchSbNoForBuffer(companyid, branchId, searchvalue, profitcentre.profitcentreId, lastEntry.stuffTallyId, lastEntry.movementType, jwtToken);
      setSbNos(response.data);
    } catch (error) {
      console.error("Error fetching SB entries:", error);
    }
  };



  const handleAddRow = async (exportStuffingRequest) => {

    // console.log('exportStuffingRequest \n ', exportStuffingRequest);

    const { success, cargoGateIns } = await handleSave(exportStuffingRequest);
    if (!success) {
      return;
    }
    const saveRecord = cargoGateIns[0];
    // Calculate the new srNo based on the current list length
    const newSrNo = cargoGateIns.length + 1;
    // Create a new entry with the incremented srNo
    const newCargoEntry = {
      ...initialExportStuffTally,
      stuffTallyLineId: newSrNo,
      stuffTallyDate: new Date(saveRecord.stuffTallyDate),
      movementType: saveRecord.movementType,
      shift: saveRecord.shift,
      containerNo: saveRecord.containerNo,
      containerCondition: saveRecord.containerCondition,
      containerSize: saveRecord.containerSize,
      containerType: saveRecord.containerType,
      vesselId: saveRecord.vesselId,
      vesselName: saveRecord.vesselName,
      voyageNo: saveRecord.voyageNo,
      viaNo: saveRecord.viaNo,
      shippingAgent: saveRecord.shippingAgent,
      shippingAgentName: saveRecord.shippingAgentName,
      shippingLine: saveRecord.shippingLine,
      shippingLineName: saveRecord.shippingLineName,
      gateOpenDate: saveRecord.gateOpenDate ? new Date(saveRecord.gateOpenDate) : null,
      onAccountOf: saveRecord.onAccountOf,
      cha: saveRecord.cha,
      tareWeight: saveRecord.tareWeight,
      deliveryOrderNo: saveRecord.deliveryOrderNo,
      gateInId: saveRecord.gateInId,
      rotationDate: saveRecord.rotationDate,
      gateOpenDate: new Date(saveRecord.gateOpenDate),
      berthingDate: new Date(saveRecord.berthDate),
      rotationNo: saveRecord.rotationNo,

      terminal: saveRecord.terminal,
      finalPod: saveRecord.finalPod,
      pol: saveRecord.pol,
      customsSealNo: saveRecord.customsSealNo,
      agentSealNo: saveRecord.agentSealNo,


    };
    // Add the new entry to the state
    setExportStuffTally([...cargoGateIns, newCargoEntry]);
  };

  const downloadContWiseStuffReport = () => {


    setLoading(true);
    axios
      .post(
        `${ipaddress}exportReport/exportContWiseBufferTallyReport?cid=${companyid}&bid=${branchId}&id=${lastEntry.stuffTallyId}&con=${lastEntry.containerNo}`,
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
                      StuffTally Id
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="service"
                      readOnly
                      maxLength={15}
                      value={lastEntry.stuffTallyId}
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
                /> Search Buffer Tally</h5>

              </ModalHeader>
              <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <label className="forlabel bold-label" htmlFor="sbRequestId">
                        Search by StuffTally Id / Container No
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
                        <th scope="col">StuffTally Id</th>
                        <th scope="col">StuffTally Date</th>
                        <th scope="col">ProfitCenter</th>
                        <th scope="col">ShippingAgent</th>
                        <th scope="col">ShippingLine</th>
                        <th scope="col">Container No</th>
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

                      </tr>
                    </thead>
                    <tbody>

                      {currentItemsGateInSearch.map((item, index) => (
                        <>
                          <tr key={index} className='text-center'>
                            <td>
                              <input type="radio" name="radioGroup" onChange={() => selectGateInSearchRadio(item[0], item[2], item[3], item[7])} value={item[0]} />
                            </td>
                            <td>{item[0]}</td>
                            <td>{formatDate(item[1])}</td>
                            <td>{item[4]}</td>
                            <td>{item[5]}</td>
                            <td>{item[6]}</td>
                            <td>{item[7]}</td>
                            <td>{item[8] === 'A' ? 'Approved' : ''}</td>
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
                  StuffTally Date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={lastEntry.stuffTallyDate}
                    name="stuffReqDate"
                    onChange={(date) => handlePaymentDateChangeHeader(date, 'stuffTallyDate')}
                    placeholderText="Request Date"
                    dateFormat="dd/MM/yyyy HH:mm"
                    timeInputLabel="Time:"
                    showTimeInput
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    className={`form-control ${validationErrors.length > 0 && validationErrors[validationErrors.length - 1]?.stuffTallyDate ? 'error-border' : ''}`}
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
                <label className="forlabel" for="HazardousHazardous">Shift</label>
                <div style={{ position: 'relative' }}>
                  <Input
                    type="select"
                    name="shift"
                    className={`form-control ${validationErrors.length > 0 && validationErrors[validationErrors.length - 1]?.shift ? 'error-border' : ''}`}
                    value={lastEntry.shift}
                    onChange={(e) => handleHeaderChange('shift', e.target.value)}
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
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Status
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  readOnly
                  maxLength={15}
                  value={lastEntry.status === 'A' ? 'Approved' : ''}
                  tabIndex={-1}
                />
              </FormGroup>
            </Col>



            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Created By
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  readOnly
                  maxLength={15}
                  name="viaNo"
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
                  Container No<span className="error-message">*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <Select
                    options={containerData}
                    value={selectedContainerNo}
                    onInputChange={(inputValue, { action }) => {
                      if (action === 'input-change') {
                        handleContainerNoSearch(inputValue);
                      }
                    }}
                    onChange={handleContainerNoSelect}
                    className={`${validationErrors.some(error => error.hasOwnProperty('containerNo')) ? 'error-border' : ''}`}
                    placeholder="Select ContainerNo"
                    //components={{ Option: CustomOption }}
                    isClearable
                    id={lastEntry.stuffTallyId ? 'service' : ''}
                    isDisabled={lastEntry.stuffTallyId}
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
            </Col>

            {/* <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="terminalInputs">
                  Container Size/Type
                </label>
                <div className="d-flex">
                  <input
                    className="form-control me-2" // Added margin to the right
                    type="text"
                    id="service"
                    readOnly
                    maxLength={15}
                    name="containerSize" // Updated name for first input
                    value={lastEntry.containerSize} // Adjust value as needed
                    tabIndex={-1}
                  />
                  <input
                    className="form-control"
                    type="text"
                    id="service" // Unique ID for the second input
                    readOnly
                    maxLength={15}
                    name="containerType" // Updated name for second input
                    value={lastEntry.containerType} // Adjust value as needed
                    tabIndex={-1}
                  />
                </div>
              </FormGroup>
            </Col> */}

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
                                    value={lastEntry.containerSize}
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
                                    value={lastEntry.containerType}
                                    tabIndex={-1}
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
                  Container Health<span className="error-message">*</span>
                </label>


                <Input
                  type="select"
                  value={lastEntry.containerCondition}
                  className={`form-control ${validationErrors.some(error => error.hasOwnProperty('containerCondition')) ? 'error-border' : ''}`}
                  onChange={(e) => handleHeaderChange('containerCondition', e.target.value)}
                // onChange={(e) => handleFieldChange(e, 'containerHealth')}
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



            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Voyage No<span className="error-message">*</span>
                </label>
                <CreatableSelect
                  value={selectedVoyageNo}
                  // value={{ value: lastEntry.voyageNo, label: lastEntry.voyageNo }}
                  onChange={(selectedOption) => handleVoyageSelect(selectedOption, 'voyageNo')}
                  // onInputChange={searchVoyageAndVia}
                  onInputChange={(inputValue, { action }) => {
                    if (action === 'input-change') {
                      searchVoyageAndVia(inputValue);
                    }
                  }}
                  options={vesselData}
                  onCreateOption={(inputValue) => { handleCreationSelect(inputValue, 'voyageNo') }}
                  placeholder="Select Voyage No"
                  isClearable
                  id="voyageNo"
                  name='voyageNo'
                  className={`${validationErrors.some(error => error.hasOwnProperty('voyageNo')) ? 'error-border' : ''}`}
                   styles={{
                      control: (provided, state) => ({
                        ...provided,
                        height: 32,  // Set the height of the select input
                        minHeight: 32,
                        border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                        // display: 'flex',
                        // alignItems: 'center',  // Vertically center the content
                        // padding: '0 10px',     // Ensure padding is consistent
                        // borderRadius: '6px',
                        // width: '100%',
                        // boxSizing: 'border-box',
                        // position: 'relative',  // Ensure positioning doesn't cause layout issues
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
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Via No<span className="error-message">*</span>
                </label>
                <CreatableSelect
                  value={selectedViaNo}
                  // onChange={handleVoyageSelect}
                  // value={{ value: lastEntry.viaNo, label: lastEntry.viaNo }}
                  onChange={(selectedOption) => handleVoyageSelect(selectedOption, 'viaNo')}
                  options={vesselData}
                  placeholder="Select Via No"
                  onInputChange={(inputValue, { action }) => {
                    if (action === 'input-change') {
                      searchVoyageAndVia(inputValue);
                    }
                  }}
                  onCreateOption={(inputValue) => { handleCreationSelect(inputValue, 'viaNo') }}
                  isClearable
                  id="viaNo"
                  name='viaNo'
                  className={`${validationErrors.some(error => error.hasOwnProperty('viaNo')) ? 'error-border' : ''}`}
                   styles={{
                      control: (provided, state) => ({
                        ...provided,
                        height: 32,  // Set the height of the select input
                        minHeight: 32,
                        border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                        // display: 'flex',
                        // alignItems: 'center',  // Vertically center the content
                        // padding: '0 10px',     // Ensure padding is consistent
                        // borderRadius: '6px',
                        // width: '100%',
                        // boxSizing: 'border-box',
                        // position: 'relative',  // Ensure positioning doesn't cause layout issues
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
            </Col>



            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Vessel <span className="error-message">*</span>
                </label>
                <Input
                  className={`form-control ${validationErrors.some(error => error.hasOwnProperty('vesselName')) ? 'error-border' : ''}`}
                  type="text"
                  id="vesselName"
                  name='vesselName'
                  maxLength={50}
                  value={lastEntry.vesselName}
                  onChange={(e) => handleHeaderChange('vesselName', e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>



          <Row>



            {/* <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  POL<span className="error-message">*</span>
                </label>
                <input
                  className={`form-control ${validationErrors.some(error => error.hasOwnProperty('pol')) ? 'error-border' : ''}`}
                  type="text"
                  maxLength={100}
                  name="pol"
                  value={lastEntry.pol}
                  onChange={(e) => handleHeaderChange('pol', e.target.value)}
                />
              </FormGroup>
            </Col> */}


            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  POL <span className="error-message">*</span>
                </label>
                <CreatableSelect
                  value={selectedPol}
                  onChange={(selectedOption) => handlePODChange(selectedOption, 'pol')}
                  options={polData}
                  placeholder="Select POL"
                  onInputChange={(inputValue, { action }) => {
                    if (action === 'input-change') {
                      searchPortData(inputValue, 'pol');
                    }
                  }}
                  onCreateOption={(inputValue) => {
                    const maxLength = 50;
                    const truncatedInputValue = inputValue.slice(0, maxLength);
                    handleCreationPODSelect(truncatedInputValue, 'pol')
                  }}
                  isClearable
                  id="pol"
                  name='pol'
                  className={`${validationErrors.some(error => error.hasOwnProperty('pol')) ? 'error-border' : ''}`}
                   styles={{
                      control: (provided, state) => ({
                        ...provided,
                        height: 32,  // Set the height of the select input
                        minHeight: 32,
                        border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                        // display: 'flex',
                        // alignItems: 'center',  // Vertically center the content
                        // padding: '0 10px',     // Ensure padding is consistent
                        // borderRadius: '6px',
                        // width: '100%',
                        // boxSizing: 'border-box',
                        // position: 'relative',  // Ensure positioning doesn't cause layout issues
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
            </Col>




            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Terminal <span className="error-message">*</span>
                </label>
                <CreatableSelect
                  value={selectedTerminal}
                  onChange={(selectedOption) => handlePODChange(selectedOption, 'terminal')}
                  options={terminalData}
                  placeholder="Select Terminal"
                  onInputChange={(inputValue, { action }) => {
                    if (action === 'input-change') {
                      searchPortData(inputValue, 'terminal');
                    }
                  }}
                  onCreateOption={(inputValue) => {
                    const maxLength = 50;
                    const truncatedInputValue = inputValue.slice(0, maxLength);
                    handleCreationPODSelect(truncatedInputValue, 'terminal')
                  }}
                  isClearable
                  id="terminal"
                  name='terminal'
                  className={`${validationErrors.some(error => error.hasOwnProperty('terminal')) ? 'error-border' : ''}`}
                   styles={{
                      control: (provided, state) => ({
                        ...provided,
                        height: 32,  // Set the height of the select input
                        minHeight: 32,
                        border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                        // display: 'flex',
                        // alignItems: 'center',  // Vertically center the content
                        // padding: '0 10px',     // Ensure padding is consistent
                        // borderRadius: '6px',
                        // width: '100%',
                        // boxSizing: 'border-box',
                        // position: 'relative',  // Ensure positioning doesn't cause layout issues
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
            </Col>


            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Final POD<span className="error-message">*</span>
                </label>
                <CreatableSelect
                  value={selectedPod}
                  onChange={(selectedOption) => handlePODChange(selectedOption, 'finalPod')}
                  options={podData}
                  placeholder="Select Final POD"
                  onInputChange={(inputValue, { action }) => {
                    if (action === 'input-change') {
                      searchPortData(inputValue, 'finalPod');
                    }
                  }}
                  onCreateOption={(inputValue) => {
                    const maxLength = 50;
                    const truncatedInputValue = inputValue.slice(0, maxLength);
                    handleCreationPODSelect(truncatedInputValue, 'finalPod')
                  }}
                  isClearable
                  id="finalPod"
                  name='finalPod'
                  className={`${validationErrors.some(error => error.hasOwnProperty('finalPod')) ? 'error-border' : ''}`}
                   styles={{
                      control: (provided, state) => ({
                        ...provided,
                        height: 32,  // Set the height of the select input
                        minHeight: 32,
                        border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                        // display: 'flex',
                        // alignItems: 'center',  // Vertically center the content
                        // padding: '0 10px',     // Ensure padding is consistent
                        // borderRadius: '6px',
                        // width: '100%',
                        // boxSizing: 'border-box',
                        // position: 'relative',  // Ensure positioning doesn't cause layout issues
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
            </Col>




            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Tare weight<span className="error-message">*</span>
                </label>
                <input
                  className={`form-control ${validationErrors.some(error => error.hasOwnProperty('tareWeight')) ? 'error-border' : ''}`}
                  type="text"
                  maxLength={16}
                  name="tareWeight"
                  value={lastEntry.tareWeight}
                  onChange={(e) => handleHeaderChange('tareWeight', e.target.value, 'decimal', 12, 3)}
                />
              </FormGroup>
            </Col>


            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Agent Seal No<span className="error-message">*</span>
                </label>
                <input
                  className={`form-control ${validationErrors.some(error => error.hasOwnProperty('agentSealNo')) ? 'error-border' : ''}`}
                  type="text"
                  maxLength={15}
                  name="containerSealNo"
                  value={lastEntry.agentSealNo}
                  onChange={(e) => handleHeaderChange('agentSealNo', e.target.value)}
                />
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
                    className={`form-control ${validationErrors.some(error => error.hasOwnProperty('customsSealNo')) ? 'error-border' : ''}`}
                    type="text"
                    maxLength={15}
                    name="customsSealNo"
                    value={lastEntry.customsSealNo}
                    onChange={(e) => handleHeaderChange('customsSealNo', e.target.value)}
                  />
                </div>
              </FormGroup>
            </Col>




          </Row>





          <Row>




            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Shipping Agent
                </label>
                <input
                  className="form-control"
                  type="text"
                  maxLength={15}
                  id="service"
                  readOnly
                  name="status"
                  value={lastEntry.shippingAgentName}
                  tabIndex={-1}
                />
              </FormGroup>
            </Col>


            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Shipping Line
                </label>
                <input
                  className="form-control"
                  type="text"
                  maxLength={15}
                  id="service"
                  readOnly
                  name="igmNo"
                  value={lastEntry.shippingLineName}
                  tabIndex={-1}
                />
              </FormGroup>
            </Col>




            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Total Stuff Packages
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  readOnly
                  maxLength={15}
                  name="viaNo"
                  value={totals.packages}
                  tabIndex={-1}
                />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Tot Cargo Wt
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  readOnly
                  maxLength={15}
                  name="igmNo"
                  value={totals.cargoWeight}
                  tabIndex={-1}
                />
              </FormGroup>
            </Col>




            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Rotation No
                </label>
                <input
                  className="form-control"
                  type="text"
                  id={lastEntry.vesselId ? 'service' : ''}
                  readOnly={lastEntry.vesselId}
                  maxLength={15}
                  name="profitcentreId"
                  value={lastEntry.rotationNo}
                  onChange={(e) => handleHeaderChange('rotationNo', e.target.value)}
                />
              </FormGroup>
            </Col>


            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Rotation Date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={lastEntry.rotationDate}
                    name="rotationDate"
                    placeholderText="Rotation date"
                    onChange={(date) => handlePaymentDateChangeHeader(date, 'rotationDate')}
                    dateFormat="dd/MM/yyyy HH:mm"
                    timeInputLabel="Time:"
                    showTimeInput
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    className={`form-control ${errors.rotationDate ? 'error-border' : ''}`}
                    wrapperClassName="custom-react-datepicker-wrapper"
                    id={lastEntry.vesselId ? 'service' : ''}
                    disabled={lastEntry.vesselId}
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





          </Row>














          <Row>



            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Gate Open Date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={lastEntry.gateOpenDate}
                    onChange={(date) => handlePaymentDateChangeHeader(date, 'gateOpenDate')}
                    id={lastEntry.vesselId ? 'service' : ''}
                    disabled={lastEntry.vesselId}
                    name="gateOpenDate"
                    placeholderText="Gate Open Date"
                    dateFormat="dd/MM/yyyy HH:mm"
                    timeInputLabel="Time:"
                    showTimeInput
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    className={`form-control ${errors.gateOpenDate ? 'error-border' : ''}`}
                    wrapperClassName="custom-react-datepicker-wrapper"
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
                  Period From
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={lastEntry.periodFrom}
                    onChange={(date) => handlePaymentDateChangeHeader(date, 'periodFrom')}
                    id={lastEntry.vesselId ? 'service' : ''}
                    disabled={lastEntry.vesselId}
                    name="periodFrom"
                    placeholderText="Period From"
                    dateFormat="dd/MM/yyyy HH:mm"
                    timeInputLabel="Time:"
                    showTimeInput
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    className={`form-control ${errors.periodFrom ? 'error-border' : ''}`}
                    wrapperClassName="custom-react-datepicker-wrapper"
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




















            {/* vessel search */}


            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Berthing Date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={lastEntry.berthingDate}
                    onChange={(date) => handlePaymentDateChangeHeader(date, 'berthingDate')}
                    id={lastEntry.vesselId ? 'service' : ''}
                    disabled={lastEntry.vesselId}
                    name="gateOpenDate"
                    placeholderText="Berthing Date"
                    dateFormat="dd/MM/yyyy HH:mm"
                    timeInputLabel="Time:"
                    showTimeInput
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    className={`form-control ${errors.berthingDate ? 'error-border' : ''}`}
                    wrapperClassName="custom-react-datepicker-wrapper"
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




          </Row>





          <Row className="text-center mt-1 mb-1">
            <Col>
              <button
                className="btn btn-outline-primary btn-margin newButton"
                style={{ fontSize: 14, marginRight: 10 }}
                id="submitbtn2"
                onClick={(e) => handleSave(exportStuffTally)}
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
                className="btn btn-outline-primary btn-margin newButton"
                style={{ fontSize: 14, marginRight: 10 }}
                id="submitbtn2"
                onClick={(e) => handleAddRow(exportStuffTally)}
              >
                <FontAwesomeIcon
                  icon={faAdd}
                  style={{ marginRight: "5px" }}
                />
                Shipping Bill Entry
              </button>
              <button
                className="btn btn-outline-success btn-margin newButton"
                style={{ marginRight: 10 }}
                id="submitbtn2"
                disabled={lastEntry.stuffTallyId === ''}
                onClick={downloadContWiseStuffReport}
              >
                <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
                Print Report
              </button>

            </Col>
          </Row>
        </div>



        <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>

          <h5>Buffer/FDS/Export FCL Container CLP</h5>

          <Table className="table table-bordered" style={{ border: '2px solid black' }}>
            <thead className="tableHeader">
              <tr>
                <th scope="col" className="text-center" style={{ color: "black" }}>
                  Sr No
                </th>
                <th scope="col" className="text-center" style={{ color: "black" }}>
                  SB No
                </th>
                <th scope="col" className="text-center" style={{ color: "black" }}>
                  SB Trans Id
                </th>
                <th scope="col" className="text-center" style={{ color: "black" }}>
                  SB Line No
                </th>
                <th scope="col" className="text-center" style={{ color: "black" }}>
                  SB Date
                </th>
                <th scope="col" className="text-center" style={{ color: "black" }}>
                  Cargo Description
                </th>
                <th scope="col" className="text-center" style={{ color: "black" }}>
                  Exporter
                </th>
                <th scope="col" className="text-center" style={{ color: "black" }}>
                  No Of Pack
                </th>
                <th scope="col" className="text-center" style={{ color: "black" }}>
                  Gross Weight
                </th>
                <th scope="col" className="text-center" style={{ color: "black" }}>
                  POD
                </th>
                <th scope="col" className="text-center" style={{ color: "black" }}>
                  Pre Stuffed  Qty
                </th>

                <th scope="col" className="text-center" style={{ color: "black" }}>
                  Stuffed Requested Qty<span className="error-message">*</span>
                </th>
                <th scope="col" className="text-center" style={{ color: "black" }}>
                  Stuff Weight<span className="error-message">*</span>
                </th>


                {exportStuffTally.length > 1 && (
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Action
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {exportStuffTally.map((cargoEntry, index) => (
                <tr key={index} className="text-center">
                  <td>
                    {index + 1}
                  </td>



                  <td>
                    <FormGroup>
                      <Select
                        options={sbNos}
                        value={selectedSbNos[index]}
                        onChange={(selectedOption) => handleSbNoChange(selectedOption, index)}
                        onInputChange={(inputValue, { action }) => {
                          if (action === 'input-change') {
                            searchSbNos(inputValue);
                          }
                        }}
                        className={`inputwidthTuka ${validationErrors[index]?.sbNo ? 'error-border' : ''}`}
                        placeholder="Select SB No"
                        isDisabled={cargoEntry.stuffTallyId}
                        id={cargoEntry.stuffTallyId ? 'service' : ''}
                        isClearable
                        menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                        menuPosition="fixed" // Sets the dropdown menu position to fixed    
                        menuPlacement="top"
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
                  </td>




                  <td>
                    <FormGroup>
                      <Input
                        type="text"
                        value={cargoEntry.sbTransId}
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
                        value={cargoEntry.sbLineId}
                        className={`inputwidthTukaMin form-control`}
                        readOnly
                        id="service"
                        tabIndex={-1}
                      />
                    </FormGroup>
                  </td>


                  <td>
                    <DatePicker
                      selected={cargoEntry.sbDate}
                      // onChange={(date) => handlePaymentDateChange(date, index, 'stuffReqDate', cargoEntry.containerNo)}
                      id="service"
                      disabled
                      name="sbDate"
                      placeholderText="Sb Date"
                      dateFormat="dd/MM/yyyy HH:mm"
                      showTimeInput
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      customInput={<CustomInput className={`inputwidthTukaMax form-control`} />}
                      className={`inputwidthTukaMax form-control ${validationErrors[index]?.sbDate ? 'error-border' : ''}`}
                      tabIndex={-1}
                    />

                  </td>



                  <td>
                    <FormGroup>
                      <Input
                        type="text"
                        value={cargoEntry.commodity}
                        className={`inputwidthTukaMax form-control`}
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
                        value={cargoEntry.exporterName}
                        className={`inputwidthTukaMax form-control`}
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
                        value={cargoEntry.sbPackages}
                        className={`inputwidthTukaMin form-control`}
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
                        value={cargoEntry.grossWeight}
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
                        className={`inputwidthTuka form-control`}
                        maxLength={15}
                        value={cargoEntry.pod}
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
                        value={cargoEntry.prvStuffedQty}
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
                        className={`inputwidthTuka form-control ${validationErrors[index]?.stuffedQty ? 'error-border' : ''}`}
                        maxLength={8}
                        value={cargoEntry.stuffedQty}
                        onChange={(e) => handleFieldChangeContainer(e, index, 'stuffedQty', 'number', 8, 0)}
                        onBlur={() => checkMaxQuantityContainer(index)}
                      />
                    </FormGroup>
                  </td>


                  <td>
                    <FormGroup>
                      <Input
                        type="text"
                        className={`inputwidthTuka form-control ${validationErrors[index]?.cargoWeight ? 'error-border' : ''}`}
                        maxLength={15}
                        value={cargoEntry.cargoWeight}
                        onChange={(e) => handleFieldChangeContainer(e, index, 'cargoWeight', 'decimal', 10, 4)}
                        onBlur={() => checkMaxWeightContainer(index)}
                      />
                    </FormGroup>
                  </td>





                  {index > 0 && index === exportStuffTally.length - 1 && (!cargoEntry.stuffTallyId || cargoEntry.stuffTallyId.trim() === '') && (
                    <td>
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        onClick={() => handleRemoveRow(index)}
                        style={{ color: 'red', cursor: 'pointer', fontSize: '24px' }}
                      />
                    </td>
                  )}




                </tr>
              ))}
            </tbody>

          </Table>
        </div>




      </div>
    </>
  );
}

export default BufferFDSOnWheelContainerCLP;
