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
  FormFeedback,
} from "reactstrap";
import { Pagination } from "react-bootstrap";
import Swal from "sweetalert2";
import { format } from "date-fns";
// import { format } from "date-fns";

function InBondCargo({noctrans,nocno,acttab,boe,listOfData,listOfInbond,flag,onRequest}) {
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

  const [inbondFlag, setInBondFlag] = useState("add");

  const initialNoc = {
    companyId: companyid, // Company_Id
    branchId: branchId, // Branch_Id
    finYear: "", // Fin_Year
    inBondingId: '', // In_Bonding_Id
    inBondingDate: "", // In_Bonding_Date
    profitcentreId: "N00003", // Profitcentre_Id
    nocTransId: "", // NOC_Trans_Id
    nocTransDate: "", // NOC_Trans_Date
    igmNo: "", // IGM_No
    igmDate: "", // IGM_Date
    igmLineNo: "", // IGM_Line_No
    nocNo: "", // NOC_No
    nocDate: "", // NOC_Date
    nocValidityDate: "", // NOC_Validity_Date
    nocFromDate: "", // NOC_From_Date
    shift: "DAY", // Shift
    gateInId: "", // Gate_In_id
    boeNo: "", // BOE_No
    boeDate: "", // BOE_Date
    accSrNo: "", // Acc_Sr_no
    onAccountOf: "", // On_Account_Of
    shippingAgent: "", // Shipping_Agent
    shippingLine: "", // Shipping_Line
    bondingNo: "", // Bonding_no
    bondingDate: "", // Bonding_Date
    bondValidityDate: "", // Bond_Validity_Date
    invoiceUptoDate: "", // INVOICE_UPTO_DATE
    chaSrNo: "", // cha_sr_no
    cha: "", // CHA
    chaCode: "", // CHA_Code
    billingParty: "", // Billing_Party
    igst: "", // IGST
    cgst: "", // CGST
    sgst: "", // SGST
    impSrNo: "", // imp_sr_no
    importerId: "", // Importer_Id
    importerName: "", // Importer_Name
    importerAddress1: "", // importer_address1
    importerAddress2: "", // importer_address2
    importerAddress3: "", // importer_address3
    numberOfMarks: "", // Number_Of_Marks
    commodityDescription: "", // Commodity_Description
    grossWeight: "", // Gross_Weight
    uom: "", // UOM
    containerNo: "", // CONTAINER_NO
    nocPackages: "", // NOC_Packages
    sampleQty: "", // Sample_Qty
    areaAllocated: "", // Area_Allocated
    areaOccupied: "", // Area_Occupied
    cargoCondition: "", // Cargo_Condition
    gateInPackages: "", // Gate_In_Packages
    inBondedPackages: "", // In_Bonded_Packages
    exBondedPackages: 0, // Ex_Bonded_Packages
    toBondedPackages: 0, // To_Bonded_Packages
    spaceAllocated: "", // Space_Allocated
    section49: "N", // Section_49
    containerSize: "", // Container_Size
    containerType: "", // Container_Type
    examinationId: "", // Examination_Id
    comments: "", // Comments
    cifValue: "", // CIF_Value
    cargoDuty: "", // Cargo_Duty
    insuranceValue: "", // Insurance_Value
    inbondGrossWt: "", // Inbond_Gross_Wt
    inbondInsuranceValue: "", // Inbond_Insurance_Value
    inBond20Ft: "", // In_Bond_20FT
    inBond40Ft: "", // In_Bond_40FT
    exBond20FT: "", // Ex_Bond_20FT
    exBond40FT: "", // Ex_Bond_40FT
    otlNo: "", // OTL_No
    bondYard: "", // Bond_Yard
    status: "", // Status
    createdBy: "", // Created_By
    createdDate: "", // Created_Date
    editedBy: "", // Edited_By
    editedDate: "", // Edited_Date
    approvedBy: "", // Approved_By
    approvedDate: "", // Approved_Date
    dcaNo: "", // DCA_No
    spaceType: "", // Space_Type
    gateInType: "", // Gate_In_Type
    invoiceNo: "", // Invoice_No
    ssrTransId: "", // SSR_TRANS_ID
    section60: "",
    shortagePackages: "",
    damagedQty: "",
    breakage: "",
    extenstionDate1:"",
    extenstionDate2:"",
    extenstionDate3:"",
    exBondedCargoDuty:0,
    exBondedInsurance:0,
    exBondedCif:0,
    exBondedGw:0,
    section60:'N',
    section64:'N',
    sourcePort:'',
    inBondingId:'',
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

  const [isModalOpenForNocTransIdSearch, setisModalOpenForNocTransIdSearch] =
    useState(false);
  const openNocTransIdSearchModal = () => {
    setisModalOpenForNocTransIdSearch(true);
    searchNocTrasnsId("");
  };

  const closeNocTrasnsIdSearchModal = () => {
    setisModalOpenForNocTransIdSearch(false);
    setNocTransIdSearchId("");
    setCHASearchedData([]);
  };

  const [nocTansIdSearchId, setNocTransIdSearchId] = useState("");
  // const [chaSearchedData, setCHASearchedData] = useState([]);

  const searchNocTrasnsId = (id) => {
    setLoading(true);
    axios
      .get(
        `${ipaddress}api/cfbondnoc/dataAllDataOfCfBondNocForInbondScreen?companyId=${companyid}&branchId=${branchId}&partyName=${id}`,
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

  const clearSearchNocTransId = () => {
    setNocTransIdSearchId("");
    searchNocTrasnsId("");
  };

  const selectNocTransIdearchRadio = (
    nocTransId,
    NocNo,
    portName,
    vesselName,
    shippingLineName,
    shippingLineCode,
    shippingAgentName,
    shippingAgentCode
  ) => {
    closeNocTrasnsIdSearchModal();
    axios
      .get(
        `${ipaddress}api/cfbondnoc/getDataByTransIdANDNocID?companyId=${companyid}&branchId=${branchId}&nocTransID=${nocTransId}&nocNo=${NocNo}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;

        console.log("getDataByPartyIdAndGstNo", data);

        // setInBond(response.data);

        setInBond((pri) => ({
          ...pri,
          // areaAllocated: response.data.area,
          chaCode: response.data.chaCode,
          shift:response.data.shift,
          cha:response.data.cha,
          nocTransId:response.data.nocTransId,
          nocNo:response.data.nocNo,
          igmLineNo:response.data.igmLineNo,
          nocTransDate:response.data.nocTransDate,
          nocDate:response.data.nocDate,
          igmNo:response.data.igmNo,
          igmDate:response.data.igmDate,
          boeNo:response.data.boeNo,
          boeDate:response.data.boeDate,
          importerAddress1:response.data.importerAddress1,
          importerAddress2:response.data.importerAddress2,
          importerAddress3:response.data.importerAddress3,
          importerId:response.data.importerId,
          importerName:response.data.importerName,
          uom:response.data.uom,
          nocPackages:response.data.nocPackages,
          areaAllocated:response.data.area,
          numberOfMarks:response.data.numberOfMarks,
          grossWeight:response.data.grossWeight,
          insuranceValue:response.data.insuranceValue,
          cifValue:response.data.cifValue,
          cargoDuty:response.data.cargoDuty,
          nocValidityDate:response.data.nocValidityDate,
          nocFromDate:response.data.nocFromDate,
          gateInPackages:response.data.gateInPackages
        }));
        handleYardLocationData();
        setChaName(response.data.createdBy);
       
        fetchData(
          companyid,
          branchId,
          response.data.nocTransId,
          response.data.nocNo,
        );

        // setInBond(response.data);
        //   setBondingErrors((prevErrors) => ({
        //     ...prevErrors,
        //     cha: "",
        //   }));
      })
      .catch((error) => {});
  };

  const [isModalOpenForIGMSearch, setisModalOpenForIGMSearch] = useState(false);
  const openIGMSearchModal = () => {
    setisModalOpenForIGMSearch(true);
    searchCHA("");
  };

  const closeIGMSearchModal = () => {
    setisModalOpenForIGMSearch(false);
    setChaSearchId("");
    setCHASearchedData([]);
  };

  const [chaSearchId, setChaSearchId] = useState("");
  const [chaSearchedData, setCHASearchedData] = useState([]);

  const searchCHA = (id) => {
    setLoading(true);
    axios
      .get(
        `${ipaddress}api/cfinbondcrg/search?companyId=${companyid}&branchId=${branchId}&partyName=${id}`,
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
    searchCHA("");
  };
  const [chaName, setChaName] = useState("");
  useEffect(() => {
    if(acttab == "P00250")
      {
        
       if (listOfData.nocTransId && listOfData.nocNo && listOfData.boeNo && listOfInbond.inBondingId) {
        selectIGMSearchRadio(listOfData.nocTransId,listOfInbond.inBondingId, listOfData.nocNo);
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
   }, [listOfData.nocTransId,listOfInbond.inBondingId,listOfData.nocNo,acttab]);

  const selectIGMSearchRadio = (
    trasid,
    inbondingId,
    nocNo,
  ) => {
    closeIGMSearchModal();
    axios
      .get(
        `${ipaddress}api/cfinbondcrg/getDataByTransIdANDNocIDAndInBondingId?companyId=${companyid}&branchId=${branchId}&nocTransID=${trasid}&inBondingId=${inbondingId}&nocNo=${nocNo}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        setInBondFlag("edit");
        console.log("getDataByPartyIdAndGstNo", data);
        setInBond((inBond) => ({
          ...inBond,
          cha: response.data.cha,
          chaCode: response.data.chaCode,
         areaOccupied:response.data.areaOccupied,
         areaAllocated:response.data.areaAllocated,
        }));
        setInBond(response.data)



        setChaName(response.data.commodityDescription);
        setBondingErrors((prevErrors) => ({
          ...prevErrors,
          cha: "",
        }));

        // fetchData(
        //   companyid,
        //   branchId,
        //   response.data.nocTransId,
        //   response.data.nocNo,
        // );

        fetchDataAfterSave(
          companyid,
            branchId,
            response.data.inBondingId,
            response.data.nocTransId,
        )
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

        setInBond((inBond) => ({
          ...inBond,
          importerId: response.data.partyId,
          importerName: response.data.partyName,
          importerAddress1: response.data.address1,
          importerAddress3: response.data.address2,
          importerAddress2: response.data.address3,
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

  const [inBond, setInBond] = useState(initialNoc);
  const [nocDtl, setNocDtl] = useState(initialNocDtl);
  const handleNocChange = (e) => {
    const { name, value } = e.target;

    setInBond((prevNOC) => {
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

    document.getElementById(name).classList.remove("error-border");
    setBondingErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleDocDateChange = (date) => {
    setInBond((prevNoc) => ({
      ...prevNoc,
      nocFromDate: date,
    }));

    setInBond((prevNoc) => ({
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
    setInBond((prevNoc) => ({
      ...prevNoc,
      nocTransDate: date,
    }));
    //   document.getElementById("nocFromDate").classList.remove('error-border');
    //   setBondingErrors((prevErrors) => ({
    //     ...prevErrors,
    //     nocFromDate: "",
    // }));
  };
  

  const handleDate1Change = (date) => {
    setInBond((prevNoc) => ({
      ...prevNoc,
      extenstionDate1: date,
     
    }));
    // document.getElementById("bondingDate").classList.remove("error-border");
    // setBondingErrors((prevErrors) => ({
    //   ...prevErrors,
    //   bondingDate: "",
    // }));
  };
  const handleDate2Change = (date) => {
    setInBond((prevNoc) => ({
      ...prevNoc,
      extenstionDate2: date,
    
    }));
    // document.getElementById("bondingDate").classList.remove("error-border");
    // setBondingErrors((prevErrors) => ({
    //   ...prevErrors,
    //   bondingDate: "",
    // }));
  };
  const handleDate3Change = (date) => {
    setInBond((prevNoc) => ({
      ...prevNoc,
      extenstionDate3: date,
    }));
    // document.getElementById("bondingDate").classList.remove("error-border");
    // setBondingErrors((prevErrors) => ({
    //   ...prevErrors,
    //   bondingDate: "",
    // }));
  };
  const handleNocValidityDateChnage = (date) => {
    setInBond((prevNoc) => ({
      ...prevNoc,
      bondingDate: date,
      bondValidityDate: date ? new Date(date.getTime() + 364 * 24 * 60 * 60 * 1000) : null,
    }));
    document.getElementById("bondingDate").classList.remove("error-border");
    setBondingErrors((prevErrors) => ({
      ...prevErrors,
      bondingDate: "",
    }));
  };

  const handleCheckboxChange = (e) => {
    setInBond((prevNOC) => ({
      ...prevNOC,
      section49: e.target.checked ? "Y" : "N",
    }));
  };
  const handleCheckboxChange64 = (e) => {
    setInBond((prevNOC) => ({
      ...prevNOC,
      section64: e.target.checked ? "Y" : "N",
    }));
  };
  const handleCheckboxChange60 = (e) => {
    setInBond((prevNOC) => ({
      ...prevNOC,
      section60: e.target.checked ? "Y" : "N",
    }));
  };

  const [bondingErrors, setBondingErrors] = useState({
    bondingNo: "",
    bondingDate: "",
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

  

  const handleSave = () => {
    setLoading(true);


    if(inBond.status === 'A')
    {
      setLoading(false);
      toast.info("Record is alredy approved.", {
          autoClose: 1000
      })
      return;
    }
    if(inBond.status === 'N')
    {
      setLoading(false);
      toast.info("Record is alredy saved go for approve.", {
          autoClose: 1000
      })
      return;
    }

    let errors = {};
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

    if (!inBond.bondingNo) {
      errors.bondingNo = "Bonding No is required.";
      document.getElementById("bondingNo").classList.add("error-border");
      toast.error("Bonding No is required.", {
        // ... (toast options)
      });
      setLoading(false);
      return;
    }
    if (!inBond.bondingDate) {
      errors.bondingDate = "Bonding Date is required.";
      document.getElementById("bondingDate").classList.add("error-border");
      toast.error("Bonding Date is required.", {});
      setLoading(false);
      return;
    }

    let isValid = true;
    const updatedValues = [...inputValues];
   
    console.log("selectedRows_________________",selectedRows);

    selectedRows.forEach((dtl, index) => 
    {
      if (!updatedValues[index]) {
        updatedValues[index] = {};
      }

      const values = updatedValues[index];
      let errorMessage = "";

       // Calculate the total area occupied
  let totalAreaOccupied = selectedRows.reduce((total, dtl, index) => {
    const values = updatedValues[index] || {};
    return total + parseFloat(values.areaOccupied || 0);
  }, 0);

  const remainingArea = inBond.areaAllocated;
  if (totalAreaOccupied > remainingArea) 
  {
    toast.error(
      `Total Area Occupied (${totalAreaOccupied}) exceeds available area (${remainingArea}).`,
      {
        // ... (toast options)
      }
    );
    setLoading(false);
    isValid = false;
  }
      // Check for required fields
      if (!values.cellAreaAllocated) {
        errorMessage = "Cell Area Allocated is required";
        toast.error("Cell Area Allocated is required.", {
          // ... (toast options)
        });
        setLoading(false);
        isValid = false;
      }
      if (!values.inBondedPackages) {
        errorMessage = "In Bond Packages is required";
        toast.error("In Bond Packages is required.", {
          // ... (toast options)
        });
        setLoading(false);
        isValid = false;
      } else if (parseFloat(values.inBondedPackages) > dtl.gateInPackages) {
        errorMessage =
          "In Bond Packages should not be greater than NOC Packages";
        toast.error(
          "In Bond Packages should not be greater than NOC Packages.",
          {
            // ... (toast options)
          }
        );
        setLoading(false);
        isValid = false;
      }

      if (!values.editedBy) 
      {
        errorMessage = "Locations is required";
        toast.error("Locations is required.", {
          // ... (toast options)
        });
        setLoading(false);
        isValid = false;
      }
      if (!values.yardPackages) 
      {
        errorMessage = "Yard Bond Packages is required";
        toast.error("Yard Bond Packages is required.", {
          // ... (toast options)
        });
        setLoading(false);
        isValid = false;
        console.log("dtl.inBondedPackages",values.inBondedPackages);

      } else if (parseFloat(values.yardPackages) > values.inBondedPackages) {
        errorMessage =
          `Yard Bond Packages should not be greater than Inbonded Packages-${values.inBondedPackages}`;
        toast.error(
          `Yard Bond Packages should not be greater than Inbonded Packages-${values.inBondedPackages}`,
          {
          }
        );
        setLoading(false);
        isValid = false;
      }

      if (!values.inbondCifValue) 
      {
        errorMessage = "In Bond CIF Value is required";
        toast.error("In Bond CIF Value is required.", {
          // ... (toast options)
        });
        setLoading(false);
        isValid = false;
      } else if (parseFloat(values.inbondCifValue) > dtl.cifValue) {
        errorMessage = "In Bond CIF Value should not be greater than CIF Value";
        toast.error("In Bond CIF Value should not be greater than CIF Value.", {
          // ... (toast options)
        });
        setLoading(false);
        isValid = false;
      }

      if (!values.inbondCargoDuty) {
        errorMessage = "In Bond Cargo Duty is required";
        toast.error("In Bond Cargo Duty is required.", {
          // ... (toast options)
        });
        setLoading(false);
        isValid = false;
      } else if (parseFloat(values.inbondCargoDuty) > dtl.cargoDuty) {
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
      updatedValues[index].inbondInsuranceValue =
        parseFloat(values.inbondCifValue || 0) +
        parseFloat(values.inbondCargoDuty || 0);

      // Automatically calculate inbondGrossWt
      const perPackageWeight = dtl.grossWeight / dtl.nocPackages;
      updatedValues[index].inbondGrossWt = (
        perPackageWeight * parseFloat(values.inBondedPackages || 0)
      ).toFixed(2);

      updatedValues[index].errorMessage = errorMessage;
    });


    

    const dataToSave = selectedRows.map((row) => {
      const index = currentItems.findIndex(
        (item) =>
          item.nocTransId === row.nocTransId &&
          item.nocNo === row.nocNo &&
          item.cfBondDtlId === row.cfBondDtlId
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
      inBond: {
        ...inBond,
      },
      nocDtl: {
        ...dataToSave,
      },
    };
    
    console.log("requestBody_______________________",requestBody);
    console.log("inBond_______________________",inBond);
    console.log("dataToSave_______________________",dataToSave);
    if (isValid) {
      axios
        .post(
          `${ipaddress}api/cfinbondcrg/saveCfInbondCrg?companyId=${companyid}&branchId=${branchId}&user=${userId}&flag=${inbondFlag}`,
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .then((response) => {
          setInBond(response.data);
          fetchDataAfterSave(
            companyid,
            branchId,
            response.data.inBondingId,
            response.data.nocTransId,
          );
          setInBondFlag("edit");
          toast.success("Data save successfully!!", {
            autoClose: 800,
          });
          onRequest();
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.response.data, {
            autoClose: 800,
          });
        });

      console.log("Data saved successfully:", dataToSave);
    } else {
      // Update state to reflect errors
      setInputValues(updatedValues);
    }
  };

  const handleSubmit = () => {
    setLoading(true);

    if(inBond.status === 'A')
    {
      setLoading(false);
      toast.info("Record is alredy approved.", {
          autoClose: 1000
      })
      return;
    }

    let errors = {};
  
    const dataToSave = selectedRows.map((row) => {
      const index = currentItems.findIndex(
        (item) =>
          item.nocTransId === row.nocTransId &&
          item.nocNo === row.nocNo &&
          item.cfBondDtlId === row.cfBondDtlId
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
      inBond: {
        ...inBond,
      },
      nocDtl: {
        ...dataToSave,
      },
    };
  
    axios
    .post(
      `${ipaddress}api/cfinbondcrg/approve?companyId=${companyid}&branchId=${branchId}&user=${userId}&flag=${inbondFlag}`,
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
        setInBond((prev)=>({
...prev,
status:'A',
        }));
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
    setInBond({
      companyId: companyid, // Company_Id
      branchId: branchId, // Branch_Id
      finYear: "", // Fin_Year
      inBondingId:'',
      inBondingDate: "", // In_Bonding_Date
      profitcentreId: "N00003", // Profitcentre_Id
      nocTransId: "", // NOC_Trans_Id
      nocTransDate: "", // NOC_Trans_Date
      igmNo: "", // IGM_No
      igmDate: "", // IGM_Date
      igmLineNo: "", // IGM_Line_No
      nocNo: "", // NOC_No
      nocDate: "", // NOC_Date
      nocValidityDate: "", // NOC_Validity_Date
      nocFromDate: "", // NOC_From_Date
      shift: "DAY", // Shift
      gateInId: "", // Gate_In_id
      boeNo: "", // BOE_No
      boeDate: "", // BOE_Date
      accSrNo: "", // Acc_Sr_no
      onAccountOf: "", // On_Account_Of
      shippingAgent: "", // Shipping_Agent
      shippingLine: "", // Shipping_Line
      bondingNo: "", // Bonding_no
      bondingDate: "", // Bonding_Date
      bondValidityDate: "", // Bond_Validity_Date
      invoiceUptoDate: "", // INVOICE_UPTO_DATE
      chaSrNo: "", // cha_sr_no
      cha: "", // CHA
      chaCode: "", // CHA_Code
      billingParty: "", // Billing_Party
      igst: "", // IGST
      cgst: "", // CGST
      sgst: "", // SGST
      impSrNo: "", // imp_sr_no
      importerId: "", // Importer_Id
      importerName: "", // Importer_Name
      importerAddress1: "", // importer_address1
      importerAddress2: "", // importer_address2
      importerAddress3: "", // importer_address3
      numberOfMarks: "", // Number_Of_Marks
      commodityDescription: "", // Commodity_Description
      grossWeight: "", // Gross_Weight
      uom: "", // UOM
      containerNo: "", // CONTAINER_NO
      nocPackages: "", // NOC_Packages
      sampleQty: "", // Sample_Qty
      areaAllocated: "", // Area_Allocated
      areaOccupied: "", // Area_Occupied
      cargoCondition: "", // Cargo_Condition
      gateInPackages: "", // Gate_In_Packages
      inBondedPackages: "", // In_Bonded_Packages
      exBondedPackages: 0, // Ex_Bonded_Packages
      toBondedPackages: "", // To_Bonded_Packages
      spaceAllocated: "", // Space_Allocated
      section49: "N", // Section_49
      containerSize: "", // Container_Size
      containerType: "", // Container_Type
      examinationId: "", // Examination_Id
      comments: "", // Comments
      cifValue: "", // CIF_Value
      cargoDuty: "", // Cargo_Duty
      insuranceValue: "", // Insurance_Value
      inbondGrossWt: "", // Inbond_Gross_Wt
      inbondInsuranceValue: "", // Inbond_Insurance_Value
      inBond20Ft: "", // In_Bond_20FT
      inBond40Ft: "", // In_Bond_40FT
      exBond20FT: "", // Ex_Bond_20FT
      exBond40FT: "", // Ex_Bond_40FT
      otlNo: "", // OTL_No
      bondYard: "", // Bond_Yard
      status: "", // Status
      createdBy: "", // Created_By
      createdDate: "", // Created_Date
      editedBy: "", // Edited_By
      editedDate: "", // Edited_Date
      approvedBy: "", // Approved_By
      approvedDate: "", // Approved_Date
      dcaNo: "", // DCA_No
      spaceType: "", // Space_Type
      gateInType: "", // Gate_In_Type
      invoiceNo: "", // Invoice_No
      ssrTransId: "", // SSR_TRANS_ID
      section60: "",
      shortagePackages: "",
    damagedQty: "",
    breakage: "",
      extenstionDate1:"",
      extenstionDate2:"",
      extenstionDate3:"",
      exBondedCargoDuty:0,
      exBondedInsurance:0,
      exBondedCif:0,
      exBondedGw:0,
      section60:'N',
      section64:'N',
      sourcePort:'',

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
    setBondingErrors("");
    setSelectAll(false);
    setSelectedRows([]);
    setCfbondnocDtl([]);
    setInBondFlag("add");
    setChaName("");
    setCHASearchedData([]);
  };

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const handleOpenModal = () => {
    let errors = {};

    if (!inBond.cha) {
      errors.cha = "Cha is required.";
      document.getElementById("cha").classList.add("error-border");
    }
    if (!inBond.boeNo) {
      errors.boeNo = "boeNo no is required.";
      document.getElementById("boeNo").classList.add("error-border");
    }
    if (!inBond.igmNo) {
      errors.igmNo = "IGM No is required.";
      document.getElementById("igmNo").classList.add("error-border");
    }
    if (!inBond.boeDate) {
      errors.boeDate = "BOE Date is required.";
      document.getElementById("boeDate").classList.add("error-border");
    }
    if (!inBond.nocDate) {
      errors.nocDate = "NOC Date is required.";
      document.getElementById("nocDate").classList.add("error-border");
    }
    if (!inBond.nocFromDate) {
      errors.nocFromDate = "NOC From Date is required.";
      document.getElementById("nocFromDate").classList.add("error-border");
    }
    if (!inBond.nocValidityDate) {
      errors.nocValidityDate = "NOC Validity date is required.";
      document.getElementById("nocValidityDate").classList.add("error-border");
    }
    if (!inBond.igmDate) {
      errors.igmDate = "IGM Date is required.";
      document.getElementById("igmDate").classList.add("error-border");
    }
    if (!inBond.importerName) {
      errors.importerName = "Importer Name is required.";
      document.getElementById("importerName").classList.add("error-border");
    }
    // if (!inBond.grossWeight) {
    //   errors.grossWeight = "Gross Weight is required."
    //   document.getElementById("grossWeight").classList.add("error-border");
    // }
    if (!inBond.uom) {
      errors.uom = "UOM is required.";
      document.getElementById("uom").classList.add("error-border");
    }
    if (!inBond.igmLineNo) {
      errors.igmLineNo = "IGM Line No required.";
      document.getElementById("igmLineNo").classList.add("error-border");
    }

    if (!inBond.area) {
      errors.area = "Area is required.";
      document.getElementById("area").classList.add("error-border");
    }

    if (Object.keys(errors).length > 0) {
      setBondingErrors(errors);
      setLoading(false);
      toast.error("Please fill in the required fields.", {
        autoClose: 1000,
      });
      return;
    }
    setModal(true);
  };

  const handleOpenClose = () => {
    setModal(false);
    setNocDtl("");
  };
  const handleClose = () => {
    setNocDtl("");
    setNocDtl(initialNocDtl);
    setNocDtl((nocdtl) => ({
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
    }));
  };

  const [cfbondnocDtl, setCfbondnocDtl] = useState([]);
  const fetchData = async (companyid, branchId, nocTransId, nocNo,areaAllocated) => {
    try {
      const response = await fetch(
        `${ipaddress}api/cfbondnoc/getALLCfbondNocDtl?companyId=${companyid}&branchId=${branchId}&nocTransId=${nocTransId}&nocNo=${nocNo}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }


      
const a = areaAllocated;

      const data = await response.json();

      console.log("after geting serach frrm inbonidng id",data);
      
      setCfbondnocDtl(data);
      setCHASearchedData(data);

    const newTotalPackages = data.reduce(
      (sum, row) => sum + (parseFloat(row.gateInPackages) || 0),
      0
    );

console.log("inBond.areaAllocated________________",a);


const differences = data.map(row => 
  parseFloat(row.gateInPackages) - parseFloat(row.inBondedPackages)
);

const packages = data.map(row => 
 parseFloat(row.inBondedPackages || 0)
);

let area ;
if(inBond.inBondingId!=null)
{
  area = a / newTotalPackages * packages;
}
else
{
  area = a / newTotalPackages * differences ;
}
  setInputValues(data.map(mnr => ({
    ...mnr,
    inBondedPackages: (mnr.gateInPackages - (mnr.inBondedPackages || 0)),
    // Ensure inbondGrossWt is initially set to a calculated value
    inbondCargoDuty:handleInputChangeNew((mnr.cargoDuty - (mnr.inbondCargoDuty || 0)),13,3),
    inbondCifValue:handleInputChangeNew((mnr.cifValue - (mnr.inbondCifValue || 0)),13,3),
    //inbondInsuranceValue: (mnr.insuranceValue - (mnr.inbondInsuranceValue || 0)),
    // Corrected inbondInsuranceValue calculation
    inbondInsuranceValue:handleInputChangeNew((
      (mnr.cargoDuty - (mnr.inbondCargoDuty || 0)) +
      (mnr.cifValue - (mnr.inbondCifValue || 0))
    ),13,3),
    insuranceValue : mnr.insuranceValue,
    // inbondCargoDuty :mnr.cargoDuty || 0,
    // inbondCifValue : mnr.cifValue || 0,
    // inbondInsuranceValue : mnr.insuranceValue || 0,
    areaOccupied : a  / newTotalPackages * (mnr.gateInPackages - (mnr.inBondedPackages || 0)),
    shortagePackages:mnr.shortagePackages || 0,
    damagedQty:mnr.damagedQty || 0,
    breakage:mnr.breakage || 0,
    // areaOccupied:area || 0,
    // editedBy: `${mnr.createdBy}-${mnr.editedBy}-${mnr.approvedBy}` || '',
    editedBy: '',
    inbondGrossWt: (
        ((mnr.grossWeight / mnr.nocPackages) * (mnr.gateInPackages - (mnr.inBondedPackages || 0)))
    ).toFixed(2),
    
})));

      console.log("cfbodnNocDtl records ", data);
    } catch (error) {
      // setError(error);
    } finally {
      setLoading(false);
    }
  };


  const fetchDataAfterSave = async (companyid, branchId,inBondingId, nocTransId) => {
    try {
      const response = await fetch(
        `${ipaddress}api/cfinbondcrg/findByCompanyIdAndBranchIdAndCommonBondingIdAndNocTransId?companyId=${companyid}&branchId=${branchId}&inBondingId=${inBondingId}&nocTransId=${nocTransId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("after geting serach frrm inbonidng id");

      const data = await response.json();
      setCfbondnocDtl(data);
      setCHASearchedData(data);

      const selectedData = data.filter((row) => row.inBondingId !== undefined && row.inBondingId !== null);
      setSelectedRows(selectedData);
  setSelectAll(true);
  //setIsDataFetched(true);

console.log("fetchDataAfterSave_____________________________",data);

setInputValues(data.map(mnr => ({
  ...mnr,

  gateInPackages:mnr.gateInPackages,
  insuranceValue:mnr.insuranceValue,
  inBondedPackages: (mnr.gateInPackages - (mnr.inBondedPackages || 0)),
  inbondCargoDuty: handleInputChangeNew((mnr.cargoDuty - (mnr.inbondCargoDuty || 0)),13,3),
  inbondCifValue: handleInputChangeNew((mnr.cifValue - (mnr.inbondCifValue || 0)),13,3),
  inbondInsuranceValue:handleInputChangeNew((
    (mnr.cargoDuty - (mnr.inbondCargoDuty || 0)) +
    (mnr.cifValue - (mnr.inbondCifValue || 0))
  ),13,3),
  shortagePackages:mnr.shortagePackages || 0,
  damagedQty:mnr.damagedQty || 0,
  breakage:mnr.breakage || 0,
  editedBy: `${mnr.yardLocationId || ''}~${mnr.blockId || ''}~${mnr.cellNoRow || ''}` || '',
  
  inbondGrossWt: (
      ((mnr.grossWeight / mnr.nocPackages) * (mnr.gateInPackages - (mnr.inBondedPackages || 0)))
  ).toFixed(2),
  
})));



      console.log("cfbodnNocDtl records ", data);
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
    const value = selectedOption ? selectedOption.value : "";
    setSelectedTypeOfPackages(value);
    setNocDtl((prev) => ({
      ...prev,
      typeOfPackage: value,
    }));
    setErrors("");

    document.getElementById("typeOfPackage").classList.remove("error-border");
    setNocDtlErrors((prevErrors) => ({
      ...prevErrors,
      typeOfPackage: "",
    }));
  };

  const options = TYPEOFPACKAGES.map((packages) => ({
    value: packages.jarDtlId,
    label: packages.jarDtlDesc,
  }));



  const getMinDate = (date) => {
    if (!date) return null;
    const minDate = new Date(date);
    minDate.setDate(minDate.getDate() + 1); // Add one day
    return minDate;
  };

  const defaultOption = { value: "N00003", label: "NOC BOND" };

  const handleChangeProfitCenter = (selectedOption) => {
    // Update the state or handle the change as needed
    setInBond((prevState) => ({
      ...prevState,
      profitcentreId: selectedOption ? selectedOption.value : "",
    }));
  };

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    setSelectAll(selectedItems.length === chaSearchedData.length);
  }, [selectedItems, chaSearchedData]);

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      setSelectedRows([...currentItems]); // Select all rows
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
        selectedRow.cfBondDtlId === row.cfBondDtlId
    );
  };

  const [inputValues, setInputValues] = useState([]);

const [savedInputValues, setSavedInputValues] = useState([]);

  // const handleInputChangeFotDtl = (event, fieldName, index) => {
  //   const { value } = event.target;
  //   setInputValues((prevInputValues) => {
  //     const updatedValues = [...prevInputValues];
  //     const dtl = currentItems[index]; // Get the current item details for comparison

  //     let errorMessage = "";
  //     if (
  //       fieldName === "inBondedPackages" &&
  //       parseFloat(value) > dtl.gateInPackages - dtl.inBondedPackages
  //     ) 
      
  //     {
  //       errorMessage =
  //         "In Bond Packages should not be greater than gate in Packages minus old inbond packages";
  //     } 

  //     else if (fieldName === "inBondedPackages") {
  //       // Calculate exBondedCIF based on the package ratio

  //       const perPackageWeight = dtl.grossWeight / dtl.nocPackages;
  //       updatedValues[index].inbondGrossWt = (
  //         perPackageWeight * parseFloat(value)
  //       ).toFixed(2);

  //       const exBondedCIF = (
  //         (parseFloat(dtl.cifValue) / parseFloat(updatedValues[index].inBondedPackages) ) *
  //         parseFloat(value)
  //       ).toFixed(2);

  //       // Calculate exBondedCargoDuty based on the package ratio
  //       const exBondedCargoDuty = (
  //         (parseFloat(dtl.cargoDuty) / parseFloat(updatedValues[index].inBondedPackages)) *
  //         parseFloat(value)
  //       ).toFixed(2);

  //       // Update the values in the state
  //       updatedValues[index].inbondCifValue = exBondedCIF;
  //       updatedValues[index].inbondCargoDuty = exBondedCargoDuty;

  //       // Automatically calculate exBondedInsurance as the sum of exBondedCIF and exBondedCargoDuty
  //       updatedValues[index].inbondInsuranceValue = (
  //         parseFloat(exBondedCIF) + parseFloat(exBondedCargoDuty)
  //       ).toFixed(2);
  //     }

  //     else if (fieldName ==="yardPackages" &&  parseFloat(value) > dtl.gateInPackages - dtl.inBondedPackages)
  //     {
  //       errorMessage =
  //       "Yard Bond Packages should not be greater than gate in Packages minus old inbond packages";
  //     }

  //     else if (
  //       fieldName === "areaOccupied" &&
  //       parseFloat(value) > (inBond.areaAllocated)
  //   ) {
  //       errorMessage =
  //           "Area occupied should not be greater than allocated area.";
  //   } 
  //     else if 
  //     (
  //       fieldName === "inbondCifValue" &&
  //       parseFloat(value) > dtl.cifValue 
  //     ) 
  //     {
  //       errorMessage = "In Bond CIF Value should not be greater than CIF Value";
  //     } else if 
  //     (
  //       fieldName === "inbondCargoDuty" &&
  //       parseFloat(value) > dtl.cargoDuty
  //     ) {
  //       errorMessage =
  //         "In Bond Cargo Duty should not be greater than Cargo Duty";
  //     }

  //     //Automatically calculate inbondInsuranceValue
  //     if (fieldName === "inbondCifValue" || fieldName === "inbondCargoDuty") {
  //       updatedValues[index].inbondInsuranceValue =
  //         parseFloat(updatedValues[index].inbondCifValue || 0) +
  //         parseFloat(updatedValues[index].inbondCargoDuty || 0);
  //     }

  //     // Automatically calculate inbondGrossWt
  //     // if (fieldName === "inBondedPackages") {
  //     //   const perPackageWeight = dtl.grossWeight / dtl.nocPackages;
  //     //   updatedValues[index].inbondGrossWt = (
  //     //     perPackageWeight * parseFloat(value)
  //     //   ).toFixed(2);
  //     // }

  //     if (fieldName === "yardPackages") {
  //       const perPackageWeight =  dtl.areaOccupied || parseFloat(updatedValues[index].areaOccupied)  /  parseFloat(updatedValues[index].inBondedPackages);
  //       updatedValues[index].cellAreaAllocated = (
  //         perPackageWeight * parseFloat(value)
  //       ).toFixed(2);
  //     }
  //     updatedValues[index] = {
  //       ...updatedValues[index],
  //       [fieldName]: value,
  //       errorMessage,
  //     };
  //     return updatedValues;
  //   });
  // };
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

  const handleInputChangeFotDtl = (event, fieldName, index,val,val1) => {
    const { value } = event.target;
    let newValue =value;

    if(['cellAreaAllocated','inbondGrossWt','inbondCifValue','inbondCargoDuty','inbondInsuranceValue'].includes(fieldName))
    {
      newValue =handleInputChangeNew(value,val,val1)
    }

    setInputValues((prevInputValues) => {
      const updatedValues = [...prevInputValues];
      // const dtl = currentItems[index]; 
      
      const selectedRow = selectedRows[index];

      console.log("selectedRow",selectedRow);
      const dtl = currentItems[index]; // Get the current item details for comparison

      let errorMessage = "";


      
      const newTotalPackages = updatedValues.reduce(
        (sum, row) => sum + (parseFloat(row.gateInPackages) || 0),
        0
      );

    if (fieldName === "inBondedPackages") 
    {
      // Calculate per package weight and update inbondGrossWt
      const perPackageWeight = dtl.grossWeight / dtl.nocPackages;
      updatedValues[index].inbondGrossWt = (
        perPackageWeight * parseFloat(newValue)
      ).toFixed(2);

     
  const area = inBond.areaAllocated / newTotalPackages;
      updatedValues[index].areaOccupied = (
        area * parseFloat(newValue)
      ).toFixed(2);
    

  // Calculate exBondedCIF and exBondedCargoDuty using the newly input value
  const newBondedPackages = parseFloat(newValue); // Use the input value for calculations

  const cal = parseFloat(dtl.cifValue) / (dtl.gateInPackages);
  updatedValues[index].inbondCifValue = (cal * newBondedPackages).toFixed(2);

  const calCargo = parseFloat(dtl.cargoDuty) / (dtl.gateInPackages);
  updatedValues[index].inbondCargoDuty = (calCargo * newBondedPackages).toFixed(2);

      // Calculate and update inbondInsuranceValue
      updatedValues[index].inbondInsuranceValue = (
        parseFloat(updatedValues[index].inbondCifValue) + parseFloat( updatedValues[index].inbondCargoDuty)
      ).toFixed(2);
    }


let addition;

    if (inBond.inBondingId)
    {
      addition=dtl.gateInPackages;
    }else
    {
      addition=dtl.gateInPackages - dtl.inBondedPackages;
      // addition=dtl.inBondedPackages;
    }

    //const addition=dtl.gateInPackages - dtl.inBondedPackages;
console.log("addition",addition);

    if (fieldName === "inBondedPackages" && parseFloat(newValue) > addition) {
      errorMessage = `In Bond Packages should not be greater than ${addition}`;
    }

    // if (fieldName === "inBondedPackages" && parseFloat(value) > dtl.gateInPackages - dtl.inBondedPackages) {
    //   errorMessage = `In Bond Packages should not be greater than ${addition}`;
    // }

    // Validate yardPackages
    if (fieldName === "yardPackages" && parseFloat(newValue) > addition) {
      errorMessage = `Yard Bond Packages should not be greater than ${addition}`;
    }
      // Validation for areaOccupied
       if (fieldName === "areaOccupied" && parseFloat(newValue) > inBond.areaAllocated) {
        errorMessage = "Area occupied should not be greater than allocated area.";
      }

      // Validation for inbondCifValue
       if (fieldName === "inbondCifValue" && parseFloat(newValue) > dtl.cifValue) {
        errorMessage = "In Bond CIF Value should not be greater than CIF Value";
      }

      // Validation for inbondCargoDuty
       if (fieldName === "inbondCargoDuty" && parseFloat(newValue) > dtl.cargoDuty) {
        errorMessage = "In Bond Cargo Duty should not be greater than Cargo Duty";
      }

      // Automatically calculate inbondInsuranceValue based on inbondCifValue and inbondCargoDuty
      if (fieldName === "inbondCifValue" || fieldName === "inbondCargoDuty") {
        updatedValues[index].inbondInsuranceValue = (
          parseFloat(updatedValues[index].inbondCifValue || 0) +
          parseFloat(updatedValues[index].inbondCargoDuty || 0)
        ).toFixed(2);
      }

      // Calculate cellAreaAllocated for yardPackages
      if (fieldName === "yardPackages") {
        const perPackageArea = dtl.areaOccupied / dtl.inBondedPackages; // Assuming the area is distributed per package
        updatedValues[index].cellAreaAllocated = (
          perPackageArea * parseFloat(newValue)
        ).toFixed(2);
      }

      // Set the updated values and error message if applicable
      updatedValues[index] = {
        ...updatedValues[index],
        [fieldName]: newValue,
        errorMessage,
      };

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
            selectedRow.cfBondDtlId === row.cfBondDtlId
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
          selectedRow.cfBondDtlId !== row.cfBondDtlId
      );
      setSelectedRows(updatedRows);
    }
  };

  // State to hold totals for the selected rows
  const [totals, setTotals] = useState({
    totalInBondedPackages: 0,
    totalShortagePackages: 0,
    totalDamagedQty: 0,
    totalBreakage: 0,
  });

  // Function to calculate the totals based on selected rows
  const calculateTotals = () => {
    let totalInBondedPackages = 0;
    let totalShortagePackages = 0;
    let totalDamagedQty = 0;
    let totalBreakage = 0;
    let totalAreaOccupied = 0;

    selectedRows.forEach((row) => {
      const isInBondingIdValid = inBond?.inBondingId != null && inBond?.inBondingId !== '';
      const index = currentItems.findIndex(
        (item) =>
          // item.nocTransId === row.nocTransId &&
          // item.nocNo === row.nocNo &&
          // item.cfBondDtlId === row.cfBondDtlId


          inBond?.inBondingId
          ? // If srNo exists, use commodityId
            item.nocTransId === row.nocTransId &&
            item.nocNo === row.nocNo &&
            item.cfBondDtlId === row.cfBondDtlId
          : // Otherwise, use cfBondDtlId
            item.nocTransId === row.nocTransId &&
            item.nocNo === row.nocNo &&
            item.cfBondDtlId === row.cfBondDtlId
      );
      if (index !== -1) {
        // totalInBondedPackages += parseFloat(
        //   inputValues[index]?.inBondedPackages || 0
        // );
        // totalShortagePackages += parseFloat(
        //   inputValues[index]?.shortagePackages || 0
        // );

        // totalAreaOccupied += parseFloat(
        //   inputValues[index]?.areaOccupied || 0
        // );
        // totalDamagedQty += parseFloat(inputValues[index]?.damagedQty || 0);
        // totalBreakage += parseFloat(inputValues[index]?.breakage || 0);
        const source = isInBondingIdValid ? row : inputValues[index];

        totalInBondedPackages += parseFloat(source?.inBondedPackages || 0);
        totalShortagePackages += parseFloat(source?.shortagePackages || 0);
        totalAreaOccupied += parseFloat(source?.areaOccupied || 0);
        totalDamagedQty += parseFloat(source?.damagedQty || 0);
        totalBreakage += parseFloat(source?.breakage || 0);
      }
    });

    setTotals({
      totalInBondedPackages,
      totalShortagePackages,
      totalDamagedQty,
      totalBreakage,
      totalAreaOccupied
    });

    setInBond((pre) => ({
      ...pre,
      inBondedPackages:handleInputChangeNew(totalInBondedPackages,13,3),
      shortagePackages: handleInputChangeNew(totalShortagePackages,13,3),
      damagedQty: handleInputChangeNew(totalDamagedQty,13,3),
      breakage: handleInputChangeNew(totalBreakage,13,3),
      areaOccupied:handleInputChangeNew(totalAreaOccupied,13,3)
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

        
        console.log("yardblockcellsyardblockcells________________________________________________________________",data);
      })
      .catch((error) => console.error("Error:", error));
  };


 
  useEffect(() => {
    handleYardLocationData();
  }, []);

  const [yardData, setYardData] = useState([]);
    const [yardId, setyardId] = useState('');

    const getYardData = (id) => {
        axios.get( `${ipaddress}api/yardblockcells/getLocationsAllYardCell?companyId=${companyid}&branchId=${branchId}&search=${id}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }
        })
            .then((response) => {
                setYardData(response.data);
            })
            .catch((error) => {

            })
    }

    const handleYardReset = () => {
        setyardId('');
        getYardData('');
        setModalDataInput((prev)=>({
          ...prev,
          yardLocation:'',
          yardBlock:'',
          blockCellNo :'',
          cellArea:'',
          cellAreaAllocated:'',
          cellAreaUsed:'',
             }));
             setRows([]);
             setErrors('');
    }




    const [currentPage1, setCurrentPage1] = useState(1);
    const [itemsPerPage1] = useState(5);

    const indexOfLastItem1 = currentPage1 * itemsPerPage1;
    const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
    const currentItems1 = yardData.slice(indexOfFirstItem1, indexOfLastItem1);
    const totalPages1 = Math.ceil(yardData.length / itemsPerPage1);

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

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };



    const [isModalOpenForYard, setIsModalOpenForYard] = useState(false);
    const [yardFlag, setYardFlag] = useState('');

const [modalData ,setModalData ]=useState({});
// const [modalDataInput ,setModalDataInput ]=useState({});
const [validationError, setValidationError] = useState('');
const [validationErrorArea, setValidationErrorArea] = useState('');

const initialYardGrid = {
  companyId:companyid,
  branchId:branchId,
  finYear: '',
  nocTransId: '',
  inBondingId: '',
  srNo: '1',
  gateInId: '',
  yardLocation: '',
  yardBlock: '',
  blockCellNo: '',
  cellArea: 0.000,
  cellAreaUsed: 0.00,
  cellAreaAllocated: 0.00,
  qtyTakenOut: 0,
  areaReleased: 0.000,
  gridReleased: '',
  inBondPackages: '',
  status: '',
  createdBy: '',
  createdDate: null,
  editedBy: '',
  editedDate: null,
  approvedBy: '',
  approvedDate: null,
  cfBondDtlId:'',
  oldInbondPkgs:'',
};

const [modalDataInput, setModalDataInput] = useState(initialYardGrid);
const [cost, setCost] = useState(0);

const handleGridData = (inBid,dtlId) => {
  axios.get(
    `${ipaddress}api/cfinbondgrid/getAfterSaveGrid?companyId=${companyid}&branchId=${branchId}&inBondingId=${inBid}&cfBondDtlId=${dtlId}`,
    {
      headers: `Authorization ${jwtToken}`
    }
  )
    .then((response) => {
      console.log(response.data);
      const data =response.data;
      // setYardCellArray(response.data);

      // setRows(Array.isArray(response.data) ? response.data : []); // Ensure rows is an array

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
      }));
  
      // Update the rows state with new values
      setRows(newRows);

      console.log("Updated rows: ", rows); // Log the new data

      // Calculate the total count of inBondPackages
      const totalInBondPackages = response.data.reduce((total, item) => {
        return total + (item.inBondPackages || 0);
      }, 0);

      // Set the cost with the total value of inBondPackages
      setCost(totalInBondPackages);

      console.log("Total inBondPackages:", totalInBondPackages);
      console.log("yardblockcellsyardblockcells",response.data);
    })
    .catch((error) => console.error("Error:", error));
};


const [modalFlag ,setModalFlag] =useState('add');

const handleChangeInput = (e) => {
  const { name, value } = e.target;
  let validationError = '';
  let validationErrorArea = '';

  // Validate the value based on the input field name
  if (name === 'inBondPackages') {
    const gateInPackages = modalDataInput.gateInPackages ? modalDataInput.gateInPackages : modalDataInput.inBondPackages;
    const oldInbondPkgs = (modalDataInput.oldInbondPkgs ? modalDataInput.oldInbondPkgs : 0) + (cost!=null ? cost :'0');
    const maxAllowedValue = gateInPackages - oldInbondPkgs;

    if (parseInt(value, 10) > maxAllowedValue) {
      validationError = `Value cannot be greater than ${maxAllowedValue}`;
    }
    setInBondedPackagesError(validationError);
  }

  if (name === 'cellAreaAllocated') {
    const cellA = modalDataInput.cellArea ? modalDataInput.cellArea : 0;
    const cellAUsed = modalDataInput.cellAreaUsed ? modalDataInput.cellAreaUsed : 0;
    const maxAllowedValue = cellA - cellAUsed;

    if (parseInt(value, 10) > maxAllowedValue) {
      validationErrorArea = `Area allocated cannot be greater than ${maxAllowedValue}`;
    }
    setCellAreaAllocatedError(validationErrorArea);
  }

  setModalDataInput((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

    const openYardModal = (dtl) => {
      setIsModalOpenForYard(true);
        setModalData(dtl);

console.log("dtl_______________________",dtl);

        setModalDataInput((pre) =>({
          ...pre,
          inBondPackages :(dtl.gateInPackages!=null ? dtl.gateInPackages : '0') - (dtl.inBondedPackages!=null ? dtl.inBondedPackages:'0') - (cost!=null ? cost :'0'),
          commodityDescription : dtl.commodityDescription,
          cfBondDtlId :dtl.cfBondDtlId ,
          // oldInbondPkgs :(dtl.inBondedPackages ? dtl.inBondedPackages :'0') + (cost!=null ? cost :'0'),
          // oldInbondPkgs :(dtl.inBondedPackages ? dtl.inBondedPackages :'0') ,
          nocNo:dtl.nocNo,
          gateInPackages :dtl.gateInPackages,
          inBondingId:inBond.inBondingId,
          nocTransId:dtl.nocTransId,
gateInId:inBond.gateInId,
        }))

        fetchSumOfInBondPackages(inBond.inBondingId,dtl.cfBondDtlId,dtl.nocTransId,);
    handleGridData(inBond.inBondingId,dtl.cfBondDtlId);
        getYardData('');
    }

    const fetchSumOfInBondPackages = async (inBondingId, cfBondDtlId, nocTransId) => {
      axios.get(`${ipaddress}api/cfinbondcrg/sum?companyId=${companyid}&branchId=${branchId}&inBondingId=${inBondingId}&cfBondDtlId=${cfBondDtlId}&nocTransId=${nocTransId}`,{
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
        setYardFlag('');
        setIsModalOpenForYard(false);
        setSelectedItemsYard([]);
        setModalDataInput({});
        setErrors('');
    };

    const [yardLocationError, setYardLocationError] = useState('');
    const [cellAreaAllocatedError, setCellAreaAllocatedError] = useState('');
    const [inBondedPackagesError, setInBondedPackagesError] = useState('');
    const [yardCellArray, setYardCellArray] = useState([]);

    const handleEditClick = (item) => {
      setModalFlag('edit')
      setModalDataInput(item);
    };
   
    
    const handleSaveCfBondGrid = () => {
setLoading(true);
      const hasEmptyFields = rows.some(row => 
        !row.yardLocation || !row.yardBlock || !row.blockCellNo || 
        !row.cellArea || !row.cellAreaUsed || !row.inBondPackages || 
        !row.cellAreaAllocated
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
        (sum, row) => sum + (parseFloat(row.inBondPackages) || 0),
        0
      );
    
      if (newTotalPackages > modalDataInput.oldInbondPkgs) {
        const errorMessage = `Total packages (${newTotalPackages}) cannot exceed ${modalDataInput.oldInbondPkgs}`;
        setErrors((prevErrors) => ({
          ...prevErrors,
          totalPackages: errorMessage, // Set error message for total packages
        }));
        setLoading(true);
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
      console.log("rows__________________________________________________________________",rows);
     
      const dataToSave = {
        grid: {
          ...rows,
        },
        modal: {
          ...modalDataInput,
        }
      };
      
      axios
        .post(
          `${ipaddress}api/cfinbondgrid/saveCfInBondGrid?companyId=${companyid}&branchId=${branchId}&flag=${modalFlag}&user=${userId}`,
          dataToSave,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .then((response) => {
          const data = response.data;
          console.log("handleSaveCfBondGrid", data);
          // handleGridData(response.data.inBondingId,response.data.cfBondDtlId);

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
          }));
      
          // Update the rows state with new values
          setRows(newRows);
          handleYardLocationData();
          setModalFlag('edit'); 
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
    

    const deleteService = (id,cid,srNo) => {
      Swal.fire({
        title: "Are you sure?",
        html: "Are you sure you want to delete the record?",
        icon: "warning",
        showCancelButton: true,
        customClass: {
          icon: "icon-smaller", // Apply the custom class to the icon
        },
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, close it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(
              `${ipaddress}api/cfinbondgrid/deleteRecord?companyId=${companyid}&branchId=${branchId}&inBondingId=${id}&cfBondDtlId=${cid}&srNo=${srNo}`,
               null,
              {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
              }
            )
            .then((response) => {
              handleGridData(modalDataInput.inBondingId,modalDataInput.cfBondDtlId);
              if (response.data === "success") {
                Swal.fire({
                  title: "Deleted!",
                  text: "Data deleted successfully!!!",
                  icon: "success",
                });
              }
            })
            .catch((error) => { 

            });
        }
      });
    };

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

    
    const [selectedItemsYard, setSelectedItemsYard] = useState([]);
const toggleSelectItem = (item) => {
  setSelectedItemsYard(prevSelectedItems => {
        const isSelected = prevSelectedItems.some(selectedItem => selectedItem.yardLocationId === item.yardLocationId && selectedItem.blockId === item.blockId && selectedItem.cellNoRow === item.cellNoRow );
        if (isSelected) {
            return prevSelectedItems.filter(selectedItem => !(selectedItem.yardLocationId === item.yardLocationId && selectedItem.blockId === item.blockId && selectedItem.cellNoRow === item.cellNoRow));
        } else {
            return [...prevSelectedItems, item];
        }
    });
};

const handleSubmitSelectedItems = () => {
  setIsModalOpenForYard(false);
  console.log("Selected items:", selectedItemsYard);
};

const [boeData, setBOEData] = useState([]);
const [isoId, setISOId] = useState('');
const [isoName, setIsoName] = useState('');
const handleBoeChange = async (selectedOption, { action }) => {

  if (action === 'clear') {

      console.log("respone datacagahgdhsagdhs",selectedOption);
      setIsoName('');
      setISOId('');
      setCHASearchedData([]);
      setCfbondnocDtl([]);
      setChaName('');
      setInBond((pre) => ({
        ...pre,
        boeNo: '',
        chaCode: '',
        shift: '',
        cha: '',
        nocTransId: '',
        nocNo: '',
        igmLineNo: '',
        nocTransDate: '',
        nocDate: '',
        igmNo: '',
        igmDate: '',
        boeDate: '',
        importerAddress1: '',
        importerAddress2: '',
        importerAddress3: '',
        importerId: '',
        importerName: '',
        uom: '',
        nocPackages: '',
        areaAllocated: '',
        numberOfMarks: '',
        grossWeight: '',
        insuranceValue: '',
        cifValue: '',
        cargoDuty: '',
        nocValidityDate: '',
        nocFromDate: '',
        gateInPackages: '',
        bondingNo:'',
        bondingDate:'',
        bondValidityDate:'',
        inBondingId:'',
        status:'',
        sourcePort:'',
        createdBy:'',
        cha:'',
        section49:'',
        approvedBy:'',
        inBondingId:'',
      }));
      
      document.getElementById('boeNo').classList.remove('error-border');
      setBondingErrors((prevErrors) => ({
          ...prevErrors,
          ['boeNo']: "",
      }));
  }
  else {
      console.log("respone datacagahgdhsagdhs",selectedOption);

      setInBond((prev) => ({
        ...prev,
        boeNo: selectedOption ? selectedOption.value : '',
        boeNo: selectedOption ? selectedOption.label : '',
      }));
    
      setIsoName(selectedOption ? selectedOption.value : '');
      setISOId(selectedOption ? selectedOption.value : '');

      setInBond((pri) => ({
        ...pri,
        boeNo:selectedOption ? selectedOption.value : '',
        chaCode: selectedOption?.chaCode,               // Use selectedOption for values
        shift: selectedOption?.shift,
        cha: selectedOption?.cha,
        nocTransId: selectedOption?.nocTransId,
        nocNo: selectedOption?.nocNo,
        igmLineNo: selectedOption?.igmLineNo,
        nocTransDate: selectedOption?.nocTransDate,
        nocDate: selectedOption?.nocDate,
        igmNo: selectedOption?.igmNo,
        igmDate: selectedOption?.igmDate,
        boeNo: selectedOption?.value,                  // Assuming `selectedOption.value` holds `boeNo`
        boeDate: selectedOption?.boeDate,
        importerAddress1: selectedOption?.importerAddress1,
        importerAddress2: selectedOption?.importerAddress2,
        importerAddress3: selectedOption?.importerAddress3,
        importerId: selectedOption?.importerId,
        importerName: selectedOption?.importerName,
        uom: selectedOption?.uom,
        nocPackages: selectedOption?.nocPackages,
        areaAllocated: selectedOption?.areaAllocated,
        numberOfMarks: selectedOption?.numberOfMarks,
        grossWeight: selectedOption?.grossWeight,
        insuranceValue: selectedOption?.insuranceValue,
        cifValue: selectedOption?.cifValue,
        cargoDuty: selectedOption?.cargoDuty,
        nocValidityDate: selectedOption?.nocValidityDate,
        nocFromDate: selectedOption?.nocFromDate,
        gateInPackages: selectedOption?.gateInPackages,
        bondingNo:selectedOption?.bono,
        bondingDate:selectedOption?.bondate,
        bondValidityDate:selectedOption?.bovaldate,
        sourcePort:selectedOption?.sourcePort,
      }));
      setChaName(selectedOption?.editedBy)
      handleYardLocationData();
      console.log("respone datacagahgdhsagdhs",inBond.inBondingId);
      fetchData(
        companyid,
        branchId,
        selectedOption?.nocTransId,
        selectedOption?.nocNo,
        selectedOption?.areaAllocated,
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

  axios.get( `${ipaddress}api/cfbondnoc/dataAllDataOfCfBondNocForInbondScreen?companyId=${companyid}&branchId=${branchId}&partyName=${val}`, {
      headers: {
          Authorization: `Bearer ${jwtToken}`
      }
  })
      .then((response) => {
          const data = response.data;

          console.log("response.data",data);
          const portOptions = data.map(port => ({
            value: port.boeNo,
            label: port.boeNo,
            type: port.containerType,
            size: port.containerSize,
            weight: port.tareWeight,
            chaCode: port.chaCode,               // Now getting values from port
            shift: port.shift,
            cha: port.cha,
            nocTransId: port.nocTransId,
            nocNo: port.nocNo,
            igmLineNo: port.igmLineNo,
            nocTransDate: port.nocTransDate,
            nocDate: port.nocDate,
            igmNo: port.igmNo,
            igmDate: port.igmDate,
            boeNo: port.boeNo,                  // No need for response.data, use port directly
            boeDate: port.boeDate,
            importerAddress1: port.importerAddress1,
            importerAddress2: port.importerAddress2,
            importerAddress3: port.importerAddress3,
            importerId: port.importerId,
            importerName: port.importerName,
            uom: port.uom,
            nocPackages: port.nocPackages,
            areaAllocated: port.area,            // Mapping 'port.area' to 'areaAllocated'
            numberOfMarks: port.numberOfMarks,
            grossWeight: port.grossWeight,
            insuranceValue: port.insuranceValue,
            cifValue: port.cifValue,
            cargoDuty: port.cargoDuty,
            nocValidityDate: port.nocValidityDate,
            nocFromDate: port.nocFromDate,
            gateInPackages: port.gateInPackages,
            editedBy:port.editedBy,
            bono:port.bondingNo,
            bondate:port.bondingDate,
            bovaldate:port.bondValidityDate,
            sourcePort:port.sourcePort,
          }));
          
          if (listOfData.boeNo) {
            handleBoeChange(portOptions[0], { action: "select" });
          }

          setBOEData(portOptions);
      })
      .catch((error) => {

      })
}

  const [totalPackages, setTotalPackages] = useState(0);
const [rows, setRows] = useState([
  {
    companyId:companyid,
    branchId:branchId,
    finYear: '',
    nocTransId: '',
    inBondingId: '',
    srNo: '1',
    gateInId: '',
    yardLocation: '',
    yardBlock: '',
    blockCellNo: '',
    cellArea: 0.000,
    cellAreaUsed: 0.00,
    cellAreaAllocated: 0.00,
    qtyTakenOut: 0,
    areaReleased: 0.000,
    gridReleased: '',
    inBondPackages: '',
    status: '',
    createdBy: '',
    createdDate: null,
    editedBy: '',
    editedDate: null,
    approvedBy: '',
    approvedDate: null,
    cfBondDtlId:'',
    oldInbondPkgs:'',
  },
]);

// Function to add a new row

// Handle input change for a specific row
// const handleInputChange = (index, field, value) => {
//   const updatedRows = rows.map((row, i) =>
//     i === index ? { ...row, [field]: value } : row
//   );
//   setRows(updatedRows);
// };

const handleInputChange = (index, e) => {
  const { name, value } = e.target;
  const newRows = [...rows];
  newRows[index][name] = value;

  // Check if the field being updated is inBondPackages
  if (name === "inBondPackages") {
    const currentRow = newRows[index];
    const maxInBondPackages = currentRow.inBondPackages; // Set this to the actual max from your yard data

    if (parseFloat(value) > maxInBondPackages) {
      const errorMessage = `This row's inBondPackages cannot exceed ${maxInBondPackages}.`;
      setErrors((prevErrors) => ({
        ...prevErrors,
        [`inBondPackages-${index}`]: errorMessage,
      }));
      toast.error(errorMessage); // Show toast notification
    } else {
      // Clear row-specific error if valid
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[`inBondPackages-${index}`];
        return newErrors;
      });
    }

    // Calculate the new total packages
    const newTotalPackages = newRows.reduce(
      (sum, row) => sum + (parseFloat(row.inBondPackages) || 0),
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
  if (name === "cellAreaAllocated") {
    const cellArea = parseFloat(rows[index].cellArea);
    const cellAreaUsed = parseFloat(rows[index].cellAreaUsed);
    const cellAreaAllocated = parseFloat(value);

    // Validation: Cell Area Allocated should not exceed available area
    if (cellAreaAllocated > (cellArea - cellAreaUsed)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [`cellAreaAllocated-${index}`]: `Allocated area cannot exceed ${cellArea - cellAreaUsed}`,
      }));
    } else {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[`cellAreaAllocated-${index}`];
        return newErrors;
      });
    }
  }
  setRows(newRows);
};


// const deleteRow = (index) => {
//   const updatedRows = rows.filter((_, i) => i !== index);
//   setRows(updatedRows);
// };

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


const handleSelectChange = (index, selectedOption) => {

  const fieldName = 'yardLocation';
      // Prepare the new values from selectedOption
      const newYardLocation = selectedOption ? selectedOption.yard : '';
      const newYardBlock = selectedOption ? selectedOption.yardBlock : '';
      const newBlockCellNo = selectedOption ? selectedOption.yardBCell : '';
    
      // Check for duplicates in the yardCellArray
      const isDuplicate = rows.some((cell, i) => 
        i !== index && 
        cell.yardLocation === newYardLocation &&
        cell.yardBlock === newYardBlock &&
        cell.blockCellNo === newBlockCellNo
      );
    
      if (isDuplicate) {
        const errorMsg = "Duplicate location...";
        // Set the error message for duplicate entry
        setErrors((prevErrors) => ({
          ...prevErrors,
          addRow: errorMsg, // Set error message
        }));
      
        // Display the error toast
        toast.error(errorMsg);
      
        // Reset the row values if a duplicate is found
        const updatedRows = rows.map((row, i) =>
          i === index
            ? {
                yardLocation: "",
                yardBlock: "",
                blockCellNo: "",
                cellArea: "",
                cellAreaUsed: "",
                inBondPackages: "",
                cellAreaAllocated: "",
              }
            : row
        );
        setRows(updatedRows);
      
        return; // Exit the function to prevent further execution
      }
      
    

  if (selectedOption) {
    const updatedRows = rows.map((row, i) =>
      i === index
        ? {
            ...row,
            yardLocation: selectedOption.yard,
            yardBlock: selectedOption.yardBlock,
            blockCellNo: selectedOption.yardBCell,
            cellArea: selectedOption.area,
            cellAreaUsed: selectedOption.areaUsed,
            inBondPackages: selectedOption.inBondPackages,
            cellAreaAllocated: selectedOption.cellAreaAllocated,
          }
        : row
    );
    setRows(updatedRows);
  } else {
    // Clear the row if Select is cleared
    const updatedRows = rows.map((row, i) =>
      i === index
        ? {
            yardLocation: "",
            yardBlock: "",
            blockCellNo: "",
            cellArea: "",
            cellAreaUsed: "",
            inBondPackages: "",
            cellAreaAllocated: "",
          }
        : row
    );


    setRows(updatedRows);
  }
};
  
const addRow = () => {

  const hasEmptyFields = rows.some(row => 
    !row.yardLocation || !row.yardBlock || !row.blockCellNo || 
    !row.cellArea || !row.inBondPackages || 
    !row.cellAreaAllocated
  );

  // If there are empty fields, show an error and do not add a new row
  if (hasEmptyFields) {
    const errorMsg = "All fields must be filled before adding a new row.";
    setErrors((prevErrors) => ({
      ...prevErrors,
      addRow: errorMsg, // Set error message
    }));
    toast.error(errorMsg); // Display error toast
    return; // Exit the function to prevent adding a new row
  }


  const newTotalPackages = rows.reduce(
    (sum, row) => sum + (parseFloat(row.inBondPackages) || 0),
    0
  );

  // Check if adding a new row exceeds oldInBondPackages
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

  // Clear error if validation is successful
  setErrors((prevErrors) => {
    const newErrors = { ...prevErrors };
    delete newErrors.totalPackages;
    return newErrors;
  });

  // setModalFlag('add');
  const nextSrNo = rows.length > 0 ? Math.max(...rows.map(row => parseInt(row.srNo, 10))) + 1 : 1;
  // Add new row
  setRows([
    ...rows,
    {
      srNo: nextSrNo.toString(), // Incremented serial number
      yardLocation: "",
      yardBlock: "",
      blockCellNo: "",
      cellArea: "",
      cellAreaUsed: "",
      inBondPackages: "",
      cellAreaAllocated: "",
    },
  ]);

};

const handlePrint = async (type) => {
  setLoading(true);
  let inBondingId = inBond.inBondingId;
      try {
          const response = await axios.get(`${ipaddress}api/cfinbondcrg/generateCustomeInBondPrint?companyId=${companyid}&branchId=${branchId}&uname=${username}&type=${type}&cname=${companyname}&bname=${branchname}&inBondingId=${inBondingId}`,
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
          <CardBody> */}
            <div>
              <Row>
            
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
                            Search by InBonding Id / Noc No /Noc Trans Id/ State
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="chaSearchId"
                            maxLength={15}
                            name="chaSearchId"
                            value={chaSearchId}
                            onChange={(e) =>
                              setChaSearchId(e.target.value)
                            }
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
                            <th scope="col">	BE No</th>
                            <th scope="col">	Bond No</th>
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
                                      item.nocNo,
                                      
                                    )
                                  }
                                  value={item[0]}
                                />
                              </td>
                              <td>{item.inBondingId}</td>
                              <td>{item.inBondingDate ? format( new Date(item.inBondingDate) ,'dd/MM/yyyy HH:mm') : null}</td>
                              <td>{item.nocTransId}</td>
                              <td>{item.nocNo}</td>
                              <td>{item.boeNo}</td>
                              <td>{item.bondingNo}</td>
                              <td>{item.bondingDate}</td>
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
                </Modal>
              </Row>

              {/* <hr /> */}
              <Row>
              <Col md={2}>
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
                      id="inBondingIdddd"
                      name="inBondingId"
                      value={inBond.inBondingId}
                      maxLength={27}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>

                <Col md={2} style={{ marginTop: 18 }}>
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
                    Search
                  </button>
                </Col>
              <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    BOE NO
                                </label>
                                <Select
                                    value={{ value: inBond.boeNo, label: inBond.boeNo }}
                                    onChange={handleBoeChange}
                                    onInputChange={getBoeData}
                                    options={boeData}
                                    placeholder="Select Boe No"
                                    isClearable
                                    id="boeNo"
                                    vesselName="boeNo"

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

                        <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="boeDate">
                      BE Date
                    </label>
                    <div style={{ position: "relative" }}>
                      <DatePicker
                        selected={inBond.boeDate}
                        onChange={handleNocValidityDateChnage}
                        id="boeDate"
                        name="boeDate"
                        readOnly
                        style={{ backgroundColor: "#E0E0E0" }}
                        dateFormat="dd/MM/yyyy"
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: "100%" }} />}
                        wrapperClassName="custom-react-datepicker-wrapper"
                        minDate={getMinDate(inBond.boeDate)}
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
                      {bondingErrors.nocValidityDate}
                    </div>
                  </FormGroup>
                </Col>
                {/* <Col md={1} style={{ marginTop: 22 }}>
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
                  </button>
                </Col>
                <Modal
                  Modal
                  isOpen={isModalOpenForNocTransIdSearch}
                  onClose={closeNocTrasnsIdSearchModal}
                  toggle={closeNocTrasnsIdSearchModal}
                  style={{
                    maxWidth: "1200px",
                    fontSize: 12,
                    wioverflow: "-moz-hidden-unscrollable",
                  }}
                >
                  <ModalHeader
                    toggle={closeNocTrasnsIdSearchModal}
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
                      Search NOC
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
                            Search by Noc Trans Id / NOc No / BOE No
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="nocTansIdSearchId"
                            maxLength={15}
                            name="nocTansIdSearchId"
                            value={nocTansIdSearchId}
                            onChange={(e) =>
                              setNocTransIdSearchId(e.target.value)
                            }
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
                          onClick={clearSearchNocTransId}
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
                                    selectNocTransIdearchRadio(
                                      item.nocTransId,
                                      item.nocNo,
                                      item[6],
                                      item[10],
                                      item[12],
                                      item[13],
                                      item[14],
                                      item[15]
                                    )
                                  }
                                  value={item[0]}
                                />
                              </td>
                              <td>{item.nocTransId}</td>
                              <td>
                                {item.nocTransDate
                                  ? format(
                                      new Date(item.nocTransDate),
                                      "dd/MM/yyyy HH:mm"
                                    )
                                  : "N/A"}
                              </td>
                              <td>{item.nocNo}</td>
                              <td>
                                {item.nocDate
                                  ? format(
                                      new Date(item.nocDate),
                                      "dd/MM/yyyy HH:mm"
                                    )
                                  : "N/A"}
                              </td>
                              <td>{item.igmNo}</td>
                              <td>{item.igmLineNo}</td>
                              <td>{item.boeNo}</td>
                              <td>
                                {item.boeDate
                                  ? format(
                                      new Date(item.boeDate),
                                      "dd/MM/yyyy HH:mm"
                                    )
                                  : "N/A"}
                              </td>
                              <td>{item.cha}</td>
                              <td>{item.importerName}</td>
                              <td>{item.status === "A" ? "Approved" : ""}</td>
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
                    <label className="forlabel bold-label" htmlFor="igmNo">
                      IGM No
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="igmNo"
                      maxLength={15}
                      name="igmNo"
                      value={inBond.igmNo}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                    <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.nocFromDate}
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
                      id="status"
                      maxLength={15}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      name="status"
                      value={inBond.status === "A" ? "Approved" :inBond.status === "N" ? "New": ""}
                    />
                  </FormGroup>
                </Col>
               
              </Row>
              <Row>
        
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
                      value={inBond.nocNo}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="docDate">
                      NOC Date
                    </label>
                    <div style={{ position: "relative" }}>
                      <DatePicker
                        selected={inBond.nocDate}
                        onChange={handleDocDateChange}
                        id="nocDate"
                        readOnly
                        style={{ backgroundColor: "#E0E0E0" }}
                        name="nocDate"
                        dateFormat="dd/MM/yyyy"
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: "100%",backgroundColor: "#E0E0E0" }} />}
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
                      htmlFor="nocTransDate"
                    >
                      NOC Trans Date
                    </label>
                    <div style={{ position: "relative" }}>
                      <DatePicker
                        selected={inBond.nocTransDate}
                        onChange={handleNocTransDate}
                        id="nocTransDate"
                        name="nocTransDate"
                        dateFormat="dd/MM/yyyy HH:mm"
                        showTimeSelect
                        value={inBond.nocTransDate}
                        readOnly
                        style={{ backgroundColor: "#E0E0E0" }}
                        timeFormat="HH:mm"
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: "100%",backgroundColor: "#E0E0E0"}} />}
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
                    <label className="forlabel bold-label" htmlFor="igmLineNo">
                      IGM Line No
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="igmLineNo"
                      maxLength={15}
                      name="igmLineNo"
                      value={inBond.igmLineNo}
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
                    <label className="forlabel bold-label" htmlFor="igmDate">
                      IGM Date
                    </label>
                    <div style={{ position: "relative" }}>
                      <DatePicker
                        selected={inBond.igmDate}
                        onChange={handleNocValidityDateChnage}
                        id="igmDate"
                        name="igmDate"
                        dateFormat="dd/MM/yyyy"
                        readOnly
                        style={{ backgroundColor: "#E0E0E0" }}
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: "100%",backgroundColor: "#E0E0E0" }} />}
                        wrapperClassName="custom-react-datepicker-wrapper"
                        minDate={getMinDate(inBond.nocFromDate)}
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
                      {bondingErrors.nocValidityDate}
                    </div>
                  </FormGroup>
                </Col>
                {/* <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="profitcentreId"
                    >
                      Profitcentre
                    </label>
                    <Select
                      placeholder="Select..."
                      isClearable
                      id="profitcentreId"
                      name="profitcentreId"
                      value={defaultOption} // Display the default option
                      onChange={handleChangeProfitCenter} // Handle change if any
                      options={[defaultOption]} // Only include default option
                      isDisabled // Disable selection
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
                      value={inBond.createdBy}
                    />
                  </FormGroup>
                </Col>
             
              </Row>

           
              <Row>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="bondingNo"
                    >
                      BOND No <span className="error-message">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="bondingNo"
                      maxLength={15}
                      name="bondingNo"
                      value={inBond.bondingNo}
                      onChange={handleNocChange}
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
                      Bond Date <span className="error-message">*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <DatePicker
                        selected={inBond.bondingDate}
                        onChange={handleNocValidityDateChnage}
                        id="bondingDate"
                        name="bondingDate"
                        value={inBond.bondingDate}
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
                      {bondingErrors.bondingDate}
                    </div>
                  </FormGroup>
                </Col>

                <Col md={2}>
        <FormGroup>
          <label className="forlabel bold-label" htmlFor="bondValidityDate">
            Bonding Validity Date
          </label>
          <div style={{ position: 'relative' }}>
            <DatePicker
              selected={inBond.bondValidityDate}
              id="bondValidityDate"
              name="bondValidityDate"
              dateFormat="dd/MM/yyyy"
              className="form-control border-right-0 inputField"
              customInput={<input style={{ width: '100%' }} />}
              disabled
              wrapperClassName="custom-react-datepicker-wrapper"
            />
            <FontAwesomeIcon
              icon={faCalendarAlt}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                color: '#6c757d',
              }}
            />
          </div>
        </FormGroup>
      </Col>

      <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="cha">
                      CHA
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="cha"
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      maxLength={15}
                      name="cha"
                      value={chaName}
                      onChange={handleNocChange}
                    />
                    <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.igmDate}
                    </div>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="chaCode">
                      CHA Code
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="chaCode"
                      maxLength={15}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      name="chaCode"
                      value={inBond.chaCode}
                      onChange={handleNocChange}
                    />
                    <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.boeNo}
                    </div>
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
                      id="approvedBy"
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      maxLength={15}
                      name="approvedBy"
                      value={inBond.approvedBy}
                    />
                  </FormGroup>
                </Col>
        
              </Row>
              <Row>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="importerName"
                    >
                      Importer Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="importerName"
                      maxLength={15}
                      name="importerName"
                      value={inBond.importerName}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="importerAddress1"
                    >
                      Importer Address 1
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="importerAddress1"
                      maxLength={15}
                      name="importerAddress1"
                      value={inBond.importerAddress1}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="importerAddress2"
                    >
                      Importer Address2
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="importerAddress2"
                      maxLength={15}
                      name="importerAddress2"
                      value={inBond.importerAddress2}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="importerAddress3"
                    >
                      Importer Address3
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="importerAddress3"
                      maxLength={15}
                      name="importerAddress3"
                      value={inBond.importerAddress3}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="numberOfMarks"
                    >
                      Mark Nos
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="numberOfMarks"
                      maxLength={15}
                      name="numberOfMarks"
                      value={
                        inBond.numberOfMarks != null
                          ? inBond.numberOfMarks
                          : "0"
                      }
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
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
                      onChange={handleCheckboxChange}
                      checked={inBond.section49 === "Y"}
                    />
                  </FormGroup>
                </Col>
                {/* <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="shift">
                      Shift
                    </label>
                    <select
                      className="form-control"
                      id="shift"
                      name="shift"
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      value={inBond.shift}
                      onChange={(e) =>
                        setInBond((prevNOC) => ({
                          ...prevNOC,
                          shift: e.target.value,
                        }))
                      }
                    >
                      <option value="DAY">DAY</option>
                      <option value="NIGHT">NIGHT</option>
                    </select>
                  </FormGroup>
                </Col> */}
              </Row>

              <Row>
        
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="uom">
                      UOM
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="uom"
                      maxLength={15}
                      name="uom"
                      value={
                        inBond.uom === "G"
                          ? "Gram"
                          : inBond.uom === "KG"
                          ? "Kilogram"
                          : inBond.uom === "NO"
                          ? "Number"
                          : ""
                      }
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="areaAllocated"
                    >
                      Area Allocated
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="areaAllocated"
                      maxLength={15}
                      name="areaAllocated"
                      value={inBond.areaAllocated}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
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
                      value={inBond.areaOccupied}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                    <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.uom}
                    </div>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="nocPackages"
                    >
                      NOC Packages
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="nocPackages"
                      maxLength={15}
                      name="nocPackages"
                      value={inBond.nocPackages}
                      onChange={handleNocChange}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />

                    <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.nocPackages}
                    </div>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="gateInPackages"
                    >
                      Total Gate In Packages
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="gateInPackages"
                      maxLength={15}
                      name="gateInPackages"
                      value={inBond.gateInPackages}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="inBondedPackages"
                    >
                      Total In Bonded Packages
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="inBondedPackages"
                      maxLength={15}
                      name="inBondedPackages"
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      value={inBond.inBondedPackages}
                      onChange={handleNocChange}
                    />
                  </FormGroup>
                </Col>
          
                {/* <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="cargoCondition"
                    >
                      Cargo Condition
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="cargoCondition"
                      maxLength={15}
                      name="cargoCondition"
                      value={inBond.cargoCondition}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col> */}

           
              </Row>

              <Row>
          
             
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="cifValue">
                      Assessable Value
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="cifValue"
                      maxLength={15}
                      name="cifValue"
                      value={inBond.cifValue}
                      onChange={handleNocChange}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="cargoDuty">
                      Custom Duty
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="cargoDuty"
                      maxLength={15}
                      name="cargoDuty"
                      value={inBond.cargoDuty}
                      onChange={handleNocChange}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="insuranceValue"
                    >
                      Insurance Value
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="insuranceValue"
                      maxLength={15}
                      name="insuranceValue"
                      value={inBond.insuranceValue}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="shortagePackages"
                    >
                      Shortage Packages
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="shortagePackages"
                      maxLength={15}
                      name="shortagePackages"
                      value={inBond.shortagePackages}
                      onChange={handleNocChange}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="damagedQty">
                      Damaged Packages
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="damagedQty"
                      maxLength={15}
                      name="damagedQty"
                      value={inBond.damagedQty}
                      onChange={handleNocChange}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="breakage">
                      Breakage Packages
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="breakage"
                      maxLength={15}
                      name="breakage"
                      value={inBond.breakage}
                      onChange={handleNocChange}
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
                      htmlFor="grossWeight"
                    >
                      Gross Wt
                    </label>
                    <input
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      className="form-control"
                      type="text"
                      id="grossWeight"
                      name="grossWeight"
                      value={inBond.grossWeight}
                      onChange={handleNocChange}
                      maxLength={15}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label " htmlFor="sourcePort">
                     Source Port
                    </label>
                    <input
                      type="text"
                      style={{ backgroundColor: "#E0E0E0" }}
                      className="form-control"
                      readOnly
                      name="sourcePort"
                      id="sourcePort"
                      value={inBond.sourcePort}
                    />
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
                        selected={inBond.nocValidityDate}
                        onChange={(date) => {
                          setInBond((prevNoc) => ({
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
                    <label
                      className="forlabel bold-label"
                      htmlFor="nocFromDate"
                    >
                      NOC From Date
                    </label>
                    <div style={{ position: "relative" }}>
                      <DatePicker
                        selected={inBond.nocFromDate}
                        onChange={(date) => {
                          setInBond((prevNoc) => ({
                            ...prevNoc,
                            nocFromDate: date,
                          }));
                        }}
                        //   onChange={handleDocDate}
                        id="nocFromDate"
                        name="nocFromDate"
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
                    <label className="forlabel bold-label" htmlFor="otlNo">
                      OTL No
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="otlNo"
                      maxLength={15}
                      name="otlNo"
                      value={inBond.otlNo}
                      onChange={handleNocChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="bondYard">
                      Bond Yard
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="bondYard"
                      maxLength={15}
                      name="bondYard"
                      value={inBond.bondYard}
                      onChange={handleNocChange}
                    />
                  </FormGroup>
                </Col>
             
              </Row>

              <Row>
            
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="inBond20Ft">
                      No of 20 FT Containers
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="inBond20Ft"
                      maxLength={15}
                      name="inBond20Ft"
                      value={inBond.inBond20Ft}
                      onChange={handleNocChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="inBond40Ft">
                      No of 40 FT Containers
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="inBond40Ft"
                      maxLength={15}
                      name="inBond40Ft"
                      value={inBond.inBond40Ft}
                      onChange={handleNocChange}
                    />
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
                      value={inBond.spaceType}
                      onChange={(e) =>
                        setInBond((prevNOC) => ({
                          ...prevNOC,
                          spaceType: e.target.value,
                        }))
                      }
                    >
                      <option value="General">General</option>
                      <option value="cargo">Cargo</option>
                    </select>
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
                      value={inBond.gateInType}
                      onChange={(e) =>
                        setInBond((prevNOC) => ({
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
                <Col md={2} style={{ marginTop: 5 }}>
                  <FormGroup>
                    <label className="forlabel bold-label " htmlFor="section64">
                      Section 64 Applicable
                    </label>
                    <input
                      type="checkbox"
                      className="form-check-input radios"
                      style={{ width: 20, height: 20, marginLeft: 18 }}
                      name="section64"
                      id="section64"
                      onChange={handleCheckboxChange64}
                      checked={inBond.section64 === "Y"}
                    />
                  </FormGroup>
                </Col>
                <Col md={2} style={{ marginTop: 5 }}>
                  <FormGroup>
                    <label className="forlabel bold-label " htmlFor="section60">
                      Section 60 Applicable
                    </label>
                    <input
                      type="checkbox"
                      className="form-check-input radios"
                      style={{ width: 20, height: 20, marginLeft: 18 }}
                      name="section60"
                      id="section60"
                      onChange={handleCheckboxChange60}
                      checked={inBond.section60 === "Y"}
                    />
                  </FormGroup>
                </Col>

              </Row>
<Row>
<Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="extenstionDate1"
                    >
                      Extension Date 1
                    </label>
                    <div style={{ position: "relative" }}>
                      <DatePicker
                        selected={inBond.extenstionDate1}
                        onChange={handleDate1Change}
                        id="extenstionDate1"
                        name="extenstionDate1"
                        value={inBond.extenstionDate1}
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
                      {bondingErrors.extenstionDate1}
                    </div>
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="extenstionDate2"
                    >
                      Extension Date 2
                    </label>
                    <div style={{ position: "relative" }}>
                      <DatePicker
                        selected={inBond.extenstionDate2}
                        onChange={handleDate2Change}
                        id="extenstionDate2"
                        name="extenstionDate2"
                        value={inBond.extenstionDate2}
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
                      {bondingErrors.extenstionDate2}
                    </div>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="extenstionDate3"
                    >
                      Extension Date 3
                    </label>
                    <div style={{ position: "relative" }}>
                      <DatePicker
                        selected={inBond.extenstionDate3}
                        onChange={handleDate3Change}
                        id="extenstionDate3"
                        name="extenstionDate3"
                        value={inBond.extenstionDate3}
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
                      {bondingErrors.extenstionDate3}
                    </div>
                  </FormGroup>
                </Col>
<Col md={2}>
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
                      value={inBond.comments}
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
                  disabled={inBond.status==="A"}
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
                  disabled={inBond.status==="A"}
                  onClick={handleSubmit}
                >
                  <FontAwesomeIcon
                    icon={faSave}
                    style={{ marginRight: "5px" }}
                  />
                  Submit
                </button>

                {inBond.status ==="A" ?
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

                {/* {inBond.status ==="A" ?
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
                In Bonding Cargo Details
              </h5>
              <table className="table table-bordered table-hover tableHeader" >
                <thead className="tableHeader"  >
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
                      Gate In Package
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
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Old Bond PKG
                    </th>

                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Bal In Bond PKG <span className="error-message">*</span>
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                     Location
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
                      Yard PKG <span className="error-message">*</span>
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Cell Area Allocated <span className="error-message">*</span>
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Bal In Bond Weight
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Bal In Bond CIF <span className="error-message">*</span>
                    </th>

                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                     Bal In Bond Duty <span className="error-message">*</span>
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                     Bal In Bond Insurance
                    </th>

                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Shortage Package
                    </th>

                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Damaged Package
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Breakage Package
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
                  {currentItems.map((dtl, index) => (
                    <tr key={index} className="text-center">
                      <td>
                        <input
                          type="checkbox"
                          style={{ transform: "scale(1.5)" }}
                          // checked={selectedRows.some(
                          //   (selectedRow) =>
                          //     selectedRow.nocTransId === dtl.nocTransId &&
                          //     selectedRow.nocNo === dtl.nocNo &&
                          //     selectedRow.cfBondDtlId === dtl.cfBondDtlId
                          // )}
                          checked={
                            (inBond.inBondingId === dtl.inBondingId ) ||
                            selectedRows.some
                            ((selectedRow) =>
                              
                                  selectedRow.nocTransId === dtl.nocTransId &&
                                  selectedRow.nocNo === dtl.nocNo &&
                                  selectedRow.cfBondDtlId === dtl.cfBondDtlId

                            )
                          }
                          onChange={(e) => handleCheckboxChangeForDtl(e, dtl)}
                        />
                      </td>
                      <th scope="row">{index + 1}</th>
                      <td>{dtl.commodityDescription}</td>
                      <td>{dtl.typeOfPackage}</td>
                      <td>{dtl.nocPackages}</td>
                      <td>{dtl.gateInPackages}</td>
                      <td>{dtl.grossWeight}</td>
                      <td>{dtl.cifValue}</td>
                      <td>{dtl.cargoDuty}</td>
                      <td>{dtl.insuranceValue}</td>
                      <td>{dtl.inBondedPackages !=null ? dtl.inBondedPackages :0 }</td>
                      <td style={{ textAlign: "center" }}>
                        <input
                          className="form-control"
                          style={{ width: "180px" }}
                          type="text"
                          value={inputValues[index]?.inBondedPackages}
                          placeholder="Enter PKGS"
                          // onChange={(e) =>
                          //   handleInputChangeFotDtl(
                          //     e,
                          //     "inBondedPackages",
                          //     index
                          //   )
                          // }
                          onChange={(e) => {
                            const regex = /^[0-9]*\.?[0-9]*$/;
                            if (regex.test(e.target.value)) {
                              handleInputChangeFotDtl(
                                e,
                                "inBondedPackages",
                                index
                              )
                            }
                          }}
                          onPaste={(e) => {
                            const pastedData = e.clipboardData.getData("text");
                            if (!/^[0-9]*\.?[0-9]*$/.test(pastedData)) {
                              e.preventDefault();
                            }
                          }}
                        />
                         
                        {inputValues[index]?.errorMessage &&
                          inputValues[index]?.errorMessage.includes(
                            "In Bond Packages"
                          ) && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                              {inputValues[index]?.errorMessage}
                            </span>
                          )}
                      </td>
{/* <td style={{ textAlign: "center", width: "500px" }}>
  <Select 
    isClearable
    options={
      yardLocationsData
        ? yardLocationsData.map((party) => ({
            value: `${party.yardLocationId}-${party.blockId}-${party.cellNoRow}`,
            label: `${party.yardLocationId}-${party.blockId}-${party.cellNoRow}`,
            areaUsed: party.cellAreaUsed,
            newCellArea: party.cellArea,
          }))
        : []
    }
    value={
      inputValues[index]?.editedBy
        ? {
            value: inputValues[index].editedBy,
            label: inputValues[index].editedBy,
            areaUsed: inputValues[index].insuranceValue,  // assuming insuranceValue represents areaUsed
            newCellArea: inputValues[index].cellArea,     // assuming toBondedPackages represents area
          }
        : null
    }
    onChange={(selectedOption) => {
      const updatedValues = [...inputValues];

      if (selectedOption) {
        // If an option is selected, update the respective fields
        updatedValues[index] = {
          ...updatedValues[index],
          editedBy: selectedOption.value,
          insuranceValue: selectedOption.areaUsed, // Assuming insuranceValue holds areaUsed
          cellArea: selectedOption.newCellArea,    // Assuming toBondedPackages holds area
        };
        handleInputChangeFotDtl(
          { target: { value: selectedOption.value } },
          "editedBy",
          index
        );
      } else {
        // If cleared, set all related fields to null
        updatedValues[index] = {
          ...updatedValues[index],
          editedBy: null,
          insuranceValue: null,
          cellArea: null,
        };
        
        handleInputChangeFotDtl(
          { target: { value: null } },
          "editedBy",
          index
        );
      }

      setInputValues(updatedValues); // Update the state with the new values
    }}
    placeholder="Select Location"
    styles={{ container: (base) => ({ ...base, width: '198px' }) }}
  />
</td> */}

<td style={{ textAlign: "center", width: "500px" }}>
  <Select
    isClearable
    menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
    menuPosition="fixed" // Sets the dropdown menu position to fixed    
    menuPlacement="top"
    options={
      yardLocationsData
        ? yardLocationsData.map((party) => ({
            value: `${party.yardLocationId}~${party.blockId}~${party.cellNoRow}`,
            label: `${party.yardLocationId}~${party.blockId}~${party.cellNoRow}`,
            areaUsed: party.cellAreaUsed,
            newCellArea: party.cellArea,
            yardLocation: party.yardLocationId,
            yardBlock: party.blockId,
            blockCellNo: party.cellNoRow
          }))
        : []
    }
    value={
      inputValues[index]?.editedBy
        ? {
            value: inputValues[index].editedBy,
            label: inputValues[index].editedBy,
            areaUsed: inputValues[index].insuranceValue,  // this should represent areaUsed
            newCellArea: inputValues[index].cellArea,     // this should represent cellArea
          }
        : null
    }
    onChange={(selectedOption) => {
      if (!selectedOption) {
        // Clear the row if no option is selected
        const updatedValues = [...inputValues];
        updatedValues[index] = {
          ...updatedValues[index],
          editedBy: null,
          insuranceValue: null,
          cellArea: null,
        };
        handleInputChangeFotDtl(
          { target: { value: null } },
          "editedBy",
          index
        );
        setInputValues(updatedValues);
        return;
      }

      // Extract selected values for yard location, block, and cell number
      const newYardLocation = selectedOption.yardLocation;
      const newYardBlock = selectedOption.yardBlock;
      const newBlockCellNo = selectedOption.blockCellNo;

      // Check for duplicates in the rows
      const isDuplicate = inputValues.some((cell, i) => 
        i !== index && 
        cell.yardLocation  === newYardLocation &&
        cell.yardBlock === newYardBlock &&
        cell.blockCellNo  === newBlockCellNo
      );

      if (isDuplicate) {
        const errorMsg = "Location is already selected...";
        // Set the error message for the duplicate entry
        setErrors((prevErrors) => ({
          ...prevErrors,
          addRow: errorMsg,
        }));
      
        // Display the error toast
        toast.error(errorMsg,{
          position:'bottom-right',
          autoClose:900,
        });
      
        // Reset the row values if a duplicate is found
        const updatedRows = inputValues.map((row, i) =>
          i === index
            ? {
                yardLocation: "",
                yardBlock: "",
                blockCellNo: "",
                cellArea: "",
                insuranceValue: "", // Assuming this is for `cellAreaUsed`
              }
            : row
        );
        setInputValues(updatedRows);
        return;
      }

      // If no duplicate, update the row with the selected values
      const updatedValues = [...inputValues];
      updatedValues[index] = {
        ...updatedValues[index],
        editedBy: selectedOption.value,
        insuranceValue: selectedOption.areaUsed,
        cellArea: selectedOption.newCellArea,
        yardLocation: newYardLocation,
        yardBlock: newYardBlock,
        blockCellNo: newBlockCellNo
      };
      handleInputChangeFotDtl(
        { target: { value: selectedOption.value } },
        "editedBy",
        index
      );
      setInputValues(updatedValues);
    }}
    placeholder="Select Location"
    styles={{ container: (base) => ({ ...base, width: '198px' }) }}

  />
      {inputValues[index]?.errorMessage &&
      inputValues[index]?.errorMessage.includes(
        "Locations is"
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
                          value={inputValues[index]?.areaOccupied}
                          // onChange={(e) =>
                          //   handleInputChangeFotDtl(
                          //     e,
                          //     "areaOccupied",
                          //     index
                          //   )
                          // }
                          onChange={(e) => {
                            const regex = /^[0-9]*\.?[0-9]*$/;
                            if (regex.test(e.target.value)) {
                                      handleInputChangeFotDtl(
                              e,
                              "areaOccupied",
                              index
                            )
                            }
                          }}
                          onPaste={(e) => {
                            const pastedData = e.clipboardData.getData("text");
                            if (!/^[0-9]*\.?[0-9]*$/.test(pastedData)) {
                              e.preventDefault();
                            }
                          }}
                        />

                      </td>
                   

                      <td style={{ textAlign: "center" }}>
                        <input
                          className="form-control"
                          style={{ width: "180px" }}
                          type="number"
                          value={inputValues[index]?.yardPackages}
                          placeholder="Enter Yard PKGS"

                          // onChange={(e) => 
                          //   {
                          //   handleInputChangeFotDtl(e, "yardPackages", index);
                          //   // Recalculate cellAreaAllocated based on updated yardPackages
                          //   const newYardPackages = e.target.value;
                          //   const areaAccrued = inputValues[index]?.areaOccupied || 0;
                          //   const inBondedPackages = inputValues[index]?.inBondedPackages || 1; // avoid division by zero
                      
                          //   const calculatedArea = (areaAccrued / inBondedPackages) * newYardPackages;
                            
                          //   //const roundedArea = parseFloat(calculatedArea).toFixed(3);

                          //   handleInputChangeFotDtl(
                          //     { target: { value: calculatedArea } },
                          //     "cellAreaAllocated",
                          //     index
                          //   );
                          // }}
                          onChange={(e) => {
                            const newYardPackages = parseFloat(e.target.value) || 0; // Ensure it's a number
                            const inBondedPackages = parseFloat(inputValues[index]?.inBondedPackages) || 0;
                      
                            if (newYardPackages > inBondedPackages) {
                              // Set an error message if validation fails
                              handleInputChangeFotDtl(
                                { target: { value: "Yard Bond Packages cannot exceed In-Bonded Packages" } },
                                "errorMessage",
                                index
                              );
                              return; // Exit without further calculations
                            } else {
                              // Clear error message if validation passes
                              handleInputChangeFotDtl({ target: { value: "" } }, "errorMessage", index);
                            }

                            handleInputChangeFotDtl(e, "yardPackages", index);
                            const areaAccrued = parseFloat(inputValues[index]?.areaOccupied) || 0;
                            const calculatedArea = (areaAccrued / (inBondedPackages || 1)) * newYardPackages;
                      
                            // Update cellAreaAllocated
                            handleInputChangeFotDtl(
                              { target: { value: calculatedArea } },
                              "cellAreaAllocated",
                              index,13,3
                            );
                          }}
                        />
                         
                        {inputValues[index]?.errorMessage &&
                          inputValues[index]?.errorMessage.includes(
                            "Yard Bond Packages"
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
                          value={inputValues[index]?.cellAreaAllocated}
                          placeholder="Enter Area"
                          onChange={(e) =>
                            handleInputChangeFotDtl(
                              e,
                              "cellAreaAllocated",
                              index,13,3
                            )
                          }
                        />
                         
                        {inputValues[index]?.errorMessage &&
                          inputValues[index]?.errorMessage.includes(
                            "Cell Area Allocated"
                          ) && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                              {inputValues[index]?.errorMessage}
                            </span>
                          )}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <input
                          className="form-control"
                          readOnly
                          style={{ width: "180px",backgroundColor: "#E0E0E0" }}
                          type="number"
                          value={inputValues[index]?.inbondGrossWt}
                          onChange={(e) =>
                            handleInputChangeFotDtl(e, "inbondGrossWt", index,13,3)
                          }
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <input
                          className="form-control"
                          readOnly
                          style={{ width: "180px",backgroundColor: "#E0E0E0" }}
                          type="number"
                          value={inputValues[index]?.inbondCifValue}
                          placeholder="Enter CIF value"
                          onChange={(e) =>
                            handleInputChangeFotDtl(e, "inbondCifValue", index,13,3)
                          }
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
                          readOnly
                          style={{ width: "180px",backgroundColor: "#E0E0E0" }}
                          type="number"
                          value={inputValues[index]?.inbondCargoDuty}
                          placeholder="Enter Cargo Duty"
           
                          onChange={(e) =>
                            handleInputChangeFotDtl(e, "inbondCargoDuty", index,13,3)
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
                          type="number"
                          value={inputValues[index]?.inbondInsuranceValue}
                          readOnly
                          style={{ backgroundColor: "#E0E0E0" }}
                          onChange={(e) =>
                            handleInputChangeFotDtl(
                              e,
                              "inbondInsuranceValue",
                              index,13,3
                            )
                          }
                        />
                      </td>

                      <td style={{ textAlign: "center" }}>
                        <input
                          className="form-control"
                          style={{ width: "180px" }}
                          type="text"
                          value={inputValues[index]?.shortagePackages}
                          placeholder="Enter Shortage"
                          // onChange={(e) =>
                          //   handleInputChangeFotDtl(
                          //     e,
                          //     "shortagePackages",
                          //     index
                          //   )
                          // }
                          onChange={(e) => {
                            const regex = /^[0-9]*\.?[0-9]*$/;
                            if (regex.test(e.target.value)) {
                              handleInputChangeFotDtl(
                                e,
                                "shortagePackages",
                                index
                              )
                            }
                          }}
                          onPaste={(e) => {
                            const pastedData = e.clipboardData.getData("text");
                            if (!/^[0-9]*\.?[0-9]*$/.test(pastedData)) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {/* {inputValues[index]?.errorMessage && inputValues[index]?.errorMessage.includes('CIF Value') && (
          <span style={{ color: 'red', fontSize: '12px' }}>{inputValues[index]?.errorMessage}</span>
        )} */}
                      </td>

                      <td style={{ textAlign: "center" }}>
                        <input
                          className="form-control"
                          style={{ width: "180px" }}
                          type="text"
                          value={inputValues[index]?.damagedQty}
                          placeholder="Enter Damaged"
                          // onChange={(e) =>
                          //   handleInputChangeFotDtl(e, "damagedQty", index)
                          // }
                          onChange={(e) => {
                            const regex = /^[0-9]*\.?[0-9]*$/;
                            if (regex.test(e.target.value)) {
                              handleInputChangeFotDtl(e, "damagedQty", index)
                            }
                          }}
                          onPaste={(e) => {
                            const pastedData = e.clipboardData.getData("text");
                            if (!/^[0-9]*\.?[0-9]*$/.test(pastedData)) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {/* {inputValues[index]?.errorMessage && inputValues[index]?.errorMessage.includes('Cargo Duty') && (
          <span style={{ color: 'red', fontSize: '12px' }}>{inputValues[index]?.errorMessage}</span>
        )} */}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <input
                          className="form-control"
                          type="text"
                          value={inputValues[index]?.breakage}
                          placeholder="Enter breakage"
                          // onChange={(e) =>
                          //   handleInputChangeFotDtl(e, "breakage", index)
                          // }

                          onChange={(e) => {
                            const regex = /^[0-9]*\.?[0-9]*$/;
                            if (regex.test(e.target.value)) {
                              handleInputChangeFotDtl(e, "breakage", index)
                            }
                          }}
                          onPaste={(e) => {
                            const pastedData = e.clipboardData.getData("text");
                            if (!/^[0-9]*\.?[0-9]*$/.test(pastedData)) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>
                      <button
                                    className="btn btn-outline-primary btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    // onClick={() => openYardModal(dtl)}
                                    onClick={() => {
                                      if (inBond.inBondingId) {
                                        openYardModal(dtl);
                                      } else {
                                        toast.warn("Please first save the data",{
                                          position:'top-center'
                                        });
                                      }
                                    }}
                                >
                                    <FontAwesomeIcon icon={faAdd} style={{ marginRight: "5px" }} />

                                </button>
                      </td>
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
                    In Bond Id
                </label>
                <Input
                    className="form-control"
                    type="text"
                    id="fobValueInDollar"
                    readOnly
                    name="inBondingId"
                    style={{ backgroundColor: "#E0E0E0" }}
                    value={modalDataInput.inBondingId}
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
                    value={rows.inBondingDate ? format(new Date(inBond.inBondingDate), 'dd/MM/yyyy') : ''}
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
                 In Bond Packages
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
            <th   scope="col" className="text-center"  style={{ color: "black" }} >Select Yard Location <span className="error-message">*</span></th>
            <th   scope="col" className="text-center"  style={{ color: "black" }} >   Yard Location  <span className="error-message">*</span>   </th>
            <th   scope="col" className="text-center"  style={{ color: "black" }} >   Yard Block    </th>
            <th scope="col" className="text-center"  style={{ color: "black" }} >Cell</th>
            <th scope="col" className="text-center"  style={{ color: "black" }} >Cell Area</th>
            <th scope="col" className="text-center"  style={{ color: "black" }} >Cell Area Used</th>
            <th scope="col" className="text-center"  style={{ color: "black" }} >Yard Packages <span className="error-message">*</span></th>
            <th scope="col" className="text-center"  style={{ color: "black" }} >Cell Area Allocated <span className="error-message">*</span></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <Select
              
                  isClearable
                  menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                  menuPosition="fixed" // Sets the dropdown menu position to fixed    
                  menuPlacement="top"

                  options={yardLocationsData.map((party) => ({
                    value: `${party.yardLocationId}-${party.blockId}-${party.cellNoRow}`,
                    label: `${party.yardLocationId}-${party.blockId}-${party.cellNoRow}`,
                    areaUsed: party.cellAreaUsed,
                    area: party.cellArea,
                    yard: party.yardLocationId,
                    yardBlock: party.blockId,
                    yardBCell: party.cellNoRow,
                    inBondPackages: party.inBondPackages,
                    cellAreaAllocated: party.cellAreaAllocated,
                  }))}
                  onChange={(selectedOption) =>
                    handleSelectChange(index, selectedOption)
                  }
                  styles={{
                    container: (base) => ({ ...base, width: '180px' }),
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Ensure the dropdown is above other elements
                  }}
                 
                />
              </td>
              <td>
                <Input
                  className="form-control"
                  type="text"
                  value={row.yardLocation}
                  name='yardLocation'
                  readOnly
                  style={{
                    borderColor:
                      errors[`yardLocation-${index}`] ? "red" : "",
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
              <td>
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
              </td>
              {/* <td>
                <Input
                  className="form-control"
                  type="text"
                  name="inBondPackages"
                  value={row.inBondPackages}
                  onChange={(e) => handleInputChange(index, e)}
                  style={{
                    borderColor: errors.totalPackages ? "red" : "",
                  }}
                />
              </td> */}
               <td>
        <Input
          className="form-control"
          type="text"
          value={row.inBondPackages}
          name="inBondPackages"
          onChange={(e) => handleInputChange(index, e)}
          style={{
            borderColor: errors[`inBondPackages-${index}`] ? "red" : "",
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
                  onChange={(e) => handleInputChange(index, e)}
                  style={{
                    borderColor:
                      errors[`cellAreaAllocated-${index}`] ? "red" : "",
                  }}
                />
                {errors[`cellAreaAllocated-${index}`] && (
                  <span style={{ color: "red" }}>
                    {errors[`cellAreaAllocated-${index}`]}
                  </span>
                )}
              </td>
              {/* <td>
                {row.inBondingId }
                <button
                  onClick={() => deleteRow(index)}
                  className="btn btn-danger"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
                              </td> */}
                              
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
            disabled={inBond.status==="A"}
            onClick={handleSaveCfBondGrid}
        >
            <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
            Save
        </button>

        <button
            className="btn btn-outline-primary btn-margin newButton"
            style={{ marginRight: 10 }}
            disabled={inBond.status==="A"}
        onClick={addRow} >
          <FontAwesomeIcon icon={faAdd} style={{ marginRight: "5px" }} />
        Add Row
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
                <Pagination.Last onClick={() => handlePageChange(totalPages)} />
              </Pagination>
            </div>
          {/* </CardBody>
        </Card> */}
      </div>
     
    </>
  );
}

export default InBondCargo;
