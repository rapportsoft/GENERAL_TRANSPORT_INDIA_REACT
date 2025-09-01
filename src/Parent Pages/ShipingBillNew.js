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
  Input,
  Table,
} from "reactstrap";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faShip, faBackward, faCalendarAlt, faAdd, faSyncAlt, faTimesCircle, faPlusCircle, faReceipt, faEye } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import { Button } from "react-bootstrap";
import useAxios from '../Components/useAxios';
import cfsService from '../service/CFSService';
import movementService from "../service/MovementService";
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import pdfLogo from "../Images/pdfLogo.png";
import xlsLogo from "../Images/xlsLogo.png";



function ShipingBillNew({ searchData, resetFlag, updatePagesList }) {

  const navigate = useNavigate();
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
  const MovementService = new movementService(axiosInstance);

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

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const processId = 'P00216';

  const foundRights = role !== 'ROLE_ADMIN' ? userRights.find(item => item.process_Id === processId) : null;
  const allowCreate = foundRights?.allow_Create === 'Y';
  const allowRead = foundRights?.allow_Read === 'Y';
  const allowEdit = foundRights?.allow_Update === 'Y';
  const allowDelete = foundRights?.allow_Delete === 'Y';

  const [profitcentre, setProfitcentre] = useState({
    profitcentreId: '',
    profitcentreDesc: ''
  });

  const [isSearchData, setIsSearchData] = useState(false);

  useEffect(() => {
    if (searchData && searchData.activeTab === processId && searchData.sbTransId && searchData.hsbSbTransId && searchData.sbNo && searchData.profitCenterId) {
      // await getSelectedSbSearch(sbTransId, hsbTransId, sbNo, profitCenter);
      getSelectedSbSearch(searchData.sbTransId, searchData.hsbSbTransId, searchData.sbNo, searchData.profitCenterId);
      setIsSearchData(true);
    } else {
      setIsSearchData(false);
    }
  }, [searchData]);
  useEffect(() => {
    if (resetFlag) {
      handleReset();
    }
  }, [resetFlag]);



  const initialSbEntry = {
    companyId: companyid,
    branchId: branchId,
    finYear: '',
    profitcentreId: profitcentre.profitcentreId,
    sbTransId: '',
    sbNo: '',
    sbTransDate: new Date(),
    sbDate: null,
    iecCode: '',
    state: '',
    gstNo: '',
    srNo: '',
    exporterId: '',
    exporterName: '',
    exporterAddress1: '',
    exporterAddress2: '',
    exporterAddress3: '',
    consigneeName: '',
    consigneeAddress1: '',
    consigneeAddress2: '',
    consigneeAddress3: '',
    sbType: 'Normal',
    cargoType: 'NAGRO',
    cargoLoc: 'WH',
    cha: '',
    chaName: '',
    chaCode: '',
    pol: '',
    pod: '',
    destinationCountry: '',
    totalPackages: 0,
    gateInPackages: 0,
    stuffedQty: 0,
    totalGrossWeight: 0.0000,
    haz: 'N',
    imoCode: '',
    comments: '',
    outOfCharge: 'N',
    outOfChargeDate: null,
    onAccountOf: '',
    onAccountOfName: '',
    drawBackValue: 0.00,
    status: '',
    createdBy: '',
    createdDate: null,
    editedBy: '',
    editedDate: null,
    approvedBy: '',
    approvedDate: null,
    leoNo: '',
    leoDate: null,
    mpcin: '',
    gatewayPort: '',
    payLoad: '',
    mpcinReadDate: null,
    holdStatus: 'N',
    holdingAgentName: '',
    holdDate: null,
    holdRemarks: '',
    releaseAgent: '',
    releaseDate: null,
    releaseRemarks: '',
    hSbTransId: '',
    ssrTransId: '',
    documentUploadFlag: 'N',
    onAccountOfCode: '',
    chaCode: ''
  };




  const initialSbCargoEntry =
  {
    srno: 1,
    companyId: companyid,
    branchId: branchId,
    finYear: '',
    profitcentreId: profitcentre.profitcentreId,
    sbTransId: '',
    sbLineNo: '1',
    commodity: '',
    sbNo: '',
    sbDate: null,
    numberOfMarks: '',
    noOfPackages: 0,
    gateInPackages: 0,
    cartedPackages: 0,
    stuffReqQty: 0,
    stuffedQty: 0,
    backToTownPack: 0,
    bttOutQty: 0,
    transferPackages: 0,
    nilPackages: 0,
    typeOfPackage: '',
    grossWeight: '',
    fob: '',
    createdBy: '',
    createdDate: null,
    approvedBy: '',
    approvedDate: null,
    status: '',
    hSbTransId: '',
    sbType: '',
    cargoType: '',
    drawBackValue: '',
    invoiceNo: '',
    invoiceDate: null,
    haz: '',
    unNo: '',
    newCommodity: '',
    invoiceAssesed: '',
    assesmentId: '',
    crgInvoiceNo: '',
    cartingType: '',
    isBos: 'N',
    zeroCartingFlag: 'N',
    zeroCartingDate: null,
    zeroCartingApproval: '',
    zeroRemarks: '',
    bufferStuffing: '',
    lastStorageInvoiceDate: null,
    lastStorageInvoiceDone: 'N',
    storageInvoiceAssesed: 'N',
    storageAssesmentId: '',
    scmtrCharge: 'N',
    hazStatus: 'N',
    cartingStatus: 'N'
  };




  const [exporterData, setExporterData] = useState([]);
  const [exportSbEntry, setExportSbEntry] = useState(initialSbEntry);
  const [exportSbCargoEntry, setExportSbCargoEntry] = useState([initialSbCargoEntry]);



  console.log(' exportSbEntry  : \n', exportSbEntry, ' \n exportSbCargoEntry : \n', exportSbCargoEntry);



  useEffect(() => {
    const fetchData = async () => {
      await getPols('INDIA');
      await getImoCodes('J00016');
      await getProgitCenterById('N00004');
      await getCargoType('J00006');
      await getPackageType('J00060');
    };
    fetchData();
  }, []);


  const [pol, setPol] = useState([]);
  const [selectedPol, setSelectedPol] = useState(null);

  const [imoCodes, setImoCodes] = useState([]);
  const [selectedImoCode, setSelectedImoCode] = useState(null);

  const [cargoTypes, setCargoType] = useState([]);

  const [packagesTypes, setPackagesTypes] = useState([]);


  // // console.log("exportSbEntry \n ", exportSbEntry);
  // // console.log("exportSbCargoEntry \n ", exportSbCargoEntry);


  const getImoCodes = async (jarId) => {
    const portType = await getjarByJarId(jarId);
    setImoCodes(portType);
  };

  const getPols = async (jarId) => {
    const portType = await getPortToSelect(jarId);
    setPol(portType);
  };


  const getPortToSelect = async (jobOrderPrefix) => {
    try {
      const response = await CFSService.getPortToSelect(companyid, branchId, jobOrderPrefix, jwtToken);
      return response.data;
    } catch (error) {
      console.error("Error fetching port data:", error);
      // You can either return a default value, throw the error, or handle it as needed
      throw error; // Re-throw the error if you want to handle it elsewhere
    }
  };



  const getCargoType = async (jarId) => {
    const cargoType = await getjarByJarId(jarId);
    setCargoType(cargoType);
  };

  const getPackageType = async (jarId) => {
    const packageType = await getjarByJarId(jarId);
    setPackagesTypes(packageType);
  };


  const getProgitCenterById = async (profitCenterId) => {
    try {
      const response = await CFSService.getProgitCenterById(companyid, branchId, profitCenterId, jwtToken);
      setProfitcentre(response.data);
      // Update exportSbEntry with the profitcentreId
      setExportSbEntry(prevState => ({
        ...prevState,
        profitcentreId: response.data.profitcentreId
      }));

      // Update each item in exportSbCargoEntry with the profitcentreId
      setExportSbCargoEntry(prevState =>
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



  const handlePolChange = selectedOption => {
    setSelectedPol(selectedOption);
    setExportSbEntry({ ...exportSbEntry, pol: selectedOption ? selectedOption.label : '' });
    setErrors(prevErrors => ({
      ...prevErrors,
      pol: '',
    }));
  };



  const [selectedExp, setSelectedExp] = useState(null);
  const [selectedCha, setSelectedCha] = useState(null);
  const [selectedOnAccount, setSelectedOnAccount] = useState(null);


  // console.log('selectedExp \n ', selectedExp);
  // console.log('exporterData \n ', exporterData);
  const handleExporterChange = (selectedOption) => {
    // console.log('selectedOption \n ', selectedOption);


    setSelectedExp(selectedOption);
    setExportSbEntry((prevExportSbEntry) => ({
      ...prevExportSbEntry,
      exporterId: selectedOption ? selectedOption.partyId : '',
      exporterName: selectedOption ? selectedOption.partyName : '',
      exporterAddress1: selectedOption ? selectedOption.address1?.substring(0, 250) : '', // Truncate to 250 characters
      exporterAddress2: selectedOption ? selectedOption.address2?.substring(0, 100) : '', // Truncate to 100 characters
      exporterAddress3: selectedOption ? selectedOption.address3?.substring(0, 100) : '', // Truncate to 100 characters
      srNo: selectedOption ? selectedOption.srNo : '',
      gstNo: selectedOption ? selectedOption.gstNo : '',
      state: selectedOption ? selectedOption.state : '',
      iecCode: selectedOption ? selectedOption.iecCode : '',
    }));

    // handleCloseExp();

    setErrors((prevErrors) => ({
      ...prevErrors,
      exporterId: '',
      exporterAddress1: '',
    }));
  };


  const handleChaChange = (selectedOption) => {

    setSelectedCha(selectedOption);
    setExportSbEntry((prevExportSbEntry) => ({
      ...prevExportSbEntry,
      cha: selectedOption ? selectedOption.value : '',
      chaName: selectedOption ? selectedOption.label : '',
      chaCode: selectedOption ? selectedOption.customerCode : ''
    }));

    // handleCloseExp();

    setErrors((prevErrors) => ({
      ...prevErrors,
      cha: ''
    }));

  }

  const handleOnAccountChange = (selectedOption) => {

    setSelectedOnAccount(selectedOption);
    setExportSbEntry((prevExportSbEntry) => ({
      ...prevExportSbEntry,
      onAccountOf: selectedOption ? selectedOption.value : '',
      onAccountOfName: selectedOption ? selectedOption.label : '',
      onAccountOfCode: selectedOption ? selectedOption.customerCode : ''
    }));

    // handleCloseExp();

    setErrors((prevErrors) => ({
      ...prevErrors,
      onAccountOf: ''
    }));
  }



  useEffect(() => {
    const foundParty = pol.find(inPol => inPol.value === exportSbEntry.pol);
    if (foundParty) {
      setSelectedPol(foundParty);
    }
  }, [pol, exportSbEntry.pol]);

  useEffect(() => {
    const foundParty = imoCodes.find(inImoCode => inImoCode.value === exportSbEntry.imoCode);
    if (foundParty) {
      setSelectedImoCode(foundParty);
    }
  }, [imoCodes, exportSbEntry.imoCode]);

  const getCodesByIds = async (code1, code2, exportSbEntryRec) => {
    try {


      setSelectedExp({
        value: exportSbEntryRec.exporterId + ' ' + exportSbEntryRec.srNo,
        label: exportSbEntryRec.exporterName,
        partyId: exportSbEntryRec.exporterId,
        partyName: exportSbEntryRec.exporterName,
        address1: exportSbEntryRec.exporterAddress1,
        address2: exportSbEntryRec.exporterAddress2,
        address3: exportSbEntryRec.exporterAddress3,
        srNo: exportSbEntryRec.srNo,
        gstNo: exportSbEntryRec.gstNo,
        state: exportSbEntryRec.state,
        iecCode: exportSbEntryRec.iecCode
      });

      let selectedExporterNew = [{
        value: exportSbEntryRec.exporterId + ' ' + exportSbEntryRec.srNo,
        label: exportSbEntryRec.exporterName,
        partyId: exportSbEntryRec.exporterId,
        partyName: exportSbEntryRec.exporterName,
        address1: exportSbEntryRec.exporterAddress1,
        address2: exportSbEntryRec.exporterAddress2,
        address3: exportSbEntryRec.exporterAddress3,
        srNo: exportSbEntryRec.srNo,
        gstNo: exportSbEntryRec.gstNo,
        state: exportSbEntryRec.state,
        iecCode: exportSbEntryRec.iecCode
      }];

      setExporterData(selectedExporterNew);

      setSelectedPod({ value: exportSbEntryRec.pod, label: exportSbEntryRec.pod });
      setPodData([{ value: exportSbEntryRec.pod, label: exportSbEntryRec.pod }]);

      const response = await CFSService.getCustomerCodes(companyid, branchId, code1, code2, jwtToken);

      let chaSelected = null;
      let onAccountSelected = null;
      let chadataNew = null;
      let onAccountDataNew = null;

      response.data.forEach(party => {
        if (party.partyId === exportSbEntryRec.cha) {
          // console.log('In party.partyId === exportSbEntryRec.cha');

          chaSelected = {
            value: exportSbEntryRec.cha,
            label: party.partyName
          };
          chadataNew = [{
            value: exportSbEntryRec.cha,
            label: party.partyName,
            partyType: 'cha',
            customerCode: party.customerCode
          }];

          exportSbEntryRec.chaName = party.partyName;
          exportSbEntryRec.chaCode = party.customerCode;
        }

        if (party.partyId === exportSbEntryRec.onAccountOf) {
          onAccountSelected = {
            value: exportSbEntryRec.onAccountOf,
            label: party.partyName
          };

          onAccountDataNew = [{
            value: exportSbEntryRec.cha,
            label: party.partyName,
            partyType: 'cha',
            customerCode: party.customerCode
          }];

          exportSbEntryRec.onAccountOfName = party.partyName;
          exportSbEntryRec.onAccountOfCode = party.customerCode;
        }
      });

      if (chaSelected) {
        setSelectedCha(chaSelected);
        setChaData(chadataNew);
      }

      if (onAccountSelected) {
        setSelectedOnAccount(onAccountSelected);
        setOnAccountData(onAccountDataNew);
      }




      setExportSbEntry(exportSbEntryRec);
    } catch (error) {
      console.error('Error fetching customer codes:', error);
    }
  };









  const CustomOption = (props) => {
    // console.log(props);
    return (
      <components.Option {...props}>
        <span style={{ fontWeight: 'bold' }}>{props.data.partyName}</span>
        {" - " + props.data.address1 + " " + props.data.address2 + " " + props.data.address3}
      </components.Option>
    );
  };


  const CustomOptionCha = (props) => {
    // console.log(props);
    return (
      <components.Option {...props}>
        <span style={{ fontWeight: 'bold' }}>{props.data.customerCode}</span>
        {" - " + props.data.label}
      </components.Option>
    );
  };


  const handleImoCodeChange = (selectedOption) => {
    setSelectedImoCode(selectedOption);
    setExportSbEntry({ ...exportSbEntry, imoCode: selectedOption ? selectedOption.value : '' });
    setErrors(prevErrors => ({
      ...prevErrors,
      imoCode: '',
    }));
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));

    setExportSbEntry({
      ...exportSbEntry,
      [name]: value
    });
  };











  const [isModalOpenForExp, setIsModalOpenForExp] = useState(false);

  const [searchExporterName, setSearchExporterName] = useState('');


  const searchExporter = async (searchValue, type) => {


    if (!searchValue) {
      return;
    }

    // setLoading(true);
    setCurrentPage(1);
    try {
      const response = await CFSService.searchExporter(companyid, branchId, searchValue, jwtToken, type);


      // console.log('response = await CFSService.searchExporter \n', response.data);

      if (type === 'exp') {
        setExporterData(response.data);
      } if (type === 'cha') {
        setChaData(response.data);
      }
      if (type === 'agent') {
        setOnAccountData(response.data);
      }
    } catch (error) {
      toast.error('Oops something went wrong!', {
        position: 'top-center',
        autoClose: 700,
      });
    }
    // finally {
    //   setLoading(false);
    // }
  };



  const handleOpenExp = (val) => {
    setIsModalOpenForExp(true);
    setSearchExporterName('');
    searchExporter('', 'exp');
  }


  const selectIGMSearchRadio = (id, name, ad1, ad2, ad3, srNo, gstNo, state, iecCode) => {
    exportSbEntry.exporterId = id;
    exportSbEntry.exporterName = name;
    exportSbEntry.exporterAddress1 = ad1.length > 250 ? ad1.slice(0, 250) : ad1; // Truncate to 250 characters
    exportSbEntry.exporterAddress2 = ad2.length > 100 ? ad2.slice(0, 100) : ad2; // Truncate to 100 characters
    exportSbEntry.exporterAddress3 = ad3.length > 60 ? ad3.slice(0, 60) : ad3; // Truncate to 100 characters

    exportSbEntry.srNo = srNo;
    exportSbEntry.gstNo = gstNo;
    exportSbEntry.state = state;
    exportSbEntry.iecCode = iecCode;


    handleCloseExp();

    setErrors((prevErrors) => ({
      ...prevErrors,
      exporterId: '',
      exporterAddress1: ''
    }));

  }

  const handleCloseExp = (val) => {
    setIsModalOpenForExp(false);
    setSearchExporterName('');
    setExporterData([]);
  }


  const clearExpSearch = (val) => {
    setSearchExporterName('');
    searchExporter('', 'exp');
  }

  // PAGINATION FOR SELECT EXPORTER
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = exporterData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(exporterData.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const displayPages = () => {
    const centerPageCount = 5;
    const middlePage = Math.floor(centerPageCount / 2);
    let startPage = currentPage - middlePage;
    let endPage = currentPage + middlePage;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPages, centerPageCount);
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - centerPageCount + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };















  const [isModalOpenForCha, setIsModalOpenForCha] = useState(false);

  const [searchChaName, setSearchChaName] = useState('');
  const [chaData, setChaData] = useState([]);

  // Cha Model

  const handleOpenCHA = (val) => {
    setIsModalOpenForCha(true);
    setSearchChaName('');
    searchExporter('', 'cha');
  }


  const selectChaSearchRadio = (id, name, type, code,) => {
    exportSbEntry.cha = id;
    exportSbEntry.chaName = name;
    exportSbEntry.chaCode = code;
    handleCloseCha();

    setErrors((prevErrors) => ({
      ...prevErrors,
      cha: ''
    }));
  }

  const handleCloseCha = (val) => {
    setIsModalOpenForCha(false);
    setSearchChaName('');
    setChaData([]);
  }


  const clearChaSearch = (val) => {
    setSearchChaName('');
    searchExporter('', 'cha');
  }

  // PAGINATION FOR SELECT EXPORTER
  const [currentPageCha, setCurrentPageCha] = useState(1);

  const indexOfLastItemCha = currentPageCha * itemsPerPage;
  const indexOfFirstItemCha = indexOfLastItemCha - itemsPerPage;
  const currentItemsCha = chaData.slice(indexOfFirstItemCha, indexOfLastItemCha);
  const totalPagesCha = Math.ceil(chaData.length / itemsPerPage);

  // Function to handle page change
  const handlePageChangeCha = (page) => {
    if (page >= 1 && page <= totalPagesCha) {
      setCurrentPageCha(page);
    }
  };
  const displayPagesCha = () => {
    const centerPageCount = 5;
    const middlePage = Math.floor(centerPageCount / 2);
    let startPage = currentPage - middlePage;
    let endPage = currentPage + middlePage;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPagesCha, centerPageCount);
    }

    if (endPage > totalPagesCha) {
      endPage = totalPagesCha;
      startPage = Math.max(1, totalPagesCha - centerPageCount + 1);
    }
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };





  // On Account Name

  const [isModalOpenForOnAccount, setIsModalOpenForOnAccount] = useState(false);

  const [searchOnAccount, setSearchOnAccount] = useState('');
  const [onAccountData, setOnAccountData] = useState([]);

  // Cha Model

  const handleOpenOnAccount = (val) => {
    setIsModalOpenForOnAccount(true);
    setSearchOnAccount('');
    searchExporter('', 'agent');
  }


  const selectOnAccountSearchRadio = (id, name, type, code,) => {
    exportSbEntry.onAccountOf = id;
    exportSbEntry.onAccountOfCode = code;
    exportSbEntry.onAccountOfName = name;
    handleCloseOnAccount();

    setErrors((prevErrors) => ({
      ...prevErrors,
      onAccountOf: ''
    }));
  }

  const handleCloseOnAccount = (val) => {
    setIsModalOpenForOnAccount(false);
    setSearchOnAccount('');
    setOnAccountData([]);
  }


  const clearOnAccountSearch = (val) => {
    setSearchOnAccount('');
    searchExporter('', 'agent');
  }

  // PAGINATION FOR SELECT EXPORTER
  const [currentPageOnAccount, setCurrentPageOnAccount] = useState(1);

  const indexOfLastItemOnAccount = currentPageOnAccount * itemsPerPage;
  const indexOfFirstItemOnAccount = indexOfLastItemOnAccount - itemsPerPage;
  const currentItemsOnAccount = onAccountData.slice(indexOfFirstItemOnAccount, indexOfLastItemCha);
  const totalPagesOnAccount = Math.ceil(onAccountData.length / itemsPerPage);

  // Function to handle page change
  const handlePageChangeOnAccount = (page) => {
    if (page >= 1 && page <= totalPagesOnAccount) {
      setCurrentPageOnAccount(page);
    }
  };
  const displayPagesOnAccount = () => {
    const centerPageCount = 5;
    const middlePage = Math.floor(centerPageCount / 2);
    let startPage = currentPage - middlePage;
    let endPage = currentPage + middlePage;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPagesOnAccount, centerPageCount);
    }

    if (endPage > totalPagesOnAccount) {
      endPage = totalPagesOnAccount;
      startPage = Math.max(1, totalPagesOnAccount - centerPageCount + 1);
    }
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };





  // SBCARGOENTRY




  const handleAddRow = async (exportSbCargoEntry) => {


    // console.log('exportSbCargoEntry \n ',exportSbCargoEntry);


    const { success, cargoEntries } = await handleSave(exportSbCargoEntry);
    if (!success) {
      return;
    }


    setExportSbEntry(prevState => ({
      ...prevState,
      sbType: '',
      cargoType: '',
      sbDate: '',
      sbNo: '',
      sbTransId: '',
      status: ''
    }));


    // Calculate the new srNo based on the current list length
    const newSrNo = cargoEntries.length + 1;
    // Create a new entry with the incremented srNo
    const newCargoEntry = {
      ...initialSbCargoEntry,
      srno: newSrNo,
      sbLineNo: newSrNo
    };

    // Add the new entry to the state
    setExportSbCargoEntry([...cargoEntries, newCargoEntry]);

  };


  // const handleRemoveRow = (index) => {
  //   if (exportSbCargoEntry.length > 1) {
  //     setExportSbCargoEntry(exportSbCargoEntry.filter((_, i) => i !== index));



  //   }
  // };


  const handleRemoveRow = (index) => {
    if (exportSbCargoEntry.length > 1) {
      const updatedEntries = exportSbCargoEntry.filter((_, i) => i !== index);

      // Find the entry with the highest srNo
      const highestSrNoEntry = updatedEntries.reduce((max, entry) =>
        !max || Number(entry.srno) > Number(max.srno) ? entry : max, null);

      // Update state
      setExportSbCargoEntry(updatedEntries);

      if (highestSrNoEntry) {
        setExportSbEntry((prevState) => ({
          ...prevState,
          sbType: highestSrNoEntry.sbType || '',
          cargoType: highestSrNoEntry.cargoType || '',
          sbDate: highestSrNoEntry.sbDate || '',
          sbNo: highestSrNoEntry.sbNo || '',
          sbTransId: highestSrNoEntry.sbTransId || '',
        }));
      }
    }
  };





  const handleFieldChange = (e, index, fieldName, type, maxIntegerDigits, maxDecimalDigits) => {
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

    let handleAddRowCalled = false;
    setExportSbCargoEntry(prevState => {
      const updatedTransDtl = [...prevState];
      updatedTransDtl[index] = {
        ...updatedTransDtl[index],
        [fieldName]: value,
        hazStatus: fieldName === 'cargoType'
          ? (value === 'Haz' ? 'Y' : 'N')
          : updatedTransDtl[index].hazStatus,
      };

      if (index === updatedTransDtl.length - 1) {
        setExportSbEntry(prevEntryState => ({
          ...prevEntryState,
          sbNo: fieldName === 'sbNo' ? value : prevEntryState.sbNo,
          sbType: fieldName === 'sbType' ? value : prevEntryState.sbType,
          cargoType: fieldName === 'cargoType' ? value : prevEntryState.cargoType,
          totalPackages: fieldName === 'noOfPackages' ? value : prevEntryState.totalPackages,
          totalGrossWeight: fieldName === 'grossWeight' ? value : prevEntryState.totalGrossWeight,
        }));
      }

      // if (fieldName === 'newCommodity' && !handleAddRowCalled) {
      //   handleAddRow(updatedTransDtl);
      //   handleAddRowCalled = true;
      // }

      return updatedTransDtl;
    });

    // Clear the validation error for the field
    setValidationErrors(prevErrors => {
      const updatedErrors = [...prevErrors];
      if (updatedErrors[index]) {
        delete updatedErrors[index][fieldName];
      }
      return updatedErrors;
    });
  };




  const handlePaymentDateChange = (date, index, name) => {
    setExportSbCargoEntry(prevState => {
      const updatedTransDtl = [...prevState];
      updatedTransDtl[index] = {
        ...updatedTransDtl[index],
        [name]: date
      };

      // Check if the current index is the last index
      if (index === updatedTransDtl.length - 1) {
        setExportSbEntry(prevEntryState => ({
          ...prevEntryState,
          sbDate: name === 'sbDate' ? date : prevEntryState.sbDate,
        }));
      }

      return updatedTransDtl;
    });

    // Clear the validation error for the specified field
    setValidationErrors(prevErrors => {
      const updatedErrors = [...prevErrors];
      if (updatedErrors[index]) {
        delete updatedErrors[index][name];  // Corrected deletion syntax
      }
      return updatedErrors;
    });
  };







  const [validationErrors, setValidationErrors] = useState([]);

  const validateSbCargoDetail = (exportSbCargoEntry) => {
    let errors = [];

    exportSbCargoEntry.forEach((detail, index) => {
      const { sbNo, sbDate, commodity, newCommodity, cargoType, sbType, typeOfPackage, grossWeight, noOfPackages, fob, hazStatus, haz, unNo } = detail;
      let error = {};


      // New validation for hazStatus
      if (hazStatus === 'Y') {
        if (!haz) {
          error.haz = 'HAZ class is required is Y';
        }
        if (!unNo) {
          error.unNo = 'UN No is required';
        }
      }

      if (!grossWeight || grossWeight <= 0) {
        error.grossWeight = 'gross weight is required';
      }

      if (!noOfPackages || noOfPackages <= 0) {
        error.noOfPackages = 'no of package is required';
      }


      if (!fob || fob <= 0) {
        error.fob = 'fob value is required';
      }
      if (!sbNo) error.sbNo = 'sbNo is required.';
      if (!sbDate) error.sbDate = 'Sb date is required.';
      if (!commodity) error.commodity = 'cargo description is required.';
      if (!newCommodity) error.newCommodity = 'commodity is required.';

      if (!cargoType) error.cargoType = 'cargo type is required.';
      if (!sbType) error.sbType = 'sb type is required.';
      if (!typeOfPackage) error.typeOfPackage = 'package type is required.';

      errors.push(error);
    });

    setValidationErrors(errors);

    // Check if there are any errors
    return errors.every(error => Object.keys(error).length === 0);
  };


  const validateSbEntry = (exportSbEntry) => {


    const { sbTransDate, pol, pod, cha, exporterId, exporterAddress1, consigneeName, consigneeAddress1, onAccountOf, cargoLoc, destinationCountry } = exportSbEntry;
    let error = {};


    if (!sbTransDate) error.sbTransDate = 'SB TransDate is required.';
    if (!pol) error.pol = 'pol is required.';
    if (!pod) error.pod = 'pod is required.';

    if (!cha) error.cha = 'Cha is required.';
    if (!exporterId) error.exporterId = 'Exporter is required.';

    if (!exporterAddress1) error.exporterAddress1 = 'Address1 is required.';
    if (!consigneeName) error.consigneeName = 'Name is required.';
    if (!consigneeAddress1) error.consigneeAddress1 = 'Address1 is required.';

    if (!onAccountOf) error.onAccountOf = 'onAccountOf is required.';
    if (!cargoLoc) error.cargoLoc = 'Cargo Location is required.';
    if (!destinationCountry) error.destinationCountry = 'Destination is required.';



    setErrors(error);

    // console.log('errors \n', error);

    // Return true if no errors, false otherwise
    return Object.keys(error).length === 0;
  };



  // lololol
  const handleSave = async (exportSbCargoEntry) => {
    if (!validateSbEntry(exportSbEntry)) {
      toast.error("Enter Required Fields", {
        position: 'top-center',
        autoClose: 1000,
      });
      return false;
    }

    if (!validateSbCargoDetail(exportSbCargoEntry)) {
      toast.error("Enter Required Fields", {
        position: 'top-center',
        autoClose: 1000,
      });
      return false;
    }

    setLoading(true);
    try {
      const response = await CFSService.addExportSbEntry(companyid, branchId, exportSbEntry, exportSbCargoEntry, jwtToken, userId);

      const { cargoEntries, sbEntrySaved } = response.data;

      setExportSbEntry(sbEntrySaved);
      setExportSbCargoEntry(cargoEntries);



      if (searchData && (searchData.sbNo || searchData.container)
      ) {
        updatePagesList("P00216");
      }

      // // console.log('Response:', response.data);
      toast.success('Data added Successfully!', {
        position: 'top-center',
        autoClose: 700,
      });







      return { success: true, cargoEntries }; // Return true if the operation is successful
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
          const errorIndex = exportSbCargoEntry.findIndex(entry => entry.srno === srNo);
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

        return { success: false, cargoEntries: null };
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
    setSelectedImoCode(null);
    setSelectedPol(null);
    setErrors([]);
    setValidationErrors([]);
    setExportSbCargoEntry([initialSbCargoEntry]);
    setExportSbEntry(initialSbEntry);
    setSelectedCha(null);
    setSelectedExp(null);
    setSelectedOnAccount(null);
    setSelectedPod(null);
  };


  const checkDuplicateSbNo = async (srNo, finYear, profitCenterId, sbTransId, sbNo) => {
    try {
      const response = await CFSService.checkDuplicateSbNo(companyid, branchId, finYear, profitCenterId, sbTransId, sbNo, jwtToken);

      if (response.data === true) {
        const errorMessage = `Duplicate SB No found for SrNo: <strong>${srNo}</strong> and SB No: <strong>${sbNo}</strong>`;
        const contentWidth = errorMessage.length * 6;

        toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessage }} />, {
          position: 'top-center',
          autoClose: 3000,
          style: { width: `${contentWidth}px` },
        });

        // Find the index of the cargo entry based on SrNo
        const errorIndex = exportSbCargoEntry.findIndex(entry => entry.srno === srNo);
        if (errorIndex !== -1) {
          const newErrors = [...validationErrors];
          newErrors[errorIndex] = { ...newErrors[errorIndex], sbNo: `Duplicate SB No: ${sbNo}` };
          setValidationErrors(newErrors);
        }
      }
    } catch (error) {
      toast.error('An error occurred while checking for duplicate SB No.', {
        position: 'top-center',
        autoClose: 3000,
      });
      console.error('Error checking duplicate SB No:', error);
    }
  };






  const handleDateChange = (inputField, date) => {
    setExportSbEntry(prevState => ({
      ...prevState,
      [inputField]: date
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [inputField]: '',
    }));
  };



  const searchSbSearch = async (searchvalue) => {
    setCurrentPageSbSearch(1);
    setLoading(true);
    try {
      const response = await CFSService.getSbEntriesToSelect(companyid, branchId, searchvalue, jwtToken);

      setSbSearchData(response.data);

    } catch (error) {
      console.error("Error fetching SB entries:", error);
      // Optionally handle the error further, e.g., show a notification to the user
    } finally {
      setLoading(false);
    }
  };

  const getSelectedSbSearch = async (sbTransId, hsbTransId, sbNo, profitCenter) => {
    setErrors([]);
    setValidationErrors([]);
    setLoading(true);
    try {
      const response = await CFSService.getSelectedSbEntry(companyid, branchId, sbTransId, hsbTransId, sbNo, profitCenter, jwtToken);

      const { cargoEntries, sbEntrySaved } = response.data;

      setExportSbCargoEntry(cargoEntries);


      await getCodesByIds(sbEntrySaved.cha, sbEntrySaved.onAccountOf, sbEntrySaved);
    } catch (error) {
      console.error("Error fetching SB entries:", error);
      // Optionally handle the error further, e.g., show a notification to the user
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


  const selectCSBSearchRadio = async (sbTransId, hsbTransId, sbNo, profitCenter) => {
    await getSelectedSbSearch(sbTransId, hsbTransId, sbNo, profitCenter);
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


  const handleKeyDown = (event, index, fieldName) => {
    if (event.key === 'Enter') {
      handlePaymentDateChange(new Date(), index, fieldName);
    }
  };




  const CustomInput = React.forwardRef(({ value, onClick, onKeyDown, className, onChange, id }, ref) => (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <input
        ref={ref}
        value={value}
        onClick={onClick}
        onKeyDown={onKeyDown}
        // readOnly
        className={className}
        style={{ width: '100%' }}
        onChange={onChange}
        id={id}
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



  const [leoErrors, setLeoErrors] = useState({});

  const [isModalOpenForLeoUpdate, setIsModalOpenForLeoUpdate] = useState(false);
  const [sbLeoUpdate, setsbLeoUpdate] = useState({
    companyId: companyid,
    branchId: branchId,
    sbNo: '',
    sbTransId: '',
    hSbTransId: '',
    profitcentreId: '',
    leoDate: new Date(),
    outOfCharge: 'N',
    outOfChargeDate: new Date()
  });


  const handleOpenLeoUpdate = async (sbNoEntry) => {
    try {
      const response = await CFSService.getDataForOutOfCharge(
        companyid,
        branchId,
        sbNoEntry.profitcentreId,
        sbNoEntry.sbTransId,
        sbNoEntry.hSbTransId,
        sbNoEntry.sbNo,
        jwtToken
      );

      // Assuming response.data contains the necessary fields
      setsbLeoUpdate({
        companyId: companyid,
        branchId: branchId,
        sbNo: response.data.sbNo,
        profitcentreId: response.data.profitcentreId,
        sbTransId: response.data.sbTransId,
        hSbTransId: response.data.hSbTransId,
        leoDate: response.data.leoDate ? response.data.leoDate : new Date(),
        outOfCharge: response.data.outOfCharge,
        outOfChargeDate: response.data.outOfChargeDate ? response.data.outOfChargeDate : new Date()
      });

      setIsModalOpenForLeoUpdate(true);
    } catch (error) {
      console.error('Error fetching data for out of charge:', error);
      toast.error('An error occurred while fetching data. Please try again.', {
        position: 'top-center',
        autoClose: 700,
      });
    }
  };


  const handleCloseLeoUpdate = async () => {
    setIsModalOpenForLeoUpdate(false);
    setsbLeoUpdate({
      companyId: companyid,
      branchId: branchId,
      sbNo: '',
      sbTransId: '',
      hsbTransId: '',
      leoNo: '',
      leoDate: new Date(),
      outOfCharge: 'N',
      outOfChargeDate: new Date()
    });
  }


  const saveLeoOfSbNo = async () => {
    const newErrors = {};

    if (sbLeoUpdate.outOfCharge !== 'Y') {
      newErrors.outOfCharge = 'outOfCharge is required';
    }

    if (!sbLeoUpdate.outOfChargeDate) {
      newErrors.outOfChargeDate = 'outOfChargeDate is required';
    }

    if (!sbLeoUpdate.leoDate) {
      newErrors.leoDate = 'leoDate is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setLeoErrors(newErrors);
      toast.warning('Enter required fields!', {
        position: 'top-center',
        autoClose: 700,
      });
      return; // Early return if there are errors
    }

    try {
      const response = await CFSService.updateOutOfCharge(companyid, branchId, sbLeoUpdate, userId, jwtToken);

      // Optionally check the response for success
      if (response && response.status === 200) {
        toast.success('Out of charge updated successfully!', {
          position: 'top-center',
          autoClose: 700,
        });
      } else {
        throw new Error('Update failed. Please try again.');
      }

      await getSelectedSbSearch(sbLeoUpdate.sbTransId, sbLeoUpdate.hSbTransId, sbLeoUpdate.sbNo, sbLeoUpdate.profitcentreId);
    } catch (error) {
      console.error('Error updating out of charge:', error);
      toast.error('An error occurred while updating. Please try again.', {
        position: 'top-center',
        autoClose: 700,
      });
    }
  };

  // console.log('sbLeoUpdate \n',sbLeoUpdate);



  const handleLeoChange = (e, fieldName) => {
    // Determine the new value based on the checkbox state
    const value = e.target.type === 'checkbox' ? (e.target.checked ? 'Y' : 'N') : e.target.value;

    // Update the state
    setsbLeoUpdate(prevState => {
      const updatedLeoUpdate = {
        ...prevState,
        [fieldName]: value,
      };
      return updatedLeoUpdate;
    });

    // Clear any existing error for this field
    setLeoErrors(prevErrors => ({
      ...prevErrors,
      [fieldName]: '',
    }));
  };


  const handleLeoDateChange = (inputField, date) => {
    setsbLeoUpdate(prevState => ({
      ...prevState,
      [inputField]: date
    }));

    setLeoErrors((prevErrors) => ({
      ...prevErrors,
      [inputField]: '',
    }));
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
  const [selectedPod, setSelectedPod] = useState(null);

  const handlePODChange = async (selectedOption) => {
    setSelectedPod(selectedOption);
    setErrors((prevErrors) => ({
      ...prevErrors,
      pod: '',
    }));

    setExportSbEntry((prevExportSbEntry) => ({
      ...prevExportSbEntry,
      pod: selectedOption ? selectedOption.label : '',
    }));
  };



  const handleCreationPODSelect = async (inputValue) => {

    setSelectedPod({ value: inputValue, label: inputValue });
    setErrors((prevErrors) => ({
      ...prevErrors,
      pod: '',
    }));

    setExportSbEntry((prevExportSbEntry) => ({
      ...prevExportSbEntry,
      pod: inputValue,
    }));

  };





























  // Document upload
  const [isModalOpenForDocumentUpload, setIsModalOpenForDocumentUpload] = useState(false);

  const initialDocumentUpload = {
    companyId: companyid,
    branchId: branchId,
    sbNo: '',
    sbTransId: '',
    hSbTransId: '',
    sbLineNo: '',
    fileName: '',
    base64Url: '',
    fileType: '',
    isSaved: 'N'
  }

  const [sbDocumentUpload, setSbDocumentUpload] = useState([initialDocumentUpload]);
  const [isModalOpenForDocumentView, setIsModalOpenForDocumentView] = useState(false);
  const [removedList, setRemovedList] = useState([]);

  console.log('SBDocumentUpload \n', sbDocumentUpload, ' removeList \n', removedList);

  const handleOpenDocumentUpload = async (sbNoEntry) => {
    try {
      const response = await CFSService.getDataForDocumentupload(
        companyid,
        branchId,
        sbNoEntry.profitcentreId,
        sbNoEntry.sbTransId,
        sbNoEntry.hSbTransId,
        sbNoEntry.sbNo,
        sbNoEntry.sbLineNo,
        jwtToken
      );
      setSbDocumentUpload(
        response.data?.length > 0
          ? response.data
          : [{ ...initialDocumentUpload, sbNo: sbNoEntry.sbNo, sbTransId: sbNoEntry.sbTransId, hSbTransId: sbNoEntry.hSbTransId, sbLineNo: sbNoEntry.sbLineNo, isSaved: 'N' }]
      );

      setIsModalOpenForDocumentUpload(true);
    } catch (error) {
      console.error('Error fetching data for document get upload : \n', error);
      toast.error('An error occurred while fetching data. Please try again.', {
        position: 'top-center',
        autoClose: 700,
      });
    }
  };


  const handleCloseDocumentUpload = async () => {
    setIsModalOpenForDocumentUpload(false);
    setSbDocumentUpload([initialDocumentUpload]);
    setRemovedList([]);
  }


  // const handleFileUploadFileChange = (event) => {
  //   const files = Array.from(event.target.files);

  //   if (files.length === 0) return;

  //   const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

  //   const validFiles = files.filter((file) => allowedTypes.includes(file.type));

  //   if (validFiles.length === 0) {
  //     alert("Only JPG, PNG, and PDF files are allowed!");
  //     return;
  //   }

  //   validFiles.forEach((file) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);

  //     reader.onload = () => {
  //       const base64String = reader.result; // Get Base64 string

  //       setSbDocumentUpload((prev) => {
  //         const existingIndex = prev.findIndex((doc) => doc.fileName === "");

  //         if (existingIndex !== -1) {
  //           // If an empty file entry exists, update it
  //           const updatedDocuments = [...prev];
  //           updatedDocuments[existingIndex] = {
  //             ...updatedDocuments[existingIndex],
  //             fileName: file.name,
  //             base64Url: base64String,
  //             fileType: file.type,
  //           };
  //           return updatedDocuments;
  //         } else {
  //           // If no empty entry exists, add a new object
  //           return [
  //             ...prev,
  //             {
  //               companyId: prev[0]?.companyId || "",
  //               branchId: prev[0]?.branchId || "",
  //               sbNo: prev[0]?.sbNo || "",
  //               sbTransId: prev[0]?.sbTransId || "",
  //               hSbTransId: prev[0]?.hSbTransId || "",
  //               sbLineNo: prev[0]?.sbLineNo || "",
  //               fileName: file.name,
  //               base64Url: base64String,
  //               fileType: file.type,
  //             },
  //           ];
  //         }
  //       });

  //       console.log("File Uploaded:", file.name);
  //     };

  //     reader.onerror = (error) => {
  //       console.error("Error reading file:", error);
  //     };
  //   });
  // };


  const handleFileUploadFileChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length === 0) return;

    const maxSize = 10 * 1024 * 1024; // 10MB in bytes

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "application/vnd.ms-excel", // XLS
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX
      "text/csv", // CSV
    ];

    const validFiles = files.filter(
      (file) => allowedTypes.includes(file.type) && file.size <= maxSize
    );

    if (validFiles.length === 0) {
      alert("Only JPG, PNG, PDF, XLS, XLSX, and CSV files are allowed (Max: 10MB)!");
      return;
    }

    validFiles.forEach((file) => {
      const reader = new FileReader();

      // Read Excel and CSV files as binary string
      if (file.type.includes("excel") || file.type.includes("csv")) {
        reader.readAsBinaryString(file);
      } else {
        reader.readAsDataURL(file);
      }

      reader.onload = () => {
        const base64String =
          file.type.includes("excel") || file.type.includes("csv")
            ? btoa(reader.result) // Convert binary to base64
            : reader.result;

        setSbDocumentUpload((prev) => {
          const existingIndex = prev.findIndex((doc) => doc.fileName === "");

          if (existingIndex !== -1) {
            // If an empty file entry exists, update it
            const updatedDocuments = [...prev];
            updatedDocuments[existingIndex] = {
              ...updatedDocuments[existingIndex],
              fileName: file.name,
              base64Url: base64String,
              fileType: file.type,
            };
            return updatedDocuments;
          } else {
            // If no empty entry exists, add a new object
            return [
              ...prev,
              {
                companyId: prev[0]?.companyId || "",
                branchId: prev[0]?.branchId || "",
                sbNo: prev[0]?.sbNo || "",
                sbTransId: prev[0]?.sbTransId || "",
                hSbTransId: prev[0]?.hSbTransId || "",
                sbLineNo: prev[0]?.sbLineNo || "",
                fileName: file.name,
                base64Url: base64String,
                fileType: file.type,
              },
            ];
          }
        });

        console.log("File Uploaded:", file.name);
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
    });
  };


  const handleRemoveFile = (index, sbNo, sbLineNo, sbTransId, hsbTransId, isSaved, fileName) => {
    const updatedFiles = sbDocumentUpload.filter((_, i) => i !== index);

    // If the file is saved, add its name to removedList
    if (isSaved === 'Y') {
      setRemovedList(prevList => [...prevList, fileName]);
    }

    if (updatedFiles.length === 0) {
      setSbDocumentUpload([{
        ...initialDocumentUpload,
        sbNo: sbNo,
        sbTransId: sbTransId,
        hSbTransId: hsbTransId,
        sbLineNo: sbLineNo,
        isSaved: 'N'
      }]);
    } else {
      setSbDocumentUpload(updatedFiles);
    }
  };

  const uploadSbDocument = async () => {
    setLoading(true);

    let sbFile = sbDocumentUpload[0];
    try {
      const response = await CFSService.uploadSbDocument(companyid, branchId, sbFile.sbNo, sbFile.sbTransId, sbFile.hSbTransId, sbFile.sbLineNo, sbDocumentUpload, removedList, userId, jwtToken);

      console.log('const uploadSbDocument \n', response.data);

      setSbDocumentUpload(response.data);
      toast.success('Document uploaded successfully', {
        position: 'top-center',
        autoClose: 700,
      });

    } catch {
      toast.error('An error occurred while uploading the files. Please try again.', {
        position: 'top-center',
        style: { width: '29vw' },
        autoClose: 700,
      });
    } finally {
      setLoading(false);
    }
  }

  const [isModalOpenForViewDocument, setIsModalOpenForViewDocument] = useState(false);
  const [viewFile, setViewFile] = useState('');


  const handleView = (file) => {
    setViewFile(file);
    setIsModalOpenForViewDocument(true);
  };


  // const renderFile = () => {
  //   if (!viewFile?.base64Url) return null;

  //   const match = viewFile.base64Url.match(/^data:(.*?);base64,/);
  //   const fileType = match ? match[1] : '';

  //   if (fileType === 'application/pdf') {
  //     return <iframe src={viewFile.base64Url} title="PDF Viewer" style={{ width: '100%', height: '500px' }} />;
  //   } else if (fileType.startsWith('image/')) {
  //     return <img src={viewFile.base64Url} alt="Preview" style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />;
  //   } else {
  //     return <p>Unsupported file format</p>;
  //   }
  // };


  const renderFile = () => {
    if (!viewFile) return null;

    if (viewFile.fileType === 'application/pdf') {
      return <iframe src={viewFile.base64Url} title="PDF Viewer" style={{ width: '100%', height: '500px' }} />;
    }
    else if (viewFile.fileType.startsWith('image/')) {
      return <img src={viewFile.base64Url} alt="Preview" style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />;
    }
    else if (
      viewFile.fileType === 'application/vnd.ms-excel' ||
      viewFile.fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      const handleDownload = () => {
        const link = document.createElement('a');
        link.href = viewFile.base64Url;
        link.download = viewFile.fileName || 'file.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      return (
        <div>
          <p>Excel files cannot be previewed. Click below to download:</p>
          {/* <Button onClick={handleDownload} className="btn btn-primary">
            Download {viewFile.fileName}
          </Button> */}


          <Button
            type="button"
            className="newButton mt-2 mb-2"
            color="primary"
            outline
            style={{ marginRight: '10px' }}
            onClick={handleDownload}
          >
            <FontAwesomeIcon
              icon={faDownload}
              style={{ marginRight: "5px" }}
            />
            Download {viewFile.fileName}
          </Button>



        </div>
      );
    }
    else if (viewFile.fileType === 'text/csv') {
      try {
        const csvText = atob(viewFile.split(',')[1]);
        const rows = csvText.split('\n').map((row) => row.split(','));

        return (
          <table className="table table-bordered">
            <thead>
              <tr>{rows[0].map((col, i) => <th key={i}>{col}</th>)}</tr>
            </thead>
            <tbody>
              {rows.slice(1).map((row, i) => (
                <tr key={i}>{row.map((col, j) => <td key={j}>{col}</td>)}</tr>
              ))}
            </tbody>
          </table>
        );
      } catch (error) {
        return (
          <div>
            <p>Error loading CSV preview. Click below to download:</p>
            <a href={viewFile} download={viewFile.fileName} className="btn btn-primary">
              Download {viewFile.fileName}
            </a>
          </div>
        );
      }
    }
    else {
      return <p>Unsupported file format</p>;
    }
  };






  const handleCloseViewDocument = async () => {
    setIsModalOpenForViewDocument(false);
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
                      SB Trans Id
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="service"
                      maxLength={15}
                      name="igmTransId"
                      readOnly
                      value={exportSbEntry.hSbTransId}
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
                        <th scope="col">H_SB_Trans_Id</th>
                        <th scope="col">SB Trans Date</th>
                        <th scope="col">SB No</th>
                        <th scope="col">SB Date</th>
                        <th scope="col">POL</th>

                        <th scope="col">Port Name</th>
                        <th scope="col">POD</th>
                        <th scope="col">Exporter Name</th>
                        <th scope="col">Party_Name</th>
                        <th scope="col">Profit Centre Id</th>

                        <th scope="col">Profitcentre Desc</th>
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
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className='text-center'>
                        <td>
                          <input type="radio" name="radioGroup" onChange={() => selectCSBSearchRadio('', '', '', '', '', '', '', '', '', '')} value={''} />
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>

                      </tr>
                      {currentItemsSbSearch.map((item, index) => (
                        <>
                          <tr key={index} className='text-center'>
                            <td>
                              <input type="radio" name="radioGroup" onChange={() => selectCSBSearchRadio(item[0], item[1], item[3], item[10])} value={item[0]} />
                            </td>
                            <td>{item[1]}</td>
                            <td>{formatDate(item[2])}</td>
                            <td>{item[3]}</td>
                            <td>{formatDate(item[4])}</td>
                            <td>{item[5]}</td>
                            <td>{item[6]}</td>
                            <td>{item[7]}</td>
                            <td>{item[8]}</td>
                            <td>{item[9]}</td>
                            <td>{item[10]}</td>
                            <td>{item[11]}</td>
                            <td>{item[12] === 'A' ? 'Approved' : ''}</td>
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
                  SB Trans Date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={exportSbEntry.sbTransDate}
                    onChange={(date) => handleDateChange('sbTransDate', date)}
                    id="sbTransDate"
                    name="sbTransDate"
                    placeholderText="Enter SB Trans Date"
                    dateFormat="dd/MM/yyyy HH:mm" // Updated format
                    timeInputLabel="Time:"
                    showTimeInput
                    timeFormat="HH:mm" // 24-hour format for time
                    timeIntervals={15}
                    className={`form-control ${errors.sbTransDate ? 'error-border' : ''}`}
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
                <label className="forlabel" for="HazardousHazardous">Cargo Location</label><span className="error-message">*</span>

                <div style={{ position: 'relative' }}>
                  <Input
                    type="select"
                    name="cargoLoc"
                    className={`form-control ${errors.cargoLoc ? 'error-border' : ''}`}
                    value={exportSbEntry.cargoLoc}
                    onChange={handleChange}
                  >
                    <option value="WareHouse">WareHouse</option>
                    <option value="Yard">Yard</option>
                    <option value="Crossing">Crossing</option>
                  </Input>

                  {errors.cargoLoc && (
                    <div className="error-messageNew">
                      {errors.cargoLoc}
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
                  Status
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  maxLength={15}
                  readOnly
                  name="status"
                  value={exportSbEntry.status === 'A' ? 'Approved' : exportSbEntry.status}
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
                  Created By <span className="error-message"></span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  readOnly
                  maxLength={15}
                  name="viaNo"
                  value={exportSbEntry.createdBy}
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
                  Select Exporter<span className="error-message">*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <Select
                    options={exporterData}
                    value={selectedExp}
                    onInputChange={(inputValue, { action }) => {
                      if (action === 'input-change') {
                        searchExporter(inputValue, 'exp');
                      }
                    }}
                    onChange={handleExporterChange}
                    className={errors.exporterId ? 'error-border' : ''}
                    placeholder="Select Exporter"
                    components={{ Option: CustomOption }}
                    isClearable
                    id="exporter"

                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        height: 32,  // Set the height of the select input
                        minHeight: 32,
                        border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                        width: "180px", // Set the width to 180px
                        height: "1px"
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
                  {errors.exporterId && (
                    <div className="error-messageNew">
                      {errors.exporterId}
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
                  Exporter Address1 <span className="error-message">*</span>
                </label>

                <div style={{ position: "relative" }}>
                  <input
                    className={`form-control ${errors.exporterAddress1 ? 'error-border' : ''}`}
                    type="text"
                    maxLength={250}
                    name="exporterAddress1"
                    value={exportSbEntry.exporterAddress1}
                    onChange={handleChange}
                  />
                  {errors.exporterAddress1 && (
                    <div className="error-messageNew">
                      {errors.exporterAddress1}
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
                  Exporter Address2
                </label>
                <input
                  className="form-control"
                  type="text"
                  maxLength={100}
                  name="exporterAddress2"
                  value={exportSbEntry.exporterAddress2}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>




            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Exporter Address3
                </label>
                <input
                  className="form-control"
                  type="text"
                  maxLength={60}
                  name="exporterAddress3"
                  value={exportSbEntry.exporterAddress3}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>










            <Col md={2}>

              {/* <Row>

<Col md={10}> */}

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
                    onChange={handleChaChange}
                    className={errors.cha ? 'error-border' : ''}
                    placeholder="Select Cha"
                    components={{ Option: CustomOptionCha }}
                    isClearable
                    id="exporter"
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
                  {errors.cha && (
                    <div className="error-messageNew">
                      {errors.cha}
                    </div>
                  )}
                </div>
              </FormGroup>
            </Col>



            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="chaCode"
                >
                  Cha Code
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  readOnly
                  maxLength={15}
                  name="chaCode"
                  value={exportSbEntry.chaCode}
                  onChange={handleChange}
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
                  htmlFor="consigneeName"
                >
                  Consignee Name <span className="error-message">*</span>
                </label>

                <div style={{ position: "relative" }}>
                  <input
                    className={`form-control ${errors.consigneeName ? 'error-border' : ''}`}
                    type="text"
                    maxLength={60}
                    name="consigneeName"
                    onChange={handleChange}
                    value={exportSbEntry.consigneeName}
                  />
                  {errors.consigneeName && (
                    <div className="error-messageNew">
                      {errors.consigneeName}
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
                  Consignee Address1{" "}
                  <span className="error-message">*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    className={`form-control ${errors.consigneeAddress1 ? 'error-border' : ''}`}
                    type="text"
                    id="profitcentreId"
                    maxLength={250}
                    name="consigneeAddress1"
                    onChange={handleChange}
                    value={exportSbEntry.consigneeAddress1}
                  />

                  {errors.consigneeAddress1 && (
                    <div className="error-messageNew">
                      {errors.consigneeAddress1}
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
                  Consignee Address2
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="profitcentreId"
                  maxLength={100}
                  onChange={handleChange}
                  name="consigneeAddress2"
                  value={exportSbEntry.consigneeAddress2}
                />
              </FormGroup>
            </Col>



            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Consignee Address3
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="profitcentreId"
                  maxLength={60}
                  onChange={handleChange}
                  name="consigneeAddress3"
                  value={exportSbEntry.consigneeAddress3}
                />
              </FormGroup>
            </Col>





            <Col md={2}>
              {/* <Row>
                <Col md={10}> */}
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  On Account Of   <span className="error-message">*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <Select
                    options={onAccountData}
                    value={selectedOnAccount}
                    onInputChange={(inputValue, { action }) => {
                      if (action === 'input-change') {
                        searchExporter(inputValue, 'agent');
                      }
                    }}
                    onChange={handleOnAccountChange}
                    className={errors.onAccountOf ? 'error-border' : ''}
                    placeholder="Select OnAccountOf"
                    components={{ Option: CustomOptionCha }}
                    isClearable
                    id="onAccountOf"
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
                  {errors.onAccountOf && (
                    <div className="error-messageNew">
                      {errors.onAccountOf}
                    </div>
                  )}
                </div>
              </FormGroup>

            </Col >








            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="onAccountOfCode"
                >
                  On Account Of Code
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="service"
                  readOnly
                  maxLength={15}
                  name="onAccountOfCode"
                  onChange={handleChange}
                  value={exportSbEntry.onAccountOfCode}
                  tabIndex={-1}
                />
              </FormGroup>
            </Col>
          </Row>





          <Row>


            <Col md={2}>

              <FormGroup>
                <label
                  className="forlabel"
                  htmlFor="sbRequestId"
                >
                  POL<span className="error-message">*</span>
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
                  {errors.pol && (
                    <div className="error-messageNew">
                      {errors.pol}
                    </div>
                  )}

                </div>
              </FormGroup>
            </Col>



            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  POD<span className="error-message">*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <CreatableSelect
                    value={selectedPod}
                    onChange={(selectedOption) => handlePODChange(selectedOption)}
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
                      handleCreationPODSelect(truncatedInputValue);
                    }}
                    isClearable
                    id="finalPod"
                    name="finalPod"
                    className={`${errors.pod ? 'error-border' : ''}`}
                    tabIndex="0"  // Ensure it is focusable by tab
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
                  {errors.pod && (
                    <div className="error-messageNew">
                      {errors.pod}
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
                  Destination Country<span className="error-message">*</span>
                </label>

                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    id="destinationCountry"
                    maxLength={40}
                    className={`form-control ${errors.destinationCountry ? 'error-border' : ''}`}
                    name="destinationCountry"
                    onChange={handleChange}
                    value={exportSbEntry.destinationCountry}
                  />
                  {errors.destinationCountry && (
                    <div className="error-messageNew">
                      {errors.destinationCountry}
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
                  Imo Code
                </label>

                <Select
                  options={imoCodes}
                  value={selectedImoCode}
                  onChange={handleImoCodeChange}
                  className={errors.imoCode ? 'error-border' : ''}
                  placeholder="Select Imo Code"
                  isClearable
                  id="imo_Code"
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

            <Col md={4}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="sbRequestId"
                >
                  Remark
                </label>
                <textarea
                  className="form-control"
                  id="comments"
                  name='comments'
                  value={exportSbEntry.comments}
                  onChange={handleChange}
                  maxLength={150}
                  rows={2}
                ></textarea>
              </FormGroup>
            </Col>





          </Row>

          <Row className="text-center mt-1 mb-1">
            <Col>
              <button
                className="btn btn-outline-primary btn-margin newButton"
                style={{ marginRight: 10, fontSize: 13 }}
                id="submitbtn2"
                onClick={(e) => handleSave(exportSbCargoEntry)}
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
                  icon={faRefresh}
                  style={{ marginRight: "5px" }}
                />
                Clear
              </button>

              <button
                className="btn btn-outline-primary btn-margin newButton"
                style={{ marginRight: 10, fontSize: 13 }}
                id="submitbtn2"
                onClick={(e) => handleAddRow(exportSbCargoEntry)}
              >
                <FontAwesomeIcon
                  icon={faAdd}
                  style={{ marginRight: "5px" }}
                />
                Shipping Bill Entry
              </button>

            </Col>
          </Row>

        </div >

        <div>


          <div className="table-responsive mt-3" style={{ maxHeight: "400px", overflowY: "auto" }}>
            <Table className="table table-bordered" style={{ border: '2px solid black' }}>
              <thead>
                <tr>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    SB Type <span className="error-message">*</span>
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black", width: "100px" }}>
                    SB No <span className="error-message">*</span>
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    SB Date <span className="error-message">*</span>
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    DBK Value
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Agro/Non Agro <span className="error-message">*</span>
                  </th>

                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Cargo Description <span className="error-message">*</span>
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Marks & Nos
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    No Of Packages <span className="error-message">*</span>
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Package Type <span className="error-message">*</span>
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Gross Weight in KGS <span className="error-message">*</span>
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    FOB <span className="error-message">*</span>
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Invoice NO
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Invoice Date
                  </th>
                  {/* <th scope="col" className="text-center" style={{ color: "black" }}>
                    Hazardous
                  </th> */}
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Haz Class
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    UN_NO
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Commodity <span className="error-message">*</span>
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Status
                  </th>

                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Leo Update
                  </th>
                  <th scope="col" className="text-center" style={{ color: "black" }}>
                    Document Upload
                  </th>


                  {exportSbCargoEntry.length > 1 && (
                    <th scope="col" className="text-center" style={{ color: "black" }}>
                      Action
                    </th>
                  )}


                </tr>
              </thead>
              <tbody>
                {/* {exportSbCargoEntry.map((cargoEntry, index) => ( */}
                {(isSearchData ? exportSbCargoEntry.filter(cargoEntry => cargoEntry.sbNo === searchData.sbNo) : exportSbCargoEntry).map((cargoEntry, index) => (
                  <tr key={index} className="text-center">
                    <td>
                      <FormGroup>
                        <Input
                          type="select"
                          value={cargoEntry.sbType}
                          className={`inputwidthTukaMax form-control ${validationErrors[index]?.sbType ? 'error-border' : ''}`}
                          // disabled={operation === 'E'}
                          // id={operation === 'E' ? 'service' : ''}
                          onChange={(e) => handleFieldChange(e, index, 'sbType')}
                        > <option value="">Select Sb type</option>
                          <option value="Normal">Normal</option>
                          {/* <option value="Loaded">Loaded</option>
                        <option value="Bulk">Bulk</option> */}
                          <option value="Buffer">Buffer</option>
                          <option value="ONWH">On Wheel</option>
                        </Input>
                      </FormGroup>
                    </td>


                    <td>
                      <FormGroup>

                        <Input
                          type="text"
                          value={cargoEntry.sbNo}
                          maxLength={10}
                          onChange={(e) => handleFieldChange(e, index, 'sbNo', 'number')}
                          className={`inputwidthTuka form-control ${validationErrors[index]?.sbNo ? 'error-border' : ''}`}
                          onBlur={() => checkDuplicateSbNo(cargoEntry.srno, cargoEntry.finYear, cargoEntry.profitcentreId, cargoEntry.sbTransId, cargoEntry.sbNo)}
                        />
                      </FormGroup>
                    </td>
                    <td>

                      <FormGroup>

                        <DatePicker
                          selected={cargoEntry.sbDate}
                          onChange={(date) => handlePaymentDateChange(date, index, 'sbDate')}
                          id="sbTransDate"
                          name="sbTransDate"
                          placeholderText="Enter SB Date"
                          dateFormat="dd/MM/yyyy HH:mm"
                          showTimeInput
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          customInput={
                            <CustomInput
                              className={`inputwidthTukaMax form-control ${validationErrors[index]?.sbDate ? 'error-border' : ''}`}
                              onKeyDown={(event) => handleKeyDown(event, index, 'sbDate')}
                              onChange={(date) => handlePaymentDateChange(date, index, 'sbDate')}
                            />
                          } />



                      </FormGroup>
                    </td>


                    <td>

                      <FormGroup>
                        <Input
                          type="text"
                          value={cargoEntry.drawBackValue}
                          className={`inputwidthTuka form-control`}
                          maxLength={13}
                          onChange={(e) => handleFieldChange(e, index, 'drawBackValue', 'decimal', 8, 4)}
                        />
                      </FormGroup>
                    </td>

                    <td>
                      <FormGroup>
                        <Input
                          type="select"
                          value={cargoEntry.cargoType}
                          className={`inputwidthTukaMax form-control ${validationErrors[index]?.cargoType ? 'error-border' : ''}`}
                          onChange={(e) => handleFieldChange(e, index, 'cargoType')}
                        >
                          <option value="">Select Cargo Type</option>
                          <option value="NAGRO">Non Agro</option>
                          <option value="AGRO">Agro</option>
                          <option value="Haz">Hazardous</option>
                        </Input>
                      </FormGroup>
                    </td>





                    <td>
                      <FormGroup>
                        <textarea
                          className={`inputwidthTukaMax form-control ${validationErrors[index]?.commodity ? 'error-border' : ''}`}
                          id="commodity"
                          name='commodity'
                          value={cargoEntry.commodity}
                          onChange={(e) => handleFieldChange(e, index, 'commodity')}
                          maxLength={200}
                          rows={1}
                        ></textarea>
                      </FormGroup>

                    </td>

                    <td>
                      <FormGroup>
                        <textarea
                          className={`inputwidthTukaMax form-control ${validationErrors[index]?.numberOfMarks ? 'error-border' : ''}`}
                          id="numberOfMarks"
                          value={cargoEntry.numberOfMarks}
                          name='numberOfMarks'
                          onChange={(e) => handleFieldChange(e, index, 'numberOfMarks')}
                          maxLength={60}
                          rows={1}
                        ></textarea>
                      </FormGroup>

                    </td>

                    <td>

                      <FormGroup>
                        <Input
                          type="text"
                          name='noOfPackages'
                          value={cargoEntry.noOfPackages}
                          className={`inputwidthTukaMax form-control ${validationErrors[index]?.noOfPackages ? 'error-border' : ''}`}
                          maxLength={7}
                          onChange={(e) => handleFieldChange(e, index, 'noOfPackages', 'number')}
                        />
                      </FormGroup>
                    </td>
                    <td>

                      <FormGroup>
                        <Input
                          type="select"
                          value={cargoEntry.typeOfPackage}
                          className={`inputwidthTukaMax form-control ${validationErrors[index]?.typeOfPackage ? 'error-border' : ''}`}
                          onChange={(e) => handleFieldChange(e, index, 'typeOfPackage')}
                        >
                          <option value="">Select package type</option>
                          {packagesTypes.map((type, idx) => (
                            <option key={idx} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </td>


                    <td>
                      <FormGroup>
                        <Input
                          type="text"
                          name='grossWeight'
                          value={cargoEntry.grossWeight}
                          className={`inputwidthTukaMax form-control ${validationErrors[index]?.grossWeight ? 'error-border' : ''}`}
                          maxLength={21}
                          onChange={(e) => handleFieldChange(e, index, 'grossWeight', 'decimal', 12, 4)}
                        />
                      </FormGroup>
                    </td>


                    <td>
                      <FormGroup>
                        <Input
                          type="text"
                          name='fob'
                          value={cargoEntry.fob}
                          className={`inputwidthTukaMax form-control ${validationErrors[index]?.fob ? 'error-border' : ''}`}
                          maxLength={21}
                          onChange={(e) => handleFieldChange(e, index, 'fob', 'decimal', 12, 4)}
                        />
                      </FormGroup>
                    </td>


                    <td>
                      <FormGroup>
                        <Input
                          type="text"
                          name='invoiceNo'
                          value={cargoEntry.invoiceNo}
                          className={`inputwidthTuka form-control`}
                          maxLength={16}
                          onChange={(e) => handleFieldChange(e, index, 'invoiceNo')}
                        />
                      </FormGroup>
                    </td>
                    <td>
                      <FormGroup>
                        <DatePicker
                          selected={cargoEntry.invoiceDate}
                          onChange={(date) => handlePaymentDateChange(date, index, 'invoiceDate')}
                          id="invoiceDate"
                          name="invoiceDate"
                          placeholderText="Enter Invoice Date"
                          dateFormat="dd/MM/yyyy HH:mm"
                          showTimeInput
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          customInput={<CustomInput className={`inputwidthTukaMax form-control`}
                            onKeyDown={(event) => handleKeyDown(event, index, 'invoiceDate')}
                            onChange={(date) => handlePaymentDateChange(date, index, 'invoiceDate')}
                          />}
                        />
                      </FormGroup>
                    </td>

                    <td>
                      <FormGroup>
                        <Input
                          type="text"
                          name='haz'
                          value={cargoEntry.haz}
                          className={`inputwidthTukaMax form-control ${validationErrors[index]?.haz ? 'error-border' : ''}`}
                          maxLength={20}
                          onChange={(e) => handleFieldChange(e, index, 'haz')}
                        />
                      </FormGroup>
                    </td>

                    <td>
                      <FormGroup>
                        <Input
                          type="text"
                          name='unNo'
                          value={cargoEntry.unNo}
                          className={`inputwidthTukaMax form-control ${validationErrors[index]?.unNo ? 'error-border' : ''}`}
                          maxLength={6}
                          onChange={(e) => handleFieldChange(e, index, 'unNo')}
                        />
                      </FormGroup>
                    </td>

                    <td>
                      <FormGroup>
                        <Input
                          type="select"
                          value={cargoEntry.newCommodity}
                          className={`inputwidthTukaMax form-control ${validationErrors[index]?.newCommodity ? 'error-border' : ''}`}
                          onChange={(e) => handleFieldChange(e, index, 'newCommodity')}
                        >
                          <option value="">Select Commodity</option>
                          {cargoTypes.map((type, idx) => (
                            <option key={idx} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </td>


                    <td>
                      {cargoEntry.status === 'A' ? 'Approved' : ''}
                    </td>



                    <td>
                      {parseFloat(cargoEntry.cartedPackages) === parseFloat(cargoEntry.noOfPackages) && (cargoEntry.status === 'A') && (
                        <FontAwesomeIcon
                          icon={faReceipt}
                          onClick={() => handleOpenLeoUpdate(cargoEntry)}
                          style={{ color: 'green', cursor: 'pointer', fontSize: '24px' }}
                        />
                      )}
                    </td>


                    <td>
                      {cargoEntry.sbTransId && (
                        <FontAwesomeIcon
                          icon={faUpload}
                          onClick={() => handleOpenDocumentUpload(cargoEntry)}
                          style={{ color: 'green', cursor: 'pointer', fontSize: '24px' }}
                        />
                      )}
                    </td>

                    {index > 0 && index === exportSbCargoEntry.length - 1 && (!cargoEntry.sbTransId || cargoEntry.sbTransId.trim() === '') && (
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











        {/* Out Of Charge Update */}
        <Modal Modal isOpen={isModalOpenForLeoUpdate} onClose={handleCloseLeoUpdate} toggle={handleCloseLeoUpdate} style={{ maxWidth: '1000px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>

          <ModalHeader toggle={handleCloseLeoUpdate} style={{
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
            />Export Shipping Bill Endorsement Out Of Charge</h5>

          </ModalHeader>
          <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
            <Row>
              <Col md={2}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="sbRequestId">
                    SbTransId
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    maxLength={15}
                    name='SbTransId'
                    value={sbLeoUpdate.sbTransId}
                    readOnly
                    id="service"
                    tabIndex={-1}
                  />
                </FormGroup>
              </Col>


              <Col md={2}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="sbRequestId">
                    SbNo
                  </label>
                  <Input
                    className="form-control"
                    type="text"
                    maxLength={15}
                    name='sbNo'
                    value={sbLeoUpdate.sbNo}
                    readOnly
                    id="service"
                    tabIndex={-1}
                  />
                </FormGroup>
              </Col>



              <Col md={4}>
                <Row>
                  <Col md={5}>
                    <FormGroup>
                      <label className="forlabel bold-label" htmlFor="outOfCharge">
                        Out Of Charge
                      </label>
                      <Input
                        className={`form-control ${leoErrors.outOfCharge ? 'error-border' : ''}`}
                        type="checkbox"
                        name='outOfCharge'
                        checked={sbLeoUpdate.outOfCharge === 'Y'}
                        onChange={(e) => handleLeoChange(e, 'outOfCharge')}
                        style={{ width: '24px', height: '28px', cursor: 'pointer', margin: '0' }}
                      />
                    </FormGroup>
                  </Col>

                  <Col md={7}>
                    <FormGroup>
                      <label
                        className="forlabel bold-label"
                        htmlFor="sbRequestId"
                      >
                        Out Of Charge Date
                      </label>
                      <div style={{ position: "relative" }}>
                        <DatePicker
                          selected={sbLeoUpdate.outOfChargeDate}
                          onChange={(date) => handleLeoDateChange('outOfChargeDate', date)}
                          name="outOfChargeDate"
                          placeholderText="Enter Out Of Charge Date"
                          dateFormat="dd/MM/yyyy"
                          className={`form-control ${leoErrors.outOfChargeDate ? 'error-border' : ''}`}
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
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={2}>
                <FormGroup>
                  <label
                    className="forlabel bold-label"
                    htmlFor="sbRequestId"
                  >
                    Leo Date
                  </label>
                  <div style={{ position: "relative" }}>
                    <DatePicker
                      selected={sbLeoUpdate.leoDate}
                      onChange={(date) => handleLeoDateChange('leoDate', date)}
                      name="outOfChargeDate"
                      placeholderText="Enter Out Of Leo Date"
                      dateFormat="dd/MM/yyyy"
                      className={`form-control ${leoErrors.leoDate ? 'error-border' : ''}`}
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
                  </div>
                </FormGroup>
              </Col>





              {/* <Row>

               <Col md={3}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                      Leo No
                    </label>
                    <Input
                      className="form-control"
                      type="text"
                      maxLength={20}
                      name='leoNo'
                      value={sbLeoUpdate.leoNo}
                      onChange={(e) => handleLeoChange(e, 'leoNo')}
                    />
                  </FormGroup>
                </Col>


               
              </Row> */}

            </Row>

            <Row className="text-center mt-1 mb-1">
              <Col>
                <button
                  className="btn btn-outline-primary btn-margin newButton"
                  style={{ marginRight: 10, fontWeight: 'bold' }}
                  id="submitbtn2"
                  onClick={saveLeoOfSbNo}
                >
                  <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                  Save
                </button>
              </Col>
            </Row>
          </ModalBody>
        </Modal >






        {/* Document Upload */}



        <Modal Modal isOpen={isModalOpenForDocumentUpload} onClose={handleCloseDocumentUpload} toggle={handleCloseDocumentUpload} style={{ maxWidth: '1000px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>

          <ModalHeader toggle={handleCloseDocumentUpload} style={{
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
              icon={faUpload}
              style={{
                marginRight: '8px',
                color: 'white',
              }}
            />SB Document Upload</h5>

          </ModalHeader>
          <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
            <Row>
              <Col md={3}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="sbTransId">
                    SbTransId
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    maxLength={15}
                    name='SbTransId'
                    value={sbDocumentUpload[0]?.sbTransId || ""}
                    disabled
                  />
                </FormGroup>
              </Col>


              <Col md={3}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="sbNo">
                    SbNo
                  </label>
                  <Input
                    className="form-control"
                    type="text"
                    maxLength={15}
                    name='sbNo'
                    value={sbDocumentUpload[0]?.sbNo || ""}
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="sbLineNo">
                    Sb Line No
                  </label>
                  <Input
                    className="form-control"
                    type="text"
                    maxLength={15}
                    name='sbNo'
                    value={sbDocumentUpload[0]?.sbLineNo || ""}
                    disabled
                  />
                </FormGroup>
              </Col>

              <Col md={4}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="fileUpload">
                    Upload File (Image/PDF/XLS/CSV)
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="fileUpload"
                    multiple
                    accept="image/png, image/jpeg, application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, text/csv"
                    onChange={handleFileUploadFileChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            {sbDocumentUpload.length > 0 && sbDocumentUpload.some(file => file.fileName) && (
              <div className="file-scroll-container">
                <Row className="flex-nowrap">
                  {sbDocumentUpload.map((file, index) => (
                    file.base64Url && (
                      <Col key={index} md="auto">
                        <div className="file-preview-wrapper">
                          <div className="file-preview">
                            <span className="remove-btn" onClick={() => handleRemoveFile(index, file.sbNo, file.sbLineNo, file.sbTransId, file.hSbTransId, file.isSaved, file.fileName)}>&times;</span>
                            <div onClick={() => handleView(file)}>
                              {file.fileType === "application/pdf" ? (
                                <img src={pdfLogo} alt="PDF Preview" className="file-thumbnail" />
                              ) : file.fileType === "application/vnd.ms-excel" ||
                                file.fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                                file.fileType === "text/csv" ? (
                                <img src={xlsLogo} alt="Excel/CSV Preview" className="file-thumbnail" />
                              ) : (
                                <img src={file.base64Url} alt={file.fileName} className="file-thumbnail" />
                              )}
                            </div>

                          </div>
                          <p className="file-name">{file.fileName}</p>
                        </div>
                      </Col>
                    )
                  ))}
                </Row>
              </div>
            )}


            <Row className="text-center mt-1 mb-1">
              <Col>
                <button
                  className="btn btn-outline-primary btn-margin newButton"
                  style={{ marginRight: 10, fontWeight: 'bold' }}
                  id="submitbtn2"
                  onClick={uploadSbDocument}
                >
                  <FontAwesomeIcon icon={faUpload} style={{ marginRight: "5px" }} />
                  Upload
                </button>
              </Col>
            </Row>
          </ModalBody>
        </Modal >


        <Modal Modal isOpen={isModalOpenForViewDocument} onClose={handleCloseViewDocument} toggle={handleCloseViewDocument} style={{ maxWidth: '1000px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>

          <ModalHeader toggle={handleCloseViewDocument} style={{
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
              icon={faEye}
              style={{
                marginRight: '8px',
                color: 'white',
              }}
            />View Document</h5>

          </ModalHeader>
          <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg)', backgroundSize: 'cover' }}>
            {renderFile()}
          </ModalBody>
        </Modal >
















      </div >
    </>
  );
}

export default ShipingBillNew;







