import AuthContext from '../Components/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faShip, faBackward, faCalendarAlt, faAdd, faGroupArrowsRotate, faOutdent, faPlane, faPlaneDeparture, faEdit, faTimesCircle, faPlus, faPrint } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import useAxios from '../Components/useAxios';
import cfsService from "../service/CFSService";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import ipaddress from '../Components/IpAddress';

function ExportCarting({ searchData, resetFlag, updatePagesList }) {

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


  const axiosInstance = useAxios();
  const CFSService = new cfsService(axiosInstance);

  const [cartingObject, setCartingObject] = useState({});

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
  const [errors, setErrors] = useState({});

  const queryParams = new URLSearchParams(location.search);
  const processId = 'P00218';

  const foundRights = role !== 'ROLE_ADMIN' ? userRights.find(item => item.process_Id === processId) : null;
  const allowCreate = foundRights?.allow_Create === 'Y';
  const allowRead = foundRights?.allow_Read === 'Y';
  const allowEdit = foundRights?.allow_Update === 'Y';
  const allowDelete = foundRights?.allow_Delete === 'Y';

  const [profitcentre, setProfitcentre] = useState({
    profitcentreId: '',
    profitcentreDesc: ''
  });

  const [totals, setTotals] = useState({
    areaOccupied: 0,
    yardPackages: 0,
    actualNoOfPackages: 0
  });


  const [totalsYard, setTotalsYard] = useState({
    areaOccupied: 0,
    yardPackages: 0
  });


  // getSelectedCartingSearch(profitcentreId, cartingTransId, cartingLineId, sbNo)
  useEffect(() => {
    if (searchData && searchData.activeTab === processId && searchData.cartingTransId && searchData.cartingLineId && searchData.sbNo && searchData.profitCenterId) {
      getSelectedCartingSearch(searchData.profitCenterId, searchData.cartingTransId, searchData.cartingLineId, searchData.sbNo);
    }
  }, [searchData]);
  useEffect(() => {

    if (resetFlag) {
      handleReset();
    }
  }, [resetFlag]);


  useEffect(() => {
    const fetchData = async () => {
      await getProgitCenterById('N00004');
    };
    fetchData();
  }, []);



  const getProgitCenterById = async (profitCenterId) => {
    try {
      const response = await CFSService.getProgitCenterById(companyid, branchId, profitCenterId, jwtToken);
      setProfitcentre(response.data);
      // Update exportSbEntry with the profitcentreId
      setExportCarting(prevState =>
        prevState.map(item => ({
          ...item,
          profitcentreId: response.data.profitcentreId
        }))
      );
    } catch (error) {
      console.error('Error fetching port data:', error);
    }
  };



  const initialExportCarting = {
    companyId: companyid,
    branchId: branchId,
    cartingTransId: '',
    cartingLineId: 1,
    finYear: '',
    profitcentreId: profitcentre.profitcentreId,
    sbTransId: '',
    sbNo: '',
    sbLineNo: '',
    sbDate: '',
    cartingTransDate: new Date(),
    gateInId: '',
    gateInDate: '',
    crgExamId: '',
    shift: 'Day',
    vehicleNo: '',
    hubContainer: '',
    containerNo: '',
    icd: '',
    onAccountOf: '',
    commodity: '',
    gateInPackages: 0,
    gateInWeight: 0.0,
    actualNoOfPackages: 0,
    actualNoOfWeight: 0.0,
    fob: null,
    gateInType: 'EXP',
    invoiceType: '',
    gridLocation: '',
    gridBlock: '',
    gridCellNo: '',
    stuffReqId: '',
    stuffedNoOfPackages: 0,
    areaOccupied: 0.0,
    yardPackages: 0.0,
    damageComments: '',
    status: '',
    createdBy: '',
    createdDate: '',
    editedBy: '',
    editedDate: '',
    approvedBy: '',
    approvedDate: '',
    fromSbTransId: '',
    fromSbNo: '',
    fromSbLineNo: '',
    lastStorageInvoiceDate: new Date(0),
    lastStorageFlag: 'N',
    storageWeeks: 0,
    storageDays: 0,
    storageMonths: 0,
    handlingCharges: null,
    onAccountOfName: '',
    excessPackages: 0,
    shortagePackages: 0,
    damagePackages: 0,
    cartedPackages: 0,
    availableYardArea: 0,
    yardArea: 0,
    yardAreaUsed: 0,
    yardLocation: '',
    gridLoc: '',
    sbPackages: 0,
    sbGateInPackages: 0,
    sbCartedPackages: 0,
  };


  const [exportCarting, setExportCarting] = useState([initialExportCarting]);
  const [preExportCarting, setPreExportCarting] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);



  const handleBlur = (index) => {
    const currentEntry = exportCarting[index];

    const updatedValues = {
      actualNoOfPackages: parseFloat(currentEntry.actualNoOfPackages || 0),
      excessPackages: parseFloat(currentEntry.excessPackages || 0),
      shortagePackages: parseFloat(currentEntry.shortagePackages || 0),
      yardPackages: parseFloat(currentEntry.yardPackages || 0),
      cartedPackages: parseFloat(currentEntry.cartedPackages || 0),
      sbPackages: parseFloat(currentEntry.sbPackages || 0),
      sbCartedPackages: parseFloat(currentEntry.sbCartedPackages || 0),
      sbGateInPackages: parseFloat(currentEntry.sbGateInPackages || 0)
    };
    const currentPreEntry = preExportCarting.find(
      (entry) => entry.vehicleNo == currentEntry.vehicleNo && entry.sbNo == currentEntry.sbNo
    );

    const maxQty = parseFloat(((currentEntry?.sbGateInPackages || 0) - (currentEntry?.sbCartedPackages || 0)) + (currentPreEntry?.actualNoOfPackages || 0));

    const maxQtyOld = parseFloat(((currentEntry?.gateInPackages || 0) - (currentEntry?.cartedPackages || 0)) + (currentPreEntry?.actualNoOfPackages || 0));

    const errors = {};


    console.log(updatedValues, ' maxQtyOld ', maxQtyOld, ' maxQty ', maxQty);



    if (updatedValues.actualNoOfPackages > maxQtyOld) {

      if (updatedValues.excessPackages <= 0) {
        errors.excessPackages = 'Excess Packages exceeds maximum limit.';
        errors.actualNoOfPackages = 'Actual No. of Packages exceeds maximum limit.';

        toast.warning(<div dangerouslySetInnerHTML={{ __html: `Enter excess Quantity:: Remaining Qty:<strong> ${maxQty} </strong>` }} />, {
          position: 'top-center',
          autoClose: 1000,
          style: { width: '26vw' },
        });
       
      }else if(updatedValues.actualNoOfPackages > maxQty)
      {

        errors.actualNoOfPackages = 'Actual No. of Packages exceeds maximum limit.';

        toast.warning(<div dangerouslySetInnerHTML={{ __html: `Enter Valid Quantity:: Remaining Qty:<strong> ${maxQty} </strong>` }} />, {
          position: 'top-center',
          autoClose: 1000,
          style: { width: '26vw' },
        });


      }

    }



    if (updatedValues.excessPackages > (maxQty - maxQtyOld)) {
      errors.excessPackages = 'Excess Packages exceeds maximum limit.';
      toast.warning(<div dangerouslySetInnerHTML={{ __html: `Enter Valid Excess Quantity:: Remaining Qty:<strong> ${maxQty - maxQtyOld} </strong>` }} />, {
        position: 'top-center',
        autoClose: 1000,
        style: { width: '26vw' },
      });
      errors.excessPackages = 'Excess Packages exceed maximum limit.';
    }
    if (updatedValues.shortagePackages > maxQtyOld) {
      errors.shortagePackages = 'Shortage Packages exceed maximum limit.';
    }
    if (updatedValues.yardPackages > updatedValues.actualNoOfPackages) {
      errors.yardPackages = 'Yard Packages exceed maximum limit.';
    }

    // Calculate total packages
    const totalPackages = updatedValues.actualNoOfPackages;
    if (totalPackages > maxQty) {
      errors.totalPackages = 'Total Packages exceed maximum limit.';
    }

    // Set validation errors if any
    setValidationErrors(prevErrors => {
      const updatedErrors = [...prevErrors];
      if (!updatedErrors[index]) {
        updatedErrors[index] = {};
      }
      Object.assign(updatedErrors[index], errors); // Merge new errors into the existing object
      return updatedErrors;
    });
  };



  const validateExportGateIn = (exportGateIn) => {
    let errors = [];

    exportGateIn.forEach((detail, index) => {
      const { vehicleNo, actualNoOfPackages, gridLocation, gridBlock, areaOccupied, yardPackages, gateInPackages, excessPackages, shortagePackages, sbPackages, sbGateInPackages, sbCartedPackages} = detail;
      let error = {};

      // Check required fields
      if (!areaOccupied || areaOccupied <= 0) {
        error.areaOccupied = 'Area occupied is required';
      }

      if (!yardPackages || yardPackages <= 0) {
        error.yardPackages = 'Yard packages are required';
      }

      if (!actualNoOfPackages || actualNoOfPackages <= 0) {
        error.actualNoOfPackages = 'Actual number of packages is required';
      }
      if (!gridLocation) error.gridLocation = 'Grid location is required.';
      if (!gridBlock) error.gridBlock = 'Grid block is required.';
      if (!vehicleNo) error.vehicleNo = 'Vehicle number is required.';

      const currentPreEntry = preExportCarting.find(
        (entry) => entry.vehicleNo == detail.vehicleNo && entry.sbNo == detail.sbNo
      );
    
      // const maxQty = parseFloat(((detail?.gateInPackages || 0) - (detail?.cartedPackages || 0)) + (currentPreEntry?.actualNoOfPackages || 0));


      const maxQty = parseFloat(((detail?.sbGateInPackages || 0) - (detail?.sbCartedPackages || 0)) + (currentPreEntry?.actualNoOfPackages || 0));

      const maxQtyOld = parseFloat(((detail?.gateInPackages || 0) - (detail?.cartedPackages || 0)) + (currentPreEntry?.actualNoOfPackages || 0));
  



      if (detail.actualNoOfPackages > maxQtyOld) {

        if (detail.excessPackages <= 0) {
          error.excessPackages = 'Excess Packages exceeds maximum limit.';
          error.actualNoOfPackages = 'Actual No. of Packages exceeds maximum limit.';
  
          toast.warning(<div dangerouslySetInnerHTML={{ __html: `Enter excess Quantity:: Remaining Qty:<strong> ${maxQty} </strong>` }} />, {
            position: 'top-center',
            autoClose: 1000,
            style: { width: '26vw' },
          });
         
        }else if(detail.actualNoOfPackages > maxQty)
        {
  
          error.actualNoOfPackages = 'Actual No. of Packages exceeds maximum limit.';
  
          toast.warning(<div dangerouslySetInnerHTML={{ __html: `Enter Valid Quantity:: Remaining Qty:<strong> ${maxQty} </strong>` }} />, {
            position: 'top-center',
            autoClose: 1000,
            style: { width: '26vw' },
          });
  
  
        }
  
      }
  
      const totalPackages = parseFloat(actualNoOfPackages);
      if (yardPackages > totalPackages) {
        error.yardPackages = 'Yard packages exceed maximum limit.';
      }

      if (totalPackages > maxQty) {
        error.actualNoOfPackages = 'Total packages (actual + shortage - excess) exceed maximum limit.';
      }

      // Check if individual fields exceed maxQty
      if (shortagePackages > maxQty) {
        error.shortagePackages = 'Shortage packages exceed maximum limit.';
      }



      if (detail.excessPackages > (maxQty - maxQtyOld)) {
        errors.excessPackages = 'Excess Packages exceeds maximum limit.';
        toast.warning(<div dangerouslySetInnerHTML={{ __html: `Enter Valid Excess Quantity:: Remaining Qty:<strong> ${maxQty - maxQtyOld} </strong>` }} />, {
          position: 'top-center',
          autoClose: 1000,
          style: { width: '26vw' },
        });
        error.excessPackages = 'Excess Packages exceed maximum limit.';
      }


      errors.push(error);
    });

    setValidationErrors(errors);

    // Check if there are any errors
    return errors.every(error => Object.keys(error).length === 0);
  };




  const initialYardGrid = {
    companyId: companyid,
    branchId: branchId,
    finYear: '',
    processTransId: '',
    lineNo: 1,
    subSrNo: 1,
    yardLocation: '',
    yardBlock: '',
    blockCellNo: '',
    yardPackages: 0,
    cellArea: 0,
    cellAreaUsed: 0,
    cellAreaAllocated: 0,
    qtyTakenOut: 0,
    areaReleased: 0,
    transType: 'EXP',
    stuffReqQtyL: 0,
    createdBy: '',
    createdDate: null,
    editedBy: '',
    editedDate: null,
    approvedBy: '',
    approvedDate: null,
    status: ''
  };

  const [isModalOpenForYardCell, setIsModalOpenForYardCell] = useState(false);
  const [yardCellArray, setYardCellArray] = useState([initialYardGrid]);


  useEffect(() => {
    const totalAreaOccupied = exportCarting.reduce(
      (acc, item) => acc + (Number(item.areaOccupied) || 0),
      0
    );

    const totalYardPackages = exportCarting.reduce(
      (acc, item) => acc + (Number(item.yardPackages) || 0),
      0
    );

    const totalActualNoOfPackages = exportCarting.reduce(
      (acc, item) => acc + (Number(item.actualNoOfPackages) || 0),
      0
    );

    const totalExcessPackages = exportCarting.reduce(
      (acc, item) => acc + (Number(item.excessPackages) || 0),
      0
    );

    const totalShortagePackages = exportCarting.reduce(
      (acc, item) => acc + (Number(item.shortagePackages) || 0),
      0
    );

    setTotals({
      areaOccupied: totalAreaOccupied,
      yardPackages: totalYardPackages,
      actualNoOfPackages: totalActualNoOfPackages,
    });
  }, [exportCarting]);



  useEffect(() => {

    const totalAreaOccupied = yardCellArray.reduce((acc, item) => acc + (Number(item.cellAreaAllocated) || 0), 0);
    const totalYardPackages = yardCellArray.reduce((acc, item) => acc + (Number(item.yardPackages) || 0), 0);

    setTotalsYard({
      areaOccupied: totalAreaOccupied,
      yardPackages: totalYardPackages,
    });
  }, [yardCellArray]);





  const handleChange = (e) => {
    const { name, value } = e.target;

    setExportCarting((prevExportCarting) => {
      const updatedCarting = prevExportCarting.map((entry) => ({
        ...entry,
        [name]: value
      }));

      return updatedCarting;
    });
  };



  const lastEntryWithId = exportCarting.slice().reverse().find(entry => entry.cartingTransId && entry.cartingTransId.trim().length > 0);

  // If found, use it as lastEntry; otherwise, use the last entry in the array
  const lastEntry = lastEntryWithId || exportCarting[exportCarting.length - 1];



  const [isModalOpenForCartingSearch, setIsModalOpenForCartingSearch] = useState(false);

  const [searchCartingvalues, setSearchCartingvalues] = useState('');
  const [cartingSearchData, setCartingSearchData] = useState([]);

  const handleOpenCartingSearch = async () => {
    setIsModalOpenForCartingSearch(true);
    setSearchCartingvalues('');
    searchCartingSearch();
  };

  const searchCartingSearch = async (searchvalue) => {
    setCurrentPageCartingSearch(1);
    setLoading(true);
    try {
      const response = await CFSService.getCartingEntriesToSelect(companyid, branchId, searchvalue, jwtToken);
      setCartingSearchData(response.data);
    } catch (error) {
      console.error("Error fetching SB entries:", error);
    } finally {
      setLoading(false);
    }
  };



  const handleCloseCartingSearch = (val) => {
    setIsModalOpenForCartingSearch(false);
    setSearchCartingvalues('');
    setCartingSearchData([]);
  }


  const clearCartingSearch = (val) => {
    setSearchCartingvalues('');
    setCartingSearchData();
  }

  const selectCartingSearchRadio = async (profitcentreId, cartingTransId, cartingLineId, sbNo) => {
    await getSelectedCartingSearch(profitcentreId, cartingTransId, cartingLineId, sbNo);
    handleCloseCartingSearch();
  }


  const getSelectedCartingSearch = async (profitcentreId, cartingTransId, cartingLineId, sbNo) => {
    setValidationErrors([]);
    setLoading(true);
    try {
      const response = await CFSService.getSelectedCartingEntry(companyid, branchId, cartingTransId, cartingLineId, sbNo, profitcentreId, jwtToken);
      setExportCarting(response.data);
      setPreExportCarting(response.data);
    } catch (error) {
      console.error("Error fetching SB entries:", error);
      // Optionally handle the error further, e.g., show a notification to the user
    } finally {
      setLoading(false);
    }
  };










  // PAGINATION FOR SELECT EXPORTER
  const [currentPageCartingSearch, setCurrentPageCartingSearch] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItemCartingSearch = currentPageCartingSearch * itemsPerPage;
  const indexOfFirstItemCartingSearch = indexOfLastItemCartingSearch - itemsPerPage;
  const currentItemsCartingSearch = cartingSearchData.slice(indexOfFirstItemCartingSearch, indexOfLastItemCartingSearch);
  const totalPagesCartingSearch = Math.ceil(cartingSearchData.length / itemsPerPage);

  // Function to handle page change
  const handlePageChangeCarting = (page) => {
    if (page >= 1 && page <= totalPagesCartingSearch) {
      setCurrentPageCartingSearch(page);
    }
  };


  const displayPagesCarting = () => {
    const centerPageCount = 5;
    const middlePage = Math.floor(centerPageCount / 2);
    let startPage = currentPageCartingSearch - middlePage;
    let endPage = currentPageCartingSearch + middlePage;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPagesCartingSearch, centerPageCount);
    }

    if (endPage > totalPagesCartingSearch) {
      endPage = totalPagesCartingSearch;
      startPage = Math.max(1, totalPagesCartingSearch - centerPageCount + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };




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
    setExportCarting(prevState => {
      const updatedTransDtl = [...prevState];
      updatedTransDtl[index] = {
        ...updatedTransDtl[index],
        [fieldName]: value,
      };
      return updatedTransDtl;
    });
  };












  const [selectedVehicleNos, setSelectedVehicleNos] = useState([]);
  const [vehicleNos, setVehicleNos] = useState([]);

  const searchVehicleNos = async (searchvalue) => {
    setLoading(true);
    try {
      const response = await CFSService.searchVehicleNos(companyid, branchId, searchvalue, profitcentre.profitcentreId, jwtToken);
      setVehicleNos(response.data);
    } catch (error) {
      console.error("Error fetching Gate In entries:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleGetGateInEntry = async (vehicleNo) => {
    setLoading(true);
    try {
      const response = await CFSService.getGateInEntryFromVehicleNo(
        companyid,
        branchId,
        vehicleNo,
        profitcentre.profitcentreId,
        jwtToken
      );

      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        let cartingLineId = 1; // Initialize cartingLineId

        const updatedExportCarting = response.data.map((data) => {
          const currentCartingLineId = cartingLineId; // Capture the current ID
          cartingLineId++; // Increment for the next iteration

          return {
            ...initialExportCarting,
            vehicleNo: vehicleNo,  // Assign the vehicleNo received as a parameter
            sbNo: data.docRefNo,
            sbTransId: data.erpDocRefNo,
            sbDate: data.docRefDate,
            onAccountOf: data.onAccountOf,
            onAccountOfName: data.cha,
            commodity: data.commodityDescription,
            fob: data.fob,
            sbLineNo: data.srNo,
            gateInPackages: data.qtyTakenIn,
            gateInDate: data.inGateInDate,
            gateInId: data.gateInId,
            gateInWeight: data.cargoWeight,
            actualNoOfWeight: data.grossWeight,
            cartingLineId: currentCartingLineId,
            cartedPackages: data.cartedPackages,
            sbPackages: data.sbPackages,
            sbGateInPackages: data.sbGateInPackages,
            sbCartedPackages: data.sbCartedPackages
          };
        });

        // Update state with the new data
        setExportCarting(updatedExportCarting);
        toast.success('Data Found', {
          position: 'top-center',
          autoClose: 1000,
        });
      } else {
        // Clear the state if no data found
        setExportCarting([]);
        toast.error('No Data Found', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    } catch (error) {
      // Handle any errors during the fetch
      toast.error('An error occurred while fetching data.', {
        position: 'top-center',
        autoClose: 3000,
      });
      console.error('Error fetching gate-in data:', error);
    } finally {
      // Always stop loading regardless of success or failure
      setLoading(false);
    }
  };






  const handleVehicleNoChange = async (selectedOption, index) => {
    const updatedVehicleNos = [...selectedVehicleNos];
    updatedVehicleNos[index] = selectedOption;

    setSelectedVehicleNos(updatedVehicleNos);
    if (selectedOption) {
      await handleGetGateInEntry(selectedOption ? selectedOption.value : '');
    }
    else {
      setExportCarting([initialExportCarting]);
      setPreExportCarting([]);

      const clearedYards = selectedYardLocationMain.map(() => null);
      setSelectedYardLocationMain(clearedYards);

    }

    setVehicleNos([]);
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






















  const getAllEquipMents = async (cartingTransId, gateInId, sbNo, sbTransId, profitcentreId) => {
    try {
      // Attempt to fetch the data from the service
      const response = await CFSService.getAllEquipmentsCarting(companyid, branchId, processId, profitcentreId, cartingTransId, gateInId, sbTransId, sbNo, jwtToken);

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

  const handleOpenEquipment = async (cartingTransId, cartingLineId, sbTransId, sbNo, gateInId, profitcentreId, vehicleNo) => {

    if (!cartingTransId) {
      toast.error('Please first save the carting', {
        position: 'top-center',
        style: { width: '25vw' },
        autoClose: 1200,
      });
      return;
    }
    setCurrentPageEquipment(1);
    const response = await getAllEquipMents(cartingTransId, gateInId, sbNo, sbTransId, profitcentreId);
    const getVendors = await CFSService.getEquipmentVendor(companyid, branchId, jwtToken);

    const newSrNo = (response && response.length > 0) ? response.length + 1 : 1;

    setEquipmentActivity({
      ...equipmentActivity,
      srNo: newSrNo,
      erpDocRefNo: sbTransId,
      docRefNo: sbNo,
      containerNo: vehicleNo,
      deStuffId: cartingTransId,
      subDocRefNo: "1"
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

    const response = await CFSService.getEquipment(companyid, branchId, processId, profitCenterId, deStuffId, erpDocRefNo, docRefNo, equipment, srNo, jwtToken);



    // console.log('equipMent Single : ', response.data);

    setEquipmentActivity(response.data);
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
      let secondId = response.data.deStuffId.startsWith('CRGY') ? lastEntry.cartingTransId : lastEntry.gateInId;


      await getAllEquipMents(secondId, response.data.deStuffId, response.data.docRefNo, response.data.erpDocRefNo, response.data.profitCenterId);
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


  const handleSave = async (status) => {




    if (!validateExportGateIn(exportCarting)) {

      toast.warning("Plase check the values entered...", {
        position: 'top-center',
        autoClose: 1000,
      });
      return false;
    }

    // console.log('totals.yardPackages :', totals.yardPackages, 'totals.actualNoOfPackages ', totals.actualNoOfPackages);


    if (status === 'A' && totals.yardPackages !== totals.actualNoOfPackages) {
      toast.warning('Total yard packages does not match!', {
        position: 'top-center',
        autoClose: 700,
      });
      return false;
    }



    setLoading(true);
    try {
      const response = await CFSService.addExportCarting(companyid, branchId, exportCarting, jwtToken, userId, status);

      setExportCarting(response.data);
      setPreExportCarting(response.data);

      if (searchData && (searchData.sbNo || searchData.container)
      ) {
        updatePagesList("P00218");
      }


      toast.success('Data added Successfully!', {
        position: 'top-center',
        autoClose: 700,
      });

      return { flag: true, cartingData: response.data };
    } catch (error) {

      toast.error('Oops something went wrong!', {
        position: 'top-center',
        autoClose: 700,
      });
      return { flag: false, cartingData: null };
    } finally {
      setLoading(false);
    }
  };








  const handleReset = async () => {

    const clearedVehicleNos = selectedVehicleNos.map(() => null);
    const clearedYards = selectedYardLocationMain.map(() => null);
    setSelectedYardLocationMain(clearedYards);
    setSelectedVehicleNos(clearedVehicleNos);
    setExportCarting([initialExportCarting]);
    setValidationErrors([]);
    setPreExportCarting([]);
  };





  const [isModalOpenForEquipmentCommon, setIsModalOpenForEquipmentCommon] = useState(false);

  const handleAddEquipmentHeader = async () => {


    if (!lastEntry.cartingTransId) {
      toast.error('CartingTransId is required!', {
        position: 'top-center',
        autoClose: 700,
      });
      return;
    }

    handleOpenEquipmentCommon(lastEntry.cartingTransId, lastEntry.vehicleNo, lastEntry.profitcentreId);

  }



  const handleOpenEquipmentCommon = async (gateInId, vehicleNo, profitCenterId) => {
    setCurrentPageEquipment(1);
    const response = await getAllEquipMentsCommon(gateInId, profitCenterId);
    const getVendors = await CFSService.getEquipmentVendor(companyid, branchId, jwtToken);

    setEquipmentActivity({
      ...equipmentActivity,
      containerNo: vehicleNo,
      deStuffId: gateInId,
      subDocRefNo: "1",
      profitCenterId: profitCenterId
    });


    setAllEquipments(getVendors.data.jar)
    setVendors([getVendors.data.party]);
    setIsModalOpenForEquipmentCommon(true);
  };


  const handleCloseEquipmentCommon = () => {
    setIsModalOpenForEquipmentCommon(false);
    setErrors([]);
    setEquipmentActivityArray([]);


    setEquipmentActivity(initialEquipment);
  }


  const clearEquipMentCommon = () => {
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


  const saveEquipMentCommon = async () => {

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
      const response = await CFSService.saveEquipMentCommonCarting(equipmentActivity, userId, jwtToken);
      await getAllEquipMentsCommon(equipmentActivity.deStuffId, equipmentActivity.profitCenterId);
      toast.success("Records added successfully", {
        position: 'top-center',
        autoClose: 3000,
      });
      // console.log('saveEquipMent \n', response.data);
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


  const getAllEquipMentsCommon = async (gateInId, profitCenterId) => {
    try {
      // Attempt to fetch the data from the service
      let secondId = gateInId.startsWith('CRGY') ? lastEntry.cartingTransId : lastEntry.gateInId;
      const response = await CFSService.getAllEquipmentsCommonCarting(companyid, branchId, secondId, profitCenterId, gateInId, jwtToken);

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



















  const [yardGrid, setYardGrid] = useState([initialYardGrid]);






  // PAGINATION FOR YARD CELL
  const [currentPageYardCell, setCurrentPageYardCell] = useState(1);
  const [itemsPerPageYardCell] = useState(10);

  const indexOfLastItemYardCell = currentPageYardCell * itemsPerPageYardCell;
  const indexOfFirstItemYardCell = indexOfLastItemYardCell - itemsPerPageYardCell;
  const currentItemsYardCell = yardCellArray.slice(indexOfFirstItemYardCell, indexOfLastItemYardCell);
  const totalPagesYardCell = Math.ceil(yardCellArray.length / itemsPerPageYardCell);



  const handlePageChangeYardCell = (page) => {
    if (page >= 1 && page <= totalPagesYardCell) {
      setCurrentPageYardCell(page);
    }
  };


  const displayPagesYardCell = () => {
    const centerPageCount = 5;
    const middlePage = Math.floor(centerPageCount / 2);
    let startPage = currentPageYardCell - middlePage;
    let endPage = currentPageYardCell + middlePage;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPagesYardCell, centerPageCount);
    }
    if (endPage > totalPagesYardCell) {
      endPage = totalPagesYardCell;
      startPage = Math.max(1, totalPagesYardCell - centerPageCount + 1);
    }
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const [validationYardErrors, setValidationYardErrors] = useState([]);


  // Yard Cell 
  const handleOpenYardCell = async (cartingTransId, cartingLineId, profitcentreId, cartingObject) => {

    let updatedCartingTransId = cartingTransId;
    let cartingObjectNew = cartingObject;
    if (!cartingTransId) {
      const { flag, cartingData } = await handleSave('S');

      // // console.log('flag, cartingData \n', flag, cartingData);

      if (flag) {
        const cartingLine = cartingData.find(item => String(item.cartingLineId) === String(cartingLineId));
        const newCartingTransId = cartingLine ? cartingLine.cartingTransId : '';
        updatedCartingTransId = newCartingTransId;
        cartingObjectNew = cartingLine;
      } else {
        return;
      }
    }
    // setYardGrid(prevState => ({
    //   ...prevState,
    //   lineNo: cartingLineId,
    //   processTransId: updatedCartingTransId
    // }));
    await getAllYardCells(updatedCartingTransId, cartingLineId, profitcentreId);

    setCartingObject(cartingObjectNew);

    setIsModalOpenForYardCell(true);
  };

  const handleCloseYardCell = () => {
    setIsModalOpenForYardCell(false);
    setErrors([]);
    setYardCellArray([]);
    setCartingObject({});
    setYardGrid(initialYardGrid);
  }




  const getAllYardCells = async (cartingTransId, cartingLineId) => {
    try {
      // // console.log('cartingTransId : \n', cartingTransId, ' \n cartingLineId : ', cartingLineId);
      const response = await CFSService.getYardCellByCartingId(companyid, branchId, cartingTransId, cartingLineId, jwtToken);
      // // console.log('getAllYardCells : \n', response.data);

      // let totalCellAreaAllocated = 0;
      // let totalYardPackages = 0;
      // Calculate sums
      // response.data.forEach(yardGrid => {
      //   totalCellAreaAllocated += parseFloat(yardGrid.cellAreaAllocated || 0);
      //   totalYardPackages += parseFloat(yardGrid.yardPackages || 0);
      // });

      // // Update the exportCarting array
      // setExportCarting(prevState => {
      //   return prevState.map(item => {
      //     if (item.cartingLineId === cartingLineId) {
      //       return {
      //         ...item,
      //         areaOccupied: parseFloat(totalCellAreaAllocated.toFixed(2)),
      //         yardPackages: totalYardPackages,
      //       };
      //     }
      //     return item;
      //   });
      // });

      const initialSelectedSbNos = response.data.map(entry => ({
        label: entry.yardLocation,
        value: entry.yardLocation,
      }));
      // Set the transformed data into the state
      setSelectedYardLocation(initialSelectedSbNos);

      setYardCellArray(response.data);
    } catch (error) {
      console.error("Error fetching equipment data:", error);
    }
  };



  const addYardCellRow = () => {
    // Get the last entry from yardCellArray
    const lastEntry = yardCellArray[yardCellArray.length - 1];
    // Determine the new subSrNo
    const newSubSrNo = lastEntry ? lastEntry.subSrNo + 1 : 1;
    // Create a new yard cell object
    const newYardCell = {
      companyId: companyid,
      branchId: branchId,
      finYear: lastEntry.finYear,
      processTransId: lastEntry.processTransId,
      lineNo: lastEntry.lineNo,
      subSrNo: newSubSrNo,
      yardLocation: '',
      yardBlock: '',
      blockCellNo: '',
      yardPackages: 0,
      cellArea: 0,
      cellAreaUsed: 0,
      cellAreaAllocated: 0,
      qtyTakenOut: 0,
      areaReleased: 0,
      transType: 'EXP',
      stuffReqQty: 0,
      createdBy: '',
      createdDate: null,
      editedBy: '',
      editedDate: null,
      approvedBy: '',
      approvedDate: null,
      status: ''
    };

    // Update the state to include the new yard cell
    setYardCellArray(prevYardCellArray => [...prevYardCellArray, newYardCell]);
  };



  const validateYardCell = (yardCellArray) => {
    let errors = [];

    yardCellArray.forEach((detail, index) => {
      const { yardPackages, cellAreaAllocated } = detail;
      let error = {};

      // Required field validations
      if (!yardPackages || yardPackages <= 0) {
        error.yardPackages = 'yardPackages is required';
      }

      if (!cellAreaAllocated || cellAreaAllocated <= 0) {
        error.cellAreaAllocated = 'cellAreaAllocated is required';
      }

      // Maximum value validations
      const cartingLine = exportCarting.find(item => String(item.cartingLineId) === String(detail.lineNo));
      const gateInPackages = cartingLine ? cartingLine.actualNoOfPackages : 0; // Default to 0 if not found

      // Sum of yard packages excluding current entry
      const sumYardPackages = yardCellArray.reduce((total, entry, i) => {
        return total + (parseFloat(entry.yardPackages) || 0) * (i !== index);
      }, 0);

      // Validate yardPackages against available gateInPackages
      if (yardPackages > gateInPackages - sumYardPackages) {
        error.yardPackages = 'Yard packages exceed available packages.';
      }

      // Validate cellAreaAllocated against available area
      const cellArea = parseFloat(detail.cellArea) || 0;
      const cellAreaUsed = parseFloat(detail.cellAreaUsed) || 0;
      const availableArea = cellArea - cellAreaUsed;

      if (cellAreaAllocated > availableArea) {
        error.cellAreaAllocated = 'Allocated area exceeds available area.';
      }

      errors.push(error);
    });

    setValidationYardErrors(errors);
    // Check if there are any errors
    return errors.every(error => Object.keys(error).length === 0);
  };




  const saveYardCell = async (cartingObject) => {

    if (!validateYardCell(yardCellArray)) {

      toast.warning("Plase check the values entered...", {
        position: 'top-center',
        autoClose: 1000,
      });

      return false;
    }

    const validatePackageCounts = (cartingObject, yardCellArray) => {
      const totalPackages = parseFloat(cartingObject.actualNoOfPackages);

      // Assuming yardPackages is a property in each yardCellArray item
      const totalYardPackages = yardCellArray.reduce((sum, cell) => {
        return sum + (parseFloat(cell.yardPackages) || 0); // Ensure to handle NaN
      }, 0);

      return totalPackages === totalYardPackages;
    };

    // Usage in your existing code
    if (!validatePackageCounts(cartingObject, yardCellArray)) {
      toast.warning("Yard Packages and Actual Packages should be equal", {
        position: 'top-center',
        autoClose: 1000,
        style: { width: `28vw` },
      });
      return false; // Validation failed
    }


    setLoading(true);  // Indicate loading state
    try {
      // Attempt to save the equipment using the CFSService
      const response = await CFSService.saveImpExpGrid(yardCellArray, userId, jwtToken, cartingObject);

      setYardCellArray(response.data);
      await getAllYardCells(response.data.processTransId, response.data.lineNo);

      await getSelectedCartingSearch(cartingObject.profitcentreId, cartingObject.cartingTransId, cartingObject.cartingLineId, cartingObject.sbNo);
      toast.success("Record added successfully", {
        position: 'top-center',
        autoClose: 3000,
      });

    } catch (error) {
      if (error.response && error.response.status === 400) { // Check if error response exists
        const errorMessage = error.response.data;

        // Create an error object for validation errors
        const errors = [];

        // Check for duplicates in the error response
        if (errorMessage["Duplicate in DB"] || errorMessage["Duplicate in List"]) {
          // Process each type of error
          ["Duplicate in DB", "Duplicate in List"].forEach(errorType => {
            if (errorMessage[errorType]) {
              errorMessage[errorType].forEach(subSrNo => {
                const index = yardCellArray.findIndex(cell => cell.subSrNo === subSrNo);
                if (index !== -1) {
                  errors[index] = { // Set the error at the correct index
                    yardLocationId: yardCellArray[index].yardLocationId, // Assuming this is the identifier
                    message: `${errorType}: SubSrNo ${subSrNo}`,
                  };
                }
              });
            }
          });
        }
        // Set the errors in state
        setValidationYardErrors(errors.filter(Boolean));
        if (errors.length > 0) {
          const firstError = errors.find(err => err); // Find the first error
          const message = firstError ? firstError.message : 'Unknown error';
          toast.error(message, {
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






  const getYardCell = async (processTransId, lineNo, subSrNo, operation) => {


    if (operation === 'EDIT') {
      getYardCellById(processTransId, lineNo, subSrNo);
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
            const response = await CFSService.deleteYardCell(companyid, branchId, processTransId, lineNo, subSrNo, userId, jwtToken);

            await getAllYardCells(processTransId, lineNo);

            toast.info('Yard Details Deleted Successfully!', {
              position: 'top-center',
              autoClose: 700,
            });
          } catch (error) {
            toast.error('Failed to delete Yard Detail. Please try again later.', {
              position: 'top-center',
              autoClose: 700,
            });
            console.error('Error deleting equipment:', error);
          }
        }
      });
    }
  };

  const getYardCellById = async (processTransId, lineNo, subSrNo) => {
    const response = await CFSService.getYardCellBySubLine(companyid, branchId, processTransId, lineNo, subSrNo, jwtToken);
    setYardGrid(response.data);
    setSelectedYardLocation({
      value: `${response.data.yardLocation}${response.data.yardBlock}${response.data.blockCellNo}`,
      label: response.data.yardLocation
    });
  };




  const [yardLocations, setYardLocations] = useState([]);
  const [selectedYardLocation, setSelectedYardLocation] = useState([]);


  console.log('carting : ', exportCarting);


  const searchYardLocations = async (searchvalue) => {

    if (!searchvalue) {
      return;
    }
    try {
      const response = await CFSService.searchYardCells(companyid, branchId, searchvalue, jwtToken);
      setYardLocations(response.data);

      console.log(response.data);
      
    } catch (error) {
      console.error("Error fetching SB entries:", error);
    }
  };

  const handleYardChange = (selectedOption, index) => {
    const fieldName = 'yardLocationId';

    // Prepare the new values from selectedOption
    const newYardLocation = selectedOption ? selectedOption.yardLocationId : '';
    const newYardBlock = selectedOption ? selectedOption.blockId : '';
    const newBlockCellNo = selectedOption ? selectedOption.cellNoRow : '';

    // Check for duplicates in the yardCellArray
    const isDuplicate = yardCellArray.some((cell, i) =>
      i !== index &&
      cell.yardLocation === newYardLocation &&
      cell.yardBlock === newYardBlock &&
      cell.blockCellNo === newBlockCellNo
    );

    if (isDuplicate) {
      // Set the error for the current index if a duplicate is found
      setValidationYardErrors(prevErrors => {
        const updatedErrors = [...prevErrors];
        updatedErrors[index] = {
          ...updatedErrors[index],
          [fieldName]: 'Duplicate Entry',
        };
        return updatedErrors;
      });

      // Optionally clear the selected option if a duplicate is found
      setSelectedYardLocation(prev => {
        const updated = [...prev];
        updated[index] = null; // or keep it unchanged
        return updated;
      });

      return; // Exit the function to prevent adding to yardCellArray
    }

    // If no duplicate, proceed with the update
    const updatedSbNos = [...selectedYardLocation];
    updatedSbNos[index] = selectedOption;

    setSelectedYardLocation(updatedSbNos);

    setYardCellArray((prevYardCellArray) => {
      const updatedYardCellArray = [...prevYardCellArray];

      updatedYardCellArray[index] = {
        ...updatedYardCellArray[index],
        yardLocation: newYardLocation,
        yardBlock: newYardBlock,
        blockCellNo: newBlockCellNo,
        cellArea: selectedOption ? selectedOption.cellArea : '',
        cellAreaUsed: selectedOption ? selectedOption.cellAreaUsed : '',
      };

      return updatedYardCellArray;
    });

    // Clear any existing error for this index
    setValidationYardErrors(prevErrors => {
      const updatedErrors = [...prevErrors];
      if (updatedErrors[index]) {
        delete updatedErrors[index][fieldName];
      }
      return updatedErrors;
    });
  };





  const CustomOption = (props) => {
    return (
      <components.Option {...props}>
        <span style={{ fontWeight: 'bold' }}>{props.data.yardLocationId}</span>
        {" - " + props.data.blockId + " " + props.data.cellNoRow}
      </components.Option>
    );
  };



  const handleRemoveRow = (index, yardEntry) => {
    if (yardCellArray.length > 1) {
      if (yardEntry.status) {
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
              const response = await CFSService.deleteYardCell(companyid, branchId, yardEntry.processTransId, yardEntry.lineNo, yardEntry.subSrNo, userId, jwtToken);

              await getAllYardCells(yardEntry.processTransId, yardEntry.lineNo);

              toast.info('Yard Details Deleted Successfully!', {
                position: 'top-center',
                autoClose: 700,
              });
            } catch (error) {
              toast.error('Failed to delete Yard Detail. Please try again later.', {
                position: 'top-center',
                autoClose: 700,
              });
              console.error('Error deleting equipment:', error);
            }
          }
        });
      }
      else {
        setYardCellArray(yardCellArray.filter((_, i) => i !== index));
      }
    }
  };




  const handleFieldChangeYardGrid = (e, fieldName, type, index, maxIntegerDigits, maxDecimalDigits) => {
    let { value } = e.target;

    // Validate input based on the type
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

    // Update the specific yardCell in the yardGrid array
    setYardCellArray(prevState => {
      const updatedYardGrid = [...prevState];
      updatedYardGrid[index] = {
        ...updatedYardGrid[index],
        [fieldName]: value,
      };

      return updatedYardGrid;
    });

    // Clear validation errors for the field
    setValidationYardErrors(prevErrors => {
      const updatedErrors = [...prevErrors];
      if (updatedErrors[index]) {
        delete updatedErrors[index][fieldName];
      }
      return updatedErrors;
    });
  };


  const handleBlurYard = (index) => {
    const currentEntry = yardCellArray[index];

    const gateInPackages = exportCarting.find(item => String(item.cartingLineId) === String(currentEntry.lineNo))?.actualNoOfPackages || 0;

    // Validation based on field names
    const errors = {};

    if (currentEntry.yardPackages) {
      const sumYardPackages = yardCellArray.reduce((total, entry, i) => {
        return total + (parseFloat(entry.yardPackages) || 0) * (i !== index);
      }, 0);

      const availablePackages = gateInPackages - sumYardPackages;
      if (parseFloat(currentEntry.yardPackages) > availablePackages) {
        errors.yardPackages = 'Yard packages exceed available packages.';
      }
    }

    if (currentEntry.cellAreaAllocated) {
      const cellArea = parseFloat(currentEntry.cellArea) || 0;
      const cellAreaUsed = parseFloat(currentEntry.cellAreaUsed) || 0;
      const availableArea = cellArea - cellAreaUsed;

      if (parseFloat(currentEntry.cellAreaAllocated) > availableArea) {
        errors.cellAreaAllocated = 'Allocated area exceeds available area.';
      }
    }

    // Set validation errors
    setValidationYardErrors(prevErrors => {
      const updatedErrors = [...prevErrors];
      updatedErrors[index] = {
        ...(updatedErrors[index] || {}),
        ...errors,
      };
      return updatedErrors;
    });
  };










  const getEquipMent = async (profitCenterId, deStuffId, docRefNo, erpDocRefNo, equipment, srNo, operation, processId) => {


    let secondId = deStuffId.startsWith('CRGY') ? lastEntry.cartingTransId : lastEntry.gateInId;

    // console.log('secondId : ', secondId);


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




            await getAllEquipMents(secondId, deStuffId, docRefNo, erpDocRefNo, profitCenterId);

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


  const downloadCartingReport = () => {


    setLoading(true);
    axios
      .post(
        `${ipaddress}exportReport/exportCartingReport?cid=${companyid}&bid=${branchId}&id=${lastEntry.cartingTransId}`,
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



  const [selectedYardLocationMain, setSelectedYardLocationMain] = useState([]);


  const handleYardLocationMainSelect = async (selectedOption, index) => {
    setSelectedYardLocationMain(prevState => {
      const updatedState = [...prevState];
      updatedState[index] = selectedOption
        ? {
          value: selectedOption.yardLocationId,
          label: selectedOption.yardLocationId + '-' + selectedOption.blockId + '-' + selectedOption.cellNoRow
        }
        : null;
      return updatedState;
    });

    // Prepare updates based on selected option
    const updates = selectedOption
      ? {
        gridLoc: selectedOption.yardLocationId,
        gridBlock: selectedOption.blockId,
        gridCellNo: selectedOption.cellNoRow,
        yardArea: selectedOption.cellArea,
        yardAreaUsed: selectedOption.cellAreaUsed,
      }
      : {
        gridLoc: '',
        gridBlock: '',
        gridCellNo: '',
        yardArea: 0,
        yardAreaUsed: 0
      };

    // Update exportMovement at the specified index
    setExportCarting(prevState => {
      return prevState.map((item, idx) => {
        if (idx === index) {
          return { ...item, ...updates }; // Update the specific index
        }
        return item; // Return other items unchanged
      });
    });

    // Update validationErrors state for the specific index
    setValidationErrors(prevErrors => {
      return prevErrors.map((error, idx) => {
        if (idx === index) {
          const updatedError = { ...error }; // Copy the error object
          // Remove specific field errors
          delete updatedError.gridBlock;
          return updatedError; // Return the updated error object
        }
        return error; // Return other errors unchanged
      });
    });
  };


  const handleBlurYardNew = async (index, fieldName, yardArea, yardAreaUsed, value) => {
    if (value) {
      const cellArea = parseFloat(yardArea) || 0;
      const cellAreaUsed = parseFloat(yardAreaUsed) || 0;
      const availableArea = cellArea - cellAreaUsed;

      console.log(index, fieldName, yardArea, yardAreaUsed, value);
      setValidationErrors(prevErrors => {
        return prevErrors.map((error, idx) => {
          if (idx === index) {
            const updatedError = { ...error };

            // If the allocated area exceeds the available area, set the error
            if (parseFloat(value) > availableArea) {
              updatedError[fieldName] = 'Allocated area exceeds available area.';
            } else {
              // If the allocated area does not exceed the available area, remove the error
              delete updatedError[fieldName];
            }

            return updatedError; // Return the updated error object
          }

          return error; // Return other errors unchanged
        });
      });
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
                      Carting Trans Id
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="service"
                      readOnly
                      maxLength={15}
                      value={lastEntry.cartingTransId}
                    />
                  </FormGroup>

                </Col>

                <Col md={3} className="d-flex justify-content-end" style={{ marginTop: 21 }}>
                  <button
                    className="btn btn-outline-primary btn-margin newButton"
                    style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    id="submitbtn2"
                    onClick={handleOpenCartingSearch}
                  >
                    <FontAwesomeIcon icon={faSearch} size="sm" s />
                  </button>
                </Col>
              </Row>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label className="forlabel" for="HazardousHazardous"> Gate In Shift</label>
                <div style={{ position: 'relative' }}>
                  <Input
                    type="select"
                    name="shift"
                    className={`form-control`}
                    value={lastEntry.shift}
                    onChange={handleChange}
                    disabled={lastEntry.cartingTransId}
                    id={lastEntry.cartingTransId ? 'service' : ''}
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










            <Modal Modal isOpen={isModalOpenForCartingSearch} onClose={handleCloseCartingSearch} toggle={handleCloseCartingSearch} style={{ maxWidth: '1100px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>

              <ModalHeader toggle={handleCloseCartingSearch} style={{
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
                /> Search Carting Entries</h5>

              </ModalHeader>
              <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <label className="forlabel bold-label" htmlFor="sbRequestId">
                        Search by Carting TransId / Sb No / Vehicle No
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="searchCartingvalues"
                        maxLength={15}
                        name='searchCartingvalues'
                        value={searchCartingvalues}
                        onChange={(e) => setSearchCartingvalues(e.target.value)}
                      />

                    </FormGroup>
                  </Col>
                  <Col md={6} style={{ marginTop: 24 }}>
                    <button
                      className="btn btn-outline-primary btn-margin newButton"
                      style={{ marginRight: 10, fontWeight: 'bold' }}
                      id="submitbtn2"
                      onClick={() => searchCartingSearch(searchCartingvalues)}
                    >
                      <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                      Search
                    </button>
                    <button
                      className="btn btn-outline-danger btn-margin newButton"
                      style={{ marginRight: 10, fontWeight: 'bold' }}
                      id="submitbtn2"
                      onClick={clearCartingSearch}
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
                        <th scope="col">Carting Trans Id</th>
                        <th scope="col">Carting Trans Date</th>
                        <th scope="col">SB No</th>
                        <th scope="col">Status</th>
                      </tr>
                      <tr className='text-center'>
                        <th scope="col"></th>
                        <th scope="col">{cartingSearchData.length}</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>

                      {currentItemsCartingSearch.map((item, index) => (
                        <>
                          <tr key={index} className='text-center'>
                            <td>
                              <input type="radio" name="radioGroup" onChange={() => selectCartingSearchRadio(item[0], item[1], item[2], item[4])} value={item[0]} />
                            </td>
                            <td>{item[1]}</td>
                            <td>{formatDate(item[3])}</td>
                            <td>{item[4]}</td>
                            <td>{item[6] === 'A' ? 'Approved' : item[6] === 'N' ? 'New' : ''}</td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                  <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                    <Pagination.First onClick={() => handlePageChangeCarting(1)} />
                    <Pagination.Prev
                      onClick={() => handlePageChangeCarting(currentPageCartingSearch - 1)}
                      disabled={currentPageCartingSearch === 1}
                    />
                    <Pagination.Ellipsis />

                    {displayPagesCarting().map((pageNumber) => (
                      <Pagination.Item
                        key={pageNumber}
                        active={pageNumber === currentPageCartingSearch}
                        onClick={() => handlePageChangeCarting(pageNumber)}
                      >
                        {pageNumber}
                      </Pagination.Item>
                    ))}
                    <Pagination.Ellipsis />
                    <Pagination.Next
                      onClick={() => handlePageChangeCarting(currentPageCartingSearch + 1)}
                      disabled={currentPageCartingSearch === totalPagesCartingSearch}
                    />
                    <Pagination.Last onClick={() => handlePageChangeCarting(totalPagesCartingSearch)} />
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
                  Carting Trans Date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={lastEntry.cartingTransDate}
                    // onChange={(date) => handleDateChange('inGateInDate', date)}
                    id="service"
                    name="cartingTransDate"
                    placeholderText="Enter Carting Date"
                    dateFormat="dd/MM/yyyy HH:mm" // Updated format
                    timeInputLabel="Time:"
                    showTimeInput
                    timeFormat="HH:mm" // 24-hour format for time
                    timeIntervals={15}
                    className={`form-control ${errors.cartingTransDate ? 'error-border' : ''}`}
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
            {/* 
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Approved By
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  readOnly
                  maxLength={15}
                  name="viaNo"
                  value={lastEntry.approvedBy}
                  tabIndex={-1}
                />
              </FormGroup>
            </Col> */}



            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Area Occupied
                  {/* <span className="error-message">*</span> */}
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  readOnly
                  name="areaOccupied"
                  value={totals.areaOccupied}
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
                  Yard Packages
                  {/* <span className="error-message">*</span> */}
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  readOnly
                  maxLength={15}
                  name="yardPackages"
                  value={totals.yardPackages}
                  tabIndex={-1}
                />
              </FormGroup>
            </Col>







          </Row>
        </div>
        <div>
        </div>

        <Row className="text-center">
          <Col>
            <button
              className="btn btn-outline-primary btn-margin newButton"
              style={{ marginRight: 10, fontSize: 13 }}
              id="submitbtn2"
              onClick={(e) => handleSave('S')}
              disabled={lastEntry.status === 'A'}
            >
              <FontAwesomeIcon
                icon={faSave}
                style={{ marginRight: "5px" }}
              />
              Save
            </button>

            <button
              className="btn btn-outline-primary btn-margin newButton"
              style={{ marginRight: 10, fontSize: 13 }}
              disabled={lastEntry.status === 'A'}
              id="submitbtn2"
              onClick={(e) => handleSave('A')}
            >
              <FontAwesomeIcon
                icon={faCheck}
                style={{ marginRight: "5px" }}
              />
              Submit
            </button>

            <button
              className="btn btn-outline-danger btn-margin newButton"
              style={{ marginRight: 10, fontSize: 13 }}
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
              style={{ marginRight: 10, fontSize: 13 }}
              id="submitbtn2"
              onClick={handleAddEquipmentHeader}
            >
              <FontAwesomeIcon icon={faAdd} style={{ marginRight: "5px" }} />
              Equipment
            </button>
            <button
              className="btn btn-outline-success btn-margin newButton"
              style={{ marginRight: 10, fontSize: 13 }}
              id="submitbtn2"
              disabled={lastEntry.cartingTransId === ''}
              onClick={downloadCartingReport}
            >
              <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
              Print Report
            </button>
          </Col>
        </Row>

        {/* ...Carting... */}

        <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
          <Table className="table table-bordered" style={{ border: '2px solid black' }}>
            <thead>
              <tr>

                <th scope="col" className="text-center" style={{ color: "black" }}>
                  Vehicle No
                </th>

                <th scope="col" className="text-center" style={{ color: "black", width: "100px" }}>
                  SB Trans Id
                </th>
                <th scope="col" className="text-center" style={{ color: "black", width: "100px" }}>
                  SB No
                </th>
                <th scope="col" className="text-center" style={{ color: "black" }}>
                  SB Date
                </th>

                <th scope="col" className="text-center" style={{ color: "black" }}>
                  GateIn Id
                </th>

                <th scope="col" className="text-center" style={{ color: "black" }}>
                  On Account
                </th>

                <th scope="col" className="text-center" style={{ color: "black" }}>
                  Commodity
                </th>

                <th scope="col" className="text-center" style={{ color: "black" }}>
                  GateIn Packages
                </th>
                <th scope="col" className="text-center" style={{ color: "black" }}>
                  Actual Packages <span className="error-message">*</span>
                </th>
                <th scope="col" className="text-center" style={{ color: "black" }}>
                  Shortage Packages
                </th>
                <th scope="col" className="text-center" style={{ color: "black" }}>
                  Excess Packages
                </th>

                <th scope="col" className="text-center" style={{ color: "black" }}>
                  Damage Packages
                </th>

                <th scope="col" className="text-center" style={{ color: "black" }}>
                  Damage Comments
                </th>
                <th scope="col" className="text-center" style={{ color: "black" }}>
                  Yard Location <span className="error-message">*</span>
                </th>
                <th scope="col" className="text-center" style={{ color: "black" }}>
                  Area Occupied <span className="error-message">*</span>
                </th>
                <th scope="col" className="text-center" style={{ color: "black" }}>
                  Yard Packages <span className="error-message">*</span>
                </th>
                <th scope="col" className="text-center" style={{ color: "black" }}>
                  Space <span className="error-message">*</span>
                </th>

                <th scope="col" className="text-center" style={{ color: "black" }}>
                  Yard
                </th>

                <th scope="col" className="text-center" style={{ color: "black" }}>
                  Equipment
                </th>


              </tr>
            </thead>
            <tbody>
              {exportCarting.map((cargoEntry, index) => (
                <tr key={index} className="text-center">
                  <td>
                    <FormGroup>
                      {index === 0 && !cargoEntry.status ? (
                        // Render Select component only for the first row and if the status doesn't exist
                        <Select
                          options={vehicleNos}
                          value={selectedVehicleNos[index]}
                          onChange={(selectedOption) => handleVehicleNoChange(selectedOption, index)}
                          onInputChange={(inputValue, { action }) => {
                            if (action === 'input-change') {
                              searchVehicleNos(inputValue);
                            }
                          }}
                          className={`inputwidthTukaMax ${validationErrors[index]?.vehicleNo ? 'error-border' : ''}`}
                          placeholder="Select Vehicle No"
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
                      ) : (
                        // Render Input field for all other rows or if status exists
                        <Input
                          type="text"
                          value={cargoEntry.vehicleNo}
                          className={`inputwidthTukaMax form-control ${validationErrors[index]?.vehicleNo ? 'error-border' : ''}`}
                          readOnly={cargoEntry.status ? true : false}
                          id="service"
                          tabIndex={-1}
                        />
                      )}
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
                        value={cargoEntry.sbNo}
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
                        value={formatDateOnly(cargoEntry.sbDate)}
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
                        value={cargoEntry.gateInId}
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
                        value={cargoEntry.onAccountOf && cargoEntry.onAccountOf.startsWith('P') ? cargoEntry.onAccountOfName : cargoEntry.onAccountOf}
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
                        value={cargoEntry.commodity}
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
                        className={`inputwidthTuka form-control ${validationErrors[index]?.actualNoOfPackages ? 'error-border' : ''}`}
                        maxLength={8}
                        value={cargoEntry.actualNoOfPackages}
                        onChange={(e) => handleFieldChange(e, index, 'actualNoOfPackages', 'number')}
                        onBlur={() => handleBlur(index)}
                      />
                    </FormGroup>
                  </td>


                  <td>
                    <FormGroup>
                      <Input
                        type="text"
                        className={`inputwidthTuka form-control ${validationErrors[index]?.shortagePackages ? 'error-border' : ''}`}
                        maxLength={8}
                        value={cargoEntry.shortagePackages}
                        onChange={(e) => handleFieldChange(e, index, 'shortagePackages', 'number')}
                        onBlur={() => handleBlur(index)}
                      />
                    </FormGroup>
                  </td>

                  <td>
                    <FormGroup>
                      <Input
                        type="text"
                        className={`inputwidthTuka form-control ${validationErrors[index]?.excessPackages ? 'error-border' : ''}`}
                        maxLength={8}
                        value={cargoEntry.excessPackages}
                        onChange={(e) => handleFieldChange(e, index, 'excessPackages', 'number')}
                        onBlur={() => handleBlur(index)}
                      />
                    </FormGroup>
                  </td>


                

                  <td>
                    <FormGroup>
                      <Input
                        type="text"
                        className={`inputwidthTuka form-control ${validationErrors[index]?.damagePackages ? 'error-border' : ''}`}
                        maxLength={8}
                        value={cargoEntry.damagePackages}
                        onChange={(e) => handleFieldChange(e, index, 'damagePackages', 'number')}
                      />
                    </FormGroup>
                  </td>





                  <td>
                    <FormGroup>
                      <textarea
                        type="text"
                        className={`inputwidthTukaMax form-control`}
                        maxLength={150}
                        value={cargoEntry.damageComments}
                        onChange={(e) => handleFieldChange(e, index, 'damageComments')}
                        rows={1}
                      ></textarea>
                    </FormGroup>
                  </td>




                  <td>
                    <FormGroup>


                      {!cargoEntry.status ? (

                        <Select
                          value={selectedYardLocationMain[index]}
                          onChange={(selectedOption) => handleYardLocationMainSelect(selectedOption, index)}
                          options={yardLocations}
                          placeholder="Select Location"
                          onInputChange={(inputValue, { action }) => {
                            if (action === 'input-change') {
                              searchYardLocations(inputValue);
                            }
                          }}
                          isClearable
                          id="gridLocation"
                          name='gridLocation'
                          components={{ Option: CustomOption }}
                          className={`inputwidthTuka ${validationErrors[index]?.gridBlock ? 'error-border' : ''}`}
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
                      ) : (

                        <Input
                          type="text"
                          value={cargoEntry.gridLoc + '-' + cargoEntry.gridBlock + '-' + cargoEntry.gridCellNo}
                          className={`inputwidthTukaMax form-control`}
                          readOnly={cargoEntry.status ? true : false}
                          id="service"
                          tabIndex={-1}
                        />

                      )}
                    </FormGroup>
                  </td>




                  {/* <td>
                    <FormGroup>
                      <Input
                        type="text"
                        name='gridBlock'
                        className={`inputwidthTuka form-control ${validationErrors[index]?.gridBlock ? 'error-border' : ''}`}
                        maxLength={10}
                        value={cargoEntry.gridBlock}
                        onChange={(e) => handleFieldChange(e, index, 'gridBlock')}
                      />
                    </FormGroup>
                  </td> */}










                  <td>
                    <FormGroup>
                      <Input
                        type="text"
                        name='areaOccupied'
                        value={cargoEntry.areaOccupied}
                        className={`inputwidthTuka form-control ${validationErrors[index]?.areaOccupied ? 'error-border' : ''}`}
                        maxLength={12}
                        onChange={(e) => handleFieldChange(e, index, 'areaOccupied', 'decimal', 8, 3)}
                        onBlur={(e) => handleBlurYardNew(index, 'areaOccupied', cargoEntry.yardArea, cargoEntry.yardAreaUsed, e.target.value)}
                        id={cargoEntry.status ? 'service' : ''}
                        readOnly={cargoEntry.status}

                      />
                    </FormGroup>
                  </td>

                  <td>
                    <FormGroup>
                      <Input
                        type="text"
                        name='yardPackages'
                        value={cargoEntry.yardPackages}
                        className={`inputwidthTuka form-control ${validationErrors[index]?.yardPackages ? 'error-border' : ''}`}
                        maxLength={8}
                        onChange={(e) => handleFieldChange(e, index, 'yardPackages', 'number')}
                        onBlur={() => handleBlur(index)}
                        id={cargoEntry.status ? 'service' : ''}
                        readOnly={cargoEntry.status}
                      />
                    </FormGroup>
                  </td>
                  <td>

                    <Input
                      type="select"
                      name="gridLocation"
                      className={`inputwidthTuka form-control ${validationErrors[index]?.gridLocation ? 'error-border' : ''}`}
                      value={cargoEntry.gridLocation}
                      onChange={(e) => handleFieldChange(e, index, 'gridLocation')}
                    >
                      <option value="">Select</option>
                      <option value="GEN">General</option>
                      <option value="RES">Reserved</option>
                    </Input>
                  </td>




                  <td>
                    <button
                      className="btn btn-outline-primary btn-margin newButton"
                      style={{ marginRight: 10 }}
                      id="submitbtn2"
                      disabled={lastEntry.status === 'A'}
                      onClick={() => handleOpenYardCell(cargoEntry.cartingTransId, cargoEntry.cartingLineId, cargoEntry.profitcentreId, cargoEntry)}
                    >
                      <FontAwesomeIcon
                        icon={faAdd}
                      />
                    </button>
                  </td>

                  <td>
                    <button
                      className="btn btn-outline-primary btn-margin newButton"
                      style={{ marginRight: 10 }}
                      id="submitbtn2"
                      disabled={lastEntry.status === 'A'}
                      onClick={() => handleOpenEquipment(cargoEntry.cartingTransId, cargoEntry.cartingLineId, cargoEntry.sbTransId, cargoEntry.sbNo, cargoEntry.gateInId, cargoEntry.profitcentreId, cargoEntry.vehicleNo)}
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










        {/* MODELS */}

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
                    CartingTarnsId/ Gate Pass No
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
                    Vehicle No
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


        {/* Common Equipment */}

        <Modal Modal isOpen={isModalOpenForEquipmentCommon} onClose={handleCloseEquipmentCommon} toggle={handleCloseEquipmentCommon} style={{ maxWidth: '1100px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>

          <ModalHeader toggle={handleCloseEquipmentCommon} style={{
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
            />Container Equipment Summary (Common)</h5>

          </ModalHeader>
          <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
            <Row>
              <Col md={3}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="sbRequestId">
                    CartingTransId
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


              <Col md={3}>
                <FormGroup>
                  <Label className="forlabel bold-label" htmlFor="sbRequestId">
                    Vehicle No
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

              <Col md={3}>
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

              <Col md={3}>
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
                  onClick={saveEquipMentCommon}
                >
                  <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                  Save
                </button>
                <button
                  className="btn btn-outline-danger btn-margin newButton"
                  style={{ marginRight: 10, fontWeight: 'bold' }}
                  id="submitbtn2"
                  onClick={clearEquipMentCommon}
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
                      {/* <th scope="col">Action</th> */}
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
                          {/* <td>
                  <button
                    type="button"
                    className="btn me-md-2  btn-outline-primary"
                    onClick={(e) => getEquipMent(item.profitCenterId, item.deStuffId, item.docRefNo, item.erpDocRefNo, item.equipment, item.srNo, 'EDIT')}
                  ><FontAwesomeIcon icon={faEdit} />

                  </button>

                  <button
                    type="button"
                    className="btn gap-2  btn-outline-danger"
                    onClick={(e) => getEquipMent(item.profitCenterId, item.deStuffId, item.docRefNo, item.erpDocRefNo, item.equipment, item.srNo, 'DELETE')}
                  > <FontAwesomeIcon icon={faTrash} />

                  </button>

                </td> */}
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




        {/*Yard  model*/}
        <Modal Modal isOpen={isModalOpenForYardCell} onClose={handleCloseYardCell} toggle={handleCloseYardCell} style={{ maxWidth: '1100px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>
          <ModalHeader toggle={handleCloseYardCell} style={{
            backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
            boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
            border: '1px solid rgba(0, 0, 0, 0.3)',
            borderRadius: '0',
            backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}>
            <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', color: 'white' }} > <FontAwesomeIcon
              icon={faSearch}
              style={{
                marginRight: '8px',
                color: 'white',
              }}
            />Add Yard Location</h5>
          </ModalHeader>
          <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
            <Row>
              <Col md={2}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="sbRequestId">
                    Process Trans Id
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    maxLength={15}
                    name='processTransId'
                    value={lastEntry.cartingTransId}
                    readOnly
                    id="service"
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
                    Process Trans Date
                  </label>
                  <div style={{ position: "relative" }}>
                    <DatePicker
                      selected={lastEntry.cartingTransDate}
                      id="service"
                      name="ProcessTransDate"
                      placeholderText="ProcessTransDate"
                      dateFormat="dd/MM/yyyy HH:mm"
                      timeInputLabel="Time:"
                      showTimeInput
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      className={`form-control`}
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
                    Area Occupied
                  </label><span className="error-message">*</span>
                  <input
                    className="form-control"
                    type="text"
                    maxLength={15}
                    name='containerNo'
                    value={totalsYard.areaOccupied}
                    readOnly
                    id="service"
                    tabIndex={-1}
                  />
                </FormGroup>
              </Col>

              <Col md={2}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="sbRequestId">
                    Yard Packages
                  </label><span className="error-message">*</span>
                  <input
                    className="form-control"
                    type="text"
                    maxLength={15}
                    name='containerNo'
                    value={totalsYard.yardPackages}
                    readOnly
                    id="service"
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
                    maxLength={15}
                    name='status'
                    value={lastEntry.status === 'A' ? 'Approved' : lastEntry.status === 'N' ? 'New' : ''}
                    readOnly
                    id="service"
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
                    maxLength={15}
                    name='status'
                    value={lastEntry.createdBy}
                    readOnly
                    id="service"
                    tabIndex={-1}
                  />

                </FormGroup>
              </Col>
            </Row>

            <hr />

            <div className="table-responsive mt-3">
              <Table className="table table-bordered" style={{ border: '2px solid black' }}>
                <thead>
                  <tr>
                    <th scope="col" className="text-center" style={{ color: "black", width: "100px" }}>
                      Select Yard Location<span className="error-message">*</span>
                    </th>
                    <th scope="col" className="text-center" style={{ color: "black", width: "100px" }}>
                      Yard Block
                    </th>
                    <th scope="col" className="text-center" style={{ color: "black" }}>
                      Block Cell
                    </th>
                    <th scope="col" className="text-center" style={{ color: "black" }}>
                      Cell Area
                    </th>
                    <th scope="col" className="text-center" style={{ color: "black" }}>
                      Cell Area Used
                    </th>
                    <th scope="col" className="text-center" style={{ color: "black" }}>
                      Area Occupied<span className="error-message">*</span>
                    </th>
                    <th scope="col" className="text-center" style={{ color: "black" }}>
                      Yard Packages<span className="error-message">*</span>
                    </th>

                    {yardCellArray.length > 1 && yardCellArray.some(entry => !entry.status) && (
                      <th scope="col" className="text-center" style={{ color: "black" }}>
                        Action
                      </th>
                    )}



                  </tr>
                </thead>

                <tbody>
                  {yardCellArray.map((yardEntry, index) => (



                    <tr key={index} className="text-center">
                      <td>
                        <FormGroup>
                          <Select
                            options={yardLocations}
                            value={selectedYardLocation[index]}
                            onChange={(selectedOption) => handleYardChange(selectedOption, index, yardEntry.processTransId, yardEntry.lineNo, yardEntry.subSrNo)}
                            onInputChange={(inputValue, { action }) => {
                              if (action === 'input-change') {
                                searchYardLocations(inputValue);
                              }
                            }}
                            className={`inputwidthTuka ${validationYardErrors[index]?.yardLocationId ? 'error-border' : ''}`}
                            placeholder="Select location"
                            isDisabled={yardEntry.status}
                            id={yardEntry.status ? 'service' : ''}
                            isClearable
                            components={{ Option: CustomOption }}
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
                              menuPortal: (base) => ({
                                ...base,
                                zIndex: 9999, // Ensures the dropdown is above all other elements
                              }),

                              placeholder: (provided) => ({
                                ...provided,
                                lineHeight: '32px',
                                color: 'gray',
                              }),
                            }}
                          />
                        </FormGroup>

                        {validationYardErrors[index]?.yardLocationId && (
                          <div className="error-message">
                            {validationYardErrors[index]?.yardLocationId}
                          </div>
                        )}
                      </td>

                      <td>
                        <FormGroup>
                          <input
                            className="form-control inputwidthTuka"
                            type="text"
                            maxLength={15}
                            value={yardEntry.yardBlock}
                            readOnly
                            tabIndex={-1}
                            id='service'
                          />
                        </FormGroup>
                      </td>

                      <td>
                        <FormGroup>
                          <input
                            className="form-control inputwidthTuka"
                            type="text"
                            maxLength={15}
                            value={yardEntry.blockCellNo}
                            readOnly
                            tabIndex={-1}
                            id='service'
                          />
                        </FormGroup>
                      </td>

                      <td>
                        <FormGroup>
                          <input
                            className="form-control inputwidthTuka"
                            type="text"
                            maxLength={15}
                            value={yardEntry.cellArea}
                            readOnly
                            tabIndex={-1}
                            id='service'
                          />
                        </FormGroup>
                      </td>

                      <td>
                        <FormGroup>
                          <input
                            className="form-control inputwidthTuka"
                            type="text"
                            maxLength={15}
                            value={yardEntry.cellAreaUsed}
                            readOnly
                            id='service'
                            tabIndex={-1}
                          />
                        </FormGroup>
                      </td>

                      <td>
                        <FormGroup>
                          <input
                            className={`form-control inputwidthTuka ${validationYardErrors[index]?.cellAreaAllocated ? 'error-border' : ''}`}
                            type="text"
                            maxLength={22}
                            value={yardEntry.cellAreaAllocated}
                            onChange={(e) => handleFieldChangeYardGrid(e, 'cellAreaAllocated', 'decimal', index, 18, 3)} // Pass index
                            onBlur={() => handleBlurYard(index)}
                          />
                        </FormGroup>
                      </td>

                      <td>
                        <FormGroup>
                          <input
                            className={`form-control inputwidthTuka ${validationYardErrors[index]?.yardPackages ? 'error-border' : ''}`}
                            type="text"
                            maxLength={10}
                            value={yardEntry.yardPackages}
                            onChange={(e) => handleFieldChangeYardGrid(e, 'yardPackages', 'number', index)} // Pass index
                            onBlur={() => handleBlurYard(index)}
                          />
                        </FormGroup>
                      </td>


                      {(index > 0 && index === yardCellArray.length - 1 && !yardEntry.status) && (
                        <td>
                          <FontAwesomeIcon
                            icon={faTimesCircle}
                            onClick={() => handleRemoveRow(index, yardEntry)}
                            style={{ color: 'red', cursor: 'pointer', fontSize: '24px' }}
                          />
                        </td>
                      )}

                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>


            <Row className="text-center mt-1 mb-1">
              <Col>
                <button
                  className="btn btn-outline-primary btn-margin newButton"
                  style={{ marginRight: 10, fontWeight: 'bold' }}
                  id="submitbtn2"
                  onClick={(e) => saveYardCell(cartingObject)}
                >
                  <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                  Save
                </button>
                <button
                  className="btn btn-outline-danger btn-margin newButton"
                  style={{ marginRight: 10, fontWeight: 'bold' }}
                  id="submitbtn2"
                  onClick={addYardCellRow}
                >
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
                  Add Row
                </button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>










      </div>
    </>
  );
}

export default ExportCarting;
