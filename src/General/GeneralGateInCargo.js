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
  faTruckFront,
  faAtom,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/style.css";
import "../Components/Style.css";
import useAxios from "../Components/useAxios";
import cfsService from "../service/CFSService";
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
  Button,
} from "reactstrap";
import { Pagination } from "react-bootstrap";
import Swal from "sweetalert2";
import { format } from "date-fns";
// import { format } from "date-fns";

function GeneralGateInCargo({ noctrans, nocno, acttab, boe, gateInData, listOfData, flag, onRequest }) {
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


  const axiosInstance = useAxios();
  const CFSService = new cfsService(axiosInstance);







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


  console.log('gateInData ', gateInData, ' ', listOfData);


  useEffect(() => {
    if (acttab == "P01802") {

      if (flag) {
        handleClear();
      }
      if (gateInData.gateInId) {
        getSelectedData(gateInData.gateInId);
      }
      else if (listOfData.jobTransId && listOfData.jobNo) {
        getSelectedJobData(listOfData.jobNo, listOfData.jobTransId);
      }



    }
  }, [listOfData.jobTransId, listOfData.jobNo, acttab]);

  const [commodityData, setCommodityData] = useState([]);

  const [gateInHeaderData, setGateInHeaderData] = useState({
    companyId: "",
    branchId: "",
    gateInId: "",
    gateInDate: new Date(),
    status: "",
    createdBy: "",
    approvedBy: "",
    handlingPerson: "",
    boeNo: "",
    boeDate: null,
    importerId: "",
    importerName: "",
    cha: "",
    jobNo: "",
    jobTransId: "",
    jobTransDate: null,
    jobNop: "",
    grossWeight: "",
    gateInPackages: ""
  })

  const handleGateInHeaderDataChange = (e) => {
    const { name, value } = e.target;

    setGateInHeaderData((prev) => ({
      ...prev,
      [name]: value
    }))

    setFormErrors((prev) => ({
      ...prev,
      [name]: ''
    }))
  }

  const [isoData, setIsoData] = useState([]);

  const getIsoCode = () => {
    axios.get(`${ipaddress}IsoContainer/searchByIsoCodeList?companyId=${companyid}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        setIsoData(response.data);
      })
      .catch((error) => {

      })
  }

  useEffect(() => {
    getIsoCode();
  }, [])

  const [gateInDtlData, setGateInDtlData] = useState([{
    companyId: "",
    branchId: "",
    gateInId: "",
    srNo: 0,
    commodityId: "",
    commodityDescription: "",
    jobTransId: "",
    jobNo: "",
    vehicleType: "Container",
    vehicleNo: "",
    containerNo: "",
    isoCode: "",
    containerSize: "",
    containerType: "",
    tareWeight: "",
    grossWeight: "",
    hazardous: "N",
    lrNo: "",
    jobNop: "",
    gateInPackages: ""
  }])

  const [formErrors, setFormErrors] = useState({
    boeNo: "",
    handlingPerson: ""
  })

  const handleClear = () => {
    setGateInHeaderData({
      companyId: "",
      branchId: "",
      gateInId: "",
      gateInDate: new Date(),
      status: "",
      createdBy: "",
      approvedBy: "",
      handlingPerson: "",
      boeNo: "",
      boeDate: null,
      importerId: "",
      importerName: "",
      cha: "",
      jobNo: "",
      jobTransId: "",
      jobTransDate: null,
      jobNop: "",
      grossWeight: "",
      gateInPackages: ""
    })

    setGateInDtlData([{
      companyId: "",
      branchId: "",
      gateInId: "",
      srNo: 0,
      commodityId: "",
      commodityDescription: "",
      jobTransId: "",
      jobNo: "",
      vehicleType: "Container",
      vehicleNo: "",
      containerNo: "",
      isoCode: "",
      containerSize: "",
      containerType: "",
      tareWeight: "",
      grossWeight: "",
      hazardous: "N",
      lrNo: "",
      jobNop: "",
      gateInPackages: ""
    }])

    setFormErrors({
      boeNo: "",
      handlingPerson: ""
    })

    setErrors([]);
    setCommodityData([]);
    setPendingCommodityData([]);
  }

  function handleInputChange(e, val1, val2) {
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

  const handleGateInDtlChange = (e, index) => {
    const { name, value } = e.target;

    let sanitizeValue = value;

    if (['gateInPackages'].includes(name)) {
      sanitizeValue = handleInputChange(value, 8, 0)
    }

    if (['gateInPackages'].includes(name)) {
      const currentJobDtlTransId = gateInDtlData[index]?.commodityId;
      const commdata = pendingCommodityData.find((item) => (item.jobDtlTransId === currentJobDtlTransId && item.jobDtlTransId));


      console.log('pendingCommodityData -- ', pendingCommodityData, '\n currentJobDtlTransId : ', currentJobDtlTransId, ' \ncommdata : ', commdata);

      const totalGateInPackagesForSameJobDtl = gateInDtlData.reduce((total, item, idx) => {
        if (idx !== index && item.commodityId === currentJobDtlTransId) {
          return total + (Number(item.gateInPackages) || 0);
        }
        return total;
      }, 0);

      const val = parseFloat(sanitizeValue) + totalGateInPackagesForSameJobDtl;

      if (commdata.pendingPackages < val) {
        sanitizeValue = "";

        setGateInDtlData((prevState) => {
          const updatedRows = [...prevState];
          updatedRows[index] = {
            ...updatedRows[index],
            grossWeight: "",
          };
          return updatedRows;
        });
      }
      else {

        const grossWt = (parseFloat(commdata.grossWeight * sanitizeValue) / parseFloat(commdata.noOfPackages)).toFixed(3);

        setGateInDtlData((prevState) => {
          const updatedRows = [...prevState];
          updatedRows[index] = {
            ...updatedRows[index],
            grossWeight: grossWt,
          };
          return updatedRows;
        });
      }

    }

    setGateInDtlData((prevState) => {
      const updatedRows = [...prevState];
      updatedRows[index] = {
        ...updatedRows[index],
        [name]: sanitizeValue,
      };
      return updatedRows;
    });

    setErrors(prevErrors => {
      const updatedErrors = { ...prevErrors }; // Spread as object
      if (updatedErrors[index]) {
        delete updatedErrors[index][name];

        if (Object.keys(updatedErrors[index]).length === 0) {
          delete updatedErrors[index]; // Remove the index key entirely
        }
      }
      return updatedErrors;
    });


  }

  const addDetails = () => {
    const newRow = {
      companyId: "",
      branchId: "",
      gateInId: "",
      srNo: 0,
      commodityId: "",
      commodityDescription: "",
      jobTransId: "",
      jobNo: "",
      vehicleType: "Container",
      vehicleNo: "",
      containerNo: "",
      isoCode: "",
      containerSize: "",
      containerType: "",
      tareWeight: "",
      grossWeight: "",
      hazardous: "N",
      lrNo: "",
      jobNop: "",
      gateInPackages: ""
    }

    setGateInDtlData([...gateInDtlData, newRow]);
  }

  const removeRow = (index) => {
    setGateInDtlData((prevState) => prevState.filter((_, i) => i !== index));
  }

  const [boeData, setBoeData] = useState([]);
  console.log('boeData : \n', boeData);

  const getBoeData = (val) => {
    try {
      if (val === "") {
        setBoeData([]);
        return;
      }

      axios.get(`${ipaddress}api/generalgatein/getGateInPendingBoe`, {
        params: {
          companyId: companyid,
          branchId: branchId,
          value: val
        }
      })
        .then((response) => {
          const data = response.data;

          if (Array.isArray(data)) {
            setBoeData(data);
          } else {
            setBoeData([]); // fallback if not array (e.g. "Data not found")
          }
        })
        .catch((error) => {
          setBoeData([]);
        });

    } catch (error) {
      setBoeData([]);
    }
  };





  const handleBoeChange = async (selectedOption, { action }) => {
    if (action === 'clear') {
      setGateInHeaderData({
        ...gateInHeaderData,
        boeNo: ""
      })

      handleClear();
    }
    else {
      setGateInHeaderData({
        ...gateInHeaderData,
        boeNo: selectedOption.value
      })
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        boeNo: "",
      }));

      getSelectedJobData(selectedOption.jobNo, selectedOption.jobTransId);
    }
  }

  const [pendingCommodityData, setPendingCommodityData] = useState([]);



  console.log('pendingCommodityData \n', pendingCommodityData);

  const getSelectedJobData = (jobNo, id) => {

    try {
      setLoading(true);

      axios.get(`${ipaddress}api/generalgatein/getGateInPendingBoeSelectedData`, {
        params: {
          companyId: companyid,
          branchId: branchId,
          jobNo: jobNo,
          jobTransId: id
        }
      })
        .then((response) => {
          setLoading(false);

          const data = response.data;

          setGateInHeaderData({
            ...gateInHeaderData,
            boeNo: data.jobData[3],
            boeDate: data.jobData[4] === null ? null : new Date(data.jobData[4]),
            importerId: data.jobData[5],
            importerName: data.jobData[6],
            cha: data.jobData[8],
            jobNo: data.jobData[0],
            jobTransId: data.jobData[1],
            jobTransDate: data.jobData[2] === null ? null : new Date(data.jobData[2]),
          });

          const commData = data.commodityData.map((item) => ({
            value: item[0] || "",
            label: item[1] || "",
            jobDtlTransId: item[0] || "",
            commodityDescription: item[1] || "",
            noOfPackages: item[2] || "",
            pendingPackages: item[3] || "0",
            grossWeight: item[4] || "0",
          }))

          setCommodityData(commData);
          setPendingCommodityData(commData);

        })
        .catch((error) => {
          setLoading(false);
          setCommodityData([]);
          setPendingCommodityData([]);

          toast.error(error.response.data, {
            autoClose: 800
          })
        })

    } catch (error) {
      setLoading(false);
      setCommodityData([]);
      setPendingCommodityData([]);
    }
  }

  const handleCommodityChange = async (selectedOption, { action }, index) => {
    if (action === 'clear') {
      setGateInDtlData(prevState => {
        const updatedData = [...prevState];
        updatedData[index] = {
          ...updatedData[index],
          companyId: "",
          branchId: "",
          gateInId: "",
          srNo: 0,
          commodityId: "",
          commodityDescription: "",
          jobTransId: "",
          jobNo: "",
          vehicleType: "Container",
          vehicleNo: "",
          containerNo: "",
          isoCode: "",
          containerSize: "",
          containerType: "",
          tareWeight: "",
          grossWeight: "",
          hazardous: "N",
          lrNo: "",
          jobNop: "",
          gateInPackages: ""
        };
        return updatedData;
      });
    } else {
      setGateInDtlData(prevState => {
        const updatedData = [...prevState];
        updatedData[index] = {
          ...updatedData[index],
          companyId: "",
          branchId: "",
          gateInId: "",
          srNo: 0,
          commodityId: selectedOption.value || "",
          commodityDescription: selectedOption.label || "",
          jobTransId: "",
          jobNo: "",
          vehicleType: "Container",
          vehicleNo: "",
          containerNo: "",
          isoCode: "",
          containerSize: "",
          containerType: "",
          tareWeight: "",
          grossWeight: "",
          hazardous: "N",
          lrNo: "",
          jobNop: selectedOption.noOfPackages || "0",
          gateInPackages: ""
        };
        return updatedData;
      });

      setErrors(prevErrors => {
        const updatedErrors = { ...prevErrors }; // Spread as object
        if (updatedErrors[index]) {
          delete updatedErrors[index]['commodityDescription'];

          if (Object.keys(updatedErrors[index]).length === 0) {
            delete updatedErrors[index]; // Remove the index key entirely
          }
        }
        return updatedErrors;
      });


    }
  };


  const handleISOChange = async (selectedOption, { action }, index) => {
    if (action === 'clear') {
      setGateInDtlData(prevState => {
        const updatedData = [...prevState];
        updatedData[index] = {
          ...updatedData[index],
          isoCode: "",
          tareWeight: "",
          containerSize: "",
          containerType: ""
        };
        return updatedData;
      });
    } else {
      setGateInDtlData(prevState => {
        const updatedData = [...prevState];
        updatedData[index] = {
          ...updatedData[index],
          isoCode: selectedOption.value || "",
          tareWeight: selectedOption.tareWeight || "",
          containerSize: selectedOption.containerSize || "",
          containerType: selectedOption.containerType || ""
        };
        return updatedData;
      });

      setErrors(prevErrors => {
        const updatedErrors = { ...prevErrors }; // Spread as object
        if (updatedErrors[index]) {
          delete updatedErrors[index]['isoCode'];

          if (Object.keys(updatedErrors[index]).length === 0) {
            delete updatedErrors[index]; // Remove the index key entirely
          }
        }
        return updatedErrors;
      });

    }
  };

  const validateGateInDtlData = (gateInDtlData) => {
    const seen = new Set(); // key: "containerNo-jobDtlTransId"

    for (let i = 0; i < gateInDtlData.length; i++) {
      const item = gateInDtlData[i];
      const key = `${item.vehicleNo}-${item.containerNo}-${item.commodityId}`;

      if (seen.has(key)) {
        // Return the first duplicate as an error
        return `Duplicate entry found at row ${i + 1} for Container No: ${item.containerNo} and Commodity: ${item.commodityDescription} and Vehicle: ${item.vehicleNo}`;
      }

      seen.add(key);
    }

    return null; // No duplicates
  };

  const handleSave = () => {
    try {

      setFormErrors({
        boeNo: "",
        handlingPerson: ""
      })

      let error = {};

      if (!gateInHeaderData.boeNo) {
        error.boeNo = "Boe no is required."
      }

      if (!gateInHeaderData.handlingPerson) {
        error.handlingPerson = "Handling person is required."
      }

      if (Object.keys(error).length > 0) {
        setFormErrors(error);
        toast.error("Please fill in the required fields.", {
          autoClose: 1000
        })
        return;
      }

      const dtlData = gateInDtlData.filter(item => item.commodityId !== '');

      if (dtlData.length === 0) {
        toast.error("Please select commodity!!", {
          autoClose: 800
        })
        return;
      }

      let newErrors = gateInDtlData.map(() => ({}));
      setErrors([]);

      gateInDtlData.forEach((data, index) => {
        let rowErrors = {};

        if (!data.commodityDescription) rowErrors.commodityDescription = "Commodity desc is required.";
        if (!data.vehicleNo) rowErrors.vehicleNo = "Vehicle no is required.";
        if (!data.containerNo && data.vehicleType === 'Container') rowErrors.containerNo = "Container no is required.";
        if (!data.isoCode && data.vehicleType === 'Container') rowErrors.isoCode = "ISO code is required.";
        if (!data.gateInPackages || data.gateInPackages <= 0) rowErrors.gateInPackages = "Gate in packages is required.";

        if (Object.keys(rowErrors).length > 0) {
          newErrors[index] = rowErrors;
        }
      });

      // Check if any errors exist
      const hasErrors = newErrors.some(errorObj => Object.keys(errorObj).length > 0);

      if (hasErrors) {

        setErrors(newErrors);
        toast.error("Please fill in the required fields.", {
          autoClose: 1000
        });

        return;
      }

      const error1 = validateGateInDtlData(gateInDtlData);

      if (error1) {
        toast.error(error1, {
          autoClose: 800
        });
        return; // Stop the save process
      }

      setLoading(true);

      const formData = {
        headerData: gateInHeaderData,
        dtlData: gateInDtlData
      }

      axios.post(`${ipaddress}api/generalgatein/saveGeneralgateInData`, formData, {
        params: {
          cid: companyid,
          bid: branchId,
          user: userId
        },
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
        .then((response) => {

          const data = response.data;

          setLoading(false);

          const singleData = data[0];

          toast.success("Data save successfully!!", {
            autoClose: 800
          })
          onRequest();
          setGateInHeaderData({
            companyId: "",
            branchId: "",
            gateInId: singleData[0] || "",
            gateInDate: singleData[1] === null ? null : new Date(singleData[1]),
            status: singleData[2] || "",
            createdBy: singleData[3] || "",
            approvedBy: singleData[4] || "",
            handlingPerson: singleData[5] || "",
            boeNo: singleData[6] || "",
            boeDate: singleData[7] === null ? null : new Date(singleData[7]),
            importerId: singleData[8] || "",
            importerName: singleData[9] || "",
            cha: singleData[11] || "",
            jobNo: singleData[12] || "",
            jobTransId: singleData[13] || "",
            jobTransDate: singleData[14] === null ? null : new Date(singleData[14]),
            jobNop: "",
            grossWeight: "",
            gateInPackages: ""
          })

          setGateInDtlData(data.map((item) => ({
            companyId: "",
            branchId: "",
            gateInId: item[0] || "",
            srNo: 0,
            commodityId: item[15] || "",
            commodityDescription: item[16] || "",
            jobTransId: item[13] || "",
            jobNo: item[12] || "",
            vehicleType: item[18] || "Container",
            vehicleNo: item[17] || "",
            containerNo: item[19] || "",
            isoCode: item[20] || "",
            containerSize: item[21] || "",
            containerType: item[22] || "",
            tareWeight: item[23] || "",
            grossWeight: item[24] || "",
            hazardous: item[25] || "N",
            lrNo: item[26] || "",
            jobNop: item[27] || "",
            gateInPackages: item[28] || ""
          })))

        })
        .catch((error) => {
          setLoading(false);

          toast.error(error.response.data, {
            autoClose: 800
          })
        })


    } catch (error) {
      setLoading(false);
    }
  }

  const [isModalOpenForSearchGateInData, setIsModalOpenForGateInData] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [gateInSearchData, setGateInSearchData] = useState([]);

  const openGateInModal = () => {
    setIsModalOpenForGateInData(true);
    searchExportEmptyContainerGateIn('');
    setSearchId('');
  }

  const closeGateInModal = () => {
    setIsModalOpenForGateInData(false);
    setSearchId('');
    setGateInSearchData([]);
  }

  const searchExportEmptyContainerGateIn = (id) => {
    setLoading(true);
    axios.get(`${ipaddress}api/generalgatein/searchGeneralGateIn?cid=${companyid}&bid=${branchId}&id=${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        setGateInSearchData(response.data);
        setLoading(false);
        toast.success("Data found successfully!!", {
          autoClose: 800
        })
      })
      .catch((error) => {
        setGateInSearchData([]);
        setLoading(false);
        toast.error(error.response.data, {
          autoClose: 800
        })
      })
  }


  const getSelectedData = (id) => {
    setLoading(true);

    axios.get(`${ipaddress}api/generalgatein/searchSelectedGeneralGateIn?cid=${companyid}&bid=${branchId}&id=${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {

        const data = response.data;

        const singleData = data[0];

        setGateInHeaderData({
          companyId: "",
          branchId: "",
          gateInId: singleData[0] || "",
          gateInDate: singleData[1] === null ? null : new Date(singleData[1]),
          status: singleData[2] || "",
          createdBy: singleData[3] || "",
          approvedBy: singleData[4] || "",
          handlingPerson: singleData[5] || "",
          boeNo: singleData[6] || "",
          boeDate: singleData[7] === null ? null : new Date(singleData[7]),
          importerId: singleData[8] || "",
          importerName: singleData[9] || "",
          cha: singleData[11] || "",
          jobNo: singleData[12] || "",
          jobTransId: singleData[13] || "",
          jobTransDate: singleData[14] === null ? null : new Date(singleData[14]),
          jobNop: "",
          grossWeight: "",
          gateInPackages: ""
        })

        setGateInDtlData(data.map((item) => ({
          companyId: "",
          branchId: "",
          gateInId: item[0] || "",
          srNo: 0,
          commodityId: item[15] || "",
          commodityDescription: item[16] || "",
          jobTransId: item[13] || "",
          jobNo: item[12] || "",
          vehicleType: item[18] || "Container",
          vehicleNo: item[17] || "",
          containerNo: item[19] || "",
          isoCode: item[20] || "",
          containerSize: item[21] || "",
          containerType: item[22] || "",
          tareWeight: item[23] || "",
          grossWeight: item[24] || "",
          hazardous: item[25] || "N",
          lrNo: item[26] || "",
          jobNop: item[27] || "",
          gateInPackages: item[28] || ""
        })))




        setLoading(false);
        closeGateInModal();
      })
      .catch((error) => {
        toast.error(error.response.data, {
          autoClose: 800
        })
        setLoading(false);
      })
  }

  const handleSearchClear = () => {
    searchExportEmptyContainerGateIn('');
    setSearchId('');
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = gateInSearchData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(gateInSearchData.length / itemsPerPage);

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

  const handlePrint = async () => {

    setLoading(true);

    axios.post(`${ipaddress}api/generalgatein/importGateInReport`, null, {
      params: {
        cid: companyid,
        bid: branchId,
        id: gateInHeaderData.gateInId
      },
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then(response => {
        const pdfBase64 = response.data;

        const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(pdfBlob);
        window.open(blobUrl, '_blank');
        setLoading(false);



      })
      .catch(error => {
        console.error('Error in handlePrint:', error.message);
        setLoading(false);
      });
  }










  // Document upload
  const [isModalOpenForDocumentUpload, setIsModalOpenForDocumentUpload] = useState(false);

  const initialDocumentUpload = {
    companyId: companyid,
    branchId: branchId,
    sbNo: '',
    sbTransId: '',
    hSbTransId: '',
    sbLineNo: '',
    fileName: '',
    base64Url: '',
    fileType: '',
    isSaved: 'N'
  }

  const [sbDocumentUpload, setSbDocumentUpload] = useState([initialDocumentUpload]);
  const [removedList, setRemovedList] = useState([]);


  const handleOpenDocumentUpload = async (sbNoEntry) => {
    try {
      const response = await CFSService.getDataForDocumentuploadGeneral(
        companyid,
        branchId,
        sbNoEntry.containerNo,
        sbNoEntry.gateInId
      );
      setSbDocumentUpload(
        response.data?.length > 0
          ? response.data
          : [{ ...initialDocumentUpload, sbNo: sbNoEntry.containerNo, sbTransId: sbNoEntry.gateInId, hSbTransId: sbNoEntry.gateInId, sbLineNo: sbNoEntry.gateInId, isSaved: 'N' }]
      );

      setIsModalOpenForDocumentUpload(true);
    } catch (error) {
      console.error('Error fetching data for document get upload : \n', error);
      toast.error('An error occurred while fetching data. Please try again.', {
        position: 'top-center',
        autoClose: 700,
      });
    }
  };


  const handleCloseDocumentUpload = async () => {
    setIsModalOpenForDocumentUpload(false);
    setSbDocumentUpload([initialDocumentUpload]);
    setRemovedList([]);
  }


  const handleFileUploadFileChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length === 0) return;

    const maxSize = 10 * 1024 * 1024; // 10MB in bytes

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "application/vnd.ms-excel", // XLS
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX           
    ];

    const validFiles = files.filter(
      (file) => allowedTypes.includes(file.type) && file.size <= maxSize
    );

    if (validFiles.length === 0) {
      alert("Only JPG, PNG, PDF, XLS and XLSX files are allowed (Max: 10MB)!");
      return;
    }

    validFiles.forEach((file) => {
      const reader = new FileReader();

      // Read Excel and CSV files as binary string
      if (file.type.includes("excel")) {
        reader.readAsBinaryString(file);
      } else {
        reader.readAsDataURL(file);
      }

      reader.onload = () => {
        const base64String =
          file.type.includes("excel")
            ? btoa(reader.result) // Convert binary to base64
            : reader.result;

        setSbDocumentUpload((prev) => {
          const existingIndex = prev.findIndex((doc) => doc.fileName === "");

          if (existingIndex !== -1) {
            // If an empty file entry exists, update it
            const updatedDocuments = [...prev];
            updatedDocuments[existingIndex] = {
              ...updatedDocuments[existingIndex],
              fileName: file.name,
              base64Url: base64String,
              fileType: file.type,
            };
            return updatedDocuments;
          } else {
            // If no empty entry exists, add a new object
            return [
              ...prev,
              {
                companyId: prev[0]?.companyId || "",
                branchId: prev[0]?.branchId || "",
                sbNo: prev[0]?.sbNo || "",
                sbTransId: prev[0]?.sbTransId || "",
                hSbTransId: prev[0]?.hSbTransId || "",
                sbLineNo: prev[0]?.sbLineNo || "",
                fileName: file.name,
                base64Url: base64String,
                fileType: file.type,
              },
            ];
          }
        });

        console.log("File Uploaded:", file.name);
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
    });
  };


  const handleRemoveFile = (index, sbNo, sbLineNo, sbTransId, hsbTransId, isSaved, fileName) => {

    const updatedFiles = sbDocumentUpload.filter((_, i) => i !== index);

    // If the file is saved, add its name to removedList
    if (isSaved === 'Y') {
      setRemovedList(prevList => [...prevList, fileName]);
    }

    if (updatedFiles.length === 0) {
      setSbDocumentUpload([{
        ...initialDocumentUpload,
        sbNo: sbNo,
        sbTransId: sbTransId,
        hSbTransId: hsbTransId,
        sbLineNo: sbLineNo,
        isSaved: 'N'
      }]);
    } else {
      setSbDocumentUpload(updatedFiles);
    }
  };

  const uploadGeneralDocument = async () => {
    setLoading(true);

    let sbFile = sbDocumentUpload[0];
    try {
      const response = await CFSService.uploadGeneralDocument(companyid, branchId, sbFile.sbNo, sbFile.sbTransId, sbDocumentUpload, removedList, userId);

      setSbDocumentUpload(response.data);
      toast.success('Document uploaded successfully', {
        position: 'top-center',
        autoClose: 700,
      });

    } catch {
      toast.error('An error occurred while uploading the files. Please try again.', {
        position: 'top-center',
        style: { width: '29vw' },
        autoClose: 700,
      });
    } finally {
      setLoading(false);
    }
  }

  const [isModalOpenForViewDocument, setIsModalOpenForViewDocument] = useState(false);
  const [viewFile, setViewFile] = useState('');


  const handleView = (file) => {
    setViewFile(file);
    setIsModalOpenForViewDocument(true);
  };


  const renderFile = () => {
    if (!viewFile) return null;

    if (viewFile.fileType === 'application/pdf') {
      return <iframe src={viewFile.base64Url} title="PDF Viewer" style={{ width: '100%', height: '500px' }} />;
    }
    else if (viewFile.fileType.startsWith('image/')) {
      return <img src={viewFile.base64Url} alt="Preview" style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />;
    }
    else if (
      viewFile.fileType === 'application/vnd.ms-excel' ||
      viewFile.fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      const handleDownload = () => {
        const link = document.createElement('a');
        link.href = viewFile.base64Url;
        link.download = viewFile.fileName || 'file.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      return (
        <div>
          <p>Excel files cannot be previewed. Click below to download:</p>
          <Button
            type="button"
            className="newButton mt-2 mb-2"
            color="primary"
            outline
            style={{ marginRight: '10px' }}
            onClick={handleDownload}
          >
            <FontAwesomeIcon
              icon={faDownload}
              style={{ marginRight: "5px" }}
            />
            Download {viewFile.fileName}
          </Button>



        </div>
      );
    }
    else if (viewFile.fileType === 'text/csv') {
      try {
        const csvText = atob(viewFile.split(',')[1]);
        const rows = csvText.split('\n').map((row) => row.split(','));

        return (
          <table className="table table-bordered">
            <thead>
              <tr>{rows[0].map((col, i) => <th key={i}>{col}</th>)}</tr>
            </thead>
            <tbody>
              {rows.slice(1).map((row, i) => (
                <tr key={i}>{row.map((col, j) => <td key={j}>{col}</td>)}</tr>
              ))}
            </tbody>
          </table>
        );
      } catch (error) {
        return (
          <div>
            <p>Error loading CSV preview. Click below to download:</p>
            <a href={viewFile} download={viewFile.fileName} className="btn btn-primary">
              Download {viewFile.fileName}
            </a>
          </div>
        );
      }
    }
    else {
      return <p>Unsupported file format</p>;
    }
  };


  const handleCloseViewDocument = async () => {
    setIsModalOpenForViewDocument(false);
  }



































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

      <Modal Modal isOpen={isModalOpenForSearchGateInData} onClose={closeGateInModal} toggle={closeGateInModal} style={{ maxWidth: '1200px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

        <ModalHeader toggle={closeGateInModal} style={{
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
          /> Search Gate In Data</h5>



        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
          <Row>
            <Col md={4}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Search
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="searchId"
                  name='searchId'
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                />

              </FormGroup>
            </Col>
            <Col md={4} style={{ marginTop: 21 }}>
              <button
                className="btn btn-outline-primary btn-margin newButton"
                style={{ marginRight: 10, fontSize: 12 }}
                id="submitbtn2"
                onClick={() => searchExportEmptyContainerGateIn(searchId)}

              >
                <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                Search
              </button>
              <button
                className="btn btn-outline-danger btn-margin newButton"
                style={{ marginRight: 10, fontSize: 12 }}
                id="submitbtn2"
                onClick={handleSearchClear}
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
                <tr className='text-center'>
                  <th scope="col">#</th>
                  <th scope="col">Gate In No</th>
                  <th scope="col">Gate In Date</th>
                  <th scope="col">BOE No</th>
                  <th scope="col">Job No</th>
                  <th scope="col">Vehicle No</th>
                  <th scope="col">Importer Name</th>

                </tr>
                <tr className='text-center'>
                  <th scope="col"></th>
                  <th scope="col">{gateInSearchData.length}</th>
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
                      <input type="radio" onChange={() => getSelectedData(item[0])} name="radioGroup" />
                    </td>
                    <td>{item[0]}</td>
                    <td>{item[1]}</td>
                    <td>{item[2]}</td>
                    <td>{item[3]}</td>
                    <td>{item[4]}</td>
                    <td>{item[5]}</td>
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

      <div>
        <Row>
          <Col md={2}>

            <label>Gate In No</label>
            <Row>
              <Col md={9}>
                <FormGroup>
                  <Input
                    className="form-control"
                    type="text"
                    name='gateInId'
                    id='gateInId'
                    value={gateInHeaderData.gateInId}
                    disabled
                  />
                </FormGroup>


              </Col>
              <Col md={3} className="d-flex justify-content-end">
                <button
                  className="btn btn-outline-primary btn-margin newButton"
                  style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  id="submitbtn2"
                  onClick={openGateInModal}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </Col>
            </Row>
          </Col>

          <Col md={2}>
            <label>Gate In Date</label>
            <FormGroup>
              <div style={{ position: 'relative' }}>
                <DatePicker
                  selected={gateInHeaderData.gateInDate}
                  disabled
                  id='gateInDate'
                  name='gateInDate'
                  dateFormat="dd/MM/yyyy HH:mm"
                  className="form-control border-right-0 inputField"
                  customInput={<input style={{ width: '100%' }} />}
                  wrapperClassName="custom-react-datepicker-wrapper"
                  showTimeInput
                  popperPlacement="top-end"
                />
                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
              </div>
            </FormGroup>

          </Col>


          <Col md={2}>
            <label>Handling Person <span style={{ color: 'red' }}>*</span></label>
            <FormGroup>
              <Input
                className="form-control"
                type="text"
                name='handlingPerson'
                id='handlingPerson'
                value={gateInHeaderData.handlingPerson}
                maxLength={100}
                onChange={handleGateInHeaderDataChange}
                style={{ borderColor: formErrors.handlingPerson ? 'red' : '' }}
              />
              <div style={{ color: 'red' }} className="error-message">{formErrors.handlingPerson}</div>
            </FormGroup>

          </Col>

          <Col md={2}>
            <label>Status</label>
            <FormGroup>
              <Input
                className="form-control"
                type="text"
                name='status'
                id='status'
                value={gateInHeaderData.status === 'A' ? 'Approved' : gateInHeaderData.status === 'N' ? 'New' : gateInHeaderData.status}
                disabled
              />
            </FormGroup>

          </Col>
          <Col md={2}>
            <label>Created By</label>
            <FormGroup>
              <Input
                className="form-control"
                type="text"
                name='createdBy'
                id='createdBy'
                value={gateInHeaderData.createdBy}
                disabled
              />
            </FormGroup>

          </Col>
          <Col md={2}>
            <label>Approved By</label>
            <FormGroup>
              <Input
                className="form-control"
                type="text"
                name='approvedBy'
                id='approvedBy'
                value={gateInHeaderData.approvedBy}
                disabled
              />
            </FormGroup>

          </Col>

        </Row >
        <Row>
          <Col md={2}>
            <label>BE/Job No<span style={{ color: 'red' }}>*</span></label>
            <FormGroup>
              <Select
                value={gateInHeaderData.boeNo ? { value: gateInHeaderData.boeNo, label: gateInHeaderData.boeNo } : null}
                placeholder="Search BE/Job No"
                options={boeData}
                onInputChange={(inputValue, { action }) => {
                  if (action === 'input-change') {
                    getBoeData(inputValue);
                  }
                }}
                filterOption={() => true}
                onChange={handleBoeChange}
                isDisabled={gateInHeaderData.gateInId !== ''}
                isClearable
                id="boeNo"
                name="boeNo"
                className={`autocompleteHeight ${formErrors.boeNo ? 'error-border' : ''} `}
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
              <div style={{ color: 'red' }} className="error-message">{formErrors.boeNo}</div>
            </FormGroup>

          </Col>
          <Col md={2}>
            <label>BOE Date</label>
            <FormGroup>
              <div style={{ position: 'relative' }}>
                <DatePicker
                  selected={gateInHeaderData.boeDate}
                  disabled
                  id='boeDate'
                  name='boeDate'
                  dateFormat="dd/MM/yyyy"
                  className="form-control border-right-0 inputField"
                  customInput={<input style={{ width: '100%' }} />}
                  wrapperClassName="custom-react-datepicker-wrapper"
                  popperPlacement="top-end"
                />
                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
              </div>
            </FormGroup>

          </Col>
          <Col md={2}>
            <label>Importer Name</label>
            <FormGroup>
              <Input
                className="form-control"
                type="text"
                name='importerName'
                id='importerName'
                value={gateInHeaderData.importerName}
                disabled
              />
            </FormGroup>

          </Col>
          <Col md={2}>
            <label>CHA</label>
            <FormGroup>
              <Input
                className="form-control"
                type="text"
                name='cha'
                id='cha'
                value={gateInHeaderData.cha}
                disabled
              />
            </FormGroup>

          </Col>
          <Col md={2}>
            <label>Job No</label>
            <FormGroup>
              <Input
                className="form-control"
                type="text"
                name='jobNo'
                id='jobNo'
                value={gateInHeaderData.jobNo}
                disabled
              />
            </FormGroup>

          </Col>
          <Col md={2}>
            <label>Job Trans Id</label>
            <FormGroup>
              <Input
                className="form-control"
                type="text"
                name='jobTransId'
                id='jobTransId'
                value={gateInHeaderData.jobTransId}
                disabled
              />
            </FormGroup>

          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <label>Job Trans Date</label>
            <FormGroup>
              <div style={{ position: 'relative' }}>
                <DatePicker
                  selected={gateInHeaderData.jobTransDate}
                  disabled
                  id='jobTransDate'
                  name='jobTransDate'
                  dateFormat="dd/MM/yyyy HH:mm"
                  className="form-control border-right-0 inputField"
                  customInput={<input style={{ width: '100%' }} />}
                  wrapperClassName="custom-react-datepicker-wrapper"
                  showTimeInput
                  popperPlacement="top-end"
                />
                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
              </div>
            </FormGroup>

          </Col>

          <Col md={2}>
            <label>Total Gross Weight</label>
            <FormGroup>
              <Input
                disabled
                className="form-control"
                type="text"
                name='grossWeight'
                id='grossWeight'
                value={
                  Array.isArray(gateInDtlData)
                    ? gateInDtlData.reduce((total, item) => total + (parseFloat(item.grossWeight) || 0), 0).toFixed(3)
                    : 0
                }
              />
            </FormGroup>

          </Col>
          <Col md={2}>
            <label>Total Gate In Packages</label>
            <FormGroup>
              <Input
                disabled
                className="form-control"
                type="text"
                name='gateInPackages'
                id='gateInPackages'
                value={
                  Array.isArray(gateInDtlData)
                    ? gateInDtlData.reduce((total, item) => total + (Number(item.gateInPackages) || 0), 0)
                    : 0
                }

              />
            </FormGroup>

          </Col>

        </Row>
        <Row>
          <Col className="text-center">
            <button
              className="btn btn-outline-primary btn-margin newButton"
              style={{ marginRight: 10 }}
              id="submitbtn2"
              onClick={handleSave}
              disabled={gateInHeaderData.gateInId !== ''}
            >
              <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
              Save
            </button>
            <button
              className="btn btn-outline-danger btn-margin newButton"
              style={{ marginRight: 10 }}
              id="submitbtn2"
              onClick={handleClear}
            >
              <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
              Clear
            </button>
            <button
              className="btn btn-outline-primary btn-margin newButton"
              style={{ marginRight: 10 }}
              id="submitbtn2"
              onClick={addDetails}
              disabled={gateInHeaderData.gateInId !== ''}
            >
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
              Add Details
            </button>

            <button
              className="btn btn-outline-primary btn-margin newButton"
              style={{ marginRight: 10 }}
              id="submitbtn2"
              onClick={handlePrint}
              disabled={gateInHeaderData.gateInId === ''}
            >
              <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
              Print
            </button>
          </Col>
        </Row>

      </div >



      <div className="mt-3 table-responsive " style={{ fontSize: 14, overflowX: 'auto' }}>
        <table className="table table-bordered table-hover tableHeader dynamic-table">
          <thead className="tableHeader">
            <tr>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Sr No</th>
              <th scope="col" className="text-center" style={{ color: 'black', minWidth: 200 }}>Commodity <span style={{ color: 'red' }}>*</span></th>
              <th scope="col" className="text-center" style={{ color: 'black', minWidth: 180 }}>Vehicle No <span style={{ color: 'red' }}>*</span></th>
              <th scope="col" className="text-center" style={{ color: 'black', minWidth: 170 }}>Vehicle Type <span style={{ color: 'red' }}>*</span></th>
              <th scope="col" className="text-center" style={{ color: 'black', minWidth: 150 }}>Container No <span style={{ color: 'red' }}>*</span></th>
              <th scope="col" className="text-center" style={{ color: 'black', minWidth: 150 }}>Container ISO <span style={{ color: 'red' }}>*</span></th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Container Size</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Container Type</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Container Wt</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Gross Wt</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Hazardous</th>
              <th scope="col" className="text-center" style={{ color: 'black', minWidth: 150 }}>LR No</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Job Packages</th>
              <th scope="col" className="text-center" style={{ color: 'black', minWidth: 150 }}>Gate In Packages <span style={{ color: 'red' }}>*</span></th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {gateInDtlData.map((item, index) => (
              <tr>
                <td>
                  {index + 1}
                </td>
                <td>
                  <Select
                    value={item.commodityId ? { value: item.commodityId, label: item.commodityDescription } : null}
                    placeholder="Select Commodity"
                    options={commodityData}
                    isDisabled={gateInHeaderData.gateInId !== ''}
                    onChange={(option, actionMeta) => handleCommodityChange(option, actionMeta, index)}
                    isClearable
                    id="commodityDescription"
                    name="commodityDescription"
                    className={`autocompleteHeight ${errors[index]?.commodityDescription ? 'error-border' : ''}`}
                    menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                    menuPosition="fixed" // Sets the dropdown menu position to fixed    
                    menuPlacement="top"
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
                </td>
                <td>
                  <Input
                    type="text"
                    style={{ textTransform: 'uppercase', borderColor: errors[index]?.vehicleNo ? 'red' : '' }}
                    name="vehicleNo"
                    id="vehicleNo"
                    value={item.vehicleNo}
                    maxLength={15}
                    onChange={(e) => handleGateInDtlChange(e, index)}
                  />
                </td>
                <td>
                  <Input
                    type="select"
                    className="form-control"
                    name="vehicleType"
                    id="vehicleType"
                    value={item.vehicleType}
                    style={{ borderColor: errors[index]?.vehicleType ? 'red' : '' }}
                    onChange={(e) => handleGateInDtlChange(e, index)}
                  >
                    <option value="Container">Container</option>
                    <option value="Tempo">Tempo</option>
                  </Input>
                </td>
                <td>
                  <Input
                    type="text"
                    style={{ textTransform: 'uppercase', borderColor: errors[index]?.containerNo ? 'red' : '' }}
                    name="containerNo"
                    id="containerNo"
                    value={item.containerNo}
                    maxLength={11}
                    onChange={(e) => handleGateInDtlChange(e, index)}
                  />
                </td>
                <td>
                  <Select
                    value={item.isoCode ? { value: item.isoCode, label: item.isoCode } : null}
                    placeholder="Select ISO Code"
                    options={isoData}
                    onChange={(option, actionMeta) => handleISOChange(option, actionMeta, index)}
                    isClearable
                    id="isoCode"
                    name="isoCode"
                    className={`autocompleteHeight ${errors[index]?.isoCode ? 'error-border' : ''}`}
                    menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                    menuPosition="fixed" // Sets the dropdown menu position to fixed    
                    menuPlacement="top"
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
                </td>
                <td>{item.containerSize}</td>
                <td>{item.containerType}</td>
                <td>{item.tareWeight}</td>
                <td>{item.grossWeight}</td>
                <td>
                  <Input
                    type="select"
                    className="form-control"
                    name="hazardous"
                    id="hazardous"
                    value={item.hazardous}
                    onChange={(e) => handleGateInDtlChange(e, index)}
                  >
                    <option value="N">No</option>
                    <option value="Y">Yes</option>
                  </Input>
                </td>
                <td>
                  <Input
                    type="text"
                    name="lrNo"
                    id="lrNo"
                    value={item.lrNo}
                    maxLength={20}
                    onChange={(e) => handleGateInDtlChange(e, index)}
                  />
                </td>
                <td>{item.jobNop}</td>
                <td>
                  <Input
                    type="text"
                    name="gateInPackages"
                    id="gateInPackages"
                    value={item.gateInPackages}
                    style={{ borderColor: errors[index]?.gateInPackages ? 'red' : '' }}
                    onChange={(e) => handleGateInDtlChange(e, index)}
                  />
                </td>



                <td className="text-center">
                  {!item.gateInId && (

                    <Button type="button" onClick={() => removeRow(index)}
                      className="newButton"
                      color="danger"
                      outline>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>

                  )}
                </td>




                {/* <td>
                  <button
                    className="btn btn-outline-danger btn-margin newButton"
                    id="submitbtn2"
                    onClick={() => removeRow(index)}
                    disabled={gateInHeaderData.gateInId !== ''}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div >

    </>
  );
}

export default GeneralGateInCargo;
