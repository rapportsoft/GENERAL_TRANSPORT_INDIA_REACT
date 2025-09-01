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
  faGavel,
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

function AuctionNotice({ igm, igmLineNo, igmTrans, blNo, id1, id2, id3, acttab, listOfData, flag, onRequest, searchFlag }) {
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

  const auctionHead = {
    companyId: companyid || "",
    branchId: branchId || "",
    noticeId: "",
    containerNo: "",
    noticeAmndNo: "",
    finalNoticeId: "",
    noticeType: "",
    profitcentreId: "",
    containerSize: "",
    containerType: "",
    gateInId: "",
    gateInDate: null, // Use null for date fields
    noOfPackages: 0, // Default value for numbers
    grossWt: 0.0,
    createdBy: "",
    createdDate: null,
    editedBy: "",
    editedDate: null,
    approvedBy: "",
    approvedDate: null,
    status: "",
    containerStatus: "",
    fileNo: "",
    lotNo: "",
    hsnNo: "",
    auctionStatus: "",
    fileStatus: "",
    invoiceAssesed: "",
    assesmentId: "",
    invoiceNo: "",
    invoiceDate: null,
    creditType: "",
    invoiceCategory: "",
    billAmt: 0.0,
    invoiceAmt: 0.0,
    lastAssesmentId: "",
    lastAssesmentDate: null,
    lastInvoiceNo: "",
    lastInvoiceDate: null,
    lastInvoiceAssesed: "",
    lastBillAmt: 0.0,
    lastInvoiceAmt: 0.0,
};


const auctionDtlD = {
  companyId: companyid || "",
  branchId: branchId || "",
  profitcentreId: "",
  noticeId:"",
  noticeAmndNo: "",
  finalNoticeId: "",
  noticeType: "Prior Notice",
  transType: "",
  noticeDate: new Date(),
  igmTransId: "",
  igmTransDate: null,
  igmNo: "",
  igmDate: null,
  igmLineNo: "",
  viaNo: "",
  shift: "Day",
  source: "",
  boeNo: "",
  boeDate: null,
  vessel: "",
  sa: "",
  importerName: "",
  importerAddress1: "",
  importerAddress2: "",
  importerAddress3: "",
  notifyParty: "",
  notifyPartyAddress1: "",
  notifyPartyAddress2: "",
  notifyPartyAddress3: "",
  commodityDescription: "",
  noOfPackages: null,
  actualNoOfPackages: null,
  typeOfPackage: "",
  grossWt: null,
  uom: "",
  blNo: "",
  blDate: null,
  assessiableAvailable: "",
  accessableValueAsValuation: null,
  rateOfDuty: null,
  amtOfDuty: null,
  duty: null,
  mop: null,
  pmv: null,
  fairValueOfGoods: null,
  bidId: "",
  bidDate: null,
  comments: "",
  cvStatus: "",
  cvCreatedBy: "",
  cvCreatedDate: null,
  cvApprovedBy: "",
  cvApprovedDate: null,
  createdBy: "",
  createdDate: null,
  editedBy: "",
  editedDate: null,
  approvedBy: "",
  approvedDate: null,
  status: "",
  pol: "",
  fileNo: "",
  lotNo: "",
  hsnNo: "",
  auctionStatus: "",
  fileStatus: "",
  tcs: null,
  igst: null,
  sgst: null,
  cgst: null,
  auctionType: "",
  bidAmt: null,
  stcStatus: "",
  acceptRejectStatus: "",
  gstApprovedDate: null,
  cmdApprovedDate: null,
  bidamtApprovedDate: null,
  stcApprovedDate: null,
  customeAcceptRejectDate: null,
  customeOutOfChargeDate: null,
  unitOfWeight:'',
        igmTransDate:'',
        grossWt:'',
        igmDate:'',
        blDate:'',
        packageType:'',
        actualNoOfPackages:'',
        noOfPackages:'',
        shippingAgentName:'',
};


  const [auction, setAuction] = useState(auctionHead);
  const [auctionDtl, setAuctionDtl] = useState(auctionDtlD);

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
        `${ipaddress}api/auction/findAuctionDetails?companyId=${companyid}&branchId=${branchId}&partyName=${id}`,
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

  useEffect(() => {
    if (acttab == "P01401") {
      if (id1 && igm && igmLineNo && igmTrans && searchFlag === 'Y') {
        selectGateSearchRadio(id1, "000", igm, igmLineNo, igmTrans);
      }
      else if (searchFlag === 'Y') {
        getIgmTransIdData(igmTrans);
      }

      if (flag) {
        handleClear();
      }
    }
  }, [id1, igm, igmLineNo, igmTrans, acttab, searchFlag]);

// const fetchIgmTransIdDetails = async (igmLineNo,igm,igmTrans) => {
//   try {
//     const response = await axios.get(`${ipaddress}api/auction/getIgmTransIdDetails`, {
//       params: {
//         companyId: companyid,
//         branchId: branchId,
//         igmLineNo: igmLineNo,
//         igmNo: igm,
//         igmTransId: igmTrans,
//       },
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//     });

//     const data1 = response.data;

//     if (data1 && data1.length > 0) {
//       const data = data1[0];

//       setAuctionDtl((prev) => ({
//         ...prev,
//         igmTransId: data[0],
//         igmTransDate: data[1],
//         igmNo: data[2],
//         igmDate: data[3],
//         profitcentreId: data[4],
//         profitcentreDesc: data[5],
//         vesselId: data[6],
//         vessel: data[7],
//         viaNo: data[8],
//         shippingAgent: data[9],
//         sa: data[9],
//         shippingAgentName: data[10],
//         igmLineNo: data[11],
//         importerName: data[12],
//         importerAddress1: data[13],
//         importerAddress2: data[14],
//         importerAddress3: data[15],
//         notifyParty: data[16],
//         notifyPartyAddress1: data[17],
//         notifyPartyAddress2: data[18],
//         notifyPartyAddress3: data[19],
//         commodityDescription: data[20],
//         noOfPackages: data[21],
//         actualNoOfPackages: data[22],
//         grossWt: data[23],
//         packageType: data[24],
//         blNo: data[25],
//         blDate: data[26],
//         unitOfWeight: data[27],
//       }));

//       // Call fetchData with necessary parameters
//       fetchData(companyid, branchId, data[2], data[0], data[11]);
//     } else {
//       console.error("No data returned from API.");
//     }
//   } catch (error) {
//     console.error("Error fetching IGM Trans ID:", error);
//   }
// };
// useEffect(() => {
//   if(acttab == "P01401")
//     {
    
//       fetchIgmTransIdDetails(igmLineNo,igm,igmTrans);
//     }
//  }, [igm,igmLineNo,igmTrans,acttab]);

  const selectGateSearchRadio = (
    noticeId,
    noticeAmndNo,
    igmNo,
    igmLineNo,
    igmTransId
  ) => {
    closeGateSearchModal();
    axios
      .get(
        `${ipaddress}api/auction/getSavedDataOfHeader?companyId=${companyid}&branchId=${branchId}&noticeId=${noticeId}&noticeAmndNo=${noticeAmndNo}&igmNo=${igmNo}&igmLineNo=${igmLineNo}&igmTransId=${igmTransId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        setNocFlag("edit");
        const data = response.data;
        console.log("getDataByPartyIdAndGstNoYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY", data);
        setAuctionDtl(data);

        setAuctionDtl((pre)=>({
...pre,
shippingAgentName:data.sa,
        }));
        setDisplayItems(response.data);
        fetchDataAfterSave(companyid,branchId,data.noticeId,data.noticeAmndNo);
      })
      .catch((error) => {});
  };


  const [chaSearchedData, setCHASearchedData] = useState([]);

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

  const [nocDtl, setNocDtl] = useState(auctionDtl);
  const handlegateOutChange = (e) => {
    const { name, value } = e.target;

    setAuctionDtl((prevNOC) => {
      const updatedNOC = {
        ...prevNOC,
        [name]: value,
      };
    });

    document.getElementById(name).classList.remove("error-border");
    setNocErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleNocTransDate = (date) => {
    setAuction((prevNoc) => ({
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
    setAuction((prevNoc) => ({
      ...prevNoc,
      doValidityDate: date,
      // deliveryOrderDate: prevNoc.deliveryOrderDate && prevNoc.deliveryOrderDate > date ? null : prevNoc.deliveryOrderDate,
    }));
    setSelectedDate(date); // Make sure selectedDate is updated
  };
  const handleGateOutDate = (date) => {
    setAuction((prevNoc) => ({
      ...prevNoc,
      gateOutDate: date,
    }));
    setSelectedDate(date); // Make sure selectedDate is updated
  };

  const [nocErrors, setNocErrors] = useState({
    igmTransId: "",
    transType: "",
    shift: "",
  });

  const [commodityDtldata, setCommodityDtlData] = useState([]);
  const handleSave = async () => {
    try {
      // Show loading state
      setLoading(true);

      if (auction.status ==='A')
      {
        toast.info("Record is already approved !!!",{
          position:"top-center",
          autoClose:999
        })
        setLoading(false);
        return;
      }
      // Log the data to be saved
      console.log("Data saved:", auction);
      let errors = {};
  
      // Validate Importer Name
      if (!auctionDtl.igmTransId) {
        errors.igmTransId = "IGM Trans Id is required";
      }
  
      // if (!auction.shift) {
      //   errors.shift = "Shift is required";
      // }
  
      if (!auctionDtl.shift) {
        errors.shift = "shift is required";
      }
  
      // Validate Vehicle No
      if (!auctionDtl.transType) {
        errors.transType = "Trans Type is required";
      }
  
    
  
      // Set validation errors if any
      setNocErrors(errors);
  
      // Stop further processing if there are validation errors
      if (Object.keys(errors).length > 0) {
        setLoading(false);
        toast.info("Please fill in all mandatory fields!", {
          position: "top-center",
          autoClose: 999,
        });
        return;
      }
  
      // Log the commodity details
      console.log("Saved Data:", commodityDtldata);
  
      // Prepare the request body
      const requestBody = {
        auction: {
          ...auctionDtl,
        },
        dtl: {
          ...commodityDtldata,
        },
      };
  
      console.log("Request body", requestBody);
  
      // Perform API call to save data
      const response = await axios.post(
        `${ipaddress}api/auction/saveDataOfAuctionNotice?companyId=${companyid}&branchId=${branchId}&user=${userId}&flag=${nocFlag}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const firstItem = response.data;
      console.log("firstItem firstItem firstItem!! firstItem firstItem firstItem firstItem firstItem firstItem firstItem", firstItem);
      setAuctionDtl(firstItem);
      toast.success("Data saved successfully!!", {
        autoClose: 900,
      });
      onRequest();
      fetchDataAfterSave(companyid,branchId,firstItem.noticeId,firstItem.noticeAmndNo);
      setNocFlag("edit");
    } catch (error) {
      // Handle API error
      console.error("Error saving data:", error);
  
      // Show error toast notification
      toast.error(error.response?.data || "Error saving data", {
        autoClose: 900,
      });
    } finally {
      // Turn off loading spinner
      setLoading(false);
    }
  };








  const handlePrint = async (type) => {
    setLoading(true);
        try {
            const response = await axios.get(`${ipaddress}api/auction/getPrintOfFirstNotice?companyId=${companyid}&branchId=${branchId}&uname=${username}&type=${type}&cname=${companyname}&bname=${branchname}&igmNo=${auctionDtl.igmNo}&igmLineNo=${auctionDtl.igmLineNo}&noticeId=${auctionDtl.noticeId}`,
            {
              headers:{
                Authorization: `Bearer ${jwtToken}`
              }
            });
    
            console.log("Response Data");
            console.log(response.data);
    
            if (type === 'PDF') 
            {
  
                const pdfBase64 = response.data;
    
                const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
    
                const blobUrl = URL.createObjectURL(pdfBlob);
    
                const downloadLink = document.createElement('a');
                downloadLink.href = blobUrl;
                downloadLink.download = 'FIRST NOTICE';
                downloadLink.style.display = 'none';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                window.URL.revokeObjectURL(blobUrl);
    
                toast.success("Downloading PDF!", {
                  position: 'top-center',
                    autoClose: 800,
                });
            } 
            else if (type === 'PRINT')
            {
                const pdfBase64 = response.data;
    
                const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
    
                const blobUrl = URL.createObjectURL(pdfBlob);
    
                window.open(blobUrl, '_blank');
            } 
            else
            {
                throw new Error('Invalid print type');
            }
        }
         catch (error) 
        {
            console.error('Error in handlePrint:', error.message);
         
        }finally
        {
          setLoading(false);
        }
    };
  
  const handleClear = () => {
    setErrorsTable("");
    setAuctionDtl(auctionDtlD);
    document.getElementById("igmTransId").classList.remove("error-border");
    document.getElementById("shift").classList.remove("error-border");
    document.getElementById("transType").classList.remove("error-border");

    setNocErrors("");
    setNocFlag("add");
    setSelectedItems([]);
    setDisplayItems([]);
    setCommodityDtlData([]);
  };


  const defaultOption = { value: "N00003", label: "NOC BOND" };

  const handleChangeProfitCenter = (selectedOption) => {
    // Update the state or handle the change as needed
    setAuction((prevState) => ({
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

  const [igmTrandIdData, setIgmTransIdData] = useState([]);

  const handleIgmTransIdChange = async (selectedOption, { action }) => {
    if (action === "clear") {
      console.log("respone datacagahgdhsagdhs", selectedOption);

      setAuctionDtl((prev) => ({
        ...prev,
        companyId: companyid || "",
        branchId: branchId || "",
        profitcentreId: "",
        noticeId: '',
        noticeAmndNo: "",
        finalNoticeId: "",
        noticeType: "Prior Notice",
        transType: "",
        noticeDate: null,
        igmTransId: "",
        igmTransDate: null,
        igmNo: "",
        igmDate: null,
        igmLineNo: "",
        viaNo: "",
        shift: "Day",
        source: "",
        boeNo: "",
        boeDate: null,
        vessel: "",
        sa: "",
        importerName: "",
        importerAddress1: "",
        importerAddress2: "",
        importerAddress3: "",
        notifyParty: "",
        notifyPartyAddress1: "",
        notifyPartyAddress2: "",
        notifyPartyAddress3: "",
        commodityDescription: "",
        noOfPackages: null,
        actualNoOfPackages: null,
        typeOfPackage: "",
        grossWt: null,
        uom: "",
        blNo: "",
        blDate: null,
        assessiableAvailable: "",
        accessableValueAsValuation: null,
        rateOfDuty: null,
        amtOfDuty: null,
        duty: null,
        mop: null,
        pmv: null,
        fairValueOfGoods: null,
        bidId: "",
        bidDate: null,
        comments: "",
        cvStatus: "",
        cvCreatedBy: "",
        cvCreatedDate: null,
        cvApprovedBy: "",
        cvApprovedDate: null,
        createdBy: "",
        createdDate: null,
        editedBy: "",
        editedDate: null,
        approvedBy: "",
        approvedDate: null,
        status: "",
        pol: "",
        fileNo: "",
        lotNo: "",
        hsnNo: "",
        auctionStatus: "",
        fileStatus: "",
        tcs: null,
        igst: null,
        sgst: null,
        cgst: null,
        auctionType: "",
        bidAmt: null,
        stcStatus: "",
        acceptRejectStatus: "",
        gstApprovedDate: null,
        cmdApprovedDate: null,
        bidamtApprovedDate: null,
        stcApprovedDate: null,
        customeAcceptRejectDate: null,
        customeOutOfChargeDate: null,
        unitOfWeight:'',
        igmTransDate:'',
        grossWt:'',
        igmDate:'',
        blDate:'',
        packageType:'',
        actualNoOfPackages:'',
        noOfPackages:'',
        shippingAgentName:'',
      }));

      setCommodityDtlData([]);
      document.getElementById("igmTransId").classList.remove("error-border");
      setNocErrors((prevErrors) => ({
        ...prevErrors,
        ["igmTransId"]: "",
      }));

      setNocErrors((prevErrors)=>({
        ...prevErrors,
        igmTransId:"",
      }));

    } else {
      console.log("respone datacagahgdhsagdhs", selectedOption);
      document.getElementById("igmTransId").classList.remove("error-border");
      setNocErrors((prevErrors) => ({
        ...prevErrors,
        ["igmTransId"]: "",
      }));

      axios
      .get(`${ipaddress}api/auction/getIgmTransIdDetails`, {
        params: {
          companyId: companyid,
          branchId: branchId,
          igmLineNo: selectedOption.igmLineNo,
          igmNo: selectedOption.igm, // Using correct field here
          igmTransId: selectedOption.value,
        },
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        const data1 = response.data;
        

        if (data1 && data1.length > 0) {
          const data = data1[0];
          console.log("response.data length:", data);
          // Setting auction data with the received values
          setAuctionDtl((prev) => ({
            ...prev,
            igmTransId: data[0], // a.IGM_Trans_Id
            igmTransDate: data[1],
          //   igmTransDate: data[1]   ? format(
          //     new Date(data[1]),
          //     "dd/MM/yyyy HH:mm"
          //   )
          // : "N/A" , // DATE_FORMAT(e.Doc_Date, '%d %b %Y')
            igmNo: data[2], // a.IGM_No
          //   igmDate: data[3] ? format(
          //     new Date(data[3]),
          //     "dd/MM/yyyy"
          //   )
          // : "N/A", // DATE_FORMAT(e.IGM_Date, '%d %b %Y')
          igmDate: data[3],
             profitcentreId: data[4], // a.Profitcentre_Id
            profitcentreDesc: data[5], // b.Profitcentre_Desc
            vesselId: data[6], // e.Vessel_Id
            vessel: data[7], // c.Vessel_Name
            viaNo: data[8], // a.Via_No
            shippingAgent: data[9], // e.Shipping_Agent
            sa: data[9], // d.Party_Name
            shippingAgentName: data[10], // d.Party_Name
            igmLineNo: data[11], // a.IGM_Line_No
            importerName: data[12], // a.Importer_Name
            importerAddress1: data[13], // a.Importer_Address1
            importerAddress2: data[14], // a.Importer_Address2
            importerAddress3: data[15], // a.Importer_Address3
            notifyParty: data[16], // a.Notify_Party_Name
            notifyPartyAddress1: data[17], // a.Notified_Address1
            notifyPartyAddress2: data[18], // a.Notified_Address2
            notifyPartyAddress3: data[19], // a.Notified_Address3
            commodityDescription: data[20], // a.Commodity_Description
            noOfPackages: data[21], // a.No_Of_Packages
            actualNoOfPackages: data[22], // a.Actual_No_Of_Packages
            grossWt: data[23], // a.Gross_Weight
            typeOfPackage: data[24], // a.Type_Of_Package
            blNo: data[25], // a.BL_No
            blDate: data[26],
          //   blDate: data[26] ? format(
          //     new Date(data[26]),
          //     "dd/MM/yyyy"
          //   )
          // : "N/A", // DATE_FORMAT(a.BL_Date, '%d %b %Y')
          uom: data[27], // a.Unit_Of_Weight
          }));

          fetchData(companyid,branchId,data[2],data[0],data[11]);
        } else {
          console.error("No data returned from API.");
        }
      })
      .catch((error) => {
        console.error("Error fetching IGM Trans ID:", error);
      });
    

    }
  };

  const getIgmTransIdData = (val) => {
    if (val === "") {
      setIgmTransIdData([]);
      return;
    }
    axios
      .get(
        `${ipaddress}api/auction/getIgmTransId?companyId=${companyid}&branchId=${branchId}&value=${val}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;

        console.log("response.data", data.length);
        const portOptions = data.map((port) => ({
          value: port[0],
         label: `${port?.[1]}-${port?.[2]}-${port?.[0]}`,
          igmTrans: port[0],
          igm: port[1],
          igmLineNo: port[2],
        }));

       if (igm && igmTrans && igmLineNo) {
  handleIgmTransIdChange(portOptions[0], { action: "select" });
}


        setIgmTransIdData(portOptions);

      })
      .catch((error) => {});
  };

  const [portId, setPortId] = useState("");
  const [portName, setPortName] = useState("");

  const [impId, setImpId] = useState("");
  const [impName, setImpName] = useState("");

  const fetchData = async (companyid, branchId, igmNo,igmTransId,igmLineNo) => {
    try {
      const response = await fetch(
        `${ipaddress}api/auction/getContainersDetails?companyId=${companyid}&branchId=${branchId}&igmNo=${igmNo}&igmTransId=${igmTransId}&igmLineNo=${igmLineNo}`,
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

  const fetchDataAfterSave = async (companyid, branchId,noticeId, ammendNo) => {
    try {
      const response = await fetch(
        `${ipaddress}api/auction/getContainerDetailsAfterSave?companyId=${companyid}&branchId=${branchId}&noticeId=${noticeId}&ammendNo=${ammendNo}`,
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
                          Search 
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
    <th scope="col">Auction Notice No</th>
    <th scope="col">Amnd No</th>
    <th scope="col">Auction Notice Date</th>
    <th scope="col">Notice Type</th>
    <th scope="col">IGM Trans Id</th>
    <th scope="col">IGM No</th>
    <th scope="col">IGM Date</th>
    <th scope="col">IGM Line No</th>
    <th scope="col">BL NO</th>
    <th scope="col">No Of Packages</th>
    <th scope="col">Gross Wt</th>
    <th scope="col">Trans Type</th>
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
                                    item.noticeId,
                                    item.noticeAmndNo,
                                    item.igmNo,
                                    item.igmLineNo,
                                    item.igmTransId
                                  )
                                }
                                value={item[0]}
                              />
                            </td>
                            <td>{item.noticeId}</td>
                            <td>{item.noticeAmndNo}</td>
                            <td>
                              {item.noticeDate
                                ? format(
                                    new Date(item.noticeDate),
                                    "dd/MM/yyyy HH:mm"
                                  )
                                : "N/A"}
                            </td>
                            <td>{item.noticeType}</td>
                            <td>{item.igmTransId}</td>
                            <td>{item.igmNo}</td>
                            <td>
                              {item.igmDate
                                ? format(
                                    new Date(item.igmDate),
                                    "dd/MM/yyyy HH:mm"
                                  )
                                : "N/A"}
                            </td>
                            <td>{item.igmLineNo}</td>
                         
                            <td>{item.blNo}</td>
                            <td>{item.noOfPackages}</td>
                            <td>{item.grossWt}</td>
                            <td>{item.transType}</td>
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
              <Row>

              
              
              </Row>











              <Row>
              <Col md={2}>
                 
                 <Row>
                   <Col md={8}>
                   <FormGroup>
                   <label className="forlabel bold-label" htmlFor="noticeId"> Auction No <span className="error-message">*</span></label>
                     <input
                       className="form-control"
                       type="text"
                       id="noticeId"
                       name="noticeId"
                       value={auctionDtl.noticeId}
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
      <label className="forlabel bold-label" htmlFor="noticeAmndNo"> Auction Ammend No </label>
      <input className="form-control" type="text" id="noticeAmndNo" name="noticeAmndNo" value={auctionDtl.noticeAmndNo} readOnly style={{ backgroundColor: "#E0E0E0" }} />
    </FormGroup>
  </Col>

  <Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="noticeDate"> Auction Notice Date </label>
      <input
  className="form-control"
  type="text"
  id="noticeDate"
  name="noticeDate"
  value={
    auctionDtl.noticeDate
      ? format(new Date(auctionDtl.noticeDate), "dd/MM/yyyy HH:mm")
      : " "
  }
  readOnly
  style={{ backgroundColor: "#E0E0E0" }}
/>

    </FormGroup>
  </Col>

  

 


<Col md={2}>
  <FormGroup>
    <label className="forlabel bold-label" htmlFor="shift"> Shift <span className="error-message">*</span></label>
    <select
      className="form-control"
      id="shift"
      name="shift"
      value={auctionDtl.shift}
      style={{ border: nocErrors.shift
        ? "1px solid red"
        : "1px solid #ccc", // Red border on error
      }}
      // onChange={(e) => setAuctionDtl((prev) => ({ ...prev, shift: e.target.value }))}
      onChange={(e) => {
        const value = e.target.value;

        setAuctionDtl((prev) => ({ ...prev, shift: value }));

        // Remove error only when a valid value is selected
        if (value) {
          setNocErrors((prevErrors) => ({ ...prevErrors, shift: "" }));
        }
      }}
    >
      <option value="">Select Shift</option>
      <option value="Day">Day</option>
      <option value="Second">Second</option>
      <option value="Third">Third</option>
    </select>
    <div style={{ color: "red" }} className="error-message">
                      {nocErrors.shift}
                    </div>
  </FormGroup>
</Col>
<Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="status"> Status </label>
      <input className="form-control" type="text" id="status" name="status" value={auctionDtl.status ==="A" ? "Approved" :''} readOnly style={{ backgroundColor: "#E0E0E0" }} />
    </FormGroup>
  </Col>
  <Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="createdBy"> Created By </label>
      <input className="form-control" type="text" id="createdBy" name="createdBy" value={auctionDtl.createdBy} readOnly style={{ backgroundColor: "#E0E0E0" }} />
    </FormGroup>
  </Col>
</Row>

<Row>
<Col md={2}>
                  <FormGroup>
                    <label className="forlabel bold-label" htmlFor="igmTransId">
                    IGM Trans Id <span className="error-message">*</span>
                    </label>
                    <Select
                      value={{
                        value: auctionDtl.igmTransId,
                        label:  auctionDtl.igmTransId,
                        // label:  `${auctionDtl.igmNo}-${auctionDtl.igmLineNo}-${auctionDtl.igmTransId}`,
                      }}
                      onChange={handleIgmTransIdChange}
                      onInputChange={getIgmTransIdData}
                      options={igmTrandIdData}
                      placeholder="Select IGM"
                      isClearable
                      id="igmTransId"
                      vesselName="igmTransId"
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          height: 32, // Set height
                          minHeight: 32, // Set minimum height
                          //border: state.isFocused ? "1px solid #ccc" : "1px solid #ccc",
                          border: nocErrors.igmTransId
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
                      {nocErrors.igmTransId}
                    </div>
                  </FormGroup>
                </Col>
                <Col md={2}>
  <FormGroup>
    <label className="forlabel bold-label" htmlFor="transType">Trans Type <span className="error-message">*</span></label>
    <select 
      className="form-control"
      id="transType"
      name="transType"
      value={auctionDtl.transType}
      // onChange={(e) => setAuctionDtl((prev) => ({ ...prev, transType: e.target.value }))}
      style={{ border: nocErrors.transType
        ? "1px solid red"
        : "1px solid #ccc", // Red border on error
      }}
      onChange={(e) => {
        const value = e.target.value;
        setAuctionDtl((prev) => ({ ...prev, transType: value }));

        // Remove error only when a valid value is selected
        if (value) {
          setNocErrors((prevErrors) => ({ ...prevErrors, transType: "" }));
        }
      }}
    >
      <option value="">Select Trans Type</option>
      <option value="CON">Import Container</option>
      <option value="CRG">Import Cargo</option>
      <option value="BON">Bonding Auction</option>
    </select>
    <div style={{ color: "red" }} className="error-message">
                      {nocErrors.transType}
                    </div>
  </FormGroup>
</Col>
  <Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="igmTransDate"> IGM Trans Date </label>
      <input className="form-control" type="text" id="igmTransDate" name="igmTransDate" value={auctionDtl.igmTransDate
       ? format(new Date(auctionDtl.igmTransDate), "dd/MM/yyyy HH:mm")
       : "N/A"} readOnly style={{ backgroundColor: "#E0E0E0" }} />
    </FormGroup>
  </Col>

  

  <Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="igmNo"> IGM No </label>
      <input className="form-control" type="text" id="igmNo" name="igmNo" value={auctionDtl.igmNo} readOnly style={{ backgroundColor: "#E0E0E0" }} onChange={handlegateOutChange} />
    </FormGroup>
  </Col>

  <Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="igmDate"> IGM Date </label>
      <input className="form-control" type="text" id="igmDate" name="igmDate" value={auctionDtl.igmDate  ? format(new Date(auctionDtl.igmDate), "dd/MM/yyyy HH:mm")
       : "N/A"} readOnly style={{ backgroundColor: "#E0E0E0" }} />
    </FormGroup>
  </Col>

 
  <Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="approvedBy"> Approved By </label>
      <input className="form-control" type="text" id="approvedBy" name="approvedBy" value={auctionDtl.approvedBy} readOnly style={{ backgroundColor: "#E0E0E0" }} />
    </FormGroup>
  </Col>
</Row>

<Row>
  <Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="noticeType"> Notice Type </label>
      <input className="form-control" type="text" id="noticeType" name="noticeType" value={auctionDtl.noticeType ==="P" ? 'Prior Notice ':'Prior Notice '} readOnly style={{ backgroundColor: "#E0E0E0" }} onChange={handlegateOutChange} />
    </FormGroup>
  </Col>

  <Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="viaNo"> VIA No </label>
      <input className="form-control" type="text" id="viaNo" name="viaNo" value={auctionDtl.viaNo} readOnly style={{ backgroundColor: "#E0E0E0" }} onChange={handlegateOutChange} />
    </FormGroup>
  </Col>

  <Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="vessel"> Vessel  </label>
      <input className="form-control" type="text" id="vessel" name="vessel" value={auctionDtl.vessel} readOnly style={{ backgroundColor: "#E0E0E0" }} onChange={handlegateOutChange} />
    </FormGroup>
  </Col>

  <Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="igmLineNo"> IGM Line No </label>
      <input className="form-control" type="text" id="igmLineNo" name="igmLineNo" value={auctionDtl.igmLineNo} readOnly style={{ backgroundColor: "#E0E0E0" }} />
    </FormGroup>
  </Col>


  <Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="blNo"> BL No </label>
      <input className="form-control" type="text" id="blNo" name="blNo" value={auctionDtl.blNo} readOnly style={{ backgroundColor: "#E0E0E0" }} onChange={handlegateOutChange} />
    </FormGroup>
  </Col>

  <Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="blDate"> BL Date </label>
      <input className="form-control" type="text" id="blDate" name="blDate" value={auctionDtl.blDate
       ? format(new Date(auctionDtl.blDate), "dd/MM/yyyy HH:mm")
       : "N/A"} readOnly style={{ backgroundColor: "#E0E0E0" }} />
    </FormGroup>
  </Col>
  
</Row>

<Row>
<Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="commodityDescription"> Commodity Description </label>
      <input className="form-control" type="text" id="commodityDescription" name="commodityDescription" value={auctionDtl.commodityDescription} readOnly style={{ backgroundColor: "#E0E0E0" }} />
    </FormGroup>
  </Col>

  <Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="uom"> Unit Of Weight </label>
      <input className="form-control" type="text" id="uom" name="uom" value={auctionDtl.uom} readOnly style={{ backgroundColor: "#E0E0E0" }} />
    </FormGroup>
  </Col>



  <Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="shippingAgentName"> SA </label>
      <input className="form-control" type="text" id="shippingAgentName" name="shippingAgentName" value={auctionDtl.shippingAgentName} readOnly style={{ backgroundColor: "#E0E0E0" }} />
    </FormGroup>
  </Col>
  <Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="grossWt"> Gross Weight </label>
      <input className="form-control" type="text" id="grossWt" name="grossWt" value={auctionDtl.grossWt} readOnly style={{ backgroundColor: "#E0E0E0" }} onChange={handlegateOutChange} />
    </FormGroup>
  </Col>
  <Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="typeOfPackage"> Package Type </label>
      <input className="form-control" type="text" id="typeOfPackage" name="typeOfPackage" value={auctionDtl.typeOfPackage} readOnly style={{ backgroundColor: "#E0E0E0" }} />
    </FormGroup>
  </Col>
    
  <Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="finalNoticeId"> Final Notice Id </label>
      <input className="form-control" type="text" id="finalNoticeId" name="finalNoticeId" value={auctionDtl.finalNoticeId} readOnly style={{ backgroundColor: "#E0E0E0" }} onChange={handlegateOutChange} />
    </FormGroup>
  </Col>
</Row>

<Row>
<Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="notifyParty"> Notify Party </label>
      <input className="form-control" type="text" id="notifyParty" name="notifyParty" value={auctionDtl.notifyParty} readOnly style={{ backgroundColor: "#E0E0E0" }} />
    </FormGroup>
  </Col>

  <Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="notifyPartyAddress1"> Notify Party Address1 </label>
      <input className="form-control" type="text" id="notifyPartyAddress1" name="notifyPartyAddress1" value={auctionDtl.notifyPartyAddress1} readOnly style={{ backgroundColor: "#E0E0E0" }} />
    </FormGroup>
  </Col>
  <Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="notifyPartyAddress2"> Notify Party Address2 </label>
      <input className="form-control" type="text" id="notifyPartyAddress2" name="notifyPartyAddress2" value={auctionDtl.notifyPartyAddress2} readOnly style={{ backgroundColor: "#E0E0E0" }} />
    </FormGroup>
  </Col>
  <Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="notifyPartyAddress3"> Notify Party Address3 </label>
      <input className="form-control" type="text" id="notifyPartyAddress3" name="notifyPartyAddress3" value={auctionDtl.notifyPartyAddress3} readOnly style={{ backgroundColor: "#E0E0E0" }} />
    </FormGroup>
  </Col>

  <Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="noOfPackages"> No Of Packages </label>
      <input className="form-control" type="text" id="noOfPackages" name="noOfPackages" value={auctionDtl.noOfPackages} readOnly style={{ backgroundColor: "#E0E0E0" }} />
    </FormGroup>
  </Col>





  <Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="actualNoOfPackages"> Actual No Of Packages </label>
      <input className="form-control" type="text" id="actualNoOfPackages" name="actualNoOfPackages" value={auctionDtl.actualNoOfPackages} readOnly style={{ backgroundColor: "#E0E0E0" }} />
    </FormGroup>
  </Col>


</Row>

<Row>
<Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="importerName"> Importer Name </label>
      <input className="form-control" type="text" id="importerName" name="importerName" value={auctionDtl.importerName} readOnly style={{ backgroundColor: "#E0E0E0" }} />
    </FormGroup>
  </Col>


<Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="importerAddress1"> Importer Address1 </label>
      <input className="form-control" type="text" id="importerAddress1" name="importerAddress1" value={auctionDtl.importerAddress1} readOnly style={{ backgroundColor: "#E0E0E0" }} />
    </FormGroup>
  </Col>
  <Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="importerAddress2"> Importer Address2 </label>
      <input className="form-control" type="text" id="importerAddress2" name="importerAddress2" value={auctionDtl.importerAddress2} readOnly style={{ backgroundColor: "#E0E0E0" }} />
    </FormGroup>
  </Col>

  <Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="importerAddress3"> Importer Address3 </label>
      <input className="form-control" type="text" id="importerAddress3" name="importerAddress3" value={auctionDtl.importerAddress3} readOnly style={{ backgroundColor: "#E0E0E0" }} />
    </FormGroup>
  </Col>

  <Col md={2}>
    <FormGroup>
      <label className="forlabel bold-label" htmlFor="profitcentre"> Profitcentre </label>
      <input className="form-control" type="text" id="profitcentre" name="profitcentre" value={auctionDtl.profitcentreId} readOnly style={{ backgroundColor: "#E0E0E0" }} />
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
                  disabled={auctionDtl.status === "A"}
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

                {auctionDtl.status ==="A" ?
(
<button
                className="btn btn-outline-primary btn-margin newButton"
              style={{ marginRight: 10 }}
              id="submitbtn2"
              onClick={()=> handlePrint('PRINT')}
            >
              <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
              Print
            </button>

):null}

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
                  paddingRight: "-18px",
                }}
              >
                <FontAwesomeIcon
                  icon={faGavel}
                  style={{
                    marginRight: "8px",
                    color: "black",
                  }}
                />
                Auction Notice Details
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
                      Gate In Date
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
                      Gross Wt
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {commodityDtldata.map((rowData, index) => (
                    <tr key={index}>
                      <td  style={{ textAlign:'center' }}>{index + 1}</td>
                      {/* <td>{`${rowData.nocNo}-${rowData.igmLineNo}`}</td> */}
                      <td style={{ textAlign:'center' }}>{rowData.containerNo}</td>
                      <td style={{ textAlign:'center' }}>{rowData.containerSize}</td>
                      <td style={{ textAlign:'center' }}>{rowData.containerType}</td>
                      <td style={{ textAlign:'center' }}>{rowData.gateInDate
                      
                      ? format(
                        new Date(rowData.gateInDate),
                        "dd/MM/yyyy HH:mm"
                      )
                    : "N/A"
                      
                      }</td>
                      <td style={{ textAlign:'center' }}>{rowData.noOfPackages}</td>
                      <td style={{ textAlign:'center' }}>{rowData.containerWeight ||rowData.grossWt }</td>
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


export default AuctionNotice;
