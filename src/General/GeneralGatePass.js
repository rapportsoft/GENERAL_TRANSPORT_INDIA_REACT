import AuthContext from "../Components/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import Select, { components } from 'react-select';
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
  Button
} from "reactstrap";
import { Pagination } from "react-bootstrap";
import { format } from "date-fns";
import { CatchingPokemonSharp } from "@mui/icons-material";
import Swal from "sweetalert2";
// import { format } from "date-fns";

function GeneralGatePass({ acttab, listOfData, listOfGatePass, listOfExbond, flag, onRequest }) {
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
  const [gridFlag, setGridFlag] = useState("add");
  const initialGatePass = {
    companyId: companyid,
    branchId: branchId,
    gatePassId: "",
    srNo: "",
    depositNo: "",
    boeNo: "",
    gatePassDate: new Date(),
    jobNo: "",
    jobTransId: "",
    commodityId: "",
    actCommodityId: "",
    typeOfPackage: "",
    commodityDescription: "",
    profitCentreId: "N00008",
    deliveryId: "",
    invoiceNo: "",
    invoiceDate: new Date(),
    gateOutId: "",
    gateOutDate: new Date(),
    shift: "DAY",
    transType: "CR",
    importerName: "",
    containerNo: "",
    boeDate: new Date(),
    grossWeight: "",
    receivingPackages: "",
    receivingWeight: "",
    deliveredPackages: "",
    deliveredWeight: "",
    transporterName: "",
    vehicleNo: "",
    driverName: "",
    comments: "",
    gatePassPackages: "",
    gatePassWeight: "",
    status: "",
    createdBy: "",
    createdDate: new Date(),
    editedBy: "",
    editedDate: new Date(),
    approvedBy: "",
    approvedDate: new Date(),
    botplRecptNo: "",
    prevQtyTakenOut: "",
    containerNo: "",
    handlingPerson: "",
  };


  const [gatePass, setGatePass] = useState(initialGatePass);

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
  // const [cSearchedData, setCHASearchedData] = useState([]);

  const searchGate = (id) => {
    setLoading(true);
    axios
      .get(
        `${ipaddress}api/gatepasscontroller/dataAllDataOfGatePass?companyId=${companyid}&branchId=${branchId}&partyName=${id}`,
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

  //  console.log("*********************************************************************");
  //  console.log("*********************************************************************",acttab);
  //  console.log("*********************************************************************",listOfGatePass);
  //  console.log("*********************************************************************",acttab);
  useEffect(() => {
    if (acttab === "P01805") {
      if (listOfGatePass.gatePassId && listOfGatePass.deliveryId) {
        selectGateSearchRadio(listOfGatePass.gatePassId, listOfGatePass.deliveryId);
      }
      else {
        getExbondBeData(listOfExbond.deliveryId);
      }
      if (flag) {
        handleClear();
      }
    }
  }, [listOfGatePass.gatePassId, listOfGatePass.deliveryId, acttab]);



  const selectGateSearchRadio = (
    gateInId,
    exBondBeNo,
  ) => {
    closeGateSearchModal();
    axios
      .get(
        `${ipaddress}api/gatepasscontroller/list?companyId=${companyid}&branchId=${branchId}&gatePassId=${gateInId}&exBondBeNo=${exBondBeNo}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        setNocFlag("edit");
        const data = response.data;
        const firstItem = response.data[0]; // Get the first item from the list
        console.log("getDataByPartyIdAndGstNo", data);

        setGatePass(firstItem);
        setDisplayItems(response.data);
        setRowData(data);
        setSelectedItems(data);

        const updatedRowData = data.map((item, index) => ({

          companyId: companyid,
          branchId: branchId,
          nocNo: item.nocNo,
          deliveryId: item.deliveryId,
          boeNo: item.boeNo,
          srNo: item.srNo,
          boeDate: item.boeDate,
          commodityId: item.commodityId,
          commodityDescription: item.commodityDescription,
          deliveredPackages: item.deliveredPackages,
          deliveredWeight: item.deliveredWeight,
          receivingPackages: item.receivingPackages,
          receivingWeight: item.receivingWeight,
          gatePassPackages: item.gatePassPackages,
          gatePassWeight: item.gatePassWeight,
          deliveryId: item.deliveryId,
          receivingId: item.receivingId,
          bondingNo: item.bondingNo,
          gatePassId: item.gatePassId,
          jobNo: item.jobNo,
          jobTransId: item.jobTransId,
          gatePassDate: item.gatePassDate,
          typeOfPackage: item.typeOfPackage,
          containerNo: item.containerNo,
          actCommodityId: item.actCommodityId,
          depositNo: item.depositNo,
          delSrNo: item.delSrNo

        }));
        console.log("updated row data ", updatedRowData);
        setRows(updatedRowData);
      })
      .catch((error) => { });
  };

  const [CHASearchId, setCHASearchId] = useState("");

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

  const handleGatePassChange = (e) => {
    const { name, value } = e.target;

    setGatePass((prevNOC) => {
      const updatedNOC = {
        ...prevNOC,
        [name]: value,
      };

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
    setGatePass((prevNoc) => ({
      ...prevNoc,
      gatePassDate: date,
    }));
  };

  const [nocErrors, setNocErrors] = useState({
    driverName: "",
    vehicleNo: "",
    shift: "",
    cha: "",
  });

  const handleSave = () => {
    // Save the data (e.g., send it to a server)
    setLoading(true);
    console.log("Data saved:", gatePass);
    let errors = {};

    // if(gatePass.status === 'N')
    // {
    //   setLoading(false);
    //   toast.info("Record is alredy saved go for approve.", {
    //       autoClose: 1000
    //   })
    //   return;
    // }
    if (gatePass.status === 'A') {
      setLoading(false);
      toast.info("Record is alredy approved.", {
        autoClose: 1000
      })
      return;
    }
    const validateField = (fieldId, fieldValue, errorMessage) => {

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

    validateField("driverName", gatePass.driverName, "Dervier Name is required.");
    validateField("vehicleNo", gatePass.vehicleNo, "Vehicle no is required.");
    validateField("shift", gatePass.shift, "shift is required.");



    if (Object.keys(errors).length > 0) {
      setNocErrors(errors);
      setLoading(false);
      toast.error("Please fill in the required fields.", {
        autoClose: 1000
      })
      return;
    }

    // Validate Vehicle No
    if (!gatePass.vehicleNo) {
      errors.vehicleNo = 'Vehicle No is required';
      return;
    }

    // Validate Driver Name
    if (!gatePass.driverName) {
      errors.driverName = 'Driver Name is required';
      return;
    }



    setNocErrors(errors);

    if (!validateInputs()) {

      setLoading(false);
      toast.error("Please correct the errors in the table.", {
        autoClose: 1000
      });
      return;
    }

    // setLoading(false);

    const isValid = rows.every((row) => {
      // Check if qtyTakenout and boeNo fields are non-empty
      return ['gatePassPackages', 'boeNo'].every((key) => row[key] !== "");
    });

    if (!isValid) {
      // toast.error("Please fill in the required fields (qtyTakenout and boeNo) before saving.");


      toast.error("Please fill in the required fields (qtyTakenout and boeNo) before saving.", {
        position: 'top-center',
        autoClose: 3000,
        style: { width: `29vw` },
      });
      return;
    }

    // Perform further processing or API call
    const requestBody = {
      gatePass: {
        ...gatePass,
      },
      dtl: {
        ...rows,
      },
    };

    console.log("request body", requestBody);
    axios
      .post(
        `${ipaddress}api/gatepasscontroller/saveDataOfGatePassAndGatePassDtl?companyId=${companyid}&branchId=${branchId}&user=${userId}&flag=${nocFlag}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        const firstItem = response.data[0]; // Get the first item from the list
        setGatePass(firstItem); // Set the first item
        console.log("Data save successfully!! Response ", response.data);


        const updatedRowData = data.map((item, index) => ({

          companyId: companyid,
          branchId: branchId,
          jobNo: item.jobNo,
          deliveryId: item.deliveryId,
          boeNo: item.boeNo,
          srNo: item.srNo,
          boeDate: item.boeDate,
          jobTransId: item.jobTransId,
          commodityId: item.commodityId,
          commodityDescription: item.commodityDescription,
          deliveredPackages: item.deliveredPackages,
          deliveredWeight: item.deliveredWeight,
          noOfPackage: item.noOfPackage,
          gatePassPackages: item.gatePassPackages,
          gatePassWeight: item.gatePassWeight,
          deliveryId: item.deliveryId,
          receivingId: item.receivingId,
          depositNo: item.depositNo,
          receivingPackages: item.receivingPackages,
          receivingWeight: item.receivingWeight,
          gatePassId: item.gatePassId,
          containerNo: item.containerNo,
          typeOfPackage: item.typeOfPackage,
          actCommodityId: item.actCommodityId,
          delSrNo: item.delSrNo

        }));
        console.log("updated row data ", updatedRowData);
        setRows(updatedRowData);
        setNocFlag("edit");
        toast.success("Data save successfully!!", {
          autoClose: 800,
        });
        onRequest();
        setLoading(false);
        setNocFlag("edit");
      })
      .catch((error) => {
        setLoading(false);

      }).finally(() => {
        setLoading(false);
      });
  };




  const handleSubmit = () => {
    setLoading(true);
    let errors = {};
    if (gatePass.status === 'A') {
      setLoading(false);
      toast.info("Record is alredy approved.", {
        autoClose: 1000
      })
      return;
    }
    console.log("Saved Data:", rows);
    // Perform further processing or API call
    const requestBody = {
      gatePass: {
        ...gatePass,
      },
      dtl: {
        ...rows,
      },
    };

    console.log("request body", requestBody);

    axios
      .post(
        `${ipaddress}api/gatepasscontroller/approve?companyId=${companyid}&branchId=${branchId}&user=${userId}&flag=${userId}`,
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
          setGatePass((pre) => ({
            ...pre,
            status: response.data.status,
          }))
          // onRequest();
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
      }).finally(() => {
        setLoading(false);
      });


    console.log("Data saved successfully:", requestBody);
  };
  const handleClear = () => {
    setPortId("");
    setPortName("");
    setImpName('');
    setErrorsTable('');
    setGatePass(initialGatePass);
    setSelectedSACCode(null);
    setRows([]);
    document.getElementById("driverName").classList.remove("error-border");
    document.getElementById("cha").classList.remove("error-border");
    document.getElementById("importerName").classList.remove("error-border");
    document.getElementById("vehicleNo").classList.remove("error-border");
    setNocErrors("");
    setNocFlag("add");
    setGridFlag("add")
    setChaName("");
    setSelectedItems([]);
    setDisplayItems([]);
  };

  const [modal, setModal] = useState(false);

  const defaultOption = { value: "N00003", label: "NOC BOND" };

  const handleChangeProfitCenter = (selectedOption) => {
    // Update the state or handle the change as needed
    setGatePass((prevState) => ({
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
      yardQtyTakenOut: "",
      yardAreaReleased: "",
    }))
  );

  const handleInputChangeTable = (index, field, value) => {
    setRowData((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = { ...updatedValues[index], [field]: value };
      return updatedValues;
    });
    setErrorsTable((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      if (value) {
        delete updatedErrors[index];
      }
      return updatedErrors;
    });
  };


  const [selectedSACCode, setSelectedSACCode] = useState("");
  const [SACCODE, setSACCODE] = useState([]);

  useEffect(() => {
    fetch(`${ipaddress}api/gatepasscontroller/jarIdList/J00073/${companyid}`)
      .then((response) => response.json())
      .then((data) => setSACCODE(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const onChangeInputSACCODE = (e) => {
    // setFormErrors((prevErrors) => ({
    //   ...prevErrors,
    //   [e.target.name]: "",
    // }));
    setSelectedSACCode(e.target.value);
    setGatePass({
      ...gatePass,
      handlingPerson: e.target.value
    })
    // setErrors("");
  };


  const handleDoDate = (date) => {
    setGatePass((prevNoc) => ({
      ...prevNoc,
      deliveryOrderDate: date,
      // Only set doValidityDate to null if it's less than the selected deliveryOrderDate
      doValidityDate:
        prevNoc.doValidityDate && prevNoc.doValidityDate < date
          ? null
          : prevNoc.doValidityDate,
    }));


    setNocErrors((prevErrors) => ({
      ...prevErrors,
      deliveryOrderDate: "",
    }));
    setSelectedDate(date); // Make sure selectedDate is updated
  };

  const handleDoValidityDate = (date) => {
    setGatePass((prevNoc) => ({
      ...prevNoc,
      doValidityDate: date,
      // deliveryOrderDate: prevNoc.deliveryOrderDate && prevNoc.deliveryOrderDate > date ? null : prevNoc.deliveryOrderDate,
    }));

    setNocErrors((prevErrors) => ({
      ...prevErrors,
      doValidityDate: "",
    }));
    setSelectedDate(date); // Make sure selectedDate is updated
  };
  const validateInputs = () => {
    const newErrors = {};

    rows.forEach((item, index) => {
      const qtyTakenIn =
        parseFloat(item.gatePassPackages) || parseFloat(item.gatePassPackages) || 0;
      const nocPackages =
        parseFloat(item.deliveredPackages) ||
        parseFloat(item.deliveredPackages) ||
        0;


      const yardQtyTakenIn =
        parseFloat(item.yardQtyTakenOut) || parseFloat(item.yardQtyTakenOut) || 0;


      const commodity = item.commodityId?.trim(); // Check if commodity exists and trim any spaces
      const boeNo = item.deliveryId?.trim(); // Check if boeNo exists and trim any spaces


      console.log("qtyTakenIn________________________________", qtyTakenIn);

      console.log("nocPackages________________________________", nocPackages);

      if (isNaN(qtyTakenIn) || qtyTakenIn <= 0) {
        newErrors[index] =
          "Qty Taken Out is required and must be greater than 0.";
      } else if (qtyTakenIn > nocPackages) {
        newErrors[index] = "Qty Taken Out cannot be greater than exbond pkgs.";
      }

      if (!commodity) {
        newErrors[`commodityIdError_${index}`] = "Commodity* is required and cannot be empty.";
      }

      // Validate boeNo
      if (!boeNo) {
        newErrors[`deliveryIdError_${index}`] = "BOE No* is required and cannot be empty.";
      }
    });

    setErrorsTable(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateQtyTakenIn = (
    index,
    qtyTakenIn,
    nocPackages,
    gateInPackages
  ) => {
    console.log("Validating:", qtyTakenIn, nocPackages, gateInPackages); // Debugging
    const qtyTaken = qtyTakenIn ? parseFloat(qtyTakenIn) : 0;
    const nocPackagesVal = nocPackages ? parseFloat(nocPackages) : 0;
    const gateInPackagesVal = gateInPackages ? parseFloat(gateInPackages) : 0;

    if (qtyTaken > nocPackagesVal - gateInPackagesVal) {
      setErrorsTable((prevErrors) => ({
        ...prevErrors,
        [index]:
          "Qty Taken In cannot be greater than No Of Pack minus Gate In Pack",
      }));
    } else {
      setErrorsTable((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[index];
        return newErrors;
      });
    }
    console.log("Errors Table:", errorsTable); // Debugging
  };

  const [portData, setPortData] = useState([]);
  const [portId, setPortId] = useState("");
  const [portName, setPortName] = useState("");

  const [vehicleData, setVehicleData] = useState([]);
  const handleVehicleChange = async (selectedOption, { action }) => {
    if (action === "clear") {
      console.log("respone datacagahgdhsagdhs", selectedOption);

      setGatePass((pre) => ({
        ...pre,
        vehicleNo: "",
        driverName: "",
        transporterName: "",
        transporterStatus: "",
        transporter: "",
        vehGateInId: "",
      }));
      document.getElementById("vehicleNo").classList.remove("error-border");
      setNocErrors((prevErrors) => ({
        ...prevErrors,
        ["vehicleNo"]: "",
      }));

      // Clear the error for CHA when a valid value is selected
      setNocErrors((prevErrors) => ({
        ...prevErrors,
        vehicleNo: selectedOption ? '' : prevErrors.portId // Clear error if a value is selected
      }));
    } else {
      console.log("respone datacagahgdhsagdhs", selectedOption);

      setGatePass((pre) => ({
        ...pre,

        vehicleNo: selectedOption ? selectedOption.value : "",
        vehicleNo: selectedOption ? selectedOption.label : "",
        driverName: selectedOption ? selectedOption.dname : "",
        transporterName: selectedOption ? selectedOption.tname : "",
        transporterStatus: selectedOption ? selectedOption.tstatus : "",
        transporter: selectedOption ? selectedOption.transporter : "",
        vehGateInId: selectedOption ? selectedOption.vehGateInId : "",
      }));

      document.getElementById("vehicleNo").classList.remove("error-border");
      setNocErrors((prevErrors) => ({
        ...prevErrors,
        ["vehicleNo"]: "",
      }));



      setNocErrors((prevErrors) => ({
        ...prevErrors,
        vehicleNo: selectedOption ? '' : prevErrors.portId // Clear error if a value is selected
      }));
    }
  };

  const getVehicleData = (val) => {
    if (val === "") {
      setVehicleData([]);
      return;
    }

    axios
      .get(
        `${ipaddress}api/cfbondgatepass/emptyVehicles?companyId=${companyid}&branchId=${branchId}&vehicleNo=${val}`,
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
          dname: port[2],
          tname: port[3],
          tstatus: port[4],
          transporter: port[5],
          vehGateInId: port[1],
        }));
        setVehicleData(portOptions);
      })
      .catch((error) => { });
  };
  const [impId, setImpId] = useState("");
  const [impName, setImpName] = useState("");

  const [impData, setImpData] = useState([]);
  const handleImpChange = async (selectedOption, { action }) => {
    if (action === "clear") {
      console.log("respone datacagahgdhsagdhs", selectedOption);
      setImpName("");
      setImpId("");
      setGatePass((pre) => ({
        ...pre,
        importerAddress1: "",
        importerAddress2: "",
        importerAddress3: "",
        importerName: "",
        cha: "",
        chaName: "",
      }));
      document.getElementById("importerName").classList.remove("error-border");
      setNocErrors((prevErrors) => ({
        ...prevErrors,
        ["importerName"]: "",
      }));
    } else {
      console.log("respone datacagahgdhsagdhs", selectedOption);
      setImpName(selectedOption ? selectedOption.name : "");
      setImpId(selectedOption ? selectedOption.value : "");
      setGatePass((pre) => ({
        ...pre,
        importerAddress1: selectedOption ? selectedOption.add1 : "",
        importerAddress2: selectedOption ? selectedOption.add2 : "",
        importerAddress3: selectedOption ? selectedOption.add3 : "",
        importerName: selectedOption ? selectedOption.name : "",
      }));

      document.getElementById("importerName").classList.remove("error-border");
      setNocErrors((prevErrors) => ({
        ...prevErrors,
        ["importerName"]: "",
      }));
    }
  };

  const getImpData = (val) => {

    // if (val === "") {
    //   setImpData([]);
    //   return;
    // }

    axios
      .get(
        // `${ipaddress}api/cfexbondcrg/getDataOfImporter?companyId=${companyid}&branchId=${branchId}&cha=${portId}&value=${val}`,
        `${ipaddress}api/cfexbondcrg/getDataOfImporter?companyId=${companyid}&branchId=${branchId}&cha=${portId}`,
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
          value: port[0], // Importer ID
          // label: port[1]+'-'+ port[2]+','+port[3]+','+port[4], 
          label: (
            <span>
              <strong>{port[1]}</strong> - {port[2]}, {port[3]}, {port[4]}
            </span>
          ),
          name: port[1],
          add1: port[2], // Address 1
          add2: port[3], // Address 2
          add3: port[4], // Address 3
        }));
        setImpData(portOptions);
      })
      .catch((error) => {
        console.error("Error fetching importer data", error);
      });
  };

  const [impAddData, setImpAddData] = useState([]);
  useEffect(() => {
    getImpAddress();
  }, [impId]);

  const getImpAddress = () => {
    axios
      .get(
        `${ipaddress}api/cfexbondcrg/getAddressOfImporter?companyId=${companyid}&branchId=${branchId}&partyId=${impId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;

        console.log("response.data", data);
        const addressOptions = data.map((port) => ({
          value: port[0], // Assuming `srNo` is the unique identifier
          label: port[1], // Display this field in the dropdown
          add1: port[1], // Address 1
          add2: port[2], // Address 2
          add3: port[3], // Address 3
        }));
        setImpAddData(addressOptions);
      })
      .catch((error) => {
        console.error("Error fetching address data", error);
      });
  };

  const handleImpAddress = (selectedOption) => {
    if (selectedOption) {
      const selectedAddress = impAddData.find(
        (option) => option.value === selectedOption.value
      );
      setGatePass((prev) => ({
        ...prev,
        importerAddress1: selectedAddress ? selectedAddress.add1 : "",
        importerAddress2: selectedAddress ? selectedAddress.add2 : "",
        importerAddress3: selectedAddress ? selectedAddress.add3 : "",
      }));
    } else {
      setGatePass((prev) => ({
        ...prev,
        importerAddress1: "",
        importerAddress2: "",
        importerAddress3: "",
      }));
    }
  };
  const [selectedDate, setSelectedDate] = useState(new Date());




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
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms, remove the row
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
        Swal.fire("Deleted!", "Your row has been deleted.", "success");
      }
    });
  };


  const handleTextChange = (index, field, event) => {
    const { value } = event.target;
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    const updatedErrors = { ...errors };

    const currentRow = updatedRows[index];
    const perPackageWeight = (currentRow.deliveredWeight || 0) / (currentRow.deliveredPackages || 1); // Avoid division by zero

    // Check if the input value is a valid number, otherwise default to 0
    const validValue = parseFloat(currentRow.gatePassPackages) ? parseFloat(currentRow.gatePassPackages) : 0;


    if (field === "gatePassPackages") {
      // Calculate per package weight and update inbondGrossWt
      const perPackageWeight = currentRow.deliveredWeight / currentRow.deliveredPackages;
      updatedRows[index].gatePassWeight = (
        perPackageWeight * parseFloat(value)
      ).toFixed(2);

    }


    let addition;

    if (gatePass.gatePassId) {
      addition = currentRow.deliveredPackages;
    } else {
      // addition= parseFloat(updatedRows[index].deliveredPackages || 0) - parseFloat(updatedRows[index].gatePassPackages || 0);
      addition = currentRow.deliveredPackages - parseFloat(updatedRows[index].outQty || 0);
    }


    // if (
    //   field === "gatePassPackages" &&
    //   // parseFloat(value) > parseFloat(updatedRows[index].exBondedPackages) 
    //   parseFloat(value) > (addition)

    // ) {
    //   if (!updatedErrors.gatePassPackages) {
    //     updatedErrors.gatePassPackages = [];
    //   }
    //   // const remainingBondedPackages =
    //   // parseFloat(updatedRows[index].deliveredPackages || 0) -
    //   // parseFloat(updatedRows[index].gatePassPackages || 0);

    // updatedErrors.gatePassPackages[index] = `Quantity taken out cannot exceed remaining packages (Max: ${addition})`;
    // } 

    console.log("updatedRows[index].outQty   ", updatedRows[index].outQty);
    if (
      field === "gatePassPackages" &&
      // parseFloat(value) > parseFloat(updatedRows[index].exBondedPackages) 
      parseFloat(value) >
      parseFloat(updatedRows[index].deliveredPackages || 0) -
      parseFloat(updatedRows[index].outQty || 0)
    ) {
      if (!updatedErrors.gatePassPackages) {
        updatedErrors.gatePassPackages = [];
      }
      const remainingBondedPackages =
        parseFloat(updatedRows[index].deliveredPackages || 0) -
        parseFloat(updatedRows[index].outQty || 0);

      updatedErrors.gatePassPackages[index] = `Quantity taken out cannot exceed remaining packages (Max: ${remainingBondedPackages})`;
    }

    else if (field === "gatePassPackages") {
      if (updatedErrors.gatePassPackages) {
        updatedErrors.gatePassPackages[index] = ""; // Clear the error if validation passes
      }

      setErrorsTable(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[index];
        return newErrors;
      });
    }
    setRows(updatedRows);
    setErrors(updatedErrors);
  };



  const initialRow = {
    srNo: 1,
    companyId: companyid,
    branchId: branchId,
    jobNo: "",
    jobTransId: "",
    deliveryId: "",
    boeNo: "",
    boeDate: "",
    srNo: "",
    boeDate: "",
    commodityId: "",
    commodityDescription: "",
    depositNo: "",
    deliveredPackages: "",
    actCommodityId: "",
    typeOfPackage: "",
    deliveredWeight: "",
    gatePassPackages: "",
    gatePassWeight: "",
    deliveryId: "",
    receivingId: "",
    receivingPackages: "",
    receivingWeight: "",
    containerNo: "",
    delSrNo: 0
  };

  const [rows, setRows] = useState([initialRow]);


  useEffect(() => {
    if (rows.length === 0) {
      setRows([initialRow]); // Initialize with one initial row
    }
  }, [rows]);


  const [exbondBeData, setExbondbeData] = useState([]);
  const [exbondBeNo, setExbondBeNo] = useState("");

  const handleExbondBeChange = (index, selectedOption) => {
    const updatedRows = [...rows];

    // updatedRows[index].boeNo = selectedOption ? selectedOption.boe : '';

    // Clear error if boeNo is corrected
    const updatedErrors = { ...errorsTable };
    if (selectedOption && updatedErrors[`deliveryIdError_${index}`]) {
      delete updatedErrors[`deliveryIdError_${index}`];
    }
    setErrorsTable(updatedErrors);

    // if (selectedOption && selectedOption.status !== "A") {
    //   // Show error message (you can replace this with your own method like a toast or a modal)
    //   toast.error("Record is not approved. Please submit this record in the Exbond screen.",{
    //     position:'top-center',
    //     autoClose:9000,
    //   })
    //   // You can also return here if you don't want to proceed further
    //   return;
    // }



    if (selectedOption) {

      const value = selectedOption ? selectedOption.value : "";
      const label = selectedOption ? selectedOption.label : "";
      updatedRows[index].deliveryId = selectedOption.value;
      updatedRows[index].deliveryId = selectedOption.label;
      updatedRows[index].jobNo = selectedOption.jobNo;
      updatedRows[index].boeNo = selectedOption.boeNo;
      updatedRows[index].commodityId = selectedOption.commo;
      updatedRows[index].jobTransId = selectedOption.trans;
      updatedRows[index].receivingId = selectedOption.receivingId;
      updatedRows[index].status = selectedOption.status;
      updatedRows[index].boeDate = selectedOption.boeDate;
      updatedRows[index].depositNo = selectedOption.depositNo;


      updatedRows[index].outQty = "";
      updatedRows[index].commodityId = "";
      updatedRows[index].commodityDescription = "";
      updatedRows[index].deliveredPackages = "";
      updatedRows[index].receivingPackages = "";
      updatedRows[index].receivingId = "";
      updatedRows[index].deliveredWeight = "";
      updatedRows[index].gatePassPackages = "";
      updatedRows[index].gatePassWeight = "";
      updatedRows[index].actCommodityId = "";
      updatedRows[index].typeOfPackage = "";
      updatedRows[index].receivingWeight = "";
      updatedRows[index].containerNo = "";
      setExbondBeNo(value);

      setExbondCommodityData("");
      getExbondCargoData(value, '');

    } else {
      updatedRows[index].outQty = "";
      updatedRows[index].deliveryId = "";
      updatedRows[index].deliveryId = "";
      updatedRows[index].jobNo = "";
      updatedRows[index].boeNo = "";
      updatedRows[index].commodityId = "";
      updatedRows[index].jobTransId = "";
      updatedRows[index].bondingNo = "";
      updatedRows[index].areaAllocated = "";
      updatedRows[index].commodityId = "";
      updatedRows[index].commodityDescription = "";
      updatedRows[index].deliveredPackages = "";
      updatedRows[index].receivingPackages = "";
      updatedRows[index].receivingWeight = "";
      updatedRows[index].deliveryId = "";
      updatedRows[index].receivingId = "";
      updatedRows[index].noOfPackage = "";
      updatedRows[index].deliveredWeight = "";
      updatedRows[index].jobTransId = "";
      updatedRows[index].gatePassPackages = "";
      updatedRows[index].gatePassWeight = "";
      updatedRows[index].boeDate = "";
      updatedRows[index].actCommodityId = "";
      updatedRows[index].typeOfPackage = "";
      updatedRows[index].depositNo = "";
      updatedRows[index].containerNo = "";
      setExbondBeNo("");
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
        `${ipaddress}api/gatepasscontroller/getAllDataFormDeliveryDetails?companyId=${companyid}&branchId=${branchId}&value=${val}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;

        // Use Map to ensure unique port[0] values
        const uniquePortMap = new Map();

        data.forEach((port) => {
          if (!uniquePortMap.has(port[0])) {
            uniquePortMap.set(port[0], {
              value: port[0],
              label: port[0],
              jobNo: port[1],
              boeNo: port[2],
              commo: port[3],
              trans: port[4],
              receivingId: port[5],
              status: port[6],
              boeDate: port[7],
              depositNo: port[8]
            });
          }
        });
        // Convert Map values to array
        const portOptions = Array.from(uniquePortMap.values());

        setExbondbeData(portOptions);


        if (listOfExbond.deliveryId) {
          handleExbondBeChange(portOptions[0], { action: "select" });
        }

      })
      .catch((error) => { });
  };


  const CustomOptionDo = (props) => {
    return (
      <components.Option {...props}>
       <span style={{ fontWeight: 'bold' }}> {props.data.label} - JO - </span> {props.data.jobNo} <span style={{ fontWeight: 'bold' }}> - BE - </span> {props.data.boeNo}



        {/* {props.data.containerNo ? (
          <span style={{ fontWeight: 'bold' }}>
            {" - " + props.data.containerNo}
          </span>
        ) : null} */}
      </components.Option>
    );
  };






  const [exbondCommodityData, setExbondCommodityData] = useState([]);

  const handleExbondCargoDataChange = (index, selectedOption) => {
    const updatedRows = [...rows];

    updatedRows[index].commodityId = selectedOption ? selectedOption.commodityId : '';

    // Clear error if commodity is corrected
    const updatedErrors = { ...errorsTable };
    if (selectedOption && updatedErrors[`commodityIdError_${index}`]) {
      delete updatedErrors[`commodityIdError_${index}`];
    }
    const isAlreadyPresent = updatedRows.some((row, i) => i !== index && row.commodityId === selectedOption?.commodityId && row.deliveryId === updatedRows[index].deliveryId && row.containerNo === selectedOption?.containerNo);
    if (isAlreadyPresent) {
      toast.error("Commodity already selected. Please choose another.", {
        position: 'top-center',
        autoClose: 900,
        style: { width: '25vw' }
      });

      // Clear the related fields if the value is already present
      updatedRows[index].commodityId = "";
      updatedRows[index].commodityDescription = "";
      updatedRows[index].deliveredPackages = "";
      updatedRows[index].receivingPackages = "";
      updatedRows[index].deliveryId = "";
      updatedRows[index].receivingId = "";
      updatedRows[index].grossWt = "";
      updatedRows[index].jobTransId = "";
      updatedRows[index].gatePassPackages = "";
      updatedRows[index].actCommodityId = "";
      updatedRows[index].typeOfPackage = "";
      updatedRows[index].depositNo = "";
      updatedRows[index].jobNo = "";
      updatedRows[index].boeNo = "";
      updatedRows[index].receivingWeight = "";
      updatedRows[index].containerNo = "";
      updatedRows[index].outQty = "";
      updatedRows[index].srNo = "";
    }

    else if (selectedOption) {
      const value = selectedOption ? selectedOption.commodityId : "";
      // const label = selectedOption ? selectedOption.label : "";
      updatedRows[index].commodityId = selectedOption.commodityId;
      updatedRows[index].commodityDescription = selectedOption.commodityDescription;
      updatedRows[index].outQty = selectedOption.outQty;

      updatedRows[index].deliveredPackages = selectedOption.deliveredPackages;
      updatedRows[index].receivingPackages = selectedOption.receivingPackages;
      updatedRows[index].receivingWeight = selectedOption.receivingWeight;
      // updatedRows[index].deliveryId = selectedOption.deliveryId;
      updatedRows[index].receivingId = selectedOption.receivingId;
      updatedRows[index].containerNo = selectedOption.containerNo;
      updatedRows[index].deliveredWeight = selectedOption.deliveredWeight;

      // updatedRows[index].nocTransId=selectedOption.nocTransId;
      // updatedRows[index].gatePassPackages=selectedOption.gatePassPackages;

      updatedRows[index].actCommodityId = selectedOption.actCommodityId;

      updatedRows[index].typeOfPackage = selectedOption.typeOfPackage;
      updatedRows[index].srNo = selectedOption.srNo;
      console.log("selectedOption.value", value);
      console.log("setExbondBeNo", value);
    } else {
      updatedRows[index].commodityId = "";
      updatedRows[index].commodityDescription = "";

      updatedRows[index].deliveredPackages = "";
      updatedRows[index].receivingPackages = "";
      updatedRows[index].receivingWeight = "";
      updatedRows[index].deliveryId = "";
      updatedRows[index].receivingId = "";

      updatedRows[index].deliveredWeight = "";

      updatedRows[index].gatePassPackages = "";
      updatedRows[index].gatePassWeight = "";
      updatedRows[index].actCommodityId = "";
      updatedRows[index].typeOfPackage = "";

      updatedRows[index].deliveryId = "";
      updatedRows[index].deliveryId = "";
      updatedRows[index].jobNo = "";
      updatedRows[index].boeNo = "";
      updatedRows[index].commodityId = "";
      updatedRows[index].jobTransId = "";
      updatedRows[index].boeDate = "";
      updatedRows[index].depositNo = "";
      updatedRows[index].containerNo = "";
      updatedRows[index].outQty = "";
      updatedRows[index].srNo = "";
    }
    setErrorsTable(updatedErrors);
    setRows(updatedRows);
  };

  const getExbondCargoData = (exbondBeNo, val) => {
    // if (val === "") {
    //   setExbondbeData([]);
    //   return;
    // }
    console.log('exbondBeNo : ', exbondBeNo);

    axios
      .get(
        `${ipaddress}api/gatepasscontroller/getDataDeliveryCargo?companyId=${companyid}&branchId=${branchId}&exBondBeNo=${exbondBeNo}&value=${val}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;

        console.log('cargo data ---- ', data);



        const portOptions = data.map((port) => ({
          value: port[0] + ' - ' + port[13],
          label: port[1] + ' - ' + port[12],
          commodityId: port[0],
          commodityDescription: port[1],
          deliveredPackages: port[2],
          deliveryId: port[3],
          receivingId: port[4],
          receivingPackages: port[5],
          deliveredWeight: port[6],
          receivingWeight: port[7],
          jobTransId: port[8],
          actCommodityId: port[10],
          typeOfPackage: port[11],
          containerNo: port[12],
          srNo: port[13],
          outQty: port[9]
        }));
        setExbondCommodityData(portOptions);
      })
      .catch((error) => { });
  };

  const transOptions = [
    { value: "CR", label: "Cargo" },
  ];

  const [isModalOpenForYard, setIsModalOpenForYard] = useState(false);
  const openYardModal = (dtl) => {
    console.log('dtl ', dtl);


    setIsModalOpenForYard(true);
    setModalDataInput((pre) => ({
      ...pre,
      commodityDescription: dtl.commodityDescription,
      cfBondDtlId: dtl.commodityId,
      nocNo: dtl.jobNo,
      gateInPackages: dtl.gateInPackages,
      exBondingId: dtl.deliveryId,
      gatePassId: gatePass.gatePassId,
      srNo: dtl.srNo,
      delSrNo: dtl.delSrNo
    }))

    getInBondGridData(dtl.deliveryId, dtl.receivingId);
    fetchSumOfInBondPackages(dtl.deliveryId, gatePass.gatePassId, dtl.commodityId, dtl.srNo, dtl.deliveryId, dtl.receivingId, dtl.delSrNo);
  };




  const fetchSumOfInBondPackages = async (exBondingId, gatePassId, cfBondDtlId, srNo, deliveryId, receivingId, delSrNo) => {

    axios.get(`${ipaddress}api/gatepasscontroller/sum`, {
      params: {
        companyId: companyid, branchId, exBondingId, gatePassId, cfBondDtlId, srNo, deliveryId, receivingId, delSrNo
      },
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((response) => {

      const { sumOfQtyTakenOutForCommodity, sumOfPackagesInYardOfDel } = response.data;
      console.log('response.data -----------', response.data);

      if (sumOfPackagesInYardOfDel > 0) {
        setGridFlag('edit');
      } else {
        setGridFlag('add');
      }

      setModalDataInput((pre) => ({
        ...pre,
        oldInbondPkgs: (sumOfQtyTakenOutForCommodity ? sumOfQtyTakenOutForCommodity : '0'),
      }))
    }).catch((error) => {
      console.error("Error fetching sum of in-bond packages:", error);
    });
  };
  const closeYardModal = () => {
    setErrors('');
    setIsModalOpenForYard(false);
  };
  const initialYardGrid = {
    companyId: companyid,
    branchId: branchId,
    finYear: '',
    deliveryId: '',
    gatePassId: '',
    jobTransId: '',
    receivingId: '',
    srNo: '1',
    commoidityId: '',
    yardLocation: '',
    yardBlock: '',
    blockCellNo: '',
    cellAreaAllocated: 0.00,
    receivedPackages: 0,
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
    cellAreaReleased: '',
    deliveryPkgs: '',
    gateCellAreaReleased: 0,
    qtyTakenOut: 0,
  };
  const [modalRows, setModalRows] = useState([
    {
      companyId: companyid,
      branchId: branchId,
      finYear: '',
      deliveryId: '',
      gatePassId: '',
      jobTransId: '',
      receivingId: '',
      srNo: '1',
      commoidityId: '',
      yardLocation: '',
      yardBlock: '',
      blockCellNo: '',
      cellAreaAllocated: 0.00,
      receivedPackages: 0,
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
      cellAreaReleased: '',
      deliveryPkgs: '',
      gateCellAreaReleased: 0,
      qtyTakenOut: 0,
      delSrNo: 0
    },
  ]);

  const [modalDataInput, setModalDataInput] = useState(initialYardGrid);

  console.log('setModalDataInput : ,', modalDataInput);

  const [totalPackages, setTotalPackages] = useState(0);

  const handleInputChangeModal = (index, e) => {
    const { name, value } = e.target;
    const newRows = [...modalRows];
    newRows[index][name] = value;

    // Check if the field being updated is inBondPackages
    if (name === "qtyTakenOut") {
      const currentRow = newRows[index];
      const maxInBondPackages = currentRow.deliveryPkgs;

      if (parseFloat(value) > maxInBondPackages) {
        const errorMessage = `This row's Qty Taken Out cannot exceed ${maxInBondPackages}.`;
        setErrors((prevErrors) => ({
          ...prevErrors,
          [`qtyTakenOut-${index}`]: errorMessage,
        }));
        toast.error(errorMessage); // Show toast notification
      } else {
        // Clear row-specific error if valid
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[`qtyTakenOut-${index}`];
          return newErrors;
        });
      }


      const perPackageWeight = (currentRow.cellAreaReleased || 0) / (currentRow.deliveryPkgs || 1); // Avoid division by zero
      const validValue = parseFloat(value) ? parseFloat(value) : 0;
      newRows[index].gateCellAreaReleased = (perPackageWeight * validValue).toFixed(2);
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
    if (name === "gateCellAreaReleased") {
      const cellArea = parseFloat(rows[index].cellArea) || 0;
      const cellAreaUsed = parseFloat(rows[index].cellAreaUsed) || 0;
      const cellAreaAllocated = parseFloat(value) || 0;

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
    setModalRows(newRows);
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
    setModalRows(newRows);
  };


  const getInBondGridData = (deliveryId, receivingId) => {
    axios.get(
      `${ipaddress}api/gatepasscontroller/getDataOfDeliveryGrid?companyId=${companyid}&branchId=${branchId}&deliveryId=${deliveryId}&receivingId=${receivingId}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Corrected header declaration
        }
      }
    ).then((response) => {
      setModalRows(response.data);
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



  const handleSaveCfBondGrid = () => {
    modalRows.forEach((row, index) => {
      console.log(`Row ${index}: qtyTakenOut=${row.qtyTakenOut}, gateCellAreaReleased=${row.gateCellAreaReleased}`);
    });


    setLoading(true);
    // const hasEmptyFields = modalRows.some(row => 
    //   row.qtyTakenOut === null || row.qtyTakenOut === undefined || 
    //   row.gateCellAreaReleased === null || row.gateCellAreaReleased === undefined
    // );
    const hasEmptyFields = modalRows.some(row =>
      !row.qtyTakenOut || !row.gateCellAreaReleased // Checks for null, undefined, or zero
    );

    if (hasEmptyFields) {
      const errorMsg = "All fields must be filled before saving.";
      setErrors((prevErrors) => ({
        ...prevErrors,
        save: errorMsg,
      }));
      setLoading(false);
      toast.error(errorMsg); // Display error toast
      return; // Exit the function to prevent saving
    }


    // Validate total packages
    const newTotalPackages = modalRows.reduce(
      (sum, row) => sum + (parseFloat(row.qtyTakenOut) || 0),
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
        ...modalRows,
      },
      modal: {
        ...modalDataInput,
      }
    };

    console.log("dataToSave__________________________________________________________________", dataToSave);


    axios
      .post(
        `${ipaddress}api/gatepasscontroller/updateDataInExbondGridAfterBondGatePass?companyId=${companyid}&branchId=${branchId}&flag=${gridFlag}&user=${userId}&delSrNo=${modalDataInput.delSrNo}`,
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
          commodityId: row.commodityId,
          gatePassId: row.gatePassId,
          receivedPackages: row.receivedPackages,
          yardLocation: row.yardLocation,
          yardBlock: row.yardBlock,
          blockCellNo: row.blockCellNo,
          cellArea: row.cellArea,
          jobTransId: row.jobTransId,
          cellAreaAllocated: row.cellAreaAllocated,
          cellAreaUsed: row.cellAreaUsed,
          deliveryPkgs: row.deliveryPkgs,
          deliveryId: row.deliveryId,
          receivingId: row.receivingId,
          cellAreaReleased: row.cellAreaReleased,
          qtyTakenOut: row.qtyTakenOut,
          gateCellAreaReleased: row.gateCellAreaReleased,
          delSrNo: row.delSrNo
        }));

        // Update the rows state with new values
        setModalRows(newRows);
        setGridFlag("edit");
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
      }).finally(() => {
        setLoading(false);
      });
  };





  const handlePrint = async (type) => {
    setLoading(true);
    try {
      const response = await axios.get(`${ipaddress}api/gatepasscontroller/generateBondGatePassPrint?companyId=${companyid}&branchId=${branchId}&uname=${username}&type=${type}&cname=${companyname}&bname=${branchname}&gatePassId=${gatePass.gatePassId}`,
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
                Search Gate Pass
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
                      Search by Gate Pass Id / Delivery Id  / Importer Name / Transporter Name
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
                      <th scope="col">Gate Pass No</th>
                      <th scope="col">Gate Pass Date</th>
                      <th scope="col">Delivery Id </th>
                      <th scope="col">BOE No</th>
                      <th scope="col">Transporter Name</th>

                      <th scope="col">Importer Name</th>
                      <th scope="col">Vehicle No</th>
                      <th scope="col">Gate Pass Packages</th>
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

                                item.gatePassId,
                                item.deliveryId
                              )
                            }
                            value={item[0]}
                          />
                        </td>
                        <td>{item.gatePassId}</td>
                        <td>
                          {item.gatePassDate
                            ? format(
                              new Date(item.gatePassDate),
                              "dd/MM/yyyy HH:mm"
                            )
                            : "N/A"}
                        </td>

                        <td>{item.deliveryId}</td>
                        <td>{item.boeNo}</td>
                        <td>{item.transporterName}</td>

                        <td>{item.importerName}</td>
                        <td>{item.vehicleNo}</td>
                        <td>{item.gatePassPackages}</td>
                        <td>{item.status === "A" ? "Approved" : "NEW"}</td>
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
            {/* <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="sbRequestId"
                    >
                      Gate Pass Id
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="gatePassId"
                      name="gatePassId"
                      value={gatePass.gatePassId}
                      maxLength={27}
                      disabled
                      
                    />
                  </FormGroup>
                </Col> */}


            <Col md={2}>
              <Row>
                <Col md={9}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="deliveryId"
                    >
                      Gate Pass Id
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="gatePassId"
                      name="gatePassId"
                      value={gatePass.gatePassId}
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
                    onClick={openGateSearchModal}
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
                <label className="forlabel bold-label" htmlFor="transType">
                  Trans Type <span className="error-message">*</span>
                </label>
                <Select
                  id="transType"
                  name="transType"
                  value={transOptions.find(
                    (option) => option.value === gatePass.transType
                  )}
                  onChange={(selectedOption) =>
                    setGatePass((prevNOC) => ({
                      ...prevNOC,
                      transType: selectedOption.value,
                    }))
                  }
                  options={transOptions}
                  className="basic-single"
                  classNamePrefix="select"
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
            <Col md={2}>
              <FormGroup>
                <label
                  className="forlabel bold-label"
                  htmlFor="inGateInDate"
                >
                  Gate Pass Date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    // selected={selectedDate}
                    onChange={handleNocTransDate}
                    id="gatePassDate"
                    name="gatePassDate"
                    dateFormat="dd/MM/yyyy HH:mm"
                    showTimeSelect
                    selected={gatePass.gatePassDate}
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
                <label className="forlabel bold-label" htmlFor="shift">
                  Shift <span className="error-message">*</span>
                </label>
                <select
                  className="form-control"
                  id="shift"
                  name="shift"
                  value={gatePass.shift} // Should match option values
                  onChange={(e) => {
                    const value = e.target.value;
                    setGatePass((prevNOC) => ({
                      ...prevNOC,
                      shift: value,
                    }));
                    // Remove error if a valid shift is selected
                    if (value) {
                      setNocErrors((prevErrors) => ({
                        ...prevErrors,
                        shift: "",
                      }));
                    }
                  }}
                  style={{
                    border: nocErrors.shift ? '1px solid red' : '1px solid #ccc', // Red border on error
                  }}
                >
                  <option value="">Select</option>
                  <option value="Day">Day</option>
                  <option value="Second">Second</option>
                  <option value="Third">Third</option>
                </select>
              </FormGroup>
              <div style={{ color: "red" }} className="error-message">
                {nocErrors.shift}
              </div>
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
                  disabled

                  maxLength={15}
                  name="createdBy"
                  value={gatePass.createdBy}
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
                  value={gatePass.status === "A" ? "Approved" : gatePass.status === "N" ? "New" : ""}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
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
                  value={gatePass.vehicleNo}
                  onChange={handleGatePassChange}
                  style={{
                    border: nocErrors.vehicleNo ? '1px solid red' : '1px solid #ccc', // Red border on error
                  }}
                />
                <div style={{ color: "red" }} className="error-message">
                  {nocErrors.vehicleNo}
                </div>
              </FormGroup>
            </Col>


            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="driverName">
                  Driver Name <span className="error-message">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="driverName"
                  maxLength={15}
                  name="driverName"
                  value={gatePass.driverName}
                  onChange={handleGatePassChange}
                  style={{
                    border: nocErrors.driverName ? '1px solid red' : '1px solid #ccc', // Red border on error
                  }}
                />
                <div style={{ color: "red" }} className="error-message">
                  {nocErrors.driverName}
                </div>
              </FormGroup>
            </Col>



            {/* <Col md={2}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="sbRequestId"
                    >
                      Contact No
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="contactNo"
                      maxLength={10}
                      name="contactNo"
                      value={gatePass.contactNo}
                      onChange={handleGatePassChange}
                    />
                  </FormGroup>
                </Col> */}
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
                  maxLength={153}
                  name="transporterName"
                  value={gatePass.transporterName}
                  onChange={handleGatePassChange}
                />
              </FormGroup>
            </Col>
            {/* <Col md={2}>
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
                      name="importerName"
                      maxLength={15}
                      disabled
                      
                      value={gatePass.importerName}
                      onChange={handleGatePassChange}
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
                  disabled

                  maxLength={15}
                  name="approvedBy"
                  value={gatePass.approvedBy}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label className="forlabel" for="sacCode">
                  Handling Person
                </Label>
                <Input
                  type="select"
                  name="handlingPerson"
                  value={gatePass.handlingPerson}
                  onChange={(e) => onChangeInputSACCODE(e)}
                  className="form-control inputField"
                // style={{
                //   borderColor: "",
                //   backgroundColor: isViewMode ? "#e3eefa" : "inherit",
                // }}
                >
                  <option value="">Select</option>
                  {SACCODE.map((sacCode, index) => (
                    <option key={index} value={sacCode.jarDtlDesc}>
                      {`${sacCode.jarDtlDesc} - ${sacCode.jarDtlId}`}
                    </option>
                  ))}
                </Input>
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
                  maxLength={189}
                  name="comments"
                  value={gatePass.comments}
                  onChange={handleGatePassChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>


            {/* <Col md={2}>
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
                      value={gatePass.licenceNo}
                      onChange={handleGatePassChange}
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
              style={{
                marginRight: 10,
                backgroundColor: gateInStatus === "A" ? "#E0E0E0" : "", // Change background color if disabled
                cursor: gateInStatus === "A" ? "not-allowed" : "pointer", // Change cursor style if disabled
              }}
              id="submitbtn2"
              onClick={handleSave}
              disabled={gatePass.status === "A"}
            // disabled={gateInStatus === "A"}
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
              disabled={gatePass.status === "A"}
              onClick={handleSubmit}
            >
              <FontAwesomeIcon
                icon={faSave}
                style={{ marginRight: "5px" }}
              />
              Submit
            </button>

            {gatePass.status === "A" ?
              (
                <button
                  className="btn btn-outline-primary btn-margin newButton"
                  style={{ marginRight: 10 }}
                  id="submitbtn2"
                  onClick={() => handlePrint('PRINT')}
                >
                  <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
                  Print
                </button>

              ) : null}

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

            <button
              className="btn btn-outline-success btn-margin newButton"
              style={{ marginRight: 10 }}
              id="submitbtn2"
              onClick={handleAddRow}
              disabled={gatePass.status === "A"}
            >
              <FontAwesomeIcon
                icon={faPlus}
                style={{ marginRight: "5px" }}
              />
              Add Details
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
            Bond Gate Pass Details
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
                  Job No
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Delivery Id /BE OR JOB No <span className="error-message">*</span>
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  BOE No
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Cargo <span className="error-message">*</span>
                </th>

                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  ContainerNo
                </th>


                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Delivered Weight
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Delivered Packages
                </th>
                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Qty Taken Out <span className="error-message">*</span>
                </th>


                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Weight Taken Out <span className="error-message">*</span>
                </th>



                <th
                  scope="col"
                  className="text-center"
                  style={{ color: "black" }}
                >
                  Add Locations
                </th>
                <th scope="col" className="text-center" style={{ color: "black" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((rowData, index) => (
                <tr key={index}>
                  <td>
                    <>
                      <FormGroup>
                        <Input
                          type="text"
                          value={index + 1}
                          disabled
                          className="form-control"
                        />
                      </FormGroup>
                    </>
                  </td>

                  <td >
                    <FormGroup>
                      <Input
                        type="text"
                        value={rowData.jobNo}
                        className={`form-control ${errors.jobNo ? "is-invalid" : ""}`}
                        style={{ width: "85px" }}
                        disabled
                      />
                      {errors.jobNo && (
                        <FormFeedback>{errors.jobNo}</FormFeedback>
                      )}
                    </FormGroup>
                  </td>

                  <td>
                    <FormGroup>
                      <Select
                        value={rowData.deliveryId ? {
                          value: rowData.deliveryId,
                          label: rowData.deliveryId,
                        } : null}
                        onChange={(selectedOption) =>
                          handleExbondBeChange(index, selectedOption)
                        }
                        onInputChange={getExbondBeData}
                        options={exbondBeData}
                        placeholder="Select Delivery Id"
                        isClearable
                        menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                        menuPosition="fixed" // Sets the dropdown menu position to fixed    
                        menuPlacement="top"
                        name={`deliveryId_${index}`}
                        components={{ Option: CustomOptionDo }}
                        className={`autocompleteHeight ${errorsTable[`deliveryIdError_${index}`] ? 'error-border' : ''}`}
                        id={`deliveryId-${index}`}
                        filterOption={() => true}
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            height: 32,  // Set the height of the select input
                            minHeight: 32,
                            border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                            width: "180px", // Set the width to 180px
                            height: "1px"
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
                      {errorsTable[`deliveryIdError_${index}`] && <div className="error-message">{errorsTable[`deliveryIdError_${index}`]}</div>}
                    </FormGroup>
                  </td>
                  <td>
                    <FormGroup>
                      <Input
                        type="text"
                        value={rowData.boeNo}
                        onChange={(e) =>
                          handleTextChange(index, "boeNo", e)
                        }
                        className={`form-control ${errors.boeNo ? "is-invalid" : ""
                          }`}
                        style={{
                          width: "180px",
                        }}
                        disabled
                      />
                      {errors.boeNo && (
                        <FormFeedback>{errors.boeNo}</FormFeedback>
                      )}
                    </FormGroup>
                  </td>

                  <td>
                    <FormGroup>
                      <Select
                        value={rowData.commodityId ? {
                          value: rowData.commodityId,
                          label: rowData.commodityDescription,
                        } : null}
                        onChange={(selectedOption) =>
                          handleExbondCargoDataChange(index, selectedOption)
                        }
                        // onInputChange={(e) => getExbondCargoData(rowData.deliveryId, e.target.value)}
                        onInputChange={(inputValue, { action }) => {
                          if (action === 'input-change') {
                            getExbondCargoData(rowData.deliveryId, inputValue);
                          }
                        }}
                        options={exbondCommodityData}
                        placeholder="Select Cargo"
                        isClearable
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                        menuPlacement="top"
                        className={`autocompleteHeight ${errorsTable[`commodityIdError_${index}`] ? 'error-border' : ''}`}
                        name={`commodityId_${index}`}
                        id={`commodityId-${index}`}
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            height: 32,  // Set the height of the select input
                            minHeight: 32,
                            border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                            width: "180px", // Set the width to 180px
                            height: "1px"
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
                      {errorsTable[`commodityIdError_${index}`] && <div className="error-message">{errorsTable[`commodityIdError_${index}`]}</div>}
                    </FormGroup>
                  </td>


                  <td>
                    <FormGroup>
                      <Input
                        type="text"
                        value={rowData.containerNo}
                        className={`form-control`}
                        style={{ width: "180px" }}
                        disabled
                      />
                    </FormGroup>
                  </td>




                  <td>
                    <FormGroup>
                      <Input
                        type="text"
                        value={rowData.deliveredWeight}
                        onChange={(e) =>
                          handleTextChange(index, "deliveredWeight", e)
                        }
                        className={`form-control ${errors.deliveredWeight ? "is-invalid" : ""
                          }`}
                        style={{
                          width: "180px",
                        }}
                        disabled
                      />
                      {errors.deliveredWeight && (
                        <FormFeedback>{errors.deliveredWeight}</FormFeedback>
                      )}
                    </FormGroup>
                  </td>
                  <td>
                    <FormGroup>
                      <Input
                        type="text"
                        value={rowData.deliveredPackages}
                        onChange={(e) =>
                          handleTextChange(index, "deliveredPackages", e)
                        }
                        className={`form-control ${errors.deliveredPackages ? "is-invalid" : ""
                          }`}
                        style={{
                          width: "180px",
                        }}
                        disabled
                      />
                      {errors.deliveredPackages && (
                        <FormFeedback>
                          {errors.deliveredPackages}
                        </FormFeedback>
                      )}
                    </FormGroup>
                  </td>

                  <td>
                    <FormGroup>
                      <Input
                        type="text"
                        value={rowData.gatePassPackages}
                        onChange={(e) =>
                          handleTextChange(index, "gatePassPackages", e)
                        }
                        className={`form-control ${errors.gatePassPackages && errors.gatePassPackages[index]
                          ? "is-invalid"
                          : ""
                          }`}
                        style={{
                          width: "99px",
                          borderColor:
                            errors.gatePassPackages && errors.gatePassPackages[index]
                              ? "red"
                              : "", // Apply red border if there's an error
                        }}
                      />
                      {errors.gatePassPackages && errors.gatePassPackages[index] && (
                        <FormFeedback style={{ color: "red" }}>
                          {errors.gatePassPackages[index]}
                        </FormFeedback>
                      )}
                      {errorsTable[index] && <div className="error-message">{errorsTable[index]}</div>}
                    </FormGroup>
                  </td>

                  <td>
                    <FormGroup>
                      <Input
                        type="text"
                        value={rowData.gatePassWeight}
                        onChange={(e) =>
                          handleTextChange(index, "gatePassWeight", e)
                        }
                        className={`form-control ${errors.blockId ? "is-invalid" : ""
                          }`}
                        style={{
                          width: "99px",
                        }}
                        disabled
                      />
                      {errors.noOfPackage && (
                        <FormFeedback>{errors.gatePassWeight}</FormFeedback>
                      )}
                    </FormGroup>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <button
                      className="btn btn-outline-primary btn-margin newButton"
                      id="submitbtn2"
                      onClick={() => {
                        if (gatePass.gatePassId) {
                          openYardModal(rowData);
                        } else {
                          toast.warn("Please first save the gatePass", {
                            position: 'top-center'
                          });
                        }
                      }}
                    >
                      <FontAwesomeIcon icon={faAdd} />
                    </button>
                  </td>
                  <td>

                    {!gatePass.gatePassId && (

                      <Button type="button" onClick={() => handleDeleteRow(index)}
                        className="newButton"
                        color="danger"
                        outline>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>

                    )}



                    {/* <>
                      <button
                        type="button"
                        className="btn btn-danger form-control"
                        style={{
                          color: gatePass.status === 'A' ? "#a9a9a9" : "red",
                        }}
                        onClick={() => handleDeleteRow(index)}
                        disabled={gatePass.status === 'A'}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                    disabled
                    id="exBondingId"
                    name="exBondingId"
                    value={modalDataInput.exBondingId}

                  // onChange={(e) => setyardId(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col md={2}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="sbRequestId">
                    Gate Pass Id
                  </label>
                  <Input
                    className="form-control"
                    type="text"
                    id="gatePassId"
                    name="gatePassId"
                    value={modalDataInput.gatePassId}
                    disabled

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
                    disabled

                  // onChange={(e) => setyardId(e.target.value)}

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
                    disabled

                  />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="sbRequestId">
                    Qty Taken Out
                  </label>
                  <Input
                    className="form-control"
                    type="text"
                    id="fobValueInDollar"
                    value={modalDataInput.oldInbondPkgs}
                    disabled
                  />
                </FormGroup>
              </Col>

            </Row>


            <div className="mt-1 table-responsive ">
              <table className="table table-bordered table-hover tableHeader">
                <thead className='tableHeader'>
                  <tr>
                    <th scope="col" className="text-center" style={{ color: "black" }} >   Yard Location  </th>
                    <th scope="col" className="text-center" style={{ color: "black" }} >   Yard Block    </th>
                    <th scope="col" className="text-center" style={{ color: "black" }} >Cell</th>
                    {/* <th scope="col" className="text-center"  style={{ color: "black" }} >Cell Area</th>
            <th scope="col" className="text-center"  style={{ color: "black" }} >Cell Area Used</th> */}
                    <th scope="col" className="text-center" style={{ color: "black" }} >Yard Packages </th>
                    <th scope="col" className="text-center" style={{ color: "black" }} >Cell Area Allocated </th>
                    <th scope="col" className="text-center" style={{ color: "black" }} >Qty Taken Out <span className="error-message">*</span></th>

                    <th scope="col" className="text-center" style={{ color: "black" }} >Cell Area Released <span className="error-message">*</span></th>
                  </tr>
                </thead>
                <tbody>
                  {modalRows.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <Input
                          className="form-control"
                          type="text"
                          value={row.yardLocation}
                          name='yardLocation'
                          disabled
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
                          value={row.deliveryPkgs}
                          name="deliveryPkgs"
                          disabled
                          // onChange={(e) => handleInputChange(index, e)}
                          style={{
                            backgroundColor: errors[`deliveryPkgs-${index}`] ? "red" : "#E0E0E0",
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
                          // onChange={(e) => handleInputChange(index, e)}
                          disabled


                        />
                        {errors[`cellAreaReleased-${index}`] && (
                          <span style={{ color: "red" }}>
                            {errors[`cellAreaReleased-${index}`]}
                          </span>
                        )}
                      </td>

                      <td>
                        <Input
                          className="form-control"
                          type="text"
                          value={row.qtyTakenOut != null ? row.qtyTakenOut : '0'}
                          name="qtyTakenOut"
                          onChange={(e) => handleInputChangeModal(index, e)}
                          style={{
                            borderColor: errors[`qtyTakenOut-${index}`] ? "red" : "",
                          }}
                        />
                        {errors[`qtyTakenOut-${index}`] && (
                          <span style={{ color: "red" }}>
                            {errors[`qtyTakenOut-${index}`]}
                          </span>
                        )}
                      </td>


                      <td>
                        <Input
                          className="form-control"
                          type="text"
                          name="gateCellAreaReleased"
                          value={row.gateCellAreaReleased ? row.gateCellAreaReleased : '0'}
                          onChange={(e) => handleInputChangeModal(index, e)}
                          disabled


                        />
                        {errors[`gateCellAreaReleased-${index}`] && (
                          <span style={{ color: "red" }}>
                            {errors[`gateCellAreaReleased-${index}`]}
                          </span>
                        )}
                      </td>

                      {!row.deliveryId && (
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
              <Col className="d-flex justify-content-center" style={{ marginTop: '24px' }}>
                <button
                  className="btn btn-outline-primary btn-margin newButton"
                  style={{ marginRight: 10 }}
                  id="submitbtn2"
                  disabled={gatePass.status === "A"}
                  onClick={handleSaveCfBondGrid}
                >
                  <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                  Save
                </button>


                <button
                  className="btn btn-outline-danger btn-margin newButton"
                  style={{ marginRight: 10 }}
                  id="submitbtn2"
                // onClick={() => handleYardReset()}
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

export default GeneralGatePass;
