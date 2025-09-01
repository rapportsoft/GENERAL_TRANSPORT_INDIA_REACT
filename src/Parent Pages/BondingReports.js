import AuthContext from "../Components/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import Select from "react-select";
import { CSSTransition } from "react-transition-group";
import { Card, CardBody, Row, Col, FormGroup } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faSearch,
  faRefresh,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/style.css";
import "../Components/Style.css";
import GateInBondedCargo from "./GateInBondedCargo";
import InBondCargo from "./InBondCargo";
import ExBonding from "./ExBonding";
import BondGatePass from "./BondGatePass";
import ipaddress from "../Components/IpAddress";
import axios from "axios";
import NoObjectionCertifacate from "../Parent Pages/NoObjectionCertifacate";
import ExBondGateOutCargo from "./ExBondGateOutCargo";
import { toast } from "react-toastify";
import BondInventoryReport from "./BondInventoryReport";
import BondDepositeRegister from "./BondDepositeRegister";
import BondDeliveryRegister from "./BondDeliveryRegister";
import LiveBondReport from "./LiveBondReport";
import ExpiredBondReport from "./ExpiredBondReport";
import Section49LiveBondReport from "./Section49LiveBondReport";
import Section49ExpiredBondReport from "./Section49ExpiredBondReport";
import BondAuditTrail from "./BondAuditTrail";
import { FormatListBulletedSharp } from "@mui/icons-material";
import FormABReport from "./FormABReport";
import NocDepositeReport from "./NocDepositeReport";
export default function BondingReports() {
  const navigate = useNavigate();
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
    tabMenus,
    userRights,
  } = useContext(AuthContext);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const processId = searchParams.get("process_id");

  const [activeTab, setActiveTab] = useState("P00701");

  // const renderTabs = () => {
  //   const hasRights = (tab) => {
  //     const userRight = userRights.find(
  //       (right) => right.process_Id === tab.processId
  //     );
  //     return userRight && userRight.allow_Read === "Y";
  //   };

  //   let filteredTabMenus; // Further filter based on user rights

  //   const isAdmin = role === "ROLE_ADMIN";

  //   if (isAdmin) {
  //     filteredTabMenus = tabMenus.filter(
  //       (tab) => tab.pprocess_Id === processId
  //     );
  //   } else {
  //     filteredTabMenus = tabMenus
  //       .filter((tab) => tab.pprocess_Id === processId) // Filter based on processId
  //       .filter((tab) => hasRights(tab));
  //   }

  //   return (
  //     <div
  //       style={{
  //         overflowX: "auto",
  //         whiteSpace: "nowrap",
  //         width: "100%",
  //         height: "54px",
  //       }}
  //     >
  //       <ul
  //         className="nav nav-tabs"
  //         style={{ display: "flex", flexWrap: "nowrap" }}
  //       >
  //         {filteredTabMenus.map((tab) => {
  //           const isEnabled =
  //             pagesList.length === 0 || pagesList.includes(tab.processId);
  //           const isTabDisabled = !isEnabled;

  //           const tabStyle = {
  //             whiteSpace: "nowrap",
  //             backgroundColor: isTabDisabled ? "#E0E0E0" : "", // Change to your desired color
  //           };

  //           return (
  //             <li
  //               className="nav-item flex-fill"
  //               key={tab.processId}
  //               role="presentation"
  //               style={{ flex: "0 0 auto" }}
  //             >
  //               <button
  //                 className={`nav-link border ${
  //                   activeTab === tab.processId ? "active" : ""
  //                 }`}
  //                 id={tab.processId}
  //                 data-bs-toggle="tab"
  //                 data-bs-target={`#bordered-justified-${tab.processId}`}
  //                 type="button"
  //                 role="tab"
  //                 aria-controls={`bordered-justified-${tab.processId}`}
  //                 aria-selected={activeTab === tab.processId}
  //                 onClick={() => handleTabClick(tab.processId)}
  //                 disabled={isTabDisabled}
  //                 style={tabStyle}
  //               >
  //                 {tab.child_Menu_Name}
  //               </button>
  //             </li>
  //           );
  //         })}
  //       </ul>
  //     </div>
  //   );
  // };
  
  
  
  
  const renderTabs = () => {
    const hasRights = (tab) => {
        const userRight = userRights.find((right) => right.process_Id === tab.processId);
        return userRight && userRight.allow_Read === "Y";
    };

    let filteredTabMenus; // Further filter based on user rights

    const isAdmin = role === "ROLE_ADMIN";

    if (isAdmin) {
        filteredTabMenus = tabMenus.filter((tab) => tab.pprocess_Id === processId);
    }
    else {
        filteredTabMenus = tabMenus
            .filter((tab) => tab.pprocess_Id === processId) // Filter based on processId
            .filter((tab) => hasRights(tab));
    }

    return (
        // <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', width: '100%', height: '54px' }}>
        <div
    className="tab-container"
  >
            <ul className="nav nav-tabs" style={{ display: 'flex', flexWrap: 'nowrap' }}>
                {filteredTabMenus.map((tab) => {
                    const isEnabled = pagesList.length === 0 || pagesList.includes(tab.processId);
                    const isTabDisabled = !isEnabled;

                    const tabStyle = {
                        whiteSpace: 'nowrap',
                        color: activeTab === tab.processId ? "#0d6efd" : "#333",
                        backgroundColor: isTabDisabled ? '#E0E0E0' : '', // Change to your desired color
                    };

                    return (
                        <li className="nav-item flex-fill" key={tab.processId} role="presentation" style={{ flex: '0 0 auto' }}>
                            <button
                                className={`nav-link neumorphic-button ${activeTab === tab.processId ? "active" : ""}`}
                                id={tab.processId}
                                data-bs-toggle="tab"
                                data-bs-target={`#bordered-justified-${tab.processId}`}
                                type="button"
                                role="tab"
                                aria-controls={`bordered-justified-${tab.processId}`}
                                aria-selected={activeTab === tab.processId}
                                onClick={() => handleTabClick(tab.processId)}
                                disabled={isTabDisabled}
                                style={tabStyle}
                            >
                                {tab.child_Menu_Name}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

  const [isRowVisible, setIsRowVisible] = useState(true);

  const toggleRowVisibility = () => {
    setIsRowVisible(!isRowVisible);
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const [nocNo, setNocNo] = useState("");
  const [boeNo, setBoeNo] = useState("");
  const [bondingNo, setBondingNo] = useState("");

  const [nocData, setNocData] = useState([]);

  const handleNocChange = async (selectedOption, { action }) => {
    if (action === "clear") {
      console.log("respone datacagahgdhsagdhs", selectedOption);
      setNocNo("");
      setNocNo("");
    } else {
      console.log("respone datacagahgdhsagdhs", selectedOption);
      setNocNo(selectedOption ? selectedOption.value : "");
      setNocNo(selectedOption ? selectedOption.label : "");
    }
  };

  const getNocData = (val) => {
    if (val === "") {
      setNocData([]);
      return;
    }

    axios
      .get(
        `${ipaddress}api/cfbondnoc/getNocNoForBondingSearch?companyId=${companyid}&branchId=${branchId}&value=${val}`,
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
        }));
        setNocData(portOptions);
      })
      .catch((error) => {});
  };

  const [boeData, setBoeData] = useState([]);

  const handleBoeChange = async (selectedOption, { action }) => {
    if (action === "clear") {
      console.log("respone datacagahgdhsagdhs", selectedOption);
      setBoeNo("");
      setBoeNo("");
    } else {
      console.log("respone datacagahgdhsagdhs", selectedOption);
      setBoeNo(selectedOption ? selectedOption.value : "");
      setBoeNo(selectedOption ? selectedOption.label : "");
    }
  };

  const getBoeData = (val) => {
    if (val === "") {
      setBoeData([]);
      return;
    }

    axios
      .get(
        `${ipaddress}api/cfbondnoc/getAllBoeNoFromNoc?companyId=${companyid}&branchId=${branchId}&value=${val}`,
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
        }));
        setBoeData(portOptions);
      })
      .catch((error) => {});
  };


  const [bondData, setBondData] = useState([]);

  const handleBondChange = async (selectedOption, { action }) => {
    if (action === "clear") {
      console.log("respone datacagahgdhsagdhs", selectedOption);
      setBondingNo("");
      setBondingNo("");
    } else {
      console.log("respone datacagahgdhsagdhs", selectedOption);
      setBondingNo(selectedOption ? selectedOption.value : "");
      setBondingNo(selectedOption ? selectedOption.label : "");
    }
  };

  const getBondData = (val) => {
    if (val === "") {
      setBondData([]);
      return;
    }

    axios
      .get(
        `${ipaddress}api/cfbondnoc/getAllBondingNoForBondingSearch?companyId=${companyid}&branchId=${branchId}&value=${val}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;

        console.log("response.data for inbonding no ", data);
        const portOptions = data.map((port) => ({
          value: port[0],
          label: port[0],
        }));
        setBondData(portOptions);
      })
      .catch((error) => {});
  };


  const handleReset = () => {
    setPagesList([]);
    setNocNo("");
    setBondingNo("");
    setBoeNo("");
  };
  const [pagesList, setPagesList] = useState([]);
  const [listData, setListData] = useState({});
  const [listOfInBond, setListOfInBond] = useState({});
  const [listOfExBond, setListOfExBond] = useState({});
  const [listOfGatePass, setListOfGatePass] = useState({});
  const [listOfGateOut, setListOfGateOut] = useState({});
  const [savedNoc, setSavedNoc] = useState("");
  const [savedNocTrans, setSavedNocTrans] = useState("");
  const [savedBoe, setSavedBoe] = useState("");
  const [savedIB, setSavedIB] = useState("");

  const handleSearch = () => {
    search1(nocNo, boeNo, bondingNo);
  };

  const search1 = (nocNo, boeNo, bondingNo) => {
    
    if (!nocNo && !boeNo && !bondingNo ) {
      // setLoading(false);
      return;
  }

// Check if all three inputs are empty
if (!nocNo && !boeNo && !bondingNo) {
  toast.error("At least one of Noc No, BOE No, or Bonding No is required.", {
    autoClose: 800,
  });
  return;
}

    axios
      .get(
        `${ipaddress}api/cfbondnoc/getDataForMainBondingSearch?companyId=${companyid}&branchId=${branchId}&nocNo=${nocNo}&boeNo=${boeNo}&bondingNo=${bondingNo}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((respone) => {
        const data = respone.data;
        console.log("response.data___________________________", data);
        const { idList, list, firstInbond,inBondId,firstExBond,firstGatePass,firstGateOut } = data;

        setActiveTab("");
        // setPagesList(idList);
        // setListData(list);
        // setListOfInBond(firstInbond);
        // setListOfExBond(firstExBond);

         // Check if idList is not null or empty
      if (idList && idList.length > 0) {
        setPagesList(idList);
      }

      // Check if list is not null or empty
      if (list) {
        setListData(list);
      }

      // Check if firstInbond is not null
      if (firstInbond) {
        setListOfInBond(firstInbond);
      }

      // Check if firstExBond is not null
      if (firstExBond) {
        setListOfExBond(firstExBond);
      }

      if (firstGatePass) {
        setListOfGatePass(firstGatePass);
      }

      if (firstGateOut) {
        setListOfGateOut(firstGateOut);
      }

        setSavedBoe(data.list.boeNo);
        setSavedNoc(data.list.nocNo);
        setSavedNocTrans(data.list.nocTransId);
        setSavedIB(data.firstInbond);
      })
      .catch((error) => {});
  };


  return (
    <>
      <div className="Container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "2%",
            paddingRight: "2%",
          }}
        >
          <h5 className="pageHead" style={{ fontFamily: "Your-Heading-Font" }}>
            <FontAwesomeIcon
              icon={faArrowAltCircleLeft}
              style={{
                marginRight: "8px",
                color: "black",
              }}
            />
            CFS Bonding Reports
          </h5>
          <div
            onClick={toggleRowVisibility}
            style={{ cursor: "pointer", textAlign: "right" }}
          >
            <FontAwesomeIcon
              icon={isRowVisible ? faChevronUp : faChevronDown}
            />
          </div>
        </div>

        <Card style={{ backgroundColor: "#F8F8F8" }}>
          <CardBody>
    
            <Row>
            <div className="tabs-container">

