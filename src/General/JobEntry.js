import AuthContext from "../Components/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faRefresh,
  faSave,
  faCalendarAlt,
  faAdd,
  faEdit,
  faGroupArrowsRotate,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/style.css";
import "../Components/Style.css";
import useAxios from "../Components/useAxios";
import CFSService from "../service/CFSService";
import { toast } from "react-toastify";
import ipaddress from "../Components/IpAddress";
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
  ModalFooter,
} from "reactstrap";
import { Pagination } from "react-bootstrap";
import { compareAsc, format } from "date-fns";
import cfsService from '../service/CFSService';
import Button from 'react-bootstrap/Button';
// import { format } from "date-fns";

function JobEntry({ nocno, boe, noctrans, acttab, listOfData, flag, onRequest }) {
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
  const [errors, setErrors] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const processId = queryParams.get("process_id");

  const foundRights =
    role !== "ROLE_ADMIN"
      ? userRights.find((item) => item.process_Id === processId)
      : null;
  const allowCreate = foundRights?.allow_Create === "Y";
  const allowRead = foundRights?.allow_Read === "Y";
  const allowEdit = foundRights?.allow_Update === "Y";
  const allowDelete = foundRights?.allow_Delete === "Y";

  const [nocFlag, setNocFlag] = useState('add');


  const initialJobEntry = {
    companyId: companyid,
    branchId: branchId,
    jobTransId: "",
    jobNo: "",
    profitcentreId: "N00008",
    jobTransDate: new Date(),
    jobDate: new Date(),
    gateInId: "",
    boeNo: "",
    boeDate: new Date(),
    cha: "",
    cargoType: "GEN",
    impSrNo: 1,
    importerId: "",
    importerName: "",
    importerAddress1: "",
    importerAddress2: "",
    importerAddress3: "",
    forwarder: "",
    grossWeight: "", // BigDecimal
    area: 0,
    noOfPackages: "", // Default value to avoid undefined error
    numberOfMarks: "",
    packageOrWeight: "",
    noOf20ft: "0",
    noOf40ft: "0",
    godownNo: "",
    approvedDate: "",
    createdBy: "",
    createdDate: "",
    editedBy: "",
    editedDate: "",
    approvedBy: "",
    comments: "",
    status: "",
    chaName: "",
    forworderName: "",
  };


  const initialJobOrderEntryDetails = {
    companyId: companyid, // String
    branchId: branchId, // String
    jobTransId: "", // String
    jobDtlTransId: "", // String
    jobNo: "", // String
    jobTransDate: new Date(), // Date
    jobDate: new Date(), // Date
    boeNo: "", // String
    profitcentreId: "N00008", // String
    gateInPackages: 0, // BigDecimal (defaulting to 0)
    qtyTakenIn: 0, // BigDecimal
    weightTakenIn: 0, // BigDecimal
    typeOfPackage: "", // String
    commodityDescription: "", // String
    grossWeight: "", // BigDecimal
    noOfPackages: "", // Default value to avoid undefined error
    areaOccupied: "", // BigDecimal
    createdBy: "", // String
    createdDate: new Date(), // Date (nullable)
    editedBy: "", // String
    editedDate: null, // Date (nullable)
    approvedBy: "", // String
    approvedDate: null, // Date (nullable)
    commodityId: "",
    status: "", // String
    commodityMainId: ''
  };



  const [noc, setNOC] = useState(initialJobEntry);

  const [nocDtl, setNocDtl] = useState(initialJobOrderEntryDetails);
  const [cargoTypes, setCargoType] = useState([]);



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

  const getCargoType = async (jarId) => {
    const cargoType = await getjarByJarId(jarId);
    setCargoType(cargoType);
  };


  useEffect(() => {
    const fetchData = async () => {
      await getCargoType('J00006');
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (acttab == "P01801") {
      if (listOfData.jobTransId && listOfData.jobNo) {
        selectNocTransIdearchRadio(listOfData.jobTransId, listOfData.jobNo);
      }
      if (flag) {
        handleClear();
      }
    }
  }, [listOfData.jobTransId, listOfData.jobNo, acttab]);

  const [isModalOpenForNocTransIdSearch, setisModalOpenForNocTransIdSearch] = useState(false);
  const openNocTransIdSearchModal = () => {
    setisModalOpenForNocTransIdSearch(true);
    searchNocTrasnsId('');
  }

  const closeNocTrasnsIdSearchModal = () => {
    setisModalOpenForNocTransIdSearch(false);
    setNocTransIdSearchId('');
    setCHASearchedData([]);
  }

  const [nocTansIdSearchId, setNocTransIdSearchId] = useState('');

  const searchNocTrasnsId = (id) => {
    setLoading(true);
    axios.get(`${ipaddress}api/generalJobEntry/dataAllDataOfCfBondNoc?companyId=${companyid}&branchId=${branchId}&partyName=${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        setCHASearchedData(response.data);
        setLoading(false);
        setCurrentPage(1);

        console.log("response.data", response.data);
      })
      .catch((error) => {
        setLoading(false);
      })
  }


  const clearSearchNocTransId = () => {
    setNocTransIdSearchId('');
    searchNocTrasnsId('');
  }

  const selectNocTransIdearchRadio = (nocTransId, NocNo) => {
    closeNocTrasnsIdSearchModal();
    axios.get(`${ipaddress}api/generalJobEntry/getDataByTransIdANDNocID?companyId=${companyid}&branchId=${branchId}&nocTransID=${nocTransId}&nocNo=${NocNo}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;
        // const y =JSON.stringify(data)
        // setNOC((prev) => ({
        //     ...prev,
        //     ...data  // Spreading all API response fields into state
        // }));

        fetchData(companyid, branchId, data.jobTransId, data.jobNo);  // ✅ Corrected call
        setChaName(data.editedBy);
        setForworderName(data.forwarderName);
        setImpName(data.importerName);
        setNOC(response.data);
        setNocErrors({});
        setNocDtlErrors({});

        // setNOC((prev) => ({
        //   ...prev,
        //   cha: data.cha,
        //   packageOrWeight: data.packageOrWeight,
        //   jobNo: data.jobNo,
        //   jobTransDate: data.jobTransDate,
        //   jobTransId: data.jobTransId,
        //   jobDate: data.jobDate,
        //   boeNo: data.boeNo,
        //   boeDate: data.boeDate,
        //   importerName: data.importerName,
        //   importerAddress1: data.importerAddress1,
        //   importerAddress2: data.importerAddress2,
        //   importerAddress3: data.importerAddress3,
        //   cargoType: data.cargoType,
        //   area: data.area,
        //   grossWeight: data.grossWeight,
        //   noOfPackages: data.noOfPackages,
        //   noOf20ft: data.noOf20ft,
        //   noOf40ft: data.noOf40ft,
        //   numberOfMarks: data.numberOfMarks,
        //   comments: data.comments,
        //   godownNo: data.godownNo,
        //   createdBy: data.createdBy,
        //   approvedBy: data.approvedBy,
        //   status: data.status,
        // }));

        setNocFlag('edit');
        setNocErrors((prevErrors) => ({
          ...prevErrors,
          cha: "",
        }));

      })
      .catch((error) => {

      })
  }










  console.log('noc  ', noc);



  const [isModalOpenForIGMSearch, setisModalOpenForIGMSearch] = useState(false);
  const openIGMSearchModal = () => {
    setisModalOpenForIGMSearch(true);
    searchCHA('');
  }

  const closeIGMSearchModal = () => {
    setisModalOpenForIGMSearch(false);
    setChaSearchId('');
    setCHASearchedData([]);
  }

  const [chaSearchId, setChaSearchId] = useState('');
  const [chaSearchedData, setCHASearchedData] = useState([]);

  const searchCHA = (id) => {
    setLoading(true);
    axios.get(`${ipaddress}api/cfbondnoc/search?companyId=${companyid}&branchId=${branchId}&partyName=${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        setCHASearchedData(response.data);
        setLoading(false);
        setCurrentPage(1);

        console.log("response.data", response.data);
      })
      .catch((error) => {
        setLoading(false);
      })
  }


  const clearSearch = () => {
    setChaSearchId('');
    searchCHA('');
  }
  const [chaName, setChaName] = useState('');
  const [forworderName, setForworderName] = useState('');









  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = chaSearchedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(chaSearchedData.length / itemsPerPage);

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





  function handleInputChangeNew(e, val1, val2) {
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


  const handleNocChange = (e, val, val1) => {
    const { name, value } = e.target;
    let newValue = value;
    if (['area', 'cifValue', 'cargoDuty', 'insuranceValue'].includes(name)) {
      newValue = handleInputChangeNew(value, val, val1)
    }

    setNOC((prevNOC) => {
      const updatedNOC = {
        ...prevNOC,
        [name]: newValue,
      };

      // Calculate the sum of cifValue and cargoDuty
      const cifValue = parseFloat(updatedNOC.cifValue) || 0;
      const cargoDuty = parseFloat(updatedNOC.cargoDuty) || 0;

      return {
        ...updatedNOC,
        insuranceValue: (cifValue + cargoDuty).toFixed(2), // Update insuranceValue
      };
    });


    document.getElementById(name).classList.remove('error-border');
    setNocErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleDocDateChange = (date) => {
    setNOC((prevNoc) => ({
      ...prevNoc,
      nocFromDate: date,
      nocValidityDate: date ? new Date(date.getTime() + 27 * 24 * 60 * 60 * 1000) : null,
    }));

    document.getElementById("nocFromDate").classList.remove('error-border');
    setNocErrors((prevErrors) => ({
      ...prevErrors,
      nocFromDate: "",
    }));
  };

  const handleNocTransDate = (date) => {
    setNOC((prevNoc) => ({
      ...prevNoc,
      jobTransDate: date,
    }));

  };


  const handleNocValidityDateChnage = (date) => {
    setNOC((prevNoc) => ({
      ...prevNoc,
      nocValidityDate: date,
    }));
    document.getElementById("nocValidityDate").classList.remove('error-border');
    setNocErrors((prevErrors) => ({
      ...prevErrors,
      nocValidityDate: "",
    }));
  };


  const [nocErrors, setNocErrors] = useState([]);

  const [nocDtlErrors, setNocDtlErrors] = useState([]);




  // const handleSave = () => {

  //   let errors = {};

  //   if (!noc.cha) {
  //     errors.cha = "Cha is required."
  //     document.getElementById("cha").classList.add("error-border");
  //   }

  //   if (!noc.boeNo) {
  //     errors.boeNo = "BoeNo no is required."
  //     document.getElementById("boeNo").classList.add("error-border");
  //   }

  //   if (!noc.boeDate) {
  //     errors.boeDate = "BOE Date is required."
  //     document.getElementById("boeDate").classList.add("error-border");
  //   }
  //   if (!noc.jobDate) {
  //     errors.nocDate = "Job Date is required."
  //     document.getElementById("jobDate").classList.add("error-border");
  //   }

  //   if (!noc.importerName) {
  //     errors.importerName = "Importer Name is required."
  //     document.getElementById("importerName").classList.add("error-border");
  //   }

  //   if (!noc.packageOrWeight) {
  //     errors.packageOrWeight = "Package or Weight is required."
  //     document.getElementById("packageOrWeight").classList.add("error-border");
  //   }


  //   if (Object.keys(errors).length > 0) {
  //     setNocErrors(errors);
  //     setLoading(false);
  //     toast.error("Please fill in the required fields.", {
  //       autoClose: 1000
  //     })
  //     return;
  //   }

  //   // if(noc.status === 'A')
  //   // {
  //   //   setLoading(false);
  //   //   toast.info("Record is alredy approved.", {
  //   //       autoClose: 1000
  //   //   })
  //   //   return;
  //   // }

  //   if (cfbondnocDtl.length < 1) {
  //     toast.warn("Please add at least one commodity", {
  //       autoClose: 900,
  //     });
  //     setLoading(false);
  //     return;
  //   }
  //   setLoading(true);

  //   const requestBody =
  //   {
  //     noc: {
  //       ...noc,
  //     },
  //     nocDtl: {
  //       ...nocDtl,
  //     },
  //   };


  //   console.log("main bondy plase chekc ", requestBody);

  //   axios.post(`${ipaddress}api/generalJobEntry/saveCfBondNoc?cid=${companyid}&bid=${branchId}&user=${userId}&flag=${nocFlag}`, noc, {
  //     headers: {
  //       Authorization: `Bearer ${jwtToken}`
  //     }
  //   })
  //     .then((response) => {

  //       setNOC(response.data);
  //       toast.success("Data save successfully!!", {
  //         autoClose: 800
  //       })



  //       onRequest();
  //       setLoading(false);
  //       setNocFlag('edit');
  //       // set('add')
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       toast.error(error.response.data, {
  //         autoClose: 9000
  //       })
  //     })
  // };



  const validateNoc = () => {
    const errors = {};

    if (!noc.cha) {
      errors.cha = "CHA is required.";
    }

    // if (!noc.boeNo) {
    //   errors.boeNo = "BOE No is required.";
    // }

    // if (!noc.boeDate) {
    //   errors.boeDate = "BOE Date is required.";
    // }

    if (!noc.jobDate) {
      errors.jobDate = "Job Date is required.";
    }

    if (!noc.importerName) {
      errors.importerName = "Importer Name is required.";
    }

    if (!noc.packageOrWeight) {
      errors.packageOrWeight = "Package or Weight is required.";
    }

    setNocErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error("Please fill in the required fields.", {
        autoClose: 1000
      });
      return false;
    }

    return true;
  };




  const handleSave = () => {
    if (!validateNoc()) {
      setLoading(false);
      return;
    }

    if (cfbondnocDtl.length < 1) {
      toast.warn("Please add at least one commodity", {
        autoClose: 900,
      });
      setLoading(false);
      return;
    }

    setLoading(true);

    const requestBody = {
      noc: { ...noc },
      nocDtl: { ...nocDtl },
    };

    axios.post(`${ipaddress}api/generalJobEntry/saveCfBondNoc?cid=${companyid}&bid=${branchId}&user=${userId}&flag=${nocFlag}`, noc, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        setNOC(response.data);
        toast.success("Data saved successfully!!", { autoClose: 800 });
        onRequest();
        setLoading(false);
        setNocFlag('edit');
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response?.data || "Error occurred", { autoClose: 9000 });
      });
  };













  const handleClear = () => {
    setImpName('');
    setForworderName('');
    setNOC(initialJobEntry);
    setNocErrors({});
    setCfbondnocDtl([]);
    setNocFlag('add');
    setChaName('');
  };

  const [modal, setModal] = useState(false);
  const handleOpenModal = () => {

    if (!validateNoc()) {
      setLoading(false);
      return;
    }
    setModal(true);
  }

  const handleOpenClose = () => {
    setModal(false);
    setNocDtl({});
    setSelectedTypeOfPackages('');
    setNocDtlErrors({});
  }


  const handleInputChange = (e, val, val1) => {
    const { name, value } = e.target;

    let newValue = value;
    if (['area', 'areaOccupied', 'grossWeight', 'noOfPackages'].includes(name)) {
      newValue = handleInputChangeNew(value, val, val1);
    }

    setNocDtl((prevNocDtl) => ({
      ...prevNocDtl,
      [name]: newValue,
    }));

    setNocDtlErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // const handleSubmit = (e) => {
  //   // setLoading(true);
  //   e.preventDefault();

  //   let errors = {};

  //   if (!nocDtl.noOfPackages) {
  //     errors.noOfPackages = "no of packages is required."
  //     document.getElementById("noOfPackages").classList.add("error-border");

  //   }
  //   if (!nocDtl.typeOfPackage) {
  //     errors.typeOfPackage = "type of packages is required."
  //     document.getElementById("typeOfPackage").classList.add("error-border");
  //   }
  //   if (!nocDtl.commodityId) {
  //     errors.commodityId = "Commodity is required."
  //     document.getElementById("commodityId").classList.add("error-border");
  //   }


  //   if (!nocDtl.grossWeight) {
  //     errors.grossWeight = "Gross Weight is required."
  //     document.getElementById("grossWeight").classList.add("error-border");
  //   }

  //   if (!nocDtl.areaOccupied) {
  //     errors.areaOccupied = "Area is required."
  //     document.getElementById("areaOccupied").classList.add("error-border");
  //   }

  //   if (!nocDtl.commodityDescription) {
  //     errors.commodityDescription = "Description is required."
  //     document.getElementById("commodityDescription").classList.add("error-border");
  //   }
  //   if (Object.keys(errors).length > 0) {
  //     setNocDtlErrors(errors);
  //     setLoading(false);
  //     toast.error("Please fill in the required fields.", {
  //       autoClose: 800
  //     })
  //     setLoading(false);
  //     return;
  //   }
  //   setLoading(true);

  //   const requestBody =
  //   {
  //     noc: {
  //       ...noc,
  //     },
  //     nocDtl: {
  //       ...nocDtl,
  //     },
  //   };

  //   axios.post(`${ipaddress}api/generalJobEntry/saveNoc?cid=${companyid}&bid=${branchId}&user=${userId}&flag=${nocFlag}`, requestBody, {
  //     headers: {
  //       Authorization: `Bearer ${jwtToken}`
  //     }
  //   })
  //     .then((response) => {

  //       setNOC(response.data);
  //       toast.success("Data save successfully!!", {
  //         autoClose: 800
  //       })

  //       fetchData(companyid, branchId, response.data.jobTransId, response.data.jobNo);
  //       setLoading(false);
  //       setNocDtl('');
  //       setNocFlag('edit');
  //       setModal(false);
  //       setSelectedTypeOfPackages('');
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       toast.error(error.response.data, {
  //         autoClose: 800
  //       })
  //     })
  //   console.log(nocDtl);
  //   setModal(false);
  // };




  const validateNocDtl = () => {
    const errors = {};

    if (!nocDtl.noOfPackages) {
      errors.noOfPackages = "No of packages is required.";
    }

    if (!nocDtl.typeOfPackage) {
      errors.typeOfPackage = "Type of package is required.";
    }

    if (!nocDtl.commodityId) {
      errors.commodityId = "Commodity is required.";
    }

    if (!nocDtl.grossWeight) {
      errors.grossWeight = "Gross Weight is required.";
    }

    if (!nocDtl.areaOccupied) {
      errors.areaOccupied = "Area is required.";
    }

    if (!nocDtl.commodityDescription) {
      errors.commodityDescription = "Description is required.";
    }

    setNocDtlErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error("Please fill in the required fields.", {
        autoClose: 800
      });
      return false;
    }

    return true;
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateNocDtl()) {
      setLoading(false);
      return;
    }

    setLoading(true);


    console.log('nocDtl ', nocDtl);

    const requestBody = {
      noc: { ...noc },
      nocDtl: { ...nocDtl },
    };

    axios.post(`${ipaddress}api/generalJobEntry/saveNoc?cid=${companyid}&bid=${branchId}&user=${userId}&flag=${nocFlag}`, requestBody, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        setNOC(response.data);
        toast.success("Data saved successfully!!", { autoClose: 800 });
        fetchData(companyid, branchId, response.data.jobTransId, response.data.jobNo);
        setLoading(false);
        setNocDtl('');
        setNocFlag('edit');
        setModal(false);
        setSelectedTypeOfPackages('');
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response?.data || "Something went wrong", {
          autoClose: 800
        });
      });
  };



  const [cfbondnocDtl, setCfbondnocDtl] = useState([]);
  const fetchData = async (companyid, branchId, nocTransId, nocNo) => {

    try {
      const response = await fetch(`${ipaddress}api/generalJobEntry/getCfBondNocDtlForNocScreen?companyId=${companyid}&branchId=${branchId}&nocTransId=${nocTransId}&nocNo=${nocNo}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCfbondnocDtl(data);
    } catch (error) {
      // setError(error);
    } finally {
      setLoading(false);
    }
  };

  const [selectedTYPEOFPACKAGES, setSelectedTypeOfPackages] = useState("");
  const [options, setOptions] = useState([]);
  const [commoditylist, setCommodityList] = useState([]);

  useEffect(() => {
    const fetchJarDetails = async () => {
      try {
        const response = await axios.get(`${ipaddress}jardetail/getJarDetailSelect`, {
          params: {
            companyId: companyid,
            jarId: 'J00060'
          }
        });
        setOptions(response.data); // use response.data instead of response directly
      } catch (error) {
        console.error("Error fetching jar details:", error);
      }
    };

    const fetchCommodityDetails = async () => {
      try {
        const response = await axios.get(`${ipaddress}commodity/getCommodityDataNew`, {
          params: {
            companyId: companyid,
            branchId
          }
        });
        setCommodityList(response.data); // use response.data instead of response directly
      } catch (error) {
        console.error("Error fetching jar details:", error);
      }
    };
    fetchJarDetails();
    fetchCommodityDetails();
  }, []);


  const handleChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    setSelectedTypeOfPackages(value);
    setNocDtl((prev) => ({
      ...prev,
      typeOfPackage: value,
    }));
    setErrors("");

    setNocDtlErrors((prevErrors) => ({
      ...prevErrors,
      typeOfPackage: "",
    }));
  };


  const handleCommodityChange = (selectedOption) => {
    setNocDtl((prev) => ({
      ...prev,
      commodityId: selectedOption?.value,
      commodityDescription: selectedOption?.label
    }));
    setErrors("");

    setNocDtlErrors((prevErrors) => ({
      ...prevErrors,
      commodityDescription: "",
    }));
  };

  // const options = TYPEOFPACKAGES.map(packages => ({
  //   value: packages.jarDtlId,
  //   label: packages.jarDtlDesc
  // }));


  const handleEdit = (dtlId, transId, nocId) => {

    axios.get(`${ipaddress}api/generalJobEntry/getDataCfBondNocDtl?companyId=${companyid}&branchId=${branchId}&dtlid=${dtlId}&trasnId=${transId}&nocId=${nocId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {

        setModal(true);
        setNocDtl(response.data);
        setSelectedTypeOfPackages(response.data.typeOfPackage);
        setNocFlag('edit')

      })
      .catch((error) => {

      })

    console.log(`Edit item with ID: ${dtlId}`);
  };

  // const handleDelete = (dtlId,transId,nocId) => {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     html: 'Are you sure you want to delete the record?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     customClass: {
  //         icon: 'icon-smaller' // Apply the custom class to the icon
  //     },
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, close it!'
  // }).then((result) => {
  //     if (result.isConfirmed) {
  //         axios.post(`${ipaddress}api/cfbondnoc/delete?companyId=${companyid}&branchId=${branchId}&dtlid=${dtlId}&trasnId=${transId}&nocId=${nocId}`, null, {
  //             headers: {
  //                 Authorization: `Bearer ${jwtToken}`
  //             }
  //         })
  //             .then((response) => {
  //                 fetchData(companyid,branchId,transId,nocId);
  //                 if (response.data === 'success') {
  //                     Swal.fire({
  //                         title: "Deleted!",
  //                         text: "Data deleted successfully!!!",
  //                         icon: "success"
  //                     });
  //                 }

  //             })
  //             .catch((error) => {

  //             })

  //     }
  // });
  //   console.log(`Delete item with ID: ${dtlId}`);
  // };

  const [selectedDate, setSelectedDate] = useState(new Date());



  function handleInputChangeNumber(e) {
    if (e === null || e === undefined) {
      return ''; // Return an empty string or any default value you prefer
    }
    const inputValue = e.toString(); // Convert to string if needed
    const numericInput = inputValue.replace(/[^0-9.]/g, '');
    const parts = numericInput.split('.');
    const integerPart = parts[0];
    let decimalPart = parts[1];
    if (decimalPart !== undefined) {
      decimalPart = `.${decimalPart.slice(0, 3)}`;
    }
    const sanitizedInput = decimalPart !== undefined ? `${integerPart}${decimalPart}` : integerPart;
    return sanitizedInput;
  }


  const [isoData, setISOData] = useState([]);
  const [fdrData, setFdrData] = useState([]);
  const [impId, setImpId] = useState('');
  const handlePortChange = async (selectedOption, { action }) => {

    if (action === 'clear') {

      console.log("respone datacagahgdhsagdhs", selectedOption);
      setNOC((pre) => ({
        ...pre,
        cha: '',
        chaName: '',
      }));
      setChaName('');
      document.getElementById('cha').classList.remove('error-border');
      setNocErrors((prevErrors) => ({
        ...prevErrors,
        ['cha']: "",
      }));
    }
    else {
      console.log("respone datacagahgdhsagdhs", selectedOption);

      setNOC((prev) => ({
        ...prev,
        cha: selectedOption ? selectedOption.value : '',
        chaName: selectedOption ? selectedOption.drop : '',
      }));

      setChaName(selectedOption ? selectedOption.drop : '');
      setNOC((noc) => ({
        ...noc,
        cha: selectedOption ? selectedOption.value : '',
        chaName: selectedOption ? selectedOption.drop : '',
        chaName: selectedOption ? selectedOption.cName : '',
      }));

      setChaName(selectedOption ? selectedOption.drop : '');

      document.getElementById('cha').classList.remove('error-border');
      setNocErrors((prevErrors) => ({
        ...prevErrors,
        ['cha']: "",
      }));
    }
  };

  const getIsoData = (val) => {
    if (val === '') {
      setISOData([]);
      return;
    }

    axios.get(`${ipaddress}api/cfbondnoc/search?companyId=${companyid}&branchId=${branchId}&partyName=${val}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;

        console.log("response.data", data);
        const portOptions = data.map(port => ({
          value: port.partyId,
          label: `${port.partyName}-${port.address1},${port.address1},${port.address3}`,
          drop: port.partyName,
          ccode: port.customerCode,
          bWeek: port.bondnocWeek,
          cName: port.partyName,
        }))
        setISOData(portOptions);
      })
      .catch((error) => {

      })
  }


  const handleForworderChange = async (selectedOption, { action }) => {

    if (action === 'clear') {
      setNOC((pre) => ({
        ...pre,
        forwarder: '',
        forworderName: '',
      }));
      setForworderName('');
    }
    else {
      console.log("respone datacagahgdhsagdhs", selectedOption);

      setNOC((prev) => ({
        ...prev,
        forwarder: selectedOption ? selectedOption.value : '',
        forworderName: selectedOption ? selectedOption.drop : '',
      }));

      setForworderName(selectedOption ? selectedOption.drop : '');
      setNOC((noc) => ({
        ...noc,
        forwarder: selectedOption ? selectedOption.value : '',
        forworderName: selectedOption ? selectedOption.drop : '',
        forworderName: selectedOption ? selectedOption.cName : '',
      }));
    }
  };

  const getForworderData = (val) => {
    if (val === '') {
      setFdrData([]);
      return;
    }

    axios.get(`${ipaddress}api/generalJobEntry/search?companyId=${companyid}&branchId=${branchId}&partyName=${val}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;

        console.log("response.data", data);
        const portOptions = data.map(port => ({
          value: port.partyId,
          label: `${port.partyName}-${port.address1},${port.address1},${port.address3}`,
          drop: port.partyName,
          cName: port.partyName,
        }))
        setFdrData(portOptions);
      })
      .catch((error) => {

      })
  }
  const [impName, setImpName] = useState("");
  const [impData, setImpData] = useState([]);
  const handleImporterChange = async (selectedOption, { action }) => {

    if (action === 'clear') {
      setImpName('');
      console.log("respone datacagahgdhsagdhs", selectedOption);
      setNOC((pre) => ({
        ...pre,
        importerId: '',
        importerName: '',
        importerAddress1: '',
        importerAddress2: '',
        importerAddress3: '',
      }));
      setImpId('');
      document.getElementById('importerName').classList.remove('error-border');
      setNocErrors((prevErrors) => ({
        ...prevErrors,
        ['importerName']: "",
      }));
    }
    else {
      console.log("respone datacagahgdhsagdhs", selectedOption);

      setNOC((prev) => ({
        ...prev,
        importerId: selectedOption ? selectedOption.value : '',
        importerName: selectedOption ? selectedOption.impN : '',
      }));

      setImpId(selectedOption ? selectedOption.value : '');
      setImpName(selectedOption ? selectedOption.impN : '');

      setNOC((noc) => ({
        ...noc,
        importerId: selectedOption ? selectedOption.value : '',
        importerName: selectedOption ? selectedOption.impN : '',
        importerAddress1: selectedOption ? selectedOption.ad1 : '',
        importerAddress2: selectedOption ? selectedOption.ad2 : '',
        importerAddress3: selectedOption ? selectedOption.ad3 : '',
      }));


      setNocErrors((prevErrors) => ({
        ...prevErrors,
        importerName: "",
      }));

      document.getElementById('importerName').classList.remove('error-border');
      setNocErrors((prevErrors) => ({
        ...prevErrors,
        ['importerName']: "",
      }));
    }
  };

  const getImporterData = (val) => {
    if (val === '') {
      setImpData([]);
      return;
    }

    axios.get(`${ipaddress}api/cfbondnoc/searchImporters?companyId=${companyid}&branchId=${branchId}&partyName=${val}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;

        console.log("response.data", data);
        const portOptions = data.map(port => ({
          value: port.partyId,
          label: `${port.partyName}-${port.address1}-${port.address2}-${port.address3}`,
          //label: port.partyName,
          impN: port.partyName,
          ad1: port.address1,
          ad2: port.address2,
          ad3: port.address3,
        }))
        setImpData(portOptions);
      })
      .catch((error) => {

      })
  }


  useEffect(() => {
    getImpAddress();
  }, [impId]);
  const [impAddData, setImpAddData] = useState([]);
  const getImpAddress = () => {
    axios.get(`${ipaddress}api/cfbondnoc/searchImportersAddress?companyId=${companyid}&branchId=${branchId}&partyId=${impId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;
        console.log("response.data", data);
        const addressOptions = data.map(port => ({
          value: port.srNo,   // Assuming `srNo` is the unique identifier
          // label: `${port.address1 }${port.address2}${port.address3}`,   // Display this field in the dropdown
          label: port.address1,   // Display this field in the dropdown
          add1: port.address1,  // Address 1
          add2: port.address2,   // Address 2
          add3: port.address3,    // Address 3
        }));
        setImpAddData(addressOptions);
      })
      .catch((error) => {
        console.error("Error fetching address data", error);
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

          </Row>
          <Modal Modal isOpen={isModalOpenForNocTransIdSearch} onClose={closeNocTrasnsIdSearchModal} toggle={closeNocTrasnsIdSearchModal} style={{ maxWidth: '1200px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>
            <ModalHeader toggle={closeNocTrasnsIdSearchModal} style={{
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
                icon={faSearch}
                style={{
                  marginRight: '8px',
                  color: 'white', // Set the color to golden
                }}
              /> Search JOB Entry</h5>

            </ModalHeader>
            <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
              <Row>
                <Col md={4}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="sbRequestId">
                      Search by Job Trans Id / Job No / BOE No
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="nocTansIdSearchId"
                      maxLength={15}
                      name='nocTansIdSearchId'
                      value={nocTansIdSearchId}
                      onChange={(e) => setNocTransIdSearchId(e.target.value)}
                    />

                  </FormGroup>
                </Col>
                <Col md={4} style={{ marginTop: 24 }}>
                  <button
                    className="btn btn-outline-primary btn-margin newButton"
                    style={{ marginRight: 10 }}
                    id="submitbtn2"
                    onClick={() => searchNocTrasnsId(nocTansIdSearchId)}
                  >
                    <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                    Search
                  </button>
                  <button
                    className="btn btn-outline-danger btn-margin newButton"
                    style={{ marginRight: 10 }}
                    id="submitbtn2"
                    onClick={clearSearchNocTransId}
                  >
                    <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                    Reset
                  </button>
                </Col>
              </Row>
              <hr />
              <div className="mt-1 table-responsive text-center">
                <table className="table table-bordered table-hover tableHeader">
                  <thead className='tableHeader'>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Job Trans Id</th>
                      <th scope="col">Job Trans Date</th>
                      <th scope="col">Job No</th>

                      <th scope="col">Job Date</th>

                      <th scope="col">BE No</th>
                      <th scope="col">BE Date</th>
                      <th scope="col">Importer Name</th>

                      <th scope="col">Status</th>

                    </tr>
                    <tr className='text-center'>
                      <th scope="col"></th>
                      <th scope="col">{chaSearchedData.length}</th>
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
                    {currentItems.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <input type="radio" name="radioGroup" onChange={() => selectNocTransIdearchRadio(item.jobTransId, item.jobNo)} value={item[0]} />
                        </td>
                        <td>{item.jobTransId}</td>
                        <td>
                          {item.jobTransDate
                            ? format(new Date(item.jobTransDate), 'dd/MM/yyyy HH:mm')
                            : 'N/A'}
                        </td>
                        <td>{item.jobNo}</td>
                        <td>{item.jobDate ? format(new Date(item.jobDate), 'dd/MM/yyyy HH:mm') : 'N/A'}</td>

                        <td>{item.boeNo}</td>
                        <td>
                          {item.boeDate ? format(new Date(item.boeDate), 'dd/MM/yyyy HH:mm') : 'N/A'}
                        </td>
                        <td>{item.importerName}</td>
                        <td>{item.status === "A" ? 'Approved' : ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                  <Pagination.First onClick={() => handlePageChange(1)} />
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  <Pagination.Ellipsis />

                  {displayPages().map((pageNumber) => (
                    <Pagination.Item
                      key={pageNumber}
                      active={pageNumber === currentPage}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </Pagination.Item>
                  ))}

                  <Pagination.Ellipsis />
                  <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                  <Pagination.Last onClick={() => handlePageChange(totalPages)} />
                </Pagination>
              </div>
            </ModalBody>
          </Modal>

          <Row>

            <Col md={2}>

              <Row>
                <Col md={9}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="jobTransId">
                      Job Trans Id
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="jobTransId"
                      name="jobTransId"
                      value={noc.jobTransId}
                      maxLength={27}
                      disabled
                    />
                  </FormGroup>

                </Col>

                <Col md={3} className="d-flex justify-content-end" style={{ marginTop: 21 }}>

                  <button
                    className="btn btn-outline-primary btn-margin newButton"
                    style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    id="submitbtn2"
                    onClick={openNocTransIdSearchModal}
                  >
                    <FontAwesomeIcon
                      icon={faSearch}
                    />
                  </button>
                </Col>
              </Row>

            </Col>



            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="jobTransDate">
                  Job Trans Date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleNocTransDate}
                    id="jobTransDate"
                    name="jobTransDate"
                    dateFormat="dd/MM/yyyy HH:mm"
                    showTimeSelect
                    value={noc.jobTransDate}
                    disabled
                    timeFormat="HH:mm"
                    className="form-control border-right-0 inputField"
                    customInput={<input style={{ width: "100%" }} />}
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
                <label className="forlabel bold-label" htmlFor="jobNo">
                  Job No
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="jobNo"
                  maxLength={15}
                  name="jobNo"
                  value={noc.jobNo}
                  disabled
                />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="jobDate">
                  Job Date <span className="error-message">*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={noc.jobDate}
                    onChange={(date) => {
                      setNOC((prevNoc) => ({
                        ...prevNoc,
                        jobDate: date,
                      }));
                    }}
                    //   onChange={handleDocDate}
                    id="jobDate"
                    name="jobDate"
                    value={noc.jobDate}
                    dateFormat="dd/MM/yyyy"
                    className="form-control border-right-0 inputField"
                    customInput={<input style={{ width: "100%" }} />}
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
                <div style={{ color: 'red' }} className="error-message">{nocErrors.nocDate}</div>
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
                  id="status"
                  maxLength={15}
                  disabled
                  name="status"
                  value={noc.status === "A" ? 'Approved' : ''}
                />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="createdBy">
                  Created By <span className="error-message"></span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="createdBy"
                  disabled
                  maxLength={15}
                  name="createdBy"
                  value={noc.createdBy}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>

            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  BE No 
                  {/* <span className="error-message">*</span> */}
                </label>
                <input
                  className={`form-control ${nocErrors.boeNo ? 'error-border' : ''}`}
                  placeholder="Enter BE No"
                  type="text"
                  id="boeNo"
                  maxLength={15}
                  name="boeNo"
                  value={noc.boeNo}
                  onChange={handleNocChange}
                />
                <div className="error-message">
                  {nocErrors.boeNo}
                </div>

              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="boeDate">
                  BE Date 
                  {/* <span className="error-message">*</span> */}
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={noc.boeDate}
                    onChange={(date) => {
                      setNOC((prevNoc) => ({
                        ...prevNoc,
                        boeDate: date,
                      }));

                      setNocErrors((prevErrors) => ({
                        ...prevErrors,
                        boeDate: "",
                      }));
                    }}
                    id="boeDate"
                    name="boeDate"
                    dateFormat="dd/MM/yyyy"
                    className={`form-control border-right-0 inputField ${nocErrors.boeDate ? 'error-border' : ''}`}
                    // customInput={<CustomDateInput />}
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
                <div className="error-message">{nocErrors.boeDate}</div>
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="packageOrWeight">
                  Pkg Or Weight <span className="error-message">*</span>
                </label>
                <select
                  className={`form-control ${nocErrors.packageOrWeight ? 'error-border' : ''}`}
                  id="packageOrWeight"
                  name="packageOrWeight"
                  value={noc.packageOrWeight}
                  onChange={(e) => {
                    const { value } = e.target;

                    setNOC((prevNOC) => ({
                      ...prevNOC,
                      packageOrWeight: value,
                    }));

                    setNocErrors((prevErrors) => ({
                      ...prevErrors,
                      packageOrWeight: "",
                    }));
                  }}

                >
                  <option value="">Select...</option>
                  <option value="PACKAGE">Package</option>
                  <option value="WEIGHT">Weight</option>
                </select>
                <div className="error-message">{nocErrors.packageOrWeight}</div>
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  CHA <span className="error-message">*</span>
                </label>
                <Select
                  value={noc.cha ? { value: noc.cha, label: chaName } : null}
                  onChange={handlePortChange}
                  onInputChange={getIsoData}
                  options={isoData}
                  placeholder="Select CHA"
                  isClearable
                  id="cha"
                  vesselName="cha"
                  className={`${nocErrors.cha ? 'error-border' : ''}`}

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

                <div className="error-message">{nocErrors.cha}</div>
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="forwarder">
                  Forwarder
                </label>
                <Select
                  value={noc.forwarder ? { value: noc.forwarder, label: forworderName } : null}
                  onChange={handleForworderChange}
                  onInputChange={getForworderData}
                  options={fdrData}
                  placeholder="Select Forwarder"
                  isClearable
                  id="forwarder"
                  vesselName="forwarder"
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
                <label className="forlabel bold-label" htmlFor="approvedBy">
                  Approved By
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="approvedBy"
                  disabled
                  maxLength={15}
                  name="approvedBy"
                  value={noc.approvedBy}
                />
              </FormGroup>
            </Col>

          </Row>
          <Row>

            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="importerName">
                  Importer <span className="error-message">*</span>
                </label>
                <Select
                  value={noc.importerId ? { value: noc.importerId, label: impName } : null}
                  onChange={handleImporterChange}
                  onInputChange={getImporterData}
                  options={impData}
                  placeholder="Select Importer"
                  isClearable
                  id="importerName"
                  vesselName="importerName"
                  className={`${nocErrors.importerName ? 'error-border' : ''}`}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      height: 32,  // Set the height of the select input
                      minHeight: 32,
                      border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc'                   
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

                <div className="error-message">{nocErrors.importerName}</div>
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="importerAddress1">
                  Importer Address1
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="importerAddress1"
                  maxLength={15}
                  name="importerAddress1"
                  value={noc.importerAddress1}
                  disabled
                />
              </FormGroup>
            </Col>


            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="importerAddress2">
                  Importer Address2
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="importerAddress2"
                  maxLength={15}
                  name="importerAddress2"
                  value={noc.importerAddress2}
                  disabled
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="importerAddress3">
                  Importer Address3
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="importerAddress3"
                  maxLength={15}
                  name="importerAddress3"
                  value={noc.importerAddress3}
                  disabled
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="cargoType">
                  Cargo Type
                </label>
                <select
                  className="form-control"
                  id="cargoType"
                  name="cargoType"
                  value={noc.cargoType}
                  onChange={(e) =>
                    setNOC((prevNOC) => ({
                      ...prevNOC,
                      cargoType: e.target.value,
                    }))
                  }
                >
                  <option value="GEN">General</option>
                  <option value="HAZ">Hazardous</option>
                </select>
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="godownNo">
                  Godown No
                </label>

                <input
                  className="form-control"
                  type="text"
                  id="godownNo"
                  maxLength={5}
                  name="godownNo"
                  value={noc.godownNo}
                  onChange={handleNocChange}
                />
              </FormGroup>
            </Col>


          </Row>

          <Row>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="area">
                  Allocated Area <span className="error-message">*</span>
                </label>

                <input
                  className="form-control"
                  type="text"
                  id="area"
                  maxLength={15}
                  name="area"
                  value={noc.area}
                  disabled
                  onChange={(e) => handleNocChange(e, 5, 3)}
                />

                <div style={{ color: 'red' }} className="error-message">{nocErrors.area}</div>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="noOfPackages">
                  No of Packages <span className="error-message">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="noOfPackages32"
                  name="noOfPackages"
                  disabled
                />
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="grossWeight">
                  Gross Wt
                </label>
                <input
                  disabled
                  className="form-control"
                  type="number"
                  id="grossWeight32"
                  name="grossWeight"
                  value={noc.grossWeight}
                />

              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="noOf20ft">
                  No of 20 FT Containers
                </label>

                <input
                  className="form-control"
                  type="text"
                  id="noOf20ft"
                  maxLength={5}
                  name="noOf20ft"
                  value={noc.noOf20ft}
                  onChange={handleNocChange}
                  onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')}
                  onPaste={(e) => {
                    e.preventDefault();
                    const pastedText = e.clipboardData.getData('text').replace(/\D/g, ''); // Remove non-numeric
                    e.target.value = pastedText;
                    handleNocChange(e); // Ensure the change is handled
                  }}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="noOf40ft">
                  No of 40 FT Containers
                </label>

                <input
                  className="form-control"
                  type="text"
                  id="noOf40ft"
                  maxLength={5}
                  name="noOf40ft"
                  value={noc.noOf40ft}
                  onChange={handleNocChange}
                  onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')}
                  onPaste={(e) => {
                    e.preventDefault();
                    const pastedText = e.clipboardData.getData('text').replace(/\D/g, ''); // Remove non-numeric
                    e.target.value = pastedText;
                    handleNocChange(e); // Ensure the change is handled
                  }}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Marks & Nos
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="numberOfMarks"
                  maxLength={15}
                  name="numberOfMarks"
                  value={noc.numberOfMarks}
                  onChange={handleNocChange}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>

            <Col md={4}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="comments">
                  Remarks
                </label>

                <Input
                  className="form-control"
                  type="textarea"
                  id="comments"
                  maxLength={225}
                  name="comments"
                  value={noc.comments}
                  onChange={handleNocChange}
                />
              </FormGroup>
            </Col>
          </Row>
        </div>
        {/* <hr /> */}
        <Row className="text-center mt-2">
          <Col>

            <button
              className="btn btn-outline-primary btn-margin newButton"
              style={{ marginRight: 10 }}
              id="submitbtn2"
              onClick={handleSave}
            // disabled={noc.status==="A"}
            >
              <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
              Save
            </button>

            <button
              className="btn btn-outline-primary btn-margin newButton"
              style={{ marginRight: 10 }}
              id="submitbtn2"
              // disabled={noc.status==="A"}
              onClick={handleOpenModal}
            >
              <FontAwesomeIcon icon={faAdd} style={{ marginRight: "5px" }} />
              Add Details
            </button>

            <button
              className="btn btn-outline-danger btn-margin newButton"
              style={{ marginRight: 10 }}
              id="submitbtn2"
              onClick={handleClear}
            >
              <FontAwesomeIcon
                icon={faRefresh}
                style={{ marginRight: "5px" }}
              />
              Clear
            </button>




          </Col>
        </Row>

        <Modal isOpen={modal} backdrop={true} keyboard={true} onClosed={handleOpenClose} toggle={handleOpenClose} style={{ maxWidth: '999px', fontSize: 12, overflow: '-moz-hidden-unscrollable' }}>
          <ModalHeader toggle={handleOpenClose}
            style={{
              backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
              boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
              border: '1px solid rgba(0, 0, 0, 0.3)',
              borderRadius: '0',
              backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}>  <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', color: 'white' }} > <FontAwesomeIcon
              icon={faSearch}
              style={{
                marginRight: '8px',
                color: 'white', // Set the color to golden
              }}
            /> Add Commodity Details</h5></ModalHeader>
          <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
            <Form >
              <Row>
                <Col md={4}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="noOfPackages">
                      No Of Packages <span className="error-message">*</span>
                    </label>
                    <input
                      className={`form-control ${nocDtlErrors.noOfPackages ? 'error-border' : ''}`}
                      type="text"
                      name="noOfPackages"
                      id="noOfPackages"
                      value={nocDtl?.noOfPackages || ""} // ✅ Use optional chaining and default value
                      // onChange={handleInputChange}
                      onChange={(e) => handleInputChange(e, 5, 0)}
                      maxLength={5}
                    />

                    <div className="error-message">{nocDtlErrors.noOfPackages}</div>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="typeOfPackage">
                      Type Of Packages <span className="error-message">*</span>
                    </label>
                    <Select
                      placeholder="Select Packages"
                      className={`${nocDtlErrors.typeOfPackage ? 'error-border' : ''}`}
                      isClearable
                      id='typeOfPackage'
                      name='typeOfPackage'
                      value={options.find(option => option.value === selectedTYPEOFPACKAGES)}
                      onChange={handleChange}
                      options={options}
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          height: 32,  // Set the height of the select input
                          minHeight: 32,
                          border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc'
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
                    <div className="error-message">{nocDtlErrors.typeOfPackage}</div>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="grossWeight">
                      Gross Weight
                    </label>
                    <input
                      className={`form-control ${nocDtlErrors.grossWeight ? 'error-border' : ''}`}
                      type="text"
                      id="grossWeight"
                      name="grossWeight"
                      value={nocDtl?.grossWeight || ""}
                      onChange={(e) => handleInputChange(e, 13, 3)}
                    />
                    <div className="error-message">
                      {nocDtlErrors.grossWeight}
                    </div>
                  </FormGroup>
                </Col>

              </Row>



              <Row>
                {/* <Col md={4}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="commodityId">
                      Commodity Type <span className="error-message">*</span>
                    </label>
                    <Input
                      type="select"
                      value={nocDtl?.commodityId || ""}
                      name="commodityId"
                      id='commodityId'
                      onChange={handleInputChange}
                      className={`form-control ${nocDtlErrors.commodityId ? 'error-border' : ''}`}
                    >
                      <option value="">Select Commodity Type</option>
                      {cargoTypes.map((type, idx) => (
                        <option key={idx} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </Input>
                    <div className="error-message">{nocDtlErrors.commodityId}</div>
                  </FormGroup>
                </Col> */}

                <Col md={4}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="areaOccupied">
                      Area Occupied <span className="error-message">*</span>
                    </label>
                    <input
                      className={`form-control ${nocDtlErrors.areaOccupied ? 'error-border' : ''}`}
                      type="text"
                      name="areaOccupied"
                      id="areaOccupied"

                      value={nocDtl?.areaOccupied || ""}
                      onChange={(e) => handleInputChange(e, 5, 0)}
                    />
                    <div className="error-message">{nocDtlErrors.areaOccupied}</div>
                  </FormGroup>
                </Col>

                <Col md={4}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="commodityDescription">
                      Commodity Description <span className="error-message">*</span>
                    </label>


                    <Select
                      placeholder="Select Commodity"
                      className={`${nocDtlErrors.commodityDescription ? 'error-border' : ''}`}
                      isClearable
                      id='commodityDescription'
                      name="commodity"
                      value={nocDtl.commodityId ? { value: nocDtl.commodityId, label: nocDtl.commodityDescription } : null}
                      onChange={handleCommodityChange}
                      options={commoditylist}
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          height: 32,  // Set the height of the select input
                          minHeight: 32,
                          border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc'
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

                    {/* <input
                      className="form-control"
                      type="textarea"
                      name="commodityDescription"
                      id="commodityDescription"
                      value={nocDtl?.commodityDescription || ""}
                      onChange={handleInputChange}
                    /> */}
                    <div className="error-message">{nocDtlErrors.commodityDescription}</div>
                  </FormGroup>
                </Col>
              </Row>
            </Form>

            <hr />
            <Row className="text-center" style={{ marginTop: 25 }}>
              <Col>
                <button className="btn btn-outline-primary btn-margin newButton"
                  style={{ marginRight: 10 }} type="submit"
                  onClick={handleSubmit}> <FontAwesomeIcon icon={faSave} style={{ marginRight: 4 }}></FontAwesomeIcon>
                  Save
                </button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>



        {cfbondnocDtl && cfbondnocDtl.length > 0 && (
          <>
            <hr />
            <div
              className="table-responsive"
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              <h5
                className="pageHead"
                style={{
                  fontFamily: "Your-Heading-Font",
                  paddingLeft: "2%",
                  paddingRight: "-20px",
                }}
              >
                {" "}
                <FontAwesomeIcon
                  icon={faGroupArrowsRotate}
                  style={{
                    marginRight: "8px",
                    color: "black", // Set the color to golden
                  }}
                />
                Commodity Details
              </h5>
              <table className="table table-bordered table-hover tableHeader">
                <thead className="tableHeader">
                  <tr>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Sr No.
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Commodity
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Type Of Package
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      No. Of Package
                    </th>

                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Gross Weight
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Area Occupied
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cfbondnocDtl.map((dtl, index) => (
                    <tr key={index} className="text-center">
                      <th scope="row">{index + 1}</th>
                      <td>{dtl.commodityDescription}</td>
                      <td>{dtl.typeOfPackage}</td>
                      <td>{dtl.noOfPackages}</td>
                      <td>{dtl.grossWeight}</td>
                      <td>{dtl.areaOccupied}</td>

                      <td>
                        <Button type="button" onClick={() => handleEdit(dtl.jobDtlTransId, dtl.jobTransId, dtl.jobNo)} className="" variant="outline-primary">
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </>
        )}


      </div>



    </>
  );
}

export default JobEntry;
