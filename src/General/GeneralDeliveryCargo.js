import AuthContext from "../Components/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import Select, { components } from 'react-select';
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
  Button
} from "reactstrap";
import { Pagination } from "react-bootstrap";
import Swal from "sweetalert2";
import { format } from "date-fns";
// import { format } from "date-fns";

function GeneralDeliveryCargo({ acttab, listOfData, listOfExbond, flag, onRequest }) {
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
    deliveryId: "",
    receivingId: "",
    deliveryDate: new Date(),
    profitCentreId: "N00008",
    boeNo: "",
    boeDate: "",
    depositNo: "",
    storageValidityDate: "",
    onAccountOf: "",
    importerId: "",
    importerName: "",
    cha: "",
    shift: "",
    receivedGw: "0",
    deliveryGw: "0",
    balanceGw: "0",
    remainingGw: "0",
    uom: "",
    areaOccupied: "0",
    areaReleased: "0",
    areaBalanced: "0",
    areaRemaining: "0",
    receivedPackages: "0",
    deliveredPackages: "0",
    balancedPackages: "0",
    remainingPackages: "0",
    qtyTakenOut: "0",
    weightTakenOut: "0",
    spaceAllocated: "",
    comments: "",
    gatePassAllow: "Y",
    gateOutId: "",
    assessmentId: "",
    assessmentStatus: "",
    storageBasedOn: "",
    storageUnit: "",
    noOf20Ft: "",
    noOf40Ft: "",
    status: "",
    createdBy: "",
    createdDate: "",
    editedBy: "",
    editedDate: "",
    approvedBy: "",
    approvedDate: "",
    cargoValue: "",
    cargoDuty: "",
    cifValue: "",
    rCargoValue: "",
    rCargoDuty: "",
    rCifValue: "",
    handlingEquip: "",
    handlingEquip1: "",
    handlingEquip2: "",
    owner: "",
    owner1: "",
    owner2: "",
    transporter: "",
    numberOfMarks: "",
    handlingStatus: "",
    transporterName: "",
    handlingInvoiceNo: "",
    jobNo: ''
  };



  const initialNocDtl = {
    companyId: companyid,
    branchId: branchId,
    deliveryId: "",
    receivingId: "",
    srNo: "",
    deliveryDate: null,
    jonDtlTransId: "",
    commodityDescription: "",
    commodityId: "",
    actCommodityId: "",
    typeOfPackage: "",
    depositNo: "",
    receivingDate: null,
    recivingPackages: "0",
    recivingWeight: "0",
    deliveredPackages: "0",
    deliveredWeight: "0",
    gatePassPackages: "0",
    gatePassWeight: "0",
    remainingPackages: "0",
    remainingWeight: "0",
    createdBy: "",
    createdDate: null,
    editedBy: "",
    editedDate: null,
    approvedBy: "",
    approvedDate: null,
    status: "",
    containerNo: "",
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
        `${ipaddress}api/generaldelivery/search?companyId=${companyid}&branchId=${branchId}&partyName=${id}`,
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
    if (acttab == "P01804") {

      if (listOfData.jobTransId && listOfData.jobNo && listOfData.boeNo && listOfExbond.deliveryId) {
        selectIGMSearchRadio(listOfExbond.deliveryId, listOfExbond.receivingId, listOfExbond.depositNo, listOfExbond.boeNo);
      }
      else {
        getBoeData(listOfData.boeNo);
      }
      if (flag) {
        handleClear();
      }
    }
  }, [listOfData.jobTransId, listOfExbond.deliveryId, listOfData.jobNo, acttab]);

  const selectIGMSearchRadio = (
    deliveryId,
    receivingId,
    depositeNo,
    boeNo
  ) => {
    closeIGMSearchModal();
    console.log(boeNo);
    axios
      .get(
        `${ipaddress}api/generaldelivery/getDataByTransIdANDNocIDAndInBondingId?companyId=${companyid}&branchId=${branchId}&deliveryId=${deliveryId}&receivingId=${receivingId}&depositeNo=${depositeNo}&boeNo=${boeNo}`,
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
        setInBond(response.data)

        setIsoName(response.data.boeNo);

        setChaName(response.data.editedBy);
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
        handleGridData(response.data.deliveryId, response.data.receivingId);
        fetchDataAfterSave(
          companyid,
          branchId,
          response.data.deliveryId,
          response.data.receivingId,
          response.data.depositNo,
        )
      })
      .catch((error) => { });
  };


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const currentItems = chaSearchedData;
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
      deliveryDate: date,
    }));
    //   document.getElementById("nocFromDate").classList.remove('error-border');
    //   setBondingErrors((prevErrors) => ({
    //     ...prevErrors,
    //     nocFromDate: "",
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
    let errors = {};

    if (!inBond.boeNo) {
      errors.boeNo = "BOE No is required.";
      document.getElementById("boeNo").classList.add("error-border");
      toast.error("BOE No is required.", {
      });
      setLoading(false);
      return;
    }

    if (!inBond.shift) {
      errors.shift = "Please specify shift...";
      document.getElementById("shift").classList.add("error-border");
      toast.error("Please specify shift...", {
      });
      setLoading(false);
      return;
    }
    // if (!inBond.gatePassAllow) {
    //   errors.gatePassAllow = "Please specify gatePassAllow...";
    //   document.getElementById("gatePassAllow").classList.add("error-border");
    //   toast.error("Please specify gatePassAllow...", {
    //   });
    //   setLoading(false);
    //   return;
    // }

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

    const hasEmptyFields = rows.some(row =>
      !row.yardLocation || !row.yardBlock || !row.blockCellNo || !row.deliveryPkgs
    );

    if (hasEmptyFields) {
      const errorMsg = "Required fields in location must be filled before saving.";
      setErrors((prevErrors) => ({
        ...prevErrors,
        save: errorMsg, // Set error message for save
      }));
      setLoading(false);


      toast.error(errorMsg, {
        position: 'top-center',
        autoClose: 1000,
        style: { width: `28vw` },
      });
      // toast.error(errorMsg); // Display error toast
      return; // Exit the function to prevent saving
    }
    let isValid = true;
    const updatedValues = [...inputValues];


    selectedRows.forEach((dtl, index) => {
      if (!updatedValues[index]) {
        updatedValues[index] = {};
      }

      const values = updatedValues[index];

      console.log('values : ', values, ' values.deliveredPackages ', values.deliveredPackages);

      let errorMessage = "";

      if (!values.deliveredPackages) {
        errorMessage = "Delivered Packages is required";
        toast.error("Delivered Packages is required.", {
          // ... (toast options)
        });
        setLoading(false);
        isValid = false;
      } else if (parseFloat(values.deliveredPackages) > dtl.receivingPackages) {
        errorMessage =
          "Delivered Packages should not be greater than gate in Packages";
        toast.error(
          errorMessage, {
          position: 'top-center',
          autoClose: 1000,
          style: { width: `28vw` },
        });
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
          item.jobTransId === row.jobTransId &&
          item.jobNo === row.jobNo &&
          item.commodityId === row.commodityId && item.srNo === row.srNo
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
      grid: {
        ...rows
      }
    };

    if (isValid) {
      axios
        .post(
          `${ipaddress}api/generaldelivery/saveCfInbondCrg?companyId=${companyid}&branchId=${branchId}&user=${userId}&flag=${inbondFlag}`,
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .then((response) => {
          setInBond(response.data);
          handleGridData(response.data.deliveryId, response.data.receivingId);
          fetchDataAfterSave(
            companyid,
            branchId,
            response.data.deliveryId,
            response.data.receivingId,
            response.data.depositNo,
          )
          setInBondFlag("edit");
          toast.success("Data save successfully!!", {
            autoClose: 800,
          });
          onRequest();
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          if (error.response) {
            // This will log detailed error information from the backend
            console.error("Error data:", error.response.data);

            const contentWidth = error.response.data.length * 10;
            toast.error(<div dangerouslySetInnerHTML={{ __html: error.response.data }} />, {
              position: 'top-center',
              autoClose: 3000,
              style: { width: `${contentWidth}px` },
            });
          }
        });

      console.log("Data saved successfully:", dataToSave);
    } else {
      // Update state to reflect errors
      setInputValues(updatedValues);
    }
  };

  const handleClear = () => {
    // Reset the form fields
    setInBond(initialNoc);
    document.getElementById("boeNo").classList.remove("error-border");
    document.getElementById("boeDate").classList.remove("error-border");
    setBondingErrors("");
    setSelectAll(false);
    setSelectedRows([]);
    setCfbondnocDtl([]);
    setInBondFlag("add");
    setChaName("");
    setCHASearchedData([]);
    setyardId('');
    getYardData('');
    setIsoName('');
    setIsoNameFIFO('');
    setModalDataInput((prev) => ({
      ...prev,
      yardLocation: '',
      yardBlock: '',
      blockCellNo: '',
      cellArea: '',
      cellAreaAllocated: '',
      cellAreaUsed: '',
    }));
    setRows([]);
    setErrors('');
  };

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);




  const [cfbondnocDtl, setCfbondnocDtl] = useState([]);
  const fetchData = async (companyid, branchId, receivingId) => {
    try {
      const response = await fetch(
        `${ipaddress}api/generaldelivery/getDataForDeliveryScreenFromReceivingDTL?companyId=${companyid}&branchId=${branchId}&receivingId=${receivingId}`,
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
      setCfbondnocDtl(data);
      setCHASearchedData(data);


      // setInputValues(data.map(mnr => ({
      //   ...mnr,
      //   deliveredPackages: (mnr.receivingPackages - (mnr.deliveredPackages || 0)),
      //   commodityId: mnr.commodityId,
      //   actCommodityId: mnr.actCommodityId,

      //   // areaOccupied:area || 0,
      //   // editedBy: `${mnr.createdBy}-${mnr.editedBy}-${mnr.approvedBy}` || '',
      //   editedBy: '',
      //   deliveredWeight: (
      //     ((mnr.receivingWeight / mnr.receivingPackages) * (mnr.receivingPackages - (mnr.deliveredPackages || 0)))
      //   ).toFixed(2),

      // })));


      setInputValues(data.map(mnr => ({
        ...mnr,

        balancedDeliveryPkg: (mnr.receivingPackages - (mnr.deliveredPackages || 0)),
        commodityId: mnr.commodityId,
        actCommodityId: mnr.actCommodityId,


        editedBy: '',
        balancedDeliveredweight: (
          (mnr.receivingWeight - (mnr.deliveredWeight || 0))
        ).toFixed(3),



        deliveredPackages: (mnr.receivingPackages - (mnr.deliveredPackages || 0)),
        commodityId: mnr.commodityId,
        actCommodityId: mnr.actCommodityId,

        // areaOccupied:area || 0,
        // editedBy: `${mnr.createdBy}-${mnr.editedBy}-${mnr.approvedBy}` || '',
        editedBy: '',
        deliveredWeight: (
          ((mnr.receivingWeight / mnr.receivingPackages) * (mnr.receivingPackages - (mnr.deliveredPackages || 0)))
        ).toFixed(3),

        oldDeliveryPackages: mnr.deliveredPackages,
        oldDeliveryWt: mnr.deliveredWeight,
        // oldDeliveryPaackages:(mnr.oldDeliveryPaackages+ (mnr.deliveredPackages +(mnr.balancedDeliveryPkg || 0))),

      })));

      console.log("cfbodnNocDtl records ", data);
    } catch (error) {
      // setError(error);
    } finally {
      setLoading(false);
    }
  };


  const fetchDataAfterSave = async (companyid, branchId, deliveryid, receivingId, depositeNo) => {
    try {
      const response = await fetch(
        `${ipaddress}api/generaldelivery/getSavedDeliveryDetails?companyId=${companyid}&branchId=${branchId}&deliveryid=${deliveryid}&receivingId=${receivingId}&depositeNo=${depositeNo}`,
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

      const selectedData = data.filter((row) => row.deliveryId !== undefined && row.deliveryId !== null);
      setSelectedRows(selectedData);
      setSelectAll(true);

      console.log('delivered data ', data);


      // setInputValues(data.map(mnr => ({
      //   ...mnr,

      //   deliveredPackages: (mnr.receivingPackages - (mnr.deliveredPackages || 0)),
      //   deliveredWeight: (
      //     ((mnr.receivingWeight / mnr.receivingPackages) * (mnr.receivingPackages - (mnr.deliveredPackages || 0)))
      //   ).toFixed(2),

      // })));

      setInputValues(data.map(mnr => ({
        ...mnr,

        balancedDeliveryPkg: (mnr.receivingPackages - (mnr.deliveredPackages || 0)),
        balancedDeliveredweight: (mnr.receivingWeight - (mnr.deliveredWeight || 0)), // Changed from deliveredPackages to deliveredWeight


        balancedPackages: mnr.deliveredPackages || 0,
        deliveredWeight: (
          ((mnr.receivingWeight / mnr.receivingPackages) * (mnr.deliveredPackages || 0))
        ).toFixed(3),

        oldDeliveryPackages:
          (mnr.receivingPackages || 0) - (mnr.remainingPackages || 0),

        oldDeliveryWt: ((mnr.receivingWeight || 0) - (mnr.remainingWeight || 0)).toFixed(3),

      })));

      console.log("cfbodnNocDtl records ", data);
    } catch (error) {
      // setError(error);
    } finally {
      setLoading(false);
    }
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


  const [inputValues, setInputValues] = useState([]);


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

  const handleInputChangeFotDtl = (event, fieldName, index, val, val1) => {
    const { value } = event.target;
    let newValue = value;

    if (['deliveredPackages', 'deliveredWeight', 'remainingGw'].includes(fieldName)) {
      newValue = handleInputChangeNew(value, val, val1)
    }

    setInputValues((prevInputValues) => {
      const updatedValues = [...prevInputValues];
      // const dtl = currentItems[index]; 

      const selectedRow = selectedRows[index];

      const dtl = currentItems[index]; // Get the current item details for comparison

      let errorMessage = "";



      const newTotalPackages = updatedValues.reduce(
        (sum, row) => sum + (parseFloat(row.gateInPackages) || 0),
        0
      );

      if (fieldName === "deliveredPackages") {
        // Calculate per package weight and update inbondGrossWt
        const perPackageWeight = dtl.receivingWeight / dtl.receivingPackages;
        updatedValues[index].deliveredWeight = (
          perPackageWeight * parseFloat(newValue)
        ).toFixed(3);

      }


      let addition;

      if (inBond.deliveryId) {
        addition = dtl.receivingPackages;
      } else {
        addition = dtl.receivingPackages - dtl.deliveredPackages;
        // addition=dtl.inBondedPackages;
      }

      //const addition=dtl.gateInPackages - dtl.inBondedPackages;
      console.log("addition", addition);

      if (fieldName === "deliveredPackages" && parseFloat(newValue) > addition) {
        errorMessage = `Delivered Packages should not be greater than ${addition}`;
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
            selectedRow.jobTransId === row.jobTransId &&
            selectedRow.jobNo === row.jobNo &&
            selectedRow.commodityId === row.commodityId && selectedRow.srNo === row.srNo
        )
      ) {
        setSelectedRows([...selectedRows, row]);
      }
    } else {
      // Remove from selected rows
      const updatedRows = selectedRows.filter(
        (selectedRow) =>
          selectedRow.jobTransId !== row.jobTransId ||
          selectedRow.jobNo !== row.jobNo ||
          selectedRow.commodityId !== row.commodityId || selectedRow.srNo !== row.srNo
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
      const isInBondingIdValid = inBond?.deliveryId != null && inBond?.deliveryId !== '';
      const index = currentItems.findIndex(
        (item) =>
          inBond?.deliveryId
            ? // If srNo exists, use commodityId
            item.jobTransId === row.jobTransId &&
            item.jobNo === row.jobNo &&
            item.commodityId === row.commodityId && item.srNo === row.srNo
            : // Otherwise, use cfBondDtlId
            item.jobTransId === row.jobTransId &&
            item.jobNo === row.jobNo &&
            item.commodityId === row.commodityId && item.srNo === row.srNo
      );
      if (index !== -1) {
        const source = isInBondingIdValid ? row : inputValues[index];

        totalInBondedPackages += parseFloat(source?.deliveredPackages || 0);
        totalShortagePackages += parseFloat(source?.deliveredWeight || 0);
        // totalAreaOccupied += parseFloat(source?.areaOccupied || 0);
      }
    });

    setTotals({
      totalInBondedPackages,
      totalShortagePackages,
      totalAreaOccupied
    });

    setInBond((pre) => ({
      ...pre,
      deliveredPackages: handleInputChangeNew(totalInBondedPackages, 13, 3),
      deliveryGw: handleInputChangeNew(totalShortagePackages, 13, 3),
      // areaOccupied:handleInputChangeNew(totalAreaOccupied,13,3)
    }));
  };



  // Example usage: Call this function after selection changes
  useEffect(() => {
    calculateTotals();
  }, [selectedRows, inputValues]);





  const [yardData, setYardData] = useState([]);
  const [yardId, setyardId] = useState('');

  const getYardData = (id) => {
    axios.get(`${ipaddress}api/yardblockcells/getLocationsAllYardCell?companyId=${companyid}&branchId=${branchId}&search=${id}`, {
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




  const [currentPage1, setCurrentPage1] = useState(1);
  const [itemsPerPage1] = useState(5);

  const indexOfLastItem1 = currentPage1 * itemsPerPage1;
  const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
  const currentItems1 = yardData.slice(indexOfFirstItem1, indexOfLastItem1);
  const totalPages1 = Math.ceil(yardData.length / itemsPerPage1);


  const [isModalOpenForYard, setIsModalOpenForYard] = useState(false);


  const initialYardGrid = {
    companyId: companyid,
    branchId: branchId,
    receivingId: '',
    gateInId: '',
    srNo: 1,
    yardLocation: '',
    yardBlock: '',
    blockCellNo: '',
    cellArea: 0.000,
    cellAreaUsed: 0.000,
    cellAreaAllocated: 0.000,
    qtyTakenOut: 0,
    areaReleased: 0.000,
    gridReleased: '',
    receivedPackages: 0,
    deliveredPackages: 0,
    status: '',
    createdBy: '',
    createdDate: null,
    editedBy: '',
    editedDate: null,
    approvedBy: '',
    approvedDate: null,
  };


  const [modalDataInput, setModalDataInput] = useState(initialYardGrid);
  const [cost, setCost] = useState(0);

  const handleGridData = (deliveryId, receivingId) => {
    axios.get(
      `${ipaddress}api/generaldelivery/getSavedDataOfDeliveryGrid?companyId=${companyid}&branchId=${branchId}&deliveryId=${deliveryId}&receivingId=${receivingId}`,
      {
        headers: `Authorization ${jwtToken}`
      }
    )
      .then((response) => {
        console.log(response.data);
        const data = response.data;

        const newRows = data.map((row, index) => ({
          ...row,

        }));

        // Update the rows state with new values
        setRows(newRows);

        console.log("Updated rows: ", rows); // Log the new data
        console.log("yardblockcellsyardblockcells", response.data);
      })
      .catch((error) => console.error("Error:", error));
  };

  const [yardCellArray, setYardCellArray] = useState([]);

  const [currentPageYardCell, setCurrentPageYardCell] = useState(1);
  const [itemsPerPageYardCell] = useState(10);

  const indexOfLastItemYardCell = currentPageYardCell * itemsPerPageYardCell;
  const indexOfFirstItemYardCell = indexOfLastItemYardCell - itemsPerPageYardCell;
  const currentItemsYardCell = yardCellArray.slice(indexOfFirstItemYardCell, indexOfLastItemYardCell);
  const totalPagesYardCell = Math.ceil(yardCellArray.length / itemsPerPageYardCell);





  const [selectedItemsYard, setSelectedItemsYard] = useState([]);


  const [boeData, setBOEData] = useState([]);
  const [boeDataFIFO, setBOEDataFIFO] = useState([]);
  const [isoId, setISOId] = useState('');
  const [isoName, setIsoName] = useState('');
  const [isoNameFIFO, setIsoNameFIFO] = useState('');
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalPack, setTotalPack] = useState(0);

  const getInBondGridData = (inBondingId) => {
    axios.get(
      `${ipaddress}api/generaldelivery/getAfterSaveGrid?companyId=${companyid}&branchId=${branchId}&receivingId=${inBondingId}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Corrected header declaration
        }
      }
    ).then((response) => {
      const data = response.data;

      setRows(response.data);
      const upadtedRow = data.map((row, index) => ({

      }));
      console.log("response_________________", response.data); // Process data as needed

    }).catch((error) => {
      if (error.response) {
        toast.error(error.response.data ? error.response.data : "Server Error! Please try again later.", {
          position: 'top-center'
        })
      }
      console.error(error); // Log error or show message
    });
  };

  const handleBoeChange = async (selectedOption, { action }) => {

    if (action === 'clear') {

      setIsoName('');
      setISOId('');
      setCHASearchedData([]);
      setCfbondnocDtl([]);
      setChaName('');
      setInBond(initialNoc);
      setRows([]);
      document.getElementById('boeNo').classList.remove('error-border');
      setBondingErrors((prevErrors) => ({
        ...prevErrors,
        ['boeNo']: "",
      }));
    }
    else {
      setIsoName(selectedOption?.label)
      setInBond((pri) => ({
        ...pri,
        boeNo: selectedOption ? selectedOption.boeNo : '',
        cha: selectedOption?.cha,
        depositNo: selectedOption?.depositNo,
        jobNo: selectedOption ? selectedOption.jobNo : '',
        spaceAllocated: selectedOption?.spaceAllocated,
        noOf20Ft: selectedOption?.noOf20Ft,
        noOf40Ft: selectedOption?.noOf40Ft,
        uom: selectedOption?.uom,
        numberOfMarks: selectedOption?.numberOfMarks,
        cha: selectedOption?.cha,                  // Assuming `selectedOption.value` holds `boeNo`
        boeDate: selectedOption?.boeDate,
        chaName: selectedOption?.editedBy,
        importerId: selectedOption?.importerId,
        importerName: selectedOption?.importerName,
        receivedPackages: selectedOption?.receivedPkg,
        deliveredPackages: selectedOption?.deliveredPkg,
        areaOccupied: selectedOption?.areaOccupied,
        receivingId: selectedOption?.receivingId,
        remainingPackages: selectedOption?.remainingPackages,
        remainingGw: selectedOption?.remainingGw,
        receivedGw: selectedOption?.receivedWeight,
        rCargoDuty: selectedOption?.cargoDuty,
        rCargoValue: selectedOption?.cargoValue,
      }));

      setChaName(selectedOption?.editedBy)

      getInBondGridData(selectedOption?.receivingId)
      fetchData(
        companyid,
        branchId,
        selectedOption?.receivingId,
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

    axios.get(`${ipaddress}api/generaldelivery/generalDeliveryCrgService?companyId=${companyid}&branchId=${branchId}&partyName=${val}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;

        const portOptions = data.map(port => ({
          value: `${port.boeNo}-${port.depositNo}`,
          label: `${port.boeNo}-${port.depositNo}`,
          boeNo: port.boeNo,
          boeDate: port.boeDate,
          depositNo: port.depositNo,
          jobNo: port.jobNo,
          receivingId: port.receivingId,
          spaceAllocated: port.spaceAllocated,
          noOf20Ft: port.noOf20Ft,
          noOf40Ft: port.noOf40Ft,
          numberOfMarks: port.noOfMarks,
          receivedPkg: port.receivedPackages,
          deliveredPkg: port.deliveredPackages,
          cha: port.cha,
          uom: port.uom,
          cargoValue: port.cargoValue,
          cargoDuty: port.cargoDuty,
          editedBy: port.editedBy,
          areaOccupied: port.areaOccupied,
          importerId: port.importerId,
          importerName: port.importerName,
          receivedWeight: port.receivedWeight,
          remainingPackages: port.receivedPackages - port.deliveredPackages,
          remainingGw: handleInputChangeNew((port.receivedWeight - port.deliveredWeight), 12, 3),
        }));
        console.log('portOptions ', portOptions);
        if (listOfData.boeNo) {
          handleBoeChange(portOptions[0], { action: "select" });
        }
        // Set BOE Data
        setBOEData(portOptions);
      })
      .catch((error) => {

      })
  }


  const handleBoeChangeFIFO = async (selectedOption, { action }) => {

    if (action === 'clear') {
      setIsoNameFIFO('');
      setISOId('');
      setCHASearchedData([]);
      setCfbondnocDtl([]);
      setChaName('');
      setInBond(initialNoc);
      setRows([]);
      document.getElementById('boeNo').classList.remove('error-border');
      setBondingErrors((prevErrors) => ({
        ...prevErrors,
        ['boeNo']: "",
      }));
    }
    else {
      setIsoNameFIFO(selectedOption?.label)

      // Check if the user is selecting the topmost record
      if (boeDataFIFO.length > 0 && selectedOption.depositNo !== boeDataFIFO[0].depositNo) {
        // toast.info("The topmost record is pending delivery. Please select the first record.");
        toast.info('The topmost record is pending delivery. Please select the first record.', {
          position: 'top-center',
          autoClose: 3000,
          style: { width: `32vw` },
        });
        setIsoNameFIFO('');
        return;
      }

      setInBond((pri) => ({
        ...pri,
        boeNo: selectedOption ? selectedOption.boeNo : '',
        jobNo: selectedOption ? selectedOption.jobNo : '',
        cha: selectedOption?.cha,
        depositNo: selectedOption?.depositNo,
        spaceAllocated: selectedOption?.spaceAllocated,
        noOf20Ft: selectedOption?.noOf20Ft,
        noOf40Ft: selectedOption?.noOf40Ft,
        uom: selectedOption?.uom,
        numberOfMarks: selectedOption?.numberOfMarks,
        cha: selectedOption?.cha,
        boeDate: selectedOption?.boeDate,
        chaName: selectedOption?.editedBy,
        importerId: selectedOption?.importerId,
        importerName: selectedOption?.importerName,
        receivedPackages: selectedOption?.receivedPkg,
        deliveredPackages: selectedOption?.deliveredPkg,
        areaOccupied: selectedOption?.areaOccupied,
        receivingId: selectedOption?.receivingId,
        remainingPackages: selectedOption?.remainingPackages,
        remainingGw: selectedOption?.remainingGw,
        receivedGw: selectedOption?.receivedWeight,
        rCargoDuty: selectedOption?.cargoDuty,
        rCargoValue: selectedOption?.cargoValue
      }));
      setChaName(selectedOption?.editedBy);
      getInBondGridData(selectedOption?.receivingId)
      fetchData(
        companyid,
        branchId,
        selectedOption?.receivingId,
      );
      document.getElementById('boeNo').classList.remove('error-border');
      setBondingErrors((prevErrors) => ({
        ...prevErrors,
        ['boeNo']: "",
      }));
    }
  };

  const getBoeDataFIFO = (val) => {
    if (val === '') {
      setBOEDataFIFO([]);
      return;
    }

    axios.get(`${ipaddress}api/generaldelivery/generalDeliveryCrgServiceFIFO?companyId=${companyid}&branchId=${branchId}&partyName=${val}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;

        console.log("response.data boe no please check ", data);
        const portOptions = data.map(port => ({
          value: `${port.boeNo}-${port.depositNo}`,
          label: `${port.boeNo}-${port.depositNo}`,
          boeNo: port.boeNo,                  // No need for response.data, use port directly
          boeDate: port.boeDate,
          jobNo: port.jobNo,
          depositNo: port.depositNo,
          receivingId: port.receivingId,
          spaceAllocated: port.spaceAllocated,
          noOf20Ft: port.noOf20Ft,
          noOf40Ft: port.noOf40Ft,
          numberOfMarks: port.noOfMarks,
          receivedPkg: port.receivedPackages,
          deliveredPkg: port.deliveredPackages,
          cha: port.cha,
          uom: port.uom,
          cargoValue: port.cargoValue,
          cargoDuty: port.cargoDuty,
          editedBy: port.editedBy,
          areaOccupied: port.areaOccupied,
          importerId: port.importerId,
          importerName: port.importerName,
          receivedWeight: port.receivedWeight,
          remainingPackages: port.receivedPackages - port.deliveredPackages,
          remainingGw: handleInputChangeNew((port.receivedWeight - port.deliveredWeight), 12, 3),
        }));
        // console.log('portOptions ', portOptions);
        // if (listOfData.boeNo) {
        //   handleBoeChange(portOptions[0], { action: "select" });
        // }
        // Set BOE Data
        setBOEDataFIFO(portOptions);
      })
      .catch((error) => {

      })
  }

  const [totalPackages, setTotalPackages] = useState(0);
  const [rows, setRows] = useState([
    {
      companyId: companyid,
      branchId: branchId,
      deliveryId: "",
      boeNo: "",
      srNo: "",
      yardLocation: "",
      yardBlock: "",
      blockCellNo: "",
      receivingId: "",
      cellAreaAllocated: "0",
      cellAreaReleased: "0",
      deliveryPkgs: "0",
      status: "",
      createdBy: "",
      createdDate: null,
      editedBy: "",
      editedDate: null,
      jobTransId: "",
      jobNo: "",
      approvedBy: "",
      approvedDate: null,
      qtyTakenOut: "0",
      weightTakenOut: "0",
      receivedPackages: "0",
    },
  ]);
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newRows = [...rows];
    newRows[index][name] = value;

    // Check if the field being updated is inBondPackages
    if (name === "deliveryPkgs") {
      const currentRow = newRows[index];
      const maxInBondPackages = currentRow.receivedPackages; // Set this to the actual max from your yard data

      if (parseFloat(value) > maxInBondPackages) {
        const errorMessage = `This row's deliveryPkgs cannot exceed ${maxInBondPackages}.`;
        setErrors((prevErrors) => ({
          ...prevErrors,
          [`deliveryPkgs-${index}`]: errorMessage,
        }));
        toast.error(errorMessage); // Show toast notification
      } else {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[`deliveryPkgs-${index}`];
          return newErrors;
        });
      }

      const perPackageWeight = (currentRow.cellAreaAllocated || 0) / (currentRow.receivedPackages || 1); // Avoid division by zero
      newRows[index].cellAreaReleased = (perPackageWeight * parseFloat(value)).toFixed(2);

      // Calculate the new total packages
      const newTotalPackages = newRows.reduce(
        (sum, row) => sum + (parseFloat(row.receivedPackages) || 0),
        0
      );
      setTotalPackages(newTotalPackages);
    }

    // Validation for cellAreaAllocated
    if (name === "cellAreaReleased") {
      const cellArea = parseFloat(rows[index].cellArea);
      const cellAreaUsed = parseFloat(rows[index].cellAreaUsed);
      const cellAreaAllocated = parseFloat(value);

      // Validation: Cell Area Allocated should not exceed available area
      if (cellAreaAllocated > (cellArea - cellAreaUsed)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [`cellAreaReleased-${index}`]: `Allocated area cannot exceed ${cellArea - cellAreaUsed}`,
        }));
      } else {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[`cellAreaReleased-${index}`];
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




  const handlePrint = async (type) => {
    setLoading(true);
    let inBondingId = inBond.inBondingId;
    try {
      const response = await axios.get(`${ipaddress}api/cfinbondcrg/generateCustomeInBondPrint?companyId=${companyid}&branchId=${branchId}&uname=${username}&type=${type}&cname=${companyname}&bname=${branchname}&inBondingId=${inBondingId}`,
        {
          headers: {
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

    } finally {
      setLoading(false);
    }
  };

  const [selection, setSelection] = useState("FIFO"); // Default selection
  console.log(selection);
  const handleRadioChange = (e) => {
    setSelection(e.target.value);
    console.log(selection);
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
                        Search by Receiving Id / Importer / Deposite No / CHA
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
                        <th scope="col">Delivery Id</th>
                        <th scope="col">Delivery Date</th>
                        <th scope="col">Receiving Id</th>

                        <th scope="col">Deposite No </th>
                        <th scope="col"> BOE No</th>
                        <th scope="col">Impoter Name</th>
                        <th scope="col">CHA</th>
                        <th scope="col">Delivered Packages</th>
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
                                  item.deliveryId,
                                  item.receivingId,
                                  item.depositNo,
                                  item.boeNo,

                                )
                              }
                              value={item[0]}
                            />
                          </td>
                          <td>{item.deliveryId}</td>
                          <td>{item.deliveryDate ? format(new Date(item.deliveryDate), 'dd/MM/yyyy HH:mm') : null}</td>
                          <td>{item.receivingId}</td>
                          <td>{item.depositNo}</td>
                          <td>{item.boeNo}</td>
                          <td>{item.importerName}</td>
                          <td>{item.editedBy}</td>
                          <td>{item.deliveredPackages}</td>
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
              <Row>
                <Col md={9}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="deliveryId"
                    >
                      Delivery Id
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="deliveryId"
                      name="deliveryId"
                      value={inBond.deliveryId}
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
                    onClick={openIGMSearchModal}
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
                <label
                  className="forlabel bold-label"
                  htmlFor="deliveryDate"
                >
                  Delivery Date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={inBond.deliveryDate}
                    onChange={handleNocTransDate}
                    id="deliveryDate"
                    name="deliveryDate"
                    dateFormat="dd/MM/yyyy HH:mm"
                    showTimeSelect
                    value={inBond.deliveryDate}
                    disabled
                    timeFormat="HH:mm"
                    className="form-control border-right-0 inputField"
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

            <Col md={2} style={{ marginTop: 9 }}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Select Type</label>
                <div>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="cargoType"
                      style={{ marginRight: 4 }}
                      value="FIFO"
                      checked={selection === "FIFO"}
                      onChange={handleRadioChange}
                    />
                    FIFO
                  </label>

                  <label className="radio-label" style={{ marginLeft: "10px" }}>
                    <input
                      type="radio"
                      name="cargoType"
                      style={{ marginRight: 5 }}
                      value="GENERAL"
                      checked={selection === "GENERAL"}
                      onChange={handleRadioChange}
                    />
                    GENERAL
                  </label>
                </div>
              </FormGroup>
            </Col>

            {selection === "FIFO" && (
              <Col md={2}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="sbRequestId">
                    BE/Job No <span className="error-message">*</span>
                  </label>
                  <Select
                    value={inBond.boeNo ? { value: inBond.boeNo, label: inBond.boeNo } : null}
                    onChange={handleBoeChangeFIFO}
                    // onInputChange={getBoeDataFIFO}
                    onInputChange={(inputValue, { action }) => {
                      if (action === 'input-change') {
                        getBoeDataFIFO(inputValue);
                      }
                    }}
                    filterOption={() => true}
                    options={boeDataFIFO}
                    placeholder="Search BE/Job No"
                    isClearable
                    id="boeNo"
                    vesselName="boeNo"
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
                  <div style={{ color: 'red' }} className="error-message">{errors.boeNo}</div>
                </FormGroup>
              </Col>
            )}


            {selection === "GENERAL" && (
              <Col md={2}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="sbRequestId">
                    BE/Job No <span className="error-message">*</span>
                  </label>
                  <Select
                    value={inBond.boeNo ? { value: inBond.boeNo, label: inBond.boeNo } : null}
                    onChange={handleBoeChange}
                    // onInputChange={getBoeData}
                    onInputChange={(inputValue, { action }) => {
                      if (action === 'input-change') {
                        getBoeData(inputValue);
                      }
                    }}
                    filterOption={() => true}
                    options={boeData}
                    placeholder="Search BE/Job No"
                    isClearable
                    id="boeNo"
                    vesselName="boeNo"
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

                  <div style={{ color: 'red' }} className="error-message">{errors.boeNo}</div>
                </FormGroup>
              </Col>
            )}


            {/* <Col md={2}>
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
                        disabled
                        
                        dateFormat="dd/MM/yyyy"
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: "100%",backgroundColor: "#E0E0E0" }} />}
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
                  disabled

                  maxLength={15}
                  name="approvedBy"
                  value={inBond.approvedBy}
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
                  disabled

                  name="status"
                  value={inBond.status === "A" ? "Approved" : inBond.status === "N" ? "New" : ""}
                />
              </FormGroup>
            </Col>

          </Row>
          <Row>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="shift">
                  Shift <span className="error-message">*</span>
                </label>
                <select
                  className={`form-control ${inBond.shift ? 'border-reset' : ''}`}
                  id="shift"
                  name="shift"
                  value={inBond.shift} // Should match option values
                  onChange={(e) =>
                    setInBond((prevNOC) => ({
                      ...prevNOC,
                      shift: e.target.value,
                    }))
                  }
                >
                  <option value="">Select </option>
                  <option value="Day">Day</option>
                  <option value="Second">Second</option>
                  <option value="Third">Third</option>
                </select>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="gatePassAllow">
                  Gate Pass Allow
                </label>
                <select
                  className={`form-control ${inBond.gatePassAllow ? 'border-reset' : ''}`}
                  id="gatePassAllow"
                  name="gatePassAllow"
                  value={inBond.gatePassAllow} // Should match option values
                  onChange={(e) =>
                    setInBond((prevNOC) => ({
                      ...prevNOC,
                      gatePassAllow: e.target.value,
                    }))
                  }
                >
                  <option value="">Select </option>
                  <option value="Y">YES</option>
                  <option value="N">NO</option>
                </select>
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="transporterName">

                  Transporter Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="transporterName"
                  maxLength={171}
                  name="transporterName"
                  value={inBond.transporterName}
                  onChange={handleNocChange}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="spaceAllocated">
                  Space Allocated
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="spaceAllocated"
                  maxLength={15}
                  name="spaceAllocated"
                  value={inBond.spaceAllocated}
                  disabled

                />
              </FormGroup>
            </Col>




            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="depositNo">
                  Deposite No
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="depositNo"
                  maxLength={15}
                  name="depositNo"
                  value={inBond.depositNo}
                  disabled

                />
              </FormGroup>
            </Col>
            {/* <Col md={2}>
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
                  disabled

                  maxLength={15}
                  name="createdBy"
                  value={inBond.createdBy}
                />
              </FormGroup>
            </Col> */}
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="jobNo">
                  Job No
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="jobNo"
                  name="jobNo"
                  value={inBond.jobNo}
                  disabled
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="noOf20Ft">
                  No of 20 FT Containers
                </label>

                <input
                  className="form-control"
                  type="text"
                  id="noOf20Ft"
                  maxLength={5}
                  name="noOf20Ft"
                  value={inBond.noOf20Ft}
                  onChange={handleNocChange}
                  disabled

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
                  maxLength={5}
                  name="noOf40Ft"
                  value={inBond.noOf40Ft}
                  onChange={handleNocChange}
                  disabled

                />
              </FormGroup>
            </Col>


            <Col md={4}>
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
                  disabled

                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="cha">
                  CHA
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="cha"
                  disabled

                  maxLength={15}
                  name="cha"
                  value={chaName}
                  onChange={handleNocChange}
                />
                <div style={{ color: "red" }} className="error-message">
                  {bondingErrors.cha}
                </div>
              </FormGroup>
            </Col>
          </Row>

          <Row>


            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="receivedPackages"
                >
                  Received Packages
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="receivedPackages"
                  maxLength={15}
                  name="receivedPackages"
                  value={inBond.receivedPackages}
                  disabled

                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="deliveredPackages"
                >
                  Delivery Packages
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="deliveredPackages"
                  maxLength={15}
                  name="deliveredPackages"
                  value={inBond.deliveredPackages}
                  disabled

                />
                <div style={{ color: "red" }} className="error-message">
                  {bondingErrors.deliveredPackages}
                </div>
              </FormGroup>
            </Col>
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
                  maxLength={15}
                  name="remainingPackages"
                  value={inBond.remainingPackages}
                  onChange={handleNocChange}
                  disabled

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
                  htmlFor="receivedGw"
                >
                  Receiving Gross Weight
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="receivedGw"
                  maxLength={15}
                  name="receivedGw"
                  value={inBond.receivedGw}
                  disabled

                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="deliveryGw"
                >
                  Delivery Weight
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="deliveryGw"
                  maxLength={15}
                  name="deliveryGw"
                  disabled

                  value={inBond.deliveryGw}
                  onChange={handleNocChange}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="remainingGw"
                >
                  Remaining Weight
                </label>
                <input
                  disabled

                  className="form-control"
                  type="text"
                  id="remainingGw"
                  name="remainingGw"
                  value={inBond.remainingGw}
                  onChange={handleNocChange}
                  maxLength={15}
                />
              </FormGroup>
            </Col>

          </Row>
          <Row>


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
                  disabled

                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="areaReleased"
                >
                  Area Released
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="areaReleased"
                  maxLength={15}
                  name="areaReleased"
                  value={inBond.areaReleased}
                  disabled

                />
                <div style={{ color: "red" }} className="error-message">
                  {bondingErrors.areaReleased}
                </div>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="areaRemaining"
                >
                  Remaining Area
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="areaRemaining"
                  maxLength={15}
                  name="areaRemaining"
                  value={inBond.areaRemaining}
                  onChange={handleNocChange}
                  disabled

                />

                <div style={{ color: "red" }} className="error-message">
                  {bondingErrors.areaRemaining}
                </div>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="balancedPackages"
                >
                  Balance Qty
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="balancedPackages"
                  maxLength={15}
                  name="balancedPackages"
                  value={inBond.balancedPackages}
                  disabled

                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="balanceGw"
                >
                  Balance Weight
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="balanceGw"
                  maxLength={15}
                  name="balanceGw"
                  disabled

                  value={inBond.balanceGw}
                  onChange={handleNocChange}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="areaBalanced"
                >
                  Balance Area
                </label>
                <input
                  disabled

                  className="form-control"
                  type="text"
                  id="areaBalanced"
                  name="areaBalanced"
                  value={inBond.areaBalanced}
                  onChange={handleNocChange}
                  maxLength={15}
                />
              </FormGroup>
            </Col>

          </Row>

          <Row>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="handlingEquip">
                  Handling Equipment <span className="error-message">*</span>
                </label>
                <select
                  className={`form-control ${inBond.handlingEquip ? 'border-reset' : ''}`}
                  id="handlingEquip"
                  name="handlingEquip"
                  value={inBond.handlingEquip} // Should match option values
                  onChange={(e) =>
                    setInBond((prevNOC) => ({
                      ...prevNOC,
                      handlingEquip: e.target.value,
                    }))
                  }
                >
                  <option value="">Select </option>
                  <option value="Fork">Fork</option>
                  <option value="Labour">Labour</option>
                  <option value="Hydra">Hydra</option>
                  <option value="Kalmar">Kalmar</option>
                </select>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="handlingEquip1">
                  Handling Equipment 2 <span className="error-message">*</span>
                </label>
                <select
                  className={`form-control ${inBond.handlingEquip1 ? 'border-reset' : ''}`}
                  id="handlingEquip1"
                  name="handlingEquip1"
                  value={inBond.handlingEquip1} // Should match option values
                  onChange={(e) =>
                    setInBond((prevNOC) => ({
                      ...prevNOC,
                      handlingEquip1: e.target.value,
                    }))
                  }
                >
                  <option value="">Select </option>
                  <option value="Fork">Fork</option>
                  <option value="Labour">Labour</option>
                  <option value="Hydra">Hydra</option>
                  <option value="Kalmar">Kalmar</option>
                </select>
              </FormGroup>
            </Col>

            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="handlingEquip2">

                  Handling Equipment 3
                </label>
                <select
                  className={`form-control ${inBond.handlingEquip2 ? 'border-reset' : ''}`}
                  id="handlingEquip2"
                  name="handlingEquip2"
                  value={inBond.handlingEquip2} // Should match option values
                  onChange={(e) =>
                    setInBond((prevNOC) => ({
                      ...prevNOC,
                      handlingEquip2: e.target.value,
                    }))
                  }
                >
                  <option value="">Select </option>
                  <option value="Fork">Fork</option>
                  <option value="Labour">Labour</option>
                  <option value="Hydra">Hydra</option>
                  <option value="Kalmar">Kalmar</option>
                </select>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="owner">
                  Owner
                </label>
                <select
                  className={`form-control ${inBond.owner ? 'border-reset' : ''}`}
                  id="owner"
                  name="owner"
                  value={inBond.owner} // Should match option values
                  onChange={(e) =>
                    setInBond((prevNOC) => ({
                      ...prevNOC,
                      owner: e.target.value,
                    }))
                  }
                >
                  <option value="">Select </option>
                  <option value="Y">YES</option>
                  <option value="N">NO</option>
                </select>
              </FormGroup>
            </Col>




            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="owner1">
                  Owner 1
                </label>
                <select
                  className={`form-control ${inBond.owner1 ? 'border-reset' : ''}`}
                  id="owner1"
                  name="owner1"
                  value={inBond.owner1} // Should match option values
                  onChange={(e) =>
                    setInBond((prevNOC) => ({
                      ...prevNOC,
                      owner1: e.target.value,
                    }))
                  }
                >
                  <option value="">Select </option>
                  <option value="Y">YES</option>
                  <option value="N">NO</option>
                </select>
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
                  maxLength={149}
                  name="comments"
                  value={inBond.comments}
                  onChange={handleNocChange}

                />
              </FormGroup>
            </Col>

          </Row>

          <Row>


            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="rCargoValue"
                >
                  Rec Cargo Value
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="rCargoValue"
                  maxLength={15}
                  name="rCargoValue"
                  value={inBond.rCargoValue}
                  disabled

                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="rCargoDuty"
                >
                  Rec Cargo Duty
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="rCargoDuty"
                  maxLength={15}
                  name="rCargoDuty"
                  value={inBond.rCargoDuty}
                  disabled

                />
                <div style={{ color: "red" }} className="error-message">
                  {bondingErrors.rCargoDuty}
                </div>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="cargoValue"
                >
                  Cargo Value
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="cargoValue"
                  name="cargoValue"
                  value={inBond.cargoValue}
                  pattern="^\d{0,13}(\.\d{0,2})?$"
                  step="0.01"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,13}(\.\d{0,2})?$/.test(value) || value === "") {
                      handleNocChange(e);
                    }
                  }}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="cargoDuty"
                >
                  Cargo Duty
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="cargoDuty"
                  name="cargoDuty"
                  value={inBond.cargoDuty}
                  pattern="^\d{0,13}(\.\d{0,2})?$"
                  step="0.01"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,13}(\.\d{0,2})?$/.test(value) || value === "") {
                      handleNocChange(e);
                    }
                  }}
                />
              </FormGroup>
            </Col>


          </Row>


          {/* <Row>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="noOfMarks"
                    >
                      Mark Nos
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="noOfMarks"
                      maxLength={15}
                      name="noOfMarks"
                      value={
                        inBond.noOfMarks != null
                          ? inBond.noOfMarks
                          : "0"
                      }
                      onChange={handleNocChange}
                    
                    />
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="crossingCargo">
                      Crossing Cargo
                    </label>
                    <select
                      className="form-control"
                      id="crossingCargo"
                      name="crossingCargo"
                      value={inBond.crossingCargo}
                      onChange={(e) =>
                        setInBond((prevNOC) => ({
                          ...prevNOC,
                          crossingCargo: e.target.value,
                        }))
                      }
                    >
                      <option value="N">NO</option>
                      <option value="Y">YES</option>
                      
                    </select>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="comments">
                      Remarks
                    </label>

                    <Input
                      className="form-control"
                      type="textarea"
                      id="comments"
                      maxLength={149}
                      name="comments"
                      value={inBond.comments}
                      onChange={handleNocChange}
                      
                    />
                  </FormGroup>
                </Col>
              </Row> */}
        </div>
        <hr />
        <Row className="text-center">
          <Col>
            <button
              className="btn btn-outline-primary btn-margin newButton"
              style={{ marginRight: 10 }}
              id="submitbtn2"
              // disabled={inBond.status==="A"}
              onClick={handleSave}
            >
              <FontAwesomeIcon
                icon={faSave}
                style={{ marginRight: "5px" }}
              />
              Save
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


        <div className="mt-1 table-responsive ">
          <table className="table table-bordered tableHeader">
            <thead className='tableHeader'>
              <tr>
                <th scope="col" className="text-center" style={{ color: "black" }} >   Yard Location  <span className="error-message">*</span>   </th>
                <th scope="col" className="text-center" style={{ color: "black" }} >   Yard Block    </th>
                <th scope="col" className="text-center" style={{ color: "black" }} >Cell</th>
                <th scope="col" className="text-center" style={{ color: "black" }} >Received Packages</th>
                <th scope="col" className="text-center" style={{ color: "black" }} >Cell Area Allocated <span className="error-message">*</span></th>
                <th scope="col" className="text-center" style={{ color: "black" }} >Delivery Packages <span className="error-message">*</span></th>
                <th scope="col" className="text-center" style={{ color: "black" }} >Cell Area Released <span className="error-message">*</span></th>
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
                      disabled

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
                      disabled

                    />

                  </td>
                  <td>
                    <Input
                      className="form-control"
                      type="text"
                      name="blockCellNo"
                      value={row.blockCellNo}

                      disabled
                    />
                  </td>
                  <td>
                    <Input
                      className="form-control"
                      type="text"
                      value={row.receivedPackages}
                      name="receivedPackages"

                      disabled
                    />
                  </td>

                  <td>
                    <Input
                      className="form-control"
                      type="text"
                      value={row.cellAreaAllocated}
                      name="cellAreaAllocated"

                      disabled
                    />
                  </td>
                  <td>
                    <Input
                      className="form-control"
                      type="text"
                      value={row.deliveryPkgs}
                      name="deliveryPkgs"
                      onChange={(e) => handleInputChange(index, e)}
                      style={{
                        borderColor: errors[`deliveryPkgs-${index}`] ? "red" : "",
                      }}
                    />
                    {errors[`deliveryPkgs-${index}`] && (
                      <span style={{ color: "red" }}>
                        {errors[`deliveryPkgs-${index}`]}
                      </span>
                    )}
                  </td>
                  <td>
                    <Input
                      className="form-control"
                      type="text"
                      name="cellAreaReleased"
                      value={row.cellAreaReleased}
                      onChange={(e) => handleInputChange(index, e)}
                      style={{
                        borderColor:
                          errors[`cellAreaReleased-${index}`] ? "red" : "",
                        backgroundColor: "#E0E0E0"
                      }}
                      disabled
                    />
                    {errors[`cellAreaReleased-${index}`] && (
                      <span style={{ color: "red" }}>
                        {errors[`cellAreaReleased-${index}`]}
                      </span>
                    )}
                  </td>

                  {/* {!row.inBondingId && (
                    <>
                      <td>                       

                        <Button type="button" onClick={() => deleteRow(index)}
                          className="newButton"
                          disabled={row.status === 'A'}
                          color="danger"
                          outline>
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>



                      </td>
                    </>
                  )} */}

                </tr>
              ))}
            </tbody>
          </table>
          {errors.totalPackages && (
            <div style={{ color: "red" }}>{errors.totalPackages}</div>
          )}
        </div>
        <hr />




        {/* <div
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
            Receiving Cargo Details
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
                    disabled={inBond.deliveryId}
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
                  Gate In Package
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Gate In Weight
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Receiving Id
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Receiving Date
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Receiving Packages
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Receiving Weight
                </th>


                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Container No
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Container Size
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Container Type
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Old Received PKG
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Bal Receiving PKG <span className="error-message">*</span>
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Bal Receiving Weight
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
                        (inBond.deliveryId === dtl.deliveryId) ||
                        selectedRows.some
                          ((selectedRow) =>

                            selectedRow.jobTransId === dtl.jobTransId &&
                            selectedRow.jobNo === dtl.jobNo &&
                            selectedRow.commodityId === dtl.commodityId &&
                            selectedRow.srNo === dtl.srNo
                          )
                      }
                      disabled={inBond.deliveryId === dtl.deliveryId}
                      onChange={(e) => handleCheckboxChangeForDtl(e, dtl)}
                    />
                  </td>
                  <th scope="row">{index + 1}</th>
                  <td>{dtl.commodityDescription}</td>
                  <td>{dtl.typeOfPackage}</td>
                  <td>{dtl.gateInPackages}</td>
                  <td>{dtl.gateInWeight}</td>


                  <td>{dtl.receivingId}</td>
                  <td>{dtl.createdDate ? format(new Date(dtl.createdDate), 'dd/MM/yyyy HH:mm') : ''}</td>
                  <td>{dtl.receivingPackages}</td>
                  <td>{dtl.receivingWeight}</td>
                  <td>{dtl.containerNo}</td>
                  <td>{dtl.containerSize}</td>
                  <td>{dtl.containerType}</td>

                  <td>{dtl.deliveredPackages != null ? dtl.deliveredPackages : 0}</td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      className="form-control"
                      style={{ width: "126px" }}
                      type="text"
                      value={inputValues[index]?.deliveredPackages}
                      placeholder="Enter PKGS"
                      onChange={(e) => {
                        const regex = /^[0-9]*\.?[0-9]*$/;
                        if (regex.test(e.target.value)) {
                          handleInputChangeFotDtl(
                            e,
                            "deliveredPackages",
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
                        "Delivered Packages"
                      ) && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                          {inputValues[index]?.errorMessage}
                        </span>
                      )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      className="form-control"
                      disabled
                      style={{ width: "126px", backgroundColor: "#E0E0E0" }}
                      type="number"
                      value={inputValues[index]?.deliveredWeight}
                      onChange={(e) =>
                        handleInputChangeFotDtl(e, "deliveredWeight", index, 13, 3)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>    */}




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
            Receiving Cargo Details
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
                    disabled={inBond.deliveryId}
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
                  Gate In Package
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Gate In Weight
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Receiving Id
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Receiving Date
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Receiving Packages
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Receiving Weight
                </th>


                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Container No
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Container Size
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Container Type
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Old Delivery PKG
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Old Delivery Wt
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Bal Delivery PKG <span className="error-message">*</span>
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Bal Delivery Weight
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Delivery Package
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Delivery Weight
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
                        (inBond.deliveryId === dtl.deliveryId) ||
                        selectedRows.some
                          ((selectedRow) =>

                            selectedRow.jobTransId === dtl.jobTransId &&
                            selectedRow.jobNo === dtl.jobNo &&
                            selectedRow.commodityId === dtl.commodityId &&
                            selectedRow.srNo === dtl.srNo
                          )
                      }
                      disabled={inBond.deliveryId === dtl.deliveryId}
                      onChange={(e) => handleCheckboxChangeForDtl(e, dtl)}
                    />
                  </td>
                  <th scope="row">{index + 1}</th>
                  <td>{dtl.commodityDescription}</td>
                  <td>{dtl.typeOfPackage}</td>
                  <td>{dtl.gateInPackages}</td>
                  <td>{dtl.gateInWeight}</td>


                  <td>{dtl.receivingId}</td>
                  <td>{dtl.createdDate ? format(new Date(dtl.createdDate), 'dd/MM/yyyy HH:mm') : ''}</td>
                  <td>{dtl.receivingPackages}</td>
                  <td>{dtl.receivingWeight}</td>
                  <td>{dtl.containerNo}</td>
                  <td>{dtl.containerSize}</td>
                  <td>{dtl.containerType}</td>



                  {/* <td>{dtl.oldDeliveryPackages != null ? dtl.oldDeliveryPackages : 0}</td> */}
                  <td>{inputValues[index]?.oldDeliveryPackages}</td>
                  <td>{inputValues[index]?.oldDeliveryWt}</td>
                  <td>{inputValues[index]?.balancedDeliveryPkg}</td>
                  <td>{inputValues[index]?.balancedDeliveredweight}</td>




                  <td style={{ textAlign: "center" }}>
                    <input
                      className="form-control"
                      style={{ width: "126px" }}
                      type="text"
                      value={inputValues[index]?.deliveredPackages}
                      placeholder="Enter PKGS"
                      onChange={(e) => {
                        const regex = /^[0-9]*\.?[0-9]*$/;
                        if (regex.test(e.target.value)) {
                          handleInputChangeFotDtl(
                            e,
                            "deliveredPackages",
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
                        "Delivered Packages"
                      ) && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                          {inputValues[index]?.errorMessage}
                        </span>
                      )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      className="form-control"
                      disabled
                      style={{ width: "126px", backgroundColor: "#E0E0E0" }}
                      type="number"
                      value={inputValues[index]?.deliveredWeight}
                      onChange={(e) =>
                        handleInputChangeFotDtl(e, "deliveredWeight", index, 13, 3)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* <Pagination
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
          </Pagination> */}
        </div>


      </div>

    </>
  );
}

export default GeneralDeliveryCargo;
