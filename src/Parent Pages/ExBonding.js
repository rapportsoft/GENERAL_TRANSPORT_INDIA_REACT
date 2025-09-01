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
  faPlaneArrival,
  faXmark,
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
import { SystemUpdateOutlined } from "@mui/icons-material";
// import { format } from "date-fns";

function ExBonding({acttab,listOfData,listOfExbond,flag,onRequest}) {
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

  const [exbondFlag, setExBondFlag] = useState("add");

  const initialExBond = {
    companyId: "",
    branchId: "",
    finYear: "",
    inBondingId: "",
    exBondingId: "",
    exBondingDate: new Date(),
    profitcentreId: "N00003",
    nocTransId: "",
    nocNo: "",
    nocValidityDate: "",
    boeNo: "",
    inBondedPackages: "",
    bondingNo: "",
    bondingDate: "",
    exBondBeNo: "",
    exBondBeDate: "",
    inBondingId: "",
    inBondingDate: "",
    invoiceUptoDate: "",
    accSrNo: "",
    onAccountOf: "",
    chaSrNo: "",
    cha: "",
    shift: "DAY",
    commodityDescription: "",
    grossWeight: "",
    inBondedGw: "",
    exBondedGw: "",
    remainingGw: "",
    balanceGw: "",
    numberOfMarks: "",
    uom: "",
    periodicBill: "",
    nocPackages: "",
    areaOccupied: "",
    areaReleased: "",
    areaBalanced: "",
    areaRemaining: "",
    inBondedPackages: "",
    exBondedPackages: "",
    remainingPackages: "",
    balancedQty: "",
    balancedPackages: "",
    qtyTakenOut: 0,
    spaceAllocated: "",
    cifValue: "",
    inBondedCif: "",
    exBondedCif: "",
    remainingCif: "",
    balanceCif: "",
    inBondedCargoDuty: "",
    exBondedCargoDuty: "",
    remainingCargoDuty: "",
    balanceCargoDuty: "",
    inBondedInsurance: "",
    exBondedInsurance: "",
    remainingInsurance: "",
    balanceInsurance: "",
    cifQty: "",
    exBondNo: "",
    exBondDate: "",
    noOf20Ft: "",
    noOf40Ft: "",
    comments: "",
    giTransporterStatus: "",
    giTransporter: "",
    giTransporterName: "",
    giVehicleNo: "",
    giDriverName: "",
    gateOutId: "",
    gateOutDate: "",
    billingParty: "",
    igst: "",
    cgst: "",
    sgst: "",
    sez: "",
    impSrNo: "",
    importerId: "",
    importerName: "",
    status: "",
    createdBy: "",
    createdDate: "",
    editedBy: "",
    editedDate: "",
    approvedBy: "",
    blockMoveAllow: "",
    approvedDate: "",
    spaceType: "General",
    gateInType: "Container",
    invoiceNo: "",
    ssrTransId: "",
    section60: "",
    igmNo: "",
    igmLineNo: "",
    exBondType: "EXB",
    sbNo: "",
    sbDate: "",
    sbValue: "",
    sbDuty: "",
    sbQty: "",
    trnsferBondNo: "",
    trnsferBondDate: "",
    section49:"",
  };

  const initialNocDtl = {
    companyId: companyid, // String
    branchId: branchId, // String
    nocTransId: "", // String
    nocNo: "", // String
    cfBondDtlId: "", // String
    boeNo: "", // String
    gateInPackages: "0",
    CfbondDetailDate: null, // Date (use null or a Date object if you prefer)
    nocPackages: null, // BigDecimal (use null or a number)
    cifValue: null, // BigDecimal (use null or a number)
    cargoDuty: null, // BigDecimal (use null or a number)
    insuranceValue: null, // BigDecimal (use null or a number)
    grossWeight: "",
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

  const [isModalOpenForExbondSearch, setisModalOpenForExbondSearch] =
    useState(false);
  const openExbondSearchModal = () => {
    setisModalOpenForExbondSearch(true);
    searchCfexbondCrgHDR("");
  };

  const closeExbondSearchModal = () => {
    setisModalOpenForExbondSearch(false);
    setExbondSearchId("");
    setCHASearchedData([]);
  };

  const [exbondSearchId, setExbondSearchId] = useState("");

  const searchCfexbondCrgHDR = (id) => {
    setLoading(true);
    axios
      .get(
        `${ipaddress}api/cfexbondcrg/exbondSearch?companyId=${companyid}&branchId=${branchId}&partyName=${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        setCHASearchedData(response.data);
        setLoading(false);
        setCurrentPage(1);

        console.log("response.data", response.data);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const clearSearchExbond = () => {
    setExbondSearchId("");
    searchCfexbondCrgHDR("");
  };

  useEffect(() => {
    if(acttab == "P00251")
      {
       if (listOfData.nocTransId && listOfData.nocNo && listOfData.boeNo && listOfExbond.exBondingId && listOfExbond.inBondingId) {
        selectExbondSearchRadio(listOfData.nocTransId,listOfData.nocNo,listOfExbond.exBondingId,listOfExbond.inBondingId );
       }
       else
       {
        getBoeData(listOfData.boeNo);
       }
       if(flag)
       {
        handleClear();
       }
      }
   }, [listOfData.nocTransId,listOfData.nocNo,listOfExbond.inBondingId,listOfExbond.exBondingId,acttab]);

  const selectExbondSearchRadio = (trasid, nocNo, exBondingId, inbondingId) => {
    closeExbondSearchModal();
    axios
      .get(
        `${ipaddress}api/cfexbondcrg/getDataOfExbond?companyId=${companyid}&branchId=${branchId}&nocTransId=${trasid}&nocNo=${nocNo}&exBondingId=${exBondingId}&inBondingId=${inbondingId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        setExBondFlag("edit");
        console.log("getDataByPartyIdAndGstNohhhhhhhhhhhhhhh_______________________", data);
        setExBond(data);
        setIsoName(data.boeNo);
        setExBond((pre) => ({
          ...pre,
          giTransporterName: response.data.giTransporterName,
        }));
        console.log(
          "response.data.inBondedPackages",
          response.data.inBondedPackages
        );
        //         setExBond((exBond) => ({
        //           ...exBond,
        //           inBondedCargoDuty:response.data.cargoDuty,
        //           inBondedCif:response.data.cifValue,
        //           inBondedGw:response.data.inbondGrossWt,
        //          inBondingId:response.data.inBondingId,
        // bondingNo:response.data.bondingNo,
        // boeNo:response.data.boeNo,
        // boeDate:response.data.boeDate,
        // nocNo:response.data.nocNo,
        // nocTransId:response.data.nocTransId,
        // nocDate:response.data.nocNo,
        // igmNo:response.data.igmNo,
        // igmLineNo:response.data.igmLineNo,
        // igmDate:response.data.igmDate,
        // inBondingDate:response.data.inBondingDate,
        // inBondedPackages:response.data.inBondedPackages - response.data.exBondedPackages,
        // inBondedInsurance:response.data.inbondInsuranceValue,
        // insuranceValue:response.data.insuranceValue,
        // bondingDate:response.data.bondingDate,
        // nocValidityDate:response.data.nocValidityDate,
        // areaOccupied:response.data.areaOccupied,

        // remainingPackages : response.data.inBondedPackages - response.data.exBondedPackages,

        // areaRemaining: (response.data.inBondedPackages - response.data.exBondedPackages) * (response.data.areaOccupied) / response.data.inBondedPackages,

        // remainingCif :(response.data.inBondedPackages - response.data.exBondedPackages) * (response.data.cifValue) /response.data.inBondedPackages,

        // remainingCargoDuty :(response.data.inBondedPackages - response.data.exBondedPackages) * (response.data.cargoDuty) /response.data.inBondedPackages,

        // remainingInsurance :(response.data.inBondedPackages - response.data.exBondedPackages * response.data.cifValue /response.data.inBondedPackages + response.data.inBondedPackages) - (response.data.exBondedPackages * response.data.cargoDuty /response.data.inBondedPackages),

        // remainingGw : response.data.inbondGrossWt -response.data.exBondedGw,
        // remainingInsurance:response.data.inbondInsuranceValue -response.data.exBondedInsurance,
        //         }));

        setChaName(response.data.chaName);
        setImpName(response.data.importerName);
        setBondingErrors((prevErrors) => ({
          ...prevErrors,
          cha: "",
        }));

        fetchDataAfterSave(
          companyid,
          branchId,
          response.data.nocTransId,
          response.data.nocNo,
          response.data.inBondingId,
          response.data.boeNo,
          response.data.exBondingId
        );
      })
      .catch((error) => {});
  };

  const [isModalOpenForIGMSearch, setisModalOpenForIGMSearch] = useState(false);
  const openIGMSearchModal = () => {
    setisModalOpenForIGMSearch(true);
    searchCfinbondCrgHDR("");
  };

  const closeIGMSearchModal = () => {
    setisModalOpenForIGMSearch(false);
    setChaSearchId("");
    setCHASearchedData([]);
  };

  const [chaSearchId, setChaSearchId] = useState("");
  const [chaSearchedData, setCHASearchedData] = useState([]);

  const searchCfinbondCrgHDR = (id) => {
    setLoading(true);
    axios
      .get(
        `${ipaddress}api/cfinbondcrg/searchHdr?companyId=${companyid}&branchId=${branchId}&partyName=${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        setCHASearchedData(response.data);
        setLoading(false);
        setCurrentPage(1);

        console.log("response.data", response.data);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const clearSearch = () => {
    setChaSearchId("");
    searchCfinbondCrgHDR("");
  };
  const [chaName, setChaName] = useState("");

  const selectIGMSearchRadio = (
    trasid,
    inbondingId,
    nocNo,

    shippingAgentCode
  ) => {
    closeIGMSearchModal();
    axios
      .get(
        `${ipaddress}api/cfinbondcrg/getDataByTransIdANDNocIDAndInBondingHdrId?companyId=${companyid}&branchId=${branchId}&nocTransID=${trasid}&inBondingId=${inbondingId}&nocNo=${nocNo}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        setExBondFlag("add");
        console.log("getDataByPartyIdAndGstNohhhhhhhhhhhhhhh", data);

        console.log(
          "response.data.inBondedPackages",
          response.data.inBondedPackages
        );
        setExBond((exBond) => ({
          ...exBond,
          inBondedCargoDuty: response.data.cargoDuty,
          inBondedCif: response.data.cifValue,
          inBondedGw: response.data.inbondGrossWt,
          inBondingId: response.data.inBondingId,
          bondingNo: response.data.bondingNo,
          boeNo: response.data.boeNo,
          boeDate: response.data.boeDate,
          nocNo: response.data.nocNo,
          nocTransId: response.data.nocTransId,
          nocDate: response.data.nocNo,
          igmNo: response.data.igmNo,
          igmLineNo: response.data.igmLineNo,
          igmDate: response.data.igmDate,
          inBondingDate: response.data.inBondingDate,
          // inBondedPackages:
          //   response.data.inBondedPackages - response.data.exBondedPackages,
          inBondedPackages:
          response.data.inBondedPackages,
          inBondedInsurance: response.data.inbondInsuranceValue,
          insuranceValue: response.data.insuranceValue,
          bondingDate: response.data.bondingDate,
          nocValidityDate: response.data.nocValidityDate,
          areaOccupied: response.data.areaOccupied,

          remainingPackages:
            response.data.inBondedPackages - response.data.exBondedPackages,

          areaRemaining:
            ((response.data.inBondedPackages - response.data.exBondedPackages) *
              response.data.areaOccupied) /
            response.data.inBondedPackages,

          remainingCif:
            ((response.data.inBondedPackages - response.data.exBondedPackages) *
              response.data.cifValue) /
            response.data.inBondedPackages,

          remainingCargoDuty:
            ((response.data.inBondedPackages - response.data.exBondedPackages) *
              response.data.cargoDuty) /
            response.data.inBondedPackages,

          remainingInsurance:
            response.data.inBondedPackages -
            (response.data.exBondedPackages * response.data.cifValue) /
              response.data.inBondedPackages +
            response.data.inBondedPackages -
            (response.data.exBondedPackages * response.data.cargoDuty) /
              response.data.inBondedPackages,

          remainingGw: response.data.inbondGrossWt - response.data.exBondedGw,
          remainingInsurance:
            response.data.inbondInsuranceValue -
            response.data.exBondedInsurance,
        }));

        setChaName(response.data.commodityDescription);
        setBondingErrors((prevErrors) => ({
          ...prevErrors,
          cha: "",
        }));

        fetchData(
          companyid,
          branchId,
          response.data.nocTransId,
          response.data.nocNo,
          response.data.inBondingId,
          response.data.boeNo
        );
      })
      .catch((error) => {});
  };

  const [isModalOpenForImporterSearch, setisModalOpenForImporterSearch] =
    useState(false);
  const openImporterearchModal = () => {
    setisModalOpenForImporterSearch(true);
    searchImporter("");
  };

  const closeImporterSearchModal = () => {
    setisModalOpenForImporterSearch(false);
    setImporterSearchId("");
    setImporterSearchedData([]);
    setCHASearchedData([]);
  };

  const [importerSearchId, setImporterSearchId] = useState("");
  const [importerSearchedData, setImporterSearchedData] = useState([]);

  const searchImporter = (id) => {
    setLoading(true);
    axios
      .get(
        `${ipaddress}api/cfbondnoc/searchImporters?companyId=${companyid}&branchId=${branchId}&partyName=${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        setImporterSearchedData(response.data);
        setCHASearchedData(response.data);
        setLoading(false);
        setCurrentPage(1);

        console.log("response.data", response.data);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const clearSearchImporter = () => {
    setImporterSearchId("");
    searchImporter("");
  };

  const selectImporterSearchRadio = (
    partyId,
    gstNo,
    portName,
    vesselName,
    shippingLineName,
    shippingLineCode,
    shippingAgentName,
    shippingAgentCode
  ) => {
    closeImporterSearchModal();
    axios
      .get(
        `${ipaddress}api/cfbondnoc/getDataByPartyIdAndGstNoForImporter?companyId=${companyid}&branchId=${branchId}&partyId=${partyId}&gstNo=${gstNo}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;

        console.log("getDataByPartyIdAndGstNo", data);

        setExBond((exBond) => ({
          ...exBond,
          importerId: response.data.partyId,
          giTransporterName: response.data.partyName,
          // importerAddress1: response.data.address1,
          // importerAddress3: response.data.address2,
          // importerAddress2: response.data.address3,
        }));

        setBondingErrors((prevErrors) => ({
          ...prevErrors,
          importerName: "",
        }));
      })
      .catch((error) => {});
  };

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

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const [exBond, setExBond] = useState(initialExBond);
  const [nocDtl, setNocDtl] = useState(initialNocDtl);

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

  const handleNocChange = (e,val,val1) => {
    const { name, value } = e.target;

    let newValue =value;
    if(['areaOccupied','inBondedGw','inBondedCif','inBondedCargoDuty','inBondedInsurance','areaRemaining',
    'remainingGw','remainingCif','remainingCargoDuty','remainingInsurance','areaBalanced','balanceCif','balanceCargoDuty','balanceInsurance','balanceGw','areaReleased','exBondedGw','exBondedCif','exBondedCargoDuty','exBondedInsurance'
  ].includes(name))
    {
      newValue =handleInputChangeNew(value,val,val1)
    }
    setExBond((prevNOC) => {
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

    document.getElementById(name).classList.remove("error-border");
    setBondingErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleDocDateChange = (date) => {
    setExBond((prevNoc) => ({
      ...prevNoc,
      nocFromDate: date,
    }));

    setExBond((prevNoc) => ({
      ...prevNoc,
      nocValidityDate: "",
    }));

    document.getElementById("nocFromDate").classList.remove("error-border");
    setBondingErrors((prevErrors) => ({
      ...prevErrors,
      nocFromDate: "",
    }));
  };

  const handleNocTransDate = (date) => {
    setExBond((prevNoc) => ({
      ...prevNoc,
      nocTransDate: date,
    }));
    //   document.getElementById("nocFromDate").classList.remove('error-border');
    //   setBondingErrors((prevErrors) => ({
    //     ...prevErrors,
    //     nocFromDate: "",
    // }));
  };

  const handleNocValidityDateChnage = (date) => {
    setExBond((prevNoc) => ({
      ...prevNoc,
      exBondingDate: date,
    }));
    document.getElementById("exBondingDate").classList.remove("error-border");
    setBondingErrors((prevErrors) => ({
      ...prevErrors,
      exBondingDate: "",
    }));
  };

  const handleExbondBeDateChnage = (date) => {
    setExBond((prevNoc) => ({
      ...prevNoc,
      exBondBeDate: date,
    }));
    document.getElementById("exBondBeDate").classList.remove("error-border");
    setBondingErrors((prevErrors) => ({
      ...prevErrors,
      exBondBeDate: "",
    }));
  };


  const handleSBDateChange = (date) => {
    setExBond((prevNoc) => ({
      ...prevNoc,
      sbDate: date,
    }));
    document.getElementById("sbDate").classList.remove("error-border");
    setBondingErrors((prevErrors) => ({
      ...prevErrors,
      sbDate: "",
    }));
  };

  const handleTransferBondDateChange = (date) => {
    setExBond((prevNoc) => ({
      ...prevNoc,
      trnsferBondDate: date,
    }));
    document.getElementById("trnsferBondDate").classList.remove("error-border");
    setBondingErrors((prevErrors) => ({
      ...prevErrors,
      trnsferBondDate: "",
    }));
  };


  

  const handleCheckboxChange = (e) => {
    setExBond((prevNOC) => ({
      ...prevNOC,
      periodicBill: e.target.checked ? "Y" : "N",
    }));
  };

  const [bondingErrors, setBondingErrors] = useState({
    exBondingDate: "",
    exBondBeNo: "",
    exBondBeDate: "",
    shift: "",
    importerName: "",
    cha: "",
  });

  const [nocDtlErrors, setNocDtlErrors] = useState({
    nocPackages: "",
    typeOfPackage: "",
    cifValue: "",
    cargoDuty: "",
    insuranceValue: "",
    commodityDescription: "",
    grossWeight: "",
  });

  const [isModalOpenForFWRSearch, setisModalOpenForFWDSearch] = useState(false);
  const openFWDearchModal = () => {
    setisModalOpenForFWDSearch(true);
    searchFWD("");
  };

  const closeFWDSearchModal = () => {
    setisModalOpenForFWDSearch(false);
    setFWDSearchId("");
    setCHASearchedData([]);
  };

  const [fwdSearchId, setFWDSearchId] = useState("");
  const searchFWD = (id) => {
    setLoading(true);
    axios
      .get(
        `${ipaddress}api/cfexbondcrg/getALLForworder?companyId=${companyid}&branchId=${branchId}&partyName=${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        setCHASearchedData(response.data);
        setLoading(false);
        setCurrentPage(1);

        console.log("response.data", response.data);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const clearSearchFWD = () => {
    setFWDSearchId("");
    searchFWD("");
  };

  const selectFWDSearchRadio = (partyId) => {
    console.log("party _____________________", partyId);
    axios
      .get(
        `${ipaddress}api/cfexbondcrg/getDataOfForworder?companyId=${companyid}&branchId=${branchId}&partyId=${partyId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        console.log("getDataByPartyIdAndGstNo", data[0][0]);
        setExBond({
          ...exBond,
          importerId: data[0][0],
          importerName: data[0][1],
        });
        closeFWDSearchModal();
        setBondingErrors((prevErrors) => ({
          ...prevErrors,
          importerName: "",
        }));
      })
      .catch((error) => {});
  };

  const handleSave = () => {
    setLoading(true);
    let errors = {};

    if(exBond.status === 'A')
    {
      setLoading(false);
      toast.info("Record is alredy approved.", {
          autoClose: 1000
      })
      return;
    }
    if(exBond.status === 'N')
    {
      setLoading(false);
      toast.info("Record is alredy saved go for approve.", {
          autoClose: 1000
      })
      return;
    }
    if (selectedRows.length === 0) {
      toast.error(
        "Commodity not selected. Please select commodity to add...",
        {
          // ... (toast options)
        }
      );
      setLoading(false);
      return;
    }

    if (!exBond.exBondingDate) {
      errors.exBondingDate = "Ex-Bonding date is required.";
      document.getElementById("exBondingDate").classList.add("error-border");
      toast.error("Ex-Bonding date is required.", {
        // ... (toast options)
      });
      setLoading(false);
      return;
    }
    if (!exBond.exBondBeDate) {
      errors.exBondBeDate = "ExBond BE Date is required.";
      document.getElementById("exBondBeDate").classList.add("error-border");
      toast.error("ExBond BE Date is required.", {});
      setLoading(false);
      return;
    }

    if (!exBond.exBondBeNo) {
      errors.exBondBeNo = "ExBond BE No is required.";
      document.getElementById("exBondBeNo").classList.add("error-border");
      toast.error("ExBond BE No is required.", {});
      setLoading(false);
      return;
    }

    if (!exBond.cha) {
      errors.cha = "Cha is required.";
      document.getElementById("cha").classList.add("error-border");
      toast.error("Cha is required.", {});
      setLoading(false);
      return;
    }

    if (!exBond.giTransporterName) {
      errors.giTransporterName = "Importer name is required.";
      document
        .getElementById("giTransporterName")
        .classList.add("error-border");
      toast.error("Importer name is required.", {});
      setLoading(false);
      return;
    }

    let isValid = true;
    const updatedValues = [...inputValues];

    selectedRows.forEach((dtl, index) => {
      if (!updatedValues[index]) {
        updatedValues[index] = {};
      }

      const values = updatedValues[index];
      let errorMessage = "";

      // Check for required fields
      if (!values.exBondedPackages) {
        errorMessage = "Ex Bond Packages is required";
        toast.error("Ex Bond Packages is required.", {
          // ... (toast options)
        });
        setLoading(false);
        isValid = false;
      } else if (parseFloat(values.exBondedPackages) > dtl.inBondedPackages) {
        errorMessage =
          "Ex Bond Packages should not be greater than NOC Packages";
        toast.error(
          "Ex Bond Packages should not be greater than NOC Packages.",
          {
            // ... (toast options)
          }
        );
        setLoading(false);
        isValid = false;
      }
      if (!values.exBondyardPackages) {
        errorMessage = "Ex Bond Yard Packages is required";
        toast.error("Ex Bond Yard Packages is required.", {
          // ... (toast options)
        });
        setLoading(false);
        isValid = false;
      } else if (parseFloat(values.exBondyardPackages) > values.exBondedPackages ) {
        errorMessage =
          "Ex Bond Yard Packages should not be greater than exBondedPackages";
        toast.error(
          "Ex Bond Yard Packages should not be greater than exBondedPackages.",
          {
            // ... (toast options)
          }
        );
        setLoading(false);
        isValid = false;
      }

      if (!values.exBondedCIF) {
        errorMessage = "Ex Bond CIF Value is required";
        toast.error("Ex Bond CIF Value is required.", {
          // ... (toast options)
        });
        setLoading(false);
        isValid = false;
      } else if (parseFloat(values.exBondedCIF) > dtl.inbondCifValue) {
        errorMessage = "In Bond CIF Value should not be greater than CIF Value";
        toast.error("In Bond CIF Value should not be greater than CIF Value.", {
          // ... (toast options)
        });
        setLoading(false);
        isValid = false;
      }

      if (!values.exBondedCargoDuty) {
        errorMessage = "Ex Bond Cargo Duty is required";
        toast.error("Ex Bond Cargo Duty is required.", {
          // ... (toast options)
        });
        setLoading(false);
        isValid = false;
      } else if (parseFloat(values.exBondedCargoDuty) > dtl.inbondCargoDuty) {
        errorMessage =
          "In Bond Cargo Duty should not be greater than Cargo Duty";
        toast.error(
          "In Bond Cargo Duty should not be greater than Cargo Duty.",
          {
            // ... (toast options)
          }
        );
        setLoading(false);
        isValid = false;
      }

      // Automatically calculate inbondInsuranceValue
      updatedValues[index].exBondedInsurance =
        parseFloat(values.exBondedCIF || 0) +
        parseFloat(values.exBondedCargoDuty || 0);

      // Automatically calculate inbondGrossWt
      const perPackageWeight = dtl.inbondGrossWt / dtl.inBondedPackages;
      updatedValues[index].exBondedGW = (
        perPackageWeight * parseFloat(values.exBondedPackages || 0)
      ).toFixed(2);

      updatedValues[index].errorMessage = errorMessage;
    });

    const dataToSave = selectedRows.map((row) => {
      const index = currentItems1.findIndex(
        (item) =>
          item.nocTransId === row.nocTransId &&
          item.nocNo === row.nocNo &&
          item.cfBondDtlId === row.cfBondDtlId &&
          item.inBondingId === row.inBondingId &&
          item.boeNo === row.boeNo
      );
      const inputValuesForRow = inputValues[index] || {};
      const updatedFields = {};

      Object.keys(inputValuesForRow).forEach((field) => {
        if (inputValuesForRow[field] !== undefined) {
          updatedFields[field] = inputValuesForRow[field];
        }
      });

      return {
        ...row,
        ...updatedFields,
      };
    });

    const requestBody = {
      exBond: {
        ...exBond,
      },
      exbondDtl: {
        ...dataToSave,
      },
    };

    console.log("requestBody_______________________", requestBody);
    console.log("inBond_______________________", exBond);
    console.log("dataToSave_______________________", dataToSave);
    if (isValid) {
      axios
        .post(
          `${ipaddress}api/cfexbondcrg/saveCfExbondcrgAndExbondDetails?companyId=${companyid}&branchId=${branchId}&user=${userId}&flag=${exbondFlag}`,
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .then((response) => {
          setExBond(response.data);

          console.log(
            "jsfjsfjsdfjksdgjgkjsdafgjksdfgkjsgfjasgjfsgajfjsagfjasdgf",
            response.data
          );
          fetchDataAfterSave(
            companyid,
            branchId,
            response.data.nocTransId,
            response.data.nocNo,
            response.data.inBondingId,
            response.data.boeNo,
            response.data.exBondingId
          );
          onRequest();
          setExBondFlag("edit");
          toast.success("Data save successfully!!", {
            autoClose: 800,
          });
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.response.data, {
            autoClose: 800,
          });
        }).finally(()=>{
          setLoading(false);
        });

      console.log("Data saved successfully:", dataToSave);
    } else {
      // Update state to reflect errors
      setInputValues(updatedValues);
    }
  };

  const handleSubmit = () => {
    setLoading(true);

    if(exBond.status === 'A')
    {
      setLoading(false);
      toast.info("Record is alredy approved.", {
          autoClose: 1000
      })
      return;
    }
    let errors = {};
  
    const dataToSave = selectedRows.map((row) => {
      const index = currentItems1.findIndex(
        (item) =>
          item.nocTransId === row.nocTransId &&
          item.nocNo === row.nocNo &&
          item.cfBondDtlId === row.cfBondDtlId &&
          item.inBondingId === row.inBondingId &&
          item.boeNo === row.boeNo
      );
      const inputValuesForRow = inputValues[index] || {};
      const updatedFields = {};

      Object.keys(inputValuesForRow).forEach((field) => {
        if (inputValuesForRow[field] !== undefined) {
          updatedFields[field] = inputValuesForRow[field];
        }
      });

      return {
        ...row,
        ...updatedFields,
      };
    });
  
    const requestBody = {
      exBond: {
        ...exBond,
      },
      nocDtl: {
        ...dataToSave,
      },
    };
  
    axios
    .post(
      `${ipaddress}api/cfexbondcrg/approve?companyId=${companyid}&branchId=${branchId}&user=${userId}&flag=${exbondFlag}`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    )
    .then((response) => {
      // This block will execute only if the backend returns a successful response
      if (response.status === 200) {
        // If backend returns 200 status, show success toast
        toast.success("Data saved successfully!!", {
          autoClose: 800,
        });

        setExBond((pre)=>({
...pre,
status:'A',
        }))
        onRequest();
      } else {
        // Handle unexpected non-200 status
        toast.error("Unexpected status code: " + response.status, {
          autoClose: 800,
        });
      }
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
  
      if (error.response) {
        // This will log detailed error information from the backend
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
  
        // Ensure the error message from backend is displayed
        toast.error(error.response.data || "An error occurred. Please try again.", {
          autoClose: 9000,
        });
      } else if (error.request) {
        // No response from the server
        toast.error("No response received from the server.", {
          autoClose: 800,
        });
        console.error("Error request:", error.request);
      } else {
        // Handle other kinds of errors
        toast.error("Error: " + error.message, {
          autoClose: 800,
        });
        console.error("Error message:", error.message);
      }
    });
  
  
    console.log("Data saved successfully:", dataToSave);
  };
  const handleClear = () => {
    // Reset the form fields
    setImpName('');
    setIsoName('');
    setExBond({
      companyId: companyid, // Company_Id
      branchId: branchId, // Branch_Id
      companyId: "",
      branchId: "",
      finYear: "",
      inBondingId: "",
      exBondingId: "",
      exBondingDate: new Date(),
      profitcentreId: "N00003",
      nocTransId: "",
      nocNo: "",
      nocValidityDate: "",
      boeNo: "",
      inBondedPackages: "",
      bondingNo: "",
      bondingDate: "",
      exBondBeNo: "",
      exBondBeDate: "",
      inBondingId: "",
      inBondingDate: "",
      invoiceUptoDate: "",
      accSrNo: "",
      onAccountOf: "",
      chaSrNo: "",
      cha: "",
      shift: "DAY",
      commodityDescription: "",
      grossWeight: "",
      inBondedGw: "",
      exBondedGw: "",
      remainingGw: "",
      balanceGw: "",
      numberOfMarks: "",
      uom: "",
      periodicBill: "",
      nocPackages: "",
      areaOccupied: "",
      areaReleased: "",
      areaBalanced: "",
      areaRemaining: "",
      inBondedPackages: "",
      exBondedPackages: "",
      remainingPackages: "",
      balancedQty: "",
      balancedPackages: "",
      qtyTakenOut: 0,
      spaceAllocated: "",
      cifValue: "",
      inBondedCif: "",
      exBondedCif: "",
      remainingCif: "",
      balanceCif: "",
      inBondedCargoDuty: "",
      exBondedCargoDuty: "",
      remainingCargoDuty: "",
      balanceCargoDuty: "",
      inBondedInsurance: "",
      exBondedInsurance: "",
      remainingInsurance: "",
      balanceInsurance: "",
      cifQty: "",
      exBondNo: "",
      exBondDate: "",
      noOf20Ft: "",
      noOf40Ft: "",
      comments: "",
      giTransporterStatus: "",
      giTransporter: "",
      giTransporterName: "",
      giVehicleNo: "",
      giDriverName: "",
      gateOutId: "",
      gateOutDate: "",
      billingParty: "",
      igst: "",
      cgst: "",
      sgst: "",
      sez: "",
      impSrNo: "",
      importerId: "",
      importerName: "",
      status: "",
      createdBy: "",
      createdDate: "",
      editedBy: "",
      editedDate: "",
      approvedBy: "",
      blockMoveAllow: "",
      approvedDate: "",
      spaceType: "General",
      gateInType: "Container",
      invoiceNo: "",
      ssrTransId: "",
      section60: "",
      igmNo: "",
      igmLineNo: "",
      exBondType: "EXB",
      sbNo: "",
      sbDate: "",
      sbValue: "",
      sbDuty: "",
      sbQty: "",
      trnsferBondNo: "",
      trnsferBondDate: "",
      section49:"",
    });

    document.getElementById("cha").classList.remove("error-border");
    document.getElementById("igmNo").classList.remove("error-border");
    document.getElementById("igmDate").classList.remove("error-border");
    document.getElementById("igmLineNo").classList.remove("error-border");
    document.getElementById("importerName").classList.remove("error-border");
    // document.getElementById("grossWeight").classList.remove("error-border");
    document.getElementById("uom").classList.remove("error-border");
    document.getElementById("nocDate").classList.remove("error-border");
    document.getElementById("nocFromDate").classList.remove("error-border");
    document.getElementById("nocValidityDate").classList.remove("error-border");
    document.getElementById("boeNo").classList.remove("error-border");
    document.getElementById("boeDate").classList.remove("error-border");
    document.getElementById("area").classList.remove("error-border");
    setSelectAll(false);
    setSelectedRows([]);
    setBondingErrors("");
    setCfbondnocDtl([]);
    setExBondFlag("add");
    setChaName("");
    setCHASearchedData([]);
  };

  const [cfbondnocDtl, setCfbondnocDtl] = useState([]);
  const fetchData = async (
    companyid,
    branchId,
    nocTransId,
    nocNo,
    inBondingId,
    boeNo
  ) => {

    console.log("nocTransId",nocTransId);
    console.log("nocNo",nocNo);
    console.log("inBondingId",inBondingId);
    console.log("boeNo",boeNo);
    try {
      const response = await fetch(
        `${ipaddress}api/cfexbondcrg/getALLCfInBondCrgDtl?companyId=${companyid}&branchId=${branchId}&nocTransId=${nocTransId}&nocNo=${nocNo}&inBondigId=${inBondingId}&boeNo=${boeNo}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
       // Check if data is empty or null
    if (!data || data.length === 0) {
      toast.info("ExBond details are already completed.");
      setCfbondnocDtl([]); // Clear existing state if data is empty
      setInputValues([]);  // Clear input values
      return;
    }

    console.log("data after boe no ",data);
    
      setCfbondnocDtl(data);

      setInputValues(
        data.map((mnr) => ({
          ...mnr,
          exBondedPackages: mnr.inBondedPackages - (mnr.exBondedPackages || 0),
          //     exBondedPackages: (mnr.inBondedPackages - (mnr.exBondedPackages || 0)) + (mnr.exBondedPackages || 0)
          // ,
          yardPackages:mnr.yardPackages,
          cellAreaAllocated:mnr.cellAreaAllocated,
          exBondedCargoDuty: handleInputChangeNew(mnr.inbondCargoDuty - (mnr.exBondedCargoDuty || 0),13,3),
          exBondedCIF:handleInputChangeNew(mnr.inbondCifValue - (mnr.exBondedCIF || 0),13,3),
          exBondedInsurance: handleInputChangeNew(mnr.inbondInsuranceValue - (mnr.exBondedInsurance || 0),13,3),
          editedBy:
            `${mnr.yardLocationId || ""}-${mnr.blockId || ""}-${
              mnr.cellNoRow || ""
            }` || "",
          exBondedGW: (
            (mnr.inbondGrossWt / mnr.inBondedPackages) *
            (mnr.inBondedPackages - (mnr.exBondedPackages || 0))
          ).toFixed(2),
        }))
      );

      console.log("cfbodnNocDtl records ", data);
    } catch (error) {
      // setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataAfterSave = async (
    companyid,
    branchId,
    nocTransId,
    nocNo,
    inBondingId,
    boeNo,
    exBondingId
  ) => {

    console.log("nocTransId",nocTransId);
    console.log("nocNo",nocNo);
    console.log("inBondingId",inBondingId);
    console.log("boeNo",boeNo);
    try {
      const response = await fetch(
        `${ipaddress}api/cfexbondcrg/getExBondDtlAfterSave?companyId=${companyid}&branchId=${branchId}&nocTransId=${nocTransId}&nocNo=${nocNo}&inBondigId=${inBondingId}&boeNo=${boeNo}&exBondingId=${exBondingId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
       // Check if data is empty or null
    if (!data || data.length === 0) {
      toast.info("ExBond details are already completed.");
      setCfbondnocDtl([]); // Clear existing state if data is empty
      setInputValues([]);  // Clear input values
      return;
    }
      setCfbondnocDtl(data);

      setInputValues(
        data.map((mnr) => ({
          ...mnr,
          exBondedPackages: mnr.inBondedPackages - (mnr.exBondedPackages || 0),
          //     exBondedPackages: (mnr.inBondedPackages - (mnr.exBondedPackages || 0)) + (mnr.exBondedPackages || 0)
          // ,
          yardPackages:mnr.yardPackages,
          cellAreaAllocated:mnr.cellAreaAllocated,
          exBondedCargoDuty: handleInputChangeNew(mnr.inbondCargoDuty - (mnr.exBondedCargoDuty || 0),13,3),
          exBondedCIF:handleInputChangeNew(mnr.inbondCifValue - (mnr.exBondedCIF || 0),13,3),
          exBondedInsurance:
          handleInputChangeNew(mnr.inbondInsuranceValue - (mnr.exBondedInsurance || 0),13,3),
          // exBondedCIF : mnr.inbondCifValue || 0,
          // exBondedInsurance : mnr.inbondInsuranceValue || 0,
          editedBy:
            `${mnr.yardLocationId || ""}-${mnr.blockId || ""}-${
              mnr.cellNoRow || ""
            }` || "",
          exBondedGW: (
            (mnr.inbondGrossWt / mnr.inBondedPackages) *
            (mnr.inBondedPackages - (mnr.exBondedPackages || 0))
          ).toFixed(2),
        }))
      );

      console.log("cfbodnNocDtl records ", data);
    } catch (error) {
      // setError(error);
    } finally {
      setLoading(false);
    }
  };
  const getMinDate = (date) => {
    if (!date) return null;
    const minDate = new Date(date);
    minDate.setDate(minDate.getDate() + 1); // Add one day
    return minDate;
  };

  const defaultOption = { value: "N00003", label: "NOC BOND" };

  const handleChangeProfitCenter = (selectedOption) => {
    // Update the state or handle the change as needed
    setExBond((prevState) => ({
      ...prevState,
      profitcentreId: selectedOption ? selectedOption.value : "",
    }));
  };

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    setSelectAll(selectedItems.length === cfbondnocDtl.length);
  }, [selectedItems, cfbondnocDtl]);

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      setSelectedRows([...currentItems1]); // Select all rows
    } else {
      setSelectedRows([]); // Deselect all rows
    }
  };

  const [selectedRows, setSelectedRows] = useState([]);

  const isSelected = (row) => {
    return selectedRows.some(
      (selectedRow) =>
        selectedRow.nocTransId === row.nocTransId &&
        selectedRow.nocNo === row.nocNo &&
        selectedRow.cfBondDtlId === row.cfBondDtlId &&
        selectedRow.inBondingId === row.inBondingId &&
        selectedRow.boeNo === row.boeNo
    );
  };

  function handleInputChange(e) {
    const inputValue = e;
    const numericInput = inputValue.replace(/[^0-9.]/g, "");
    const parts = numericInput.split(".");
    const integerPart = parts[0];
    let decimalPart = parts[1];

    // Limit decimal places if needed
    if (decimalPart !== undefined) {
      decimalPart = `.${decimalPart.slice(0, 3)}`;
    }

    const sanitizedInput =
      decimalPart !== undefined ? `${integerPart}${decimalPart}` : integerPart;
    return sanitizedInput;
  }

  const [inputValues, setInputValues] = useState([]);
  const handleInputChangeFotDtl = (event, fieldName, index,val,val1) => {
    const { value } = event.target;

    let newValue =value;

    if(['exBondGridArea','exBondedGW','exBondedCIF','exBondedCargoDuty','exBondedInsurance'].includes(fieldName))
    {
      newValue =handleInputChangeNew(value,val,val1)
    }

    setInputValues((prevInputValues) => {
      const updatedValues = [...prevInputValues];
      const dtl = currentItems1[index]; // Get the current item details for comparison

      let errorMessage = "";
      // Get the current remaining packages from state
      let remainingPackages = exBond.remainingPackages;


     
      // Calculate balanceQty if exBondedPackages field is updated
      if (fieldName === "exBondedPackages") {
        const exBondedPackages = parseFloat(value);
        const balanceQty = remainingPackages - exBondedPackages;

        console.log("Remaining Packages:", remainingPackages);
        console.log("Ex Bonded Packages:", exBondedPackages);
        console.log("Balance Quantity:", balanceQty);

        // Update the balanceQty in the exBond state
        // setExBond((prev) => ({
        //   ...prev,
        //   balancedQty: balanceQty,
        // }));
      }

      // if (
      //   fieldName === "exBondedPackages" &&
      //   parseFloat(value) > dtl.inBondedPackages - dtl.exBondedPackages
      // )
      let  addition;
      if (exBond.exBondingId) {
        addition =(dtl.inBondedPackages)
      }
      else{
        // addition =(dtl.inBondedPackages) - (dtl.exBondedPackages + dtl.exBondedPackages)

        addition =(dtl.inBondedPackages) - (dtl.exBondedPackages)
      }

       
      // if (
      //   fieldName === "exBondedPackages" &&
      //   parseFloat(value) >
      //     dtl.inBondedPackages - dtl.exBondedPackages + dtl.exBondedPackages
      // ) {
      //   errorMessage =
      //     `Ex Bond Packages should not be greater than ${addition}`;
      // }
      if (
        fieldName === "exBondedPackages" &&
        parseFloat(newValue) >
        addition
      )
       {
        errorMessage =
          `Ex Bond Packages should not be greater than ${addition}`;
      }
      

     else if (fieldName === "exBondyardPackages") 
      {
         const exBondedPackages = parseFloat(updatedValues[index]?.exBondedPackages || 0);
        // const exBondedPackages = parseFloat(updatedValues[index]?.yardPackages || 0);
        const enteredExBondyardPackages = parseFloat(newValue);
        
        if (enteredExBondyardPackages > exBondedPackages) 
        {
          errorMessage = `Ex Bond Yard Packages should not be greater than ${exBondedPackages}`;
        }
      }

      else if  (
        fieldName === "exBondyardPackages" &&
        parseFloat(newValue) >
        addition
      )
       {
        errorMessage =
          `Ex Bond Yard Packages should not be greater than ${addition}`;
      }
       else if (
        fieldName === "exBondedCIF" &&
        parseFloat(newValue) > dtl.inbondCifValue
      ) {
        errorMessage = "Ex Bond CIF Value should not be greater than CIF Value";
      } else if (
        fieldName === "exBondedCargoDuty" &&
        parseFloat(newValue) > dtl.inbondCargoDuty
      ) {
        errorMessage =
          "Ex Bond Cargo Duty should not be greater than Cargo Duty";
      }


      updatedValues[index] = {
        ...updatedValues[index],
        [fieldName]: newValue,
        errorMessage,
      };

      // Automatic calculations when exBondedPackages changes
      if (fieldName === "exBondedPackages") {
        // Calculate exBondedCIF based on the package ratio
        updatedValues[index].areaOccupied = (
          (parseFloat(dtl.areaOccupied) / dtl.inBondedPackages) *
          parseFloat(newValue)
        ).toFixed(2);
      }

      if (fieldName === "exBondedPackages") {
        // Calculate exBondedCIF based on the package ratio
        const exBondedCIF = (
          (parseFloat(dtl.inbondCifValue) / dtl.inBondedPackages) *
          parseFloat(newValue)
        ).toFixed(2);

        // Calculate exBondedCargoDuty based on the package ratio
        const exBondedCargoDuty = (
          (parseFloat(dtl.inbondCargoDuty) / dtl.inBondedPackages) *
          parseFloat(newValue)
        ).toFixed(2);

        // Update the values in the state
        updatedValues[index].exBondedCIF = exBondedCIF;
        updatedValues[index].exBondedCargoDuty = exBondedCargoDuty;

        // Automatically calculate exBondedInsurance as the sum of exBondedCIF and exBondedCargoDuty
        updatedValues[index].exBondedInsurance = (
          parseFloat(exBondedCIF) + parseFloat(exBondedCargoDuty)
        ).toFixed(2);
      }

      // Automatically calculate inbondInsuranceValue
      // if (fieldName === "exBondedCIF" || fieldName === "exBondedCargoDuty") {
      //   updatedValues[index].exBondedInsurance =
      //     parseFloat(updatedValues[index].exBondedCIF || 0) +
      //     parseFloat(updatedValues[index].exBondedCargoDuty || 0);
      // }

      // Automatically calculate inbondGrossWt
      if (fieldName === "exBondedPackages") {
        const perPackageWeight = dtl.inbondGrossWt / dtl.inBondedPackages;
        updatedValues[index].exBondedGW = (
          perPackageWeight * parseFloat(newValue)
        ).toFixed(2);
      }

      if (fieldName === "exBondyardPackages") {
        const perPackageWeight = dtl.cellAreaAllocated / dtl.yardPackages;
        updatedValues[index].exBondGridArea = (
          perPackageWeight * parseFloat(newValue)
        ).toFixed(2);
      }




      return updatedValues;
    });
  };

  const handleCheckboxChangeForDtl = (event, row) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      // If not already selected, add to selected rows
      if (
        !selectedRows.some(
          (selectedRow) =>
            selectedRow.nocTransId === row.nocTransId &&
            selectedRow.nocNo === row.nocNo &&
            selectedRow.cfBondDtlId === row.cfBondDtlId &&
            selectedRow.inBondingId === row.inBondingId &&
            selectedRow.boeNo === row.boeNo
        )
      ) {
        setSelectedRows([...selectedRows, row]);
      }
    } else {
      // Remove from selected rows
      const updatedRows = selectedRows.filter(
        (selectedRow) =>
          selectedRow.nocTransId !== row.nocTransId ||
          selectedRow.nocNo !== row.nocNo ||
          selectedRow.cfBondDtlId !== row.cfBondDtlId ||
          selectedRow.inBondingId !== row.inBondingId ||
          selectedRow.boeNo !== row.boeNo
      );
      setSelectedRows(updatedRows);
    }
  };

  // State to hold totals for the selected rows
  const [totals, setTotals] = useState({
    totalExBondedPackages: 0,
    totalExBondGrossWeight: 0,
    totalExBondCif: 0,
    totalExBondCargo: 0,
    totalExBondInsurance: 0,
  });

  // Function to calculate the totals based on selected rows
  const calculateTotals = () => {
    let totalExBondedPackages = 0;
    let totalExBondGrossWeight = 0;
    let totalExBondCif = 0;
    let totalExBondCargo = 0;
    let totalExBondInsurance = 0;
    let totalAreaReleased = 0;

    selectedRows.forEach((row) => {
      const isInBondingIdValid = exBond?.exBondingId != null && exBond?.exBondingId !== '';
      console.log("isInBondingIdValid",isInBondingIdValid);

      const index = currentItems1.findIndex(
        (item) =>
          item.nocTransId === row.nocTransId &&
          item.nocNo === row.nocNo &&
          item.cfBondDtlId === row.cfBondDtlId &&
          item.inBondingId === row.inBondingId &&
          item.boeNo === row.boeNo
      );
      if (index !== -1) {

        const source = isInBondingIdValid ? row : inputValues[index];
        
      totalExBondedPackages += parseFloat(source?.exBondedPackages || 0);
      totalExBondGrossWeight += parseFloat(source?.exBondedGW || 0);
      totalExBondCif += parseFloat(source?.exBondedCIF || 0);
      totalExBondCargo += parseFloat(source?.exBondedCargoDuty || 0);
      totalExBondInsurance += parseFloat(source?.exBondedInsurance || 0);
      
      const inBondedPackages = parseFloat(source?.inBondedPackages || 0); // Ensure this field exists and is a number
      const exBondedPackages = parseFloat(source?.exBondedPackages || 0);
      const areaOccupied = parseFloat(source?.areaOccupied || 0);


      console.log("areaOccupied",areaOccupied);
      
      if (inBondedPackages > 0 && exBondedPackages > 0) {
        totalAreaReleased += (areaOccupied / inBondedPackages) * exBondedPackages;
      }
      }
    });

    setTotals({
      totalExBondedPackages,
      totalExBondGrossWeight,
      totalExBondCif,
      totalExBondCargo,
      totalExBondInsurance,
      totalAreaReleased,
    });


    
    setExBond((pre) => ({
      ...pre,
      // inBondedPackages: totalInBondedPackages,
      exBondedPackages: handleInputChangeNew(totalExBondedPackages || pre.exBondedPackages ,13,3),
      exBondedGw: handleInputChangeNew(totalExBondGrossWeight || pre.exBondedGw,13,3),
      exBondedCif: handleInputChangeNew(totalExBondCif || pre.exBondedCif,13,3),
      exBondedCargoDuty: handleInputChangeNew(totalExBondCargo || pre.exBondedCargoDuty,13,3),
      exBondedInsurance: handleInputChangeNew(totalExBondInsurance || pre.exBondedInsurance,13,3),
      areaReleased: handleInputChangeNew(totalAreaReleased || pre.areaReleased,13,3),

      balancedQty:  handleInputChangeNew( exBond.remainingPackages - (totalExBondedPackages || pre.exBondedPackages),13,3) ,
      balancedPackages:handleInputChangeNew(exBond.remainingPackages - (totalExBondedPackages || pre.exBondedPackages),13,3),
      balanceCif: handleInputChangeNew(exBond.remainingCif - (totalExBondCif || pre.exBondedCif),13,3),
      balanceGw: handleInputChangeNew(exBond.remainingGw - (totalExBondGrossWeight || pre.exBondedGw),13,3),
      balanceCargoDuty: handleInputChangeNew(exBond.remainingCargoDuty - (totalExBondCargo || pre.exBondedCargoDuty),13,3),
      balanceInsurance:handleInputChangeNew(exBond.remainingInsurance - (totalExBondInsurance || pre.exBondedInsurance),13,3),
      // areaBalanced : handleInputChangeNew(exBond.areaRemaining - (totalAreaReleased || pre.areaReleased),13,3),
    }));
  };

  // Example usage: Call this function after selection changes
  useEffect(() => {
    calculateTotals();
  }, [selectedRows, inputValues]);

  const [yardLocationsData, setYardLocationsData] = useState([]);
  const handleYardLocationData = () => {
    fetch(
      `${ipaddress}api/yardblockcells/getLocationsAllYardCell?companyId=${companyid}&branchId=${branchId}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setYardLocationsData(data);

        console.log("yardblockcellsyardblockcells", data);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    handleYardLocationData();
  }, []);

  const [yardData, setYardData] = useState([]);
  const [yardId, setyardId] = useState("");

  const getYardData = (id) => {
    axios
      .get(
        `${ipaddress}api/yardblockcells/getLocationsAllYardCell?companyId=${companyid}&branchId=${branchId}&search=${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        setYardData(response.data);
      })
      .catch((error) => {});
  };

  const handleYardReset = () => {
    setyardId("");
    getYardData("");
  };

  const selectYardData = (lid, ldesc, block, cell, flag) => {
    if (yardFlag === "yard") {
      //setGateIn({
      //     ...gateIn,
      //     yardLocation: lid,
      //     yardBlock: block,
      //     yardCell: cell
      // })
    } else {
      // setGateIn({
      //     ...gateIn,
      //     yardLocation1: lid,
      //     yardBlock1: block,
      //     yardCell1: cell
      // })
    }
    closeYardModal();
  };

  const [currentPage1, setCurrentPage1] = useState(1);
  const [itemsPerPage1] = useState(5);

  const indexOfLastItem1 = currentPage1 * itemsPerPage1;
  const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
  const currentItems1 = cfbondnocDtl.slice(indexOfFirstItem1, indexOfLastItem1);
  const totalPages1 = Math.ceil(cfbondnocDtl.length / itemsPerPage1);

  // Function to handle page change
  const handlePageChange1 = (page) => {
    if (page >= 1 && page <= totalPages1) {
      setCurrentPage1(page);
    }
  };
  const displayPages1 = () => {
    const centerPageCount = 5;
    const middlePage = Math.floor(centerPageCount / 2);
    let startPage = currentPage1 - middlePage;
    let endPage = currentPage1 + middlePage;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPages1, centerPageCount);
    }

    if (endPage > totalPages1) {
      endPage = totalPages1;
      startPage = Math.max(1, totalPages1 - centerPageCount + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const [isModalOpenForYard, setIsModalOpenForYard] = useState(false);
  const [yardFlag, setYardFlag] = useState("");

  const openYardModal = (dtl) => {
    setIsModalOpenForYard(true);
    setYardFlag(dtl);
    setModalDataInput((pre) =>({
      ...pre,
      // inBondPackages :(dtl.gateInPackages!=null ? dtl.gateInPackages : '0') - (dtl.inBondedPackages!=null ? dtl.inBondedPackages:'0') - (cost!=null ? cost :'0'),
      commodityDescription : dtl.commodityDescription,
      cfBondDtlId :dtl.cfBondDtlId ,
      // oldInbondPkgs :(dtl.exBondedPackages ? dtl.exBondedPackages :'0') ,
      nocNo:dtl.nocNo,
      gateInPackages :dtl.gateInPackages,
      exBondingId:exBond.exBondingId,
      nocTransId:dtl.nocTransId,
    }))
    console.log("exBond.inBondingIdexBond.inBondingId",exBond.inBondingId);
    console.log("dtl.inBondingIddtl.inBondingId",dtl.inBondingId);
    console.log("exBond.nocTransId.nocTransId",dtl.nocTransId);
    console.log("exBond.cfBondDtlId.cfBondDtlId",dtl.cfBondDtlId);
    getInBondGridData(exBond.exBondingId,dtl.cfBondDtlId);
    fetchSumOfExBondPackages(exBond.exBondingId,dtl.cfBondDtlId,dtl.nocTransId);
  };

  const fetchSumOfExBondPackages = async (exBondingId, cfBondDtlId, nocTransId) => {
    axios.get(`${ipaddress}api/cfexbondcrg/sum?companyId=${companyid}&branchId=${branchId}&exBondingId=${exBondingId}&cfBondDtlId=${cfBondDtlId}&nocTransId=${nocTransId}`,{
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((response)=>{
      setModalDataInput((pre) =>({
        ...pre,
       
        oldInbondPkgs :(response.data ? response.data :'0') ,
      }))
      const data =response.data;
      console.log("data____________________________",data);

    }).catch((error) => {
      console.error("Error fetching sum of in-bond packages:", error);
    });
};


  const closeYardModal = () => {
    setYardFlag("");
    setIsModalOpenForYard(false);
    setSelectedItemsYard([]);
  };

  const [selectedItemsYard, setSelectedItemsYard] = useState([]);
  const toggleSelectItem = (item) => {
    setSelectedItemsYard((prevSelectedItems) => {
      const isSelected = prevSelectedItems.some(
        (selectedItem) =>
          selectedItem.yardLocationId === item.yardLocationId &&
          selectedItem.blockId === item.blockId &&
          selectedItem.cellNoRow === item.cellNoRow
      );
      if (isSelected) {
        return prevSelectedItems.filter(
          (selectedItem) =>
            !(
              selectedItem.yardLocationId === item.yardLocationId &&
              selectedItem.blockId === item.blockId &&
              selectedItem.cellNoRow === item.cellNoRow
            )
        );
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  const handleSubmitSelectedItems = () => {
    setIsModalOpenForYard(false);
    console.log("Selected items:", selectedItemsYard);
  };
  const shiftOptions = [
    { value: "DAY", label: "DAY" },
    { value: "NIGHT", label: "NIGHT" },
  ];

  const [isModalOpenForCHASearch, setisModalOpenForCHASearch] = useState(false);
  const openCHASearchModal = () => {
    setisModalOpenForCHASearch(true);
    searcHCHA("");
  };

  const closeCHASearchModal = () => {
    setisModalOpenForCHASearch(false);
    setCHASearchId("");
    setCHASearchedData([]);
  };

  const [CHASearchId, setCHASearchId] = useState("");

  const searcHCHA = (id) => {
    setLoading(true);
    axios
      .get(
        `${ipaddress}api/cfbondnoc/search?companyId=${companyid}&branchId=${branchId}&partyName=${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        setCHASearchedData(response.data);
        setLoading(false);
        setCurrentPage(1);

        console.log("response.data", response.data);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const clearSearchCHA = () => {
    setCHASearchId("");
    searcHCHA("");
  };

  const selectCHASearchRadio = (
    partyId,
    gstNo,
    portName,
    vesselName,
    shippingLineName,
    shippingLineCode,
    shippingAgentName,
    shippingAgentCode
  ) => {
    closeCHASearchModal();
    axios
      .get(
        `${ipaddress}api/cfbondnoc/getDataByPartyIdAndGstNo?companyId=${companyid}&branchId=${branchId}&partyId=${partyId}&gstNo=${gstNo}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;

        console.log("getDataByPartyIdAndGstNo", data);

        setExBond((pre) => ({
          ...pre,
          cha: response.data.partyId,
        }));

        setChaName(response.data.partyName);
      })
      .catch((error) => {});
  };

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => {
    setShowModal(true);
    openForExbondDtl("");
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const openForExbondDtl = (id) => {
    setLoading(true);
    axios
      .get(
        `${ipaddress}api/cfexbondcrg/exBondDetails?companyId=${companyid}&branchId=${branchId}&nocTransId=${exBond.nocTransId}&nocNo=${exBond.nocNo}&inBondingId=${exBond.inBondingId}&boeNo=${exBond.boeNo}&exBondingId=${exBond.exBondingId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        setCHASearchedData(response.data);
        setLoading(false);
        setCurrentPage(1);

        console.log("response.data", response.data);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const [isoData, setISOData] = useState([]);
  const [impId, setImpId] = useState("");
  const handlePortChange = async (selectedOption, { action }) => {
    if (action === "clear") {
      console.log("respone datacagahgdhsagdhs", selectedOption);
      setChaName("");
      setExBond((pre) => ({
        ...pre,
        cha: "",
      }));

      document.getElementById("cha").classList.remove("error-border");
      setBondingErrors((prevErrors) => ({
        ...prevErrors,
        ["cha"]: "",
      }));
    } else {
      console.log("respone datacagahgdhsagdhs", selectedOption);

      setExBond((prev) => ({
        ...prev,
        cha: selectedOption ? selectedOption.value : "",
        chaName: selectedOption ? selectedOption.label : "",
      }));

      setExBond((noc) => ({
        ...noc,
        cha: selectedOption ? selectedOption.value : "",
        chaName: selectedOption ? selectedOption.label : "",
        chaName: selectedOption ? selectedOption.cName : "",
      }));

      setChaName(selectedOption ? selectedOption.label : "");
      setBondingErrors((prevErrors) => ({
        ...prevErrors,
        cha: "",
      }));

      document.getElementById("cha").classList.remove("error-border");
      setBondingErrors((prevErrors) => ({
        ...prevErrors,
        ["cha"]: "",
      }));
    }
  };

  const getIsoData = (val) => {
    if (val === "") {
      setISOData([]);
      return;
    }

    axios
      .get(
        `${ipaddress}api/cfbondnoc/search?companyId=${companyid}&branchId=${branchId}&partyName=${val}`,
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
          value: port.partyId,
          // label: port.partyName,
          label: `${ port.partyName}-${port.address1},${port.address1},${port.address3}`,
          ccode: port.createdBy,
          bWeek: port.bondnocWeek,
          cName: port.partyName,
        }));
        setISOData(portOptions);
      })
      .catch((error) => {});
  };

  const [impData, setImpData] = useState([]);
  const [impName, setImpName] = useState("");
  const handleImporterChange = async (selectedOption, { action }) => {
    if (action === "clear") {
      console.log("respone datacagahgdhsagdhs", selectedOption);
      setImpName("");
      setExBond((pre) => ({
        ...pre,
        giTransporterName: "",
      }));
      setImpId("");
      document
        .getElementById("giTransporterName")
        .classList.remove("error-border");
      setBondingErrors((prevErrors) => ({
        ...prevErrors,
        ["giTransporterName"]: "",
      }));
    } else {
      console.log("respone datacagahgdhsagdhs", selectedOption);

      setExBond((prev) => ({
        ...prev,
        giTransporterName: selectedOption ? selectedOption.value : "",
      }));

      setImpName(selectedOption ? selectedOption.label : "");

      setExBond((noc) => ({
        ...noc,
        giTransporterName: selectedOption ? selectedOption.value : "",
      }));

      setBondingErrors((prevErrors) => ({
        ...prevErrors,
        importerName: "",
      }));

      document
        .getElementById("giTransporterName")
        .classList.remove("error-border");
      setBondingErrors((prevErrors) => ({
        ...prevErrors,
        ["giTransporterName"]: "",
      }));
    }
  };

  const getImporterData = (val) => {
    if (val === "") {
      setImpData([]);
      return;
    }

    axios
      .get(
        `${ipaddress}api/cfbondnoc/searchImporters?companyId=${companyid}&branchId=${branchId}&partyName=${val}`,
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
          value: port.partyId,
          // label: port.partyName,
          label: `${port.partyName}-${port.address1}-${port.address2}-${port.address3}`,
        }));
        setImpData(portOptions);
      })
      .catch((error) => {});
  };



  const [fwdData, setFwdData] = useState([]);
  const [fwdName, setFwdName] = useState("");
  const handleFwdChange = async (selectedOption, { action }) => {
    if (action === "clear") {
      console.log("respone datacagahgdhsagdhs", selectedOption);
      setFwdName("");
      setExBond((pre) => ({
        ...pre,
        importerName: "",
      }));
     
      document
        .getElementById("importerName")
        .classList.remove("error-border");
      setBondingErrors((prevErrors) => ({
        ...prevErrors,
        ["importerName"]: "",
      }));
    } else {
      console.log("respone datacagahgdhsagdhs", selectedOption);

      setExBond((prev) => ({
        ...prev,
        importerName: selectedOption ? selectedOption.value : "",
      }));

      setFwdName(selectedOption ? selectedOption.label : "");

      setExBond((noc) => ({
        ...noc,
        importerName: selectedOption ? selectedOption.value : "",
      }));

      setBondingErrors((prevErrors) => ({
        ...prevErrors,
        importerName: "",
      }));

      document
        .getElementById("giTransporterName")
        .classList.remove("error-border");
      setBondingErrors((prevErrors) => ({
        ...prevErrors,
        ["giTransporterName"]: "",
      }));
    }
  };

  const getFwdData = (val) => {
    if (val === "") {
      setFwdData([]);
      return;
    }

    axios
      .get(
        `${ipaddress}api/cfexbondcrg/getALLForworder?companyId=${companyid}&branchId=${branchId}&partyName=${val}`,
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
          value: port.partyId,
          label: port.partyName,
        }));
        setFwdData(portOptions);
      })
      .catch((error) => {});
  };


  const [boeData, setBOEData] = useState([]);
const [isoId, setISOId] = useState('');
const [isoName, setIsoName] = useState('');
const handleBoeChange = async (selectedOption, { action }) => {

  if (action === 'clear') {

      console.log("respone datacagahgdhsagdhs",selectedOption);
      setIsoName('');
      setISOId('');
      setChaName('');
      setImpName('');
      setExBondFlag("add");
      setExBond(initialExBond);
      setCHASearchedData([]);
      setCfbondnocDtl([]);
      setExBond((exBond) => ({
        ...exBond,
        inBondedCargoDuty: '',
        inBondedCif: '',
        inBondedGw: '',
        inBondingId: '',
        bondingNo: '',
        boeNo: '',
        boeDate: '',
        nocNo: '',
        nocTransId: '',
        nocDate: '',
        igmNo: '',
        igmLineNo: '',
        igmDate: '',
        inBondingDate: '',
        inBondedPackages: '',
        inBondedInsurance: '',
        insuranceValue: '',
        bondingDate: '',
        nocValidityDate: '',
        areaOccupied: '',
        remainingPackages: '',
        areaRemaining: '',
        remainingCif: '',
        remainingCargoDuty: '',
        remainingInsurance: '',
        remainingGw: '',
        remainingInsurance: '',
        status:'',
        exBondingId:'',
        section49:'',
        importerId:'',
        importerName:'',
        cha:'',
      }));
      
      
      document.getElementById('boeNo').classList.remove('error-border');
      setBondingErrors((prevErrors) => ({
          ...prevErrors,
          ['boeNo']: "",
      }));
  }
  else {
      console.log("respone datacagahgdhsagdhs",selectedOption);

      const status = selectedOption?.status || '';

      if (status !== 'A') {
        toast.error("Please approve the data first before selection.", {
          position: 'top-center',
          autoClose: 999,
        });
        return;
      }

      setExBond((prev) => ({
        ...prev,
        boeNo: selectedOption ? selectedOption.boeNo : '',
      }));
      
      setIsoName( selectedOption ? selectedOption.label : '')
      // setImpName( selectedOption ? selectedOption.importerName : '')
      setExBond((pri) => ({
        ...pri,
        // boeNo: selectedOption ? selectedOption.value : '',
        inBondingId:selectedOption?.inBondingId || '',
        inBondedCargoDuty: selectedOption?.inBondedCargoDuty || '',
        inBondedCif: selectedOption?.inBondedCif || '',
        inBondedGw: selectedOption?.inBondedGw || '',
        inBondingId: selectedOption?.inBondingId || '',
        bondingNo: selectedOption?.bondingNo || '',
        boeDate: selectedOption?.boeDate || '',
        nocNo: selectedOption?.nocNo || '',
        nocTransId: selectedOption?.nocTransId || '',
        nocDate: selectedOption?.nocDate || '',
        igmNo: selectedOption?.igmNo || '',
        igmLineNo: selectedOption?.igmLineNo || '',
        igmDate: selectedOption?.igmDate || '',
        inBondingDate: selectedOption?.inBondingDate || '',
        inBondedPackages: selectedOption?.inBondedPackages || '',
        inBondedInsurance: selectedOption?.inBondedInsurance || '',
        insuranceValue: selectedOption?.insuranceValue || '',
        bondingDate: selectedOption?.bondingDate || '',
        nocValidityDate: selectedOption?.nocValidityDate || '',
        areaOccupied: selectedOption?.areaOccupied || '',
        remainingPackages: selectedOption?.remainingPackages || '',
        areaRemaining: selectedOption?.areaRemaining || '',
        remainingCif: selectedOption?.remainingCif || '',
        remainingCargoDuty: selectedOption?.remainingCargoDuty || '',
        remainingInsurance: selectedOption?.remainingInsurance || '',
        remainingGw: selectedOption?.remainingGw || '',
        section49:selectedOption?.section49 || '',
        importerName:selectedOption?.importerName || '',
        giTransporterName:selectedOption?.importerId || '',
        cha:selectedOption?.cha || '',
        // balancedQty:'',
        // balancedPackages:'',
        // balanceCargoDuty:'',
        // balanceCif:'',
        // balanceInsurance:'',
        // balanceGw:'',
        //  areaBalanced:selectedOption?.areaBalanced || '',
      }));

      setImpName(selectedOption?.importerName || '');
      setChaName(selectedOption?.importerAddress1)
      handleYardLocationData();
     
      fetchData(
        companyid,
        branchId,
        selectedOption?.nocTransId || '',
        selectedOption?.nocNo || '',
        selectedOption?.inBondingId || '',
        selectedOption ? selectedOption.boeNo : '',
      );

      document.getElementById('boeNo').classList.remove('error-border');
      setBondingErrors((prevErrors) => ({
          ...prevErrors,
          ['boeNo']: "",
      }));
  }
};

const getBoeData = (val) => {
  if (val === '') {
      setBOEData([]);
      return;
  }

  axios.get( `${ipaddress}api/cfinbondcrg/getDataByTransIdANDNocIDAndInBondingHdrId?companyId=${companyid}&branchId=${branchId}&partyName=${val}`, {
      headers: {
          Authorization: `Bearer ${jwtToken}`
      }
  })
      .then((response) => {
          const data = response.data;

          console.log("response.data",data);
          const portOptions = data.map(port => ({
            value: port.boeNo + '' + port.inBondingId,
            label:`${port.boeNo}(${port.inBondingId})` ,
            inBondedCargoDuty: port.cargoDuty,
            inBondedCif: port.cifValue,
            inBondedGw: port.inbondGrossWt,
            inBondingId: port.inBondingId,
            bondingNo: port.bondingNo,
            boeNo: port.boeNo,
            boeDate: port.boeDate,
            nocNo: port.nocNo,
            nocTransId: port.nocTransId,
            cha:port.cha,
            importerId:port.importerId,
            importerName:port.importerName,
            nocDate: port.nocDate,
            igmNo: port.igmNo,
            igmLineNo: port.igmLineNo,
            igmDate: port.igmDate,
            inBondingDate: port.inBondingDate,
            importerAddress1:port.importerAddress1,
            // inBondedPackages: port.inBondedPackages - port.exBondedPackages,
            inBondedPackages: port.inBondedPackages,
            inBondedInsurance: port.inbondInsuranceValue,
            insuranceValue: port.inbondInsuranceValue,
            bondingDate: port.bondingDate,
            nocValidityDate: port.nocValidityDate,
            // areaOccupied: port.areaAllocated,
            areaOccupied: port.areaOccupied,
            status: port.status,
            section49:port.section49,
            remainingPackages: port.inBondedPackages - port.exBondedPackages,
          
           
            // areaRemaining:         port.areaAllocated - port.areaOccupied,
            
              remainingCif:         handleInputChangeNew((port.cifValue - port.exBondedCif),13,3),
              remainingCargoDuty:  handleInputChangeNew((port.cargoDuty - port.exBondedCargoDuty),13,3),
              remainingInsurance: handleInputChangeNew((port.inbondInsuranceValue - port.exBondedInsurance),13,3),
              remainingGw: handleInputChangeNew((port.inbondGrossWt - port.exBondedGw),13,3),
            // remainingCif:
            //   ((port.inBondedPackages - port.exBondedPackages) * port.cifValue) /
            //   port.inBondedPackages,

            areaRemaining:handleInputChangeNew
            ((port.areaOccupied - port.areaReleased),13,3) ,
            // areaRemaining:
            // ((port.inBondedPackages - port.exBondedPackages) * port.areaAllocated) /
            // port.inBondedPackages,

            // areaRemaining:
            // (port.areaAllocated) - port.areaOccupied,
            // remainingCargoDuty:* 
            //   ((port.inBondedPackages - port.exBondedPackages) * port.cargoDuty) /
            //   port.inBondedPackages,
          
            // remainingInsurance:
            //   port.inBondedPackages -
            //   (port.exBondedPackages * port.cifValue) / port.inBondedPackages +
            //   port.inBondedPackages -
            //   (port.exBondedPackages * port.cargoDuty) / port.inBondedPackages,
          
            areaBalanced:handleInputChangeNew((port.areaOccupied - port.areaReleased),13,3),
            remainingInsurance: handleInputChangeNew((port.inbondInsuranceValue - port.exBondedInsurance),13,3),
          }));
          
          if (listOfData.boeNo) {
            handleBoeChange(portOptions[0], { action: "select" });
          }
          
          setBOEData(portOptions);
      })
      .catch((error) => {

      })
}

const initialYardGrid = {
  companyId: companyid,
  branchId: branchId,
  finYear: '',
  exBondingId: '',
  nocTransId: '',
  inBondingId: '',
  srNo: '1',
  cfBondDtlId: '',
  yardLocation: '',
  yardBlock: '',
  blockCellNo: '',
  cellAreaAllocated: 0.00,
  inBondPackages: 0,
  qtyTakenOut: 0,
  gridReleased: '',
  status: '',
  createdBy: '',
  createdDate: null,
  editedBy: '',
  editedDate: null,
  approvedBy: '',
  approvedDate: null,
  oldInbondPkgs: '',
  exCellAreaAllocated:'',
    exBondPackages:'',
};
const [rows, setRows] = useState([
  {
    companyId: companyid,
    branchId: branchId,
    finYear: '',
    exBondingId: '',
    nocTransId: '',
    inBondingId: '',
    srNo: '1',
    cfBondDtlId: '',
    yardLocation: '',
    yardBlock: '',
    blockCellNo: '',
    cellAreaAllocated: 0.00,
    inBondPackages: 0,
    qtyTakenOut: 0,
    gridReleased: '',
    status: '',
    createdBy: '',
    createdDate: null,
    editedBy: '',
    editedDate: null,
    approvedBy: '',
    approvedDate: null,
    oldInbondPkgs: '',
    exCellAreaAllocated:'',
    exBondPackages:'',
  },
]);

const [modalDataInput, setModalDataInput] = useState(initialYardGrid);
const [totalPackages, setTotalPackages] = useState(0);
const handleInputChangeModal = (index, e) => {
  const { name, value } = e.target;
  const newRows = [...rows];
  newRows[index][name] = value;

  // Check if the field being updated is inBondPackages
  if (name === "exBondPackages") 
  {
    const currentRow = newRows[index];
    const maxInBondPackages = currentRow.inBondPackages; // Set this to the actual max from your yard data

    if (parseFloat(value) > maxInBondPackages) 
    {
      const errorMessage = `This row's exbonded pkgs cannot exceed ${maxInBondPackages}.`;
      setErrors((prevErrors) => ({
        ...prevErrors,
        [`exBondPackages-${index}`]: errorMessage,
      }));
      toast.error(errorMessage); // Show toast notification
    } else {
      // Clear row-specific error if valid
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[`exBondPackages-${index}`];
        return newErrors;
      });
    }

    const perPackageWeight = (currentRow.cellAreaAllocated || 0) / (currentRow.inBondPackages || 1); // Avoid division by zero
    newRows[index].exCellAreaAllocated = (perPackageWeight * parseFloat(value)).toFixed(2);

    // Calculate the new total packages
    const newTotalPackages = newRows.reduce(
      (sum, row) => sum + (parseFloat(row.qtyTakenOut) || 0),
      0
    );
    setTotalPackages(newTotalPackages);

    // Validation: Total packages should not exceed oldInbondPkgs
    if (newTotalPackages > modalDataInput.oldInbondPkgs) {
      const errorMessage = `Total packages (${newTotalPackages}) cannot exceed ${modalDataInput.oldInbondPkgs}`;
      setErrors((prevErrors) => ({
        ...prevErrors,
        totalPackages: errorMessage,
      }));
      toast.error(errorMessage); // Show toast notification
    } else {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.totalPackages;
        return newErrors;
      });
    }
  }

  // Validation for cellAreaAllocated
  if (name === "exCellAreaAllocated") {
    const cellArea = parseFloat(rows[index].cellArea) || 0;
    const cellAreaUsed = parseFloat(rows[index].cellAreaUsed) || 0;
    const cellAreaAllocated = parseFloat(value)|| 0;

    // Validation: Cell Area Allocated should not exceed available area
    if (cellAreaAllocated > (cellArea - cellAreaUsed)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [`exCellAreaAllocated-${index}`]: `Allocated area cannot exceed ${cellArea - cellAreaUsed}`,
      }));
    } else {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[`exCellAreaAllocated-${index}`];
        return newErrors;
      });
    }
  }
  setRows(newRows);
};

