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
import ipaddress from "../Components/IpAddress";
import axios from "axios";
import { toast } from "react-toastify";
import JobEntry from "./JobEntry";
import GeneralGateInCargo from "./GeneralGateInCargo";
import ReceingGeneralCargo from "./ReceingGeneralCargo";
import GeneralDeliveryCargo from "./GeneralDeliveryCargo";
import GeneralGatePass from "./GeneralGatePass";
export default function CFSBonding() {
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
  const [resetFlag, setResetFlag] = useState(false);
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
        `${ipaddress}api/gatepasscontroller/getNocNoForBondingSearch?companyId=${companyid}&branchId=${branchId}&value=${val}`,
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
      .catch((error) => { });
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
      .catch((error) => { });
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
      .catch((error) => { });
  };


  const handleReset = () => {
    setPagesList([]);
    setNocNo("");
    setBondingNo("");
    setBoeNo("");
    setResetFlag(true);
  };
  const [pagesList, setPagesList] = useState([]);
  const [listData, setListData] = useState({});
  const [listOfInBond, setListOfInBond] = useState({});
  const [listOfExBond, setListOfExBond] = useState({});
  const [listOfGatePass, setListOfGatePass] = useState({});
  const [listOfGateIn, setListOfGateIn] = useState({});
  const [listOfGateOut, setListOfGateOut] = useState({});
  const [savedNoc, setSavedNoc] = useState("");
  const [savedNocTrans, setSavedNocTrans] = useState("");
  const [savedBoe, setSavedBoe] = useState("");
  const [savedIB, setSavedIB] = useState("");

  const handleSearch = () => {
    search1(nocNo, boeNo);
  };

  const search1 = (nocNo, boeNo) => {
    if (!nocNo && !boeNo) {
      // setLoading(false);
      return;
    }
    if (!nocNo && !boeNo) {
      toast.error("At least one of Noc No, BOE No, or Bonding No is required.", {
        autoClose: 800,
      });
      return;
    }

    axios
      .get(
        `${ipaddress}api/gatepasscontroller/getDataForMainBondingSearch?companyId=${companyid}&branchId=${branchId}&nocNo=${nocNo}&boeNo=${boeNo}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((respone) => {
        const data = respone.data;
        console.log("response.data___________________________", data);
        const { idList, list, firstInbond, firstExBond, firstGatePass, firstGateOut, firstGateIn } = data;

        // Check if idList is not null or empty
        if (idList && idList.length > 0) {
          setPagesList(idList);
        }
        if (list) {
          setListData(list);
        }
        if (firstInbond) {
          setListOfInBond(firstInbond);
        }

        if (firstExBond) {
          setListOfExBond(firstExBond);
        }

        if (firstGatePass) {
          setListOfGatePass(firstGatePass);
        }

        if (firstGateOut) {
          setListOfGateOut(firstGateOut);
        }

        if (firstGateIn) {
          setListOfGateIn(firstGateIn);
        }

        setSavedBoe(data.list.boeNo);
        setSavedNoc(data.list.jobNo);
        setSavedNocTrans(data.list.jobTransId);
        setSavedIB(data.firstInbond);

        //   setActiveTab('');
      })
      .catch((error) => { });
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
            General
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
                    <label className="forlabel" htmlFor="nocNo">
                      Job No
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="nocNo"
                      name="nocNo"
                      value={nocNo}
                      onChange={(e) => setNocNo(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel" htmlFor="boeNo">
                      Boe No
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="boeNo1"
                      name="boeNo"
                      value={boeNo}
                      onChange={(e) => setBoeNo(e.target.value)}
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
                className="tab-content bgScreenStyle"
                id="borderedTabJustifiedContent"
              >
                <div
                  className={`tab-pane fade ${activeTab === "P01801" ? "show active" : ""
                    }`}
                  id="bordered-justified-profile-2"
                  role="tabpanel"
                  aria-labelledby="2">
                  <JobEntry
                    nocno={savedNoc}
                    boe={savedBoe}
                    noctrans={savedNocTrans}
                    acttab={activeTab}
                    listOfData={listData}
                    flag={resetFlag}
                    onRequest={handleSearch}
                  />
                </div>

                <div
                  className={`tab-pane fade ${activeTab === "P01802" ? "show active" : ""
                    }`}
                  id="bordered-justified-profile-2"
                  role="tabpanel"
                  aria-labelledby="2">
                  <GeneralGateInCargo
                    noctrans={savedNocTrans}
                    nocno={savedNoc}
                    acttab={activeTab}
                    boe={savedBoe}
                    gateInData={listOfGateIn}
                    listOfData={listData}
                    flag={resetFlag}
                    onRequest={handleSearch}
                  />
                </div>

                <div
                  className={`tab-pane fade ${activeTab === "P01803" ? "show active" : ""
                    }`}
                  id="bordered-justified-profile-2"
                  role="tabpanel"
                  aria-labelledby="2">
                  <ReceingGeneralCargo
                    noctrans={savedNocTrans}
                    nocno={savedNoc}
                    acttab={activeTab}
                    boe={savedBoe}
                    listOfData={listData}
                    listOfInbond={listOfInBond}
                    flag={resetFlag}
                    onRequest={handleSearch}
                  />

                </div>

                <div
                  className={`tab-pane fade ${activeTab === "P01804" ? "show active" : ""
                    }`}
                  id="bordered-justified-profile-2"
                  role="tabpanel"
                  aria-labelledby="2">
                  <GeneralDeliveryCargo
                    acttab={activeTab}
                    listOfData={listData}
                    listOfExbond={listOfExBond}
                    flag={resetFlag}
                    onRequest={handleSearch} />

                </div>

                <div
                  className={`tab-pane fade ${activeTab === "P01805" ? "show active" : ""
                    }`}
                  id="bordered-justified-profile-2"
                  role="tabpanel"
                  aria-labelledby="2">
                  <GeneralGatePass
                    acttab={activeTab}
                    listOfData={listData}
                    listOfGatePass={listOfGatePass}
                    listOfExbond={listOfExBond}
                    flag={resetFlag}
                    onRequest={handleSearch} />

                </div>



              </div>
            </Row>
          </CardBody>
        </Card>
      </div>
    </>
  );


}