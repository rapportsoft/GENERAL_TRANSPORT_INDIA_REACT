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

function InBondAuditTrail() {
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
            type: "INBOND",
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
    exBondedCIF: 0,
    exBondedCIFOld: 0,
    remainingCIF: 0,
    remainingCIFOld: 0,
    balanceCIF: 0,
    balanceCIFOld: 0,
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
    inBondingId:'',
    boeDate:null,
    boeDateOld: null,
    igmNo: '',
    igmDate: null,
    igmLineNo: '',
    section49: 'N',
    section49Old: 'N',
    section60: 'N',
    section60Old: 'N',
    bondValidityDate: null,
    bondValidityDateOld: null,
    importerAddress1: '',
    importerAddress2: '',
    importerAddress3: '',
    tranType: 'INBOND',
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
        `${ipaddress}api/cfexbondcrgEditController/search?companyId=${companyid}&branchId=${branchId}&partyName=${id}`,
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
    inbondingId,
    nocNo,
    auditId
  ) => {
    closeIGMSearchModal();
    axios
      .get(
        `${ipaddress}api/cfexbondcrgEditController/getDataByTransIdANDNocIDAndInBondingId?companyId=${companyid}&branchId=${branchId}&SrNo=${SrNo}&nocTransID=${trasid}&inBondingId=${inbondingId}&nocNo=${nocNo}&auditId=${auditId}`,
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
        setChaName(response.data.newChaName)

        // setChaName(response.data.commodityDescription);
        setBondingErrors((prevErrors) => ({
          ...prevErrors,
          cha: "",
        }));

        fetchDataAfterSave(
          companyid,
          branchId,
          response.data.inBondingId,
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

  console.log("inBondHdr____________",inBondHdr);
  const handleNocChange = (e) =>
  {
    const { name, value } = e.target;

    // setInBondHdr((prevNOC) => {
    //   const updatedNOC = {
    //     ...prevNOC,
    //     [name]: value,
    //   };

    // });
setInBondHdr((prev)=> ({
...prev,
[name]:value,
}))

    document.getElementById(name).classList.remove("error-border");
    setBondingErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };



  

  const handleDate1Change = (date) => {
    setInBondHdr((prevNoc) => ({
      ...prevNoc,
      boeDate: date,
     
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
      bondingDate: date,
      bondValidityDate: date ? new Date(date.getTime() + 364 * 24 * 60 * 60 * 1000) : null,
    }));
    // document.getElementById("bondingDate").classList.remove("error-border");
    // setBondingErrors((prevErrors) => ({
    //   ...prevErrors,
    //   bondingDate: "",
    // }));
  };

  const [selectedRows, setSelectedRows] = useState([]);

  const [inputValues, setInputValues] = useState([]);
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

  
  // const remainingArea = inBond.areaAllocated;
  // if (totalAreaOccupied > remainingArea) 
  // {
  //   toast.error(
  //     `Total Area Occupied (${totalAreaOccupied}) exceeds available area (${remainingArea}).`,
  //     {
  //       // ... (toast options)
  //     }
  //   );
  //   setLoading(false);
  //   isValid = false;
  // }
      // Check for required fields
      // if (!values.cellAreaAllocated) {
      //   errorMessage = "Cell Area Allocated is required";
      //   toast.error("Cell Area Allocated is required.", {
      //     // ... (toast options)
      //   });
      //   setLoading(false);
      //   isValid = false;
      // }
      // if (!values.newBondPackages) 
      // {
      //   errorMessage = "New In Bond Packages is required";
      //   toast.error("New In Bond Packages is required.", {
      //     // ... (toast options)
      //   });
      //   setLoading(false);
      //   isValid = false;
      // } else 
      if (parseFloat(values.newBondPackages) > dtl.gateInPackages) 
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

      // if (!values.newYardPackages) 
      // {
      //   errorMessage = "New Yard Bond Packages is required";
      //   toast.error("New Yard Bond Packages is required.", {
      //     // ... (toast options)
      //   });
      //   setLoading(false);
      //   isValid = false;
      // } else
       if (parseFloat(values.inBondedPackages) > dtl.gateInPackages) {
        errorMessage =
          "New Yard Bond Packages should not be greater than NOC Packages";
        toast.error(
          "New Yard Bond Packages should not be greater than NOC Packages.",
          {
            // ... (toast options)
          }
        );
        setLoading(false);
        isValid = false;
      }

      // if (!values.newBondCifValue) {
      //   errorMessage = "New In Bond CIF Value is required";
      //   toast.error("New In Bond CIF Value is required.", {
      //     // ... (toast options)
      //   });
      //   setLoading(false);
      //   isValid = false;
      // } else
       if (parseFloat(values.newBondCifValue) > dtl.cifValue) {
        errorMessage = "New In Bond CIF Value should not be greater than CIF Value";
        toast.error("New In Bond CIF Value should not be greater than CIF Value.", {
          // ... (toast options)
        });
        setLoading(false);
        isValid = false;
      }

      // if (!values.newBondCargoDuty) 
      // {
      //   errorMessage = "New In Bond Cargo Duty is required";
      //   toast.error("New In Bond Cargo Duty is required.", {
      //     // ... (toast options)
      //   });
      //   setLoading(false);
      //   isValid = false;
      // } 
      // else 
      if (parseFloat(values.newBondCargoDuty) > dtl.cargoDuty) 
      {
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
          `${ipaddress}api/cfexbondcrgEditController/saveDataOfCfInbondCrgEditAuditTrail?companyId=${companyid}&branchId=${branchId}&user=${userId}&flag=${inbondFlag}`,
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
            response.data.inBondingId,
            response.data.nocTransId,
            response.data.auditId,
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
      `${ipaddress}api/cfexbondcrgEditController/approve?companyId=${companyid}&branchId=${branchId}&user=${userId}&flag=${inbondFlag}`,
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
          status: 'A',
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
        inBondedPackages:handleInputChangeNew(totalInBondedPackages,13,3),
        inBondedCif:handleInputChangeNew(totalCif,13,3),
        inBondedCargoDuty: handleInputChangeNew(totalCargo,13,3),
        inBondedInsurance: handleInputChangeNew(totalInsuranceVal,13,3),
        inBondedGw:handleInputChangeNew(totalGrossWeight,13,3)
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
    setImpId('');
    setImpName('');
    setIsoName('');
    setInBondFlag("add");
    setChaName("");
    setCHASearchedData([]);
    setSelectAll(false);
    setIsDataFetched(false);
  };
  const [cfbondnocDtl, setCfbondnocDtl] = useState([]);


const fetchData = async (companyid, branchId,inBondingId, nocTransId)=>
{
  axios.get( `${ipaddress}api/cfexbondcrgEditController/getFormCfInBondCrgDtl?companyId=${companyid}&branchId=${branchId}&inBondingId=${inBondingId}&nocTransId=${nocTransId}`,
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
  cellAreaAllocated:mnr.cellAreaAllocated,
  cellNoRow:mnr.cellNoRow,
  grossWeight:mnr.grossWeight,
  commonBondingId:mnr.inBondingId,
  commodityId:mnr.cfBondDtlId,
  oldYardPackages:mnr.yardPackages,
  oldAreaOccupied:mnr.areaOccupied,
  oldCommodityDescription :mnr.commodityDescription,
  oldTypeOfPackage:mnr.typeOfPackage,
  oldBondPackages: (mnr.inBondedPackages),
  oldBondCargoDuty: handleInputChangeNew((mnr.inbondCargoDuty),13,3),
  oldBondCifValue: handleInputChangeNew((mnr.inbondCifValue ),13,3),
  oldInsuranceValue: handleInputChangeNew((
    (mnr.inbondCargoDuty) +
    (mnr.inbondCifValue)
  ),13,3),
  oldShortagePackages:mnr.shortagePackages || 0,
  oldDamagedQty:mnr.damagedQty || 0,
  oldBreakage:mnr.breakage || 0,
  editedBy: `${mnr.yardLocationId || ''}-${mnr.blockId || ''}-${mnr.cellNoRow || ''}` || '',
  oldBondGrossWt:handleInputChangeNew(mnr.inbondGrossWt || 0,13,3),
})));
  }).catch((error)=>{
console.log("error",error);
  })
}

  const fetchDataAfterSave = async (companyid, branchId,inBondingId, nocTransId,auditId) => {
    try {
      const response = await fetch(
        `${ipaddress}api/cfexbondcrgEditController/findByCompanyIdAndBranchIdAndCommonBondingIdAndNocTransId?companyId=${companyid}&branchId=${branchId}&inBondingId=${inBondingId}&nocTransId=${nocTransId}&auditId=${auditId}`,
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
    oldBondCargoDuty: handleInputChangeNew((mnr.oldBondCargoDuty),13,3),
    oldBondCifValue: handleInputChangeNew((mnr.oldBondCifValue ),13,3),
    oldInsuranceValue: handleInputChangeNew((
      (mnr.oldBondCargoDuty) +
      (mnr.oldBondCifValue)
    ),13,3),
    oldShortagePackages:mnr.oldShortagePackages || 0,
    oldDamagedQty:mnr.oldDamagedQty || 0,
    oldBreakage:mnr.oldBreakage || 0,
    oldBondGrossWt: mnr.oldBondGrossWt || 0,

    newBondedPackages:mnr.newBondedPackages || 0,
    newAreaOccupied:mnr.newAreaOccupied|| 0,

    newBondCargoDuty: handleInputChangeNew((mnr.newBondCargoDuty),13,3),
    newBondCifValue: handleInputChangeNew((mnr.newBondCifValue ),13,3),
    newInsuranceValue: handleInputChangeNew((
      (mnr.newBondCargoDuty) +
      (mnr.newBondCifValue)
    ),13,3),
    newShortagePackages:mnr.newShortagePackages || 0,
    newDamagedQty:mnr.newDamagedQty || 0,
    newBreakage:mnr.newBreakage || 0,
    newBondGrossWt: handleInputChangeNew(mnr.newBondGrossWt || 0,13,3),
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
            const pernewAreaOccupied = dtl.areaOccupied / dtl.inBondedPackages;
            updatedValues[index].newAreaOccupied = (
              pernewAreaOccupied * parseFloat(newValue)
            ).toFixed(2);

            
     
  const area = inBond.areaAllocated / newTotalPackages;
      updatedValues[index].areaOccupied = (
        area * parseFloat(newValue)
      ).toFixed(2);
    

  // Calculate exBondedCIF and exBondedCargoDuty using the newly input value
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
      addition=dtl.gateInPackages;
    }else
    {
      // addition=dtl.gateInPackages - dtl.inBondedPackages;
      addition=dtl.gateInPackages;
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
       if (fieldName === "newBondCifValue" && parseFloat(newValue) > dtl.cifValue) {
        errorMessage = "New In Bond CIF Value should not be greater than CIF Value";
      }

      // Validation for inbondCargoDuty
       if (fieldName === "newBondCargoDuty" && parseFloat(newValue) > dtl.cargoDuty) {
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
    const openYardModal = (dtl) => {
      setIsModalOpenForYard(true);
        setModalData(dtl);

console.log("dtl_______________________",dtl);

        setModalDataInput((pre) =>({
          ...pre,
          // inBondPackages :(inputValues[index].newBondPackages),
          commodityDescription : dtl.newCommodityDescription || dtl.commodityDescription ,
          cfBondDtlId :dtl.commodityId  || dtl.cfBondDtlId,
          nocNo:dtl.nocNo,
          gateInPackages :dtl.gateInPackages,
          inBondingId:inBondHdr.inBondingId,
          nocTransId:dtl.nocTransId,
        }))

        fetchSumOfInBondPackages(inBondHdr.inBondingId,dtl.commodityId,dtl.nocTransId,inBondHdr.auditId);

        console.log("*************************************************************************************************************************");
        console.log(dtl.commodityId);
        console.log(inBondHdr.inBondingId);

    handleGridData(inBondHdr.inBondingId,dtl.commodityId);
        getYardData('');
    }

    const fetchSumOfInBondPackages = async (inBondingId, cfBondDtlId, nocTransId,auditId) => {
      axios.get(`${ipaddress}api/cfexbondcrgEditController/sum?companyId=${companyid}&branchId=${branchId}&inBondingId=${inBondingId}&cfBondDtlId=${cfBondDtlId}&nocTransId=${nocTransId}&auditId=${auditId}`,{
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
        toast.error(errorMsg); // Display error toast
        return; // Exit the function to prevent saving
      }
    
      // Validate total packages
      const newTotalPackages = rows.reduce(
        (sum, row) => sum + (parseFloat(row.inBondPackages) || 0),
        0
      );
    
      console.log("newTotalPackages_____________________",newTotalPackages);

      console.log("newTotalPackages  modalDataInput.oldInbondPkgs_____________________", modalDataInput.oldInbondPkgs);
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
        chaCode: '',
        chaOld: '',
        nocTransId: '',
        nocNo: '',
        igmLineNo: '',
        nocTransDate: '',
        nocDate: '',
        igmNo: '',
        igmDate: '',
        boeDateOld: '',
        importerIdOld: '',
        importerNameOld: '',
        nocPackages: '',
        inBondedCifOld:'',
        inBondedCargoDutyOld:'',
        inBondedGwOld:'',
        inBondedInsuranceOld:'',
        inBondedPackagesOld:'',
        grossWeight: '',
        insuranceValue: '',
        cifValue: '',
        cargoDuty: '',
        nocValidityDate: '',
        nocFromDate: '',
        gateInPackages: '',
        bondingNoOld:'',
        bondingDateOld:'',
        bondValidityDateOld:'',
        inBondingId:'',
        inBondingDate:'',
      }));
      
      document.getElementById('boeNoOld').classList.remove('error-border');
      setBondingErrors((prevErrors) => ({
          ...prevErrors,
          ['boeNoOld']: "",
      }));
  }
  else {
      console.log("respone datacagahgdhsagdhs",selectedOption);

      const exBondedPackages = selectedOption?.exBondedPackages || '';

      if (exBondedPackages > 0 ) {
        toast.error("Can not update inbond ex-bond is done.", {
          position: 'top-center',
          autoClose: 999,
        });
        return;
      }

      setInBondHdr((prev) => ({
        ...prev,
        boeNoOld: selectedOption ? selectedOption.boeNo : '',
      }));
      
      setIsoName(selectedOption ? selectedOption.label : '');
      
      setInBondHdr((pri) => ({
        ...pri,
        boeNoOld:selectedOption ? selectedOption.boeNo : '',
        chaCode: selectedOption?.chaCode,               // Use selectedOption for values
        chaOld: selectedOption?.cha,
        nocTransId: selectedOption?.nocTransId,
        nocNo: selectedOption?.nocNo,
        igmLineNo: selectedOption?.igmLineNo,
        nocTransDate: selectedOption?.nocTransDate,
        nocDate: selectedOption?.nocDate,
        igmNo: selectedOption?.igmNo,
        igmDate: selectedOption?.igmDate,                 // Assuming `selectedOption.value` holds `boeNo`
        boeDateOld: selectedOption?.boeDate,
        importerAddress1: selectedOption?.importerAddress1,
        importerAddress2: selectedOption?.importerAddress2,
        importerAddress3: selectedOption?.importerAddress3,
        importerIdOld: selectedOption?.importerId,
        importerNameOld: selectedOption?.importerName,
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
        bondingNoOld:selectedOption?.bondingNo,
        bondingDateOld:selectedOption?.bondingDate,
                bondValidityDateOld:selectedOption?.bovaldate,
                inBondingId:selectedOption?.inBondingId,
                inBondingDate:selectedOption?.inBondingDate,  
                
                inBondedCifOld:selectedOption?.inBondedCifOld,
                inBondedCargoDutyOld:selectedOption?.inBondedCargoDutyOld,
                inBondedGwOld:selectedOption?.inBondedGwOld,
                inBondedInsuranceOld:selectedOption?.inBondedInsuranceOld,
                inBondedPackagesOld:selectedOption?.inBondedPackagesOld,
      }));
      setChaName(selectedOption?.chaName)
      handleYardLocationData();
     
      console.log("  selectedOption?.inBondingId,",  selectedOption?.inBondingId);
      console.log("  selectedOption?.nocTransId,",  selectedOption?.nocTransId);

      fetchData(
        companyid,
        branchId,
        selectedOption?.inBondingId,
        selectedOption?.nocTransId,
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

  axios.get( `${ipaddress}api/cfexbondcrgEditController/getBoeNoData?companyId=${companyid}&branchId=${branchId}&boeNo=${val}`, {
      headers: {
          Authorization: `Bearer ${jwtToken}`
      }
  })
      .then((response) => {
          const data = response.data;
          const portOptions = data.map(port => ({
            value: port.boeNo +' '+port.inBondingId,
            label: `${port.boeNo}-${port.inBondingId}`,

            chaCode: port.chaCode,               // Now getting values from port
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
            chaName:port.chaName,
            bondingNo:port.bondingNo,
            bondingDate:port.bondingDate,
            bovaldate:port.bondValidityDate,
            inBondingId:port.inBondingId,
            inBondingDate:port.inBondingDate,
            exBondedPackages:port.exBondedPackages,

            inBondedCifOld:port.cifValue,
            inBondedCargoDutyOld:port.cargoDuty,
            inBondedGwOld:port.inbondGrossWt,
            inBondedInsuranceOld:port.inbondInsuranceValue,
            inBondedPackagesOld:port.inBondedPackages,
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

          console.log("response.data",data);
          const portOptions = data.map(port => ({
              value: port.partyId,
              label: `${ port.partyName}-${port.address1},${port.address1},${port.address3}`,
              drop: port.partyName,
              ccode:port.customerCode,
              bWeek:port.bondnocWeek,
              cName:port.partyName,
          }))
          setISOData(portOptions);
      })
      .catch((error) => {

      })
}

const [impName, setImpName] = useState("");
const [impData, setImpData] = useState([]);
const handleImporterChange = async (selectedOption, { action }) => {

  if (action === 'clear') {
    setImpName('');
      console.log("respone datacagahgdhsagdhs",selectedOption);
      setInBondHdr((pre)=>({
          ...pre,
          importerId:'',
          importerName:'',
          importerAddress1: '',
          importerAddress2:'',
          importerAddress3:'',
  }));
              setImpId('');
  }
  else {
      console.log("respone datacagahgdhsagdhs",selectedOption);
      setImpId(selectedOption ? selectedOption.value : '');
      setImpName(selectedOption ? selectedOption.impN : '');

      setInBondHdr((noc)=>({
        ...noc,
        importerId:selectedOption ? selectedOption.value : '',
        importerName:selectedOption ? selectedOption.impN : '',
        importerAddress1:selectedOption ? selectedOption.ad1 : '',
        importerAddress2:selectedOption ? selectedOption.ad2 : '',
        importerAddress3:selectedOption ? selectedOption.ad3 : '',
                      }));

                      console.log('EFUWEARFHFJAHJFJHDSDHFGKESFSDGFDSGFHSDGFHSDGFSGDFJDSHFSDFJKGSFKJSEHGF',inBondHdr);
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

          console.log("response.data",data);
          const portOptions = data.map(port => ({ 
              value: port.partyId,
              label: `${port.partyName}-${port.address1}-${port.address2}-${port.address3}`,
              impN:port.partyName,
              ad1:port.address1,
              ad2:port.address2,
              ad3:port.address3,
          }))
          setImpData(portOptions);
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
                            <th scope="col">Audit Trail Id</th>
                            <th scope="col">In Bonding Date</th>
                            <th scope="col">NOC Trans Id</th>

                            <th scope="col">NOC No </th>
                            <th scope="col">Old BE No</th>
                            <th scope="col">New BE No</th>
                            <th scope="col">Old Bond No</th>
                            <th scope="col">New Bond No</th>
                            <th scope="col">Old Bond Date</th>
                            <th scope="col">New Bond Date</th>
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
                                      item.srNo,
                                      item.nocTransId,
                                      item.inBondingId,
                                      item.nocNo,
                                      item.auditId
                                      
                                    )
                                  }
                                  value={item[0]}
                                />
                              </td>
                              <td>{item.inBondingId}</td>
                              <td>{item.auditId}</td>
                              <td>{item.inBondingDate ? format( new Date(item.inBondingDate) ,'dd/MM/yyyy HH:mm') : null}</td>
                              <td>{item.nocTransId}</td>
                              <td>{item.nocNo}</td>
                              <td>{item.boeNoOld}</td>
                              <td>{item.boeNo}</td>
                              <td>{item.bondingNoOld}</td>
                              <td>{item.bondingNo}</td>
                              <td>{item.bondingDateOld ? format(new Date(item.bondingDateOld),"dd/MM/yyyy") : ''}</td>
                              <td>{item.bondingDate ? format(new Date(item.bondingDate),"dd/mm/yyyy") :''}</td>
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

              {/* <Col md ={2}>
  <Row>

    <Col md={8}>
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
</Col> */}
       <Col md={2}>
        <Row>
          <Col md={8}>
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
                      value={inBondHdr?.inBondingId}
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
                    <label className="forlabel bold-label" htmlFor="inBondingDate">
                    In Bonding Date
                    </label>
                    <div style={{ position: "relative" }}>
                      <DatePicker
                        selected={inBondHdr.inBondingDate}
                        // onChange={handleNocValidityDateChnage}
                        id="inBondingDate"
                        name="inBondingDate"
                        readOnly
                        style={{ backgroundColor: "#E0E0E0" }}
                        dateFormat="dd/MM/yyyy"
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: "100%",backgroundColor: "#E0E0E0" }} />}
                        wrapperClassName="custom-react-datepicker-wrapper"
                        minDate={getMinDate(inBondHdr.inBondingDate)}
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
                                <label className="forlabel bold-label" htmlFor="boeNoOld">
                                    BOE NO
                                </label>
                                <Select
                                    value={{ value: inBondHdr.boeNoOld, label: inBondHdr.boeNoOld }}
                                    onChange={handleBoeChange}
                                    onInputChange={getBoeData}
                                    options={boeData}
                                    placeholder="Select Boe No"
                                    isClearable
                                    id="boeNoOld"
                                    vesselName="boeNoOld"

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

{(inBondHdr.srNo !== undefined && inBondHdr.srNo !== null ) ? (
                    <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="boeNoOld">
                      BOE NO
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="boeNoOld"
                      maxLength={15}
                      name="boeNoOld"
                      value={inBondHdr.boeNoOld}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                    <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.boeNoOld}
                    </div>
                  </FormGroup>

                </Col>
                 )
                 :(
                  <Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="boeNoOld">
                                    BOE NO
                                </label>
                                <Select
                                    value={{ value: inBondHdr.boeNoOld, label: isoName }}
                                    onChange={handleBoeChange}
                                    onInputChange={getBoeData}
                                    options={boeData}
                                    placeholder="Select Boe No"
                                    isClearable
                                    id="boeNoOld"
                                    vesselName="boeNoOld"

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
                    <label className="forlabel bold-label" htmlFor="boeDateOld">
                      BE Date
                    </label>
                    <div style={{ position: "relative" }}>
                      <DatePicker
                        selected={inBondHdr.boeDateOld}
                        // onChange={handleNocValidityDateChnage}
                        id="boeDateOld"
                        name="boeDateOld"
                        readOnly
                        style={{ backgroundColor: "#E0E0E0" }}
                        dateFormat="dd/MM/yyyy"
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: "100%",backgroundColor: "#E0E0E0" }} />}
                        wrapperClassName="custom-react-datepicker-wrapper"
                        minDate={getMinDate(inBondHdr.boeDateOld)}
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
                    <label className="forlabel bold-label" htmlFor="igmNo">
                      IGM No
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="igmNo"
                      maxLength={15}
                      name="igmNo"
                      value={inBondHdr.igmNo}
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
                      value={inBondHdr.status === "A" ? "Approved" :inBondHdr.status === "N" ? "New": ""}
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
                      value={inBondHdr.nocNo}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
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
                        selected={inBondHdr.nocTransDate}
                        id="nocTransDate"
                        name="nocTransDate"
                        dateFormat="dd/MM/yyyy HH:mm"
                        showTimeSelect
                        value={inBondHdr.nocTransDate}
                        readOnly
                       
                        timeFormat="HH:mm"
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: "100%", backgroundColor: "#E0E0E0" }} />}
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
                      htmlFor="nocValidityDate"
                    >
                      NOC Validity Date
                    </label>
                    <div style={{ position: "relative" }}>
                      <DatePicker
                        selected={inBondHdr.nocValidityDate}
                        onChange={(date) => {
                          setInBondHdr((prevNoc) => ({
                            ...prevNoc,
                            nocValidityDate: date,
                          }));
                        }}
                        //   onChange={handleDocDate}
                        id="nocValidityDate"
                        name="nocValidityDate"
                        dateFormat="dd/MM/yyyy"
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: "100%", backgroundColor: "#E0E0E0"  }} />}
                        wrapperClassName="custom-react-datepicker-wrapper"
                        readOnly

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
                      value={inBondHdr.igmLineNo}
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
                        selected={inBondHdr.igmDate}
                        // onChange={handleNocValidityDateChnage}
                        id="igmDate"
                        name="igmDate"
                        dateFormat="dd/MM/yyyy"
                        readOnly
                        style={{ backgroundColor: "#E0E0E0" }}
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: "100%" , backgroundColor: "#E0E0E0"}} />}
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
                      value={inBondHdr.createdBy}
                    />
                  </FormGroup>
                </Col>
             
              </Row>

           
              <Row>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="bondingNoOld"
                    >
                      BOND No <span className="error-message">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="bondingNoOld"
                      maxLength={15}
                      name="bondingNoOld"
                      style={{ backgroundColor: "#E0E0E0" }}
                      readOnly
                      value={inBondHdr.bondingNoOld}
                      onChange={handleNocChange}
                    />
                    <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.bondingNoOld}
                    </div>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="bondingDateOld"
                    >
                      Bond Date <span className="error-message">*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <DatePicker
                        selected={inBondHdr.bondingDateOld}
                        // onChange={handleNocValidityDateChnage}
                        id="bondingDateOld"
                        name="bondingDateOld"
                        value={inBondHdr.bondingDateOld}
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
                    <div style={{ color: "red" }} className="error-message">
                      {bondingErrors.bondingDateOld}
                    </div>
                  </FormGroup>
                </Col>

                <Col md={2}>
        <FormGroup>
          <label className="forlabel bold-label" htmlFor="bondValidityDateOld">
            Bonding Validity Date
          </label>
          <div style={{ position: 'relative' }}>
            <DatePicker
              selected={inBondHdr.bondValidityDateOld}
              id="bondValidityDateOld"
              name="bondValidityDateOld"
              dateFormat="dd/MM/yyyy"
              className="form-control border-right-0 inputField"
              customInput={<input style={{ width: '100%',backgroundColor: "#E0E0E0" }} />}
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
                    <label className="forlabel bold-label" htmlFor="chaOld">
                      CHA
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="chaOld"
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      maxLength={15}
                      name="chaOld"
                      value={chaName}
                      onChange={handleNocChange}
                    />

                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="importerNameOld"
                    >
                      Importer Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="importerNameOld"
                      maxLength={15}
                      name="importerNameOld"
                      value={inBondHdr.importerNameOld}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
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
                      id="approvedBy"
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      maxLength={15}
                      name="approvedBy"
                      value={inBondHdr.approvedBy}
                    />
                  </FormGroup>
                </Col>
        
              </Row>
                          <Row>
        
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="boeNo">
                    New WH BOE No
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="boeNo"
                      maxLength={15}
                      name="boeNo"
                      value={inBondHdr.boeNo}
                      onChange={handleNocChange}
                    />
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="boeDate"
                    >
                       New BE Date
                    </label>
                    <div style={{ position: "relative" }}>