const deleteRow = (index) => {
  const newRows = [...rows];
  newRows.splice(index, 1);
  setErrors((prevErrors) => {
    const newErrors = { ...prevErrors };
    delete newErrors[`cellAreaAllocated-${index}`];
    delete newErrors[`yardLocation-${index}`];
    return newErrors;
  });
setRows(newRows);
 };


 const getInBondGridData = (inBondingId,cfBondDtlId) => {
  axios.get(
    `${ipaddress}api/exbondgrid/savedDataOfExbondGrid?companyId=${companyid}&branchId=${branchId}&exBondingId=${inBondingId}&cfBondDtlId=${cfBondDtlId}`, 
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Corrected header declaration
      }
    }
  ).then((response) => {
 const data = response.data;

 setRows(response.data);
 const upadtedRow = data.map((row,index)=> ({

 }));
    console.log("response_________________",response.data); // Process data as needed

  }).catch((error) => {
if(error.response)
{
  toast.error(error.response.data ? error.response.data : "Server Error! Please try again later.",{
    position:'top-center'
  })
}
    console.error(error); // Log error or show message
  });
};
const handleSaveCfBondGrid = () => {
setLoading(true);
  const hasEmptyFields = rows.some(row =>  !row.exBondPackages || 
    !row.exCellAreaAllocated
  );

  if (hasEmptyFields) {
    const errorMsg = "All fields must be filled before saving.";
    setErrors((prevErrors) => ({
      ...prevErrors,
      save: errorMsg, // Set error message for save
    }));
    setLoading(false);
    toast.error(errorMsg); // Display error toast
    return; // Exit the function to prevent saving
  }

  // Validate total packages
  const newTotalPackages = rows.reduce(
    (sum, row) => sum + (parseFloat(row.exBondPackages) || 0),
    0
  );

  if (newTotalPackages > modalDataInput.oldInbondPkgs) {
    const errorMessage = `Total packages (${newTotalPackages}) cannot exceed ${modalDataInput.oldInbondPkgs}`;
    setErrors((prevErrors) => ({
      ...prevErrors,
      totalPackages: errorMessage, // Set error message for total packages
    }));
    setLoading(false);
    toast.error(errorMessage); // Display error toast
    return; // Exit the function to prevent saving
  }

  setErrors((prevErrors) => {
    const newErrors = { ...prevErrors };
    delete newErrors.save;
    delete newErrors.totalPackages;
    return newErrors;
  });

  console.log("handleSaveCfBondGrid");
  
  const dataToSave = {
    grid: {
      ...rows,
    },
    modal: {
      ...modalDataInput,
    }
  };
  
  console.log("dataToSave__________________________________________________________________",dataToSave);
 
  
  axios
    .post(
      `${ipaddress}api/exbondgrid/saveCfExBondGrid?companyId=${companyid}&branchId=${branchId}&flag=${userId}&user=${userId}`,
      dataToSave,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    )
    .then((response) => {
      const data = response.data;
      console.log("handleSaveCfBondGrid_______________________", data);

      const newRows = data.map((row, index) => ({
        ...row,
        srNo: row.srNo,
        cfBondDtlId: row.cfBondDtlId,
        inBondPackages: row.inBondPackages,
      yardLocation:row.yardLocation,
      yardBlock:row.yardBlock,
      blockCellNo :row.blockCellNo,
        cellArea: row.cellArea,
        nocTransId: row.nocTransId,
        cellAreaAllocated:row.cellAreaAllocated,
        cellAreaUsed:row.cellAreaUsed,
        exBondPackages:row.exBondPackages,
        exBondingId:row.exBondingId,
        inBondingId:row.inBondingId,
        exCellAreaAllocated:row.exCellAreaAllocated,
      }));
  
      // Update the rows state with new values
      setRows(newRows);
      handleYardLocationData();

      toast.success("Location Save Successfully !!!", {
        autoClose: 900,
        position: 'top-center',
      });
    })
    .catch((error) => {
      console.log("error_________________________________________________________________", error);
      // Handle duplicate errors specifically
      if (error.response && error.response.data) {
        const errorData = error.response.data;

        // Check if error data contains duplicate errors
        if (errorData["Duplicate in DB"]) {
          const duplicateDbErrors = errorData["Duplicate in DB"];
          toast.error(`Duplicates found in the database for SR No: ${duplicateDbErrors.join(", ")}`, {
            autoClose: 900,
            position: 'top-center',
          });
        }

        if (errorData["Duplicate in List"]) {
          const duplicateListErrors = errorData["Duplicate in List"];
          toast.error(`Duplicates found in the list for SR No: ${duplicateListErrors.join(", ")}`, {
            autoClose: 900,
            position: 'top-center',
          });
        }
      } else {
        const errorMessage = "An unexpected error occurred";
        toast.error(errorMessage, {
          autoClose: 900,
          position: 'top-center',
        });
      }
    }).finally(()=>{
      setLoading(false);
    });
};
const handlePrint = async (type) => {
  setLoading(true);
  let exBondingId = exBond.exBondingId;
      try {
          const response = await axios.get(`${ipaddress}api/cfexbondcrg/generateCustomeExBondPrint?companyId=${companyid}&branchId=${branchId}&uname=${username}&type=${type}&cname=${companyname}&bname=${branchname}&exBondingId=${exBondingId}`,
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
              downloadLink.download = 'BOND GATEPASS';
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
          <CardBody>
          */}
            <div>
  
                <Modal
                  Modal
                  isOpen={isModalOpenForExbondSearch}
                  onClose={closeExbondSearchModal}
                  toggle={closeExbondSearchModal}
                  style={{
                    maxWidth: "1200px",
                    fontSize: 12,
                    wioverflow: "-moz-hidden-unscrollable",
                  }}
                >
                  <ModalHeader
                    toggle={closeExbondSearchModal}
                    style={{
                      backgroundColor: "#80cbc4",
                      color: "black",
                      fontFamily: "Your-Heading-Font",
                      textAlign: "center",
                      background: "#26a69a",
                      boxShadow: "0px 5px 10px rgba(0, 77, 64, 0.3)",
                      border: "1px solid rgba(0, 0, 0, 0.3)",
                      borderRadius: "0",
                      backgroundImage:
                        "radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      //backgroundPosition: 'center',
                      backgroundPosition: "center",
                    }}
                  >
                    <h5
                      className="pageHead"
                      style={{
                        fontFamily: "Your-Heading-Font",
                        color: "white",
                      }}
                    >
                      {" "}
                      <FontAwesomeIcon
                        icon={faSearch}
                        style={{
                          marginRight: "8px",
                          color: "white", // Set the color to golden
                        }}
                      />{" "}
                      Search In Bonding
                    </h5>
                  </ModalHeader>
                  <ModalBody
                    style={{
                      backgroundImage:
                        "url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)",
                      backgroundSize: "cover",
                    }}
                  >
                    <Row>
                      <Col md={4}>
                        <FormGroup>
                          <label
                            className="forlabel bold-label"
                            htmlFor="sbRequestId"
                          >
                            Search by InBonding Id / Noc No /Noc Trans Id/ BOE
                            No /Exbond Id
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="exbondSearchId"
                            maxLength={15}
                            name="exbondSearchId"
                            value={exbondSearchId}
                            onChange={(e) => setExbondSearchId(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4} style={{ marginTop: 24 }}>
                        <button
                          className="btn btn-outline-primary btn-margin newButton"
                          style={{ marginRight: 10 }}
                          id="submitbtn2"
                          onClick={() => searchCfexbondCrgHDR(exbondSearchId)}
                        >
                          <FontAwesomeIcon
                            icon={faSearch}
                            style={{ marginRight: "5px" }}
                          />
                          Search
                        </button>
                        <button
                          className="btn btn-outline-danger btn-margin newButton"
                          style={{ marginRight: 10 }}
                          id="submitbtn2"
                          onClick={clearSearchExbond}
                        >
                          <FontAwesomeIcon
                            icon={faRefresh}
                            style={{ marginRight: "5px" }}
                          />
                          Reset
                        </button>
                      </Col>
                    </Row>
                    {/* <hr /> */}
                    <div className="mt-1 table-responsive ">
                      <table className="table table-bordered table-hover tableHeader">
                        <thead className="tableHeader">
                          <tr>
                            <th scope="col">Select</th>
                            <th scope="col">Ex Bonding Id</th>
                            <th scope="col">Ex Bonding Date</th>
                            <th scope="col">In Bonding Id</th>
                            <th scope="col">NOC Trans Id</th>

                            <th scope="col">NOC No </th>
                            <th scope="col"> BE No</th>
                            <th scope="col"> Bond No</th>
                            <th scope="col">Bond Date</th>
                            <th scope="col">Ex BE No</th>
                            <th scope="col">cha</th>
                            <th scope="col">Status</th>
                          </tr>
                          <tr className="text-center">
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
                                <input
                                  type="radio"
                                  name="radioGroup"
                                  onChange={() =>
                                    selectExbondSearchRadio(
                                      item.nocTransId,
                                      item.nocNo,
                                      item.exBondingId,
                                      item.inBondingId
                                    )
                                  }
                                  value={item[0]}
                                />
                              </td>
                              <td>{item.exBondingId}</td>
                              <td>
                                {item.exBondingDate
                                  ? format(
                                      new Date(item.exBondingDate),
                                      "dd/MM/yyyy HH:mm"
                                    )
                                  : null}
                              </td>
                              {/* <td>{item.inBondingDate}</td> */}
                              <td>{item.inBondingId}</td>
                              <td>{item.nocTransId}</td>
                              <td>{item.nocNo}</td>
                              <td>{item.boeNo}</td>
                              <td>{item.bondingNo}</td>
                              {/* <td>{item.bondingDate}</td> */}
                              <td>
                                {item.bondingDate
                                  ? format(
                                      new Date(item.bondingDate),
                                      "dd/MM/yyyy HH:mm"
                                    )
                                  : null}
                              </td>
                              <td>{item.exBondBeNo}</td>
                              <td>{item.cha}</td>
                              <td>{item.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <Pagination
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          color: "gray",
                        }}
                      >
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
                        <Pagination.Last
                          onClick={() => handlePageChange(totalPages)}
                        />
                      </Pagination>
                    </div>
                  </ModalBody>
                </Modal>

              {/* <hr /> */}
              <Row>

<Col md ={2}>
  <Row>

    <Col md={8}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="exBondingId"
                    >
                     Ex Bond Id
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="exBondingId"
                      name="exBondingId"
                      value={exBond.exBondingId}
                      maxLength={18}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>

    <Col md={4} style={{ marginTop: 18 }}>
                  <button
                    className="btn btn-outline-primary newButton"
                    style={{ marginRight: 1 }}
                    id="submitbtn2"
                    onClick={openExbondSearchModal}
                  >
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ marginRight: "1px" }}
                    />
                    
                  </button>
                </Col>
  </Row>
