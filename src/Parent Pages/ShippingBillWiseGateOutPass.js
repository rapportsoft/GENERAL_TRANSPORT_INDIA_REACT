import AuthContext from "../Components/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import Select from "react-select";
import ipaddress from "../Components/IpAddress";
import { Pagination } from 'react-bootstrap';
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
} from "reactstrap";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreatableSelect from 'react-select/creatable';
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
  faHouse,
  faMoneyBillTransfer,
  faPassport,
  faPrint
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/style.css";
import "../Components/Style.css";
import { Button } from "react-bootstrap";
import useAxios from "../Components/useAxios";
import CFSService from "../service/CFSService";
import { toast } from "react-toastify";
import moment from "moment";
import { error } from "jquery";

function ShippingBillWiseGateOutPass({ searchData, resetFlag, updatePagesList }) {
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

  const processId = 'P00231';

  const foundRights =
    role !== "ROLE_ADMIN"
      ? userRights.find((item) => item.process_Id === processId)
      : null;
  const allowCreate = foundRights?.allow_Create === "Y";
  const allowRead = foundRights?.allow_Read === "Y";
  const allowEdit = foundRights?.allow_Update === "Y";
  const allowDelete = foundRights?.allow_Delete === "Y";





  useEffect(() => {
    if (searchData && searchData.activeTab === processId && searchData.profitCenterId && searchData.gatePassNo && searchData.containerType) {
      getSelectedData(searchData.gatePassNo, searchData.containerType);
    }
  }, [searchData]);
  useEffect(() => {

    if (resetFlag) {
      handleClear();
    }
  }, [resetFlag]);



















  const [gatePassData, setGatepassData] = useState({
    companyId: '',
    branchId: '',
    gatePassId: '',
    profitcentreId: 'CFS Export',
    gatePassDate: new Date(),
    transType: 'CONT',
    status: '',
    createdBy: '',
    vehicleId: '',
    vehicleNo: '',
    driverName: '',
    transporter: '',
    transporterName: '',
    comments: '',
    vehicleWt: ''
  })


  const [multipleGatePassData, setMultipleGatePassData] = useState([{
    companyId: '',
    branchId: '',
    gatePassId: '',
    srNo: '',
    sbTransId: '',
    sbNo: '',
    movementReqId: '',
    stuffTallyId: '',
    cha: '',
    chaName: '',
    customsSealNo: '',
    agentSealNo: '',
    containerNo: '',
    containerSize: '',
    containerType: '',
    sbDate: null,
    pod: '',
    grossWt: '',
    pol: '',
    containerStatus: '',
    viaNo: '',
    status: ''
  }]);

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

  const handleGatePassChange = (e, val1, val2) => {
    const { name, value } = e.target;

    let sanitizeValue = value;

    if (['vehicleWt'].includes(name)) {
      sanitizeValue = handleInputChange(value, val1, val2)
    }


    setGatepassData(prev => ({
      ...prev,
      [name]: sanitizeValue
    }))

    if (name === "transType") {
      setMultipleGatePassData([{
        companyId: '',
        branchId: '',
        gatePassId: '',
        srNo: '',
        sbTransId: '',
        sbNo: '',
        movementReqId: '',
        stuffTallyId: '',
        cha: '',
        chaName: '',
        customsSealNo: '',
        agentSealNo: '',
        containerNo: '',
        containerSize: '',
        containerType: '',
        sbDate: null,
        pod: '',
        grossWt: '',
        pol: '',
        containerStatus: '',
        viaNo: '',
        status: ''
      }])
    }

    setFormErrors(prevState => ({
      ...prevState,
      [name]: ''
    }));
  }

  const [transporterData, setTransporterData] = useState([]);

  const getTransporter = () => {
    axios.get(`${ipaddress}party/getTrans?cid=${companyid}&bid=${branchId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;
        const portOptions = data.map(port => ({
          value: port[0],
          label: port[1],
        }))
        setTransporterData(portOptions);
      })
      .catch((error) => {

      })
  }

  const [movementData, setMovementData] = useState([]);

  const getMovementData = (id) => {
    if (id === '') {
      setMovementData([]);
      return;
    }

    let type = gatePassData.transType === 'CONT' ? 'CLP' : gatePassData.transType === 'MOVE' ? 'PortRn' : gatePassData.transType === 'CRG' ? 'CRG' : gatePassData.transType === 'BOWC' ? 'Buffer' : '';

    axios.get(`${ipaddress}exportGatePass/getMovementData?cid=${companyid}&bid=${branchId}&val=${id}&type=${type}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;
        const portOptions = data.map(port => ({
          value: port[1],
          label: port[0],
        }))
        setMovementData(portOptions);
      })
      .catch((error) => {
        setMovementData([]);
      })
  }

  useEffect(() => {

    if (searchData.activeTab === 'P00231') {
      getTransporter();
    }
  }, [searchData])

  const addRow = () => {
    setMultipleGatePassData(prevData => [
      ...prevData,
      {
        companyId: '',
        branchId: '',
        gatePassId: '',
        srNo: '',
        sbTransId: '',
        sbNo: '',
        movementReqId: '',
        stuffTallyId: '',
        cha: '',
        chaName: '',
        customsSealNo: '',
        agentSealNo: '',
        containerNo: '',
        containerSize: '',
        containerType: '',
        sbDate: null,
        pod: '',
        grossWt: '',
        pol: '',
        containerStatus: '',
        viaNo: '',
        status: ''
      }
    ]);
  };

  const removeRow = (index) => {
    setMultipleGatePassData(prevData => prevData.filter((_, i) => i !== index));
  };

  const handleTransporter = async (selectedOption, { action }) => {

    if (action === 'clear') {
      setGatepassData({
        ...gatePassData,
        transporter: '',
        transporterName: ''
      })
    }
    else {
      setGatepassData({
        ...gatePassData,
        transporter: selectedOption.value,
        transporterName: selectedOption.label
      })
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['transporterName']: "",
      }));
    }

  }


  const handleChangeMovementRequestId = async (selectedOption, { action }, index) => {
    if (action === 'clear') {
      setMultipleGatePassData(prevState => {
        const updatedData = [...prevState];
        updatedData[index] = {
          ...updatedData[index],
          companyId: '',
          branchId: '',
          gatePassId: '',
          srNo: '',
          sbTransId: '',
          sbNo: '',
          movementReqId: '',
          stuffTallyId: '',
          cha: '',
          chaName: '',
          customsSealNo: '',
          agentSealNo: '',
          containerNo: '',
          containerSize: '',
          containerType: '',
          sbDate: null,
          pod: '',
          grossWt: '',
          pol: '',
          containerStatus: '',
          viaNo: '',
          status: ''
        };
        return updatedData;
      });

    } else {

      const checkDuplicate = multipleGatePassData.filter(item => item.containerNo === selectedOption.label);

      if (checkDuplicate.length > 0) {
        toast.error("This container number is already in the list. Please select a different one.", {
          autoClose: 800
        })
        return;
      }


      setMultipleGatePassData(prevState => {
        const updatedData = [...prevState];
        updatedData[index] = {
          ...updatedData[index],
          movementReqId: selectedOption.value,
          containerNo: selectedOption.label,
        };
        return updatedData;
      });

      getSingleData(selectedOption.value, selectedOption.label, index);

    }
  };


  const getSingleData = (req, con, index) => {
    axios.get(`${ipaddress}exportGatePass/getSelectedMovementData?cid=${companyid}&bid=${branchId}&reqId=${req}&con=${con}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;

        setMultipleGatePassData(prevState => {
          const updatedData = [...prevState];
          updatedData[index] = {
            companyId: '',
            branchId: '',
            gatePassId: '',
            srNo: '',
            sbTransId: data.sbTransId || '',
            sbNo: data.sbNo || '',
            movementReqId: data.movementReqId || '',
            stuffTallyId: '',
            cha: data.cha || '',
            chaName: data.chaName || '',
            customsSealNo: data.customsSealNo || '',
            agentSealNo: data.agentSealNo || '',
            containerNo: data.containerNo || '',
            containerSize: data.containerSize || '',
            containerType: data.containerType || '',
            sbDate: data.sbDate === null ? null : new Date(data.sbDate),
            pod: data.pod || '',
            grossWt: data.grossWeight || '',
            pol: data.pol || '',
            containerStatus: 'FCL',
            viaNo: data.viaNo || '',
            status: ''
          };
          return updatedData;
        });
      })
      .catch((error) => {

      })
  }

  const [vehicleData, setVehicleData] = useState([]);

  const getVehicleNo = (id) => {
    if (!id) {

      setVehicleData([]);
      return;
    }

    axios.get(`${ipaddress}exportGatePass/getEmptyVehicle?cid=${companyid}&bid=${branchId}&veh=${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;
        const portOptions = data.map(port => ({
          value: port[1],
          label: port[0],
          driver: port[2]
        }))
        setVehicleData(portOptions);
      })
      .catch((error) => {
        setVehicleData([]);
      })
  }

  const handleVehicleNo = async (selectedOption, { action }) => {

    if (action === 'clear') {
      setGatepassData({
        ...gatePassData,
        vehicleId: '',
        vehicleNo: '',
        driverName: '',
      })
    }
    else {
      setGatepassData({
        ...gatePassData,
        vehicleId: selectedOption.value,
        vehicleNo: selectedOption.label,
        driverName: selectedOption.driver,
      })
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ['vehicleNo']: "",
      }));
    }

  }

  let [formErrors, setFormErrors] = useState({
    transType: '',
    vehicleNo: '',
    transporterName: '',
    vehicleWt: ''
  })


  const handleClear = () => {
    setGatepassData({
      companyId: '',
      branchId: '',
      gatePassId: '',
      profitcentreId: 'CFS Export',
      gatePassDate: new Date(),
      transType: 'CLP',
      status: '',
      createdBy: '',
      vehicleId: '',
      vehicleNo: '',
      driverName: '',
      transporter: '',
      transporterName: '',
      comments: '',
      vehicleWt: ''
    })

    setMultipleGatePassData([{
      companyId: '',
      branchId: '',
      gatePassId: '',
      srNo: '',
      sbTransId: '',
      sbNo: '',
      movementReqId: '',
      stuffTallyId: '',
      cha: '',
      chaName: '',
      customsSealNo: '',
      agentSealNo: '',
      containerNo: '',
      containerSize: '',
      containerType: '',
      sbDate: null,
      pod: '',
      grossWt: '',
      pol: '',
      containerStatus: '',
      viaNo: '',
      status: ''
    }])
    setFormErrors({
      transType: '',
      vehicleNo: '',
      transporterName: '',
      vehicleWt: ''
    })
  }


  const handleSave = () => {
    setLoading(true);
    setFormErrors({
      transType: '',
      vehicleNo: '',
      transporterName: '',
      vehicleWt: ''
    })

    let errors = {};

    if (!gatePassData.transType) {
      errors.transType = "Trans type is required."
    }

    if (!gatePassData.vehicleNo) {
      errors.vehicleNo = "Vehicle no is required."
    }

    if (!gatePassData.transporterName) {
      errors.transporterName = "Transporter name is required."
    }

    if (!gatePassData.vehicleWt && gatePassData.transType === 'CRG') {
      errors.vehicleWt = "Trunk tare wt is required."
    }

    if (Object.keys(errors).length > 0) {
      setLoading(false);
      setFormErrors(errors);
      toast.error("Please fill in the required fields.", {
        autoClose: 1000
      })
      return;
    }

    let finalData = [];
    console.log('gatePassData.transType ', gatePassData.transType);

    if (gatePassData.transType === 'CONT' || gatePassData.transType === 'MOVE') {
      finalData = multipleGatePassData.filter(item => item.containerNo !== '')

      if (finalData.length === 0) {
        toast.error("Please select container no.", {
          autoClose: 800
        })
        setLoading(false);
        return;
      }

      console.log('finalData1 ', finalData);

    }
    else if (gatePassData.transType === 'CRG') {
      finalData = multipleGatePassData.filter(item => item.sbNo !== '')

      if (finalData.length === 0) {
        toast.error("Please select shipping bill no.", {
          autoClose: 800
        })
        setLoading(false);
        return;
      }
    }
    if (gatePassData.transType === 'BOWC') {
      finalData = multipleGatePassData.filter(item => item.containerNo !== '')

      if (finalData.length === 0) {
        toast.error("Please select container no.", {
          autoClose: 800
        })
        setLoading(false);
        return;
      }
    }
    console.log('finalData2 ', finalData);
    const formData = {
      gatePassData: gatePassData,
      multipleGatePassData: finalData
    }
    axios.post(`${ipaddress}exportGatePass/saveGatePass?cid=${companyid}&bid=${branchId}&user=${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {

        const data = response.data;
        const singleData = data[0]


        toast.success('Data save successfully!!!', {
          autoClose: 800
        })

        if (singleData.transType === 'CONT' || singleData.transType === 'MOVE') {
          setGatepassData({
            companyId: companyid || '',
            branchId: branchId || '',
            gatePassId: singleData.gatePassId || '',
            profitcentreId: 'CFS Export',
            gatePassDate: new Date(singleData.gatePassDate) || new Date(),
            transType: singleData.transType || '',
            status: singleData.status || '',
            createdBy: singleData.createdBy || '',
            vehicleId: singleData.vehicleId || '',
            vehicleNo: singleData.vehicleNo || '',
            driverName: singleData.driverName || '',
            transporter: singleData.transporter || '',
            transporterName: singleData.transporterName || '',
            comments: singleData.comments || '',
            vehicleWt: ''
          })


          let gateData = [{}];

          gateData = data.map((item) => (
            {
              companyId: '',
              branchId: '',
              gatePassId: '',
              srNo: '',
              sbTransId: item.sbTransId || '',
              sbNo: item.sbNo || '',
              movementReqId: item.movementReqId || '',
              cha: item.cha || '',
              chaName: item.chaName || '',
              customsSealNo: item.customsSealNo || '',
              agentSealNo: item.agentSealNo || '',
              containerNo: item.containerNo || '',
              containerSize: item.containerSize || '',
              containerType: item.containerType || '',
              sbDate: item.sbDate === null ? null : new Date(item.sbDate),
              pod: item.pod || '',
              grossWt: item.grossWt || '',
              pol: item.pol || '',
              containerStatus: item.containerStatus || 'FCL',
              viaNo: item.viaNo || '',
              status: item.status || ''
            }
          ))

          setMultipleGatePassData(gateData);

        }
        else if (singleData.transType === 'CRG') {
          setGatepassData({
            companyId: companyid || '',
            branchId: branchId || '',
            gatePassId: singleData.gatePassId || '',
            profitcentreId: 'CFS Export',
            gatePassDate: new Date(singleData.gatePassDate) || new Date(),
            transType: singleData.transType || '',
            status: singleData.status || '',
            createdBy: singleData.createdBy || '',
            vehicleId: singleData.vehicleId || '',
            vehicleNo: singleData.vehicleNo || '',
            driverName: singleData.driverName || '',
            transporter: singleData.transporter || '',
            transporterName: singleData.transporterName || '',
            comments: singleData.comments || '',
            vehicleWt: singleData.vehicleWt || ''
          })


          let gateData = [{}];

          gateData = data.map((item) => (
            {
              companyId: '',
              branchId: '',
              gatePassId: '',
              srNo: '',
              sbTransId: item.sbTransId || '',
              sbNo: item.sbNo || '',
              movementReqId: '',
              stuffTallyId: item.stuffTallyId || '',
              cha: '',
              chaName: '',
              customsSealNo: item.importerName || '',
              agentSealNo: '',
              containerNo: '',
              containerSize: '',
              containerType: '',
              sbDate: item.sbDate === null ? null : new Date(item.sbDate),
              pod: item.backToTownPackages || '',
              grossWt: '',
              pol: item.commodity || '',
              containerStatus: '',
              viaNo: '',
              status: item.status || ''
            }
          ))

          setMultipleGatePassData(gateData);

        }
        else if (singleData.transType === 'BOWC') {
          setGatepassData({
            companyId: companyid || '',
            branchId: branchId || '',
            gatePassId: singleData.gatePassId || '',
            profitcentreId: 'CFS Export',
            gatePassDate: new Date(singleData.gatePassDate) || new Date(),
            transType: singleData.transType || '',
            status: singleData.status || '',
            createdBy: singleData.createdBy || '',
            vehicleId: singleData.vehicleId || '',
            vehicleNo: singleData.vehicleNo || '',
            driverName: singleData.driverName || '',
            transporter: singleData.transporter || '',
            transporterName: singleData.transporterName || '',
            comments: singleData.comments || '',
            vehicleWt: ''
          })


          let gateData = [{}];

          gateData = data.map((item) => (
            {
              companyId: '',
              branchId: '',
              gatePassId: '',
              srNo: '',
              sbTransId: item.sbTransId || '',
              sbNo: item.sbNo || '',
              movementReqId: item.movementReqId || '',
              cha: item.cha || '',
              chaName: item.chaName || '',
              customsSealNo: item.customsSealNo || '',
              agentSealNo: item.agentSealNo || '',
              containerNo: item.containerNo || '',
              containerSize: item.containerSize || '',
              containerType: item.containerType || '',
              sbDate: item.sbDate === null ? null : new Date(item.sbDate),
              pod: item.pod || '',
              grossWt: item.grossWt || '',
              pol: item.pol || '',
              containerStatus: item.containerStatus || 'FCL',
              viaNo: item.viaNo || '',
              status: item.status || ''
            }
          ))

          setMultipleGatePassData(gateData);

        }
        if (searchData && (searchData.sbNo || searchData.container)
        ) {
          updatePagesList("P00231");
        }

        setLoading(false);
      })
      .catch((error) => {
        console.log('error ', error);

        toast.error(error.response.data, {
          autoClose: 800
        })
        setLoading(false);
      })
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
    axios.get(`${ipaddress}exportGatePass/searchGatepass?cid=${companyid}&bid=${branchId}&val=${id}`, {
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


  const getSelectedData = (id, type) => {
    setLoading(true);

    axios.get(`${ipaddress}exportGatePass/getSearchSelectedData?cid=${companyid}&bid=${branchId}&val=${id}&type=${type}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {

        const data = response.data;
        const singleData = data[0]

        console.log('data ', data);



        if (singleData.transType === 'CONT' || singleData.transType === 'MOVE') {
          setGatepassData({
            companyId: companyid || '',
            branchId: branchId || '',
            gatePassId: singleData.gatePassId || '',
            profitcentreId: 'CFS Export',
            gatePassDate: new Date(singleData.gatePassDate) || new Date(),
            transType: singleData.transType || '',
            status: singleData.status || '',
            createdBy: singleData.createdBy || '',
            vehicleId: singleData.vehicleId || '',
            vehicleNo: singleData.vehicleNo || '',
            driverName: singleData.driverName || '',
            transporter: singleData.transporter || '',
            transporterName: singleData.transporterName || '',
            comments: singleData.comments || '',
            vehicleWt: ''
          })


          let gateData = [{}];

          gateData = data.map((item) => (
            {
              companyId: '',
              branchId: '',
              gatePassId: '',
              srNo: '',
              sbTransId: item.sbTransId || '',
              sbNo: item.sbNo || '',
              movementReqId: item.movementReqId || '',
              cha: item.cha || '',
              chaName: item.chaName || '',
              customsSealNo: item.customsSealNo || '',
              agentSealNo: item.agentSealNo || '',
              containerNo: item.containerNo || '',
              containerSize: item.containerSize || '',
              containerType: item.containerType || '',
              sbDate: item.sbDate === null ? null : new Date(item.sbDate),
              pod: item.pod || '',
              grossWt: item.grossWt || '',
              pol: item.pol || '',
              containerStatus: item.containerStatus || 'FCL',
              viaNo: item.viaNo || '',
              status: item.status || ''
            }
          ))

          setMultipleGatePassData(gateData);

        }
        else if (singleData.transType === 'CRG') {
          setGatepassData({
            companyId: companyid || '',
            branchId: branchId || '',
            gatePassId: singleData.gatePassId || '',
            profitcentreId: 'CFS Export',
            gatePassDate: new Date(singleData.gatePassDate) || new Date(),
            transType: singleData.transType || '',
            status: singleData.status || '',
            createdBy: singleData.createdBy || '',
            vehicleId: singleData.vehicleId || '',
            vehicleNo: singleData.vehicleNo || '',
            driverName: singleData.driverName || '',
            transporter: singleData.transporter || '',
            transporterName: singleData.transporterName || '',
            comments: singleData.comments || '',
            vehicleWt: singleData.vehicleWt || ''
          })


          let gateData = [{}];

          gateData = data.map((item) => (
            {
              companyId: '',
              branchId: '',
              gatePassId: '',
              srNo: '',
              sbTransId: item.sbTransId || '',
              sbNo: item.sbNo || '',
              movementReqId: '',
              stuffTallyId: item.stuffTallyId || '',
              cha: '',
              chaName: '',
              customsSealNo: item.importerName || '',
              agentSealNo: '',
              containerNo: '',
              containerSize: '',
              containerType: '',
              sbDate: item.sbDate === null ? null : new Date(item.sbDate),
              pod: item.backToTownPackages || '',
              grossWt: '',
              pol: item.commodity || '',
              containerStatus: '',
              viaNo: '',
              status: item.status || ''
            }
          ))

          setMultipleGatePassData(gateData);

        }
        else if (singleData.transType === 'BOWC') {
          setGatepassData({
            companyId: companyid || '',
            branchId: branchId || '',
            gatePassId: singleData.gatePassId || '',
            profitcentreId: 'CFS Export',
            gatePassDate: new Date(singleData.gatePassDate) || new Date(),
            transType: singleData.transType || '',
            status: singleData.status || '',
            createdBy: singleData.createdBy || '',
            vehicleId: singleData.vehicleId || '',
            vehicleNo: singleData.vehicleNo || '',
            driverName: singleData.driverName || '',
            transporter: singleData.transporter || '',
            transporterName: singleData.transporterName || '',
            comments: singleData.comments || '',
            vehicleWt: ''
          })


          let gateData = [{}];

          gateData = data.map((item) => (
            {
              companyId: '',
              branchId: '',
              gatePassId: '',
              srNo: '',
              sbTransId: item.sbTransId || '',
              sbNo: item.sbNo || '',
              movementReqId: item.movementReqId || '',
              cha: item.cha || '',
              chaName: item.chaName || '',
              customsSealNo: item.customsSealNo || '',
              agentSealNo: item.agentSealNo || '',
              containerNo: item.containerNo || '',
              containerSize: item.containerSize || '',
              containerType: item.containerType || '',
              sbDate: item.sbDate === null ? null : new Date(item.sbDate),
              pod: item.pod || '',
              grossWt: item.grossWt || '',
              pol: item.pol || '',
              containerStatus: item.containerStatus || 'FCL',
              viaNo: item.viaNo || '',
              status: item.status || ''
            }
          ))

          setMultipleGatePassData(gateData);

        }



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




  // Back TO Town


  const [bttData, setBttData] = useState([]);

  const searchbackToTownData = (val) => {
    if (val === '') {
      setBttData([]);
      return;
    }

    axios.get(`${ipaddress}exportBackToTown/getDataForGatePass?cid=${companyid}&bid=${branchId}&val=${val}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const portOptions = response.data.map(port => ({
          value: port[0],
          label: port[1],
          transId: port[2]
        }))

        setBttData(portOptions);
      })
      .catch((error) => {
        setBttData([]);
      })
  }

  const handleChangeBtt = async (selectedOption, { action }, index) => {
    if (action === 'clear') {
      setMultipleGatePassData(prevState => {
        const updatedData = [...prevState];
        updatedData[index] = {
          ...updatedData[index],
          companyId: '',
          branchId: '',
          gatePassId: '',
          srNo: '',
          sbTransId: '',
          sbNo: '',
          movementReqId: '',
          stuffTallyId: '',
          cha: '',
          chaName: '',
          customsSealNo: '',
          agentSealNo: '',
          containerNo: '',
          containerSize: '',
          containerType: '',
          sbDate: null,
          pod: '',
          grossWt: '',
          pol: '',
          containerStatus: '',
          viaNo: '',
          status: ''
        };
        return updatedData;
      });

    } else {

      const checkDuplicate = multipleGatePassData.filter(item => item.stuffTallyId === selectedOption.value);

      if (checkDuplicate.length > 0) {
        toast.error("This SB no is already in the list. Please select a different one.", {
          autoClose: 800
        })
        return;
      }


      setMultipleGatePassData(prevState => {
        const updatedData = [...prevState];
        updatedData[index] = {
          ...updatedData[index],
          stuffTallyId: selectedOption.value,
          sbNo: selectedOption.label,
          sbTransId: selectedOption.transId
        };
        return updatedData;
      });


      getBackToTownData(selectedOption.value, selectedOption.label, selectedOption.transId, index)
    }
  };


  const getBackToTownData = (id, sb, trans, index) => {

    axios.get(`${ipaddress}exportBackToTown/getSingleDataForGatePass?cid=${companyid}&bid=${branchId}&id=${id}&sb=${sb}&trans=${trans}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;

        setMultipleGatePassData(prevState => {
          const updatedData = [...prevState];
          updatedData[index] = {
            companyId: '',
            branchId: '',
            gatePassId: '',
            srNo: '',
            sbTransId: data.sbTransId || '',
            sbNo: data.sbNo || '',
            movementReqId: '',
            stuffTallyId: data.backToTownTransId || '',
            cha: '',
            chaName: '',
            customsSealNo: data.importerId || '',
            agentSealNo: '',
            containerNo: '',
            containerSize: '',
            containerType: '',
            sbDate: data.sbDate === null ? null : new Date(data.sbDate),
            pod: data.backToTownPackages || '',
            grossWt: '',
            pol: data.commodity || '',
            containerStatus: '',
            viaNo: '',
            status: ''
          };
          return updatedData;
        });
      })
      .catch((error) => {

      })
  }

  const downloadGatePassReport = () => {


    setLoading(true);
    axios
      .post(
        `${ipaddress}exportReport/exportContGatePassReport?cid=${companyid}&bid=${branchId}&id=${gatePassData.gatePassId}&type=${gatePassData.transType}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        const base64Pdf = response.data; // Assuming the base64 string is returned directly

        // Decode the Base64 string to a binary array
        const binaryData = atob(base64Pdf);

        // Convert binary data to a Uint8Array
        const byteArray = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          byteArray[i] = binaryData.charCodeAt(i);
        }

        // Create a Blob from the Uint8Array
        const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });

        // Generate a URL for the PDF Blob
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Open the PDF in a new tab and trigger printing
        const pdfWindow = window.open(pdfUrl);
        // pdfWindow.onload = () => {
        //     pdfWindow.print();
        // };


        // const base64Pdf = response.data; // Assuming the base64 string is returned directly

        // // Decode the Base64 string to a binary array
        // const binaryData = atob(base64Pdf);

        // // Convert binary data to a Uint8Array
        // const byteArray = new Uint8Array(binaryData.length);
        // for (let i = 0; i < binaryData.length; i++) {
        //     byteArray[i] = binaryData.charCodeAt(i);
        // }

        // // Create a Blob from the Uint8Array
        // const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });

        // // Generate a URL for the PDF Blob
        // const pdfUrl = URL.createObjectURL(pdfBlob);

        // // Create an anchor element for downloading the file
        // const link = document.createElement("a");
        // link.href = pdfUrl;
        // link.download = "GateInReport.pdf"; // The name of the downloaded file
        // link.click();

        // // Clean up the object URL
        // URL.revokeObjectURL(pdfUrl);

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching PDF:', error);
        toast.error(error.response.data, {
          autoClose: 800
        })
        setLoading(false);
      });
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
            /> Search Gate Pass Data</h5>

          </ModalHeader>
          <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
            <Row>
              <Col md={4}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="sbRequestId">
                    Search by Gate Pass Id / SB No / Container No / Vehicle No
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
              <Col md={4} style={{ marginTop: 20 }}>
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
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Gate Pass Id</th>
                    <th scope="col">SB No</th>
                    <th scope="col">Trans Type</th>
                    <th scope="col">Gate Pass Date</th>
                    <th scope="col">Container No</th>
                    <th scope="col">Vehicle No</th>

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
                        <input type="radio" onChange={() => getSelectedData(item[0], item[2])} name="radioGroup" />
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



        <Row>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="gatePassId">
                Gate Pass No
              </label>
              <Row>
                <Col md={9}>
                  <Input
                    className="form-control"
                    type="text"
                    id="gatePassId"
                    name='gatePassId'
                    value={gatePassData.gatePassId}
                    disabled
                  />
                </Col>
                <Col md={3} className="d-flex justify-content-end">
                  <button
                    className="btn btn-outline-primary btn-margin newButton"
                    style={{ height: 31, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    id="submitbtn2"
                    onClick={openGateInModal}
                  >
                    <FontAwesomeIcon icon={faSearch} size="sm" s />
                  </button>
                </Col>
              </Row>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="gatePassDate">
                Gate Pass Date
              </label>
              <div style={{ position: 'relative' }}>
                <DatePicker
                  selected={gatePassData.gatePassDate}
                  name='gatePassDate'
                  id="gatePassDate"
                  dateFormat="dd/MM/yyyy HH:mm"
                  className="form-control"
                  disabled
                  wrapperClassName="custom-react-datepicker-wrapper"
                  customInput={
                    <input
                      style={{
                        height: "30px",
                        width: "100%",
                      }}
                    />

                  }

                />
                <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
              </div>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="transType">
                Trans Type <span style={{ color: 'red' }}>*</span>
              </label>
              <Input
                className={`form-control ${formErrors.transType ? 'error-border' : ''}`}
                type="select"
                value={gatePassData.transType}
                onChange={handleGatePassChange}
                id="transType"
                name='transType'
                disabled={gatePassData.gatePassId !== ''}
              >
                <option value="">Select Trans Type</option>
                <option value="CONT">CLP-Container</option>
                <option value="CRG">CARGO</option>
                <option value="MOVE">PORT RETURN</option>
                <option value="BOWC">BUFFER/ON WHEEL CLP</option>
              </Input>
              <div style={{ color: 'red' }} className="error-message">{formErrors.transType}</div>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Profitcentre
              </label>
              <Input
                className="form-control"
                type="text"
                id="profitcentreId"
                name='profitcentreId'
                value={gatePassData.profitcentreId}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="Status">
                Status
              </label>
              <Input
                className="form-control"
                type="text"
                id="Status"
                name='Status'
                value={gatePassData.status === 'A' ? 'Approved' : gatePassData.status}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="createdBy">
                Created By
              </label>
              <Input
                className="form-control"
                type="text"
                id="createdBy"
                name='createdBy'
                value={gatePassData.createdBy}
                disabled
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Vehicle No <span style={{ color: 'red' }}>*</span>
              </label>
              <CreatableSelect
                value={{ value: gatePassData.vehicleId, label: gatePassData.vehicleNo }}
                onChange={handleVehicleNo}
                onInputChange={getVehicleNo}
                options={vehicleData}
                onCreateOption={(inputValue) => {

                  setGatepassData({
                    ...gatePassData,
                    vehicleId: '',
                    vehicleNo: inputValue.slice(0, 15) // Assign the value to transporterName as well
                  });
                  setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    ['vehicleNo']: "",
                  }));
                }}
                placeholder="Select Vehicle No"
                isClearable
                id="vehicleNo"
                name='vehicleNo'
                className={`autocompleteHeight ${formErrors.vehicleNo ? 'error-border' : ''}`}
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
              <div style={{ color: 'red' }} className="error-message">{formErrors.vehicleNo}</div>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Transporter Name <span style={{ color: 'red' }}>*</span>
              </label>
              <CreatableSelect
                value={{ value: gatePassData.transporter, label: gatePassData.transporterName }}
                onChange={handleTransporter}

                isDisabled={gatePassData.gatePassId !== ''}
                onCreateOption={(inputValue) => {

                  setGatepassData({
                    ...gatePassData,
                    transporter: '',  // Save the manually typed value
                    transporterName: inputValue.slice(0, 50) // Assign the value to transporterName as well
                  });
                  setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    ['transporterName']: "",
                  }));
                }}
                options={transporterData}
                placeholder="Select or Type Transporter"
                isClearable
                id="transporterName"
                name="transporterName"
                className={`autocompleteHeight ${formErrors.transporterName ? 'error-border' : ''}`}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    height: 32,
                    minHeight: 32,
                    border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
                    boxShadow: "none",
                    display: 'flex',
                    alignItems: 'center',
                    padding: 0,
                    //  borderColor: formErrors.transporterName ? 'red' : '',
                    borderRadius: '6px',
                    "&:hover": {
                      border: "1px solid #ccc",

                    },
                  }),
                  valueContainer: (provided) => ({
                    ...provided,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 0.75rem',
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    lineHeight: '32px',
                  }),
                  indicatorSeparator: () => ({
                    display: "none",
                  }),
                  dropdownIndicator: () => ({
                    display: "none",
                  }),
                  placeholder: (provided) => ({
                    ...provided,
                    lineHeight: '32px',
                    color: "gray",
                  }),
                  clearIndicator: (provided) => ({
                    ...provided,
                    padding: 2,
                    display: 'flex',
                    alignItems: 'center',
                  }),
                }}
              />
              <div style={{ color: 'red' }} className="error-message">{formErrors.transporterName}</div>
            </FormGroup>
          </Col>
          {gatePassData.transType === 'CRG' && (
            <Col md={2}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Truck Tare Wt <span style={{ color: 'red' }}>*</span>
                </label>
                <Input
                  className={`form-control ${formErrors.vehicleWt ? 'error-border' : ''}`}
                  type="text"
                  id="vehicleWt"
                  name='vehicleWt'
                  value={gatePassData.vehicleWt}
                  maxLength={150}
                  onChange={(e) => handleGatePassChange(e, 13, 3)}
                />
                <div style={{ color: 'red' }} className="error-message">{formErrors.vehicleWt}</div>
              </FormGroup>
            </Col>
          )}
          <Col md={2}>
            <FormGroup>
              <label className="forlabel bold-label" htmlFor="sbRequestId">
                Comments
              </label>
              <Input
                className="form-control"
                type="textarea"
                id="comments"
                name='comments'
                value={gatePassData.comments}
                maxLength={150}
                onChange={handleGatePassChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className='text-center'>
          <Col>
            <button
              className="btn btn-outline-primary btn-margin newButton"
              style={{ marginRight: 10, fontSize: 13 }}
              id="submitbtn2"
              onClick={handleSave}
            >
              <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
              Save
            </button>
            <button
              className="btn btn-outline-danger btn-margin newButton"
              style={{ marginRight: 10, fontSize: 13 }}
              id="submitbtn2"
              onClick={handleClear}
            >
              <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
              Clear
            </button>
            <button
              className="btn btn-outline-primary btn-margin newButton"
              style={{ marginRight: 10, fontSize: 13 }}
              id="submitbtn2"
              onClick={addRow}
              disabled={gatePassData.gatePassId !== ''}
            >
              <FontAwesomeIcon icon={faAdd} style={{ marginRight: "5px" }} />
              Add Details
            </button>
            <button
              className="btn btn-outline-success btn-margin newButton"
              style={{ marginRight: 10, fontSize: 13 }}
              id="submitbtn2"
              disabled={gatePassData.gatePassId === ''}
              onClick={downloadGatePassReport}
            >
              <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
              Print Report
            </button>
          </Col>
        </Row>

        {gatePassData.transType === 'CRG' ? (
          <div className="table-responsive mt-4 mb-6">
            <Table className="table table-bordered table-hover tableHeader">
              <thead className="thead-dark bg-dark"  >
                <tr>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>Sr No</th>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>SB No</th>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>SB Date</th>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>Back To Town Id</th>
                  <th scope="col" className="text-center" style={{ color: 'black', minWidth: 150 }}>Exporter</th>
                  <th scope="col" className="text-center" style={{ color: 'black', minWidth: 150 }}>Cargo</th>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>BTT Qty</th>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>Status</th>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {multipleGatePassData.map((item, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <Select
                        value={{ value: item.sbNo, label: item.sbNo }}
                        onChange={(option, actionMeta) => handleChangeBtt(option, actionMeta, index)}
                        onInputChange={searchbackToTownData}
                        isDisabled={gatePassData.gatePassId !== ''}
                        options={bttData}
                        placeholder="Select Container No"
                        isClearable
                        id="containerNo"
                        name='containerNo'
                        menuPlacement="top"
                        menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                        menuPosition="fixed" // Sets the dropdown menu position to fixed
                        className={`autocompleteHeight `}
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            height: 32, // Set height
                            minHeight: 32, // Set minimum height
                            minWidth: 170,
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
                            zIndex: 10,
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
                            zIndex: 10,
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
                    </td>
                    <td>
                      <div style={{ position: 'relative', width: 150 }}>
                        <DatePicker
                          selected={item.sbDate}
                          name='sbDate'
                          id="sbDate"
                          dateFormat="dd/MM/yyyy"
                          className="form-control"
                          disabled
                          wrapperClassName="custom-react-datepicker-wrapper"
                          customInput={
                            <input
                              style={{
                                height: "30px",
                                width: "100%",
                              }}
                            />

                          }

                        />
                        <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                      </div>
                    </td>
                    <td>{item.stuffTallyId}</td>
                    <td>{item.customsSealNo}</td>
                    <td>{item.pol}</td>
                    <td>{item.pod}</td>
                    <td>{item.status === 'A' ? 'Approved' : item.status}</td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-margin newButton"
                        style={{ marginRight: 10 }}
                        id="submitbtn2"
                        disabled={gatePassData.gatePassId !== ''}
                        onClick={() => removeRow(index)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          gatePassData.transType !== '' && (
            <div className="table-responsive mt-4 mb-6">
              <Table className="table table-bordered table-hover tableHeader">
                <thead className="thead-dark bg-dark"  >
                  <tr>
                    <th scope="col" className="text-center" style={{ color: 'black' }}>Sr No</th>
                    <th scope="col" className="text-center" style={{ color: 'black' }}>Movement Req Id</th>
                    <th scope="col" className="text-center" style={{ color: 'black' }}>Container No</th>
                    <th scope="col" className="text-center" style={{ color: 'black' }}>Size</th>
                    <th scope="col" className="text-center" style={{ color: 'black' }}>Type</th>
                    <th scope="col" className="text-center" style={{ color: 'black', minWidth: 150 }}>CHA</th>
                    <th scope="col" className="text-center" style={{ color: 'black', minWidth: 80 }}>SB No</th>
                    <th scope="col" className="text-center" style={{ color: 'black' }}>SB Date</th>
                    <th scope="col" className="text-center" style={{ color: 'black' }}>Agent Seal</th>
                    <th scope="col" className="text-center" style={{ color: 'black' }}>Custom Seal</th>
                    <th scope="col" className="text-center" style={{ color: 'black', minWidth: 80 }}>POL</th>
                    <th scope="col" className="text-center" style={{ color: 'black', minWidth: 80 }}>POD</th>
                    <th scope="col" className="text-center" style={{ color: 'black' }}>Gross Weight</th>
                    <th scope="col" className="text-center" style={{ color: 'black' }}>Via No</th>
                    <th scope="col" className="text-center" style={{ color: 'black' }}>Container Status</th>
                    <th scope="col" className="text-center" style={{ color: 'black' }}>Status</th>
                    <th scope="col" className="text-center" style={{ color: 'black' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {multipleGatePassData.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.movementReqId}</td>
                      <td>
                        <Select
                          value={{ value: item.containerNo, label: item.containerNo }}
                          onChange={(option, actionMeta) => handleChangeMovementRequestId(option, actionMeta, index)}
                          onInputChange={getMovementData}
                          isDisabled={gatePassData.gatePassId !== ''}
                          options={movementData}
                          placeholder="Select Container No"
                          isClearable
                          id="containerNo"
                          name='containerNo'
                          menuPlacement="top"
                          menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                          menuPosition="fixed" // Sets the dropdown menu position to fixed
                          className={`autocompleteHeight `}
                          styles={{
                            control: (provided, state) => ({
                              ...provided,
                              height: 32, // Set height
                              minHeight: 32, // Set minimum height
                              minWidth: 170,
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
                              zIndex: 10,
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
                              zIndex: 10,
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
                      </td>
                      <td>{item.containerSize}</td>
                      <td>{item.containerType}</td>
                      <td>{item.chaName}</td>
                      <td>{item.sbNo}</td>
                      <td>
                        <div style={{ position: 'relative', width: 150 }}>
                          <DatePicker
                            selected={item.sbDate}
                            name='sbDate'
                            id="sbDate"
                            dateFormat="dd/MM/yyyy"
                            className="form-control"
                            disabled
                            wrapperClassName="custom-react-datepicker-wrapper"
                            customInput={
                              <input
                                style={{
                                  height: "30px",
                                  width: "100%",
                                }}
                              />

                            }

                          />
                          <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                        </div>
                      </td>
                      <td>{item.agentSealNo}</td>
                      <td>{item.customsSealNo}</td>
                      <td>{item.pol}</td>
                      <td>{item.pod}</td>
                      <td>{item.grossWt}</td>
                      <td>{item.viaNo}</td>
                      <td>{item.containerStatus}</td>
                      <td>{item.status === 'A' ? 'Approved' : item.status}</td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-margin newButton"
                          style={{ marginRight: 10 }}
                          id="submitbtn2"
                          disabled={gatePassData.gatePassId !== ''}
                          onClick={() => removeRow(index)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default ShippingBillWiseGateOutPass;

