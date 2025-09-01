import AuthContext from "../Components/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import Select from "react-select";
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
} from "@fortawesome/free-solid-svg-icons";
import "../assets/css/style.css";
import "../Components/Style.css";
import { Button } from "react-bootstrap";
import useAxios from "../Components/useAxios";
import CFSService from "../service/CFSService";
import { toast } from "react-toastify";
import moment from "moment";

function ContainerWiseStuffing() {
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

  const initialPort = {
    companyId: companyid,
    branchId: branchId,
    portTransId: "",
    portCode: "",
    isoPortCode: "",
    portName: "",
    portType: "",
    jobOrderPrefix: "",
    jobOrderNextNo: "",
    jobOrderFormat: "",
    agentCode: "",
    address1: "",
    address2: "",
    address3: "",
    city: "",
    pin: "",
    state: "",
    phoneNo: "",
    faxNo: "",
    contactPerson: "",
    contactDesignation: "",
    contactPhone: "",
    contactFaxNo: "",
    contactEmail: "",
    country: "",
    status: "",
    createdBy: userId,
    createdDate: "",
    editedBy: "",
    editedDate: "",
    approvedBy: userId,
    approvedDate: "",
  };

  const [port, setPort] = useState(initialPort);
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
            icon={faTruckFront}
            style={{
              marginRight: "8px",
              color: "black", // Set the color to golden
            }}
          />
Container Wise Stuffing Request
          <hr />
        </h5>
        <div>
        <Row>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                
                Stuffing Request Id
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="fobValueInDollar"
                  maxLength={15}
                />
              </FormGroup>
            </Col>

            <Col md={2} style={{ marginTop: 22 }}>
              <button
                className="btn btn-outline-primary btn-margin newButton"
                style={{ marginRight: 10 }}
                id="submitbtn2"
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ marginRight: "5px" }}
                />
                Search
              </button>
            </Col>
          </Row>
         <hr/>
          <Row>
          <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="gateNo">
                SB Chnage Trans Date <span className="error-message">*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={port.docDate}
                    //   onChange={handleDocDate}
                    id="docDate"
                    name="docDate"
                    dateFormat="dd/MM/yyyy"
                    className="form-control border-right-0 inputField"
                    customInput={<input style={{ width: "100%" }} />}
                    wrapperClassName="custom-react-datepicker-wrapper"
                    
                  />
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "#6c757d",
                    }}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                Container No <span className="error-message">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="viaNo"
                  maxLength={15}
                  name="viaNo"
                  value={port.viaNo}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                Status <span className="error-message"></span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="viaNo"
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                  maxLength={15}
                  name="viaNo"
                  value={port.viaNo}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                Created By <span className="error-message"></span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="viaNo"
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                  maxLength={15}
                  name="viaNo"
                  value={port.viaNo}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
          
          <Col md={3}>
           <Row>
            <Col md={6}>
            <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                Voyage No <span className="error-message">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="viaNo"
                //   readOnly
                //   style={{ backgroundColor: "#E0E0E0" }}
                  maxLength={15}
                  name="viaNo"
                  value={port.viaNo}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
            <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                Via No <span className="error-message">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="viaNo"
                //   readOnly
                //   style={{ backgroundColor: "#E0E0E0" }}
                  maxLength={15}
                  name="viaNo"
                  value={port.viaNo}
                />
              </FormGroup>
            </Col>
            </Row>
            </Col>

          {/* <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                Reworking Type
                </label>
                <Select
                  placeholder="Select Port"
                  isClearable
                  id="nameOfExporter"
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      border: state.isFocused
                        ? "1px solid #ccc"
                        : "1px solid #ccc",
                      boxShadow: "none",
                      "&:hover": {
                        border: "1px solid #ccc",
                      },
                    }),
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                    dropdownIndicator: () => ({
                      display: "none",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      display: "flex",
                      color: "gray",
                    }),
                  }}
                />
              </FormGroup>
            </Col> */}
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                Shift <span className="error-message">*</span>
                </label>
                <select
                  className="form-control"
                  id="gateNo"
                  name="gateNo"
                  value={port.gateNo}
                >
                  <option value="">Select...</option>
                  <option value="">DAY</option>
                  <option value="">NIGHT</option>
                </select>
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                Shipping Agent <span className="error-message">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="viaNo"
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                  maxLength={15}
                  name="viaNo"
                  value={port.viaNo}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                Approved By
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="viaNo"
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                  maxLength={15}
                  name="viaNo"
                  value={port.viaNo}
                />
              </FormGroup>
            </Col>
          </Row>
          
          <Row>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                Shipping Line <span className="error-message">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="viaNo"
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                  maxLength={15}
                  name="viaNo"
                  value={port.viaNo}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                Vessel <span className="error-message">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="viaNo"
                  maxLength={15}
                  name="viaNo"
                  value={port.viaNo}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                Profitcentre Id <span className="error-message">*</span>
                </label>
                <Select
                  placeholder="Select Port"
                  isClearable
                  id="nameOfExporter"
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      border: state.isFocused
                        ? "1px solid #ccc"
                        : "1px solid #ccc",
                      boxShadow: "none",
                      "&:hover": {
                        border: "1px solid #ccc",
                      },
                    }),
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                    dropdownIndicator: () => ({
                      display: "none",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      display: "flex",
                      color: "gray",
                    }),
                  }}
                />
              </FormGroup>
            </Col>
            
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                Tot Stuff Packages
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="viaNo"
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                  maxLength={15}
                  name="viaNo"
                  value={port.viaNo}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                Tot Cargo Wt
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="viaNo"
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                  maxLength={15}
                  name="viaNo"
                  value={port.viaNo}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                CHA
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="viaNo"
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                  maxLength={15}
                  name="viaNo"
                  value={port.viaNo}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                Rotation Date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={port.docDate}
                    //   onChange={handleDocDate}
                    id="docDate"
                    name="docDate"
                    dateFormat="dd/MM/yyyy"
                    className="form-control border-right-0 inputField"
                    customInput={<input style={{ width: "100%" }} />}
                    wrapperClassName="custom-react-datepicker-wrapper"
                    readOnly
                    style={{ backgroundColor: "#E0E0E0" }}
                  />
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "#6c757d",
                    }}
                  />
                </div>
              </FormGroup>
            </Col>
            
            <Col md={3}>
          <Row>
            <Col md={6}>
            <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId" >
                Container Size <span className="error-message">*</span>
                </label>
                <input
                  className="form-control"
                  type="textarea"
                  id="profitcentreId"
                //   maxLength={15}
                  name="profitcentreId"
                  value={port.profitcentreId}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
              </FormGroup>
            </Col>
           
            <Col md={6}>
            <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId" >
                Container Type <span className="error-message">*</span>
                </label>
                <input
                  className="form-control"
                  type="textarea"
                  id="profitcentreId"
                //   maxLength={15}
                  name="profitcentreId"
                  value={port.profitcentreId}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
              </FormGroup>
            </Col>
          </Row>
            </Col>
          </Row>
          <Row>
          <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId" >
                Container Health
                </label>
                <Select
                  placeholder="Select Port"
                  isClearable
                  id="nameOfExporter"
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      border: state.isFocused
                        ? "1px solid #ccc"
                        : "1px solid #ccc",
                      boxShadow: "none",
                      "&:hover": {
                        border: "1px solid #ccc",
                      },
                    }),
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                    dropdownIndicator: () => ({
                      display: "none",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      display: "flex",
                      color: "gray",
                    }),
                  }}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId" >
                Rotation No 
                </label>
                <input
                  className="form-control"
                  type="textarea"
                  id="profitcentreId"
                //   maxLength={15}
                  name="profitcentreId"
                  value={port.profitcentreId}
                  
                />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                Container Location 
                </label>
                <input
                  className="form-control"
                  type="textarea"
                  id="profitcentreId"
                //   maxLength={15}
                  name="profitcentreId"
                  value={port.profitcentreId}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                Container Location1 
                </label>
                <input
                  className="form-control"
                  type="textarea"
                  id="profitcentreId"
                //   maxLength={15}
                  name="profitcentreId"
                  value={port.profitcentreId}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
              </FormGroup>
            </Col>
           
          </Row>


          <Row>
          <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId" >
                Period From
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={port.docDate}
                    //   onChange={handleDocDate}
                    id="docDate"
                    name="docDate"
                    dateFormat="dd/MM/yyyy"
                    className="form-control border-right-0 inputField"
                    customInput={<input style={{ width: "100%" }} />}
                    wrapperClassName="custom-react-datepicker-wrapper"
                    
                  />
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "#6c757d",
                    }}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId" >
                Terminal
                </label>
                <input
                  className="form-control"
                  type="textarea"
                  id="profitcentreId"
                //   maxLength={15}
                  name="profitcentreId"
                  value={port.profitcentreId}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                Berthing Date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={port.docDate}
                    //   onChange={handleDocDate}
                    id="docDate"
                    name="docDate"
                    dateFormat="dd/MM/yyyy"
                    className="form-control border-right-0 inputField"
                    customInput={<input style={{ width: "100%" }} />}
                    wrapperClassName="custom-react-datepicker-wrapper"
                    
                  />
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "#6c757d",
                    }}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId">
                Gate Open Date
                </label>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={port.docDate}
                    //   onChange={handleDocDate}
                    id="docDate"
                    name="docDate"
                    dateFormat="dd/MM/yyyy"
                    className="form-control border-right-0 inputField"
                    customInput={<input style={{ width: "100%" }} />}
                    wrapperClassName="custom-react-datepicker-wrapper"
                    
                  />
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      color: "#6c757d",
                    }}
                  />
                </div>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={3}>
            <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId" >
                DO NO
                </label>
                <input
                  className="form-control"
                  type="textarea"
                  id="profitcentreId"
                //   maxLength={15}
                  name="profitcentreId"
                  value={port.profitcentreId}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
              </FormGroup>
              </Col>


              <Col md={3}>
            <FormGroup>
                <label className="forlabel bold-label" htmlFor="sbRequestId" >
                Tare Weight
                </label>
                <input
                  className="form-control"
                  type="textarea"
                  id="profitcentreId"
                //   maxLength={15}
                  name="profitcentreId"
                  value={port.profitcentreId}
                  readOnly
                  style={{ backgroundColor: "#E0E0E0" }}
                />
              </FormGroup>
              </Col>
          </Row>
        </div>
          <hr/>
          <Row className="text-end">
            <Col>
              <button
                className="btn btn-outline-primary btn-margin newButton"
                style={{ marginRight: 10 }}
                id="submitbtn2"
                //   onClick={handleOpenIgmAddDetails}
              >
                <FontAwesomeIcon icon={faAdd} style={{ marginRight: "5px" }} />
              Add
              </button>
            </Col>
          </Row><hr/>
        <div>
          <div
            className="table-responsive"
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
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
                icon={faTruckFront}
                style={{
                  marginRight: "8px",
                  color: "black", // Set the color to golden
                }}
              />
