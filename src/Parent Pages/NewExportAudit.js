import AuthContext from "../Components/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import Select, { components } from 'react-select';
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
} from "reactstrap";
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
  faHouse,
  faTruckFront,
  faRectangleList,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/style.css";
import "../Components/Style.css";
import useAxios from "../Components/useAxios";
import cfsService from '../service/CFSService';
import movementService from "../service/MovementService";
import { toast } from "react-toastify";
import CreatableSelect from 'react-select/creatable';


function NewExportAudit() {
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


  const axiosInstance = useAxios();
  const MovementService = new movementService(axiosInstance);
  const CFSService = new cfsService(axiosInstance);



  const initialSearchValue = {
    companyId: companyid,
    branchId: branchId,
    sbNo: '',
    containerNo: '',
    profitCenterId: 'N00004'
  }

  const initialShippingBill = {
    sbtransid: "", // Transaction ID
    auditremarks: "", // Audit remarks
    profitCentreId: "", // Profit Centre ID
    companyId: companyid, // Company ID
    branchId: branchId, // Branch ID
    finYear: "", // Financial Year
    userId: "", // User ID

    // Old and new values
    oldSbNo: "",
    newSbNo: "",

    oldSbDate: null,
    newSbDate: null,

    oldNoOfPackages: 0,
    newNoOfPackages: 0,

    oldGrossWeight: 0,
    newGrossWeight: 0,

    oldPackagesType: "",
    newPackagesType: "",

    oldExporter: "",
    newExporter: "",

    oldCargoType: "",
    newCargoType: "",

    oldFOB: 0,
    newFOB: 0,

    oldCommodityId: "",
    newCommodityId: "",

    oldNoOfMarks: "",
    newNoOfMarks: "",

    oldConsigneeName: "",
    newConsigneeName: "",

    oldCHA: "",
    newCHA: "",
    chaName: "",

    oldOnAcc: "",
    newOnAcc: "",
    onAccountName: "",

    oldSbType: "",
    newSbType: "",

    oldExporterId: "",
    newExporterId: "",
  };


  const initialGateInJoDTO = {
    sbNo: "", // Shipping Bill Number
    containerNo: "", // Container Number
    auditremarks: "", // Audit remarks
    profitCentreId: "", // Profit Centre ID
    companyId: "", // Company ID
    branchId: "", // Branch ID
    finYear: "", // Financial Year
    userId: "", // User ID
    dor: null, // Date of Record

    sbtransId: "", // SB Transaction ID
    newVehicleNo: "", // Truck Number
    newGateInDate: null, // Gate In Date
    newCartingTransDate: null, // Cargo Receipt Date
    oldVehicleNo: "", // Old Truck Number
    oldGateInDate: null, // Old Gate In Date
    oldCartingTransDate: null, // Old Cargo Receipt Date
    gateInId: "" // Gate In ID
  };

  const initialGateInJoDetailDTO = {
    sbNo: "", // Shipping Bill Number
    sbTransId: "", // SB Transaction ID
    containerNo: "", // Container Number
    auditremarks: "", // Audit remarks
    profitCentreId: "", // Profit Centre ID
    companyId: "", // Company ID
    branchId: "", // Branch ID
    finYear: "", // Financial Year
    userId: "", // User ID
    dor: null, // Date of Record

    noOfPackages: 0, // Job Number Packages
    grossWeight: 0, // Job Weight

    newCartedpPkg: 0, // Received Packages
    newCartedWt: 0, // Received Weight

    oldCartedpPkg: 0, // Received Packages
    oldCartedWt: 0, // Received Weight

    gateInId: "", // Cargo Gate In ID
    cartingTransId: "", // Cargo Carting In ID
    cartingLineId: "", // Cargo Carting Line ID,
    cellArea: 0
  };

  const initialCartingTallyDTO = {
    sbNo: "", // Shipping Bill Number
    sbTransId: "", // SB Transaction ID
    containerNo: "", // Container Number
    auditremarks: "", // Audit remarks
    profitCentreId: "", // Profit Centre ID
    companyId: "", // Company ID
    branchId: "", // Branch ID
    finYear: "", // Financial Year
    userId: "", // User ID
    dor: null, // Date of Record

    oldCartedpPkg: 0, // Received Packages
    newCartedpPkg: 0, // Received Packages

    newYardLocation: "", // Grid Location
    newYardPackages: 0, // Grid Packages
    newGridweight: 0, // Grid Weight
    newCellAreaAllocated: 0, // Grid Area

    oldYardLocation: "", // Old Grid Location
    oldYardPackages: 0, // Old Grid Packages
    oldGridweight_old: 0, // Old Grid Weight
    oldCellAreaAllocated: 0, // Old Grid Area

    gateInId: "", // Cargo Gate In ID
    cartingTransId: "", // Cargo Carting In ID
    cartingLineId: "" // Cargo Carting Line ID
  };

  const initialContainerGateIn = {
    auditremarks: "",
    sbNo: "",
    sbTranId: "",
    containerNo: "",
    gateInId: "",
    stuffReqId: '',
    stuffTallyId: "",
    movementReqId: "",
    gateOutId: "",
    gatePassNo: '',
    newGatePassNo: "",
    newGateInDate: "",
    newContainerNo: "",
    newContainerSize: "",
    newCargoType: "",
    newIsoCode: "",
    newTareWeight: "",
    newExporter: "",
    newTruckNo: "",
    newGrossWeight: "",
    newAgentSealNo: "",
    newCustomSealNo: "",
    newTransporter: "",
    newDamageDetails: "",
    newMovementType: "",
    newMovementBy: "",
    newCHA: "",
    newShippingLine: "",
    newShippingAgent: "",
    profitCentreId: "",

    oldGatePassNo: "",
    oldGateInDate: "",
    oldContainerNo: "",
    oldContainerSize: "",
    oldCargoType: "",
    oldIsoCode: "",
    oldTareWeight: "",
    oldExporter: "",
    oldTruckNo: "",
    oldGrossWeight: "",
    oldAgentSealNo: "",
    oldCustomSealNo: "",
    oldTransporter: "",
    oldDamageDetails: "",
    oldMovementType: "",
    oldMovementBy: "",
    oldCHA: "",
    oldShippingLine: "",
    oldShippingAgent: "",

    exporterName: "",
    shippingAgentName: "",
    shippingLineName: "",
    chaName: "",

    newTransporterName: "",
    oldTransporterName: "",
    newContainerType: '',
    oldContainerType: ''
  };

  const initialContainerGateOut = {
    auditremarks: "",
    gateInId: "",
    sbNo: "",
    containerNo: "",
    sbTransId: "",
    gateOutId: "",
    gatePassNo: "",
    newGatePassDate: "",
    newTruckNo: "",
    newGateOutDate: "",
    newTransporter: "",
    newTransporterName: "",
    oldGatePassDate: "",
    oldTruckNo: "",
    oldGateOutDate: "",
    oldTransporter: "",
    oldTransporterName: "",

    profitCentreId: "",
    containerSize: "",
    containerType: ""
  };

  const initialStuffTally = {
    sbNo: "",
    sbTransId: "",
    newContainerNo: "",
    newContainerSize: "",
    newContainerType: "",
    newStuffDate: "",

    oldvoyageNo: "",
    oldvcnNo: "",
    oldVesselId: "",
    oldVesselName: "",

    oldRotataionNo: "",
    oldPod: "",
    oldPodDesc: "",

    oldFinalPod: "",
    oldFinalPodDesc: "",

    oldPol: "",
    oldAgentSealNo: "",
    oldCustomSealNo: "",
    oldTareWeight: "",
    oldMovementRqDate: "",
    oldStuffQty: 0,
    oldStuffQtyWeight: 0,
    sbStuffedQty: 0,
    sbGrossWeight: 0,
    oldContainerNo: "",
    oldContainerSize: "",
    oldContainerType: "",
    oldStuffDate: "",

    newvoyageNo: "",
    newvcnNo: "",
    newVesselId: "",
    newVesselName: "",

    newRotataionNo: "",
    newPod: "",
    newPodDesc: "",

    newFinalPod: "",
    newFinalPodDesc: "",

    newPol: "",
    newAgentSealNo: "",
    newCustomSealNo: "",
    newTareWeight: "",
    newMovementRqDate: "",
    newStuffQty: 0,
    newStuffQtyWeight: 0,

    profitCentreId: ""
  };

  const initialBackToTown = {
    sbNo: "",
    sbTransId: "",
    auditremarks: "",
    backToTownTransId: "",

    actualNoOfPackages: 0,
    grossWeight: 0,

    oldBackToTownPackages: 0,
    oldBackToTownTransDate: null,
    oldBackToTownWeight: 0,

    newBackToTownPackages: 0,
    newBackToTownTransDate: null,
    newBackToTownWeight: 0,
  };

  const initialBackToTownOut = {
    gateOutId: "",
    gatePassNo: "",
    sbNo: "",
    sbTransId: "",
    auditremarks: "",
    backToTownTransId: "",
    actualNoOfPackages: 0,
    grossWeight: 0,

    oldBackToTownPackages: 0,
    oldBackToTownTransDate: null,
    backToTownWeight: 0,

    newTruckNo: "",
    newGateOutDate: null,
    oldTruckNo: "",
    oldGateOutDate: null,

    newBackToTownPackages: 0,

    newQtyTakenOut: 0,
    oldQtyTakenOut: 0,
  };

  const [backToTownOutData, setBackToTownOutData] = useState([initialBackToTownOut]);
  const [backToTownOutErrors, setBackToTownOutErrors] = useState([]);
  const [backToTownData, setBackToTownData] = useState([initialBackToTown]);
  const [backToTownErrors, setBackToTownErrors] = useState([]);

  const [stuffTally, setSTuffTally] = useState([initialStuffTally]);
  const [stuffTallyErrors, setStuffTallyErrors] = useState([]);

  const [containerGateOut, setContainerGateOut] = useState(initialContainerGateOut);
  const [containerGateOutErrors, setContainerGateOutErrors] = useState([]);

  const [containerGateIn, setContainerGateIn] = useState(initialContainerGateIn);
  const [containerGateInErrors, setContainerGateInErrors] = useState([]);

  const [gateInJo, setGateInJo] = useState([initialGateInJoDTO]);
  const [gateInJoErrors, setGateInJoErrors] = useState([]);


  const [gateInJoDetailDTO, setGateInJoDetailDTO] = useState([initialGateInJoDetailDTO]);
  const [gateInJoDetailErrors, setGateInJoDetailErrors] = useState([]);

  const [cartingTallyDTO, setCartingTallyDTO] = useState([initialCartingTallyDTO]);
  const [cartingTallyErrors, setCartingTallyErrors] = useState([]);
  const [selectedYardLocationMain, setSelectedYardLocationMain] = useState([]);
  const [yardLocations, setYardLocations] = useState([]);





  const [shippingBillDetail, setShippingBillDetail] = useState(initialShippingBill);
  const [sbErrors, setSbErrors] = useState([]);
  const [exporterData, setExporterData] = useState([]);
  const [chaData, setChaData] = useState([]);
  const [onAccountData, setOnAccountData] = useState([]);

  const [lineData, setLineData] = useState([]);
  const [agentData, setAgentData] = useState([]);

  const [gatePassData, setGatePassData] = useState([]);
  const [exporterContainerGateInData, setExporterContainerGateInData] = useState([]);
  const [containerNoListGateIn, setContainerNoListGateIn] = useState([]);

  const [transporterContainerGateInData, setTransporterContainerGateInData] = useState([]);
  const [containerTypes, setContainerTypes] = useState([]);



  const [containerSizes, setContainerSizes] = useState([]);
  const [containerTypesStuff, setContainerTypesStuff] = useState([]);


  const [selectedExporter, setSelectedExporter] = useState(null);
  const [selectedCha, setSelectedCha] = useState([]);
  const [selectedOnAccount, setSelectedOnAccount] = useState([]);
  // const [cargoTypes, setCargoType] = useState([]);
  const [packagesTypes, setPackagesTypes] = useState([]);
  const [selectedGatePassNo, setSelectedGatePassNo] = useState(null);




  const [selectedContainerNoGateIn, setSelectedContainerNoGateIn] = useState(null);

  const [selectedContainerNoStuff, setSelectedContainerNoStuff] = useState([]);
  const [podData, setPodData] = useState([]);
  const [selectedPod, setSelectedPod] = useState([]);
  const [polData, setPolData] = useState([]);
  const [selectedPol, setSelectedPol] = useState([]);
  const [selectedFinalPod, setSelectedFinalPod] = useState([]);

  const [vesselData, setVesselData] = useState([]);
  const [selectedViaNo, setSelectedViaNo] = useState([]);
  const [selectedVoyageNo, setSelectedVoyageNo] = useState([]);


  const [selectedExporterContainerGateIn, setSelectedExporterContainerGateIn] = useState(null);
  const [selectedTransporterContainerGateIn, setSelectedTransporterContainerGateIn] = useState(null);
  const [selectedChaContainerGateIn, setSelectedChaContainerGateIn] = useState(null);
  const [selectedLineContainerGateIn, setSelectedLineContainerGateIn] = useState(null);
  const [selectedAgentContainerGateIn, setSelectedAgentContainerGateIn] = useState(null);

  const [selectedTransporterContainerGateOut, setSelectedTransporterContainerGateOut] = useState(null);



  const [searchMain, setSearchMain] = useState(initialSearchValue);



  useEffect(() => {
    const fetchData = async () => {
      await getPackageType('J00060');
      // await getContainerType('J00068');

      await getContainerTypeStuff('J00005');
      await getContainerSizes('J00069');
    };
    fetchData();
  }, []);





  const getPackageType = async (jarId) => {
    const packageType = await getjarByJarId(jarId);
    setPackagesTypes(packageType);
  };


  const getContainerType = async (jarId) => {
    const packageType = await getjarByJarId(jarId);
    setContainerTypes(packageType);
  };

  const getContainerTypeStuff = async (jarId) => {
    const packageType = await getjarByJarId(jarId, 'ctype');
    setContainerTypesStuff(packageType);
  };

  const getContainerSizes = async (jarId) => {
    const packageType = await getjarByJarId(jarId);
    setContainerSizes(packageType);
  };



  const getjarByJarId = async (jarId, ctype) => {
    try {
      const response = await CFSService.getjarByJarId(companyid, jarId, jwtToken);
      const result = response.data;

      if (ctype === 'ctype') {
        return result.map(port => ({
          value: port[0],
          label: port[0]
        }));
      } else {
        return result.map(port => ({
          value: port[0],
          label: port[1]
        }));
      }
    } catch (error) {
      console.error('Error fetching jar data:', error);
      return [];
    }
  };












  const reset = async (type) => {

    if (type !== 'resetsearch') {
      setSearchMain(initialSearchValue);
    }

    setSelectedCha(null);
    setSelectedOnAccount(null);
    setSelectedExporter(null);
    setShippingBillDetail();
    setSbErrors([]);

    setGateInJo([]);
    setGateInJoErrors([]);

    setGateInJoDetailDTO([]);
    setGateInJoDetailErrors([]);

    setCartingTallyDTO([]);
    setCartingTallyErrors([]);



    setContainerGateIn();
    setContainerGateInErrors([]);
    setSelectedGatePassNo(null);
    setSelectedContainerNoGateIn(null);
    setSelectedExporterContainerGateIn(null);
    setSelectedChaContainerGateIn(null);
    setSelectedTransporterContainerGateIn(null);
    setSelectedLineContainerGateIn(null);
    setSelectedAgentContainerGateIn(null);

    setSelectedTransporterContainerGateOut(null);


    setContainerGateOut();
    setContainerGateOutErrors([]);

    setSTuffTally([]);
    setStuffTallyErrors([]);


    setBackToTownData([]);
    setBackToTownOutData([]);
    setBackToTownErrors([]);
    setBackToTownOutErrors([]);



    setSelectedTransporterContainerGateOut(null);

    const clearedviaNo = selectedViaNo.map(() => null);
    setSelectedViaNo(clearedviaNo);

    const clearedVoyage = selectedVoyageNo.map(() => null);
    setSelectedVoyageNo(clearedVoyage);

    const clearedpod = selectedPod.map(() => null);
    setSelectedPod(clearedpod);

    const cleareFinalPod = selectedFinalPod.map(() => null);
    setSelectedFinalPod(cleareFinalPod);

    const cleareFinalPol = selectedPol.map(() => null);
    setSelectedPol(cleareFinalPol);

    const clearedYards = selectedYardLocationMain.map(() => null);
    setSelectedYardLocationMain(clearedYards);
  }



  const handleChange = (e) => {
    const { id, value } = e.target;
    setSearchMain((prevCriteria) => ({
      ...prevCriteria,
      [id]: value,
    }));
  };

  const searchExportAudit = async (searchCriteria) => {
    if (
      searchCriteria &&
      !searchCriteria.sbNo &&
      !searchCriteria.containerNo
    ) {
      toast.error('Please Enter at least one field!', {
        position: 'top-center',
        autoClose: 1000,
      });
      return;
    }
    setLoading(true);
    try {
      const response = await MovementService.searchAuditMain(searchCriteria, jwtToken);
      assignsearchValues(response);
    } catch (error) {
      console.error('An error occurred while fetching the export Audit data:', error);
      if (error.response && error.response.data) {
        toast.error(error.response.data, {
          position: 'top-center',
          autoClose: 1000,
        });
      } else {
        toast.error('Oops something went wrong!', {
          position: 'top-center',
          autoClose: 1000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const assignsearchValues = async (response) => {

    console.log('assignsearchValues response     \n', response);
    const isEmpty = (val) => val === null || val === undefined || (Array.isArray(val) && val.length === 0);

    const responseData = response.body || response.data || {};
    const { sbDetail, gateinJo, gateinJoDtl, carting, containerGateIn, containerGateOut, stuffTally, backToTown, backToTownOut } = responseData;

    if (
      isEmpty(sbDetail) &&
      isEmpty(gateinJo) &&
      isEmpty(gateinJoDtl) &&
      isEmpty(carting) &&
      isEmpty(containerGateIn) &&
      isEmpty(containerGateOut) &&
      isEmpty(backToTown) &&
      isEmpty(backToTownOut) &&
      isEmpty(stuffTally)
    ) {
      reset('resetsearch');
      toast.error('No Data Found!', {
        position: 'top-center',
        autoClose: 1000,
      });
      return;
    }

    setContainerGateIn(containerGateIn ? containerGateIn : {});
    setContainerGateOut(containerGateOut ? containerGateOut : {});
    setSTuffTally(stuffTally ? stuffTally : []);

    setShippingBillDetail(sbDetail ? sbDetail : {});
    setGateInJo(gateinJo ? gateinJo : []);
    setGateInJoDetailDTO(gateinJoDtl ? gateinJoDtl : []);
    setCartingTallyDTO(carting ? carting : []);

    setBackToTownOutData(backToTownOut ? backToTownOut : []);
    setBackToTownData(backToTown ? backToTown : []);


    if (!isEmpty(carting)) {
      const initialSelectedYards = carting.map(entry => ({
        value: entry.newYardLocation,
        label: entry.newYardLocation + '-' + entry.newBlock + '-' + entry.newCell,
      }));
      setSelectedYardLocationMain(initialSelectedYards);
    }
    if (!isEmpty(stuffTally)) {
      updateSelectTagsMultiple(stuffTally, 'stuffTally');
    }

    if (!isEmpty(sbDetail)) {
      updateSelectTags(sbDetail, 'sb');
    }

    if (!isEmpty(containerGateIn)) {
      updateSelectTags(containerGateIn, 'containerGateIn');
    }

    if (!isEmpty(containerGateOut)) {
      updateSelectTags(containerGateOut, 'containerGateOut');
    }

  }



  const updateSelectTagsMultiple = async (exportGateIn, table) => {

    if (table === 'stuffTally') {
      const initialSelectedViaNos = exportGateIn.map(entry => ({
        value: entry.newvcnNo,
        label: entry.newvcnNo,
      }));
      setSelectedViaNo(initialSelectedViaNos);

      const initialSelectedVoyage = exportGateIn.map(entry => ({
        value: entry.newvoyageNo,
        label: entry.newvoyageNo,
      }));
      setSelectedVoyageNo(initialSelectedVoyage);


      const initialPod = exportGateIn.map(entry => ({
        value: entry.oldPod,
        label: entry.oldPodDesc,
      }));
      setSelectedPod(initialPod);

      const initialPol = exportGateIn.map(entry => ({
        value: entry.newPol,
        label: entry.newPolDesc,
      }));
      setSelectedPol(initialPol);

      const initialFinalPod = exportGateIn.map(entry => ({
        value: entry.oldFinalPod,
        label: entry.oldFinalPodDesc,
      }));
      setSelectedFinalPod(initialFinalPod);



    }

    if (table === 'containerGateIn') {
      const initialCha = exportGateIn.oldCHA ? { value: exportGateIn.oldCHA, label: exportGateIn.chaName } : null; setSelectedChaContainerGateIn(initialCha);
      const initialExp = exportGateIn.oldExporter ? { value: exportGateIn.oldExporter, label: exportGateIn.exporterName } : null; setSelectedExporterContainerGateIn(initialExp);
      const initialAgent = exportGateIn.oldShippingAgent ? { value: exportGateIn.oldShippingAgent, label: exportGateIn.shippingAgentName } : null; setSelectedAgentContainerGateIn(initialAgent);


      const initialLine = exportGateIn.oldShippingLine ? { value: exportGateIn.oldShippingLine, label: exportGateIn.shippingLineName } : null; setSelectedLineContainerGateIn(initialLine);
      const initialTrans = exportGateIn.oldTransporter ? { value: exportGateIn.oldTransporter, label: exportGateIn.oldTransporterName } : null; setSelectedTransporterContainerGateIn(initialTrans);
      const initialContainerNo = exportGateIn.oldGateInId ? { value: exportGateIn.oldGateInId, label: exportGateIn.oldContainerNo } : null; setSelectedContainerNoGateIn(initialContainerNo);
      const initialGatePassNo = exportGateIn.oldGatePassNo ? { value: exportGateIn.oldGatePassNo, label: exportGateIn.oldGatePassNo } : null; setSelectedGatePassNo(initialGatePassNo);

    }


  }







  const updateSelectTags = async (exportGateIn, table) => {

    if (table === 'sb') {
      const initialCha = exportGateIn.oldCHA ? { value: exportGateIn.oldCHA, label: exportGateIn.chaName } : null; setSelectedCha(initialCha);
      const initialExp = exportGateIn.oldExporterId ? { value: exportGateIn.oldExporterId, label: exportGateIn.oldExporter } : null; setSelectedExporter(initialExp);
      const initialOnAccountOf = exportGateIn.oldOnAcc ? { value: exportGateIn.oldOnAcc, label: exportGateIn.onAccountName } : null; setSelectedOnAccount(initialOnAccountOf);
    }

    if (table === 'containerGateIn') {
      const initialCha = exportGateIn.oldCHA ? { value: exportGateIn.oldCHA, label: exportGateIn.chaName } : null; setSelectedChaContainerGateIn(initialCha);
      const initialExp = exportGateIn.newExporter ? { value: exportGateIn.newExporter, label: exportGateIn.newExporter } : null; setSelectedExporterContainerGateIn(initialExp);
      const initialAgent = exportGateIn.oldShippingAgent ? { value: exportGateIn.oldShippingAgent, label: exportGateIn.shippingAgentName } : null; setSelectedAgentContainerGateIn(initialAgent);


      const initialLine = exportGateIn.oldShippingLine ? { value: exportGateIn.oldShippingLine, label: exportGateIn.shippingLineName } : null; setSelectedLineContainerGateIn(initialLine);
      const initialTrans = exportGateIn.oldTransporter ? { value: exportGateIn.oldTransporter, label: exportGateIn.oldTransporterName } : null; setSelectedTransporterContainerGateIn(initialTrans);
      // const initialContainerNo = exportGateIn.oldGateInId ? { value: exportGateIn.oldGateInId, label: exportGateIn.oldContainerNo } : null; setSelectedContainerNoGateIn(initialContainerNo);
      // const initialGatePassNo = exportGateIn.oldGatePassNo ? { value: exportGateIn.oldGatePassNo, label: exportGateIn.oldGatePassNo } : null; setSelectedGatePassNo(initialGatePassNo);

    }

    if (table === 'containerGateOut') {
      const initialTrans = exportGateIn.oldTransporter ? { value: exportGateIn.oldTransporter, label: exportGateIn.oldTransporterName } : null; setSelectedTransporterContainerGateOut(initialTrans);
    }
  }


  console.log('backToTownOutData \n', backToTownOutData);


  const handleFieldChange = (e, index, table, fieldName, type, maxIntegerDigits, maxDecimalDigits) => {
    let { value } = e.target;

    console.log(index, table, fieldName, type);


    // Process input based on type
    if (type === 'decimal') {
      // Remove any invalid characters
      value = value.replace(/[^0-9.]/g, '');

      const parts = value.split('.');

      // If there are more than 2 parts, combine them correctly
      if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
      }

      // Limit the integer part
      if (parts[0].length > maxIntegerDigits) {
        parts[0] = parts[0].slice(0, maxIntegerDigits);
      }

      // Limit the decimal part
      if (parts[1]) {
        parts[1] = parts[1].slice(0, maxDecimalDigits);
      }

      value = parts.join('.');
    } else if (type === 'number') {
      value = value.replace(/[^0-9]/g, '');
    }

    if (fieldName === 'auditremarks') {

      if (table === 'gateInJo') {
        // Update exportStuffRequest state
        setGateInJo(prevRequest =>
          prevRequest.map(item => ({
            ...item,
            [fieldName]: value
          }))
        );


        // Update validationErrors state
        setGateInJoErrors(prevErrors =>
          prevErrors.map(error => {
            const updatedError = { ...error }; // Copy the error object
            delete updatedError[fieldName]; // Remove the specific field error
            return updatedError; // Return the updated error object
          })
        );
      }



      if (table === 'gateInJoDtl') {
        // Update exportStuffRequest state
        setGateInJoDetailDTO(prevRequest =>
          prevRequest.map(item => ({
            ...item,
            [fieldName]: value
          }))
        );


        // Update validationErrors state
        setGateInJoDetailErrors(prevErrors =>
          prevErrors.map(error => {
            const updatedError = { ...error }; // Copy the error object
            delete updatedError[fieldName]; // Remove the specific field error
            return updatedError; // Return the updated error object
          })
        );
      }


      if (table === 'cartingTally') {
        // Update exportStuffRequest state
        setCartingTallyDTO(prevRequest =>
          prevRequest.map(item => ({
            ...item,
            [fieldName]: value
          }))
        );


        // Update validationErrors state
        setCartingTallyErrors(prevErrors =>
          prevErrors.map(error => {
            const updatedError = { ...error }; // Copy the error object
            delete updatedError[fieldName]; // Remove the specific field error
            return updatedError; // Return the updated error object
          })
        );
      }

      if (table === 'stuffTally') {
        // Update exportStuffRequest state
        setSTuffTally(prevRequest =>
          prevRequest.map(item => ({
            ...item,
            [fieldName]: value
          }))
        );


        // Update validationErrors state
        setStuffTallyErrors(prevErrors =>
          prevErrors.map(error => {
            const updatedError = { ...error }; // Copy the error object
            delete updatedError[fieldName]; // Remove the specific field error
            return updatedError; // Return the updated error object
          })
        );
      }


      if (table === 'backToTown') {
        // Update exportStuffRequest state
        setBackToTownData(prevRequest =>
          prevRequest.map(item => ({
            ...item,
            [fieldName]: value
          }))
        );


        // Update validationErrors state
        setBackToTownErrors(prevErrors =>
          prevErrors.map(error => {
            const updatedError = { ...error }; // Copy the error object
            delete updatedError[fieldName]; // Remove the specific field error
            return updatedError; // Return the updated error object
          })
        );
      }

      if (table === 'backToTownOut') {
        // Update exportStuffRequest state
        setBackToTownOutData(prevRequest =>
          prevRequest.map(item => ({
            ...item,
            [fieldName]: value
          }))
        );


        // Update validationErrors state
        setBackToTownOutErrors(prevErrors =>
          prevErrors.map(error => {
            const updatedError = { ...error }; // Copy the error object
            delete updatedError[fieldName]; // Remove the specific field error
            return updatedError; // Return the updated error object
          })
        );
      }

    }



    if (table === 'backToTownOut') {
      setBackToTownOutData(prevState => {
        const updatedTransDtl = [...prevState];
        updatedTransDtl[index] = {
          ...updatedTransDtl[index],
          [fieldName]: value
        };
        return updatedTransDtl;
      });

      setBackToTownOutErrors(prevErrors => {
        const updatedErrors = [...prevErrors];
        if (updatedErrors[index]) {
          delete updatedErrors[index][fieldName];
        }
        return updatedErrors;
      });
    }

    if (table === 'backToTown') {
      setBackToTownData(prevState => {
        const updatedTransDtl = [...prevState];
        updatedTransDtl[index] = {
          ...updatedTransDtl[index],
          [fieldName]: value
        };
        return updatedTransDtl;
      });

      setBackToTownErrors(prevErrors => {
        const updatedErrors = [...prevErrors];
        if (updatedErrors[index]) {
          delete updatedErrors[index][fieldName];
        }
        return updatedErrors;
      });
    }




    if (table === 'sb') {
      setShippingBillDetail(prevEntry => ({
        ...prevEntry,
        [fieldName]: value,
      }));

      setSbErrors(prevErrors => {
        const updatedErrors = { ...prevErrors };
        if (updatedErrors[fieldName]) {
          delete updatedErrors[fieldName];
        }
        return updatedErrors;
      });
    }



    if (table === 'gateInJo') {
      setGateInJo(prevState => {
        const updatedTransDtl = [...prevState];
        updatedTransDtl[index] = {
          ...updatedTransDtl[index],
          [fieldName]: value
        };
        return updatedTransDtl;
      });

      // Clear the validation error for the field
      setGateInJoErrors(prevErrors => {
        const updatedErrors = [...prevErrors];
        if (updatedErrors[index]) {
          delete updatedErrors[index][fieldName];
        }
        return updatedErrors;
      });
    }


    if (table === 'gateInJoDtl') {
      setGateInJoDetailDTO(prevState => {
        const updatedTransDtl = [...prevState];
        updatedTransDtl[index] = {
          ...updatedTransDtl[index],
          [fieldName]: value
        };
        return updatedTransDtl;
      });

      // Clear the validation error for the field
      setGateInJoDetailErrors(prevErrors => {
        const updatedErrors = [...prevErrors];
        if (updatedErrors[index]) {
          delete updatedErrors[index][fieldName];
        }
        return updatedErrors;
      });
    }



    if (table === 'cartingTally') {
      setCartingTallyDTO(prevState => {
        const updatedTransDtl = [...prevState];
        updatedTransDtl[index] = {
          ...updatedTransDtl[index],
          [fieldName]: value
        };
        return updatedTransDtl;
      });

      setCartingTallyErrors(prevErrors => {
        const updatedErrors = [...prevErrors];
        if (updatedErrors[index]) {
          delete updatedErrors[index][fieldName];
        }
        return updatedErrors;
      });
    }



    if (table === 'stuffTally') {
      setSTuffTally(prevState => {
        const updatedTransDtl = [...prevState];
        updatedTransDtl[index] = {
          ...updatedTransDtl[index],
          [fieldName]: value
        };
        return updatedTransDtl;
      });

      setStuffTallyErrors(prevErrors => {
        const updatedErrors = [...prevErrors];
        if (updatedErrors[index]) {
          delete updatedErrors[index][fieldName];
        }
        return updatedErrors;
      });
    }



    if (table === 'containerGateOut') {
      setContainerGateOut(prevEntry => ({
        ...prevEntry,
        [fieldName]: value,
      }));

      setContainerGateOutErrors(prevErrors => {
        const updatedErrors = { ...prevErrors };
        if (updatedErrors[fieldName]) {
          delete updatedErrors[fieldName];
        }
        return updatedErrors;
      });
    }
    if (table === 'containerGateIn') {
      setContainerGateIn(prevEntry => ({
        ...prevEntry,
        [fieldName]: value,
      }));

      setContainerGateInErrors(prevErrors => {
        const updatedErrors = { ...prevErrors };
        if (updatedErrors[fieldName]) {
          delete updatedErrors[fieldName];
        }
        return updatedErrors;
      });
    }




  };


  const handleKeyDown = (event, table, fieldName, index) => {
    if (event.key === 'Enter') {
      handlePaymentDateChange(new Date(), table, fieldName, index);
    }
  };



  const handlePaymentDateChange = (date, table, fieldName, index) => {

    if (table === 'sb') {
      setShippingBillDetail(prevEntry => ({
        ...prevEntry,
        [fieldName]: date,
      }));

      setSbErrors(prevErrors => {
        const updatedErrors = { ...prevErrors };
        if (updatedErrors[fieldName]) {
          delete updatedErrors[fieldName];
        }
        return updatedErrors;
      });
    }


    if (table === 'gateInJo') {
      setGateInJo(prevState => {
        const updatedTransDtl = [...prevState];
        updatedTransDtl[index] = {
          ...updatedTransDtl[index],
          [fieldName]: date
        };
        return updatedTransDtl;
      });

      // Clear the validation error for the specified field
      setGateInJoErrors(prevErrors => {
        const updatedErrors = [...prevErrors];
        if (updatedErrors[index]) {
          delete updatedErrors[index][fieldName];  // Corrected deletion syntax
        }
        return updatedErrors;
      });

    }


    if (table === 'gateInJoDtl') {
      setGateInJoDetailDTO(prevState => {
        const updatedTransDtl = [...prevState];
        updatedTransDtl[index] = {
          ...updatedTransDtl[index],
          [fieldName]: date
        };
        return updatedTransDtl;
      });

      // Clear the validation error for the specified field
      setGateInJoDetailErrors(prevErrors => {
        const updatedErrors = [...prevErrors];
        if (updatedErrors[index]) {
          delete updatedErrors[index][fieldName];  // Corrected deletion syntax
        }
        return updatedErrors;
      });

    }
    if (table === 'cartingTally') {
      setCartingTallyDTO(prevState => {
        const updatedTransDtl = [...prevState];
        updatedTransDtl[index] = {
          ...updatedTransDtl[index],
          [fieldName]: date
        };
        return updatedTransDtl;
      });

      // Clear the validation error for the specified field
      setCartingTallyErrors(prevErrors => {
        const updatedErrors = [...prevErrors];
        if (updatedErrors[index]) {
          delete updatedErrors[index][fieldName];  // Corrected deletion syntax
        }
        return updatedErrors;
      });

    }

    if (table === 'containerGateIn') {
      setContainerGateIn(prevEntry => ({
        ...prevEntry,
        [fieldName]: date,
      }));

      setContainerGateInErrors(prevErrors => {
        const updatedErrors = { ...prevErrors };
        if (updatedErrors[fieldName]) {
          delete updatedErrors[fieldName];
        }
        return updatedErrors;
      });
    }
    if (table === 'stuffTally') {
      setSTuffTally(prevState => {
        const updatedTransDtl = [...prevState];
        updatedTransDtl[index] = {
          ...updatedTransDtl[index],
          [fieldName]: date
        };
        return updatedTransDtl;
      });

      // Clear the validation error for the specified field
      setStuffTallyErrors(prevErrors => {
        const updatedErrors = [...prevErrors];
        if (updatedErrors[index]) {
          delete updatedErrors[index][fieldName];  // Corrected deletion syntax
        }
        return updatedErrors;
      });

    }

    if (table === 'containerGateOut') {
      setContainerGateOut(prevEntry => ({
        ...prevEntry,
        [fieldName]: date,
      }));

      setContainerGateOutErrors(prevErrors => {
        const updatedErrors = { ...prevErrors };
        if (updatedErrors[fieldName]) {
          delete updatedErrors[fieldName];
        }
        return updatedErrors;
      });
    }


    if (table === 'backToTown') {
      setBackToTownData(prevState => {
        const updatedTransDtl = [...prevState];
        updatedTransDtl[index] = {
          ...updatedTransDtl[index],
          [fieldName]: date
        };
        return updatedTransDtl;
      });

      // Clear the validation error for the specified field
      setBackToTownErrors(prevErrors => {
        const updatedErrors = [...prevErrors];
        if (updatedErrors[index]) {
          delete updatedErrors[index][fieldName];  // Corrected deletion syntax
        }
        return updatedErrors;
      });

    }



    if (table === 'backToTownOut') {
      setBackToTownOutData(prevState => {
        const updatedTransDtl = [...prevState];
        updatedTransDtl[index] = {
          ...updatedTransDtl[index],
          [fieldName]: date
        };
        return updatedTransDtl;
      });

      // Clear the validation error for the specified field
      setBackToTownOutErrors(prevErrors => {
        const updatedErrors = [...prevErrors];
        if (updatedErrors[index]) {
          delete updatedErrors[index][fieldName];  // Corrected deletion syntax
        }
        return updatedErrors;
      });

    }




  };



  const CustomInput = React.forwardRef(({ value, onClick, onKeyDown, className, onChange, id }, ref) => (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <input
        ref={ref}
        value={value}
        onClick={onClick}
        onKeyDown={onKeyDown}
        className={className}
        style={{ width: '100%' }}
        onChange={onChange}
        id={id}
      />
      <FontAwesomeIcon
        icon={faCalendarAlt}
        style={{
          position: 'absolute',
          right: '10px',
          color: '#6c757d',
        }}
      />
    </div>
  ));



  const searchExporter = async (searchValue, type) => {

    if (!searchValue) {
      return;
    }

    try {
      const response = await CFSService.searchExporter(companyid, branchId, searchValue, jwtToken, type);

      if (type === 'exp') {
        setExporterData(response.data);
        setExporterContainerGateInData(response.data);
      } else if (type === 'cha') {
        setChaData(response.data);
      }
      else if (type === 'agent') {
        setOnAccountData(response.data);
      } else if (type === 'sa') {
        setAgentData(response.data);
      } else if (type === 'sl') {
        setLineData(response.data);
      }
      else if (type === 'trans') {
        setTransporterContainerGateInData(response.data);
      }
    } catch (error) {
      toast.error('Oops something went wrong!', {
        position: 'top-center',
        autoClose: 700,
      });
    }
  };





  const searchValuesInputSearch = async (searchValue, type) => {
    if (!searchValue) {
      return;
    }
    try {
      const response = await MovementService.searchValuesInputSearch(companyid, branchId, searchValue, jwtToken, type);

      if (type === 'containerNo') {
        setContainerNoListGateIn(response.data);
      } if (type === 'gatePassNo') {
        setGatePassData(response.data);
      }
    } catch (error) {
      toast.error('Oops something went wrong!', {
        position: 'top-center',
        autoClose: 700,
      });
    }
  };









  const handleSelectChange = async (selectedOption, type) => {
    if (type === 'cha') {
      setSelectedCha(selectedOption);
      updateExportGateIn('newCHA', selectedOption ? selectedOption.value : '');
      updateExportGateIn('chaName', selectedOption ? selectedOption.value : '');
      updateValidationErrors('newCHA');
    }

    if (type === 'on') {
      setSelectedOnAccount(selectedOption);
      updateExportGateIn('newOnAcc', selectedOption ? selectedOption.value : '');
      updateExportGateIn('onAccountName', selectedOption ? selectedOption.label : '');
      updateValidationErrors('newOnAcc');
    }

    if (type === 'exp') {
      setSelectedExporter(selectedOption);
      updateExportGateIn('newExporterId', selectedOption ? selectedOption.partyId : '');
      updateExportGateIn('newExporter', selectedOption ? selectedOption.partyName : '');
      updateExportGateIn('newExporterAddress1', selectedOption ? selectedOption.address1?.substring(0, 250) : '');
      updateExportGateIn('newExporterAddress2', selectedOption ? selectedOption.address2?.substring(0, 100) : '');
      updateExportGateIn('newExporterAddress3', selectedOption ? selectedOption.address3?.substring(0, 100) : '');
      updateExportGateIn('newSrNo', selectedOption ? selectedOption.srNo : '');
      updateExportGateIn('newGstNo', selectedOption ? selectedOption.gstNo : '');
      updateExportGateIn('newState', selectedOption ? selectedOption.state : '');
      updateExportGateIn('newIecCode', selectedOption ? selectedOption.iecCode : '');

      updateValidationErrors('newExporterId');
    }


    if (type === 'gatePassNo') {
      setSelectedGatePassNo(selectedOption);

      updateContainerGateIn('newGatePassNo', selectedOption ? selectedOption.value : '', 'containerGateIn');
      updateValidationGateInErrors('newGatePassNo', 'containerGateIn');
    }
    if (type === 'containerNo') {
      setSelectedContainerNoGateIn(selectedOption);

      updateContainerGateIn('newContainerNo', selectedOption ? selectedOption.value : '', 'containerGateIn');
      updateContainerGateIn('newGateInId', selectedOption ? selectedOption.value : '', 'containerGateIn');

      updateValidationGateInErrors('newContainerNo', 'containerGateIn');
    }
    if (type === 'newTransporter') {
      setSelectedTransporterContainerGateIn(selectedOption);

      updateContainerGateIn('newTransporter', selectedOption ? selectedOption.value : '', 'containerGateIn');
      updateContainerGateIn('newTransporterName', selectedOption ? selectedOption.label : '', 'containerGateIn');

      updateValidationGateInErrors('newTransporter', 'containerGateIn');
    }

    if (type === 'sa') {
      setSelectedAgentContainerGateIn(selectedOption);

      updateContainerGateIn('newShippingAgent', selectedOption ? selectedOption.value : '', 'containerGateIn');
      updateContainerGateIn('shippingAgentName', selectedOption ? selectedOption.label : '', 'containerGateIn');

      updateValidationGateInErrors('newContainerNo', 'containerGateIn');
    }

    if (type === 'sl') {
      setSelectedLineContainerGateIn(selectedOption);

      updateContainerGateIn('newShippingLine', selectedOption ? selectedOption.value : '', 'containerGateIn');
      updateContainerGateIn('shippingLineName', selectedOption ? selectedOption.value : '', 'containerGateIn');

      updateValidationGateInErrors('newContainerNo', 'containerGateIn');
    }

    if (type === 'chaGateIn') {
      setSelectedChaContainerGateIn(selectedOption);
      updateContainerGateIn('newCHA', selectedOption ? selectedOption.value : '', 'containerGateIn');
      updateContainerGateIn('chaName', selectedOption ? selectedOption.label : '', 'containerGateIn');
      updateValidationGateInErrors('newCHA', 'containerGateIn');
    }


    if (type === 'expGateIn') {
      setSelectedExporterContainerGateIn(selectedOption);
      // updateContainerGateIn('newExporter', selectedOption ? selectedOption.value : '', 'containerGateIn');
      updateContainerGateIn('newExporter', selectedOption ? selectedOption.label : '', 'containerGateIn');
      updateValidationGateInErrors('newExporter', 'containerGateIn');
    }

    if (type === 'newTransporterOut') {
      setSelectedTransporterContainerGateOut(selectedOption);

      updateContainerGateIn('newTransporter', selectedOption ? selectedOption.value : '', 'containerGateOut');
      updateContainerGateIn('newTransporterName', selectedOption ? selectedOption.label : '', 'containerGateOut');

      updateValidationGateInErrors('newTransporterName', 'containerGateOut');
    }

  }

  const updateExportGateIn = (field, value) => {
    setShippingBillDetail((prevExportSbEntry) => ({
      ...prevExportSbEntry,
      [field]: value,
    }));
  };

  const updateValidationErrors = (field) => {
    setSbErrors((prevErrors) => ({
      ...prevErrors,
      [field]: '',
    }));
  };


  const updateContainerGateIn = (field, value, table) => {
    if (table === 'containerGateIn') {
      setContainerGateIn((prevExportSbEntry) => ({
        ...prevExportSbEntry,
        [field]: value,
      }));
    }


    if (table === 'containerGateOut') {
      setContainerGateOut((prevExportSbEntry) => ({
        ...prevExportSbEntry,
        [field]: value,
      }));
    }

  };

  const updateValidationGateInErrors = (field, table) => {

    if (table === 'containerGateIn') {
      setContainerGateInErrors((prevErrors) => ({
        ...prevErrors,
        [field]: '',
      }));
    }

    if (table === 'containerGateOut') {
      setContainerGateOutErrors((prevErrors) => ({
        ...prevErrors,
        [field]: '',
      }));
    }
  };





  const CustomOption = (props) => {
    return (
      <components.Option {...props}>
        <span style={{ fontWeight: 'bold' }}>{props.data.partyName}</span>
        {" - " + props.data.address1 + " " + props.data.address2 + " " + props.data.address3}
      </components.Option>
    );
  };



  const CustomOptionYard = (props) => {
    return (
      <components.Option {...props}>
        <span style={{ fontWeight: 'bold' }}>{props.data.yardLocationId}</span>
        {" - " + props.data.blockId + " " + props.data.cellNoRow}
      </components.Option>
    );
  };




  const searchVoyageAndVia = async (searchValue) => {
    if (!searchValue) {
      setVesselData([]);
      return;
    }
    try {
      const response = await CFSService.searchVessel(companyid, branchId, searchValue, jwtToken);
      const data = response.data;
      setVesselData(data);
    } catch (error) {
      setVesselData([]);
      console.error('Error searching vessel:', error);
    }
  };


  console.log(' stuffTally \n', stuffTally, ' \n ');


  const searchYardLocations = async (searchvalue) => {
    if (!searchvalue) {
      return;
    }
    try {
      const response = await CFSService.searchYardCells(companyid, branchId, searchvalue, jwtToken);
      setYardLocations(response.data);
    } catch (error) {
      console.error("Error fetching Yard entries:", error);
    }
  };

  const handleYardLocationMainSelect = async (selectedOption, index, table, fieldName) => {

    if (table === 'cartingTally') {
      setSelectedYardLocationMain(prevState => {
        const updatedState = [...prevState];
        updatedState[index] = selectedOption
          ? {
            value: selectedOption.yardLocationId,
            label: selectedOption.yardLocationId + '-' + selectedOption.blockId + '-' + selectedOption.cellNoRow
          }
          : null;
        return updatedState;
      });

      const updates = selectedOption
        ? {
          newYardLocation: selectedOption.yardLocationId,
          newBlock: selectedOption.blockId,
          newCell: selectedOption.cellNoRow,
          cellArea: selectedOption.cellArea
        }
        : {
          newYardLocation: '',
          newBlock: '',
          newCell: '',
          cellArea: ''
        };

      // Update exportMovement at the specified index
      setCartingTallyDTO(prevState => {
        return prevState.map((item, idx) => {
          if (idx === index) {
            return { ...item, ...updates }; // Update the specific index
          }
          return item; // Return other items unchanged
        });
      });

      // Update validationErrors state for the specific index
      setCartingTallyErrors(prevErrors => {
        return prevErrors.map((error, idx) => {
          if (idx === index) {
            const updatedError = { ...error }; // Copy the error object
            // Remove specific field errors
            delete updatedError.newYardLocation;
            return updatedError; // Return the updated error object
          }
          return error; // Return other errors unchanged
        });
      });
    }



    if (table === 'stuffTally') {
      let updates = {};
      if (fieldName === 'newvcnNo' || fieldName === 'newvoyageNo') {
        setSelectedViaNo(prevState => {
          const updatedState = [...prevState];
          updatedState[index] = selectedOption ? { value: selectedOption.viaNo, label: selectedOption.viaNo } : null;
          return updatedState;
        });

        setSelectedVoyageNo(prevState => {
          const updatedState = [...prevState];
          updatedState[index] = selectedOption ? { value: selectedOption.voyageNo, label: selectedOption.voyageNo } : null;
          return updatedState;
        });

        updates = selectedOption
          ? {
            newVesselId: selectedOption.value,
            newvoyageNo: selectedOption.voyageNo,
            newvcnNo: selectedOption.viaNo,
            newVesselName: selectedOption.vesselName,
            newRotataionNo: selectedOption.rotationNo
          }
          : { newVesselId: '', newvoyageNo: '', newvcnNo: '', newvcnNo: '', newRotataionNo: '' };


        setStuffTallyErrors(prevErrors => {
          return prevErrors.map((error, idx) => {
            if (idx === index) {
              const updatedError = { ...error };
              // Remove specific field errors
              delete updatedError.newVesselId;
              delete updatedError.newvoyageNo;
              delete updatedError.newvcnNo;
              return updatedError;
            }
            return error; // Return other errors unchanged
          });
        });


      }

      setSTuffTally(prevState => {
        return prevState.map((item, idx) => {
          if (idx === index) {
            return { ...item, ...updates };
          }
          return item;
        });
      });

      // Update validationErrors state for the specific index
      setStuffTallyErrors(prevErrors => {
        return prevErrors.map((error, idx) => {
          if (idx === index) {
            const updatedError = { ...error }; // Copy the error object
            // Remove specific field errors
            delete updatedError[fieldName];
            return updatedError;
          }
          return error; // Return other errors unchanged
        });
      });






    }


  };











  const searchPortData = async (searchValue, fieldName) => {
    if (!searchValue) {
      setPodData([]);
      setPolData([])
      return;
    }
    try {
      const response = await MovementService.searchPortsData(companyid, branchId, searchValue, jwtToken);
      fieldName === 'pod' ? setPodData(response.data) : setPolData(response.data);

      // console.log('port Data: ', response.data);
    } catch (error) {
      setPodData([]);
      setPolData([])
      console.error('Error searching vessel:', error);
    }
  };




  const handlePodSelect = async (selectedOption, fieldName, index) => {
    // Update selected values for viaNo and voyageNo index-wise

    if (fieldName === 'newPod') {
      setSelectedPod(prevState => {
        const updatedState = [...prevState];
        updatedState[index] = selectedOption;
        return updatedState;
      });
    }
    else if (fieldName === 'newPol') {
      setSelectedPol(prevState => {
        const updatedState = [...prevState];
        updatedState[index] = selectedOption;
        return updatedState;
      });
    }
    else if (fieldName === 'newFinalPod') {
      setSelectedFinalPod(prevState => {
        const updatedState = [...prevState];
        updatedState[index] = selectedOption;
        return updatedState;
      });
    }
    let updates = {};
    // Prepare updates based on selected option
    if (fieldName === 'newPod') {
      updates = selectedOption
        ? {
          newPod: selectedOption.label,
          newPodDesc: selectedOption.label,
        }
        : { newPod: '', newPodDesc: '' };
    } else if (fieldName === 'newPol') {
      updates = selectedOption
        ? {
          newPol: selectedOption.label,
          newPolDesc: selectedOption.label,
        }
        : { newPol: '', newPolDesc: '' };
    } else if (fieldName === 'newFinalPod') {
      updates = selectedOption
        ? {
          newFinalPod: selectedOption.label,
          newFinalPodDesc: selectedOption.label,
        }
        : { newFinalPod: '', newFinalPodDesc: '' };
    }

    // Update exportMovement at the specified index
    setSTuffTally(prevState => {
      return prevState.map((item, idx) => {
        if (idx === index) {
          return { ...item, ...updates }; // Update the specific index
        }
        return item; // Return other items unchanged
      });
    });

    // Update validationErrors state for the specific index
    setStuffTallyErrors(prevErrors => {
      return prevErrors.map((error, idx) => {
        if (idx === index) {
          const updatedError = { ...error }; // Copy the error object
          // Remove specific field errors
          delete updatedError[fieldName];
          return updatedError; // Return the updated error object
        }
        return error; // Return other errors unchanged
      });
    });
  };



  const handleCreationSelectPod = async (inputValue, fieldName, index) => {
    const updates = { [fieldName]: inputValue };

    if (fieldName === 'newPod') {
      setSelectedPod(prevState => {
        const updatedState = [...prevState];
        updatedState[index] = { value: inputValue, label: inputValue };
        return updatedState;
      });
    } else if (fieldName === 'newPol') {
      setSelectedPol(prevState => {
        const updatedState = [...prevState];
        updatedState[index] = { value: inputValue, label: inputValue };
        return updatedState;
      });
    }
    else if (fieldName === 'newFinalPod') {
      selectedFinalPod(prevState => {
        const updatedState = [...prevState];
        updatedState[index] = { value: inputValue, label: inputValue };
        return updatedState;
      });
    }


    // Update exportMovement at the specified index
    setSTuffTally(prevState =>
      prevState.map((item, idx) => {
        if (idx === index) {
          return { ...item, ...updates }; // Update only the specified index
        }
        return item; // Leave other items unchanged
      })
    );

    // Update validationErrors state for the specified index
    setStuffTallyErrors(prevErrors =>
      prevErrors.map((error, idx) => {
        if (idx === index) {
          const updatedError = { ...error };
          delete updatedError[fieldName]; // Remove validation error for the specific field
          return updatedError; // Return the updated error
        }
        return error; // Leave other errors unchanged
      })
    );
  };













  const validateSbFirstTable = (exportSbEntry) => {
    const {
      auditremarks, newSbNo, newSbDate, newNoOfPackages, newGrossWeight,
      newPackagesType, newCargoType, newFOB, newConsigneeName, newCommodityId,
      newCHA, newOnAcc, newSbType, newExporterId
    } = exportSbEntry;

    let error = {};

    if (!auditremarks) error.auditremarks = 'Audit remarks are required.';
    if (!newSbNo) error.newSbNo = 'SB Number is required.';
    if (!newSbDate) error.newSbDate = 'SB Date is required.';
    if (!newNoOfPackages || newNoOfPackages <= 0) error.newNoOfPackages = 'Number of packages must be greater than 0.';
    if (!newGrossWeight || newGrossWeight <= 0) error.newGrossWeight = 'Gross weight must be greater than 0.';
    if (!newPackagesType) error.newPackagesType = 'Package type is required.';
    if (!newCargoType) error.newCargoType = 'Cargo type is required.';
    if (!newFOB || newFOB <= 0) error.newFOB = 'FOB must be greater than 0.';
    if (!newConsigneeName) error.newConsigneeName = 'Consignee name is required.';
    if (!newCommodityId) error.newCommodityId = 'Commodity ID is required.';
    if (!newCHA) error.newCHA = 'CHA is required.';
    if (!newOnAcc) error.newOnAcc = 'On Account field is required.';
    if (!newSbType) error.newSbType = 'SB Type is required.';
    if (!newExporterId) error.newExporterId = 'Exporter ID is required.';

    setSbErrors(error);

    return Object.keys(error).length === 0;
  };


  const validateGateInJO = (gateInJo) => {
    let errors = [];

    gateInJo.forEach((detail, index) => {
      const { newVehicleNo, newGateInDate, newCartingTransDate, auditremarks } = detail;
      let error = {};
      if (!newVehicleNo) error.newVehicleNo = 'newVehicleNo is required.';
      if (!newGateInDate) error.newGateInDate = 'newGateInDate No is required.';
      if (!newCartingTransDate) error.newCartingTransDate = 'newCartingTransDate is required.';
      if (!auditremarks) error.auditremarks = 'Audit remarks are required.';
      errors.push(error);
    });
    setGateInJoErrors(errors);
    // Check if there are any errors
    return errors.every(error => Object.keys(error).length === 0);
  };

  const validateGateInJODtl = (gateInJoDetailDTO) => {
    let errors = [];
    let totalCartedpPkg = 0;
    let totalCartedWt = 0;

    gateInJoDetailDTO.forEach((detail, index) => {
      const {
        newCartedpPkg,
        newCartedWt,
        sbNo,
        auditremarks
      } = detail;

      let error = {};

      if (!sbNo) error.sbNo = 'sbNo is required.';

      if (!auditremarks) error.auditremarks = 'Audit remarks are required.';
      if (!newCartedpPkg || newCartedpPkg <= 0) error.newCartedpPkg = 'CartedPackages must be greater than 0.';
      if (!newCartedWt || newCartedWt <= 0) error.newCartedWt = 'Carted Weight must be greater than 0.';
      if (!sbNo) error.sbNo = 'sbNo is required.';


      // Convert values to numbers for proper comparison
      const cartedPkg = Number(newCartedpPkg) || 0;
      const cartedWt = Number(newCartedWt) || 0;

      // Accumulate total values
      totalCartedpPkg += cartedPkg;
      totalCartedWt += cartedWt;

      errors.push(error);
    });

    // Global validation after summing up all values
    let globalError = {};
    if (totalCartedpPkg > Number(gateInJoDetailDTO[0]?.noOfPackages || 0)) {
      let errorMessageNew = `Total carted packages (<strong>${totalCartedpPkg}</strong>) cannot exceed total available packages (<strong>${gateInJoDetailDTO[0]?.noOfPackages}</strong>).`;
      const contentWidth = errorMessageNew.length * 6;

      globalError.totalCartedpPkg = `Total carted packages (<strong>${totalCartedpPkg}</strong>) cannot exceed total available packages (<strong>${gateInJoDetailDTO[0]?.noOfPackages}</strong>).`;
      toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessageNew }} />, {
        position: 'top-center',
        autoClose: 3000,
        style: { width: `${contentWidth}px` },
      });
    }
    if (totalCartedWt > Number(gateInJoDetailDTO[0]?.grossWeight || 0)) {
      let errorMessageNew = `Total carted weight (<strong>${totalCartedWt}</strong>) cannot exceed total available weight (<strong>${gateInJoDetailDTO[0]?.grossWeight}</strong>).`;

      globalError.totalCartedWt = `Total carted weight (<strong>${totalCartedWt}</strong>) cannot exceed total available weight (<strong>${gateInJoDetailDTO[0]?.grossWeight}</strong>).`;

      const contentWidth = errorMessageNew.length * 6;
      toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessageNew }} />, {
        position: 'top-center',
        autoClose: 3000,
        style: { width: `${contentWidth}px` },
      });
    }
    if (Object.keys(globalError).length > 0) {
      errors.push(globalError);
    }

    setGateInJoDetailErrors(errors);
    // Check if there are any errors
    return errors.every(error => Object.keys(error).length === 0);
  };


  const validateCartingTally = (cartingTallyDTO) => {

    let errors = [];

    cartingTallyDTO.forEach((detail, index) => {
      const { newCellAreaAllocated, newYardLocation, cellArea, oldCellAreaAllocated, sbNo, auditremarks } = detail;

      let error = {};

      // Convert values to numbers for proper comparison
      const allocatedArea = Number(newCellAreaAllocated) || 0;
      const availableArea = (Number(cellArea) || 0) + (Number(oldCellAreaAllocated) || 0);
      if (!newYardLocation) error.newYardLocation = 'newYardLocation is required.';

      if (!sbNo) error.sbNo = 'sbNo is required.';
      if (!auditremarks) error.auditremarks = 'Audit remarks are required.';
      // Validation checks
      if (allocatedArea <= 0) {
        error.newCellAreaAllocated = 'Area allocated must be greater than 0.';
      } else if (allocatedArea > availableArea) {

        let errorMessageNew = `Area allocated (<strong>${allocatedArea}</strong>) cannot exceed the total available area (${availableArea}).`;
        error.newCellAreaAllocated = `Area allocated (<strong>${allocatedArea}</strong>) cannot exceed the total available area (${availableArea}).`;
        const contentWidth = errorMessageNew.length * 6;
        toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessageNew }} />, {
          position: 'top-center',
          autoClose: 3000,
          style: { width: `${contentWidth}px` },
        });
      }


      errors.push(error);
    });

    setCartingTallyErrors(errors);
    return errors.every(error => Object.keys(error).length === 0);
  };


  const validateGateInFifthTable = (exportSbEntry) => {
    const {
      auditremarks, newContainerNo, newGateInDate, newTareWeight, newGrossWeight,
      newTruckNo, newMovementBy, newContainerType, newContainerSize
    } = exportSbEntry;

    let error = {};

    if (!auditremarks) error.auditremarks = 'Audit remarks are required.';
    if (!newContainerNo) error.newContainerNo = 'newContainerNo is required.';
    if (!newGateInDate) error.newGateInDate = 'newGateInDate is required.';
    if (!newTareWeight || newTareWeight <= 0) error.newTareWeight = 'Number of packages must be greater than 0.';
    if (!newGrossWeight || newGrossWeight <= 0) error.newGrossWeight = 'Gross weight must be greater than 0.';
    if (!newTruckNo) error.newTruckNo = 'newTruckNo is required.';
    if (!newMovementBy) error.newMovementBy = 'newMovementBy is required.';
    if (!newContainerSize) error.newContainerSize = 'newContainerSize is required.';
    if (!newContainerType) error.newContainerType = 'newContainerType is required.';





    setContainerGateInErrors(error);

    return Object.keys(error).length === 0;
  };




  const validateGateOutSeventhTable = (exportSbEntry) => {
    const {
      auditremarks, containerNo, newGatePassDate, newTruckNo, newGrossWeight, newGateOutDate
    } = exportSbEntry;

    let error = {};

    if (!auditremarks) error.auditremarks = 'Audit remarks are required.';
    if (!containerNo) error.containerNo = 'containerNo is required.';
    if (!newGatePassDate) error.newGatePassDate = 'newGatePassDate is required.';
    if (!newTruckNo) error.newTruckNo = 'newTruckNo is required.';
    if (!newGateOutDate) error.newGateOutDate = 'newGateOutDate is required.';


    setContainerGateOutErrors(error);

    return Object.keys(error).length === 0;
  };




  const validateStuffEightTableTally = (cartingTallyDTO) => {

    let errors = [];

    cartingTallyDTO.forEach((detail, index) => {
      const { newContainerNo, newContainerSize, newContainerType, newStuffDate, newvoyageNo, newvcnNo,
        newVesselId, newPod, newFinalPod, newTareWeight, newPol, newMovementRqDate, newStuffQty, newStuffQtyWeight, auditremarks, sbStuffedQty, sbGrossWeight, oldStuffQty
      } = detail;

      let error = {};



      let maxLimit = Number(sbStuffedQty) + Number(oldStuffQty);

      if (Number(newStuffQty || 0) > maxLimit) {
        let errorMessageNew = `Stuff packages (<strong>${newStuffQty}</strong>) cannot exceed total available packages (<strong>${maxLimit}</strong>).`;
        const contentWidth = errorMessageNew.length * 6;

        error.newStuffQty = `Stuff packages (<strong>${newStuffQty}</strong>) cannot exceed total available packages (<strong>${maxLimit}</strong>).`;
        toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessageNew }} />, {
          position: 'top-center',
          autoClose: 3000,
          style: { width: `${contentWidth}px` },
        });
      }
      if (Number(newStuffQtyWeight || 0) > Number(sbGrossWeight)) {
        let errorMessageNew = `Stuff Weight (<strong>${newStuffQtyWeight}</strong>) cannot exceed total available Weight (<strong>${sbGrossWeight}</strong>).`;
        const contentWidth = errorMessageNew.length * 6;

        error.newStuffQtyWeight = `Stuff packages (<strong>${newStuffQtyWeight}</strong>) cannot exceed total available Weight (<strong>${sbGrossWeight}</strong>).`;
        toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessageNew }} />, {
          position: 'top-center',
          autoClose: 3000,
          style: { width: `${contentWidth}px` },
        });
      }


      if (!newStuffQty || newStuffQty <= 0) error.newStuffQty = 'Number of packages must be greater than 0.';
      if (!newStuffQtyWeight || newStuffQtyWeight <= 0) error.newStuffQtyWeight = 'Number of packages must be greater than 0.';

      if (!newContainerNo) error.newContainerNo = 'newContainerNo is required.';

      if (!newContainerSize) error.newContainerSize = 'newContainerSize is required.';
      if (!auditremarks) error.auditremarks = 'Audit remarks are required.';

      if (!newContainerType) error.newContainerType = 'newContainerType is required.';

      if (!newStuffDate) error.newStuffDate = 'newStuffDate is required.';
      if (!newVesselId) error.newVesselId = 'newVesselId are required.';

      if (!newvcnNo) error.newvcnNo = 'newvcnNo is required.';

      if (!newvoyageNo) error.newvoyageNo = 'newvoyageNo is required.';
      if (!newPod) error.newPod = 'newPod are required.';


      if (!newFinalPod) error.newFinalPod = 'newFinalPod is required.';
      if (!newPol) error.newPol = 'newPol are required.';

      if (!newTareWeight || newTareWeight <= 0) error.newTareWeight = 'Number of packages must be greater than 0.';

      if (!newMovementRqDate) error.newMovementRqDate = 'newMovementRqDate is required.';
      if (!newPod) error.newPod = 'newPod are required.';
      errors.push(error);
    });

    setStuffTallyErrors(errors);
    return errors.every(error => Object.keys(error).length === 0);
  };



  const validateBackToTown = (gateInJoDetailDTO) => {
    let errors = [];

    gateInJoDetailDTO.forEach((detail, index) => {
      const {
        backToTownTransId,
        sbNo,
        auditremarks,
        newBackToTownPackages,
        newBackToTownWeight,
        actualNoOfPackages,
        grossWeight
      } = detail;

      let error = {};

      if (!sbNo) error.sbNo = 'sbNo is required.';

      if (!auditremarks) error.auditremarks = 'Audit remarks are required.';
      if (!backToTownTransId) error.backToTownTransId = 'backToTownTransId is required.';
      if (!newBackToTownPackages || newBackToTownPackages <= 0) error.newBackToTownPackages = 'Carted Weight must be greater than 0.';
      if (!sbNo) error.sbNo = 'sbNo is required.';
      if (!newBackToTownWeight || newBackToTownWeight <= 0) error.newBackToTownWeight = 'Carted Weight must be greater than 0.';

      if (Number(newBackToTownPackages) > Number(actualNoOfPackages)) {
        let errorMessageNew = `Work Order packages (<strong>${newBackToTownPackages}</strong>) cannot exceed total available packages (<strong>${actualNoOfPackages}</strong>).`;
        const contentWidth = errorMessageNew.length * 6;

        error.newBackToTownPackages = `Work Order packages (<strong>${newBackToTownPackages}</strong>) cannot exceed total available packages (<strong>${actualNoOfPackages}</strong>).`;
        toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessageNew }} />, {
          position: 'top-center',
          autoClose: 3000,
          style: { width: `${contentWidth}px` },
        });
      }



      if (Number(newBackToTownWeight) > Number(grossWeight)) {
        let errorMessageNew = `workOrder Weight (<strong>${newBackToTownWeight}</strong>) cannot exceed total available Weight (<strong>${grossWeight}</strong>).`;
        const contentWidth = errorMessageNew.length * 6;

        error.newBackToTownWeight = `workOrder Weight (<strong>${newBackToTownWeight}</strong>) cannot exceed total available Weight (<strong>${grossWeight}</strong>).`;
        toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessageNew }} />, {
          position: 'top-center',
          autoClose: 3000,
          style: { width: `${contentWidth}px` },
        });
      }

      errors.push(error);
    });

    setBackToTownErrors(errors);
    // Check if there are any errors
    return errors.every(error => Object.keys(error).length === 0);
  };



  const validateBackToTownOut = (gateInJoDetailDTO) => {
    let errors = [];


    gateInJoDetailDTO.forEach((detail, index) => {
      const {
        newBackToTownPackages,
        sbNo,
        newQtyTakenOut,
        gateOutId,
        auditremarks,
        newTruckNo
      } = detail;

      let error = {};

      if (!auditremarks) error.auditremarks = 'Audit remarks are required.';
      if (!newQtyTakenOut || newQtyTakenOut <= 0) error.newQtyTakenOut = 'Carted Weight must be greater than 0.';
      if (!sbNo) error.sbNo = 'sbNo is required.';
      if (!gateOutId) error.gateOutId = 'gateOutId is required.';
      if (!newTruckNo) error.newTruckNo = 'newTruckNo is required.';

      if (Number(newQtyTakenOut) > Number(newBackToTownPackages)) {
        let errorMessageNew = `Out packages (<strong>${newQtyTakenOut}</strong>) cannot exceed total available packages (<strong>${newBackToTownPackages}</strong>).`;
        const contentWidth = errorMessageNew.length * 6;

        error.newQtyTakenOut = `Out packages (<strong>${newQtyTakenOut}</strong>) cannot exceed total available packages (<strong>${newBackToTownPackages}</strong>).`;
        toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessageNew }} />, {
          position: 'top-center',
          autoClose: 3000,
          style: { width: `${contentWidth}px` },
        });
      }
      errors.push(error);
    });

    setBackToTownOutErrors(errors);
    // Check if there are any errors
    return errors.every(error => Object.keys(error).length === 0);
  };




  const handleSave = async (type) => {
    setLoading(true);
    let requestData;
    if (type === 'sb') {
      requestData = {
        shippingBillDetail: shippingBillDetail
      }

      if (!validateSbFirstTable(shippingBillDetail)) {
        toast.error("Enter Required Fields", {
          position: 'top-center',
          autoClose: 1000,
        });
        setLoading(false);
        return false;
      }
    } else if (type === 'gateInJO') {
      requestData = {
        gateInJO: gateInJo
      }
      if (!validateGateInJO(gateInJo)) {
        toast.error("Enter Required Fields", {
          position: 'top-center',
          autoClose: 1000,
        });
        setLoading(false);
        return false;
      }
    } else if (type === 'gateInJoDtl') {
      requestData = {
        gateInJoDetail: gateInJoDetailDTO
      }

      if (!validateGateInJODtl(gateInJoDetailDTO)) {
        toast.error("Enter Required Fields", {
          position: 'top-center',
          autoClose: 1000,
        });
        setLoading(false);
        return false;
      }


    } else if (type === 'cartingTally') {

      console.log('type   === cartingTally');

      requestData = {
        cartigTally: cartingTallyDTO
      }


      if (!validateCartingTally(cartingTallyDTO)) {
        toast.error("Enter Required Fields", {
          position: 'top-center',
          autoClose: 1000,
        });
        setLoading(false);
        return false;
      }
    } else if (type === 'containerGateIn') {
      requestData = {
        containerGateIn: containerGateIn
      }

      if (!validateGateInFifthTable(containerGateIn)) {
        toast.error("Enter Required Fields", {
          position: 'top-center',
          autoClose: 1000,
        });
        setLoading(false);
        return false;
      }
    } else if (type === 'containerGateOut') {
      requestData = {
        containerGateOut: containerGateOut
      }

      if (!validateGateOutSeventhTable(containerGateOut)) {
        toast.error("Enter Required Fields", {
          position: 'top-center',
          autoClose: 1000,
        });
        setLoading(false);
        return false;
      }
    } else if (type === 'stuffTally') {
      requestData = {
        stuffTally: stuffTally
      }

      if (!validateStuffEightTableTally(stuffTally)) {
        toast.error("Enter Required Fields", {
          position: 'top-center',
          autoClose: 1000,
        });
        setLoading(false);
        return false;
      }
    } else if (type === 'backToTown') {
      requestData = {
        backToTown: backToTownData
      }

      if (!validateBackToTown(backToTownData)) {
        toast.error("Enter Required Fields", {
          position: 'top-center',
          autoClose: 1000,
        });
        setLoading(false);
        return false;
      }
    } else if (type === 'backToTownOut') {
      requestData = {
        backToTownOut: backToTownOutData
      }

      if (!validateBackToTownOut(backToTownOutData)) {
        toast.error("Enter Required Fields", {
          position: 'top-center',
          autoClose: 1000,
        });
        setLoading(false);
        return false;
      }
    }

    setLoading(true);
    try {
      const response = await MovementService.addExportAudit(companyid, branchId, requestData, jwtToken, type, userId, searchMain.sbNo, searchMain.containerNo);
      console.log('response.data ********** \n', response.data);
      const { search, messege, searchValues } = response.data;
      if (messege === 'Record updated succesfully') {
        toast.success(messege, {
          position: 'top-center',
          autoClose: 1000,
        });
      } else {
        toast.warning(messege, {
          position: 'top-center',
          autoClose: 1000,
        });
      }
      setSearchMain((prevCriteria) => ({
        ...prevCriteria,
        sbNo: searchValues?.sbNo ?? prevCriteria.sbNo,
        containerNo: searchValues?.containerNo ?? prevCriteria.containerNo,
      }));


      assignsearchValues(search);
    } catch (error) {

      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data;

        const match = errorMessage.match(/SrNo: (\d+) and SB No: (\d+)/);
        if (match) {

          const srNo = parseInt(match[1], 10);
          const sbNo = match[2];

          const errorMessageNew = `Duplicate SB No found : <strong>${sbNo}</strong>`;
          const contentWidth = errorMessageNew.length * 6;

          toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessageNew }} />, {
            position: 'top-center',
            autoClose: 3000,
            style: { width: `${contentWidth}px` },
          });


        }
        else {
          toast.error(errorMessage, {
            position: 'top-center',
            autoClose: 3000,
          });
        }

        return { success: false, cargoEntries: null };
      }

      toast.error('Oops something went wrong!', {
        position: 'top-center',
        autoClose: 700,
      });

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
        <div>
          <Row>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel" htmlFor="sbNo">
                  SB No
                </label>
                <input
                  placeholder="Enter SB No"
                  className="form-control"
                  id="sbNo"
                  maxLength={20}
                  value={searchMain.sbNo}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label className="inputHeader" htmlFor="containerNo">
                  Container No
                </label>
                <input
                  placeholder="Enter Container No"
                  className="form-control"
                  id="containerNo"
                  maxLength={20}
                  value={searchMain.containerNo}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>

            <Col md={3} style={{ marginTop: 24 }}>
              <button
                className="btn btn-outline-success btn-margin newButton"
                id="submitbtn2"
                style={{ fontSize: 12, marginRight: 5 }}
                onClick={() => searchExportAudit(searchMain)}
              >
                <FontAwesomeIcon icon={faSearch} style={{ marginRight: '1px' }} />
                Search
              </button>
              <button
                className="btn btn-outline-danger btn-margin newButton"
                style={{ fontSize: 12 }}
                id="submitbtn2"
                onClick={reset}
              >
                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '1px' }} />
                Reset
              </button>
            </Col>
          </Row>

        </div>
        <hr />
        <div>




        {shippingBillDetail && Object.keys(shippingBillDetail)?.length > 0 && (
            <div>
              <h6
                className="pageHead"
                style={{
                  fontFamily: "Your-Heading-Font",
                  paddingLeft: "2%",
                  paddingRight: "-20px",
                }}
              >
                Shipping Bill Details
              </h6>

              <div className="table-responsive mt-1" style={{ maxHeight: "400px", overflowY: "auto" }}>
                <Table className="table table-bordered tariffTableAudit" style={{ border: '2px solid black' }}>
                  <thead>
                    <tr>
                      <th scope="col" className="text-center" style={{ color: "black" }}>SB No</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>SB Date</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>No Of Pkgs</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Wt</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Package Type</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Exporter</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>SB Type</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>FOB</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Cargo Description</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Marks No</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Consignee Name</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>CHA</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Agent</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td>

                        <Input
                          type="text"
                          name='newSbNo'
                          value={shippingBillDetail.newSbNo}
                          onChange={(e) => handleFieldChange(e, 0, 'sb', 'newSbNo', 'number')}
                          maxLength={10}
                          className={`inputwidthTuka form-control ${sbErrors?.newSbNo ? 'error-border' : ''}`}
                        />


                      </td>
                      <td>



                        <DatePicker
                          selected={shippingBillDetail.newSbDate}
                          onChange={(date) => handlePaymentDateChange(date, 'sb', 'newSbDate')}
                          id="newSbDate"
                          name="newSbDate"
                          placeholderText="Enter SB Date"
                          dateFormat="dd/MM/yyyy"
                          customInput={
                            <CustomInput
                              className={`inputwidthTuka form-control ${sbErrors.newSbDate ? 'error-border' : ''}`}
                              onKeyDown={(event) => handleKeyDown(event, 'sb', 'newSbDate')}
                              onChange={(date) => handlePaymentDateChange(date, 'sb', 'newSbDate')}
                            />
                          } />


                      </td>
                      <td>

                        <Input
                          type="text"
                          name='newNoOfPackages'
                          value={shippingBillDetail.newNoOfPackages}
                          onChange={(e) => handleFieldChange(e, 0, 'sb', 'newNoOfPackages', 'number')}
                          maxLength={7}
                          className={`inputwidthTukaMin form-control ${sbErrors?.newNoOfPackages ? 'error-border' : ''}`}
                        />


                      </td>
                      <td>

                        <Input
                          type="text"
                          name='newGrossWeight'
                          value={shippingBillDetail.newGrossWeight}
                          onChange={(e) => handleFieldChange(e, 0, 'sb', 'newGrossWeight', 'decimal', 12, 4)}
                          maxLength={17}
                          className={`inputwidthTuka form-control ${sbErrors?.newGrossWeight ? 'error-border' : ''}`}
                        />

                      </td>


                      <td>

                        <Input
                          type="select"
                          value={shippingBillDetail.newPackagesType}
                          className={`inputwidthTukaMax form-control ${sbErrors?.newPackagesType ? 'error-border' : ''}`}
                          onChange={(e) => handleFieldChange(e, 0, 'sb', 'newPackagesType')}
                        >
                          <option value="">Select package type</option>
                          {packagesTypes.map((type, idx) => (
                            <option key={idx} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </Input>

                      </td>

                      <td>

                        <Select
                          options={exporterData}
                          value={selectedExporter}
                          onInputChange={(inputValue, { action }) => {
                            if (action === 'input-change') {
                              searchExporter(inputValue, 'exp');
                            }
                          }}
                          onChange={(selectedOption) => handleSelectChange(selectedOption, 'exp')}
                          className={`inputwidthTukaMax ${sbErrors.newExporterId ? 'error-border' : ''}`}
                          placeholder="Select Exporter"
                          components={{ Option: CustomOption }}
                          isClearable
                          id="exporter"
                          menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                          menuPosition="fixed" // Sets the dropdown menu position to fixed    
                          menuPlacement="top"
                          styles={{
                            control: (provided, state) => ({
                              ...provided,
                              height: 32,  // Set the height of the select input
                              minHeight: 32,
                              border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
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
                          type="select"
                          value={shippingBillDetail.newSbType}
                          className={`inputwidthTuka form-control ${sbErrors?.newSbType ? 'error-border' : ''}`}
                          onChange={(e) => handleFieldChange(e, 0, 'sb', 'newSbType')}
                        >
                          <option value="">Select Sb type</option>
                          <option value="Normal">Normal</option>
                          <option value="Buffer">Buffer</option>
                          <option value="ONWH">On Wheel</option>
                        </Input>

                      </td>

                      <td>

                        <Input
                          type="text"
                          name='oldFOB'
                          value={shippingBillDetail.newFOB}
                          className={`inputwidthTuka form-control ${sbErrors?.newFOB ? 'error-border' : ''}`}
                          maxLength={17}
                          onChange={(e) => handleFieldChange(e, 0, 'sb', 'newFOB', 'decimal', 12, 4)}
                        />

                      </td>


                      <td>

                        <textarea
                          className={`inputwidthTukaMax form-control ${sbErrors?.newCommodityId ? 'error-border' : ''}`}
                          id="newCommodityId"
                          name='newCommodityId'
                          value={shippingBillDetail.newCommodityId}
                          onChange={(e) => handleFieldChange(e, 0, 'sb', 'newCommodityId')}
                          maxLength={200}
                          rows={1}
                        ></textarea>


                      </td>

                      <td>

                        <Input
                          className={`inputwidthTukaMin form-control ${sbErrors?.newNoOfMarks ? 'error-border' : ''}`}
                          id="newNoOfMarks"
                          value={shippingBillDetail.newNoOfMarks}
                          name='newNoOfMarks'
                          onChange={(e) => handleFieldChange(e, 0, 'sb', 'newNoOfMarks')}
                          maxLength={60}
                        />


                      </td>


                      <td>

                        <Input
                          className={`inputwidthTukaMax form-control ${sbErrors?.newConsigneeName ? 'error-border' : ''}`}
                          id="newConsigneeName"
                          value={shippingBillDetail.newConsigneeName}
                          name='newConsigneeName'
                          onChange={(e) => handleFieldChange(e, 0, 'sb', 'newConsigneeName')}
                          maxLength={60}
                        />


                      </td>

                      <td>

                        <Select
                          options={chaData}
                          value={selectedCha}
                          onInputChange={(inputValue, { action }) => {
                            if (action === 'input-change') {
                              searchExporter(inputValue, 'cha');
                            }
                          }}
                          onChange={(selectedOption) => handleSelectChange(selectedOption, 'cha')}
                          className={`inputwidthTukaMax ${sbErrors.newCHA ? 'error-border' : ''}`}
                          placeholder="Select CHA"
                          isClearable
                          menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                          menuPosition="fixed" // Sets the dropdown menu position to fixed    
                          menuPlacement="top"
                          id="exporter"
                          styles={{
                            control: (provided, state) => ({
                              ...provided,
                              height: 32,  // Set the height of the select input
                              minHeight: 32,
                              border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
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

                        <Select
                          options={onAccountData}
                          value={selectedOnAccount}
                          onInputChange={(inputValue, { action }) => {
                            if (action === 'input-change') {
                              searchExporter(inputValue, 'agent');
                            }
                          }}
                          onChange={(selectedOption) => handleSelectChange(selectedOption, 'on')}
                          className={`inputwidthTukaMax ${sbErrors.newOnAcc ? 'error-border' : ''}`}
                          placeholder="Select Agent"
                          isClearable
                          menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                          menuPosition="fixed" // Sets the dropdown menu position to fixed    
                          menuPlacement="top"
                          id="exporter"
                          styles={{
                            control: (provided, state) => ({
                              ...provided,
                              height: 32,  // Set the height of the select input
                              minHeight: 32,
                              border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
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
                    </tr>
                  </tbody>
                </Table>
              </div>

              <Row>

                <Col md={4}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="sbRequestId"
                    >
                      Audit Remarks <span className="error-message">*</span>
                    </label>
                    <textarea
                      className={`form-control ${sbErrors.auditremarks ? 'error-border' : ''}`}
                      id="auditremarks"
                      name='auditremarks'
                      value={shippingBillDetail.auditremarks}
                      onChange={(e) => handleFieldChange(e, 0, 'sb', 'auditremarks')}
                      maxLength={250}
                      rows={2}
                    ></textarea>
                  </FormGroup>
                </Col>

                <Col>
                  <button
                    className="btn btn-outline-primary btn-margin newButton mt-4"
                    style={{ marginRight: 10, fontSize: 13 }}
                    id="submitbtn2"
                    onClick={(e) => handleSave('sb')}
                  >
                    <FontAwesomeIcon
                      icon={faSave}
                      style={{ marginRight: "5px" }}
                    />
                    Submit SB Details
                  </button>
                </Col>
              </Row>

              <hr />
            </div>

          )}




          <div>
            {gateInJo && gateInJo.length > 0 && (
              <>
                <Row className="gateInDtl">
                  <Col md={5}>
                    <h6
                      className="pageHead"
                      style={{
                        fontFamily: "Your-Heading-Font",
                        paddingLeft: "2%",
                        paddingRight: "-20px",
                      }}
                    >
                      Carting Job Order
                    </h6>
                    <div className="table-responsive mt-1" style={{ maxHeight: "400px", overflowY: "auto" }}>
                      <Table className="table table-bordered tariffTableAudit" style={{ border: '2px solid black' }}>
                        <thead>
                          <tr>
                            <th scope="col" className="text-center" style={{ color: "black" }}>Sr No</th>
                            <th scope="col" className="text-center" style={{ color: "black" }}>Vehicle No</th>
                            <th scope="col" className="text-center" style={{ color: "black" }}>Gate In Date</th>
                            <th scope="col" className="text-center" style={{ color: "black" }}>Cargo Receipt Date</th>
                          </tr>
                        </thead>

                        <tbody>
                          {gateInJo.map((cargoEntry, index) => (
                            <tr key={index} className="text-center">
                              <td>{index + 1}</td>
                              <td className="text-center align-center">

                                <Input
                                  type="text"
                                  name='newVehicleNo'
                                  value={cargoEntry.newVehicleNo}
                                  onChange={(e) => handleFieldChange(e, index, 'gateInJo', 'newVehicleNo')}
                                  maxLength={15}
                                  className={`inputwidthTuka form-control ${gateInJoErrors[index]?.newVehicleNo ? 'error-border' : ''}`}
                                />

                              </td>

                              <td className="text-center align-center">


                                <DatePicker
                                  selected={cargoEntry.newGateInDate}
                                  onChange={(date) => handlePaymentDateChange(date, 'gateInJo', 'newGateInDate', index)}
                                  id="newGateInDate"
                                  name="newGateInDate"
                                  placeholderText="Enter GateIn Date"
                                  dateFormat="dd/MM/yyyy HH:mm"
                                  showTimeInput
                                  timeFormat="HH:mm"
                                  timeIntervals={15}
                                  customInput={
                                    <CustomInput
                                      className={`inputwidthTukaAudit form-control ${gateInJoErrors[index]?.newGateInDate ? 'error-border' : ''}`}
                                      onKeyDown={(event) => handleKeyDown(event, 'gateInJo', 'newGateInDate', index)}
                                      onChange={(date) => handlePaymentDateChange(date, 'gateInJo', 'newGateInDate', index)}
                                    />
                                  } />
                              </td>


                              <td className="text-center align-center">
                                <DatePicker
                                  selected={cargoEntry.newCartingTransDate}
                                  onChange={(date) => handlePaymentDateChange(date, 'gateInJo', 'newCartingTransDate', index)}
                                  id="newCartingTransDate"
                                  name="newCartingTransDate"
                                  placeholderText="Enter Carting Date"
                                  dateFormat="dd/MM/yyyy HH:mm"
                                  showTimeInput
                                  timeFormat="HH:mm"
                                  timeIntervals={15}
                                  customInput={
                                    <CustomInput
                                      className={`inputwidthTukaAudit form-control ${gateInJoErrors[index]?.newCartingTransDate ? 'error-border' : ''}`}
                                      onKeyDown={(event) => handleKeyDown(event, 'gateInJo', 'newCartingTransDate', index)}
                                      onChange={(date) => handlePaymentDateChange(date, 'gateInJo', 'newCartingTransDate', index)}
                                    />
                                  } />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                    <Row>
                      <Col md={7}>
                        <FormGroup>
                          <label
                            className="forlabel bold-label"
                            htmlFor="sbRequestId"
                          >
                            Audit Remarks <span className="error-message">*</span>
                          </label>
                          <textarea
                            className={`form-control ${gateInJoErrors.some(error => error.hasOwnProperty('auditremarks')) ? 'error-border' : ''}`}
                            id="auditremarks"
                            name='auditremarks'
                            value={gateInJo.length > 0 ? gateInJo[0].auditremarks : ''}
                            onChange={(e) => handleFieldChange(e, 0, 'gateInJo', 'auditremarks')}
                            maxLength={250}
                            rows={2}
                          ></textarea>
                        </FormGroup>
                      </Col>

                      <Col>
                        <button
                          className="btn btn-outline-primary btn-margin newButton mt-4"
                          style={{ marginRight: 10, fontSize: 13 }}
                          id="submitbtn2"
                          onClick={(e) => handleSave('gateInJO')}
                        >
                          <FontAwesomeIcon
                            icon={faSave}
                            style={{ marginRight: "5px" }}
                          />
                          Submit Carting JO
                        </button>
                      </Col>
                    </Row>




                  </Col>


                  <Col md={7}>
                    <h6
                      className="pageHead"
                      style={{
                        fontFamily: "Your-Heading-Font",
                        paddingLeft: "2%",
                        paddingRight: "-20px",
                      }}
                    >
                      Carting JO Details
                    </h6>

                    <div className="table-responsive mt-1" style={{ maxHeight: "400px", overflowY: "auto" }}>
                      <Table className="table table-bordered tariffTableAudit" style={{ border: '2px solid black' }}>
                        <thead>
                          <tr>
                            <th scope="col" className="text-center" style={{ color: "black" }}>Sr No</th>
                            <th scope="col" className="text-center" style={{ color: "black" }}>SB No</th>
                            <th scope="col" className="text-center" style={{ color: "black" }}>JO No Pkgs</th>
                            <th scope="col" className="text-center" style={{ color: "black" }}>JO Weight</th>
                            <th scope="col" className="text-center" style={{ color: "black" }}>Receive Packages</th>
                            <th scope="col" className="text-center" style={{ color: "black" }}>Receive Weight</th>
                          </tr>
                        </thead>

                        <tbody>
                          {gateInJoDetailDTO.map((cargoEntry, index) => (
                            <tr key={index} className="text-center">
                              <td>{index + 1}</td>
                              <td>

                                <Input
                                  type="text"
                                  name='sbNo'
                                  value={cargoEntry.sbNo}
                                  onChange={(e) => handleFieldChange(e, index, 'gateInJoDtl', 'sbNo')}
                                  maxLength={15}
                                  disabled
                                  className={`inputwidthTukaTariff form-control ${gateInJoDetailErrors[index]?.sbNo ? 'error-border' : ''}`}
                                />

                              </td>

                              <td>

                                <Input
                                  type="text"
                                  name='sbNo'
                                  value={cargoEntry.noOfPackages}
                                  onChange={(e) => handleFieldChange(e, index, 'gateInJoDtl', 'noOfPackages')}
                                  maxLength={15}
                                  className={`inputwidthTukaMin form-control ${gateInJoDetailErrors[index]?.noOfPackages ? 'error-border' : ''}`}
                                  disabled
                                />

                              </td>


                              <td>

                                <Input
                                  type="text"
                                  name='sbNo'
                                  value={cargoEntry.grossWeight}
                                  onChange={(e) => handleFieldChange(e, index, 'gateInJoDtl', 'grossWeight')}
                                  maxLength={15}
                                  className={`inputwidthTukaTariff form-control ${gateInJoDetailErrors[index]?.grossWeight ? 'error-border' : ''}`}
                                  disabled
                                />

                              </td>

                              <td>

                                <Input
                                  type="text"
                                  name='newCartedpPkg'
                                  value={cargoEntry.newCartedpPkg}
                                  onChange={(e) => handleFieldChange(e, index, 'gateInJoDtl', 'newCartedpPkg', 'number')}
                                  maxLength={10}
                                  className={`inputwidthTukaMin form-control ${gateInJoDetailErrors[index]?.newCartedpPkg ? 'error-border' : ''}`}
                                />

                              </td>


                              <td>

                                <Input
                                  type="text"
                                  name='newCartedWt'
                                  value={cargoEntry.newCartedWt}
                                  onChange={(e) => handleFieldChange(e, index, 'gateInJoDtl', 'newCartedWt', 'decimal', 16, 4)}
                                  maxLength={21}
                                  className={`inputwidthTukaTariff form-control ${gateInJoDetailErrors[index]?.newCartedWt ? 'error-border' : ''}`}

                                />

                              </td>




                            </tr>
                          ))}
                        </tbody>
                      </Table>

                    </div>


                    <Row>
                      <Col md={7}>
                        <FormGroup>
                          <label
                            className="forlabel bold-label"
                            htmlFor="sbRequestId"
                          >
                            Audit Remarks <span className="error-message">*</span>
                          </label>
                          <textarea
                            className={`form-control ${gateInJoDetailErrors.some(error => error.hasOwnProperty('auditremarks')) ? 'error-border' : ''}`}
                            id="auditremarks"
                            name='auditremarks'
                            value={gateInJoDetailDTO.length > 0 ? gateInJoDetailDTO[0].auditremarks : ''}
                            onChange={(e) => handleFieldChange(e, 0, 'gateInJoDtl', 'auditremarks')}
                            maxLength={250}
                            rows={2}
                          ></textarea>
                        </FormGroup>
                      </Col>

                      <Col>
                        <button
                          className="btn btn-outline-primary btn-margin newButton mt-4"
                          style={{ marginRight: 10, fontSize: 13 }}
                          id="submitbtn2"
                          onClick={(e) => handleSave('gateInJoDtl')}
                        >
                          <FontAwesomeIcon
                            icon={faSave}
                            style={{ marginRight: "5px" }}
                          />
                          Submit Carting JO Details
                        </button>
                      </Col>
                    </Row>


                  </Col>
                </Row>
                <hr />
              </>
            )}



            {gateInJoDetailDTO && gateInJoDetailDTO.length > 0 && (

              <>

                <Row md={7} className="mt-2">

                  <Col md={9}>
                    <h6
                      className="pageHead"
                      style={{
                        fontFamily: "Your-Heading-Font",
                        paddingLeft: "2%",
                        paddingRight: "-20px",
                      }}
                    >
                      Carting Tally
                    </h6>

                    <div className="table-responsive mt-1" style={{ maxHeight: "400px", overflowY: "auto" }}>
                      <Table className="table table-bordered tariffTableAudit" style={{ border: '2px solid black' }}>
                        <thead>
                          <tr>
                            <th scope="col" className="text-center" style={{ color: "black" }}>Sr No</th>
                            <th scope="col" className="text-center" style={{ color: "black" }}>Grid Location</th>
                            <th scope="col" className="text-center" style={{ color: "black" }}>Packages</th>
                            <th scope="col" className="text-center" style={{ color: "black" }}>Weight</th>
                            <th scope="col" className="text-center" style={{ color: "black" }}>Area</th>
                          </tr>
                        </thead>

                        <tbody>
                          {cartingTallyDTO.map((cargoEntry, index) => (
                            <tr key={index} className="text-center">
                              <td>{index + 1}</td>

                              <td className="text-center align-center">
                                <Select
                                  value={selectedYardLocationMain[index]}
                                  onChange={(selectedOption) => handleYardLocationMainSelect(selectedOption, index, 'cartingTally')}
                                  options={yardLocations}
                                  placeholder="Select Location"
                                  onInputChange={(inputValue, { action }) => {
                                    if (action === 'input-change') {
                                      searchYardLocations(inputValue);
                                    }
                                  }}
                                  isClearable
                                  id="newYardLocation"
                                  name='newYardLocation'
                                  components={{ Option: CustomOptionYard }}
                                  className={` ${cartingTallyErrors[index]?.newYardLocation ? 'error-border' : ''}`}
                                  menuPortalTarget={document.body}
                                  menuPosition="fixed"
                                  menuPlacement="top"
                                  styles={{
                                    control: (provided, state) => ({
                                      ...provided,
                                      height: 32,
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








                              <td className="text-center align-center">

                                <Input
                                  type="text"
                                  name='newYardPackages'
                                  value={cargoEntry.newYardPackages}
                                  onChange={(e) => handleFieldChange(e, index, 'cartingTally', 'newYardPackages', 'number')}
                                  maxLength={7}
                                  className={`inputwidthTuka form-control ${cartingTallyErrors[index]?.newYardPackages ? 'error-border' : ''}`}
                                  disabled

                                />

                              </td>


                              <td className="text-center align-center">

                                <Input
                                  type="text"
                                  name='newGridweight'
                                  value={cargoEntry.newGridweight}
                                  onChange={(e) => handleFieldChange(e, index, 'cartingTally', 'newGridweight')}
                                  maxLength={15}
                                  className={`inputwidthTuka form-control ${cartingTallyErrors[index]?.newGridweight ? 'error-border' : ''}`}
                                  disabled
                                />

                              </td>

                              <td className="text-center align-center">

                                <Input
                                  type="text"
                                  name='newCellAreaAllocated'
                                  value={cargoEntry.newCellAreaAllocated}
                                  onChange={(e) => handleFieldChange(e, index, 'cartingTally', 'newCellAreaAllocated', 'decimal', 18, 3)}
                                  maxLength={22}
                                  className={`inputwidthTuka form-control ${cartingTallyErrors[index]?.newCellAreaAllocated ? 'error-border' : ''}`}

                                />

                              </td>

                            </tr>
                          ))}
                        </tbody>
                      </Table>

                    </div>
                  </Col>





                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <label
                          className="forlabel bold-label"
                          htmlFor="sbRequestId"
                        >
                          Audit Remarks <span className="error-message">*</span>
                        </label>
                        <textarea
                          className={`form-control ${cartingTallyErrors.some(error => error.hasOwnProperty('auditremarks')) ? 'error-border' : ''}`}
                          id="auditremarks"
                          name='auditremarks'
                          value={cartingTallyDTO.length > 0 ? cartingTallyDTO[0].auditremarks : ''}
                          onChange={(e) => handleFieldChange(e, 0, 'cartingTally', 'auditremarks')}
                          maxLength={250}
                          rows={2}
                        ></textarea>
                      </FormGroup>
                    </Col>

                    <Col>
                      <button
                        className="btn btn-outline-primary btn-margin newButton mt-4"
                        style={{ marginRight: 10, fontSize: 13 }}
                        id="submitbtn2"
                        onClick={(e) => handleSave('cartingTally')}
                      >
                        <FontAwesomeIcon
                          icon={faSave}
                          style={{ marginRight: "5px" }}
                        />
                        Submit Job Tally
                      </button>
                    </Col>
                  </Row>
                </Row>
                <hr />
              </>
            )}


          </div>


          

            {containerGateIn && Object.keys(containerGateIn)?.length > 0 && (
            <>
              <Row className="containerGateIn">
                <h5
                  className="pageHead"
                  style={{
                    fontFamily: "Your-Heading-Font",
                    paddingLeft: "2%",
                    paddingRight: "-20px",
                  }}
                >
                  Gate In Details
                </h5>
                <div className="table-responsive mt-1" style={{ maxHeight: "400px", overflowY: "auto" }}>
                  <Table className="table table-bordered tariffTableAudit" style={{ border: '2px solid black' }}>
                    <thead>
                      <tr>
                        <th scope="col" className="text-center" style={{ color: "black" }}>Gate Pass No</th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>Gate In Date</th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>Container No</th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>Cont Size</th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>Cont Type</th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>ISO Code</th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>Tare Wt</th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>Exporter</th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>Truck No</th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>Gross Wt</th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>Agent Seal No</th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>Custom Seal No</th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>Transporter</th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>Damage Details</th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>Movement By</th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>CHA</th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>Shipping Line</th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>Liner Agent</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-center">
                        {/* <td>

                      <Select
                        options={gatePassData}
                        value={selectedGatePassNo}
                        onInputChange={(inputValue, { action }) => {
                          if (action === 'input-change') {
                            searchValuesInputSearch(inputValue, 'gatePassNo');
                          }
                        }}
                        onChange={(selectedOption) => handleSelectChange(selectedOption, 'gatePassNo')}
                        className={`inputwidthTukaMax ${containerGateInErrors.newGatePassNo ? 'error-border' : ''}`}
                        placeholder="GatePass No"
                        isDisabled
                        isClearable
                        id="gatePassNo"
                        menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                        menuPosition="fixed" // Sets the dropdown menu position to fixed    
                        menuPlacement="top"
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            height: 32,  // Set the height of the select input
                            minHeight: 32,
                            border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
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
                    </td> */}


                        <td>

                          <Input
                            type="text"
                            name='oldGatePassNo'
                            value={containerGateIn.oldGatePassNo}
                            // onChange={(e) => handleFieldChange(e, 0, 'containerGateIn', 'oldGatePassNo')}
                            maxLength={15}
                            disabled
                            className={`inputwidthTukaMax form-control ${containerGateInErrors?.oldGatePassNo ? 'error-border' : ''}`}
                          />
                        </td>

                        <td>
                          <DatePicker
                            selected={containerGateIn.newGateInDate}
                            onChange={(date) => handlePaymentDateChange(date, 'containerGateIn', 'newGateInDate')}
                            id="newGateInDate"
                            name="newGateInDate"
                            placeholderText="Enter GateIn Date"
                            dateFormat="dd/MM/yyyy"
                            customInput={
                              <CustomInput
                                className={`inputwidthTuka form-control ${containerGateInErrors.newGateInDate ? 'error-border' : ''}`}
                                onKeyDown={(event) => handleKeyDown(event, 'containerGateIn', 'newGateInDate')}
                                onChange={(date) => handlePaymentDateChange(date, 'containerGateIn', 'newGateInDate')}
                              />
                            } />


                        </td>




                        {/* <td>
                      <Select
                        options={containerNoListGateIn}
                        value={selectedContainerNoGateIn}
                        onInputChange={(inputValue, { action }) => {
                          if (action === 'input-change') {
                            searchValuesInputSearch(inputValue, 'containerNo');
                          }
                        }}
                        onChange={(selectedOption) => handleSelectChange(selectedOption, 'containerNo')}
                        className={`inputwidthTukaMax ${containerGateInErrors.newContainerNo ? 'error-border' : ''}`}
                        placeholder="Select ContainerNo"
                        isClearable
                        id="newContainerNo"
                        menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                        menuPosition="fixed" // Sets the dropdown menu position to fixed    
                        menuPlacement="top"
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            height: 32,  // Set the height of the select input
                            minHeight: 32,
                            border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
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
                    </td> */}

                        <td>

                          <Input
                            type="text"
                            name='newContainerNo'
                            value={containerGateIn.newContainerNo}
                            onChange={(e) => handleFieldChange(e, 0, 'containerGateIn', 'newContainerNo')}
                            maxLength={11}
                            className={`inputwidthTukaMax form-control ${containerGateInErrors?.newContainerNo ? 'error-border' : ''}`}
                          />

                        </td>




                        {/* <td>

                      <Input
                        type="text"
                        name='newContainerSize'
                        value={containerGateIn.newContainerSize}
                        onChange={(e) => handleFieldChange(e, 0, 'containerGateIn', 'newContainerSize')}
                        maxLength={6}
                        className={`inputwidthTukaMin form-control ${containerGateInErrors?.newContainerSize ? 'error-border' : ''}`}
                      />

                    </td> */}

                        <td>

                          <Input
                            type="select"
                            value={containerGateIn.newContainerSize}
                            className={`inputwidthTukaTariff form-control ${containerGateInErrors?.newContainerSize ? 'error-border' : ''}`}
                            onChange={(e) => handleFieldChange(e, 0, 'containerGateIn', 'newContainerSize')}
                          >
                            <option value="">Select Cont size</option>
                            {containerSizes.map((type, idx) => (
                              <option key={idx} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </Input>
                        </td>





                        <td>

                          <Input
                            type="select"
                            value={containerGateIn.newContainerType}
                            className={`inputwidthTukaTariff form-control ${containerGateInErrors?.newContainerType ? 'error-border' : ''}`}
                            onChange={(e) => handleFieldChange(e, 0, 'containerGateIn', 'newContainerType')}
                          >
                            <option value="">Select Container type</option>
                            {containerTypesStuff.map((type, idx) => (
                              <option key={idx} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </Input>
                        </td>



                        <td>
                          <Input
                            type="text"
                            name='oldFOB'
                            value={containerGateIn.newIsoCode}
                            className={`inputwidthTukaMin form-control ${containerGateInErrors?.newIsoCode ? 'error-border' : ''}`}
                            maxLength={4}
                            onChange={(e) => handleFieldChange(e, 0, 'containerGateIn', 'newIsoCode')}
                          />
                        </td>



                        <td>
                          <Input
                            type="text"
                            name='newTareWeight'
                            value={containerGateIn.newTareWeight}
                            className={`inputwidthTukaTariff form-control ${containerGateInErrors?.newTareWeight ? 'error-border' : ''}`}
                            maxLength={19}
                            onChange={(e) => handleFieldChange(e, 0, 'containerGateIn', 'newTareWeight', 'decimal', 15, 3)}
                          />
                        </td>





                        <td>
                          <Select
                            options={exporterContainerGateInData}
                            value={selectedExporterContainerGateIn}
                            onInputChange={(inputValue, { action }) => {
                              if (action === 'input-change') {
                                searchExporter(inputValue, 'exp');
                              }
                            }}
                            onChange={(selectedOption) => handleSelectChange(selectedOption, 'expGateIn')}
                            className={`inputwidthTukaMax ${containerGateInErrors.newContainerNo ? 'error-border' : ''}`}
                            placeholder="Select Exporter"
                            isClearable
                            id="newExporter"
                            menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                            menuPosition="fixed" // Sets the dropdown menu position to fixed    
                            menuPlacement="top"
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                height: 32,  // Set the height of the select input
                                minHeight: 32,
                                border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
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
                            className={`inputwidthTukaTariff form-control ${containerGateInErrors?.newTruckNo ? 'error-border' : ''}`}
                            id="newTruckNo"
                            value={containerGateIn.newTruckNo}
                            name='newTruckNo'
                            onChange={(e) => handleFieldChange(e, 0, 'containerGateIn', 'newTruckNo')}
                            maxLength={15}
                          />
                        </td>

                        <td>
                          <Input
                            type="text"
                            name='newGrossWeight'
                            value={containerGateIn.newGrossWeight}
                            className={`inputwidthTukaTariff form-control ${containerGateInErrors?.newGrossWeight ? 'error-border' : ''}`}
                            maxLength={21}
                            onChange={(e) => handleFieldChange(e, 0, 'containerGateIn', 'newGrossWeight', 'decimal', 16, 4)}
                          />
                        </td>

                        <td>
                          <Input
                            className={`inputwidthTukaTariff form-control ${containerGateInErrors?.newAgentSealNo ? 'error-border' : ''}`}
                            id="newAgentSealNo"
                            value={containerGateIn.newAgentSealNo}
                            name='newAgentSealNo'
                            onChange={(e) => handleFieldChange(e, 0, 'containerGateIn', 'newAgentSealNo')}
                            maxLength={15}
                          />
                        </td>


                        <td>
                          <Input
                            className={`inputwidthTukaTariff form-control ${containerGateInErrors?.newCustomSealNo ? 'error-border' : ''}`}
                            id="newCustomSealNo"
                            value={containerGateIn.newCustomSealNo}
                            name='newCustomSealNo'
                            onChange={(e) => handleFieldChange(e, 0, 'containerGateIn', 'newCustomSealNo')}
                            maxLength={15}
                          />
                        </td>


                        <td>
                          <Select
                            options={transporterContainerGateInData}
                            value={selectedTransporterContainerGateIn}
                            onInputChange={(inputValue, { action }) => {
                              if (action === 'input-change') {
                                searchExporter(inputValue, 'trans');
                              }
                            }}
                            onChange={(selectedOption) => handleSelectChange(selectedOption, 'newTransporter')}
                            className={`inputwidthTukaMax ${containerGateInErrors.newTransporter ? 'error-border' : ''}`}
                            placeholder="Select Transporter"
                            isClearable
                            id="newTransporter"
                            menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                            menuPosition="fixed" // Sets the dropdown menu position to fixed    
                            menuPlacement="top"
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                height: 32,  // Set the height of the select input
                                minHeight: 32,
                                border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
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
                            className={`inputwidthTukaTariff form-control ${containerGateInErrors?.newDamageDetails ? 'error-border' : ''}`}
                            id="newDamageDetails"
                            value={containerGateIn.newDamageDetails}
                            name='newDamageDetails'
                            onChange={(e) => handleFieldChange(e, 0, 'containerGateIn', 'newDamageDetails')}
                            maxLength={250}
                          />
                        </td>


                        <td>
                          <Input
                            className={`inputwidthTukaTariff form-control ${containerGateInErrors?.newMovementBy ? 'error-border' : ''}`}
                            id="newMovementBy"
                            value={containerGateIn.newMovementBy}
                            name='newMovementBy'
                            onChange={(e) => handleFieldChange(e, 0, 'containerGateIn', 'newMovementBy')}
                            maxLength={10}
                          />
                        </td>



                        <td>
                          <Select
                            options={chaData}
                            value={selectedChaContainerGateIn}
                            onInputChange={(inputValue, { action }) => {
                              if (action === 'input-change') {
                                searchExporter(inputValue, 'cha');
                              }
                            }}
                            onChange={(selectedOption) => handleSelectChange(selectedOption, 'chaGateIn')}
                            className={`inputwidthTukaMax ${containerGateInErrors.newCHA ? 'error-border' : ''}`}
                            placeholder="Select CHA"
                            isClearable
                            id="newCHA"
                            menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                            menuPosition="fixed" // Sets the dropdown menu position to fixed    
                            menuPlacement="top"
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                height: 32,  // Set the height of the select input
                                minHeight: 32,
                                border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
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
                          <Select
                            options={lineData}
                            value={selectedLineContainerGateIn}
                            onInputChange={(inputValue, { action }) => {
                              if (action === 'input-change') {
                                searchExporter(inputValue, 'sl');
                              }
                            }}
                            onChange={(selectedOption) => handleSelectChange(selectedOption, 'sl')}
                            className={`inputwidthTukaMax ${containerGateInErrors.newShippingLine ? 'error-border' : ''}`}
                            placeholder="Select Line"
                            isClearable
                            id="newShippingLine"
                            menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                            menuPosition="fixed" // Sets the dropdown menu position to fixed    
                            menuPlacement="top"
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                height: 32,  // Set the height of the select input
                                minHeight: 32,
                                border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
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
                          <Select
                            options={agentData}
                            value={selectedAgentContainerGateIn}
                            onInputChange={(inputValue, { action }) => {
                              if (action === 'input-change') {
                                searchExporter(inputValue, 'sa');
                              }
                            }}
                            onChange={(selectedOption) => handleSelectChange(selectedOption, 'sa')}
                            className={`inputwidthTukaMax ${containerGateInErrors.newShippingAgent ? 'error-border' : ''}`}
                            placeholder="Select Agent"
                            isClearable
                            id="newShippingAgent"
                            menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                            menuPosition="fixed" // Sets the dropdown menu position to fixed    
                            menuPlacement="top"
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                height: 32,  // Set the height of the select input
                                minHeight: 32,
                                border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
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


                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Row>

              <Row>

                <Col md={4}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="sbRequestId"
                    >
                      Audit Remarks <span className="error-message">*</span>
                    </label>
                    <textarea
                      className={`form-control ${containerGateInErrors.auditremarks ? 'error-border' : ''}`}
                      id="auditremarks"
                      name='auditremarks'
                      value={containerGateIn.auditremarks} auditRemarks
                      onChange={(e) => handleFieldChange(e, 0, 'containerGateIn', 'auditremarks')}
                      maxLength={250}
                      rows={2}
                    ></textarea>
                  </FormGroup>
                </Col>

                <Col>
                  <button
                    className="btn btn-outline-primary btn-margin newButton mt-4"
                    style={{ marginRight: 10, fontSize: 13 }}
                    id="submitbtn2"
                    onClick={(e) => handleSave('containerGateIn')}
                  >
                    <FontAwesomeIcon
                      icon={faSave}
                      style={{ marginRight: "5px" }}
                    />
                    Submit GateIn Details
                  </button>
                </Col>
              </Row>

              <hr />
            </>
          )}





          {stuffTally && stuffTally.length > 0 && (

            <Row className="stuffingTally">
              <h5
                className="pageHead"
                style={{
                  fontFamily: "Your-Heading-Font",
                  paddingLeft: "2%",
                  paddingRight: "-20px",
                }}
              >
                Stuffing Job Order - Container Details
              </h5>
              <div className="table-responsive mt-1" style={{ maxHeight: "400px", overflowY: "auto" }}>
                <Table className="table table-bordered tariffTableAudit" style={{ border: '2px solid black' }}>
                  <thead>
                    <tr>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Container No</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Size</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Type</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Stuff Order Date</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Voy No</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Vcn No</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Vessel Name</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Rotation No</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>POD</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>FPD</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>POL</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Agent Seal No</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Custom Seal No</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Tare Wt</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Move. Order Date</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>SB No</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Stuffed Qty</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Stuff Wt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stuffTally.map((cargoEntry, index) => (
                      <tr key={index} className="text-center">

                        <td>
                          <Input
                            type="text"
                            name='newContainerNo'
                            value={cargoEntry.newContainerNo}
                            onChange={(e) => handleFieldChange(e, index, 'stuffTally', 'newContainerNo')}
                            maxLength={11}
                            className={`inputwidthTukaMax form-control ${stuffTallyErrors[index]?.newContainerNo ? 'error-border' : ''}`}
                          />
                        </td>

                        <td>

                          <Input
                            type="select"
                            value={cargoEntry.newContainerSize}
                            className={`inputwidthTukaTariff form-control ${stuffTallyErrors[index]?.newContainerSize ? 'error-border' : ''}`}
                            onChange={(e) => handleFieldChange(e, index, 'stuffTally', 'newContainerSize')}
                          >
                            <option value="">Select Cont size</option>
                            {containerSizes.map((type, idx) => (
                              <option key={idx} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </Input>
                        </td>


                        <td>

                          <Input
                            type="select"
                            value={cargoEntry.newContainerType}
                            className={`inputwidthTukaTariff form-control ${stuffTallyErrors[index]?.newContainerType ? 'error-border' : ''}`}
                            onChange={(e) => handleFieldChange(e, index, 'stuffTally', 'newContainerType')}
                          >
                            <option value="">Select Cont type</option>
                            {containerTypesStuff.map((type, idx) => (
                              <option key={idx} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </Input>
                        </td>




                        <td>
                          <DatePicker
                            selected={cargoEntry.newStuffDate}
                            onChange={(date) => handlePaymentDateChange(date, 'stuffTally', 'newStuffDate', index)}
                            id="newStuffDate"
                            name="newStuffDate"
                            placeholderText="Enter Stuff Date"
                            dateFormat="dd/MM/yyyy"
                            customInput={
                              <CustomInput
                                className={`inputwidthTuka form-control ${stuffTallyErrors[index]?.newStuffDate ? 'error-border' : ''}`}
                                onKeyDown={(event) => handleKeyDown(event, 'stuffTally', 'newStuffDate', index)}
                                onChange={(date) => handlePaymentDateChange(date, 'stuffTally', 'newStuffDate', index)}
                              />
                            } />
                        </td>




                        <td className="text-center align-center">
                          <Select
                            value={selectedVoyageNo[index]}
                            onChange={(selectedOption) => handleYardLocationMainSelect(selectedOption, index, 'stuffTally', 'newvoyageNo')}
                            options={vesselData}
                            placeholder="Select Voyage"
                            onInputChange={(inputValue, { action }) => {
                              if (action === 'input-change') {
                                searchVoyageAndVia(inputValue);
                              }
                            }}
                            isClearable
                            id="newvoyageNo"
                            name='newvoyageNo'
                            className={` inputwidthTukaMax ${stuffTallyErrors[index]?.newvoyageNo ? 'error-border' : ''}`}
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                            menuPlacement="top"
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                height: 32,
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

                        <td className="text-center align-center">
                          <Select
                            value={selectedViaNo[index]}
                            onChange={(selectedOption) => handleYardLocationMainSelect(selectedOption, index, 'stuffTally', 'newvcnNo')}
                            options={vesselData}
                            placeholder="Select Voyage"
                            onInputChange={(inputValue, { action }) => {
                              if (action === 'input-change') {
                                searchVoyageAndVia(inputValue);
                              }
                            }}
                            isClearable
                            id="newvcnNo"
                            name='newvcnNo'
                            className={`inputwidthTukaMax ${stuffTallyErrors[index]?.newvcnNo ? 'error-border' : ''}`}
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                            menuPlacement="top"
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                height: 32,
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
                            name='newVesselName'
                            value={cargoEntry.newVesselName}
                            className={`inputwidthTukaTariff form-control`}
                            maxLength={10}
                            disabled
                            onChange={(e) => handleFieldChange(e, index, 'stuffTally', 'newVesselName')}
                          />
                        </td>



                        <td>

                          <Input
                            type="text"
                            name='newRotataionNo'
                            value={cargoEntry.newRotataionNo}
                            onChange={(e) => handleFieldChange(e, index, 'stuffTally', 'newRotataionNo')}
                            maxLength={20}
                            className={`inputwidthTukaTariff form-control ${stuffTallyErrors[index]?.newRotataionNo ? 'error-border' : ''}`}
                          />
                        </td>


                        <td>

                          <CreatableSelect
                            value={selectedPod[index]}
                            onChange={(selectedOption) => handlePodSelect(selectedOption, 'newPod', index)}
                            options={podData}
                            placeholder="Select POD"
                            onInputChange={(inputValue, { action }) => {
                              if (action === 'input-change') {
                                searchPortData(inputValue, 'pod');
                              }
                            }}
                            onCreateOption={(inputValue) => {
                              const maxLength = 50;
                              const truncatedInputValue = inputValue.slice(0, maxLength);
                              handleCreationSelectPod(truncatedInputValue, 'newPod', index)
                            }}
                            isClearable
                            id="pod"
                            name='pod'
                            className={`inputwidthTuka ${stuffTallyErrors[index]?.pod ? 'error-border' : ''}`}
                            menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                            menuPosition="fixed" // Sets the dropdown menu position to fixed    
                            menuPlacement="top"
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                height: 32,  // Set the height of the select input
                                minHeight: 32,
                                border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
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

                          <CreatableSelect
                            value={selectedFinalPod[index]}
                            onChange={(selectedOption) => handlePodSelect(selectedOption, 'newFinalPod', index)}
                            options={podData}
                            placeholder="Final POD"
                            onInputChange={(inputValue, { action }) => {
                              if (action === 'input-change') {
                                searchPortData(inputValue, 'pod');
                              }
                            }}
                            onCreateOption={(inputValue) => {
                              const maxLength = 50;
                              const truncatedInputValue = inputValue.slice(0, maxLength);
                              handleCreationSelectPod(truncatedInputValue, 'newFinalPod', index)
                            }}
                            isClearable
                            id="newFinalPod"
                            name='newFinalPod'
                            className={`inputwidthTuka ${stuffTallyErrors[index]?.newFinalPod ? 'error-border' : ''}`}
                            menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                            menuPosition="fixed" // Sets the dropdown menu position to fixed    
                            menuPlacement="top"
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                height: 32,  // Set the height of the select input
                                minHeight: 32,
                                border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
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

                          <CreatableSelect
                            value={selectedPol[index]}
                            onChange={(selectedOption) => handlePodSelect(selectedOption, 'newPol', index)}
                            options={polData}
                            placeholder="Select POL"
                            onInputChange={(inputValue, { action }) => {
                              if (action === 'input-change') {
                                searchPortData(inputValue, 'pol');
                              }
                            }}
                            onCreateOption={(inputValue) => {
                              const maxLength = 50;
                              const truncatedInputValue = inputValue.slice(0, maxLength);
                              handleCreationSelectPod(truncatedInputValue, 'newPol', index)
                            }}
                            isClearable
                            id="pod"
                            name='pod'
                            className={`inputwidthTuka`}
                            menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                            menuPosition="fixed" // Sets the dropdown menu position to fixed    
                            menuPlacement="top"
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                height: 32,  // Set the height of the select input
                                minHeight: 32,
                                border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
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
                            name='newAgentSealNo'
                            value={cargoEntry.newAgentSealNo}
                            onChange={(e) => handleFieldChange(e, index, 'stuffTally', 'newAgentSealNo')}
                            maxLength={15}
                            className={`inputwidthTukaTariff form-control ${stuffTallyErrors[index]?.newAgentSealNo ? 'error-border' : ''}`}
                          />

                        </td>


                        <td>

                          <Input
                            type="text"
                            name='newCustomSealNo'
                            value={cargoEntry.newCustomSealNo}
                            onChange={(e) => handleFieldChange(e, index, 'stuffTally', 'newCustomSealNo')}
                            maxLength={15}
                            className={`inputwidthTukaTariff form-control ${stuffTallyErrors[index]?.newCustomSealNo ? 'error-border' : ''}`}
                          />

                        </td>


                        <td>
                          <Input
                            type="text"
                            name='newTareWeight'
                            value={cargoEntry.newTareWeight}
                            className={`inputwidthTukaTariff form-control ${containerGateInErrors[index]?.newTareWeight ? 'error-border' : ''}`}
                            maxLength={19}
                            onChange={(e) => handleFieldChange(e, index, 'stuffTally', 'newTareWeight', 'decimal', 15, 3)}
                          />
                        </td>



                        <td>
                          <DatePicker
                            selected={cargoEntry.newMovementRqDate}
                            onChange={(date) => handlePaymentDateChange(date, 'stuffTally', 'newMovementRqDate', index)}
                            id="newMovementRqDate"
                            name="newMovementRqDate"
                            placeholderText="Enter MovementRq Date"
                            dateFormat="dd/MM/yyyy"
                            customInput={
                              <CustomInput
                                className={`inputwidthTuka form-control ${stuffTallyErrors[index]?.newMovementRqDate ? 'error-border' : ''}`}
                                onKeyDown={(event) => handleKeyDown(event, 'stuffTally', 'newMovementRqDate', index)}
                                onChange={(date) => handlePaymentDateChange(date, 'stuffTally', 'newMovementRqDate', index)}
                              />
                            } />
                        </td>

                        <td>
                          <Input
                            type="text"
                            name='sbNo'
                            value={cargoEntry.sbNo}
                            className={`inputwidthTukaTariff form-control ${stuffTallyErrors[index]?.sbNo ? 'error-border' : ''}`}
                            maxLength={10}
                            disabled
                            onChange={(e) => handleFieldChange(e, index, 'stuffTally', 'sbNo')}
                          />
                        </td>


                        <td>
                          <Input
                            type="text"
                            name='newStuffQty'
                            value={cargoEntry.newStuffQty}
                            className={`inputwidthTukaTariff form-control ${stuffTallyErrors[index]?.newStuffQty ? 'error-border' : ''}`}
                            maxLength={8}
                            onChange={(e) => handleFieldChange(e, index, 'stuffTally', 'newStuffQty', 'number')}
                          />
                        </td>

                        <td>
                          <Input
                            className={`inputwidthTukaTariff form-control ${stuffTallyErrors[index]?.newStuffQtyWeight ? 'error-border' : ''}`}
                            id="newStuffQtyWeight"
                            value={cargoEntry.newStuffQtyWeight}
                            name='newStuffQtyWeight'
                            onChange={(e) => handleFieldChange(e, index, 'stuffTally', 'newStuffQtyWeight', 'decimal', 16, 4)}
                            maxLength={21}
                          />
                        </td>

                      </tr>

                    ))}

                  </tbody>
                </Table>
              </div>

              <Row>
                <Col md={4}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="sbRequestId"
                    >
                      Audit Remarks <span className="error-message">*</span>
                    </label>
                    <textarea
                      className={`form-control ${stuffTallyErrors.some(error => error.hasOwnProperty('auditremarks')) ? 'error-border' : ''}`}
                      id="auditremarks"
                      name='auditremarks'
                      value={stuffTally.length > 0 ? stuffTally[0].auditremarks : ''}
                      onChange={(e) => handleFieldChange(e, 0, 'stuffTally', 'auditremarks')}
                      maxLength={250}
                      rows={2}
                    ></textarea>
                  </FormGroup>
                </Col>

                <Col>
                  <button
                    className="btn btn-outline-primary btn-margin newButton mt-4"
                    style={{ marginRight: 10, fontSize: 13 }}
                    id="submitbtn2"
                    onClick={(e) => handleSave('stuffTally')}
                  >
                    <FontAwesomeIcon
                      icon={faSave}
                      style={{ marginRight: "5px" }}
                    />
                    Submit Stuffing Job Order
                  </button>
                </Col>
              </Row>


              <hr />

            </Row>

          )}




          {containerGateOut && Object.keys(containerGateOut)?.length > 0 && (
            <Row className="containerOut">
              <h5
                className="pageHead"
                style={{
                  fontFamily: "Your-Heading-Font",
                  paddingLeft: "2%",
                  paddingRight: "-20px",
                }}
              >
                Export Gateout - Container Details
              </h5>
              <div className="table-responsive mt-1" style={{ maxHeight: "400px", overflowY: "auto" }}>
                <Table className="table table-bordered tariffTableAudit" style={{ border: '2px solid black' }}>
                  <thead>
                    <tr>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Container No</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Size</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Type</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Gate Pass Date</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Truck No</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Actual Gate Out Date</th>
                      <th scope="col" className="text-center" style={{ color: "black" }}>Transporter</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td>

                        <Input
                          type="text"
                          name='containerNo'
                          value={containerGateOut.containerNo}
                          disabled
                          className={`inputwidthTukaMax form-control ${containerGateOutErrors?.newSbNo ? 'error-border' : ''}`}
                        />
                      </td>

                      <td>

                        <Input
                          type="text"
                          name='containerSize'
                          value={containerGateOut.containerSize}
                          disabled
                          className={`inputwidthTukaMin form-control ${containerGateOutErrors?.containerSize ? 'error-border' : ''}`}
                        />
                      </td>
                      <td>
                        <Input
                          type="text"
                          name='containerNo'
                          value={containerGateOut.containerType}
                          disabled
                          className={`inputwidthTukaMin form-control ${containerGateOutErrors?.containerType ? 'error-border' : ''}`}
                        />
                      </td>

                      <td>
                        <DatePicker
                          selected={containerGateOut.newGatePassDate}
                          onChange={(date) => handlePaymentDateChange(date, 'containerGateOut', 'newGatePassDate')}
                          id="newGatePassDate"
                          name="newGatePassDate"
                          placeholderText="Enter GatePass Date"
                          dateFormat="dd/MM/yyyy"
                          customInput={
                            <CustomInput
                              className={`inputwidthTuka form-control ${containerGateOutErrors.newGatePassDate ? 'error-border' : ''}`}
                              onKeyDown={(event) => handleKeyDown(event, 'containerGateOut', 'newGatePassDate')}
                              onChange={(date) => handlePaymentDateChange(date, 'containerGateOut', 'newGatePassDate')}
                            />
                          } />


                      </td>
                      <td>

                        <Input
                          type="text"
                          name='newNoOfPackages'
                          value={containerGateOut.newTruckNo}
                          onChange={(e) => handleFieldChange(e, 0, 'containerGateOut', 'newTruckNo')}
                          maxLength={15}
                          className={`inputwidthTuka form-control ${containerGateOutErrors?.newTruckNo ? 'error-border' : ''}`}
                        />


                      </td>



                      <td>
                        <DatePicker
                          selected={containerGateOut.newGateOutDate}
                          onChange={(date) => handlePaymentDateChange(date, 'containerGateOut', 'newGateOutDate')}
                          id="newGateOutDate"
                          name="newGateOutDate"
                          placeholderText="Enter GateOut Date"
                          dateFormat="dd/MM/yyyy"
                          customInput={
                            <CustomInput
                              className={`inputwidthTuka form-control ${containerGateOutErrors.newGateOutDate ? 'error-border' : ''}`}
                              onKeyDown={(event) => handleKeyDown(event, 'containerGateOut', 'newGateOutDate')}
                              onChange={(date) => handlePaymentDateChange(date, 'containerGateOut', 'newGateOutDate')}
                            />
                          } />

                      </td>

                      <td className="text-center">
                        <Select
                          options={transporterContainerGateInData}
                          value={selectedTransporterContainerGateOut}
                          onInputChange={(inputValue, { action }) => {
                            if (action === 'input-change') {
                              searchExporter(inputValue, 'trans');
                            }
                          }}
                          onChange={(selectedOption) => handleSelectChange(selectedOption, 'newTransporterOut')}
                          className={`inputwidthTukaMax ${containerGateOutErrors.newTransporter ? 'error-border' : ''}`}
                          placeholder="Select Transporter"
                          isClearable
                          id="newTransporter"
                          menuPortalTarget={document.body} // Renders dropdown in the document body to avoid clipping
                          menuPosition="fixed" // Sets the dropdown menu position to fixed    
                          menuPlacement="top"
                          styles={{
                            control: (provided, state) => ({
                              ...provided,
                              height: 32,  // Set the height of the select input
                              minHeight: 32,
                              border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
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




                    </tr>
                  </tbody>
                </Table>
              </div>

              <Row>

                <Col md={4}>
                  <FormGroup>
                    <label
                      className="forlabel bold-label"
                      htmlFor="auditremarks"
                    >
                      Audit Remarks <span className="error-message">*</span>
                    </label>
                    <textarea
                      className={`form-control ${containerGateOutErrors.auditremarks ? 'error-border' : ''}`}
                      id="auditremarks"
                      name='auditremarks'
                      value={containerGateOut.auditremarks}
                      onChange={(e) => handleFieldChange(e, 0, 'containerGateOut', 'auditremarks')}
                      maxLength={250}
                      rows={2}
                    ></textarea>
                  </FormGroup>
                </Col>

                <Col>
                  <button
                    className="btn btn-outline-primary btn-margin newButton mt-4"
                    style={{ marginRight: 10, fontSize: 13 }}
                    id="submitbtn2"
                    onClick={(e) => handleSave('containerGateOut')}
                  >
                    <FontAwesomeIcon
                      icon={faSave}
                      style={{ marginRight: "5px" }}
                    />
                    Submit GateOut Details
                  </button>
                </Col>
              </Row>

              <hr />
            </Row>
          )}



          {backToTownData && backToTownData.length > 0 && (
            <Row className="backToTown">
              <Col md={10}>
                <h6
                  className="pageHead"
                  style={{
                    fontFamily: "Your-Heading-Font",
                    paddingLeft: "2%",
                    paddingRight: "-20px",
                  }}
                >
                  Back To Town Cargo-WO Details
                </h6>
                <div className="table-responsive mt-1" style={{ maxHeight: "400px", overflowY: "auto" }}>
                  <Table className="table table-bordered tariffTableAudit" style={{ border: '2px solid black' }}>
                    <thead>
                      <tr>
                        <th scope="col" className="text-center" style={{ color: "black" }}>Sr No</th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>SB No</th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>Work order No</th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>Work order date</th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>No of Packages</th>
                        <th scope="col" className="text-center" style={{ color: "black" }}>Weight</th>
                      </tr>
                    </thead>

                    <tbody>
                      {backToTownData.map((cargoEntry, index) => (
                        <tr key={index} className="text-center">
                          <td>{index + 1}</td>
                          <td className="text-center align-center">

                            <Input
                              type="text"
                              name='sbNo'
                              value={cargoEntry.sbNo}
                              // onChange={(e) => handleFieldChange(e, index, 'backToTown', 'sbNo')}
                              maxLength={15}
                              className={`inputwidthTuka form-control ${backToTownErrors[index]?.sbNo ? 'error-border' : ''}`}
                            />

                          </td>


                          <td className="text-center align-center">

                            <Input
                              type="text"
                              name='backToTownTransId'
                              value={cargoEntry.backToTownTransId}
                              // onChange={(e) => handleFieldChange(e, index, 'backToTown', 'newVehicleNo')}
                              maxLength={15}
                              className={`inputwidthTuka form-control ${backToTownErrors[index]?.backToTownTransId ? 'error-border' : ''}`}
                            />

                          </td>

                          <td className="text-center align-center">


                            <DatePicker
                              selected={cargoEntry.newBackToTownTransDate}
                              onChange={(date) => handlePaymentDateChange(date, 'backToTown', 'newBackToTownTransDate', index)}
                              id="newGateInDate"
                              name="newGateInDate"
                              placeholderText="Enter Work order Date"
                              dateFormat="dd/MM/yyyy"
                              customInput={
                                <CustomInput
                                  className={`inputwidthTukaAudit form-control ${backToTownErrors[index]?.newBackToTownTransDate ? 'error-border' : ''}`}
                                  onKeyDown={(event) => handleKeyDown(event, 'backToTown', 'newBackToTownTransDate', index)}
                                  onChange={(date) => handlePaymentDateChange(date, 'backToTown', 'newBackToTownTransDate', index)}
                                />
                              } />
                          </td>

                          <td>
                            <Input
                              type="text"
                              name='newBackToTownPackages'
                              value={cargoEntry.newBackToTownPackages}
                              className={`inputwidthTukaTariff form-control ${backToTownErrors[index]?.newBackToTownPackages ? 'error-border' : ''}`}
                              maxLength={8}
                              onChange={(e) => handleFieldChange(e, index, 'backToTown', 'newBackToTownPackages', 'number')}
                            />
                          </td>

                          <td>
                            <Input
                              className={`inputwidthTukaTariff form-control ${backToTownErrors[index]?.newBackToTownWeight ? 'error-border' : ''}`}
                              id="newBackToTownWeight"
                              value={cargoEntry.newBackToTownWeight}
                              name='newBackToTownWeight'
                              onChange={(e) => handleFieldChange(e, index, 'backToTown', 'newBackToTownWeight', 'decimal', 16, 3)}
                              maxLength={20}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                <Row>
                  <Col md={7}>
                    <FormGroup>
                      <label
                        className="forlabel bold-label"
                        htmlFor="sbRequestId"
                      >
                        Audit Remarks <span className="error-message">*</span>
                      </label>
                      <textarea
                        className={`form-control ${backToTownErrors.some(error => error.hasOwnProperty('auditremarks')) ? 'error-border' : ''}`}
                        id="auditremarks"
                        name='auditremarks'
                        value={backToTownData.length > 0 ? backToTownData[0].auditremarks : ''}
                        onChange={(e) => handleFieldChange(e, 0, 'backToTown', 'auditremarks')}
                        maxLength={250}
                        rows={2}
                      ></textarea>
                    </FormGroup>
                  </Col>

                  <Col>
                    <button
                      className="btn btn-outline-primary btn-margin newButton mt-4"
                      style={{ marginRight: 10, fontSize: 13 }}
                      id="submitbtn2"
                      onClick={(e) => handleSave('backToTown')}
                    >
                      <FontAwesomeIcon
                        icon={faSave}
                        style={{ marginRight: "5px" }}
                      />
                      Submit WorkOrder Details
                    </button>
                  </Col>
                </Row>
              </Col>
              < hr />
            </Row>
          )}






          {backToTownOutData && backToTownOutData.length > 0 && (

            <>
              <Row className="backToTownOut">
                <Col md={10}>
                  <h6
                    className="pageHead"
                    style={{
                      fontFamily: "Your-Heading-Font",
                      paddingLeft: "2%",
                      paddingRight: "-20px",
                    }}
                  >
                    Back To Town Cargo-Gateout Details
                  </h6>
                  <div className="table-responsive mt-1" style={{ maxHeight: "400px", overflowY: "auto" }}>
                    <Table className="table table-bordered tariffTableAudit" style={{ border: '2px solid black' }}>
                      <thead>
                        <tr>
                          <th scope="col" className="text-center" style={{ color: "black" }}>Sr No</th>
                          <th scope="col" className="text-center" style={{ color: "black" }}>Out Date</th>
                          <th scope="col" className="text-center" style={{ color: "black" }}>Truck No</th>
                          <th scope="col" className="text-center" style={{ color: "black" }}>No of Packages</th>
                          <th scope="col" className="text-center" style={{ color: "black" }}>Net Weight</th>
                          <th scope="col" className="text-center" style={{ color: "black" }}>Gross  Weight</th>
                        </tr>
                      </thead>

                      <tbody>
                        {backToTownOutData.map((cargoEntry, index) => (
                          <tr key={index} className="text-center">
                            <td>{index + 1}</td>

                            <td className="text-center align-center">
                              <DatePicker
                                selected={cargoEntry.newGateOutDate}
                                onChange={(date) => handlePaymentDateChange(date, 'backToTownOut', 'newGateOutDate', index)}
                                id="newGateOutDate"
                                name="newGateOutDate"
                                placeholderText="Enter Out Date"
                                dateFormat="dd/MM/yyyy"
                                customInput={
                                  <CustomInput
                                    className={`inputwidthTukaAudit form-control ${backToTownOutErrors[index]?.newGateOutDate ? 'error-border' : ''}`}
                                    onKeyDown={(event) => handleKeyDown(event, 'backToTownOut', 'newGateOutDate', index)}
                                    onChange={(date) => handlePaymentDateChange(date, 'backToTownOut', 'newGateOutDate', index)}
                                  />
                                } />
                            </td>


                            <td className="text-center align-center">

                              <Input
                                type="text"
                                name='newTruckNo'
                                value={cargoEntry.newTruckNo}
                                onChange={(e) => handleFieldChange(e, index, 'backToTownOut', 'newTruckNo')}
                                maxLength={15}
                                className={`inputwidthTuka form-control ${backToTownOutErrors[index]?.newTruckNo ? 'error-border' : ''}`}
                              />

                            </td>


                            <td>
                              <Input
                                type="text"
                                name='newQtyTakenOut'
                                value={cargoEntry.newQtyTakenOut}
                                className={`inputwidthTukaTariff form-control ${backToTownOutErrors[index]?.newQtyTakenOut ? 'error-border' : ''}`}
                                maxLength={8}
                                onChange={(e) => handleFieldChange(e, index, 'backToTownOut', 'newQtyTakenOut', 'number')}
                              />
                            </td>

                            <td>
                              <Input
                                className={`inputwidthTukaTariff form-control ${backToTownOutErrors[index]?.backToTownWeight ? 'error-border' : ''}`}
                                id="backToTownWeight"
                                value={cargoEntry.backToTownWeight}
                                name='backToTownWeight'
                                disabled
                                onChange={(e) => handleFieldChange(e, index, 'backToTownOut', 'backToTownWeight', 'decimal', 16, 3)}
                                maxLength={20}
                              />
                            </td>

                            <td>
                              <Input
                                className={`inputwidthTukaTariff form-control ${backToTownOutErrors[index]?.backToTownWeight ? 'error-border' : ''}`}
                                id="backToTownWeight"
                                value={cargoEntry.backToTownWeight}
                                name='backToTownWeight'
                                onChange={(e) => handleFieldChange(e, index, 'backToTownOut', 'backToTownWeight', 'decimal', 16, 3)}
                                maxLength={20}
                                disabled
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  <Row>
                    <Col md={7}>
                      <FormGroup>
                        <label
                          className="forlabel bold-label"
                          htmlFor="sbRequestId"
                        >
                          Audit Remarks <span className="error-message">*</span>
                        </label>
                        <textarea
                          className={`form-control ${backToTownOutErrors.some(error => error.hasOwnProperty('auditremarks')) ? 'error-border' : ''}`}
                          id="auditremarks"
                          name='auditremarks'
                          value={backToTownOutData.length > 0 ? backToTownOutData[0].auditremarks : ''}
                          onChange={(e) => handleFieldChange(e, 0, 'backToTownOut', 'auditremarks')}
                          maxLength={250}
                          rows={2}
                        ></textarea>
                      </FormGroup>
                    </Col>

                    <Col>
                      <button
                        className="btn btn-outline-primary btn-margin newButton mt-4"
                        style={{ marginRight: 10, fontSize: 13 }}
                        id="submitbtn2"
                        onClick={(e) => handleSave('backToTownOut')}
                      >
                        <FontAwesomeIcon
                          icon={faSave}
                          style={{ marginRight: "5px" }}
                        />
                        Submit Cargo Details
                      </button>
                    </Col>
                  </Row>




                </Col>
              </Row>
            </>
          )}

        </div>

      </div>
    </>
  );
}

export default NewExportAudit;