</Col>


              
              <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                BOE No
                                </label>
                                <Select
                                    value={{ value: exBond.boeNo, label: isoName }}
                                    onChange={handleBoeChange}
                                    onInputChange={getBoeData}
                                    options={boeData}
                                    placeholder="Select inBondingId"
                                    isClearable
                                    id="inBondingId"
                                    vesselName="inBondingId"

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

                                {/* <div style={{ color: 'red' }} className="error-message">{errors.boeNo}</div> */}
                            </FormGroup>
                        </Col>

                {/* <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="inBondingId"
                    >
                      In Bonding Id
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="inBondingId"
                      name="inBondingId"
                      value={exBond.inBondingId}
                      maxLength={27}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>
                <Col md={1} style={{ marginTop: 22 }}>
                  <button
                    className="btn btn-outline-primary btn-margin newButton"
                    style={{ marginRight: 10 }}
                    id="submitbtn2"
                    onClick={openIGMSearchModal}
                  >
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ marginRight: "5px" }}
                    />
                  </button>
                </Col>
                <Modal
                  Modal
                  isOpen={isModalOpenForIGMSearch}
                  onClose={closeIGMSearchModal}
                  toggle={closeIGMSearchModal}
                  style={{
                    maxWidth: "1200px",
                    fontSize: 12,
                    wioverflow: "-moz-hidden-unscrollable",
                  }}
                >
                  <ModalHeader
                    toggle={closeIGMSearchModal}
                    style={{
                      backgroundColor: "#80cbc4",
                      color: "black",
                      fontFamily: "Your-Heading-Font",
                      textAlign: "center",
                      background: "#26a69a",
                      boxShadow: "0px 5px 10px rgba(0, 77, 64, 0.3)",
                      border: "1px solid rgba(0, 0, 0, 0.3)",
                      borderRadius: "0",
                      backgroundImage:
                        "radial-gradient( circle farthest-corner at 48.4% 47.5%,  rgba(122,183,255,1) 0%, rgba(21,83,161,1) 90% )",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      //backgroundPosition: 'center',
                      backgroundPosition: "center",
                    }}
                  >
                    <h5
                      className="pageHead"
                      style={{
                        fontFamily: "Your-Heading-Font",
                        color: "white",
                      }}
                    >
                      {" "}
                      <FontAwesomeIcon
                        icon={faSearch}
                        style={{
                          marginRight: "8px",
                          color: "white", // Set the color to golden
                        }}
                      />{" "}
                      Search In Bonding
                    </h5>
                  </ModalHeader>
                  <ModalBody
                    style={{
                      backgroundImage:
                        "url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)",
                      backgroundSize: "cover",
                    }}
                  >
                    <Row>
                      <Col md={4}>
                        <FormGroup>
                          <label
                            className="forlabel bold-label"
                            htmlFor="sbRequestId"
                          >
                            Search by InBonding Id / Noc No /Noc Trans Id/ BOE
                            NO
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="chaSearchId"
                            maxLength={15}
                            name="chaSearchId"
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
                          onClick={() => searchCfinbondCrgHDR(chaSearchId)}
                        >
                          <FontAwesomeIcon
                            icon={faSearch}
                            style={{ marginRight: "5px" }}
                          />
                          Search
                        </button>
                        <button
                          className="btn btn-outline-danger btn-margin newButton"
                          style={{ marginRight: 10 }}
                          id="submitbtn2"
                          onClick={clearSearch}
                        >
                          <FontAwesomeIcon
                            icon={faRefresh}
                            style={{ marginRight: "5px" }}
                          />
                          Reset
                        </button>
                      </Col>
                    </Row>
                    <hr />
                    <div className="mt-1 table-responsive ">
                      <table className="table table-bordered table-hover tableHeader">
                        <thead className="tableHeader">
                          <tr>
                            <th scope="col">Select</th>
                            <th scope="col">In Bonding Id</th>
                            <th scope="col">In Bonding Date</th>
                            <th scope="col">NOC Trans Id</th>

                            <th scope="col">NOC No </th>
                            <th scope="col"> BE No</th>
                            <th scope="col"> Bond No</th>
                            <th scope="col">Bond Date</th>
                            <th scope="col">IGM No</th>
                            <th scope="col">IGM Line No</th>
                            <th scope="col">Status</th>
                          </tr>
                          <tr className="text-center">
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
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <input
                                  type="radio"
                                  name="radioGroup"
                                  onChange={() =>
                                    selectIGMSearchRadio(
                                      item.nocTransId,
                                      item.inBondingId,
                                      item.nocNo
                                    )
                                  }
                                  value={item[0]}
                                />
                              </td>
                              <td>{item.inBondingId}</td>
                              <td>
                                {item.inBondingDate
                                  ? format(
                                      new Date(item.inBondingDate),
                                      "dd/MM/yyyy HH:mm"
                                    )
                                  : null}
                              </td>
                              <td>{item.nocTransId}</td>
                              <td>{item.nocNo}</td>
                              <td>{item.boeNo}</td>
                              <td>{item.bondingNo}</td>
                              <td>
                                {item.bondingDate
                                  ? format(
                                      new Date(item.bondingDate),
                                      "dd/MM/yyyy HH:mm"
                                    )
                                  : null}
                              </td>
                              <td>{item.igmNo}</td>
                              <td>{item.igmLineNo}</td>
                              <td>{item.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <Pagination
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          color: "gray",
                        }}
                      >
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
                        <Pagination.Last
                          onClick={() => handlePageChange(totalPages)}
                        />
                      </Pagination>
                    </div>
                  </ModalBody>
                </Modal> */}

                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="nocTransDate"
                    >
                      In Bonding Date
                    </label>
                    <div style={{ position: "relative" }}>
                      <DatePicker
                        selected={exBond.inBondingDate}
                        onChange={handleNocTransDate}
                        id="inBondingDate"
                        name="inBondingDate"
                        dateFormat="dd/MM/yyyy HH:mm"
                        showTimeSelect
                        value={exBond.inBondingDate}
                        readOnly
                       
                        timeFormat="HH:mm"
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: "100%" ,backgroundColor: "#E0E0E0"}} />}
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
                      htmlFor="exBondingDate"
                    >
                      Ex Bonding Date <span className="error-message">*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <DatePicker

