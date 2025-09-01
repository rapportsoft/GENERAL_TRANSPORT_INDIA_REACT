import AuthContext from "../Components/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import Select from "react-select";
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
  faCertificate,
  fas,
  faEdit,
  faGroupArrowsRotate,
  faPrint,
  faTruck,
  faBraille,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/style.css";
import "../Components/Style.css";
import useAxios from "../Components/useAxios";
import CFSService from "../service/CFSService";
import { toast } from "react-toastify";
import moment from "moment";
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
  FormFeedback,
} from "reactstrap";
import { Pagination } from "react-bootstrap";
import Swal from "sweetalert2";
import { format } from "date-fns";
// import { format } from "date-fns";

function GateInBondedCargo({noctrans,nocno,acttab,boe,listOfData,flag,onRequest}) {
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

  const initialGateIn = {
    companyId:companyid,
branchId: branchId,
profitcentreId: "N00003",
containerNo:"",
containerSize:"",
containerType:"",
isoCode:"",
vehicleNo:"",
gateInType: "BON",
transporterName:"",
transporterStatus:"P",
grossWeight:"",
inGateInDate:new Date(),
createdBy: "",
createdDate: "",
editedBy: "",
editedDate: "",
approvedBy: "",
shift: "DAY",
status: "",
commodity:"",
erpDocRefNo:"",
docRefDate:"",
docRefNo:"",
srNo:"",
nocNo:"",
gateInId:"",
};

const initialNocDtl = {
  companyId: companyid, // String
  branchId: branchId, // String
  nocTransId: "", // String
  nocNo: "", // String
  approvedBy: "", // String
  boeNo: "", // String

  CfbondDetailDate: null, // Date (use null or a Date object if you prefer)
  nocPackages: null, // BigDecimal (use null or a number)
  cifValue: null, // BigDecimal (use null or a number)
  cargoDuty: null, // BigDecimal (use null or a number)
  insuranceValue: null, // BigDecimal (use null or a number)

  typeOfPackage: "", // String
  commodityDescription: "", // String
  status: "", // String
  createdBy: "", // String
  createdDate: null, // Date (use null or a Date object if you prefer)
  editedBy: "", // String
  editedDate: null, // Date (use null or a Date object if you prefer)
  approvedBy: "", // String
  approvedDate: null, // Date (use null or a Date object if you prefer)
};

const [gateIn, setGateIn] = useState(initialGateIn);

const [gateInStatus, setGateInStatus] = useState('');
const [isModalOpenForGateSearch, setisModalOpenForGateSearch] = useState(false);
const openGateSearchModal = () => {
    setisModalOpenForGateSearch(true);
    searchGate('');
}

const closeGateSearchModal = () => {
    setisModalOpenForGateSearch(false);
    setGateSearchId('');
    setCHASearchedData([]);
}

const [gateSearchId, setGateSearchId] = useState('');
// const [cSearchedData, setCHASearchedData] = useState([]);

const searchGate = (id) => {
    setLoading(true);
    axios.get(`${ipaddress}api/cfbondnoc/searchCragoGateIn?companyId=${companyid}&branchId=${branchId}&search=${id}`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
        .then((response) => {
            setCHASearchedData(response.data);
           
            setLoading(false);
            setCurrentPage(1);

            console.log("response.data",response.data);
        })
        .catch((error) => {
            setLoading(false);
        })
}


const clearGateSearch = () => {
    setGateSearchId('');
    searchGate('');
}
// const [chaName, setChaName] = useState('');

const selectGateSearchRadio = (gateInId) => {
    closeGateSearchModal();
    axios.get(`${ipaddress}api/cfbondnoc/getDataBYGateInId?companyId=${companyid}&branchId=${branchId}&gateInId=${gateInId}`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
        .then((response) => {
          setNocFlag('edit');
            const data = response.data;
            const firstItem = response.data[0]; // Get the first item from the list
            console.log("getDataByPartyIdAndGstNo",data);

            setGateIn(firstItem);


            setDisplayItems(response.data);
            setRowData(data);

            setSelectedItems(data);

            // Update rowData with the response data
            const updatedRowData = data.map((item, index) => ({
                srNo: item.srNo || '',
                erpDocRefNo: item.erpDocRefNo || '',
                docRefNo: item.docRefNo || '',
                lineNo: item.lineNo || '',
                cha: item.cha || '',
                // gateInPackages: item.qtyTakenIn || '',
                gateInPackages: item.gateInPackages || '',
                qtyTakenIn: item.qtyTakenIn || '',
                weightTakenIn: item.weightTakenIn || '',
                actualNoOfPackages: item.actualNoOfPackages || '',
          
                commodityDescription: item.commodityDescription || '',
                commodity: item.commodity || '',
                grossWeight: item.grossWeight || '',
                typeOfPackage: item.typeOfPackage || '',
                approvedBy: item.commodity || '',
                docRefDate:item.docRefDate || '',
                nocValidityDate: item.nocValidityDate || '',
                boeDate: item.boeDate || '',
                boeNo: item.boeNo || '',
                chaname:item.editedBy || '',
                erpDocRefNo: item.erpDocRefNo || '',
                nocNo: item.nocNo || '',
             importerName:item.importerName || '',
            }));



            setGateInStatus(data.status);
            console.log("setGateInStatus", gateInStatus);
            setGateIn(data[0]);

            console.log("setGateIn_______________________",data[0]);
            setRows(updatedRowData);

            console.log("updatedRowData_________________",rowData);
           setChaName(response.data.editedBy);        
        })
        .catch((error) => {

        })
}



useEffect(() => {
  if(acttab == "P00249")
  {
    if (listOfData.nocTransId && listOfData.nocNo ) {
      fetchData(companyid,branchId, listOfData.nocTransId, listOfData.nocNo);
    }
    if(flag)
    {
     handleClear();
    }
   }
}, [listOfData.nocTransId,listOfData.nocNo,acttab]);



















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
      axios.get(`${ipaddress}IsoContainer/search?companyId=${companyid}&partyName=${id}`, {
          headers: {
              Authorization: `Bearer ${jwtToken}`
          }
      })
          .then((response) => {
              setCHASearchedData(response.data);
              setLoading(false);
              setCurrentPage(1);

              console.log("response.data",response.data);
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

  const selectIGMSearchRadio = (partyId, isoCode, isoName, vesselName, shippingLineName, shippingLineCode, shippingAgentName, shippingAgentCode) => {
      closeIGMSearchModal();
      axios.get(`${ipaddress}IsoContainer/getIsoByID?companyId=${companyid}&isoCode=${isoCode}`, {
          headers: {
              Authorization: `Bearer ${jwtToken}`
          }
      })
          .then((response) => {
              const data = response.data;

              console.log("getDataByPartyIdAndGstNo",data);

              setGateIn((gateIn)=>({
...gateIn,
isoCode:response.data.isoCode,
containerSize:response.data.containerSize,
containerType:response.data.containerType,
tareWeight:response.data.tareWeight,
              }));
    
             setChaName(response.data.partyName); 
                setNocErrors((prevErrors) => ({
                  ...prevErrors,
                  cha: "",
                }));
         
          })
          .catch((error) => {

          })
  }


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



 
  const [nocDtl, setNocDtl] = useState(initialNocDtl);
  const handleNocChange = (e) => {
    const { name, value } = e.target;


    setGateIn((prevNOC) => {
      const updatedNOC = {
        ...prevNOC,
        [name]: value,
      };

      if (name === 'containerNo') 
      {
        if (value && noCheckDigit === 'N') {
          if (!handleContainerNoValidation1(value)) 
          {
            setNocErrors((prevErrors) => ({
              ...prevErrors,
              [name]: "Invalid Container No.",
            }));
  
          }
          else {
            setNocErrors((prevErrors) => ({
              ...prevErrors,
              [name]: "",
            }));
          }
        }
        else {
          setNocErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
          }));
        }
      }
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

  const handleNocTransDate = (date) => {
    setGateIn((prevNoc) => ({
      ...prevNoc,
      inGateInDate: date,
    }));
  };


  const [nocErrors, setNocErrors] = useState({
    transporterName: "",
    vehicleNo: "",
    shift: "",
    gateInType: "",
    containerNo:"",
})
const [noCheckDigit, setNoCheckDigit] = useState('N');
const handleContainerNoValidation1 = (containerNo) => {
  const containerNoUpper = containerNo.toUpperCase();
  console.log(containerNoUpper);

  let s = 0;
  let x = 0;

  // Char values mapping
  const charVal = {
      A: "10",
      B: "12",
      C: "13",
      D: "14",
      E: "15",
      F: "16",
      G: "17",
      H: "18",
      I: "19",
      J: "20",
      K: "21",
      L: "23",
      M: "24",
      N: "25",
      O: "26",
      P: "27",
      Q: "28",
      R: "29",
      S: "30",
      T: "31",
      U: "32",
      V: "34",
      W: "35",
      X: "36",
      Y: "37",
      Z: "38",
  };

  const len = containerNoUpper.length;

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

      if (
          x === parseInt(containerNoUpper.charAt(len - 1)) ||
          (x === 10 && containerNoUpper.charAt(len - 1) === "0")
      ) {
          // Valid container number
          return true;
      } else {
          // Invalid container number
          return false;
      }
  }
};


  const handleSave = () => {
    // Save the data (e.g., send it to a server)
    console.log("Data saved:", gateIn);
    setLoading(true);
    let errors = {};
const validateField = (fieldId, fieldValue, errorMessage) => 
{
    const element = document.getElementById(fieldId);
    if (element) {
      if (!fieldValue) {
        errors[fieldId] = errorMessage;
        element.classList.add("error-border");
      } else {
        element.classList.remove("error-border");
      }
    } else {
      console.error(`Element with ID ${fieldId} not found`);
    }
  };

  validateField("transporterName", gateIn.transporterName, "Transporter Name is required.");
  validateField("vehicleNo", gateIn.vehicleNo, "Vehicle no is required.");
  // validateField("shift", gateIn.shift, "Shift is required.");
  // validateField("gateInType", gateIn.gateInType, "Gate in type is required.");

  if (Object.keys(errors).length > 0) {
      setNocErrors(errors);
      setLoading(false);
      toast.error("Please fill in the required fields.", {
          autoClose: 1000
      })
      return;
  }



  if (gateIn.containerNo && gateIn.containerNo.trim() !== '') {
    if (!handleContainerNoValidation1(gateIn.containerNo) && noCheckDigit === 'N') {
        setLoading(false);
        toast.error("Please correct the errors in the container no.", {
            autoClose: 1000
        });
        return;
    }  
}



  if (!validateInputs()) 
  {
    setLoading(false);
    toast.error("Please correct the errors in the table.", {
        autoClose: 1000
    });
    return;
}
// const isValid = validateInputs(rowData);

// if ( !isValid) {
//   setLoading(false);
//       toast.error("Please correct the errors in the table.", {
//           autoClose: 1000
//       });
//       return;
// }

// setLoading(false);
console.log("Selected items:", rowData);
 
if (!gateIn.status === "A")
{
  if (rowData.length === 0) {
    setLoading(false);
    toast.info("Please add details.", {
        autoClose: 1000
    });
    return;
  }
}
  const requestBody = 
  {
    gateIn: {
      ...gateIn,
    },

rowData:{
  ...rows,
}
  };


  console.log("reajhgjhsgjhsajh_______________________",requestBody);

    axios.post(`${ipaddress}api/cfbondnoc/saveGateInAndUpdateCfBondNocAndDtl?cid=${companyid}&bid=${branchId}&user=${userId}&flag=${nocFlag}`,requestBody, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
        .then((response) => {
          const data =response.data; 
          const firstItem = response.data[0]; // Get the first item from the list
setGateIn(firstItem); // Set the first item

// if (data && data.length > 0) 
// {
//   const updatedRowData = rowData.map((item, index) => {
//     const newItem = data.find(d => d.srNo === item.srNo) || {};
//     return {
//       ...item,
//       ...newItem,
//       srNo: newItem.srNo || item.srNo, // Ensure srNo is updated
//       // commodity:newItem.commodity  || item.commodity, // Ensure srNo is updated,
//       approvedBy:newItem.commodity  || item.commodity, // Ensure srNo is updated,
//     };
//   });
//   setGateIn(data[0]); // Set the first item to gateIn
//   setRowData(updatedRowData);
// }

// const updatedRowData = data.map((item, index) => ({
//   srNo: item.srNo || '',
//   nocTransId: item.erpDocRefNo || '',
//   nocNo: item.docRefNo || '',
//   docRefNo:item.docRefNo || '',
//   igmLineNo: item.lineNo || '',
//   nocTransDate:item.docRefDate || '',
//   cha: item.cha || '',
//   gateInPackages: item.qtyTakenIn || '',
//   qtyTakenIn: item.qtyTakenIn || '',
//   weightTakenIn: item.weightTakenIn || '',
//   nocPackages: item.actualNoOfPackages || '',
//   actualNoOfPackages: item.actualNoOfPackages || '',
//   commodityDescription: item.commodityDescription || '',
//   commodity: item.commodity || '',
//   grossWeight: item.grossWeight || '',
//   typeOfPackage: item.typeOfPackage || '',
//   approvedBy: item.commodity || '',
//   boeDate: item.boeDate || '',
//   boeNo: item.boeNo || '',
//   erpDocRefNo: item.erpDocRefNo || '',
//   igmNo: item.nocNo || '',
// }));

const updatedRowData = data.map((item, index) => ({
  srNo: item.srNo || '',
  erpDocRefNo: item.erpDocRefNo || '',
  docRefNo: item.docRefNo || '',
  lineNo: item.lineNo || '',
  cha: item.cha || '',
  gateInPackages: item.qtyTakenIn || '',
  qtyTakenIn: item.qtyTakenIn || '',
  weightTakenIn: item.weightTakenIn || '',
  actualNoOfPackages: item.actualNoOfPackages || '',

  commodityDescription: item.commodityDescription || '',
  commodity: item.commodity || '',
  grossWeight: item.grossWeight || '',
  typeOfPackage: item.typeOfPackage || '',
  approvedBy: item.commodity || '',
  docRefDate:item.docRefDate || '',
  nocValidityDate: item.nocValidityDate || '',
  boeDate: item.boeDate || '',
  boeNo: item.boeNo || '',
  // chaname:item.chaname || '',
  erpDocRefNo: item.erpDocRefNo || '',
  nocNo: item.nocNo || '',
importerName:item.importerName || '',
}));

setGateIn(data[0]); // Set the first item to gateIn
setRows(updatedRowData);

console.log("Data save successfully!! Response ",response.data);
            toast.success("Data save successfully!!", {
                autoClose: 800
            })
            onRequest();
            setLoading(false);
            setNocFlag('edit');
            // set('add')
        })
        .catch((error) => {
           
            toast.error(error.response.data, {
                autoClose: 800
            })
        }).finally(()=>{
          setLoading(false);
        })
  };

  const handleClear = () => {
    // Reset the form fields
    setRows([]);
    setErrorsTable('');
    setGateIn({
        companyId:companyid,
        branchId: branchId,
        profitcentreId: "N00003",
        containerNo:"",
        containerSize:"",
        containerType:"",
        isoCode:"",
        vehicleNo:"",
        gateInType: "BON",
        profitcentreId:"",
        transporterStatus:"P",
        transporterName:"",
        grossWeight:"",
        inGateInDate:new Date(),
        createdBy: "",
        createdDate: "",
        editedBy: "",
        editedDate: "",
        approvedBy: "",
        shift: "Day",
        status: "",
        gateInId:""
    });


    document.getElementById("transporterName").classList.remove("error-border");
    document.getElementById("vehicleNo").classList.remove("error-border");
    // document.getElementById("shift").classList.remove("error-border");
    // document.getElementById("gateInType").classList.remove("error-border");
setNocErrors('');
setNocFlag('add');
setChaName('');
setSelectedItems([]);
setDisplayItems([]);
  };

  const [modal, setModal] = useState(false);

    const defaultOption = { value: 'N00003', label: 'NOC BOND' };
    
      const handleChangeProfitCenter = (selectedOption) => {
        // Update the state or handle the change as needed
        setGateIn(prevState => ({
          ...prevState,
          profitcentreId: selectedOption ? selectedOption.value : ''
        }));
    }
   
    const [isModalOpenForNocTransIdSearch, setisModalOpenForNocTransIdSearch] = useState(false);
    const openNocTransIdSearchModal = () => {
        let errors = {}; // Initialize errors object
      
        const validateField = (fieldId, fieldValue, errorMessage) => {
          const element = document.getElementById(fieldId);
          if (element) {
            if (!fieldValue || fieldValue.trim() === '') {
              errors[fieldId] = errorMessage;
              element.classList.add("error-border");
            } else {
              errors[fieldId] = ''; // Clear the error if the field is valid
              element.classList.remove("error-border");
            }
          } else {
            console.error(`Element with ID ${fieldId} not found`);
          }
        };
      
        // Validate fields
        validateField("transporterName", gateIn.transporterName, "Transporter Name is required.");
        validateField("vehicleNo", gateIn.vehicleNo, "Vehicle no is required.");
        validateField("gateInType", gateIn.gateInType, "Gate In Type is required.");
      
        console.log('Errors after validation:', errors);
      
        // If there are errors, update state and show toast
        if (Object.keys(errors).some(key => errors[key] !== '')) {
          setNocErrors(errors);
          setLoading(false);
          toast.error("Please fill in the required fields.", { autoClose: 1000 });
          return; // Exit early if there are validation errors
        }
      
        // If no errors, open the modal and perform the search
        setisModalOpenForNocTransIdSearch(true);
        searchNocTrasnsId('');
      };
      
      
      

const closeNocTrasnsIdSearchModal = () => {
  setisModalOpenForNocTransIdSearch(false);
    setNocTransIdSearchId('');
    // setSelectedItems([]);
    setCHASearchedData([]);
}

const [nocTansIdSearchId, setNocTransIdSearchId] = useState('');
const searchNocTrasnsId = (id) => {
    setLoading(true);
    axios.get(`${ipaddress}api/cfbondnoc/getCfbondnocDataForCfBondGateIn?companyId=${companyid}&branchId=${branchId}&partyName=${id}`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
        .then((response) => {
            setCHASearchedData(response.data);
            setLoading(false);
            setCurrentPage(1);

            console.log("response.data",response.data);
        })
        .catch((error) => {
            setLoading(false);
        })
}


const clearSearchNocTransId = () => {
  setNocTransIdSearchId('');
  searchNocTrasnsId('');
}

const [selectedItems, setSelectedItems] = useState([]);
const [displayItems, setDisplayItems] = useState([]);
const toggleSelectItem = (item) => {
    setSelectedItems(prevSelectedItems => {
        const isSelected = prevSelectedItems.some(selectedItem => selectedItem.nocTransId === item.nocTransId && selectedItem.approvedBy === item.approvedBy);
        if (isSelected) {
            return prevSelectedItems.filter(selectedItem => !(selectedItem.nocTransId === item.nocTransId && selectedItem.approvedBy === item.approvedBy));
        } else {
            return [...prevSelectedItems, item];
        }
    });
};

const [inputValues, setInputValues] = useState([]);
const [errorsTable, setErrorsTable] = useState({});

const [rowData, setRowData] = useState(
  selectedItems.map(() => ({
    boeDate: "",
    boeNo: "",
    cha: "",
    commodityDescription: "",
    approvedBy: "",
    gateInPackages: "",
    nocPackages: "",
    grossWeight:"",
    nocNo:"",
    nocTransId:"",
    nocTransDate:"",
    nocValidityDate:"",
    igmNo:"",
    igmLineNo:"",
qtyTakenIn:"",
weightTakenIn:"",
cfBondDtlId:"",
srNo:"",
erpDocRefNo:"",
grossWeight:"",
typeOfPackage:"",
actualNoOfPackages:"",
approvedBy:"",
  }))
);











const handleSubmitSelectedItems = () => {
  setDisplayItems(selectedItems);
  setRowData(selectedItems);
  setisModalOpenForNocTransIdSearch(false);
  console.log("Selected items:", selectedItems);
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

const handleInputChangeTable = (index, field, value,val,val1) => {
  let newValue =value;

  if(['weightTakenIn'].includes(field))
  {
    newValue =handleInputChangeNew(value,val,val1)
  }

  setRows(prevValues => {
      const updatedValues = [...prevValues];
      updatedValues[index] = { ...updatedValues[index], [field]: newValue };
      return updatedValues;
  });
  setErrorsTable(prevErrors => {
      const updatedErrors = { ...prevErrors };
      if (newValue) {
          delete updatedErrors[index];
      }
      return updatedErrors;
  });
};


const validateInputs = () => {
const newErrors = {};


rows.forEach((item, index) => 
{
    const qtyTakenIn = parseFloat(item.qtyTakenIn) || parseFloat(item.gateInPackages) || 0;
    const nocPackages = parseFloat(item.nocPackages) || parseFloat(item.actualNoOfPackages) || 0;

    const qtyTakenInList =  parseFloat(item.gateInPackages) || 0;
    const qtyTakenInInput = parseFloat(item.qtyTakenIn) || 0;

    const actualNoOfPackages = parseFloat(item.actualNoOfPackages) || 0;
    const commodity = item.commodity?.trim(); // Check if commodity exists and trim any spaces
    const boeNo = item.boeNo?.trim(); // Check if boeNo exists and trim any spaces

    console.log("qtyTakenIn________________________________",qtyTakenIn);

    console.log("nocPackages________________________________",nocPackages);

    if (isNaN(qtyTakenIn) || qtyTakenIn <= 0) {
        newErrors[index] = "Qty Taken In* is required and must be greater than 0.";
    } 
     
    // else if (qtyTakenIn > nocPackages )
    else if (qtyTakenInInput > ((nocPackages) - (qtyTakenInList)) ) 
    {
        newErrors[index] = `Qty Taken In cannot be greater than ${(nocPackages) - (qtyTakenInList)} No Of Pack.`;
    }

    // // Validate commodity
    // if (!commodity) {
    //   newErrors[index] = "Commodity* is required and cannot be empty.";
    // }

    // // Validate boeNo
    // if (!boeNo) {
    //   newErrors[index] = "BOE No* is required and cannot be empty.";
    // }
    if (!commodity) {
      newErrors[`commodityError_${index}`] = "Commodity* is required and cannot be empty.";
    }

    // Validate boeNo
    if (!boeNo) {
      newErrors[`boeNoError_${index}`] = "BOE No* is required and cannot be empty.";
    }

});

setErrorsTable(newErrors);
return Object.keys(newErrors).length === 0;
};

const handleQtyTakenInChange = (index, qtyTakenIn,nocPackage,gateInPackage,grossWeigh) => {
  const qtyTaken = parseFloat(qtyTakenIn) || 0;
  const nocPackages = parseFloat(nocPackage) || 0;
  const gateInPackages = parseFloat(gateInPackage) || 0;
  const grossWeight = parseFloat(grossWeigh) || 0;
  // const grossWeight = parseFloat(rowData[index]?.grossWeight) || 0;
  // const nocPackages = parseFloat(rowData[index]?.nocPackages) || 0;
  // const gateInPackages = parseFloat(rowData[index]?.gateInPackages) || 0;

  console.log(qtyTaken);
  console.log(grossWeight);
  console.log(nocPackages);
  console.log(gateInPackages);
  const weightPerPackage = nocPackages > 0 ? grossWeight / nocPackages : 0;



  console.log(weightPerPackage);
  // Calculate weight taken in
  const weightTakenIn = qtyTaken * weightPerPackage;

  console.log(weightTakenIn);

  const updatedRows = [...rows];

    updatedRows[index].weightTakenIn = weightTakenIn.toFixed(2);
   

  setRows(updatedRows);
  // Update row data
  handleInputChangeTable(index, "qtyTakenIn", qtyTakenIn);
  handleInputChangeTable(index, "weightTakenIn", weightTakenIn.toFixed(2)); // Save with two decimal places

  // Validate the input
  validateQtyTakenIn(index, qtyTakenIn, nocPackages, gateInPackages);
};

const validateQtyTakenIn = (index, qtyTakenIn, nocPackages, gateInPackages) => {
  console.log("Validating:", qtyTakenIn, nocPackages, gateInPackages); // Debugging
  const qtyTaken = qtyTakenIn ? parseFloat(qtyTakenIn) : 0;
  const nocPackagesVal =nocPackages ? parseFloat(nocPackages) : 0;
  const gateInPackagesVal = gateInPackages ? parseFloat(gateInPackages) : 0;

const addition = nocPackagesVal - gateInPackagesVal;

  if (qtyTaken > (nocPackagesVal - gateInPackagesVal)) {
    setErrorsTable(prevErrors => ({
      ...prevErrors,
      [index]: `Qty Taken In cannot be greater than ${addition}  `
    }));
  } 
  else
   {
    setErrorsTable(prevErrors => {
      const newErrors = { ...prevErrors };
      delete newErrors[index];
      return newErrors;
    });
  }
  console.log("Errors Table:", errorsTable); // Debugging
};


const handlePrint = async (type) => {
  setLoading(true);
      try {
          const response = await axios.get(`${ipaddress}api/cfbondnoc/printOfGateInCargoDetails?companyId=${companyid}&branchId=${branchId}&uname=${username}&type=${type}&cname=${companyname}&bname=${branchname}&gateInId=${gateIn.gateInId}&erpDocRefNo=${gateIn.erpDocRefNo}`,
          {
            headers:{
              Authorization: `Bearer ${jwtToken}`
            }
          });
  
          console.log("Response Data");
          console.log(response.data);
  
          if (type === 'PDF') 
          {

              const pdfBase64 = response.data;
  
              const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
  
              const blobUrl = URL.createObjectURL(pdfBlob);
  
              const downloadLink = document.createElement('a');
              downloadLink.href = blobUrl;
              downloadLink.download = 'SPACE CERTIFICATE';
              downloadLink.style.display = 'none';
              document.body.appendChild(downloadLink);
              downloadLink.click();
              document.body.removeChild(downloadLink);
              window.URL.revokeObjectURL(blobUrl);
  
              toast.success("Downloading PDF!", {
                position: 'top-center',
                  autoClose: 800,
              });
          } 
          else if (type === 'PRINT')
          {
              const pdfBase64 = response.data;
  
              const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
  
              const blobUrl = URL.createObjectURL(pdfBlob);
  
              window.open(blobUrl, '_blank');
          } 
          else
          {
              throw new Error('Invalid print type');
          }
      }
       catch (error) 
      {
          console.error('Error in handlePrint:', error.message);
       
      }finally
      {
        setLoading(false);
      }
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const shiftOptions = [
    { value: 'DAY', label: 'DAY' },
    { value: 'NIGHT', label: 'NIGHT' },
  ];
  const transport = [
    { value: 'P', label: 'Private' },
    { value: 'C', label: 'Contractor' },
  ];


  const [isoData, setISOData] = useState([]);
  const [isoId, setISOId] = useState('');
  const [isoName, setIsoName] = useState('');
  const handlePortChange = async (selectedOption, { action }) => {

    if (action === 'clear') {

        console.log("respone datacagahgdhsagdhs",selectedOption);
        setIsoName('');
        setISOId('');
        setGateIn((pre)=>({
            ...pre,
            isoCode:'',
            containerSize:'',
            containerType: '',
            tareWeight:'',

                            }));
        document.getElementById('cha').classList.remove('error-border');
        setNocErrors((prevErrors) => ({
            ...prevErrors,
            ['cha']: "",
        }));
    }
    else {
        console.log("respone datacagahgdhsagdhs",selectedOption);

        setGateIn((prev) => ({
          ...prev,
          isoCode: selectedOption ? selectedOption.value : '',
          isoCode: selectedOption ? selectedOption.label : '',
        }));
        
        setIsoName(selectedOption ? selectedOption.value : '');
        setISOId(selectedOption ? selectedOption.value : '');
        setGateIn((pre)=>({
...pre,
isoCode:selectedOption ? selectedOption.value : '',
containerSize:selectedOption ? selectedOption.size : '',
containerType:selectedOption ? selectedOption.type : '',
tareWeight:selectedOption ? selectedOption.weight : '',

        }));

        document.getElementById('iso').classList.remove('error-border');
        setNocErrors((prevErrors) => ({
            ...prevErrors,
            ['iso']: "",
        }));
    }
};

const getIsoData = (val) => {
    if (val === '') {
        setISOData([]);
        return;
    }

    axios.get(`${ipaddress}IsoContainer/search?companyId=${companyid}&value=${val}`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
        .then((response) => {
            const data = response.data;

            console.log("response.data",data);
            const portOptions = data.map(port => ({
                value: port.isoCode,
                label: port.isoCode,
                type:port.containerType,
                size:port.containerSize,
                weight:port.tareWeight,


            }))
            setISOData(portOptions);
        })
        .catch((error) => {

        })
}



const initialRow = {
  srNo: 1,
  companyId: companyid,
  branchId: branchId,
  nocNo: "",
  erpDocRefNo: "",
  boeNo: "",
  srNo: "",
  boeDate: "",
  commodity: "",
  commodityDescription: "",

  actualNoOfPackages:"",
gateInPackages:"",
qtyTakenIn:"",
weightTakenIn:"",
lineNo:"",
igmNo:"",
nocTransDate:"",
 chaname:"",
 typeOfPackage:"",
importerName:"",
boeDate:"",
erpDocRefNo:"",
docRefNo:"",
docRefDate:"",
};

const [rows, setRows] = useState([initialRow]);
useEffect(() => {
  if (rows.length === 0) {
    setRows([initialRow]); // Initialize with one initial row
  }
}, [rows]);

const handleAddRow = () => {
  const firstRow = rows[0];
  // const validationErrors = validateRow(firstRow);
  // if (Object.keys(validationErrors).length > 0) {
  //   setErrors(validationErrors);
  //   return;
  // }

  const newRow = { ...initialRow, srNo: rows.length + 1 };
  setRows([...rows, newRow]); // Append the new row to the end of the array
};

const handleDeleteRow = (index) => {
  // Show confirmation dialog
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Remove it!",
  }).then((result) => {
    if (result.isConfirmed) {
      // If user confirms, remove the row
      const updatedRows = [...rows];
      updatedRows.splice(index, 1);
      setRows(updatedRows);
      Swal.fire("Removed!", "Your row has been removed.", "success");
    }
  });
};


const [exbondBeData, setExbondbeData] = useState([]);
const [exbondBeNo, setExbondBeNo] = useState("");
const [noctid, setNocTid] = useState("");
const [exbondBeNoname, setExbondBeNoName] = useState("");

const handleExbondBeChange = (index, selectedOption) => {
  const updatedRows = [...rows];

  updatedRows[index].boeNo = selectedOption ? selectedOption.value : '';

  // Clear error if boeNo is corrected
  const updatedErrors = { ...errorsTable };
  if (selectedOption && updatedErrors[`boeNoError_${index}`]) {
    delete updatedErrors[`boeNoError_${index}`];
  }
  setErrorsTable(updatedErrors);

  if (selectedOption) {
    const value = selectedOption ? selectedOption.value : "";
    const tid = selectedOption ? selectedOption.nocT : "";
    const label = selectedOption ? selectedOption.label : "";
    updatedRows[index].boeNo = selectedOption.value;
    updatedRows[index].boeNo = selectedOption.label;
    updatedRows[index].nocNo = selectedOption.igm;
    updatedRows[index].docRefNo = selectedOption.noc;
    updatedRows[index].erpDocRefNo = selectedOption.nocT;
    updatedRows[index].nocTransDate = selectedOption.nocTD;
    updatedRows[index].cha = selectedOption.cha;
    updatedRows[index].igmNo = selectedOption.igm;
    updatedRows[index].lineNo = selectedOption.igmline;
    updatedRows[index].chaname = selectedOption.chaname;
    updatedRows[index].importerName = selectedOption.impname;
    updatedRows[index].boeDate = selectedOption.boeD;
    updatedRows[index].docRefDate = selectedOption.docRefd;




    updatedRows[index].commodity = "";
  updatedRows[index].commodityDescription = "";
  updatedRows[index].actualNoOfPackages = "";
  updatedRows[index].gateInPackages = "";
  updatedRows[index].grossWeight = "";
  updatedRows[index].typeOfPackage = "";

    setExbondBeNo(value);
    setNocTid(tid);
    setExbondCommodityData("");
    getExbondCargoData(value);

    console.log("selectedOption.value", value);
    console.log("setExbondBeNo", tid);
  } else {
    updatedRows[index].boeNo = "";
    updatedRows[index].boeNo = "";
    updatedRows[index].nocNo = "";
    updatedRows[index].docRefNo = "";
    updatedRows[index].erpDocRefNo = "";
    updatedRows[index].nocTransDate = "";
    updatedRows[index].cha = "";
    updatedRows[index].igmNo = "";
    updatedRows[index].lineNo ="";
    updatedRows[index].chaname ="";
    updatedRows[index].importerName ="";
    updatedRows[index].boeDate = "";
    updatedRows[index].docRefDate = "";
    updatedRows[index].commodity = "";
    updatedRows[index].commodityDescription = "";
    updatedRows[index].actualNoOfPackages = "";
    updatedRows[index].gateInPackages = "";
    updatedRows[index].grossWeight = "";
    updatedRows[index].typeOfPackage = "";
    setExbondBeNo("");

    // setExbondCommodityData("");
    // getExbondCargoData("");
  }

  setRows(updatedRows);
};

const getExbondBeData = (val) => {
  if (val === "") {
    setExbondbeData([]);
    return;
  }

  axios
    .get(
      `${ipaddress}api/cfbondnoc/getAllBoeNoFromNoc?companyId=${companyid}&branchId=${branchId}&value=${val}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    )
    .then((response) => {
      const data = response.data;

      console.log("response.data", data);
      const portOptions = data.map((port) => ({
        value: port[0],
        label: port[0],
        noc: port[1],
        nocT: port[2],
        nocTD: port[3],
        cha: port[4],
        chaname: port[5],
        chan:port[5],
        igm: port[6],
        igmline:port[7],
impname:port[8],
boeD:port[9],
igm:port[10],
docRefd:port[11],

      }));
      setExbondbeData(portOptions);
    })
    .catch((error) => {});
};

const [exbondCommodityData, setExbondCommodityData] = useState([]);
const handleExbondCargoDataChange = (index, selectedOption) => {
  const updatedRows = [...rows];
  updatedRows[index].commodity = selectedOption ? selectedOption.value : '';

  // Clear error if commodity is corrected
  const updatedErrors = { ...errorsTable };
  if (selectedOption && updatedErrors[`commodityError_${index}`]) {
    delete updatedErrors[`commodityError_${index}`];
  }

  const isAlreadyPresent = updatedRows.some((row, i) => 
  i !== index && row.commodity === selectedOption?.value
);

if (isAlreadyPresent) {
  toast.error("Commodity already selected. Please choose another.",{
    position:'top-center',
    autoClose:900
  });
  
  // Clear the related fields if the value is already present
  updatedRows[index].commodity = "";
  updatedRows[index].commodityDescription = "";
  updatedRows[index].actualNoOfPackages = "";
  updatedRows[index].gateInPackages = "";
  updatedRows[index].grossWeight = "";
  updatedRows[index].typeOfPackage = "";
}

 else if (selectedOption) 
  {
    const value = selectedOption ? selectedOption.value : "";
    const label = selectedOption ? selectedOption.label : "";
    updatedRows[index].commodity = selectedOption.value;
    updatedRows[index].commodityDescription = selectedOption.label;

    updatedRows[index].actualNoOfPackages = selectedOption.nocP;
    updatedRows[index].gateInPackages = selectedOption.gateInp;
    updatedRows[index].grossWeight = selectedOption.gw;
    updatedRows[index].typeOfPackage = selectedOption.typeOfPkg;

    console.log("selectedOption.value", value);
    console.log("setExbondBeNo", value);
  } else {
    updatedRows[index].commodity = "";
    updatedRows[index].commodityDescription = "";
    updatedRows[index].actualNoOfPackages = "";
    updatedRows[index].gateInPackages = "";
    updatedRows[index].grossWeight = "";
    updatedRows[index].typeOfPackage = "";
    updatedRows[index].boeNo = "";
    updatedRows[index].boeNo = "";
    updatedRows[index].nocNo = "";
    updatedRows[index].docRefNo = "";
    updatedRows[index].erpDocRefNo = "";
    updatedRows[index].nocTransDate = "";
    updatedRows[index].cha = "";
    updatedRows[index].igmNo = "";
    updatedRows[index].lineNo ="";
    updatedRows[index].chaname ="";
    updatedRows[index].importerName ="";
    updatedRows[index].boeDate = "";
    updatedRows[index].docRefDate = "";


  }
  setErrorsTable(updatedErrors);
  setRows(updatedRows);
};

const getExbondCargoData = (val) => {
  if (val === "") {
    setExbondbeData([]);
    return;
  }

  axios
    .get(
      `${ipaddress}api/cfbondnoc/getAllNocDtl?companyId=${companyid}&branchId=${branchId}&boeNo=${exbondBeNo}&nocTransId=${noctid}&value=${val}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    )
    .then((response) => {
      const data = response.data;

      console.log("response.data", data);
      const portOptions = data.map((port) => ({
        value: port[0],
        label: port[1],
        nocP: port[2],
        gateInp: port[3],

        gw: port[5],
        typeOfPkg: port[7],
       
      }));
      setExbondCommodityData(portOptions);
    })
    .catch((error) => {});
};

const fetchData = async (companyid,branchId,nocTransId,nocNo) => {
  try {
    const response = await fetch(`${ipaddress}api/cfbondnoc/getForMainSearchGateInBond?companyId=${companyid}&branchId=${branchId}&nocTransId=${nocTransId}&nocNo=${nocNo}`,{
      headers: {
        Authorization: `Bearer ${jwtToken}`
    }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const updatedRowData = data.map((item, index) => ({
      srNo: item.srNo || '',
      erpDocRefNo: item.nocTransId || '',
      docRefNo: item.nocNo || '',
      lineNo: item.approvedBy || '',
      cha: item.createdBy || '',
      gateInPackages: item.gateInPackages || '',
      qtyTakenIn: item.qtyTakenIn || '',
      weightTakenIn: item.weightTakenIn || '',
      actualNoOfPackages: item.nocPackages || '',

      commodityDescription: item.commodityDescription || '',
      commodity: item.cfBondDtlId || '',
      grossWeight: item.grossWeight || '',
      typeOfPackage: item.typeOfPackage || '',
      approvedBy: item.cfBondDtlId || '',
      docRefDate:item.createdDate || '',
      nocValidityDate: item.nocValidityDate || '',
      boeDate: item.boeDate || '',
      boeNo: item.boeNo || '',
      chaname:item.branchId || '',
      erpDocRefNo: item.nocTransId || '',
      nocNo: item.editedBy || '',
   importerName:item.companyId || '',
   companyId:companyid,
   branchId:branchId,
  }));


  setRows(updatedRowData);

    console.log("cfbodnNocDtl records____________________________________ ",data);
  } catch (error) {
    // setError(error);
  } finally {
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
        {/* <Card>
          <CardBody> */}
        <div>
          <Modal Modal isOpen={isModalOpenForGateSearch} onClose={closeGateSearchModal} toggle={closeGateSearchModal} style={{ maxWidth: '1200px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>
                <ModalHeader toggle={closeGateSearchModal} style={{
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
                    /> Search Gate In </h5>

                </ModalHeader>
                <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Search by Gate In Id / Shift / Vehicle No / Importer Name / Transporter Status / Transporter Name
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="igmTransId"
                                    maxLength={15}
                                    name='igmTransId'
                                    value={gateSearchId}
                                    onChange={(e) => setGateSearchId(e.target.value)}
                                />

                            </FormGroup>
                        </Col>
                        <Col md={4} style={{ marginTop: 24 }}>
                            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={() => searchGate(gateSearchId)}
                            >
                                <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                Search
                            </button>
                            <button
                                className="btn btn-outline-danger btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={clearGateSearch}
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
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Gate In No</th>
                                    <th scope="col">Gate In Date</th>
                                    <th scope="col">Transporter Name </th>   
                                    <th scope="col">Driver</th>
                                    <th scope="col">Vehicle No</th>
                                    <th scope="col">Status </th>  
                                    <th scope="col">IGM No</th>
                                    <th scope="col">IGM Line No </th>   
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
                                            <input type="radio" name="radioGroup" onChange={() => selectGateSearchRadio(item.gateInId)} value={item[0]} />
                                        </td>
                                        <td>{item.gateInId}</td>
                                        <td>{item.inGateInDate ? format(new Date(item.inGateInDate), 'dd/MM/yyyy HH:mm') : 'N/A'}</td>  
                                       
                                        <td>{item.transporterName}</td>
                                        <td>{item.driver}</td>
                                        <td>{item.vehicleNo}</td>
                                        <td>{item.status ==="A" ? "Approved" :''}</td>
                                        <td>{item.igmNo}</td>
                                        <td>{item.lineNo}</td>
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
          {/* <hr/> */}
          <Row>
          {/* <Col md={2}>
  <FormGroup>
    <label className="forlabel bold-label" htmlFor="gateInType">
      Gate In Type <span className="error-message">*</span>
    </label>
    <select
      className="form-control"
      id="gateInType"
      name="gateInType"
      readOnly
      style={{ backgroundColor: "#E0E0E0" }}
      value={gateIn.gateInType}
      onChange={(e) =>{
        setGateIn((prevNOC) => ({
          ...prevNOC,
          gateInType: e.target.value,
        }));
        setNocErrors((errors)=>({
            ...errors,
            gateInType:''
        }));
        setGateIn((prevNOC) => ({
            ...prevNOC,
            vehicleNo:'',
          }));
    }
      }
    >
        <option value="">Select...</option>
       <option value="BON">Bonding</option>
      <option value="IMP">Import</option>
    </select>
    <div style={{ color: 'red' }} className="error-message">{nocErrors.gateInType}</div>
  </FormGroup>
</Col> */}
{/* <Col md={2}>
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
            </Col> */}
<Col md={2}>
  <Row>
  <Col md={9}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                Gate In No
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="fobValueInDollar"
                   name="gateInId"
                   value={gateIn.gateInId}
                  maxLength={27}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
              </FormGroup>
            </Col>
         
            <Col md={3} className="d-flex justify-content-end" style={{ marginTop: 21 }}>
            <button
                    className="btn btn-outline-primary btn-margin newButton"
                    style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    id="submitbtn2"
                onClick={openGateSearchModal}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  // style={{ marginRight: "5px" }}
                />
              </button>
            </Col>
  </Row>
</Col>
       
          <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="inGateInDate">
                Gate In Date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleNocTransDate}
                    id="inGateInDate"
                    name="inGateInDate"
                    dateFormat="dd/MM/yyyy HH:mm"
                    showTimeSelect
                    value={gateIn.inGateInDate}
                    readOnly
                    style={{ backgroundColor: "#E0E0E0" }}
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
            {/* <Col md={2}>
      <FormGroup>
        <label className="forlabel bold-label" htmlFor="profitcentreId">
          Profitcentre <span className="error-message">*</span>
        </label>
        <Select
          placeholder="Select..."
          isClearable
          id="profitcentreId"
          name="profitcentreId"
          value={defaultOption}  // Display the default option
          onChange={handleChangeProfitCenter} // Handle change if any
          options={[defaultOption]}  // Only include default option
          isDisabled  // Disable selection
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
    </Col> */}
        <Col md={2}>
      <FormGroup>
        <Label className="forlabel bold-label" htmlFor="transporterStatus">
        Transporter Status  <span className="error-message">*</span>
        </Label>
        <Select
          id="transporterStatus"
          name="transporterStatus"
          value={transport.find(option => option.value === gateIn.transporterStatus)}
          onChange={(selectedOption) =>
            setGateIn((prevNOC) => ({
              ...prevNOC,
              transporterStatus: selectedOption.value,
            }))
          }
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
          options={transport}
          className="basic-single"
          classNamePrefix="select"
        />
      </FormGroup>
    </Col>

    <Col md={2}>
      <FormGroup>
        <label className="forlabel bold-label" htmlFor="transporterName">
        Transporter Name <span className="error-message">*</span>
        </label>
        <input
          className="form-control"
          type="text"
          id="transporterName"
          maxLength={50}
          name="transporterName"
          value={gateIn.transporterName}
          onChange={handleNocChange}
        />
        <div style={{ color: 'red' }} className="error-message">{nocErrors.transporterName}</div>
      
      </FormGroup>
    </Col>
    <Col md={2}>
      <FormGroup>
        <label className="forlabel bold-label" htmlFor="vehicleNo">
        Vehicle No <span className="error-message">*</span>
        </label>
        <input
          className="form-control"
          type="text"
          id="vehicleNo"
          maxLength={15}
          name="vehicleNo"
          value={gateIn.vehicleNo}
          onChange={handleNocChange}
        />
        <div style={{ color: 'red' }} className="error-message">{nocErrors.vehicleNo}</div>
      </FormGroup>
    </Col>
 
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Created By <span className="error-message"></span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="viaNo"
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                  maxLength={15}
                  name="createdBy"
                  value={gateIn.createdBy}
                />
              </FormGroup>
            </Col>



          </Row>
          <Row>
          {/* <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="shift">
                Shift <span className="error-message">*</span>
                </label>
                <select
                  className="form-control"
                  id="shift"
                  name="shift"
                  value={gateIn.shift}
                  onChange={(e) =>
                    setGateIn((prevNOC) => ({
                      ...prevNOC,
                      shift: e.target.value
                    }))
                  }
                  

                >
                  <option value="DAY">DAY</option>
                  <option value="NIGHT">NIGHT</option>
                </select>
                <div style={{ color: 'red' }} className="error-message">{nocErrors.shift}</div>
              </FormGroup>
            </Col> */}
                  {/* <Col md={2}>
      <FormGroup>
        <Label className="forlabel bold-label" htmlFor="shift">
          Shift <span className="error-message">*</span>
        </Label>
        <Select
          id="shift"
          name="shift"
          value={shiftOptions.find(option => option.value === gateIn.shift)}
          onChange={(selectedOption) =>
            setGateIn((prevNOC) => ({
              ...prevNOC,
              shift: selectedOption.value,
            }))
          }
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
          options={shiftOptions}
          className="basic-single"
          classNamePrefix="select"
        />
      </FormGroup>
    </Col> */}


<Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  No Check Digit
                </label>
                <Input
                  className="form-control"
                  type="select"
                  id="noCheckDigit"
                  name='noCheckDigit'
                  value={noCheckDigit}
                  onChange={(e) => {
                    setNoCheckDigit(e.target.value);

                    if (e.target.value === 'Y') {
                      setNocErrors((prevErrors) => ({
                        ...prevErrors,
                        ['containerNo']: "",
                      }));
                    }
                    else {
                      if (!handleContainerNoValidation1(gateIn.containerNo)) {
                        setNocErrors((prevErrors) => ({
                          ...prevErrors,
                          ['containerNo']: "Invalid Container No.",
                        }));

                      }
                    }
                  }}
                >
                  <option value="N">No</option>
                  <option value="Y">Yes</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={2}>
      <FormGroup>
        <label className="forlabel bold-label" htmlFor="containerNo">
       Container No 
        </label>
        <input
          className="form-control"
          type="text"
          id="containerNo"
          maxLength={11}
          name="containerNo"
          value={gateIn.containerNo}
        onChange={handleNocChange}
        />
          <div style={{ color: 'red' }} className="error-message">{nocErrors.containerNo}</div>
      </FormGroup>
    </Col>
            <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    ISO
                                </label>
                                <Select
                                    value={{ value: gateIn.isoCode, label: gateIn.isoCode }}
                                    onChange={handlePortChange}
                                    onInputChange={getIsoData}
                                    options={isoData}
                                    placeholder="Select ISO"
                                    isClearable
                                    id="iso"
                                    vesselName="iso"

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

                                <div style={{ color: 'red' }} className="error-message">{nocErrors.port}</div>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
        <Row>
            <Col md={6}>
            <FormGroup>
        <label className="forlabel bold-label" htmlFor="sbRequestId">
        Size 
        </label>
        <input
          className="form-control"
          type="text"
          id="containerSize"
          maxLength={15}
          name="containerSize"
          value={gateIn.containerSize}
        onChange={handleNocChange}
        readOnly
        style={{ backgroundColor: "#E0E0E0" }}
        />
      </FormGroup>
            </Col>

            <Col md={6}>
            <FormGroup>
        <label className="forlabel bold-label" htmlFor="containerType">
        Type 
        </label>
        <input
          className="form-control"
          type="text"
          id="containerType"
          maxLength={15}
          name="containerType"
          readOnly
          style={{ backgroundColor: "#E0E0E0" }}
          value={gateIn.containerType}
        onChange={handleNocChange}
        />
      </FormGroup>
            </Col>
        </Row>
    </Col>
    <Col md={2}>
      <FormGroup>
        <label className="forlabel bold-label" htmlFor="tareWeight">
        Container Weight
        </label>
        <input
          className="form-control"
          type="text"
          id="tareWeight"
          maxLength={15}
          name="tareWeight"
          value={gateIn.tareWeight}
        onChange={handleNocChange}
        readOnly
        style={{ backgroundColor: "#E0E0E0" }}
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
                  id="status"
                  maxLength={15}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                  name="status"
                  value={gateIn.status ==="A" ? 'Approved' :''}
                />
              </FormGroup>
            </Col>


            {/* <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Approved By
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="approvedBy"
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                  maxLength={15}
                  name="approvedBy"
                  value={gateIn.approvedBy}
                />
              </FormGroup>
            </Col> */}
          
  </Row> 
         </div>
        <hr style={{marginTop:0}}/>
        <Row className="text-center" >
          <Col>
        
           
             <button
               className="btn btn-outline-primary btn-margin newButton"
              style={{ marginRight: 10 ,
                // fontSize: 13,
                backgroundColor: gateInStatus === "A" ? "#E0E0E0" : "", // Change background color if disabled
                cursor: gateInStatus === "A" ? "not-allowed" : "pointer" // Change cursor style if disabled
              }}
              id="submitbtn2"
              onClick={handleSave}
              disabled={gateIn.status==="A"}
            //  disabled={gateInStatus==="A"}

            >
              <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
              Save
            </button>


{gateIn.status ==="A" ?
(
<button
                className="btn btn-outline-primary btn-margin newButton"
              style={{ marginRight: 10 }}
              id="submitbtn2"
              onClick={()=> handlePrint('PRINT')}
            >
              <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
              Print
            </button>

):null}

            <button
      className="btn btn-outline-success btn-margin newButton"
      style={{
        marginRight: 10,
        backgroundColor: gateIn.status === "A" ? "#E0E0E0" : "", // Change background color if disabled
        cursor: gateIn.status === "A" ? "not-allowed" : "pointer" // Change cursor style if disabled
      }}
      id="submitbtn2"
      onClick={gateIn.status !== "A" ? handleAddRow : undefined} // Disable click handler if status is "A"
      disabled={gateIn.status === "A"} // Disable button if status is "A"
    >
      <FontAwesomeIcon icon={faAdd} style={{ marginRight: "5px" }} />
      Add Details
    </button>
    <button
                className="btn btn-outline-primary btn-margin newButton"
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
        {/* <hr style={{marginTop:2}}/> */}
                    <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto", marginTop:1 }}>
    <h6 className="pageHead" style={{ fontFamily: "Your-Heading-Font", paddingLeft: "1%", paddingRight: "-20px" }}>
        <FontAwesomeIcon icon={faBraille} style={{ marginRight: "4px", color: "black" }} />
        Boe No Details
    </h6>
    <table className="table table-bordered table-hover tableHeader">
        <thead className="tableHeader">
            <tr>
            <th scope="col" className="text-center" style={{ color: "black" }}>Sr No</th>
            <th scope="col" className="text-center" style={{ color: "black" }}>BOE No <span className="error-message">*</span></th>
                <th scope="col" className="text-center" style={{ color: "black" }}>NOC No</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>NOC Trans Id</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>NOC Trans Date</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>CHA</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>Commodity <span className="error-message">*</span></th>
                <th scope="col" className="text-center" style={{ color: "black" }}>No Of Pack</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>Gross Weight</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>Gate In Pack</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>Qty Taken In <span className="error-message">*</span></th>
                <th scope="col" className="text-center" style={{ color: "black" }}>Weight Taken In</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>IGM No</th>
                <th scope="col" className="text-center" style={{ color: "black" }}>Item No</th>
                <th scope="col" className="text-center" style={{ color: "black" }}><FontAwesomeIcon icon={faTrash} style={{color:'red'}}></FontAwesomeIcon></th>
            </tr>
        </thead>
        <tbody>
        {rows.map((rowData, index) => (
                <tr key={index} className="text-center">
                     <td>
                        <>
                          <FormGroup>
                            <Input
                              style={{ backgroundColor: "#ccf2ff" }}
                              type="text"
                              value={index + 1}
                              readOnly
                              className="form-control"
                            />
                          </FormGroup>
                          {/* <button
                            type="button"
                            className="btn btn-danger form-control"
                            style={{
                              backgroundColor: "#ccf2ff",
                              color: "black",
                            }}
                            onClick={() => handleDeleteRow(index)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button> */}
                        </>
                      </td>
                     
                       <td>
                        <FormGroup>
                          <Select
                            value={{
                              value: rowData.boeNo,
                              label: rowData.boeNo,
                            }}
                            onChange={(selectedOption) =>
                              handleExbondBeChange(index, selectedOption)
                            }
                            onInputChange={getExbondBeData}
                            options={exbondBeData}
                            placeholder="Select Port"
                            isClearable
                            menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                            menuPosition="fixed" // Sets the dropdown menu position to fixed    
                            menuPlacement="top"
                            name={`boeNo_${index}`}
                            // className={`form-control inputField ${errorsTable[`boeNoError_${index}`] ? 'error-border' : ''}`}
                            className= {`autocompleteHeight ${errorsTable[`boeNoError_${index}`] ? 'error-border' : ''}`}
                            id={`boeNo-${index}`}
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                border: state.isFocused
                                  ? "1px solid #ccc"
                                  : "1px solid #ccc",
                                boxShadow: "none",
                                "&:hover": {
                                  border: "1px solid #ccc",
                                },
                                width: "180px", // Set the width to 180px
                              }),
                              indicatorSeparator: () => ({
                                display: "none",
                              }),
                              dropdownIndicator: () => ({
                                display: "none",
                              }),
                              placeholder: (provided) => ({
                                ...provided,
                                display: "flex",
                                color: "gray",
                              }),
                            }}
                          />
                    {errorsTable[`boeNoError_${index}`] && <div className="error-message">{errorsTable[`boeNoError_${index}`]}</div>}
                        </FormGroup>
                      </td>
                    <td>
                    <input
                              readOnly
                             
                              type="text"
                              name={`docRefNo_${index}`}
                              style={{width:'180px',backgroundColor: "#E0E0E0"}}
                              value={
                              rowData.docRefNo
                              }
                              onChange={(e) => {
                                handleInputChangeTable(index, "docRefNo", e.target.value);
                              }}
                              className="form-control inputField"
                            />
                    </td>
                    <td>
                    <input
                              readOnly
                             
                              type="text"
                              name={`erpDocRefNo_${index}`}
                              style={{width:'180px',backgroundColor: "#E0E0E0"}}
                              value={
                                rowData.erpDocRefNo
                                }
                              onChange={(e) => {
                                handleInputChangeTable(index, "erpDocRefNo", e.target.value);
                              }}
                              className="form-control inputField"
                            />
                    </td>
             
                    <td>
                    <input
                              readOnly
                             
                              type="text"
                              name={`docRefDate_${index}`}
                              style={{width:'180px',backgroundColor: "#E0E0E0"}}
                      
                              value={
                    rowData.docRefDate ? format(new Date( rowData.docRefDate), 'dd/MM/yyyy'):""
                              }
                              onChange={(e) => {
                                handleInputChangeTable(index, "docRefDate", e.target.value);
                              }}
                              className="form-control inputField"
                            />
                    </td>
{/* 
                    <td>{item.nocTransDate ? format(new Date(item.nocTransDate), 'dd/MM/yyyy HH:mm') : 'N/A'}</td> */}
                    <td><input
                              readOnly
                              type="text"
                              name={`cha_${index}`}
                              style={{width:'180px',backgroundColor: "#E0E0E0"}}
                              value={
                               rowData.chaname
                              }
                              onChange={(e) => {
                                handleInputChangeTable(index, "cha", e.target.value);
                              }}
                              className="form-control inputField"
                            />
                    </td>

                          <td>
                        <FormGroup>
                          <Select
                            value={{
                              value: rowData.commodity,
                              label: rowData.commodityDescription,
                            }}
                            onChange={(selectedOption) =>
                              handleExbondCargoDataChange(index, selectedOption)
                            }
                            // className={`form-control inputField ${errorsTable[`commodityError_${index}`] ? 'error-border' : ''}`}
                            className= {`autocompleteHeight ${errorsTable[`commodityError_${index}`] ? 'error-border' : ''}`}
                            onInputChange={getExbondCargoData}
                            options={exbondCommodityData}
                            menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                            menuPosition="fixed" // Sets the dropdown menu position to fixed    
                            menuPlacement="top"
                            placeholder="Select Cargo"
                            isClearable
                            name={`commodity_${index}`}
                            id={`cfBondDtlId-${index}`}
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                border: state.isFocused
                                  ? "1px solid #ccc"
                                  : "1px solid #ccc",
                                boxShadow: "none",
                                "&:hover": {
                                  border: "1px solid #ccc",
                                },
                                width: "180px", // Set the width to 180px
                              }),
                              indicatorSeparator: () => ({
                                display: "none",
                              }),
                              dropdownIndicator: () => ({
                                display: "none",
                              }),
                              placeholder: (provided) => ({
                                ...provided,
                                display: "flex",
                                color: "gray",
                              }),
                            }}
                          />
                       {errorsTable[`commodityError_${index}`] && <div className="error-message">{errorsTable[`commodityError_${index}`]}</div>}
                        </FormGroup>
                      </td>
                    <td><input
                              readOnly
                             
                              type="text"
                              name={`actualNoOfPackages_${index}`}
                              style={{width:'90px',backgroundColor: "#E0E0E0"}}
                              value={
                                rowData.actualNoOfPackages
                              }
                              onChange={(e) => {
                                handleInputChangeTable(index, "actualNoOfPackages", e.target.value);
                              }}
                              className="form-control inputField"
                            />
                    </td>

                    <td><input
                              readOnly
                             
                              type="text"
                              name={`grossWeight_${index}`}
                              style={{width:'99px',backgroundColor: "#E0E0E0"}}
                              value={
                               rowData.grossWeight
                              }
                              onChange={(e) => {
                                handleInputChangeTable(index, "grossWeight", e.target.value);
                              }}
                              className="form-control inputField"
                            />
                    </td>
                    <td><input
                              readOnly
                              type="text"
                              name={`gateInPackages_${index}`}
                              style={{width:'90px',backgroundColor: "#E0E0E0"}}
                              value={
                               rowData.gateInPackages
                              }
                              onChange={(e) => {
                                handleInputChangeTable(index, "gateInPackages", e.target.value);
                              }}
                              className="form-control inputField"
                            />
                    </td>
<td>
   <input
    type="text"
    name={`qtyTakenIn_${index}`}
    style={{ width: '90px' ,
     backgroundColor: gateInStatus === "A" ? "#E0E0E0" : "white"  
    // Conditionally set background color
  }}
    value={rowData.qtyTakenIn}
    onChange={(e) => {
        const qtyTakenIn = e.target.value ;
        const nocPackages = rowData.actualNoOfPackages ;
        const gateInPackages = rowData.gateInPackages ;
        const grossWeight = rowData.grossWeight ;
        handleQtyTakenInChange(index, qtyTakenIn,nocPackages,gateInPackages,grossWeight);
        validateQtyTakenIn(index, qtyTakenIn, nocPackages, gateInPackages);
        
    }}
    className={`form-control inputField ${errorsTable[index] ? 'error-border' : ''}`}
   readOnly={gateInStatus === "A"}  // Conditionally set readOnly
/>
{errorsTable[index] && <div className="error-message">{errorsTable[index]}</div>}
</td>


                    <td><input 
                             type="text"
                             readOnly
                             name={`weightTakenIn_${index}`}
                             style={{width:'180px',backgroundColor: "#E0E0E0",
                              // backgroundColor: gateInStatus === "A" ? "#E0E0E0" : "white" 
                             // Conditionally set background color
                            }}
                             value={
                              rowData.weightTakenIn
                             }
                             onChange={(e) => {
                               handleInputChangeTable(index, "weightTakenIn", e.target.value,10,2);
                             }}
                             className="form-control inputField"
                            // readOnly={gateInStatus === "A"}  // Conditionally set readOnly
                           />
                   </td>
                   <td><input
                             readOnly
                             type="text"
                             name={`nocNo_${index}`}
                             style={{width:'180px',backgroundColor: "#E0E0E0"}}
                             value={
                              rowData.nocNo
                             }
                             onChange={(e) => {
                               handleInputChangeTable(index, "nocNo", e.target.value);
                             }}
                             className="form-control inputField"
                           />
                   </td>
                   <td><input
                              readOnly
                             type="text"
                             name={`lineNo_${index}`}
                             style={{width:'180px',backgroundColor: "#E0E0E0"}}
                             value={
                             rowData.lineNo
                             }
                             onChange={(e) => {
                               handleInputChangeTable(index, "lineNo", e.target.value);
                             }}
                             className="form-control inputField"
                           />
                   </td>
                   <td>
                        <>
                          <button
                            type="button"
                            className="btn btn-danger form-control"
                            style={{
                              backgroundColor: gateIn.status === 'A' ? "#f2f2f2" : "#ccf2ff", // Grayed-out when disabled
                              color: gateIn.status === 'A' ? "#a9a9a9" : "red",
                            }}
                            onClick={() => handleDeleteRow(index)}
                            disabled={gateIn.status === 'A'}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </>
                      </td>
                </tr>
 ))}
        </tbody>
    </table>

</div>

        {/* </CardBody>
    </Card> */}
      </div>


  
    </>
  );
}

export default GateInBondedCargo;