Container Wise Stuffing Request
            </h5>
            <table className="table table-bordered table-hover tableHeader">
  <thead className="tableHeader">
    <tr>
      <th scope="col" className="text-center" style={{ color: "black" }}>Sr No</th>
      <th scope="col" className="text-center" style={{ color: "black" }}>SB Trans Id</th>
      <th scope="col" className="text-center" style={{ color: "black" }}>SB Line No</th>
      <th scope="col" className="text-center" style={{ color: "black" }}>SB No</th>
      <th scope="col" className="text-center" style={{ color: "black" }}>SB Date</th>
      <th scope="col" className="text-center" style={{ color: "black" }}>Cargo Description</th>
      <th scope="col" className="text-center" style={{ color: "black" }}>Exporter</th>
      <th scope="col" className="text-center" style={{ color: "black" }}>No Of Pack</th>
      <th scope="col" className="text-center" style={{ color: "black" }}>Gross Weight</th>
      <th scope="col" className="text-center" style={{ color: "black" }}>POD</th>
      <th scope="col" className="text-center" style={{ color: "black" }}>Stuffed Req Qty</th>
      <th scope="col" className="text-center" style={{ color: "black" }}>Stuffed Requested Qty*</th>
      <th scope="col" className="text-center" style={{ color: "black" }}>Stuff Weight</th>
      <th scope="col" className="text-center" style={{ color: "black" }}>Equipment</th>
      <th scope="col" className="text-center" style={{ color: "black" }}>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr className="text-center">
      <td><input type="text" className="form-control" /></td>
      <td><input type="text" className="form-control" /></td>
      <td><input type="text" className="form-control" /></td>
      <td><input type="text" className="form-control" /></td>
      <td><input type="date" className="form-control" /></td>
      <td><input type="text" className="form-control" /></td>
      <td><input type="text" className="form-control" /></td>
      <td><input type="number" className="form-control" /></td>
      <td><input type="text" className="form-control" /></td>
      <td><input type="text" className="form-control" /></td>
      <td><input type="number" className="form-control" /></td>
      <td><input type="number" className="form-control" /></td>
      <td><input type="text" className="form-control" /></td>
      <td><input type="text" className="form-control" /></td>
      <td>
        <button className="btn btn-primary" style={{ marginRight: "10px" }}>Edit</button>
        <button className="btn btn-danger">Delete</button>
      </td>
    </tr>
  </tbody>
</table>



          </div>
        </div>
        <Row className="text-center">
          <Col>
            <button
              className="btn btn-outline-primary btn-margin newButton"
              style={{ marginRight: 10 }}
              id="submitbtn2"
            >
              <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
              Save
            </button>

            <button
              className="btn btn-outline-danger btn-margin newButton"
              style={{ marginRight: 10 }}
              id="submitbtn2"
            >
              <FontAwesomeIcon
                icon={faRefresh}
                style={{ marginRight: "5px" }}
              />
              Clear
            </button>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ContainerWiseStuffing;
