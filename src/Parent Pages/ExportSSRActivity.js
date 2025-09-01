
import AuthContext from '../Components/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext, useRef } from 'react';
import '../Components/Style.css';
import ipaddress from "../Components/IpAddress";
import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts';
import Select from 'react-select';
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
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faCalendarAlt, faAdd, faCancel, faXmark, faArrowDown, faPlus, faArrowUp, faEdit, faA, faCamera, faCameraAlt, faPhoneAlt, faCameraRotate } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button } from "react-bootstrap";
import useAxios from '../Components/useAxios';
import { dark } from '@mui/material/styles/createPalette';
import { toast } from 'react-toastify';
import { error } from 'jquery';
import { Collapse } from 'bootstrap';

function ExportSSRActivity({ searchData, resetFlag, updatePagesList }) {
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



  const [ssrDtl, setSsrDtl] = useState({
    companyId: "",
    branchId: "",
    transId: "",
    erpDocRefNo: "",
    docRefNo: "",
    containerNo: "",
    profitcentreId: "",
    serviceId: "",
    transLineNo: null,   // BigDecimal
    transDate: new Date(),     // Date (You can use null for dates)
    ssrRefNo: "",
    docRefDate: null,    // Date
    igmLineNo: "",
    blNo: "",
    blDate: null,        // Date
    beNo: "",
    beDate: null,        // Date
    containerSize: "",
    containerType: "",
    noOfPackages: 0,     // int
    cargoWt: null,       // BigDecimal
    gateOutType: "",
    containerInvoiceType: "",
    commodityDescription: "",
    impId: "",
    sl: "",
    sa: "",
    cha: "",
    accId: "",
    ssrModeFor: "",
    srlNo: null,         // BigDecimal
    serviceUnit: "",
    executionUnit: "",
    serviceUnit1: "",
    executionUnit1: "",
    rate: null,          // BigDecimal
    totalRate: null,     // BigDecimal
    status: "",          // char, defaulting to empty string
    createdBy: "",
    createdDate: null,   // Date
    editedBy: "",
    editedDate: null,    // Date
    approvedBy: "",
    approvedDate: null,  // Date
    assessmentId: "",
    srNo: null,
    ssrType: "",
    srvSrNo: "",
    ssrPartyId: ""
  });

  const [ssrServiceDtl, setSsrServiceDtl] = useState([{
    companyId: "",
    branchId: "",
    transId: "",
    erpDocRefNo: "",
    docRefNo: "",
    containerNo: "",
    profitcentreId: "",
    serviceId: "",
    transLineNo: null,   // BigDecimal
    transDate: null,     // Date (You can use null for dates)
    ssrRefNo: "",
    serviceUnit: "",
    executionUnit: "",
    totalRate: null,
  }]);

  const [addServie, setAddService] = useState([{
    serviceId: "",
    serviceDesc: "",
    serviceUnit: "",
    executionUnit: "",
    rate: "",
    totalRate: "",
  }]);

  const [igmCnData, setIgmCnData] = useState([{
    companyId: '',
    branchId: '',
    containerNo: '',
    containerSize: '',
    containerType: '',
    gateOutType: '',
    cargoWt: '',
    noOfPackages: '',
    stuffTallyId: '',
    cha: '',
    sa: '',
    sl: '',
    onAccountOf: '',
    impId: ''
  }]
  )

  const [searchIgm, setSearchIgm] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [searchContainer, setSearchContainer] = useState('');
  const [services, setServices] = useState([]);

  const getServices = () => {
    axios.get(`${ipaddress}ssr/getServices?cid=${companyid}&bid=${branchId}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;
        const portOptions = data.map(port => ({
          value: port[0],
          label: port[1],
          unit: port[2],
          rate: port[3]
        }))
        setServices(portOptions);
      })
      .catch((error) => {

      })
  }

  useEffect(() => {
    if (searchData.activeTab === 'P00233') {
      getServices();
    }
  }, [searchData])

  const handleChangeServices = async (selectedOption, { action }, index) => {
    if (action === 'clear') {
      setAddService(prevState => {
        const updatedData = [...prevState];
        updatedData[index] = {
          ...updatedData[index],
          serviceId: '',
          serviceDesc: '',
          serviceUnit: '',
          rate: '',
          executionUnit: "",
          rate: "",
          totalRate: ""
        };
        return updatedData;
      });
    } else {
      // Check if the selectedOption.value already exists in addService
      setAddService(prevState => {
        // Check if selectedOption.value already exists in the previous state
        const exists = prevState.some(service => service.serviceId === selectedOption.value);

        if (!exists) {
          const updatedData = [...prevState];

          // Update the specific index with the selected values
          updatedData[index] = {
            ...updatedData[index],
            serviceId: selectedOption.value,
            serviceDesc: selectedOption.label,
            serviceUnit: selectedOption.unit,
            rate: selectedOption.rate,
            executionUnit: "",
            totalRate: ""
          };

          // Check if there's an empty row (serviceId is empty) in the updated data
          const emptyRowExists = updatedData.some(service => service.serviceId === '');

          // If no empty row exists, add a new empty row
          if (!emptyRowExists) {
            updatedData.push({
              serviceId: "",
              serviceDesc: "",
              serviceUnit: "",
              executionUnit: "",
              rate: "",
              totalRate: ""
            });
          }

          return updatedData;
        }

        // If the value already exists, return the previous state without any modification
        return prevState;
      });
    }
  };


  function handleInputChange(e) {
    const inputValue = e;
    const numericInput = inputValue.replace(/[^0-9.]/g, '');
    const parts = numericInput.split('.');
    const integerPart = parts[0].slice(0, 10);
    let decimalPart = parts[1];

    // Limit decimal places if needed
    if (decimalPart !== undefined) {
      decimalPart = `.${decimalPart.slice(0, 3)}`;
    }

    const sanitizedInput = decimalPart !== undefined ? `${integerPart}${decimalPart}` : integerPart;
    return sanitizedInput;
  };

  const handleChangeAddService = (e, index) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    // Sanitize input for specific fields
    if (['executionUnit', 'rate', 'totalRate'].includes(name)) {
      sanitizedValue = handleInputChange(value);
    }

    // Update igmCrgData state
    setAddService(prevState => {
      const updatedData = [...prevState];
      const currentRow = updatedData[index];

      // Update the current field
      currentRow[name] = sanitizedValue;

      // If either 'rate' or 'executionUnit' changes, calculate 'totalRate'
      const rate = parseFloat(currentRow.rate) || 0;
      const executionUnit = parseFloat(currentRow.executionUnit) || 0;

      // Calculate totalRate only if rate and executionUnit are valid numbers
      currentRow.totalRate = rate * executionUnit;

      // Return the updated state
      updatedData[index] = currentRow;
      return updatedData;
    });
    // Remove error for the specific field
    setErrors(prevErrors => {
      const updatedErrors = [...prevErrors];
      if (updatedErrors[index]) {
        delete updatedErrors[index][name]; // Corrected field access
        if (Object.keys(updatedErrors[index]).length === 0) {
          updatedErrors.splice(index, 1);
        }
      }
      return updatedErrors;
    });

  };

  const handleClear = () => {
    setSearchIgm('');
    setSearchItem('');
    setSearchContainer('');

    setAddService([{
      serviceId: "",
      serviceUnit: "",
      serviceDesc: "",
      executionUnit: "",
      rate: "",
      totalRate: "",
    }])

    setIgmCnData([{
      companyId: '',
      branchId: '',
      containerNo: '',
      containerSize: '',
      containerType: '',
      gateOutType: '',
      cargoWt: '',
      noOfPackages: '',
      stuffTallyId: '',
      cha: '',
      sa: '',
      sl: '',
      onAccountOf: '',
      impId: ''
    }])
    setErrors([]);
    setSsrServiceDtl([{
      companyId: "",
      branchId: "",
      transId: "",
      erpDocRefNo: "",
      docRefNo: "",
      containerNo: "",
      profitcentreId: "",
      serviceId: "",
      transLineNo: null,   // BigDecimal
      transDate: null,     // Date (You can use null for dates)
      ssrRefNo: "",
      serviceUnit: "",
      executionUnit: "",
      totalRate: null,
    }])

    setSsrDtl({
      companyId: "",
      branchId: "",
      transId: "",
      erpDocRefNo: "",
      docRefNo: "",
      containerNo: "",
      profitcentreId: "",
      serviceId: "",
      transLineNo: null,   // BigDecimal
      transDate: new Date(),     // Date (You can use null for dates)
      ssrRefNo: "",
      docRefDate: null,    // Date
      igmLineNo: "",
      blNo: "",
      blDate: null,        // Date
      beNo: "",
      beDate: null,        // Date
      containerSize: "",
      containerType: "",
      noOfPackages: 0,     // int
      cargoWt: null,       // BigDecimal
      gateOutType: "",
      containerInvoiceType: "",
      commodityDescription: "",
      impId: "",
      sl: "",
      sa: "",
      cha: "",
      accId: "",
      ssrModeFor: "",
      srlNo: null,         // BigDecimal
      serviceUnit: "",
      executionUnit: "",
      serviceUnit1: "",
      executionUnit1: "",
      rate: null,          // BigDecimal
      totalRate: null,     // BigDecimal
      status: "",          // char, defaulting to empty string
      createdBy: "",
      createdDate: null,   // Date
      editedBy: "",
      editedDate: null,    // Date
      approvedBy: "",
      approvedDate: null,  // Date
      assessmentId: "",
      srNo: null,
      ssrType: "",
      srvSrNo: "",
      ssrPartyId: ""
    })
  }

  const handleSearch = () => {
    setLoading(true);

    if (!searchContainer) {
      toast.error("The search field is empty.", {
        autoClose: 800
      })

      setLoading(false);
      return;
    }



    axios.get(`${ipaddress}ssr/searchBySbNo?cid=${companyid}&bid=${branchId}&sb=${searchContainer}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;

        const singleData = data[0];

        setSsrDtl({
          companyId: "",
          branchId: "",
          transId: "",
          erpDocRefNo: singleData[1] || "",
          docRefNo: singleData[2] || "",
          containerNo: "",
          profitcentreId: singleData[0] || "",
          serviceId: "",
          transLineNo: null,   // BigDecimal
          transDate: new Date() || null,     // Date (You can use null for dates)
          ssrRefNo: "",
          docRefDate: singleData[3] === null ? null : new Date(singleData[3]) || null,    // Date
          igmLineNo: "",
          blNo: "",
          blDate: null,        // Date
          beNo: "",
          beDate: null,        // Date
          containerSize: "",
          containerType: "",
          noOfPackages: 0,     // int
          cargoWt: null,       // BigDecimal
          gateOutType: "",
          containerInvoiceType: "",
          commodityDescription: singleData[10] || "",
          impId: singleData[5] || "",
          sl: singleData[12] || "",
          sa: singleData[14] || "",
          cha: singleData[7] || "",
          accId: singleData[9] || "",
          ssrModeFor: "",
          srlNo: null,         // BigDecimal
          serviceUnit: "",
          executionUnit: "",
          serviceUnit1: "",
          executionUnit1: "",
          rate: null,          // BigDecimal
          totalRate: null,     // BigDecimal
          status: "",          // char, defaulting to empty string
          createdBy: "",
          createdDate: null,   // Date
          editedBy: "",
          editedDate: null,    // Date
          approvedBy: "",
          approvedDate: null,  // Date
          assessmentId: "",
          srNo: null,
          ssrType: "",
          srvSrNo: "",
          ssrPartyId: ""
        })

        setIgmCnData(data.map((item) => ({
          companyId: companyid,
          branchId: branchId,
          containerNo: item[15] || '',
          containerSize: item[16] || '',
          containerType: item[17] || '',
          gateOutType: '',
          cargoWt: item[19] || '',
          noOfPackages: item[18] || '',
          stuffTallyId: item[21] || '',
          cha: item[6] || '',
          sa: item[13] || '',
          sl: item[11] || '',
          onAccountOf: item[8] || '',
          impId: item[4] || ''
        })));


        toast.success("Data found successfully!!!", {
          autoClose: 800
        })


        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data, {
          autoClose: 800
        })
        setLoading(false);
      })
  }

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const handleRowCheckboxChange = (e, index) => {
    let newSelectedRows = [...selectedRows];

    if (e.target.checked) {
      // Add the full object instead of just the index
      if (!newSelectedRows.some(row => row === igmCnData[index])) {
        newSelectedRows.push(igmCnData[index]);
      }
      setSelectedRows(newSelectedRows);

      // Check if all rows are selected
      if (newSelectedRows.length === igmCnData.length) {
        setSelectAll(true);
      } else {
        setSelectAll(false);
      }
    } else {
      // Remove the object if the checkbox is unchecked
      const filteredRows = newSelectedRows.filter(row => row !== igmCnData[index]);
      setSelectedRows(filteredRows);

      // Update selectAll based on the number of selected rows
      if (filteredRows.length === igmCnData.length) {
        setSelectAll(true);
      } else {
        setSelectAll(false);
      }

      // Uncheck "select all" if no rows are selected
      if (filteredRows.length === 0) {
        setSelectAll(false);
      }
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      // Deselect all
      setSelectedRows([]);
    } else {
      // Select all objects from igmCnData
      setSelectedRows(igmCnData.map(item => item));
    }
    setSelectAll(!selectAll);
  };

  const [errors, setErrors] = useState([]);


  const handleSave = () => {
    setLoading(true);
    if (!ssrDtl.docRefNo) {
      toast.error("SB No is required.", {
        autoClose: 800
      })
      setLoading(false);
      return;
    }

    if (!ssrDtl.ssrModeFor) {
      toast.error("SSR Mode is required.", {
        autoClose: 800
      })
      setLoading(false);
      return;
    }

    const ser = addServie.filter(item => item.serviceId !== '');

    if (ser.length === 0) {
      toast.error("Please add atleast one service.", {
        autoClose: 800
      })
      setLoading(false);
      return;
    }

    let newErrors = ser.map(() => ({}));
    setErrors([]);

    ser.forEach((data, index) => {
      let rowErrors = {};

      if (!data.executionUnit) rowErrors.executionUnit = "Execution unit is required.";
      if (!data.rate) rowErrors.rate = "Rate is required.";
      if (!data.totalRate) rowErrors.totalRate = "Total rate is required.";

      if (Object.keys(rowErrors).length > 0) {
        newErrors[index] = rowErrors;
      }
    });

    // Check if any errors exist
    const hasErrors = newErrors.some(errorObj => Object.keys(errorObj).length > 0);

    if (hasErrors) {
      console.log('newErrors ', newErrors);
      setErrors(newErrors);
      setLoading(false);
      toast.error("Please fill in the required fields.", {
        autoClose: 1000
      });

      return;
    }

    const con = selectedRows.filter(item => item.containerNo !== '');

    if (con.length === 0) {
      toast.error("Please select atleast one container.", {
        autoClose: 800
      })
      setLoading(false);
      return;
    }

    console.log('ser ', ser);


    const formData = {
      ssr: ssrDtl,
      container: selectedRows,
      service: ser
    }
    axios.post(`${ipaddress}ssr/saveExportSSR?cid=${companyid}&bid=${branchId}&user=${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {

        const data = response.data;



        setAddService([{
          serviceId: "",
          serviceUnit: "",
          serviceDesc: "",
          executionUnit: "",
          rate: "",
          totalRate: "",
        }])

        setSelectAll(false);
        setSelectedRows([]);

        setSsrDtl({
          companyId: data.ssr.companyId || "",
          branchId: data.ssr.branchId || "",  // If `branchId` is part of `ssr`
          transId: data.ssr.transId || "",
          erpDocRefNo: data.ssr.erpDocRefNo || "",
          docRefNo: data.ssr.docRefNo || "",
          containerNo: data.ssr.containerNo || "",
          profitcentreId: data.ssr.profitcentreId || "",
          serviceId: data.ssr.serviceId || "",
          transLineNo: data.ssr.transLineNo || null, // BigDecimal or numeric type
          transDate: data.ssr.transDate !== null ? new Date(data.ssr.transDate) : null, // Date
          ssrRefNo: data.ssr.ssrRefNo || "",
          docRefDate: data.ssr.docRefDate !== null ? new Date(data.ssr.docRefDate) : null, // Date
          igmLineNo: data.ssr.igmLineNo || "",
          blNo: data.ssr.blNo || "",
          blDate: data.ssr.blDate !== null ? new Date(data.ssr.blDate) : null, // Date
          beNo: data.ssr.beNo || "",
          beDate: data.ssr.beDate !== null ? new Date(data.ssr.beDate) : null, // Date
          containerSize: data.ssr.containerSize || "",
          containerType: data.ssr.containerType || "",
          noOfPackages: data.ssr.noOfPackages || 0, // integer field
          cargoWt: data.ssr.cargoWt || null, // BigDecimal
          gateOutType: data.ssr.gateOutType || "",
          containerInvoiceType: data.ssr.containerInvoiceType || "",
          commodityDescription: data.ssr.commodityDescription || "",
          impId: data.ssr.impId || "",  // Adjust field according to `data.ssr`
          sl: data.ssr.sl || "",
          sa: data.ssr.sa || "",
          cha: data.ssr.cha || "",
          accId: data.ssr.accId || "",
          ssrModeFor: data.ssr.ssrModeFor || "",
          srlNo: data.ssr.srlNo || null, // BigDecimal
          serviceUnit: data.ssr.serviceUnit || "",
          executionUnit: data.ssr.executionUnit || "",
          serviceUnit1: data.ssr.serviceUnit1 || "",
          executionUnit1: data.ssr.executionUnit1 || "",
          rate: data.ssr.rate || null, // BigDecimal
          totalRate: data.ssr.totalRate || null, // BigDecimal
          status: data.ssr.status || "",  // char, defaulting to empty string
          createdBy: data.ssr.createdBy || "",
          createdDate: data.ssr.createdDate ? new Date(data.ssr.createdDate) : null, // Date
          editedBy: data.ssr.editedBy || "",
          editedDate: data.ssr.editedDate ? new Date(data.ssr.editedDate) : null, // Date
          approvedBy: data.ssr.approvedBy || "",
          approvedDate: data.ssr.approvedDate ? new Date(data.ssr.approvedDate) : null, // Date
          assessmentId: data.ssr.assessmentId || "",
          srNo: data.ssr.srNo || null, // BigDecimal or integer
          ssrType: data.ssr.ssrType || "",
          srvSrNo: data.ssr.srvSrNo || "",
          ssrPartyId: data.ssr.ssrPartyId || ""
        });


        setIgmCnData(data.con.map((item) => ({
          companyId: companyid,
          branchId: branchId,
          containerNo: item[15] || '',
          containerSize: item[16] || '',
          containerType: item[17] || '',
          gateOutType: '',
          cargoWt: item[19] || '',
          noOfPackages: item[18] || '',
          stuffTallyId: item[21] || '',
          cha: item[6] || '',
          sa: item[13] || '',
          sl: item[11] || '',
          onAccountOf: item[8] || '',
          impId: item[4] || ''
        })));

        setSsrServiceDtl(data.refNoData.map(item => ({
          companyId: item.companyId || "",
          branchId: item.branchId || "",
          transId: item.transId || "",
          erpDocRefNo: item.erpDocRefNo || "",
          docRefNo: item.docRefNo || "",
          containerNo: item.containerNo || "",
          profitcentreId: item.profitcentreId || "",
          serviceId: item.serviceId || "",
          transLineNo: item.createdBy || null,   // BigDecimal
          transDate: item.transDate || null,     // Date (You can use null for dates)
          ssrRefNo: item.ssrRefNo || "",
          serviceUnit: item.serviceUnit || "",
          executionUnit: item.executionUnit || "",
          totalRate: item.totalRate || null,
        })))

        toast.success("Data save successfully!!", {
          autoClose: 800
        })


        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data, {
          autoClose: 800
        })

        setLoading(false);
      })

  }

  const [isModalOpenForSSRSearch, setIsModalOpenForSSRSearch] = useState(false);

  const openSSRModal = () => {
    setIsModalOpenForSSRSearch(true);
    search('');
  }

  const closeSSRModal = () => {
    setIsModalOpenForSSRSearch(false);
    setSearchId('');
    setSearchData1([]);
  }


  const [searchId, setSearchId] = useState('');
  const [searchData1, setSearchData1] = useState([]);

  const search = (val) => {
    setLoading(true);
    // if (!val) {
    //     toast.error("Please enter the search value", {
    //         autoClose: 800
    //     })
    //     setLoading(false);
    //     return;
    // }

    axios.get(`${ipaddress}ssr/searchExportSSR?cid=${companyid}&bid=${branchId}&val=${val}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        setSearchData1(response.data);
        toast.success("Data found successfully!!!", {
          autoClose: 800
        })
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data, {
          autoClose: 800
        })
        setSearchData1([]);
        setLoading(false);
      })
  }

  const getDataByTransId = (trans,sb) => {
    setLoading(true);
    axios.get(`${ipaddress}ssr/getExportDataByTransId?cid=${companyid}&bid=${branchId}&transid=${trans}&sb=${sb}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;

        setAddService([{
          serviceId: "",
          serviceUnit: "",
          serviceDesc: "",
          executionUnit: "",
          rate: "",
          totalRate: "",
        }])

        setSelectAll(false);
        setSelectedRows([]);

        setSsrDtl({
          companyId: data.ssr.companyId || "",
          branchId: data.ssr.branchId || "",  // If `branchId` is part of `ssr`
          transId: data.ssr.transId || "",
          erpDocRefNo: data.ssr.erpDocRefNo || "",
          docRefNo: data.ssr.docRefNo || "",
          containerNo: data.ssr.containerNo || "",
          profitcentreId: data.ssr.profitcentreId || "",
          serviceId: data.ssr.serviceId || "",
          transLineNo: data.ssr.transLineNo || null, // BigDecimal or numeric type
          transDate: data.ssr.transDate ? new Date(data.ssr.transDate) : null, // Date
          ssrRefNo: data.ssr.ssrRefNo || "",
          docRefDate: data.ssr.docRefDate ? new Date(data.ssr.docRefDate) : null, // Date
          igmLineNo: data.ssr.igmLineNo || "",
          blNo: data.ssr.blNo || "",
          blDate: data.ssr.blDate ? new Date(data.ssr.blDate) : null, // Date
          beNo: data.ssr.beNo || "",
          beDate: data.ssr.beDate ? new Date(data.ssr.beDate) : null, // Date
          containerSize: data.ssr.containerSize || "",
          containerType: data.ssr.containerType || "",
          noOfPackages: data.ssr.noOfPackages || 0, // integer field
          cargoWt: data.ssr.cargoWt || null, // BigDecimal
          gateOutType: data.ssr.gateOutType || "",
          containerInvoiceType: data.ssr.containerInvoiceType || "",
          commodityDescription: data.ssr.commodityDescription || "",
          impId: data.ssr.impId || "",  // Adjust field according to `data.ssr`
          sl: data.ssr.sl || "",
          sa: data.ssr.sa || "",
          cha: data.ssr.cha || "",
          accId: data.ssr.accId || "",
          ssrModeFor: data.ssr.ssrModeFor || "",
          srlNo: data.ssr.srlNo || null, // BigDecimal
          serviceUnit: data.ssr.serviceUnit || "",
          executionUnit: data.ssr.executionUnit || "",
          serviceUnit1: data.ssr.serviceUnit1 || "",
          executionUnit1: data.ssr.executionUnit1 || "",
          rate: data.ssr.rate || null, // BigDecimal
          totalRate: data.ssr.totalRate || null, // BigDecimal
          status: data.ssr.status || "",  // char, defaulting to empty string
          createdBy: data.ssr.createdBy || "",
          createdDate: data.ssr.createdDate ? new Date(data.ssr.createdDate) : null, // Date
          editedBy: data.ssr.editedBy || "",
          editedDate: data.ssr.editedDate ? new Date(data.ssr.editedDate) : null, // Date
          approvedBy: data.ssr.approvedBy || "",
          approvedDate: data.ssr.approvedDate ? new Date(data.ssr.approvedDate) : null, // Date
          assessmentId: data.ssr.assessmentId || "",
          srNo: data.ssr.srNo || null, // BigDecimal or integer
          ssrType: data.ssr.ssrType || "",
          srvSrNo: data.ssr.srvSrNo || "",
          ssrPartyId: data.ssr.ssrPartyId || ""
        });


        setIgmCnData(data.con.map((item) => ({
          companyId: companyid,
          branchId: branchId,
          containerNo: item[15] || '',
          containerSize: item[16] || '',
          containerType: item[17] || '',
          gateOutType: '',
          cargoWt: item[19] || '',
          noOfPackages: item[18] || '',
          stuffTallyId: item[21] || '',
          cha: item[6] || '',
          sa: item[13] || '',
          sl: item[11] || '',
          onAccountOf: item[8] || '',
          impId: item[4] || ''
        })));

        setSsrServiceDtl(data.refNoData.map(item => ({
          companyId: item.companyId || "",
          branchId: item.branchId || "",
          transId: item.transId || "",
          erpDocRefNo: item.erpDocRefNo || "",
          docRefNo: item.docRefNo || "",
          containerNo: item.containerNo || "",
          profitcentreId: item.profitcentreId || "",
          serviceId: item.serviceId || "",
          transLineNo: item.createdBy || null,   // BigDecimal
          transDate: item.transDate || null,     // Date (You can use null for dates)
          ssrRefNo: item.ssrRefNo || "",
          serviceUnit: item.serviceUnit || "",
          executionUnit: item.executionUnit || "",
          totalRate: item.totalRate || null,
        })))

        toast.success("Data found successfully!!", {
          autoClose: 800
        })

        setLoading(false);

        closeSSRModal();

      })
      .catch((error) => {
        toast.error(error.response.data, {
          autoClose: 800
        })
        setLoading(false);
      })
  }

  const handleSearchReset = () => {
    setSearchId('');
    search('');
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchData1.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(searchData1.length / itemsPerPage);

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
        <Modal Modal isOpen={isModalOpenForSSRSearch} onClose={closeSSRModal} toggle={closeSSRModal} style={{ maxWidth: '1000px', fontSize: 12, wioverflow: '-moz-hidden-unscrollable' }}>

          <ModalHeader toggle={closeSSRModal} style={{
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
            /> Search SSR Activity Records</h5>



          </ModalHeader>
          <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
            <Row>
              <Col md={4}>
                <FormGroup>
                  <label className="forlabel" htmlFor="sbRequestId">Search By All Fields</label>
                  <input
                    className="form-control"
                    type="text"
                    id="searchId"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}

                  />
                </FormGroup>
              </Col>

              <Col md={4} style={{ marginTop: 24 }}>
                <button
                  className="btn btn-outline-success btn-margin newButton"
                  id="submitbtn2"
                  style={{ fontSize: 13, marginRight: 5 }}
                  onClick={() => search(searchId)}
                >
                  <FontAwesomeIcon icon={faSearch} style={{ marginRight: "1px" }} />
                  Search
                </button>
                <button
                  className="btn btn-outline-danger btn-margin newButton"
                  style={{ fontSize: 13 }}
                  id="submitbtn2"
                  onClick={handleSearchReset}
                >
                  <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "1px" }} />
                  Reset
                </button>
              </Col>
            </Row>
            <hr />
            <div className="mt-1 table-responsive ">
              <table className="table table-bordered table-hover tableHeader">
                <thead className='tableHeader'>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Trans Id</th>
                    <th scope="col">SB Trans Id</th>
                    <th scope="col">SB No</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <input type="radio" onChange={() => getDataByTransId(item[0],item[2])} name="radioGroup" />
                      </td>
                      <td>{item[0]}</td>
                      <td>{item[1]}</td>
                      <td>{item[2]}</td>
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


        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              Search By SB No
            </label>
            <Input
              className={`form-control`}
              type="text"
              id="searchContainer"
              name='searchContainer'
              value={searchContainer}
              disabled={searchIgm !== '' || searchItem != '' || ssrDtl.transId !== ''}
              onChange={(e) => setSearchContainer(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col md={2}>
          <button
            className="btn btn-outline-primary btn-margin newButton"
            style={{ height: 33, fontSize: 14, marginTop: 19 }}
            id="submitbtn2"
            onClick={handleSearch}
          >
            <FontAwesomeIcon icon={faSearch} style={{ marginRight: 5 }} />
            Search

          </button>
        </Col>
      </Row>
      <hr />
      <Row>

        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              Trans Id
            </label>
            <Row>
              <Col md={8}>
                <Input
                  className={`form-control`}
                  type="text"
                  id="transId"
                  name='transId'
                  disabled
                  value={ssrDtl.transId}
                />
              </Col>
              <Col md={3}>
                <button
                  className="btn btn-outline-primary btn-margin newButton"
                  id="submitbtn2"
                  style={{ fontSize: 13, marginRight: 5 }}
                  onClick={openSSRModal}
                >
                  <FontAwesomeIcon icon={faSearch} style={{ marginRight: "1px" }} />

                </button>
              </Col>
            </Row>
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              Trans Date
            </label>
            <div style={{ position: 'relative' }}>
              <DatePicker
                selected={ssrDtl.transDate}
                id='transDate'
                name='transDate'
                disabled
                dateFormat="dd/MM/yyyy HH:mm"
                className="form-control border-right-0 InputField"
                customInput={<Input style={{ width: '100%' }} />}
                wrapperClassName="custom-react-datepicker-wrapper"
              />
              <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
            </div>
          </FormGroup>
        </Col>


        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              SB No <span style={{ color: 'red' }}>*</span>
            </label>
            <Input
              className={`form-control`}
              type="text"
              id="docRefNo"
              name='docRefNo'
              disabled
              value={ssrDtl.docRefNo}
            />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              SB Date
            </label>
            <div style={{ position: 'relative' }}>
              <DatePicker
                selected={ssrDtl.docRefDate}
                id='docRefDate'
                name='docRefDate'
                disabled
                dateFormat="dd/MM/yyyy"
                className="form-control border-right-0 InputField"
                customInput={<Input style={{ width: '100%' }} />}
                wrapperClassName="custom-react-datepicker-wrapper"
              />
              <FontAwesomeIcon icon={faCalendarAlt} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6c757d' }} />
            </div>
          </FormGroup>
        </Col>



        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              Status
            </label>
            <Input
              className={`form-control`}
              type="text"
              id="searchContainer"
              name='searchContainer'
              disabled
              value={ssrDtl.status === 'A' ? 'Approved' : ssrDtl.status}
            />
          </FormGroup>
        </Col>

        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              Created By
            </label>
            <Input
              className={`form-control`}
              type="text"
              id="searchContainer"
              name='searchContainer'
              disabled
              value={ssrDtl.createdBy}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>


        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              CHA Name
            </label>
            <Input
              className={`form-control`}
              type="text"
              id="searchContainer"
              name='searchContainer'
              disabled
              value={ssrDtl.cha}
            />
          </FormGroup>
        </Col>

        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              Account Holder
            </label>
            <Input
              className={`form-control`}
              type="text"
              id="searchContainer"
              name='searchContainer'
              disabled
              value={ssrDtl.accId}
            />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              Exporter Name
            </label>
            <Input
              className={`form-control`}
              type="text"
              id="searchContainer"
              name='searchContainer'
              disabled
              value={ssrDtl.impId}
            />
          </FormGroup>
        </Col>



        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              Shipping Agent
            </label>
            <Input
              className={`form-control`}
              type="text"
              id="searchContainer"
              name='searchContainer'
              disabled
              value={ssrDtl.sa}
            />
          </FormGroup>
        </Col>



        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              Shipping Line
            </label>
            <Input
              className={`form-control`}
              type="text"
              id="searchContainer"
              name='searchContainer'
              disabled
              value={ssrDtl.sl}
            />
          </FormGroup>
        </Col>

        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              Commodity
            </label>
            <Input
              className={`form-control`}
              type="text"
              id="searchContainer"
              name='searchContainer'
              disabled
              value={ssrDtl.commodityDescription}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>


        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="sbRequestId">
              SSR Mode <span style={{ color: 'red' }}>*</span>
            </label>
            <Input
              className={`form-control`}
              type="select"
              id="ssrModeFor"
              name='ssrModeFor'
              value={ssrDtl.ssrModeFor}
              onChange={(e) => {
                setSsrDtl({
                  ...ssrDtl,
                  ssrModeFor: e.target.value
                })
              }}
              disabled={ssrDtl.transId !== ''}
            >
              <option value="">Select SSR Mode</option>
              <option value="CONT">CONTAINER</option>
              <option value="CRG">CARGO</option>
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <hr />
      <Row className='text-center'>
        <Col style={{ marginTop: 10 }}>
          <button
            className="btn btn-outline-primary btn-margin newButton"
            id="submitbtn2"
            style={{ marginRight: 5 }}
            onClick={handleSave}
          >
            <FontAwesomeIcon icon={faSave} style={{ marginRight: "1px" }} />
            Save
          </button>
          <button
            className="btn btn-outline-danger btn-margin newButton"
            id="submitbtn2"
            onClick={handleClear}
          >
            <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "1px" }} />
            Clear
          </button>
        </Col>
      </Row>
      <div className="mt-5">
        <table className="table table-bordered table-hover tableHeader dynamic-table">
          <thead className="tableHeader">
            <tr>
              <th scope="col" colSpan={6} className="text-center" style={{ color: 'black' }}>Service Details</th>
            </tr>
            <tr>

              <th scope="col" className="text-center" style={{ color: 'black' }}>Sr No</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Service</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Service Unit</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Execution Unit</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Rate</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Total Rate</th>
            </tr>
          </thead>
          <tbody>
            {addServie.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td style={{ width: 300 }}>
                  <Select

                    value={{ value: item.serviceId, label: item.serviceDesc }}
                    options={services}
                    onChange={(option, actionMeta) => handleChangeServices(option, actionMeta, index)}
                    placeholder="Select Service"
                    isClearable
                    id={`serviceId${index}`}
                    name="serviceId"
                    className={`autocompleteHeight`}

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
                </td>
                <td>
                  <Input
                    className={`form-control`}
                    type="text"
                    id={`serviceUnit${index}`}
                    name='serviceUnit'
                    disabled
                    value={item.serviceUnit}
                  />
                </td>
                <td>
                  <Input
                    className={`form-control ${errors[index]?.executionUnit ? 'error-border' : ''}`}
                    type="text"
                    id={`executionUnit${index}`}
                    name='executionUnit'
                    onChange={(e) => handleChangeAddService(e, index)}
                    disabled={item.serviceId === ''}
                    value={item.executionUnit}
                    maxLength={8}
                  />
                </td>
                <td>
                  <Input
                    className={`form-control ${errors[index]?.rate ? 'error-border' : ''}`}
                    type="text"
                    id={`rate${index}`}
                    name='rate'
                    onChange={(e) => handleChangeAddService(e, index)}
                    disabled={item.serviceId === ''}
                    value={item.rate}
                    maxLength={8}
                  />
                </td>
                <td>
                  <Input
                    className={`form-control ${errors[index]?.totalRate ? 'error-border' : ''}`}
                    type="text"
                    id={`totalRate${index}`}
                    name='totalRate'
                    onChange={(e) => handleChangeAddService(e, index)}
                    disabled={item.serviceId === ''}
                    value={item.totalRate}
                    maxLength={16}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 table-responsive">
        <table className="table table-bordered table-hover tableHeader dynamic-table">
          <thead className="tableHeader">
            <tr>
              <th scope="col" colSpan={8} className="text-center" style={{ color: 'black' }}>Contanier Details</th>
            </tr>
            <tr>

              <th scope="col" className="text-center" style={{ color: 'black' }}>Sr No</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Container No</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Size</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Type</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Stuffed Pkgs</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Stuffed Wt</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Cargo Type</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>
                <Input
                  type="checkbox"
                  className="form-check-input radios"
                  style={{ width: 25, height: 25 }}
                  checked={selectAll}
                  onChange={handleSelectAll}
                />

              </th>
            </tr>
          </thead>
          <tbody>
            {igmCnData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.containerNo}</td>
                <td>{item.containerSize}</td>
                <td>{item.containerType}</td>
                <td>{item.noOfPackages}</td>
                <td>{item.cargoWt}</td>
                <td>{item.gateOutType}</td>
                <td>
                  <Input
                    type="checkbox"
                    className="form-check-input radios"
                    style={{ width: 25, height: 25 }}
                    // Check if the object for this index exists in selectedRows
                    checked={selectedRows.some(row => row === igmCnData[index])}
                    onChange={(e) => handleRowCheckboxChange(e, index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 table-responsive">
        <table className="table table-bordered table-hover tableHeader dynamic-table">
          <thead className="tableHeader">
            <tr>
              <th scope="col" colSpan={7} className="text-center" style={{ color: 'black' }}>Cargo Details</th>
            </tr>
            <tr>

              <th scope="col" className="text-center" style={{ color: 'black' }}>Sr No</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>SSR Reference No</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Service Id</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Service Desc</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Service Unit</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Excuation Unit</th>
              <th scope="col" className="text-center" style={{ color: 'black' }}>Total Rate</th>
            </tr>
          </thead>
          <tbody>
            {ssrServiceDtl.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.ssrRefNo}</td>
                <td>{item.serviceId}</td>
                <td>{item.transLineNo}</td>
                <td>{item.serviceUnit}</td>
                <td>{item.executionUnit}</td>
                <td>{item.totalRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


export default ExportSSRActivity;
