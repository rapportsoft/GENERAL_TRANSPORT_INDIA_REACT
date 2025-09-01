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
import movementService from "../service/MovementService";


function DocumentEntryHub({ searchData, resetFlag, updatePagesList }) {

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

  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const processId = 'P00101';

  const foundRights = role !== 'ROLE_ADMIN' ? userRights.find(item => item.process_Id === processId) : null;
  const allowCreate = foundRights?.allow_Create === 'Y';
  const allowRead = foundRights?.allow_Read === 'Y';
  const allowEdit = foundRights?.allow_Update === 'Y';
  const allowDelete = foundRights?.allow_Delete === 'Y';

  const [profitcentre, setProfitcentre] = useState({
    profitcentreId: '',
    profitcentreDesc: ''
  });



  useEffect(() => {
    const fetchData = async () => {
      await getProgitCenterById('N00005');
    };
    fetchData();
  }, []);





  useEffect(() => {
    if (searchData && searchData.activeTab === processId && searchData.sbTransId && searchData.sbNo && searchData.profitCenterId) {   
      getSelectedHubSearch(searchData.profitCenterId, searchData.sbTransId, searchData.sbNo)
    }
  }, [searchData]);


  useEffect(() => {

    if (resetFlag) {
      handleReset();
    }
  }, [resetFlag]);





  const getProgitCenterById = async (profitCenterId) => {
    try {
      const response = await CFSService.getProgitCenterById(companyid, branchId, profitCenterId, jwtToken);
      setProfitcentre(response.data);

    } catch (error) {
      console.error('Error fetching port data:', error);
    }
  };


  const initialHub = {
    finYear: "",
    companyId: companyid,
    branchId: branchId,
    hubTransId: "",
    igmLineNo: "",
    igmNo: "",
    hubTransDate: new Date(),
    noOfPackages: '',
    grossWt: '',
    cargoWt: '',
    cargoDescription: "",
    cargoType: 'General',
    importerName: "",
    importerAddress: "",
    sa: "",
    area: "",
    status: "",
    createdBy: "",
    createdDate: null,
    editedBy: "",
    editedDate: null,
    approvedBy: "",
    approvedDate: null,
    sl: "",
    gateInPackages: 0,
    stuffReqQty: 0,
    stuffReqWeight: 0,
    profitCentreId: 'N00005',
    profitCentreName: "",
    shippingAgentName: "",
    shippingLineName: ""
  };

  const [hubDocument, setHubDocument] = useState(initialHub);

  const [isModalOpenForHubSearch, setIsModalOpenForHubSearch] = useState(false);
  const [searchHubValues, setSearchHubValues] = useState('');
  const [hubSearchData, setHubSearchData] = useState([]);
  const [selectedAgent, setselectedAgent] = useState([]);
  const [selectedLine, setselectedLine] = useState([]);
  const [agentData, setAgentData] = useState([]);
  const [lineData, setLineData] = useState([]);





  const handleOpenHubSearch = async () => {
    setIsModalOpenForHubSearch(true);
    setSearchHubValues('');
    searchHubSearch();
  };

  const searchHubSearch = async (searchvalue) => {
    setCurrentPageHubSearch(1);
    setLoading(true);
    try {
      const response = await MovementService.getHubEntriesToSelect(companyid, branchId, searchvalue, 'N00005', jwtToken);
      setHubSearchData(response.data);
    } catch (error) {
      console.error("Error fetching hub entries:", error);
    } finally {
      setLoading(false);
    }
  };



  const handleCloseHubSearch = (val) => {
    setIsModalOpenForHubSearch(false);
    setSearchHubValues('');
    setHubSearchData([]);
  }


  const clearHubSearch = (val) => {
    setSearchHubValues('');
    searchHubSearch();
  }

  const selectHubSearchRadio = async (profitcentreId, transId, igmNo) => {
    await getSelectedHubSearch(profitcentreId, transId, igmNo);
    handleCloseHubSearch();
  }


  const getSelectedHubSearch = async (profitcentreId, transId, igmNo) => {
    setErrors([]);
    setLoading(true);
    try {
      const response = await MovementService.getSelectedHubEntry(companyid, branchId, profitcentreId, transId, igmNo, jwtToken);
      setHubDocument(response.data);
      updateSelectTags(response.data);

    } catch (error) {
      console.error("Error fetching Hub entries:", error);
    } finally {
      setLoading(false);
    }
  };










  // PAGINATION FOR SELECT EXPORTER
  const [currentPageHubSearch, setCurrentPageHubSearch] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItemCartingSearch = currentPageHubSearch * itemsPerPage;
  const indexOfFirstItemCartingSearch = indexOfLastItemCartingSearch - itemsPerPage;
  const currentItemsHubSearch = hubSearchData.slice(indexOfFirstItemCartingSearch, indexOfLastItemCartingSearch);
  const totalPagesHubSearch = Math.ceil(hubSearchData.length / itemsPerPage);

  // Function to handle page change
  const handlePageChangeHub = (page) => {
    if (page >= 1 && page <= totalPagesHubSearch) {
      setCurrentPageHubSearch(page);
    }
  };


  const displayPagesHub = () => {
    const centerPageCount = 5;
    const middlePage = Math.floor(centerPageCount / 2);
    let startPage = currentPageHubSearch - middlePage;
    let endPage = currentPageHubSearch + middlePage;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPagesHubSearch, centerPageCount);
    }

    if (endPage > totalPagesHubSearch) {
      endPage = totalPagesHubSearch;
      startPage = Math.max(1, totalPagesHubSearch - centerPageCount + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };


  const handleChange = (e, fieldName, type, maxIntegerDigits, maxDecimalDigits) => {

    let { name, value } = e.target;
    fieldName = name;
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

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: '',
    }));

    setHubDocument(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };





  const formatDate = (value) => {
    if (!value) {
      return "";
    }

    const date = new Date(value);

    // Extract date components
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" }); // Get abbreviated month name
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };


  const handleDateChange = (inputField, date) => {
    setHubDocument(prevState => ({
      ...prevState,
      [inputField]: date
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [inputField]: '',
    }));
  };



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
      }
    } catch (error) {
      toast.error('Oops something went wrong!', {
        position: 'top-center',
        autoClose: 700,
      });
    }

  };



  const handleSelectChange = async (selectedOption, type) => {
    if (type === 'sa') {
      setselectedAgent(selectedOption);
      updateHubEntry('sa', selectedOption ? selectedOption.value : '');
      updateValidationErrors('sa');
    }

    if (type === 'sl') {
      setselectedLine(selectedOption);
      updateHubEntry('sl', selectedOption ? selectedOption.value : '');
      updateValidationErrors('sl');
    }

  }

  const updateHubEntry = (field, value) => {
    setHubDocument((prevExportSbEntry) => ({
      ...prevExportSbEntry,
      [field]: value,
    }));
  };

  const updateValidationErrors = (field) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: '',
    }));
  };





  const validateHubEntry = (hubEntry) => {
    let errors = {};
    const {
      hubTransDate,
      igmNo,
      grossWt,
      cargoWt,
      noOfPackages,
      importerAddress,
      importerName,
    } = hubEntry;

    // Validation checks for each field
    if (!importerAddress) { errors.importerAddress = 'Importer Address is required'; }
    if (!importerName) errors.importerName = 'Importer Name is required.';
    if (!hubTransDate) errors.hubTransDate = 'TransDate is required.';
    if (!igmNo) errors.igmNo = 'IgmNo is required.';

    if (!grossWt || grossWt <= 0) {
      errors.grossWt = 'GrossWeight greater than 0.';
    }

    if (!noOfPackages || noOfPackages <= 0) {
      errors.noOfPackages = 'NoOfPackages greater than 0.';
    }

    if (!cargoWt || cargoWt <= 0) {
      errors.cargoWt = 'CargoWeight greater than 0.';
    }

    // Set the merged errors
    setErrors(errors);
    // Check if there are any errors and return validation result
    return Object.keys(errors).length === 0;
  };



  const handleSave = async (hubEntry) => {

    if (!validateHubEntry(hubEntry)) {
      toast.warning('Please enter required fields!', {
        position: 'top-center',
        autoClose: 1000,
      });
      return false;
    }
    setLoading(true);
    try {
      const response = await MovementService.addHubDocumentEntry(companyid, branchId, userId, hubEntry, jwtToken);

      setHubDocument(response.data);
      updateSelectTags(response.data);
      
      if (searchData && (searchData.sbNo && searchData.sbLineNo)
      ) {
        updatePagesList("P00101");
      }

      toast.success('Data added Successfully!', {
        position: 'top-center',
        autoClose: 700,
      });

    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data;

        // Check for IGM No and Item No error
        const match = errorMessage.match(/Duplicate IGM\s+(\d+)\s+and ITEM No:\s+(\d+)/);
        if (match) {
          const igmNo = match[1];
          const itemNo = match[2];

          const errorMessageNew = `Duplicate IGM No: <strong>${igmNo}</strong> and ITEM No: <strong>${itemNo}</strong>`;
          const contentWidth = errorMessageNew.length * 6;

          toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessageNew }} />, {
            position: 'top-center',
            autoClose: 3000,
            style: { width: `${contentWidth}px` },
          });

          setErrors(prevErrors => ({
            ...prevErrors,
            igmNo: `Duplicate IGM No: ${igmNo}`,
            igmLineNo: `Duplicate ITEM No: ${itemNo}`
          }));
        }
        else {
          // Default error toast for unknown responses
          toast.error(errorMessage, {
            position: 'top-center',
            autoClose: 3000,
          });
        }
        return;
      }

      // General error handling for unexpected cases
      toast.error('Oops! Something went wrong!', {
        position: 'top-center',
        autoClose: 700,
      });
    }
    finally {
      setLoading(false);
    }
  }















  //  } catch (error) {

  //        if (error.response && error.response.status === 400) { // Check if error response exists
  //          const errorMessage = error.response.data;


  //          // Extract SrNo and sbNo from the error message for targeted validation
  //          const match = errorMessage.match(/SrNo: (\d+) and SB No: (\d+)/);
  //          if (match) {


  //            const srNo = parseInt(match[1], 10);
  //            const sbNo = match[2];

  //            const errorMessageNew = `Duplicate SB No found for SrNo: <strong>${srNo}</strong> and SB No: <strong>${sbNo}</strong>`;
  //            const contentWidth = errorMessageNew.length * 6;

  //            toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessageNew }} />, {
  //              position: 'top-center',
  //              autoClose: 3000,
  //              style: { width: `${contentWidth}px` },
  //            });


  //            // Find the index of the cargo entry based on SrNo
  //            const errorIndex = exportSbCargoEntry.findIndex(entry => entry.srno === srNo);
  //            if (errorIndex !== -1) {
  //              const newErrors = [...validationErrors];
  //              newErrors.igmNo = { ...newErrors[errorIndex], sbNo: `Duplicate IGM No: ${sbNo}` };
  //              setErrors(newErrors);
  //            }
  //          }
  //          else {
  //            toast.error(errorMessage, {
  //              position: 'top-center',
  //              autoClose: 3000,
  //            });
  //          }

  //          return { success: false, cargoEntries: null };
  //        }

  //        toast.error('Oops something went wrong!', {
  //          position: 'top-center',
  //          autoClose: 700,
  //        });


  //      } finally {
  //        setLoading(false);
  //      }
  //    };



  const handleReset = async () => {
    setErrors([]);
    setHubDocument(initialHub);
    setselectedAgent(null);
    setselectedLine(null);
  };

  const updateSelectTags = async (exportGateIn) => {
    const initialSA = exportGateIn.sa ? { value: exportGateIn.sa, label: exportGateIn.shippingAgentName } : null; setselectedAgent(initialSA);
    const initialSL = exportGateIn.sl ? { value: exportGateIn.sl, label: exportGateIn.shippingLineName } : null; setselectedLine(initialSL);
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
        <Row>
          <Col md={2}>
            <Row>
              <Col md={9}>
                <FormGroup>
                  <label
                    className="forlabel bold-label"
                    htmlFor="sbRequestId"
                  >
                    Trans Id
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="service"
                    readOnly
                    maxLength={15}
                    value={hubDocument.hubTransId}
                  />
                </FormGroup>

              </Col>

              <Col md={3} className="d-flex justify-content-end" style={{ marginTop: 21 }}>
                <button
                  className="btn btn-outline-primary btn-margin newButton"
                  style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  id="submitbtn2"
                  onClick={handleOpenHubSearch}
                >
                  <FontAwesomeIcon icon={faSearch} size="sm" s />
                </button>
              </Col>
            </Row>
          </Col>




          <Modal Modal isOpen={isModalOpenForHubSearch} onClose={handleCloseHubSearch} toggle={handleCloseHubSearch} style={{ maxWidth: '1100px', fontSize: 14, wioverflow: '-moz-hidden-unscrollable' }}>

            <ModalHeader toggle={handleCloseHubSearch} style={{
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
                      Search by TransId / IGM No / IGM Line No / Importer Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="searchCartingvalues"
                      maxLength={15}
                      name='searchCartingvalues'
                      value={searchHubValues}
                      onChange={(e) => setSearchHubValues(e.target.value)}
                    />

                  </FormGroup>
                </Col>
                <Col md={6} style={{ marginTop: 24 }}>
                  <button
                    className="btn btn-outline-primary btn-margin newButton"
                    style={{ marginRight: 10, fontWeight: 'bold' }}
                    id="submitbtn2"
                    onClick={() => searchHubSearch(searchHubValues)}
                  >
                    <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                    Search
                  </button>
                  <button
                    className="btn btn-outline-danger btn-margin newButton"
                    style={{ marginRight: 10, fontWeight: 'bold' }}
                    id="submitbtn2"
                    onClick={clearHubSearch}
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
                      <th scope="col">Trans Id</th>
                      <th scope="col">Trans Date</th>
                      <th scope="col">IGM No</th>
                      <th scope="col">NOP</th>

                      <th scope="col">Gross Wt</th>
                      <th scope="col">Cargo Wt</th>
                      <th scope="col">Cargo Desc</th>
                      <th scope="col">Cargo Type</th>

                      <th scope="col">Area</th>
                      <th scope="col">Importer Name</th>
                      <th scope="col">Shipping Agent</th>
                      <th scope="col">Status</th>


                    </tr>
                    <tr className='text-center'>
                      <th scope="col"></th>
                      <th scope="col">{hubSearchData.length}</th>
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

                    {currentItemsHubSearch.map((item, index) => (
                      <>
                        <tr key={index} className='text-center'>
                          <td>
                            <input type="radio" name="radioGroup" onChange={() => selectHubSearchRadio(item.profitCentreId, item.hubTransId, item.igmNo)} />
                          </td>
                          <td>{item.hubTransId}</td>
                          <td>{formatDate(item.hubTransDate)}</td>
                          <td>{item.igmNo}</td>
                          <td>{item.noOfPackages}</td>
                          <td>{item.grossWt}</td>
                          <td>{item.cargoWt}</td>
                          <td>{item.cargoDescription}</td>
                          <td>{item.cargoType}</td>
                          <td>{item.area}</td>
                          <td>{item.importerName}</td>
                          <td>{item.shippingAgentName}</td>
                          <td>{item.status === 'A' ? 'Approved' : item.status === 'N' ? 'New' : ''}</td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
                <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                  <Pagination.First onClick={() => handlePageChangeHub(1)} />
                  <Pagination.Prev
                    onClick={() => handlePageChangeHub(currentPageHubSearch - 1)}
                    disabled={currentPageHubSearch === 1}
                  />
                  <Pagination.Ellipsis />

                  {displayPagesHub().map((pageNumber) => (
                    <Pagination.Item
                      key={pageNumber}
                      active={pageNumber === currentPageHubSearch}
                      onClick={() => handlePageChangeHub(pageNumber)}
                    >
                      {pageNumber}
                    </Pagination.Item>
                  ))}
                  <Pagination.Ellipsis />
                  <Pagination.Next
                    onClick={() => handlePageChangeHub(currentPageHubSearch + 1)}
                    disabled={currentPageHubSearch === totalPagesHubSearch}
                  />
                  <Pagination.Last onClick={() => handlePageChangeHub(totalPagesHubSearch)} />
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
                Trans Date <span className="error-message">*</span>
              </label>
              <div style={{ position: "relative" }}>
                <DatePicker
                  selected={hubDocument.hubTransDate}
                  onChange={(date) => handleDateChange('hubTransDate', date)}
                  name="hubTransDate"
                  placeholderText="Enter Trans Date"
                  dateFormat="dd/MM/yyyy HH:mm" // Updated format
                  timeInputLabel="Time:"
                  showTimeInput
                  timeFormat="HH:mm" // 24-hour format for time
                  timeIntervals={15}
                  className={`form-control ${errors.hubTransDate ? 'error-border' : ''}`}
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
                value={hubDocument.status === 'A' ? 'Approved' : hubDocument.status === 'N' ? 'New' : ''}
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
                readOnly
                maxLength={15}
                name="viaNo"
                value={hubDocument.createdBy}
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
                Approved By
              </label>
              <input
                className="form-control"
                type="text"
                id="service"
                readOnly
                maxLength={15}
                name="viaNo"
                value={hubDocument.approvedBy}
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
                IGM No <span className="error-message">*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className={`form-control ${errors.igmNo ? 'error-border' : ''} `}
                  type="text"
                  maxLength={10}
                  placeholder='Enter IGM No'
                  name="igmNo"
                  onChange={handleChange}
                  value={hubDocument.igmNo}
                />  {errors.igmNo && (
                  <div className="error-messageNew">
                    {errors.igmNo}
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
                ITEM No
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className={`form-control ${errors.igmLineNo ? 'error-border' : ''} `}
                  type="text"
                  maxLength={20}
                  name="igmLineNo"
                  placeholder='Enter ITM No'
                  onChange={handleChange}
                  value={hubDocument.igmLineNo}
                />
                {errors.igmLineNo && (
                  <div className="error-messageNew">
                    {errors.igmLineNo}
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
                Package <span className="error-message">*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className={`form-control ${errors.noOfPackages ? 'error-border' : ''} `}
                  type="text"
                  maxLength={10}
                  placeholder='Enter No Of Packages'
                  name="noOfPackages"
                  onChange={(e) => handleChange(e, 'noOfPackages', 'number')}
                  value={hubDocument.noOfPackages}
                />
                {errors.noOfPackages && (
                  <div className="error-messageNew">
                    {errors.noOfPackages}
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
                Gross Weight <span className="error-message">*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className={`form-control ${errors.grossWt ? 'error-border' : ''} `}
                  type="text"
                  maxLength={14}
                  placeholder='Enter Gross Weight'
                  name="grossWt"
                  onChange={(e) => handleChange(e, 'grossWt', 'decimal', 10, 3)}
                  value={hubDocument.grossWt}
                />
                {errors.grossWt && (
                  <div className="error-messageNew">
                    {errors.grossWt}
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
                Cargo Weight <span className="error-message">*</span>
              </label>

              <div style={{ position: 'relative' }}>
                <input
                  className={`form-control ${errors.cargoWt ? 'error-border' : ''} `}
                  type="text"
                  maxLength={14}
                  placeholder='Enter Cargo Weight'
                  name="cargoWt"
                  onChange={(e) => handleChange(e, 'cargoWt', 'decimal', 10, 3)}
                  value={hubDocument.cargoWt}
                />
                {errors.cargoWt && (
                  <div className="error-messageNew">
                    {errors.cargoWt}
                  </div>
                )}

              </div>
            </FormGroup>
          </Col>








          <Col md={2}>
            <FormGroup>
              <label className="forlabel" for="HazardousHazardous"> Cargo Type</label>
              <div style={{ position: 'relative' }}>
                <Input
                  type="select"
                  name="cargoType"
                  className={`form-control ${errors.cargoType ? 'error-border' : ''} `}
                  value={hubDocument.cargoType}
                  onChange={handleChange}
                >
                  <option value="General">General</option>

                </Input>

                {errors.cargoType && (
                  <div className="error-messageNew">
                    {errors.cargoType}
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
                Area
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className={`form-control ${errors.area ? 'error-border' : ''} `}
                  type="text"
                  maxLength={14}
                  placeholder='Enter Area'
                  name="area"
                  onChange={(e) => handleChange(e, 'area', 'decimal', 10, 3)}
                  value={hubDocument.area}
                />
                {errors.area && (
                  <div className="error-messageNew">
                    {errors.area}
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
                Cargo Description
              </label>
              <textarea
                className="form-control"
                id="cargoDescription"
                name='cargoDescription'
                value={hubDocument.cargoDescription}
                onChange={handleChange}
                maxLength={300}
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
                Importer Name	<span className="error-message">*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className={`form-control ${errors.importerName ? 'error-border' : ''} `}
                  type="text"
                  maxLength={100}
                  name="importerName"
                  placeholder='Enter Importer Name'
                  onChange={handleChange}
                  value={hubDocument.importerName}
                />
                {errors.importerName && (
                  <div className="error-messageNew">
                    {errors.importerName}
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
                Importer Address <span className="error-message">*</span>
              </label>
              <textarea
                className="form-control"
                id="importerAddress"
                name='importerAddress'
                value={hubDocument.importerAddress}
                onChange={handleChange}
                maxLength={300}
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
                Shipping Line
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
                  className={errors.sl ? 'error-border' : ''}
                  placeholder="Select Shipping Line"
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
                {errors.sl && (
                  <div className="error-messageNew">
                    {errors.sl}
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
                  className={errors.sa ? 'error-border' : ''}
                  placeholder="Select Shipping Agent"
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
                {errors.sa && (
                  <div className="error-messageNew">
                    {errors.sa}
                  </div>
                )}

              </div>
            </FormGroup>
          </Col>


        </Row>


        <Row className="text-center mt-3 mb-1">
          <Col>
            <button
              className="btn btn-outline-primary btn-margin newButton"
              style={{ fontSize: 14, marginRight: 10 }}
              id="submitbtn2"
              onClick={(e) => handleSave(hubDocument)}
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

          </Col>
        </Row>




      </div >




    </>
  );
}

export default DocumentEntryHub;