<div>
                      <DatePicker
                        id="boeDate"
                        name='boeDate'
                        wrapperClassName="custom-react-datepicker-wrapper"
                        className="form-control"
                        selected={inBondHdr.boeDate}
                        value={inBondHdr.boeDate}
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
                    <label
                      className="forlabel bold-label"
                      htmlFor="bondingNo"
                    >
                    New Bond No
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="bondingNo"
                      maxLength={15}
                      name="bondingNo"
                      value={inBondHdr.bondingNo}
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
                      New Bond Date
                    </label>
                    <div style={{ position: "relative" }}>
<div>
                      <DatePicker
                        id="bondingDate"
                        name='bondingDate'
                        wrapperClassName="custom-react-datepicker-wrapper"
                        className="form-control"
                        selected={inBondHdr.bondingDate}
                        value={inBondHdr.bondingDate}
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
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                  New CHA
                                </label>
                                <Select
                                    value={{ value: inBondHdr.cha, label:newChaName }}
                                    onChange={handlePortChange}
                                    onInputChange={getIsoData}
                                    options={isoData}
                                    placeholder="Select CHA"
                                    isClearable
                                    id="cha"
                                    vesselName="cha"
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

{/* <div style={{ color: 'red' }} className="error-message">{nocErrors.cha}</div> */}
                            </FormGroup>
                        </Col>
        
