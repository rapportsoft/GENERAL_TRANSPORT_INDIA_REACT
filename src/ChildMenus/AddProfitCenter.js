import AuthContext from "../Components/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import ipaddress from "../Components/IpAddress";
import {
  Card,
  CardBody,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRefresh,
  faSave,
  faPlus,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/style.css";
import "../Components/Style.css";
import { toast } from "react-toastify";
import useAxios from '../Components/useAxios';
export default function AddProfitCenter() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const axios = useAxios();
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
    tabMenus,
    userRights,
  } = useContext(AuthContext);

  const location = useLocation();

  const [flag, setFlag] = useState(location.state?.flag);
  const [pid, setPid] = useState(location.state?.profitcentreId);

  const getPartyData = () => {
    const flag1 = location.state?.flag;
    const id = location.state?.profitcentreId;

    if (flag1 === "edit") {
      axios
        .get(
          `${ipaddress}api/profitcentres/getDataById?companyId=${companyid}&branchId=${branchId}&profitcentreId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .then((response) => {
          setProfitData(response.data);
          getAddreses(id);
          getCountry(response.data.country, flag1);
        })
        .catch((error) => {});
    }
  };

  useEffect(() => {
    getPartyData();
  }, []);

  const [partyTypes, setPartyTypes] = useState([]);
  const [vendorTypes, setVendorTypes] = useState([]);
  const [country, setCountry] = useState([]);

  const getPartyTypes = () => {
    axios
      .get(`${ipaddress}jardetail/partyTypes?cid=${companyid}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setPartyTypes(response.data);
      })
      .catch((error) => {});
  };

  const getVendorTypes = () => {
    axios
      .get(`${ipaddress}jardetail/vendorTypes?cid=${companyid}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setVendorTypes(response.data);
      })
      .catch((error) => {});
  };

  const [countryId, setCountryId] = useState("IN");
  const [countryName, setCountryName] = useState("India");

  const getCountry = (id, flag1) => {
    axios
      .get(`${ipaddress}jardetail/getCountry?cid=${companyid}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        const data = response.data;
        const partyOptions = data.map((party) => ({
          value: party.jarDtlId,
          label: party.jarDtlDesc,
        }));
        setCountry(partyOptions);

        if (flag1 === "edit") {
          const pname = partyOptions.find((item) => item.value === id);
          setCountryId(id);
          setCountryName(pname.label);
        }
      })
      .catch((error) => {});
  };

  const handleCountryChange = async (selectedOption, { action }) => {
    if (action === "clear") {
      setCountryName("India");
      setCountryId("IN");
    } else {
      setCountryName(selectedOption ? selectedOption.label : "");
      setCountryId(selectedOption ? selectedOption.value : "");
    }
  };

  const [branches, setBranches] = useState([]);
  const [branchid, setBranchid] = useState("");
  const [branchName, setBranchname] = useState("");

  const getBranch = () => {
    axios
      .get(`${ipaddress}jardetail/getBranch?cid=${companyid}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        const data = response.data;
        const partyOptions = data.map((party) => ({
          value: party.jarDtlId,
          label: party.jarDtlDesc,
          code: party.comments,
        }));
        setBranches(partyOptions);
      })
      .catch((error) => {});
  };

  const handleBranchChange = async (selectedOption, { action }) => {
    if (action === "clear") {
      setBranchname("");
      setBranchid("");
    } else {
      setBranchname(selectedOption ? selectedOption.label : "");
      setBranchid(selectedOption ? selectedOption.value : "");
    }
  };

  const [defaultBranches, setDefaultBranches] = useState([]);

  const getDefaultBranches = () => {
    axios
      .get(`${ipaddress}party/getDefaultBranch?cid=${companyid}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setDefaultBranches(response.data);
      })
      .catch((error) => {});
  };

  const [termId, setTermId] = useState([]);

  const getTermId = () => {
    axios
      .get(`${ipaddress}jardetail/getTermId?cid=${companyid}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setTermId(response.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getPartyTypes();
    getVendorTypes();
    getCountry();
    getDefaultBranches();
    getTermId();
    getBranch();
  }, []);

  function isValidatePAN(panNumber) {
    // Define the regular expression for PAN validation
    var companyPanRegex = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]$/;

    // Check if the PAN number matches the regular expression
    if (companyPanRegex.test(panNumber)) {
      return true; // Company PAN is valid
    } else {
      return false; // Company PAN is not valid
    }
  }

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobileNumber = (number) => {
    // Regular expression for a 10-digit mobile number
    const regex = /^\d{10}$/;
    return regex.test(number);
  };

  const validateGSTNumber = (gstNumber) => {
    // Regular expression for GST number validation
    const gstRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstRegex.test(gstNumber);
  };

  const [isModalOpenForAddress, setIsModalOpenForAddress] = useState(false);
  const [addressStatus, setAddressStatus] = useState("");

  const handleOpenAddressModal = () => {
    let errors = {};
    if (!profitData.partyName) {
      errors.partyName = "Party name is required";
      document.getElementById("partyName").classList.add("error-border");
    }
    if (!profitData.customerCode) {
      errors.customerCode = "Customer code is required";
      document.getElementById("customerCode").classList.add("error-border");
    }
    if (!profitData.custLedgerCode) {
      errors.custLedgerCode = "Customer ledger code is required";
      document.getElementById("custLedgerCode").classList.add("error-border");
    }
    if (!profitData.panNo) {
      errors.panNo = "PAN no is required";
      document.getElementById("panNo").classList.add("error-border");
    } else {
      if (!isValidatePAN(profitData.panNo)) {
        errors.panNo = "Invalid PAN No";
        document.getElementById("panNo").classList.add("error-border");
      }
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("Please fill in the required fields.", {
        autoClose: 1000,
      });
      return;
    }

    if (profitData.operationalMail) {
      if (!validateEmail(profitData.operationalMail)) {
        toast.error("Invalid Operational Mail Id.", {
          autoClose: 1000,
        });
        return;
      }
    }

    if (profitData.financeMail) {
      if (!validateEmail(profitData.financeMail)) {
        toast.error("Invalid Finance Mail Id.", {
          autoClose: 1000,
        });
        return;
      }
    }

    if (profitData.codecoMail) {
      if (!validateEmail(profitData.codecoMail)) {
        toast.error("Invalid Codeco Mail Id.", {
          autoClose: 1000,
        });
        return;
      }
    }

    if (profitData.codecoMail) {
      if (!validateEmail(profitData.codecoMail)) {
        toast.error("Invalid Codeco Mail Id.", {
          autoClose: 1000,
        });
        return;
      }
    }

    if (profitData.operationalMailCc) {
      if (!validateEmail(profitData.operationalMailCc)) {
        toast.error("Invalid Operational CC Mail Id.", {
          autoClose: 1000,
        });
        return;
      }
    }

    if (profitData.operationalMailBcc) {
      if (!validateEmail(profitData.operationalMailBcc)) {
        toast.error("Invalid Operational BCC Mail Id.", {
          autoClose: 1000,
        });
        return;
      }
    }

    if (profitData.agtOperationalMailTo) {
      if (!validateEmail(profitData.agtOperationalMailTo)) {
        toast.error("Invalid Auction Mail Id.", {
          autoClose: 1000,
        });
        return;
      }
    }

    if (profitData.contactEmail) {
      if (!validateEmail(profitData.contactEmail)) {
        toast.error("Invalid Contact Mail Id.", {
          autoClose: 1000,
        });
        return;
      }
    }

    if (profitData.exportToMail) {
      if (!validateEmail(profitData.exportToMail)) {
        toast.error("Invalid Export To Mail Id.", {
          autoClose: 1000,
        });
        return;
      }
    }

    if (profitData.phoneNo) {
      if (!validateMobileNumber(profitData.phoneNo)) {
        toast.error("Invalid Phone No.", {
          autoClose: 1000,
        });
        return;
      }
    }

    if (profitData.contactPhone) {
      if (!validateMobileNumber(profitData.contactPhone)) {
        toast.error("Invalid Contact Phone No.", {
          autoClose: 1000,
        });
        return;
      }
    }

    if (
      profitData.agt !== "Y" &&
      profitData.biddr !== "Y" &&
      profitData.cha !== "Y" &&
      profitData.exp !== "Y" &&
      profitData.frw !== "Y" &&
      profitData.imp !== "Y" &&
      profitData.lin !== "Y" &&
      profitData.vnd !== "Y"
    ) {
      toast.error("Please atleast select one party type", {
        autoClose: 1000,
      });
      return;
    }

    if (profitData.vnd === "Y") {
      if (
        profitData.acton !== "Y" &&
        profitData.crtlbr !== "Y" &&
        profitData.dstlbr !== "Y" &&
        profitData.dstrct !== "Y" &&
        profitData.eqpmsp !== "Y" &&
        profitData.fmgtN !== "Y" &&
        profitData.scnopr !== "Y" &&
        profitData.stuflb !== "Y" &&
        profitData.subctr &&
        profitData.survey !== "Y" &&
        profitData.trns !== "Y" &&
        profitData.valer !== "Y"
      ) {
        toast.error("Please atleast select one vendor type", {
          autoClose: 1000,
        });
        return;
      }
    }

    addressDetails.srNo = addresses.length + 1;
    setIsModalOpenForAddress(true);
    setAddressStatus("add");
  };

  const closeModalOpenForAddress = () => {
    setIsModalOpenForAddress(false);
    setAddressStatus("");
    document.getElementById("address1").classList.remove("error-border");
    document.getElementById("pin").classList.remove("error-border");
    document.getElementById("state").classList.remove("error-border");
    document.getElementById("gstNo").classList.remove("error-border");

    setFormErrors1({
      address1: "",
      pin: "",
      state: "",
      gstNo: "",
    });

    setaddressDetails({
      srNo: "",
      address1: "",
      address2: "",
      address3: "",
      city: "",
      pin: "",
      state: "",
      gstNo: "",
      customerType: "Registered",
      defaultChk: "N",
    });
    setBranchid("");
    setBranchname("");
  };

  const back = () => {
    navigate(`/master/profitCenter`);
  };

  const [profitData, setProfitData] = useState({
    companyId: "",
    profitcentreId: "",
    profitcentreDesc: "",
    vesselMandatory: "N",
    joMandatory: "N",
    containerMandatory: "N",
    status: "",
    createdBy: "",
    createdDate: null,
    editedBy: "",
    editedDate: null,
    approvedBy: "",
    approvedDate: null,
  });

  const handlePartyChange = (event) => {
    const { name, value } = event.target;
    let sanitizedValue = value;

    if (
      [
        "phoneNo",
        "creditLimit",
        "crPeriod",
        "currentBal",
        "contactPhone",
        "lclAreaOccupied",
        "imphAreaOccupied",
        "exphAreaOccupied",
        "bondhAreaOccupied",
      ].includes(name)
    ) {
      sanitizedValue = handleInputChange(value);
    }

    setProfitData((prevFilters) => ({
      ...prevFilters,
      [name]: sanitizedValue,
    }));

    document.getElementById(name).classList.remove("error-border");
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const [formErrors, setFormErrors] = useState({
    partyName: "",
    customerCode: "",
    custLedgerCode: "",
    panNo: "",
  });

  const [formErrors1, setFormErrors1] = useState({
    address1: "",
    pin: "",
    state: "",
    gstNo: "",
  });

  const handlePartyCheckChange = (event) => {
    const { name, checked } = event.target;
    setProfitData((prevFilters) => ({
      ...prevFilters,
      [name]: checked ? "Y" : "N",
    }));
  };

  const [addressDetails, setaddressDetails] = useState({
    address1: "",
    address2: "",
    address3: "",
    city: "",
    pin: "",
    state: "",
    gstNo: "",
    srNo: 0,
    defaultChk: "N",
    customerType: "Registered",
  });

  const handleAddressChange = (event) => {
    const { name, value } = event.target;

    let val = value;

    if (name === "pin") {
      val = handleInputChange(value);
    }

    setaddressDetails((prevFilters) => ({
      ...prevFilters,
      [name]: val,
    }));

    document.getElementById(name).classList.remove("error-border");
    setFormErrors1({
      name: "",
    });
  };

  const handleAddressCheckChange = (event) => {
    const { name, checked } = event.target;
    setaddressDetails((prevFilters) => ({
      ...prevFilters,
      [name]: checked ? "Y" : "N",
    }));
  };

  function handleInputChange(e) {
    const inputValue = e;
    const numericInput = inputValue.replace(/[^0-9.]/g, "");
    const parts = numericInput.split(".");
    const integerPart = parts[0];
    let decimalPart = parts[1];

    // Limit decimal places if needed
    if (decimalPart !== undefined) {
      decimalPart = `.${decimalPart.slice(0, 3)}`;
    }

    const sanitizedInput =
      decimalPart !== undefined ? `${integerPart}${decimalPart}` : integerPart;
    return sanitizedInput;
  }

  const [addresses, setAddresses] = useState([]);

  const getAddreses = (id) => {
    axios
      .get(
        `${ipaddress}party/getAddresses?cid=${companyid}&bid=${branchId}&id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        setAddresses(response.data);
      })
      .catch((error) => {});
  };

  const handleClear = () => {
    setFormErrors({
      profitcentreDesc: "",
    });

    document
      .getElementById("profitcentreDesc")
      .classList.remove("error-border");

    setFlag("add");
    setAddresses([]);
    setCountryId("IN");
    setCountryName("India");

    setProfitData({
      companyId: "",
      profitcentreId: "",
      profitcentreDesc: "",
      vesselMandatory: "",
      joMandatory: "",
      containerMandatory: "",
      status: "",
      createdBy: "",
      createdDate: null,
      editedBy: "",
      editedDate: null,
      approvedBy: "",
      approvedDate: null,
    });
  };

  const handleAddressClear = () => {
    setBranchid("");
    setBranchname("");
    document.getElementById("address1").classList.remove("error-border");
    document.getElementById("pin").classList.remove("error-border");
    document.getElementById("state").classList.remove("error-border");
    document.getElementById("gstNo").classList.remove("error-border");

    setFormErrors1({
      address1: "",
      pin: "",
      state: "",
      gstNo: "",
    });

    setaddressDetails({
      address1: "",
      address2: "",
      address3: "",
      city: "",
      pin: "",
      state: "",
      gstNo: "",
      customerType: "Registered",
      defaultChk: "N",
    });
  };

  const saveAddress = () => {
    document.getElementById("address1").classList.remove("error-border");
    document.getElementById("pin").classList.remove("error-border");
    document.getElementById("state").classList.remove("error-border");
    document.getElementById("gstNo").classList.remove("error-border");

    setFormErrors1({
      address1: "",
      pin: "",
      state: "",
      gstNo: "",
    });
    let errors = {};
    if (!addressDetails.address1) {
      errors.address1 = "Address1 is required";
      document.getElementById("address1").classList.add("error-border");
    }

    if (!addressDetails.pin) {
      errors.pin = "Pin is required";
      document.getElementById("pin").classList.add("error-border");
    }

    if (!branchid) {
      errors.state = "State is required";
      document.getElementById("state").classList.add("error-border");
    }

    if (!addressDetails.gstNo) {
      errors.gstNo = "GST No is required";
      document.getElementById("gstNo").classList.add("error-border");
    }
    if (addressDetails.gstNo && branchid) {
      const gstCheck = branches.find((item) => item.value === branchid);
      console.log(
        "hhjghjghj ",
        gstCheck.code,
        " ",
        addressDetails.gstNo.substring(0, 2)
      );
      if (gstCheck.code !== addressDetails.gstNo.substring(0, 2)) {
        errors.gstNo = "GST No not matched with state";
        document.getElementById("gstNo").classList.add("error-border");
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors1(errors);
      toast.error("Please fill in the required fields.", {
        autoClose: 1000,
      });
      return;
    }

    profitData.country = countryId;
    addressDetails.state = branchid;

    const formData = {
      party: profitData,
      address: addressDetails,
    };

    axios
      .post(
        `${ipaddress}party/savePartyWithAddress?cid=${companyid}&bid=${branchId}&flag=${flag}&user=${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        toast.success("Data save successfully!!", {
          autoClose: 800,
        });
        const data = response.data;
        setProfitData(response.data);
        setFlag("edit");
        getAddreses(data.partyId);
        closeModalOpenForAddress();
      })
      .catch((error) => {
        toast.error(error.response.data, {
          autoClose: 1000,
        });
      });
  };

  const saveWtAddress = () => {
    setFormErrors({
      profitcentreDesc: "",
    });
    document
      .getElementById("profitcentreDesc")
      .classList.remove("error-border");

    let errors = {};
    if (!profitData.profitcentreDesc) {
      errors.profitcentreDesc = "Profit Centre Desc is required";
      document.getElementById("profitcentreDesc").classList.add("error-border");
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("Please fill in the required fields.", {
        autoClose: 1000,
      });
      return;
    }

    profitData.country = countryId;
    console.log("profitData ", profitData);

    axios
      .post(
        `${ipaddress}api/profitcentres/saveProfitCenter?cid=${companyid}&bid=${branchId}&flag=${flag}&user=${userId}`,
        profitData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        toast.success("Data save successfully!!", {
          autoClose: 800,
        });
        const data = response.data;
        setProfitData(response.data);
        setFlag("edit");
        getAddreses(data.partyId);
      })
      .catch((error) => {
        toast.error(error.response.data, {
          autoClose: 1000,
        });
      });
  };

  const handleEdit = (item) => {
    setaddressDetails({
      address1: item.address1,
      address2: item.address2,
      address3: item.address3,
      city: item.city,
      pin: item.pin,
      state: item.state,
      gstNo: item.gstNo,
      srNo: item.srNo,
      defaultChk: item.defaultChk,
      customerType: item.partyType,
    });
    setIsModalOpenForAddress(true);
    setBranchid(item.state);
    setAddressStatus("edit");
    const name = branches.find((item1) => item1.value === item.state);
    setBranchname(name.label);
  };
  const [loading, setLoading] = useState(false);
  const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust the opacity and color as needed
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // Ensure the overlay is above other elements
    },
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
    <div className="Container">
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
          icon={faPlus}
          style={{
            marginRight: "8px",
            color: "black", // Set the color to golden
          }}
        />
        Add ProfitCentre
      </h5>
      <Card style={{ backgroundColor: "#F8F8F8" }}>
        <CardBody>
          <Row style={{ marginTop: 20 }}>
            <Col md={4}>
              <FormGroup>
                <Label className="inputHeader">Profit Centre Id</Label>
                <Input
                  type="text"
                  name="profitcentreId"
                  id="profitcentreId"
                  className="form-control inputField"
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                  value={profitData.profitcentreId}
                  onChange={handlePartyChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="inputHeader">Profit Centre Desc</Label>
                <span style={{ color: "red" }}>*</span>
                <Input
                  type="text"
                  name="profitcentreDesc"
                  id="profitcentreDesc"
                  className="form-control inputField"
                  value={profitData.profitcentreDesc}
                  onChange={handlePartyChange}
                  maxLength={100}
                />
                <div style={{ color: "red" }} className="error-message">
                  {formErrors.profitcentreDesc}
                </div>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="inputHeader">Status</Label>
                <Input
                  type="text"
                  name="status"
                  id="status"
                  className="form-control inputField"
                  value={profitData.status === "A" ? "Approved" : ""}
                  onChange={handlePartyChange}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label className="inputHeader">Approved By</Label>
                <Input
                  type="text"
                  name="approvedBy"
                  id="approvedBy"
                  className="form-control inputField"
                  value={profitData.approvedBy}
                  onChange={handlePartyChange}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label className="inputHeader">Vessel Mandatory</Label>
                <br />
                <Input
                  type="checkbox"
                  className="form-check-input radios"
                  style={{ width: 20, height: 20 }}
                  name="vesselMandatory"
                  onChange={handlePartyCheckChange}
                  checked={profitData.vesselMandatory === "Y" ? true : false}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="inputHeader">Job Order Mandatory</Label>
                <br />
                <Input
                  type="checkbox"
                  className="form-check-input radios"
                  style={{ width: 20, height: 20 }}
                  name="joMandatory"
                  onChange={handlePartyCheckChange}
                  checked={profitData.joMandatory === "Y" ? true : false}
                />
              </FormGroup>
            </Col>

            <Col md={4}>
              <FormGroup>
                <Label className="inputHeader">Container Mandatory</Label>
                <br />
                <Input
                  type="checkbox"
                  className="form-check-input radios"
                  style={{ width: 20, height: 20 }}
                  name="containerMandatory"
                  onChange={handlePartyCheckChange}
                  checked={profitData.containerMandatory === "Y" ? true : false}
                />
              </FormGroup>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col className="text-center">
              <button
                className="btn btn-outline-primary btn-margin newButton"
                style={{ marginRight: 10 }}
                id="submitbtn2"
                onClick={saveWtAddress}
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
                <FontAwesomeIcon
                  icon={faRefresh}
                  style={{ marginRight: "5px" }}
                />
                Clear
              </button>
              <button
                className="btn btn-outline-danger btn-margin newButton"
                style={{ marginRight: 10 }}
                id="submitbtn2"
                onClick={back}
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  style={{ marginRight: "5px" }}
                />
                Back
              </button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
    </>
  );
}
