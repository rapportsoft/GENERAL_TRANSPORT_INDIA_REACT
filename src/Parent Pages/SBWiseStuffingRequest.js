import AuthContext from "../Components/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import Select from "react-select";
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
  faReceipt,
  faTruckPickup,
  faTruck,
  faEdit,
  faTimesCircle,
  faPrint
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/style.css";
import "../Components/Style.css";
import { Button } from "react-bootstrap";
import useAxios from "../Components/useAxios";
import cfsService from '../service/CFSService';
import movementService from "../service/MovementService";

import { toast } from "react-toastify";
import ipaddress from "../Components/IpAddress";

function SBWiseStuffingRequest({ searchData, resetFlag, updatePagesList }) {
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


  const processId = 'P00220';

  const foundRights =
    role !== "ROLE_ADMIN"
      ? userRights.find((item) => item.process_Id === processId)
      : null;
  const allowCreate = foundRights?.allow_Create === "Y";
  const allowRead = foundRights?.allow_Read === "Y";
  const allowEdit = foundRights?.allow_Update === "Y";
  const allowDelete = foundRights?.allow_Delete === "Y";






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
    if (searchData && searchData.activeTab === processId && searchData.sbNo && searchData.containerNo) {
      setMainSearch((prev) => {
        const updatedSearch = {
          ...prev,
          containerNo: searchData.containerNo,
          sbNo: searchData.sbNo,
          type: 'S',
          operation: 'sb',
        };

        // Call handleMainSBSearch with the updated search state
        handleMainSBSearch(updatedSearch);

        return updatedSearch;
      });
    }
  }, [searchData, processId]);






  useEffect(() => {
    if (resetFlag) {
      handleReset();
    }
  }, [resetFlag]);



  // handleMainSBSearch


  const [enableTab, setEnableTab] = useState('');
  const [isSearchData, setIsSearchData] = useState(false);








  useEffect(() => {
    const fetchData = async () => {
      await getProgitCenterById('N00004');
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // if (enableTab === 'container') {

      if (mainSearch.operation === 'container') {
        await getContainerHealth('J00001');
      }
    };
    fetchData();
  }, [mainSearch.operation]);






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
      // console.log('response.data \n', response.data);

      return response.data;
    } catch (error) {
      console.error('Error fetching port data:', error);
    }
  };





  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});



  const [totals, setTotals] = useState({
    packages: 0,
    cargoWeight: 0
  });

  const [totalsContainer, setTotalsContainer] = useState({
    packages: 0,
    cargoWeight: 0
  });




  const initialExportStuffRequest = {
    companyId: companyid,
    branchId: branchId,
    finYear: '',
    stuffReqId: '',
    sbTransId: '',
    stuffReqLineId: 0,
    sbLineNo: '',
    profitcentreId: 'N00004',
    stuffReqDate: new Date(),
    sbNo: '',
    sbDate: null,
    shift: 'Day',
    stuffTally: 'N',
    totalCargoWeight: 0,
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
    tareWeight: 0,
    containerSize: '',
    containerType: '',
    pod: '',
    comments: '',
    typeOfPackage: '',
    noOfPackages: 0,
    noOfPackagesStuffed: 0,
    contStuffPackages: 0,
    cbm: '',
    containerNo: '',
    currentLocation: '',
    periodFrom: '',
    containerHealth: '',
    cargoWeight: 0,
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
    deliveryOrderNo: '',
    containerGateInDate: null,
    rotationNo: '',
    rotationDate: null,
    shippingLineName: '',
    shippingAgentName: '',
    onAccountName: '',
    selected: 'N',
    vesselName: ''
  };

  const [exportStuffRequest, setExportStuffRequest] = useState([initialExportStuffRequest]);
  const [exportStuffRequestContainer, setExportStuffRequestContainer] = useState([initialExportStuffRequest]);
  const [preExportStuffRequestContainer, setPreExportStuffRequestContainer] = useState([]);
  const [preExportStuffRequest, setPreExportStuffRequest] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);



  useEffect(() => {
    const totalStuffPackages = selectedItems.reduce((acc, item) => acc + (Number(item.noOfPackagesStuffed) || 0), 0);
    const totalStuffWeight = selectedItems.reduce((acc, item) => acc + (Number(item.cargoWeight) || 0), 0);

    setTotals({
      packages: totalStuffPackages,
      cargoWeight: totalStuffWeight
    });
  }, [selectedItems]);


  useEffect(() => {
    const totalStuffPackages = exportStuffRequestContainer.reduce((acc, item) => acc + (Number(item.noOfPackagesStuffed) || 0), 0);
    const totalStuffWeight = exportStuffRequestContainer.reduce((acc, item) => acc + (Number(item.cargoWeight) || 0), 0);

    setTotalsContainer({
      packages: totalStuffPackages,
      cargoWeight: totalStuffWeight
    });
  }, [exportStuffRequestContainer]);








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

        setEnableTab('');
        toast.error('No Data Found', {
          position: 'top-center',
          autoClose: 1000,
        });
        setExportStuffRequest([initialExportStuffRequest]);
        return;
      }

      if (searchParameter.type === 'N') {
        convertToExportStuffRequest(response);
        setEnableTab('sb');
      } else {
        const result = response.data[0];
        setEnableTab('sb');
        setSelectedViaNo({ value: result?.viaNo, label: result?.viaNo });
        setSelectedVoyageNo({ value: result?.voyageNo, label: result?.voyageNo });

        setSelectedItems(response.data)
        setExportStuffRequest(response.data);
        setPreExportStuffRequest(response.data);
      }

      // console.log('response : \n', response.data);
    } catch (error) {
      console.error('Error fetching data: ', error.message);
      setEnableTab('');
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










  const lastEntryWithId = exportStuffRequest.slice().reverse().find(entry => entry.stuffReqId && entry.stuffReqId.trim().length > 0);

  // If found, use it as lastEntry; otherwise, use the last entry in the array
  const lastEntry = lastEntryWithId || exportStuffRequest[exportStuffRequest.length - 1];



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


  const handleKeyDown = (event, index, fieldName) => {
    if (event.key === 'Enter') {
      handlePaymentDateChange(new Date(), index, fieldName);
    }
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


  const handleFieldChange = (e, index, fieldName, type, maxIntegerDigits, maxDecimalDigits) => {
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
    setExportStuffRequest(prevState => {
      const updatedTransDtl = [...prevState];
      updatedTransDtl[index] = {
        ...updatedTransDtl[index],
        [fieldName]: value,
      };

      // Calculate average cargo weight if fieldName is noOfPackagesStuffed
      if (fieldName === 'noOfPackagesStuffed') {
        const noOfPackages = parseInt(lastEntry.noOfPackages || 0);
        const totalCargoWeight = parseFloat(lastEntry.totalCargoWeight || 0);

        // console.log('noOfPackages ', noOfPackages, ' totalCargoWeight ', totalCargoWeight);

        if (noOfPackages > 0) {
          const weightPerPackage = totalCargoWeight / noOfPackages;
          const noOfPackagesStuffed = parseInt(value || 0);
          const averageCargoWeight = (weightPerPackage * noOfPackagesStuffed).toFixed(2);


          // console.log('averageCargoWeight ', averageCargoWeight);
          updatedTransDtl[index].cargoWeight = parseFloat(averageCargoWeight); // Update cargoWeight for exportStuffRequest



          // const weightPerPackage = totalCargoWeight / noOfPackages;
          // const noOfPackagesStuffed = parseInt(value || 0);
          // const averageCargoWeight = (weightPerPackage * noOfPackagesStuffed).toFixed(2);
          // // console.log('averageCargoWeight Container', averageCargoWeight);
          // updatedTransDtl[index].cargoWeight = parseFloat(averageCargoWeight);



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

      // Update corresponding entry in selectedItems if containerNo matches
      const containerNo = updatedTransDtl[index].containerNo; // Assuming containerNo exists in the entry
      const selectedItemIndex = selectedItems.findIndex(item => item.containerNo === containerNo);

      if (selectedItemIndex !== -1) {
        const updatedSelectedItems = [...selectedItems];
        updatedSelectedItems[selectedItemIndex] = {
          ...updatedSelectedItems[selectedItemIndex], // Keep existing fields
          ...updatedTransDtl[index], // Update with the current entry's fields
        };
        setSelectedItems(updatedSelectedItems);
      }
      return updatedTransDtl;
    });
  };




  const checkMaxQuantity = (index) => {
    const currentEntry = exportStuffRequest[index];
    const currentPreEntry = preExportStuffRequest[index];
    // const maxQty = currentEntry?.noOfPackages - currentEntry?.contStuffPackages;
    const maxQty = (currentEntry?.noOfPackages - currentEntry?.contStuffPackages) + (currentPreEntry?.noOfPackagesStuffed || 0);

    const qtyTakenIn = parseFloat(currentEntry.noOfPackagesStuffed);

    if (qtyTakenIn > maxQty) {
      toast.warning(<div dangerouslySetInnerHTML={{ __html: `Enter Valid Quantity:: Remaining Qty:<strong> ${maxQty} </strong>` }} />, {
        position: 'top-center',
        autoClose: 1000,
        style: { width: '29vw' },
      });
      setValidationErrors(prevErrors => {
        const updatedErrors = [...prevErrors]; // Create a shallow copy of the previous errors array
        if (!updatedErrors[index]) {
          updatedErrors[index] = {}; // Initialize the index if it's undefined or null
        }
        updatedErrors[index]['noOfPackagesStuffed'] = 'Exceeds maximum quantity'; // Set the error message
        return updatedErrors; // Return the updated errors array
      });
    }
  };

  const checkMaxWeight = (index) => {
    const currentEntry = exportStuffRequest[index];
    // const currentPreEntry = preExportStuffRequest[index];
    const maxWeight = parseFloat(currentEntry?.totalCargoWeight);
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
    }
  };






  // selection of check boxes...
  // Function to handle individual checkbox change
  const handleRowCheckboxChange = (invoice) => {
    const isChecked = selectedItems.some((item) => item.containerNo === invoice.containerNo);

    if (isChecked) {
      const updatedSelectedItems = selectedItems.filter((item) => item.containerNo !== invoice.containerNo);
      setSelectedItems(updatedSelectedItems);
    } else {
      setSelectedItems([...selectedItems, invoice]);
    }
  };

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


  // // console.log('validationErrors ', validationErrors);



  // lololol
  const handleSave = async (exportStuffRequest) => {

    if (!Array.isArray(exportStuffRequest) || exportStuffRequest.length === 0) {
      toast.warning('please select container!', {
        position: 'top-center',
        autoClose: 700,
      });
      return;
    }

    // // console.log('totals.packages > lastEntry.noOfPackages ', totals.packages, lastEntry.noOfPackages);

    if (totals.packages > lastEntry.noOfPackages) {
      toast.warning('Stuffing packages cannot greater than a Sb packages!', {
        position: 'top-center',
        autoClose: 1000,
        style: { width: '29vw' },
      });
      return;
    }

    // // console.log('totals.cargoWeight > lastEntry.totalCargoWeight ', totals.cargoWeight, lastEntry.totalCargoWeight);


    if (totals.cargoWeight > lastEntry.totalCargoWeight) {
      toast.warning('Stuffing weight cannot greater than a SB weight!', {
        position: 'top-center',
        autoClose: 1000,
        style: { width: '29vw' },
      });
      return;
    }




    if (!validateExportStuffing(exportStuffRequest)) {
      toast.warning('Please enter required fields!', {
        position: 'top-center',
        autoClose: 1000,
        // style: { width: '29vw' },
      });
      return false;
    }

    setLoading(true);
    try {
      const response = await CFSService.saveExportStuffRequest(companyid, branchId, userId, exportStuffRequest, jwtToken);

      setExportStuffRequest(response.data);
      setSelectedItems(response.data);
      setPreExportStuffRequest(response.data);
      // // console.log('Response:', response.data);

      if (searchData && (searchData.sbNo || searchData.container)
      ) {
        updatePagesList("P00220");
      }

      toast.success('Data added Successfully!', {
        position: 'top-center',
        autoClose: 700,
      });
    } catch (error) {
      toast.error('Oops something went wrong!', {
        position: 'top-center',
        autoClose: 700,
      });
    } finally {
      setLoading(false);
    }
  };



  // const handleReset = async () => {
  //   setErrors([]);
  //   setValidationErrors([]);
  //   setExportStuffRequest([initialExportStuffRequest]);
  //   setSelectedViaNo(null);
  //   setSelectedItems([]);
  //   setSelectedVoyageNo(null);
  //   setPreExportStuffRequest([]);
  // };







  const handlePaymentDateChangeHeader = async (date, fieldName) => {
    setExportStuffRequest(prevRequest =>
      prevRequest.map(item => ({
        ...item,
        [fieldName]: date
      }))
    );
  };


  const handleHeaderChange = (fieldName, value) => {
    // Update exportStuffRequest state
    setExportStuffRequest(prevRequest =>
      prevRequest.map(item => ({
        ...item,
        [fieldName]: value  // Update the specified field with the new value
      }))
    );

    // Update selectedItems state
    setSelectedItems(prevSelected =>
      prevSelected.map(item => ({
        ...item,
        [fieldName]: value  // Update the specified field with the new value
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

        setEnableTab('');
        toast.error('No Data Found', {
          position: 'top-center',
          autoClose: 1000,
        });
        setExportStuffRequestContainer([initialExportStuffRequest]);
        return;
      }

      if (searchParameter.type === 'N') {
        convertToExportStuffRequestContainerWise(response);
        setEnableTab('container');
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
        setSelectedPod(initialSelectedPods);


        setEnableTab('container');
        setSelectedViaNoContainer({ value: result?.viaNo, label: result?.viaNo });
        setSelectedVoyageNoContainer({ value: result?.voyageNo, label: result?.voyageNo });
        setSelectedContainerHealth({ value: result?.containerHealth, label: result?.containerHealth })
        setExportStuffRequestContainer(response.data);
        setPreExportStuffRequestContainer(response.data);
      }
    } catch (error) {
      console.error('Error fetching data: ', error.message);
      setEnableTab('');
      alert(error.message);
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

  console.log('exportStuffRequestContainer \n', exportStuffRequestContainer, ' \n lastEntryWithIdContainer \n', lastEntryWithIdContainer, ' \n lastEntryContainer \n', lastEntryContainer);
  


  const getContainerHealth = async (jarId) => {
    const portType = await getjarByJarId(jarId);
    setContainerHealthData(portType);
  };


  // ContainerWise Stuffing request
  const handleContainerNoSearch = async (searchValue) => {
    // console.log('handleContainerNoSearch ', searchValue);
    if (!searchValue) {
      setContainerData([]);
      return;
    }
    try {
      const response = await CFSService.searchContainerNoForStuffingContainerWise(companyid, branchId, searchValue, profitcentre.profitcentreId, jwtToken);
      const data = response.data;

      // console.log('ContainerData ', data);

      setContainerData(data);
    } catch (error) {
      setVesselData([]);
      console.error('Error searching ContainerData:', error);
    }
  };



  const handleContainerNoSelect = async (selectedOption) => {
    // Update selected values
    setSelectedContainerNo(selectedOption ? { value: selectedOption.containerNo, label: selectedOption.containerNo } : null);

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
        tareWeight: selectedOption.tareWeight,
        inGateInDate: selectedOption.inGateInDate,
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
        inGateInDate: '',
        deliveryOrderNo: '',
        gateInId: ''
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


  // console.log('exportStuffRequestContainer : \n', exportStuffRequestContainer);


  const searchSbNos = async (searchvalue) => {
    if (!searchvalue) {
      setSbNos([]);
      return;
    }
    try {
      const response = await CFSService.searchSbNoForStuffing(companyid, branchId, searchvalue, profitcentre.profitcentreId, lastEntryContainer.stuffReqId, jwtToken);
      setSbNos(response.data);
    } catch (error) {
      console.error("Error fetching SB entries:", error);
    }
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
          typeOfPackage:''
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
          contStuffPackages,
          commodity,
          noOfPackages,
          pod,
          grossWeight,
          typeOfPackage
        } = selectedOption;

        // Update the specific index with the new values
        newContainer[index] = {
          ...newContainer[index],
          sbNo: sbNo,
          sbLineNo: sbLineNo,
          sbTransId: sbTransId,
          exporterId: exporterId,
          exporterName: exporterName,
          sbDate: new Date(sbDate),
          contStuffPackages: contStuffPackages,
          cargoDescription: commodity,
          noOfPackages: noOfPackages,
          pod: pod,
          totalCargoWeight: grossWeight,
          cargoWeight: 0,
          noOfPackagesStuffed: 0,
          typeOfPackage: typeOfPackage
        };
      }

      return newContainer; // Return the updated container
    });

    // Optionally, clear sbNos if needed
    setSbNos([]); // Clear the sbNos if that is intended
  };




  const validateExportStuffingContainer = (exportStuffRequest) => {
    let errors = [];

    exportStuffRequest.forEach((detail, index) => {
      const { sbNo, sbLineNo, containerHealth, stuffReqDate, noOfPackagesStuffed, cargoWeight, vesselName, viaNo, voyageNo, totalCargoWeight, noOfPackages, contStuffPackages } = detail;
      let error = {};
      // console.log('vesselName ', vesselName);

      if (!vesselName) { error.vesselName = 'vesselName is required'; }
      if (!viaNo) error.viaNo = 'viaNo is required.';
      if (!voyageNo) error.voyageNo = 'voyageNo is required.';
      if (!cargoWeight) error.cargoWeight = 'cargoWeight is required.';
      if (!noOfPackagesStuffed) error.noOfPackagesStuffed = 'noOfPackagesStuffed is required.';
      if (!sbNo) error.sbNo = 'sbNo is required.';
      if (!sbLineNo) error.sbLineNo = 'sbLineNo is required.';
      if (!containerHealth) error.containerHealth = 'containerHealth is required.';


      // const currentPreEntry = preExportStuffRequestContainer[index];

      const currentPreEntry = preExportStuffRequestContainer.find(
        (entry) => entry.sbNo == sbNo && entry.sbLineNo == sbLineNo
      );


      // console.log('index ', index, ' \n ', preExportStuffRequestContainer);
      // New validation #1: noOfPackagesStuffed <= (noOfPackages - contStuffPackages)
      const noOfPackagesStuffedNum = Number(noOfPackagesStuffed);
      const noOfPackagesNum = Number(noOfPackages);
      const contStuffPackagesNum = Number(contStuffPackages);
      const noOfPackagesStuffedNumPre = Number(currentPreEntry ? currentPreEntry.noOfPackagesStuffed : 0);

      // console.log('noOfPackagesStuffedNumPre ', noOfPackagesStuffedNumPre);

      if (
        isNaN(noOfPackagesStuffedNum) || isNaN(noOfPackagesNum) || isNaN(contStuffPackagesNum) ||
        noOfPackagesStuffedNum > (noOfPackagesNum - contStuffPackagesNum + noOfPackagesStuffedNumPre)
      ) {
        error.noOfPackagesStuffed = `noOfPackagesStuffed should not exceed ${noOfPackagesNum - contStuffPackagesNum}.`;
      }

      // New validation #2: cargoWeight <= totalCargoWeight
      const cargoWeightNum = Number(cargoWeight);
      const totalCargoWeightNum = Number(totalCargoWeight);

      if (isNaN(cargoWeightNum) || isNaN(totalCargoWeightNum) || cargoWeightNum > totalCargoWeightNum) {
        error.cargoWeight = `cargoWeight should not exceed ${totalCargoWeightNum}.`;
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

    // console.log('container Export : \n', exportStuffRequestContainer);

    if (!validateExportStuffingContainer(exportStuffRequest)) {
      toast.warning('Please enter required fields!', {
        position: 'top-center',
        autoClose: 1000,
      });
      // console.log('validationErrorsContainer : \n', validationErrorsContainer);
      return false;
    }
    setLoading(true);
    try {
      const response = await CFSService.saveExportStuffRequestContainer(companyid, branchId, userId, exportStuffRequest, jwtToken);

      setExportStuffRequestContainer(response.data);
      setPreExportStuffRequestContainer(response.data);

      if (searchData && (searchData.sbNo || searchData.container)
      ) {
        updatePagesList("P00220");
      }
      // console.log('saveExportStuffRequestContainer : \n', response.data);
      toast.success('Data added Successfully!', {
        position: 'top-center',
        autoClose: 700,
      });


      return { success: true, cargoGateIns: response.data };
    } catch (error) {

      if (error.response && error.response.status === 400) { // Check if error response exists
        const errorMessage = error.response.data;


        // Extract SrNo and sbNo from the error message for targeted validation
        const match = errorMessage.match(/SrNo: (\d+) and SB No: (\d+)/);
        if (match) {


          const srNo = parseInt(match[1], 10);
          const sbNo = match[2];

          const errorMessageNew = `Duplicate SB No found for SrNo: <strong>${srNo}</strong> and SB No: <strong>${sbNo}</strong>`;
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
            newErrors[errorIndex] = { ...newErrors[errorIndex], sbNo: `Duplicate SB No: ${sbNo}` };
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

      return { success: false, cargoGateIns: null }; // Return false if an error occurs

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




  const handleHeaderChangeContainer = (fieldName, value) => {
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
      }
      : { vesselId: '', voyageNo: '', viaNo: '', vesselName: '', rotationDate: null, gateOpenDate: null, berthingDate: null, rotationNo: '' };

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
        const totalCargoWeight = parseFloat(currentEntry.totalCargoWeight || 0);

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
      setValidationErrorsContainer(prevErrors => {
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
    const currentEntry = exportStuffRequestContainer[index];
    // const currentPreEntry = preExportStuffRequestContainer[index];


    const currentPreEntry = preExportStuffRequestContainer.find(
      (entry) => entry.sbNo == currentEntry.sbNo && entry.sbLineNo == currentEntry.sbLineNo
    );

    const maxQty = (currentEntry?.noOfPackages - currentEntry?.contStuffPackages) + (currentPreEntry?.noOfPackagesStuffed || 0);

    // // console.log('maxQty ',maxQty , ' currentEntry?.noOfPackages ',currentEntry?.noOfPackages, ' currentEntry?.contStuffPackages ',currentEntry?.contStuffPackages, ' currentPreEntry?.noOfPackagesStuffed ',currentPreEntry?.noOfPackagesStuffed);

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
    // const currentPreEntry = preExportStuffRequest[index];   
    const maxWeight = parseFloat(currentEntry?.totalCargoWeight);
    const cargoWeight = parseFloat(currentEntry.cargoWeight);

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
      stuffReqDate:  saveRecord.stuffReqDate ? new Date(saveRecord.stuffReqDate) : null,
      // status:  saveRecord.status, 
      createdBy: saveRecord.createdBy,
      // profitcenterId: saveRecord.profitCenterId,
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
      tareWeight: saveRecord.tareWeight,
      inGateInDate: saveRecord.inGateInDate ? new Date(saveRecord.inGateInDate) : null,
      deliveryOrderNo: saveRecord.deliveryOrderNo,
      gateInId: saveRecord.gateInId,
      rotationDate: saveRecord.rotationDate ? new Date(saveRecord.rotationDate) : null,
      gateOpenDate: saveRecord.gateOpenDate ? new Date(saveRecord.gateOpenDate) : null,
      berthingDate: saveRecord.berthDate ? new Date(saveRecord.berthDate) : null,
      rotationNo: saveRecord.rotationNo,
    };



    // Add the new entry to the state
    setExportStuffRequestContainer([...cargoGateIns, newCargoEntry]);
  };








  // const handleResetContainer = async () => {
  //   setErrors([]);
  //   setValidationErrorsContainer([]);
  //   setExportStuffRequestContainer([initialExportStuffRequest]);
  //   setSelectedViaNoContainer(null);
  //   setSelectedVoyageNoContainer(null);
  //   setSelectedContainerHealth(null);
  //   setSelectedContainerNo(null);
  //   setPreExportStuffRequestContainer([]);
  // };

  const handleReset = async () => {


    // setMainSearch({
    //   companyId: companyid,
    //   branchId: branchId,
    //   profitcentreId: 'N00004',
    //   operation: 'sb',
    //   sbNo: '',
    //   containerNo: '',
    //   type: 'N'
    // });


    setMainSearch((prev) => ({
      ...prev,
      ...(searchData &&
        searchData.activeTab === processId &&
        (searchData.containerNo || searchData.sbNo)
        ? prev // Keep existing values if the condition is met
        : {
          companyId: companyid,
          branchId: branchId,
          profitcentreId: 'N00004',
          operation: 'sb',
          sbNo: '',
          containerNo: '',
          type: 'N',
        }),
    }));

    setEnableTab('');

    setErrors([]);
    setValidationErrors([]);
    setExportStuffRequest([initialExportStuffRequest]);
    setSelectedViaNo(null);
    setSelectedItems([]);
    setSelectedVoyageNo(null);
    setPreExportStuffRequest([]);

    setValidationErrorsContainer([]);
    setExportStuffRequestContainer([initialExportStuffRequest]);
    setSelectedViaNoContainer(null);
    setSelectedVoyageNoContainer(null);
    setSelectedContainerHealth(null);
    setSelectedContainerNo(null);
    setPreExportStuffRequestContainer([]);

    const clearedPod = selectedPod.map(() => null);
    setSelectedPod(clearedPod);
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
  const [selectedPod, setSelectedPod] = useState([]);
// console.log('exportstuffContainer', exportStuffRequestContainer);


  const handlePodSelect = async (selectedOption, index) => {
    // Update selected values for viaNo and voyageNo index-wise
    setSelectedPod(prevState => {
      const updatedState = [...prevState];
      updatedState[index] = selectedOption;
      return updatedState;
    });

    // Prepare updates based on selected option
    const updates = selectedOption
      ? {
        pod: selectedOption.label,
      }
      : { pod: '' };

    // Update exportMovement at the specified index
    setExportStuffRequestContainer(prevState => {
      return prevState.map((item, idx) => {
        if (idx === index) {
          return { ...item, ...updates }; // Update the specific index
        }
        return item; // Return other items unchanged
      });
    });

    // Update validationErrors state for the specific index
    setValidationErrorsContainer(prevErrors => {
      return prevErrors.map((error, idx) => {
        if (idx === index) {
          const updatedError = { ...error }; // Copy the error object
          // Remove specific field errors
          delete updatedError.pod;
          return updatedError; // Return the updated error object
        }
        return error; // Return other errors unchanged
      });
    });
  };



  const handleCreationSelectPod = async (inputValue, fieldName, index) => {
    const updates = { [fieldName]: inputValue }; // Dynamically set the field name

    setSelectedPod(prevState => {
      const updatedState = [...prevState];
      updatedState[index] = { value: inputValue, label: inputValue };
      return updatedState;
    });

    // Update exportMovement at the specified index
    setExportStuffRequestContainer(prevState =>
      prevState.map((item, idx) => {
        if (idx === index) {
          return { ...item, ...updates }; // Update only the specified index
        }
        return item; // Leave other items unchanged
      })
    );

    // Update validationErrors state for the specified index
    setValidationErrorsContainer(prevErrors =>
      prevErrors.map((error, idx) => {
        if (idx === index) {
          const updatedError = { ...error };
          delete updatedError.pod; // Remove validation error for the specific field
          return updatedError; // Return the updated error
        }
        return error; // Leave other errors unchanged
      })
    );
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
        {!enableTab && (
          <div>
            <Row>
              <Col md={2}>
                <FormGroup>
                  <label className="forlabel" for="HazardousHazardous">Stuffing Request Type</label>
                  <Input
                    type="select"
                    name="operation"
                    className={`form-control`}
                    value={mainSearch.operation}
                    onChange={handleMainSearchChange}
                  >
                    <option value="sb">SBWise</option>
                    <option value="container">ContainerWise</option>
                  </Input>
                </FormGroup>
              </Col>


              {mainSearch.operation === 'container' && (
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel" for="HazardousHazardous">Container No <span className="error-message">*</span></label>
                    <Input
                      type="text"
                      name="containerNo"
                      className={`form-control`}
                      value={mainSearch.containerNo}
                      id={searchData.containerNo ? 'service' : ' '}
                      readOnly={searchData.containerNo}
                      onChange={handleMainSearchChange}
                      maxLength={20}
                    >
                    </Input>
                  </FormGroup>
                </Col>


              )}

              {mainSearch.operation === 'sb' && (

                <>

                  <Col md={2}>
                    <FormGroup>
                      <label className="forlabel bold-label" htmlFor="sbRequestId">
                        SB No<span className="error-message">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="sbNo"
                        maxLength={15}
                        value={mainSearch.sbNo}
                        onChange={handleMainSearchChange}
                        id={searchData.sbNo ? 'service' : ' '}
                        readOnly={searchData.sbNo}
                      />
                    </FormGroup>
                  </Col>

                </>
              )}

              <Col md={2}>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <label className="forlabel bold-label">
                        New
                      </label><br />
                      <input
                        type="radio"
                        className="form-check-input radios"
                        style={{ width: 20, height: 20 }}
                        name='type'
                        value='N'
                        checked={mainSearch.type === 'N'}
                        onChange={handleMainSearchChange}
                        disabled={!!searchData.containerNo}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <label className="forlabel bold-label">
                        Saved
                      </label><br />
                      <input
                        type="radio"
                        className="form-check-input radios"
                        style={{ width: 20, height: 20 }}
                        name='type'
                        value='S'
                        checked={mainSearch.type === 'S'}
                        onChange={handleMainSearchChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>




              <Col md={2} style={{ marginTop: 22 }}>
                <button
                  className="btn btn-outline-primary btn-margin newButton"
                  style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  id="submitbtn2"
                  onClick={() => handleMainSBSearch(mainSearch)}
                >
                  <FontAwesomeIcon icon={faSearch} size="sm" />
                </button>
              </Col>



            </Row>

          </div>

        )}








        {enableTab === 'sb' && (
          <div className='SBWiseStuffingRequest'>

            <div>
              {/* <h5
              className="pageHead"
              style={{
                fontFamily: "Your-Heading-Font",
                paddingLeft: "2%",
                paddingRight: "-20px",
              }}
            >
              {" "}
              <FontAwesomeIcon
                icon={faReceipt}
                style={{
                  marginRight: "8px",
                  color: "black",
                }}
              />
              SB Wise Stuffing Request
            </h5>
            <hr /> */}
              <Row>
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                      SB Trans Id
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="service"
                      readOnly
                      value={lastEntry.sbTransId}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                      SB No
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="sbNo"
                      maxLength={15}
                      value={lastEntry.sbNo}
                      onChange={handleSearchChange}
                      id="service"
                      readOnly
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
                      Sb Date
                    </label>
                    <div style={{ position: "relative" }}>
                      <DatePicker
                        selected={lastEntry.sbDate}
                        id="service"
                        name="gateOpenDate"
                        placeholderText="Sb Date"
                        dateFormat="dd/MM/yyyy HH:mm"
                        timeInputLabel="Time:"
                        showTimeInput
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        className={`form-control ${errors.sbDate ? 'error-border' : ''}`}
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
                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                      Comodity
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="service"
                      readOnly
                      maxLength={15}
                      value={lastEntry.cargoDescription}
                      tabIndex={-1}
                    />
                  </FormGroup>
                </Col>





                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="status"
                    >
                      Status
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="service"
                      maxLength={15}
                      readOnly
                      name="status"
                      value={lastEntry.status === 'A' ? 'Approved' : lastEntry.status === 'N' ? 'New' : ''}
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
                      {/* <span className="error-message"></span> */}
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
                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                      Exporter
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="service"
                      readOnly
                      maxLength={15}
                      name="viaNo"
                      value={lastEntry.exporterName}
                      tabIndex={-1}
                    />
                  </FormGroup>
                </Col>

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
                      value={lastEntry.terminal}
                      tabIndex={-1}
                    />
                  </FormGroup>
                </Col>
















                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                      SA
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
                      SL
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
                      SB Packages
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="service"
                      readOnly
                      maxLength={15}
                      name="igmNo"
                      value={lastEntry.noOfPackages}
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




              </Row>

              <Row>

                {/* vessel search */}




                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                      On Account of
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="service"
                      maxLength={15}
                      readOnly
                      tabIndex={-1}
                      value={lastEntry.onAccountName}
                    />
                  </FormGroup>
                </Col>

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
                        onChange={(date) => handlePaymentDateChangeHeader(date, 'berthDate')}
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



              <Row>


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




              <Row className="text-center mt-1 mb-1">
                <Col>
                  <button
                    className="btn btn-outline-primary btn-margin newButton"
                    style={{ marginRight: 10 }}
                    id="submitbtn2"
                    onClick={(e) => handleSave(selectedItems)}
                  >
                    <FontAwesomeIcon
                      icon={faSave}
                      style={{ marginRight: "5px" }}
                    />
                    Save
                  </button>

                  <button
                    className="btn btn-outline-danger btn-margin newButton"
                    style={{ marginRight: 10, fontSize: 13 }}
                    id="submitbtn2"
                    onClick={handleReset}
                  >
                    <FontAwesomeIcon
                      icon={faBackward}
                      style={{ marginRight: "5px" }}
                    />
                    Back
                  </button>
                  <button
                    className="btn btn-outline-success btn-margin newButton"
                    style={{ marginRight: 10, fontSize: 13 }}
                    id="submitbtn2"
                    disabled={lastEntry.stuffReqId === ''}
                    onClick={downloadSbWiseStuffReport}
                  >
                    <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
                    Print Report
                  </button>
                </Col>
              </Row>


















            </div>
            <hr />

            <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>

              <h5>Stuffing Request Container Details</h5>

              <Table className="table table-bordered" style={{ border: '2px solid black' }}>
                <thead className="tableHeader">
                  <tr>
                    <th scope="col" className="text-center" style={{ color: "black" }}>
                      Stuff Id
                    </th>
                    <th scope="col" className="text-center" style={{ color: "black" }}>
                      Stuff Date
                    </th>
                    <th scope="col" className="text-center" style={{ color: "black" }}>
                      Container No
                    </th>
                    <th scope="col" className="text-center" style={{ color: "black" }}>
                      Size
                    </th>
                    <th scope="col" className="text-center" style={{ color: "black" }}>
                      Type
                    </th>
                    <th scope="col" className="text-center" style={{ color: "black" }}>
                      TareWt
                    </th>
                    <th scope="col" className="text-center" style={{ color: "black" }}>
                      Container Gate In
                    </th>
                    <th scope="col" className="text-center" style={{ color: "black" }}>
                      DO No
                    </th>
                    <th scope="col" className="text-center" style={{ color: "black" }}>
                      Stuff Request Quantity
                    </th>
                    <th scope="col" className="text-center" style={{ color: "black" }}>
                      Cargo Wt
                    </th>
                    <th scope="col" className="text-center" style={{ color: "black" }}>
                      SA
                    </th>
                    <th scope="col" className="text-center" style={{ color: "black" }}>
                      SL
                    </th>
                    <th scope="col" className="text-center" style={{ color: "black" }}>
                      Status
                    </th>


                    {lastEntry.stuffReqId ? null : (
                      <th scope="col" className="text-center" style={{ color: "black" }}>
                        <Input
                          className="form-check-input radios"
                          type="checkbox"
                          style={{ width: '1.2vw', height: '1.2vw' }}
                          checked={selectAll}
                          onChange={() => handleSelectAllChange()}
                        /></th>
                    )}


                    <th scope="col" className="text-center" style={{ color: "black" }}>
                      Equipment
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {exportStuffRequest.map((cargoEntry, index) => (


                    <tr key={index} className="text-center">
                      <td>
                        <FormGroup>
                          <Input
                            type="text"
                            value={cargoEntry.stuffReqId}
                            className={`inputwidthTuka form-control`}
                            readOnly
                            id="service"
                            tabIndex={-1}
                          />
                        </FormGroup>
                      </td>


                      <td>
                      <FormGroup>
                        <DatePicker
                          selected={cargoEntry.stuffReqDate}
                          onChange={(date) => handlePaymentDateChange(date, index, 'stuffReqDate', cargoEntry.containerNo)}
                          id="stuffReqDate"
                          name="stuffReqDate"
                          placeholderText="Enter Invoice Date"
                          dateFormat="dd/MM/yyyy HH:mm"
                          showTimeInput
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          customInput={<CustomInput className={`inputwidthTukaMax form-control`}
                            onKeyDown={(event) => handleKeyDown(event, index, 'stuffReqDate', cargoEntry.containerNo)} />}
                          className={`inputwidthTukaMax form-control ${validationErrors[index]?.stuffReqDate ? 'error-border' : ''}`}
                        />
 </FormGroup>
                      </td>

                      <td>
                        <FormGroup>
                          <Input
                            type="text"
                            value={cargoEntry.containerNo}
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
                            value={cargoEntry.containerSize}
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
                            value={cargoEntry.containerType}
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
                            value={cargoEntry.tareWeight}
                            className={`inputwidthTukaMin form-control`}
                            readOnly
                            id="service"
                            tabIndex={-1}
                          />
                        </FormGroup>
                      </td>


                      <td>
                        <DatePicker
                          selected={cargoEntry.containerGateInDate}
                          // onChange={(date) => handlePaymentDateChange(date, index, 'containerGateInDate')}
                          name="containerGateInDate"
                          placeholderText="Enter Invoice Date"
                          dateFormat="dd/MM/yyyy HH:mm"
                          showTimeInput
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          id="service"
                          disabled
                          customInput={<CustomInput className={`inputwidthTukaMax form-control`} id="service" />}
                        />
                      </td>


                      <td>
                        <FormGroup>
                          <Input
                            type="text"
                            value={cargoEntry.deliveryOrderNo}
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
                            className={`inputwidthTuka form-control ${validationErrors[index]?.noOfPackagesStuffed ? 'error-border' : ''}`}
                            maxLength={8}
                            value={cargoEntry.noOfPackagesStuffed}
                            onChange={(e) => handleFieldChange(e, index, 'noOfPackagesStuffed', 'number', 8, 0)}
                            onBlur={() => checkMaxQuantity(index)}
                            disabled={cargoEntry.stuffTally === 'Y'}
                          />
                        </FormGroup>
                      </td>


                      <td>
                        <FormGroup>
                          <Input
                            type="text"
                            className={`inputwidthTuka form-control ${validationErrors[index]?.cargoWeight ? 'error-border' : ''}`}
                            maxLength={8}
                            value={cargoEntry.cargoWeight}
                            onChange={(e) => handleFieldChange(e, index, 'cargoWeight', 'decimal', 10, 2)}
                            onBlur={() => checkMaxWeight(index)}
                            disabled={cargoEntry.stuffTally === 'Y'}
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

                      <td>
                        <FormGroup>
                          <Input
                            type="text"
                            value={cargoEntry.shippingAgentName}
                            className={`inputwidthTuka form-control`}
                            readOnly
                            id="service"
                            tabIndex={-1}
                          />
                        </FormGroup>
                      </td>

                      <td>
                        {cargoEntry.status === 'A' ? 'Approved' : ''}
                      </td>


                      {lastEntry.stuffReqId ? null : (
                        <td>
                          <Input
                            className="form-check-input radios"
                            type="checkbox"
                            style={{ width: '1.2vw', height: '1.2vw' }}
                            name="taxApplicable"
                            checked={selectedItems.some((item) => item.containerNo === cargoEntry.containerNo)}
                            onChange={() => handleRowCheckboxChange(cargoEntry)}
                          />
                        </td>
                      )}

                      <td>
                        <button
                          className="btn btn-outline-primary btn-margin newButton"
                          style={{ marginRight: 10 }}
                          id="submitbtn2"
                          disabled={cargoEntry.stuffTally === 'Y'}
                          onClick={() => handleOpenEquipment(cargoEntry.stuffReqLineId, cargoEntry.stuffReqId, cargoEntry.sbNo, cargoEntry.sbTransId, cargoEntry.containerNo, cargoEntry.profitcentreId, cargoEntry.containerType, cargoEntry.containerSize)}
                        >
                          <FontAwesomeIcon
                            icon={faAdd}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </Table>
            </div>









            {/*Equipment  model*/}
            <Modal Modal isOpen={isModalOpenForEquipment} onClose={handleCloseEquipment} toggle={handleCloseEquipment} style={{ maxWidth: '1100px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>

              <ModalHeader toggle={handleCloseEquipment} style={{
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
                />Container Equipment Summary</h5>

              </ModalHeader>
              <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <label className="forlabel bold-label" htmlFor="sbRequestId">
                        Request No
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        maxLength={15}
                        name='searchGateInvalues'
                        value={equipmentActivity.deStuffId}
                        readOnly
                        id="service"
                        tabIndex={-1}
                      />

                    </FormGroup>
                  </Col>

                  <Col md={4}>
                    <FormGroup>
                      <label className="forlabel bold-label" htmlFor="sbRequestId">
                        SB TransId
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        maxLength={15}
                        name='erpDocRefNo'
                        value={equipmentActivity.erpDocRefNo}
                        readOnly
                        id="service"
                        tabIndex={-1}
                      />

                    </FormGroup>
                  </Col>

                  <Col md={4}>
                    <FormGroup>
                      <label className="forlabel bold-label" htmlFor="sbRequestId">
                        SB No
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        maxLength={15}
                        name='docRefNo'
                        value={equipmentActivity.docRefNo}
                        readOnly
                        id="service"
                        tabIndex={-1}
                      />

                    </FormGroup>
                  </Col>

                </Row>


                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label className="forlabel bold-label" htmlFor="sbRequestId">
                        Container No
                      </Label>
                      <Input
                        className="form-control"
                        type="text"
                        maxLength={15}
                        name='containerNo'
                        value={equipmentActivity.containerNo}
                        readOnly
                        id="service"
                        tabIndex={-1}
                      />
                    </FormGroup>
                  </Col>

                  <Col md={4}>
                    <FormGroup>
                      <Label className="forlabel bold-label" htmlFor="sbRequestId">
                        Vendor<span className="error-message">*</span>
                      </Label>
                      <Input
                        type="select"
                        value={equipmentActivity.vendorId}  // Use vendorId as the value
                        className={`form-control ${errors.vendorId ? 'error-border' : ''}`}
                        onChange={(e) => {
                          const selectedVendor = vendors.find(vendor => vendor.partyId === e.target.value);
                          if (selectedVendor) {
                            // Update the equipmentActivity state with the selected vendor
                            setEquipmentActivity({
                              ...equipmentActivity,
                              vendorId: selectedVendor.partyId,  // Set vendorId
                              vendorNm: selectedVendor.partyName     // Set vendorNm
                            });
                            // Clear the error for vendorId field
                            setErrors(prevErrors => ({
                              ...prevErrors,
                              vendorId: '', // Clear error message for vendorId
                            }));
                          } else {
                            // Handle the case when "Select Vendor" or an invalid option is selected
                            setEquipmentActivity({
                              ...equipmentActivity,
                              vendorId: '',      // Reset vendorId to default value
                              vendorNm: ''       // Reset vendorNm to default value
                            });
                            // Set error message for vendorId if no valid option is selected
                            setErrors(prevErrors => ({
                              ...prevErrors,
                              vendorId: 'Please select Vendor', // Set error message for vendorId
                            }));
                          }
                        }}

                      >
                        <option value="">Select Vendor</option>
                        {vendors.map((vendor, idx) => (
                          <option key={idx} value={vendor.partyId}>
                            {vendor.partyName}
                          </option>
                        ))}
                      </Input>


                    </FormGroup>
                  </Col>

                  <Col md={4}>
                    <FormGroup>
                      <Label className="forlabel bold-label" htmlFor="sbRequestId">
                        Equipment<span className="error-message">*</span>
                      </Label>
                      <Input
                        type="select"
                        value={equipmentActivity.equipment}  // Use vendorId as the value
                        className={`form-control ${errors.equipment ? 'error-border' : ''}`}
                        onChange={(e) => {
                          const selectedVendor = allEquipments.find(equipment => equipment.jarDtlId === e.target.value);

                          if (selectedVendor) {
                            // Update the equipmentActivity state with the selected values
                            setEquipmentActivity({
                              ...equipmentActivity,
                              equipment: selectedVendor.jarDtlId,  // Set equipment value
                              equipmentNm: selectedVendor.jarDtlDesc // Set equipment name
                            });

                            // Clear the error for the equipment field
                            setErrors(prevErrors => ({
                              ...prevErrors,
                              equipment: '', // Clear error message for equipment
                            }));
                          } else {
                            // Handle the case when "Select Equipment" or an invalid option is selected
                            setEquipmentActivity({
                              ...equipmentActivity,
                              equipment: '',      // Reset to default value
                              equipmentNm: ''     // Reset to default value
                            });

                            // Optionally set or keep the error message for equipment if needed
                            setErrors(prevErrors => ({
                              ...prevErrors,
                              equipment: 'Please select equipment', // Set error message for equipment
                            }));
                          }
                        }}


                      >
                        <option value="">Select Equipment</option>
                        {allEquipments.map((jar, idx) => (
                          <option key={idx} value={jar.jarDtlId}>
                            {jar.jarDtlDesc}
                          </option>
                        ))}
                      </Input>

                    </FormGroup>
                  </Col>

                </Row>

                <Row className="text-center mt-1 mb-1">
                  <Col>
                    <button
                      className="btn btn-outline-primary btn-margin newButton"
                      style={{ marginRight: 10, fontWeight: 'bold' }}
                      id="submitbtn2"
                      onClick={saveEquipMent}
                    >
                      <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                      Save
                    </button>
                    <button
                      className="btn btn-outline-danger btn-margin newButton"
                      style={{ marginRight: 10, fontWeight: 'bold' }}
                      id="submitbtn2"
                      onClick={clearEquipMent}
                    >
                      <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                      Clear
                    </button>
                  </Col>
                </Row>
                <hr />

                {equipmentActivityArray && equipmentActivityArray.length > 0 ? (

                  <div className="mt-1 table-responsive ">
                    <table className="table table-bordered table-hover tableHeader">
                      <thead className='tableHeader'>
                        <tr className='text-center'>
                          <th scope="col">Sr No</th>
                          <th scope="col">Vehicle No</th>
                          <th scope="col">CartingTransId/ Gate Pass No</th>
                          <th scope="col">Sb No</th>
                          <th scope="col">Sb Trans Id</th>
                          <th scope="col">Equipment</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItemsEquipment.map((item, index) => (
                          <>
                            <tr key={index} className='text-center'>
                              <td>{((currentPageEquipment - 1) * itemsPerPageEquipment) + index + 1}</td>
                              <td>{item.containerNo}</td>
                              <td>{item.deStuffId}</td>
                              <td>{item.docRefNo}</td>
                              <td>{item.erpDocRefNo}</td>
                              <td>{item.equipmentNm}</td>
                              <td>{item.status === 'A' ? 'Approved' : ''}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn me-md-2  btn-outline-primary"
                                  onClick={(e) => getEquipMent(item.profitCenterId, item.deStuffId, item.docRefNo, item.erpDocRefNo, item.equipment, item.srNo, 'EDIT', item.processId)}
                                ><FontAwesomeIcon icon={faEdit} />
                                </button>

                                <button
                                  type="button"
                                  className="btn gap-2  btn-outline-danger"
                                  onClick={(e) => getEquipMent(item.profitCenterId, item.deStuffId, item.docRefNo, item.erpDocRefNo, item.equipment, item.srNo, 'DELETE', item.processId)}
                                > <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </table>
                    <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                      <Pagination.First onClick={() => handlePageChangeEquipment(1)} />
                      <Pagination.Prev
                        onClick={() => handlePageChangeEquipment(currentPageEquipment - 1)}
                        disabled={currentPageEquipment === 1}
                      />
                      <Pagination.Ellipsis />

                      {displayPagesEquipment().map((pageNumber) => (
                        <Pagination.Item
                          key={pageNumber}
                          active={pageNumber === currentPageEquipment}
                          onClick={() => handlePageChangeEquipment(pageNumber)}
                        >
                          {pageNumber}
                        </Pagination.Item>
                      ))}

                      <Pagination.Ellipsis />
                      <Pagination.Next
                        onClick={() => handlePageChangeEquipment(currentPageEquipment + 1)}
                        disabled={currentPageEquipment === totalPagesEquipment}
                      />
                      <Pagination.Last onClick={() => handlePageChangeEquipment(totalPagesEquipment)} />
                    </Pagination>
                  </div>
                ) : null}


              </ModalBody>
            </Modal>


          </div>

        )}



























        {/* {enableTab === 'container' && ( */}

        {/* {mainSearch.operation === 'container' && ( */}
        {enableTab === 'container' && (
          <div className='ContainerWiseStuffingRequest'>

            <div>
              {/* <h5
              className="pageHead"
              style={{
                fontFamily: "Your-Heading-Font",
                paddingLeft: "2%",
                paddingRight: "-20px",
              }}
            >
              <FontAwesomeIcon
                icon={faBox}
                style={{
                  marginRight: "8px",
                  color: "black",
                }}
              />
              Container Wise Stuffing Request
            </h5>
            <hr style={{ margin: 2, padding: 2 }} /> */}
              <Row>
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                      Stuffing Request Id
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="service"
                      readOnly
                      value={lastEntryContainer.stuffReqId}
                    />
                  </FormGroup>
                </Col>

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
                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                      Container No<span className="error-message">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="service"
                      readOnly
                      name='containerNo'
                      value={lastEntryContainer.containerNo}
                    />
                  </FormGroup>
                </Col>

                {/* <Col md={2}>
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
                        className={`${validationErrorsContainer.some(error => error.hasOwnProperty('containerNo')) ? 'error-border' : ''}`}
                        placeholder="Select ContainerNo"
                        //components={{ Option: CustomOption }}
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
                </Col> */}



           {/*     <Col md={2}>
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
                        value={lastEntryContainer.containerSize} // Adjust value as needed
                        tabIndex={-1}
                      />
                      <input
                        className="form-control"
                        type="text"
                        id="service" // Unique ID for the second input
                        readOnly
                        maxLength={15}
                        name="containerType" // Updated name for second input
                        value={lastEntryContainer.containerType} // Adjust value as needed
                        tabIndex={-1}
                      />
                    </div>
                  </FormGroup>
                </Col>
*/}

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

                {/* <Col md={2}>
                <FormGroup>
                  <label
                    className="forlabel bold-label"
                    htmlFor="sbRequestId"
                  >
                    Container Health<span className="error-message">*</span>
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
                      Container Health <span className="error-message">*</span>
                    </label>


                    <Input
                      type="select"
                      value={lastEntryContainer.containerHealth}
                      className={`form-control ${validationErrorsContainer.some(error => error.hasOwnProperty('containerHealth')) ? 'error-border' : ''}`}
                      onChange={(e) => handleHeaderChangeContainer('containerHealth', e.target.value)}
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
                      Via No<span className="error-message">*</span>
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
                      Total Stuff Packages
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="service"
                      readOnly
                      maxLength={15}
                      name="viaNo"
                      value={totalsContainer.packages}
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
                      value={totalsContainer.cargoWeight}
                      tabIndex={-1}
                    />
                  </FormGroup>
                </Col>



                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                      Tare weight
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="service"
                      readOnly
                      maxLength={15}
                      name="tareWeight"
                      value={lastEntryContainer.tareWeight}
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
                      Gate Open Date
                    </label>
                    <div style={{ position: "relative" }}>
                      <DatePicker
                        selected={lastEntryContainer.gateOpenDate}
                        onChange={(date) => handlePaymentDateChangeHeaderContainer(date, 'gateOpenDate')}
                        id={lastEntryContainer.vesselId ? 'service' : ''}
                        disabled={lastEntryContainer.vesselId}
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
                        selected={lastEntryContainer.periodFrom}
                        onChange={(date) => handlePaymentDateChangeHeaderContainer(date, 'periodFrom')}
                        id={lastEntryContainer.vesselId ? 'service' : ''}
                        disabled={lastEntryContainer.vesselId}
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
                        selected={lastEntryContainer.berthingDate}
                        onChange={(date) => handlePaymentDateChangeHeaderContainer(date, 'berthingDate')}
                        id={lastEntryContainer.vesselId ? 'service' : ''}
                        disabled={lastEntryContainer.vesselId}
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

                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                      Rotation No
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id={lastEntryContainer.vesselId ? 'service' : ''}
                      readOnly={lastEntryContainer.vesselId}
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
                        id={lastEntryContainer.vesselId ? 'service' : ''}
                        disabled={lastEntryContainer.vesselId}
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
                      icon={faBackward}
                      style={{ marginRight: "5px" }}
                    />
                    Back
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
                    Shipping Bill Entry
                  </button>
                  <button
                    className="btn btn-outline-success btn-margin newButton"
                    style={{ marginRight: 10 }}
                    id="submitbtn2"
                    disabled={lastEntryContainer.stuffReqId === ''}
                    onClick={downloadContWiseStuffReport}
                  >
                    <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
                    Print Report
                  </button>

                </Col>
              </Row>


















            </div>
            <hr />

            <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>

              <h5>Stuffing Request SB Details</h5>

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
                      Stuffed Req Qty
                    </th>
                    <th scope="col" className="text-center" style={{ color: "black" }}>
                      Stuffed Requested Qty
                    </th>
                    <th scope="col" className="text-center" style={{ color: "black" }}>
                      Stuff Weight
                    </th>
                    <th scope="col" className="text-center" style={{ color: "black" }}>
                      Equipment
                    </th>

                    {exportStuffRequestContainer.length > 1 && (
                      <th scope="col" className="text-center" style={{ color: "black" }}>
                        Action
                      </th>
                    )}
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
                                searchSbNos(inputValue);
                              }
                            }}
                            className={`inputwidthTuka ${validationErrorsContainer[index]?.sbNo ? 'error-border' : ''}`}
                            placeholder="Select SB No"
                            isDisabled={cargoEntry.status}
                            id={cargoEntry.status ? 'service' : ''}
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
                            value={cargoEntry.noOfPackages}
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
                            value={cargoEntry.totalCargoWeight}
                            className={`inputwidthTuka form-control`}
                            readOnly
                            id="service"
                            tabIndex={-1}
                          />
                        </FormGroup>
                      </td>

                      {/* <td>
                        <FormGroup>
                          <Input
                            type="text"
                            className={`inputwidthTuka form-control ${validationErrorsContainer[index]?.pod ? 'error-border' : ''}`}
                            maxLength={15}
                            value={cargoEntry.pod}
                            onChange={(e) => handleFieldChangeContainer(e, index, 'pod', '')}
                          />
                        </FormGroup>
                      </td> */}






                      <td>
                        <FormGroup>
                          <CreatableSelect
                            value={selectedPod[index]}
                            onChange={(selectedOption) => handlePodSelect(selectedOption, index)}
                            options={podData}
                            placeholder="Select POD"
                            onInputChange={(inputValue, { action }) => {
                              if (action === 'input-change') {
                                searchPortData(inputValue);
                              }
                            }}
                            onCreateOption={(inputValue) => {
                              const maxLength = 50;
                              const truncatedInputValue = inputValue.slice(0, maxLength);
                              handleCreationSelectPod(truncatedInputValue, 'pod', index)
                            }}
                            isClearable
                            id="pod"
                            name='pod'
                            className={`inputwidthTuka`}
                            menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                            menuPosition="fixed" // Sets the dropdown menu position to fixed    
                            menuPlacement="top"
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
                      </td>

                      <td>
                        <FormGroup>
                          <Input
                            type="text"
                            value={cargoEntry.contStuffPackages}
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
                            className={`inputwidthTuka form-control ${validationErrorsContainer[index]?.cargoWeight ? 'error-border' : ''}`}
                            maxLength={13}
                            value={cargoEntry.cargoWeight}
                            onChange={(e) => handleFieldChangeContainer(e, index, 'cargoWeight', 'decimal', 10, 2)}
                            onBlur={() => checkMaxWeightContainer(index)}
                          />
                        </FormGroup>
                      </td>



                      <td>
                        <button
                          className="btn btn-outline-primary btn-margin newButton"
                          style={{ marginRight: 10 }}
                          id="submitbtn2"
                          onClick={() => handleOpenEquipment(cargoEntry.stuffReqLineId, cargoEntry.stuffReqId, cargoEntry.sbNo, cargoEntry.sbTransId, cargoEntry.containerNo, cargoEntry.profitcentreId, cargoEntry.containerType, cargoEntry.containerSize)}
                        >
                          <FontAwesomeIcon
                            icon={faAdd}
                          />
                        </button>
                      </td>

                      {index > 0 && index === exportStuffRequestContainer.length - 1 && (!cargoEntry.stuffReqId || cargoEntry.stuffReqId.trim() === '') && (
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









            {/*Equipment  model*/}
            <Modal Modal isOpen={isModalOpenForEquipment} onClose={handleCloseEquipment} toggle={handleCloseEquipment} style={{ maxWidth: '1100px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>

              <ModalHeader toggle={handleCloseEquipment} style={{
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
                />Container Equipment Summary</h5>

              </ModalHeader>
              <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <label className="forlabel bold-label" htmlFor="sbRequestId">
                        Request No
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        maxLength={15}
                        name='searchGateInvalues'
                        value={equipmentActivity.deStuffId}
                        readOnly
                        id="service"
                        tabIndex={-1}
                      />

                    </FormGroup>
                  </Col>

                  <Col md={4}>
                    <FormGroup>
                      <label className="forlabel bold-label" htmlFor="sbRequestId">
                        SB TransId
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        maxLength={15}
                        name='erpDocRefNo'
                        value={equipmentActivity.erpDocRefNo}
                        readOnly
                        id="service"
                        tabIndex={-1}
                      />

                    </FormGroup>
                  </Col>

                  <Col md={4}>
                    <FormGroup>
                      <label className="forlabel bold-label" htmlFor="sbRequestId">
                        SB No
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        maxLength={15}
                        name='docRefNo'
                        value={equipmentActivity.docRefNo}
                        readOnly
                        id="service"
                        tabIndex={-1}
                      />

                    </FormGroup>
                  </Col>

                </Row>


                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label className="forlabel bold-label" htmlFor="sbRequestId">
                        Container No
                      </Label>
                      <Input
                        className="form-control"
                        type="text"
                        maxLength={15}
                        name='containerNo'
                        value={equipmentActivity.containerNo}
                        readOnly
                        id="service"
                        tabIndex={-1}
                      />
                    </FormGroup>
                  </Col>

                  <Col md={4}>
                    <FormGroup>
                      <Label className="forlabel bold-label" htmlFor="sbRequestId">
                        Vendor<span className="error-message">*</span>
                      </Label>
                      <Input
                        type="select"
                        value={equipmentActivity.vendorId}  // Use vendorId as the value
                        className={`form-control ${errors.vendorId ? 'error-border' : ''}`}
                        onChange={(e) => {
                          const selectedVendor = vendors.find(vendor => vendor.partyId === e.target.value);
                          if (selectedVendor) {
                            // Update the equipmentActivity state with the selected vendor
                            setEquipmentActivity({
                              ...equipmentActivity,
                              vendorId: selectedVendor.partyId,  // Set vendorId
                              vendorNm: selectedVendor.partyName     // Set vendorNm
                            });
                            // Clear the error for vendorId field
                            setErrors(prevErrors => ({
                              ...prevErrors,
                              vendorId: '', // Clear error message for vendorId
                            }));
                          } else {
                            // Handle the case when "Select Vendor" or an invalid option is selected
                            setEquipmentActivity({
                              ...equipmentActivity,
                              vendorId: '',      // Reset vendorId to default value
                              vendorNm: ''       // Reset vendorNm to default value
                            });
                            // Set error message for vendorId if no valid option is selected
                            setErrors(prevErrors => ({
                              ...prevErrors,
                              vendorId: 'Please select Vendor', // Set error message for vendorId
                            }));
                          }
                        }}
                      >
                        <option value="">Select Vendor</option>
                        {vendors.map((vendor, idx) => (
                          <option key={idx} value={vendor.partyId}>
                            {vendor.partyName}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>

                  <Col md={4}>
                    <FormGroup>
                      <Label className="forlabel bold-label" htmlFor="sbRequestId">
                        Equipment<span className="error-message">*</span>
                      </Label>
                      <Input
                        type="select"
                        value={equipmentActivity.equipment}  // Use vendorId as the value
                        className={`form-control ${errors.equipment ? 'error-border' : ''}`}
                        onChange={(e) => {
                          const selectedVendor = allEquipments.find(equipment => equipment.jarDtlId === e.target.value);

                          if (selectedVendor) {
                            // Update the equipmentActivity state with the selected values
                            setEquipmentActivity({
                              ...equipmentActivity,
                              equipment: selectedVendor.jarDtlId,  // Set equipment value
                              equipmentNm: selectedVendor.jarDtlDesc // Set equipment name
                            });

                            // Clear the error for the equipment field
                            setErrors(prevErrors => ({
                              ...prevErrors,
                              equipment: '', // Clear error message for equipment
                            }));
                          } else {
                            // Handle the case when "Select Equipment" or an invalid option is selected
                            setEquipmentActivity({
                              ...equipmentActivity,
                              equipment: '',      // Reset to default value
                              equipmentNm: ''     // Reset to default value
                            });

                            // Optionally set or keep the error message for equipment if needed
                            setErrors(prevErrors => ({
                              ...prevErrors,
                              equipment: 'Please select equipment', // Set error message for equipment
                            }));
                          }
                        }}


                      >
                        <option value="">Select Equipment</option>
                        {allEquipments.map((jar, idx) => (
                          <option key={idx} value={jar.jarDtlId}>
                            {jar.jarDtlDesc}
                          </option>
                        ))}
                      </Input>

                    </FormGroup>
                  </Col>

                </Row>

                <Row className="text-center mt-1 mb-1">
                  <Col>
                    <button
                      className="btn btn-outline-primary btn-margin newButton"
                      style={{ marginRight: 10, fontWeight: 'bold' }}
                      id="submitbtn2"
                      onClick={saveEquipMent}
                    >
                      <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                      Save
                    </button>
                    <button
                      className="btn btn-outline-danger btn-margin newButton"
                      style={{ marginRight: 10, fontWeight: 'bold' }}
                      id="submitbtn2"
                      onClick={clearEquipMent}
                    >
                      <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                      Clear
                    </button>
                  </Col>
                </Row>
                <hr />

                {equipmentActivityArray && equipmentActivityArray.length > 0 ? (

                  <div className="mt-1 table-responsive ">
                    <table className="table table-bordered table-hover tableHeader">
                      <thead className='tableHeader'>
                        <tr className='text-center'>
                          <th scope="col">Sr No</th>
                          <th scope="col">Vehicle No</th>
                          <th scope="col">CartingTransId/ Gate Pass No</th>
                          <th scope="col">Sb No</th>
                          <th scope="col">Sb Trans Id</th>
                          <th scope="col">Equipment</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItemsEquipment.map((item, index) => (
                          <>
                            <tr key={index} className='text-center'>
                              <td>{((currentPageEquipment - 1) * itemsPerPageEquipment) + index + 1}</td>
                              <td>{item.containerNo}</td>
                              <td>{item.deStuffId}</td>
                              <td>{item.docRefNo}</td>
                              <td>{item.erpDocRefNo}</td>
                              <td>{item.equipmentNm}</td>
                              <td>{item.status === 'A' ? 'Approved' : ''}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn me-md-2  btn-outline-primary"
                                  onClick={(e) => getEquipMent(item.profitCenterId, item.deStuffId, item.docRefNo, item.erpDocRefNo, item.equipment, item.srNo, 'EDIT', item.processId)}
                                ><FontAwesomeIcon icon={faEdit} />
                                </button>

                                <button
                                  type="button"
                                  className="btn gap-2  btn-outline-danger"
                                  onClick={(e) => getEquipMent(item.profitCenterId, item.deStuffId, item.docRefNo, item.erpDocRefNo, item.equipment, item.srNo, 'DELETE', item.processId)}
                                > <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </table>
                    <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                      <Pagination.First onClick={() => handlePageChangeEquipment(1)} />
                      <Pagination.Prev
                        onClick={() => handlePageChangeEquipment(currentPageEquipment - 1)}
                        disabled={currentPageEquipment === 1}
                      />
                      <Pagination.Ellipsis />

                      {displayPagesEquipment().map((pageNumber) => (
                        <Pagination.Item
                          key={pageNumber}
                          active={pageNumber === currentPageEquipment}
                          onClick={() => handlePageChangeEquipment(pageNumber)}
                        >
                          {pageNumber}
                        </Pagination.Item>
                      ))}

                      <Pagination.Ellipsis />
                      <Pagination.Next
                        onClick={() => handlePageChangeEquipment(currentPageEquipment + 1)}
                        disabled={currentPageEquipment === totalPagesEquipment}
                      />
                      <Pagination.Last onClick={() => handlePageChangeEquipment(totalPagesEquipment)} />
                    </Pagination>
                  </div>
                ) : null}


              </ModalBody>
            </Modal>


          </div>
        )}


      </div >


    </>
  );
}

export default SBWiseStuffingRequest;
