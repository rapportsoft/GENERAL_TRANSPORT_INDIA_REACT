import AuthContext from "../Components/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import '../assets/css/style.css';
import "../Components/RowAnimation.css"
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
  faGavel,
} from "@fortawesome/free-solid-svg-icons";
import AuctionNotice from "./AuctionNotice";
import AuctionNotice2 from "./AuctionNotice2";
import AuctionNoticeFinal from "./AuctionNoticeFinal";
import ipaddress from "../Components/IpAddress";
import axios from "axios";
import CustomValuation from "./CustomValuation";
import { toast } from "react-toastify";
import AuctionBid from "./AuctionBid";
import AuctionRecording from "./AuctionRecording";
import AuctionCargoGatePass from "./AuctionCargoGatePass";
import AuctionGateOut from "./AuctionGateOut";
import AuctionExamination from "./AuctionExamination";
export default function AuctionProcess() {
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

  const [activeTab, setActiveTab] = useState("P01401");
  const [igmNoo, setIgmNoo] = useState("");
  const [igmTransIdd, setIgmTransIdd] = useState("");
  const [igmLineNoo, setIgmLIneNoo] = useState("");
  const [blNoo, setBlNoo] = useState("");

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
  //             width: "261px", // Set your desired width here
  //           };

  //           return (
  //             <li
  //               className="nav-item flex-fill"
  //               key={tab.processId}
  //               role="presentation"
  //               style={{ flex: "0 0 auto"}}
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
  //     filteredTabMenus = tabMenus.filter((tab) => tab.pprocess_Id === processId);
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
  //         backgroundColor: "#f8f9fa", // Light background like Google tabs
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
  //             borderRadius: "8px 8px 0 0",
  //             transition: "background-color 0.3s",
  //             backgroundColor: isTabDisabled ? "#E0E0E0" : "", // Change to your desired color
  //             width: "261px", // Set your desired width here
  //             color: activeTab === tab.processId ? "#0d6efd" : "#333", // Text color change
  //             borderBottom: activeTab === tab.processId ? "2px solid #0d6efd" : "none", // Add border bottom to the active tab
  //             padding: "8px 12px", // Add padding to ensure the border is visible
  //             boxSizing: "border-box", // Ensure borders are included in the element's dimensions
  //             height: "100%", // Ensure the button takes the full height of the parent
  //             display: "flex",
  //             alignItems: "center",
  //             justifyContent: "center",
  //           };

  //           return (
  //             <li
  //               className="nav-item flex-fill"
  //               key={tab.processId}
  //               role="presentation"
  //               style={{ flex: "0 0 auto" }}
  //             >
  //               <button
  //                 className={`nav-link ${activeTab === tab.processId ? "active" : ""}`} // Removed the 'border' class
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
  //             width: "261px",
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
      const userRight = userRights.find(
        (right) => right.process_Id === tab.processId
      );
      return userRight && userRight.allow_Read === "Y";
    };

    let filteredTabMenus;
    const isAdmin = role === "ROLE_ADMIN";

    if (isAdmin) {
      filteredTabMenus = tabMenus.filter((tab) => tab.pprocess_Id === processId);
    } else {
      filteredTabMenus = tabMenus
        .filter((tab) => tab.pprocess_Id === processId)
        .filter((tab) => hasRights(tab));
    }

    return (
      <div
        className="tab-container"
      >
        <ul className="nav nav-tabs custom-nav-tabs" style={{ display: 'flex', flexWrap: 'nowrap' }}>
          {filteredTabMenus.map((tab) => {
            const isEnabled =
              pagesList.length === 0 || pagesList.includes(tab.processId);
            const isTabDisabled = !isEnabled;

            const tabStyle = {
              whiteSpace: 'nowrap',
              color: activeTab === tab.processId ? "#0d6efd" : "#333",
              backgroundColor: isTabDisabled ? '#E0E0E0' : '', // Change to your desired color
            };


            return (
              <li
                className={`nav-item flex-fill ${activeTab === tab.processId ? "active" : ""}`}
                key={tab.processId}
              >
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
  const [listData, setListData] = useState({});
  const [savedIgm, setSavedIgm] = useState("");
  const [savedIgmTrans, setSavedIgmTrans] = useState("");
  const [savedBlNo, setSavedBlNo] = useState("");
  const [savedItemNo, setSavedItemNo] = useState("");
  const [savedId1, setSavedId1] = useState("");
  const [savedId2, setSavedId2] = useState("");
  const [savedId3, setSavedId3] = useState("");
  const [aucData, setAucData] = useState({});
  const [searchFlag, setSearchFlag] = useState('N');


  const handleSearch = () => {
    search1(igmNoo, igmTransIdd, igmLineNoo, blNoo);
  };

  const handleSearch1 = () => {
    search2(igmNoo, igmTransIdd, igmLineNoo, blNoo);
  };

  const search1 = (igmNoo, igmTransIdd, igmLineNoo, blNoo) => {

    if (!igmNoo && !igmTransIdd && !igmLineNoo && !blNoo) {
      // setLoading(false);
      return;
    }

    if (!igmNoo && igmLineNoo && !blNoo && !igmTransIdd) {
      toast.error("IGM No is required", {
        autoClose: 800
      })
      return;
    }

    if (igmNoo && !igmLineNoo && !blNoo && !igmTransIdd) {
      toast.error("IGM Line No is required", {
        autoClose: 800
      })
      return;
    }

    axios
      .get(
        `${ipaddress}api/auction/mainAuctionSearch?companyId=${companyid}&branchId=${branchId}&igmTransId=${igmTransIdd}&igmNo=${igmNoo}&igmLineNo=${igmLineNoo}&blNo=${blNoo}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((respone) => {
        const data = respone.data;
        console.log("response.data___________________________", data);
        const { idList, list, firstInbond, inBondId, firstExBond, firstGatePass, firstGateOut } = data;

        if (idList && idList.length > 0) {
          setPagesList(idList);
        }

        // Check if list is not null or empty
        if (list) {
          setListData(list);
        }

        toast.success("Data search successfully", {
          autoClose: 800
        })

        setSavedBlNo(data.list[5]);
        setSavedIgm(data.list[2]);
        setSavedIgmTrans(data.list[1]);
        setSavedItemNo(data.list[3]);
        setSavedId1(data.list[6]);
        setSavedId2(data.list[7]);
        setSavedId3(data.list[8]);
        setAucData(data.auctionDto);
        setSearchFlag('Y');
        setResetFlag(false);
      })
      .catch((error) => {
        toast.error("Data not found", {
          autoClose: 800
        })
      });
  };

  const search2 = (igmNoo, igmTransIdd, igmLineNoo, blNoo) => {

    if (!igmNoo && !igmTransIdd && !igmLineNoo && !blNoo) {
      // setLoading(false);
      setSearchFlag('N');
      return;
    }

    if (!igmNoo && igmLineNoo && !blNoo && !igmTransIdd) {
      toast.error("IGM No is required", {
        autoClose: 800
      })
      return;
    }

    if (igmNoo && !igmLineNoo && !blNoo && !igmTransIdd) {
      toast.error("IGM Line No is required", {
        autoClose: 800
      })
      return;
    }

    axios
      .get(
        `${ipaddress}api/auction/mainAuctionSearch?companyId=${companyid}&branchId=${branchId}&igmTransId=${igmTransIdd}&igmNo=${igmNoo}&igmLineNo=${igmLineNoo}&blNo=${blNoo}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((respone) => {
        const data = respone.data;
        console.log("response.data___________________________", data);
        const { idList, list, firstInbond, inBondId, firstExBond, firstGatePass, firstGateOut } = data;

        if (idList && idList.length > 0) {
          setPagesList(idList);
        }

        // Check if list is not null or empty
        if (list) {
          setListData(list);
        }



        setSavedBlNo(data.list[5]);
        setSavedIgm(data.list[2]);
        setSavedIgmTrans(data.list[1]);
        setSavedItemNo(data.list[3]);
        setSavedId1(data.list[6]);
        setSavedId2(data.list[7]);
        setSavedId3(data.list[8]);
        setAucData(data.auctionDto);
        setSearchFlag('Y');
        setResetFlag(false);
      })
      .catch((error) => {

      });
  };






  const [resetFlag, setResetFlag] = useState(false);

  const handleReset = () => {
    setPagesList([]);
    setIgmNoo("");
    setIgmLIneNoo("");
    setIgmTransIdd("");
    setBlNoo("");
    setResetFlag(true);
    setSavedBlNo("");
    setSavedIgmTrans("");
    setSavedItemNo("");
    setSavedIgm("");
    setSavedId1("");
    setSavedId2("");
    setSavedId3("");
    setAucData({});
    setSearchFlag('N');
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
              icon={faGavel}
              style={{
                marginRight: "8px",
                color: "black",
              }}
            />
            Auction
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
            <CSSTransition
              in={isRowVisible}
              timeout={300}
              classNames="row-animation"
              unmountOnExit
            >
              <Row>
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel" htmlFor="blNoo">
                      BL No
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="blNoo"
                      name="blNoo"
                      value={blNoo}
                      onChange={(e) => setBlNoo(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel" htmlFor="igmNoo">
                      IGM No
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="igmNoo"
                      name="igmNoo"
                      value={igmNoo}
                      onChange={(e) => setIgmNoo(e.target.value)}
                    />
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel" htmlFor="igmLineNoo">
                      IGM Line No
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="igmLineNoo"
                      name="igmLineNoo"
                      value={igmLineNoo}
                      onChange={(e) => setIgmLIneNoo(e.target.value)}
                    />
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel" htmlFor="igmTransIdd">
                      Container No
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="igmTransIdd"
                      name="igmTransIdd"
                      value={igmTransIdd}
                      onChange={(e) => setIgmTransIdd(e.target.value)}
                    />
                  </FormGroup>
                </Col>


                <Col md={2} style={{ marginTop: 24 }}>
                  <button
                    className="btn btn-outline-success btn-margin newButton"
                    id="submitbtn2"
                    style={{ fontSize: 13, marginRight: 5 }}
                    onClick={handleSearch}
                  >
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ marginRight: "1px" }}
                    />
                    Search
                  </button>
                  <button
                    className="btn btn-outline-danger btn-margin newButton"
                    style={{ fontSize: 13 }}
                    id="submitbtn2"
                    onClick={handleReset}
                  >
                    <FontAwesomeIcon
                      icon={faRefresh}
                      style={{ marginRight: "1px" }}
                    />
                    Reset
                  </button>
                </Col>
              </Row>
            </CSSTransition>
            <Row>
              <div className="tabs-container">

                <ul className="nav nav-tabs nav-tabs-bordered d-flex" id="borderedTabJustified" role="tablist">
                  {renderTabs()}
                </ul>

              </div>
              <div
                className="tab-content"
                style={{
                  background: activeTab
                    ? "linear-gradient(to bottom, #e6ffff 0%, #ffffff 36%)"
                    : "",  // Fades out to white after a few rows
                  transition: "background 0.1s ease-in-out",
                  minHeight: "100vh",
                  padding: "20px",
                  paddingBottom: 0,
                  marginBottom: 0,
                }}
                id="borderedTabJustifiedContent"
              >

                <div style={{ paddingBottom: 0 }}
                  className={`tab-pane fade ${activeTab === "P01401" ? "show active" : ""
                    }`}
                  id="bordered-justified-profile-2"
                  role="tabpanel"
                  aria-labelledby="2"

                >
                  <AuctionNotice

                    igm={savedIgm}
                    igmLineNo={savedItemNo}
                    igmTrans={savedIgmTrans}
                    blNo={savedBlNo}
                    id1={savedId1}
                    id2={savedId2}
                    id3={savedId3}
                    acttab={activeTab}
                    listOfData={listData}
                    flag={resetFlag}
                    onRequest={handleSearch1}
                    searchFlag={searchFlag} />

                </div>
                <div
                  className={`tab-pane fade ${activeTab === "P01402" ? "show active" : ""
                    }`}
                  id="bordered-justified-profile-2"
                  role="tabpanel"
                  aria-labelledby="2"

                >
                  <AuctionNotice2
                    igm={savedIgm}
                    igmLineNo={savedItemNo}
                    igmTrans={savedIgmTrans}
                    blNo={savedBlNo}
                    id1={savedId1}
                    id2={savedId2}
                    id3={savedId3}
                    acttab={activeTab}
                    listOfData={listData}
                    flag={resetFlag}
                    onRequest={handleSearch1}
                    searchFlag={searchFlag}
                  />
                </div>
                <div
                  className={`tab-pane fade ${activeTab === "P01403" ? "show active" : ""
                    }`}
                  id="bordered-justified-profile-2"
                  role="tabpanel"
                  aria-labelledby="2"

                >
                  <AuctionNoticeFinal
                    igm={savedIgm}
                    igmLineNo={savedItemNo}
                    igmTrans={savedIgmTrans}
                    blNo={savedBlNo}
                    id1={savedId1}
                    id2={savedId2}
                    id3={savedId3}
                    acttab={activeTab}
                    listOfData={listData}
                    flag={resetFlag}
                    onRequest={handleSearch1}
                    searchFlag={searchFlag}
                  />
                </div>
                <div
                  className={`tab-pane fade ${activeTab === "P01404" ? "show active" : ""
                    }`}
                  id="bordered-justified-profile-2"
                  role="tabpanel"
                  aria-labelledby="2"

                >
                  <CustomValuation
                    igm={savedIgm}
                    igmLineNo={savedItemNo}
                    igmTrans={savedIgmTrans}
                    blNo={savedBlNo}
                    id1={savedId1}
                    id2={savedId2}
                    id3={savedId3}
                    acttab={activeTab}
                    listOfData={listData}
                    flag={resetFlag}
                    onRequest={handleSearch1}
                    aucData={aucData}
                    searchFlag={searchFlag}
                  />
                </div>
                <div
                  className={`tab-pane fade ${activeTab === "P01405" ? "show active" : ""
                    }`}
                  id="bordered-justified-profile-2"
                  role="tabpanel"
                  aria-labelledby="2"

                >
                  <AuctionBid
                    igm={savedIgm}
                    igmLineNo={savedItemNo}
                    igmTrans={savedIgmTrans}
                    blNo={savedBlNo}
                    id1={savedId1}
                    id2={savedId2}
                    id3={savedId3}
                    acttab={activeTab}
                    listOfData={listData}
                    flag={resetFlag}
                    onRequest={handleSearch1}
                    aucData={aucData}
                    searchFlag={searchFlag}
                  />
                </div>
                <div
                  className={`tab-pane fade ${activeTab === "P01406" ? "show active" : ""
                    }`}
                  id="bordered-justified-profile-2"
                  role="tabpanel"
                  aria-labelledby="2"

                >
                  <AuctionRecording
                    igm={savedIgm}
                    igmLineNo={savedItemNo}
                    igmTrans={savedIgmTrans}
                    blNo={savedBlNo}
                    id1={savedId1}
                    id2={savedId2}
                    id3={savedId3}
                    acttab={activeTab}
                    listOfData={listData}
                    flag={resetFlag}
                    onRequest={handleSearch1}
                    aucData={aucData}
                    searchFlag={searchFlag}
                  />
                </div>
                <div
                  className={`tab-pane fade ${activeTab === "P01407" ? "show active" : ""
                    }`}
                  id="bordered-justified-profile-2"
                  role="tabpanel"
                  aria-labelledby="2"

                >
                  <AuctionCargoGatePass
                    igm={savedIgm}
                    igmLineNo={savedItemNo}
                    igmTrans={savedIgmTrans}
                    blNo={savedBlNo}
                    id1={savedId1}
                    id2={savedId2}
                    id3={savedId3}
                    acttab={activeTab}
                    listOfData={listData}
                    flag={resetFlag}
                    onRequest={handleSearch1}
                    aucData={aucData}
                    searchFlag={searchFlag}
                  />
                </div>
                <div
                  className={`tab-pane fade ${activeTab === "P01408" ? "show active" : ""
                    }`}
                  id="bordered-justified-profile-2"
                  role="tabpanel"
                  aria-labelledby="2"

                >
                  <AuctionGateOut
                    igm={savedIgm}
                    igmLineNo={savedItemNo}
                    igmTrans={savedIgmTrans}
                    blNo={savedBlNo}
                    id1={savedId1}
                    id2={savedId2}
                    id3={savedId3}
                    acttab={activeTab}
                    listOfData={listData}
                    flag={resetFlag}
                    onRequest={handleSearch1}
                    aucData={aucData}
                    searchFlag={searchFlag}
                  />
                </div>
                <div
                  className={`tab-pane fade ${activeTab === "P01409" ? "show active" : ""
                    }`}
                  id="bordered-justified-profile-2"
                  role="tabpanel"
                  aria-labelledby="2"

                >
                  <AuctionExamination
                    igm={savedIgm}
                    igmLineNo={savedItemNo}
                    igmTrans={savedIgmTrans}
                    blNo={savedBlNo}
                    id1={savedId1}
                    id2={savedId2}
                    id3={savedId3}
                    acttab={activeTab}
                    listOfData={listData}
                    flag={resetFlag}
                    onRequest={handleSearch1}
                    aucData={aucData}
                    searchFlag={searchFlag}
                  />
                </div>
              </div>
            </Row>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
