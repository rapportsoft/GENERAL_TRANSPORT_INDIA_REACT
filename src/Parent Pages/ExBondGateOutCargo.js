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
  faPrint,
  faTruck,
  faBraille,
  faTicket,
  faTruckFast,
  faLocation,
  faXmark,
  faPlus,
  faTrash,
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
  Row,
  Col,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  FormFeedback,
  Table,
  Label,
} from "reactstrap";
import { Button, Pagination } from "react-bootstrap";
import { format } from "date-fns";
import { CatchingPokemonSharp } from "@mui/icons-material";
import Swal from "sweetalert2";
// import { format } from "date-fns";

function ExBondGateOutCargo({acttab,listOfData,listOfGateOut,listOfGatePass,flag,onRequest}) {
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

  const [nocFlag, setNocFlag] = useState("add");

  const initialgateOut = {
    companyId: companyid,
    branchId: branchId,
    finYear: "",
    gateOutId: "",
    erpDocRefNo: "",
    docRefNo: "",
    srNo: "",
    exBondBeNo:"",
    docRefDate: new Date(),
    profitcentreId: "N00003",
    transType: "",
    drt: "N",
    gateOutDate: new Date(),
    processId: "",
    shift: "",
    gateNoIn: "",
    gateNoOut: "",
    igmLineNo: "",
    invoiceNo: "",
    invoiceDate: new Date(),
    onAccountOf: "",
    viaNo: "",
    containerNo: "",
    containerSize: "",
    containerType: "",
    containerStatus: "",
    containerHealth: "",
    imoCode: "",
    haz: "",
    isoCode: "",
    refer: "",
    sa: "",
    sl: "",
    cha: "",
    chaName: "",
    exporterName: "",
    importerName: "",
    commodityDescription: "",
    grossWt: "",
    natureOfCargo: "",
    actualNoOfPackages: "",
    qtyTakenOut: "",
    vesselId: "",
    transporterStatus: "",
    transporter: "",
    transporterName: "",
    vehicleNo: "",
    tripType: "",
    driverName: "",
    deliveryOrderNo: "",
    deliveryOrderDate: new Date(),
    doValidityDate: "",
    gatePassNo: "",
    gatePassDate: "",
    location: "",
    comments: "",
    gateInType: "",
    eirNo: "",
    eirDate: new Date(),
    eirStatus: "",
    eirCreatedBy: "",
    eirCreatedDate: new Date(),
    eirApprovedBy: "",
    eirApprovedDate: new Date(),
    egmNo: "",
    egmDate: new Date(),
    status: "",
    createdBy: "",
    createdDate: new Date(),
    editedBy: "",
    editedDate: new Date(),
    approvedBy: "",
    approvedDate: new Date(),
    othPartyId: "",
    weightTakenOut: "",
    prStatus: "",
    codeccoMtOutStatus: "",
    codeccoMtOutDate: new Date(),
    licenceNo: "",
    driverContactNo: "",
    outDriverName: "",
    customsExpOutStatus: "",
    customsExpOutDate: new Date(),
    emptyOutId: "",
    emptyOutDate: new Date(),
    vehicalGateIn: "",
    emptyPassDate: new Date(),
    tagRemoveStatus: "",
    tagRemoveDate: new Date(),
    tallyType: "",
    outSealNo: "",
    draftBillNo: "",
    draftBillDate: new Date(),
    gstin: "",
    internalMove: "",
    doAssessStatus: "",
    doAssessDate: new Date(),
    noOfTrips: "",
    alternateContactNo: "",
    transTypeSubtype: "",
    invoiceType: "",
    tallyId: "",
    sealType: "",
    exportDocument: "",
    invtStatus: "",
    markForReview: "",
    reviewComments: "",
    exBondBeNo: "",
    gateNoIn:"1",
    processId:"P00500",
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

  const [gateOut, setGateOut] = useState(initialgateOut);

  const [gateInStatus, setGateInStatus] = useState("");
  const [isModalOpenForGateSearch, setisModalOpenForGateSearch] =
    useState(false);
  const openGateSearchModal = () => {
    setisModalOpenForGateSearch(true);
    searchGate("");
  };

  const closeGateSearchModal = () => {
    setisModalOpenForGateSearch(false);
    setGateSearchId("");
    setCHASearchedData([]);
  };

  const [gateSearchId, setGateSearchId] = useState("");
  const searchGate = (id) => {
    setLoading(true);
    axios
      .get(
        `${ipaddress}api/gateOutController/findDataOfGateOutDetails?companyId=${companyid}&branchId=${branchId}&partyName=${id}`,
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

  const clearGateSearch = () => {
    setGateSearchId("");
    searchGate("");
  };
  // const [chaName, setChaName] = useState('');

  useEffect(() => {
    if(acttab === "P00253")
      {
       if ( listOfGateOut.gateOutId && listOfGateOut.exBondBeNo) {
        selectGateSearchRadio(listOfGateOut.gateOutId,listOfGateOut.exBondBeNo );
       } 
       else
       {
        getExbondBeData(listOfGatePass.exBondBeNo)
       }
       if(flag)
       {
        handleClear();
       }
      }
   }, [listOfGateOut.gateOutId,listOfGateOut.exBondBeNo,acttab]);

  const selectGateSearchRadio = (
    gateInId,
    exBondBeNo,
  ) => {
    closeGateSearchModal();
    axios
      .get(
        `${ipaddress}api/gateOutController/list?companyId=${companyid}&branchId=${branchId}&gateOutId=${gateInId}&exBondBeNo=${exBondBeNo}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        setNocFlag("edit");
        const data = response.data;
        const firstItem = response.data[0];
        console.log("getDataByPartyIdAndGstNoYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY", data);
        setGateOut(firstItem);

        setGateOut((pre)=>({
...pre,
gateOutId:firstItem.gateOutId,
        }));
        setDisplayItems(response.data);
        fetchDataAfterSave(companyid,branchId,firstItem.gateOutId,firstItem.vehicleNo);
      })
      .catch((error) => {});
  };


  const [chaSearchedData, setCHASearchedData] = useState([]);

  const [chaName, setChaName] = useState("");

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

  const [nocDtl, setNocDtl] = useState(initialNocDtl);
  const handlegateOutChange = (e) => {
    const { name, value } = e.target;

    setGateOut((prevNOC) => {
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
    setNocErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleNocTransDate = (date) => {
    setGateOut((prevNoc) => ({
      ...prevNoc,
      deliveryOrderDate: date,
      // Only set doValidityDate to null if it's less than the selected deliveryOrderDate
      doValidityDate:
        prevNoc.doValidityDate && prevNoc.doValidityDate < date
          ? null
          : prevNoc.doValidityDate,
    }));


    setNocErrors((prevErrors)=>({
      ...prevErrors,
      deliveryOrderDate:"",
    }));
    setSelectedDate(date); // Make sure selectedDate is updated
  };

  const handleDoValidityDate = (date) => {
    setGateOut((prevNoc) => ({
      ...prevNoc,
      doValidityDate: date,
      // deliveryOrderDate: prevNoc.deliveryOrderDate && prevNoc.deliveryOrderDate > date ? null : prevNoc.deliveryOrderDate,
    }));
    setSelectedDate(date); // Make sure selectedDate is updated
  };
  const handleGateOutDate = (date) => {
    setGateOut((prevNoc) => ({
      ...prevNoc,
      gateOutDate: date,
    }));
    setSelectedDate(date); // Make sure selectedDate is updated
  };

  const [nocErrors, setNocErrors] = useState({
    exBondBeNo: "",
    vehicleNo: "",
    deliveryOrderNo: "",
    deliveryOrderDate: "",
    shift: "",
    gateNoIn: "",
  });
  const [commodityDtldata, setCommodityDtlData] = useState([]);
  const handleSave = async () => {
    try {
      // Show loading state
      setLoading(true);

      if (gateOut.status ==='A')
      {
        toast.info("Record is already approved !!!",{
          position:"top-center",
          autoClose:999
        })
        setLoading(false);
        return;
      }
      // Log the data to be saved
      console.log("Data saved:", gateOut);
      let errors = {};
  
      // Validate Importer Name
      if (!gateOut.exBondBeNo) {
        errors.exBondBeNo = "Exbondbe no is required";
      }
  
      // if (!gateOut.shift) {
      //   errors.shift = "Shift is required";
      // }
  
      if (!gateOut.gateNoIn) {
        errors.gateNoIn = "Gate No is required";
      }
  
      // Validate Vehicle No
      if (!gateOut.vehicleNo) {
        errors.vehicleNo = "Vehicle No is required";
      }
  
      // Validate Driver Name
      if (!gateOut.deliveryOrderNo) {
        errors.deliveryOrderNo = "DO is required";
      }
  
      if (!gateOut.deliveryOrderDate) {
        errors.deliveryOrderDate = "Delivery Date is required";
      }
  
      // Set validation errors if any
      setNocErrors(errors);
  
      // Stop further processing if there are validation errors
      if (Object.keys(errors).length > 0) {
        setLoading(false);
        return;
      }
  
      // Log the commodity details
      console.log("Saved Data:", commodityDtldata);
  
      // Prepare the request body
      const requestBody = {
        gateOut: {
          ...gateOut,
        },
        dtl: {
          ...commodityDtldata,
        },
      };
  
      console.log("Request body", requestBody);
  
      // Perform API call to save data
      const response = await axios.post(
        `${ipaddress}api/gateOutController/saveDataOfExbondGateOut?companyId=${companyid}&branchId=${branchId}&user=${userId}&flag=${nocFlag}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const data = response.data;
      const firstItem = data[0];
      console.log("firstItem firstItem firstItem!! firstItem firstItem firstItem firstItem firstItem firstItem firstItem", firstItem);
      // Set saved data to the gateOut state
      setGateOut(firstItem);
      console.log("Data saved successfully!! Response", response.data);
      fetchDataAfterSave(companyid,branchId,firstItem.gateOutId,firstItem.vehicleNo);
      // Show success toast notification
      toast.success("Data saved successfully!!", {
        autoClose: 800,
      });
      // Fetch updated data
      fetchData(companyid, branchId, firstItem.vehicleNo);
      setNocFlag("edit");
    } catch (error) {
      // Handle API error
      console.error("Error saving data:", error);
  
      // Show error toast notification
      toast.error(error.response?.data || "Error saving data", {
        autoClose: 800,
      });
    } finally {
      // Turn off loading spinner
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPortId("");
    setPortName("");
    setImpName("");
    setErrorsTable("");
    setGateOut({
      companyId: companyid,
      branchId: branchId,
      finYear: "",
      gateOutId: "",
      erpDocRefNo: "",
      docRefNo: "",
      srNo: "",
      exBondBeNo:"",
      docRefDate: new Date(),
      profitcentreId: "N00003",
      transType: "",
      drt: "N",
      gateOutDate: new Date(),
      processId:"P00500",
      shift: "",
      gateNoIn: "",
      gateNoOut: "",
      igmLineNo: "",
      invoiceNo: "",
      invoiceDate: new Date(),
      onAccountOf: "",
      viaNo: "",
      containerNo: "",
      containerSize: "",
      containerType: "",
      containerStatus: "",
      containerHealth: "",
      imoCode: "",
      haz: "",
      isoCode: "",
      refer: "",
      sa: "",
      sl: "",
      cha: "",
      chaName: "",
      exporterName: "",
      importerName: "",
      commodityDescription: "",
      grossWt: "",
      natureOfCargo: "",
      actualNoOfPackages: "",
      qtyTakenOut: "",
      vesselId: "",
      transporterStatus: "",
      transporter: "",
      transporterName: "",
      vehicleNo: "",
      tripType: "",
      driverName: "",
      deliveryOrderNo: "",
      deliveryOrderDate: new Date(),
      doValidityDate: "",
      gatePassNo: "",
      gatePassDate: "",
      location: "",
      comments: "",
      gateInType: "",
      eirNo: "",
      eirDate: new Date(),
      eirStatus: "",
      eirCreatedBy: "",
      eirCreatedDate: new Date(),
      eirApprovedBy: "",
      eirApprovedDate: new Date(),
      egmNo: "",
      egmDate: new Date(),
      status: "",
      createdBy: "",
      createdDate: new Date(),
      editedBy: "",
      editedDate: new Date(),
      approvedBy: "",
      approvedDate: new Date(),
      othPartyId: "",
      weightTakenOut: "",
      prStatus: "",
      codeccoMtOutStatus: "",
      codeccoMtOutDate: new Date(),
      licenceNo: "",
      driverContactNo: "",
      outDriverName: "",
      customsExpOutStatus: "",
      customsExpOutDate: new Date(),
      emptyOutId: "",
      emptyOutDate: new Date(),
      vehicalGateIn: "",
      emptyPassDate: new Date(),
      tagRemoveStatus: "",
      tagRemoveDate: new Date(),
      tallyType: "",
      outSealNo: "",
      draftBillNo: "",
      draftBillDate: new Date(),
      gstin: "",
      internalMove: "",
      doAssessStatus: "",
      doAssessDate: new Date(),
      noOfTrips: "",
      alternateContactNo: "",
      transTypeSubtype: "",
      invoiceType: "",
      tallyId: "",
      sealType: "",
      exportDocument: "",
      invtStatus: "",
      markForReview: "",
      reviewComments: "",
      exBondBeNo: "",
      gateNoIn:"1",
    });
    document.getElementById("driverName").classList.remove("error-border");
    document.getElementById("cha").classList.remove("error-border");
    document.getElementById("importerName").classList.remove("error-border");
    document.getElementById("vehicleNo").classList.remove("error-border");
    // document.getElementById("shift").classList.remove("error-border");
    // document.getElementById("gateInType").classList.remove("error-border");
    setNocErrors("");
    setNocFlag("add");
    setChaName("");
    setSelectedItems([]);
    setDisplayItems([]);
    setCommodityDtlData([]);
  };


  const defaultOption = { value: "N00003", label: "NOC BOND" };

  const handleChangeProfitCenter = (selectedOption) => {
    // Update the state or handle the change as needed
    setGateOut((prevState) => ({
      ...prevState,
      profitcentreId: selectedOption ? selectedOption.value : "",
    }));
  };

  const [selectedItems, setSelectedItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const toggleSelectItem = (item) => {
    setSelectedItems((prevSelectedItems) => {
      const isSelected = prevSelectedItems.some(
        (selectedItem) =>
          selectedItem.nocTransId === item.nocTransId &&
          selectedItem.approvedBy === item.approvedBy
      );
      if (isSelected) {
        return prevSelectedItems.filter(
          (selectedItem) =>
            !(
              selectedItem.nocTransId === item.nocTransId &&
              selectedItem.approvedBy === item.approvedBy
            )
        );
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };
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
      grossWeight: "",
      nocNo: "",
      nocTransId: "",
      nocTransDate: "",
      nocValidityDate: "",
      igmNo: "",
      igmLineNo: "",
      qtyTakenIn: "",
      weightTakenIn: "",
      cfBondDtlId: "",
      srNo: "",
      erpDocRefNo: "",
      grossWeight: "",
      typeOfPackage: "",
      actualNoOfPackages: "",
      approvedBy: "",
    }))
  );

  const [exbondBeData, setExbondbeData] = useState([]);
  const [exbondBeNo, setExbondBeNo] = useState("");
  const [exbondBeNoname, setExbondBeNoName] = useState("");

  const handleExbondBeChange = async (selectedOption, { action }) => {
    if (action === "clear") {
      console.log("respone datacagahgdhsagdhs", selectedOption);

      setGateOut((pre) => ({
        ...pre,
        exBondBeNo: "",
        vehicleNo: "",
      }));
      document.getElementById("exBondBeNo").classList.remove("error-border");
      setNocErrors((prevErrors) => ({
        ...prevErrors,
        ["exBondBeNo"]: "",
      }));

      setNocErrors((prevErrors)=>({
        ...prevErrors,
        exBondBeNo:"",
      }));
      // Clear the error for CHA when a valid value is selected
      setNocErrors((prevErrors) => ({
        ...prevErrors,
        portId: selectedOption ? "" : prevErrors.portId, // Clear error if a value is selected
      }));
    } else {
      console.log("respone datacagahgdhsagdhs", selectedOption);

      setGateOut((pre) => ({
        ...pre,
        exBondBeNo: selectedOption ? selectedOption.value : "",
        vehicleNo: "",
      }));

      document.getElementById("exBondBeNo").classList.remove("error-border");
      setNocErrors((prevErrors) => ({
        ...prevErrors,
        ["exBondBeNo"]: "",
      }));
      setNocErrors((prevErrors) => ({
        ...prevErrors,
        portId: selectedOption ? "" : prevErrors.portId, // Clear error if a value is selected
      }));
    }
  };

  const getExbondBeData = (val) => {
    if (val === "") {
      setExbondbeData([]);
      return;
    }
    axios
      .get(
        `${ipaddress}api/cfbondgatepass/getDataOfExBondBeNo?companyId=${companyid}&branchId=${branchId}&value=${val}`,
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
          boe: port[2],
          commo: port[3],
          trans: port[4],
          bondN: port[5],
        }));
        setExbondbeData(portOptions);
      })
      .catch((error) => {});
  };

  const [portData, setPortData] = useState([]);
  const [portId, setPortId] = useState("");
  const [portName, setPortName] = useState("");

  const [impId, setImpId] = useState("");
  const [impName, setImpName] = useState("");

  const [vehicleNoData, setVehicleNoData] = useState([]);
  const handleVehicleNoChange = async (selectedOption, { action }) => {
    if (action === "clear") {
      console.log("respone datacagahgdhsagdhs", selectedOption);

      setGateOut((pre) => ({
        ...pre,
        vehicleNo: "",
        driverName: "",
        driverContactNo: "",
        profitcentreId: "N00003",
        transType: "",
        transporterName: "",
        transporterStatus: "",
        transporter: "",
        licenceNo: "",
        exBondBeNo: "",
        gatePassNo:"",
        gatePassDate:"",
        vehicalGateIn:"",
        deliveryOrderNo:"",
        deliveryOrderDate:"",
        doValidityDate:"",
      }));
      document.getElementById("vehicleNo").classList.remove("error-border");
      setNocErrors((prevErrors) => ({
        ...prevErrors,
        ["vehicleNo"]: "",
      }));
    } else {
      console.log("respone datacagahgdhsagdhs", selectedOption);

      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set the time to midnight (00:00:00)
      
      const validityDate = selectedOption ? selectedOption.doValidityDate : '';
      validityDate.setHours(0, 0, 0, 0); // Set the time to midnight (00:00:00)
      
      if (validityDate < today) {
          toast.error("The do validity date has already expired.", {
              autoClose: 800
          });
          setLoading(false);
          return;
      }

      setGateOut((pre) => ({
        ...pre,
        vehicleNo: selectedOption ? selectedOption.value : "",
        driverName: selectedOption ? selectedOption.dname : "",
        driverContactNo: selectedOption ? selectedOption.cNo : "",
        profitcentreId: selectedOption ? selectedOption.pid : "",
        transType: selectedOption ? selectedOption.trnastype : "",

        transporterStatus: selectedOption ? selectedOption.ts : "",
        transporterName: selectedOption ? selectedOption.tname : "",
        transporter: selectedOption ? selectedOption.t : "",
        licenceNo: selectedOption ? selectedOption.lno : "",
        exBondBeNo: selectedOption ? selectedOption.exBonbeNo : "",
        gatePassNo:selectedOption ? selectedOption.gatePassNo : "",
        gatePassDate:selectedOption ? selectedOption.gatePassDate : "",
        vehicalGateIn:selectedOption ? selectedOption.vehicleId : "",
        deliveryOrderNo:selectedOption ? selectedOption.deliveryOrderNo :"",
        deliveryOrderDate: selectedOption ? selectedOption.deliveryOrderDate : "",
        doValidityDate: selectedOption ? selectedOption.doValidityDate :"",
      }));

      fetchData(companyid, branchId, selectedOption.value);
      document.getElementById("importerName").classList.remove("error-border");
      setNocErrors((prevErrors) => ({
        ...prevErrors,
        ["importerName"]: "",
      }));
    }
  };

  const getVehicleNoData = (val) => {
    axios
      .get(
        `${ipaddress}api/cfbondgatepass/getDataOfVehicleNo?companyId=${companyid}&branchId=${branchId}&value=${val}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;

        console.log(
          "response.data_______________________________________________________________",
          data
        );
        const portOptions = data.map((port) => ({
          value: port[0], // Importer ID
          label: port[0], // Importer ID
          dname: port[1],
          cNo: port[2], // Address 1
          trnastype: port[3], // Address 2
          pid: port[4], // Address 3

          ts: port[5],
          tname: port[6],
          t: port[7],
          lno: port[8],
          exBonbeNo: port[9],
          gatePassNo: port[10],
          gatePassDate: new Date(port[11]),
          vehicleId: port[12],
          deliveryOrderNo:port[13],
          deliveryOrderDate: new Date (port[14]),
          doValidityDate: new Date (port[15]),
        }));
        setVehicleData(portOptions);
      })
      .catch((error) => {
        console.error("Error fetching importer data", error);
      });
  };

  const [vehicleData, setVehicleData] = useState([]);
  const handleVehicleChange = async (selectedOption, { action }) => {
    if (action === "clear") {
      console.log("respone datacagahgdhsagdhs", selectedOption);

      setGateOut((pre) => ({
        ...pre,
        vehicleNo: "",
        driverName: "",
        driverContactNo: "",
        profitcentreId: "N00003",
        transType: "",
        transporterName: "",
        transporterStatus: "",
        transporter: "",
        licenceNo: "",
        exBondBeNo: "",
        gatePassNo:"",
        gatePassDate:"",
        vehicalGateIn:"",
        deliveryOrderNo:"",
        deliveryOrderDate:"",
        doValidityDate:"",
      }));
      document.getElementById("vehicleNo").classList.remove("error-border");
      setNocErrors((prevErrors) => ({
        ...prevErrors,
        ["vehicleNo"]: "",
      }));


      setNocErrors((prevErrors)=>({
        ...prevErrors,
        vehicleNo:"",
        exBondBeNo:"",
      }));

    } else {
      console.log("respone datacagahgdhsagdhs", selectedOption);

      const today = new Date();
                today.setHours(0, 0, 0, 0); // Set the time to midnight (00:00:00)
                
                const validityDate = selectedOption ? selectedOption.doValidityDate : '';
                validityDate.setHours(0, 0, 0, 0); // Set the time to midnight (00:00:00)
                
                if (validityDate < today) {
                    toast.error("The do validity date has already expired.", {
                        autoClose: 800
                    });
                    setLoading(false);
                    return;
                }

      setGateOut((pre) => ({
        ...pre,
        vehicleNo: selectedOption ? selectedOption.value : "",
        driverName: selectedOption ? selectedOption.dname : "",
        driverContactNo: selectedOption ? selectedOption.cNo : "",
        profitcentreId: selectedOption ? selectedOption.pid : "",
        transType: selectedOption ? selectedOption.trnastype : "",

        transporterStatus: selectedOption ? selectedOption.ts : "",
        transporterName: selectedOption ? selectedOption.tname : "",
        transporter: selectedOption ? selectedOption.t : "",
        licenceNo: selectedOption ? selectedOption.lno : "",
        exBondBeNo: selectedOption ? selectedOption.exBonbeNo : "",
        gatePassNo:selectedOption ? selectedOption.gatePassNo : "",
        gatePassDate:selectedOption ? selectedOption.gatePassDate : "",
        vehicalGateIn:selectedOption ? selectedOption.vehicleId : "",
        deliveryOrderNo:selectedOption ? selectedOption.deliveryOrderNo :"",
        deliveryOrderDate: selectedOption ? selectedOption.deliveryOrderDate : "",
        doValidityDate: selectedOption ? selectedOption.doValidityDate :"",
      }));

      fetchData(companyid, branchId, selectedOption.value);
      document.getElementById("importerName").classList.remove("error-border");
      setNocErrors((prevErrors) => ({
        ...prevErrors,
        ["importerName"]: "",
      }));
      setNocErrors((prevErrors)=>({
        ...prevErrors,
        vehicleNo:"",
        exBondBeNo:"",
      }));

    }
  };

  const getVehicleData = (val) => {
    axios
      .get(
        //`${ipaddress}api/cfexbondcrg/getDataOfImporter?companyId=${companyid}&branchId=${branchId}&cha=${portId}&value=${val}`,
        `${ipaddress}api/cfbondgatepass/getVehicleNoOfExbondBeNoFromGatePass?companyId=${companyid}&branchId=${branchId}&ecBondBeNo=${gateOut.exBondBeNo}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;
 const first = data[0]
 console.log("first________________________________",first);

        const portOptionss = data.map((port) => ({
          doValidityDate: new Date(port[15]),
        }));

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set the time to midnight (00:00:00)
        
        // Iterate through portOptionss to check the validity date of each port
        portOptionss.forEach((port) => {
          const validityDate = new Date(port[15]);
          validityDate.setHours(0, 0, 0, 0); // Set the time to midnight (00:00:00)
        
          if (validityDate < today) {
            toast.error("The DO validity date has already expired.", {
              autoClose: 800,
            });
            setLoading(false);
            return;
          }
        });

        console.log("response.data of vehicle no ", data);
        const portOptions = data.map((port) => ({
          value: port[0], // Importer ID
          label: port[0], // Importer ID
          dname: port[1],
          cNo: port[2], // Address 1
          trnastype: port[3], // Address 2
          pid: port[4], // Address 3

          ts: port[5],
          tname: port[6],
          t: port[7],
          lno: port[8],
          exBonbeNo: port[9],
          gatePassNo: port[10],
          gatePassDate: new Date(port[11]),
          vehicleId: port[12],
          deliveryOrderNo:port[13],
          deliveryOrderDate:new Date(port[14]),
          doValidityDate: new Date(port[15]),
        }));
        setVehicleData(portOptions);
      })
      .catch((error) => {
        console.error("Error fetching importer data", error);
      });
  };


  const fetchData = async (companyid, branchId, vehicleNo) => {
    try {
      const response = await fetch(
        `${ipaddress}api/cfbondgatepass/getCommodityDetailsByVehicleNo?companyId=${companyid}&branchId=${branchId}&vehicleNo=${vehicleNo}`,
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

      setCommodityDtlData(data);
      console.log(
        "commodity records____________________________________ ",
        data
      );
    } catch (error) {
      // setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataAfterSave = async (companyid, branchId,gateOutId, vehicleNo) => {
    try {
      const response = await fetch(
        `${ipaddress}api/gateOutController/getDataOfGateOutDetails?companyId=${companyid}&branchId=${branchId}&gateOutId=${gateOutId}&vehicleNo=${vehicleNo}`,
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

      setCommodityDtlData(data);
      console.log(
        "commodity records____________________________________ ",
        data
      );
    } catch (error) {
      // setError(error);
    } finally {
      setLoading(false);
    }
  };
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [exbondCommodityData, setExbondCommodityData] = useState([]);


  const shiftOptions = [
    { value: "DAY", label: "DAY" },
    { value: "NIGHT", label: "NIGHT" },
  ];

  const transOptions = [
    { value: "1", label: "Gate 1" },
    { value: "2", label: "Gate 2" },
  ];

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
            {/* <h5
              className="pageHead"
              style={{
                fontFamily: "Your-Heading-Font",
                paddingLeft: "2%",
                paddingRight: "-20px",
              }}
            >
              {" "}
              <FontAwesomeIcon
                icon={faTicket}
                style={{
                  marginRight: "8px",
                  color: "black", // Set the color to golden
                }}
              />
              Ex Bond Gate Out Cargo
              <hr />
            </h5> */}
            <div>
         
              <Modal
                Modal
                isOpen={isModalOpenForGateSearch}
                onClose={closeGateSearchModal}
                toggle={closeGateSearchModal}
                style={{
                  maxWidth: "1200px",
                  fontSize: 12,
                  wioverflow: "-moz-hidden-unscrollable",
                }}
              >
                <ModalHeader
                  toggle={closeGateSearchModal}
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
                    style={{ fontFamily: "Your-Heading-Font", color: "white" }}
                  >
                    {" "}
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{
                        marginRight: "8px",
                        color: "white", // Set the color to golden
                      }}
                    />{" "}
                    Search Gate Out
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
                          Search by Gate Pass Id / Ex Bond Be No / Gate Out Id /Noc No
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="igmTransId"
                          maxLength={15}
                          name="igmTransId"
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
                        onClick={clearGateSearch}
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
                          <th scope="col">Gate Out No</th>
                          <th scope="col">Gate Out Date</th>
                          <th scope="col">Gate Pass No</th>
                          <th scope="col">Gate Pass Date</th>
                          <th scope="col">Shift</th>
                          <th scope="col">ExBond Be No </th>
                       
                          <th scope="col">Vehicle No</th>

                          <th scope="col">Status </th>
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
                                  selectGateSearchRadio(
                                    item.gateOutId,
                                    item.exBondBeNo
                                  )
                                }
                                value={item[0]}
                              />
                            </td>
                            <td>{item.gateOutId}</td>
                            <td>
                              {item.gateOutDate
                                ? format(
                                    new Date(item.gateOutDate),
                                    "dd/MM/yyyy HH:mm"
                                  )
                                : "N/A"}
                            </td>
                            <td>{item.gatePassNo}</td>
                            <td>
                              {item.gatePassDate
                                ? format(
                                    new Date(item.gatePassDate),
                                    "dd/MM/yyyy HH:mm"
                                  )
                                : "N/A"}
                            </td>
                            <td>{item.shift}</td>
                            <td>{item.exBondBeNo}</td>
                         
                            <td>{item.vehicleNo}</td>
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
              </Modal>
              {/* <hr /> */}
              <Row>

              
                <Col md={2}>
                 
                <Row>
                  <Col md={8}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="gateOutId">
                      Gate Out No
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="gateOutId"
                      name="gateOutId"
                      value={gateOut.gateOutId}
                      maxLength={27}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                    />
                  </FormGroup>
                </Col>

                <Col md={4} style={{ marginTop: 18 }}>
                  <button
                    className="btn btn-outline-primary btn-margin newButton"
                    style={{ marginRight: 9 }}
                    id="submitbtn2"
                    onClick={openGateSearchModal}
                  >
                    <FontAwesomeIcon
                      icon={faSearch}
                      // style={{ marginRight: "5px" }}
                    />
                    {/* Search */}
                  </button>
                </Col>
                </Row>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="gateNoIn">
                      Gate No <span className="error-message">*</span>
                    </label>
                    <Select
                      id="gateNoIn"
                      name="gateNoIn"
                      value={transOptions.find(
                        (option) => option.value === gateOut.gateNoIn
                      )}
                      onChange={(selectedOption) => {
                        setGateOut((prevNOC) => ({
                          ...prevNOC,
                          gateNoIn: selectedOption.value, // Assuming you want to update gateNoIn
                        }));
                        
                        setNocErrors((prev) => ({
                          ...prev,
                          gateNoIn: "", // Clear the error message
                        }));
                      }}
                      options={transOptions}
                      className="basic-single"
                      classNamePrefix="select"
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          height: 32, // Set height
                          minHeight: 32, // Set minimum height
                          //border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
                          border: nocErrors.gateNoIn
                            ? "1px solid red"
                            : "1px solid #ccc", // Red border on error
                          boxShadow: "none",
                          display: "flex",
                          alignItems: "center", // Align items vertically
                          padding: 0, // Remove padding to control height
                          "&:hover": {
                            border: "1px solid #ccc",
                          },
                          borderRadius: "6px", // Add border radius
                          "&:hover": {
                            border: "1px solid #ccc",
                          },
                        }),
                        valueContainer: (provided) => ({
                          ...provided,
                          height: "100%", // Full height of the control
                          display: "flex",
                          alignItems: "center", // Align items vertically
                          padding: "0 0.75rem", // Match padding
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          lineHeight: "32px", // Center text vertically
                        }),
                        indicatorSeparator: () => ({
                          display: "none",
                        }),
                        dropdownIndicator: () => ({
                          display: "none",
                        }),
                        placeholder: (provided) => ({
                          ...provided,
                          lineHeight: "32px", // Center placeholder text vertically
                          color: "gray",
                        }),
                        clearIndicator: (provided) => ({
                          ...provided,
                          padding: 2, // Remove padding
                          display: "flex",
                          alignItems: "center", // Align clear indicator vertically
                        }),
                      }}
                    />
                      <div style={{ color: "red" }} className="error-message">
                      {nocErrors.gateNoIn}
                    </div>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="gateOutDate"
                    >
                      Gate Out Date
                    </label>
                    <div style={{ position: "relative" }}>
                      <DatePicker
                        showTimeInput
                        selected={gateOut.gateOutDate}
                        onChange={handleGateOutDate}
                        id="gateOutDate"
                        name="gateOutDate"
                        dateFormat="dd/MM/yyyy HH:mm"
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
                    <label className="forlabel bold-label" htmlFor="shift">
                      Shift <span className="error-message">*</span>
                    </label>
                    <Select
                      id="shift"
                      name="shift"
                      value={shiftOptions.find(
                        (option) => option.value === gateOut.shift
                      )}
                      // onChange={(selectedOption) =>
                      //   setGateOut((prevNOC) => ({
                      //     ...prevNOC,
                      //     shift: selectedOption.value,
                      //   }))
                      // }

                      onChange={(selectedOption) => {
                        setGateOut((prevNOC) => ({
                          ...prevNOC,
                          shift: selectedOption.value,
                        }));

                        setNocErrors((prev) => ({
                          ...prev,
                          shift: "", // Clear the error message
                        }));
                      }}

                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          height: 32, // Set height
                          minHeight: 32, // Set minimum height
                          //border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
                          border: nocErrors.shift
                            ? "1px solid red"
                            : "1px solid #ccc", // Red border on error
                          boxShadow: "none",
                          display: "flex",
                          alignItems: "center", // Align items vertically
                          padding: 0, // Remove padding to control height
                          "&:hover": {
                            border: "1px solid #ccc",
                          },
                          borderRadius: "6px", // Add border radius
                          "&:hover": {
                            border: "1px solid #ccc",
                          },
                        }),
                        valueContainer: (provided) => ({
                          ...provided,
                          height: "100%", // Full height of the control
                          display: "flex",
                          alignItems: "center", // Align items vertically
                          padding: "0 0.75rem", // Match padding
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          lineHeight: "32px", // Center text vertically
                        }),
                        indicatorSeparator: () => ({
                          display: "none",
                        }),
                        dropdownIndicator: () => ({
                          display: "none",
                        }),
                        placeholder: (provided) => ({
                          ...provided,
                          lineHeight: "32px", // Center placeholder text vertically
                          color: "gray",
                        }),
                        clearIndicator: (provided) => ({
                          ...provided,
                          padding: 2, // Remove padding
                          display: "flex",
                          alignItems: "center", // Align clear indicator vertically
                        }),
                      }}
                      options={shiftOptions}
                      className="basic-single"
                      classNamePrefix="select"
                    />
                      <div style={{ color: "red" }} className="error-message">
                      {nocErrors.shift}
                    </div>
                  </FormGroup>
                </Col> */}
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="gatePassDate"
                    >
                      Gate Pass Date
                    </label>
                    <div style={{ position: "relative" }}>
                      <DatePicker
                        id="gatePassDate"
                        name="gatePassDate"
                        dateFormat="dd/MM/yyyy HH:mm"
                        showTimeSelect
                        selected={gateOut.gatePassDate}
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
                      id="viaNo"
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      maxLength={15}
                      name="createdBy"
                      value={gateOut.createdBy}
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
                      value={gateOut.status === "A" ? "Approved" : ""}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="exBondBeNo">
                      Ex Bond Be No <span className="error-message">*</span>
                    </label>
                    <Select
                      value={{
                        value: gateOut.exBondBeNo,
                        label: gateOut.exBondBeNo,
                      }}
                      onChange={handleExbondBeChange}
                      onInputChange={getExbondBeData}
                      options={exbondBeData}
                      placeholder="Select Port"
                      isClearable
                      id="exBondBeNo"
                      vesselName="exBondBeNo"
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          height: 32, // Set height
                          minHeight: 32, // Set minimum height
                          //border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
                          border: nocErrors.exBondBeNo
                            ? "1px solid red"
                            : "1px solid #ccc", // Red border on error
                          boxShadow: "none",
                          display: "flex",
                          alignItems: "center", // Align items vertically
                          padding: 0, // Remove padding to control height
                          "&:hover": {
                            border: "1px solid #ccc",
                          },
                          borderRadius: "6px", // Add border radius
                          "&:hover": {
                            border: "1px solid #ccc",
                          },
                        }),
                        valueContainer: (provided) => ({
                          ...provided,
                          height: "100%", // Full height of the control
                          display: "flex",
                          alignItems: "center", // Align items vertically
                          padding: "0 0.75rem", // Match padding
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          lineHeight: "32px", // Center text vertically
                        }),
                        indicatorSeparator: () => ({
                          display: "none",
                        }),
                        dropdownIndicator: () => ({
                          display: "none",
                        }),
                        placeholder: (provided) => ({
                          ...provided,
                          lineHeight: "32px", // Center placeholder text vertically
                          color: "gray",
                        }),
                        clearIndicator: (provided) => ({
                          ...provided,
                          padding: 2, // Remove padding
                          display: "flex",
                          alignItems: "center", // Align clear indicator vertically
                        }),
                      }}
                    />
                    <div style={{ color: "red" }} className="error-message">
                      {nocErrors.exBondBeNo}
                    </div>
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="sbRequestId"
                    >
                      Vehicle No <span className="error-message">*</span>
                    </label>
                    <Select
                      value={{
                        value: gateOut.vehicleNo,
                        label: gateOut.vehicleNo,
                      }}
                      onChange={handleVehicleChange}
                      //onFocus={getVehicleData}
                      //onInputChange={getVehicleNoData}

                      onFocus={() => {
                        if (gateOut.exBondBeNo) {
                          getVehicleData(gateOut.exBondBeNo); // Call `getVehicleData` with `exBondBeNo`
                        } else {
                        }
                      }}
                      onInputChange={(inputValue) => {
                        // Conditionally call the appropriate function
                        if (gateOut.exBondBeNo) {
                        } else {
                          getVehicleNoData(inputValue); // Otherwise, call `getVehicleNoData`
                        }
                      }}
                      options={vehicleData}
                      placeholder="Select Importer"
                      isClearable
                      id="vehicleNo"
                      name="vehicleNo"
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          height: 32, // Set height
                          minHeight: 32, // Set minimum height
                          //border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
                          border: nocErrors.vehicleNo
                            ? "1px solid red"
                            : "1px solid #ccc", // Red border on error
                          boxShadow: "none",
                          display: "flex",
                          alignItems: "center", // Align items vertically
                          padding: 0, // Remove padding to control height
                          "&:hover": {
                            border: "1px solid #ccc",
                          },
                          borderRadius: "6px", // Add border radius
                          "&:hover": {
                            border: "1px solid #ccc",
                          },
                        }),
                        valueContainer: (provided) => ({
                          ...provided,
                          height: "100%", // Full height of the control
                          display: "flex",
                          alignItems: "center", // Align items vertically
                          padding: "0 0.75rem", // Match padding
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          lineHeight: "32px", // Center text vertically
                        }),
                        indicatorSeparator: () => ({
                          display: "none",
                        }),
                        dropdownIndicator: () => ({
                          display: "none",
                        }),
                        placeholder: (provided) => ({
                          ...provided,
                          lineHeight: "32px", // Center placeholder text vertically
                          color: "gray",
                        }),
                        clearIndicator: (provided) => ({
                          ...provided,
                          padding: 2, // Remove padding
                          display: "flex",
                          alignItems: "center", // Align clear indicator vertically
                        }),
                      }}
                    />
                    <div style={{ color: "red" }} className="error-message">
                      {nocErrors.vehicleNo}
                    </div>
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="deliveryOrderNo"
                    >
                      Delivery Order No <span className="error-message">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="deliveryOrderNo"
                      maxLength={15}
                      name="deliveryOrderNo"
                      value={gateOut.deliveryOrderNo}
                      onChange={handlegateOutChange}
                      style={{
                        border: nocErrors.deliveryOrderNo
                          ? "1px solid red"
                          : "1px solid #ccc", // Red border on error
                      }}
                    />
                    <div style={{ color: "red" }} className="error-message">
                      {nocErrors.deliveryOrderNo}
                    </div>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="deliveryOrderDate"
                    >
                      Delivery Order Date
                    </label>

                    <div style={{ position: "relative" }}>
                      <DatePicker
                        showTimeInput
                        selected={gateOut.deliveryOrderDate}
                        onChange={handleNocTransDate}
                        id="deliveryOrderDate"
                        name="deliveryOrderDate"
                        dateFormat="dd/MM/yyyy HH:mm"
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: "100%" }} />}
                        wrapperClassName="custom-react-datepicker-wrapper"
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            border: nocErrors.vehicleNo ? "1px solid red" : "1px solid #ccc", // Red border on error
                          }),
                        }}
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
                        <div style={{ color: "red" }} className="error-message">
                      {nocErrors.deliveryOrderDate}
                    </div>
                    </div>
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="doValidityDate"
                    >
                      DO Validity Date
                    </label>
                    <div style={{ position: "relative" }}>
                      <DatePicker
                        showTimeInput
                        selected={gateOut.doValidityDate}
                        onChange={handleDoValidityDate}
                        id="doValidityDate"
                        name="doValidityDate"
                        dateFormat="dd/MM/yyyy HH:mm"
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: "100%" }} />}
                        wrapperClassName="custom-react-datepicker-wrapper"
                        minDate={gateOut.deliveryOrderDate}
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
                      value={gateOut.approvedBy}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="driverContactNo"
                    >
                      Driver Contact No
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="driverContactNo"
                      name="driverContactNo"
                      maxLength={10}
                      value={gateOut.driverContactNo}
                      onChange={handlegateOutChange}
                    />
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="profitcentreId"
                    >
                      Profitcentre
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="profitcentreId"
                      name="profitcentreId"
                      maxLength={15}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      value={
                        gateOut.profitcentreId === "N00003" ? "CFS Bond" : ""
                      }
                    />
                    <div style={{ color: "red" }} className="error-message">
                      {nocErrors.profitcentreId}
                    </div>
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="transporterStatus"
                    >
                      Transporter Status
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="transporterStatus"
                      name="transporterStatus"
                      maxLength={15}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      value={gateOut.transporterStatus ==="C" ? "Contract" :gateOut.transporterStatus ==="P" ? "Private" : ""}
                      onChange={handlegateOutChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="transporterName"
                    >
                      Transporter Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="transporterName"
                      maxLength={15}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      name="transporterName"
                      value={gateOut.transporterName}
                      onChange={handlegateOutChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="transporter"
                    >
                      Transporter
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="transporter"
                      name="transporter"
                      maxLength={15}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      value={gateOut.transporter}
                    />
                    <div style={{ color: "red" }} className="error-message">
                      {nocErrors.transporter}
                    </div>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="transType">
                      Trans Type
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="transType"
                      maxLength={15}
                      name="transType"
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      value={
                        gateOut.transType === "CR"
                          ? "Cargo"
                          : gateOut.transType === "SL"
                          ? "Sample Slip"
                          : ""
                      }
                      onChange={handlegateOutChange}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="sl">
                      Shipping Line
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="sl"
                      maxLength={15}
                      name="sl"
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      value={gateOut.sl}
                      onChange={handlegateOutChange}
                    />
                    <div style={{ color: "red" }} className="error-message">
                      {nocErrors.sl}
                    </div>
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="driverName">
                      Driver Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="driverName"
                      name="driverName"
                      maxLength={15}
                      readOnly
                      style={{ backgroundColor: "#E0E0E0" }}
                      value={gateOut.driverName}
                    />
                    <div style={{ color: "red" }} className="error-message">
                      {nocErrors.driverName}
                    </div>
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="licenceNo">
                      Licence No
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="licenceNo"
                      maxLength={15}
                      name="licenceNo"
                      value={gateOut.licenceNo}
                      onChange={handlegateOutChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="comments">
                      Comments
                    </label>
                    <Input
                      className="form-control"
                      type="textarea"
                      id="comments"
                      maxLength={153}
                      name="comments"
                      value={gateOut.comments}
                      onChange={handlegateOutChange}
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
                  style={{
                    marginRight: 10,
                    backgroundColor: gateInStatus === "A" ? "#E0E0E0" : "", // Change background color if disabled
                    cursor: gateInStatus === "A" ? "not-allowed" : "pointer", // Change cursor style if disabled
                  }}
                  id="submitbtn2"
                  onClick={handleSave}
                  // disabled={gateInStatus === "A"}
                  disabled={gateOut.status === "A"}
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

                {/* <button
                  className="btn btn-outline-success btn-margin newButton"
                  style={{ marginRight: 10 }}
                  id="submitbtn2"
                  onClick={handleAddRow}
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ marginRight: "5px" }}
                  />
                  Add Details
                </button> */}
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
                  paddingLeft: "4%",
                  paddingRight: "-18px",
                }}
              >
                <FontAwesomeIcon
                  icon={faTruckFast}
                  style={{
                    marginRight: "8px",
                    color: "black",
                  }}
                />
                Bond Gate Out Details
              </h5>
              <table className="table table-bordered table-hover tableHeader">
                <thead className="tableHeader">
                  <tr>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Sr No
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      NOC No/Line No
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Cargo
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Nature Of Cargo
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
                      No Of Packages
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ color: "black" }}
                    >
                      Qty Taken Out
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {commodityDtldata.map((rowData, index) => (
                    <tr key={index}>
                      <td  style={{ textAlign:'center' }}>{index + 1}</td>
                      {/* <td>{`${rowData.nocNo}-${rowData.igmLineNo}`}</td> */}
                      <td style={{ textAlign:'center' }}>{rowData.nocNo || rowData.docRefNo}</td>
                      <td style={{ textAlign:'center' }}>{rowData.commodityDescription || rowData.commodityDescription}</td>
                      <td style={{ textAlign:'center' }}>{rowData.approvedBy || rowData.natureOfCargo}</td>
                      <td style={{ textAlign:'center' }}>{rowData.grossWt}</td>
                      <td style={{ textAlign:'center' }}>{rowData.noOfPackage || rowData.actualNoOfPackages}</td>
                      <td style={{ textAlign:'center' }}>{rowData.qtyTakenOut}</td>
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

export default ExBondGateOutCargo;
