import AuthContext from '../Components/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import Select from 'react-select';
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faChartGantt, faBold, faBox, faArrowAltCircleLeft, faSearch, faRefresh, faUpload, faFileExcel, faSave, faCheck, faDownload, faTrash, faShip, faBackward, faCalendarAlt, faAdd, faWorm, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/style.css';
import '../Components/Style.css';
import { Button, Pagination } from "react-bootstrap";

import useAxios from '../Components/useAxios';
import CFSService from '../service/CFSService';
import { toast } from 'react-toastify';
import ipaddress from '../Components/IpAddress';
import { error } from 'jquery';

function BufferWorkOrder({ searchData, resetFlag, updatePagesList }) {

  const navigate = useNavigate();
  const axios = useAxios();
  const { isAuthenticated } = useContext(AuthContext);

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {

      navigate('/login?message=You need to be authenticated to access this page.');
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
    userRights
  } = useContext(AuthContext);


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
  };

  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const processId = queryParams.get('process_id');

  const foundRights = role !== 'ROLE_ADMIN' ? userRights.find(item => item.process_Id === processId) : null;
  const allowCreate = foundRights?.allow_Create === 'Y';
  const allowRead = foundRights?.allow_Read === 'Y';
  const allowEdit = foundRights?.allow_Update === 'Y';
  const allowDelete = foundRights?.allow_Delete === 'Y';


  const [woData, setWoData] = useState({
    companyId: "",
    branchId: "",
    woNo: "",
    profitcentreId: "CFS Export",
    srNo: 0,
    containerNo: "",
    woDate: null,
    shippingAgent: "",
    containerSize: "",
    containerType: "",
    containerStatus: "",
    onAccountOf: "",
    cha: "",
    shippingLine: "",
    shipper: "",
    commodity: "",
    bookingNo: "",
    movementType: "",
    moveFrom: "",
    iso: "",
    weight: "",
    status: "",
    createdBy: "",
    createdDate: null,
    editedBy: "",
    editedDate: null,
    approvedBy: "",
    approvedDate: null,
    processId: "",
    chaName: "",
    accountHolderName: "",
    shippingLineName: ""
  });

  const [containerData, setContainerData] = useState([{
    companyId: "",
    branchId: "",
    woNo: "",
    containerNo: "",
    iso: "",
    containerSize: "",
    containerType: "",
    weight: "",
    commodity: "",
    movementType: "",
  }])


  const handleClear = () => {
    setWoData({
      companyId: "",
      branchId: "",
      woNo: "",
      profitcentreId: "CFS Export",
      srNo: 0,
      containerNo: "",
      woDate: null,
      shippingAgent: "",
      containerSize: "",
      containerType: "",
      containerStatus: "",
      onAccountOf: "",
      cha: "",
      shippingLine: "",
      shipper: "",
      commodity: "",
      bookingNo: "",
      movementType: "",
      moveFrom: "",
      iso: "",
      weight: "",
      status: "",
      createdBy: "",
      createdDate: null,
      editedBy: "",
      editedDate: null,
      approvedBy: "",
      approvedDate: null,
      processId: "",
      chaName: "",
      accountHolderName: "",
      shippingLineName: ""
    })
    setErrors([]);
    setContainerData([{
      companyId: "",
      branchId: "",
      woNo: "",
      containerNo: "",
      iso: "",
      containerSize: "",
      containerType: "",
      weight: "",
      commodity: "",
      movementType: "",
    }])

    setSelectIso('');
    setSelectCommodity('');
    setSelectMovementType('');
  }

  const [chaList, setChaList] = useState([]);
  const handleCHAList = (val) => {
    if (val === '') {
      setChaList([]);
      return;
    }

    axios.get(`${ipaddress}party/getCha1?cid=${companyid}&bid=${branchId}&val=${val}`, {
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
        setChaList(portOptions);
      })
      .catch((error) => {
        setChaList([]);
      })
  }

  const handleChaSelect = async (selectedOption, { action }) => {
    if (action === 'clear') {
      setWoData({
        ...woData,
        cha: '',
        chaName: ''
      });
    }
    else {
      setWoData({
        ...woData,
        cha: selectedOption.value,
        chaName: selectedOption.label,
      });
    }

  }

  const [chaData, setChaData] = useState([]);

  const searchChaData = (id) => {
    if (id === '') {
      setChaData([]);
      return;
    }
    axios.get(`${ipaddress}party/getAll?cid=${companyid}&bid=${branchId}&val=${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const portOptions = response.data.map(port => ({
          value: port[0],
          label: port[1],
          code: port[2]
        }))
        setChaData(portOptions);
      })
      .catch((error) => {
        setChaData([]);
      })
  }


  const handleOnAccounOfChange = async (selectedOption, { action }) => {
    if (action === 'clear') {
      setWoData({
        ...woData,
        onAccountOf: '',
        accountHolderName: ''
      })
    }
    else {
      setWoData({
        ...woData,
        onAccountOf: selectedOption.value,
        accountHolderName: selectedOption.label
      })
    }
  }

  const [linerData, setLinerData] = useState([]);

  const getLinerData = (val) => {
    if (val === '') {
      setLinerData([]);
      return;
    }

    axios.get(`${ipaddress}party/getLiner?cid=${companyid}&bid=${branchId}&val=${val}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;
        const portOptions = data.map(port => ({
          value: port[0],
          label: port[1],
          code: port[2]
        }))
        setLinerData(portOptions);
      })
      .catch((error) => {

      })
  }

  const handleLinerChange = async (selectedOption, { action }) => {

    if (action === 'clear') {


      setWoData({
        ...woData,
        shippingLine: '',
        shippingLineName: ''
      })
    }
    else {
      setWoData({
        ...woData,
        shippingLine: selectedOption.value,
        shippingLineName: selectedOption.label
      });
    }
  };

  const handleWoDataChange = (e) => {
    const { name, value } = e.target;

    setWoData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleContainerDataChange = (e, index) => {
    const { name, value } = e.target;

    const isDuplicate = containerData.some((item, i) => item.containerNo === value && i !== index);

    if (isDuplicate) {
      toast.error("Duplicate container number is not allowed!", {
        autoClose: 800
      });
      return; // Prevent state update
    }

    setContainerData(prevState => {
      const updatedData = [...prevState];
      updatedData[index] = {
        ...updatedData[index],
        [name]: value
      };
      return updatedData;
    });

    setErrors(prevState => {
      const updatedData = [...prevState];
      updatedData[index] = {
        ...updatedData[index],
        [name]: ''
      };
      return updatedData;
    });
  }

  const [commodityData, setCommodityData] = useState([]);

  const getCommodityData = () => {

    const id = 'J00006';

    axios.get(`${ipaddress}jardetail/getJarDetail?companyId=${companyid}&jarId=${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        setCommodityData(response.data);
      })
      .catch((error) => {

      })
  }

  const [isoCodes, setIsoCodes] = useState([]);


  const getIsoContainers = () => {
    axios.get(`${ipaddress}IsoContainer/searchByIsoCode?companyId=${companyid}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {
        const data = response.data;
        const portOptions = data.map(port => ({
          value: port.isoCode,
          label: port.isoCode,
          type: port.containerType,
          size: port.containerSize,
          wt: port.tareWeight
        }))
        setIsoCodes(portOptions);
      })
      .catch((error) => {

      })
  }

  const handleIsoChange = async (selectedOption, { action }, index) => {
    if (action === 'clear') {
      setContainerData(prevState => {
        const updatedData = [...prevState];
        updatedData[index] = {
          ...updatedData[index],
          iso: '',
          containerSize: '',
          containerType: '',
          weight: ''
        };
        return updatedData;
      });
    }
    else {


      setContainerData(prevState => {
        const updatedData = [...prevState];
        updatedData[index] = {
          ...updatedData[index],
          iso: selectedOption.value,
          containerSize: selectedOption.size,
          containerType: selectedOption.type,
          weight: selectedOption.wt
        };
        return updatedData;
      });

      setErrors(prevState => {
        const updatedData = [...prevState];
        updatedData[index] = {
          ...updatedData[index],
          iso: ''
        };
        return updatedData;
      });

      // setFormErrors((prevErrors) => ({
      //   ...prevErrors,
      //   isoCode: "",
      //   tareWeight: ""
      // }));
    }
  }

  const [selectIso, setSelectIso] = useState('');
  const [selectCommodity, setSelectCommodity] = useState('');
  const [selectMovementType, setSelectMovementType] = useState('');

  const handleSelectIsoChange = async (selectedOption, { action }) => {
    if (action === 'clear') {
      setSelectIso('');

      setContainerData(prevData =>
        prevData.map(container =>
          container.containerNo !== '' ? {
            ...container,
            iso: '',
            containerSize: '',
            containerType: '',
            weight: ''
          } : container
        )
      );
    }
    else {

      setSelectIso(selectedOption.value);

      setContainerData(prevData =>
        prevData.map(container =>
          container.containerNo !== '' ? {
            ...container,
            iso: selectedOption.value,
            containerSize: selectedOption.size,
            containerType: selectedOption.type,
            weight: selectedOption.wt
          } : container
        )
      );
    }
  }

  const handleSelectCommodity = (value) => {
    setSelectCommodity(value);

    setContainerData(prevData =>
      prevData.map(container =>
        container.containerNo !== '' ? { ...container, commodity: value } : container
      )
    );
  }

  const handleSelectMovementType = (value) => {
    setSelectMovementType(value);

    setContainerData(prevData =>
      prevData.map(container =>
        container.containerNo !== '' ? { ...container, movementType: value } : container
      )
    );
  }

  useEffect(() => {

    if (searchData.activeTab === 'P00235') {
      getCommodityData();
      getIsoContainers();
    }

  }, [searchData])

  const addContainer = () => {
    const newRow = {
      companyId: "",
      branchId: "",
      woNo: "",
      containerNo: "",
      iso: "",
      containerSize: "",
      containerType: "",
      weight: "",
      commodity: "",
      movementType: "",
    }

    setContainerData([...containerData, newRow]); // Add the new row to the array

  }

  const handleContainerNoValidation1 = (containerNo) => {
    const containerNoUpper = containerNo.toUpperCase();
    // console.log(containerNoUpper);

    let s = 0;
    let x = 0;

    // Char values mapping
    const charVal = {
      A: "10",
      B: "12",
      C: "13",
      D: "14",
      E: "15",
      F: "16",
      G: "17",
      H: "18",
      I: "19",
      J: "20",
      K: "21",
      L: "23",
      M: "24",
      N: "25",
      O: "26",
      P: "27",
      Q: "28",
      R: "29",
      S: "30",
      T: "31",
      U: "32",
      V: "34",
      W: "35",
      X: "36",
      Y: "37",
      Z: "38",
    };

    const len = containerNoUpper.length;

    if (len !== 11) {
      return false;
    } else {
      for (let i = 0; i < len - 1; i++) {
        const asciiVal = containerNoUpper.charCodeAt(i);
        if (asciiVal >= 65 && asciiVal <= 90) { // A-Z
          s += Math.pow(2, i) * parseInt(charVal[containerNoUpper.charAt(i)]);
        } else {
          s += Math.pow(2, i) * parseInt(containerNoUpper.charAt(i));
        }
      }

      x = s % 11;

      if (
        x === parseInt(containerNoUpper.charAt(len - 1)) ||
        (x === 10 && containerNoUpper.charAt(len - 1) === "0")
      ) {
        // Valid container number
        return true;
      } else {
        // Invalid container number
        return false;
      }
    }
  };


  const handleSave = () => {


    try {
      if (woData.cha === '') {
        toast.error("Please select CHA", {
          autoClose: 800
        })
        return;
      }

      const conData = containerData.filter(item => item.containerNo !== '');

      if (conData.length === 0) {
        toast.error("Please enter the container no.", {
          autoClose: 800
        })
        return;
      }

      setErrors([]);
      let newErrors = containerData.map(() => ({}));
      containerData.forEach((data, index) => {

        if (data.containerNo !== '') {
          let rowErrors = {};

          if (!data.iso) rowErrors.iso = "ISO is required.";
          if (!handleContainerNoValidation1(data.containerNo)) rowErrors.containerNo = "Invalid Container No.";


          if (Object.keys(rowErrors).length > 0) {
            newErrors[index] = rowErrors;
          }
        }
      });

      const hasErrors = newErrors.some(errorObj => Object.keys(errorObj).length > 0);

      if (hasErrors) {
        setErrors(newErrors);
        toast.error("Please fill in the required fields.", {
          autoClose: 1000
        });

        return;
      }

      const formData = {
        bufferWorkOrder: woData,
        containerData: containerData
      }

      setLoading(true);

      axios.post(`${ipaddress}bufferWO/saveWO?cid=${companyid}&bid=${branchId}&user=${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
        .then((response) => {

          const data = response.data;

          setLoading(false);

          toast.success("Data save successfully!!", {
            autoClose: 800
          })

          const singleData = data[0];

          setWoData({
            companyId: "",
            branchId: "",
            woNo: singleData[0] || "",
            profitcentreId: "CFS Export",
            srNo: 0,
            containerNo: "",
            woDate: singleData[1] === null ? null : new Date(singleData[1]),
            shippingAgent: "",
            containerSize: "",
            containerType: "",
            containerStatus: singleData[13] || "",
            onAccountOf: singleData[4] || "",
            cha: singleData[2] || "",
            shippingLine: singleData[8] || "",
            shipper: singleData[10] || "",
            commodity: "",
            bookingNo: singleData[11] || "",
            movementType: "",
            moveFrom: singleData[12] || "",
            iso: "",
            weight: "",
            status: singleData[6] || "",
            createdBy: singleData[7] || "",
            createdDate: null,
            editedBy: "",
            editedDate: null,
            approvedBy: "",
            approvedDate: null,
            processId: "",
            chaName: singleData[3] || "",
            accountHolderName: singleData[5] || "",
            shippingLineName: singleData[9] || ""
          })

          setContainerData(data.map((item) => ({
            companyId: "",
            branchId: "",
            woNo: item[0] || "",
            containerNo: item[14] || "",
            iso: item[15] || "",
            containerSize: item[16] || "",
            containerType: item[17] || "",
            weight: item[18] || "",
            commodity: item[19] || "",
            movementType: item[20] || "",
          })))

          setSelectCommodity('');
          setSelectIso('');
          setSelectMovementType('');

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
    axios.get(`${ipaddress}bufferWO/searchData?cid=${companyid}&bid=${branchId}&val=${id}`, {
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
    axios.get(`${ipaddress}bufferWO/getSelectedSearchData?cid=${companyid}&bid=${branchId}&val=${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then((response) => {

        const data = response.data;

        const singleData = data[0];

        setWoData({
          companyId: "",
          branchId: "",
          woNo: singleData[0] || "",
          profitcentreId: "CFS Export",
          srNo: 0,
          containerNo: "",
          woDate: singleData[1] === null ? null : new Date(singleData[1]),
          shippingAgent: "",
          containerSize: "",
          containerType: "",
          containerStatus: singleData[13] || "",
          onAccountOf: singleData[4] || "",
          cha: singleData[2] || "",
          shippingLine: singleData[8] || "",
          shipper: singleData[10] || "",
          commodity: "",
          bookingNo: singleData[11] || "",
          movementType: "",
          moveFrom: singleData[12] || "",
          iso: "",
          weight: "",
          status: singleData[6] || "",
          createdBy: singleData[7] || "",
          createdDate: null,
          editedBy: "",
          editedDate: null,
          approvedBy: "",
          approvedDate: null,
          processId: "",
          chaName: singleData[3] || "",
          accountHolderName: singleData[5] || "",
          shippingLineName: singleData[9] || ""
        })

        setContainerData(data.map((item) => ({
          companyId: "",
          branchId: "",
          woNo: item[0] || "",
          containerNo: item[14] || "",
          iso: item[15] || "",
          containerSize: item[16] || "",
          containerType: item[17] || "",
          weight: item[18] || "",
          commodity: item[19] || "",
          movementType: item[20] || "",
        })))

        setSelectCommodity('');
        setSelectIso('');
        setSelectMovementType('');
        closeGateInModal();
      })
      .catch((error) => {

        toast.error(error.response.data, {
          autoClose: 800
        })
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
          /> Search Buffer Work Order Data</h5>



        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
          <Row>
            <Col md={4}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                  Search By All Fields
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
                <tr className='text-center'>
                  <th scope="col">#</th>
                  <th scope="col">Work Order Id</th>
                  <th scope="col">Work Order Date</th>
                  <th scope="col">Account Holder</th>
                  <th scope="col">Booking No</th>
                  <th scope="col">Container No</th>

                </tr>
                <tr className='text-center'>
                  <th scope="col"></th>
                  <th scope="col">{gateInSearchData.length}</th>
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
            <label className="forlabel bold-label" htmlFor="igmLineNo">Work Order Id</label>
            <Row>
              <Col md={9}>
                <Input
                  className="form-control"
                  type="text"
                  id="woNo"
                  name='woNo'
                  value={woData.woNo}
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
                  <FontAwesomeIcon icon={faSearch} size="sm" />
                </button>
              </Col>
            </Row>

          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="igmLineNo">Work Order Date</label>
            <div style={{ position: 'relative' }}>
              <DatePicker
                selected={woData.woDate}
                onChange={(date) => setWoData({
                  ...woData,
                  woDate: date
                })}
                id='woDate'
                name='woDate'
                showTimeInput
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
            <label className="forlabel bold-label" htmlFor="igmLineNo">CHA <span style={{ color: 'red' }}>*</span></label>
            <Select
              value={{ value: woData.cha, label: woData.chaName }}
              onChange={handleChaSelect}
              onInputChange={handleCHAList}
              options={chaList}
              placeholder="Select CHA"
              isClearable
              id="cha"
              name="cha"
              className='autocompleteHeight'
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
            <label className="forlabel bold-label" htmlFor="igmLineNo">Account Holder</label>
            <Select
              value={{ value: woData.onAccountOf, label: woData.accountHolderName }}
              onChange={handleOnAccounOfChange}
              onInputChange={searchChaData}
              options={chaData}
              placeholder="Select Account Holder"
              isClearable
              id="onAccountOf"
              name="onAccountOf"
              className='autocompleteHeight'
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
            <label className="forlabel bold-label" htmlFor="igmLineNo">Status</label>
            <Input
              className="form-control"
              type="text"
              id="status"
              name='status'
              value={woData.status === 'A' ? 'Approved' : woData.status}
              disabled
            />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="igmLineNo">Created By</label>
            <Input
              className="form-control"
              type="text"
              id="createdBy"
              name='createdBy'
              value={woData.createdBy}
              disabled
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="igmLineNo">Shipping Line</label>
            <Select
              value={{ value: woData.shippingLine, label: woData.shippingLineName }}
              onChange={handleLinerChange}
              onInputChange={getLinerData}
              options={linerData}
              placeholder="Select Shipping Line"
              isClearable
              id="shippingLine"
              name="shippingLine"
              className='autocompleteHeight'
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
            <label className="forlabel bold-label" htmlFor="igmLineNo">Shipper</label>
            <Input
              className="form-control"
              type="text"
              id="shipper"
              name='shipper'
              maxLength={30}
              value={woData.shipper}
              onChange={handleWoDataChange}
            />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="igmLineNo">Booking No</label>
            <Input
              className="form-control"
              type="text"
              id="bookingNo"
              name='bookingNo'
              maxLength={20}
              value={woData.bookingNo}
              onChange={handleWoDataChange}
            />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="igmLineNo">Move From</label>
            <Input
              className="form-control"
              type="text"
              id="moveFrom"
              name='moveFrom'
              maxLength={30}
              value={woData.moveFrom}
              onChange={handleWoDataChange}
            />
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="igmLineNo">Container Health</label>
            <Input
              className="form-control"
              type="select"
              id="containerStatus"
              name='containerStatus'
              value={woData.containerStatus}
              onChange={handleWoDataChange}
            >
              <option value="" selected=""></option>

              <option value="HDEMAG">Heavy Damage</option>

              <option value="LDEMAG">Light Damage</option>

              <option value="MDEMAG">Medium Damage</option>

              <option value="OK">Healthy</option>
            </Input>
          </FormGroup>
        </Col>
        <Col md={2}>
          <FormGroup>
            <label className="forlabel bold-label" htmlFor="igmLineNo">Profitcentre Id</label>
            <Input
              className="form-control"
              type="text"
              id="profitcentreId"
              name='profitcentreId'
              value={woData.profitcentreId}
              disabled
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col className='text-center'>
          <button
            className="btn btn-outline-primary btn-margin newButton"
            style={{ marginRight: 10 }}
            id="submitbtn2"
            disabled={woData.woNo !== ''}
            onClick={handleSave}
          >
            <FontAwesomeIcon icon={faSave} style={{ marginRight: 5 }} />
            Save

          </button>
          <button
            className="btn btn-outline-danger btn-margin newButton"
            style={{ marginRight: 10 }}
            id="submitbtn2"
            onClick={handleClear}
          >
            <FontAwesomeIcon icon={faRefresh} style={{ marginRight: 5 }} />
            Clear
          </button>
          <button
            className="btn btn-outline-primary btn-margin newButton"
            style={{ marginRight: 10 }}
            id="submitbtn2"
            onClick={addContainer}
          >
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
            Add Details
          </button>
        </Col>
      </Row>
      <div id="datepicker-portal"></div>
      <div className="mt-3 table-responsive">
        <table className="table table-bordered table-hover tableHeader">
          <thead className="tableHeader">

            <tr className="text-center">
              <th scope="col">Sr NO</th>
              <th scope="col" style={{ width: 180 }}>Container No <span style={{ color: 'red' }}>*</span></th>
              <th scope="col" style={{ width: 150 }}>ISO <span style={{ color: 'red' }}>*</span></th>
              <th scope="col">Size</th>
              <th scope="col">Type</th>
              <th scope="col">Weight</th>
              <th scope="col" style={{ width: 280 }}>Commodity</th>
              <th scope="col" style={{ width: 200 }}>Movement Type</th>
            </tr>
            <tr className='text-center'>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col">
                <Select

                  value={{ value: selectIso, label: selectIso }}
                  onChange={handleSelectIsoChange}
                  options={isoCodes}
                  placeholder="Select ISO"
                  isClearable
                  id="selectIso"
                  name="selectIso"
                  className={`autocompleteHeight`}
                  menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                  menuPosition="fixed" // Sets the dropdown menu position to fixed 
                  menuPlacement="top"

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
              </th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col">
                <Input
                  className="form-control"
                  type="select"
                  id="selectCommodity"
                  name='selectCommodity'
                  value={selectCommodity}
                  onChange={(e) => handleSelectCommodity(e.target.value)}
                >
                  <option value="">Select Commodity</option>
                  {commodityData.map((item, index) => (
                    <option key={index} value={item[0]}>{item[1]}</option>
                  ))}
                </Input>
              </th>
              <th scope="col">
                <Input
                  className="form-control"
                  type="select"
                  id="selectMovementType"
                  name='selectMovementType'
                  value={selectMovementType}
                  onChange={(e) => handleSelectMovementType(e.target.value)}
                >
                  <option value="">Select Movement Type</option>
                  <option value="Buffer">Buffer</option>
                  <option value="ONWH">Export FCL</option>
                  <option value="FDSGI">Factory Stuffing</option>
                </Input>
              </th>
            </tr>
          </thead>
          <tbody>
            {containerData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <FormGroup>
                    <Input
                      className={`form-control ${errors[index]?.containerNo ? 'error-border' : ''}`}
                      type="text"
                      id="containerNo"
                      name='containerNo'
                      value={item.containerNo}
                      onChange={(e) => handleContainerDataChange(e, index)}
                      maxLength={11}
                    />
                    <div style={{ color: 'red' }} className="error-message">{errors[index]?.containerNo}</div>
                  </FormGroup>

                </td>
                <td>
                  <FormGroup>
                    <Select

                      value={{ value: item.iso, label: item.iso }}
                      onChange={(option, actionMeta) => handleIsoChange(option, actionMeta, index)}
                      options={isoCodes}
                      placeholder="Select ISO"
                      isClearable
                      id="iso"
                      name="iso"
                      className={`autocompleteHeight ${errors[index]?.iso ? 'error-border' : ''}`}
                      menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                      menuPosition="fixed" // Sets the dropdown menu position to fixed 
                      menuPlacement="top"

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
                    <div style={{ color: 'red' }} className="error-message">{errors[index]?.iso}</div>
                  </FormGroup>

                </td>
                <td>{item.containerSize}</td>
                <td>{item.containerType}</td>
                <td>{item.weight}</td>
                <td>
                  <Input
                    className="form-control"
                    type="select"
                    id="commodity"
                    name='commodity'
                    value={item.commodity}
                    onChange={(e) => handleContainerDataChange(e, index)}
                  >
                    <option value="">Select Commodity</option>
                    {commodityData.map((item, index) => (
                      <option key={index} value={item[0]}>{item[1]}</option>
                    ))}
                  </Input>
                </td>
                <td>
                  <Input
                    className="form-control"
                    type="select"
                    id="movementType"
                    name='movementType'
                    value={item.movementType}
                    onChange={(e) => handleContainerDataChange(e, index)}
                  >
                    <option value="">Select Movement Type</option>
                    <option value="Buffer">Buffer</option>
                    <option value="ONWH">Export FCL</option>
                    <option value="FDSGI">Factory Stuffing</option>
                  </Input>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </>
  );
}

export default BufferWorkOrder;