customInput={<input style={{ width: "100%" }} />}
wrapperClassName="custom-react-datepicker-wrapper"
className="form-control"
selected={exBond.exBondingDate}
id="exBondingDate"
value={exBond.exBondingDate}
name="exBondingDate"
onChange={handleNocValidityDateChnage}
timeInputLabel="Time:"
dateFormat="dd/MM/yyyy HH:mm" // 24-hour format for date and time
showTimeInput
timeFormat="HH:mm" // Display time in 24-hour format

                        // selected={exBond.exBondingDate}
                        // onChange={handleNocValidityDateChnage}
                        // id="exBondingDate"
                        // name="exBondingDate"
                        // value={exBond.exBondingDate}
                        // dateFormat="dd/MM/yyyy hh:mm"
                        // className="form-control border-right-0 inputField"
                        // customInput={<input style={{ width: "100%" }} />}
                        // wrapperClassName="custom-react-datepicker-wrapper"
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
                    <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.exBondingDate}
                    </div>
                  </FormGroup>
                </Col>
                {/* <Col md={2}>
                  <FormGroup>
                    <Label className="forlabel bold-label" htmlFor="shift">
                      Shift <span className="error-message">*</span>
                    </Label>
                    <Select
                      id="shift"
                      name="shift"
                      value={shiftOptions.find(
                        (option) => option.value === exBond.shift
                      )}
                      onChange={(selectedOption) =>
                        setExBond((prevNOC) => ({
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
                    <label
                      className="forlabel bold-label"
                      htmlFor="sbRequestId"
                    >
                      Created By <span className="error-message"></span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="createdBy"
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      maxLength={15}
                      name="createdBy"
                      value={exBond.createdBy}
                    />
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
                      id="status"
                      maxLength={15}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      name="status"
                      value={exBond.status === "A" ? "Approved" : exBond.status === "N" ? "New" :""}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
 <Col md={2}>
 <FormGroup>
                                <label   className="forlabel bold-label "
                                 for="exBondingId">Ex Bond Type</label>
                                <select
                                    id="exBondType"
                                    className="form-control form-select"
                                    onChange={handleNocChange}
                                    value={exBond.exBondType}
                                  
                                    // style={{ backgroundColor: '#E0E0E0' }}  // Conditionally set backgroundColor
                                    name="exBondType"
                                >
                                    <option value="N">Select...</option>
                                    <option value="BTB">Bond To Bond</option>
                                    <option value="EXP">Export</option>
                                    <option value="EXB">ExBond</option>
                                    <option value="APN">As Per Notice</option>

                                </select>
                                </FormGroup>
                            </Col>
              <Col md={2}>
              <FormGroup>
                              <label   className="forlabel bold-label "
                                for="sbNo">SB No</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="sbNo"
                                    id="sbNo"
                                    maxLength={20}
                                    readOnly={ exBond.exBondType !== 'EXP'}
                                    style={{ backgroundColor: (exBond.exBondType !== 'EXP') ? '#E0E0E0' : '' }}
                                    value={exBond.exBondType === 'EXP' ? exBond.sbNo : ""}
                                    onChange={handleNocChange}
                                />
                                <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.sbNo}
                    </div>
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                            <FormGroup>
                                <label  className="forlabel bold-label " for="exBondingId">SB Date</label>
                                <div style={{ position: "relative" }}>
                                <DatePicker

                                id="sbDate"
                                    selected={exBond.exBondType === 'EXP' ? exBond.sbDate : null}
                                    onChange={handleSBDateChange}
                                    readOnly={exBond.exBondType !== 'EXP'}  // If 'view' is true, readOnly will be true; otherwise, it will be false
                                    dateFormat="dd/MM/yyyy"
                                  className="form-control border-right-0 inputField"
                                  customInput={<input style={{ width: '100%', backgroundColor: (exBond.exBondType !== 'EXP') ? '#E0E0E0' : '' }} />}
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
                                 <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.sbDate}
                    </div>
                    </FormGroup>
                            </Col>
                            
                 
                            <Col md={2}>
              <FormGroup>
                                <lable  className="forlabel bold-label " 
                                for="trnsferBondNo">Transfer Bond No</lable>
                                <input
                                    type="text"
                                    name="trnsferBondNo"
                                    id="trnsferBondNo"
                                    maxLength={20}
                                    readOnly={exBond.exBondType !== 'BTB'}
                                    style={{ backgroundColor: (exBond.exBondType !== 'BTB') ? '#E0E0E0' : '' }}
                                    value={(exBond.trnsferBondNo === "0000" || exBond.exBondType !== 'BTB') ? "" : exBond.trnsferBondNo}
                                    onChange={handleNocChange}
                                    className="form-control"
                                />
                                </FormGroup>
                            </Col>
             
              <Col md={2}>
              <FormGroup>
                                <lable  className="forlabel bold-label "
                                for="exBondingId">Transfer Bond Date</lable>
                                 <div style={{ position: "relative" }}>
                                <DatePicker
id="trnsferBondDate"
                                    selected={exBond.exBondType !== 'BTB' ? null : exBond.trnsferBondDate}


                                    onChange={handleTransferBondDateChange}
                                    readOnly={exBond.exBondType !== 'BTB'}  // If 'view' is true, readOnly will be true; otherwise, it will be false
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control border-right-0 inputField"
                                    customInput={<input style={{ width: '100%', backgroundColor: ( exBond.exBondType !== 'BTB') ? '#E0E0E0' : '' }} />}
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
                                                     <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.trnsferBondDate}
                    </div>
                    </FormGroup>
                            </Col>
                            {/* <Col md={2}>
                            <FormGroup>
                                <lable  className="forlabel bold-label " for="sbQty">SB Quantity</lable>
                                <input
                                    type="number"
                                    name="sbQty"
                                    id="sbQty"
                                    readOnly={exBond.exBondType !== 'EXP'}
                                    style={{ backgroundColor: (exBond.exBondType !== 'EXP') ? '#E0E0E0' : '' }}
                                    value={exBond.exBondType === 'EXP' ? exBond.sbQty : ''}
                                    onChange={handleNocChange}
                                    className="form-control"
                                />
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                            <FormGroup>
                                <lable  className="forlabel bold-label " for="sbQty">SB Value</lable>
                                <input
                                    type="number"
                                    name="sbValue"
                                    id="sbValue"
                                    readOnly={exBond.exBondType !== 'EXP'}
                                    style={{ backgroundColor: (exBond.exBondType !== 'EXP') ? '#E0E0E0' : '' }}
                                    value={exBond.exBondType === 'EXP' ? exBond.sbValue : ''}
                                    onChange={handleNocChange}
                                    className="form-control"
                                />
                                </FormGroup>
                            </Col>
                            <Col md={2}>
                            <FormGroup>
                                <lable  className="forlabel bold-label " for="sbDuty">SB Duty</lable>
                                <input
                                    type="number"
                                    name="sbDuty"
                                    id="sbDuty"
                                  
                                    style={{ backgroundColor: ( exBond.exBondType !== 'EXP') ? '#E0E0E0' : '' }}
                                    value={exBond.exBondType === 'EXP' ? exBond.sbDuty : ''}
                                    onChange={handleNocChange}
                                    className="form-control"
                                />
                                </FormGroup>
                            </Col> */}
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
                      id="approvedBy"
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      maxLength={15}
                      name="approvedBy"
                      value={exBond.approvedBy}
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
                      CHA <span className="error-message">*</span>
                    </label>
                    <Select
                      value={{ value: exBond.cha, label: chaName }}
                      onChange={handlePortChange}
                      onInputChange={getIsoData}
                      options={isoData}
                      placeholder="Select CHA"
                      // isClearable
                      id="cha"
                      vesselName="cha"
                      readOnly
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
                          backgroundColor: "#E0E0E0"
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

                    <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.cha}
                    </div>
                  </FormGroup>
                </Col>


<Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="giTransporterName"
                    >
                      Importer
                    </label>
                    <Select
                      value={{
                        value: exBond.giTransporterName,
                        label: impName,
                      }}
                      readOnly
                      onChange={handleImporterChange}
                      onInputChange={getImporterData}
                      options={impData}
                      placeholder="Select Importer"
                      // isClearable
                      id="giTransporterName"
                      vesselName="giTransporterName"
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
                          backgroundColor: "#E0E0E0"
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

                    <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.giTransporterName}
                    </div>
                  </FormGroup>
                </Col> */}
<Col md={2}>
  <FormGroup>
    <label
      className="forlabel bold-label"
      htmlFor="sbRequestId"
    >
      CHA <span className="error-message">*</span>
    </label>
    <input
      type="text"
      id="cha"
      name="cha"
      value={chaName}
      onChange={(e) => handleInputChange(e, "cha")}
      readOnly
      style={{
        height: "32px",
        minHeight: "32px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        padding: "0 0.75rem",
        backgroundColor: "#E0E0E0",
        width: "100%",
        boxSizing: "border-box",
      }}
    />
    <div style={{ color: "red" }} className="error-message">
      {bondingErrors.cha}
    </div>
  </FormGroup>
</Col>

<Col md={2}>
  <FormGroup>
    <label
      className="forlabel bold-label"
      htmlFor="giTransporterName"
    >
      Importer
    </label>
    <input
      type="text"
      id="giTransporterName"
      name="giTransporterName"
      value={impName}
      onChange={(e) => handleInputChange(e, "giTransporterName")}
      readOnly
      style={{
        height: "32px",
        minHeight: "32px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        padding: "0 0.75rem",
        backgroundColor: "#E0E0E0",
        width: "100%",
        boxSizing: "border-box",
      }}
    />
    <div style={{ color: "red" }} className="error-message">
      {bondingErrors.giTransporterName}
    </div>
  </FormGroup>
