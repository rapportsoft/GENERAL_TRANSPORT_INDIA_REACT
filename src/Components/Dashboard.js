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
  faDashboard,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/style.css";
import "../Components/Style.css";
import AllDashboard from "../Parent Pages/AllDashboard";
import ImportDashboard from "../Parent Pages/ImportDashboard";
import ExportDashboard from "../Parent Pages/ExportDashboard";
import InvoicesDashBoard from "../Parent Pages/InvoicesDashBoard";
import BondingDashBoard from "../Parent Pages/BondingDashBoard";
import GeneralDashboard from "../Parent Pages/GeneralDashboard";
export default function Dashboard() {
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

  const tabList = tabMenus.filter(item => item.pprocess_Id === processId || '');

  const active = (tabList[0]?.processId === undefined || tabList[0]?.processId === null || tabList[0]?.processId === '') ? '' : tabList[0]?.processId;

  const [activeTab, setActiveTab] = useState(active);









  // const renderTabs = () => {
  //   const hasRights = (tab) => {
  //     const userRight = userRights.find(
  //       (right) => right.process_Id === tab.processId
  //     );
  //     return userRight && userRight.allow_Read === "Y";
  //   };

  //   let filteredTabMenus;

  //   const isAdmin = role === "ROLE_ADMIN";

  //   if (isAdmin) {
  //     filteredTabMenus = tabMenus.filter((tab) => tab.pprocess_Id === processId);
  //   } else {
  //     filteredTabMenus = tabMenus
  //       .filter((tab) => tab.pprocess_Id === processId)
  //       .filter((tab) => hasRights(tab));
  //   }

  //   return (
  //     <div
  //       style={{
  //         overflowX: "auto",
  //         whiteSpace: "nowrap",
  //         width: "100%",
  //         height: "54px",
  //         backgroundColor: "#f8f9fa",
  //         display: "flex",
  //         alignItems: "center",
  //         padding: "5px",
  //         borderBottom: "2px solid #ddd",
  //       }}
  //     >
  //       <ul className="nav nav-tabs" style={{ display: "flex", flexWrap: "nowrap" }}>
  //         {filteredTabMenus.map((tab) => {
  //           const isEnabled =
  //             pagesList.length === 0 || pagesList.includes(tab.processId);
  //           const isTabDisabled = !isEnabled;

  //           const tabStyle = {
  //             whiteSpace: "nowrap",
  //             transition: "background-color 0.3s",
  //             backgroundColor: isTabDisabled ? "#E0E0E0" : "", // Disabled color
  //             width: "180px",
  //             color: activeTab === tab.processId ? "#0d6efd" : "#333",
  //             borderBottom: activeTab === tab.processId ? "none" : "2px solid #ddd", // No bottom border for active tab
  //             padding: "8px 12px",
  //             boxSizing: "border-box",
  //             height: "100%",
  //             display: "flex",
  //             alignItems: "center",
  //             justifyContent: "center",
  //           };

  //           return (
  //             <li
  //               className={`nav-item flex-fill ${activeTab === tab.processId ? "active" : ""}`}
  //               key={tab.processId}
  //               role="presentation"
  //               style={{ flex: "0 0 auto" }}
  //             >
  //               <button
  //                 className={`nav-link ${activeTab === tab.processId ? "active" : ""}`}
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
      <div
        className="tab-container"
      >
        <ul className="nav nav-tabs" style={{ display: 'flex', flexWrap: 'nowrap' }}>
          {filteredTabMenus.map((tab) => {
            const isEnabled = pagesList.length === 0 || pagesList.includes(tab.processId);
            const isTabDisabled = !isEnabled;
            console.log("tab ", tab);
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



  const [bondData, setBondData] = useState([]);
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
              icon={faDashboard}
              style={{
                marginRight: "8px",
                color: "black",
              }}
            />
            Dashboard
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

                <ul className="nav nav-tabs nav-tabs-bordered d-flex" id="borderedTabJustified" role="tablist">
                  {renderTabs()}
                </ul>

              </div>
              <div
                className="tab-content pt-2"
                id="borderedTabJustifiedContent"
              >
                <div
                  className={`tab-pane fade ${activeTab === "P00001" ? "show active" : ""
                    }`}
                  id="bordered-justified-profile-2"
                  role="tabpanel"
                  aria-labelledby="2"

                >
                  <AllDashboard />
                </div>

                <div
                  className={`tab-pane fade ${activeTab === "P00002" ? "show active" : ""
                    }`}
                  id="bordered-justified-contact-3"
                  role="tabpanel"
                  aria-labelledby="3"
                >
                  <ImportDashboard />
                </div>

                <div
                  className={`tab-pane fade ${activeTab === "P00003" ? "show active" : ""
                    }`}
                  id="bordered-justified-contact-3"
                  role="tabpanel"
                  aria-labelledby="3"
                >
                  <ExportDashboard />
                </div>
                <div
                  className={`tab-pane fade ${activeTab === "P00004" ? "show active" : ""
                    }`}
                  id="bordered-justified-contact-3"
                  role="tabpanel"
                  aria-labelledby="3"
                >
                  <BondingDashBoard />
                </div>

                <div
                  className={`tab-pane fade ${activeTab === "P00005" ? "show active" : ""
                    }`}
                  id="bordered-justified-contact-3"
                  role="tabpanel"
                  aria-labelledby="3"
                >
                  <InvoicesDashBoard />
                </div>

                <div
                  className={`tab-pane fade ${activeTab === "P00006" ? "show active" : ""
                    }`}
                  id="bordered-justified-contact-3"
                  role="tabpanel"
                  aria-labelledby="3"
                >
                  <GeneralDashboard />
                </div>
              </div>
            </Row>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
