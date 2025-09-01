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

function ExBondAuditTrail() {
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
    companyId: companyid,
            branchId: branchId,
            nocTransId: "",
            commonJobId: "",
            commodityId: null,
            commonBondingId: "",
            nocNo: "",
            commonComodityId: "",
            inBondinghdrId: "",
            grossWeight: 0,
            nocPackages: 0,
            boeNo: "",
            bondingNo: "",
            oldCommodityDescription: "",
            oldBondPackages: 0,
            oldBondGrossWt: 0,
            oldInsuranceValue: 0,
            oldBondCifValue: 0,
            oldBondCargoDuty: 0,
            oldTypeOfPackage: "",
            oldShortagePackages: 0,
            oldDamagedQty: 0,
            oldBreakage: 0,
            newCommodityDescription: "",
            newBondPackages: 0,
            newBondGrossWt: 0,
            newInsuranceValue: 0,
            newBondCifValue: 0,
            newBondCargoDuty: 0,
            newTypeOfPackage: "",
            newShortagePackages: 0,
            newDamagedQty: 0,
            newBreakage: 0,
            status: "",
            createdBy: "",
            createdDate: null,
            editedBy: "",
            editedDate: null,
            approvedBy: "",
            approvedDate: null,
            type: "EXBOND",
            oldYardPackages: '',
            newYardPackages: '',
            oldAreaOccupied: '',
            newAreaOccupied: 0,

  };
  const initialInBondHdr = {
    SrNo: null,
    companyId: companyid,
    branchId: branchId,
    exBondingId: '',
    nocTransId: '',
    nocTransDate: null,
    commonJobId: "",
    nocDate: null,
    exBondingDate: null,
    exBondingDateOld: null,
    nocNo: '',
    nocValidityDate: null,
    nocValidityDateOld: null,
    boeNo: '',
    boeNoOld: '',
    exBondType: '',
    bondingNo: '',
    bondingNoOld: '',
    bondingDate: null,
    bondingDateOld: null,
    exBondBeNo: '',
    exBondBeNoOld: '',
    exBondBeDate: null,
    inBondingId: '',
    inBondingDate: null,
    inBondingDateOld: null,
    cha: '',
    chaOld: '',
    commodityDescription: '',
    commodityDescriptionOld: '',
    inBondedGw: 0,
    inBondedGwOld: 0,
    exBondedGw: 0,
    exBondedGwOld: 0,
    remainingGw: 0,
    remainingGwOld: 0,
    balanceGw: 0,
    balanceGwOld: 0,
    inBondedPackages: 0,
    inBondedPackagesOld: 0,
    exBondedPackages: 0,
    exBondedPackagesOld: 0,
    remainingPackages: 0,
    remainingPackagesOld: 0,
    balancedQty: 0,
    balancedQtyNew: 0,
    balancedPackagesOld: 0,
    balancedPackagesNew: 0,
    inBondedCif: 0,
    inBondedCIFOld: 0,
    exBondedCif: 0,
    exBondedCifOld: 0,
    remainingCif: 0,
    remainingCifOld: 0,
    balanceCif: 0,
    balanceCifOld: 0,
    inBondedCargoDuty: 0,
    inBondedCargoDutyOld: 0,
    exBondedCargoDuty: 0,
    exBondedCargoDutyOld: 0,
    remainingCargoDuty: 0,
    remainingCargoDutyOld: 0,
    balanceCargoDuty: 0,
    balanceCargoDutyOld: 0,
    inBondedInsurance: 0,
    inBondedInsuranceOld: 0,
    exBondedInsurance: 0,
    exBondedInsuranceOld: 0,
    remainingInsurance: 0,
    remainingInsuranceOld: 0,
    balanceInsurance: 0,
    balanceInsuranceOld: 0,
    importerId: '',
    importerIdOld: '',
    importerName: '',
    importerNameOld: '',
    sbNo: '',
    sbNoOld: '',
    sbDate: null,
    sbDateOld: null,
    status: '',
    createdBy: '',
    createdDate: new Date(),
    editedBy: '',
    editedDate: new Date(),
    approvedBy: '',
    approvedDate: new Date(),

    boeDate:null,
    boeDateOld: null,
    igmNo: '',
    igmDate: null,
    igmLineNo: '',
    section49: '',
    section49Old: '',
    section60: 'N',
    section60Old: 'N',
    bondValidityDate: null,
    bondValidityDateOld: null,
    importerAddress1: '',
    importerAddress2: '',
    importerAddress3: '',
    tranType: 'EXBOND',
    exBondBeDateOld: null,
    transferBondNoOld:'',
    transferBondNo:'',
    transferBondDateOld: null,
    transferBondDate: null,
    changeOfOwnershipOld: '',
    ownershipChangesOld: '',
    changeOfOwnerNameOld: '',
    changeOfOwnership:'',
    ownershipChanges:'',
    changeOfOwnerName:'',
    newChaCode:'',
    sbDutyNew:0,
    sbDutyOld:0,
    sbQtyNew:0,
    sbQtyOld:0,
    sbUomNew:0,
    sbUomOld:0,
    sbValueNew:0,
    sbValueOld:0,
    auditId:'',
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
        `${ipaddress}api/cfexbondcrgEditController/searchExBondAuditTrail?companyId=${companyid}&branchId=${branchId}&partyName=${id}`,
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

  const selectIGMSearchRadio = (
    SrNo,
    trasid,
    exBondingId,
    nocNo,
    auditId,
  ) => {
    closeIGMSearchModal();
    axios
      .get(
        `${ipaddress}api/cfexbondcrgEditController/getBySelectingRadioButton?companyId=${companyid}&branchId=${branchId}&SrNo=${SrNo}&nocTransID=${trasid}&exBondingId=${exBondingId}&nocNo=${nocNo}&auditId=${auditId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        setInBondFlag("edit");
        console.log("getDataByPartyIdAndGstNojhdgjhdjhgfjhdsgfhsdfgjsdhfghjsdgfhdsgfhgsdfkhjgsdfkjhgsef", data);
        setInBondHdr(response.data)
        setChaName(response.data.chaOld)

        // setChaName(response.data.commodityDescription);
        setBondingErrors((prevErrors) => ({
          ...prevErrors,
          cha: "",
        }));

        fetchDataAfterSave(
          companyid,
          branchId,
          response.data.exBondingId,
          response.data.nocTransId,
          response.data.auditId,
        );

      })
      .catch((error) => {});
  };


  const [importerSearchedData, setImporterSearchedData] = useState([]);


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
  const [inBondHdr, setInBondHdr] = useState(initialInBondHdr);
  const handleNocChange = (e) => {
    const { name, value } = e.target;

    setInBondHdr((prevFilters) => ({
      ...prevFilters,
      [name]: value,

  }));

  const handleSectionChange = (event) => 
  {
    const isChecked = event.target.checked;
    setInBondHdr({ ...inBondHdr, section49: isChecked ? 'Y' : 'N' });
    // Additional logic if needed
};
    // setInBondHdr((prevNOC) => {
    //   const updatedNOC = {
    //     ...prevNOC,
    //     [name]: value,
    //   };
    // });

    document.getElementById(name).classList.remove("error-border");
    setBondingErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };



  

  const handleDate1Change = (date) => {
    setInBondHdr((prevNoc) => ({
      ...prevNoc,
      exBondBeDate: date,
     
    }));
    // document.getElementById("bondingDate").classList.remove("error-border");
    // setBondingErrors((prevErrors) => ({
    //   ...prevErrors,
    //   bondingDate: "",
    // }));
  };

  const handleNewBondingDate = (date) => {
    setInBondHdr((prevNoc) => ({
      ...prevNoc,
      sbDate: date,
    }));
  };


  const handleNewTransferDate = (date) => {
    setInBondHdr((prevNoc) => ({
      ...prevNoc,
      transferBondDate: date,
    }));
  };

  const [selectedRows, setSelectedRows] = useState([]);

  const [inputValues, setInputValues] = useState([]);
  const [bondingErrors, setBondingErrors] = useState({
    bondingNo: "",
    bondingDate: "",
    exBondBeNoOld:"",
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


    if(inBondHdr.status === 'A')
    {
      setLoading(false);
      toast.info("Record is alredy approved.", {
          autoClose: 1000
      })
      return;
    }

    let errors = {};
    // if (selectedRows.length === 0) {
    //   toast.error(
    //     "Commodity not selected. Please select commodity to add...",
    //     {
    //       // ... (toast options)
    //     }
    //   );
    //   setLoading(false);
    //   return;
    // }


    let isValid = true;
    const updatedValues = [...inputValues];
   
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




  if (parseFloat(values.newBondPackages) > dtl.inBondedPackages) 
      {
        errorMessage =
          "New In Bond Packages should not be greater than NOC Packages";
        toast.error(
          "New In Bond Packages should not be greater than NOC Packages.",
          {
            // ... (toast options)
          }
        );
        setLoading(false);
        isValid = false;
      }

       if (parseFloat(values.newBondCifValue) > dtl.cifValue) {
        errorMessage = "New In Bond CIF Value should not be greater than CIF Value";
        toast.error("New In Bond CIF Value should not be greater than CIF Value.", {
          // ... (toast options)
        });
        setLoading(false);
        isValid = false;
      }

       if (parseFloat(values.newBondCargoDuty) > dtl.cargoDuty) {
        errorMessage =
          "New In Bond Cargo Duty should not be greater than Cargo Duty";
        toast.error(
          "New In Bond Cargo Duty should not be greater than Cargo Duty.",
          {
            // ... (toast options)
          }
        );
        setLoading(false);
        isValid = false;
      }

      // Automatically calculate inbondInsuranceValue
      updatedValues[index].newInsuranceValue =
        parseFloat(values.newBondCifValue || 0) +
        parseFloat(values.newBondCargoDuty || 0);

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
        ...inBondHdr,
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
          `${ipaddress}api/cfexbondcrgEditController/saveCfExBondDataFromExBondAuditTrailScreen?companyId=${companyid}&branchId=${branchId}&user=${userId}&flag=${inbondFlag}`,
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .then((response) => {
          setInBondHdr(response.data);

          // setInBondHdr((pre) => ({
          //   ...pre,
          //   inBondedPackages: response.data.inBondedPackages,
          //   inBondedCif: response.data.inBondedCif,
          //   inBondedCargoDuty: response.data.inBondedCargoDuty,
          //   inBondedInsurance: response.data.inBondedInsurance,
          //   inBondedGw:response.data.inBondedGw
          // }));

          console.log("dataToSave response.data _______________________",response.data);

          fetchDataAfterSave(
            companyid,
            branchId,
            response.data.exBondingId,
            response.data.nocTransId,
            response.data.auditId
          );
          
          setInBondFlag("edit");
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
        });

      console.log("Data saved successfully:", dataToSave);
    } else {
      // Update state to reflect errors
      setInputValues(updatedValues);
    }
  };

  
  const handleSubmit = () => {
    setLoading(true);
    let errors = {};
    if(inBondHdr.status === 'A')
    {
      setLoading(false);
      toast.info("Record is alredy approved.", {
          autoClose: 1000
      })
      return;
    }
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
        ...inBondHdr,
      },
      nocDtl: {
        ...dataToSave,
      },
    };
  
    axios
    .post(
      `${ipaddress}api/cfexbondcrgEditController/approveDataFromExBondAuditTrailScreen?companyId=${companyid}&branchId=${branchId}&user=${userId}&flag=${inbondFlag}`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    )
    .then((response) => {
      // This block will execute only if the backend returns a successful response
      if (response.status === 200) 
      {
        // If backend returns 200 status, show success toast
        toast.success("Data saved successfully!!", {
          autoClose: 900,
        });

        setInBondHdr((prev) => ({
          ...prev,
          status:'A',
      }));
      

      } else 
      
      {
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
  
      let totalCif = 0;
      let totalCargo = 0;
      let totalGrossWeight = 0;
      let totalInsuranceVal = 0;
  
      selectedRows.forEach((row) => {
        const index = currentItems.findIndex((item) =>
        //     item.nocTransId === row.nocTransId &&
        //     item.nocNo === row.nocNo &&
        //     item.cfBondDtlId === row.cfBondDtlId
        // );
  
        row.srNo
        ? // If srNo exists, use commodityId
          item.nocTransId === row.nocTransId &&
          item.nocNo === row.nocNo &&
          item.commodityId === row.commodityId
        : // Otherwise, use cfBondDtlId
          item.nocTransId === row.nocTransId &&
          item.nocNo === row.nocNo &&
          item.cfBondDtlId === row.cfBondDtlId
    );
  
        if (index !== -1) {
          totalInBondedPackages += parseFloat(
            inputValues[index]?.newBondPackages || 0
          );
          totalShortagePackages += parseFloat(
            inputValues[index]?.newShortagePackages || 0
          );
  
          totalAreaOccupied += parseFloat(
            inputValues[index]?.newAreaOccupied || 0
          );
          totalDamagedQty += parseFloat(inputValues[index]?.newDamagedQty || 0);
          totalBreakage += parseFloat(inputValues[index]?.newBreakage || 0);
  
          
          totalInsuranceVal += parseFloat(inputValues[index]?.newInsuranceValue || 0);
          totalCif += parseFloat(inputValues[index]?.newBondCifValue || 0);
          totalCargo += parseFloat(inputValues[index]?.newBondCargoDuty || 0);
          totalGrossWeight += parseFloat(inputValues[index]?.newBondGrossWt || 0);
        }
      });
  
      setTotals({
        totalInBondedPackages,
        totalShortagePackages,
        totalDamagedQty,
        totalBreakage,
        totalAreaOccupied,
        totalCif,
        totalCargo,
        totalGrossWeight,
        totalInsuranceVal
      });
  
      setInBondHdr((pre) => ({
        ...pre,
        exBondedPackages: handleInputChangeNew(totalInBondedPackages,13,3),
        exBondedCif: handleInputChangeNew(totalCif,13,3),
        exBondedCargoDuty: handleInputChangeNew(totalCargo,13,3),
        exBondedInsurance: handleInputChangeNew(totalInsuranceVal,13,3),
        exBondedGw:handleInputChangeNew(totalGrossWeight,13,3)
      }));
    };
  
   // Example usage: Call this function after selection changes
   useEffect(() => {
    calculateTotals();
  }, [selectedRows, inputValues]);

  const handleClear = () => {
    setInBondHdr(initialInBondHdr);
    // document.getElementById("cha").classList.remove("error-border");
    // document.getElementById("igmNo").classList.remove("error-border");
    // document.getElementById("igmDate").classList.remove("error-border");
    // document.getElementById("igmLineNo").classList.remove("error-border");
    // document.getElementById("importerName").classList.remove("error-border");
    // document.getElementById("uom").classList.remove("error-border");
    // document.getElementById("nocDate").classList.remove("error-border");
    // document.getElementById("nocFromDate").classList.remove("error-border");
    // document.getElementById("nocValidityDate").classList.remove("error-border");
    // document.getElementById("boeNo").classList.remove("error-border");
    // document.getElementById("boeDate").classList.remove("error-border");
    // document.getElementById("area").classList.remove("error-border");
    setBondingErrors("");
    setCfbondnocDtl([]);
    setNewChaName('');
    setIsoName('');
    setImpId('');
    setImpName('');
    setInBondFlag("add");
    setChaName("");
    setCHASearchedData([]);
    setSelectAll(false);
    setIsDataFetched(false);
  };
  const [cfbondnocDtl, setCfbondnocDtl] = useState([]);


const fetchData = async (companyid, branchId,nocTransId,inBondingId,exBondBeNo,exBondingId)=>
{
  axios.get( `${ipaddress}api/cfexbondcrgEditController/getFromCfExBondCrgDtlToChange?companyId=${companyid}&branchId=${branchId}&nocTransId=${nocTransId}&inBondingId=${inBondingId}&exBondBeNo=${exBondBeNo}&exBondingId=${exBondingId}`,
  {
    headers : {
      Authorization: `Bearer ${jwtToken}`,
    },
  }).then((respone)=>{

    const data =respone.data;

    console.log("after geting serach frrm inbonidng id fetchData ",data);
    setCfbondnocDtl(data);
    setCHASearchedData(data);
  const newTotalPackages = data.reduce(
    (sum, row) => sum + (parseFloat(row.gateInPackages) || 0),
    0
  );

console.log("newTotalPackages_____________________",newTotalPackages);

setInputValues(data.map(mnr => ({
  ...mnr,
  yardLocationId:mnr.yardLocationId,
  blockId:mnr.blockId,
  grossWeight:mnr.grossWeight,
  cellAreaAllocated:mnr.exBondGridArea,
  cellNoRow:mnr.cellNoRow,
  commonBondingId:mnr.exBondingId,
  commodityId:mnr.cfBondDtlId,
  oldYardPackages:mnr.exBondyardPackages,
  oldAreaOccupied:mnr.areaOccupied,
  oldCommodityDescription :mnr.commodityDescription,
  oldTypeOfPackage:mnr.typeOfPackage,
  oldBondPackages: (mnr.exBondedPackages),
  oldBondCargoDuty: handleInputChangeNew((mnr.exBondedCargoDuty),13,3),
  oldBondCifValue: handleInputChangeNew((mnr.exBondedCIF ),13,3),
  oldInsuranceValue: handleInputChangeNew((
    (mnr.exBondedCargoDuty) +
    (mnr.exBondedCIF)
  ),13,3),
  oldShortagePackages:mnr.shortagePackages || 0,
  oldDamagedQty:mnr.damagedQty || 0,
  oldBreakage:mnr.breakage || 0,
  oldBondGrossWt: handleInputChangeNew(mnr.exBondedGW || 0,13,3),
})));
  }).catch((error)=>{
console.log("error",error);
  })
}

  const fetchDataAfterSave = async (companyid, branchId,exBondingId, nocTransId,auditId) => {
    try {
      const response = await fetch(
        `${ipaddress}api/cfexbondcrgEditController/getForExBondDtl?companyId=${companyid}&branchId=${branchId}&exBondingId=${exBondingId}&nocTransId=${nocTransId}&auditId=${auditId}`,
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

    // const newTotalPackages = data.reduce(
    //   (sum, row) => sum + (parseFloat(row.gateInPackages) || 0),
    //   0
    // );

console.log("fetchDataAfterSave_____________________________",data);

  setInputValues(data.map(mnr => ({
    ...mnr,
    auditId:mnr.auditId,
    yardLocationId:mnr.yardLocationId,
    blockId:mnr.blockId,
    cellNoRow:mnr.cellNoRow,
    nocTransId:mnr.nocTransId,
    commonBondingId:mnr.commonBondingId,
    commodityId:mnr.commodityId,
    oldYardPackages:mnr.oldYardPackages,
    oldAreaOccupied:mnr.oldAreaOccupied,
    oldCommodityDescription :mnr.oldCommodityDescription,
    oldTypeOfPackage:mnr.oldTypeOfPackage,
    oldBondPackages: (mnr.oldBondPackages),
    oldBondCargoDuty:handleInputChangeNew((mnr.oldBondCargoDuty),13,3),
    oldBondCifValue:handleInputChangeNew((mnr.oldBondCifValue ),13,3),
    oldInsuranceValue:handleInputChangeNew((
      (mnr.oldBondCargoDuty) +
      (mnr.oldBondCifValue)
    ),13,3),
    oldShortagePackages:mnr.oldShortagePackages || 0,
    oldDamagedQty:mnr.oldDamagedQty || 0,
    oldBreakage:mnr.oldBreakage || 0,
    oldBondGrossWt: mnr.oldBondGrossWt || 0,

    newBondedPackages:mnr.newBondedPackages || 0,
    newAreaOccupied:handleInputChangeNew(mnr.newAreaOccupied|| 0,13,3),

    newBondCargoDuty: handleInputChangeNew((mnr.newBondCargoDuty),13,3),
    newBondCifValue: handleInputChangeNew((mnr.newBondCifValue ),13,3),
    newInsuranceValue: handleInputChangeNew((
      (mnr.newBondCargoDuty) +
      (mnr.newBondCifValue)
    ),13,3),
    newShortagePackages:mnr.newShortagePackages || 0,
    newDamagedQty:mnr.newDamagedQty || 0,
    newBreakage:mnr.newBreakage || 0,
    newBondGrossWt: mnr.newBondGrossWt || 0,
})));

  // Automatically select all rows that have srNo after fetching data
  const selectedData = data.filter((row) => row.srNo !== undefined && row.srNo !== null);
  setSelectedRows(selectedData);
  setSelectAll(true);
  setIsDataFetched(true);
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
  const [selectAll, setSelectAll] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false); // Tracks if data is fetched

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

    if(['cellAreaAllocated','newBondGrossWt','newBondCifValue','newBondCargoDuty','newInsuranceValue'].includes(fieldName))
    {
      newValue =handleInputChangeNew(value,val,val1)
    }

    setInputValues((prevInputValues) => {
      const updatedValues = [...prevInputValues];
      const dtl = currentItems[index]; // Get the current item details for comparison

      let errorMessage = "";


      
      const newTotalPackages = updatedValues.reduce(
        (sum, row) => sum + (parseFloat(row.oldBondPackages) || 0),
        0
      );
    if (fieldName === "newBondPackages") 
    {
      // Calculate per package weight and update inbondGrossWt
      const perPackageWeight = dtl.inbondGrossWt / dtl.inBondedPackages;
      updatedValues[index].newBondGrossWt = (
        perPackageWeight * parseFloat(newValue)
      ).toFixed(2);

            // Calculate per package weight and update inbondGrossWt
            // const pernewAreaOccupied = dtl.areaOccupied / dtl.inBondedPackages;
            // updatedValues[index].newAreaOccupied = (
            //   pernewAreaOccupied * parseFloat(value)
            // ).toFixed(2);

            
     
  // const area = inBondHdr.areaAllocated / newTotalPackages;
  //     updatedValues[index].areaOccupied = (
  //       area * parseFloat(value)
  //     ).toFixed(2);
    

  // Calculate exBondedCif and exBondedCargoDuty using the newly input value
  const newBondedPackages = parseFloat(newValue); // Use the input value for calculations

  const cal = parseFloat(dtl.inbondCifValue) / (dtl.inBondedPackages);
  updatedValues[index].newBondCifValue = (cal * newBondedPackages).toFixed(2);

  const calCargo = parseFloat(dtl.inbondCargoDuty) / (dtl.inBondedPackages);
  updatedValues[index].newBondCargoDuty = (calCargo * newBondedPackages).toFixed(2);

      // Calculate and update inbondInsuranceValue
      updatedValues[index].newInsuranceValue = (
        parseFloat(updatedValues[index].newBondCifValue) + parseFloat( updatedValues[index].newBondCargoDuty)
      ).toFixed(2);
    }


let addition;

    if (inBondHdr.inBondingId)
    {
      addition=dtl.inBondedPackages;
    }else
    {
      // addition=dtl.gateInPackages - dtl.inBondedPackages;
      addition=dtl.inBondedPackages;
    }

    if (fieldName === "newBondPackages" && parseFloat(newValue) > addition) {
      errorMessage = `New In Bond Packages should not be greater than ${addition}`;
    }
      // Validation for yardPackages

       if (fieldName === "newYardPackages" && parseFloat(newValue) > parseFloat(updatedValues[index].newBondPackages)) {
        errorMessage = `New Yard Bond Packages should not be greater ${parseFloat(updatedValues[index].newBondPackages)}`;
      }

      // Validation for areaOccupied
       if (fieldName === "newAreaOccupied" && parseFloat(newValue) > inBond.areaAllocated) {
        errorMessage = "New Area occupied should not be greater than allocated area.";
      }

      // Validation for inbondCifValue
       if (fieldName === "newBondCifValue" && parseFloat(newValue) > dtl.inbondCifValue) {
        errorMessage = "New In Bond CIF Value should not be greater than CIF Value";
      }

      // Validation for inbondCargoDuty
       if (fieldName === "newBondCargoDuty" && parseFloat(newValue) > dtl.inbondCargoDuty) {
        errorMessage = "New In Bond Cargo Duty should not be greater than Cargo Duty";
      }

      // Automatically calculate inbondInsuranceValue based on inbondCifValue and inbondCargoDuty
      if (fieldName === "newBondCifValue" || fieldName === "newBondCargoDuty") {
        updatedValues[index].newInsuranceValue = (
          parseFloat(updatedValues[index].newBondCifValue || 0) +
          parseFloat(updatedValues[index].newBondCargoDuty || 0)
        ).toFixed(2);
      }

      // Calculate cellAreaAllocated for yardPackages
      if (fieldName === "newYardPackages") {
        const perPackageArea = dtl.exBondGridArea / dtl.inBondedPackages; // Assuming the area is distributed per package
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
    if (isChecked) 
    {
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


  // const handleCheckboxChangeForDtl = (event, row) => {
  //   const isChecked = event.target.checked;
  
  //   // If srNo has a value, ensure the row is selected and prevent deselection
  //   if (row.srNo !== undefined && row.srNo !== null) {
  //     // Check if row is already selected; if not, add it
  //     if (
  //       !selectedRows.some(
  //         (selectedRow) =>
  //           selectedRow.nocTransId === row.nocTransId &&
  //           selectedRow.nocNo === row.nocNo &&
  //           selectedRow.commodityId === row.commodityId // Use commodityId if srNo exists
  //       )
  //     ) {
  //       setSelectedRows([...selectedRows, row]);
  //     }
  //     return; // Prevent further execution to keep it selected
  //   }
  
  //   // Regular toggle logic when srNo is not present
  //   if (isChecked) {
  //     // If not already selected, add to selected rows
  //     if (
  //       !selectedRows.some(
  //         (selectedRow) =>
  //           selectedRow.nocTransId === row.nocTransId &&
  //           selectedRow.nocNo === row.nocNo &&
  //           selectedRow.cfBondDtlId === row.cfBondDtlId
  //       )
  //     ) {
  //       setSelectedRows([...selectedRows, row]);
  //     }
  //   } else {
  //     // Remove from selected rows
  //     const updatedRows = selectedRows.filter(
  //       (selectedRow) =>
  //         selectedRow.nocTransId !== row.nocTransId ||
  //         selectedRow.nocNo !== row.nocNo ||
  //         selectedRow.cfBondDtlId !== row.cfBondDtlId
  //     );
  //     setSelectedRows(updatedRows);
  //   }
  // };
  


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

    const [isModalOpenForYard, setIsModalOpenForYard] = useState(false);
    const [yardFlag, setYardFlag] = useState('');

const [modalData ,setModalData ]=useState({});
// const [modalDataInput ,setModalDataInput ]=useState({});
const [validationError, setValidationError] = useState('');
const [validationErrorArea, setValidationErrorArea] = useState('');

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
const openYardModal = (dtl) => {
  setIsModalOpenForYard(true);
  setYardFlag(dtl);
  setModalDataInput((pre) =>({
    ...pre,
    commodityDescription : dtl.newCommodityDescription || dtl.commodityDescription ,
          cfBondDtlId :dtl.commodityId  || dtl.cfBondDtlId,
    nocNo:dtl.nocNo,
    gateInPackages :dtl.gateInPackages,
    exBondingId:inBondHdr.exBondingId,
    nocTransId:dtl.nocTransId,
  }))
  console.log("exBond.inBondingIdexBond.inBondingId",inBondHdr.inBondingId);
  console.log("dtl.inBondingIddtl.inBondingId",dtl.inBondingId);
  console.log("exBond.nocTransId.nocTransId",dtl.nocTransId);
  console.log("exBond.cfBondDtlId.cfBondDtlId",dtl.commodityId);
  getInBondGridData(inBondHdr.exBondingId,dtl.commodityId);
  fetchSumOfExBondPackages(inBondHdr.exBondingId,dtl.commodityId,dtl.nocTransId,inBondHdr.auditId);
};

const fetchSumOfExBondPackages = async (exBondingId, cfBondDtlId, nocTransId,auditId) => {
  axios.get(`${ipaddress}api/cfexbondcrgEditController/sum?companyId=${companyid}&branchId=${branchId}&inBondingId=${exBondingId}&cfBondDtlId=${cfBondDtlId}&nocTransId=${nocTransId}&auditId=${auditId}`,{
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


    const [yardCellArray, setYardCellArray] = useState([]);


   
    
    const handleSaveCfBondGrid = () => {
      const hasEmptyFields = rows.some(row =>  !row.exBondPackages || 
        !row.exCellAreaAllocated
      );
    
      if (hasEmptyFields) {
        const errorMsg = "All fields must be filled before saving.";
        setErrors((prevErrors) => ({
          ...prevErrors,
          save: errorMsg, // Set error message for save
        }));
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
        });
    };


    // PAGINATION FOR YARD CELL
    const [currentPageYardCell, setCurrentPageYardCell] = useState(1);
    const [itemsPerPageYardCell] = useState(10);
  
    const indexOfLastItemYardCell = currentPageYardCell * itemsPerPageYardCell;
    const indexOfFirstItemYardCell = indexOfLastItemYardCell - itemsPerPageYardCell;
    const currentItemsYardCell = yardCellArray.slice(indexOfFirstItemYardCell, indexOfLastItemYardCell);
    const totalPagesYardCell = Math.ceil(yardCellArray.length / itemsPerPageYardCell);

    const [selectedItemsYard, setSelectedItemsYard] = useState([]);

const [boeData, setBOEData] = useState([]);
const [isoId, setISOId] = useState('');
const [isoName, setIsoName] = useState('');

const handleBoeChange = async (selectedOption, { action }) => {
  if (action === 'clear') {
      console.log("respone datacagahgdhsagdhs",selectedOption);
      setIsoName('');
      setISOId('');
      setSelectAll(false);
      setIsDataFetched(false);
      setInBondHdr((pre) => ({
        ...pre,
        boeNoOld: '',
        chaOld:'',
        exBondingId:'',
        exBondingDate:'',
        inBondingId:'',
        inBondingDate:'',
        exBondType:'',
        boeNoOld:'',
        boeDateOld:'',
        bondingNoOld:'',
        bondingDateOld:'',
        nocNo:'',
        exBondBeNoOld:'',
        exBondBeDateOld:'',
        sbNoOld:'',
        sbDateOld:'',
        transferBondNoOld:'',
        transferBondDateOld:'',
        exBondBeNo:'',
        exBondBeDate:'',
        sbNo:'',
        sbDate:'',
        transferBondNo:'',
        transferBondDate:'',
        sbQtyOld:'',
        sbQtyNew:'',
        sbValueOld:'',
        sbValueNew:'',
        sbDutyOld:'',
        sbDutyNew:'',
        section49Old:'',
        section49:'',
        importerNameOld:'',
        chaOld:'',
        exBondedPackagesOld:'',
        exBondedGwOld:'',
        exBondedCargoDutyOld:'',
        exBondedInsuranceOld:'',
        exBondedCifOld:'',
        exBondedPackages:'',
        exBondedGw:'',
        exBondedCif:'',
        exBondedCargoDuty:'',
        exBondedInsurance:'',
        importerIdOld:'',

        remainingCifOld:'',
        remainingCargoDutyOld:'',
        remainingInsuranceOld:'',
        remainingGwOld:'',
        remainingPackagesOld:'',

        balanceCifOld:'',
        balanceCargoDutyOld:'',
        balanceInsuranceOld:'',
        balanceGwOld:'',
        balancedPackagesOld:'',


        remainingCargoDuty:'',
        remainingCif:'',
        remainingInsurance:'',
        remainingPackages:'',
        remainingGw:'',

        section49:'',
        section49Old:'',
      }));
      
      document.getElementById('exBondBeNoOld').classList.remove('error-border');
      setBondingErrors((prevErrors) => ({
          ...prevErrors,
          ['exBondBeNoOld']: "",
      }));
  }
  else {
      console.log("respone datacagahgdhsagdhs",selectedOption);
      const qtyTakenOut = selectedOption?.qtyTakenOut || '';

      if (qtyTakenOut > 0 ) {
        toast.error("Can not update exbond gate pass is done.", {
          position: 'top-center',
          autoClose: 999,
        });
        return;
      }
      setInBondHdr((prev) => ({
        ...prev,
        exBondBeNoOld: selectedOption ? selectedOption.exBondBeNo : '',
      }));
      setChaName(selectedOption ? selectedOption.chaName:'');
      setIsoName(selectedOption ? selectedOption.label : '');
      setInBondHdr((pri) => ({
        ...pri,
        exBondBeNoOld: selectedOption ? selectedOption.exBondBeNoOld : '',
        boeNoOld: selectedOption ? selectedOption.boeNoOld : '',
        chaOld:selectedOption ? selectedOption.chaOld : '',
        exBondingId:selectedOption ? selectedOption.exBondingId : '',
        exBondingDate:selectedOption ? selectedOption.exBondingDate : '',
        inBondingId:selectedOption ? selectedOption.inBondingId : '',
        inBondingDate:selectedOption ? selectedOption.inBondingDate : '',
        exBondType:selectedOption ? selectedOption.exBondType : '',
        boeDateOld:selectedOption ? selectedOption.boeDateOld : '',
        bondingNoOld:selectedOption ? selectedOption.bondingNoOld : '',
        bondingDateOld:selectedOption ? selectedOption.bondingDateOld : '',
        nocNo:selectedOption ? selectedOption.nocNo : '',
        exBondBeNoOld:selectedOption ? selectedOption.exBondBeNoOld : '',
        sbNoOld:selectedOption ? selectedOption.sbNoOld : '',
        sbDateOld:selectedOption ? selectedOption.sbDateOld : '',
        transferBondNoOld:selectedOption ? selectedOption.transferBondNoOld : '',
        transferBondDateOld:selectedOption ? selectedOption.transferBondDateOld : '',
        sbQtyOld:selectedOption ? selectedOption.sbQtyOld : '',
        sbValueOld:selectedOption ? selectedOption.sbValueOld : '',
        sbDutyOld:selectedOption ? selectedOption.sbDutyOld : '',
        section49Old:selectedOption ? selectedOption.section49Old : '',
        importerNameOld:selectedOption ? selectedOption.importerNameOld : '',
        chaOld:selectedOption ? selectedOption.chaOld : '',
        exBondedPackagesOld:selectedOption ? selectedOption.exBondedPackagesOld : '',
        exBondedGwOld:selectedOption ? selectedOption.exBondedGwOld : '',
        exBondedCargoDutyOld:selectedOption ? selectedOption.exBondedCargoDutyOld : '',
        exBondedInsuranceOld:selectedOption ? selectedOption.exBondedInsuranceOld : '',
        exBondedCifOld:selectedOption ? selectedOption.exBondedCifOld : '',
        importerIdOld:selectedOption ? selectedOption.importerIdOld : '',
        exBondBeDateOld:selectedOption ? selectedOption.exBondBeDateOld : '',
        nocTransId:selectedOption ? selectedOption.nocTransId : '',

        remainingCifOld:selectedOption ? selectedOption.remainingCifOld : '',
        remainingCargoDutyOld:selectedOption ? selectedOption.remainingCargoDutyOld : '',
        remainingInsuranceOld:selectedOption ? selectedOption.remainingInsuranceOld : '',
        remainingGwOld:selectedOption ? selectedOption.remainingGwOld : '',
        remainingPackagesOld:selectedOption ? selectedOption.remainingPackagesOld : '',

        balanceCifOld:selectedOption ? selectedOption.balanceCifOld : '',
        balanceCargoDutyOld:selectedOption ? selectedOption.balanceCargoDutyOld : '',
        balanceInsuranceOld:selectedOption ? selectedOption.balanceInsuranceOld : '',
        balanceGwOld:selectedOption ? selectedOption.balanceGwOld : '',
        balancedPackagesOld:selectedOption ? selectedOption.balancedPackagesOld : '',
        balancedQty:selectedOption ? selectedOption.balancedPackagesOld : '',
        inBondedCif:selectedOption ? selectedOption.inBondedCif : '',
        inBondedCargoDuty:selectedOption ? selectedOption.inBondedCargoDuty : '',
        inBondedInsurance:selectedOption ? selectedOption.inBondedInsurance : '',
        inBondedGw:selectedOption ? selectedOption.inBondedGw : '',
        inBondedPackages:selectedOption ? selectedOption.inBondedPackages : '',


        // remainingPackages: port.inBondedPackages - port.exBondedPackages,
          
        // remainingCif:
        //   ((port.inBondedPackages - port.exBondedPackages) * port.cifValue) /
        //   port.inBondedPackages,
      
        // remainingCargoDuty:
        //   ((port.inBondedPackages - port.exBondedPackages) * port.cargoDuty) /
        //   port.inBondedPackages,
      
        // remainingInsurance:
        //   port.inBondedPackages -
        //   (port.exBondedPackages * port.cifValue) / port.inBondedPackages +
        //   port.inBondedPackages -
        //   (port.exBondedPackages * port.cargoDuty) / port.inBondedPackages,
      
        // remainingGw: port.grossWeight - port.exBondedGw,
        // remainingInsurance: port.inbondInsuranceValue - port.exBondedInsurance,
        
        remainingCargoDuty:handleInputChangeNew((selectedOption.inBondedCargoDuty - selectedOption.exBondedCargoDutyOld),13,3),
        
        remainingCif:handleInputChangeNew((selectedOption.inBondedCif - selectedOption.exBondedCifOld),13,3),

        
        remainingInsurance:handleInputChangeNew(selectedOption.inBondedInsurance - selectedOption.exBondedInsuranceOld,13,3),
        
        remainingPackages:selectedOption.inBondedPackages - selectedOption.exBondedPackagesOld,
        
        remainingGw:handleInputChangeNew(selectedOption.inBondedGw - selectedOption.exBondedGwOld,13,3),

        section49:selectedOption.section49Old,
        section49Old: selectedOption.section49Old,
      }));
      setChaName(selectedOption?.chaName)
      handleYardLocationData();
     
      console.log("  selectedOption?.inBondingId,",  selectedOption?.inBondingId);
      console.log("  selectedOption?.nocTransId,",  selectedOption?.nocTransId);

      fetchData(
        companyid,
        branchId,
        selectedOption?.nocTransId,
        selectedOption?.inBondingId,
        selectedOption?.exBondBeNoOld,
        selectedOption?.exBondingId
      );

      document.getElementById('exBondBeNoOld').classList.remove('error-border');
      setBondingErrors((prevErrors) => ({
          ...prevErrors,
          ['exBondBeNoOld']: "",
      }));
  }
};

const getBoeData = (val) => {
  if (val === '') {
      setBOEData([]);
      return;
  }

  axios.get( `${ipaddress}api/cfexbondcrgEditController/getExBondBoeNoData?companyId=${companyid}&branchId=${branchId}&boeNo=${val}`, {
      headers: {
          Authorization: `Bearer ${jwtToken}`
      }
  })
      .then((response) => {
          const data = response.data;
          console.log("response.data_____________response.data_____response.data______response.data",data);
          const portOptions = data.map(port => ({
            value: port.exBondBeNo + '' + port.exBondingId,
            label: `${port.exBondBeNo}-${port.exBondingId}`,
            boeNoOld: port.boeNo,
            chaOld:port.cha,
            exBondBeNo:port.exBondBeNo,
            exBondingId:port.exBondingId,
            exBondingDate:port.exBondingDate,
            inBondingId:port.inBondingId,
            inBondingDate:port.inBondingDate,
            exBondType:port.exBondType,
            // boeDateOld:'',
            nocTransId:port.nocTransId,
            bondingNoOld:port.bondingNo,
            bondingDateOld:port.bondingDate,
            nocNo:port.nocNo,
            exBondBeNoOld:port.exBondBeNo,
            sbNoOld:port.sbNo,
            sbDateOld:port.sbDate,
            transferBondNoOld:port.transferBondNo,
            transferBondDateOld:port.transferBondDate,
            exBondBeDateOld:port.exBondBeDate,
            sbQtyOld:port.sbQty,
            qtyTakenOut:port.qtyTakenOut,
            sbValueOld:port.sbValue,
           
            sbDutyOld:port.sbDuty,
          
            section49Old:port.section49,

            importerNameOld:port.importerName,
            chaOld:port.cha,
            exBondedPackagesOld:port.exBondedPackages,
            exBondedGwOld:port.exBondedGw,
            exBondedCargoDutyOld:port.exBondedCargoDuty,
            exBondedInsuranceOld:port.exBondedInsurance,
            exBondedCifOld:port.exBondedCif,
            importerIdOld:port.giTransporterName,
            chaName:port.chaName,

            remainingCifOld:port.remainingCif,
        remainingCargoDutyOld:port.remainingCargoDuty,
        remainingInsuranceOld:port.remainingInsurance,
        remainingGwOld:port.remainingGw,
        remainingPackagesOld:port.remainingPackages,

        balanceCifOld:port.balanceCif,
        balanceCargoDutyOld:port.balanceCargoDuty,
        balanceInsuranceOld:port.balanceInsurance,
        balanceGwOld:port.balanceGw,
        balancedPackagesOld:port.balancedQty,





        inBondedCif:port.inBondedCif,
        inBondedCargoDuty:port.inBondedCargoDuty,
        inBondedInsurance:port.inBondedInsurance,
        inBondedGw:port.inBondedGw,
        inBondedPackages:port.inBondedPackages,
          }));
          
          setBOEData(portOptions);
      })
      .catch((error) => {

      })
}


const [isoData, setISOData] = useState([]);
const [impId, setImpId] = useState('');
const [newChaName, setNewChaName] = useState('');
const handlePortChange = async (selectedOption, { action }) => {
  if (action === 'clear') {
      console.log("respone datacagahgdhsagdhs",selectedOption);
      setInBondHdr((pre)=>({
          ...pre,
          cha:'',
          chaName:'',
          nocWeek: '',
          newChaCode:'',
  }));
  setNewChaName('');             
  }
  else {
      console.log("respone datacagahgdhsagdhs",selectedOption);

      setInBondHdr((prev) => ({
        ...prev,
        cha: selectedOption ? selectedOption.value : '',
        chaName: selectedOption ? selectedOption.drop : '',
      }));
      
      setNewChaName(selectedOption ? selectedOption.drop : '');
      setInBondHdr((noc)=>({
        ...noc,
        cha:selectedOption ? selectedOption.value : '',
        newChaCode:selectedOption ? selectedOption.ccode : '',
        nocWeek:selectedOption ? selectedOption.bWeek : '',
        chaName:selectedOption ? selectedOption.drop : '',
        chaName:selectedOption ? selectedOption.cName : '',
                      }));
                      setNewChaName(selectedOption ? selectedOption.drop:''); 
  }
};



const [impName, setImpName] = useState("");
const [impData, setImpData] = useState([]);
  const [totalPackages, setTotalPackages] = useState(0);
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
    !row.cellArea || !row.cellAreaUsed || !row.inBondPackages || 
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
                      Search Ex Bonding Audit Trail
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
                            Search by ExBonding Id / Noc No /Noc Trans Id / Boe No / ExBondBoe No
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
                            <th scope="col">Ex Bonding Id</th>
                            <th scope="col">Audit Trail Id</th>
                            <th scope="col">Ex Bonding Date</th>
                            <th scope="col">NOC Trans Id</th>

                            <th scope="col">NOC No </th>
                            <th scope="col">Old ExBoe No</th>
                            <th scope="col">New ExBoe No</th>
                            <th scope="col">BOE No</th>
                            <th scope="col">Old ExBoe Date</th>
                            <th scope="col">New ExBoe Date</th>
                            {/* <th scope="col">IGM No</th>
                            <th scope="col">IGM Line No</th> */}
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
                            {/* <th scope="col"></th>
                            <th scope="col"></th> */}
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
                                      item.srNo,
                                      item.nocTransId,
                                      item.exBondingId,
                                      item.nocNo,
                                      item.auditId
                                      
                                    )
                                  }
                                  value={item[0]}
                                />
                              </td>
                              <td>{item.exBondingId}</td>
                              <td>{item.auditId}</td>
                              <td>{item.exBondingDate ? format( new Date(item.exBondingDate) ,'dd/MM/yyyy HH:mm') : null}</td>
                              <td>{item.nocTransId}</td>
                              <td>{item.nocNo}</td>
                              <td>{item.exBondBeNoOld}</td>
                              <td>{item.exBondBeNo}</td>
                              <td>{item.boeNo}</td>
                              <td>{item.exBondBeDateOld ? format(new Date(item.exBondBeDateOld),"dd/MM/yyyy") : ''}</td>
                              <td>{item.exBondBeDate ? format(new Date(item.exBondBeDate),"dd/mm/yyyy") :''}</td>
                              {/* <td>{item.igmNo}</td>
                              <td>{item.igmLineNo}</td> */}
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

  <Row>
<Col md={2}>
        <Row>
          <Col md={8}>
          <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="exBondingId"
                    >
                     EX Bonding ID
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="exBondingId"
                      name="exBondingId"
                      value={inBondHdr.exBondingId}
                      maxLength={27}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
          </Col>

          <Col md={4} style={{ marginTop: 18 }}>
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
        </Row>

                </Col>

    <Col md={2}>
    <FormGroup>
    <label style={{ fontSize: '14px' }} className="forlabel" for="exBondingDate">EX Bonding Date</label>
<div style={{ position: "relative" }}>
<div>
                      <DatePicker
                        id="exBondingDate"
                        name='exBondingDate'
                        wrapperClassName="custom-react-datepicker-wrapper"
                        className="form-control"
                        customInput={<input style={{ width: '100%', backgroundColor: '#E0E0E0'  }} />}
                       
                        selected={inBondHdr.exBondingDate}
                        // onChange={handleNewBondingDate}
                        timeInputLabel="Time:"
                        dateFormat="dd/MM/yyyy HH:mm"
                        showTimeInput
                      />
                    </div>
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
            <label style={{ fontSize: '14px' }} className="forlabel" for="inBondingId">In Bonding ID</label>
            <input
                type="text"
                name="inBondingId"
                id="inBondingId"
                readOnly
                style={{ backgroundColor: '#E0E0E0' }}
                value={inBondHdr.inBondingId}
                className="form-control"
            />
        </FormGroup>
    </Col>
    <Col md={2}>
    <FormGroup>
    <label style={{ fontSize: '14px' }} className="forlabel" for="inBondingDate">In Bonding Date</label>
<div style={{ position: "relative" }}>
<div>
                      <DatePicker
                        id="inBondingDate"
                        name='inBondingDate'
                        wrapperClassName="custom-react-datepicker-wrapper"
                        className="form-control"
                        customInput={<input style={{ width: '100%', backgroundColor: '#E0E0E0'  }} />}
                       
                        selected={inBondHdr.inBondingDate}
                        // onChange={handleNewBondingDate}
                        timeInputLabel="Time:"
                        dateFormat="dd/MM/yyyy HH:mm"
                        showTimeInput
                      />
                    </div>
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
            <label style={{ fontSize: '14px' }} className="forlabel" for="exBondType">Ex Bond Type</label>
            <select
                id="exBondType"
                className="form-control form-select"
                onChange={handleNocChange}
                value={inBondHdr.exBondType}
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
            <label style={{ fontSize: '14px' }} className="forlabel" for="status">Status</label>
            <input
                type="text"
                name="status"
                id="status"
                readOnly
                style={{ backgroundColor: '#E0E0E0' }}
                value={inBondHdr.status === "N"
                    ? "New"
                    : inBondHdr.status === "U"
                        ? "Edit"
                        : inBondHdr.status === "A"
                            ? "Approved"
                            : inBondHdr.status}
                className="form-control"
            />
        </FormGroup>
    </Col>
</Row>

<Row>
<Col md={2}>
        <FormGroup>
            <lable style={{ fontSize: '14px' }} className="forlabel" for="boeNoOld">WH BOE NO</lable>
            <input
                type="text"
                name="boeNoOld"
                id="boeNoOld"
                readOnly
                maxLength={20}
                style={{ backgroundColor: '#E0E0E0' }}
                value={inBondHdr.boeNoOld}
                className="form-control"
            />
        </FormGroup>
    </Col>
    <Col md={2}>
        <lable style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">WH BOE Date</lable>
        <DatePicker
            selected={inBondHdr.boeDateOld}
            dateFormat="dd/MM/yyyy"
            className="form-control border-right-0 inputField"
            disabled
            customInput={<input style={{ width: '100%', backgroundColor: '#E0E0E0' }} />}
            wrapperClassName="custom-react-datepicker-wrapper"
        />
    </Col>
    <Col md={2}>
        <lable style={{ fontSize: '14px' }} className="forlabel" for="bondingNoOld">Bonding No</lable>
        <input
            type="text"
            name="bondingNoOld"
            id="bondingNoOld"
            maxLength={65}
            readOnly
            style={{ backgroundColor: '#E0E0E0' }}
            value={inBondHdr.bondingNoOld}
            className="form-control"
        />
    </Col>
    <Col md={2}>
    <FormGroup>
    <lable style={{ fontSize: '14px' }} className="forlabel" for="bondingDateOld">Bonding Date</lable>
<div style={{ position: "relative" }}>
<div>
                      <DatePicker
                        id="bondingDateOld"
                        name='bondingDateOld'
                        wrapperClassName="custom-react-datepicker-wrapper"
                        className="form-control"
                        customInput={<input style={{ width: '100%', backgroundColor: '#E0E0E0'  }} />}
                       
                        selected={inBondHdr.bondingDateOld}
                        // onChange={handleNewBondingDate}
                        timeInputLabel="Time:"
                        dateFormat="dd/MM/yyyy"
                        showTimeInput
                      />
                    </div>
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
        <lable style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">NOC No</lable>
        <input
            type="text"
            name="nocNo"
            id="nocNo"
            readOnly
            style={{ backgroundColor: '#E0E0E0' }}
            value={inBondHdr.nocNo}
            className="form-control"
        />
    </Col>

    <Col md={2}>
        <lable style={{ fontSize: '14px' }} className="forlabel" for="status">Created By</lable>
        <input
            type="text"
            name="createdBy"
            id="createdBy"
            readOnly
            style={{ backgroundColor: '#E0E0E0' }}
            value={inBondHdr.createdBy}
            className="form-control"
        />
    </Col>
</Row>

<Row>
{(inBondHdr.srNo !== undefined && inBondHdr.srNo !== null ) ? (
                    <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="exBondBeNoOld">
                    Old Exbond BE No
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="exBondBeNoOld"
                      maxLength={15}
                      name="exBondBeNoOld"
                      value={inBondHdr.exBondBeNoOld}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                    <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.exBondBeNoOld}
                    </div>
                  </FormGroup>

                </Col>
                 )
                 :(
                  <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="exBondBeNoOld">
                                Old Exbond BE No
                                </label>
                                <Select
                                    value={{ value: inBondHdr.exBondBeNoOld, label: isoName }}
                                    onChange={handleBoeChange}
                                    onInputChange={getBoeData}
                                    options={boeData}
                                    placeholder="Select Boe No"
                                    isClearable
                                    id="exBondBeNoOld"
                                    vesselName="exBondBeNoOld"

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
                 )}


    <Col md={2}>

        <FormGroup>
        <lable style={{ fontSize: '14px' }} className="forlabel" for="exBondBeDateOld">Old Exbond BE Date</lable>
<div style={{ position: "relative" }}>
<div>
                      <DatePicker
                        id="exBondBeDateOld"
                        name='exBondBeDateOld'
                        wrapperClassName="custom-react-datepicker-wrapper"
                        className="form-control"
                        customInput={<input style={{ width: '100%', backgroundColor: '#E0E0E0'  }} />}
                       
                        selected={inBondHdr.exBondBeDateOld}
                        // onChange={handleNewBondingDate}
                        timeInputLabel="Time:"
                        dateFormat="dd/MM/yyyy"
                        showTimeInput
                      />
                    </div>
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
            <lable style={{ fontSize: '14px' }} className="forlabel" for="sbNo">Old SB No</lable>
            <input
                type="text"
                name="sbNo"
                id="sbNo"
                maxLength={20}
                readOnly
                style={{ backgroundColor: '#E0E0E0' }}
                value={inBondHdr.exBondType === 'EXP' ? inBondHdr.sbNoOld : ''}
                className="form-control"
            />
        </FormGroup>
    </Col>
    <Col md={2}>
    <FormGroup>
    <lable style={{ fontSize: '14px' }} className="forlabel" for="sbDateOld">Old SB Date</lable>
<div style={{ position: "relative" }}>
<div>
                      <DatePicker
                        id="sbDateOld"
                        name='sbDateOld'
                        wrapperClassName="custom-react-datepicker-wrapper"
                        className="form-control"
                        customInput={<input style={{ width: '100%', backgroundColor: '#E0E0E0'  }} />}
                       
                        selected={inBondHdr.exBondType === 'EXP' ? inBondHdr.sbDateOld : null}
                        // onChange={handleNewBondingDate}
                        timeInputLabel="Time:"
                        dateFormat="dd/MM/yyyy"
                        showTimeInput
                      />
                    </div>
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
        {/* <FormGroup>
            <lable style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">Old SB Date</lable>
            <DatePicker
                selected={inBondHdr.exBondType === 'EXP' ? inBondHdr.sbDateOld : null}
                readOnly
                dateFormat="dd/MM/yyyy"
                className="form-control border-right-0 inputField"
                customInput={<input style={{ width: '100%', backgroundColor: '#E0E0E0' }} />}
                wrapperClassName="custom-react-datepicker-wrapper"
            />
        </FormGroup> */}
    </Col>
    <Col md={2}>
        <FormGroup>
            <lable style={{ fontSize: '14px' }} className="forlabel" for="trnsferBondNo">Old Transfer Bond No</lable>
            <input
                type="text"
                name="trnsferBondNo"
                id="trnsferBondNo"
                maxLength={20}
                readOnly
                style={{ backgroundColor: '#E0E0E0' }}
                value={inBondHdr.exBondType === 'BTB' ? inBondHdr.transferBondNoOld : ''}
                className="form-control"
            />
        </FormGroup>
    </Col>
    <Col md={2}>
        {/* <FormGroup>
            <lable style={{ fontSize: '14px' }} className="forlabel" for="transferBondDateOld">Old Transfer Bond Date</lable>
            <DatePicker
                selected={inBondHdr.exBondType === 'BTB' ? inBondHdr.transferBondDateOld : null}
                readOnly
                dateFormat="dd/MM/yyyy"
                className="form-control border-right-0 inputField"
                customInput={<input style={{ width: '100%', backgroundColor: '#E0E0E0' }} />}
                wrapperClassName="custom-react-datepicker-wrapper"
            />
        </FormGroup> */}

        <FormGroup>
        <lable style={{ fontSize: '14px' }} className="forlabel" for="transferBondDateOld">Old Transfer Bond Date</lable>
<div style={{ position: "relative" }}>
<div>
                      <DatePicker
                        id="transferBondDateOld"
                        name='transferBondDateOld'
                        wrapperClassName="custom-react-datepicker-wrapper"
                        className="form-control"
                        customInput={<input style={{ width: '100%', backgroundColor: '#E0E0E0'  }} />}
                       
                        selected={inBondHdr.exBondType === 'BTB' ? inBondHdr.transferBondDateOld : null}
                        // onChange={handleNewBondingDate}
                        timeInputLabel="Time:"
                        dateFormat="dd/MM/yyyy"
                        showTimeInput
                      />
                    </div>
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
            <lable style={{ fontSize: '14px' }} className="forlabel" for="exBondBeNo">New Exbond BE No</lable>
            <input
                type="text"
                name="exBondBeNo"
                id="exBondBeNo"
                maxLength={20}
                readOnly={(inBondHdr.exBondType !== 'EXB' && inBondHdr.exBondType !== 'APN')}
                style={{ backgroundColor: (inBondHdr.exBondType !== 'EXB' && inBondHdr.exBondType !== 'APN') ? '#E0E0E0' : "" }}
                value={(inBondHdr.exBondType === 'EXB' || inBondHdr.exBondType === 'APN') ? inBondHdr.exBondBeNo : ""}
                onChange={handleNocChange}
                className="form-control"
            />
        </FormGroup>
    </Col>
    <Col md={2}>
        <FormGroup>
            <lable style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">New Exbond BE Date</lable>
<div style={{ position: "relative" }}>
<div>
                      <DatePicker
                       readOnly={(inBondHdr.exBondType !== 'EXB' && inBondHdr.exBondType !== 'APN')}
                       selected={(inBondHdr.exBondType === 'EXB' || inBondHdr.exBondType === 'APN') ? inBondHdr.exBondBeDate : ""}

                        id="exBondBeDate"
                        name='exBondBeDate'
                        wrapperClassName="custom-react-datepicker-wrapper"
                        className="form-control"
                        customInput={<input style={{ width: '100%', backgroundColor: (inBondHdr.exBondType !== 'EXB' && inBondHdr.exBondType !== 'APN') ? '#E0E0E0' : "" }} />}
                        onChange={handleDate1Change}
                        timeInputLabel="Time:"
                        dateFormat="dd/MM/yyyy HH:mm"
                        showTimeInput
                      />
                    </div>
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
            <lable style={{ fontSize: '14px' }} className="forlabel" for="sbNo">New SB No</lable>
            <input
                type="text"
                name="sbNo"
                id="sbNo"
                maxLength={20}
                readOnly={inBondHdr.exBondType !== 'EXP'}
                style={{ backgroundColor: inBondHdr.exBondType !== 'EXP' ? '#E0E0E0' : "" }}
                value={inBondHdr.exBondType === 'EXP' ? inBondHdr.sbNo : ""}
                onChange={handleNocChange}
                className="form-control"
            />
        </FormGroup>
    </Col>
    <Col md={2}>
        <FormGroup>
            <lable style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">New SB Date</lable>
<div style={{ position: "relative" }}>
<div>
                      <DatePicker
                        id="sbDate"
                        name='sbDate'
                        wrapperClassName="custom-react-datepicker-wrapper"
                        className="form-control"
                        customInput={<input style={{ width: '100%', backgroundColor: inBondHdr.exBondType !== 'EXP' ? '#E0E0E0' : "" }} />}
                        readOnly={inBondHdr.exBondType !== 'EXP'}
                        selected={inBondHdr.exBondType === 'EXP' ? inBondHdr.sbDate : ""}
                        value={inBondHdr.sbDate}
                        onChange={handleNewBondingDate}
                        timeInputLabel="Time:"
                        dateFormat="dd/MM/yyyy HH:mm"
                        showTimeInput
                      />
                    </div>
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
            <lable style={{ fontSize: '14px' }} className="forlabel" for="transferBondNo">New Transfer Bond No</lable>
            <input
                type="text"
                name="transferBondNo"
                id="transferBondNo"
                maxLength={20}
                readOnly={inBondHdr.exBondType !== 'BTB'}
                style={{ backgroundColor: inBondHdr.exBondType !== 'BTB' ? '#E0E0E0' : "" }}
                value={inBondHdr.exBondType === 'BTB' ? inBondHdr.transferBondNo : ""}
                onChange={handleNocChange}
                className="form-control"
            />
        </FormGroup>
    </Col>
    <Col md={2}>
        <FormGroup>
            <lable style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">New Transfer Bond Date</lable>
<div style={{ position: "relative" }}>
<div>
                      <DatePicker
                       readOnly={inBondHdr.exBondType !== 'BTB'}
                       selected={inBondHdr.exBondType === 'BTB' ? inBondHdr.transferBondDate : ""}
       
       
                        id="transferBondDate"
                        name='transferBondDate'
                        wrapperClassName="custom-react-datepicker-wrapper"
                        className="form-control"
                        customInput={<input style={{ width: '100%', backgroundColor: inBondHdr.exBondType !== 'BTB' ? '#E0E0E0' : "" }} />}
                        onChange={handleNewTransferDate}
                        timeInputLabel="Time:"
                        dateFormat="dd/MM/yyyy HH:mm"
                        showTimeInput
                      />
                    </div>
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
            <lable style={{ fontSize: '14px' }} className="forlabel" for="sbQty">Old SB Quantity</lable>
            <input
                type="number"
                name="sbQty"
                id="sbQty"
                readOnly
                style={{ backgroundColor: '#E0E0E0' }}
                value={inBondHdr.exBondType === 'EXP' ? inBondHdr.sbQtyOld : ''}
                className="form-control"
            />
        </FormGroup>
    </Col>
    <Col md={2}>
        <FormGroup>
            <lable style={{ fontSize: '14px' }} className="forlabel" for="sbQtyNew">New SB Quantity</lable>
            <input
                type="number"
                name="sbQtyNew"
                id="sbQtyNew"
                readOnly={inBondHdr.exBondType !== 'EXP'}
                style={{ backgroundColor: inBondHdr.exBondType !== 'EXP' ? '#E0E0E0' : "" }}
                value={inBondHdr.exBondType === 'EXP' ? inBondHdr.sbQtyNew : ""}
                onChange={handleNocChange}
                className="form-control"
            />
        </FormGroup>
    </Col>
    <Col md={2}>
        <FormGroup>
            <lable style={{ fontSize: '14px' }} className="forlabel" for="sbValue">Old SB Value</lable>
            <input
                type="number"
                name="sbValue"
                id="sbValue"
                readOnly
                style={{ backgroundColor: '#E0E0E0' }}
                value={inBondHdr.exBondType === 'EXP' ? inBondHdr.sbValueOld : ''}
                className="form-control"
            />
        </FormGroup>
    </Col>
    <Col md={2}>
        <FormGroup>
            <lable style={{ fontSize: '14px' }} className="forlabel" for="sbValueNew">New SB Value</lable>
            <input
                type="number"
                name="sbValueNew"
                id="sbValueNew"
                readOnly={inBondHdr.exBondType !== 'EXP'}
                style={{ backgroundColor: inBondHdr.exBondType !== 'EXP' ? '#E0E0E0' : "" }}
                value={inBondHdr.exBondType === 'EXP' ? inBondHdr.sbValueNew : ""}
                onChange={handleNocChange}
                className="form-control"
            />
        </FormGroup>
    </Col>
    <Col md={2}>
        <FormGroup>
            <lable style={{ fontSize: '14px' }} className="forlabel" for="sbDuty">Old SB Duty</lable>
            <input
                type="number"
                name="sbDuty"
                id="sbDuty"
                readOnly
                style={{ backgroundColor: '#E0E0E0' }}
                value={inBondHdr.exBondType === 'EXP' ? inBondHdr.sbDutyOld : ''}
                className="form-control"
            />
        </FormGroup>
    </Col>
    <Col md={2}>
        <FormGroup>
            <lable style={{ fontSize: '14px' }} className="forlabel" for="sbDutyNew">New SB Duty</lable>
            <input
                type="number"
                name="sbDutyNew"
                id="sbDutyNew"
                readOnly={inBondHdr.exBondType !== 'EXP'}
                style={{ backgroundColor: inBondHdr.exBondType !== 'EXP' ? '#E0E0E0' : "" }}
                value={inBondHdr.exBondType === 'EXP' ? inBondHdr.sbDutyNew : ""}
                onChange={handleNocChange}
                className="form-control"
            />
        </FormGroup>
    </Col>
</Row>

<Row>
   <Col md={2}>
        <FormGroup>
            <Label style={{ fontSize: '14px' }} className="forlabel" for="section49Old">Old Section 49</Label><br />
            <input
                type="checkbox"
                name="section49Old"
                id="section49Old"
                readOnly
                style={{ height: 20, width: 20, backgroundColor: '#E0E0E0' }}
                value={inBondHdr.section49Old}
                checked={inBondHdr.section49Old === 'Y' ? true : false}
                // onChange={handleSectionChange}
                className="form-control"
            />
        </FormGroup>
    </Col>
     {/* <Col md={2}>
        <FormGroup>
            <Label style={{ fontSize: '14px' }} className="forlabel" for="exBondBeNo">New Section 49</Label><br />
            <input
                type="checkbox"
                name="section49"
                id="section49"
                style={{ height: 20, width: 20 }}
                value={inBondHdr.section49}
                checked={inBondHdr.section49 === 'Y' ? true : false}
                // onChange={handleSectionChange}
                className="form-control"
            />
        </FormGroup>
    </Col> */}
    <Col md={5}>
        <FormGroup>
            <Label style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">Importer Name</Label>
            <input
                type="text"
                name="exBondedGwOld"
                id="exBondedGwOld"
                readOnly
                style={{ backgroundColor: '#E0E0E0' }}
                value={inBondHdr.importerNameOld}
                onChange={handleNocChange}
                className="form-control"
            />
        </FormGroup>
    </Col>
    <Col md={5}>
        <FormGroup>
            <Label style={{ fontSize: '14px' }} className="forlabel" for="exBondBeNo">CHA Name</Label>
            <input
                type="text"
                name="chaOld"
                id="chaOld"
                readOnly
                style={{ backgroundColor: '#E0E0E0' }}
                value={chaName}
                onChange={handleNocChange}
                className="form-control"
            />
        </FormGroup>
    </Col>
</Row>
<Row>
    <Col md={2}>
        <FormGroup>
            <Label style={{ fontSize: '14px' }} className="forlabel" for="exBondBeNo">Old Exbond Packages</Label>
            <input
                type="number"
                name="exBondedPackagesOld"
                id="exBondedPackagesOld"
                readOnly
                style={{ backgroundColor: '#E0E0E0' }}
                value={inBondHdr.exBondedPackagesOld}
                //  onChange={handleExbondChange}
                className="form-control"
            />
        </FormGroup>
    </Col>
    <Col md={2}>
        <FormGroup>
            <Label style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">Old Exbond GW</Label>
            <input
                type="number"
                name="exBondedGwOld"
                id="exBondedGwOld"
                readOnly
                style={{ backgroundColor: '#E0E0E0' }}
                value={inBondHdr.exBondedGwOld}
                onChange={handleNocChange}
                className="form-control"
            />
        </FormGroup>
    </Col>
    <Col md={2}>
        <FormGroup>
            <Label style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">Old Exbond CIF</Label>
            <input
                type="number"
                name="exBondedCifOld"
                id="exBondedCifOld"
                readOnly
                style={{ backgroundColor: '#E0E0E0' }}
                value={inBondHdr.exBondedCifOld}
                onChange={handleNocChange}
                className="form-control"
            />
        </FormGroup>
    </Col>
    <Col md={3}>
        <FormGroup>
            <Label style={{ fontSize: '14px' }} className="forlabel" for="trnsferBondNo">Old Exbond Cargo Duty</Label>
            <input
                type="number"
                name="exBondedCargoDutyOld"
                id="exBondedCargoDutyOld"
                readOnly
                style={{ backgroundColor: '#E0E0E0' }}
                value={inBondHdr.exBondedCargoDutyOld}
                onChange={handleNocChange}
                className="form-control"
            />
        </FormGroup>
    </Col>
    <Col md={3}>
                                <Label style={{ fontSize: '14px' }} className="forlabel" for="exBondingId">Old Exbond Insurance</Label>
                                <input
                                    type="number"
                                    name="exBondedInsuranceOld"
                                    id="exBondedInsurance"
                                    readOnly
                                    style={{ backgroundColor: '#E0E0E0' }}
                                    value={inBondHdr.exBondedInsuranceOld}
                                    onChange={handleNocChange}
                                    className="form-control"
                                />
                            </Col>
</Row>

<Row>
    <Col md={2}>
        <FormGroup>
            <label style={{ fontSize: '14px' }} className="forlabel" htmlFor="exBondBeNo">New Exbond Packages</label>
            <input
                type="number"
                name="exBondedPackages"
                id="exBondedPackages"
                readOnly
                style={{ backgroundColor: '#E0E0E0' }}
                value={inBondHdr.exBondedPackages}
                onChange={handleNocChange}
                className="form-control"
            />
        </FormGroup>
    </Col>
    <Col md={2}>
        <FormGroup>
            <label style={{ fontSize: '14px' }} className="forlabel" htmlFor="exBondingId">New Exbond GW</label>
            <input
                type="number"
                name="exBondedGW"
                id="exBondedGW"
                readOnly
                style={{ backgroundColor: '#E0E0E0' }}
                value={inBondHdr.exBondedGw}
                onChange={handleNocChange}
                className="form-control"
            />
        </FormGroup>
    </Col>
    <Col md={2}>
        <FormGroup>
            <label style={{ fontSize: '14px' }} className="forlabel" htmlFor="exBondingId">New Exbond CIF</label>
            <input
                type="number"
                name="exBondedCif"
                id="exBondedCif"
                readOnly
                style={{ backgroundColor: '#E0E0E0' }}
                value={inBondHdr.exBondedCif}
                onChange={handleNocChange}
                className="form-control"
            />
        </FormGroup>
    </Col>
    <Col md={3}>
        <FormGroup>
            <label style={{ fontSize: '14px' }} className="forlabel" htmlFor="trnsferBondNo">New Exbond Cargo Duty</label>
            <input
                type="number"
                name="exBondedCargoDuty"
                id="exBondedCargoDuty"
                readOnly
                style={{ backgroundColor: '#E0E0E0' }}
                value={inBondHdr.exBondedCargoDuty}
                onChange={handleNocChange}
                className="form-control"
            />
        </FormGroup>
    </Col>
    <Col md={3}>
        <FormGroup>
            <label style={{ fontSize: '14px' }} className="forlabel" htmlFor="exBondingId">New Exbond Insurance</label>
            <input
                type="number"
                name="exBondedInsurance"
                id="exBondedInsurance"
                readOnly
                style={{ backgroundColor: '#E0E0E0' }}
                value={inBondHdr.exBondedInsurance}
                onChange={handleNocChange}
                className="form-control"
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
                  onClick={handleSubmit}
                >
                  <FontAwesomeIcon
                    icon={faSave}
                    style={{ marginRight: "5px" }}
                  />
                  Submit
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
                       disabled={isDataFetched} 
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
                     Old Gross Weight
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Old CIF Value
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                     Old Cargo Value
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                    Old Insurance Value
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Old Bond PKG
                    </th>

                    {/* <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                     Old Area Occupied
                    </th> */}
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                    Old Yard PKG <span className="error-message">*</span>
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      New Ex Bond PKG <span className="error-message">*</span>
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                     Location
                    </th>

                    {/* <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                     New Area Occupied
                    </th> */}
                   
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                     New Yard PKG <span className="error-message">*</span>
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      New Cell Area Allocated <span className="error-message">*</span>
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      New Ex Bond Weight
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      New Ex Bond CIF <span className="error-message">*</span>
                    </th>

                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                     New Ex Bond Duty <span className="error-message">*</span>
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                     New Ex Bond Insurance
                    </th>

                    {/* <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                     New Shortage Package
                    </th>

                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                     New Damaged Package
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                    New Breakage Package
                    </th> */}
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
                          checked={
                            (dtl.srNo !== undefined && dtl.srNo !== null) ||
                            selectedRows.some((selectedRow) =>
                              dtl.srNo
                                ? // If srNo exists, use commodityId
                                  selectedRow.nocTransId === dtl.nocTransId &&
                                  selectedRow.nocNo === dtl.nocNo &&
                                  selectedRow.commodityId === dtl.commodityId
                                : // Otherwise, use cfBondDtlId
                                  selectedRow.nocTransId === dtl.nocTransId &&
                                  selectedRow.nocNo === dtl.nocNo &&
                                  selectedRow.cfBondDtlId === dtl.cfBondDtlId
                            )
                          }
                          disabled={isDataFetched} 
                          // onChange={(e) => handleCheckboxChangeForDtl(e, dtl)}
                          onChange={(e) => handleCheckboxChangeForDtl(e, dtl)}
                        />
                      </td>
                      <th scope="row">{index + 1}</th>
                      <td>{inputValues[index]?.oldCommodityDescription}</td>
                      <td>{inputValues[index]?.oldTypeOfPackage}</td>
                      
                      <td>{inputValues[index]?.oldBondGrossWt}</td>
                      <td>{inputValues[index]?.oldBondCifValue}</td>
                      <td>{inputValues[index]?.oldBondCargoDuty}</td>
                      <td>{inputValues[index]?.oldInsuranceValue}</td>
                      <td>{inputValues[index]?.oldBondPackages}</td>
                      {/* <td>{inputValues[index]?.oldAreaOccupied}</td> */}
                      <td>{inputValues[index]?.oldYardPackages}</td>
                      <td style={{ textAlign: "center" }}>
                        <input
                          className="form-control"
                          style={{ width: "180px" }}
                          type="text"
                          value={inputValues[index]?.newBondPackages}
                          placeholder="Enter PKGS"
                          onChange={(e) => {
                            // Only allow numbers and decimal point
                            const regex = /^[0-9]*\.?[0-9]*$/;
                            if (regex.test(e.target.value)) {
                              handleInputChangeFotDtl(e, "newBondPackages", index);
                            }
                          }}
                          onPaste={(e) => {
                            // Prevent paste if it includes non-numeric characters
                            const pastedData = e.clipboardData.getData("text");
                            if (!/^[0-9]*\.?[0-9]*$/.test(pastedData)) {
                              e.preventDefault();
                            }
                          }}
                        />
                         
                        {inputValues[index]?.errorMessage &&
                          inputValues[index]?.errorMessage.includes(
                            "New In Bond Packages"
                          ) && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                              {inputValues[index]?.errorMessage}
                            </span>
                          )}
                      </td>
                      <td>{`${inputValues[index]?.yardLocationId}-${inputValues[index]?.blockId}-${inputValues[index]?.cellNoRow}`}</td>
{/* <td style={{ textAlign: "center" }}>
                        <input
                          className="form-control"
                          type="text"
                          value={inputValues[index]?.newAreaOccupied}
                          // onChange={(e) =>
                          //   handleInputChangeFotDtl(
                          //     e,
                          //     "newAreaOccupied",
                          //     index
                          //   )
                          // }
                          onChange={(e) => {
                            const regex = /^[0-9]*\.?[0-9]*$/;
                            if (regex.test(e.target.value)) {
                              handleInputChangeFotDtl(e, "newAreaOccupied", index);
                            }
                          }}
                          onPaste={(e) => {
                            const pastedData = e.clipboardData.getData("text");
                            if (!/^[0-9]*\.?[0-9]*$/.test(pastedData)) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </td> */}
                   

                      <td style={{ textAlign: "center" }}>
                        <input
                          className="form-control"
                          style={{ width: "180px" }}
                          type="text"
                          value={inputValues[index]?.newYardPackages}
                          placeholder="Enter Yard PKGS"
                          // onChange={(e) => {
                          //   handleInputChangeFotDtl(e, "newYardPackages", index);
                            
                          // }}
                          onChange={(e) => {
                            // Only allow numbers and decimal points
                            const regex = /^[0-9]*\.?[0-9]*$/;
                            if (regex.test(e.target.value)) {
                              handleInputChangeFotDtl(e, "newYardPackages", index);
                            }
                          }}
                          onPaste={(e) => {
                            // Prevent paste if it includes non-numeric characters
                            const pastedData = e.clipboardData.getData("text");
                            if (!/^[0-9]*\.?[0-9]*$/.test(pastedData)) {
                              e.preventDefault();
                            }
                          }}
                        />
                         
                        {inputValues[index]?.errorMessage &&
                          inputValues[index]?.errorMessage.includes(
                            "New Yard Bond Packages"
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
                          // onChange={(e) =>
                          //   handleInputChangeFotDtl(
                          //     e,
                          //     "cellAreaAllocated",
                          //     index
                          //   )
                          // }
                          onChange={(e) => {
                            const regex = /^[0-9]*\.?[0-9]*$/;
                            if (regex.test(e.target.value)) {
                              handleInputChangeFotDtl(e, "cellAreaAllocated", index,13,3);
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
                          type="number"
                          readOnly
                          style={{ backgroundColor: "#E0E0E0", width: "180px"  }}
                          value={inputValues[index]?.newBondGrossWt}
                          onChange={(e) =>
                            handleInputChangeFotDtl(e, "newBondGrossWt", index,13,3)
                          }
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <input
                          className="form-control"
                         
                          type="number"
                          readOnly
                          style={{ backgroundColor: "#E0E0E0", width: "180px"  }}
                          value={inputValues[index]?.newBondCifValue}
                          placeholder="Enter CIF value"
                          onChange={(e) =>
                            handleInputChangeFotDtl(e, "newBondCifValue", index,13,3)
                          }
                        />
                        {inputValues[index]?.errorMessage &&
                          inputValues[index]?.errorMessage.includes(
                            "New CIF Value"
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
                          value={inputValues[index]?.newBondCargoDuty}
                          placeholder="Enter Cargo Duty"
                          readOnly
                          style={{ backgroundColor: "#E0E0E0", width: "180px"  }}
                          onChange={(e) =>
                            handleInputChangeFotDtl(e, "newBondCargoDuty", index,13,3)
                          }
                        />
                        {inputValues[index]?.errorMessage &&
                          inputValues[index]?.errorMessage.includes(
                            "New Cargo Duty"
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
                          value={inputValues[index]?.newInsuranceValue}
                          readOnly
                          style={{ backgroundColor: "#E0E0E0" }}
                          onChange={(e) =>
                            handleInputChangeFotDtl(
                              e,
                              "newInsuranceValue",
                              index,13,3
                            )
                          }
                        />
                      </td>

                      {/* <td style={{ textAlign: "center" }}>
                        <input
                          className="form-control"
                          style={{ width: "180px" }}
                          type="text"
                          value={inputValues[index]?.newShortagePackages || 0}
                          placeholder="Enter Shortage"
                          onChange={(e) =>
                            handleInputChangeFotDtl(
                              e,
                              "newShortagePackages",
                              index
                            )
                          }
                          onKeyPress={(e) => {
                            if (!/[0-9.]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          onPaste={(e) => {
                            const pasteData = e.clipboardData.getData("Text");
                            if (!/^[0-9.]*$/.test(pasteData)) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </td>

                      <td style={{ textAlign: "center" }}>
                        <input
                          className="form-control"
                          style={{ width: "180px" }}
                          type="text"
                          value={inputValues[index]?.newDamagedQty || 0}
                          placeholder="Enter Damaged"

                          onChange={(e) =>
                            handleInputChangeFotDtl(e, "newDamagedQty", index)
                          }
                          onKeyPress={(e) => {
                            if (!/[0-9.]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          onPaste={(e) => {
                            const pasteData = e.clipboardData.getData("Text");
                            if (!/^[0-9.]*$/.test(pasteData)) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <input
                          className="form-control"
                          type="text"
                          value={inputValues[index]?.newBreakage || 0}
                          placeholder="Enter breakage"
                          onChange={(e) =>
                            handleInputChangeFotDtl(e, "newBreakage", index)
                          }
                          onKeyPress={(e) => {
                            if (!/[0-9.]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          onPaste={(e) => {
                            const pasteData = e.clipboardData.getData("Text");
                            if (!/^[0-9.]*$/.test(pasteData)) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </td> */}
                      <td style={{ textAlign: "center" }}>
                      <button
                                    className="btn btn-outline-primary btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    onClick={() => {
                                      if (inBondHdr.status ==="N" ||inBondHdr.status ==="A" ) 
                                      {
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

export default ExBondAuditTrail;