</Col>

                <Col md={2}>
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
                      value={exBond.nocNo}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>
                {/* <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="giTransporterName">
                Importer <span className="error-message">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="giTransporterName"
                  maxLength={15}
                  name="giTransporterName"
                  value={exBond.giTransporterName}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
<div style={{ color: 'red' }} className="error-message">{bondingErrors.giTransporterName}</div>
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
                            backgroundPosition: 'center',
                        }} >
                            <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', color: 'white' }} > <FontAwesomeIcon
                                icon={faSearch}
                                style={{
                                    marginRight: '8px',
                                    color: 'white', // Set the color to golden
                                }}
                            /> Search Importer</h5>
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
                                                    <input type="radio" name="radioGroup" onChange={() => selectImporterSearchRadio(item.partyId, item.gstNo, item[6], item[10], item[12], item[13], item[14], item[15])} value={item[0]} />
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
                    </Modal> */}

                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="igmNo">
                      IGM No
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="igmNo"
                      maxLength={15}
                      name="igmNo"
                      value={exBond.igmNo}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                    <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.nocValidityDate}
                    </div>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="boeNo">
                      BE No
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="boeNo"
                      maxLength={15}
                      name="boeNo"
                      value={exBond.boeNo}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                    <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.nocValidityDate}
                    </div>
                  </FormGroup>
                </Col>
                <Col md={2} style={{ marginTop: 5 }}>
                  <FormGroup>
                    <label className="forlabel bold-label " htmlFor="section49">
                      Section 49 Applicable
                    </label>
                    <input
                      type="checkbox"
                      className="form-check-input radios"
                      style={{ width: 20, height: 20, marginLeft: 18 }}
                      name="section49"
                      id="section49"
                      // onChange={handleCheckboxChange}
                      checked={exBond.section49 === "Y"}
                    />
                  </FormGroup>
                </Col>
             
              </Row>

              <Row>

              </Row>
              <Row>
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="bondingNo">
                      Bonding No
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="bondingNo"
                      maxLength={15}
                      name="bondingNo"
                      value={exBond.bondingNo}
                      onChange={handleNocChange}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                    <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.bondingNo}
                    </div>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="bondingDate"
                    >
                      Bond Date
                    </label>
                    <div style={{ position: "relative" }}>
                      <DatePicker
                        selected={exBond.bondingDate}
                        onChange={handleNocValidityDateChnage}
                        id="bondingDate"
                        name="bondingDate"
                        value={exBond.bondingDate}
                        dateFormat="dd/MM/yyyy"
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: "100%",backgroundColor: "#E0E0E0" }} />}
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
                    <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.bondingDate}
                    </div>
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="exBondBeNo">
                      Ex BE NoExbond BE No{" "}
                      <span className="error-message">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="exBondBeNo"
                      maxLength={15}
                      name="exBondBeNo"
                      value={exBond.exBondBeNo}
                      onChange={handleNocChange}
                    />
                    <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.exBondBeNo}
                    </div>
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="exBondBeDate"
                    >
                      Exbond BE Date <span className="error-message">*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <DatePicker
                        selected={exBond.exBondBeDate}
                        onChange={handleExbondBeDateChnage}
                        id="exBondBeDate"
                        name="exBondBeDate"
                        value={exBond.exBondBeDate}
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
                    <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.exBondBeDate}
                    </div>
                  </FormGroup>
                </Col>



                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="nocValidityDate"
                    >
                      NOC Validity Date
                    </label>
                    <div style={{ position: "relative" }}>
                      <DatePicker
                        selected={exBond.nocValidityDate}
                        onChange={(date) => {
                          setExBond((prevNoc) => ({
                            ...prevNoc,
                            nocValidityDate: date,
                          }));
                        }}
                        //   onChange={handleDocDate}
                        id="nocValidityDate"
                        name="nocValidityDate"
                        dateFormat="dd/MM/yyyy"
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: "100%",backgroundColor: "#E0E0E0" }} />}
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
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="spaceType">
                      Space Type
                    </label>
                    <select
                      className="form-control"
                      id="spaceType"
                      name="spaceType"
                      value={exBond.spaceType}
                      onChange={(e) =>
                        setExBond((prevNOC) => ({
                          ...prevNOC,
                          spaceType: e.target.value,
                        }))
                      }
                    >
                      <option value="General">General</option>
                      <option value="Cargo">Cargo</option>
                    </select>
                  </FormGroup>
                </Col>      
               
              </Row>

              <Row>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="inBondedPackages"
                    >
                      Inbond Packages
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="inBondedPackages"
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      maxLength={15}
                      name="inBondedPackages"
                      value={exBond.inBondedPackages}
                      onChange={handleNocChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="areaOccupied"
                    >
                      Area Occupied
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="areaOccupied"
                      maxLength={15}
                      name="areaOccupied"
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      value={exBond.areaOccupied}
                      onChange={ (e)=> handleNocChange(e,13,3)}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="inBondedGw">
                      Inbond GW
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="inBondedGw"
                      maxLength={15}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      name="inbondGrossWt"
                      value={exBond.inBondedGw}
                      onChange={ (e)=> handleNocChange(e,13,3)}
                    />
                    <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.inBondedGw}
                    </div>
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="inBondedCif"
                    >
                      Inbond CIF Value
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="inBondedCif"
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      maxLength={15}
                      name="inBondedCif"
                      value={exBond.inBondedCif}
                      onChange={ (e)=> handleNocChange(e,13,3)}
                    />
                    <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.inBondedCif}
                    </div>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="inBondedCargoDuty"
                    >
                      Inbond Cargo Duty
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="inBondedCargoDuty"
                      maxLength={15}
                      name="inBondedCargoDuty"
                      value={exBond.inBondedCargoDuty}
                      onChange={ (e)=> handleNocChange(e,13,3)}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="inBondedInsurance"
                    >
                      Inbond Insurance
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="inBondedInsurance"
                      maxLength={15}
                      name="inBondedInsurance"
                      value={exBond.inBondedInsurance}
                      onChange={ (e)=> handleNocChange(e,13,3)}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                    <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.inBondedInsurance}
                    </div>
                  </FormGroup>
                </Col>
             
              </Row>
              <Row>
              <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="remainingPackages"
                    >
                      Remaining Packages
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="remainingPackages"
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      maxLength={15}
                      name="remainingPackages"
                      value={exBond.remainingPackages}
                      onChange={ (e)=> handleNocChange(e,13,3)}
                    />
                    <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.remainingPackages}
                    </div>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="areaRemaining"
                    >
                     Area Remaining
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="areaRemaining"
                      maxLength={15}
                      name="areaRemaining"
                      value={exBond.areaRemaining}
                      // onChange={handleNocChange}
                      onChange={ (e)=> handleNocChange(e,13,3)}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="remainingGw"
                    >
                     Remaining GW
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="remainingGw"
                      maxLength={15}
                      name="remainingGw"
                      value={exBond.remainingGw}
                      onChange={ (e)=> handleNocChange(e,13,3)}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="remainingCif"
                    >
                      Remaining CIF Value
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="remainingCif"
                      maxLength={15}
                      name="remainingCif"
                      value={exBond.remainingCif}
                      onChange={ (e)=> handleNocChange(e,13,3)}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="remainingCargoDuty"
                    >
                      Remaining CargoDuty
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="remainingCargoDuty"
                      maxLength={15}
                      name="remainingCargoDuty"
                      value={exBond.remainingCargoDuty}
                      onChange={ (e)=> handleNocChange(e,13,3)}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>

      
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="remainingInsurance"
                    >
                      Remaining Insurance
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="remainingInsurance"
                      maxLength={15}
                      name="remainingInsurance"
                      value={exBond.remainingInsurance}
                      onChange={ (e)=> handleNocChange(e,13,3)}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />

                    <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.remainingInsurance}
                    </div>
                  </FormGroup>
                </Col>

          
             

              </Row>
              <Row>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="exBondedPackages"
                    >
                      Exbond Packages <span className="error-message">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="exBondedPackages"
                      maxLength={15}
                      name="exBondedPackages"
                      value={exBond.exBondedPackages}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="areaReleased"
                    >
                      Area Released <span className="error-message">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="areaReleased"
                      maxLength={15}
                      name="areaReleased"
                      value={exBond.areaReleased}
                      onChange={ (e)=> handleNocChange(e,13,3)}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="exBondedGw">
                      Exbond GW <span className="error-message">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="exBondedGw"
                      maxLength={15}
                      name="exBondedGw"
                      value={exBond.exBondedGw}
                      onChange={ (e)=> handleNocChange(e,13,3)}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="exBondedCif"
                    >
                      Exbond CIF Value
                      {/* <span className="error-message">*</span> */}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="exBondedCif"
                      maxLength={15}
                      name="exBondedCif"
                      value={exBond.exBondedCif}
                      onChange={ (e)=> handleNocChange(e,13,3)}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="exBondedCargoDuty"
                    >
                      Exbond Cargo Duty <span className="error-message">*</span>
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="exBondedCargoDuty"
                      maxLength={15}
                      name="exBondedCargoDuty"
                      value={exBond.exBondedCargoDuty}
                      // onChange={handleNocChange}
                      onChange={ (e)=> handleNocChange(e,13,3)}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="exBondedInsurance"
                    >
                      Exbond Insurance <span className="error-message">*</span>
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="exBondedInsurance"
                      maxLength={15}
                      name="exBondedInsurance"
                      value={exBond.exBondedInsurance}
                      onChange={ (e)=> handleNocChange(e,13,3)}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>
           </Row>

              <Row>
              <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="balancedQty"
                    >
                      Balance Qty
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="balancedQty"
                      maxLength={15}
                      name="balancedQty"
                      value={exBond.balancedQty}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>
              <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="areaBalanced"
                    >
                      Area Balance
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="areaBalanced"
                      maxLength={15}
                      name="areaBalanced"
                      value={exBond.areaBalanced}
                      onChange={ (e)=> handleNocChange(e,13,3)}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      // onChange={handleNocChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="balanceGw">
                      Balance GW
                    </label>
                    <input
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      className="form-control"
                      type="text"
                      id="balanceGw"
                      name="balanceGw"
                      value={exBond.balanceGw}
                      onChange={ (e)=> handleNocChange(e,13,3)}
                      maxLength={15}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="balanceCif">
                      Balance CIF Value
                      <span className="error-message"></span>
                    </label>
                    <input
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      className="form-control"
                      type="text"
                      id="balanceCif"
                      name="balanceCif"
                      value={exBond.balanceCif}
                      onChange={ (e)=> handleNocChange(e,13,3)}
                      maxLength={15}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="balanceCargoDuty"
                    >
                      Balance Cargo Duty
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="balanceCargoDuty"
                      maxLength={15}
                      name="balanceCargoDuty"
                      value={exBond.balanceCargoDuty}
                      onChange={ (e)=> handleNocChange(e,13,3)}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>
              

                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="balanceInsurance"
                    >
                      Balance Insurance
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="balanceInsurance"
                      maxLength={15}
                      name="balanceInsurance"
                      value={exBond.balanceInsurance}
                      onChange={ (e)=> handleNocChange(e,13,3)}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>
                
              </Row>

              {/* <Row>
              
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="remainingGw"
                    >
                      Bal for Delivery GW
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="remainingGw"
                      maxLength={15}
                      name="remainingGw"
                      value={exBond.remainingGw}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="remainingCif"
                    >
                      Bal For CIF Value
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="remainingCif"
                      maxLength={15}
                      name="remainingCif"
                      value={exBond.remainingCif}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="remainingCargoDuty"
                    >
                      Bal for Delivery CargoDuty
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="remainingCargoDuty"
                      maxLength={15}
                      name="remainingCargoDuty"
                      value={exBond.remainingCargoDuty}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>
              </Row> */}

      

              {/* <Row>
             

                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="balanceInsurance"
                    >
                      Balance Insurance
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="balanceInsurance"
                      maxLength={15}
                      name="balanceInsurance"
                      value={exBond.balanceInsurance}
                      onChange={handleNocChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="areaReleased"
                    >
                      Area Released <span className="error-message">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="areaReleased"
                      maxLength={15}
                      name="areaReleased"
                      value={exBond.areaReleased}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="areaBalanced"
                    >
                      Area Balance
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="areaBalanced"
                      maxLength={15}
                      name="areaBalanced"
                      value={exBond.areaBalanced}
                      onChange={handleNocChange}
                    />
                  </FormGroup>
                </Col>
              </Row> */}

              <Row>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="spaceAllocated"
                    >
                      Space Allocated
                    </label>

                    <Input
                      className="form-control"
                      type="text"
                      id="spaceAllocated"
                      maxLength={225}
                      name="spaceAllocated"
                      value={exBond.spaceAllocated}
                      onChange={handleNocChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="noOf20Ft">
                      No of 20 FT Containers
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="noOf20Ft"
                      maxLength={15}
                      name="noOf20Ft"
                      value={exBond.noOf20Ft}
                      onChange={handleNocChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="noOf40Ft">
                      No of 40 FT Containers
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="noOf40Ft"
                      maxLength={15}
                      name="noOf40Ft"
                      value={exBond.noOf40Ft}
                      onChange={handleNocChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="gateInType">
                      Gate In Type
                    </label>
                    <select
                      className="form-control"
                      id="gateInType"
                      name="gateInType"
                      value={exBond.gateInType}
                      onChange={(e) =>
                        setExBond((prevNOC) => ({
                          ...prevNOC,
                          gateInType: e.target.value,
                        }))
                      }
                    >
                      <option value="Container">Container</option>
                      <option value="Cargo">Cargo</option>
                    </select>
                  </FormGroup>
                </Col>
                <Col md={2} style={{ marginTop: 25 }}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label "
                      htmlFor="periodicBill"
                    >
                      Periodic Billing
                    </label>
                    <input
                      type="checkbox"
                      className="form-check-input radios"
                      style={{ width: 20, height: 20, marginLeft: 18 }}
                      name="periodicBill"
                      id="periodicBill"
                      onChange={handleCheckboxChange}
                      checked={exBond.periodicBill === "Y"}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="importerName"
                    >
                      Forwarder
                    </label>
                    <Select
                      value={{
                        value: exBond.importerName,
                        label: fwdName,
                      }}
                      onChange={handleFwdChange}
                      onInputChange={getFwdData}
                      options={fwdData}
                      placeholder="Select Forworder"
                      isClearable
                      id="importerName"
                      vesselName="importerName"
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

                    <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.importerName}
                    </div>
                  </FormGroup>
                </Col>
           
              </Row>


              <Row>

              <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="comments">
                      Remarks
                    </label>

                    <Input
                      className="form-control"
                      type="textarea"
                      id="comments"
                      maxLength={255}
                      name="comments"
                      value={exBond.comments}
                      onChange={handleNocChange}
                    />
                  </FormGroup>
                </Col> 
              </Row>
            </div>
            <hr />
            <Row className="text-center">
              <Col>
                <button
                  className="btn btn-outline-primary btn-margin newButton"
                  style={{ marginRight: 10 }}
                  id="submitbtn2"
                  disabled={exBond.status==="A"}
                  onClick={handleSave}
                >
                  <FontAwesomeIcon
                    icon={faSave}
                    style={{ marginRight: "5px" }}
                  />
                  Save
                </button>
                <button
                  className="btn btn-outline-primary btn-margin newButton"
                  style={{ marginRight: 10 }}
                  id="submitbtn2"
                  disabled={exBond.status==="A"}
                  onClick={handleSubmit}
                >
                  <FontAwesomeIcon
                    icon={faSave}
                    style={{ marginRight: "5px" }}
                  />
                  Submit
                </button>

                {exBond.status ==="A" ?
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

                {/* <button
                  className="btn btn-outline-primary btn-margin newButton"
                  style={{ marginRight: 10,float:'right' }}
                  id="submitbtn2"
                  onClick={handleShow}
                >
                  <FontAwesomeIcon
                    icon={faSave}
                    style={{ marginRight: "5px" }}
                  />
                  Add Equipment
                </button> */}
                {/* {exBond.status ==="A" ?
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

):null} */}
              </Col>
            </Row>
            <hr />

            <div
              className="table-responsive"
              style={{ maxHeight: "400px", overflowY: "auto"}}
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
                Ex Bonding Cargo Details
              </h5>
              <table className="table table-bordered table-hover tableHeader">
                <thead className="tableHeader">
                  <tr>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      <input
                        type="checkbox"
                        style={{ transform: "scale(1.5)" }}
                        checked={selectAll}
                        onChange={(event) => handleSelectAll(event)}
                      />
                    </th>
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
                      NOC Package
                    </th>

                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      In Bond Package
                    </th>

                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Inbond Gross Weight
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Inbond CIF Value
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Inbond Cargo Value
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Inbond Insurance Value
                    </th>
                   
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Location Inbond
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Inbond Yard PKGS
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                     Cell Area Allocated
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Old Ex-Bond PKG
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Bal Ex-Bond PKG <span className="error-message">*</span>
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                     ExBond Yard PKGS <span className="error-message">*</span>
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                     Grid Area
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Bal Ex-Bond Weight
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Bal Ex-Bond CIF <span className="error-message">*</span>
                    </th>

                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Bal Ex-Bond Duty <span className="error-message">*</span>
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Bal Ex-Bond Insurance
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Add Locations
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems1.map((dtl, index) => (
                    <tr key={index} className="text-center">
                      <td>
                        <input
                          type="checkbox"
                          style={{ transform: "scale(1.5)" }}
                          checked={selectedRows.some(
                            (selectedRow) =>
                              selectedRow.nocTransId === dtl.nocTransId &&
                              selectedRow.nocNo === dtl.nocNo &&
                              selectedRow.cfBondDtlId === dtl.cfBondDtlId &&
                              selectedRow.inBondingId === dtl.inBondingId &&
                              selectedRow.boeNo === dtl.boeNo
                          )}
                          // checked={
                          //   (exBond.exBondingId === dtl.exBondingId ) ||
                          //   selectedRows.some
                          //   ((selectedRow) =>
                          //          selectedRow.nocTransId === dtl.nocTransId &&
                          //     selectedRow.nocNo === dtl.nocNo &&
                          //     selectedRow.cfBondDtlId === dtl.cfBondDtlId &&
                          //     selectedRow.inBondingId === dtl.inBondingId &&
                          //     selectedRow.boeNo === dtl.boeNo
                          //   )
                          // }
                          onChange={(e) => handleCheckboxChangeForDtl(e, dtl)}
                        />
                      </td>
                      <th scope="row">{index + 1}</th>
                      <td>{dtl.commodityDescription}</td>
                      <td>{dtl.typeOfPackage}</td>
                      <td>{dtl.nocPackages}</td>
                      <td>{dtl.inBondedPackages}</td>
                      <td>{dtl.inbondGrossWt}</td>
                      <td>{dtl.inbondCifValue}</td>
                      <td>{dtl.inbondCargoDuty}</td>
                      <td>{dtl.inbondInsuranceValue}</td>
                     

                      <td>{`${dtl.yardLocationId}-${dtl.blockId}-${dtl.cellNoRow}`}</td>
                      <td>{dtl.yardPackages}</td>
                      <td>{dtl.cellAreaAllocated}</td>
                      {/* <td style={{ textAlign: "center", width: "500px" }}>
  <Select 
    isClearable
    options={
      yardLocationsData
        ? yardLocationsData.map((party) => ({
            value: `${party.yardLocationId}-${party.blockId}-${party.cellNoRow}`,
            label: `${party.yardLocationId}-${party.blockId}-${party.cellNoRow}`,
          }))
        : []
    }
    value={
      inputValues[index]?.editedBy
        ? {
            value: inputValues[index].editedBy,
            label: inputValues[index].editedBy,
          }
        : null
    }
    onChange={(selectedOption) => {
      const newValue = selectedOption ? selectedOption.value : null;
      const updatedValues = [...inputValues];
      updatedValues[index] = {
        ...updatedValues[index],
        editedBy: newValue,
      };
     
      handleInputChangeFotDtl(
        { target: { value: newValue } },
        "editedBy",
        index
      );
    }}
    placeholder="Select Location"
    styles={{ container: (base) => ({ ...base, width: '198px' }) }}
  />
</td> */}
 <td>
                        {dtl.exBondedPackages != null
                          ? dtl.exBondedPackages
                          : 0}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <input
                          className="form-control"
                          style={{ width: "180px" }}
                          type="text"
                          value={inputValues[index]?.exBondedPackages}
                          placeholder="Enter PKGS"
                          onKeyPress={(e) => {
                            const charCode = e.which ? e.which : e.keyCode;
                            if (
                              (charCode !== 46 ||
                                e.target.value.includes(".")) && // Only one dot
                              (charCode < 48 || charCode > 57) // Numbers only
                            ) {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e) =>
                            handleInputChangeFotDtl(
                              e,
                              "exBondedPackages",
                              index
                            )
                          }
                        />

                        {inputValues[index]?.errorMessage &&
                          inputValues[index]?.errorMessage.includes(
                            "Ex Bond Packages"
                          ) && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                              {inputValues[index]?.errorMessage}
                            </span>
                          )}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <input
                          className="form-control"
                          style={{ width: "180px" }}
                          type="text"
                          value={inputValues[index]?.exBondyardPackages}
                          placeholder="Enter PKGS"
                          onKeyPress={(e) => {
                            const charCode = e.which ? e.which : e.keyCode;
                            if (
                              (charCode !== 46 ||
                                e.target.value.includes(".")) && // Only one dot
                              (charCode < 48 || charCode > 57) // Numbers only
                            ) {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e) =>
                            handleInputChangeFotDtl(
                              e,
                              "exBondyardPackages",
                              index
                            )
                          }
                        />

                        {inputValues[index]?.errorMessage &&
                          inputValues[index]?.errorMessage.includes(
                            "Ex Bond Yard Packages"
                          ) && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                              {inputValues[index]?.errorMessage}
                            </span>
                          )}
                      </td>

                      <td style={{ textAlign: "center" }}>
                        <input
                          className="form-control"
                          style={{ width: "180px" }}
                          type="text"
                          value={inputValues[index]?.exBondGridArea}
                          placeholder="Enter Area"
                          onKeyPress={(e) => {
                            const charCode = e.which ? e.which : e.keyCode;
                            if (
                              (charCode !== 46 ||
                                e.target.value.includes(".")) && // Only one dot
                              (charCode < 48 || charCode > 57) // Numbers only
                            ) {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e) =>
                            handleInputChangeFotDtl(
                              e,
                              "exBondGridArea",
                              index,13,3
                            )
                          }
                        />

                        {/* {inputValues[index]?.errorMessage &&
                          inputValues[index]?.errorMessage.includes(
                            "Ex Bond Yard Packages"
                          ) && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                              {inputValues[index]?.errorMessage}
                            </span>
                          )} */}
                      </td>

                      <td style={{ textAlign: "center" }}>
                        <input
                          className="form-control"
                          style={{ width: "180px" }}
                          type="text"
                          value={inputValues[index]?.exBondedGW}
                          onKeyPress={(e) => {
                            const charCode = e.which ? e.which : e.keyCode;
                            if (
                              (charCode !== 46 ||
                                e.target.value.includes(".")) && // Only one dot
                              (charCode < 48 || charCode > 57) // Numbers only
                            ) {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e) =>
                            handleInputChangeFotDtl(e, "exBondedGW", index,13,3)
                          }
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <input
                          className="form-control"
                          style={{ width: "180px" }}
                          type="text"
                          value={inputValues[index]?.exBondedCIF}
                          placeholder="Enter CIF value"
                          onChange={(e) =>
                            handleInputChangeFotDtl(e, "exBondedCIF", index,13,3)
                          }
                          onKeyPress={(e) => {
                            const charCode = e.which ? e.which : e.keyCode;
                            if (
                              (charCode !== 46 ||
                                e.target.value.includes(".")) && // Only one dot
                              (charCode < 48 || charCode > 57) // Numbers only
                            ) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {inputValues[index]?.errorMessage &&
                          inputValues[index]?.errorMessage.includes(
                            "CIF Value"
                          ) && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                              {inputValues[index]?.errorMessage}
                            </span>
                          )}
                      </td>

                      <td style={{ textAlign: "center" }}>
                        <input
                          className="form-control"
                          style={{ width: "180px" }}
                          type="text"
                          value={inputValues[index]?.exBondedCargoDuty}
                          placeholder="Enter Cargo Duty"
                          onKeyPress={(e) => {
                            const charCode = e.which ? e.which : e.keyCode;
                            if (
                              (charCode !== 46 ||
                                e.target.value.includes(".")) && // Only one dot
                              (charCode < 48 || charCode > 57) // Numbers only
                            ) {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e) =>
                            handleInputChangeFotDtl(
                              e,
                              "exBondedCargoDuty",
                              index,13,3
                            )
                          }
                        />
                        {inputValues[index]?.errorMessage &&
                          inputValues[index]?.errorMessage.includes(
                            "Cargo Duty"
                          ) && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                              {inputValues[index]?.errorMessage}
                            </span>
                          )}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <input
                          className="form-control"
                          type="text"
                          value={inputValues[index]?.exBondedInsurance}
                          readOnly
                          style={{ backgroundColor: "#E0E0E0" }}
                          onKeyPress={(e) => {
                            const charCode = e.which ? e.which : e.keyCode;
                            // Allow only numbers and one dot
                            if (
                              (charCode !== 46 ||
                                e.target.value.includes(".")) && // Only one dot
                              (charCode < 48 || charCode > 57) // Numbers only
                            ) {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e) =>
                            handleInputChangeFotDtl(
                              e,
                              "exBondedInsurance",
                              index,13,3
                            )
                          }
                        />
                      </td>

                      <td style={{ textAlign: "center" }}>
                      <button
                                    className="btn btn-outline-primary btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    // onClick={() => openYardModal(dtl)}
                                    onClick={() => {
                                      if (exBond.exBondingId) {
                                        openYardModal(dtl);
                                      } else {
                                        toast.warn("Please first save the exbond",{
                                          position:'top-center'
                                        });
                                      }
                                    }}
                                >
                                    <FontAwesomeIcon icon={faAdd} style={{ marginRight: "5px" }} />

                                </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "gray",
                }}
              >
                <Pagination.First onClick={() => handlePageChange1(1)} />
                <Pagination.Prev
                  onClick={() => handlePageChange1(currentPage1 - 1)}
                  disabled={currentPage1 === 1}
                />
                <Pagination.Ellipsis />

                {displayPages1().map((pageNumber) => (
                  <Pagination.Item
                    key={pageNumber}
                    active={pageNumber === currentPage1}
                    onClick={() => handlePageChange1(pageNumber)}
                  >
                    {pageNumber}
                  </Pagination.Item>
                ))}

                <Pagination.Ellipsis />
                <Pagination.Next
                  onClick={() => handlePageChange1(currentPage1 + 1)}
                  disabled={currentPage1 === totalPages1}
                />
                <Pagination.Last
                  onClick={() => handlePageChange1(totalPages1)}
                />
              </Pagination>
            </div>
          {/* </CardBody>
        </Card> */}

<Modal Modal isOpen={isModalOpenForYard} onClose={closeYardModal} toggle={closeYardModal} style={{ maxWidth: '1100px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

<ModalHeader toggle={closeYardModal} style={{
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
    /> Search Yard </h5>


</ModalHeader>
<ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
    <Row>
        <Col md={2}>
            <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                    Ex Bond Id
                </label>
                <Input
                    className="form-control"
                    type="text"
                    readOnly
                    id="exBondingId"
                    name="exBondingId"
                    value={modalDataInput.exBondingId}
                    style={{ backgroundColor: "#E0E0E0" }}
                    // onChange={(e) => setyardId(e.target.value)}
                />
            </FormGroup>
        </Col>

        {/* <Col md={2}>
            <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                    In Bond Date
                </label>
                <Input
                    className="form-control"
                    type="text"
                    id="fobValueInDollar"
                    readOnly
                    style={{ backgroundColor: "#E0E0E0" }}
                    // value={rows.inBondingDate ? format(new Date(inBond.inBondingDate), 'dd/MM/yyyy') : ''}
                    // onChange={(e) => setyardId(e.target.value)}
                />
            </FormGroup>
        </Col> */}

        <Col md={2}>
            <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                    Noc Trans Id
                </label>
                <Input
                    className="form-control"
                    type="text"
                    id="nocTransId"
                    name="nocTransId"
                    value={modalDataInput.nocTransId}
                    readOnly
                    style={{ backgroundColor: "#E0E0E0" }}
                    //onChange={(e) => setyardId(e.target.value)}

                />
            </FormGroup>
        </Col>

        <Col md={2}>
            <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                    Commodity Id
                </label>
                <Input
                    className="form-control"
                    type="text"
                    id="fobValueInDollar"
                    value={modalDataInput.cfBondDtlId}
                    readOnly
                    style={{ backgroundColor: "#E0E0E0" }}
                    onChange={(e) => setyardId(e.target.value)}

                />
            </FormGroup>
        </Col>
        <Col md={2}>
            <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                    Commodity Description
                </label>
                <Input
                    className="form-control"
                    type="text"
                    id="fobValueInDollar"
                    value={modalDataInput.commodityDescription}
                    readOnly
                    style={{ backgroundColor: "#E0E0E0" }}
                    onChange={(e) => setyardId(e.target.value)}

                />
            </FormGroup>
        </Col>
        <Col md={2}>
            <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                 Ex Bond Packages
                </label>
                <Input
                    className="form-control"
                    type="text"
                    id="fobValueInDollar"
                    value={modalDataInput.oldInbondPkgs}
                    readOnly
                    style={{ backgroundColor: "#E0E0E0" }}
                />
            </FormGroup>
        </Col>
      
    </Row>


              <div className="mt-1 table-responsive ">
  <table className="table table-bordered table-hover tableHeader">
  <thead className='tableHeader'>
          <tr>
            <th   scope="col" className="text-center"  style={{ color: "black" }} >   Yard Location  </th>
            <th   scope="col" className="text-center"  style={{ color: "black" }} >   Yard Block    </th>
            <th scope="col" className="text-center"  style={{ color: "black" }} >Cell</th>
            {/* <th scope="col" className="text-center"  style={{ color: "black" }} >Cell Area</th>
            <th scope="col" className="text-center"  style={{ color: "black" }} >Cell Area Used</th> */}
            <th scope="col" className="text-center"  style={{ color: "black" }} >Yard Packages </th>
            <th scope="col" className="text-center"  style={{ color: "black" }} >Cell Area Allocated </th>
            <th scope="col" className="text-center"  style={{ color: "black" }} >Ex Bond Packages <span className="error-message">*</span></th>
            <th scope="col" className="text-center"  style={{ color: "black" }} >Cell Area Released <span className="error-message">*</span></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <Input
                  className="form-control"
                  type="text"
                  value={row.yardLocation}
                  name='yardLocation'
                  readOnly
                  style={{
                    borderColor: errors[`yardLocation-${index}`] ? "red" : "#E0E0E0",
                  }}
                  
                />
                 {errors[`yardLocation-${index}`] && (
                  <span style={{ color: "red" }}>
                    {errors[`yardLocation-${index}`]}
                  </span>
                )}
                
              </td>
              <td>
                <Input
                  className="form-control"
                  type="text"
                  name="yardBlock"
                  value={row.yardBlock}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
                
              </td>
              <td>
                <Input
                  className="form-control"
                  type="text"
                  name="blockCellNo"
                  value={row.blockCellNo}
                  style={{ backgroundColor: "#E0E0E0" }}
                  readOnly
                />
              </td>
              {/* <td>
                <Input
                  className="form-control"
                  type="text"
                  value={row.cellArea}
                  name="cellArea"
                  style={{ backgroundColor: "#E0E0E0" }}
                  readOnly
                />
              </td>
              <td>
                <Input
                  className="form-control"
                  type="text"
                  name="cellAreaUsed"
                  value={row.cellAreaUsed}
                  style={{ backgroundColor: "#E0E0E0" }}
                  readOnly
                />
              </td> */}
               <td>
        <Input
          className="form-control"
          type="text"
          value={row.inBondPackages}
          name="inBondPackages"
          readOnly
          // onChange={(e) => handleInputChange(index, e)}
          style={{
            backgroundColor: errors[`inBondPackages-${index}`] ? "red" : "#E0E0E0",
          }}
        />
        {errors[`inBondPackages-${index}`] && (
          <span style={{ color: "red" }}>
            {errors[`inBondPackages-${index}`]}
          </span>
        )}
      </td>
              <td>
                <Input
                  className="form-control"
                  type="text"
                  name="cellAreaAllocated"
                  value={row.cellAreaAllocated}
                  // onChange={(e) => handleInputChange(index, e)}
                  readOnly
                  style={{
                    borderColor: errors[`cellAreaAllocated-${index}`] ? "red" : "#E0E0E0",
                  }}
                  
                />
                {errors[`cellAreaAllocated-${index}`] && (
                  <span style={{ color: "red" }}>
                    {errors[`cellAreaAllocated-${index}`]}
                  </span>
                )}
              </td>

              <td>
        <Input
          className="form-control"
          type="text"
          value={row.exBondPackages}
          name="exBondPackages"
          onChange={(e) => handleInputChangeModal(index, e)}
          style={{
            borderColor: errors[`exBondPackages-${index}`] ? "red" : "",
          }}
        />
        {errors[`exBondPackages-${index}`] && (
          <span style={{ color: "red" }}>
            {errors[`exBondPackages-${index}`]}
          </span>
        )}
      </td>
              <td>
                <Input
                  className="form-control"
                  type="text"
                  name="exCellAreaAllocated"
                  value={row.exCellAreaAllocated}
                  onChange={(e) => handleInputChangeModal(index, e)}
                 
                  style={{
                    borderColor: errors[`exCellAreaAllocated-${index}`] ? "red" : "",
                  }}
                  
                />
                {errors[`exCellAreaAllocated-${index}`] && (
                  <span style={{ color: "red" }}>
                    {errors[`exCellAreaAllocated-${index}`]}
                  </span>
                )}
              </td>
           
                                {!row.inBondingId && (
    <>
<td>
      {/* Show delete button only if inBondingId does not exist */}
      <button
        onClick={() => deleteRow(index)}
        className="btn btn-danger"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
 
</td>
   </>
   )}

            </tr>
          ))}
        </tbody>
      </table>
      {errors.totalPackages && (
        <div style={{ color: "red" }}>{errors.totalPackages}</div>
      )}
      </div>
              <Row className="text-center">
    <Col  className="d-flex justify-content-center" style={{ marginTop: '24px' }}>
        <button
            className="btn btn-outline-primary btn-margin newButton"
            style={{ marginRight: 10 }}
            id="submitbtn2"
            disabled={exBond.status==="A"}
            onClick={handleSaveCfBondGrid}
        >
            <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
            Save
        </button>

      
        <button
            className="btn btn-outline-danger btn-margin newButton"
            style={{ marginRight: 10 }}
            id="submitbtn2"
            onClick={() => handleYardReset()}
        >
            <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
            Reset
        </button>
    </Col>
</Row>



    <hr />

</ModalBody>
</Modal>
      </div>
    </>
  );
}

export default ExBonding;
