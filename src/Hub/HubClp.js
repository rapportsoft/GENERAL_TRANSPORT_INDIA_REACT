import AuthContext from "../Components/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import Select, { components } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Swal from "sweetalert2";
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
  faRefresh,
  faSave,
  faCheck,
  faDownload,
  faTrash,
  faShip,
  faBackward,
  faCalendarAlt,
  faAdd,
  faReceipt,
  faTruckPickup,
  faTruck,
  faEdit,
  faTimesCircle,
  faPrint, faSearch
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/style.css";
import "../Components/Style.css";
import { Button } from "react-bootstrap";
import useAxios from "../Components/useAxios";
import cfsService from '../service/CFSService';
import movementService from "../service/MovementService";
import { toast } from "react-toastify";
import ipaddress from "../Components/IpAddress";

function HubClp({ searchData, resetFlag, updatePagesList }) {
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

  const axiosInstance = useAxios();
  const CFSService = new cfsService(axiosInstance);
  const MovementService = new movementService(axiosInstance);

  const [profitcentre, setProfitcentre] = useState({
    profitcentreId: '',
    profitcentreDesc: ''
  });


  const processId = 'P00103';

  // const foundRights =
  //   role !== "ROLE_ADMIN"
  //     ? userRights.find((item) => item.process_Id === processId)
  //     : null;
  // const allowCreate = foundRights?.allow_Create === "Y";
  // const allowRead = foundRights?.allow_Read === "Y";
  // const allowEdit = foundRights?.allow_Update === "Y";
  // const allowDelete = foundRights?.allow_Delete === "Y";






  const [mainSearch, setMainSearch] = useState({
    companyId: companyid,
    branchId: branchId,
    profitcentreId: 'N00004',
    operation: 'sb',
    sbNo: '',
    containerNo: '',
    type: 'N'
  });




  useEffect(() => {
    console.log('searchData CLP ', searchData);


    if (searchData && searchData.activeTab === processId && searchData.stuffReqId && searchData.sbTransId && searchData.sbNo && searchData.profitCenterId) {
      selectCSBSearchRadio(searchData.stuffReqId);
    }
  }, [searchData]);




  useEffect(() => {
    if (resetFlag) {
      handleReset();
    }
  }, [resetFlag]);




  useEffect(() => {
    const fetchData = async () => {
      await getProgitCenterById('N00005');
      await getContainerHealth('J00001');
      await getPols('INDIA');
      await getCargoType('J00006');
    };
    fetchData();
  }, []);






  const getProgitCenterById = async (profitCenterId) => {
    try {
      const response = await CFSService.getProgitCenterById(companyid, branchId, profitCenterId, jwtToken);
      setProfitcentre(response.data);
      setExportStuffRequest(prevState =>
        prevState.map(item => ({
          ...item,
          profitcentreId: response.data.profitcentreId
        }))
      );
    } catch (error) {
      console.error('Error fetching port data:', error);
    }
  };



  const getjarByJarId = async (jarId) => {
    try {
      const response = await CFSService.getJarDetailSelect(companyid, jarId, jwtToken);
      return response.data;
    } catch (error) {
      console.error('Error fetching port data:', error);
      return [];
    }
  };
  const getCargoType = async (jarId) => {
    const cargoType = await getjarByJarId(jarId);
    setCargoType(cargoType);
  };




  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [pol, setPol] = useState([]);
  const [selectedPol, setSelectedPol] = useState(null);
  const [cargoTypes, setCargoType] = useState([]);



  const initialExportStuffRequest = {
    companyId: companyid, // Assuming companyid is passed as a prop or defined elsewhere
    branchId: branchId,   // Assuming branchId is passed as a prop or defined elsewhere
    finYear: '',
    stuffReqId: '',
    sbTransId: '',
    stuffReqLineId: 0,
    sbLineNo: '',
    profitCentreId: 'N00005',
    stuffReqDate: new Date(), // Use null for dates in React
    sbNo: '',
    sbDate: null,
    shift: 'Day',
    stuffTally: 'Y',
    cartingTransId: '',
    cartingLineId: '',
    cartingTransDate: null,
    totalCargoWeight: 0.00,
    shippingAgent: '',
    shippingLine: '',
    exporterName: '',
    cargoDescription: '',
    onAccountOf: '',
    vesselId: '',
    viaNo: '',
    voyageNo: '',
    terminal: '',
    coverDetails: '',
    coverDate: null,
    berthingDate: null,
    gateOpenDate: null,
    gateInId: '',
    agentSealNo: '',
    tareWeight: 0.000,
    containerSize: '',
    containerType: '',
    yardLocation: '',
    yardBlock: '',
    yardCellNo: '',
    yardLocation1: '',
    yardBlock1: '',
    blockCellNo1: '',
    yardPackages: 0.000,
    cellAreaAllocated: 0.000,
    areaReleased: 0.000,
    pod: '',
    podDesc: '',
    comments: '',
    typeOfPackage: '',
    noOfPackages: 0,
    noOfPackagesStuffed: 0,
    contStuffPackages: 0,
    cbm: '',
    containerNo: '',
    currentLocation: '',
    periodFrom: null,
    containerHealth: '',
    cargoWeight: 0.00,
    status: '',
    createdBy: '',
    createdDate: null,
    editedBy: '',
    editedDate: null,
    approvedBy: '',
    approvedDate: null,
    labour: 'N',
    fk3MT: 'N',
    fk5MT: 'N',
    fk10MT: 'N',
    hydra12MT: 'N',
    crane: 'N',
    ssrTransId: '',
    gatePassId: '',
    customSealNo: '',
    grossWeight: 0.000,
    weightTakenIn: 0.000,
    chaName: '',
    commodityCode: '',
    commodityDesc: '',
    pkgs: 0.000,
    weight: 0.000,
    cha: '',
    movementOrderDate: null,
    placementDate: null,
    stuffDate: null,
    beginDateTime: null,
    endDateTime: null,
    mtyCountWt: 0.000,
    stuffingLocation: 'BS',
    movementType: 'PARTY',
    transporter: '',
    destination: '',
    holdStatus: 'N',
    smtpFlag: 'N',
    rotationNo: '',
    rotationDate: null,
    containerGateInDate: null, // Transient field
    shippingLineName: '',      // Transient field
    shippingAgentName: '',    // Transient field
    onAccountName: '',        // Transient field
    vesselName: '',           // Transient field
    consignee: '',            // Transient field
    fob: 0.00,                // Transient field
    cellAreaAllocated: 0.000, // Transient field
    yardPackages: 0.000,      // Transient field
    sbPackages: 0.000,        // Transient field
    stuffedQuantity: 0.000,   // Transient field
    sbWt: 0.000,              // Transient field
    cargoType: '',            // Transient field
    stuffedQty: 0.000,        // Transient field
    balanceQuantity: 0,
    balanceWeight: 0
  };

  const [exportStuffRequest, setExportStuffRequest] = useState([initialExportStuffRequest]);
  const [exportStuffRequestContainer, setExportStuffRequestContainer] = useState([initialExportStuffRequest]);
  const [preExportStuffRequestContainer, setPreExportStuffRequestContainer] = useState([]);
  const [preExportStuffRequest, setPreExportStuffRequest] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedOnAccount, setSelectedOnAccount] = useState(null);
  const [onAccountData, setOnAccountData] = useState([]);
  const [chaData, setChaData] = useState([]);


  const getPols = async (jarId) => {
    const portType = await getPortToSelect(jarId);
    setPol(portType);
  };


  const getPortToSelect = async (jobOrderPrefix) => {
    try {
      const response = await MovementService.getPortToSelectNew(companyid, branchId, jobOrderPrefix, jwtToken);
      return response.data;
    } catch (error) {
      return [];
      console.error("Error fetching port data:", error);
    }
  };


  console.log('exportStuffRequestContainer \n', exportStuffRequestContainer);


  const handlePolChange = selectedOption => {
    setSelectedPol(selectedOption);
    // Prepare updates based on selected option
    const updates = selectedOption
      ? {
        pod: selectedOption.value,
        podDesc: selectedOption.label,
      }
      : { podDesc: '', pod: '' };

    // Update exportStuffRequest state
    setExportStuffRequestContainer(exportStuffRequestContainer.map(item => ({ ...item, ...updates })));
  };




  const searchExporter = async (searchValue, type) => {
    if (!searchValue) {
      return;
    }

    try {
      const response = await MovementService.searchExporter(companyid, branchId, searchValue, jwtToken, type);

      if (type === 'on') {
        setOnAccountData(response.data);
      }
      if (type === 'cha') {
        setChaData(response.data);
      }
    } catch (error) {
      toast.error('Oops something went wrong!', {
        position: 'top-center',
        autoClose: 700,
      });
    }

  };


  const handleSelectChange = async (selectedOption, type) => {
    if (type === 'on') {
      setSelectedOnAccount(selectedOption);
      updateHubCLP('onAccountOf', selectedOption ? selectedOption.value : '');
    }
  }

  const updateHubCLP = (field, value) => {
    setExportStuffRequestContainer((prevExportSbEntry) =>
      prevExportSbEntry.map((item) => ({
        ...item,
        [field]: value, // Update the specific field for all objects
      }))
    );
  };





  const [validationErrors, setValidationErrors] = useState([]);
  const [searchParameter, setSearchParameter] = useState({
    companyId: companyid,
    branchId: branchId,
    sbNo: '',
    type: 'N'
  });

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParameter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSbSearch = async (searchParameter) => {
    let response;
    setLoading(true)
    try {
      response = await CFSService.searchContainerNoForStuffing(searchParameter, jwtToken);

      // Check if response.data is empty
      if (!response.data || response.data.length === 0) {


        toast.error('No Data Found', {
          position: 'top-center',
          autoClose: 1000,
        });
        setExportStuffRequest([initialExportStuffRequest]);
        return;
      }

      if (searchParameter.type === 'N') {
        convertToExportStuffRequest(response);

      } else {
        const result = response.data[0];

        setSelectedViaNo({ value: result?.viaNo, label: result?.viaNo });
        setSelectedVoyageNo({ value: result?.voyageNo, label: result?.voyageNo });

        setSelectedItems(response.data)
        setExportStuffRequest(response.data);
        setPreExportStuffRequest(response.data);
      }

      // console.log('response : \n', response.data);
    } catch (error) {
      console.error('Error fetching data: ', error.message);

      alert(error.message);
    } finally {
      setLoading(false);
    }
  };


  const convertToExportStuffRequest = async (response) => {

    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      let stuffingLineId = 1; // Initialize cartingLineId

      const updatedExportCarting = response.data.map((data) => {
        const currentStuffingLineId = stuffingLineId; // Capture the current ID
        stuffingLineId++; // Increment for the next iteration

        return {
          ...initialExportStuffRequest,
          sbNo: data[0],
          sbTransId: data[2],
          stuffReqDate: new Date(),
          sbDate: new Date(data[1]),
          exporterName: data[5],
          noOfPackages: data[6],
          sbLineNo: data[9],
          cargoDescription: data[10],
          typeOfPackage: data[11],
          containerNo: data[12],
          containerSize: data[13],
          containerType: data[14],
          tareWeight: data[16],
          containerGateInDate: new Date(data[17]),
          deliveryOrderNo: data[18],
          shippingAgent: data[19],
          shippingAgentName: data[20],
          shippingLine: data[21],
          shippingLineName: data[22],
          stuffingLineId: currentStuffingLineId,
          onAccountOf: data[8],
          onAccountName: data[23],
          terminal: data[24],
          berthingDate: null,
          gateOpenDate: null,
          rotationDate: null,
          gateInId: data[25],
          totalCargoWeight: data[26],
          contStuffPackages: data[27]
        };
      });
      // Update state with the new data
      setExportStuffRequest(updatedExportCarting);
      toast.success('Data Found', {
        position: 'top-center',
        autoClose: 1000,
      });
    }
  }






























  const searchSbSearch = async (searchvalue) => {
    setCurrentPageSbSearch(1);
    setLoading(true);
    try {
      const response = await MovementService.getStuffingEntriesToSelect(companyid, branchId, searchvalue, 'N00005', jwtToken);
      setSbSearchData(response.data);
    } catch (error) {
      console.error("Error fetching Stuffing entries:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSelectedSbSearch = async (stuffReqId) => {
    setErrors([]);
    setValidationErrorsContainer([]);
    setLoading(true);
    try {
      const response = await MovementService.getSelectedStuffingEntry(companyid, branchId, stuffReqId, jwtToken);
      setExportStuffRequestContainer(response.data);

      const single = response.data[0];

      console.log('single \n', single);

      setSelectedContainerNo(single.containerNo ? { value: single.containerNo, label: single.containerNo } : null);
      setSelectedVoyageNoContainer(single.voyageNo ? { value: single.voyageNo, label: single.voyageNo } : null);
      setSelectedViaNoContainer(single.viaNo ? { value: single.viaNo, label: single.viaNo } : null);
      setSelectedOnAccount(single.onAccountOf ? { value: single.onAccountOf, label: single.onAccountName } : null);
      setSelectedPol(single.pod ? { value: single.pod, label: single.podDesc } : null);



      const initialCha = response.data.map(entry => ({
        value: entry.cha,
        label: entry.chaName,
      }));
      setSelectedCha(initialCha);

      const initialCommodity = response.data.map(entry => ({
        value: entry.commodityCode,
        label: entry.commodityDesc,
      }));
      setSelectedCommodity(initialCommodity);

      const initialSbNo = response.data.map(entry => ({
        value: entry.sbNo,
        label: entry.sbNo,
      }));
      setSelectedSbNos(initialSbNo);



    } catch (error) {
      console.error("Error fetching SB entries:", error);
    } finally {
      setLoading(false);
    }
  };



  // SbSearch

  const [isModalOpenForSbSearch, setIsModalOpenForSbSearch] = useState(false);

  const [searchSbvalues, setSearchSbvalues] = useState('');
  const [sbSearchData, setSbSearchData] = useState([]);



  const handleOpenSbSearch = (val) => {
    setIsModalOpenForSbSearch(true);
    setSearchSbvalues('');
    searchSbSearch();
  }


  const selectCSBSearchRadio = async (stuffReqId) => {
    await getSelectedSbSearch(stuffReqId);
    handleCloseSbSearch();
  }

  const handleCloseSbSearch = (val) => {
    setIsModalOpenForSbSearch(false);
    setSearchSbvalues('');
    setSbSearchData([]);
  }


  const clearSbSearchSearch = (val) => {
    setSearchSbvalues('');
    searchSbSearch();
  }

  // PAGINATION FOR SELECT EXPORTER
  const [currentPageSbSearch, setCurrentPageSbSearch] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastItemSbSearch = currentPageSbSearch * itemsPerPage;
  const indexOfFirstItemSbSearch = indexOfLastItemSbSearch - itemsPerPage;
  const currentItemsSbSearch = sbSearchData.slice(indexOfFirstItemSbSearch, indexOfLastItemSbSearch);
  const totalPagesSbSearch = Math.ceil(sbSearchData.length / itemsPerPage);

  // Function to handle page change
  const handlePageChangeSbSearch = (page) => {
    if (page >= 1 && page <= totalPagesSbSearch) {
      setCurrentPageSbSearch(page);
    }
  };
  const displayPagesSbSearch = () => {
    const centerPageCount = 5;
    const middlePage = Math.floor(centerPageCount / 2);
    let startPage = currentPageSbSearch - middlePage;
    let endPage = currentPageSbSearch + middlePage;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPagesSbSearch, centerPageCount);
    }

    if (endPage > totalPagesSbSearch) {
      endPage = totalPagesSbSearch;
      startPage = Math.max(1, totalPagesSbSearch - centerPageCount + 1);
    }
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };









  const formatDate = (value) => {
    if (!value) {
      return "";
    }

    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year} `;
  };











































  const lastEntryWithId = exportStuffRequest.slice().reverse().find(entry => entry.stuffReqId && entry.stuffReqId.trim().length > 0);

  // If found, use it as lastEntry; otherwise, use the last entry in the array
  const lastEntry = lastEntryWithId || exportStuffRequest[exportStuffRequest.length - 1];



console.log('lastEntry ...... \n',lastEntry);



  const handlePaymentDateChange = (date, index, name, containerNo) => {
    setExportStuffRequest(prevState => {
      const updatedTransDtl = [...prevState];
      updatedTransDtl[index] = {
        ...updatedTransDtl[index],
        [name]: date
      };
      return updatedTransDtl;
    });


    setSelectedItems(prevSelected =>
      prevSelected.map(item =>
        item.containerNo === containerNo ? {
          ...item,
          [name]: date
        } : item
      )
    );


    // Clear the validation error for the specified field
    setValidationErrors(prevErrors => {
      const updatedErrors = [...prevErrors];
      if (updatedErrors[index]) {
        delete updatedErrors[index][name];  // Corrected deletion syntax
      }
      return updatedErrors;
    });
  };



  const CustomInput = React.forwardRef(({ value, onClick, onKeyDown, className, id }, ref) => (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <input
        ref={ref}
        value={value}
        onClick={onClick}
        onKeyDown={onKeyDown}
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


  // Use useEffect to manage selectAll state
  useEffect(() => {
    setSelectAll(selectedItems.length === exportStuffRequest.length);
  }, [selectedItems, exportStuffRequest]);

  // Function to handle select all checkbox change
  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(exportStuffRequest);
    }
    setSelectAll(!selectAll);
  };






  const validateExportStuffing = (exportStuffRequest) => {
    let errors = [];
    // console.log(' selectedItems \n', exportStuffRequest);

    exportStuffRequest.forEach((detail, index) => {
      const { stuffReqDate, noOfPackagesStuffed, cargoWeight, vesselName, viaNo, voyageNo } = detail;
      let error = {};
      // console.log('vesselName ', vesselName);

      if (!vesselName) { error.vesselName = 'vesselName is required'; }
      if (!viaNo) error.viaNo = 'viaNo is required.';
      if (!voyageNo) error.voyageNo = 'voyageNo is required.';
      if (!cargoWeight) error.cargoWeight = 'cargoWeight is required.';
      if (!noOfPackagesStuffed) error.noOfPackagesStuffed = 'noOfPackagesStuffed is required.';
      // if (!stuffReqDate) error.stuffReqDate = 'stuffReqDate is required.';
      // Check if stuffReqDate is valid
      // console.log('stuffReqDate ', stuffReqDate);

      if (!stuffReqDate || new Date(stuffReqDate).toString() === 'Invalid Date') {
        error.stuffReqDate = 'stuffReqDate is required.';
      }
      errors.push(error);
    });
    setValidationErrors(errors);
    // Check if there are any errors
    return errors.every(error => Object.keys(error).length === 0);
  };





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




  // Add Equipment
  const getAllEquipMents = async (gateInId, docRefNo, erpDocRefNo, profitCenterId) => {
    try {
      // Attempt to fetch the data from the service
      const response = await CFSService.getAllEquipments(companyid, branchId, processId, profitCenterId, gateInId, erpDocRefNo, docRefNo, jwtToken);

      // console.log('getAllEquipMents : \n', response.data);
      // Update the state with the fetched data
      setEquipmentActivityArray(response.data);

      return response.data;
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error("Error fetching equipment data:", error);
      // Optionally, set an error state or show an error message to the user
    }
  };


  const handleOpenEquipment = async (srNo, gateInId, docRefNo, erpDocRefNo, containerNo, profitCenterId, type, size) => {
    if (!gateInId) {
      toast.error('Please first save the request', {
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
      containerNo: containerNo,
      deStuffId: gateInId,
      subDocRefNo: srNo,
      containerSize: size,
      containerType: type
    });

    setAllEquipments(getVendors.data.jar)
    setVendors([getVendors.data.party]);
    setIsModalOpenForEquipment(true);
  };




  // PAGINATION FOR SELECT EXPORTER
  const [currentPageEquipment, setCurrentPageEquipment] = useState(1);
  const [itemsPerPageEquipment] = useState(10);

  const indexOfLastItemEquipment = currentPageEquipment * itemsPerPageEquipment;
  const indexOfFirstItemEquipment = indexOfLastItemEquipment - itemsPerPageEquipment;
  const currentItemsEquipment = equipmentActivityArray.slice(indexOfFirstItemEquipment, indexOfLastItemEquipment);
  const totalPagesEquipment = Math.ceil(equipmentActivityArray.length / itemsPerPageEquipment);

  // Function to handle page change
  const handlePageChangeEquipment = (page) => {
    if (page >= 1 && page <= totalPagesEquipment) {
      setCurrentPageEquipment(page);
    }
  };


  const displayPagesEquipment = () => {
    const centerPageCount = 5;
    const middlePage = Math.floor(centerPageCount / 2);
    let startPage = currentPageEquipment - middlePage;
    let endPage = currentPageEquipment + middlePage;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPagesEquipment, centerPageCount);
    }
    if (endPage > totalPagesEquipment) {
      endPage = totalPagesEquipment;
      startPage = Math.max(1, totalPagesEquipment - centerPageCount + 1);
    }
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };


  const getEquipMentById = async (profitCenterId, deStuffId, docRefNo, erpDocRefNo, equipment, srNo, processId) => {

    // console.log('p', profitCenterId, 'd', deStuffId, 'dn', docRefNo, 'en', erpDocRefNo, 'eq', equipment, 'sr', srNo, 'p', processId);


    try {
      const response = await CFSService.getEquipment(companyid, branchId, processId, profitCenterId, deStuffId, erpDocRefNo, docRefNo, equipment, srNo, jwtToken);

      // console.log('equipMent Single : ', response.data);
      setEquipmentActivity(response.data);
    } catch (error) {
      console.error('Error fetching equipment:', error);
      // Optionally, you can handle the error further (e.g., show a notification, set an error state, etc.)
    }
  };






  const getEquipMent = async (profitCenterId, deStuffId, docRefNo, erpDocRefNo, equipment, srNo, operation, processId) => {
    if (operation === 'EDIT') {
      getEquipMentById(profitCenterId, deStuffId, docRefNo, erpDocRefNo, equipment, srNo, processId);
    }
    if (operation === 'DELETE') {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await CFSService.deleteEquipment(
              companyid, branchId, processId, profitCenterId, deStuffId, erpDocRefNo, docRefNo, equipment, srNo, userId, jwtToken
            );

            await getAllEquipMents(deStuffId, docRefNo, erpDocRefNo, profitCenterId);

            toast.info('Equipment Deleted Successfully!', {
              position: 'top-center',
              autoClose: 700,
            });
          } catch (error) {
            toast.error('Failed to delete equipment. Please try again later.', {
              position: 'top-center',
              autoClose: 700,
            });
            console.error('Error deleting equipment:', error);
          }
        }
      });
    }
  };






  const handleCloseEquipment = (val) => {
    setIsModalOpenForEquipment(false);
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














  // vessel data

  const [vesselData, setVesselData] = useState([]);
  const [selectedViaNo, setSelectedViaNo] = useState(null);
  const [selectedVoyageNo, setSelectedVoyageNo] = useState(null);


  const searchVoyageAndVia = async (searchValue) => {
    // console.log('searchValue ', searchValue);
    if (!searchValue) {
      setVesselData([]);
      return;
    }
    try {
      const response = await CFSService.searchVessel(companyid, branchId, searchValue, jwtToken);
      const data = response.data;

      // console.log('searchVoyageAndVia ', data);

      setVesselData(data);
    } catch (error) {
      setVesselData([]);
      console.error('Error searching vessel:', error);
    }
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
        rotationDate: selectedOption.rotationDate,
        gateOpenDate: new Date(selectedOption.gateOpenDate),
        berthingDate: new Date(selectedOption.berthDate),
        rotationNo: selectedOption.rotationNo
      }
      : { vesselId: '', voyageNo: '', viaNo: '', vesselName: '', rotationDate: null, gateOpenDate: null, berthingDate: null, rotationNo: '' };

    // Update exportStuffRequest state
    setExportStuffRequest(exportStuffRequest.map(item => ({ ...item, ...updates })));
    setSelectedItems(selectedItems.map(item => ({ ...item, ...updates })));

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
    setExportStuffRequest(exportStuffRequest.map(item => ({ ...item, ...updates })));
    setSelectedItems(selectedItems.map(item => ({ ...item, ...updates })));

    // Update validationErrors state
    setValidationErrors(prevErrors =>
      prevErrors.map(error => {
        const updatedError = { ...error };
        delete updatedError[fieldName];
        return updatedError;
      })
    );
  };













  // Main Search



  //   const handleMainSearchChange = (e) => {
  //     const { name, value } = e.target;
  //     setMainSearch((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));


  // if(searchData && searchData.activeTab === processId && searchData.containerNo || searchData.sbNo && name === 'operation')
  // {  
  //   handleMainSBSearch(mainSearch);
  //   console.log(' mainSearch Upper Search : ',mainSearch);  
  // }

  //   };


  const handleMainSearchChange = (e) => {
    const { name, value } = e.target;

    setMainSearch((prev) => {
      const updatedSearch = {
        ...prev,
        [name]: value, // Update the current field
      };

      // Call handleMainSBSearch only if the specific conditions are met
      if (
        searchData &&
        searchData.activeTab === processId &&
        (searchData.containerNo || searchData.sbNo) &&
        name === "operation"
      ) {
        console.log("Updated search before API call:", updatedSearch);
        handleMainSBSearch(updatedSearch); // Call with the updated object
      }

      return updatedSearch; // Return the updated state
    });
  };






  // console.log('mainSearch : ', mainSearch);


  const handleMainSBSearch = async (searchParameter) => {

    setLoading(true)
    try {
      if (searchParameter.operation === 'sb') {
        handleSbSearch(searchParameter);
      }
      else {
        handleContainerWiseStuffingSearch(searchParameter);
      }
    } catch (error) {
      console.error('Error fetching data: ', error.message);
      alert(error.message);
    }
  };


  const handleContainerWiseStuffingSearch = async (searchParameter) => {
    let response;
    setLoading(true);
    try {
      response = await CFSService.searchContainerNoForStuffingContainerWise(searchParameter, jwtToken);

      // console.log('response.data : search, ', response.data);

      // Check if response.data is empty
      if (!response.data || response.data.length === 0) {


        toast.error('No Data Found', {
          position: 'top-center',
          autoClose: 1000,
        });
        setExportStuffRequestContainer([initialExportStuffRequest]);
        return;
      }

      if (searchParameter.type === 'N') {
        convertToExportStuffRequestContainerWise(response);

      } else {
        const result = response.data[0];



        const initialSelectedSbNos = response.data.map(entry => ({
          label: entry.sbNo,
          value: entry.sbNo,
        }));
        // Set the transformed data into the state
        setSelectedSbNos(initialSelectedSbNos);


        const initialSelectedPods = response.data.map(entry => ({
          label: entry.pod,
          value: entry.pod,
        }));
        // Set the transformed data into the state
        setSelectedCha(initialSelectedPods);



        setSelectedViaNoContainer({ value: result?.viaNo, label: result?.viaNo });
        setSelectedVoyageNoContainer({ value: result?.voyageNo, label: result?.voyageNo });
        setSelectedContainerHealth({ value: result?.containerHealth, label: result?.containerHealth })
        setExportStuffRequestContainer(response.data);
        setPreExportStuffRequestContainer(response.data);
      }
    } catch (error) {
      console.error('Error fetching data: ', error.message);
    } finally {
      setLoading(false);
    }
  };




  const convertToExportStuffRequestContainerWise = async (response) => {

    if (response.data) {

      const dataArray = Array.isArray(response.data) ? response.data : [response.data];

      const updatedExportCarting = dataArray.map((selectedOption) => {

        return {
          ...initialExportStuffRequest,
          containerNo: selectedOption.containerNo,
          containerSize: selectedOption.containerSize,
          containerType: selectedOption.containerType,
          shippingAgent: selectedOption.sa,
          shippingAgentName: selectedOption.shippingAgentName,
          shippingLine: selectedOption.sl,
          shippingLineName: selectedOption.shippingLineName,
          onAccountOf: selectedOption.onAccountOf,
          tareWeight: selectedOption.tareWeight,
          inGateInDate: selectedOption.inGateInDate,
          deliveryOrderNo: selectedOption.deliveryOrderNo,
          gateInId: selectedOption.gateInId,
          containerHealth: selectedOption.containerHealth
        };
      });
      // Update state with the new data
      setExportStuffRequestContainer(updatedExportCarting);
      toast.success('Data Found', {
        position: 'top-center',
        autoClose: 1000,
      });
    }
  }








  const [validationErrorsContainer, setValidationErrorsContainer] = useState([]);
  const [containerData, setContainerData] = useState([]);
  const [selectedContainerNo, setSelectedContainerNo] = useState(null);

  const [containerHealthData, setContainerHealthData] = useState([]);
  const [selectedContainerHealth, setSelectedContainerHealth] = useState(null);
  const [selectedSbNos, setSelectedSbNos] = useState([]);
  const [sbNos, setSbNos] = useState([]);

  const [selectedViaNoContainer, setSelectedViaNoContainer] = useState(null);
  const [selectedVoyageNoContainer, setSelectedVoyageNoContainer] = useState(null);









  const lastEntryWithIdContainer = exportStuffRequestContainer.slice().reverse().find(entry => entry.stuffReqId && entry.stuffReqId.trim().length > 0);

  // If found, use it as lastEntry; otherwise, use the last entry in the array
  const lastEntryContainer = lastEntryWithIdContainer || exportStuffRequestContainer[exportStuffRequestContainer.length - 1];


  const getContainerHealth = async (jarId) => {
    const portType = await getjarByJarId(jarId);
    setContainerHealthData(portType);
  };


  // ContainerWise Stuffing request
  const handleContainerNoSearch = async (searchValue) => {
    if (!searchValue) {
      setContainerData([]);
      return;
    }
    try {
      const response = await MovementService.searchContainerNoForHubCLP(companyid, branchId, searchValue, 'N00004', jwtToken);
      setContainerData(response.data);
    } catch (error) {
      setContainerData([]);
      console.error('Error searching ContainerData:', error);
    }
  };



  const handleContainerNoSelect = async (selectedOption) => {
    // Update selected values
    setSelectedContainerNo(selectedOption ? { value: selectedOption.containerNo, label: selectedOption.containerNo } : null);
    setSelectedOnAccount(selectedOption ? { value: selectedOption.onAccountOf, label: selectedOption.onAccountName } : null);
setContainerData([]);

    // Prepare updates based on selected option
    const updates = selectedOption
      ? {
        containerNo: selectedOption.containerNo,
        containerSize: selectedOption.containerSize,
        containerType: selectedOption.containerType,
        shippingAgent: selectedOption.sa,
        shippingAgentName: selectedOption.shippingAgentName,
        shippingLine: selectedOption.sl,
        shippingLineName: selectedOption.shippingLineName,
        onAccountOf: selectedOption.onAccountOf,
        containerHealth: selectedOption.containerHealth,
        tareWeight: selectedOption.tareWeight,
        periodFrom: selectedOption.inGateInDate,
        deliveryOrderNo: selectedOption.deliveryOrderNo,
        gateInId: selectedOption.gateInId
      }
      : {
        containerNo: '',
        containerSize: '',
        containerType: '',
        shippingAgent: '',
        shippingAgentName: '',
        shippingLine: '',
        shippingLineName: '',
        onAccountOf: '',
        tareWeight: '',
        periodFrom: '',
        deliveryOrderNo: '',
        gateInId: '',
        containerHealth: ''
      };


    // Update exportStuffRequest state
    setExportStuffRequestContainer(exportStuffRequestContainer.map(item => ({ ...item, ...updates })));

    // Update validationErrors state
    setValidationErrorsContainer(prevErrors =>
      prevErrors.map(error => {
        const updatedError = { ...error };
        // Remove specific field errors
        delete updatedError.containerNo;
        return updatedError; // Return the updated error object
      })
    );
  };

  // ContainerWise Stuffing request
  const handleContainerHealthSearch = async (searchValue) => {
    // console.log('handleContainerHealhSearch ', searchValue);
    if (!searchValue) {
      setContainerHealthData([]);
      return;
    }
    try {
      const response = await CFSService.searchContainerNoForStuffingContainerWise(companyid, branchId, searchValue, profitcentre.profitcentreId, jwtToken);
      const data = response.data;
      // console.log('ContainerHealthData ', data);
      setContainerHealthData(data);
    } catch (error) {
      setContainerHealthData([]);
      console.error('Error searching ContainerHealthData:', error);
    }
  };



  const handleContainerHealthSelect = async (selectedOption) => {
    // Update selected values
    setSelectedContainerHealth(selectedOption);

    // Prepare updates based on selected option
    const updates = selectedOption
      ? {
        containerHealth: selectedOption.value,

      }
      : { containerHealth: '' };

    // Update exportStuffRequest state
    setExportStuffRequestContainer(exportStuffRequestContainer.map(item => ({ ...item, ...updates })));
  };




  const handleRemoveRow = (index) => {
    if (exportStuffRequestContainer.length > 1) {
      setExportStuffRequestContainer(exportStuffRequestContainer.filter((_, i) => i !== index));
    }
  };



  const searchIGMNOs = async (searchvalue) => {
    if (!searchvalue) {
      setSbNos([]);
      return;
    }
    try {
      const response = await MovementService.searchIgmNoForStuffing(companyid, branchId, searchvalue, profitcentre.profitcentreId, lastEntryContainer.stuffReqId, jwtToken);
      setSbNos(response.data);
    } catch (error) {
      console.error("Error fetching SB entries:", error);
    }
  };






  const CustomOption = (props) => {
    // console.log(props);
    return (
      <components.Option {...props}>
        <span style={{ fontWeight: 'bold' }}>{props.data.igmNo}</span>
        {" - " + props.data.igmLineNo}
      </components.Option>
    );
  };

















  const handleSbNoChange = (selectedOption, index) => {
    // Update selectedSbNos
    const updatedSbNos = [...selectedSbNos];
    updatedSbNos[index] = selectedOption; // Set the selected option for the specific index
    setSelectedSbNos(updatedSbNos); // Update the state

    setExportStuffRequestContainer((prevContainer) => {
      const newContainer = [...prevContainer];

      // Clear validation errors for this index
      const updatedValidationErrors = [...validationErrorsContainer];
      updatedValidationErrors[index] = {}; // Clear errors for the current index
      setValidationErrorsContainer(updatedValidationErrors);

      if (!selectedOption) {
        // If selectedOption is null, clear all values at the index
        newContainer[index] = {
          ...newContainer[index],
          sbNo: '',
          sbLineNo: '',
          sbTransId: '',
          exporterId: '',
          exporterName: '',
          sbDate: null,
          contStuffPackages: 0,
          cargoDescription: '',
          noOfPackages: 0,
          pod: '',
          totalCargoWeight: 0,
          noOfPackagesStuffed: 0,
          totalCargoWeight: 0,
          cargoWeight: 0,
          typeOfPackage: '',
          balanceWeight: 0,
          balanceQuantity: 0,
          grossWeight: 0
        };

      } else {
        // Extract values from the selected option
        const {
          igmNo,
          igmLineNo,
          hubTransId,
          exporterId,
          importerName,
          hubTransDate,
          contStuffPackages,
          cargoDescription,
          noOfPackages,
          pod,
          grossWeight,
          cargoWt,
          balanceQuantity,
          balanceWeight
        } = selectedOption;

        // Update the specific index with the new values
        newContainer[index] = {
          ...newContainer[index],
          sbNo: igmNo,
          sbLineNo: igmLineNo,
          sbTransId: hubTransId,
          exporterId: exporterId,
          exporterName: importerName,
          sbDate: new Date(hubTransDate),
          contStuffPackages: contStuffPackages,
          cargoDescription: cargoDescription,
          noOfPackages: noOfPackages,
          pod: pod,
          // totalCargoWeight: grossWeight,
          cargoWeight: cargoWt,
          grossWeight: grossWeight,
          noOfPackagesStuffed: 0,
          typeOfPackage: '',
          balanceQuantity: balanceQuantity,
          balanceWeight: balanceWeight
        };
      }
      return newContainer;
    });
    setSbNos([]);
  };




  const validateExportStuffingContainer = (exportStuffRequest) => {
    let errors = [];

    exportStuffRequest.forEach((detail) => {
      const { sbNo, sbLineNo, containerHealth, customSealNo, mtyCountWt, containerNo, stuffReqDate, noOfPackagesStuffed, cargoWeight, vesselName, viaNo, voyageNo, totalCargoWeight,
        noOfPackages, destination, balanceQuantity, balanceWeight } = detail;
      let error = {};

      if (!vesselName) { error.vesselName = 'vesselName is required'; }
      if (!destination) { error.destination = 'destination is required'; }
      if (!viaNo) error.viaNo = 'viaNo is required.';
      if (!voyageNo) error.voyageNo = 'voyageNo is required.';
      if (!totalCargoWeight || totalCargoWeight <= 0) {
        error.totalCargoWeight = 'Total Cargo Weight is required and must be greater than 0.';
      }

      if (!noOfPackagesStuffed || noOfPackagesStuffed <= 0) {
        error.noOfPackagesStuffed = 'No. of Packages Stuffed is required and must be greater than 0.';
      }

      if (!mtyCountWt || mtyCountWt <= 0) {
        error.mtyCountWt = 'Mty CountWt is required';
      }

      if (!sbNo) error.igmNo = 'igmNo is required.';
      if (!sbLineNo) error.sbLineNo = 'sbLineNo is required.';
      if (!containerHealth) error.containerHealth = 'containerHealth is required.';
      if (!containerNo) error.containerNo = 'containerNo is required.';
      if (!customSealNo) error.customSealNo = 'customSealNo is required.';

      const currentPreEntry = preExportStuffRequestContainer.find(
        (entry) => entry.sbNo == sbNo && entry.sbLineNo == sbLineNo
      );

      const noOfPackagesStuffedNum = Number(noOfPackagesStuffed);
      const balanceQuantityPre = Number(balanceQuantity);
      const noOfPackagesStuffedNumPre = Number(currentPreEntry ? currentPreEntry.noOfPackagesStuffed : 0);

      if (
        isNaN(noOfPackagesStuffedNum) || isNaN(balanceQuantityPre) ||
        noOfPackagesStuffedNum > (balanceQuantityPre + noOfPackagesStuffedNumPre)
      ) {
        error.noOfPackagesStuffed = `noOfPackagesStuffed should not exceed ${balanceQuantityPre + noOfPackagesStuffedNumPre}.`;
      }



      const noOfWeightStuffedNum = Number(totalCargoWeight);
      const balanceWeightPre = Number(balanceWeight);
      const noOfWeightStuffedNumPre = Number(currentPreEntry ? currentPreEntry.totalCargoWeight : 0);

      if (
        isNaN(noOfWeightStuffedNum) || isNaN(balanceWeightPre) ||
        noOfWeightStuffedNum > (balanceWeightPre + noOfWeightStuffedNumPre)
      ) {
        error.totalCargoWeight = `cargoWeight should not exceed ${balanceWeightPre + noOfWeightStuffedNumPre}.`;
      }


      if (!stuffReqDate || new Date(stuffReqDate).toString() === 'Invalid Date') {
        error.stuffReqDate = 'stuffReqDate is required.';
      }
      errors.push(error);
    });
    setValidationErrorsContainer(errors);
    return errors.every(error => Object.keys(error).length === 0);
  };










  const handleSaveContainer = async (exportStuffRequest) => {
    if (!Array.isArray(exportStuffRequest) || exportStuffRequest.length === 0) {
      toast.warning('please select container!', {
        position: 'top-center',
        autoClose: 700,
      });
      return;
    }


    if (!validateExportStuffingContainer(exportStuffRequest)) {
      toast.warning('Please enter required fields!', {
        position: 'top-center',
        autoClose: 1000,
      });
      return false;
    }
    setLoading(true);
    try {
      const response = await MovementService.saveHubStuffRequestContainer(companyid, branchId, userId, exportStuffRequest, jwtToken);

      setExportStuffRequestContainer(response.data);
      setPreExportStuffRequestContainer(response.data);

      if (searchData && (searchData.sbNo || searchData.container)
      ) {
        updatePagesList("P00103");
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
        const match = errorMessage.match(/SrNo: (\d+) and IGM No: (\d+)/);
        if (match) {
          const srNo = parseInt(match[1], 10);
          const sbNo = match[2];

          const errorMessageNew = `Duplicate IGM No found for SrNo: <strong>${srNo}</strong> and IGM No: <strong>${sbNo}</strong>`;
          const contentWidth = errorMessageNew.length * 6;

          toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessageNew }} />, {
            position: 'top-center',
            autoClose: 3000,
            style: { width: `${contentWidth}px` },
          });

          // Find the index of the cargo entry based on SrNo
          const errorIndex = exportStuffRequestContainer.findIndex(entry => entry.stuffReqLineId === srNo);
          if (errorIndex !== -1) {
            const newErrors = [...validationErrors];
            newErrors[errorIndex] = { ...newErrors[errorIndex], igmNo: `Duplicate Igm No: ${sbNo}` };
            setValidationErrorsContainer(newErrors);
          }
        }
        else {
          toast.error(errorMessage, {
            position: 'top-center',
            autoClose: 3000,
          });
        }
        return { success: false, cargoEntries: null };
      }

      toast.error('Oops something went wrong!', {
        position: 'top-center',
        autoClose: 700,
      });

      return { success: false, cargoGateIns: null };
    } finally {
      setLoading(false);
    }
  };








  const handlePaymentDateChangeHeaderContainer = async (date, fieldName) => {
    setExportStuffRequestContainer(prevRequest =>
      prevRequest.map(item => ({
        ...item,
        [fieldName]: date
      }))
    );

    // Update validationErrors state
    setValidationErrorsContainer(prevErrors =>
      prevErrors.map(error => {
        const updatedError = { ...error }; // Copy the error object
        delete updatedError[fieldName]; // Remove the specific field error
        return updatedError; // Return the updated error object
      })
    );


  };




  const handleHeaderChangeContainer = (fieldName, value, type, maxIntegerDigits, maxDecimalDigits) => {

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
    setExportStuffRequestContainer(prevRequest =>
      prevRequest.map(item => ({
        ...item,
        [fieldName]: value
      }))
    );


    // Update validationErrors state
    setValidationErrorsContainer(prevErrors =>
      prevErrors.map(error => {
        const updatedError = { ...error }; // Copy the error object
        delete updatedError[fieldName]; // Remove the specific field error
        return updatedError; // Return the updated error object
      })
    );
  };


  const handleVoyageSelectContainer = async (selectedOption, fieldName) => {
    // Update selected values
    setSelectedViaNoContainer(selectedOption ? { value: selectedOption.viaNo, label: selectedOption.viaNo } : null);
    setSelectedVoyageNoContainer(selectedOption ? { value: selectedOption.voyageNo, label: selectedOption.voyageNo } : null);

    // Prepare updates based on selected option
    const updates = selectedOption
      ? {
        vesselId: selectedOption.value,
        voyageNo: selectedOption.voyageNo,
        viaNo: selectedOption.viaNo,
        vesselName: selectedOption.vesselName,
        rotationDate: selectedOption.rotationDate,
        gateOpenDate: new Date(selectedOption.gateOpenDate),
        berthingDate: new Date(selectedOption.berthDate),
        rotationNo: selectedOption.rotationNo,
        terminal: selectedOption.terminal
      }
      : { vesselId: '', voyageNo: '', viaNo: '', vesselName: '', rotationDate: null, gateOpenDate: null, berthingDate: null, rotationNo: '', terminal: '' };

    // Update exportStuffRequest state
    setExportStuffRequestContainer(exportStuffRequestContainer.map(item => ({ ...item, ...updates })));

    // Update validationErrors state
    setValidationErrorsContainer(prevErrors =>
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






  const handleCreationSelectContainer = async (inputValue, fieldName) => {
    const updates = { [fieldName]: inputValue }; // Dynamically set the field name

    if (fieldName === 'viaNo') {
      setSelectedViaNoContainer({ value: inputValue, label: inputValue });
    } else {
      setSelectedVoyageNoContainer({ value: inputValue, label: inputValue });
    }
    // Update exportStuffRequest
    setExportStuffRequestContainer(exportStuffRequestContainer.map(item => ({ ...item, ...updates })));

    // Update validationErrors state
    setValidationErrorsContainer(prevErrors =>
      prevErrors.map(error => {
        const updatedError = { ...error };
        delete updatedError[fieldName];
        return updatedError;
      })
    );
  };



  const handleFieldChangeContainer = (e, index, fieldName, type, maxIntegerDigits, maxDecimalDigits) => {
    let { value, checked, type: inputType } = e.target;

    if (inputType === 'checkbox') {
      value = checked ? 'Y' : 'N';
    }

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

    setValidationErrorsContainer(prevErrors => {
      const updatedErrors = [...prevErrors];
      if (updatedErrors[index]) {
        delete updatedErrors[index][fieldName];
      }
      return updatedErrors;
    });

    // Update the state without validation
    setExportStuffRequestContainer(prevState => {
      const updatedTransDtl = [...prevState];
      updatedTransDtl[index] = {
        ...updatedTransDtl[index],
        [fieldName]: value,
      };

      // Calculate average cargo weight if fieldName is noOfPackagesStuffed
      if (fieldName === 'noOfPackagesStuffed') {

        const currentEntry = updatedTransDtl[index];

        const noOfPackages = parseInt(currentEntry.noOfPackages || 0);
        const totalCargoWeight = parseFloat(currentEntry.cargoWeight || 0);

        if (noOfPackages > 0) {
          const weightPerPackage = totalCargoWeight / noOfPackages;
          const noOfPackagesStuffed = parseInt(value || 0);
          const averageCargoWeight = (weightPerPackage * noOfPackagesStuffed).toFixed(2);
          // console.log('averageCargoWeight Container', averageCargoWeight);
          updatedTransDtl[index].totalCargoWeight = parseFloat(averageCargoWeight);
        } else {
          updatedTransDtl[index].totalCargoWeight = 0; // or handle as needed
        }
      }

      // Update validation errors for cargoWeight
      setValidationErrorsContainer(prevErrors => {
        const updatedErrors = [...prevErrors];
        if (updatedErrors[index]) {
          delete updatedErrors[index].totalCargoWeight;
        }
        return updatedErrors;
      });

      return updatedTransDtl;
    });
  };



  const checkMaxQuantityContainer = (index) => {
    const currentEntry = exportStuffRequestContainer[index];

    const currentPreEntry = preExportStuffRequestContainer.find(
      (entry) => entry.sbNo == currentEntry.sbNo && entry.sbLineNo == currentEntry.sbLineNo
    );
    // const maxQty = (currentEntry?.balanceQuantity || 0 + currentPreEntry?.noOfPackagesStuffed || 0);

    const maxQty = parseFloat(currentEntry.balanceQuantity || 0) + parseFloat(currentPreEntry?.noOfPackagesStuffed || 0)


    console.log('currentEntry?.balanceQuantity ', currentEntry?.balanceQuantity, ' currentPreEntry?.noOfPackagesStuffed ', currentPreEntry?.noOfPackagesStuffed, ' maxQty ', maxQty);


    const qtyTakenIn = parseFloat(currentEntry.noOfPackagesStuffed);

    if (qtyTakenIn > maxQty) {
      toast.warning(<div dangerouslySetInnerHTML={{ __html: `Enter Valid Quantity:: Remaining Qty:<strong> ${maxQty} </strong>` }} />, {
        position: 'top-center',
        autoClose: 1000,
        style: { width: '29vw' },
      });
      setValidationErrorsContainer(prevErrors => {
        const updatedErrors = [...prevErrors];
        if (!updatedErrors[index]) updatedErrors[index] = {};
        updatedErrors[index]['noOfPackagesStuffed'] = 'Exceeds maximum quantity';
        return updatedErrors;
      });
    }
  };

  const checkMaxWeightContainer = (index) => {
    const currentEntry = exportStuffRequestContainer[index];

    const currentPreEntry = preExportStuffRequestContainer.find(
      (entry) => entry.sbNo == currentEntry.sbNo && entry.sbLineNo == currentEntry.sbLineNo
    );

    const maxWeight = parseFloat(currentEntry?.balanceWeight || 0) + parseFloat(currentPreEntry?.totalCargoWeight || 0)

    const cargoWeight = parseFloat(currentEntry.totalCargoWeight);

    console.log('maxWeight ', maxWeight, ' cargoWeight ', cargoWeight, ' balanceWeight ', currentEntry?.balanceWeight || 0);

    if (cargoWeight > maxWeight) {
      toast.warning(<div dangerouslySetInnerHTML={{ __html: `Enter Valid Weight:: Remaining weight:<strong> ${maxWeight} </strong>` }} />, {
        position: 'top-center',
        autoClose: 1000,
        style: { width: '29vw' },
      });
      // Set validation error
      setValidationErrorsContainer(prevErrors => {
        const updatedErrors = [...prevErrors];
        if (!updatedErrors[index]) updatedErrors[index] = {};
        updatedErrors[index]['cargoWeight'] = 'Exceeds maximum weight';
        return updatedErrors;
      });
    }
  };


  const handleAddRow = async (exportStuffingRequest) => {

    // console.log('exportStuffingRequest \n ', exportStuffingRequest);

    const { success, cargoGateIns } = await handleSaveContainer(exportStuffingRequest);
    if (!success) {
      return;
    }
    const saveRecord = cargoGateIns[0];
    // Calculate the new srNo based on the current list length
    const newSrNo = cargoGateIns.length + 1;

    const newCargoEntry = {
      ...initialExportStuffRequest,
      stuffReqLineId: newSrNo,
      // stuffReqId: saveRecord.stuffReqId,
      stuffReqDate: saveRecord.stuffReqDate ? new Date(saveRecord.stuffReqDate) : null,
      // status:  saveRecord.status, 
      createdBy: saveRecord.createdBy,
      shift: saveRecord.shift,
      containerNo: saveRecord.containerNo,
      containerHealth: saveRecord.containerHealth,
      containerSize: saveRecord.containerSize,
      containerType: saveRecord.containerType,
      vesselId: saveRecord.vesselId,
      vesselName: saveRecord.vesselName,
      voyageNo: saveRecord.voyageNo,
      containerGateInDate: saveRecord.containerGateInDate ? new Date(saveRecord.containerGateInDate) : null,
      viaNo: saveRecord.viaNo,
      shippingAgent: saveRecord.shippingAgent,
      shippingAgentName: saveRecord.shippingAgentName,
      shippingLine: saveRecord.shippingLine,
      shippingLineName: saveRecord.shippingLineName,
      gateOpenDate: saveRecord.gateOpenDate ? new Date(saveRecord.gateOpenDate) : null,
      onAccountOf: saveRecord.onAccountOf,
      onAccountName: saveRecord.onAccountName,
      tareWeight: saveRecord.tareWeight,
      periodFrom: saveRecord.periodFrom ? new Date(saveRecord.periodFrom) : null,
      deliveryOrderNo: saveRecord.deliveryOrderNo,
      gateInId: saveRecord.gateInId,
      rotationDate: saveRecord.rotationDate ? new Date(saveRecord.rotationDate) : null,
      gateOpenDate: saveRecord.gateOpenDate ? new Date(saveRecord.gateOpenDate) : null,
      berthingDate: saveRecord.berthDate ? new Date(saveRecord.berthDate) : null,
      rotationNo: saveRecord.rotationNo,


      movementOrderDate: saveRecord.movementOrderDate ? new Date(saveRecord.movementOrderDate) : null,
      placementDate: saveRecord.placementDate ? new Date(saveRecord.placementDate) : null,
      endDateTime: saveRecord.endDateTime ? new Date(saveRecord.endDateTime) : null,
      stuffDate: saveRecord.stuffDate ? new Date(saveRecord.stuffDate) : null,
      beginDateTime: saveRecord.beginDateTime ? new Date(saveRecord.beginDateTime) : null,

      mtyCountWt: saveRecord.mtyCountWt,
      customSealNo: saveRecord.customSealNo,
      agentSealNo: saveRecord.agentSealNo,
      pod: saveRecord.pod,
      podDesc: saveRecord.podDesc,
      terminal: saveRecord.terminal,

      mtyCountWt: saveRecord.mtyCountWt,
      customSealNo: saveRecord.customSealNo,
      agentSealNo: saveRecord.agentSealNo,
      pod: saveRecord.pod,
      podDesc: saveRecord.podDesc,
      terminal: saveRecord.terminal,

      destination: saveRecord.destination,
      podDesc: saveRecord.podDesc,
      terminal: saveRecord.terminal,



    };



    // Add the new entry to the state
    setExportStuffRequestContainer([...cargoGateIns, newCargoEntry]);
  };







  const handleReset = async () => {

    setSelectedOnAccount(null);
    setSelectedPol(null);
    setErrors([]);
    setValidationErrorsContainer([]);
    setExportStuffRequestContainer([initialExportStuffRequest]);
    setSelectedViaNoContainer(null);
    setSelectedVoyageNoContainer(null);
    setSelectedContainerHealth(null);
    setSelectedContainerNo(null);
    setPreExportStuffRequestContainer([]);

    const clearedCha = selectedCha.map(() => null);
    setSelectedCha(clearedCha);

    const clearedCommodity = selectedCommodity.map(() => null);
    setSelectedCommodity(clearedCommodity);

    const clearedSbNo = selectedSbNos.map(() => null);
    setSelectedSbNos(clearedSbNo);

  };


  const downloadContWiseStuffReport = () => {


    setLoading(true);
    axios
      .post(
        `${ipaddress}exportReport/exportContWiseStuffreqReport?cid=${companyid}&bid=${branchId}&id=${lastEntryContainer.stuffReqId}&con=${lastEntryContainer.containerNo}`,
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


  const downloadSbWiseStuffReport = () => {


    setLoading(true);
    axios
      .post(
        `${ipaddress}exportReport/exportSBWiseStuffreqReport?cid=${companyid}&bid=${branchId}&id=${lastEntry.stuffReqId}&sb=${lastEntry.sbNo}`,
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





  const searchPortData = async (searchValue) => {
    if (!searchValue) {
      setPodData([]);
      return;
    }
    try {
      const response = await MovementService.searchPortsData(companyid, branchId, searchValue, jwtToken);
      setPodData(response.data);
    } catch (error) {
      setPodData([]);
      console.error('Error searching vessel:', error);
    }
  };


  const [podData, setPodData] = useState([]);
  const [selectedCha, setSelectedCha] = useState([]);
  const [selectedCommodity, setSelectedCommodity] = useState([]);
  // console.log('exportstuffContainer', exportStuffRequestContainer);


  const handleChaSelect = async (selectedOption, index) => {
    // Update selected values for viaNo and voyageNo index-wise
    setSelectedCha(prevState => {
      const updatedState = [...prevState];
      updatedState[index] = selectedOption;
      return updatedState;
    });

    // Prepare updates based on selected option
    const updates = selectedOption
      ? {
        cha: selectedOption.value,
        chaName: selectedOption.label
      }
      : { cha: '', chaName: '' };

    // Update exportMovement at the specified index
    setExportStuffRequestContainer(prevState => {
      return prevState.map((item, idx) => {
        if (idx === index) {
          return { ...item, ...updates };
        }
        return item;
      });
    });
  };




  const handleCommoditySelect = async (selectedOption, index) => {
    // Update selected values for viaNo and voyageNo index-wise
    setSelectedCommodity(prevState => {
      const updatedState = [...prevState];
      updatedState[index] = selectedOption;
      return updatedState;
    });

    const updates = selectedOption
      ? {
        commodityCode: selectedOption.value, commodityDesc: selectedOption.label
      }
      : { commodityCode: '', commodityDesc: '' };

    // Update exportMovement at the specified index
    setExportStuffRequestContainer(prevState => {
      return prevState.map((item, idx) => {
        if (idx === index) {
          return { ...item, ...updates };
        }
        return item;
      });
    });
  };





  useEffect(() => {
    const foundParty = pol.find(inPol => inPol.value === lastEntryContainer.pod);
    if (foundParty) {
      setSelectedPol(foundParty);
    }
  }, [pol, lastEntryContainer.pod]);









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
        {/* {mainSearch.operation === 'container' && ( */}

        <div className='ContainerWiseStuffingRequest'>

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
                        Stuff Request Id
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="service"
                        maxLength={15}
                        name="igmTransId"
                        disabled
                        value={lastEntryContainer.stuffReqId}
                      />
                    </FormGroup>
                  </Col>

                  <Col md={3} className="d-flex justify-content-end" style={{ marginTop: 21 }}>
                    <button
                      className="btn btn-outline-primary btn-margin newButton"
                      style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      id="submitbtn2"
                      onClick={handleOpenSbSearch}
                    >
                      <FontAwesomeIcon icon={faSearch} size="sm" />
                    </button>

                  </Col>
                </Row>

              </Col>



              <Modal Modal isOpen={isModalOpenForSbSearch} onClose={handleCloseSbSearch} toggle={handleCloseSbSearch} style={{ maxWidth: '1100px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>

                <ModalHeader toggle={handleCloseSbSearch} style={{
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
                  /> Search Shipping Bill Entries</h5>

                </ModalHeader>
                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                          Search by Sb TransId / H_sb TransId / Sb No
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="searchSbvalues"
                          maxLength={15}
                          name='searchSbvalues'
                          value={searchSbvalues}
                          onChange={(e) => setSearchSbvalues(e.target.value)}
                        />

                      </FormGroup>
                    </Col>
                    <Col md={6} style={{ marginTop: 24 }}>
                      <button
                        className="btn btn-outline-primary btn-margin newButton"
                        style={{ marginRight: 10, fontWeight: 'bold' }}
                        id="submitbtn2"
                        onClick={() => searchSbSearch(searchSbvalues)}
                      >
                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                        Search
                      </button>
                      <button
                        className="btn btn-outline-danger btn-margin newButton"
                        style={{ marginRight: 10, fontWeight: 'bold' }}
                        id="submitbtn2"
                        onClick={clearSbSearchSearch}
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
                          <th scope="col">Stuff Req Id</th>
                          <th scope="col">Stuff Req Date</th>
                          <th scope="col">Profitcentre</th>
                          <th scope="col">Shipping Agent</th>
                          <th scope="col">Shipping Line</th>
                          <th scope="col">Container No</th>
                          <th scope="col">Status</th>
                        </tr>
                        <tr className='text-center'>
                          <th scope="col"></th>
                          <th scope="col">{sbSearchData.length}</th>
                          <th scope="col"></th>
                          <th scope="col"></th>
                          <th scope="col"></th>
                          <th scope="col"></th>
                          <th scope="col"></th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItemsSbSearch.map((item, index) => (
                          <>
                            <tr key={index} className='text-center'>
                              <td>
                                <input type="radio" name="radioGroup" onChange={() => selectCSBSearchRadio(item[0])} value={item[0]} />
                              </td>
                              <td>{item[0]}</td>
                              <td>{item[1]}</td>
                              <td>{item[3]}</td>
                              <td>{item[4]}</td>
                              <td>{item[5]}</td>
                              <td>{item[6]}</td>
                              <td>{item[7] === 'A' ? 'Approved' : ''}</td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </table>
                    <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                      <Pagination.First onClick={() => handlePageChangeSbSearch(1)} />
                      <Pagination.Prev
                        onClick={() => handlePageChangeSbSearch(currentPageSbSearch - 1)}
                        disabled={currentPageSbSearch === 1}
                      />
                      <Pagination.Ellipsis />

                      {displayPagesSbSearch().map((pageNumber) => (
                        <Pagination.Item
                          key={pageNumber}
                          active={pageNumber === currentPageSbSearch}
                          onClick={() => handlePageChangeSbSearch(pageNumber)}
                        >
                          {pageNumber}
                        </Pagination.Item>
                      ))}

                      <Pagination.Ellipsis />
                      <Pagination.Next
                        onClick={() => handlePageChangeSbSearch(currentPageSbSearch + 1)}
                        disabled={currentPageSbSearch === totalPagesSbSearch}
                      />
                      <Pagination.Last onClick={() => handlePageChangeSbSearch(totalPagesSbSearch)} />
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
                    Stuffing Request Date
                  </label>
                  <div style={{ position: "relative" }}>
                    <DatePicker
                      selected={lastEntryContainer.stuffReqDate}
                      name="stuffReqDate"
                      onChange={(date) => handlePaymentDateChangeHeaderContainer(date, 'stuffReqDate')}
                      placeholderText="Request Date"
                      dateFormat="dd/MM/yyyy HH:mm"
                      timeInputLabel="Time:"
                      showTimeInput
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      className={`form-control ${validationErrorsContainer.length > 0 && validationErrorsContainer[validationErrorsContainer.length - 1]?.stuffReqDate ? 'error-border' : ''}`}
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
                      className={`form-control ${validationErrorsContainer.length > 0 && validationErrorsContainer[validationErrorsContainer.length - 1]?.shift ? 'error-border' : ''}`}
                      value={lastEntryContainer.shift}
                      onChange={(e) => handleHeaderChangeContainer('shift', e.target.value)}
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
                    value={lastEntryContainer.status === 'A' ? 'Approved' : ''}
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
                    value={lastEntryContainer.createdBy}
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
                    Container No <span className="error-message">*</span>
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
                      className={`${validationErrorsContainer.some(error => error.hasOwnProperty('containerNo')) ? 'error-border' : ''}`}
                      placeholder="Select ContainerNo"
                      isDisabled={lastEntryContainer.stuffReqId}
                      isClearable
                      id="containerNo"
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
                      value={lastEntryContainer.containerSize}
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
                      value={lastEntryContainer.containerType}
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
                    Container Health <span className="error-message">*</span>
                  </label>


                  <Input
                    type="select"
                    value={lastEntryContainer.containerHealth}
                    className={`form-control ${validationErrorsContainer.some(error => error.hasOwnProperty('containerHealth')) ? 'error-border' : ''}`}
                    onChange={(e) => handleHeaderChangeContainer('containerHealth', e.target.value)}
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
                    Voyage No <span className="error-message">*</span>
                  </label>
                  <CreatableSelect
                    value={selectedVoyageNoContainer}
                    // value={{ value: lastEntry.voyageNo, label: lastEntry.voyageNo }}
                    onChange={(selectedOption) => handleVoyageSelectContainer(selectedOption, 'voyageNo')}
                    // onInputChange={searchVoyageAndVia}

                    onInputChange={(inputValue, { action }) => {
                      if (action === 'input-change') {
                        searchVoyageAndVia(inputValue);
                      }
                    }}
                    options={vesselData}
                    onCreateOption={(inputValue) => { handleCreationSelectContainer(inputValue, 'voyageNo') }}
                    placeholder="Select Voyage No"
                    isClearable
                    id="voyageNo"
                    name='voyageNo'
                    className={`${validationErrorsContainer.some(error => error.hasOwnProperty('voyageNo')) ? 'error-border' : ''}`}
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
                    Via No <span className="error-message">*</span>
                  </label>
                  <CreatableSelect
                    value={selectedViaNoContainer}
                    // onChange={handleVoyageSelect}
                    // value={{ value: lastEntry.viaNo, label: lastEntry.viaNo }}
                    onChange={(selectedOption) => handleVoyageSelectContainer(selectedOption, 'viaNo')}
                    options={vesselData}
                    placeholder="Select Via No"
                    onInputChange={(inputValue, { action }) => {
                      if (action === 'input-change') {
                        searchVoyageAndVia(inputValue);
                      }
                    }}
                    onCreateOption={(inputValue) => { handleCreationSelectContainer(inputValue, 'viaNo') }}
                    isClearable
                    id="viaNo"
                    name='viaNo'
                    className={`${validationErrorsContainer.some(error => error.hasOwnProperty('viaNo')) ? 'error-border' : ''}`}
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
                    Vessel <span className="error-message">*</span>
                  </label>
                  <Input
                    className={`form-control ${validationErrorsContainer.some(error => error.hasOwnProperty('vesselName')) ? 'error-border' : ''}`}
                    type="text"
                    id="vesselName"
                    name='vesselName'
                    maxLength={50}
                    value={lastEntryContainer.vesselName}
                    onChange={(e) => handleHeaderChangeContainer('vesselName', e.target.value)}
                  />
                </FormGroup>
              </Col>

            </Row>






            <Row>

              <Col md={2}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="sbRequestId">
                    Terminal
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="service"
                    readOnly
                    maxLength={15}
                    name="viaNo"
                    value={lastEntryContainer.terminal}
                    tabIndex={-1}
                  />
                </FormGroup>
              </Col>


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
                    value={lastEntryContainer.shippingAgentName}
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
                    value={lastEntryContainer.shippingLineName}
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
                    Select Account Holder
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
                      className={`${validationErrorsContainer.some(error => error.hasOwnProperty('onAccountOf')) ? 'error-border' : ''}`}
                      placeholder="Select Account Holder"
                      isClearable
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
                  </div>
                </FormGroup>
              </Col>









              <Col md={2}>
                <FormGroup>
                  <label
                    className="forlabel bold-label"
                    htmlFor="sbRequestId"
                  >
                    Destination <span className="error-message">*</span>
                  </label>

                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      id="destination"
                      maxLength={20}
                      className={` form-control ${validationErrorsContainer.some(error => error.hasOwnProperty('destination')) ? 'error-border' : ''}`}
                      name="destination"
                      value={lastEntryContainer.destination}
                      onChange={(e) => handleHeaderChangeContainer('destination', e.target.value)}
                    />

                  </div>
                </FormGroup>
              </Col>


              <Col md={2}>

                <FormGroup>
                  <label
                    className="forlabel"
                    htmlFor="sbRequestId"
                  >
                    POD
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Select
                      options={pol}
                      value={selectedPol}
                      onChange={handlePolChange}
                      className={`${errors.pol ? 'error-border' : ''}`}
                      placeholder="Select port location"
                      isClearable
                      id="selectedPol"
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
                  </div>
                </FormGroup>
              </Col>

              <Col md={2}>
                <FormGroup>
                  <label
                    className="forlabel bold-label"
                    htmlFor="sbRequestId"
                  >
                    Custom Seal NO <span className="error-message">*</span>
                  </label>

                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      id="customSealNo"
                      maxLength={15}
                      className={` form-control ${validationErrorsContainer.some(error => error.hasOwnProperty('customSealNo')) ? 'error-border' : ''}`}
                      name="customSealNo"
                      value={lastEntryContainer.customSealNo}
                      onChange={(e) => handleHeaderChangeContainer('customSealNo', e.target.value)}
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
                    Agent Seal NO
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      id="agentSealNo"
                      maxLength={15}
                      className={` form-control ${validationErrorsContainer.some(error => error.hasOwnProperty('agentSealNo')) ? 'error-border' : ''}`}
                      name="agentSealNo"
                      value={lastEntryContainer.agentSealNo}
                      onChange={(e) => handleHeaderChangeContainer('agentSealNo', e.target.value)}
                    />
                  </div>
                </FormGroup>
              </Col>



              <Col md={2}>
                <FormGroup>
                  <label className="forlabel" for="HazardousHazardous">Stuffing Location</label>
                  <div style={{ position: 'relative' }}>
                    <Input
                      type="select"
                      name="shift"
                      className={`form-control`}
                      value={lastEntryContainer.stuffingLocation}
                      onChange={(e) => handleHeaderChangeContainer('stuffingLocation', e.target.value)}
                    >
                      <option value="BS">BS</option>
                    </Input>
                  </div>
                </FormGroup>
              </Col>


              <Col md={2}>
                <FormGroup>
                  <label className="forlabel" for="movementType">Movement Type</label>
                  <div style={{ position: 'relative' }}>
                    <Input
                      type="select"
                      name="shift"
                      className={`form-control`}
                      value={lastEntryContainer.movementType}
                      onChange={(e) => handleHeaderChangeContainer('movementType', e.target.value)}
                    >
                      <option value="PARTY">Party</option>
                      <option value="CFS">CFS</option>
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
                    Movement order Date
                  </label>
                  <div style={{ position: "relative" }}>
                    <DatePicker
                      selected={lastEntryContainer.movementOrderDate}
                      onChange={(date) => handlePaymentDateChangeHeaderContainer(date, 'movementOrderDate')}
                      name="movementOrderDate"
                      placeholderText="Movement order Date"
                      dateFormat="dd/MM/yyyy HH:mm"
                      timeInputLabel="Time:"
                      showTimeInput
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      className={`form-control`}
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
                    Placement Date
                  </label>
                  <div style={{ position: "relative" }}>
                    <DatePicker
                      selected={lastEntryContainer.placementDate}
                      onChange={(date) => handlePaymentDateChangeHeaderContainer(date, 'placementDate')}
                      name="placementDate"
                      placeholderText="Placement Date"
                      dateFormat="dd/MM/yyyy HH:mm"
                      timeInputLabel="Time:"
                      showTimeInput
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      className="form-control"
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
                  <label
                    className="forlabel bold-label"
                    htmlFor="sbRequestId"
                  >
                    Stuff Date
                  </label>
                  <div style={{ position: "relative" }}>
                    <DatePicker
                      selected={lastEntryContainer.stuffDate}
                      onChange={(date) => handlePaymentDateChangeHeaderContainer(date, 'stuffDate')}
                      name="stuffDate"
                      placeholderText="Stuff Date"
                      dateFormat="dd/MM/yyyy HH:mm"
                      timeInputLabel="Time:"
                      showTimeInput
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      className={`form-control ${errors.stuffDate ? 'error-border' : ''}`}
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

              {/* vessel search */}


              <Col md={2}>
                <FormGroup>
                  <label
                    className="forlabel bold-label"
                    htmlFor="sbRequestId"
                  >
                    Begin Date Time
                  </label>
                  <div style={{ position: "relative" }}>
                    <DatePicker
                      selected={lastEntryContainer.beginDateTime}
                      onChange={(date) => handlePaymentDateChangeHeaderContainer(date, 'beginDateTime')}
                      name="beginDateTime"
                      placeholderText="Begin Date Time"
                      dateFormat="dd/MM/yyyy HH:mm"
                      timeInputLabel="Time:"
                      showTimeInput
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      className={`form-control ${errors.beginDateTime ? 'error-border' : ''}`}
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
                    End Date Time
                  </label>
                  <div style={{ position: "relative" }}>
                    <DatePicker
                      selected={lastEntryContainer.endDateTime}
                      onChange={(date) => handlePaymentDateChangeHeaderContainer(date, 'endDateTime')}
                      name="endDateTime"
                      placeholderText="End Date Time"
                      dateFormat="dd/MM/yyyy HH:mm"
                      timeInputLabel="Time:"
                      showTimeInput
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      className={`form-control ${errors.endDateTime ? 'error-border' : ''}`}
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
                  <label className="forlabel bold-label" htmlFor="sbRequestId">
                    Rotation No
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    // id={lastEntryContainer.vesselId ? 'service' : ''}
                    // readOnly={lastEntryContainer.vesselId}
                    maxLength={15}
                    name="profitcentreId"
                    value={lastEntryContainer.rotationNo}
                    onChange={(e) => handleHeaderChangeContainer('rotationNo', e.target.value)}
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
                      selected={lastEntryContainer.rotationDate}
                      name="rotationDate"
                      placeholderText="Rotation date"
                      onChange={(date) => handlePaymentDateChangeHeaderContainer(date, 'rotationDate')}
                      dateFormat="dd/MM/yyyy HH:mm"
                      timeInputLabel="Time:"
                      showTimeInput
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      className={`form-control ${errors.rotationDate ? 'error-border' : ''}`}
                      wrapperClassName="custom-react-datepicker-wrapper"
                    // id={lastEntryContainer.vesselId ? 'service' : ''}
                    // disabled={lastEntryContainer.vesselId}
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
                  <label className="forlabel bold-label" htmlFor="sbRequestId">
                    Mty count wt <span className="error-message">*</span>
                  </label>
                  <input
                    className={` form-control ${validationErrorsContainer.some(error => error.hasOwnProperty('mtyCountWt')) ? 'error-border' : ''}`}
                    type="text"
                    maxLength={14}
                    name="mtyCountWt"
                    value={lastEntryContainer.mtyCountWt}
                    onChange={(e) => handleHeaderChangeContainer('mtyCountWt', e.target.value, 'decimal', 10, 3)}
                  />
                </FormGroup>
              </Col>
            </Row>








            <Row className="text-center mt-1 mb-1">
              <Col>
                <button
                  className="btn btn-outline-primary btn-margin newButton"
                  style={{ marginRight: 10 }}
                  id="submitbtn2"
                  onClick={(e) => handleSaveContainer(exportStuffRequestContainer)}
                >
                  <FontAwesomeIcon
                    icon={faSave}
                    style={{ marginRight: "5px" }}
                  />
                  Save
                </button>

                <button
                  className="btn btn-outline-danger btn-margin newButton"
                  style={{ marginRight: 10 }}
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
                  style={{ marginRight: 10 }}
                  id="submitbtn2"
                  onClick={(e) => handleAddRow(exportStuffRequestContainer)}
                >
                  <FontAwesomeIcon
                    icon={faAdd}
                    style={{ marginRight: "5px" }}
                  />
                  Add Detail
                </button>
              </Col>
            </Row>


















          </div>
          <hr />

          <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>

            <h5>HUB Container Wise Stuffing Request</h5>

            <Table className="table table-bordered" style={{ border: '2px solid black' }}>
              <thead className="tableHeader">
                <tr>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Sr No
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    IGM No
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    IGM Line No
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Importer
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    CHA
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Cargo Description
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Remark
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Commodity
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    No Of Pack
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Weight
                  </th>

                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Balance Pack
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Balance Weight
                  </th>

                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Stuffed Req Qty
                  </th>

                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Stuff Weight
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    SMTP flag
                  </th>
                </tr>
              </thead>
              <tbody>
                {exportStuffRequestContainer.map((cargoEntry, index) => (
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
                              searchIGMNOs(inputValue);
                            }
                          }}
                          className={`inputwidthTuka ${validationErrorsContainer[index]?.igmNo ? 'error-border' : ''}`}
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
                          value={cargoEntry.sbLineNo}
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
                        <Select
                          value={selectedCha[index]}
                          onChange={(selectedOption) => handleChaSelect(selectedOption, index)}
                          options={chaData}
                          placeholder="Select CHA"
                          onInputChange={(inputValue, { action }) => {
                            if (action === 'input-change') {
                              searchExporter(inputValue, 'cha');
                            }
                          }}
                          isClearable
                          id="cha"
                          name='cha'
                          className={`inputwidthTukaMax`}
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
                          value={cargoEntry.cargoDescription}
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
                          className={`inputwidthTuka form-control`}
                          maxLength={150}
                          value={cargoEntry.comments}
                          onChange={(e) => handleFieldChangeContainer(e, index, 'comments')}
                        />
                      </FormGroup>
                    </td>




                    <td>
                      <FormGroup>
                        <Select
                          value={selectedCommodity[index]}
                          onChange={(selectedOption) => handleCommoditySelect(selectedOption, index)}
                          options={cargoTypes}
                          placeholder="Select Commodity"
                          isClearable
                          id="cha"
                          name='cha'
                          className={`inputwidthTukaMax`}
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
                          value={cargoEntry.noOfPackages}
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
                          value={cargoEntry.balanceQuantity}
                          className={`inputwidthTuka form-control`}
                          disabled
                          id="service"
                        />
                      </FormGroup>
                    </td>


                    <td>
                      <FormGroup>
                        <Input
                          type="text"
                          value={cargoEntry.balanceWeight}
                          className={`inputwidthTuka form-control`}
                          disabled
                          id="service"
                        />
                      </FormGroup>
                    </td>






                    <td>
                      <FormGroup>
                        <Input
                          type="text"
                          className={`inputwidthTuka form-control ${validationErrorsContainer[index]?.noOfPackagesStuffed ? 'error-border' : ''}`}
                          maxLength={8}
                          value={cargoEntry.noOfPackagesStuffed}
                          onChange={(e) => handleFieldChangeContainer(e, index, 'noOfPackagesStuffed', 'number', 8, 0)}
                          onBlur={() => checkMaxQuantityContainer(index)}
                        />
                      </FormGroup>
                    </td>


                    <td>
                      <FormGroup>
                        <Input
                          type="text"
                          className={`inputwidthTuka form-control ${validationErrorsContainer[index]?.totalCargoWeight ? 'error-border' : ''}`}
                          maxLength={13}
                          value={cargoEntry.totalCargoWeight}
                          onChange={(e) => handleFieldChangeContainer(e, index, 'totalCargoWeight', 'decimal', 10, 2)}
                          onBlur={() => checkMaxWeightContainer(index)}
                        />
                      </FormGroup>
                    </td>

                    <td className="text-center">
                      <FormGroup>
                        <Input
                          className={`form-control`}
                          type="checkbox"
                          name='smtpFlag'
                          checked={cargoEntry.smtpFlag === 'Y'}
                          onChange={(e) => handleFieldChangeContainer(e, index, 'smtpFlag')}
                          style={{ width: '20px', height: '24px', cursor: 'pointer', margin: '0' }}
                        />
                      </FormGroup>
                    </td>

                  </tr>
                ))}
              </tbody>

            </Table>
          </div>







        </div>



      </div >


    </>
  );
}

export default HubClp;