<ul  className="nav nav-tabs nav-tabs-bordered d-flex" id="borderedTabJustified" role="tablist">
    {renderTabs()}
</ul>

</div>
              <div
                className="tab-content bgScreenStyle"
                id="borderedTabJustifiedContent"
              >
                <div
                  className={`tab-pane fade ${
                    activeTab === "P00701" ? "show active" : ""
                  }`}
                  id="bordered-justified-profile-2"
                  role="tabpanel"
                  aria-labelledby="2"
                >
                  <BondInventoryReport/>
                </div>

                <div
                  className={`tab-pane fade ${
                    activeTab === "P00702" ? "show active" : ""
                  }`}
                  id="bordered-justified-contact-3"
                  role="tabpanel"
                  aria-labelledby="3"
                >
                  <BondDepositeRegister/>
                </div>

                <div
                  className={`tab-pane fade ${
                    activeTab === "P00703" ? "show active" : ""
                  }`}
                  id="bordered-justified-contact-3"
                  role="tabpanel"
                  aria-labelledby="3"
                >
                  <BondDeliveryRegister/>
                 
                </div>
                <div
                  className={`tab-pane fade ${
                    activeTab === "P00704" ? "show active" : ""
                  }`}
                  id="bordered-justified-contact-3"
                  role="tabpanel"
                  aria-labelledby="3"
                >
                  <LiveBondReport/>
                </div>

                <div
                  className={`tab-pane fade ${
                    activeTab === "P00705" ? "show active" : ""
                  }`}
                  id="bordered-justified-contact-3"
                  role="tabpanel"
                  aria-labelledby="3"
                >
                  <ExpiredBondReport/>
                </div>

                {/* <div
                  className={`tab-pane fade ${
                    activeTab === "P00706" ? "show active" : ""
                  }`}
                  id="bordered-justified-contact-3"
                  role="tabpanel"
                  aria-labelledby="3"
                >
                  <Section49LiveBondReport/>
                </div> */}
                <div
                  className={`tab-pane fade ${
                    activeTab === "P00707" ? "show active" : ""
                  }`}
                  id="bordered-justified-contact-3"
                  role="tabpanel"
                  aria-labelledby="3"
                >
                  <Section49ExpiredBondReport/>
                </div>
                <div
                  className={`tab-pane fade ${
                    activeTab === "P00708" ? "show active" : ""
                  }`}
                  id="bordered-justified-contact-3"
                  role="tabpanel"
                  aria-labelledby="3"
                >
                  <BondAuditTrail/>
                </div>

                <div
                  className={`tab-pane fade ${
                    activeTab === "P00709" ? "show active" : ""
                  }`}
                  id="bordered-justified-contact-3"
                  role="tabpanel"
                  aria-labelledby="3"
                >
                  <FormABReport/>
                </div>

                <div
                  className={`tab-pane fade ${
                    activeTab === "P00710" ? "show active" : ""
                  }`}
                  id="bordered-justified-contact-3"
                  role="tabpanel"
                  aria-labelledby="3"
                >
                  <NocDepositeReport/>
                </div>
              </div>
            </Row>
          </CardBody>
        </Card>
      </div>
    </>
  );
}


