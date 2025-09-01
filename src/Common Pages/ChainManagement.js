import AuthContext from "../Components/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import { Card, CardBody, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faPeopleRoof,
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/style.css";
import "../Components/Style.css";
import ipaddress from "../Components/IpAddress";
import axios from "axios";
import { toast } from "react-toastify";
import ChainOne from "./ChainOne";
import ChainTwo from "./ChainTwo";
import PendingApprovals from "./PendingApprovals";
import NewTicket from "./NewTicket";
import ResolveTickets from "./ResolveTickets";

export default function ChainManagement() {
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
    logintype,
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

  const [activeTab, setActiveTab] = useState("P01601");
  const [resetFlag, setResetFlag] = useState(false);
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
        .filter((tab) => tab.pprocess_Id === processId) // Filter based on processId
        .filter((tab) => hasRights(tab));
    }

    // If loginType is "Rapport", ensure P01604 and P01605 are included
    if (logintype !== "Rapport") {
      // If loginType is NOT "Rapport", exclude P01604 and P01605
      filteredTabMenus = filteredTabMenus.filter(
        (tab) => tab.processId !== "P01604" && tab.processId !== "P01605"
      );
    }



    return (
      <div
            className="tab-container"
          >
        <ul className="nav nav-tabs" style={{ display: "flex", flexWrap: "nowrap" }}>
          {filteredTabMenus.map((tab) => {
            const isEnabled = pagesList.length === 0 || pagesList.includes(tab.processId);
            const isTabDisabled = !isEnabled;

            const tabStyle = {
              whiteSpace: "nowrap",
              color: activeTab === tab.processId ? "#0d6efd" : "#333",
              backgroundColor: isTabDisabled ? "#E0E0E0" : "", // Disabled tab color
            };

            return (
              <li className="nav-item flex-fill" key={tab.processId} role="presentation" style={{ flex: "0 0 auto" }}>
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
  //       className="tab-container"
  //     >
  //       <ul className="nav nav-tabs custom-nav-tabs">
  //         {filteredTabMenus.map((tab) => {
  //           const isEnabled =
  //             pagesList.length === 0 || pagesList.includes(tab.processId);
  //           const isTabDisabled = !isEnabled;
  
  //           const tabStyle = {
  //             whiteSpace: 'nowrap',
  //             color: activeTab === tab.processId ? "#0d6efd" : "#333",
  //             backgroundColor: isTabDisabled ? '#E0E0E0' : '', // Change to your desired color
  //         };


  //           return (
  //             <li
  //               className={`nav-item flex-fill ${activeTab === tab.processId ? "active" : ""}`}
  //               key={tab.processId}
  //             >
  //               <button
  //                 className={`nav-link neumorphic-button ${activeTab === tab.processId ? "active" : ""}`}
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
    setResetFlag(true);
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

    if (!nocNo && !boeNo && !bondingNo) {
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
        const { idList, list, firstInbond, inBondId, firstExBond, firstGatePass, firstGateOut } = data;
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
      .catch((error) => { });
  };

  const [selectedId, setSelectedId] = useState(''); // Store ID from ChainTwo

  const handleSetIdAndSwitchTab = (id) => {
    setSelectedId(id);       // Set the selected ID
    setActiveTab("P01602");  // Switch to ChainOne tab
  };

  useEffect(() => {
    if (activeTab === "P01602") {
      setTimeout(() => setSelectedId(""), 1000); // Optional delay for smooth transition
    }
  }, [activeTab]);

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
              icon={faPeopleRoof}
              style={{
                marginRight: "8px",
                color: "black",
              }}
            />
            Change Management
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
            {/* <CSSTransition
              in={isRowVisible}
              timeout={300}
              classNames="row-animation"
              unmountOnExit
            >
       <Row>
                <Col md={2}>
                  <FormGroup>
                    <label className="forlabel" htmlFor="sbRequestId">
                      NOC No
                    </label>
                    <Select
                      value={{ value: nocNo, label: nocNo }}
                      onChange={handleNocChange}
                      onInputChange={getNocData}
                      options={nocData}
                      placeholder="Select Noc"
                      isClearable
                      id="nocNo"
                      vesselName="nocNo"
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          height: 32, // Set height
                          minHeight: 32, // Set minimum height
                          border: state.isFocused
                            ? "1px solid #ccc"
                            : "1px solid #ccc",
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
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <label className="inputHeader" htmlFor="sbRequestId">
                      BOE No
                    </label>
                    <Select
                      value={{ value: boeNo, label: boeNo }}
                      onChange={handleBoeChange}
                      onInputChange={getBoeData}
                      options={boeData}
                      placeholder="Select Boe No"
                      isClearable
                      id="boeNo"
                      vesselName="boeNo"
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          height: 32, // Set height
                          minHeight: 32, // Set minimum height
                          border: state.isFocused
                            ? "1px solid #ccc"
                            : "1px solid #ccc",
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
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <label className="inputHeader" htmlFor="sbRequestId">
                      Bonding No
                    </label>
                    <Select
                      value={{ value: bondingNo, label: bondingNo }}
                      onChange={handleBondChange}
                      onInputChange={getBondData}
                      options={bondData}
                      placeholder="Select Bond No"
                      isClearable
                      id="bondingNo"
                      vesselName="bondingNo"
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          height: 32, // Set height
                          minHeight: 32, // Set minimum height
                          border: state.isFocused
                            ? "1px solid #ccc"
                            : "1px solid #ccc",
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
                  </FormGroup>
                </Col>
              <Col md={2}>
                  <FormGroup>
                    <label className="inputHeader" htmlFor="sbRequestId">
                      Bonding No
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="fobValueInDollar"
                      value={bondingNo}
                      onChange={(e) => setBondingNo(e.target.value)}
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
            </CSSTransition> */}
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
                  className={`tab-pane fade ${activeTab === "P01601" ? "show active" : ""
                    }`}
                  id="bordered-justified-contact-3"
                  role="tabpanel"
                  aria-labelledby="3"
                >
                  <ChainTwo activeTab={activeTab} handleSetIdAndSwitchTab={handleSetIdAndSwitchTab} />

                </div>
                <div
                  className={`tab-pane fade ${activeTab === "P01602" ? "show active" : ""
                    }`}
                  id="bordered-justified-profile-2"
                  role="tabpanel"
                  aria-labelledby="2"

                >
                  <ChainOne activeTab={activeTab} selectedId={selectedId} />


                </div>

                <div
                  className={`tab-pane fade ${activeTab === "P01603" ? "show active" : ""
                    }`}
                  id="bordered-justified-profile-2"
                  role="tabpanel"
                  aria-labelledby="2"

                >
                  <PendingApprovals activeTab={activeTab} />


                </div>

                <div
                  className={`tab-pane fade ${activeTab === "P01604" ? "show active" : ""
                    }`}
                  id="bordered-justified-profile-2"
                  role="tabpanel"
                  aria-labelledby="2"

                >
                  <NewTicket activeTab={activeTab} />


                </div>


                <div
                  className={`tab-pane fade ${activeTab === "P01605" ? "show active" : ""
                    }`}
                  id="bordered-justified-profile-2"
                  role="tabpanel"
                  aria-labelledby="2"

                >
                  <ResolveTickets activeTab={activeTab} />


                </div>



                {/* <div
                  className={`tab-pane fade ${activeTab === "P00250" ? "show active" : ""
                    }`}
                  id="bordered-justified-contact-3"
                  role="tabpanel"
                  aria-labelledby="3"
                >
                  <InBondCargo
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
                  className={`tab-pane fade ${activeTab === "P00251" ? "show active" : ""
                    }`}
                  id="bordered-justified-contact-3"
                  role="tabpanel"
                  aria-labelledby="3"
                >
                  <ExBonding
                    acttab={activeTab}
                    listOfData={listData}
                    listOfExbond={listOfExBond}
                    flag={resetFlag}
                    onRequest={handleSearch} />
                </div>

                <div
                  className={`tab-pane fade ${activeTab === "P00252" ? "show active" : ""
                    }`}
                  id="bordered-justified-contact-3"
                  role="tabpanel"
                  aria-labelledby="3"
                >
                  <BondGatePass
                    acttab={activeTab}
                    listOfData={listData}
                    listOfGatePass={listOfGatePass}
                    listOfExbond={listOfExBond}
                    flag={resetFlag}
                    onRequest={handleSearch} />
                </div>

                <div
                  className={`tab-pane fade ${activeTab === "P00253" ? "show active" : ""
                    }`}
                  id="bordered-justified-contact-3"
                  role="tabpanel"
                  aria-labelledby="3"
                >
                  <ExBondGateOutCargo
                    acttab={activeTab}
                    listOfData={listData}
                    listOfGateOut={listOfGatePass}
                    listOfGatePass={listOfGatePass}
                    flag={resetFlag}
                    // listOfExbond={listOfExBond}
                    onRequest={handleSearch} />
                </div>

                <div
                  className={`tab-pane fade ${activeTab === "P00254" ? "show active" : ""
                    }`}
                  id="bordered-justified-contact-3"
                  role="tabpanel"
                  aria-labelledby="3"
                >
                  <BondSSRActivity acttab={activeTab} />
                </div> */}



              </div>
            </Row>
          </CardBody>
        </Card>
      </div>
    </>
  );





  
}