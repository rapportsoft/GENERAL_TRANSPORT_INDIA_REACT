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
} from "reactstrap";
import { Pagination } from "react-bootstrap";
import Swal from "sweetalert2";
import { format } from "date-fns";
// import { format } from "date-fns";

function NoObjectionCertifacate() {
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

  const initialNoc = {
    companyId:companyid,
branchId: branchId,
nocTransId: "",
profitcentreId: "N00003",
nocTransDate: new Date(),
nocNo: "",
nocDate:new Date(),
shift: "Day",
source: "",
gateInId: "",
igmTransId: "",
igmNo: "",
igmDate: new Date(),
igmLineNo: "",
boeNo: "",
boeDate: "",
shippingAgent: "",
shippingLine: "",
chaSrNo: 1,
cha: "",
chaCode: "",
haz: "N",
periodicBill: "N",
typeOfPackage: "",
billingParty: "CHA",
igst: "N",
cgst: "N",
sgst: "N",
sez: "N",
impSrNo: 1,
importerId: "",
importerName: "",
importerAddress1: "",
importerAddress2: "",
importerAddress3: "",
accSrNo: 1,
onAccountOf: "",
commodityDescription: "",
commodityCode: "",
grossWeight: "",
sampleQty: "",
nocValidityDate: "",
nocFromDate: "",
licenceValidDate: "",
numberOfMarks: "",
uom: "",
nocPackages: "",
gateInPackages: "",
area: "",
newArea: "",
cifValue: "",
imoCode: "",
cargoDuty: "",
insuranceValue: "",
insuranceAmt: "",
noticeId: "",
noticeType: "",
inBondedPackages: "",
noticeDate: "",
comments: "",
status: "",
emailFlag: "N",
emailDate: "",
createdBy: "",
createdDate: "",
editedBy: "",
editedDate: "",
approvedBy: "",
nocWeek: "",
dcaNo: "",
sapNo: "",
jobNo: "",
sourcePort: "",
noOf20FT: 0,
noOf40FT: 0,
spaceAllocated: "",
cargoSource: "",
balCifValue: "",
balCargoDuty: "",
blockMoveAllow: "N",
emailId: "",
approvedDate: "",
spaceType: "General",
gateInType: "Container",
othPartyId: "",
invoiceAssesed: "N",
assesmentId: "",
invoiceNo: "",
invoiceDate: "",
creditType: "N",
invoiceCategory: "",
billAmt: "",
invoiceAmt: "",
lastAssesmentId: "",
lastAssesmentDate: "",
lastInvoiceNo: "",
lastInvoiceDate: "",
invoiceUptoDate: "",
lastInvoiceAssesed: "N",
lastBillAmt: "",
lastInvoiceAmt: "",
lastCreditType: "",
newCommodity: "",
ssrTransId: "",
chaName: ""
};
const initialNocDtl = {
  companyId: companyid, // String
  branchId: branchId, // String
  nocTransId: "", // String
  nocNo: "", // String
  cfBondDtlId: "", // String
  boeNo: "", // String
  gateInPackages:"0",
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
// const [chaSearchedData, setCHASearchedData] = useState([]);

const searchNocTrasnsId = (id) => {
    setLoading(true);
    axios.get(`${ipaddress}api/cfbondnoc/dataAllDataOfCfBondNoc?companyId=${companyid}&branchId=${branchId}&partyName=${id}`, {
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

const selectNocTransIdearchRadio = (nocTransId, NocNo, portName, vesselName, shippingLineName, shippingLineCode, shippingAgentName, shippingAgentCode) => {
closeNocTrasnsIdSearchModal();
    axios.get(`${ipaddress}api/cfbondnoc/getDataByTransIdANDNocID?companyId=${companyid}&branchId=${branchId}&nocTransID=${nocTransId}&nocNo=${NocNo}`, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
        .then((response) => {
            const data = response.data;

            console.log("getDataByPartyIdAndGstNo",data);

setNOC(response.data);
setChaName(response.data.cha);
setNocFlag('edit');
fetchData(companyid,branchId,response.data.nocTransId,response.data.nocNo);

            // setNOC(response.data);
            //   setNocErrors((prevErrors) => ({
            //     ...prevErrors,
            //     cha: "",
            //   }));
       
        })
        .catch((error) => {

        })
}




















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

  const selectIGMSearchRadio = (partyId, gstNo, portName, vesselName, shippingLineName, shippingLineCode, shippingAgentName, shippingAgentCode) => {
      closeIGMSearchModal();
      axios.get(`${ipaddress}api/cfbondnoc/getDataByPartyIdAndGstNo?companyId=${companyid}&branchId=${branchId}&partyId=${partyId}&gstNo=${gstNo}`, {
          headers: {
              Authorization: `Bearer ${jwtToken}`
          }
      })
          .then((response) => {
              const data = response.data;

              console.log("getDataByPartyIdAndGstNo",data);

              setNOC((noc)=>({
...noc,
cha:response.data.partyId,
chaCode:response.data.createdBy,
nocWeek:response.data.bondnocWeek,
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












  const [isModalOpenForImporterSearch, setisModalOpenForImporterSearch] = useState(false);
  const openImporterearchModal = () => {
    setisModalOpenForImporterSearch(true);
      searchImporter('');
  }

  const closeImporterSearchModal = () => {
    setisModalOpenForImporterSearch(false);
      setImporterSearchId('');
      setImporterSearchedData([]);
      setCHASearchedData([]);
  }

  const [importerSearchId, setImporterSearchId] = useState('');
  const [importerSearchedData, setImporterSearchedData] = useState([]);

  const searchImporter = (id) => {
      setLoading(true);
      axios.get(`${ipaddress}api/cfbondnoc/searchImporters?companyId=${companyid}&branchId=${branchId}&partyName=${id}`, {
          headers: {
              Authorization: `Bearer ${jwtToken}`
          }
      })
          .then((response) => {
            setImporterSearchedData(response.data);
            setCHASearchedData(response.data);
              setLoading(false);
              setCurrentPage(1);

              console.log("response.data",response.data);
          })
          .catch((error) => {
              setLoading(false);
          })
  }


  const clearSearchImporter = () => {
    setImporterSearchId('');
    searchImporter('');
  }

  const selectImporterSearchRadio = (partyId, gstNo, portName, vesselName, shippingLineName, shippingLineCode, shippingAgentName, shippingAgentCode) => {
      closeImporterSearchModal();
      axios.get(`${ipaddress}api/cfbondnoc/getDataByPartyIdAndGstNoForImporter?companyId=${companyid}&branchId=${branchId}&partyId=${partyId}&gstNo=${gstNo}`, {
          headers: {
              Authorization: `Bearer ${jwtToken}`
          }
      })
          .then((response) => {
              const data = response.data;

              console.log("getDataByPartyIdAndGstNo",data);

              setNOC((noc)=>({
...noc,
importerId:response.data.partyId,
importerName:response.data.partyName,
importerAddress1:response.data.address1,
importerAddress3:response.data.address2,
importerAddress2:response.data.address3,

              }));

              setNocErrors((prevErrors) => ({
                ...prevErrors,
                importerName: "",
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



  const [noc, setNOC] = useState(initialNoc);
  const [nocDtl, setNocDtl] = useState(initialNocDtl);
  const handleNocChange = (e) => {
    const { name, value } = e.target;

    setNOC((prevNOC) => {
      const updatedNOC = {
        ...prevNOC,
        [name]: value,
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
    }));

    setNOC((prevNoc) => ({
      ...prevNoc,
      nocValidityDate: '',
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
      nocTransDate: date,
    }));
  //   document.getElementById("nocFromDate").classList.remove('error-border');
  //   setNocErrors((prevErrors) => ({
  //     ...prevErrors,
  //     nocFromDate: "",
  // }));
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

  const handleCheckboxChange = (e) => {
    setNOC((prevNOC) => ({
      ...prevNOC,
      periodicBill: e.target.checked ? 'Y' : 'N'
    }));
   
  };
  

  const [nocErrors, setNocErrors] = useState({
    cha: "",
    boeNo: "",
    igmNo: "",
    boeDate: "",
    nocDate: "",
    nocFromDate: "",
    nocValidityDate: "",
    igmDate: "",
area:"",
    importerName: "",
    grossWeight: "",
    uom: "",
    igmLineNo: "",
})

const [nocDtlErrors, setNocDtlErrors] = useState({
  nocPackages: "",
  typeOfPackage: "",
  cifValue: "",
  cargoDuty: "",
  insuranceValue: "",
  commodityDescription: "",
})

  const handleSave = () => {
    // Save the data (e.g., send it to a server)
    console.log("Data saved:", noc);
    setLoading(true);
    let errors = {};

    if (!noc.cha) {
      errors.cha = "Cha is required."
      document.getElementById("cha").classList.add("error-border");
  }
  if (!noc.boeNo) {
      errors.boeNo = "boeNo no is required."
      document.getElementById("boeNo").classList.add("error-border");
  }
  if (!noc.igmNo) {
      errors.igmNo = "IGM No is required."
      document.getElementById("igmNo").classList.add("error-border");
  }
  if (!noc.boeDate) {
      errors.boeDate = "BOE Date is required."
      document.getElementById("boeDate").classList.add("error-border");
  }
  if (!noc.nocDate) {
      errors.nocDate = "NOC Date is required."
      document.getElementById("nocDate").classList.add("error-border");
  }
  if (!noc.nocFromDate) {
      errors.nocFromDate = "NOC From Date is required."
      document.getElementById("nocFromDate").classList.add("error-border");
  }
  if (!noc.nocValidityDate) {
      errors.nocValidityDate = "NOC Validity date is required."
      document.getElementById("nocValidityDate").classList.add("error-border");
  }
  if (!noc.igmDate) {
      errors.igmDate = "IGM Date is required."
      document.getElementById("igmDate").classList.add("error-border");
  }
  if (!noc.importerName) {
    errors.importerName = "Importer Name is required."
    document.getElementById("importerName").classList.add("error-border");
}
if (!noc.grossWeight) {
  errors.grossWeight = "Gross Weight is required."
  document.getElementById("grossWeight").classList.add("error-border");
}
if (!noc.uom) {
  errors.uom = "UOM is required."
  document.getElementById("uom").classList.add("error-border");
}
if (!noc.igmLineNo) {
  errors.igmLineNo = "IGM Line No required."
  document.getElementById("igmLineNo").classList.add("error-border");
}

if (!noc.area) {
  errors.area = "Area is required."
  document.getElementById("area").classList.add("error-border");
}

  if (Object.keys(errors).length > 0) {
      setNocErrors(errors);
      setLoading(false);
      toast.error("Please fill in the required fields.", {
          autoClose: 1000
      })
      return;
  }
  
  if(noc.status === 'A')
  {
    setLoading(false);
    toast.info("Record is alredy approved.", {
        autoClose: 1000
    })
    return;
  }

  if (cfbondnocDtl.length < 1) {
    toast.warn("Please add at least one commodity", {
      autoClose: 900,
    });
setLoading(false);
    return;
  }


  const requestBody = 
  {
    noc: {
      ...noc,
    },
    nocDtl: {
      ...nocDtl,
    },
  };

    axios.post(`${ipaddress}api/cfbondnoc/saveCfBondNoc?cid=${companyid}&bid=${branchId}&user=${userId}&flag=${nocFlag}`,noc, {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    })
        .then((response) => {
           
            setNOC(response.data);
            toast.success("Data save successfully!!", {
                autoClose: 800
            })
            setLoading(false);
            setNocFlag('edit');
            // set('add')
        })
        .catch((error) => {
            setLoading(false);
            toast.error(error.response.data, {
                autoClose: 800
            })
        })
  };

  const handleClear = () => {
    // Reset the form fields
    setNOC({
      companyId:companyid,
branchId: branchId,
nocTransId: "",
profitcentreId: "",
nocTransDate: new Date(),
nocNo: "",
nocDate:new Date(),
shift: "Day",
source: "",
gateInId: "",
igmTransId: "",
igmNo: "",
igmDate: "",
igmLineNo: "",
boeNo: "",
boeDate: new Date(),
shippingAgent: "",
shippingLine: "",
chaSrNo: 1,
cha: "",
chaCode: "",
haz: "N",
periodicBill: "N",
typeOfPackage: "",
billingParty: "CHA",
igst: "N",
cgst: "N",
sgst: "N",
sez: "N",
impSrNo: 1,
importerId: "",
importerName: "",
importerAddress1: "",
importerAddress2: "",
importerAddress3: "",
accSrNo: 1,
onAccountOf: "",
commodityDescription: "",
commodityCode: "",
grossWeight: "",
sampleQty: "",
nocValidityDate: "",
nocFromDate: "",
licenceValidDate: "",
numberOfMarks: "",
uom: "",
nocPackages: "",
gateInPackages: "",
area: "",
newArea: "",
cifValue: "",
imoCode: "",
cargoDuty: "",
insuranceValue: "",
insuranceAmt: "",
noticeId: "",
noticeType: "",
inBondedPackages: "",
noticeDate: "",
comments: "",
status: "",
emailFlag: "N",
emailDate: "",
createdBy: "",
createdDate: "",
editedBy: "",
editedDate: "",
approvedBy: "",
nocWeek: "",
dcaNo: "",
sapNo: "",
jobNo: "",
sourcePort: "",
noOf20FT: "",
noOf40FT: "",
spaceAllocated: "",
cargoSource: "",
balCifValue: "",
balCargoDuty: "",
blockMoveAllow: "N",
emailId: "",
approvedDate: "",
spaceType: "General",
gateInType: "Container",
othPartyId: "",
invoiceAssesed: "N",
assesmentId: "",
invoiceNo: "",
invoiceDate: "",
creditType: "N",
invoiceCategory: "",
billAmt: "",
invoiceAmt: "",
lastAssesmentId: "",
lastAssesmentDate: "",
lastInvoiceNo: "",
lastInvoiceDate: "",
invoiceUptoDate: "",
lastInvoiceAssesed: "N",
lastBillAmt: "",
lastInvoiceAmt: "",
lastCreditType: "",
newCommodity: "",
ssrTransId: ""
    });


    document.getElementById("cha").classList.remove("error-border");
    document.getElementById("igmNo").classList.remove("error-border");
    document.getElementById("igmDate").classList.remove("error-border");
    document.getElementById("igmLineNo").classList.remove("error-border");
    document.getElementById("importerName").classList.remove("error-border");
    document.getElementById("grossWeight").classList.remove("error-border");
    document.getElementById("uom").classList.remove("error-border");
    document.getElementById("nocDate").classList.remove("error-border");
    document.getElementById("nocFromDate").classList.remove("error-border");
    document.getElementById("nocValidityDate").classList.remove("error-border");
    document.getElementById("boeNo").classList.remove("error-border");
    document.getElementById("boeDate").classList.remove("error-border");
    document.getElementById("area").classList.remove("error-border");
setNocErrors('');
setCfbondnocDtl([]);
setNocFlag('add');
setChaName('');
  };

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const handleOpenModal =()=>{

    let errors = {};

    if (!noc.cha) {
      errors.cha = "Cha is required."
      document.getElementById("cha").classList.add("error-border");
  }
  if (!noc.boeNo) {
      errors.boeNo = "boeNo no is required."
      document.getElementById("boeNo").classList.add("error-border");
  }
  if (!noc.igmNo) {
      errors.igmNo = "IGM No is required."
      document.getElementById("igmNo").classList.add("error-border");
  }
  if (!noc.boeDate) {
      errors.boeDate = "BOE Date is required."
      document.getElementById("boeDate").classList.add("error-border");
  }
  if (!noc.nocDate) {
      errors.nocDate = "NOC Date is required."
      document.getElementById("nocDate").classList.add("error-border");
  }
  if (!noc.nocFromDate) {
      errors.nocFromDate = "NOC From Date is required."
      document.getElementById("nocFromDate").classList.add("error-border");
  }
  if (!noc.nocValidityDate) {
      errors.nocValidityDate = "NOC Validity date is required."
      document.getElementById("nocValidityDate").classList.add("error-border");
  }
  if (!noc.igmDate) {
      errors.igmDate = "IGM Date is required."
      document.getElementById("igmDate").classList.add("error-border");
  }
  if (!noc.importerName) {
    errors.importerName = "Importer Name is required."
    document.getElementById("importerName").classList.add("error-border");
}
if (!noc.grossWeight) {
  errors.grossWeight = "Gross Weight is required."
  document.getElementById("grossWeight").classList.add("error-border");
}
if (!noc.uom) {
  errors.uom = "UOM is required."
  document.getElementById("uom").classList.add("error-border");
}
if (!noc.igmLineNo) {
  errors.igmLineNo = "IGM Line No required."
  document.getElementById("igmLineNo").classList.add("error-border");
}

if (!noc.area) {
  errors.area = "Area is required."
  document.getElementById("area").classList.add("error-border");
}

  if (Object.keys(errors).length > 0) {
      setNocErrors(errors);
      setLoading(false);
      toast.error("Please fill in the required fields.", {
          autoClose: 1000
      })
      return;
  }
    setModal(true);

  }

  const handleOpenClose =()=>{
    setModal(false);
    setNocDtl('');
  }
  const handleClose = () => 
  {
    setNocDtl('');
    setNocDtl(initialNocDtl);
    setNocDtl((nocdtl)=>({
...nocdtl,
companyId: "", 
  branchId: "", 
  nocTransId: "",
  nocNo: "", 
  cfBondDtlId: "", 
  boeNo: "", 

  CfbondDetailDate: null, 
  nocPackages: null, 
  cifValue: null,
  cargoDuty: null, 
  insuranceValue: null, 

  typeOfPackage: "",
  commodityDescription: "", 
  status: "",
  createdBy: "", 
  createdDate: null,
  editedBy: "",
  editedDate: null,
  approvedBy: "",
  approvedDate: null,
    }))
  }

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setNocDtl((prevNocDtl) => ({
  //     ...prevNocDtl,
  //     [name]: value,
  //   }));
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNocDtl((prevNocDtl) => {
      const updatedNOCdtl = {
        ...prevNocDtl,
        [name]: value,
      };

      // Calculate the sum of cifValue and cargoDuty
      const cifValue = parseFloat(updatedNOCdtl.cifValue) || 0;
      const cargoDuty = parseFloat(updatedNOCdtl.cargoDuty) || 0;

      return {
        ...updatedNOCdtl,
        insuranceValue: (cifValue + cargoDuty).toFixed(2), // Update insuranceValue
      };
    });


    document.getElementById(name).classList.remove('error-border');
        setNocDtlErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};

    if (!nocDtl.nocPackages) {
      errors.nocPackages = "no of packages is required."
      document.getElementById("nocPackages").classList.add("error-border");
  }
  if (!nocDtl.typeOfPackage) {
      errors.typeOfPackage = "type of packages is required."
      document.getElementById("typeOfPackage").classList.add("error-border");
  }
  if (!nocDtl.cifValue) {
      errors.cifValue = "CIF is required."
      document.getElementById("cifValue").classList.add("error-border");
  }
  if (!nocDtl.cargoDuty) {
      errors.cargoDuty = "Duty is required."
      document.getElementById("cargoDuty").classList.add("error-border");
  }
  // if (!nocDtl.insuranceValue) {
  //     errors.nocDate = "InsuranceValue is required."
  //     document.getElementById("insuranceValue").classList.add("error-border");
  // }
  if (!nocDtl.commodityDescription) {
      errors.commodityDescription = "Description is required."
      document.getElementById("commodityDescription").classList.add("error-border");
  }
  if (Object.keys(errors).length > 0) {
      setNocDtlErrors(errors);
      setLoading(false);
      toast.error("Please fill in the required fields.", {
          autoClose: 1000
      })
      return;
  }
  

    const requestBody = 
    {
      noc: {
        ...noc,
      },
      nocDtl: {
        ...nocDtl,
      },
    };
    axios.post(`${ipaddress}api/cfbondnoc/saveNoc?cid=${companyid}&bid=${branchId}&user=${userId}&flag=${nocFlag}`, requestBody, {
      headers: {
          Authorization: `Bearer ${jwtToken}`
      }
  })
      .then((response) => {
         
          setNOC(response.data);
          toast.success("Data save successfully!!", {
              autoClose: 800
          })

          fetchData(companyid,branchId,response.data.nocTransId,response.data.nocNo);
          setLoading(false);
          setNocDtl('');
          setNocFlag('edit');
      })
      .catch((error) => {
          setLoading(false);
          toast.error(error.response.data, {
              autoClose: 800
          })
      })
    console.log(nocDtl);
    setModal(false);
  };
  const [cfbondnocDtl, setCfbondnocDtl] = useState([]);
  const fetchData = async (companyid,branchId,nocTransId,nocNo) => {
    try {
      const response = await fetch(`${ipaddress}api/cfbondnoc/getALLCfbondNocDtl?companyId=${companyid}&branchId=${branchId}&nocTransId=${nocTransId}&nocNo=${nocNo}`,{
        headers: {
          Authorization: `Bearer ${jwtToken}`
      }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCfbondnocDtl(data);

      console.log("cfbodnNocDtl records ",data);
    } catch (error) {
      // setError(error);
    } finally {
      setLoading(false);
    }
  };

  const [selectedTYPEOFPACKAGES, setSelectedTypeOfPackages] = useState("");
  const [TYPEOFPACKAGES, setTypesOfPakages] = useState([]);
  useEffect(() => {
    fetch(`${ipaddress}jardetail/jarIdList/J00060/${companyid}`)
      .then((response) => response.json())
      .then((data) => setTypesOfPakages(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleChange = (selectedOption) => {
    const value = selectedOption ? selectedOption.value : '';
    setSelectedTypeOfPackages(value);
    setNocDtl((prev) => ({
      ...prev,
      typeOfPackage: value,
    }));
    setErrors("");

    document.getElementById("typeOfPackage").classList.remove('error-border');
    setNocDtlErrors((prevErrors) => ({
        ...prevErrors,
        typeOfPackage: "",
    }));
  };

  const options = TYPEOFPACKAGES.map(packages => ({
    value: packages.jarDtlId,
    label: packages.jarDtlDesc
  }));

  
  const handleEdit = (dtlId,transId,nocId) => {

      axios.get(`${ipaddress}api/cfbondnoc/getDataCfBondNocDtl?companyId=${companyid}&branchId=${branchId}&dtlid=${dtlId}&trasnId=${transId}&nocId=${nocId}`, {
          headers: {
              Authorization: `Bearer ${jwtToken}`
          }
      })
          .then((response) => {
             
console.log("responseresponseresponse",response.data);
setModal(true);
setNocDtl(response.data);
setSelectedTypeOfPackages(response.data.typeOfPackage);
setNocFlag('edit')
console.log(selectedTYPEOFPACKAGES);

          })
          .catch((error) => {

          })

    console.log(`Edit item with ID: ${dtlId}`);
  };

  const handleDelete = (dtlId,transId,nocId) => {
    Swal.fire({
      title: 'Are you sure?',
      html: 'Are you sure you want to delete the record?',
      icon: 'warning',
      showCancelButton: true,
      customClass: {
          icon: 'icon-smaller' // Apply the custom class to the icon
      },
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, close it!'
  }).then((result) => {
      if (result.isConfirmed) {
          axios.post(`${ipaddress}api/cfbondnoc/delete?companyId=${companyid}&branchId=${branchId}&dtlid=${dtlId}&trasnId=${transId}&nocId=${nocId}`, null, {
              headers: {
                  Authorization: `Bearer ${jwtToken}`
              }
          })
              .then((response) => {
                  fetchData(companyid,branchId,transId,nocId);
                  if (response.data === 'success') {
                      Swal.fire({
                          title: "Deleted!",
                          text: "Data deleted successfully!!!",
                          icon: "success"
                      });
                  }

              })
              .catch((error) => {

              })

      }
  });
    console.log(`Delete item with ID: ${dtlId}`);
  };




  const handlePrint = async (type) => {
    setLoading(true);
        try {
            const response = await axios.get(`${ipaddress}api/cfbondnoc/getNocCerificatePrint?companyId=${companyid}&branchId=${branchId}&uname=${username}&type=${type}&cname=${companyname}&bname=${branchname}&nocTransId=${noc.nocTransId}&nocNo=${noc.nocNo}`,
            {
              headers:{
                Authorization: `Bearer ${jwtToken}`
              }
            });
    
            console.log("Response Data");
            console.log(response.data);
    
            if (type === 'PDF') {
              
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
            } else if (type === 'PRINT') {
                const pdfBase64 = response.data;
    
                const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
    
                const blobUrl = URL.createObjectURL(pdfBlob);
    
                window.open(blobUrl, '_blank');
            } else {
                throw new Error('Invalid print type');
            }
        } catch (error) {
            console.error('Error in handlePrint:', error.message);
         
        }finally{
          setLoading(false);
        }
    };

    const getMinDate = (date) => {
      if (!date) return null;
      const minDate = new Date(date);
      minDate.setDate(minDate.getDate() + 1); // Add one day
      return minDate;
    };

    const defaultOption = { value: 'N00003', label: 'NOC BOND' };
    
      const handleChangeProfitCenter = (selectedOption) => {
        // Update the state or handle the change as needed
        setNOC(prevState => ({
          ...prevState,
          profitcentreId: selectedOption ? selectedOption.value : ''
        }));
      }
    
  const [selectedDate, setSelectedDate] = useState(new Date());
  
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
        <Card>
          <CardBody>
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
            icon={faCertificate}
            style={{
              marginRight: "8px",
              color: "black", // Set the color to golden
            }}
          />
        No Objection Certificate
          <hr />
        </h5>
        <div>
          <Row>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                NOC Trans Id
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="fobValueInDollar"
                  name="nocTransId"
                  value={noc.nocTransId}
                  maxLength={27}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
              </FormGroup>
            </Col>
         
            <Col md={2} style={{ marginTop: 22 }}>
              <button
                className="btn btn-outline-primary btn-margin newButton"
                style={{ marginRight: 10 }}
                id="submitbtn2"
                onClick={openNocTransIdSearchModal}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ marginRight: "5px" }}
                />
                Search
              </button>
            </Col>
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
                            /> Search NOC</h5>

                        </ModalHeader>
                        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                            <Row>
                                <Col md={4}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Search by Noc Trans Id / NOc No / BOE No
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
                            <div className="mt-1 table-responsive ">
                                <table className="table table-bordered table-hover tableHeader">
                                    <thead className='tableHeader'>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Noc Trans Id</th>
                                            <th scope="col">Noc Trans Date</th>
                                            <th scope="col">Noc No</th>
                                         
                                            <th scope="col">Noc Date</th>
                                            <th scope="col">IGM No</th>
                                            <th scope="col">IGM Line No</th>
                                            <th scope="col">BE No</th>
                                            <th scope="col">BE Date</th>
                                            <th scope="col">CHA</th>
                                            <th scope="col">Party Name</th>
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
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <input type="radio" name="radioGroup" onChange={() => selectNocTransIdearchRadio(item.nocTransId, item.nocNo, item[6], item[10], item[12], item[13], item[14], item[15])} value={item[0]} />
                                                </td>
                                                <td>{item.nocTransId}</td>
                                                <td>
        {item.nocTransDate
          ? format(new Date(item.nocTransDate), 'dd/MM/yyyy HH:mm')
          : 'N/A'}
      </td>
            <td>{item.nocNo}</td>
          <td>{item.nocDate ? format(new Date(item.nocDate), 'dd/MM/yyyy HH:mm') : 'N/A'}</td>  
            <td>{item.igmNo}</td>
            <td>{item.igmLineNo}</td>
            <td>{item.boeNo}</td>
            <td>
        {item.boeDate ? format(new Date(item.boeDate), 'dd/MM/yyyy HH:mm') : 'N/A'}
      </td>
            <td>{item.cha}</td>
            <td>{item.importerName}</td>
            <td>{item.status ==="A" ? 'Approved' :''}</td>
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
          <hr/>
          <Row>
          <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="nocTransDate">
                NOC Trans Date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleNocTransDate}
                    id="nocTransDate"
                    name="nocTransDate"
                    dateFormat="dd/MM/yyyy HH:mm"
                    showTimeSelect
                    value={noc.nocTransDate}
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
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="nocDate">
                NOC Date <span className="error-message">*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={noc.nocDate}
                    onChange={(date) => {
                        setNOC((prevNoc) => ({
                          ...prevNoc,
                          nocDate: date,
                        }));
                      }}
                    //   onChange={handleDocDate}
                    id="nocDate"
                    name="nocDate"
                    value={noc.nocDate}
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
            <Col md={3}>
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
                  value={noc.createdBy}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
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
                  value={noc.status ==="A" ? 'Approved' :''}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="gateNo">
                NOC No
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="nocNo"
                  maxLength={15}
                  name="nocNo"
                  value={noc.nocNo}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
      <FormGroup>
        <label className="forlabel bold-label" htmlFor="docDate">
          Noc From Date <span className="error-message">*</span>
        </label>
        <div style={{ position: "relative" }}>
          <DatePicker
            selected={noc.nocFromDate}
            onChange={handleDocDateChange}
            id="nocFromDate"
            name="nocFromDate"
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
        <div style={{ color: 'red' }} className="error-message">{nocErrors.nocFromDate}</div>
      </FormGroup>
    </Col>

            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                NOC Validity Date <span className="error-message">*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={noc.nocValidityDate}
                    onChange={handleNocValidityDateChnage}
                    id="nocValidityDate"
                    name="nocValidityDate"
                    dateFormat="dd/MM/yyyy"
                    className="form-control border-right-0 inputField"
                    customInput={<input style={{ width: "100%" }} />}
                    wrapperClassName="custom-react-datepicker-wrapper"
                    minDate={getMinDate(noc.nocFromDate)}
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
                <div style={{ color: 'red' }} className="error-message">{nocErrors.nocValidityDate}</div>
              </FormGroup>
            </Col>
            <Col md={3}>
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
                  value={noc.approvedBy}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                CHA <span className="error-message">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="cha"
                  maxLength={15}
                  name="cha"
                  value={chaName}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
                <div style={{ color: 'red' }} className="error-message">{nocErrors.cha}</div>
              </FormGroup>
              
            </Col>

            <Col md={1} style={{marginTop:23}}>
            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={openIGMSearchModal}

                            >
                                <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                    
                            </button>
            </Col>

            <Modal Modal isOpen={isModalOpenForIGMSearch} onClose={closeIGMSearchModal} toggle={closeIGMSearchModal} style={{ maxWidth: '1200px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>
                        <ModalHeader toggle={closeIGMSearchModal} style={{
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
                            /> Search IGM</h5>

                        </ModalHeader>
                        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                            <Row>
                                <Col md={4}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Search by Party Id / Party Name /GST No
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="igmTransId"
                                            maxLength={15}
                                            name='igmTransId'
                                            value={chaSearchId}
                                            onChange={(e) => setChaSearchId(e.target.value)}
                                        />

                                    </FormGroup>
                                </Col>
                                <Col md={4} style={{ marginTop: 24 }}>
                                    <button
                                        className="btn btn-outline-primary btn-margin newButton"
                                        style={{ marginRight: 10 }}
                                        id="submitbtn2"
                                        onClick={() => searchCHA(chaSearchId)}
                                    >
                                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                        Search
                                    </button>
                                    <button
                                        className="btn btn-outline-danger btn-margin newButton"
                                        style={{ marginRight: 10 }}
                                        id="submitbtn2"
                                        onClick={clearSearch}
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
                                            <th scope="col">Party ID</th>
                                            <th scope="col">Party Name</th>
                                            <th scope="col">GST No</th>
                                         
                                            <th scope="col">State </th>
                                            <th scope="col">Sr No</th>
                                            <th scope="col">Party Type</th>
                                            <th scope="col">BONDNOC_WEEK</th>
                                           
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
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <input type="radio" name="radioGroup" onChange={() => selectIGMSearchRadio(item.partyId, item.createdBy, item[6], item[10], item[12], item[13], item[14], item[15])} value={item[0]} />
                                                </td>
                                                <td>{item.partyId}</td>
                                                <td>{item.partyName}</td>
                                                <td>{item.createdBy}</td>
                                                <td>{item.editedBy}</td>
                                                <td>{item.approvedBy}</td>
                                                <td>{item.partyType}</td>
                                                <td>{item.bondnocWeek}</td>
                                               
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
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                CHA Code
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="chaCode"
                  maxLength={15}
                  name="chaCode"
                  value={noc.chaCode}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="igmNo">
                IGM No <span className="error-message">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="igmNo"
                  maxLength={10}
                  name="igmNo"
                  value={noc.igmNo}
                  onChange={handleNocChange}
                />
 <div style={{ color: 'red' }} className="error-message">{nocErrors.igmNo}</div>
              </FormGroup>
             
            </Col>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="igmLineNo">
                Line No <span className="error-message">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="igmLineNo"
                  maxLength={10}
                  name="igmLineNo"
                  value={noc.igmLineNo}
                  onChange={handleNocChange}
                />
                   <div style={{ color: 'red' }} className="error-message">{nocErrors.igmLineNo}</div>
              </FormGroup>
           
            </Col>
          </Row>
          <Row>
          <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                IGM Date <span className="error-message">*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={noc.igmDate}
                    // onChange={(date) => {
                    //   setSelectedDate(date);
                    //   setNOC((prevNoc) => ({
                    //     ...prevNoc,
                    //     igmDate: date,
                    //   }));
                    // }}
                    onChange={(date) => {
                         setNOC((prevNoc) => ({
                           ...prevNoc,
                           igmDate: date,
                         }));
                    
                      setNocErrors((prevErrors) => ({
                        ...prevErrors,
                        igmDate: "",
                      }));
                    }}
                    value={noc.igmDate}
                    id="igmDate"
                    name="igmDate"
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
                <div style={{ color: 'red' }} className="error-message">{nocErrors.igmDate}</div>
              </FormGroup>
              
            </Col>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                BE No <span className="error-message">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="boeNo"
                  maxLength={15}
                  name="boeNo"
                  value={noc.boeNo}
                  onChange={handleNocChange}
                />
                <div style={{ color: 'red' }} className="error-message">{nocErrors.boeNo}</div>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="boeDate">
                BE Date <span className="error-message">*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                     selected={noc.boeDate}
                    //  onChange={(date) => {
                    //    setSelectedDate(date);
                    //    setNOC((prevNoc) => ({
                    //      ...prevNoc,
                    //      boeDate: date,
                    //    }));
                    //  }}

                    onChange={(date) => {
                      // setSelectedDate(date);
                         setNOC((prevNoc) => ({
                           ...prevNoc,
                           boeDate: date,
                         }));
                    
                      setNocErrors((prevErrors) => ({
                        ...prevErrors,
                        boeDate: "",
                      }));
                    }}
                    
                    //   onChange={handleDocDate}
                    id="boeDate"
                    value={noc.boeDate}
                    name="boeDate"
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
                <div style={{ color: 'red' }} className="error-message">{nocErrors.boeDate}</div>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="importerName">
                Importer <span className="error-message">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="importerName"
                  maxLength={15}
                  name="importerName"
                  value={noc.importerName}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
<div style={{ color: 'red' }} className="error-message">{nocErrors.importerName}</div>
              </FormGroup>
            </Col>
            <Col md={1} style={{marginTop:23}}>
            <button
                                className="btn btn-outline-primary btn-margin newButton"
                                style={{ marginRight: 10 }}
                                id="submitbtn2"
                                onClick={openImporterearchModal}

                            >
                                <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                    
                            </button>
            </Col>

            <Modal Modal isOpen={isModalOpenForImporterSearch} onClose={closeImporterSearchModal} toggle={closeImporterSearchModal} style={{ maxWidth: '1200px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>
                        <ModalHeader toggle={closeImporterSearchModal} style={{
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
                            /> Search IGM</h5>

                        </ModalHeader>
                        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
                            <Row>
                                <Col md={4}>
                                    <FormGroup>
                                        <label className="forlabel bold-label" htmlFor="sbRequestId">
                                            Search by Party Id / Party Name /GST No / State / iecCode
                                        </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="importerSearchId"
                                            maxLength={15}
                                            name='importerSearchId'
                                            value={importerSearchId}
                                            onChange={(e) => setImporterSearchId(e.target.value)}
                                        />

                                    </FormGroup>
                                </Col>
                                <Col md={4} style={{ marginTop: 24 }}>
                                    <button
                                        className="btn btn-outline-primary btn-margin newButton"
                                        style={{ marginRight: 10 }}
                                        id="submitbtn2"
                                        onClick={() => searchImporter(importerSearchId)}
                                    >
                                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                                        Search
                                    </button>
                                    <button
                                        className="btn btn-outline-danger btn-margin newButton"
                                        style={{ marginRight: 10 }}
                                        id="submitbtn2"
                                        onClick={clearSearchImporter}
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
                                            <th scope="col">Party ID</th>
                                            <th scope="col">Party Name</th>
                                            <th scope="col">GST No</th>
                                         
                                            <th scope="col">State </th>
                                            <th scope="col">Sr No</th>
                                            <th scope="col">Address1</th>
                                            <th scope="col">Address2</th>
                                            <th scope="col">Address3</th>
                                           
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
                                                    <input type="radio" name="radioGroup" onChange={() => selectImporterSearchRadio(item.partyId, item.pin, item[6], item[10], item[12], item[13], item[14], item[15])} value={item[0]} />
                                                </td>
                                                <td>{item.partyId}</td>
                                                <td>{item.partyName}</td>
                                                <td>{item.gstNo}</td>
                                                <td>{item.state}</td>
                                                <td>{item.pin}</td>
                                                <td>{item.address1}</td>
                                                <td>{item.address2}</td>
                                                <td>{item.address3}</td>
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
          </Row>
          <Row>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="shift">
                Shift
                </label>
                <select
                  className="form-control"
                  id="shift"
                  name="shift"
                  value={noc.shift}
                  onChange={(e) =>
                    setNOC((prevNOC) => ({
                      ...prevNOC,
                      shift: e.target.value
                    }))
                  }
                  

                >
                  <option value="DAY">DAY</option>
                  <option value="NIGHT">NIGHT</option>
                </select>
              </FormGroup>
            </Col>
            {/* <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                Profitcentre
                </label>
                <Select
                  placeholder="Select..."
                  isClearable
                  id="profitcentreId"
                  name="profitcentreId"
                  value={noc.profitcentreId}
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
              </FormGroup>
            </Col> */}


<Col md={3}>
      <FormGroup>
        <label className="forlabel bold-label" htmlFor="profitcentreId">
          Profitcentre
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
            control: (provided) => ({
              ...provided,
              border: "1px solid #ccc",
              boxShadow: "none",
              "&:hover": {
                border: "1px solid #ccc",
              },
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
      </FormGroup>
    </Col>
            <Col md={3}>
             
            </Col>

            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                Marks & Nos <span className="error-message">*</span>
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
            <Col md={3}>
            <FormGroup>
                <label className="forlabel bold-label" htmlFor="importerAddress1">
                Importer Address1 <span className="error-message">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="importerAddress1"
                  maxLength={15}
                  name="importerAddress1"
                  value={noc.importerAddress1}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
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
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
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
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="grossWeight">
                Gross Wt <span className="error-message">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="grossWeight"
                  name="grossWeight"
                  value={noc.grossWeight}
                  onChange={handleNocChange}
                  maxLength={15}
                />
                <div style={{ color: 'red' }} className="error-message">{nocErrors.grossWeight}</div>
              </FormGroup>
            </Col>
          </Row>

          <Row>
          <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="spaceType">
                Space Type
                </label>
                <select
                  className="form-control"
                  id="spaceType"
                  name="spaceType"
                  value={noc.spaceType}
                  onChange={(e)=> setNOC((noc)=>({
...noc,
spaceType:e.target.value,
                  }))}
                >
                  <option value="General">General</option>
                  <option value="Reserved">Reserved</option>
                </select>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="uom">
                UOM <span className="error-message">*</span>
                </label>
                <select
                  className="form-control"
                  id="uom"
                  name="uom"
                  value={noc.uom}
                  // onChange={(e) =>
                  //   setNOC((prevNOC) => ({
                  //     ...prevNOC,
                  //     uom: e.target.value
                  //   }))  
                  // }
                  onChange={(e) => {
                    const { value } = e.target;
                  
                    setNOC((prevNOC) => ({
                      ...prevNOC,
                      uom: value,
                    }));
                  
                    setNocErrors((prevErrors) => ({
                      ...prevErrors,
                      uom: "",
                    }));
                  }}
                  
                >
                   <option value="">Select...</option>
                  <option value="KG">Kilo Gram</option>
                  <option value="G">Gram</option>    
                  <option value="NO">Numbers</option>
                </select>
                <div style={{ color: 'red' }} className="error-message">{nocErrors.uom}</div>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="imoCode">
                IMO Code
                </label>
<input
                  className="form-control"
                  type="text"
                  id="imoCode"
                  maxLength={15}
                  name="imoCode"
                  value={noc.imoCode}
                  onChange={handleNocChange}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="haz">
                Hazardous
                </label>
                <select
                  className="form-control"
                  id="haz"
                  name="haz"
                  value={noc.haz}
onChange={(e) =>
  setNOC((prevNOC) => ({
    ...prevNOC,
    haz: e.target.value,
  }))
}
                >
                  <option value="N">NO</option>
                  <option value="Y">YES</option>
                </select>
              </FormGroup>
            </Col>
          </Row>

          <Row>

          <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="nocPackages">
                No of Packages <span className="error-message">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="nocPackages"
                  maxLength={15}
                  name="nocPackages"
                  value={noc.nocPackages}
                  onChange={handleNocChange}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />

<div style={{ color: 'red' }} className="error-message">{nocErrors.nocPackages}</div>
              </FormGroup>
            </Col>
         
            
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="cifValue">
                Assessable Value <span className="error-message">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="cifValue"
                  maxLength={15}
                  name="cifValue"
                  value={noc.cifValue}
                  onChange={handleNocChange}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="cargoDuty">
                Custom Duty <span className="error-message">*</span>
                </label>

                <input
                  className="form-control"
                  type="text"
                  id="cargoDuty"
                  maxLength={15}
                  name="cargoDuty"
                  value={noc.cargoDuty}
                  onChange={handleNocChange}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="insuranceValue">
                Insurance Value <span className="error-message">*</span>
                </label>

                <input
                  className="form-control"
                  type="text"
                  id="insuranceValue"
                  maxLength={15}
                  name="insuranceValue"
                  value={noc.insuranceValue}
                  readOnly
                    style={{ backgroundColor: "#E0E0E0" }}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
         
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="area">
                Allocated Area <span className="error-message">*</span>
                </label>

                <input
                  className="form-control"
                  type="number"
                  id="area"
                  maxLength={15}
                  name="area"
                  value={noc.area}
                  onChange={handleNocChange}
                />

<div style={{ color: 'red' }} className="error-message">{nocErrors.area}</div>
              </FormGroup>
            </Col>
            <Col md={3} style={{marginTop:25}}>
      <FormGroup>
        <label className="forlabel bold-label " htmlFor="periodicBill">
          Periodic Billing
        </label>
        <input
          type="checkbox"
          className="form-check-input radios"
          style={{ width: 20, height: 20,marginLeft:18 }}
          name="periodicBill"
          id="periodicBill"
          onChange={handleCheckboxChange}
          checked={noc.periodicBill === 'Y'}
        />
      </FormGroup>
    </Col>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="licenceValidDate">
                Licence Valid Date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      setNOC((prevNoc) => ({
                        ...prevNoc,
                        licenceValidDate: date,
                      }));
                    }}
                    //   onChange={handleDocDate}
                    id="licenceValidDate"
                    name="licenceValidDate"
                    dateFormat="dd/MM/yyyy"
                    className="form-control border-right-0 inputField"
                    customInput={<input style={{ width: "100%" }} />}
                    wrapperClassName="custom-react-datepicker-wrapper"
                    readOnly
                    style={{ backgroundColor: "#E0E0E0" }}
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
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                New commodity
                </label>

                <input
                  className="form-control"
                  type="text"
                  id="profitcentreId"
                  maxLength={15}
                  // name="profitcentreId"
                  // value={noc.profitcentreId}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
              </FormGroup>
            </Col>
          </Row>



          <Row>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="comments">
                Remarks
                </label>

                <input
                  className="form-control"
                  type="text"
                  id="comments"
                  maxLength={225}
                  name="comments"
                  value={noc.comments}
                 onChange={handleNocChange}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="noOf20FT">
                No of 20 FT Containers
                </label>

                <input
                  className="form-control"
                  type="text"
                  id="noOf20FT"
                  maxLength={15}
                  name="noOf20FT"
                  value={noc.noOf20FT}
                 onChange={handleNocChange}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="noOf40FT">
                No of 40 FT Containers
                </label>

                <input
                  className="form-control"
                  type="text"
                  id="noOf40FT"
                  maxLength={15}
                  name="noOf40FT"
                  value={noc.noOf40FT}
                 onChange={handleNocChange}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="gateNo">
                Cargo Source
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="profitcentreId"
                  maxLength={15}
                  // name="profitcentreId"
                  // value={noc.profitcentreId}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
              </FormGroup>
            </Col>
          </Row>



          <Row>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                Forwarder
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="profitcentreId"
                  maxLength={15}
                  // name="profitcentreId"
                  // value={noc.profitcentreId}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                Email Id
                </label>

                <input
                  className="form-control"
                  type="text"
                  id="profitcentreId"
                  maxLength={15}
                  // name="profitcentreId"
                  // value={noc.profitcentreId}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                NOC Week
                </label>

                <input
                  className="form-control"
                  type="text"
                  id="nocWeek"
                  maxLength={15}
                  name="nocWeek"
                  value={noc.nocWeek}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
  <FormGroup>
    <label className="forlabel bold-label" htmlFor="gateInType">
      Gate In Type
    </label>
    <select
      className="form-control"
      id="gateInType"
      name="gateInType"
      value={noc.gateInType}
      onChange={(e) =>
        setNOC((prevNOC) => ({
          ...prevNOC,
          gateInType: e.target.value,
        }))
      }
    >
       <option value="container">Container</option>
      <option value="cargo">Cargo</option>
    </select>
  </FormGroup>
</Col>

          </Row>

        </div>
        <hr />
        <Row className="text-center">
          <Col>
        
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
            </button>    <button
              className="btn btn-outline-primary btn-margin newButton"
              style={{ marginRight: 10 }}
              id="submitbtn2"
              onClick={handleSave}
            >
              <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
              Save
            </button>

{noc.status ==="A" ?
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
            
          </Col>
        </Row>
        <hr />
       
        <Row className="text-end">
        <Col>
          <button
            className="btn btn-outline-primary btn-margin newButton"
            style={{ marginRight: 10 }}
            id="submitbtn2"
            onClick={handleOpenModal}
          >
            <FontAwesomeIcon icon={faAdd} style={{ marginRight: "5px" }} />
            Add Details
          </button>
        </Col>
      </Row>
      <Modal isOpen={modal} toggle={handleOpenModal} style={{ maxWidth: '999px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>
        <ModalHeader toggle={handleOpenClose} 
        style={{
          backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
          boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
          border: '1px solid rgba(0, 0, 0, 0.3)',
          borderRadius: '0',
          backgroundImage: 'radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          //backgroundPosition: 'center',
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
            <label className="forlabel bold-label" htmlFor="nocPackages">
                No Of Packages <span className="error-message">*</span> 
                </label>
              <input
               className="form-control"
                type="number"
                name="nocPackages"
                id="nocPackages"
                value={nocDtl.nocPackages}
                onChange={handleInputChange}
              />

<div style={{ color: 'red' }} className="error-message">{nocDtlErrors.nocPackages}</div>
            </FormGroup>
                  </Col>
 <Col md={4}>
      <FormGroup>
        <label className="forlabel bold-label" htmlFor="typeOfPackage">
          Type Of Packages <span className="error-message">*</span>
        </label>
        <Select
          placeholder="Select Packages"
          isClearable
          id="typeOfPackage"
          name="typeOfPackage"
          value={options.find(option => option.value === setSelectedTypeOfPackages)}
          onChange={handleChange}
          options={options}
          styles={{
            control: (provided, state) => ({
              ...provided,
              border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
              boxShadow: "none",
              "&:hover": {
                border: "1px solid #ccc",
              },
            }),
            indicatorSeparator: () => ({
              display: "none",
            }),
            dropdownIndicator: () => ({
              display: "none",
            }),
            placeholder: (provided) => ({
              ...provided,
              color: "gray",
              fontSize: "16px", // Adjust font size here
            }),
            singleValue: (provided) => ({
              ...provided,
              fontSize: "16px", // Adjust font size here
            }),
            option: (provided) => ({
              ...provided,
              fontSize: "16px", // Adjust font size here
            }),
          }}
        />
        <div style={{ color: 'red' }} className="error-message">{nocDtlErrors.typeOfPackage}</div>
      </FormGroup>
    </Col>
                  <Col md={4}>
                  <FormGroup>
            <label className="forlabel bold-label" htmlFor="cifValue">
            CIF Value <span className="error-message">*</span> 
                </label>
             
              <input
               className="form-control"
                type="number"
                name="cifValue"
                id="cifValue"
                value={nocDtl.cifValue}
                onChange={handleInputChange}
              />
                 <div style={{ color: 'red' }} className="error-message">{nocDtlErrors.cifValue}</div>
            </FormGroup>
                  </Col>
                </Row>
            

       
     <Row>
      <Col md={4}>
      <FormGroup>
            <label className="forlabel bold-label" htmlFor="cargoDuty">
            Cargo Duty <span className="error-message">*</span> 
                </label>
             
              <input
               className="form-control"
                type="number"
                name="cargoDuty"
                id="cargoDuty"
                value={nocDtl.cargoDuty}
                onChange={handleInputChange}
              />
               <div style={{ color: 'red' }} className="error-message">{nocDtlErrors.cargoDuty}</div>
            </FormGroup>
      </Col>

      <Col md={4}>
      <FormGroup>
              <label className="forlabel bold-label" htmlFor="insuranceValue">
              Insurance Value <span className="error-message">*</span> 
                </label>
              <input
               className="form-control"
                type="number"
                name="insuranceValue"
                id="insuranceValue"
                readOnly
                style={{ backgroundColor: "#E0E0E0" }}
                value={nocDtl.insuranceValue}
                onChange={handleInputChange}
              />
               <div style={{ color: 'red' }} className="error-message">{nocDtlErrors.insuranceValue}</div>
            </FormGroup>
        </Col>

        <Col md={4}>
        <FormGroup>
              <label className="forlabel bold-label" htmlFor="commodityDescription">
              Commodity Description <span className="error-message">*</span> 
                </label>
              <input
               className="form-control"
                type="textarea"
                name="commodityDescription"
                id="commodityDescription"
                value={nocDtl.commodityDescription}
                onChange={handleInputChange}
                maxLength={250}
              />
               <div style={{ color: 'red' }} className="error-message">{nocDtlErrors.commodityDescription}</div>
            </FormGroup>
        </Col>
      </Row>
          </Form>
        </ModalBody>
        <ModalFooter>
        <button  className="btn btn-outline-primary btn-margin newButton"
                style={{ marginRight: 10 }} type="submit"
                onClick={handleSubmit}> <FontAwesomeIcon icon={faSave} style={{marginRight:4}}></FontAwesomeIcon>
              Save
            </button>
            {/* <button   className="btn btn-outline-danger btn-margin newButton"
              style={{ marginRight: 10 }}  onClick={handleClose}>
            <FontAwesomeIcon icon={faRefresh} style={{marginRight:4}}></FontAwesomeIcon> Clear
            </button> */}
        </ModalFooter>
      </Modal>
          <hr />
     
        <div
          className="table-responsive"
          style={{ maxHeight: "400px", overflowY: "auto", paddingTop: 18 }}
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
                 CIF Value
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Cargo Value
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                 Insurance Value	
                </th>
                {/* <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                 Action
                </th> */}
              </tr>
            </thead>
            <tbody>
            {cfbondnocDtl.map((dtl, index) => (
            <tr key={index} className="text-center">
              <th scope="row">{index + 1}</th>
              <td>{dtl.commodityDescription}</td>
              <td>{dtl.typeOfPackage}</td>
              <td>{dtl.nocPackages}</td>
              <td>{dtl.cifValue}</td>
              <td>{dtl.cargoDuty}</td>
              <td>{dtl.insuranceValue}</td>
              {/* <td>
                <button
                  onClick={() => handleEdit(dtl.cfBondDtlId,dtl.nocTransId,dtl.nocNo)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <FontAwesomeIcon icon={faEdit} style={{ marginRight: '8px', color: 'blue' }} />
                </button>
                <button
                  onClick={() => handleDelete(dtl.cfBondDtlId,dtl.nocTransId,dtl.nocNo)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} />
                </button>
              </td> */}
            </tr>
          ))}
            </tbody>
          </table>
        </div>
        </CardBody>
    </Card>
      </div>


  
    </>
  );
}

export default NoObjectionCertifacate;
