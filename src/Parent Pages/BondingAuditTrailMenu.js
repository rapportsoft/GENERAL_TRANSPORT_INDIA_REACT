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
import InBondAuditTrail from "./InBondAuditTrail";
import ExBondAuditTrail from "./ExBondAuditTrail";
export default function BondingAuditTrailMenu() {
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

  const [activeTab, setActiveTab] = useState("P00801");

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
  //             width: "594px", // Set your desired width here
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


  const [pagesList, setPagesList] = useState([]);
  

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
            Bonding Audit Trail
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
                    activeTab === "P00801" ? "show active" : ""
                  }`}
                  id="bordered-justified-profile-2"
                  role="tabpanel"
                  aria-labelledby="2"
                >
                  <InBondAuditTrail/>
                </div>

                <div
                  className={`tab-pane fade ${
                    activeTab === "P00802" ? "show active" : ""
                  }`}
                  id="bordered-justified-contact-3"
                  role="tabpanel"
                  aria-labelledby="3"
                >
                  <ExBondAuditTrail/>
                </div>

              </div>
            </Row>
          </CardBody>
        </Card>
      </div>
    </>
  );
}