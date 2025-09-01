
import AuthContext from '../Components/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import ipaddress from "../Components/IpAddress";
import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts';
import Select, { components } from 'react-select';
import { Pagination } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faCalendarAlt, faAdd, faCancel, faXmark, faArrowDown, faPlus, faArrowUp, faEdit, faChevronUp, faChevronDown, faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import useAxios from '../Components/useAxios';
import { dark } from '@mui/material/styles/createPalette';
import { toast } from 'react-toastify';
import { CSSTransition } from 'react-transition-group';
import { error } from 'jquery';

export default function EmptyContainerGateOut({ activeTab }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    },
    label: {
      backgroundColor: '#e3eefa',
      padding: '5px',
      borderRadius: '4px',
    }
  };

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {

      navigate('/login?message=You need to be authenticated to access this page.');
    }
  }, [isAuthenticated, navigate]);

  const axios = useAxios();

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
    tabMenus,
    userRights
  } = useContext(AuthContext);
  const location = useLocation();

  const [gateOutData, setGateOutData] = useState({
    companyId: '',
    branchId: '',
    finYear: new Date().getFullYear(),
    gateOutId: '',
    erpDocRefNo: '',
    docRefNo: '',
    srNo: '',
    profitcentreId: '',
    transType: '',
    gateOutDate: new Date(),
    gateNoOut: '',
    containerNo: '',
    containerSize: '',
    containerType: '',
    containerHealth: '',
    movementType: '',
    isoCode: '',
    tareWt: '',
    sl: '',
    sa: '',
    shipper: '',
    cha: '',
    chaName: '',
    vehicleId: '',
    vehicleNo: '',
    driverName: '',
    onAccountOf: '',
    deliveryOrderNo: '',
    deliveryOrderDate: null,
    doValidityDate: null,
    gatePassNo: '',
    gatePassDate: null,
    location: '',
    fromLocation: '',
    gateInDate: null,
    status: '',
    createdBy: '',
    createdDate: null,
  })

  const [multipleGateOutData, setMultipleGateOutData] = useState([{
    companyId: '',
    branchId: '',
    finYear: new Date().getFullYear(),
    gateOutId: '',
    erpDocRefNo: '',
    docRefNo: '',
    srNo: '',
    profitcentreId: '',
    transType: '',
    gateOutDate: new Date(),
    gateNoOut: '',
    containerNo: '',
    containerSize: '',
    containerType: '',
    containerHealth: '',
    movementType: '',
    isoCode: '',
    tareWt: '',
    sl: '',
    sa: '',
    shipper: '',
    cha: '',
    chaName: '',
    vehicleId: '',
    vehicleNo: '',
    driverName: '',
    onAccountOf: '',
    deliveryOrderNo: '',
    deliveryOrderDate: null,
    doValidityDate: null,
    gatePassNo: '',
    gatePassDate: null,
    location: '',
    fromLocation: '',
    gateInDate: null,
    status: '',
    createdBy: '',
    createdDate: null,
  }])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGateOutData((prevState) => ({
      ...prevState,
      [name]: value
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  }


  const [profitData, setProfitData] = useState([]);

  const getProfitCenters = () => {
    axios.get(`${ipaddress}api/profitcentres/getAllProfitCenters?companyId=${companyid}&branchId=${branchId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {

        if (response.data.length === 0) {
          setProfitData([]);
        }
        else {
          setProfitData(response.data);
        }

      })
      .catch((error) => {
        setProfitData([]);
      })
  }

  useEffect(() => {
    if (activeTab === 'P00605') {

      getProfitCenters();
    }
  }, [activeTab])

  const [vehicleData, setVehicleData] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchData, setSearchData] = useState([]);

  const [formErrors, setFormErrors] = useState({
    gatePassNo: '',
    vehicleNo: ''
  })

  const getVehicleData = (veh) => {

    if (!veh) {
      setVehicleData([]);
      return;
    }

    axios.get(`${ipaddress}importGatePass/getEmptyVehicle1?cid=${companyid}&bid=${branchId}&veh=${veh}`, {
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

  const handleChangeSingleVeh = async (selectedOption, { action }) => {
    if (action === 'clear') {
      setGateOutData({
        ...gateOutData,
        vehicleNo: '',
        vehicleId: '',
        driverName: ''
      })
      setVehicleData([]);
    }
    else {
      setGateOutData({
        ...gateOutData,
        vehicleNo: selectedOption.label || '',
        vehicleId: selectedOption.value || '',
        driverName: selectedOption.driver || ''
      })
      setFormErrors({
        ...formErrors,
        vehicleNo: ''
      })
    }
  }

  const handleClear = () => {
    setFormErrors({
      gatePassNo: '',
      vehicleNo: ''
    })
    setSearchId('');
    setSearchName('');
    setSearchData([]);
    setGateOutData({
      companyId: '',
      branchId: '',
      finYear: new Date().getFullYear(),
      gateOutId: '',
      erpDocRefNo: '',
      docRefNo: '',
      srNo: '',
      profitcentreId: '',
      transType: '',
      gateOutDate: new Date(),
      gateNoOut: '',
      containerNo: '',
      containerSize: '',
      containerType: '',
      containerHealth: '',
      movementType: '',
      isoCode: '',
      tareWt: '',
      sl: '',
      sa: '',
      shipper: '',
      cha: '',
      chaName: '',
      vehicleId: '',
      vehicleNo: '',
      driverName: '',
      onAccountOf: '',
      deliveryOrderNo: '',
      deliveryOrderDate: null,
      doValidityDate: null,
      gatePassNo: '',
      gatePassDate: null,
      location: '',
      fromLocation: '',
      gateInDate: null,
      status: '',
      createdBy: '',
      createdDate: null,
    })

    setMultipleGateOutData([{
      companyId: '',
      branchId: '',
      finYear: new Date().getFullYear(),
      gateOutId: '',
      erpDocRefNo: '',
      docRefNo: '',
      srNo: '',
      profitcentreId: '',
      transType: '',
      gateOutDate: new Date(),
      gateNoOut: '',
      containerNo: '',
      containerSize: '',
      containerType: '',
      containerHealth: '',
      movementType: '',
      isoCode: '',
      tareWt: '',
      sl: '',
      sa: '',
      shipper: '',
      cha: '',
      chaName: '',
      vehicleId: '',
      vehicleNo: '',
      driverName: '',
      onAccountOf: '',
      deliveryOrderNo: '',
      deliveryOrderDate: null,
      doValidityDate: null,
      gatePassNo: '',
      gatePassDate: null,
      location: '',
      fromLocation: '',
      gateInDate: null,
      status: '',
      createdBy: '',
      createdDate: null,
    }])
  }


  const handleSave = () => {
    setLoading(true);
    setFormErrors({
      gatePassNo: '',
      vehicleNo: ''
    })

    let errors = {};

    if (!gateOutData.gatePassNo) {
      errors.gatePassNo = "Gate pass no. is required."
    }

    if (!gateOutData.vehicleNo) {
      errors.vehicleNo = "Vehicle no. is required."
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setLoading(false);
      toast.error("Please fill in the required fields.", {
        autoClose: 1000
      })
      return;
    }


    const formData = {
      gateOutData: gateOutData,
      multipleGateOutData: multipleGateOutData
    }

    axios.post(`${ipaddress}commonGatePass/saveGateOutData?cid=${companyid}&bid=${branchId}&user=${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;
        const singleData = data[0];

        setGateOutData({
          companyId: '',
          branchId: '',
          finYear: new Date().getFullYear(),
          gateOutId: singleData[1] || '',
          erpDocRefNo: singleData[0] || '',
          docRefNo: singleData[6] || '',
          srNo: singleData[31] || '',
          profitcentreId: singleData[15] || '',
          transType: singleData[20] || '',
          gateOutDate: new Date(singleData[26]) || null,
          gateNoOut: '',
          containerNo: singleData[18] || '',
          containerSize: singleData[19] || '',
          containerType: singleData[17] || '',
          containerHealth: singleData[16] || '',
          movementType: singleData[32] || '',
          isoCode: singleData[21] || '',
          tareWt: singleData[28] || '',
          sl: singleData[3] || '',
          sa: singleData[24] || '',
          shipper: singleData[8] || '',
          cha: singleData[9] || '',
          chaName: singleData[10] || '',
          vehicleId: singleData[30] || '',
          vehicleNo: singleData[29] || '',
          driverName: singleData[34] || '',
          onAccountOf: singleData[5] || '',
          deliveryOrderNo: singleData[11] || '',
          deliveryOrderDate: singleData[12] === null ? null : new Date(singleData[12]) || null,
          doValidityDate: singleData[13] === null ? null : new Date(singleData[13]) || null,
          gatePassNo: singleData[22] || '',
          gatePassDate: new Date(singleData[33]) || '',
          location: singleData[14] || '',
          fromLocation: singleData[25] || '',
          gateInDate: singleData[27] === null ? null : new Date(singleData[27]) || null,
          status: '',
          createdBy: '',
          createdDate: null,
        })

        setMultipleGateOutData(data.map(item => ({
          companyId: '',
          branchId: '',
          finYear: new Date().getFullYear(),
          gateOutId: item[1] || '',
          erpDocRefNo: item[0] || '',
          docRefNo: item[6] || '',
          srNo: item[31] || '',
          profitcentreId: item[15] || '',
          transType: item[20] || '',
          gateOutDate: new Date(singleData[26]) || null,
          gateNoOut: '',
          containerNo: item[18] || '',
          containerSize: item[19] || '',
          containerType: item[17] || '',
          containerHealth: item[16] || '',
          movementType: item[32] || '',
          isoCode: item[21] || '',
          tareWt: item[28] || '',
          sl: item[3] || '',
          sa: item[24] || '',
          shipper: item[8] || '',
          cha: item[9] || '',
          chaName: item[10] || '',
          vehicleId: item[30] || '',
          vehicleNo: item[29] || '',
          driverName: item[34] || '',
          onAccountOf: item[5] || '',
          deliveryOrderNo: item[11] || '',
          deliveryOrderDate: item[12] === null ? null : new Date(item[12]) || null,
          doValidityDate: item[13] === null ? null : new Date(item[13]) || null,
          gatePassNo: item[22] || '',
          gatePassDate: new Date(item[33]) || '',
          location: item[14] || '',
          fromLocation: item[25] || '',
          gateInDate: item[27] === null ? null : new Date(item[27]) || null,
          status: '',
          createdBy: '',
          createdDate: null,
        })))

        toast.success('Data save successfully!!', {
          autoClose: 800
        })

        setLoading(false);
      })
      .catch((error) => {
        setGateOutData({
          companyId: '',
          branchId: '',
          finYear: new Date().getFullYear(),
          gateOutId: '',
          erpDocRefNo: '',
          docRefNo: '',
          srNo: '',
          profitcentreId: '',
          transType: '',
          gateOutDate: new Date(),
          gateNoOut: '',
          containerNo: '',
          containerSize: '',
          containerType: '',
          containerHealth: '',
          movementType: '',
          isoCode: '',
          tareWt: '',
          sl: '',
          sa: '',
          shipper: '',
          cha: '',
          chaName: '',
          vehicleId: '',
          vehicleNo: '',
          driverName: '',
          onAccountOf: '',
          deliveryOrderNo: '',
          deliveryOrderDate: null,
          doValidityDate: null,
          gatePassNo: '',
          gatePassDate: null,
          location: '',
          fromLocation: '',
          gateInDate: null,
          status: '',
          createdBy: '',
          createdDate: null,
        })

        setMultipleGateOutData([{
          companyId: '',
          branchId: '',
          finYear: new Date().getFullYear(),
          gateOutId: '',
          erpDocRefNo: '',
          docRefNo: '',
          srNo: '',
          profitcentreId: '',
          transType: '',
          gateOutDate: new Date(),
          gateNoOut: '',
          containerNo: '',
          containerSize: '',
          containerType: '',
          containerHealth: '',
          movementType: '',
          isoCode: '',
          tareWt: '',
          sl: '',
          sa: '',
          shipper: '',
          cha: '',
          chaName: '',
          vehicleId: '',
          vehicleNo: '',
          driverName: '',
          onAccountOf: '',
          deliveryOrderNo: '',
          deliveryOrderDate: null,
          doValidityDate: null,
          gatePassNo: '',
          gatePassDate: null,
          location: '',
          fromLocation: '',
          gateInDate: null,
          status: '',
          createdBy: '',
          createdDate: null,
        }])

        setLoading(false);
      })

  }

  const searchPendingVehicleNo = (val) => {
    if (!val) {
      setSearchData([]);
      return;
    }

    axios.get(`${ipaddress}commonGatePass/getPendingVehicleData?cid=${companyid}&bid=${branchId}&val=${val}`, {
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

        setSearchData(portOptions);
      })
      .catch((error) => {
        setSearchData([]);
      })
  }

  const handlePendingVehicleNoChange = async (selectedOption, { action }) => {

    if (action === 'clear') {
      setSearchId('');
      setSearchName('');

      handleClear();
    }
    else {
      setSearchId(selectedOption.value);
      setSearchName(selectedOption.label);
      getSelectedDataForGateOut(selectedOption.value);
    }
  }

  const getSelectedDataForGateOut = (val) => {
    if (!val) {
      return;
    }

    setFormErrors({
      gatePassNo: '',
      vehicleNo: ''
    })

    axios.get(`${ipaddress}commonGatePass/getPendingVehicleDataByGatepassId?cid=${companyid}&bid=${branchId}&val=${val}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {

        const data = response.data;
        const singleData = data[0];

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set the time to midnight (00:00:00)

        const validityDate = new Date(singleData[13]);
        validityDate.setHours(0, 0, 0, 0); // Set the time to midnight (00:00:00)

        if (validityDate < today) {
          toast.error("The do validity date has already expired.", {
            autoClose: 800
          });
          return;
        }


        setGateOutData({
          companyId: '',
          branchId: '',
          finYear: new Date().getFullYear(),
          gateOutId: '',
          erpDocRefNo: singleData[0] || '',
          docRefNo: singleData[6] || '',
          srNo: singleData[31] || '',
          profitcentreId: singleData[15] || '',
          transType: singleData[20] || '',
          gateOutDate: new Date(),
          gateNoOut: '',
          containerNo: singleData[18] || '',
          containerSize: singleData[19] || '',
          containerType: singleData[17] || '',
          containerHealth: singleData[16] || '',
          movementType: singleData[32] || '',
          isoCode: singleData[21] || '',
          tareWt: singleData[28] || '',
          sl: singleData[3] || '',
          sa: singleData[24] || '',
          shipper: singleData[8] || '',
          cha: singleData[9] || '',
          chaName: singleData[10] || '',
          vehicleId: singleData[30] || '',
          vehicleNo: singleData[29] || '',
          driverName: singleData[34] || '',
          onAccountOf: singleData[5] || '',
          deliveryOrderNo: singleData[11] || '',
          deliveryOrderDate: singleData[12] === null ? null : new Date(singleData[12]) || null,
          doValidityDate: singleData[13] === null ? null : new Date(singleData[13]) || null,
          gatePassNo: singleData[22] || '',
          gatePassDate: new Date(singleData[33]) || '',
          location: singleData[14] || '',
          fromLocation: singleData[25] || '',
          gateInDate: singleData[27] === null ? null : new Date(singleData[27]) || null,
          status: '',
          createdBy: '',
          createdDate: null,
        })

        setMultipleGateOutData(data.map(item => ({
          companyId: '',
          branchId: '',
          finYear: new Date().getFullYear(),
          gateOutId: '',
          erpDocRefNo: item[0] || '',
          docRefNo: item[6] || '',
          srNo: item[31] || '',
          profitcentreId: item[15] || '',
          transType: item[20] || '',
          gateOutDate: new Date(),
          gateNoOut: '',
          containerNo: item[18] || '',
          containerSize: item[19] || '',
          containerType: item[17] || '',
          containerHealth: item[16] || '',
          movementType: item[32] || '',
          isoCode: item[21] || '',
          tareWt: item[28] || '',
          sl: item[3] || '',
          sa: item[24] || '',
          shipper: item[8] || '',
          cha: item[9] || '',
          chaName: item[10] || '',
          vehicleId: item[30] || '',
          vehicleNo: item[29] || '',
          driverName: item[34] || '',
          onAccountOf: item[5] || '',
          deliveryOrderNo: item[11] || '',
          deliveryOrderDate: item[12] === null ? null : new Date(item[12]) || null,
          doValidityDate: item[13] === null ? null : new Date(item[13]) || null,
          gatePassNo: item[22] || '',
          gatePassDate: new Date(item[33]) || '',
          location: item[14] || '',
          fromLocation: item[25] || '',
          gateInDate: item[27] === null ? null : new Date(item[27]) || null,
          status: '',
          createdBy: '',
          createdDate: null,
        })))
      })
      .catch((error) => {
        setGateOutData({
          companyId: '',
          branchId: '',
          finYear: new Date().getFullYear(),
          gateOutId: '',
          erpDocRefNo: '',
          docRefNo: '',
          srNo: '',
          profitcentreId: '',
          transType: '',
          gateOutDate: new Date(),
          gateNoOut: '',
          containerNo: '',
          containerSize: '',
          containerType: '',
          containerHealth: '',
          movementType: '',
          isoCode: '',
          tareWt: '',
          sl: '',
          sa: '',
          shipper: '',
          cha: '',
          chaName: '',
          vehicleId: '',
          vehicleNo: '',
          driverName: '',
          onAccountOf: '',
          deliveryOrderNo: '',
          deliveryOrderDate: null,
          doValidityDate: null,
          gatePassNo: '',
          gatePassDate: null,
          location: '',
          fromLocation: '',
          gateInDate: null,
          status: '',
          createdBy: '',
          createdDate: null,
        })

        setMultipleGateOutData([{
          companyId: '',
          branchId: '',
          finYear: new Date().getFullYear(),
          gateOutId: '',
          erpDocRefNo: '',
          docRefNo: '',
          srNo: '',
          profitcentreId: '',
          transType: '',
          gateOutDate: new Date(),
          gateNoOut: '',
          containerNo: '',
          containerSize: '',
          containerType: '',
          containerHealth: '',
          movementType: '',
          isoCode: '',
          tareWt: '',
          sl: '',
          sa: '',
          shipper: '',
          cha: '',
          chaName: '',
          vehicleId: '',
          vehicleNo: '',
          driverName: '',
          onAccountOf: '',
          deliveryOrderNo: '',
          deliveryOrderDate: null,
          doValidityDate: null,
          gatePassNo: '',
          gatePassDate: null,
          location: '',
          fromLocation: '',
          gateInDate: null,
          status: '',
          createdBy: '',
          createdDate: null,
        }])
      })
  }


  const [isModalOpenForGateOutSearch, setisModalOpenForGateOutSearch] = useState(false);
  const [searchGateOutId, setsearchGateOutId] = useState('');
  const [searchGateOutData, setsearchGateOutData] = useState([]);

  const openModalForGatePassSearch = () => {
    setisModalOpenForGateOutSearch(true);
    setsearchGateOutId('');
    searchGateOut('');
  }

  const closeModalForGatePassSearch = () => {
    setisModalOpenForGateOutSearch(false);
    setsearchGateOutId('');
    setsearchGateOutData([]);
  }

  const handleGatePassSearchClear = () => {
    setsearchGateOutId('');
    searchGateOut('');
  }

  const searchGateOut = (id) => {
    setLoading(true);
    axios.get(`${ipaddress}commonGatePass/searchGateOut?cid=${companyid}&bid=${branchId}&val=${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        setsearchGateOutData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data, {
          autoClose: 800
        })
        setsearchGateOutData([]);
        setLoading(false);
      })
  }

  const selectData = (gatepass, gateout) => {
    console.log('gatepass, gateout ', gatepass, gateout);

    axios.get(`${ipaddress}commonGatePass/getGateOutData?cid=${companyid}&bid=${branchId}&gatepass=${gatepass}&gateout=${gateout}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;

        const singleData = data[0];
        setGateOutData({
          companyId: '',
          branchId: '',
          finYear: new Date().getFullYear(),
          gateOutId: singleData[1] || '',
          erpDocRefNo: singleData[0] || '',
          docRefNo: singleData[6] || '',
          srNo: singleData[31] || '',
          profitcentreId: singleData[15] || '',
          transType: singleData[20] || '',
          gateOutDate: new Date(singleData[26]) || null,
          gateNoOut: '',
          containerNo: singleData[18] || '',
          containerSize: singleData[19] || '',
          containerType: singleData[17] || '',
          containerHealth: singleData[16] || '',
          movementType: singleData[32] || '',
          isoCode: singleData[21] || '',
          tareWt: singleData[28] || '',
          sl: singleData[3] || '',
          sa: singleData[24] || '',
          shipper: singleData[8] || '',
          cha: singleData[9] || '',
          chaName: singleData[10] || '',
          vehicleId: singleData[30] || '',
          vehicleNo: singleData[29] || '',
          driverName: singleData[34] || '',
          onAccountOf: singleData[5] || '',
          deliveryOrderNo: singleData[11] || '',
          deliveryOrderDate: singleData[12] === null ? null : new Date(singleData[12]) || null,
          doValidityDate: singleData[13] === null ? null : new Date(singleData[13]) || null,
          gatePassNo: singleData[22] || '',
          gatePassDate: new Date(singleData[33]) || '',
          location: singleData[14] || '',
          fromLocation: singleData[25] || '',
          gateInDate: singleData[27] === null ? null : new Date(singleData[27]) || null,
          status: '',
          createdBy: '',
          createdDate: null,
        })

        setMultipleGateOutData(data.map(item => ({
          companyId: '',
          branchId: '',
          finYear: new Date().getFullYear(),
          gateOutId: item[1] || '',
          erpDocRefNo: item[0] || '',
          docRefNo: item[6] || '',
          srNo: item[31] || '',
          profitcentreId: item[15] || '',
          transType: item[20] || '',
          gateOutDate: new Date(singleData[26]) || null,
          gateNoOut: '',
          containerNo: item[18] || '',
          containerSize: item[19] || '',
          containerType: item[17] || '',
          containerHealth: item[16] || '',
          movementType: item[32] || '',
          isoCode: item[21] || '',
          tareWt: item[28] || '',
          sl: item[3] || '',
          sa: item[24] || '',
          shipper: item[8] || '',
          cha: item[9] || '',
          chaName: item[10] || '',
          vehicleId: item[30] || '',
          vehicleNo: item[29] || '',
          driverName: item[34] || '',
          onAccountOf: item[5] || '',
          deliveryOrderNo: item[11] || '',
          deliveryOrderDate: item[12] === null ? null : new Date(item[12]) || null,
          doValidityDate: item[13] === null ? null : new Date(item[13]) || null,
          gatePassNo: item[22] || '',
          gatePassDate: new Date(item[33]) || '',
          location: item[14] || '',
          fromLocation: item[25] || '',
          gateInDate: item[27] === null ? null : new Date(item[27]) || null,
          status: '',
          createdBy: '',
          createdDate: null,
        })))

        toast.success('Data found successfully!!', {
          autoClose: 800
        })

        closeModalForGatePassSearch();

      })
      .catch((error) => {
        toast.error(error.response.data, {
          autoClose: 800
        })
      })
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchGateOutData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(searchGateOutData.length / itemsPerPage);

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

  return (
    <div>
      {loading && (
        <div style={styles.overlay}>
          <div className="loader">
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
        </div>
      )}
      <Row>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              Search By Vehicle No
            </label>
            <Select
              value={{ value: searchId, label: searchName }}
              onChange={handlePendingVehicleNoChange}
              onInputChange={searchPendingVehicleNo}
              options={searchData}
              placeholder="Select Vehicle No"
              isClearable
              id="searchId"
              name="searchId"
              className={`autocompleteHeight }`}

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
      <hr />
      <Row>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              Gate Out Id
            </label>
            <Row>
              <Col md={9}>
                <Input
                  className={`form-control`}
                  type="text"
                  id="gateOutId"
                  name='gateOutId'
                  value={gateOutData.gateOutId}
                  disabled
                />
              </Col>
              <Col md={3}>
                <button
                  className="btn btn-outline-primary btn-margin newButton"
                  style={{ marginRight: 10, fontSize: 12 }}
                  id="submitbtn2"
                  onClick={openModalForGatePassSearch}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </Col>
            </Row>
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              Gate Out Date
            </label>
            <div style={{ position: 'relative' }}>
              <DatePicker
                selected={gateOutData.gateOutDate}
                id='gateOutDate'
                disabled
                name='gateOutDate'
                dateFormat="dd/MM/yyyy HH:mm"
                className="form-control border-right-0 inputField"
                customInput={<input style={{ width: '100%' }} />}
                wrapperClassName="custom-react-datepicker-wrapper"
              />
              <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
            </div>
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              Gate Pass Id <span style={{ color: 'red' }}>*</span>
            </label>
            <Input
              className={`form-control ${formErrors.gatePassNo ? 'error-border' : ''}`}
              type="text"
              id="gatePassNo"
              name='gatePassNo'
              value={gateOutData.gatePassNo}
              disabled
            />
            <div style={{ color: 'red' }} className="error-message">{formErrors.gatePassNo}</div>
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              Gate Pass Date
            </label>
            <div style={{ position: 'relative' }}>
              <DatePicker
                selected={gateOutData.gatePassDate}
                id='gatePassDate'
                disabled
                name='gatePassDate'
                dateFormat="dd/MM/yyyy HH:mm"
                className="form-control border-right-0 inputField"
                customInput={<input style={{ width: '100%' }} />}
                wrapperClassName="custom-react-datepicker-wrapper"
              />
              <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
            </div>
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              Job Trans Id
            </label>
            <Input
              value={gateOutData.erpDocRefNo}
              className={`form-control`}
              type="text"
              id="erpDocRefNo"
              name='erpDocRefNo'
              disabled
            />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              Shipping Line
            </label>
            <Input
              value={gateOutData.sl}
              className={`form-control`}
              type="text"
              id="sl"
              name='sl'
              disabled
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              On Account Of
            </label>
            <Input
              className={`form-control`}
              value={gateOutData.onAccountOf}
              type="text"
              id="onAccountOf"
              name='onAccountOf'
              disabled
            />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              Booking No
            </label>
            <Input
              className={`form-control`}
              type="text"
              value={gateOutData.docRefNo}
              id="docRefNo"
              name='docRefNo'
              disabled
            />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              Shipper
            </label>
            <Input
              className={`form-control`}
              type="text"
              value={gateOutData.shipper}
              id="shipper"
              name='shipper'
              disabled
            />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              CHA
            </label>
            <Input
              className={`form-control`}
              type="text"
              value={gateOutData.chaName}
              id="chaName"
              name='chaName'
              disabled
            />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              Do No
            </label>
            <Input
              className={`form-control`}
              type="text"
              value={gateOutData.deliveryOrderNo}
              id="deliveryOrderNo"
              name='deliveryOrderNo'
              disabled
            />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              Do Date
            </label>
            <div style={{ position: 'relative' }}>
              <DatePicker
                selected={gateOutData.deliveryOrderDate}
                id='deliveryOrderDate'
                disabled
                name='deliveryOrderDate'
                dateFormat="dd/MM/yyyy"
                className="form-control border-right-0 inputField"
                customInput={<input style={{ width: '100%' }} />}
                wrapperClassName="custom-react-datepicker-wrapper"
              />
              <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
            </div>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              Do Validity Date
            </label>
            <div style={{ position: 'relative' }}>
              <DatePicker
                selected={gateOutData.doValidityDate}
                id='doValidityDate'
                disabled
                name='doValidityDate'
                dateFormat="dd/MM/yyyy"
                className="form-control border-right-0 inputField"
                customInput={<input style={{ width: '100%' }} />}
                wrapperClassName="custom-react-datepicker-wrapper"
              />
              <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
            </div>
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              To Location
            </label>
            <Input
              className={`form-control`}
              value={gateOutData.location}
              type="text"
              id="location"
              name='location'
              disabled
            />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              Vehicle No <span style={{ color: 'red' }}>*</span>
            </label>
            <Select
              value={{ value: gateOutData.vehicleId, label: gateOutData.vehicleNo }}
              onChange={handleChangeSingleVeh}
              onInputChange={getVehicleData}
              options={vehicleData}
              placeholder="Select Vehicle No"
              isClearable
              id="vehicleNo"
              name="vehicleNo"
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
              Driver Name
            </label>
            <Input
              className={`form-control`}
              value={gateOutData.driverName}
              onChange={handleChange}
              type="text"
              id="driverName"
              name='driverName'
            />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              Profitcentre
            </label>
            <Input
              className={`form-control`}
              type="select"
              value={gateOutData.profitcentreId}
              id="profitcentreId"
              name='profitcentreId'
              disabled
            >
              <option value="">Select Profitcentre</option>
              {profitData.map((item, index) => (
                <option key={index} value={item.profitcentreId}>{item.profitcentreDesc}</option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              Container Health
            </label>
            <Input
              className={`form-control`}
              type="select"
              value={gateOutData.containerHealth}
              id="containerHealth"
              name='containerHealth'
              disabled
            >
              <option value="" selected="">	</option>

              <option value="HDEMAG">Heavy Damage</option>

              <option value="LDEMAG">Light Damage</option>

              <option value="MDEMAG">Medium Damage</option>

              <option value="OK">Healthy</option>
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              Type
            </label>
            <Input
              className={`form-control`}
              type="select"
              id="movementType"
              name='movementType'
              value={gateOutData.movementType}
              disabled
            >
              <option value="">Select Type</option>
              <option value="REEXPORT">Shipper Export</option>
              <option value="REPO">Empty Repo</option>
            </Input>
          </FormGroup>
        </Col>

      </Row>
      <hr />
      <Row className='text-center'>
        <Col>
          <button
            className="btn btn-outline-primary btn-margin newButton"
            style={{ marginRight: 10 }}
            id="submitbtn2"
            onClick={handleSave}
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


        </Col>
      </Row>

      <div className="mt-5 table-responsive">
        <table className="table table-bordered table-hover tableHeader dynamic-table">
          <thead className="tableHeader">
            <tr>
              <th scope="col" className="text-center" style={{ color: 'black' }}>
                Sr No
              </th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Container No</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Size/Type</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>ISO</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Shipping Agent</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>From Location</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Gate in Date</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Tare Wt</th>
            </tr>
          </thead>
          <tbody>
            {multipleGateOutData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.containerNo}</td>
                <td>{item.containerSize}{item.containerType}</td>
                <td>{item.isoCode}</td>
                <td>{item.sa}</td>
                <td>{item.fromLocation}</td>
                <td style={{ width: 200 }}>
                  <div style={{ position: 'relative' }}>
                    <DatePicker
                      selected={item.gateInDate}
                      id='gateInDate'
                      disabled
                      name='gateInDate'
                      dateFormat="dd/MM/yyyy"
                      className="form-control border-right-0 inputField"
                      customInput={<input style={{ width: '100%' }} />}
                      wrapperClassName="custom-react-datepicker-wrapper"
                    />
                    <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
                  </div>
                </td>
                <td>{item.tareWt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>










      <Modal Modal isOpen={isModalOpenForGateOutSearch} onClose={closeModalForGatePassSearch} toggle={closeModalForGatePassSearch} style={{ maxWidth: '1100px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

        <ModalHeader toggle={closeModalForGatePassSearch} style={{
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
          /> Search Empty Container Gate Pass Records</h5>



        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
          <Row>
            <Col md={4}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Search
                </label>
                <Input
                  className={`form-control`}
                  type="text"
                  id="searchGateOutId"
                  name='searchGateOutId'
                  value={searchGateOutId}
                  onChange={(e) => setsearchGateOutId(e.target.value)}
                />

              </FormGroup>
            </Col>
            <Col md={4}>
              <button
                className="btn btn-outline-primary btn-margin newButton"
                style={{ marginRight: 10, marginTop: 20, fontSize: 12 }}
                id="submitbtn2"
                onClick={() => searchGateOut(searchGateOutId)}
              >
                <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
                Search
              </button>
              <button
                className="btn btn-outline-danger btn-margin newButton"
                style={{ marginRight: 10, marginTop: 20, fontSize: 12 }}
                id="submitbtn2"
                onClick={handleGatePassSearchClear}
              >
                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                Clear
              </button>
            </Col>
          </Row>
          <hr />
          <div className="mt-2 table-responsive">
            <table className="table table-bordered table-hover tableHeader dynamic-table">
              <thead className="tableHeader">
                <tr>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>#</th>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>Gate Out Id</th>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>Gate Out Date</th>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>Gate Pass Id</th>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>Gate Pass Date</th>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>Container No</th>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>Shipping Line</th>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>CHA</th>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>Booking No</th>
                  <th scope="col" className="text-center" style={{ color: 'black' }}>Do No</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td><input type="radio" onChange={() => selectData(item[2], item[0])} name="radioGroup" /></td>
                    <td>{item[0]}</td>
                    <td>{item[1]}</td>
                    <td>{item[2]}</td>
                    <td>{item[3]}</td>
                    <td>{item[4]}</td>
                    <td>{item[5]}</td>
                    <td style={{ width: 200 }}>{item[6]}</td>
                    <td>{item[7]}</td>
                    <td>{item[8]}</td>
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
    </div>
  )
}