<Col md={2}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="importerName">
                                  New Importer Name
                                </label>
                                <Select
                                    value={{ value: inBondHdr.importerId, label: impName }}
                                    onChange={handleImporterChange}
                                    onInputChange={getImporterData}
                                    options={impData}
                                    placeholder="Select importerName"
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
                            </FormGroup>
                        </Col>
              </Row>

              <Row>
          
             
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="inBondedPackages">
                    New Packages
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="inBondedPackages"
                      maxLength={15}
                      name="inBondedPackages"
                      value={inBondHdr.inBondedPackages}
                  
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="inBondedCif">
                    New CIF Value
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="inBondedCif"
                      maxLength={15}
                      name="inBondedCif"
                      value={inBondHdr.inBondedCif}
                     
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="inBondedCargoDuty"
                    >
                     New Cargo Duty
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="inBondedCargoDuty"
                      maxLength={15}
                      name="inBondedCargoDuty"
                      value={inBondHdr.inBondedCargoDuty}
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
                     New Insurance Value
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="inBondedInsurance"
                      maxLength={15}
                      name="inBondedInsurance"
                      value={inBondHdr.inBondedInsurance}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="inBondedGw">
                    New Gross Weight
                    </label>

                    <input
                      className="form-control"
                      type="text"
                      id="inBondedGw"
                      maxLength={15}
                      name="inBondedGw"
                      value={inBondHdr.inBondedGw}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>

                {/* <Col md={2}>
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
                </Col> */}
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
                In Bonding Cargo Details
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

                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                     Old Area Occupied
                    </th>
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
                      New In Bond PKG <span className="error-message">*</span>
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
                     New Area Occupied
                    </th>
                   
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
                      Cell Area Allocated <span className="error-message">*</span>
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      New In Bond Weight
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      New In Bond CIF <span className="error-message">*</span>
                    </th>

                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                     New In Bond Duty <span className="error-message">*</span>
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                     New In Bond Insurance
                    </th>

                    <th
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
                            (dtl.srNo !== undefined && dtl.srNo !== null) ||
                            selectedRows.some
                            ((selectedRow) =>
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
                      <td>{inputValues[index]?.oldAreaOccupied}</td>
                      <td>{inputValues[index]?.oldYardPackages}</td>
                      <td style={{ textAlign: "center" }}>
                        <input
                          className="form-control"
                          style={{ width: "180px" }}
                          type="text"
                          value={inputValues[index]?.newBondPackages}
                          placeholder="Enter PKGS"
                          // onChange={(e) =>
                          //   handleInputChangeFotDtl(
                          //     e,
                          //     "newBondPackages",
                          //     index
                          //   )
                          // }
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
<td style={{ textAlign: "center" }}>
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
                      </td>
                   

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

                      <td style={{ textAlign: "center" }}>
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
                      </td>
                      <td style={{ textAlign: "center" }}>
                      <button
                                    className="btn btn-outline-primary btn-margin newButton"
                                    style={{ marginRight: 10 }}
                                    id="submitbtn2"
                                    onClick={() => {
                                      if (inBondHdr.status ==="N" ||inBondHdr.status ==="A" ) {
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
                    control: (provided, state) => ({
                      ...provided,
                      height: 32,
                      minHeight: 32,
                      border: state.isFocused
                        ? "1px solid #ccc"
                        : "1px solid #ccc",
                      boxShadow: "none",
                      display: "flex",
                      alignItems: "center",
                      padding: 0,
                      borderRadius: "6px",
                      "&:hover": {
                        border: "1px solid #ccc",
                      },
                    }),
                    valueContainer: (provided) => ({
                      ...provided,
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 0.75rem",
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      lineHeight: "32px",
                    }),
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
            className="btn btn-outline-primary btn-margin newButton"
            style={{ marginRight: 10 }}
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

export default InBondAuditTrail;
